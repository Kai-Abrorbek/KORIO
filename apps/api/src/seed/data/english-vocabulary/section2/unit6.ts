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
// Section 2 · Unit 6 · Node 1
// 6.1 Don't give up!
//
// Coverage
// Coursebook:
// - Successful people who failed at first
// - Vera Wang
// - Akio Morita
// - was / were / wasn't / weren't
// - Cool Runnings
// - pronunciation of was / were
// - History Firsts quiz
// - past time expressions
//
// Workbook:
// - IKEA is born
// - Ingvar Kamprad
// - was / were questions and short answers
// - pronunciation of past be
// - in / last / ago
// - Family History
//
// IMPORTANT:
// *_WORDS에는 단일 headword만 등록.
// "a long time ago", "last night", "fashion designer",
// "ice skater" 등은 phrase로만 사용하고 WORD 등록하지 않음.
//
// 4 lessons × 20 questions = 80
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT6_NODE1_WORDS = [
  {
    code: 'en-adjective-successful',
    english: 'successful',
    senseKey: 'achieving-wanted-results',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '성공한',
      'muvaffaqiyatli',
      'achieving the result that you wanted',
      'успешный',
    ),
    examples: [
      {
        english: 'Vera Wang is a successful designer.',
        translations: L(
          'Vera Wang은 성공한 디자이너예요.',
          'Vera Wang muvaffaqiyatli dizayner.',
          'Vera Wang is a successful designer.',
          'Вера Вонг — успешный дизайнер.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/səkˈsesfəl/',
      ttsText: 'successful',
    },
    tags: ['past', 'success', 'unit6'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-verb-fail',
    english: 'fail',
    senseKey: 'not-succeed-at-something',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '실패하다',
      'muvaffaqiyatsiz bo‘lmoq',
      'to not succeed in something',
      'потерпеть неудачу',
    ),
    examples: [
      {
        english: 'Successful people can fail at first.',
        translations: L(
          '성공한 사람들도 처음에는 실패할 수 있어요.',
          'Muvaffaqiyatli odamlar ham avval muvaffaqiyatsizlikka uchrashi mumkin.',
          'Successful people can fail at first.',
          'Успешные люди тоже могут сначала потерпеть неудачу.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/feɪl/',
      ttsText: 'fail',
    },
    tags: ['past', 'success', 'unit6'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-founder',
    english: 'founder',
    senseKey: 'person-who-starts-company-or-organization',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '창립자',
      'asoschi',
      'a person who starts a company or organization',
      'основатель',
    ),
    examples: [
      {
        english: 'Akio Morita was a founder of Sony.',
        translations: L(
          'Akio Morita는 Sony의 창립자였어요.',
          'Akio Morita Sony asoschilaridan biri edi.',
          'Akio Morita was a founder of Sony.',
          'Акио Морита был одним из основателей Sony.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈfaʊndə/',
      ttsText: 'founder',
    },
    tags: ['business', 'past', 'unit6'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-furniture',
    english: 'furniture',
    senseKey: 'objects-such-as-tables-chairs-and-beds',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '가구',
      'mebel',
      'objects such as tables, chairs and beds',
      'мебель',
    ),
    examples: [
      {
        english: 'IKEA is a furniture company.',
        translations: L(
          'IKEA는 가구 회사예요.',
          'IKEA mebel kompaniyasi.',
          'IKEA is a furniture company.',
          'IKEA — мебельная компания.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈfɜːnɪtʃə/',
      ttsText: 'furniture',
    },
    tags: ['ikea', 'unit6'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-rich',
    english: 'rich',
    senseKey: 'having-a-lot-of-money',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('부유한', 'boy', 'having a lot of money', 'богатый'),
    examples: [
      {
        english: 'Ingvar Kamprad’s parents weren’t rich.',
        translations: L(
          'Ingvar Kamprad의 부모님은 부유하지 않았어요.',
          'Ingvar Kampradning ota-onasi boy emas edi.',
          'Ingvar Kamprad’s parents weren’t rich.',
          'Родители Ингвара Кампрада не были богатыми.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/rɪtʃ/',
      ttsText: 'rich',
    },
    tags: ['ikea', 'unit6'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-farmer',
    english: 'farmer',
    senseKey: 'person-who-works-on-farm',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '농부',
      'fermer',
      'a person who owns or works on a farm',
      'фермер',
    ),
    examples: [
      {
        english: 'His parents were farmers.',
        translations: L(
          '그의 부모님은 농부였어요.',
          'Uning ota-onasi fermer edi.',
          'His parents were farmers.',
          'Его родители были фермерами.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈfɑːmə/',
      ttsText: 'farmer',
    },
    tags: ['ikea', 'jobs', 'unit6'],
    difficulty: 1,
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
        english: 'Why was Vincent van Gogh famous?',
        translations: L(
          'Vincent van Gogh는 왜 유명했나요?',
          'Vincent van Gogh nima uchun mashhur edi?',
          'Why was Vincent van Gogh famous?',
          'Почему Винсент ван Гог был знаменит?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈfeɪməs/',
      ttsText: 'famous',
    },
    tags: ['past', 'unit6'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-century',
    english: 'century',
    senseKey: 'period-of-one-hundred-years',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('세기; 100년', 'asr', 'a period of one hundred years', 'век'),
    examples: [
      {
        english: 'Albert Einstein was born in the 19th century.',
        translations: L(
          'Albert Einstein은 19세기에 태어났어요.',
          'Albert Einstein 19-asrda tug‘ilgan.',
          'Albert Einstein was born in the 19th century.',
          'Альберт Эйнштейн родился в XIX веке.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈsentʃəri/',
      ttsText: 'century',
    },
    tags: ['time', 'past', 'unit6'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-adverb-ago',
    english: 'ago',
    senseKey: 'before-now-by-given-amount-of-time',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L(
      '~전에',
      'oldin',
      'used to say how far in the past something happened',
      'назад',
    ),
    examples: [
      {
        english: 'There was a meeting a few days ago.',
        translations: L(
          '며칠 전에 회의가 있었어요.',
          'Bir necha kun oldin yig‘ilish bo‘lgan.',
          'There was a meeting a few days ago.',
          'Несколько дней назад было собрание.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/əˈɡəʊ/',
      ttsText: 'ago',
    },
    tags: ['time', 'past', 'unit6'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-physics',
    english: 'physics',
    senseKey: 'science-of-matter-energy-and-forces',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '물리학',
      'fizika',
      'the science of matter, energy and forces',
      'физика',
    ),
    examples: [
      {
        english: 'Akio Morita studied physics.',
        translations: L(
          'Akio Morita는 물리학을 공부했어요.',
          'Akio Morita fizika o‘rgangan.',
          'Akio Morita studied physics.',
          'Акио Морита изучал физику.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈfɪzɪks/',
      ttsText: 'physics',
    },
    tags: ['education', 'unit6'],
    difficulty: 2,
    isCore: true,
  },
];

export const EN_S2_UNIT6_NODE1_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Successful people who failed at first
  // ===========================================================

  en_s2u6_n1_001_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'successful',
        native: 'muvaffaqiyatli',
        nativeI18n: L('성공한', 'muvaffaqiyatli', 'successful', 'успешный'),
      },
      {
        text: 'fail',
        native: 'muvaffaqiyatsiz bo‘lmoq',
        nativeI18n: L(
          '실패하다',
          'muvaffaqiyatsiz bo‘lmoq',
          'fail',
          'потерпеть неудачу',
        ),
      },
      {
        text: 'founder',
        native: 'asoschi',
        nativeI18n: L('창립자', 'asoschi', 'founder', 'основатель'),
      },
      {
        text: 'famous',
        native: 'mashhur',
        nativeI18n: L('유명한', 'mashhur', 'famous', 'известный'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit6', 'successful-people'],
  },

  en_s2u6_n1_002_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Vera Wang ___ born in New York in 1949.',
    blankAnswers: ['was'],
    options: ['was', 'were', "wasn't", "weren't"],
    answer: 'was',
    answerTranslation: L(
      'Vera Wang은 1949년에 New York에서 태어났어요.',
      'Vera Wang 1949-yilda New Yorkda tug‘ilgan.',
      'Vera Wang was born in New York in 1949.',
      'Вера Вонг родилась в Нью-Йорке в 1949 году.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['vera-wang', 'was-were'],
  },

  en_s2u6_n1_003_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Vera Wang’s parents ___ from China.',
    blankAnswers: ['were'],
    options: ['were', 'was', "wasn't", 'is'],
    answer: 'were',
    answerTranslation: L(
      'Vera Wang의 부모님은 중국 출신이었어요.',
      'Vera Wangning ota-onasi Xitoydan edi.',
      'Vera Wang’s parents were from China.',
      'Родители Веры Вонг были из Китая.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['vera-wang', 'was-were'],
  },

  en_s2u6_n1_004_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'When Vera was younger, she ___ a very good ice skater.',
    blankAnswers: ['was'],
    options: ['was', 'were', "weren't", 'are'],
    answer: 'was',
    answerTranslation: L(
      'Vera는 어렸을 때 아주 훌륭한 아이스 스케이터였어요.',
      'Vera yoshligida juda yaxshi konkida uchuvchi edi.',
      'When Vera was younger, she was a very good ice skater.',
      'Когда Вера была моложе, она очень хорошо каталась на коньках.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['vera-wang', 'was-were'],
  },

  en_s2u6_n1_005_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Vera ___ in the US Olympic team in 1968.',
    blankAnswers: ["wasn't"],
    options: ["wasn't", 'was', "weren't", 'were'],
    answer: "wasn't",
    answerTranslation: L(
      'Vera는 1968년 미국 올림픽 대표팀에 들어가지 못했어요.',
      'Vera 1968-yilda AQSh Olimpiya jamoasida emas edi.',
      'Vera wasn’t in the US Olympic team in 1968.',
      'Вера не попала в олимпийскую сборную США в 1968 году.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['vera-wang', 'was-were'],
  },

  en_s2u6_n1_006_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Where was Vera Wang born?',
      },
    ],
    options: ['In New York.', 'In China.', 'In Tokyo.', 'In London.'],
    answer: 'In New York.',
    answerTranslation: L(
      'New York에서요.',
      'New Yorkda.',
      'In New York.',
      'В Нью-Йорке.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['vera-wang', 'reading'],
  },

  en_s2u6_n1_007_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'What did Vera Wang want to do when she was younger?',
      },
    ],
    options: [
      'She wanted to skate in the Olympics.',
      'She wanted to start Sony.',
      'She wanted to become a farmer.',
      'She wanted to sell rice cookers.',
    ],
    answer: 'She wanted to skate in the Olympics.',
    answerTranslation: L(
      '올림픽에서 스케이트를 타고 싶어 했어요.',
      'U Olimpiadada konkida uchishni xohlagan.',
      'She wanted to skate in the Olympics.',
      'Она хотела выступать на Олимпийских играх.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['vera-wang', 'reading'],
  },

  en_s2u6_n1_008_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'After the Olympic team problem, Vera decided to become a fashion ___.',
    blankAnswers: ['designer'],
    options: ['designer', 'farmer', 'pilot', 'mechanic'],
    answer: 'designer',
    answerTranslation: L(
      '올림픽 대표팀에 들어가지 못한 뒤 Vera는 패션 디자이너가 되기로 했어요.',
      'Olimpiya jamoasiga kira olmagach, Vera moda dizayneri bo‘lishga qaror qildi.',
      'After the Olympic team problem, Vera decided to become a fashion designer.',
      'После неудачи со сборной Вера решила стать модельером.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['vera-wang', 'reading'],
  },

  en_s2u6_n1_009_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Akio Morita ___ born in 1921.',
    blankAnswers: ['was'],
    options: ['was', 'were', "weren't", 'are'],
    answer: 'was',
    answerTranslation: L(
      'Akio Morita는 1921년에 태어났어요.',
      'Akio Morita 1921-yilda tug‘ilgan.',
      'Akio Morita was born in 1921.',
      'Акио Морита родился в 1921 году.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['akio-morita', 'was-were'],
  },

  en_s2u6_n1_010_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Akio Morita ___ a businessman from the age of 25.',
    blankAnswers: ['was'],
    options: ['was', 'were', "wasn't", 'are'],
    answer: 'was',
    answerTranslation: L(
      'Akio Morita는 25세부터 사업가였어요.',
      'Akio Morita 25 yoshidan biznesmen edi.',
      'Akio Morita was a businessman from the age of 25.',
      'Акио Морита был бизнесменом с 25 лет.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['akio-morita', 'was-were'],
  },

  en_s2u6_n1_011_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Morita and Masaru Ibuku ___ very successful at first.',
    blankAnswers: ["weren't"],
    options: ["weren't", 'were', "wasn't", 'was'],
    answer: "weren't",
    answerTranslation: L(
      'Morita와 Masaru Ibuku는 처음에는 별로 성공적이지 않았어요.',
      'Morita va Masaru Ibuku avval juda muvaffaqiyatli emas edi.',
      'Morita and Masaru Ibuku weren’t very successful at first.',
      'Морита и Масару Ибука сначала не были очень успешными.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['akio-morita', 'was-were'],
  },

  en_s2u6_n1_012_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'What company was Akio Morita a founder of?',
      },
    ],
    options: ['Sony.', 'IKEA.', 'Vogue.', 'Ralph Lauren.'],
    answer: 'Sony.',
    answerTranslation: L('Sony예요.', 'Sony.', 'Sony.', 'Sony.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['akio-morita', 'reading'],
  },

  en_s2u6_n1_013_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'What was Sony’s first product in the article?',
      },
    ],
    options: [
      'An electric rice cooker.',
      'A television.',
      'A Walkman.',
      'A mobile phone.',
    ],
    answer: 'An electric rice cooker.',
    answerTranslation: L(
      '전기밥솥이었어요.',
      'Elektr guruch pishirgich edi.',
      'An electric rice cooker.',
      'Электрическая рисоварка.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['akio-morita', 'reading'],
  },

  en_s2u6_n1_014_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'They only sold 100 rice cookers because the cooker always ___ the rice.',
    blankAnswers: ['burnt'],
    options: ['burnt', 'washed', 'cooled', 'cleaned'],
    answer: 'burnt',
    answerTranslation: L(
      '밥솥이 항상 밥을 태워서 100대밖에 팔지 못했어요.',
      'Guruch pishirgich guruchni doim kuydirgani uchun ular atigi 100 ta sotgan.',
      'They only sold 100 rice cookers because the cooker always burnt the rice.',
      'Они продали только 100 рисоварок, потому что они постоянно сжигали рис.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['akio-morita', 'reading'],
  },

  en_s2u6_n1_015_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Today Sony ___ in the top 100 companies in the world.',
    blankAnswers: ['is'],
    options: ['is', 'was', 'were', "wasn't"],
    answer: 'is',
    answerTranslation: L(
      '오늘날 Sony는 세계 100대 기업 안에 들어요.',
      'Bugungi kunda Sony dunyoning eng yaxshi 100 kompaniyasidan biri.',
      'Today Sony is in the top 100 companies in the world.',
      'Сегодня Sony входит в сотню крупнейших компаний мира.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['akio-morita', 'reading'],
  },

  en_s2u6_n1_016_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['Vera', 'Wang', 'was', 'born', 'in', '1949'],
    answer: 'Vera Wang was born in 1949',
    audioText: 'Vera Wang was born in 1949.',
    answerTranslation: L(
      'Vera Wang은 1949년에 태어났어요.',
      'Vera Wang 1949-yilda tug‘ilgan.',
      'Vera Wang was born in 1949.',
      'Вера Вонг родилась в 1949 году.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['vera-wang', 'was-were'],
  },

  en_s2u6_n1_017_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['They', 'were', 'not', 'successful', 'at', 'first'],
    answer: 'They were not successful at first',
    answerTranslation: L(
      '그들은 처음에는 성공적이지 않았어요.',
      'Ular avval muvaffaqiyatli emas edi.',
      'They were not successful at first.',
      'Сначала они не были успешными.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['was-were'],
  },

  en_s2u6_n1_018_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Her parents were from China.',
    audioText: 'Her parents were from China.',
    answerI18n: L(
      '그녀의 부모님은 중국 출신이었어요',
      'Uning ota-onasi Xitoydan edi',
      'Her parents were from China',
      'Её родители были из Китая',
    ),
    options: ['Her', 'parents', 'were', 'from', 'China.'],
    optionsI18n: {
      ko: ['그녀의', '부모님은', '중국', '출신이었어요'],
      uz: ['Uning', 'ota-onasi', 'Xitoydan', 'edi'],
      en: ['Her', 'parents', 'were', 'from', 'China.'],
      ru: ['Её', 'родители', 'были', 'из', 'Китая'],
    },
    answerTranslation: L(
      '그녀의 부모님은 중국 출신이었어요.',
      'Uning ota-onasi Xitoydan edi.',
      'Her parents were from China.',
      'Её родители были из Китая.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['vera-wang', 'was-were'],
  },

  en_s2u6_n1_019_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Vera Wang wasn’t in the US Olympic team, but she later became a successful fashion designer.',
    audioText:
      'Vera Wang wasn’t in the US Olympic team, but she later became a successful fashion designer.',
    answerTranslation: L(
      'Vera Wang은 미국 올림픽 대표팀에는 들어가지 못했지만 나중에 성공한 패션 디자이너가 됐어요.',
      'Vera Wang AQSh Olimpiya jamoasiga kira olmadi, lekin keyin muvaffaqiyatli moda dizayneri bo‘ldi.',
      'Vera Wang wasn’t in the US Olympic team, but she later became a successful fashion designer.',
      'Вера Вонг не попала в олимпийскую сборную США, но позже стала успешным модельером.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['vera-wang', 'reading'],
  },

  en_s2u6_n1_020_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Akio Morita and Masaru Ibuku weren’t successful at first, but Sony later became a major company.',
    audioText:
      'Akio Morita and Masaru Ibuku weren’t successful at first, but Sony later became a major company.',
    answerTranslation: L(
      'Akio Morita와 Masaru Ibuku는 처음에는 성공하지 못했지만 Sony는 나중에 큰 회사가 됐어요.',
      'Akio Morita va Masaru Ibuku avval muvaffaqiyatli emas edi, lekin Sony keyinchalik katta kompaniyaga aylandi.',
      'Akio Morita and Masaru Ibuku weren’t successful at first, but Sony later became a major company.',
      'Акио Морита и Масару Ибука сначала не были успешны, но позже Sony стала крупной компанией.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['akio-morita', 'reading'],
  },

  // ===========================================================
  // Lesson 2 · was / were + Cool Runnings
  // ===========================================================

  en_s2u6_n1_021_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ is the past form of “is”.',
    blankAnswers: ['was'],
    options: ['was', 'were', 'are', 'be'],
    answer: 'was',
    answerTranslation: L(
      'is의 과거형은 was예요.',
      'is ning o‘tgan zamon shakli was.',
      'Was is the past form of is.',
      'Was — прошедшая форма is.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['was-were'],
  },

  en_s2u6_n1_022_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ is the past form of “are”.',
    blankAnswers: ['were'],
    options: ['were', 'was', 'is', 'be'],
    answer: 'were',
    answerTranslation: L(
      'are의 과거형은 were예요.',
      'are ning o‘tgan zamon shakli were.',
      'Were is the past form of are.',
      'Were — прошедшая форма are.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['was-were'],
  },

  en_s2u6_n1_023_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The negative form of “was” is ___.',
    blankAnswers: ["wasn't"],
    options: ["wasn't", "weren't", "isn't", "don't"],
    answer: "wasn't",
    answerTranslation: L(
      'was의 부정형은 wasn’t예요.',
      'was ning inkor shakli wasn’t.',
      'The negative form of was is wasn’t.',
      'Отрицательная форма was — wasn’t.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['was-were'],
  },

  en_s2u6_n1_024_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The negative form of “were” is ___.',
    blankAnswers: ["weren't"],
    options: ["weren't", "wasn't", "aren't", "didn't"],
    answer: "weren't",
    answerTranslation: L(
      'were의 부정형은 weren’t예요.',
      'were ning inkor shakli weren’t.',
      'The negative form of were is weren’t.',
      'Отрицательная форма were — weren’t.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['was-were'],
  },

  en_s2u6_n1_025_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'People ___ surprised to see a bobsleigh team from Jamaica.',
    blankAnswers: ['were'],
    options: ['were', 'was', "wasn't", 'is'],
    answer: 'were',
    answerTranslation: L(
      '사람들은 Jamaica 봅슬레이 팀을 보고 놀랐어요.',
      'Odamlar Jamaica bobsley jamoasini ko‘rib hayron qolgan edi.',
      'People were surprised to see a bobsleigh team from Jamaica.',
      'Люди были удивлены, увидев команду по бобслею с Ямайки.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['cool-runnings', 'was-were'],
  },

  en_s2u6_n1_026_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'It ___ very easy for the team to practise in Jamaica.',
    blankAnswers: ["wasn't"],
    options: ["wasn't", 'was', "weren't", 'were'],
    answer: "wasn't",
    answerTranslation: L(
      '그 팀이 Jamaica에서 연습하는 것은 쉽지 않았어요.',
      'Jamoa uchun Jamaicada mashq qilish oson emas edi.',
      'It wasn’t very easy for the team to practise in Jamaica.',
      'Команде было нелегко тренироваться на Ямайке.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['cool-runnings', 'was-were'],
  },

  en_s2u6_n1_027_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'There ___ no ice in Jamaica.',
    blankAnswers: ['was'],
    options: ['was', 'were', "weren't", 'are'],
    answer: 'was',
    answerTranslation: L(
      'Jamaica에는 얼음이 없었어요.',
      'Jamaicada muz yo‘q edi.',
      'There was no ice in Jamaica.',
      'На Ямайке не было льда.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['cool-runnings', 'there-was'],
  },

  en_s2u6_n1_028_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'There ___ no bobsleighs for them to use.',
    blankAnswers: ['were'],
    options: ['were', 'was', 'is', "wasn't"],
    answer: 'were',
    answerTranslation: L(
      '그들이 사용할 봅슬레이가 없었어요.',
      'Ular foydalanishi uchun bobsleylar yo‘q edi.',
      'There were no bobsleighs for them to use.',
      'У них не было бобслеев для тренировок.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['cool-runnings', 'there-were'],
  },

  en_s2u6_n1_029_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'They ___ successful in their races.',
    blankAnswers: ["weren't"],
    options: ["weren't", 'were', "wasn't", 'was'],
    answer: "weren't",
    answerTranslation: L(
      '그들은 경기에서 성공적이지 않았어요.',
      'Ular poygalarda muvaffaqiyatli emas edi.',
      'They weren’t successful in their races.',
      'Они не были успешны в гонках.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['cool-runnings', 'was-were'],
  },

  en_s2u6_n1_030_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'They ___ very popular with the people watching.',
    blankAnswers: ['were'],
    options: ['were', 'was', "wasn't", 'is'],
    answer: 'were',
    answerTranslation: L(
      '그들은 관중들에게 아주 인기가 많았어요.',
      'Ular tomoshabinlar orasida juda mashhur edi.',
      'They were very popular with the people watching.',
      'Они были очень популярны у зрителей.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['cool-runnings', 'was-were'],
  },

  en_s2u6_n1_031_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'There ___ a film about their story in 1993.',
    blankAnswers: ['was'],
    options: ['was', 'were', "weren't", 'are'],
    answer: 'was',
    answerTranslation: L(
      '1993년에 그들의 이야기를 다룬 영화가 있었어요.',
      '1993-yilda ularning hikoyasi haqida film bo‘lgan.',
      'There was a film about their story in 1993.',
      'В 1993 году вышел фильм об их истории.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['cool-runnings', 'was-were'],
  },

  en_s2u6_n1_032_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Cool Runnings ___ a huge success.',
    blankAnswers: ['was'],
    options: ['was', 'were', "weren't", 'are'],
    answer: 'was',
    answerTranslation: L(
      'Cool Runnings는 큰 성공을 거뒀어요.',
      'Cool Runnings juda katta muvaffaqiyat bo‘lgan.',
      'Cool Runnings was a huge success.',
      'Cool Runnings имел огромный успех.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['cool-runnings', 'was-were'],
  },

  en_s2u6_n1_033_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Was there a bobsleigh team at the Olympics?',
      },
    ],
    options: [
      'Yes, there was.',
      'Yes, there were.',
      'No, there weren’t.',
      'Yes, it were.',
    ],
    answer: 'Yes, there was.',
    answerTranslation: L(
      '네, 있었어요.',
      'Ha, bor edi.',
      'Yes, there was.',
      'Да, была.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['cool-runnings', 'short-answer'],
  },

  en_s2u6_n1_034_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Was it easy for them to practise?',
      },
    ],
    options: [
      'No, it wasn’t.',
      'No, they weren’t.',
      'Yes, it were.',
      'No, it isn’t.',
    ],
    answer: 'No, it wasn’t.',
    answerTranslation: L(
      '아니요, 쉽지 않았어요.',
      'Yo‘q, oson emas edi.',
      'No, it wasn’t.',
      'Нет, было нелегко.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['cool-runnings', 'short-answer'],
  },

  en_s2u6_n1_035_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Were there bobsleighs for them to use?',
      },
    ],
    options: [
      'No, there weren’t.',
      'No, there wasn’t.',
      'Yes, it was.',
      'No, they wasn’t.',
    ],
    answer: 'No, there weren’t.',
    answerTranslation: L(
      '아니요, 없었어요.',
      'Yo‘q, yo‘q edi.',
      'No, there weren’t.',
      'Нет, не было.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['cool-runnings', 'short-answer'],
  },

  en_s2u6_n1_036_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Were they popular?',
      },
    ],
    options: [
      'Yes, they were.',
      'Yes, they was.',
      'No, it wasn’t.',
      'Yes, there was.',
    ],
    answer: 'Yes, they were.',
    answerTranslation: L(
      '네, 인기가 많았어요.',
      'Ha, ular mashhur edi.',
      'Yes, they were.',
      'Да, были.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['cool-runnings', 'short-answer'],
  },

  en_s2u6_n1_037_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['Were', 'they', 'popular'],
    answer: 'Were they popular',
    audioText: 'Were they popular?',
    answerTranslation: L(
      '그들은 인기가 있었나요?',
      'Ular mashhur edimi?',
      'Were they popular?',
      'Они были популярны?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['was-were'],
  },

  en_s2u6_n1_038_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['There', 'was', 'no', 'ice', 'in', 'Jamaica'],
    answer: 'There was no ice in Jamaica',
    answerTranslation: L(
      'Jamaica에는 얼음이 없었어요.',
      'Jamaicada muz yo‘q edi.',
      'There was no ice in Jamaica.',
      'На Ямайке не было льда.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['cool-runnings'],
  },

  en_s2u6_n1_039_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'They weren’t successful, but they were very popular.',
    audioText: 'They weren’t successful, but they were very popular.',
    answerI18n: L(
      '그들은 경기에서는 성공하지 못했지만 아주 인기가 많았어요',
      'Ular muvaffaqiyatli emas edi, lekin juda mashhur edi',
      'They weren’t successful, but they were very popular',
      'Они не были успешными, но были очень популярными',
    ),
    options: [
      'They',
      'weren’t',
      'successful,',
      'but',
      'they',
      'were',
      'very',
      'popular.',
    ],
    optionsI18n: {
      ko: ['그들은', '성공하지', '못했지만', '아주', '인기가', '많았어요'],
      uz: [
        'Ular',
        'muvaffaqiyatli',
        'emas',
        'edi,',
        'lekin',
        'juda',
        'mashhur',
        'edi',
      ],
      en: [
        'They',
        'weren’t',
        'successful,',
        'but',
        'they',
        'were',
        'very',
        'popular.',
      ],
      ru: [
        'Они',
        'не',
        'были',
        'успешными,',
        'но',
        'были',
        'очень',
        'популярными',
      ],
    },
    answerTranslation: L(
      '그들은 경기에서는 성공하지 못했지만 아주 인기가 많았어요.',
      'Ular muvaffaqiyatli emas edi, lekin juda mashhur edi.',
      'They weren’t successful, but they were very popular.',
      'Они не были успешными, но были очень популярными.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['cool-runnings'],
  },

  en_s2u6_n1_040_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'We use was with I, he, she and it, and were with you, we and they.',
    audioText:
      'We use was with I, he, she and it, and were with you, we and they.',
    answerTranslation: L(
      'I, he, she, it에는 was를 쓰고 you, we, they에는 were를 사용해요.',
      'I, he, she va it bilan was, you, we va they bilan were ishlatiladi.',
      'We use was with I, he, she and it, and were with you, we and they.',
      'Was используется с I, he, she, it, а were — с you, we, they.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['was-were', 'review'],
  },

  // ===========================================================
  // Lesson 3 · IKEA is born
  // ===========================================================

  en_s2u6_n1_041_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'founder',
        native: 'asoschi',
        nativeI18n: L('창립자', 'asoschi', 'founder', 'основатель'),
      },
      {
        text: 'furniture',
        native: 'mebel',
        nativeI18n: L('가구', 'mebel', 'furniture', 'мебель'),
      },
      {
        text: 'rich',
        native: 'boy',
        nativeI18n: L('부유한', 'boy', 'rich', 'богатый'),
      },
      {
        text: 'farmer',
        native: 'fermer',
        nativeI18n: L('농부', 'fermer', 'farmer', 'фермер'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['ikea'],
  },

  en_s2u6_n1_042_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Ingvar Kamprad ___ the founder of IKEA.',
    blankAnswers: ['was'],
    options: ['was', 'were', "weren't", 'are'],
    answer: 'was',
    answerTranslation: L(
      'Ingvar Kamprad는 IKEA의 창립자였어요.',
      'Ingvar Kamprad IKEA asoschisi edi.',
      'Ingvar Kamprad was the founder of IKEA.',
      'Ингвар Кампрад был основателем IKEA.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['ikea', 'was-were'],
  },

  en_s2u6_n1_043_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'He ___ born in 1926 in Sweden.',
    blankAnswers: ['was'],
    options: ['was', 'were', "wasn't", 'is'],
    answer: 'was',
    answerTranslation: L(
      '그는 1926년 Sweden에서 태어났어요.',
      'U 1926-yilda Shvetsiyada tug‘ilgan.',
      'He was born in 1926 in Sweden.',
      'Он родился в Швеции в 1926 году.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['ikea', 'was-were'],
  },

  en_s2u6_n1_044_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'His parents ___ rich.',
    blankAnswers: ["weren't"],
    options: ["weren't", 'were', "wasn't", 'was'],
    answer: "weren't",
    answerTranslation: L(
      '그의 부모님은 부유하지 않았어요.',
      'Uning ota-onasi boy emas edi.',
      'His parents weren’t rich.',
      'Его родители не были богатыми.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['ikea', 'was-were'],
  },

  en_s2u6_n1_045_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'His parents ___ farmers.',
    blankAnswers: ['were'],
    options: ['were', 'was', "wasn't", 'is'],
    answer: 'were',
    answerTranslation: L(
      '그의 부모님은 농부였어요.',
      'Uning ota-onasi fermer edi.',
      'His parents were farmers.',
      'Его родители были фермерами.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['ikea', 'was-were'],
  },

  en_s2u6_n1_046_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'The family home ___ near a small village in the south of Sweden.',
    blankAnswers: ['was'],
    options: ['was', 'were', "weren't", 'are'],
    answer: 'was',
    answerTranslation: L(
      '가족의 집은 Sweden 남부의 작은 마을 근처에 있었어요.',
      'Oilaviy uy Shvetsiyaning janubidagi kichik qishloq yaqinida edi.',
      'The family home was near a small village in the south of Sweden.',
      'Семейный дом находился рядом с маленькой деревней на юге Швеции.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['ikea', 'was-were'],
  },

  en_s2u6_n1_047_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Ingvar ___ interested in farming.',
    blankAnswers: ["wasn't"],
    options: ["wasn't", 'was', "weren't", 'were'],
    answer: "wasn't",
    answerTranslation: L(
      'Ingvar는 농업에 관심이 없었어요.',
      'Ingvar dehqonchilikka qiziqmagan.',
      'Ingvar wasn’t interested in farming.',
      'Ингвар не интересовался фермерством.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['ikea', 'was-were'],
  },

  en_s2u6_n1_048_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'His first products ___ pencils and other small items.',
    blankAnswers: ['were'],
    options: ['were', 'was', "wasn't", 'is'],
    answer: 'were',
    answerTranslation: L(
      '그의 첫 제품은 연필과 다른 작은 물건들이었어요.',
      'Uning birinchi mahsulotlari qalamlar va boshqa kichik buyumlar edi.',
      'His first products were pencils and other small items.',
      'Его первыми товарами были карандаши и другие небольшие вещи.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['ikea', 'was-were'],
  },

  en_s2u6_n1_049_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'There ___ any IKEA stores before 1958.',
    blankAnswers: ["weren't"],
    options: ["weren't", 'were', "wasn't", 'was'],
    answer: "weren't",
    answerTranslation: L(
      '1958년 이전에는 IKEA 매장이 없었어요.',
      '1958-yilgacha IKEA do‘konlari yo‘q edi.',
      'There weren’t any IKEA stores before 1958.',
      'До 1958 года магазинов IKEA не было.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['ikea', 'there-were'],
  },

  en_s2u6_n1_050_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'Before 1958, it ___ only possible to buy things from IKEA by mail.',
    blankAnswers: ['was'],
    options: ['was', 'were', "weren't", 'are'],
    answer: 'was',
    answerTranslation: L(
      '1958년 이전에는 우편으로만 IKEA 물건을 살 수 있었어요.',
      '1958-yilgacha IKEA mahsulotlarini faqat pochta orqali sotib olish mumkin edi.',
      'Before 1958, it was only possible to buy things from IKEA by mail.',
      'До 1958 года товары IKEA можно было покупать только по почте.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['ikea', 'was-were'],
  },

  en_s2u6_n1_051_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The first IKEA store ___ in Sweden.',
    blankAnswers: ['was'],
    options: ['was', 'were', "weren't", 'are'],
    answer: 'was',
    answerTranslation: L(
      '첫 IKEA 매장은 Sweden에 있었어요.',
      'Birinchi IKEA do‘koni Shvetsiyada edi.',
      'The first IKEA store was in Sweden.',
      'Первый магазин IKEA был в Швеции.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['ikea', 'was-were'],
  },

  en_s2u6_n1_052_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Was Ingvar Kamprad born in Sweden?',
      },
    ],
    options: [
      'Yes, he was.',
      'No, he weren’t.',
      'Yes, he were.',
      'No, they weren’t.',
    ],
    answer: 'Yes, he was.',
    answerTranslation: L('네, 맞아요.', 'Ha.', 'Yes, he was.', 'Да.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['ikea', 'short-answer'],
  },

  en_s2u6_n1_053_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Were his parents rich?',
      },
    ],
    options: [
      'No, they weren’t.',
      'No, he wasn’t.',
      'Yes, it was.',
      'No, they wasn’t.',
    ],
    answer: 'No, they weren’t.',
    answerTranslation: L(
      '아니요, 부유하지 않았어요.',
      'Yo‘q, boy emas edi.',
      'No, they weren’t.',
      'Нет, не были.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['ikea', 'short-answer'],
  },

  en_s2u6_n1_054_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Were they farmers?',
      },
    ],
    options: [
      'Yes, they were.',
      'Yes, he was.',
      'No, it wasn’t.',
      'Yes, they was.',
    ],
    answer: 'Yes, they were.',
    answerTranslation: L(
      '네, 농부였어요.',
      'Ha, ular fermer edi.',
      'Yes, they were.',
      'Да, были.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['ikea', 'short-answer'],
  },

  en_s2u6_n1_055_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Was Ingvar interested in farming?',
      },
    ],
    options: [
      'No, he wasn’t.',
      'No, they weren’t.',
      'Yes, he were.',
      'No, he isn’t.',
    ],
    answer: 'No, he wasn’t.',
    answerTranslation: L(
      '아니요, 관심이 없었어요.',
      'Yo‘q, qiziqmagan.',
      'No, he wasn’t.',
      'Нет, не интересовался.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['ikea', 'short-answer'],
  },

  en_s2u6_n1_056_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Was IKEA furniture on sale in 1950?',
      },
    ],
    options: [
      'No, it wasn’t.',
      'Yes, they were.',
      'No, they weren’t.',
      'Yes, it were.',
    ],
    answer: 'No, it wasn’t.',
    answerTranslation: L(
      '아니요, 아니었어요.',
      'Yo‘q.',
      'No, it wasn’t.',
      'Нет.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['ikea', 'short-answer'],
  },

  en_s2u6_n1_057_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['His', 'parents', 'were', 'farmers'],
    answer: 'His parents were farmers',
    audioText: 'His parents were farmers.',
    answerTranslation: L(
      '그의 부모님은 농부였어요.',
      'Uning ota-onasi fermer edi.',
      'His parents were farmers.',
      'Его родители были фермерами.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['ikea'],
  },

  en_s2u6_n1_058_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['There', 'were', 'no', 'IKEA', 'stores', 'before', '1958'],
    answer: 'There were no IKEA stores before 1958',
    answerTranslation: L(
      '1958년 이전에는 IKEA 매장이 없었어요.',
      '1958-yilgacha IKEA do‘konlari yo‘q edi.',
      'There were no IKEA stores before 1958.',
      'До 1958 года магазинов IKEA не было.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['ikea'],
  },

  en_s2u6_n1_059_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Ingvar Kamprad was the founder of IKEA.',
    audioText: 'Ingvar Kamprad was the founder of IKEA.',
    answerI18n: L(
      'Ingvar Kamprad는 IKEA의 창립자였어요',
      'Ingvar Kamprad IKEA asoschisi edi',
      'Ingvar Kamprad was the founder of IKEA',
      'Ингвар Кампрад был основателем IKEA',
    ),
    options: ['Ingvar', 'Kamprad', 'was', 'the', 'founder', 'of', 'IKEA.'],
    optionsI18n: {
      ko: ['Ingvar', 'Kamprad는', 'IKEA의', '창립자였어요'],
      uz: ['Ingvar', 'Kamprad', 'IKEA', 'asoschisi', 'edi'],
      en: ['Ingvar', 'Kamprad', 'was', 'the', 'founder', 'of', 'IKEA.'],
      ru: ['Ингвар', 'Кампрад', 'был', 'основателем', 'IKEA'],
    },
    answerTranslation: L(
      'Ingvar Kamprad는 IKEA의 창립자였어요.',
      'Ingvar Kamprad IKEA asoschisi edi.',
      'Ingvar Kamprad was the founder of IKEA.',
      'Ингвар Кампрад был основателем IKEA.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['ikea'],
  },

  en_s2u6_n1_060_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Ingvar Kamprad was born in Sweden, his parents were farmers and he started IKEA in 1943.',
    audioText:
      'Ingvar Kamprad was born in Sweden, his parents were farmers and he started IKEA in 1943.',
    answerTranslation: L(
      'Ingvar Kamprad는 Sweden에서 태어났고 부모님은 농부였으며 1943년에 IKEA를 시작했어요.',
      'Ingvar Kamprad Shvetsiyada tug‘ilgan, ota-onasi fermer edi va u IKEAni 1943-yilda boshlagan.',
      'Ingvar Kamprad was born in Sweden, his parents were farmers and he started IKEA in 1943.',
      'Ингвар Кампрад родился в Швеции, его родители были фермерами, а IKEA он начал в 1943 году.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['ikea', 'review'],
  },

  // ===========================================================
  // Lesson 4 · Past time expressions
  // ===========================================================

  en_s2u6_n1_061_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '시간 표현을 알맞은 의미와 연결하세요.',
      'Vaqt iboralarini mos ma’nolar bilan bog‘lang.',
      'Match the past time expressions with their meanings.',
      'Соедините выражения времени с их значениями.',
    ),
    pairs: [
      {
        text: 'last night',
        native: 'kecha kechqurun',
        nativeI18n: L(
          '어젯밤',
          'kecha kechqurun',
          'last night',
          'прошлой ночью',
        ),
      },
      {
        text: 'last year',
        native: 'o‘tgan yili',
        nativeI18n: L('작년에', 'o‘tgan yili', 'last year', 'в прошлом году'),
      },
      {
        text: 'two months ago',
        native: 'ikki oy oldin',
        nativeI18n: L(
          '두 달 전에',
          'ikki oy oldin',
          'two months ago',
          'два месяца назад',
        ),
      },
      {
        text: 'in 2012',
        native: '2012-yilda',
        nativeI18n: L('2012년에', '2012-yilda', 'in 2012', 'в 2012 году'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['time-expressions'],
  },

  en_s2u6_n1_062_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Jackie was in her office half an hour ___.',
    blankAnswers: ['ago'],
    options: ['ago', 'last', 'in', 'at'],
    answer: 'ago',
    answerTranslation: L(
      'Jackie는 30분 전에 사무실에 있었어요.',
      'Jackie yarim soat oldin ofisida edi.',
      'Jackie was in her office half an hour ago.',
      'Джеки была в своём офисе полчаса назад.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['time-expressions', 'ago'],
  },

  en_s2u6_n1_063_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The London Olympics were ___ 2012.',
    blankAnswers: ['in'],
    options: ['in', 'last', 'ago', 'on'],
    answer: 'in',
    answerTranslation: L(
      'London 올림픽은 2012년에 열렸어요.',
      'London Olimpiadasi 2012-yilda bo‘lgan.',
      'The London Olympics were in 2012.',
      'Олимпиада в Лондоне была в 2012 году.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['time-expressions'],
  },

  en_s2u6_n1_064_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'There was an important football match ___ night.',
    blankAnswers: ['last'],
    options: ['last', 'ago', 'in', 'at'],
    answer: 'last',
    answerTranslation: L(
      '어젯밤 중요한 축구 경기가 있었어요.',
      'Kecha kechqurun muhim futbol o‘yini bo‘ldi.',
      'There was an important football match last night.',
      'Прошлой ночью был важный футбольный матч.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['time-expressions'],
  },

  en_s2u6_n1_065_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'We were in Spain ___ year.',
    blankAnswers: ['last'],
    options: ['last', 'ago', 'in', 'on'],
    answer: 'last',
    answerTranslation: L(
      '우리는 작년에 Spain에 있었어요.',
      'Biz o‘tgan yili Ispaniyada edik.',
      'We were in Spain last year.',
      'Мы были в Испании в прошлом году.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['time-expressions'],
  },

  en_s2u6_n1_066_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Albert Einstein was born ___ the 19th century.',
    blankAnswers: ['in'],
    options: ['in', 'last', 'ago', 'at'],
    answer: 'in',
    answerTranslation: L(
      'Albert Einstein은 19세기에 태어났어요.',
      'Albert Einstein 19-asrda tug‘ilgan.',
      'Albert Einstein was born in the 19th century.',
      'Альберт Эйнштейн родился в XIX веке.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['time-expressions', 'century'],
  },

  en_s2u6_n1_067_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'There was a staff meeting a few days ___.',
    blankAnswers: ['ago'],
    options: ['ago', 'last', 'in', 'on'],
    answer: 'ago',
    answerTranslation: L(
      '며칠 전에 직원 회의가 있었어요.',
      'Bir necha kun oldin xodimlar yig‘ilishi bo‘lgan.',
      'There was a staff meeting a few days ago.',
      'Несколько дней назад было собрание сотрудников.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['time-expressions'],
  },

  en_s2u6_n1_068_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She was in hospital two months ___.',
    blankAnswers: ['ago'],
    options: ['ago', 'last', 'in', 'at'],
    answer: 'ago',
    answerTranslation: L(
      '그녀는 두 달 전에 병원에 있었어요.',
      'U ikki oy oldin kasalxonada edi.',
      'She was in hospital two months ago.',
      'Она была в больнице два месяца назад.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['time-expressions'],
  },

  en_s2u6_n1_069_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'When was the first football World Cup?',
      },
    ],
    options: ['In 1930.', 'In 1979.', 'In 1927.', '2,800 years ago.'],
    answer: 'In 1930.',
    answerTranslation: L(
      '1930년이에요.',
      '1930-yilda.',
      'In 1930.',
      'В 1930 году.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['history-firsts'],
  },

  en_s2u6_n1_070_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'When were the first Olympics?',
      },
    ],
    options: ['About 2,800 years ago.', 'In 1979.', 'In 1930.', 'In 1927.'],
    answer: 'About 2,800 years ago.',
    answerTranslation: L(
      '약 2,800년 전이에요.',
      'Taxminan 2,800 yil oldin.',
      'About 2,800 years ago.',
      'Около 2 800 лет назад.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['history-firsts'],
  },

  en_s2u6_n1_071_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'When was the first Sony Walkman?',
      },
    ],
    options: ['In 1979.', 'In 1930.', 'In 1927.', 'In the 19th century.'],
    answer: 'In 1979.',
    answerTranslation: L(
      '1979년이에요.',
      '1979-yilda.',
      'In 1979.',
      'В 1979 году.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['history-firsts'],
  },

  en_s2u6_n1_072_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'When was the first talking film?',
      },
    ],
    options: ['In 1927.', 'In 1979.', 'In 1930.', '2,800 years ago.'],
    answer: 'In 1927.',
    answerTranslation: L(
      '1927년이에요.',
      '1927-yilda.',
      'In 1927.',
      'В 1927 году.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['history-firsts'],
  },

  en_s2u6_n1_073_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Glen retired ___ 2006.',
    blankAnswers: ['in'],
    options: ['in', 'last', 'ago', 'on'],
    answer: 'in',
    answerTranslation: L(
      'Glen은 2006년에 은퇴했어요.',
      'Glen 2006-yilda nafaqaga chiqqan.',
      'Glen retired in 2006.',
      'Глен вышел на пенсию в 2006 году.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['family-history', 'time-expressions'],
  },

  en_s2u6_n1_074_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ month he was in York.',
    blankAnswers: ['Last'],
    options: ['Last', 'Ago', 'In', 'At'],
    answer: 'Last',
    answerTranslation: L(
      '지난달 그는 York에 있었어요.',
      'O‘tgan oy u Yorkda edi.',
      'Last month he was in York.',
      'В прошлом месяце он был в Йорке.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['family-history', 'time-expressions'],
  },

  en_s2u6_n1_075_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Two years ___ he was in Wales.',
    blankAnswers: ['ago'],
    options: ['ago', 'last', 'in', 'at'],
    answer: 'ago',
    answerTranslation: L(
      '2년 전에 그는 Wales에 있었어요.',
      'Ikki yil oldin u Walesda edi.',
      'Two years ago he was in Wales.',
      'Два года назад он был в Уэльсе.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['family-history', 'time-expressions'],
  },

  en_s2u6_n1_076_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'His grandparents were farmers in Wales ___ the 19th century.',
    blankAnswers: ['in'],
    options: ['in', 'last', 'ago', 'at'],
    answer: 'in',
    answerTranslation: L(
      '그의 조부모님은 19세기에 Wales에서 농부였어요.',
      'Uning bobosi va buvisi 19-asrda Walesda fermer bo‘lgan.',
      'His grandparents were farmers in Wales in the 19th century.',
      'Его бабушка и дедушка были фермерами в Уэльсе в XIX веке.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['family-history', 'time-expressions'],
  },

  en_s2u6_n1_077_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'There',
      'was',
      'a',
      'staff',
      'meeting',
      'a',
      'few',
      'days',
      'ago',
    ],
    answer: 'There was a staff meeting a few days ago',
    audioText: 'There was a staff meeting a few days ago.',
    answerTranslation: L(
      '며칠 전에 직원 회의가 있었어요.',
      'Bir necha kun oldin xodimlar yig‘ilishi bo‘lgan.',
      'There was a staff meeting a few days ago.',
      'Несколько дней назад было собрание сотрудников.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['time-expressions'],
  },

  en_s2u6_n1_078_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['We', 'were', 'in', 'Spain', 'last', 'year'],
    answer: 'We were in Spain last year',
    answerTranslation: L(
      '우리는 작년에 Spain에 있었어요.',
      'Biz o‘tgan yili Ispaniyada edik.',
      'We were in Spain last year.',
      'Мы были в Испании в прошлом году.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['time-expressions'],
  },

  en_s2u6_n1_079_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Albert Einstein was born in the 19th century.',
    audioText: 'Albert Einstein was born in the 19th century.',
    answerI18n: L(
      'Albert Einstein은 19세기에 태어났어요',
      'Albert Einstein 19-asrda tug‘ilgan',
      'Albert Einstein was born in the 19th century',
      'Альберт Эйнштейн родился в XIX веке',
    ),
    options: [
      'Albert',
      'Einstein',
      'was',
      'born',
      'in',
      'the',
      '19th',
      'century.',
    ],
    optionsI18n: {
      ko: ['Albert', 'Einstein은', '19세기에', '태어났어요'],
      uz: ['Albert', 'Einstein', '19-asrda', 'tug‘ilgan'],
      en: [
        'Albert',
        'Einstein',
        'was',
        'born',
        'in',
        'the',
        '19th',
        'century.',
      ],
      ru: ['Альберт', 'Эйнштейн', 'родился', 'в', 'XIX', 'веке'],
    },
    answerTranslation: L(
      'Albert Einstein은 19세기에 태어났어요.',
      'Albert Einstein 19-asrda tug‘ilgan.',
      'Albert Einstein was born in the 19th century.',
      'Альберт Эйнштейн родился в XIX веке.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['time-expressions'],
  },

  en_s2u6_n1_080_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'In Unit 6.1, we use was and were to talk about the past and use expressions such as last night, in 2012 and two months ago.',
    audioText:
      'In Unit 6.1, we use was and were to talk about the past and use expressions such as last night, in 2012 and two months ago.',
    answerTranslation: L(
      'Unit 6.1에서는 was와 were로 과거를 말하고 last night, in 2012, two months ago 같은 시간 표현을 사용해요.',
      'Unit 6.1 da o‘tgan zamon haqida was va were bilan gapiramiz va last night, in 2012, two months ago kabi vaqt iboralarini ishlatamiz.',
      'In Unit 6.1, we use was and were to talk about the past and use expressions such as last night, in 2012 and two months ago.',
      'В Unit 6.1 мы используем was и were для прошлого и выражения времени вроде last night, in 2012 и two months ago.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit6', 'node-review'],
  },
};

