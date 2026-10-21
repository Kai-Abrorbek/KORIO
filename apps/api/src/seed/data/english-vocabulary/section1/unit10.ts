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
// Section 1 · Unit 10 · Node 1
// 10.1 We're going to raise £5,000
//
// Coverage
// - be going to + base verb
// - positive future plans
// - negative future plans
// - am / is / are going to
// - am not / isn't / aren't going to
// - future projects
// - raise money
// - volunteer projects
// - scientists and the environment
// - project goals
// - future time expressions:
//   today
//   this evening
//   tomorrow
//   the day after tomorrow
//   in three days
//   next week
//   next month
//   next year
// - Roxanne's Europe project
// - Shaun's Arctic project
// - Guatemala volunteer project
// - Josh's Philippines project
// - Five Star Cafe project
//
// IMPORTANT:
// *_WORDS에는 무조건 단어 하나만 등록.
// "next month", "future project", "music group",
// "local people", "the day after tomorrow" 같은 구/문장은 등록 금지.
//
// 4 lessons × 20 questions = 80
// type_answer: 3 per lesson
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT10_NODE1_WORDS = [
  {
    code: 'en-noun-project',
    english: 'project',
    senseKey: 'planned-piece-of-work',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '프로젝트; 계획된 일',
      'loyiha',
      'a planned piece of work with a particular purpose',
      'проект',
    ),
    examples: [
      {
        english: 'We need money for this project.',
        translations: L(
          '우리는 이 프로젝트를 위해 돈이 필요해요.',
          'Bu loyiha uchun bizga pul kerak.',
          'We need money for this project.',
          'Нам нужны деньги для этого проекта.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈprɒdʒekt/',
      ttsText: 'project',
    },
    media: {
      emoji: '📋',
      imageUrl: '',
      imageAlt: L(
        '프로젝트 계획',
        'loyiha rejasi',
        'a project plan',
        'план проекта',
      ),
    },
    tags: ['projects', 'future'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-raise',
    english: 'raise',
    senseKey: 'collect-money-for-purpose',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '모금하다; 돈을 모으다',
      'pul yig‘moq',
      'to collect money for a particular purpose',
      'собирать деньги',
    ),
    examples: [
      {
        english: 'We are going to raise five thousand pounds.',
        translations: L(
          '우리는 5천 파운드를 모을 거예요.',
          'Biz besh ming funt yig‘moqchimiz.',
          'We are going to raise five thousand pounds.',
          'Мы собираемся собрать пять тысяч фунтов.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/reɪz/',
      ttsText: 'raise',
    },
    media: {
      emoji: '💷',
      imageUrl: '',
      imageAlt: L(
        '돈을 모으는 모습',
        'pul yig‘ish',
        'raising money',
        'сбор денег',
      ),
    },
    tags: ['money', 'projects'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-tour',
    english: 'tour',
    senseKey: 'journey-visiting-several-places',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '여행; 순회',
      'sayohat',
      'a journey in which you visit several places',
      'тур; поездка',
    ),
    examples: [
      {
        english: 'The group needs money during the tour.',
        translations: L(
          '그 그룹은 여행 중에 돈이 필요해요.',
          'Guruhga sayohat davomida pul kerak.',
          'The group needs money during the tour.',
          'Группе нужны деньги во время тура.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/tʊə/',
      ttsText: 'tour',
    },
    media: {
      emoji: '🗺️',
      imageUrl: '',
      imageAlt: L(
        '여러 도시를 도는 여행',
        'bir necha shaharga sayohat',
        'a tour',
        'тур',
      ),
    },
    tags: ['travel', 'projects'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-flight',
    english: 'flight',
    senseKey: 'journey-by-aircraft',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '항공편; 비행',
      'parvoz',
      'a journey in an aircraft',
      'рейс; полёт',
    ),
    examples: [
      {
        english: 'They have money for the flights.',
        translations: L(
          '그들은 항공편 비용은 가지고 있어요.',
          'Ularda parvozlar uchun pul bor.',
          'They have money for the flights.',
          'У них есть деньги на авиабилеты.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/flaɪt/',
      ttsText: 'flight',
    },
    media: {
      emoji: '✈️',
      imageUrl: '',
      imageAlt: L('비행기 여행', 'samolyot parvozi', 'a flight', 'авиарейс'),
    },
    tags: ['travel', 'transport'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-job-scientist',
    english: 'scientist',
    senseKey: 'person-who-studies-science',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '과학자',
      'olim',
      'a person who studies or works in science',
      'учёный',
    ),
    examples: [
      {
        english: 'Three scientists are going to travel with Shaun.',
        translations: L(
          '과학자 세 명이 숀과 함께 여행할 거예요.',
          'Uchta olim Shaun bilan sayohat qilmoqchi.',
          'Three scientists are going to travel with Shaun.',
          'Три учёных собираются путешествовать с Шоном.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈsaɪəntɪst/',
      ttsText: 'scientist',
    },
    media: {
      emoji: '🔬',
      imageUrl: '',
      imageAlt: L(
        '연구하는 과학자',
        'tadqiqot olib borayotgan olim',
        'a scientist',
        'учёный',
      ),
    },
    tags: ['jobs', 'science'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-organization',
    english: 'organization',
    senseKey: 'organized-group-with-purpose',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '단체; 조직',
      'tashkilot',
      'a group of people working together for a particular purpose',
      'организация',
    ),
    examples: [
      {
        english: 'They are going to help an international organization.',
        translations: L(
          '그들은 국제 단체를 도울 거예요.',
          'Ular xalqaro tashkilotga yordam bermoqchi.',
          'They are going to help an international organization.',
          'Они собираются помочь международной организации.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌɔːɡənaɪˈzeɪʃən/',
      ttsText: 'organization',
    },
    media: {
      emoji: '🤝',
      imageUrl: '',
      imageAlt: L(
        '함께 일하는 단체',
        'birga ishlayotgan tashkilot',
        'an organization',
        'организация',
      ),
    },
    tags: ['projects', 'people'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-environment',
    english: 'environment',
    senseKey: 'natural-world-around-us',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '환경',
      'atrof-muhit',
      'the natural world and the conditions around people, animals and plants',
      'окружающая среда',
    ),
    examples: [
      {
        english: 'The scientists are going to study the environment.',
        translations: L(
          '과학자들은 환경을 연구할 거예요.',
          'Olimlar atrof-muhitni o‘rganmoqchi.',
          'The scientists are going to study the environment.',
          'Учёные собираются изучать окружающую среду.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɪnˈvaɪrənmənt/',
      ttsText: 'environment',
    },
    media: {
      emoji: '🌍',
      imageUrl: '',
      imageAlt: L(
        '자연 환경',
        'tabiiy atrof-muhit',
        'the environment',
        'окружающая среда',
      ),
    },
    tags: ['nature', 'science'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-volunteer',
    english: 'volunteer',
    senseKey: 'person-working-without-pay-to-help',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '자원봉사자',
      'ko‘ngilli',
      'a person who works to help without being paid',
      'волонтёр',
    ),
    examples: [
      {
        english: 'I am going to be a volunteer next summer.',
        translations: L(
          '저는 내년 여름에 자원봉사자가 될 거예요.',
          'Men kelasi yozda ko‘ngilli bo‘lmoqchiman.',
          'I am going to be a volunteer next summer.',
          'Следующим летом я собираюсь стать волонтёром.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌvɒlənˈtɪə/',
      ttsText: 'volunteer',
    },
    media: {
      emoji: '🙋',
      imageUrl: '',
      imageAlt: L(
        '봉사 활동을 하는 사람',
        'ko‘ngilli odam',
        'a volunteer',
        'волонтёр',
      ),
    },
    tags: ['people', 'projects'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-goal',
    english: 'goal',
    senseKey: 'result-person-wants-to-achieve',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('목표', 'maqsad', 'something that you want to achieve', 'цель'),
    examples: [
      {
        english: 'Their goal is forty thousand dollars.',
        translations: L(
          '그들의 목표는 4만 달러예요.',
          'Ularning maqsadi qirq ming dollar.',
          'Their goal is forty thousand dollars.',
          'Их цель — сорок тысяч долларов.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɡəʊl/',
      ttsText: 'goal',
    },
    media: {
      emoji: '🎯',
      imageUrl: '',
      imageAlt: L('목표', 'maqsad', 'a goal', 'цель'),
    },
    tags: ['projects', 'planning'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-mountain',
    english: 'mountain',
    senseKey: 'very-high-natural-land',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('산', 'tog‘', 'a very high area of natural land', 'гора'),
    examples: [
      {
        english: 'The group is going to work in the mountains.',
        translations: L(
          '그 그룹은 산에서 일할 거예요.',
          'Guruh tog‘larda ishlamoqchi.',
          'The group is going to work in the mountains.',
          'Группа собирается работать в горах.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈmaʊntɪn/',
      ttsText: 'mountain',
    },
    media: {
      emoji: '🏔️',
      imageUrl: '',
      imageAlt: L('높은 산', 'baland tog‘', 'a mountain', 'гора'),
    },
    tags: ['nature', 'places'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-renovation',
    english: 'renovation',
    senseKey: 'work-improving-old-building',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '보수 공사; 리노베이션',
      'ta’mirlash',
      'work done to repair and improve an old building',
      'ремонт; реконструкция',
    ),
    examples: [
      {
        english: 'They are going to pay for renovations.',
        translations: L(
          '그들은 보수 공사 비용을 낼 거예요.',
          'Ular ta’mirlash uchun pul to‘lamoqchi.',
          'They are going to pay for renovations.',
          'Они собираются оплатить ремонт.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌrenəˈveɪʃən/',
      ttsText: 'renovation',
    },
    media: {
      emoji: '🔨',
      imageUrl: '',
      imageAlt: L(
        '건물 보수 공사',
        'bino ta’mirlash',
        'a renovation',
        'ремонт здания',
      ),
    },
    tags: ['buildings', 'projects'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-equipment',
    english: 'equipment',
    senseKey: 'tools-needed-for-activity',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '장비',
      'jihoz',
      'the tools and things needed for a particular activity',
      'оборудование',
    ),
    examples: [
      {
        english: 'The cafe needs new equipment.',
        translations: L(
          '그 카페는 새 장비가 필요해요.',
          'Kafega yangi jihozlar kerak.',
          'The cafe needs new equipment.',
          'Кафе нужно новое оборудование.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɪˈkwɪpmənt/',
      ttsText: 'equipment',
    },
    media: {
      emoji: '🛠️',
      imageUrl: '',
      imageAlt: L('작업 장비', 'ish jihozlari', 'equipment', 'оборудование'),
    },
    tags: ['projects', 'work'],
    difficulty: 1,
    isCore: true,
  },
];

export const EN_S1_UNIT10_NODE1_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Future plans
  // ===========================================================

  en_s1u10_n1_001_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She is going to travel around Europe.',
    audioText: 'She is going to travel around Europe.',
    answerTranslation: L(
      '그녀는 유럽을 여행할 거예요.',
      'U Yevropa bo‘ylab sayohat qilmoqchi.',
      'She is going to travel around Europe.',
      'Она собирается путешествовать по Европе.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['going-to', 'future'],
  },

  en_s1u10_n1_002_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'project',
    choices: [
      { text: 'mountain', label: '🏔️', emoji: '🏔️', imageUrl: '' },
      { text: 'project', label: '📋', emoji: '📋', imageUrl: '' },
      { text: 'flight', label: '✈️', emoji: '✈️', imageUrl: '' },
      { text: 'volunteer', label: '🙋', emoji: '🙋', imageUrl: '' },
    ],
    answerTranslation: L('프로젝트', 'loyiha', 'project', 'проект'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['project'],
  },

  en_s1u10_n1_003_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'project',
        native: 'loyiha',
        nativeI18n: L('프로젝트', 'loyiha', 'project', 'проект'),
      },
      {
        text: 'raise',
        native: 'pul yig‘moq',
        nativeI18n: L('모금하다', 'pul yig‘moq', 'raise', 'собирать деньги'),
      },
      {
        text: 'tour',
        native: 'sayohat',
        nativeI18n: L('여행', 'sayohat', 'tour', 'тур'),
      },
      {
        text: 'flight',
        native: 'parvoz',
        nativeI18n: L('항공편', 'parvoz', 'flight', 'рейс'),
      },
      {
        text: 'goal',
        native: 'maqsad',
        nativeI18n: L('목표', 'maqsad', 'goal', 'цель'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['projects', 'matching'],
  },

  en_s1u10_n1_004_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'Europe',
      'travel',
      'going',
      'She',
      'to',
      'is',
      'around',
      'traveled',
      'not',
    ],
    answer: 'She is going to travel around Europe',
    answerTranslation: L(
      '그녀는 유럽을 여행할 거예요.',
      'U Yevropa bo‘ylab sayohat qilmoqchi.',
      'She is going to travel around Europe.',
      'Она собирается путешествовать по Европе.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['going-to', 'positive'],
  },

  en_s1u10_n1_005_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'five',
      'visit',
      'They',
      'cities',
      'going',
      'to',
      'are',
      'visiting',
      'not',
    ],
    answer: 'They are going to visit five cities',
    audioText: 'They are going to visit five cities.',
    answerTranslation: L(
      '그들은 다섯 도시를 방문할 거예요.',
      'Ular beshta shaharga bormoqchi.',
      'They are going to visit five cities.',
      'Они собираются посетить пять городов.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['going-to', 'visit'],
  },

  en_s1u10_n1_006_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'project',
        native: 'loyiha',
        nativeI18n: L('프로젝트', 'loyiha', 'project', 'проект'),
      },
      {
        text: 'raise',
        native: 'pul yig‘moq',
        nativeI18n: L('모금하다', 'pul yig‘moq', 'raise', 'собирать деньги'),
      },
      {
        text: 'tour',
        native: 'sayohat',
        nativeI18n: L('여행', 'sayohat', 'tour', 'тур'),
      },
      {
        text: 'flight',
        native: 'parvoz',
        nativeI18n: L('항공편', 'parvoz', 'flight', 'рейс'),
      },
      {
        text: 'goal',
        native: 'maqsad',
        nativeI18n: L('목표', 'maqsad', 'goal', 'цель'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['projects', 'listening'],
  },

  en_s1u10_n1_007_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'She is going to ',
    sentenceSuffix: ' around Europe.',
    answer: 'travel',
    answerTranslation: L(
      '그녀는 유럽을 여행할 거예요.',
      'U Yevropa bo‘ylab sayohat qilmoqchi.',
      'She is going to travel around Europe.',
      'Она собирается путешествовать по Европе.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'After "going to", use the base verb "travel".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'going-to'],
  },

  en_s1u10_n1_008_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'flight',
    choices: [
      { text: 'tour', label: '🗺️', emoji: '🗺️', imageUrl: '' },
      { text: 'project', label: '📋', emoji: '📋', imageUrl: '' },
      { text: 'flight', label: '✈️', emoji: '✈️', imageUrl: '' },
      { text: 'goal', label: '🎯', emoji: '🎯', imageUrl: '' },
    ],
    answerTranslation: L('항공편', 'parvoz', 'flight', 'рейс'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['flight'],
  },

  en_s1u10_n1_009_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'The group is going to visit five cities.',
    audioText: 'The group is going to visit five cities.',
    answerI18n: L(
      '그 그룹은 다섯 도시를 방문할 거예요',
      'Guruh beshta shaharga bormoqchi',
      'The group is going to visit five cities',
      'Группа собирается посетить пять городов',
    ),
    options: [
      'The',
      'group',
      'is',
      'going',
      'to',
      'visit',
      'five',
      'cities',
      'visited',
    ],
    optionsI18n: {
      ko: ['그', '그룹은', '다섯', '도시를', '방문할', '거예요'],
      uz: ['Guruh', 'beshta', 'shaharga', 'bormoqchi'],
      en: ['The', 'group', 'is', 'going', 'to', 'visit', 'five', 'cities'],
      ru: ['Группа', 'собирается', 'посетить', 'пять', 'городов'],
    },
    answerTranslation: L(
      '그 그룹은 다섯 도시를 방문할 거예요.',
      'Guruh beshta shaharga bormoqchi.',
      'The group is going to visit five cities.',
      'Группа собирается посетить пять городов.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['going-to', 'future'],
  },

  en_s1u10_n1_010_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What is Roxanne going to do?',
    options: [
      'She',
      'is',
      'going',
      'to',
      'travel',
      'around',
      'Europe',
      'study',
      'Arctic',
    ],
    answer: 'She is going to travel around Europe',
    answerTranslation: L(
      '그녀는 유럽을 여행할 거예요.',
      'U Yevropa bo‘ylab sayohat qilmoqchi.',
      'She is going to travel around Europe.',
      'Она собирается путешествовать по Европе.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['going-to', 'reply'],
  },

  en_s1u10_n1_011_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'They ',
    sentenceSuffix: ' going to visit five cities.',
    answer: 'are',
    answerTranslation: L(
      '그들은 다섯 도시를 방문할 거예요.',
      'Ular beshta shaharga bormoqchi.',
      'They are going to visit five cities.',
      'Они собираются посетить пять городов.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Use "are" with the subject "they".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'are'],
  },

  en_s1u10_n1_012_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'scientist',
        native: 'olim',
        nativeI18n: L('과학자', 'olim', 'scientist', 'учёный'),
      },
      {
        text: 'organization',
        native: 'tashkilot',
        nativeI18n: L('단체', 'tashkilot', 'organization', 'организация'),
      },
      {
        text: 'environment',
        native: 'atrof-muhit',
        nativeI18n: L('환경', 'atrof-muhit', 'environment', 'окружающая среда'),
      },
      {
        text: 'volunteer',
        native: 'ko‘ngilli',
        nativeI18n: L('자원봉사자', 'ko‘ngilli', 'volunteer', 'волонтёр'),
      },
      {
        text: 'mountain',
        native: 'tog‘',
        nativeI18n: L('산', 'tog‘', 'mountain', 'гора'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['projects', 'matching'],
  },

  en_s1u10_n1_013_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'money',
      'for',
      'They',
      'flights',
      'the',
      'have',
      'going',
      'hotels',
    ],
    answer: 'They have money for the flights',
    answerTranslation: L(
      '그들은 항공편 비용은 가지고 있어요.',
      'Ularda parvozlar uchun pul bor.',
      'They have money for the flights.',
      'У них есть деньги на авиабилеты.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['flight', 'project'],
  },

  en_s1u10_n1_014_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'scientist',
        native: 'olim',
        nativeI18n: L('과학자', 'olim', 'scientist', 'учёный'),
      },
      {
        text: 'organization',
        native: 'tashkilot',
        nativeI18n: L('단체', 'tashkilot', 'organization', 'организация'),
      },
      {
        text: 'environment',
        native: 'atrof-muhit',
        nativeI18n: L('환경', 'atrof-muhit', 'environment', 'окружающая среда'),
      },
      {
        text: 'volunteer',
        native: 'ko‘ngilli',
        nativeI18n: L('자원봉사자', 'ko‘ngilli', 'volunteer', 'волонтёр'),
      },
      {
        text: 'mountain',
        native: 'tog‘',
        nativeI18n: L('산', 'tog‘', 'mountain', 'гора'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['projects', 'listening'],
  },

  en_s1u10_n1_015_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'volunteer',
    choices: [
      { text: 'scientist', label: '🔬', emoji: '🔬', imageUrl: '' },
      { text: 'mountain', label: '🏔️', emoji: '🏔️', imageUrl: '' },
      { text: 'volunteer', label: '🙋', emoji: '🙋', imageUrl: '' },
      { text: 'flight', label: '✈️', emoji: '✈️', imageUrl: '' },
    ],
    answerTranslation: L('자원봉사자', 'ko‘ngilli', 'volunteer', 'волонтёр'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['volunteer'],
  },

  en_s1u10_n1_016_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'We ___ going to help with this project.',
    blankAnswers: ['are'],
    options: ['are', 'is', 'am', 'did'],
    answer: 'are',
    answerTranslation: L(
      '우리는 이 프로젝트를 도울 거예요.',
      'Biz bu loyihaga yordam bermoqchimiz.',
      'We are going to help with this project.',
      'Мы собираемся помочь с этим проектом.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['going-to', 'are'],
  },

  en_s1u10_n1_017_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I ',
    sentenceSuffix: ' going to travel next month.',
    answer: 'am',
    answerTranslation: L(
      '저는 다음 달에 여행할 거예요.',
      'Men kelasi oy sayohat qilmoqchiman.',
      'I am going to travel next month.',
      'Я собираюсь путешествовать в следующем месяце.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Use "am" with the subject "I".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'am'],
  },

  en_s1u10_n1_018_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'project',
      'raise',
      'money',
      'We',
      'going',
      'to',
      'are',
      'for',
      'the',
      'raised',
    ],
    answer: 'We are going to raise money for the project',
    audioText: 'We are going to raise money for the project.',
    answerTranslation: L(
      '우리는 프로젝트를 위해 돈을 모을 거예요.',
      'Biz loyiha uchun pul yig‘moqchimiz.',
      'We are going to raise money for the project.',
      'Мы собираемся собрать деньги для проекта.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['going-to', 'raise'],
  },

  en_s1u10_n1_019_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Are they going to visit five cities?',
    options: [
      'Yes',
      'they',
      'are',
      'going',
      'to',
      'visit',
      'five',
      'cities',
      'not',
    ],
    answer: 'Yes they are going to visit five cities',
    answerTranslation: L(
      '네, 다섯 도시를 방문할 거예요.',
      'Ha, ular beshta shaharga bormoqchi.',
      'Yes, they are going to visit five cities.',
      'Да, они собираются посетить пять городов.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['going-to', 'reply'],
  },

  en_s1u10_n1_020_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'What is Roxanne going to do next year?' },
    ],
    options: [
      'She is going to travel around Europe.',
      'She travelled around Europe yesterday.',
      'She is not going to sing.',
      'She did travel to the Arctic.',
    ],
    answer: 'She is going to travel around Europe.',
    answerTranslation: L(
      '그녀는 유럽을 여행할 거예요.',
      'U Yevropa bo‘ylab sayohat qilmoqchi.',
      'She is going to travel around Europe.',
      'Она собирается путешествовать по Европе.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['going-to', 'dialog'],
  },

  // ===========================================================
  // Lesson 2 · Positive and negative plans
  // ===========================================================

  en_s1u10_n1_021_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I am not going to do this as a holiday.',
    audioText: 'I am not going to do this as a holiday.',
    answerTranslation: L(
      '저는 이것을 휴가로 하려는 게 아니에요.',
      'Men buni ta’til sifatida qilmoqchi emasman.',
      'I am not going to do this as a holiday.',
      'Я не собираюсь делать это как отпуск.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['going-to', 'negative'],
  },

  en_s1u10_n1_022_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'scientist',
    choices: [
      { text: 'volunteer', label: '🙋', emoji: '🙋', imageUrl: '' },
      { text: 'scientist', label: '🔬', emoji: '🔬', imageUrl: '' },
      { text: 'goal', label: '🎯', emoji: '🎯', imageUrl: '' },
      { text: 'mountain', label: '🏔️', emoji: '🏔️', imageUrl: '' },
    ],
    answerTranslation: L('과학자', 'olim', 'scientist', 'учёный'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['scientist'],
  },

  en_s1u10_n1_023_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'scientist',
        native: 'olim',
        nativeI18n: L('과학자', 'olim', 'scientist', 'учёный'),
      },
      {
        text: 'organization',
        native: 'tashkilot',
        nativeI18n: L('단체', 'tashkilot', 'organization', 'организация'),
      },
      {
        text: 'environment',
        native: 'atrof-muhit',
        nativeI18n: L('환경', 'atrof-muhit', 'environment', 'окружающая среда'),
      },
      {
        text: 'mountain',
        native: 'tog‘',
        nativeI18n: L('산', 'tog‘', 'mountain', 'гора'),
      },
      {
        text: 'volunteer',
        native: 'ko‘ngilli',
        nativeI18n: L('자원봉사자', 'ko‘ngilli', 'volunteer', 'волонтёр'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['arctic-project', 'matching'],
  },

  en_s1u10_n1_024_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'holiday',
      'going',
      'I',
      'this',
      'not',
      'to',
      'do',
      'am',
      'as',
      'a',
    ],
    answer: 'I am not going to do this as a holiday',
    answerTranslation: L(
      '저는 이것을 휴가로 하려는 게 아니에요.',
      'Men buni ta’til sifatida qilmoqchi emasman.',
      'I am not going to do this as a holiday.',
      'Я не собираюсь делать это как отпуск.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['negative', 'going-to'],
  },

  en_s1u10_n1_025_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'environment',
      'study',
      'They',
      'going',
      'the',
      'are',
      'to',
      'studied',
      'not',
    ],
    answer: 'They are going to study the environment',
    audioText: 'They are going to study the environment.',
    answerTranslation: L(
      '그들은 환경을 연구할 거예요.',
      'Ular atrof-muhitni o‘rganmoqchi.',
      'They are going to study the environment.',
      'Они собираются изучать окружающую среду.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['environment', 'going-to'],
  },

  en_s1u10_n1_026_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'scientist',
        native: 'olim',
        nativeI18n: L('과학자', 'olim', 'scientist', 'учёный'),
      },
      {
        text: 'organization',
        native: 'tashkilot',
        nativeI18n: L('단체', 'tashkilot', 'organization', 'организация'),
      },
      {
        text: 'environment',
        native: 'atrof-muhit',
        nativeI18n: L('환경', 'atrof-muhit', 'environment', 'окружающая среда'),
      },
      {
        text: 'mountain',
        native: 'tog‘',
        nativeI18n: L('산', 'tog‘', 'mountain', 'гора'),
      },
      {
        text: 'volunteer',
        native: 'ko‘ngilli',
        nativeI18n: L('자원봉사자', 'ko‘ngilli', 'volunteer', 'волонтёр'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['arctic-project', 'listening'],
  },

  en_s1u10_n1_027_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I am ',
    sentenceSuffix: ' going to take my computer.',
    answer: 'not',
    answerTranslation: L(
      '저는 컴퓨터를 가져가지 않을 거예요.',
      'Men kompyuterimni olib bormoqchi emasman.',
      'I am not going to take my computer.',
      'Я не собираюсь брать компьютер.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Use "not" to make the future plan negative.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'negative'],
  },

  en_s1u10_n1_028_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'environment',
    choices: [
      { text: 'mountain', label: '🏔️', emoji: '🏔️', imageUrl: '' },
      { text: 'organization', label: '🤝', emoji: '🤝', imageUrl: '' },
      { text: 'environment', label: '🌍', emoji: '🌍', imageUrl: '' },
      { text: 'scientist', label: '🔬', emoji: '🔬', imageUrl: '' },
    ],
    answerTranslation: L(
      '환경',
      'atrof-muhit',
      'environment',
      'окружающая среда',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['environment'],
  },

  en_s1u10_n1_029_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'We are going to write a blog about it.',
    audioText: 'We are going to write a blog about it.',
    answerI18n: L(
      '우리는 그것에 대한 블로그를 쓸 거예요',
      'Biz bu haqda blog yozmoqchimiz',
      'We are going to write a blog about it',
      'Мы собираемся написать об этом блог',
    ),
    options: [
      'We',
      'are',
      'going',
      'to',
      'write',
      'a',
      'blog',
      'about',
      'it',
      'wrote',
    ],
    optionsI18n: {
      ko: ['우리는', '그것에', '대한', '블로그를', '쓸', '거예요'],
      uz: ['Biz', 'bu', 'haqda', 'blog', 'yozmoqchimiz'],
      en: ['We', 'are', 'going', 'to', 'write', 'a', 'blog', 'about', 'it'],
      ru: ['Мы', 'собираемся', 'написать', 'об', 'этом', 'блог'],
    },
    answerTranslation: L(
      '우리는 그것에 대한 블로그를 쓸 거예요.',
      'Biz bu haqda blog yozmoqchimiz.',
      'We are going to write a blog about it.',
      'Мы собираемся написать об этом блог.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['going-to', 'blog'],
  },

  en_s1u10_n1_030_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Is Shaun going to the Arctic for a holiday?',
    options: ['No', 'he', 'is', 'not', 'going', 'for', 'a', 'holiday', 'Yes'],
    answer: 'No he is not going for a holiday',
    answerTranslation: L(
      '아니요, 그는 휴가로 가는 게 아니에요.',
      'Yo‘q, u ta’til uchun ketmayapti.',
      'No, he is not going for a holiday.',
      'Нет, он едет не на отдых.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['negative', 'reply'],
  },

  en_s1u10_n1_031_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'They are going to ',
    sentenceSuffix: ' the environment.',
    answer: 'study',
    answerTranslation: L(
      '그들은 환경을 연구할 거예요.',
      'Ular atrof-muhitni o‘rganmoqchi.',
      'They are going to study the environment.',
      'Они собираются изучать окружающую среду.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'After "going to", use the base verb "study".',
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

  en_s1u10_n1_032_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'project',
        native: 'loyiha',
        nativeI18n: L('프로젝트', 'loyiha', 'project', 'проект'),
      },
      {
        text: 'goal',
        native: 'maqsad',
        nativeI18n: L('목표', 'maqsad', 'goal', 'цель'),
      },
      {
        text: 'raise',
        native: 'pul yig‘moq',
        nativeI18n: L('모금하다', 'pul yig‘moq', 'raise', 'собирать деньги'),
      },
      {
        text: 'tour',
        native: 'sayohat',
        nativeI18n: L('여행', 'sayohat', 'tour', 'тур'),
      },
      {
        text: 'flight',
        native: 'parvoz',
        nativeI18n: L('항공편', 'parvoz', 'flight', 'рейс'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['projects', 'matching'],
  },

  en_s1u10_n1_033_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'dogs',
      'organization',
      'international',
      'help',
      'They',
      'going',
      'to',
      'are',
      'an',
    ],
    answer: 'They are going to help an international organization',
    answerTranslation: L(
      '그들은 국제 단체를 도울 거예요.',
      'Ular xalqaro tashkilotga yordam bermoqchi.',
      'They are going to help an international organization.',
      'Они собираются помочь международной организации.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['organization', 'going-to'],
  },

  en_s1u10_n1_034_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'project',
        native: 'loyiha',
        nativeI18n: L('프로젝트', 'loyiha', 'project', 'проект'),
      },
      {
        text: 'goal',
        native: 'maqsad',
        nativeI18n: L('목표', 'maqsad', 'goal', 'цель'),
      },
      {
        text: 'raise',
        native: 'pul yig‘moq',
        nativeI18n: L('모금하다', 'pul yig‘moq', 'raise', 'собирать деньги'),
      },
      {
        text: 'tour',
        native: 'sayohat',
        nativeI18n: L('여행', 'sayohat', 'tour', 'тур'),
      },
      {
        text: 'flight',
        native: 'parvoz',
        nativeI18n: L('항공편', 'parvoz', 'flight', 'рейс'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['projects', 'listening'],
  },

  en_s1u10_n1_035_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'mountain',
    choices: [
      { text: 'environment', label: '🌍', emoji: '🌍', imageUrl: '' },
      { text: 'scientist', label: '🔬', emoji: '🔬', imageUrl: '' },
      { text: 'mountain', label: '🏔️', emoji: '🏔️', imageUrl: '' },
      { text: 'goal', label: '🎯', emoji: '🎯', imageUrl: '' },
    ],
    answerTranslation: L('산', 'tog‘', 'mountain', 'гора'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['mountain'],
  },

  en_s1u10_n1_036_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'They ___ going to take mobile phones.',
    blankAnswers: ["aren't"],
    options: ["aren't", "isn't", 'am not', "didn't"],
    answer: "aren't",
    answerTranslation: L(
      '그들은 휴대전화를 가져가지 않을 거예요.',
      'Ular telefonlarini olib bormoqchi emas.',
      'They aren’t going to take mobile phones.',
      'Они не собираются брать мобильные телефоны.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['negative', 'arent'],
  },

  en_s1u10_n1_037_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'He ',
    sentenceSuffix: ' going to do this as a holiday.',
    answer: "isn't",
    answerTranslation: L(
      '그는 이것을 휴가로 하려는 게 아니에요.',
      'U buni ta’til sifatida qilmoqchi emas.',
      'He isn’t going to do this as a holiday.',
      'Он не собирается делать это как отпуск.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Use the negative form "isn’t".',
      acceptedAnswers: ['is not'],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'isnt'],
  },

  en_s1u10_n1_038_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'mountains',
      'work',
      'The',
      'going',
      'group',
      'to',
      'is',
      'in',
      'the',
      'worked',
    ],
    answer: 'The group is going to work in the mountains',
    audioText: 'The group is going to work in the mountains.',
    answerTranslation: L(
      '그 그룹은 산에서 일할 거예요.',
      'Guruh tog‘larda ishlamoqchi.',
      'The group is going to work in the mountains.',
      'Группа собирается работать в горах.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['mountain', 'going-to'],
  },

  en_s1u10_n1_039_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What are the scientists going to study?',
    options: [
      'They',
      'are',
      'going',
      'to',
      'study',
      'the',
      'environment',
      'tour',
      'flight',
    ],
    answer: 'They are going to study the environment',
    answerTranslation: L(
      '그들은 환경을 연구할 거예요.',
      'Ular atrof-muhitni o‘rganmoqchi.',
      'They are going to study the environment.',
      'Они собираются изучать окружающую среду.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['environment', 'reply'],
  },

  en_s1u10_n1_040_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Is Shaun going to write about the trip?' },
    ],
    options: [
      'Yes, he is going to write a blog.',
      'No, he wrote it last year.',
      'Yes, he is going to buy a hotel.',
      'No, he is going to sing in Europe.',
    ],
    answer: 'Yes, he is going to write a blog.',
    answerTranslation: L(
      '네, 그는 블로그를 쓸 거예요.',
      'Ha, u blog yozmoqchi.',
      'Yes, he is going to write a blog.',
      'Да, он собирается вести блог.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['going-to', 'dialog'],
  },

  // ===========================================================
  // Lesson 3 · Future time expressions
  // ===========================================================

  en_s1u10_n1_041_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I am going to study this evening.',
    audioText: 'I am going to study this evening.',
    answerTranslation: L(
      '저는 오늘 저녁에 공부할 거예요.',
      'Men bugun kechqurun o‘qimoqchiman.',
      'I am going to study this evening.',
      'Я собираюсь учиться сегодня вечером.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['future-time', 'going-to'],
  },

  en_s1u10_n1_042_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'goal',
    choices: [
      { text: 'flight', label: '✈️', emoji: '✈️', imageUrl: '' },
      { text: 'goal', label: '🎯', emoji: '🎯', imageUrl: '' },
      { text: 'project', label: '📋', emoji: '📋', imageUrl: '' },
      { text: 'mountain', label: '🏔️', emoji: '🏔️', imageUrl: '' },
    ],
    answerTranslation: L('목표', 'maqsad', 'goal', 'цель'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['goal'],
  },

  en_s1u10_n1_043_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'project',
        native: 'loyiha',
        nativeI18n: L('프로젝트', 'loyiha', 'project', 'проект'),
      },
      {
        text: 'volunteer',
        native: 'ko‘ngilli',
        nativeI18n: L('자원봉사자', 'ko‘ngilli', 'volunteer', 'волонтёр'),
      },
      {
        text: 'goal',
        native: 'maqsad',
        nativeI18n: L('목표', 'maqsad', 'goal', 'цель'),
      },
      {
        text: 'flight',
        native: 'parvoz',
        nativeI18n: L('항공편', 'parvoz', 'flight', 'рейс'),
      },
      {
        text: 'tour',
        native: 'sayohat',
        nativeI18n: L('여행', 'sayohat', 'tour', 'тур'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['future-project', 'matching'],
  },

  en_s1u10_n1_044_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'evening',
      'study',
      'I',
      'going',
      'this',
      'to',
      'am',
      'tomorrow',
      'studied',
    ],
    answer: 'I am going to study this evening',
    answerTranslation: L(
      '저는 오늘 저녁에 공부할 거예요.',
      'Men bugun kechqurun o‘qimoqchiman.',
      'I am going to study this evening.',
      'Я собираюсь учиться сегодня вечером.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['future-time', 'going-to'],
  },

  en_s1u10_n1_045_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'tomorrow',
      'going',
      'passport',
      'my',
      'get',
      'I',
      'to',
      'am',
      'got',
    ],
    answer: 'I am going to get my passport tomorrow',
    audioText: 'I am going to get my passport tomorrow.',
    answerTranslation: L(
      '저는 내일 여권을 받을 거예요.',
      'Men ertaga pasportimni olmoqchiman.',
      'I am going to get my passport tomorrow.',
      'Я собираюсь получить паспорт завтра.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['tomorrow', 'going-to'],
  },

  en_s1u10_n1_046_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'project',
        native: 'loyiha',
        nativeI18n: L('프로젝트', 'loyiha', 'project', 'проект'),
      },
      {
        text: 'volunteer',
        native: 'ko‘ngilli',
        nativeI18n: L('자원봉사자', 'ko‘ngilli', 'volunteer', 'волонтёр'),
      },
      {
        text: 'goal',
        native: 'maqsad',
        nativeI18n: L('목표', 'maqsad', 'goal', 'цель'),
      },
      {
        text: 'flight',
        native: 'parvoz',
        nativeI18n: L('항공편', 'parvoz', 'flight', 'рейс'),
      },
      {
        text: 'tour',
        native: 'sayohat',
        nativeI18n: L('여행', 'sayohat', 'tour', 'тур'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['future-project', 'listening'],
  },

  en_s1u10_n1_047_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I am going to study this ',
    sentenceSuffix: '.',
    answer: 'evening',
    answerTranslation: L(
      '저는 오늘 저녁에 공부할 거예요.',
      'Men bugun kechqurun o‘qimoqchiman.',
      'I am going to study this evening.',
      'Я собираюсь учиться сегодня вечером.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "evening".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['typing', 'future-time'],
  },

  en_s1u10_n1_048_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'project',
    choices: [
      { text: 'goal', label: '🎯', emoji: '🎯', imageUrl: '' },
      { text: 'flight', label: '✈️', emoji: '✈️', imageUrl: '' },
      { text: 'project', label: '📋', emoji: '📋', imageUrl: '' },
      { text: 'volunteer', label: '🙋', emoji: '🙋', imageUrl: '' },
    ],
    answerTranslation: L('프로젝트', 'loyiha', 'project', 'проект'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['project'],
  },

  en_s1u10_n1_049_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'We are going to travel next month.',
    audioText: 'We are going to travel next month.',
    answerI18n: L(
      '우리는 다음 달에 여행할 거예요',
      'Biz kelasi oy sayohat qilmoqchimiz',
      'We are going to travel next month',
      'Мы собираемся путешествовать в следующем месяце',
    ),
    options: [
      'We',
      'are',
      'going',
      'to',
      'travel',
      'next',
      'month',
      'travelled',
    ],
    optionsI18n: {
      ko: ['우리는', '다음', '달에', '여행할', '거예요'],
      uz: ['Biz', 'kelasi', 'oy', 'sayohat', 'qilmoqchimiz'],
      en: ['We', 'are', 'going', 'to', 'travel', 'next', 'month'],
      ru: ['Мы', 'собираемся', 'путешествовать', 'в', 'следующем', 'месяце'],
    },
    answerTranslation: L(
      '우리는 다음 달에 여행할 거예요.',
      'Biz kelasi oy sayohat qilmoqchimiz.',
      'We are going to travel next month.',
      'Мы собираемся путешествовать в следующем месяце.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['future-time', 'next-month'],
  },

  en_s1u10_n1_050_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What are you going to do this evening?',
    options: ['I', 'am', 'going', 'to', 'study', 'this', 'evening', 'studied'],
    answer: 'I am going to study this evening',
    answerTranslation: L(
      '저는 오늘 저녁에 공부할 거예요.',
      'Men bugun kechqurun o‘qimoqchiman.',
      'I am going to study this evening.',
      'Я собираюсь учиться сегодня вечером.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['future-time', 'reply'],
  },

  en_s1u10_n1_051_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'We are going to travel next ',
    sentenceSuffix: '.',
    answer: 'month',
    answerTranslation: L(
      '우리는 다음 달에 여행할 거예요.',
      'Biz kelasi oy sayohat qilmoqchimiz.',
      'We are going to travel next month.',
      'Мы собираемся путешествовать в следующем месяце.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "month".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['typing', 'future-time'],
  },

  en_s1u10_n1_052_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'raise',
        native: 'pul yig‘moq',
        nativeI18n: L('모금하다', 'pul yig‘moq', 'raise', 'собирать деньги'),
      },
      {
        text: 'organization',
        native: 'tashkilot',
        nativeI18n: L('단체', 'tashkilot', 'organization', 'организация'),
      },
      {
        text: 'environment',
        native: 'atrof-muhit',
        nativeI18n: L('환경', 'atrof-muhit', 'environment', 'окружающая среда'),
      },
      {
        text: 'scientist',
        native: 'olim',
        nativeI18n: L('과학자', 'olim', 'scientist', 'учёный'),
      },
      {
        text: 'mountain',
        native: 'tog‘',
        nativeI18n: L('산', 'tog‘', 'mountain', 'гора'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['projects', 'matching'],
  },

  en_s1u10_n1_053_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'year',
      'come',
      'going',
      'next',
      'home',
      'I',
      'to',
      'am',
      'tomorrow',
    ],
    answer: 'I am going to come home next year',
    answerTranslation: L(
      '저는 내년에 집으로 돌아올 거예요.',
      'Men kelasi yili uyga qaytmoqchiman.',
      'I am going to come home next year.',
      'Я собираюсь вернуться домой в следующем году.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['future-time', 'next-year'],
  },

  en_s1u10_n1_054_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'raise',
        native: 'pul yig‘moq',
        nativeI18n: L('모금하다', 'pul yig‘moq', 'raise', 'собирать деньги'),
      },
      {
        text: 'organization',
        native: 'tashkilot',
        nativeI18n: L('단체', 'tashkilot', 'organization', 'организация'),
      },
      {
        text: 'environment',
        native: 'atrof-muhit',
        nativeI18n: L('환경', 'atrof-muhit', 'environment', 'окружающая среда'),
      },
      {
        text: 'scientist',
        native: 'olim',
        nativeI18n: L('과학자', 'olim', 'scientist', 'учёный'),
      },
      {
        text: 'mountain',
        native: 'tog‘',
        nativeI18n: L('산', 'tog‘', 'mountain', 'гора'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['projects', 'listening'],
  },

  en_s1u10_n1_055_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'organization',
    choices: [
      { text: 'scientist', label: '🔬', emoji: '🔬', imageUrl: '' },
      { text: 'goal', label: '🎯', emoji: '🎯', imageUrl: '' },
      { text: 'organization', label: '🤝', emoji: '🤝', imageUrl: '' },
      { text: 'mountain', label: '🏔️', emoji: '🏔️', imageUrl: '' },
    ],
    answerTranslation: L('단체', 'tashkilot', 'organization', 'организация'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['organization'],
  },

  en_s1u10_n1_056_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I am going to study ___ evening.',
    blankAnswers: ['this'],
    options: ['this', 'next', 'ago', 'last'],
    answer: 'this',
    answerTranslation: L(
      '저는 오늘 저녁에 공부할 거예요.',
      'Men bugun kechqurun o‘qimoqchiman.',
      'I am going to study this evening.',
      'Я собираюсь учиться сегодня вечером.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['future-time'],
  },

  en_s1u10_n1_057_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I am going to leave ',
    sentenceSuffix: '.',
    answer: 'tomorrow',
    answerTranslation: L(
      '저는 내일 떠날 거예요.',
      'Men ertaga ketmoqchiman.',
      'I am going to leave tomorrow.',
      'Я собираюсь уехать завтра.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "tomorrow".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['typing', 'tomorrow'],
  },

  en_s1u10_n1_058_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'week',
      'course',
      'going',
      'Spanish',
      'start',
      'I',
      'to',
      'am',
      'next',
      'started',
    ],
    answer: 'I am going to start a Spanish course next week',
    audioText: 'I am going to start a Spanish course next week.',
    answerTranslation: L(
      '저는 다음 주에 스페인어 과정을 시작할 거예요.',
      'Men kelasi hafta ispan tili kursini boshlamoqchiman.',
      'I am going to start a Spanish course next week.',
      'Я собираюсь начать курс испанского на следующей неделе.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['future-time', 'next-week'],
  },

  en_s1u10_n1_059_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'When are you going to start the course?',
    options: ['I', 'am', 'going', 'to', 'start', 'it', 'next', 'week', 'ago'],
    answer: 'I am going to start it next week',
    answerTranslation: L(
      '다음 주에 시작할 거예요.',
      'Men uni kelasi hafta boshlamoqchiman.',
      'I am going to start it next week.',
      'Я собираюсь начать его на следующей неделе.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['future-time', 'reply'],
  },

  en_s1u10_n1_060_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'What are you going to do tomorrow?' },
    ],
    options: [
      'I’m going to get my passport.',
      'I got my passport yesterday.',
      'I’m not yesterday passport.',
      'I did going to get my passport.',
    ],
    answer: 'I’m going to get my passport.',
    answerTranslation: L(
      '여권을 받을 거예요.',
      'Men pasportimni olmoqchiman.',
      'I’m going to get my passport.',
      'Я собираюсь получить паспорт.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['future-time', 'dialog'],
  },

  // ===========================================================
  // Lesson 4 · Future projects
  // ===========================================================

  en_s1u10_n1_061_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I am going to be a volunteer next summer.',
    audioText: 'I am going to be a volunteer next summer.',
    answerTranslation: L(
      '저는 내년 여름에 자원봉사자가 될 거예요.',
      'Men kelasi yozda ko‘ngilli bo‘lmoqchiman.',
      'I am going to be a volunteer next summer.',
      'Следующим летом я собираюсь стать волонтёром.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['volunteer', 'future-project'],
  },

  en_s1u10_n1_062_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'renovation',
    choices: [
      { text: 'equipment', label: '🛠️', emoji: '🛠️', imageUrl: '' },
      { text: 'renovation', label: '🔨', emoji: '🔨', imageUrl: '' },
      { text: 'goal', label: '🎯', emoji: '🎯', imageUrl: '' },
      { text: 'flight', label: '✈️', emoji: '✈️', imageUrl: '' },
    ],
    answerTranslation: L('보수 공사', 'ta’mirlash', 'renovation', 'ремонт'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['renovation'],
  },

  en_s1u10_n1_063_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'volunteer',
        native: 'ko‘ngilli',
        nativeI18n: L('자원봉사자', 'ko‘ngilli', 'volunteer', 'волонтёр'),
      },
      {
        text: 'goal',
        native: 'maqsad',
        nativeI18n: L('목표', 'maqsad', 'goal', 'цель'),
      },
      {
        text: 'renovation',
        native: 'ta’mirlash',
        nativeI18n: L('보수 공사', 'ta’mirlash', 'renovation', 'ремонт'),
      },
      {
        text: 'equipment',
        native: 'jihoz',
        nativeI18n: L('장비', 'jihoz', 'equipment', 'оборудование'),
      },
      {
        text: 'project',
        native: 'loyiha',
        nativeI18n: L('프로젝트', 'loyiha', 'project', 'проект'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['future-project', 'matching'],
  },

  en_s1u10_n1_064_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'summer',
      'volunteer',
      'be',
      'I',
      'going',
      'a',
      'next',
      'to',
      'am',
      'was',
    ],
    answer: 'I am going to be a volunteer next summer',
    answerTranslation: L(
      '저는 내년 여름에 자원봉사자가 될 거예요.',
      'Men kelasi yozda ko‘ngilli bo‘lmoqchiman.',
      'I am going to be a volunteer next summer.',
      'Следующим летом я собираюсь стать волонтёром.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['volunteer', 'going-to'],
  },

  en_s1u10_n1_065_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'schools',
      'build',
      'new',
      'going',
      'They',
      'to',
      'are',
      'built',
      'hospitals',
    ],
    answer: 'They are going to build new schools',
    audioText: 'They are going to build new schools.',
    answerTranslation: L(
      '그들은 새 학교를 지을 거예요.',
      'Ular yangi maktablar qurmoqchi.',
      'They are going to build new schools.',
      'Они собираются строить новые школы.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['volunteer-project', 'build'],
  },

  en_s1u10_n1_066_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'volunteer',
        native: 'ko‘ngilli',
        nativeI18n: L('자원봉사자', 'ko‘ngilli', 'volunteer', 'волонтёр'),
      },
      {
        text: 'goal',
        native: 'maqsad',
        nativeI18n: L('목표', 'maqsad', 'goal', 'цель'),
      },
      {
        text: 'renovation',
        native: 'ta’mirlash',
        nativeI18n: L('보수 공사', 'ta’mirlash', 'renovation', 'ремонт'),
      },
      {
        text: 'equipment',
        native: 'jihoz',
        nativeI18n: L('장비', 'jihoz', 'equipment', 'оборудование'),
      },
      {
        text: 'project',
        native: 'loyiha',
        nativeI18n: L('프로젝트', 'loyiha', 'project', 'проект'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['future-project', 'listening'],
  },

  en_s1u10_n1_067_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I am going to be a ',
    sentenceSuffix: ' next summer.',
    answer: 'volunteer',
    answerTranslation: L(
      '저는 내년 여름에 자원봉사자가 될 거예요.',
      'Men kelasi yozda ko‘ngilli bo‘lmoqchiman.',
      'I am going to be a volunteer next summer.',
      'Следующим летом я собираюсь стать волонтёром.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "volunteer".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'volunteer'],
  },

  en_s1u10_n1_068_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'equipment',
    choices: [
      { text: 'goal', label: '🎯', emoji: '🎯', imageUrl: '' },
      { text: 'renovation', label: '🔨', emoji: '🔨', imageUrl: '' },
      { text: 'equipment', label: '🛠️', emoji: '🛠️', imageUrl: '' },
      { text: 'project', label: '📋', emoji: '📋', imageUrl: '' },
    ],
    answerTranslation: L('장비', 'jihoz', 'equipment', 'оборудование'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['equipment'],
  },

  en_s1u10_n1_069_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'They are going to paint and clean the classrooms.',
    audioText: 'They are going to paint and clean the classrooms.',
    answerI18n: L(
      '그들은 교실을 페인트칠하고 청소할 거예요',
      'Ular sinfxonalarni bo‘yab va tozalamoqchi',
      'They are going to paint and clean the classrooms',
      'Они собираются покрасить и убрать классы',
    ),
    options: [
      'They',
      'are',
      'going',
      'to',
      'paint',
      'and',
      'clean',
      'the',
      'classrooms',
      'painted',
    ],
    optionsI18n: {
      ko: ['그들은', '교실을', '페인트칠하고', '청소할', '거예요'],
      uz: ['Ular', 'sinfxonalarni', 'bo‘yab', 'va', 'tozalamoqchi'],
      en: [
        'They',
        'are',
        'going',
        'to',
        'paint',
        'and',
        'clean',
        'the',
        'classrooms',
      ],
      ru: ['Они', 'собираются', 'покрасить', 'и', 'убрать', 'классы'],
    },
    answerTranslation: L(
      '그들은 교실을 페인트칠하고 청소할 거예요.',
      'Ular sinfxonalarni bo‘yab va tozalamoqchi.',
      'They are going to paint and clean the classrooms.',
      'Они собираются покрасить и убрать классы.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['volunteer-project', 'future'],
  },

  en_s1u10_n1_070_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What are the volunteers going to do?',
    options: [
      'They',
      'are',
      'going',
      'to',
      'paint',
      'the',
      'classrooms',
      'travel',
      'Europe',
    ],
    answer: 'They are going to paint the classrooms',
    answerTranslation: L(
      '그들은 교실을 페인트칠할 거예요.',
      'Ular sinfxonalarni bo‘yamoqchi.',
      'They are going to paint the classrooms.',
      'Они собираются покрасить классы.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['volunteer-project', 'reply'],
  },

  en_s1u10_n1_071_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Their ',
    sentenceSuffix: ' is forty thousand dollars.',
    answer: 'goal',
    answerTranslation: L(
      '그들의 목표는 4만 달러예요.',
      'Ularning maqsadi qirq ming dollar.',
      'Their goal is forty thousand dollars.',
      'Их цель — сорок тысяч долларов.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "goal".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'goal'],
  },

  en_s1u10_n1_072_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'renovation',
        native: 'ta’mirlash',
        nativeI18n: L('보수 공사', 'ta’mirlash', 'renovation', 'ремонт'),
      },
      {
        text: 'equipment',
        native: 'jihoz',
        nativeI18n: L('장비', 'jihoz', 'equipment', 'оборудование'),
      },
      {
        text: 'organization',
        native: 'tashkilot',
        nativeI18n: L('단체', 'tashkilot', 'organization', 'организация'),
      },
      {
        text: 'environment',
        native: 'atrof-muhit',
        nativeI18n: L('환경', 'atrof-muhit', 'environment', 'окружающая среда'),
      },
      {
        text: 'goal',
        native: 'maqsad',
        nativeI18n: L('목표', 'maqsad', 'goal', 'цель'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['project-review', 'matching'],
  },

  en_s1u10_n1_073_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'equipment',
      'for',
      'renovations',
      'pay',
      'going',
      'They',
      'to',
      'are',
      'and',
      'project',
    ],
    answer: 'They are going to pay for renovations and equipment',
    answerTranslation: L(
      '그들은 보수 공사와 장비 비용을 낼 거예요.',
      'Ular ta’mirlash va jihozlar uchun pul to‘lamoqchi.',
      'They are going to pay for renovations and equipment.',
      'Они собираются оплатить ремонт и оборудование.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['renovation', 'equipment'],
  },

  en_s1u10_n1_074_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'renovation',
        native: 'ta’mirlash',
        nativeI18n: L('보수 공사', 'ta’mirlash', 'renovation', 'ремонт'),
      },
      {
        text: 'equipment',
        native: 'jihoz',
        nativeI18n: L('장비', 'jihoz', 'equipment', 'оборудование'),
      },
      {
        text: 'organization',
        native: 'tashkilot',
        nativeI18n: L('단체', 'tashkilot', 'organization', 'организация'),
      },
      {
        text: 'environment',
        native: 'atrof-muhit',
        nativeI18n: L('환경', 'atrof-muhit', 'environment', 'окружающая среда'),
      },
      {
        text: 'goal',
        native: 'maqsad',
        nativeI18n: L('목표', 'maqsad', 'goal', 'цель'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['project-review', 'listening'],
  },

  en_s1u10_n1_075_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'goal',
    choices: [
      { text: 'equipment', label: '🛠️', emoji: '🛠️', imageUrl: '' },
      { text: 'project', label: '📋', emoji: '📋', imageUrl: '' },
      { text: 'goal', label: '🎯', emoji: '🎯', imageUrl: '' },
      { text: 'flight', label: '✈️', emoji: '✈️', imageUrl: '' },
    ],
    answerTranslation: L('목표', 'maqsad', 'goal', 'цель'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['goal'],
  },

  en_s1u10_n1_076_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'They are going to ___ new schools.',
    blankAnswers: ['build'],
    options: ['build', 'built', 'building', 'builds'],
    answer: 'build',
    answerTranslation: L(
      '그들은 새 학교를 지을 거예요.',
      'Ular yangi maktablar qurmoqchi.',
      'They are going to build new schools.',
      'Они собираются строить новые школы.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['going-to', 'base-verb'],
  },

  en_s1u10_n1_077_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'The cafe needs new ',
    sentenceSuffix: '.',
    answer: 'equipment',
    answerTranslation: L(
      '그 카페는 새 장비가 필요해요.',
      'Kafega yangi jihozlar kerak.',
      'The cafe needs new equipment.',
      'Кафе нужно новое оборудование.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "equipment".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'equipment'],
  },

  en_s1u10_n1_078_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'eight',
      'cafe',
      'open',
      'The',
      'going',
      'months',
      'to',
      'is',
      'in',
      'closed',
    ],
    answer: 'The cafe is going to open in eight months',
    audioText: 'The cafe is going to open in eight months.',
    answerTranslation: L(
      '그 카페는 8개월 후에 문을 열 거예요.',
      'Kafe sakkiz oydan keyin ochilmoqchi.',
      'The cafe is going to open in eight months.',
      'Кафе собирается открыться через восемь месяцев.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['future-project', 'going-to'],
  },

  en_s1u10_n1_079_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What is the goal of the cafe project?',
    options: [
      'The',
      'goal',
      'is',
      'forty',
      'thousand',
      'dollars',
      'five',
      'hundred',
    ],
    answer: 'The goal is forty thousand dollars',
    answerTranslation: L(
      '목표는 4만 달러예요.',
      'Maqsad qirq ming dollar.',
      'The goal is forty thousand dollars.',
      'Цель — сорок тысяч долларов.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['goal', 'reply'],
  },

  en_s1u10_n1_080_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'What are they going to do with the money?' },
    ],
    options: [
      'They are going to pay for renovations and equipment.',
      'They paid for a tour yesterday.',
      'They are going to travel around Europe.',
      'They are not going to open the cafe.',
    ],
    answer: 'They are going to pay for renovations and equipment.',
    answerTranslation: L(
      '그들은 보수 공사와 장비 비용을 낼 거예요.',
      'Ular ta’mirlash va jihozlar uchun pul to‘lamoqchi.',
      'They are going to pay for renovations and equipment.',
      'Они собираются оплатить ремонт и оборудование.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['future-project', 'final'],
  },
};

export const EN_S1_UNIT10_NODE1 = {
  title: L(
    '우리는 5천 파운드를 모을 거예요',
    'Biz 5 000 funt yig‘moqchimiz',
    'We’re going to raise £5,000',
    'Мы собираемся собрать £5 000',
  ),
  section: 1,
  unit: 10,
  order: 1,
  isActive: true,

  lessons: [
    {
      title: L(
        '미래 계획',
        'Kelajak rejalari',
        'Future plans',
        'Планы на будущее',
      ),
      description: L(
        'am, is, are going to와 동사원형을 사용해 앞으로 할 일을 말해요.',
        'Am, is, are going to va fe’lning asosiy shakli bilan kelajak rejalari haqida gapirasiz.',
        'Use am, is and are going to with a base verb to talk about future plans.',
        'Используем am, is, are going to и начальную форму глагола для планов на будущее.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 1,
      questions: [
        'en_s1u10_n1_001_speaking',
        'en_s1u10_n1_002_image_choice',
        'en_s1u10_n1_003_word_matching',
        'en_s1u10_n1_004_translate_builder',
        'en_s1u10_n1_005_word_arrange',
        'en_s1u10_n1_006_audio_match',
        'en_s1u10_n1_007_type_answer',
        'en_s1u10_n1_008_image_choice',
        'en_s1u10_n1_009_sentence_builder',
        'en_s1u10_n1_010_reply_builder',
        'en_s1u10_n1_011_type_answer',
        'en_s1u10_n1_012_word_matching',
        'en_s1u10_n1_013_translate_builder',
        'en_s1u10_n1_014_audio_match',
        'en_s1u10_n1_015_image_choice',
        'en_s1u10_n1_016_fill_in_blank',
        'en_s1u10_n1_017_type_answer',
        'en_s1u10_n1_018_word_arrange',
        'en_s1u10_n1_019_reply_builder',
        'en_s1u10_n1_020_dialog_complete',
      ],
    },

    {
      title: L(
        '할 일과 하지 않을 일',
        'Qiladigan va qilmaydigan ishlar',
        'Positive and negative plans',
        'Положительные и отрицательные планы',
      ),
      description: L(
        'going to의 긍정문과 부정문을 사용해 앞으로 할 일과 하지 않을 일을 구분해서 말해요.',
        'Going to ning tasdiq va inkor shakllari bilan qiladigan va qilmaydigan ishlaringizni aytasiz.',
        'Use positive and negative going to forms to say what people plan and do not plan to do.',
        'Используем утвердительные и отрицательные формы going to для будущих планов.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 2,
      questions: [
        'en_s1u10_n1_021_speaking',
        'en_s1u10_n1_022_image_choice',
        'en_s1u10_n1_023_word_matching',
        'en_s1u10_n1_024_translate_builder',
        'en_s1u10_n1_025_word_arrange',
        'en_s1u10_n1_026_audio_match',
        'en_s1u10_n1_027_type_answer',
        'en_s1u10_n1_028_image_choice',
        'en_s1u10_n1_029_sentence_builder',
        'en_s1u10_n1_030_reply_builder',
        'en_s1u10_n1_031_type_answer',
        'en_s1u10_n1_032_word_matching',
        'en_s1u10_n1_033_translate_builder',
        'en_s1u10_n1_034_audio_match',
        'en_s1u10_n1_035_image_choice',
        'en_s1u10_n1_036_fill_in_blank',
        'en_s1u10_n1_037_type_answer',
        'en_s1u10_n1_038_word_arrange',
        'en_s1u10_n1_039_reply_builder',
        'en_s1u10_n1_040_dialog_complete',
      ],
    },

    {
      title: L(
        '미래 시간 표현',
        'Kelajak vaqt iboralari',
        'Future time expressions',
        'Выражения будущего времени',
      ),
      description: L(
        '오늘 저녁, 내일, 다음 주, 다음 달, 내년처럼 미래 계획과 함께 자주 쓰는 시간 표현을 연습해요.',
        'Bugun kechqurun, ertaga, kelasi hafta, kelasi oy va kelasi yil kabi vaqt iboralarini mashq qilasiz.',
        'Practise future plans with expressions such as this evening, tomorrow, next week, next month and next year.',
        'Практикуем планы с выражениями this evening, tomorrow, next week, next month и next year.',
      ),
      category: LessonCategory.EXPRESSION,
      level: LV,
      order: 3,
      questions: [
        'en_s1u10_n1_041_speaking',
        'en_s1u10_n1_042_image_choice',
        'en_s1u10_n1_043_word_matching',
        'en_s1u10_n1_044_translate_builder',
        'en_s1u10_n1_045_word_arrange',
        'en_s1u10_n1_046_audio_match',
        'en_s1u10_n1_047_type_answer',
        'en_s1u10_n1_048_image_choice',
        'en_s1u10_n1_049_sentence_builder',
        'en_s1u10_n1_050_reply_builder',
        'en_s1u10_n1_051_type_answer',
        'en_s1u10_n1_052_word_matching',
        'en_s1u10_n1_053_translate_builder',
        'en_s1u10_n1_054_audio_match',
        'en_s1u10_n1_055_image_choice',
        'en_s1u10_n1_056_fill_in_blank',
        'en_s1u10_n1_057_type_answer',
        'en_s1u10_n1_058_word_arrange',
        'en_s1u10_n1_059_reply_builder',
        'en_s1u10_n1_060_dialog_complete',
      ],
    },

    {
      title: L(
        '미래 프로젝트',
        'Kelajak loyihalari',
        'Future projects',
        'Будущие проекты',
      ),
      description: L(
        '봉사, 학교 건설, 카페 보수 같은 실제 프로젝트를 통해 목표와 앞으로 할 일을 설명해요.',
        'Ko‘ngillilik, maktab qurish va kafeni ta’mirlash kabi loyihalar orqali maqsad va rejalarni aytasiz.',
        'Describe goals and future actions through volunteer, school-building and cafe renovation projects.',
        'Говорим о целях и будущих действиях на примере волонтёрских и других проектов.',
      ),
      category: LessonCategory.EXPRESSION,
      level: LV,
      order: 4,
      questions: [
        'en_s1u10_n1_061_speaking',
        'en_s1u10_n1_062_image_choice',
        'en_s1u10_n1_063_word_matching',
        'en_s1u10_n1_064_translate_builder',
        'en_s1u10_n1_065_word_arrange',
        'en_s1u10_n1_066_audio_match',
        'en_s1u10_n1_067_type_answer',
        'en_s1u10_n1_068_image_choice',
        'en_s1u10_n1_069_sentence_builder',
        'en_s1u10_n1_070_reply_builder',
        'en_s1u10_n1_071_type_answer',
        'en_s1u10_n1_072_word_matching',
        'en_s1u10_n1_073_translate_builder',
        'en_s1u10_n1_074_audio_match',
        'en_s1u10_n1_075_image_choice',
        'en_s1u10_n1_076_fill_in_blank',
        'en_s1u10_n1_077_type_answer',
        'en_s1u10_n1_078_word_arrange',
        'en_s1u10_n1_079_reply_builder',
        'en_s1u10_n1_080_dialog_complete',
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Section 1 · Unit 10 · Node 2
// 10.2 A new life
//
// Coverage
// - life changes
// - buy a house
// - change jobs
// - finish school
// - have a baby
// - learn a new language
// - move abroad
// - probably / probably not
// - going to questions
// - Am I going to ...?
// - Is he/she going to ...?
// - Are we/you/they going to ...?
// - short answers
// - Yes, I am. / No, I'm not.
// - Yes, he is. / No, he isn't.
// - Yes, they are. / No, they aren't.
// - Wh- questions with going to
// - Where / When / Who / What
// - prepositions of time
// - in + months / seasons / years
// - on + days / dates
// - at + times / weekend / night
//
// IMPORTANT:
// *_WORDS에는 무조건 단어 하나만 등록.
// "move abroad", "change jobs", "have a baby",
// "next week", "at the weekend" 같은 구/문장은 등록 금지.
//
// 4 lessons × 20 questions = 80
// type_answer: 3 per lesson
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT10_NODE2_WORDS = [
  {
    code: 'en-adverb-abroad',
    english: 'abroad',
    senseKey: 'in-or-to-another-country',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L(
      '해외로; 외국에서',
      'chet elga; chet elda',
      'in or to another country',
      'за границей; за границу',
    ),
    examples: [
      {
        english: 'They are going to move abroad.',
        translations: L(
          '그들은 해외로 이사할 거예요.',
          'Ular chet elga ko‘chib ketmoqchi.',
          'They are going to move abroad.',
          'Они собираются переехать за границу.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/əˈbrɔːd/',
      ttsText: 'abroad',
    },
    media: {
      emoji: '🌍',
      imageUrl: '',
      imageAlt: L(
        '해외로 가는 여행',
        'chet elga sayohat',
        'moving or travelling abroad',
        'переезд или поездка за границу',
      ),
    },
    tags: ['travel', 'life-change'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adverb-probably',
    english: 'probably',
    senseKey: 'very-likely-to-happen',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L(
      '아마; 아마도',
      'ehtimol',
      'used when something is likely to happen or be true',
      'вероятно; скорее всего',
    ),
    examples: [
      {
        english: 'He is probably going to change jobs.',
        translations: L(
          '그는 아마 직업을 바꿀 거예요.',
          'U ehtimol ishini o‘zgartirmoqchi.',
          'He is probably going to change jobs.',
          'Он, вероятно, собирается сменить работу.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈprɒbəbli/',
      ttsText: 'probably',
    },
    media: {
      emoji: '🤔',
      imageUrl: '',
      imageAlt: L(
        '가능성을 생각하는 사람',
        'ehtimol haqida o‘ylayotgan odam',
        'someone thinking about a likely plan',
        'человек, размышляющий о вероятном плане',
      ),
    },
    tags: ['future', 'adverbs'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-baby',
    english: 'baby',
    senseKey: 'very-young-child',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('아기', 'chaqaloq', 'a very young child', 'младенец'),
    examples: [
      {
        english: 'They are going to have a baby.',
        translations: L(
          '그들은 아기를 낳을 예정이에요.',
          'Ularning farzandi tug‘ilmoqchi.',
          'They are going to have a baby.',
          'У них будет ребёнок.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈbeɪbi/',
      ttsText: 'baby',
    },
    media: {
      emoji: '👶',
      imageUrl: '',
      imageAlt: L('아기', 'chaqaloq', 'a baby', 'младенец'),
    },
    tags: ['family', 'life-change'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-job-engineer',
    english: 'engineer',
    senseKey: 'person-designing-or-building-machines-structures',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '엔지니어; 기술자',
      'muhandis',
      'a person whose job is to design or build machines, structures or systems',
      'инженер',
    ),
    examples: [
      {
        english: 'He hates being an engineer.',
        translations: L(
          '그는 엔지니어로 일하는 것을 싫어해요.',
          'U muhandis bo‘lib ishlashni yomon ko‘radi.',
          'He hates being an engineer.',
          'Он ненавидит работать инженером.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌendʒɪˈnɪə/',
      ttsText: 'engineer',
    },
    media: {
      emoji: '👷',
      imageUrl: '',
      imageAlt: L('엔지니어', 'muhandis', 'an engineer', 'инженер'),
    },
    tags: ['jobs', 'work'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-journey',
    english: 'journey',
    senseKey: 'travel-from-one-place-to-another',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '여정; 여행',
      'safar',
      'the act of travelling from one place to another',
      'путешествие; поездка',
    ),
    examples: [
      {
        english: 'Here is the information for your journey.',
        translations: L(
          '여행에 필요한 정보가 여기 있어요.',
          'Safaringiz uchun ma’lumot shu yerda.',
          'Here is the information for your journey.',
          'Вот информация для вашей поездки.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈdʒɜːni/',
      ttsText: 'journey',
    },
    media: {
      emoji: '🧳',
      imageUrl: '',
      imageAlt: L(
        '여행 가방과 여정',
        'safar va chamadon',
        'a journey',
        'путешествие',
      ),
    },
    tags: ['travel', 'plans'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-date',
    english: 'date',
    senseKey: 'particular-day-of-month-or-year',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('날짜', 'sana', 'a particular day of a month or year', 'дата'),
    examples: [
      {
        english: 'The date is the twentieth of July.',
        translations: L(
          '날짜는 7월 20일이에요.',
          'Sana yigirmanchi iyul.',
          'The date is the twentieth of July.',
          'Дата — двадцатое июля.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/deɪt/',
      ttsText: 'date',
    },
    media: {
      emoji: '📅',
      imageUrl: '',
      imageAlt: L(
        '달력의 날짜',
        'taqvimdagi sana',
        'a date on a calendar',
        'дата в календаре',
      ),
    },
    tags: ['time', 'calendar'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-problem',
    english: 'problem',
    senseKey: 'difficulty-that-needs-solution',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '문제; 어려움',
      'muammo',
      'a difficulty that needs to be solved',
      'проблема',
    ),
    examples: [
      {
        english: 'Please email me if you have any problems.',
        translations: L(
          '문제가 있으면 이메일을 보내 주세요.',
          'Muammo bo‘lsa, menga email yuboring.',
          'Please email me if you have any problems.',
          'Напишите мне, если возникнут проблемы.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈprɒbləm/',
      ttsText: 'problem',
    },
    media: {
      emoji: '⚠️',
      imageUrl: '',
      imageAlt: L(
        '문제를 나타내는 경고 표시',
        'muammo belgisi',
        'a problem warning',
        'знак проблемы',
      ),
    },
    tags: ['general', 'communication'],
    difficulty: 1,
    isCore: true,
  },
];

export const EN_S1_UNIT10_NODE2_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Life changes
  // ===========================================================

  en_s1u10_n2_001_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'They are going to move abroad.',
    audioText: 'They are going to move abroad.',
    answerTranslation: L(
      '그들은 해외로 이사할 거예요.',
      'Ular chet elga ko‘chib ketmoqchi.',
      'They are going to move abroad.',
      'Они собираются переехать за границу.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['life-change', 'abroad'],
  },

  en_s1u10_n2_002_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'baby',
    choices: [
      { text: 'house', label: '🏠', emoji: '🏠', imageUrl: '' },
      { text: 'baby', label: '👶', emoji: '👶', imageUrl: '' },
      { text: 'engineer', label: '👷', emoji: '👷', imageUrl: '' },
      { text: 'journey', label: '🧳', emoji: '🧳', imageUrl: '' },
    ],
    answerTranslation: L('아기', 'chaqaloq', 'baby', 'младенец'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['baby'],
  },

  en_s1u10_n2_003_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'abroad',
        native: 'chet elga',
        nativeI18n: L('해외로', 'chet elga', 'abroad', 'за границу'),
      },
      {
        text: 'probably',
        native: 'ehtimol',
        nativeI18n: L('아마', 'ehtimol', 'probably', 'вероятно'),
      },
      {
        text: 'baby',
        native: 'chaqaloq',
        nativeI18n: L('아기', 'chaqaloq', 'baby', 'младенец'),
      },
      {
        text: 'engineer',
        native: 'muhandis',
        nativeI18n: L('엔지니어', 'muhandis', 'engineer', 'инженер'),
      },
      {
        text: 'journey',
        native: 'safar',
        nativeI18n: L('여정', 'safar', 'journey', 'путешествие'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['life-change', 'matching'],
  },

  en_s1u10_n2_004_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'house',
      'going',
      'buy',
      'They',
      'to',
      'are',
      'a',
      'bought',
      'flat',
    ],
    answer: 'They are going to buy a house',
    answerTranslation: L(
      '그들은 집을 살 거예요.',
      'Ular uy sotib olmoqchi.',
      'They are going to buy a house.',
      'Они собираются купить дом.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['life-change', 'house'],
  },

  en_s1u10_n2_005_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'jobs',
      'change',
      'going',
      'He',
      'to',
      'is',
      'job',
      'changed',
      'school',
    ],
    answer: 'He is going to change jobs',
    audioText: 'He is going to change jobs.',
    answerTranslation: L(
      '그는 직업을 바꿀 거예요.',
      'U ishini o‘zgartirmoqchi.',
      'He is going to change jobs.',
      'Он собирается сменить работу.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['life-change', 'jobs'],
  },

  en_s1u10_n2_006_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'abroad',
        native: 'chet elga',
        nativeI18n: L('해외로', 'chet elga', 'abroad', 'за границу'),
      },
      {
        text: 'probably',
        native: 'ehtimol',
        nativeI18n: L('아마', 'ehtimol', 'probably', 'вероятно'),
      },
      {
        text: 'baby',
        native: 'chaqaloq',
        nativeI18n: L('아기', 'chaqaloq', 'baby', 'младенец'),
      },
      {
        text: 'engineer',
        native: 'muhandis',
        nativeI18n: L('엔지니어', 'muhandis', 'engineer', 'инженер'),
      },
      {
        text: 'journey',
        native: 'safar',
        nativeI18n: L('여정', 'safar', 'journey', 'путешествие'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['life-change', 'listening'],
  },

  en_s1u10_n2_007_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'They are going to move ',
    sentenceSuffix: '.',
    answer: 'abroad',
    answerTranslation: L(
      '그들은 해외로 이사할 거예요.',
      'Ular chet elga ko‘chib ketmoqchi.',
      'They are going to move abroad.',
      'Они собираются переехать за границу.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "abroad".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'abroad'],
  },

  en_s1u10_n2_008_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'engineer',
    choices: [
      { text: 'baby', label: '👶', emoji: '👶', imageUrl: '' },
      { text: 'house', label: '🏠', emoji: '🏠', imageUrl: '' },
      { text: 'engineer', label: '👷', emoji: '👷', imageUrl: '' },
      { text: 'journey', label: '🧳', emoji: '🧳', imageUrl: '' },
    ],
    answerTranslation: L('엔지니어', 'muhandis', 'engineer', 'инженер'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['engineer'],
  },

  en_s1u10_n2_009_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'She is going to learn a new language.',
    audioText: 'She is going to learn a new language.',
    answerI18n: L(
      '그녀는 새로운 언어를 배울 거예요',
      'U yangi til o‘rganmoqchi',
      'She is going to learn a new language',
      'Она собирается выучить новый язык',
    ),
    options: [
      'She',
      'is',
      'going',
      'to',
      'learn',
      'a',
      'new',
      'language',
      'learned',
    ],
    optionsI18n: {
      ko: ['그녀는', '새로운', '언어를', '배울', '거예요'],
      uz: ['U', 'yangi', 'til', 'o‘rganmoqchi'],
      en: ['She', 'is', 'going', 'to', 'learn', 'a', 'new', 'language'],
      ru: ['Она', 'собирается', 'выучить', 'новый', 'язык'],
    },
    answerTranslation: L(
      '그녀는 새로운 언어를 배울 거예요.',
      'U yangi til o‘rganmoqchi.',
      'She is going to learn a new language.',
      'Она собирается выучить новый язык.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['life-change', 'language'],
  },

  en_s1u10_n2_010_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What are they going to do?',
    options: [
      'They',
      'are',
      'going',
      'to',
      'have',
      'a',
      'baby',
      'job',
      'school',
    ],
    answer: 'They are going to have a baby',
    answerTranslation: L(
      '그들은 아기를 낳을 예정이에요.',
      'Ularning farzandi tug‘ilmoqchi.',
      'They are going to have a baby.',
      'У них будет ребёнок.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['baby', 'reply'],
  },

  en_s1u10_n2_011_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'He is going to change ',
    sentenceSuffix: '.',
    answer: 'jobs',
    answerTranslation: L(
      '그는 직업을 바꿀 거예요.',
      'U ishini o‘zgartirmoqchi.',
      'He is going to change jobs.',
      'Он собирается сменить работу.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "jobs".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['typing', 'jobs'],
  },

  en_s1u10_n2_012_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'house',
        native: 'uy',
        nativeI18n: L('집', 'uy', 'house', 'дом'),
      },
      {
        text: 'job',
        native: 'ish',
        nativeI18n: L('직업', 'ish', 'job', 'работа'),
      },
      {
        text: 'school',
        native: 'maktab',
        nativeI18n: L('학교', 'maktab', 'school', 'школа'),
      },
      {
        text: 'language',
        native: 'til',
        nativeI18n: L('언어', 'til', 'language', 'язык'),
      },
      {
        text: 'baby',
        native: 'chaqaloq',
        nativeI18n: L('아기', 'chaqaloq', 'baby', 'младенец'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['life-change', 'matching'],
  },

  en_s1u10_n2_013_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'school',
      'finish',
      'going',
      'She',
      'to',
      'is',
      'finished',
      'house',
    ],
    answer: 'She is going to finish school',
    answerTranslation: L(
      '그녀는 학교를 마칠 거예요.',
      'U maktabni tugatmoqchi.',
      'She is going to finish school.',
      'Она собирается закончить школу.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['life-change', 'school'],
  },

  en_s1u10_n2_014_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'house',
        native: 'uy',
        nativeI18n: L('집', 'uy', 'house', 'дом'),
      },
      {
        text: 'job',
        native: 'ish',
        nativeI18n: L('직업', 'ish', 'job', 'работа'),
      },
      {
        text: 'school',
        native: 'maktab',
        nativeI18n: L('학교', 'maktab', 'school', 'школа'),
      },
      {
        text: 'language',
        native: 'til',
        nativeI18n: L('언어', 'til', 'language', 'язык'),
      },
      {
        text: 'baby',
        native: 'chaqaloq',
        nativeI18n: L('아기', 'chaqaloq', 'baby', 'младенец'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['life-change', 'listening'],
  },

  en_s1u10_n2_015_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'house',
    choices: [
      { text: 'baby', label: '👶', emoji: '👶', imageUrl: '' },
      { text: 'engineer', label: '👷', emoji: '👷', imageUrl: '' },
      { text: 'house', label: '🏠', emoji: '🏠', imageUrl: '' },
      { text: 'journey', label: '🧳', emoji: '🧳', imageUrl: '' },
    ],
    answerTranslation: L('집', 'uy', 'house', 'дом'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['house'],
  },

  en_s1u10_n2_016_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'They are going to ___ abroad.',
    blankAnswers: ['move'],
    options: ['move', 'moving', 'moved', 'moves'],
    answer: 'move',
    answerTranslation: L(
      '그들은 해외로 이사할 거예요.',
      'Ular chet elga ko‘chib ketmoqchi.',
      'They are going to move abroad.',
      'Они собираются переехать за границу.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['going-to', 'base-verb'],
  },

  en_s1u10_n2_017_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'They are going to have a ',
    sentenceSuffix: '.',
    answer: 'baby',
    answerTranslation: L(
      '그들은 아기를 낳을 예정이에요.',
      'Ularning farzandi tug‘ilmoqchi.',
      'They are going to have a baby.',
      'У них будет ребёнок.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "baby".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'baby'],
  },

  en_s1u10_n2_018_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'language',
      'learn',
      'new',
      'going',
      'I',
      'a',
      'to',
      'am',
      'learned',
    ],
    answer: 'I am going to learn a new language',
    audioText: 'I am going to learn a new language.',
    answerTranslation: L(
      '저는 새로운 언어를 배울 거예요.',
      'Men yangi til o‘rganmoqchiman.',
      'I am going to learn a new language.',
      'Я собираюсь выучить новый язык.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['language', 'going-to'],
  },

  en_s1u10_n2_019_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Are you going to move abroad?',
    options: ['Yes', 'I', 'am', 'going', 'to', 'move', 'abroad', 'is', 'not'],
    answer: 'Yes I am going to move abroad',
    answerTranslation: L(
      '네, 해외로 이사할 거예요.',
      'Ha, men chet elga ko‘chib ketmoqchiman.',
      'Yes, I am going to move abroad.',
      'Да, я собираюсь переехать за границу.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['abroad', 'reply'],
  },

  en_s1u10_n2_020_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'What are you going to do next year?' },
    ],
    options: [
      'I’m going to learn a new language.',
      'I learned tomorrow a new language.',
      'I am new language yesterday.',
      'I did going to learn a language.',
    ],
    answer: 'I’m going to learn a new language.',
    answerTranslation: L(
      '새로운 언어를 배울 거예요.',
      'Men yangi til o‘rganmoqchiman.',
      'I’m going to learn a new language.',
      'Я собираюсь выучить новый язык.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['life-change', 'dialog'],
  },

  // ===========================================================
  // Lesson 2 · Probably and probably not
  // ===========================================================

  en_s1u10_n2_021_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'My father is probably going to change jobs.',
    audioText: 'My father is probably going to change jobs.',
    answerTranslation: L(
      '아버지는 아마 직업을 바꾸실 거예요.',
      'Otam ehtimol ishini o‘zgartirmoqchi.',
      'My father is probably going to change jobs.',
      'Мой отец, вероятно, собирается сменить работу.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['probably', 'future'],
  },

  en_s1u10_n2_022_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'baby',
    choices: [
      { text: 'engineer', label: '👷', emoji: '👷', imageUrl: '' },
      { text: 'journey', label: '🧳', emoji: '🧳', imageUrl: '' },
      { text: 'baby', label: '👶', emoji: '👶', imageUrl: '' },
      { text: 'house', label: '🏠', emoji: '🏠', imageUrl: '' },
    ],
    answerTranslation: L('아기', 'chaqaloq', 'baby', 'младенец'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['baby'],
  },

  en_s1u10_n2_023_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'probably',
        native: 'ehtimol',
        nativeI18n: L('아마', 'ehtimol', 'probably', 'вероятно'),
      },
      {
        text: 'engineer',
        native: 'muhandis',
        nativeI18n: L('엔지니어', 'muhandis', 'engineer', 'инженер'),
      },
      {
        text: 'abroad',
        native: 'chet elga',
        nativeI18n: L('해외로', 'chet elga', 'abroad', 'за границу'),
      },
      {
        text: 'baby',
        native: 'chaqaloq',
        nativeI18n: L('아기', 'chaqaloq', 'baby', 'младенец'),
      },
      {
        text: 'journey',
        native: 'safar',
        nativeI18n: L('여정', 'safar', 'journey', 'путешествие'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['probably', 'matching'],
  },

  en_s1u10_n2_024_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'jobs',
      'probably',
      'father',
      'change',
      'going',
      'My',
      'to',
      'is',
      'not',
    ],
    answer: 'My father is probably going to change jobs',
    answerTranslation: L(
      '아버지는 아마 직업을 바꾸실 거예요.',
      'Otam ehtimol ishini o‘zgartirmoqchi.',
      'My father is probably going to change jobs.',
      'Мой отец, вероятно, собирается сменить работу.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['probably', 'change-jobs'],
  },

  en_s1u10_n2_025_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'house',
      'probably',
      'not',
      'I',
      'buy',
      'going',
      'am',
      'to',
      'a',
      'bought',
    ],
    answer: 'I am probably not going to buy a house',
    audioText: 'I am probably not going to buy a house.',
    answerTranslation: L(
      '저는 아마 집을 사지 않을 거예요.',
      'Men ehtimol uy sotib olmayman.',
      'I am probably not going to buy a house.',
      'Я, вероятно, не собираюсь покупать дом.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['probably-not', 'house'],
  },

  en_s1u10_n2_026_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'probably',
        native: 'ehtimol',
        nativeI18n: L('아마', 'ehtimol', 'probably', 'вероятно'),
      },
      {
        text: 'engineer',
        native: 'muhandis',
        nativeI18n: L('엔지니어', 'muhandis', 'engineer', 'инженер'),
      },
      {
        text: 'abroad',
        native: 'chet elga',
        nativeI18n: L('해외로', 'chet elga', 'abroad', 'за границу'),
      },
      {
        text: 'baby',
        native: 'chaqaloq',
        nativeI18n: L('아기', 'chaqaloq', 'baby', 'младенец'),
      },
      {
        text: 'journey',
        native: 'safar',
        nativeI18n: L('여정', 'safar', 'journey', 'путешествие'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['probably', 'listening'],
  },

  en_s1u10_n2_027_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'He is ',
    sentenceSuffix: ' going to change jobs.',
    answer: 'probably',
    answerTranslation: L(
      '그는 아마 직업을 바꿀 거예요.',
      'U ehtimol ishini o‘zgartirmoqchi.',
      'He is probably going to change jobs.',
      'Он, вероятно, собирается сменить работу.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "probably".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'probably'],
  },

  en_s1u10_n2_028_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'engineer',
    choices: [
      { text: 'baby', label: '👶', emoji: '👶', imageUrl: '' },
      { text: 'house', label: '🏠', emoji: '🏠', imageUrl: '' },
      { text: 'journey', label: '🧳', emoji: '🧳', imageUrl: '' },
      { text: 'engineer', label: '👷', emoji: '👷', imageUrl: '' },
    ],
    answerTranslation: L('엔지니어', 'muhandis', 'engineer', 'инженер'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['engineer'],
  },

  en_s1u10_n2_029_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'My brother is probably not going to change jobs.',
    audioText: 'My brother is probably not going to change jobs.',
    answerI18n: L(
      '제 남동생은 아마 직업을 바꾸지 않을 거예요',
      'Ukam ehtimol ishini o‘zgartirmaydi',
      'My brother is probably not going to change jobs',
      'Мой брат, вероятно, не собирается менять работу',
    ),
    options: [
      'My',
      'brother',
      'is',
      'probably',
      'not',
      'going',
      'to',
      'change',
      'jobs',
      'changed',
    ],
    optionsI18n: {
      ko: ['제', '남동생은', '아마', '직업을', '바꾸지', '않을', '거예요'],
      uz: ['Ukam', 'ehtimol', 'ishini', 'o‘zgartirmaydi'],
      en: [
        'My',
        'brother',
        'is',
        'probably',
        'not',
        'going',
        'to',
        'change',
        'jobs',
      ],
      ru: ['Мой', 'брат', 'вероятно', 'не', 'собирается', 'менять', 'работу'],
    },
    answerTranslation: L(
      '제 남동생은 아마 직업을 바꾸지 않을 거예요.',
      'Ukam ehtimol ishini o‘zgartirmaydi.',
      'My brother is probably not going to change jobs.',
      'Мой брат, вероятно, не собирается менять работу.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['probably-not', 'jobs'],
  },

  en_s1u10_n2_030_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Is your father going to change jobs?',
    options: [
      'Yes',
      'he',
      'is',
      'probably',
      'going',
      'to',
      'change',
      'jobs',
      'not',
    ],
    answer: 'Yes he is probably going to change jobs',
    answerTranslation: L(
      '네, 아마 직업을 바꾸실 거예요.',
      'Ha, u ehtimol ishini o‘zgartirmoqchi.',
      'Yes, he is probably going to change jobs.',
      'Да, он, вероятно, собирается сменить работу.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['probably', 'reply'],
  },

  en_s1u10_n2_031_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I am probably ',
    sentenceSuffix: ' going to buy a house.',
    answer: 'not',
    answerTranslation: L(
      '저는 아마 집을 사지 않을 거예요.',
      'Men ehtimol uy sotib olmayman.',
      'I am probably not going to buy a house.',
      'Я, вероятно, не собираюсь покупать дом.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "not".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'probably-not'],
  },

  en_s1u10_n2_032_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'job',
        native: 'ish',
        nativeI18n: L('직업', 'ish', 'job', 'работа'),
      },
      {
        text: 'house',
        native: 'uy',
        nativeI18n: L('집', 'uy', 'house', 'дом'),
      },
      {
        text: 'language',
        native: 'til',
        nativeI18n: L('언어', 'til', 'language', 'язык'),
      },
      {
        text: 'baby',
        native: 'chaqaloq',
        nativeI18n: L('아기', 'chaqaloq', 'baby', 'младенец'),
      },
      {
        text: 'engineer',
        native: 'muhandis',
        nativeI18n: L('엔지니어', 'muhandis', 'engineer', 'инженер'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['life-change', 'matching'],
  },

  en_s1u10_n2_033_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'English',
      'probably',
      'learn',
      'going',
      'I',
      'to',
      'am',
      'not',
      'learned',
    ],
    answer: 'I am probably going to learn English',
    answerTranslation: L(
      '저는 아마 영어를 배울 거예요.',
      'Men ehtimol ingliz tilini o‘rganmoqchiman.',
      'I am probably going to learn English.',
      'Я, вероятно, собираюсь учить английский.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['probably', 'language'],
  },

  en_s1u10_n2_034_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'job',
        native: 'ish',
        nativeI18n: L('직업', 'ish', 'job', 'работа'),
      },
      {
        text: 'house',
        native: 'uy',
        nativeI18n: L('집', 'uy', 'house', 'дом'),
      },
      {
        text: 'language',
        native: 'til',
        nativeI18n: L('언어', 'til', 'language', 'язык'),
      },
      {
        text: 'baby',
        native: 'chaqaloq',
        nativeI18n: L('아기', 'chaqaloq', 'baby', 'младенец'),
      },
      {
        text: 'engineer',
        native: 'muhandis',
        nativeI18n: L('엔지니어', 'muhandis', 'engineer', 'инженер'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['life-change', 'listening'],
  },

  en_s1u10_n2_035_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'house',
    choices: [
      { text: 'engineer', label: '👷', emoji: '👷', imageUrl: '' },
      { text: 'baby', label: '👶', emoji: '👶', imageUrl: '' },
      { text: 'house', label: '🏠', emoji: '🏠', imageUrl: '' },
      { text: 'journey', label: '🧳', emoji: '🧳', imageUrl: '' },
    ],
    answerTranslation: L('집', 'uy', 'house', 'дом'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['house'],
  },

  en_s1u10_n2_036_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'My father is ___ going to change jobs.',
    blankAnswers: ['probably'],
    options: ['probably', 'yesterday', 'ago', 'last'],
    answer: 'probably',
    answerTranslation: L(
      '아버지는 아마 직업을 바꾸실 거예요.',
      'Otam ehtimol ishini o‘zgartirmoqchi.',
      'My father is probably going to change jobs.',
      'Мой отец, вероятно, собирается сменить работу.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['probably'],
  },

  en_s1u10_n2_037_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'He hates being an ',
    sentenceSuffix: '.',
    answer: 'engineer',
    answerTranslation: L(
      '그는 엔지니어로 일하는 것을 싫어해요.',
      'U muhandis bo‘lib ishlashni yomon ko‘radi.',
      'He hates being an engineer.',
      'Он ненавидит работать инженером.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "engineer".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'engineer'],
  },

  en_s1u10_n2_038_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'abroad',
      'probably',
      'move',
      'going',
      'They',
      'to',
      'are',
      'not',
      'moved',
    ],
    answer: 'They are probably going to move abroad',
    audioText: 'They are probably going to move abroad.',
    answerTranslation: L(
      '그들은 아마 해외로 이사할 거예요.',
      'Ular ehtimol chet elga ko‘chib ketmoqchi.',
      'They are probably going to move abroad.',
      'Они, вероятно, собираются переехать за границу.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['probably', 'abroad'],
  },

  en_s1u10_n2_039_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Are you going to buy a house?',
    options: [
      'I',
      'am',
      'probably',
      'not',
      'going',
      'to',
      'buy',
      'a',
      'house',
      'yes',
    ],
    answer: 'I am probably not going to buy a house',
    answerTranslation: L(
      '저는 아마 집을 사지 않을 거예요.',
      'Men ehtimol uy sotib olmayman.',
      'I am probably not going to buy a house.',
      'Я, вероятно, не собираюсь покупать дом.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['probably-not', 'reply'],
  },

  en_s1u10_n2_040_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Is your brother going to change jobs?' },
    ],
    options: [
      'Probably not. He loves his job.',
      'Probably yesterday. He loves his job.',
      'He probably did going to change.',
      'No, he going change jobs tomorrow.',
    ],
    answer: 'Probably not. He loves his job.',
    answerTranslation: L(
      '아마 아닐 거예요. 그는 자기 일을 좋아해요.',
      'Ehtimol yo‘q. U o‘z ishini yaxshi ko‘radi.',
      'Probably not. He loves his job.',
      'Скорее всего, нет. Ему нравится его работа.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['probably-not', 'dialog'],
  },

  // ===========================================================
  // Lesson 3 · Going to questions
  // ===========================================================

  en_s1u10_n2_041_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Where are you going to go?',
    audioText: 'Where are you going to go?',
    answerTranslation: L(
      '어디로 갈 거예요?',
      'Qayerga bormoqchisiz?',
      'Where are you going to go?',
      'Куда вы собираетесь поехать?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['going-to-question', 'where'],
  },

  en_s1u10_n2_042_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'journey',
    choices: [
      { text: 'baby', label: '👶', emoji: '👶', imageUrl: '' },
      { text: 'engineer', label: '👷', emoji: '👷', imageUrl: '' },
      { text: 'journey', label: '🧳', emoji: '🧳', imageUrl: '' },
      { text: 'house', label: '🏠', emoji: '🏠', imageUrl: '' },
    ],
    answerTranslation: L('여정', 'safar', 'journey', 'путешествие'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['journey'],
  },

  en_s1u10_n2_043_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'abroad',
        native: 'chet elga',
        nativeI18n: L('해외로', 'chet elga', 'abroad', 'за границу'),
      },
      {
        text: 'journey',
        native: 'safar',
        nativeI18n: L('여정', 'safar', 'journey', 'путешествие'),
      },
      {
        text: 'problem',
        native: 'muammo',
        nativeI18n: L('문제', 'muammo', 'problem', 'проблема'),
      },
      {
        text: 'date',
        native: 'sana',
        nativeI18n: L('날짜', 'sana', 'date', 'дата'),
      },
      {
        text: 'probably',
        native: 'ehtimol',
        nativeI18n: L('아마', 'ehtimol', 'probably', 'вероятно'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['questions', 'matching'],
  },

  en_s1u10_n2_044_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['go', 'Where', 'you', 'going', 'are', 'to', 'going', 'do', 'is'],
    answer: 'Where are you going to go',
    answerTranslation: L(
      '어디로 갈 거예요?',
      'Qayerga bormoqchisiz?',
      'Where are you going to go?',
      'Куда вы собираетесь поехать?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['where-question', 'going-to'],
  },

  en_s1u10_n2_045_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['do', 'What', 'you', 'going', 'are', 'to', 'doing', 'where'],
    answer: 'What are you going to do',
    audioText: 'What are you going to do?',
    answerTranslation: L(
      '무엇을 할 거예요?',
      'Nima qilmoqchisiz?',
      'What are you going to do?',
      'Что вы собираетесь делать?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['what-question', 'going-to'],
  },

  en_s1u10_n2_046_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'abroad',
        native: 'chet elga',
        nativeI18n: L('해외로', 'chet elga', 'abroad', 'за границу'),
      },
      {
        text: 'journey',
        native: 'safar',
        nativeI18n: L('여정', 'safar', 'journey', 'путешествие'),
      },
      {
        text: 'problem',
        native: 'muammo',
        nativeI18n: L('문제', 'muammo', 'problem', 'проблема'),
      },
      {
        text: 'date',
        native: 'sana',
        nativeI18n: L('날짜', 'sana', 'date', 'дата'),
      },
      {
        text: 'probably',
        native: 'ehtimol',
        nativeI18n: L('아마', 'ehtimol', 'probably', 'вероятно'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['questions', 'listening'],
  },

  en_s1u10_n2_047_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Where ',
    sentenceSuffix: ' you going to go?',
    answer: 'are',
    answerTranslation: L(
      '어디로 갈 거예요?',
      'Qayerga bormoqchisiz?',
      'Where are you going to go?',
      'Куда вы собираетесь поехать?',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Use "are" with the subject "you".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'are'],
  },

  en_s1u10_n2_048_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'problem',
    choices: [
      { text: 'date', label: '📅', emoji: '📅', imageUrl: '' },
      { text: 'journey', label: '🧳', emoji: '🧳', imageUrl: '' },
      { text: 'problem', label: '⚠️', emoji: '⚠️', imageUrl: '' },
      { text: 'baby', label: '👶', emoji: '👶', imageUrl: '' },
    ],
    answerTranslation: L('문제', 'muammo', 'problem', 'проблема'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['problem'],
  },

  en_s1u10_n2_049_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Are you going to live in a hotel?',
    audioText: 'Are you going to live in a hotel?',
    answerI18n: L(
      '호텔에서 살 거예요',
      'Mehmonxonada yashamoqchimisiz',
      'Are you going to live in a hotel',
      'Вы собираетесь жить в отеле',
    ),
    options: ['Are', 'you', 'going', 'to', 'live', 'in', 'a', 'hotel', 'lived'],
    optionsI18n: {
      ko: ['호텔에서', '살', '거예요'],
      uz: ['Mehmonxonada', 'yashamoqchimisiz'],
      en: ['Are', 'you', 'going', 'to', 'live', 'in', 'a', 'hotel'],
      ru: ['Вы', 'собираетесь', 'жить', 'в', 'отеле'],
    },
    answerTranslation: L(
      '호텔에서 살 거예요?',
      'Mehmonxonada yashamoqchimisiz?',
      'Are you going to live in a hotel?',
      'Вы собираетесь жить в отеле?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['yes-no-question', 'hotel'],
  },

  en_s1u10_n2_050_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Are you going to live in a hotel?',
    options: ['No', 'we', 'are', 'not', 'aren’t', 'hotel', 'yes'],
    answer: 'No we aren’t',
    answerTranslation: L(
      '아니요, 그렇지 않아요.',
      'Yo‘q, yashamaymiz.',
      'No, we aren’t.',
      'Нет.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['short-answer', 'reply'],
  },

  en_s1u10_n2_051_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'What ',
    sentenceSuffix: ' you going to do?',
    answer: 'are',
    answerTranslation: L(
      '무엇을 할 거예요?',
      'Nima qilmoqchisiz?',
      'What are you going to do?',
      'Что вы собираетесь делать?',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Use "are" in the question "What are you going to do?"',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'question'],
  },

  en_s1u10_n2_052_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'house',
        native: 'uy',
        nativeI18n: L('집', 'uy', 'house', 'дом'),
      },
      {
        text: 'hotel',
        native: 'mehmonxona',
        nativeI18n: L('호텔', 'mehmonxona', 'hotel', 'отель'),
      },
      {
        text: 'job',
        native: 'ish',
        nativeI18n: L('직업', 'ish', 'job', 'работа'),
      },
      {
        text: 'language',
        native: 'til',
        nativeI18n: L('언어', 'til', 'language', 'язык'),
      },
      {
        text: 'journey',
        native: 'safar',
        nativeI18n: L('여정', 'safar', 'journey', 'путешествие'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['plans', 'matching'],
  },

  en_s1u10_n2_053_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['jobs', 'Tom', 'change', 'going', 'Is', 'to', 'are', 'changing'],
    answer: 'Is Tom going to change jobs',
    answerTranslation: L(
      '톰은 직업을 바꿀 거예요?',
      'Tom ishini o‘zgartirmoqchimi?',
      'Is Tom going to change jobs?',
      'Том собирается сменить работу?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['yes-no-question', 'jobs'],
  },

  en_s1u10_n2_054_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'house',
        native: 'uy',
        nativeI18n: L('집', 'uy', 'house', 'дом'),
      },
      {
        text: 'hotel',
        native: 'mehmonxona',
        nativeI18n: L('호텔', 'mehmonxona', 'hotel', 'отель'),
      },
      {
        text: 'job',
        native: 'ish',
        nativeI18n: L('직업', 'ish', 'job', 'работа'),
      },
      {
        text: 'language',
        native: 'til',
        nativeI18n: L('언어', 'til', 'language', 'язык'),
      },
      {
        text: 'journey',
        native: 'safar',
        nativeI18n: L('여정', 'safar', 'journey', 'путешествие'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['plans', 'listening'],
  },

  en_s1u10_n2_055_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'journey',
    choices: [
      { text: 'house', label: '🏠', emoji: '🏠', imageUrl: '' },
      { text: 'baby', label: '👶', emoji: '👶', imageUrl: '' },
      { text: 'journey', label: '🧳', emoji: '🧳', imageUrl: '' },
      { text: 'engineer', label: '👷', emoji: '👷', imageUrl: '' },
    ],
    answerTranslation: L('여정', 'safar', 'journey', 'путешествие'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['journey'],
  },

  en_s1u10_n2_056_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ Tom going to change jobs?',
    blankAnswers: ['Is'],
    options: ['Is', 'Are', 'Am', 'Did'],
    answer: 'Is',
    answerTranslation: L(
      '톰은 직업을 바꿀 거예요?',
      'Tom ishini o‘zgartirmoqchimi?',
      'Is Tom going to change jobs?',
      'Том собирается сменить работу?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['going-to-question'],
  },

  en_s1u10_n2_057_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'When are you going to ',
    sentenceSuffix: ' back?',
    answer: 'come',
    answerTranslation: L(
      '언제 돌아올 거예요?',
      'Qachon qaytib kelmoqchisiz?',
      'When are you going to come back?',
      'Когда вы собираетесь вернуться?',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'After "going to", use the base verb "come".',
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

  en_s1u10_n2_058_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'with',
      'Who',
      'going',
      'you',
      'are',
      'to',
      'go',
      'going',
      'where',
    ],
    answer: 'Who are you going to go with',
    audioText: 'Who are you going to go with?',
    answerTranslation: L(
      '누구와 함께 갈 거예요?',
      'Kim bilan bormoqchisiz?',
      'Who are you going to go with?',
      'С кем вы собираетесь ехать?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['who-question', 'going-to'],
  },

  en_s1u10_n2_059_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What are you going to do there?',
    options: ['I', 'am', 'going', 'to', 'teach', 'live', 'hotel', 'job'],
    answer: 'I am going to teach',
    answerTranslation: L(
      '가르칠 거예요.',
      'Men dars bermoqchiman.',
      'I am going to teach.',
      'Я собираюсь преподавать.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['going-to', 'reply'],
  },

  en_s1u10_n2_060_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Are you going to go with Victoria?' },
    ],
    options: ['Yes, I am.', 'Yes, I are.', 'No, I isn’t.', 'Yes, I did going.'],
    answer: 'Yes, I am.',
    answerTranslation: L('네, 그럴 거예요.', 'Ha.', 'Yes, I am.', 'Да.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['short-answer', 'dialog'],
  },

  // ===========================================================
  // Lesson 4 · Time and travel plans
  // ===========================================================

  en_s1u10_n2_061_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The flight is on Monday at eleven thirty.',
    audioText: 'The flight is on Monday at eleven thirty.',
    answerTranslation: L(
      '항공편은 월요일 11시 30분이에요.',
      'Parvoz dushanba kuni soat o‘n bir yarimda.',
      'The flight is on Monday at eleven thirty.',
      'Рейс в понедельник в одиннадцать тридцать.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['time-prepositions', 'travel'],
  },

  en_s1u10_n2_062_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'date',
    choices: [
      { text: 'problem', label: '⚠️', emoji: '⚠️', imageUrl: '' },
      { text: 'journey', label: '🧳', emoji: '🧳', imageUrl: '' },
      { text: 'date', label: '📅', emoji: '📅', imageUrl: '' },
      { text: 'baby', label: '👶', emoji: '👶', imageUrl: '' },
    ],
    answerTranslation: L('날짜', 'sana', 'date', 'дата'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['date'],
  },

  en_s1u10_n2_063_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'date',
        native: 'sana',
        nativeI18n: L('날짜', 'sana', 'date', 'дата'),
      },
      {
        text: 'journey',
        native: 'safar',
        nativeI18n: L('여정', 'safar', 'journey', 'путешествие'),
      },
      {
        text: 'problem',
        native: 'muammo',
        nativeI18n: L('문제', 'muammo', 'problem', 'проблема'),
      },
      {
        text: 'abroad',
        native: 'chet elga',
        nativeI18n: L('해외로', 'chet elga', 'abroad', 'за границу'),
      },
      {
        text: 'probably',
        native: 'ehtimol',
        nativeI18n: L('아마', 'ehtimol', 'probably', 'вероятно'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['time', 'matching'],
  },

  en_s1u10_n2_064_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['June', 'in', 'going', 'We', 'travel', 'to', 'are', 'on', 'at'],
    answer: 'We are going to travel in June',
    answerTranslation: L(
      '우리는 6월에 여행할 거예요.',
      'Biz iyunda sayohat qilmoqchimiz.',
      'We are going to travel in June.',
      'Мы собираемся путешествовать в июне.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['in', 'month'],
  },

  en_s1u10_n2_065_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['Monday', 'flight', 'The', 'on', 'is', 'at', 'May', 'in'],
    answer: 'The flight is on Monday',
    audioText: 'The flight is on Monday.',
    answerTranslation: L(
      '항공편은 월요일이에요.',
      'Parvoz dushanba kuni.',
      'The flight is on Monday.',
      'Рейс в понедельник.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['on', 'day'],
  },

  en_s1u10_n2_066_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'date',
        native: 'sana',
        nativeI18n: L('날짜', 'sana', 'date', 'дата'),
      },
      {
        text: 'journey',
        native: 'safar',
        nativeI18n: L('여정', 'safar', 'journey', 'путешествие'),
      },
      {
        text: 'problem',
        native: 'muammo',
        nativeI18n: L('문제', 'muammo', 'problem', 'проблема'),
      },
      {
        text: 'abroad',
        native: 'chet elga',
        nativeI18n: L('해외로', 'chet elga', 'abroad', 'за границу'),
      },
      {
        text: 'probably',
        native: 'ehtimol',
        nativeI18n: L('아마', 'ehtimol', 'probably', 'вероятно'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['time', 'listening'],
  },

  en_s1u10_n2_067_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'The flight is ',
    sentenceSuffix: ' Monday.',
    answer: 'on',
    answerTranslation: L(
      '항공편은 월요일이에요.',
      'Parvoz dushanba kuni.',
      'The flight is on Monday.',
      'Рейс в понедельник.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Use "on" with days of the week.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'on'],
  },

  en_s1u10_n2_068_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'problem',
    choices: [
      { text: 'journey', label: '🧳', emoji: '🧳', imageUrl: '' },
      { text: 'date', label: '📅', emoji: '📅', imageUrl: '' },
      { text: 'problem', label: '⚠️', emoji: '⚠️', imageUrl: '' },
      { text: 'house', label: '🏠', emoji: '🏠', imageUrl: '' },
    ],
    answerTranslation: L('문제', 'muammo', 'problem', 'проблема'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['problem'],
  },

  en_s1u10_n2_069_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'The meeting is at ten thirty on the twentieth of July.',
    audioText: 'The meeting is at ten thirty on the twentieth of July.',
    answerI18n: L(
      '회의는 7월 20일 10시 30분이에요',
      'Uchrashuv yigirmanchi iyul kuni soat o‘n yarimda',
      'The meeting is at ten thirty on the twentieth of July',
      'Встреча двадцатого июля в десять тридцать',
    ),
    options: [
      'The',
      'meeting',
      'is',
      'at',
      'ten',
      'thirty',
      'on',
      'the',
      'twentieth',
      'of',
      'July',
      'in',
    ],
    optionsI18n: {
      ko: ['회의는', '7월', '20일', '10시', '30분이에요'],
      uz: [
        'Uchrashuv',
        'yigirmanchi',
        'iyul',
        'kuni',
        'soat',
        'o‘n',
        'yarimda',
      ],
      en: [
        'The',
        'meeting',
        'is',
        'at',
        'ten',
        'thirty',
        'on',
        'the',
        'twentieth',
        'of',
        'July',
      ],
      ru: ['Встреча', 'двадцатого', 'июля', 'в', 'десять', 'тридцать'],
    },
    answerTranslation: L(
      '회의는 7월 20일 10시 30분이에요.',
      'Uchrashuv yigirmanchi iyul kuni soat o‘n yarimda.',
      'The meeting is at ten thirty on the twentieth of July.',
      'Встреча двадцатого июля в десять тридцать.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['time-prepositions', 'date'],
  },

  en_s1u10_n2_070_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'When is your flight?',
    options: [
      'It',
      'is',
      'on',
      'Monday',
      'at',
      'eleven',
      'thirty',
      'in',
      'ago',
    ],
    answer: 'It is on Monday at eleven thirty',
    answerTranslation: L(
      '월요일 11시 30분이에요.',
      'Dushanba kuni soat o‘n bir yarimda.',
      'It is on Monday at eleven thirty.',
      'В понедельник в одиннадцать тридцать.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['time', 'reply'],
  },

  en_s1u10_n2_071_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'We are going to travel ',
    sentenceSuffix: ' May.',
    answer: 'in',
    answerTranslation: L(
      '우리는 5월에 여행할 거예요.',
      'Biz may oyida sayohat qilmoqchimiz.',
      'We are going to travel in May.',
      'Мы собираемся путешествовать в мае.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Use "in" with months.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'in'],
  },

  en_s1u10_n2_072_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'date',
        native: 'sana',
        nativeI18n: L('날짜', 'sana', 'date', 'дата'),
      },
      {
        text: 'problem',
        native: 'muammo',
        nativeI18n: L('문제', 'muammo', 'problem', 'проблема'),
      },
      {
        text: 'journey',
        native: 'safar',
        nativeI18n: L('여정', 'safar', 'journey', 'путешествие'),
      },
      {
        text: 'engineer',
        native: 'muhandis',
        nativeI18n: L('엔지니어', 'muhandis', 'engineer', 'инженер'),
      },
      {
        text: 'abroad',
        native: 'chet elga',
        nativeI18n: L('해외로', 'chet elga', 'abroad', 'за границу'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit10', 'matching'],
  },

  en_s1u10_n2_073_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'weekend',
      'at',
      'going',
      'What',
      'he',
      'do',
      'is',
      'to',
      'the',
      'on',
    ],
    answer: 'What is he going to do at the weekend',
    answerTranslation: L(
      '그는 주말에 무엇을 할 거예요?',
      'U dam olish kunlari nima qilmoqchi?',
      'What is he going to do at the weekend?',
      'Что он собирается делать на выходных?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['at', 'weekend'],
  },

  en_s1u10_n2_074_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'date',
        native: 'sana',
        nativeI18n: L('날짜', 'sana', 'date', 'дата'),
      },
      {
        text: 'problem',
        native: 'muammo',
        nativeI18n: L('문제', 'muammo', 'problem', 'проблема'),
      },
      {
        text: 'journey',
        native: 'safar',
        nativeI18n: L('여정', 'safar', 'journey', 'путешествие'),
      },
      {
        text: 'engineer',
        native: 'muhandis',
        nativeI18n: L('엔지니어', 'muhandis', 'engineer', 'инженер'),
      },
      {
        text: 'abroad',
        native: 'chet elga',
        nativeI18n: L('해외로', 'chet elga', 'abroad', 'за границу'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['unit10', 'listening'],
  },

  en_s1u10_n2_075_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'date',
    choices: [
      { text: 'journey', label: '🧳', emoji: '🧳', imageUrl: '' },
      { text: 'problem', label: '⚠️', emoji: '⚠️', imageUrl: '' },
      { text: 'date', label: '📅', emoji: '📅', imageUrl: '' },
      { text: 'baby', label: '👶', emoji: '👶', imageUrl: '' },
    ],
    answerTranslation: L('날짜', 'sana', 'date', 'дата'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['date'],
  },

  en_s1u10_n2_076_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The flight is ___ 11.30.',
    blankAnswers: ['at'],
    options: ['at', 'on', 'in', 'to'],
    answer: 'at',
    answerTranslation: L(
      '항공편은 11시 30분이에요.',
      'Parvoz soat o‘n bir yarimda.',
      'The flight is at 11.30.',
      'Рейс в 11:30.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['at', 'time'],
  },

  en_s1u10_n2_077_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'The meeting is ',
    sentenceSuffix: ' the twentieth of July.',
    answer: 'on',
    answerTranslation: L(
      '회의는 7월 20일이에요.',
      'Uchrashuv yigirmanchi iyul kuni.',
      'The meeting is on the twentieth of July.',
      'Встреча двадцатого июля.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Use "on" with dates.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'on', 'date'],
  },

  en_s1u10_n2_078_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'afternoon',
      'in',
      'going',
      'We',
      'meet',
      'the',
      'are',
      'to',
      'at',
      'on',
    ],
    answer: 'We are going to meet in the afternoon',
    audioText: 'We are going to meet in the afternoon.',
    answerTranslation: L(
      '우리는 오후에 만날 거예요.',
      'Biz tushdan keyin uchrashmoqchimiz.',
      'We are going to meet in the afternoon.',
      'Мы собираемся встретиться днём.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['in', 'afternoon'],
  },

  en_s1u10_n2_079_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'When are you going to leave?',
    options: [
      'I',
      'am',
      'going',
      'to',
      'leave',
      'at',
      'five',
      'thirty',
      'on',
      'May',
    ],
    answer: 'I am going to leave at five thirty',
    answerTranslation: L(
      '5시 30분에 떠날 거예요.',
      'Men soat besh yarimda ketmoqchiman.',
      'I am going to leave at five thirty.',
      'Я собираюсь уйти в пять тридцать.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['at', 'reply'],
  },

  en_s1u10_n2_080_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'When is your flight to the Maldives?' },
    ],
    options: [
      'It’s on Monday at eleven thirty.',
      'It’s in Monday on eleven thirty.',
      'It’s at May in Monday.',
      'It was tomorrow at Monday.',
    ],
    answer: 'It’s on Monday at eleven thirty.',
    answerTranslation: L(
      '월요일 11시 30분이에요.',
      'Dushanba kuni soat o‘n bir yarimda.',
      'It’s on Monday at eleven thirty.',
      'В понедельник в одиннадцать тридцать.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['time-prepositions', 'final'],
  },
};

export const EN_S1_UNIT10_NODE2 = {
  title: L('새로운 삶', 'Yangi hayot', 'A new life', 'Новая жизнь'),
  section: 1,
  unit: 10,
  order: 2,
  isActive: true,

  lessons: [
    {
      title: L(
        '삶의 변화',
        'Hayotdagi o‘zgarishlar',
        'Life changes',
        'Перемены в жизни',
      ),
      description: L(
        '집을 사기, 직업을 바꾸기, 학교를 마치기, 아기를 갖기, 새 언어를 배우기, 해외로 이사하기 같은 미래의 삶의 변화를 말해요.',
        'Uy sotib olish, ishni o‘zgartirish, maktabni tugatish, farzandli bo‘lish, yangi til o‘rganish va chet elga ko‘chish kabi rejalarni aytasiz.',
        'Talk about future life changes such as buying a house, changing jobs, finishing school, having a baby, learning a language and moving abroad.',
        'Говорим о будущих переменах: покупке дома, смене работы, окончании школы, ребёнке, новом языке и переезде за границу.',
      ),
      category: LessonCategory.EXPRESSION,
      level: LV,
      order: 1,
      questions: [
        'en_s1u10_n2_001_speaking',
        'en_s1u10_n2_002_image_choice',
        'en_s1u10_n2_003_word_matching',
        'en_s1u10_n2_004_translate_builder',
        'en_s1u10_n2_005_word_arrange',
        'en_s1u10_n2_006_audio_match',
        'en_s1u10_n2_007_type_answer',
        'en_s1u10_n2_008_image_choice',
        'en_s1u10_n2_009_sentence_builder',
        'en_s1u10_n2_010_reply_builder',
        'en_s1u10_n2_011_type_answer',
        'en_s1u10_n2_012_word_matching',
        'en_s1u10_n2_013_translate_builder',
        'en_s1u10_n2_014_audio_match',
        'en_s1u10_n2_015_image_choice',
        'en_s1u10_n2_016_fill_in_blank',
        'en_s1u10_n2_017_type_answer',
        'en_s1u10_n2_018_word_arrange',
        'en_s1u10_n2_019_reply_builder',
        'en_s1u10_n2_020_dialog_complete',
      ],
    },

    {
      title: L(
        '아마 할 거예요',
        'Ehtimol qilaman',
        'Probably and probably not',
        'Вероятно и вероятно нет',
      ),
      description: L(
        'probably와 probably not을 사용해 미래 계획이 얼마나 가능성이 있는지 말해요.',
        'Probably va probably not bilan kelajak rejalarining ehtimolini ifodalaysiz.',
        'Use probably and probably not to describe how likely a future plan is.',
        'Используем probably и probably not, чтобы говорить о вероятности будущих планов.',
      ),
      category: LessonCategory.EXPRESSION,
      level: LV,
      order: 2,
      questions: [
        'en_s1u10_n2_021_speaking',
        'en_s1u10_n2_022_image_choice',
        'en_s1u10_n2_023_word_matching',
        'en_s1u10_n2_024_translate_builder',
        'en_s1u10_n2_025_word_arrange',
        'en_s1u10_n2_026_audio_match',
        'en_s1u10_n2_027_type_answer',
        'en_s1u10_n2_028_image_choice',
        'en_s1u10_n2_029_sentence_builder',
        'en_s1u10_n2_030_reply_builder',
        'en_s1u10_n2_031_type_answer',
        'en_s1u10_n2_032_word_matching',
        'en_s1u10_n2_033_translate_builder',
        'en_s1u10_n2_034_audio_match',
        'en_s1u10_n2_035_image_choice',
        'en_s1u10_n2_036_fill_in_blank',
        'en_s1u10_n2_037_type_answer',
        'en_s1u10_n2_038_word_arrange',
        'en_s1u10_n2_039_reply_builder',
        'en_s1u10_n2_040_dialog_complete',
      ],
    },

    {
      title: L(
        '미래 계획 질문하기',
        'Kelajak rejalari haqida savol',
        'Going to questions',
        'Вопросы с going to',
      ),
      description: L(
        'Are you going to ...?와 Where, What, When, Who를 사용해 상대의 미래 계획을 질문하고 짧게 대답해요.',
        'Are you going to ...? va Where, What, When, Who yordamida kelajak rejalari haqida savol berib, qisqa javob qaytarasiz.',
        'Ask about future plans with going to, including yes/no and Where, What, When and Who questions.',
        'Задаём вопросы о будущих планах с going to, включая вопросы Where, What, When и Who.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 3,
      questions: [
        'en_s1u10_n2_041_speaking',
        'en_s1u10_n2_042_image_choice',
        'en_s1u10_n2_043_word_matching',
        'en_s1u10_n2_044_translate_builder',
        'en_s1u10_n2_045_word_arrange',
        'en_s1u10_n2_046_audio_match',
        'en_s1u10_n2_047_type_answer',
        'en_s1u10_n2_048_image_choice',
        'en_s1u10_n2_049_sentence_builder',
        'en_s1u10_n2_050_reply_builder',
        'en_s1u10_n2_051_type_answer',
        'en_s1u10_n2_052_word_matching',
        'en_s1u10_n2_053_translate_builder',
        'en_s1u10_n2_054_audio_match',
        'en_s1u10_n2_055_image_choice',
        'en_s1u10_n2_056_fill_in_blank',
        'en_s1u10_n2_057_type_answer',
        'en_s1u10_n2_058_word_arrange',
        'en_s1u10_n2_059_reply_builder',
        'en_s1u10_n2_060_dialog_complete',
      ],
    },

    {
      title: L(
        '시간과 여행 계획',
        'Vaqt va sayohat rejalari',
        'Time and travel plans',
        'Время и планы поездки',
      ),
      description: L(
        '월·계절·연도에는 in, 요일·날짜에는 on, 시각과 주말에는 at을 사용해 미래 여행 계획의 시간을 말해요.',
        'Oy, fasl va yillar bilan in, kun va sanalar bilan on, vaqt va dam olish kunlari bilan at ishlatasiz.',
        'Use in with months, seasons and years, on with days and dates, and at with times and the weekend.',
        'Используем in с месяцами, сезонами и годами, on с днями и датами, а at со временем и выходными.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 4,
      questions: [
        'en_s1u10_n2_061_speaking',
        'en_s1u10_n2_062_image_choice',
        'en_s1u10_n2_063_word_matching',
        'en_s1u10_n2_064_translate_builder',
        'en_s1u10_n2_065_word_arrange',
        'en_s1u10_n2_066_audio_match',
        'en_s1u10_n2_067_type_answer',
        'en_s1u10_n2_068_image_choice',
        'en_s1u10_n2_069_sentence_builder',
        'en_s1u10_n2_070_reply_builder',
        'en_s1u10_n2_071_type_answer',
        'en_s1u10_n2_072_word_matching',
        'en_s1u10_n2_073_translate_builder',
        'en_s1u10_n2_074_audio_match',
        'en_s1u10_n2_075_image_choice',
        'en_s1u10_n2_076_fill_in_blank',
        'en_s1u10_n2_077_type_answer',
        'en_s1u10_n2_078_word_arrange',
        'en_s1u10_n2_079_reply_builder',
        'en_s1u10_n2_080_dialog_complete',
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Section 1 · Unit 10 · Node 3
// 10.3 Cafe cities
//
// Coverage
// - cafe food and drinks
// - coffee / tea / juice / water / milk
// - apple / orange
// - cake / doughnut / salad / croissant
// - sandwich / biscuit
// - dessert / filling
// - cafe / menu
// - hot and cold food/drinks
// - World's Best Cafe Cities
// - Vienna / Melbourne / Taipei / Havana / Seattle
// - It's a kind of ...
// - would like + noun
// - would like + to + verb
// - I'd like ...
// - Would you like ...?
// - Yes, please. / No, thanks.
// - ordering and offering in a cafe
// - connected speech practice
//
// IMPORTANT:
// *_WORDS에는 무조건 단어 하나만 등록.
// "apple juice", "orange juice", "a cup of tea",
// "chocolate cake" 같은 구/문장은 등록 금지.
//
// 4 lessons × 20 questions = 80
// speaking: reduced
// image_choice / word_matching / audio_match: increased
// type_answer: 3 per lesson
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT10_NODE3_WORDS = [
  {
    code: 'en-noun-cafe',
    english: 'cafe',
    senseKey: 'small-place-serving-food-and-drinks',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '카페',
      'kafe',
      'a small place where you can buy drinks and simple food',
      'кафе',
    ),
    examples: [
      {
        english: 'This cafe is very popular.',
        translations: L(
          '이 카페는 아주 인기가 많아요.',
          'Bu kafe juda mashhur.',
          'This cafe is very popular.',
          'Это кафе очень популярно.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkæfeɪ/',
      ttsText: 'cafe',
    },
    media: {
      emoji: '☕',
      imageUrl: '',
      imageAlt: L('카페', 'kafe', 'a cafe', 'кафе'),
    },
    tags: ['places', 'food'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-coffee',
    english: 'coffee',
    senseKey: 'hot-drink-made-from-coffee-beans',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '커피',
      'qahva',
      'a hot drink made from roasted coffee beans',
      'кофе',
    ),
    examples: [
      {
        english: 'I would like a coffee.',
        translations: L(
          '커피 한 잔 주세요.',
          'Men qahva xohlayman.',
          'I would like a coffee.',
          'Я бы хотел кофе.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkɒfi/',
      ttsText: 'coffee',
    },
    media: {
      emoji: '☕',
      imageUrl: '',
      imageAlt: L(
        '커피 한 잔',
        'bir piyola qahva',
        'a cup of coffee',
        'чашка кофе',
      ),
    },
    tags: ['drinks', 'cafe'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-tea',
    english: 'tea',
    senseKey: 'drink-made-from-tea-leaves',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '차',
      'choy',
      'a drink made by putting tea leaves in hot water',
      'чай',
    ),
    examples: [
      {
        english: 'I would like a cup of tea.',
        translations: L(
          '차 한 잔 주세요.',
          'Men bir piyola choy xohlayman.',
          'I would like a cup of tea.',
          'Я бы хотел чашку чая.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/tiː/',
      ttsText: 'tea',
    },
    media: {
      emoji: '🍵',
      imageUrl: '',
      imageAlt: L('차 한 잔', 'bir piyola choy', 'a cup of tea', 'чашка чая'),
    },
    tags: ['drinks', 'cafe'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-apple',
    english: 'apple',
    senseKey: 'round-fruit-with-red-green-or-yellow-skin',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '사과',
      'olma',
      'a round fruit with red, green or yellow skin',
      'яблоко',
    ),
    examples: [
      {
        english: 'Would you like an apple?',
        translations: L(
          '사과 드실래요?',
          'Olma xohlaysizmi?',
          'Would you like an apple?',
          'Хотите яблоко?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈæpəl/',
      ttsText: 'apple',
    },
    media: {
      emoji: '🍎',
      imageUrl: '',
      imageAlt: L('사과', 'olma', 'an apple', 'яблоко'),
    },
    tags: ['food', 'fruit'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-orange',
    english: 'orange',
    senseKey: 'round-orange-coloured-citrus-fruit',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '오렌지',
      'apelsin',
      'a round citrus fruit with orange skin',
      'апельсин',
    ),
    examples: [
      {
        english: 'Would you like an orange?',
        translations: L(
          '오렌지 드실래요?',
          'Apelsin xohlaysizmi?',
          'Would you like an orange?',
          'Хотите апельсин?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈɒrɪndʒ/',
      ttsText: 'orange',
    },
    media: {
      emoji: '🍊',
      imageUrl: '',
      imageAlt: L('오렌지', 'apelsin', 'an orange', 'апельсин'),
    },
    tags: ['food', 'fruit'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-juice',
    english: 'juice',
    senseKey: 'drink-made-from-fruit-or-vegetables',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '주스',
      'sharbat',
      'a drink made from fruit or vegetables',
      'сок',
    ),
    examples: [
      {
        english: 'I would like an orange juice.',
        translations: L(
          '오렌지 주스 주세요.',
          'Men apelsin sharbatini xohlayman.',
          'I would like an orange juice.',
          'Я бы хотел апельсиновый сок.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/dʒuːs/',
      ttsText: 'juice',
    },
    media: {
      emoji: '🧃',
      imageUrl: '',
      imageAlt: L('주스', 'sharbat', 'juice', 'сок'),
    },
    tags: ['drinks', 'cafe'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-water',
    english: 'water',
    senseKey: 'clear-liquid-people-drink',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('물', 'suv', 'the clear liquid that people drink', 'вода'),
    examples: [
      {
        english: 'Would you like some water?',
        translations: L(
          '물 좀 드실래요?',
          'Biroz suv xohlaysizmi?',
          'Would you like some water?',
          'Хотите воды?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈwɔːtə/',
      ttsText: 'water',
    },
    media: {
      emoji: '💧',
      imageUrl: '',
      imageAlt: L('물', 'suv', 'water', 'вода'),
    },
    tags: ['drinks', 'basic-food'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-milk',
    english: 'milk',
    senseKey: 'white-drink-produced-by-cows-or-other-animals',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '우유',
      'sut',
      'a white drink produced by cows or other animals',
      'молоко',
    ),
    examples: [
      {
        english: 'Would you like milk with your coffee?',
        translations: L(
          '커피에 우유를 넣어 드릴까요?',
          'Qahvangizga sut xohlaysizmi?',
          'Would you like milk with your coffee?',
          'Хотите молоко в кофе?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/mɪlk/',
      ttsText: 'milk',
    },
    media: {
      emoji: '🥛',
      imageUrl: '',
      imageAlt: L('우유', 'sut', 'milk', 'молоко'),
    },
    tags: ['drinks', 'cafe'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-cake',
    english: 'cake',
    senseKey: 'sweet-baked-food',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '케이크',
      'tort',
      'a sweet baked food often eaten as a dessert',
      'торт; пирог',
    ),
    examples: [
      {
        english: 'Would you like to try the cake?',
        translations: L(
          '케이크를 드셔 보실래요?',
          'Tortni tatib ko‘rishni xohlaysizmi?',
          'Would you like to try the cake?',
          'Хотите попробовать торт?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/keɪk/',
      ttsText: 'cake',
    },
    media: {
      emoji: '🍰',
      imageUrl: '',
      imageAlt: L(
        '케이크 조각',
        'tort bo‘lagi',
        'a piece of cake',
        'кусок торта',
      ),
    },
    tags: ['food', 'dessert'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-doughnut',
    english: 'doughnut',
    senseKey: 'sweet-ring-shaped-fried-cake',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '도넛',
      'ponchik',
      'a small sweet fried cake, often shaped like a ring',
      'пончик',
    ),
    examples: [
      {
        english: 'Would you like a doughnut?',
        translations: L(
          '도넛 드실래요?',
          'Ponchik xohlaysizmi?',
          'Would you like a doughnut?',
          'Хотите пончик?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈdəʊnʌt/',
      ttsText: 'doughnut',
    },
    media: {
      emoji: '🍩',
      imageUrl: '',
      imageAlt: L('도넛', 'ponchik', 'a doughnut', 'пончик'),
    },
    tags: ['food', 'snacks'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-salad',
    english: 'salad',
    senseKey: 'cold-dish-with-vegetables-or-other-foods',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '샐러드',
      'salat',
      'a cold dish made with vegetables or other foods',
      'салат',
    ),
    examples: [
      {
        english: 'She would like a salad.',
        translations: L(
          '그녀는 샐러드를 원해요.',
          'U salat xohlaydi.',
          'She would like a salad.',
          'Она хотела бы салат.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈsæləd/',
      ttsText: 'salad',
    },
    media: {
      emoji: '🥗',
      imageUrl: '',
      imageAlt: L('샐러드', 'salat', 'a salad', 'салат'),
    },
    tags: ['food', 'cafe'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-croissant',
    english: 'croissant',
    senseKey: 'crescent-shaped-bread-pastry',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '크루아상',
      'kruassan',
      'a light crescent-shaped bread pastry',
      'круассан',
    ),
    examples: [
      {
        english: 'I would like a croissant.',
        translations: L(
          '크루아상 하나 주세요.',
          'Men kruassan xohlayman.',
          'I would like a croissant.',
          'Я бы хотел круассан.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkrwæsɒ̃/',
      ttsText: 'croissant',
    },
    media: {
      emoji: '🥐',
      imageUrl: '',
      imageAlt: L('크루아상', 'kruassan', 'a croissant', 'круассан'),
    },
    tags: ['food', 'breakfast'],
    difficulty: 1,
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
      'food placed between two pieces of bread',
      'бутерброд; сэндвич',
    ),
    examples: [
      {
        english: 'I would like a sandwich.',
        translations: L(
          '샌드위치 하나 주세요.',
          'Men sendvich xohlayman.',
          'I would like a sandwich.',
          'Я бы хотел сэндвич.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈsænwɪdʒ/',
      ttsText: 'sandwich',
    },
    media: {
      emoji: '🥪',
      imageUrl: '',
      imageAlt: L('샌드위치', 'sendvich', 'a sandwich', 'сэндвич'),
    },
    tags: ['food', 'snacks'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-biscuit',
    english: 'biscuit',
    senseKey: 'small-flat-baked-sweet-food',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '비스킷; 쿠키',
      'pechenye',
      'a small flat baked food that is usually sweet',
      'печенье',
    ),
    examples: [
      {
        english: 'Would you like a biscuit?',
        translations: L(
          '비스킷 드실래요?',
          'Pechenye xohlaysizmi?',
          'Would you like a biscuit?',
          'Хотите печенье?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈbɪskɪt/',
      ttsText: 'biscuit',
    },
    media: {
      emoji: '🍪',
      imageUrl: '',
      imageAlt: L('비스킷', 'pechenye', 'a biscuit', 'печенье'),
    },
    tags: ['food', 'snacks'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-dessert',
    english: 'dessert',
    senseKey: 'sweet-food-eaten-after-main-meal',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '디저트',
      'desert',
      'sweet food eaten at the end of a meal',
      'десерт',
    ),
    examples: [
      {
        english: 'I would like to order some dessert.',
        translations: L(
          '디저트를 주문하고 싶어요.',
          'Men desert buyurtma qilmoqchiman.',
          'I would like to order some dessert.',
          'Я хотел бы заказать десерт.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/dɪˈzɜːt/',
      ttsText: 'dessert',
    },
    media: {
      emoji: '🍨',
      imageUrl: '',
      imageAlt: L('디저트', 'desert', 'a dessert', 'десерт'),
    },
    tags: ['food', 'cafe'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-filling',
    english: 'filling',
    senseKey: 'food-put-inside-sandwich-or-cake',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '속재료',
      'ichlik',
      'food that is put inside a sandwich or cake',
      'начинка',
    ),
    examples: [
      {
        english: 'The cake has a sweet filling.',
        translations: L(
          '그 케이크에는 달콤한 속재료가 들어 있어요.',
          'Tortning shirin ichligi bor.',
          'The cake has a sweet filling.',
          'У пирога сладкая начинка.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈfɪlɪŋ/',
      ttsText: 'filling',
    },
    media: {
      emoji: '🥮',
      imageUrl: '',
      imageAlt: L(
        '음식 안의 속재료',
        'taom ichidagi ichlik',
        'a sweet filling',
        'сладкая начинка',
      ),
    },
    tags: ['food', 'cafe'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-menu',
    english: 'menu',
    senseKey: 'list-of-food-and-drinks-served',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '메뉴',
      'menyu',
      'a list of food and drinks available in a restaurant or cafe',
      'меню',
    ),
    examples: [
      {
        english: 'Would you like to see the menu?',
        translations: L(
          '메뉴를 보실래요?',
          'Menyuni ko‘rishni xohlaysizmi?',
          'Would you like to see the menu?',
          'Хотите посмотреть меню?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈmenjuː/',
      ttsText: 'menu',
    },
    media: {
      emoji: '📋',
      imageUrl: '',
      imageAlt: L('카페 메뉴', 'kafe menyusi', 'a cafe menu', 'меню кафе'),
    },
    tags: ['cafe', 'restaurant'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-snack',
    english: 'snack',
    senseKey: 'small-amount-of-food-between-meals',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '간식',
      'yengil tamaddi',
      'a small amount of food eaten between meals',
      'закуска; перекус',
    ),
    examples: [
      {
        english: 'Cake is a popular snack.',
        translations: L(
          '케이크는 인기 있는 간식이에요.',
          'Tort mashhur yengil tamaddi.',
          'Cake is a popular snack.',
          'Торт — популярный перекус.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/snæk/',
      ttsText: 'snack',
    },
    media: {
      emoji: '🍪',
      imageUrl: '',
      imageAlt: L('간식', 'yengil tamaddi', 'a snack', 'закуска'),
    },
    tags: ['food', 'cafe'],
    difficulty: 1,
    isCore: true,
  },
];

export const EN_S1_UNIT10_NODE3_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Cafe food and drinks
  // ===========================================================

  en_s1u10_n3_001_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I would like a cup of tea.',
    audioText: 'I would like a cup of tea.',
    answerTranslation: L(
      '차 한 잔 주세요.',
      'Men bir piyola choy xohlayman.',
      'I would like a cup of tea.',
      'Я бы хотел чашку чая.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['cafe', 'tea'],
  },

  en_s1u10_n3_002_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'doughnut',
    choices: [
      { text: 'salad', label: '🥗', emoji: '🥗', imageUrl: '' },
      { text: 'doughnut', label: '🍩', emoji: '🍩', imageUrl: '' },
      { text: 'croissant', label: '🥐', emoji: '🥐', imageUrl: '' },
      { text: 'sandwich', label: '🥪', emoji: '🥪', imageUrl: '' },
    ],
    answerTranslation: L('도넛', 'ponchik', 'doughnut', 'пончик'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['doughnut'],
  },

  en_s1u10_n3_003_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'coffee',
        native: 'qahva',
        nativeI18n: L('커피', 'qahva', 'coffee', 'кофе'),
      },
      {
        text: 'tea',
        native: 'choy',
        nativeI18n: L('차', 'choy', 'tea', 'чай'),
      },
      {
        text: 'juice',
        native: 'sharbat',
        nativeI18n: L('주스', 'sharbat', 'juice', 'сок'),
      },
      {
        text: 'water',
        native: 'suv',
        nativeI18n: L('물', 'suv', 'water', 'вода'),
      },
      {
        text: 'milk',
        native: 'sut',
        nativeI18n: L('우유', 'sut', 'milk', 'молоко'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['drinks', 'matching'],
  },

  en_s1u10_n3_004_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['coffee', 'like', 'a', 'I', 'would', 'tea', 'to', 'am'],
    answer: 'I would like a coffee',
    answerTranslation: L(
      '커피 한 잔 주세요.',
      'Men qahva xohlayman.',
      'I would like a coffee.',
      'Я бы хотел кофе.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['would-like', 'coffee'],
  },

  en_s1u10_n3_005_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['juice', 'orange', 'an', 'like', 'would', 'I', 'apple', 'to'],
    answer: 'I would like an orange juice',
    audioText: 'I would like an orange juice.',
    answerTranslation: L(
      '오렌지 주스 주세요.',
      'Men apelsin sharbatini xohlayman.',
      'I would like an orange juice.',
      'Я бы хотел апельсиновый сок.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['would-like', 'juice'],
  },

  en_s1u10_n3_006_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'coffee',
        native: 'qahva',
        nativeI18n: L('커피', 'qahva', 'coffee', 'кофе'),
      },
      {
        text: 'tea',
        native: 'choy',
        nativeI18n: L('차', 'choy', 'tea', 'чай'),
      },
      {
        text: 'juice',
        native: 'sharbat',
        nativeI18n: L('주스', 'sharbat', 'juice', 'сок'),
      },
      {
        text: 'water',
        native: 'suv',
        nativeI18n: L('물', 'suv', 'water', 'вода'),
      },
      {
        text: 'milk',
        native: 'sut',
        nativeI18n: L('우유', 'sut', 'milk', 'молоко'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['drinks', 'listening'],
  },

  en_s1u10_n3_007_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I would like a ',
    sentenceSuffix: '.',
    answer: 'coffee',
    answerTranslation: L(
      '커피 한 잔 주세요.',
      'Men qahva xohlayman.',
      'I would like a coffee.',
      'Я бы хотел кофе.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "coffee".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'coffee'],
  },

  en_s1u10_n3_008_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'croissant',
    choices: [
      { text: 'cake', label: '🍰', emoji: '🍰', imageUrl: '' },
      { text: 'sandwich', label: '🥪', emoji: '🥪', imageUrl: '' },
      { text: 'croissant', label: '🥐', emoji: '🥐', imageUrl: '' },
      { text: 'salad', label: '🥗', emoji: '🥗', imageUrl: '' },
    ],
    answerTranslation: L('크루아상', 'kruassan', 'croissant', 'круассан'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['croissant'],
  },

  en_s1u10_n3_009_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Would you like milk with your coffee?',
    audioText: 'Would you like milk with your coffee?',
    answerI18n: L(
      '커피에 우유를 넣어 드릴까요',
      'Qahvangizga sut xohlaysizmi',
      'Would you like milk with your coffee',
      'Хотите молоко в кофе',
    ),
    options: ['Would', 'you', 'like', 'milk', 'with', 'your', 'coffee', 'tea'],
    optionsI18n: {
      ko: ['커피에', '우유를', '넣어', '드릴까요'],
      uz: ['Qahvangizga', 'sut', 'xohlaysizmi'],
      en: ['Would', 'you', 'like', 'milk', 'with', 'your', 'coffee'],
      ru: ['Хотите', 'молоко', 'в', 'кофе'],
    },
    answerTranslation: L(
      '커피에 우유를 넣어 드릴까요?',
      'Qahvangizga sut xohlaysizmi?',
      'Would you like milk with your coffee?',
      'Хотите молоко в кофе?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['would-like', 'milk'],
  },

  en_s1u10_n3_010_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Would you like a coffee?',
    options: ['Yes', 'please', 'No', 'thanks', 'coffee', 'would'],
    answer: 'Yes please',
    answerTranslation: L(
      '네, 주세요.',
      'Ha, iltimos.',
      'Yes, please.',
      'Да, пожалуйста.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['offer', 'reply'],
  },

  en_s1u10_n3_011_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Would you like some ',
    sentenceSuffix: '?',
    answer: 'water',
    answerTranslation: L(
      '물 좀 드실래요?',
      'Biroz suv xohlaysizmi?',
      'Would you like some water?',
      'Хотите воды?',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "water".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'water'],
  },

  en_s1u10_n3_012_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'cake',
        native: 'tort',
        nativeI18n: L('케이크', 'tort', 'cake', 'торт'),
      },
      {
        text: 'doughnut',
        native: 'ponchik',
        nativeI18n: L('도넛', 'ponchik', 'doughnut', 'пончик'),
      },
      {
        text: 'salad',
        native: 'salat',
        nativeI18n: L('샐러드', 'salat', 'salad', 'салат'),
      },
      {
        text: 'croissant',
        native: 'kruassan',
        nativeI18n: L('크루아상', 'kruassan', 'croissant', 'круассан'),
      },
      {
        text: 'sandwich',
        native: 'sendvich',
        nativeI18n: L('샌드위치', 'sendvich', 'sandwich', 'сэндвич'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['food', 'matching'],
  },

  en_s1u10_n3_013_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['salad', 'like', 'She', 'would', 'a', 'cake', 'likes', 'to'],
    answer: 'She would like a salad',
    answerTranslation: L(
      '그녀는 샐러드를 원해요.',
      'U salat xohlaydi.',
      'She would like a salad.',
      'Она хотела бы салат.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['would-like', 'salad'],
  },

  en_s1u10_n3_014_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'cake',
        native: 'tort',
        nativeI18n: L('케이크', 'tort', 'cake', 'торт'),
      },
      {
        text: 'doughnut',
        native: 'ponchik',
        nativeI18n: L('도넛', 'ponchik', 'doughnut', 'пончик'),
      },
      {
        text: 'salad',
        native: 'salat',
        nativeI18n: L('샐러드', 'salat', 'salad', 'салат'),
      },
      {
        text: 'croissant',
        native: 'kruassan',
        nativeI18n: L('크루아상', 'kruassan', 'croissant', 'круассан'),
      },
      {
        text: 'sandwich',
        native: 'sendvich',
        nativeI18n: L('샌드위치', 'sendvich', 'sandwich', 'сэндвич'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['food', 'listening'],
  },

  en_s1u10_n3_015_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'sandwich',
    choices: [
      { text: 'doughnut', label: '🍩', emoji: '🍩', imageUrl: '' },
      { text: 'croissant', label: '🥐', emoji: '🥐', imageUrl: '' },
      { text: 'sandwich', label: '🥪', emoji: '🥪', imageUrl: '' },
      { text: 'cake', label: '🍰', emoji: '🍰', imageUrl: '' },
    ],
    answerTranslation: L('샌드위치', 'sendvich', 'sandwich', 'сэндвич'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['sandwich'],
  },

  en_s1u10_n3_016_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'It is a cold snack made with two pieces of ___.',
    blankAnswers: ['bread'],
    options: ['bread', 'juice', 'milk', 'coffee'],
    answer: 'bread',
    answerTranslation: L(
      '빵 두 조각으로 만든 차가운 간식이에요.',
      'Bu ikki bo‘lak non bilan tayyorlangan sovuq yengil taom.',
      'It is a cold snack made with two pieces of bread.',
      'Это холодная закуска из двух кусочков хлеба.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['sandwich', 'definition'],
  },

  en_s1u10_n3_017_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I would like a ',
    sentenceSuffix: '.',
    answer: 'croissant',
    answerTranslation: L(
      '크루아상 하나 주세요.',
      'Men kruassan xohlayman.',
      'I would like a croissant.',
      'Я бы хотел круассан.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "croissant".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'croissant'],
  },

  en_s1u10_n3_018_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['biscuit', 'you', 'like', 'Would', 'a', 'cake', 'do', 'to'],
    answer: 'Would you like a biscuit',
    audioText: 'Would you like a biscuit?',
    answerTranslation: L(
      '비스킷 드실래요?',
      'Pechenye xohlaysizmi?',
      'Would you like a biscuit?',
      'Хотите печенье?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['would-like', 'biscuit'],
  },

  en_s1u10_n3_019_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Would you like an orange juice?',
    options: ['No', 'thanks', 'Yes', 'please', 'juice', 'like'],
    answer: 'No thanks',
    answerTranslation: L(
      '아니요, 괜찮아요.',
      'Yo‘q, rahmat.',
      'No, thanks.',
      'Нет, спасибо.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['offer', 'reply'],
  },

  en_s1u10_n3_020_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Would you like a doughnut or a biscuit?' },
    ],
    options: [
      'A biscuit, please.',
      'I like yesterday biscuit.',
      'Yes, I would to biscuit.',
      'A coffee to eating.',
    ],
    answer: 'A biscuit, please.',
    answerTranslation: L(
      '비스킷 하나 주세요.',
      'Bir dona pechenye, iltimos.',
      'A biscuit, please.',
      'Печенье, пожалуйста.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['cafe', 'dialog'],
  },

  // ===========================================================
  // Lesson 2 · Cafe cities
  // ===========================================================

  en_s1u10_n3_021_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Vienna is famous for its cafes and coffee.',
    audioText: 'Vienna is famous for its cafes and coffee.',
    answerTranslation: L(
      '빈은 카페와 커피로 유명해요.',
      'Vena kafelari va qahvasi bilan mashhur.',
      'Vienna is famous for its cafes and coffee.',
      'Вена известна своими кафе и кофе.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['cafe-cities', 'vienna'],
  },

  en_s1u10_n3_022_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'cake',
    choices: [
      { text: 'salad', label: '🥗', emoji: '🥗', imageUrl: '' },
      { text: 'cake', label: '🍰', emoji: '🍰', imageUrl: '' },
      { text: 'sandwich', label: '🥪', emoji: '🥪', imageUrl: '' },
      { text: 'coffee', label: '☕', emoji: '☕', imageUrl: '' },
    ],
    answerTranslation: L('케이크', 'tort', 'cake', 'торт'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['cake'],
  },

  en_s1u10_n3_023_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'cafe',
        native: 'kafe',
        nativeI18n: L('카페', 'kafe', 'cafe', 'кафе'),
      },
      {
        text: 'dessert',
        native: 'desert',
        nativeI18n: L('디저트', 'desert', 'dessert', 'десерт'),
      },
      {
        text: 'filling',
        native: 'ichlik',
        nativeI18n: L('속재료', 'ichlik', 'filling', 'начинка'),
      },
      {
        text: 'snack',
        native: 'yengil tamaddi',
        nativeI18n: L('간식', 'yengil tamaddi', 'snack', 'закуска'),
      },
      {
        text: 'menu',
        native: 'menyu',
        nativeI18n: L('메뉴', 'menyu', 'menu', 'меню'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['cafe-cities', 'matching'],
  },

  en_s1u10_n3_024_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['famous', 'coffee', 'world', 'is', 'Vienna', 'in', 'the', 'very'],
    answer: 'Coffee in Vienna is world famous',
    answerTranslation: L(
      '빈의 커피는 세계적으로 유명해요.',
      'Venadagi qahva dunyoga mashhur.',
      'Coffee in Vienna is world famous.',
      'Кофе в Вене известен во всём мире.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['vienna', 'coffee'],
  },

  en_s1u10_n3_025_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'good',
      'Melbourne',
      'very',
      'coffee',
      'in',
      'is',
      'cheap',
      'not',
    ],
    answer: 'Coffee in Melbourne is very good',
    audioText: 'Coffee in Melbourne is very good.',
    answerTranslation: L(
      '멜버른의 커피는 아주 맛있어요.',
      'Melburndagi qahva juda yaxshi.',
      'Coffee in Melbourne is very good.',
      'Кофе в Мельбурне очень хороший.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['melbourne', 'coffee'],
  },

  en_s1u10_n3_026_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'cafe',
        native: 'kafe',
        nativeI18n: L('카페', 'kafe', 'cafe', 'кафе'),
      },
      {
        text: 'dessert',
        native: 'desert',
        nativeI18n: L('디저트', 'desert', 'dessert', 'десерт'),
      },
      {
        text: 'filling',
        native: 'ichlik',
        nativeI18n: L('속재료', 'ichlik', 'filling', 'начинка'),
      },
      {
        text: 'snack',
        native: 'yengil tamaddi',
        nativeI18n: L('간식', 'yengil tamaddi', 'snack', 'закуска'),
      },
      {
        text: 'menu',
        native: 'menyu',
        nativeI18n: L('메뉴', 'menyu', 'menu', 'меню'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['cafe-cities', 'listening'],
  },

  en_s1u10_n3_027_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'The cake has a sweet ',
    sentenceSuffix: '.',
    answer: 'filling',
    answerTranslation: L(
      '그 케이크에는 달콤한 속재료가 들어 있어요.',
      'Tortning shirin ichligi bor.',
      'The cake has a sweet filling.',
      'У пирога сладкая начинка.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "filling".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'filling'],
  },

  en_s1u10_n3_028_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'coffee',
    choices: [
      { text: 'juice', label: '🧃', emoji: '🧃', imageUrl: '' },
      { text: 'milk', label: '🥛', emoji: '🥛', imageUrl: '' },
      { text: 'coffee', label: '☕', emoji: '☕', imageUrl: '' },
      { text: 'tea', label: '🍵', emoji: '🍵', imageUrl: '' },
    ],
    answerTranslation: L('커피', 'qahva', 'coffee', 'кофе'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['coffee'],
  },

  en_s1u10_n3_029_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'You can try many different coffees and teas in Taipei.',
    audioText: 'You can try many different coffees and teas in Taipei.',
    answerI18n: L(
      '타이베이에서는 여러 종류의 커피와 차를 맛볼 수 있어요',
      'Taypeyda turli xil qahva va choylarni tatib ko‘rishingiz mumkin',
      'You can try many different coffees and teas in Taipei',
      'В Тайбэе можно попробовать много разных видов кофе и чая',
    ),
    options: [
      'You',
      'can',
      'try',
      'many',
      'different',
      'coffees',
      'and',
      'teas',
      'in',
      'Taipei',
      'Havana',
    ],
    optionsI18n: {
      ko: [
        '타이베이에서는',
        '여러',
        '종류의',
        '커피와',
        '차를',
        '맛볼',
        '수',
        '있어요',
      ],
      uz: [
        'Taypeyda',
        'turli',
        'xil',
        'qahva',
        'va',
        'choylarni',
        'tatib',
        'ko‘rishingiz',
        'mumkin',
      ],
      en: [
        'You',
        'can',
        'try',
        'many',
        'different',
        'coffees',
        'and',
        'teas',
        'in',
        'Taipei',
      ],
      ru: [
        'В',
        'Тайбэе',
        'можно',
        'попробовать',
        'много',
        'разных',
        'видов',
        'кофе',
        'и',
        'чая',
      ],
    },
    answerTranslation: L(
      '타이베이에서는 여러 종류의 커피와 차를 맛볼 수 있어요.',
      'Taypeyda turli xil qahva va choylarni tatib ko‘rishingiz mumkin.',
      'You can try many different coffees and teas in Taipei.',
      'В Тайбэе можно попробовать много разных видов кофе и чая.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['taipei', 'cafe-cities'],
  },

  en_s1u10_n3_030_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What can you try in Vienna?',
    options: [
      'You',
      'can',
      'try',
      'a',
      'special',
      'chocolate',
      'cake',
      'salad',
      'juice',
    ],
    answer: 'You can try a special chocolate cake',
    answerTranslation: L(
      '특별한 초콜릿 케이크를 먹어 볼 수 있어요.',
      'Maxsus shokoladli tortni tatib ko‘rishingiz mumkin.',
      'You can try a special chocolate cake.',
      'Можно попробовать особый шоколадный торт.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['vienna', 'reply'],
  },

  en_s1u10_n3_031_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Cake is a popular ',
    sentenceSuffix: '.',
    answer: 'snack',
    answerTranslation: L(
      '케이크는 인기 있는 간식이에요.',
      'Tort mashhur yengil tamaddi.',
      'Cake is a popular snack.',
      'Торт — популярный перекус.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "snack".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'snack'],
  },

  en_s1u10_n3_032_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'coffee',
        native: 'qahva',
        nativeI18n: L('커피', 'qahva', 'coffee', 'кофе'),
      },
      {
        text: 'biscuit',
        native: 'pechenye',
        nativeI18n: L('비스킷', 'pechenye', 'biscuit', 'печенье'),
      },
      {
        text: 'cake',
        native: 'tort',
        nativeI18n: L('케이크', 'tort', 'cake', 'торт'),
      },
      {
        text: 'milk',
        native: 'sut',
        nativeI18n: L('우유', 'sut', 'milk', 'молоко'),
      },
      {
        text: 'doughnut',
        native: 'ponchik',
        nativeI18n: L('도넛', 'ponchik', 'doughnut', 'пончик'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['cafe-cities', 'matching'],
  },

  en_s1u10_n3_033_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'cheap',
      'Cuba',
      'coffee',
      'in',
      'very',
      'is',
      'expensive',
      'milk',
    ],
    answer: 'Coffee in Cuba is very cheap',
    answerTranslation: L(
      '쿠바에서는 커피가 아주 저렴해요.',
      'Kubada qahva juda arzon.',
      'Coffee in Cuba is very cheap.',
      'На Кубе кофе очень дешёвый.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['havana', 'coffee'],
  },

  en_s1u10_n3_034_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'coffee',
        native: 'qahva',
        nativeI18n: L('커피', 'qahva', 'coffee', 'кофе'),
      },
      {
        text: 'biscuit',
        native: 'pechenye',
        nativeI18n: L('비스킷', 'pechenye', 'biscuit', 'печенье'),
      },
      {
        text: 'cake',
        native: 'tort',
        nativeI18n: L('케이크', 'tort', 'cake', 'торт'),
      },
      {
        text: 'milk',
        native: 'sut',
        nativeI18n: L('우유', 'sut', 'milk', 'молоко'),
      },
      {
        text: 'doughnut',
        native: 'ponchik',
        nativeI18n: L('도넛', 'ponchik', 'doughnut', 'пончик'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['cafe-cities', 'listening'],
  },

  en_s1u10_n3_035_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'biscuit',
    choices: [
      { text: 'cake', label: '🍰', emoji: '🍰', imageUrl: '' },
      { text: 'doughnut', label: '🍩', emoji: '🍩', imageUrl: '' },
      { text: 'biscuit', label: '🍪', emoji: '🍪', imageUrl: '' },
      { text: 'sandwich', label: '🥪', emoji: '🥪', imageUrl: '' },
    ],
    answerTranslation: L('비스킷', 'pechenye', 'biscuit', 'печенье'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['biscuit'],
  },

  en_s1u10_n3_036_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Seattle has many ___.',
    blankAnswers: ['cafes'],
    options: ['cafes', 'salads', 'milks', 'waters'],
    answer: 'cafes',
    answerTranslation: L(
      '시애틀에는 카페가 많아요.',
      'Seattleda ko‘p kafelar bor.',
      'Seattle has many cafes.',
      'В Сиэтле много кафе.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['seattle', 'cafe'],
  },

  en_s1u10_n3_037_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'This ',
    sentenceSuffix: ' is very popular.',
    answer: 'cafe',
    answerTranslation: L(
      '이 카페는 아주 인기가 많아요.',
      'Bu kafe juda mashhur.',
      'This cafe is very popular.',
      'Это кафе очень популярно.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "cafe".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'cafe'],
  },

  en_s1u10_n3_038_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'coffee',
      'doughnut',
      'your',
      'with',
      'Try',
      'a',
      'Seattle',
      'salad',
    ],
    answer: 'Try a doughnut with your coffee',
    audioText: 'Try a doughnut with your coffee.',
    answerTranslation: L(
      '커피와 함께 도넛을 먹어 보세요.',
      'Qahva bilan ponchikni tatib ko‘ring.',
      'Try a doughnut with your coffee.',
      'Попробуйте пончик с кофе.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['seattle', 'doughnut'],
  },

  en_s1u10_n3_039_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What is special about the cake in Taipei?',
    options: ['It', 'has', 'a', 'sweet', 'filling', 'coffee', 'salad', 'water'],
    answer: 'It has a sweet filling',
    answerTranslation: L(
      '달콤한 속재료가 들어 있어요.',
      'Uning shirin ichligi bor.',
      'It has a sweet filling.',
      'У него сладкая начинка.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['taipei', 'filling'],
  },

  en_s1u10_n3_040_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Which cafe city would you like to visit?' },
    ],
    options: [
      'I’d like to visit Vienna.',
      'I’d like Vienna yesterday.',
      'I would visiting coffee.',
      'Vienna would cafe me.',
    ],
    answer: 'I’d like to visit Vienna.',
    answerTranslation: L(
      '빈에 가 보고 싶어요.',
      'Men Venaga borishni xohlayman.',
      'I’d like to visit Vienna.',
      'Я хотел бы посетить Вену.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['cafe-cities', 'dialog'],
  },

  // ===========================================================
  // Lesson 3 · Would like
  // ===========================================================

  en_s1u10_n3_041_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Would you like to see the menu?',
    audioText: 'Would you like to see the menu?',
    answerTranslation: L(
      '메뉴를 보실래요?',
      'Menyuni ko‘rishni xohlaysizmi?',
      'Would you like to see the menu?',
      'Хотите посмотреть меню?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['would-like', 'menu'],
  },

  en_s1u10_n3_042_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'menu',
    choices: [
      { text: 'sandwich', label: '🥪', emoji: '🥪', imageUrl: '' },
      { text: 'menu', label: '📋', emoji: '📋', imageUrl: '' },
      { text: 'coffee', label: '☕', emoji: '☕', imageUrl: '' },
      { text: 'cake', label: '🍰', emoji: '🍰', imageUrl: '' },
    ],
    answerTranslation: L('메뉴', 'menyu', 'menu', 'меню'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['menu'],
  },

  en_s1u10_n3_043_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'menu',
        native: 'menyu',
        nativeI18n: L('메뉴', 'menyu', 'menu', 'меню'),
      },
      {
        text: 'dessert',
        native: 'desert',
        nativeI18n: L('디저트', 'desert', 'dessert', 'десерт'),
      },
      {
        text: 'sandwich',
        native: 'sendvich',
        nativeI18n: L('샌드위치', 'sendvich', 'sandwich', 'сэндвич'),
      },
      {
        text: 'salad',
        native: 'salat',
        nativeI18n: L('샐러드', 'salat', 'salad', 'салат'),
      },
      {
        text: 'juice',
        native: 'sharbat',
        nativeI18n: L('주스', 'sharbat', 'juice', 'сок'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['would-like', 'matching'],
  },

  en_s1u10_n3_044_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['order', 'like', 'now', 'I', 'would', 'to', 'ordering', 'menu'],
    answer: 'I would like to order now',
    answerTranslation: L(
      '지금 주문하고 싶어요.',
      'Men hozir buyurtma bermoqchiman.',
      'I would like to order now.',
      'Я хотел бы заказать сейчас.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['would-like', 'to-verb'],
  },

  en_s1u10_n3_045_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'cake',
      'try',
      'like',
      'you',
      'Would',
      'to',
      'the',
      'trying',
      'a',
    ],
    answer: 'Would you like to try the cake',
    audioText: 'Would you like to try the cake?',
    answerTranslation: L(
      '케이크를 드셔 보실래요?',
      'Tortni tatib ko‘rishni xohlaysizmi?',
      'Would you like to try the cake?',
      'Хотите попробовать торт?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['would-like', 'to-verb'],
  },

  en_s1u10_n3_046_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'menu',
        native: 'menyu',
        nativeI18n: L('메뉴', 'menyu', 'menu', 'меню'),
      },
      {
        text: 'dessert',
        native: 'desert',
        nativeI18n: L('디저트', 'desert', 'dessert', 'десерт'),
      },
      {
        text: 'sandwich',
        native: 'sendvich',
        nativeI18n: L('샌드위치', 'sendvich', 'sandwich', 'сэндвич'),
      },
      {
        text: 'salad',
        native: 'salat',
        nativeI18n: L('샐러드', 'salat', 'salad', 'салат'),
      },
      {
        text: 'juice',
        native: 'sharbat',
        nativeI18n: L('주스', 'sharbat', 'juice', 'сок'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['would-like', 'listening'],
  },

  en_s1u10_n3_047_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I would like ',
    sentenceSuffix: ' order now.',
    answer: 'to',
    answerTranslation: L(
      '지금 주문하고 싶어요.',
      'Men hozir buyurtma bermoqchiman.',
      'I would like to order now.',
      'Я хотел бы заказать сейчас.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Use "to" before a verb after "would like".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'would-like'],
  },

  en_s1u10_n3_048_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'dessert',
    choices: [
      { text: 'salad', label: '🥗', emoji: '🥗', imageUrl: '' },
      { text: 'sandwich', label: '🥪', emoji: '🥪', imageUrl: '' },
      { text: 'dessert', label: '🍨', emoji: '🍨', imageUrl: '' },
      { text: 'coffee', label: '☕', emoji: '☕', imageUrl: '' },
    ],
    answerTranslation: L('디저트', 'desert', 'dessert', 'десерт'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['dessert'],
  },

  en_s1u10_n3_049_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'We would like an orange juice.',
    audioText: 'We would like an orange juice.',
    answerI18n: L(
      '저희는 오렌지 주스를 원해요',
      'Biz apelsin sharbatini xohlaymiz',
      'We would like an orange juice',
      'Мы бы хотели апельсиновый сок',
    ),
    options: ['We', 'would', 'like', 'an', 'orange', 'juice', 'to', 'order'],
    optionsI18n: {
      ko: ['저희는', '오렌지', '주스를', '원해요'],
      uz: ['Biz', 'apelsin', 'sharbatini', 'xohlaymiz'],
      en: ['We', 'would', 'like', 'an', 'orange', 'juice'],
      ru: ['Мы', 'бы', 'хотели', 'апельсиновый', 'сок'],
    },
    answerTranslation: L(
      '저희는 오렌지 주스를 원해요.',
      'Biz apelsin sharbatini xohlaymiz.',
      'We would like an orange juice.',
      'Мы бы хотели апельсиновый сок.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['would-like', 'noun'],
  },

  en_s1u10_n3_050_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Would you like to see the menu?',
    options: ['Yes', 'please', 'thank', 'you', 'No', 'order'],
    answer: 'Yes please thank you',
    answerTranslation: L(
      '네, 주세요. 감사합니다.',
      'Ha, iltimos. Rahmat.',
      'Yes, please. Thank you.',
      'Да, пожалуйста. Спасибо.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['would-like', 'reply'],
  },

  en_s1u10_n3_051_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Would you ',
    sentenceSuffix: ' a coffee?',
    answer: 'like',
    answerTranslation: L(
      '커피 드실래요?',
      'Qahva xohlaysizmi?',
      'Would you like a coffee?',
      'Хотите кофе?',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "like".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'would-like'],
  },

  en_s1u10_n3_052_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'coffee',
        native: 'qahva',
        nativeI18n: L('커피', 'qahva', 'coffee', 'кофе'),
      },
      {
        text: 'cake',
        native: 'tort',
        nativeI18n: L('케이크', 'tort', 'cake', 'торт'),
      },
      {
        text: 'salad',
        native: 'salat',
        nativeI18n: L('샐러드', 'salat', 'salad', 'салат'),
      },
      {
        text: 'doughnut',
        native: 'ponchik',
        nativeI18n: L('도넛', 'ponchik', 'doughnut', 'пончик'),
      },
      {
        text: 'biscuit',
        native: 'pechenye',
        nativeI18n: L('비스킷', 'pechenye', 'biscuit', 'печенье'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['would-like', 'matching'],
  },

  en_s1u10_n3_053_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'menu',
      'see',
      'Would',
      'like',
      'you',
      'to',
      'the',
      'seeing',
      'a',
    ],
    answer: 'Would you like to see the menu',
    answerTranslation: L(
      '메뉴를 보실래요?',
      'Menyuni ko‘rishni xohlaysizmi?',
      'Would you like to see the menu?',
      'Хотите посмотреть меню?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['would-like', 'menu'],
  },

  en_s1u10_n3_054_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'coffee',
        native: 'qahva',
        nativeI18n: L('커피', 'qahva', 'coffee', 'кофе'),
      },
      {
        text: 'cake',
        native: 'tort',
        nativeI18n: L('케이크', 'tort', 'cake', 'торт'),
      },
      {
        text: 'salad',
        native: 'salat',
        nativeI18n: L('샐러드', 'salat', 'salad', 'салат'),
      },
      {
        text: 'doughnut',
        native: 'ponchik',
        nativeI18n: L('도넛', 'ponchik', 'doughnut', 'пончик'),
      },
      {
        text: 'biscuit',
        native: 'pechenye',
        nativeI18n: L('비스킷', 'pechenye', 'biscuit', 'печенье'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['would-like', 'listening'],
  },

  en_s1u10_n3_055_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'salad',
    choices: [
      { text: 'cake', label: '🍰', emoji: '🍰', imageUrl: '' },
      { text: 'doughnut', label: '🍩', emoji: '🍩', imageUrl: '' },
      { text: 'salad', label: '🥗', emoji: '🥗', imageUrl: '' },
      { text: 'croissant', label: '🥐', emoji: '🥐', imageUrl: '' },
    ],
    answerTranslation: L('샐러드', 'salat', 'salad', 'салат'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['salad'],
  },

  en_s1u10_n3_056_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Would you like ___ try the cake?',
    blankAnswers: ['to'],
    options: ['to', 'for', 'at', 'on'],
    answer: 'to',
    answerTranslation: L(
      '케이크를 드셔 보실래요?',
      'Tortni tatib ko‘rishni xohlaysizmi?',
      'Would you like to try the cake?',
      'Хотите попробовать торт?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['would-like', 'to-verb'],
  },

  en_s1u10_n3_057_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Would you like to see the ',
    sentenceSuffix: '?',
    answer: 'menu',
    answerTranslation: L(
      '메뉴를 보실래요?',
      'Menyuni ko‘rishni xohlaysizmi?',
      'Would you like to see the menu?',
      'Хотите посмотреть меню?',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "menu".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'menu'],
  },

  en_s1u10_n3_058_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'coffee',
      'milk',
      'Would',
      'like',
      'your',
      'you',
      'with',
      'to',
      'tea',
    ],
    answer: 'Would you like milk with your coffee',
    audioText: 'Would you like milk with your coffee?',
    answerTranslation: L(
      '커피에 우유를 넣어 드릴까요?',
      'Qahvangizga sut xohlaysizmi?',
      'Would you like milk with your coffee?',
      'Хотите молоко в кофе?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['would-like', 'coffee'],
  },

  en_s1u10_n3_059_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Would you like to try the cake?',
    options: ['No', 'thanks', 'I', 'am', 'not', 'hungry', 'Yes', 'cake'],
    answer: 'No thanks I am not hungry',
    answerTranslation: L(
      '아니요, 괜찮아요. 배가 고프지 않아요.',
      'Yo‘q, rahmat. Men och emasman.',
      'No, thanks. I am not hungry.',
      'Нет, спасибо. Я не голоден.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['would-like', 'reply'],
  },

  en_s1u10_n3_060_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Would you like a salad?' }],
    options: [
      'Yes, please.',
      'Yes, I like to a salad.',
      'I would salad yesterday.',
      'No, I am going salad.',
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
    tags: ['would-like', 'dialog'],
  },

  // ===========================================================
  // Lesson 4 · In a cafe
  // ===========================================================

  en_s1u10_n3_061_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I’d like the cake and a cup of tea.',
    audioText: 'I’d like the cake and a cup of tea.',
    answerTranslation: L(
      '케이크와 차 한 잔 주세요.',
      'Men tort va bir piyola choy xohlayman.',
      'I’d like the cake and a cup of tea.',
      'Я бы хотел торт и чашку чая.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['cafe-dialog', 'would-like'],
  },

  en_s1u10_n3_062_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'coffee',
    choices: [
      { text: 'water', label: '💧', emoji: '💧', imageUrl: '' },
      { text: 'milk', label: '🥛', emoji: '🥛', imageUrl: '' },
      { text: 'coffee', label: '☕', emoji: '☕', imageUrl: '' },
      { text: 'juice', label: '🧃', emoji: '🧃', imageUrl: '' },
    ],
    answerTranslation: L('커피', 'qahva', 'coffee', 'кофе'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['coffee'],
  },

  en_s1u10_n3_063_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'menu',
        native: 'menyu',
        nativeI18n: L('메뉴', 'menyu', 'menu', 'меню'),
      },
      {
        text: 'dessert',
        native: 'desert',
        nativeI18n: L('디저트', 'desert', 'dessert', 'десерт'),
      },
      {
        text: 'coffee',
        native: 'qahva',
        nativeI18n: L('커피', 'qahva', 'coffee', 'кофе'),
      },
      {
        text: 'cake',
        native: 'tort',
        nativeI18n: L('케이크', 'tort', 'cake', 'торт'),
      },
      {
        text: 'tea',
        native: 'choy',
        nativeI18n: L('차', 'choy', 'tea', 'чай'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['cafe-dialog', 'matching'],
  },

  en_s1u10_n3_064_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'dessert',
      'some',
      'order',
      'like',
      'I',
      'would',
      'to',
      'menu',
      'ordering',
    ],
    answer: 'I would like to order some dessert',
    answerTranslation: L(
      '디저트를 주문하고 싶어요.',
      'Men desert buyurtma qilmoqchiman.',
      'I would like to order some dessert.',
      'Я хотел бы заказать десерт.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['would-like', 'dessert'],
  },

  en_s1u10_n3_065_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['tea', 'cup', 'a', 'of', 'like', 'I', 'would', 'coffee', 'to'],
    answer: 'I would like a cup of tea',
    audioText: 'I would like a cup of tea.',
    answerTranslation: L(
      '차 한 잔 주세요.',
      'Men bir piyola choy xohlayman.',
      'I would like a cup of tea.',
      'Я бы хотел чашку чая.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['would-like', 'tea'],
  },

  en_s1u10_n3_066_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'menu',
        native: 'menyu',
        nativeI18n: L('메뉴', 'menyu', 'menu', 'меню'),
      },
      {
        text: 'dessert',
        native: 'desert',
        nativeI18n: L('디저트', 'desert', 'dessert', 'десерт'),
      },
      {
        text: 'coffee',
        native: 'qahva',
        nativeI18n: L('커피', 'qahva', 'coffee', 'кофе'),
      },
      {
        text: 'cake',
        native: 'tort',
        nativeI18n: L('케이크', 'tort', 'cake', 'торт'),
      },
      {
        text: 'tea',
        native: 'choy',
        nativeI18n: L('차', 'choy', 'tea', 'чай'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['cafe-dialog', 'listening'],
  },

  en_s1u10_n3_067_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I would like to order some ',
    sentenceSuffix: '.',
    answer: 'dessert',
    answerTranslation: L(
      '디저트를 주문하고 싶어요.',
      'Men desert buyurtma qilmoqchiman.',
      'I would like to order some dessert.',
      'Я хотел бы заказать десерт.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "dessert".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'dessert'],
  },

  en_s1u10_n3_068_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'tea',
    choices: [
      { text: 'milk', label: '🥛', emoji: '🥛', imageUrl: '' },
      { text: 'juice', label: '🧃', emoji: '🧃', imageUrl: '' },
      { text: 'tea', label: '🍵', emoji: '🍵', imageUrl: '' },
      { text: 'water', label: '💧', emoji: '💧', imageUrl: '' },
    ],
    answerTranslation: L('차', 'choy', 'tea', 'чай'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['tea'],
  },

  en_s1u10_n3_069_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Would you like a drink?',
    audioText: 'Would you like a drink?',
    answerI18n: L(
      '음료를 드실래요',
      'Ichimlik xohlaysizmi',
      'Would you like a drink',
      'Хотите напиток',
    ),
    options: ['Would', 'you', 'like', 'a', 'drink', 'to', 'order'],
    optionsI18n: {
      ko: ['음료를', '드실래요'],
      uz: ['Ichimlik', 'xohlaysizmi'],
      en: ['Would', 'you', 'like', 'a', 'drink'],
      ru: ['Хотите', 'напиток'],
    },
    answerTranslation: L(
      '음료를 드실래요?',
      'Ichimlik xohlaysizmi?',
      'Would you like a drink?',
      'Хотите напиток?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['connected-speech', 'would-like'],
  },

  en_s1u10_n3_070_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Would you like a drink?',
    options: ['Yes', 'please', 'I', 'would', 'like', 'a', 'coffee', 'salad'],
    answer: 'Yes please I would like a coffee',
    answerTranslation: L(
      '네. 커피 한 잔 주세요.',
      'Ha, iltimos. Men qahva xohlayman.',
      'Yes, please. I would like a coffee.',
      'Да, пожалуйста. Я бы хотел кофе.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['cafe-dialog', 'reply'],
  },

  en_s1u10_n3_071_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Would you like a ',
    sentenceSuffix: '?',
    answer: 'drink',
    answerTranslation: L(
      '음료를 드실래요?',
      'Ichimlik xohlaysizmi?',
      'Would you like a drink?',
      'Хотите напиток?',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "drink".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['typing', 'connected-speech'],
  },

  en_s1u10_n3_072_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'sandwich',
        native: 'sendvich',
        nativeI18n: L('샌드위치', 'sendvich', 'sandwich', 'сэндвич'),
      },
      {
        text: 'juice',
        native: 'sharbat',
        nativeI18n: L('주스', 'sharbat', 'juice', 'сок'),
      },
      {
        text: 'biscuit',
        native: 'pechenye',
        nativeI18n: L('비스킷', 'pechenye', 'biscuit', 'печенье'),
      },
      {
        text: 'croissant',
        native: 'kruassan',
        nativeI18n: L('크루아상', 'kruassan', 'croissant', 'круассан'),
      },
      {
        text: 'doughnut',
        native: 'ponchik',
        nativeI18n: L('도넛', 'ponchik', 'doughnut', 'пончик'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['cafe-review', 'matching'],
  },

  en_s1u10_n3_073_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'juice',
      'sandwich',
      'a',
      'is',
      'special',
      'Today',
      'and',
      'the',
      'coffee',
    ],
    answer: 'Today the special is a sandwich and juice',
    answerTranslation: L(
      '오늘의 특별 메뉴는 샌드위치와 주스예요.',
      'Bugungi maxsus taom sendvich va sharbat.',
      'Today the special is a sandwich and juice.',
      'Сегодня специальное предложение — сэндвич и сок.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['cafe-dialog', 'food'],
  },

  en_s1u10_n3_074_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'sandwich',
        native: 'sendvich',
        nativeI18n: L('샌드위치', 'sendvich', 'sandwich', 'сэндвич'),
      },
      {
        text: 'juice',
        native: 'sharbat',
        nativeI18n: L('주스', 'sharbat', 'juice', 'сок'),
      },
      {
        text: 'biscuit',
        native: 'pechenye',
        nativeI18n: L('비스킷', 'pechenye', 'biscuit', 'печенье'),
      },
      {
        text: 'croissant',
        native: 'kruassan',
        nativeI18n: L('크루아상', 'kruassan', 'croissant', 'круассан'),
      },
      {
        text: 'doughnut',
        native: 'ponchik',
        nativeI18n: L('도넛', 'ponchik', 'doughnut', 'пончик'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['cafe-review', 'listening'],
  },

  en_s1u10_n3_075_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'juice',
    choices: [
      { text: 'coffee', label: '☕', emoji: '☕', imageUrl: '' },
      { text: 'tea', label: '🍵', emoji: '🍵', imageUrl: '' },
      { text: 'juice', label: '🧃', emoji: '🧃', imageUrl: '' },
      { text: 'milk', label: '🥛', emoji: '🥛', imageUrl: '' },
    ],
    answerTranslation: L('주스', 'sharbat', 'juice', 'сок'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['juice'],
  },

  en_s1u10_n3_076_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I ___ like the cake and a cup of tea.',
    blankAnswers: ['would'],
    options: ['would', 'am', 'do', 'did'],
    answer: 'would',
    answerTranslation: L(
      '케이크와 차 한 잔 주세요.',
      'Men tort va bir piyola choy xohlayman.',
      'I would like the cake and a cup of tea.',
      'Я бы хотел торт и чашку чая.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['would-like'],
  },

  en_s1u10_n3_077_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I would like the cake and a cup of ',
    sentenceSuffix: '.',
    answer: 'tea',
    answerTranslation: L(
      '케이크와 차 한 잔 주세요.',
      'Men tort va bir piyola choy xohlayman.',
      'I would like the cake and a cup of tea.',
      'Я бы хотел торт и чашку чая.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "tea".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'tea'],
  },

  en_s1u10_n3_078_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['open', 'does', 'it', 'When', 'do', 'is', 'cafe'],
    answer: 'When does it open',
    audioText: 'When does it open?',
    answerTranslation: L(
      '언제 문을 열어요?',
      'U qachon ochiladi?',
      'When does it open?',
      'Когда оно открывается?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['connected-speech', 'question'],
  },

  en_s1u10_n3_079_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Would you like a doughnut or a biscuit?',
    options: [
      'I',
      'would',
      'like',
      'a',
      'doughnut',
      'please',
      'coffee',
      'salad',
    ],
    answer: 'I would like a doughnut please',
    answerTranslation: L(
      '도넛 하나 주세요.',
      'Men ponchik xohlayman, iltimos.',
      'I would like a doughnut, please.',
      'Я бы хотел пончик, пожалуйста.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['cafe-dialog', 'reply'],
  },

  en_s1u10_n3_080_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Would you like to order?' }],
    options: [
      'Yes, please. I’d like the cake and a cup of tea.',
      'Yes, I would like to the cake.',
      'I ordered tomorrow a tea.',
      'No, I am going to cake.',
    ],
    answer: 'Yes, please. I’d like the cake and a cup of tea.',
    answerTranslation: L(
      '네. 케이크와 차 한 잔 주세요.',
      'Ha, iltimos. Men tort va bir piyola choy xohlayman.',
      'Yes, please. I’d like the cake and a cup of tea.',
      'Да, пожалуйста. Я бы хотел торт и чашку чая.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['cafe-dialog', 'would-like', 'final'],
  },
};

export const EN_S1_UNIT10_NODE3 = {
  title: L('카페 도시', 'Kafe shaharlari', 'Cafe cities', 'Города кафе'),
  section: 1,
  unit: 10,
  order: 3,
  isActive: true,

  lessons: [
    {
      title: L(
        '카페 음식과 음료',
        'Kafe taomlari va ichimliklari',
        'Cafe food and drinks',
        'Еда и напитки в кафе',
      ),
      description: L(
        '커피, 차, 주스, 우유와 샌드위치, 케이크, 도넛, 샐러드 같은 기본 카페 어휘를 익혀요.',
        'Qahva, choy, sharbat, sut, sendvich, tort, ponchik va salat kabi kafe so‘zlarini o‘rganasiz.',
        'Learn common cafe words for drinks and foods such as coffee, tea, juice, milk, sandwiches, cake, doughnuts and salad.',
        'Изучаем основные слова для кафе: coffee, tea, juice, milk, sandwich, cake, doughnut и salad.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 1,
      questions: [
        'en_s1u10_n3_001_speaking',
        'en_s1u10_n3_002_image_choice',
        'en_s1u10_n3_003_word_matching',
        'en_s1u10_n3_004_translate_builder',
        'en_s1u10_n3_005_word_arrange',
        'en_s1u10_n3_006_audio_match',
        'en_s1u10_n3_007_type_answer',
        'en_s1u10_n3_008_image_choice',
        'en_s1u10_n3_009_sentence_builder',
        'en_s1u10_n3_010_reply_builder',
        'en_s1u10_n3_011_type_answer',
        'en_s1u10_n3_012_word_matching',
        'en_s1u10_n3_013_translate_builder',
        'en_s1u10_n3_014_audio_match',
        'en_s1u10_n3_015_image_choice',
        'en_s1u10_n3_016_fill_in_blank',
        'en_s1u10_n3_017_type_answer',
        'en_s1u10_n3_018_word_arrange',
        'en_s1u10_n3_019_reply_builder',
        'en_s1u10_n3_020_dialog_complete',
      ],
    },

    {
      title: L(
        '세계의 카페 도시',
        'Dunyoning kafe shaharlari',
        'Cafe cities around the world',
        'Города кафе по всему миру',
      ),
      description: L(
        '빈, 멜버른, 타이베이, 하바나와 시애틀의 카페와 대표 음식에 관한 글을 읽고 핵심 표현을 익혀요.',
        'Vena, Melburn, Taypey, Havana va Seattle kafelari hamda mashhur taomlari haqida o‘rganasiz.',
        'Learn about cafes and special foods in Vienna, Melbourne, Taipei, Havana and Seattle.',
        'Узнаём о кафе и местной еде Вены, Мельбурна, Тайбэя, Гаваны и Сиэтла.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 2,
      questions: [
        'en_s1u10_n3_021_speaking',
        'en_s1u10_n3_022_image_choice',
        'en_s1u10_n3_023_word_matching',
        'en_s1u10_n3_024_translate_builder',
        'en_s1u10_n3_025_word_arrange',
        'en_s1u10_n3_026_audio_match',
        'en_s1u10_n3_027_type_answer',
        'en_s1u10_n3_028_image_choice',
        'en_s1u10_n3_029_sentence_builder',
        'en_s1u10_n3_030_reply_builder',
        'en_s1u10_n3_031_type_answer',
        'en_s1u10_n3_032_word_matching',
        'en_s1u10_n3_033_translate_builder',
        'en_s1u10_n3_034_audio_match',
        'en_s1u10_n3_035_image_choice',
        'en_s1u10_n3_036_fill_in_blank',
        'en_s1u10_n3_037_type_answer',
        'en_s1u10_n3_038_word_arrange',
        'en_s1u10_n3_039_reply_builder',
        'en_s1u10_n3_040_dialog_complete',
      ],
    },

    {
      title: L(
        'Would like 사용하기',
        'Would like ishlatish',
        'Using would like',
        'Используем would like',
      ),
      description: L(
        'would like 뒤에 명사를 쓰는 경우와 to + 동사를 쓰는 경우를 구분하고 음식이나 행동을 정중하게 요청해요.',
        'Would like dan keyin ot yoki to + fe’l ishlatishni farqlab, taom yoki harakatni muloyim so‘raysiz.',
        'Use would like with a noun or with to + verb to make polite requests and offers.',
        'Различаем would like + существительное и would like + to + глагол и вежливо просим или предлагаем.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 3,
      questions: [
        'en_s1u10_n3_041_speaking',
        'en_s1u10_n3_042_image_choice',
        'en_s1u10_n3_043_word_matching',
        'en_s1u10_n3_044_translate_builder',
        'en_s1u10_n3_045_word_arrange',
        'en_s1u10_n3_046_audio_match',
        'en_s1u10_n3_047_type_answer',
        'en_s1u10_n3_048_image_choice',
        'en_s1u10_n3_049_sentence_builder',
        'en_s1u10_n3_050_reply_builder',
        'en_s1u10_n3_051_type_answer',
        'en_s1u10_n3_052_word_matching',
        'en_s1u10_n3_053_translate_builder',
        'en_s1u10_n3_054_audio_match',
        'en_s1u10_n3_055_image_choice',
        'en_s1u10_n3_056_fill_in_blank',
        'en_s1u10_n3_057_type_answer',
        'en_s1u10_n3_058_word_arrange',
        'en_s1u10_n3_059_reply_builder',
        'en_s1u10_n3_060_dialog_complete',
      ],
    },

    {
      title: L(
        '카페에서 주문하기',
        'Kafeda buyurtma berish',
        'In a cafe',
        'В кафе',
      ),
      description: L(
        'Would you like ...?와 I’d like ...를 실제 카페 대화에 적용하고 연결되어 들리는 영어 표현도 함께 연습해요.',
        'Would you like ...? va I’d like ... iboralarini kafe suhbatida ishlatib, bog‘lanib talaffuz qilinadigan gaplarni mashq qilasiz.',
        'Use Would you like ...? and I’d like ... in cafe conversations and practise common connected speech.',
        'Используем Would you like ...? и I’d like ... в диалогах в кафе и тренируем связанную речь.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 4,
      questions: [
        'en_s1u10_n3_061_speaking',
        'en_s1u10_n3_062_image_choice',
        'en_s1u10_n3_063_word_matching',
        'en_s1u10_n3_064_translate_builder',
        'en_s1u10_n3_065_word_arrange',
        'en_s1u10_n3_066_audio_match',
        'en_s1u10_n3_067_type_answer',
        'en_s1u10_n3_068_image_choice',
        'en_s1u10_n3_069_sentence_builder',
        'en_s1u10_n3_070_reply_builder',
        'en_s1u10_n3_071_type_answer',
        'en_s1u10_n3_072_word_matching',
        'en_s1u10_n3_073_translate_builder',
        'en_s1u10_n3_074_audio_match',
        'en_s1u10_n3_075_image_choice',
        'en_s1u10_n3_076_fill_in_blank',
        'en_s1u10_n3_077_type_answer',
        'en_s1u10_n3_078_word_arrange',
        'en_s1u10_n3_079_reply_builder',
        'en_s1u10_n3_080_dialog_complete',
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Section 1 · Unit 10 · Node 4
// 10.4 Speaking and writing
//
// Coverage
// - order food and drink
// - waiter / customer
// - restaurant / burger / bill
// - Can I take your order?
// - What can I get you?
// - Small or large?
// - Anything else?
// - Here you are.
// - Can we have the bill, please?
// - formal / informal language
// - different voices
// - voice / mood / accent
// - invitations
// - anniversary / party
// - Please join us for ...
// - Would you like to come?
// - Can you come?
// - thank-you notes
// - Thank you very much for the invitation.
// - Thanks! Sounds great.
// - I'd love to come.
// - I'm so sorry, but I can't come.
//
// IMPORTANT:
// *_WORDS에는 무조건 단어 하나만 등록.
// "thank-you note", "fast food restaurant",
// "birthday party", "orange juice" 같은 구/문장은 등록 금지.
//
// 4 lessons × 20 questions = 80
// speaking: reduced
// image_choice / word_matching / audio_match: increased
// type_answer: 3 per lesson
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT10_NODE4_WORDS = [
  {
    code: 'en-verb-order',
    english: 'order',
    senseKey: 'ask-for-food-or-drink-to-be-served',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '주문하다',
      'buyurtma bermoq',
      'to ask for food or drink to be served',
      'заказывать',
    ),
    examples: [
      {
        english: 'Would you like to order?',
        translations: L(
          '주문하시겠어요?',
          'Buyurtma berishni xohlaysizmi?',
          'Would you like to order?',
          'Хотите сделать заказ?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈɔːdə/',
      ttsText: 'order',
    },
    media: {
      emoji: '📝',
      imageUrl: '',
      imageAlt: L(
        '음식을 주문하는 모습',
        'ovqat buyurtma qilish',
        'ordering food',
        'заказ еды',
      ),
    },
    tags: ['restaurant', 'food'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-job-waiter',
    english: 'waiter',
    senseKey: 'person-serving-food-in-restaurant',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '웨이터',
      'ofitsiant',
      'a person who serves food and drink in a restaurant',
      'официант',
    ),
    examples: [
      {
        english: 'The waiter takes our order.',
        translations: L(
          '웨이터가 우리 주문을 받아요.',
          'Ofitsiant buyurtmamizni oladi.',
          'The waiter takes our order.',
          'Официант принимает наш заказ.',
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
      imageAlt: L(
        '주문을 받는 웨이터',
        'buyurtma olayotgan ofitsiant',
        'a waiter taking an order',
        'официант принимает заказ',
      ),
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
      'a person who buys goods, food or services',
      'клиент; покупатель',
    ),
    examples: [
      {
        english: 'The customer would like a sandwich.',
        translations: L(
          '손님은 샌드위치를 원해요.',
          'Mijoz sendvich xohlaydi.',
          'The customer would like a sandwich.',
          'Клиент хотел бы сэндвич.',
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
      imageAlt: L(
        '음식을 주문하는 손님',
        'ovqat buyurtma qilayotgan mijoz',
        'a customer ordering food',
        'клиент заказывает еду',
      ),
    },
    tags: ['people', 'restaurant'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-bill',
    english: 'bill',
    senseKey: 'written-amount-to-pay-for-meal',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '계산서',
      'hisob',
      'a written statement showing how much you must pay',
      'счёт',
    ),
    examples: [
      {
        english: 'Can we have the bill, please?',
        translations: L(
          '계산서 주세요.',
          'Hisobni bersangiz.',
          'Can we have the bill, please?',
          'Можно счёт, пожалуйста?',
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
    code: 'en-noun-burger',
    english: 'burger',
    senseKey: 'food-with-meat-or-other-filling-in-bun',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '버거; 햄버거',
      'burger',
      'food made with a filling inside a round bread bun',
      'бургер',
    ),
    examples: [
      {
        english: 'I would like a large burger.',
        translations: L(
          '큰 버거 하나 주세요.',
          'Men katta burger xohlayman.',
          'I would like a large burger.',
          'Я бы хотел большой бургер.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈbɜːɡə/',
      ttsText: 'burger',
    },
    media: {
      emoji: '🍔',
      imageUrl: '',
      imageAlt: L('버거', 'burger', 'a burger', 'бургер'),
    },
    tags: ['food', 'restaurant'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-restaurant',
    english: 'restaurant',
    senseKey: 'place-serving-meals-to-customers',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '식당; 레스토랑',
      'restoran',
      'a place where people pay to eat meals',
      'ресторан',
    ),
    examples: [
      {
        english: 'We are at a restaurant.',
        translations: L(
          '우리는 식당에 있어요.',
          'Biz restorandamiz.',
          'We are at a restaurant.',
          'Мы в ресторане.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈrestrɒnt/',
      ttsText: 'restaurant',
    },
    media: {
      emoji: '🍽️',
      imageUrl: '',
      imageAlt: L('식당', 'restoran', 'a restaurant', 'ресторан'),
    },
    tags: ['places', 'food'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-invitation',
    english: 'invitation',
    senseKey: 'request-asking-someone-to-event',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '초대; 초대장',
      'taklifnoma',
      'a request asking someone to come to an event',
      'приглашение',
    ),
    examples: [
      {
        english: 'Thank you very much for the invitation.',
        translations: L(
          '초대해 주셔서 정말 감사합니다.',
          'Taklif uchun katta rahmat.',
          'Thank you very much for the invitation.',
          'Большое спасибо за приглашение.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌɪnvɪˈteɪʃən/',
      ttsText: 'invitation',
    },
    media: {
      emoji: '💌',
      imageUrl: '',
      imageAlt: L('초대장', 'taklifnoma', 'an invitation', 'приглашение'),
    },
    tags: ['events', 'writing'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-anniversary',
    english: 'anniversary',
    senseKey: 'date-remembering-important-past-event',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '기념일',
      'yillik',
      'a date on which an important past event is remembered',
      'годовщина',
    ),
    examples: [
      {
        english: 'It is our twentieth wedding anniversary.',
        translations: L(
          '우리의 결혼 20주년이에요.',
          'Bu bizning nikohimizning yigirma yilligi.',
          'It is our twentieth wedding anniversary.',
          'Это двадцатая годовщина нашей свадьбы.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌænɪˈvɜːsəri/',
      ttsText: 'anniversary',
    },
    media: {
      emoji: '💍',
      imageUrl: '',
      imageAlt: L(
        '결혼 기념일',
        'nikoh yilligi',
        'a wedding anniversary',
        'годовщина свадьбы',
      ),
    },
    tags: ['events', 'celebrations'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-party',
    english: 'party',
    senseKey: 'social-event-with-guests',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '파티; 모임',
      'ziyofat',
      'a social event where people meet, eat or celebrate',
      'вечеринка',
    ),
    examples: [
      {
        english: 'Can you come to my party?',
        translations: L(
          '제 파티에 올 수 있어요?',
          'Mening ziyofatimga kela olasizmi?',
          'Can you come to my party?',
          'Ты можешь прийти на мою вечеринку?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈpɑːti/',
      ttsText: 'party',
    },
    media: {
      emoji: '🎉',
      imageUrl: '',
      imageAlt: L('파티', 'ziyofat', 'a party', 'вечеринка'),
    },
    tags: ['events', 'social'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-pool',
    english: 'pool',
    senseKey: 'swimming-pool',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '수영장',
      'basseyn',
      'a place filled with water for swimming',
      'бассейн',
    ),
    examples: [
      {
        english: 'The party is by the pool.',
        translations: L(
          '파티는 수영장 옆에서 열려요.',
          'Ziyofat basseyn yonida bo‘ladi.',
          'The party is by the pool.',
          'Вечеринка проходит у бассейна.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/puːl/',
      ttsText: 'pool',
    },
    media: {
      emoji: '🏊',
      imageUrl: '',
      imageAlt: L('수영장', 'basseyn', 'a swimming pool', 'бассейн'),
    },
    tags: ['places', 'events'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-formal',
    english: 'formal',
    senseKey: 'suitable-for-serious-or-official-situation',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '격식 있는',
      'rasmiy',
      'suitable for a serious or official situation',
      'официальный; формальный',
    ),
    examples: [
      {
        english: 'This is a formal question.',
        translations: L(
          '이것은 격식 있는 질문이에요.',
          'Bu rasmiy savol.',
          'This is a formal question.',
          'Это формальный вопрос.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈfɔːməl/',
      ttsText: 'formal',
    },
    media: {
      emoji: '🤵',
      imageUrl: '',
      imageAlt: L(
        '격식 있는 상황',
        'rasmiy vaziyat',
        'a formal situation',
        'официальная ситуация',
      ),
    },
    tags: ['communication', 'style'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-informal',
    english: 'informal',
    senseKey: 'relaxed-and-not-official',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '비격식적인',
      'norasmiy',
      'relaxed and not official',
      'неформальный',
    ),
    examples: [
      {
        english: 'Anything else? is more informal.',
        translations: L(
          '"Anything else?"는 더 비격식적인 표현이에요.',
          '"Anything else?" norasmiyroq ibora.',
          '"Anything else?" is more informal.',
          '"Anything else?" — более неформальное выражение.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɪnˈfɔːməl/',
      ttsText: 'informal',
    },
    media: {
      emoji: '🙂',
      imageUrl: '',
      imageAlt: L(
        '편안한 대화',
        'norasmiy suhbat',
        'an informal conversation',
        'неформальный разговор',
      ),
    },
    tags: ['communication', 'style'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-voice',
    english: 'voice',
    senseKey: 'sound-produced-when-person-speaks',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '목소리',
      'ovoz',
      'the sound a person makes when speaking',
      'голос',
    ),
    examples: [
      {
        english: 'People have different voices.',
        translations: L(
          '사람들은 서로 다른 목소리를 가지고 있어요.',
          'Odamlarning ovozlari har xil.',
          'People have different voices.',
          'У людей разные голоса.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/vɔɪs/',
      ttsText: 'voice',
    },
    media: {
      emoji: '🗣️',
      imageUrl: '',
      imageAlt: L(
        '말하는 사람의 목소리',
        'gapirayotgan odam ovozi',
        'a speaking voice',
        'голос говорящего человека',
      ),
    },
    tags: ['listening', 'communication'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-mood',
    english: 'mood',
    senseKey: 'way-person-feels-at-time',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '기분; 감정 상태',
      'kayfiyat',
      'the way a person feels at a particular time',
      'настроение',
    ),
    examples: [
      {
        english: "A person's mood can change their voice.",
        translations: L(
          '사람의 기분에 따라 목소리가 달라질 수 있어요.',
          'Odamning kayfiyati uning ovozini o‘zgartirishi mumkin.',
          'A person’s mood can change their voice.',
          'Настроение человека может менять его голос.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/muːd/',
      ttsText: 'mood',
    },
    media: {
      emoji: '😊',
      imageUrl: '',
      imageAlt: L(
        '여러 가지 기분',
        'turli kayfiyatlar',
        'different moods',
        'разные настроения',
      ),
    },
    tags: ['listening', 'feelings'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-accent',
    english: 'accent',
    senseKey: 'particular-way-of-pronouncing-language',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '억양; 악센트',
      'aksent',
      'a particular way of pronouncing a language',
      'акцент',
    ),
    examples: [
      {
        english: 'People can speak with different accents.',
        translations: L(
          '사람들은 서로 다른 억양으로 말할 수 있어요.',
          'Odamlar turli aksentlarda gapirishi mumkin.',
          'People can speak with different accents.',
          'Люди могут говорить с разными акцентами.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈæksent/',
      ttsText: 'accent',
    },
    media: {
      emoji: '💬',
      imageUrl: '',
      imageAlt: L(
        '서로 다른 억양으로 대화하는 사람들',
        'turli aksentlarda gaplashayotgan odamlar',
        'people speaking with different accents',
        'люди с разными акцентами',
      ),
    },
    tags: ['listening', 'pronunciation'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-note',
    english: 'note',
    senseKey: 'short-written-message',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '메모; 짧은 글',
      'qisqa xat',
      'a short written message',
      'записка',
    ),
    examples: [
      {
        english: 'She wrote a thank-you note.',
        translations: L(
          '그녀는 감사 메모를 썼어요.',
          'U minnatdorchilik xatini yozdi.',
          'She wrote a thank-you note.',
          'Она написала благодарственную записку.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/nəʊt/',
      ttsText: 'note',
    },
    media: {
      emoji: '📝',
      imageUrl: '',
      imageAlt: L('짧은 메모', 'qisqa xat', 'a short note', 'короткая записка'),
    },
    tags: ['writing', 'communication'],
    difficulty: 1,
    isCore: true,
  },
];

export const EN_S1_UNIT10_NODE4_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Ordering food and drink
  // ===========================================================

  en_s1u10_n4_001_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Can I take your order?',
    audioText: 'Can I take your order?',
    answerTranslation: L(
      '주문하시겠어요?',
      'Buyurtmangizni olsam bo‘ladimi?',
      'Can I take your order?',
      'Могу я принять ваш заказ?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['restaurant', 'order'],
  },

  en_s1u10_n4_002_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'burger',
    choices: [
      { text: 'sandwich', label: '🥪', emoji: '🥪', imageUrl: '' },
      { text: 'burger', label: '🍔', emoji: '🍔', imageUrl: '' },
      { text: 'salad', label: '🥗', emoji: '🥗', imageUrl: '' },
      { text: 'doughnut', label: '🍩', emoji: '🍩', imageUrl: '' },
    ],
    answerTranslation: L('버거', 'burger', 'burger', 'бургер'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['burger'],
  },

  en_s1u10_n4_003_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
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
        text: 'burger',
        native: 'burger',
        nativeI18n: L('버거', 'burger', 'burger', 'бургер'),
      },
      {
        text: 'restaurant',
        native: 'restoran',
        nativeI18n: L('식당', 'restoran', 'restaurant', 'ресторан'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['restaurant', 'matching'],
  },

  en_s1u10_n4_004_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['order', 'take', 'Can', 'your', 'I', 'bill', 'you', 'get'],
    answer: 'Can I take your order',
    answerTranslation: L(
      '주문하시겠어요?',
      'Buyurtmangizni olsam bo‘ladimi?',
      'Can I take your order?',
      'Могу я принять ваш заказ?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['order', 'restaurant'],
  },

  en_s1u10_n4_005_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['burger', 'large', 'please', 'A', 'salad', 'small', 'bill'],
    answer: 'A large burger please',
    audioText: 'A large burger, please.',
    answerTranslation: L(
      '큰 버거 하나 주세요.',
      'Katta burger, iltimos.',
      'A large burger, please.',
      'Большой бургер, пожалуйста.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['ordering', 'burger'],
  },

  en_s1u10_n4_006_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
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
        text: 'burger',
        native: 'burger',
        nativeI18n: L('버거', 'burger', 'burger', 'бургер'),
      },
      {
        text: 'restaurant',
        native: 'restoran',
        nativeI18n: L('식당', 'restoran', 'restaurant', 'ресторан'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['restaurant', 'listening'],
  },

  en_s1u10_n4_007_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Can I take your ',
    sentenceSuffix: '?',
    answer: 'order',
    answerTranslation: L(
      '주문하시겠어요?',
      'Buyurtmangizni olsam bo‘ladimi?',
      'Can I take your order?',
      'Могу я принять ваш заказ?',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "order".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'order'],
  },

  en_s1u10_n4_008_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'bill',
    choices: [
      { text: 'menu', label: '📋', emoji: '📋', imageUrl: '' },
      { text: 'burger', label: '🍔', emoji: '🍔', imageUrl: '' },
      { text: 'bill', label: '🧾', emoji: '🧾', imageUrl: '' },
      { text: 'coffee', label: '☕', emoji: '☕', imageUrl: '' },
    ],
    answerTranslation: L('계산서', 'hisob', 'bill', 'счёт'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['bill'],
  },

  en_s1u10_n4_009_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Can we have the bill, please?',
    audioText: 'Can we have the bill, please?',
    answerI18n: L(
      '계산서 주세요',
      'Hisobni bersangiz',
      'Can we have the bill please',
      'Можно счёт пожалуйста',
    ),
    options: ['Can', 'we', 'have', 'the', 'bill', 'please', 'menu'],
    optionsI18n: {
      ko: ['계산서', '주세요'],
      uz: ['Hisobni', 'bersangiz'],
      en: ['Can', 'we', 'have', 'the', 'bill', 'please'],
      ru: ['Можно', 'счёт', 'пожалуйста'],
    },
    answerTranslation: L(
      '계산서 주세요.',
      'Hisobni bersangiz.',
      'Can we have the bill, please?',
      'Можно счёт, пожалуйста?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['bill', 'restaurant'],
  },

  en_s1u10_n4_010_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What can I get you?',
    options: ['A', 'sandwich', 'please', 'bill', 'waiter', 'large'],
    answer: 'A sandwich please',
    answerTranslation: L(
      '샌드위치 하나 주세요.',
      'Sendvich, iltimos.',
      'A sandwich, please.',
      'Сэндвич, пожалуйста.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['ordering', 'reply'],
  },

  en_s1u10_n4_011_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Can we have the ',
    sentenceSuffix: ', please?',
    answer: 'bill',
    answerTranslation: L(
      '계산서 주세요.',
      'Hisobni bersangiz.',
      'Can we have the bill, please?',
      'Можно счёт, пожалуйста?',
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

  en_s1u10_n4_012_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'order',
        native: 'buyurtma bermoq',
        nativeI18n: L('주문하다', 'buyurtma bermoq', 'order', 'заказывать'),
      },
      {
        text: 'coffee',
        native: 'qahva',
        nativeI18n: L('커피', 'qahva', 'coffee', 'кофе'),
      },
      {
        text: 'sandwich',
        native: 'sendvich',
        nativeI18n: L('샌드위치', 'sendvich', 'sandwich', 'сэндвич'),
      },
      {
        text: 'salad',
        native: 'salat',
        nativeI18n: L('샐러드', 'salat', 'salad', 'салат'),
      },
      {
        text: 'juice',
        native: 'sharbat',
        nativeI18n: L('주스', 'sharbat', 'juice', 'сок'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['ordering', 'matching'],
  },

  en_s1u10_n4_013_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'else',
      'anything',
      'Would',
      'you',
      'like',
      'order',
      'bill',
      'please',
    ],
    answer: 'Would you like anything else',
    answerTranslation: L(
      '더 필요한 것이 있으세요?',
      'Yana biror narsa xohlaysizmi?',
      'Would you like anything else?',
      'Хотите что-нибудь ещё?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['ordering', 'offer'],
  },

  en_s1u10_n4_014_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'order',
        native: 'buyurtma bermoq',
        nativeI18n: L('주문하다', 'buyurtma bermoq', 'order', 'заказывать'),
      },
      {
        text: 'coffee',
        native: 'qahva',
        nativeI18n: L('커피', 'qahva', 'coffee', 'кофе'),
      },
      {
        text: 'sandwich',
        native: 'sendvich',
        nativeI18n: L('샌드위치', 'sendvich', 'sandwich', 'сэндвич'),
      },
      {
        text: 'salad',
        native: 'salat',
        nativeI18n: L('샐러드', 'salat', 'salad', 'салат'),
      },
      {
        text: 'juice',
        native: 'sharbat',
        nativeI18n: L('주스', 'sharbat', 'juice', 'сок'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['ordering', 'listening'],
  },

  en_s1u10_n4_015_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'restaurant',
    choices: [
      { text: 'cafe', label: '☕', emoji: '☕', imageUrl: '' },
      { text: 'restaurant', label: '🍽️', emoji: '🍽️', imageUrl: '' },
      { text: 'pool', label: '🏊', emoji: '🏊', imageUrl: '' },
      { text: 'party', label: '🎉', emoji: '🎉', imageUrl: '' },
    ],
    answerTranslation: L('식당', 'restoran', 'restaurant', 'ресторан'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['restaurant'],
  },

  en_s1u10_n4_016_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Anything ___?',
    blankAnswers: ['else'],
    options: ['else', 'order', 'bill', 'large'],
    answer: 'else',
    answerTranslation: L(
      '더 필요한 것이 있으세요?',
      'Yana biror narsa kerakmi?',
      'Anything else?',
      'Что-нибудь ещё?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['ordering', 'functional-language'],
  },

  en_s1u10_n4_017_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'The ',
    sentenceSuffix: ' takes our order.',
    answer: 'waiter',
    answerTranslation: L(
      '웨이터가 우리 주문을 받아요.',
      'Ofitsiant buyurtmamizni oladi.',
      'The waiter takes our order.',
      'Официант принимает наш заказ.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "waiter".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'waiter'],
  },

  en_s1u10_n4_018_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['thanks', 'all', 'No', 'that', 'is', 'please', 'else'],
    answer: 'No thanks that is all',
    audioText: 'No, thanks. That’s all.',
    answerTranslation: L(
      '아니요, 괜찮아요. 그게 전부예요.',
      'Yo‘q, rahmat. Shu yetadi.',
      'No, thanks. That’s all.',
      'Нет, спасибо. Это всё.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['ordering', 'restaurant'],
  },

  en_s1u10_n4_019_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Anything else?',
    options: ['No', 'thanks', 'that', 'is', 'all', 'burger', 'bill'],
    answer: 'No thanks that is all',
    answerTranslation: L(
      '아니요, 괜찮아요. 그게 전부예요.',
      'Yo‘q, rahmat. Shu yetadi.',
      'No, thanks. That’s all.',
      'Нет, спасибо. Это всё.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['ordering', 'reply'],
  },

  en_s1u10_n4_020_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Can I take your order?' }],
    options: [
      'Yes, can I have a salad, please?',
      'The bill orders a salad.',
      'I can restaurant yesterday.',
      'A waiter would large.',
    ],
    answer: 'Yes, can I have a salad, please?',
    answerTranslation: L(
      '네, 샐러드 하나 주세요.',
      'Ha, salat bersangiz.',
      'Yes, can I have a salad, please?',
      'Да, можно салат, пожалуйста?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['ordering', 'dialog'],
  },

  // ===========================================================
  // Lesson 2 · Formal and informal language
  // ===========================================================

  en_s1u10_n4_021_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Would you like anything else?',
    audioText: 'Would you like anything else?',
    answerTranslation: L(
      '더 필요한 것이 있으세요?',
      'Yana biror narsa xohlaysizmi?',
      'Would you like anything else?',
      'Хотите что-нибудь ещё?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['formal', 'restaurant'],
  },

  en_s1u10_n4_022_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'voice',
    choices: [
      { text: 'accent', label: '💬', emoji: '💬', imageUrl: '' },
      { text: 'voice', label: '🗣️', emoji: '🗣️', imageUrl: '' },
      { text: 'mood', label: '😊', emoji: '😊', imageUrl: '' },
      { text: 'bill', label: '🧾', emoji: '🧾', imageUrl: '' },
    ],
    answerTranslation: L('목소리', 'ovoz', 'voice', 'голос'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['voice'],
  },

  en_s1u10_n4_023_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'formal',
        native: 'rasmiy',
        nativeI18n: L('격식 있는', 'rasmiy', 'formal', 'формальный'),
      },
      {
        text: 'informal',
        native: 'norasmiy',
        nativeI18n: L('비격식적인', 'norasmiy', 'informal', 'неформальный'),
      },
      {
        text: 'voice',
        native: 'ovoz',
        nativeI18n: L('목소리', 'ovoz', 'voice', 'голос'),
      },
      {
        text: 'mood',
        native: 'kayfiyat',
        nativeI18n: L('기분', 'kayfiyat', 'mood', 'настроение'),
      },
      {
        text: 'accent',
        native: 'aksent',
        nativeI18n: L('억양', 'aksent', 'accent', 'акцент'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['communication', 'matching'],
  },

  en_s1u10_n4_024_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'anything',
      'Would',
      'else',
      'you',
      'like',
      'bill',
      'formal',
      'order',
    ],
    answer: 'Would you like anything else',
    answerTranslation: L(
      '더 필요한 것이 있으세요?',
      'Yana biror narsa xohlaysizmi?',
      'Would you like anything else?',
      'Хотите что-нибудь ещё?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['formal', 'would-like'],
  },

  en_s1u10_n4_025_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['please', 'bill', 'The', 'anything', 'else', 'would'],
    answer: 'The bill please',
    audioText: 'The bill, please.',
    answerTranslation: L(
      '계산서 주세요.',
      'Hisobni bersangiz.',
      'The bill, please.',
      'Счёт, пожалуйста.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['informal', 'bill'],
  },

  en_s1u10_n4_026_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'formal',
        native: 'rasmiy',
        nativeI18n: L('격식 있는', 'rasmiy', 'formal', 'формальный'),
      },
      {
        text: 'informal',
        native: 'norasmiy',
        nativeI18n: L('비격식적인', 'norasmiy', 'informal', 'неформальный'),
      },
      {
        text: 'voice',
        native: 'ovoz',
        nativeI18n: L('목소리', 'ovoz', 'voice', 'голос'),
      },
      {
        text: 'mood',
        native: 'kayfiyat',
        nativeI18n: L('기분', 'kayfiyat', 'mood', 'настроение'),
      },
      {
        text: 'accent',
        native: 'aksent',
        nativeI18n: L('억양', 'aksent', 'accent', 'акцент'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['communication', 'listening'],
  },

  en_s1u10_n4_027_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'People have different ',
    sentenceSuffix: '.',
    answer: 'voices',
    answerTranslation: L(
      '사람들은 서로 다른 목소리를 가지고 있어요.',
      'Odamlarning ovozlari har xil.',
      'People have different voices.',
      'У людей разные голоса.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is the plural "voices".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'voice'],
  },

  en_s1u10_n4_028_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'mood',
    choices: [
      { text: 'voice', label: '🗣️', emoji: '🗣️', imageUrl: '' },
      { text: 'accent', label: '💬', emoji: '💬', imageUrl: '' },
      { text: 'mood', label: '😊', emoji: '😊', imageUrl: '' },
      { text: 'customer', label: '🙋', emoji: '🙋', imageUrl: '' },
    ],
    answerTranslation: L('기분', 'kayfiyat', 'mood', 'настроение'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['mood'],
  },

  en_s1u10_n4_029_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Can I have a large hot dog, please?',
    audioText: 'Can I have a large hot dog, please?',
    answerI18n: L(
      '큰 핫도그 하나 주세요',
      'Katta hot-dog bersangiz',
      'Can I have a large hot dog please',
      'Можно большой хот-дог пожалуйста',
    ),
    options: [
      'Can',
      'I',
      'have',
      'a',
      'large',
      'hot',
      'dog',
      'please',
      'small',
    ],
    optionsI18n: {
      ko: ['큰', '핫도그', '하나', '주세요'],
      uz: ['Katta', 'hot-dog', 'bersangiz'],
      en: ['Can', 'I', 'have', 'a', 'large', 'hot', 'dog', 'please'],
      ru: ['Можно', 'большой', 'хот-дог', 'пожалуйста'],
    },
    answerTranslation: L(
      '큰 핫도그 하나 주세요.',
      'Katta hot-dog bersangiz.',
      'Can I have a large hot dog, please?',
      'Можно большой хот-дог, пожалуйста?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['formal', 'ordering'],
  },

  en_s1u10_n4_030_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Small or large?',
    options: ['Large', 'please', 'small', 'bill', 'anything', 'customer'],
    answer: 'Large please',
    answerTranslation: L(
      '큰 걸로 주세요.',
      'Kattasi, iltimos.',
      'Large, please.',
      'Большой, пожалуйста.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['ordering', 'reply'],
  },

  en_s1u10_n4_031_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'People can speak with different ',
    sentenceSuffix: '.',
    answer: 'accents',
    answerTranslation: L(
      '사람들은 서로 다른 억양으로 말할 수 있어요.',
      'Odamlar turli aksentlarda gapirishi mumkin.',
      'People can speak with different accents.',
      'Люди могут говорить с разными акцентами.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is the plural "accents".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'accent'],
  },

  en_s1u10_n4_032_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
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
        text: 'order',
        native: 'buyurtma bermoq',
        nativeI18n: L('주문하다', 'buyurtma bermoq', 'order', 'заказывать'),
      },
      {
        text: 'bill',
        native: 'hisob',
        nativeI18n: L('계산서', 'hisob', 'bill', 'счёт'),
      },
      {
        text: 'restaurant',
        native: 'restoran',
        nativeI18n: L('식당', 'restoran', 'restaurant', 'ресторан'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['restaurant', 'matching'],
  },

  en_s1u10_n4_033_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'bill',
      'please',
      'Can',
      'have',
      'we',
      'the',
      'order',
      'customer',
    ],
    answer: 'Can we have the bill please',
    answerTranslation: L(
      '계산서 주세요.',
      'Hisobni bersangiz.',
      'Can we have the bill, please?',
      'Можно счёт, пожалуйста?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['formal', 'bill'],
  },

  en_s1u10_n4_034_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
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
        text: 'order',
        native: 'buyurtma bermoq',
        nativeI18n: L('주문하다', 'buyurtma bermoq', 'order', 'заказывать'),
      },
      {
        text: 'bill',
        native: 'hisob',
        nativeI18n: L('계산서', 'hisob', 'bill', 'счёт'),
      },
      {
        text: 'restaurant',
        native: 'restoran',
        nativeI18n: L('식당', 'restoran', 'restaurant', 'ресторан'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['restaurant', 'listening'],
  },

  en_s1u10_n4_035_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'accent',
    choices: [
      { text: 'voice', label: '🗣️', emoji: '🗣️', imageUrl: '' },
      { text: 'accent', label: '💬', emoji: '💬', imageUrl: '' },
      { text: 'bill', label: '🧾', emoji: '🧾', imageUrl: '' },
      { text: 'party', label: '🎉', emoji: '🎉', imageUrl: '' },
    ],
    answerTranslation: L('억양', 'aksent', 'accent', 'акцент'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['accent'],
  },

  en_s1u10_n4_036_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Would you like ___ else?',
    blankAnswers: ['anything'],
    options: ['anything', 'order', 'large', 'customer'],
    answer: 'anything',
    answerTranslation: L(
      '더 필요한 것이 있으세요?',
      'Yana biror narsa xohlaysizmi?',
      'Would you like anything else?',
      'Хотите что-нибудь ещё?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['formal', 'ordering'],
  },

  en_s1u10_n4_037_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'This is a ',
    sentenceSuffix: ' question.',
    answer: 'formal',
    answerTranslation: L(
      '이것은 격식 있는 질문이에요.',
      'Bu rasmiy savol.',
      'This is a formal question.',
      'Это формальный вопрос.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "formal".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'formal'],
  },

  en_s1u10_n4_038_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'salad',
      'Would',
      'a',
      'like',
      'you',
      'anything',
      'order',
      'bill',
    ],
    answer: 'Would you like a salad',
    audioText: 'Would you like a salad?',
    answerTranslation: L(
      '샐러드 드실래요?',
      'Salat xohlaysizmi?',
      'Would you like a salad?',
      'Хотите салат?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['formal', 'ordering'],
  },

  en_s1u10_n4_039_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Would you like anything else?',
    options: ['No', 'thank', 'you', 'that', 'is', 'all', 'Yes', 'bill'],
    answer: 'No thank you that is all',
    answerTranslation: L(
      '아니요, 괜찮아요. 그게 전부예요.',
      'Yo‘q, rahmat. Shu yetadi.',
      'No, thank you. That’s all.',
      'Нет, спасибо. Это всё.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['formal', 'reply'],
  },

  en_s1u10_n4_040_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Would you like a salad?' }],
    options: [
      'Yes, please.',
      'The salad is a waiter.',
      'I would yesterday salad.',
      'Yes, I order bill.',
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
    tags: ['formal', 'dialog'],
  },

  // ===========================================================
  // Lesson 3 · Invitations
  // ===========================================================

  en_s1u10_n4_041_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Would you like to come to my house for dinner?',
    audioText: 'Would you like to come to my house for dinner?',
    answerTranslation: L(
      '우리 집에 저녁 먹으러 오실래요?',
      'Uyimga kechki ovqatga kelishni xohlaysizmi?',
      'Would you like to come to my house for dinner?',
      'Хотите прийти ко мне домой на ужин?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['invitation', 'come'],
  },

  en_s1u10_n4_042_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'invitation',
    choices: [
      { text: 'bill', label: '🧾', emoji: '🧾', imageUrl: '' },
      { text: 'invitation', label: '💌', emoji: '💌', imageUrl: '' },
      { text: 'note', label: '📝', emoji: '📝', imageUrl: '' },
      { text: 'menu', label: '📋', emoji: '📋', imageUrl: '' },
    ],
    answerTranslation: L('초대장', 'taklifnoma', 'invitation', 'приглашение'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['invitation'],
  },

  en_s1u10_n4_043_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'invitation',
        native: 'taklifnoma',
        nativeI18n: L('초대장', 'taklifnoma', 'invitation', 'приглашение'),
      },
      {
        text: 'anniversary',
        native: 'yillik',
        nativeI18n: L('기념일', 'yillik', 'anniversary', 'годовщина'),
      },
      {
        text: 'party',
        native: 'ziyofat',
        nativeI18n: L('파티', 'ziyofat', 'party', 'вечеринка'),
      },
      {
        text: 'pool',
        native: 'basseyn',
        nativeI18n: L('수영장', 'basseyn', 'pool', 'бассейн'),
      },
      {
        text: 'note',
        native: 'qisqa xat',
        nativeI18n: L('메모', 'qisqa xat', 'note', 'записка'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['invitations', 'matching'],
  },

  en_s1u10_n4_044_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'come',
      'Can',
      'this',
      'afternoon',
      'you',
      'party',
      'invitation',
      'join',
    ],
    answer: 'Can you come this afternoon',
    answerTranslation: L(
      '오늘 오후에 올 수 있어요?',
      'Bugun tushdan keyin kela olasizmi?',
      'Can you come this afternoon?',
      'Ты можешь прийти сегодня днём?',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['invitation', 'can'],
  },

  en_s1u10_n4_045_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'us',
      'party',
      'for',
      'Please',
      'a',
      'join',
      'bill',
      'restaurant',
    ],
    answer: 'Please join us for a party',
    audioText: 'Please join us for a party.',
    answerTranslation: L(
      '파티에 함께해 주세요.',
      'Ziyofatga bizga qo‘shiling.',
      'Please join us for a party.',
      'Пожалуйста, присоединяйтесь к нам на вечеринке.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['invitation', 'join'],
  },

  en_s1u10_n4_046_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'invitation',
        native: 'taklifnoma',
        nativeI18n: L('초대장', 'taklifnoma', 'invitation', 'приглашение'),
      },
      {
        text: 'anniversary',
        native: 'yillik',
        nativeI18n: L('기념일', 'yillik', 'anniversary', 'годовщина'),
      },
      {
        text: 'party',
        native: 'ziyofat',
        nativeI18n: L('파티', 'ziyofat', 'party', 'вечеринка'),
      },
      {
        text: 'pool',
        native: 'basseyn',
        nativeI18n: L('수영장', 'basseyn', 'pool', 'бассейн'),
      },
      {
        text: 'note',
        native: 'qisqa xat',
        nativeI18n: L('메모', 'qisqa xat', 'note', 'записка'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['invitations', 'listening'],
  },

  en_s1u10_n4_047_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Thank you very much for the ',
    sentenceSuffix: '.',
    answer: 'invitation',
    answerTranslation: L(
      '초대해 주셔서 정말 감사합니다.',
      'Taklif uchun katta rahmat.',
      'Thank you very much for the invitation.',
      'Большое спасибо за приглашение.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "invitation".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'invitation'],
  },

  en_s1u10_n4_048_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'party',
    choices: [
      { text: 'restaurant', label: '🍽️', emoji: '🍽️', imageUrl: '' },
      { text: 'pool', label: '🏊', emoji: '🏊', imageUrl: '' },
      { text: 'party', label: '🎉', emoji: '🎉', imageUrl: '' },
      { text: 'bill', label: '🧾', emoji: '🧾', imageUrl: '' },
    ],
    answerTranslation: L('파티', 'ziyofat', 'party', 'вечеринка'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['party'],
  },

  en_s1u10_n4_049_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Please join us for a party at the office.',
    audioText: 'Please join us for a party at the office.',
    answerI18n: L(
      '사무실 파티에 함께해 주세요',
      'Ofisdagi ziyofatga bizga qo‘shiling',
      'Please join us for a party at the office',
      'Пожалуйста присоединяйтесь к нам на вечеринке в офисе',
    ),
    options: [
      'Please',
      'join',
      'us',
      'for',
      'a',
      'party',
      'at',
      'the',
      'office',
      'restaurant',
    ],
    optionsI18n: {
      ko: ['사무실', '파티에', '함께해', '주세요'],
      uz: ['Ofisdagi', 'ziyofatga', 'bizga', 'qo‘shiling'],
      en: ['Please', 'join', 'us', 'for', 'a', 'party', 'at', 'the', 'office'],
      ru: [
        'Пожалуйста',
        'присоединяйтесь',
        'к',
        'нам',
        'на',
        'вечеринке',
        'в',
        'офисе',
      ],
    },
    answerTranslation: L(
      '사무실 파티에 함께해 주세요.',
      'Ofisdagi ziyofatga bizga qo‘shiling.',
      'Please join us for a party at the office.',
      'Пожалуйста, присоединяйтесь к нам на вечеринке в офисе.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['invitation', 'party'],
  },

  en_s1u10_n4_050_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Would you like to come to my house for dinner?',
    options: ['Yes', 'I', 'would', 'love', 'to', 'come', 'party', 'bill'],
    answer: 'Yes I would love to come',
    answerTranslation: L(
      '네, 정말 가고 싶어요.',
      'Ha, juda borishni xohlayman.',
      'Yes, I would love to come.',
      'Да, я с удовольствием приду.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['invitation', 'reply'],
  },

  en_s1u10_n4_051_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'It is our twentieth wedding ',
    sentenceSuffix: '.',
    answer: 'anniversary',
    answerTranslation: L(
      '우리의 결혼 20주년이에요.',
      'Bu bizning nikohimizning yigirma yilligi.',
      'It is our twentieth wedding anniversary.',
      'Это двадцатая годовщина нашей свадьбы.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "anniversary".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'anniversary'],
  },

  en_s1u10_n4_052_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'formal',
        native: 'rasmiy',
        nativeI18n: L('격식 있는', 'rasmiy', 'formal', 'формальный'),
      },
      {
        text: 'informal',
        native: 'norasmiy',
        nativeI18n: L('비격식적인', 'norasmiy', 'informal', 'неформальный'),
      },
      {
        text: 'invitation',
        native: 'taklifnoma',
        nativeI18n: L('초대장', 'taklifnoma', 'invitation', 'приглашение'),
      },
      {
        text: 'party',
        native: 'ziyofat',
        nativeI18n: L('파티', 'ziyofat', 'party', 'вечеринка'),
      },
      {
        text: 'anniversary',
        native: 'yillik',
        nativeI18n: L('기념일', 'yillik', 'anniversary', 'годовщина'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['invitations', 'matching'],
  },

  en_s1u10_n4_053_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'dinner',
      'Would',
      'come',
      'like',
      'you',
      'to',
      'for',
      'party',
      'invitation',
    ],
    answer: 'Would you like to come for dinner',
    answerTranslation: L(
      '저녁 먹으러 오실래요?',
      'Kechki ovqatga kelishni xohlaysizmi?',
      'Would you like to come for dinner?',
      'Хотите прийти на ужин?',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['invitation', 'would-like'],
  },

  en_s1u10_n4_054_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'formal',
        native: 'rasmiy',
        nativeI18n: L('격식 있는', 'rasmiy', 'formal', 'формальный'),
      },
      {
        text: 'informal',
        native: 'norasmiy',
        nativeI18n: L('비격식적인', 'norasmiy', 'informal', 'неформальный'),
      },
      {
        text: 'invitation',
        native: 'taklifnoma',
        nativeI18n: L('초대장', 'taklifnoma', 'invitation', 'приглашение'),
      },
      {
        text: 'party',
        native: 'ziyofat',
        nativeI18n: L('파티', 'ziyofat', 'party', 'вечеринка'),
      },
      {
        text: 'anniversary',
        native: 'yillik',
        nativeI18n: L('기념일', 'yillik', 'anniversary', 'годовщина'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['invitations', 'listening'],
  },

  en_s1u10_n4_055_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'pool',
    choices: [
      { text: 'party', label: '🎉', emoji: '🎉', imageUrl: '' },
      { text: 'restaurant', label: '🍽️', emoji: '🍽️', imageUrl: '' },
      { text: 'pool', label: '🏊', emoji: '🏊', imageUrl: '' },
      { text: 'cafe', label: '☕', emoji: '☕', imageUrl: '' },
    ],
    answerTranslation: L('수영장', 'basseyn', 'pool', 'бассейн'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['pool'],
  },

  en_s1u10_n4_056_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Can you ___ to my party this Friday?',
    blankAnswers: ['come'],
    options: ['come', 'came', 'coming', 'comes'],
    answer: 'come',
    answerTranslation: L(
      '이번 금요일에 제 파티에 올 수 있어요?',
      'Shu juma kuni mening ziyofatimga kela olasizmi?',
      'Can you come to my party this Friday?',
      'Ты можешь прийти на мою вечеринку в эту пятницу?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['invitation', 'can'],
  },

  en_s1u10_n4_057_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Can you come to my ',
    sentenceSuffix: '?',
    answer: 'party',
    answerTranslation: L(
      '제 파티에 올 수 있어요?',
      'Mening ziyofatimga kela olasizmi?',
      'Can you come to my party?',
      'Ты можешь прийти на мою вечеринку?',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "party".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'party'],
  },

  en_s1u10_n4_058_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'house',
      'come',
      'Would',
      'my',
      'to',
      'like',
      'you',
      'party',
      'bill',
    ],
    answer: 'Would you like to come to my house',
    audioText: 'Would you like to come to my house?',
    answerTranslation: L(
      '우리 집에 오실래요?',
      'Uyimga kelishni xohlaysizmi?',
      'Would you like to come to my house?',
      'Хотите прийти ко мне домой?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['invitation', 'would-like'],
  },

  en_s1u10_n4_059_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Can you come to the party on Friday?',
    options: ['Yes', 'I', 'can', 'come', 'Friday', 'cannot', 'bill'],
    answer: 'Yes I can come',
    answerTranslation: L(
      '네, 갈 수 있어요.',
      'Ha, bora olaman.',
      'Yes, I can come.',
      'Да, я могу прийти.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['invitation', 'reply'],
  },

  en_s1u10_n4_060_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Would you like to come to my house for dinner on Friday night?',
      },
    ],
    options: [
      'I’d love to come.',
      'I’d like a bill.',
      'Dinner was tomorrow.',
      'I am a restaurant.',
    ],
    answer: 'I’d love to come.',
    answerTranslation: L(
      '정말 가고 싶어요.',
      'Juda borishni xohlayman.',
      'I’d love to come.',
      'Я с удовольствием приду.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['invitation', 'dialog'],
  },

  // ===========================================================
  // Lesson 4 · Thank-you notes
  // ===========================================================

  en_s1u10_n4_061_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Thank you very much for the invitation.',
    audioText: 'Thank you very much for the invitation.',
    answerTranslation: L(
      '초대해 주셔서 정말 감사합니다.',
      'Taklif uchun katta rahmat.',
      'Thank you very much for the invitation.',
      'Большое спасибо за приглашение.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['thank-you', 'invitation'],
  },

  en_s1u10_n4_062_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'note',
    choices: [
      { text: 'bill', label: '🧾', emoji: '🧾', imageUrl: '' },
      { text: 'invitation', label: '💌', emoji: '💌', imageUrl: '' },
      { text: 'note', label: '📝', emoji: '📝', imageUrl: '' },
      { text: 'menu', label: '📋', emoji: '📋', imageUrl: '' },
    ],
    answerTranslation: L('메모', 'qisqa xat', 'note', 'записка'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['note'],
  },

  en_s1u10_n4_063_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'note',
        native: 'qisqa xat',
        nativeI18n: L('메모', 'qisqa xat', 'note', 'записка'),
      },
      {
        text: 'invitation',
        native: 'taklifnoma',
        nativeI18n: L('초대장', 'taklifnoma', 'invitation', 'приглашение'),
      },
      {
        text: 'party',
        native: 'ziyofat',
        nativeI18n: L('파티', 'ziyofat', 'party', 'вечеринка'),
      },
      {
        text: 'anniversary',
        native: 'yillik',
        nativeI18n: L('기념일', 'yillik', 'anniversary', 'годовщина'),
      },
      {
        text: 'formal',
        native: 'rasmiy',
        nativeI18n: L('격식 있는', 'rasmiy', 'formal', 'формальный'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['writing', 'matching'],
  },

  en_s1u10_n4_064_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'invitation',
      'very',
      'Thank',
      'for',
      'much',
      'you',
      'the',
      'party',
      'note',
    ],
    answer: 'Thank you very much for the invitation',
    answerTranslation: L(
      '초대해 주셔서 정말 감사합니다.',
      'Taklif uchun katta rahmat.',
      'Thank you very much for the invitation.',
      'Большое спасибо за приглашение.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['thank-you', 'invitation'],
  },

  en_s1u10_n4_065_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['great', 'Thanks', 'sounds', 'invitation', 'party', 'sorry'],
    answer: 'Thanks sounds great',
    audioText: 'Thanks! Sounds great.',
    answerTranslation: L(
      '고마워요! 정말 좋네요.',
      'Rahmat! Juda yaxshi ekan.',
      'Thanks! Sounds great.',
      'Спасибо! Звучит отлично.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['thank-you', 'accepting'],
  },

  en_s1u10_n4_066_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'note',
        native: 'qisqa xat',
        nativeI18n: L('메모', 'qisqa xat', 'note', 'записка'),
      },
      {
        text: 'invitation',
        native: 'taklifnoma',
        nativeI18n: L('초대장', 'taklifnoma', 'invitation', 'приглашение'),
      },
      {
        text: 'party',
        native: 'ziyofat',
        nativeI18n: L('파티', 'ziyofat', 'party', 'вечеринка'),
      },
      {
        text: 'anniversary',
        native: 'yillik',
        nativeI18n: L('기념일', 'yillik', 'anniversary', 'годовщина'),
      },
      {
        text: 'formal',
        native: 'rasmiy',
        nativeI18n: L('격식 있는', 'rasmiy', 'formal', 'формальный'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['writing', 'listening'],
  },

  en_s1u10_n4_067_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'She wrote a thank-you ',
    sentenceSuffix: '.',
    answer: 'note',
    answerTranslation: L(
      '그녀는 감사 메모를 썼어요.',
      'U minnatdorchilik xatini yozdi.',
      'She wrote a thank-you note.',
      'Она написала благодарственную записку.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "note".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'note'],
  },

  en_s1u10_n4_068_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'anniversary',
    choices: [
      { text: 'party', label: '🎉', emoji: '🎉', imageUrl: '' },
      { text: 'pool', label: '🏊', emoji: '🏊', imageUrl: '' },
      { text: 'anniversary', label: '💍', emoji: '💍', imageUrl: '' },
      { text: 'restaurant', label: '🍽️', emoji: '🍽️', imageUrl: '' },
    ],
    answerTranslation: L('기념일', 'yillik', 'anniversary', 'годовщина'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['anniversary'],
  },

  en_s1u10_n4_069_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'I am so sorry, but I cannot come.',
    audioText: 'I am so sorry, but I cannot come.',
    answerI18n: L(
      '정말 미안하지만 갈 수 없어요',
      'Juda afsusdaman lekin bora olmayman',
      'I am so sorry but I cannot come',
      'Мне очень жаль но я не могу прийти',
    ),
    options: ['I', 'am', 'so', 'sorry', 'but', 'I', 'cannot', 'come', 'can'],
    optionsI18n: {
      ko: ['정말', '미안하지만', '갈', '수', '없어요'],
      uz: ['Juda', 'afsusdaman', 'lekin', 'bora', 'olmayman'],
      en: ['I', 'am', 'so', 'sorry', 'but', 'I', 'cannot', 'come'],
      ru: ['Мне', 'очень', 'жаль', 'но', 'я', 'не', 'могу', 'прийти'],
    },
    answerTranslation: L(
      '정말 미안하지만 갈 수 없어요.',
      'Juda afsusdaman, lekin bora olmayman.',
      'I am so sorry, but I cannot come.',
      'Мне очень жаль, но я не могу прийти.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['declining', 'invitation'],
  },

  en_s1u10_n4_070_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Can you come to the party on Friday?',
    options: ['I', 'am', 'sorry', 'but', 'I', 'cannot', 'come', 'yes', 'bill'],
    answer: 'I am sorry but I cannot come',
    answerTranslation: L(
      '미안하지만 갈 수 없어요.',
      'Afsusdaman, lekin bora olmayman.',
      'I am sorry, but I cannot come.',
      'Мне жаль, но я не могу прийти.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['declining', 'reply'],
  },

  en_s1u10_n4_071_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Thank you very much for the ',
    sentenceSuffix: '.',
    answer: 'invitation',
    answerTranslation: L(
      '초대해 주셔서 정말 감사합니다.',
      'Taklif uchun katta rahmat.',
      'Thank you very much for the invitation.',
      'Большое спасибо за приглашение.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "invitation".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'invitation'],
  },

  en_s1u10_n4_072_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'voice',
        native: 'ovoz',
        nativeI18n: L('목소리', 'ovoz', 'voice', 'голос'),
      },
      {
        text: 'mood',
        native: 'kayfiyat',
        nativeI18n: L('기분', 'kayfiyat', 'mood', 'настроение'),
      },
      {
        text: 'accent',
        native: 'aksent',
        nativeI18n: L('억양', 'aksent', 'accent', 'акцент'),
      },
      {
        text: 'note',
        native: 'qisqa xat',
        nativeI18n: L('메모', 'qisqa xat', 'note', 'записка'),
      },
      {
        text: 'invitation',
        native: 'taklifnoma',
        nativeI18n: L('초대장', 'taklifnoma', 'invitation', 'приглашение'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit10', 'matching'],
  },

  en_s1u10_n4_073_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'come',
      'love',
      'I',
      'to',
      'would',
      'sorry',
      'party',
      'invitation',
    ],
    answer: 'I would love to come',
    answerTranslation: L(
      '정말 가고 싶어요.',
      'Juda borishni xohlayman.',
      'I would love to come.',
      'Я с удовольствием приду.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['accepting', 'invitation'],
  },

  en_s1u10_n4_074_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'voice',
        native: 'ovoz',
        nativeI18n: L('목소리', 'ovoz', 'voice', 'голос'),
      },
      {
        text: 'mood',
        native: 'kayfiyat',
        nativeI18n: L('기분', 'kayfiyat', 'mood', 'настроение'),
      },
      {
        text: 'accent',
        native: 'aksent',
        nativeI18n: L('억양', 'aksent', 'accent', 'акцент'),
      },
      {
        text: 'note',
        native: 'qisqa xat',
        nativeI18n: L('메모', 'qisqa xat', 'note', 'записка'),
      },
      {
        text: 'invitation',
        native: 'taklifnoma',
        nativeI18n: L('초대장', 'taklifnoma', 'invitation', 'приглашение'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['unit10', 'listening'],
  },

  en_s1u10_n4_075_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'invitation',
    choices: [
      { text: 'note', label: '📝', emoji: '📝', imageUrl: '' },
      { text: 'bill', label: '🧾', emoji: '🧾', imageUrl: '' },
      { text: 'invitation', label: '💌', emoji: '💌', imageUrl: '' },
      { text: 'menu', label: '📋', emoji: '📋', imageUrl: '' },
    ],
    answerTranslation: L('초대장', 'taklifnoma', 'invitation', 'приглашение'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['invitation'],
  },

  en_s1u10_n4_076_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Please ___ us for a party.',
    blankAnswers: ['join'],
    options: ['join', 'order', 'joined', 'joining'],
    answer: 'join',
    answerTranslation: L(
      '파티에 함께해 주세요.',
      'Ziyofatga bizga qo‘shiling.',
      'Please join us for a party.',
      'Пожалуйста, присоединяйтесь к нам на вечеринке.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['invitation', 'join'],
  },

  en_s1u10_n4_077_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'It is our twentieth wedding ',
    sentenceSuffix: '.',
    answer: 'anniversary',
    answerTranslation: L(
      '우리의 결혼 20주년이에요.',
      'Bu bizning nikohimizning yigirma yilligi.',
      'It is our twentieth wedding anniversary.',
      'Это двадцатая годовщина нашей свадьбы.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "anniversary".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'anniversary'],
  },

  en_s1u10_n4_078_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'invitation',
      'Thanks',
      'the',
      'for',
      'very',
      'much',
      'you',
      'party',
    ],
    answer: 'Thank you very much for the invitation',
    audioText: 'Thank you very much for the invitation.',
    answerTranslation: L(
      '초대해 주셔서 정말 감사합니다.',
      'Taklif uchun katta rahmat.',
      'Thank you very much for the invitation.',
      'Большое спасибо за приглашение.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['thank-you', 'invitation'],
  },

  en_s1u10_n4_079_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Would you like to come to our party?',
    options: [
      'Thanks',
      'sounds',
      'great',
      'I',
      'would',
      'love',
      'to',
      'come',
      'bill',
    ],
    answer: 'Thanks sounds great I would love to come',
    answerTranslation: L(
      '고마워요. 정말 좋네요. 꼭 가고 싶어요.',
      'Rahmat. Juda yaxshi ekan. Juda borishni xohlayman.',
      'Thanks! Sounds great. I would love to come.',
      'Спасибо! Звучит отлично. Я с удовольствием приду.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['accepting', 'reply'],
  },

  en_s1u10_n4_080_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Can you come to my birthday party this Friday?',
      },
    ],
    options: [
      'Thanks, but I can’t come because I have English class.',
      'The bill is a birthday party.',
      'I ordered English class.',
      'Friday was invitation tomorrow.',
    ],
    answer: 'Thanks, but I can’t come because I have English class.',
    answerTranslation: L(
      '고맙지만 영어 수업이 있어서 갈 수 없어요.',
      'Rahmat, lekin ingliz tili darsim borligi uchun bora olmayman.',
      'Thanks, but I can’t come because I have English class.',
      'Спасибо, но я не могу прийти, потому что у меня урок английского.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['declining', 'invitation', 'final'],
  },
};

export const EN_S1_UNIT10_NODE4 = {
  title: L(
    '주문과 초대',
    'Buyurtma va taklif',
    'Ordering and invitations',
    'Заказы и приглашения',
  ),
  section: 1,
  unit: 10,
  order: 4,
  isActive: true,

  lessons: [
    {
      title: L(
        '음식과 음료 주문하기',
        'Ovqat va ichimlik buyurtma qilish',
        'Ordering food and drink',
        'Заказываем еду и напитки',
      ),
      description: L(
        '식당과 패스트푸드점에서 주문하고 추가 주문을 묻고 계산서를 요청하는 표현을 연습해요.',
        'Restoran va tez ovqatlanish joylarida buyurtma berish, qo‘shimcha buyurtma so‘rash va hisobni so‘rashni mashq qilasiz.',
        'Practise ordering food and drink, asking about additional items and requesting the bill.',
        'Практикуем заказ еды и напитков, дополнительные заказы и просьбу принести счёт.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 1,
      questions: [
        'en_s1u10_n4_001_speaking',
        'en_s1u10_n4_002_image_choice',
        'en_s1u10_n4_003_word_matching',
        'en_s1u10_n4_004_translate_builder',
        'en_s1u10_n4_005_word_arrange',
        'en_s1u10_n4_006_audio_match',
        'en_s1u10_n4_007_type_answer',
        'en_s1u10_n4_008_image_choice',
        'en_s1u10_n4_009_sentence_builder',
        'en_s1u10_n4_010_reply_builder',
        'en_s1u10_n4_011_type_answer',
        'en_s1u10_n4_012_word_matching',
        'en_s1u10_n4_013_translate_builder',
        'en_s1u10_n4_014_audio_match',
        'en_s1u10_n4_015_image_choice',
        'en_s1u10_n4_016_fill_in_blank',
        'en_s1u10_n4_017_type_answer',
        'en_s1u10_n4_018_word_arrange',
        'en_s1u10_n4_019_reply_builder',
        'en_s1u10_n4_020_dialog_complete',
      ],
    },

    {
      title: L(
        '격식 있는 표현과 편한 표현',
        'Rasmiy va norasmiy iboralar',
        'Formal and informal language',
        'Формальная и неформальная речь',
      ),
      description: L(
        '식당에서 쓰는 격식 있는 표현과 짧고 편한 표현을 비교하고 목소리, 기분, 억양 차이도 익혀요.',
        'Restorandagi rasmiy va norasmiy iboralarni taqqoslab, ovoz, kayfiyat va aksent farqlarini o‘rganasiz.',
        'Compare formal and informal restaurant language and learn how voice, mood and accent can affect speech.',
        'Сравниваем формальную и неформальную речь и изучаем различия голоса, настроения и акцента.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 2,
      questions: [
        'en_s1u10_n4_021_speaking',
        'en_s1u10_n4_022_image_choice',
        'en_s1u10_n4_023_word_matching',
        'en_s1u10_n4_024_translate_builder',
        'en_s1u10_n4_025_word_arrange',
        'en_s1u10_n4_026_audio_match',
        'en_s1u10_n4_027_type_answer',
        'en_s1u10_n4_028_image_choice',
        'en_s1u10_n4_029_sentence_builder',
        'en_s1u10_n4_030_reply_builder',
        'en_s1u10_n4_031_type_answer',
        'en_s1u10_n4_032_word_matching',
        'en_s1u10_n4_033_translate_builder',
        'en_s1u10_n4_034_audio_match',
        'en_s1u10_n4_035_image_choice',
        'en_s1u10_n4_036_fill_in_blank',
        'en_s1u10_n4_037_type_answer',
        'en_s1u10_n4_038_word_arrange',
        'en_s1u10_n4_039_reply_builder',
        'en_s1u10_n4_040_dialog_complete',
      ],
    },

    {
      title: L(
        '사람 초대하기',
        'Odamlarni taklif qilish',
        'Invitations',
        'Приглашения',
      ),
      description: L(
        'Would you like to come?, Can you come?, Please join us for ... 같은 표현으로 파티나 식사에 사람을 초대해요.',
        'Would you like to come?, Can you come? va Please join us for ... kabi iboralar bilan odamlarni taklif qilasiz.',
        'Invite people to meals and events with Would you like to come?, Can you come? and Please join us for ...',
        'Приглашаем людей на ужин и мероприятия с помощью Would you like to come?, Can you come? и Please join us for ...',
      ),
      category: LessonCategory.EXPRESSION,
      level: LV,
      order: 3,
      questions: [
        'en_s1u10_n4_041_speaking',
        'en_s1u10_n4_042_image_choice',
        'en_s1u10_n4_043_word_matching',
        'en_s1u10_n4_044_translate_builder',
        'en_s1u10_n4_045_word_arrange',
        'en_s1u10_n4_046_audio_match',
        'en_s1u10_n4_047_type_answer',
        'en_s1u10_n4_048_image_choice',
        'en_s1u10_n4_049_sentence_builder',
        'en_s1u10_n4_050_reply_builder',
        'en_s1u10_n4_051_type_answer',
        'en_s1u10_n4_052_word_matching',
        'en_s1u10_n4_053_translate_builder',
        'en_s1u10_n4_054_audio_match',
        'en_s1u10_n4_055_image_choice',
        'en_s1u10_n4_056_fill_in_blank',
        'en_s1u10_n4_057_type_answer',
        'en_s1u10_n4_058_word_arrange',
        'en_s1u10_n4_059_reply_builder',
        'en_s1u10_n4_060_dialog_complete',
      ],
    },

    {
      title: L(
        '초대에 답장하기',
        'Taklifga javob yozish',
        'Replying to invitations',
        'Отвечаем на приглашения',
      ),
      description: L(
        '초대에 감사하고 수락하거나 정중하게 거절하는 짧은 감사 메모와 답장을 연습해요.',
        'Taklif uchun minnatdorchilik bildirib, uni qabul qilish yoki muloyim rad etish uchun qisqa javoblar yozasiz.',
        'Practise short thank-you notes that accept or politely decline invitations.',
        'Практикуем короткие благодарственные ответы с принятием или вежливым отказом от приглашения.',
      ),
      category: LessonCategory.EXPRESSION,
      level: LV,
      order: 4,
      questions: [
        'en_s1u10_n4_061_speaking',
        'en_s1u10_n4_062_image_choice',
        'en_s1u10_n4_063_word_matching',
        'en_s1u10_n4_064_translate_builder',
        'en_s1u10_n4_065_word_arrange',
        'en_s1u10_n4_066_audio_match',
        'en_s1u10_n4_067_type_answer',
        'en_s1u10_n4_068_image_choice',
        'en_s1u10_n4_069_sentence_builder',
        'en_s1u10_n4_070_reply_builder',
        'en_s1u10_n4_071_type_answer',
        'en_s1u10_n4_072_word_matching',
        'en_s1u10_n4_073_translate_builder',
        'en_s1u10_n4_074_audio_match',
        'en_s1u10_n4_075_image_choice',
        'en_s1u10_n4_076_fill_in_blank',
        'en_s1u10_n4_077_type_answer',
        'en_s1u10_n4_078_word_arrange',
        'en_s1u10_n4_079_reply_builder',
        'en_s1u10_n4_080_dialog_complete',
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Section 1 · Unit 10 · Node 5
// 10.5 A New York cafe + Units 9–10 Review
//
// Coverage
// - New York cafe vocabulary
// - owner / employee / machine / ice / bag
// - pastry / shelf / local
// - busy / typical / popular / break
// - coffee to take away
// - coffee machine / paper bag / hot pastry
// - describing a cafe
// - name / location / opening time
// - what people buy
// - special food and drink
// - would like review
// - going to review
// - future time expressions
// - in / on / at review
// - past simple review
// - irregular past verbs
// - change jobs / move abroad
// - have a headache / miss a train
// - ordering food and drink
// - weather review
//
// IMPORTANT:
// *_WORDS에는 무조건 단어 하나만 등록.
// "coffee machine", "paper bag", "hot pastry",
// "take away", "have a break" 같은 구/문장은 등록 금지.
//
// VIDEO:
// 교재에는 선택지만 있고 영상 정답은 텍스트에 없음.
// 국가/연도/정확한 pastry 재료 등 영상 정답 임의 생성 금지.
//
// 4 lessons × 20 questions = 80
// speaking: reduced
// image_choice / word_matching / audio_match: increased
// type_answer: 3 per lesson
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT10_NODE5_WORDS = [
  {
    code: 'en-noun-chance',
    english: 'chance',
    senseKey: 'opportunity-to-do-something',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '기회',
      'imkoniyat',
      'an opportunity to do something',
      'шанс; возможность',
    ),
    examples: [
      {
        english: 'Next year, she has a chance to go to Europe.',
        translations: L(
          '내년에 그녀는 유럽에 갈 기회가 있어요.',
          'Kelasi yili uning Yevropaga borish imkoniyati bor.',
          'Next year, she has a chance to go to Europe.',
          'В следующем году у неё будет возможность поехать в Европу.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/tʃɑːns/',
      ttsText: 'chance',
    },
    media: {
      emoji: '🌟',
      imageUrl: '',
      imageAlt: L(
        '새로운 기회',
        'yangi imkoniyat',
        'a new opportunity',
        'новая возможность',
      ),
    },
    tags: ['future', 'opportunity'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-food-chips',
    english: 'chips',
    senseKey: 'fried-potato-pieces-british',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '감자튀김',
      'fri kartoshka',
      'pieces of potato fried in oil',
      'картофель фри',
    ),
    examples: [
      {
        english: 'Fish and chips is a traditional British dinner.',
        translations: L(
          '피시 앤 칩스는 전통적인 영국 음식이에요.',
          'Fish and chips an’anaviy Britaniya taomidir.',
          'Fish and chips is a traditional British dinner.',
          'Рыба с картофелем фри — традиционное британское блюдо.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/tʃɪps/',
      ttsText: 'chips',
    },
    media: {
      emoji: '🍟',
      imageUrl: '',
      imageAlt: L('감자튀김', 'fri kartoshka', 'chips', 'картофель фри'),
    },
    tags: ['food', 'cafe'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-food-cupcake',
    english: 'cupcake',
    senseKey: 'small-cake-for-one-person',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '컵케이크',
      'kapkeyk',
      'a small cake made for one person',
      'капкейк',
    ),
    examples: [
      {
        english: 'Try a colourful cupcake with your coffee.',
        translations: L(
          '커피와 함께 알록달록한 컵케이크를 먹어 보세요.',
          'Qahvangiz bilan rang-barang kapkeyk tatib ko‘ring.',
          'Try a colourful cupcake with your coffee.',
          'Попробуйте яркий капкейк с кофе.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkʌpkeɪk/',
      ttsText: 'cupcake',
    },
    media: {
      emoji: '🧁',
      imageUrl: '',
      imageAlt: L('컵케이크', 'kapkeyk', 'a cupcake', 'капкейк'),
    },
    tags: ['food', 'dessert'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-other-during',
    english: 'during',
    senseKey: 'throughout-particular-period',
    partOfSpeech: WordPartOfSpeech.OTHER,
    meaning: L(
      '~동안',
      'davomida',
      'throughout or at some time in a particular period',
      'во время; в течение',
    ),
    examples: [
      {
        english: 'They cannot pay for hotels during the tour.',
        translations: L(
          '그들은 여행 중 호텔 비용을 낼 수 없어요.',
          'Ular sayohat davomida mehmonxona uchun to‘lay olmaydi.',
          'They cannot pay for hotels during the tour.',
          'Они не могут платить за отели во время тура.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈdjʊərɪŋ/',
      ttsText: 'during',
    },
    media: {
      emoji: '⏳',
      imageUrl: '',
      imageAlt: L(
        '어떤 기간 동안',
        'ma’lum vaqt davomida',
        'during a period of time',
        'в течение периода времени',
      ),
    },
    tags: ['preposition', 'time'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-food',
    english: 'food',
    senseKey: 'things-people-eat',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '음식',
      'ovqat; oziq-ovqat',
      'things that people eat',
      'еда; пища',
    ),
    examples: [
      {
        english: 'There was interesting food from all over the world.',
        translations: L(
          '전 세계의 다양한 흥미로운 음식이 있었어요.',
          'Dunyoning turli joylaridan qiziqarli taomlar bor edi.',
          'There was interesting food from all over the world.',
          'Там была интересная еда со всего мира.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/fuːd/',
      ttsText: 'food',
    },
    media: {
      emoji: '🍽️',
      imageUrl: '',
      imageAlt: L(
        '여러 가지 음식',
        'turli taomlar',
        'different kinds of food',
        'разная еда',
      ),
    },
    tags: ['food'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-international',
    english: 'international',
    senseKey: 'involving-more-than-one-country',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '국제적인',
      'xalqaro',
      'involving more than one country',
      'международный',
    ),
    examples: [
      {
        english: 'There is an international coffee expo every year.',
        translations: L(
          '매년 국제 커피 박람회가 열려요.',
          'Har yili xalqaro qahva ko‘rgazmasi bo‘ladi.',
          'There is an international coffee expo every year.',
          'Каждый год проходит международная кофейная выставка.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌɪntəˈnæʃənəl/',
      ttsText: 'international',
    },
    media: {
      emoji: '🌍',
      imageUrl: '',
      imageAlt: L(
        '여러 나라가 참여하는 행사',
        'turli davlatlar qatnashadigan tadbir',
        'an international event',
        'международное мероприятие',
      ),
    },
    tags: ['adjectives', 'countries'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-island',
    english: 'island',
    senseKey: 'land-surrounded-by-water',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('섬', 'orol', 'an area of land surrounded by water', 'остров'),
    examples: [
      {
        english: 'We are going to live on another island.',
        translations: L(
          '우리는 다른 섬에서 살 예정이에요.',
          'Biz boshqa orolda yashamoqchimiz.',
          'We are going to live on another island.',
          'Мы собираемся жить на другом острове.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈaɪlənd/',
      ttsText: 'island',
    },
    media: {
      emoji: '🏝️',
      imageUrl: '',
      imageAlt: L('섬', 'orol', 'an island', 'остров'),
    },
    tags: ['places', 'nature'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-join',
    english: 'join',
    senseKey: 'become-member-of-group',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '가입하다; 합류하다',
      'qo‘shilmoq',
      'to become a member of a group or take part with other people',
      'присоединяться; вступать',
    ),
    examples: [
      {
        english: 'My friend and I are going to join a group.',
        translations: L(
          '친구와 저는 그룹에 가입할 예정이에요.',
          'Do‘stim bilan men guruhga qo‘shilmoqchimiz.',
          'My friend and I are going to join a group.',
          'Мы с другом собираемся присоединиться к группе.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/dʒɔɪn/',
      ttsText: 'join',
    },
    media: {
      emoji: '🤝',
      imageUrl: '',
      imageAlt: L(
        '그룹에 합류하는 사람',
        'guruhga qo‘shilayotgan odam',
        'joining a group',
        'присоединение к группе',
      ),
    },
    tags: ['verbs', 'groups'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-order',
    english: 'order',
    senseKey: 'request-for-food-or-drink',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '주문',
      'buyurtma',
      'a request for food or drink in a restaurant or cafe',
      'заказ',
    ),
    examples: [
      {
        english: 'Can I take your order?',
        translations: L(
          '주문하시겠어요?',
          'Buyurtmangizni olsam bo‘ladimi?',
          'Can I take your order?',
          'Могу я принять ваш заказ?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈɔːdə(r)/',
      ttsText: 'order',
    },
    media: {
      emoji: '📝',
      imageUrl: '',
      imageAlt: L('음식 주문', 'ovqat buyurtmasi', 'a food order', 'заказ еды'),
    },
    tags: ['restaurant', 'cafe', 'noun'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-food-rice',
    english: 'rice',
    senseKey: 'small-white-or-brown-grains-food',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '쌀; 밥',
      'guruch',
      'small grains that are cooked and eaten as food',
      'рис',
    ),
    examples: [
      {
        english: 'Japanese food has got a lot of rice in it.',
        translations: L(
          '일본 음식에는 쌀이 많이 들어가요.',
          'Yapon taomlarida guruch ko‘p ishlatiladi.',
          'Japanese food has got a lot of rice in it.',
          'В японской кухне используется много риса.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/raɪs/',
      ttsText: 'rice',
    },
    media: {
      emoji: '🍚',
      imageUrl: '',
      imageAlt: L('밥', 'guruch', 'rice', 'рис'),
    },
    tags: ['food'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-sweet',
    english: 'sweet',
    senseKey: 'tasting-like-sugar',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('단; 달콤한', 'shirin', 'having a taste like sugar', 'сладкий'),
    examples: [
      {
        english: 'I love sweet food.',
        translations: L(
          '저는 단 음식을 좋아해요.',
          'Men shirin taomlarni yaxshi ko‘raman.',
          'I love sweet food.',
          'Я люблю сладкую еду.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/swiːt/',
      ttsText: 'sweet',
    },
    media: {
      emoji: '🍬',
      imageUrl: '',
      imageAlt: L('달콤한 음식', 'shirin taom', 'sweet food', 'сладкая еда'),
    },
    tags: ['food', 'adjectives', 'taste'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adverb-today',
    english: 'today',
    senseKey: 'on-present-day',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L('오늘', 'bugun', 'on this present day', 'сегодня'),
    examples: [
      {
        english: 'You are not going to buy a new skirt today.',
        translations: L(
          '오늘은 새 치마를 사지 않을 거예요.',
          'Siz bugun yangi yubka sotib olmaysiz.',
          'You are not going to buy a new skirt today.',
          'Сегодня вы не собираетесь покупать новую юбку.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/təˈdeɪ/',
      ttsText: 'today',
    },
    media: {
      emoji: '📅',
      imageUrl: '',
      imageAlt: L('오늘 날짜', 'bugungi sana', 'today', 'сегодняшний день'),
    },
    tags: ['time', 'future'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adverb-tomorrow',
    english: 'tomorrow',
    senseKey: 'on-day-after-today',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L('내일', 'ertaga', 'on the day after today', 'завтра'),
    examples: [
      {
        english: 'The children are going to sing tomorrow.',
        translations: L(
          '아이들은 내일 노래할 예정이에요.',
          'Bolalar ertaga qo‘shiq aytadi.',
          'The children are going to sing tomorrow.',
          'Дети будут петь завтра.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/təˈmɒrəʊ/',
      ttsText: 'tomorrow',
    },
    media: {
      emoji: '➡️📅',
      imageUrl: '',
      imageAlt: L('내일 날짜', 'ertangi sana', 'tomorrow', 'завтрашний день'),
    },
    tags: ['time', 'future'],
    difficulty: 1,
    isCore: true,
  },
  {
    code: 'en-person-owner',
    english: 'owner',
    senseKey: 'person-who-owns-business-or-thing',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '주인; 소유자',
      'egasi',
      'a person who owns a business or thing',
      'владелец',
    ),
    examples: [
      {
        english: 'The owner is in the cafe.',
        translations: L(
          '카페 주인이 카페 안에 있어요.',
          'Kafe egasi kafeda.',
          'The owner is in the cafe.',
          'Владелец находится в кафе.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈəʊnə/',
      ttsText: 'owner',
    },
    media: {
      emoji: '👤',
      imageUrl: '',
      imageAlt: L('카페 주인', 'kafe egasi', 'a cafe owner', 'владелец кафе'),
    },
    tags: ['people', 'business'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-person-employee',
    english: 'employee',
    senseKey: 'person-who-works-for-an-employer',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '직원',
      'xodim',
      'a person who works for another person or company',
      'сотрудник',
    ),
    examples: [
      {
        english: 'The employee works in the cafe.',
        translations: L(
          '그 직원은 카페에서 일해요.',
          'Xodim kafeda ishlaydi.',
          'The employee works in the cafe.',
          'Сотрудник работает в кафе.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɪmˈplɔɪiː/',
      ttsText: 'employee',
    },
    media: {
      emoji: '🧑‍💼',
      imageUrl: '',
      imageAlt: L(
        '카페 직원',
        'kafe xodimi',
        'a cafe employee',
        'сотрудник кафе',
      ),
    },
    tags: ['people', 'work'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-machine',
    english: 'machine',
    senseKey: 'piece-of-equipment-using-power',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '기계',
      'mashina',
      'a piece of equipment that uses power to do a particular job',
      'машина; аппарат',
    ),
    examples: [
      {
        english: 'The cafe has a coffee machine.',
        translations: L(
          '그 카페에는 커피 기계가 있어요.',
          'Kafeda qahva mashinasi bor.',
          'The cafe has a coffee machine.',
          'В кафе есть кофемашина.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/məˈʃiːn/',
      ttsText: 'machine',
    },
    media: {
      emoji: '⚙️',
      imageUrl: '',
      imageAlt: L(
        '커피 기계',
        'qahva mashinasi',
        'a coffee machine',
        'кофемашина',
      ),
    },
    tags: ['equipment', 'cafe'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-ice',
    english: 'ice',
    senseKey: 'frozen-water',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('얼음', 'muz', 'water that has frozen and become solid', 'лёд'),
    examples: [
      {
        english: 'I would like coffee with ice.',
        translations: L(
          '얼음을 넣은 커피를 원해요.',
          'Men muzli qahva xohlayman.',
          'I would like coffee with ice.',
          'Я бы хотел кофе со льдом.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/aɪs/',
      ttsText: 'ice',
    },
    media: {
      emoji: '🧊',
      imageUrl: '',
      imageAlt: L('얼음', 'muz', 'ice', 'лёд'),
    },
    tags: ['food', 'drinks'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-bag',
    english: 'bag',
    senseKey: 'container-made-of-paper-cloth-or-plastic',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '가방; 봉투',
      'sumka; paket',
      'a container made of paper, cloth or plastic',
      'сумка; пакет',
    ),
    examples: [
      {
        english: 'The pastry is in a paper bag.',
        translations: L(
          '페이스트리가 종이봉투 안에 있어요.',
          'Pishiriq qog‘oz paketda.',
          'The pastry is in a paper bag.',
          'Выпечка находится в бумажном пакете.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/bæɡ/',
      ttsText: 'bag',
    },
    media: {
      emoji: '🛍️',
      imageUrl: '',
      imageAlt: L('종이봉투', 'qog‘oz paket', 'a paper bag', 'бумажный пакет'),
    },
    tags: ['objects', 'cafe'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-pastry',
    english: 'pastry',
    senseKey: 'baked-food-made-from-dough',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '페이스트리; 구운 빵 과자',
      'pishiriq',
      'a baked food made from flour, fat and water',
      'выпечка',
    ),
    examples: [
      {
        english: 'The special snack is a kind of pastry.',
        translations: L(
          '특별 간식은 페이스트리의 한 종류예요.',
          'Maxsus yegulik pishiriqning bir turi.',
          'The special snack is a kind of pastry.',
          'Особая закуска — это вид выпечки.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈpeɪstri/',
      ttsText: 'pastry',
    },
    media: {
      emoji: '🥐',
      imageUrl: '',
      imageAlt: L('구운 페이스트리', 'pishiriq', 'a pastry', 'выпечка'),
    },
    tags: ['food', 'cafe'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-shelf',
    english: 'shelf',
    senseKey: 'flat-surface-for-storing-things',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '선반',
      'tokcha',
      'a flat surface used for keeping or displaying things',
      'полка',
    ),
    examples: [
      {
        english: 'There are snacks on the shelf.',
        translations: L(
          '선반 위에 간식이 있어요.',
          'Tokchada yeguliklar bor.',
          'There are snacks on the shelf.',
          'На полке есть закуски.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ʃelf/',
      ttsText: 'shelf',
    },
    media: {
      emoji: '🗄️',
      imageUrl: '',
      imageAlt: L(
        '음식이 놓인 선반',
        'ovqat qo‘yilgan tokcha',
        'a shelf with food',
        'полка с едой',
      ),
    },
    tags: ['objects', 'shop'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-person-local',
    english: 'local',
    senseKey: 'person-who-lives-in-particular-place',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '현지인',
      'mahalliy aholi vakili',
      'a person who lives in a particular place',
      'местный житель',
    ),
    examples: [
      {
        english: 'The cafe is popular with locals.',
        translations: L(
          '그 카페는 현지인들에게 인기가 있어요.',
          'Kafe mahalliy aholi orasida mashhur.',
          'The cafe is popular with locals.',
          'Кафе популярно среди местных жителей.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈləʊkəl/',
      ttsText: 'local',
    },
    media: {
      emoji: '🏙️',
      imageUrl: '',
      imageAlt: L(
        '동네의 현지인',
        'mahalliy aholi',
        'a local person',
        'местный житель',
      ),
    },
    tags: ['people', 'places'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-busy',
    english: 'busy',
    senseKey: 'having-many-people-or-much-activity',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '붐비는; 바쁜',
      'gavjum; band',
      'having a lot of people or activity',
      'оживлённый; занятый',
    ),
    examples: [
      {
        english: 'The cafe is very busy after lunch.',
        translations: L(
          '점심 후에는 카페가 아주 붐벼요.',
          'Tushlikdan keyin kafe juda gavjum.',
          'The cafe is very busy after lunch.',
          'После обеда в кафе очень многолюдно.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈbɪzi/',
      ttsText: 'busy',
    },
    media: {
      emoji: '👥',
      imageUrl: '',
      imageAlt: L(
        '붐비는 카페',
        'gavjum kafe',
        'a busy cafe',
        'оживлённое кафе',
      ),
    },
    tags: ['adjectives', 'cafe'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-typical',
    english: 'typical',
    senseKey: 'showing-usual-features-of-type',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '전형적인; 대표적인',
      'odatiy; xos',
      'having the usual features of a particular type',
      'типичный',
    ),
    examples: [
      {
        english: 'It is a typical kind of pastry.',
        translations: L(
          '그것은 전형적인 종류의 페이스트리예요.',
          'Bu odatiy pishiriq turi.',
          'It is a typical kind of pastry.',
          'Это типичный вид выпечки.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈtɪpɪkəl/',
      ttsText: 'typical',
    },
    media: {
      emoji: '⭐',
      imageUrl: '',
      imageAlt: L(
        '대표적인 음식',
        'odatiy taom',
        'a typical food',
        'типичная еда',
      ),
    },
    tags: ['adjectives', 'description'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-popular',
    english: 'popular',
    senseKey: 'liked-by-many-people',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '인기 있는',
      'mashhur',
      'liked or enjoyed by many people',
      'популярный',
    ),
    examples: [
      {
        english: 'The cafe is popular with local people.',
        translations: L(
          '그 카페는 현지 사람들에게 인기가 있어요.',
          'Kafe mahalliy odamlar orasida mashhur.',
          'The cafe is popular with local people.',
          'Кафе популярно среди местных жителей.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈpɒpjələ/',
      ttsText: 'popular',
    },
    media: {
      emoji: '⭐',
      imageUrl: '',
      imageAlt: L(
        '사람들에게 인기 있는 카페',
        'mashhur kafe',
        'a popular cafe',
        'популярное кафе',
      ),
    },
    tags: ['adjectives', 'cafe'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-break',
    english: 'break',
    senseKey: 'short-period-of-rest',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '휴식; 쉬는 시간',
      'tanaffus',
      'a short period when you stop working and rest',
      'перерыв',
    ),
    examples: [
      {
        english: 'They have a short break.',
        translations: L(
          '그들은 짧게 쉬어요.',
          'Ular qisqa tanaffus qilishadi.',
          'They have a short break.',
          'У них короткий перерыв.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/breɪk/',
      ttsText: 'break',
    },
    media: {
      emoji: '☕',
      imageUrl: '',
      imageAlt: L(
        '잠깐 쉬는 시간',
        'qisqa tanaffus',
        'a short break',
        'короткий перерыв',
      ),
    },
    tags: ['work', 'time'],
    difficulty: 1,
    isCore: true,
  },
];

export const EN_S1_UNIT10_NODE5_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · A New York cafe
  // ===========================================================

  en_s1u10_n5_001_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The special snack is a kind of pastry.',
    audioText: 'The special snack is a kind of pastry.',
    answerTranslation: L(
      '특별 간식은 페이스트리의 한 종류예요.',
      'Maxsus yegulik pishiriqning bir turi.',
      'The special snack is a kind of pastry.',
      'Особая закуска — это вид выпечки.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['video', 'pastry'],
  },

  en_s1u10_n5_002_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'ice',
    choices: [
      { text: 'milk', label: '🥛', emoji: '🥛', imageUrl: '' },
      { text: 'ice', label: '🧊', emoji: '🧊', imageUrl: '' },
      { text: 'coffee', label: '☕', emoji: '☕', imageUrl: '' },
      { text: 'juice', label: '🧃', emoji: '🧃', imageUrl: '' },
    ],
    answerTranslation: L('얼음', 'muz', 'ice', 'лёд'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['ice'],
  },

  en_s1u10_n5_003_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'owner',
        native: 'egasi',
        nativeI18n: L('주인', 'egasi', 'owner', 'владелец'),
      },
      {
        text: 'employee',
        native: 'xodim',
        nativeI18n: L('직원', 'xodim', 'employee', 'сотрудник'),
      },
      {
        text: 'machine',
        native: 'mashina',
        nativeI18n: L('기계', 'mashina', 'machine', 'аппарат'),
      },
      {
        text: 'pastry',
        native: 'pishiriq',
        nativeI18n: L('페이스트리', 'pishiriq', 'pastry', 'выпечка'),
      },
      {
        text: 'shelf',
        native: 'tokcha',
        nativeI18n: L('선반', 'tokcha', 'shelf', 'полка'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['video-vocabulary', 'matching'],
  },

  en_s1u10_n5_004_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'kind',
      'snack',
      'pastry',
      'The',
      'of',
      'special',
      'a',
      'is',
      'coffee',
    ],
    answer: 'The special snack is a kind of pastry',
    answerTranslation: L(
      '특별 간식은 페이스트리의 한 종류예요.',
      'Maxsus yegulik pishiriqning bir turi.',
      'The special snack is a kind of pastry.',
      'Особая закуска — это вид выпечки.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['pastry', 'snack'],
  },

  en_s1u10_n5_005_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['machine', 'has', 'coffee', 'The', 'a', 'cafe', 'bag', 'ice'],
    answer: 'The cafe has a coffee machine',
    audioText: 'The cafe has a coffee machine.',
    answerTranslation: L(
      '그 카페에는 커피 기계가 있어요.',
      'Kafeda qahva mashinasi bor.',
      'The cafe has a coffee machine.',
      'В кафе есть кофемашина.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['machine', 'cafe'],
  },

  en_s1u10_n5_006_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'owner',
        native: 'egasi',
        nativeI18n: L('주인', 'egasi', 'owner', 'владелец'),
      },
      {
        text: 'employee',
        native: 'xodim',
        nativeI18n: L('직원', 'xodim', 'employee', 'сотрудник'),
      },
      {
        text: 'machine',
        native: 'mashina',
        nativeI18n: L('기계', 'mashina', 'machine', 'аппарат'),
      },
      {
        text: 'pastry',
        native: 'pishiriq',
        nativeI18n: L('페이스트리', 'pishiriq', 'pastry', 'выпечка'),
      },
      {
        text: 'shelf',
        native: 'tokcha',
        nativeI18n: L('선반', 'tokcha', 'shelf', 'полка'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['video-vocabulary', 'listening'],
  },

  en_s1u10_n5_007_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'The special snack is a kind of ',
    sentenceSuffix: '.',
    answer: 'pastry',
    answerTranslation: L(
      '특별 간식은 페이스트리의 한 종류예요.',
      'Maxsus yegulik pishiriqning bir turi.',
      'The special snack is a kind of pastry.',
      'Особая закуска — это вид выпечки.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "pastry".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'pastry'],
  },

  en_s1u10_n5_008_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'bag',
    choices: [
      { text: 'shelf', label: '🗄️', emoji: '🗄️', imageUrl: '' },
      { text: 'machine', label: '⚙️', emoji: '⚙️', imageUrl: '' },
      { text: 'bag', label: '🛍️', emoji: '🛍️', imageUrl: '' },
      { text: 'ice', label: '🧊', emoji: '🧊', imageUrl: '' },
    ],
    answerTranslation: L('봉투', 'paket', 'bag', 'пакет'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['bag'],
  },

  en_s1u10_n5_009_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'The owner and employee are in the shop.',
    audioText: 'The owner and employee are in the shop.',
    answerI18n: L(
      '주인과 직원이 가게 안에 있어요',
      'Egasi va xodim do‘konda',
      'The owner and employee are in the shop',
      'Владелец и сотрудник находятся в магазине',
    ),
    options: [
      'employee',
      'in',
      'shop',
      'The',
      'and',
      'are',
      'the',
      'owner',
      'customer',
    ],
    optionsI18n: {
      ko: ['주인과', '직원이', '가게', '안에', '있어요'],
      uz: ['Egasi', 'va', 'xodim', 'do‘konda'],
      en: ['The', 'owner', 'and', 'employee', 'are', 'in', 'the', 'shop'],
      ru: ['Владелец', 'и', 'сотрудник', 'находятся', 'в', 'магазине'],
    },
    answerTranslation: L(
      '주인과 직원이 가게 안에 있어요.',
      'Egasi va xodim do‘konda.',
      'The owner and employee are in the shop.',
      'Владелец и сотрудник находятся в магазине.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['owner', 'employee'],
  },

  en_s1u10_n5_010_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What is in the paper bag?',
    options: [
      'There',
      'is',
      'a',
      'pastry',
      'in',
      'the',
      'bag',
      'machine',
      'employee',
    ],
    answer: 'There is a pastry in the bag',
    answerTranslation: L(
      '봉투 안에 페이스트리가 있어요.',
      'Paket ichida pishiriq bor.',
      'There is a pastry in the bag.',
      'В пакете есть выпечка.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['pastry', 'bag', 'reply'],
  },

  en_s1u10_n5_011_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'The cafe has a coffee ',
    sentenceSuffix: '.',
    answer: 'machine',
    answerTranslation: L(
      '그 카페에는 커피 기계가 있어요.',
      'Kafeda qahva mashinasi bor.',
      'The cafe has a coffee machine.',
      'В кафе есть кофемашина.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "machine".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'machine'],
  },

  en_s1u10_n5_012_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'ice',
        native: 'muz',
        nativeI18n: L('얼음', 'muz', 'ice', 'лёд'),
      },
      {
        text: 'bag',
        native: 'paket',
        nativeI18n: L('봉투', 'paket', 'bag', 'пакет'),
      },
      {
        text: 'local',
        native: 'mahalliy aholi vakili',
        nativeI18n: L(
          '현지인',
          'mahalliy aholi vakili',
          'local',
          'местный житель',
        ),
      },
      {
        text: 'busy',
        native: 'gavjum',
        nativeI18n: L('붐비는', 'gavjum', 'busy', 'оживлённый'),
      },
      {
        text: 'popular',
        native: 'mashhur',
        nativeI18n: L('인기 있는', 'mashhur', 'popular', 'популярный'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['video-vocabulary', 'matching'],
  },

  en_s1u10_n5_013_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['ice', 'coffee', 'with', 'like', 'would', 'I', 'milk', 'bag'],
    answer: 'I would like coffee with ice',
    answerTranslation: L(
      '얼음을 넣은 커피를 원해요.',
      'Men muzli qahva xohlayman.',
      'I would like coffee with ice.',
      'Я бы хотел кофе со льдом.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['ice', 'coffee'],
  },

  en_s1u10_n5_014_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'ice',
        native: 'muz',
        nativeI18n: L('얼음', 'muz', 'ice', 'лёд'),
      },
      {
        text: 'bag',
        native: 'paket',
        nativeI18n: L('봉투', 'paket', 'bag', 'пакет'),
      },
      {
        text: 'local',
        native: 'mahalliy aholi vakili',
        nativeI18n: L(
          '현지인',
          'mahalliy aholi vakili',
          'local',
          'местный житель',
        ),
      },
      {
        text: 'busy',
        native: 'gavjum',
        nativeI18n: L('붐비는', 'gavjum', 'busy', 'оживлённый'),
      },
      {
        text: 'popular',
        native: 'mashhur',
        nativeI18n: L('인기 있는', 'mashhur', 'popular', 'популярный'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['video-vocabulary', 'listening'],
  },

  en_s1u10_n5_015_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'machine',
    choices: [
      { text: 'shelf', label: '🗄️', emoji: '🗄️', imageUrl: '' },
      { text: 'bag', label: '🛍️', emoji: '🛍️', imageUrl: '' },
      { text: 'machine', label: '⚙️', emoji: '⚙️', imageUrl: '' },
      { text: 'pastry', label: '🥐', emoji: '🥐', imageUrl: '' },
    ],
    answerTranslation: L('기계', 'mashina', 'machine', 'аппарат'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['machine'],
  },

  en_s1u10_n5_016_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'There are snacks on the ___.',
    blankAnswers: ['shelf'],
    options: ['shelf', 'ice', 'employee', 'local'],
    answer: 'shelf',
    answerTranslation: L(
      '선반 위에 간식이 있어요.',
      'Tokchada yeguliklar bor.',
      'There are snacks on the shelf.',
      'На полке есть закуски.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['shelf'],
  },

  en_s1u10_n5_017_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'The ',
    sentenceSuffix: ' works in the cafe.',
    answer: 'employee',
    answerTranslation: L(
      '그 직원은 카페에서 일해요.',
      'Xodim kafeda ishlaydi.',
      'The employee works in the cafe.',
      'Сотрудник работает в кафе.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "employee".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'employee'],
  },

  en_s1u10_n5_018_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'bag',
      'paper',
      'a',
      'in',
      'pastry',
      'The',
      'is',
      'machine',
      'ice',
    ],
    answer: 'The pastry is in a paper bag',
    audioText: 'The pastry is in a paper bag.',
    answerTranslation: L(
      '페이스트리가 종이봉투 안에 있어요.',
      'Pishiriq qog‘oz paketda.',
      'The pastry is in a paper bag.',
      'Выпечка находится в бумажном пакете.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['pastry', 'bag'],
  },

  en_s1u10_n5_019_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What can you see in the cafe?',
    options: [
      'I',
      'can',
      'see',
      'a',
      'coffee',
      'machine',
      'and',
      'cakes',
      'pool',
      'bill',
    ],
    answer: 'I can see a coffee machine and cakes',
    answerTranslation: L(
      '커피 기계와 케이크가 보여요.',
      'Men qahva mashinasi va tortlarni ko‘ryapman.',
      'I can see a coffee machine and cakes.',
      'Я вижу кофемашину и пирожные.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['video', 'reply'],
  },

  en_s1u10_n5_020_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What is the special snack?' }],
    options: [
      'It is a kind of pastry.',
      'It is a coffee machine.',
      'It is a paper bag.',
      'It is an employee.',
    ],
    answer: 'It is a kind of pastry.',
    answerTranslation: L(
      '페이스트리의 한 종류예요.',
      'Bu pishiriqning bir turi.',
      'It is a kind of pastry.',
      'Это вид выпечки.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['pastry', 'dialog'],
  },

  // ===========================================================
  // Lesson 2 · Describe a cafe
  // ===========================================================

  en_s1u10_n5_021_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The cafe is popular with local people.',
    audioText: 'The cafe is popular with local people.',
    answerTranslation: L(
      '그 카페는 현지 사람들에게 인기가 있어요.',
      'Kafe mahalliy odamlar orasida mashhur.',
      'The cafe is popular with local people.',
      'Кафе популярно среди местных жителей.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['cafe-description', 'popular'],
  },

  en_s1u10_n5_022_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'pastry',
    choices: [
      { text: 'salad', label: '🥗', emoji: '🥗', imageUrl: '' },
      { text: 'pastry', label: '🥐', emoji: '🥐', imageUrl: '' },
      { text: 'juice', label: '🧃', emoji: '🧃', imageUrl: '' },
      { text: 'bill', label: '🧾', emoji: '🧾', imageUrl: '' },
    ],
    answerTranslation: L('페이스트리', 'pishiriq', 'pastry', 'выпечка'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['pastry'],
  },

  en_s1u10_n5_023_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'busy',
        native: 'gavjum',
        nativeI18n: L('붐비는', 'gavjum', 'busy', 'оживлённый'),
      },
      {
        text: 'typical',
        native: 'odatiy',
        nativeI18n: L('전형적인', 'odatiy', 'typical', 'типичный'),
      },
      {
        text: 'popular',
        native: 'mashhur',
        nativeI18n: L('인기 있는', 'mashhur', 'popular', 'популярный'),
      },
      {
        text: 'local',
        native: 'mahalliy aholi vakili',
        nativeI18n: L(
          '현지인',
          'mahalliy aholi vakili',
          'local',
          'местный житель',
        ),
      },
      {
        text: 'break',
        native: 'tanaffus',
        nativeI18n: L('휴식', 'tanaffus', 'break', 'перерыв'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['cafe-description', 'matching'],
  },

  en_s1u10_n5_024_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['time', 'does', 'open', 'What', 'the', 'cafe', 'is', 'where'],
    answer: 'What time does the cafe open',
    answerTranslation: L(
      '그 카페는 몇 시에 문을 열어요?',
      'Kafe soat nechada ochiladi?',
      'What time does the cafe open?',
      'Во сколько открывается кафе?',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['cafe-description', 'opening-time'],
  },

  en_s1u10_n5_025_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'buy',
      'people',
      'there',
      'What',
      'do',
      'cafe',
      'where',
      'special',
    ],
    answer: 'What do people buy there',
    audioText: 'What do people buy there?',
    answerTranslation: L(
      '사람들은 거기서 무엇을 사요?',
      'Odamlar u yerda nima sotib olishadi?',
      'What do people buy there?',
      'Что люди там покупают?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['cafe-description', 'question'],
  },

  en_s1u10_n5_026_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'busy',
        native: 'gavjum',
        nativeI18n: L('붐비는', 'gavjum', 'busy', 'оживлённый'),
      },
      {
        text: 'typical',
        native: 'odatiy',
        nativeI18n: L('전형적인', 'odatiy', 'typical', 'типичный'),
      },
      {
        text: 'popular',
        native: 'mashhur',
        nativeI18n: L('인기 있는', 'mashhur', 'popular', 'популярный'),
      },
      {
        text: 'local',
        native: 'mahalliy aholi vakili',
        nativeI18n: L(
          '현지인',
          'mahalliy aholi vakili',
          'local',
          'местный житель',
        ),
      },
      {
        text: 'break',
        native: 'tanaffus',
        nativeI18n: L('휴식', 'tanaffus', 'break', 'перерыв'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['cafe-description', 'listening'],
  },

  en_s1u10_n5_027_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'The cafe is very ',
    sentenceSuffix: ' after lunch.',
    answer: 'busy',
    answerTranslation: L(
      '점심 후에는 카페가 아주 붐벼요.',
      'Tushlikdan keyin kafe juda gavjum.',
      'The cafe is very busy after lunch.',
      'После обеда в кафе очень многолюдно.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "busy".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'busy'],
  },

  en_s1u10_n5_028_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'shelf',
    choices: [
      { text: 'machine', label: '⚙️', emoji: '⚙️', imageUrl: '' },
      { text: 'bag', label: '🛍️', emoji: '🛍️', imageUrl: '' },
      { text: 'shelf', label: '🗄️', emoji: '🗄️', imageUrl: '' },
      { text: 'ice', label: '🧊', emoji: '🧊', imageUrl: '' },
    ],
    answerTranslation: L('선반', 'tokcha', 'shelf', 'полка'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['shelf'],
  },

  en_s1u10_n5_029_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Is there a special food or drink there?',
    audioText: 'Is there a special food or drink there?',
    answerI18n: L(
      '거기에 특별한 음식이나 음료가 있나요',
      'U yerda maxsus taom yoki ichimlik bormi',
      'Is there a special food or drink there',
      'Есть ли там особая еда или напиток',
    ),
    options: [
      'special',
      'there',
      'drink',
      'Is',
      'a',
      'or',
      'there',
      'food',
      'any',
    ],
    optionsI18n: {
      ko: ['거기에', '특별한', '음식이나', '음료가', '있나요'],
      uz: ['U', 'yerda', 'maxsus', 'taom', 'yoki', 'ichimlik', 'bormi'],
      en: ['Is', 'there', 'a', 'special', 'food', 'or', 'drink', 'there'],
      ru: ['Есть', 'ли', 'там', 'особая', 'еда', 'или', 'напиток'],
    },
    answerTranslation: L(
      '거기에 특별한 음식이나 음료가 있나요?',
      'U yerda maxsus taom yoki ichimlik bormi?',
      'Is there a special food or drink there?',
      'Есть ли там особая еда или напиток?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['cafe-description', 'question'],
  },

  en_s1u10_n5_030_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What time does the cafe open?',
    options: [
      'It',
      'opens',
      'at',
      'seven',
      'in',
      'the',
      'morning',
      'closes',
      'busy',
    ],
    answer: 'It opens at seven in the morning',
    answerTranslation: L(
      '아침 7시에 문을 열어요.',
      'U ertalab soat yettida ochiladi.',
      'It opens at seven in the morning.',
      'Оно открывается в семь утра.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['opening-time', 'reply'],
  },

  en_s1u10_n5_031_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'The cafe is ',
    sentenceSuffix: ' with local people.',
    answer: 'popular',
    answerTranslation: L(
      '그 카페는 현지 사람들에게 인기가 있어요.',
      'Kafe mahalliy odamlar orasida mashhur.',
      'The cafe is popular with local people.',
      'Кафе популярно среди местных жителей.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "popular".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'popular'],
  },

  en_s1u10_n5_032_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'owner',
        native: 'egasi',
        nativeI18n: L('주인', 'egasi', 'owner', 'владелец'),
      },
      {
        text: 'employee',
        native: 'xodim',
        nativeI18n: L('직원', 'xodim', 'employee', 'сотрудник'),
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
        text: 'local',
        native: 'mahalliy aholi vakili',
        nativeI18n: L(
          '현지인',
          'mahalliy aholi vakili',
          'local',
          'местный житель',
        ),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['people', 'matching'],
  },

  en_s1u10_n5_033_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'popular',
      'people',
      'cafe',
      'with',
      'The',
      'is',
      'local',
      'busy',
      'pastry',
    ],
    answer: 'The cafe is popular with local people',
    answerTranslation: L(
      '그 카페는 현지 사람들에게 인기가 있어요.',
      'Kafe mahalliy odamlar orasida mashhur.',
      'The cafe is popular with local people.',
      'Кафе популярно среди местных жителей.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['popular', 'local'],
  },

  en_s1u10_n5_034_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'owner',
        native: 'egasi',
        nativeI18n: L('주인', 'egasi', 'owner', 'владелец'),
      },
      {
        text: 'employee',
        native: 'xodim',
        nativeI18n: L('직원', 'xodim', 'employee', 'сотрудник'),
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
        text: 'local',
        native: 'mahalliy aholi vakili',
        nativeI18n: L(
          '현지인',
          'mahalliy aholi vakili',
          'local',
          'местный житель',
        ),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['people', 'listening'],
  },

  en_s1u10_n5_035_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'ice',
    choices: [
      { text: 'water', label: '💧', emoji: '💧', imageUrl: '' },
      { text: 'milk', label: '🥛', emoji: '🥛', imageUrl: '' },
      { text: 'ice', label: '🧊', emoji: '🧊', imageUrl: '' },
      { text: 'juice', label: '🧃', emoji: '🧃', imageUrl: '' },
    ],
    answerTranslation: L('얼음', 'muz', 'ice', 'лёд'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['ice'],
  },

  en_s1u10_n5_036_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'It is a ___ kind of pastry.',
    blankAnswers: ['typical'],
    options: ['typical', 'local', 'break', 'machine'],
    answer: 'typical',
    answerTranslation: L(
      '그것은 전형적인 종류의 페이스트리예요.',
      'Bu odatiy pishiriq turi.',
      'It is a typical kind of pastry.',
      'Это типичный вид выпечки.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typical', 'pastry'],
  },

  en_s1u10_n5_037_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'They have a short ',
    sentenceSuffix: '.',
    answer: 'break',
    answerTranslation: L(
      '그들은 짧게 쉬어요.',
      'Ular qisqa tanaffus qilishadi.',
      'They have a short break.',
      'У них короткий перерыв.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "break".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'break'],
  },

  en_s1u10_n5_038_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['cafe', 'Where', 'the', 'is', 'open', 'what', 'time'],
    answer: 'Where is the cafe',
    audioText: 'Where is the cafe?',
    answerTranslation: L(
      '그 카페는 어디에 있어요?',
      'Kafe qayerda?',
      'Where is the cafe?',
      'Где находится кафе?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['cafe-description', 'where'],
  },

  en_s1u10_n5_039_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Is there a special food there?',
    options: [
      'Yes',
      'there',
      'is',
      'a',
      'special',
      'pastry',
      'machine',
      'shelf',
    ],
    answer: 'Yes there is a special pastry',
    answerTranslation: L(
      '네, 특별한 페이스트리가 있어요.',
      'Ha, maxsus pishiriq bor.',
      'Yes, there is a special pastry.',
      'Да, там есть особая выпечка.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['pastry', 'reply'],
  },

  en_s1u10_n5_040_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Would you like to visit this cafe?' },
    ],
    options: [
      'Yes, I’d like to try the pastries.',
      'Yes, the machine is a local.',
      'I visited tomorrow.',
      'No, I would cafe.',
    ],
    answer: 'Yes, I’d like to try the pastries.',
    answerTranslation: L(
      '네, 페이스트리를 먹어 보고 싶어요.',
      'Ha, pishiriqlarni tatib ko‘rishni xohlayman.',
      'Yes, I’d like to try the pastries.',
      'Да, я хотел бы попробовать выпечку.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['cafe-description', 'dialog'],
  },

  // ===========================================================
  // Lesson 3 · Unit 10 grammar review
  // ===========================================================

  en_s1u10_n5_041_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I am going to visit my friends next weekend.',
    audioText: 'I am going to visit my friends next weekend.',
    answerTranslation: L(
      '저는 다음 주말에 친구들을 방문할 거예요.',
      'Men kelasi dam olish kunlari do‘stlarimni ko‘rmoqchiman.',
      'I am going to visit my friends next weekend.',
      'Я собираюсь навестить друзей в следующие выходные.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit10-review', 'going-to'],
  },

  en_s1u10_n5_042_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'burger',
    choices: [
      { text: 'croissant', label: '🥐', emoji: '🥐', imageUrl: '' },
      { text: 'burger', label: '🍔', emoji: '🍔', imageUrl: '' },
      { text: 'salad', label: '🥗', emoji: '🥗', imageUrl: '' },
      { text: 'cake', label: '🍰', emoji: '🍰', imageUrl: '' },
    ],
    answerTranslation: L('버거', 'burger', 'burger', 'бургер'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit10-review', 'burger'],
  },

  en_s1u10_n5_043_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'project',
        native: 'loyiha',
        nativeI18n: L('프로젝트', 'loyiha', 'project', 'проект'),
      },
      {
        text: 'volunteer',
        native: 'ko‘ngilli',
        nativeI18n: L('자원봉사자', 'ko‘ngilli', 'volunteer', 'волонтёр'),
      },
      {
        text: 'abroad',
        native: 'chet elga',
        nativeI18n: L('해외로', 'chet elga', 'abroad', 'за границу'),
      },
      {
        text: 'invitation',
        native: 'taklifnoma',
        nativeI18n: L('초대장', 'taklifnoma', 'invitation', 'приглашение'),
      },
      {
        text: 'bill',
        native: 'hisob',
        nativeI18n: L('계산서', 'hisob', 'bill', 'счёт'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit10-review', 'matching'],
  },

  en_s1u10_n5_044_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'English',
      'study',
      'going',
      'Next',
      'I',
      'to',
      'year',
      'am',
      'studied',
    ],
    answer: 'Next year I am going to study English',
    answerTranslation: L(
      '내년에 저는 영어를 공부할 거예요.',
      'Kelasi yili men ingliz tilini o‘rganmoqchiman.',
      'Next year I am going to study English.',
      'В следующем году я собираюсь изучать английский.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit10-review', 'going-to'],
  },

  en_s1u10_n5_045_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'match',
      'Kate',
      'football',
      'going',
      'the',
      'is',
      'not',
      'to',
      'go',
      'went',
    ],
    answer: 'Kate is not going to go to the football match',
    audioText: 'Kate is not going to go to the football match.',
    answerTranslation: L(
      '케이트는 축구 경기에 가지 않을 거예요.',
      'Kate futbol o‘yiniga bormoqchi emas.',
      'Kate is not going to go to the football match.',
      'Кейт не собирается идти на футбольный матч.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['unit10-review', 'negative'],
  },

  en_s1u10_n5_046_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'project',
        native: 'loyiha',
        nativeI18n: L('프로젝트', 'loyiha', 'project', 'проект'),
      },
      {
        text: 'volunteer',
        native: 'ko‘ngilli',
        nativeI18n: L('자원봉사자', 'ko‘ngilli', 'volunteer', 'волонтёр'),
      },
      {
        text: 'abroad',
        native: 'chet elga',
        nativeI18n: L('해외로', 'chet elga', 'abroad', 'за границу'),
      },
      {
        text: 'invitation',
        native: 'taklifnoma',
        nativeI18n: L('초대장', 'taklifnoma', 'invitation', 'приглашение'),
      },
      {
        text: 'bill',
        native: 'hisob',
        nativeI18n: L('계산서', 'hisob', 'bill', 'счёт'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['unit10-review', 'listening'],
  },

  en_s1u10_n5_047_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Next year I am going ',
    sentenceSuffix: ' study English.',
    answer: 'to',
    answerTranslation: L(
      '내년에 저는 영어를 공부할 거예요.',
      'Kelasi yili men ingliz tilini o‘rganmoqchiman.',
      'Next year I am going to study English.',
      'В следующем году я собираюсь изучать английский.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Use "to" in the structure "going to + verb".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'going-to'],
  },

  en_s1u10_n5_048_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'bill',
    choices: [
      { text: 'menu', label: '📋', emoji: '📋', imageUrl: '' },
      { text: 'invitation', label: '💌', emoji: '💌', imageUrl: '' },
      { text: 'bill', label: '🧾', emoji: '🧾', imageUrl: '' },
      { text: 'bag', label: '🛍️', emoji: '🛍️', imageUrl: '' },
    ],
    answerTranslation: L('계산서', 'hisob', 'bill', 'счёт'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit10-review', 'bill'],
  },

  en_s1u10_n5_049_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Would you like anything else?',
    audioText: 'Would you like anything else?',
    answerI18n: L(
      '더 필요한 것이 있으세요',
      'Yana biror narsa xohlaysizmi',
      'Would you like anything else',
      'Хотите что-нибудь ещё',
    ),
    options: ['anything', 'you', 'else', 'Would', 'like', 'bill', 'order'],
    optionsI18n: {
      ko: ['더', '필요한', '것이', '있으세요'],
      uz: ['Yana', 'biror', 'narsa', 'xohlaysizmi'],
      en: ['Would', 'you', 'like', 'anything', 'else'],
      ru: ['Хотите', 'что-нибудь', 'ещё'],
    },
    answerTranslation: L(
      '더 필요한 것이 있으세요?',
      'Yana biror narsa xohlaysizmi?',
      'Would you like anything else?',
      'Хотите что-нибудь ещё?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['unit10-review', 'would-like'],
  },

  en_s1u10_n5_050_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Would you like a coffee?',
    options: ['Yes', 'please', 'with', 'milk', 'No', 'bill', 'going'],
    answer: 'Yes please with milk',
    answerTranslation: L(
      '네, 주세요. 우유도 넣어 주세요.',
      'Ha, iltimos. Sut bilan.',
      'Yes, please. With milk.',
      'Да, пожалуйста. С молоком.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['unit10-review', 'reply'],
  },

  en_s1u10_n5_051_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'The new cafe opens ',
    sentenceSuffix: ' July.',
    answer: 'in',
    answerTranslation: L(
      '새 카페는 7월에 문을 열어요.',
      'Yangi kafe iyulda ochiladi.',
      'The new cafe opens in July.',
      'Новое кафе открывается в июле.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Use "in" with months.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'in', 'time-preposition'],
  },

  en_s1u10_n5_052_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'coffee',
        native: 'qahva',
        nativeI18n: L('커피', 'qahva', 'coffee', 'кофе'),
      },
      {
        text: 'croissant',
        native: 'kruassan',
        nativeI18n: L('크루아상', 'kruassan', 'croissant', 'круассан'),
      },
      {
        text: 'salad',
        native: 'salat',
        nativeI18n: L('샐러드', 'salat', 'salad', 'салат'),
      },
      {
        text: 'juice',
        native: 'sharbat',
        nativeI18n: L('주스', 'sharbat', 'juice', 'сок'),
      },
      {
        text: 'biscuit',
        native: 'pechenye',
        nativeI18n: L('비스킷', 'pechenye', 'biscuit', 'печенье'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit10-review', 'matching'],
  },

  en_s1u10_n5_053_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['drink', 'like', 'What', 'you', 'to', 'would', 'coffee', 'do'],
    answer: 'What would you like to drink',
    answerTranslation: L(
      '무엇을 마시고 싶으세요?',
      'Nima ichishni xohlaysiz?',
      'What would you like to drink?',
      'Что бы вы хотели выпить?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit10-review', 'would-like'],
  },

  en_s1u10_n5_054_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'coffee',
        native: 'qahva',
        nativeI18n: L('커피', 'qahva', 'coffee', 'кофе'),
      },
      {
        text: 'croissant',
        native: 'kruassan',
        nativeI18n: L('크루아상', 'kruassan', 'croissant', 'круассан'),
      },
      {
        text: 'salad',
        native: 'salat',
        nativeI18n: L('샐러드', 'salat', 'salad', 'салат'),
      },
      {
        text: 'juice',
        native: 'sharbat',
        nativeI18n: L('주스', 'sharbat', 'juice', 'сок'),
      },
      {
        text: 'biscuit',
        native: 'pechenye',
        nativeI18n: L('비스킷', 'pechenye', 'biscuit', 'печенье'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['unit10-review', 'listening'],
  },

  en_s1u10_n5_055_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'croissant',
    choices: [
      { text: 'doughnut', label: '🍩', emoji: '🍩', imageUrl: '' },
      { text: 'sandwich', label: '🥪', emoji: '🥪', imageUrl: '' },
      { text: 'croissant', label: '🥐', emoji: '🥐', imageUrl: '' },
      { text: 'salad', label: '🥗', emoji: '🥗', imageUrl: '' },
    ],
    answerTranslation: L('크루아상', 'kruassan', 'croissant', 'круассан'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit10-review', 'croissant'],
  },

  en_s1u10_n5_056_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'His birthday is ___ 20th September.',
    blankAnswers: ['on'],
    options: ['on', 'in', 'at', 'to'],
    answer: 'on',
    answerTranslation: L(
      '그의 생일은 9월 20일이에요.',
      'Uning tug‘ilgan kuni 20-sentabrda.',
      'His birthday is on 20th September.',
      'Его день рождения двадцатого сентября.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit10-review', 'on'],
  },

  en_s1u10_n5_057_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'The flight is ',
    sentenceSuffix: ' twelve fifteen.',
    answer: 'at',
    answerTranslation: L(
      '항공편은 12시 15분이에요.',
      'Parvoz soat o‘n ikki o‘n beshda.',
      'The flight is at twelve fifteen.',
      'Рейс в двенадцать пятнадцать.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Use "at" with a clock time.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'at', 'time-preposition'],
  },

  en_s1u10_n5_058_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['anything', 'you', 'Would', 'else', 'like', 'bill', 'coffee'],
    answer: 'Would you like anything else',
    audioText: 'Would you like anything else?',
    answerTranslation: L(
      '더 필요한 것이 있으세요?',
      'Yana biror narsa xohlaysizmi?',
      'Would you like anything else?',
      'Хотите что-нибудь ещё?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['unit10-review', 'would-like'],
  },

  en_s1u10_n5_059_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Can I have a croissant, please?',
    options: ['Here', 'you', 'are', 'Yes', 'bill', 'going', 'coffee'],
    answer: 'Here you are',
    answerTranslation: L(
      '여기 있습니다.',
      'Mana, marhamat.',
      'Here you are.',
      'Вот, пожалуйста.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['unit10-review', 'functional-language'],
  },

  en_s1u10_n5_060_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Would you like to see the menu?' }],
    options: [
      'Yes, please.',
      'A large coffee, please.',
      'It was stormy.',
      'I am going abroad.',
    ],
    answer: 'Yes, please.',
    answerTranslation: L(
      '네, 보여 주세요.',
      'Ha, iltimos.',
      'Yes, please.',
      'Да, пожалуйста.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['unit10-review', 'dialog'],
  },

  // ===========================================================
  // Lesson 4 · Units 9–10 final review
  // ===========================================================

  en_s1u10_n5_061_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I saw a good film on TV last night.',
    audioText: 'I saw a good film on TV last night.',
    answerTranslation: L(
      '저는 어젯밤 TV에서 좋은 영화를 봤어요.',
      'Men kecha kechqurun televizorda yaxshi film ko‘rdim.',
      'I saw a good film on TV last night.',
      'Вчера вечером я посмотрел хороший фильм по телевизору.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['units9-10-review', 'past-simple'],
  },

  en_s1u10_n5_062_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'invitation',
    choices: [
      { text: 'bill', label: '🧾', emoji: '🧾', imageUrl: '' },
      { text: 'invitation', label: '💌', emoji: '💌', imageUrl: '' },
      { text: 'bag', label: '🛍️', emoji: '🛍️', imageUrl: '' },
      { text: 'menu', label: '📋', emoji: '📋', imageUrl: '' },
    ],
    answerTranslation: L('초대장', 'taklifnoma', 'invitation', 'приглашение'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['units9-10-review', 'invitation'],
  },

  en_s1u10_n5_063_word_matching: {
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
        text: 'abroad',
        native: 'chet elga',
        nativeI18n: L('해외로', 'chet elga', 'abroad', 'за границу'),
      },
      {
        text: 'weather',
        native: 'ob-havo',
        nativeI18n: L('날씨', 'ob-havo', 'weather', 'погода'),
      },
      {
        text: 'bill',
        native: 'hisob',
        nativeI18n: L('계산서', 'hisob', 'bill', 'счёт'),
      },
      {
        text: 'pastry',
        native: 'pishiriq',
        nativeI18n: L('페이스트리', 'pishiriq', 'pastry', 'выпечка'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['units9-10-review', 'matching'],
  },

  en_s1u10_n5_064_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['film', 'night', 'saw', 'I', 'a', 'last', 'good', 'see', 'TV'],
    answer: 'I saw a good film last night',
    answerTranslation: L(
      '저는 어젯밤 좋은 영화를 봤어요.',
      'Men kecha kechqurun yaxshi film ko‘rdim.',
      'I saw a good film last night.',
      'Вчера вечером я посмотрел хороший фильм.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['past-simple', 'saw'],
  },

  en_s1u10_n5_065_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['Vietnam', 'partner', 'met', 'Josh', 'his', 'in', 'meet', 'ago'],
    answer: 'Josh met his partner in Vietnam',
    audioText: 'Josh met his partner in Vietnam.',
    answerTranslation: L(
      '조시는 베트남에서 파트너를 만났어요.',
      'Josh o‘z juftini Vetnamda uchratgan.',
      'Josh met his partner in Vietnam.',
      'Джош встретил своего партнёра во Вьетнаме.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['past-simple', 'met'],
  },

  en_s1u10_n5_066_audio_match: {
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
        text: 'abroad',
        native: 'chet elga',
        nativeI18n: L('해외로', 'chet elga', 'abroad', 'за границу'),
      },
      {
        text: 'weather',
        native: 'ob-havo',
        nativeI18n: L('날씨', 'ob-havo', 'weather', 'погода'),
      },
      {
        text: 'bill',
        native: 'hisob',
        nativeI18n: L('계산서', 'hisob', 'bill', 'счёт'),
      },
      {
        text: 'pastry',
        native: 'pishiriq',
        nativeI18n: L('페이스트리', 'pishiriq', 'pastry', 'выпечка'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['units9-10-review', 'listening'],
  },

  en_s1u10_n5_067_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I ',
    sentenceSuffix: ' a good film on TV last night.',
    answer: 'saw',
    answerTranslation: L(
      '저는 어젯밤 TV에서 좋은 영화를 봤어요.',
      'Men kecha kechqurun televizorda yaxshi film ko‘rdim.',
      'I saw a good film on TV last night.',
      'Вчера вечером я посмотрел хороший фильм по телевизору.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The past form of "see" is "saw".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'past-simple', 'saw'],
  },

  en_s1u10_n5_068_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'weather',
    choices: [
      { text: 'bill', label: '🧾', emoji: '🧾', imageUrl: '' },
      { text: 'party', label: '🎉', emoji: '🎉', imageUrl: '' },
      { text: 'weather', label: '🌦️', emoji: '🌦️', imageUrl: '' },
      { text: 'pastry', label: '🥐', emoji: '🥐', imageUrl: '' },
    ],
    answerTranslation: L('날씨', 'ob-havo', 'weather', 'погода'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['units9-10-review', 'weather'],
  },

  en_s1u10_n5_069_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'We are going to move abroad next year.',
    audioText: 'We are going to move abroad next year.',
    answerI18n: L(
      '우리는 내년에 해외로 이사할 거예요',
      'Biz kelasi yili chet elga ko‘chib ketmoqchimiz',
      'We are going to move abroad next year',
      'Мы собираемся переехать за границу в следующем году',
    ),
    options: [
      'next',
      'move',
      'going',
      'We',
      'year',
      'abroad',
      'are',
      'to',
      'moved',
    ],
    optionsI18n: {
      ko: ['우리는', '내년에', '해외로', '이사할', '거예요'],
      uz: ['Biz', 'kelasi', 'yili', 'chet', 'elga', 'ko‘chib', 'ketmoqchimiz'],
      en: ['We', 'are', 'going', 'to', 'move', 'abroad', 'next', 'year'],
      ru: [
        'Мы',
        'собираемся',
        'переехать',
        'за',
        'границу',
        'в',
        'следующем',
        'году',
      ],
    },
    answerTranslation: L(
      '우리는 내년에 해외로 이사할 거예요.',
      'Biz kelasi yili chet elga ko‘chib ketmoqchimiz.',
      'We are going to move abroad next year.',
      'Мы собираемся переехать за границу в следующем году.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['going-to', 'abroad'],
  },

  en_s1u10_n5_070_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What’s the weather like?',
    options: ['It', 'is', 'very', 'stormy', 'was', 'bill', 'abroad'],
    answer: 'It is very stormy',
    answerTranslation: L(
      '날씨가 아주 폭풍우가 쳐요.',
      'Havo juda bo‘ronli.',
      'It is very stormy.',
      'Очень штормовая погода.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['weather', 'reply'],
  },

  en_s1u10_n5_071_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Josh ',
    sentenceSuffix: ' his partner in Vietnam.',
    answer: 'met',
    answerTranslation: L(
      '조시는 베트남에서 파트너를 만났어요.',
      'Josh o‘z juftini Vetnamda uchratgan.',
      'Josh met his partner in Vietnam.',
      'Джош встретил своего партнёра во Вьетнаме.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The past form of "meet" is "met".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'past-simple', 'met'],
  },

  en_s1u10_n5_072_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'job',
        native: 'ish',
        nativeI18n: L('직업', 'ish', 'job', 'работа'),
      },
      {
        text: 'train',
        native: 'poyezd',
        nativeI18n: L('기차', 'poyezd', 'train', 'поезд'),
      },
      {
        text: 'doctor',
        native: 'shifokor',
        nativeI18n: L('의사', 'shifokor', 'doctor', 'врач'),
      },
      {
        text: 'headache',
        native: 'bosh og‘rig‘i',
        nativeI18n: L('두통', 'bosh og‘rig‘i', 'headache', 'головная боль'),
      },
      {
        text: 'abroad',
        native: 'chet elga',
        nativeI18n: L('해외로', 'chet elga', 'abroad', 'за границу'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['verb-phrases', 'matching'],
  },

  en_s1u10_n5_073_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'jobs',
      'going',
      'They',
      'change',
      'to',
      'are',
      'abroad',
      'changed',
    ],
    answer: 'They are going to change jobs',
    answerTranslation: L(
      '그들은 직업을 바꿀 거예요.',
      'Ular ishini o‘zgartirmoqchi.',
      'They are going to change jobs.',
      'Они собираются сменить работу.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['going-to', 'change-jobs'],
  },

  en_s1u10_n5_074_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'job',
        native: 'ish',
        nativeI18n: L('직업', 'ish', 'job', 'работа'),
      },
      {
        text: 'train',
        native: 'poyezd',
        nativeI18n: L('기차', 'poyezd', 'train', 'поезд'),
      },
      {
        text: 'doctor',
        native: 'shifokor',
        nativeI18n: L('의사', 'shifokor', 'doctor', 'врач'),
      },
      {
        text: 'headache',
        native: 'bosh og‘rig‘i',
        nativeI18n: L('두통', 'bosh og‘rig‘i', 'headache', 'головная боль'),
      },
      {
        text: 'abroad',
        native: 'chet elga',
        nativeI18n: L('해외로', 'chet elga', 'abroad', 'за границу'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['verb-phrases', 'listening'],
  },

  en_s1u10_n5_075_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'pastry',
    choices: [
      { text: 'cake', label: '🍰', emoji: '🍰', imageUrl: '' },
      { text: 'croissant', label: '🥐', emoji: '🥐', imageUrl: '' },
      { text: 'pastry', label: '🥮', emoji: '🥮', imageUrl: '' },
      { text: 'salad', label: '🥗', emoji: '🥗', imageUrl: '' },
    ],
    answerTranslation: L('페이스트리', 'pishiriq', 'pastry', 'выпечка'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['units9-10-review', 'pastry'],
  },

  en_s1u10_n5_076_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Rosie felt sick, but she did not ___ to the doctor.',
    blankAnswers: ['go'],
    options: ['go', 'went', 'going', 'goes'],
    answer: 'go',
    answerTranslation: L(
      '로지는 몸이 아팠지만 병원에 가지 않았어요.',
      'Rosie o‘zini yomon his qildi, lekin shifokorga bormadi.',
      'Rosie felt sick, but she did not go to the doctor.',
      'Рози плохо себя чувствовала, но не пошла к врачу.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['past-negative', 'base-verb'],
  },

  en_s1u10_n5_077_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Millie ',
    sentenceSuffix: ' to Amsterdam last weekend.',
    answer: 'went',
    answerTranslation: L(
      '밀리는 지난 주말 암스테르담에 갔어요.',
      'Millie o‘tgan dam olish kunlari Amsterdamga bordi.',
      'Millie went to Amsterdam last weekend.',
      'Милли ездила в Амстердам в прошлые выходные.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The past form of "go" is "went".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'past-simple', 'went'],
  },

  en_s1u10_n5_078_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['anything', 'Would', 'like', 'you', 'else', 'bill', 'weather'],
    answer: 'Would you like anything else',
    audioText: 'Would you like anything else?',
    answerTranslation: L(
      '더 필요한 것이 있으세요?',
      'Yana biror narsa xohlaysizmi?',
      'Would you like anything else?',
      'Хотите что-нибудь ещё?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['would-like', 'functional-language'],
  },

  en_s1u10_n5_079_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Can I have a croissant, please?',
    options: ['Here', 'you', 'are', 'No', 'weather', 'bill', 'abroad'],
    answer: 'Here you are',
    answerTranslation: L(
      '여기 있습니다.',
      'Mana, marhamat.',
      'Here you are.',
      'Вот, пожалуйста.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['functional-language', 'reply'],
  },

  en_s1u10_n5_080_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'What was the weather like last weekend?' },
    ],
    options: [
      'It was hot and sunny.',
      'It is going to a cafe.',
      'I would like the weather.',
      'Here you are.',
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
    tags: ['units9-10-review', 'weather', 'final'],
  },
};

export const EN_S1_UNIT10_NODE5 = {
  title: L(
    '뉴욕의 카페',
    'Nyu-Yorkdagi kafe',
    'A New York cafe',
    'Кафе в Нью-Йорке',
  ),
  section: 1,
  unit: 10,
  order: 5,
  isActive: true,

  lessons: [
    {
      title: L(
        '뉴욕 카페의 어휘',
        'Nyu-York kafesi so‘zlari',
        'A New York cafe',
        'Кафе в Нью-Йорке',
      ),
      description: L(
        '카페 주인과 직원, 커피 기계, 얼음, 종이봉투, 페이스트리와 선반처럼 영상에 나오는 핵심 어휘를 익혀요.',
        'Kafe egasi, xodim, qahva mashinasi, muz, paket, pishiriq va tokcha kabi videodagi asosiy so‘zlarni o‘rganasiz.',
        'Learn key video vocabulary such as owner, employee, machine, ice, bag, pastry and shelf.',
        'Изучаем ключевые слова из видео: owner, employee, machine, ice, bag, pastry и shelf.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 1,
      questions: [
        'en_s1u10_n5_001_speaking',
        'en_s1u10_n5_002_image_choice',
        'en_s1u10_n5_003_word_matching',
        'en_s1u10_n5_004_translate_builder',
        'en_s1u10_n5_005_word_arrange',
        'en_s1u10_n5_006_audio_match',
        'en_s1u10_n5_007_type_answer',
        'en_s1u10_n5_008_image_choice',
        'en_s1u10_n5_009_sentence_builder',
        'en_s1u10_n5_010_reply_builder',
        'en_s1u10_n5_011_type_answer',
        'en_s1u10_n5_012_word_matching',
        'en_s1u10_n5_013_translate_builder',
        'en_s1u10_n5_014_audio_match',
        'en_s1u10_n5_015_image_choice',
        'en_s1u10_n5_016_fill_in_blank',
        'en_s1u10_n5_017_type_answer',
        'en_s1u10_n5_018_word_arrange',
        'en_s1u10_n5_019_reply_builder',
        'en_s1u10_n5_020_dialog_complete',
      ],
    },

    {
      title: L(
        '카페 설명하기',
        'Kafeni tasvirlash',
        'Describe a cafe',
        'Описываем кафе',
      ),
      description: L(
        '카페의 이름, 위치, 영업시간, 사람들이 사는 음식과 특별 메뉴를 질문하고 설명해요.',
        'Kafening nomi, joylashuvi, ochilish vaqti, odamlar nima sotib olishi va maxsus taomlari haqida gapirasiz.',
        'Ask and answer questions about a cafe’s name, location, opening time, customers and special food or drink.',
        'Спрашиваем и рассказываем о названии кафе, местоположении, времени открытия и особой еде или напитках.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 2,
      questions: [
        'en_s1u10_n5_021_speaking',
        'en_s1u10_n5_022_image_choice',
        'en_s1u10_n5_023_word_matching',
        'en_s1u10_n5_024_translate_builder',
        'en_s1u10_n5_025_word_arrange',
        'en_s1u10_n5_026_audio_match',
        'en_s1u10_n5_027_type_answer',
        'en_s1u10_n5_028_image_choice',
        'en_s1u10_n5_029_sentence_builder',
        'en_s1u10_n5_030_reply_builder',
        'en_s1u10_n5_031_type_answer',
        'en_s1u10_n5_032_word_matching',
        'en_s1u10_n5_033_translate_builder',
        'en_s1u10_n5_034_audio_match',
        'en_s1u10_n5_035_image_choice',
        'en_s1u10_n5_036_fill_in_blank',
        'en_s1u10_n5_037_type_answer',
        'en_s1u10_n5_038_word_arrange',
        'en_s1u10_n5_039_reply_builder',
        'en_s1u10_n5_040_dialog_complete',
      ],
    },

    {
      title: L(
        '유닛 10 문법 복습',
        '10-unit grammatika takrorlash',
        'Unit 10 grammar review',
        'Повторение грамматики раздела 10',
      ),
      description: L(
        'going to, 미래 시간 표현, in/on/at과 would like를 음식 주문과 미래 계획 문장으로 복습해요.',
        'Going to, kelajak vaqt iboralari, in/on/at va would like tuzilmalarini takrorlaysiz.',
        'Review going to, future time expressions, in/on/at and would like.',
        'Повторяем going to, выражения будущего времени, in/on/at и would like.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 3,
      questions: [
        'en_s1u10_n5_041_speaking',
        'en_s1u10_n5_042_image_choice',
        'en_s1u10_n5_043_word_matching',
        'en_s1u10_n5_044_translate_builder',
        'en_s1u10_n5_045_word_arrange',
        'en_s1u10_n5_046_audio_match',
        'en_s1u10_n5_047_type_answer',
        'en_s1u10_n5_048_image_choice',
        'en_s1u10_n5_049_sentence_builder',
        'en_s1u10_n5_050_reply_builder',
        'en_s1u10_n5_051_type_answer',
        'en_s1u10_n5_052_word_matching',
        'en_s1u10_n5_053_translate_builder',
        'en_s1u10_n5_054_audio_match',
        'en_s1u10_n5_055_image_choice',
        'en_s1u10_n5_056_fill_in_blank',
        'en_s1u10_n5_057_type_answer',
        'en_s1u10_n5_058_word_arrange',
        'en_s1u10_n5_059_reply_builder',
        'en_s1u10_n5_060_dialog_complete',
      ],
    },

    {
      title: L(
        '유닛 9–10 최종 복습',
        '9–10-unit yakuniy takrorlash',
        'Units 9–10 final review',
        'Итоговое повторение разделов 9–10',
      ),
      description: L(
        '과거형, 미래 계획, 날씨, 생활 변화와 음식 주문 표현을 함께 사용해 섹션 후반 내용을 종합 복습해요.',
        'O‘tgan zamon, kelajak rejalari, ob-havo, hayotdagi o‘zgarishlar va ovqat buyurtma qilish iboralarini birga takrorlaysiz.',
        'Review past simple, future plans, weather, life changes and restaurant language from Units 9 and 10.',
        'Повторяем Past Simple, будущие планы, погоду, жизненные изменения и речь в кафе из разделов 9 и 10.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 4,
      questions: [
        'en_s1u10_n5_061_speaking',
        'en_s1u10_n5_062_image_choice',
        'en_s1u10_n5_063_word_matching',
        'en_s1u10_n5_064_translate_builder',
        'en_s1u10_n5_065_word_arrange',
        'en_s1u10_n5_066_audio_match',
        'en_s1u10_n5_067_type_answer',
        'en_s1u10_n5_068_image_choice',
        'en_s1u10_n5_069_sentence_builder',
        'en_s1u10_n5_070_reply_builder',
        'en_s1u10_n5_071_type_answer',
        'en_s1u10_n5_072_word_matching',
        'en_s1u10_n5_073_translate_builder',
        'en_s1u10_n5_074_audio_match',
        'en_s1u10_n5_075_image_choice',
        'en_s1u10_n5_076_fill_in_blank',
        'en_s1u10_n5_077_type_answer',
        'en_s1u10_n5_078_word_arrange',
        'en_s1u10_n5_079_reply_builder',
        'en_s1u10_n5_080_dialog_complete',
      ],
    },
  ],
};
