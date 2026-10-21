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