// ─────────────────────────────────────────────────────────────
// Node 1
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT6_NODE1 = {
  title: L('포기하지 마!', 'Taslim bo‘lma!', 'Don’t give up!', 'Не сдавайся!'),
  section: 2,
  unit: 6,
  order: 1,
  isActive: true,

  lessons: [
    {
      title: L(
        '처음에는 실패했던 성공한 사람들',
        'Avval muvaffaqiyatsiz bo‘lgan muvaffaqiyatli odamlar',
        'Successful people who failed at first',
        'Успешные люди, которые сначала потерпели неудачу',
      ),
      description: L(
        'Vera Wang과 Akio Morita의 이야기를 읽으며 was, were, wasn’t, weren’t를 사용해 과거의 사람과 상황을 설명해요.',
        'Vera Wang va Akio Morita hikoyalari orqali was, were, wasn’t va weren’t bilan o‘tmishni tasvirlaysiz.',
        'Read about Vera Wang and Akio Morita and describe past people and situations with was and were.',
        'Читаем о Вере Вонг и Акио Морите и описываем прошлое с was и were.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 1,
      questions: [
        'en_s2u6_n1_001_word_matching',
        'en_s2u6_n1_002_fill_in_blank',
        'en_s2u6_n1_003_fill_in_blank',
        'en_s2u6_n1_004_fill_in_blank',
        'en_s2u6_n1_005_fill_in_blank',
        'en_s2u6_n1_006_dialog_complete',
        'en_s2u6_n1_007_dialog_complete',
        'en_s2u6_n1_008_fill_in_blank',
        'en_s2u6_n1_009_fill_in_blank',
        'en_s2u6_n1_010_fill_in_blank',
        'en_s2u6_n1_011_fill_in_blank',
        'en_s2u6_n1_012_dialog_complete',
        'en_s2u6_n1_013_dialog_complete',
        'en_s2u6_n1_014_fill_in_blank',
        'en_s2u6_n1_015_fill_in_blank',
        'en_s2u6_n1_016_word_arrange',
        'en_s2u6_n1_017_translate_builder',
        'en_s2u6_n1_018_sentence_builder',
        'en_s2u6_n1_019_speaking',
        'en_s2u6_n1_020_speaking',
      ],
    },

    {
      title: L(
        'was / were와 Cool Runnings',
        'was / were va Cool Runnings',
        'Was, were and Cool Runnings',
        'Was, were и Cool Runnings',
      ),
      description: L(
        'Jamaica 봅슬레이 팀 이야기를 통해 was/were의 긍정문, 부정문, 의문문과 짧은 대답을 연습해요.',
        'Jamaica bobsley jamoasi hikoyasi orqali was/were ning ijobiy, inkor, so‘roq va qisqa javob shakllarini mashq qilasiz.',
        'Practise positive, negative and question forms of was and were through the Cool Runnings story.',
        'Практикуем утвердительные, отрицательные и вопросительные формы was/were по истории Cool Runnings.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 2,
      questions: [
        'en_s2u6_n1_021_fill_in_blank',
        'en_s2u6_n1_022_fill_in_blank',
        'en_s2u6_n1_023_fill_in_blank',
        'en_s2u6_n1_024_fill_in_blank',
        'en_s2u6_n1_025_fill_in_blank',
        'en_s2u6_n1_026_fill_in_blank',
        'en_s2u6_n1_027_fill_in_blank',
        'en_s2u6_n1_028_fill_in_blank',
        'en_s2u6_n1_029_fill_in_blank',
        'en_s2u6_n1_030_fill_in_blank',
        'en_s2u6_n1_031_fill_in_blank',
        'en_s2u6_n1_032_fill_in_blank',
        'en_s2u6_n1_033_dialog_complete',
        'en_s2u6_n1_034_dialog_complete',
        'en_s2u6_n1_035_dialog_complete',
        'en_s2u6_n1_036_dialog_complete',
        'en_s2u6_n1_037_word_arrange',
        'en_s2u6_n1_038_translate_builder',
        'en_s2u6_n1_039_sentence_builder',
        'en_s2u6_n1_040_speaking',
      ],
    },

    {
      title: L(
        'IKEA의 시작',
        'IKEA ning boshlanishi',
        'IKEA is born',
        'Рождение IKEA',
      ),
      description: L(
        'Workbook의 Ingvar Kamprad와 IKEA 글을 읽으며 was/were와 짧은 대답을 다시 연습해요.',
        'Workbookdagi Ingvar Kamprad va IKEA matni orqali was/were hamda qisqa javoblarni takrorlaysiz.',
        'Read the Workbook text about Ingvar Kamprad and IKEA and practise was/were questions and short answers.',
        'Читаем текст об Ингваре Кампраде и IKEA и повторяем вопросы и краткие ответы с was/were.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 3,
      questions: [
        'en_s2u6_n1_041_word_matching',
        'en_s2u6_n1_042_fill_in_blank',
        'en_s2u6_n1_043_fill_in_blank',
        'en_s2u6_n1_044_fill_in_blank',
        'en_s2u6_n1_045_fill_in_blank',
        'en_s2u6_n1_046_fill_in_blank',
        'en_s2u6_n1_047_fill_in_blank',
        'en_s2u6_n1_048_fill_in_blank',
        'en_s2u6_n1_049_fill_in_blank',
        'en_s2u6_n1_050_fill_in_blank',
        'en_s2u6_n1_051_fill_in_blank',
        'en_s2u6_n1_052_dialog_complete',
        'en_s2u6_n1_053_dialog_complete',
        'en_s2u6_n1_054_dialog_complete',
        'en_s2u6_n1_055_dialog_complete',
        'en_s2u6_n1_056_dialog_complete',
        'en_s2u6_n1_057_word_arrange',
        'en_s2u6_n1_058_translate_builder',
        'en_s2u6_n1_059_sentence_builder',
        'en_s2u6_n1_060_speaking',
      ],
    },

    {
      title: L(
        '과거 시간 표현',
        'O‘tgan zamon vaqt iboralari',
        'Past time expressions',
        'Выражения прошедшего времени',
      ),
      description: L(
        'in, last, ago를 사용해 in 2012, last night, two months ago 같은 과거 시간 표현을 만들고 History Firsts와 Family History로 복습해요.',
        'in, last va ago yordamida in 2012, last night va two months ago kabi vaqt iboralarini tuzib, History Firsts va Family History orqali takrorlaysiz.',
        'Use in, last and ago to make past time expressions and practise them with History Firsts and Family History.',
        'Используем in, last и ago для выражений прошедшего времени и закрепляем их в History Firsts и Family History.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 4,
      questions: [
        'en_s2u6_n1_061_word_matching',
        'en_s2u6_n1_062_fill_in_blank',
        'en_s2u6_n1_063_fill_in_blank',
        'en_s2u6_n1_064_fill_in_blank',
        'en_s2u6_n1_065_fill_in_blank',
        'en_s2u6_n1_066_fill_in_blank',
        'en_s2u6_n1_067_fill_in_blank',
        'en_s2u6_n1_068_fill_in_blank',
        'en_s2u6_n1_069_dialog_complete',
        'en_s2u6_n1_070_dialog_complete',
        'en_s2u6_n1_071_dialog_complete',
        'en_s2u6_n1_072_dialog_complete',
        'en_s2u6_n1_073_fill_in_blank',
        'en_s2u6_n1_074_fill_in_blank',
        'en_s2u6_n1_075_fill_in_blank',
        'en_s2u6_n1_076_fill_in_blank',
        'en_s2u6_n1_077_word_arrange',
        'en_s2u6_n1_078_translate_builder',
        'en_s2u6_n1_079_sentence_builder',
        'en_s2u6_n1_080_speaking',
      ],
    },
  ],
};
// ─────────────────────────────────────────────────────────────
// Section 2 · Unit 6 · Node 2
// 6.2 Stories
//
// Coverage
// Coursebook:
// - The History of Money
// - past simple regular verbs
// - -ed pronunciation /t/ /d/ /ɪd/
// - common regular verb collocations
//
// Workbook:
// - The Story of the Cashpoint
// - regular past forms
// - spelling changes: carry → carried / try → tried
// - -ed pronunciation
// - common verb collocations
//
// IMPORTANT:
// *_WORDS에는 단일 headword만 등록.
// "metal snakes", "cash machine", "post a letter",
// "prepare a meal", "wait for a bus" 등은 phrase로만 사용.
//
// 4 lessons × 20 questions = 80
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT6_NODE2_WORDS = [
  {
    code: 'en-noun-currency',
    english: 'currency',
    senseKey: 'money-system-used-in-country',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '통화; 화폐',
      'valyuta',
      'the money system used in a country',
      'валюта',
    ),
    examples: [
      {
        english: 'Different countries use different currencies.',
        translations: L(
          '나라마다 다른 통화를 사용해요.',
          'Turli mamlakatlar turli valyutalardan foydalanadi.',
          'Different countries use different currencies.',
          'Разные страны используют разные валюты.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkʌrənsi/',
      ttsText: 'currency',
    },
    tags: ['money', 'unit6'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-coin',
    english: 'coin',
    senseKey: 'small-round-piece-of-metal-used-as-money',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '동전',
      'tanga',
      'a small round piece of metal used as money',
      'монета',
    ),
    examples: [
      {
        english: 'The Chinese used coins.',
        translations: L(
          '중국인들은 동전을 사용했어요.',
          'Xitoyliklar tangalardan foydalangan.',
          'The Chinese used coins.',
          'Китайцы использовали монеты.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/kɔɪn/',
      ttsText: 'coin',
    },
    tags: ['money', 'unit6'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-snake',
    english: 'snake',
    senseKey: 'long-legless-reptile',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('뱀', 'ilon', 'a long animal with no legs', 'змея'),
    examples: [
      {
        english: 'Some early money looked like metal snakes.',
        translations: L(
          '초기의 화폐 중 일부는 금속 뱀처럼 생겼어요.',
          'Ba’zi qadimgi pullar metall ilonga o‘xshagan.',
          'Some early money looked like metal snakes.',
          'Некоторые ранние деньги были похожи на металлических змей.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/sneɪk/',
      ttsText: 'snake',
    },
    tags: ['money', 'history', 'unit6'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-salt',
    english: 'salt',
    senseKey: 'white-substance-used-to-flavour-food',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '소금',
      'tuz',
      'a white substance used to add flavour to food',
      'соль',
    ),
    examples: [
      {
        english: 'People used salt as money.',
        translations: L(
          '사람들은 소금을 돈처럼 사용했어요.',
          'Odamlar tuzni pul sifatida ishlatgan.',
          'People used salt as money.',
          'Люди использовали соль как деньги.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/sɔːlt/',
      ttsText: 'salt',
    },
    tags: ['money', 'history', 'unit6'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-cashpoint',
    english: 'cashpoint',
    senseKey: 'machine-for-taking-money-from-bank-account',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '현금 인출기',
      'bankomat',
      'a machine used to take money from a bank account',
      'банкомат',
    ),
    examples: [
      {
        english: 'The first cashpoint was in London.',
        translations: L(
          '첫 현금 인출기는 London에 있었어요.',
          'Birinchi bankomat Londonda edi.',
          'The first cashpoint was in London.',
          'Первый банкомат был в Лондоне.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkæʃpɔɪnt/',
      ttsText: 'cashpoint',
    },
    tags: ['money', 'unit6'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-verb-collect',
    english: 'collect',
    senseKey: 'bring-or-gather-things-together',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '모으다; 수집하다',
      'to‘plamoq',
      'to bring or gather things together',
      'собирать',
    ),
    examples: [
      {
        english: 'He collected old coins.',
        translations: L(
          '그는 오래된 동전을 모았어요.',
          'U eski tangalarni to‘pladi.',
          'He collected old coins.',
          'Он собирал старые монеты.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/kəˈlekt/',
      ttsText: 'collect',
    },
    tags: ['regular-verbs', 'unit6'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-prepare',
    english: 'prepare',
    senseKey: 'make-something-ready',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '준비하다',
      'tayyorlamoq',
      'to make something ready',
      'готовить',
    ),
    examples: [
      {
        english: 'She prepared a meal.',
        translations: L(
          '그녀는 식사를 준비했어요.',
          'U ovqat tayyorladi.',
          'She prepared a meal.',
          'Она приготовила еду.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/prɪˈpeə/',
      ttsText: 'prepare',
    },
    tags: ['regular-verbs', 'collocations', 'unit6'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-shout',
    english: 'shout',
    senseKey: 'speak-very-loudly',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L('소리치다', 'baqirmoq', 'to speak very loudly', 'кричать'),
    examples: [
      {
        english: 'He shouted at someone.',
        translations: L(
          '그는 누군가에게 소리쳤어요.',
          'U birovga baqirdi.',
          'He shouted at someone.',
          'Он накричал на кого-то.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ʃaʊt/',
      ttsText: 'shout',
    },
    tags: ['regular-verbs', 'collocations', 'unit6'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-receive',
    english: 'receive',
    senseKey: 'get-something-sent-or-given',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '받다',
      'qabul qilmoq',
      'to get something that someone sends or gives you',
      'получать',
    ),
    examples: [
      {
        english: 'I received an email.',
        translations: L(
          '저는 이메일을 받았어요.',
          'Men elektron xat oldim.',
          'I received an email.',
          'Я получил электронное письмо.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/rɪˈsiːv/',
      ttsText: 'receive',
    },
    tags: ['regular-verbs', 'collocations', 'unit6'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-relative',
    english: 'relative',
    senseKey: 'person-in-same-family',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '친척',
      'qarindosh',
      'a person who is part of your family',
      'родственник',
    ),
    examples: [
      {
        english: 'We visited a relative.',
        translations: L(
          '우리는 친척을 방문했어요.',
          'Biz qarindoshimizni ko‘rgani bordik.',
          'We visited a relative.',
          'Мы навестили родственника.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈrelətɪv/',
      ttsText: 'relative',
    },
    tags: ['family', 'collocations', 'unit6'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-competition',
    english: 'competition',
    senseKey: 'event-where-people-try-to-win',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '대회; 경쟁',
      'musobaqa',
      'an event in which people try to win',
      'соревнование',
    ),
    examples: [
      {
        english: 'She entered a competition.',
        translations: L(
          '그녀는 대회에 참가했어요.',
          'U musobaqaga qatnashdi.',
          'She entered a competition.',
          'Она приняла участие в соревновании.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌkɒmpəˈtɪʃən/',
      ttsText: 'competition',
    },
    tags: ['collocations', 'unit6'],
    difficulty: 2,
    isCore: true,
  },
];

export const EN_S2_UNIT6_NODE2_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · The History of Money
  // ===========================================================

  en_s2u6_n2_001_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'currency',
        native: 'valyuta',
        nativeI18n: L('통화', 'valyuta', 'currency', 'валюта'),
      },
      {
        text: 'coin',
        native: 'tanga',
        nativeI18n: L('동전', 'tanga', 'coin', 'монета'),
      },
      {
        text: 'snake',
        native: 'ilon',
        nativeI18n: L('뱀', 'ilon', 'snake', 'змея'),
      },
      {
        text: 'salt',
        native: 'tuz',
        nativeI18n: L('소금', 'tuz', 'salt', 'соль'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['history-of-money'],
  },

  en_s2u6_n2_002_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Different countries use different ___.',
    blankAnswers: ['currencies'],
    options: ['currencies', 'snakes', 'salt', 'rings'],
    answer: 'currencies',
    answerTranslation: L(
      '나라마다 다른 통화를 사용해요.',
      'Turli mamlakatlar turli valyutalardan foydalanadi.',
      'Different countries use different currencies.',
      'Разные страны используют разные валюты.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['history-of-money'],
  },

  en_s2u6_n2_003_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The Chinese used ___ as money.',
    blankAnswers: ['coins'],
    options: ['coins', 'emails', 'newspapers', 'tickets'],
    answer: 'coins',
    answerTranslation: L(
      '중국인들은 동전을 돈으로 사용했어요.',
      'Xitoyliklar tangalarni pul sifatida ishlatgan.',
      'The Chinese used coins as money.',
      'Китайцы использовали монеты как деньги.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['history-of-money'],
  },

  en_s2u6_n2_004_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Some old money looked like metal ___.',
    blankAnswers: ['snakes'],
    options: ['snakes', 'cars', 'shirts', 'tables'],
    answer: 'snakes',
    answerTranslation: L(
      '일부 오래된 화폐는 금속 뱀처럼 생겼어요.',
      'Ba’zi qadimgi pullar metall ilonga o‘xshagan.',
      'Some old money looked like metal snakes.',
      'Некоторые старые деньги были похожи на металлических змей.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['history-of-money'],
  },

  en_s2u6_n2_005_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'People also used ___ as money.',
    blankAnswers: ['salt'],
    options: ['salt', 'music', 'weather', 'homework'],
    answer: 'salt',
    answerTranslation: L(
      '사람들은 소금도 돈으로 사용했어요.',
      'Odamlar tuzni ham pul sifatida ishlatgan.',
      'People also used salt as money.',
      'Люди также использовали соль как деньги.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['history-of-money'],
  },

  en_s2u6_n2_006_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'What is a coin?',
      },
    ],
    options: [
      'A small piece of metal used as money.',
      'A type of meal.',
      'A place to sleep.',
      'A kind of job.',
    ],
    answer: 'A small piece of metal used as money.',
    answerTranslation: L(
      '돈으로 사용하는 작은 금속 조각이에요.',
      'Pul sifatida ishlatiladigan kichik metall bo‘lagi.',
      'A small piece of metal used as money.',
      'Небольшой металлический предмет, используемый как деньги.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['history-of-money'],
  },

  en_s2u6_n2_007_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The Romans ___ jewellery as money.',
    blankAnswers: ['used'],
    options: ['used', 'use', 'using', 'uses'],
    answer: 'used',
    answerTranslation: L(
      'Romans는 보석을 돈으로 사용했어요.',
      'Rimliklar taqinchoqlardan pul sifatida foydalangan.',
      'The Romans used jewellery as money.',
      'Римляне использовали украшения как деньги.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['history-of-money', 'past-simple'],
  },

  en_s2u6_n2_008_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'People ___ different things as money in the past.',
    blankAnswers: ['used'],
    options: ['used', 'use', 'uses', 'using'],
    answer: 'used',
    answerTranslation: L(
      '과거에는 사람들이 여러 가지 물건을 돈으로 사용했어요.',
      'O‘tmishda odamlar turli narsalarni pul sifatida ishlatgan.',
      'People used different things as money in the past.',
      'В прошлом люди использовали разные предметы как деньги.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['history-of-money', 'past-simple'],
  },

  en_s2u6_n2_009_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'They ___ the money carefully.',
    blankAnswers: ['carried'],
    options: ['carried', 'carryed', 'carry', 'carries'],
    answer: 'carried',
    answerTranslation: L(
      '그들은 돈을 조심해서 운반했어요.',
      'Ular pulni ehtiyotkorlik bilan olib yurgan.',
      'They carried the money carefully.',
      'Они осторожно переносили деньги.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['past-simple', 'spelling'],
  },

  en_s2u6_n2_010_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'carry → ___.',
    blankAnswers: ['carried'],
    options: ['carried', 'carryed', 'carryd', 'carrying'],
    answer: 'carried',
    answerTranslation: L(
      'carry의 과거형은 carried예요.',
      'carry ning o‘tgan zamon shakli carried.',
      'Carry becomes carried.',
      'Прошедшая форма carry — carried.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['past-simple', 'spelling'],
  },

  en_s2u6_n2_011_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'love → ___.',
    blankAnswers: ['loved'],
    options: ['loved', 'loveed', 'lovid', 'loving'],
    answer: 'loved',
    answerTranslation: L(
      'love의 과거형은 loved예요.',
      'love ning o‘tgan zamon shakli loved.',
      'Love becomes loved.',
      'Прошедшая форма love — loved.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['past-simple', 'spelling'],
  },

  en_s2u6_n2_012_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'try → ___.',
    blankAnswers: ['tried'],
    options: ['tried', 'tryed', 'tryd', 'trying'],
    answer: 'tried',
    answerTranslation: L(
      'try의 과거형은 tried예요.',
      'try ning o‘tgan zamon shakli tried.',
      'Try becomes tried.',
      'Прошедшая форма try — tried.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['past-simple', 'spelling'],
  },

  en_s2u6_n2_013_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Regular verbs usually form the past with ___.',
    blankAnswers: ['-ed'],
    options: ['-ed', '-ing', '-s', '-er'],
    answer: '-ed',
    answerTranslation: L(
      '규칙동사는 보통 -ed를 붙여 과거형을 만들어요.',
      'Muntazam fe’llar odatda -ed bilan o‘tgan zamon yasaydi.',
      'Regular verbs usually form the past with -ed.',
      'Правильные глаголы обычно образуют прошедшее время с -ed.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['past-simple'],
  },

  en_s2u6_n2_014_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Which is the correct past form of “copy”?',
      },
    ],
    options: ['copied', 'copyed', 'copieded', 'copying'],
    answer: 'copied',
    answerTranslation: L('copied예요.', 'copied.', 'Copied.', 'Copied.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['past-simple', 'spelling'],
  },

  en_s2u6_n2_015_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Which is the correct past form of “close”?',
      },
    ],
    options: ['closed', 'closeed', 'closied', 'closing'],
    answer: 'closed',
    answerTranslation: L('closed예요.', 'closed.', 'Closed.', 'Closed.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['past-simple', 'spelling'],
  },

  en_s2u6_n2_016_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['People', 'used', 'salt', 'as', 'money'],
    answer: 'People used salt as money',
    audioText: 'People used salt as money.',
    answerTranslation: L(
      '사람들은 소금을 돈으로 사용했어요.',
      'Odamlar tuzni pul sifatida ishlatgan.',
      'People used salt as money.',
      'Люди использовали соль как деньги.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['history-of-money'],
  },

  en_s2u6_n2_017_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['The', 'Chinese', 'used', 'coins'],
    answer: 'The Chinese used coins',
    answerTranslation: L(
      '중국인들은 동전을 사용했어요.',
      'Xitoyliklar tangalardan foydalangan.',
      'The Chinese used coins.',
      'Китайцы использовали монеты.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['history-of-money'],
  },

  en_s2u6_n2_018_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'People used different things as money in the past.',
    audioText: 'People used different things as money in the past.',
    answerI18n: L(
      '과거에는 사람들이 여러 가지 물건을 돈으로 사용했어요',
      'O‘tmishda odamlar turli narsalarni pul sifatida ishlatgan',
      'People used different things as money in the past',
      'В прошлом люди использовали разные предметы как деньги',
    ),
    options: [
      'People',
      'used',
      'different',
      'things',
      'as',
      'money',
      'in',
      'the',
      'past.',
    ],
    optionsI18n: {
      ko: [
        '과거에는',
        '사람들이',
        '여러',
        '가지',
        '물건을',
        '돈으로',
        '사용했어요',
      ],
      uz: [
        'O‘tmishda',
        'odamlar',
        'turli',
        'narsalarni',
        'pul',
        'sifatida',
        'ishlatgan',
      ],
      en: [
        'People',
        'used',
        'different',
        'things',
        'as',
        'money',
        'in',
        'the',
        'past.',
      ],
      ru: [
        'В',
        'прошлом',
        'люди',
        'использовали',
        'разные',
        'предметы',
        'как',
        'деньги',
      ],
    },
    answerTranslation: L(
      '과거에는 사람들이 여러 가지 물건을 돈으로 사용했어요.',
      'O‘tmishda odamlar turli narsalarni pul sifatida ishlatgan.',
      'People used different things as money in the past.',
      'В прошлом люди использовали разные предметы как деньги.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['history-of-money'],
  },

  en_s2u6_n2_019_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'In the past, people used coins, jewellery, salt and other objects as money.',
    audioText:
      'In the past, people used coins, jewellery, salt and other objects as money.',
    answerTranslation: L(
      '과거에는 사람들이 동전, 보석, 소금과 다른 물건을 돈으로 사용했어요.',
      'O‘tmishda odamlar tanga, taqinchoq, tuz va boshqa narsalarni pul sifatida ishlatgan.',
      'In the past, people used coins, jewellery, salt and other objects as money.',
      'В прошлом люди использовали монеты, украшения, соль и другие предметы как деньги.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['history-of-money'],
  },

  en_s2u6_n2_020_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Regular verbs usually add -ed in the past, but spelling can change in verbs such as carry and try.',
    audioText:
      'Regular verbs usually add ed in the past, but spelling can change in verbs such as carry and try.',
    answerTranslation: L(
      '규칙동사는 보통 과거형에 -ed를 붙이지만 carry와 try 같은 동사는 철자가 바뀔 수 있어요.',
      'Muntazam fe’llar odatda -ed oladi, lekin carry va try kabi fe’llarda imlo o‘zgaradi.',
      'Regular verbs usually add -ed in the past, but spelling can change in verbs such as carry and try.',
      'Правильные глаголы обычно получают -ed, но написание может меняться, как в carry и try.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['past-simple', 'review'],
  },

  // ===========================================================
  // Lesson 2 · Regular past forms and -ed pronunciation
  // ===========================================================

  en_s2u6_n2_021_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'carry → ___.',
    blankAnswers: ['carried'],
    options: ['carried', 'carryed', 'carryd', 'carries'],
    answer: 'carried',
    answerTranslation: L(
      'carry의 과거형은 carried예요.',
      'carry → carried.',
      'Carry becomes carried.',
      'Carry → carried.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['past-simple'],
  },

  en_s2u6_n2_022_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'close → ___.',
    blankAnswers: ['closed'],
    options: ['closed', 'closeed', 'closied', 'closing'],
    answer: 'closed',
    answerTranslation: L(
      'close의 과거형은 closed예요.',
      'close → closed.',
      'Close becomes closed.',
      'Close → closed.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['past-simple'],
  },

  en_s2u6_n2_023_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'collect → ___.',
    blankAnswers: ['collected'],
    options: ['collected', 'collectted', 'collect', 'collecting'],
    answer: 'collected',
    answerTranslation: L(
      'collect의 과거형은 collected예요.',
      'collect → collected.',
      'Collect becomes collected.',
      'Collect → collected.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['past-simple'],
  },

  en_s2u6_n2_024_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'copy → ___.',
    blankAnswers: ['copied'],
    options: ['copied', 'copyed', 'copyd', 'copying'],
    answer: 'copied',
    answerTranslation: L(
      'copy의 과거형은 copied예요.',
      'copy → copied.',
      'Copy becomes copied.',
      'Copy → copied.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['past-simple'],
  },

  en_s2u6_n2_025_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'earn → ___.',
    blankAnswers: ['earned'],
    options: ['earned', 'earnted', 'earning', 'earns'],
    answer: 'earned',
    answerTranslation: L(
      'earn의 과거형은 earned예요.',
      'earn → earned.',
      'Earn becomes earned.',
      'Earn → earned.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['past-simple'],
  },

  en_s2u6_n2_026_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'enjoy → ___.',
    blankAnswers: ['enjoyed'],
    options: ['enjoyed', 'enjoied', 'enjoyd', 'enjoying'],
    answer: 'enjoyed',
    answerTranslation: L(
      'enjoy의 과거형은 enjoyed예요.',
      'enjoy → enjoyed.',
      'Enjoy becomes enjoyed.',
      'Enjoy → enjoyed.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['past-simple'],
  },

  en_s2u6_n2_027_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'look → ___.',
    blankAnswers: ['looked'],
    options: ['looked', 'lookid', 'lookd', 'looking'],
    answer: 'looked',
    answerTranslation: L(
      'look의 과거형은 looked예요.',
      'look → looked.',
      'Look becomes looked.',
      'Look → looked.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['past-simple'],
  },

  en_s2u6_n2_028_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'love → ___.',
    blankAnswers: ['loved'],
    options: ['loved', 'loveed', 'lovid', 'loving'],
    answer: 'loved',
    answerTranslation: L(
      'love의 과거형은 loved예요.',
      'love → loved.',
      'Love becomes loved.',
      'Love → loved.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['past-simple'],
  },

  en_s2u6_n2_029_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'play → ___.',
    blankAnswers: ['played'],
    options: ['played', 'plaied', 'playd', 'playing'],
    answer: 'played',
    answerTranslation: L(
      'play의 과거형은 played예요.',
      'play → played.',
      'Play becomes played.',
      'Play → played.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['past-simple'],
  },

  en_s2u6_n2_030_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'relax → ___.',
    blankAnswers: ['relaxed'],
    options: ['relaxed', 'relaxt', 'relaxd', 'relaxing'],
    answer: 'relaxed',
    answerTranslation: L(
      'relax의 과거형은 relaxed예요.',
      'relax → relaxed.',
      'Relax becomes relaxed.',
      'Relax → relaxed.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['past-simple'],
  },

  en_s2u6_n2_031_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'return → ___.',
    blankAnswers: ['returned'],
    options: ['returned', 'returnt', 'returnid', 'returning'],
    answer: 'returned',
    answerTranslation: L(
      'return의 과거형은 returned예요.',
      'return → returned.',
      'Return becomes returned.',
      'Return → returned.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['past-simple'],
  },

  en_s2u6_n2_032_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'try → ___.',
    blankAnswers: ['tried'],
    options: ['tried', 'tryed', 'tryd', 'trying'],
    answer: 'tried',
    answerTranslation: L(
      'try의 과거형은 tried예요.',
      'try → tried.',
      'Try becomes tried.',
      'Try → tried.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['past-simple'],
  },

  en_s2u6_n2_033_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Which past form has an /ɪd/ ending?',
      },
    ],
    options: ['started', 'looked', 'loved', 'played'],
    answer: 'started',
    answerTranslation: L('started예요.', 'started.', 'Started.', 'Started.'),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['ed-pronunciation'],
  },

  en_s2u6_n2_034_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Which past form has a /t/ ending?',
      },
    ],
    options: ['looked', 'played', 'needed', 'moved'],
    answer: 'looked',
    answerTranslation: L('looked예요.', 'looked.', 'Looked.', 'Looked.'),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['ed-pronunciation'],
  },

  en_s2u6_n2_035_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Which past form has a /d/ ending?',
      },
    ],
    options: ['played', 'looked', 'wanted', 'visited'],
    answer: 'played',
    answerTranslation: L('played예요.', 'played.', 'Played.', 'Played.'),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['ed-pronunciation'],
  },

  en_s2u6_n2_036_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '-ed 발음을 알맞은 그룹과 연결하세요.',
      '-ed talaffuzini mos guruh bilan bog‘lang.',
      'Match the past forms with their -ed pronunciation.',
      'Соедините формы прошедшего времени с произношением -ed.',
    ),
    pairs: [
      {
        text: 'started',
        native: '/ɪd/',
        nativeI18n: L('/ɪd/', '/ɪd/', '/ɪd/', '/ɪd/'),
      },
      {
        text: 'visited',
        native: '/ɪd/',
        nativeI18n: L('/ɪd/', '/ɪd/', '/ɪd/', '/ɪd/'),
      },
      {
        text: 'looked',
        native: '/t/',
        nativeI18n: L('/t/', '/t/', '/t/', '/t/'),
      },
      {
        text: 'played',
        native: '/d/',
        nativeI18n: L('/d/', '/d/', '/d/', '/d/'),
      },
      {
        text: 'loved',
        native: '/d/',
        nativeI18n: L('/d/', '/d/', '/d/', '/d/'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['ed-pronunciation'],
  },

  en_s2u6_n2_037_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'started, collected, wanted, visited',
    audioText: 'started, collected, wanted, visited',
    answerTranslation: L(
      '/ɪd/ 소리로 끝나는 단어들을 발음해 보세요.',
      '/ɪd/ bilan tugaydigan so‘zlarni talaffuz qiling.',
      'Practise the words with the /ɪd/ ending.',
      'Произнесите слова с окончанием /ɪd/.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['ed-pronunciation'],
  },

  en_s2u6_n2_038_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'looked, worked, watched, finished',
    audioText: 'looked, worked, watched, finished',
    answerTranslation: L(
      '/t/ 소리로 끝나는 단어들을 발음해 보세요.',
      '/t/ bilan tugaydigan so‘zlarni talaffuz qiling.',
      'Practise the words with the /t/ ending.',
      'Произнесите слова с окончанием /t/.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['ed-pronunciation'],
  },

  en_s2u6_n2_039_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'played, loved, moved, received',
    audioText: 'played, loved, moved, received',
    answerTranslation: L(
      '/d/ 소리로 끝나는 단어들을 발음해 보세요.',
      '/d/ bilan tugaydigan so‘zlarni talaffuz qiling.',
      'Practise the words with the /d/ ending.',
      'Произнесите слова с окончанием /d/.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['ed-pronunciation'],
  },

  en_s2u6_n2_040_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The -ed ending can be pronounced /t/, /d/ or /ɪd/.',
    audioText: 'The ed ending can be pronounced t, d or id.',
    answerTranslation: L(
      '-ed 어미는 /t/, /d/, /ɪd/ 세 가지로 발음될 수 있어요.',
      '-ed qo‘shimchasi /t/, /d/ yoki /ɪd/ tarzida talaffuz qilinadi.',
      'The -ed ending can be pronounced /t/, /d/ or /ɪd/.',
      'Окончание -ed может произноситься как /t/, /d/ или /ɪd/.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['ed-pronunciation', 'review'],
  },

  // ===========================================================
  // Lesson 3 · The Story of the Cashpoint
  // ===========================================================

  en_s2u6_n2_041_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'cashpoint',
        native: 'bankomat',
        nativeI18n: L('현금 인출기', 'bankomat', 'cashpoint', 'банкомат'),
      },
      {
        text: 'collect',
        native: 'to‘plamoq',
        nativeI18n: L('모으다', 'to‘plamoq', 'collect', 'собирать'),
      },
      {
        text: 'receive',
        native: 'qabul qilmoq',
        nativeI18n: L('받다', 'qabul qilmoq', 'receive', 'получать'),
      },
      {
        text: 'prepare',
        native: 'tayyorlamoq',
        nativeI18n: L('준비하다', 'tayyorlamoq', 'prepare', 'готовить'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['cashpoint'],
  },

  en_s2u6_n2_042_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'There ___ any cash machines in the 1960s.',
    blankAnswers: ["weren't"],
    options: ["weren't", 'was', 'were', "wasn't"],
    answer: "weren't",
    answerTranslation: L(
      '1960년대에는 현금 인출기가 없었어요.',
      '1960-yillarda bankomatlar yo‘q edi.',
      'There weren’t any cash machines in the 1960s.',
      'В 1960-х годах банкоматов не было.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['cashpoint', 'reading'],
  },

  en_s2u6_n2_043_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'When people wanted money, they usually ___ to the bank.',
    blankAnswers: ['went'],
    options: ['went', 'go', 'goed', 'going'],
    answer: 'went',
    answerTranslation: L(
      '사람들이 돈이 필요하면 보통 은행에 갔어요.',
      'Odamlarga pul kerak bo‘lsa, ular odatda bankka borishardi.',
      'When people wanted money, they usually went to the bank.',
      'Когда людям нужны были деньги, они обычно шли в банк.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['cashpoint', 'reading'],
  },

  en_s2u6_n2_044_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Banks usually ___ early in the afternoon.',
    blankAnswers: ['closed'],
    options: ['closed', 'close', 'closing', 'closes'],
    answer: 'closed',
    answerTranslation: L(
      '은행은 보통 오후 일찍 문을 닫았어요.',
      'Banklar odatda tushdan keyin erta yopilardi.',
      'Banks usually closed early in the afternoon.',
      'Банки обычно закрывались рано днём.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['cashpoint', 'reading'],
  },

  en_s2u6_n2_045_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'John Shepherd-Barron ___ a cash machine.',
    blankAnswers: ['invented'],
    options: ['invented', 'invent', 'inventing', 'invents'],
    answer: 'invented',
    answerTranslation: L(
      'John Shepherd-Barron은 현금 인출기를 발명했어요.',
      'John Shepherd-Barron bankomatni ixtiro qildi.',
      'John Shepherd-Barron invented a cash machine.',
      'Джон Шепард-Баррон изобрёл банкомат.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['cashpoint', 'reading'],
  },

  en_s2u6_n2_046_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'One day, he ___ money from the bank.',
    blankAnswers: ['wanted'],
    options: ['wanted', 'want', 'wants', 'wanting'],
    answer: 'wanted',
    answerTranslation: L(
      '어느 날 그는 은행에서 돈이 필요했어요.',
      'Bir kuni unga bankdan pul kerak bo‘ldi.',
      'One day, he wanted money from the bank.',
      'Однажды ему понадобились деньги из банка.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['cashpoint', 'reading'],
  },

  en_s2u6_n2_047_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'He ___ at the bank too late.',
    blankAnswers: ['arrived'],
    options: ['arrived', 'arrive', 'arrives', 'arriving'],
    answer: 'arrived',
    answerTranslation: L(
      '그는 은행에 너무 늦게 도착했어요.',
      'U bankka juda kech yetib keldi.',
      'He arrived at the bank too late.',
      'Он пришёл в банк слишком поздно.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['cashpoint', 'reading'],
  },

  en_s2u6_n2_048_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The bank ___ already.',
    blankAnswers: ['closed'],
    options: ['closed', 'close', 'closing', 'closes'],
    answer: 'closed',
    answerTranslation: L(
      '은행은 이미 문을 닫았어요.',
      'Bank allaqachon yopilgan edi.',
      'The bank closed already.',
      'Банк уже закрылся.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['cashpoint', 'reading'],
  },

  en_s2u6_n2_049_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'He ___ about a machine that could give people money.',
    blankAnswers: ['thought'],
    options: ['thought', 'thinked', 'think', 'thinking'],
    answer: 'thought',
    answerTranslation: L(
      '그는 사람들에게 돈을 줄 수 있는 기계를 생각했어요.',
      'U odamlarga pul bera oladigan mashina haqida o‘yladi.',
      'He thought about a machine that could give people money.',
      'Он задумался о машине, которая могла бы выдавать людям деньги.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['cashpoint', 'reading'],
  },

  en_s2u6_n2_050_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The first cash machine ___ in London.',
    blankAnswers: ['opened'],
    options: ['opened', 'open', 'opening', 'opens'],
    answer: 'opened',
    answerTranslation: L(
      '첫 현금 인출기는 London에서 문을 열었어요.',
      'Birinchi bankomat Londonda ishga tushdi.',
      'The first cash machine opened in London.',
      'Первый банкомат начал работать в Лондоне.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['cashpoint', 'reading'],
  },

  en_s2u6_n2_051_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Why did people need to go to the bank for cash?',
      },
    ],
    options: [
      'There were no cash machines.',
      'There were no banks.',
      'Money did not exist.',
      'They only used salt.',
    ],
    answer: 'There were no cash machines.',
    answerTranslation: L(
      '현금 인출기가 없었기 때문이에요.',
      'Chunki bankomatlar yo‘q edi.',
      'There were no cash machines.',
      'Потому что банкоматов не было.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['cashpoint', 'reading'],
  },

  en_s2u6_n2_052_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'What problem did John Shepherd-Barron have?',
      },
    ],
    options: [
      'He arrived at the bank after it closed.',
      'He lost his house.',
      'He forgot his name.',
      'He did not like money.',
    ],
    answer: 'He arrived at the bank after it closed.',
    answerTranslation: L(
      '은행이 문을 닫은 뒤에 도착했어요.',
      'U bank yopilgandan keyin yetib kelgan.',
      'He arrived at the bank after it closed.',
      'Он пришёл в банк после его закрытия.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['cashpoint', 'reading'],
  },

  en_s2u6_n2_053_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'What did Shepherd-Barron invent?',
      },
    ],
    options: [
      'A cash machine.',
      'A mobile phone.',
      'A television.',
      'A rice cooker.',
    ],
    answer: 'A cash machine.',
    answerTranslation: L(
      '현금 인출기예요.',
      'Bankomat.',
      'A cash machine.',
      'Банкомат.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['cashpoint', 'reading'],
  },

  en_s2u6_n2_054_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'He ___ the idea after he could not get money from the bank.',
    blankAnswers: ['developed'],
    options: ['developed', 'develop', 'developing', 'develops'],
    answer: 'developed',
    answerTranslation: L(
      '은행에서 돈을 찾지 못한 뒤 그는 그 아이디어를 발전시켰어요.',
      'Bankdan pul ola olmagach, u g‘oyani rivojlantirdi.',
      'He developed the idea after he could not get money from the bank.',
      'Он развил эту идею после того, как не смог получить деньги в банке.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['cashpoint', 'past-simple'],
  },

  en_s2u6_n2_055_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'The new machine ___ people get money outside bank hours.',
    blankAnswers: ['helped'],
    options: ['helped', 'help', 'helps', 'helping'],
    answer: 'helped',
    answerTranslation: L(
      '새 기계는 사람들이 은행 영업시간 외에도 돈을 찾을 수 있게 도와줬어요.',
      'Yangi mashina odamlarga bank ish vaqtidan tashqari ham pul olishga yordam berdi.',
      'The new machine helped people get money outside bank hours.',
      'Новый автомат помог людям получать деньги вне часов работы банка.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['cashpoint', 'past-simple'],
  },

  en_s2u6_n2_056_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['He', 'arrived', 'at', 'the', 'bank', 'too', 'late'],
    answer: 'He arrived at the bank too late',
    audioText: 'He arrived at the bank too late.',
    answerTranslation: L(
      '그는 은행에 너무 늦게 도착했어요.',
      'U bankka juda kech yetib keldi.',
      'He arrived at the bank too late.',
      'Он пришёл в банк слишком поздно.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['cashpoint'],
  },

  en_s2u6_n2_057_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['There', 'were', 'no', 'cash', 'machines'],
    answer: 'There were no cash machines',
    answerTranslation: L(
      '현금 인출기가 없었어요.',
      'Bankomatlar yo‘q edi.',
      'There were no cash machines.',
      'Банкоматов не было.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['cashpoint'],
  },

  en_s2u6_n2_058_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'The first cash machine opened in London.',
    audioText: 'The first cash machine opened in London.',
    answerI18n: L(
      '첫 현금 인출기는 London에서 시작됐어요',
      'Birinchi bankomat Londonda ishga tushdi',
      'The first cash machine opened in London',
      'Первый банкомат начал работать в Лондоне',
    ),
    options: ['The', 'first', 'cash', 'machine', 'opened', 'in', 'London.'],
    optionsI18n: {
      ko: ['첫', '현금', '인출기는', 'London에서', '시작됐어요'],
      uz: ['Birinchi', 'bankomat', 'Londonda', 'ishga', 'tushdi'],
      en: ['The', 'first', 'cash', 'machine', 'opened', 'in', 'London.'],
      ru: ['Первый', 'банкомат', 'начал', 'работать', 'в', 'Лондоне'],
    },
    answerTranslation: L(
      '첫 현금 인출기는 London에서 시작됐어요.',
      'Birinchi bankomat Londonda ishga tushdi.',
      'The first cash machine opened in London.',
      'Первый банкомат начал работать в Лондоне.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['cashpoint'],
  },

  en_s2u6_n2_059_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Before cash machines, people usually went to a bank when they needed cash.',
    audioText:
      'Before cash machines, people usually went to a bank when they needed cash.',
    answerTranslation: L(
      '현금 인출기가 생기기 전에는 현금이 필요할 때 사람들이 보통 은행에 갔어요.',
      'Bankomatlardan oldin odamlar naqd pul kerak bo‘lsa, odatda bankka borishgan.',
      'Before cash machines, people usually went to a bank when they needed cash.',
      'До появления банкоматов люди обычно ходили в банк, когда им нужны были наличные.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['cashpoint', 'reading'],
  },

  en_s2u6_n2_060_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'John Shepherd-Barron developed the idea for a cash machine after he arrived at the bank too late.',
    audioText:
      'John Shepherd-Barron developed the idea for a cash machine after he arrived at the bank too late.',
    answerTranslation: L(
      'John Shepherd-Barron은 은행에 너무 늦게 도착한 경험 뒤 현금 인출기 아이디어를 발전시켰어요.',
      'John Shepherd-Barron bankka juda kech kelganidan keyin bankomat g‘oyasini rivojlantirdi.',
      'John Shepherd-Barron developed the idea for a cash machine after he arrived at the bank too late.',
      'Джон Шепард-Баррон развил идею банкомата после того, как однажды пришёл в банк слишком поздно.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['cashpoint', 'review'],
  },

  // ===========================================================
  // Lesson 4 · Common regular verb collocations
  // ===========================================================

  en_s2u6_n2_061_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '동사와 자연스러운 표현을 연결하세요.',
      'Fe’llarni mos birikmalar bilan bog‘lang.',
      'Match the verbs with the correct collocations.',
      'Соедините глаголы с правильными сочетаниями.',
    ),
    pairs: [
      {
        text: 'prepare',
        native: 'a meal',
        nativeI18n: L(
          '식사를 준비하다',
          'ovqat tayyorlamoq',
          'prepare a meal',
          'приготовить еду',
        ),
      },
      {
        text: 'receive',
        native: 'an email',
        nativeI18n: L(
          '이메일을 받다',
          'elektron xat olmoq',
          'receive an email',
          'получить письмо',
        ),
      },
      {
        text: 'move',
        native: 'house',
        nativeI18n: L('이사하다', 'ko‘chmoq', 'move house', 'переехать'),
      },
      {
        text: 'post',
        native: 'a letter',
        nativeI18n: L(
          '편지를 부치다',
          'xat jo‘natmoq',
          'post a letter',
          'отправить письмо',
        ),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['collocations'],
  },

  en_s2u6_n2_062_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '동사와 자연스러운 표현을 연결하세요.',
      'Fe’llarni mos birikmalar bilan bog‘lang.',
      'Match the verbs with the correct collocations.',
      'Соедините глаголы с правильными сочетаниями.',
    ),
    pairs: [
      {
        text: 'shout',
        native: 'at someone',
        nativeI18n: L(
          '누군가에게 소리치다',
          'birovga baqirmoq',
          'shout at someone',
          'кричать на кого-то',
        ),
      },
      {
        text: 'visit',
        native: 'a relative',
        nativeI18n: L(
          '친척을 방문하다',
          'qarindoshni ko‘rmoq',
          'visit a relative',
          'навестить родственника',
        ),
      },
      {
        text: 'enter',
        native: 'a competition',
        nativeI18n: L(
          '대회에 참가하다',
          'musobaqaga qatnashmoq',
          'enter a competition',
          'принять участие в соревновании',
        ),
      },
      {
        text: 'wait',
        native: 'for a bus',
        nativeI18n: L(
          '버스를 기다리다',
          'avtobus kutmoq',
          'wait for a bus',
          'ждать автобус',
        ),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['collocations'],
  },

  en_s2u6_n2_063_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Yesterday I ___ a meal for my family.',
    blankAnswers: ['prepared'],
    options: ['prepared', 'received', 'waited', 'posted'],
    answer: 'prepared',
    answerTranslation: L(
      '어제 가족을 위해 식사를 준비했어요.',
      'Kecha oilam uchun ovqat tayyorladim.',
      'Yesterday I prepared a meal for my family.',
      'Вчера я приготовил еду для семьи.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['collocations', 'past-simple'],
  },

  en_s2u6_n2_064_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I ___ an email from my friend.',
    blankAnswers: ['received'],
    options: ['received', 'prepared', 'shouted', 'waited'],
    answer: 'received',
    answerTranslation: L(
      '친구에게서 이메일을 받았어요.',
      'Do‘stimdan elektron xat oldim.',
      'I received an email from my friend.',
      'Я получил письмо от друга.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['collocations', 'past-simple'],
  },

  en_s2u6_n2_065_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Last year we ___ house.',
    blankAnswers: ['moved'],
    options: ['moved', 'posted', 'visited', 'received'],
    answer: 'moved',
    answerTranslation: L(
      '우리는 작년에 이사했어요.',
      'Biz o‘tgan yili ko‘chdik.',
      'Last year we moved house.',
      'В прошлом году мы переехали.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['collocations', 'past-simple'],
  },

  en_s2u6_n2_066_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She ___ a letter yesterday.',
    blankAnswers: ['posted'],
    options: ['posted', 'prepared', 'entered', 'waited'],
    answer: 'posted',
    answerTranslation: L(
      '그녀는 어제 편지를 부쳤어요.',
      'U kecha xat jo‘natdi.',
      'She posted a letter yesterday.',
      'Она вчера отправила письмо.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['collocations', 'past-simple'],
  },

  en_s2u6_n2_067_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'He ___ at someone because he was angry.',
    blankAnswers: ['shouted'],
    options: ['shouted', 'prepared', 'received', 'entered'],
    answer: 'shouted',
    answerTranslation: L(
      '그는 화가 나서 누군가에게 소리쳤어요.',
      'U jahli chiqqani uchun birovga baqirdi.',
      'He shouted at someone because he was angry.',
      'Он накричал на кого-то, потому что был зол.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['collocations', 'past-simple'],
  },

  en_s2u6_n2_068_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'We ___ a relative last weekend.',
    blankAnswers: ['visited'],
    options: ['visited', 'waited', 'posted', 'prepared'],
    answer: 'visited',
    answerTranslation: L(
      '지난 주말 친척을 방문했어요.',
      'O‘tgan dam olish kunlari qarindoshimizni ko‘rgani bordik.',
      'We visited a relative last weekend.',
      'В прошлые выходные мы навестили родственника.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['collocations', 'past-simple'],
  },

  en_s2u6_n2_069_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She ___ a competition at school.',
    blankAnswers: ['entered'],
    options: ['entered', 'received', 'prepared', 'moved'],
    answer: 'entered',
    answerTranslation: L(
      '그녀는 학교 대회에 참가했어요.',
      'U maktabdagi musobaqaga qatnashdi.',
      'She entered a competition at school.',
      'Она приняла участие в школьном соревновании.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['collocations', 'past-simple'],
  },

  en_s2u6_n2_070_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I ___ for the bus for a long time.',
    blankAnswers: ['waited'],
    options: ['waited', 'visited', 'posted', 'received'],
    answer: 'waited',
    answerTranslation: L(
      '저는 버스를 오랫동안 기다렸어요.',
      'Men avtobusni uzoq kutdim.',
      'I waited for the bus for a long time.',
      'Я долго ждал автобус.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['collocations', 'past-simple'],
  },

  en_s2u6_n2_071_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'What did you do last night?',
      },
    ],
    options: [
      'I prepared a meal.',
      'I prepare a meal tomorrow.',
      'I am prepared a meal.',
      'I was prepare a meal.',
    ],
    answer: 'I prepared a meal.',
    answerTranslation: L(
      '식사를 준비했어요.',
      'Ovqat tayyorladim.',
      'I prepared a meal.',
      'Я приготовил еду.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['collocations', 'past-simple'],
  },

  en_s2u6_n2_072_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'What happened last week?',
      },
    ],
    options: [
      'I received an email.',
      'I receive an email next week.',
      'I receiving an email.',
      'I was receive an email.',
    ],
    answer: 'I received an email.',
    answerTranslation: L(
      '이메일을 받았어요.',
      'Elektron xat oldim.',
      'I received an email.',
      'Я получил письмо.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['collocations', 'past-simple'],
  },

  en_s2u6_n2_073_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['We', 'visited', 'a', 'relative', 'last', 'weekend'],
    answer: 'We visited a relative last weekend',
    audioText: 'We visited a relative last weekend.',
    answerTranslation: L(
      '우리는 지난 주말 친척을 방문했어요.',
      'Biz o‘tgan dam olish kunlari qarindoshimizni ko‘rgani bordik.',
      'We visited a relative last weekend.',
      'В прошлые выходные мы навестили родственника.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['collocations'],
  },

  en_s2u6_n2_074_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['She', 'entered', 'a', 'competition'],
    answer: 'She entered a competition',
    answerTranslation: L(
      '그녀는 대회에 참가했어요.',
      'U musobaqaga qatnashdi.',
      'She entered a competition.',
      'Она приняла участие в соревновании.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['collocations'],
  },

  en_s2u6_n2_075_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Yesterday I prepared a meal for my family.',
    audioText: 'Yesterday I prepared a meal for my family.',
    answerI18n: L(
      '어제 저는 가족을 위해 식사를 준비했어요',
      'Kecha oilam uchun ovqat tayyorladim',
      'Yesterday I prepared a meal for my family',
      'Вчера я приготовил еду для своей семьи',
    ),
    options: [
      'Yesterday',
      'I',
      'prepared',
      'a',
      'meal',
      'for',
      'my',
      'family.',
    ],
    optionsI18n: {
      ko: ['어제', '저는', '가족을', '위해', '식사를', '준비했어요'],
      uz: ['Kecha', 'oilam', 'uchun', 'ovqat', 'tayyorladim'],
      en: ['Yesterday', 'I', 'prepared', 'a', 'meal', 'for', 'my', 'family.'],
      ru: ['Вчера', 'я', 'приготовил', 'еду', 'для', 'своей', 'семьи'],
    },
    answerTranslation: L(
      '어제 저는 가족을 위해 식사를 준비했어요.',
      'Kecha oilam uchun ovqat tayyorladim.',
      'Yesterday I prepared a meal for my family.',
      'Вчера я приготовил еду для своей семьи.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['collocations'],
  },

  en_s2u6_n2_076_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'You ___ for a bus, but you visit a relative.',
    blankAnswers: ['wait'],
    options: ['wait', 'prepare', 'receive', 'enter'],
    answer: 'wait',
    answerTranslation: L(
      '버스는 기다리고 친척은 방문해요.',
      'Avtobusni kutasiz, qarindoshni esa ko‘rgani borasiz.',
      'You wait for a bus, but you visit a relative.',
      'Автобус ждут, а родственника навещают.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['collocations'],
  },

  en_s2u6_n2_077_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'You ___ an email, but you post a letter.',
    blankAnswers: ['receive'],
    options: ['receive', 'wait', 'move', 'shout'],
    answer: 'receive',
    answerTranslation: L(
      '이메일은 받고 편지는 부쳐요.',
      'Elektron xatni qabul qilasiz, xatni esa jo‘natasiz.',
      'You receive an email, but you post a letter.',
      'Электронное письмо получают, а обычное письмо отправляют.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['collocations'],
  },

  en_s2u6_n2_078_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'You ___ a meal before people eat it.',
    blankAnswers: ['prepare'],
    options: ['prepare', 'receive', 'enter', 'visit'],
    answer: 'prepare',
    answerTranslation: L(
      '사람들이 먹기 전에 식사를 준비해요.',
      'Odamlar yeyishidan oldin ovqat tayyorlaysiz.',
      'You prepare a meal before people eat it.',
      'Еду готовят перед тем, как её едят.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['collocations'],
  },

  en_s2u6_n2_079_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Yesterday I prepared a meal, received an email and waited for a bus.',
    audioText:
      'Yesterday I prepared a meal, received an email and waited for a bus.',
    answerTranslation: L(
      '어제 저는 식사를 준비하고 이메일을 받고 버스를 기다렸어요.',
      'Kecha ovqat tayyorladim, elektron xat oldim va avtobus kutdim.',
      'Yesterday I prepared a meal, received an email and waited for a bus.',
      'Вчера я приготовил еду, получил письмо и ждал автобус.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['collocations', 'past-simple'],
  },

  en_s2u6_n2_080_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'In Unit 6.2, we use regular past simple verbs to tell stories about completed actions and practise common verb collocations.',
    audioText:
      'In Unit 6.2, we use regular past simple verbs to tell stories about completed actions and practise common verb collocations.',
    answerTranslation: L(
      'Unit 6.2에서는 규칙 과거형으로 끝난 행동에 대한 이야기를 하고 자주 쓰는 동사 결합 표현을 연습해요.',
      'Unit 6.2 da tugallangan harakatlar haqida muntazam o‘tgan zamon fe’llari bilan gapirib, keng ishlatiladigan fe’l birikmalarini mashq qilamiz.',
      'In Unit 6.2, we use regular past simple verbs to tell stories about completed actions and practise common verb collocations.',
      'В Unit 6.2 мы используем правильные глаголы в Past Simple для рассказов о завершённых действиях и практикуем устойчивые сочетания.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit6', 'node-review'],
  },
};

// ─────────────────────────────────────────────────────────────
// Node 2
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT6_NODE2 = {
  title: L('이야기', 'Hikoyalar', 'Stories', 'Истории'),
  section: 2,
  unit: 6,
  order: 2,
  isActive: true,

  lessons: [
    {
      title: L(
        '화폐의 역사',
        'Pul tarixi',
        'The History of Money',
        'История денег',
      ),
      description: L(
        '과거에 사용된 다양한 화폐를 살펴보며 regular past simple의 기본 형태와 철자 변화를 익혀요.',
        'O‘tmishda ishlatilgan turli pullarni ko‘rib, regular past simple ning asosiy shakli va imlo o‘zgarishlarini o‘rganasiz.',
        'Learn regular past forms and spelling changes through the History of Money.',
        'Изучаем правильные формы Past Simple и изменения написания через историю денег.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 1,
      questions: [
        'en_s2u6_n2_001_word_matching',
        'en_s2u6_n2_002_fill_in_blank',
        'en_s2u6_n2_003_fill_in_blank',
        'en_s2u6_n2_004_fill_in_blank',
        'en_s2u6_n2_005_fill_in_blank',
        'en_s2u6_n2_006_dialog_complete',
        'en_s2u6_n2_007_fill_in_blank',
        'en_s2u6_n2_008_fill_in_blank',
        'en_s2u6_n2_009_fill_in_blank',
        'en_s2u6_n2_010_fill_in_blank',
        'en_s2u6_n2_011_fill_in_blank',
        'en_s2u6_n2_012_fill_in_blank',
        'en_s2u6_n2_013_fill_in_blank',
        'en_s2u6_n2_014_dialog_complete',
        'en_s2u6_n2_015_dialog_complete',
        'en_s2u6_n2_016_word_arrange',
        'en_s2u6_n2_017_translate_builder',
        'en_s2u6_n2_018_sentence_builder',
        'en_s2u6_n2_019_speaking',
        'en_s2u6_n2_020_speaking',
      ],
    },

    {
      title: L(
        '규칙 과거형과 -ed 발음',
        'Muntazam o‘tgan zamon va -ed talaffuzi',
        'Regular past forms and -ed pronunciation',
        'Правильные формы Past Simple и произношение -ed',
      ),
      description: L(
        'carried, closed, collected, copied, enjoyed, looked, loved, played, returned, tried 등의 과거형과 /t/, /d/, /ɪd/ 발음을 연습해요.',
        'carried, closed, collected, copied, enjoyed, looked, loved, played, returned va tried shakllari hamda /t/, /d/, /ɪd/ talaffuzini mashq qilasiz.',
        'Practise regular past forms and the three pronunciations of -ed.',
        'Практикуем правильные формы прошедшего времени и три варианта произношения -ed.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 2,
      questions: [
        'en_s2u6_n2_021_fill_in_blank',
        'en_s2u6_n2_022_fill_in_blank',
        'en_s2u6_n2_023_fill_in_blank',
        'en_s2u6_n2_024_fill_in_blank',
        'en_s2u6_n2_025_fill_in_blank',
        'en_s2u6_n2_026_fill_in_blank',
        'en_s2u6_n2_027_fill_in_blank',
        'en_s2u6_n2_028_fill_in_blank',
        'en_s2u6_n2_029_fill_in_blank',
        'en_s2u6_n2_030_fill_in_blank',
        'en_s2u6_n2_031_fill_in_blank',
        'en_s2u6_n2_032_fill_in_blank',
        'en_s2u6_n2_033_dialog_complete',
        'en_s2u6_n2_034_dialog_complete',
        'en_s2u6_n2_035_dialog_complete',
        'en_s2u6_n2_036_word_matching',
        'en_s2u6_n2_037_speaking',
        'en_s2u6_n2_038_speaking',
        'en_s2u6_n2_039_speaking',
        'en_s2u6_n2_040_speaking',
      ],
    },

    {
      title: L(
        '현금 인출기의 이야기',
        'Bankomat tarixi',
        'The Story of the Cashpoint',
        'История банкомата',
      ),
      description: L(
        'Workbook의 The Story of the Cashpoint를 읽으며 과거 사건을 regular past simple 중심으로 설명해요.',
        'Workbookdagi The Story of the Cashpoint matni orqali o‘tgan voqealarni past simple bilan tasvirlaysiz.',
        'Read The Story of the Cashpoint and practise talking about past events.',
        'Читаем The Story of the Cashpoint и описываем события прошлого.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 3,
      questions: [
        'en_s2u6_n2_041_word_matching',
        'en_s2u6_n2_042_fill_in_blank',
        'en_s2u6_n2_043_fill_in_blank',
        'en_s2u6_n2_044_fill_in_blank',
        'en_s2u6_n2_045_fill_in_blank',
        'en_s2u6_n2_046_fill_in_blank',
        'en_s2u6_n2_047_fill_in_blank',
        'en_s2u6_n2_048_fill_in_blank',
        'en_s2u6_n2_049_fill_in_blank',
        'en_s2u6_n2_050_fill_in_blank',
        'en_s2u6_n2_051_dialog_complete',
        'en_s2u6_n2_052_dialog_complete',
        'en_s2u6_n2_053_dialog_complete',
        'en_s2u6_n2_054_fill_in_blank',
        'en_s2u6_n2_055_fill_in_blank',
        'en_s2u6_n2_056_word_arrange',
        'en_s2u6_n2_057_translate_builder',
        'en_s2u6_n2_058_sentence_builder',
        'en_s2u6_n2_059_speaking',
        'en_s2u6_n2_060_speaking',
      ],
    },

    {
      title: L(
        '자주 쓰는 동사 결합 표현',
        'Ko‘p ishlatiladigan fe’l birikmalari',
        'Common regular verb collocations',
        'Частые сочетания с правильными глаголами',
      ),
      description: L(
        'prepare a meal, receive an email, move house, post a letter, visit a relative, enter a competition 같은 자주 쓰는 표현을 과거형과 함께 연습해요.',
        'prepare a meal, receive an email, move house, post a letter, visit a relative va enter a competition kabi birikmalarni o‘tgan zamonda mashq qilasiz.',
        'Practise common verb collocations and use them in the regular past simple.',
        'Практикуем частые глагольные сочетания в Past Simple.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 4,
      questions: [
        'en_s2u6_n2_061_word_matching',
        'en_s2u6_n2_062_word_matching',
        'en_s2u6_n2_063_fill_in_blank',
        'en_s2u6_n2_064_fill_in_blank',
        'en_s2u6_n2_065_fill_in_blank',
        'en_s2u6_n2_066_fill_in_blank',
        'en_s2u6_n2_067_fill_in_blank',
        'en_s2u6_n2_068_fill_in_blank',
        'en_s2u6_n2_069_fill_in_blank',
        'en_s2u6_n2_070_fill_in_blank',
        'en_s2u6_n2_071_dialog_complete',
        'en_s2u6_n2_072_dialog_complete',
        'en_s2u6_n2_073_word_arrange',
        'en_s2u6_n2_074_translate_builder',
        'en_s2u6_n2_075_sentence_builder',
        'en_s2u6_n2_076_fill_in_blank',
        'en_s2u6_n2_077_fill_in_blank',
        'en_s2u6_n2_078_fill_in_blank',
        'en_s2u6_n2_079_speaking',
        'en_s2u6_n2_080_speaking',
      ],
    },
  ],
}; // ─────────────────────────────────────────────────────────────
// Section 2 · Unit 6 · Node 3
// 6.3 Vocabulary and skills development
//
// Coverage
// Coursebook:
// - understanding present and past simple verbs
// - regular / irregular past forms
// - Inhotim
// - adverbs of degree
// - a bit / quite / really / very
// - sentence stress
//
// Workbook:
// - adverbs of degree
// - sentence stress
// - past-time expressions review
// - common regular verb collocations review
//
// IMPORTANT:
// *_WORDS에는 단일 headword만 등록.
// "a bit", "a long time", "modern art" 등은
// phrase이므로 WORD 등록하지 않음.
//
// 4 lessons × 20 questions = 80
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT6_NODE3_WORDS = [
  {
    code: 'en-adverb-quite',
    english: 'quite',
    senseKey: 'to-a-fairly-high-degree',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L('꽤; 상당히', 'ancha', 'to a fairly high degree', 'довольно'),
    examples: [
      {
        english: 'The gardens were quite nice.',
        translations: L(
          '정원들은 꽤 좋았어요.',
          'Bog‘lar ancha yaxshi edi.',
          'The gardens were quite nice.',
          'Сады были довольно хорошими.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/kwaɪt/',
      ttsText: 'quite',
    },
    tags: ['degree', 'adverbs', 'unit6'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adverb-really',
    english: 'really',
    senseKey: 'to-a-high-degree',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L(
      '정말; 아주',
      'juda',
      'to a high degree',
      'действительно; очень',
    ),
    examples: [
      {
        english: 'The sculptures were really interesting.',
        translations: L(
          '조각 작품들은 정말 흥미로웠어요.',
          'Haykallar juda qiziqarli edi.',
          'The sculptures were really interesting.',
          'Скульптуры были очень интересными.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈrɪəli/',
      ttsText: 'really',
    },
    tags: ['degree', 'adverbs', 'unit6'],
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
        english: 'You notice something a bit unusual.',
        translations: L(
          '조금 특이한 것을 발견하게 돼요.',
          'Bir oz g‘ayrioddiy narsani sezasiz.',
          'You notice something a bit unusual.',
          'Вы замечаете что-то немного необычное.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ʌnˈjuːʒuəl/',
      ttsText: 'unusual',
    },
    tags: ['inhotim', 'unit6'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-sculpture',
    english: 'sculpture',
    senseKey: 'three-dimensional-work-of-art',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '조각 작품',
      'haykal',
      'a three-dimensional work of art',
      'скульптура',
    ),
    examples: [
      {
        english: 'The sculptures were very interesting.',
        translations: L(
          '조각 작품들은 아주 흥미로웠어요.',
          'Haykallar juda qiziqarli edi.',
          'The sculptures were very interesting.',
          'Скульптуры были очень интересными.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈskʌlptʃə/',
      ttsText: 'sculpture',
    },
    tags: ['art', 'inhotim', 'unit6'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-gallery',
    english: 'gallery',
    senseKey: 'place-where-art-is-shown',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '미술관; 갤러리',
      'galereya',
      'a place where works of art are shown',
      'галерея',
    ),
    examples: [
      {
        english: 'Art galleries can be very interesting.',
        translations: L(
          '미술관은 아주 흥미로울 수 있어요.',
          'San’at galereyalari juda qiziqarli bo‘lishi mumkin.',
          'Art galleries can be very interesting.',
          'Художественные галереи могут быть очень интересными.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈɡæləri/',
      ttsText: 'gallery',
    },
    tags: ['art', 'unit6'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-tourist',
    english: 'tourist',
    senseKey: 'person-visiting-place-for-holiday',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '관광객',
      'sayyoh',
      'a person visiting a place for pleasure',
      'турист',
    ),
    examples: [
      {
        english: 'Inhotim is far from the usual tourist spots.',
        translations: L(
          'Inhotim은 일반적인 관광지에서 멀리 떨어져 있어요.',
          'Inhotim odatiy sayyohlik joylaridan uzoqda.',
          'Inhotim is far from the usual tourist spots.',
          'Инхотим находится далеко от обычных туристических мест.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈtʊərɪst/',
      ttsText: 'tourist',
    },
    tags: ['travel', 'inhotim', 'unit6'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-garden',
    english: 'garden',
    senseKey: 'area-where-plants-and-flowers-grow',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '정원',
      'bog‘',
      'an area where plants and flowers are grown',
      'сад',
    ),
    examples: [
      {
        english: 'The gardens were quite nice.',
        translations: L(
          '정원들은 꽤 좋았어요.',
          'Bog‘lar ancha yaxshi edi.',
          'The gardens were quite nice.',
          'Сады были довольно красивыми.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈɡɑːdən/',
      ttsText: 'garden',
    },
    tags: ['inhotim', 'places', 'unit6'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-modern',
    english: 'modern',
    senseKey: 'relating-to-present-or-recent-times',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '현대의',
      'zamonaviy',
      'relating to the present or recent times',
      'современный',
    ),
    examples: [
      {
        english: 'I think modern art is really interesting.',
        translations: L(
          '저는 현대 미술이 정말 흥미롭다고 생각해요.',
          'Menimcha, zamonaviy san’at juda qiziqarli.',
          'I think modern art is really interesting.',
          'Я думаю, современное искусство очень интересное.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈmɒdən/',
      ttsText: 'modern',
    },
    tags: ['art', 'unit6'],
    difficulty: 1,
    isCore: true,
  },
];

export const EN_S2_UNIT6_NODE3_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Understanding present and past simple verbs
  // ===========================================================

  en_s2u6_n3_001_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Which form is present simple?',
      },
    ],
    options: ['cook', 'cooked', 'carried', 'changed'],
    answer: 'cook',
    answerTranslation: L(
      'cook이 현재형이에요.',
      'cook hozirgi zamon shakli.',
      'Cook is the present simple form.',
      'Cook — форма Present Simple.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-past', 'verb-forms'],
  },

  en_s2u6_n3_002_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Which form is past simple?',
      },
    ],
    options: ['cooked', 'cook', 'cooks', 'cooking'],
    answer: 'cooked',
    answerTranslation: L(
      'cooked가 과거형이에요.',
      'cooked o‘tgan zamon shakli.',
      'Cooked is the past simple form.',
      'Cooked — форма Past Simple.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-past', 'verb-forms'],
  },

  en_s2u6_n3_003_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I always ___ every day.',
    blankAnswers: ['work'],
    options: ['work', 'worked', 'working', 'works'],
    answer: 'work',
    answerTranslation: L(
      '저는 매일 항상 일해요.',
      'Men har kuni ishlayman.',
      'I always work every day.',
      'Я работаю каждый день.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple'],
  },

  en_s2u6_n3_004_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I ___ house in 2012.',
    blankAnswers: ['moved'],
    options: ['moved', 'move', 'moves', 'moving'],
    answer: 'moved',
    answerTranslation: L(
      '저는 2012년에 이사했어요.',
      'Men 2012-yilda ko‘chdim.',
      'I moved house in 2012.',
      'Я переехал в 2012 году.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['past-simple'],
  },

  en_s2u6_n3_005_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Regular past simple verbs usually end in ___.',
    blankAnswers: ['-ed'],
    options: ['-ed', '-ing', '-s', '-er'],
    answer: '-ed',
    answerTranslation: L(
      '규칙 과거동사는 보통 -ed로 끝나요.',
      'Muntazam o‘tgan zamon fe’llari odatda -ed bilan tugaydi.',
      'Regular past simple verbs usually end in -ed.',
      'Правильные глаголы в Past Simple обычно заканчиваются на -ed.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['past-simple'],
  },

  en_s2u6_n3_006_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Irregular past verbs do not always end in ___.',
    blankAnswers: ['-ed'],
    options: ['-ed', '-ing', '-ly', '-er'],
    answer: '-ed',
    answerTranslation: L(
      '불규칙 과거동사는 항상 -ed로 끝나지 않아요.',
      'Noto‘g‘ri fe’llarning o‘tgan zamon shakli har doim -ed bilan tugamaydi.',
      'Irregular past verbs do not always end in -ed.',
      'Неправильные глаголы в прошедшем времени не всегда заканчиваются на -ed.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['past-simple', 'irregular'],
  },

  en_s2u6_n3_007_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '현재형과 과거형을 연결하세요.',
      'Hozirgi va o‘tgan zamon shakllarini moslang.',
      'Match the present and past forms.',
      'Соедините формы настоящего и прошедшего времени.',
    ),
    pairs: [
      {
        text: 'cook',
        native: 'cooked',
        nativeI18n: L('cooked', 'cooked', 'cooked', 'cooked'),
      },
      {
        text: 'carry',
        native: 'carried',
        nativeI18n: L('carried', 'carried', 'carried', 'carried'),
      },
      {
        text: 'change',
        native: 'changed',
        nativeI18n: L('changed', 'changed', 'changed', 'changed'),
      },
      {
        text: 'help',
        native: 'helped',
        nativeI18n: L('helped', 'helped', 'helped', 'helped'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['present-past'],
  },

  en_s2u6_n3_008_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '현재형과 과거형을 연결하세요.',
      'Hozirgi va o‘tgan zamon shakllarini moslang.',
      'Match the present and past forms.',
      'Соедините формы настоящего и прошедшего времени.',
    ),
    pairs: [
      {
        text: 'wait',
        native: 'waited',
        nativeI18n: L('waited', 'waited', 'waited', 'waited'),
      },
      {
        text: 'listen',
        native: 'listened',
        nativeI18n: L('listened', 'listened', 'listened', 'listened'),
      },
      {
        text: 'dance',
        native: 'danced',
        nativeI18n: L('danced', 'danced', 'danced', 'danced'),
      },
      {
        text: 'enjoy',
        native: 'enjoyed',
        nativeI18n: L('enjoyed', 'enjoyed', 'enjoyed', 'enjoyed'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['present-past'],
  },

  en_s2u6_n3_009_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Yesterday I ___ for the bus.',
    blankAnswers: ['waited'],
    options: ['waited', 'wait', 'waits', 'waiting'],
    answer: 'waited',
    answerTranslation: L(
      '어제 저는 버스를 기다렸어요.',
      'Kecha avtobus kutdim.',
      'Yesterday I waited for the bus.',
      'Вчера я ждал автобус.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['past-simple'],
  },

  en_s2u6_n3_010_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Every day I ___ to music.',
    blankAnswers: ['listen'],
    options: ['listen', 'listened', 'listens', 'listening'],
    answer: 'listen',
    answerTranslation: L(
      '저는 매일 음악을 들어요.',
      'Men har kuni musiqa tinglayman.',
      'Every day I listen to music.',
      'Я каждый день слушаю музыку.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple'],
  },

  en_s2u6_n3_011_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Last night we ___ the film.',
    blankAnswers: ['enjoyed'],
    options: ['enjoyed', 'enjoy', 'enjoys', 'enjoying'],
    answer: 'enjoyed',
    answerTranslation: L(
      '어젯밤 우리는 영화를 재미있게 봤어요.',
      'Kecha kechqurun film bizga yoqdi.',
      'Last night we enjoyed the film.',
      'Прошлой ночью нам понравился фильм.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['past-simple'],
  },

  en_s2u6_n3_012_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She usually ___ her family.',
    blankAnswers: ['helps'],
    options: ['helps', 'helped', 'help', 'helping'],
    answer: 'helps',
    answerTranslation: L(
      '그녀는 보통 가족을 도와줘요.',
      'U odatda oilasiga yordam beradi.',
      'She usually helps her family.',
      'Она обычно помогает своей семье.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple'],
  },

  en_s2u6_n3_013_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She ___ her family yesterday.',
    blankAnswers: ['helped'],
    options: ['helped', 'helps', 'help', 'helping'],
    answer: 'helped',
    answerTranslation: L(
      '그녀는 어제 가족을 도와줬어요.',
      'U kecha oilasiga yordam berdi.',
      'She helped her family yesterday.',
      'Она вчера помогла своей семье.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['past-simple'],
  },

  en_s2u6_n3_014_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Which expression usually tells us a sentence is in the past?',
      },
    ],
    options: ['last week', 'every day', 'usually', 'every morning'],
    answer: 'last week',
    answerTranslation: L(
      'last week가 과거를 나타내요.',
      'last week o‘tgan zamonni bildiradi.',
      'Last week usually tells us the sentence is about the past.',
      'Last week обычно указывает на прошлое.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['present-past', 'time-expressions'],
  },

  en_s2u6_n3_015_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Which expression usually goes with the present simple?',
      },
    ],
    options: ['every day', 'three days ago', 'last week', 'in 2006'],
    answer: 'every day',
    answerTranslation: L(
      'every day는 보통 현재시제와 함께 사용해요.',
      'every day odatda present simple bilan ishlatiladi.',
      'Every day usually goes with the present simple.',
      'Every day обычно употребляется с Present Simple.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['present-past', 'time-expressions'],
  },

  en_s2u6_n3_016_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['I', 'moved', 'house', 'in', '2012'],
    answer: 'I moved house in 2012',
    audioText: 'I moved house in 2012.',
    answerTranslation: L(
      '저는 2012년에 이사했어요.',
      'Men 2012-yilda ko‘chdim.',
      'I moved house in 2012.',
      'Я переехал в 2012 году.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['past-simple'],
  },

  en_s2u6_n3_017_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['I', 'work', 'every', 'day'],
    answer: 'I work every day',
    answerTranslation: L(
      '저는 매일 일해요.',
      'Men har kuni ishlayman.',
      'I work every day.',
      'Я работаю каждый день.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['present-simple'],
  },

  en_s2u6_n3_018_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'We visited the museum last week.',
    audioText: 'We visited the museum last week.',
    answerI18n: L(
      '우리는 지난주에 박물관을 방문했어요',
      'Biz o‘tgan hafta muzeyga bordik',
      'We visited the museum last week',
      'Мы посетили музей на прошлой неделе',
    ),
    options: ['We', 'visited', 'the', 'museum', 'last', 'week.'],
    optionsI18n: {
      ko: ['우리는', '지난주에', '박물관을', '방문했어요'],
      uz: ['Biz', 'o‘tgan', 'hafta', 'muzeyga', 'bordik'],
      en: ['We', 'visited', 'the', 'museum', 'last', 'week.'],
      ru: ['Мы', 'посетили', 'музей', 'на', 'прошлой', 'неделе'],
    },
    answerTranslation: L(
      '우리는 지난주에 박물관을 방문했어요.',
      'Biz o‘tgan hafta muzeyga bordik.',
      'We visited the museum last week.',
      'Мы посетили музей на прошлой неделе.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['past-simple'],
  },

  en_s2u6_n3_019_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Present simple verbs describe regular or repeated actions, while past simple verbs describe finished actions in the past.',
    audioText:
      'Present simple verbs describe regular or repeated actions, while past simple verbs describe finished actions in the past.',
    answerTranslation: L(
      '현재시제는 규칙적이거나 반복되는 행동을 나타내고 과거시제는 과거에 끝난 행동을 나타내요.',
      'Present simple muntazam yoki takroriy harakatlarni, past simple esa o‘tmishda tugagan harakatlarni bildiradi.',
      'Present simple verbs describe regular or repeated actions, while past simple verbs describe finished actions in the past.',
      'Present Simple описывает регулярные действия, а Past Simple — завершённые действия в прошлом.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['present-past', 'review'],
  },

  en_s2u6_n3_020_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Time expressions such as every day and last week can help us identify present and past simple sentences.',
    audioText:
      'Time expressions such as every day and last week can help us identify present and past simple sentences.',
    answerTranslation: L(
      'every day와 last week 같은 시간 표현은 현재시제와 과거시제를 구별하는 데 도움이 돼요.',
      'every day va last week kabi vaqt iboralari present va past simple ni ajratishga yordam beradi.',
      'Time expressions such as every day and last week can help us identify present and past simple sentences.',
      'Выражения времени вроде every day и last week помогают различать Present и Past Simple.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['present-past', 'review'],
  },

  // ===========================================================
  // Lesson 2 · Inhotim and adverbs of degree
  // ===========================================================

  en_s2u6_n3_021_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'sculpture',
        native: 'haykal',
        nativeI18n: L('조각 작품', 'haykal', 'sculpture', 'скульптура'),
      },
      {
        text: 'gallery',
        native: 'galereya',
        nativeI18n: L('미술관', 'galereya', 'gallery', 'галерея'),
      },
      {
        text: 'garden',
        native: 'bog‘',
        nativeI18n: L('정원', 'bog‘', 'garden', 'сад'),
      },
      {
        text: 'tourist',
        native: 'sayyoh',
        nativeI18n: L('관광객', 'sayyoh', 'tourist', 'турист'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['inhotim'],
  },

  en_s2u6_n3_022_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'As you get closer, you notice something ___ unusual.',
    blankAnswers: ['a bit'],
    options: ['a bit', 'very much', 'many', 'ago'],
    answer: 'a bit',
    answerTranslation: L(
      '가까이 가면 조금 특이한 것을 발견하게 돼요.',
      'Yaqinlashganingizda bir oz g‘ayrioddiy narsani sezasiz.',
      'As you get closer, you notice something a bit unusual.',
      'Когда вы подходите ближе, вы замечаете что-то немного необычное.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['degree-adverbs', 'inhotim'],
  },

  en_s2u6_n3_023_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'Inhotim is ___ far from the usual tourist spots of Brazil.',
    blankAnswers: ['quite'],
    options: ['quite', 'ago', 'last', 'many'],
    answer: 'quite',
    answerTranslation: L(
      'Inhotim은 Brazil의 일반적인 관광지에서 꽤 멀리 떨어져 있어요.',
      'Inhotim Braziliyadagi odatiy sayyohlik joylaridan ancha uzoqda.',
      'Inhotim is quite far from the usual tourist spots of Brazil.',
      'Инхотим находится довольно далеко от обычных туристических мест Бразилии.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['degree-adverbs', 'inhotim'],
  },

  en_s2u6_n3_024_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'It is ___ important for the local area.',
    blankAnswers: ['really'],
    options: ['really', 'ago', 'last', 'a few'],
    answer: 'really',
    answerTranslation: L(
      '그곳은 지역에 정말 중요해요.',
      'U mahalliy hudud uchun juda muhim.',
      'It is really important for the local area.',
      'Это действительно важно для местного района.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['degree-adverbs', 'inhotim'],
  },

  en_s2u6_n3_025_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The sculptures were ___ interesting.',
    blankAnswers: ['very'],
    options: ['very', 'ago', 'last', 'much'],
    answer: 'very',
    answerTranslation: L(
      '조각 작품들은 아주 흥미로웠어요.',
      'Haykallar juda qiziqarli edi.',
      'The sculptures were very interesting.',
      'Скульптуры были очень интересными.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['degree-adverbs'],
  },

  en_s2u6_n3_026_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The gardens were ___ nice.',
    blankAnswers: ['quite'],
    options: ['quite', 'ago', 'last', 'in'],
    answer: 'quite',
    answerTranslation: L(
      '정원들은 꽤 좋았어요.',
      'Bog‘lar ancha yaxshi edi.',
      'The gardens were quite nice.',
      'Сады были довольно хорошими.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['degree-adverbs'],
  },

  en_s2u6_n3_027_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The journey was ___ long.',
    blankAnswers: ['really'],
    options: ['really', 'ago', 'last', 'few'],
    answer: 'really',
    answerTranslation: L(
      '여정이 정말 길었어요.',
      'Safar juda uzoq edi.',
      'The journey was really long.',
      'Поездка была очень долгой.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['degree-adverbs'],
  },

  en_s2u6_n3_028_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I thought one sculpture was ___ boring.',
    blankAnswers: ['a bit'],
    options: ['a bit', 'very much', 'ago', 'last'],
    answer: 'a bit',
    answerTranslation: L(
      '저는 한 조각 작품이 조금 지루하다고 생각했어요.',
      'Men bir haykalni bir oz zerikarli deb o‘yladim.',
      'I thought one sculpture was a bit boring.',
      'Я подумал, что одна скульптура была немного скучной.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['degree-adverbs'],
  },

  en_s2u6_n3_029_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Which phrase makes an adjective slightly stronger?',
      },
    ],
    options: ['a bit', 'last year', 'three days ago', 'in 2012'],
    answer: 'a bit',
    answerTranslation: L('a bit이에요.', 'a bit.', 'A bit.', 'A bit.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['degree-adverbs'],
  },

  en_s2u6_n3_030_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Which adverb means “to a fairly high degree”?',
      },
    ],
    options: ['quite', 'ago', 'last', 'in'],
    answer: 'quite',
    answerTranslation: L('quite예요.', 'quite.', 'Quite.', 'Quite.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['degree-adverbs'],
  },

  en_s2u6_n3_031_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Which adverb makes “interesting” very strong?',
      },
    ],
    options: ['really', 'ago', 'last', 'in'],
    answer: 'really',
    answerTranslation: L('really예요.', 'really.', 'Really.', 'Really.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['degree-adverbs'],
  },

  en_s2u6_n3_032_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Modern art is ___ interesting.',
    blankAnswers: ['really'],
    options: ['really', 'ago', 'last', 'in'],
    answer: 'really',
    answerTranslation: L(
      '현대 미술은 정말 흥미로워요.',
      'Zamonaviy san’at juda qiziqarli.',
      'Modern art is really interesting.',
      'Современное искусство очень интересное.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['degree-adverbs', 'art'],
  },

  en_s2u6_n3_033_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Modern art is ___ boring.',
    blankAnswers: ['a bit'],
    options: ['a bit', 'ago', 'last', 'in'],
    answer: 'a bit',
    answerTranslation: L(
      '현대 미술은 조금 지루해요.',
      'Zamonaviy san’at bir oz zerikarli.',
      'Modern art is a bit boring.',
      'Современное искусство немного скучное.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['degree-adverbs', 'art'],
  },

  en_s2u6_n3_034_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Clothes in this country are ___ expensive.',
    blankAnswers: ['very'],
    options: ['very', 'ago', 'last', 'in'],
    answer: 'very',
    answerTranslation: L(
      '이 나라의 옷은 아주 비싸요.',
      'Bu mamlakatdagi kiyimlar juda qimmat.',
      'Clothes in this country are very expensive.',
      'Одежда в этой стране очень дорогая.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['degree-adverbs'],
  },

  en_s2u6_n3_035_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The classroom is ___ cold today.',
    blankAnswers: ['quite'],
    options: ['quite', 'ago', 'last', 'in'],
    answer: 'quite',
    answerTranslation: L(
      '오늘 교실이 꽤 추워요.',
      'Bugun sinfxona ancha sovuq.',
      'The classroom is quite cold today.',
      'Сегодня в классе довольно холодно.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['degree-adverbs'],
  },

  en_s2u6_n3_036_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['The', 'gardens', 'were', 'quite', 'nice'],
    answer: 'The gardens were quite nice',
    audioText: 'The gardens were quite nice.',
    answerTranslation: L(
      '정원들은 꽤 좋았어요.',
      'Bog‘lar ancha yaxshi edi.',
      'The gardens were quite nice.',
      'Сады были довольно хорошими.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['degree-adverbs'],
  },

  en_s2u6_n3_037_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['The', 'journey', 'was', 'really', 'long'],
    answer: 'The journey was really long',
    answerTranslation: L(
      '여정이 정말 길었어요.',
      'Safar juda uzoq edi.',
      'The journey was really long.',
      'Поездка была очень долгой.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['degree-adverbs'],
  },

  en_s2u6_n3_038_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'It is really important for the local area.',
    audioText: 'It is really important for the local area.',
    answerI18n: L(
      '그곳은 지역에 정말 중요해요',
      'U mahalliy hudud uchun juda muhim',
      'It is really important for the local area',
      'Это действительно важно для местного района',
    ),
    options: [
      'It',
      'is',
      'really',
      'important',
      'for',
      'the',
      'local',
      'area.',
    ],
    optionsI18n: {
      ko: ['그곳은', '지역에', '정말', '중요해요'],
      uz: ['U', 'mahalliy', 'hudud', 'uchun', 'juda', 'muhim'],
      en: ['It', 'is', 'really', 'important', 'for', 'the', 'local', 'area.'],
      ru: ['Это', 'действительно', 'важно', 'для', 'местного', 'района'],
    },
    answerTranslation: L(
      '그곳은 지역에 정말 중요해요.',
      'U mahalliy hudud uchun juda muhim.',
      'It is really important for the local area.',
      'Это действительно важно для местного района.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['inhotim', 'degree-adverbs'],
  },

  en_s2u6_n3_039_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'We can use a bit, quite, really and very before adjectives to show degree.',
    audioText:
      'We can use a bit, quite, really and very before adjectives to show degree.',
    answerTranslation: L(
      '형용사 앞에 a bit, quite, really, very를 사용해 정도를 나타낼 수 있어요.',
      'Sifat oldidan a bit, quite, really va very ishlatib darajani ko‘rsatish mumkin.',
      'We can use a bit, quite, really and very before adjectives to show degree.',
      'Перед прилагательными можно использовать a bit, quite, really и very, чтобы показать степень.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['degree-adverbs', 'review'],
  },

  en_s2u6_n3_040_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Inhotim has sculptures and gardens, and visitors can describe them with adverbs of degree.',
    audioText:
      'Inhotim has sculptures and gardens, and visitors can describe them with adverbs of degree.',
    answerTranslation: L(
      'Inhotim에는 조각 작품과 정원이 있고 방문객들은 강도 부사를 사용해 그것들을 설명할 수 있어요.',
      'Inhotimda haykallar va bog‘lar bor, tashrif buyuruvchilar ularni daraja ravishlari bilan tasvirlashi mumkin.',
      'Inhotim has sculptures and gardens, and visitors can describe them with adverbs of degree.',
      'В Инхотиме есть скульптуры и сады, которые можно описывать с помощью наречий степени.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['inhotim', 'review'],
  },

  // ===========================================================
  // Lesson 3 · Adverbs of degree
  // ===========================================================

  en_s2u6_n3_041_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'There are a lot of buildings in the city. There are ___ a lot of very old buildings.',
    blankAnswers: ['quite'],
    options: ['quite', 'ago', 'last', 'in'],
    answer: 'quite',
    answerTranslation: L(
      '도시에는 꽤 많은 아주 오래된 건물이 있어요.',
      'Shaharda ancha ko‘p juda eski binolar bor.',
      'There are quite a lot of very old buildings in the city.',
      'В городе довольно много очень старых зданий.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['degree-adverbs', 'workbook'],
  },

  en_s2u6_n3_042_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'It is common to see tourists in my town. It is ___ common.',
    blankAnswers: ['quite'],
    options: ['quite', 'ago', 'last', 'in'],
    answer: 'quite',
    answerTranslation: L(
      '제 도시에서는 관광객을 보는 것이 꽤 흔해요.',
      'Mening shahrimda sayyohlarni ko‘rish ancha odatiy.',
      'It is quite common to see tourists in my town.',
      'В моём городе довольно часто можно увидеть туристов.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['degree-adverbs', 'workbook'],
  },

  en_s2u6_n3_043_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'The place we visited was interesting. It was ___ interesting.',
    blankAnswers: ['really'],
    options: ['really', 'ago', 'last', 'in'],
    answer: 'really',
    answerTranslation: L(
      '우리가 방문한 곳은 정말 흥미로웠어요.',
      'Biz borgan joy juda qiziqarli edi.',
      'The place we visited was really interesting.',
      'Место, которое мы посетили, было очень интересным.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['degree-adverbs', 'workbook'],
  },

  en_s2u6_n3_044_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The tour guide’s talk was ___ boring.',
    blankAnswers: ['a bit'],
    options: ['a bit', 'ago', 'last', 'in'],
    answer: 'a bit',
    answerTranslation: L(
      '가이드의 설명은 조금 지루했어요.',
      'Gidning suhbati bir oz zerikarli edi.',
      'The tour guide’s talk was a bit boring.',
      'Рассказ гида был немного скучным.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['degree-adverbs', 'workbook'],
  },

  en_s2u6_n3_045_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The people in the hotel were ___ unfriendly.',
    blankAnswers: ['very'],
    options: ['very', 'ago', 'last', 'in'],
    answer: 'very',
    answerTranslation: L(
      '호텔 사람들은 아주 불친절했어요.',
      'Mehmonxonadagi odamlar juda sovuq muomala qildi.',
      'The people in the hotel were very unfriendly.',
      'Люди в отеле были очень недружелюбными.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['degree-adverbs', 'workbook'],
  },

  en_s2u6_n3_046_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The seats on the bus were ___ uncomfortable.',
    blankAnswers: ['a bit'],
    options: ['a bit', 'ago', 'last', 'in'],
    answer: 'a bit',
    answerTranslation: L(
      '버스 좌석은 조금 불편했어요.',
      'Avtobus o‘rindiqlari bir oz noqulay edi.',
      'The seats on the bus were a bit uncomfortable.',
      'Сиденья в автобусе были немного неудобными.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['degree-adverbs', 'workbook'],
  },

  en_s2u6_n3_047_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'It is ___ cold here in winter.',
    blankAnswers: ['really'],
    options: ['really', 'ago', 'last', 'in'],
    answer: 'really',
    answerTranslation: L(
      '여기는 겨울에 정말 추워요.',
      'Bu yer qishda juda sovuq.',
      'It is really cold here in winter.',
      'Зимой здесь очень холодно.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['degree-adverbs', 'workbook'],
  },

  en_s2u6_n3_048_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'It is expensive to have a holiday in England. It is ___ expensive.',
    blankAnswers: ['quite'],
    options: ['quite', 'ago', 'last', 'in'],
    answer: 'quite',
    answerTranslation: L(
      'England에서 휴가를 보내는 것은 꽤 비싸요.',
      'Angliyada ta’til qilish ancha qimmat.',
      'It is quite expensive to have a holiday in England.',
      'Отдых в Англии довольно дорогой.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['degree-adverbs', 'workbook'],
  },

  en_s2u6_n3_049_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The museum was ___ boring, but it was OK.',
    blankAnswers: ['a bit'],
    options: ['a bit', 'very', 'really', 'ago'],
    answer: 'a bit',
    answerTranslation: L(
      '박물관이 조금 지루했지만 괜찮았어요.',
      'Muzey bir oz zerikarli edi, lekin yomon emasdi.',
      'The museum was a bit boring, but it was OK.',
      'Музей был немного скучным, но в целом нормальным.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['degree-adverbs'],
  },

  en_s2u6_n3_050_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'His French is ___ good, but he does not understand everything.',
    blankAnswers: ['quite'],
    options: ['quite', 'very', 'ago', 'last'],
    answer: 'quite',
    answerTranslation: L(
      '그의 프랑스어는 꽤 좋지만 모든 것을 이해하지는 못해요.',
      'Uning fransuz tili ancha yaxshi, lekin hamma narsani tushunmaydi.',
      'His French is quite good, but he does not understand everything.',
      'Его французский довольно хороший, но он понимает не всё.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['degree-adverbs'],
  },

  en_s2u6_n3_051_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I think tourism is ___ important for our town.',
    blankAnswers: ['really'],
    options: ['really', 'ago', 'last', 'in'],
    answer: 'really',
    answerTranslation: L(
      '저는 관광이 우리 도시에 정말 중요하다고 생각해요.',
      'Menimcha, turizm shahrimiz uchun juda muhim.',
      'I think tourism is really important for our town.',
      'Я думаю, туризм очень важен для нашего города.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['degree-adverbs'],
  },

  en_s2u6_n3_052_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Steve Jobs was a ___ successful businessman.',
    blankAnswers: ['very'],
    options: ['very', 'ago', 'last', 'in'],
    answer: 'very',
    answerTranslation: L(
      'Steve Jobs는 매우 성공한 사업가였어요.',
      'Steve Jobs juda muvaffaqiyatli biznesmen edi.',
      'Steve Jobs was a very successful businessman.',
      'Стив Джобс был очень успешным бизнесменом.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['degree-adverbs'],
  },

  en_s2u6_n3_053_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The tickets were ___ cheap.',
    blankAnswers: ['quite'],
    options: ['quite', 'ago', 'last', 'in'],
    answer: 'quite',
    answerTranslation: L(
      '표는 꽤 저렴했어요.',
      'Chiptalar ancha arzon edi.',
      'The tickets were quite cheap.',
      'Билеты были довольно дешёвыми.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['degree-adverbs'],
  },

  en_s2u6_n3_054_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Which is stronger?',
      },
    ],
    options: [
      'very cold',
      'a bit cold',
      'both are exactly the same',
      'ago cold',
    ],
    answer: 'very cold',
    answerTranslation: L(
      'very cold가 더 강해요.',
      'very cold kuchliroq.',
      'Very cold is stronger.',
      'Very cold выражает более сильную степень.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['degree-adverbs'],
  },

  en_s2u6_n3_055_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Which phrase expresses only a small degree?',
      },
    ],
    options: [
      'a bit boring',
      'very boring',
      'really boring',
      'extremely boring',
    ],
    answer: 'a bit boring',
    answerTranslation: L(
      'a bit boring이에요.',
      'a bit boring.',
      'A bit boring.',
      'A bit boring.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['degree-adverbs'],
  },

  en_s2u6_n3_056_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['She', 'is', 'really', 'friendly'],
    answer: 'She is really friendly',
    audioText: 'She is really friendly.',
    answerTranslation: L(
      '그녀는 정말 친절해요.',
      'U juda do‘stona.',
      'She is really friendly.',
      'Она очень дружелюбная.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['degree-adverbs', 'workbook'],
  },

  en_s2u6_n3_057_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['Those', 'bags', 'are', 'quite', 'cheap'],
    answer: 'Those bags are quite cheap',
    answerTranslation: L(
      '저 가방들은 꽤 저렴해요.',
      'U sumkalar ancha arzon.',
      'Those bags are quite cheap.',
      'Те сумки довольно дешёвые.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['degree-adverbs', 'workbook'],
  },

  en_s2u6_n3_058_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'This is a very interesting article.',
    audioText: 'This is a very interesting article.',
    answerI18n: L(
      '이것은 아주 흥미로운 기사예요',
      'Bu juda qiziqarli maqola',
      'This is a very interesting article',
      'Это очень интересная статья',
    ),
    options: ['This', 'is', 'a', 'very', 'interesting', 'article.'],
    optionsI18n: {
      ko: ['이것은', '아주', '흥미로운', '기사예요'],
      uz: ['Bu', 'juda', 'qiziqarli', 'maqola'],
      en: ['This', 'is', 'a', 'very', 'interesting', 'article.'],
      ru: ['Это', 'очень', 'интересная', 'статья'],
    },
    answerTranslation: L(
      '이것은 아주 흥미로운 기사예요.',
      'Bu juda qiziqarli maqola.',
      'This is a very interesting article.',
      'Это очень интересная статья.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['degree-adverbs', 'workbook'],
  },

  en_s2u6_n3_059_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'The museum was a bit boring, but the gardens were quite nice and the sculptures were really interesting.',
    audioText:
      'The museum was a bit boring, but the gardens were quite nice and the sculptures were really interesting.',
    answerTranslation: L(
      '박물관은 조금 지루했지만 정원은 꽤 좋았고 조각 작품은 정말 흥미로웠어요.',
      'Muzey bir oz zerikarli edi, lekin bog‘lar ancha yaxshi, haykallar esa juda qiziqarli edi.',
      'The museum was a bit boring, but the gardens were quite nice and the sculptures were really interesting.',
      'Музей был немного скучным, но сады были довольно хорошими, а скульптуры — очень интересными.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['degree-adverbs', 'review'],
  },

  en_s2u6_n3_060_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'A bit expresses a small degree, while quite, really and very can make an adjective stronger.',
    audioText:
      'A bit expresses a small degree, while quite, really and very can make an adjective stronger.',
    answerTranslation: L(
      'a bit은 약한 정도를 나타내고 quite, really, very는 형용사의 정도를 더 강하게 만들 수 있어요.',
      'a bit kichik darajani, quite, really va very esa sifatni kuchliroq ifodalaydi.',
      'A bit expresses a small degree, while quite, really and very can make an adjective stronger.',
      'A bit выражает небольшую степень, а quite, really и very усиливают прилагательное.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['degree-adverbs', 'review'],
  },

  // ===========================================================
  // Lesson 4 · Vocabulary review
  // ===========================================================

  en_s2u6_n3_061_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '과거 시간 표현을 분류하세요.',
      'O‘tgan zamon vaqt iboralarini moslang.',
      'Match the past time expressions.',
      'Соедините выражения прошедшего времени.',
    ),
    pairs: [
      {
        text: '1974',
        native: 'in',
        nativeI18n: L('in', 'in', 'in', 'in'),
      },
      {
        text: 'last night',
        native: 'last',
        nativeI18n: L('last', 'last', 'last', 'last'),
      },
      {
        text: 'three months ago',
        native: 'ago',
        nativeI18n: L('ago', 'ago', 'ago', 'ago'),
      },
      {
        text: 'the sixteenth century',
        native: 'in',
        nativeI18n: L('in', 'in', 'in', 'in'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['time-expressions', 'review'],
  },

  en_s2u6_n3_062_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'He was born ___ 1974.',
    blankAnswers: ['in'],
    options: ['in', 'last', 'ago', 'at'],
    answer: 'in',
    answerTranslation: L(
      '그는 1974년에 태어났어요.',
      'U 1974-yilda tug‘ilgan.',
      'He was born in 1974.',
      'Он родился в 1974 году.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['time-expressions'],
  },

  en_s2u6_n3_063_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'We visited them ___ week.',
    blankAnswers: ['last'],
    options: ['last', 'ago', 'in', 'at'],
    answer: 'last',
    answerTranslation: L(
      '우리는 지난주에 그들을 방문했어요.',
      'Biz o‘tgan hafta ularni ko‘rgani bordik.',
      'We visited them last week.',
      'Мы навестили их на прошлой неделе.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['time-expressions'],
  },

  en_s2u6_n3_064_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'They moved house two weeks ___.',
    blankAnswers: ['ago'],
    options: ['ago', 'last', 'in', 'at'],
    answer: 'ago',
    answerTranslation: L(
      '그들은 2주 전에 이사했어요.',
      'Ular ikki hafta oldin ko‘chdi.',
      'They moved house two weeks ago.',
      'Они переехали две недели назад.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['time-expressions'],
  },

  en_s2u6_n3_065_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The building was built ___ the sixteenth century.',
    blankAnswers: ['in'],
    options: ['in', 'last', 'ago', 'at'],
    answer: 'in',
    answerTranslation: L(
      '그 건물은 16세기에 지어졌어요.',
      'Bino 16-asrda qurilgan.',
      'The building was built in the sixteenth century.',
      'Здание было построено в XVI веке.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['time-expressions'],
  },

  en_s2u6_n3_066_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '동사와 알맞은 표현을 연결하세요.',
      'Fe’llarni mos birikmalar bilan bog‘lang.',
      'Match the verbs with the correct collocations.',
      'Соедините глаголы с правильными сочетаниями.',
    ),
    pairs: [
      {
        text: 'enter',
        native: 'a competition',
        nativeI18n: L(
          '대회에 참가하다',
          'musobaqaga qatnashmoq',
          'enter a competition',
          'участвовать в соревновании',
        ),
      },
      {
        text: 'move',
        native: 'house',
        nativeI18n: L('이사하다', 'ko‘chmoq', 'move house', 'переехать'),
      },
      {
        text: 'post',
        native: 'a letter',
        nativeI18n: L(
          '편지를 부치다',
          'xat jo‘natmoq',
          'post a letter',
          'отправить письмо',
        ),
      },
      {
        text: 'prepare',
        native: 'a meal',
        nativeI18n: L(
          '식사를 준비하다',
          'ovqat tayyorlamoq',
          'prepare a meal',
          'приготовить еду',
        ),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['collocations', 'review'],
  },

  en_s2u6_n3_067_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '동사와 알맞은 표현을 연결하세요.',
      'Fe’llarni mos birikmalar bilan bog‘lang.',
      'Match the verbs with the correct collocations.',
      'Соедините глаголы с правильными сочетаниями.',
    ),
    pairs: [
      {
        text: 'receive',
        native: 'an email',
        nativeI18n: L(
          '이메일을 받다',
          'elektron xat olmoq',
          'receive an email',
          'получить письмо',
        ),
      },
      {
        text: 'shout',
        native: 'at someone',
        nativeI18n: L(
          '누군가에게 소리치다',
          'birovga baqirmoq',
          'shout at someone',
          'кричать на кого-то',
        ),
      },
      {
        text: 'visit',
        native: 'a relative',
        nativeI18n: L(
          '친척을 방문하다',
          'qarindoshni ko‘rmoq',
          'visit a relative',
          'навестить родственника',
        ),
      },
      {
        text: 'wait',
        native: 'a long time',
        nativeI18n: L(
          '오랫동안 기다리다',
          'uzoq kutmoq',
          'wait a long time',
          'долго ждать',
        ),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['collocations', 'review'],
  },

  en_s2u6_n3_068_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She ___ a competition last year.',
    blankAnswers: ['entered'],
    options: ['entered', 'prepared', 'received', 'waited'],
    answer: 'entered',
    answerTranslation: L(
      '그녀는 작년에 대회에 참가했어요.',
      'U o‘tgan yili musobaqaga qatnashdi.',
      'She entered a competition last year.',
      'Она участвовала в соревновании в прошлом году.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['collocations', 'review'],
  },

  en_s2u6_n3_069_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'We ___ house two years ago.',
    blankAnswers: ['moved'],
    options: ['moved', 'received', 'prepared', 'shouted'],
    answer: 'moved',
    answerTranslation: L(
      '우리는 2년 전에 이사했어요.',
      'Biz ikki yil oldin ko‘chdik.',
      'We moved house two years ago.',
      'Мы переехали два года назад.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['collocations', 'review'],
  },

  en_s2u6_n3_070_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I ___ an email this morning.',
    blankAnswers: ['received'],
    options: ['received', 'entered', 'waited', 'moved'],
    answer: 'received',
    answerTranslation: L(
      '저는 오늘 아침 이메일을 받았어요.',
      'Men bugun ertalab elektron xat oldim.',
      'I received an email this morning.',
      'Я получил электронное письмо сегодня утром.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['collocations', 'review'],
  },

  en_s2u6_n3_071_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'He ___ a meal for his family.',
    blankAnswers: ['prepared'],
    options: ['prepared', 'received', 'entered', 'moved'],
    answer: 'prepared',
    answerTranslation: L(
      '그는 가족을 위해 식사를 준비했어요.',
      'U oilasi uchun ovqat tayyorladi.',
      'He prepared a meal for his family.',
      'Он приготовил еду для своей семьи.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['collocations', 'review'],
  },

  en_s2u6_n3_072_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'They ___ a relative last weekend.',
    blankAnswers: ['visited'],
    options: ['visited', 'posted', 'prepared', 'waited'],
    answer: 'visited',
    answerTranslation: L(
      '그들은 지난 주말 친척을 방문했어요.',
      'Ular o‘tgan dam olish kunlari qarindoshini ko‘rgani bordi.',
      'They visited a relative last weekend.',
      'Они навестили родственника в прошлые выходные.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['collocations', 'review'],
  },

  en_s2u6_n3_073_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I ___ a long time for the bus.',
    blankAnswers: ['waited'],
    options: ['waited', 'visited', 'posted', 'entered'],
    answer: 'waited',
    answerTranslation: L(
      '저는 버스를 오랫동안 기다렸어요.',
      'Men avtobusni uzoq kutdim.',
      'I waited a long time for the bus.',
      'Я долго ждал автобус.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['collocations', 'review'],
  },

  en_s2u6_n3_074_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Put the adverbs in order from weaker to stronger.',
      },
    ],
    options: [
      'a bit → quite → really → very',
      'very → really → quite → a bit',
      'quite → a bit → very → really',
      'ago → last → in → very',
    ],
    answer: 'a bit → quite → really → very',
    answerTranslation: L(
      'a bit → quite → really → very 순서예요.',
      'a bit → quite → really → very.',
      'A bit → quite → really → very.',
      'A bit → quite → really → very.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['degree-adverbs', 'review'],
  },

  en_s2u6_n3_075_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Which sentence talks about a completed past action?',
      },
    ],
    options: [
      'I visited a relative last weekend.',
      'I visit a relative every month.',
      'I usually visit my family.',
      'I visit people on Sundays.',
    ],
    answer: 'I visited a relative last weekend.',
    answerTranslation: L(
      'I visited a relative last weekend.가 과거에 끝난 행동이에요.',
      'I visited a relative last weekend. tugallangan o‘tgan harakat.',
      'I visited a relative last weekend. describes a completed past action.',
      'I visited a relative last weekend. описывает завершённое действие в прошлом.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['present-past', 'review'],
  },

  en_s2u6_n3_076_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['We', 'moved', 'house', 'two', 'years', 'ago'],
    answer: 'We moved house two years ago',
    audioText: 'We moved house two years ago.',
    answerTranslation: L(
      '우리는 2년 전에 이사했어요.',
      'Biz ikki yil oldin ko‘chdik.',
      'We moved house two years ago.',
      'Мы переехали два года назад.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['time-expressions', 'collocations'],
  },

  en_s2u6_n3_077_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['The', 'museum', 'was', 'a', 'bit', 'boring'],
    answer: 'The museum was a bit boring',
    answerTranslation: L(
      '박물관은 조금 지루했어요.',
      'Muzey bir oz zerikarli edi.',
      'The museum was a bit boring.',
      'Музей был немного скучным.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['degree-adverbs'],
  },

  en_s2u6_n3_078_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'The place we visited was really interesting.',
    audioText: 'The place we visited was really interesting.',
    answerI18n: L(
      '우리가 방문한 곳은 정말 흥미로웠어요',
      'Biz borgan joy juda qiziqarli edi',
      'The place we visited was really interesting',
      'Место, которое мы посетили, было очень интересным',
    ),
    options: ['The', 'place', 'we', 'visited', 'was', 'really', 'interesting.'],
    optionsI18n: {
      ko: ['우리가', '방문한', '곳은', '정말', '흥미로웠어요'],
      uz: ['Biz', 'borgan', 'joy', 'juda', 'qiziqarli', 'edi'],
      en: ['The', 'place', 'we', 'visited', 'was', 'really', 'interesting.'],
      ru: [
        'Место,',
        'которое',
        'мы',
        'посетили,',
        'было',
        'очень',
        'интересным',
      ],
    },
    answerTranslation: L(
      '우리가 방문한 곳은 정말 흥미로웠어요.',
      'Biz borgan joy juda qiziqarli edi.',
      'The place we visited was really interesting.',
      'Место, которое мы посетили, было очень интересным.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['degree-adverbs', 'past-simple'],
  },

  en_s2u6_n3_079_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Last year I visited a place that was really interesting, but the journey was quite long.',
    audioText:
      'Last year I visited a place that was really interesting, but the journey was quite long.',
    answerTranslation: L(
      '작년에 저는 정말 흥미로운 곳을 방문했지만 여정은 꽤 길었어요.',
      'O‘tgan yili juda qiziqarli joyga bordim, lekin safar ancha uzoq edi.',
      'Last year I visited a place that was really interesting, but the journey was quite long.',
      'В прошлом году я посетил очень интересное место, но поездка была довольно долгой.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['degree-adverbs', 'past-simple'],
  },

  en_s2u6_n3_080_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'In Unit 6.3, we identify present and past verb forms, use adverbs of degree and review past time expressions and verb collocations.',
    audioText:
      'In Unit 6.3, we identify present and past verb forms, use adverbs of degree and review past time expressions and verb collocations.',
    answerTranslation: L(
      'Unit 6.3에서는 현재형과 과거형 동사를 구별하고 강도 부사를 사용하며 과거 시간 표현과 동사 결합 표현을 복습해요.',
      'Unit 6.3 da hozirgi va o‘tgan zamon fe’llarini ajratamiz, daraja ravishlarini ishlatamiz va vaqt iboralari hamda fe’l birikmalarini takrorlaymiz.',
      'In Unit 6.3, we identify present and past verb forms, use adverbs of degree and review past time expressions and verb collocations.',
      'В Unit 6.3 мы различаем формы настоящего и прошедшего времени, используем наречия степени и повторяем временные выражения и глагольные сочетания.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit6', 'node-review'],
  },
};

