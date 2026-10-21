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

const TYPE_INSTRUCTION = L(
  '빈칸에 들어갈 영어 단어를 직접 입력하세요.',
  'Bo‘sh joyga mos inglizcha so‘zni yozing.',
  'Type the missing English word.',
  'Введите пропущенное английское слово.',
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

const REPLY_INSTRUCTION = L(
  '상대의 말을 듣고 알맞은 대답을 만드세요.',
  'Suhbatdoshning gapini tinglab, mos javob tuzing.',
  'Listen and build the correct reply.',
  'Послушайте собеседника и составьте подходящий ответ.',
);

const DIALOG_INSTRUCTION = L(
  '대화에 가장 알맞은 대답을 고르세요.',
  'Dialog uchun eng mos javobni tanlang.',
  'Choose the best response.',
  'Выберите наиболее подходящий ответ.',
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
  '영어 단어와 맞는 그림을 고르세요.',
  'Inglizcha so‘zga mos rasmni tanlang.',
  'Choose the picture that matches the English word.',
  'Выберите картинку, соответствующую английскому слову.',
);

// ─────────────────────────────────────────────────────────────
// Section 1 · Unit 7 · Node 1
// 7.1 She can paint
//
// Coverage
// - drive / paint / play / remember
// - ride / speak / understand / use
// - cook / fly / run / sing / swim / write
// - can + base verb
// - can't + base verb
// - talking about abilities
// - contrasting abilities with but
//
// IMPORTANT:
// *_WORDS에는 단어만 등록.
// 문장 / 숙어 / 구 단위 표현 등록 금지.
//
// 4 lessons × 20 questions = 80
// type_answer: 3 per lesson
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT7_NODE1_WORDS = [
  {
    code: 'en-verb-drive',
    english: 'drive',
    senseKey: 'operate-motor-vehicle',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '운전하다',
      'haydamoq',
      'to control and operate a car or other vehicle',
      'водить',
    ),
    examples: [
      {
        english: 'I can drive a car.',
        translations: L(
          '저는 자동차를 운전할 수 있어요.',
          'Men mashina hayday olaman.',
          'I can drive a car.',
          'Я умею водить машину.',
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
        '자동차 운전',
        'mashina haydash',
        'driving a car',
        'вождение автомобиля',
      ),
    },
    tags: ['skills', 'verbs'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-paint',
    english: 'paint',
    senseKey: 'make-picture-with-paint',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '그림을 그리다; 칠하다',
      'rasm chizmoq; bo‘yamoq',
      'to make a picture using paint',
      'рисовать красками',
    ),
    examples: [
      {
        english: 'She can paint a picture.',
        translations: L(
          '그녀는 그림을 그릴 수 있어요.',
          'U rasm chiza oladi.',
          'She can paint a picture.',
          'Она умеет рисовать картину.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/peɪnt/',
      ttsText: 'paint',
    },
    media: {
      emoji: '🎨',
      imageUrl: '',
      imageAlt: L(
        '그림 그리기',
        'rasm chizish',
        'painting a picture',
        'рисование картины',
      ),
    },
    tags: ['skills', 'art', 'verbs'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-play',
    english: 'play',
    senseKey: 'perform-music-or-sport',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '연주하다; 경기를 하다',
      'chalmoq; o‘ynamoq',
      'to perform music or take part in a sport or game',
      'играть',
    ),
    examples: [
      {
        english: 'She can play the piano.',
        translations: L(
          '그녀는 피아노를 칠 수 있어요.',
          'U pianino chala oladi.',
          'She can play the piano.',
          'Она умеет играть на пианино.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/pleɪ/',
      ttsText: 'play',
    },
    media: {
      emoji: '🎹',
      imageUrl: '',
      imageAlt: L(
        '피아노 연주',
        'pianino chalish',
        'playing the piano',
        'игра на пианино',
      ),
    },
    tags: ['skills', 'verbs'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-remember',
    english: 'remember',
    senseKey: 'keep-or-bring-to-mind',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '기억하다',
      'eslamoq',
      'to keep or bring information back into your mind',
      'помнить',
    ),
    examples: [
      {
        english: 'She can remember faces.',
        translations: L(
          '그녀는 얼굴을 기억할 수 있어요.',
          'U yuzlarni eslay oladi.',
          'She can remember faces.',
          'Она умеет запоминать лица.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/rɪˈmembə/',
      ttsText: 'remember',
    },
    media: {
      emoji: '🧠',
      imageUrl: '',
      imageAlt: L('기억하기', 'eslash', 'remembering something', 'запоминание'),
    },
    tags: ['skills', 'verbs'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-ride',
    english: 'ride',
    senseKey: 'travel-on-bike-or-motorbike',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '타다',
      'minmoq',
      'to travel on and control a bicycle, motorbike or similar vehicle',
      'ездить; кататься',
    ),
    examples: [
      {
        english: 'I can ride a bike.',
        translations: L(
          '저는 자전거를 탈 수 있어요.',
          'Men velosiped mina olaman.',
          'I can ride a bike.',
          'Я умею ездить на велосипеде.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/raɪd/',
      ttsText: 'ride',
    },
    media: {
      emoji: '🚲',
      imageUrl: '',
      imageAlt: L(
        '자전거 타기',
        'velosiped minish',
        'riding a bike',
        'езда на велосипеде',
      ),
    },
    tags: ['skills', 'verbs'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-speak',
    english: 'speak',
    senseKey: 'use-spoken-language',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '말하다',
      'gapirmoq',
      'to use your voice to communicate in a language',
      'говорить',
    ),
    examples: [
      {
        english: 'He can speak Japanese.',
        translations: L(
          '그는 일본어를 할 수 있어요.',
          'U yapon tilida gapira oladi.',
          'He can speak Japanese.',
          'Он умеет говорить по-японски.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/spiːk/',
      ttsText: 'speak',
    },
    media: {
      emoji: '🗣️',
      imageUrl: '',
      imageAlt: L('말하기', 'gapirish', 'speaking', 'разговор'),
    },
    tags: ['skills', 'language', 'verbs'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-understand',
    english: 'understand',
    senseKey: 'know-meaning-of-information',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '이해하다',
      'tushunmoq',
      'to know the meaning of something',
      'понимать',
    ),
    examples: [
      {
        english: 'She can understand instructions.',
        translations: L(
          '그녀는 지시를 이해할 수 있어요.',
          'U ko‘rsatmalarni tushuna oladi.',
          'She can understand instructions.',
          'Она умеет понимать инструкции.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌʌndəˈstænd/',
      ttsText: 'understand',
    },
    media: {
      emoji: '💡',
      imageUrl: '',
      imageAlt: L('이해하기', 'tushunish', 'understanding', 'понимание'),
    },
    tags: ['skills', 'verbs'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-use',
    english: 'use',
    senseKey: 'do-something-with-tool',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '사용하다',
      'ishlatmoq',
      'to do something with a tool or object',
      'использовать',
    ),
    examples: [
      {
        english: 'She can use a paintbrush.',
        translations: L(
          '그녀는 붓을 사용할 수 있어요.',
          'U mo‘yqalam ishlata oladi.',
          'She can use a paintbrush.',
          'Она умеет пользоваться кистью.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/juːz/',
      ttsText: 'use',
    },
    media: {
      emoji: '🛠️',
      imageUrl: '',
      imageAlt: L(
        '도구 사용',
        'asbob ishlatish',
        'using a tool',
        'использование инструмента',
      ),
    },
    tags: ['skills', 'verbs'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-cook',
    english: 'cook',
    senseKey: 'prepare-food-with-heat',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '요리하다',
      'ovqat pishirmoq',
      'to prepare food using heat',
      'готовить',
    ),
    examples: [
      {
        english: 'I can cook.',
        translations: L(
          '저는 요리할 수 있어요.',
          'Men ovqat pishira olaman.',
          'I can cook.',
          'Я умею готовить.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/kʊk/',
      ttsText: 'cook',
    },
    media: {
      emoji: '👨‍🍳',
      imageUrl: '',
      imageAlt: L(
        '요리하기',
        'ovqat pishirish',
        'cooking',
        'приготовление еды',
      ),
    },
    tags: ['abilities', 'verbs'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-fly',
    english: 'fly',
    senseKey: 'move-through-air',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L('날다', 'uchmoq', 'to move through the air', 'летать'),
    examples: [
      {
        english: 'Most birds can fly.',
        translations: L(
          '대부분의 새는 날 수 있어요.',
          'Ko‘pchilik qushlar ucha oladi.',
          'Most birds can fly.',
          'Большинство птиц умеют летать.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/flaɪ/',
      ttsText: 'fly',
    },
    media: {
      emoji: '🕊️',
      imageUrl: '',
      imageAlt: L(
        '날아가는 새',
        'uchayotgan qush',
        'a flying bird',
        'летящая птица',
      ),
    },
    tags: ['abilities', 'verbs'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-run',
    english: 'run',
    senseKey: 'move-quickly-on-foot',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L('달리다', 'yugurmoq', 'to move quickly on foot', 'бегать'),
    examples: [
      {
        english: 'He can run very fast.',
        translations: L(
          '그는 아주 빨리 달릴 수 있어요.',
          'U juda tez yugura oladi.',
          'He can run very fast.',
          'Он умеет очень быстро бегать.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/rʌn/',
      ttsText: 'run',
    },
    media: {
      emoji: '🏃',
      imageUrl: '',
      imageAlt: L('달리기', 'yugurish', 'running', 'бег'),
    },
    tags: ['abilities', 'verbs'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-sing',
    english: 'sing',
    senseKey: 'make-music-with-voice',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '노래하다',
      'qo‘shiq aytmoq',
      'to make music with your voice',
      'петь',
    ),
    examples: [
      {
        english: 'She can sing.',
        translations: L(
          '그녀는 노래할 수 있어요.',
          'U qo‘shiq ayta oladi.',
          'She can sing.',
          'Она умеет петь.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/sɪŋ/',
      ttsText: 'sing',
    },
    media: {
      emoji: '🎤',
      imageUrl: '',
      imageAlt: L('노래하기', 'qo‘shiq aytish', 'singing', 'пение'),
    },
    tags: ['abilities', 'music', 'verbs'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-swim',
    english: 'swim',
    senseKey: 'move-through-water',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '수영하다',
      'suzmoq',
      'to move through water using your body',
      'плавать',
    ),
    examples: [
      {
        english: 'I can swim.',
        translations: L(
          '저는 수영할 수 있어요.',
          'Men suza olaman.',
          'I can swim.',
          'Я умею плавать.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/swɪm/',
      ttsText: 'swim',
    },
    media: {
      emoji: '🏊',
      imageUrl: '',
      imageAlt: L('수영하기', 'suzish', 'swimming', 'плавание'),
    },
    tags: ['abilities', 'verbs'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-write',
    english: 'write',
    senseKey: 'make-words-or-text',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L('쓰다', 'yozmoq', 'to make letters, words or text', 'писать'),
    examples: [
      {
        english: 'I can write in English.',
        translations: L(
          '저는 영어로 쓸 수 있어요.',
          'Men ingliz tilida yoza olaman.',
          'I can write in English.',
          'Я умею писать по-английски.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/raɪt/',
      ttsText: 'write',
    },
    media: {
      emoji: '✍️',
      imageUrl: '',
      imageAlt: L('글쓰기', 'yozish', 'writing', 'письмо'),
    },
    tags: ['abilities', 'language', 'verbs'],
    difficulty: 1,
    isCore: true,
  },
];

export const EN_S1_UNIT7_NODE1_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Skills
  // ===========================================================

  en_s1u7_n1_001_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I can ride a bike.',
    audioText: 'I can ride a bike.',
    answerTranslation: L(
      '저는 자전거를 탈 수 있어요.',
      'Men velosiped mina olaman.',
      'I can ride a bike.',
      'Я умею ездить на велосипеде.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['skills', 'ride'],
  },

  en_s1u7_n1_002_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'drive',
    choices: [
      { text: 'ride', label: '🚲', emoji: '🚲', imageUrl: '' },
      { text: 'drive', label: '🚗', emoji: '🚗', imageUrl: '' },
      { text: 'paint', label: '🎨', emoji: '🎨', imageUrl: '' },
      { text: 'speak', label: '🗣️', emoji: '🗣️', imageUrl: '' },
    ],
    answerTranslation: L('운전하다', 'haydamoq', 'drive', 'водить'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['skills', 'drive'],
  },

  en_s1u7_n1_003_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'drive',
        native: 'haydamoq',
        nativeI18n: L('운전하다', 'haydamoq', 'drive', 'водить'),
      },
      {
        text: 'paint',
        native: 'rasm chizmoq',
        nativeI18n: L('그림을 그리다', 'rasm chizmoq', 'paint', 'рисовать'),
      },
      {
        text: 'ride',
        native: 'minmoq',
        nativeI18n: L('타다', 'minmoq', 'ride', 'ездить'),
      },
      {
        text: 'speak',
        native: 'gapirmoq',
        nativeI18n: L('말하다', 'gapirmoq', 'speak', 'говорить'),
      },
      {
        text: 'remember',
        native: 'eslamoq',
        nativeI18n: L('기억하다', 'eslamoq', 'remember', 'помнить'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['skills', 'matching'],
  },

  en_s1u7_n1_004_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['a', 'can', 'I', 'drive', 'car', 'ride', 'paint', 'can’t'],
    answer: 'I can drive a car',
    answerTranslation: L(
      '저는 자동차를 운전할 수 있어요.',
      'Men mashina hayday olaman.',
      'I can drive a car.',
      'Я умею водить машину.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['can', 'drive'],
  },

  en_s1u7_n1_005_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['a', 'bike', 'can', 'ride', 'She', 'drive', 'can’t', 'car'],
    answer: 'She can ride a bike',
    audioText: 'She can ride a bike.',
    answerTranslation: L(
      '그녀는 자전거를 탈 수 있어요.',
      'U velosiped mina oladi.',
      'She can ride a bike.',
      'Она умеет ездить на велосипеде.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['can', 'ride'],
  },

  en_s1u7_n1_006_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'drive',
        native: 'haydamoq',
        nativeI18n: L('운전하다', 'haydamoq', 'drive', 'водить'),
      },
      {
        text: 'paint',
        native: 'rasm chizmoq',
        nativeI18n: L('그림을 그리다', 'rasm chizmoq', 'paint', 'рисовать'),
      },
      {
        text: 'ride',
        native: 'minmoq',
        nativeI18n: L('타다', 'minmoq', 'ride', 'ездить'),
      },
      {
        text: 'speak',
        native: 'gapirmoq',
        nativeI18n: L('말하다', 'gapirmoq', 'speak', 'говорить'),
      },
      {
        text: 'remember',
        native: 'eslamoq',
        nativeI18n: L('기억하다', 'eslamoq', 'remember', 'помнить'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['skills', 'listening'],
  },

  en_s1u7_n1_007_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I can ',
    sentenceSuffix: ' a car.',
    answer: 'drive',
    answerTranslation: L(
      '저는 자동차를 운전할 수 있어요.',
      'Men mashina hayday olaman.',
      'I can drive a car.',
      'Я умею водить машину.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "drive".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'drive'],
  },

  en_s1u7_n1_008_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'paint',
    choices: [
      { text: 'play', label: '🎹', emoji: '🎹', imageUrl: '' },
      { text: 'use', label: '🛠️', emoji: '🛠️', imageUrl: '' },
      { text: 'paint', label: '🎨', emoji: '🎨', imageUrl: '' },
      { text: 'ride', label: '🚲', emoji: '🚲', imageUrl: '' },
    ],
    answerTranslation: L('그림을 그리다', 'rasm chizmoq', 'paint', 'рисовать'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['paint'],
  },

  en_s1u7_n1_009_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'She can paint a picture.',
    audioText: 'She can paint a picture.',
    answerI18n: L(
      '그녀는 그림을 그릴 수 있어요',
      'U rasm chiza oladi',
      'She can paint a picture',
      'Она умеет рисовать картину',
    ),
    options: ['picture', 'paint', 'a', 'She', 'can', 'drive', 'bike'],
    optionsI18n: {
      ko: ['그녀는', '그림을', '그릴', '수', '있어요', '운전해요'],
      uz: ['U', 'rasm', 'chiza', 'oladi', 'haydaydi'],
      en: ['She', 'can', 'paint', 'a', 'picture', 'drive'],
      ru: ['Она', 'умеет', 'рисовать', 'картину', 'водить'],
    },
    answerTranslation: L(
      '그녀는 그림을 그릴 수 있어요.',
      'U rasm chiza oladi.',
      'She can paint a picture.',
      'Она умеет рисовать картину.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['can', 'paint'],
  },

  en_s1u7_n1_010_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Can you ride a bike?',
    options: ['can', 'Yes', 'I', 'ride', 'a', 'bike', 'can’t', 'drive'],
    answer: 'Yes I can ride a bike',
    answerTranslation: L(
      '네, 자전거를 탈 수 있어요.',
      'Ha, men velosiped mina olaman.',
      'Yes, I can ride a bike.',
      'Да, я умею ездить на велосипеде.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['can', 'ride', 'reply'],
  },

  en_s1u7_n1_011_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'She can ',
    sentenceSuffix: ' a picture.',
    answer: 'paint',
    answerTranslation: L(
      '그녀는 그림을 그릴 수 있어요.',
      'U rasm chiza oladi.',
      'She can paint a picture.',
      'Она умеет рисовать картину.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "paint".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'paint'],
  },

  en_s1u7_n1_012_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'play',
        native: 'o‘ynamoq',
        nativeI18n: L('연주하다; 경기하다', 'o‘ynamoq', 'play', 'играть'),
      },
      {
        text: 'understand',
        native: 'tushunmoq',
        nativeI18n: L('이해하다', 'tushunmoq', 'understand', 'понимать'),
      },
      {
        text: 'use',
        native: 'ishlatmoq',
        nativeI18n: L('사용하다', 'ishlatmoq', 'use', 'использовать'),
      },
      {
        text: 'speak',
        native: 'gapirmoq',
        nativeI18n: L('말하다', 'gapirmoq', 'speak', 'говорить'),
      },
      {
        text: 'remember',
        native: 'eslamoq',
        nativeI18n: L('기억하다', 'eslamoq', 'remember', 'помнить'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['skills', 'matching'],
  },

  en_s1u7_n1_013_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'Japanese',
      'can',
      'He',
      'speak',
      'understand',
      'ride',
      'English',
    ],
    answer: 'He can speak Japanese',
    answerTranslation: L(
      '그는 일본어를 할 수 있어요.',
      'U yapon tilida gapira oladi.',
      'He can speak Japanese.',
      'Он умеет говорить по-японски.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['can', 'speak'],
  },

  en_s1u7_n1_014_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'play',
        native: 'o‘ynamoq',
        nativeI18n: L('연주하다; 경기하다', 'o‘ynamoq', 'play', 'играть'),
      },
      {
        text: 'understand',
        native: 'tushunmoq',
        nativeI18n: L('이해하다', 'tushunmoq', 'understand', 'понимать'),
      },
      {
        text: 'use',
        native: 'ishlatmoq',
        nativeI18n: L('사용하다', 'ishlatmoq', 'use', 'использовать'),
      },
      {
        text: 'speak',
        native: 'gapirmoq',
        nativeI18n: L('말하다', 'gapirmoq', 'speak', 'говорить'),
      },
      {
        text: 'remember',
        native: 'eslamoq',
        nativeI18n: L('기억하다', 'eslamoq', 'remember', 'помнить'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['skills', 'listening'],
  },

  en_s1u7_n1_015_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'speak',
    choices: [
      { text: 'remember', label: '🧠', emoji: '🧠', imageUrl: '' },
      { text: 'paint', label: '🎨', emoji: '🎨', imageUrl: '' },
      { text: 'speak', label: '🗣️', emoji: '🗣️', imageUrl: '' },
      { text: 'drive', label: '🚗', emoji: '🚗', imageUrl: '' },
    ],
    answerTranslation: L('말하다', 'gapirmoq', 'speak', 'говорить'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['speak'],
  },

  en_s1u7_n1_016_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She can ___ the piano.',
    blankAnswers: ['play'],
    options: ['play', 'ride', 'drive', 'remember'],
    answer: 'play',
    answerTranslation: L(
      '그녀는 피아노를 칠 수 있어요.',
      'U pianino chala oladi.',
      'She can play the piano.',
      'Она умеет играть на пианино.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['play'],
  },

  en_s1u7_n1_017_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'He can ',
    sentenceSuffix: ' Japanese.',
    answer: 'speak',
    answerTranslation: L(
      '그는 일본어를 할 수 있어요.',
      'U yapon tilida gapira oladi.',
      'He can speak Japanese.',
      'Он умеет говорить по-японски.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "speak".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'speak'],
  },

  en_s1u7_n1_018_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'instructions',
      'understand',
      'can',
      'She',
      'speak',
      'use',
      'faces',
    ],
    answer: 'She can understand instructions',
    audioText: 'She can understand instructions.',
    answerTranslation: L(
      '그녀는 지시를 이해할 수 있어요.',
      'U ko‘rsatmalarni tushuna oladi.',
      'She can understand instructions.',
      'Она умеет понимать инструкции.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['understand', 'can'],
  },

  en_s1u7_n1_019_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Can you play the piano?',
    options: ['No', 'I', 'can’t', 'play', 'the', 'piano', 'can', 'ride'],
    answer: 'No I can’t play the piano',
    answerTranslation: L(
      '아니요, 피아노를 칠 수 없어요.',
      'Yo‘q, men pianino chala olmayman.',
      'No, I can’t play the piano.',
      'Нет, я не умею играть на пианино.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['can-not', 'play', 'reply'],
  },

  en_s1u7_n1_020_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Can you drive a car?' }],
    options: [
      'No, I can’t.',
      'No, I don’t drive can.',
      'Yes, I am drive.',
      'I can car.',
    ],
    answer: 'No, I can’t.',
    answerTranslation: L(
      '아니요, 못 해요.',
      'Yo‘q, qila olmayman.',
      'No, I can’t.',
      'Нет, не умею.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['can-not', 'drive', 'dialog'],
  },

  // ===========================================================
  // Lesson 2 · Can and can't
  // ===========================================================

  en_s1u7_n1_021_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She can understand instructions.',
    audioText: 'She can understand instructions.',
    answerTranslation: L(
      '그녀는 지시를 이해할 수 있어요.',
      'U ko‘rsatmalarni tushuna oladi.',
      'She can understand instructions.',
      'Она умеет понимать инструкции.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['can', 'understand'],
  },

  en_s1u7_n1_022_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'remember',
    choices: [
      { text: 'use', label: '🛠️', emoji: '🛠️', imageUrl: '' },
      { text: 'remember', label: '🧠', emoji: '🧠', imageUrl: '' },
      { text: 'ride', label: '🚲', emoji: '🚲', imageUrl: '' },
      { text: 'paint', label: '🎨', emoji: '🎨', imageUrl: '' },
    ],
    answerTranslation: L('기억하다', 'eslamoq', 'remember', 'помнить'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['remember'],
  },

  en_s1u7_n1_023_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'remember',
        native: 'eslamoq',
        nativeI18n: L('기억하다', 'eslamoq', 'remember', 'помнить'),
      },
      {
        text: 'understand',
        native: 'tushunmoq',
        nativeI18n: L('이해하다', 'tushunmoq', 'understand', 'понимать'),
      },
      {
        text: 'use',
        native: 'ishlatmoq',
        nativeI18n: L('사용하다', 'ishlatmoq', 'use', 'использовать'),
      },
      {
        text: 'paint',
        native: 'rasm chizmoq',
        nativeI18n: L('그림을 그리다', 'rasm chizmoq', 'paint', 'рисовать'),
      },
      {
        text: 'play',
        native: 'o‘ynamoq',
        nativeI18n: L('연주하다; 경기하다', 'o‘ynamoq', 'play', 'играть'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['skills', 'matching'],
  },

  en_s1u7_n1_024_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['faces', 'remember', 'can', 'She', 'can’t', 'paint', 'names'],
    answer: 'She can remember faces',
    answerTranslation: L(
      '그녀는 얼굴을 기억할 수 있어요.',
      'U yuzlarni eslay oladi.',
      'She can remember faces.',
      'Она умеет запоминать лица.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['can', 'remember'],
  },

  en_s1u7_n1_025_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['speak', 'can’t', 'She', 'paint', 'English', 'drive'],
    answer: 'She can’t speak',
    audioText: 'She can’t speak.',
    answerTranslation: L(
      '그녀는 말할 수 없어요.',
      'U gapira olmaydi.',
      'She can’t speak.',
      'Она не умеет говорить.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['can-not', 'speak'],
  },

  en_s1u7_n1_026_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'remember',
        native: 'eslamoq',
        nativeI18n: L('기억하다', 'eslamoq', 'remember', 'помнить'),
      },
      {
        text: 'understand',
        native: 'tushunmoq',
        nativeI18n: L('이해하다', 'tushunmoq', 'understand', 'понимать'),
      },
      {
        text: 'use',
        native: 'ishlatmoq',
        nativeI18n: L('사용하다', 'ishlatmoq', 'use', 'использовать'),
      },
      {
        text: 'paint',
        native: 'rasm chizmoq',
        nativeI18n: L('그림을 그리다', 'rasm chizmoq', 'paint', 'рисовать'),
      },
      {
        text: 'play',
        native: 'o‘ynamoq',
        nativeI18n: L('연주하다; 경기하다', 'o‘ynamoq', 'play', 'играть'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['skills', 'listening'],
  },

  en_s1u7_n1_027_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'She can ',
    sentenceSuffix: ' faces.',
    answer: 'remember',
    answerTranslation: L(
      '그녀는 얼굴을 기억할 수 있어요.',
      'U yuzlarni eslay oladi.',
      'She can remember faces.',
      'Она умеет запоминать лица.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "remember".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'remember'],
  },

  en_s1u7_n1_028_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'use',
    choices: [
      { text: 'paint', label: '🎨', emoji: '🎨', imageUrl: '' },
      { text: 'drive', label: '🚗', emoji: '🚗', imageUrl: '' },
      { text: 'use', label: '🛠️', emoji: '🛠️', imageUrl: '' },
      { text: 'ride', label: '🚲', emoji: '🚲', imageUrl: '' },
    ],
    answerTranslation: L('사용하다', 'ishlatmoq', 'use', 'использовать'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['use'],
  },

  en_s1u7_n1_029_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'She can use a paintbrush.',
    audioText: 'She can use a paintbrush.',
    answerI18n: L(
      '그녀는 붓을 사용할 수 있어요',
      'U mo‘yqalam ishlata oladi',
      'She can use a paintbrush',
      'Она умеет пользоваться кистью',
    ),
    options: ['paintbrush', 'a', 'use', 'She', 'can', 'drive', 'piano'],
    optionsI18n: {
      ko: ['그녀는', '붓을', '사용할', '수', '있어요', '피아노를'],
      uz: ['U', 'mo‘yqalam', 'ishlata', 'oladi', 'pianino'],
      en: ['She', 'can', 'use', 'a', 'paintbrush', 'piano'],
      ru: ['Она', 'умеет', 'пользоваться', 'кистью', 'пианино'],
    },
    answerTranslation: L(
      '그녀는 붓을 사용할 수 있어요.',
      'U mo‘yqalam ishlata oladi.',
      'She can use a paintbrush.',
      'Она умеет пользоваться кистью.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['can', 'use'],
  },

  en_s1u7_n1_030_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Can she speak?',
    options: ['No', 'she', 'can’t', 'speak', 'can', 'ride', 'Yes'],
    answer: 'No she can’t speak',
    answerTranslation: L(
      '아니요, 그녀는 말할 수 없어요.',
      'Yo‘q, u gapira olmaydi.',
      'No, she can’t speak.',
      'Нет, она не умеет говорить.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['can-not', 'speak', 'reply'],
  },

  en_s1u7_n1_031_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'She can ',
    sentenceSuffix: ' instructions.',
    answer: 'understand',
    answerTranslation: L(
      '그녀는 지시를 이해할 수 있어요.',
      'U ko‘rsatmalarni tushuna oladi.',
      'She can understand instructions.',
      'Она умеет понимать инструкции.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "understand".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'understand'],
  },

  en_s1u7_n1_032_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'drive',
        native: 'haydamoq',
        nativeI18n: L('운전하다', 'haydamoq', 'drive', 'водить'),
      },
      {
        text: 'ride',
        native: 'minmoq',
        nativeI18n: L('타다', 'minmoq', 'ride', 'ездить'),
      },
      {
        text: 'speak',
        native: 'gapirmoq',
        nativeI18n: L('말하다', 'gapirmoq', 'speak', 'говорить'),
      },
      {
        text: 'paint',
        native: 'rasm chizmoq',
        nativeI18n: L('그림을 그리다', 'rasm chizmoq', 'paint', 'рисовать'),
      },
      {
        text: 'play',
        native: 'o‘ynamoq',
        nativeI18n: L('연주하다; 경기하다', 'o‘ynamoq', 'play', 'играть'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['skills', 'matching'],
  },

  en_s1u7_n1_033_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'drive',
      'can',
      'but',
      'He',
      'can’t',
      'ride',
      'a',
      'motorbike',
      'car',
    ],
    answer: 'He can drive but he can’t ride a motorbike',
    answerTranslation: L(
      '그는 운전은 할 수 있지만 오토바이는 탈 수 없어요.',
      'U mashina hayday oladi, lekin mototsikl mina olmaydi.',
      'He can drive, but he can’t ride a motorbike.',
      'Он умеет водить машину, но не умеет ездить на мотоцикле.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['can', 'can-not', 'but'],
  },

  en_s1u7_n1_034_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'drive',
        native: 'haydamoq',
        nativeI18n: L('운전하다', 'haydamoq', 'drive', 'водить'),
      },
      {
        text: 'ride',
        native: 'minmoq',
        nativeI18n: L('타다', 'minmoq', 'ride', 'ездить'),
      },
      {
        text: 'speak',
        native: 'gapirmoq',
        nativeI18n: L('말하다', 'gapirmoq', 'speak', 'говорить'),
      },
      {
        text: 'paint',
        native: 'rasm chizmoq',
        nativeI18n: L('그림을 그리다', 'rasm chizmoq', 'paint', 'рисовать'),
      },
      {
        text: 'play',
        native: 'o‘ynamoq',
        nativeI18n: L('연주하다; 경기하다', 'o‘ynamoq', 'play', 'играть'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['skills', 'listening'],
  },

  en_s1u7_n1_035_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'ride',
    choices: [
      { text: 'drive', label: '🚗', emoji: '🚗', imageUrl: '' },
      { text: 'paint', label: '🎨', emoji: '🎨', imageUrl: '' },
      { text: 'ride', label: '🚲', emoji: '🚲', imageUrl: '' },
      { text: 'speak', label: '🗣️', emoji: '🗣️', imageUrl: '' },
    ],
    answerTranslation: L('타다', 'minmoq', 'ride', 'ездить'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['ride'],
  },

  en_s1u7_n1_036_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She ___ understand instructions.',
    blankAnswers: ['can'],
    options: ['can', 'does', 'is', 'has'],
    answer: 'can',
    answerTranslation: L(
      '그녀는 지시를 이해할 수 있어요.',
      'U ko‘rsatmalarni tushuna oladi.',
      'She can understand instructions.',
      'Она умеет понимать инструкции.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['can', 'grammar'],
  },

  en_s1u7_n1_037_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'She can ',
    sentenceSuffix: ' a paintbrush.',
    answer: 'use',
    answerTranslation: L(
      '그녀는 붓을 사용할 수 있어요.',
      'U mo‘yqalam ishlata oladi.',
      'She can use a paintbrush.',
      'Она умеет пользоваться кистью.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "use".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'use'],
  },

  en_s1u7_n1_038_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['can', 'the', 'piano', 'play', 'She', 'can’t', 'drive'],
    answer: 'She can play the piano',
    audioText: 'She can play the piano.',
    answerTranslation: L(
      '그녀는 피아노를 칠 수 있어요.',
      'U pianino chala oladi.',
      'She can play the piano.',
      'Она умеет играть на пианино.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['can', 'play'],
  },

  en_s1u7_n1_039_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Can you remember names?',
    options: ['Yes', 'I', 'can', 'remember', 'names', 'can’t', 'faces'],
    answer: 'Yes I can remember names',
    answerTranslation: L(
      '네, 이름을 기억할 수 있어요.',
      'Ha, men ismlarni eslay olaman.',
      'Yes, I can remember names.',
      'Да, я умею запоминать имена.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['remember', 'reply'],
  },

  en_s1u7_n1_040_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Can she use a paintbrush?' }],
    options: [
      'Yes, she can.',
      'Yes, she does can.',
      'She use can.',
      'Yes, she is.',
    ],
    answer: 'Yes, she can.',
    answerTranslation: L(
      '네, 할 수 있어요.',
      'Ha, qila oladi.',
      'Yes, she can.',
      'Да, умеет.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['can', 'short-answer', 'dialog'],
  },

  // ===========================================================
  // Lesson 3 · More abilities
  // ===========================================================

  en_s1u7_n1_041_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I can swim.',
    audioText: 'I can swim.',
    answerTranslation: L(
      '저는 수영할 수 있어요.',
      'Men suza olaman.',
      'I can swim.',
      'Я умею плавать.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['abilities', 'swim'],
  },

  en_s1u7_n1_042_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'swim',
    choices: [
      { text: 'run', label: '🏃', emoji: '🏃', imageUrl: '' },
      { text: 'sing', label: '🎤', emoji: '🎤', imageUrl: '' },
      { text: 'swim', label: '🏊', emoji: '🏊', imageUrl: '' },
      { text: 'cook', label: '👨‍🍳', emoji: '👨‍🍳', imageUrl: '' },
    ],
    answerTranslation: L('수영하다', 'suzmoq', 'swim', 'плавать'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['swim'],
  },

  en_s1u7_n1_043_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'cook',
        native: 'ovqat pishirmoq',
        nativeI18n: L('요리하다', 'ovqat pishirmoq', 'cook', 'готовить'),
      },
      {
        text: 'run',
        native: 'yugurmoq',
        nativeI18n: L('달리다', 'yugurmoq', 'run', 'бегать'),
      },
      {
        text: 'sing',
        native: 'qo‘shiq aytmoq',
        nativeI18n: L('노래하다', 'qo‘shiq aytmoq', 'sing', 'петь'),
      },
      {
        text: 'swim',
        native: 'suzmoq',
        nativeI18n: L('수영하다', 'suzmoq', 'swim', 'плавать'),
      },
      {
        text: 'write',
        native: 'yozmoq',
        nativeI18n: L('쓰다', 'yozmoq', 'write', 'писать'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['abilities', 'matching'],
  },

  en_s1u7_n1_044_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['cook', 'can', 'I', 'but', 'swim', 'can’t', 'sing'],
    answer: 'I can cook but I can’t swim',
    answerTranslation: L(
      '저는 요리는 할 수 있지만 수영은 못 해요.',
      'Men ovqat pishira olaman, lekin suza olmayman.',
      'I can cook, but I can’t swim.',
      'Я умею готовить, но не умею плавать.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['can', 'can-not', 'abilities'],
  },

  en_s1u7_n1_045_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['very', 'can', 'fast', 'run', 'He', 'swim', 'can’t'],
    answer: 'He can run very fast',
    audioText: 'He can run very fast.',
    answerTranslation: L(
      '그는 아주 빨리 달릴 수 있어요.',
      'U juda tez yugura oladi.',
      'He can run very fast.',
      'Он умеет очень быстро бегать.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['run', 'can'],
  },

  en_s1u7_n1_046_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'cook',
        native: 'ovqat pishirmoq',
        nativeI18n: L('요리하다', 'ovqat pishirmoq', 'cook', 'готовить'),
      },
      {
        text: 'run',
        native: 'yugurmoq',
        nativeI18n: L('달리다', 'yugurmoq', 'run', 'бегать'),
      },
      {
        text: 'sing',
        native: 'qo‘shiq aytmoq',
        nativeI18n: L('노래하다', 'qo‘shiq aytmoq', 'sing', 'петь'),
      },
      {
        text: 'swim',
        native: 'suzmoq',
        nativeI18n: L('수영하다', 'suzmoq', 'swim', 'плавать'),
      },
      {
        text: 'write',
        native: 'yozmoq',
        nativeI18n: L('쓰다', 'yozmoq', 'write', 'писать'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['abilities', 'listening'],
  },

  en_s1u7_n1_047_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I can ',
    sentenceSuffix: ' in the pool.',
    answer: 'swim',
    answerTranslation: L(
      '저는 수영장에서 수영할 수 있어요.',
      'Men hovuzda suza olaman.',
      'I can swim in the pool.',
      'Я умею плавать в бассейне.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "swim".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'swim'],
  },

  en_s1u7_n1_048_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'sing',
    choices: [
      { text: 'write', label: '✍️', emoji: '✍️', imageUrl: '' },
      { text: 'cook', label: '👨‍🍳', emoji: '👨‍🍳', imageUrl: '' },
      { text: 'sing', label: '🎤', emoji: '🎤', imageUrl: '' },
      { text: 'run', label: '🏃', emoji: '🏃', imageUrl: '' },
    ],
    answerTranslation: L('노래하다', 'qo‘shiq aytmoq', 'sing', 'петь'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['sing'],
  },

  en_s1u7_n1_049_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'She can sing and she can write.',
    audioText: 'She can sing and she can write.',
    answerI18n: L(
      '그녀는 노래도 하고 글도 쓸 수 있어요',
      'U qo‘shiq ayta oladi va yoza oladi',
      'She can sing and she can write',
      'Она умеет петь и писать',
    ),
    options: ['write', 'can', 'She', 'sing', 'and', 'she', 'can', 'run'],
    optionsI18n: {
      ko: ['그녀는', '노래도', '하고', '글도', '쓸', '수', '있어요'],
      uz: ['U', 'qo‘shiq', 'ayta', 'oladi', 'va', 'yoza', 'oladi'],
      en: ['She', 'can', 'sing', 'and', 'she', 'can', 'write'],
      ru: ['Она', 'умеет', 'петь', 'и', 'писать'],
    },
    answerTranslation: L(
      '그녀는 노래도 하고 글도 쓸 수 있어요.',
      'U qo‘shiq ayta oladi va yoza oladi.',
      'She can sing and she can write.',
      'Она умеет петь и писать.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['sing', 'write', 'can'],
  },

  en_s1u7_n1_050_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Can you swim?',
    options: ['Yes', 'I', 'can', 'swim', 'very', 'well', 'sing', 'can’t'],
    answer: 'Yes I can swim very well',
    answerTranslation: L(
      '네, 수영을 아주 잘해요.',
      'Ha, men juda yaxshi suza olaman.',
      'Yes, I can swim very well.',
      'Да, я очень хорошо плаваю.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['swim', 'reply'],
  },

  en_s1u7_n1_051_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'She can ',
    sentenceSuffix: ' a song.',
    answer: 'sing',
    answerTranslation: L(
      '그녀는 노래를 부를 수 있어요.',
      'U qo‘shiq ayta oladi.',
      'She can sing a song.',
      'Она умеет петь песню.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "sing".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'sing'],
  },

  en_s1u7_n1_052_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'fly',
        native: 'uchmoq',
        nativeI18n: L('날다', 'uchmoq', 'fly', 'летать'),
      },
      {
        text: 'cook',
        native: 'ovqat pishirmoq',
        nativeI18n: L('요리하다', 'ovqat pishirmoq', 'cook', 'готовить'),
      },
      {
        text: 'sing',
        native: 'qo‘shiq aytmoq',
        nativeI18n: L('노래하다', 'qo‘shiq aytmoq', 'sing', 'петь'),
      },
      {
        text: 'run',
        native: 'yugurmoq',
        nativeI18n: L('달리다', 'yugurmoq', 'run', 'бегать'),
      },
      {
        text: 'swim',
        native: 'suzmoq',
        nativeI18n: L('수영하다', 'suzmoq', 'swim', 'плавать'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['abilities', 'matching'],
  },

  en_s1u7_n1_053_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['can', 'Most', 'birds', 'fly', 'swim', 'can’t', 'run'],
    answer: 'Most birds can fly',
    answerTranslation: L(
      '대부분의 새는 날 수 있어요.',
      'Ko‘pchilik qushlar ucha oladi.',
      'Most birds can fly.',
      'Большинство птиц умеют летать.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['fly', 'can'],
  },

  en_s1u7_n1_054_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'fly',
        native: 'uchmoq',
        nativeI18n: L('날다', 'uchmoq', 'fly', 'летать'),
      },
      {
        text: 'cook',
        native: 'ovqat pishirmoq',
        nativeI18n: L('요리하다', 'ovqat pishirmoq', 'cook', 'готовить'),
      },
      {
        text: 'sing',
        native: 'qo‘shiq aytmoq',
        nativeI18n: L('노래하다', 'qo‘shiq aytmoq', 'sing', 'петь'),
      },
      {
        text: 'run',
        native: 'yugurmoq',
        nativeI18n: L('달리다', 'yugurmoq', 'run', 'бегать'),
      },
      {
        text: 'swim',
        native: 'suzmoq',
        nativeI18n: L('수영하다', 'suzmoq', 'swim', 'плавать'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['abilities', 'listening'],
  },

  en_s1u7_n1_055_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'run',
    choices: [
      { text: 'swim', label: '🏊', emoji: '🏊', imageUrl: '' },
      { text: 'fly', label: '🕊️', emoji: '🕊️', imageUrl: '' },
      { text: 'run', label: '🏃', emoji: '🏃', imageUrl: '' },
      { text: 'cook', label: '👨‍🍳', emoji: '👨‍🍳', imageUrl: '' },
    ],
    answerTranslation: L('달리다', 'yugurmoq', 'run', 'бегать'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['run'],
  },

  en_s1u7_n1_056_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Most birds ___ fly.',
    blankAnswers: ['can'],
    options: ['can', 'are', 'do', 'have'],
    answer: 'can',
    answerTranslation: L(
      '대부분의 새는 날 수 있어요.',
      'Ko‘pchilik qushlar ucha oladi.',
      'Most birds can fly.',
      'Большинство птиц умеют летать.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['can', 'fly'],
  },

  en_s1u7_n1_057_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'He can ',
    sentenceSuffix: ' very fast.',
    answer: 'run',
    answerTranslation: L(
      '그는 아주 빨리 달릴 수 있어요.',
      'U juda tez yugura oladi.',
      'He can run very fast.',
      'Он умеет очень быстро бегать.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "run".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'run'],
  },

  en_s1u7_n1_058_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['can’t', 'Penguins', 'fly', 'but', 'can', 'swim', 'they', 'run'],
    answer: 'Penguins can’t fly but they can swim',
    audioText: 'Penguins can’t fly, but they can swim.',
    answerTranslation: L(
      '펭귄은 날 수 없지만 수영할 수 있어요.',
      'Pingvinlar ucha olmaydi, lekin suza oladi.',
      'Penguins can’t fly, but they can swim.',
      'Пингвины не умеют летать, но умеют плавать.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['fly', 'swim', 'can-not'],
  },

  en_s1u7_n1_059_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Can you cook?',
    options: ['No', 'I', 'can’t', 'cook', 'but', 'I', 'can', 'write', 'swim'],
    answer: 'No I can’t cook but I can write',
    answerTranslation: L(
      '아니요, 요리는 못 하지만 글은 쓸 수 있어요.',
      'Yo‘q, ovqat pishira olmayman, lekin yoza olaman.',
      'No, I can’t cook, but I can write.',
      'Нет, я не умею готовить, но умею писать.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['cook', 'write', 'reply'],
  },

  en_s1u7_n1_060_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Can penguins fly?' }],
    options: [
      'No, they can’t.',
      'No, they don’t can.',
      'Yes, they are.',
      'They fly can’t.',
    ],
    answer: 'No, they can’t.',
    answerTranslation: L(
      '아니요, 날 수 없어요.',
      'Yo‘q, ular ucha olmaydi.',
      'No, they can’t.',
      'Нет, не умеют.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['can-not', 'fly', 'dialog'],
  },

  // ===========================================================
  // Lesson 4 · Talk about your abilities
  // ===========================================================

  en_s1u7_n1_061_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I can write in English.',
    audioText: 'I can write in English.',
    answerTranslation: L(
      '저는 영어로 쓸 수 있어요.',
      'Men ingliz tilida yoza olaman.',
      'I can write in English.',
      'Я умею писать по-английски.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['abilities', 'write'],
  },

  en_s1u7_n1_062_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'write',
    choices: [
      { text: 'sing', label: '🎤', emoji: '🎤', imageUrl: '' },
      { text: 'write', label: '✍️', emoji: '✍️', imageUrl: '' },
      { text: 'swim', label: '🏊', emoji: '🏊', imageUrl: '' },
      { text: 'cook', label: '👨‍🍳', emoji: '👨‍🍳', imageUrl: '' },
    ],
    answerTranslation: L('쓰다', 'yozmoq', 'write', 'писать'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['write'],
  },

  en_s1u7_n1_063_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'write',
        native: 'yozmoq',
        nativeI18n: L('쓰다', 'yozmoq', 'write', 'писать'),
      },
      {
        text: 'speak',
        native: 'gapirmoq',
        nativeI18n: L('말하다', 'gapirmoq', 'speak', 'говорить'),
      },
      {
        text: 'remember',
        native: 'eslamoq',
        nativeI18n: L('기억하다', 'eslamoq', 'remember', 'помнить'),
      },
      {
        text: 'swim',
        native: 'suzmoq',
        nativeI18n: L('수영하다', 'suzmoq', 'swim', 'плавать'),
      },
      {
        text: 'cook',
        native: 'ovqat pishirmoq',
        nativeI18n: L('요리하다', 'ovqat pishirmoq', 'cook', 'готовить'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['abilities', 'review', 'matching'],
  },

  en_s1u7_n1_064_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'English',
      'speak',
      'can',
      'I',
      'but',
      'Japanese',
      'can’t',
      'write',
    ],
    answer: 'I can speak English but I can’t speak Japanese',
    answerTranslation: L(
      '저는 영어는 할 수 있지만 일본어는 못 해요.',
      'Men ingliz tilida gapira olaman, lekin yapon tilida gapira olmayman.',
      'I can speak English, but I can’t speak Japanese.',
      'Я умею говорить по-английски, но не умею говорить по-японски.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['speak', 'can', 'can-not'],
  },

  en_s1u7_n1_065_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'names',
      'can',
      'remember',
      'I',
      'but',
      'faces',
      'can’t',
      'remember',
    ],
    answer: 'I can remember names but I can’t remember faces',
    audioText: 'I can remember names, but I can’t remember faces.',
    answerTranslation: L(
      '저는 이름은 기억할 수 있지만 얼굴은 잘 기억하지 못해요.',
      'Men ismlarni eslay olaman, lekin yuzlarni eslay olmayman.',
      'I can remember names, but I can’t remember faces.',
      'Я умею запоминать имена, но не умею запоминать лица.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['remember', 'can', 'can-not'],
  },

  en_s1u7_n1_066_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'write',
        native: 'yozmoq',
        nativeI18n: L('쓰다', 'yozmoq', 'write', 'писать'),
      },
      {
        text: 'speak',
        native: 'gapirmoq',
        nativeI18n: L('말하다', 'gapirmoq', 'speak', 'говорить'),
      },
      {
        text: 'remember',
        native: 'eslamoq',
        nativeI18n: L('기억하다', 'eslamoq', 'remember', 'помнить'),
      },
      {
        text: 'swim',
        native: 'suzmoq',
        nativeI18n: L('수영하다', 'suzmoq', 'swim', 'плавать'),
      },
      {
        text: 'cook',
        native: 'ovqat pishirmoq',
        nativeI18n: L('요리하다', 'ovqat pishirmoq', 'cook', 'готовить'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['abilities', 'review', 'listening'],
  },

  en_s1u7_n1_067_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I can ',
    sentenceSuffix: ' in English.',
    answer: 'write',
    answerTranslation: L(
      '저는 영어로 쓸 수 있어요.',
      'Men ingliz tilida yoza olaman.',
      'I can write in English.',
      'Я умею писать по-английски.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "write".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'write'],
  },

  en_s1u7_n1_068_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'cook',
    choices: [
      { text: 'swim', label: '🏊', emoji: '🏊', imageUrl: '' },
      { text: 'run', label: '🏃', emoji: '🏃', imageUrl: '' },
      { text: 'cook', label: '👨‍🍳', emoji: '👨‍🍳', imageUrl: '' },
      { text: 'write', label: '✍️', emoji: '✍️', imageUrl: '' },
    ],
    answerTranslation: L('요리하다', 'ovqat pishirmoq', 'cook', 'готовить'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['cook'],
  },

  en_s1u7_n1_069_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'I can ride a bike but I can’t drive.',
    audioText: 'I can ride a bike, but I can’t drive.',
    answerI18n: L(
      '저는 자전거는 탈 수 있지만 운전은 못 해요',
      'Men velosiped mina olaman, lekin mashina hayday olmayman',
      'I can ride a bike but I can’t drive',
      'Я умею ездить на велосипеде, но не умею водить машину',
    ),
    options: ['drive', 'bike', 'a', 'ride', 'can', 'I', 'but', 'I', 'can’t'],
    optionsI18n: {
      ko: ['저는', '자전거는', '탈', '수', '있지만', '운전은', '못', '해요'],
      uz: [
        'Men',
        'velosiped',
        'mina',
        'olaman',
        'lekin',
        'mashina',
        'hayday',
        'olmayman',
      ],
      en: ['I', 'can', 'ride', 'a', 'bike', 'but', 'I', 'can’t', 'drive'],
      ru: [
        'Я',
        'умею',
        'ездить',
        'на',
        'велосипеде',
        'но',
        'не',
        'умею',
        'водить',
      ],
    },
    answerTranslation: L(
      '저는 자전거는 탈 수 있지만 운전은 못 해요.',
      'Men velosiped mina olaman, lekin mashina hayday olmayman.',
      'I can ride a bike, but I can’t drive.',
      'Я умею ездить на велосипеде, но не умею водить машину.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['ride', 'drive', 'abilities'],
  },

  en_s1u7_n1_070_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What can you do?',
    options: ['I', 'can', 'cook', 'and', 'I', 'can', 'swim', 'can’t', 'fly'],
    answer: 'I can cook and I can swim',
    answerTranslation: L(
      '저는 요리도 할 수 있고 수영도 할 수 있어요.',
      'Men ovqat pishira olaman va suza olaman.',
      'I can cook and I can swim.',
      'Я умею готовить и плавать.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['abilities', 'reply'],
  },

  en_s1u7_n1_071_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I can ',
    sentenceSuffix: ' food.',
    answer: 'cook',
    answerTranslation: L(
      '저는 요리할 수 있어요.',
      'Men ovqat pishira olaman.',
      'I can cook food.',
      'Я умею готовить еду.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "cook".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'cook'],
  },

  en_s1u7_n1_072_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'drive',
        native: 'haydamoq',
        nativeI18n: L('운전하다', 'haydamoq', 'drive', 'водить'),
      },
      {
        text: 'paint',
        native: 'rasm chizmoq',
        nativeI18n: L('그림을 그리다', 'rasm chizmoq', 'paint', 'рисовать'),
      },
      {
        text: 'run',
        native: 'yugurmoq',
        nativeI18n: L('달리다', 'yugurmoq', 'run', 'бегать'),
      },
      {
        text: 'sing',
        native: 'qo‘shiq aytmoq',
        nativeI18n: L('노래하다', 'qo‘shiq aytmoq', 'sing', 'петь'),
      },
      {
        text: 'fly',
        native: 'uchmoq',
        nativeI18n: L('날다', 'uchmoq', 'fly', 'летать'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['abilities', 'review', 'matching'],
  },

  en_s1u7_n1_073_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'football',
      'can',
      'play',
      'She',
      'but',
      'tennis',
      'can’t',
      'play',
    ],
    answer: 'She can play football but she can’t play tennis',
    answerTranslation: L(
      '그녀는 축구는 할 수 있지만 테니스는 못 해요.',
      'U futbol o‘ynay oladi, lekin tennis o‘ynay olmaydi.',
      'She can play football, but she can’t play tennis.',
      'Она умеет играть в футбол, но не умеет играть в теннис.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['play', 'can', 'can-not'],
  },

  en_s1u7_n1_074_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'drive',
        native: 'haydamoq',
        nativeI18n: L('운전하다', 'haydamoq', 'drive', 'водить'),
      },
      {
        text: 'paint',
        native: 'rasm chizmoq',
        nativeI18n: L('그림을 그리다', 'rasm chizmoq', 'paint', 'рисовать'),
      },
      {
        text: 'run',
        native: 'yugurmoq',
        nativeI18n: L('달리다', 'yugurmoq', 'run', 'бегать'),
      },
      {
        text: 'sing',
        native: 'qo‘shiq aytmoq',
        nativeI18n: L('노래하다', 'qo‘shiq aytmoq', 'sing', 'петь'),
      },
      {
        text: 'fly',
        native: 'uchmoq',
        nativeI18n: L('날다', 'uchmoq', 'fly', 'летать'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['abilities', 'review', 'listening'],
  },

  en_s1u7_n1_075_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'fly',
    choices: [
      { text: 'run', label: '🏃', emoji: '🏃', imageUrl: '' },
      { text: 'swim', label: '🏊', emoji: '🏊', imageUrl: '' },
      { text: 'fly', label: '🕊️', emoji: '🕊️', imageUrl: '' },
      { text: 'sing', label: '🎤', emoji: '🎤', imageUrl: '' },
    ],
    answerTranslation: L('날다', 'uchmoq', 'fly', 'летать'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['fly'],
  },

  en_s1u7_n1_076_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I can swim, ___ I can’t drive.',
    blankAnswers: ['but'],
    options: ['but', 'and', 'can', 'are'],
    answer: 'but',
    answerTranslation: L(
      '저는 수영은 할 수 있지만 운전은 못 해요.',
      'Men suza olaman, lekin mashina hayday olmayman.',
      'I can swim, but I can’t drive.',
      'Я умею плавать, но не умею водить машину.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['abilities', 'but'],
  },

  en_s1u7_n1_077_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Most birds can ',
    sentenceSuffix: '.',
    answer: 'fly',
    answerTranslation: L(
      '대부분의 새는 날 수 있어요.',
      'Ko‘pchilik qushlar ucha oladi.',
      'Most birds can fly.',
      'Большинство птиц умеют летать.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "fly".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'fly'],
  },

  en_s1u7_n1_078_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'English',
      'can',
      'write',
      'I',
      'and',
      'English',
      'speak',
      'can',
      'I',
    ],
    answer: 'I can speak English and I can write English',
    audioText: 'I can speak English and I can write English.',
    answerTranslation: L(
      '저는 영어로 말할 수도 있고 쓸 수도 있어요.',
      'Men ingliz tilida gapira va yoza olaman.',
      'I can speak English and I can write English.',
      'Я умею говорить и писать по-английски.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['speak', 'write', 'abilities'],
  },

  en_s1u7_n1_079_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Can you sing?',
    options: [
      'No',
      'I',
      'can’t',
      'sing',
      'but',
      'I',
      'can',
      'play',
      'the',
      'piano',
    ],
    answer: 'No I can’t sing but I can play the piano',
    answerTranslation: L(
      '아니요, 노래는 못 하지만 피아노는 칠 수 있어요.',
      'Yo‘q, qo‘shiq ayta olmayman, lekin pianino chala olaman.',
      'No, I can’t sing, but I can play the piano.',
      'Нет, я не умею петь, но умею играть на пианино.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['sing', 'play', 'reply'],
  },

  en_s1u7_n1_080_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What can you do?' }],
    options: [
      'I can cook, swim and write.',
      'I am can swimming.',
      'I can to cook.',
      'I do can write.',
    ],
    answer: 'I can cook, swim and write.',
    answerTranslation: L(
      '저는 요리하고, 수영하고, 글을 쓸 수 있어요.',
      'Men ovqat pishira, suza va yoza olaman.',
      'I can cook, swim and write.',
      'Я умею готовить, плавать и писать.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['abilities', 'review', 'final'],
  },
};

export const EN_S1_UNIT7_NODE1 = {
  title: L(
    '그녀는 그림을 그릴 수 있어요',
    'U rasm chiza oladi',
    'She can paint',
    'Она умеет рисовать',
  ),
  section: 1,
  unit: 7,
  order: 1,
  isActive: true,

  lessons: [
    {
      title: L('기본 능력 동사', 'Asosiy ko‘nikmalar', 'Skills', 'Навыки'),
      description: L(
        '운전하다, 그림을 그리다, 타다, 말하다, 기억하다 같은 기본 능력 동사를 익혀요.',
        'Haydamoq, rasm chizmoq, minmoq, gapirmoq va eslamoq kabi asosiy ko‘nikma fe’llarini o‘rganasiz.',
        'Learn basic skill verbs such as drive, paint, ride, speak and remember.',
        'Изучаем базовые глаголы навыков: drive, paint, ride, speak и remember.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 1,
      questions: [
        'en_s1u7_n1_001_speaking',
        'en_s1u7_n1_002_image_choice',
        'en_s1u7_n1_003_word_matching',
        'en_s1u7_n1_004_translate_builder',
        'en_s1u7_n1_005_word_arrange',
        'en_s1u7_n1_006_audio_match',
        'en_s1u7_n1_007_type_answer',
        'en_s1u7_n1_008_image_choice',
        'en_s1u7_n1_009_sentence_builder',
        'en_s1u7_n1_010_reply_builder',
        'en_s1u7_n1_011_type_answer',
        'en_s1u7_n1_012_word_matching',
        'en_s1u7_n1_013_translate_builder',
        'en_s1u7_n1_014_audio_match',
        'en_s1u7_n1_015_image_choice',
        'en_s1u7_n1_016_fill_in_blank',
        'en_s1u7_n1_017_type_answer',
        'en_s1u7_n1_018_word_arrange',
        'en_s1u7_n1_019_reply_builder',
        'en_s1u7_n1_020_dialog_complete',
      ],
    },

    {
      title: L(
        '할 수 있어요 / 할 수 없어요',
        'Qila olaman / qila olmayman',
        'Can and can’t',
        'Can и can’t',
      ),
      description: L(
        'can과 can’t 뒤에 동사원형을 사용해 할 수 있는 것과 할 수 없는 것을 말해요.',
        'Can va can’t dan keyin fe’lning asosiy shaklini ishlatib, qila oladigan va qila olmaydigan ishlarni aytasiz.',
        'Use can and can’t with base verbs to talk about abilities.',
        'Используем can и can’t с начальной формой глагола, чтобы говорить о способностях.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 2,
      questions: [
        'en_s1u7_n1_021_speaking',
        'en_s1u7_n1_022_image_choice',
        'en_s1u7_n1_023_word_matching',
        'en_s1u7_n1_024_translate_builder',
        'en_s1u7_n1_025_word_arrange',
        'en_s1u7_n1_026_audio_match',
        'en_s1u7_n1_027_type_answer',
        'en_s1u7_n1_028_image_choice',
        'en_s1u7_n1_029_sentence_builder',
        'en_s1u7_n1_030_reply_builder',
        'en_s1u7_n1_031_type_answer',
        'en_s1u7_n1_032_word_matching',
        'en_s1u7_n1_033_translate_builder',
        'en_s1u7_n1_034_audio_match',
        'en_s1u7_n1_035_image_choice',
        'en_s1u7_n1_036_fill_in_blank',
        'en_s1u7_n1_037_type_answer',
        'en_s1u7_n1_038_word_arrange',
        'en_s1u7_n1_039_reply_builder',
        'en_s1u7_n1_040_dialog_complete',
      ],
    },

    {
      title: L(
        '더 많은 능력',
        'Yana ko‘proq qobiliyatlar',
        'More abilities',
        'Другие способности',
      ),
      description: L(
        '요리하다, 날다, 달리다, 노래하다, 수영하다, 쓰다 같은 능력 동사를 익혀요.',
        'Ovqat pishirmoq, uchmoq, yugurmoq, qo‘shiq aytmoq, suzmoq va yozmoq kabi fe’llarni o‘rganasiz.',
        'Learn more ability verbs: cook, fly, run, sing, swim and write.',
        'Изучаем другие глаголы способностей: cook, fly, run, sing, swim и write.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 3,
      questions: [
        'en_s1u7_n1_041_speaking',
        'en_s1u7_n1_042_image_choice',
        'en_s1u7_n1_043_word_matching',
        'en_s1u7_n1_044_translate_builder',
        'en_s1u7_n1_045_word_arrange',
        'en_s1u7_n1_046_audio_match',
        'en_s1u7_n1_047_type_answer',
        'en_s1u7_n1_048_image_choice',
        'en_s1u7_n1_049_sentence_builder',
        'en_s1u7_n1_050_reply_builder',
        'en_s1u7_n1_051_type_answer',
        'en_s1u7_n1_052_word_matching',
        'en_s1u7_n1_053_translate_builder',
        'en_s1u7_n1_054_audio_match',
        'en_s1u7_n1_055_image_choice',
        'en_s1u7_n1_056_fill_in_blank',
        'en_s1u7_n1_057_type_answer',
        'en_s1u7_n1_058_word_arrange',
        'en_s1u7_n1_059_reply_builder',
        'en_s1u7_n1_060_dialog_complete',
      ],
    },

    {
      title: L(
        '내가 할 수 있는 것',
        'Men nimalar qila olaman',
        'Talk about your abilities',
        'Мои способности',
      ),
      description: L(
        'can, can’t, and, but을 활용해 내가 할 수 있는 것과 할 수 없는 것을 자연스럽게 말해요.',
        'Can, can’t, and va but yordamida nimalar qila olishingiz va qila olmasligingiz haqida gapirasiz.',
        'Use can, can’t, and and but to talk about your own abilities.',
        'Используем can, can’t, and и but, чтобы рассказывать о своих способностях.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 4,
      questions: [
        'en_s1u7_n1_061_speaking',
        'en_s1u7_n1_062_image_choice',
        'en_s1u7_n1_063_word_matching',
        'en_s1u7_n1_064_translate_builder',
        'en_s1u7_n1_065_word_arrange',
        'en_s1u7_n1_066_audio_match',
        'en_s1u7_n1_067_type_answer',
        'en_s1u7_n1_068_image_choice',
        'en_s1u7_n1_069_sentence_builder',
        'en_s1u7_n1_070_reply_builder',
        'en_s1u7_n1_071_type_answer',
        'en_s1u7_n1_072_word_matching',
        'en_s1u7_n1_073_translate_builder',
        'en_s1u7_n1_074_audio_match',
        'en_s1u7_n1_075_image_choice',
        'en_s1u7_n1_076_fill_in_blank',
        'en_s1u7_n1_077_type_answer',
        'en_s1u7_n1_078_word_arrange',
        'en_s1u7_n1_079_reply_builder',
        'en_s1u7_n1_080_dialog_complete',
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Section 1 · Unit 7 · Node 2
// 7.2 Can you help?
//
// Coverage
// - volunteer / research / record / tourist
// - teach / type / learn / photography / interview
// - Can + subject + base verb?
// - Yes, I can. / No, I can't.
// - asking about abilities
// - slowly / badly / well / fast
// - adverbs of manner after verbs / verb phrases
// - volunteer and job interviews
//
// Reused from Node 1:
// drive / speak / understand / use
// swim / cook / run / play
//
// IMPORTANT:
// *_WORDS에는 단어만 등록.
// 문장 / 숙어 / 구 단위 표현 등록 금지.
//
// 4 lessons × 20 questions = 80
// type_answer: 3 per lesson
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT7_NODE2_WORDS = [
  {
    code: 'en-person-volunteer',
    english: 'volunteer',
    senseKey: 'person-working-without-pay',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '자원봉사자',
      'ko‘ngilli',
      'a person who works or helps without being paid',
      'волонтёр',
    ),
    examples: [
      {
        english: 'The project needs volunteers.',
        translations: L(
          '그 프로젝트에는 자원봉사자가 필요해요.',
          'Loyihaga ko‘ngillilar kerak.',
          'The project needs volunteers.',
          'Проекту нужны волонтёры.',
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
      imageAlt: L('자원봉사자', 'ko‘ngilli', 'a volunteer', 'волонтёр'),
    },
    tags: ['work', 'people'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-research',
    english: 'research',
    senseKey: 'careful-study-to-find-information',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '연구',
      'tadqiqot',
      'careful study done to find new information',
      'исследование',
    ),
    examples: [
      {
        english: 'The dolphin research is in Zanzibar.',
        translations: L(
          '돌고래 연구는 잔지바르에서 진행돼요.',
          'Delfinlar tadqiqoti Zanzibarda.',
          'The dolphin research is in Zanzibar.',
          'Исследование дельфинов проходит на Занзибаре.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/rɪˈsɜːtʃ/',
      ttsText: 'research',
    },
    media: {
      emoji: '🔬',
      imageUrl: '',
      imageAlt: L('연구', 'tadqiqot', 'research', 'исследование'),
    },
    tags: ['work', 'study'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-record',
    english: 'record',
    senseKey: 'write-information-for-future-use',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '기록하다',
      'qayd etmoq',
      'to write down information so it can be used later',
      'записывать',
    ),
    examples: [
      {
        english: 'Volunteers record the number of tourists.',
        translations: L(
          '자원봉사자들은 관광객 수를 기록해요.',
          'Ko‘ngillilar sayyohlar sonini qayd etadilar.',
          'Volunteers record the number of tourists.',
          'Волонтёры записывают количество туристов.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/rɪˈkɔːd/',
      ttsText: 'record',
    },
    media: {
      emoji: '📝',
      imageUrl: '',
      imageAlt: L(
        '정보를 기록하는 모습',
        'ma’lumot yozish',
        'recording information',
        'запись информации',
      ),
    },
    tags: ['work', 'verbs'],
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
        english: 'There are many tourists in Zanzibar.',
        translations: L(
          '잔지바르에는 관광객이 많아요.',
          'Zanzibarda ko‘p sayyohlar bor.',
          'There are many tourists in Zanzibar.',
          'На Занзибаре много туристов.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈtʊərɪst/',
      ttsText: 'tourist',
    },
    media: {
      emoji: '🧳',
      imageUrl: '',
      imageAlt: L('관광객', 'sayyoh', 'a tourist', 'турист'),
    },
    tags: ['travel', 'people'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-teach',
    english: 'teach',
    senseKey: 'help-someone-learn',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '가르치다',
      'o‘rgatmoq',
      'to help someone learn something',
      'учить; преподавать',
    ),
    examples: [
      {
        english: 'Can you teach English?',
        translations: L(
          '영어를 가르칠 수 있어요?',
          'Ingliz tilini o‘rgata olasizmi?',
          'Can you teach English?',
          'Вы умеете преподавать английский?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/tiːtʃ/',
      ttsText: 'teach',
    },
    media: {
      emoji: '👩‍🏫',
      imageUrl: '',
      imageAlt: L(
        '가르치는 사람',
        'dars berayotgan odam',
        'a person teaching',
        'человек, который преподаёт',
      ),
    },
    tags: ['skills', 'work', 'verbs'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-type',
    english: 'type',
    senseKey: 'write-using-keyboard',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '타이핑하다',
      'klaviaturada yozmoq',
      'to write using a computer keyboard',
      'печатать',
    ),
    examples: [
      {
        english: 'I type quite slowly.',
        translations: L(
          '저는 타이핑을 꽤 천천히 해요.',
          'Men klaviaturada ancha sekin yozaman.',
          'I type quite slowly.',
          'Я печатаю довольно медленно.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/taɪp/',
      ttsText: 'type',
    },
    media: {
      emoji: '⌨️',
      imageUrl: '',
      imageAlt: L(
        '키보드로 타이핑하기',
        'klaviaturada yozish',
        'typing on a keyboard',
        'печать на клавиатуре',
      ),
    },
    tags: ['skills', 'computer', 'verbs'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-learn',
    english: 'learn',
    senseKey: 'gain-knowledge-or-skill',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '배우다',
      'o‘rganmoq',
      'to gain knowledge or a new skill',
      'учиться; изучать',
    ),
    examples: [
      {
        english: 'I can learn fast.',
        translations: L(
          '저는 빨리 배울 수 있어요.',
          'Men tez o‘rgana olaman.',
          'I can learn fast.',
          'Я умею быстро учиться.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/lɜːn/',
      ttsText: 'learn',
    },
    media: {
      emoji: '📖',
      imageUrl: '',
      imageAlt: L('배우기', 'o‘rganish', 'learning', 'обучение'),
    },
    tags: ['skills', 'verbs'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-photography',
    english: 'photography',
    senseKey: 'activity-of-taking-photos',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '사진 촬영',
      'fotografiya',
      'the activity or art of taking photographs',
      'фотография',
    ),
    examples: [
      {
        english: 'I like photography a lot.',
        translations: L(
          '저는 사진 촬영을 아주 좋아해요.',
          'Men fotografiyani juda yaxshi ko‘raman.',
          'I like photography a lot.',
          'Я очень люблю фотографию.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/fəˈtɒɡrəfi/',
      ttsText: 'photography',
    },
    media: {
      emoji: '📷',
      imageUrl: '',
      imageAlt: L('사진 촬영', 'fotografiya', 'photography', 'фотография'),
    },
    tags: ['skills', 'hobbies'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-interview',
    english: 'interview',
    senseKey: 'formal-meeting-for-job',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '면접',
      'suhbat',
      'a formal meeting where someone is asked questions for a job',
      'собеседование',
    ),
    examples: [
      {
        english: 'The job interview is today.',
        translations: L(
          '취업 면접은 오늘이에요.',
          'Ish suhbati bugun.',
          'The job interview is today.',
          'Собеседование сегодня.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈɪntəvjuː/',
      ttsText: 'interview',
    },
    media: {
      emoji: '🤝',
      imageUrl: '',
      imageAlt: L(
        '취업 면접',
        'ish suhbati',
        'a job interview',
        'собеседование',
      ),
    },
    tags: ['work', 'jobs'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adverb-slowly',
    english: 'slowly',
    senseKey: 'at-slow-speed',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L('천천히', 'sekin', 'at a slow speed', 'медленно'),
    examples: [
      {
        english: 'Please speak slowly.',
        translations: L(
          '천천히 말해 주세요.',
          'Iltimos, sekin gapiring.',
          'Please speak slowly.',
          'Пожалуйста, говорите медленно.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈsləʊli/',
      ttsText: 'slowly',
    },
    media: {
      emoji: '🐢',
      imageUrl: '',
      imageAlt: L(
        '천천히 움직이는 모습',
        'sekin harakat',
        'moving slowly',
        'медленное движение',
      ),
    },
    tags: ['adverbs', 'manner'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adverb-badly',
    english: 'badly',
    senseKey: 'in-poor-way',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L(
      '잘 못; 나쁘게',
      'yomon',
      'in a poor or unsuccessful way',
      'плохо',
    ),
    examples: [
      {
        english: 'They cook badly.',
        translations: L(
          '그들은 요리를 잘 못해요.',
          'Ular yomon ovqat pishiradilar.',
          'They cook badly.',
          'Они плохо готовят.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈbædli/',
      ttsText: 'badly',
    },
    media: {
      emoji: '👎',
      imageUrl: '',
      imageAlt: L(
        '잘 못하는 모습',
        'yomon bajarish',
        'doing something badly',
        'плохое выполнение',
      ),
    },
    tags: ['adverbs', 'manner'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adverb-well',
    english: 'well',
    senseKey: 'in-good-or-skilled-way',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L('잘', 'yaxshi', 'in a good or skilful way', 'хорошо'),
    examples: [
      {
        english: 'I can swim well.',
        translations: L(
          '저는 수영을 잘해요.',
          'Men yaxshi suza olaman.',
          'I can swim well.',
          'Я хорошо плаваю.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/wel/',
      ttsText: 'well',
    },
    media: {
      emoji: '👍',
      imageUrl: '',
      imageAlt: L(
        '잘하는 모습',
        'yaxshi bajarish',
        'doing something well',
        'хорошее выполнение',
      ),
    },
    tags: ['adverbs', 'manner'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adverb-fast',
    english: 'fast',
    senseKey: 'at-high-speed',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L('빨리', 'tez', 'at a high speed', 'быстро'),
    examples: [
      {
        english: 'She can type fast.',
        translations: L(
          '그녀는 타이핑을 빨리 할 수 있어요.',
          'U tez yoza oladi.',
          'She can type fast.',
          'Она умеет быстро печатать.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/fɑːst/',
      ttsText: 'fast',
    },
    media: {
      emoji: '⚡',
      imageUrl: '',
      imageAlt: L(
        '빠르게 움직이는 모습',
        'tez harakat',
        'moving fast',
        'быстрое движение',
      ),
    },
    tags: ['adverbs', 'manner'],
    difficulty: 1,
    isCore: true,
  },
];

export const EN_S1_UNIT7_NODE2_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Volunteer skills
  // ===========================================================

  en_s1u7_n2_001_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Can you swim?',
    audioText: 'Can you swim?',
    answerTranslation: L(
      '수영할 수 있어요?',
      'Suza olasizmi?',
      'Can you swim?',
      'Вы умеете плавать?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['can-question', 'swim'],
  },

  en_s1u7_n2_002_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'volunteer',
    choices: [
      { text: 'tourist', label: '🧳', emoji: '🧳', imageUrl: '' },
      { text: 'volunteer', label: '🙋', emoji: '🙋', imageUrl: '' },
      { text: 'photography', label: '📷', emoji: '📷', imageUrl: '' },
      { text: 'research', label: '🔬', emoji: '🔬', imageUrl: '' },
    ],
    answerTranslation: L('자원봉사자', 'ko‘ngilli', 'volunteer', 'волонтёр'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['volunteer'],
  },

  en_s1u7_n2_003_word_matching: {
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
        text: 'research',
        native: 'tadqiqot',
        nativeI18n: L('연구', 'tadqiqot', 'research', 'исследование'),
      },
      {
        text: 'record',
        native: 'qayd etmoq',
        nativeI18n: L('기록하다', 'qayd etmoq', 'record', 'записывать'),
      },
      {
        text: 'tourist',
        native: 'sayyoh',
        nativeI18n: L('관광객', 'sayyoh', 'tourist', 'турист'),
      },
      {
        text: 'photography',
        native: 'fotografiya',
        nativeI18n: L('사진 촬영', 'fotografiya', 'photography', 'фотография'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['volunteer', 'matching'],
  },

  en_s1u7_n2_004_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['you', 'Can', 'swim', 'drive', 'well', 'are', 'do'],
    answer: 'Can you swim',
    answerTranslation: L(
      '수영할 수 있어요?',
      'Suza olasizmi?',
      'Can you swim?',
      'Вы умеете плавать?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['can-question', 'swim'],
  },

  en_s1u7_n2_005_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'different',
      'computer',
      'programs',
      'use',
      'can',
      'I',
      'type',
      'slowly',
    ],
    answer: 'I can use different computer programs',
    audioText: 'I can use different computer programs.',
    answerTranslation: L(
      '저는 다양한 컴퓨터 프로그램을 사용할 수 있어요.',
      'Men turli kompyuter dasturlaridan foydalana olaman.',
      'I can use different computer programs.',
      'Я умею пользоваться разными компьютерными программами.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['computer', 'use', 'can'],
  },

  en_s1u7_n2_006_audio_match: {
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
        text: 'research',
        native: 'tadqiqot',
        nativeI18n: L('연구', 'tadqiqot', 'research', 'исследование'),
      },
      {
        text: 'record',
        native: 'qayd etmoq',
        nativeI18n: L('기록하다', 'qayd etmoq', 'record', 'записывать'),
      },
      {
        text: 'tourist',
        native: 'sayyoh',
        nativeI18n: L('관광객', 'sayyoh', 'tourist', 'турист'),
      },
      {
        text: 'photography',
        native: 'fotografiya',
        nativeI18n: L('사진 촬영', 'fotografiya', 'photography', 'фотография'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['volunteer', 'listening'],
  },

  en_s1u7_n2_007_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Volunteers ',
    sentenceSuffix: ' the number of tourists.',
    answer: 'record',
    answerTranslation: L(
      '자원봉사자들은 관광객 수를 기록해요.',
      'Ko‘ngillilar sayyohlar sonini qayd etadilar.',
      'Volunteers record the number of tourists.',
      'Волонтёры записывают количество туристов.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "record".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'record'],
  },

  en_s1u7_n2_008_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'tourist',
    choices: [
      { text: 'research', label: '🔬', emoji: '🔬', imageUrl: '' },
      { text: 'photography', label: '📷', emoji: '📷', imageUrl: '' },
      { text: 'tourist', label: '🧳', emoji: '🧳', imageUrl: '' },
      { text: 'volunteer', label: '🙋', emoji: '🙋', imageUrl: '' },
    ],
    answerTranslation: L('관광객', 'sayyoh', 'tourist', 'турист'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['tourist'],
  },

  en_s1u7_n2_009_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Volunteers take photos of dolphins.',
    audioText: 'Volunteers take photos of dolphins.',
    answerI18n: L(
      '자원봉사자들은 돌고래 사진을 찍어요',
      'Ko‘ngillilar delfinlarni suratga oladilar',
      'Volunteers take photos of dolphins',
      'Волонтёры фотографируют дельфинов',
    ),
    options: [
      'Volunteers',
      'take',
      'photos',
      'of',
      'dolphins',
      'tourists',
      'teach',
    ],
    optionsI18n: {
      ko: ['자원봉사자들은', '돌고래', '사진을', '찍어요', '관광객을'],
      uz: ['Ko‘ngillilar', 'delfinlarni', 'suratga', 'oladilar', 'sayyohlarni'],
      en: ['Volunteers', 'take', 'photos', 'of', 'dolphins', 'tourists'],
      ru: ['Волонтёры', 'фотографируют', 'дельфинов', 'туристов'],
    },
    answerTranslation: L(
      '자원봉사자들은 돌고래 사진을 찍어요.',
      'Ko‘ngillilar delfinlarni suratga oladilar.',
      'Volunteers take photos of dolphins.',
      'Волонтёры фотографируют дельфинов.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['volunteer', 'photography'],
  },

  en_s1u7_n2_010_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Can you drive?',
    options: ['Yes', 'I', 'can', 'drive', 'swim', 'can’t', 'No'],
    answer: 'Yes I can drive',
    answerTranslation: L(
      '네, 운전할 수 있어요.',
      'Ha, mashina hayday olaman.',
      'Yes, I can drive.',
      'Да, я умею водить.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['can-question', 'drive', 'reply'],
  },

  en_s1u7_n2_011_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Can you ',
    sentenceSuffix: ' English?',
    answer: 'teach',
    answerTranslation: L(
      '영어를 가르칠 수 있어요?',
      'Ingliz tilini o‘rgata olasizmi?',
      'Can you teach English?',
      'Вы умеете преподавать английский?',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "teach".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'teach'],
  },

  en_s1u7_n2_012_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'teach',
        native: 'o‘rgatmoq',
        nativeI18n: L('가르치다', 'o‘rgatmoq', 'teach', 'преподавать'),
      },
      {
        text: 'type',
        native: 'klaviaturada yozmoq',
        nativeI18n: L('타이핑하다', 'klaviaturada yozmoq', 'type', 'печатать'),
      },
      {
        text: 'learn',
        native: 'o‘rganmoq',
        nativeI18n: L('배우다', 'o‘rganmoq', 'learn', 'учиться'),
      },
      {
        text: 'record',
        native: 'qayd etmoq',
        nativeI18n: L('기록하다', 'qayd etmoq', 'record', 'записывать'),
      },
      {
        text: 'tourist',
        native: 'sayyoh',
        nativeI18n: L('관광객', 'sayyoh', 'tourist', 'турист'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['work', 'skills', 'matching'],
  },

  en_s1u7_n2_013_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['teach', 'English', 'can', 'I', 'tourists', 'drive', 'can’t'],
    answer: 'I can teach English',
    answerTranslation: L(
      '저는 영어를 가르칠 수 있어요.',
      'Men ingliz tilini o‘rgata olaman.',
      'I can teach English.',
      'Я умею преподавать английский.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['teach', 'can'],
  },

  en_s1u7_n2_014_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'teach',
        native: 'o‘rgatmoq',
        nativeI18n: L('가르치다', 'o‘rgatmoq', 'teach', 'преподавать'),
      },
      {
        text: 'type',
        native: 'klaviaturada yozmoq',
        nativeI18n: L('타이핑하다', 'klaviaturada yozmoq', 'type', 'печатать'),
      },
      {
        text: 'learn',
        native: 'o‘rganmoq',
        nativeI18n: L('배우다', 'o‘rganmoq', 'learn', 'учиться'),
      },
      {
        text: 'record',
        native: 'qayd etmoq',
        nativeI18n: L('기록하다', 'qayd etmoq', 'record', 'записывать'),
      },
      {
        text: 'tourist',
        native: 'sayyoh',
        nativeI18n: L('관광객', 'sayyoh', 'tourist', 'турист'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['work', 'skills', 'listening'],
  },

  en_s1u7_n2_015_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'photography',
    choices: [
      { text: 'research', label: '🔬', emoji: '🔬', imageUrl: '' },
      { text: 'tourist', label: '🧳', emoji: '🧳', imageUrl: '' },
      { text: 'volunteer', label: '🙋', emoji: '🙋', imageUrl: '' },
      { text: 'photography', label: '📷', emoji: '📷', imageUrl: '' },
    ],
    answerTranslation: L(
      '사진 촬영',
      'fotografiya',
      'photography',
      'фотография',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['photography'],
  },

  en_s1u7_n2_016_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ you use a computer?',
    blankAnswers: ['Can'],
    options: ['Can', 'Do', 'Are', 'Have'],
    answer: 'Can',
    answerTranslation: L(
      '컴퓨터를 사용할 수 있어요?',
      'Kompyuterdan foydalana olasizmi?',
      'Can you use a computer?',
      'Вы умеете пользоваться компьютером?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['can-question'],
  },

  en_s1u7_n2_017_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I can ',
    sentenceSuffix: ' fast.',
    answer: 'learn',
    answerTranslation: L(
      '저는 빨리 배울 수 있어요.',
      'Men tez o‘rgana olaman.',
      'I can learn fast.',
      'Я умею быстро учиться.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "learn".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'learn'],
  },

  en_s1u7_n2_018_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['a', 'camera', 'use', 'Can', 'you', 'computer', 'teach', 'drive'],
    answer: 'Can you use a camera',
    audioText: 'Can you use a camera?',
    answerTranslation: L(
      '카메라를 사용할 수 있어요?',
      'Kameradan foydalana olasizmi?',
      'Can you use a camera?',
      'Вы умеете пользоваться камерой?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['can-question', 'camera'],
  },

  en_s1u7_n2_019_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Can you use a computer?',
    options: ['Yes', 'I', 'can', 'use', 'a', 'computer', 'teach', 'can’t'],
    answer: 'Yes I can use a computer',
    answerTranslation: L(
      '네, 컴퓨터를 사용할 수 있어요.',
      'Ha, kompyuterdan foydalana olaman.',
      'Yes, I can use a computer.',
      'Да, я умею пользоваться компьютером.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['computer', 'reply'],
  },

  en_s1u7_n2_020_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Can you teach English?' }],
    options: [
      'Yes, I can.',
      'Yes, I do can.',
      'I am teach.',
      'Yes, I teaching.',
    ],
    answer: 'Yes, I can.',
    answerTranslation: L(
      '네, 할 수 있어요.',
      'Ha, qila olaman.',
      'Yes, I can.',
      'Да, умею.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['can-question', 'short-answer'],
  },

  // ===========================================================
  // Lesson 2 · Can you...?
  // ===========================================================

  en_s1u7_n2_021_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Can you speak English?',
    audioText: 'Can you speak English?',
    answerTranslation: L(
      '영어를 할 수 있어요?',
      'Ingliz tilida gapira olasizmi?',
      'Can you speak English?',
      'Вы говорите по-английски?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['can-question', 'speak'],
  },

  en_s1u7_n2_022_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'type',
    choices: [
      { text: 'teach', label: '👩‍🏫', emoji: '👩‍🏫', imageUrl: '' },
      { text: 'learn', label: '📖', emoji: '📖', imageUrl: '' },
      { text: 'type', label: '⌨️', emoji: '⌨️', imageUrl: '' },
      { text: 'record', label: '📝', emoji: '📝', imageUrl: '' },
    ],
    answerTranslation: L(
      '타이핑하다',
      'klaviaturada yozmoq',
      'type',
      'печатать',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['type'],
  },

  en_s1u7_n2_023_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'teach',
        native: 'o‘rgatmoq',
        nativeI18n: L('가르치다', 'o‘rgatmoq', 'teach', 'преподавать'),
      },
      {
        text: 'type',
        native: 'klaviaturada yozmoq',
        nativeI18n: L('타이핑하다', 'klaviaturada yozmoq', 'type', 'печатать'),
      },
      {
        text: 'learn',
        native: 'o‘rganmoq',
        nativeI18n: L('배우다', 'o‘rganmoq', 'learn', 'учиться'),
      },
      {
        text: 'interview',
        native: 'suhbat',
        nativeI18n: L('면접', 'suhbat', 'interview', 'собеседование'),
      },
      {
        text: 'volunteer',
        native: 'ko‘ngilli',
        nativeI18n: L('자원봉사자', 'ko‘ngilli', 'volunteer', 'волонтёр'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['interview', 'matching'],
  },

  en_s1u7_n2_024_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['a', 'computer', 'use', 'you', 'Can', 'teach', 'do', 'are'],
    answer: 'Can you use a computer',
    answerTranslation: L(
      '컴퓨터를 사용할 수 있어요?',
      'Kompyuterdan foydalana olasizmi?',
      'Can you use a computer?',
      'Вы умеете пользоваться компьютером?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['can-question', 'computer'],
  },

  en_s1u7_n2_025_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['English', 'teach', 'you', 'Can', 'speak', 'can', 'I'],
    answer: 'Can you teach English',
    audioText: 'Can you teach English?',
    answerTranslation: L(
      '영어를 가르칠 수 있어요?',
      'Ingliz tilini o‘rgata olasizmi?',
      'Can you teach English?',
      'Вы умеете преподавать английский?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['can-question', 'teach'],
  },

  en_s1u7_n2_026_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'teach',
        native: 'o‘rgatmoq',
        nativeI18n: L('가르치다', 'o‘rgatmoq', 'teach', 'преподавать'),
      },
      {
        text: 'type',
        native: 'klaviaturada yozmoq',
        nativeI18n: L('타이핑하다', 'klaviaturada yozmoq', 'type', 'печатать'),
      },
      {
        text: 'learn',
        native: 'o‘rganmoq',
        nativeI18n: L('배우다', 'o‘rganmoq', 'learn', 'учиться'),
      },
      {
        text: 'interview',
        native: 'suhbat',
        nativeI18n: L('면접', 'suhbat', 'interview', 'собеседование'),
      },
      {
        text: 'volunteer',
        native: 'ko‘ngilli',
        nativeI18n: L('자원봉사자', 'ko‘ngilli', 'volunteer', 'волонтёр'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['interview', 'listening'],
  },

  en_s1u7_n2_027_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Can you ',
    sentenceSuffix: ' English?',
    answer: 'speak',
    answerTranslation: L(
      '영어를 할 수 있어요?',
      'Ingliz tilida gapira olasizmi?',
      'Can you speak English?',
      'Вы говорите по-английски?',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "speak".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'speak'],
  },

  en_s1u7_n2_028_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'teach',
    choices: [
      { text: 'type', label: '⌨️', emoji: '⌨️', imageUrl: '' },
      { text: 'record', label: '📝', emoji: '📝', imageUrl: '' },
      { text: 'learn', label: '📖', emoji: '📖', imageUrl: '' },
      { text: 'teach', label: '👩‍🏫', emoji: '👩‍🏫', imageUrl: '' },
    ],
    answerTranslation: L('가르치다', 'o‘rgatmoq', 'teach', 'преподавать'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['teach'],
  },

  en_s1u7_n2_029_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Can you drive?',
    audioText: 'Can you drive?',
    answerI18n: L(
      '운전할 수 있어요',
      'Mashina hayday olasizmi',
      'Can you drive',
      'Вы умеете водить',
    ),
    options: ['drive', 'Can', 'you', 'swim', 'teach'],
    optionsI18n: {
      ko: ['운전할', '수', '있어요', '수영할'],
      uz: ['Mashina', 'hayday', 'olasizmi', 'suzasizmi'],
      en: ['Can', 'you', 'drive', 'swim'],
      ru: ['Вы', 'умеете', 'водить', 'плавать'],
    },
    answerTranslation: L(
      '운전할 수 있어요?',
      'Mashina hayday olasizmi?',
      'Can you drive?',
      'Вы умеете водить?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['can-question', 'drive'],
  },

  en_s1u7_n2_030_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Can you swim?',
    options: ['Yes', 'I', 'can', 'swim', 'No', 'can’t', 'teach'],
    answer: 'Yes I can swim',
    answerTranslation: L(
      '네, 수영할 수 있어요.',
      'Ha, suza olaman.',
      'Yes, I can swim.',
      'Да, я умею плавать.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['swim', 'reply'],
  },

  en_s1u7_n2_031_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I can ',
    sentenceSuffix: ' quite slowly.',
    answer: 'type',
    answerTranslation: L(
      '저는 타이핑을 꽤 천천히 할 수 있어요.',
      'Men klaviaturada ancha sekin yoza olaman.',
      'I can type quite slowly.',
      'Я могу печатать довольно медленно.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "type".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'type'],
  },

  en_s1u7_n2_032_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'research',
        native: 'tadqiqot',
        nativeI18n: L('연구', 'tadqiqot', 'research', 'исследование'),
      },
      {
        text: 'tourist',
        native: 'sayyoh',
        nativeI18n: L('관광객', 'sayyoh', 'tourist', 'турист'),
      },
      {
        text: 'interview',
        native: 'suhbat',
        nativeI18n: L('면접', 'suhbat', 'interview', 'собеседование'),
      },
      {
        text: 'photography',
        native: 'fotografiya',
        nativeI18n: L('사진 촬영', 'fotografiya', 'photography', 'фотография'),
      },
      {
        text: 'volunteer',
        native: 'ko‘ngilli',
        nativeI18n: L('자원봉사자', 'ko‘ngilli', 'volunteer', 'волонтёр'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['work', 'matching'],
  },

  en_s1u7_n2_033_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['photos', 'Can', 'you', 'take', 'teach', 'swim', 'a'],
    answer: 'Can you take photos',
    answerTranslation: L(
      '사진을 찍을 수 있어요?',
      'Suratga ola olasizmi?',
      'Can you take photos?',
      'Вы умеете фотографировать?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['can-question', 'photography'],
  },

  en_s1u7_n2_034_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'research',
        native: 'tadqiqot',
        nativeI18n: L('연구', 'tadqiqot', 'research', 'исследование'),
      },
      {
        text: 'tourist',
        native: 'sayyoh',
        nativeI18n: L('관광객', 'sayyoh', 'tourist', 'турист'),
      },
      {
        text: 'interview',
        native: 'suhbat',
        nativeI18n: L('면접', 'suhbat', 'interview', 'собеседование'),
      },
      {
        text: 'photography',
        native: 'fotografiya',
        nativeI18n: L('사진 촬영', 'fotografiya', 'photography', 'фотография'),
      },
      {
        text: 'volunteer',
        native: 'ko‘ngilli',
        nativeI18n: L('자원봉사자', 'ko‘ngilli', 'volunteer', 'волонтёр'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['work', 'listening'],
  },

  en_s1u7_n2_035_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'interview',
    choices: [
      { text: 'photography', label: '📷', emoji: '📷', imageUrl: '' },
      { text: 'volunteer', label: '🙋', emoji: '🙋', imageUrl: '' },
      { text: 'interview', label: '🤝', emoji: '🤝', imageUrl: '' },
      { text: 'research', label: '🔬', emoji: '🔬', imageUrl: '' },
    ],
    answerTranslation: L('면접', 'suhbat', 'interview', 'собеседование'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['interview'],
  },

  en_s1u7_n2_036_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ you swim?',
    blankAnswers: ['Can'],
    options: ['Can', 'Are', 'Do', 'Is'],
    answer: 'Can',
    answerTranslation: L(
      '수영할 수 있어요?',
      'Suza olasizmi?',
      'Can you swim?',
      'Вы умеете плавать?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['can-question'],
  },

  en_s1u7_n2_037_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'This is a job ',
    sentenceSuffix: '.',
    answer: 'interview',
    answerTranslation: L(
      '이것은 취업 면접이에요.',
      'Bu ish suhbati.',
      'This is a job interview.',
      'Это собеседование.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "interview".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'interview'],
  },

  en_s1u7_n2_038_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['fast', 'learn', 'you', 'Can', 'slowly', 'teach', 'type'],
    answer: 'Can you learn fast',
    audioText: 'Can you learn fast?',
    answerTranslation: L(
      '빨리 배울 수 있어요?',
      'Tez o‘rgana olasizmi?',
      'Can you learn fast?',
      'Вы умеете быстро учиться?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['learn', 'fast'],
  },

  en_s1u7_n2_039_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Can you teach English?',
    options: ['No', 'I', 'can’t', 'teach', 'English', 'Yes', 'can', 'type'],
    answer: 'No I can’t teach English',
    answerTranslation: L(
      '아니요, 영어를 가르칠 수 없어요.',
      'Yo‘q, ingliz tilini o‘rgata olmayman.',
      'No, I can’t teach English.',
      'Нет, я не умею преподавать английский.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['teach', 'can-not', 'reply'],
  },

  en_s1u7_n2_040_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Can you use a camera?' }],
    options: [
      'Yes, I can.',
      'Yes, I am.',
      'Yes, I use can.',
      'Yes, I do camera.',
    ],
    answer: 'Yes, I can.',
    answerTranslation: L(
      '네, 할 수 있어요.',
      'Ha, qila olaman.',
      'Yes, I can.',
      'Да, умею.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['can-question', 'camera'],
  },

  // ===========================================================
  // Lesson 3 · Adverbs of manner
  // ===========================================================

  en_s1u7_n2_041_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I can swim well.',
    audioText: 'I can swim well.',
    answerTranslation: L(
      '저는 수영을 잘해요.',
      'Men yaxshi suza olaman.',
      'I can swim well.',
      'Я хорошо плаваю.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['well', 'swim'],
  },

  en_s1u7_n2_042_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'type',
    choices: [
      { text: 'teach', label: '👩‍🏫', emoji: '👩‍🏫', imageUrl: '' },
      { text: 'record', label: '📝', emoji: '📝', imageUrl: '' },
      { text: 'type', label: '⌨️', emoji: '⌨️', imageUrl: '' },
      { text: 'photography', label: '📷', emoji: '📷', imageUrl: '' },
    ],
    answerTranslation: L(
      '타이핑하다',
      'klaviaturada yozmoq',
      'type',
      'печатать',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['type'],
  },

  en_s1u7_n2_043_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'slowly',
        native: 'sekin',
        nativeI18n: L('천천히', 'sekin', 'slowly', 'медленно'),
      },
      {
        text: 'badly',
        native: 'yomon',
        nativeI18n: L('잘 못', 'yomon', 'badly', 'плохо'),
      },
      {
        text: 'well',
        native: 'yaxshi',
        nativeI18n: L('잘', 'yaxshi', 'well', 'хорошо'),
      },
      {
        text: 'fast',
        native: 'tez',
        nativeI18n: L('빨리', 'tez', 'fast', 'быстро'),
      },
      {
        text: 'type',
        native: 'klaviaturada yozmoq',
        nativeI18n: L('타이핑하다', 'klaviaturada yozmoq', 'type', 'печатать'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['adverbs', 'matching'],
  },

  en_s1u7_n2_044_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['swim', 'well', 'can', 'I', 'slowly', 'badly', 'run'],
    answer: 'I can swim well',
    answerTranslation: L(
      '저는 수영을 잘해요.',
      'Men yaxshi suza olaman.',
      'I can swim well.',
      'Я хорошо плаваю.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['well', 'swim'],
  },

  en_s1u7_n2_045_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['slowly', 'speak', 'Please', 'well', 'fast', 'English'],
    answer: 'Please speak slowly',
    audioText: 'Please speak slowly.',
    answerTranslation: L(
      '천천히 말해 주세요.',
      'Iltimos, sekin gapiring.',
      'Please speak slowly.',
      'Пожалуйста, говорите медленно.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['slowly', 'speak'],
  },

  en_s1u7_n2_046_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'slowly',
        native: 'sekin',
        nativeI18n: L('천천히', 'sekin', 'slowly', 'медленно'),
      },
      {
        text: 'badly',
        native: 'yomon',
        nativeI18n: L('잘 못', 'yomon', 'badly', 'плохо'),
      },
      {
        text: 'well',
        native: 'yaxshi',
        nativeI18n: L('잘', 'yaxshi', 'well', 'хорошо'),
      },
      {
        text: 'fast',
        native: 'tez',
        nativeI18n: L('빨리', 'tez', 'fast', 'быстро'),
      },
      {
        text: 'type',
        native: 'klaviaturada yozmoq',
        nativeI18n: L('타이핑하다', 'klaviaturada yozmoq', 'type', 'печатать'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['adverbs', 'listening'],
  },

  en_s1u7_n2_047_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I can swim ',
    sentenceSuffix: '.',
    answer: 'well',
    answerTranslation: L(
      '저는 수영을 잘해요.',
      'Men yaxshi suza olaman.',
      'I can swim well.',
      'Я хорошо плаваю.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is the adverb "well".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'well'],
  },

  en_s1u7_n2_048_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'record',
    choices: [
      { text: 'learn', label: '📖', emoji: '📖', imageUrl: '' },
      { text: 'record', label: '📝', emoji: '📝', imageUrl: '' },
      { text: 'teach', label: '👩‍🏫', emoji: '👩‍🏫', imageUrl: '' },
      { text: 'type', label: '⌨️', emoji: '⌨️', imageUrl: '' },
    ],
    answerTranslation: L('기록하다', 'qayd etmoq', 'record', 'записывать'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['record'],
  },

  en_s1u7_n2_049_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'She can type fast.',
    audioText: 'She can type fast.',
    answerI18n: L(
      '그녀는 타이핑을 빨리 할 수 있어요',
      'U tez yoza oladi',
      'She can type fast',
      'Она умеет быстро печатать',
    ),
    options: ['fast', 'type', 'can', 'She', 'slowly', 'swim'],
    optionsI18n: {
      ko: ['그녀는', '타이핑을', '빨리', '할', '수', '있어요', '천천히'],
      uz: ['U', 'tez', 'yoza', 'oladi', 'sekin'],
      en: ['She', 'can', 'type', 'fast', 'slowly'],
      ru: ['Она', 'умеет', 'быстро', 'печатать', 'медленно'],
    },
    answerTranslation: L(
      '그녀는 타이핑을 빨리 할 수 있어요.',
      'U tez yoza oladi.',
      'She can type fast.',
      'Она умеет быстро печатать.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['type', 'fast'],
  },

  en_s1u7_n2_050_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Can you swim well?',
    options: ['Yes', 'I', 'can', 'swim', 'well', 'badly', 'slowly'],
    answer: 'Yes I can swim well',
    answerTranslation: L(
      '네, 수영을 잘해요.',
      'Ha, men yaxshi suza olaman.',
      'Yes, I can swim well.',
      'Да, я хорошо плаваю.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['well', 'swim', 'reply'],
  },

  en_s1u7_n2_051_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Please speak ',
    sentenceSuffix: '.',
    answer: 'slowly',
    answerTranslation: L(
      '천천히 말해 주세요.',
      'Iltimos, sekin gapiring.',
      'Please speak slowly.',
      'Пожалуйста, говорите медленно.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "slowly".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'slowly'],
  },

  en_s1u7_n2_052_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'well',
        native: 'yaxshi',
        nativeI18n: L('잘', 'yaxshi', 'well', 'хорошо'),
      },
      {
        text: 'badly',
        native: 'yomon',
        nativeI18n: L('잘 못', 'yomon', 'badly', 'плохо'),
      },
      {
        text: 'slowly',
        native: 'sekin',
        nativeI18n: L('천천히', 'sekin', 'slowly', 'медленно'),
      },
      {
        text: 'fast',
        native: 'tez',
        nativeI18n: L('빨리', 'tez', 'fast', 'быстро'),
      },
      {
        text: 'learn',
        native: 'o‘rganmoq',
        nativeI18n: L('배우다', 'o‘rganmoq', 'learn', 'учиться'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['adverbs', 'matching'],
  },

  en_s1u7_n2_053_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['cook', 'badly', 'They', 'well', 'fast', 'swim'],
    answer: 'They cook badly',
    answerTranslation: L(
      '그들은 요리를 잘 못해요.',
      'Ular yomon ovqat pishiradilar.',
      'They cook badly.',
      'Они плохо готовят.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['badly', 'cook'],
  },

  en_s1u7_n2_054_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'well',
        native: 'yaxshi',
        nativeI18n: L('잘', 'yaxshi', 'well', 'хорошо'),
      },
      {
        text: 'badly',
        native: 'yomon',
        nativeI18n: L('잘 못', 'yomon', 'badly', 'плохо'),
      },
      {
        text: 'slowly',
        native: 'sekin',
        nativeI18n: L('천천히', 'sekin', 'slowly', 'медленно'),
      },
      {
        text: 'fast',
        native: 'tez',
        nativeI18n: L('빨리', 'tez', 'fast', 'быстро'),
      },
      {
        text: 'learn',
        native: 'o‘rganmoq',
        nativeI18n: L('배우다', 'o‘rganmoq', 'learn', 'учиться'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['adverbs', 'listening'],
  },

  en_s1u7_n2_055_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'learn',
    choices: [
      { text: 'record', label: '📝', emoji: '📝', imageUrl: '' },
      { text: 'teach', label: '👩‍🏫', emoji: '👩‍🏫', imageUrl: '' },
      { text: 'learn', label: '📖', emoji: '📖', imageUrl: '' },
      { text: 'type', label: '⌨️', emoji: '⌨️', imageUrl: '' },
    ],
    answerTranslation: L('배우다', 'o‘rganmoq', 'learn', 'учиться'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['learn'],
  },

  en_s1u7_n2_056_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She drives very ___.',
    blankAnswers: ['fast'],
    options: ['fast', 'well', 'badly', 'slowly'],
    answer: 'fast',
    answerTranslation: L(
      '그녀는 아주 빨리 운전해요.',
      'U juda tez mashina haydaydi.',
      'She drives very fast.',
      'Она водит очень быстро.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['fast', 'drive'],
  },

  en_s1u7_n2_057_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'They cook ',
    sentenceSuffix: '.',
    answer: 'badly',
    answerTranslation: L(
      '그들은 요리를 잘 못해요.',
      'Ular yomon ovqat pishiradilar.',
      'They cook badly.',
      'Они плохо готовят.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "badly".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'badly'],
  },

  en_s1u7_n2_058_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['well', 'tennis', 'play', 'can’t', 'I', 'badly', 'fast'],
    answer: 'I can’t play tennis well',
    audioText: 'I can’t play tennis well.',
    answerTranslation: L(
      '저는 테니스를 잘 못 쳐요.',
      'Men tennisni yaxshi o‘ynay olmayman.',
      'I can’t play tennis well.',
      'Я не умею хорошо играть в теннис.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['well', 'play', 'can-not'],
  },

  en_s1u7_n2_059_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Can you understand English well?',
    options: [
      'Yes',
      'I',
      'can',
      'understand',
      'English',
      'well',
      'slowly',
      'badly',
    ],
    answer: 'Yes I can understand English well',
    answerTranslation: L(
      '네, 영어를 잘 이해할 수 있어요.',
      'Ha, ingliz tilini yaxshi tushuna olaman.',
      'Yes, I can understand English well.',
      'Да, я хорошо понимаю английский.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['understand', 'well', 'reply'],
  },

  en_s1u7_n2_060_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Are you a fast typist?' }],
    options: [
      'No. I type quite slowly.',
      'No. I slowly am type.',
      'Yes. I am type well.',
      'I can slowly typist.',
    ],
    answer: 'No. I type quite slowly.',
    answerTranslation: L(
      '아니요. 저는 타이핑을 꽤 천천히 해요.',
      'Yo‘q. Men ancha sekin yozaman.',
      'No. I type quite slowly.',
      'Нет. Я печатаю довольно медленно.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['type', 'slowly', 'dialog'],
  },

  // ===========================================================
  // Lesson 4 · Job interview
  // ===========================================================

  en_s1u7_n2_061_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Can you use a computer?',
    audioText: 'Can you use a computer?',
    answerTranslation: L(
      '컴퓨터를 사용할 수 있어요?',
      'Kompyuterdan foydalana olasizmi?',
      'Can you use a computer?',
      'Вы умеете пользоваться компьютером?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['interview', 'computer'],
  },

  en_s1u7_n2_062_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'tourist',
    choices: [
      { text: 'volunteer', label: '🙋', emoji: '🙋', imageUrl: '' },
      { text: 'interview', label: '🤝', emoji: '🤝', imageUrl: '' },
      { text: 'tourist', label: '🧳', emoji: '🧳', imageUrl: '' },
      { text: 'research', label: '🔬', emoji: '🔬', imageUrl: '' },
    ],
    answerTranslation: L('관광객', 'sayyoh', 'tourist', 'турист'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['tourist'],
  },

  en_s1u7_n2_063_word_matching: {
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
        text: 'interview',
        native: 'suhbat',
        nativeI18n: L('면접', 'suhbat', 'interview', 'собеседование'),
      },
      {
        text: 'research',
        native: 'tadqiqot',
        nativeI18n: L('연구', 'tadqiqot', 'research', 'исследование'),
      },
      {
        text: 'tourist',
        native: 'sayyoh',
        nativeI18n: L('관광객', 'sayyoh', 'tourist', 'турист'),
      },
      {
        text: 'photography',
        native: 'fotografiya',
        nativeI18n: L('사진 촬영', 'fotografiya', 'photography', 'фотография'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['jobs', 'matching'],
  },

  en_s1u7_n2_064_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'I',
      'type',
      'slowly',
      'but',
      'I',
      'can',
      'learn',
      'fast',
      'badly',
      'well',
    ],
    answer: 'I type slowly but I can learn fast',
    answerTranslation: L(
      '저는 타이핑은 천천히 하지만 빨리 배울 수 있어요.',
      'Men sekin yozaman, lekin tez o‘rgana olaman.',
      'I type slowly, but I can learn fast.',
      'Я печатаю медленно, но умею быстро учиться.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['type', 'learn', 'adverbs'],
  },

  en_s1u7_n2_065_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['English', 'teach', 'you', 'Can', 'well', 'type', 'fast'],
    answer: 'Can you teach English',
    audioText: 'Can you teach English?',
    answerTranslation: L(
      '영어를 가르칠 수 있어요?',
      'Ingliz tilini o‘rgata olasizmi?',
      'Can you teach English?',
      'Вы умеете преподавать английский?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['interview', 'teach'],
  },

  en_s1u7_n2_066_audio_match: {
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
        text: 'interview',
        native: 'suhbat',
        nativeI18n: L('면접', 'suhbat', 'interview', 'собеседование'),
      },
      {
        text: 'research',
        native: 'tadqiqot',
        nativeI18n: L('연구', 'tadqiqot', 'research', 'исследование'),
      },
      {
        text: 'tourist',
        native: 'sayyoh',
        nativeI18n: L('관광객', 'sayyoh', 'tourist', 'турист'),
      },
      {
        text: 'photography',
        native: 'fotografiya',
        nativeI18n: L('사진 촬영', 'fotografiya', 'photography', 'фотография'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['jobs', 'listening'],
  },

  en_s1u7_n2_067_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'The project needs a ',
    sentenceSuffix: '.',
    answer: 'volunteer',
    answerTranslation: L(
      '그 프로젝트에는 자원봉사자가 필요해요.',
      'Loyihaga ko‘ngilli kerak.',
      'The project needs a volunteer.',
      'Проекту нужен волонтёр.',
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

  en_s1u7_n2_068_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'photography',
    choices: [
      { text: 'research', label: '🔬', emoji: '🔬', imageUrl: '' },
      { text: 'interview', label: '🤝', emoji: '🤝', imageUrl: '' },
      { text: 'photography', label: '📷', emoji: '📷', imageUrl: '' },
      { text: 'volunteer', label: '🙋', emoji: '🙋', imageUrl: '' },
    ],
    answerTranslation: L(
      '사진 촬영',
      'fotografiya',
      'photography',
      'фотография',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['photography'],
  },

  en_s1u7_n2_069_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'I can use a computer well.',
    audioText: 'I can use a computer well.',
    answerI18n: L(
      '저는 컴퓨터를 잘 사용할 수 있어요',
      'Men kompyuterdan yaxshi foydalana olaman',
      'I can use a computer well',
      'Я хорошо умею пользоваться компьютером',
    ),
    options: ['well', 'computer', 'a', 'use', 'can', 'I', 'slowly', 'teach'],
    optionsI18n: {
      ko: ['저는', '컴퓨터를', '잘', '사용할', '수', '있어요', '천천히'],
      uz: ['Men', 'kompyuterdan', 'yaxshi', 'foydalana', 'olaman', 'sekin'],
      en: ['I', 'can', 'use', 'a', 'computer', 'well', 'slowly'],
      ru: ['Я', 'хорошо', 'умею', 'пользоваться', 'компьютером', 'медленно'],
    },
    answerTranslation: L(
      '저는 컴퓨터를 잘 사용할 수 있어요.',
      'Men kompyuterdan yaxshi foydalana olaman.',
      'I can use a computer well.',
      'Я хорошо умею пользоваться компьютером.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['computer', 'well'],
  },

  en_s1u7_n2_070_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Can you drive?',
    options: ['No', 'I', 'can’t', 'drive', 'but', 'I', 'can', 'learn', 'fast'],
    answer: 'No I can’t drive but I can learn fast',
    answerTranslation: L(
      '아니요, 운전은 못 하지만 빨리 배울 수 있어요.',
      'Yo‘q, mashina hayday olmayman, lekin tez o‘rgana olaman.',
      'No, I can’t drive, but I can learn fast.',
      'Нет, я не умею водить, но быстро учусь.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['interview', 'drive', 'learn'],
  },

  en_s1u7_n2_071_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I can learn ',
    sentenceSuffix: '.',
    answer: 'fast',
    answerTranslation: L(
      '저는 빨리 배울 수 있어요.',
      'Men tez o‘rgana olaman.',
      'I can learn fast.',
      'Я умею быстро учиться.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is the adverb "fast".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'fast'],
  },

  en_s1u7_n2_072_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'slowly',
        native: 'sekin',
        nativeI18n: L('천천히', 'sekin', 'slowly', 'медленно'),
      },
      {
        text: 'well',
        native: 'yaxshi',
        nativeI18n: L('잘', 'yaxshi', 'well', 'хорошо'),
      },
      {
        text: 'badly',
        native: 'yomon',
        nativeI18n: L('잘 못', 'yomon', 'badly', 'плохо'),
      },
      {
        text: 'fast',
        native: 'tez',
        nativeI18n: L('빨리', 'tez', 'fast', 'быстро'),
      },
      {
        text: 'interview',
        native: 'suhbat',
        nativeI18n: L('면접', 'suhbat', 'interview', 'собеседование'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['review', 'matching'],
  },

  en_s1u7_n2_073_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['English', 'well', 'speak', 'can', 'I', 'slowly', 'badly'],
    answer: 'I can speak English well',
    answerTranslation: L(
      '저는 영어를 잘할 수 있어요.',
      'Men ingliz tilida yaxshi gapira olaman.',
      'I can speak English well.',
      'Я хорошо говорю по-английски.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['speak', 'well'],
  },

  en_s1u7_n2_074_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'slowly',
        native: 'sekin',
        nativeI18n: L('천천히', 'sekin', 'slowly', 'медленно'),
      },
      {
        text: 'well',
        native: 'yaxshi',
        nativeI18n: L('잘', 'yaxshi', 'well', 'хорошо'),
      },
      {
        text: 'badly',
        native: 'yomon',
        nativeI18n: L('잘 못', 'yomon', 'badly', 'плохо'),
      },
      {
        text: 'fast',
        native: 'tez',
        nativeI18n: L('빨리', 'tez', 'fast', 'быстро'),
      },
      {
        text: 'interview',
        native: 'suhbat',
        nativeI18n: L('면접', 'suhbat', 'interview', 'собеседование'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['review', 'listening'],
  },

  en_s1u7_n2_075_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'research',
    choices: [
      { text: 'photography', label: '📷', emoji: '📷', imageUrl: '' },
      { text: 'volunteer', label: '🙋', emoji: '🙋', imageUrl: '' },
      { text: 'interview', label: '🤝', emoji: '🤝', imageUrl: '' },
      { text: 'research', label: '🔬', emoji: '🔬', imageUrl: '' },
    ],
    answerTranslation: L('연구', 'tadqiqot', 'research', 'исследование'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['research'],
  },

  en_s1u7_n2_076_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Can you ___ a camera?',
    blankAnswers: ['use'],
    options: ['use', 'well', 'slowly', 'tourist'],
    answer: 'use',
    answerTranslation: L(
      '카메라를 사용할 수 있어요?',
      'Kameradan foydalana olasizmi?',
      'Can you use a camera?',
      'Вы умеете пользоваться камерой?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['can-question', 'camera'],
  },

  en_s1u7_n2_077_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'The job ',
    sentenceSuffix: ' is today.',
    answer: 'interview',
    answerTranslation: L(
      '취업 면접은 오늘이에요.',
      'Ish suhbati bugun.',
      'The job interview is today.',
      'Собеседование сегодня.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "interview".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'interview'],
  },

  en_s1u7_n2_078_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['well', 'swim', 'you', 'Can', 'slowly', 'type', 'fast'],
    answer: 'Can you swim well',
    audioText: 'Can you swim well?',
    answerTranslation: L(
      '수영을 잘할 수 있어요?',
      'Yaxshi suza olasizmi?',
      'Can you swim well?',
      'Вы хорошо плаваете?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['swim', 'well'],
  },

  en_s1u7_n2_079_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Can you use different computer programs?',
    options: [
      'Yes',
      'I',
      'can',
      'use',
      'different',
      'computer',
      'programs',
      'slowly',
      'teach',
    ],
    answer: 'Yes I can use different computer programs',
    answerTranslation: L(
      '네, 다양한 컴퓨터 프로그램을 사용할 수 있어요.',
      'Ha, turli kompyuter dasturlaridan foydalana olaman.',
      'Yes, I can use different computer programs.',
      'Да, я умею пользоваться разными компьютерными программами.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['computer', 'interview', 'reply'],
  },

  en_s1u7_n2_080_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Can you speak English well?' }],
    options: [
      'Yes, I can speak English well.',
      'Yes, I speak good Englishly.',
      'I can English well speak.',
      'Yes, I am speak English.',
    ],
    answer: 'Yes, I can speak English well.',
    answerTranslation: L(
      '네, 영어를 잘할 수 있어요.',
      'Ha, ingliz tilida yaxshi gapira olaman.',
      'Yes, I can speak English well.',
      'Да, я хорошо говорю по-английски.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['interview', 'well', 'final'],
  },
};

export const EN_S1_UNIT7_NODE2 = {
  title: L(
    '도와줄 수 있어요?',
    'Yordam bera olasizmi?',
    'Can you help?',
    'Вы можете помочь?',
  ),
  section: 1,
  unit: 7,
  order: 2,
  isActive: true,

  lessons: [
    {
      title: L(
        '봉사활동에 필요한 능력',
        'Ko‘ngilli ish uchun ko‘nikmalar',
        'Volunteer skills',
        'Навыки волонтёра',
      ),
      description: L(
        '연구 프로젝트와 봉사활동에서 쓰는 기록하다, 가르치다, 배우다 같은 단어와 능력 표현을 익혀요.',
        'Tadqiqot va ko‘ngilli ishda ishlatiladigan qayd etmoq, o‘rgatmoq va o‘rganmoq kabi so‘zlarni o‘rganasiz.',
        'Learn vocabulary and ability expressions used in volunteer and research work.',
        'Изучаем лексику и выражения способностей для волонтёрской и исследовательской работы.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 1,
      questions: [
        'en_s1u7_n2_001_speaking',
        'en_s1u7_n2_002_image_choice',
        'en_s1u7_n2_003_word_matching',
        'en_s1u7_n2_004_translate_builder',
        'en_s1u7_n2_005_word_arrange',
        'en_s1u7_n2_006_audio_match',
        'en_s1u7_n2_007_type_answer',
        'en_s1u7_n2_008_image_choice',
        'en_s1u7_n2_009_sentence_builder',
        'en_s1u7_n2_010_reply_builder',
        'en_s1u7_n2_011_type_answer',
        'en_s1u7_n2_012_word_matching',
        'en_s1u7_n2_013_translate_builder',
        'en_s1u7_n2_014_audio_match',
        'en_s1u7_n2_015_image_choice',
        'en_s1u7_n2_016_fill_in_blank',
        'en_s1u7_n2_017_type_answer',
        'en_s1u7_n2_018_word_arrange',
        'en_s1u7_n2_019_reply_builder',
        'en_s1u7_n2_020_dialog_complete',
      ],
    },

    {
      title: L(
        '할 수 있는지 묻기',
        'Qila olish haqida so‘rash',
        'Can you...?',
        'Вопросы с Can you...?',
      ),
      description: L(
        'Can you + 동사원형으로 상대의 능력을 묻고 Yes, I can / No, I can’t로 대답해요.',
        'Can you + fe’l yordamida qobiliyat haqida so‘rab, Yes, I can yoki No, I can’t deb javob berasiz.',
        'Ask about abilities with Can you + base verb and answer with Yes, I can or No, I can’t.',
        'Спрашиваем о способностях с Can you + глагол и отвечаем Yes, I can или No, I can’t.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 2,
      questions: [
        'en_s1u7_n2_021_speaking',
        'en_s1u7_n2_022_image_choice',
        'en_s1u7_n2_023_word_matching',
        'en_s1u7_n2_024_translate_builder',
        'en_s1u7_n2_025_word_arrange',
        'en_s1u7_n2_026_audio_match',
        'en_s1u7_n2_027_type_answer',
        'en_s1u7_n2_028_image_choice',
        'en_s1u7_n2_029_sentence_builder',
        'en_s1u7_n2_030_reply_builder',
        'en_s1u7_n2_031_type_answer',
        'en_s1u7_n2_032_word_matching',
        'en_s1u7_n2_033_translate_builder',
        'en_s1u7_n2_034_audio_match',
        'en_s1u7_n2_035_image_choice',
        'en_s1u7_n2_036_fill_in_blank',
        'en_s1u7_n2_037_type_answer',
        'en_s1u7_n2_038_word_arrange',
        'en_s1u7_n2_039_reply_builder',
        'en_s1u7_n2_040_dialog_complete',
      ],
    },

    {
      title: L(
        '어떻게 하는지 말하기',
        'Qanday bajarishni aytish',
        'Adverbs of manner',
        'Наречия образа действия',
      ),
      description: L(
        'well, badly, slowly, fast를 동사 뒤에 사용해 어떤 일을 얼마나 잘하거나 빠르게 하는지 말해요.',
        'Well, badly, slowly va fast yordamida ishni qanday bajarishingizni aytasiz.',
        'Use well, badly, slowly and fast after verbs to describe how someone does something.',
        'Используем well, badly, slowly и fast после глаголов, чтобы описывать способ действия.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 3,
      questions: [
        'en_s1u7_n2_041_speaking',
        'en_s1u7_n2_042_image_choice',
        'en_s1u7_n2_043_word_matching',
        'en_s1u7_n2_044_translate_builder',
        'en_s1u7_n2_045_word_arrange',
        'en_s1u7_n2_046_audio_match',
        'en_s1u7_n2_047_type_answer',
        'en_s1u7_n2_048_image_choice',
        'en_s1u7_n2_049_sentence_builder',
        'en_s1u7_n2_050_reply_builder',
        'en_s1u7_n2_051_type_answer',
        'en_s1u7_n2_052_word_matching',
        'en_s1u7_n2_053_translate_builder',
        'en_s1u7_n2_054_audio_match',
        'en_s1u7_n2_055_image_choice',
        'en_s1u7_n2_056_fill_in_blank',
        'en_s1u7_n2_057_type_answer',
        'en_s1u7_n2_058_word_arrange',
        'en_s1u7_n2_059_reply_builder',
        'en_s1u7_n2_060_dialog_complete',
      ],
    },

    {
      title: L(
        '능력 면접',
        'Qobiliyatlar bo‘yicha suhbat',
        'Job interview',
        'Собеседование',
      ),
      description: L(
        '컴퓨터, 언어, 운전, 가르치기 같은 능력을 묻고 자신의 강점과 부족한 점을 면접처럼 말해요.',
        'Kompyuter, tillar, haydash va o‘qitish kabi ko‘nikmalar haqida savol-javob qilib, ish suhbati kabi mashq qilasiz.',
        'Practise a simple job interview about computer skills, languages, driving, teaching and learning.',
        'Практикуем простое собеседование о компьютерах, языках, вождении, преподавании и обучении.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 4,
      questions: [
        'en_s1u7_n2_061_speaking',
        'en_s1u7_n2_062_image_choice',
        'en_s1u7_n2_063_word_matching',
        'en_s1u7_n2_064_translate_builder',
        'en_s1u7_n2_065_word_arrange',
        'en_s1u7_n2_066_audio_match',
        'en_s1u7_n2_067_type_answer',
        'en_s1u7_n2_068_image_choice',
        'en_s1u7_n2_069_sentence_builder',
        'en_s1u7_n2_070_reply_builder',
        'en_s1u7_n2_071_type_answer',
        'en_s1u7_n2_072_word_matching',
        'en_s1u7_n2_073_translate_builder',
        'en_s1u7_n2_074_audio_match',
        'en_s1u7_n2_075_image_choice',
        'en_s1u7_n2_076_fill_in_blank',
        'en_s1u7_n2_077_type_answer',
        'en_s1u7_n2_078_word_arrange',
        'en_s1u7_n2_079_reply_builder',
        'en_s1u7_n2_080_dialog_complete',
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Section 1 · Unit 7 · Node 3
// 7.3 I like going out
//
// Coverage
// - hobbies and free-time activities
// - cinema / theatre / music / online
// - dance / love / hate
// - like + verb-ing
// - spelling of -ing forms
// - love / like / don't like / hate + -ing
// - talking about hobbies
//
// Reused:
// travel / cook / watch / play / shop / read
// friend / photo / garden / sport / game
// swim / run / drive / write
//
// IMPORTANT:
// *_WORDS에는 단어만 등록.
// "go out", "take photos", "listen to music",
// "play video games", "go shopping" 같은 표현은
// Word seed에 등록하지 않고 문제에서만 사용.
//
// 4 lessons × 20 questions = 80
// type_answer: 3 per lesson
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT7_NODE3_WORDS = [
  {
    code: 'en-noun-hobby',
    english: 'hobby',
    senseKey: 'activity-done-for-pleasure',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '취미',
      'hobbi',
      'an activity you do for pleasure in your free time',
      'хобби',
    ),
    examples: [
      {
        english: 'Photography is my hobby.',
        translations: L(
          '사진 촬영은 제 취미예요.',
          'Fotografiya mening hobbim.',
          'Photography is my hobby.',
          'Фотография — моё хобби.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈhɒbi/',
      ttsText: 'hobby',
    },
    media: {
      emoji: '🎯',
      imageUrl: '',
      imageAlt: L('취미 활동', 'hobbi', 'a hobby', 'хобби'),
    },
    tags: ['hobbies', 'free-time'],
    difficulty: 1,
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
        english: 'We often go to the cinema.',
        translations: L(
          '우리는 영화관에 자주 가요.',
          'Biz tez-tez kinoteatrga boramiz.',
          'We often go to the cinema.',
          'Мы часто ходим в кинотеатр.',
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
      imageAlt: L('영화관', 'kinoteatr', 'a cinema', 'кинотеатр'),
    },
    tags: ['hobbies', 'places'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-place-theatre',
    english: 'theatre',
    senseKey: 'place-for-live-performances',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '극장',
      'teatr',
      'a place where people watch live plays and performances',
      'театр',
    ),
    examples: [
      {
        english: 'They go to the theatre at weekends.',
        translations: L(
          '그들은 주말에 극장에 가요.',
          'Ular dam olish kunlari teatrga boradilar.',
          'They go to the theatre at weekends.',
          'Они ходят в театр по выходным.',
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
      imageAlt: L('극장', 'teatr', 'a theatre', 'театр'),
    },
    tags: ['hobbies', 'places'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adverb-online',
    english: 'online',
    senseKey: 'using-internet',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L('온라인으로', 'onlayn', 'using the internet', 'онлайн'),
    examples: [
      {
        english: 'He shops online.',
        translations: L(
          '그는 온라인으로 쇼핑해요.',
          'U onlayn xarid qiladi.',
          'He shops online.',
          'Он делает покупки онлайн.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌɒnˈlaɪn/',
      ttsText: 'online',
    },
    media: {
      emoji: '💻',
      imageUrl: '',
      imageAlt: L(
        '온라인 활동',
        'onlayn faoliyat',
        'an online activity',
        'занятие онлайн',
      ),
    },
    tags: ['internet', 'hobbies'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-music',
    english: 'music',
    senseKey: 'organized-sounds-for-listening',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '음악',
      'musiqa',
      'sounds arranged to be listened to and enjoyed',
      'музыка',
    ),
    examples: [
      {
        english: 'I listen to music at home.',
        translations: L(
          '저는 집에서 음악을 들어요.',
          'Men uyda musiqa tinglayman.',
          'I listen to music at home.',
          'Я слушаю музыку дома.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈmjuːzɪk/',
      ttsText: 'music',
    },
    media: {
      emoji: '🎵',
      imageUrl: '',
      imageAlt: L('음악', 'musiqa', 'music', 'музыка'),
    },
    tags: ['hobbies', 'music'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-dance',
    english: 'dance',
    senseKey: 'move-body-to-music',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '춤추다',
      'raqsga tushmoq',
      'to move your body to music',
      'танцевать',
    ),
    examples: [
      {
        english: 'My sister likes dancing.',
        translations: L(
          '제 여동생은 춤추는 것을 좋아해요.',
          'Singlim raqsga tushishni yoqtiradi.',
          'My sister likes dancing.',
          'Моя сестра любит танцевать.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/dɑːns/',
      ttsText: 'dance',
    },
    media: {
      emoji: '💃',
      imageUrl: '',
      imageAlt: L(
        '춤추는 사람',
        'raqsga tushayotgan odam',
        'a person dancing',
        'танцующий человек',
      ),
    },
    tags: ['hobbies', 'verbs'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-love',
    english: 'love',
    senseKey: 'like-something-very-much',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '매우 좋아하다',
      'juda yaxshi ko‘rmoq',
      'to like something very much',
      'очень любить',
    ),
    examples: [
      {
        english: 'I love cooking.',
        translations: L(
          '저는 요리하는 것을 아주 좋아해요.',
          'Men ovqat pishirishni juda yaxshi ko‘raman.',
          'I love cooking.',
          'Я очень люблю готовить.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/lʌv/',
      ttsText: 'love',
    },
    media: {
      emoji: '❤️',
      imageUrl: '',
      imageAlt: L(
        '매우 좋아하는 마음',
        'juda yaxshi ko‘rish',
        'loving something',
        'любовь к чему-либо',
      ),
    },
    tags: ['preferences', 'verbs'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-hate',
    english: 'hate',
    senseKey: 'dislike-something-very-much',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '매우 싫어하다',
      'yomon ko‘rmoq',
      'to dislike something very much',
      'ненавидеть',
    ),
    examples: [
      {
        english: 'I hate playing football.',
        translations: L(
          '저는 축구하는 것을 정말 싫어해요.',
          'Men futbol o‘ynashni yomon ko‘raman.',
          'I hate playing football.',
          'Я ненавижу играть в футбол.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/heɪt/',
      ttsText: 'hate',
    },
    media: {
      emoji: '👎',
      imageUrl: '',
      imageAlt: L(
        '매우 싫어하는 표정',
        'yoqtirmaslik',
        'disliking something',
        'сильная неприязнь',
      ),
    },
    tags: ['preferences', 'verbs'],
    difficulty: 1,
    isCore: true,
  },
];

export const EN_S1_UNIT7_NODE3_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Hobbies
  // ===========================================================

  en_s1u7_n3_001_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I like taking photos.',
    audioText: 'I like taking photos.',
    answerTranslation: L(
      '저는 사진 찍는 것을 좋아해요.',
      'Men suratga olishni yoqtiraman.',
      'I like taking photos.',
      'Я люблю фотографировать.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['hobbies', 'photos'],
  },

  en_s1u7_n3_002_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'cinema',
    choices: [
      { text: 'theatre', label: '🎭', emoji: '🎭', imageUrl: '' },
      { text: 'cinema', label: '🎬', emoji: '🎬', imageUrl: '' },
      { text: 'music', label: '🎵', emoji: '🎵', imageUrl: '' },
      { text: 'dance', label: '💃', emoji: '💃', imageUrl: '' },
    ],
    answerTranslation: L('영화관', 'kinoteatr', 'cinema', 'кинотеатр'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['cinema'],
  },

  en_s1u7_n3_003_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'hobby',
        native: 'hobbi',
        nativeI18n: L('취미', 'hobbi', 'hobby', 'хобби'),
      },
      {
        text: 'cinema',
        native: 'kinoteatr',
        nativeI18n: L('영화관', 'kinoteatr', 'cinema', 'кинотеатр'),
      },
      {
        text: 'theatre',
        native: 'teatr',
        nativeI18n: L('극장', 'teatr', 'theatre', 'театр'),
      },
      {
        text: 'music',
        native: 'musiqa',
        nativeI18n: L('음악', 'musiqa', 'music', 'музыка'),
      },
      {
        text: 'online',
        native: 'onlayn',
        nativeI18n: L('온라인으로', 'onlayn', 'online', 'онлайн'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['hobbies', 'matching'],
  },

  en_s1u7_n3_004_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['I', 'like', 'taking', 'photos', 'watching', 'music', 'play'],
    answer: 'I like taking photos',
    answerTranslation: L(
      '저는 사진 찍는 것을 좋아해요.',
      'Men suratga olishni yoqtiraman.',
      'I like taking photos.',
      'Я люблю фотографировать.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['like-ing', 'photos'],
  },

  en_s1u7_n3_005_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['music', 'to', 'listen', 'I', 'like', 'listening', 'at', 'home'],
    answer: 'I like listening to music',
    audioText: 'I like listening to music.',
    answerTranslation: L(
      '저는 음악 듣는 것을 좋아해요.',
      'Men musiqa tinglashni yoqtiraman.',
      'I like listening to music.',
      'Я люблю слушать музыку.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['like-ing', 'music'],
  },

  en_s1u7_n3_006_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'hobby',
        native: 'hobbi',
        nativeI18n: L('취미', 'hobbi', 'hobby', 'хобби'),
      },
      {
        text: 'cinema',
        native: 'kinoteatr',
        nativeI18n: L('영화관', 'kinoteatr', 'cinema', 'кинотеатр'),
      },
      {
        text: 'theatre',
        native: 'teatr',
        nativeI18n: L('극장', 'teatr', 'theatre', 'театр'),
      },
      {
        text: 'music',
        native: 'musiqa',
        nativeI18n: L('음악', 'musiqa', 'music', 'музыка'),
      },
      {
        text: 'online',
        native: 'onlayn',
        nativeI18n: L('온라인으로', 'onlayn', 'online', 'онлайн'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['hobbies', 'listening'],
  },

  en_s1u7_n3_007_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Photography is my ',
    sentenceSuffix: '.',
    answer: 'hobby',
    answerTranslation: L(
      '사진 촬영은 제 취미예요.',
      'Fotografiya mening hobbim.',
      'Photography is my hobby.',
      'Фотография — моё хобби.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "hobby".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'hobby'],
  },

  en_s1u7_n3_008_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'music',
    choices: [
      { text: 'cinema', label: '🎬', emoji: '🎬', imageUrl: '' },
      { text: 'dance', label: '💃', emoji: '💃', imageUrl: '' },
      { text: 'music', label: '🎵', emoji: '🎵', imageUrl: '' },
      { text: 'theatre', label: '🎭', emoji: '🎭', imageUrl: '' },
    ],
    answerTranslation: L('음악', 'musiqa', 'music', 'музыка'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['music'],
  },

  en_s1u7_n3_009_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'They like playing video games.',
    audioText: 'They like playing video games.',
    answerI18n: L(
      '그들은 비디오 게임 하는 것을 좋아해요',
      'Ular video o‘yin o‘ynashni yoqtiradilar',
      'They like playing video games',
      'Они любят играть в видеоигры',
    ),
    options: ['They', 'like', 'playing', 'video', 'games', 'watching', 'music'],
    optionsI18n: {
      ko: ['그들은', '비디오', '게임', '하는', '것을', '좋아해요'],
      uz: ['Ular', 'video', 'o‘yin', 'o‘ynashni', 'yoqtiradilar'],
      en: ['They', 'like', 'playing', 'video', 'games'],
      ru: ['Они', 'любят', 'играть', 'в', 'видеоигры'],
    },
    answerTranslation: L(
      '그들은 비디오 게임 하는 것을 좋아해요.',
      'Ular video o‘yin o‘ynashni yoqtiradilar.',
      'They like playing video games.',
      'Они любят играть в видеоигры.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['like-ing', 'games'],
  },

  en_s1u7_n3_010_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What do you like doing in your free time?',
    options: [
      'I',
      'like',
      'reading',
      'and',
      'listening',
      'to',
      'music',
      'cook',
      'online',
    ],
    answer: 'I like reading and listening to music',
    answerTranslation: L(
      '저는 독서하고 음악 듣는 것을 좋아해요.',
      'Men kitob o‘qishni va musiqa tinglashni yoqtiraman.',
      'I like reading and listening to music.',
      'Я люблю читать и слушать музыку.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['hobbies', 'reply'],
  },

  en_s1u7_n3_011_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I listen to ',
    sentenceSuffix: ' at home.',
    answer: 'music',
    answerTranslation: L(
      '저는 집에서 음악을 들어요.',
      'Men uyda musiqa tinglayman.',
      'I listen to music at home.',
      'Я слушаю музыку дома.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "music".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'music'],
  },

  en_s1u7_n3_012_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'travel',
        native: 'sayohat qilmoq',
        nativeI18n: L('여행하다', 'sayohat qilmoq', 'travel', 'путешествовать'),
      },
      {
        text: 'cook',
        native: 'ovqat pishirmoq',
        nativeI18n: L('요리하다', 'ovqat pishirmoq', 'cook', 'готовить'),
      },
      {
        text: 'read',
        native: 'o‘qimoq',
        nativeI18n: L('읽다', 'o‘qimoq', 'read', 'читать'),
      },
      {
        text: 'dance',
        native: 'raqsga tushmoq',
        nativeI18n: L('춤추다', 'raqsga tushmoq', 'dance', 'танцевать'),
      },
      {
        text: 'music',
        native: 'musiqa',
        nativeI18n: L('음악', 'musiqa', 'music', 'музыка'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['hobbies', 'matching'],
  },

  en_s1u7_n3_013_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['We', 'like', 'going', 'to', 'the', 'cinema', 'theatre', 'watch'],
    answer: 'We like going to the cinema',
    answerTranslation: L(
      '우리는 영화관에 가는 것을 좋아해요.',
      'Biz kinoteatrga borishni yoqtiramiz.',
      'We like going to the cinema.',
      'Мы любим ходить в кино.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['cinema', 'like-ing'],
  },

  en_s1u7_n3_014_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'travel',
        native: 'sayohat qilmoq',
        nativeI18n: L('여행하다', 'sayohat qilmoq', 'travel', 'путешествовать'),
      },
      {
        text: 'cook',
        native: 'ovqat pishirmoq',
        nativeI18n: L('요리하다', 'ovqat pishirmoq', 'cook', 'готовить'),
      },
      {
        text: 'read',
        native: 'o‘qimoq',
        nativeI18n: L('읽다', 'o‘qimoq', 'read', 'читать'),
      },
      {
        text: 'dance',
        native: 'raqsga tushmoq',
        nativeI18n: L('춤추다', 'raqsga tushmoq', 'dance', 'танцевать'),
      },
      {
        text: 'music',
        native: 'musiqa',
        nativeI18n: L('음악', 'musiqa', 'music', 'музыка'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['hobbies', 'listening'],
  },

  en_s1u7_n3_015_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'dance',
    choices: [
      { text: 'music', label: '🎵', emoji: '🎵', imageUrl: '' },
      { text: 'cinema', label: '🎬', emoji: '🎬', imageUrl: '' },
      { text: 'dance', label: '💃', emoji: '💃', imageUrl: '' },
      { text: 'theatre', label: '🎭', emoji: '🎭', imageUrl: '' },
    ],
    answerTranslation: L('춤추다', 'raqsga tushmoq', 'dance', 'танцевать'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['dance'],
  },

  en_s1u7_n3_016_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'He shops ___.',
    blankAnswers: ['online'],
    options: ['online', 'cinema', 'music', 'hobby'],
    answer: 'online',
    answerTranslation: L(
      '그는 온라인으로 쇼핑해요.',
      'U onlayn xarid qiladi.',
      'He shops online.',
      'Он делает покупки онлайн.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['online'],
  },

  en_s1u7_n3_017_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'We often go to the ',
    sentenceSuffix: ' to watch films.',
    answer: 'cinema',
    answerTranslation: L(
      '우리는 영화를 보러 영화관에 자주 가요.',
      'Biz film ko‘rish uchun tez-tez kinoteatrga boramiz.',
      'We often go to the cinema to watch films.',
      'Мы часто ходим в кинотеатр смотреть фильмы.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "cinema".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'cinema'],
  },

  en_s1u7_n3_018_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'friends',
      'out',
      'with',
      'going',
      'like',
      'I',
      'music',
      'cinema',
    ],
    answer: 'I like going out with friends',
    audioText: 'I like going out with friends.',
    answerTranslation: L(
      '저는 친구들과 외출하는 것을 좋아해요.',
      'Men do‘stlarim bilan tashqariga chiqishni yoqtiraman.',
      'I like going out with friends.',
      'Я люблю гулять с друзьями.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['hobbies', 'going-out'],
  },

  en_s1u7_n3_019_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'theatre',
    choices: [
      { text: 'cinema', label: '🎬', emoji: '🎬', imageUrl: '' },
      { text: 'music', label: '🎵', emoji: '🎵', imageUrl: '' },
      { text: 'hobby', label: '🎯', emoji: '🎯', imageUrl: '' },
      { text: 'theatre', label: '🎭', emoji: '🎭', imageUrl: '' },
    ],
    answerTranslation: L('극장', 'teatr', 'theatre', 'театр'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['theatre'],
  },

  en_s1u7_n3_020_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'What do you like doing in your free time?' },
    ],
    options: [
      'I like reading and listening to music.',
      'I like read and music.',
      'I am like reading.',
      'I reading likes music.',
    ],
    answer: 'I like reading and listening to music.',
    answerTranslation: L(
      '저는 독서하고 음악 듣는 것을 좋아해요.',
      'Men kitob o‘qishni va musiqa tinglashni yoqtiraman.',
      'I like reading and listening to music.',
      'Я люблю читать и слушать музыку.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['hobbies', 'dialog'],
  },

  // ===========================================================
  // Lesson 2 · Like + -ing
  // ===========================================================

  en_s1u7_n3_021_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I like swimming.',
    audioText: 'I like swimming.',
    answerTranslation: L(
      '저는 수영하는 것을 좋아해요.',
      'Men suzishni yoqtiraman.',
      'I like swimming.',
      'Я люблю плавать.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['like-ing', 'swimming'],
  },

  en_s1u7_n3_022_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'dance',
    choices: [
      { text: 'music', label: '🎵', emoji: '🎵', imageUrl: '' },
      { text: 'dance', label: '💃', emoji: '💃', imageUrl: '' },
      { text: 'cinema', label: '🎬', emoji: '🎬', imageUrl: '' },
      { text: 'online', label: '💻', emoji: '💻', imageUrl: '' },
    ],
    answerTranslation: L('춤추다', 'raqsga tushmoq', 'dance', 'танцевать'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['dance'],
  },

  en_s1u7_n3_023_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'dance',
        native: 'raqsga tushmoq',
        nativeI18n: L('춤추다', 'raqsga tushmoq', 'dance', 'танцевать'),
      },
      {
        text: 'music',
        native: 'musiqa',
        nativeI18n: L('음악', 'musiqa', 'music', 'музыка'),
      },
      {
        text: 'cinema',
        native: 'kinoteatr',
        nativeI18n: L('영화관', 'kinoteatr', 'cinema', 'кинотеатр'),
      },
      {
        text: 'theatre',
        native: 'teatr',
        nativeI18n: L('극장', 'teatr', 'theatre', 'театр'),
      },
      {
        text: 'online',
        native: 'onlayn',
        nativeI18n: L('온라인으로', 'onlayn', 'online', 'онлайн'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['hobbies', 'matching'],
  },

  en_s1u7_n3_024_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['She', 'likes', 'swimming', 'swim', 'music', 'like', 'reading'],
    answer: 'She likes swimming',
    answerTranslation: L(
      '그녀는 수영하는 것을 좋아해요.',
      'U suzishni yoqtiradi.',
      'She likes swimming.',
      'Она любит плавать.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['like-ing', 'grammar'],
  },

  en_s1u7_n3_025_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['photos', 'taking', 'likes', 'She', 'take', 'reading', 'music'],
    answer: 'She likes taking photos',
    audioText: 'She likes taking photos.',
    answerTranslation: L(
      '그녀는 사진 찍는 것을 좋아해요.',
      'U suratga olishni yoqtiradi.',
      'She likes taking photos.',
      'Она любит фотографировать.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['like-ing', 'photos'],
  },

  en_s1u7_n3_026_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'dance',
        native: 'raqsga tushmoq',
        nativeI18n: L('춤추다', 'raqsga tushmoq', 'dance', 'танцевать'),
      },
      {
        text: 'music',
        native: 'musiqa',
        nativeI18n: L('음악', 'musiqa', 'music', 'музыка'),
      },
      {
        text: 'cinema',
        native: 'kinoteatr',
        nativeI18n: L('영화관', 'kinoteatr', 'cinema', 'кинотеатр'),
      },
      {
        text: 'theatre',
        native: 'teatr',
        nativeI18n: L('극장', 'teatr', 'theatre', 'театр'),
      },
      {
        text: 'online',
        native: 'onlayn',
        nativeI18n: L('온라인으로', 'onlayn', 'online', 'онлайн'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['hobbies', 'listening'],
  },

  en_s1u7_n3_027_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I like ',
    sentenceSuffix: ' books.',
    answer: 'reading',
    answerTranslation: L(
      '저는 책 읽는 것을 좋아해요.',
      'Men kitob o‘qishni yoqtiraman.',
      'I like reading books.',
      'Я люблю читать книги.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is the -ing form "reading".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'like-ing'],
  },

  en_s1u7_n3_028_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'cinema',
    choices: [
      { text: 'music', label: '🎵', emoji: '🎵', imageUrl: '' },
      { text: 'theatre', label: '🎭', emoji: '🎭', imageUrl: '' },
      { text: 'cinema', label: '🎬', emoji: '🎬', imageUrl: '' },
      { text: 'dance', label: '💃', emoji: '💃', imageUrl: '' },
    ],
    answerTranslation: L('영화관', 'kinoteatr', 'cinema', 'кинотеатр'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['cinema'],
  },

  en_s1u7_n3_029_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'He likes listening to music.',
    audioText: 'He likes listening to music.',
    answerI18n: L(
      '그는 음악 듣는 것을 좋아해요',
      'U musiqa tinglashni yoqtiradi',
      'He likes listening to music',
      'Он любит слушать музыку',
    ),
    options: ['He', 'likes', 'listening', 'to', 'music', 'listen', 'reading'],
    optionsI18n: {
      ko: ['그는', '음악', '듣는', '것을', '좋아해요'],
      uz: ['U', 'musiqa', 'tinglashni', 'yoqtiradi'],
      en: ['He', 'likes', 'listening', 'to', 'music'],
      ru: ['Он', 'любит', 'слушать', 'музыку'],
    },
    answerTranslation: L(
      '그는 음악 듣는 것을 좋아해요.',
      'U musiqa tinglashni yoqtiradi.',
      'He likes listening to music.',
      'Он любит слушать музыку.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['like-ing', 'music'],
  },

  en_s1u7_n3_030_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Do you like going out?',
    options: ['Yes', 'I', 'do', 'I', 'like', 'going', 'out', 'No', 'reading'],
    answer: 'Yes I do I like going out',
    answerTranslation: L(
      '네. 저는 외출하는 것을 좋아해요.',
      'Ha. Men tashqariga chiqishni yoqtiraman.',
      'Yes, I do. I like going out.',
      'Да. Я люблю гулять.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['like-ing', 'reply'],
  },

  en_s1u7_n3_031_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'She likes ',
    sentenceSuffix: ' photos.',
    answer: 'taking',
    answerTranslation: L(
      '그녀는 사진 찍는 것을 좋아해요.',
      'U suratga olishni yoqtiradi.',
      'She likes taking photos.',
      'Она любит фотографировать.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is the -ing form "taking".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'like-ing'],
  },

  en_s1u7_n3_032_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'read',
        native: 'o‘qimoq',
        nativeI18n: L('읽다', 'o‘qimoq', 'read', 'читать'),
      },
      {
        text: 'cook',
        native: 'ovqat pishirmoq',
        nativeI18n: L('요리하다', 'ovqat pishirmoq', 'cook', 'готовить'),
      },
      {
        text: 'swim',
        native: 'suzmoq',
        nativeI18n: L('수영하다', 'suzmoq', 'swim', 'плавать'),
      },
      {
        text: 'dance',
        native: 'raqsga tushmoq',
        nativeI18n: L('춤추다', 'raqsga tushmoq', 'dance', 'танцевать'),
      },
      {
        text: 'travel',
        native: 'sayohat qilmoq',
        nativeI18n: L('여행하다', 'sayohat qilmoq', 'travel', 'путешествовать'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['activities', 'matching'],
  },

  en_s1u7_n3_033_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['He', 'doesn’t', 'like', 'going', 'out', 'go', 'likes', 'music'],
    answer: 'He doesn’t like going out',
    answerTranslation: L(
      '그는 외출하는 것을 좋아하지 않아요.',
      'U tashqariga chiqishni yoqtirmaydi.',
      'He doesn’t like going out.',
      'Он не любит выходить из дома.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['like-ing', 'negative'],
  },

  en_s1u7_n3_034_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'read',
        native: 'o‘qimoq',
        nativeI18n: L('읽다', 'o‘qimoq', 'read', 'читать'),
      },
      {
        text: 'cook',
        native: 'ovqat pishirmoq',
        nativeI18n: L('요리하다', 'ovqat pishirmoq', 'cook', 'готовить'),
      },
      {
        text: 'swim',
        native: 'suzmoq',
        nativeI18n: L('수영하다', 'suzmoq', 'swim', 'плавать'),
      },
      {
        text: 'dance',
        native: 'raqsga tushmoq',
        nativeI18n: L('춤추다', 'raqsga tushmoq', 'dance', 'танцевать'),
      },
      {
        text: 'travel',
        native: 'sayohat qilmoq',
        nativeI18n: L('여행하다', 'sayohat qilmoq', 'travel', 'путешествовать'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['activities', 'listening'],
  },

  en_s1u7_n3_035_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'online',
    choices: [
      { text: 'cinema', label: '🎬', emoji: '🎬', imageUrl: '' },
      { text: 'music', label: '🎵', emoji: '🎵', imageUrl: '' },
      { text: 'online', label: '💻', emoji: '💻', imageUrl: '' },
      { text: 'theatre', label: '🎭', emoji: '🎭', imageUrl: '' },
    ],
    answerTranslation: L('온라인으로', 'onlayn', 'online', 'онлайн'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['online'],
  },

  en_s1u7_n3_036_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I like ___ music.',
    blankAnswers: ['listening to'],
    options: ['listening to', 'listen', 'listens', 'listening'],
    answer: 'listening to',
    answerTranslation: L(
      '저는 음악 듣는 것을 좋아해요.',
      'Men musiqa tinglashni yoqtiraman.',
      'I like listening to music.',
      'Я люблю слушать музыку.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['like-ing', 'music'],
  },

  en_s1u7_n3_037_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'He likes ',
    sentenceSuffix: ' to music.',
    answer: 'listening',
    answerTranslation: L(
      '그는 음악 듣는 것을 좋아해요.',
      'U musiqa tinglashni yoqtiradi.',
      'He likes listening to music.',
      'Он любит слушать музыку.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is the -ing form "listening".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'like-ing'],
  },

  en_s1u7_n3_038_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['shopping', 'going', 'likes', 'She', 'online', 'go', 'shop'],
    answer: 'She likes going shopping',
    audioText: 'She likes going shopping.',
    answerTranslation: L(
      '그녀는 쇼핑하러 가는 것을 좋아해요.',
      'U xarid qilishga borishni yoqtiradi.',
      'She likes going shopping.',
      'Она любит ходить по магазинам.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['like-ing', 'shopping'],
  },

  en_s1u7_n3_039_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What does your sister like doing?',
    options: [
      'She',
      'likes',
      'dancing',
      'and',
      'listening',
      'to',
      'music',
      'dance',
      'read',
    ],
    answer: 'She likes dancing and listening to music',
    answerTranslation: L(
      '그녀는 춤추고 음악 듣는 것을 좋아해요.',
      'U raqsga tushishni va musiqa tinglashni yoqtiradi.',
      'She likes dancing and listening to music.',
      'Она любит танцевать и слушать музыку.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['dance', 'music', 'reply'],
  },

  en_s1u7_n3_040_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Do you like going out in the evening?' },
    ],
    options: [
      'Yes, I do. I like seeing my friends.',
      'Yes, I like see my friends.',
      'Yes, I am going like.',
      'I do liking my friends.',
    ],
    answer: 'Yes, I do. I like seeing my friends.',
    answerTranslation: L(
      '네. 저는 친구들을 만나는 것을 좋아해요.',
      'Ha. Men do‘stlarimni ko‘rishni yoqtiraman.',
      'Yes, I do. I like seeing my friends.',
      'Да. Я люблю встречаться с друзьями.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['like-ing', 'dialog'],
  },

  // ===========================================================
  // Lesson 3 · Love, like and hate
  // ===========================================================

  en_s1u7_n3_041_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I love cooking.',
    audioText: 'I love cooking.',
    answerTranslation: L(
      '저는 요리하는 것을 아주 좋아해요.',
      'Men ovqat pishirishni juda yaxshi ko‘raman.',
      'I love cooking.',
      'Я очень люблю готовить.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['love', 'cooking'],
  },

  en_s1u7_n3_042_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'music',
    choices: [
      { text: 'theatre', label: '🎭', emoji: '🎭', imageUrl: '' },
      { text: 'music', label: '🎵', emoji: '🎵', imageUrl: '' },
      { text: 'cinema', label: '🎬', emoji: '🎬', imageUrl: '' },
      { text: 'dance', label: '💃', emoji: '💃', imageUrl: '' },
    ],
    answerTranslation: L('음악', 'musiqa', 'music', 'музыка'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['music'],
  },

  en_s1u7_n3_043_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'love',
        native: 'juda yaxshi ko‘rmoq',
        nativeI18n: L(
          '매우 좋아하다',
          'juda yaxshi ko‘rmoq',
          'love',
          'очень любить',
        ),
      },
      {
        text: 'hate',
        native: 'yomon ko‘rmoq',
        nativeI18n: L('매우 싫어하다', 'yomon ko‘rmoq', 'hate', 'ненавидеть'),
      },
      {
        text: 'dance',
        native: 'raqsga tushmoq',
        nativeI18n: L('춤추다', 'raqsga tushmoq', 'dance', 'танцевать'),
      },
      {
        text: 'music',
        native: 'musiqa',
        nativeI18n: L('음악', 'musiqa', 'music', 'музыка'),
      },
      {
        text: 'hobby',
        native: 'hobbi',
        nativeI18n: L('취미', 'hobbi', 'hobby', 'хобби'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['preferences', 'matching'],
  },

  en_s1u7_n3_044_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['I', 'love', 'cooking', 'cook', 'hate', 'music', 'playing'],
    answer: 'I love cooking',
    answerTranslation: L(
      '저는 요리하는 것을 아주 좋아해요.',
      'Men ovqat pishirishni juda yaxshi ko‘raman.',
      'I love cooking.',
      'Я очень люблю готовить.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['love', 'cooking'],
  },

  en_s1u7_n3_045_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['football', 'playing', 'hate', 'I', 'like', 'play', 'music'],
    answer: 'I hate playing football',
    audioText: 'I hate playing football.',
    answerTranslation: L(
      '저는 축구하는 것을 정말 싫어해요.',
      'Men futbol o‘ynashni yomon ko‘raman.',
      'I hate playing football.',
      'Я ненавижу играть в футбол.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['hate', 'football'],
  },

  en_s1u7_n3_046_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'love',
        native: 'juda yaxshi ko‘rmoq',
        nativeI18n: L(
          '매우 좋아하다',
          'juda yaxshi ko‘rmoq',
          'love',
          'очень любить',
        ),
      },
      {
        text: 'hate',
        native: 'yomon ko‘rmoq',
        nativeI18n: L('매우 싫어하다', 'yomon ko‘rmoq', 'hate', 'ненавидеть'),
      },
      {
        text: 'dance',
        native: 'raqsga tushmoq',
        nativeI18n: L('춤추다', 'raqsga tushmoq', 'dance', 'танцевать'),
      },
      {
        text: 'music',
        native: 'musiqa',
        nativeI18n: L('음악', 'musiqa', 'music', 'музыка'),
      },
      {
        text: 'hobby',
        native: 'hobbi',
        nativeI18n: L('취미', 'hobbi', 'hobby', 'хобби'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['preferences', 'listening'],
  },

  en_s1u7_n3_047_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I ',
    sentenceSuffix: ' cooking.',
    answer: 'love',
    answerTranslation: L(
      '저는 요리하는 것을 아주 좋아해요.',
      'Men ovqat pishirishni juda yaxshi ko‘raman.',
      'I love cooking.',
      'Я очень люблю готовить.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "love".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'love'],
  },

  en_s1u7_n3_048_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'theatre',
    choices: [
      { text: 'music', label: '🎵', emoji: '🎵', imageUrl: '' },
      { text: 'online', label: '💻', emoji: '💻', imageUrl: '' },
      { text: 'theatre', label: '🎭', emoji: '🎭', imageUrl: '' },
      { text: 'cinema', label: '🎬', emoji: '🎬', imageUrl: '' },
    ],
    answerTranslation: L('극장', 'teatr', 'theatre', 'театр'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['theatre'],
  },

  en_s1u7_n3_049_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'She loves going out with friends.',
    audioText: 'She loves going out with friends.',
    answerI18n: L(
      '그녀는 친구들과 외출하는 것을 아주 좋아해요',
      'U do‘stlari bilan tashqariga chiqishni juda yaxshi ko‘radi',
      'She loves going out with friends',
      'Она очень любит гулять с друзьями',
    ),
    options: [
      'She',
      'loves',
      'going',
      'out',
      'with',
      'friends',
      'hates',
      'reading',
    ],
    optionsI18n: {
      ko: ['그녀는', '친구들과', '외출하는', '것을', '아주', '좋아해요'],
      uz: [
        'U',
        'do‘stlari',
        'bilan',
        'tashqariga',
        'chiqishni',
        'juda',
        'yaxshi',
        'ko‘radi',
      ],
      en: ['She', 'loves', 'going', 'out', 'with', 'friends'],
      ru: ['Она', 'очень', 'любит', 'гулять', 'с', 'друзьями'],
    },
    answerTranslation: L(
      '그녀는 친구들과 외출하는 것을 아주 좋아해요.',
      'U do‘stlari bilan tashqariga chiqishni juda yaxshi ko‘radi.',
      'She loves going out with friends.',
      'Она очень любит гулять с друзьями.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['love', 'going-out'],
  },

  en_s1u7_n3_050_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Do you like playing football?',
    options: ['No', 'I', 'hate', 'playing', 'football', 'love', 'Yes', 'music'],
    answer: 'No I hate playing football',
    answerTranslation: L(
      '아니요, 저는 축구하는 것을 정말 싫어해요.',
      'Yo‘q, men futbol o‘ynashni yomon ko‘raman.',
      'No, I hate playing football.',
      'Нет, я ненавижу играть в футбол.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['hate', 'reply'],
  },

  en_s1u7_n3_051_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I ',
    sentenceSuffix: ' playing football.',
    answer: 'hate',
    answerTranslation: L(
      '저는 축구하는 것을 정말 싫어해요.',
      'Men futbol o‘ynashni yomon ko‘raman.',
      'I hate playing football.',
      'Я ненавижу играть в футбол.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "hate".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'hate'],
  },

  en_s1u7_n3_052_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'love',
        native: 'juda yaxshi ko‘rmoq',
        nativeI18n: L(
          '매우 좋아하다',
          'juda yaxshi ko‘rmoq',
          'love',
          'очень любить',
        ),
      },
      {
        text: 'hate',
        native: 'yomon ko‘rmoq',
        nativeI18n: L('매우 싫어하다', 'yomon ko‘rmoq', 'hate', 'ненавидеть'),
      },
      {
        text: 'cinema',
        native: 'kinoteatr',
        nativeI18n: L('영화관', 'kinoteatr', 'cinema', 'кинотеатр'),
      },
      {
        text: 'online',
        native: 'onlayn',
        nativeI18n: L('온라인으로', 'onlayn', 'online', 'онлайн'),
      },
      {
        text: 'music',
        native: 'musiqa',
        nativeI18n: L('음악', 'musiqa', 'music', 'музыка'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['preferences', 'matching'],
  },

  en_s1u7_n3_053_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['She', 'loves', 'dancing', 'dance', 'hates', 'music', 'playing'],
    answer: 'She loves dancing',
    answerTranslation: L(
      '그녀는 춤추는 것을 아주 좋아해요.',
      'U raqsga tushishni juda yaxshi ko‘radi.',
      'She loves dancing.',
      'Она очень любит танцевать.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['love', 'dance'],
  },

  en_s1u7_n3_054_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'love',
        native: 'juda yaxshi ko‘rmoq',
        nativeI18n: L(
          '매우 좋아하다',
          'juda yaxshi ko‘rmoq',
          'love',
          'очень любить',
        ),
      },
      {
        text: 'hate',
        native: 'yomon ko‘rmoq',
        nativeI18n: L('매우 싫어하다', 'yomon ko‘rmoq', 'hate', 'ненавидеть'),
      },
      {
        text: 'cinema',
        native: 'kinoteatr',
        nativeI18n: L('영화관', 'kinoteatr', 'cinema', 'кинотеатр'),
      },
      {
        text: 'online',
        native: 'onlayn',
        nativeI18n: L('온라인으로', 'onlayn', 'online', 'онлайн'),
      },
      {
        text: 'music',
        native: 'musiqa',
        nativeI18n: L('음악', 'musiqa', 'music', 'музыка'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['preferences', 'listening'],
  },

  en_s1u7_n3_055_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'dance',
    choices: [
      { text: 'music', label: '🎵', emoji: '🎵', imageUrl: '' },
      { text: 'cinema', label: '🎬', emoji: '🎬', imageUrl: '' },
      { text: 'online', label: '💻', emoji: '💻', imageUrl: '' },
      { text: 'dance', label: '💃', emoji: '💃', imageUrl: '' },
    ],
    answerTranslation: L('춤추다', 'raqsga tushmoq', 'dance', 'танцевать'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['dance'],
  },

  en_s1u7_n3_056_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I hate ___ football.',
    blankAnswers: ['playing'],
    options: ['playing', 'play', 'plays', 'played'],
    answer: 'playing',
    answerTranslation: L(
      '저는 축구하는 것을 정말 싫어해요.',
      'Men futbol o‘ynashni yomon ko‘raman.',
      'I hate playing football.',
      'Я ненавижу играть в футбол.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['hate', 'verb-ing'],
  },

  en_s1u7_n3_057_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'My sister likes ',
    sentenceSuffix: '.',
    answer: 'dancing',
    answerTranslation: L(
      '제 여동생은 춤추는 것을 좋아해요.',
      'Singlim raqsga tushishni yoqtiradi.',
      'My sister likes dancing.',
      'Моя сестра любит танцевать.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is the -ing form "dancing".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'dance'],
  },

  en_s1u7_n3_058_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['reading', 'doesn’t', 'like', 'He', 'books', 'hates', 'music'],
    answer: 'He doesn’t like reading',
    audioText: 'He doesn’t like reading.',
    answerTranslation: L(
      '그는 독서하는 것을 좋아하지 않아요.',
      'U kitob o‘qishni yoqtirmaydi.',
      'He doesn’t like reading.',
      'Он не любит читать.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['dont-like', 'reading'],
  },

  en_s1u7_n3_059_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Do you like cooking?',
    options: ['Yes', 'I', 'love', 'cooking', 'hate', 'No', 'playing'],
    answer: 'Yes I love cooking',
    answerTranslation: L(
      '네, 저는 요리하는 것을 아주 좋아해요.',
      'Ha, men ovqat pishirishni juda yaxshi ko‘raman.',
      'Yes, I love cooking.',
      'Да, я очень люблю готовить.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['love', 'cooking', 'reply'],
  },

  en_s1u7_n3_060_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Do you like running?' }],
    options: [
      'No, I don’t. I like walking.',
      'No, I not like run.',
      'No, I am walking like.',
      'I don’t likes running.',
    ],
    answer: 'No, I don’t. I like walking.',
    answerTranslation: L(
      '아니요. 저는 걷는 것을 좋아해요.',
      'Yo‘q. Men piyoda yurishni yoqtiraman.',
      'No, I don’t. I like walking.',
      'Нет. Я люблю ходить пешком.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['preferences', 'dialog'],
  },

  // ===========================================================
  // Lesson 4 · Talk about your hobbies
  // ===========================================================

  en_s1u7_n3_061_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I like going out with friends.',
    audioText: 'I like going out with friends.',
    answerTranslation: L(
      '저는 친구들과 외출하는 것을 좋아해요.',
      'Men do‘stlarim bilan tashqariga chiqishni yoqtiraman.',
      'I like going out with friends.',
      'Я люблю гулять с друзьями.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['hobbies', 'going-out'],
  },

  en_s1u7_n3_062_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'cinema',
    choices: [
      { text: 'dance', label: '💃', emoji: '💃', imageUrl: '' },
      { text: 'music', label: '🎵', emoji: '🎵', imageUrl: '' },
      { text: 'cinema', label: '🎬', emoji: '🎬', imageUrl: '' },
      { text: 'theatre', label: '🎭', emoji: '🎭', imageUrl: '' },
    ],
    answerTranslation: L('영화관', 'kinoteatr', 'cinema', 'кинотеатр'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['cinema'],
  },

  en_s1u7_n3_063_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'hobby',
        native: 'hobbi',
        nativeI18n: L('취미', 'hobbi', 'hobby', 'хобби'),
      },
      {
        text: 'dance',
        native: 'raqsga tushmoq',
        nativeI18n: L('춤추다', 'raqsga tushmoq', 'dance', 'танцевать'),
      },
      {
        text: 'love',
        native: 'juda yaxshi ko‘rmoq',
        nativeI18n: L(
          '매우 좋아하다',
          'juda yaxshi ko‘rmoq',
          'love',
          'очень любить',
        ),
      },
      {
        text: 'hate',
        native: 'yomon ko‘rmoq',
        nativeI18n: L('매우 싫어하다', 'yomon ko‘rmoq', 'hate', 'ненавидеть'),
      },
      {
        text: 'online',
        native: 'onlayn',
        nativeI18n: L('온라인으로', 'onlayn', 'online', 'онлайн'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['review', 'matching'],
  },

  en_s1u7_n3_064_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'I',
      'like',
      'watching',
      'sport',
      'and',
      'seeing',
      'my',
      'friends',
      'play',
      'music',
    ],
    answer: 'I like watching sport and seeing my friends',
    answerTranslation: L(
      '저는 스포츠를 보고 친구들을 만나는 것을 좋아해요.',
      'Men sport ko‘rishni va do‘stlarim bilan uchrashishni yoqtiraman.',
      'I like watching sport and seeing my friends.',
      'Я люблю смотреть спорт и встречаться с друзьями.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['hobbies', 'like-ing'],
  },

  en_s1u7_n3_065_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'music',
      'listening',
      'and',
      'reading',
      'likes',
      'He',
      'to',
      'watching',
    ],
    answer: 'He likes reading and listening to music',
    audioText: 'He likes reading and listening to music.',
    answerTranslation: L(
      '그는 독서하고 음악 듣는 것을 좋아해요.',
      'U kitob o‘qishni va musiqa tinglashni yoqtiradi.',
      'He likes reading and listening to music.',
      'Он любит читать и слушать музыку.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['reading', 'music', 'like-ing'],
  },

  en_s1u7_n3_066_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'hobby',
        native: 'hobbi',
        nativeI18n: L('취미', 'hobbi', 'hobby', 'хобби'),
      },
      {
        text: 'dance',
        native: 'raqsga tushmoq',
        nativeI18n: L('춤추다', 'raqsga tushmoq', 'dance', 'танцевать'),
      },
      {
        text: 'love',
        native: 'juda yaxshi ko‘rmoq',
        nativeI18n: L(
          '매우 좋아하다',
          'juda yaxshi ko‘rmoq',
          'love',
          'очень любить',
        ),
      },
      {
        text: 'hate',
        native: 'yomon ko‘rmoq',
        nativeI18n: L('매우 싫어하다', 'yomon ko‘rmoq', 'hate', 'ненавидеть'),
      },
      {
        text: 'online',
        native: 'onlayn',
        nativeI18n: L('온라인으로', 'onlayn', 'online', 'онлайн'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['review', 'listening'],
  },

  en_s1u7_n3_067_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'My sister likes ',
    sentenceSuffix: '.',
    answer: 'dancing',
    answerTranslation: L(
      '제 여동생은 춤추는 것을 좋아해요.',
      'Singlim raqsga tushishni yoqtiradi.',
      'My sister likes dancing.',
      'Моя сестра любит танцевать.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "dancing".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'dance'],
  },

  en_s1u7_n3_068_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'theatre',
    choices: [
      { text: 'cinema', label: '🎬', emoji: '🎬', imageUrl: '' },
      { text: 'online', label: '💻', emoji: '💻', imageUrl: '' },
      { text: 'theatre', label: '🎭', emoji: '🎭', imageUrl: '' },
      { text: 'music', label: '🎵', emoji: '🎵', imageUrl: '' },
    ],
    answerTranslation: L('극장', 'teatr', 'theatre', 'театр'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['theatre'],
  },

  en_s1u7_n3_069_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'I like getting up late and going shopping.',
    audioText: 'I like getting up late and going shopping.',
    answerI18n: L(
      '저는 늦게 일어나고 쇼핑하러 가는 것을 좋아해요',
      'Men kech turishni va xarid qilishga borishni yoqtiraman',
      'I like getting up late and going shopping',
      'Я люблю поздно вставать и ходить по магазинам',
    ),
    options: [
      'I',
      'like',
      'getting',
      'up',
      'late',
      'and',
      'going',
      'shopping',
      'go',
      'early',
    ],
    optionsI18n: {
      ko: ['저는', '늦게', '일어나고', '쇼핑하러', '가는', '것을', '좋아해요'],
      uz: [
        'Men',
        'kech',
        'turishni',
        'va',
        'xarid',
        'qilishga',
        'borishni',
        'yoqtiraman',
      ],
      en: ['I', 'like', 'getting', 'up', 'late', 'and', 'going', 'shopping'],
      ru: [
        'Я',
        'люблю',
        'поздно',
        'вставать',
        'и',
        'ходить',
        'по',
        'магазинам',
      ],
    },
    answerTranslation: L(
      '저는 늦게 일어나고 쇼핑하러 가는 것을 좋아해요.',
      'Men kech turishni va xarid qilishga borishni yoqtiraman.',
      'I like getting up late and going shopping.',
      'Я люблю поздно вставать и ходить по магазинам.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['like-ing', 'shopping'],
  },

  en_s1u7_n3_070_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What do you like doing at weekends?',
    options: [
      'I',
      'like',
      'going',
      'to',
      'the',
      'cinema',
      'and',
      'reading',
      'music',
      'hate',
    ],
    answer: 'I like going to the cinema and reading',
    answerTranslation: L(
      '저는 영화관에 가고 독서하는 것을 좋아해요.',
      'Men kinoteatrga borishni va kitob o‘qishni yoqtiraman.',
      'I like going to the cinema and reading.',
      'Я люблю ходить в кино и читать.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['hobbies', 'reply'],
  },

  en_s1u7_n3_071_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'He shops ',
    sentenceSuffix: '.',
    answer: 'online',
    answerTranslation: L(
      '그는 온라인으로 쇼핑해요.',
      'U onlayn xarid qiladi.',
      'He shops online.',
      'Он делает покупки онлайн.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "online".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'online'],
  },

  en_s1u7_n3_072_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'cinema',
        native: 'kinoteatr',
        nativeI18n: L('영화관', 'kinoteatr', 'cinema', 'кинотеатр'),
      },
      {
        text: 'theatre',
        native: 'teatr',
        nativeI18n: L('극장', 'teatr', 'theatre', 'театр'),
      },
      {
        text: 'music',
        native: 'musiqa',
        nativeI18n: L('음악', 'musiqa', 'music', 'музыка'),
      },
      {
        text: 'dance',
        native: 'raqsga tushmoq',
        nativeI18n: L('춤추다', 'raqsga tushmoq', 'dance', 'танцевать'),
      },
      {
        text: 'hobby',
        native: 'hobbi',
        nativeI18n: L('취미', 'hobbi', 'hobby', 'хобби'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['review', 'matching'],
  },

  en_s1u7_n3_073_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'My',
      'husband',
      'likes',
      'being',
      'at',
      'home',
      'going',
      'cinema',
      'like',
    ],
    answer: 'My husband likes being at home',
    answerTranslation: L(
      '제 남편은 집에 있는 것을 좋아해요.',
      'Erim uyda bo‘lishni yoqtiradi.',
      'My husband likes being at home.',
      'Мой муж любит быть дома.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['like-ing', 'being'],
  },

  en_s1u7_n3_074_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'cinema',
        native: 'kinoteatr',
        nativeI18n: L('영화관', 'kinoteatr', 'cinema', 'кинотеатр'),
      },
      {
        text: 'theatre',
        native: 'teatr',
        nativeI18n: L('극장', 'teatr', 'theatre', 'театр'),
      },
      {
        text: 'music',
        native: 'musiqa',
        nativeI18n: L('음악', 'musiqa', 'music', 'музыка'),
      },
      {
        text: 'dance',
        native: 'raqsga tushmoq',
        nativeI18n: L('춤추다', 'raqsga tushmoq', 'dance', 'танцевать'),
      },
      {
        text: 'hobby',
        native: 'hobbi',
        nativeI18n: L('취미', 'hobbi', 'hobby', 'хобби'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['review', 'listening'],
  },

  en_s1u7_n3_075_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'music',
    choices: [
      { text: 'dance', label: '💃', emoji: '💃', imageUrl: '' },
      { text: 'cinema', label: '🎬', emoji: '🎬', imageUrl: '' },
      { text: 'theatre', label: '🎭', emoji: '🎭', imageUrl: '' },
      { text: 'music', label: '🎵', emoji: '🎵', imageUrl: '' },
    ],
    answerTranslation: L('음악', 'musiqa', 'music', 'музыка'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['music'],
  },

  en_s1u7_n3_076_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'My husband likes ___ at home.',
    blankAnswers: ['being'],
    options: ['being', 'be', 'is', 'been'],
    answer: 'being',
    answerTranslation: L(
      '제 남편은 집에 있는 것을 좋아해요.',
      'Erim uyda bo‘lishni yoqtiradi.',
      'My husband likes being at home.',
      'Мой муж любит быть дома.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['like-ing', 'being'],
  },

  en_s1u7_n3_077_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I like ',
    sentenceSuffix: ' out with friends.',
    answer: 'going',
    answerTranslation: L(
      '저는 친구들과 외출하는 것을 좋아해요.',
      'Men do‘stlarim bilan tashqariga chiqishni yoqtiraman.',
      'I like going out with friends.',
      'Я люблю гулять с друзьями.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "going".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'like-ing'],
  },

  en_s1u7_n3_078_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'photos',
      'taking',
      'and',
      'swimming',
      'likes',
      'She',
      'music',
      'reading',
    ],
    answer: 'She likes swimming and taking photos',
    audioText: 'She likes swimming and taking photos.',
    answerTranslation: L(
      '그녀는 수영하고 사진 찍는 것을 좋아해요.',
      'U suzishni va suratga olishni yoqtiradi.',
      'She likes swimming and taking photos.',
      'Она любит плавать и фотографировать.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['hobbies', 'like-ing'],
  },

  en_s1u7_n3_079_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Do you like running?',
    options: [
      'No',
      'I',
      'don’t',
      'but',
      'I',
      'like',
      'cycling',
      'running',
      'Yes',
    ],
    answer: 'No I don’t but I like cycling',
    answerTranslation: L(
      '아니요, 하지만 자전거 타는 것은 좋아해요.',
      'Yo‘q, lekin velosiped minishni yoqtiraman.',
      'No, I don’t, but I like cycling.',
      'Нет, но я люблю кататься на велосипеде.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['hobbies', 'reply'],
  },

  en_s1u7_n3_080_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'What do you like doing in your free time?' },
    ],
    options: [
      'I like going out, reading and listening to music.',
      'I like go out and read music.',
      'I am liking go cinema.',
      'I likes reading and listen.',
    ],
    answer: 'I like going out, reading and listening to music.',
    answerTranslation: L(
      '저는 외출하고, 독서하고, 음악 듣는 것을 좋아해요.',
      'Men tashqariga chiqishni, kitob o‘qishni va musiqa tinglashni yoqtiraman.',
      'I like going out, reading and listening to music.',
      'Я люблю гулять, читать и слушать музыку.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['hobbies', 'review', 'final'],
  },
};

export const EN_S1_UNIT7_NODE3 = {
  title: L(
    '저는 외출하는 것을 좋아해요',
    'Men tashqariga chiqishni yoqtiraman',
    'I like going out',
    'Я люблю гулять',
  ),
  section: 1,
  unit: 7,
  order: 3,
  isActive: true,

  lessons: [
    {
      title: L('취미와 여가 활동', 'Hobbi va bo‘sh vaqt', 'Hobbies', 'Хобби'),
      description: L(
        '영화관, 극장, 음악, 사진, 여행, 독서처럼 여가 시간에 하는 다양한 활동을 익혀요.',
        'Kinoteatr, teatr, musiqa, fotografiya, sayohat va kitob o‘qish kabi bo‘sh vaqt mashg‘ulotlarini o‘rganasiz.',
        'Learn common hobbies and free-time activities such as films, music, photography, travel and reading.',
        'Изучаем распространённые хобби и занятия в свободное время: кино, музыка, фотография, путешествия и чтение.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 1,
      questions: [
        'en_s1u7_n3_001_speaking',
        'en_s1u7_n3_002_image_choice',
        'en_s1u7_n3_003_word_matching',
        'en_s1u7_n3_004_translate_builder',
        'en_s1u7_n3_005_word_arrange',
        'en_s1u7_n3_006_audio_match',
        'en_s1u7_n3_007_type_answer',
        'en_s1u7_n3_008_image_choice',
        'en_s1u7_n3_009_sentence_builder',
        'en_s1u7_n3_010_reply_builder',
        'en_s1u7_n3_011_type_answer',
        'en_s1u7_n3_012_word_matching',
        'en_s1u7_n3_013_translate_builder',
        'en_s1u7_n3_014_audio_match',
        'en_s1u7_n3_015_image_choice',
        'en_s1u7_n3_016_fill_in_blank',
        'en_s1u7_n3_017_type_answer',
        'en_s1u7_n3_018_word_arrange',
        'en_s1u7_n3_019_image_choice',
        'en_s1u7_n3_020_dialog_complete',
      ],
    },

    {
      title: L('like + -ing', 'like + -ing', 'Like + -ing', 'Like + -ing'),
      description: L(
        '취미와 관심사를 말할 때 like 뒤에 동사의 -ing 형태를 사용하는 방법을 연습해요.',
        'Hobbi va qiziqishlar haqida gapirganda like dan keyin fe’lning -ing shaklini ishlatishni mashq qilasiz.',
        'Practise using like followed by a verb in the -ing form to talk about hobbies and interests.',
        'Практикуем конструкцию like + глагол с -ing для разговора о хобби и интересах.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 2,
      questions: [
        'en_s1u7_n3_021_speaking',
        'en_s1u7_n3_022_image_choice',
        'en_s1u7_n3_023_word_matching',
        'en_s1u7_n3_024_translate_builder',
        'en_s1u7_n3_025_word_arrange',
        'en_s1u7_n3_026_audio_match',
        'en_s1u7_n3_027_type_answer',
        'en_s1u7_n3_028_image_choice',
        'en_s1u7_n3_029_sentence_builder',
        'en_s1u7_n3_030_reply_builder',
        'en_s1u7_n3_031_type_answer',
        'en_s1u7_n3_032_word_matching',
        'en_s1u7_n3_033_translate_builder',
        'en_s1u7_n3_034_audio_match',
        'en_s1u7_n3_035_image_choice',
        'en_s1u7_n3_036_fill_in_blank',
        'en_s1u7_n3_037_type_answer',
        'en_s1u7_n3_038_word_arrange',
        'en_s1u7_n3_039_reply_builder',
        'en_s1u7_n3_040_dialog_complete',
      ],
    },

    {
      title: L(
        '좋아하는 것과 싫어하는 것',
        'Yoqtirish va yoqtirmaslik',
        'Love, like and hate',
        'Love, like и hate',
      ),
      description: L(
        'love, like, don’t like, hate 뒤에 명사나 -ing 형태를 사용해 선호도를 표현해요.',
        'Love, like, don’t like va hate dan keyin ot yoki -ing shaklini ishlatib, yoqtirish darajasini ifodalaysiz.',
        'Use love, like, don’t like and hate with nouns or -ing forms to express preferences.',
        'Используем love, like, don’t like и hate с существительными или формами на -ing для выражения предпочтений.',
      ),
      category: LessonCategory.EXPRESSION,
      level: LV,
      order: 3,
      questions: [
        'en_s1u7_n3_041_speaking',
        'en_s1u7_n3_042_image_choice',
        'en_s1u7_n3_043_word_matching',
        'en_s1u7_n3_044_translate_builder',
        'en_s1u7_n3_045_word_arrange',
        'en_s1u7_n3_046_audio_match',
        'en_s1u7_n3_047_type_answer',
        'en_s1u7_n3_048_image_choice',
        'en_s1u7_n3_049_sentence_builder',
        'en_s1u7_n3_050_reply_builder',
        'en_s1u7_n3_051_type_answer',
        'en_s1u7_n3_052_word_matching',
        'en_s1u7_n3_053_translate_builder',
        'en_s1u7_n3_054_audio_match',
        'en_s1u7_n3_055_image_choice',
        'en_s1u7_n3_056_fill_in_blank',
        'en_s1u7_n3_057_type_answer',
        'en_s1u7_n3_058_word_arrange',
        'en_s1u7_n3_059_reply_builder',
        'en_s1u7_n3_060_dialog_complete',
      ],
    },

    {
      title: L(
        '내 취미 말하기',
        'Hobbim haqida gapirish',
        'Talk about your hobbies',
        'Рассказываем о хобби',
      ),
      description: L(
        '좋아하는 활동과 싫어하는 활동을 묻고 답하며 자신의 취미와 가족의 취미를 자연스럽게 말해요.',
        'Yoqtiradigan va yoqtirmaydigan mashg‘ulotlar haqida savol-javob qilib, o‘zingiz va oilangizning hobbilarini aytasiz.',
        'Ask and answer about favourite activities and talk naturally about your own and your family’s hobbies.',
        'Спрашиваем о любимых занятиях и рассказываем о своих хобби и хобби членов семьи.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 4,
      questions: [
        'en_s1u7_n3_061_speaking',
        'en_s1u7_n3_062_image_choice',
        'en_s1u7_n3_063_word_matching',
        'en_s1u7_n3_064_translate_builder',
        'en_s1u7_n3_065_word_arrange',
        'en_s1u7_n3_066_audio_match',
        'en_s1u7_n3_067_type_answer',
        'en_s1u7_n3_068_image_choice',
        'en_s1u7_n3_069_sentence_builder',
        'en_s1u7_n3_070_reply_builder',
        'en_s1u7_n3_071_type_answer',
        'en_s1u7_n3_072_word_matching',
        'en_s1u7_n3_073_translate_builder',
        'en_s1u7_n3_074_audio_match',
        'en_s1u7_n3_075_image_choice',
        'en_s1u7_n3_076_fill_in_blank',
        'en_s1u7_n3_077_type_answer',
        'en_s1u7_n3_078_word_arrange',
        'en_s1u7_n3_079_reply_builder',
        'en_s1u7_n3_080_dialog_complete',
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Section 1 · Unit 7 · Node 4
// 7.4 Speaking and writing
//
// Coverage
// - simple requests
// - Can you ...?
// - Can I ...?
// - help / directions / taxi / water / chair
// - Sure. / Of course. / No problem.
// - Sorry. I'm busy. / Sorry. It's taken.
// - social media posts
// - engineer / musician / song / amazing / contact
// - adjective + noun
// - verb + adverb
// - frequency adverb + verb
//
// IMPORTANT:
// *_WORDS에는 단어만 등록.
// "no problem", "of course", "here you are",
// "tell me the way" 같은 표현은 Word seed에 넣지 않음.
//
// Reused:
// help / understand / speak / slowly
// chair / water / airport / centre
// phone / bank / museum / cinema
// hobby / football / music / guitar
// well / badly / often / sometimes / never
//
// 4 lessons × 20 questions = 80
// type_answer: 3 per lesson
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT7_NODE4_WORDS = [
  {
    code: 'en-adjective-thirsty',
    english: 'thirsty',
    senseKey: 'needing-or-wanting-drink',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '목마른',
      'chanqagan',
      'needing or wanting something to drink',
      'испытывающий жажду',
    ),
    examples: [
      {
        english: 'I am really thirsty.',
        translations: L(
          '저는 정말 목말라요.',
          'Men juda chanqadim.',
          'I am really thirsty.',
          'Я очень хочу пить.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈθɜːsti/',
      ttsText: 'thirsty',
    },
    media: {
      emoji: '🥤',
      imageUrl: '',
      imageAlt: L(
        '목마른 사람',
        'chanqagan odam',
        'a thirsty person',
        'человек, который хочет пить',
      ),
    },
    tags: ['requests', 'feelings'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-lost',
    english: 'lost',
    senseKey: 'not-knowing-where-you-are',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '길을 잃은',
      'adashgan',
      'not knowing where you are or how to get somewhere',
      'заблудившийся',
    ),
    examples: [
      {
        english: 'I am lost.',
        translations: L(
          '저는 길을 잃었어요.',
          'Men adashib qoldim.',
          'I am lost.',
          'Я заблудился.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/lɒst/',
      ttsText: 'lost',
    },
    media: {
      emoji: '🗺️',
      imageUrl: '',
      imageAlt: L(
        '길을 잃은 사람',
        'adashgan odam',
        'a lost person',
        'заблудившийся человек',
      ),
    },
    tags: ['travel', 'requests'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-busy',
    english: 'busy',
    senseKey: 'having-much-to-do',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('바쁜', 'band', 'having a lot of things to do', 'занятый'),
    examples: [
      {
        english: 'Sorry, I am busy.',
        translations: L(
          '미안해요, 지금 바빠요.',
          'Kechirasiz, men bandman.',
          'Sorry, I am busy.',
          'Извините, я занят.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈbɪzi/',
      ttsText: 'busy',
    },
    media: {
      emoji: '⏰',
      imageUrl: '',
      imageAlt: L('바쁜 사람', 'band odam', 'a busy person', 'занятый человек'),
    },
    tags: ['adjectives', 'requests'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-taken',
    english: 'taken',
    senseKey: 'already-being-used-or-occupied',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '사용 중인; 자리가 찬',
      'band qilingan',
      'already being used or occupied by someone',
      'занятый',
    ),
    examples: [
      {
        english: 'Sorry, this chair is taken.',
        translations: L(
          '죄송하지만 이 의자는 사용 중이에요.',
          'Kechirasiz, bu stul band.',
          'Sorry, this chair is taken.',
          'Извините, этот стул занят.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈteɪkən/',
      ttsText: 'taken',
    },
    media: {
      emoji: '🪑',
      imageUrl: '',
      imageAlt: L(
        '사용 중인 의자',
        'band stul',
        'an occupied chair',
        'занятый стул',
      ),
    },
    tags: ['requests', 'adjectives'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-way',
    english: 'way',
    senseKey: 'route-or-direction-to-place',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '길; 방향',
      'yo‘l',
      'a route or direction used to get to a place',
      'дорога; путь',
    ),
    examples: [
      {
        english: 'Can you tell me the way to the bank?',
        translations: L(
          '은행 가는 길을 알려 주실 수 있어요?',
          'Bankka boradigan yo‘lni ayta olasizmi?',
          'Can you tell me the way to the bank?',
          'Вы можете показать мне дорогу к банку?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/weɪ/',
      ttsText: 'way',
    },
    media: {
      emoji: '➡️',
      imageUrl: '',
      imageAlt: L(
        '길과 방향',
        'yo‘l va yo‘nalish',
        'a route and direction',
        'дорога и направление',
      ),
    },
    tags: ['travel', 'directions'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-transport-taxi',
    english: 'taxi',
    senseKey: 'car-for-paid-passenger-journeys',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '택시',
      'taksi',
      'a car that takes passengers somewhere for money',
      'такси',
    ),
    examples: [
      {
        english: 'Can you call me a taxi?',
        translations: L(
          '택시를 불러 주실 수 있어요?',
          'Menga taksi chaqirib bera olasizmi?',
          'Can you call me a taxi?',
          'Вы можете вызвать мне такси?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈtæksi/',
      ttsText: 'taxi',
    },
    media: {
      emoji: '🚕',
      imageUrl: '',
      imageAlt: L('택시', 'taksi', 'a taxi', 'такси'),
    },
    tags: ['travel', 'transport'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-post',
    english: 'post',
    senseKey: 'message-published-online',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '게시물',
      'post',
      'a message or piece of writing published online',
      'публикация',
    ),
    examples: [
      {
        english: 'I wrote a post about my hobbies.',
        translations: L(
          '저는 제 취미에 대한 게시물을 썼어요.',
          'Men hobbilarim haqida post yozdim.',
          'I wrote a post about my hobbies.',
          'Я написал публикацию о своих хобби.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/pəʊst/',
      ttsText: 'post',
    },
    media: {
      emoji: '📝',
      imageUrl: '',
      imageAlt: L(
        '온라인 게시물',
        'onlayn post',
        'an online post',
        'публикация в интернете',
      ),
    },
    tags: ['internet', 'writing'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-website',
    english: 'website',
    senseKey: 'collection-of-pages-on-internet',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '웹사이트',
      'veb-sayt',
      'a collection of pages and information on the internet',
      'веб-сайт',
    ),
    examples: [
      {
        english: 'I am new to this website.',
        translations: L(
          '저는 이 웹사이트에 처음 왔어요.',
          'Men bu veb-saytda yangiman.',
          'I am new to this website.',
          'Я новичок на этом сайте.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈwebsaɪt/',
      ttsText: 'website',
    },
    media: {
      emoji: '🌐',
      imageUrl: '',
      imageAlt: L('웹사이트', 'veb-sayt', 'a website', 'веб-сайт'),
    },
    tags: ['internet', 'writing'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-job-engineer',
    english: 'engineer',
    senseKey: 'person-designing-or-building-technical-things',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '엔지니어',
      'muhandis',
      'a person who designs, builds or works with technical systems',
      'инженер',
    ),
    examples: [
      {
        english: 'I am an engineer.',
        translations: L(
          '저는 엔지니어예요.',
          'Men muhandisman.',
          'I am an engineer.',
          'Я инженер.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌendʒɪˈnɪə/',
      ttsText: 'engineer',
    },
    media: {
      emoji: '🧑‍💻',
      imageUrl: '',
      imageAlt: L('엔지니어', 'muhandis', 'an engineer', 'инженер'),
    },
    tags: ['jobs', 'people'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-person-musician',
    english: 'musician',
    senseKey: 'person-who-plays-or-writes-music',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '음악가',
      'musiqachi',
      'a person who plays, performs or writes music',
      'музыкант',
    ),
    examples: [
      {
        english: 'Javier is a great musician.',
        translations: L(
          '하비에르는 훌륭한 음악가예요.',
          'Xavyer ajoyib musiqachi.',
          'Javier is a great musician.',
          'Хавьер — отличный музыкант.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/mjuˈzɪʃən/',
      ttsText: 'musician',
    },
    media: {
      emoji: '🎸',
      imageUrl: '',
      imageAlt: L('음악가', 'musiqachi', 'a musician', 'музыкант'),
    },
    tags: ['music', 'people'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-song',
    english: 'song',
    senseKey: 'piece-of-music-with-words',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '노래',
      'qo‘shiq',
      'a piece of music with words that people sing',
      'песня',
    ),
    examples: [
      {
        english: 'He writes amazing songs.',
        translations: L(
          '그는 멋진 노래를 써요.',
          'U ajoyib qo‘shiqlar yozadi.',
          'He writes amazing songs.',
          'Он пишет потрясающие песни.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/sɒŋ/',
      ttsText: 'song',
    },
    media: {
      emoji: '🎶',
      imageUrl: '',
      imageAlt: L('노래', 'qo‘shiq', 'a song', 'песня'),
    },
    tags: ['music'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-amazing',
    english: 'amazing',
    senseKey: 'very-good-or-surprising',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '놀라운; 멋진',
      'ajoyib',
      'very good, impressive or surprising',
      'потрясающий',
    ),
    examples: [
      {
        english: 'Javier writes amazing songs.',
        translations: L(
          '하비에르는 멋진 노래를 써요.',
          'Xavyer ajoyib qo‘shiqlar yozadi.',
          'Javier writes amazing songs.',
          'Хавьер пишет потрясающие песни.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/əˈmeɪzɪŋ/',
      ttsText: 'amazing',
    },
    media: {
      emoji: '🤩',
      imageUrl: '',
      imageAlt: L(
        '아주 멋진 것',
        'ajoyib narsa',
        'something amazing',
        'что-то потрясающее',
      ),
    },
    tags: ['adjectives', 'writing'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-contact',
    english: 'contact',
    senseKey: 'communicate-with-person',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '연락하다',
      'bog‘lanmoq',
      'to communicate with someone',
      'связаться',
    ),
    examples: [
      {
        english: 'Please contact me.',
        translations: L(
          '저에게 연락해 주세요.',
          'Iltimos, men bilan bog‘laning.',
          'Please contact me.',
          'Пожалуйста, свяжитесь со мной.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkɒntækt/',
      ttsText: 'contact',
    },
    media: {
      emoji: '📩',
      imageUrl: '',
      imageAlt: L(
        '연락하기',
        'bog‘lanish',
        'contacting someone',
        'связь с кем-либо',
      ),
    },
    tags: ['communication', 'verbs'],
    difficulty: 1,
    isCore: true,
  },
];

export const EN_S1_UNIT7_NODE4_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Simple requests
  // ===========================================================

  en_s1u7_n4_001_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Can you help me?',
    audioText: 'Can you help me?',
    answerTranslation: L(
      '저를 도와주실 수 있어요?',
      'Menga yordam bera olasizmi?',
      'Can you help me?',
      'Вы можете мне помочь?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['requests', 'can-you'],
  },

  en_s1u7_n4_002_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'taxi',
    choices: [
      { text: 'way', label: '➡️', emoji: '➡️', imageUrl: '' },
      { text: 'taxi', label: '🚕', emoji: '🚕', imageUrl: '' },
      { text: 'website', label: '🌐', emoji: '🌐', imageUrl: '' },
      { text: 'song', label: '🎶', emoji: '🎶', imageUrl: '' },
    ],
    answerTranslation: L('택시', 'taksi', 'taxi', 'такси'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['taxi'],
  },

  en_s1u7_n4_003_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'thirsty',
        native: 'chanqagan',
        nativeI18n: L('목마른', 'chanqagan', 'thirsty', 'испытывающий жажду'),
      },
      {
        text: 'lost',
        native: 'adashgan',
        nativeI18n: L('길을 잃은', 'adashgan', 'lost', 'заблудившийся'),
      },
      {
        text: 'busy',
        native: 'band',
        nativeI18n: L('바쁜', 'band', 'busy', 'занятый'),
      },
      {
        text: 'way',
        native: 'yo‘l',
        nativeI18n: L('길', 'yo‘l', 'way', 'путь'),
      },
      {
        text: 'taxi',
        native: 'taksi',
        nativeI18n: L('택시', 'taksi', 'taxi', 'такси'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['requests', 'matching'],
  },

  en_s1u7_n4_004_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['help', 'me', 'Can', 'you', 'I', 'take', 'slowly'],
    answer: 'Can you help me',
    answerTranslation: L(
      '저를 도와주실 수 있어요?',
      'Menga yordam bera olasizmi?',
      'Can you help me?',
      'Вы можете мне помочь?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['requests', 'can-you'],
  },

  en_s1u7_n4_005_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['slowly', 'speak', 'Can', 'you', 'understand', 'I', 'help'],
    answer: 'Can you speak slowly',
    audioText: 'Can you speak slowly?',
    answerTranslation: L(
      '천천히 말해 주실 수 있어요?',
      'Sekin gapira olasizmi?',
      'Can you speak slowly?',
      'Вы можете говорить медленно?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['requests', 'slowly'],
  },

  en_s1u7_n4_006_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'thirsty',
        native: 'chanqagan',
        nativeI18n: L('목마른', 'chanqagan', 'thirsty', 'испытывающий жажду'),
      },
      {
        text: 'lost',
        native: 'adashgan',
        nativeI18n: L('길을 잃은', 'adashgan', 'lost', 'заблудившийся'),
      },
      {
        text: 'busy',
        native: 'band',
        nativeI18n: L('바쁜', 'band', 'busy', 'занятый'),
      },
      {
        text: 'way',
        native: 'yo‘l',
        nativeI18n: L('길', 'yo‘l', 'way', 'путь'),
      },
      {
        text: 'taxi',
        native: 'taksi',
        nativeI18n: L('택시', 'taksi', 'taxi', 'такси'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['requests', 'listening'],
  },

  en_s1u7_n4_007_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I am really ',
    sentenceSuffix: '.',
    answer: 'thirsty',
    answerTranslation: L(
      '저는 정말 목말라요.',
      'Men juda chanqadim.',
      'I am really thirsty.',
      'Я очень хочу пить.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "thirsty".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'thirsty'],
  },

  en_s1u7_n4_008_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'way',
    choices: [
      { text: 'taxi', label: '🚕', emoji: '🚕', imageUrl: '' },
      { text: 'post', label: '📝', emoji: '📝', imageUrl: '' },
      { text: 'way', label: '➡️', emoji: '➡️', imageUrl: '' },
      { text: 'website', label: '🌐', emoji: '🌐', imageUrl: '' },
    ],
    answerTranslation: L('길', 'yo‘l', 'way', 'путь'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['way', 'directions'],
  },

  en_s1u7_n4_009_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Can you tell me the way to the city centre?',
    audioText: 'Can you tell me the way to the city centre?',
    answerI18n: L(
      '시내 중심가로 가는 길을 알려 주실 수 있어요',
      'Shahar markaziga boradigan yo‘lni ayta olasizmi',
      'Can you tell me the way to the city centre',
      'Вы можете показать мне дорогу в центр города',
    ),
    options: [
      'Can',
      'you',
      'tell',
      'me',
      'the',
      'way',
      'to',
      'the',
      'city',
      'centre',
      'taxi',
    ],
    optionsI18n: {
      ko: ['시내', '중심가로', '가는', '길을', '알려', '주실', '수', '있어요'],
      uz: ['Shahar', 'markaziga', 'boradigan', 'yo‘lni', 'ayta', 'olasizmi'],
      en: [
        'Can',
        'you',
        'tell',
        'me',
        'the',
        'way',
        'to',
        'the',
        'city',
        'centre',
      ],
      ru: ['Вы', 'можете', 'показать', 'мне', 'дорогу', 'в', 'центр', 'города'],
    },
    answerTranslation: L(
      '시내 중심가로 가는 길을 알려 주실 수 있어요?',
      'Shahar markaziga boradigan yo‘lni ayta olasizmi?',
      'Can you tell me the way to the city centre?',
      'Вы можете показать мне дорогу в центр города?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['requests', 'directions'],
  },

  en_s1u7_n4_010_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Can you help me?',
    options: ['Of', 'course', 'I', 'can', 'Sorry', 'busy', 'taken'],
    answer: 'Of course I can',
    answerTranslation: L(
      '물론이죠. 도와드릴 수 있어요.',
      'Albatta, yordam bera olaman.',
      'Of course. I can.',
      'Конечно. Могу.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['requests', 'positive-response'],
  },

  en_s1u7_n4_011_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I am ',
    sentenceSuffix: '. Can you tell me the way?',
    answer: 'lost',
    answerTranslation: L(
      '길을 잃었어요. 길을 알려 주실 수 있어요?',
      'Men adashib qoldim. Yo‘lni ayta olasizmi?',
      'I am lost. Can you tell me the way?',
      'Я заблудился. Вы можете показать дорогу?',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "lost".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'lost'],
  },

  en_s1u7_n4_012_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'lost',
        native: 'adashgan',
        nativeI18n: L('길을 잃은', 'adashgan', 'lost', 'заблудившийся'),
      },
      {
        text: 'thirsty',
        native: 'chanqagan',
        nativeI18n: L('목마른', 'chanqagan', 'thirsty', 'испытывающий жажду'),
      },
      {
        text: 'taken',
        native: 'band qilingan',
        nativeI18n: L('사용 중인', 'band qilingan', 'taken', 'занятый'),
      },
      {
        text: 'taxi',
        native: 'taksi',
        nativeI18n: L('택시', 'taksi', 'taxi', 'такси'),
      },
      {
        text: 'busy',
        native: 'band',
        nativeI18n: L('바쁜', 'band', 'busy', 'занятый'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['requests', 'matching'],
  },

  en_s1u7_n4_013_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['Can', 'you', 'call', 'me', 'a', 'taxi', 'take', 'way', 'I'],
    answer: 'Can you call me a taxi',
    answerTranslation: L(
      '택시를 불러 주실 수 있어요?',
      'Menga taksi chaqirib bera olasizmi?',
      'Can you call me a taxi?',
      'Вы можете вызвать мне такси?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['requests', 'taxi'],
  },

  en_s1u7_n4_014_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'lost',
        native: 'adashgan',
        nativeI18n: L('길을 잃은', 'adashgan', 'lost', 'заблудившийся'),
      },
      {
        text: 'thirsty',
        native: 'chanqagan',
        nativeI18n: L('목마른', 'chanqagan', 'thirsty', 'испытывающий жажду'),
      },
      {
        text: 'taken',
        native: 'band qilingan',
        nativeI18n: L('사용 중인', 'band qilingan', 'taken', 'занятый'),
      },
      {
        text: 'taxi',
        native: 'taksi',
        nativeI18n: L('택시', 'taksi', 'taxi', 'такси'),
      },
      {
        text: 'busy',
        native: 'band',
        nativeI18n: L('바쁜', 'band', 'busy', 'занятый'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['requests', 'listening'],
  },

  en_s1u7_n4_015_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'taxi',
    choices: [
      { text: 'way', label: '➡️', emoji: '➡️', imageUrl: '' },
      { text: 'website', label: '🌐', emoji: '🌐', imageUrl: '' },
      { text: 'post', label: '📝', emoji: '📝', imageUrl: '' },
      { text: 'taxi', label: '🚕', emoji: '🚕', imageUrl: '' },
    ],
    answerTranslation: L('택시', 'taksi', 'taxi', 'такси'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['taxi'],
  },

  en_s1u7_n4_016_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Can you speak ___?',
    blankAnswers: ['slowly'],
    options: ['slowly', 'thirsty', 'way', 'taxi'],
    answer: 'slowly',
    answerTranslation: L(
      '천천히 말해 주실 수 있어요?',
      'Sekin gapira olasizmi?',
      'Can you speak slowly?',
      'Вы можете говорить медленно?',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['requests', 'slowly'],
  },

  en_s1u7_n4_017_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Can you call me a ',
    sentenceSuffix: '?',
    answer: 'taxi',
    answerTranslation: L(
      '택시를 불러 주실 수 있어요?',
      'Menga taksi chaqirib bera olasizmi?',
      'Can you call me a taxi?',
      'Вы можете вызвать мне такси?',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "taxi".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'taxi'],
  },

  en_s1u7_n4_018_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['some', 'water', 'have', 'Can', 'I', 'please', 'you', 'take'],
    answer: 'Can I have some water please',
    audioText: 'Can I have some water, please?',
    answerTranslation: L(
      '물 좀 주실 수 있을까요?',
      'Menga biroz suv bersangiz bo‘ladimi?',
      'Can I have some water, please?',
      'Можно мне немного воды, пожалуйста?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['requests', 'can-i'],
  },

  en_s1u7_n4_019_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Can I take this chair, please?',
    options: ['Sorry', 'it', 'is', 'taken', 'Sure', 'way', 'taxi'],
    answer: 'Sorry it is taken',
    answerTranslation: L(
      '죄송하지만 사용 중이에요.',
      'Kechirasiz, u band.',
      'Sorry. It is taken.',
      'Извините. Он занят.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['requests', 'taken', 'reply'],
  },

  en_s1u7_n4_020_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'I’m lost. Can you tell me the way to the city centre?',
      },
    ],
    options: [
      'Sure. It’s that way.',
      'Sorry. I’m thirsty.',
      'Yes, the taxi is taken.',
      'I can chair.',
    ],
    answer: 'Sure. It’s that way.',
    answerTranslation: L(
      '물론이죠. 저쪽이에요.',
      'Albatta. U tomonda.',
      'Sure. It’s that way.',
      'Конечно. Это в той стороне.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['requests', 'directions', 'dialog'],
  },

  // ===========================================================
  // Lesson 2 · Ask and respond
  // ===========================================================

  en_s1u7_n4_021_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Can I use your phone, please?',
    audioText: 'Can I use your phone, please?',
    answerTranslation: L(
      '전화기를 사용해도 될까요?',
      'Telefoningizdan foydalansam bo‘ladimi?',
      'Can I use your phone, please?',
      'Можно воспользоваться вашим телефоном?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['requests', 'can-i'],
  },

  en_s1u7_n4_022_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'way',
    choices: [
      { text: 'taxi', label: '🚕', emoji: '🚕', imageUrl: '' },
      { text: 'post', label: '📝', emoji: '📝', imageUrl: '' },
      { text: 'way', label: '➡️', emoji: '➡️', imageUrl: '' },
      { text: 'song', label: '🎶', emoji: '🎶', imageUrl: '' },
    ],
    answerTranslation: L('길', 'yo‘l', 'way', 'путь'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['way'],
  },

  en_s1u7_n4_023_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'busy',
        native: 'band',
        nativeI18n: L('바쁜', 'band', 'busy', 'занятый'),
      },
      {
        text: 'taken',
        native: 'band qilingan',
        nativeI18n: L('사용 중인', 'band qilingan', 'taken', 'занятый'),
      },
      {
        text: 'way',
        native: 'yo‘l',
        nativeI18n: L('길', 'yo‘l', 'way', 'путь'),
      },
      {
        text: 'taxi',
        native: 'taksi',
        nativeI18n: L('택시', 'taksi', 'taxi', 'такси'),
      },
      {
        text: 'lost',
        native: 'adashgan',
        nativeI18n: L('길을 잃은', 'adashgan', 'lost', 'заблудившийся'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['requests', 'matching'],
  },

  en_s1u7_n4_024_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['Can', 'I', 'use', 'your', 'phone', 'you', 'call', 'taxi'],
    answer: 'Can I use your phone',
    answerTranslation: L(
      '전화기를 사용해도 될까요?',
      'Telefoningizdan foydalansam bo‘ladimi?',
      'Can I use your phone?',
      'Можно воспользоваться вашим телефоном?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['requests', 'can-i'],
  },

  en_s1u7_n4_025_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['the', 'museum', 'way', 'me', 'tell', 'Can', 'you', 'to', 'taxi'],
    answer: 'Can you tell me the way to the museum',
    audioText: 'Can you tell me the way to the museum?',
    answerTranslation: L(
      '박물관 가는 길을 알려 주실 수 있어요?',
      'Muzeyga boradigan yo‘lni ayta olasizmi?',
      'Can you tell me the way to the museum?',
      'Вы можете показать мне дорогу к музею?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['directions', 'requests'],
  },

  en_s1u7_n4_026_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'busy',
        native: 'band',
        nativeI18n: L('바쁜', 'band', 'busy', 'занятый'),
      },
      {
        text: 'taken',
        native: 'band qilingan',
        nativeI18n: L('사용 중인', 'band qilingan', 'taken', 'занятый'),
      },
      {
        text: 'way',
        native: 'yo‘l',
        nativeI18n: L('길', 'yo‘l', 'way', 'путь'),
      },
      {
        text: 'taxi',
        native: 'taksi',
        nativeI18n: L('택시', 'taksi', 'taxi', 'такси'),
      },
      {
        text: 'lost',
        native: 'adashgan',
        nativeI18n: L('길을 잃은', 'adashgan', 'lost', 'заблудившийся'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['requests', 'listening'],
  },

  en_s1u7_n4_027_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Sorry, I am ',
    sentenceSuffix: '.',
    answer: 'busy',
    answerTranslation: L(
      '죄송하지만 바빠요.',
      'Kechirasiz, men bandman.',
      'Sorry, I am busy.',
      'Извините, я занят.',
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

  en_s1u7_n4_028_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'taxi',
    choices: [
      { text: 'post', label: '📝', emoji: '📝', imageUrl: '' },
      { text: 'taxi', label: '🚕', emoji: '🚕', imageUrl: '' },
      { text: 'way', label: '➡️', emoji: '➡️', imageUrl: '' },
      { text: 'website', label: '🌐', emoji: '🌐', imageUrl: '' },
    ],
    answerTranslation: L('택시', 'taksi', 'taxi', 'такси'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['taxi'],
  },

  en_s1u7_n4_029_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Can I take this chair, please?',
    audioText: 'Can I take this chair, please?',
    answerI18n: L(
      '이 의자를 가져가도 될까요',
      'Bu stulni olsam bo‘ladimi',
      'Can I take this chair please',
      'Можно мне взять этот стул',
    ),
    options: ['Can', 'I', 'take', 'this', 'chair', 'please', 'you', 'call'],
    optionsI18n: {
      ko: ['이', '의자를', '가져가도', '될까요'],
      uz: ['Bu', 'stulni', 'olsam', 'bo‘ladimi'],
      en: ['Can', 'I', 'take', 'this', 'chair', 'please'],
      ru: ['Можно', 'мне', 'взять', 'этот', 'стул'],
    },
    answerTranslation: L(
      '이 의자를 가져가도 될까요?',
      'Bu stulni olsam bo‘ladimi?',
      'Can I take this chair, please?',
      'Можно мне взять этот стул?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['requests', 'can-i'],
  },

  en_s1u7_n4_030_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Can I have some water, please?',
    options: ['Sure', 'Here', 'you', 'are', 'Sorry', 'busy', 'taken'],
    answer: 'Sure Here you are',
    answerTranslation: L(
      '물론이죠. 여기 있어요.',
      'Albatta. Mana.',
      'Sure. Here you are.',
      'Конечно. Вот, пожалуйста.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['requests', 'positive-response'],
  },

  en_s1u7_n4_031_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Sorry, this chair is ',
    sentenceSuffix: '.',
    answer: 'taken',
    answerTranslation: L(
      '죄송하지만 이 의자는 사용 중이에요.',
      'Kechirasiz, bu stul band.',
      'Sorry, this chair is taken.',
      'Извините, этот стул занят.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "taken".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'taken'],
  },

  en_s1u7_n4_032_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'thirsty',
        native: 'chanqagan',
        nativeI18n: L('목마른', 'chanqagan', 'thirsty', 'испытывающий жажду'),
      },
      {
        text: 'busy',
        native: 'band',
        nativeI18n: L('바쁜', 'band', 'busy', 'занятый'),
      },
      {
        text: 'taken',
        native: 'band qilingan',
        nativeI18n: L('사용 중인', 'band qilingan', 'taken', 'занятый'),
      },
      {
        text: 'lost',
        native: 'adashgan',
        nativeI18n: L('길을 잃은', 'adashgan', 'lost', 'заблудившийся'),
      },
      {
        text: 'way',
        native: 'yo‘l',
        nativeI18n: L('길', 'yo‘l', 'way', 'путь'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['requests', 'matching'],
  },

  en_s1u7_n4_033_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['Can', 'I', 'have', 'some', 'water', 'please', 'you', 'taxi'],
    answer: 'Can I have some water please',
    answerTranslation: L(
      '물 좀 주실 수 있을까요?',
      'Menga biroz suv bersangiz bo‘ladimi?',
      'Can I have some water, please?',
      'Можно мне немного воды, пожалуйста?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['requests', 'can-i'],
  },

  en_s1u7_n4_034_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'thirsty',
        native: 'chanqagan',
        nativeI18n: L('목마른', 'chanqagan', 'thirsty', 'испытывающий жажду'),
      },
      {
        text: 'busy',
        native: 'band',
        nativeI18n: L('바쁜', 'band', 'busy', 'занятый'),
      },
      {
        text: 'taken',
        native: 'band qilingan',
        nativeI18n: L('사용 중인', 'band qilingan', 'taken', 'занятый'),
      },
      {
        text: 'lost',
        native: 'adashgan',
        nativeI18n: L('길을 잃은', 'adashgan', 'lost', 'заблудившийся'),
      },
      {
        text: 'way',
        native: 'yo‘l',
        nativeI18n: L('길', 'yo‘l', 'way', 'путь'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['requests', 'listening'],
  },

  en_s1u7_n4_035_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'way',
    choices: [
      { text: 'website', label: '🌐', emoji: '🌐', imageUrl: '' },
      { text: 'song', label: '🎶', emoji: '🎶', imageUrl: '' },
      { text: 'taxi', label: '🚕', emoji: '🚕', imageUrl: '' },
      { text: 'way', label: '➡️', emoji: '➡️', imageUrl: '' },
    ],
    answerTranslation: L('길', 'yo‘l', 'way', 'путь'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['way'],
  },

  en_s1u7_n4_036_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Excuse me. Can ___ help me?',
    blankAnswers: ['you'],
    options: ['you', 'I', 'me', 'your'],
    answer: 'you',
    answerTranslation: L(
      '실례합니다. 저를 도와주실 수 있어요?',
      'Kechirasiz. Menga yordam bera olasizmi?',
      'Excuse me. Can you help me?',
      'Извините. Вы можете мне помочь?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['requests', 'can-you'],
  },

  en_s1u7_n4_037_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Can you tell me the ',
    sentenceSuffix: ' to the bank?',
    answer: 'way',
    answerTranslation: L(
      '은행 가는 길을 알려 주실 수 있어요?',
      'Bankka boradigan yo‘lni ayta olasizmi?',
      'Can you tell me the way to the bank?',
      'Вы можете показать мне дорогу к банку?',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "way".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'way'],
  },

  en_s1u7_n4_038_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['your', 'phone', 'use', 'Can', 'I', 'please', 'you', 'call'],
    answer: 'Can I use your phone please',
    audioText: 'Can I use your phone, please?',
    answerTranslation: L(
      '전화기를 사용해도 될까요?',
      'Telefoningizdan foydalansam bo‘ladimi?',
      'Can I use your phone, please?',
      'Можно воспользоваться вашим телефоном?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['requests', 'can-i'],
  },

  en_s1u7_n4_039_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Can you speak slowly?',
    options: ['Sure', 'No', 'problem', 'I', 'am', 'lost', 'taken'],
    answer: 'Sure No problem',
    answerTranslation: L(
      '물론이죠. 문제없어요.',
      'Albatta. Muammo yo‘q.',
      'Sure. No problem.',
      'Конечно. Без проблем.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['requests', 'response'],
  },

  en_s1u7_n4_040_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Excuse me. Can you call me a taxi?' },
    ],
    options: [
      'Yes, of course.',
      'Sorry, it’s thirsty.',
      'The taxi can you.',
      'I am way.',
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
    tags: ['requests', 'dialog'],
  },

  // ===========================================================
  // Lesson 3 · A social media post
  // ===========================================================

  en_s1u7_n4_041_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I am an engineer.',
    audioText: 'I am an engineer.',
    answerTranslation: L(
      '저는 엔지니어예요.',
      'Men muhandisman.',
      'I am an engineer.',
      'Я инженер.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['engineer', 'introduction'],
  },

  en_s1u7_n4_042_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'website',
    choices: [
      { text: 'song', label: '🎶', emoji: '🎶', imageUrl: '' },
      { text: 'post', label: '📝', emoji: '📝', imageUrl: '' },
      { text: 'website', label: '🌐', emoji: '🌐', imageUrl: '' },
      { text: 'taxi', label: '🚕', emoji: '🚕', imageUrl: '' },
    ],
    answerTranslation: L('웹사이트', 'veb-sayt', 'website', 'веб-сайт'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['website'],
  },

  en_s1u7_n4_043_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'post',
        native: 'post',
        nativeI18n: L('게시물', 'post', 'post', 'публикация'),
      },
      {
        text: 'website',
        native: 'veb-sayt',
        nativeI18n: L('웹사이트', 'veb-sayt', 'website', 'веб-сайт'),
      },
      {
        text: 'engineer',
        native: 'muhandis',
        nativeI18n: L('엔지니어', 'muhandis', 'engineer', 'инженер'),
      },
      {
        text: 'musician',
        native: 'musiqachi',
        nativeI18n: L('음악가', 'musiqachi', 'musician', 'музыкант'),
      },
      {
        text: 'song',
        native: 'qo‘shiq',
        nativeI18n: L('노래', 'qo‘shiq', 'song', 'песня'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['writing', 'matching'],
  },

  en_s1u7_n4_044_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['I', 'am', 'an', 'engineer', 'musician', 'website', 'write'],
    answer: 'I am an engineer',
    answerTranslation: L(
      '저는 엔지니어예요.',
      'Men muhandisman.',
      'I am an engineer.',
      'Я инженер.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['engineer', 'introduction'],
  },

  en_s1u7_n4_045_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['site', 'this', 'to', 'new', 'am', 'I', 'post', 'engineer'],
    answer: 'I am new to this site',
    audioText: 'I am new to this site.',
    answerTranslation: L(
      '저는 이 사이트에 처음 왔어요.',
      'Men bu saytda yangiman.',
      'I am new to this site.',
      'Я новичок на этом сайте.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['website', 'introduction'],
  },

  en_s1u7_n4_046_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'post',
        native: 'post',
        nativeI18n: L('게시물', 'post', 'post', 'публикация'),
      },
      {
        text: 'website',
        native: 'veb-sayt',
        nativeI18n: L('웹사이트', 'veb-sayt', 'website', 'веб-сайт'),
      },
      {
        text: 'engineer',
        native: 'muhandis',
        nativeI18n: L('엔지니어', 'muhandis', 'engineer', 'инженер'),
      },
      {
        text: 'musician',
        native: 'musiqachi',
        nativeI18n: L('음악가', 'musiqachi', 'musician', 'музыкант'),
      },
      {
        text: 'song',
        native: 'qo‘shiq',
        nativeI18n: L('노래', 'qo‘shiq', 'song', 'песня'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['writing', 'listening'],
  },

  en_s1u7_n4_047_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I am an ',
    sentenceSuffix: '.',
    answer: 'engineer',
    answerTranslation: L(
      '저는 엔지니어예요.',
      'Men muhandisman.',
      'I am an engineer.',
      'Я инженер.',
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

  en_s1u7_n4_048_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'musician',
    choices: [
      { text: 'engineer', label: '🧑‍💻', emoji: '🧑‍💻', imageUrl: '' },
      { text: 'song', label: '🎶', emoji: '🎶', imageUrl: '' },
      { text: 'musician', label: '🎸', emoji: '🎸', imageUrl: '' },
      { text: 'website', label: '🌐', emoji: '🌐', imageUrl: '' },
    ],
    answerTranslation: L('음악가', 'musiqachi', 'musician', 'музыкант'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['musician'],
  },

  en_s1u7_n4_049_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'My hobbies are football and rock music.',
    audioText: 'My hobbies are football and rock music.',
    answerI18n: L(
      '제 취미는 축구와 록 음악이에요',
      'Mening hobbilarim futbol va rok musiqasi',
      'My hobbies are football and rock music',
      'Мои хобби — футбол и рок-музыка',
    ),
    options: [
      'My',
      'hobbies',
      'are',
      'football',
      'and',
      'rock',
      'music',
      'engineer',
      'website',
    ],
    optionsI18n: {
      ko: ['제', '취미는', '축구와', '록', '음악이에요'],
      uz: ['Mening', 'hobbilarim', 'futbol', 'va', 'rok', 'musiqasi'],
      en: ['My', 'hobbies', 'are', 'football', 'and', 'rock', 'music'],
      ru: ['Мои', 'хобби', 'футбол', 'и', 'рок-музыка'],
    },
    answerTranslation: L(
      '제 취미는 축구와 록 음악이에요.',
      'Mening hobbilarim futbol va rok musiqasi.',
      'My hobbies are football and rock music.',
      'Мои хобби — футбол и рок-музыка.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['social-media', 'hobbies'],
  },

  en_s1u7_n4_050_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What do you do?',
    options: ['I', 'am', 'an', 'engineer', 'I', 'like', 'music', 'website'],
    answer: 'I am an engineer',
    answerTranslation: L(
      '저는 엔지니어예요.',
      'Men muhandisman.',
      'I am an engineer.',
      'Я инженер.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['job', 'reply'],
  },

  en_s1u7_n4_051_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Javier is a great ',
    sentenceSuffix: '.',
    answer: 'musician',
    answerTranslation: L(
      '하비에르는 훌륭한 음악가예요.',
      'Xavyer ajoyib musiqachi.',
      'Javier is a great musician.',
      'Хавьер — отличный музыкант.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "musician".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'musician'],
  },

  en_s1u7_n4_052_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'amazing',
        native: 'ajoyib',
        nativeI18n: L('놀라운', 'ajoyib', 'amazing', 'потрясающий'),
      },
      {
        text: 'contact',
        native: 'bog‘lanmoq',
        nativeI18n: L('연락하다', 'bog‘lanmoq', 'contact', 'связаться'),
      },
      {
        text: 'song',
        native: 'qo‘shiq',
        nativeI18n: L('노래', 'qo‘shiq', 'song', 'песня'),
      },
      {
        text: 'post',
        native: 'post',
        nativeI18n: L('게시물', 'post', 'post', 'публикация'),
      },
      {
        text: 'website',
        native: 'veb-sayt',
        nativeI18n: L('웹사이트', 'veb-sayt', 'website', 'веб-сайт'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['writing', 'matching'],
  },

  en_s1u7_n4_053_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['He', 'writes', 'amazing', 'songs', 'badly', 'musician', 'write'],
    answer: 'He writes amazing songs',
    answerTranslation: L(
      '그는 멋진 노래를 써요.',
      'U ajoyib qo‘shiqlar yozadi.',
      'He writes amazing songs.',
      'Он пишет потрясающие песни.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['amazing', 'songs'],
  },

  en_s1u7_n4_054_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'amazing',
        native: 'ajoyib',
        nativeI18n: L('놀라운', 'ajoyib', 'amazing', 'потрясающий'),
      },
      {
        text: 'contact',
        native: 'bog‘lanmoq',
        nativeI18n: L('연락하다', 'bog‘lanmoq', 'contact', 'связаться'),
      },
      {
        text: 'song',
        native: 'qo‘shiq',
        nativeI18n: L('노래', 'qo‘shiq', 'song', 'песня'),
      },
      {
        text: 'post',
        native: 'post',
        nativeI18n: L('게시물', 'post', 'post', 'публикация'),
      },
      {
        text: 'website',
        native: 'veb-sayt',
        nativeI18n: L('웹사이트', 'veb-sayt', 'website', 'веб-сайт'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['writing', 'listening'],
  },

  en_s1u7_n4_055_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'song',
    choices: [
      { text: 'post', label: '📝', emoji: '📝', imageUrl: '' },
      { text: 'website', label: '🌐', emoji: '🌐', imageUrl: '' },
      { text: 'song', label: '🎶', emoji: '🎶', imageUrl: '' },
      { text: 'engineer', label: '🧑‍💻', emoji: '🧑‍💻', imageUrl: '' },
    ],
    answerTranslation: L('노래', 'qo‘shiq', 'song', 'песня'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['song'],
  },

  en_s1u7_n4_056_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'He writes ___ songs.',
    blankAnswers: ['amazing'],
    options: ['amazing', 'badly', 'busy', 'taken'],
    answer: 'amazing',
    answerTranslation: L(
      '그는 멋진 노래를 써요.',
      'U ajoyib qo‘shiqlar yozadi.',
      'He writes amazing songs.',
      'Он пишет потрясающие песни.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['amazing', 'song'],
  },

  en_s1u7_n4_057_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'He writes amazing ',
    sentenceSuffix: '.',
    answer: 'songs',
    answerTranslation: L(
      '그는 멋진 노래를 써요.',
      'U ajoyib qo‘shiqlar yozadi.',
      'He writes amazing songs.',
      'Он пишет потрясающие песни.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is the plural noun "songs".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'song'],
  },

  en_s1u7_n4_058_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['me', 'contact', 'Please', 'website', 'song', 'engineer'],
    answer: 'Please contact me',
    audioText: 'Please contact me.',
    answerTranslation: L(
      '저에게 연락해 주세요.',
      'Iltimos, men bilan bog‘laning.',
      'Please contact me.',
      'Пожалуйста, свяжитесь со мной.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['contact', 'communication'],
  },

  en_s1u7_n4_059_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Why are you on this website?',
    options: [
      'I',
      'like',
      'meeting',
      'people',
      'from',
      'all',
      'over',
      'the',
      'world',
      'engineer',
    ],
    answer: 'I like meeting people from all over the world',
    answerTranslation: L(
      '전 세계 사람들을 만나는 것을 좋아해서요.',
      'Men butun dunyodan odamlar bilan tanishishni yoqtiraman.',
      'I like meeting people from all over the world.',
      'Мне нравится знакомиться с людьми со всего мира.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['social-media', 'reply'],
  },

  en_s1u7_n4_060_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What are your hobbies?' }],
    options: [
      'I like playing the guitar and listening to rock music.',
      'I engineer amazing music.',
      'My hobby are website.',
      'I like play guitar music.',
    ],
    answer: 'I like playing the guitar and listening to rock music.',
    answerTranslation: L(
      '저는 기타를 치고 록 음악 듣는 것을 좋아해요.',
      'Men gitara chalishni va rok musiqasini tinglashni yoqtiraman.',
      'I like playing the guitar and listening to rock music.',
      'Я люблю играть на гитаре и слушать рок-музыку.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['social-media', 'hobbies', 'dialog'],
  },

  // ===========================================================
  // Lesson 4 · Write about yourself
  // ===========================================================

  en_s1u7_n4_061_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'He is a great musician.',
    audioText: 'He is a great musician.',
    answerTranslation: L(
      '그는 훌륭한 음악가예요.',
      'U ajoyib musiqachi.',
      'He is a great musician.',
      'Он отличный музыкант.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['word-order', 'musician'],
  },

  en_s1u7_n4_062_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'engineer',
    choices: [
      { text: 'musician', label: '🎸', emoji: '🎸', imageUrl: '' },
      { text: 'post', label: '📝', emoji: '📝', imageUrl: '' },
      { text: 'engineer', label: '🧑‍💻', emoji: '🧑‍💻', imageUrl: '' },
      { text: 'website', label: '🌐', emoji: '🌐', imageUrl: '' },
    ],
    answerTranslation: L('엔지니어', 'muhandis', 'engineer', 'инженер'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['engineer'],
  },

  en_s1u7_n4_063_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'engineer',
        native: 'muhandis',
        nativeI18n: L('엔지니어', 'muhandis', 'engineer', 'инженер'),
      },
      {
        text: 'musician',
        native: 'musiqachi',
        nativeI18n: L('음악가', 'musiqachi', 'musician', 'музыкант'),
      },
      {
        text: 'amazing',
        native: 'ajoyib',
        nativeI18n: L('놀라운', 'ajoyib', 'amazing', 'потрясающий'),
      },
      {
        text: 'contact',
        native: 'bog‘lanmoq',
        nativeI18n: L('연락하다', 'bog‘lanmoq', 'contact', 'связаться'),
      },
      {
        text: 'song',
        native: 'qo‘shiq',
        nativeI18n: L('노래', 'qo‘shiq', 'song', 'песня'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['writing', 'matching'],
  },

  en_s1u7_n4_064_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'He',
      'is',
      'a',
      'great',
      'musician',
      'greatly',
      'music',
      'writes',
    ],
    answer: 'He is a great musician',
    answerTranslation: L(
      '그는 훌륭한 음악가예요.',
      'U ajoyib musiqachi.',
      'He is a great musician.',
      'Он отличный музыкант.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['word-order', 'adjective-noun'],
  },

  en_s1u7_n4_065_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'English',
      'well',
      'very',
      'speak',
      'can’t',
      'I',
      'amazing',
      'often',
    ],
    answer: 'I can’t speak English very well',
    audioText: 'I can’t speak English very well.',
    answerTranslation: L(
      '저는 영어를 아주 잘하지는 못해요.',
      'Men ingliz tilida juda yaxshi gapira olmayman.',
      'I can’t speak English very well.',
      'Я не очень хорошо говорю по-английски.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['word-order', 'verb-adverb'],
  },

  en_s1u7_n4_066_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'engineer',
        native: 'muhandis',
        nativeI18n: L('엔지니어', 'muhandis', 'engineer', 'инженер'),
      },
      {
        text: 'musician',
        native: 'musiqachi',
        nativeI18n: L('음악가', 'musiqachi', 'musician', 'музыкант'),
      },
      {
        text: 'amazing',
        native: 'ajoyib',
        nativeI18n: L('놀라운', 'ajoyib', 'amazing', 'потрясающий'),
      },
      {
        text: 'contact',
        native: 'bog‘lanmoq',
        nativeI18n: L('연락하다', 'bog‘lanmoq', 'contact', 'связаться'),
      },
      {
        text: 'song',
        native: 'qo‘shiq',
        nativeI18n: L('노래', 'qo‘shiq', 'song', 'песня'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['writing', 'listening'],
  },

  en_s1u7_n4_067_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Javier writes ',
    sentenceSuffix: ' songs.',
    answer: 'amazing',
    answerTranslation: L(
      '하비에르는 멋진 노래를 써요.',
      'Xavyer ajoyib qo‘shiqlar yozadi.',
      'Javier writes amazing songs.',
      'Хавьер пишет потрясающие песни.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "amazing".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'amazing'],
  },

  en_s1u7_n4_068_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'song',
    choices: [
      { text: 'website', label: '🌐', emoji: '🌐', imageUrl: '' },
      { text: 'engineer', label: '🧑‍💻', emoji: '🧑‍💻', imageUrl: '' },
      { text: 'song', label: '🎶', emoji: '🎶', imageUrl: '' },
      { text: 'post', label: '📝', emoji: '📝', imageUrl: '' },
    ],
    answerTranslation: L('노래', 'qo‘shiq', 'song', 'песня'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['song'],
  },

  en_s1u7_n4_069_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'I sometimes play music with my friend.',
    audioText: 'I sometimes play music with my friend.',
    answerI18n: L(
      '저는 가끔 친구와 음악을 연주해요',
      'Men ba’zan do‘stim bilan musiqa chalaman',
      'I sometimes play music with my friend',
      'Я иногда играю музыку со своим другом',
    ),
    options: [
      'I',
      'sometimes',
      'play',
      'music',
      'with',
      'my',
      'friend',
      'slowly',
      'amazing',
    ],
    optionsI18n: {
      ko: ['저는', '가끔', '친구와', '음악을', '연주해요'],
      uz: ['Men', 'ba’zan', 'do‘stim', 'bilan', 'musiqa', 'chalaman'],
      en: ['I', 'sometimes', 'play', 'music', 'with', 'my', 'friend'],
      ru: ['Я', 'иногда', 'играю', 'музыку', 'со', 'своим', 'другом'],
    },
    answerTranslation: L(
      '저는 가끔 친구와 음악을 연주해요.',
      'Men ba’zan do‘stim bilan musiqa chalaman.',
      'I sometimes play music with my friend.',
      'Я иногда играю музыку со своим другом.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['word-order', 'frequency'],
  },

  en_s1u7_n4_070_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Why are you on this website?',
    options: [
      'I',
      'want',
      'to',
      'meet',
      'people',
      'and',
      'practise',
      'English',
      'song',
    ],
    answer: 'I want to meet people and practise English',
    answerTranslation: L(
      '사람들을 만나고 영어를 연습하고 싶어요.',
      'Men odamlar bilan tanishib, ingliz tilini mashq qilmoqchiman.',
      'I want to meet people and practise English.',
      'Я хочу знакомиться с людьми и практиковать английский.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['social-media', 'reply'],
  },

  en_s1u7_n4_071_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Please ',
    sentenceSuffix: ' me.',
    answer: 'contact',
    answerTranslation: L(
      '저에게 연락해 주세요.',
      'Iltimos, men bilan bog‘laning.',
      'Please contact me.',
      'Пожалуйста, свяжитесь со мной.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "contact".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'contact'],
  },

  en_s1u7_n4_072_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'post',
        native: 'post',
        nativeI18n: L('게시물', 'post', 'post', 'публикация'),
      },
      {
        text: 'website',
        native: 'veb-sayt',
        nativeI18n: L('웹사이트', 'veb-sayt', 'website', 'веб-сайт'),
      },
      {
        text: 'engineer',
        native: 'muhandis',
        nativeI18n: L('엔지니어', 'muhandis', 'engineer', 'инженер'),
      },
      {
        text: 'musician',
        native: 'musiqachi',
        nativeI18n: L('음악가', 'musiqachi', 'musician', 'музыкант'),
      },
      {
        text: 'amazing',
        native: 'ajoyib',
        nativeI18n: L('놀라운', 'ajoyib', 'amazing', 'потрясающий'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['writing', 'matching'],
  },

  en_s1u7_n4_073_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'I',
      'sometimes',
      'play',
      'music',
      'with',
      'my',
      'friend',
      'amazing',
      'slowly',
    ],
    answer: 'I sometimes play music with my friend',
    answerTranslation: L(
      '저는 가끔 친구와 음악을 연주해요.',
      'Men ba’zan do‘stim bilan musiqa chalaman.',
      'I sometimes play music with my friend.',
      'Я иногда играю музыку со своим другом.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['frequency', 'word-order'],
  },

  en_s1u7_n4_074_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'post',
        native: 'post',
        nativeI18n: L('게시물', 'post', 'post', 'публикация'),
      },
      {
        text: 'website',
        native: 'veb-sayt',
        nativeI18n: L('웹사이트', 'veb-sayt', 'website', 'веб-сайт'),
      },
      {
        text: 'engineer',
        native: 'muhandis',
        nativeI18n: L('엔지니어', 'muhandis', 'engineer', 'инженер'),
      },
      {
        text: 'musician',
        native: 'musiqachi',
        nativeI18n: L('음악가', 'musiqachi', 'musician', 'музыкант'),
      },
      {
        text: 'amazing',
        native: 'ajoyib',
        nativeI18n: L('놀라운', 'ajoyib', 'amazing', 'потрясающий'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['writing', 'listening'],
  },

  en_s1u7_n4_075_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'website',
    choices: [
      { text: 'post', label: '📝', emoji: '📝', imageUrl: '' },
      { text: 'song', label: '🎶', emoji: '🎶', imageUrl: '' },
      { text: 'engineer', label: '🧑‍💻', emoji: '🧑‍💻', imageUrl: '' },
      { text: 'website', label: '🌐', emoji: '🌐', imageUrl: '' },
    ],
    answerTranslation: L('웹사이트', 'veb-sayt', 'website', 'веб-сайт'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['website'],
  },

  en_s1u7_n4_076_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Javier is a ___ musician.',
    blankAnswers: ['great'],
    options: ['great', 'greatly', 'well', 'badly'],
    answer: 'great',
    answerTranslation: L(
      '하비에르는 훌륭한 음악가예요.',
      'Xavyer ajoyib musiqachi.',
      'Javier is a great musician.',
      'Хавьер — отличный музыкант.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['adjective-noun', 'word-order'],
  },

  en_s1u7_n4_077_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I wrote a ',
    sentenceSuffix: ' about myself.',
    answer: 'post',
    answerTranslation: L(
      '저는 제 소개 게시물을 썼어요.',
      'Men o‘zim haqimda post yozdim.',
      'I wrote a post about myself.',
      'Я написал публикацию о себе.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "post".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'post'],
  },

  en_s1u7_n4_078_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'songs',
      'amazing',
      'writes',
      'Javier',
      'badly',
      'often',
      'music',
    ],
    answer: 'Javier writes amazing songs',
    audioText: 'Javier writes amazing songs.',
    answerTranslation: L(
      '하비에르는 멋진 노래를 써요.',
      'Xavyer ajoyib qo‘shiqlar yozadi.',
      'Javier writes amazing songs.',
      'Хавьер пишет потрясающие песни.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['word-order', 'amazing'],
  },

  en_s1u7_n4_079_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Tell me about your hobbies.',
    options: [
      'I',
      'like',
      'playing',
      'the',
      'guitar',
      'and',
      'taking',
      'photos',
      'engineer',
    ],
    answer: 'I like playing the guitar and taking photos',
    answerTranslation: L(
      '저는 기타 치기와 사진 찍기를 좋아해요.',
      'Men gitara chalishni va suratga olishni yoqtiraman.',
      'I like playing the guitar and taking photos.',
      'Я люблю играть на гитаре и фотографировать.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['social-media', 'hobbies', 'reply'],
  },

  en_s1u7_n4_080_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Why are you on this website?' }],
    options: [
      'I want to meet people and practise English.',
      'I am website engineer.',
      'I can amazing songs.',
      'I like contact musician.',
    ],
    answer: 'I want to meet people and practise English.',
    answerTranslation: L(
      '사람들을 만나고 영어를 연습하고 싶어요.',
      'Men odamlar bilan tanishib, ingliz tilini mashq qilmoqchiman.',
      'I want to meet people and practise English.',
      'Я хочу знакомиться с людьми и практиковать английский.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['social-media', 'writing', 'final'],
  },
};

export const EN_S1_UNIT7_NODE4 = {
  title: L(
    '간단한 부탁과 자기소개',
    'Oddiy iltimoslar va o‘zingiz haqingizda yozish',
    'Simple requests and writing',
    'Простые просьбы и письмо о себе',
  ),
  section: 1,
  unit: 7,
  order: 4,
  isActive: true,

  lessons: [
    {
      title: L(
        '간단하게 부탁하기',
        'Oddiy iltimoslar',
        'Simple requests',
        'Простые просьбы',
      ),
      description: L(
        'Can you...?와 Can I...?를 사용해 도움, 길 안내, 택시, 물 등을 정중하게 부탁해요.',
        'Can you...? va Can I...? yordamida yordam, yo‘l, taksi va suvni muloyim tarzda so‘raysiz.',
        'Use Can you...? and Can I...? to make simple polite requests for help, directions, taxis and other things.',
        'Используем Can you...? и Can I...? для простых вежливых просьб о помощи, дороге, такси и других вещах.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 1,
      questions: [
        'en_s1u7_n4_001_speaking',
        'en_s1u7_n4_002_image_choice',
        'en_s1u7_n4_003_word_matching',
        'en_s1u7_n4_004_translate_builder',
        'en_s1u7_n4_005_word_arrange',
        'en_s1u7_n4_006_audio_match',
        'en_s1u7_n4_007_type_answer',
        'en_s1u7_n4_008_image_choice',
        'en_s1u7_n4_009_sentence_builder',
        'en_s1u7_n4_010_reply_builder',
        'en_s1u7_n4_011_type_answer',
        'en_s1u7_n4_012_word_matching',
        'en_s1u7_n4_013_translate_builder',
        'en_s1u7_n4_014_audio_match',
        'en_s1u7_n4_015_image_choice',
        'en_s1u7_n4_016_fill_in_blank',
        'en_s1u7_n4_017_type_answer',
        'en_s1u7_n4_018_word_arrange',
        'en_s1u7_n4_019_reply_builder',
        'en_s1u7_n4_020_dialog_complete',
      ],
    },

    {
      title: L(
        '부탁에 대답하기',
        'Iltimoslarga javob berish',
        'Ask and respond',
        'Просим и отвечаем',
      ),
      description: L(
        'Sure, Of course, No problem 같은 긍정 응답과 Sorry, I’m busy, It’s taken 같은 거절 표현을 연습해요.',
        'Sure, Of course, No problem kabi ijobiy va Sorry, I’m busy, It’s taken kabi rad javoblarini mashq qilasiz.',
        'Practise positive and negative responses to everyday requests.',
        'Практикуем положительные и отрицательные ответы на повседневные просьбы.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 2,
      questions: [
        'en_s1u7_n4_021_speaking',
        'en_s1u7_n4_022_image_choice',
        'en_s1u7_n4_023_word_matching',
        'en_s1u7_n4_024_translate_builder',
        'en_s1u7_n4_025_word_arrange',
        'en_s1u7_n4_026_audio_match',
        'en_s1u7_n4_027_type_answer',
        'en_s1u7_n4_028_image_choice',
        'en_s1u7_n4_029_sentence_builder',
        'en_s1u7_n4_030_reply_builder',
        'en_s1u7_n4_031_type_answer',
        'en_s1u7_n4_032_word_matching',
        'en_s1u7_n4_033_translate_builder',
        'en_s1u7_n4_034_audio_match',
        'en_s1u7_n4_035_image_choice',
        'en_s1u7_n4_036_fill_in_blank',
        'en_s1u7_n4_037_type_answer',
        'en_s1u7_n4_038_word_arrange',
        'en_s1u7_n4_039_reply_builder',
        'en_s1u7_n4_040_dialog_complete',
      ],
    },

    {
      title: L(
        'SNS 자기소개 글',
        'Ijtimoiy tarmoqdagi tanishtiruv posti',
        'A social media post',
        'Пост в социальной сети',
      ),
      description: L(
        '직업, 취미, 언어 능력과 사이트를 이용하는 이유를 담은 간단한 자기소개 글을 익혀요.',
        'Kasb, hobbi, til qobiliyati va saytdan foydalanish sababini o‘z ichiga olgan sodda tanishtiruv postini o‘rganasiz.',
        'Learn how to write a simple social-media introduction about your job, hobbies, abilities and reasons for using a website.',
        'Учимся писать простой пост о работе, хобби, способностях и причине использования сайта.',
      ),
      category: LessonCategory.EXPRESSION,
      level: LV,
      order: 3,
      questions: [
        'en_s1u7_n4_041_speaking',
        'en_s1u7_n4_042_image_choice',
        'en_s1u7_n4_043_word_matching',
        'en_s1u7_n4_044_translate_builder',
        'en_s1u7_n4_045_word_arrange',
        'en_s1u7_n4_046_audio_match',
        'en_s1u7_n4_047_type_answer',
        'en_s1u7_n4_048_image_choice',
        'en_s1u7_n4_049_sentence_builder',
        'en_s1u7_n4_050_reply_builder',
        'en_s1u7_n4_051_type_answer',
        'en_s1u7_n4_052_word_matching',
        'en_s1u7_n4_053_translate_builder',
        'en_s1u7_n4_054_audio_match',
        'en_s1u7_n4_055_image_choice',
        'en_s1u7_n4_056_fill_in_blank',
        'en_s1u7_n4_057_type_answer',
        'en_s1u7_n4_058_word_arrange',
        'en_s1u7_n4_059_reply_builder',
        'en_s1u7_n4_060_dialog_complete',
      ],
    },

    {
      title: L(
        '자기소개 글 완성하기',
        'O‘zingiz haqingizdagi postni yozish',
        'Write about yourself',
        'Пишем о себе',
      ),
      description: L(
        '형용사+명사, 동사+부사, 빈도부사+동사 어순을 활용해 더 자연스러운 자기소개 글을 만들어요.',
        'Sifat+ot, fe’l+ravish va chastota ravishi+fe’l tartibidan foydalanib tabiiyroq tanishtiruv posti yozasiz.',
        'Use adjective + noun, verb + adverb and frequency adverb + verb word order to make a natural personal post.',
        'Используем порядок adjective + noun, verb + adverb и наречие частоты + глагол для естественного текста о себе.',
      ),
      category: LessonCategory.EXPRESSION,
      level: LV,
      order: 4,
      questions: [
        'en_s1u7_n4_061_speaking',
        'en_s1u7_n4_062_image_choice',
        'en_s1u7_n4_063_word_matching',
        'en_s1u7_n4_064_translate_builder',
        'en_s1u7_n4_065_word_arrange',
        'en_s1u7_n4_066_audio_match',
        'en_s1u7_n4_067_type_answer',
        'en_s1u7_n4_068_image_choice',
        'en_s1u7_n4_069_sentence_builder',
        'en_s1u7_n4_070_reply_builder',
        'en_s1u7_n4_071_type_answer',
        'en_s1u7_n4_072_word_matching',
        'en_s1u7_n4_073_translate_builder',
        'en_s1u7_n4_074_audio_match',
        'en_s1u7_n4_075_image_choice',
        'en_s1u7_n4_076_fill_in_blank',
        'en_s1u7_n4_077_type_answer',
        'en_s1u7_n4_078_word_arrange',
        'en_s1u7_n4_079_reply_builder',
        'en_s1u7_n4_080_dialog_complete',
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Section 1 · Unit 7 · Node 5
// 7.5 An unusual hobby + Unit 7 Review
//
// Coverage
// - throw / catch / juggle
// - ball / trick / practice / secret
// - easy / hard
// - learning and teaching new skills
// - Can you ...?
// - Can you teach me?
// - abilities + adverbs
// - like / love / hate + -ing
// - simple requests
// - job skills review
//
// Review vocabulary:
// - translator / salesperson / typist
//
// IMPORTANT:
// *_WORDS에는 단어만 등록.
// "juggling", "throw a ball", "learn a trick",
// "no problem", "teach me" 같은 형태/구문 등록 금지.
//
// Reused:
// swim / ride / play / sing / drive / dance
// type / cook / paint / take photos
// remember / speak / understand / learn
// slowly / badly / well / fast
// hobby / music / photography
// thirsty / lost / taxi / way
// engineer / musician
//
// 4 lessons × 20 questions = 80
// type_answer: 3 per lesson
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT7_NODE5_WORDS = [
  {
    code: 'en-noun-ability',
    english: 'ability',
    senseKey: 'skill-or-power-to-do-something',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '능력',
      'qobiliyat',
      'the skill or power to do something',
      'способность',
    ),
    examples: [
      {
        english: 'Koko has an unusual ability.',
        translations: L(
          '코코에게는 특별한 능력이 있어요.',
          'Kokoning noodatiy qobiliyati bor.',
          'Koko has an unusual ability.',
          'У Коко есть необычная способность.',
        ),
      },
    ],
    pronunciation: { ipa: '/əˈbɪləti/', ttsText: 'ability' },
    media: {
      emoji: '💪',
      imageUrl: '',
      imageAlt: L(
        '특별한 능력',
        'maxsus qobiliyat',
        'a special ability',
        'особая способность',
      ),
    },
    tags: ['skills', 'ability'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-advert',
    english: 'advert',
    senseKey: 'advertisement',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('광고', 'reklama', 'an advertisement', 'реклама; объявление'),
    examples: [
      {
        english: 'Look at this job advert.',
        translations: L(
          '이 구인 광고를 보세요.',
          'Bu ish e’loniga qarang.',
          'Look at this job advert.',
          'Посмотрите на это объявление о работе.',
        ),
      },
    ],
    pronunciation: { ipa: '/ˈædvɜːt/', ttsText: 'advert' },
    media: {
      emoji: '📢',
      imageUrl: '',
      imageAlt: L('광고', 'reklama', 'an advert', 'объявление'),
    },
    tags: ['work', 'communication'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-country-algeria',
    english: 'Algeria',
    senseKey: 'country-algeria',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('알제리', 'Jazoir', 'a country in North Africa', 'Алжир'),
    examples: [
      {
        english: 'I am from Algeria.',
        translations: L(
          '저는 알제리 출신이에요.',
          'Men Jazoirdanman.',
          'I am from Algeria.',
          'Я из Алжира.',
        ),
      },
    ],
    pronunciation: { ipa: '/ælˈdʒɪəriə/', ttsText: 'Algeria' },
    media: {
      emoji: '🇩🇿',
      imageUrl: '',
      imageAlt: L(
        '알제리 국기',
        'Jazoir bayrog‘i',
        'the flag of Algeria',
        'флаг Алжира',
      ),
    },
    tags: ['countries'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-animal',
    english: 'animal',
    senseKey: 'living-creature-not-plant',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '동물',
      'hayvon',
      'a living creature that is not a plant',
      'животное',
    ),
    examples: [
      {
        english: 'She can paint animals.',
        translations: L(
          '그녀는 동물을 그릴 수 있어요.',
          'U hayvonlarni chiza oladi.',
          'She can paint animals.',
          'Она умеет рисовать животных.',
        ),
      },
    ],
    pronunciation: { ipa: '/ˈænɪməl/', ttsText: 'animal' },
    media: {
      emoji: '🐾',
      imageUrl: '',
      imageAlt: L('동물', 'hayvon', 'an animal', 'животное'),
    },
    tags: ['animals'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-behaviour',
    english: 'behaviour',
    senseKey: 'way-person-or-animal-acts',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '행동; 행동 방식',
      'xulq-atvor',
      'the way a person or animal acts',
      'поведение',
    ),
    examples: [
      {
        english: 'The project studies dolphin behaviour.',
        translations: L(
          '그 프로젝트는 돌고래의 행동을 연구해요.',
          'Loyiha delfinlarning xulq-atvorini o‘rganadi.',
          'The project studies dolphin behaviour.',
          'Проект изучает поведение дельфинов.',
        ),
      },
    ],
    pronunciation: { ipa: '/bɪˈheɪvjə(r)/', ttsText: 'behaviour' },
    media: {
      emoji: '🔍',
      imageUrl: '',
      imageAlt: L(
        '동물 행동 연구',
        'hayvon xulqini o‘rganish',
        'studying animal behaviour',
        'изучение поведения животных',
      ),
    },
    tags: ['research', 'animals'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-bird',
    english: 'bird',
    senseKey: 'feathered-animal-with-wings',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('새', 'qush', 'an animal with feathers and wings', 'птица'),
    examples: [
      {
        english: 'Murphy is an amazing bird.',
        translations: L(
          '머피는 놀라운 새예요.',
          'Murphy ajoyib qush.',
          'Murphy is an amazing bird.',
          'Мёрфи — удивительная птица.',
        ),
      },
    ],
    pronunciation: { ipa: '/bɜːd/', ttsText: 'bird' },
    media: {
      emoji: '🐦',
      imageUrl: '',
      imageAlt: L('새', 'qush', 'a bird', 'птица'),
    },
    tags: ['animals'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-bored',
    english: 'bored',
    senseKey: 'feeling-uninterested',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '지루해하는',
      'zerikkan',
      'feeling tired and uninterested',
      'скучающий',
    ),
    examples: [
      {
        english: 'I am always bored at the weekend.',
        translations: L(
          '저는 주말이면 항상 지루해요.',
          'Men dam olish kunlari doim zerikaman.',
          'I am always bored at the weekend.',
          'Мне всегда скучно по выходным.',
        ),
      },
    ],
    pronunciation: { ipa: '/bɔːd/', ttsText: 'bored' },
    media: {
      emoji: '🥱',
      imageUrl: '',
      imageAlt: L(
        '지루해하는 사람',
        'zerikkan odam',
        'a bored person',
        'скучающий человек',
      ),
    },
    tags: ['feelings', 'adjectives'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-boring',
    english: 'boring',
    senseKey: 'making-someone-bored',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('지루한', 'zerikarli', 'not interesting', 'скучный'),
    examples: [
      {
        english: 'Watching football is boring.',
        translations: L(
          '축구를 보는 건 지루해요.',
          'Futbol ko‘rish zerikarli.',
          'Watching football is boring.',
          'Смотреть футбол скучно.',
        ),
      },
    ],
    pronunciation: { ipa: '/ˈbɔːrɪŋ/', ttsText: 'boring' },
    media: {
      emoji: '😐',
      imageUrl: '',
      imageAlt: L(
        '지루한 활동',
        'zerikarli mashg‘ulot',
        'a boring activity',
        'скучное занятие',
      ),
    },
    tags: ['adjectives', 'feelings'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-cost',
    english: 'cost',
    senseKey: 'have-particular-price',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '가격이 ~이다; 비용이 들다',
      'turmoq; narxi bo‘lmoq',
      'to have a particular price',
      'стоить',
    ),
    examples: [
      {
        english: 'How much does it cost?',
        translations: L(
          '얼마예요?',
          'Bu qancha turadi?',
          'How much does it cost?',
          'Сколько это стоит?',
        ),
      },
    ],
    pronunciation: { ipa: '/kɒst/', ttsText: 'cost' },
    media: {
      emoji: '💰',
      imageUrl: '',
      imageAlt: L('가격표', 'narx yorlig‘i', 'a price tag', 'ценник'),
    },
    tags: ['shopping', 'money'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-animal-dolphin',
    english: 'dolphin',
    senseKey: 'intelligent-sea-mammal',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('돌고래', 'delfin', 'an intelligent sea mammal', 'дельфин'),
    examples: [
      {
        english: 'Dolphins can understand many words.',
        translations: L(
          '돌고래는 많은 단어를 이해할 수 있어요.',
          'Delfinlar ko‘p so‘zlarni tushuna oladi.',
          'Dolphins can understand many words.',
          'Дельфины могут понимать много слов.',
        ),
      },
    ],
    pronunciation: { ipa: '/ˈdɒlfɪn/', ttsText: 'dolphin' },
    media: {
      emoji: '🐬',
      imageUrl: '',
      imageAlt: L('돌고래', 'delfin', 'a dolphin', 'дельфин'),
    },
    tags: ['animals', 'sea'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-enthusiastic',
    english: 'enthusiastic',
    senseKey: 'very-interested-and-excited',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '열정적인',
      'g‘ayratli; ishtiyoqli',
      'very interested and excited about something',
      'увлечённый; полный энтузиазма',
    ),
    examples: [
      {
        english: 'We want enthusiastic English teachers.',
        translations: L(
          '우리는 열정적인 영어 선생님을 원해요.',
          'Biz g‘ayratli ingliz tili o‘qituvchilarini xohlaymiz.',
          'We want enthusiastic English teachers.',
          'Нам нужны увлечённые преподаватели английского.',
        ),
      },
    ],
    pronunciation: { ipa: '/ɪnˌθjuːziˈæstɪk/', ttsText: 'enthusiastic' },
    media: {
      emoji: '🤩',
      imageUrl: '',
      imageAlt: L(
        '열정적인 사람',
        'g‘ayratli odam',
        'an enthusiastic person',
        'увлечённый человек',
      ),
    },
    tags: ['adjectives', 'personality'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-fast',
    english: 'fast',
    senseKey: 'able-to-do-something-quickly',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('빠른', 'tez', 'able to move, learn or work quickly', 'быстрый'),
    examples: [
      {
        english: 'I am a fast learner.',
        translations: L(
          '저는 빨리 배우는 사람이에요.',
          'Men tez o‘rganaman.',
          'I am a fast learner.',
          'Я быстро учусь.',
        ),
      },
    ],
    pronunciation: { ipa: '/fɑːst/', ttsText: 'fast' },
    media: {
      emoji: '⚡',
      imageUrl: '',
      imageAlt: L(
        '빠른 학습',
        'tez o‘rganish',
        'fast learning',
        'быстрое обучение',
      ),
    },
    tags: ['adjectives', 'skills'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-animal-gorilla',
    english: 'gorilla',
    senseKey: 'large-african-ape',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('고릴라', 'gorilla', 'a large African ape', 'горилла'),
    examples: [
      {
        english: 'Koko is a gorilla.',
        translations: L(
          '코코는 고릴라예요.',
          'Koko gorilla.',
          'Koko is a gorilla.',
          'Коко — горилла.',
        ),
      },
    ],
    pronunciation: { ipa: '/ɡəˈrɪlə/', ttsText: 'gorilla' },
    media: {
      emoji: '🦍',
      imageUrl: '',
      imageAlt: L('고릴라', 'gorilla', 'a gorilla', 'горилла'),
    },
    tags: ['animals'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-job-guide',
    english: 'guide',
    senseKey: 'person-who-shows-visitors-around',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '가이드; 안내원',
      'gid',
      'a person who shows visitors around a place',
      'гид',
    ),
    examples: [
      {
        english: 'My mother is a tour guide.',
        translations: L(
          '우리 어머니는 관광 가이드예요.',
          'Onam sayohat gididir.',
          'My mother is a tour guide.',
          'Моя мама работает гидом.',
        ),
      },
    ],
    pronunciation: { ipa: '/ɡaɪd/', ttsText: 'guide' },
    media: {
      emoji: '🗺️',
      imageUrl: '',
      imageAlt: L('관광 가이드', 'sayohat gidi', 'a tour guide', 'экскурсовод'),
    },
    tags: ['jobs', 'travel'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-interest',
    english: 'interest',
    senseKey: 'activity-or-subject-person-likes',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '관심사; 흥미',
      'qiziqish',
      'a subject or activity that you enjoy',
      'интерес; увлечение',
    ),
    examples: [
      {
        english: 'Do you have a lot of interests?',
        translations: L(
          '관심사가 많아요?',
          'Qiziqishlaringiz ko‘pmi?',
          'Do you have a lot of interests?',
          'У вас много интересов?',
        ),
      },
    ],
    pronunciation: { ipa: '/ˈɪntrəst/', ttsText: 'interest' },
    media: {
      emoji: '💡',
      imageUrl: '',
      imageAlt: L('관심사', 'qiziqish', 'an interest', 'интерес'),
    },
    tags: ['hobbies', 'interests'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-know',
    english: 'know',
    senseKey: 'have-information-or-understanding',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '알다',
      'bilmoq',
      'to have information or understanding about something',
      'знать',
    ),
    examples: [
      {
        english: 'Do you know any clever animals?',
        translations: L(
          '똑똑한 동물을 알고 있어요?',
          'Aqlli hayvonlarni bilasizmi?',
          'Do you know any clever animals?',
          'Вы знаете каких-нибудь умных животных?',
        ),
      },
    ],
    pronunciation: { ipa: '/nəʊ/', ttsText: 'know' },
    media: {
      emoji: '🧠',
      imageUrl: '',
      imageAlt: L(
        '무언가를 알고 있는 모습',
        'bilish',
        'knowing something',
        'знание',
      ),
    },
    tags: ['verbs', 'knowledge'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-country-lebanon',
    english: 'Lebanon',
    senseKey: 'country-lebanon',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('레바논', 'Livan', 'a country in the Middle East', 'Ливан'),
    examples: [
      {
        english: 'He is from Lebanon.',
        translations: L(
          '그는 레바논 출신이에요.',
          'U Livandan.',
          'He is from Lebanon.',
          'Он из Ливана.',
        ),
      },
    ],
    pronunciation: { ipa: '/ˈlebənən/', ttsText: 'Lebanon' },
    media: {
      emoji: '🇱🇧',
      imageUrl: '',
      imageAlt: L(
        '레바논 국기',
        'Livan bayrog‘i',
        'the flag of Lebanon',
        'флаг Ливана',
      ),
    },
    tags: ['countries'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-pronoun-nobody',
    english: 'nobody',
    senseKey: 'no-person',
    partOfSpeech: WordPartOfSpeech.PRONOUN,
    meaning: L('아무도 ~않다', 'hech kim', 'no person', 'никто'),
    examples: [
      {
        english: 'Nobody goes to work by ferry.',
        translations: L(
          '아무도 페리로 출근하지 않아요.',
          'Hech kim ishga paromda bormaydi.',
          'Nobody goes to work by ferry.',
          'Никто не ездит на работу на пароме.',
        ),
      },
    ],
    pronunciation: { ipa: '/ˈnəʊbədi/', ttsText: 'nobody' },
    media: {
      emoji: '🚫',
      imageUrl: '',
      imageAlt: L('아무도 없는 모습', 'hech kim yo‘q', 'nobody', 'никого нет'),
    },
    tags: ['pronouns', 'grammar'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-paintbrush',
    english: 'paintbrush',
    senseKey: 'brush-used-for-painting',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('붓', 'mo‘yqalam', 'a brush used for painting', 'кисть'),
    examples: [
      {
        english: 'Koko can use a paintbrush.',
        translations: L(
          '코코는 붓을 사용할 수 있어요.',
          'Koko mo‘yqalamdan foydalana oladi.',
          'Koko can use a paintbrush.',
          'Коко умеет пользоваться кистью.',
        ),
      },
    ],
    pronunciation: { ipa: '/ˈpeɪntbrʌʃ/', ttsText: 'paintbrush' },
    media: {
      emoji: '🖌️',
      imageUrl: '',
      imageAlt: L('붓', 'mo‘yqalam', 'a paintbrush', 'кисть'),
    },
    tags: ['art', 'objects'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-animal-parrot',
    english: 'parrot',
    senseKey: 'colourful-bird-that-can-copy-sounds',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '앵무새',
      'to‘tiqush',
      'a colourful bird that can copy sounds',
      'попугай',
    ),
    examples: [
      {
        english: 'My neighbours have a parrot.',
        translations: L(
          '우리 이웃은 앵무새를 키워요.',
          'Qo‘shnilarimning to‘tiqushi bor.',
          'My neighbours have a parrot.',
          'У моих соседей есть попугай.',
        ),
      },
    ],
    pronunciation: { ipa: '/ˈpærət/', ttsText: 'parrot' },
    media: {
      emoji: '🦜',
      imageUrl: '',
      imageAlt: L('앵무새', 'to‘tiqush', 'a parrot', 'попугай'),
    },
    tags: ['animals', 'birds'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-picture',
    english: 'picture',
    senseKey: 'image-drawing-or-photo',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '그림; 사진',
      'rasm',
      'an image, drawing or photograph',
      'картина; изображение',
    ),
    examples: [
      {
        english: 'Koko can paint a picture of a bird.',
        translations: L(
          '코코는 새 그림을 그릴 수 있어요.',
          'Koko qushning rasmini chiza oladi.',
          'Koko can paint a picture of a bird.',
          'Коко умеет рисовать птицу.',
        ),
      },
    ],
    pronunciation: { ipa: '/ˈpɪktʃə(r)/', ttsText: 'picture' },
    media: {
      emoji: '🖼️',
      imageUrl: '',
      imageAlt: L('그림', 'rasm', 'a picture', 'картина'),
    },
    tags: ['art', 'images'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-sign',
    english: 'sign',
    senseKey: 'gesture-or-symbol-with-meaning',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '기호; 몸짓; 수화 기호',
      'belgi; imo-ishora',
      'a gesture or symbol that has a meaning',
      'знак; жест',
    ),
    examples: [
      {
        english: 'She can use over one thousand signs.',
        translations: L(
          '그녀는 천 개가 넘는 기호를 사용할 수 있어요.',
          'U mingdan ortiq ishoradan foydalana oladi.',
          'She can use over one thousand signs.',
          'Она может использовать более тысячи знаков.',
        ),
      },
    ],
    pronunciation: { ipa: '/saɪn/', ttsText: 'sign' },
    media: {
      emoji: '🤟',
      imageUrl: '',
      imageAlt: L(
        '손으로 하는 기호',
        'qo‘l ishorasi',
        'a hand sign',
        'жест рукой',
      ),
    },
    tags: ['communication', 'sign-language'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-skill',
    english: 'skill',
    senseKey: 'ability-learned-through-practice',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '기술; 능력',
      'ko‘nikma',
      'an ability learned through practice',
      'навык; умение',
    ),
    examples: [
      {
        english: 'It is important to learn new skills.',
        translations: L(
          '새로운 기술을 배우는 것은 중요해요.',
          'Yangi ko‘nikmalarni o‘rganish muhim.',
          'It is important to learn new skills.',
          'Важно приобретать новые навыки.',
        ),
      },
    ],
    pronunciation: { ipa: '/skɪl/', ttsText: 'skill' },
    media: {
      emoji: '🛠️',
      imageUrl: '',
      imageAlt: L(
        '새로운 기술',
        'yangi ko‘nikma',
        'a new skill',
        'новый навык',
      ),
    },
    tags: ['skills', 'learning'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-spanish',
    english: 'Spanish',
    senseKey: 'spanish-language',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '스페인어',
      'ispan tili',
      'the Spanish language',
      'испанский язык',
    ),
    examples: [
      {
        english: 'I can speak Spanish.',
        translations: L(
          '저는 스페인어를 할 수 있어요.',
          'Men ispan tilida gapira olaman.',
          'I can speak Spanish.',
          'Я умею говорить по-испански.',
        ),
      },
    ],
    pronunciation: { ipa: '/ˈspænɪʃ/', ttsText: 'Spanish' },
    media: {
      emoji: '🇪🇸',
      imageUrl: '',
      imageAlt: L('스페인어', 'ispan tili', 'Spanish', 'испанский язык'),
    },
    tags: ['languages'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-person-swimmer',
    english: 'swimmer',
    senseKey: 'person-who-swims',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '수영하는 사람; 수영 선수',
      'suzuvchi',
      'a person who swims',
      'пловец',
    ),
    examples: [
      {
        english: 'Is Jack a good swimmer?',
        translations: L(
          '잭은 수영을 잘해요?',
          'Jack yaxshi suzuvchimi?',
          'Is Jack a good swimmer?',
          'Джек хорошо плавает?',
        ),
      },
    ],
    pronunciation: { ipa: '/ˈswɪmə(r)/', ttsText: 'swimmer' },
    media: {
      emoji: '🏊',
      imageUrl: '',
      imageAlt: L('수영하는 사람', 'suzuvchi', 'a swimmer', 'пловец'),
    },
    tags: ['sports', 'people'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-country-uruguay',
    english: 'Uruguay',
    senseKey: 'country-uruguay',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('우루과이', 'Urugvay', 'a country in South America', 'Уругвай'),
    examples: [
      {
        english: 'He is from Uruguay.',
        translations: L(
          '그는 우루과이 출신이에요.',
          'U Urugvaydan.',
          'He is from Uruguay.',
          'Он из Уругвая.',
        ),
      },
    ],
    pronunciation: { ipa: '/ˈjʊərəɡwaɪ/', ttsText: 'Uruguay' },
    media: {
      emoji: '🇺🇾',
      imageUrl: '',
      imageAlt: L(
        '우루과이 국기',
        'Urugvay bayrog‘i',
        'the flag of Uruguay',
        'флаг Уругвая',
      ),
    },
    tags: ['countries'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-video',
    english: 'video',
    senseKey: 'recorded-moving-images',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '영상; 비디오',
      'video',
      'a recording of moving images',
      'видео',
    ),
    examples: [
      {
        english: 'We watch Koko in a video.',
        translations: L(
          '우리는 영상에서 코코를 봐요.',
          'Biz Kokoni videoda ko‘ramiz.',
          'We watch Koko in a video.',
          'Мы смотрим видео с Коко.',
        ),
      },
    ],
    pronunciation: { ipa: '/ˈvɪdiəʊ/', ttsText: 'video' },
    media: {
      emoji: '🎥',
      imageUrl: '',
      imageAlt: L('영상', 'video', 'a video', 'видео'),
    },
    tags: ['media'],
    difficulty: 1,
    isCore: true,
  },
  {
    code: 'en-verb-throw',
    english: 'throw',
    senseKey: 'send-object-through-air-by-hand',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '던지다',
      'otmoq',
      'to send an object through the air with your hand',
      'бросать',
    ),
    examples: [
      {
        english: 'Throw the ball to me.',
        translations: L(
          '공을 저에게 던져 주세요.',
          'To‘pni menga oting.',
          'Throw the ball to me.',
          'Бросьте мяч мне.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/θrəʊ/',
      ttsText: 'throw',
    },
    media: {
      emoji: '🤾',
      imageUrl: '',
      imageAlt: L(
        '공을 던지는 사람',
        'to‘p otayotgan odam',
        'a person throwing a ball',
        'человек, бросающий мяч',
      ),
    },
    tags: ['skills', 'actions'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-catch',
    english: 'catch',
    senseKey: 'stop-and-hold-moving-object',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '받다; 잡다',
      'tutmoq',
      'to stop and hold something that is moving through the air',
      'ловить',
    ),
    examples: [
      {
        english: 'Catch the ball.',
        translations: L(
          '공을 받아요.',
          'To‘pni tuting.',
          'Catch the ball.',
          'Поймайте мяч.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/kætʃ/',
      ttsText: 'catch',
    },
    media: {
      emoji: '🙌',
      imageUrl: '',
      imageAlt: L(
        '공을 받는 사람',
        'to‘pni tutayotgan odam',
        'a person catching a ball',
        'человек, ловящий мяч',
      ),
    },
    tags: ['skills', 'actions'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-juggle',
    english: 'juggle',
    senseKey: 'keep-several-objects-moving-in-air',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '저글링하다',
      'jonglyorlik qilmoq',
      'to keep several objects moving through the air by throwing and catching them',
      'жонглировать',
    ),
    examples: [
      {
        english: 'James can juggle three balls.',
        translations: L(
          '제임스는 공 세 개로 저글링할 수 있어요.',
          'Jeyms uchta to‘p bilan jonglyorlik qila oladi.',
          'James can juggle three balls.',
          'Джеймс умеет жонглировать тремя мячами.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈdʒʌɡəl/',
      ttsText: 'juggle',
    },
    media: {
      emoji: '🤹',
      imageUrl: '',
      imageAlt: L(
        '저글링하는 사람',
        'jonglyorlik qilayotgan odam',
        'a person juggling',
        'человек, который жонглирует',
      ),
    },
    tags: ['skills', 'hobbies'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-ball',
    english: 'ball',
    senseKey: 'round-object-used-in-games',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('공', 'to‘p', 'a round object used in games and sports', 'мяч'),
    examples: [
      {
        english: 'He has three balls.',
        translations: L(
          '그는 공 세 개를 가지고 있어요.',
          'Uning uchta to‘pi bor.',
          'He has three balls.',
          'У него три мяча.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/bɔːl/',
      ttsText: 'ball',
    },
    media: {
      emoji: '⚽',
      imageUrl: '',
      imageAlt: L('공', 'to‘p', 'a ball', 'мяч'),
    },
    tags: ['sports', 'objects'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-trick',
    english: 'trick',
    senseKey: 'skilful-action-for-entertainment',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '기술; 묘기',
      'tryuk',
      'a skilful action done to entertain or impress people',
      'трюк',
    ),
    examples: [
      {
        english: 'James learns a new trick.',
        translations: L(
          '제임스는 새로운 묘기를 배워요.',
          'Jeyms yangi tryuk o‘rganadi.',
          'James learns a new trick.',
          'Джеймс учит новый трюк.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/trɪk/',
      ttsText: 'trick',
    },
    media: {
      emoji: '🎩',
      imageUrl: '',
      imageAlt: L('묘기', 'tryuk', 'a trick', 'трюк'),
    },
    tags: ['skills', 'hobbies'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-practice',
    english: 'practice',
    senseKey: 'repeated-training-to-improve-skill',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '연습',
      'mashq',
      'regular training that helps you improve a skill',
      'практика; тренировка',
    ),
    examples: [
      {
        english: 'Juggling needs a lot of practice.',
        translations: L(
          '저글링은 많은 연습이 필요해요.',
          'Jonglyorlik uchun ko‘p mashq kerak.',
          'Juggling needs a lot of practice.',
          'Жонглирование требует много практики.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈpræktɪs/',
      ttsText: 'practice',
    },
    media: {
      emoji: '🎯',
      imageUrl: '',
      imageAlt: L(
        '기술 연습',
        'mashq qilish',
        'skill practice',
        'тренировка навыка',
      ),
    },
    tags: ['skills', 'learning'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-secret',
    english: 'secret',
    senseKey: 'important-key-to-success',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '비결; 비밀',
      'sir',
      'something known by few people or an important key to success',
      'секрет',
    ),
    examples: [
      {
        english: 'Practice is the secret to juggling.',
        translations: L(
          '연습이 저글링의 비결이에요.',
          'Mashq jonglyorlikning siri.',
          'Practice is the secret to juggling.',
          'Практика — секрет жонглирования.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈsiːkrət/',
      ttsText: 'secret',
    },
    media: {
      emoji: '🤫',
      imageUrl: '',
      imageAlt: L('비밀을 나타내는 모습', 'sir', 'a secret', 'секрет'),
    },
    tags: ['learning', 'nouns'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-easy',
    english: 'easy',
    senseKey: 'not-difficult-to-do',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('쉬운', 'oson', 'not difficult to do or understand', 'лёгкий'),
    examples: [
      {
        english: 'Is juggling easy?',
        translations: L(
          '저글링은 쉬워요?',
          'Jonglyorlik osonmi?',
          'Is juggling easy?',
          'Жонглировать легко?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈiːzi/',
      ttsText: 'easy',
    },
    media: {
      emoji: '🙂',
      imageUrl: '',
      imageAlt: L('쉬운 일', 'oson ish', 'something easy', 'что-то лёгкое'),
    },
    tags: ['adjectives', 'skills'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-hard',
    english: 'hard',
    senseKey: 'difficult-to-do',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('어려운', 'qiyin', 'difficult to do or understand', 'трудный'),
    examples: [
      {
        english: 'This trick is hard.',
        translations: L(
          '이 묘기는 어려워요.',
          'Bu tryuk qiyin.',
          'This trick is hard.',
          'Этот трюк трудный.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/hɑːd/',
      ttsText: 'hard',
    },
    media: {
      emoji: '😣',
      imageUrl: '',
      imageAlt: L(
        '어려운 일',
        'qiyin ish',
        'something difficult',
        'что-то трудное',
      ),
    },
    tags: ['adjectives', 'skills'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-job-translator',
    english: 'translator',
    senseKey: 'person-translating-written-language',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '번역가',
      'tarjimon',
      'a person whose job is to translate from one language to another',
      'переводчик',
    ),
    examples: [
      {
        english: 'Jane is a translator.',
        translations: L(
          '제인은 번역가예요.',
          'Jeyn tarjimon.',
          'Jane is a translator.',
          'Джейн — переводчик.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/trænzˈleɪtə/',
      ttsText: 'translator',
    },
    media: {
      emoji: '🌍',
      imageUrl: '',
      imageAlt: L('번역가', 'tarjimon', 'a translator', 'переводчик'),
    },
    tags: ['jobs', 'languages'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-job-salesperson',
    english: 'salesperson',
    senseKey: 'person-selling-things-to-customers',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '판매원',
      'sotuvchi',
      'a person whose job is to sell things to customers',
      'продавец',
    ),
    examples: [
      {
        english: 'She is a good salesperson.',
        translations: L(
          '그녀는 훌륭한 판매원이에요.',
          'U yaxshi sotuvchi.',
          'She is a good salesperson.',
          'Она хороший продавец.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈseɪlzpɜːsən/',
      ttsText: 'salesperson',
    },
    media: {
      emoji: '🛍️',
      imageUrl: '',
      imageAlt: L('판매원', 'sotuvchi', 'a salesperson', 'продавец'),
    },
    tags: ['jobs', 'people'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-job-typist',
    english: 'typist',
    senseKey: 'person-who-types',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '타이피스트; 타자하는 사람',
      'matn teruvchi',
      'a person who types documents or text',
      'машинист; оператор набора',
    ),
    examples: [
      {
        english: 'I am a slow typist.',
        translations: L(
          '저는 타이핑이 느린 사람이에요.',
          'Men sekin matn teraman.',
          'I am a slow typist.',
          'Я медленно печатаю.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈtaɪpɪst/',
      ttsText: 'typist',
    },
    media: {
      emoji: '⌨️',
      imageUrl: '',
      imageAlt: L(
        '타이핑하는 사람',
        'matn terayotgan odam',
        'a typist',
        'человек, печатающий текст',
      ),
    },
    tags: ['jobs', 'computer'],
    difficulty: 1,
    isCore: true,
  },
];

export const EN_S1_UNIT7_NODE5_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Learn to juggle
  // ===========================================================

  en_s1u7_n5_001_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'James can juggle three balls.',
    audioText: 'James can juggle three balls.',
    answerTranslation: L(
      '제임스는 공 세 개로 저글링할 수 있어요.',
      'Jeyms uchta to‘p bilan jonglyorlik qila oladi.',
      'James can juggle three balls.',
      'Джеймс умеет жонглировать тремя мячами.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['juggle', 'abilities'],
  },

  en_s1u7_n5_002_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'ball',
    choices: [
      { text: 'trick', label: '🎩', emoji: '🎩', imageUrl: '' },
      { text: 'ball', label: '⚽', emoji: '⚽', imageUrl: '' },
      { text: 'practice', label: '🎯', emoji: '🎯', imageUrl: '' },
      { text: 'secret', label: '🤫', emoji: '🤫', imageUrl: '' },
    ],
    answerTranslation: L('공', 'to‘p', 'ball', 'мяч'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['ball'],
  },

  en_s1u7_n5_003_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'throw',
        native: 'otmoq',
        nativeI18n: L('던지다', 'otmoq', 'throw', 'бросать'),
      },
      {
        text: 'catch',
        native: 'tutmoq',
        nativeI18n: L('받다', 'tutmoq', 'catch', 'ловить'),
      },
      {
        text: 'juggle',
        native: 'jonglyorlik qilmoq',
        nativeI18n: L(
          '저글링하다',
          'jonglyorlik qilmoq',
          'juggle',
          'жонглировать',
        ),
      },
      {
        text: 'ball',
        native: 'to‘p',
        nativeI18n: L('공', 'to‘p', 'ball', 'мяч'),
      },
      {
        text: 'trick',
        native: 'tryuk',
        nativeI18n: L('묘기', 'tryuk', 'trick', 'трюк'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['juggling', 'matching'],
  },

  en_s1u7_n5_004_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['three', 'juggle', 'can', 'James', 'balls', 'catch', 'throw'],
    answer: 'James can juggle three balls',
    answerTranslation: L(
      '제임스는 공 세 개로 저글링할 수 있어요.',
      'Jeyms uchta to‘p bilan jonglyorlik qila oladi.',
      'James can juggle three balls.',
      'Джеймс умеет жонглировать тремя мячами.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['juggle', 'can'],
  },

  en_s1u7_n5_005_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['the', 'ball', 'Catch', 'slowly', 'throw', 'trick'],
    answer: 'Catch the ball',
    audioText: 'Catch the ball.',
    answerTranslation: L(
      '공을 받아요.',
      'To‘pni tuting.',
      'Catch the ball.',
      'Поймайте мяч.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['catch', 'ball'],
  },

  en_s1u7_n5_006_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'throw',
        native: 'otmoq',
        nativeI18n: L('던지다', 'otmoq', 'throw', 'бросать'),
      },
      {
        text: 'catch',
        native: 'tutmoq',
        nativeI18n: L('받다', 'tutmoq', 'catch', 'ловить'),
      },
      {
        text: 'juggle',
        native: 'jonglyorlik qilmoq',
        nativeI18n: L(
          '저글링하다',
          'jonglyorlik qilmoq',
          'juggle',
          'жонглировать',
        ),
      },
      {
        text: 'ball',
        native: 'to‘p',
        nativeI18n: L('공', 'to‘p', 'ball', 'мяч'),
      },
      {
        text: 'trick',
        native: 'tryuk',
        nativeI18n: L('묘기', 'tryuk', 'trick', 'трюк'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['juggling', 'listening'],
  },

  en_s1u7_n5_007_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'James can ',
    sentenceSuffix: ' three balls.',
    answer: 'juggle',
    answerTranslation: L(
      '제임스는 공 세 개로 저글링할 수 있어요.',
      'Jeyms uchta to‘p bilan jonglyorlik qila oladi.',
      'James can juggle three balls.',
      'Джеймс умеет жонглировать тремя мячами.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "juggle".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'juggle'],
  },

  en_s1u7_n5_008_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'trick',
    choices: [
      { text: 'ball', label: '⚽', emoji: '⚽', imageUrl: '' },
      { text: 'practice', label: '🎯', emoji: '🎯', imageUrl: '' },
      { text: 'trick', label: '🎩', emoji: '🎩', imageUrl: '' },
      { text: 'secret', label: '🤫', emoji: '🤫', imageUrl: '' },
    ],
    answerTranslation: L('묘기', 'tryuk', 'trick', 'трюк'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['trick'],
  },

  en_s1u7_n5_009_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Throw the ball to me.',
    audioText: 'Throw the ball to me.',
    answerI18n: L(
      '공을 저에게 던져 주세요',
      'To‘pni menga oting',
      'Throw the ball to me',
      'Бросьте мяч мне',
    ),
    options: ['Throw', 'the', 'ball', 'to', 'me', 'catch', 'practice'],
    optionsI18n: {
      ko: ['공을', '저에게', '던져', '주세요', '받아요'],
      uz: ['To‘pni', 'menga', 'oting', 'tuting'],
      en: ['Throw', 'the', 'ball', 'to', 'me'],
      ru: ['Бросьте', 'мяч', 'мне'],
    },
    answerTranslation: L(
      '공을 저에게 던져 주세요.',
      'To‘pni menga oting.',
      'Throw the ball to me.',
      'Бросьте мяч мне.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['throw', 'ball'],
  },

  en_s1u7_n5_010_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Can you juggle?',
    options: ['Yes', 'I', 'can', 'juggle', 'three', 'balls', 'catch', 'No'],
    answer: 'Yes I can juggle three balls',
    answerTranslation: L(
      '네, 공 세 개로 저글링할 수 있어요.',
      'Ha, uchta to‘p bilan jonglyorlik qila olaman.',
      'Yes, I can juggle three balls.',
      'Да, я умею жонглировать тремя мячами.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['juggle', 'reply'],
  },

  en_s1u7_n5_011_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Throw the ',
    sentenceSuffix: ' to me.',
    answer: 'ball',
    answerTranslation: L(
      '공을 저에게 던져 주세요.',
      'To‘pni menga oting.',
      'Throw the ball to me.',
      'Бросьте мяч мне.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "ball".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'ball'],
  },

  en_s1u7_n5_012_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'practice',
        native: 'mashq',
        nativeI18n: L('연습', 'mashq', 'practice', 'практика'),
      },
      {
        text: 'secret',
        native: 'sir',
        nativeI18n: L('비결', 'sir', 'secret', 'секрет'),
      },
      {
        text: 'easy',
        native: 'oson',
        nativeI18n: L('쉬운', 'oson', 'easy', 'лёгкий'),
      },
      {
        text: 'hard',
        native: 'qiyin',
        nativeI18n: L('어려운', 'qiyin', 'hard', 'трудный'),
      },
      {
        text: 'trick',
        native: 'tryuk',
        nativeI18n: L('묘기', 'tryuk', 'trick', 'трюк'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['juggling', 'matching'],
  },

  en_s1u7_n5_013_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['a', 'new', 'trick', 'learn', 'can', 'You', 'ball', 'practice'],
    answer: 'You can learn a new trick',
    answerTranslation: L(
      '새로운 묘기를 배울 수 있어요.',
      'Siz yangi tryuk o‘rgana olasiz.',
      'You can learn a new trick.',
      'Вы можете научиться новому трюку.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['trick', 'learn'],
  },

  en_s1u7_n5_014_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'practice',
        native: 'mashq',
        nativeI18n: L('연습', 'mashq', 'practice', 'практика'),
      },
      {
        text: 'secret',
        native: 'sir',
        nativeI18n: L('비결', 'sir', 'secret', 'секрет'),
      },
      {
        text: 'easy',
        native: 'oson',
        nativeI18n: L('쉬운', 'oson', 'easy', 'лёгкий'),
      },
      {
        text: 'hard',
        native: 'qiyin',
        nativeI18n: L('어려운', 'qiyin', 'hard', 'трудный'),
      },
      {
        text: 'trick',
        native: 'tryuk',
        nativeI18n: L('묘기', 'tryuk', 'trick', 'трюк'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['juggling', 'listening'],
  },

  en_s1u7_n5_015_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'practice',
    choices: [
      { text: 'secret', label: '🤫', emoji: '🤫', imageUrl: '' },
      { text: 'ball', label: '⚽', emoji: '⚽', imageUrl: '' },
      { text: 'practice', label: '🎯', emoji: '🎯', imageUrl: '' },
      { text: 'trick', label: '🎩', emoji: '🎩', imageUrl: '' },
    ],
    answerTranslation: L('연습', 'mashq', 'practice', 'практика'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['practice'],
  },

  en_s1u7_n5_016_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Juggling needs a lot of ___.',
    blankAnswers: ['practice'],
    options: ['practice', 'ball', 'easy', 'catch'],
    answer: 'practice',
    answerTranslation: L(
      '저글링은 많은 연습이 필요해요.',
      'Jonglyorlik uchun ko‘p mashq kerak.',
      'Juggling needs a lot of practice.',
      'Жонглирование требует много практики.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['practice'],
  },

  en_s1u7_n5_017_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'This ',
    sentenceSuffix: ' is hard.',
    answer: 'trick',
    answerTranslation: L(
      '이 묘기는 어려워요.',
      'Bu tryuk qiyin.',
      'This trick is hard.',
      'Этот трюк трудный.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "trick".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'trick'],
  },

  en_s1u7_n5_018_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['practice', 'of', 'lot', 'a', 'need', 'You', 'secret', 'ball'],
    answer: 'You need a lot of practice',
    audioText: 'You need a lot of practice.',
    answerTranslation: L(
      '많은 연습이 필요해요.',
      'Sizga ko‘p mashq kerak.',
      'You need a lot of practice.',
      'Вам нужно много практики.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['practice', 'learning'],
  },

  en_s1u7_n5_019_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Is juggling easy?',
    options: ['No', 'it', 'is', 'quite', 'hard', 'easy', 'ball'],
    answer: 'No it is quite hard',
    answerTranslation: L(
      '아니요, 꽤 어려워요.',
      'Yo‘q, u ancha qiyin.',
      'No, it is quite hard.',
      'Нет, это довольно трудно.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['hard', 'reply'],
  },

  en_s1u7_n5_020_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What is the secret to juggling?' }],
    options: [
      'You need a lot of practice.',
      'The ball is a tourist.',
      'You can practice secret.',
      'Juggling is a taxi.',
    ],
    answer: 'You need a lot of practice.',
    answerTranslation: L(
      '많은 연습이 필요해요.',
      'Ko‘p mashq qilish kerak.',
      'You need a lot of practice.',
      'Нужно много практиковаться.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['practice', 'dialog'],
  },

  // ===========================================================
  // Lesson 2 · Learn a new skill
  // ===========================================================

  en_s1u7_n5_021_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Can you teach me?',
    audioText: 'Can you teach me?',
    answerTranslation: L(
      '저에게 가르쳐 주실 수 있어요?',
      'Menga o‘rgata olasizmi?',
      'Can you teach me?',
      'Вы можете меня научить?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['skills', 'teach'],
  },

  en_s1u7_n5_022_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'ball',
    choices: [
      { text: 'practice', label: '🎯', emoji: '🎯', imageUrl: '' },
      { text: 'trick', label: '🎩', emoji: '🎩', imageUrl: '' },
      { text: 'secret', label: '🤫', emoji: '🤫', imageUrl: '' },
      { text: 'ball', label: '⚽', emoji: '⚽', imageUrl: '' },
    ],
    answerTranslation: L('공', 'to‘p', 'ball', 'мяч'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['ball'],
  },

  en_s1u7_n5_023_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'juggle',
        native: 'jonglyorlik qilmoq',
        nativeI18n: L(
          '저글링하다',
          'jonglyorlik qilmoq',
          'juggle',
          'жонглировать',
        ),
      },
      {
        text: 'throw',
        native: 'otmoq',
        nativeI18n: L('던지다', 'otmoq', 'throw', 'бросать'),
      },
      {
        text: 'catch',
        native: 'tutmoq',
        nativeI18n: L('받다', 'tutmoq', 'catch', 'ловить'),
      },
      {
        text: 'easy',
        native: 'oson',
        nativeI18n: L('쉬운', 'oson', 'easy', 'лёгкий'),
      },
      {
        text: 'hard',
        native: 'qiyin',
        nativeI18n: L('어려운', 'qiyin', 'hard', 'трудный'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['skills', 'matching'],
  },

  en_s1u7_n5_024_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['Can', 'you', 'teach', 'me', 'juggle', 'I', 'practice'],
    answer: 'Can you teach me',
    answerTranslation: L(
      '저에게 가르쳐 주실 수 있어요?',
      'Menga o‘rgata olasizmi?',
      'Can you teach me?',
      'Вы можете меня научить?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['teach', 'request'],
  },

  en_s1u7_n5_025_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['easy', 'Is', 'it', 'juggle', 'hard', 'practice'],
    answer: 'Is it easy',
    audioText: 'Is it easy?',
    answerTranslation: L('쉬워요?', 'Bu osonmi?', 'Is it easy?', 'Это легко?'),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['easy', 'question'],
  },

  en_s1u7_n5_026_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'juggle',
        native: 'jonglyorlik qilmoq',
        nativeI18n: L(
          '저글링하다',
          'jonglyorlik qilmoq',
          'juggle',
          'жонглировать',
        ),
      },
      {
        text: 'throw',
        native: 'otmoq',
        nativeI18n: L('던지다', 'otmoq', 'throw', 'бросать'),
      },
      {
        text: 'catch',
        native: 'tutmoq',
        nativeI18n: L('받다', 'tutmoq', 'catch', 'ловить'),
      },
      {
        text: 'easy',
        native: 'oson',
        nativeI18n: L('쉬운', 'oson', 'easy', 'лёгкий'),
      },
      {
        text: 'hard',
        native: 'qiyin',
        nativeI18n: L('어려운', 'qiyin', 'hard', 'трудный'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['skills', 'listening'],
  },

  en_s1u7_n5_027_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Is juggling ',
    sentenceSuffix: '?',
    answer: 'easy',
    answerTranslation: L(
      '저글링은 쉬워요?',
      'Jonglyorlik osonmi?',
      'Is juggling easy?',
      'Жонглировать легко?',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "easy".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'easy'],
  },

  en_s1u7_n5_028_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'trick',
    choices: [
      { text: 'practice', label: '🎯', emoji: '🎯', imageUrl: '' },
      { text: 'ball', label: '⚽', emoji: '⚽', imageUrl: '' },
      { text: 'trick', label: '🎩', emoji: '🎩', imageUrl: '' },
      { text: 'secret', label: '🤫', emoji: '🤫', imageUrl: '' },
    ],
    answerTranslation: L('묘기', 'tryuk', 'trick', 'трюк'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['trick'],
  },

  en_s1u7_n5_029_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Can you teach me to juggle?',
    audioText: 'Can you teach me to juggle?',
    answerI18n: L(
      '저에게 저글링을 가르쳐 주실 수 있어요',
      'Menga jonglyorlik qilishni o‘rgata olasizmi',
      'Can you teach me to juggle',
      'Вы можете научить меня жонглировать',
    ),
    options: ['Can', 'you', 'teach', 'me', 'to', 'juggle', 'catch', 'hard'],
    optionsI18n: {
      ko: ['저에게', '저글링을', '가르쳐', '주실', '수', '있어요'],
      uz: ['Menga', 'jonglyorlik', 'qilishni', 'o‘rgata', 'olasizmi'],
      en: ['Can', 'you', 'teach', 'me', 'to', 'juggle'],
      ru: ['Вы', 'можете', 'научить', 'меня', 'жонглировать'],
    },
    answerTranslation: L(
      '저에게 저글링을 가르쳐 주실 수 있어요?',
      'Menga jonglyorlik qilishni o‘rgata olasizmi?',
      'Can you teach me to juggle?',
      'Вы можете научить меня жонглировать?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['teach', 'juggle'],
  },

  en_s1u7_n5_030_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Can you teach me to swim?',
    options: ['Yes', 'of', 'course', 'I', 'can', 'teach', 'you', 'juggle'],
    answer: 'Yes of course I can teach you',
    answerTranslation: L(
      '네, 물론 가르쳐 드릴 수 있어요.',
      'Ha, albatta, sizga o‘rgata olaman.',
      'Yes, of course. I can teach you.',
      'Да, конечно. Я могу вас научить.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['skills', 'reply'],
  },

  en_s1u7_n5_031_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'This trick is very ',
    sentenceSuffix: '.',
    answer: 'hard',
    answerTranslation: L(
      '이 묘기는 아주 어려워요.',
      'Bu tryuk juda qiyin.',
      'This trick is very hard.',
      'Этот трюк очень трудный.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "hard".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'hard'],
  },

  en_s1u7_n5_032_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'practice',
        native: 'mashq',
        nativeI18n: L('연습', 'mashq', 'practice', 'практика'),
      },
      {
        text: 'secret',
        native: 'sir',
        nativeI18n: L('비결', 'sir', 'secret', 'секрет'),
      },
      {
        text: 'ball',
        native: 'to‘p',
        nativeI18n: L('공', 'to‘p', 'ball', 'мяч'),
      },
      {
        text: 'trick',
        native: 'tryuk',
        nativeI18n: L('묘기', 'tryuk', 'trick', 'трюк'),
      },
      {
        text: 'catch',
        native: 'tutmoq',
        nativeI18n: L('받다', 'tutmoq', 'catch', 'ловить'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['skills', 'matching'],
  },

  en_s1u7_n5_033_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['I', 'want', 'to', 'learn', 'to', 'juggle', 'teach', 'ball'],
    answer: 'I want to learn to juggle',
    answerTranslation: L(
      '저는 저글링을 배우고 싶어요.',
      'Men jonglyorlik qilishni o‘rganmoqchiman.',
      'I want to learn to juggle.',
      'Я хочу научиться жонглировать.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['learn', 'juggle'],
  },

  en_s1u7_n5_034_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'practice',
        native: 'mashq',
        nativeI18n: L('연습', 'mashq', 'practice', 'практика'),
      },
      {
        text: 'secret',
        native: 'sir',
        nativeI18n: L('비결', 'sir', 'secret', 'секрет'),
      },
      {
        text: 'ball',
        native: 'to‘p',
        nativeI18n: L('공', 'to‘p', 'ball', 'мяч'),
      },
      {
        text: 'trick',
        native: 'tryuk',
        nativeI18n: L('묘기', 'tryuk', 'trick', 'трюк'),
      },
      {
        text: 'catch',
        native: 'tutmoq',
        nativeI18n: L('받다', 'tutmoq', 'catch', 'ловить'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['skills', 'listening'],
  },

  en_s1u7_n5_035_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'secret',
    choices: [
      { text: 'ball', label: '⚽', emoji: '⚽', imageUrl: '' },
      { text: 'trick', label: '🎩', emoji: '🎩', imageUrl: '' },
      { text: 'secret', label: '🤫', emoji: '🤫', imageUrl: '' },
      { text: 'practice', label: '🎯', emoji: '🎯', imageUrl: '' },
    ],
    answerTranslation: L('비결', 'sir', 'secret', 'секрет'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['secret'],
  },

  en_s1u7_n5_036_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Can you ___ me to juggle?',
    blankAnswers: ['teach'],
    options: ['teach', 'catch', 'practice', 'hard'],
    answer: 'teach',
    answerTranslation: L(
      '저에게 저글링을 가르쳐 주실 수 있어요?',
      'Menga jonglyorlik qilishni o‘rgata olasizmi?',
      'Can you teach me to juggle?',
      'Вы можете научить меня жонглировать?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['teach', 'can'],
  },

  en_s1u7_n5_037_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Practice is the ',
    sentenceSuffix: ' to juggling.',
    answer: 'secret',
    answerTranslation: L(
      '연습이 저글링의 비결이에요.',
      'Mashq jonglyorlikning siri.',
      'Practice is the secret to juggling.',
      'Практика — секрет жонглирования.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "secret".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'secret'],
  },

  en_s1u7_n5_038_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['slowly', 'balls', 'the', 'Catch', 'practice', 'throw'],
    answer: 'Catch the balls slowly',
    audioText: 'Catch the balls slowly.',
    answerTranslation: L(
      '공을 천천히 받아요.',
      'To‘plarni sekin tuting.',
      'Catch the balls slowly.',
      'Ловите мячи медленно.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['catch', 'slowly'],
  },

  en_s1u7_n5_039_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What new skill do you want to learn?',
    options: [
      'I',
      'want',
      'to',
      'learn',
      'to',
      'play',
      'the',
      'guitar',
      'juggle',
    ],
    answer: 'I want to learn to play the guitar',
    answerTranslation: L(
      '저는 기타 치는 것을 배우고 싶어요.',
      'Men gitara chalishni o‘rganmoqchiman.',
      'I want to learn to play the guitar.',
      'Я хочу научиться играть на гитаре.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['skills', 'reply'],
  },

  en_s1u7_n5_040_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Can you teach me to juggle?' }],
    options: [
      'Sure. You need a lot of practice.',
      'Yes. I am a ball.',
      'No. Practice can catch.',
      'The trick is a taxi.',
    ],
    answer: 'Sure. You need a lot of practice.',
    answerTranslation: L(
      '물론이죠. 많은 연습이 필요해요.',
      'Albatta. Ko‘p mashq qilishingiz kerak.',
      'Sure. You need a lot of practice.',
      'Конечно. Вам нужно много практиковаться.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['skills', 'dialog'],
  },

  // ===========================================================
  // Lesson 3 · Abilities and hobbies review
  // ===========================================================

  en_s1u7_n5_041_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I can speak English quite well.',
    audioText: 'I can speak English quite well.',
    answerTranslation: L(
      '저는 영어를 꽤 잘할 수 있어요.',
      'Men ingliz tilida ancha yaxshi gapira olaman.',
      'I can speak English quite well.',
      'Я довольно хорошо говорю по-английски.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['review', 'abilities'],
  },

  en_s1u7_n5_042_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'translator',
    choices: [
      { text: 'salesperson', label: '🛍️', emoji: '🛍️', imageUrl: '' },
      { text: 'engineer', label: '🧑‍💻', emoji: '🧑‍💻', imageUrl: '' },
      { text: 'translator', label: '🌍', emoji: '🌍', imageUrl: '' },
      { text: 'musician', label: '🎸', emoji: '🎸', imageUrl: '' },
    ],
    answerTranslation: L('번역가', 'tarjimon', 'translator', 'переводчик'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['translator', 'jobs'],
  },

  en_s1u7_n5_043_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'translator',
        native: 'tarjimon',
        nativeI18n: L('번역가', 'tarjimon', 'translator', 'переводчик'),
      },
      {
        text: 'salesperson',
        native: 'sotuvchi',
        nativeI18n: L('판매원', 'sotuvchi', 'salesperson', 'продавец'),
      },
      {
        text: 'typist',
        native: 'matn teruvchi',
        nativeI18n: L(
          '타이피스트',
          'matn teruvchi',
          'typist',
          'оператор набора',
        ),
      },
      {
        text: 'practice',
        native: 'mashq',
        nativeI18n: L('연습', 'mashq', 'practice', 'практика'),
      },
      {
        text: 'trick',
        native: 'tryuk',
        nativeI18n: L('묘기', 'tryuk', 'trick', 'трюк'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['review', 'matching'],
  },

  en_s1u7_n5_044_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['languages', 'can', 'She', 'speak', 'three', 'well', 'play'],
    answer: 'She can speak three languages',
    answerTranslation: L(
      '그녀는 세 개 언어를 할 수 있어요.',
      'U uchta tilda gapira oladi.',
      'She can speak three languages.',
      'Она говорит на трёх языках.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'can', 'languages'],
  },

  en_s1u7_n5_045_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['very', 'fast', 'type', 'can', 'She', 'badly', 'well'],
    answer: 'She can type very fast',
    audioText: 'She can type very fast.',
    answerTranslation: L(
      '그녀는 아주 빨리 타이핑할 수 있어요.',
      'U juda tez yoza oladi.',
      'She can type very fast.',
      'Она умеет очень быстро печатать.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['review', 'type', 'fast'],
  },

  en_s1u7_n5_046_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'translator',
        native: 'tarjimon',
        nativeI18n: L('번역가', 'tarjimon', 'translator', 'переводчик'),
      },
      {
        text: 'salesperson',
        native: 'sotuvchi',
        nativeI18n: L('판매원', 'sotuvchi', 'salesperson', 'продавец'),
      },
      {
        text: 'typist',
        native: 'matn teruvchi',
        nativeI18n: L(
          '타이피스트',
          'matn teruvchi',
          'typist',
          'оператор набора',
        ),
      },
      {
        text: 'practice',
        native: 'mashq',
        nativeI18n: L('연습', 'mashq', 'practice', 'практика'),
      },
      {
        text: 'trick',
        native: 'tryuk',
        nativeI18n: L('묘기', 'tryuk', 'trick', 'трюк'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['review', 'listening'],
  },

  en_s1u7_n5_047_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Jane is a ',
    sentenceSuffix: '.',
    answer: 'translator',
    answerTranslation: L(
      '제인은 번역가예요.',
      'Jeyn tarjimon.',
      'Jane is a translator.',
      'Джейн — переводчик.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "translator".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'translator'],
  },

  en_s1u7_n5_048_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'salesperson',
    choices: [
      { text: 'translator', label: '🌍', emoji: '🌍', imageUrl: '' },
      { text: 'typist', label: '⌨️', emoji: '⌨️', imageUrl: '' },
      { text: 'salesperson', label: '🛍️', emoji: '🛍️', imageUrl: '' },
      { text: 'musician', label: '🎸', emoji: '🎸', imageUrl: '' },
    ],
    answerTranslation: L('판매원', 'sotuvchi', 'salesperson', 'продавец'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['salesperson'],
  },

  en_s1u7_n5_049_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'I type very slowly.',
    audioText: 'I type very slowly.',
    answerI18n: L(
      '저는 타이핑을 아주 천천히 해요',
      'Men juda sekin yozaman',
      'I type very slowly',
      'Я печатаю очень медленно',
    ),
    options: ['I', 'type', 'very', 'slowly', 'fast', 'well'],
    optionsI18n: {
      ko: ['저는', '타이핑을', '아주', '천천히', '해요'],
      uz: ['Men', 'juda', 'sekin', 'yozaman'],
      en: ['I', 'type', 'very', 'slowly'],
      ru: ['Я', 'печатаю', 'очень', 'медленно'],
    },
    answerTranslation: L(
      '저는 타이핑을 아주 천천히 해요.',
      'Men juda sekin yozaman.',
      'I type very slowly.',
      'Я печатаю очень медленно.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['review', 'slowly'],
  },

  en_s1u7_n5_050_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Can you speak other languages?',
    options: ['Yes', 'I', 'can', 'speak', 'English', 'and', 'Russian', 'swim'],
    answer: 'Yes I can speak English and Russian',
    answerTranslation: L(
      '네, 영어와 러시아어를 할 수 있어요.',
      'Ha, ingliz va rus tillarida gapira olaman.',
      'Yes, I can speak English and Russian.',
      'Да, я говорю по-английски и по-русски.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'languages', 'reply'],
  },

  en_s1u7_n5_051_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'She is a good ',
    sentenceSuffix: '.',
    answer: 'salesperson',
    answerTranslation: L(
      '그녀는 훌륭한 판매원이에요.',
      'U yaxshi sotuvchi.',
      'She is a good salesperson.',
      'Она хороший продавец.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "salesperson".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'salesperson'],
  },

  en_s1u7_n5_052_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'well',
        native: 'yaxshi',
        nativeI18n: L('잘', 'yaxshi', 'well', 'хорошо'),
      },
      {
        text: 'badly',
        native: 'yomon',
        nativeI18n: L('잘 못', 'yomon', 'badly', 'плохо'),
      },
      {
        text: 'slowly',
        native: 'sekin',
        nativeI18n: L('천천히', 'sekin', 'slowly', 'медленно'),
      },
      {
        text: 'fast',
        native: 'tez',
        nativeI18n: L('빨리', 'tez', 'fast', 'быстро'),
      },
      {
        text: 'typist',
        native: 'matn teruvchi',
        nativeI18n: L(
          '타이피스트',
          'matn teruvchi',
          'typist',
          'оператор набора',
        ),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['review', 'matching'],
  },

  en_s1u7_n5_053_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['I', 'like', 'playing', 'sport', 'watching', 'can', 'slowly'],
    answer: 'I like playing sport',
    answerTranslation: L(
      '저는 스포츠 하는 것을 좋아해요.',
      'Men sport bilan shug‘ullanishni yoqtiraman.',
      'I like playing sport.',
      'Я люблю заниматься спортом.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['review', 'like-ing'],
  },

  en_s1u7_n5_054_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'well',
        native: 'yaxshi',
        nativeI18n: L('잘', 'yaxshi', 'well', 'хорошо'),
      },
      {
        text: 'badly',
        native: 'yomon',
        nativeI18n: L('잘 못', 'yomon', 'badly', 'плохо'),
      },
      {
        text: 'slowly',
        native: 'sekin',
        nativeI18n: L('천천히', 'sekin', 'slowly', 'медленно'),
      },
      {
        text: 'fast',
        native: 'tez',
        nativeI18n: L('빨리', 'tez', 'fast', 'быстро'),
      },
      {
        text: 'typist',
        native: 'matn teruvchi',
        nativeI18n: L(
          '타이피스트',
          'matn teruvchi',
          'typist',
          'оператор набора',
        ),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['review', 'listening'],
  },

  en_s1u7_n5_055_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'typist',
    choices: [
      { text: 'translator', label: '🌍', emoji: '🌍', imageUrl: '' },
      { text: 'salesperson', label: '🛍️', emoji: '🛍️', imageUrl: '' },
      { text: 'typist', label: '⌨️', emoji: '⌨️', imageUrl: '' },
      { text: 'engineer', label: '🧑‍💻', emoji: '🧑‍💻', imageUrl: '' },
    ],
    answerTranslation: L(
      '타이피스트',
      'matn teruvchi',
      'typist',
      'оператор набора',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typist'],
  },

  en_s1u7_n5_056_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She can type very ___.',
    blankAnswers: ['fast'],
    options: ['fast', 'good', 'easy', 'hard'],
    answer: 'fast',
    answerTranslation: L(
      '그녀는 아주 빨리 타이핑할 수 있어요.',
      'U juda tez yoza oladi.',
      'She can type very fast.',
      'Она умеет очень быстро печатать.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'fast'],
  },

  en_s1u7_n5_057_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I am a slow ',
    sentenceSuffix: '.',
    answer: 'typist',
    answerTranslation: L(
      '저는 타이핑이 느린 사람이에요.',
      'Men sekin matn teraman.',
      'I am a slow typist.',
      'Я медленно печатаю.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "typist".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'typist'],
  },

  en_s1u7_n5_058_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['football', 'watching', 'like', 'I', 'music', 'playing', 'hate'],
    answer: 'I like watching football',
    audioText: 'I like watching football.',
    answerTranslation: L(
      '저는 축구 보는 것을 좋아해요.',
      'Men futbol ko‘rishni yoqtiraman.',
      'I like watching football.',
      'Я люблю смотреть футбол.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['review', 'like-ing'],
  },

  en_s1u7_n5_059_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Do you like dancing?',
    options: ['Yes', 'I', 'do', 'but', 'I', 'dance', 'badly', 'well', 'swim'],
    answer: 'Yes I do but I dance badly',
    answerTranslation: L(
      '네, 좋아하지만 춤은 잘 못 춰요.',
      'Ha, yoqtiraman, lekin yomon raqsga tushaman.',
      'Yes, I do, but I dance badly.',
      'Да, но я плохо танцую.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'dance', 'reply'],
  },

  en_s1u7_n5_060_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Are you a good typist?' }],
    options: [
      'No. I type very slowly.',
      'No. I am slowly type.',
      'Yes. I typing fastly.',
      'I can typist.',
    ],
    answer: 'No. I type very slowly.',
    answerTranslation: L(
      '아니요. 저는 타이핑을 아주 천천히 해요.',
      'Yo‘q. Men juda sekin yozaman.',
      'No. I type very slowly.',
      'Нет. Я печатаю очень медленно.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'type', 'dialog'],
  },

  // ===========================================================
  // Lesson 4 · Unit 7 final review
  // ===========================================================

  en_s1u7_n5_061_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Can you help me?',
    audioText: 'Can you help me?',
    answerTranslation: L(
      '저를 도와주실 수 있어요?',
      'Menga yordam bera olasizmi?',
      'Can you help me?',
      'Вы можете мне помочь?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'requests'],
  },

  en_s1u7_n5_062_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'translator',
    choices: [
      { text: 'typist', label: '⌨️', emoji: '⌨️', imageUrl: '' },
      { text: 'translator', label: '🌍', emoji: '🌍', imageUrl: '' },
      { text: 'salesperson', label: '🛍️', emoji: '🛍️', imageUrl: '' },
      { text: 'musician', label: '🎸', emoji: '🎸', imageUrl: '' },
    ],
    answerTranslation: L('번역가', 'tarjimon', 'translator', 'переводчик'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['review', 'translator'],
  },

  en_s1u7_n5_063_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'throw',
        native: 'otmoq',
        nativeI18n: L('던지다', 'otmoq', 'throw', 'бросать'),
      },
      {
        text: 'juggle',
        native: 'jonglyorlik qilmoq',
        nativeI18n: L(
          '저글링하다',
          'jonglyorlik qilmoq',
          'juggle',
          'жонглировать',
        ),
      },
      {
        text: 'translator',
        native: 'tarjimon',
        nativeI18n: L('번역가', 'tarjimon', 'translator', 'переводчик'),
      },
      {
        text: 'salesperson',
        native: 'sotuvchi',
        nativeI18n: L('판매원', 'sotuvchi', 'salesperson', 'продавец'),
      },
      {
        text: 'typist',
        native: 'matn teruvchi',
        nativeI18n: L(
          '타이피스트',
          'matn teruvchi',
          'typist',
          'оператор набора',
        ),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['review', 'matching'],
  },

  en_s1u7_n5_064_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'Can',
      'you',
      'speak',
      'more',
      'slowly',
      'well',
      'I',
      'understand',
    ],
    answer: 'Can you speak more slowly',
    answerTranslation: L(
      '좀 더 천천히 말해 주실 수 있어요?',
      'Biroz sekinroq gapira olasizmi?',
      'Can you speak more slowly?',
      'Вы можете говорить немного медленнее?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'requests'],
  },

  en_s1u7_n5_065_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['music', 'listening', 'love', 'I', 'to', 'playing', 'hate'],
    answer: 'I love listening to music',
    audioText: 'I love listening to music.',
    answerTranslation: L(
      '저는 음악 듣는 것을 아주 좋아해요.',
      'Men musiqa tinglashni juda yaxshi ko‘raman.',
      'I love listening to music.',
      'Я очень люблю слушать музыку.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['review', 'love', 'music'],
  },

  en_s1u7_n5_066_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'throw',
        native: 'otmoq',
        nativeI18n: L('던지다', 'otmoq', 'throw', 'бросать'),
      },
      {
        text: 'juggle',
        native: 'jonglyorlik qilmoq',
        nativeI18n: L(
          '저글링하다',
          'jonglyorlik qilmoq',
          'juggle',
          'жонглировать',
        ),
      },
      {
        text: 'translator',
        native: 'tarjimon',
        nativeI18n: L('번역가', 'tarjimon', 'translator', 'переводчик'),
      },
      {
        text: 'salesperson',
        native: 'sotuvchi',
        nativeI18n: L('판매원', 'sotuvchi', 'salesperson', 'продавец'),
      },
      {
        text: 'typist',
        native: 'matn teruvchi',
        nativeI18n: L(
          '타이피스트',
          'matn teruvchi',
          'typist',
          'оператор набора',
        ),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['review', 'listening'],
  },

  en_s1u7_n5_067_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Can you ',
    sentenceSuffix: ' me?',
    answer: 'help',
    answerTranslation: L(
      '저를 도와주실 수 있어요?',
      'Menga yordam bera olasizmi?',
      'Can you help me?',
      'Вы можете мне помочь?',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "help".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'review', 'requests'],
  },

  en_s1u7_n5_068_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'ball',
    choices: [
      { text: 'practice', label: '🎯', emoji: '🎯', imageUrl: '' },
      { text: 'trick', label: '🎩', emoji: '🎩', imageUrl: '' },
      { text: 'ball', label: '⚽', emoji: '⚽', imageUrl: '' },
      { text: 'secret', label: '🤫', emoji: '🤫', imageUrl: '' },
    ],
    answerTranslation: L('공', 'to‘p', 'ball', 'мяч'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['review', 'ball'],
  },

  en_s1u7_n5_069_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'I like cooking but I can’t cook well.',
    audioText: 'I like cooking, but I can’t cook well.',
    answerI18n: L(
      '저는 요리하는 것을 좋아하지만 요리를 잘하지는 못해요',
      'Men ovqat pishirishni yoqtiraman, lekin yaxshi pishira olmayman',
      'I like cooking but I can’t cook well',
      'Я люблю готовить, но готовлю не очень хорошо',
    ),
    options: [
      'I',
      'like',
      'cooking',
      'but',
      'I',
      'can’t',
      'cook',
      'well',
      'badly',
    ],
    optionsI18n: {
      ko: [
        '저는',
        '요리하는',
        '것을',
        '좋아하지만',
        '요리를',
        '잘하지는',
        '못해요',
      ],
      uz: [
        'Men',
        'ovqat',
        'pishirishni',
        'yoqtiraman',
        'lekin',
        'yaxshi',
        'pishira',
        'olmayman',
      ],
      en: ['I', 'like', 'cooking', 'but', 'I', 'can’t', 'cook', 'well'],
      ru: ['Я', 'люблю', 'готовить', 'но', 'готовлю', 'не', 'очень', 'хорошо'],
    },
    answerTranslation: L(
      '저는 요리하는 것을 좋아하지만 요리를 잘하지는 못해요.',
      'Men ovqat pishirishni yoqtiraman, lekin yaxshi pishira olmayman.',
      'I like cooking, but I can’t cook well.',
      'Я люблю готовить, но готовлю не очень хорошо.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['review', 'like-ing', 'well'],
  },

  en_s1u7_n5_070_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'I’m thirsty. Can I have some water?',
    options: ['Sure', 'Here', 'you', 'are', 'Sorry', 'taken', 'juggle'],
    answer: 'Sure Here you are',
    answerTranslation: L(
      '물론이죠. 여기 있어요.',
      'Albatta. Mana.',
      'Sure. Here you are.',
      'Конечно. Вот, пожалуйста.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'requests', 'reply'],
  },

  en_s1u7_n5_071_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Practice is the ',
    sentenceSuffix: ' to juggling.',
    answer: 'secret',
    answerTranslation: L(
      '연습이 저글링의 비결이에요.',
      'Mashq jonglyorlikning siri.',
      'Practice is the secret to juggling.',
      'Практика — секрет жонглирования.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "secret".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'review', 'secret'],
  },

  en_s1u7_n5_072_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'practice',
        native: 'mashq',
        nativeI18n: L('연습', 'mashq', 'practice', 'практика'),
      },
      {
        text: 'secret',
        native: 'sir',
        nativeI18n: L('비결', 'sir', 'secret', 'секрет'),
      },
      {
        text: 'easy',
        native: 'oson',
        nativeI18n: L('쉬운', 'oson', 'easy', 'лёгкий'),
      },
      {
        text: 'hard',
        native: 'qiyin',
        nativeI18n: L('어려운', 'qiyin', 'hard', 'трудный'),
      },
      {
        text: 'ball',
        native: 'to‘p',
        nativeI18n: L('공', 'to‘p', 'ball', 'мяч'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['review', 'matching'],
  },

  en_s1u7_n5_073_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['Can', 'you', 'call', 'me', 'a', 'taxi', 'teach', 'ball'],
    answer: 'Can you call me a taxi',
    answerTranslation: L(
      '택시를 불러 주실 수 있어요?',
      'Menga taksi chaqirib bera olasizmi?',
      'Can you call me a taxi?',
      'Вы можете вызвать мне такси?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'requests'],
  },

  en_s1u7_n5_074_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'practice',
        native: 'mashq',
        nativeI18n: L('연습', 'mashq', 'practice', 'практика'),
      },
      {
        text: 'secret',
        native: 'sir',
        nativeI18n: L('비결', 'sir', 'secret', 'секрет'),
      },
      {
        text: 'easy',
        native: 'oson',
        nativeI18n: L('쉬운', 'oson', 'easy', 'лёгкий'),
      },
      {
        text: 'hard',
        native: 'qiyin',
        nativeI18n: L('어려운', 'qiyin', 'hard', 'трудный'),
      },
      {
        text: 'ball',
        native: 'to‘p',
        nativeI18n: L('공', 'to‘p', 'ball', 'мяч'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['review', 'listening'],
  },

  en_s1u7_n5_075_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'salesperson',
    choices: [
      { text: 'translator', label: '🌍', emoji: '🌍', imageUrl: '' },
      { text: 'typist', label: '⌨️', emoji: '⌨️', imageUrl: '' },
      { text: 'salesperson', label: '🛍️', emoji: '🛍️', imageUrl: '' },
      { text: 'musician', label: '🎸', emoji: '🎸', imageUrl: '' },
    ],
    answerTranslation: L('판매원', 'sotuvchi', 'salesperson', 'продавец'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['review', 'salesperson'],
  },

  en_s1u7_n5_076_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I ___ listening to music.',
    blankAnswers: ['love'],
    options: ['love', 'can', 'slowly', 'hard'],
    answer: 'love',
    answerTranslation: L(
      '저는 음악 듣는 것을 아주 좋아해요.',
      'Men musiqa tinglashni juda yaxshi ko‘raman.',
      'I love listening to music.',
      'Я очень люблю слушать музыку.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'love'],
  },

  en_s1u7_n5_077_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'This skill needs a lot of ',
    sentenceSuffix: '.',
    answer: 'practice',
    answerTranslation: L(
      '이 기술은 많은 연습이 필요해요.',
      'Bu ko‘nikma uchun ko‘p mashq kerak.',
      'This skill needs a lot of practice.',
      'Этот навык требует много практики.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "practice".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'review', 'practice'],
  },

  en_s1u7_n5_078_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'way',
      'the',
      'station',
      'to',
      'me',
      'tell',
      'Can',
      'you',
      'taxi',
    ],
    answer: 'Can you tell me the way to the station',
    audioText: 'Can you tell me the way to the station?',
    answerTranslation: L(
      '역으로 가는 길을 알려 주실 수 있어요?',
      'Vokzalga boradigan yo‘lni ayta olasizmi?',
      'Can you tell me the way to the station?',
      'Вы можете показать мне дорогу к станции?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['review', 'directions'],
  },

  en_s1u7_n5_079_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What do you like doing?',
    options: [
      'I',
      'like',
      'swimming',
      'and',
      'taking',
      'photos',
      'juggle',
      'badly',
    ],
    answer: 'I like swimming and taking photos',
    answerTranslation: L(
      '저는 수영하고 사진 찍는 것을 좋아해요.',
      'Men suzishni va suratga olishni yoqtiraman.',
      'I like swimming and taking photos.',
      'Я люблю плавать и фотографировать.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'hobbies', 'reply'],
  },

  en_s1u7_n5_080_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Can you teach me to juggle?' }],
    options: [
      'Sure. The secret is practice.',
      'Yes. I am a salesperson.',
      'No. I like taxi.',
      'Juggling is translator.',
    ],
    answer: 'Sure. The secret is practice.',
    answerTranslation: L(
      '물론이죠. 비결은 연습이에요.',
      'Albatta. Siri — mashq.',
      'Sure. The secret is practice.',
      'Конечно. Секрет — практика.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['unit7-review', 'juggling', 'final'],
  },
};

export const EN_S1_UNIT7_NODE5 = {
  title: L(
    '특별한 취미',
    'G‘ayrioddiy hobbi',
    'An unusual hobby',
    'Необычное хобби',
  ),
  section: 1,
  unit: 7,
  order: 5,
  isActive: true,

  lessons: [
    {
      title: L(
        '저글링 배우기',
        'Jonglyorlikni o‘rganish',
        'Learn to juggle',
        'Учимся жонглировать',
      ),
      description: L(
        '공을 던지고 받고 저글링하면서 throw, catch, juggle, trick, practice 같은 핵심 단어를 익혀요.',
        'To‘pni otish, tutish va jonglyorlik qilish orqali throw, catch, juggle, trick va practice kabi so‘zlarni o‘rganasiz.',
        'Learn core vocabulary such as throw, catch, juggle, trick and practice through juggling.',
        'Изучаем throw, catch, juggle, trick и practice на теме жонглирования.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 1,
      questions: [
        'en_s1u7_n5_001_speaking',
        'en_s1u7_n5_002_image_choice',
        'en_s1u7_n5_003_word_matching',
        'en_s1u7_n5_004_translate_builder',
        'en_s1u7_n5_005_word_arrange',
        'en_s1u7_n5_006_audio_match',
        'en_s1u7_n5_007_type_answer',
        'en_s1u7_n5_008_image_choice',
        'en_s1u7_n5_009_sentence_builder',
        'en_s1u7_n5_010_reply_builder',
        'en_s1u7_n5_011_type_answer',
        'en_s1u7_n5_012_word_matching',
        'en_s1u7_n5_013_translate_builder',
        'en_s1u7_n5_014_audio_match',
        'en_s1u7_n5_015_image_choice',
        'en_s1u7_n5_016_fill_in_blank',
        'en_s1u7_n5_017_type_answer',
        'en_s1u7_n5_018_word_arrange',
        'en_s1u7_n5_019_reply_builder',
        'en_s1u7_n5_020_dialog_complete',
      ],
    },

    {
      title: L(
        '새로운 기술 배우기',
        'Yangi ko‘nikma o‘rganish',
        'Learn a new skill',
        'Учимся новому навыку',
      ),
      description: L(
        '새로운 기술이 쉬운지 어려운지 묻고 Can you teach me?를 활용해 다른 사람에게 배우는 대화를 연습해요.',
        'Yangi ko‘nikma oson yoki qiyinligini so‘rab, Can you teach me? orqali boshqalardan o‘rganishni mashq qilasiz.',
        'Ask whether a skill is easy or hard and use Can you teach me? when learning from another person.',
        'Спрашиваем, лёгкий ли навык, и используем Can you teach me?, чтобы попросить научить нас.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 2,
      questions: [
        'en_s1u7_n5_021_speaking',
        'en_s1u7_n5_022_image_choice',
        'en_s1u7_n5_023_word_matching',
        'en_s1u7_n5_024_translate_builder',
        'en_s1u7_n5_025_word_arrange',
        'en_s1u7_n5_026_audio_match',
        'en_s1u7_n5_027_type_answer',
        'en_s1u7_n5_028_image_choice',
        'en_s1u7_n5_029_sentence_builder',
        'en_s1u7_n5_030_reply_builder',
        'en_s1u7_n5_031_type_answer',
        'en_s1u7_n5_032_word_matching',
        'en_s1u7_n5_033_translate_builder',
        'en_s1u7_n5_034_audio_match',
        'en_s1u7_n5_035_image_choice',
        'en_s1u7_n5_036_fill_in_blank',
        'en_s1u7_n5_037_type_answer',
        'en_s1u7_n5_038_word_arrange',
        'en_s1u7_n5_039_reply_builder',
        'en_s1u7_n5_040_dialog_complete',
      ],
    },

    {
      title: L(
        '능력과 취미 복습',
        'Qobiliyat va hobbi takrorlash',
        'Abilities and hobbies review',
        'Повторение способностей и хобби',
      ),
      description: L(
        'can/can’t, 능력 질문, 방법 부사, 직업 능력과 like + -ing를 함께 복습해요.',
        'Can/can’t, qobiliyat savollari, ravishlar, ish ko‘nikmalari va like + -ing ni birga takrorlaysiz.',
        'Review can/can’t, ability questions, adverbs, job skills and like + -ing.',
        'Повторяем can/can’t, вопросы о способностях, наречия, рабочие навыки и like + -ing.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 3,
      questions: [
        'en_s1u7_n5_041_speaking',
        'en_s1u7_n5_042_image_choice',
        'en_s1u7_n5_043_word_matching',
        'en_s1u7_n5_044_translate_builder',
        'en_s1u7_n5_045_word_arrange',
        'en_s1u7_n5_046_audio_match',
        'en_s1u7_n5_047_type_answer',
        'en_s1u7_n5_048_image_choice',
        'en_s1u7_n5_049_sentence_builder',
        'en_s1u7_n5_050_reply_builder',
        'en_s1u7_n5_051_type_answer',
        'en_s1u7_n5_052_word_matching',
        'en_s1u7_n5_053_translate_builder',
        'en_s1u7_n5_054_audio_match',
        'en_s1u7_n5_055_image_choice',
        'en_s1u7_n5_056_fill_in_blank',
        'en_s1u7_n5_057_type_answer',
        'en_s1u7_n5_058_word_arrange',
        'en_s1u7_n5_059_reply_builder',
        'en_s1u7_n5_060_dialog_complete',
      ],
    },

    {
      title: L(
        '유닛 7 종합 복습',
        '7-unit umumiy takrorlash',
        'Unit 7 final review',
        'Итоговое повторение раздела 7',
      ),
      description: L(
        '능력, 취미, 방법 부사, 부탁하기와 새로운 기술 배우기까지 Unit 7의 핵심 표현을 종합 복습해요.',
        'Qobiliyat, hobbi, ravishlar, iltimoslar va yangi ko‘nikmalarni o‘rganish bo‘yicha Unit 7 mavzularini umumiy takrorlaysiz.',
        'Review the key language from Unit 7: abilities, hobbies, adverbs, requests and learning new skills.',
        'Повторяем ключевые темы раздела 7: способности, хобби, наречия, просьбы и изучение новых навыков.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 4,
      questions: [
        'en_s1u7_n5_061_speaking',
        'en_s1u7_n5_062_image_choice',
        'en_s1u7_n5_063_word_matching',
        'en_s1u7_n5_064_translate_builder',
        'en_s1u7_n5_065_word_arrange',
        'en_s1u7_n5_066_audio_match',
        'en_s1u7_n5_067_type_answer',
        'en_s1u7_n5_068_image_choice',
        'en_s1u7_n5_069_sentence_builder',
        'en_s1u7_n5_070_reply_builder',
        'en_s1u7_n5_071_type_answer',
        'en_s1u7_n5_072_word_matching',
        'en_s1u7_n5_073_translate_builder',
        'en_s1u7_n5_074_audio_match',
        'en_s1u7_n5_075_image_choice',
        'en_s1u7_n5_076_fill_in_blank',
        'en_s1u7_n5_077_type_answer',
        'en_s1u7_n5_078_word_arrange',
        'en_s1u7_n5_079_reply_builder',
        'en_s1u7_n5_080_dialog_complete',
      ],
    },
  ],
};
