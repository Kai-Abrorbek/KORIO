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

const IMAGE_INSTRUCTION = L(
  '영어 단어에 알맞은 이미지를 고르세요.',
  'Inglizcha so‘zga mos rasmni tanlang.',
  'Choose the correct image for the English word.',
  'Выберите подходящее изображение для английского слова.',
);

const TYPE_INSTRUCTION = L(
  '빈칸에 알맞은 영어 단어를 입력하세요.',
  'Bo‘sh joyga mos inglizcha so‘zni yozing.',
  'Type the correct English word.',
  'Введите подходящее английское слово.',
);

// ─────────────────────────────────────────────────────────────
// Section 1 · Unit 9 · Node 1
// 9.1 Happy memories
//
// Coverage
// - past simple irregular verbs
// - be → was / were
// - can → could
// - come → came
// - fall → fell
// - get → got
// - go → went
// - have → had
// - know → knew
// - leave → left
// - lose → lost
// - meet → met
// - say → said
// - see → saw
// - sell → sold
// - write → wrote
// - Clive and Deborah Wearing
// - talk about a memory
// - adjective + noun phrases
// - interesting / unusual story
// - good / difficult / happy / sad time
// - new / old life
// - new / old friend
// - happy / sad ending
//
// IMPORTANT:
// *_WORDS에는 무조건 단어 하나만 등록.
// "happy ending", "text message", "fall in love",
// "good time" 같은 구/문장은 등록하지 않음.
//
// 4 lessons × 20 questions = 80
// type_answer: 3 per lesson
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT9_NODE1_WORDS = [
  {
    code: 'en-noun-memory',
    english: 'memory',
    senseKey: 'ability-or-event-remembered',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '기억',
      'xotira',
      'something that you remember from the past',
      'воспоминание; память',
    ),
    examples: [
      {
        english: 'I have a happy memory of my first holiday.',
        translations: L(
          '저는 첫 휴가에 대한 행복한 기억이 있어요.',
          'Birinchi ta’tilim haqida baxtli xotiram bor.',
          'I have a happy memory of my first holiday.',
          'У меня есть счастливое воспоминание о первом отпуске.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈmeməri/',
      ttsText: 'memory',
    },
    media: {
      emoji: '🧠',
      imageUrl: '',
      imageAlt: L(
        '과거를 기억하는 모습',
        'o‘tmishni eslash',
        'remembering the past',
        'воспоминание о прошлом',
      ),
    },
    tags: ['memory', 'past'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-diary',
    english: 'diary',
    senseKey: 'book-for-daily-personal-writing',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '일기; 일기장',
      'kundalik',
      'a book in which you write about your life and experiences',
      'дневник',
    ),
    examples: [
      {
        english: 'He wrote a diary every day.',
        translations: L(
          '그는 매일 일기를 썼어요.',
          'U har kuni kundalik yozardi.',
          'He wrote a diary every day.',
          'Он каждый день писал дневник.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈdaɪəri/',
      ttsText: 'diary',
    },
    media: {
      emoji: '📔',
      imageUrl: '',
      imageAlt: L('일기장', 'kundalik', 'a diary', 'дневник'),
    },
    tags: ['writing', 'memory'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-illness',
    english: 'illness',
    senseKey: 'condition-of-being-sick',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '질병; 아픔',
      'kasallik',
      'a condition in which a person is sick',
      'болезнь',
    ),
    examples: [
      {
        english: 'His illness changed his life.',
        translations: L(
          '그의 질병은 그의 삶을 바꿨어요.',
          'Uning kasalligi hayotini o‘zgartirdi.',
          'His illness changed his life.',
          'Его болезнь изменила его жизнь.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈɪlnəs/',
      ttsText: 'illness',
    },
    media: {
      emoji: '🤒',
      imageUrl: '',
      imageAlt: L(
        '아픈 사람',
        'kasal odam',
        'an ill person',
        'больной человек',
      ),
    },
    tags: ['health', 'life'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-fact',
    english: 'fact',
    senseKey: 'true-piece-of-information',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '사실; 정보',
      'fakt',
      'a piece of information that is true',
      'факт',
    ),
    examples: [
      {
        english: 'He could remember every fact.',
        translations: L(
          '그는 모든 사실을 기억할 수 있었어요.',
          'U har bir faktni eslay olardi.',
          'He could remember every fact.',
          'Он мог помнить каждый факт.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/fækt/',
      ttsText: 'fact',
    },
    media: {
      emoji: '📌',
      imageUrl: '',
      imageAlt: L('사실 정보', 'fakt', 'a fact', 'факт'),
    },
    tags: ['memory', 'information'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-mark',
    english: 'mark',
    senseKey: 'school-exam-result',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '점수; 성적',
      'baho',
      'a score given for school or exam work',
      'оценка',
    ),
    examples: [
      {
        english: 'He got good marks at school.',
        translations: L(
          '그는 학교에서 좋은 성적을 받았어요.',
          'U maktabda yaxshi baholar olardi.',
          'He got good marks at school.',
          'Он получал хорошие оценки в школе.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/mɑːk/',
      ttsText: 'mark',
    },
    media: {
      emoji: '💯',
      imageUrl: '',
      imageAlt: L(
        '좋은 시험 점수',
        'yaxshi baho',
        'a good exam mark',
        'хорошая оценка',
      ),
    },
    tags: ['school', 'study'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-ending',
    english: 'ending',
    senseKey: 'final-part-of-story',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '결말',
      'yakun',
      'the final part of a story or event',
      'концовка',
    ),
    examples: [
      {
        english: 'The story has a happy ending.',
        translations: L(
          '그 이야기는 행복한 결말이에요.',
          'Hikoyaning yakuni baxtli.',
          'The story has a happy ending.',
          'У этой истории счастливый конец.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈendɪŋ/',
      ttsText: 'ending',
    },
    media: {
      emoji: '🏁',
      imageUrl: '',
      imageAlt: L(
        '이야기의 마지막',
        'hikoyaning yakuni',
        'the end of a story',
        'конец истории',
      ),
    },
    tags: ['stories', 'vocabulary'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-unusual',
    english: 'unusual',
    senseKey: 'different-from-what-is-normal',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '특이한; 평범하지 않은',
      'g‘ayrioddiy',
      'different from what is normal or usual',
      'необычный',
    ),
    examples: [
      {
        english: 'It is an unusual story.',
        translations: L(
          '그것은 특이한 이야기예요.',
          'Bu g‘ayrioddiy hikoya.',
          'It is an unusual story.',
          'Это необычная история.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ʌnˈjuːʒuəl/',
      ttsText: 'unusual',
    },
    media: {
      emoji: '✨',
      imageUrl: '',
      imageAlt: L(
        '특이한 것',
        'g‘ayrioddiy narsa',
        'something unusual',
        'что-то необычное',
      ),
    },
    tags: ['adjectives', 'stories'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-job-musician',
    english: 'musician',
    senseKey: 'person-who-plays-or-writes-music',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '음악가',
      'musiqachi',
      'a person who plays or writes music',
      'музыкант',
    ),
    examples: [
      {
        english: 'Clive worked as a musician.',
        translations: L(
          '클라이브는 음악가로 일했어요.',
          'Clive musiqachi bo‘lib ishlagan.',
          'Clive worked as a musician.',
          'Клайв работал музыкантом.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/mjuːˈzɪʃən/',
      ttsText: 'musician',
    },
    media: {
      emoji: '🎹',
      imageUrl: '',
      imageAlt: L(
        '음악을 연주하는 음악가',
        'musiqa chalayotgan musiqachi',
        'a musician',
        'музыкант',
      ),
    },
    tags: ['jobs', 'music'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-family-husband',
    english: 'husband',
    senseKey: 'married-man-in-couple',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('남편', 'er', 'a man who is married', 'муж'),
    examples: [
      {
        english: 'I met my husband at school.',
        translations: L(
          '저는 학교에서 남편을 만났어요.',
          'Men erim bilan maktabda tanishganman.',
          'I met my husband at school.',
          'Я познакомилась с мужем в школе.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈhʌzbənd/',
      ttsText: 'husband',
    },
    media: {
      emoji: '👨',
      imageUrl: '',
      imageAlt: L('남편', 'er', 'a husband', 'муж'),
    },
    tags: ['family', 'relationships'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-message',
    english: 'message',
    senseKey: 'information-sent-to-person',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '메시지',
      'xabar',
      'information that you send to another person',
      'сообщение',
    ),
    examples: [
      {
        english: 'He wrote me a message.',
        translations: L(
          '그는 저에게 메시지를 썼어요.',
          'U menga xabar yozdi.',
          'He wrote me a message.',
          'Он написал мне сообщение.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈmesɪdʒ/',
      ttsText: 'message',
    },
    media: {
      emoji: '💬',
      imageUrl: '',
      imageAlt: L('메시지', 'xabar', 'a message', 'сообщение'),
    },
    tags: ['communication', 'writing'],
    difficulty: 1,
    isCore: true,
  },
];

export const EN_S1_UNIT9_NODE1_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · A love story
  // ===========================================================

  en_s1u9_n1_001_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'They met in London in 1978.',
    audioText: 'They met in London in 1978.',
    answerTranslation: L(
      '그들은 1978년에 런던에서 만났어요.',
      'Ular 1978-yilda Londonda uchrashishgan.',
      'They met in London in 1978.',
      'Они встретились в Лондоне в 1978 году.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['irregular-past', 'met'],
  },

  en_s1u9_n1_002_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'memory',
    choices: [
      { text: 'diary', label: '📔', emoji: '📔', imageUrl: '' },
      { text: 'memory', label: '🧠', emoji: '🧠', imageUrl: '' },
      { text: 'message', label: '💬', emoji: '💬', imageUrl: '' },
      { text: 'mark', label: '💯', emoji: '💯', imageUrl: '' },
    ],
    answerTranslation: L('기억', 'xotira', 'memory', 'воспоминание'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['memory'],
  },

  en_s1u9_n1_003_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'memory',
        native: 'xotira',
        nativeI18n: L('기억', 'xotira', 'memory', 'воспоминание'),
      },
      {
        text: 'diary',
        native: 'kundalik',
        nativeI18n: L('일기장', 'kundalik', 'diary', 'дневник'),
      },
      {
        text: 'illness',
        native: 'kasallik',
        nativeI18n: L('질병', 'kasallik', 'illness', 'болезнь'),
      },
      {
        text: 'musician',
        native: 'musiqachi',
        nativeI18n: L('음악가', 'musiqachi', 'musician', 'музыкант'),
      },
      {
        text: 'message',
        native: 'xabar',
        nativeI18n: L('메시지', 'xabar', 'message', 'сообщение'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['memory', 'matching'],
  },

  en_s1u9_n1_004_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['in', '1978', 'They', 'London', 'met', 'went', 'saw', 'in'],
    answer: 'They met in London in 1978',
    answerTranslation: L(
      '그들은 1978년에 런던에서 만났어요.',
      'Ular 1978-yilda Londonda uchrashishgan.',
      'They met in London in 1978.',
      'Они встретились в Лондоне в 1978 году.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['irregular-past', 'met'],
  },

  en_s1u9_n1_005_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['musician', 'worked', 'Clive', 'a', 'as', 'wrote', 'went'],
    answer: 'Clive worked as a musician',
    audioText: 'Clive worked as a musician.',
    answerTranslation: L(
      '클라이브는 음악가로 일했어요.',
      'Clive musiqachi bo‘lib ishlagan.',
      'Clive worked as a musician.',
      'Клайв работал музыкантом.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['musician', 'story'],
  },

  en_s1u9_n1_006_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'memory',
        native: 'xotira',
        nativeI18n: L('기억', 'xotira', 'memory', 'воспоминание'),
      },
      {
        text: 'diary',
        native: 'kundalik',
        nativeI18n: L('일기장', 'kundalik', 'diary', 'дневник'),
      },
      {
        text: 'illness',
        native: 'kasallik',
        nativeI18n: L('질병', 'kasallik', 'illness', 'болезнь'),
      },
      {
        text: 'musician',
        native: 'musiqachi',
        nativeI18n: L('음악가', 'musiqachi', 'musician', 'музыкант'),
      },
      {
        text: 'message',
        native: 'xabar',
        nativeI18n: L('메시지', 'xabar', 'message', 'сообщение'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['memory', 'listening'],
  },

  en_s1u9_n1_007_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'They ',
    sentenceSuffix: ' in London in 1978.',
    answer: 'met',
    answerTranslation: L(
      '그들은 1978년에 런던에서 만났어요.',
      'Ular 1978-yilda Londonda uchrashishgan.',
      'They met in London in 1978.',
      'Они встретились в Лондоне в 1978 году.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is the past form "met".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'met'],
  },

  en_s1u9_n1_008_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'diary',
    choices: [
      { text: 'message', label: '💬', emoji: '💬', imageUrl: '' },
      { text: 'mark', label: '💯', emoji: '💯', imageUrl: '' },
      { text: 'diary', label: '📔', emoji: '📔', imageUrl: '' },
      { text: 'memory', label: '🧠', emoji: '🧠', imageUrl: '' },
    ],
    answerTranslation: L('일기장', 'kundalik', 'diary', 'дневник'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['diary'],
  },

  en_s1u9_n1_009_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'They fell in love and married in 1984.',
    audioText: 'They fell in love and married in 1984.',
    answerI18n: L(
      '그들은 사랑에 빠졌고 1984년에 결혼했어요',
      'Ular bir-birini sevib qolib 1984-yilda turmush qurishdi',
      'They fell in love and married in 1984',
      'Они влюбились и поженились в 1984 году',
    ),
    options: [
      'They',
      'fell',
      'in',
      'love',
      'and',
      'married',
      'in',
      '1984',
      'met',
    ],
    optionsI18n: {
      ko: ['그들은', '사랑에', '빠졌고', '1984년에', '결혼했어요'],
      uz: [
        'Ular',
        'bir-birini',
        'sevib',
        'qolib',
        '1984-yilda',
        'turmush',
        'qurishdi',
      ],
      en: ['They', 'fell', 'in', 'love', 'and', 'married', 'in', '1984'],
      ru: ['Они', 'влюбились', 'и', 'поженились', 'в', '1984', 'году'],
    },
    answerTranslation: L(
      '그들은 사랑에 빠졌고 1984년에 결혼했어요.',
      'Ular bir-birini sevib qolib 1984-yilda turmush qurishdi.',
      'They fell in love and married in 1984.',
      'Они влюбились и поженились в 1984 году.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['fell', 'past-story'],
  },

  en_s1u9_n1_010_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'When did Clive and Deborah meet?',
    options: ['They', 'met', 'in', 'London', 'in', '1978', '1984', 'went'],
    answer: 'They met in London in 1978',
    answerTranslation: L(
      '그들은 1978년에 런던에서 만났어요.',
      'Ular 1978-yilda Londonda uchrashishgan.',
      'They met in London in 1978.',
      'Они встретились в Лондоне в 1978 году.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['met', 'reply'],
  },

  en_s1u9_n1_011_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'They ',
    sentenceSuffix: ' in love.',
    answer: 'fell',
    answerTranslation: L(
      '그들은 사랑에 빠졌어요.',
      'Ular bir-birini sevib qolishdi.',
      'They fell in love.',
      'Они влюбились.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is the past form "fell".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'fell'],
  },

  en_s1u9_n1_012_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'fact',
        native: 'fakt',
        nativeI18n: L('사실', 'fakt', 'fact', 'факт'),
      },
      {
        text: 'mark',
        native: 'baho',
        nativeI18n: L('점수', 'baho', 'mark', 'оценка'),
      },
      {
        text: 'ending',
        native: 'yakun',
        nativeI18n: L('결말', 'yakun', 'ending', 'концовка'),
      },
      {
        text: 'unusual',
        native: 'g‘ayrioddiy',
        nativeI18n: L('특이한', 'g‘ayrioddiy', 'unusual', 'необычный'),
      },
      {
        text: 'husband',
        native: 'er',
        nativeI18n: L('남편', 'er', 'husband', 'муж'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit9', 'matching'],
  },

  en_s1u9_n1_013_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['memory', 'Clive', 'his', 'lost', 'got', 'ill', 'diary', 'wrote'],
    answer: 'Clive got ill and lost his memory',
    answerTranslation: L(
      '클라이브는 병에 걸렸고 기억을 잃었어요.',
      'Clive kasal bo‘lib, xotirasini yo‘qotdi.',
      'Clive got ill and lost his memory.',
      'Клайв заболел и потерял память.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['got', 'lost', 'memory'],
  },

  en_s1u9_n1_014_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'fact',
        native: 'fakt',
        nativeI18n: L('사실', 'fakt', 'fact', 'факт'),
      },
      {
        text: 'mark',
        native: 'baho',
        nativeI18n: L('점수', 'baho', 'mark', 'оценка'),
      },
      {
        text: 'ending',
        native: 'yakun',
        nativeI18n: L('결말', 'yakun', 'ending', 'концовка'),
      },
      {
        text: 'unusual',
        native: 'g‘ayrioddiy',
        nativeI18n: L('특이한', 'g‘ayrioddiy', 'unusual', 'необычный'),
      },
      {
        text: 'husband',
        native: 'er',
        nativeI18n: L('남편', 'er', 'husband', 'муж'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['unit9', 'listening'],
  },

  en_s1u9_n1_015_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'musician',
    choices: [
      { text: 'husband', label: '👨', emoji: '👨', imageUrl: '' },
      { text: 'mark', label: '💯', emoji: '💯', imageUrl: '' },
      { text: 'musician', label: '🎹', emoji: '🎹', imageUrl: '' },
      { text: 'diary', label: '📔', emoji: '📔', imageUrl: '' },
    ],
    answerTranslation: L('음악가', 'musiqachi', 'musician', 'музыкант'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['musician'],
  },

  en_s1u9_n1_016_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Clive ___ his memory.',
    blankAnswers: ['lost'],
    options: ['lost', 'lose', 'losed', 'loses'],
    answer: 'lost',
    answerTranslation: L(
      '클라이브는 기억을 잃었어요.',
      'Clive xotirasini yo‘qotdi.',
      'Clive lost his memory.',
      'Клайв потерял память.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['lost', 'irregular-past'],
  },

  en_s1u9_n1_017_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Clive ',
    sentenceSuffix: ' very ill.',
    answer: 'got',
    answerTranslation: L(
      '클라이브는 심하게 아팠어요.',
      'Clive qattiq kasal bo‘lib qoldi.',
      'Clive got very ill.',
      'Клайв тяжело заболел.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is the past form "got".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'got'],
  },

  en_s1u9_n1_018_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['piano', 'could', 'still', 'the', 'play', 'He', 'lost', 'went'],
    answer: 'He could still play the piano',
    audioText: 'He could still play the piano.',
    answerTranslation: L(
      '그는 여전히 피아노를 연주할 수 있었어요.',
      'U hali ham pianino chala olardi.',
      'He could still play the piano.',
      'Он всё ещё мог играть на пианино.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['could', 'past-story'],
  },

  en_s1u9_n1_019_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Could Clive still play music?',
    options: ['Yes', 'he', 'could', 'play', 'music', 'still', 'couldn’t'],
    answer: 'Yes he could still play music',
    answerTranslation: L(
      '네, 그는 여전히 음악을 연주할 수 있었어요.',
      'Ha, u hali ham musiqa chala olardi.',
      'Yes, he could still play music.',
      'Да, он всё ещё мог играть музыку.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['could', 'reply'],
  },

  en_s1u9_n1_020_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What happened to Clive in 1985?' }],
    options: [
      'He got ill and lost his memory.',
      'He went on holiday and bought a house.',
      'He became a scientist.',
      'He opened a bicycle shop.',
    ],
    answer: 'He got ill and lost his memory.',
    answerTranslation: L(
      '그는 병에 걸렸고 기억을 잃었어요.',
      'U kasal bo‘lib, xotirasini yo‘qotdi.',
      'He got ill and lost his memory.',
      'Он заболел и потерял память.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['memory', 'dialog'],
  },

  // ===========================================================
  // Lesson 2 · Irregular past verbs
  // ===========================================================

  en_s1u9_n1_021_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She came to England to visit him.',
    audioText: 'She came to England to visit him.',
    answerTranslation: L(
      '그녀는 그를 만나러 영국에 왔어요.',
      'U uni ko‘rish uchun Angliyaga keldi.',
      'She came to England to visit him.',
      'Она приехала в Англию, чтобы навестить его.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['came', 'irregular-past'],
  },

  en_s1u9_n1_022_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'mark',
    choices: [
      { text: 'memory', label: '🧠', emoji: '🧠', imageUrl: '' },
      { text: 'diary', label: '📔', emoji: '📔', imageUrl: '' },
      { text: 'mark', label: '💯', emoji: '💯', imageUrl: '' },
      { text: 'message', label: '💬', emoji: '💬', imageUrl: '' },
    ],
    answerTranslation: L('점수', 'baho', 'mark', 'оценка'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['mark'],
  },

  en_s1u9_n1_023_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'memory',
        native: 'xotira',
        nativeI18n: L('기억', 'xotira', 'memory', 'воспоминание'),
      },
      {
        text: 'fact',
        native: 'fakt',
        nativeI18n: L('사실', 'fakt', 'fact', 'факт'),
      },
      {
        text: 'mark',
        native: 'baho',
        nativeI18n: L('점수', 'baho', 'mark', 'оценка'),
      },
      {
        text: 'message',
        native: 'xabar',
        nativeI18n: L('메시지', 'xabar', 'message', 'сообщение'),
      },
      {
        text: 'diary',
        native: 'kundalik',
        nativeI18n: L('일기장', 'kundalik', 'diary', 'дневник'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['memory', 'matching'],
  },

  en_s1u9_n1_024_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['USA', 'the', 'Deborah', 'back', 'moved', 'to', 'went', 'came'],
    answer: 'Deborah moved back to the USA',
    answerTranslation: L(
      '데버라는 미국으로 돌아갔어요.',
      'Deborah AQShga qaytib ko‘chdi.',
      'Deborah moved back to the USA.',
      'Дебора переехала обратно в США.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['past-story', 'moved'],
  },

  en_s1u9_n1_025_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['hospital', 'to', 'live', 'went', 'Clive', 'a', 'came', 'left'],
    answer: 'Clive went to live in a hospital',
    audioText: 'Clive went to live in a hospital.',
    answerTranslation: L(
      '클라이브는 병원에서 살게 되었어요.',
      'Clive kasalxonada yashash uchun bordi.',
      'Clive went to live in a hospital.',
      'Клайв стал жить в больнице.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['went', 'hospital'],
  },

  en_s1u9_n1_026_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'memory',
        native: 'xotira',
        nativeI18n: L('기억', 'xotira', 'memory', 'воспоминание'),
      },
      {
        text: 'fact',
        native: 'fakt',
        nativeI18n: L('사실', 'fakt', 'fact', 'факт'),
      },
      {
        text: 'mark',
        native: 'baho',
        nativeI18n: L('점수', 'baho', 'mark', 'оценка'),
      },
      {
        text: 'message',
        native: 'xabar',
        nativeI18n: L('메시지', 'xabar', 'message', 'сообщение'),
      },
      {
        text: 'diary',
        native: 'kundalik',
        nativeI18n: L('일기장', 'kundalik', 'diary', 'дневник'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['memory', 'listening'],
  },

  en_s1u9_n1_027_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Deborah ',
    sentenceSuffix: ' to England to visit Clive.',
    answer: 'came',
    answerTranslation: L(
      '데버라는 클라이브를 만나러 영국에 왔어요.',
      'Deborah Cliveni ko‘rish uchun Angliyaga keldi.',
      'Deborah came to England to visit Clive.',
      'Дебора приехала в Англию, чтобы навестить Клайва.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is the past form "came".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'came'],
  },

  en_s1u9_n1_028_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'message',
    choices: [
      { text: 'diary', label: '📔', emoji: '📔', imageUrl: '' },
      { text: 'message', label: '💬', emoji: '💬', imageUrl: '' },
      { text: 'mark', label: '💯', emoji: '💯', imageUrl: '' },
      { text: 'memory', label: '🧠', emoji: '🧠', imageUrl: '' },
    ],
    answerTranslation: L('메시지', 'xabar', 'message', 'сообщение'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['message'],
  },

  en_s1u9_n1_029_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'He wrote a diary and played music.',
    audioText: 'He wrote a diary and played music.',
    answerI18n: L(
      '그는 일기를 쓰고 음악을 연주했어요',
      'U kundalik yozib musiqa chalardi',
      'He wrote a diary and played music',
      'Он писал дневник и играл музыку',
    ),
    options: ['He', 'wrote', 'a', 'diary', 'and', 'played', 'music', 'said'],
    optionsI18n: {
      ko: ['그는', '일기를', '쓰고', '음악을', '연주했어요'],
      uz: ['U', 'kundalik', 'yozib', 'musiqa', 'chalardi'],
      en: ['He', 'wrote', 'a', 'diary', 'and', 'played', 'music'],
      ru: ['Он', 'писал', 'дневник', 'и', 'играл', 'музыку'],
    },
    answerTranslation: L(
      '그는 일기를 쓰고 음악을 연주했어요.',
      'U kundalik yozib musiqa chalardi.',
      'He wrote a diary and played music.',
      'Он писал дневник и играл музыку.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['wrote', 'diary'],
  },

  en_s1u9_n1_030_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What did Clive write?',
    options: ['He', 'wrote', 'a', 'diary', 'message', 'sold', 'said'],
    answer: 'He wrote a diary',
    answerTranslation: L(
      '그는 일기를 썼어요.',
      'U kundalik yozdi.',
      'He wrote a diary.',
      'Он писал дневник.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['wrote', 'reply'],
  },

  en_s1u9_n1_031_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'He ',
    sentenceSuffix: ' a diary.',
    answer: 'wrote',
    answerTranslation: L(
      '그는 일기를 썼어요.',
      'U kundalik yozdi.',
      'He wrote a diary.',
      'Он писал дневник.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is the past form "wrote".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'wrote'],
  },

  en_s1u9_n1_032_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'illness',
        native: 'kasallik',
        nativeI18n: L('질병', 'kasallik', 'illness', 'болезнь'),
      },
      {
        text: 'musician',
        native: 'musiqachi',
        nativeI18n: L('음악가', 'musiqachi', 'musician', 'музыкант'),
      },
      {
        text: 'husband',
        native: 'er',
        nativeI18n: L('남편', 'er', 'husband', 'муж'),
      },
      {
        text: 'ending',
        native: 'yakun',
        nativeI18n: L('결말', 'yakun', 'ending', 'концовка'),
      },
      {
        text: 'unusual',
        native: 'g‘ayrioddiy',
        nativeI18n: L('특이한', 'g‘ayrioddiy', 'unusual', 'необычный'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit9', 'matching'],
  },

  en_s1u9_n1_033_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'flat',
      'their',
      'sold',
      'Deborah',
      'London',
      'in',
      'wrote',
      'saw',
    ],
    answer: 'Deborah sold their flat in London',
    answerTranslation: L(
      '데버라는 런던에 있던 그들의 아파트를 팔았어요.',
      'Deborah Londondagi kvartiralarini sotdi.',
      'Deborah sold their flat in London.',
      'Дебора продала их квартиру в Лондоне.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['sold', 'irregular-past'],
  },

  en_s1u9_n1_034_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'illness',
        native: 'kasallik',
        nativeI18n: L('질병', 'kasallik', 'illness', 'болезнь'),
      },
      {
        text: 'musician',
        native: 'musiqachi',
        nativeI18n: L('음악가', 'musiqachi', 'musician', 'музыкант'),
      },
      {
        text: 'husband',
        native: 'er',
        nativeI18n: L('남편', 'er', 'husband', 'муж'),
      },
      {
        text: 'ending',
        native: 'yakun',
        nativeI18n: L('결말', 'yakun', 'ending', 'концовка'),
      },
      {
        text: 'unusual',
        native: 'g‘ayrioddiy',
        nativeI18n: L('특이한', 'g‘ayrioddiy', 'unusual', 'необычный'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['unit9', 'listening'],
  },

  en_s1u9_n1_035_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'husband',
    choices: [
      { text: 'musician', label: '🎹', emoji: '🎹', imageUrl: '' },
      { text: 'diary', label: '📔', emoji: '📔', imageUrl: '' },
      { text: 'husband', label: '👨', emoji: '👨', imageUrl: '' },
      { text: 'mark', label: '💯', emoji: '💯', imageUrl: '' },
    ],
    answerTranslation: L('남편', 'er', 'husband', 'муж'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['husband'],
  },

  en_s1u9_n1_036_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Deborah ___ their flat in London.',
    blankAnswers: ['sold'],
    options: ['sold', 'sell', 'selled', 'sells'],
    answer: 'sold',
    answerTranslation: L(
      '데버라는 런던에 있던 그들의 아파트를 팔았어요.',
      'Deborah Londondagi kvartiralarini sotdi.',
      'Deborah sold their flat in London.',
      'Дебора продала их квартиру в Лондоне.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['sold', 'irregular-past'],
  },

  en_s1u9_n1_037_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Deborah ',
    sentenceSuffix: ' their flat.',
    answer: 'sold',
    answerTranslation: L(
      '데버라는 그들의 아파트를 팔았어요.',
      'Deborah ularning kvartirasini sotdi.',
      'Deborah sold their flat.',
      'Дебора продала их квартиру.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is the past form "sold".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'sold'],
  },

  en_s1u9_n1_038_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['again', 'her', 'saw', 'he', 'Every', 'time', 'happy', 'said'],
    answer: 'Every time he saw her again',
    audioText: 'Every time he saw her again.',
    answerTranslation: L(
      '그가 그녀를 다시 볼 때마다',
      'U uni yana har safar ko‘rganida',
      'Every time he saw her again.',
      'Каждый раз, когда он снова её видел.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['saw', 'irregular-past'],
  },

  en_s1u9_n1_039_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Where did Clive go after Deborah moved?',
    options: [
      'He',
      'went',
      'to',
      'live',
      'in',
      'a',
      'hospital',
      'came',
      'home',
    ],
    answer: 'He went to live in a hospital',
    answerTranslation: L(
      '그는 병원에서 살게 되었어요.',
      'U kasalxonada yashash uchun bordi.',
      'He went to live in a hospital.',
      'Он стал жить в больнице.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['went', 'reply'],
  },

  en_s1u9_n1_040_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Did Clive remember Deborah’s name?' },
    ],
    options: [
      'No, he couldn’t remember her name.',
      'Yes, he wrote her name every morning.',
      'No, Deborah couldn’t play music.',
      'Yes, he sold her name.',
    ],
    answer: 'No, he couldn’t remember her name.',
    answerTranslation: L(
      '아니요, 그는 데버라의 이름을 기억하지 못했어요.',
      'Yo‘q, u Deborahning ismini eslay olmasdi.',
      'No, he couldn’t remember her name.',
      'Нет, он не мог вспомнить её имя.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['could', 'memory', 'dialog'],
  },

  // ===========================================================
  // Lesson 3 · Talk about a memory
  // ===========================================================

  en_s1u9_n1_041_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I met my best friend at school.',
    audioText: 'I met my best friend at school.',
    answerTranslation: L(
      '저는 학교에서 가장 친한 친구를 만났어요.',
      'Men eng yaqin do‘stim bilan maktabda tanishganman.',
      'I met my best friend at school.',
      'Я познакомился с лучшим другом в школе.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['memory', 'met'],
  },

  en_s1u9_n1_042_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'fact',
    choices: [
      { text: 'message', label: '💬', emoji: '💬', imageUrl: '' },
      { text: 'fact', label: '📌', emoji: '📌', imageUrl: '' },
      { text: 'diary', label: '📔', emoji: '📔', imageUrl: '' },
      { text: 'mark', label: '💯', emoji: '💯', imageUrl: '' },
    ],
    answerTranslation: L('사실', 'fakt', 'fact', 'факт'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['fact'],
  },

  en_s1u9_n1_043_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'memory',
        native: 'xotira',
        nativeI18n: L('기억', 'xotira', 'memory', 'воспоминание'),
      },
      {
        text: 'fact',
        native: 'fakt',
        nativeI18n: L('사실', 'fakt', 'fact', 'факт'),
      },
      {
        text: 'mark',
        native: 'baho',
        nativeI18n: L('점수', 'baho', 'mark', 'оценка'),
      },
      {
        text: 'ending',
        native: 'yakun',
        nativeI18n: L('결말', 'yakun', 'ending', 'концовка'),
      },
      {
        text: 'message',
        native: 'xabar',
        nativeI18n: L('메시지', 'xabar', 'message', 'сообщение'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['memory', 'matching'],
  },

  en_s1u9_n1_044_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'birthday',
      'an',
      'present',
      'I',
      'amazing',
      'got',
      'saw',
      'lost',
    ],
    answer: 'I got an amazing birthday present',
    answerTranslation: L(
      '저는 멋진 생일 선물을 받았어요.',
      'Men ajoyib tug‘ilgan kun sovg‘asini oldim.',
      'I got an amazing birthday present.',
      'Я получил замечательный подарок на день рождения.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['got', 'memory'],
  },

  en_s1u9_n1_045_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['holiday', 'Italy', 'went', 'to', 'I', 'on', 'saw', 'lost'],
    answer: 'I went on holiday to Italy',
    audioText: 'I went on holiday to Italy.',
    answerTranslation: L(
      '저는 이탈리아로 휴가를 갔어요.',
      'Men Italiyaga ta’tilga bordim.',
      'I went on holiday to Italy.',
      'Я поехал в отпуск в Италию.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['went', 'memory'],
  },

  en_s1u9_n1_046_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'memory',
        native: 'xotira',
        nativeI18n: L('기억', 'xotira', 'memory', 'воспоминание'),
      },
      {
        text: 'fact',
        native: 'fakt',
        nativeI18n: L('사실', 'fakt', 'fact', 'факт'),
      },
      {
        text: 'mark',
        native: 'baho',
        nativeI18n: L('점수', 'baho', 'mark', 'оценка'),
      },
      {
        text: 'ending',
        native: 'yakun',
        nativeI18n: L('결말', 'yakun', 'ending', 'концовка'),
      },
      {
        text: 'message',
        native: 'xabar',
        nativeI18n: L('메시지', 'xabar', 'message', 'сообщение'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['memory', 'listening'],
  },

  en_s1u9_n1_047_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I ',
    sentenceSuffix: ' my best friend at school.',
    answer: 'met',
    answerTranslation: L(
      '저는 학교에서 가장 친한 친구를 만났어요.',
      'Men eng yaqin do‘stim bilan maktabda tanishganman.',
      'I met my best friend at school.',
      'Я познакомился с лучшим другом в школе.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is the past form "met".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'met'],
  },

  en_s1u9_n1_048_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'mark',
    choices: [
      { text: 'diary', label: '📔', emoji: '📔', imageUrl: '' },
      { text: 'memory', label: '🧠', emoji: '🧠', imageUrl: '' },
      { text: 'mark', label: '💯', emoji: '💯', imageUrl: '' },
      { text: 'message', label: '💬', emoji: '💬', imageUrl: '' },
    ],
    answerTranslation: L('점수', 'baho', 'mark', 'оценка'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['mark'],
  },

  en_s1u9_n1_049_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'I saw a famous person on holiday.',
    audioText: 'I saw a famous person on holiday.',
    answerI18n: L(
      '저는 휴가 중에 유명한 사람을 봤어요',
      'Men ta’tilda mashhur odamni ko‘rdim',
      'I saw a famous person on holiday',
      'Во время отпуска я увидел известного человека',
    ),
    options: ['I', 'saw', 'a', 'famous', 'person', 'on', 'holiday', 'met'],
    optionsI18n: {
      ko: ['저는', '휴가', '중에', '유명한', '사람을', '봤어요'],
      uz: ['Men', 'ta’tilda', 'mashhur', 'odamni', 'ko‘rdim'],
      en: ['I', 'saw', 'a', 'famous', 'person', 'on', 'holiday'],
      ru: ['Во', 'время', 'отпуска', 'я', 'увидел', 'известного', 'человека'],
    },
    answerTranslation: L(
      '저는 휴가 중에 유명한 사람을 봤어요.',
      'Men ta’tilda mashhur odamni ko‘rdim.',
      'I saw a famous person on holiday.',
      'Во время отпуска я увидел известного человека.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['saw', 'memory'],
  },

  en_s1u9_n1_050_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Where did you meet your best friend?',
    options: [
      'I',
      'met',
      'my',
      'best',
      'friend',
      'at',
      'school',
      'went',
      'saw',
    ],
    answer: 'I met my best friend at school',
    answerTranslation: L(
      '저는 학교에서 가장 친한 친구를 만났어요.',
      'Men eng yaqin do‘stim bilan maktabda tanishganman.',
      'I met my best friend at school.',
      'Я познакомился с лучшим другом в школе.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['memory', 'reply'],
  },

  en_s1u9_n1_051_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I ',
    sentenceSuffix: ' on holiday to Spain.',
    answer: 'went',
    answerTranslation: L(
      '저는 스페인으로 휴가를 갔어요.',
      'Men Ispaniyaga ta’tilga bordim.',
      'I went on holiday to Spain.',
      'Я поехал в отпуск в Испанию.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is the past form "went".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'went'],
  },

  en_s1u9_n1_052_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'diary',
        native: 'kundalik',
        nativeI18n: L('일기장', 'kundalik', 'diary', 'дневник'),
      },
      {
        text: 'husband',
        native: 'er',
        nativeI18n: L('남편', 'er', 'husband', 'муж'),
      },
      {
        text: 'musician',
        native: 'musiqachi',
        nativeI18n: L('음악가', 'musiqachi', 'musician', 'музыкант'),
      },
      {
        text: 'illness',
        native: 'kasallik',
        nativeI18n: L('질병', 'kasallik', 'illness', 'болезнь'),
      },
      {
        text: 'unusual',
        native: 'g‘ayrioddiy',
        nativeI18n: L('특이한', 'g‘ayrioddiy', 'unusual', 'необычный'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit9', 'matching'],
  },

  en_s1u9_n1_053_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['phone', 'my', 'lost', 'yesterday', 'I', 'saw', 'went'],
    answer: 'I lost my phone yesterday',
    answerTranslation: L(
      '저는 어제 휴대전화를 잃어버렸어요.',
      'Men kecha telefonimni yo‘qotdim.',
      'I lost my phone yesterday.',
      'Я вчера потерял телефон.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['lost', 'memory'],
  },

  en_s1u9_n1_054_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'diary',
        native: 'kundalik',
        nativeI18n: L('일기장', 'kundalik', 'diary', 'дневник'),
      },
      {
        text: 'husband',
        native: 'er',
        nativeI18n: L('남편', 'er', 'husband', 'муж'),
      },
      {
        text: 'musician',
        native: 'musiqachi',
        nativeI18n: L('음악가', 'musiqachi', 'musician', 'музыкант'),
      },
      {
        text: 'illness',
        native: 'kasallik',
        nativeI18n: L('질병', 'kasallik', 'illness', 'болезнь'),
      },
      {
        text: 'unusual',
        native: 'g‘ayrioddiy',
        nativeI18n: L('특이한', 'g‘ayrioddiy', 'unusual', 'необычный'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['unit9', 'listening'],
  },

  en_s1u9_n1_055_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'memory',
    choices: [
      { text: 'ending', label: '🏁', emoji: '🏁', imageUrl: '' },
      { text: 'message', label: '💬', emoji: '💬', imageUrl: '' },
      { text: 'memory', label: '🧠', emoji: '🧠', imageUrl: '' },
      { text: 'diary', label: '📔', emoji: '📔', imageUrl: '' },
    ],
    answerTranslation: L('기억', 'xotira', 'memory', 'воспоминание'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['memory'],
  },

  en_s1u9_n1_056_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I ___ a famous actor at the airport.',
    blankAnswers: ['saw'],
    options: ['saw', 'see', 'seed', 'seen'],
    answer: 'saw',
    answerTranslation: L(
      '저는 공항에서 유명한 배우를 봤어요.',
      'Men aeroportda mashhur aktyorni ko‘rdim.',
      'I saw a famous actor at the airport.',
      'Я увидел известного актёра в аэропорту.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['saw', 'irregular-past'],
  },

  en_s1u9_n1_057_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I ',
    sentenceSuffix: ' a famous person.',
    answer: 'saw',
    answerTranslation: L(
      '저는 유명한 사람을 봤어요.',
      'Men mashhur odamni ko‘rdim.',
      'I saw a famous person.',
      'Я увидел известного человека.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is the past form "saw".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'saw'],
  },

  en_s1u9_n1_058_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['friend', 'my', 'yesterday', 'old', 'saw', 'I', 'met', 'new'],
    answer: 'I saw my old friend yesterday',
    audioText: 'I saw my old friend yesterday.',
    answerTranslation: L(
      '저는 어제 오랜 친구를 봤어요.',
      'Men kecha eski do‘stimni ko‘rdim.',
      'I saw my old friend yesterday.',
      'Я вчера увидел старого друга.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['saw', 'old-friend'],
  },

  en_s1u9_n1_059_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What did you get for your birthday?',
    options: ['I', 'got', 'an', 'amazing', 'present', 'went', 'lost', 'saw'],
    answer: 'I got an amazing present',
    answerTranslation: L(
      '저는 멋진 선물을 받았어요.',
      'Men ajoyib sovg‘a oldim.',
      'I got an amazing present.',
      'Я получил замечательный подарок.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['got', 'reply'],
  },

  en_s1u9_n1_060_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Tell me about a happy memory.' }],
    options: [
      'I met my best friend at school.',
      'I meet my best friend yesterday.',
      'I was meet a friend.',
      'My friend met every day now.',
    ],
    answer: 'I met my best friend at school.',
    answerTranslation: L(
      '저는 학교에서 가장 친한 친구를 만났어요.',
      'Men eng yaqin do‘stim bilan maktabda tanishganman.',
      'I met my best friend at school.',
      'Я познакомился с лучшим другом в школе.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['memory', 'dialog'],
  },

  // ===========================================================
  // Lesson 4 · Stories and memories
  // ===========================================================

  en_s1u9_n1_061_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'It is an unusual story.',
    audioText: 'It is an unusual story.',
    answerTranslation: L(
      '그것은 특이한 이야기예요.',
      'Bu g‘ayrioddiy hikoya.',
      'It is an unusual story.',
      'Это необычная история.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unusual', 'story'],
  },

  en_s1u9_n1_062_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'ending',
    choices: [
      { text: 'memory', label: '🧠', emoji: '🧠', imageUrl: '' },
      { text: 'ending', label: '🏁', emoji: '🏁', imageUrl: '' },
      { text: 'message', label: '💬', emoji: '💬', imageUrl: '' },
      { text: 'mark', label: '💯', emoji: '💯', imageUrl: '' },
    ],
    answerTranslation: L('결말', 'yakun', 'ending', 'концовка'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['ending'],
  },

  en_s1u9_n1_063_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'ending',
        native: 'yakun',
        nativeI18n: L('결말', 'yakun', 'ending', 'концовка'),
      },
      {
        text: 'unusual',
        native: 'g‘ayrioddiy',
        nativeI18n: L('특이한', 'g‘ayrioddiy', 'unusual', 'необычный'),
      },
      {
        text: 'memory',
        native: 'xotira',
        nativeI18n: L('기억', 'xotira', 'memory', 'воспоминание'),
      },
      {
        text: 'husband',
        native: 'er',
        nativeI18n: L('남편', 'er', 'husband', 'муж'),
      },
      {
        text: 'diary',
        native: 'kundalik',
        nativeI18n: L('일기장', 'kundalik', 'diary', 'дневник'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['adjective-noun', 'matching'],
  },

  en_s1u9_n1_064_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'an',
      'interesting',
      'story',
      'It',
      'is',
      'ending',
      'friend',
      'unusual',
    ],
    answer: 'It is an interesting story',
    answerTranslation: L(
      '그것은 흥미로운 이야기예요.',
      'Bu qiziqarli hikoya.',
      'It is an interesting story.',
      'Это интересная история.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['adjective-noun', 'story'],
  },

  en_s1u9_n1_065_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['ending', 'happy', 'has', 'story', 'The', 'a', 'time', 'life'],
    answer: 'The story has a happy ending',
    audioText: 'The story has a happy ending.',
    answerTranslation: L(
      '그 이야기는 행복한 결말이에요.',
      'Hikoyaning yakuni baxtli.',
      'The story has a happy ending.',
      'У этой истории счастливый конец.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['happy-ending', 'adjective-noun'],
  },

  en_s1u9_n1_066_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'ending',
        native: 'yakun',
        nativeI18n: L('결말', 'yakun', 'ending', 'концовка'),
      },
      {
        text: 'unusual',
        native: 'g‘ayrioddiy',
        nativeI18n: L('특이한', 'g‘ayrioddiy', 'unusual', 'необычный'),
      },
      {
        text: 'memory',
        native: 'xotira',
        nativeI18n: L('기억', 'xotira', 'memory', 'воспоминание'),
      },
      {
        text: 'husband',
        native: 'er',
        nativeI18n: L('남편', 'er', 'husband', 'муж'),
      },
      {
        text: 'diary',
        native: 'kundalik',
        nativeI18n: L('일기장', 'kundalik', 'diary', 'дневник'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['adjective-noun', 'listening'],
  },

  en_s1u9_n1_067_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'The story has a happy ',
    sentenceSuffix: '.',
    answer: 'ending',
    answerTranslation: L(
      '그 이야기는 행복한 결말이에요.',
      'Hikoyaning yakuni baxtli.',
      'The story has a happy ending.',
      'У этой истории счастливый конец.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "ending".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'ending'],
  },

  en_s1u9_n1_068_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'unusual',
    choices: [
      { text: 'memory', label: '🧠', emoji: '🧠', imageUrl: '' },
      { text: 'ending', label: '🏁', emoji: '🏁', imageUrl: '' },
      { text: 'unusual', label: '✨', emoji: '✨', imageUrl: '' },
      { text: 'diary', label: '📔', emoji: '📔', imageUrl: '' },
    ],
    answerTranslation: L('특이한', 'g‘ayrioddiy', 'unusual', 'необычный'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unusual'],
  },

  en_s1u9_n1_069_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'We had a good time at the party.',
    audioText: 'We had a good time at the party.',
    answerI18n: L(
      '우리는 파티에서 즐거운 시간을 보냈어요',
      'Biz bazmda vaqtimizni yaxshi o‘tkazdik',
      'We had a good time at the party',
      'Мы хорошо провели время на вечеринке',
    ),
    options: ['We', 'had', 'a', 'good', 'time', 'at', 'the', 'party', 'ending'],
    optionsI18n: {
      ko: ['우리는', '파티에서', '즐거운', '시간을', '보냈어요'],
      uz: ['Biz', 'bazmda', 'vaqtimizni', 'yaxshi', 'o‘tkazdik'],
      en: ['We', 'had', 'a', 'good', 'time', 'at', 'the', 'party'],
      ru: ['Мы', 'хорошо', 'провели', 'время', 'на', 'вечеринке'],
    },
    answerTranslation: L(
      '우리는 파티에서 즐거운 시간을 보냈어요.',
      'Biz bazmda vaqtimizni yaxshi o‘tkazdik.',
      'We had a good time at the party.',
      'Мы хорошо провели время на вечеринке.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['good-time', 'had'],
  },

  en_s1u9_n1_070_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Was the party fun?',
    options: ['Yes', 'we', 'had', 'a', 'good', 'time', 'difficult', 'ending'],
    answer: 'Yes we had a good time',
    answerTranslation: L(
      '네, 즐거운 시간을 보냈어요.',
      'Ha, vaqtimizni yaxshi o‘tkazdik.',
      'Yes, we had a good time.',
      'Да, мы хорошо провели время.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['had', 'reply'],
  },

  en_s1u9_n1_071_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'We ',
    sentenceSuffix: ' a good time at the party.',
    answer: 'had',
    answerTranslation: L(
      '우리는 파티에서 즐거운 시간을 보냈어요.',
      'Biz bazmda vaqtimizni yaxshi o‘tkazdik.',
      'We had a good time at the party.',
      'Мы хорошо провели время на вечеринке.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is the past form "had".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'had'],
  },

  en_s1u9_n1_072_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'fact',
        native: 'fakt',
        nativeI18n: L('사실', 'fakt', 'fact', 'факт'),
      },
      {
        text: 'mark',
        native: 'baho',
        nativeI18n: L('점수', 'baho', 'mark', 'оценка'),
      },
      {
        text: 'message',
        native: 'xabar',
        nativeI18n: L('메시지', 'xabar', 'message', 'сообщение'),
      },
      {
        text: 'musician',
        native: 'musiqachi',
        nativeI18n: L('음악가', 'musiqachi', 'musician', 'музыкант'),
      },
      {
        text: 'illness',
        native: 'kasallik',
        nativeI18n: L('질병', 'kasallik', 'illness', 'болезнь'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit9', 'matching'],
  },

  en_s1u9_n1_073_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['an', 'old', 'friend', 'met', 'yesterday', 'I', 'new', 'ending'],
    answer: 'I met an old friend yesterday',
    answerTranslation: L(
      '저는 어제 오랜 친구를 만났어요.',
      'Men kecha eski do‘stimni uchratdim.',
      'I met an old friend yesterday.',
      'Я вчера встретил старого друга.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['old-friend', 'met'],
  },

  en_s1u9_n1_074_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'fact',
        native: 'fakt',
        nativeI18n: L('사실', 'fakt', 'fact', 'факт'),
      },
      {
        text: 'mark',
        native: 'baho',
        nativeI18n: L('점수', 'baho', 'mark', 'оценка'),
      },
      {
        text: 'message',
        native: 'xabar',
        nativeI18n: L('메시지', 'xabar', 'message', 'сообщение'),
      },
      {
        text: 'musician',
        native: 'musiqachi',
        nativeI18n: L('음악가', 'musiqachi', 'musician', 'музыкант'),
      },
      {
        text: 'illness',
        native: 'kasallik',
        nativeI18n: L('질병', 'kasallik', 'illness', 'болезнь'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['unit9', 'listening'],
  },

  en_s1u9_n1_075_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'diary',
    choices: [
      { text: 'memory', label: '🧠', emoji: '🧠', imageUrl: '' },
      { text: 'message', label: '💬', emoji: '💬', imageUrl: '' },
      { text: 'diary', label: '📔', emoji: '📔', imageUrl: '' },
      { text: 'mark', label: '💯', emoji: '💯', imageUrl: '' },
    ],
    answerTranslation: L('일기장', 'kundalik', 'diary', 'дневник'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['diary'],
  },

  en_s1u9_n1_076_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'It was a very ___ story.',
    blankAnswers: ['unusual'],
    options: ['unusual', 'ending', 'memory', 'diary'],
    answer: 'unusual',
    answerTranslation: L(
      '그것은 아주 특이한 이야기였어요.',
      'Bu juda g‘ayrioddiy hikoya edi.',
      'It was a very unusual story.',
      'Это была очень необычная история.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unusual', 'story'],
  },

  en_s1u9_n1_077_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'It was an ',
    sentenceSuffix: ' story.',
    answer: 'unusual',
    answerTranslation: L(
      '그것은 특이한 이야기였어요.',
      'Bu g‘ayrioddiy hikoya edi.',
      'It was an unusual story.',
      'Это была необычная история.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "unusual".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'unusual'],
  },

  en_s1u9_n1_078_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'life',
      'new',
      'started',
      'city',
      'the',
      'She',
      'in',
      'big',
      'old',
    ],
    answer: 'She started a new life in the big city',
    audioText: 'She started a new life in the big city.',
    answerTranslation: L(
      '그녀는 큰 도시에서 새로운 삶을 시작했어요.',
      'U katta shaharda yangi hayot boshladi.',
      'She started a new life in the big city.',
      'Она начала новую жизнь в большом городе.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['new-life', 'adjective-noun'],
  },

  en_s1u9_n1_079_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Did the story have a sad ending?',
    options: ['No', 'it', 'had', 'a', 'happy', 'ending', 'sad', 'story'],
    answer: 'No it had a happy ending',
    answerTranslation: L(
      '아니요, 행복한 결말이었어요.',
      'Yo‘q, uning yakuni baxtli edi.',
      'No, it had a happy ending.',
      'Нет, у неё был счастливый конец.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['happy-ending', 'reply'],
  },

  en_s1u9_n1_080_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What was your school life like?' }],
    options: [
      'I had a good time and made good friends.',
      'I have a good time yesterday.',
      'My school was an ending.',
      'I went a good story every day.',
    ],
    answer: 'I had a good time and made good friends.',
    answerTranslation: L(
      '즐거운 시간을 보냈고 좋은 친구들을 사귀었어요.',
      'Vaqtimni yaxshi o‘tkazdim va yaxshi do‘stlar orttirdim.',
      'I had a good time and made good friends.',
      'Я хорошо проводил время и завёл хороших друзей.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['memory', 'unit9', 'final'],
  },
};

export const EN_S1_UNIT9_NODE1 = {
  title: L(
    '행복한 기억',
    'Baxtli xotiralar',
    'Happy memories',
    'Счастливые воспоминания',
  ),
  section: 1,
  unit: 9,
  order: 1,
  isActive: true,

  lessons: [
    {
      title: L(
        '한 사랑 이야기',
        'Sevgi hikoyasi',
        'A love story',
        'История любви',
      ),
      description: L(
        '클라이브와 데버라의 이야기를 통해 met, fell, got, lost, could 같은 불규칙 과거형을 익혀요.',
        'Clive va Deborah hikoyasi orqali met, fell, got, lost va could kabi noto‘g‘ri o‘tgan zamon shakllarini o‘rganasiz.',
        'Learn irregular past forms such as met, fell, got, lost and could through Clive and Deborah’s story.',
        'Изучаем неправильные формы прошедшего времени met, fell, got, lost и could на истории Клайва и Деборы.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 1,
      questions: [
        'en_s1u9_n1_001_speaking',
        'en_s1u9_n1_002_image_choice',
        'en_s1u9_n1_003_word_matching',
        'en_s1u9_n1_004_translate_builder',
        'en_s1u9_n1_005_word_arrange',
        'en_s1u9_n1_006_audio_match',
        'en_s1u9_n1_007_type_answer',
        'en_s1u9_n1_008_image_choice',
        'en_s1u9_n1_009_sentence_builder',
        'en_s1u9_n1_010_reply_builder',
        'en_s1u9_n1_011_type_answer',
        'en_s1u9_n1_012_word_matching',
        'en_s1u9_n1_013_translate_builder',
        'en_s1u9_n1_014_audio_match',
        'en_s1u9_n1_015_image_choice',
        'en_s1u9_n1_016_fill_in_blank',
        'en_s1u9_n1_017_type_answer',
        'en_s1u9_n1_018_word_arrange',
        'en_s1u9_n1_019_reply_builder',
        'en_s1u9_n1_020_dialog_complete',
      ],
    },

    {
      title: L(
        '불규칙 과거형',
        'Noto‘g‘ri o‘tgan zamon fe’llari',
        'Irregular past verbs',
        'Неправильные глаголы в прошедшем времени',
      ),
      description: L(
        'came, went, wrote, sold, saw 같은 불규칙 과거형을 문장 속에서 반복해서 연습해요.',
        'Came, went, wrote, sold va saw kabi noto‘g‘ri o‘tgan zamon shakllarini gaplarda mashq qilasiz.',
        'Practise irregular past forms such as came, went, wrote, sold and saw in complete sentences.',
        'Практикуем came, went, wrote, sold, saw и другие неправильные формы прошедшего времени.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 2,
      questions: [
        'en_s1u9_n1_021_speaking',
        'en_s1u9_n1_022_image_choice',
        'en_s1u9_n1_023_word_matching',
        'en_s1u9_n1_024_translate_builder',
        'en_s1u9_n1_025_word_arrange',
        'en_s1u9_n1_026_audio_match',
        'en_s1u9_n1_027_type_answer',
        'en_s1u9_n1_028_image_choice',
        'en_s1u9_n1_029_sentence_builder',
        'en_s1u9_n1_030_reply_builder',
        'en_s1u9_n1_031_type_answer',
        'en_s1u9_n1_032_word_matching',
        'en_s1u9_n1_033_translate_builder',
        'en_s1u9_n1_034_audio_match',
        'en_s1u9_n1_035_image_choice',
        'en_s1u9_n1_036_fill_in_blank',
        'en_s1u9_n1_037_type_answer',
        'en_s1u9_n1_038_word_arrange',
        'en_s1u9_n1_039_reply_builder',
        'en_s1u9_n1_040_dialog_complete',
      ],
    },

    {
      title: L(
        '기억 이야기하기',
        'Xotira haqida gapirish',
        'Talk about a memory',
        'Рассказываем о воспоминании',
      ),
      description: L(
        '친구를 만난 일, 여행, 생일 선물, 잃어버린 물건처럼 기억에 남는 과거 경험을 불규칙 과거형으로 말해요.',
        'Do‘st bilan tanishish, sayohat, tug‘ilgan kun sovg‘asi va yo‘qolgan buyum kabi o‘tgan xotiralarni noto‘g‘ri fe’llar bilan aytasiz.',
        'Use irregular past verbs to talk about memorable events such as meeting a friend, travelling or receiving a present.',
        'Используем неправильные глаголы, чтобы рассказывать о памятных событиях прошлого.',
      ),
      category: LessonCategory.EXPRESSION,
      level: LV,
      order: 3,
      questions: [
        'en_s1u9_n1_041_speaking',
        'en_s1u9_n1_042_image_choice',
        'en_s1u9_n1_043_word_matching',
        'en_s1u9_n1_044_translate_builder',
        'en_s1u9_n1_045_word_arrange',
        'en_s1u9_n1_046_audio_match',
        'en_s1u9_n1_047_type_answer',
        'en_s1u9_n1_048_image_choice',
        'en_s1u9_n1_049_sentence_builder',
        'en_s1u9_n1_050_reply_builder',
        'en_s1u9_n1_051_type_answer',
        'en_s1u9_n1_052_word_matching',
        'en_s1u9_n1_053_translate_builder',
        'en_s1u9_n1_054_audio_match',
        'en_s1u9_n1_055_image_choice',
        'en_s1u9_n1_056_fill_in_blank',
        'en_s1u9_n1_057_type_answer',
        'en_s1u9_n1_058_word_arrange',
        'en_s1u9_n1_059_reply_builder',
        'en_s1u9_n1_060_dialog_complete',
      ],
    },

    {
      title: L(
        '이야기와 삶 묘사하기',
        'Hikoya va hayotni tasvirlash',
        'Stories and memories',
        'Истории и воспоминания',
      ),
      description: L(
        'interesting story, happy ending, good time, new life 같은 형용사와 명사의 자연스러운 조합을 익혀요.',
        'Interesting story, happy ending, good time va new life kabi sifat va ot birikmalarini o‘rganasiz.',
        'Practise natural adjective and noun combinations such as interesting story, happy ending, good time and new life.',
        'Практикуем сочетания прилагательных и существительных: interesting story, happy ending, good time, new life.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 4,
      questions: [
        'en_s1u9_n1_061_speaking',
        'en_s1u9_n1_062_image_choice',
        'en_s1u9_n1_063_word_matching',
        'en_s1u9_n1_064_translate_builder',
        'en_s1u9_n1_065_word_arrange',
        'en_s1u9_n1_066_audio_match',
        'en_s1u9_n1_067_type_answer',
        'en_s1u9_n1_068_image_choice',
        'en_s1u9_n1_069_sentence_builder',
        'en_s1u9_n1_070_reply_builder',
        'en_s1u9_n1_071_type_answer',
        'en_s1u9_n1_072_word_matching',
        'en_s1u9_n1_073_translate_builder',
        'en_s1u9_n1_074_audio_match',
        'en_s1u9_n1_075_image_choice',
        'en_s1u9_n1_076_fill_in_blank',
        'en_s1u9_n1_077_type_answer',
        'en_s1u9_n1_078_word_arrange',
        'en_s1u9_n1_079_reply_builder',
        'en_s1u9_n1_080_dialog_complete',
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Section 1 · Unit 9 · Node 2
// 9.2 A good excuse
//
// Coverage
// - past simple negatives
//   didn't + base verb
// - past simple questions
//   Did + subject + base verb?
// - short answers
//   Yes, I/you/he/she/we/they did.
//   No, I/you/he/she/we/they didn't.
// - couldn't
// - excuses for being late / absent
// - common verb phrases:
//   sleep badly
//   fall in the shower
//   forget the time
//   feel sick
//   have a headache
//   go to the doctor
//   meet an old friend
//   miss the train
// - did you ... last week?
// - sentence stress in past questions / negatives
// - same-sounding words in context:
//   knew/new, two/too, see/sea, ate/eight,
//   buy/bye, your/you're, write/right,
//   there/their, eye/I, meat/meet, wear/where
//
// IMPORTANT:
// *_WORDS에는 무조건 단어 하나만 등록.
// "sleep badly", "miss the train", "have a headache",
// "go to the doctor" 같은 구/문장은 등록 금지.
//
// 4 lessons × 20 questions = 80
// type_answer: 3 per lesson
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT9_NODE2_WORDS = [
  {
    code: 'en-noun-excuse',
    english: 'excuse',
    senseKey: 'reason-given-for-doing-something-wrong',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '핑계; 이유',
      'bahona',
      'a reason that you give to explain a mistake or problem',
      'оправдание; отговорка',
    ),
    examples: [
      {
        english: 'He had an excuse for being late.',
        translations: L(
          '그는 늦은 이유가 있었어요.',
          'Uning kech qolishi uchun bahonasi bor edi.',
          'He had an excuse for being late.',
          'У него было оправдание за опоздание.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɪkˈskjuːs/',
      ttsText: 'excuse',
    },
    media: {
      emoji: '🤷',
      imageUrl: '',
      imageAlt: L(
        '이유를 설명하는 사람',
        'bahona aytayotgan odam',
        'a person giving an excuse',
        'человек, объясняющий причину',
      ),
    },
    tags: ['work', 'conversation'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-fridge',
    english: 'fridge',
    senseKey: 'cold-appliance-for-food',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '냉장고',
      'muzlatgich',
      'a machine that keeps food and drinks cold',
      'холодильник',
    ),
    examples: [
      {
        english: 'The fridge is in the kitchen.',
        translations: L(
          '냉장고는 부엌에 있어요.',
          'Muzlatgich oshxonada.',
          'The fridge is in the kitchen.',
          'Холодильник находится на кухне.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/frɪdʒ/',
      ttsText: 'fridge',
    },
    media: {
      emoji: '🧊',
      imageUrl: '',
      imageAlt: L('냉장고', 'muzlatgich', 'a fridge', 'холодильник'),
    },
    tags: ['home', 'kitchen'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-horror',
    english: 'horror',
    senseKey: 'frightening-story-or-film-type',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '공포; 공포 장르',
      'qo‘rqinch',
      'a type of story or film that is intended to frighten people',
      'ужасы',
    ),
    examples: [
      {
        english: 'I watched a horror film.',
        translations: L(
          '저는 공포 영화를 봤어요.',
          'Men qo‘rqinchli film ko‘rdim.',
          'I watched a horror film.',
          'Я посмотрел фильм ужасов.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈhɒrə/',
      ttsText: 'horror',
    },
    media: {
      emoji: '👻',
      imageUrl: '',
      imageAlt: L(
        '공포 영화',
        'qo‘rqinchli film',
        'a horror film',
        'фильм ужасов',
      ),
    },
    tags: ['films', 'stories'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-headache',
    english: 'headache',
    senseKey: 'pain-in-head',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('두통', 'bosh og‘rig‘i', 'a pain in your head', 'головная боль'),
    examples: [
      {
        english: 'I had a headache yesterday.',
        translations: L(
          '저는 어제 두통이 있었어요.',
          'Kecha boshim og‘ridi.',
          'I had a headache yesterday.',
          'Вчера у меня болела голова.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈhedeɪk/',
      ttsText: 'headache',
    },
    media: {
      emoji: '🤕',
      imageUrl: '',
      imageAlt: L(
        '머리가 아픈 사람',
        'boshi og‘riyotgan odam',
        'a person with a headache',
        'человек с головной болью',
      ),
    },
    tags: ['health', 'body'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-shower',
    english: 'shower',
    senseKey: 'place-or-device-for-washing-body',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '샤워; 샤워기',
      'dush',
      'a place or device used for washing your body with water',
      'душ',
    ),
    examples: [
      {
        english: 'She fell in the shower.',
        translations: L(
          '그녀는 샤워실에서 넘어졌어요.',
          'U dushda yiqildi.',
          'She fell in the shower.',
          'Она упала в душе.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈʃaʊə/',
      ttsText: 'shower',
    },
    media: {
      emoji: '🚿',
      imageUrl: '',
      imageAlt: L('샤워기', 'dush', 'a shower', 'душ'),
    },
    tags: ['home', 'bathroom'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-train',
    english: 'train',
    senseKey: 'rail-vehicle-for-passengers',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '기차',
      'poyezd',
      'a vehicle that travels on railway tracks',
      'поезд',
    ),
    examples: [
      {
        english: 'She missed her train.',
        translations: L(
          '그녀는 기차를 놓쳤어요.',
          'U poyezdiga kech qoldi.',
          'She missed her train.',
          'Она опоздала на поезд.',
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
    tags: ['transport', 'travel'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-sick',
    english: 'sick',
    senseKey: 'feeling-ill',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '아픈; 몸이 안 좋은',
      'betob',
      'feeling ill or unwell',
      'больной; плохо себя чувствующий',
    ),
    examples: [
      {
        english: 'I felt sick in the morning.',
        translations: L(
          '저는 아침에 몸이 안 좋았어요.',
          'Ertalab o‘zimni betob his qildim.',
          'I felt sick in the morning.',
          'Утром я плохо себя чувствовал.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/sɪk/',
      ttsText: 'sick',
    },
    media: {
      emoji: '🤢',
      imageUrl: '',
      imageAlt: L(
        '몸이 안 좋은 사람',
        'o‘zini yomon his qilayotgan odam',
        'a person feeling sick',
        'человек, которому плохо',
      ),
    },
    tags: ['health', 'adjectives'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-forget',
    english: 'forget',
    senseKey: 'fail-to-remember',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L('잊다', 'unutmoq', 'to fail to remember something', 'забывать'),
    examples: [
      {
        english: 'I forgot the time of the meeting.',
        translations: L(
          '저는 회의 시간을 잊었어요.',
          'Men uchrashuv vaqtini unutdim.',
          'I forgot the time of the meeting.',
          'Я забыл время встречи.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/fəˈɡet/',
      ttsText: 'forget',
    },
    media: {
      emoji: '❓',
      imageUrl: '',
      imageAlt: L(
        '무언가를 잊은 사람',
        'bir narsani unutgan odam',
        'a person who forgot something',
        'человек, который что-то забыл',
      ),
    },
    tags: ['memory', 'verbs'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-miss',
    english: 'miss',
    senseKey: 'fail-to-catch-transport',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '놓치다',
      'ulgurmay qolmoq',
      'to arrive too late to catch a bus, train or other transport',
      'опоздать; пропустить',
    ),
    examples: [
      {
        english: 'I missed my train.',
        translations: L(
          '저는 기차를 놓쳤어요.',
          'Men poyezdga ulgurmay qoldim.',
          'I missed my train.',
          'Я опоздал на поезд.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/mɪs/',
      ttsText: 'miss',
    },
    media: {
      emoji: '🏃',
      imageUrl: '',
      imageAlt: L(
        '기차를 놓친 사람',
        'poyezdga ulgurmagan odam',
        'a person missing a train',
        'человек, опоздавший на поезд',
      ),
    },
    tags: ['transport', 'verbs'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-sleep',
    english: 'sleep',
    senseKey: 'rest-with-eyes-closed',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L('자다', 'uxlamoq', 'to rest with your eyes closed', 'спать'),
    examples: [
      {
        english: 'I slept badly last night.',
        translations: L(
          '저는 어젯밤에 잠을 잘 못 잤어요.',
          'Men kecha kechasi yomon uxladim.',
          'I slept badly last night.',
          'Прошлой ночью я плохо спал.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/sliːp/',
      ttsText: 'sleep',
    },
    media: {
      emoji: '😴',
      imageUrl: '',
      imageAlt: L(
        '잠자는 사람',
        'uxlayotgan odam',
        'a sleeping person',
        'спящий человек',
      ),
    },
    tags: ['daily-life', 'verbs'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-feel',
    english: 'feel',
    senseKey: 'experience-physical-condition',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '느끼다; 상태가 ~하다',
      'his qilmoq',
      'to experience a physical or emotional condition',
      'чувствовать',
    ),
    examples: [
      {
        english: 'I felt sick after lunch.',
        translations: L(
          '저는 점심 식사 후에 몸이 안 좋았어요.',
          'Tushlikdan keyin o‘zimni betob his qildim.',
          'I felt sick after lunch.',
          'После обеда я плохо себя чувствовал.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/fiːl/',
      ttsText: 'feel',
    },
    media: {
      emoji: '😵',
      imageUrl: '',
      imageAlt: L(
        '몸 상태를 느끼는 사람',
        'o‘z holatini his qilayotgan odam',
        'a person describing how they feel',
        'человек, описывающий своё самочувствие',
      ),
    },
    tags: ['health', 'verbs'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-job-doctor',
    english: 'doctor',
    senseKey: 'person-who-treats-ill-people',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '의사',
      'shifokor',
      'a person whose job is to treat people who are ill',
      'врач',
    ),
    examples: [
      {
        english: 'She went to the doctor.',
        translations: L(
          '그녀는 병원에 갔어요.',
          'U shifokorga bordi.',
          'She went to the doctor.',
          'Она пошла к врачу.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈdɒktə/',
      ttsText: 'doctor',
    },
    media: {
      emoji: '🩺',
      imageUrl: '',
      imageAlt: L('의사', 'shifokor', 'a doctor', 'врач'),
    },
    tags: ['jobs', 'health'],
    difficulty: 1,
    isCore: true,
  },
];

export const EN_S1_UNIT9_NODE2_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · A good excuse
  // ===========================================================

  en_s1u9_n2_001_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I watched a horror film and I couldn’t sleep.',
    audioText: 'I watched a horror film and I couldn’t sleep.',
    answerTranslation: L(
      '저는 공포 영화를 봐서 잠을 잘 수 없었어요.',
      'Men qo‘rqinchli film ko‘rdim va uxlay olmadim.',
      'I watched a horror film and I couldn’t sleep.',
      'Я посмотрел фильм ужасов и не смог уснуть.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['excuse', 'couldnt'],
  },

  en_s1u9_n2_002_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'headache',
    choices: [
      { text: 'train', label: '🚆', emoji: '🚆', imageUrl: '' },
      { text: 'headache', label: '🤕', emoji: '🤕', imageUrl: '' },
      { text: 'shower', label: '🚿', emoji: '🚿', imageUrl: '' },
      { text: 'fridge', label: '🧊', emoji: '🧊', imageUrl: '' },
    ],
    answerTranslation: L('두통', 'bosh og‘rig‘i', 'headache', 'головная боль'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['headache'],
  },

  en_s1u9_n2_003_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'excuse',
        native: 'bahona',
        nativeI18n: L('핑계', 'bahona', 'excuse', 'оправдание'),
      },
      {
        text: 'headache',
        native: 'bosh og‘rig‘i',
        nativeI18n: L('두통', 'bosh og‘rig‘i', 'headache', 'головная боль'),
      },
      {
        text: 'shower',
        native: 'dush',
        nativeI18n: L('샤워', 'dush', 'shower', 'душ'),
      },
      {
        text: 'train',
        native: 'poyezd',
        nativeI18n: L('기차', 'poyezd', 'train', 'поезд'),
      },
      {
        text: 'sick',
        native: 'betob',
        nativeI18n: L('아픈', 'betob', 'sick', 'больной'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['excuses', 'matching'],
  },

  en_s1u9_n2_004_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['night', 'had', 'I', 'bad', 'a', 'sleep', 'did', 'last'],
    answer: 'I had a bad night',
    answerTranslation: L(
      '저는 밤을 잘 못 보냈어요.',
      'Men kechani yomon o‘tkazdim.',
      'I had a bad night.',
      'Я плохо провёл ночь.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['excuse', 'past'],
  },

  en_s1u9_n2_005_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'sleep',
      'couldn’t',
      'I',
      'film',
      'a',
      'horror',
      'watched',
      'and',
      'did',
    ],
    answer: 'I watched a horror film and couldn’t sleep',
    audioText: 'I watched a horror film and couldn’t sleep.',
    answerTranslation: L(
      '저는 공포 영화를 봐서 잠을 잘 수 없었어요.',
      'Men qo‘rqinchli film ko‘rdim va uxlay olmadim.',
      'I watched a horror film and couldn’t sleep.',
      'Я посмотрел фильм ужасов и не смог уснуть.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['horror', 'sleep'],
  },

  en_s1u9_n2_006_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'excuse',
        native: 'bahona',
        nativeI18n: L('핑계', 'bahona', 'excuse', 'оправдание'),
      },
      {
        text: 'headache',
        native: 'bosh og‘rig‘i',
        nativeI18n: L('두통', 'bosh og‘rig‘i', 'headache', 'головная боль'),
      },
      {
        text: 'shower',
        native: 'dush',
        nativeI18n: L('샤워', 'dush', 'shower', 'душ'),
      },
      {
        text: 'train',
        native: 'poyezd',
        nativeI18n: L('기차', 'poyezd', 'train', 'поезд'),
      },
      {
        text: 'sick',
        native: 'betob',
        nativeI18n: L('아픈', 'betob', 'sick', 'больной'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['excuses', 'listening'],
  },

  en_s1u9_n2_007_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I had a ',
    sentenceSuffix: ' yesterday.',
    answer: 'headache',
    answerTranslation: L(
      '저는 어제 두통이 있었어요.',
      'Kecha boshim og‘ridi.',
      'I had a headache yesterday.',
      'Вчера у меня болела голова.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "headache".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'headache'],
  },

  en_s1u9_n2_008_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'shower',
    choices: [
      { text: 'fridge', label: '🧊', emoji: '🧊', imageUrl: '' },
      { text: 'train', label: '🚆', emoji: '🚆', imageUrl: '' },
      { text: 'shower', label: '🚿', emoji: '🚿', imageUrl: '' },
      { text: 'headache', label: '🤕', emoji: '🤕', imageUrl: '' },
    ],
    answerTranslation: L('샤워', 'dush', 'shower', 'душ'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['shower'],
  },

  en_s1u9_n2_009_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'I ate something bad and felt sick.',
    audioText: 'I ate something bad and felt sick.',
    answerI18n: L(
      '저는 안 좋은 음식을 먹어서 몸이 안 좋았어요',
      'Men yomon bir narsa yedim va o‘zimni betob his qildim',
      'I ate something bad and felt sick',
      'Я съел что-то плохое и почувствовал себя плохо',
    ),
    options: ['I', 'ate', 'something', 'bad', 'and', 'felt', 'sick', 'sleep'],
    optionsI18n: {
      ko: ['저는', '안', '좋은', '음식을', '먹어서', '몸이', '안', '좋았어요'],
      uz: [
        'Men',
        'yomon',
        'bir',
        'narsa',
        'yedim',
        'va',
        'o‘zimni',
        'betob',
        'his',
        'qildim',
      ],
      en: ['I', 'ate', 'something', 'bad', 'and', 'felt', 'sick'],
      ru: [
        'Я',
        'съел',
        'что-то',
        'плохое',
        'и',
        'почувствовал',
        'себя',
        'плохо',
      ],
    },
    answerTranslation: L(
      '저는 안 좋은 음식을 먹어서 몸이 안 좋았어요.',
      'Men yomon bir narsa yedim va o‘zimni betob his qildim.',
      'I ate something bad and felt sick.',
      'Я съел что-то плохое и почувствовал себя плохо.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['felt', 'sick'],
  },

  en_s1u9_n2_010_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Why were you late for work?',
    options: ['I', 'missed', 'my', 'train', 'did', 'not', 'meeting'],
    answer: 'I missed my train',
    answerTranslation: L(
      '기차를 놓쳤어요.',
      'Men poyezdga ulgurmay qoldim.',
      'I missed my train.',
      'Я опоздал на поезд.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['miss', 'train', 'reply'],
  },

  en_s1u9_n2_011_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I ',
    sentenceSuffix: ' my train.',
    answer: 'missed',
    answerTranslation: L(
      '저는 기차를 놓쳤어요.',
      'Men poyezdga ulgurmay qoldim.',
      'I missed my train.',
      'Я опоздал на поезд.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is the past form "missed".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'missed'],
  },

  en_s1u9_n2_012_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'forget',
        native: 'unutmoq',
        nativeI18n: L('잊다', 'unutmoq', 'forget', 'забывать'),
      },
      {
        text: 'miss',
        native: 'ulgurmay qolmoq',
        nativeI18n: L('놓치다', 'ulgurmay qolmoq', 'miss', 'опоздать'),
      },
      {
        text: 'sleep',
        native: 'uxlamoq',
        nativeI18n: L('자다', 'uxlamoq', 'sleep', 'спать'),
      },
      {
        text: 'feel',
        native: 'his qilmoq',
        nativeI18n: L('느끼다', 'his qilmoq', 'feel', 'чувствовать'),
      },
      {
        text: 'doctor',
        native: 'shifokor',
        nativeI18n: L('의사', 'shifokor', 'doctor', 'врач'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['verb-phrases', 'matching'],
  },

  en_s1u9_n2_013_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['doctor', 'went', 'the', 'I', 'to', 'sick', 'felt', 'missed'],
    answer: 'I went to the doctor',
    answerTranslation: L(
      '저는 병원에 갔어요.',
      'Men shifokorga bordim.',
      'I went to the doctor.',
      'Я пошёл к врачу.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['doctor', 'excuse'],
  },

  en_s1u9_n2_014_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'forget',
        native: 'unutmoq',
        nativeI18n: L('잊다', 'unutmoq', 'forget', 'забывать'),
      },
      {
        text: 'miss',
        native: 'ulgurmay qolmoq',
        nativeI18n: L('놓치다', 'ulgurmay qolmoq', 'miss', 'опоздать'),
      },
      {
        text: 'sleep',
        native: 'uxlamoq',
        nativeI18n: L('자다', 'uxlamoq', 'sleep', 'спать'),
      },
      {
        text: 'feel',
        native: 'his qilmoq',
        nativeI18n: L('느끼다', 'his qilmoq', 'feel', 'чувствовать'),
      },
      {
        text: 'doctor',
        native: 'shifokor',
        nativeI18n: L('의사', 'shifokor', 'doctor', 'врач'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['verb-phrases', 'listening'],
  },

  en_s1u9_n2_015_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'train',
    choices: [
      { text: 'shower', label: '🚿', emoji: '🚿', imageUrl: '' },
      { text: 'doctor', label: '🩺', emoji: '🩺', imageUrl: '' },
      { text: 'train', label: '🚆', emoji: '🚆', imageUrl: '' },
      { text: 'fridge', label: '🧊', emoji: '🧊', imageUrl: '' },
    ],
    answerTranslation: L('기차', 'poyezd', 'train', 'поезд'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['train'],
  },

  en_s1u9_n2_016_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She ___ sick after lunch.',
    blankAnswers: ['felt'],
    options: ['felt', 'feel', 'feels', 'feeled'],
    answer: 'felt',
    answerTranslation: L(
      '그녀는 점심 식사 후 몸이 안 좋았어요.',
      'U tushlikdan keyin o‘zini betob his qildi.',
      'She felt sick after lunch.',
      'После обеда она плохо себя чувствовала.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['felt', 'sick'],
  },

  en_s1u9_n2_017_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I ',
    sentenceSuffix: ' the time of the meeting.',
    answer: 'forgot',
    answerTranslation: L(
      '저는 회의 시간을 잊었어요.',
      'Men uchrashuv vaqtini unutdim.',
      'I forgot the time of the meeting.',
      'Я забыл время встречи.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is the past form "forgot".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'forgot'],
  },

  en_s1u9_n2_018_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'old',
      'way',
      'friend',
      'work',
      'an',
      'to',
      'met',
      'I',
      'the',
      'on',
    ],
    answer: 'I met an old friend on the way to work',
    audioText: 'I met an old friend on the way to work.',
    answerTranslation: L(
      '저는 출근길에 오랜 친구를 만났어요.',
      'Men ishga ketayotib eski do‘stimni uchratdim.',
      'I met an old friend on the way to work.',
      'По дороге на работу я встретил старого друга.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['old-friend', 'excuse'],
  },

  en_s1u9_n2_019_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Why didn’t you come to work?',
    options: [
      'I',
      'felt',
      'sick',
      'and',
      'went',
      'to',
      'the',
      'doctor',
      'train',
    ],
    answer: 'I felt sick and went to the doctor',
    answerTranslation: L(
      '몸이 안 좋아서 병원에 갔어요.',
      'O‘zimni betob his qilib, shifokorga bordim.',
      'I felt sick and went to the doctor.',
      'Я плохо себя чувствовал и пошёл к врачу.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['sick', 'doctor', 'reply'],
  },

  en_s1u9_n2_020_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Why are you late for work?' }],
    options: [
      'I missed my train.',
      'I miss my train tomorrow.',
      'I did missed my train.',
      'I didn’t missed the train.',
    ],
    answer: 'I missed my train.',
    answerTranslation: L(
      '기차를 놓쳤어요.',
      'Men poyezdga ulgurmay qoldim.',
      'I missed my train.',
      'Я опоздал на поезд.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['excuse', 'dialog'],
  },

  // ===========================================================
  // Lesson 2 · Past simple negatives
  // ===========================================================

  en_s1u9_n2_021_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I didn’t phone the office.',
    audioText: 'I didn’t phone the office.',
    answerTranslation: L(
      '저는 회사에 전화하지 않았어요.',
      'Men ofisga telefon qilmadim.',
      'I didn’t phone the office.',
      'Я не позвонил в офис.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['past-negative', 'didnt'],
  },

  en_s1u9_n2_022_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'fridge',
    choices: [
      { text: 'train', label: '🚆', emoji: '🚆', imageUrl: '' },
      { text: 'fridge', label: '🧊', emoji: '🧊', imageUrl: '' },
      { text: 'shower', label: '🚿', emoji: '🚿', imageUrl: '' },
      { text: 'doctor', label: '🩺', emoji: '🩺', imageUrl: '' },
    ],
    answerTranslation: L('냉장고', 'muzlatgich', 'fridge', 'холодильник'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['fridge'],
  },

  en_s1u9_n2_023_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'fridge',
        native: 'muzlatgich',
        nativeI18n: L('냉장고', 'muzlatgich', 'fridge', 'холодильник'),
      },
      {
        text: 'horror',
        native: 'qo‘rqinch',
        nativeI18n: L('공포', 'qo‘rqinch', 'horror', 'ужасы'),
      },
      {
        text: 'headache',
        native: 'bosh og‘rig‘i',
        nativeI18n: L('두통', 'bosh og‘rig‘i', 'headache', 'головная боль'),
      },
      {
        text: 'shower',
        native: 'dush',
        nativeI18n: L('샤워', 'dush', 'shower', 'душ'),
      },
      {
        text: 'train',
        native: 'poyezd',
        nativeI18n: L('기차', 'poyezd', 'train', 'поезд'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['excuses', 'matching'],
  },

  en_s1u9_n2_024_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['office', 'didn’t', 'the', 'I', 'phone', 'called', 'phoned'],
    answer: 'I didn’t phone the office',
    answerTranslation: L(
      '저는 회사에 전화하지 않았어요.',
      'Men ofisga telefon qilmadim.',
      'I didn’t phone the office.',
      'Я не позвонил в офис.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['didnt', 'negative'],
  },

  en_s1u9_n2_025_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['well', 'didn’t', 'feel', 'I', 'felt', 'sick', 'wasn’t'],
    answer: 'I didn’t feel well',
    audioText: 'I didn’t feel well.',
    answerTranslation: L(
      '저는 몸이 좋지 않았어요.',
      'Men o‘zimni yaxshi his qilmadim.',
      'I didn’t feel well.',
      'Я плохо себя чувствовал.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['didnt', 'feel'],
  },

  en_s1u9_n2_026_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'fridge',
        native: 'muzlatgich',
        nativeI18n: L('냉장고', 'muzlatgich', 'fridge', 'холодильник'),
      },
      {
        text: 'horror',
        native: 'qo‘rqinch',
        nativeI18n: L('공포', 'qo‘rqinch', 'horror', 'ужасы'),
      },
      {
        text: 'headache',
        native: 'bosh og‘rig‘i',
        nativeI18n: L('두통', 'bosh og‘rig‘i', 'headache', 'головная боль'),
      },
      {
        text: 'shower',
        native: 'dush',
        nativeI18n: L('샤워', 'dush', 'shower', 'душ'),
      },
      {
        text: 'train',
        native: 'poyezd',
        nativeI18n: L('기차', 'poyezd', 'train', 'поезд'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['excuses', 'listening'],
  },

  en_s1u9_n2_027_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I ',
    sentenceSuffix: ' phone the office.',
    answer: 'didn’t',
    answerTranslation: L(
      '저는 회사에 전화하지 않았어요.',
      'Men ofisga telefon qilmadim.',
      'I didn’t phone the office.',
      'Я не позвонил в офис.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "didn’t".',
      acceptedAnswers: ["didn't"],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'didnt'],
  },

  en_s1u9_n2_028_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'horror',
    choices: [
      { text: 'headache', label: '🤕', emoji: '🤕', imageUrl: '' },
      { text: 'train', label: '🚆', emoji: '🚆', imageUrl: '' },
      { text: 'horror', label: '👻', emoji: '👻', imageUrl: '' },
      { text: 'shower', label: '🚿', emoji: '🚿', imageUrl: '' },
    ],
    answerTranslation: L('공포', 'qo‘rqinch', 'horror', 'ужасы'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['horror'],
  },

  en_s1u9_n2_029_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'I didn’t go to work yesterday.',
    audioText: 'I didn’t go to work yesterday.',
    answerI18n: L(
      '저는 어제 출근하지 않았어요',
      'Men kecha ishga bormadim',
      'I didn’t go to work yesterday',
      'Я вчера не ходил на работу',
    ),
    options: ['I', 'didn’t', 'go', 'to', 'work', 'yesterday', 'went'],
    optionsI18n: {
      ko: ['저는', '어제', '출근하지', '않았어요'],
      uz: ['Men', 'kecha', 'ishga', 'bormadim'],
      en: ['I', 'didn’t', 'go', 'to', 'work', 'yesterday'],
      ru: ['Я', 'вчера', 'не', 'ходил', 'на', 'работу'],
    },
    answerTranslation: L(
      '저는 어제 출근하지 않았어요.',
      'Men kecha ishga bormadim.',
      'I didn’t go to work yesterday.',
      'Я вчера не ходил на работу.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['past-negative', 'go'],
  },

  en_s1u9_n2_030_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Did you go to work yesterday?',
    options: ['No', 'I', 'didn’t', 'go', 'to', 'work', 'did', 'went'],
    answer: 'No I didn’t go to work',
    answerTranslation: L(
      '아니요, 출근하지 않았어요.',
      'Yo‘q, men ishga bormadim.',
      'No, I didn’t go to work.',
      'Нет, я не ходил на работу.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['didnt', 'reply'],
  },

  en_s1u9_n2_031_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'He didn’t ',
    sentenceSuffix: ' it.',
    answer: 'like',
    answerTranslation: L(
      '그는 그것을 좋아하지 않았어요.',
      'U buni yoqtirmadi.',
      'He didn’t like it.',
      'Ему это не понравилось.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'After "didn’t", use the base verb "like".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'base-verb'],
  },

  en_s1u9_n2_032_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'forget',
        native: 'unutmoq',
        nativeI18n: L('잊다', 'unutmoq', 'forget', 'забывать'),
      },
      {
        text: 'feel',
        native: 'his qilmoq',
        nativeI18n: L('느끼다', 'his qilmoq', 'feel', 'чувствовать'),
      },
      {
        text: 'sleep',
        native: 'uxlamoq',
        nativeI18n: L('자다', 'uxlamoq', 'sleep', 'спать'),
      },
      {
        text: 'miss',
        native: 'ulgurmay qolmoq',
        nativeI18n: L('놓치다', 'ulgurmay qolmoq', 'miss', 'опоздать'),
      },
      {
        text: 'doctor',
        native: 'shifokor',
        nativeI18n: L('의사', 'shifokor', 'doctor', 'врач'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['verbs', 'matching'],
  },

  en_s1u9_n2_033_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['football', 'We', 'didn’t', 'the', 'watch', 'watched', 'film'],
    answer: 'We didn’t watch the football',
    answerTranslation: L(
      '우리는 축구 경기를 보지 않았어요.',
      'Biz futbolni ko‘rmadik.',
      'We didn’t watch the football.',
      'Мы не смотрели футбол.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['didnt', 'base-verb'],
  },

  en_s1u9_n2_034_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'forget',
        native: 'unutmoq',
        nativeI18n: L('잊다', 'unutmoq', 'forget', 'забывать'),
      },
      {
        text: 'feel',
        native: 'his qilmoq',
        nativeI18n: L('느끼다', 'his qilmoq', 'feel', 'чувствовать'),
      },
      {
        text: 'sleep',
        native: 'uxlamoq',
        nativeI18n: L('자다', 'uxlamoq', 'sleep', 'спать'),
      },
      {
        text: 'miss',
        native: 'ulgurmay qolmoq',
        nativeI18n: L('놓치다', 'ulgurmay qolmoq', 'miss', 'опоздать'),
      },
      {
        text: 'doctor',
        native: 'shifokor',
        nativeI18n: L('의사', 'shifokor', 'doctor', 'врач'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['verbs', 'listening'],
  },

  en_s1u9_n2_035_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'doctor',
    choices: [
      { text: 'train', label: '🚆', emoji: '🚆', imageUrl: '' },
      { text: 'headache', label: '🤕', emoji: '🤕', imageUrl: '' },
      { text: 'doctor', label: '🩺', emoji: '🩺', imageUrl: '' },
      { text: 'fridge', label: '🧊', emoji: '🧊', imageUrl: '' },
    ],
    answerTranslation: L('의사', 'shifokor', 'doctor', 'врач'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['doctor'],
  },

  en_s1u9_n2_036_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She didn’t ___ science.',
    blankAnswers: ['study'],
    options: ['study', 'studied', 'studies', 'studying'],
    answer: 'study',
    answerTranslation: L(
      '그녀는 과학을 공부하지 않았어요.',
      'U tabiiy fanlarni o‘qimadi.',
      'She didn’t study science.',
      'Она не изучала естественные науки.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['didnt', 'base-verb'],
  },

  en_s1u9_n2_037_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'We didn’t ',
    sentenceSuffix: ' dinner at home.',
    answer: 'have',
    answerTranslation: L(
      '우리는 집에서 저녁을 먹지 않았어요.',
      'Biz uyda kechki ovqat yemadik.',
      'We didn’t have dinner at home.',
      'Мы не ужинали дома.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'After "didn’t", use the base verb "have".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'base-verb'],
  },

  en_s1u9_n2_038_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['late', 'get', 'didn’t', 'You', 'home', 'early', 'got'],
    answer: 'You didn’t get home late',
    audioText: 'You didn’t get home late.',
    answerTranslation: L(
      '당신은 집에 늦게 오지 않았어요.',
      'Siz uyga kech kelmadingiz.',
      'You didn’t get home late.',
      'Вы не вернулись домой поздно.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['negative', 'get'],
  },

  en_s1u9_n2_039_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Did your boss like your excuse?',
    options: ['No', 'he', 'didn’t', 'like', 'it', 'liked', 'yes'],
    answer: 'No he didn’t like it',
    answerTranslation: L(
      '아니요, 상사는 그 핑계를 좋아하지 않았어요.',
      'Yo‘q, boshlig‘im bu bahonani yoqtirmadi.',
      'No, he didn’t like it.',
      'Нет, ему это не понравилось.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['didnt', 'reply'],
  },

  en_s1u9_n2_040_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Did you stay at home yesterday?' }],
    options: [
      'Yes, I did. I didn’t feel well.',
      'Yes, I stayed? Did.',
      'No, I didn’t stayed home.',
      'Yes, I did felt sick.',
    ],
    answer: 'Yes, I did. I didn’t feel well.',
    answerTranslation: L(
      '네. 몸이 좋지 않았어요.',
      'Ha. O‘zimni yaxshi his qilmadim.',
      'Yes, I did. I didn’t feel well.',
      'Да. Я плохо себя чувствовал.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['short-answer', 'dialog'],
  },

  // ===========================================================
  // Lesson 3 · Past simple questions
  // ===========================================================

  en_s1u9_n2_041_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Did you go to work yesterday?',
    audioText: 'Did you go to work yesterday?',
    answerTranslation: L(
      '어제 출근했어요?',
      'Kecha ishga bordingizmi?',
      'Did you go to work yesterday?',
      'Вы вчера ходили на работу?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['past-question', 'did'],
  },

  en_s1u9_n2_042_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'train',
    choices: [
      { text: 'doctor', label: '🩺', emoji: '🩺', imageUrl: '' },
      { text: 'train', label: '🚆', emoji: '🚆', imageUrl: '' },
      { text: 'headache', label: '🤕', emoji: '🤕', imageUrl: '' },
      { text: 'shower', label: '🚿', emoji: '🚿', imageUrl: '' },
    ],
    answerTranslation: L('기차', 'poyezd', 'train', 'поезд'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['train'],
  },

  en_s1u9_n2_043_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'excuse',
        native: 'bahona',
        nativeI18n: L('핑계', 'bahona', 'excuse', 'оправдание'),
      },
      {
        text: 'horror',
        native: 'qo‘rqinch',
        nativeI18n: L('공포', 'qo‘rqinch', 'horror', 'ужасы'),
      },
      {
        text: 'headache',
        native: 'bosh og‘rig‘i',
        nativeI18n: L('두통', 'bosh og‘rig‘i', 'headache', 'головная боль'),
      },
      {
        text: 'doctor',
        native: 'shifokor',
        nativeI18n: L('의사', 'shifokor', 'doctor', 'врач'),
      },
      {
        text: 'train',
        native: 'poyezd',
        nativeI18n: L('기차', 'poyezd', 'train', 'поезд'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['questions', 'matching'],
  },

  en_s1u9_n2_044_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['work', 'Did', 'yesterday', 'you', 'go', 'to', 'went', 'didn’t'],
    answer: 'Did you go to work yesterday',
    answerTranslation: L(
      '어제 출근했어요?',
      'Kecha ishga bordingizmi?',
      'Did you go to work yesterday?',
      'Вы вчера ходили на работу?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['did', 'question'],
  },

  en_s1u9_n2_045_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['eat', 'What', 'did', 'you', 'ate', 'yesterday', 'where'],
    answer: 'What did you eat yesterday',
    audioText: 'What did you eat yesterday?',
    answerTranslation: L(
      '어제 무엇을 먹었어요?',
      'Kecha nima yedingiz?',
      'What did you eat yesterday?',
      'Что вы ели вчера?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['wh-question', 'did'],
  },

  en_s1u9_n2_046_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'excuse',
        native: 'bahona',
        nativeI18n: L('핑계', 'bahona', 'excuse', 'оправдание'),
      },
      {
        text: 'horror',
        native: 'qo‘rqinch',
        nativeI18n: L('공포', 'qo‘rqinch', 'horror', 'ужасы'),
      },
      {
        text: 'headache',
        native: 'bosh og‘rig‘i',
        nativeI18n: L('두통', 'bosh og‘rig‘i', 'headache', 'головная боль'),
      },
      {
        text: 'doctor',
        native: 'shifokor',
        nativeI18n: L('의사', 'shifokor', 'doctor', 'врач'),
      },
      {
        text: 'train',
        native: 'poyezd',
        nativeI18n: L('기차', 'poyezd', 'train', 'поезд'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['questions', 'listening'],
  },

  en_s1u9_n2_047_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Did you ',
    sentenceSuffix: ' to work yesterday?',
    answer: 'go',
    answerTranslation: L(
      '어제 출근했어요?',
      'Kecha ishga bordingizmi?',
      'Did you go to work yesterday?',
      'Вы вчера ходили на работу?',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'After "Did you", use the base verb "go".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'did-question'],
  },

  en_s1u9_n2_048_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'doctor',
    choices: [
      { text: 'fridge', label: '🧊', emoji: '🧊', imageUrl: '' },
      { text: 'shower', label: '🚿', emoji: '🚿', imageUrl: '' },
      { text: 'doctor', label: '🩺', emoji: '🩺', imageUrl: '' },
      { text: 'train', label: '🚆', emoji: '🚆', imageUrl: '' },
    ],
    answerTranslation: L('의사', 'shifokor', 'doctor', 'врач'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['doctor'],
  },

  en_s1u9_n2_049_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Did your friends walk to the theatre?',
    audioText: 'Did your friends walk to the theatre?',
    answerI18n: L(
      '친구들은 극장까지 걸어갔어요',
      'Do‘stlaringiz teatrga piyoda borishdimi',
      'Did your friends walk to the theatre',
      'Ваши друзья ходили в театр пешком',
    ),
    options: [
      'Did',
      'your',
      'friends',
      'walk',
      'to',
      'the',
      'theatre',
      'walked',
    ],
    optionsI18n: {
      ko: ['친구들은', '극장까지', '걸어갔어요'],
      uz: ['Do‘stlaringiz', 'teatrga', 'piyoda', 'borishdimi'],
      en: ['Did', 'your', 'friends', 'walk', 'to', 'the', 'theatre'],
      ru: ['Ваши', 'друзья', 'ходили', 'в', 'театр', 'пешком'],
    },
    answerTranslation: L(
      '친구들은 극장까지 걸어갔어요?',
      'Do‘stlaringiz teatrga piyoda borishdimi?',
      'Did your friends walk to the theatre?',
      'Ваши друзья ходили в театр пешком?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['did-question', 'base-verb'],
  },

  en_s1u9_n2_050_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Did you see your friends last week?',
    options: ['No', 'I', 'didn’t', 'see', 'them', 'saw', 'did'],
    answer: 'No I didn’t see them',
    answerTranslation: L(
      '아니요, 만나지 않았어요.',
      'Yo‘q, men ularni ko‘rmadim.',
      'No, I didn’t see them.',
      'Нет, я их не видел.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['didnt', 'reply'],
  },

  en_s1u9_n2_051_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'What did you ',
    sentenceSuffix: '?',
    answer: 'eat',
    answerTranslation: L(
      '무엇을 먹었어요?',
      'Nima yedingiz?',
      'What did you eat?',
      'Что вы ели?',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'After "did you", use the base verb "eat".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'wh-question'],
  },

  en_s1u9_n2_052_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'forget',
        native: 'unutmoq',
        nativeI18n: L('잊다', 'unutmoq', 'forget', 'забывать'),
      },
      {
        text: 'miss',
        native: 'ulgurmay qolmoq',
        nativeI18n: L('놓치다', 'ulgurmay qolmoq', 'miss', 'опоздать'),
      },
      {
        text: 'sleep',
        native: 'uxlamoq',
        nativeI18n: L('자다', 'uxlamoq', 'sleep', 'спать'),
      },
      {
        text: 'feel',
        native: 'his qilmoq',
        nativeI18n: L('느끼다', 'his qilmoq', 'feel', 'чувствовать'),
      },
      {
        text: 'sick',
        native: 'betob',
        nativeI18n: L('아픈', 'betob', 'sick', 'больной'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['questions', 'matching'],
  },

  en_s1u9_n2_053_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['film', 'Did', 'the', 'you', 'see', 'saw', 'did', 'yesterday'],
    answer: 'Did you see the film',
    answerTranslation: L(
      '그 영화를 봤어요?',
      'Filmni ko‘rdingizmi?',
      'Did you see the film?',
      'Вы видели фильм?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['did-question', 'see'],
  },

  en_s1u9_n2_054_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'forget',
        native: 'unutmoq',
        nativeI18n: L('잊다', 'unutmoq', 'forget', 'забывать'),
      },
      {
        text: 'miss',
        native: 'ulgurmay qolmoq',
        nativeI18n: L('놓치다', 'ulgurmay qolmoq', 'miss', 'опоздать'),
      },
      {
        text: 'sleep',
        native: 'uxlamoq',
        nativeI18n: L('자다', 'uxlamoq', 'sleep', 'спать'),
      },
      {
        text: 'feel',
        native: 'his qilmoq',
        nativeI18n: L('느끼다', 'his qilmoq', 'feel', 'чувствовать'),
      },
      {
        text: 'sick',
        native: 'betob',
        nativeI18n: L('아픈', 'betob', 'sick', 'больной'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['questions', 'listening'],
  },

  en_s1u9_n2_055_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'headache',
    choices: [
      { text: 'sick', label: '🤢', emoji: '🤢', imageUrl: '' },
      { text: 'train', label: '🚆', emoji: '🚆', imageUrl: '' },
      { text: 'headache', label: '🤕', emoji: '🤕', imageUrl: '' },
      { text: 'shower', label: '🚿', emoji: '🚿', imageUrl: '' },
    ],
    answerTranslation: L('두통', 'bosh og‘rig‘i', 'headache', 'головная боль'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['headache'],
  },

  en_s1u9_n2_056_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ you come to the party?',
    blankAnswers: ['Did'],
    options: ['Did', 'Do', 'Were', 'Was'],
    answer: 'Did',
    answerTranslation: L(
      '파티에 왔어요?',
      'Bazmga keldingizmi?',
      'Did you come to the party?',
      'Вы пришли на вечеринку?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['did-question'],
  },

  en_s1u9_n2_057_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Did the film ',
    sentenceSuffix: ' late?',
    answer: 'finish',
    answerTranslation: L(
      '영화가 늦게 끝났어요?',
      'Film kech tugadimi?',
      'Did the film finish late?',
      'Фильм закончился поздно?',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'After "Did", use the base verb "finish".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'base-verb'],
  },

  en_s1u9_n2_058_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['university', 'at', 'Did', 'fall', 'love', 'you', 'in', 'fell'],
    answer: 'Did you fall in love at university',
    audioText: 'Did you fall in love at university?',
    answerTranslation: L(
      '대학교에서 사랑에 빠졌어요?',
      'Universitetda sevib qoldingizmi?',
      'Did you fall in love at university?',
      'Вы влюбились в университете?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['did-question', 'fall'],
  },

  en_s1u9_n2_059_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Did the film finish late?',
    options: ['Yes', 'it', 'did', 'finished', 'No', 'didn’t'],
    answer: 'Yes it did',
    answerTranslation: L(
      '네, 그랬어요.',
      'Ha, shunday bo‘ldi.',
      'Yes, it did.',
      'Да.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['short-answer', 'reply'],
  },

  en_s1u9_n2_060_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Did you go shopping yesterday?' }],
    options: [
      'Yes, I did. I bought a birthday present.',
      'Yes, I went? Did.',
      'Yes, I did bought a present.',
      'No, I didn’t went shopping.',
    ],
    answer: 'Yes, I did. I bought a birthday present.',
    answerTranslation: L(
      '네. 생일 선물을 샀어요.',
      'Ha. Men tug‘ilgan kun sovg‘asini sotib oldim.',
      'Yes, I did. I bought a birthday present.',
      'Да. Я купил подарок на день рождения.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['did-question', 'dialog'],
  },

  // ===========================================================
  // Lesson 4 · Excuses and common verb phrases
  // ===========================================================

  en_s1u9_n2_061_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I forgot the time of the meeting.',
    audioText: 'I forgot the time of the meeting.',
    answerTranslation: L(
      '저는 회의 시간을 잊었어요.',
      'Men uchrashuv vaqtini unutdim.',
      'I forgot the time of the meeting.',
      'Я забыл время встречи.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['forget', 'excuse'],
  },

  en_s1u9_n2_062_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'sick',
    choices: [
      { text: 'headache', label: '🤕', emoji: '🤕', imageUrl: '' },
      { text: 'sick', label: '🤢', emoji: '🤢', imageUrl: '' },
      { text: 'train', label: '🚆', emoji: '🚆', imageUrl: '' },
      { text: 'doctor', label: '🩺', emoji: '🩺', imageUrl: '' },
    ],
    answerTranslation: L('아픈', 'betob', 'sick', 'больной'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['sick'],
  },

  en_s1u9_n2_063_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'forget',
        native: 'unutmoq',
        nativeI18n: L('잊다', 'unutmoq', 'forget', 'забывать'),
      },
      {
        text: 'miss',
        native: 'ulgurmay qolmoq',
        nativeI18n: L('놓치다', 'ulgurmay qolmoq', 'miss', 'опоздать'),
      },
      {
        text: 'sleep',
        native: 'uxlamoq',
        nativeI18n: L('자다', 'uxlamoq', 'sleep', 'спать'),
      },
      {
        text: 'feel',
        native: 'his qilmoq',
        nativeI18n: L('느끼다', 'his qilmoq', 'feel', 'чувствовать'),
      },
      {
        text: 'sick',
        native: 'betob',
        nativeI18n: L('아픈', 'betob', 'sick', 'больной'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['verb-phrases', 'matching'],
  },

  en_s1u9_n2_064_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['meeting', 'the', 'forgot', 'of', 'I', 'time', 'missed', 'train'],
    answer: 'I forgot the time of the meeting',
    answerTranslation: L(
      '저는 회의 시간을 잊었어요.',
      'Men uchrashuv vaqtini unutdim.',
      'I forgot the time of the meeting.',
      'Я забыл время встречи.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['forgot', 'excuse'],
  },

  en_s1u9_n2_065_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['badly', 'last', 'slept', 'I', 'night', 'sleep', 'felt'],
    answer: 'I slept badly last night',
    audioText: 'I slept badly last night.',
    answerTranslation: L(
      '저는 어젯밤에 잠을 잘 못 잤어요.',
      'Men kecha kechasi yomon uxladim.',
      'I slept badly last night.',
      'Прошлой ночью я плохо спал.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['slept', 'verb-phrase'],
  },

  en_s1u9_n2_066_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'forget',
        native: 'unutmoq',
        nativeI18n: L('잊다', 'unutmoq', 'forget', 'забывать'),
      },
      {
        text: 'miss',
        native: 'ulgurmay qolmoq',
        nativeI18n: L('놓치다', 'ulgurmay qolmoq', 'miss', 'опоздать'),
      },
      {
        text: 'sleep',
        native: 'uxlamoq',
        nativeI18n: L('자다', 'uxlamoq', 'sleep', 'спать'),
      },
      {
        text: 'feel',
        native: 'his qilmoq',
        nativeI18n: L('느끼다', 'his qilmoq', 'feel', 'чувствовать'),
      },
      {
        text: 'sick',
        native: 'betob',
        nativeI18n: L('아픈', 'betob', 'sick', 'больной'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['verb-phrases', 'listening'],
  },

  en_s1u9_n2_067_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I ',
    sentenceSuffix: ' badly last night.',
    answer: 'slept',
    answerTranslation: L(
      '저는 어젯밤에 잠을 잘 못 잤어요.',
      'Men kecha kechasi yomon uxladim.',
      'I slept badly last night.',
      'Прошлой ночью я плохо спал.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is the past form "slept".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'slept'],
  },

  en_s1u9_n2_068_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'fridge',
    choices: [
      { text: 'doctor', label: '🩺', emoji: '🩺', imageUrl: '' },
      { text: 'train', label: '🚆', emoji: '🚆', imageUrl: '' },
      { text: 'fridge', label: '🧊', emoji: '🧊', imageUrl: '' },
      { text: 'shower', label: '🚿', emoji: '🚿', imageUrl: '' },
    ],
    answerTranslation: L('냉장고', 'muzlatgich', 'fridge', 'холодильник'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['fridge'],
  },

  en_s1u9_n2_069_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'She fell in the shower and hurt her leg.',
    audioText: 'She fell in the shower and hurt her leg.',
    answerI18n: L(
      '그녀는 샤워실에서 넘어져 다리를 다쳤어요',
      'U dushda yiqilib oyog‘ini jarohatladi',
      'She fell in the shower and hurt her leg',
      'Она упала в душе и повредила ногу',
    ),
    options: [
      'She',
      'fell',
      'in',
      'the',
      'shower',
      'and',
      'hurt',
      'her',
      'leg',
      'train',
    ],
    optionsI18n: {
      ko: ['그녀는', '샤워실에서', '넘어져', '다리를', '다쳤어요'],
      uz: ['U', 'dushda', 'yiqilib', 'oyog‘ini', 'jarohatladi'],
      en: ['She', 'fell', 'in', 'the', 'shower', 'and', 'hurt', 'her', 'leg'],
      ru: ['Она', 'упала', 'в', 'душе', 'и', 'повредила', 'ногу'],
    },
    answerTranslation: L(
      '그녀는 샤워실에서 넘어져 다리를 다쳤어요.',
      'U dushda yiqilib oyog‘ini jarohatladi.',
      'She fell in the shower and hurt her leg.',
      'Она упала в душе и повредила ногу.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['shower', 'fell'],
  },

  en_s1u9_n2_070_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Why didn’t you do your homework?',
    options: ['I', 'forgot', 'the', 'time', 'and', 'fell', 'asleep', 'train'],
    answer: 'I forgot the time and fell asleep',
    answerTranslation: L(
      '시간을 잊어버리고 잠들었어요.',
      'Vaqtni unutib, uxlab qolibman.',
      'I forgot the time and fell asleep.',
      'Я забыл о времени и уснул.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['excuse', 'forgot', 'reply'],
  },

  en_s1u9_n2_071_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'She ',
    sentenceSuffix: ' sick in the morning.',
    answer: 'felt',
    answerTranslation: L(
      '그녀는 아침에 몸이 안 좋았어요.',
      'U ertalab o‘zini betob his qildi.',
      'She felt sick in the morning.',
      'Утром она плохо себя чувствовала.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is the past form "felt".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'felt'],
  },

  en_s1u9_n2_072_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'fridge',
        native: 'muzlatgich',
        nativeI18n: L('냉장고', 'muzlatgich', 'fridge', 'холодильник'),
      },
      {
        text: 'horror',
        native: 'qo‘rqinch',
        nativeI18n: L('공포', 'qo‘rqinch', 'horror', 'ужасы'),
      },
      {
        text: 'headache',
        native: 'bosh og‘rig‘i',
        nativeI18n: L('두통', 'bosh og‘rig‘i', 'headache', 'головная боль'),
      },
      {
        text: 'shower',
        native: 'dush',
        nativeI18n: L('샤워', 'dush', 'shower', 'душ'),
      },
      {
        text: 'excuse',
        native: 'bahona',
        nativeI18n: L('핑계', 'bahona', 'excuse', 'оправдание'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit9', 'matching'],
  },

  en_s1u9_n2_073_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'headache',
      'because',
      'I',
      'doctor',
      'a',
      'had',
      'went',
      'train',
    ],
    answer: 'I went to the doctor because I had a headache',
    answerTranslation: L(
      '두통이 있어서 병원에 갔어요.',
      'Boshim og‘rigani uchun shifokorga bordim.',
      'I went to the doctor because I had a headache.',
      'Я пошёл к врачу, потому что у меня болела голова.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['doctor', 'headache'],
  },

  en_s1u9_n2_074_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'fridge',
        native: 'muzlatgich',
        nativeI18n: L('냉장고', 'muzlatgich', 'fridge', 'холодильник'),
      },
      {
        text: 'horror',
        native: 'qo‘rqinch',
        nativeI18n: L('공포', 'qo‘rqinch', 'horror', 'ужасы'),
      },
      {
        text: 'headache',
        native: 'bosh og‘rig‘i',
        nativeI18n: L('두통', 'bosh og‘rig‘i', 'headache', 'головная боль'),
      },
      {
        text: 'shower',
        native: 'dush',
        nativeI18n: L('샤워', 'dush', 'shower', 'душ'),
      },
      {
        text: 'excuse',
        native: 'bahona',
        nativeI18n: L('핑계', 'bahona', 'excuse', 'оправдание'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['unit9', 'listening'],
  },

  en_s1u9_n2_075_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'shower',
    choices: [
      { text: 'doctor', label: '🩺', emoji: '🩺', imageUrl: '' },
      { text: 'headache', label: '🤕', emoji: '🤕', imageUrl: '' },
      { text: 'shower', label: '🚿', emoji: '🚿', imageUrl: '' },
      { text: 'train', label: '🚆', emoji: '🚆', imageUrl: '' },
    ],
    answerTranslation: L('샤워', 'dush', 'shower', 'душ'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['shower'],
  },

  en_s1u9_n2_076_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I ___ badly because my neighbours had a party.',
    blankAnswers: ['slept'],
    options: ['slept', 'sleep', 'sleeped', 'sleeps'],
    answer: 'slept',
    answerTranslation: L(
      '이웃들이 파티를 해서 잠을 잘 못 잤어요.',
      'Qo‘shnilarim bazm qilgani uchun yomon uxladim.',
      'I slept badly because my neighbours had a party.',
      'Я плохо спал, потому что соседи устроили вечеринку.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['slept', 'verb-phrase'],
  },

  en_s1u9_n2_077_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I ',
    sentenceSuffix: ' my train because it left early.',
    answer: 'missed',
    answerTranslation: L(
      '기차가 일찍 출발해서 놓쳤어요.',
      'Poyezd erta ketgani uchun unga ulgurmay qoldim.',
      'I missed my train because it left early.',
      'Я опоздал на поезд, потому что он ушёл рано.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is the past form "missed".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'missed'],
  },

  en_s1u9_n2_078_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'old',
      'friend',
      'met',
      'I',
      'an',
      'work',
      'to',
      'way',
      'the',
      'on',
      'train',
    ],
    answer: 'I met an old friend on the way to work',
    audioText: 'I met an old friend on the way to work.',
    answerTranslation: L(
      '저는 출근길에 오랜 친구를 만났어요.',
      'Men ishga ketayotib eski do‘stimni uchratdim.',
      'I met an old friend on the way to work.',
      'По дороге на работу я встретил старого друга.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['old-friend', 'verb-phrase'],
  },

  en_s1u9_n2_079_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'You’re two hours late. What happened?',
    options: [
      'I',
      'missed',
      'my',
      'train',
      'and',
      'then',
      'met',
      'an',
      'old',
      'friend',
      'doctor',
    ],
    answer: 'I missed my train and then met an old friend',
    answerTranslation: L(
      '기차를 놓쳤고 그다음 오랜 친구를 만났어요.',
      'Poyezdga ulgurmadim, keyin eski do‘stimni uchratdim.',
      'I missed my train and then met an old friend.',
      'Я опоздал на поезд, а потом встретил старого друга.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['excuse', 'reply'],
  },

  en_s1u9_n2_080_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Why didn’t you come to work yesterday?' },
    ],
    options: [
      'I felt sick, so I went to the doctor.',
      'I did felt sick, so I went doctor.',
      'I didn’t went because I feel sick.',
      'I was miss my train tomorrow.',
    ],
    answer: 'I felt sick, so I went to the doctor.',
    answerTranslation: L(
      '몸이 안 좋아서 병원에 갔어요.',
      'O‘zimni betob his qildim, shuning uchun shifokorga bordim.',
      'I felt sick, so I went to the doctor.',
      'Я плохо себя чувствовал, поэтому пошёл к врачу.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['excuse', 'unit9', 'final'],
  },
};

export const EN_S1_UNIT9_NODE2 = {
  title: L('좋은 핑계', 'Yaxshi bahona', 'A good excuse', 'Хорошая отговорка'),
  section: 1,
  unit: 9,
  order: 2,
  isActive: true,

  lessons: [
    {
      title: L(
        '늦은 이유 말하기',
        'Kech qolish sababini aytish',
        'A good excuse',
        'Хорошая отговорка',
      ),
      description: L(
        '두통, 몸이 아픈 상황, 기차를 놓친 일처럼 일상에서 사용할 수 있는 과거의 이유와 핑계를 말해요.',
        'Bosh og‘rig‘i, betob bo‘lish yoki poyezdga ulgurmay qolish kabi kundalik sabablarni o‘tgan zamonda aytasiz.',
        'Talk about everyday excuses such as feeling sick, having a headache or missing a train.',
        'Учимся объяснять опоздания и проблемы: плохое самочувствие, головная боль или опоздание на поезд.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 1,
      questions: [
        'en_s1u9_n2_001_speaking',
        'en_s1u9_n2_002_image_choice',
        'en_s1u9_n2_003_word_matching',
        'en_s1u9_n2_004_translate_builder',
        'en_s1u9_n2_005_word_arrange',
        'en_s1u9_n2_006_audio_match',
        'en_s1u9_n2_007_type_answer',
        'en_s1u9_n2_008_image_choice',
        'en_s1u9_n2_009_sentence_builder',
        'en_s1u9_n2_010_reply_builder',
        'en_s1u9_n2_011_type_answer',
        'en_s1u9_n2_012_word_matching',
        'en_s1u9_n2_013_translate_builder',
        'en_s1u9_n2_014_audio_match',
        'en_s1u9_n2_015_image_choice',
        'en_s1u9_n2_016_fill_in_blank',
        'en_s1u9_n2_017_type_answer',
        'en_s1u9_n2_018_word_arrange',
        'en_s1u9_n2_019_reply_builder',
        'en_s1u9_n2_020_dialog_complete',
      ],
    },

    {
      title: L(
        '과거 부정문',
        'O‘tgan zamon inkor gaplari',
        'Past simple negatives',
        'Отрицания в прошедшем времени',
      ),
      description: L(
        'didn’t 뒤에는 과거형이 아니라 동사원형을 사용한다는 규칙을 다양한 문장으로 연습해요.',
        'Didn’t dan keyin fe’lning o‘tgan zamoni emas, asosiy shakli kelishini mashq qilasiz.',
        'Practise using the base verb after didn’t in past simple negative sentences.',
        'Практикуем правило: после didn’t используется начальная форма глагола.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 2,
      questions: [
        'en_s1u9_n2_021_speaking',
        'en_s1u9_n2_022_image_choice',
        'en_s1u9_n2_023_word_matching',
        'en_s1u9_n2_024_translate_builder',
        'en_s1u9_n2_025_word_arrange',
        'en_s1u9_n2_026_audio_match',
        'en_s1u9_n2_027_type_answer',
        'en_s1u9_n2_028_image_choice',
        'en_s1u9_n2_029_sentence_builder',
        'en_s1u9_n2_030_reply_builder',
        'en_s1u9_n2_031_type_answer',
        'en_s1u9_n2_032_word_matching',
        'en_s1u9_n2_033_translate_builder',
        'en_s1u9_n2_034_audio_match',
        'en_s1u9_n2_035_image_choice',
        'en_s1u9_n2_036_fill_in_blank',
        'en_s1u9_n2_037_type_answer',
        'en_s1u9_n2_038_word_arrange',
        'en_s1u9_n2_039_reply_builder',
        'en_s1u9_n2_040_dialog_complete',
      ],
    },

    {
      title: L(
        '과거 질문하기',
        'O‘tgan zamonda savol berish',
        'Past simple questions',
        'Вопросы в прошедшем времени',
      ),
      description: L(
        'Did you ...?와 What/Where/Why did you ...? 구조로 과거 행동에 대해 질문하고 짧게 대답해요.',
        'Did you ...? hamda What/Where/Why did you ...? yordamida o‘tgan voqealar haqida savol berib, qisqa javob qaytarasiz.',
        'Ask about past actions with Did you ...? and wh- questions, and practise short answers.',
        'Задаём вопросы о прошлом с Did you ...? и вопросительными словами и даём краткие ответы.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 3,
      questions: [
        'en_s1u9_n2_041_speaking',
        'en_s1u9_n2_042_image_choice',
        'en_s1u9_n2_043_word_matching',
        'en_s1u9_n2_044_translate_builder',
        'en_s1u9_n2_045_word_arrange',
        'en_s1u9_n2_046_audio_match',
        'en_s1u9_n2_047_type_answer',
        'en_s1u9_n2_048_image_choice',
        'en_s1u9_n2_049_sentence_builder',
        'en_s1u9_n2_050_reply_builder',
        'en_s1u9_n2_051_type_answer',
        'en_s1u9_n2_052_word_matching',
        'en_s1u9_n2_053_translate_builder',
        'en_s1u9_n2_054_audio_match',
        'en_s1u9_n2_055_image_choice',
        'en_s1u9_n2_056_fill_in_blank',
        'en_s1u9_n2_057_type_answer',
        'en_s1u9_n2_058_word_arrange',
        'en_s1u9_n2_059_reply_builder',
        'en_s1u9_n2_060_dialog_complete',
      ],
    },

    {
      title: L(
        '일상적인 핑계와 동사구',
        'Kundalik bahonalar va fe’l birikmalari',
        'Excuses and verb phrases',
        'Отговорки и глагольные сочетания',
      ),
      description: L(
        'sleep badly, feel sick, miss a train, forget the time 같은 자주 쓰는 동사구를 실제 핑계와 대화 속에서 연습해요.',
        'Sleep badly, feel sick, miss a train va forget the time kabi ko‘p ishlatiladigan birikmalarni suhbatlarda mashq qilasiz.',
        'Practise common verb phrases such as sleep badly, feel sick, miss a train and forget the time in realistic excuses.',
        'Практикуем частые сочетания sleep badly, feel sick, miss a train и forget the time в реальных ситуациях.',
      ),
      category: LessonCategory.EXPRESSION,
      level: LV,
      order: 4,
      questions: [
        'en_s1u9_n2_061_speaking',
        'en_s1u9_n2_062_image_choice',
        'en_s1u9_n2_063_word_matching',
        'en_s1u9_n2_064_translate_builder',
        'en_s1u9_n2_065_word_arrange',
        'en_s1u9_n2_066_audio_match',
        'en_s1u9_n2_067_type_answer',
        'en_s1u9_n2_068_image_choice',
        'en_s1u9_n2_069_sentence_builder',
        'en_s1u9_n2_070_reply_builder',
        'en_s1u9_n2_071_type_answer',
        'en_s1u9_n2_072_word_matching',
        'en_s1u9_n2_073_translate_builder',
        'en_s1u9_n2_074_audio_match',
        'en_s1u9_n2_075_image_choice',
        'en_s1u9_n2_076_fill_in_blank',
        'en_s1u9_n2_077_type_answer',
        'en_s1u9_n2_078_word_arrange',
        'en_s1u9_n2_079_reply_builder',
        'en_s1u9_n2_080_dialog_complete',
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Section 1 · Unit 9 · Node 3
// 9.3 News stories
//
// Coverage
// - ago
// - five minutes ago
// - three days ago
// - a week ago
// - six months ago
// - a year ago
// - When did you last ...?
// - asking questions about news stories
// - When did it happen?
// - Where did it happen?
// - Who did ...?
// - What did ...?
// - Why did ...?
// - How did ...?
// - unusual restaurant tips
// - customer / waiter / bill / tip
// - mistake / huge / millionaire
// - homeless people
// - Dominique and Robbie news story
// - guessing meaning from context
//
// IMPORTANT:
// *_WORDS에는 무조건 단어 하나만 등록.
// "six months ago", "news story", "rush hour",
// "credit card receipt", "local charity" 같은 구/문장 등록 금지.
//
// Reused:
// charity / message / husband / friend
// restaurant / money / card / street
// help / give / sleep / lose / meet / write
// buy / sell / see / leave / go / get
//
// 4 lessons × 20 questions = 80
// type_answer: 3 per lesson
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT9_NODE3_WORDS = [
  {
    code: 'en-noun-tip',
    english: 'tip',
    senseKey: 'extra-money-given-for-service',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '팁; 봉사료',
      'choychaqa',
      'extra money given to someone for good service',
      'чаевые',
    ),
    examples: [
      {
        english: 'The waiter got a big tip.',
        translations: L(
          '웨이터는 큰 팁을 받았어요.',
          'Ofitsiant katta choychaqa oldi.',
          'The waiter got a big tip.',
          'Официант получил большие чаевые.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/tɪp/',
      ttsText: 'tip',
    },
    media: {
      emoji: '💵',
      imageUrl: '',
      imageAlt: L(
        '식당에서 주는 팁',
        'restorandagi choychaqa',
        'a restaurant tip',
        'чаевые в ресторане',
      ),
    },
    tags: ['restaurant', 'money'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-job-waiter',
    english: 'waiter',
    senseKey: 'man-serving-food-in-restaurant',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '웨이터',
      'ofitsiant',
      'a man whose job is to serve food and drinks in a restaurant',
      'официант',
    ),
    examples: [
      {
        english: 'The waiter got a huge tip.',
        translations: L(
          '웨이터는 아주 큰 팁을 받았어요.',
          'Ofitsiant juda katta choychaqa oldi.',
          'The waiter got a huge tip.',
          'Официант получил огромные чаевые.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈweɪtə/',
      ttsText: 'waiter',
    },
    media: {
      emoji: '🧑‍🍳',
      imageUrl: '',
      imageAlt: L('식당 웨이터', 'restoran ofitsianti', 'a waiter', 'официант'),
    },
    tags: ['jobs', 'restaurant'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-person-customer',
    english: 'customer',
    senseKey: 'person-buying-goods-or-services',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '손님; 고객',
      'mijoz',
      'a person who buys goods or services',
      'клиент; покупатель',
    ),
    examples: [
      {
        english: 'A customer left a large tip.',
        translations: L(
          '한 손님이 큰 팁을 남겼어요.',
          'Bir mijoz katta choychaqa qoldirdi.',
          'A customer left a large tip.',
          'Клиент оставил большие чаевые.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkʌstəmə/',
      ttsText: 'customer',
    },
    media: {
      emoji: '🙋',
      imageUrl: '',
      imageAlt: L('식당 손님', 'restoran mijozi', 'a customer', 'клиент'),
    },
    tags: ['restaurant', 'people'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-bill',
    english: 'bill',
    senseKey: 'written-amount-to-pay',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '계산서',
      'hisob',
      'a written statement showing how much money you must pay',
      'счёт',
    ),
    examples: [
      {
        english: 'The bill was fifty dollars.',
        translations: L(
          '계산서는 50달러였어요.',
          'Hisob ellik dollar edi.',
          'The bill was fifty dollars.',
          'Счёт был на пятьдесят долларов.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/bɪl/',
      ttsText: 'bill',
    },
    media: {
      emoji: '🧾',
      imageUrl: '',
      imageAlt: L(
        '식당 계산서',
        'restoran hisobi',
        'a restaurant bill',
        'счёт в ресторане',
      ),
    },
    tags: ['restaurant', 'money'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-mistake',
    english: 'mistake',
    senseKey: 'something-done-incorrectly',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '실수',
      'xato',
      'something that you do or understand incorrectly',
      'ошибка',
    ),
    examples: [
      {
        english: 'The waiter thought it was a mistake.',
        translations: L(
          '웨이터는 그것이 실수라고 생각했어요.',
          'Ofitsiant buni xato deb o‘yladi.',
          'The waiter thought it was a mistake.',
          'Официант подумал, что это была ошибка.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/mɪˈsteɪk/',
      ttsText: 'mistake',
    },
    media: {
      emoji: '❌',
      imageUrl: '',
      imageAlt: L('실수 표시', 'xato belgisi', 'a mistake', 'ошибка'),
    },
    tags: ['general', 'news'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-fashion',
    english: 'fashion',
    senseKey: 'popular-way-of-doing-something',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '유행',
      'moda',
      'a popular way of doing something at a particular time',
      'мода; тенденция',
    ),
    examples: [
      {
        english: 'Big tips became a fashion.',
        translations: L(
          '큰 팁을 주는 것이 유행이 되었어요.',
          'Katta choychaqa berish moda bo‘ldi.',
          'Big tips became a fashion.',
          'Большие чаевые вошли в моду.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈfæʃən/',
      ttsText: 'fashion',
    },
    media: {
      emoji: '📈',
      imageUrl: '',
      imageAlt: L(
        '유행하는 현상',
        'modadagi holat',
        'a popular fashion',
        'популярная тенденция',
      ),
    },
    tags: ['news', 'society'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-person-millionaire',
    english: 'millionaire',
    senseKey: 'person-with-million-or-more',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '백만장자',
      'millioner',
      'a person who has at least a million dollars, euros or other currency',
      'миллионер',
    ),
    examples: [
      {
        english: 'People thought the giver was a millionaire.',
        translations: L(
          '사람들은 돈을 준 사람이 백만장자라고 생각했어요.',
          'Odamlar pul bergan odam millioner deb o‘ylashdi.',
          'People thought the giver was a millionaire.',
          'Люди думали, что тот, кто дал деньги, был миллионером.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌmɪljəˈneə/',
      ttsText: 'millionaire',
    },
    media: {
      emoji: '💰',
      imageUrl: '',
      imageAlt: L(
        '많은 돈을 가진 사람',
        'ko‘p puli bor odam',
        'a millionaire',
        'миллионер',
      ),
    },
    tags: ['money', 'people'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-homeless',
    english: 'homeless',
    senseKey: 'without-permanent-home',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '집이 없는; 노숙 상태의',
      'uysiz',
      'without a permanent place to live',
      'бездомный',
    ),
    examples: [
      {
        english: 'Robbie was homeless.',
        translations: L(
          '로비는 집이 없었어요.',
          'Robbie uysiz edi.',
          'Robbie was homeless.',
          'Робби был бездомным.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈhəʊmləs/',
      ttsText: 'homeless',
    },
    media: {
      emoji: '🏚️',
      imageUrl: '',
      imageAlt: L(
        '집 없이 거리에서 지내는 사람',
        'uysiz odam',
        'a homeless person',
        'бездомный человек',
      ),
    },
    tags: ['people', 'community'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-receipt',
    english: 'receipt',
    senseKey: 'paper-record-of-payment',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '영수증',
      'chek',
      'a piece of paper that shows that money was paid',
      'чек; квитанция',
    ),
    examples: [
      {
        english: 'He wanted to find the receipt.',
        translations: L(
          '그는 영수증을 찾고 싶어 했어요.',
          'U chekni topmoqchi edi.',
          'He wanted to find the receipt.',
          'Он хотел найти чек.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/rɪˈsiːt/',
      ttsText: 'receipt',
    },
    media: {
      emoji: '🧾',
      imageUrl: '',
      imageAlt: L('영수증', 'chek', 'a receipt', 'чек'),
    },
    tags: ['shopping', 'money'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-retirement',
    english: 'retirement',
    senseKey: 'period-after-stopping-work',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '은퇴; 은퇴 생활',
      'nafaqa davri',
      'the period of life after a person stops working',
      'пенсия; выход на пенсию',
    ),
    examples: [
      {
        english: 'He needed money for his retirement.',
        translations: L(
          '그는 은퇴 생활을 위해 돈이 필요했어요.',
          'Unga nafaqa davri uchun pul kerak edi.',
          'He needed money for his retirement.',
          'Ему нужны были деньги на пенсию.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/rɪˈtaɪəmənt/',
      ttsText: 'retirement',
    },
    media: {
      emoji: '🏖️',
      imageUrl: '',
      imageAlt: L('은퇴 생활', 'nafaqa davri', 'retirement', 'пенсия'),
    },
    tags: ['life', 'work'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-huge',
    english: 'huge',
    senseKey: 'extremely-large',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('아주 큰; 엄청난', 'juda katta', 'extremely large', 'огромный'),
    examples: [
      {
        english: 'The waiter got a huge tip.',
        translations: L(
          '웨이터는 엄청난 팁을 받았어요.',
          'Ofitsiant juda katta choychaqa oldi.',
          'The waiter got a huge tip.',
          'Официант получил огромные чаевые.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/hjuːdʒ/',
      ttsText: 'huge',
    },
    media: {
      emoji: '🔝',
      imageUrl: '',
      imageAlt: L(
        '아주 큰 것',
        'juda katta narsa',
        'something huge',
        'что-то огромное',
      ),
    },
    tags: ['adjectives', 'size'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-local',
    english: 'local',
    senseKey: 'belonging-to-nearby-area',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '지역의; 현지의',
      'mahalliy',
      'connected with the area where you live or are',
      'местный',
    ),
    examples: [
      {
        english: 'She gave the money to a local charity.',
        translations: L(
          '그녀는 그 돈을 지역 자선단체에 전달했어요.',
          'U pulni mahalliy xayriya tashkilotiga berdi.',
          'She gave the money to a local charity.',
          'Она передала деньги местной благотворительной организации.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈləʊkəl/',
      ttsText: 'local',
    },
    media: {
      emoji: '📍',
      imageUrl: '',
      imageAlt: L(
        '지역을 나타내는 위치 표시',
        'mahalliy joy belgisi',
        'a local area',
        'местный район',
      ),
    },
    tags: ['community', 'adjectives'],
    difficulty: 1,
    isCore: true,
  },
];

export const EN_S1_UNIT9_NODE3_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · How long ago?
  // ===========================================================

  en_s1u9_n3_001_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I saw her three days ago.',
    audioText: 'I saw her three days ago.',
    answerTranslation: L(
      '저는 사흘 전에 그녀를 봤어요.',
      'Men uni uch kun oldin ko‘rdim.',
      'I saw her three days ago.',
      'Я видел её три дня назад.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['ago', 'past-time'],
  },

  en_s1u9_n3_002_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'tip',
    choices: [
      { text: 'bill', label: '🧾', emoji: '🧾', imageUrl: '' },
      { text: 'tip', label: '💵', emoji: '💵', imageUrl: '' },
      { text: 'receipt', label: '🧾', emoji: '🧾', imageUrl: '' },
      { text: 'millionaire', label: '💰', emoji: '💰', imageUrl: '' },
    ],
    answerTranslation: L('팁', 'choychaqa', 'tip', 'чаевые'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['tip'],
  },

  en_s1u9_n3_003_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'tip',
        native: 'choychaqa',
        nativeI18n: L('팁', 'choychaqa', 'tip', 'чаевые'),
      },
      {
        text: 'waiter',
        native: 'ofitsiant',
        nativeI18n: L('웨이터', 'ofitsiant', 'waiter', 'официант'),
      },
      {
        text: 'customer',
        native: 'mijoz',
        nativeI18n: L('손님', 'mijoz', 'customer', 'клиент'),
      },
      {
        text: 'bill',
        native: 'hisob',
        nativeI18n: L('계산서', 'hisob', 'bill', 'счёт'),
      },
      {
        text: 'mistake',
        native: 'xato',
        nativeI18n: L('실수', 'xato', 'mistake', 'ошибка'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['news', 'matching'],
  },

  en_s1u9_n3_004_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['ago', 'film', 'three', 'saw', 'We', 'days', 'a', 'last', 'week'],
    answer: 'We saw a film three days ago',
    answerTranslation: L(
      '우리는 사흘 전에 영화를 봤어요.',
      'Biz uch kun oldin film ko‘rdik.',
      'We saw a film three days ago.',
      'Мы посмотрели фильм три дня назад.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['ago', 'past-time'],
  },

  en_s1u9_n3_005_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'minutes',
      'message',
      'ago',
      'You',
      'a',
      'five',
      'got',
      'yesterday',
    ],
    answer: 'You got a message five minutes ago',
    audioText: 'You got a message five minutes ago.',
    answerTranslation: L(
      '당신은 5분 전에 메시지를 받았어요.',
      'Siz besh daqiqa oldin xabar oldingiz.',
      'You got a message five minutes ago.',
      'Вы получили сообщение пять минут назад.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['ago', 'message'],
  },

  en_s1u9_n3_006_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'tip',
        native: 'choychaqa',
        nativeI18n: L('팁', 'choychaqa', 'tip', 'чаевые'),
      },
      {
        text: 'waiter',
        native: 'ofitsiant',
        nativeI18n: L('웨이터', 'ofitsiant', 'waiter', 'официант'),
      },
      {
        text: 'customer',
        native: 'mijoz',
        nativeI18n: L('손님', 'mijoz', 'customer', 'клиент'),
      },
      {
        text: 'bill',
        native: 'hisob',
        nativeI18n: L('계산서', 'hisob', 'bill', 'счёт'),
      },
      {
        text: 'mistake',
        native: 'xato',
        nativeI18n: L('실수', 'xato', 'mistake', 'ошибка'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['news', 'listening'],
  },

  en_s1u9_n3_007_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I saw her three days ',
    sentenceSuffix: '.',
    answer: 'ago',
    answerTranslation: L(
      '저는 사흘 전에 그녀를 봤어요.',
      'Men uni uch kun oldin ko‘rdim.',
      'I saw her three days ago.',
      'Я видел её три дня назад.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "ago".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'ago'],
  },

  en_s1u9_n3_008_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'bill',
    choices: [
      { text: 'waiter', label: '🧑‍🍳', emoji: '🧑‍🍳', imageUrl: '' },
      { text: 'millionaire', label: '💰', emoji: '💰', imageUrl: '' },
      { text: 'bill', label: '🧾', emoji: '🧾', imageUrl: '' },
      { text: 'customer', label: '🙋', emoji: '🙋', imageUrl: '' },
    ],
    answerTranslation: L('계산서', 'hisob', 'bill', 'счёт'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['bill'],
  },

  en_s1u9_n3_009_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'They went on holiday a year ago.',
    audioText: 'They went on holiday a year ago.',
    answerI18n: L(
      '그들은 1년 전에 휴가를 갔어요',
      'Ular bir yil oldin ta’tilga borishdi',
      'They went on holiday a year ago',
      'Они ездили в отпуск год назад',
    ),
    options: ['They', 'went', 'on', 'holiday', 'a', 'year', 'ago', 'last'],
    optionsI18n: {
      ko: ['그들은', '1년', '전에', '휴가를', '갔어요'],
      uz: ['Ular', 'bir', 'yil', 'oldin', 'ta’tilga', 'borishdi'],
      en: ['They', 'went', 'on', 'holiday', 'a', 'year', 'ago'],
      ru: ['Они', 'ездили', 'в', 'отпуск', 'год', 'назад'],
    },
    answerTranslation: L(
      '그들은 1년 전에 휴가를 갔어요.',
      'Ular bir yil oldin ta’tilga borishdi.',
      'They went on holiday a year ago.',
      'Они ездили в отпуск год назад.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['ago', 'past-time'],
  },

  en_s1u9_n3_010_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'When did you last see your grandparents?',
    options: ['I', 'saw', 'them', 'a', 'week', 'ago', 'tomorrow', 'last'],
    answer: 'I saw them a week ago',
    answerTranslation: L(
      '일주일 전에 뵀어요.',
      'Men ularni bir hafta oldin ko‘rdim.',
      'I saw them a week ago.',
      'Я видел их неделю назад.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['ago', 'reply'],
  },

  en_s1u9_n3_011_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'She sold her car six months ',
    sentenceSuffix: '.',
    answer: 'ago',
    answerTranslation: L(
      '그녀는 6개월 전에 차를 팔았어요.',
      'U mashinasini olti oy oldin sotdi.',
      'She sold her car six months ago.',
      'Она продала машину шесть месяцев назад.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "ago".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'ago'],
  },

  en_s1u9_n3_012_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'fashion',
        native: 'moda',
        nativeI18n: L('유행', 'moda', 'fashion', 'мода'),
      },
      {
        text: 'millionaire',
        native: 'millioner',
        nativeI18n: L('백만장자', 'millioner', 'millionaire', 'миллионер'),
      },
      {
        text: 'huge',
        native: 'juda katta',
        nativeI18n: L('아주 큰', 'juda katta', 'huge', 'огромный'),
      },
      {
        text: 'receipt',
        native: 'chek',
        nativeI18n: L('영수증', 'chek', 'receipt', 'чек'),
      },
      {
        text: 'retirement',
        native: 'nafaqa davri',
        nativeI18n: L('은퇴', 'nafaqa davri', 'retirement', 'пенсия'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['news', 'matching'],
  },

  en_s1u9_n3_013_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['email', 'two', 'wrote', 'ago', 'an', 'hours', 'I', 'last'],
    answer: 'I wrote an email two hours ago',
    answerTranslation: L(
      '저는 두 시간 전에 이메일을 썼어요.',
      'Men ikki soat oldin email yozdim.',
      'I wrote an email two hours ago.',
      'Я написал электронное письмо два часа назад.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['ago', 'wrote'],
  },

  en_s1u9_n3_014_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'fashion',
        native: 'moda',
        nativeI18n: L('유행', 'moda', 'fashion', 'мода'),
      },
      {
        text: 'millionaire',
        native: 'millioner',
        nativeI18n: L('백만장자', 'millioner', 'millionaire', 'миллионер'),
      },
      {
        text: 'huge',
        native: 'juda katta',
        nativeI18n: L('아주 큰', 'juda katta', 'huge', 'огромный'),
      },
      {
        text: 'receipt',
        native: 'chek',
        nativeI18n: L('영수증', 'chek', 'receipt', 'чек'),
      },
      {
        text: 'retirement',
        native: 'nafaqa davri',
        nativeI18n: L('은퇴', 'nafaqa davri', 'retirement', 'пенсия'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['news', 'listening'],
  },

  en_s1u9_n3_015_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'millionaire',
    choices: [
      { text: 'waiter', label: '🧑‍🍳', emoji: '🧑‍🍳', imageUrl: '' },
      { text: 'tip', label: '💵', emoji: '💵', imageUrl: '' },
      { text: 'millionaire', label: '💰', emoji: '💰', imageUrl: '' },
      { text: 'receipt', label: '🧾', emoji: '🧾', imageUrl: '' },
    ],
    answerTranslation: L('백만장자', 'millioner', 'millionaire', 'миллионер'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['millionaire'],
  },

  en_s1u9_n3_016_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'He left school five years ___.',
    blankAnswers: ['ago'],
    options: ['ago', 'last', 'before', 'yesterday'],
    answer: 'ago',
    answerTranslation: L(
      '그는 5년 전에 학교를 떠났어요.',
      'U besh yil oldin maktabni tugatdi.',
      'He left school five years ago.',
      'Он закончил школу пять лет назад.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['ago', 'past-time'],
  },

  en_s1u9_n3_017_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'They went on holiday a year ',
    sentenceSuffix: '.',
    answer: 'ago',
    answerTranslation: L(
      '그들은 1년 전에 휴가를 갔어요.',
      'Ular bir yil oldin ta’tilga borishdi.',
      'They went on holiday a year ago.',
      'Они ездили в отпуск год назад.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "ago".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'ago'],
  },

  en_s1u9_n3_018_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['weeks', 'ago', 'present', 'got', 'I', 'a', 'two', 'month'],
    answer: 'I got a present two weeks ago',
    audioText: 'I got a present two weeks ago.',
    answerTranslation: L(
      '저는 2주 전에 선물을 받았어요.',
      'Men ikki hafta oldin sovg‘a oldim.',
      'I got a present two weeks ago.',
      'Я получил подарок две недели назад.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['ago', 'got'],
  },

  en_s1u9_n3_019_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'When did you last go to a concert?',
    options: ['I', 'went', 'three', 'months', 'ago', 'go', 'tomorrow'],
    answer: 'I went three months ago',
    answerTranslation: L(
      '3개월 전에 갔어요.',
      'Men uch oy oldin bordim.',
      'I went three months ago.',
      'Я ходил три месяца назад.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['ago', 'reply'],
  },

  en_s1u9_n3_020_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'When did you last buy something online?' },
    ],
    options: [
      'I bought something online a week ago.',
      'I buy something online a week ago.',
      'I bought something online ago a week.',
      'I did bought it last tomorrow.',
    ],
    answer: 'I bought something online a week ago.',
    answerTranslation: L(
      '일주일 전에 온라인으로 물건을 샀어요.',
      'Men bir hafta oldin internetdan bir narsa sotib oldim.',
      'I bought something online a week ago.',
      'Я купил кое-что в интернете неделю назад.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['ago', 'dialog'],
  },

  // ===========================================================
  // Lesson 2 · Unusual tips
  // ===========================================================

  en_s1u9_n3_021_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'A customer left a huge tip.',
    audioText: 'A customer left a huge tip.',
    answerTranslation: L(
      '한 손님이 엄청난 팁을 남겼어요.',
      'Bir mijoz juda katta choychaqa qoldirdi.',
      'A customer left a huge tip.',
      'Клиент оставил огромные чаевые.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['tip', 'news'],
  },

  en_s1u9_n3_022_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'waiter',
    choices: [
      { text: 'customer', label: '🙋', emoji: '🙋', imageUrl: '' },
      { text: 'waiter', label: '🧑‍🍳', emoji: '🧑‍🍳', imageUrl: '' },
      { text: 'millionaire', label: '💰', emoji: '💰', imageUrl: '' },
      { text: 'bill', label: '🧾', emoji: '🧾', imageUrl: '' },
    ],
    answerTranslation: L('웨이터', 'ofitsiant', 'waiter', 'официант'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['waiter'],
  },

  en_s1u9_n3_023_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'tip',
        native: 'choychaqa',
        nativeI18n: L('팁', 'choychaqa', 'tip', 'чаевые'),
      },
      {
        text: 'customer',
        native: 'mijoz',
        nativeI18n: L('손님', 'mijoz', 'customer', 'клиент'),
      },
      {
        text: 'waiter',
        native: 'ofitsiant',
        nativeI18n: L('웨이터', 'ofitsiant', 'waiter', 'официант'),
      },
      {
        text: 'bill',
        native: 'hisob',
        nativeI18n: L('계산서', 'hisob', 'bill', 'счёт'),
      },
      {
        text: 'huge',
        native: 'juda katta',
        nativeI18n: L('엄청난', 'juda katta', 'huge', 'огромный'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['restaurant', 'matching'],
  },

  en_s1u9_n3_024_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['tip', 'customer', 'left', 'a', 'huge', 'The', 'bill', 'waiter'],
    answer: 'The customer left a huge tip',
    answerTranslation: L(
      '그 손님은 엄청난 팁을 남겼어요.',
      'Mijoz juda katta choychaqa qoldirdi.',
      'The customer left a huge tip.',
      'Клиент оставил огромные чаевые.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['tip', 'customer'],
  },

  en_s1u9_n3_025_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'bill',
      'tip',
      'a',
      'on',
      'left',
      'He',
      'large',
      'the',
      'mistake',
    ],
    answer: 'He left a large tip on the bill',
    audioText: 'He left a large tip on the bill.',
    answerTranslation: L(
      '그는 계산서에 큰 팁을 남겼어요.',
      'U hisobda katta choychaqa qoldirdi.',
      'He left a large tip on the bill.',
      'Он оставил большие чаевые на счёте.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['tip', 'bill'],
  },

  en_s1u9_n3_026_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'tip',
        native: 'choychaqa',
        nativeI18n: L('팁', 'choychaqa', 'tip', 'чаевые'),
      },
      {
        text: 'customer',
        native: 'mijoz',
        nativeI18n: L('손님', 'mijoz', 'customer', 'клиент'),
      },
      {
        text: 'waiter',
        native: 'ofitsiant',
        nativeI18n: L('웨이터', 'ofitsiant', 'waiter', 'официант'),
      },
      {
        text: 'bill',
        native: 'hisob',
        nativeI18n: L('계산서', 'hisob', 'bill', 'счёт'),
      },
      {
        text: 'huge',
        native: 'juda katta',
        nativeI18n: L('엄청난', 'juda katta', 'huge', 'огромный'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['restaurant', 'listening'],
  },

  en_s1u9_n3_027_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'The waiter got a huge ',
    sentenceSuffix: '.',
    answer: 'tip',
    answerTranslation: L(
      '웨이터는 엄청난 팁을 받았어요.',
      'Ofitsiant juda katta choychaqa oldi.',
      'The waiter got a huge tip.',
      'Официант получил огромные чаевые.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "tip".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'tip'],
  },

  en_s1u9_n3_028_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'customer',
    choices: [
      { text: 'waiter', label: '🧑‍🍳', emoji: '🧑‍🍳', imageUrl: '' },
      { text: 'bill', label: '🧾', emoji: '🧾', imageUrl: '' },
      { text: 'customer', label: '🙋', emoji: '🙋', imageUrl: '' },
      { text: 'receipt', label: '📄', emoji: '📄', imageUrl: '' },
    ],
    answerTranslation: L('손님', 'mijoz', 'customer', 'клиент'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['customer'],
  },

  en_s1u9_n3_029_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'The waiter thought the tip was a mistake.',
    audioText: 'The waiter thought the tip was a mistake.',
    answerI18n: L(
      '웨이터는 그 팁이 실수라고 생각했어요',
      'Ofitsiant choychaqani xato deb o‘yladi',
      'The waiter thought the tip was a mistake',
      'Официант подумал, что чаевые были ошибкой',
    ),
    options: [
      'The',
      'waiter',
      'thought',
      'the',
      'tip',
      'was',
      'a',
      'mistake',
      'customer',
    ],
    optionsI18n: {
      ko: ['웨이터는', '그', '팁이', '실수라고', '생각했어요'],
      uz: ['Ofitsiant', 'choychaqani', 'xato', 'deb', 'o‘yladi'],
      en: ['The', 'waiter', 'thought', 'the', 'tip', 'was', 'a', 'mistake'],
      ru: ['Официант', 'подумал', 'что', 'чаевые', 'были', 'ошибкой'],
    },
    answerTranslation: L(
      '웨이터는 그 팁이 실수라고 생각했어요.',
      'Ofitsiant choychaqani xato deb o‘yladi.',
      'The waiter thought the tip was a mistake.',
      'Официант подумал, что чаевые были ошибкой.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['mistake', 'tip'],
  },

  en_s1u9_n3_030_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Was the large tip a mistake?',
    options: ['No', 'it', 'was', 'not', 'a', 'mistake', 'Yes', 'bill'],
    answer: 'No it was not a mistake',
    answerTranslation: L(
      '아니요, 실수가 아니었어요.',
      'Yo‘q, bu xato emas edi.',
      'No, it was not a mistake.',
      'Нет, это не было ошибкой.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['mistake', 'reply'],
  },

  en_s1u9_n3_031_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'The restaurant ',
    sentenceSuffix: ' was eighty-eight dollars.',
    answer: 'bill',
    answerTranslation: L(
      '식당 계산서는 88달러였어요.',
      'Restoran hisobi sakson sakkiz dollar edi.',
      'The restaurant bill was eighty-eight dollars.',
      'Счёт в ресторане был на восемьдесят восемь долларов.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "bill".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'bill'],
  },

  en_s1u9_n3_032_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'mistake',
        native: 'xato',
        nativeI18n: L('실수', 'xato', 'mistake', 'ошибка'),
      },
      {
        text: 'fashion',
        native: 'moda',
        nativeI18n: L('유행', 'moda', 'fashion', 'мода'),
      },
      {
        text: 'millionaire',
        native: 'millioner',
        nativeI18n: L('백만장자', 'millioner', 'millionaire', 'миллионер'),
      },
      {
        text: 'receipt',
        native: 'chek',
        nativeI18n: L('영수증', 'chek', 'receipt', 'чек'),
      },
      {
        text: 'retirement',
        native: 'nafaqa davri',
        nativeI18n: L('은퇴', 'nafaqa davri', 'retirement', 'пенсия'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['news', 'matching'],
  },

  en_s1u9_n3_033_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'America',
      'fashion',
      'became',
      'tips',
      'in',
      'Big',
      'a',
      'mistake',
    ],
    answer: 'Big tips became a fashion in America',
    answerTranslation: L(
      '미국에서는 큰 팁을 주는 것이 유행이 되었어요.',
      'Amerikada katta choychaqa berish moda bo‘ldi.',
      'Big tips became a fashion in America.',
      'Большие чаевые вошли в моду в Америке.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['fashion', 'tip'],
  },

  en_s1u9_n3_034_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'mistake',
        native: 'xato',
        nativeI18n: L('실수', 'xato', 'mistake', 'ошибка'),
      },
      {
        text: 'fashion',
        native: 'moda',
        nativeI18n: L('유행', 'moda', 'fashion', 'мода'),
      },
      {
        text: 'millionaire',
        native: 'millioner',
        nativeI18n: L('백만장자', 'millioner', 'millionaire', 'миллионер'),
      },
      {
        text: 'receipt',
        native: 'chek',
        nativeI18n: L('영수증', 'chek', 'receipt', 'чек'),
      },
      {
        text: 'retirement',
        native: 'nafaqa davri',
        nativeI18n: L('은퇴', 'nafaqa davri', 'retirement', 'пенсия'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['news', 'listening'],
  },

  en_s1u9_n3_035_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'receipt',
    choices: [
      { text: 'millionaire', label: '💰', emoji: '💰', imageUrl: '' },
      { text: 'bill', label: '🧾', emoji: '🧾', imageUrl: '' },
      { text: 'receipt', label: '📄', emoji: '📄', imageUrl: '' },
      { text: 'customer', label: '🙋', emoji: '🙋', imageUrl: '' },
    ],
    answerTranslation: L('영수증', 'chek', 'receipt', 'чек'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['receipt'],
  },

  en_s1u9_n3_036_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The waiter thought the tip was a ___.',
    blankAnswers: ['mistake'],
    options: ['mistake', 'fashion', 'customer', 'retirement'],
    answer: 'mistake',
    answerTranslation: L(
      '웨이터는 그 팁이 실수라고 생각했어요.',
      'Ofitsiant choychaqani xato deb o‘yladi.',
      'The waiter thought the tip was a mistake.',
      'Официант подумал, что чаевые были ошибкой.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['mistake'],
  },

  en_s1u9_n3_037_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'He wanted to find the ',
    sentenceSuffix: '.',
    answer: 'receipt',
    answerTranslation: L(
      '그는 영수증을 찾고 싶어 했어요.',
      'U chekni topmoqchi edi.',
      'He wanted to find the receipt.',
      'Он хотел найти чек.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "receipt".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'receipt'],
  },

  en_s1u9_n3_038_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'retirement',
      'needed',
      'He',
      'for',
      'money',
      'his',
      'tip',
      'bill',
    ],
    answer: 'He needed money for his retirement',
    audioText: 'He needed money for his retirement.',
    answerTranslation: L(
      '그는 은퇴 생활을 위해 돈이 필요했어요.',
      'Unga nafaqa davri uchun pul kerak edi.',
      'He needed money for his retirement.',
      'Ему нужны были деньги на пенсию.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['retirement', 'money'],
  },

  en_s1u9_n3_039_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Why did people think the givers were rich?',
    options: [
      'They',
      'thought',
      'the',
      'givers',
      'were',
      'millionaires',
      'waiters',
      'customers',
    ],
    answer: 'They thought the givers were millionaires',
    answerTranslation: L(
      '사람들은 돈을 준 사람들이 백만장자라고 생각했어요.',
      'Ular pul bergan odamlarni millioner deb o‘ylashdi.',
      'They thought the givers were millionaires.',
      'Они думали, что те, кто давал деньги, были миллионерами.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['millionaire', 'reply'],
  },

  en_s1u9_n3_040_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'What was unusual about the restaurant bill?' },
    ],
    options: [
      'The customer left a very large tip.',
      'The waiter bought the restaurant.',
      'The customer lost the restaurant.',
      'The bill was a new fashion shop.',
    ],
    answer: 'The customer left a very large tip.',
    answerTranslation: L(
      '손님이 아주 큰 팁을 남겼어요.',
      'Mijoz juda katta choychaqa qoldirdi.',
      'The customer left a very large tip.',
      'Клиент оставил очень большие чаевые.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['tip', 'news', 'dialog'],
  },

  // ===========================================================
  // Lesson 3 · Ask about a news story
  // ===========================================================

  en_s1u9_n3_041_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'When did it happen?',
    audioText: 'When did it happen?',
    answerTranslation: L(
      '그 일은 언제 일어났어요?',
      'Bu qachon sodir bo‘ldi?',
      'When did it happen?',
      'Когда это произошло?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['news-question', 'did'],
  },

  en_s1u9_n3_042_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'mistake',
    choices: [
      { text: 'receipt', label: '🧾', emoji: '🧾', imageUrl: '' },
      { text: 'mistake', label: '❌', emoji: '❌', imageUrl: '' },
      { text: 'millionaire', label: '💰', emoji: '💰', imageUrl: '' },
      { text: 'waiter', label: '🧑‍🍳', emoji: '🧑‍🍳', imageUrl: '' },
    ],
    answerTranslation: L('실수', 'xato', 'mistake', 'ошибка'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['mistake'],
  },

  en_s1u9_n3_043_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'mistake',
        native: 'xato',
        nativeI18n: L('실수', 'xato', 'mistake', 'ошибка'),
      },
      {
        text: 'huge',
        native: 'juda katta',
        nativeI18n: L('엄청난', 'juda katta', 'huge', 'огромный'),
      },
      {
        text: 'receipt',
        native: 'chek',
        nativeI18n: L('영수증', 'chek', 'receipt', 'чек'),
      },
      {
        text: 'fashion',
        native: 'moda',
        nativeI18n: L('유행', 'moda', 'fashion', 'мода'),
      },
      {
        text: 'retirement',
        native: 'nafaqa davri',
        nativeI18n: L('은퇴', 'nafaqa davri', 'retirement', 'пенсия'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['news', 'matching'],
  },

  en_s1u9_n3_044_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['did', 'Where', 'happen', 'it', 'happened', 'when', 'who'],
    answer: 'Where did it happen',
    answerTranslation: L(
      '그 일은 어디에서 일어났어요?',
      'Bu qayerda sodir bo‘ldi?',
      'Where did it happen?',
      'Где это произошло?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['wh-question', 'news'],
  },

  en_s1u9_n3_045_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['man', 'Who', 'see', 'did', 'the', 'saw', 'where'],
    answer: 'Who did the man see',
    audioText: 'Who did the man see?',
    answerTranslation: L(
      '그 남자는 누구를 봤어요?',
      'Erkak kimni ko‘rdi?',
      'Who did the man see?',
      'Кого увидел мужчина?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['wh-question', 'did'],
  },

  en_s1u9_n3_046_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'mistake',
        native: 'xato',
        nativeI18n: L('실수', 'xato', 'mistake', 'ошибка'),
      },
      {
        text: 'huge',
        native: 'juda katta',
        nativeI18n: L('엄청난', 'juda katta', 'huge', 'огромный'),
      },
      {
        text: 'receipt',
        native: 'chek',
        nativeI18n: L('영수증', 'chek', 'receipt', 'чек'),
      },
      {
        text: 'fashion',
        native: 'moda',
        nativeI18n: L('유행', 'moda', 'fashion', 'мода'),
      },
      {
        text: 'retirement',
        native: 'nafaqa davri',
        nativeI18n: L('은퇴', 'nafaqa davri', 'retirement', 'пенсия'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['news', 'listening'],
  },

  en_s1u9_n3_047_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'When did it ',
    sentenceSuffix: '?',
    answer: 'happen',
    answerTranslation: L(
      '그 일은 언제 일어났어요?',
      'Bu qachon sodir bo‘ldi?',
      'When did it happen?',
      'Когда это произошло?',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'After "did", use the base verb "happen".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'did-question'],
  },

  en_s1u9_n3_048_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'huge',
    choices: [
      { text: 'local', label: '📍', emoji: '📍', imageUrl: '' },
      { text: 'huge', label: '🔝', emoji: '🔝', imageUrl: '' },
      { text: 'homeless', label: '🏚️', emoji: '🏚️', imageUrl: '' },
      { text: 'receipt', label: '🧾', emoji: '🧾', imageUrl: '' },
    ],
    answerTranslation: L('엄청난', 'juda katta', 'huge', 'огромный'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['huge'],
  },

  en_s1u9_n3_049_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Why did the man give his jacket to the boy?',
    audioText: 'Why did the man give his jacket to the boy?',
    answerI18n: L(
      '그 남자는 왜 소년에게 재킷을 줬어요',
      'Erkak nega kurtkasini bolaga berdi',
      'Why did the man give his jacket to the boy',
      'Почему мужчина отдал свою куртку мальчику',
    ),
    options: [
      'Why',
      'did',
      'the',
      'man',
      'give',
      'his',
      'jacket',
      'to',
      'the',
      'boy',
      'gave',
    ],
    optionsI18n: {
      ko: ['그', '남자는', '왜', '소년에게', '재킷을', '줬어요'],
      uz: ['Erkak', 'nega', 'kurtkasini', 'bolaga', 'berdi'],
      en: [
        'Why',
        'did',
        'the',
        'man',
        'give',
        'his',
        'jacket',
        'to',
        'the',
        'boy',
      ],
      ru: ['Почему', 'мужчина', 'отдал', 'свою', 'куртку', 'мальчику'],
    },
    answerTranslation: L(
      '그 남자는 왜 소년에게 재킷을 줬어요?',
      'Erkak nega kurtkasini bolaga berdi?',
      'Why did the man give his jacket to the boy?',
      'Почему мужчина отдал свою куртку мальчику?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['why-question', 'news'],
  },

  en_s1u9_n3_050_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'When did it happen?',
    options: ['It', 'happened', 'two', 'days', 'ago', 'happen', 'tomorrow'],
    answer: 'It happened two days ago',
    answerTranslation: L(
      '이틀 전에 일어났어요.',
      'Bu ikki kun oldin sodir bo‘ldi.',
      'It happened two days ago.',
      'Это произошло два дня назад.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['ago', 'news', 'reply'],
  },

  en_s1u9_n3_051_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Where did it ',
    sentenceSuffix: '?',
    answer: 'happen',
    answerTranslation: L(
      '그 일은 어디에서 일어났어요?',
      'Bu qayerda sodir bo‘ldi?',
      'Where did it happen?',
      'Где это произошло?',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'After "did", use the base verb "happen".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'wh-question'],
  },

  en_s1u9_n3_052_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'homeless',
        native: 'uysiz',
        nativeI18n: L('집이 없는', 'uysiz', 'homeless', 'бездомный'),
      },
      {
        text: 'local',
        native: 'mahalliy',
        nativeI18n: L('지역의', 'mahalliy', 'local', 'местный'),
      },
      {
        text: 'customer',
        native: 'mijoz',
        nativeI18n: L('손님', 'mijoz', 'customer', 'клиент'),
      },
      {
        text: 'waiter',
        native: 'ofitsiant',
        nativeI18n: L('웨이터', 'ofitsiant', 'waiter', 'официант'),
      },
      {
        text: 'millionaire',
        native: 'millioner',
        nativeI18n: L('백만장자', 'millioner', 'millionaire', 'миллионер'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['people', 'matching'],
  },

  en_s1u9_n3_053_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['story', 'end', 'How', 'did', 'the', 'ended', 'why', 'when'],
    answer: 'How did the story end',
    answerTranslation: L(
      '그 이야기는 어떻게 끝났어요?',
      'Hikoya qanday tugadi?',
      'How did the story end?',
      'Чем закончилась история?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['how-question', 'news'],
  },

  en_s1u9_n3_054_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'homeless',
        native: 'uysiz',
        nativeI18n: L('집이 없는', 'uysiz', 'homeless', 'бездомный'),
      },
      {
        text: 'local',
        native: 'mahalliy',
        nativeI18n: L('지역의', 'mahalliy', 'local', 'местный'),
      },
      {
        text: 'customer',
        native: 'mijoz',
        nativeI18n: L('손님', 'mijoz', 'customer', 'клиент'),
      },
      {
        text: 'waiter',
        native: 'ofitsiant',
        nativeI18n: L('웨이터', 'ofitsiant', 'waiter', 'официант'),
      },
      {
        text: 'millionaire',
        native: 'millioner',
        nativeI18n: L('백만장자', 'millioner', 'millionaire', 'миллионер'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['people', 'listening'],
  },

  en_s1u9_n3_055_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'homeless',
    choices: [
      { text: 'local', label: '📍', emoji: '📍', imageUrl: '' },
      { text: 'customer', label: '🙋', emoji: '🙋', imageUrl: '' },
      { text: 'homeless', label: '🏚️', emoji: '🏚️', imageUrl: '' },
      { text: 'waiter', label: '🧑‍🍳', emoji: '🧑‍🍳', imageUrl: '' },
    ],
    answerTranslation: L('집이 없는', 'uysiz', 'homeless', 'бездомный'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['homeless'],
  },

  en_s1u9_n3_056_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Who did the man ___?',
    blankAnswers: ['see'],
    options: ['see', 'saw', 'seen', 'seeing'],
    answer: 'see',
    answerTranslation: L(
      '그 남자는 누구를 봤어요?',
      'Erkak kimni ko‘rdi?',
      'Who did the man see?',
      'Кого увидел мужчина?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['did-question', 'base-verb'],
  },

  en_s1u9_n3_057_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'What did the boy ',
    sentenceSuffix: '?',
    answer: 'say',
    answerTranslation: L(
      '그 소년은 뭐라고 말했어요?',
      'Bola nima dedi?',
      'What did the boy say?',
      'Что сказал мальчик?',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'After "did", use the base verb "say".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'base-verb'],
  },

  en_s1u9_n3_058_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['do', 'man', 'did', 'What', 'the', 'did', 'who', 'where'],
    answer: 'What did the man do',
    audioText: 'What did the man do?',
    answerTranslation: L(
      '그 남자는 무엇을 했어요?',
      'Erkak nima qildi?',
      'What did the man do?',
      'Что сделал мужчина?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['wh-question', 'news'],
  },

  en_s1u9_n3_059_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Where did the story happen?',
    options: ['It', 'happened', 'at', 'a', 'station', 'ago', 'when'],
    answer: 'It happened at a station',
    answerTranslation: L(
      '역에서 일어났어요.',
      'Bu vokzalda sodir bo‘ldi.',
      'It happened at a station.',
      'Это произошло на станции.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['where-question', 'reply'],
  },

  en_s1u9_n3_060_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Why did the man give his jacket to the boy?' },
    ],
    options: [
      'Because the boy was cold.',
      'Because did the boy cold.',
      'Because the jacket gave him.',
      'Because he is tomorrow cold.',
    ],
    answer: 'Because the boy was cold.',
    answerTranslation: L(
      '소년이 추워했기 때문이에요.',
      'Chunki bola sovqotgan edi.',
      'Because the boy was cold.',
      'Потому что мальчику было холодно.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['why-question', 'dialog'],
  },

  // ===========================================================
  // Lesson 4 · Student helps a homeless man
  // ===========================================================

  en_s1u9_n3_061_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Dominique lost her bank card.',
    audioText: 'Dominique lost her bank card.',
    answerTranslation: L(
      '도미니크는 은행 카드를 잃어버렸어요.',
      'Dominique bank kartasini yo‘qotdi.',
      'Dominique lost her bank card.',
      'Доминик потеряла банковскую карту.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['news-story', 'lost'],
  },

  en_s1u9_n3_062_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'local',
    choices: [
      { text: 'huge', label: '🔝', emoji: '🔝', imageUrl: '' },
      { text: 'local', label: '📍', emoji: '📍', imageUrl: '' },
      { text: 'homeless', label: '🏚️', emoji: '🏚️', imageUrl: '' },
      { text: 'receipt', label: '🧾', emoji: '🧾', imageUrl: '' },
    ],
    answerTranslation: L('지역의', 'mahalliy', 'local', 'местный'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['local'],
  },

  en_s1u9_n3_063_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'homeless',
        native: 'uysiz',
        nativeI18n: L('집이 없는', 'uysiz', 'homeless', 'бездомный'),
      },
      {
        text: 'local',
        native: 'mahalliy',
        nativeI18n: L('지역의', 'mahalliy', 'local', 'местный'),
      },
      {
        text: 'huge',
        native: 'juda katta',
        nativeI18n: L('엄청난', 'juda katta', 'huge', 'огромный'),
      },
      {
        text: 'customer',
        native: 'mijoz',
        nativeI18n: L('손님', 'mijoz', 'customer', 'клиент'),
      },
      {
        text: 'mistake',
        native: 'xato',
        nativeI18n: L('실수', 'xato', 'mistake', 'ошибка'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['news-story', 'matching'],
  },

  en_s1u9_n3_064_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'card',
      'bank',
      'her',
      'lost',
      'Dominique',
      'money',
      'Robbie',
      'gave',
    ],
    answer: 'Dominique lost her bank card',
    answerTranslation: L(
      '도미니크는 은행 카드를 잃어버렸어요.',
      'Dominique bank kartasini yo‘qotdi.',
      'Dominique lost her bank card.',
      'Доминик потеряла банковскую карту.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['news-story', 'lost'],
  },

  en_s1u9_n3_065_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'homeless',
      'Robbie',
      'was',
      'street',
      'the',
      'lived',
      'on',
      'local',
    ],
    answer: 'Robbie was homeless and lived on the street',
    audioText: 'Robbie was homeless and lived on the street.',
    answerTranslation: L(
      '로비는 집이 없었고 거리에서 살았어요.',
      'Robbie uysiz edi va ko‘chada yashardi.',
      'Robbie was homeless and lived on the street.',
      'Робби был бездомным и жил на улице.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['homeless', 'news-story'],
  },

  en_s1u9_n3_066_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'homeless',
        native: 'uysiz',
        nativeI18n: L('집이 없는', 'uysiz', 'homeless', 'бездомный'),
      },
      {
        text: 'local',
        native: 'mahalliy',
        nativeI18n: L('지역의', 'mahalliy', 'local', 'местный'),
      },
      {
        text: 'huge',
        native: 'juda katta',
        nativeI18n: L('엄청난', 'juda katta', 'huge', 'огромный'),
      },
      {
        text: 'customer',
        native: 'mijoz',
        nativeI18n: L('손님', 'mijoz', 'customer', 'клиент'),
      },
      {
        text: 'mistake',
        native: 'xato',
        nativeI18n: L('실수', 'xato', 'mistake', 'ошибка'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['news-story', 'listening'],
  },

  en_s1u9_n3_067_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Robbie was ',
    sentenceSuffix: '.',
    answer: 'homeless',
    answerTranslation: L(
      '로비는 집이 없었어요.',
      'Robbie uysiz edi.',
      'Robbie was homeless.',
      'Робби был бездомным.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "homeless".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'homeless'],
  },

  en_s1u9_n3_068_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'homeless',
    choices: [
      { text: 'customer', label: '🙋', emoji: '🙋', imageUrl: '' },
      { text: 'waiter', label: '🧑‍🍳', emoji: '🧑‍🍳', imageUrl: '' },
      { text: 'homeless', label: '🏚️', emoji: '🏚️', imageUrl: '' },
      { text: 'millionaire', label: '💰', emoji: '💰', imageUrl: '' },
    ],
    answerTranslation: L('집이 없는', 'uysiz', 'homeless', 'бездомный'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['homeless'],
  },

  en_s1u9_n3_069_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Robbie wanted to give Dominique three pounds.',
    audioText: 'Robbie wanted to give Dominique three pounds.',
    answerI18n: L(
      '로비는 도미니크에게 3파운드를 주려고 했어요',
      'Robbie Dominiquega uch funt bermoqchi edi',
      'Robbie wanted to give Dominique three pounds',
      'Робби хотел дать Доминик три фунта',
    ),
    options: [
      'Robbie',
      'wanted',
      'to',
      'give',
      'Dominique',
      'three',
      'pounds',
      'take',
    ],
    optionsI18n: {
      ko: ['로비는', '도미니크에게', '3파운드를', '주려고', '했어요'],
      uz: ['Robbie', 'Dominiquega', 'uch', 'funt', 'bermoqchi', 'edi'],
      en: ['Robbie', 'wanted', 'to', 'give', 'Dominique', 'three', 'pounds'],
      ru: ['Робби', 'хотел', 'дать', 'Доминик', 'три', 'фунта'],
    },
    answerTranslation: L(
      '로비는 도미니크에게 3파운드를 주려고 했어요.',
      'Robbie Dominiquega uch funt bermoqchi edi.',
      'Robbie wanted to give Dominique three pounds.',
      'Робби хотел дать Доминик три фунта.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['news-story', 'robbie'],
  },

  en_s1u9_n3_070_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'How much money did Robbie have?',
    options: ['He', 'had', 'three', 'pounds', 'seven', 'dollars', 'tip'],
    answer: 'He had three pounds',
    answerTranslation: L(
      '그는 3파운드를 가지고 있었어요.',
      'Unda uch funt bor edi.',
      'He had three pounds.',
      'У него было три фунта.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['news-story', 'reply'],
  },

  en_s1u9_n3_071_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'She gave the money to a ',
    sentenceSuffix: ' charity.',
    answer: 'local',
    answerTranslation: L(
      '그녀는 돈을 지역 자선단체에 전달했어요.',
      'U pulni mahalliy xayriya tashkilotiga berdi.',
      'She gave the money to a local charity.',
      'Она передала деньги местной благотворительной организации.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "local".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'local'],
  },

  en_s1u9_n3_072_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'tip',
        native: 'choychaqa',
        nativeI18n: L('팁', 'choychaqa', 'tip', 'чаевые'),
      },
      {
        text: 'receipt',
        native: 'chek',
        nativeI18n: L('영수증', 'chek', 'receipt', 'чек'),
      },
      {
        text: 'homeless',
        native: 'uysiz',
        nativeI18n: L('집이 없는', 'uysiz', 'homeless', 'бездомный'),
      },
      {
        text: 'local',
        native: 'mahalliy',
        nativeI18n: L('지역의', 'mahalliy', 'local', 'местный'),
      },
      {
        text: 'millionaire',
        native: 'millioner',
        nativeI18n: L('백만장자', 'millioner', 'millionaire', 'миллионер'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit9', 'matching'],
  },

  en_s1u9_n3_073_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'Facebook',
      'Robbie',
      'about',
      'wrote',
      'She',
      'money',
      'lost',
      'street',
    ],
    answer: 'She wrote about Robbie on Facebook',
    answerTranslation: L(
      '그녀는 페이스북에 로비에 대해 썼어요.',
      'U Facebookda Robbie haqida yozdi.',
      'She wrote about Robbie on Facebook.',
      'Она написала о Робби в Facebook.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['news-story', 'wrote'],
  },

  en_s1u9_n3_074_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'tip',
        native: 'choychaqa',
        nativeI18n: L('팁', 'choychaqa', 'tip', 'чаевые'),
      },
      {
        text: 'receipt',
        native: 'chek',
        nativeI18n: L('영수증', 'chek', 'receipt', 'чек'),
      },
      {
        text: 'homeless',
        native: 'uysiz',
        nativeI18n: L('집이 없는', 'uysiz', 'homeless', 'бездомный'),
      },
      {
        text: 'local',
        native: 'mahalliy',
        nativeI18n: L('지역의', 'mahalliy', 'local', 'местный'),
      },
      {
        text: 'millionaire',
        native: 'millioner',
        nativeI18n: L('백만장자', 'millioner', 'millionaire', 'миллионер'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['unit9', 'listening'],
  },

  en_s1u9_n3_075_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'local',
    choices: [
      { text: 'huge', label: '🔝', emoji: '🔝', imageUrl: '' },
      { text: 'homeless', label: '🏚️', emoji: '🏚️', imageUrl: '' },
      { text: 'local', label: '📍', emoji: '📍', imageUrl: '' },
      { text: 'fashion', label: '📈', emoji: '📈', imageUrl: '' },
    ],
    answerTranslation: L('지역의', 'mahalliy', 'local', 'местный'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['local'],
  },

  en_s1u9_n3_076_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Robbie was ___ and lived on the streets.',
    blankAnswers: ['homeless'],
    options: ['homeless', 'local', 'huge', 'millionaire'],
    answer: 'homeless',
    answerTranslation: L(
      '로비는 집이 없었고 거리에서 살았어요.',
      'Robbie uysiz edi va ko‘chada yashardi.',
      'Robbie was homeless and lived on the streets.',
      'Робби был бездомным и жил на улице.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['homeless'],
  },

  en_s1u9_n3_077_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Dominique ',
    sentenceSuffix: ' her bank card.',
    answer: 'lost',
    answerTranslation: L(
      '도미니크는 은행 카드를 잃어버렸어요.',
      'Dominique bank kartasini yo‘qotdi.',
      'Dominique lost her bank card.',
      'Доминик потеряла банковскую карту.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is the past form "lost".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'lost'],
  },

  en_s1u9_n3_078_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'money',
      'charity',
      'local',
      'the',
      'gave',
      'She',
      'to',
      'a',
      'Robbie',
    ],
    answer: 'She gave the money to a local charity',
    audioText: 'She gave the money to a local charity.',
    answerTranslation: L(
      '그녀는 그 돈을 지역 자선단체에 전달했어요.',
      'U pulni mahalliy xayriya tashkilotiga berdi.',
      'She gave the money to a local charity.',
      'Она передала деньги местной благотворительной организации.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['local', 'charity'],
  },

  en_s1u9_n3_079_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Why did Dominique collect money?',
    options: [
      'She',
      'wanted',
      'to',
      'help',
      'Robbie',
      'and',
      'other',
      'homeless',
      'people',
      'tip',
    ],
    answer: 'She wanted to help Robbie and other homeless people',
    answerTranslation: L(
      '그녀는 로비와 다른 노숙인들을 돕고 싶었어요.',
      'U Robbie va boshqa uysiz odamlarga yordam bermoqchi edi.',
      'She wanted to help Robbie and other homeless people.',
      'Она хотела помочь Робби и другим бездомным людям.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['homeless', 'charity', 'reply'],
  },

  en_s1u9_n3_080_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'What did Dominique do with the money?' },
    ],
    options: [
      'She gave it to a local charity.',
      'She bought a restaurant bill.',
      'She gave it to a millionaire.',
      'She lost it six months tomorrow.',
    ],
    answer: 'She gave it to a local charity.',
    answerTranslation: L(
      '그녀는 그 돈을 지역 자선단체에 전달했어요.',
      'U pulni mahalliy xayriya tashkilotiga berdi.',
      'She gave it to a local charity.',
      'Она передала деньги местной благотворительной организации.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['news-story', 'charity', 'final'],
  },
};

export const EN_S1_UNIT9_NODE3 = {
  title: L(
    '뉴스 이야기',
    'Yangiliklar hikoyalari',
    'News stories',
    'Новостные истории',
  ),
  section: 1,
  unit: 9,
  order: 3,
  isActive: true,

  lessons: [
    {
      title: L(
        '얼마나 전에?',
        'Qancha vaqt oldin?',
        'How long ago?',
        'Как давно?',
      ),
      description: L(
        'ago를 사용해 몇 분 전, 며칠 전, 몇 주 전처럼 과거 사건이 언제 일어났는지 말해요.',
        'Ago yordamida voqea besh daqiqa, bir necha kun yoki hafta oldin sodir bo‘lganini aytasiz.',
        'Use ago to say how many minutes, days, weeks, months or years before now something happened.',
        'Используем ago, чтобы сказать, сколько минут, дней, недель, месяцев или лет назад произошло событие.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 1,
      questions: [
        'en_s1u9_n3_001_speaking',
        'en_s1u9_n3_002_image_choice',
        'en_s1u9_n3_003_word_matching',
        'en_s1u9_n3_004_translate_builder',
        'en_s1u9_n3_005_word_arrange',
        'en_s1u9_n3_006_audio_match',
        'en_s1u9_n3_007_type_answer',
        'en_s1u9_n3_008_image_choice',
        'en_s1u9_n3_009_sentence_builder',
        'en_s1u9_n3_010_reply_builder',
        'en_s1u9_n3_011_type_answer',
        'en_s1u9_n3_012_word_matching',
        'en_s1u9_n3_013_translate_builder',
        'en_s1u9_n3_014_audio_match',
        'en_s1u9_n3_015_image_choice',
        'en_s1u9_n3_016_fill_in_blank',
        'en_s1u9_n3_017_type_answer',
        'en_s1u9_n3_018_word_arrange',
        'en_s1u9_n3_019_reply_builder',
        'en_s1u9_n3_020_dialog_complete',
      ],
    },

    {
      title: L(
        '놀라운 팁 이야기',
        'G‘ayrioddiy choychaqalar',
        'Unusual tips',
        'Необычные чаевые',
      ),
      description: L(
        '식당의 손님, 웨이터, 계산서와 팁에 관한 뉴스 이야기를 읽고 핵심 어휘와 과거 표현을 익혀요.',
        'Restoran mijozlari, ofitsiantlar, hisob va choychaqa haqidagi yangilik orqali asosiy so‘zlarni o‘rganasiz.',
        'Learn restaurant and money vocabulary through a news story about unusually large tips.',
        'Изучаем лексику ресторана и денег через новость о необычно больших чаевых.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 2,
      questions: [
        'en_s1u9_n3_021_speaking',
        'en_s1u9_n3_022_image_choice',
        'en_s1u9_n3_023_word_matching',
        'en_s1u9_n3_024_translate_builder',
        'en_s1u9_n3_025_word_arrange',
        'en_s1u9_n3_026_audio_match',
        'en_s1u9_n3_027_type_answer',
        'en_s1u9_n3_028_image_choice',
        'en_s1u9_n3_029_sentence_builder',
        'en_s1u9_n3_030_reply_builder',
        'en_s1u9_n3_031_type_answer',
        'en_s1u9_n3_032_word_matching',
        'en_s1u9_n3_033_translate_builder',
        'en_s1u9_n3_034_audio_match',
        'en_s1u9_n3_035_image_choice',
        'en_s1u9_n3_036_fill_in_blank',
        'en_s1u9_n3_037_type_answer',
        'en_s1u9_n3_038_word_arrange',
        'en_s1u9_n3_039_reply_builder',
        'en_s1u9_n3_040_dialog_complete',
      ],
    },

    {
      title: L(
        '뉴스에 질문하기',
        'Yangilik haqida savol berish',
        'Ask about a news story',
        'Задаём вопросы о новости',
      ),
      description: L(
        'When, Where, Who, What, Why, How와 did를 사용해 과거 뉴스 사건의 세부 내용을 질문해요.',
        'When, Where, Who, What, Why, How va did yordamida o‘tgan yangilik voqealari haqida savol berasiz.',
        'Use When, Where, Who, What, Why and How with did to ask for details about past news events.',
        'Используем When, Where, Who, What, Why, How и did, чтобы задавать вопросы о событиях в прошлом.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 3,
      questions: [
        'en_s1u9_n3_041_speaking',
        'en_s1u9_n3_042_image_choice',
        'en_s1u9_n3_043_word_matching',
        'en_s1u9_n3_044_translate_builder',
        'en_s1u9_n3_045_word_arrange',
        'en_s1u9_n3_046_audio_match',
        'en_s1u9_n3_047_type_answer',
        'en_s1u9_n3_048_image_choice',
        'en_s1u9_n3_049_sentence_builder',
        'en_s1u9_n3_050_reply_builder',
        'en_s1u9_n3_051_type_answer',
        'en_s1u9_n3_052_word_matching',
        'en_s1u9_n3_053_translate_builder',
        'en_s1u9_n3_054_audio_match',
        'en_s1u9_n3_055_image_choice',
        'en_s1u9_n3_056_fill_in_blank',
        'en_s1u9_n3_057_type_answer',
        'en_s1u9_n3_058_word_arrange',
        'en_s1u9_n3_059_reply_builder',
        'en_s1u9_n3_060_dialog_complete',
      ],
    },

    {
      title: L(
        '학생이 노숙인을 돕다',
        'Talaba uysiz odamga yordam beradi',
        'Student helps a homeless man',
        'Студентка помогает бездомному',
      ),
      description: L(
        '도미니크와 로비의 뉴스 이야기를 통해 과거 사건의 순서를 이해하고 질문과 대답으로 내용을 복습해요.',
        'Dominique va Robbie haqidagi yangilik orqali o‘tgan voqealar ketma-ketligini tushunib, savol-javob bilan mazmunni takrorlaysiz.',
        'Follow Dominique and Robbie’s story and review past events by asking and answering questions about the news.',
        'Разбираем историю Доминик и Робби и повторяем события прошлого с помощью вопросов и ответов.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 4,
      questions: [
        'en_s1u9_n3_061_speaking',
        'en_s1u9_n3_062_image_choice',
        'en_s1u9_n3_063_word_matching',
        'en_s1u9_n3_064_translate_builder',
        'en_s1u9_n3_065_word_arrange',
        'en_s1u9_n3_066_audio_match',
        'en_s1u9_n3_067_type_answer',
        'en_s1u9_n3_068_image_choice',
        'en_s1u9_n3_069_sentence_builder',
        'en_s1u9_n3_070_reply_builder',
        'en_s1u9_n3_071_type_answer',
        'en_s1u9_n3_072_word_matching',
        'en_s1u9_n3_073_translate_builder',
        'en_s1u9_n3_074_audio_match',
        'en_s1u9_n3_075_image_choice',
        'en_s1u9_n3_076_fill_in_blank',
        'en_s1u9_n3_077_type_answer',
        'en_s1u9_n3_078_word_arrange',
        'en_s1u9_n3_079_reply_builder',
        'en_s1u9_n3_080_dialog_complete',
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Section 1 · Unit 9 · Node 4
// 9.4 Speaking and writing
//
// Coverage
// - the weather
// - warm / hot / cloudy / sunny
// - cold / rainy / stormy / snowy
// - spring / summer / autumn / winter
// - season
// - What's the weather like?
// - What was the weather like?
// - present is / past was
// - talk about weather in different places
// - festival / band / comedian / atmosphere
// - write a review of an event
// - adjectives in reviews
// - beautiful / amazing / friendly / funny
// - interesting / great / terrible / boring
//
// IMPORTANT:
// *_WORDS에는 무조건 단어 하나만 등록.
// "great atmosphere", "music festival", "hot season",
// "beautiful walk" 같은 구/문장은 등록하지 않음.
//
// Reused:
// warm / hot / cold / sunny
// beautiful / friendly / funny / great
// interesting / small / terrible / boring
// city / country / park / food / music
// dance / theatre / weekend / day / year
//
// 4 lessons × 20 questions = 80
// type_answer: 3 per lesson
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT9_NODE4_WORDS = [
  {
    code: 'en-noun-weather',
    english: 'weather',
    senseKey: 'outside-air-and-sky-conditions',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '날씨',
      'ob-havo',
      'the condition of the air and sky at a particular time',
      'погода',
    ),
    examples: [
      {
        english: 'What is the weather like today?',
        translations: L(
          '오늘 날씨가 어때요?',
          'Bugun ob-havo qanday?',
          'What is the weather like today?',
          'Какая сегодня погода?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈweðə/',
      ttsText: 'weather',
    },
    media: {
      emoji: '🌤️',
      imageUrl: '',
      imageAlt: L(
        '여러 가지 날씨',
        'turli ob-havo',
        'different weather',
        'разная погода',
      ),
    },
    tags: ['weather', 'daily-life'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-cloudy',
    english: 'cloudy',
    senseKey: 'sky-covered-with-clouds',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('흐린', 'bulutli', 'with many clouds in the sky', 'облачный'),
    examples: [
      {
        english: 'It is cloudy today.',
        translations: L(
          '오늘은 흐려요.',
          'Bugun havo bulutli.',
          'It is cloudy today.',
          'Сегодня облачно.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈklaʊdi/',
      ttsText: 'cloudy',
    },
    media: {
      emoji: '☁️',
      imageUrl: '',
      imageAlt: L(
        '흐린 하늘',
        'bulutli osmon',
        'a cloudy sky',
        'облачное небо',
      ),
    },
    tags: ['weather', 'adjectives'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-rainy',
    english: 'rainy',
    senseKey: 'with-a-lot-of-rain',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('비가 오는', 'yomg‘irli', 'with a lot of rain', 'дождливый'),
    examples: [
      {
        english: 'It is rainy today.',
        translations: L(
          '오늘은 비가 와요.',
          'Bugun havo yomg‘irli.',
          'It is rainy today.',
          'Сегодня дождливо.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈreɪni/',
      ttsText: 'rainy',
    },
    media: {
      emoji: '🌧️',
      imageUrl: '',
      imageAlt: L(
        '비 오는 날씨',
        'yomg‘irli ob-havo',
        'rainy weather',
        'дождливая погода',
      ),
    },
    tags: ['weather', 'adjectives'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-stormy',
    english: 'stormy',
    senseKey: 'with-strong-wind-and-rain',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '폭풍우가 치는',
      'bo‘ronli',
      'with strong wind, rain or storms',
      'штормовой; бурный',
    ),
    examples: [
      {
        english: 'The weather was very stormy.',
        translations: L(
          '날씨가 매우 폭풍우가 심했어요.',
          'Ob-havo juda bo‘ronli edi.',
          'The weather was very stormy.',
          'Погода была очень штормовой.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈstɔːmi/',
      ttsText: 'stormy',
    },
    media: {
      emoji: '⛈️',
      imageUrl: '',
      imageAlt: L(
        '폭풍우 치는 날씨',
        'bo‘ronli ob-havo',
        'stormy weather',
        'штормовая погода',
      ),
    },
    tags: ['weather', 'adjectives'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-snowy',
    english: 'snowy',
    senseKey: 'with-a-lot-of-snow',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('눈이 오는; 눈 덮인', 'qorli', 'with a lot of snow', 'снежный'),
    examples: [
      {
        english: 'It was snowy last week.',
        translations: L(
          '지난주는 눈이 왔어요.',
          'O‘tgan hafta havo qorli edi.',
          'It was snowy last week.',
          'На прошлой неделе было снежно.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈsnəʊi/',
      ttsText: 'snowy',
    },
    media: {
      emoji: '❄️',
      imageUrl: '',
      imageAlt: L(
        '눈 오는 날씨',
        'qorli ob-havo',
        'snowy weather',
        'снежная погода',
      ),
    },
    tags: ['weather', 'adjectives'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-spring',
    english: 'spring',
    senseKey: 'season-after-winter',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '봄',
      'bahor',
      'the season after winter and before summer',
      'весна',
    ),
    examples: [
      {
        english: 'It is often warm in spring.',
        translations: L(
          '봄에는 날씨가 자주 따뜻해요.',
          'Bahorda havo ko‘pincha iliq bo‘ladi.',
          'It is often warm in spring.',
          'Весной часто бывает тепло.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/sprɪŋ/',
      ttsText: 'spring',
    },
    media: {
      emoji: '🌸',
      imageUrl: '',
      imageAlt: L('봄 풍경', 'bahor manzarasi', 'spring', 'весна'),
    },
    tags: ['seasons', 'weather'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-summer',
    english: 'summer',
    senseKey: 'warmest-season-of-year',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('여름', 'yoz', 'the warmest season of the year', 'лето'),
    examples: [
      {
        english: 'It is hot and sunny in summer.',
        translations: L(
          '여름에는 덥고 맑아요.',
          'Yozda havo issiq va quyoshli bo‘ladi.',
          'It is hot and sunny in summer.',
          'Летом жарко и солнечно.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈsʌmə/',
      ttsText: 'summer',
    },
    media: {
      emoji: '☀️',
      imageUrl: '',
      imageAlt: L('여름 풍경', 'yoz manzarasi', 'summer', 'лето'),
    },
    tags: ['seasons', 'weather'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-autumn',
    english: 'autumn',
    senseKey: 'season-after-summer',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '가을',
      'kuz',
      'the season after summer and before winter',
      'осень',
    ),
    examples: [
      {
        english: 'It is often cold and wet in autumn.',
        translations: L(
          '가을에는 자주 춥고 비가 와요.',
          'Kuzda havo ko‘pincha sovuq va nam bo‘ladi.',
          'It is often cold and wet in autumn.',
          'Осенью часто холодно и сыро.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈɔːtəm/',
      ttsText: 'autumn',
    },
    media: {
      emoji: '🍂',
      imageUrl: '',
      imageAlt: L('가을 풍경', 'kuz manzarasi', 'autumn', 'осень'),
    },
    tags: ['seasons', 'weather'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-winter',
    english: 'winter',
    senseKey: 'coldest-season-of-year',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('겨울', 'qish', 'the coldest season of the year', 'зима'),
    examples: [
      {
        english: 'It is cold in winter.',
        translations: L(
          '겨울에는 추워요.',
          'Qishda havo sovuq bo‘ladi.',
          'It is cold in winter.',
          'Зимой холодно.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈwɪntə/',
      ttsText: 'winter',
    },
    media: {
      emoji: '⛄',
      imageUrl: '',
      imageAlt: L('겨울 풍경', 'qish manzarasi', 'winter', 'зима'),
    },
    tags: ['seasons', 'weather'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-season',
    english: 'season',
    senseKey: 'one-of-four-parts-of-year',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '계절',
      'fasl',
      'one of the four main periods of the year',
      'сезон; время года',
    ),
    examples: [
      {
        english: 'Summer is my favourite season.',
        translations: L(
          '여름은 제가 가장 좋아하는 계절이에요.',
          'Yoz mening sevimli faslim.',
          'Summer is my favourite season.',
          'Лето — моё любимое время года.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈsiːzən/',
      ttsText: 'season',
    },
    media: {
      emoji: '🗓️',
      imageUrl: '',
      imageAlt: L(
        '네 계절',
        'to‘rt fasl',
        'the four seasons',
        'четыре времени года',
      ),
    },
    tags: ['seasons', 'weather'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-festival',
    english: 'festival',
    senseKey: 'special-public-event-with-entertainment',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '축제',
      'festival',
      'a special public event with music, performances or other activities',
      'фестиваль',
    ),
    examples: [
      {
        english: 'We went to a music festival.',
        translations: L(
          '우리는 음악 축제에 갔어요.',
          'Biz musiqa festivaliga bordik.',
          'We went to a music festival.',
          'Мы ходили на музыкальный фестиваль.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈfestɪvəl/',
      ttsText: 'festival',
    },
    media: {
      emoji: '🎪',
      imageUrl: '',
      imageAlt: L(
        '야외 축제',
        'ochiq havodagi festival',
        'a festival',
        'фестиваль',
      ),
    },
    tags: ['events', 'entertainment'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-atmosphere',
    english: 'atmosphere',
    senseKey: 'feeling-created-by-place-or-event',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '분위기',
      'muhit',
      'the feeling or mood of a place or event',
      'атмосфера',
    ),
    examples: [
      {
        english: 'The atmosphere was great.',
        translations: L(
          '분위기가 아주 좋았어요.',
          'Muhit juda yaxshi edi.',
          'The atmosphere was great.',
          'Атмосфера была отличной.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈætməsfɪə/',
      ttsText: 'atmosphere',
    },
    media: {
      emoji: '🎉',
      imageUrl: '',
      imageAlt: L(
        '즐거운 축제 분위기',
        'quvnoq festival muhiti',
        'a great festival atmosphere',
        'отличная атмосфера фестиваля',
      ),
    },
    tags: ['events', 'reviews'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-job-comedian',
    english: 'comedian',
    senseKey: 'person-whose-job-is-making-people-laugh',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '코미디언',
      'komik',
      'a person whose job is to make people laugh',
      'комик',
    ),
    examples: [
      {
        english: 'We saw a comedian at the festival.',
        translations: L(
          '우리는 축제에서 코미디언을 봤어요.',
          'Biz festivalda komikni ko‘rdik.',
          'We saw a comedian at the festival.',
          'Мы видели комика на фестивале.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/kəˈmiːdiən/',
      ttsText: 'comedian',
    },
    media: {
      emoji: '🎤',
      imageUrl: '',
      imageAlt: L(
        '공연 중인 코미디언',
        'sahnadagi komik',
        'a comedian',
        'комик',
      ),
    },
    tags: ['jobs', 'entertainment'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-band',
    english: 'band',
    senseKey: 'group-of-musicians',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '밴드; 음악 그룹',
      'musiqa guruhi',
      'a group of musicians who play music together',
      'музыкальная группа',
    ),
    examples: [
      {
        english: 'We saw two bands at the festival.',
        translations: L(
          '우리는 축제에서 두 밴드를 봤어요.',
          'Biz festivalda ikkita musiqa guruhini ko‘rdik.',
          'We saw two bands at the festival.',
          'Мы видели две группы на фестивале.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/bænd/',
      ttsText: 'band',
    },
    media: {
      emoji: '🎸',
      imageUrl: '',
      imageAlt: L(
        '공연 중인 밴드',
        'musiqa guruhi',
        'a band',
        'музыкальная группа',
      ),
    },
    tags: ['music', 'entertainment'],
    difficulty: 1,
    isCore: true,
  },
];

export const EN_S1_UNIT9_NODE4_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Weather words
  // ===========================================================

  en_s1u9_n4_001_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'It is warm and sunny.',
    audioText: 'It is warm and sunny.',
    answerTranslation: L(
      '날씨가 따뜻하고 맑아요.',
      'Havo iliq va quyoshli.',
      'It is warm and sunny.',
      'Тепло и солнечно.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['weather', 'sunny'],
  },

  en_s1u9_n4_002_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'cloudy',
    choices: [
      { text: 'rainy', label: '🌧️', emoji: '🌧️', imageUrl: '' },
      { text: 'cloudy', label: '☁️', emoji: '☁️', imageUrl: '' },
      { text: 'snowy', label: '❄️', emoji: '❄️', imageUrl: '' },
      { text: 'stormy', label: '⛈️', emoji: '⛈️', imageUrl: '' },
    ],
    answerTranslation: L('흐린', 'bulutli', 'cloudy', 'облачный'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['weather', 'cloudy'],
  },

  en_s1u9_n4_003_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'cloudy',
        native: 'bulutli',
        nativeI18n: L('흐린', 'bulutli', 'cloudy', 'облачный'),
      },
      {
        text: 'rainy',
        native: 'yomg‘irli',
        nativeI18n: L('비가 오는', 'yomg‘irli', 'rainy', 'дождливый'),
      },
      {
        text: 'stormy',
        native: 'bo‘ronli',
        nativeI18n: L('폭풍우가 치는', 'bo‘ronli', 'stormy', 'штормовой'),
      },
      {
        text: 'snowy',
        native: 'qorli',
        nativeI18n: L('눈이 오는', 'qorli', 'snowy', 'снежный'),
      },
      {
        text: 'weather',
        native: 'ob-havo',
        nativeI18n: L('날씨', 'ob-havo', 'weather', 'погода'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['weather', 'matching'],
  },

  en_s1u9_n4_004_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['cold', 'cloudy', 'It', 'is', 'today', 'rainy', 'was'],
    answer: 'It is cloudy today',
    answerTranslation: L(
      '오늘은 흐려요.',
      'Bugun havo bulutli.',
      'It is cloudy today.',
      'Сегодня облачно.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['cloudy', 'weather'],
  },

  en_s1u9_n4_005_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['rainy', 'here', 'It', 'is', 'today', 'snowy', 'weather'],
    answer: 'It is rainy here today',
    audioText: 'It is rainy here today.',
    answerTranslation: L(
      '여기는 오늘 비가 와요.',
      'Bu yerda bugun yomg‘ir yog‘yapti.',
      'It is rainy here today.',
      'Здесь сегодня дождливо.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['rainy', 'weather'],
  },

  en_s1u9_n4_006_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'cloudy',
        native: 'bulutli',
        nativeI18n: L('흐린', 'bulutli', 'cloudy', 'облачный'),
      },
      {
        text: 'rainy',
        native: 'yomg‘irli',
        nativeI18n: L('비가 오는', 'yomg‘irli', 'rainy', 'дождливый'),
      },
      {
        text: 'stormy',
        native: 'bo‘ronli',
        nativeI18n: L('폭풍우가 치는', 'bo‘ronli', 'stormy', 'штормовой'),
      },
      {
        text: 'snowy',
        native: 'qorli',
        nativeI18n: L('눈이 오는', 'qorli', 'snowy', 'снежный'),
      },
      {
        text: 'weather',
        native: 'ob-havo',
        nativeI18n: L('날씨', 'ob-havo', 'weather', 'погода'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['weather', 'listening'],
  },

  en_s1u9_n4_007_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'It is ',
    sentenceSuffix: ' today.',
    answer: 'cloudy',
    answerTranslation: L(
      '오늘은 흐려요.',
      'Bugun havo bulutli.',
      'It is cloudy today.',
      'Сегодня облачно.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "cloudy".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'cloudy'],
  },

  en_s1u9_n4_008_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'stormy',
    choices: [
      { text: 'snowy', label: '❄️', emoji: '❄️', imageUrl: '' },
      { text: 'rainy', label: '🌧️', emoji: '🌧️', imageUrl: '' },
      { text: 'stormy', label: '⛈️', emoji: '⛈️', imageUrl: '' },
      { text: 'cloudy', label: '☁️', emoji: '☁️', imageUrl: '' },
    ],
    answerTranslation: L('폭풍우가 치는', 'bo‘ronli', 'stormy', 'штормовой'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['stormy'],
  },

  en_s1u9_n4_009_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'It was snowy in Rome last week.',
    audioText: 'It was snowy in Rome last week.',
    answerI18n: L(
      '지난주 로마에는 눈이 왔어요',
      'O‘tgan hafta Rimda qor yog‘di',
      'It was snowy in Rome last week',
      'На прошлой неделе в Риме было снежно',
    ),
    options: ['It', 'was', 'snowy', 'in', 'Rome', 'last', 'week', 'is'],
    optionsI18n: {
      ko: ['지난주', '로마에는', '눈이', '왔어요'],
      uz: ['O‘tgan', 'hafta', 'Rimda', 'qor', 'yog‘di'],
      en: ['It', 'was', 'snowy', 'in', 'Rome', 'last', 'week'],
      ru: ['На', 'прошлой', 'неделе', 'в', 'Риме', 'было', 'снежно'],
    },
    answerTranslation: L(
      '지난주 로마에는 눈이 왔어요.',
      'O‘tgan hafta Rimda qor yog‘di.',
      'It was snowy in Rome last week.',
      'На прошлой неделе в Риме было снежно.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['snowy', 'was'],
  },

  en_s1u9_n4_010_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What’s the weather like with you?',
    options: ['It', 'is', 'a', 'little', 'cloudy', 'but', 'warm', 'was'],
    answer: 'It is a little cloudy but warm',
    answerTranslation: L(
      '조금 흐리지만 따뜻해요.',
      'Havo biroz bulutli, lekin iliq.',
      'It is a little cloudy, but warm.',
      'Немного облачно, но тепло.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['weather', 'reply'],
  },

  en_s1u9_n4_011_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'The weather was very ',
    sentenceSuffix: '.',
    answer: 'stormy',
    answerTranslation: L(
      '날씨가 매우 폭풍우가 심했어요.',
      'Ob-havo juda bo‘ronli edi.',
      'The weather was very stormy.',
      'Погода была очень штормовой.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "stormy".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'stormy'],
  },

  en_s1u9_n4_012_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'spring',
        native: 'bahor',
        nativeI18n: L('봄', 'bahor', 'spring', 'весна'),
      },
      {
        text: 'summer',
        native: 'yoz',
        nativeI18n: L('여름', 'yoz', 'summer', 'лето'),
      },
      {
        text: 'autumn',
        native: 'kuz',
        nativeI18n: L('가을', 'kuz', 'autumn', 'осень'),
      },
      {
        text: 'winter',
        native: 'qish',
        nativeI18n: L('겨울', 'qish', 'winter', 'зима'),
      },
      {
        text: 'season',
        native: 'fasl',
        nativeI18n: L('계절', 'fasl', 'season', 'время года'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['seasons', 'matching'],
  },

  en_s1u9_n4_013_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['spring', 'warm', 'often', 'It', 'in', 'is', 'winter', 'snowy'],
    answer: 'It is often warm in spring',
    answerTranslation: L(
      '봄에는 자주 따뜻해요.',
      'Bahorda havo ko‘pincha iliq bo‘ladi.',
      'It is often warm in spring.',
      'Весной часто бывает тепло.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['spring', 'weather'],
  },

  en_s1u9_n4_014_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'spring',
        native: 'bahor',
        nativeI18n: L('봄', 'bahor', 'spring', 'весна'),
      },
      {
        text: 'summer',
        native: 'yoz',
        nativeI18n: L('여름', 'yoz', 'summer', 'лето'),
      },
      {
        text: 'autumn',
        native: 'kuz',
        nativeI18n: L('가을', 'kuz', 'autumn', 'осень'),
      },
      {
        text: 'winter',
        native: 'qish',
        nativeI18n: L('겨울', 'qish', 'winter', 'зима'),
      },
      {
        text: 'season',
        native: 'fasl',
        nativeI18n: L('계절', 'fasl', 'season', 'время года'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['seasons', 'listening'],
  },

  en_s1u9_n4_015_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'winter',
    choices: [
      { text: 'spring', label: '🌸', emoji: '🌸', imageUrl: '' },
      { text: 'summer', label: '☀️', emoji: '☀️', imageUrl: '' },
      { text: 'winter', label: '⛄', emoji: '⛄', imageUrl: '' },
      { text: 'autumn', label: '🍂', emoji: '🍂', imageUrl: '' },
    ],
    answerTranslation: L('겨울', 'qish', 'winter', 'зима'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['winter'],
  },

  en_s1u9_n4_016_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'It is hot and sunny in ___.',
    blankAnswers: ['summer'],
    options: ['summer', 'winter', 'cloudy', 'stormy'],
    answer: 'summer',
    answerTranslation: L(
      '여름에는 덥고 맑아요.',
      'Yozda havo issiq va quyoshli bo‘ladi.',
      'It is hot and sunny in summer.',
      'Летом жарко и солнечно.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['summer', 'weather'],
  },

  en_s1u9_n4_017_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'It is cold in ',
    sentenceSuffix: '.',
    answer: 'winter',
    answerTranslation: L(
      '겨울에는 추워요.',
      'Qishda havo sovuq bo‘ladi.',
      'It is cold in winter.',
      'Зимой холодно.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "winter".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'winter'],
  },

  en_s1u9_n4_018_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['autumn', 'cold', 'often', 'It', 'in', 'is', 'summer', 'sunny'],
    answer: 'It is often cold in autumn',
    audioText: 'It is often cold in autumn.',
    answerTranslation: L(
      '가을에는 자주 추워요.',
      'Kuzda havo ko‘pincha sovuq bo‘ladi.',
      'It is often cold in autumn.',
      'Осенью часто бывает холодно.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['autumn', 'weather'],
  },

  en_s1u9_n4_019_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What’s the weather like in summer?',
    options: ['It', 'is', 'hot', 'and', 'sunny', 'snowy', 'winter'],
    answer: 'It is hot and sunny',
    answerTranslation: L(
      '덥고 맑아요.',
      'Havo issiq va quyoshli.',
      'It is hot and sunny.',
      'Жарко и солнечно.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['summer', 'reply'],
  },

  en_s1u9_n4_020_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'What’s the weather like with you?' },
    ],
    options: [
      'It’s cloudy, but it’s warm.',
      'It cloudy was tomorrow.',
      'It does rainy today.',
      'Weather is a winter.',
    ],
    answer: 'It’s cloudy, but it’s warm.',
    answerTranslation: L(
      '흐리지만 따뜻해요.',
      'Havo bulutli, lekin iliq.',
      'It’s cloudy, but it’s warm.',
      'Облачно, но тепло.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['weather', 'dialog'],
  },

  // ===========================================================
  // Lesson 2 · Present and past weather
  // ===========================================================

  en_s1u9_n4_021_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'What was the weather like last week?',
    audioText: 'What was the weather like last week?',
    answerTranslation: L(
      '지난주 날씨가 어땠어요?',
      'O‘tgan hafta ob-havo qanday edi?',
      'What was the weather like last week?',
      'Какая была погода на прошлой неделе?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['weather', 'was'],
  },

  en_s1u9_n4_022_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'rainy',
    choices: [
      { text: 'cloudy', label: '☁️', emoji: '☁️', imageUrl: '' },
      { text: 'snowy', label: '❄️', emoji: '❄️', imageUrl: '' },
      { text: 'rainy', label: '🌧️', emoji: '🌧️', imageUrl: '' },
      { text: 'stormy', label: '⛈️', emoji: '⛈️', imageUrl: '' },
    ],
    answerTranslation: L('비가 오는', 'yomg‘irli', 'rainy', 'дождливый'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['rainy'],
  },

  en_s1u9_n4_023_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'cloudy',
        native: 'bulutli',
        nativeI18n: L('흐린', 'bulutli', 'cloudy', 'облачный'),
      },
      {
        text: 'rainy',
        native: 'yomg‘irli',
        nativeI18n: L('비가 오는', 'yomg‘irli', 'rainy', 'дождливый'),
      },
      {
        text: 'snowy',
        native: 'qorli',
        nativeI18n: L('눈이 오는', 'qorli', 'snowy', 'снежный'),
      },
      {
        text: 'stormy',
        native: 'bo‘ronli',
        nativeI18n: L('폭풍우가 치는', 'bo‘ronli', 'stormy', 'штормовой'),
      },
      {
        text: 'season',
        native: 'fasl',
        nativeI18n: L('계절', 'fasl', 'season', 'время года'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['weather', 'matching'],
  },

  en_s1u9_n4_024_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['weather', 'like', 'What', 'is', 'the', 'today', 'was', 'last'],
    answer: 'What is the weather like today',
    answerTranslation: L(
      '오늘 날씨가 어때요?',
      'Bugun ob-havo qanday?',
      'What is the weather like today?',
      'Какая сегодня погода?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['weather-question', 'present'],
  },

  en_s1u9_n4_025_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['last', 'weather', 'the', 'like', 'was', 'What', 'week', 'is'],
    answer: 'What was the weather like last week',
    audioText: 'What was the weather like last week?',
    answerTranslation: L(
      '지난주 날씨가 어땠어요?',
      'O‘tgan hafta ob-havo qanday edi?',
      'What was the weather like last week?',
      'Какая была погода на прошлой неделе?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['weather-question', 'past'],
  },

  en_s1u9_n4_026_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'cloudy',
        native: 'bulutli',
        nativeI18n: L('흐린', 'bulutli', 'cloudy', 'облачный'),
      },
      {
        text: 'rainy',
        native: 'yomg‘irli',
        nativeI18n: L('비가 오는', 'yomg‘irli', 'rainy', 'дождливый'),
      },
      {
        text: 'snowy',
        native: 'qorli',
        nativeI18n: L('눈이 오는', 'qorli', 'snowy', 'снежный'),
      },
      {
        text: 'stormy',
        native: 'bo‘ronli',
        nativeI18n: L('폭풍우가 치는', 'bo‘ronli', 'stormy', 'штормовой'),
      },
      {
        text: 'season',
        native: 'fasl',
        nativeI18n: L('계절', 'fasl', 'season', 'время года'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['weather', 'listening'],
  },

  en_s1u9_n4_027_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'What ',
    sentenceSuffix: ' the weather like last week?',
    answer: 'was',
    answerTranslation: L(
      '지난주 날씨가 어땠어요?',
      'O‘tgan hafta ob-havo qanday edi?',
      'What was the weather like last week?',
      'Какая была погода на прошлой неделе?',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "was".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'was'],
  },

  en_s1u9_n4_028_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'snowy',
    choices: [
      { text: 'stormy', label: '⛈️', emoji: '⛈️', imageUrl: '' },
      { text: 'cloudy', label: '☁️', emoji: '☁️', imageUrl: '' },
      { text: 'snowy', label: '❄️', emoji: '❄️', imageUrl: '' },
      { text: 'rainy', label: '🌧️', emoji: '🌧️', imageUrl: '' },
    ],
    answerTranslation: L('눈이 오는', 'qorli', 'snowy', 'снежный'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['snowy'],
  },

  en_s1u9_n4_029_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'It was hot and sunny on holiday.',
    audioText: 'It was hot and sunny on holiday.',
    answerI18n: L(
      '휴가 때 날씨가 덥고 맑았어요',
      'Ta’tilda havo issiq va quyoshli edi',
      'It was hot and sunny on holiday',
      'Во время отпуска было жарко и солнечно',
    ),
    options: ['It', 'was', 'hot', 'and', 'sunny', 'on', 'holiday', 'is'],
    optionsI18n: {
      ko: ['휴가', '때', '날씨가', '덥고', '맑았어요'],
      uz: ['Ta’tilda', 'havo', 'issiq', 'va', 'quyoshli', 'edi'],
      en: ['It', 'was', 'hot', 'and', 'sunny', 'on', 'holiday'],
      ru: ['Во', 'время', 'отпуска', 'было', 'жарко', 'и', 'солнечно'],
    },
    answerTranslation: L(
      '휴가 때 날씨가 덥고 맑았어요.',
      'Ta’tilda havo issiq va quyoshli edi.',
      'It was hot and sunny on holiday.',
      'Во время отпуска было жарко и солнечно.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['weather', 'past'],
  },

  en_s1u9_n4_030_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What was the weather like on holiday?',
    options: ['It', 'was', 'nice', 'and', 'warm', 'is', 'rainy'],
    answer: 'It was nice and warm',
    answerTranslation: L(
      '날씨가 좋고 따뜻했어요.',
      'Havo yaxshi va iliq edi.',
      'It was nice and warm.',
      'Было хорошо и тепло.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['weather', 'reply'],
  },

  en_s1u9_n4_031_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'What ',
    sentenceSuffix: ' the weather like today?',
    answer: 'is',
    answerTranslation: L(
      '오늘 날씨가 어때요?',
      'Bugun ob-havo qanday?',
      'What is the weather like today?',
      'Какая сегодня погода?',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "is".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'is'],
  },

  en_s1u9_n4_032_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'spring',
        native: 'bahor',
        nativeI18n: L('봄', 'bahor', 'spring', 'весна'),
      },
      {
        text: 'summer',
        native: 'yoz',
        nativeI18n: L('여름', 'yoz', 'summer', 'лето'),
      },
      {
        text: 'autumn',
        native: 'kuz',
        nativeI18n: L('가을', 'kuz', 'autumn', 'осень'),
      },
      {
        text: 'winter',
        native: 'qish',
        nativeI18n: L('겨울', 'qish', 'winter', 'зима'),
      },
      {
        text: 'weather',
        native: 'ob-havo',
        nativeI18n: L('날씨', 'ob-havo', 'weather', 'погода'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['seasons', 'matching'],
  },

  en_s1u9_n4_033_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['often', 'It', 'too', 'cold', 'sunny', 'is', 'but', 'quite'],
    answer: 'It is often sunny but quite cold too',
    answerTranslation: L(
      '자주 맑지만 꽤 춥기도 해요.',
      'Havo ko‘pincha quyoshli, lekin ancha sovuq ham bo‘ladi.',
      'It is often sunny, but quite cold, too.',
      'Часто солнечно, но при этом довольно холодно.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['weather', 'description'],
  },

  en_s1u9_n4_034_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'spring',
        native: 'bahor',
        nativeI18n: L('봄', 'bahor', 'spring', 'весна'),
      },
      {
        text: 'summer',
        native: 'yoz',
        nativeI18n: L('여름', 'yoz', 'summer', 'лето'),
      },
      {
        text: 'autumn',
        native: 'kuz',
        nativeI18n: L('가을', 'kuz', 'autumn', 'осень'),
      },
      {
        text: 'winter',
        native: 'qish',
        nativeI18n: L('겨울', 'qish', 'winter', 'зима'),
      },
      {
        text: 'weather',
        native: 'ob-havo',
        nativeI18n: L('날씨', 'ob-havo', 'weather', 'погода'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['seasons', 'listening'],
  },

  en_s1u9_n4_035_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'autumn',
    choices: [
      { text: 'winter', label: '⛄', emoji: '⛄', imageUrl: '' },
      { text: 'spring', label: '🌸', emoji: '🌸', imageUrl: '' },
      { text: 'autumn', label: '🍂', emoji: '🍂', imageUrl: '' },
      { text: 'summer', label: '☀️', emoji: '☀️', imageUrl: '' },
    ],
    answerTranslation: L('가을', 'kuz', 'autumn', 'осень'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['autumn'],
  },

  en_s1u9_n4_036_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'What ___ the weather like yesterday?',
    blankAnswers: ['was'],
    options: ['was', 'is', 'did', 'were'],
    answer: 'was',
    answerTranslation: L(
      '어제 날씨가 어땠어요?',
      'Kecha ob-havo qanday edi?',
      'What was the weather like yesterday?',
      'Какая вчера была погода?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['weather-question', 'was'],
  },

  en_s1u9_n4_037_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'It was very ',
    sentenceSuffix: ' yesterday.',
    answer: 'rainy',
    answerTranslation: L(
      '어제는 비가 많이 왔어요.',
      'Kecha havo juda yomg‘irli edi.',
      'It was very rainy yesterday.',
      'Вчера было очень дождливо.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "rainy".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'rainy'],
  },

  en_s1u9_n4_038_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'New',
      'York',
      'winter',
      'in',
      'cold',
      'very',
      'is',
      'It',
      'summer',
    ],
    answer: 'It is very cold in New York in winter',
    audioText: 'It is very cold in New York in winter.',
    answerTranslation: L(
      '뉴욕은 겨울에 매우 추워요.',
      'Nyu-Yorkda qishda havo juda sovuq.',
      'It is very cold in New York in winter.',
      'Зимой в Нью-Йорке очень холодно.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['winter', 'weather'],
  },

  en_s1u9_n4_039_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What’s the weather like in spring?',
    options: ['It', 'is', 'often', 'warm', 'and', 'sunny', 'was', 'winter'],
    answer: 'It is often warm and sunny',
    answerTranslation: L(
      '자주 따뜻하고 맑아요.',
      'Havo ko‘pincha iliq va quyoshli bo‘ladi.',
      'It is often warm and sunny.',
      'Часто тепло и солнечно.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['spring', 'reply'],
  },

  en_s1u9_n4_040_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'What was the weather like last summer?' },
    ],
    options: [
      'It was hot and sunny.',
      'It is hot last summer.',
      'It did sunny and hot.',
      'It was summer weather is.',
    ],
    answer: 'It was hot and sunny.',
    answerTranslation: L(
      '덥고 맑았어요.',
      'Havo issiq va quyoshli edi.',
      'It was hot and sunny.',
      'Было жарко и солнечно.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['past-weather', 'dialog'],
  },

  // ===========================================================
  // Lesson 3 · At a festival
  // ===========================================================

  en_s1u9_n4_041_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The atmosphere was great.',
    audioText: 'The atmosphere was great.',
    answerTranslation: L(
      '분위기가 아주 좋았어요.',
      'Muhit juda yaxshi edi.',
      'The atmosphere was great.',
      'Атмосфера была отличной.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['festival', 'atmosphere'],
  },

  en_s1u9_n4_042_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'festival',
    choices: [
      { text: 'band', label: '🎸', emoji: '🎸', imageUrl: '' },
      { text: 'festival', label: '🎪', emoji: '🎪', imageUrl: '' },
      { text: 'comedian', label: '🎤', emoji: '🎤', imageUrl: '' },
      { text: 'winter', label: '⛄', emoji: '⛄', imageUrl: '' },
    ],
    answerTranslation: L('축제', 'festival', 'festival', 'фестиваль'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['festival'],
  },

  en_s1u9_n4_043_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'festival',
        native: 'festival',
        nativeI18n: L('축제', 'festival', 'festival', 'фестиваль'),
      },
      {
        text: 'atmosphere',
        native: 'muhit',
        nativeI18n: L('분위기', 'muhit', 'atmosphere', 'атмосфера'),
      },
      {
        text: 'comedian',
        native: 'komik',
        nativeI18n: L('코미디언', 'komik', 'comedian', 'комик'),
      },
      {
        text: 'band',
        native: 'musiqa guruhi',
        nativeI18n: L('밴드', 'musiqa guruhi', 'band', 'музыкальная группа'),
      },
      {
        text: 'weather',
        native: 'ob-havo',
        nativeI18n: L('날씨', 'ob-havo', 'weather', 'погода'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['festival', 'matching'],
  },

  en_s1u9_n4_044_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['festival', 'music', 'went', 'We', 'a', 'to', 'band', 'weather'],
    answer: 'We went to a music festival',
    answerTranslation: L(
      '우리는 음악 축제에 갔어요.',
      'Biz musiqa festivaliga bordik.',
      'We went to a music festival.',
      'Мы ходили на музыкальный фестиваль.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['festival', 'event'],
  },

  en_s1u9_n4_045_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['festival', 'at', 'bands', 'two', 'saw', 'We', 'the', 'comedian'],
    answer: 'We saw two bands at the festival',
    audioText: 'We saw two bands at the festival.',
    answerTranslation: L(
      '우리는 축제에서 두 밴드를 봤어요.',
      'Biz festivalda ikkita musiqa guruhini ko‘rdik.',
      'We saw two bands at the festival.',
      'Мы видели две группы на фестивале.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['band', 'festival'],
  },

  en_s1u9_n4_046_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'festival',
        native: 'festival',
        nativeI18n: L('축제', 'festival', 'festival', 'фестиваль'),
      },
      {
        text: 'atmosphere',
        native: 'muhit',
        nativeI18n: L('분위기', 'muhit', 'atmosphere', 'атмосфера'),
      },
      {
        text: 'comedian',
        native: 'komik',
        nativeI18n: L('코미디언', 'komik', 'comedian', 'комик'),
      },
      {
        text: 'band',
        native: 'musiqa guruhi',
        nativeI18n: L('밴드', 'musiqa guruhi', 'band', 'музыкальная группа'),
      },
      {
        text: 'weather',
        native: 'ob-havo',
        nativeI18n: L('날씨', 'ob-havo', 'weather', 'погода'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['festival', 'listening'],
  },

  en_s1u9_n4_047_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'The ',
    sentenceSuffix: ' was great.',
    answer: 'atmosphere',
    answerTranslation: L(
      '분위기가 아주 좋았어요.',
      'Muhit juda yaxshi edi.',
      'The atmosphere was great.',
      'Атмосфера была отличной.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "atmosphere".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'atmosphere'],
  },

  en_s1u9_n4_048_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'band',
    choices: [
      { text: 'comedian', label: '🎤', emoji: '🎤', imageUrl: '' },
      { text: 'festival', label: '🎪', emoji: '🎪', imageUrl: '' },
      { text: 'band', label: '🎸', emoji: '🎸', imageUrl: '' },
      { text: 'weather', label: '🌤️', emoji: '🌤️', imageUrl: '' },
    ],
    answerTranslation: L('밴드', 'musiqa guruhi', 'band', 'музыкальная группа'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['band'],
  },

  en_s1u9_n4_049_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'The weather was warm and sunny.',
    audioText: 'The weather was warm and sunny.',
    answerI18n: L(
      '날씨가 따뜻하고 맑았어요',
      'Ob-havo iliq va quyoshli edi',
      'The weather was warm and sunny',
      'Погода была тёплой и солнечной',
    ),
    options: ['The', 'weather', 'was', 'warm', 'and', 'sunny', 'rainy'],
    optionsI18n: {
      ko: ['날씨가', '따뜻하고', '맑았어요'],
      uz: ['Ob-havo', 'iliq', 'va', 'quyoshli', 'edi'],
      en: ['The', 'weather', 'was', 'warm', 'and', 'sunny'],
      ru: ['Погода', 'была', 'тёплой', 'и', 'солнечной'],
    },
    answerTranslation: L(
      '날씨가 따뜻하고 맑았어요.',
      'Ob-havo iliq va quyoshli edi.',
      'The weather was warm and sunny.',
      'Погода была тёплой и солнечной.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['festival', 'weather'],
  },

  en_s1u9_n4_050_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What did you see at the festival?',
    options: ['We', 'saw', 'two', 'bands', 'and', 'a', 'comedian', 'weather'],
    answer: 'We saw two bands and a comedian',
    answerTranslation: L(
      '밴드 두 팀과 코미디언 한 명을 봤어요.',
      'Biz ikkita musiqa guruhi va bir komikni ko‘rdik.',
      'We saw two bands and a comedian.',
      'Мы видели две группы и одного комика.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['festival', 'reply'],
  },

  en_s1u9_n4_051_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'We saw a ',
    sentenceSuffix: ' at the festival.',
    answer: 'comedian',
    answerTranslation: L(
      '우리는 축제에서 코미디언을 봤어요.',
      'Biz festivalda komikni ko‘rdik.',
      'We saw a comedian at the festival.',
      'Мы видели комика на фестивале.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "comedian".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'comedian'],
  },

  en_s1u9_n4_052_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'festival',
        native: 'festival',
        nativeI18n: L('축제', 'festival', 'festival', 'фестиваль'),
      },
      {
        text: 'band',
        native: 'musiqa guruhi',
        nativeI18n: L('밴드', 'musiqa guruhi', 'band', 'музыкальная группа'),
      },
      {
        text: 'comedian',
        native: 'komik',
        nativeI18n: L('코미디언', 'komik', 'comedian', 'комик'),
      },
      {
        text: 'atmosphere',
        native: 'muhit',
        nativeI18n: L('분위기', 'muhit', 'atmosphere', 'атмосфера'),
      },
      {
        text: 'season',
        native: 'fasl',
        nativeI18n: L('계절', 'fasl', 'season', 'время года'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['event-review', 'matching'],
  },

  en_s1u9_n4_053_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'friendly',
      'really',
      'Everyone',
      'was',
      'funny',
      'festival',
      'weather',
    ],
    answer: 'Everyone was really friendly',
    answerTranslation: L(
      '모두 정말 친절했어요.',
      'Hamma juda do‘stona edi.',
      'Everyone was really friendly.',
      'Все были очень дружелюбными.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['festival', 'review'],
  },

  en_s1u9_n4_054_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'festival',
        native: 'festival',
        nativeI18n: L('축제', 'festival', 'festival', 'фестиваль'),
      },
      {
        text: 'band',
        native: 'musiqa guruhi',
        nativeI18n: L('밴드', 'musiqa guruhi', 'band', 'музыкальная группа'),
      },
      {
        text: 'comedian',
        native: 'komik',
        nativeI18n: L('코미디언', 'komik', 'comedian', 'комик'),
      },
      {
        text: 'atmosphere',
        native: 'muhit',
        nativeI18n: L('분위기', 'muhit', 'atmosphere', 'атмосфера'),
      },
      {
        text: 'season',
        native: 'fasl',
        nativeI18n: L('계절', 'fasl', 'season', 'время года'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['event-review', 'listening'],
  },

  en_s1u9_n4_055_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'comedian',
    choices: [
      { text: 'band', label: '🎸', emoji: '🎸', imageUrl: '' },
      { text: 'weather', label: '🌤️', emoji: '🌤️', imageUrl: '' },
      { text: 'comedian', label: '🎤', emoji: '🎤', imageUrl: '' },
      { text: 'festival', label: '🎪', emoji: '🎪', imageUrl: '' },
    ],
    answerTranslation: L('코미디언', 'komik', 'comedian', 'комик'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['comedian'],
  },

  en_s1u9_n4_056_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The ___ was great.',
    blankAnswers: ['atmosphere'],
    options: ['atmosphere', 'winter', 'cloudy', 'comedian'],
    answer: 'atmosphere',
    answerTranslation: L(
      '분위기가 아주 좋았어요.',
      'Muhit juda yaxshi edi.',
      'The atmosphere was great.',
      'Атмосфера была отличной.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['atmosphere'],
  },

  en_s1u9_n4_057_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'We saw two ',
    sentenceSuffix: '.',
    answer: 'bands',
    answerTranslation: L(
      '우리는 밴드 두 팀을 봤어요.',
      'Biz ikkita musiqa guruhini ko‘rdik.',
      'We saw two bands.',
      'Мы видели две группы.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is the plural "bands".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'band'],
  },

  en_s1u9_n4_058_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'food',
      'interesting',
      'There',
      'was',
      'world',
      'the',
      'from',
      'all',
      'over',
      'boring',
    ],
    answer: 'There was interesting food from all over the world',
    audioText: 'There was interesting food from all over the world.',
    answerTranslation: L(
      '세계 여러 곳의 흥미로운 음식이 있었어요.',
      'Dunyoning turli joylaridan qiziqarli taomlar bor edi.',
      'There was interesting food from all over the world.',
      'Там была интересная еда со всего мира.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['festival', 'review'],
  },

  en_s1u9_n4_059_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Did you like the festival?',
    options: ['Yes', 'the', 'atmosphere', 'was', 'great', 'boring', 'weather'],
    answer: 'Yes the atmosphere was great',
    answerTranslation: L(
      '네, 분위기가 아주 좋았어요.',
      'Ha, muhit juda yaxshi edi.',
      'Yes, the atmosphere was great.',
      'Да, атмосфера была отличной.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['festival', 'reply'],
  },

  en_s1u9_n4_060_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'What did you think of the festival?' },
    ],
    options: [
      'The atmosphere was great and the people were friendly.',
      'The atmosphere is tomorrow and people did friendly.',
      'The festival was a cloudy season.',
      'We did saw weather and bands.',
    ],
    answer: 'The atmosphere was great and the people were friendly.',
    answerTranslation: L(
      '분위기가 좋았고 사람들이 친절했어요.',
      'Muhit yaxshi edi va odamlar do‘stona edi.',
      'The atmosphere was great and the people were friendly.',
      'Атмосфера была отличной, а люди — дружелюбными.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['festival-review', 'dialog'],
  },

  // ===========================================================
  // Lesson 4 · Write an event review
  // ===========================================================

  en_s1u9_n4_061_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Last year, I went to a music festival.',
    audioText: 'Last year, I went to a music festival.',
    answerTranslation: L(
      '작년에 저는 음악 축제에 갔어요.',
      'O‘tgan yili men musiqa festivaliga bordim.',
      'Last year, I went to a music festival.',
      'В прошлом году я ходил на музыкальный фестиваль.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['event-review', 'festival'],
  },

  en_s1u9_n4_062_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'atmosphere',
    choices: [
      { text: 'band', label: '🎸', emoji: '🎸', imageUrl: '' },
      { text: 'atmosphere', label: '🎉', emoji: '🎉', imageUrl: '' },
      { text: 'winter', label: '⛄', emoji: '⛄', imageUrl: '' },
      { text: 'weather', label: '🌤️', emoji: '🌤️', imageUrl: '' },
    ],
    answerTranslation: L('분위기', 'muhit', 'atmosphere', 'атмосфера'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['atmosphere'],
  },

  en_s1u9_n4_063_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'festival',
        native: 'festival',
        nativeI18n: L('축제', 'festival', 'festival', 'фестиваль'),
      },
      {
        text: 'atmosphere',
        native: 'muhit',
        nativeI18n: L('분위기', 'muhit', 'atmosphere', 'атмосфера'),
      },
      {
        text: 'band',
        native: 'musiqa guruhi',
        nativeI18n: L('밴드', 'musiqa guruhi', 'band', 'музыкальная группа'),
      },
      {
        text: 'comedian',
        native: 'komik',
        nativeI18n: L('코미디언', 'komik', 'comedian', 'комик'),
      },
      {
        text: 'weather',
        native: 'ob-havo',
        nativeI18n: L('날씨', 'ob-havo', 'weather', 'погода'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['review', 'matching'],
  },

  en_s1u9_n4_064_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'park',
      'festival',
      'a',
      'beautiful',
      'in',
      'was',
      'The',
      'weather',
    ],
    answer: 'The festival was in a beautiful park',
    answerTranslation: L(
      '축제는 아름다운 공원에서 열렸어요.',
      'Festival chiroyli bog‘da bo‘ldi.',
      'The festival was in a beautiful park.',
      'Фестиваль проходил в красивом парке.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['event-review', 'place'],
  },

  en_s1u9_n4_065_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['amazing', 'bands', 'some', 'saw', 'We', 'boring', 'weather'],
    answer: 'We saw some amazing bands',
    audioText: 'We saw some amazing bands.',
    answerTranslation: L(
      '우리는 정말 멋진 밴드들을 봤어요.',
      'Biz ajoyib musiqa guruhlarini ko‘rdik.',
      'We saw some amazing bands.',
      'Мы видели несколько потрясающих групп.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['review', 'bands'],
  },

  en_s1u9_n4_066_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'festival',
        native: 'festival',
        nativeI18n: L('축제', 'festival', 'festival', 'фестиваль'),
      },
      {
        text: 'atmosphere',
        native: 'muhit',
        nativeI18n: L('분위기', 'muhit', 'atmosphere', 'атмосфера'),
      },
      {
        text: 'band',
        native: 'musiqa guruhi',
        nativeI18n: L('밴드', 'musiqa guruhi', 'band', 'музыкальная группа'),
      },
      {
        text: 'comedian',
        native: 'komik',
        nativeI18n: L('코미디언', 'komik', 'comedian', 'комик'),
      },
      {
        text: 'weather',
        native: 'ob-havo',
        nativeI18n: L('날씨', 'ob-havo', 'weather', 'погода'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['review', 'listening'],
  },

  en_s1u9_n4_067_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Last year, I went to a music ',
    sentenceSuffix: '.',
    answer: 'festival',
    answerTranslation: L(
      '작년에 저는 음악 축제에 갔어요.',
      'O‘tgan yili men musiqa festivaliga bordim.',
      'Last year, I went to a music festival.',
      'В прошлом году я ходил на музыкальный фестиваль.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "festival".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'festival'],
  },

  en_s1u9_n4_068_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'band',
    choices: [
      { text: 'weather', label: '🌤️', emoji: '🌤️', imageUrl: '' },
      { text: 'comedian', label: '🎤', emoji: '🎤', imageUrl: '' },
      { text: 'band', label: '🎸', emoji: '🎸', imageUrl: '' },
      { text: 'festival', label: '🎪', emoji: '🎪', imageUrl: '' },
    ],
    answerTranslation: L('밴드', 'musiqa guruhi', 'band', 'музыкальная группа'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['band'],
  },

  en_s1u9_n4_069_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'There were a lot of friendly people.',
    audioText: 'There were a lot of friendly people.',
    answerI18n: L(
      '친절한 사람들이 많이 있었어요',
      'U yerda juda ko‘p do‘stona odamlar bor edi',
      'There were a lot of friendly people',
      'Там было много дружелюбных людей',
    ),
    options: [
      'There',
      'were',
      'a',
      'lot',
      'of',
      'friendly',
      'people',
      'terrible',
    ],
    optionsI18n: {
      ko: ['친절한', '사람들이', '많이', '있었어요'],
      uz: ['U', 'yerda', 'juda', 'ko‘p', 'do‘stona', 'odamlar', 'bor', 'edi'],
      en: ['There', 'were', 'a', 'lot', 'of', 'friendly', 'people'],
      ru: ['Там', 'было', 'много', 'дружелюбных', 'людей'],
    },
    answerTranslation: L(
      '친절한 사람들이 많이 있었어요.',
      'U yerda juda ko‘p do‘stona odamlar bor edi.',
      'There were a lot of friendly people.',
      'Там было много дружелюбных людей.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['review', 'friendly'],
  },

  en_s1u9_n4_070_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What was the weather like at the festival?',
    options: ['It', 'was', 'warm', 'and', 'sunny', 'terrible', 'band'],
    answer: 'It was warm and sunny',
    answerTranslation: L(
      '따뜻하고 맑았어요.',
      'Havo iliq va quyoshli edi.',
      'It was warm and sunny.',
      'Было тепло и солнечно.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'weather'],
  },

  en_s1u9_n4_071_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'The ',
    sentenceSuffix: ' was great.',
    answer: 'atmosphere',
    answerTranslation: L(
      '분위기가 아주 좋았어요.',
      'Muhit juda yaxshi edi.',
      'The atmosphere was great.',
      'Атмосфера была отличной.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "atmosphere".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'atmosphere'],
  },

  en_s1u9_n4_072_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'cloudy',
        native: 'bulutli',
        nativeI18n: L('흐린', 'bulutli', 'cloudy', 'облачный'),
      },
      {
        text: 'rainy',
        native: 'yomg‘irli',
        nativeI18n: L('비가 오는', 'yomg‘irli', 'rainy', 'дождливый'),
      },
      {
        text: 'snowy',
        native: 'qorli',
        nativeI18n: L('눈이 오는', 'qorli', 'snowy', 'снежный'),
      },
      {
        text: 'festival',
        native: 'festival',
        nativeI18n: L('축제', 'festival', 'festival', 'фестиваль'),
      },
      {
        text: 'atmosphere',
        native: 'muhit',
        nativeI18n: L('분위기', 'muhit', 'atmosphere', 'атмосфера'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit9', 'matching'],
  },

  en_s1u9_n4_073_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'festival',
      'because',
      'atmosphere',
      'great',
      'the',
      'was',
      'liked',
      'I',
      'boring',
    ],
    answer: 'I liked the festival because the atmosphere was great',
    answerTranslation: L(
      '분위기가 아주 좋아서 축제가 마음에 들었어요.',
      'Muhit juda yaxshi bo‘lgani uchun festival menga yoqdi.',
      'I liked the festival because the atmosphere was great.',
      'Мне понравился фестиваль, потому что атмосфера была отличной.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['review', 'opinion'],
  },

  en_s1u9_n4_074_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'cloudy',
        native: 'bulutli',
        nativeI18n: L('흐린', 'bulutli', 'cloudy', 'облачный'),
      },
      {
        text: 'rainy',
        native: 'yomg‘irli',
        nativeI18n: L('비가 오는', 'yomg‘irli', 'rainy', 'дождливый'),
      },
      {
        text: 'snowy',
        native: 'qorli',
        nativeI18n: L('눈이 오는', 'qorli', 'snowy', 'снежный'),
      },
      {
        text: 'festival',
        native: 'festival',
        nativeI18n: L('축제', 'festival', 'festival', 'фестиваль'),
      },
      {
        text: 'atmosphere',
        native: 'muhit',
        nativeI18n: L('분위기', 'muhit', 'atmosphere', 'атмосфера'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['unit9', 'listening'],
  },

  en_s1u9_n4_075_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'festival',
    choices: [
      { text: 'band', label: '🎸', emoji: '🎸', imageUrl: '' },
      { text: 'weather', label: '🌤️', emoji: '🌤️', imageUrl: '' },
      { text: 'festival', label: '🎪', emoji: '🎪', imageUrl: '' },
      { text: 'season', label: '🗓️', emoji: '🗓️', imageUrl: '' },
    ],
    answerTranslation: L('축제', 'festival', 'festival', 'фестиваль'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['festival'],
  },

  en_s1u9_n4_076_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The atmosphere was ___.',
    blankAnswers: ['great'],
    options: ['great', 'rainy', 'winter', 'band'],
    answer: 'great',
    answerTranslation: L(
      '분위기가 아주 좋았어요.',
      'Muhit juda yaxshi edi.',
      'The atmosphere was great.',
      'Атмосфера была отличной.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['review', 'adjectives'],
  },

  en_s1u9_n4_077_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'We saw two ',
    sentenceSuffix: ' at the festival.',
    answer: 'bands',
    answerTranslation: L(
      '우리는 축제에서 두 밴드를 봤어요.',
      'Biz festivalda ikkita musiqa guruhini ko‘rdik.',
      'We saw two bands at the festival.',
      'Мы видели две группы на фестивале.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is the plural "bands".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'band'],
  },

  en_s1u9_n4_078_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'boring',
      'never',
      'festival',
      'The',
      'was',
      'terrible',
      'atmosphere',
    ],
    answer: 'The festival was never boring',
    audioText: 'The festival was never boring.',
    answerTranslation: L(
      '그 축제는 전혀 지루하지 않았어요.',
      'Festival hech qachon zerikarli bo‘lmadi.',
      'The festival was never boring.',
      'На фестивале никогда не было скучно.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['review', 'boring'],
  },

  en_s1u9_n4_079_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Did you like the event?',
    options: ['Yes', 'it', 'was', 'great', 'and', 'never', 'boring', 'rainy'],
    answer: 'Yes it was great and never boring',
    answerTranslation: L(
      '네, 정말 좋았고 전혀 지루하지 않았어요.',
      'Ha, juda yaxshi edi va hech qachon zerikarli bo‘lmadi.',
      'Yes, it was great and never boring.',
      'Да, всё было отлично и совсем не скучно.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['event-review', 'reply'],
  },

  en_s1u9_n4_080_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Tell me about the festival.' }],
    options: [
      'The weather was warm, the people were friendly and the atmosphere was great.',
      'The weather did warm and people was friendly.',
      'The festival is last year and was tomorrow.',
      'The atmosphere went sunny and band.',
    ],
    answer:
      'The weather was warm, the people were friendly and the atmosphere was great.',
    answerTranslation: L(
      '날씨는 따뜻했고 사람들은 친절했으며 분위기는 아주 좋았어요.',
      'Havo iliq edi, odamlar do‘stona edi va muhit juda yaxshi edi.',
      'The weather was warm, the people were friendly and the atmosphere was great.',
      'Погода была тёплой, люди дружелюбными, а атмосфера отличной.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['event-review', 'unit9', 'final'],
  },
};

export const EN_S1_UNIT9_NODE4 = {
  title: L(
    '날씨와 행사 리뷰',
    'Ob-havo va tadbir sharhi',
    'Weather and event reviews',
    'Погода и отзывы о событиях',
  ),
  section: 1,
  unit: 9,
  order: 4,
  isActive: true,

  lessons: [
    {
      title: L(
        '날씨와 계절',
        'Ob-havo va fasllar',
        'Weather and seasons',
        'Погода и времена года',
      ),
      description: L(
        'cloudy, rainy, stormy, snowy와 네 계절을 익히고 기본적인 날씨를 설명해요.',
        'Cloudy, rainy, stormy, snowy va to‘rt faslni o‘rganib, ob-havoni tasvirlaysiz.',
        'Learn cloudy, rainy, stormy and snowy together with the four seasons and describe basic weather.',
        'Изучаем cloudy, rainy, stormy, snowy и четыре времени года и описываем погоду.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 1,
      questions: [
        'en_s1u9_n4_001_speaking',
        'en_s1u9_n4_002_image_choice',
        'en_s1u9_n4_003_word_matching',
        'en_s1u9_n4_004_translate_builder',
        'en_s1u9_n4_005_word_arrange',
        'en_s1u9_n4_006_audio_match',
        'en_s1u9_n4_007_type_answer',
        'en_s1u9_n4_008_image_choice',
        'en_s1u9_n4_009_sentence_builder',
        'en_s1u9_n4_010_reply_builder',
        'en_s1u9_n4_011_type_answer',
        'en_s1u9_n4_012_word_matching',
        'en_s1u9_n4_013_translate_builder',
        'en_s1u9_n4_014_audio_match',
        'en_s1u9_n4_015_image_choice',
        'en_s1u9_n4_016_fill_in_blank',
        'en_s1u9_n4_017_type_answer',
        'en_s1u9_n4_018_word_arrange',
        'en_s1u9_n4_019_reply_builder',
        'en_s1u9_n4_020_dialog_complete',
      ],
    },

    {
      title: L(
        '현재와 과거의 날씨',
        'Hozirgi va o‘tgan ob-havo',
        'Present and past weather',
        'Погода сейчас и в прошлом',
      ),
      description: L(
        'What is the weather like?와 What was the weather like?를 구분해 현재와 과거의 날씨를 묻고 답해요.',
        'What is the weather like? va What was the weather like? yordamida hozirgi va o‘tgan ob-havo haqida so‘raysiz.',
        'Use What is the weather like? and What was the weather like? to ask about present and past weather.',
        'Используем What is the weather like? и What was the weather like? для настоящей и прошлой погоды.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 2,
      questions: [
        'en_s1u9_n4_021_speaking',
        'en_s1u9_n4_022_image_choice',
        'en_s1u9_n4_023_word_matching',
        'en_s1u9_n4_024_translate_builder',
        'en_s1u9_n4_025_word_arrange',
        'en_s1u9_n4_026_audio_match',
        'en_s1u9_n4_027_type_answer',
        'en_s1u9_n4_028_image_choice',
        'en_s1u9_n4_029_sentence_builder',
        'en_s1u9_n4_030_reply_builder',
        'en_s1u9_n4_031_type_answer',
        'en_s1u9_n4_032_word_matching',
        'en_s1u9_n4_033_translate_builder',
        'en_s1u9_n4_034_audio_match',
        'en_s1u9_n4_035_image_choice',
        'en_s1u9_n4_036_fill_in_blank',
        'en_s1u9_n4_037_type_answer',
        'en_s1u9_n4_038_word_arrange',
        'en_s1u9_n4_039_reply_builder',
        'en_s1u9_n4_040_dialog_complete',
      ],
    },

    {
      title: L(
        '축제 이야기',
        'Festival haqida',
        'At a festival',
        'На фестивале',
      ),
      description: L(
        'festival, band, comedian, atmosphere를 사용해 축제에서 본 것과 느낀 점을 말해요.',
        'Festival, band, comedian va atmosphere so‘zlari bilan festivalda ko‘rgan va his qilgan narsalaringizni aytasiz.',
        'Use festival, band, comedian and atmosphere to talk about what you saw and experienced at an event.',
        'Используем festival, band, comedian и atmosphere, чтобы рассказать о фестивале.',
      ),
      category: LessonCategory.EXPRESSION,
      level: LV,
      order: 3,
      questions: [
        'en_s1u9_n4_041_speaking',
        'en_s1u9_n4_042_image_choice',
        'en_s1u9_n4_043_word_matching',
        'en_s1u9_n4_044_translate_builder',
        'en_s1u9_n4_045_word_arrange',
        'en_s1u9_n4_046_audio_match',
        'en_s1u9_n4_047_type_answer',
        'en_s1u9_n4_048_image_choice',
        'en_s1u9_n4_049_sentence_builder',
        'en_s1u9_n4_050_reply_builder',
        'en_s1u9_n4_051_type_answer',
        'en_s1u9_n4_052_word_matching',
        'en_s1u9_n4_053_translate_builder',
        'en_s1u9_n4_054_audio_match',
        'en_s1u9_n4_055_image_choice',
        'en_s1u9_n4_056_fill_in_blank',
        'en_s1u9_n4_057_type_answer',
        'en_s1u9_n4_058_word_arrange',
        'en_s1u9_n4_059_reply_builder',
        'en_s1u9_n4_060_dialog_complete',
      ],
    },

    {
      title: L(
        '행사 리뷰 쓰기',
        'Tadbir haqida sharh yozish',
        'Write an event review',
        'Пишем отзыв о событии',
      ),
      description: L(
        '장소, 날씨, 사람, 공연과 분위기를 형용사로 묘사하면서 과거에 다녀온 행사를 리뷰해요.',
        'Joy, ob-havo, odamlar, chiqishlar va muhitni sifatlar bilan tasvirlab, o‘tgan tadbir haqida sharh yozasiz.',
        'Review a past event by describing the place, weather, people, performances and atmosphere with adjectives.',
        'Пишем отзыв о прошедшем событии, описывая место, погоду, людей, выступления и атмосферу.',
      ),
      category: LessonCategory.EXPRESSION,
      level: LV,
      order: 4,
      questions: [
        'en_s1u9_n4_061_speaking',
        'en_s1u9_n4_062_image_choice',
        'en_s1u9_n4_063_word_matching',
        'en_s1u9_n4_064_translate_builder',
        'en_s1u9_n4_065_word_arrange',
        'en_s1u9_n4_066_audio_match',
        'en_s1u9_n4_067_type_answer',
        'en_s1u9_n4_068_image_choice',
        'en_s1u9_n4_069_sentence_builder',
        'en_s1u9_n4_070_reply_builder',
        'en_s1u9_n4_071_type_answer',
        'en_s1u9_n4_072_word_matching',
        'en_s1u9_n4_073_translate_builder',
        'en_s1u9_n4_074_audio_match',
        'en_s1u9_n4_075_image_choice',
        'en_s1u9_n4_076_fill_in_blank',
        'en_s1u9_n4_077_type_answer',
        'en_s1u9_n4_078_word_arrange',
        'en_s1u9_n4_079_reply_builder',
        'en_s1u9_n4_080_dialog_complete',
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Section 1 · Unit 9 · Node 5
// 9.5 Whatever the weather + Unit 9 Review
//
// Coverage
// - countryside / fountain / ocean / river
// - sailing / boat / sky / snow
// - tourist / traffic / visitor
// - temperature / degree
// - Seattle / Stroud / Paris / Auckland
// - global weather descriptions
// - seasons and weather review
// - Kim Peek: amazing memory
// - art / cinema / literature / music
// - news / science / sport / theatre
// - forming difficult questions
// - irregular past review
// - didn't + base verb
// - Did ...? / Wh- + did ...?
// - ago
// - Unit 9 vocabulary review
//
// IMPORTANT:
// *_WORDS에는 무조건 단어 하나만 등록.
// "sailing boat", "radio programme", "Football World Cup",
// "a few years ago" 같은 구/문장은 등록 금지.
//
// Reused:
// weather / cloudy / rainy / stormy / snowy
// spring / summer / autumn / winter / season
// memory / excuse / headache / homeless
// tip / festival / atmosphere
// warm / hot / cold / sunny
// music / friend / doctor
//
// 4 lessons × 20 questions = 80
// type_answer: 3 per lesson
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT9_NODE5_WORDS = [
  {
    code: 'en-noun-countryside',
    english: 'countryside',
    senseKey: 'land-outside-towns-and-cities',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '시골; 전원 지역',
      'qishloq joy',
      'land outside towns and cities',
      'сельская местность',
    ),
    examples: [
      {
        english: 'The countryside was beautiful.',
        translations: L(
          '전원 지역이 아름다웠어요.',
          'Qishloq joy juda chiroyli edi.',
          'The countryside was beautiful.',
          'Сельская местность была красивой.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkʌntrisaɪd/',
      ttsText: 'countryside',
    },
    media: {
      emoji: '🌄',
      imageUrl: '',
      imageAlt: L(
        '전원 풍경',
        'qishloq manzarasi',
        'the countryside',
        'сельская местность',
      ),
    },
    tags: ['places', 'nature'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-fountain',
    english: 'fountain',
    senseKey: 'structure-spraying-water',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '분수',
      'favvora',
      'a structure that sends water into the air',
      'фонтан',
    ),
    examples: [
      {
        english: 'There is a fountain in the park.',
        translations: L(
          '공원에 분수가 있어요.',
          'Bog‘da favvora bor.',
          'There is a fountain in the park.',
          'В парке есть фонтан.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈfaʊntɪn/',
      ttsText: 'fountain',
    },
    media: {
      emoji: '⛲',
      imageUrl: '',
      imageAlt: L('분수', 'favvora', 'a fountain', 'фонтан'),
    },
    tags: ['places', 'city'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-ocean',
    english: 'ocean',
    senseKey: 'very-large-area-of-sea',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '대양; 바다',
      'okean',
      'a very large area of salt water',
      'океан',
    ),
    examples: [
      {
        english: 'We could see the ocean.',
        translations: L(
          '우리는 바다를 볼 수 있었어요.',
          'Biz okeanni ko‘ra oldik.',
          'We could see the ocean.',
          'Мы могли видеть океан.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈəʊʃən/',
      ttsText: 'ocean',
    },
    media: {
      emoji: '🌊',
      imageUrl: '',
      imageAlt: L('넓은 바다', 'okean', 'the ocean', 'океан'),
    },
    tags: ['nature', 'water'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-river',
    english: 'river',
    senseKey: 'large-natural-flow-of-water',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('강', 'daryo', 'a large natural flow of water', 'река'),
    examples: [
      {
        english: 'There is a river near the city.',
        translations: L(
          '도시 근처에 강이 있어요.',
          'Shahar yaqinida daryo bor.',
          'There is a river near the city.',
          'Рядом с городом есть река.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈrɪvə/',
      ttsText: 'river',
    },
    media: {
      emoji: '🏞️',
      imageUrl: '',
      imageAlt: L('강', 'daryo', 'a river', 'река'),
    },
    tags: ['nature', 'water'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-sailing',
    english: 'sailing',
    senseKey: 'activity-of-travelling-by-sailboat',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '요트 타기; 항해',
      'yelkanli qayiqda suzish',
      'the activity of travelling in a boat using sails',
      'парусный спорт; плавание под парусом',
    ),
    examples: [
      {
        english: 'Sailing is popular in summer.',
        translations: L(
          '여름에는 요트 타기가 인기가 있어요.',
          'Yozda yelkanli qayiqda suzish mashhur.',
          'Sailing is popular in summer.',
          'Летом парусный спорт популярен.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈseɪlɪŋ/',
      ttsText: 'sailing',
    },
    media: {
      emoji: '⛵',
      imageUrl: '',
      imageAlt: L(
        '요트 타기',
        'yelkanli qayiqda suzish',
        'sailing',
        'парусный спорт',
      ),
    },
    tags: ['activities', 'travel'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-boat',
    english: 'boat',
    senseKey: 'small-vehicle-for-water',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '배; 보트',
      'qayiq',
      'a small vehicle used for travelling on water',
      'лодка',
    ),
    examples: [
      {
        english: 'The boat is on the ocean.',
        translations: L(
          '배가 바다 위에 있어요.',
          'Qayiq okeanda.',
          'The boat is on the ocean.',
          'Лодка находится в океане.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/bəʊt/',
      ttsText: 'boat',
    },
    media: {
      emoji: '🚤',
      imageUrl: '',
      imageAlt: L('보트', 'qayiq', 'a boat', 'лодка'),
    },
    tags: ['transport', 'water'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-sky',
    english: 'sky',
    senseKey: 'space-seen-above-earth',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '하늘',
      'osmon',
      'the space above the earth that you can see',
      'небо',
    ),
    examples: [
      {
        english: 'The sky is blue.',
        translations: L(
          '하늘이 파래요.',
          'Osmon ko‘k.',
          'The sky is blue.',
          'Небо голубое.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/skaɪ/',
      ttsText: 'sky',
    },
    media: {
      emoji: '🌌',
      imageUrl: '',
      imageAlt: L('하늘', 'osmon', 'the sky', 'небо'),
    },
    tags: ['nature', 'weather'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-snow',
    english: 'snow',
    senseKey: 'soft-white-frozen-water',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '눈',
      'qor',
      'soft white frozen water that falls from the sky',
      'снег',
    ),
    examples: [
      {
        english: 'There was a lot of snow.',
        translations: L(
          '눈이 많이 왔어요.',
          'Qor juda ko‘p edi.',
          'There was a lot of snow.',
          'Было много снега.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/snəʊ/',
      ttsText: 'snow',
    },
    media: {
      emoji: '❄️',
      imageUrl: '',
      imageAlt: L('눈', 'qor', 'snow', 'снег'),
    },
    tags: ['weather', 'nature'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-person-tourist',
    english: 'tourist',
    senseKey: 'person-visiting-place-for-holiday',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '관광객',
      'sayyoh',
      'a person who visits a place for a holiday',
      'турист',
    ),
    examples: [
      {
        english: 'Many tourists visit the city.',
        translations: L(
          '많은 관광객이 그 도시를 방문해요.',
          'Ko‘p sayyohlar shaharga tashrif buyuradi.',
          'Many tourists visit the city.',
          'Многие туристы посещают город.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈtʊərɪst/',
      ttsText: 'tourist',
    },
    media: {
      emoji: '📸',
      imageUrl: '',
      imageAlt: L(
        '사진을 찍는 관광객',
        'surat olayotgan sayyoh',
        'a tourist',
        'турист',
      ),
    },
    tags: ['travel', 'people'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-traffic',
    english: 'traffic',
    senseKey: 'vehicles-moving-on-roads',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '교통량; 차량',
      'yo‘l harakati',
      'cars, buses and other vehicles using roads',
      'дорожное движение',
    ),
    examples: [
      {
        english: 'There is a lot of traffic in the city.',
        translations: L(
          '도시에 교통량이 많아요.',
          'Shaharda yo‘l harakati ko‘p.',
          'There is a lot of traffic in the city.',
          'В городе много транспорта.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈtræfɪk/',
      ttsText: 'traffic',
    },
    media: {
      emoji: '🚗',
      imageUrl: '',
      imageAlt: L(
        '도로의 많은 차량',
        'yo‘ldagi ko‘p mashinalar',
        'heavy traffic',
        'оживлённое движение',
      ),
    },
    tags: ['city', 'transport'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-person-visitor',
    english: 'visitor',
    senseKey: 'person-visiting-place',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '방문객',
      'tashrif buyuruvchi',
      'a person who visits a place',
      'посетитель',
    ),
    examples: [
      {
        english: 'The city has many visitors in summer.',
        translations: L(
          '그 도시는 여름에 방문객이 많아요.',
          'Yozda shaharga ko‘p tashrif buyuruvchilar keladi.',
          'The city has many visitors in summer.',
          'Летом в городе много посетителей.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈvɪzɪtə/',
      ttsText: 'visitor',
    },
    media: {
      emoji: '🧳',
      imageUrl: '',
      imageAlt: L(
        '여행 중인 방문객',
        'sayohatdagi tashrif buyuruvchi',
        'a visitor',
        'посетитель',
      ),
    },
    tags: ['travel', 'people'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-temperature',
    english: 'temperature',
    senseKey: 'measure-of-how-hot-or-cold',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '온도',
      'harorat',
      'a measure of how hot or cold something is',
      'температура',
    ),
    examples: [
      {
        english: 'The temperature is eighteen degrees.',
        translations: L(
          '온도는 18도예요.',
          'Harorat o‘n sakkiz daraja.',
          'The temperature is eighteen degrees.',
          'Температура — восемнадцать градусов.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈtemprətʃə/',
      ttsText: 'temperature',
    },
    media: {
      emoji: '🌡️',
      imageUrl: '',
      imageAlt: L('온도계', 'termometr', 'temperature', 'температура'),
    },
    tags: ['weather', 'measurement'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-degree',
    english: 'degree',
    senseKey: 'unit-used-for-temperature',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '도; 온도의 단위',
      'daraja',
      'a unit used for measuring temperature',
      'градус',
    ),
    examples: [
      {
        english: 'The temperature is fifteen degrees.',
        translations: L(
          '온도는 15도예요.',
          'Harorat o‘n besh daraja.',
          'The temperature is fifteen degrees.',
          'Температура — пятнадцать градусов.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/dɪˈɡriː/',
      ttsText: 'degree',
    },
    media: {
      emoji: '🌡️',
      imageUrl: '',
      imageAlt: L(
        '온도의 도 단위',
        'harorat darajasi',
        'a temperature degree',
        'градус температуры',
      ),
    },
    tags: ['weather', 'measurement'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-art',
    english: 'art',
    senseKey: 'creative-visual-work-and-study',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '미술; 예술',
      'san’at',
      'creative work such as painting or drawing',
      'искусство',
    ),
    examples: [
      {
        english: 'Art is one of the topics.',
        translations: L(
          '미술은 주제 중 하나예요.',
          'San’at mavzulardan biri.',
          'Art is one of the topics.',
          'Искусство — одна из тем.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɑːt/',
      ttsText: 'art',
    },
    media: {
      emoji: '🎨',
      imageUrl: '',
      imageAlt: L('미술', 'san’at', 'art', 'искусство'),
    },
    tags: ['subjects', 'culture'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-cinema',
    english: 'cinema',
    senseKey: 'films-as-art-or-entertainment',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '영화; 영화 분야',
      'kino',
      'films considered as entertainment or art',
      'кино',
    ),
    examples: [
      {
        english: 'Cinema is one of the topics.',
        translations: L(
          '영화는 주제 중 하나예요.',
          'Kino mavzulardan biri.',
          'Cinema is one of the topics.',
          'Кино — одна из тем.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈsɪnəmə/',
      ttsText: 'cinema',
    },
    media: {
      emoji: '🎬',
      imageUrl: '',
      imageAlt: L('영화', 'kino', 'cinema', 'кино'),
    },
    tags: ['subjects', 'entertainment'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-literature',
    english: 'literature',
    senseKey: 'written-books-and-works',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '문학',
      'adabiyot',
      'books, poems and other written works',
      'литература',
    ),
    examples: [
      {
        english: 'Literature is one of the topics.',
        translations: L(
          '문학은 주제 중 하나예요.',
          'Adabiyot mavzulardan biri.',
          'Literature is one of the topics.',
          'Литература — одна из тем.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈlɪtrətʃə/',
      ttsText: 'literature',
    },
    media: {
      emoji: '📚',
      imageUrl: '',
      imageAlt: L('문학 책', 'adabiyot kitoblari', 'literature', 'литература'),
    },
    tags: ['subjects', 'books'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-science',
    english: 'science',
    senseKey: 'study-of-natural-world',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '과학',
      'fan',
      'the study of the natural and physical world',
      'наука',
    ),
    examples: [
      {
        english: 'Science is one of the topics.',
        translations: L(
          '과학은 주제 중 하나예요.',
          'Fan mavzulardan biri.',
          'Science is one of the topics.',
          'Наука — одна из тем.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈsaɪəns/',
      ttsText: 'science',
    },
    media: {
      emoji: '🔬',
      imageUrl: '',
      imageAlt: L('과학', 'fan', 'science', 'наука'),
    },
    tags: ['subjects', 'study'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-sport',
    english: 'sport',
    senseKey: 'physical-game-or-activity',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '스포츠; 운동',
      'sport',
      'physical activity or games played for competition or enjoyment',
      'спорт',
    ),
    examples: [
      {
        english: 'Sport is one of the topics.',
        translations: L(
          '스포츠는 주제 중 하나예요.',
          'Sport mavzulardan biri.',
          'Sport is one of the topics.',
          'Спорт — одна из тем.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/spɔːt/',
      ttsText: 'sport',
    },
    media: {
      emoji: '⚽',
      imageUrl: '',
      imageAlt: L('스포츠', 'sport', 'sport', 'спорт'),
    },
    tags: ['subjects', 'activities'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-theatre',
    english: 'theatre',
    senseKey: 'plays-and-stage-performance',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '연극; 극장 분야',
      'teatr',
      'plays and performances presented on a stage',
      'театр',
    ),
    examples: [
      {
        english: 'Theatre is one of the topics.',
        translations: L(
          '연극은 주제 중 하나예요.',
          'Teatr mavzulardan biri.',
          'Theatre is one of the topics.',
          'Театр — одна из тем.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈθɪətə/',
      ttsText: 'theatre',
    },
    media: {
      emoji: '🎭',
      imageUrl: '',
      imageAlt: L('연극', 'teatr', 'theatre', 'театр'),
    },
    tags: ['subjects', 'entertainment'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-news',
    english: 'news',
    senseKey: 'information-about-recent-events',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '뉴스; 소식',
      'yangiliklar',
      'information about recent events',
      'новости',
    ),
    examples: [
      {
        english: 'News is one of the topics.',
        translations: L(
          '뉴스는 주제 중 하나예요.',
          'Yangiliklar mavzulardan biri.',
          'News is one of the topics.',
          'Новости — одна из тем.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/njuːz/',
      ttsText: 'news',
    },
    media: {
      emoji: '📰',
      imageUrl: '',
      imageAlt: L('뉴스', 'yangiliklar', 'news', 'новости'),
    },
    tags: ['media', 'information'],
    difficulty: 1,
    isCore: true,
  },
];

export const EN_S1_UNIT9_NODE5_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Places in the video
  // ===========================================================

  en_s1u9_n5_001_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I can see the ocean and the sky.',
    audioText: 'I can see the ocean and the sky.',
    answerTranslation: L(
      '바다와 하늘이 보여요.',
      'Men okean va osmonni ko‘ryapman.',
      'I can see the ocean and the sky.',
      'Я вижу океан и небо.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['video', 'places'],
  },

  en_s1u9_n5_002_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'countryside',
    choices: [
      { text: 'fountain', label: '⛲', emoji: '⛲', imageUrl: '' },
      { text: 'countryside', label: '🌄', emoji: '🌄', imageUrl: '' },
      { text: 'traffic', label: '🚗', emoji: '🚗', imageUrl: '' },
      { text: 'ocean', label: '🌊', emoji: '🌊', imageUrl: '' },
    ],
    answerTranslation: L(
      '전원 지역',
      'qishloq joy',
      'countryside',
      'сельская местность',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['countryside'],
  },

  en_s1u9_n5_003_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'countryside',
        native: 'qishloq joy',
        nativeI18n: L(
          '전원 지역',
          'qishloq joy',
          'countryside',
          'сельская местность',
        ),
      },
      {
        text: 'fountain',
        native: 'favvora',
        nativeI18n: L('분수', 'favvora', 'fountain', 'фонтан'),
      },
      {
        text: 'ocean',
        native: 'okean',
        nativeI18n: L('대양', 'okean', 'ocean', 'океан'),
      },
      {
        text: 'river',
        native: 'daryo',
        nativeI18n: L('강', 'daryo', 'river', 'река'),
      },
      {
        text: 'sky',
        native: 'osmon',
        nativeI18n: L('하늘', 'osmon', 'sky', 'небо'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['video-vocabulary', 'matching'],
  },

  en_s1u9_n5_004_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'fountain',
      'near',
      'river',
      'the',
      'There',
      'a',
      'is',
      'ocean',
      'traffic',
    ],
    answer: 'There is a fountain near the river',
    answerTranslation: L(
      '강 근처에 분수가 있어요.',
      'Daryo yaqinida favvora bor.',
      'There is a fountain near the river.',
      'Рядом с рекой есть фонтан.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['fountain', 'river'],
  },

  en_s1u9_n5_005_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'countryside',
      'snow',
      'There',
      'the',
      'in',
      'is',
      'ocean',
      'traffic',
    ],
    answer: 'There is snow in the countryside',
    audioText: 'There is snow in the countryside.',
    answerTranslation: L(
      '전원 지역에 눈이 있어요.',
      'Qishloq joyda qor bor.',
      'There is snow in the countryside.',
      'В сельской местности есть снег.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['snow', 'countryside'],
  },

  en_s1u9_n5_006_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'countryside',
        native: 'qishloq joy',
        nativeI18n: L(
          '전원 지역',
          'qishloq joy',
          'countryside',
          'сельская местность',
        ),
      },
      {
        text: 'fountain',
        native: 'favvora',
        nativeI18n: L('분수', 'favvora', 'fountain', 'фонтан'),
      },
      {
        text: 'ocean',
        native: 'okean',
        nativeI18n: L('대양', 'okean', 'ocean', 'океан'),
      },
      {
        text: 'river',
        native: 'daryo',
        nativeI18n: L('강', 'daryo', 'river', 'река'),
      },
      {
        text: 'sky',
        native: 'osmon',
        nativeI18n: L('하늘', 'osmon', 'sky', 'небо'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['video-vocabulary', 'listening'],
  },

  en_s1u9_n5_007_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'We could see the ',
    sentenceSuffix: '.',
    answer: 'ocean',
    answerTranslation: L(
      '우리는 바다를 볼 수 있었어요.',
      'Biz okeanni ko‘ra oldik.',
      'We could see the ocean.',
      'Мы могли видеть океан.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "ocean".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'ocean'],
  },

  en_s1u9_n5_008_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'tourist',
    choices: [
      { text: 'traffic', label: '🚗', emoji: '🚗', imageUrl: '' },
      { text: 'boat', label: '🚤', emoji: '🚤', imageUrl: '' },
      { text: 'tourist', label: '📸', emoji: '📸', imageUrl: '' },
      { text: 'fountain', label: '⛲', emoji: '⛲', imageUrl: '' },
    ],
    answerTranslation: L('관광객', 'sayyoh', 'tourist', 'турист'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['tourist'],
  },

  en_s1u9_n5_009_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'There are tourists near the fountain.',
    audioText: 'There are tourists near the fountain.',
    answerI18n: L(
      '분수 근처에 관광객들이 있어요',
      'Favvora yaqinida sayyohlar bor',
      'There are tourists near the fountain',
      'Рядом с фонтаном есть туристы',
    ),
    options: ['There', 'are', 'tourists', 'near', 'the', 'fountain', 'traffic'],
    optionsI18n: {
      ko: ['분수', '근처에', '관광객들이', '있어요'],
      uz: ['Favvora', 'yaqinida', 'sayyohlar', 'bor'],
      en: ['There', 'are', 'tourists', 'near', 'the', 'fountain'],
      ru: ['Рядом', 'с', 'фонтаном', 'есть', 'туристы'],
    },
    answerTranslation: L(
      '분수 근처에 관광객들이 있어요.',
      'Favvora yaqinida sayyohlar bor.',
      'There are tourists near the fountain.',
      'Рядом с фонтаном есть туристы.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['tourist', 'fountain'],
  },

  en_s1u9_n5_010_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What can you see?',
    options: ['I', 'can', 'see', 'a', 'river', 'and', 'a', 'boat', 'traffic'],
    answer: 'I can see a river and a boat',
    answerTranslation: L(
      '강과 배가 보여요.',
      'Men daryo va qayiqni ko‘ryapman.',
      'I can see a river and a boat.',
      'Я вижу реку и лодку.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['river', 'boat', 'reply'],
  },

  en_s1u9_n5_011_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'There is a ',
    sentenceSuffix: ' near the city.',
    answer: 'river',
    answerTranslation: L(
      '도시 근처에 강이 있어요.',
      'Shahar yaqinida daryo bor.',
      'There is a river near the city.',
      'Рядом с городом есть река.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "river".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'river'],
  },

  en_s1u9_n5_012_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'sailing',
        native: 'yelkanli qayiqda suzish',
        nativeI18n: L(
          '요트 타기',
          'yelkanli qayiqda suzish',
          'sailing',
          'парусный спорт',
        ),
      },
      {
        text: 'boat',
        native: 'qayiq',
        nativeI18n: L('배', 'qayiq', 'boat', 'лодка'),
      },
      {
        text: 'snow',
        native: 'qor',
        nativeI18n: L('눈', 'qor', 'snow', 'снег'),
      },
      {
        text: 'tourist',
        native: 'sayyoh',
        nativeI18n: L('관광객', 'sayyoh', 'tourist', 'турист'),
      },
      {
        text: 'traffic',
        native: 'yo‘l harakati',
        nativeI18n: L(
          '교통량',
          'yo‘l harakati',
          'traffic',
          'дорожное движение',
        ),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['video-vocabulary', 'matching'],
  },

  en_s1u9_n5_013_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'traffic',
      'city',
      'lot',
      'There',
      'of',
      'a',
      'is',
      'the',
      'river',
    ],
    answer: 'There is a lot of traffic in the city',
    answerTranslation: L(
      '도시에 교통량이 많아요.',
      'Shaharda yo‘l harakati ko‘p.',
      'There is a lot of traffic in the city.',
      'В городе много транспорта.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['traffic', 'city'],
  },

  en_s1u9_n5_014_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'sailing',
        native: 'yelkanli qayiqda suzish',
        nativeI18n: L(
          '요트 타기',
          'yelkanli qayiqda suzish',
          'sailing',
          'парусный спорт',
        ),
      },
      {
        text: 'boat',
        native: 'qayiq',
        nativeI18n: L('배', 'qayiq', 'boat', 'лодка'),
      },
      {
        text: 'snow',
        native: 'qor',
        nativeI18n: L('눈', 'qor', 'snow', 'снег'),
      },
      {
        text: 'tourist',
        native: 'sayyoh',
        nativeI18n: L('관광객', 'sayyoh', 'tourist', 'турист'),
      },
      {
        text: 'traffic',
        native: 'yo‘l harakati',
        nativeI18n: L(
          '교통량',
          'yo‘l harakati',
          'traffic',
          'дорожное движение',
        ),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['video-vocabulary', 'listening'],
  },

  en_s1u9_n5_015_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'boat',
    choices: [
      { text: 'fountain', label: '⛲', emoji: '⛲', imageUrl: '' },
      { text: 'ocean', label: '🌊', emoji: '🌊', imageUrl: '' },
      { text: 'boat', label: '🚤', emoji: '🚤', imageUrl: '' },
      { text: 'traffic', label: '🚗', emoji: '🚗', imageUrl: '' },
    ],
    answerTranslation: L('배', 'qayiq', 'boat', 'лодка'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['boat'],
  },

  en_s1u9_n5_016_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The ___ is blue.',
    blankAnswers: ['sky'],
    options: ['sky', 'river', 'traffic', 'tourist'],
    answer: 'sky',
    answerTranslation: L(
      '하늘이 파래요.',
      'Osmon ko‘k.',
      'The sky is blue.',
      'Небо голубое.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['sky'],
  },

  en_s1u9_n5_017_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'There is a lot of ',
    sentenceSuffix: ' in the city.',
    answer: 'traffic',
    answerTranslation: L(
      '도시에 교통량이 많아요.',
      'Shaharda yo‘l harakati ko‘p.',
      'There is a lot of traffic in the city.',
      'В городе много транспорта.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "traffic".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'traffic'],
  },

  en_s1u9_n5_018_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'ocean',
      'boat',
      'the',
      'on',
      'is',
      'sailing',
      'A',
      'river',
      'traffic',
    ],
    answer: 'A sailing boat is on the ocean',
    audioText: 'A sailing boat is on the ocean.',
    answerTranslation: L(
      '범선이 바다 위에 있어요.',
      'Yelkanli qayiq okeanda.',
      'A sailing boat is on the ocean.',
      'Парусная лодка находится в океане.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['sailing', 'boat', 'ocean'],
  },

  en_s1u9_n5_019_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What do we call people who visit places on holiday?',
    options: ['We', 'call', 'them', 'tourists', 'traffic', 'visitors', 'boats'],
    answer: 'We call them tourists',
    answerTranslation: L(
      '그들을 관광객이라고 해요.',
      'Biz ularni sayyohlar deb ataymiz.',
      'We call them tourists.',
      'Мы называем их туристами.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['tourist', 'reply'],
  },

  en_s1u9_n5_020_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Which city is in France?' }],
    options: [
      'Paris is in France.',
      'Seattle is in France.',
      'Auckland is in France.',
      'Stroud is in France.',
    ],
    answer: 'Paris is in France.',
    answerTranslation: L(
      '파리는 프랑스에 있어요.',
      'Parij Fransiyada.',
      'Paris is in France.',
      'Париж находится во Франции.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['places', 'video'],
  },

  // ===========================================================
  // Lesson 2 · Weather around the world
  // ===========================================================

  en_s1u9_n5_021_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'It often rains in winter, but it is not very cold.',
    audioText: 'It often rains in winter, but it is not very cold.',
    answerTranslation: L(
      '겨울에 비가 자주 오지만 아주 춥지는 않아요.',
      'Qishda tez-tez yomg‘ir yog‘adi, lekin juda sovuq emas.',
      'It often rains in winter, but it is not very cold.',
      'Зимой часто идёт дождь, но не очень холодно.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['weather', 'winter'],
  },

  en_s1u9_n5_022_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'snow',
    choices: [
      { text: 'traffic', label: '🚗', emoji: '🚗', imageUrl: '' },
      { text: 'snow', label: '❄️', emoji: '❄️', imageUrl: '' },
      { text: 'visitor', label: '🧳', emoji: '🧳', imageUrl: '' },
      { text: 'temperature', label: '🌡️', emoji: '🌡️', imageUrl: '' },
    ],
    answerTranslation: L('눈', 'qor', 'snow', 'снег'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['snow'],
  },

  en_s1u9_n5_023_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'tourist',
        native: 'sayyoh',
        nativeI18n: L('관광객', 'sayyoh', 'tourist', 'турист'),
      },
      {
        text: 'visitor',
        native: 'tashrif buyuruvchi',
        nativeI18n: L('방문객', 'tashrif buyuruvchi', 'visitor', 'посетитель'),
      },
      {
        text: 'temperature',
        native: 'harorat',
        nativeI18n: L('온도', 'harorat', 'temperature', 'температура'),
      },
      {
        text: 'degree',
        native: 'daraja',
        nativeI18n: L('도', 'daraja', 'degree', 'градус'),
      },
      {
        text: 'snow',
        native: 'qor',
        nativeI18n: L('눈', 'qor', 'snow', 'снег'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['weather', 'matching'],
  },

  en_s1u9_n5_024_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'autumn',
      'cold',
      'wet',
      'It',
      'in',
      'is',
      'and',
      'spring',
      'warm',
    ],
    answer: 'It is cold and wet in autumn',
    answerTranslation: L(
      '가을에는 춥고 습해요.',
      'Kuzda havo sovuq va nam.',
      'It is cold and wet in autumn.',
      'Осенью холодно и сыро.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['autumn', 'weather'],
  },

  en_s1u9_n5_025_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'spring',
      'warm',
      'sunny',
      'It',
      'and',
      'is',
      'it',
      'is',
      'winter',
    ],
    answer: 'It is spring and it is warm and sunny',
    audioText: 'It is spring and it is warm and sunny.',
    answerTranslation: L(
      '봄이고 날씨가 따뜻하고 맑아요.',
      'Bahor va havo iliq hamda quyoshli.',
      'It is spring and it is warm and sunny.',
      'Сейчас весна, тепло и солнечно.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['spring', 'weather'],
  },

  en_s1u9_n5_026_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'tourist',
        native: 'sayyoh',
        nativeI18n: L('관광객', 'sayyoh', 'tourist', 'турист'),
      },
      {
        text: 'visitor',
        native: 'tashrif buyuruvchi',
        nativeI18n: L('방문객', 'tashrif buyuruvchi', 'visitor', 'посетитель'),
      },
      {
        text: 'temperature',
        native: 'harorat',
        nativeI18n: L('온도', 'harorat', 'temperature', 'температура'),
      },
      {
        text: 'degree',
        native: 'daraja',
        nativeI18n: L('도', 'daraja', 'degree', 'градус'),
      },
      {
        text: 'snow',
        native: 'qor',
        nativeI18n: L('눈', 'qor', 'snow', 'снег'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['weather', 'listening'],
  },

  en_s1u9_n5_027_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'The ',
    sentenceSuffix: ' is eighteen degrees.',
    answer: 'temperature',
    answerTranslation: L(
      '온도는 18도예요.',
      'Harorat o‘n sakkiz daraja.',
      'The temperature is eighteen degrees.',
      'Температура — восемнадцать градусов.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "temperature".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'temperature'],
  },

  en_s1u9_n5_028_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'visitor',
    choices: [
      { text: 'visitor', label: '🧳', emoji: '🧳', imageUrl: '' },
      { text: 'traffic', label: '🚗', emoji: '🚗', imageUrl: '' },
      { text: 'snow', label: '❄️', emoji: '❄️', imageUrl: '' },
      { text: 'degree', label: '°', emoji: '🌡️', imageUrl: '' },
    ],
    answerTranslation: L(
      '방문객',
      'tashrif buyuruvchi',
      'visitor',
      'посетитель',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['visitor'],
  },

  en_s1u9_n5_029_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'It is hot and very sunny.',
    audioText: 'It is hot and very sunny.',
    answerI18n: L(
      '날씨가 덥고 아주 맑아요',
      'Havo issiq va juda quyoshli',
      'It is hot and very sunny',
      'Жарко и очень солнечно',
    ),
    options: ['It', 'is', 'hot', 'and', 'very', 'sunny', 'snowy'],
    optionsI18n: {
      ko: ['날씨가', '덥고', '아주', '맑아요'],
      uz: ['Havo', 'issiq', 'va', 'juda', 'quyoshli'],
      en: ['It', 'is', 'hot', 'and', 'very', 'sunny'],
      ru: ['Жарко', 'и', 'очень', 'солнечно'],
    },
    answerTranslation: L(
      '날씨가 덥고 아주 맑아요.',
      'Havo issiq va juda quyoshli.',
      'It is hot and very sunny.',
      'Жарко и очень солнечно.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['weather', 'sunny'],
  },

  en_s1u9_n5_030_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What’s the weather like?',
    options: ['It', 'is', 'cold', 'and', 'wet', 'degree', 'tourists'],
    answer: 'It is cold and wet',
    answerTranslation: L(
      '춥고 습해요.',
      'Havo sovuq va nam.',
      'It is cold and wet.',
      'Холодно и сыро.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['weather', 'reply'],
  },

  en_s1u9_n5_031_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'The temperature is fifteen ',
    sentenceSuffix: '.',
    answer: 'degrees',
    answerTranslation: L(
      '온도는 15도예요.',
      'Harorat o‘n besh daraja.',
      'The temperature is fifteen degrees.',
      'Температура — пятнадцать градусов.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is the plural "degrees".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'degree'],
  },

  en_s1u9_n5_032_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'spring',
        native: 'bahor',
        nativeI18n: L('봄', 'bahor', 'spring', 'весна'),
      },
      {
        text: 'summer',
        native: 'yoz',
        nativeI18n: L('여름', 'yoz', 'summer', 'лето'),
      },
      {
        text: 'autumn',
        native: 'kuz',
        nativeI18n: L('가을', 'kuz', 'autumn', 'осень'),
      },
      {
        text: 'winter',
        native: 'qish',
        nativeI18n: L('겨울', 'qish', 'winter', 'зима'),
      },
      {
        text: 'visitor',
        native: 'tashrif buyuruvchi',
        nativeI18n: L('방문객', 'tashrif buyuruvchi', 'visitor', 'посетитель'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['weather', 'matching'],
  },

  en_s1u9_n5_033_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'winter',
      'many',
      'tourists',
      'There',
      'not',
      'are',
      'in',
      'snow',
      'visitors',
    ],
    answer: 'There are not many tourists in winter',
    answerTranslation: L(
      '겨울에는 관광객이 많지 않아요.',
      'Qishda sayyohlar ko‘p emas.',
      'There are not many tourists in winter.',
      'Зимой туристов немного.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['tourist', 'winter'],
  },

  en_s1u9_n5_034_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'tourist',
        native: 'sayyoh',
        nativeI18n: L('관광객', 'sayyoh', 'tourist', 'турист'),
      },
      {
        text: 'visitor',
        native: 'tashrif buyuruvchi',
        nativeI18n: L('방문객', 'tashrif buyuruvchi', 'visitor', 'посетитель'),
      },
      {
        text: 'snow',
        native: 'qor',
        nativeI18n: L('눈', 'qor', 'snow', 'снег'),
      },
      {
        text: 'temperature',
        native: 'harorat',
        nativeI18n: L('온도', 'harorat', 'temperature', 'температура'),
      },
      {
        text: 'degree',
        native: 'daraja',
        nativeI18n: L('도', 'daraja', 'degree', 'градус'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['weather', 'listening'],
  },

  en_s1u9_n5_035_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'tourist',
    choices: [
      { text: 'snow', label: '❄️', emoji: '❄️', imageUrl: '' },
      { text: 'temperature', label: '🌡️', emoji: '🌡️', imageUrl: '' },
      { text: 'tourist', label: '📸', emoji: '📸', imageUrl: '' },
      { text: 'traffic', label: '🚗', emoji: '🚗', imageUrl: '' },
    ],
    answerTranslation: L('관광객', 'sayyoh', 'tourist', 'турист'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['tourist'],
  },

  en_s1u9_n5_036_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'In winter, there is a lot of ___.',
    blankAnswers: ['snow'],
    options: ['snow', 'traffic', 'temperature', 'tourist'],
    answer: 'snow',
    answerTranslation: L(
      '겨울에는 눈이 많이 와요.',
      'Qishda qor ko‘p bo‘ladi.',
      'In winter, there is a lot of snow.',
      'Зимой бывает много снега.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['snow', 'winter'],
  },

  en_s1u9_n5_037_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'There was a lot of ',
    sentenceSuffix: '.',
    answer: 'snow',
    answerTranslation: L(
      '눈이 많이 왔어요.',
      'Qor juda ko‘p edi.',
      'There was a lot of snow.',
      'Было много снега.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "snow".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'snow'],
  },

  en_s1u9_n5_038_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'spring',
      'weather',
      'warm',
      'sunny',
      'The',
      'is',
      'and',
      'in',
      'winter',
    ],
    answer: 'The weather is warm and sunny in spring',
    audioText: 'The weather is warm and sunny in spring.',
    answerTranslation: L(
      '봄에는 날씨가 따뜻하고 맑아요.',
      'Bahorda havo iliq va quyoshli.',
      'The weather is warm and sunny in spring.',
      'Весной тепло и солнечно.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['spring', 'weather'],
  },

  en_s1u9_n5_039_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Which place is in New Zealand?',
    options: [
      'Auckland',
      'is',
      'in',
      'New',
      'Zealand',
      'Paris',
      'Seattle',
      'Stroud',
    ],
    answer: 'Auckland is in New Zealand',
    answerTranslation: L(
      '오클랜드는 뉴질랜드에 있어요.',
      'Auckland Yangi Zelandiyada.',
      'Auckland is in New Zealand.',
      'Окленд находится в Новой Зеландии.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['places', 'reply'],
  },

  en_s1u9_n5_040_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Which place is in the USA?' }],
    options: [
      'Seattle is in the USA.',
      'Paris is in the USA.',
      'Auckland is in the USA.',
      'Stroud is in the USA.',
    ],
    answer: 'Seattle is in the USA.',
    answerTranslation: L(
      '시애틀은 미국에 있어요.',
      'Seattle AQShda.',
      'Seattle is in the USA.',
      'Сиэтл находится в США.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['places', 'video'],
  },

  // ===========================================================
  // Lesson 3 · Kim Peek and amazing memory
  // ===========================================================

  en_s1u9_n5_041_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Kim Peek had an amazing memory.',
    audioText: 'Kim Peek had an amazing memory.',
    answerTranslation: L(
      '킴 픽은 놀라운 기억력을 가지고 있었어요.',
      'Kim Peekning xotirasi ajoyib edi.',
      'Kim Peek had an amazing memory.',
      'У Кима Пика была удивительная память.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['kim-peek', 'memory'],
  },

  en_s1u9_n5_042_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'cinema',
    choices: [
      { text: 'art', label: '🎨', emoji: '🎨', imageUrl: '' },
      { text: 'cinema', label: '🎬', emoji: '🎬', imageUrl: '' },
      { text: 'science', label: '🔬', emoji: '🔬', imageUrl: '' },
      { text: 'sport', label: '⚽', emoji: '⚽', imageUrl: '' },
    ],
    answerTranslation: L('영화', 'kino', 'cinema', 'кино'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['cinema'],
  },

  en_s1u9_n5_043_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'art',
        native: 'san’at',
        nativeI18n: L('미술', 'san’at', 'art', 'искусство'),
      },
      {
        text: 'cinema',
        native: 'kino',
        nativeI18n: L('영화', 'kino', 'cinema', 'кино'),
      },
      {
        text: 'literature',
        native: 'adabiyot',
        nativeI18n: L('문학', 'adabiyot', 'literature', 'литература'),
      },
      {
        text: 'science',
        native: 'fan',
        nativeI18n: L('과학', 'fan', 'science', 'наука'),
      },
      {
        text: 'sport',
        native: 'sport',
        nativeI18n: L('스포츠', 'sport', 'sport', 'спорт'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['topics', 'matching'],
  },

  en_s1u9_n5_044_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'memory',
      'amazing',
      'had',
      'Kim',
      'Peek',
      'an',
      'news',
      'science',
    ],
    answer: 'Kim Peek had an amazing memory',
    answerTranslation: L(
      '킴 픽은 놀라운 기억력을 가지고 있었어요.',
      'Kim Peekning xotirasi ajoyib edi.',
      'Kim Peek had an amazing memory.',
      'У Кима Пика была удивительная память.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['kim-peek', 'memory'],
  },

  en_s1u9_n5_045_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['remember', 'could', 'What', 'Peek', 'Kim', 'memory', 'did'],
    answer: 'What could Kim Peek remember',
    audioText: 'What could Kim Peek remember?',
    answerTranslation: L(
      '킴 픽은 무엇을 기억할 수 있었어요?',
      'Kim Peek nimani eslay olardi?',
      'What could Kim Peek remember?',
      'Что мог помнить Ким Пик?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['kim-peek', 'could'],
  },

  en_s1u9_n5_046_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'news',
        native: 'yangiliklar',
        nativeI18n: L('뉴스', 'yangiliklar', 'news', 'новости'),
      },
      {
        text: 'theatre',
        native: 'teatr',
        nativeI18n: L('연극', 'teatr', 'theatre', 'театр'),
      },
      {
        text: 'art',
        native: 'san’at',
        nativeI18n: L('미술', 'san’at', 'art', 'искусство'),
      },
      {
        text: 'music',
        native: 'musiqa',
        nativeI18n: L('음악', 'musiqa', 'music', 'музыка'),
      },
      {
        text: 'sport',
        native: 'sport',
        nativeI18n: L('스포츠', 'sport', 'sport', 'спорт'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['topics', 'listening'],
  },

  en_s1u9_n5_047_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Kim Peek had an amazing ',
    sentenceSuffix: '.',
    answer: 'memory',
    answerTranslation: L(
      '킴 픽은 놀라운 기억력을 가지고 있었어요.',
      'Kim Peekning xotirasi ajoyib edi.',
      'Kim Peek had an amazing memory.',
      'У Кима Пика была удивительная память.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "memory".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'memory'],
  },

  en_s1u9_n5_048_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'science',
    choices: [
      { text: 'sport', label: '⚽', emoji: '⚽', imageUrl: '' },
      { text: 'cinema', label: '🎬', emoji: '🎬', imageUrl: '' },
      { text: 'science', label: '🔬', emoji: '🔬', imageUrl: '' },
      { text: 'art', label: '🎨', emoji: '🎨', imageUrl: '' },
    ],
    answerTranslation: L('과학', 'fan', 'science', 'наука'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['science'],
  },

  en_s1u9_n5_049_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'When was Albert Einstein born?',
    audioText: 'When was Albert Einstein born?',
    answerI18n: L(
      '알베르트 아인슈타인은 언제 태어났어요',
      'Albert Einstein qachon tug‘ilgan',
      'When was Albert Einstein born',
      'Когда родился Альберт Эйнштейн',
    ),
    options: ['When', 'was', 'Albert', 'Einstein', 'born', 'did', 'where'],
    optionsI18n: {
      ko: ['알베르트', '아인슈타인은', '언제', '태어났어요'],
      uz: ['Albert', 'Einstein', 'qachon', 'tug‘ilgan'],
      en: ['When', 'was', 'Albert', 'Einstein', 'born'],
      ru: ['Когда', 'родился', 'Альберт', 'Эйнштейн'],
    },
    answerTranslation: L(
      '알베르트 아인슈타인은 언제 태어났어요?',
      'Albert Einstein qachon tug‘ilgan?',
      'When was Albert Einstein born?',
      'Когда родился Альберт Эйнштейн?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['questions', 'science'],
  },

  en_s1u9_n5_050_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What was special about Kim Peek?',
    options: ['He', 'had', 'an', 'amazing', 'memory', 'weather', 'tourist'],
    answer: 'He had an amazing memory',
    answerTranslation: L(
      '그는 놀라운 기억력을 가지고 있었어요.',
      'Uning xotirasi ajoyib edi.',
      'He had an amazing memory.',
      'У него была удивительная память.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['kim-peek', 'reply'],
  },

  en_s1u9_n5_051_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: '',
    sentenceSuffix: ' is one of the topics about books and written works.',
    answer: 'Literature',
    answerTranslation: L(
      '문학은 책과 글에 관한 주제 중 하나예요.',
      'Adabiyot kitoblar va yozma asarlar haqidagi mavzulardan biri.',
      'Literature is one of the topics about books and written works.',
      'Литература — одна из тем о книгах и письменных произведениях.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "Literature".',
      acceptedAnswers: ['literature'],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'literature'],
  },

  en_s1u9_n5_052_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'news',
        native: 'yangiliklar',
        nativeI18n: L('뉴스', 'yangiliklar', 'news', 'новости'),
      },
      {
        text: 'theatre',
        native: 'teatr',
        nativeI18n: L('연극', 'teatr', 'theatre', 'театр'),
      },
      {
        text: 'cinema',
        native: 'kino',
        nativeI18n: L('영화', 'kino', 'cinema', 'кино'),
      },
      {
        text: 'science',
        native: 'fan',
        nativeI18n: L('과학', 'fan', 'science', 'наука'),
      },
      {
        text: 'art',
        native: 'san’at',
        nativeI18n: L('미술', 'san’at', 'art', 'искусство'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['topics', 'matching'],
  },

  en_s1u9_n5_053_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'countries',
      '1962',
      'the',
      'World',
      'Cup',
      'final',
      'played',
      'Which',
      'in',
      'of',
      'Football',
    ],
    answer:
      'Which countries played in the final of the 1962 Football World Cup',
    answerTranslation: L(
      '1962년 축구 월드컵 결승전에서는 어떤 나라들이 경기했어요?',
      '1962-yilgi futbol bo‘yicha jahon chempionati finalida qaysi davlatlar o‘ynagan?',
      'Which countries played in the final of the 1962 Football World Cup?',
      'Какие страны играли в финале чемпионата мира по футболу 1962 года?',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['questions', 'sport'],
  },

  en_s1u9_n5_054_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'art',
        native: 'san’at',
        nativeI18n: L('미술', 'san’at', 'art', 'искусство'),
      },
      {
        text: 'cinema',
        native: 'kino',
        nativeI18n: L('영화', 'kino', 'cinema', 'кино'),
      },
      {
        text: 'literature',
        native: 'adabiyot',
        nativeI18n: L('문학', 'adabiyot', 'literature', 'литература'),
      },
      {
        text: 'science',
        native: 'fan',
        nativeI18n: L('과학', 'fan', 'science', 'наука'),
      },
      {
        text: 'sport',
        native: 'sport',
        nativeI18n: L('스포츠', 'sport', 'sport', 'спорт'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['topics', 'listening'],
  },

  en_s1u9_n5_055_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'theatre',
    choices: [
      { text: 'art', label: '🎨', emoji: '🎨', imageUrl: '' },
      { text: 'cinema', label: '🎬', emoji: '🎬', imageUrl: '' },
      { text: 'theatre', label: '🎭', emoji: '🎭', imageUrl: '' },
      { text: 'news', label: '📰', emoji: '📰', imageUrl: '' },
    ],
    answerTranslation: L('연극', 'teatr', 'theatre', 'театр'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['theatre'],
  },

  en_s1u9_n5_056_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Kim Peek had an amazing ___.',
    blankAnswers: ['memory'],
    options: ['memory', 'weather', 'traffic', 'temperature'],
    answer: 'memory',
    answerTranslation: L(
      '킴 픽은 놀라운 기억력을 가지고 있었어요.',
      'Kim Peekning xotirasi ajoyib edi.',
      'Kim Peek had an amazing memory.',
      'У Кима Пика была удивительная память.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['memory'],
  },

  en_s1u9_n5_057_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: '',
    sentenceSuffix: ' is a topic about recent events.',
    answer: 'News',
    answerTranslation: L(
      '뉴스는 최근 사건에 관한 주제예요.',
      'Yangiliklar yaqindagi voqealar haqidagi mavzu.',
      'News is a topic about recent events.',
      'Новости — это тема о недавних событиях.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "News".',
      acceptedAnswers: ['news'],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'news'],
  },

  en_s1u9_n5_058_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'World',
      'countries',
      '1962',
      'final',
      'played',
      'Which',
      'the',
      'in',
      'Football',
      'Cup',
      'of',
    ],
    answer:
      'Which countries played in the final of the 1962 Football World Cup',
    audioText:
      'Which countries played in the final of the 1962 Football World Cup?',
    answerTranslation: L(
      '1962년 축구 월드컵 결승전에서는 어떤 나라들이 경기했어요?',
      '1962-yilgi futbol bo‘yicha jahon chempionati finalida qaysi davlatlar o‘ynagan?',
      'Which countries played in the final of the 1962 Football World Cup?',
      'Какие страны играли в финале чемпионата мира по футболу 1962 года?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['questions', 'sport'],
  },

  en_s1u9_n5_059_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What kind of programme was it?',
    options: ['It', 'was', 'a', 'radio', 'programme', 'science', 'weather'],
    answer: 'It was a radio programme',
    answerTranslation: L(
      '라디오 프로그램이었어요.',
      'Bu radio dasturi edi.',
      'It was a radio programme.',
      'Это была радиопрограмма.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['kim-peek', 'reply'],
  },

  en_s1u9_n5_060_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Who was the radio programme about?' },
    ],
    options: [
      'It was about Kim Peek.',
      'It was about the weather in Seattle.',
      'It was about a restaurant waiter.',
      'It was about a music festival.',
    ],
    answer: 'It was about Kim Peek.',
    answerTranslation: L(
      '킴 픽에 관한 프로그램이었어요.',
      'Bu Kim Peek haqida edi.',
      'It was about Kim Peek.',
      'Она была о Киме Пике.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['kim-peek', 'dialog'],
  },

  // ===========================================================
  // Lesson 4 · Unit 9 final review
  // ===========================================================

  en_s1u9_n5_061_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I was ill yesterday.',
    audioText: 'I was ill yesterday.',
    answerTranslation: L(
      '저는 어제 아팠어요.',
      'Men kecha kasal edim.',
      'I was ill yesterday.',
      'Я вчера болел.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit9-review', 'past-be'],
  },

  en_s1u9_n5_062_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'snow',
    choices: [
      { text: 'traffic', label: '🚗', emoji: '🚗', imageUrl: '' },
      { text: 'snow', label: '❄️', emoji: '❄️', imageUrl: '' },
      { text: 'festival', label: '🎪', emoji: '🎪', imageUrl: '' },
      { text: 'memory', label: '🧠', emoji: '🧠', imageUrl: '' },
    ],
    answerTranslation: L('눈', 'qor', 'snow', 'снег'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit9-review', 'snow'],
  },

  en_s1u9_n5_063_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'memory',
        native: 'xotira',
        nativeI18n: L('기억', 'xotira', 'memory', 'воспоминание'),
      },
      {
        text: 'excuse',
        native: 'bahona',
        nativeI18n: L('핑계', 'bahona', 'excuse', 'оправдание'),
      },
      {
        text: 'tip',
        native: 'choychaqa',
        nativeI18n: L('팁', 'choychaqa', 'tip', 'чаевые'),
      },
      {
        text: 'weather',
        native: 'ob-havo',
        nativeI18n: L('날씨', 'ob-havo', 'weather', 'погода'),
      },
      {
        text: 'festival',
        native: 'festival',
        nativeI18n: L('축제', 'festival', 'festival', 'фестиваль'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit9-review', 'matching'],
  },

  en_s1u9_n5_064_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['work', 'you', 'at', 'I', 'didn’t', 'see', 'saw', 'yesterday'],
    answer: 'I didn’t see you at work',
    answerTranslation: L(
      '직장에서 당신을 보지 못했어요.',
      'Men sizni ishda ko‘rmadim.',
      'I didn’t see you at work.',
      'Я не видел вас на работе.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit9-review', 'didnt'],
  },

  en_s1u9_n5_065_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['bus', 'today', 'get', 'Why', 'the', 'you', 'did', 'got', 'car'],
    answer: 'Why did you get the bus today',
    audioText: 'Why did you get the bus today?',
    answerTranslation: L(
      '오늘 왜 버스를 탔어요?',
      'Bugun nega avtobusga chiqdingiz?',
      'Why did you get the bus today?',
      'Почему вы сегодня поехали на автобусе?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['unit9-review', 'did-question'],
  },

  en_s1u9_n5_066_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'memory',
        native: 'xotira',
        nativeI18n: L('기억', 'xotira', 'memory', 'воспоминание'),
      },
      {
        text: 'excuse',
        native: 'bahona',
        nativeI18n: L('핑계', 'bahona', 'excuse', 'оправдание'),
      },
      {
        text: 'tip',
        native: 'choychaqa',
        nativeI18n: L('팁', 'choychaqa', 'tip', 'чаевые'),
      },
      {
        text: 'weather',
        native: 'ob-havo',
        nativeI18n: L('날씨', 'ob-havo', 'weather', 'погода'),
      },
      {
        text: 'festival',
        native: 'festival',
        nativeI18n: L('축제', 'festival', 'festival', 'фестиваль'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['unit9-review', 'listening'],
  },

  en_s1u9_n5_067_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I didn’t ',
    sentenceSuffix: ' you at work.',
    answer: 'see',
    answerTranslation: L(
      '직장에서 당신을 보지 못했어요.',
      'Men sizni ishda ko‘rmadim.',
      'I didn’t see you at work.',
      'Я не видел вас на работе.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'After "didn’t", use the base verb "see".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'didnt', 'base-verb'],
  },

  en_s1u9_n5_068_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'excuse',
    choices: [
      { text: 'memory', label: '🧠', emoji: '🧠', imageUrl: '' },
      { text: 'tip', label: '💵', emoji: '💵', imageUrl: '' },
      { text: 'excuse', label: '🤷', emoji: '🤷', imageUrl: '' },
      { text: 'festival', label: '🎪', emoji: '🎪', imageUrl: '' },
    ],
    answerTranslation: L('핑계', 'bahona', 'excuse', 'оправдание'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit9-review', 'excuse'],
  },

  en_s1u9_n5_069_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'We were in Spain last week.',
    audioText: 'We were in Spain last week.',
    answerI18n: L(
      '우리는 지난주에 스페인에 있었어요',
      'Biz o‘tgan hafta Ispaniyada edik',
      'We were in Spain last week',
      'На прошлой неделе мы были в Испании',
    ),
    options: ['We', 'were', 'in', 'Spain', 'last', 'week', 'are'],
    optionsI18n: {
      ko: ['우리는', '지난주에', '스페인에', '있었어요'],
      uz: ['Biz', 'o‘tgan', 'hafta', 'Ispaniyada', 'edik'],
      en: ['We', 'were', 'in', 'Spain', 'last', 'week'],
      ru: ['На', 'прошлой', 'неделе', 'мы', 'были', 'в', 'Испании'],
    },
    answerTranslation: L(
      '우리는 지난주에 스페인에 있었어요.',
      'Biz o‘tgan hafta Ispaniyada edik.',
      'We were in Spain last week.',
      'На прошлой неделе мы были в Испании.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['unit9-review', 'were'],
  },

  en_s1u9_n5_070_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Did you have a good time?',
    options: ['Yes', 'it', 'was', 'amazing', 'did', 'weather', 'ago'],
    answer: 'Yes it was amazing',
    answerTranslation: L(
      '네, 정말 좋았어요.',
      'Ha, juda ajoyib edi.',
      'Yes, it was amazing.',
      'Да, было потрясающе.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['unit9-review', 'reply'],
  },

  en_s1u9_n5_071_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I ',
    sentenceSuffix: ' my car keys.',
    answer: 'lost',
    answerTranslation: L(
      '저는 자동차 열쇠를 잃어버렸어요.',
      'Men mashina kalitlarimni yo‘qotdim.',
      'I lost my car keys.',
      'Я потерял ключи от машины.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is the past form "lost".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'lost'],
  },

  en_s1u9_n5_072_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'headache',
        native: 'bosh og‘rig‘i',
        nativeI18n: L('두통', 'bosh og‘rig‘i', 'headache', 'головная боль'),
      },
      {
        text: 'homeless',
        native: 'uysiz',
        nativeI18n: L('집이 없는', 'uysiz', 'homeless', 'бездомный'),
      },
      {
        text: 'atmosphere',
        native: 'muhit',
        nativeI18n: L('분위기', 'muhit', 'atmosphere', 'атмосфера'),
      },
      {
        text: 'tourist',
        native: 'sayyoh',
        nativeI18n: L('관광객', 'sayyoh', 'tourist', 'турист'),
      },
      {
        text: 'temperature',
        native: 'harorat',
        nativeI18n: L('온도', 'harorat', 'temperature', 'температура'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit9-review', 'matching'],
  },

  en_s1u9_n5_073_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['night', 'do', 'What', 'did', 'you', 'last', 'did', 'ago'],
    answer: 'What did you do last night',
    answerTranslation: L(
      '어젯밤에 뭐 했어요?',
      'Kecha kechqurun nima qildingiz?',
      'What did you do last night?',
      'Что вы делали вчера вечером?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit9-review', 'wh-question'],
  },

  en_s1u9_n5_074_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'headache',
        native: 'bosh og‘rig‘i',
        nativeI18n: L('두통', 'bosh og‘rig‘i', 'headache', 'головная боль'),
      },
      {
        text: 'homeless',
        native: 'uysiz',
        nativeI18n: L('집이 없는', 'uysiz', 'homeless', 'бездомный'),
      },
      {
        text: 'atmosphere',
        native: 'muhit',
        nativeI18n: L('분위기', 'muhit', 'atmosphere', 'атмосфера'),
      },
      {
        text: 'tourist',
        native: 'sayyoh',
        nativeI18n: L('관광객', 'sayyoh', 'tourist', 'турист'),
      },
      {
        text: 'temperature',
        native: 'harorat',
        nativeI18n: L('온도', 'harorat', 'temperature', 'температура'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['unit9-review', 'listening'],
  },

  en_s1u9_n5_075_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'weather',
    choices: [
      { text: 'memory', label: '🧠', emoji: '🧠', imageUrl: '' },
      { text: 'festival', label: '🎪', emoji: '🎪', imageUrl: '' },
      { text: 'weather', label: '🌤️', emoji: '🌤️', imageUrl: '' },
      { text: 'tip', label: '💵', emoji: '💵', imageUrl: '' },
    ],
    answerTranslation: L('날씨', 'ob-havo', 'weather', 'погода'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit9-review', 'weather'],
  },

  en_s1u9_n5_076_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Where ___ you yesterday?',
    blankAnswers: ['were'],
    options: ['were', 'was', 'did', 'are'],
    answer: 'were',
    answerTranslation: L(
      '어제 어디에 있었어요?',
      'Kecha qayerda edingiz?',
      'Where were you yesterday?',
      'Где вы были вчера?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit9-review', 'were'],
  },

  en_s1u9_n5_077_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'When did you ',
    sentenceSuffix: ' school?',
    answer: 'leave',
    answerTranslation: L(
      '학교를 언제 떠났어요?',
      'Maktabni qachon tugatdingiz?',
      'When did you leave school?',
      'Когда вы закончили школу?',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'After "did you", use the base verb "leave".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'did-question'],
  },

  en_s1u9_n5_078_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'cinema',
      'last',
      'When',
      'go',
      'you',
      'to',
      'the',
      'did',
      'went',
    ],
    answer: 'When did you last go to the cinema',
    audioText: 'When did you last go to the cinema?',
    answerTranslation: L(
      '마지막으로 영화관에 간 게 언제예요?',
      'Oxirgi marta kinoga qachon bordingiz?',
      'When did you last go to the cinema?',
      'Когда вы в последний раз ходили в кино?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['unit9-review', 'did-question'],
  },

  en_s1u9_n5_079_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Did you play sport at the weekend?',
    options: [
      'Yes',
      'my',
      'friends',
      'and',
      'I',
      'had',
      'a',
      'football',
      'match',
      'didn’t',
    ],
    answer: 'Yes my friends and I had a football match',
    answerTranslation: L(
      '네, 친구들과 축구 경기를 했어요.',
      'Ha, do‘stlarim bilan futbol o‘yini o‘ynadik.',
      'Yes, my friends and I had a football match.',
      'Да, мы с друзьями играли футбольный матч.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['unit9-review', 'sport', 'reply'],
  },

  en_s1u9_n5_080_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'I’m sorry I’m late. The bus didn’t come.',
      },
    ],
    options: [
      'Oh! That’s bad luck.',
      'Yes, the weather did.',
      'I was a tourist tomorrow.',
      'The bus was a festival.',
    ],
    answer: 'Oh! That’s bad luck.',
    answerTranslation: L(
      '아, 운이 안 좋았네요.',
      'Voy, omadingiz kelmabdi.',
      'Oh! That’s bad luck.',
      'Ох, не повезло.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['unit9-review', 'dialog', 'final'],
  },
};

export const EN_S1_UNIT9_NODE5 = {
  title: L(
    '어떤 날씨든',
    'Har qanday ob-havo',
    'Whatever the weather',
    'Какая бы ни была погода',
  ),
  section: 1,
  unit: 9,
  order: 5,
  isActive: true,

  lessons: [
    {
      title: L(
        '영상 속 장소와 풍경',
        'Videodagi joylar va manzaralar',
        'Places in the video',
        'Места и пейзажи в видео',
      ),
      description: L(
        '전원 지역, 강, 바다, 분수, 배, 관광객과 교통처럼 영상에 등장하는 장소·풍경 어휘를 익혀요.',
        'Qishloq joy, daryo, okean, favvora, qayiq, sayyoh va yo‘l harakati kabi videodagi so‘zlarni o‘rganasiz.',
        'Learn words from the video such as countryside, river, ocean, fountain, boat, tourist and traffic.',
        'Изучаем слова из видео: countryside, river, ocean, fountain, boat, tourist и traffic.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 1,
      questions: [
        'en_s1u9_n5_001_speaking',
        'en_s1u9_n5_002_image_choice',
        'en_s1u9_n5_003_word_matching',
        'en_s1u9_n5_004_translate_builder',
        'en_s1u9_n5_005_word_arrange',
        'en_s1u9_n5_006_audio_match',
        'en_s1u9_n5_007_type_answer',
        'en_s1u9_n5_008_image_choice',
        'en_s1u9_n5_009_sentence_builder',
        'en_s1u9_n5_010_reply_builder',
        'en_s1u9_n5_011_type_answer',
        'en_s1u9_n5_012_word_matching',
        'en_s1u9_n5_013_translate_builder',
        'en_s1u9_n5_014_audio_match',
        'en_s1u9_n5_015_image_choice',
        'en_s1u9_n5_016_fill_in_blank',
        'en_s1u9_n5_017_type_answer',
        'en_s1u9_n5_018_word_arrange',
        'en_s1u9_n5_019_reply_builder',
        'en_s1u9_n5_020_dialog_complete',
      ],
    },

    {
      title: L(
        '세계의 날씨',
        'Dunyo ob-havosi',
        'Weather around the world',
        'Погода в мире',
      ),
      description: L(
        '계절별 날씨, 관광객 수, 눈과 온도 표현을 활용해 여러 지역의 날씨를 설명해요.',
        'Fasllar, sayyohlar, qor va harorat haqidagi iboralar bilan turli joylarning ob-havosini tasvirlaysiz.',
        'Describe weather in different places using seasons, tourists, snow and temperature expressions.',
        'Описываем погоду в разных местах, используя времена года, туристов, снег и температуру.',
      ),
      category: LessonCategory.EXPRESSION,
      level: LV,
      order: 2,
      questions: [
        'en_s1u9_n5_021_speaking',
        'en_s1u9_n5_022_image_choice',
        'en_s1u9_n5_023_word_matching',
        'en_s1u9_n5_024_translate_builder',
        'en_s1u9_n5_025_word_arrange',
        'en_s1u9_n5_026_audio_match',
        'en_s1u9_n5_027_type_answer',
        'en_s1u9_n5_028_image_choice',
        'en_s1u9_n5_029_sentence_builder',
        'en_s1u9_n5_030_reply_builder',
        'en_s1u9_n5_031_type_answer',
        'en_s1u9_n5_032_word_matching',
        'en_s1u9_n5_033_translate_builder',
        'en_s1u9_n5_034_audio_match',
        'en_s1u9_n5_035_image_choice',
        'en_s1u9_n5_036_fill_in_blank',
        'en_s1u9_n5_037_type_answer',
        'en_s1u9_n5_038_word_arrange',
        'en_s1u9_n5_039_reply_builder',
        'en_s1u9_n5_040_dialog_complete',
      ],
    },

    {
      title: L(
        '놀라운 기억력',
        'Ajoyib xotira',
        'An amazing memory',
        'Удивительная память',
      ),
      description: L(
        '킴 픽에 관한 듣기 주제를 바탕으로 미술, 영화, 문학, 과학, 스포츠, 뉴스와 연극 같은 주제어를 익히고 질문을 만들어요.',
        'Kim Peek haqidagi tinglash mavzusi orqali san’at, kino, adabiyot, fan, sport, yangiliklar va teatr so‘zlarini o‘rganib, savollar tuzasiz.',
        'Use the Kim Peek listening topic to learn words such as art, cinema, literature, science, sport, news and theatre and build questions.',
        'На материале о Киме Пике изучаем art, cinema, literature, science, sport, news и theatre и строим вопросы.',
      ),
      category: LessonCategory.LISTENING,
      level: LV,
      order: 3,
      questions: [
        'en_s1u9_n5_041_speaking',
        'en_s1u9_n5_042_image_choice',
        'en_s1u9_n5_043_word_matching',
        'en_s1u9_n5_044_translate_builder',
        'en_s1u9_n5_045_word_arrange',
        'en_s1u9_n5_046_audio_match',
        'en_s1u9_n5_047_type_answer',
        'en_s1u9_n5_048_image_choice',
        'en_s1u9_n5_049_sentence_builder',
        'en_s1u9_n5_050_reply_builder',
        'en_s1u9_n5_051_type_answer',
        'en_s1u9_n5_052_word_matching',
        'en_s1u9_n5_053_translate_builder',
        'en_s1u9_n5_054_audio_match',
        'en_s1u9_n5_055_image_choice',
        'en_s1u9_n5_056_fill_in_blank',
        'en_s1u9_n5_057_type_answer',
        'en_s1u9_n5_058_word_arrange',
        'en_s1u9_n5_059_reply_builder',
        'en_s1u9_n5_060_dialog_complete',
      ],
    },

    {
      title: L(
        '유닛 9 종합 복습',
        '9-unit umumiy takrorlash',
        'Unit 9 final review',
        'Итоговое повторение раздела 9',
      ),
      description: L(
        '불규칙 과거형, didn’t, did 질문, 과거의 경험, 날씨와 Unit 9 핵심 어휘를 한 번에 복습해요.',
        'Noto‘g‘ri o‘tgan zamon fe’llari, didn’t, did savollari, o‘tgan tajribalar, ob-havo va 9-unit so‘zlarini takrorlaysiz.',
        'Review irregular past verbs, didn’t, did questions, past experiences, weather and the key vocabulary from Unit 9.',
        'Повторяем неправильные глаголы, didn’t, вопросы с did, прошлые события, погоду и лексику раздела 9.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 4,
      questions: [
        'en_s1u9_n5_061_speaking',
        'en_s1u9_n5_062_image_choice',
        'en_s1u9_n5_063_word_matching',
        'en_s1u9_n5_064_translate_builder',
        'en_s1u9_n5_065_word_arrange',
        'en_s1u9_n5_066_audio_match',
        'en_s1u9_n5_067_type_answer',
        'en_s1u9_n5_068_image_choice',
        'en_s1u9_n5_069_sentence_builder',
        'en_s1u9_n5_070_reply_builder',
        'en_s1u9_n5_071_type_answer',
        'en_s1u9_n5_072_word_matching',
        'en_s1u9_n5_073_translate_builder',
        'en_s1u9_n5_074_audio_match',
        'en_s1u9_n5_075_image_choice',
        'en_s1u9_n5_076_fill_in_blank',
        'en_s1u9_n5_077_type_answer',
        'en_s1u9_n5_078_word_arrange',
        'en_s1u9_n5_079_reply_builder',
        'en_s1u9_n5_080_dialog_complete',
      ],
    },
  ],
};