// ─────────────────────────────────────────────────────────────
// Node 3
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT6_NODE3 = {
  title: L(
    '어휘와 스킬 개발',
    'Lug‘at va ko‘nikmalarni rivojlantirish',
    'Vocabulary and skills development',
    'Развитие лексики и навыков',
  ),
  section: 2,
  unit: 6,
  order: 3,
  isActive: true,

  lessons: [
    {
      title: L(
        '현재형과 과거형 동사 구별',
        'Hozirgi va o‘tgan zamon fe’llarini ajratish',
        'Understanding present and past simple verbs',
        'Распознавание Present и Past Simple',
      ),
      description: L(
        '동사의 현재형과 과거형을 소리와 문맥으로 구별하고 regular/irregular past 형태를 복습해요.',
        'Fe’llarning hozirgi va o‘tgan zamon shakllarini tovush va kontekst orqali ajratib, regular va irregular shakllarni takrorlaysiz.',
        'Identify present and past simple verb forms from their form, sound and context.',
        'Различаем формы Present и Past Simple по форме, звучанию и контексту.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 1,
      questions: [
        'en_s2u6_n3_001_dialog_complete',
        'en_s2u6_n3_002_dialog_complete',
        'en_s2u6_n3_003_fill_in_blank',
        'en_s2u6_n3_004_fill_in_blank',
        'en_s2u6_n3_005_fill_in_blank',
        'en_s2u6_n3_006_fill_in_blank',
        'en_s2u6_n3_007_word_matching',
        'en_s2u6_n3_008_word_matching',
        'en_s2u6_n3_009_fill_in_blank',
        'en_s2u6_n3_010_fill_in_blank',
        'en_s2u6_n3_011_fill_in_blank',
        'en_s2u6_n3_012_fill_in_blank',
        'en_s2u6_n3_013_fill_in_blank',
        'en_s2u6_n3_014_dialog_complete',
        'en_s2u6_n3_015_dialog_complete',
        'en_s2u6_n3_016_word_arrange',
        'en_s2u6_n3_017_translate_builder',
        'en_s2u6_n3_018_sentence_builder',
        'en_s2u6_n3_019_speaking',
        'en_s2u6_n3_020_speaking',
      ],
    },

    {
      title: L(
        'Inhotim과 강도 부사',
        'Inhotim va daraja ravishlari',
        'Inhotim and adverbs of degree',
        'Инхотим и наречия степени',
      ),
      description: L(
        'Inhotim을 소개하는 표현을 통해 a bit, quite, really, very가 형용사의 정도를 어떻게 바꾸는지 익혀요.',
        'Inhotim haqidagi iboralar orqali a bit, quite, really va very sifat darajasini qanday o‘zgartirishini o‘rganasiz.',
        'Use the Inhotim context to learn a bit, quite, really and very.',
        'На примере Инхотима изучаем a bit, quite, really и very.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 2,
      questions: [
        'en_s2u6_n3_021_word_matching',
        'en_s2u6_n3_022_fill_in_blank',
        'en_s2u6_n3_023_fill_in_blank',
        'en_s2u6_n3_024_fill_in_blank',
        'en_s2u6_n3_025_fill_in_blank',
        'en_s2u6_n3_026_fill_in_blank',
        'en_s2u6_n3_027_fill_in_blank',
        'en_s2u6_n3_028_fill_in_blank',
        'en_s2u6_n3_029_dialog_complete',
        'en_s2u6_n3_030_dialog_complete',
        'en_s2u6_n3_031_dialog_complete',
        'en_s2u6_n3_032_fill_in_blank',
        'en_s2u6_n3_033_fill_in_blank',
        'en_s2u6_n3_034_fill_in_blank',
        'en_s2u6_n3_035_fill_in_blank',
        'en_s2u6_n3_036_word_arrange',
        'en_s2u6_n3_037_translate_builder',
        'en_s2u6_n3_038_sentence_builder',
        'en_s2u6_n3_039_speaking',
        'en_s2u6_n3_040_speaking',
      ],
    },

    {
      title: L(
        '강도 부사 연습',
        'Daraja ravishlari mashqi',
        'Adverbs of degree',
        'Наречия степени',
      ),
      description: L(
        'Workbook을 바탕으로 a bit, quite, really, very를 상황에 맞게 선택하고 문장 강세와 함께 연습해요.',
        'Workbook asosida a bit, quite, really va very ni vaziyatga mos tanlab mashq qilasiz.',
        'Practise choosing a bit, quite, really and very in context.',
        'Практикуем выбор a bit, quite, really и very в контексте.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 3,
      questions: [
        'en_s2u6_n3_041_fill_in_blank',
        'en_s2u6_n3_042_fill_in_blank',
        'en_s2u6_n3_043_fill_in_blank',
        'en_s2u6_n3_044_fill_in_blank',
        'en_s2u6_n3_045_fill_in_blank',
        'en_s2u6_n3_046_fill_in_blank',
        'en_s2u6_n3_047_fill_in_blank',
        'en_s2u6_n3_048_fill_in_blank',
        'en_s2u6_n3_049_fill_in_blank',
        'en_s2u6_n3_050_fill_in_blank',
        'en_s2u6_n3_051_fill_in_blank',
        'en_s2u6_n3_052_fill_in_blank',
        'en_s2u6_n3_053_fill_in_blank',
        'en_s2u6_n3_054_dialog_complete',
        'en_s2u6_n3_055_dialog_complete',
        'en_s2u6_n3_056_word_arrange',
        'en_s2u6_n3_057_translate_builder',
        'en_s2u6_n3_058_sentence_builder',
        'en_s2u6_n3_059_speaking',
        'en_s2u6_n3_060_speaking',
      ],
    },

    {
      title: L(
        '시간 표현과 동사 결합 복습',
        'Vaqt iboralari va fe’l birikmalari takrori',
        'Time expressions and collocations review',
        'Повторение временных выражений и сочетаний',
      ),
      description: L(
        'in / last / ago 과거 시간 표현과 enter a competition, move house, prepare a meal, receive an email 등의 결합 표현을 종합 복습해요.',
        'in / last / ago vaqt iboralari va enter a competition, move house, prepare a meal, receive an email kabi birikmalarni takrorlaysiz.',
        'Review past time expressions and the common verb collocations from Unit 6.',
        'Повторяем выражения прошедшего времени и глагольные сочетания Unit 6.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 4,
      questions: [
        'en_s2u6_n3_061_word_matching',
        'en_s2u6_n3_062_fill_in_blank',
        'en_s2u6_n3_063_fill_in_blank',
        'en_s2u6_n3_064_fill_in_blank',
        'en_s2u6_n3_065_fill_in_blank',
        'en_s2u6_n3_066_word_matching',
        'en_s2u6_n3_067_word_matching',
        'en_s2u6_n3_068_fill_in_blank',
        'en_s2u6_n3_069_fill_in_blank',
        'en_s2u6_n3_070_fill_in_blank',
        'en_s2u6_n3_071_fill_in_blank',
        'en_s2u6_n3_072_fill_in_blank',
        'en_s2u6_n3_073_fill_in_blank',
        'en_s2u6_n3_074_dialog_complete',
        'en_s2u6_n3_075_dialog_complete',
        'en_s2u6_n3_076_word_arrange',
        'en_s2u6_n3_077_translate_builder',
        'en_s2u6_n3_078_sentence_builder',
        'en_s2u6_n3_079_speaking',
        'en_s2u6_n3_080_speaking',
      ],
    },
  ],
}; // ─────────────────────────────────────────────────────────────
// Section 2 · Unit 6 · Node 4
// 6.4 Speaking and writing
//
// Coverage
// Coursebook:
// - showing interest as a listener
// - responding to good / bad / interesting news
// - That's brilliant! / That's great! / That's amazing!
// - That's terrible! / That's awful! / What a nightmare!
// - Oh no! / Poor you!
// - Really? / That's interesting!
// - writing a tweet or text message
// - asking for information
// - giving an opinion
// - telling a short story
// - leaving words out in informal writing
//
// Workbook:
// - classify good / bad / interesting news
// - choose suitable listener responses
// - restore omitted words in tweets
// - match short replies to tweets
// - remove unnecessary words in informal messages
//
// IMPORTANT:
// *_WORDS에는 단일 headword만 등록.
// "Poor you", "What a nightmare", "That's brilliant" 등은
// 문장/표현이므로 WORD 등록하지 않음.
//
// 4 lessons × 20 questions = 80
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT6_NODE4_WORDS = [
  {
    code: 'en-adjective-brilliant',
    english: 'brilliant',
    senseKey: 'extremely-good-or-impressive',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '훌륭한; 멋진',
      'ajoyib',
      'extremely good or impressive',
      'великолепный',
    ),
    examples: [
      {
        english: 'That’s brilliant!',
        translations: L(
          '정말 멋지네요!',
          'Bu ajoyib!',
          'That’s brilliant!',
          'Это великолепно!',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈbrɪliənt/',
      ttsText: 'brilliant',
    },
    tags: ['reactions', 'speaking', 'unit6'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-adjective-terrible',
    english: 'terrible',
    senseKey: 'very-bad-or-unpleasant',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '끔찍한; 매우 나쁜',
      'dahshatli',
      'very bad or unpleasant',
      'ужасный',
    ),
    examples: [
      {
        english: 'That’s terrible!',
        translations: L(
          '정말 끔찍하네요!',
          'Bu dahshatli!',
          'That’s terrible!',
          'Это ужасно!',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈterəbəl/',
      ttsText: 'terrible',
    },
    tags: ['reactions', 'speaking', 'unit6'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-awful',
    english: 'awful',
    senseKey: 'extremely-bad-or-unpleasant',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '정말 나쁜; 끔찍한',
      'juda yomon',
      'extremely bad or unpleasant',
      'ужасный',
    ),
    examples: [
      {
        english: 'The hotel was awful.',
        translations: L(
          '호텔은 정말 별로였어요.',
          'Mehmonxona juda yomon edi.',
          'The hotel was awful.',
          'Отель был ужасным.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈɔːfəl/',
      ttsText: 'awful',
    },
    tags: ['reactions', 'speaking', 'unit6'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-nightmare',
    english: 'nightmare',
    senseKey: 'very-unpleasant-situation',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '악몽; 끔찍한 상황',
      'dahshatli holat',
      'a very unpleasant or difficult situation',
      'кошмар',
    ),
    examples: [
      {
        english: 'What a nightmare!',
        translations: L(
          '정말 끔찍했겠네요!',
          'Qanday dahshat!',
          'What a nightmare!',
          'Какой кошмар!',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈnaɪtmeə/',
      ttsText: 'nightmare',
    },
    tags: ['reactions', 'speaking', 'unit6'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-adjective-amazing',
    english: 'amazing',
    senseKey: 'very-surprising-and-good',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '놀라운; 대단한',
      'hayratlanarli',
      'very surprising and impressive',
      'удивительный',
    ),
    examples: [
      {
        english: 'That’s amazing!',
        translations: L(
          '정말 놀랍네요!',
          'Bu hayratlanarli!',
          'That’s amazing!',
          'Это удивительно!',
        ),
      },
    ],
    pronunciation: {
      ipa: '/əˈmeɪzɪŋ/',
      ttsText: 'amazing',
    },
    tags: ['reactions', 'speaking', 'unit6'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-listener',
    english: 'listener',
    senseKey: 'person-who-listens',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '듣는 사람; 청자',
      'tinglovchi',
      'a person who listens',
      'слушатель',
    ),
    examples: [
      {
        english: 'A good listener shows interest.',
        translations: L(
          '좋은 청자는 관심을 보여 줘요.',
          'Yaxshi tinglovchi qiziqish bildiradi.',
          'A good listener shows interest.',
          'Хороший слушатель проявляет интерес.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈlɪsənə/',
      ttsText: 'listener',
    },
    tags: ['speaking', 'unit6'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-tweet',
    english: 'tweet',
    senseKey: 'short-message-posted-on-twitter',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '트윗; 짧은 SNS 글',
      'qisqa ijtimoiy tarmoq xabari',
      'a short message posted on Twitter',
      'твит',
    ),
    examples: [
      {
        english: 'She wrote a short tweet.',
        translations: L(
          '그녀는 짧은 트윗을 썼어요.',
          'U qisqa tweet yozdi.',
          'She wrote a short tweet.',
          'Она написала короткий твит.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/twiːt/',
      ttsText: 'tweet',
    },
    tags: ['writing', 'social-media', 'unit6'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-reply',
    english: 'reply',
    senseKey: 'answer-to-message-or-question',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '답장; 응답',
      'javob',
      'an answer to a message or question',
      'ответ',
    ),
    examples: [
      {
        english: 'Write a reply to the message.',
        translations: L(
          '메시지에 답장을 쓰세요.',
          'Xabarga javob yozing.',
          'Write a reply to the message.',
          'Напишите ответ на сообщение.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/rɪˈplaɪ/',
      ttsText: 'reply',
    },
    tags: ['writing', 'social-media', 'unit6'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-opinion',
    english: 'opinion',
    senseKey: 'what-someone-thinks-about-something',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '의견',
      'fikr',
      'what someone thinks or believes about something',
      'мнение',
    ),
    examples: [
      {
        english: 'The third tweet gives the writer’s opinion.',
        translations: L(
          '세 번째 트윗은 작성자의 의견을 말해요.',
          'Uchinchi tweet muallifning fikrini bildiradi.',
          'The third tweet gives the writer’s opinion.',
          'Третий твит выражает мнение автора.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/əˈpɪnjən/',
      ttsText: 'opinion',
    },
    tags: ['writing', 'unit6'],
    difficulty: 2,
    isCore: true,
  },
];

export const EN_S2_UNIT6_NODE4_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Showing interest as a listener
  // ===========================================================

  en_s2u6_n4_001_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '반응 표현과 상황을 연결하세요.',
      'Javob iboralarini vaziyatlar bilan moslang.',
      'Match the reactions with the type of news.',
      'Соедините реакции с типом новости.',
    ),
    pairs: [
      {
        text: 'That’s brilliant!',
        native: 'good news',
        nativeI18n: L(
          '좋은 소식',
          'yaxshi xabar',
          'good news',
          'хорошая новость',
        ),
      },
      {
        text: 'That’s awful!',
        native: 'bad news',
        nativeI18n: L('나쁜 소식', 'yomon xabar', 'bad news', 'плохая новость'),
      },
      {
        text: 'Really?',
        native: 'interesting news',
        nativeI18n: L(
          '흥미로운 소식',
          'qiziq xabar',
          'interesting news',
          'интересная новость',
        ),
      },
    ],
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['showing-interest'],
  },

  en_s2u6_n4_002_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'My interview went really well. They offered me the job.',
      },
    ],
    options: ['That’s brilliant!', 'Poor you!', 'Oh no!', 'What a nightmare!'],
    answer: 'That’s brilliant!',
    answerTranslation: L(
      '정말 잘됐네요!',
      'Bu ajoyib!',
      'That’s brilliant!',
      'Это великолепно!',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['good-news'],
  },

  en_s2u6_n4_003_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Julia and Mark are getting married.',
      },
    ],
    options: ['That’s great!', 'That’s terrible!', 'Poor you!', 'Oh no!'],
    answer: 'That’s great!',
    answerTranslation: L(
      '정말 잘됐네요!',
      'Bu juda yaxshi!',
      'That’s great!',
      'Это здорово!',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['good-news'],
  },

  en_s2u6_n4_004_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Our new neighbours moved into the house next door yesterday.',
      },
    ],
    options: ['Really?', 'That’s awful!', 'Poor you!', 'What a nightmare!'],
    answer: 'Really?',
    answerTranslation: L('정말요?', 'Rostdanmi?', 'Really?', 'Правда?'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['interesting-news'],
  },

  en_s2u6_n4_005_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'I’ve got a cold.',
      },
    ],
    options: [
      'Poor you!',
      'That’s amazing!',
      'That’s brilliant!',
      'That’s great!',
    ],
    answer: 'Poor you!',
    answerTranslation: L('안됐네요!', 'Voy, bechora!', 'Poor you!', 'Бедняга!'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['bad-news'],
  },

  en_s2u6_n4_006_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'The bus is late again.',
      },
    ],
    options: [
      'Oh no!',
      'That’s brilliant!',
      'That’s amazing!',
      'That’s great!',
    ],
    answer: 'Oh no!',
    answerTranslation: L('아, 이런!', 'Voy yo‘q!', 'Oh no!', 'О нет!'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['bad-news'],
  },

  en_s2u6_n4_007_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Our holiday was terrible. The hotel was awful, the people were unfriendly and it rained every day.',
      },
    ],
    options: [
      'What a nightmare!',
      'Really?',
      'That’s great!',
      'That’s brilliant!',
    ],
    answer: 'What a nightmare!',
    answerTranslation: L(
      '정말 악몽 같았겠네요!',
      'Qanday dahshat!',
      'What a nightmare!',
      'Какой кошмар!',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['bad-news'],
  },

  en_s2u6_n4_008_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'My grandfather is 102 years old today.',
      },
    ],
    options: ['That’s amazing!', 'That’s terrible!', 'Poor you!', 'Oh no!'],
    answer: 'That’s amazing!',
    answerTranslation: L(
      '정말 놀랍네요!',
      'Bu hayratlanarli!',
      'That’s amazing!',
      'Это удивительно!',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['good-news'],
  },

  en_s2u6_n4_009_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Ken is really unhappy. The company he worked for closed last week and now he’s unemployed.',
      },
    ],
    options: [
      'That’s awful!',
      'That’s brilliant!',
      'That’s great!',
      'That’s amazing!',
    ],
    answer: 'That’s awful!',
    answerTranslation: L(
      '정말 안됐네요!',
      'Bu juda yomon!',
      'That’s awful!',
      'Это ужасно!',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['bad-news'],
  },

  en_s2u6_n4_010_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '“That’s brilliant!” is usually a response to ___ news.',
    blankAnswers: ['good'],
    options: ['good', 'bad', 'boring', 'old'],
    answer: 'good',
    answerTranslation: L(
      'That’s brilliant!는 보통 좋은 소식에 대한 반응이에요.',
      'That’s brilliant! odatda yaxshi xabarga javob.',
      'That’s brilliant! is usually a response to good news.',
      'That’s brilliant! обычно является реакцией на хорошую новость.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['showing-interest'],
  },

  en_s2u6_n4_011_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '“Poor you!” is usually a response to ___ news.',
    blankAnswers: ['bad'],
    options: ['bad', 'good', 'interesting', 'funny'],
    answer: 'bad',
    answerTranslation: L(
      'Poor you!는 보통 나쁜 소식에 대한 반응이에요.',
      'Poor you! odatda yomon xabarga javob.',
      'Poor you! is usually a response to bad news.',
      'Poor you! обычно является реакцией на плохую новость.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['showing-interest'],
  },

  en_s2u6_n4_012_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '“Really?” can show that the listener is ___.',
    blankAnswers: ['interested'],
    options: ['interested', 'asleep', 'late', 'unemployed'],
    answer: 'interested',
    answerTranslation: L(
      'Really?는 듣는 사람이 관심을 보인다는 뜻이 될 수 있어요.',
      'Really? tinglovchining qiziqayotganini ko‘rsatadi.',
      'Really? can show that the listener is interested.',
      'Really? может показать, что слушателю интересно.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['showing-interest'],
  },

  en_s2u6_n4_013_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Emma passed her driving test!',
      },
    ],
    options: [
      'That’s brilliant!',
      'That’s terrible!',
      'Poor you!',
      'What a nightmare!',
    ],
    answer: 'That’s brilliant!',
    answerTranslation: L(
      '정말 잘됐네요!',
      'Bu ajoyib!',
      'That’s brilliant!',
      'Это великолепно!',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['good-news'],
  },

  en_s2u6_n4_014_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Mark’s grandfather died last week.',
      },
    ],
    options: [
      'That’s terrible!',
      'That’s amazing!',
      'That’s great!',
      'Really interesting!',
    ],
    answer: 'That’s terrible!',
    answerTranslation: L(
      '정말 안됐네요.',
      'Bu juda achinarli.',
      'That’s terrible!',
      'Это ужасно.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['bad-news'],
  },

  en_s2u6_n4_015_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'There’s a Turkish film on TV tonight.',
      },
    ],
    options: ['That’s interesting!', 'Poor you!', 'That’s awful!', 'Oh no!'],
    answer: 'That’s interesting!',
    answerTranslation: L(
      '흥미롭네요!',
      'Bu qiziq ekan!',
      'That’s interesting!',
      'Это интересно!',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['interesting-news'],
  },

  en_s2u6_n4_016_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['That’s', 'brilliant'],
    answer: 'That’s brilliant',
    audioText: 'That’s brilliant!',
    answerTranslation: L(
      '정말 멋지네요!',
      'Bu ajoyib!',
      'That’s brilliant!',
      'Это великолепно!',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['showing-interest'],
  },

  en_s2u6_n4_017_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['What', 'a', 'nightmare'],
    answer: 'What a nightmare',
    answerTranslation: L(
      '정말 끔찍했겠네요!',
      'Qanday dahshat!',
      'What a nightmare!',
      'Какой кошмар!',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['showing-interest'],
  },

  en_s2u6_n4_018_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'That’s really interesting!',
    audioText: 'That’s really interesting!',
    answerI18n: L(
      '정말 흥미롭네요',
      'Bu juda qiziq ekan',
      'That’s really interesting',
      'Это очень интересно',
    ),
    options: ['That’s', 'really', 'interesting!'],
    optionsI18n: {
      ko: ['정말', '흥미롭네요'],
      uz: ['Bu', 'juda', 'qiziq', 'ekan'],
      en: ['That’s', 'really', 'interesting!'],
      ru: ['Это', 'очень', 'интересно'],
    },
    answerTranslation: L(
      '정말 흥미롭네요!',
      'Bu juda qiziq ekan!',
      'That’s really interesting!',
      'Это очень интересно!',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['showing-interest'],
  },

  en_s2u6_n4_019_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'That’s brilliant! That’s great! That’s amazing!',
    audioText: 'That’s brilliant! That’s great! That’s amazing!',
    answerTranslation: L(
      '좋은 소식에 반응하는 표현을 연습하세요.',
      'Yaxshi xabarga javob berish iboralarini mashq qiling.',
      'Practise the expressions for responding to good news.',
      'Потренируйте реакции на хорошие новости.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['good-news', 'pronunciation'],
  },

  en_s2u6_n4_020_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'A good listener shows interest by using suitable reactions to good, bad and interesting news.',
    audioText:
      'A good listener shows interest by using suitable reactions to good, bad and interesting news.',
    answerTranslation: L(
      '좋은 청자는 좋은 소식, 나쁜 소식, 흥미로운 소식에 알맞게 반응하며 관심을 보여 줘요.',
      'Yaxshi tinglovchi yaxshi, yomon va qiziq xabarlarga mos javob berib qiziqishini ko‘rsatadi.',
      'A good listener shows interest by using suitable reactions to good, bad and interesting news.',
      'Хороший слушатель проявляет интерес, правильно реагируя на хорошие, плохие и интересные новости.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['showing-interest', 'review'],
  },

  // ===========================================================
  // Lesson 2 · Good, bad and interesting news
  // ===========================================================

  en_s2u6_n4_021_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'The train is late again.',
      },
    ],
    options: [
      'Oh no!',
      'That’s brilliant!',
      'That’s amazing!',
      'That’s great!',
    ],
    answer: 'Oh no!',
    answerTranslation: L('아, 이런!', 'Voy yo‘q!', 'Oh no!', 'О нет!'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['workbook', 'bad-news'],
  },

  en_s2u6_n4_022_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'My boss is really angry with me.',
      },
    ],
    options: [
      'That’s awful!',
      'That’s brilliant!',
      'That’s great!',
      'That’s amazing!',
    ],
    answer: 'That’s awful!',
    answerTranslation: L(
      '정말 안됐네요!',
      'Bu juda yomon!',
      'That’s awful!',
      'Это ужасно!',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['workbook', 'bad-news'],
  },

  en_s2u6_n4_023_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'I’m starting a salsa class tomorrow.',
      },
    ],
    options: ['Really?', 'Poor you!', 'Oh no!', 'That’s terrible!'],
    answer: 'Really?',
    answerTranslation: L('정말요?', 'Rostdanmi?', 'Really?', 'Правда?'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['workbook', 'interesting-news'],
  },

  en_s2u6_n4_024_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Tom had an interview yesterday.',
      },
    ],
    options: [
      'That’s interesting!',
      'What a nightmare!',
      'Poor you!',
      'That’s terrible!',
    ],
    answer: 'That’s interesting!',
    answerTranslation: L(
      '흥미롭네요!',
      'Bu qiziq ekan!',
      'That’s interesting!',
      'Это интересно!',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['workbook', 'interesting-news'],
  },

  en_s2u6_n4_025_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'It’s my daughter’s wedding next week.',
      },
    ],
    options: ['That’s great!', 'Poor you!', 'That’s awful!', 'Oh no!'],
    answer: 'That’s great!',
    answerTranslation: L(
      '정말 잘됐네요!',
      'Bu juda yaxshi!',
      'That’s great!',
      'Это здорово!',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['workbook', 'good-news'],
  },

  en_s2u6_n4_026_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'It’s stopped raining – we can go to the beach!',
      },
    ],
    options: [
      'That’s brilliant!',
      'That’s awful!',
      'Poor you!',
      'What a nightmare!',
    ],
    answer: 'That’s brilliant!',
    answerTranslation: L(
      '정말 잘됐네요!',
      'Bu ajoyib!',
      'That’s brilliant!',
      'Это великолепно!',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['workbook', 'good-news'],
  },

  en_s2u6_n4_027_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '“That’s awful!” responds to ___ news.',
    blankAnswers: ['bad'],
    options: ['bad', 'good', 'interesting', 'amazing'],
    answer: 'bad',
    answerTranslation: L(
      'That’s awful!는 나쁜 소식에 반응하는 표현이에요.',
      'That’s awful! yomon xabarga javob.',
      'That’s awful! responds to bad news.',
      'That’s awful! — реакция на плохую новость.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['workbook'],
  },

  en_s2u6_n4_028_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '“What a nightmare!” responds to ___ news.',
    blankAnswers: ['bad'],
    options: ['bad', 'good', 'interesting', 'normal'],
    answer: 'bad',
    answerTranslation: L(
      'What a nightmare!는 나쁜 소식에 대한 반응이에요.',
      'What a nightmare! yomon xabarga javob.',
      'What a nightmare! responds to bad news.',
      'What a nightmare! — реакция на плохую новость.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['workbook'],
  },

  en_s2u6_n4_029_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '“That’s amazing!” usually responds to ___ news.',
    blankAnswers: ['good'],
    options: ['good', 'bad', 'boring', 'sad'],
    answer: 'good',
    answerTranslation: L(
      'That’s amazing!은 보통 좋은 소식에 대한 반응이에요.',
      'That’s amazing! odatda yaxshi xabarga javob.',
      'That’s amazing! usually responds to good news.',
      'That’s amazing! обычно является реакцией на хорошую новость.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['workbook'],
  },

  en_s2u6_n4_030_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '“Really?” is useful when the news is ___.',
    blankAnswers: ['interesting'],
    options: ['interesting', 'terrible', 'awful', 'impossible'],
    answer: 'interesting',
    answerTranslation: L(
      'Really?는 흥미로운 소식에 사용할 수 있어요.',
      'Really? qiziq xabarga javob sifatida ishlatiladi.',
      'Really? is useful when the news is interesting.',
      'Really? подходит для реакции на интересную новость.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['workbook'],
  },

  en_s2u6_n4_031_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'My interview went really well. They offered me the job.',
      },
    ],
    options: ['That’s brilliant!', 'Really?', 'Poor you!', 'That’s awful!'],
    answer: 'That’s brilliant!',
    answerTranslation: L(
      '정말 잘됐네요!',
      'Bu ajoyib!',
      'That’s brilliant!',
      'Это великолепно!',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['workbook'],
  },

  en_s2u6_n4_032_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Julia and Mark are getting married.',
      },
    ],
    options: ['That’s great!', 'That’s awful!', 'Oh no!', 'Poor you!'],
    answer: 'That’s great!',
    answerTranslation: L(
      '정말 잘됐네요!',
      'Bu juda yaxshi!',
      'That’s great!',
      'Это здорово!',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['workbook'],
  },

  en_s2u6_n4_033_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Our new neighbours moved into the house next door yesterday.',
      },
    ],
    options: ['Really?', 'Poor you!', 'That’s terrible!', 'What a nightmare!'],
    answer: 'Really?',
    answerTranslation: L('정말요?', 'Rostdanmi?', 'Really?', 'Правда?'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['workbook'],
  },

  en_s2u6_n4_034_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'I’ve got a cold.',
      },
    ],
    options: ['Poor you!', 'That’s amazing!', 'That’s brilliant!', 'Really?'],
    answer: 'Poor you!',
    answerTranslation: L('안됐네요!', 'Voy, bechora!', 'Poor you!', 'Бедняга!'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['workbook'],
  },

  en_s2u6_n4_035_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'My grandfather is 102 years old today.',
      },
    ],
    options: ['That’s amazing!', 'That’s terrible!', 'Poor you!', 'Oh no!'],
    answer: 'That’s amazing!',
    answerTranslation: L(
      '정말 놀랍네요!',
      'Bu hayratlanarli!',
      'That’s amazing!',
      'Это удивительно!',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['workbook'],
  },

  en_s2u6_n4_036_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['Poor', 'you'],
    answer: 'Poor you',
    audioText: 'Poor you!',
    answerTranslation: L('안됐네요!', 'Voy, bechora!', 'Poor you!', 'Бедняга!'),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['showing-interest'],
  },

  en_s2u6_n4_037_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['That’s', 'amazing'],
    answer: 'That’s amazing',
    answerTranslation: L(
      '정말 놀랍네요!',
      'Bu hayratlanarli!',
      'That’s amazing!',
      'Это удивительно!',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['showing-interest'],
  },

  en_s2u6_n4_038_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'What a nightmare!',
    audioText: 'What a nightmare!',
    answerI18n: L(
      '정말 끔찍했겠네요',
      'Qanday dahshat',
      'What a nightmare',
      'Какой кошмар',
    ),
    options: ['What', 'a', 'nightmare!'],
    optionsI18n: {
      ko: ['정말', '끔찍했겠네요'],
      uz: ['Qanday', 'dahshat'],
      en: ['What', 'a', 'nightmare!'],
      ru: ['Какой', 'кошмар'],
    },
    answerTranslation: L(
      '정말 끔찍했겠네요!',
      'Qanday dahshat!',
      'What a nightmare!',
      'Какой кошмар!',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['showing-interest'],
  },

  en_s2u6_n4_039_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'That’s terrible! That’s awful! What a nightmare! Oh no! Poor you!',
    audioText:
      'That’s terrible! That’s awful! What a nightmare! Oh no! Poor you!',
    answerTranslation: L(
      '나쁜 소식에 반응하는 표현을 연습하세요.',
      'Yomon xabarga javob berish iboralarini mashq qiling.',
      'Practise the expressions for responding to bad news.',
      'Потренируйте реакции на плохие новости.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['bad-news', 'pronunciation'],
  },

  en_s2u6_n4_040_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Really? That’s interesting!',
    audioText: 'Really? That’s interesting!',
    answerTranslation: L(
      '흥미로운 소식에 반응하는 표현을 연습하세요.',
      'Qiziq xabarga javob iboralarini mashq qiling.',
      'Practise the expressions for responding to interesting news.',
      'Потренируйте реакции на интересные новости.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['interesting-news', 'pronunciation'],
  },

  // ===========================================================
  // Lesson 3 · Writing a tweet or text message
  // ===========================================================

  en_s2u6_n4_041_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Anyone know where I can dance salsa? Really want to learn!',
      },
    ],
    options: [
      'It asks for information.',
      'It gives the writer’s opinion.',
      'It tells a story about work.',
      'It describes bad weather.',
    ],
    answer: 'It asks for information.',
    answerTranslation: L(
      '정보를 묻는 글이에요.',
      'Bu ma’lumot so‘raydi.',
      'It asks for information.',
      'Это запрос информации.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['tweets', 'writing'],
  },

  en_s2u6_n4_042_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Just walked into boss’s office and she was asleep! So funny!',
      },
    ],
    options: [
      'It tells a short story.',
      'It asks for a hotel.',
      'It gives information about salsa.',
      'It describes a film review only.',
    ],
    answer: 'It tells a short story.',
    answerTranslation: L(
      '짧은 이야기를 말해요.',
      'Bu qisqa hikoya aytadi.',
      'It tells a short story.',
      'Это короткая история.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['tweets', 'writing'],
  },

  en_s2u6_n4_043_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Watching Gladiator. Love it!',
      },
    ],
    options: [
      'It gives the writer’s opinion.',
      'It asks for information.',
      'It gives bad news.',
      'It asks for directions.',
    ],
    answer: 'It gives the writer’s opinion.',
    answerTranslation: L(
      '작성자의 의견을 말해요.',
      'Bu muallifning fikrini bildiradi.',
      'It gives the writer’s opinion.',
      'Это выражает мнение автора.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['tweets', 'writing'],
  },

  en_s2u6_n4_044_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Anyone know where I can dance salsa? Really want to learn!',
      },
    ],
    options: [
      'Try Café Sol. Think they have classes on Mondays.',
      'Really?! Saw it years ago and hated it. Boring!',
      'Ha ha! You still at work? Don’t wake her up.',
      'Poor you! Home now?',
    ],
    answer: 'Try Café Sol. Think they have classes on Mondays.',
    answerTranslation: L(
      'Café Sol에 가 보세요. 월요일에 수업이 있는 것 같아요.',
      'Café Solni sinab ko‘ring. Menimcha, dushanba kunlari darslari bor.',
      'Try Café Sol. Think they have classes on Mondays.',
      'Попробуйте Café Sol. Кажется, у них занятия по понедельникам.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['tweets', 'replies'],
  },

  en_s2u6_n4_045_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Just walked into boss’s office and she was asleep! So funny!',
      },
    ],
    options: [
      'Ha ha! You still at work? Don’t wake her up. Then you can go home!',
      'Try Café Sol. Think they have classes on Mondays.',
      'Really?! Saw it years ago and hated it. Boring!',
      'That’s terrible. Don’t watch films.',
    ],
    answer:
      'Ha ha! You still at work? Don’t wake her up. Then you can go home!',
    answerTranslation: L(
      '하하! 아직 회사예요? 깨우지 마세요. 그러면 집에 갈 수 있겠네요!',
      'Ha-ha! Hali ishxonadamisan? Uni uyg‘otma. Keyin uyga ketishing mumkin!',
      'Ha ha! You still at work? Don’t wake her up. Then you can go home!',
      'Ха-ха! Ты всё ещё на работе? Не буди её. Тогда сможешь пойти домой!',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['tweets', 'replies'],
  },

  en_s2u6_n4_046_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Watching Gladiator. Love it!',
      },
    ],
    options: [
      'Really?! Saw it years ago and hated it. Boring!',
      'Try Café Sol. Think they have classes on Mondays.',
      'You still at work?',
      'Want to meet for coffee?',
    ],
    answer: 'Really?! Saw it years ago and hated it. Boring!',
    answerTranslation: L(
      '정말요?! 몇 년 전에 봤는데 저는 싫었어요. 지루했어요!',
      'Rostdanmi?! Uni bir necha yil oldin ko‘rganman va yoqtirmaganman. Zerikarli!',
      'Really?! Saw it years ago and hated it. Boring!',
      'Правда?! Я смотрел его много лет назад и ненавидел. Скучно!',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['tweets', 'replies'],
  },

  en_s2u6_n4_047_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'In informal tweets, “___ anyone know where I can dance salsa?” can become “Anyone know where I can dance salsa?”',
    blankAnswers: ['Does'],
    options: ['Does', 'Did', 'Was', 'Were'],
    answer: 'Does',
    answerTranslation: L(
      '비격식 트윗에서는 Does를 생략할 수 있어요.',
      'Norasmiy tweetda Does tushirib qoldirilishi mumkin.',
      'In informal tweets, Does can be omitted.',
      'В неформальном твите Does можно опустить.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['informal-writing', 'omission'],
  },

  en_s2u6_n4_048_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      '“Really want to learn!” has omitted the subject pronoun ___.',
    blankAnswers: ['I'],
    options: ['I', 'you', 'it', 'they'],
    answer: 'I',
    answerTranslation: L(
      'Really want to learn!에서는 주어 I가 생략됐어요.',
      'Really want to learn! gapida I tushirib qoldirilgan.',
      'Really want to learn! omits the subject pronoun I.',
      'В Really want to learn! опущено местоимение I.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['informal-writing', 'omission'],
  },

  en_s2u6_n4_049_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      '“So funny!” can be the informal short form of “___ so funny!”',
    blankAnswers: ['It was'],
    options: ['It was', 'They were', 'I am', 'Does it'],
    answer: 'It was',
    answerTranslation: L(
      'So funny!는 It was so funny!에서 It was를 생략한 형태가 될 수 있어요.',
      'So funny! — It was so funny! ning qisqa norasmiy shakli.',
      'So funny! can be the informal short form of It was so funny!',
      'So funny! может быть сокращённой неформальной формой It was so funny!',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['informal-writing', 'omission'],
  },

  en_s2u6_n4_050_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'Tweets and text messages often leave words out because people write ___.',
    blankAnswers: ['quickly'],
    options: ['quickly', 'slowly', 'dangerously', 'badly'],
    answer: 'quickly',
    answerTranslation: L(
      '트윗과 문자에서는 빨리 쓰기 때문에 단어를 생략하는 경우가 많아요.',
      'Tweet va xabarlarda tez yozilgani uchun so‘zlar tushirib qoldiriladi.',
      'Tweets and text messages often leave words out because people write quickly.',
      'В твитах и сообщениях слова часто опускают, потому что пишут быстро.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['informal-writing'],
  },

  en_s2u6_n4_051_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'Auxiliary verbs such as do, does, is and ___ can be omitted in informal messages.',
    blankAnswers: ['are'],
    options: ['are', 'ago', 'very', 'last'],
    answer: 'are',
    answerTranslation: L(
      'do, does, is, are 같은 조동사나 보조동사는 비격식 메시지에서 생략될 수 있어요.',
      'do, does, is va are norasmiy xabarlarda tushirib qoldirilishi mumkin.',
      'Auxiliary verbs such as do, does, is and are can be omitted in informal messages.',
      'В неформальных сообщениях вспомогательные глаголы do, does, is и are могут опускаться.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['informal-writing'],
  },

  en_s2u6_n4_052_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'Subject pronouns such as I, you and ___ can be omitted in informal writing.',
    blankAnswers: ['it'],
    options: ['it', 'ago', 'last', 'quite'],
    answer: 'it',
    answerTranslation: L(
      'I, you, it 같은 주어 대명사는 비격식 글에서 생략될 수 있어요.',
      'I, you va it kabi ega olmoshlari norasmiy yozuvda tushirilishi mumkin.',
      'Subject pronouns such as I, you and it can be omitted in informal writing.',
      'В неформальной переписке местоимения I, you и it могут опускаться.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['informal-writing'],
  },

  en_s2u6_n4_053_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Which is the full sentence for “Anyone know a good hotel there?”',
      },
    ],
    options: [
      'Does anyone know a good hotel there?',
      'Anyone does know a good hotel there?',
      'Was anyone know a good hotel there?',
      'Anyone knowing a good hotel there?',
    ],
    answer: 'Does anyone know a good hotel there?',
    answerTranslation: L(
      'Does anyone know a good hotel there?가 완전한 문장이에요.',
      'To‘liq gap: Does anyone know a good hotel there?',
      'The full sentence is: Does anyone know a good hotel there?',
      'Полная форма: Does anyone know a good hotel there?',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['informal-writing'],
  },

  en_s2u6_n4_054_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Which is the full sentence for “Watching Gladiator.”?',
      },
    ],
    options: [
      'I’m watching Gladiator.',
      'I watching Gladiator.',
      'Does watching Gladiator.',
      'Was watch Gladiator.',
    ],
    answer: 'I’m watching Gladiator.',
    answerTranslation: L(
      'I’m watching Gladiator.가 완전한 문장이에요.',
      'To‘liq gap: I’m watching Gladiator.',
      'The full sentence is: I’m watching Gladiator.',
      'Полная форма: I’m watching Gladiator.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['informal-writing'],
  },

  en_s2u6_n4_055_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Which is the full sentence for “So funny!”?',
      },
    ],
    options: [
      'It was so funny!',
      'Does so funny!',
      'I so funny!',
      'Were so funny!',
    ],
    answer: 'It was so funny!',
    answerTranslation: L(
      'It was so funny!가 완전한 문장이에요.',
      'To‘liq gap: It was so funny!',
      'The full sentence is: It was so funny!',
      'Полная форма: It was so funny!',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['informal-writing'],
  },

  en_s2u6_n4_056_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['Does', 'anyone', 'know', 'a', 'good', 'hotel', 'there'],
    answer: 'Does anyone know a good hotel there',
    audioText: 'Does anyone know a good hotel there?',
    answerTranslation: L(
      '그곳에 좋은 호텔을 아는 사람이 있나요?',
      'U yerda yaxshi mehmonxonani biladigan odam bormi?',
      'Does anyone know a good hotel there?',
      'Кто-нибудь знает там хороший отель?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['informal-writing'],
  },

  en_s2u6_n4_057_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['I’m', 'watching', 'a', 'great', 'programme'],
    answer: 'I’m watching a great programme',
    answerTranslation: L(
      '저는 아주 좋은 프로그램을 보고 있어요.',
      'Men juda yaxshi dastur ko‘ryapman.',
      'I’m watching a great programme.',
      'Я смотрю отличную программу.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['informal-writing'],
  },

  en_s2u6_n4_058_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'I really want to learn!',
    audioText: 'I really want to learn!',
    answerI18n: L(
      '저는 정말 배우고 싶어요',
      'Men juda o‘rganishni xohlayman',
      'I really want to learn',
      'Я очень хочу научиться',
    ),
    options: ['I', 'really', 'want', 'to', 'learn!'],
    optionsI18n: {
      ko: ['저는', '정말', '배우고', '싶어요'],
      uz: ['Men', 'juda', 'o‘rganishni', 'xohlayman'],
      en: ['I', 'really', 'want', 'to', 'learn!'],
      ru: ['Я', 'очень', 'хочу', 'научиться'],
    },
    answerTranslation: L(
      '저는 정말 배우고 싶어요!',
      'Men juda o‘rganishni xohlayman!',
      'I really want to learn!',
      'Я очень хочу научиться!',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['informal-writing'],
  },

  en_s2u6_n4_059_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'In tweets and text messages, people often leave out auxiliary verbs, subject pronouns, or the subject and the verb to be.',
    audioText:
      'In tweets and text messages, people often leave out auxiliary verbs, subject pronouns, or the subject and the verb to be.',
    answerTranslation: L(
      '트윗과 문자에서는 보조동사, 주어 대명사 또는 주어와 be동사를 생략하는 경우가 많아요.',
      'Tweet va xabarlarda yordamchi fe’llar, ega olmoshlari yoki ega bilan be fe’li ko‘pincha tushirib qoldiriladi.',
      'In tweets and text messages, people often leave out auxiliary verbs, subject pronouns, or the subject and the verb to be.',
      'В твитах и сообщениях часто опускают вспомогательные глаголы, местоимения или подлежащее с глаголом be.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['informal-writing', 'review'],
  },

  en_s2u6_n4_060_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'A short social-media message can ask for information, tell a short story or give an opinion.',
    audioText:
      'A short social-media message can ask for information, tell a short story or give an opinion.',
    answerTranslation: L(
      '짧은 SNS 메시지는 정보를 묻거나 짧은 이야기를 하거나 의견을 말할 수 있어요.',
      'Qisqa ijtimoiy tarmoq xabari ma’lumot so‘rashi, qisqa hikoya aytishi yoki fikr bildirishi mumkin.',
      'A short social-media message can ask for information, tell a short story or give an opinion.',
      'Короткое сообщение в соцсети может запрашивать информацию, рассказывать историю или выражать мнение.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['writing', 'review'],
  },

  // ===========================================================
  // Lesson 4 · Workbook tweets and texts
  // ===========================================================

  en_s2u6_n4_061_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Want to go to Istanbul in April. Anyone know a good hotel there?',
      },
    ],
    options: [
      'I want to go to Istanbul in April. Does anyone know a good hotel there?',
      'I went Istanbul April. Anyone knowing hotel?',
      'I am want to Istanbul. Did anyone hotel?',
      'Wanting Istanbul and hotel.',
    ],
    answer:
      'I want to go to Istanbul in April. Does anyone know a good hotel there?',
    answerTranslation: L(
      'I want to go to Istanbul in April. Does anyone know a good hotel there?가 완전한 형태예요.',
      'To‘liq shakli: I want to go to Istanbul in April. Does anyone know a good hotel there?',
      'The full version is: I want to go to Istanbul in April. Does anyone know a good hotel there?',
      'Полная версия: I want to go to Istanbul in April. Does anyone know a good hotel there?',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['workbook', 'informal-writing'],
  },

  en_s2u6_n4_062_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Watching a great programme about famous singers. Anyone else watching it?',
      },
    ],
    options: [
      'I’m watching a great programme about famous singers. Is anyone else watching it?',
      'I watched a programme. Does anyone watched it?',
      'Watching singers. Anyone was watch?',
      'I am watched programme. Anyone?',
    ],
    answer:
      'I’m watching a great programme about famous singers. Is anyone else watching it?',
    answerTranslation: L(
      'I’m watching... Is anyone else watching it?가 완전한 형태예요.',
      'To‘liq shakli: I’m watching... Is anyone else watching it?',
      'The full version is: I’m watching a great programme about famous singers. Is anyone else watching it?',
      'Полная версия: I’m watching a great programme about famous singers. Is anyone else watching it?',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['workbook', 'informal-writing'],
  },

  en_s2u6_n4_063_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Just waited an hour for the bus! So boring!',
      },
    ],
    options: [
      'I’ve just waited an hour for the bus! It was so boring!',
      'I wait bus. It boring.',
      'I was wait for bus. So boring.',
      'I just waiting an hour for bus.',
    ],
    answer: 'I’ve just waited an hour for the bus! It was so boring!',
    answerTranslation: L(
      'I’ve just waited an hour for the bus! It was so boring!가 완전한 형태예요.',
      'To‘liq shakli: I’ve just waited an hour for the bus! It was so boring!',
      'The full version is: I’ve just waited an hour for the bus! It was so boring!',
      'Полная версия: I’ve just waited an hour for the bus! It was so boring!',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['workbook', 'informal-writing'],
  },

  en_s2u6_n4_064_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Want to go to Istanbul in April. Anyone know a good hotel there?',
      },
    ],
    options: [
      'Try Hotel Espresso Zoe. Went there last year. Really beautiful.',
      'Really?! Only watched five minutes. Awful!',
      'Poor you! Home now? Want to meet for coffee later?',
      'What a nightmare! The bus is late.',
    ],
    answer: 'Try Hotel Espresso Zoe. Went there last year. Really beautiful.',
    answerTranslation: L(
      'Hotel Espresso Zoe를 추천하는 답장이 알맞아요.',
      'Hotel Espresso Zoe haqidagi javob mos keladi.',
      'The reply recommending Hotel Espresso Zoe matches the tweet.',
      'Подходит ответ с рекомендацией Hotel Espresso Zoe.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['workbook', 'replies'],
  },

  en_s2u6_n4_065_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Watching a great programme about famous singers. Anyone else watching it?',
      },
    ],
    options: [
      'Really?! Only watched five minutes. It was awful!',
      'Try Hotel Espresso Zoe. Went there last year.',
      'Poor you! Home now?',
      'What size do you need?',
    ],
    answer: 'Really?! Only watched five minutes. It was awful!',
    answerTranslation: L(
      'Really?! Only watched five minutes. It was awful!가 알맞은 답장이에요.',
      'Really?! Only watched five minutes. It was awful! mos javob.',
      'Really?! Only watched five minutes. It was awful! is the matching reply.',
      'Really?! Only watched five minutes. It was awful! — подходящий ответ.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['workbook', 'replies'],
  },

  en_s2u6_n4_066_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Just waited an hour for the bus! So boring!',
      },
    ],
    options: [
      'Poor you! Home now? Want to meet for coffee later?',
      'Try Hotel Espresso Zoe.',
      'Really?! I love that programme.',
      'That’s brilliant! Wait another hour.',
    ],
    answer: 'Poor you! Home now? Want to meet for coffee later?',
    answerTranslation: L(
      'Poor you! Home now? Want to meet for coffee later?가 알맞아요.',
      'Poor you! Home now? Want to meet for coffee later? mos javob.',
      'Poor you! Home now? Want to meet for coffee later? is the matching reply.',
      'Подходит ответ: Poor you! Home now? Want to meet for coffee later?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['workbook', 'replies'],
  },

  en_s2u6_n4_067_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      '“Want to go to Istanbul in April.” is missing the subject ___.',
    blankAnswers: ['I'],
    options: ['I', 'it', 'they', 'we'],
    answer: 'I',
    answerTranslation: L(
      '주어 I가 생략됐어요.',
      'I egasi tushirilgan.',
      'The subject I is omitted.',
      'Опущено подлежащее I.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['workbook', 'omission'],
  },

  en_s2u6_n4_068_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      '“Anyone know a good hotel there?” is missing the auxiliary ___.',
    blankAnswers: ['Does'],
    options: ['Does', 'Was', 'Were', 'Has'],
    answer: 'Does',
    answerTranslation: L(
      'Does가 생략됐어요.',
      'Does tushirib qoldirilgan.',
      'Does is omitted.',
      'Опущено Does.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['workbook', 'omission'],
  },

  en_s2u6_n4_069_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '“Watching a great programme...” is missing “___”.',
    blankAnswers: ["I'm"],
    options: ["I'm", 'Does', 'Were', 'They'],
    answer: "I'm",
    answerTranslation: L(
      'I’m이 생략됐어요.',
      'I’m tushirib qoldirilgan.',
      'I’m is omitted.',
      'Опущено I’m.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['workbook', 'omission'],
  },

  en_s2u6_n4_070_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '“Anyone else watching it?” is missing the verb ___.',
    blankAnswers: ['Is'],
    options: ['Is', 'Does', 'Was', 'Has'],
    answer: 'Is',
    answerTranslation: L(
      'Is가 생략됐어요.',
      'Is tushirib qoldirilgan.',
      'Is is omitted.',
      'Опущено Is.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['workbook', 'omission'],
  },

  en_s2u6_n4_071_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '“So boring!” can be expanded to “___ so boring!”',
    blankAnswers: ['It was'],
    options: ['It was', 'Does it', 'They are', 'I do'],
    answer: 'It was',
    answerTranslation: L(
      'It was so boring!가 완전한 문장이에요.',
      'To‘liq shakli: It was so boring!',
      'The full sentence is It was so boring!',
      'Полная форма: It was so boring!',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['workbook', 'omission'],
  },

  en_s2u6_n4_072_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Which is the shorter informal version?',
      },
    ],
    options: [
      'Home now?',
      'Are you home now?',
      'You are home now.',
      'Were you home now?',
    ],
    answer: 'Home now?',
    answerTranslation: L(
      'Home now?가 더 짧은 비격식 표현이에요.',
      'Home now? qisqa norasmiy shakl.',
      'Home now? is the shorter informal version.',
      'Home now? — более короткая неформальная форма.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['workbook', 'informal-writing'],
  },

  en_s2u6_n4_073_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Which is the shorter informal version?',
      },
    ],
    options: [
      'Want to meet for coffee later?',
      'Do you want to meet for coffee later?',
      'You do want coffee later.',
      'Did you wanting coffee?',
    ],
    answer: 'Want to meet for coffee later?',
    answerTranslation: L(
      'Want to meet for coffee later?가 짧은 비격식 표현이에요.',
      'Want to meet for coffee later? qisqa norasmiy shakl.',
      'Want to meet for coffee later? is the shorter informal version.',
      'Want to meet for coffee later? — короткий неформальный вариант.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['workbook', 'informal-writing'],
  },

  en_s2u6_n4_074_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Which informal reply is most natural?',
      },
    ],
    options: [
      'Went there last year. Really beautiful.',
      'I went there last year. It is really beautiful and this is always required.',
      'Does went there last year.',
      'Was beautiful going there.',
    ],
    answer: 'Went there last year. Really beautiful.',
    answerTranslation: L(
      'Went there last year. Really beautiful.가 자연스러운 비격식 답장이에요.',
      'Went there last year. Really beautiful. tabiiy norasmiy javob.',
      'Went there last year. Really beautiful. is a natural informal reply.',
      'Went there last year. Really beautiful. — естественный неформальный ответ.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['workbook', 'informal-writing'],
  },

  en_s2u6_n4_075_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['I', 'want', 'to', 'go', 'to', 'Istanbul', 'in', 'April'],
    answer: 'I want to go to Istanbul in April',
    audioText: 'I want to go to Istanbul in April.',
    answerTranslation: L(
      '저는 4월에 Istanbul에 가고 싶어요.',
      'Men aprel oyida Istanbulga bormoqchiman.',
      'I want to go to Istanbul in April.',
      'Я хочу поехать в Стамбул в апреле.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['workbook', 'writing'],
  },

  en_s2u6_n4_076_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['Does', 'anyone', 'know', 'a', 'good', 'hotel', 'there'],
    answer: 'Does anyone know a good hotel there',
    answerTranslation: L(
      '그곳에 좋은 호텔을 아는 사람이 있나요?',
      'U yerda yaxshi mehmonxonani biladigan odam bormi?',
      'Does anyone know a good hotel there?',
      'Кто-нибудь знает там хороший отель?',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['workbook', 'writing'],
  },

  en_s2u6_n4_077_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'I’m watching a great programme about famous singers.',
    audioText: 'I’m watching a great programme about famous singers.',
    answerI18n: L(
      '저는 유명한 가수들에 대한 좋은 프로그램을 보고 있어요',
      'Men mashhur qo‘shiqchilar haqida ajoyib dastur ko‘ryapman',
      'I’m watching a great programme about famous singers',
      'Я смотрю отличную программу о знаменитых певцах',
    ),
    options: [
      'I’m',
      'watching',
      'a',
      'great',
      'programme',
      'about',
      'famous',
      'singers.',
    ],
    optionsI18n: {
      ko: [
        '저는',
        '유명한',
        '가수들에',
        '대한',
        '좋은',
        '프로그램을',
        '보고',
        '있어요',
      ],
      uz: [
        'Men',
        'mashhur',
        'qo‘shiqchilar',
        'haqida',
        'ajoyib',
        'dastur',
        'ko‘ryapman',
      ],
      en: [
        'I’m',
        'watching',
        'a',
        'great',
        'programme',
        'about',
        'famous',
        'singers.',
      ],
      ru: ['Я', 'смотрю', 'отличную', 'программу', 'о', 'знаменитых', 'певцах'],
    },
    answerTranslation: L(
      '저는 유명한 가수들에 대한 좋은 프로그램을 보고 있어요.',
      'Men mashhur qo‘shiqchilar haqida ajoyib dastur ko‘ryapman.',
      'I’m watching a great programme about famous singers.',
      'Я смотрю отличную программу о знаменитых певцах.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['workbook', 'writing'],
  },

  en_s2u6_n4_078_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Poor you! Want to meet for coffee later?',
    audioText: 'Poor you! Want to meet for coffee later?',
    answerI18n: L(
      '안됐네요! 나중에 커피 마실래요',
      'Voy, bechora! Keyinroq qahva ichib uchrashamizmi',
      'Poor you! Want to meet for coffee later',
      'Бедняга! Хочешь встретиться позже за кофе',
    ),
    options: ['Poor', 'you!', 'Want', 'to', 'meet', 'for', 'coffee', 'later?'],
    optionsI18n: {
      ko: ['안됐네요!', '나중에', '커피', '마실래요'],
      uz: ['Voy,', 'bechora!', 'Keyinroq', 'qahva', 'ichib', 'uchrashamizmi'],
      en: ['Poor', 'you!', 'Want', 'to', 'meet', 'for', 'coffee', 'later?'],
      ru: ['Бедняга!', 'Хочешь', 'встретиться', 'позже', 'за', 'кофе'],
    },
    answerTranslation: L(
      '안됐네요! 나중에 커피 마실래요?',
      'Voy, bechora! Keyinroq qahva ichib uchrashamizmi?',
      'Poor you! Want to meet for coffee later?',
      'Бедняга! Хочешь встретиться позже за кофе?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['workbook', 'informal-writing'],
  },

  en_s2u6_n4_079_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Want to go to Istanbul in April. Anyone know a good hotel there?',
    audioText:
      'Want to go to Istanbul in April. Anyone know a good hotel there?',
    answerTranslation: L(
      '4월에 Istanbul에 가고 싶어요. 거기 좋은 호텔 아는 사람 있나요?',
      'Aprelda Istanbulga bormoqchiman. U yerda yaxshi mehmonxonani biladigan bormi?',
      'Want to go to Istanbul in April. Anyone know a good hotel there?',
      'Хочу поехать в Стамбул в апреле. Кто-нибудь знает там хороший отель?',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['workbook', 'tweet'],
  },

  en_s2u6_n4_080_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'In Unit 6.4, we show interest when listening and write short informal tweets or text messages by leaving out words when the meaning is clear.',
    audioText:
      'In Unit 6.4, we show interest when listening and write short informal tweets or text messages by leaving out words when the meaning is clear.',
    answerTranslation: L(
      'Unit 6.4에서는 듣는 사람으로서 관심을 표현하고 의미가 분명할 때 일부 단어를 생략해 짧은 트윗이나 문자를 쓰는 방법을 배워요.',
      'Unit 6.4 da tinglovchi sifatida qiziqish bildirish va ma’no aniq bo‘lsa, ayrim so‘zlarni tushirib qisqa tweet yoki xabar yozishni o‘rganamiz.',
      'In Unit 6.4, we show interest when listening and write short informal tweets or text messages by leaving out words when the meaning is clear.',
      'В Unit 6.4 мы учимся проявлять интерес как слушатель и писать короткие неформальные твиты и сообщения, опуская понятные из контекста слова.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit6', 'node-review'],
  },
};

// ─────────────────────────────────────────────────────────────
// Node 4
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT6_NODE4 = {
  title: L(
    '듣는 사람으로 관심 보이기와 짧은 메시지',
    'Tinglovchi sifatida qiziqish va qisqa xabarlar',
    'Showing interest and writing short messages',
    'Проявление интереса и короткие сообщения',
  ),
  section: 2,
  unit: 6,
  order: 4,
  isActive: true,

  lessons: [
    {
      title: L(
        '듣는 사람으로 관심 보이기',
        'Tinglovchi sifatida qiziqish bildirish',
        'Showing interest as a listener',
        'Как показать интерес слушателю',
      ),
      description: L(
        '좋은 소식, 나쁜 소식과 흥미로운 소식에 That’s brilliant!, Poor you!, Really? 같은 표현으로 자연스럽게 반응해요.',
        'Yaxshi, yomon va qiziq xabarlarga That’s brilliant!, Poor you!, Really? kabi iboralar bilan javob berasiz.',
        'Respond naturally to good, bad and interesting news.',
        'Учимся естественно реагировать на хорошие, плохие и интересные новости.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 1,
      questions: [
        'en_s2u6_n4_001_word_matching',
        'en_s2u6_n4_002_dialog_complete',
        'en_s2u6_n4_003_dialog_complete',
        'en_s2u6_n4_004_dialog_complete',
        'en_s2u6_n4_005_dialog_complete',
        'en_s2u6_n4_006_dialog_complete',
        'en_s2u6_n4_007_dialog_complete',
        'en_s2u6_n4_008_dialog_complete',
        'en_s2u6_n4_009_dialog_complete',
        'en_s2u6_n4_010_fill_in_blank',
        'en_s2u6_n4_011_fill_in_blank',
        'en_s2u6_n4_012_fill_in_blank',
        'en_s2u6_n4_013_dialog_complete',
        'en_s2u6_n4_014_dialog_complete',
        'en_s2u6_n4_015_dialog_complete',
        'en_s2u6_n4_016_word_arrange',
        'en_s2u6_n4_017_translate_builder',
        'en_s2u6_n4_018_sentence_builder',
        'en_s2u6_n4_019_speaking',
        'en_s2u6_n4_020_speaking',
      ],
    },

    {
      title: L(
        '좋은·나쁜·흥미로운 소식에 반응하기',
        'Yaxshi, yomon va qiziq xabarlarga javob',
        'Responding to different kinds of news',
        'Реакции на разные новости',
      ),
      description: L(
        'Workbook의 실제 상황을 이용해 소식의 종류를 구분하고 가장 자연스러운 반응을 선택해요.',
        'Workbook vaziyatlari orqali xabar turini aniqlab, eng tabiiy javobni tanlaysiz.',
        'Use Workbook situations to choose suitable listener reactions.',
        'Выбираем подходящие реакции на ситуации из Workbook.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 2,
      questions: [
        'en_s2u6_n4_021_dialog_complete',
        'en_s2u6_n4_022_dialog_complete',
        'en_s2u6_n4_023_dialog_complete',
        'en_s2u6_n4_024_dialog_complete',
        'en_s2u6_n4_025_dialog_complete',
        'en_s2u6_n4_026_dialog_complete',
        'en_s2u6_n4_027_fill_in_blank',
        'en_s2u6_n4_028_fill_in_blank',
        'en_s2u6_n4_029_fill_in_blank',
        'en_s2u6_n4_030_fill_in_blank',
        'en_s2u6_n4_031_dialog_complete',
        'en_s2u6_n4_032_dialog_complete',
        'en_s2u6_n4_033_dialog_complete',
        'en_s2u6_n4_034_dialog_complete',
        'en_s2u6_n4_035_dialog_complete',
        'en_s2u6_n4_036_word_arrange',
        'en_s2u6_n4_037_translate_builder',
        'en_s2u6_n4_038_sentence_builder',
        'en_s2u6_n4_039_speaking',
        'en_s2u6_n4_040_speaking',
      ],
    },

    {
      title: L(
        '트윗과 문자 메시지 쓰기',
        'Tweet va qisqa xabar yozish',
        'Writing a tweet or text message',
        'Написание твита или сообщения',
      ),
      description: L(
        '정보 묻기, 짧은 이야기 말하기, 의견 표현하기를 익히고 비격식 글에서 생략할 수 있는 단어를 배워요.',
        'Ma’lumot so‘rash, qisqa hikoya va fikr yozishni hamda norasmiy yozuvda tushiriladigan so‘zlarni o‘rganasiz.',
        'Practise asking for information, telling short stories, giving opinions and omitting words in informal writing.',
        'Учимся спрашивать информацию, рассказывать короткие истории, выражать мнение и опускать слова.',
      ),
      category: LessonCategory.EXPRESSION,
      level: LV,
      order: 3,
      questions: [
        'en_s2u6_n4_041_dialog_complete',
        'en_s2u6_n4_042_dialog_complete',
        'en_s2u6_n4_043_dialog_complete',
        'en_s2u6_n4_044_dialog_complete',
        'en_s2u6_n4_045_dialog_complete',
        'en_s2u6_n4_046_dialog_complete',
        'en_s2u6_n4_047_fill_in_blank',
        'en_s2u6_n4_048_fill_in_blank',
        'en_s2u6_n4_049_fill_in_blank',
        'en_s2u6_n4_050_fill_in_blank',
        'en_s2u6_n4_051_fill_in_blank',
        'en_s2u6_n4_052_fill_in_blank',
        'en_s2u6_n4_053_dialog_complete',
        'en_s2u6_n4_054_dialog_complete',
        'en_s2u6_n4_055_dialog_complete',
        'en_s2u6_n4_056_word_arrange',
        'en_s2u6_n4_057_translate_builder',
        'en_s2u6_n4_058_sentence_builder',
        'en_s2u6_n4_059_speaking',
        'en_s2u6_n4_060_speaking',
      ],
    },

    {
      title: L(
        '짧은 메시지 완성하기',
        'Qisqa xabarlarni to‘ldirish',
        'Completing informal messages',
        'Дополнение неформальных сообщений',
      ),
      description: L(
        'Workbook의 tweet/text 문제를 이용해 생략된 I, I’m, Does, Is, It was 등을 복원하고 자연스러운 짧은 답장을 연습해요.',
        'Workbook tweet va xabarlari orqali tushirilgan I, I’m, Does, Is, It was shakllarini tiklab, qisqa javoblarni mashq qilasiz.',
        'Restore omitted words and practise natural short replies using the Workbook messages.',
        'Восстанавливаем пропущенные слова и тренируем короткие ответы по Workbook.',
      ),
      category: LessonCategory.EXPRESSION,
      level: LV,
      order: 4,
      questions: [
        'en_s2u6_n4_061_dialog_complete',
        'en_s2u6_n4_062_dialog_complete',
        'en_s2u6_n4_063_dialog_complete',
        'en_s2u6_n4_064_dialog_complete',
        'en_s2u6_n4_065_dialog_complete',
        'en_s2u6_n4_066_dialog_complete',
        'en_s2u6_n4_067_fill_in_blank',
        'en_s2u6_n4_068_fill_in_blank',
        'en_s2u6_n4_069_fill_in_blank',
        'en_s2u6_n4_070_fill_in_blank',
        'en_s2u6_n4_071_fill_in_blank',
        'en_s2u6_n4_072_dialog_complete',
        'en_s2u6_n4_073_dialog_complete',
        'en_s2u6_n4_074_dialog_complete',
        'en_s2u6_n4_075_word_arrange',
        'en_s2u6_n4_076_translate_builder',
        'en_s2u6_n4_077_sentence_builder',
        'en_s2u6_n4_078_sentence_builder',
        'en_s2u6_n4_079_speaking',
        'en_s2u6_n4_080_speaking',
      ],
    },
  ],
};
// ─────────────────────────────────────────────────────────────
// Section 2 · Unit 6 · Node 5
// 6.5 Video + Listening for pleasure + Unit 6 Review
//
// Coverage
//
// Coursebook:
// - Istanbul video
// - Istanbul landmarks and city vocabulary
// - ancient buildings, mosques, ferries, bazaars
// - the Bosphorus
// - describing a past visit
// - Unit 6 Review
// - was / were
// - past time expressions
// - present simple vs past simple
// - Vincent van Gogh reading
// - common verb collocations
// - adverbs of degree
// - responding to news
//
// Workbook:
// - A guided tour of Stratford-upon-Avon
// - William Shakespeare
// - Shakespeare's birthplace
// - Nash's House
// - The Grammar School
// - Royal Shakespeare Theatre
// - Bancroft Gardens
// - Review: Units 5 and 6
//
// IMPORTANT:
// *_WORDS에는 단일 headword만 등록.
// "Grand Bazaar", "Royal Shakespeare Theatre",
// "tourist information centre", "past simple" 등은
// WORD로 등록하지 않음.
//
// 기존 Node에서 등록한 단어는 재등록하지 않음.
//
// 4 lessons × 20 questions = 80
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT6_NODE5_WORDS = [
  {
    code: 'en-adjective-ancient',
    english: 'ancient',
    senseKey: 'belonging-to-very-distant-past',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '고대의; 아주 오래된',
      'qadimiy',
      'belonging to a very distant time in the past',
      'древний',
    ),
    examples: [
      {
        english: 'Istanbul has many ancient buildings.',
        translations: L(
          '이스탄불에는 고대 건물이 많아요.',
          'Istanbulda ko‘plab qadimiy binolar bor.',
          'Istanbul has many ancient buildings.',
          'В Стамбуле много древних зданий.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈeɪnʃənt/',
      ttsText: 'ancient',
    },
    tags: ['history', 'travel', 'unit6'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-mosque',
    english: 'mosque',
    senseKey: 'building-used-for-muslim-prayer',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '모스크; 이슬람 사원',
      'masjid',
      'a building where Muslims pray',
      'мечеть',
    ),
    examples: [
      {
        english: 'There are many mosques in Istanbul.',
        translations: L(
          '이스탄불에는 모스크가 많아요.',
          'Istanbulda ko‘plab masjidlar bor.',
          'There are many mosques in Istanbul.',
          'В Стамбуле много мечетей.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/mɒsk/',
      ttsText: 'mosque',
    },
    tags: ['places', 'travel', 'unit6'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-dome',
    english: 'dome',
    senseKey: 'rounded-roof-of-building',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '돔; 둥근 지붕',
      'gumbaz',
      'a rounded roof on a building',
      'купол',
    ),
    examples: [
      {
        english: 'The building has a large dome.',
        translations: L(
          '그 건물에는 큰 돔이 있어요.',
          'Binoning katta gumbazi bor.',
          'The building has a large dome.',
          'У здания большой купол.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/dəʊm/',
      ttsText: 'dome',
    },
    tags: ['buildings', 'unit6'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-ferry',
    english: 'ferry',
    senseKey: 'boat-carrying-passengers-across-water',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '페리; 여객선',
      'parom',
      'a boat that carries passengers or vehicles across water',
      'паром',
    ),
    examples: [
      {
        english: 'We travelled by ferry.',
        translations: L(
          '우리는 페리를 타고 이동했어요.',
          'Biz paromda sayohat qildik.',
          'We travelled by ferry.',
          'Мы путешествовали на пароме.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈferi/',
      ttsText: 'ferry',
    },
    tags: ['transport', 'travel', 'unit6'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-strait',
    english: 'strait',
    senseKey: 'narrow-stretch-of-sea-between-land',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '해협',
      'bo‘g‘oz',
      'a narrow area of sea connecting larger bodies of water',
      'пролив',
    ),
    examples: [
      {
        english: 'The Bosphorus is a strait.',
        translations: L(
          '보스포루스는 해협이에요.',
          'Bosfor bo‘g‘oz hisoblanadi.',
          'The Bosphorus is a strait.',
          'Босфор — это пролив.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/streɪt/',
      ttsText: 'strait',
    },
    tags: ['geography', 'travel', 'unit6'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-bazaar',
    english: 'bazaar',
    senseKey: 'market-with-many-small-shops-or-stalls',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '시장; 바자르',
      'bozor',
      'a market with many small shops or stalls',
      'базар',
    ),
    examples: [
      {
        english: 'The Grand Bazaar is in Istanbul.',
        translations: L(
          '그랜드 바자르는 이스탄불에 있어요.',
          'Grand Bazaar Istanbulda joylashgan.',
          'The Grand Bazaar is in Istanbul.',
          'Гранд-базар находится в Стамбуле.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/bəˈzɑː/',
      ttsText: 'bazaar',
    },
    tags: ['shopping', 'travel', 'unit6'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-souvenir',
    english: 'souvenir',
    senseKey: 'object-bought-to-remember-place-or-event',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '기념품',
      'esdalik sovg‘a',
      'an object bought or kept to remember a place or event',
      'сувенир',
    ),
    examples: [
      {
        english: 'I bought a souvenir at the market.',
        translations: L(
          '저는 시장에서 기념품을 샀어요.',
          'Men bozordan esdalik sovg‘a sotib oldim.',
          'I bought a souvenir at the market.',
          'Я купил сувенир на рынке.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌsuːvəˈnɪə/',
      ttsText: 'souvenir',
    },
    tags: ['shopping', 'travel', 'unit6'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-spice',
    english: 'spice',
    senseKey: 'substance-used-to-add-flavour-to-food',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '향신료',
      'ziravor',
      'a substance used to add flavour to food',
      'специя',
    ),
    examples: [
      {
        english: 'The market sells many spices.',
        translations: L(
          '그 시장에서는 여러 향신료를 팔아요.',
          'Bozorda ko‘plab ziravorlar sotiladi.',
          'The market sells many spices.',
          'На рынке продают много специй.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/spaɪs/',
      ttsText: 'spice',
    },
    tags: ['food', 'shopping', 'unit6'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-herb',
    english: 'herb',
    senseKey: 'plant-used-in-food-or-medicine',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '허브; 약초',
      'giyoh',
      'a plant used to add flavour to food or as medicine',
      'трава; пряная зелень',
    ),
    examples: [
      {
        english: 'They sell herbs and spices.',
        translations: L(
          '그들은 허브와 향신료를 팔아요.',
          'Ular giyohlar va ziravorlar sotishadi.',
          'They sell herbs and spices.',
          'Они продают травы и специи.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/hɜːb/',
      ttsText: 'herb',
    },
    tags: ['food', 'shopping', 'unit6'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-resident',
    english: 'resident',
    senseKey: 'person-who-lives-in-particular-place',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '거주자; 주민',
      'yashovchi',
      'a person who lives in a particular place',
      'житель',
    ),
    examples: [
      {
        english: 'Residents live in the city.',
        translations: L(
          '주민들은 그 도시에 살아요.',
          'Yashovchilar shaharda istiqomat qiladi.',
          'Residents live in the city.',
          'Жители живут в городе.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈrezɪdənt/',
      ttsText: 'resident',
    },
    tags: ['cities', 'travel', 'unit6'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-fisherman',
    english: 'fisherman',
    senseKey: 'person-whose-job-is-catching-fish',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '어부',
      'baliqchi',
      'a person who catches fish, especially as a job',
      'рыбак',
    ),
    examples: [
      {
        english: 'The fisherman works on the water.',
        translations: L(
          '어부는 물 위에서 일해요.',
          'Baliqchi suvda ishlaydi.',
          'The fisherman works on the water.',
          'Рыбак работает на воде.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈfɪʃəmən/',
      ttsText: 'fisherman',
    },
    tags: ['jobs', 'travel', 'unit6'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-poet',
    english: 'poet',
    senseKey: 'person-who-writes-poems',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('시인', 'shoir', 'a person who writes poems', 'поэт'),
    examples: [
      {
        english: 'William Shakespeare was a famous English poet.',
        translations: L(
          '윌리엄 셰익스피어는 유명한 영국 시인이었어요.',
          'William Shakespeare mashhur ingliz shoiri edi.',
          'William Shakespeare was a famous English poet.',
          'Уильям Шекспир был известным английским поэтом.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈpəʊɪt/',
      ttsText: 'poet',
    },
    tags: ['literature', 'unit6'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-actor',
    english: 'actor',
    senseKey: 'person-who-performs-in-plays-or-films',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '배우',
      'aktyor',
      'a person who performs in plays or films',
      'актёр',
    ),
    examples: [
      {
        english: 'Shakespeare was also an actor.',
        translations: L(
          '셰익스피어는 배우이기도 했어요.',
          'Shakespeare aktyor ham bo‘lgan.',
          'Shakespeare was also an actor.',
          'Шекспир также был актёром.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈæktə/',
      ttsText: 'actor',
    },
    tags: ['literature', 'jobs', 'unit6'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-play',
    english: 'play',
    senseKey: 'dramatic-work-performed-in-theatre',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '연극; 희곡',
      'pyesa',
      'a story performed by actors in a theatre',
      'пьеса; спектакль',
    ),
    examples: [
      {
        english: 'Shakespeare wrote many plays.',
        translations: L(
          '셰익스피어는 많은 희곡을 썼어요.',
          'Shakespeare ko‘plab pyesalar yozgan.',
          'Shakespeare wrote many plays.',
          'Шекспир написал много пьес.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/pleɪ/',
      ttsText: 'play',
    },
    tags: ['literature', 'theatre', 'unit6'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-birthplace',
    english: 'birthplace',
    senseKey: 'place-where-person-was-born',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '출생지',
      'tug‘ilgan joy',
      'the place where a person was born',
      'место рождения',
    ),
    examples: [
      {
        english: 'We visited Shakespeare’s birthplace.',
        translations: L(
          '우리는 셰익스피어의 생가를 방문했어요.',
          'Biz Shakespearening tug‘ilgan joyiga bordik.',
          'We visited Shakespeare’s birthplace.',
          'Мы посетили место рождения Шекспира.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈbɜːθpleɪs/',
      ttsText: 'birthplace',
    },
    tags: ['history', 'travel', 'unit6'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-granddaughter',
    english: 'granddaughter',
    senseKey: 'daughter-of-persons-son-or-daughter',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '손녀; 외손녀',
      'nabira qiz',
      'the daughter of someone’s son or daughter',
      'внучка',
    ),
    examples: [
      {
        english: 'Shakespeare’s granddaughter lived in Nash’s House.',
        translations: L(
          '셰익스피어의 손녀는 Nash’s House에 살았어요.',
          'Shakespearening nabira qizi Nash’s Houseda yashagan.',
          'Shakespeare’s granddaughter lived in Nash’s House.',
          'Внучка Шекспира жила в доме Нэша.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈɡrændɔːtə/',
      ttsText: 'granddaughter',
    },
    tags: ['family', 'history', 'unit6'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-tour',
    english: 'tour',
    senseKey: 'visit-to-several-places-with-purpose',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '관광; 투어',
      'sayohat',
      'a visit to several places for interest or pleasure',
      'экскурсия',
    ),
    examples: [
      {
        english: 'We enjoyed our tour of Stratford-upon-Avon.',
        translations: L(
          '우리는 스트랫퍼드어폰에이번 투어를 즐겼어요.',
          'Biz Stratford-upon-Avon bo‘ylab sayohatimizdan zavq oldik.',
          'We enjoyed our tour of Stratford-upon-Avon.',
          'Нам понравилась экскурсия по Стратфорду-на-Эйвоне.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/tʊə/',
      ttsText: 'tour',
    },
    tags: ['travel', 'unit6'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-guide',
    english: 'guide',
    senseKey: 'person-who-shows-visitors-around-place',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '가이드; 안내인',
      'gid',
      'a person who shows visitors around a place',
      'гид',
    ),
    examples: [
      {
        english: 'The guide showed us the town.',
        translations: L(
          '가이드는 우리에게 마을을 안내했어요.',
          'Gid bizga shaharchani ko‘rsatdi.',
          'The guide showed us the town.',
          'Гид показал нам город.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɡaɪd/',
      ttsText: 'guide',
    },
    tags: ['travel', 'unit6'],
    difficulty: 1,
    isCore: true,
  },
];

export const EN_S2_UNIT6_NODE5_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Istanbul
  // ===========================================================

  en_s2u6_n5_001_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'mosque',
        native: 'masjid',
        nativeI18n: L('모스크', 'masjid', 'mosque', 'мечеть'),
      },
      {
        text: 'dome',
        native: 'gumbaz',
        nativeI18n: L('돔', 'gumbaz', 'dome', 'купол'),
      },
      {
        text: 'ferry',
        native: 'parom',
        nativeI18n: L('페리', 'parom', 'ferry', 'паром'),
      },
      {
        text: 'strait',
        native: 'bo‘g‘oz',
        nativeI18n: L('해협', 'bo‘g‘oz', 'strait', 'пролив'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['istanbul', 'video'],
  },

  en_s2u6_n5_002_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'bazaar',
        native: 'bozor',
        nativeI18n: L('시장', 'bozor', 'bazaar', 'базар'),
      },
      {
        text: 'souvenir',
        native: 'esdalik sovg‘a',
        nativeI18n: L('기념품', 'esdalik sovg‘a', 'souvenir', 'сувенир'),
      },
      {
        text: 'spice',
        native: 'ziravor',
        nativeI18n: L('향신료', 'ziravor', 'spice', 'специя'),
      },
      {
        text: 'herb',
        native: 'giyoh',
        nativeI18n: L('허브', 'giyoh', 'herb', 'трава'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['istanbul', 'market'],
  },

  en_s2u6_n5_003_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Istanbul has many ___ buildings.',
    blankAnswers: ['ancient'],
    options: ['ancient', 'quickly', 'carefully', 'yesterday'],
    answer: 'ancient',
    answerTranslation: L(
      '이스탄불에는 고대 건물이 많아요.',
      'Istanbulda ko‘plab qadimiy binolar bor.',
      'Istanbul has many ancient buildings.',
      'В Стамбуле много древних зданий.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['istanbul', 'ancient'],
  },

  en_s2u6_n5_004_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A ___ is a building where Muslims pray.',
    blankAnswers: ['mosque'],
    options: ['mosque', 'ferry', 'strait', 'souvenir'],
    answer: 'mosque',
    answerTranslation: L(
      '모스크는 무슬림이 기도하는 건물이에요.',
      'Masjid musulmonlar ibodat qiladigan bino.',
      'A mosque is a building where Muslims pray.',
      'Мечеть — это здание, где молятся мусульмане.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['istanbul', 'mosque'],
  },

  en_s2u6_n5_005_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A rounded roof on a building is called a ___.',
    blankAnswers: ['dome'],
    options: ['dome', 'market', 'ferry', 'spice'],
    answer: 'dome',
    answerTranslation: L(
      '건물의 둥근 지붕을 돔이라고 해요.',
      'Binoning yumaloq tomi gumbaz deyiladi.',
      'A rounded roof on a building is called a dome.',
      'Округлая крыша здания называется куполом.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['istanbul', 'buildings'],
  },

  en_s2u6_n5_006_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'What is the strait that divides Istanbul called?',
      },
    ],
    options: [
      'The Bosphorus.',
      'The River Thames.',
      'The River Avon.',
      'The Nile.',
    ],
    answer: 'The Bosphorus.',
    answerTranslation: L(
      '보스포루스 해협이에요.',
      'Bosfor bo‘g‘ozi.',
      'The Bosphorus.',
      'Босфор.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['istanbul', 'bosphorus'],
  },

  en_s2u6_n5_007_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'People can travel across the water by ___.',
    blankAnswers: ['ferry'],
    options: ['ferry', 'mosque', 'bazaar', 'dome'],
    answer: 'ferry',
    answerTranslation: L(
      '사람들은 페리를 타고 물을 건널 수 있어요.',
      'Odamlar suvdan parom bilan o‘tishi mumkin.',
      'People can travel across the water by ferry.',
      'Люди могут пересекать воду на пароме.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['istanbul', 'transport'],
  },

  en_s2u6_n5_008_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Which famous market is mentioned in the Istanbul exercise?',
      },
    ],
    options: [
      'The Grand Bazaar.',
      'Camden Market.',
      'Borough Market.',
      'Portobello Road Market.',
    ],
    answer: 'The Grand Bazaar.',
    answerTranslation: L(
      '그랜드 바자르예요.',
      'Grand Bazaar.',
      'The Grand Bazaar.',
      'Гранд-базар.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['istanbul', 'bazaar'],
  },

  en_s2u6_n5_009_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Tourists often buy ___ to remember a place.',
    blankAnswers: ['souvenirs'],
    options: ['souvenirs', 'meetings', 'salaries', 'lessons'],
    answer: 'souvenirs',
    answerTranslation: L(
      '관광객들은 장소를 기억하기 위해 기념품을 자주 사요.',
      'Sayyohlar joyni eslab qolish uchun esdalik sovg‘alar sotib olishadi.',
      'Tourists often buy souvenirs to remember a place.',
      'Туристы часто покупают сувениры на память о месте.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['istanbul', 'shopping'],
  },

  en_s2u6_n5_010_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Markets can sell herbs and ___.',
    blankAnswers: ['spices'],
    options: ['spices', 'offices', 'tickets', 'emails'],
    answer: 'spices',
    answerTranslation: L(
      '시장에서는 허브와 향신료를 팔 수 있어요.',
      'Bozorlarda giyohlar va ziravorlar sotilishi mumkin.',
      'Markets can sell herbs and spices.',
      'На рынках могут продавать травы и специи.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['istanbul', 'market'],
  },

  en_s2u6_n5_011_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A person who lives in a particular city is a ___.',
    blankAnswers: ['resident'],
    options: ['resident', 'souvenir', 'dome', 'strait'],
    answer: 'resident',
    answerTranslation: L(
      '특정 도시에 사는 사람은 주민이에요.',
      'Muayyan shaharda yashaydigan odam rezident hisoblanadi.',
      'A person who lives in a particular city is a resident.',
      'Человек, живущий в определённом городе, — его житель.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['istanbul', 'resident'],
  },

  en_s2u6_n5_012_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A person whose job is catching fish is a ___.',
    blankAnswers: ['fisherman'],
    options: ['fisherman', 'resident', 'tourist', 'pilot'],
    answer: 'fisherman',
    answerTranslation: L(
      '물고기를 잡는 일을 하는 사람은 어부예요.',
      'Baliq ovlash bilan shug‘ullanadigan odam baliqchi.',
      'A person whose job is catching fish is a fisherman.',
      'Человек, который занимается ловлей рыбы, — рыбак.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['istanbul', 'jobs'],
  },

  en_s2u6_n5_013_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'What information should you include when describing a city?',
      },
    ],
    options: [
      'Its history, famous places and modern life.',
      'Only the weather today.',
      'Only the price of one ticket.',
      'Only the names of residents.',
    ],
    answer: 'Its history, famous places and modern life.',
    answerTranslation: L(
      '도시의 역사, 유명한 장소와 현대 생활이에요.',
      'Shahar tarixi, mashhur joylari va zamonaviy hayoti.',
      'Its history, famous places and modern life.',
      'Его историю, известные места и современную жизнь.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['istanbul', 'video'],
  },

  en_s2u6_n5_014_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'You visited Istanbul last week. What should you include in an email about your visit?',
      },
    ],
    options: [
      'Where you stayed, what you did and saw, what you ate and your opinion.',
      'Only the date of your next lesson.',
      'Only your address.',
      'Only the weather forecast.',
    ],
    answer:
      'Where you stayed, what you did and saw, what you ate and your opinion.',
    answerTranslation: L(
      '숙박 장소, 한 일과 본 것, 먹은 것과 자신의 의견을 포함해요.',
      'Qayerda qolganingiz, nima qilganingiz va ko‘rganingiz, nima yeganingiz hamda fikringizni.',
      'Where you stayed, what you did and saw, what you ate and your opinion.',
      'Где вы остановились, что делали и видели, что ели и ваше мнение.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['istanbul', 'writing'],
  },

  en_s2u6_n5_015_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I ___ Istanbul last week.',
    blankAnswers: ['visited'],
    options: ['visited', 'visit', 'visits', 'visiting'],
    answer: 'visited',
    answerTranslation: L(
      '저는 지난주에 이스탄불을 방문했어요.',
      'Men o‘tgan hafta Istanbulga bordim.',
      'I visited Istanbul last week.',
      'Я посетил Стамбул на прошлой неделе.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['istanbul', 'past-simple'],
  },

  en_s2u6_n5_016_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['We', 'travelled', 'by', 'ferry', 'in', 'Istanbul'],
    answer: 'We travelled by ferry in Istanbul',
    audioText: 'We travelled by ferry in Istanbul.',
    answerTranslation: L(
      '우리는 이스탄불에서 페리를 타고 이동했어요.',
      'Biz Istanbulda paromda sayohat qildik.',
      'We travelled by ferry in Istanbul.',
      'Мы путешествовали на пароме в Стамбуле.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['istanbul', 'past-simple'],
  },

  en_s2u6_n5_017_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['I', 'bought', 'a', 'souvenir', 'at', 'the', 'market'],
    answer: 'I bought a souvenir at the market',
    answerTranslation: L(
      '저는 시장에서 기념품을 샀어요.',
      'Men bozordan esdalik sovg‘a sotib oldim.',
      'I bought a souvenir at the market.',
      'Я купил сувенир на рынке.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['istanbul', 'shopping'],
  },

  en_s2u6_n5_018_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'I visited the Grand Bazaar and bought some souvenirs.',
    audioText: 'I visited the Grand Bazaar and bought some souvenirs.',
    answerI18n: L(
      '저는 그랜드 바자르를 방문하고 기념품을 샀어요',
      'Men Grand Bazaarni ko‘rib, esdalik sovg‘alar sotib oldim',
      'I visited the Grand Bazaar and bought some souvenirs',
      'Я посетил Гранд-базар и купил сувениры',
    ),
    options: [
      'I',
      'visited',
      'the',
      'Grand',
      'Bazaar',
      'and',
      'bought',
      'some',
      'souvenirs.',
    ],
    optionsI18n: {
      ko: ['저는', '그랜드', '바자르를', '방문하고', '기념품을', '샀어요'],
      uz: [
        'Men',
        'Grand',
        'Bazaarni',
        'ko‘rib,',
        'esdalik',
        'sovg‘alar',
        'sotib',
        'oldim',
      ],
      en: [
        'I',
        'visited',
        'the',
        'Grand',
        'Bazaar',
        'and',
        'bought',
        'some',
        'souvenirs.',
      ],
      ru: ['Я', 'посетил', 'Гранд-базар', 'и', 'купил', 'сувениры'],
    },
    answerTranslation: L(
      '저는 그랜드 바자르를 방문하고 기념품을 샀어요.',
      'Men Grand Bazaarni ko‘rib, esdalik sovg‘alar sotib oldim.',
      'I visited the Grand Bazaar and bought some souvenirs.',
      'Я посетил Гранд-базар и купил сувениры.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['istanbul', 'writing'],
  },

  en_s2u6_n5_019_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Istanbul has ancient buildings, famous mosques, busy markets and ferries on the Bosphorus.',
    audioText:
      'Istanbul has ancient buildings, famous mosques, busy markets and ferries on the Bosphorus.',
    answerTranslation: L(
      '이스탄불에는 고대 건물, 유명한 모스크, 붐비는 시장과 보스포루스 해협의 페리가 있어요.',
      'Istanbulda qadimiy binolar, mashhur masjidlar, gavjum bozorlar va Bosforda paromlar bor.',
      'Istanbul has ancient buildings, famous mosques, busy markets and ferries on the Bosphorus.',
      'В Стамбуле есть древние здания, известные мечети, оживлённые рынки и паромы на Босфоре.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['istanbul', 'video'],
  },

  en_s2u6_n5_020_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Last week I went to Istanbul. I visited the market, saw some beautiful buildings and enjoyed the trip.',
    audioText:
      'Last week I went to Istanbul. I visited the market, saw some beautiful buildings and enjoyed the trip.',
    answerTranslation: L(
      '지난주에 이스탄불에 갔어요. 시장을 방문하고 아름다운 건물을 구경했으며 여행을 즐겼어요.',
      'O‘tgan hafta Istanbulga bordim. Bozorga bordim, chiroyli binolarni ko‘rdim va sayohatdan zavq oldim.',
      'Last week I went to Istanbul. I visited the market, saw some beautiful buildings and enjoyed the trip.',
      'На прошлой неделе я поехал в Стамбул. Посетил рынок, увидел красивые здания и получил удовольствие от поездки.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['istanbul', 'past-simple'],
  },

  // ===========================================================
  // Lesson 2 · Shakespeare and Stratford-upon-Avon
  // ===========================================================

  en_s2u6_n5_021_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'poet',
        native: 'shoir',
        nativeI18n: L('시인', 'shoir', 'poet', 'поэт'),
      },
      {
        text: 'actor',
        native: 'aktyor',
        nativeI18n: L('배우', 'aktyor', 'actor', 'актёр'),
      },
      {
        text: 'play',
        native: 'pyesa',
        nativeI18n: L('희곡', 'pyesa', 'play', 'пьеса'),
      },
      {
        text: 'birthplace',
        native: 'tug‘ilgan joy',
        nativeI18n: L(
          '출생지',
          'tug‘ilgan joy',
          'birthplace',
          'место рождения',
        ),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['shakespeare', 'listening'],
  },

  en_s2u6_n5_022_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'tour',
        native: 'sayohat',
        nativeI18n: L('투어', 'sayohat', 'tour', 'экскурсия'),
      },
      {
        text: 'guide',
        native: 'gid',
        nativeI18n: L('가이드', 'gid', 'guide', 'гид'),
      },
      {
        text: 'granddaughter',
        native: 'nabira qiz',
        nativeI18n: L('손녀', 'nabira qiz', 'granddaughter', 'внучка'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['stratford', 'listening'],
  },

  en_s2u6_n5_023_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'William Shakespeare was a famous English poet, ___ and actor.',
    blankAnswers: ['writer'],
    options: ['writer', 'pilot', 'farmer', 'mechanic'],
    answer: 'writer',
    answerTranslation: L(
      '윌리엄 셰익스피어는 유명한 영국 시인, 작가이자 배우였어요.',
      'William Shakespeare mashhur ingliz shoiri, yozuvchisi va aktyori edi.',
      'William Shakespeare was a famous English poet, writer and actor.',
      'Уильям Шекспир был известным английским поэтом, писателем и актёром.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['shakespeare', 'workbook'],
  },

  en_s2u6_n5_024_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'During his life, Shakespeare wrote many ___.',
    blankAnswers: ['plays'],
    options: ['plays', 'emails', 'newspapers', 'messages'],
    answer: 'plays',
    answerTranslation: L(
      '셰익스피어는 생전에 많은 희곡을 썼어요.',
      'Shakespeare hayoti davomida ko‘plab pyesalar yozgan.',
      'During his life, Shakespeare wrote many plays.',
      'За свою жизнь Шекспир написал много пьес.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['shakespeare', 'workbook'],
  },

  en_s2u6_n5_025_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Some of Shakespeare’s plays are now ___.',
    blankAnswers: ['films'],
    options: ['films', 'coins', 'souvenirs', 'ferries'],
    answer: 'films',
    answerTranslation: L(
      '셰익스피어의 일부 희곡은 지금 영화로 만들어졌어요.',
      'Shakespearening ayrim pyesalari hozir filmga aylantirilgan.',
      'Some of Shakespeare’s plays are now films.',
      'Некоторые пьесы Шекспира теперь стали фильмами.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['shakespeare', 'workbook'],
  },

  en_s2u6_n5_026_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'In which English town was Shakespeare born?',
      },
    ],
    options: ['Stratford-upon-Avon.', 'London.', 'Oxford.', 'Cambridge.'],
    answer: 'Stratford-upon-Avon.',
    answerTranslation: L(
      '스트랫퍼드어폰에이번이에요.',
      'Stratford-upon-Avon.',
      'Stratford-upon-Avon.',
      'Стратфорд-на-Эйвоне.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['shakespeare', 'birthplace'],
  },

  en_s2u6_n5_027_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Shakespeare died in ___.',
    blankAnswers: ['1616'],
    options: ['1616', '1816', '1916', '2016'],
    answer: '1616',
    answerTranslation: L(
      '셰익스피어는 1616년에 세상을 떠났어요.',
      'Shakespeare 1616-yilda vafot etgan.',
      'Shakespeare died in 1616.',
      'Шекспир умер в 1616 году.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['shakespeare', 'history'],
  },

  en_s2u6_n5_028_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'How old was Shakespeare when he died?',
      },
    ],
    options: ['Fifty-two.', 'Forty-two.', 'Sixty-two.', 'Seventy-two.'],
    answer: 'Fifty-two.',
    answerTranslation: L(
      '52세였어요.',
      '52 yoshda.',
      'Fifty-two.',
      'Пятьдесят два года.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['shakespeare', 'history'],
  },

  en_s2u6_n5_029_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'The place where Shakespeare was born is called Shakespeare’s ___.',
    blankAnswers: ['birthplace'],
    options: ['birthplace', 'ferry', 'bazaar', 'mosque'],
    answer: 'birthplace',
    answerTranslation: L(
      '셰익스피어가 태어난 곳은 Shakespeare’s Birthplace라고 해요.',
      'Shakespeare tug‘ilgan joy Shakespeare’s Birthplace deb ataladi.',
      'The place where Shakespeare was born is called Shakespeare’s birthplace.',
      'Место рождения Шекспира называется Shakespeare’s Birthplace.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['shakespeare', 'birthplace'],
  },

  en_s2u6_n5_030_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Where can you watch a play in Stratford-upon-Avon?',
      },
    ],
    options: [
      'At the Royal Shakespeare Theatre.',
      'At the Grammar School.',
      'At Bancroft Gardens.',
      'At Nash’s House.',
    ],
    answer: 'At the Royal Shakespeare Theatre.',
    answerTranslation: L(
      '로열 셰익스피어 극장에서요.',
      'Royal Shakespeare Theatreda.',
      'At the Royal Shakespeare Theatre.',
      'В Королевском шекспировском театре.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['stratford', 'theatre'],
  },

  en_s2u6_n5_031_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Where did Shakespeare study?',
      },
    ],
    options: [
      'At the Grammar School.',
      'At Bancroft Gardens.',
      'At Nash’s House.',
      'At the Tourist Information Centre.',
    ],
    answer: 'At the Grammar School.',
    answerTranslation: L(
      '그래머 스쿨에서요.',
      'Grammar Schoolda.',
      'At the Grammar School.',
      'В грамматической школе.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['stratford', 'grammar-school'],
  },

  en_s2u6_n5_032_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Which place was the home of Shakespeare’s granddaughter?',
      },
    ],
    options: [
      'Nash’s House.',
      'Bancroft Gardens.',
      'The Grammar School.',
      'The Royal Shakespeare Theatre.',
    ],
    answer: 'Nash’s House.',
    answerTranslation: L(
      '내시 하우스예요.',
      'Nash’s House.',
      'Nash’s House.',
      'Дом Нэша.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['stratford', 'nash-house'],
  },

  en_s2u6_n5_033_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'Visitors can get information at the Tourist Information ___.',
    blankAnswers: ['Centre'],
    options: ['Centre', 'School', 'Gardens', 'House'],
    answer: 'Centre',
    answerTranslation: L(
      '방문객들은 관광 안내 센터에서 정보를 얻을 수 있어요.',
      'Sayyohlar Tourist Information Centreda ma’lumot olishlari mumkin.',
      'Visitors can get information at the Tourist Information Centre.',
      'Посетители могут получить информацию в туристическом информационном центре.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['stratford', 'tour'],
  },

  en_s2u6_n5_034_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Where did the guided tour finish?',
      },
    ],
    options: [
      'At Bancroft Gardens.',
      'At Shakespeare’s Birthplace.',
      'At Nash’s House.',
      'At the Grammar School.',
    ],
    answer: 'At Bancroft Gardens.',
    answerTranslation: L(
      '밴크로프트 가든에서 끝났어요.',
      'Bancroft Gardensda tugadi.',
      'At Bancroft Gardens.',
      'В садах Бэнкрофт.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['stratford', 'guided-tour'],
  },

  en_s2u6_n5_035_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The guided tour started at the Tourist Information ___.',
    blankAnswers: ['Centre'],
    options: ['Centre', 'Theatre', 'School', 'Market'],
    answer: 'Centre',
    answerTranslation: L(
      '가이드 투어는 관광 안내 센터에서 시작했어요.',
      'Gidli sayohat Tourist Information Centredan boshlandi.',
      'The guided tour started at the Tourist Information Centre.',
      'Экскурсия началась в туристическом информационном центре.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['stratford', 'guided-tour'],
  },

  en_s2u6_n5_036_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['Shakespeare', 'wrote', 'many', 'plays'],
    answer: 'Shakespeare wrote many plays',
    audioText: 'Shakespeare wrote many plays.',
    answerTranslation: L(
      '셰익스피어는 많은 희곡을 썼어요.',
      'Shakespeare ko‘plab pyesalar yozgan.',
      'Shakespeare wrote many plays.',
      'Шекспир написал много пьес.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['shakespeare', 'past-simple'],
  },

  en_s2u6_n5_037_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['We', 'visited', 'Shakespeare’s', 'birthplace'],
    answer: 'We visited Shakespeare’s birthplace',
    answerTranslation: L(
      '우리는 셰익스피어의 생가를 방문했어요.',
      'Biz Shakespearening tug‘ilgan joyiga bordik.',
      'We visited Shakespeare’s birthplace.',
      'Мы посетили место рождения Шекспира.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['stratford', 'past-simple'],
  },

  en_s2u6_n5_038_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'We really enjoyed our tour of Stratford-upon-Avon.',
    audioText: 'We really enjoyed our tour of Stratford-upon-Avon.',
    answerI18n: L(
      '우리는 스트랫퍼드어폰에이번 투어를 정말 즐겼어요',
      'Biz Stratford-upon-Avon bo‘ylab sayohatdan juda zavq oldik',
      'We really enjoyed our tour of Stratford-upon-Avon',
      'Нам очень понравилась экскурсия по Стратфорду-на-Эйвоне',
    ),
    options: [
      'We',
      'really',
      'enjoyed',
      'our',
      'tour',
      'of',
      'Stratford-upon-Avon.',
    ],
    optionsI18n: {
      ko: ['우리는', '스트랫퍼드어폰에이번', '투어를', '정말', '즐겼어요'],
      uz: [
        'Biz',
        'Stratford-upon-Avon',
        'bo‘ylab',
        'sayohatdan',
        'juda',
        'zavq',
        'oldik',
      ],
      en: [
        'We',
        'really',
        'enjoyed',
        'our',
        'tour',
        'of',
        'Stratford-upon-Avon.',
      ],
      ru: [
        'Нам',
        'очень',
        'понравилась',
        'экскурсия',
        'по',
        'Стратфорду-на-Эйвоне',
      ],
    },
    answerTranslation: L(
      '우리는 스트랫퍼드어폰에이번 투어를 정말 즐겼어요.',
      'Biz Stratford-upon-Avon bo‘ylab sayohatdan juda zavq oldik.',
      'We really enjoyed our tour of Stratford-upon-Avon.',
      'Нам очень понравилась экскурсия по Стратфорду-на-Эйвоне.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['stratford', 'guided-tour'],
  },

  en_s2u6_n5_039_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Shakespeare was a famous English poet, writer and actor. He wrote many plays and died in 1616.',
    audioText:
      'Shakespeare was a famous English poet, writer and actor. He wrote many plays and died in 1616.',
    answerTranslation: L(
      '셰익스피어는 유명한 영국 시인, 작가, 배우였어요. 그는 많은 희곡을 썼고 1616년에 세상을 떠났어요.',
      'Shakespeare mashhur ingliz shoiri, yozuvchisi va aktyori edi. U ko‘plab pyesalar yozgan va 1616-yilda vafot etgan.',
      'Shakespeare was a famous English poet, writer and actor. He wrote many plays and died in 1616.',
      'Шекспир был известным английским поэтом, писателем и актёром. Он написал много пьес и умер в 1616 году.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['shakespeare', 'review'],
  },

  en_s2u6_n5_040_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'We started at the Tourist Information Centre, visited Shakespeare’s birthplace and Nash’s House, and finished at Bancroft Gardens.',
    audioText:
      'We started at the Tourist Information Centre, visited Shakespeare’s birthplace and Nash’s House, and finished at Bancroft Gardens.',
    answerTranslation: L(
      '우리는 관광 안내 센터에서 시작해 셰익스피어 생가와 내시 하우스를 방문하고 밴크로프트 가든에서 끝냈어요.',
      'Biz Tourist Information Centredan boshladik, Shakespearening tug‘ilgan joyi va Nash’s Housega bordik, so‘ng Bancroft Gardensda tugatdik.',
      'We started at the Tourist Information Centre, visited Shakespeare’s birthplace and Nash’s House, and finished at Bancroft Gardens.',
      'Мы начали экскурсию в туристическом центре, посетили дом Шекспира и дом Нэша и закончили в садах Бэнкрофт.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['stratford', 'guided-tour'],
  },

  // ===========================================================
  // Lesson 3 · Unit 6 Grammar Review
  // ===========================================================

  en_s2u6_n5_041_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'How old ___ the speaker when it happened?',
    blankAnswers: ['was'],
    options: ['was', 'were', 'is', 'are'],
    answer: 'was',
    answerTranslation: L(
      '그 일이 일어났을 때 말하는 사람은 몇 살이었나요?',
      'Bu voqea sodir bo‘lganida gapiruvchi necha yoshda edi?',
      'How old was the speaker when it happened?',
      'Сколько лет было говорящему, когда это произошло?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit6-review', 'was-were'],
  },

  en_s2u6_n5_042_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ it on a Monday?',
    blankAnswers: ['Was'],
    options: ['Was', 'Were', 'Did', 'Are'],
    answer: 'Was',
    answerTranslation: L(
      '그 일이 월요일에 있었나요?',
      'Bu dushanba kuni bo‘lganmi?',
      'Was it on a Monday?',
      'Это было в понедельник?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit6-review', 'was-were'],
  },

  en_s2u6_n5_043_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ the lights on when he walked into the living room?',
    blankAnswers: ['Were'],
    options: ['Were', 'Was', 'Did', 'Is'],
    answer: 'Were',
    answerTranslation: L(
      '그가 거실에 들어갔을 때 불이 켜져 있었나요?',
      'U mehmonxonaga kirganida chiroqlar yoniq edimi?',
      'Were the lights on when he walked into the living room?',
      'Горел ли свет, когда он вошёл в гостиную?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit6-review', 'was-were'],
  },

  en_s2u6_n5_044_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ his friends at the party?',
    blankAnswers: ['Were'],
    options: ['Were', 'Was', 'Is', 'Does'],
    answer: 'Were',
    answerTranslation: L(
      '그의 친구들이 파티에 있었나요?',
      'Uning do‘stlari bazmda edimi?',
      'Were his friends at the party?',
      'Были ли его друзья на вечеринке?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit6-review', 'was-were'],
  },

  en_s2u6_n5_045_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ there a cake?',
    blankAnswers: ['Was'],
    options: ['Was', 'Were', 'Are', 'Do'],
    answer: 'Was',
    answerTranslation: L(
      '케이크가 있었나요?',
      'Tort bormidi?',
      'Was there a cake?',
      'Был ли торт?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit6-review', 'there-was'],
  },

  en_s2u6_n5_046_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Where ___ the presents?',
    blankAnswers: ['were'],
    options: ['were', 'was', 'is', 'does'],
    answer: 'were',
    answerTranslation: L(
      '선물들은 어디에 있었나요?',
      'Sovg‘alar qayerda edi?',
      'Where were the presents?',
      'Где были подарки?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit6-review', 'was-were'],
  },

  en_s2u6_n5_047_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Which phrase means a time before the present?',
      },
    ],
    options: ['Two months ago.', 'Every morning.', 'Every day.', 'Usually.'],
    answer: 'Two months ago.',
    answerTranslation: L(
      '두 달 전이에요.',
      'Ikki oy oldin.',
      'Two months ago.',
      'Два месяца назад.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit6-review', 'time-expressions'],
  },

  en_s2u6_n5_048_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'We visited the museum ___ week.',
    blankAnswers: ['last'],
    options: ['last', 'ago', 'in', 'on'],
    answer: 'last',
    answerTranslation: L(
      '우리는 지난주에 박물관을 방문했어요.',
      'Biz o‘tgan hafta muzeyga bordik.',
      'We visited the museum last week.',
      'Мы посетили музей на прошлой неделе.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit6-review', 'time-expressions'],
  },

  en_s2u6_n5_049_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'He moved house three years ___.',
    blankAnswers: ['ago'],
    options: ['ago', 'last', 'in', 'at'],
    answer: 'ago',
    answerTranslation: L(
      '그는 3년 전에 이사했어요.',
      'U uch yil oldin ko‘chgan.',
      'He moved house three years ago.',
      'Он переехал три года назад.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit6-review', 'time-expressions'],
  },

  en_s2u6_n5_050_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Vincent van Gogh ___ born in 1853.',
    blankAnswers: ['was'],
    options: ['was', 'were', 'is', 'are'],
    answer: 'was',
    answerTranslation: L(
      '빈센트 반 고흐는 1853년에 태어났어요.',
      'Vincent van Gogh 1853-yilda tug‘ilgan.',
      'Vincent van Gogh was born in 1853.',
      'Винсент ван Гог родился в 1853 году.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['van-gogh', 'past-simple'],
  },

  en_s2u6_n5_051_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Vincent van Gogh ___ in 1890.',
    blankAnswers: ['died'],
    options: ['died', 'dies', 'die', 'dying'],
    answer: 'died',
    answerTranslation: L(
      '빈센트 반 고흐는 1890년에 세상을 떠났어요.',
      'Vincent van Gogh 1890-yilda vafot etgan.',
      'Vincent van Gogh died in 1890.',
      'Винсент ван Гог умер в 1890 году.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['van-gogh', 'past-simple'],
  },

  en_s2u6_n5_052_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'He ___ a farmer and then a teacher before he became an artist.',
    blankAnswers: ['was'],
    options: ['was', 'were', 'is', 'are'],
    answer: 'was',
    answerTranslation: L(
      '그는 예술가가 되기 전에 농부였고 그다음에는 교사였어요.',
      'U rassom bo‘lishidan oldin fermer, keyin o‘qituvchi edi.',
      'He was a farmer and then a teacher before he became an artist.',
      'До того как стать художником, он был фермером, а затем учителем.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['van-gogh', 'was-were'],
  },

  en_s2u6_n5_053_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'He ___ to become an artist when he was nearly 30.',
    blankAnswers: ['decided'],
    options: ['decided', 'decides', 'decide', 'deciding'],
    answer: 'decided',
    answerTranslation: L(
      '그는 거의 30세가 되었을 때 예술가가 되기로 결심했어요.',
      'U deyarli 30 yoshida rassom bo‘lishga qaror qildi.',
      'He decided to become an artist when he was nearly 30.',
      'Он решил стать художником, когда ему было почти 30 лет.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['van-gogh', 'past-simple'],
  },

  en_s2u6_n5_054_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'These days people ___ his paintings.',
    blankAnswers: ['love'],
    options: ['love', 'loved', 'loving', 'loves'],
    answer: 'love',
    answerTranslation: L(
      '요즘 사람들은 그의 그림을 좋아해요.',
      'Hozir odamlar uning rasmlarini yaxshi ko‘radi.',
      'These days people love his paintings.',
      'В наши дни люди любят его картины.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['van-gogh', 'present-simple'],
  },

  en_s2u6_n5_055_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Today people ___ a lot of money for his paintings.',
    blankAnswers: ['pay'],
    options: ['pay', 'paid', 'paying', 'pays'],
    answer: 'pay',
    answerTranslation: L(
      '오늘날 사람들은 그의 그림에 많은 돈을 지불해요.',
      'Hozir odamlar uning rasmlari uchun ko‘p pul to‘laydi.',
      'Today people pay a lot of money for his paintings.',
      'Сегодня люди платят большие деньги за его картины.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['van-gogh', 'present-simple'],
  },

  en_s2u6_n5_056_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Nobody ___ to buy his paintings when he was alive.',
    blankAnswers: ['wanted'],
    options: ['wanted', 'want', 'wants', 'wanting'],
    answer: 'wanted',
    answerTranslation: L(
      '그가 살아 있을 때는 아무도 그의 그림을 사려고 하지 않았어요.',
      'U tirikligida hech kim uning rasmlarini sotib olishni xohlamagan.',
      'Nobody wanted to buy his paintings when he was alive.',
      'При его жизни никто не хотел покупать его картины.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['van-gogh', 'past-simple'],
  },

  en_s2u6_n5_057_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'He ___ one of his most famous paintings in 1888.',
    blankAnswers: ['painted'],
    options: ['painted', 'paints', 'paint', 'painting'],
    answer: 'painted',
    answerTranslation: L(
      '그는 1888년에 가장 유명한 작품 중 하나를 그렸어요.',
      'U 1888-yilda eng mashhur rasmlaridan birini chizgan.',
      'He painted one of his most famous paintings in 1888.',
      'Он написал одну из своих самых известных картин в 1888 году.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['van-gogh', 'past-simple'],
  },

  en_s2u6_n5_058_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Which sentence describes a present fact?',
      },
    ],
    options: [
      'People love his paintings today.',
      'He painted a picture in 1888.',
      'He died in 1890.',
      'He decided to become an artist.',
    ],
    answer: 'People love his paintings today.',
    answerTranslation: L(
      'People love his paintings today.는 현재 사실을 설명해요.',
      'People love his paintings today. hozirgi holatni bildiradi.',
      'People love his paintings today. describes a present fact.',
      'People love his paintings today. описывает факт настоящего.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-past', 'review'],
  },

  en_s2u6_n5_059_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Vincent van Gogh was born in 1853 and died in 1890.',
    audioText: 'Vincent van Gogh was born in 1853 and died in 1890.',
    answerI18n: L(
      '빈센트 반 고흐는 1853년에 태어나 1890년에 세상을 떠났어요',
      'Vincent van Gogh 1853-yilda tug‘ilgan va 1890-yilda vafot etgan',
      'Vincent van Gogh was born in 1853 and died in 1890',
      'Винсент ван Гог родился в 1853 году и умер в 1890 году',
    ),
    options: [
      'Vincent',
      'van',
      'Gogh',
      'was',
      'born',
      'in',
      '1853',
      'and',
      'died',
      'in',
      '1890.',
    ],
    optionsI18n: {
      ko: [
        '빈센트',
        '반',
        '고흐는',
        '1853년에',
        '태어나',
        '1890년에',
        '세상을',
        '떠났어요',
      ],
      uz: [
        'Vincent',
        'van',
        'Gogh',
        '1853-yilda',
        'tug‘ilgan',
        'va',
        '1890-yilda',
        'vafot',
        'etgan',
      ],
      en: [
        'Vincent',
        'van',
        'Gogh',
        'was',
        'born',
        'in',
        '1853',
        'and',
        'died',
        'in',
        '1890.',
      ],
      ru: [
        'Винсент',
        'ван',
        'Гог',
        'родился',
        'в',
        '1853',
        'году',
        'и',
        'умер',
        'в',
        '1890',
        'году',
      ],
    },
    answerTranslation: L(
      '빈센트 반 고흐는 1853년에 태어나 1890년에 세상을 떠났어요.',
      'Vincent van Gogh 1853-yilda tug‘ilgan va 1890-yilda vafot etgan.',
      'Vincent van Gogh was born in 1853 and died in 1890.',
      'Винсент ван Гог родился в 1853 году и умер в 1890 году.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['van-gogh', 'review'],
  },

  en_s2u6_n5_060_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Vincent van Gogh was poor when he was alive, but today people love his paintings and pay a lot of money for them.',
    audioText:
      'Vincent van Gogh was poor when he was alive, but today people love his paintings and pay a lot of money for them.',
    answerTranslation: L(
      '빈센트 반 고흐는 살아 있을 때 가난했지만 오늘날 사람들은 그의 그림을 좋아하고 많은 돈을 지불해요.',
      'Vincent van Gogh tirikligida kambag‘al edi, lekin hozir odamlar uning rasmlarini yaxshi ko‘radi va ular uchun ko‘p pul to‘laydi.',
      'Vincent van Gogh was poor when he was alive, but today people love his paintings and pay a lot of money for them.',
      'Винсент ван Гог при жизни был бедным, но сегодня люди любят его картины и платят за них большие деньги.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['van-gogh', 'review'],
  },

  // ===========================================================
  // Lesson 4 · Vocabulary, speaking and Units 5–6 review
  // ===========================================================

  en_s2u6_n5_061_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '동사와 알맞은 표현을 연결하세요.',
      'Fe’llarni mos birikmalar bilan bog‘lang.',
      'Match the verbs with the correct collocations.',
      'Соедините глаголы с правильными сочетаниями.',
    ),
    pairs: [
      {
        text: 'move',
        native: 'house',
        nativeI18n: L('이사하다', 'ko‘chmoq', 'move house', 'переехать'),
      },
      {
        text: 'receive',
        native: 'an email',
        nativeI18n: L(
          '이메일을 받다',
          'elektron xat olmoq',
          'receive an email',
          'получить электронное письмо',
        ),
      },
      {
        text: 'prepare',
        native: 'a meal',
        nativeI18n: L(
          '식사를 준비하다',
          'ovqat tayyorlamoq',
          'prepare a meal',
          'приготовить еду',
        ),
      },
      {
        text: 'enter',
        native: 'a competition',
        nativeI18n: L(
          '대회에 참가하다',
          'musobaqaga qatnashmoq',
          'enter a competition',
          'участвовать в соревновании',
        ),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['collocations', 'review'],
  },

  en_s2u6_n5_062_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '동사와 알맞은 표현을 연결하세요.',
      'Fe’llarni mos birikmalar bilan bog‘lang.',
      'Match the verbs with the correct collocations.',
      'Соедините глаголы с правильными сочетаниями.',
    ),
    pairs: [
      {
        text: 'post',
        native: 'a letter',
        nativeI18n: L(
          '편지를 부치다',
          'xat jo‘natmoq',
          'post a letter',
          'отправить письмо',
        ),
      },
      {
        text: 'shout',
        native: 'at someone',
        nativeI18n: L(
          '누군가에게 소리치다',
          'birovga baqirmoq',
          'shout at someone',
          'кричать на кого-то',
        ),
      },
      {
        text: 'visit',
        native: 'a relative',
        nativeI18n: L(
          '친척을 방문하다',
          'qarindoshni ko‘rmoq',
          'visit a relative',
          'навестить родственника',
        ),
      },
      {
        text: 'wait',
        native: 'for a long time',
        nativeI18n: L(
          '오랫동안 기다리다',
          'uzoq vaqt kutmoq',
          'wait for a long time',
          'долго ждать',
        ),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['collocations', 'review'],
  },

  en_s2u6_n5_063_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Yesterday I ___ an email from my friend.',
    blankAnswers: ['received'],
    options: ['received', 'prepared', 'entered', 'moved'],
    answer: 'received',
    answerTranslation: L(
      '어제 친구에게서 이메일을 받았어요.',
      'Kecha do‘stimdan elektron xat oldim.',
      'Yesterday I received an email from my friend.',
      'Вчера я получил электронное письмо от друга.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['collocations', 'past-simple'],
  },

  en_s2u6_n5_064_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She ___ a competition last year.',
    blankAnswers: ['entered'],
    options: ['entered', 'received', 'posted', 'waited'],
    answer: 'entered',
    answerTranslation: L(
      '그녀는 작년에 대회에 참가했어요.',
      'U o‘tgan yili musobaqaga qatnashdi.',
      'She entered a competition last year.',
      'Она участвовала в соревновании в прошлом году.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['collocations', 'past-simple'],
  },

  en_s2u6_n5_065_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Which phrase means that something was slightly boring?',
      },
    ],
    options: [
      'A bit boring.',
      'Really boring.',
      'Very boring.',
      'Extremely boring.',
    ],
    answer: 'A bit boring.',
    answerTranslation: L(
      'a bit boring이에요.',
      'A bit boring.',
      'A bit boring.',
      'A bit boring.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['degree-adverbs', 'review'],
  },

  en_s2u6_n5_066_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The journey was ___ long.',
    blankAnswers: ['really'],
    options: ['really', 'ago', 'last', 'yesterday'],
    answer: 'really',
    answerTranslation: L(
      '여정이 정말 길었어요.',
      'Safar juda uzoq edi.',
      'The journey was really long.',
      'Поездка была очень долгой.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['degree-adverbs'],
  },

  en_s2u6_n5_067_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'I passed my exam!',
      },
    ],
    options: [
      'That’s brilliant!',
      'That’s terrible!',
      'Poor you!',
      'What a nightmare!',
    ],
    answer: 'That’s brilliant!',
    answerTranslation: L(
      '정말 잘됐네요!',
      'Bu ajoyib!',
      'That’s brilliant!',
      'Это великолепно!',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['good-news', 'review'],
  },

  en_s2u6_n5_068_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'I lost my phone yesterday.',
      },
    ],
    options: [
      'Oh no! That’s terrible!',
      'That’s brilliant!',
      'That’s great!',
      'That’s amazing!',
    ],
    answer: 'Oh no! That’s terrible!',
    answerTranslation: L(
      '아, 이런! 정말 안됐네요!',
      'Voy yo‘q! Bu juda yomon!',
      'Oh no! That’s terrible!',
      'О нет! Это ужасно!',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['bad-news', 'review'],
  },

  en_s2u6_n5_069_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Martine is at the newsagent’s. She ___ a newspaper.',
    blankAnswers: ["'s buying"],
    options: ["'s buying", 'buys', 'buy', 'buying'],
    answer: "'s buying",
    answerTranslation: L(
      '마틴은 신문 가게에 있어요. 지금 신문을 사고 있어요.',
      'Martine gazeta do‘konida. U hozir gazeta sotib olyapti.',
      'Martine is at the newsagent’s. She’s buying a newspaper.',
      'Мартин в газетном киоске. Она покупает газету.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['units5-6-review', 'present-continuous'],
  },

  en_s2u6_n5_070_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ you drive when you were seventeen?',
    blankAnswers: ['Could'],
    options: ['Could', 'Can', 'Are', 'Do'],
    answer: 'Could',
    answerTranslation: L(
      '17세 때 운전할 수 있었나요?',
      'O‘n yetti yoshingizda mashina hayday olarmidingiz?',
      'Could you drive when you were seventeen?',
      'Вы умели водить машину в семнадцать лет?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['units5-6-review', 'could'],
  },

  en_s2u6_n5_071_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I’m sorry I ___ phone you yesterday.',
    blankAnswers: ["couldn't"],
    options: ["couldn't", "can't", "don't", "wasn't"],
    answer: "couldn't",
    answerTranslation: L(
      '어제 전화하지 못해서 미안해요.',
      'Kecha sizga qo‘ng‘iroq qila olmaganim uchun uzr.',
      'I’m sorry I couldn’t phone you yesterday.',
      'Извините, что я не смог позвонить вам вчера.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['units5-6-review', 'could'],
  },

  en_s2u6_n5_072_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Jim’s car is at the garage, so he ___ the bus today.',
    blankAnswers: ["'s taking"],
    options: ["'s taking", 'takes', 'take', 'taking'],
    answer: "'s taking",
    answerTranslation: L(
      '짐의 차가 정비소에 있어서 오늘은 버스를 타고 있어요.',
      'Jimning mashinasi ustaxonada, shuning uchun u bugun avtobusda ketyapti.',
      'Jim’s car is at the garage, so he’s taking the bus today.',
      'Машина Джима в гараже, поэтому сегодня он едет на автобусе.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['units5-6-review', 'present-continuous'],
  },

  en_s2u6_n5_073_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'Before the internet, there ___ many people with home computers.',
    blankAnswers: ["weren't"],
    options: ["weren't", 'were', "wasn't", 'was'],
    answer: "weren't",
    answerTranslation: L(
      '인터넷이 생기기 전에는 집에 컴퓨터가 있는 사람이 많지 않았어요.',
      'Internetdan oldin uyida kompyuteri bor odamlar ko‘p emas edi.',
      'Before the internet, there weren’t many people with home computers.',
      'До появления интернета людей с домашними компьютерами было немного.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['units5-6-review', 'was-were'],
  },

  en_s2u6_n5_074_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'People ___ internet cafés to check emails.',
    blankAnswers: ['used'],
    options: ['used', 'use', 'uses', 'using'],
    answer: 'used',
    answerTranslation: L(
      '사람들은 이메일을 확인하려고 인터넷 카페를 이용했어요.',
      'Odamlar elektron xatlarini tekshirish uchun internet kafelardan foydalangan.',
      'People used internet cafés to check emails.',
      'Люди пользовались интернет-кафе, чтобы проверять электронную почту.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['units5-6-review', 'past-simple'],
  },

  en_s2u6_n5_075_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'I bought these designer shoes online, but I can’t walk in them.',
      },
    ],
    options: [
      'Can you return them and get your money back?',
      'Can you prepare a meal?',
      'Do you have a relative?',
      'Were you born in 1853?',
    ],
    answer: 'Can you return them and get your money back?',
    answerTranslation: L(
      '반품하고 환불받을 수 있나요?',
      'Ularni qaytarib, pulingizni olishingiz mumkinmi?',
      'Can you return them and get your money back?',
      'Можете вернуть их и получить деньги обратно?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['units5-6-review', 'shopping'],
  },

  en_s2u6_n5_076_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['We', 'moved', 'house', 'last', 'year'],
    answer: 'We moved house last year',
    audioText: 'We moved house last year.',
    answerTranslation: L(
      '우리는 작년에 이사했어요.',
      'Biz o‘tgan yili ko‘chdik.',
      'We moved house last year.',
      'Мы переехали в прошлом году.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['unit6-review', 'collocations'],
  },

  en_s2u6_n5_077_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['I', 'waited', 'for', 'the', 'bus', 'for', 'a', 'long', 'time'],
    answer: 'I waited for the bus for a long time',
    answerTranslation: L(
      '저는 버스를 오랫동안 기다렸어요.',
      'Men avtobusni uzoq vaqt kutdim.',
      'I waited for the bus for a long time.',
      'Я долго ждал автобус.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['unit6-review', 'collocations'],
  },

  en_s2u6_n5_078_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Can I try this suit on, please?',
    audioText: 'Can I try this suit on, please?',
    answerI18n: L(
      '이 정장을 입어 봐도 될까요',
      'Bu kostyumni kiyib ko‘rsam bo‘ladimi',
      'Can I try this suit on, please',
      'Можно примерить этот костюм',
    ),
    options: ['Can', 'I', 'try', 'this', 'suit', 'on,', 'please?'],
    optionsI18n: {
      ko: ['이', '정장을', '입어', '봐도', '될까요'],
      uz: ['Bu', 'kostyumni', 'kiyib', 'ko‘rsam', 'bo‘ladimi'],
      en: ['Can', 'I', 'try', 'this', 'suit', 'on,', 'please?'],
      ru: ['Можно', 'примерить', 'этот', 'костюм'],
    },
    answerTranslation: L(
      '이 정장을 입어 봐도 될까요?',
      'Bu kostyumni kiyib ko‘rsam bo‘ladimi?',
      'Can I try this suit on, please?',
      'Можно примерить этот костюм?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['units5-6-review', 'shop'],
  },

  en_s2u6_n5_079_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'In Unit 6, we learnt was and were, regular past simple verbs, past time expressions, adverbs of degree and useful listener responses.',
    audioText:
      'In Unit 6, we learnt was and were, regular past simple verbs, past time expressions, adverbs of degree and useful listener responses.',
    answerTranslation: L(
      'Unit 6에서는 was와 were, 규칙 과거형, 과거 시간 표현, 강도 부사와 듣는 사람의 반응 표현을 배웠어요.',
      'Unit 6 da was va were, muntazam past simple, o‘tgan zamon vaqt iboralari, daraja ravishlari va tinglovchi javoblarini o‘rgandik.',
      'In Unit 6, we learnt was and were, regular past simple verbs, past time expressions, adverbs of degree and useful listener responses.',
      'В Unit 6 мы изучили was и were, правильные глаголы в Past Simple, выражения прошедшего времени, наречия степени и реакции слушателя.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit6', 'review'],
  },

  en_s2u6_n5_080_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'I can now describe past events, talk about famous people, tell a short story, show interest in conversations and write about a visit.',
    audioText:
      'I can now describe past events, talk about famous people, tell a short story, show interest in conversations and write about a visit.',
    answerTranslation: L(
      '이제 과거 사건을 설명하고, 유명한 인물에 대해 말하고, 짧은 이야기를 하고, 대화에서 관심을 표현하며 방문 경험을 쓸 수 있어요.',
      'Endi o‘tgan voqealarni tasvirlay olaman, mashhur odamlar haqida gapira olaman, qisqa hikoya ayta olaman, suhbatda qiziqish bildira olaman va sayohat haqida yoza olaman.',
      'I can now describe past events, talk about famous people, tell a short story, show interest in conversations and write about a visit.',
      'Теперь я могу описывать события прошлого, говорить об известных людях, рассказывать короткие истории, проявлять интерес в разговоре и писать о поездке.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit6', 'final-review'],
  },
};

// ─────────────────────────────────────────────────────────────
// Node 5
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT6_NODE5 = {
  title: L(
    '이스탄불과 Unit 6 종합 복습',
    'Istanbul va Unit 6 umumiy takrori',
    'Istanbul and Unit 6 review',
    'Стамбул и повторение Unit 6',
  ),

  section: 2,
  unit: 6,
  order: 5,
  isActive: true,

  lessons: [
    {
      title: L('이스탄불', 'Istanbul', 'Istanbul', 'Стамбул'),

      description: L(
        'Istanbul 영상에 나오는 고대 건물, 모스크, 시장, 페리와 보스포루스 해협을 살펴보고 과거 방문 경험을 말해요.',
        'Istanbul videosidagi qadimiy binolar, masjidlar, bozorlar, paromlar va Bosfor bo‘g‘ozi haqida o‘rganib, o‘tgan sayohatni tasvirlaysiz.',
        'Learn the Istanbul video vocabulary and practise describing a past visit.',
        'Изучаем лексику видео о Стамбуле и описываем прошлую поездку.',
      ),

      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 1,

      questions: [
        'en_s2u6_n5_001_word_matching',
        'en_s2u6_n5_002_word_matching',
        'en_s2u6_n5_003_fill_in_blank',
        'en_s2u6_n5_004_fill_in_blank',
        'en_s2u6_n5_005_fill_in_blank',
        'en_s2u6_n5_006_dialog_complete',
        'en_s2u6_n5_007_fill_in_blank',
        'en_s2u6_n5_008_dialog_complete',
        'en_s2u6_n5_009_fill_in_blank',
        'en_s2u6_n5_010_fill_in_blank',
        'en_s2u6_n5_011_fill_in_blank',
        'en_s2u6_n5_012_fill_in_blank',
        'en_s2u6_n5_013_dialog_complete',
        'en_s2u6_n5_014_dialog_complete',
        'en_s2u6_n5_015_fill_in_blank',
        'en_s2u6_n5_016_word_arrange',
        'en_s2u6_n5_017_translate_builder',
        'en_s2u6_n5_018_sentence_builder',
        'en_s2u6_n5_019_speaking',
        'en_s2u6_n5_020_speaking',
      ],
    },

    {
      title: L(
        '셰익스피어와 스트랫퍼드 관광',
        'Shakespeare va Stratford sayohati',
        'Shakespeare and Stratford-upon-Avon',
        'Шекспир и Стратфорд-на-Эйвоне',
      ),

      description: L(
        'Workbook의 Shakespeare 글과 Stratford-upon-Avon 가이드 투어를 통해 역사, 장소, 방문 순서와 과거형을 익혀요.',
        'Workbookdagi Shakespeare matni va Stratford-upon-Avon bo‘ylab gidli sayohat orqali tarix, joylar va past simple ni mashq qilasiz.',
        'Read about Shakespeare and follow the guided tour of Stratford-upon-Avon.',
        'Читаем о Шекспире и изучаем маршрут экскурсии по Стратфорду-на-Эйвоне.',
      ),

      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 2,

      questions: [
        'en_s2u6_n5_021_word_matching',
        'en_s2u6_n5_022_word_matching',
        'en_s2u6_n5_023_fill_in_blank',
        'en_s2u6_n5_024_fill_in_blank',
        'en_s2u6_n5_025_fill_in_blank',
        'en_s2u6_n5_026_dialog_complete',
        'en_s2u6_n5_027_fill_in_blank',
        'en_s2u6_n5_028_dialog_complete',
        'en_s2u6_n5_029_fill_in_blank',
        'en_s2u6_n5_030_dialog_complete',
        'en_s2u6_n5_031_dialog_complete',
        'en_s2u6_n5_032_dialog_complete',
        'en_s2u6_n5_033_fill_in_blank',
        'en_s2u6_n5_034_dialog_complete',
        'en_s2u6_n5_035_fill_in_blank',
        'en_s2u6_n5_036_word_arrange',
        'en_s2u6_n5_037_translate_builder',
        'en_s2u6_n5_038_sentence_builder',
        'en_s2u6_n5_039_speaking',
        'en_s2u6_n5_040_speaking',
      ],
    },

    {
      title: L(
        'Unit 6 문법 종합 복습',
        'Unit 6 grammatika takrori',
        'Unit 6 grammar review',
        'Повторение грамматики Unit 6',
      ),

      description: L(
        'was/were, 과거 시간 표현, 현재형과 과거형의 차이를 Vincent van Gogh 글과 함께 종합 복습해요.',
        'was/were, o‘tgan zamon vaqt iboralari va present/past simple farqini Vincent van Gogh matni orqali takrorlaysiz.',
        'Review was/were, past time expressions and present versus past simple using the Vincent van Gogh text.',
        'Повторяем was/were, временные выражения и различия Present/Past Simple на материале о Ван Гоге.',
      ),

      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 3,

      questions: [
        'en_s2u6_n5_041_fill_in_blank',
        'en_s2u6_n5_042_fill_in_blank',
        'en_s2u6_n5_043_fill_in_blank',
        'en_s2u6_n5_044_fill_in_blank',
        'en_s2u6_n5_045_fill_in_blank',
        'en_s2u6_n5_046_fill_in_blank',
        'en_s2u6_n5_047_dialog_complete',
        'en_s2u6_n5_048_fill_in_blank',
        'en_s2u6_n5_049_fill_in_blank',
        'en_s2u6_n5_050_fill_in_blank',
        'en_s2u6_n5_051_fill_in_blank',
        'en_s2u6_n5_052_fill_in_blank',
        'en_s2u6_n5_053_fill_in_blank',
        'en_s2u6_n5_054_fill_in_blank',
        'en_s2u6_n5_055_fill_in_blank',
        'en_s2u6_n5_056_fill_in_blank',
        'en_s2u6_n5_057_fill_in_blank',
        'en_s2u6_n5_058_dialog_complete',
        'en_s2u6_n5_059_sentence_builder',
        'en_s2u6_n5_060_speaking',
      ],
    },

    {
      title: L(
        '어휘·회화와 Units 5–6 마무리',
        'Lug‘at, suhbat va Units 5–6 yakuni',
        'Vocabulary, speaking and Units 5–6 review',
        'Лексика, разговорная практика и итог Units 5–6',
      ),

      description: L(
        '동사 결합 표현, 강도 부사, 좋은 소식과 나쁜 소식에 대한 반응을 복습하고 Workbook의 Units 5–6 문법과 쇼핑 대화까지 마무리해요.',
        'Fe’l birikmalari, daraja ravishlari, yaxshi va yomon xabarlarga javoblarni hamda Workbookdagi Units 5–6 grammatikasi va xarid suhbatlarini takrorlaysiz.',
        'Review common collocations, adverbs of degree, listener responses and the Units 5–6 grammar and shopping conversations.',
        'Повторяем глагольные сочетания, наречия степени, реакции на новости и грамматику и диалоги Units 5–6.',
      ),

      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 4,

      questions: [
        'en_s2u6_n5_061_word_matching',
        'en_s2u6_n5_062_word_matching',
        'en_s2u6_n5_063_fill_in_blank',
        'en_s2u6_n5_064_fill_in_blank',
        'en_s2u6_n5_065_dialog_complete',
        'en_s2u6_n5_066_fill_in_blank',
        'en_s2u6_n5_067_dialog_complete',
        'en_s2u6_n5_068_dialog_complete',
        'en_s2u6_n5_069_fill_in_blank',
        'en_s2u6_n5_070_fill_in_blank',
        'en_s2u6_n5_071_fill_in_blank',
        'en_s2u6_n5_072_fill_in_blank',
        'en_s2u6_n5_073_fill_in_blank',
        'en_s2u6_n5_074_fill_in_blank',
        'en_s2u6_n5_075_dialog_complete',
        'en_s2u6_n5_076_word_arrange',
        'en_s2u6_n5_077_translate_builder',
        'en_s2u6_n5_078_sentence_builder',
        'en_s2u6_n5_079_speaking',
        'en_s2u6_n5_080_speaking',
      ],
    },
  ],
};
