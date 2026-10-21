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
// Section 1 · Unit 8 · Node 1
// 8.1 When we were seven
//
// Coverage
// - was / were
// - wasn't / weren't
// - Was ...? / Were ...?
// - short answers
// - talking about childhood
// - talking about life then and now
// - months
// - ordinal numbers for dates
// - saying and reading dates
//
// IMPORTANT:
// *_WORDS에는 무조건 단어만 등록.
// "was born", "the first of January",
// "seven years old" 같은 구/문장 등록 금지.
//
// 4 lessons × 20 questions = 80
// type_answer: 3 per lesson
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT8_NODE1_WORDS = [
  {
    code: 'en-month-january',
    english: 'January',
    senseKey: 'first-month-of-year',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('1월', 'yanvar', 'the first month of the year', 'январь'),
    examples: [
      {
        english: 'New Year’s Day is in January.',
        translations: L(
          '새해 첫날은 1월이에요.',
          'Yangi yil yanvar oyida.',
          'New Year’s Day is in January.',
          'Новый год — в январе.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈdʒænjuəri/',
      ttsText: 'January',
    },
    media: {
      emoji: '📅',
      imageUrl: '',
      imageAlt: L(
        '1월 달력',
        'yanvar taqvimi',
        'January calendar',
        'календарь января',
      ),
    },
    tags: ['dates', 'months'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-month-february',
    english: 'February',
    senseKey: 'second-month-of-year',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('2월', 'fevral', 'the second month of the year', 'февраль'),
    examples: [
      {
        english: 'Valentine’s Day is in February.',
        translations: L(
          '밸런타인데이는 2월이에요.',
          'Sevishganlar kuni fevral oyida.',
          'Valentine’s Day is in February.',
          'День святого Валентина — в феврале.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈfebruəri/',
      ttsText: 'February',
    },
    media: {
      emoji: '📅',
      imageUrl: '',
      imageAlt: L(
        '2월 달력',
        'fevral taqvimi',
        'February calendar',
        'календарь февраля',
      ),
    },
    tags: ['dates', 'months'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-month-march',
    english: 'March',
    senseKey: 'third-month-of-year',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('3월', 'mart', 'the third month of the year', 'март'),
    examples: [
      {
        english: 'Women’s Day is in March.',
        translations: L(
          '여성의 날은 3월이에요.',
          'Xotin-qizlar kuni mart oyida.',
          'Women’s Day is in March.',
          'Женский день — в марте.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/mɑːtʃ/',
      ttsText: 'March',
    },
    media: {
      emoji: '📅',
      imageUrl: '',
      imageAlt: L(
        '3월 달력',
        'mart taqvimi',
        'March calendar',
        'календарь марта',
      ),
    },
    tags: ['dates', 'months'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-month-april',
    english: 'April',
    senseKey: 'fourth-month-of-year',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('4월', 'aprel', 'the fourth month of the year', 'апрель'),
    examples: [
      {
        english: 'My birthday is in April.',
        translations: L(
          '제 생일은 4월이에요.',
          'Mening tug‘ilgan kunim aprel oyida.',
          'My birthday is in April.',
          'Мой день рождения в апреле.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈeɪprəl/',
      ttsText: 'April',
    },
    media: {
      emoji: '📅',
      imageUrl: '',
      imageAlt: L(
        '4월 달력',
        'aprel taqvimi',
        'April calendar',
        'календарь апреля',
      ),
    },
    tags: ['dates', 'months'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-month-may',
    english: 'May',
    senseKey: 'fifth-month-of-year',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('5월', 'may', 'the fifth month of the year', 'май'),
    examples: [
      {
        english: 'The event is in May.',
        translations: L(
          '그 행사는 5월이에요.',
          'Tadbir may oyida.',
          'The event is in May.',
          'Мероприятие проходит в мае.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/meɪ/',
      ttsText: 'May',
    },
    media: {
      emoji: '📅',
      imageUrl: '',
      imageAlt: L('5월 달력', 'may taqvimi', 'May calendar', 'календарь мая'),
    },
    tags: ['dates', 'months'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-month-june',
    english: 'June',
    senseKey: 'sixth-month-of-year',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('6월', 'iyun', 'the sixth month of the year', 'июнь'),
    examples: [
      {
        english: 'School finishes in June.',
        translations: L(
          '학교는 6월에 끝나요.',
          'Maktab iyun oyida tugaydi.',
          'School finishes in June.',
          'Учёба заканчивается в июне.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/dʒuːn/',
      ttsText: 'June',
    },
    media: {
      emoji: '📅',
      imageUrl: '',
      imageAlt: L(
        '6월 달력',
        'iyun taqvimi',
        'June calendar',
        'календарь июня',
      ),
    },
    tags: ['dates', 'months'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-month-july',
    english: 'July',
    senseKey: 'seventh-month-of-year',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('7월', 'iyul', 'the seventh month of the year', 'июль'),
    examples: [
      {
        english: 'The moon landing was in July.',
        translations: L(
          '달 착륙은 7월이었어요.',
          'Oyga qo‘nish iyul oyida bo‘lgan.',
          'The moon landing was in July.',
          'Высадка на Луну была в июле.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/dʒuˈlaɪ/',
      ttsText: 'July',
    },
    media: {
      emoji: '📅',
      imageUrl: '',
      imageAlt: L(
        '7월 달력',
        'iyul taqvimi',
        'July calendar',
        'календарь июля',
      ),
    },
    tags: ['dates', 'months'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-month-august',
    english: 'August',
    senseKey: 'eighth-month-of-year',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('8월', 'avgust', 'the eighth month of the year', 'август'),
    examples: [
      {
        english: 'We were on holiday in August.',
        translations: L(
          '우리는 8월에 휴가 중이었어요.',
          'Biz avgust oyida ta’tilda edik.',
          'We were on holiday in August.',
          'Мы были в отпуске в августе.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈɔːɡəst/',
      ttsText: 'August',
    },
    media: {
      emoji: '📅',
      imageUrl: '',
      imageAlt: L(
        '8월 달력',
        'avgust taqvimi',
        'August calendar',
        'календарь августа',
      ),
    },
    tags: ['dates', 'months'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-month-september',
    english: 'September',
    senseKey: 'ninth-month-of-year',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('9월', 'sentabr', 'the ninth month of the year', 'сентябрь'),
    examples: [
      {
        english: 'School starts in September.',
        translations: L(
          '학교는 9월에 시작해요.',
          'Maktab sentabr oyida boshlanadi.',
          'School starts in September.',
          'Учёба начинается в сентябре.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/sepˈtembə/',
      ttsText: 'September',
    },
    media: {
      emoji: '📅',
      imageUrl: '',
      imageAlt: L(
        '9월 달력',
        'sentabr taqvimi',
        'September calendar',
        'календарь сентября',
      ),
    },
    tags: ['dates', 'months'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-month-october',
    english: 'October',
    senseKey: 'tenth-month-of-year',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('10월', 'oktabr', 'the tenth month of the year', 'октябрь'),
    examples: [
      {
        english: 'The meeting is in October.',
        translations: L(
          '회의는 10월이에요.',
          'Uchrashuv oktabr oyida.',
          'The meeting is in October.',
          'Встреча проходит в октябре.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɒkˈtəʊbə/',
      ttsText: 'October',
    },
    media: {
      emoji: '📅',
      imageUrl: '',
      imageAlt: L(
        '10월 달력',
        'oktabr taqvimi',
        'October calendar',
        'календарь октября',
      ),
    },
    tags: ['dates', 'months'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-month-november',
    english: 'November',
    senseKey: 'eleventh-month-of-year',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('11월', 'noyabr', 'the eleventh month of the year', 'ноябрь'),
    examples: [
      {
        english: 'The event was in November.',
        translations: L(
          '그 행사는 11월이었어요.',
          'Tadbir noyabr oyida bo‘lgan.',
          'The event was in November.',
          'Мероприятие было в ноябре.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/nəʊˈvembə/',
      ttsText: 'November',
    },
    media: {
      emoji: '📅',
      imageUrl: '',
      imageAlt: L(
        '11월 달력',
        'noyabr taqvimi',
        'November calendar',
        'календарь ноября',
      ),
    },
    tags: ['dates', 'months'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-month-december',
    english: 'December',
    senseKey: 'twelfth-month-of-year',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('12월', 'dekabr', 'the twelfth month of the year', 'декабрь'),
    examples: [
      {
        english: 'New Year’s Eve is in December.',
        translations: L(
          '새해 전날은 12월이에요.',
          'Yangi yil arafasi dekabr oyida.',
          'New Year’s Eve is in December.',
          'Канун Нового года — в декабре.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/dɪˈsembə/',
      ttsText: 'December',
    },
    media: {
      emoji: '📅',
      imageUrl: '',
      imageAlt: L(
        '12월 달력',
        'dekabr taqvimi',
        'December calendar',
        'календарь декабря',
      ),
    },
    tags: ['dates', 'months'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-ordinal-first',
    english: 'first',
    senseKey: 'ordinal-number-one',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('첫 번째', 'birinchi', 'number one in order', 'первый'),
    examples: [
      {
        english: 'January is the first month.',
        translations: L(
          '1월은 첫 번째 달이에요.',
          'Yanvar birinchi oy.',
          'January is the first month.',
          'Январь — первый месяц.',
        ),
      },
    ],
    pronunciation: { ipa: '/fɜːst/', ttsText: 'first' },
    media: {
      emoji: '1️⃣',
      imageUrl: '',
      imageAlt: L('첫 번째', 'birinchi', 'first', 'первый'),
    },
    tags: ['dates', 'ordinal-numbers'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-ordinal-second',
    english: 'second',
    senseKey: 'ordinal-number-two',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('두 번째', 'ikkinchi', 'number two in order', 'второй'),
    examples: [
      {
        english: 'February is the second month.',
        translations: L(
          '2월은 두 번째 달이에요.',
          'Fevral ikkinchi oy.',
          'February is the second month.',
          'Февраль — второй месяц.',
        ),
      },
    ],
    pronunciation: { ipa: '/ˈsekənd/', ttsText: 'second' },
    media: {
      emoji: '2️⃣',
      imageUrl: '',
      imageAlt: L('두 번째', 'ikkinchi', 'second', 'второй'),
    },
    tags: ['dates', 'ordinal-numbers'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-ordinal-third',
    english: 'third',
    senseKey: 'ordinal-number-three',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('세 번째', 'uchinchi', 'number three in order', 'третий'),
    examples: [
      {
        english: 'March is the third month.',
        translations: L(
          '3월은 세 번째 달이에요.',
          'Mart uchinchi oy.',
          'March is the third month.',
          'Март — третий месяц.',
        ),
      },
    ],
    pronunciation: { ipa: '/θɜːd/', ttsText: 'third' },
    media: {
      emoji: '3️⃣',
      imageUrl: '',
      imageAlt: L('세 번째', 'uchinchi', 'third', 'третий'),
    },
    tags: ['dates', 'ordinal-numbers'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-ordinal-fourth',
    english: 'fourth',
    senseKey: 'ordinal-number-four',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('네 번째', 'to‘rtinchi', 'number four in order', 'четвёртый'),
    examples: [
      {
        english: 'April is the fourth month.',
        translations: L(
          '4월은 네 번째 달이에요.',
          'Aprel to‘rtinchi oy.',
          'April is the fourth month.',
          'Апрель — четвёртый месяц.',
        ),
      },
    ],
    pronunciation: { ipa: '/fɔːθ/', ttsText: 'fourth' },
    media: {
      emoji: '4️⃣',
      imageUrl: '',
      imageAlt: L('네 번째', 'to‘rtinchi', 'fourth', 'четвёртый'),
    },
    tags: ['dates', 'ordinal-numbers'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-ordinal-fifth',
    english: 'fifth',
    senseKey: 'ordinal-number-five',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('다섯 번째', 'beshinchi', 'number five in order', 'пятый'),
    examples: [
      {
        english: 'May is the fifth month.',
        translations: L(
          '5월은 다섯 번째 달이에요.',
          'May beshinchi oy.',
          'May is the fifth month.',
          'Май — пятый месяц.',
        ),
      },
    ],
    pronunciation: { ipa: '/fɪfθ/', ttsText: 'fifth' },
    media: {
      emoji: '5️⃣',
      imageUrl: '',
      imageAlt: L('다섯 번째', 'beshinchi', 'fifth', 'пятый'),
    },
    tags: ['dates', 'ordinal-numbers'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-ordinal-sixth',
    english: 'sixth',
    senseKey: 'ordinal-number-six',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('여섯 번째', 'oltinchi', 'number six in order', 'шестой'),
    examples: [
      {
        english: 'June is the sixth month.',
        translations: L(
          '6월은 여섯 번째 달이에요.',
          'Iyun oltinchi oy.',
          'June is the sixth month.',
          'Июнь — шестой месяц.',
        ),
      },
    ],
    pronunciation: { ipa: '/sɪksθ/', ttsText: 'sixth' },
    media: {
      emoji: '6️⃣',
      imageUrl: '',
      imageAlt: L('여섯 번째', 'oltinchi', 'sixth', 'шестой'),
    },
    tags: ['dates', 'ordinal-numbers'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-ordinal-seventh',
    english: 'seventh',
    senseKey: 'ordinal-number-seven',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('일곱 번째', 'yettinchi', 'number seven in order', 'седьмой'),
    examples: [
      {
        english: 'July is the seventh month.',
        translations: L(
          '7월은 일곱 번째 달이에요.',
          'Iyul yettinchi oy.',
          'July is the seventh month.',
          'Июль — седьмой месяц.',
        ),
      },
    ],
    pronunciation: { ipa: '/ˈsevənθ/', ttsText: 'seventh' },
    media: {
      emoji: '7️⃣',
      imageUrl: '',
      imageAlt: L('일곱 번째', 'yettinchi', 'seventh', 'седьмой'),
    },
    tags: ['dates', 'ordinal-numbers'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-ordinal-eighth',
    english: 'eighth',
    senseKey: 'ordinal-number-eight',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('여덟 번째', 'sakkizinchi', 'number eight in order', 'восьмой'),
    examples: [
      {
        english: 'August is the eighth month.',
        translations: L(
          '8월은 여덟 번째 달이에요.',
          'Avgust sakkizinchi oy.',
          'August is the eighth month.',
          'Август — восьмой месяц.',
        ),
      },
    ],
    pronunciation: { ipa: '/eɪtθ/', ttsText: 'eighth' },
    media: {
      emoji: '8️⃣',
      imageUrl: '',
      imageAlt: L('여덟 번째', 'sakkizinchi', 'eighth', 'восьмой'),
    },
    tags: ['dates', 'ordinal-numbers'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-ordinal-ninth',
    english: 'ninth',
    senseKey: 'ordinal-number-nine',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('아홉 번째', 'to‘qqizinchi', 'number nine in order', 'девятый'),
    examples: [
      {
        english: 'September is the ninth month.',
        translations: L(
          '9월은 아홉 번째 달이에요.',
          'Sentabr to‘qqizinchi oy.',
          'September is the ninth month.',
          'Сентябрь — девятый месяц.',
        ),
      },
    ],
    pronunciation: { ipa: '/naɪnθ/', ttsText: 'ninth' },
    media: {
      emoji: '9️⃣',
      imageUrl: '',
      imageAlt: L('아홉 번째', 'to‘qqizinchi', 'ninth', 'девятый'),
    },
    tags: ['dates', 'ordinal-numbers'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-ordinal-tenth',
    english: 'tenth',
    senseKey: 'ordinal-number-ten',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('열 번째', 'o‘ninchi', 'number ten in order', 'десятый'),
    examples: [
      {
        english: 'October is the tenth month.',
        translations: L(
          '10월은 열 번째 달이에요.',
          'Oktabr o‘ninchi oy.',
          'October is the tenth month.',
          'Октябрь — десятый месяц.',
        ),
      },
    ],
    pronunciation: { ipa: '/tenθ/', ttsText: 'tenth' },
    media: {
      emoji: '🔟',
      imageUrl: '',
      imageAlt: L('열 번째', 'o‘ninchi', 'tenth', 'десятый'),
    },
    tags: ['dates', 'ordinal-numbers'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-ordinal-twentieth',
    english: 'twentieth',
    senseKey: 'ordinal-number-twenty',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '스무 번째',
      'yigirmanchi',
      'number twenty in order',
      'двадцатый',
    ),
    examples: [
      {
        english: 'The moon landing was on the twentieth of July.',
        translations: L(
          '달 착륙은 7월 20일이었어요.',
          'Oyga qo‘nish iyulning yigirmanchisida bo‘lgan.',
          'The moon landing was on the twentieth of July.',
          'Высадка на Луну была двадцатого июля.',
        ),
      },
    ],
    pronunciation: { ipa: '/ˈtwentiəθ/', ttsText: 'twentieth' },
    media: {
      emoji: '2️⃣0️⃣',
      imageUrl: '',
      imageAlt: L('스무 번째', 'yigirmanchi', 'twentieth', 'двадцатый'),
    },
    tags: ['dates', 'ordinal-numbers'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-ordinal-thirtieth',
    english: 'thirtieth',
    senseKey: 'ordinal-number-thirty',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '서른 번째',
      'o‘ttizinchi',
      'number thirty in order',
      'тридцатый',
    ),
    examples: [
      {
        english: 'The thirtieth is near the end of the month.',
        translations: L(
          '30일은 달의 끝부분이에요.',
          'O‘ttizinchi sana oy oxiriga yaqin.',
          'The thirtieth is near the end of the month.',
          'Тридцатое число находится ближе к концу месяца.',
        ),
      },
    ],
    pronunciation: { ipa: '/ˈθɜːtiəθ/', ttsText: 'thirtieth' },
    media: {
      emoji: '3️⃣0️⃣',
      imageUrl: '',
      imageAlt: L('서른 번째', 'o‘ttizinchi', 'thirtieth', 'тридцатый'),
    },
    tags: ['dates', 'ordinal-numbers'],
    difficulty: 1,
    isCore: true,
  },
];

export const EN_S1_UNIT8_NODE1_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Was and were
  // ===========================================================

  en_s1u8_n1_001_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Seven Up was a TV film.',
    audioText: 'Seven Up was a TV film.',
    answerTranslation: L(
      '세븐 업은 TV 영화였어요.',
      'Seven Up televizion film edi.',
      'Seven Up was a TV film.',
      'Seven Up был телевизионным фильмом.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['past-be', 'was'],
  },

  en_s1u8_n1_002_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'child',
    choices: [
      { text: 'actor', label: '🎭', emoji: '🎭', imageUrl: '' },
      { text: 'child', label: '🧒', emoji: '🧒', imageUrl: '' },
      { text: 'doctor', label: '🩺', emoji: '🩺', imageUrl: '' },
      { text: 'astronaut', label: '🚀', emoji: '🚀', imageUrl: '' },
    ],
    answerTranslation: L('아이', 'bola', 'child', 'ребёнок'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['childhood'],
  },

  en_s1u8_n1_003_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'child',
        native: 'bola',
        nativeI18n: L('아이', 'bola', 'child', 'ребёнок'),
      },
      {
        text: 'actor',
        native: 'aktyor',
        nativeI18n: L('배우', 'aktyor', 'actor', 'актёр'),
      },
      {
        text: 'family',
        native: 'oila',
        nativeI18n: L('가족', 'oila', 'family', 'семья'),
      },
      {
        text: 'rich',
        native: 'boy',
        nativeI18n: L('부유한', 'boy', 'rich', 'богатый'),
      },
      {
        text: 'poor',
        native: 'kambag‘al',
        nativeI18n: L('가난한', 'kambag‘al', 'poor', 'бедный'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['past-life', 'matching'],
  },

  en_s1u8_n1_004_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['England', 'from', 'children', 'The', 'were', 'was', 'actors'],
    answer: 'The children were from England',
    answerTranslation: L(
      '그 아이들은 영국 출신이었어요.',
      'Bolalar Angliyadan edi.',
      'The children were from England.',
      'Дети были из Англии.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['past-be', 'were'],
  },

  en_s1u8_n1_005_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['film', 'Hollywood', 'a', 'wasn’t', 'It', 'were', 'TV'],
    answer: 'It wasn’t a Hollywood film',
    audioText: 'It wasn’t a Hollywood film.',
    answerTranslation: L(
      '그것은 할리우드 영화가 아니었어요.',
      'U Gollivud filmi emas edi.',
      'It wasn’t a Hollywood film.',
      'Это не был голливудский фильм.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['past-be', 'was-not'],
  },

  en_s1u8_n1_006_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'child',
        native: 'bola',
        nativeI18n: L('아이', 'bola', 'child', 'ребёнок'),
      },
      {
        text: 'actor',
        native: 'aktyor',
        nativeI18n: L('배우', 'aktyor', 'actor', 'актёр'),
      },
      {
        text: 'family',
        native: 'oila',
        nativeI18n: L('가족', 'oila', 'family', 'семья'),
      },
      {
        text: 'rich',
        native: 'boy',
        nativeI18n: L('부유한', 'boy', 'rich', 'богатый'),
      },
      {
        text: 'poor',
        native: 'kambag‘al',
        nativeI18n: L('가난한', 'kambag‘al', 'poor', 'бедный'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['past-life', 'listening'],
  },

  en_s1u8_n1_007_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Seven Up ',
    sentenceSuffix: ' a TV film.',
    answer: 'was',
    answerTranslation: L(
      '세븐 업은 TV 영화였어요.',
      'Seven Up televizion film edi.',
      'Seven Up was a TV film.',
      'Seven Up был телевизионным фильмом.',
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

  en_s1u8_n1_008_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'actor',
    choices: [
      { text: 'doctor', label: '🩺', emoji: '🩺', imageUrl: '' },
      { text: 'astronaut', label: '🚀', emoji: '🚀', imageUrl: '' },
      { text: 'actor', label: '🎭', emoji: '🎭', imageUrl: '' },
      { text: 'child', label: '🧒', emoji: '🧒', imageUrl: '' },
    ],
    answerTranslation: L('배우', 'aktyor', 'actor', 'актёр'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['actor'],
  },

  en_s1u8_n1_009_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'The characters were real children.',
    audioText: 'The characters were real children.',
    answerI18n: L(
      '등장인물들은 실제 아이들이었어요',
      'Qahramonlar haqiqiy bolalar edi',
      'The characters were real children',
      'Персонажи были настоящими детьми',
    ),
    options: ['The', 'characters', 'were', 'real', 'children', 'actors', 'was'],
    optionsI18n: {
      ko: ['등장인물들은', '실제', '아이들이었어요', '배우들이었어요'],
      uz: ['Qahramonlar', 'haqiqiy', 'bolalar', 'edi', 'aktyorlar'],
      en: ['The', 'characters', 'were', 'real', 'children'],
      ru: ['Персонажи', 'были', 'настоящими', 'детьми'],
    },
    answerTranslation: L(
      '등장인물들은 실제 아이들이었어요.',
      'Qahramonlar haqiqiy bolalar edi.',
      'The characters were real children.',
      'Персонажи были настоящими детьми.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['past-be', 'were'],
  },

  en_s1u8_n1_010_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Was Neil a happy child?',
    options: ['Yes', 'he', 'was', 'were', 'No', 'actor'],
    answer: 'Yes he was',
    answerTranslation: L(
      '네, 행복한 아이였어요.',
      'Ha, u baxtli bola edi.',
      'Yes, he was.',
      'Да.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['past-be', 'short-answer'],
  },

  en_s1u8_n1_011_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'The children ',
    sentenceSuffix: ' from England.',
    answer: 'were',
    answerTranslation: L(
      '그 아이들은 영국 출신이었어요.',
      'Bolalar Angliyadan edi.',
      'The children were from England.',
      'Дети были из Англии.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "were".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'were'],
  },

  en_s1u8_n1_012_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'happy',
        native: 'xursand',
        nativeI18n: L('행복한', 'xursand', 'happy', 'счастливый'),
      },
      {
        text: 'expensive',
        native: 'qimmat',
        nativeI18n: L('비싼', 'qimmat', 'expensive', 'дорогой'),
      },
      {
        text: 'rich',
        native: 'boy',
        nativeI18n: L('부유한', 'boy', 'rich', 'богатый'),
      },
      {
        text: 'poor',
        native: 'kambag‘al',
        nativeI18n: L('가난한', 'kambag‘al', 'poor', 'бедный'),
      },
      {
        text: 'married',
        native: 'turmush qurgan',
        nativeI18n: L('결혼한', 'turmush qurgan', 'married', 'женатый'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['past-life', 'matching'],
  },

  en_s1u8_n1_013_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['parents', 'were', 'rich', 'Suzy’s', 'happy', 'was', 'poor'],
    answer: 'Suzy’s parents were rich',
    answerTranslation: L(
      '수지의 부모님은 부유했어요.',
      'Suzining ota-onasi boy edi.',
      'Suzy’s parents were rich.',
      'Родители Сьюзи были богатыми.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['past-be', 'were'],
  },

  en_s1u8_n1_014_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'happy',
        native: 'xursand',
        nativeI18n: L('행복한', 'xursand', 'happy', 'счастливый'),
      },
      {
        text: 'expensive',
        native: 'qimmat',
        nativeI18n: L('비싼', 'qimmat', 'expensive', 'дорогой'),
      },
      {
        text: 'rich',
        native: 'boy',
        nativeI18n: L('부유한', 'boy', 'rich', 'богатый'),
      },
      {
        text: 'poor',
        native: 'kambag‘al',
        nativeI18n: L('가난한', 'kambag‘al', 'poor', 'бедный'),
      },
      {
        text: 'married',
        native: 'turmush qurgan',
        nativeI18n: L('결혼한', 'turmush qurgan', 'married', 'женатый'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['past-life', 'listening'],
  },

  en_s1u8_n1_015_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'astronaut',
    choices: [
      { text: 'actor', label: '🎭', emoji: '🎭', imageUrl: '' },
      { text: 'doctor', label: '🩺', emoji: '🩺', imageUrl: '' },
      { text: 'astronaut', label: '🚀', emoji: '🚀', imageUrl: '' },
      { text: 'teacher', label: '👩‍🏫', emoji: '👩‍🏫', imageUrl: '' },
    ],
    answerTranslation: L('우주비행사', 'astronavt', 'astronaut', 'астронавт'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['dream-job'],
  },

  en_s1u8_n1_016_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Suzy ___ at an expensive school.',
    blankAnswers: ['was'],
    options: ['was', 'were', 'are', 'is'],
    answer: 'was',
    answerTranslation: L(
      '수지는 비싼 학교에 다녔어요.',
      'Suzi qimmat maktabda edi.',
      'Suzy was at an expensive school.',
      'Сьюзи училась в дорогой школе.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['was', 'past-be'],
  },

  en_s1u8_n1_017_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'She ',
    sentenceSuffix: ' happy as a child.',
    answer: 'wasn’t',
    answerTranslation: L(
      '그녀는 어린 시절 행복하지 않았어요.',
      'U bolaligida baxtli emas edi.',
      'She wasn’t happy as a child.',
      'В детстве она не была счастлива.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "wasn’t".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'was-not'],
  },

  en_s1u8_n1_018_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['actors', 'weren’t', 'children', 'The', 'were', 'real'],
    answer: 'The children weren’t actors',
    audioText: 'The children weren’t actors.',
    answerTranslation: L(
      '그 아이들은 배우가 아니었어요.',
      'Bolalar aktyor emas edi.',
      'The children weren’t actors.',
      'Дети не были актёрами.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['were-not', 'past-be'],
  },

  en_s1u8_n1_019_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Were the children actors?',
    options: ['No', 'they', 'weren’t', 'were', 'Yes', 'children'],
    answer: 'No they weren’t',
    answerTranslation: L(
      '아니요, 배우가 아니었어요.',
      'Yo‘q, ular aktyor emas edi.',
      'No, they weren’t.',
      'Нет.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['past-be', 'short-answer'],
  },

  en_s1u8_n1_020_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Was she happy as a child?' }],
    options: [
      'No, she wasn’t.',
      'No, she weren’t.',
      'Yes, she were.',
      'She happy was.',
    ],
    answer: 'No, she wasn’t.',
    answerTranslation: L(
      '아니요, 행복하지 않았어요.',
      'Yo‘q, u baxtli emas edi.',
      'No, she wasn’t.',
      'Нет.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['past-be', 'dialog'],
  },

  // ===========================================================
  // Lesson 2 · Childhood
  // ===========================================================

  en_s1u8_n1_021_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Where were you born?',
    audioText: 'Where were you born?',
    answerTranslation: L(
      '어디에서 태어났어요?',
      'Qayerda tug‘ilgansiz?',
      'Where were you born?',
      'Где вы родились?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['childhood', 'past-be'],
  },

  en_s1u8_n1_022_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'doctor',
    choices: [
      { text: 'teacher', label: '👩‍🏫', emoji: '👩‍🏫', imageUrl: '' },
      { text: 'doctor', label: '🩺', emoji: '🩺', imageUrl: '' },
      { text: 'actor', label: '🎭', emoji: '🎭', imageUrl: '' },
      { text: 'astronaut', label: '🚀', emoji: '🚀', imageUrl: '' },
    ],
    answerTranslation: L('의사', 'shifokor', 'doctor', 'врач'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['jobs'],
  },

  en_s1u8_n1_023_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'born',
        native: 'tug‘ilgan',
        nativeI18n: L('태어난', 'tug‘ilgan', 'born', 'рождённый'),
      },
      {
        text: 'child',
        native: 'bola',
        nativeI18n: L('아이', 'bola', 'child', 'ребёнок'),
      },
      {
        text: 'parent',
        native: 'ota-ona',
        nativeI18n: L('부모', 'ota-ona', 'parent', 'родитель'),
      },
      {
        text: 'grandfather',
        native: 'bobo',
        nativeI18n: L('할아버지', 'bobo', 'grandfather', 'дедушка'),
      },
      {
        text: 'doctor',
        native: 'shifokor',
        nativeI18n: L('의사', 'shifokor', 'doctor', 'врач'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['childhood', 'matching'],
  },

  en_s1u8_n1_024_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['1980', 'born', 'was', 'in', 'I', 'were', '1964'],
    answer: 'I was born in 1980',
    answerTranslation: L(
      '저는 1980년에 태어났어요.',
      'Men 1980-yilda tug‘ilganman.',
      'I was born in 1980.',
      'Я родился в 1980 году.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['born', 'was'],
  },

  en_s1u8_n1_025_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['happy', 'child', 'you', 'Were', 'a', 'was', 'born'],
    answer: 'Were you a happy child',
    audioText: 'Were you a happy child?',
    answerTranslation: L(
      '행복한 아이였어요?',
      'Baxtli bola edingizmi?',
      'Were you a happy child?',
      'Вы были счастливым ребёнком?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['childhood', 'were-question'],
  },

  en_s1u8_n1_026_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'born',
        native: 'tug‘ilgan',
        nativeI18n: L('태어난', 'tug‘ilgan', 'born', 'рождённый'),
      },
      {
        text: 'child',
        native: 'bola',
        nativeI18n: L('아이', 'bola', 'child', 'ребёнок'),
      },
      {
        text: 'parent',
        native: 'ota-ona',
        nativeI18n: L('부모', 'ota-ona', 'parent', 'родитель'),
      },
      {
        text: 'grandfather',
        native: 'bobo',
        nativeI18n: L('할아버지', 'bobo', 'grandfather', 'дедушка'),
      },
      {
        text: 'doctor',
        native: 'shifokor',
        nativeI18n: L('의사', 'shifokor', 'doctor', 'врач'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['childhood', 'listening'],
  },

  en_s1u8_n1_027_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I was ',
    sentenceSuffix: ' in 1980.',
    answer: 'born',
    answerTranslation: L(
      '저는 1980년에 태어났어요.',
      'Men 1980-yilda tug‘ilganman.',
      'I was born in 1980.',
      'Я родился в 1980 году.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "born".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'born'],
  },

  en_s1u8_n1_028_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'school',
    choices: [
      { text: 'school', label: '🏫', emoji: '🏫', imageUrl: '' },
      { text: 'hospital', label: '🏥', emoji: '🏥', imageUrl: '' },
      { text: 'cinema', label: '🎬', emoji: '🎬', imageUrl: '' },
      { text: 'bank', label: '🏦', emoji: '🏦', imageUrl: '' },
    ],
    answerTranslation: L('학교', 'maktab', 'school', 'школа'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['childhood', 'school'],
  },

  en_s1u8_n1_029_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'There were six children in our family.',
    audioText: 'There were six children in our family.',
    answerI18n: L(
      '우리 가족에는 아이가 여섯 명 있었어요',
      'Bizning oilamizda olti nafar bola bor edi',
      'There were six children in our family',
      'В нашей семье было шестеро детей',
    ),
    options: [
      'There',
      'were',
      'six',
      'children',
      'in',
      'our',
      'family',
      'was',
      'five',
    ],
    optionsI18n: {
      ko: ['우리', '가족에는', '아이가', '여섯', '명', '있었어요'],
      uz: ['Bizning', 'oilamizda', 'olti', 'nafar', 'bola', 'bor', 'edi'],
      en: ['There', 'were', 'six', 'children', 'in', 'our', 'family'],
      ru: ['В', 'нашей', 'семье', 'было', 'шестеро', 'детей'],
    },
    answerTranslation: L(
      '우리 가족에는 아이가 여섯 명 있었어요.',
      'Bizning oilamizda olti nafar bola bor edi.',
      'There were six children in our family.',
      'В нашей семье было шестеро детей.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['family', 'were'],
  },

  en_s1u8_n1_030_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Were you born in 1964?',
    options: ['No', 'I', 'wasn’t', 'I', 'was', 'born', 'in', '1980', 'were'],
    answer: 'No I wasn’t I was born in 1980',
    answerTranslation: L(
      '아니요. 저는 1980년에 태어났어요.',
      'Yo‘q. Men 1980-yilda tug‘ilganman.',
      'No, I wasn’t. I was born in 1980.',
      'Нет. Я родился в 1980 году.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['born', 'reply'],
  },

  en_s1u8_n1_031_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'There ',
    sentenceSuffix: ' six children in our family.',
    answer: 'were',
    answerTranslation: L(
      '우리 가족에는 아이가 여섯 명 있었어요.',
      'Bizning oilamizda olti nafar bola bor edi.',
      'There were six children in our family.',
      'В нашей семье было шестеро детей.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "were".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'were'],
  },

  en_s1u8_n1_032_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'family',
        native: 'oila',
        nativeI18n: L('가족', 'oila', 'family', 'семья'),
      },
      {
        text: 'brother',
        native: 'aka yoki uka',
        nativeI18n: L('형제', 'aka yoki uka', 'brother', 'брат'),
      },
      {
        text: 'sister',
        native: 'opa yoki singil',
        nativeI18n: L('자매', 'opa yoki singil', 'sister', 'сестра'),
      },
      {
        text: 'parent',
        native: 'ota-ona',
        nativeI18n: L('부모', 'ota-ona', 'parent', 'родитель'),
      },
      {
        text: 'grandfather',
        native: 'bobo',
        nativeI18n: L('할아버지', 'bobo', 'grandfather', 'дедушка'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['family', 'matching'],
  },

  en_s1u8_n1_033_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'very',
      'happy',
      'rich',
      'weren’t',
      'parents',
      'My',
      'but',
      'we',
      'were',
      'was',
    ],
    answer: 'My parents weren’t rich but we were very happy',
    answerTranslation: L(
      '부모님은 부유하지 않았지만 우리는 아주 행복했어요.',
      'Ota-onam boy emas edi, lekin biz juda baxtli edik.',
      'My parents weren’t rich, but we were very happy.',
      'Мои родители не были богатыми, но мы были очень счастливы.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['past-be', 'family'],
  },

  en_s1u8_n1_034_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'family',
        native: 'oila',
        nativeI18n: L('가족', 'oila', 'family', 'семья'),
      },
      {
        text: 'brother',
        native: 'aka yoki uka',
        nativeI18n: L('형제', 'aka yoki uka', 'brother', 'брат'),
      },
      {
        text: 'sister',
        native: 'opa yoki singil',
        nativeI18n: L('자매', 'opa yoki singil', 'sister', 'сестра'),
      },
      {
        text: 'parent',
        native: 'ota-ona',
        nativeI18n: L('부모', 'ota-ona', 'parent', 'родитель'),
      },
      {
        text: 'grandfather',
        native: 'bobo',
        nativeI18n: L('할아버지', 'bobo', 'grandfather', 'дедушка'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['family', 'listening'],
  },

  en_s1u8_n1_035_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'shop assistant',
    choices: [
      { text: 'doctor', label: '🩺', emoji: '🩺', imageUrl: '' },
      { text: 'teacher', label: '👩‍🏫', emoji: '👩‍🏫', imageUrl: '' },
      { text: 'shop assistant', label: '🛍️', emoji: '🛍️', imageUrl: '' },
      { text: 'astronaut', label: '🚀', emoji: '🚀', imageUrl: '' },
    ],
    answerTranslation: L(
      '매장 직원',
      'do‘kon sotuvchisi',
      'shop assistant',
      'продавец-консультант',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['jobs'],
  },

  en_s1u8_n1_036_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ your grandfather a doctor?',
    blankAnswers: ['Was'],
    options: ['Was', 'Were', 'Is', 'Are'],
    answer: 'Was',
    answerTranslation: L(
      '할아버지는 의사였어요?',
      'Bobongiz shifokor edimi?',
      'Was your grandfather a doctor?',
      'Ваш дедушка был врачом?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['was-question'],
  },

  en_s1u8_n1_037_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'No, he ',
    sentenceSuffix: '.',
    answer: 'wasn’t',
    answerTranslation: L(
      '아니요, 아니었어요.',
      'Yo‘q, u shifokor emas edi.',
      'No, he wasn’t.',
      'Нет.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "wasn’t".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'was-not'],
  },

  en_s1u8_n1_038_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['assistant', 'shop', 'a', 'was', 'He', 'doctor', 'were'],
    answer: 'He was a shop assistant',
    audioText: 'He was a shop assistant.',
    answerTranslation: L(
      '그는 매장 직원이었어요.',
      'U do‘kon sotuvchisi edi.',
      'He was a shop assistant.',
      'Он был продавцом.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['past-job', 'was'],
  },

  en_s1u8_n1_039_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Was your grandfather a doctor?',
    options: ['No', 'he', 'wasn’t', 'was', 'Yes', 'doctor'],
    answer: 'No he wasn’t',
    answerTranslation: L(
      '아니요, 의사가 아니었어요.',
      'Yo‘q, u shifokor emas edi.',
      'No, he wasn’t.',
      'Нет.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['past-job', 'reply'],
  },

  en_s1u8_n1_040_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Were you a happy child?' }],
    options: ['Yes, I was.', 'Yes, I were.', 'No, I am.', 'I happy was.'],
    answer: 'Yes, I was.',
    answerTranslation: L(
      '네, 행복한 아이였어요.',
      'Ha, men baxtli bola edim.',
      'Yes, I was.',
      'Да.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['childhood', 'dialog'],
  },

  // ===========================================================
  // Lesson 3 · Dates and months
  // ===========================================================

  en_s1u8_n1_041_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The first of January.',
    audioText: 'The first of January.',
    answerTranslation: L(
      '1월 1일.',
      'Birinchi yanvar.',
      'The first of January.',
      'Первое января.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['dates', 'ordinal-numbers'],
  },

  en_s1u8_n1_042_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'calendar',
    choices: [
      { text: 'clock', label: '🕐', emoji: '🕐', imageUrl: '' },
      { text: 'calendar', label: '🗓️', emoji: '🗓️', imageUrl: '' },
      { text: 'book', label: '📖', emoji: '📖', imageUrl: '' },
      { text: 'phone', label: '📱', emoji: '📱', imageUrl: '' },
    ],
    answerTranslation: L('달력', 'taqvim', 'calendar', 'календарь'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['dates'],
  },

  en_s1u8_n1_043_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'January',
        native: 'yanvar',
        nativeI18n: L('1월', 'yanvar', 'January', 'январь'),
      },
      {
        text: 'February',
        native: 'fevral',
        nativeI18n: L('2월', 'fevral', 'February', 'февраль'),
      },
      {
        text: 'March',
        native: 'mart',
        nativeI18n: L('3월', 'mart', 'March', 'март'),
      },
      {
        text: 'April',
        native: 'aprel',
        nativeI18n: L('4월', 'aprel', 'April', 'апрель'),
      },
      {
        text: 'May',
        native: 'may',
        nativeI18n: L('5월', 'may', 'May', 'май'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['months', 'matching'],
  },

  en_s1u8_n1_044_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'January',
      'first',
      'the',
      'of',
      'on',
      'is',
      'Day',
      'New',
      'Year’s',
      'second',
    ],
    answer: 'New Year’s Day is on the first of January',
    answerTranslation: L(
      '새해 첫날은 1월 1일이에요.',
      'Yangi yil birinchi yanvarda.',
      'New Year’s Day is on the first of January.',
      'Новый год — первого января.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['dates', 'january'],
  },

  en_s1u8_n1_045_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'March',
      'eighth',
      'the',
      'of',
      'on',
      'is',
      'Day',
      'Women’s',
      'first',
    ],
    answer: 'Women’s Day is on the eighth of March',
    audioText: 'Women’s Day is on the eighth of March.',
    answerTranslation: L(
      '여성의 날은 3월 8일이에요.',
      'Xotin-qizlar kuni sakkizinchi martda.',
      'Women’s Day is on the eighth of March.',
      'Женский день — восьмого марта.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['dates', 'march'],
  },

  en_s1u8_n1_046_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'January',
        native: 'yanvar',
        nativeI18n: L('1월', 'yanvar', 'January', 'январь'),
      },
      {
        text: 'February',
        native: 'fevral',
        nativeI18n: L('2월', 'fevral', 'February', 'февраль'),
      },
      {
        text: 'March',
        native: 'mart',
        nativeI18n: L('3월', 'mart', 'March', 'март'),
      },
      {
        text: 'April',
        native: 'aprel',
        nativeI18n: L('4월', 'aprel', 'April', 'апрель'),
      },
      {
        text: 'May',
        native: 'may',
        nativeI18n: L('5월', 'may', 'May', 'май'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['months', 'listening'],
  },

  en_s1u8_n1_047_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'New Year’s Day is in ',
    sentenceSuffix: '.',
    answer: 'January',
    answerTranslation: L(
      '새해 첫날은 1월이에요.',
      'Yangi yil yanvar oyida.',
      'New Year’s Day is in January.',
      'Новый год — в январе.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "January".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'january'],
  },

  en_s1u8_n1_048_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'January',
    choices: [
      { text: 'March', label: '3️⃣', emoji: '3️⃣', imageUrl: '' },
      { text: 'January', label: '1️⃣', emoji: '1️⃣', imageUrl: '' },
      { text: 'April', label: '4️⃣', emoji: '4️⃣', imageUrl: '' },
      { text: 'February', label: '2️⃣', emoji: '2️⃣', imageUrl: '' },
    ],
    answerTranslation: L('1월', 'yanvar', 'January', 'январь'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['months', 'january'],
  },

  en_s1u8_n1_049_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Valentine’s Day is on the fourteenth of February.',
    audioText: 'Valentine’s Day is on the fourteenth of February.',
    answerI18n: L(
      '밸런타인데이는 2월 14일이에요',
      'Sevishganlar kuni o‘n to‘rtinchi fevralda',
      'Valentine’s Day is on the fourteenth of February',
      'День святого Валентина — четырнадцатого февраля',
    ),
    options: [
      'Valentine’s',
      'Day',
      'is',
      'on',
      'the',
      'fourteenth',
      'of',
      'February',
      'January',
    ],
    optionsI18n: {
      ko: ['밸런타인데이는', '2월', '14일이에요'],
      uz: ['Sevishganlar', 'kuni', 'o‘n', 'to‘rtinchi', 'fevralda'],
      en: [
        'Valentine’s',
        'Day',
        'is',
        'on',
        'the',
        'fourteenth',
        'of',
        'February',
      ],
      ru: ['День', 'святого', 'Валентина', 'четырнадцатого', 'февраля'],
    },
    answerTranslation: L(
      '밸런타인데이는 2월 14일이에요.',
      'Sevishganlar kuni o‘n to‘rtinchi fevralda.',
      'Valentine’s Day is on the fourteenth of February.',
      'День святого Валентина — четырнадцатого февраля.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['dates', 'february'],
  },

  en_s1u8_n1_050_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'When is Women’s Day?',
    options: ['It', 'is', 'on', 'the', 'eighth', 'of', 'March', 'May', 'first'],
    answer: 'It is on the eighth of March',
    answerTranslation: L(
      '3월 8일이에요.',
      'Sakkizinchi martda.',
      'It is on the eighth of March.',
      'Восьмого марта.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['dates', 'reply'],
  },

  en_s1u8_n1_051_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Valentine’s Day is in ',
    sentenceSuffix: '.',
    answer: 'February',
    answerTranslation: L(
      '밸런타인데이는 2월이에요.',
      'Sevishganlar kuni fevral oyida.',
      'Valentine’s Day is in February.',
      'День святого Валентина — в феврале.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "February".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'february'],
  },

  en_s1u8_n1_052_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'June',
        native: 'iyun',
        nativeI18n: L('6월', 'iyun', 'June', 'июнь'),
      },
      {
        text: 'July',
        native: 'iyul',
        nativeI18n: L('7월', 'iyul', 'July', 'июль'),
      },
      {
        text: 'August',
        native: 'avgust',
        nativeI18n: L('8월', 'avgust', 'August', 'август'),
      },
      {
        text: 'September',
        native: 'sentabr',
        nativeI18n: L('9월', 'sentabr', 'September', 'сентябрь'),
      },
      {
        text: 'October',
        native: 'oktabr',
        nativeI18n: L('10월', 'oktabr', 'October', 'октябрь'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['months', 'matching'],
  },

  en_s1u8_n1_053_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'July',
      '1969',
      'twentieth',
      'the',
      'of',
      'on',
      'was',
      'landing',
      'moon',
      'The',
      'March',
    ],
    answer: 'The moon landing was on the twentieth of July 1969',
    answerTranslation: L(
      '최초의 달 착륙은 1969년 7월 20일이었어요.',
      'Oyga qo‘nish 1969-yil yigirmanchi iyulda bo‘lgan.',
      'The moon landing was on the twentieth of July 1969.',
      'Высадка на Луну была двадцатого июля 1969 года.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['dates', 'july'],
  },

  en_s1u8_n1_054_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'June',
        native: 'iyun',
        nativeI18n: L('6월', 'iyun', 'June', 'июнь'),
      },
      {
        text: 'July',
        native: 'iyul',
        nativeI18n: L('7월', 'iyul', 'July', 'июль'),
      },
      {
        text: 'August',
        native: 'avgust',
        nativeI18n: L('8월', 'avgust', 'August', 'август'),
      },
      {
        text: 'September',
        native: 'sentabr',
        nativeI18n: L('9월', 'sentabr', 'September', 'сентябрь'),
      },
      {
        text: 'October',
        native: 'oktabr',
        nativeI18n: L('10월', 'oktabr', 'October', 'октябрь'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['months', 'listening'],
  },

  en_s1u8_n1_055_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'March',
    choices: [
      { text: 'January', label: '1️⃣', emoji: '1️⃣', imageUrl: '' },
      { text: 'February', label: '2️⃣', emoji: '2️⃣', imageUrl: '' },
      { text: 'March', label: '3️⃣', emoji: '3️⃣', imageUrl: '' },
      { text: 'April', label: '4️⃣', emoji: '4️⃣', imageUrl: '' },
    ],
    answerTranslation: L('3월', 'mart', 'March', 'март'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['months', 'march'],
  },

  en_s1u8_n1_056_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'New Year’s Day is on the ___ of January.',
    blankAnswers: ['first'],
    options: ['first', 'second', 'third', 'fifth'],
    answer: 'first',
    answerTranslation: L(
      '새해 첫날은 1월 1일이에요.',
      'Yangi yil birinchi yanvarda.',
      'New Year’s Day is on the first of January.',
      'Новый год — первого января.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['ordinal-numbers', 'first'],
  },

  en_s1u8_n1_057_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'New Year’s Eve is in ',
    sentenceSuffix: '.',
    answer: 'December',
    answerTranslation: L(
      '새해 전날은 12월이에요.',
      'Yangi yil arafasi dekabr oyida.',
      'New Year’s Eve is in December.',
      'Канун Нового года — в декабре.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "December".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'december'],
  },

  en_s1u8_n1_058_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'December',
      '2013',
      'fifth',
      'the',
      'of',
      'on',
      'died',
      'Mandela',
      'Nelson',
      'July',
    ],
    answer: 'Nelson Mandela died on the fifth of December 2013',
    audioText: 'Nelson Mandela died on the fifth of December 2013.',
    answerTranslation: L(
      '넬슨 만델라는 2013년 12월 5일에 사망했어요.',
      'Nelson Mandela 2013-yil beshinchi dekabrda vafot etgan.',
      'Nelson Mandela died on the fifth of December 2013.',
      'Нельсон Мандела умер пятого декабря 2013 года.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['dates', 'december'],
  },

  en_s1u8_n1_059_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'When is New Year’s Eve?',
    options: [
      'It',
      'is',
      'on',
      'the',
      'thirty-first',
      'of',
      'December',
      'January',
      'twentieth',
    ],
    answer: 'It is on the thirty-first of December',
    answerTranslation: L(
      '12월 31일이에요.',
      'O‘ttiz birinchi dekabrda.',
      'It is on the thirty-first of December.',
      'Тридцать первого декабря.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['dates', 'reply'],
  },

  en_s1u8_n1_060_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'When is Independence Day in the USA?' },
    ],
    options: [
      'It is on the fourth of July.',
      'It is the July four.',
      'It was on March first.',
      'July is fourth day.',
    ],
    answer: 'It is on the fourth of July.',
    answerTranslation: L(
      '7월 4일이에요.',
      'To‘rtinchi iyulda.',
      'It is on the fourth of July.',
      'Четвёртого июля.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['dates', 'dialog'],
  },

  // ===========================================================
  // Lesson 4 · Then and now
  // ===========================================================

  en_s1u8_n1_061_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'At seven, I was a happy child.',
    audioText: 'At seven, I was a happy child.',
    answerTranslation: L(
      '일곱 살 때 저는 행복한 아이였어요.',
      'Yetti yoshimda men baxtli bola edim.',
      'At seven, I was a happy child.',
      'В семь лет я был счастливым ребёнком.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['then-and-now', 'childhood'],
  },

  en_s1u8_n1_062_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'school',
    choices: [
      { text: 'hospital', label: '🏥', emoji: '🏥', imageUrl: '' },
      { text: 'school', label: '🏫', emoji: '🏫', imageUrl: '' },
      { text: 'cinema', label: '🎬', emoji: '🎬', imageUrl: '' },
      { text: 'bank', label: '🏦', emoji: '🏦', imageUrl: '' },
    ],
    answerTranslation: L('학교', 'maktab', 'school', 'школа'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['school'],
  },

  en_s1u8_n1_063_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'first',
        native: 'birinchi',
        nativeI18n: L('첫 번째', 'birinchi', 'first', 'первый'),
      },
      {
        text: 'second',
        native: 'ikkinchi',
        nativeI18n: L('두 번째', 'ikkinchi', 'second', 'второй'),
      },
      {
        text: 'third',
        native: 'uchinchi',
        nativeI18n: L('세 번째', 'uchinchi', 'third', 'третий'),
      },
      {
        text: 'twentieth',
        native: 'yigirmanchi',
        nativeI18n: L('스무 번째', 'yigirmanchi', 'twentieth', 'двадцатый'),
      },
      {
        text: 'thirtieth',
        native: 'o‘ttizinchi',
        nativeI18n: L('서른 번째', 'o‘ttizinchi', 'thirtieth', 'тридцатый'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['ordinal-numbers', 'matching'],
  },

  en_s1u8_n1_064_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'astronaut',
      'an',
      'be',
      'to',
      'was',
      'dream',
      'My',
      'doctor',
      'were',
    ],
    answer: 'My dream was to be an astronaut',
    answerTranslation: L(
      '제 꿈은 우주비행사가 되는 것이었어요.',
      'Mening orzuim astronavt bo‘lish edi.',
      'My dream was to be an astronaut.',
      'Я мечтал стать астронавтом.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['then-and-now', 'dream'],
  },

  en_s1u8_n1_065_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'happy',
      'very',
      'were',
      'we',
      'but',
      'rich',
      'weren’t',
      'parents',
      'My',
      'was',
    ],
    answer: 'My parents weren’t rich but we were very happy',
    audioText: 'My parents weren’t rich, but we were very happy.',
    answerTranslation: L(
      '부모님은 부유하지 않았지만 우리는 아주 행복했어요.',
      'Ota-onam boy emas edi, lekin biz juda baxtli edik.',
      'My parents weren’t rich, but we were very happy.',
      'Мои родители не были богатыми, но мы были очень счастливы.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['then-and-now', 'past-be'],
  },

  en_s1u8_n1_066_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'first',
        native: 'birinchi',
        nativeI18n: L('첫 번째', 'birinchi', 'first', 'первый'),
      },
      {
        text: 'second',
        native: 'ikkinchi',
        nativeI18n: L('두 번째', 'ikkinchi', 'second', 'второй'),
      },
      {
        text: 'third',
        native: 'uchinchi',
        nativeI18n: L('세 번째', 'uchinchi', 'third', 'третий'),
      },
      {
        text: 'twentieth',
        native: 'yigirmanchi',
        nativeI18n: L('스무 번째', 'yigirmanchi', 'twentieth', 'двадцатый'),
      },
      {
        text: 'thirtieth',
        native: 'o‘ttizinchi',
        nativeI18n: L('서른 번째', 'o‘ttizinchi', 'thirtieth', 'тридцатый'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['ordinal-numbers', 'listening'],
  },

  en_s1u8_n1_067_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'At fourteen, I ',
    sentenceSuffix: ' very quiet.',
    answer: 'was',
    answerTranslation: L(
      '열네 살 때 저는 아주 조용했어요.',
      'O‘n to‘rt yoshimda men juda sokin edim.',
      'At fourteen, I was very quiet.',
      'В четырнадцать лет я был очень тихим.',
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

  en_s1u8_n1_068_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'astronaut',
    choices: [
      { text: 'doctor', label: '🩺', emoji: '🩺', imageUrl: '' },
      { text: 'teacher', label: '👩‍🏫', emoji: '👩‍🏫', imageUrl: '' },
      { text: 'astronaut', label: '🚀', emoji: '🚀', imageUrl: '' },
      { text: 'actor', label: '🎭', emoji: '🎭', imageUrl: '' },
    ],
    answerTranslation: L('우주비행사', 'astronavt', 'astronaut', 'астронавт'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['dream-job'],
  },

  en_s1u8_n1_069_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'My school was a great school.',
    audioText: 'My school was a great school.',
    answerI18n: L(
      '제 학교는 훌륭한 학교였어요',
      'Mening maktabim juda yaxshi maktab edi',
      'My school was a great school',
      'Моя школа была отличной',
    ),
    options: [
      'My',
      'school',
      'was',
      'a',
      'great',
      'school',
      'were',
      'expensive',
    ],
    optionsI18n: {
      ko: ['제', '학교는', '훌륭한', '학교였어요'],
      uz: ['Mening', 'maktabim', 'juda', 'yaxshi', 'maktab', 'edi'],
      en: ['My', 'school', 'was', 'a', 'great', 'school'],
      ru: ['Моя', 'школа', 'была', 'отличной'],
    },
    answerTranslation: L(
      '제 학교는 훌륭한 학교였어요.',
      'Mening maktabim juda yaxshi maktab edi.',
      'My school was a great school.',
      'Моя школа была отличной.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['school', 'was'],
  },

  en_s1u8_n1_070_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Were you happy at seven?',
    options: ['Yes', 'I', 'was', 'were', 'happy', 'No'],
    answer: 'Yes I was',
    answerTranslation: L(
      '네, 행복했어요.',
      'Ha, men baxtli edim.',
      'Yes, I was.',
      'Да.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['childhood', 'reply'],
  },

  en_s1u8_n1_071_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'My parents ',
    sentenceSuffix: ' very happy.',
    answer: 'were',
    answerTranslation: L(
      '부모님은 아주 행복했어요.',
      'Ota-onam juda baxtli edi.',
      'My parents were very happy.',
      'Мои родители были очень счастливы.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "were".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'were'],
  },

  en_s1u8_n1_072_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'November',
        native: 'noyabr',
        nativeI18n: L('11월', 'noyabr', 'November', 'ноябрь'),
      },
      {
        text: 'December',
        native: 'dekabr',
        nativeI18n: L('12월', 'dekabr', 'December', 'декабрь'),
      },
      {
        text: 'sixth',
        native: 'oltinchi',
        nativeI18n: L('여섯 번째', 'oltinchi', 'sixth', 'шестой'),
      },
      {
        text: 'ninth',
        native: 'to‘qqizinchi',
        nativeI18n: L('아홉 번째', 'to‘qqizinchi', 'ninth', 'девятый'),
      },
      {
        text: 'tenth',
        native: 'o‘ninchi',
        nativeI18n: L('열 번째', 'o‘ninchi', 'tenth', 'десятый'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['dates', 'review', 'matching'],
  },

  en_s1u8_n1_073_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['engineer', 'an', 'am', 'I', 'Now', 'was', 'astronaut'],
    answer: 'Now I am an engineer',
    answerTranslation: L(
      '지금 저는 엔지니어예요.',
      'Hozir men muhandisman.',
      'Now I am an engineer.',
      'Сейчас я инженер.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['then-and-now', 'present'],
  },

  en_s1u8_n1_074_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'November',
        native: 'noyabr',
        nativeI18n: L('11월', 'noyabr', 'November', 'ноябрь'),
      },
      {
        text: 'December',
        native: 'dekabr',
        nativeI18n: L('12월', 'dekabr', 'December', 'декабрь'),
      },
      {
        text: 'sixth',
        native: 'oltinchi',
        nativeI18n: L('여섯 번째', 'oltinchi', 'sixth', 'шестой'),
      },
      {
        text: 'ninth',
        native: 'to‘qqizinchi',
        nativeI18n: L('아홉 번째', 'to‘qqizinchi', 'ninth', 'девятый'),
      },
      {
        text: 'tenth',
        native: 'o‘ninchi',
        nativeI18n: L('열 번째', 'o‘ninchi', 'tenth', 'десятый'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['dates', 'review', 'listening'],
  },

  en_s1u8_n1_075_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'family',
    choices: [
      { text: 'family', label: '👨‍👩‍👧‍👦', emoji: '👨‍👩‍👧‍👦', imageUrl: '' },
      { text: 'school', label: '🏫', emoji: '🏫', imageUrl: '' },
      { text: 'doctor', label: '🩺', emoji: '🩺', imageUrl: '' },
      { text: 'actor', label: '🎭', emoji: '🎭', imageUrl: '' },
    ],
    answerTranslation: L('가족', 'oila', 'family', 'семья'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['family'],
  },

  en_s1u8_n1_076_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'At seven, I ___ a happy child.',
    blankAnswers: ['was'],
    options: ['was', 'were', 'am', 'are'],
    answer: 'was',
    answerTranslation: L(
      '일곱 살 때 저는 행복한 아이였어요.',
      'Yetti yoshimda men baxtli bola edim.',
      'At seven, I was a happy child.',
      'В семь лет я был счастливым ребёнком.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['past-be', 'childhood'],
  },

  en_s1u8_n1_077_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'My school ',
    sentenceSuffix: ' expensive.',
    answer: 'wasn’t',
    answerTranslation: L(
      '제 학교는 비싼 학교가 아니었어요.',
      'Mening maktabim qimmat emas edi.',
      'My school wasn’t expensive.',
      'Моя школа не была дорогой.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "wasn’t".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'was-not'],
  },

  en_s1u8_n1_078_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['expensive', 'wasn’t', 'school', 'My', 'great', 'were'],
    answer: 'My school wasn’t expensive',
    audioText: 'My school wasn’t expensive.',
    answerTranslation: L(
      '제 학교는 비싸지 않았어요.',
      'Mening maktabim qimmat emas edi.',
      'My school wasn’t expensive.',
      'Моя школа не была дорогой.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['school', 'was-not'],
  },

  en_s1u8_n1_079_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Was your school expensive?',
    options: ['No', 'it', 'wasn’t', 'was', 'Yes', 'school'],
    answer: 'No it wasn’t',
    answerTranslation: L(
      '아니요, 비싸지 않았어요.',
      'Yo‘q, qimmat emas edi.',
      'No, it wasn’t.',
      'Нет.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['school', 'reply'],
  },

  en_s1u8_n1_080_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What were you like at seven?' }],
    options: [
      'I was a happy child.',
      'I were a happy child.',
      'I am seven yesterday.',
      'I happy was child.',
    ],
    answer: 'I was a happy child.',
    answerTranslation: L(
      '저는 행복한 아이였어요.',
      'Men baxtli bola edim.',
      'I was a happy child.',
      'Я был счастливым ребёнком.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['then-and-now', 'final'],
  },
};

export const EN_S1_UNIT8_NODE1 = {
  title: L(
    '우리가 일곱 살이었을 때',
    'Biz yetti yoshda bo‘lganimizda',
    'When we were seven',
    'Когда нам было семь лет',
  ),
  section: 1,
  unit: 8,
  order: 1,
  isActive: true,

  lessons: [
    {
      title: L('was와 were', 'Was va were', 'Was and were', 'Was и were'),
      description: L(
        'was, were, wasn’t, weren’t를 사용해 과거의 사람과 상황을 말하고 질문해요.',
        'Was, were, wasn’t va weren’t yordamida o‘tmishdagi odamlar va holatlar haqida gapirasiz.',
        'Use was, were, wasn’t and weren’t to talk and ask about people and situations in the past.',
        'Используем was, were, wasn’t и weren’t, чтобы говорить и спрашивать о прошлом.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 1,
      questions: [
        'en_s1u8_n1_001_speaking',
        'en_s1u8_n1_002_image_choice',
        'en_s1u8_n1_003_word_matching',
        'en_s1u8_n1_004_translate_builder',
        'en_s1u8_n1_005_word_arrange',
        'en_s1u8_n1_006_audio_match',
        'en_s1u8_n1_007_type_answer',
        'en_s1u8_n1_008_image_choice',
        'en_s1u8_n1_009_sentence_builder',
        'en_s1u8_n1_010_reply_builder',
        'en_s1u8_n1_011_type_answer',
        'en_s1u8_n1_012_word_matching',
        'en_s1u8_n1_013_translate_builder',
        'en_s1u8_n1_014_audio_match',
        'en_s1u8_n1_015_image_choice',
        'en_s1u8_n1_016_fill_in_blank',
        'en_s1u8_n1_017_type_answer',
        'en_s1u8_n1_018_word_arrange',
        'en_s1u8_n1_019_reply_builder',
        'en_s1u8_n1_020_dialog_complete',
      ],
    },

    {
      title: L(
        '어린 시절 이야기',
        'Bolalik haqida gapirish',
        'Childhood',
        'Детство',
      ),
      description: L(
        '태어난 곳과 시기, 가족, 부모님의 직업과 어린 시절의 모습을 was와 were로 말해요.',
        'Tug‘ilgan joyingiz, vaqtingiz, oilangiz va bolaligingiz haqida was va were bilan gapirasiz.',
        'Talk about where you were born, your family and your childhood using was and were.',
        'Рассказываем о месте рождения, семье и детстве с помощью was и were.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 2,
      questions: [
        'en_s1u8_n1_021_speaking',
        'en_s1u8_n1_022_image_choice',
        'en_s1u8_n1_023_word_matching',
        'en_s1u8_n1_024_translate_builder',
        'en_s1u8_n1_025_word_arrange',
        'en_s1u8_n1_026_audio_match',
        'en_s1u8_n1_027_type_answer',
        'en_s1u8_n1_028_image_choice',
        'en_s1u8_n1_029_sentence_builder',
        'en_s1u8_n1_030_reply_builder',
        'en_s1u8_n1_031_type_answer',
        'en_s1u8_n1_032_word_matching',
        'en_s1u8_n1_033_translate_builder',
        'en_s1u8_n1_034_audio_match',
        'en_s1u8_n1_035_image_choice',
        'en_s1u8_n1_036_fill_in_blank',
        'en_s1u8_n1_037_type_answer',
        'en_s1u8_n1_038_word_arrange',
        'en_s1u8_n1_039_reply_builder',
        'en_s1u8_n1_040_dialog_complete',
      ],
    },

    {
      title: L(
        '날짜와 월',
        'Sanalar va oylar',
        'Dates and months',
        'Даты и месяцы',
      ),
      description: L(
        '1월부터 12월까지의 월 이름과 first, second, third 같은 서수를 사용해 날짜를 읽고 말해요.',
        'Yanvardan dekabrgacha oy nomlari va first, second, third kabi tartib sonlari bilan sanalarni aytasiz.',
        'Learn the months and use ordinal numbers such as first, second and third to say dates.',
        'Изучаем месяцы и порядковые числительные first, second, third и другие для называния дат.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 3,
      questions: [
        'en_s1u8_n1_041_speaking',
        'en_s1u8_n1_042_image_choice',
        'en_s1u8_n1_043_word_matching',
        'en_s1u8_n1_044_translate_builder',
        'en_s1u8_n1_045_word_arrange',
        'en_s1u8_n1_046_audio_match',
        'en_s1u8_n1_047_type_answer',
        'en_s1u8_n1_048_image_choice',
        'en_s1u8_n1_049_sentence_builder',
        'en_s1u8_n1_050_reply_builder',
        'en_s1u8_n1_051_type_answer',
        'en_s1u8_n1_052_word_matching',
        'en_s1u8_n1_053_translate_builder',
        'en_s1u8_n1_054_audio_match',
        'en_s1u8_n1_055_image_choice',
        'en_s1u8_n1_056_fill_in_blank',
        'en_s1u8_n1_057_type_answer',
        'en_s1u8_n1_058_word_arrange',
        'en_s1u8_n1_059_reply_builder',
        'en_s1u8_n1_060_dialog_complete',
      ],
    },

    {
      title: L(
        '그때와 지금',
        'O‘sha payt va hozir',
        'Then and now',
        'Тогда и сейчас',
      ),
      description: L(
        '어린 시절의 성격, 가족, 학교와 꿈을 과거형으로 말하고 현재의 모습과 비교해요.',
        'Bolalikdagi fe’l-atvoringiz, oilangiz, maktabingiz va orzularingizni o‘tmishda aytib, hozirgi hayotingiz bilan solishtirasiz.',
        'Talk about your childhood, family, school and dreams in the past and compare them with your life now.',
        'Рассказываем о детстве, семье, школе и мечтах в прошлом и сравниваем их с настоящим.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 4,
      questions: [
        'en_s1u8_n1_061_speaking',
        'en_s1u8_n1_062_image_choice',
        'en_s1u8_n1_063_word_matching',
        'en_s1u8_n1_064_translate_builder',
        'en_s1u8_n1_065_word_arrange',
        'en_s1u8_n1_066_audio_match',
        'en_s1u8_n1_067_type_answer',
        'en_s1u8_n1_068_image_choice',
        'en_s1u8_n1_069_sentence_builder',
        'en_s1u8_n1_070_reply_builder',
        'en_s1u8_n1_071_type_answer',
        'en_s1u8_n1_072_word_matching',
        'en_s1u8_n1_073_translate_builder',
        'en_s1u8_n1_074_audio_match',
        'en_s1u8_n1_075_image_choice',
        'en_s1u8_n1_076_fill_in_blank',
        'en_s1u8_n1_077_type_answer',
        'en_s1u8_n1_078_word_arrange',
        'en_s1u8_n1_079_reply_builder',
        'en_s1u8_n1_080_dialog_complete',
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Section 1 · Unit 8 · Node 2
// 8.2 Lives from the past
//
// Coverage
// - born / die
// - writer / artist / scientist / leader
// - carpenter / education / glider
// - flight / accident / adventure / article
// - past simple regular verbs
// - -ed / -d / consonant + y → -ied
// - describing a person's past life
// - past vs present listening clues
//
// Reused:
// live / study / work / travel / visit
// talk / help / love / start / use
// walk / watch / play / open
//
// IMPORTANT:
// *_WORDS에는 무조건 단어만 등록.
// "was born", "civil rights leader",
// "flying accident" 같은 구/문장은 등록하지 않음.
//
// 4 lessons × 20 questions = 80
// type_answer: 3 per lesson
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT8_NODE2_WORDS = [
  {
    code: 'en-adjective-born',
    english: 'born',
    senseKey: 'brought-into-life',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('태어난', 'tug‘ilgan', 'brought into life', 'рождённый'),
    examples: [
      {
        english: 'Ingrid Bergman was born in 1915.',
        translations: L(
          '잉그리드 베리만은 1915년에 태어났어요.',
          'Ingrid Bergman 1915-yilda tug‘ilgan.',
          'Ingrid Bergman was born in 1915.',
          'Ингрид Бергман родилась в 1915 году.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/bɔːn/',
      ttsText: 'born',
    },
    media: {
      emoji: '👶',
      imageUrl: '',
      imageAlt: L(
        '태어난 아기',
        'tug‘ilgan chaqaloq',
        'a newborn baby',
        'новорождённый ребёнок',
      ),
    },
    tags: ['past', 'life'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-die',
    english: 'die',
    senseKey: 'stop-living',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L('죽다; 사망하다', 'vafot etmoq', 'to stop living', 'умирать'),
    examples: [
      {
        english: 'Ingrid Bergman died in 1982.',
        translations: L(
          '잉그리드 베리만은 1982년에 사망했어요.',
          'Ingrid Bergman 1982-yilda vafot etgan.',
          'Ingrid Bergman died in 1982.',
          'Ингрид Бергман умерла в 1982 году.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/daɪ/',
      ttsText: 'die',
    },
    media: {
      emoji: '🕯️',
      imageUrl: '',
      imageAlt: L(
        '추모 촛불',
        'xotira shami',
        'a memorial candle',
        'поминальная свеча',
      ),
    },
    tags: ['past', 'life', 'verbs'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-job-writer',
    english: 'writer',
    senseKey: 'person-who-writes-books-or-texts',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '작가',
      'yozuvchi',
      'a person who writes books, stories or other texts',
      'писатель',
    ),
    examples: [
      {
        english: 'Leo Tolstoy was a writer.',
        translations: L(
          '레오 톨스토이는 작가였어요.',
          'Lev Tolstoy yozuvchi edi.',
          'Leo Tolstoy was a writer.',
          'Лев Толстой был писателем.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈraɪtə/',
      ttsText: 'writer',
    },
    media: {
      emoji: '✍️',
      imageUrl: '',
      imageAlt: L(
        '글을 쓰는 작가',
        'yozayotgan yozuvchi',
        'a writer',
        'писатель',
      ),
    },
    tags: ['jobs', 'people'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-job-artist',
    english: 'artist',
    senseKey: 'person-who-creates-art',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '예술가; 화가',
      'rassom',
      'a person who creates art',
      'художник',
    ),
    examples: [
      {
        english: 'Frida Kahlo was an artist.',
        translations: L(
          '프리다 칼로는 예술가였어요.',
          'Frida Kalo rassom edi.',
          'Frida Kahlo was an artist.',
          'Фрида Кало была художницей.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈɑːtɪst/',
      ttsText: 'artist',
    },
    media: {
      emoji: '🎨',
      imageUrl: '',
      imageAlt: L(
        '그림을 그리는 예술가',
        'rasm chizayotgan rassom',
        'an artist',
        'художник',
      ),
    },
    tags: ['jobs', 'art'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-job-scientist',
    english: 'scientist',
    senseKey: 'person-working-in-science',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '과학자',
      'olim',
      'a person who studies or works in science',
      'учёный',
    ),
    examples: [
      {
        english: 'Marie Curie was a scientist.',
        translations: L(
          '마리 퀴리는 과학자였어요.',
          'Mari Kyuri olim edi.',
          'Marie Curie was a scientist.',
          'Мария Кюри была учёным.',
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
      imageAlt: L('과학자', 'olim', 'a scientist', 'учёный'),
    },
    tags: ['jobs', 'science'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-person-leader',
    english: 'leader',
    senseKey: 'person-who-leads-group',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '지도자',
      'yetakchi',
      'a person who leads a group or organization',
      'лидер',
    ),
    examples: [
      {
        english: 'Martin Luther King was an important leader.',
        translations: L(
          '마틴 루터 킹은 중요한 지도자였어요.',
          'Martin Lyuter King muhim yetakchi edi.',
          'Martin Luther King was an important leader.',
          'Мартин Лютер Кинг был важным лидером.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈliːdə/',
      ttsText: 'leader',
    },
    media: {
      emoji: '🗣️',
      imageUrl: '',
      imageAlt: L(
        '사람들 앞의 지도자',
        'odamlar oldidagi yetakchi',
        'a leader',
        'лидер',
      ),
    },
    tags: ['people', 'history'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-job-carpenter',
    english: 'carpenter',
    senseKey: 'person-making-things-from-wood',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '목수',
      'duradgor',
      'a person whose job is to make or repair things made of wood',
      'плотник',
    ),
    examples: [
      {
        english: 'Jan was a carpenter.',
        translations: L(
          '얀은 목수였어요.',
          'Yan duradgor edi.',
          'Jan was a carpenter.',
          'Ян был плотником.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkɑːpəntə/',
      ttsText: 'carpenter',
    },
    media: {
      emoji: '🪚',
      imageUrl: '',
      imageAlt: L('목수', 'duradgor', 'a carpenter', 'плотник'),
    },
    tags: ['jobs', 'people'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-education',
    english: 'education',
    senseKey: 'process-of-learning-at-school',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '교육',
      'ta’lim',
      'the process of teaching and learning',
      'образование',
    ),
    examples: [
      {
        english: 'Jan had no school education.',
        translations: L(
          '얀은 학교 교육을 받지 못했어요.',
          'Yanning maktab ta’limi bo‘lmagan.',
          'Jan had no school education.',
          'У Яна не было школьного образования.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌedʒuˈkeɪʃən/',
      ttsText: 'education',
    },
    media: {
      emoji: '🎓',
      imageUrl: '',
      imageAlt: L('교육과 학습', 'ta’lim', 'education', 'образование'),
    },
    tags: ['learning', 'life'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-vehicle-glider',
    english: 'glider',
    senseKey: 'aircraft-without-engine',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '글라이더',
      'planer',
      'a light aircraft that flies without an engine',
      'планер',
    ),
    examples: [
      {
        english: 'Jan made a glider.',
        translations: L(
          '얀은 글라이더를 만들었어요.',
          'Yan planer yasadi.',
          'Jan made a glider.',
          'Ян сделал планер.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈɡlaɪdə/',
      ttsText: 'glider',
    },
    media: {
      emoji: '🛩️',
      imageUrl: '',
      imageAlt: L(
        '하늘을 나는 글라이더',
        'uchayotgan planer',
        'a glider',
        'планер',
      ),
    },
    tags: ['history', 'transport'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-flight',
    english: 'flight',
    senseKey: 'journey-through-air',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '비행',
      'parvoz',
      'a journey or movement through the air',
      'полёт',
    ),
    examples: [
      {
        english: 'Jan made several short flights.',
        translations: L(
          '얀은 몇 차례 짧은 비행을 했어요.',
          'Yan bir necha qisqa parvoz qildi.',
          'Jan made several short flights.',
          'Ян совершил несколько коротких полётов.',
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
      imageAlt: L('비행', 'parvoz', 'a flight', 'полёт'),
    },
    tags: ['travel', 'history'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-accident',
    english: 'accident',
    senseKey: 'unexpected-event-causing-harm',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '사고',
      'baxtsiz hodisa',
      'an unexpected event that causes damage or injury',
      'несчастный случай',
    ),
    examples: [
      {
        english: 'Jan died in an accident.',
        translations: L(
          '얀은 사고로 사망했어요.',
          'Yan baxtsiz hodisada vafot etdi.',
          'Jan died in an accident.',
          'Ян погиб в результате несчастного случая.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈæksɪdənt/',
      ttsText: 'accident',
    },
    media: {
      emoji: '⚠️',
      imageUrl: '',
      imageAlt: L(
        '사고 경고 표시',
        'baxtsiz hodisa belgisi',
        'an accident warning sign',
        'знак предупреждения об аварии',
      ),
    },
    tags: ['life', 'events'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-adventure',
    english: 'adventure',
    senseKey: 'exciting-unusual-experience',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '모험',
      'sarguzasht',
      'an exciting or unusual experience',
      'приключение',
    ),
    examples: [
      {
        english: 'Harriet loved adventure.',
        translations: L(
          '해리엇은 모험을 좋아했어요.',
          'Harriet sarguzashtni yaxshi ko‘rardi.',
          'Harriet loved adventure.',
          'Харриет любила приключения.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ədˈventʃə/',
      ttsText: 'adventure',
    },
    media: {
      emoji: '🧭',
      imageUrl: '',
      imageAlt: L('모험 여행', 'sarguzasht', 'an adventure', 'приключение'),
    },
    tags: ['travel', 'life'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-article',
    english: 'article',
    senseKey: 'piece-of-writing-in-publication',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '기사; 글',
      'maqola',
      'a piece of writing in a newspaper, magazine or website',
      'статья',
    ),
    examples: [
      {
        english: 'Harriet worked on articles about her travels.',
        translations: L(
          '해리엇은 자신의 여행에 대한 기사를 썼어요.',
          'Harriet sayohatlari haqida maqolalar ustida ishladi.',
          'Harriet worked on articles about her travels.',
          'Харриет работала над статьями о своих путешествиях.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈɑːtɪkəl/',
      ttsText: 'article',
    },
    media: {
      emoji: '📰',
      imageUrl: '',
      imageAlt: L('신문 기사', 'gazeta maqolasi', 'an article', 'статья'),
    },
    tags: ['writing', 'travel'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-history',
    english: 'history',
    senseKey: 'study-of-past-events',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '역사',
      'tarix',
      'the study or story of events in the past',
      'история',
    ),
    examples: [
      {
        english: 'They were important people in history.',
        translations: L(
          '그들은 역사적으로 중요한 사람들이었어요.',
          'Ular tarixdagi muhim insonlar edi.',
          'They were important people in history.',
          'Они были важными людьми в истории.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈhɪstəri/',
      ttsText: 'history',
    },
    media: {
      emoji: '🏛️',
      imageUrl: '',
      imageAlt: L('역사 자료', 'tarixiy material', 'history', 'история'),
    },
    tags: ['past', 'history'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-return',
    english: 'return',
    senseKey: 'go-back-to-place',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '돌아오다',
      'qaytmoq',
      'to go or come back to a place',
      'возвращаться',
    ),
    examples: [
      {
        english: 'Harriet returned to the USA.',
        translations: L(
          '해리엇은 미국으로 돌아왔어요.',
          'Harriet AQShga qaytdi.',
          'Harriet returned to the USA.',
          'Харриет вернулась в США.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/rɪˈtɜːn/',
      ttsText: 'return',
    },
    media: {
      emoji: '↩️',
      imageUrl: '',
      imageAlt: L('돌아가는 방향', 'qaytish', 'returning', 'возвращение'),
    },
    tags: ['travel', 'verbs'],
    difficulty: 1,
    isCore: true,
  },
];

export const EN_S1_UNIT8_NODE2_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Famous lives
  // ===========================================================

  en_s1u8_n2_001_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Ingrid Bergman was born in 1915.',
    audioText: 'Ingrid Bergman was born in 1915.',
    answerTranslation: L(
      '잉그리드 베리만은 1915년에 태어났어요.',
      'Ingrid Bergman 1915-yilda tug‘ilgan.',
      'Ingrid Bergman was born in 1915.',
      'Ингрид Бергман родилась в 1915 году.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['born', 'past-life'],
  },

  en_s1u8_n2_002_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'writer',
    choices: [
      { text: 'scientist', label: '🔬', emoji: '🔬', imageUrl: '' },
      { text: 'writer', label: '✍️', emoji: '✍️', imageUrl: '' },
      { text: 'artist', label: '🎨', emoji: '🎨', imageUrl: '' },
      { text: 'carpenter', label: '🪚', emoji: '🪚', imageUrl: '' },
    ],
    answerTranslation: L('작가', 'yozuvchi', 'writer', 'писатель'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['writer'],
  },

  en_s1u8_n2_003_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'writer',
        native: 'yozuvchi',
        nativeI18n: L('작가', 'yozuvchi', 'writer', 'писатель'),
      },
      {
        text: 'artist',
        native: 'rassom',
        nativeI18n: L('예술가', 'rassom', 'artist', 'художник'),
      },
      {
        text: 'scientist',
        native: 'olim',
        nativeI18n: L('과학자', 'olim', 'scientist', 'учёный'),
      },
      {
        text: 'leader',
        native: 'yetakchi',
        nativeI18n: L('지도자', 'yetakchi', 'leader', 'лидер'),
      },
      {
        text: 'carpenter',
        native: 'duradgor',
        nativeI18n: L('목수', 'duradgor', 'carpenter', 'плотник'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['jobs', 'matching'],
  },

  en_s1u8_n2_004_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['an', 'artist', 'was', 'Frida', 'Kahlo', 'scientist', 'writer'],
    answer: 'Frida Kahlo was an artist',
    answerTranslation: L(
      '프리다 칼로는 예술가였어요.',
      'Frida Kalo rassom edi.',
      'Frida Kahlo was an artist.',
      'Фрида Кало была художницей.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['artist', 'past-life'],
  },

  en_s1u8_n2_005_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['1982', 'in', 'died', 'She', 'born', 'was', '1915'],
    answer: 'She died in 1982',
    audioText: 'She died in 1982.',
    answerTranslation: L(
      '그녀는 1982년에 사망했어요.',
      'U 1982-yilda vafot etgan.',
      'She died in 1982.',
      'Она умерла в 1982 году.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['die', 'past'],
  },

  en_s1u8_n2_006_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'writer',
        native: 'yozuvchi',
        nativeI18n: L('작가', 'yozuvchi', 'writer', 'писатель'),
      },
      {
        text: 'artist',
        native: 'rassom',
        nativeI18n: L('예술가', 'rassom', 'artist', 'художник'),
      },
      {
        text: 'scientist',
        native: 'olim',
        nativeI18n: L('과학자', 'olim', 'scientist', 'учёный'),
      },
      {
        text: 'leader',
        native: 'yetakchi',
        nativeI18n: L('지도자', 'yetakchi', 'leader', 'лидер'),
      },
      {
        text: 'carpenter',
        native: 'duradgor',
        nativeI18n: L('목수', 'duradgor', 'carpenter', 'плотник'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['jobs', 'listening'],
  },

  en_s1u8_n2_007_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Leo Tolstoy was a ',
    sentenceSuffix: '.',
    answer: 'writer',
    answerTranslation: L(
      '레오 톨스토이는 작가였어요.',
      'Lev Tolstoy yozuvchi edi.',
      'Leo Tolstoy was a writer.',
      'Лев Толстой был писателем.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "writer".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'writer'],
  },

  en_s1u8_n2_008_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'scientist',
    choices: [
      { text: 'artist', label: '🎨', emoji: '🎨', imageUrl: '' },
      { text: 'carpenter', label: '🪚', emoji: '🪚', imageUrl: '' },
      { text: 'scientist', label: '🔬', emoji: '🔬', imageUrl: '' },
      { text: 'writer', label: '✍️', emoji: '✍️', imageUrl: '' },
    ],
    answerTranslation: L('과학자', 'olim', 'scientist', 'учёный'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['scientist'],
  },

  en_s1u8_n2_009_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Marie Curie was a scientist from Poland.',
    audioText: 'Marie Curie was a scientist from Poland.',
    answerI18n: L(
      '마리 퀴리는 폴란드 출신 과학자였어요',
      'Mari Kyuri Polshadan bo‘lgan olim edi',
      'Marie Curie was a scientist from Poland',
      'Мария Кюри была учёным из Польши',
    ),
    options: [
      'Marie',
      'Curie',
      'was',
      'a',
      'scientist',
      'from',
      'Poland',
      'writer',
    ],
    optionsI18n: {
      ko: ['마리', '퀴리는', '폴란드', '출신', '과학자였어요'],
      uz: ['Mari', 'Kyuri', 'Polshadan', 'bo‘lgan', 'olim', 'edi'],
      en: ['Marie', 'Curie', 'was', 'a', 'scientist', 'from', 'Poland'],
      ru: ['Мария', 'Кюри', 'была', 'учёным', 'из', 'Польши'],
    },
    answerTranslation: L(
      '마리 퀴리는 폴란드 출신 과학자였어요.',
      'Mari Kyuri Polshadan bo‘lgan olim edi.',
      'Marie Curie was a scientist from Poland.',
      'Мария Кюри была учёным из Польши.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['scientist', 'past-life'],
  },

  en_s1u8_n2_010_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What was Leo Tolstoy’s job?',
    options: ['He', 'was', 'a', 'writer', 'scientist', 'artist', 'leader'],
    answer: 'He was a writer',
    answerTranslation: L(
      '그는 작가였어요.',
      'U yozuvchi edi.',
      'He was a writer.',
      'Он был писателем.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['writer', 'reply'],
  },

  en_s1u8_n2_011_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Marie Curie was a ',
    sentenceSuffix: '.',
    answer: 'scientist',
    answerTranslation: L(
      '마리 퀴리는 과학자였어요.',
      'Mari Kyuri olim edi.',
      'Marie Curie was a scientist.',
      'Мария Кюри была учёным.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "scientist".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'scientist'],
  },

  en_s1u8_n2_012_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'born',
        native: 'tug‘ilgan',
        nativeI18n: L('태어난', 'tug‘ilgan', 'born', 'рождённый'),
      },
      {
        text: 'die',
        native: 'vafot etmoq',
        nativeI18n: L('사망하다', 'vafot etmoq', 'die', 'умирать'),
      },
      {
        text: 'history',
        native: 'tarix',
        nativeI18n: L('역사', 'tarix', 'history', 'история'),
      },
      {
        text: 'education',
        native: 'ta’lim',
        nativeI18n: L('교육', 'ta’lim', 'education', 'образование'),
      },
      {
        text: 'leader',
        native: 'yetakchi',
        nativeI18n: L('지도자', 'yetakchi', 'leader', 'лидер'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['past-life', 'matching'],
  },

  en_s1u8_n2_013_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['born', 'was', 'She', 'in', 'Sweden', 'died', 'artist'],
    answer: 'She was born in Sweden',
    answerTranslation: L(
      '그녀는 스웨덴에서 태어났어요.',
      'U Shvetsiyada tug‘ilgan.',
      'She was born in Sweden.',
      'Она родилась в Швеции.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['born', 'past-life'],
  },

  en_s1u8_n2_014_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'born',
        native: 'tug‘ilgan',
        nativeI18n: L('태어난', 'tug‘ilgan', 'born', 'рождённый'),
      },
      {
        text: 'die',
        native: 'vafot etmoq',
        nativeI18n: L('사망하다', 'vafot etmoq', 'die', 'умирать'),
      },
      {
        text: 'history',
        native: 'tarix',
        nativeI18n: L('역사', 'tarix', 'history', 'история'),
      },
      {
        text: 'education',
        native: 'ta’lim',
        nativeI18n: L('교육', 'ta’lim', 'education', 'образование'),
      },
      {
        text: 'leader',
        native: 'yetakchi',
        nativeI18n: L('지도자', 'yetakchi', 'leader', 'лидер'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['past-life', 'listening'],
  },

  en_s1u8_n2_015_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'artist',
    choices: [
      { text: 'scientist', label: '🔬', emoji: '🔬', imageUrl: '' },
      { text: 'writer', label: '✍️', emoji: '✍️', imageUrl: '' },
      { text: 'carpenter', label: '🪚', emoji: '🪚', imageUrl: '' },
      { text: 'artist', label: '🎨', emoji: '🎨', imageUrl: '' },
    ],
    answerTranslation: L('예술가', 'rassom', 'artist', 'художник'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['artist'],
  },

  en_s1u8_n2_016_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Ingrid Bergman ___ in 1982.',
    blankAnswers: ['died'],
    options: ['died', 'die', 'dies', 'dying'],
    answer: 'died',
    answerTranslation: L(
      '잉그리드 베리만은 1982년에 사망했어요.',
      'Ingrid Bergman 1982-yilda vafot etgan.',
      'Ingrid Bergman died in 1982.',
      'Ингрид Бергман умерла в 1982 году.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['past-simple', 'die'],
  },

  en_s1u8_n2_017_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Frida Kahlo was an ',
    sentenceSuffix: '.',
    answer: 'artist',
    answerTranslation: L(
      '프리다 칼로는 예술가였어요.',
      'Frida Kalo rassom edi.',
      'Frida Kahlo was an artist.',
      'Фрида Кало была художницей.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "artist".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'artist'],
  },

  en_s1u8_n2_018_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'important',
      'history',
      'in',
      'people',
      'were',
      'They',
      'scientists',
    ],
    answer: 'They were important people in history',
    audioText: 'They were important people in history.',
    answerTranslation: L(
      '그들은 역사적으로 중요한 사람들이었어요.',
      'Ular tarixdagi muhim insonlar edi.',
      'They were important people in history.',
      'Они были важными людьми в истории.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['history', 'past-life'],
  },

  en_s1u8_n2_019_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'When was Ingrid Bergman born?',
    options: ['She', 'was', 'born', 'in', '1915', '1982', 'died'],
    answer: 'She was born in 1915',
    answerTranslation: L(
      '그녀는 1915년에 태어났어요.',
      'U 1915-yilda tug‘ilgan.',
      'She was born in 1915.',
      'Она родилась в 1915 году.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['born', 'reply'],
  },

  en_s1u8_n2_020_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What was Marie Curie’s job?' }],
    options: [
      'She was a scientist.',
      'She was scientisted.',
      'She did a science.',
      'She were a scientist.',
    ],
    answer: 'She was a scientist.',
    answerTranslation: L(
      '그녀는 과학자였어요.',
      'U olim edi.',
      'She was a scientist.',
      'Она была учёным.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['scientist', 'dialog'],
  },

  // ===========================================================
  // Lesson 2 · Regular past simple
  // ===========================================================

  en_s1u8_n2_021_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Jan lived in Poland.',
    audioText: 'Jan lived in Poland.',
    answerTranslation: L(
      '얀은 폴란드에 살았어요.',
      'Yan Polshada yashagan.',
      'Jan lived in Poland.',
      'Ян жил в Польше.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['past-simple', 'regular-verbs'],
  },

  en_s1u8_n2_022_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'glider',
    choices: [
      { text: 'flight', label: '✈️', emoji: '✈️', imageUrl: '' },
      { text: 'article', label: '📰', emoji: '📰', imageUrl: '' },
      { text: 'glider', label: '🛩️', emoji: '🛩️', imageUrl: '' },
      { text: 'education', label: '🎓', emoji: '🎓', imageUrl: '' },
    ],
    answerTranslation: L('글라이더', 'planer', 'glider', 'планер'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['glider'],
  },

  en_s1u8_n2_023_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'glider',
        native: 'planer',
        nativeI18n: L('글라이더', 'planer', 'glider', 'планер'),
      },
      {
        text: 'flight',
        native: 'parvoz',
        nativeI18n: L('비행', 'parvoz', 'flight', 'полёт'),
      },
      {
        text: 'accident',
        native: 'baxtsiz hodisa',
        nativeI18n: L(
          '사고',
          'baxtsiz hodisa',
          'accident',
          'несчастный случай',
        ),
      },
      {
        text: 'adventure',
        native: 'sarguzasht',
        nativeI18n: L('모험', 'sarguzasht', 'adventure', 'приключение'),
      },
      {
        text: 'article',
        native: 'maqola',
        nativeI18n: L('기사', 'maqola', 'article', 'статья'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['past-life', 'matching'],
  },

  en_s1u8_n2_024_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['in', 'Poland', 'lived', 'Jan', 'lives', 'studied', 'travelled'],
    answer: 'Jan lived in Poland',
    answerTranslation: L(
      '얀은 폴란드에 살았어요.',
      'Yan Polshada yashagan.',
      'Jan lived in Poland.',
      'Ян жил в Польше.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['past-simple', 'lived'],
  },

  en_s1u8_n2_025_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['birds', 'studied', 'Jan', 'study', 'wanted', 'glider'],
    answer: 'Jan studied birds',
    audioText: 'Jan studied birds.',
    answerTranslation: L(
      '얀은 새를 연구했어요.',
      'Yan qushlarni o‘rgandi.',
      'Jan studied birds.',
      'Ян изучал птиц.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['past-simple', 'studied'],
  },

  en_s1u8_n2_026_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'glider',
        native: 'planer',
        nativeI18n: L('글라이더', 'planer', 'glider', 'планер'),
      },
      {
        text: 'flight',
        native: 'parvoz',
        nativeI18n: L('비행', 'parvoz', 'flight', 'полёт'),
      },
      {
        text: 'accident',
        native: 'baxtsiz hodisa',
        nativeI18n: L(
          '사고',
          'baxtsiz hodisa',
          'accident',
          'несчастный случай',
        ),
      },
      {
        text: 'adventure',
        native: 'sarguzasht',
        nativeI18n: L('모험', 'sarguzasht', 'adventure', 'приключение'),
      },
      {
        text: 'article',
        native: 'maqola',
        nativeI18n: L('기사', 'maqola', 'article', 'статья'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['past-life', 'listening'],
  },

  en_s1u8_n2_027_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Jan ',
    sentenceSuffix: ' birds.',
    answer: 'studied',
    answerTranslation: L(
      '얀은 새를 연구했어요.',
      'Yan qushlarni o‘rgandi.',
      'Jan studied birds.',
      'Ян изучал птиц.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is the past form "studied".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'past-simple'],
  },

  en_s1u8_n2_028_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'accident',
    choices: [
      { text: 'flight', label: '✈️', emoji: '✈️', imageUrl: '' },
      { text: 'adventure', label: '🧭', emoji: '🧭', imageUrl: '' },
      { text: 'article', label: '📰', emoji: '📰', imageUrl: '' },
      { text: 'accident', label: '⚠️', emoji: '⚠️', imageUrl: '' },
    ],
    answerTranslation: L(
      '사고',
      'baxtsiz hodisa',
      'accident',
      'несчастный случай',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['accident'],
  },

  en_s1u8_n2_029_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Jan started to make his glider in 1866.',
    audioText: 'Jan started to make his glider in 1866.',
    answerI18n: L(
      '얀은 1866년에 자신의 글라이더를 만들기 시작했어요',
      'Yan 1866-yilda planerini yasashni boshladi',
      'Jan started to make his glider in 1866',
      'Ян начал делать свой планер в 1866 году',
    ),
    options: [
      'Jan',
      'started',
      'to',
      'make',
      'his',
      'glider',
      'in',
      '1866',
      'studied',
    ],
    optionsI18n: {
      ko: ['얀은', '1866년에', '자신의', '글라이더를', '만들기', '시작했어요'],
      uz: ['Yan', '1866-yilda', 'planerini', 'yasashni', 'boshladi'],
      en: ['Jan', 'started', 'to', 'make', 'his', 'glider', 'in', '1866'],
      ru: ['Ян', 'начал', 'делать', 'свой', 'планер', 'в', '1866', 'году'],
    },
    answerTranslation: L(
      '얀은 1866년에 자신의 글라이더를 만들기 시작했어요.',
      'Yan 1866-yilda planerini yasashni boshladi.',
      'Jan started to make his glider in 1866.',
      'Ян начал делать свой планер в 1866 году.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['past-simple', 'started'],
  },

  en_s1u8_n2_030_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What did Jan study?',
    options: ['He', 'studied', 'birds', 'travelled', 'articles', 'glider'],
    answer: 'He studied birds',
    answerTranslation: L(
      '그는 새를 연구했어요.',
      'U qushlarni o‘rgandi.',
      'He studied birds.',
      'Он изучал птиц.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['past-simple', 'reply'],
  },

  en_s1u8_n2_031_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Jan ',
    sentenceSuffix: ' to make a glider.',
    answer: 'wanted',
    answerTranslation: L(
      '얀은 글라이더를 만들고 싶어 했어요.',
      'Yan planer yasashni xohladi.',
      'Jan wanted to make a glider.',
      'Ян хотел сделать планер.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is the past form "wanted".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'wanted'],
  },

  en_s1u8_n2_032_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'education',
        native: 'ta’lim',
        nativeI18n: L('교육', 'ta’lim', 'education', 'образование'),
      },
      {
        text: 'carpenter',
        native: 'duradgor',
        nativeI18n: L('목수', 'duradgor', 'carpenter', 'плотник'),
      },
      {
        text: 'history',
        native: 'tarix',
        nativeI18n: L('역사', 'tarix', 'history', 'история'),
      },
      {
        text: 'return',
        native: 'qaytmoq',
        nativeI18n: L('돌아오다', 'qaytmoq', 'return', 'возвращаться'),
      },
      {
        text: 'flight',
        native: 'parvoz',
        nativeI18n: L('비행', 'parvoz', 'flight', 'полёт'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['past-life', 'matching'],
  },

  en_s1u8_n2_033_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['a', 'carpenter', 'was', 'Jan', 'scientist', 'worked', 'artist'],
    answer: 'Jan was a carpenter',
    answerTranslation: L(
      '얀은 목수였어요.',
      'Yan duradgor edi.',
      'Jan was a carpenter.',
      'Ян был плотником.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['carpenter', 'past-life'],
  },

  en_s1u8_n2_034_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'education',
        native: 'ta’lim',
        nativeI18n: L('교육', 'ta’lim', 'education', 'образование'),
      },
      {
        text: 'carpenter',
        native: 'duradgor',
        nativeI18n: L('목수', 'duradgor', 'carpenter', 'плотник'),
      },
      {
        text: 'history',
        native: 'tarix',
        nativeI18n: L('역사', 'tarix', 'history', 'история'),
      },
      {
        text: 'return',
        native: 'qaytmoq',
        nativeI18n: L('돌아오다', 'qaytmoq', 'return', 'возвращаться'),
      },
      {
        text: 'flight',
        native: 'parvoz',
        nativeI18n: L('비행', 'parvoz', 'flight', 'полёт'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['past-life', 'listening'],
  },

  en_s1u8_n2_035_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'carpenter',
    choices: [
      { text: 'writer', label: '✍️', emoji: '✍️', imageUrl: '' },
      { text: 'scientist', label: '🔬', emoji: '🔬', imageUrl: '' },
      { text: 'carpenter', label: '🪚', emoji: '🪚', imageUrl: '' },
      { text: 'artist', label: '🎨', emoji: '🎨', imageUrl: '' },
    ],
    answerTranslation: L('목수', 'duradgor', 'carpenter', 'плотник'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['carpenter'],
  },

  en_s1u8_n2_036_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Jan ___ birds.',
    blankAnswers: ['studied'],
    options: ['studied', 'studyed', 'study', 'studies'],
    answer: 'studied',
    answerTranslation: L(
      '얀은 새를 연구했어요.',
      'Yan qushlarni o‘rgandi.',
      'Jan studied birds.',
      'Ян изучал птиц.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['past-simple', 'ied'],
  },

  en_s1u8_n2_037_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Jan ',
    sentenceSuffix: ' to make his glider in 1866.',
    answer: 'started',
    answerTranslation: L(
      '얀은 1866년에 글라이더를 만들기 시작했어요.',
      'Yan 1866-yilda planerini yasashni boshladi.',
      'Jan started to make his glider in 1866.',
      'Ян начал делать свой планер в 1866 году.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is the past form "started".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'started'],
  },

  en_s1u8_n2_038_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['short', 'flights', 'made', 'very', 'Jan', 'travelled', 'used'],
    answer: 'Jan made very short flights',
    audioText: 'Jan made very short flights.',
    answerTranslation: L(
      '얀은 아주 짧은 비행을 했어요.',
      'Yan juda qisqa parvozlar qildi.',
      'Jan made very short flights.',
      'Ян совершал очень короткие полёты.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['flight', 'past-life'],
  },

  en_s1u8_n2_039_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What was Jan’s job?',
    options: ['He', 'was', 'a', 'carpenter', 'writer', 'scientist', 'worked'],
    answer: 'He was a carpenter',
    answerTranslation: L(
      '그는 목수였어요.',
      'U duradgor edi.',
      'He was a carpenter.',
      'Он был плотником.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['carpenter', 'reply'],
  },

  en_s1u8_n2_040_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Why did Jan study birds?' }],
    options: [
      'He wanted to fly.',
      'He wants flying yesterday.',
      'He studied a writer.',
      'He was an article.',
    ],
    answer: 'He wanted to fly.',
    answerTranslation: L(
      '그는 날고 싶어 했어요.',
      'U uchishni xohladi.',
      'He wanted to fly.',
      'Он хотел летать.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['past-life', 'dialog'],
  },

  // ===========================================================
  // Lesson 3 · Harriet's adventures
  // ===========================================================

  en_s1u8_n2_041_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Harriet travelled around California.',
    audioText: 'Harriet travelled around California.',
    answerTranslation: L(
      '해리엇은 캘리포니아를 여행했어요.',
      'Harriet Kaliforniya bo‘ylab sayohat qildi.',
      'Harriet travelled around California.',
      'Харриет путешествовала по Калифорнии.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['travelled', 'past-simple'],
  },

  en_s1u8_n2_042_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'adventure',
    choices: [
      { text: 'article', label: '📰', emoji: '📰', imageUrl: '' },
      { text: 'adventure', label: '🧭', emoji: '🧭', imageUrl: '' },
      { text: 'accident', label: '⚠️', emoji: '⚠️', imageUrl: '' },
      { text: 'flight', label: '✈️', emoji: '✈️', imageUrl: '' },
    ],
    answerTranslation: L('모험', 'sarguzasht', 'adventure', 'приключение'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['adventure'],
  },

  en_s1u8_n2_043_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'adventure',
        native: 'sarguzasht',
        nativeI18n: L('모험', 'sarguzasht', 'adventure', 'приключение'),
      },
      {
        text: 'article',
        native: 'maqola',
        nativeI18n: L('기사', 'maqola', 'article', 'статья'),
      },
      {
        text: 'return',
        native: 'qaytmoq',
        nativeI18n: L('돌아오다', 'qaytmoq', 'return', 'возвращаться'),
      },
      {
        text: 'history',
        native: 'tarix',
        nativeI18n: L('역사', 'tarix', 'history', 'история'),
      },
      {
        text: 'accident',
        native: 'baxtsiz hodisa',
        nativeI18n: L(
          '사고',
          'baxtsiz hodisa',
          'accident',
          'несчастный случай',
        ),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['harriet', 'matching'],
  },

  en_s1u8_n2_044_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'Harriet',
      'loved',
      'adventure',
      'travelled',
      'article',
      'liked',
      'history',
    ],
    answer: 'Harriet loved adventure',
    answerTranslation: L(
      '해리엇은 모험을 좋아했어요.',
      'Harriet sarguzashtni yaxshi ko‘rardi.',
      'Harriet loved adventure.',
      'Харриет любила приключения.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['adventure', 'loved'],
  },

  en_s1u8_n2_045_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'America',
      'South',
      'visited',
      'They',
      'returned',
      'studied',
      'all',
    ],
    answer: 'They visited South America',
    audioText: 'They visited South America.',
    answerTranslation: L(
      '그들은 남아메리카를 방문했어요.',
      'Ular Janubiy Amerikaga tashrif buyurishdi.',
      'They visited South America.',
      'Они посетили Южную Америку.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['visited', 'travel'],
  },

  en_s1u8_n2_046_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'adventure',
        native: 'sarguzasht',
        nativeI18n: L('모험', 'sarguzasht', 'adventure', 'приключение'),
      },
      {
        text: 'article',
        native: 'maqola',
        nativeI18n: L('기사', 'maqola', 'article', 'статья'),
      },
      {
        text: 'return',
        native: 'qaytmoq',
        nativeI18n: L('돌아오다', 'qaytmoq', 'return', 'возвращаться'),
      },
      {
        text: 'history',
        native: 'tarix',
        nativeI18n: L('역사', 'tarix', 'history', 'история'),
      },
      {
        text: 'accident',
        native: 'baxtsiz hodisa',
        nativeI18n: L(
          '사고',
          'baxtsiz hodisa',
          'accident',
          'несчастный случай',
        ),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['harriet', 'listening'],
  },

  en_s1u8_n2_047_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Harriet loved ',
    sentenceSuffix: '.',
    answer: 'adventure',
    answerTranslation: L(
      '해리엇은 모험을 좋아했어요.',
      'Harriet sarguzashtni yaxshi ko‘rardi.',
      'Harriet loved adventure.',
      'Харриет любила приключения.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "adventure".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'adventure'],
  },

  en_s1u8_n2_048_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'article',
    choices: [
      { text: 'history', label: '🏛️', emoji: '🏛️', imageUrl: '' },
      { text: 'flight', label: '✈️', emoji: '✈️', imageUrl: '' },
      { text: 'article', label: '📰', emoji: '📰', imageUrl: '' },
      { text: 'adventure', label: '🧭', emoji: '🧭', imageUrl: '' },
    ],
    answerTranslation: L('기사', 'maqola', 'article', 'статья'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['article'],
  },

  en_s1u8_n2_049_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Harriet travelled all over the world.',
    audioText: 'Harriet travelled all over the world.',
    answerI18n: L(
      '해리엇은 전 세계를 여행했어요',
      'Harriet butun dunyo bo‘ylab sayohat qildi',
      'Harriet travelled all over the world',
      'Харриет путешествовала по всему миру',
    ),
    options: [
      'Harriet',
      'travelled',
      'all',
      'over',
      'the',
      'world',
      'worked',
      'returned',
    ],
    optionsI18n: {
      ko: ['해리엇은', '전', '세계를', '여행했어요'],
      uz: ['Harriet', 'butun', 'dunyo', 'bo‘ylab', 'sayohat', 'qildi'],
      en: ['Harriet', 'travelled', 'all', 'over', 'the', 'world'],
      ru: ['Харриет', 'путешествовала', 'по', 'всему', 'миру'],
    },
    answerTranslation: L(
      '해리엇은 전 세계를 여행했어요.',
      'Harriet butun dunyo bo‘ylab sayohat qildi.',
      'Harriet travelled all over the world.',
      'Харриет путешествовала по всему миру.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['travelled', 'past-simple'],
  },

  en_s1u8_n2_050_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What did Harriet love?',
    options: ['She', 'loved', 'adventure', 'articles', 'history', 'glider'],
    answer: 'She loved adventure',
    answerTranslation: L(
      '그녀는 모험을 좋아했어요.',
      'U sarguzashtni yaxshi ko‘rardi.',
      'She loved adventure.',
      'Она любила приключения.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['adventure', 'reply'],
  },

  en_s1u8_n2_051_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Harriet ',
    sentenceSuffix: ' around California.',
    answer: 'travelled',
    answerTranslation: L(
      '해리엇은 캘리포니아를 여행했어요.',
      'Harriet Kaliforniya bo‘ylab sayohat qildi.',
      'Harriet travelled around California.',
      'Харриет путешествовала по Калифорнии.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is the past form "travelled".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'travelled'],
  },

  en_s1u8_n2_052_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'writer',
        native: 'yozuvchi',
        nativeI18n: L('작가', 'yozuvchi', 'writer', 'писатель'),
      },
      {
        text: 'scientist',
        native: 'olim',
        nativeI18n: L('과학자', 'olim', 'scientist', 'учёный'),
      },
      {
        text: 'carpenter',
        native: 'duradgor',
        nativeI18n: L('목수', 'duradgor', 'carpenter', 'плотник'),
      },
      {
        text: 'article',
        native: 'maqola',
        nativeI18n: L('기사', 'maqola', 'article', 'статья'),
      },
      {
        text: 'adventure',
        native: 'sarguzasht',
        nativeI18n: L('모험', 'sarguzasht', 'adventure', 'приключение'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['past-life', 'matching'],
  },

  en_s1u8_n2_053_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'USA',
      'the',
      'to',
      'returned',
      'Harriet',
      'travelled',
      'article',
    ],
    answer: 'Harriet returned to the USA',
    answerTranslation: L(
      '해리엇은 미국으로 돌아왔어요.',
      'Harriet AQShga qaytdi.',
      'Harriet returned to the USA.',
      'Харриет вернулась в США.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['return', 'past-simple'],
  },

  en_s1u8_n2_054_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'writer',
        native: 'yozuvchi',
        nativeI18n: L('작가', 'yozuvchi', 'writer', 'писатель'),
      },
      {
        text: 'scientist',
        native: 'olim',
        nativeI18n: L('과학자', 'olim', 'scientist', 'учёный'),
      },
      {
        text: 'carpenter',
        native: 'duradgor',
        nativeI18n: L('목수', 'duradgor', 'carpenter', 'плотник'),
      },
      {
        text: 'article',
        native: 'maqola',
        nativeI18n: L('기사', 'maqola', 'article', 'статья'),
      },
      {
        text: 'adventure',
        native: 'sarguzasht',
        nativeI18n: L('모험', 'sarguzasht', 'adventure', 'приключение'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['past-life', 'listening'],
  },

  en_s1u8_n2_055_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'flight',
    choices: [
      { text: 'article', label: '📰', emoji: '📰', imageUrl: '' },
      { text: 'adventure', label: '🧭', emoji: '🧭', imageUrl: '' },
      { text: 'accident', label: '⚠️', emoji: '⚠️', imageUrl: '' },
      { text: 'flight', label: '✈️', emoji: '✈️', imageUrl: '' },
    ],
    answerTranslation: L('비행', 'parvoz', 'flight', 'полёт'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['flight'],
  },

  en_s1u8_n2_056_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Harriet ___ every country in South America.',
    blankAnswers: ['visited'],
    options: ['visited', 'visit', 'visits', 'visiting'],
    answer: 'visited',
    answerTranslation: L(
      '해리엇은 남아메리카의 모든 나라를 방문했어요.',
      'Harriet Janubiy Amerikadagi barcha mamlakatlarga tashrif buyurdi.',
      'Harriet visited every country in South America.',
      'Харриет посетила все страны Южной Америки.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['past-simple', 'visited'],
  },

  en_s1u8_n2_057_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Harriet worked on ',
    sentenceSuffix: ' about her travels.',
    answer: 'articles',
    answerTranslation: L(
      '해리엇은 자신의 여행에 대한 기사들을 썼어요.',
      'Harriet sayohatlari haqida maqolalar ustida ishladi.',
      'Harriet worked on articles about her travels.',
      'Харриет работала над статьями о своих путешествиях.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'The missing English word is the plural noun "articles".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'article'],
  },

  en_s1u8_n2_058_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'travels',
      'her',
      'about',
      'people',
      'to',
      'talked',
      'She',
      'articles',
    ],
    answer: 'She talked to people about her travels',
    audioText: 'She talked to people about her travels.',
    answerTranslation: L(
      '그녀는 사람들에게 자신의 여행에 대해 이야기했어요.',
      'U odamlarga sayohatlari haqida gapirdi.',
      'She talked to people about her travels.',
      'Она рассказывала людям о своих путешествиях.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['talked', 'past-simple'],
  },

  en_s1u8_n2_059_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Where did Harriet travel?',
    options: [
      'She',
      'travelled',
      'all',
      'over',
      'the',
      'world',
      'article',
      'scientist',
    ],
    answer: 'She travelled all over the world',
    answerTranslation: L(
      '그녀는 전 세계를 여행했어요.',
      'U butun dunyo bo‘ylab sayohat qildi.',
      'She travelled all over the world.',
      'Она путешествовала по всему миру.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['travelled', 'reply'],
  },

  en_s1u8_n2_060_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'What did Harriet do after she returned to the USA?',
      },
    ],
    options: [
      'She talked about her travels.',
      'She talks yesterday about travel.',
      'She was an accident.',
      'She returned a scientist.',
    ],
    answer: 'She talked about her travels.',
    answerTranslation: L(
      '그녀는 자신의 여행에 대해 이야기했어요.',
      'U sayohatlari haqida gapirdi.',
      'She talked about her travels.',
      'Она рассказывала о своих путешествиях.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['harriet', 'dialog'],
  },

  // ===========================================================
  // Lesson 4 · Past lives review
  // ===========================================================

  en_s1u8_n2_061_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Frida Kahlo started painting when she was eighteen.',
    audioText: 'Frida Kahlo started painting when she was eighteen.',
    answerTranslation: L(
      '프리다 칼로는 열여덟 살 때 그림을 그리기 시작했어요.',
      'Frida Kalo o‘n sakkiz yoshida rasm chizishni boshladi.',
      'Frida Kahlo started painting when she was eighteen.',
      'Фрида Кало начала рисовать, когда ей было восемнадцать.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['past-simple', 'review'],
  },

  en_s1u8_n2_062_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'history',
    choices: [
      { text: 'education', label: '🎓', emoji: '🎓', imageUrl: '' },
      { text: 'article', label: '📰', emoji: '📰', imageUrl: '' },
      { text: 'history', label: '🏛️', emoji: '🏛️', imageUrl: '' },
      { text: 'adventure', label: '🧭', emoji: '🧭', imageUrl: '' },
    ],
    answerTranslation: L('역사', 'tarix', 'history', 'история'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['history'],
  },

  en_s1u8_n2_063_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'writer',
        native: 'yozuvchi',
        nativeI18n: L('작가', 'yozuvchi', 'writer', 'писатель'),
      },
      {
        text: 'artist',
        native: 'rassom',
        nativeI18n: L('예술가', 'rassom', 'artist', 'художник'),
      },
      {
        text: 'scientist',
        native: 'olim',
        nativeI18n: L('과학자', 'olim', 'scientist', 'учёный'),
      },
      {
        text: 'adventure',
        native: 'sarguzasht',
        nativeI18n: L('모험', 'sarguzasht', 'adventure', 'приключение'),
      },
      {
        text: 'accident',
        native: 'baxtsiz hodisa',
        nativeI18n: L(
          '사고',
          'baxtsiz hodisa',
          'accident',
          'несчастный случай',
        ),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit8', 'matching'],
  },

  en_s1u8_n2_064_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'started',
      'painting',
      'Frida',
      'when',
      'she',
      'was',
      'eighteen',
      'paint',
      'studied',
    ],
    answer: 'Frida started painting when she was eighteen',
    answerTranslation: L(
      '프리다는 열여덟 살 때 그림을 그리기 시작했어요.',
      'Frida o‘n sakkiz yoshida rasm chizishni boshladi.',
      'Frida started painting when she was eighteen.',
      'Фрида начала рисовать, когда ей было восемнадцать.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['past-simple', 'started'],
  },

  en_s1u8_n2_065_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['France', 'studied', 'in', 'She', 'study', 'lived', 'Poland'],
    answer: 'She studied in France',
    audioText: 'She studied in France.',
    answerTranslation: L(
      '그녀는 프랑스에서 공부했어요.',
      'U Fransiyada o‘qidi.',
      'She studied in France.',
      'Она училась во Франции.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['past-simple', 'studied'],
  },

  en_s1u8_n2_066_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'writer',
        native: 'yozuvchi',
        nativeI18n: L('작가', 'yozuvchi', 'writer', 'писатель'),
      },
      {
        text: 'artist',
        native: 'rassom',
        nativeI18n: L('예술가', 'rassom', 'artist', 'художник'),
      },
      {
        text: 'scientist',
        native: 'olim',
        nativeI18n: L('과학자', 'olim', 'scientist', 'учёный'),
      },
      {
        text: 'adventure',
        native: 'sarguzasht',
        nativeI18n: L('모험', 'sarguzasht', 'adventure', 'приключение'),
      },
      {
        text: 'accident',
        native: 'baxtsiz hodisa',
        nativeI18n: L(
          '사고',
          'baxtsiz hodisa',
          'accident',
          'несчастный случай',
        ),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['unit8', 'listening'],
  },

  en_s1u8_n2_067_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Frida Kahlo ',
    sentenceSuffix: ' painting when she was eighteen.',
    answer: 'started',
    answerTranslation: L(
      '프리다 칼로는 열여덟 살 때 그림을 그리기 시작했어요.',
      'Frida Kalo o‘n sakkiz yoshida rasm chizishni boshladi.',
      'Frida Kahlo started painting when she was eighteen.',
      'Фрида Кало начала рисовать, когда ей было восемнадцать.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "started".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'started'],
  },

  en_s1u8_n2_068_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'glider',
    choices: [
      { text: 'flight', label: '✈️', emoji: '✈️', imageUrl: '' },
      { text: 'article', label: '📰', emoji: '📰', imageUrl: '' },
      { text: 'education', label: '🎓', emoji: '🎓', imageUrl: '' },
      { text: 'glider', label: '🛩️', emoji: '🛩️', imageUrl: '' },
    ],
    answerTranslation: L('글라이더', 'planer', 'glider', 'планер'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['glider'],
  },

  en_s1u8_n2_069_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Martin Luther King wanted a better life for black people.',
    audioText: 'Martin Luther King wanted a better life for black people.',
    answerI18n: L(
      '마틴 루터 킹은 흑인들에게 더 나은 삶을 원했어요',
      'Martin Lyuter King qora tanli odamlar uchun yaxshiroq hayot xohladi',
      'Martin Luther King wanted a better life for black people',
      'Мартин Лютер Кинг хотел лучшей жизни для чернокожих людей',
    ),
    options: [
      'Martin',
      'Luther',
      'King',
      'wanted',
      'a',
      'better',
      'life',
      'for',
      'black',
      'people',
      'worked',
    ],
    optionsI18n: {
      ko: [
        '마틴',
        '루터',
        '킹은',
        '흑인들에게',
        '더',
        '나은',
        '삶을',
        '원했어요',
      ],
      uz: [
        'Martin',
        'Lyuter',
        'King',
        'qora',
        'tanli',
        'odamlar',
        'uchun',
        'yaxshiroq',
        'hayot',
        'xohladi',
      ],
      en: [
        'Martin',
        'Luther',
        'King',
        'wanted',
        'a',
        'better',
        'life',
        'for',
        'black',
        'people',
      ],
      ru: [
        'Мартин',
        'Лютер',
        'Кинг',
        'хотел',
        'лучшей',
        'жизни',
        'для',
        'чернокожих',
        'людей',
      ],
    },
    answerTranslation: L(
      '마틴 루터 킹은 흑인들에게 더 나은 삶을 원했어요.',
      'Martin Lyuter King qora tanli odamlar uchun yaxshiroq hayot xohladi.',
      'Martin Luther King wanted a better life for black people.',
      'Мартин Лютер Кинг хотел лучшей жизни для чернокожих людей.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['past-simple', 'wanted'],
  },

  en_s1u8_n2_070_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Where did Marie Curie study?',
    options: [
      'She',
      'studied',
      'in',
      'France',
      'Poland',
      'travelled',
      'worked',
    ],
    answer: 'She studied in France',
    answerTranslation: L(
      '그녀는 프랑스에서 공부했어요.',
      'U Fransiyada o‘qidi.',
      'She studied in France.',
      'Она училась во Франции.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['past-simple', 'reply'],
  },

  en_s1u8_n2_071_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Harriet ',
    sentenceSuffix: ' to the USA.',
    answer: 'returned',
    answerTranslation: L(
      '해리엇은 미국으로 돌아왔어요.',
      'Harriet AQShga qaytdi.',
      'Harriet returned to the USA.',
      'Харриет вернулась в США.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is the past form "returned".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'return'],
  },

  en_s1u8_n2_072_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'education',
        native: 'ta’lim',
        nativeI18n: L('교육', 'ta’lim', 'education', 'образование'),
      },
      {
        text: 'history',
        native: 'tarix',
        nativeI18n: L('역사', 'tarix', 'history', 'история'),
      },
      {
        text: 'flight',
        native: 'parvoz',
        nativeI18n: L('비행', 'parvoz', 'flight', 'полёт'),
      },
      {
        text: 'article',
        native: 'maqola',
        nativeI18n: L('기사', 'maqola', 'article', 'статья'),
      },
      {
        text: 'return',
        native: 'qaytmoq',
        nativeI18n: L('돌아오다', 'qaytmoq', 'return', 'возвращаться'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['review', 'matching'],
  },

  en_s1u8_n2_073_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'schools',
      'opened',
      'children',
      'poor',
      'for',
      'Tolstoy',
      'studied',
      'thirteen',
    ],
    answer: 'Tolstoy opened thirteen schools for poor children',
    answerTranslation: L(
      '톨스토이는 가난한 아이들을 위해 학교 열세 곳을 열었어요.',
      'Tolstoy kambag‘al bolalar uchun o‘n uchta maktab ochdi.',
      'Tolstoy opened thirteen schools for poor children.',
      'Толстой открыл тринадцать школ для бедных детей.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['past-simple', 'opened'],
  },

  en_s1u8_n2_074_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'education',
        native: 'ta’lim',
        nativeI18n: L('교육', 'ta’lim', 'education', 'образование'),
      },
      {
        text: 'history',
        native: 'tarix',
        nativeI18n: L('역사', 'tarix', 'history', 'история'),
      },
      {
        text: 'flight',
        native: 'parvoz',
        nativeI18n: L('비행', 'parvoz', 'flight', 'полёт'),
      },
      {
        text: 'article',
        native: 'maqola',
        nativeI18n: L('기사', 'maqola', 'article', 'статья'),
      },
      {
        text: 'return',
        native: 'qaytmoq',
        nativeI18n: L('돌아오다', 'qaytmoq', 'return', 'возвращаться'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['review', 'listening'],
  },

  en_s1u8_n2_075_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'article',
    choices: [
      { text: 'education', label: '🎓', emoji: '🎓', imageUrl: '' },
      { text: 'history', label: '🏛️', emoji: '🏛️', imageUrl: '' },
      { text: 'article', label: '📰', emoji: '📰', imageUrl: '' },
      { text: 'adventure', label: '🧭', emoji: '🧭', imageUrl: '' },
    ],
    answerTranslation: L('기사', 'maqola', 'article', 'статья'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['article'],
  },

  en_s1u8_n2_076_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Marie Curie ___ in Paris.',
    blankAnswers: ['lived'],
    options: ['lived', 'live', 'lives', 'living'],
    answer: 'lived',
    answerTranslation: L(
      '마리 퀴리는 파리에 살았어요.',
      'Mari Kyuri Parijda yashagan.',
      'Marie Curie lived in Paris.',
      'Мария Кюри жила в Париже.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['past-simple', 'lived'],
  },

  en_s1u8_n2_077_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Tolstoy ',
    sentenceSuffix: ' thirteen schools.',
    answer: 'opened',
    answerTranslation: L(
      '톨스토이는 학교 열세 곳을 열었어요.',
      'Tolstoy o‘n uchta maktab ochdi.',
      'Tolstoy opened thirteen schools.',
      'Толстой открыл тринадцать школ.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is the past form "opened".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'opened'],
  },

  en_s1u8_n2_078_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'people',
      'talked',
      '250000',
      'to',
      'King',
      'Martin',
      'worked',
      'walked',
    ],
    answer: 'Martin King talked to 250000 people',
    audioText: 'Martin King talked to two hundred and fifty thousand people.',
    answerTranslation: L(
      '마틴 킹은 25만 명에게 연설했어요.',
      'Martin King 250 ming odamga gapirdi.',
      'Martin King talked to 250,000 people.',
      'Мартин Кинг выступил перед 250 000 людьми.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['past-simple', 'talked'],
  },

  en_s1u8_n2_079_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What did Tolstoy do later in his life?',
    options: [
      'He',
      'opened',
      'thirteen',
      'schools',
      'for',
      'poor',
      'children',
      'studied',
      'scientist',
    ],
    answer: 'He opened thirteen schools for poor children',
    answerTranslation: L(
      '그는 가난한 아이들을 위해 학교 열세 곳을 열었어요.',
      'U kambag‘al bolalar uchun o‘n uchta maktab ochdi.',
      'He opened thirteen schools for poor children.',
      'Он открыл тринадцать школ для бедных детей.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['past-simple', 'reply'],
  },

  en_s1u8_n2_080_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Tell me about Harriet Chalmers Adams.' },
    ],
    options: [
      'She travelled around the world and worked on articles about her travels.',
      'She travels around the world yesterday.',
      'She was a glider and an article.',
      'She studied travel and return.',
    ],
    answer:
      'She travelled around the world and worked on articles about her travels.',
    answerTranslation: L(
      '그녀는 전 세계를 여행했고 자신의 여행에 대한 기사를 썼어요.',
      'U butun dunyo bo‘ylab sayohat qildi va sayohatlari haqida maqolalar ustida ishladi.',
      'She travelled around the world and worked on articles about her travels.',
      'Она путешествовала по всему миру и работала над статьями о своих путешествиях.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['past-life', 'unit8', 'final'],
  },
};

export const EN_S1_UNIT8_NODE2 = {
  title: L(
    '과거의 삶',
    'O‘tmishdagi hayot',
    'Lives from the past',
    'Жизни из прошлого',
  ),
  section: 1,
  unit: 8,
  order: 2,
  isActive: true,

  lessons: [
    {
      title: L(
        '유명한 사람들의 삶',
        'Mashhur insonlar hayoti',
        'Famous lives',
        'Жизни известных людей',
      ),
      description: L(
        '작가, 예술가, 과학자 같은 직업과 태어난 해, 사망한 해를 사용해 과거 인물의 기본 정보를 말해요.',
        'Yozuvchi, rassom va olim kabi kasblar hamda tug‘ilgan va vafot etgan yillar orqali o‘tmishdagi odamlar haqida gapirasiz.',
        'Talk about people from the past using jobs, birth years and death years.',
        'Рассказываем о людях прошлого, используя профессии, годы рождения и смерти.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 1,
      questions: [
        'en_s1u8_n2_001_speaking',
        'en_s1u8_n2_002_image_choice',
        'en_s1u8_n2_003_word_matching',
        'en_s1u8_n2_004_translate_builder',
        'en_s1u8_n2_005_word_arrange',
        'en_s1u8_n2_006_audio_match',
        'en_s1u8_n2_007_type_answer',
        'en_s1u8_n2_008_image_choice',
        'en_s1u8_n2_009_sentence_builder',
        'en_s1u8_n2_010_reply_builder',
        'en_s1u8_n2_011_type_answer',
        'en_s1u8_n2_012_word_matching',
        'en_s1u8_n2_013_translate_builder',
        'en_s1u8_n2_014_audio_match',
        'en_s1u8_n2_015_image_choice',
        'en_s1u8_n2_016_fill_in_blank',
        'en_s1u8_n2_017_type_answer',
        'en_s1u8_n2_018_word_arrange',
        'en_s1u8_n2_019_reply_builder',
        'en_s1u8_n2_020_dialog_complete',
      ],
    },

    {
      title: L(
        '규칙동사 과거형',
        'Muntazam fe’llarning o‘tgan zamoni',
        'Regular past simple',
        'Правильные глаголы в прошедшем времени',
      ),
      description: L(
        'live → lived, want → wanted, study → studied처럼 규칙동사를 과거형으로 바꾸고 과거 사건을 말해요.',
        'Live → lived, want → wanted, study → studied kabi fe’llarni o‘tgan zamonga o‘zgartirib, o‘tgan voqealar haqida gapirasiz.',
        'Form regular past verbs such as lived, wanted and studied and use them to describe past events.',
        'Образуем правильные формы прошедшего времени: lived, wanted, studied и другие.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 2,
      questions: [
        'en_s1u8_n2_021_speaking',
        'en_s1u8_n2_022_image_choice',
        'en_s1u8_n2_023_word_matching',
        'en_s1u8_n2_024_translate_builder',
        'en_s1u8_n2_025_word_arrange',
        'en_s1u8_n2_026_audio_match',
        'en_s1u8_n2_027_type_answer',
        'en_s1u8_n2_028_image_choice',
        'en_s1u8_n2_029_sentence_builder',
        'en_s1u8_n2_030_reply_builder',
        'en_s1u8_n2_031_type_answer',
        'en_s1u8_n2_032_word_matching',
        'en_s1u8_n2_033_translate_builder',
        'en_s1u8_n2_034_audio_match',
        'en_s1u8_n2_035_image_choice',
        'en_s1u8_n2_036_fill_in_blank',
        'en_s1u8_n2_037_type_answer',
        'en_s1u8_n2_038_word_arrange',
        'en_s1u8_n2_039_reply_builder',
        'en_s1u8_n2_040_dialog_complete',
      ],
    },

    {
      title: L(
        '해리엇의 모험',
        'Harrietning sarguzashtlari',
        'Harriet’s adventures',
        'Приключения Харриет',
      ),
      description: L(
        'travelled, visited, returned, talked, worked 같은 과거형을 사용해 해리엇의 여행과 삶을 순서대로 설명해요.',
        'Travelled, visited, returned, talked va worked kabi o‘tgan zamon shakllari bilan Harrietning sayohatlarini tasvirlaysiz.',
        'Use travelled, visited, returned, talked and worked to describe Harriet’s life and travels.',
        'Используем travelled, visited, returned, talked и worked, чтобы рассказать о жизни и путешествиях Харриет.',
      ),
      category: LessonCategory.EXPRESSION,
      level: LV,
      order: 3,
      questions: [
        'en_s1u8_n2_041_speaking',
        'en_s1u8_n2_042_image_choice',
        'en_s1u8_n2_043_word_matching',
        'en_s1u8_n2_044_translate_builder',
        'en_s1u8_n2_045_word_arrange',
        'en_s1u8_n2_046_audio_match',
        'en_s1u8_n2_047_type_answer',
        'en_s1u8_n2_048_image_choice',
        'en_s1u8_n2_049_sentence_builder',
        'en_s1u8_n2_050_reply_builder',
        'en_s1u8_n2_051_type_answer',
        'en_s1u8_n2_052_word_matching',
        'en_s1u8_n2_053_translate_builder',
        'en_s1u8_n2_054_audio_match',
        'en_s1u8_n2_055_image_choice',
        'en_s1u8_n2_056_fill_in_blank',
        'en_s1u8_n2_057_type_answer',
        'en_s1u8_n2_058_word_arrange',
        'en_s1u8_n2_059_reply_builder',
        'en_s1u8_n2_060_dialog_complete',
      ],
    },

    {
      title: L(
        '과거 인물 이야기',
        'O‘tmishdagi insonlar haqida hikoya',
        'Past lives review',
        'Рассказываем о людях прошлого',
      ),
      description: L(
        '유명 인물들의 삶을 이용해 규칙동사 과거형과 직업, 여행, 공부, 일에 관한 표현을 종합 복습해요.',
        'Mashhur insonlar hayoti orqali muntazam fe’llarning o‘tgan zamoni, kasb, sayohat, o‘qish va ish mavzularini takrorlaysiz.',
        'Review regular past verbs and describe the work, study and travels of people from the past.',
        'Повторяем правильные глаголы прошедшего времени и описываем работу, учёбу и путешествия людей прошлого.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 4,
      questions: [
        'en_s1u8_n2_061_speaking',
        'en_s1u8_n2_062_image_choice',
        'en_s1u8_n2_063_word_matching',
        'en_s1u8_n2_064_translate_builder',
        'en_s1u8_n2_065_word_arrange',
        'en_s1u8_n2_066_audio_match',
        'en_s1u8_n2_067_type_answer',
        'en_s1u8_n2_068_image_choice',
        'en_s1u8_n2_069_sentence_builder',
        'en_s1u8_n2_070_reply_builder',
        'en_s1u8_n2_071_type_answer',
        'en_s1u8_n2_072_word_matching',
        'en_s1u8_n2_073_translate_builder',
        'en_s1u8_n2_074_audio_match',
        'en_s1u8_n2_075_image_choice',
        'en_s1u8_n2_076_fill_in_blank',
        'en_s1u8_n2_077_type_answer',
        'en_s1u8_n2_078_word_arrange',
        'en_s1u8_n2_079_reply_builder',
        'en_s1u8_n2_080_dialog_complete',
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Section 1 · Unit 8 · Node 3
// 8.3 Special moments
//
// Coverage
// - object pronouns: me / you / him / her / it / us / them
// - object pronouns after verbs
// - object pronouns after prepositions
// - holiday photo stories
// - photograph / competition / prize
// - monkey / barbecue / journalism / newspaper
// - raise / charity / invite
// - past time expressions
// - last year / last week / last night / yesterday
// - in + month/year
// - on + day
// - telling a story about a photo
//
// IMPORTANT:
// *_WORDS에는 무조건 단어만 등록.
// "last year", "on Monday",
// "raise money for charity" 같은 구/문장은 등록하지 않음.
//
// Reused:
// photo / holiday / tourist / musician / friend
// university / band / money / summer
// listen / watch / talk / remember / love / like
// travel / visit / work / start / play
//
// 4 lessons × 20 questions = 80
// type_answer: 3 per lesson
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT8_NODE3_WORDS = [
  {
    code: 'en-noun-competition',
    english: 'competition',
    senseKey: 'event-where-people-try-to-win',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '대회; 공모전',
      'musobaqa',
      'an event in which people try to win',
      'соревнование; конкурс',
    ),
    examples: [
      {
        english: 'She entered a photo competition.',
        translations: L(
          '그녀는 사진 공모전에 참가했어요.',
          'U foto tanlovida qatnashdi.',
          'She entered a photo competition.',
          'Она участвовала в фотоконкурсе.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌkɒmpəˈtɪʃən/',
      ttsText: 'competition',
    },
    media: {
      emoji: '🏆',
      imageUrl: '',
      imageAlt: L('대회', 'musobaqa', 'a competition', 'соревнование'),
    },
    tags: ['photos', 'events'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-prize',
    english: 'prize',
    senseKey: 'reward-for-winning-competition',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '상; 상품',
      'mukofot',
      'something given to a person who wins a competition',
      'приз',
    ),
    examples: [
      {
        english: 'The first prize is a holiday.',
        translations: L(
          '1등 상품은 휴가 여행이에요.',
          'Birinchi mukofot — sayohat.',
          'The first prize is a holiday.',
          'Первый приз — путешествие.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/praɪz/',
      ttsText: 'prize',
    },
    media: {
      emoji: '🏅',
      imageUrl: '',
      imageAlt: L('상', 'mukofot', 'a prize', 'приз'),
    },
    tags: ['competition', 'events'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-photograph',
    english: 'photograph',
    senseKey: 'take-photo-of-person-or-thing',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '사진을 찍다',
      'suratga olmoq',
      'to take a photograph of someone or something',
      'фотографировать',
    ),
    examples: [
      {
        english: 'I photographed him in Spain.',
        translations: L(
          '저는 스페인에서 그의 사진을 찍었어요.',
          'Men uni Ispaniyada suratga oldim.',
          'I photographed him in Spain.',
          'Я сфотографировал его в Испании.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈfəʊtəɡrɑːf/',
      ttsText: 'photograph',
    },
    media: {
      emoji: '📸',
      imageUrl: '',
      imageAlt: L(
        '사진을 찍는 사람',
        'suratga olayotgan odam',
        'a person taking a photograph',
        'человек, делающий фотографию',
      ),
    },
    tags: ['photos', 'verbs'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-animal-monkey',
    english: 'monkey',
    senseKey: 'small-or-medium-primate',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '원숭이',
      'maymun',
      'an animal with a long tail that can climb trees',
      'обезьяна',
    ),
    examples: [
      {
        english: 'I photographed a monkey.',
        translations: L(
          '저는 원숭이 사진을 찍었어요.',
          'Men maymunni suratga oldim.',
          'I photographed a monkey.',
          'Я сфотографировал обезьяну.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈmʌŋki/',
      ttsText: 'monkey',
    },
    media: {
      emoji: '🐒',
      imageUrl: '',
      imageAlt: L('원숭이', 'maymun', 'a monkey', 'обезьяна'),
    },
    tags: ['animals', 'photos'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-barbecue',
    english: 'barbecue',
    senseKey: 'outdoor-meal-with-grilled-food',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '바비큐',
      'barbekyu',
      'an outdoor meal where food is cooked over a fire',
      'барбекю',
    ),
    examples: [
      {
        english: 'We meet for a barbecue every summer.',
        translations: L(
          '우리는 매년 여름 바비큐를 하려고 만나요.',
          'Biz har yoz barbekyu uchun uchrashamiz.',
          'We meet for a barbecue every summer.',
          'Каждое лето мы встречаемся на барбекю.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈbɑːbɪkjuː/',
      ttsText: 'barbecue',
    },
    media: {
      emoji: '🍖',
      imageUrl: '',
      imageAlt: L('바비큐', 'barbekyu', 'a barbecue', 'барбекю'),
    },
    tags: ['food', 'friends'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-journalism',
    english: 'journalism',
    senseKey: 'work-of-reporting-news',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '저널리즘; 언론학',
      'jurnalistika',
      'the work or study of reporting news',
      'журналистика',
    ),
    examples: [
      {
        english: 'She studied journalism.',
        translations: L(
          '그녀는 저널리즘을 공부했어요.',
          'U jurnalistikani o‘rgandi.',
          'She studied journalism.',
          'Она изучала журналистику.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈdʒɜːnəlɪzəm/',
      ttsText: 'journalism',
    },
    media: {
      emoji: '🎤',
      imageUrl: '',
      imageAlt: L('뉴스 취재', 'jurnalistika', 'journalism', 'журналистика'),
    },
    tags: ['jobs', 'media'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-newspaper',
    english: 'newspaper',
    senseKey: 'publication-containing-news',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '신문',
      'gazeta',
      'a publication containing news and articles',
      'газета',
    ),
    examples: [
      {
        english: 'She works for a national newspaper.',
        translations: L(
          '그녀는 전국 신문사에서 일해요.',
          'U milliy gazetada ishlaydi.',
          'She works for a national newspaper.',
          'Она работает в национальной газете.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈnjuːzpeɪpə/',
      ttsText: 'newspaper',
    },
    media: {
      emoji: '📰',
      imageUrl: '',
      imageAlt: L('신문', 'gazeta', 'a newspaper', 'газета'),
    },
    tags: ['media', 'reading'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-charity-activity',
    english: 'charity',
    senseKey: 'charitable-activity',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '자선; 자선 활동',
      'xayriya',
      'help given to people in need',
      'благотворительность',
    ),
    examples: [
      {
        english: 'They raised money for charity.',
        translations: L(
          '그들은 자선단체를 위해 돈을 모았어요.',
          'Ular xayriya uchun pul yig‘ishdi.',
          'They raised money for charity.',
          'Они собрали деньги на благотворительность.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈtʃærəti/',
      ttsText: 'charity',
    },
    media: {
      emoji: '❤️',
      imageUrl: '',
      imageAlt: L('자선 활동', 'xayriya', 'charity', 'благотворительность'),
    },
    tags: ['community', 'money'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-raise',
    english: 'raise',
    senseKey: 'collect-money-for-purpose',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '모으다',
      'yig‘moq',
      'to collect money for a particular purpose',
      'собирать',
    ),
    examples: [
      {
        english: 'They raised money for charity.',
        translations: L(
          '그들은 자선 활동을 위해 돈을 모았어요.',
          'Ular xayriya uchun pul yig‘ishdi.',
          'They raised money for charity.',
          'Они собрали деньги на благотворительность.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/reɪz/',
      ttsText: 'raise',
    },
    media: {
      emoji: '💰',
      imageUrl: '',
      imageAlt: L(
        '돈을 모으는 모습',
        'pul yig‘ish',
        'raising money',
        'сбор денег',
      ),
    },
    tags: ['charity', 'verbs'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-invite',
    english: 'invite',
    senseKey: 'ask-someone-to-come-to-event',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '초대하다',
      'taklif qilmoq',
      'to ask someone to come to a place or event',
      'приглашать',
    ),
    examples: [
      {
        english: 'She invited us to lunch.',
        translations: L(
          '그녀는 우리를 점심 식사에 초대했어요.',
          'U bizni tushlikka taklif qildi.',
          'She invited us to lunch.',
          'Она пригласила нас на обед.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɪnˈvaɪt/',
      ttsText: 'invite',
    },
    media: {
      emoji: '💌',
      imageUrl: '',
      imageAlt: L('초대장', 'taklifnoma', 'an invitation', 'приглашение'),
    },
    tags: ['social', 'verbs'],
    difficulty: 1,
    isCore: true,
  },
];

export const EN_S1_UNIT8_NODE3_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Photo stories
  // ===========================================================

  en_s1u8_n3_001_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I photographed him in Spain.',
    audioText: 'I photographed him in Spain.',
    answerTranslation: L(
      '저는 스페인에서 그의 사진을 찍었어요.',
      'Men uni Ispaniyada suratga oldim.',
      'I photographed him in Spain.',
      'Я сфотографировал его в Испании.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['object-pronouns', 'him'],
  },

  en_s1u8_n3_002_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'monkey',
    choices: [
      { text: 'competition', label: '🏆', emoji: '🏆', imageUrl: '' },
      { text: 'monkey', label: '🐒', emoji: '🐒', imageUrl: '' },
      { text: 'newspaper', label: '📰', emoji: '📰', imageUrl: '' },
      { text: 'barbecue', label: '🍖', emoji: '🍖', imageUrl: '' },
    ],
    answerTranslation: L('원숭이', 'maymun', 'monkey', 'обезьяна'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['monkey'],
  },

  en_s1u8_n3_003_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'competition',
        native: 'musobaqa',
        nativeI18n: L('대회', 'musobaqa', 'competition', 'соревнование'),
      },
      {
        text: 'prize',
        native: 'mukofot',
        nativeI18n: L('상', 'mukofot', 'prize', 'приз'),
      },
      {
        text: 'photograph',
        native: 'suratga olmoq',
        nativeI18n: L(
          '사진을 찍다',
          'suratga olmoq',
          'photograph',
          'фотографировать',
        ),
      },
      {
        text: 'monkey',
        native: 'maymun',
        nativeI18n: L('원숭이', 'maymun', 'monkey', 'обезьяна'),
      },
      {
        text: 'barbecue',
        native: 'barbekyu',
        nativeI18n: L('바비큐', 'barbekyu', 'barbecue', 'барбекю'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['photo-story', 'matching'],
  },

  en_s1u8_n3_004_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['with', 'They', 'us', 'asked', 'play', 'them', 'to', 'him'],
    answer: 'They asked us to play with them',
    answerTranslation: L(
      '그들은 우리에게 함께 경기하자고 했어요.',
      'Ular bizdan ular bilan o‘ynashni so‘rashdi.',
      'They asked us to play with them.',
      'Они попросили нас поиграть с ними.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['object-pronouns', 'us', 'them'],
  },

  en_s1u8_n3_005_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['him', '2012', 'in', 'photographed', 'I', 'Spain', 'her'],
    answer: 'I photographed him in Spain in 2012',
    audioText: 'I photographed him in Spain in 2012.',
    answerTranslation: L(
      '저는 2012년에 스페인에서 그의 사진을 찍었어요.',
      'Men uni 2012-yilda Ispaniyada suratga oldim.',
      'I photographed him in Spain in 2012.',
      'Я сфотографировал его в Испании в 2012 году.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['him', 'past-time'],
  },

  en_s1u8_n3_006_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'competition',
        native: 'musobaqa',
        nativeI18n: L('대회', 'musobaqa', 'competition', 'соревнование'),
      },
      {
        text: 'prize',
        native: 'mukofot',
        nativeI18n: L('상', 'mukofot', 'prize', 'приз'),
      },
      {
        text: 'photograph',
        native: 'suratga olmoq',
        nativeI18n: L(
          '사진을 찍다',
          'suratga olmoq',
          'photograph',
          'фотографировать',
        ),
      },
      {
        text: 'monkey',
        native: 'maymun',
        nativeI18n: L('원숭이', 'maymun', 'monkey', 'обезьяна'),
      },
      {
        text: 'barbecue',
        native: 'barbekyu',
        nativeI18n: L('바비큐', 'barbekyu', 'barbecue', 'барбекю'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['photo-story', 'listening'],
  },

  en_s1u8_n3_007_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I photographed ',
    sentenceSuffix: ' in Spain.',
    answer: 'him',
    answerTranslation: L(
      '저는 스페인에서 그의 사진을 찍었어요.',
      'Men uni Ispaniyada suratga oldim.',
      'I photographed him in Spain.',
      'Я сфотографировал его в Испании.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English object pronoun is "him".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'object-pronouns'],
  },

  en_s1u8_n3_008_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'prize',
    choices: [
      { text: 'monkey', label: '🐒', emoji: '🐒', imageUrl: '' },
      { text: 'competition', label: '🏆', emoji: '🏆', imageUrl: '' },
      { text: 'prize', label: '🏅', emoji: '🏅', imageUrl: '' },
      { text: 'newspaper', label: '📰', emoji: '📰', imageUrl: '' },
    ],
    answerTranslation: L('상', 'mukofot', 'prize', 'приз'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['prize'],
  },

  en_s1u8_n3_009_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'The children asked us to play with them.',
    audioText: 'The children asked us to play with them.',
    answerI18n: L(
      '아이들은 우리에게 함께 경기하자고 했어요',
      'Bolalar bizdan ular bilan o‘ynashni so‘rashdi',
      'The children asked us to play with them',
      'Дети попросили нас поиграть с ними',
    ),
    options: [
      'them',
      'children',
      'play',
      'The',
      'asked',
      'us',
      'with',
      'to',
      'him',
    ],
    optionsI18n: {
      ko: ['아이들은', '우리에게', '그들과', '함께', '경기하자고', '했어요'],
      uz: ['Bolalar', 'bizdan', 'ular', 'bilan', 'o‘ynashni', 'so‘rashdi'],
      en: ['The', 'children', 'asked', 'us', 'to', 'play', 'with', 'them'],
      ru: ['Дети', 'попросили', 'нас', 'поиграть', 'с', 'ними'],
    },
    answerTranslation: L(
      '아이들은 우리에게 함께 경기하자고 했어요.',
      'Bolalar bizdan ular bilan o‘ynashni so‘rashdi.',
      'The children asked us to play with them.',
      'Дети попросили нас поиграть с ними.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['object-pronouns', 'us', 'them'],
  },

  en_s1u8_n3_010_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Did you photograph the street artist?',
    options: ['Yes', 'photographed', 'him', 'I', 'did', 'her', 'it'],
    answer: 'Yes I did I photographed him',
    answerTranslation: L(
      '네. 그의 사진을 찍었어요.',
      'Ha. Men uni suratga oldim.',
      'Yes, I did. I photographed him.',
      'Да. Я его сфотографировал.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['him', 'reply'],
  },

  en_s1u8_n3_011_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'They asked us to play with ',
    sentenceSuffix: '.',
    answer: 'them',
    answerTranslation: L(
      '그들은 우리에게 그들과 함께 경기하자고 했어요.',
      'Ular bizdan ular bilan o‘ynashni so‘rashdi.',
      'They asked us to play with them.',
      'Они попросили нас поиграть с ними.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English object pronoun is "them".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'them'],
  },

  en_s1u8_n3_012_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'journalism',
        native: 'jurnalistika',
        nativeI18n: L('저널리즘', 'jurnalistika', 'journalism', 'журналистика'),
      },
      {
        text: 'newspaper',
        native: 'gazeta',
        nativeI18n: L('신문', 'gazeta', 'newspaper', 'газета'),
      },
      {
        text: 'charity',
        native: 'xayriya',
        nativeI18n: L('자선 활동', 'xayriya', 'charity', 'благотворительность'),
      },
      {
        text: 'raise',
        native: 'yig‘moq',
        nativeI18n: L('모으다', 'yig‘moq', 'raise', 'собирать'),
      },
      {
        text: 'invite',
        native: 'taklif qilmoq',
        nativeI18n: L('초대하다', 'taklif qilmoq', 'invite', 'приглашать'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['people', 'matching'],
  },

  en_s1u8_n3_013_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['a', 'photographed', 'monkey', 'I', 'it', 'so', 'saw', 'him'],
    answer: 'I saw a monkey so I photographed it',
    answerTranslation: L(
      '저는 원숭이를 봐서 사진을 찍었어요.',
      'Men maymunni ko‘rdim, shuning uchun uni suratga oldim.',
      'I saw a monkey, so I photographed it.',
      'Я увидел обезьяну и сфотографировал её.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['it', 'monkey'],
  },

  en_s1u8_n3_014_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'journalism',
        native: 'jurnalistika',
        nativeI18n: L('저널리즘', 'jurnalistika', 'journalism', 'журналистика'),
      },
      {
        text: 'newspaper',
        native: 'gazeta',
        nativeI18n: L('신문', 'gazeta', 'newspaper', 'газета'),
      },
      {
        text: 'charity',
        native: 'xayriya',
        nativeI18n: L('자선 활동', 'xayriya', 'charity', 'благотворительность'),
      },
      {
        text: 'raise',
        native: 'yig‘moq',
        nativeI18n: L('모으다', 'yig‘moq', 'raise', 'собирать'),
      },
      {
        text: 'invite',
        native: 'taklif qilmoq',
        nativeI18n: L('초대하다', 'taklif qilmoq', 'invite', 'приглашать'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['people', 'listening'],
  },

  en_s1u8_n3_015_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'newspaper',
    choices: [
      { text: 'barbecue', label: '🍖', emoji: '🍖', imageUrl: '' },
      { text: 'charity', label: '❤️', emoji: '❤️', imageUrl: '' },
      { text: 'newspaper', label: '📰', emoji: '📰', imageUrl: '' },
      { text: 'monkey', label: '🐒', emoji: '🐒', imageUrl: '' },
    ],
    answerTranslation: L('신문', 'gazeta', 'newspaper', 'газета'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['newspaper'],
  },

  en_s1u8_n3_016_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I listened to ___ for two hours.',
    blankAnswers: ['her'],
    options: ['her', 'she', 'hers', 'they'],
    answer: 'her',
    answerTranslation: L(
      '저는 그녀의 연주를 두 시간 동안 들었어요.',
      'Men uni ikki soat tingladim.',
      'I listened to her for two hours.',
      'Я слушал её два часа.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['her', 'object-pronouns'],
  },

  en_s1u8_n3_017_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I saw the monkey and photographed ',
    sentenceSuffix: '.',
    answer: 'it',
    answerTranslation: L(
      '저는 원숭이를 보고 사진을 찍었어요.',
      'Men maymunni ko‘rib, uni suratga oldim.',
      'I saw the monkey and photographed it.',
      'Я увидел обезьяну и сфотографировал её.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English object pronoun is "it".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'it'],
  },

  en_s1u8_n3_018_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['her', 'hours', 'listened', 'two', 'for', 'I', 'to', 'him'],
    answer: 'I listened to her for two hours',
    audioText: 'I listened to her for two hours.',
    answerTranslation: L(
      '저는 그녀의 연주를 두 시간 동안 들었어요.',
      'Men uni ikki soat tingladim.',
      'I listened to her for two hours.',
      'Я слушал её два часа.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['her', 'listening'],
  },

  en_s1u8_n3_019_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Did you like the street musician?',
    options: ['Yes', 'liked', 'I', 'her', 'really', 'did', 'him'],
    answer: 'Yes I did I really liked her',
    answerTranslation: L(
      '네. 저는 그녀를 정말 좋아했어요.',
      'Ha. Men uni juda yoqtirdim.',
      'Yes, I did. I really liked her.',
      'Да. Она мне очень понравилась.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['her', 'reply'],
  },

  en_s1u8_n3_020_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Who is the man in the photo?' }],
    options: [
      'I photographed him in Spain.',
      'I photographed he in Spain.',
      'I photographed they yesterday.',
      'I was photograph him.',
    ],
    answer: 'I photographed him in Spain.',
    answerTranslation: L(
      '저는 스페인에서 그의 사진을 찍었어요.',
      'Men uni Ispaniyada suratga oldim.',
      'I photographed him in Spain.',
      'Я сфотографировал его в Испании.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['him', 'dialog'],
  },

  // ===========================================================
  // Lesson 2 · Object pronouns
  // ===========================================================

  en_s1u8_n3_021_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'My parents call me every week.',
    audioText: 'My parents call me every week.',
    answerTranslation: L(
      '부모님은 매주 저에게 전화하세요.',
      'Ota-onam har hafta menga telefon qiladi.',
      'My parents call me every week.',
      'Мои родители звонят мне каждую неделю.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['object-pronouns', 'me'],
  },

  en_s1u8_n3_022_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'barbecue',
    choices: [
      { text: 'newspaper', label: '📰', emoji: '📰', imageUrl: '' },
      { text: 'barbecue', label: '🍖', emoji: '🍖', imageUrl: '' },
      { text: 'competition', label: '🏆', emoji: '🏆', imageUrl: '' },
      { text: 'charity', label: '❤️', emoji: '❤️', imageUrl: '' },
    ],
    answerTranslation: L('바비큐', 'barbekyu', 'barbecue', 'барбекю'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['barbecue'],
  },

  en_s1u8_n3_023_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'monkey',
        native: 'maymun',
        nativeI18n: L('원숭이', 'maymun', 'monkey', 'обезьяна'),
      },
      {
        text: 'barbecue',
        native: 'barbekyu',
        nativeI18n: L('바비큐', 'barbekyu', 'barbecue', 'барбекю'),
      },
      {
        text: 'newspaper',
        native: 'gazeta',
        nativeI18n: L('신문', 'gazeta', 'newspaper', 'газета'),
      },
      {
        text: 'competition',
        native: 'musobaqa',
        nativeI18n: L('대회', 'musobaqa', 'competition', 'соревнование'),
      },
      {
        text: 'charity',
        native: 'xayriya',
        nativeI18n: L('자선 활동', 'xayriya', 'charity', 'благотворительность'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['review', 'matching'],
  },

  en_s1u8_n3_024_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['her', 'Maria', 'doesn’t', 'like', 'but', 'likes', 'me', 'I'],
    answer: 'Maria likes me but I don’t like her',
    answerTranslation: L(
      '마리아는 저를 좋아하지만 저는 그녀를 좋아하지 않아요.',
      'Mariya meni yoqtiradi, lekin men uni yoqtirmayman.',
      'Maria likes me, but I don’t like her.',
      'Мария любит меня, но я не люблю её.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['me', 'her', 'object-pronouns'],
  },

  en_s1u8_n3_025_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['week', 'them', 'call', 'every', 'I', 'parents', 'my', 'us'],
    answer: 'I call my parents every week',
    audioText: 'I call my parents every week.',
    answerTranslation: L(
      '저는 매주 부모님께 전화해요.',
      'Men har hafta ota-onamga telefon qilaman.',
      'I call my parents every week.',
      'Я звоню родителям каждую неделю.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['family', 'object-pronouns'],
  },

  en_s1u8_n3_026_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'monkey',
        native: 'maymun',
        nativeI18n: L('원숭이', 'maymun', 'monkey', 'обезьяна'),
      },
      {
        text: 'barbecue',
        native: 'barbekyu',
        nativeI18n: L('바비큐', 'barbekyu', 'barbecue', 'барбекю'),
      },
      {
        text: 'newspaper',
        native: 'gazeta',
        nativeI18n: L('신문', 'gazeta', 'newspaper', 'газета'),
      },
      {
        text: 'competition',
        native: 'musobaqa',
        nativeI18n: L('대회', 'musobaqa', 'competition', 'соревнование'),
      },
      {
        text: 'charity',
        native: 'xayriya',
        nativeI18n: L('자선 활동', 'xayriya', 'charity', 'благотворительность'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['review', 'listening'],
  },

  en_s1u8_n3_027_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'My parents live abroad. I call ',
    sentenceSuffix: ' every week.',
    answer: 'them',
    answerTranslation: L(
      '부모님은 외국에 사세요. 저는 매주 그분들께 전화해요.',
      'Ota-onam chet elda yashaydi. Men ularga har hafta telefon qilaman.',
      'My parents live abroad. I call them every week.',
      'Мои родители живут за границей. Я звоню им каждую неделю.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English object pronoun is "them".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'them'],
  },

  en_s1u8_n3_028_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'charity',
    choices: [
      { text: 'prize', label: '🏅', emoji: '🏅', imageUrl: '' },
      { text: 'newspaper', label: '📰', emoji: '📰', imageUrl: '' },
      { text: 'charity', label: '❤️', emoji: '❤️', imageUrl: '' },
      { text: 'monkey', label: '🐒', emoji: '🐒', imageUrl: '' },
    ],
    answerTranslation: L(
      '자선 활동',
      'xayriya',
      'charity',
      'благотворительность',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['charity'],
  },

  en_s1u8_n3_029_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'My sister sometimes comes with us.',
    audioText: 'My sister sometimes comes with us.',
    answerI18n: L(
      '제 여동생은 가끔 우리와 함께 와요',
      'Singlim ba’zan biz bilan keladi',
      'My sister sometimes comes with us',
      'Моя сестра иногда приходит с нами',
    ),
    options: ['with', 'sometimes', 'My', 'us', 'comes', 'sister', 'them'],
    optionsI18n: {
      ko: ['제', '여동생은', '가끔', '우리와', '함께', '와요'],
      uz: ['Singlim', 'ba’zan', 'biz', 'bilan', 'keladi'],
      en: ['My', 'sister', 'sometimes', 'comes', 'with', 'us'],
      ru: ['Моя', 'сестра', 'иногда', 'приходит', 'с', 'нами'],
    },
    answerTranslation: L(
      '제 여동생은 가끔 우리와 함께 와요.',
      'Singlim ba’zan biz bilan keladi.',
      'My sister sometimes comes with us.',
      'Моя сестра иногда приходит с нами.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['us', 'object-pronouns'],
  },

  en_s1u8_n3_030_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Do your neighbours like you?',
    options: ['Yes', 'they', 'do', 'like', 'me', 'them', 'he'],
    answer: 'Yes they do they like me',
    answerTranslation: L(
      '네, 저를 좋아해요.',
      'Ha, ular meni yoqtiradi.',
      'Yes, they do. They like me.',
      'Да, я им нравлюсь.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['me', 'reply'],
  },

  en_s1u8_n3_031_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Can you help ',
    sentenceSuffix: '?',
    answer: 'us',
    answerTranslation: L(
      '우리를 도와주실 수 있어요?',
      'Bizga yordam bera olasizmi?',
      'Can you help us?',
      'Вы можете помочь нам?',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English object pronoun is "us".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'us'],
  },

  en_s1u8_n3_032_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'journalism',
        native: 'jurnalistika',
        nativeI18n: L('저널리즘', 'jurnalistika', 'journalism', 'журналистика'),
      },
      {
        text: 'photograph',
        native: 'suratga olmoq',
        nativeI18n: L(
          '사진을 찍다',
          'suratga olmoq',
          'photograph',
          'фотографировать',
        ),
      },
      {
        text: 'raise',
        native: 'yig‘moq',
        nativeI18n: L('모으다', 'yig‘moq', 'raise', 'собирать'),
      },
      {
        text: 'invite',
        native: 'taklif qilmoq',
        nativeI18n: L('초대하다', 'taklif qilmoq', 'invite', 'приглашать'),
      },
      {
        text: 'prize',
        native: 'mukofot',
        nativeI18n: L('상', 'mukofot', 'prize', 'приз'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['review', 'matching'],
  },

  en_s1u8_n3_033_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['her', 'wait', 'always', 'We', 'for', 'she', 'them'],
    answer: 'We always wait for her',
    answerTranslation: L(
      '우리는 항상 그녀를 기다려요.',
      'Biz uni har doim kutamiz.',
      'We always wait for her.',
      'Мы всегда ждём её.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['her', 'preposition'],
  },

  en_s1u8_n3_034_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'journalism',
        native: 'jurnalistika',
        nativeI18n: L('저널리즘', 'jurnalistika', 'journalism', 'журналистика'),
      },
      {
        text: 'photograph',
        native: 'suratga olmoq',
        nativeI18n: L(
          '사진을 찍다',
          'suratga olmoq',
          'photograph',
          'фотографировать',
        ),
      },
      {
        text: 'raise',
        native: 'yig‘moq',
        nativeI18n: L('모으다', 'yig‘moq', 'raise', 'собирать'),
      },
      {
        text: 'invite',
        native: 'taklif qilmoq',
        nativeI18n: L('초대하다', 'taklif qilmoq', 'invite', 'приглашать'),
      },
      {
        text: 'prize',
        native: 'mukofot',
        nativeI18n: L('상', 'mukofot', 'prize', 'приз'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['review', 'listening'],
  },

  en_s1u8_n3_035_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'competition',
    choices: [
      { text: 'prize', label: '🏅', emoji: '🏅', imageUrl: '' },
      { text: 'barbecue', label: '🍖', emoji: '🍖', imageUrl: '' },
      { text: 'competition', label: '🏆', emoji: '🏆', imageUrl: '' },
      { text: 'newspaper', label: '📰', emoji: '📰', imageUrl: '' },
    ],
    answerTranslation: L('대회', 'musobaqa', 'competition', 'соревнование'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['competition'],
  },

  en_s1u8_n3_036_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'This book is interesting. I really like ___.',
    blankAnswers: ['it'],
    options: ['it', 'him', 'her', 'them'],
    answer: 'it',
    answerTranslation: L(
      '이 책은 재미있어요. 저는 이 책을 정말 좋아해요.',
      'Bu kitob qiziq. Men uni juda yoqtiraman.',
      'This book is interesting. I really like it.',
      'Эта книга интересная. Она мне очень нравится.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['it', 'object-pronouns'],
  },

  en_s1u8_n3_037_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'My friend has a new boyfriend. She likes ',
    sentenceSuffix: ' a lot.',
    answer: 'him',
    answerTranslation: L(
      '제 친구에게 새 남자친구가 있어요. 그녀는 그를 아주 좋아해요.',
      'Do‘stimning yangi yigiti bor. U uni juda yoqtiradi.',
      'My friend has a new boyfriend. She likes him a lot.',
      'У моей подруги новый парень. Он ей очень нравится.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English object pronoun is "him".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'him'],
  },

  en_s1u8_n3_038_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['me', 'never', 'visits', 'brother', 'My', 'him', 'often'],
    answer: 'My brother never visits me',
    audioText: 'My brother never visits me.',
    answerTranslation: L(
      '제 형제는 저를 전혀 방문하지 않아요.',
      'Akam meni hech qachon yo‘qlamaydi.',
      'My brother never visits me.',
      'Мой брат никогда меня не навещает.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['me', 'object-pronouns'],
  },

  en_s1u8_n3_039_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Do you know the head of your company?',
    options: ['Yes', 'I', 'know', 'him', 'quite', 'well', 'them', 'her'],
    answer: 'Yes I know him quite well',
    answerTranslation: L(
      '네, 그를 꽤 잘 알아요.',
      'Ha, men uni ancha yaxshi taniyman.',
      'Yes, I know him quite well.',
      'Да, я довольно хорошо его знаю.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['him', 'reply'],
  },

  en_s1u8_n3_040_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Do you like this film?' }],
    options: [
      'Yes, I really like it.',
      'Yes, I really like he.',
      'Yes, I really like they.',
      'Yes, I am like it.',
    ],
    answer: 'Yes, I really like it.',
    answerTranslation: L(
      '네, 저는 이 영화를 정말 좋아해요.',
      'Ha, men uni juda yoqtiraman.',
      'Yes, I really like it.',
      'Да, мне он очень нравится.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['it', 'dialog'],
  },

  // ===========================================================
  // Lesson 3 · Past time expressions
  // ===========================================================

  en_s1u8_n3_041_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'We were in South Africa last year.',
    audioText: 'We were in South Africa last year.',
    answerTranslation: L(
      '우리는 작년에 남아프리카공화국에 있었어요.',
      'Biz o‘tgan yili Janubiy Afrikada edik.',
      'We were in South Africa last year.',
      'В прошлом году мы были в Южной Африке.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['past-time', 'last-year'],
  },

  en_s1u8_n3_042_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'newspaper',
    choices: [
      { text: 'competition', label: '🏆', emoji: '🏆', imageUrl: '' },
      { text: 'charity', label: '❤️', emoji: '❤️', imageUrl: '' },
      { text: 'newspaper', label: '📰', emoji: '📰', imageUrl: '' },
      { text: 'barbecue', label: '🍖', emoji: '🍖', imageUrl: '' },
    ],
    answerTranslation: L('신문', 'gazeta', 'newspaper', 'газета'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['newspaper'],
  },

  en_s1u8_n3_043_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'competition',
        native: 'musobaqa',
        nativeI18n: L('대회', 'musobaqa', 'competition', 'соревнование'),
      },
      {
        text: 'journalism',
        native: 'jurnalistika',
        nativeI18n: L('저널리즘', 'jurnalistika', 'journalism', 'журналистика'),
      },
      {
        text: 'newspaper',
        native: 'gazeta',
        nativeI18n: L('신문', 'gazeta', 'newspaper', 'газета'),
      },
      {
        text: 'barbecue',
        native: 'barbekyu',
        nativeI18n: L('바비큐', 'barbekyu', 'barbecue', 'барбекю'),
      },
      {
        text: 'charity',
        native: 'xayriya',
        nativeI18n: L('자선 활동', 'xayriya', 'charity', 'благотворительность'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['past-time', 'matching'],
  },

  en_s1u8_n3_044_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'year',
      'South',
      'in',
      'We',
      'last',
      'Africa',
      'were',
      'yesterday',
    ],
    answer: 'We were in South Africa last year',
    answerTranslation: L(
      '우리는 작년에 남아프리카공화국에 있었어요.',
      'Biz o‘tgan yili Janubiy Afrikada edik.',
      'We were in South Africa last year.',
      'В прошлом году мы были в Южной Африке.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['past-time', 'last-year'],
  },

  en_s1u8_n3_045_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'yesterday',
      'her',
      'hours',
      'to',
      'two',
      'for',
      'listened',
      'I',
      'tomorrow',
    ],
    answer: 'I listened to her for two hours yesterday',
    audioText: 'I listened to her for two hours yesterday.',
    answerTranslation: L(
      '저는 어제 그녀의 연주를 두 시간 동안 들었어요.',
      'Men kecha uni ikki soat tingladim.',
      'I listened to her for two hours yesterday.',
      'Вчера я слушал её два часа.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['yesterday', 'her'],
  },

  en_s1u8_n3_046_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'competition',
        native: 'musobaqa',
        nativeI18n: L('대회', 'musobaqa', 'competition', 'соревнование'),
      },
      {
        text: 'journalism',
        native: 'jurnalistika',
        nativeI18n: L('저널리즘', 'jurnalistika', 'journalism', 'журналистика'),
      },
      {
        text: 'newspaper',
        native: 'gazeta',
        nativeI18n: L('신문', 'gazeta', 'newspaper', 'газета'),
      },
      {
        text: 'barbecue',
        native: 'barbekyu',
        nativeI18n: L('바비큐', 'barbekyu', 'barbecue', 'барбекю'),
      },
      {
        text: 'charity',
        native: 'xayriya',
        nativeI18n: L('자선 활동', 'xayriya', 'charity', 'благотворительность'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['past-time', 'listening'],
  },

  en_s1u8_n3_047_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'We were on holiday in South Africa last ',
    sentenceSuffix: '.',
    answer: 'year',
    answerTranslation: L(
      '우리는 작년에 남아프리카공화국으로 휴가를 갔어요.',
      'Biz o‘tgan yili Janubiy Afrikada ta’tilda edik.',
      'We were on holiday in South Africa last year.',
      'В прошлом году мы были в отпуске в Южной Африке.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "year".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['typing', 'past-time'],
  },

  en_s1u8_n3_048_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'barbecue',
    choices: [
      { text: 'prize', label: '🏅', emoji: '🏅', imageUrl: '' },
      { text: 'competition', label: '🏆', emoji: '🏆', imageUrl: '' },
      { text: 'barbecue', label: '🍖', emoji: '🍖', imageUrl: '' },
      { text: 'monkey', label: '🐒', emoji: '🐒', imageUrl: '' },
    ],
    answerTranslation: L('바비큐', 'barbekyu', 'barbecue', 'барбекю'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['barbecue'],
  },

  en_s1u8_n3_049_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'I photographed him in Spain in 2012.',
    audioText: 'I photographed him in Spain in 2012.',
    answerI18n: L(
      '저는 2012년에 스페인에서 그의 사진을 찍었어요',
      'Men uni 2012-yilda Ispaniyada suratga oldim',
      'I photographed him in Spain in 2012',
      'Я сфотографировал его в Испании в 2012 году',
    ),
    options: ['Spain', 'him', '2012', 'I', 'photographed', 'in', 'in', 'her'],
    optionsI18n: {
      ko: ['저는', '2012년에', '스페인에서', '그의', '사진을', '찍었어요'],
      uz: ['Men', 'uni', '2012-yilda', 'Ispaniyada', 'suratga', 'oldim'],
      en: ['I', 'photographed', 'him', 'in', 'Spain', 'in', '2012'],
      ru: ['Я', 'сфотографировал', 'его', 'в', 'Испании', 'в', '2012', 'году'],
    },
    answerTranslation: L(
      '저는 2012년에 스페인에서 그의 사진을 찍었어요.',
      'Men uni 2012-yilda Ispaniyada suratga oldim.',
      'I photographed him in Spain in 2012.',
      'Я сфотографировал его в Испании в 2012 году.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['past-time', 'him'],
  },

  en_s1u8_n3_050_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'When did you visit your friend?',
    options: ['I', 'visited', 'him', 'last', 'week', 'tomorrow', 'her'],
    answer: 'I visited him last week',
    answerTranslation: L(
      '저는 지난주에 그를 방문했어요.',
      'Men uni o‘tgan hafta yo‘qladim.',
      'I visited him last week.',
      'Я навещал его на прошлой неделе.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['last-week', 'reply'],
  },

  en_s1u8_n3_051_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I listened to music ',
    sentenceSuffix: ' night.',
    answer: 'last',
    answerTranslation: L(
      '저는 어젯밤에 음악을 들었어요.',
      'Men kecha kechqurun musiqa tingladim.',
      'I listened to music last night.',
      'Я слушал музыку прошлой ночью.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "last".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['typing', 'last-night'],
  },

  en_s1u8_n3_052_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'photograph',
        native: 'suratga olmoq',
        nativeI18n: L(
          '사진을 찍다',
          'suratga olmoq',
          'photograph',
          'фотографировать',
        ),
      },
      {
        text: 'invite',
        native: 'taklif qilmoq',
        nativeI18n: L('초대하다', 'taklif qilmoq', 'invite', 'приглашать'),
      },
      {
        text: 'raise',
        native: 'yig‘moq',
        nativeI18n: L('모으다', 'yig‘moq', 'raise', 'собирать'),
      },
      {
        text: 'prize',
        native: 'mukofot',
        nativeI18n: L('상', 'mukofot', 'prize', 'приз'),
      },
      {
        text: 'monkey',
        native: 'maymun',
        nativeI18n: L('원숭이', 'maymun', 'monkey', 'обезьяна'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['review', 'matching'],
  },

  en_s1u8_n3_053_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['Monday', 'museum', 'visited', 'the', 'They', 'on', 'in', 'last'],
    answer: 'They visited the museum on Monday',
    answerTranslation: L(
      '그들은 월요일에 박물관을 방문했어요.',
      'Ular dushanba kuni muzeyga tashrif buyurishdi.',
      'They visited the museum on Monday.',
      'Они посетили музей в понедельник.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['past-time', 'on-monday'],
  },

  en_s1u8_n3_054_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'photograph',
        native: 'suratga olmoq',
        nativeI18n: L(
          '사진을 찍다',
          'suratga olmoq',
          'photograph',
          'фотографировать',
        ),
      },
      {
        text: 'invite',
        native: 'taklif qilmoq',
        nativeI18n: L('초대하다', 'taklif qilmoq', 'invite', 'приглашать'),
      },
      {
        text: 'raise',
        native: 'yig‘moq',
        nativeI18n: L('모으다', 'yig‘moq', 'raise', 'собирать'),
      },
      {
        text: 'prize',
        native: 'mukofot',
        nativeI18n: L('상', 'mukofot', 'prize', 'приз'),
      },
      {
        text: 'monkey',
        native: 'maymun',
        nativeI18n: L('원숭이', 'maymun', 'monkey', 'обезьяна'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['review', 'listening'],
  },

  en_s1u8_n3_055_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'monkey',
    choices: [
      { text: 'charity', label: '❤️', emoji: '❤️', imageUrl: '' },
      { text: 'barbecue', label: '🍖', emoji: '🍖', imageUrl: '' },
      { text: 'monkey', label: '🐒', emoji: '🐒', imageUrl: '' },
      { text: 'competition', label: '🏆', emoji: '🏆', imageUrl: '' },
    ],
    answerTranslation: L('원숭이', 'maymun', 'monkey', 'обезьяна'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['monkey'],
  },

  en_s1u8_n3_056_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'We were in Croatia ___ February.',
    blankAnswers: ['in'],
    options: ['in', 'on', 'at', 'last'],
    answer: 'in',
    answerTranslation: L(
      '우리는 2월에 크로아티아에 있었어요.',
      'Biz fevral oyida Xorvatiyada edik.',
      'We were in Croatia in February.',
      'Мы были в Хорватии в феврале.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['past-time', 'in-month'],
  },

  en_s1u8_n3_057_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'They visited the museum ',
    sentenceSuffix: ' Saturday.',
    answer: 'on',
    answerTranslation: L(
      '그들은 토요일에 박물관을 방문했어요.',
      'Ular shanba kuni muzeyga tashrif buyurishdi.',
      'They visited the museum on Saturday.',
      'Они посетили музей в субботу.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English preposition is "on".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'past-time'],
  },

  en_s1u8_n3_058_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['morning', 'started', 'this', 'work', 'early', 'Irina', 'last'],
    answer: 'Irina started work early this morning',
    audioText: 'Irina started work early this morning.',
    answerTranslation: L(
      '이리나는 오늘 아침 일찍 일을 시작했어요.',
      'Irina bugun ertalab ishni erta boshladi.',
      'Irina started work early this morning.',
      'Ирина начала работу рано сегодня утром.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['past-time', 'this-morning'],
  },

  en_s1u8_n3_059_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'When were you in Beijing?',
    options: ['I', 'was', 'there', 'last', 'year', 'tomorrow', 'Monday'],
    answer: 'I was there last year',
    answerTranslation: L(
      '저는 작년에 거기에 있었어요.',
      'Men o‘tgan yili u yerda edim.',
      'I was there last year.',
      'Я был там в прошлом году.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['last-year', 'reply'],
  },

  en_s1u8_n3_060_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'When did you watch the film?' }],
    options: [
      'I watched it last night.',
      'I watched it yesterday night.',
      'I watched it on last night.',
      'I watch it last night.',
    ],
    answer: 'I watched it last night.',
    answerTranslation: L(
      '어젯밤에 봤어요.',
      'Men uni kecha kechqurun ko‘rdim.',
      'I watched it last night.',
      'Я посмотрел его прошлой ночью.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['past-time', 'dialog'],
  },

  // ===========================================================
  // Lesson 4 · Tell a photo story
  // ===========================================================

  en_s1u8_n3_061_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She invited us to lunch.',
    audioText: 'She invited us to lunch.',
    answerTranslation: L(
      '그녀는 우리를 점심 식사에 초대했어요.',
      'U bizni tushlikka taklif qildi.',
      'She invited us to lunch.',
      'Она пригласила нас на обед.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['invite', 'us'],
  },

  en_s1u8_n3_062_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'charity',
    choices: [
      { text: 'competition', label: '🏆', emoji: '🏆', imageUrl: '' },
      { text: 'newspaper', label: '📰', emoji: '📰', imageUrl: '' },
      { text: 'charity', label: '❤️', emoji: '❤️', imageUrl: '' },
      { text: 'barbecue', label: '🍖', emoji: '🍖', imageUrl: '' },
    ],
    answerTranslation: L(
      '자선 활동',
      'xayriya',
      'charity',
      'благотворительность',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['charity'],
  },

  en_s1u8_n3_063_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'invite',
        native: 'taklif qilmoq',
        nativeI18n: L('초대하다', 'taklif qilmoq', 'invite', 'приглашать'),
      },
      {
        text: 'raise',
        native: 'yig‘moq',
        nativeI18n: L('모으다', 'yig‘moq', 'raise', 'собирать'),
      },
      {
        text: 'charity',
        native: 'xayriya',
        nativeI18n: L('자선 활동', 'xayriya', 'charity', 'благотворительность'),
      },
      {
        text: 'journalism',
        native: 'jurnalistika',
        nativeI18n: L('저널리즘', 'jurnalistika', 'journalism', 'журналистика'),
      },
      {
        text: 'newspaper',
        native: 'gazeta',
        nativeI18n: L('신문', 'gazeta', 'newspaper', 'газета'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['photo-story', 'matching'],
  },

  en_s1u8_n3_064_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['lunch', 'us', 'She', 'to', 'invited', 'them', 'barbecue'],
    answer: 'She invited us to lunch',
    answerTranslation: L(
      '그녀는 우리를 점심 식사에 초대했어요.',
      'U bizni tushlikka taklif qildi.',
      'She invited us to lunch.',
      'Она пригласила нас на обед.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['invite', 'us'],
  },

  en_s1u8_n3_065_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'charity',
      'money',
      'They',
      'raised',
      'for',
      'newspaper',
      'competition',
    ],
    answer: 'They raised money for charity',
    audioText: 'They raised money for charity.',
    answerTranslation: L(
      '그들은 자선 활동을 위해 돈을 모았어요.',
      'Ular xayriya uchun pul yig‘ishdi.',
      'They raised money for charity.',
      'Они собрали деньги на благотворительность.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['raise', 'charity'],
  },

  en_s1u8_n3_066_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'invite',
        native: 'taklif qilmoq',
        nativeI18n: L('초대하다', 'taklif qilmoq', 'invite', 'приглашать'),
      },
      {
        text: 'raise',
        native: 'yig‘moq',
        nativeI18n: L('모으다', 'yig‘moq', 'raise', 'собирать'),
      },
      {
        text: 'charity',
        native: 'xayriya',
        nativeI18n: L('자선 활동', 'xayriya', 'charity', 'благотворительность'),
      },
      {
        text: 'journalism',
        native: 'jurnalistika',
        nativeI18n: L('저널리즘', 'jurnalistika', 'journalism', 'журналистика'),
      },
      {
        text: 'newspaper',
        native: 'gazeta',
        nativeI18n: L('신문', 'gazeta', 'newspaper', 'газета'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['photo-story', 'listening'],
  },

  en_s1u8_n3_067_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'She invited ',
    sentenceSuffix: ' to lunch.',
    answer: 'us',
    answerTranslation: L(
      '그녀는 우리를 점심 식사에 초대했어요.',
      'U bizni tushlikka taklif qildi.',
      'She invited us to lunch.',
      'Она пригласила нас на обед.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English object pronoun is "us".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'us'],
  },

  en_s1u8_n3_068_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'competition',
    choices: [
      { text: 'prize', label: '🏅', emoji: '🏅', imageUrl: '' },
      { text: 'charity', label: '❤️', emoji: '❤️', imageUrl: '' },
      { text: 'competition', label: '🏆', emoji: '🏆', imageUrl: '' },
      { text: 'newspaper', label: '📰', emoji: '📰', imageUrl: '' },
    ],
    answerTranslation: L('대회', 'musobaqa', 'competition', 'соревнование'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['competition'],
  },

  en_s1u8_n3_069_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'They walked two hundred kilometres to raise money for charity.',
    audioText: 'They walked two hundred kilometres to raise money for charity.',
    answerI18n: L(
      '그들은 자선 활동을 위한 돈을 모으려고 200킬로미터를 걸었어요',
      'Ular xayriya uchun pul yig‘ish maqsadida ikki yuz kilometr yurishdi',
      'They walked two hundred kilometres to raise money for charity',
      'Они прошли двести километров, чтобы собрать деньги на благотворительность',
    ),
    options: [
      'money',
      'walked',
      'charity',
      'They',
      'kilometres',
      'raise',
      'for',
      'two',
      'hundred',
      'to',
      'prize',
    ],
    optionsI18n: {
      ko: [
        '그들은',
        '자선',
        '활동을',
        '위한',
        '돈을',
        '모으려고',
        '200킬로미터를',
        '걸었어요',
      ],
      uz: [
        'Ular',
        'xayriya',
        'uchun',
        'pul',
        'yig‘ish',
        'maqsadida',
        'ikki',
        'yuz',
        'kilometr',
        'yurishdi',
      ],
      en: [
        'They',
        'walked',
        'two',
        'hundred',
        'kilometres',
        'to',
        'raise',
        'money',
        'for',
        'charity',
      ],
      ru: [
        'Они',
        'прошли',
        'двести',
        'километров',
        'чтобы',
        'собрать',
        'деньги',
        'на',
        'благотворительность',
      ],
    },
    answerTranslation: L(
      '그들은 자선 활동을 위한 돈을 모으려고 200킬로미터를 걸었어요.',
      'Ular xayriya uchun pul yig‘ish maqsadida ikki yuz kilometr yurishdi.',
      'They walked two hundred kilometres to raise money for charity.',
      'Они прошли двести километров, чтобы собрать деньги на благотворительность.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['raise', 'charity', 'past-story'],
  },

  en_s1u8_n3_070_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Why did Rafa and Nicolas walk 200 kilometres?',
    options: [
      'They',
      'wanted',
      'to',
      'raise',
      'money',
      'for',
      'charity',
      'prize',
      'newspaper',
    ],
    answer: 'They wanted to raise money for charity',
    answerTranslation: L(
      '그들은 자선 활동을 위한 돈을 모으고 싶었어요.',
      'Ular xayriya uchun pul yig‘moqchi edi.',
      'They wanted to raise money for charity.',
      'Они хотели собрать деньги на благотворительность.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['raise', 'charity', 'reply'],
  },

  en_s1u8_n3_071_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'They raised money for ',
    sentenceSuffix: '.',
    answer: 'charity',
    answerTranslation: L(
      '그들은 자선 활동을 위해 돈을 모았어요.',
      'Ular xayriya uchun pul yig‘ishdi.',
      'They raised money for charity.',
      'Они собрали деньги на благотворительность.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "charity".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'charity'],
  },

  en_s1u8_n3_072_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'competition',
        native: 'musobaqa',
        nativeI18n: L('대회', 'musobaqa', 'competition', 'соревнование'),
      },
      {
        text: 'prize',
        native: 'mukofot',
        nativeI18n: L('상', 'mukofot', 'prize', 'приз'),
      },
      {
        text: 'photograph',
        native: 'suratga olmoq',
        nativeI18n: L(
          '사진을 찍다',
          'suratga olmoq',
          'photograph',
          'фотографировать',
        ),
      },
      {
        text: 'raise',
        native: 'yig‘moq',
        nativeI18n: L('모으다', 'yig‘moq', 'raise', 'собирать'),
      },
      {
        text: 'invite',
        native: 'taklif qilmoq',
        nativeI18n: L('초대하다', 'taklif qilmoq', 'invite', 'приглашать'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit8', 'matching'],
  },

  en_s1u8_n3_073_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'journalism',
      'studied',
      'She',
      'university',
      'at',
      'newspaper',
      'charity',
    ],
    answer: 'She studied journalism at university',
    answerTranslation: L(
      '그녀는 대학에서 저널리즘을 공부했어요.',
      'U universitetda jurnalistikani o‘rgandi.',
      'She studied journalism at university.',
      'Она изучала журналистику в университете.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['journalism', 'past-story'],
  },

  en_s1u8_n3_074_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'competition',
        native: 'musobaqa',
        nativeI18n: L('대회', 'musobaqa', 'competition', 'соревнование'),
      },
      {
        text: 'prize',
        native: 'mukofot',
        nativeI18n: L('상', 'mukofot', 'prize', 'приз'),
      },
      {
        text: 'photograph',
        native: 'suratga olmoq',
        nativeI18n: L(
          '사진을 찍다',
          'suratga olmoq',
          'photograph',
          'фотографировать',
        ),
      },
      {
        text: 'raise',
        native: 'yig‘moq',
        nativeI18n: L('모으다', 'yig‘moq', 'raise', 'собирать'),
      },
      {
        text: 'invite',
        native: 'taklif qilmoq',
        nativeI18n: L('초대하다', 'taklif qilmoq', 'invite', 'приглашать'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['unit8', 'listening'],
  },

  en_s1u8_n3_075_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'prize',
    choices: [
      { text: 'competition', label: '🏆', emoji: '🏆', imageUrl: '' },
      { text: 'charity', label: '❤️', emoji: '❤️', imageUrl: '' },
      { text: 'newspaper', label: '📰', emoji: '📰', imageUrl: '' },
      { text: 'prize', label: '🏅', emoji: '🏅', imageUrl: '' },
    ],
    answerTranslation: L('상', 'mukofot', 'prize', 'приз'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['prize'],
  },

  en_s1u8_n3_076_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She invited ___ to lunch.',
    blankAnswers: ['us'],
    options: ['us', 'we', 'our', 'they'],
    answer: 'us',
    answerTranslation: L(
      '그녀는 우리를 점심 식사에 초대했어요.',
      'U bizni tushlikka taklif qildi.',
      'She invited us to lunch.',
      'Она пригласила нас на обед.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['us', 'object-pronouns'],
  },

  en_s1u8_n3_077_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'She studied ',
    sentenceSuffix: ' at university.',
    answer: 'journalism',
    answerTranslation: L(
      '그녀는 대학에서 저널리즘을 공부했어요.',
      'U universitetda jurnalistikani o‘rgandi.',
      'She studied journalism at university.',
      'Она изучала журналистику в университете.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "journalism".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'journalism'],
  },

  en_s1u8_n3_078_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'newspaper',
      'national',
      'a',
      'works',
      'for',
      'She',
      'journalism',
    ],
    answer: 'She works for a national newspaper',
    audioText: 'She works for a national newspaper.',
    answerTranslation: L(
      '그녀는 전국 신문사에서 일해요.',
      'U milliy gazetada ishlaydi.',
      'She works for a national newspaper.',
      'Она работает в национальной газете.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['newspaper', 'work'],
  },

  en_s1u8_n3_079_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Tell me about this holiday photo.',
    options: [
      'We',
      'were',
      'in',
      'South',
      'Africa',
      'last',
      'year',
      'photographed',
      'monkey',
    ],
    answer: 'We were in South Africa last year',
    answerTranslation: L(
      '우리는 작년에 남아프리카공화국에 있었어요.',
      'Biz o‘tgan yili Janubiy Afrikada edik.',
      'We were in South Africa last year.',
      'В прошлом году мы были в Южной Африке.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['photo-story', 'reply'],
  },

  en_s1u8_n3_080_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'What happened after your holiday?' },
    ],
    options: [
      'A woman from the group invited us to lunch.',
      'A woman invited we to lunch.',
      'A woman invites us last year.',
      'We invited she yesterday.',
    ],
    answer: 'A woman from the group invited us to lunch.',
    answerTranslation: L(
      '그 모임의 한 여성이 우리를 점심 식사에 초대했어요.',
      'Guruhdagi bir ayol bizni tushlikka taklif qildi.',
      'A woman from the group invited us to lunch.',
      'Одна женщина из группы пригласила нас на обед.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['photo-story', 'object-pronouns', 'final'],
  },
};

export const EN_S1_UNIT8_NODE3 = {
  title: L(
    '특별한 순간들',
    'Maxsus lahzalar',
    'Special moments',
    'Особенные моменты',
  ),
  section: 1,
  unit: 8,
  order: 3,
  isActive: true,

  lessons: [
    {
      title: L(
        '사진 속 이야기',
        'Suratdagi hikoyalar',
        'Photo stories',
        'Истории фотографий',
      ),
      description: L(
        '여행 사진에 얽힌 이야기를 통해 사진, 대회, 상과 사람을 가리키는 목적격 대명사를 익혀요.',
        'Sayohat suratlari haqidagi hikoyalar orqali fotosurat, tanlov, mukofot va obyekt olmoshlarini o‘rganasiz.',
        'Learn photo-story vocabulary and use object pronouns to refer to people and things.',
        'Изучаем лексику о фотографиях и используем объектные местоимения для людей и предметов.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 1,
      questions: [
        'en_s1u8_n3_001_speaking',
        'en_s1u8_n3_002_image_choice',
        'en_s1u8_n3_003_word_matching',
        'en_s1u8_n3_004_translate_builder',
        'en_s1u8_n3_005_word_arrange',
        'en_s1u8_n3_006_audio_match',
        'en_s1u8_n3_007_type_answer',
        'en_s1u8_n3_008_image_choice',
        'en_s1u8_n3_009_sentence_builder',
        'en_s1u8_n3_010_reply_builder',
        'en_s1u8_n3_011_type_answer',
        'en_s1u8_n3_012_word_matching',
        'en_s1u8_n3_013_translate_builder',
        'en_s1u8_n3_014_audio_match',
        'en_s1u8_n3_015_image_choice',
        'en_s1u8_n3_016_fill_in_blank',
        'en_s1u8_n3_017_type_answer',
        'en_s1u8_n3_018_word_arrange',
        'en_s1u8_n3_019_reply_builder',
        'en_s1u8_n3_020_dialog_complete',
      ],
    },

    {
      title: L(
        '목적격 대명사',
        'Obyekt olmoshlari',
        'Object pronouns',
        'Объектные местоимения',
      ),
      description: L(
        'me, you, him, her, it, us, them을 동사나 전치사 뒤에서 사용하는 방법을 연습해요.',
        'Me, you, him, her, it, us va them ni fe’l yoki predlogdan keyin ishlatishni mashq qilasiz.',
        'Practise using me, you, him, her, it, us and them after verbs and prepositions.',
        'Практикуем me, you, him, her, it, us и them после глаголов и предлогов.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 2,
      questions: [
        'en_s1u8_n3_021_speaking',
        'en_s1u8_n3_022_image_choice',
        'en_s1u8_n3_023_word_matching',
        'en_s1u8_n3_024_translate_builder',
        'en_s1u8_n3_025_word_arrange',
        'en_s1u8_n3_026_audio_match',
        'en_s1u8_n3_027_type_answer',
        'en_s1u8_n3_028_image_choice',
        'en_s1u8_n3_029_sentence_builder',
        'en_s1u8_n3_030_reply_builder',
        'en_s1u8_n3_031_type_answer',
        'en_s1u8_n3_032_word_matching',
        'en_s1u8_n3_033_translate_builder',
        'en_s1u8_n3_034_audio_match',
        'en_s1u8_n3_035_image_choice',
        'en_s1u8_n3_036_fill_in_blank',
        'en_s1u8_n3_037_type_answer',
        'en_s1u8_n3_038_word_arrange',
        'en_s1u8_n3_039_reply_builder',
        'en_s1u8_n3_040_dialog_complete',
      ],
    },

    {
      title: L(
        '과거 시간 표현',
        'O‘tgan zamon vaqt ifodalari',
        'Past time expressions',
        'Выражения прошедшего времени',
      ),
      description: L(
        'last year, last week, yesterday, in 2012, on Monday 같은 표현으로 과거 사건의 시점을 말해요.',
        'Last year, last week, yesterday, in 2012 va on Monday kabi ifodalar bilan o‘tgan voqealarning vaqtini aytasiz.',
        'Use expressions such as last year, yesterday, in 2012 and on Monday to say when past events happened.',
        'Используем last year, yesterday, in 2012 и on Monday, чтобы говорить о времени событий в прошлом.',
      ),
      category: LessonCategory.EXPRESSION,
      level: LV,
      order: 3,
      questions: [
        'en_s1u8_n3_041_speaking',
        'en_s1u8_n3_042_image_choice',
        'en_s1u8_n3_043_word_matching',
        'en_s1u8_n3_044_translate_builder',
        'en_s1u8_n3_045_word_arrange',
        'en_s1u8_n3_046_audio_match',
        'en_s1u8_n3_047_type_answer',
        'en_s1u8_n3_048_image_choice',
        'en_s1u8_n3_049_sentence_builder',
        'en_s1u8_n3_050_reply_builder',
        'en_s1u8_n3_051_type_answer',
        'en_s1u8_n3_052_word_matching',
        'en_s1u8_n3_053_translate_builder',
        'en_s1u8_n3_054_audio_match',
        'en_s1u8_n3_055_image_choice',
        'en_s1u8_n3_056_fill_in_blank',
        'en_s1u8_n3_057_type_answer',
        'en_s1u8_n3_058_word_arrange',
        'en_s1u8_n3_059_reply_builder',
        'en_s1u8_n3_060_dialog_complete',
      ],
    },

    {
      title: L(
        '사진 이야기 말하기',
        'Surat haqida hikoya qilish',
        'Tell a photo story',
        'Рассказываем историю фотографии',
      ),
      description: L(
        '목적격 대명사와 과거 시간 표현을 함께 사용해 여행이나 특별한 사진에 얽힌 이야기를 자연스럽게 말해요.',
        'Obyekt olmoshlari va o‘tgan zamon vaqt ifodalaridan foydalanib, sayohat yoki maxsus surat haqida hikoya qilasiz.',
        'Combine object pronouns and past-time expressions to tell a natural story about a holiday or special photo.',
        'Соединяем объектные местоимения и выражения времени, чтобы рассказать историю фотографии.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 4,
      questions: [
        'en_s1u8_n3_061_speaking',
        'en_s1u8_n3_062_image_choice',
        'en_s1u8_n3_063_word_matching',
        'en_s1u8_n3_064_translate_builder',
        'en_s1u8_n3_065_word_arrange',
        'en_s1u8_n3_066_audio_match',
        'en_s1u8_n3_067_type_answer',
        'en_s1u8_n3_068_image_choice',
        'en_s1u8_n3_069_sentence_builder',
        'en_s1u8_n3_070_reply_builder',
        'en_s1u8_n3_071_type_answer',
        'en_s1u8_n3_072_word_matching',
        'en_s1u8_n3_073_translate_builder',
        'en_s1u8_n3_074_audio_match',
        'en_s1u8_n3_075_image_choice',
        'en_s1u8_n3_076_fill_in_blank',
        'en_s1u8_n3_077_type_answer',
        'en_s1u8_n3_078_word_arrange',
        'en_s1u8_n3_079_reply_builder',
        'en_s1u8_n3_080_dialog_complete',
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Section 1 · Unit 8 · Node 4
// 8.4 Speaking and writing
//
// Coverage
// - Congratulations!
// - Good luck!
// - Happy birthday!
// - Cheers!
// - That's great!
// - Really?
// - Never mind.
// - I'm sorry to hear that.
// - good / bad / surprising news
// - biography
// - then / after that
// - ordering past events
// - Um Ahmad
// - Ayrton Senna
//
// IMPORTANT:
// *_WORDS에는 무조건 단어만 등록.
// "good luck", "happy birthday", "never mind",
// "tour guide", "after that" 같은 구는 등록 금지.
//
// Reused:
// birthday / job / exam / hospital / lunch / dog
// good / great / sad / easy / happy
// remember / study / work / move / marry / die
// family / school / shop / house
// plane / drive / world / accident
//
// 4 lessons × 20 questions = 80
// type_answer: 3 per lesson
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT8_NODE4_WORDS = [
  {
    code: 'en-noun-congratulations',
    english: 'congratulations',
    senseKey: 'words-praising-success-or-good-news',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '축하',
      'tabrik',
      'words used to show that you are happy about someone’s success',
      'поздравление',
    ),
    examples: [
      {
        english: 'Congratulations on your new job!',
        translations: L(
          '새 직장을 구한 것을 축하해요!',
          'Yangi ishingiz bilan tabriklayman!',
          'Congratulations on your new job!',
          'Поздравляю с новой работой!',
        ),
      },
    ],
    pronunciation: {
      ipa: '/kənˌɡrætʃəˈleɪʃənz/',
      ttsText: 'congratulations',
    },
    media: {
      emoji: '🎉',
      imageUrl: '',
      imageAlt: L(
        '축하하는 모습',
        'tabriklash',
        'a celebration',
        'поздравление',
      ),
    },
    tags: ['special-occasions', 'expressions'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-luck',
    english: 'luck',
    senseKey: 'success-caused-by-chance',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('행운', 'omad', 'success that happens by chance', 'удача'),
    examples: [
      {
        english: 'Good luck with your exam!',
        translations: L(
          '시험 잘 보세요!',
          'Imtihoningizga omad!',
          'Good luck with your exam!',
          'Удачи на экзамене!',
        ),
      },
    ],
    pronunciation: {
      ipa: '/lʌk/',
      ttsText: 'luck',
    },
    media: {
      emoji: '🍀',
      imageUrl: '',
      imageAlt: L(
        '행운의 상징',
        'omad ramzi',
        'a symbol of luck',
        'символ удачи',
      ),
    },
    tags: ['special-occasions'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-cheers',
    english: 'cheers',
    senseKey: 'word-used-for-toast',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '건배',
      'sog‘ bo‘ling',
      'a word used when people raise drinks together',
      'за здоровье; ура',
    ),
    examples: [
      {
        english: 'Cheers!',
        translations: L('건배!', 'Sog‘ bo‘ling!', 'Cheers!', 'За здоровье!'),
      },
    ],
    pronunciation: {
      ipa: '/tʃɪəz/',
      ttsText: 'cheers',
    },
    media: {
      emoji: '🥂',
      imageUrl: '',
      imageAlt: L('건배하는 잔', 'qadah ko‘tarish', 'a toast', 'тост'),
    },
    tags: ['special-occasions'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-occasion',
    english: 'occasion',
    senseKey: 'special-event-or-time',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '행사; 특별한 때',
      'tadbir',
      'a particular or special event or time',
      'случай; событие',
    ),
    examples: [
      {
        english: 'It was a special occasion.',
        translations: L(
          '특별한 날이었어요.',
          'Bu maxsus tadbir edi.',
          'It was a special occasion.',
          'Это был особый случай.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/əˈkeɪʒən/',
      ttsText: 'occasion',
    },
    media: {
      emoji: '🎊',
      imageUrl: '',
      imageAlt: L(
        '특별한 행사',
        'maxsus tadbir',
        'a special occasion',
        'особое событие',
      ),
    },
    tags: ['events', 'special-occasions'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-biography',
    english: 'biography',
    senseKey: 'story-of-person-life',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '전기; 일대기',
      'biografiya',
      'the story of a person’s life',
      'биография',
    ),
    examples: [
      {
        english: 'I wrote a biography of my grandmother.',
        translations: L(
          '저는 할머니의 일대기를 썼어요.',
          'Men buvimning biografiyasini yozdim.',
          'I wrote a biography of my grandmother.',
          'Я написал биографию своей бабушки.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/baɪˈɒɡrəfi/',
      ttsText: 'biography',
    },
    media: {
      emoji: '📖',
      imageUrl: '',
      imageAlt: L(
        '인물의 일대기',
        'inson biografiyasi',
        'a biography',
        'биография',
      ),
    },
    tags: ['writing', 'past-life'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-job-pilot',
    english: 'pilot',
    senseKey: 'person-who-flies-aircraft',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('조종사', 'uchuvchi', 'a person who flies an aircraft', 'пилот'),
    examples: [
      {
        english: 'She was a pilot.',
        translations: L(
          '그녀는 조종사였어요.',
          'U uchuvchi edi.',
          'She was a pilot.',
          'Она была пилотом.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈpaɪlət/',
      ttsText: 'pilot',
    },
    media: {
      emoji: '👩‍✈️',
      imageUrl: '',
      imageAlt: L('비행기 조종사', 'uchuvchi', 'a pilot', 'пилот'),
    },
    tags: ['jobs', 'travel'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-person-passenger',
    english: 'passenger',
    senseKey: 'person-travelling-in-vehicle',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '승객',
      'yo‘lovchi',
      'a person travelling in a vehicle but not driving it',
      'пассажир',
    ),
    examples: [
      {
        english: 'She crossed the Atlantic as a passenger.',
        translations: L(
          '그녀는 승객으로 대서양을 건넜어요.',
          'U Atlantika okeanini yo‘lovchi sifatida kesib o‘tdi.',
          'She crossed the Atlantic as a passenger.',
          'Она пересекла Атлантику как пассажир.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈpæsɪndʒə/',
      ttsText: 'passenger',
    },
    media: {
      emoji: '💺',
      imageUrl: '',
      imageAlt: L('승객', 'yo‘lovchi', 'a passenger', 'пассажир'),
    },
    tags: ['travel', 'people'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-career',
    english: 'career',
    senseKey: 'working-life-in-profession',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '경력; 직업 생활',
      'karyera',
      'the jobs and work a person does during their working life',
      'карьера',
    ),
    examples: [
      {
        english: 'He had a great career in Formula 1.',
        translations: L(
          '그는 포뮬러 1에서 훌륭한 경력을 쌓았어요.',
          'U Formula 1 da ajoyib karyeraga ega edi.',
          'He had a great career in Formula 1.',
          'У него была отличная карьера в Формуле-1.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/kəˈrɪə/',
      ttsText: 'career',
    },
    media: {
      emoji: '💼',
      imageUrl: '',
      imageAlt: L('직업 경력', 'karyera', 'a career', 'карьера'),
    },
    tags: ['jobs', 'biography'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-champion',
    english: 'champion',
    senseKey: 'winner-of-important-competition',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '우승자; 챔피언',
      'chempion',
      'a person who wins an important competition',
      'чемпион',
    ),
    examples: [
      {
        english: 'He was world champion three times.',
        translations: L(
          '그는 세계 챔피언을 세 번 했어요.',
          'U uch marta jahon chempioni bo‘lgan.',
          'He was world champion three times.',
          'Он трижды был чемпионом мира.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈtʃæmpiən/',
      ttsText: 'champion',
    },
    media: {
      emoji: '🏆',
      imageUrl: '',
      imageAlt: L('우승자', 'chempion', 'a champion', 'чемпион'),
    },
    tags: ['sport', 'biography'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-race',
    english: 'race',
    senseKey: 'competition-to-see-who-is-fastest',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '경주',
      'poyga',
      'a competition to see who can move the fastest',
      'гонка',
    ),
    examples: [
      {
        english: 'He had his first race at thirteen.',
        translations: L(
          '그는 열세 살 때 첫 경주를 했어요.',
          'U o‘n uch yoshida birinchi poygasida qatnashgan.',
          'He had his first race at thirteen.',
          'В тринадцать лет он участвовал в своей первой гонке.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/reɪs/',
      ttsText: 'race',
    },
    media: {
      emoji: '🏎️',
      imageUrl: '',
      imageAlt: L('자동차 경주', 'avtomobil poygasi', 'a race', 'гонка'),
    },
    tags: ['sport', 'cars'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-disappear',
    english: 'disappear',
    senseKey: 'become-impossible-to-see-or-find',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '사라지다',
      'g‘oyib bo‘lmoq',
      'to become impossible to see or find',
      'исчезать',
    ),
    examples: [
      {
        english: 'Her plane disappeared in 1937.',
        translations: L(
          '그녀의 비행기는 1937년에 사라졌어요.',
          'Uning samolyoti 1937-yilda g‘oyib bo‘lgan.',
          'Her plane disappeared in 1937.',
          'Её самолёт исчез в 1937 году.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌdɪsəˈpɪə/',
      ttsText: 'disappear',
    },
    media: {
      emoji: '❓',
      imageUrl: '',
      imageAlt: L(
        '사라진 비행기',
        'g‘oyib bo‘lgan samolyot',
        'a missing plane',
        'исчезнувший самолёт',
      ),
    },
    tags: ['biography', 'verbs'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-female',
    english: 'female',
    senseKey: 'woman-or-girl-sex',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('여성의', 'ayol', 'relating to women or girls', 'женский'),
    examples: [
      {
        english: 'She was a famous female pilot.',
        translations: L(
          '그녀는 유명한 여성 조종사였어요.',
          'U mashhur ayol uchuvchi edi.',
          'She was a famous female pilot.',
          'Она была известной женщиной-пилотом.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈfiːmeɪl/',
      ttsText: 'female',
    },
    media: {
      emoji: '👩',
      imageUrl: '',
      imageAlt: L('여성', 'ayol', 'a woman', 'женщина'),
    },
    tags: ['people', 'biography'],
    difficulty: 1,
    isCore: true,
  },
];

export const EN_S1_UNIT8_NODE4_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Special occasions
  // ===========================================================

  en_s1u8_n4_001_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Congratulations!',
    audioText: 'Congratulations!',
    answerTranslation: L(
      '축하해요!',
      'Tabriklayman!',
      'Congratulations!',
      'Поздравляю!',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['special-occasions', 'congratulations'],
  },

  en_s1u8_n4_002_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'luck',
    choices: [
      { text: 'cheers', label: '🥂', emoji: '🥂', imageUrl: '' },
      { text: 'luck', label: '🍀', emoji: '🍀', imageUrl: '' },
      { text: 'career', label: '💼', emoji: '💼', imageUrl: '' },
      { text: 'race', label: '🏎️', emoji: '🏎️', imageUrl: '' },
    ],
    answerTranslation: L('행운', 'omad', 'luck', 'удача'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['luck'],
  },

  en_s1u8_n4_003_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'congratulations',
        native: 'tabrik',
        nativeI18n: L('축하', 'tabrik', 'congratulations', 'поздравление'),
      },
      {
        text: 'luck',
        native: 'omad',
        nativeI18n: L('행운', 'omad', 'luck', 'удача'),
      },
      {
        text: 'cheers',
        native: 'sog‘ bo‘ling',
        nativeI18n: L('건배', 'sog‘ bo‘ling', 'cheers', 'за здоровье'),
      },
      {
        text: 'occasion',
        native: 'tadbir',
        nativeI18n: L('행사', 'tadbir', 'occasion', 'событие'),
      },
      {
        text: 'biography',
        native: 'biografiya',
        nativeI18n: L('일대기', 'biografiya', 'biography', 'биография'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['special-occasions', 'matching'],
  },

  en_s1u8_n4_004_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['Good', 'luck', 'with', 'your', 'exam', 'birthday', 'Cheers'],
    answer: 'Good luck with your exam',
    answerTranslation: L(
      '시험 잘 보세요.',
      'Imtihoningizga omad.',
      'Good luck with your exam.',
      'Удачи на экзамене.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['good-luck', 'exam'],
  },

  en_s1u8_n4_005_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['birthday', 'Happy', 'Congratulations', 'luck', 'Good'],
    answer: 'Happy birthday',
    audioText: 'Happy birthday!',
    answerTranslation: L(
      '생일 축하해요!',
      'Tug‘ilgan kuningiz bilan!',
      'Happy birthday!',
      'С днём рождения!',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['birthday', 'special-occasions'],
  },

  en_s1u8_n4_006_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'congratulations',
        native: 'tabrik',
        nativeI18n: L('축하', 'tabrik', 'congratulations', 'поздравление'),
      },
      {
        text: 'luck',
        native: 'omad',
        nativeI18n: L('행운', 'omad', 'luck', 'удача'),
      },
      {
        text: 'cheers',
        native: 'sog‘ bo‘ling',
        nativeI18n: L('건배', 'sog‘ bo‘ling', 'cheers', 'за здоровье'),
      },
      {
        text: 'occasion',
        native: 'tadbir',
        nativeI18n: L('행사', 'tadbir', 'occasion', 'событие'),
      },
      {
        text: 'biography',
        native: 'biografiya',
        nativeI18n: L('일대기', 'biografiya', 'biography', 'биография'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['special-occasions', 'listening'],
  },

  en_s1u8_n4_007_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Good ',
    sentenceSuffix: ' with your exam!',
    answer: 'luck',
    answerTranslation: L(
      '시험 잘 보세요!',
      'Imtihoningizga omad!',
      'Good luck with your exam!',
      'Удачи на экзамене!',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "luck".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'luck'],
  },

  en_s1u8_n4_008_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'cheers',
    choices: [
      { text: 'luck', label: '🍀', emoji: '🍀', imageUrl: '' },
      { text: 'champion', label: '🏆', emoji: '🏆', imageUrl: '' },
      { text: 'cheers', label: '🥂', emoji: '🥂', imageUrl: '' },
      { text: 'pilot', label: '👩‍✈️', emoji: '👩‍✈️', imageUrl: '' },
    ],
    answerTranslation: L('건배', 'sog‘ bo‘ling', 'cheers', 'за здоровье'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['cheers'],
  },

  en_s1u8_n4_009_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'I have got a new job. Congratulations!',
    audioText: 'I have got a new job. Congratulations!',
    answerI18n: L(
      '새 직장을 구했어요 축하해요',
      'Men yangi ish topdim Tabriklayman',
      'I have got a new job Congratulations',
      'У меня новая работа Поздравляю',
    ),
    options: [
      'I',
      'have',
      'got',
      'a',
      'new',
      'job',
      'Congratulations',
      'birthday',
    ],
    optionsI18n: {
      ko: ['새', '직장을', '구했어요', '축하해요'],
      uz: ['Men', 'yangi', 'ish', 'topdim', 'Tabriklayman'],
      en: ['I', 'have', 'got', 'a', 'new', 'job', 'Congratulations'],
      ru: ['У', 'меня', 'новая', 'работа', 'Поздравляю'],
    },
    answerTranslation: L(
      '새 직장을 구했어요. 축하해요!',
      'Men yangi ish topdim. Tabriklayman!',
      'I have got a new job. Congratulations!',
      'У меня новая работа. Поздравляю!',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['congratulations', 'job'],
  },

  en_s1u8_n4_010_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'I’ve got a new job!',
    options: ['That', 'is', 'great', 'Good', 'luck', 'Never', 'mind'],
    answer: 'That is great',
    answerTranslation: L(
      '정말 잘됐네요!',
      'Bu ajoyib!',
      'That’s great!',
      'Это здорово!',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['good-news', 'reply'],
  },

  en_s1u8_n4_011_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I’ve got a new job. ',
    sentenceSuffix: '!',
    answer: 'Congratulations',
    answerTranslation: L(
      '새 직장을 구했어요. 축하해요!',
      'Men yangi ish topdim. Tabriklayman!',
      'I’ve got a new job. Congratulations!',
      'У меня новая работа. Поздравляю!',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "Congratulations".',
      acceptedAnswers: ['congratulations'],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'congratulations'],
  },

  en_s1u8_n4_012_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'pilot',
        native: 'uchuvchi',
        nativeI18n: L('조종사', 'uchuvchi', 'pilot', 'пилот'),
      },
      {
        text: 'passenger',
        native: 'yo‘lovchi',
        nativeI18n: L('승객', 'yo‘lovchi', 'passenger', 'пассажир'),
      },
      {
        text: 'career',
        native: 'karyera',
        nativeI18n: L('경력', 'karyera', 'career', 'карьера'),
      },
      {
        text: 'champion',
        native: 'chempion',
        nativeI18n: L('챔피언', 'chempion', 'champion', 'чемпион'),
      },
      {
        text: 'race',
        native: 'poyga',
        nativeI18n: L('경주', 'poyga', 'race', 'гонка'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['biography', 'matching'],
  },

  en_s1u8_n4_013_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'to',
      'Happy',
      'birthday',
      'you',
      'Cheers',
      'Congratulations',
      'luck',
    ],
    answer: 'Happy birthday to you',
    answerTranslation: L(
      '생일 축하해요.',
      'Tug‘ilgan kuningiz bilan.',
      'Happy birthday to you.',
      'С днём рождения.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['birthday'],
  },

  en_s1u8_n4_014_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'pilot',
        native: 'uchuvchi',
        nativeI18n: L('조종사', 'uchuvchi', 'pilot', 'пилот'),
      },
      {
        text: 'passenger',
        native: 'yo‘lovchi',
        nativeI18n: L('승객', 'yo‘lovchi', 'passenger', 'пассажир'),
      },
      {
        text: 'career',
        native: 'karyera',
        nativeI18n: L('경력', 'karyera', 'career', 'карьера'),
      },
      {
        text: 'champion',
        native: 'chempion',
        nativeI18n: L('챔피언', 'chempion', 'champion', 'чемпион'),
      },
      {
        text: 'race',
        native: 'poyga',
        nativeI18n: L('경주', 'poyga', 'race', 'гонка'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['biography', 'listening'],
  },

  en_s1u8_n4_015_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'congratulations',
    choices: [
      { text: 'luck', label: '🍀', emoji: '🍀', imageUrl: '' },
      { text: 'cheers', label: '🥂', emoji: '🥂', imageUrl: '' },
      { text: 'congratulations', label: '🎉', emoji: '🎉', imageUrl: '' },
      { text: 'race', label: '🏎️', emoji: '🏎️', imageUrl: '' },
    ],
    answerTranslation: L('축하', 'tabrik', 'congratulations', 'поздравление'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['congratulations'],
  },

  en_s1u8_n4_016_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I’ve got an exam tomorrow. Good ___!',
    blankAnswers: ['luck'],
    options: ['luck', 'birthday', 'cheers', 'great'],
    answer: 'luck',
    answerTranslation: L(
      '내일 시험이 있어요. 행운을 빌어요!',
      'Ertaga imtihonim bor. Omad!',
      'I’ve got an exam tomorrow. Good luck!',
      'У меня завтра экзамен. Удачи!',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['luck', 'special-occasions'],
  },

  en_s1u8_n4_017_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Here’s to Keegan and Angie! ',
    sentenceSuffix: '!',
    answer: 'Cheers',
    answerTranslation: L(
      '키건과 앤지를 위하여! 건배!',
      'Kigan va Enji uchun! Sog‘ bo‘ling!',
      'Here’s to Keegan and Angie! Cheers!',
      'За Кигана и Энджи! За здоровье!',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "Cheers".',
      acceptedAnswers: ['cheers'],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'cheers'],
  },

  en_s1u8_n4_018_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'job',
      'new',
      'your',
      'on',
      'Congratulations',
      'luck',
      'birthday',
    ],
    answer: 'Congratulations on your new job',
    audioText: 'Congratulations on your new job!',
    answerTranslation: L(
      '새 직장을 구한 것을 축하해요!',
      'Yangi ishingiz bilan tabriklayman!',
      'Congratulations on your new job!',
      'Поздравляю с новой работой!',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['congratulations', 'job'],
  },

  en_s1u8_n4_019_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'I’m twenty-one today!',
    options: ['Happy', 'birthday', 'Good', 'luck', 'Never', 'mind', 'Cheers'],
    answer: 'Happy birthday',
    answerTranslation: L(
      '생일 축하해요!',
      'Tug‘ilgan kuningiz bilan!',
      'Happy birthday!',
      'С днём рождения!',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['birthday', 'reply'],
  },

  en_s1u8_n4_020_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Here’s to Keegan and Angie!' }],
    options: [
      'Cheers!',
      'Good luck!',
      'Never mind.',
      'I’m sorry to hear that.',
    ],
    answer: 'Cheers!',
    answerTranslation: L('건배!', 'Sog‘ bo‘ling!', 'Cheers!', 'За здоровье!'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['cheers', 'dialog'],
  },

  // ===========================================================
  // Lesson 2 · Show interest
  // ===========================================================

  en_s1u8_n4_021_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'That’s great!',
    audioText: 'That’s great!',
    answerTranslation: L(
      '정말 잘됐네요!',
      'Bu ajoyib!',
      'That’s great!',
      'Это здорово!',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['good-news', 'interest'],
  },

  en_s1u8_n4_022_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'champion',
    choices: [
      { text: 'passenger', label: '💺', emoji: '💺', imageUrl: '' },
      { text: 'career', label: '💼', emoji: '💼', imageUrl: '' },
      { text: 'champion', label: '🏆', emoji: '🏆', imageUrl: '' },
      { text: 'race', label: '🏎️', emoji: '🏎️', imageUrl: '' },
    ],
    answerTranslation: L('챔피언', 'chempion', 'champion', 'чемпион'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['champion'],
  },

  en_s1u8_n4_023_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'pilot',
        native: 'uchuvchi',
        nativeI18n: L('조종사', 'uchuvchi', 'pilot', 'пилот'),
      },
      {
        text: 'passenger',
        native: 'yo‘lovchi',
        nativeI18n: L('승객', 'yo‘lovchi', 'passenger', 'пассажир'),
      },
      {
        text: 'career',
        native: 'karyera',
        nativeI18n: L('경력', 'karyera', 'career', 'карьера'),
      },
      {
        text: 'champion',
        native: 'chempion',
        nativeI18n: L('챔피언', 'chempion', 'champion', 'чемпион'),
      },
      {
        text: 'female',
        native: 'ayol',
        nativeI18n: L('여성의', 'ayol', 'female', 'женский'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['people', 'matching'],
  },

  en_s1u8_n4_024_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['hear', 'that', 'sorry', 'I', 'am', 'to', 'great', 'Really'],
    answer: 'I am sorry to hear that',
    answerTranslation: L(
      '그 말을 들으니 안타깝네요.',
      'Buni eshitganimdan afsusdaman.',
      'I’m sorry to hear that.',
      'Мне жаль это слышать.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['bad-news', 'response'],
  },

  en_s1u8_n4_025_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['mind', 'Never', 'great', 'Really', 'sorry'],
    answer: 'Never mind',
    audioText: 'Never mind.',
    answerTranslation: L(
      '괜찮아요.',
      'Hechqisi yo‘q.',
      'Never mind.',
      'Ничего страшного.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['response', 'bad-news'],
  },

  en_s1u8_n4_026_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'pilot',
        native: 'uchuvchi',
        nativeI18n: L('조종사', 'uchuvchi', 'pilot', 'пилот'),
      },
      {
        text: 'passenger',
        native: 'yo‘lovchi',
        nativeI18n: L('승객', 'yo‘lovchi', 'passenger', 'пассажир'),
      },
      {
        text: 'career',
        native: 'karyera',
        nativeI18n: L('경력', 'karyera', 'career', 'карьера'),
      },
      {
        text: 'champion',
        native: 'chempion',
        nativeI18n: L('챔피언', 'chempion', 'champion', 'чемпион'),
      },
      {
        text: 'female',
        native: 'ayol',
        nativeI18n: L('여성의', 'ayol', 'female', 'женский'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['people', 'listening'],
  },

  en_s1u8_n4_027_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I’ve got a new job. That’s ',
    sentenceSuffix: '!',
    answer: 'great',
    answerTranslation: L(
      '새 직장을 구했어요. 정말 잘됐네요!',
      'Men yangi ish topdim. Bu ajoyib!',
      'I’ve got a new job. That’s great!',
      'У меня новая работа. Это здорово!',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "great".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['typing', 'good-news'],
  },

  en_s1u8_n4_028_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'passenger',
    choices: [
      { text: 'pilot', label: '👩‍✈️', emoji: '👩‍✈️', imageUrl: '' },
      { text: 'race', label: '🏎️', emoji: '🏎️', imageUrl: '' },
      { text: 'passenger', label: '💺', emoji: '💺', imageUrl: '' },
      { text: 'champion', label: '🏆', emoji: '🏆', imageUrl: '' },
    ],
    answerTranslation: L('승객', 'yo‘lovchi', 'passenger', 'пассажир'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['passenger'],
  },

  en_s1u8_n4_029_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'I studied a lot and the exam was really easy.',
    audioText: 'I studied a lot and the exam was really easy.',
    answerI18n: L(
      '저는 공부를 많이 했고 시험은 정말 쉬웠어요',
      'Men ko‘p o‘qidim va imtihon juda oson edi',
      'I studied a lot and the exam was really easy',
      'Я много учился, и экзамен был очень лёгким',
    ),
    options: [
      'I',
      'studied',
      'a',
      'lot',
      'and',
      'the',
      'exam',
      'was',
      'really',
      'easy',
      'bad',
    ],
    optionsI18n: {
      ko: ['저는', '공부를', '많이', '했고', '시험은', '정말', '쉬웠어요'],
      uz: ['Men', 'ko‘p', 'o‘qidim', 'va', 'imtihon', 'juda', 'oson', 'edi'],
      en: [
        'I',
        'studied',
        'a',
        'lot',
        'and',
        'the',
        'exam',
        'was',
        'really',
        'easy',
      ],
      ru: ['Я', 'много', 'учился', 'и', 'экзамен', 'был', 'очень', 'лёгким'],
    },
    answerTranslation: L(
      '저는 공부를 많이 했고 시험은 정말 쉬웠어요.',
      'Men ko‘p o‘qidim va imtihon juda oson edi.',
      'I studied a lot and the exam was really easy.',
      'Я много учился, и экзамен был очень лёгким.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['good-news', 'past-simple'],
  },

  en_s1u8_n4_030_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'My dog died last week.',
    options: ['I', 'am', 'sorry', 'to', 'hear', 'that', 'great', 'Really'],
    answer: 'I am sorry to hear that',
    answerTranslation: L(
      '그 말을 들으니 안타깝네요.',
      'Buni eshitganimdan afsusdaman.',
      'I’m sorry to hear that.',
      'Мне жаль это слышать.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['bad-news', 'reply'],
  },

  en_s1u8_n4_031_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I’m ',
    sentenceSuffix: ' to hear that.',
    answer: 'sorry',
    answerTranslation: L(
      '그 말을 들으니 안타깝네요.',
      'Buni eshitganimdan afsusdaman.',
      'I’m sorry to hear that.',
      'Мне жаль это слышать.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "sorry".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['typing', 'bad-news'],
  },

  en_s1u8_n4_032_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'congratulations',
        native: 'tabrik',
        nativeI18n: L('축하', 'tabrik', 'congratulations', 'поздравление'),
      },
      {
        text: 'luck',
        native: 'omad',
        nativeI18n: L('행운', 'omad', 'luck', 'удача'),
      },
      {
        text: 'cheers',
        native: 'sog‘ bo‘ling',
        nativeI18n: L('건배', 'sog‘ bo‘ling', 'cheers', 'за здоровье'),
      },
      {
        text: 'occasion',
        native: 'tadbir',
        nativeI18n: L('행사', 'tadbir', 'occasion', 'событие'),
      },
      {
        text: 'biography',
        native: 'biografiya',
        nativeI18n: L('일대기', 'biografiya', 'biography', 'биография'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['special-occasions', 'matching'],
  },

  en_s1u8_n4_033_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['Really', 'That', 'is', 'great', 'sorry', 'mind', 'Never'],
    answer: 'Really That is great',
    answerTranslation: L(
      '정말요? 정말 잘됐네요!',
      'Rostdanmi? Bu ajoyib!',
      'Really? That’s great!',
      'Правда? Это здорово!',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['good-news', 'interest'],
  },

  en_s1u8_n4_034_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'congratulations',
        native: 'tabrik',
        nativeI18n: L('축하', 'tabrik', 'congratulations', 'поздравление'),
      },
      {
        text: 'luck',
        native: 'omad',
        nativeI18n: L('행운', 'omad', 'luck', 'удача'),
      },
      {
        text: 'cheers',
        native: 'sog‘ bo‘ling',
        nativeI18n: L('건배', 'sog‘ bo‘ling', 'cheers', 'за здоровье'),
      },
      {
        text: 'occasion',
        native: 'tadbir',
        nativeI18n: L('행사', 'tadbir', 'occasion', 'событие'),
      },
      {
        text: 'biography',
        native: 'biografiya',
        nativeI18n: L('일대기', 'biografiya', 'biography', 'биография'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['special-occasions', 'listening'],
  },

  en_s1u8_n4_035_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'champion',
    choices: [
      { text: 'career', label: '💼', emoji: '💼', imageUrl: '' },
      { text: 'pilot', label: '👩‍✈️', emoji: '👩‍✈️', imageUrl: '' },
      { text: 'champion', label: '🏆', emoji: '🏆', imageUrl: '' },
      { text: 'passenger', label: '💺', emoji: '💺', imageUrl: '' },
    ],
    answerTranslation: L('챔피언', 'chempion', 'champion', 'чемпион'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['champion'],
  },

  en_s1u8_n4_036_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I’ve got a new job. That’s ___!',
    blankAnswers: ['great'],
    options: ['great', 'sorry', 'sad', 'badly'],
    answer: 'great',
    answerTranslation: L(
      '새 직장을 구했어요. 정말 잘됐네요!',
      'Men yangi ish topdim. Bu ajoyib!',
      'I’ve got a new job. That’s great!',
      'У меня новая работа. Это здорово!',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['good-news', 'response'],
  },

  en_s1u8_n4_037_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I watched four films yesterday. ',
    sentenceSuffix: '?',
    answer: 'Really',
    answerTranslation: L(
      '어제 영화 네 편을 봤어요. 정말요?',
      'Men kecha to‘rtta film ko‘rdim. Rostdanmi?',
      'I watched four films yesterday. Really?',
      'Я вчера посмотрел четыре фильма. Правда?',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "Really".',
      acceptedAnswers: ['really'],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['typing', 'surprising-news'],
  },

  en_s1u8_n4_038_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'finish',
      'sorry',
      'I',
      'but',
      'lunch',
      'my',
      'cannot',
      'am',
      'great',
    ],
    answer: 'I am sorry but I cannot finish my lunch',
    audioText: 'I’m sorry, but I can’t finish my lunch.',
    answerTranslation: L(
      '미안하지만 점심을 다 먹을 수 없어요.',
      'Kechirasiz, lekin tushligimni tugata olmayman.',
      'I’m sorry, but I can’t finish my lunch.',
      'Извините, но я не могу доесть обед.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['sorry', 'response'],
  },

  en_s1u8_n4_039_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'I watched four films yesterday.',
    options: ['Really', 'That', 'is', 'great', 'Never', 'mind', 'sorry'],
    answer: 'Really',
    answerTranslation: L('정말요?', 'Rostdanmi?', 'Really?', 'Правда?'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['surprising-news', 'reply'],
  },

  en_s1u8_n4_040_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'My mother’s in hospital.' }],
    options: [
      'I’m sorry to hear that.',
      'Congratulations!',
      'Happy birthday!',
      'Good luck!',
    ],
    answer: 'I’m sorry to hear that.',
    answerTranslation: L(
      '그 말을 들으니 안타깝네요.',
      'Buni eshitganimdan afsusdaman.',
      'I’m sorry to hear that.',
      'Мне жаль это слышать.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['bad-news', 'dialog'],
  },

  // ===========================================================
  // Lesson 3 · Write a biography
  // ===========================================================

  en_s1u8_n4_041_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Then she changed jobs.',
    audioText: 'Then she changed jobs.',
    answerTranslation: L(
      '그다음 그녀는 직업을 바꿨어요.',
      'Keyin u ishini o‘zgartirdi.',
      'Then she changed jobs.',
      'Затем она сменила работу.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['biography', 'sequencers'],
  },

  en_s1u8_n4_042_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'biography',
    choices: [
      { text: 'career', label: '💼', emoji: '💼', imageUrl: '' },
      { text: 'race', label: '🏎️', emoji: '🏎️', imageUrl: '' },
      { text: 'biography', label: '📖', emoji: '📖', imageUrl: '' },
      { text: 'pilot', label: '👩‍✈️', emoji: '👩‍✈️', imageUrl: '' },
    ],
    answerTranslation: L('일대기', 'biografiya', 'biography', 'биография'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['biography'],
  },

  en_s1u8_n4_043_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'biography',
        native: 'biografiya',
        nativeI18n: L('일대기', 'biografiya', 'biography', 'биография'),
      },
      {
        text: 'career',
        native: 'karyera',
        nativeI18n: L('경력', 'karyera', 'career', 'карьера'),
      },
      {
        text: 'pilot',
        native: 'uchuvchi',
        nativeI18n: L('조종사', 'uchuvchi', 'pilot', 'пилот'),
      },
      {
        text: 'passenger',
        native: 'yo‘lovchi',
        nativeI18n: L('승객', 'yo‘lovchi', 'passenger', 'пассажир'),
      },
      {
        text: 'female',
        native: 'ayol',
        nativeI18n: L('여성의', 'ayol', 'female', 'женский'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['biography', 'matching'],
  },

  en_s1u8_n4_044_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['Jordan', '1926', 'born', 'in', 'was', 'She', 'moved', 'married'],
    answer: 'She was born in Jordan in 1926',
    answerTranslation: L(
      '그녀는 1926년에 요르단에서 태어났어요.',
      'U 1926-yilda Iordaniyada tug‘ilgan.',
      'She was born in Jordan in 1926.',
      'Она родилась в Иордании в 1926 году.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['biography', 'born'],
  },

  en_s1u8_n4_045_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['jobs', 'changed', 'she', 'Then', 'married', 'family'],
    answer: 'Then she changed jobs',
    audioText: 'Then she changed jobs.',
    answerTranslation: L(
      '그다음 그녀는 직업을 바꿨어요.',
      'Keyin u ishini o‘zgartirdi.',
      'Then she changed jobs.',
      'Затем она сменила работу.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['sequencers', 'then'],
  },

  en_s1u8_n4_046_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'biography',
        native: 'biografiya',
        nativeI18n: L('일대기', 'biografiya', 'biography', 'биография'),
      },
      {
        text: 'career',
        native: 'karyera',
        nativeI18n: L('경력', 'karyera', 'career', 'карьера'),
      },
      {
        text: 'pilot',
        native: 'uchuvchi',
        nativeI18n: L('조종사', 'uchuvchi', 'pilot', 'пилот'),
      },
      {
        text: 'passenger',
        native: 'yo‘lovchi',
        nativeI18n: L('승객', 'yo‘lovchi', 'passenger', 'пассажир'),
      },
      {
        text: 'female',
        native: 'ayol',
        nativeI18n: L('여성의', 'ayol', 'female', 'женский'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['biography', 'listening'],
  },

  en_s1u8_n4_047_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I wrote a ',
    sentenceSuffix: ' of my grandmother.',
    answer: 'biography',
    answerTranslation: L(
      '저는 할머니의 일대기를 썼어요.',
      'Men buvimning biografiyasini yozdim.',
      'I wrote a biography of my grandmother.',
      'Я написал биографию своей бабушки.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "biography".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'biography'],
  },

  en_s1u8_n4_048_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'career',
    choices: [
      { text: 'pilot', label: '👩‍✈️', emoji: '👩‍✈️', imageUrl: '' },
      { text: 'race', label: '🏎️', emoji: '🏎️', imageUrl: '' },
      { text: 'career', label: '💼', emoji: '💼', imageUrl: '' },
      { text: 'passenger', label: '💺', emoji: '💺', imageUrl: '' },
    ],
    answerTranslation: L('경력', 'karyera', 'career', 'карьера'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['career'],
  },

  en_s1u8_n4_049_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'After that, they moved to Amman and started a family.',
    audioText: 'After that, they moved to Amman and started a family.',
    answerI18n: L(
      '그 후 그들은 암만으로 이사해서 가정을 꾸렸어요',
      'Shundan keyin ular Ammanga ko‘chib, oila qurishdi',
      'After that they moved to Amman and started a family',
      'После этого они переехали в Амман и создали семью',
    ),
    options: [
      'After',
      'that',
      'they',
      'moved',
      'to',
      'Amman',
      'and',
      'started',
      'a',
      'family',
      'married',
    ],
    optionsI18n: {
      ko: ['그', '후', '그들은', '암만으로', '이사해서', '가정을', '꾸렸어요'],
      uz: [
        'Shundan',
        'keyin',
        'ular',
        'Ammanga',
        'ko‘chib',
        'oila',
        'qurishdi',
      ],
      en: [
        'After',
        'that',
        'they',
        'moved',
        'to',
        'Amman',
        'and',
        'started',
        'a',
        'family',
      ],
      ru: [
        'После',
        'этого',
        'они',
        'переехали',
        'в',
        'Амман',
        'и',
        'создали',
        'семью',
      ],
    },
    answerTranslation: L(
      '그 후 그들은 암만으로 이사해서 가정을 꾸렸어요.',
      'Shundan keyin ular Ammanga ko‘chib, oila qurishdi.',
      'After that, they moved to Amman and started a family.',
      'После этого они переехали в Амман и создали семью.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['biography', 'after-that'],
  },

  en_s1u8_n4_050_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What did Um Ahmad do after she finished school?',
    options: [
      'She',
      'started',
      'work',
      'in',
      'her',
      'father',
      'shop',
      'moved',
      'married',
    ],
    answer: 'She started work in her father shop',
    answerTranslation: L(
      '그녀는 아버지의 가게에서 일을 시작했어요.',
      'U otasining do‘konida ishlay boshladi.',
      'She started work in her father’s shop.',
      'Она начала работать в магазине своего отца.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['biography', 'reply'],
  },

  en_s1u8_n4_051_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: '',
    sentenceSuffix: ', she changed jobs.',
    answer: 'Then',
    answerTranslation: L(
      '그다음 그녀는 직업을 바꿨어요.',
      'Keyin u ishini o‘zgartirdi.',
      'Then, she changed jobs.',
      'Затем она сменила работу.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English sequencing word is "Then".',
      acceptedAnswers: ['then'],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['typing', 'sequencers'],
  },

  en_s1u8_n4_052_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'champion',
        native: 'chempion',
        nativeI18n: L('챔피언', 'chempion', 'champion', 'чемпион'),
      },
      {
        text: 'race',
        native: 'poyga',
        nativeI18n: L('경주', 'poyga', 'race', 'гонка'),
      },
      {
        text: 'pilot',
        native: 'uchuvchi',
        nativeI18n: L('조종사', 'uchuvchi', 'pilot', 'пилот'),
      },
      {
        text: 'passenger',
        native: 'yo‘lovchi',
        nativeI18n: L('승객', 'yo‘lovchi', 'passenger', 'пассажир'),
      },
      {
        text: 'disappear',
        native: 'g‘oyib bo‘lmoq',
        nativeI18n: L('사라지다', 'g‘oyib bo‘lmoq', 'disappear', 'исчезать'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['biography', 'matching'],
  },

  en_s1u8_n4_053_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['Abdullah', '1948', 'married', 'in', 'She', 'moved', 'Then'],
    answer: 'She married Abdullah in 1948',
    answerTranslation: L(
      '그녀는 1948년에 압둘라와 결혼했어요.',
      'U 1948-yilda Abdullohga turmushga chiqdi.',
      'She married Abdullah in 1948.',
      'Она вышла замуж за Абдуллу в 1948 году.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['biography', 'past-simple'],
  },

  en_s1u8_n4_054_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'champion',
        native: 'chempion',
        nativeI18n: L('챔피언', 'chempion', 'champion', 'чемпион'),
      },
      {
        text: 'race',
        native: 'poyga',
        nativeI18n: L('경주', 'poyga', 'race', 'гонка'),
      },
      {
        text: 'pilot',
        native: 'uchuvchi',
        nativeI18n: L('조종사', 'uchuvchi', 'pilot', 'пилот'),
      },
      {
        text: 'passenger',
        native: 'yo‘lovchi',
        nativeI18n: L('승객', 'yo‘lovchi', 'passenger', 'пассажир'),
      },
      {
        text: 'disappear',
        native: 'g‘oyib bo‘lmoq',
        nativeI18n: L('사라지다', 'g‘oyib bo‘lmoq', 'disappear', 'исчезать'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['biography', 'listening'],
  },

  en_s1u8_n4_055_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'passenger',
    choices: [
      { text: 'race', label: '🏎️', emoji: '🏎️', imageUrl: '' },
      { text: 'champion', label: '🏆', emoji: '🏆', imageUrl: '' },
      { text: 'passenger', label: '💺', emoji: '💺', imageUrl: '' },
      { text: 'pilot', label: '👩‍✈️', emoji: '👩‍✈️', imageUrl: '' },
    ],
    answerTranslation: L('승객', 'yo‘lovchi', 'passenger', 'пассажир'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['passenger'],
  },

  en_s1u8_n4_056_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ that, they moved to Amman.',
    blankAnswers: ['After'],
    options: ['After', 'Then', 'Before', 'Last'],
    answer: 'After',
    answerTranslation: L(
      '그 후 그들은 암만으로 이사했어요.',
      'Shundan keyin ular Ammanga ko‘chishdi.',
      'After that, they moved to Amman.',
      'После этого они переехали в Амман.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['after-that', 'sequencers'],
  },

  en_s1u8_n4_057_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: '',
    sentenceSuffix: ' that, they moved to Amman.',
    answer: 'After',
    answerTranslation: L(
      '그 후 그들은 암만으로 이사했어요.',
      'Shundan keyin ular Ammanga ko‘chishdi.',
      'After that, they moved to Amman.',
      'После этого они переехали в Амман.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English sequencing word is "After".',
      acceptedAnswers: ['after'],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['typing', 'after-that'],
  },

  en_s1u8_n4_058_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'English',
      'every',
      'practised',
      'She',
      'day',
      'worked',
      'changed',
    ],
    answer: 'She practised English every day',
    audioText: 'She practised English every day.',
    answerTranslation: L(
      '그녀는 매일 영어를 연습했어요.',
      'U har kuni ingliz tilini mashq qildi.',
      'She practised English every day.',
      'Она каждый день практиковала английский.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['biography', 'past-simple'],
  },

  en_s1u8_n4_059_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What was Um Ahmad’s first job?',
    options: [
      'She',
      'worked',
      'as',
      'a',
      'tour',
      'guide',
      'pilot',
      'passenger',
    ],
    answer: 'She worked as a tour guide',
    answerTranslation: L(
      '그녀는 여행 안내원으로 일했어요.',
      'U sayyohlik gid bo‘lib ishladi.',
      'She worked as a tour guide.',
      'Она работала гидом.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['biography', 'reply'],
  },

  en_s1u8_n4_060_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'What happened after she married Abdullah?' },
    ],
    options: [
      'They moved to Amman and started a family.',
      'They move to Amman yesterday.',
      'She was a passenger.',
      'They started a race.',
    ],
    answer: 'They moved to Amman and started a family.',
    answerTranslation: L(
      '그들은 암만으로 이사해서 가정을 꾸렸어요.',
      'Ular Ammanga ko‘chib, oila qurishdi.',
      'They moved to Amman and started a family.',
      'Они переехали в Амман и создали семью.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['biography', 'dialog'],
  },

  // ===========================================================
  // Lesson 4 · Biography review
  // ===========================================================

  en_s1u8_n4_061_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Ayrton Senna was born in Brazil in 1960.',
    audioText: 'Ayrton Senna was born in Brazil in 1960.',
    answerTranslation: L(
      '아이르통 세나는 1960년에 브라질에서 태어났어요.',
      'Ayrton Senna 1960-yilda Braziliyada tug‘ilgan.',
      'Ayrton Senna was born in Brazil in 1960.',
      'Айртон Сенна родился в Бразилии в 1960 году.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['biography', 'senna'],
  },

  en_s1u8_n4_062_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'race',
    choices: [
      { text: 'career', label: '💼', emoji: '💼', imageUrl: '' },
      { text: 'pilot', label: '👩‍✈️', emoji: '👩‍✈️', imageUrl: '' },
      { text: 'race', label: '🏎️', emoji: '🏎️', imageUrl: '' },
      { text: 'passenger', label: '💺', emoji: '💺', imageUrl: '' },
    ],
    answerTranslation: L('경주', 'poyga', 'race', 'гонка'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['race'],
  },

  en_s1u8_n4_063_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'pilot',
        native: 'uchuvchi',
        nativeI18n: L('조종사', 'uchuvchi', 'pilot', 'пилот'),
      },
      {
        text: 'passenger',
        native: 'yo‘lovchi',
        nativeI18n: L('승객', 'yo‘lovchi', 'passenger', 'пассажир'),
      },
      {
        text: 'champion',
        native: 'chempion',
        nativeI18n: L('챔피언', 'chempion', 'champion', 'чемпион'),
      },
      {
        text: 'race',
        native: 'poyga',
        nativeI18n: L('경주', 'poyga', 'race', 'гонка'),
      },
      {
        text: 'career',
        native: 'karyera',
        nativeI18n: L('경력', 'karyera', 'career', 'карьера'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['biography', 'matching'],
  },

  en_s1u8_n4_064_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'seven',
      'drive',
      'when',
      'was',
      'started',
      'He',
      'to',
      'he',
      'race',
    ],
    answer: 'He started to drive when he was seven',
    answerTranslation: L(
      '그는 일곱 살 때 운전을 시작했어요.',
      'U yetti yoshida mashina haydashni boshladi.',
      'He started to drive when he was seven.',
      'Он начал водить машину, когда ему было семь лет.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['biography', 'past-simple'],
  },

  en_s1u8_n4_065_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['1981', 'England', 'moved', 'to', 'he', 'In', 'racing'],
    answer: 'In 1981 he moved to England',
    audioText: 'In 1981, he moved to England.',
    answerTranslation: L(
      '1981년에 그는 영국으로 이사했어요.',
      '1981-yilda u Angliyaga ko‘chdi.',
      'In 1981, he moved to England.',
      'В 1981 году он переехал в Англию.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['biography', 'past-time'],
  },

  en_s1u8_n4_066_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'pilot',
        native: 'uchuvchi',
        nativeI18n: L('조종사', 'uchuvchi', 'pilot', 'пилот'),
      },
      {
        text: 'passenger',
        native: 'yo‘lovchi',
        nativeI18n: L('승객', 'yo‘lovchi', 'passenger', 'пассажир'),
      },
      {
        text: 'champion',
        native: 'chempion',
        nativeI18n: L('챔피언', 'chempion', 'champion', 'чемпион'),
      },
      {
        text: 'race',
        native: 'poyga',
        nativeI18n: L('경주', 'poyga', 'race', 'гонка'),
      },
      {
        text: 'career',
        native: 'karyera',
        nativeI18n: L('경력', 'karyera', 'career', 'карьера'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['biography', 'listening'],
  },

  en_s1u8_n4_067_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'He was world ',
    sentenceSuffix: ' three times.',
    answer: 'champion',
    answerTranslation: L(
      '그는 세계 챔피언을 세 번 했어요.',
      'U uch marta jahon chempioni bo‘lgan.',
      'He was world champion three times.',
      'Он трижды был чемпионом мира.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "champion".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'champion'],
  },

  en_s1u8_n4_068_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'champion',
    choices: [
      { text: 'race', label: '🏎️', emoji: '🏎️', imageUrl: '' },
      { text: 'pilot', label: '👩‍✈️', emoji: '👩‍✈️', imageUrl: '' },
      { text: 'champion', label: '🏆', emoji: '🏆', imageUrl: '' },
      { text: 'career', label: '💼', emoji: '💼', imageUrl: '' },
    ],
    answerTranslation: L('챔피언', 'chempion', 'champion', 'чемпион'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['champion'],
  },

  en_s1u8_n4_069_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'He had a great career in Formula 1.',
    audioText: 'He had a great career in Formula 1.',
    answerI18n: L(
      '그는 포뮬러 1에서 훌륭한 경력을 쌓았어요',
      'U Formula 1 da ajoyib karyeraga ega edi',
      'He had a great career in Formula 1',
      'У него была отличная карьера в Формуле-1',
    ),
    options: [
      'He',
      'had',
      'a',
      'great',
      'career',
      'in',
      'Formula',
      '1',
      'race',
    ],
    optionsI18n: {
      ko: ['그는', '포뮬러', '1에서', '훌륭한', '경력을', '쌓았어요'],
      uz: ['U', 'Formula', '1', 'da', 'ajoyib', 'karyeraga', 'ega', 'edi'],
      en: ['He', 'had', 'a', 'great', 'career', 'in', 'Formula', '1'],
      ru: ['У', 'него', 'была', 'отличная', 'карьера', 'в', 'Формуле-1'],
    },
    answerTranslation: L(
      '그는 포뮬러 1에서 훌륭한 경력을 쌓았어요.',
      'U Formula 1 da ajoyib karyeraga ega edi.',
      'He had a great career in Formula 1.',
      'У него была отличная карьера в Формуле-1.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['career', 'biography'],
  },

  en_s1u8_n4_070_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'When did Ayrton Senna join a Formula 1 team?',
    options: [
      'At',
      'twenty',
      'three',
      'years',
      'old',
      'he',
      'joined',
      'a',
      'Formula',
      '1',
      'team',
      'race',
    ],
    answer: 'At twenty three years old he joined a Formula 1 team',
    answerTranslation: L(
      '스물세 살 때 그는 포뮬러 1 팀에 들어갔어요.',
      'Yigirma uch yoshida u Formula 1 jamoasiga qo‘shildi.',
      'At twenty-three years old, he joined a Formula 1 team.',
      'В двадцать три года он присоединился к команде Формулы-1.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['senna', 'reply'],
  },

  en_s1u8_n4_071_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'At thirteen, he had his first ',
    sentenceSuffix: '.',
    answer: 'race',
    answerTranslation: L(
      '열세 살 때 그는 첫 경주를 했어요.',
      'O‘n uch yoshida u birinchi poygasida qatnashdi.',
      'At thirteen, he had his first race.',
      'В тринадцать лет он участвовал в своей первой гонке.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "race".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'race'],
  },

  en_s1u8_n4_072_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'biography',
        native: 'biografiya',
        nativeI18n: L('일대기', 'biografiya', 'biography', 'биография'),
      },
      {
        text: 'female',
        native: 'ayol',
        nativeI18n: L('여성의', 'ayol', 'female', 'женский'),
      },
      {
        text: 'disappear',
        native: 'g‘oyib bo‘lmoq',
        nativeI18n: L('사라지다', 'g‘oyib bo‘lmoq', 'disappear', 'исчезать'),
      },
      {
        text: 'career',
        native: 'karyera',
        nativeI18n: L('경력', 'karyera', 'career', 'карьера'),
      },
      {
        text: 'pilot',
        native: 'uchuvchi',
        nativeI18n: L('조종사', 'uchuvchi', 'pilot', 'пилот'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['biography', 'matching'],
  },

  en_s1u8_n4_073_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'accident',
      '1994',
      'racing',
      'a',
      'in',
      'He',
      'died',
      'career',
      'champion',
    ],
    answer: 'He died in a racing accident in 1994',
    answerTranslation: L(
      '그는 1994년에 경주 사고로 사망했어요.',
      'U 1994-yilda poyga baxtsiz hodisasida vafot etdi.',
      'He died in a racing accident in 1994.',
      'Он погиб в гоночной аварии в 1994 году.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['biography', 'accident'],
  },

  en_s1u8_n4_074_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'biography',
        native: 'biografiya',
        nativeI18n: L('일대기', 'biografiya', 'biography', 'биография'),
      },
      {
        text: 'female',
        native: 'ayol',
        nativeI18n: L('여성의', 'ayol', 'female', 'женский'),
      },
      {
        text: 'disappear',
        native: 'g‘oyib bo‘lmoq',
        nativeI18n: L('사라지다', 'g‘oyib bo‘lmoq', 'disappear', 'исчезать'),
      },
      {
        text: 'career',
        native: 'karyera',
        nativeI18n: L('경력', 'karyera', 'career', 'карьера'),
      },
      {
        text: 'pilot',
        native: 'uchuvchi',
        nativeI18n: L('조종사', 'uchuvchi', 'pilot', 'пилот'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['biography', 'listening'],
  },

  en_s1u8_n4_075_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'pilot',
    choices: [
      { text: 'career', label: '💼', emoji: '💼', imageUrl: '' },
      { text: 'champion', label: '🏆', emoji: '🏆', imageUrl: '' },
      { text: 'passenger', label: '💺', emoji: '💺', imageUrl: '' },
      { text: 'pilot', label: '👩‍✈️', emoji: '👩‍✈️', imageUrl: '' },
    ],
    answerTranslation: L('조종사', 'uchuvchi', 'pilot', 'пилот'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['pilot'],
  },

  en_s1u8_n4_076_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'He moved to England and ___ started racing there.',
    blankAnswers: ['then'],
    options: ['then', 'after', 'last', 'yesterday'],
    answer: 'then',
    answerTranslation: L(
      '그는 영국으로 이사했고 그다음 그곳에서 경주를 시작했어요.',
      'U Angliyaga ko‘chdi va keyin u yerda poyga qilishni boshladi.',
      'He moved to England and then started racing there.',
      'Он переехал в Англию, а затем начал там участвовать в гонках.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['sequencers', 'then'],
  },

  en_s1u8_n4_077_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'He had a great ',
    sentenceSuffix: ' in Formula 1.',
    answer: 'career',
    answerTranslation: L(
      '그는 포뮬러 1에서 훌륭한 경력을 쌓았어요.',
      'U Formula 1 da ajoyib karyeraga ega edi.',
      'He had a great career in Formula 1.',
      'У него была отличная карьера в Формуле-1.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "career".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'career'],
  },

  en_s1u8_n4_078_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['first', 'race', 'his', 'had', 'he', 'thirteen', 'At', 'career'],
    answer: 'At thirteen he had his first race',
    audioText: 'At thirteen, he had his first race.',
    answerTranslation: L(
      '열세 살 때 그는 첫 경주를 했어요.',
      'O‘n uch yoshida u birinchi poygasida qatnashdi.',
      'At thirteen, he had his first race.',
      'В тринадцать лет он участвовал в своей первой гонке.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['race', 'biography'],
  },

  en_s1u8_n4_079_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What happened after Ayrton Senna moved to England?',
    options: [
      'He',
      'started',
      'racing',
      'in',
      'Formula',
      'Ford',
      'and',
      'Formula',
      '3',
      'cars',
      'pilot',
    ],
    answer: 'He started racing in Formula Ford and Formula 3 cars',
    answerTranslation: L(
      '그는 포뮬러 포드와 포뮬러 3 경주를 시작했어요.',
      'U Formula Ford va Formula 3 mashinalarida poyga qilishni boshladi.',
      'He started racing in Formula Ford and Formula 3 cars.',
      'Он начал выступать в Формуле Ford и Формуле-3.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['senna', 'reply'],
  },

  en_s1u8_n4_080_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'What happened to Ayrton Senna in 1994?' },
    ],
    options: [
      'He died in a racing accident.',
      'He was born in Brazil.',
      'He started his first race.',
      'He became a passenger.',
    ],
    answer: 'He died in a racing accident.',
    answerTranslation: L(
      '그는 경주 사고로 사망했어요.',
      'U poyga baxtsiz hodisasida vafot etdi.',
      'He died in a racing accident.',
      'Он погиб в гоночной аварии.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['senna', 'biography', 'final'],
  },
};

export const EN_S1_UNIT8_NODE4 = {
  title: L(
    '특별한 날과 인물 이야기',
    'Maxsus kunlar va insonlar hikoyasi',
    'Special occasions and biographies',
    'Особые события и биографии',
  ),
  section: 1,
  unit: 8,
  order: 4,
  isActive: true,

  lessons: [
    {
      title: L(
        '특별한 날의 표현',
        'Maxsus kunlar uchun iboralar',
        'Special occasions',
        'Особые случаи',
      ),
      description: L(
        'Congratulations, Good luck, Happy birthday, Cheers 같은 표현을 상황에 맞게 사용해요.',
        'Congratulations, Good luck, Happy birthday va Cheers kabi iboralarni mos vaziyatlarda ishlatasiz.',
        'Use expressions such as Congratulations, Good luck, Happy birthday and Cheers in the correct situations.',
        'Используем Congratulations, Good luck, Happy birthday и Cheers в подходящих ситуациях.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 1,
      questions: [
        'en_s1u8_n4_001_speaking',
        'en_s1u8_n4_002_image_choice',
        'en_s1u8_n4_003_word_matching',
        'en_s1u8_n4_004_translate_builder',
        'en_s1u8_n4_005_word_arrange',
        'en_s1u8_n4_006_audio_match',
        'en_s1u8_n4_007_type_answer',
        'en_s1u8_n4_008_image_choice',
        'en_s1u8_n4_009_sentence_builder',
        'en_s1u8_n4_010_reply_builder',
        'en_s1u8_n4_011_type_answer',
        'en_s1u8_n4_012_word_matching',
        'en_s1u8_n4_013_translate_builder',
        'en_s1u8_n4_014_audio_match',
        'en_s1u8_n4_015_image_choice',
        'en_s1u8_n4_016_fill_in_blank',
        'en_s1u8_n4_017_type_answer',
        'en_s1u8_n4_018_word_arrange',
        'en_s1u8_n4_019_reply_builder',
        'en_s1u8_n4_020_dialog_complete',
      ],
    },

    {
      title: L(
        '관심 보이며 반응하기',
        'Qiziqish bildirib javob berish',
        'Show interest',
        'Проявляем интерес',
      ),
      description: L(
        '좋은 소식, 나쁜 소식, 놀라운 소식에 That’s great, Really, Never mind, I’m sorry to hear that으로 반응해요.',
        'Yaxshi, yomon va kutilmagan xabarlarga That’s great, Really, Never mind va I’m sorry to hear that bilan javob berasiz.',
        'Respond naturally to good, bad and surprising news using common expressions.',
        'Естественно реагируем на хорошие, плохие и неожиданные новости.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 2,
      questions: [
        'en_s1u8_n4_021_speaking',
        'en_s1u8_n4_022_image_choice',
        'en_s1u8_n4_023_word_matching',
        'en_s1u8_n4_024_translate_builder',
        'en_s1u8_n4_025_word_arrange',
        'en_s1u8_n4_026_audio_match',
        'en_s1u8_n4_027_type_answer',
        'en_s1u8_n4_028_image_choice',
        'en_s1u8_n4_029_sentence_builder',
        'en_s1u8_n4_030_reply_builder',
        'en_s1u8_n4_031_type_answer',
        'en_s1u8_n4_032_word_matching',
        'en_s1u8_n4_033_translate_builder',
        'en_s1u8_n4_034_audio_match',
        'en_s1u8_n4_035_image_choice',
        'en_s1u8_n4_036_fill_in_blank',
        'en_s1u8_n4_037_type_answer',
        'en_s1u8_n4_038_word_arrange',
        'en_s1u8_n4_039_reply_builder',
        'en_s1u8_n4_040_dialog_complete',
      ],
    },

    {
      title: L(
        '일대기 쓰기',
        'Biografiya yozish',
        'Write a biography',
        'Пишем биографию',
      ),
      description: L(
        '태어난 시기, 학교, 직업, 결혼과 가족 같은 사건을 then과 after that으로 연결해 일대기를 만들어요.',
        'Tug‘ilish, maktab, ish, nikoh va oila kabi voqealarni then va after that yordamida bog‘lab biografiya yozasiz.',
        'Connect life events such as birth, school, work, marriage and family with then and after that.',
        'Соединяем события жизни — рождение, школу, работу, брак и семью — с помощью then и after that.',
      ),
      category: LessonCategory.EXPRESSION,
      level: LV,
      order: 3,
      questions: [
        'en_s1u8_n4_041_speaking',
        'en_s1u8_n4_042_image_choice',
        'en_s1u8_n4_043_word_matching',
        'en_s1u8_n4_044_translate_builder',
        'en_s1u8_n4_045_word_arrange',
        'en_s1u8_n4_046_audio_match',
        'en_s1u8_n4_047_type_answer',
        'en_s1u8_n4_048_image_choice',
        'en_s1u8_n4_049_sentence_builder',
        'en_s1u8_n4_050_reply_builder',
        'en_s1u8_n4_051_type_answer',
        'en_s1u8_n4_052_word_matching',
        'en_s1u8_n4_053_translate_builder',
        'en_s1u8_n4_054_audio_match',
        'en_s1u8_n4_055_image_choice',
        'en_s1u8_n4_056_fill_in_blank',
        'en_s1u8_n4_057_type_answer',
        'en_s1u8_n4_058_word_arrange',
        'en_s1u8_n4_059_reply_builder',
        'en_s1u8_n4_060_dialog_complete',
      ],
    },

    {
      title: L(
        '인물의 삶 순서대로 말하기',
        'Inson hayotini ketma-ket aytish',
        'Biography review',
        'Повторение биографии',
      ),
      description: L(
        '아이르통 세나의 삶을 따라가며 과거 사건을 시간 순서대로 배열하고 경력과 주요 사건을 설명해요.',
        'Ayrton Sennaning hayoti orqali voqealarni vaqt tartibida joylashtirib, karyera va muhim voqealarni tasvirlaysiz.',
        'Use Ayrton Senna’s life to practise ordering and describing the important events in a biography.',
        'На примере жизни Айртона Сенны учимся располагать и описывать важные события биографии.',
      ),
      category: LessonCategory.EXPRESSION,
      level: LV,
      order: 4,
      questions: [
        'en_s1u8_n4_061_speaking',
        'en_s1u8_n4_062_image_choice',
        'en_s1u8_n4_063_word_matching',
        'en_s1u8_n4_064_translate_builder',
        'en_s1u8_n4_065_word_arrange',
        'en_s1u8_n4_066_audio_match',
        'en_s1u8_n4_067_type_answer',
        'en_s1u8_n4_068_image_choice',
        'en_s1u8_n4_069_sentence_builder',
        'en_s1u8_n4_070_reply_builder',
        'en_s1u8_n4_071_type_answer',
        'en_s1u8_n4_072_word_matching',
        'en_s1u8_n4_073_translate_builder',
        'en_s1u8_n4_074_audio_match',
        'en_s1u8_n4_075_image_choice',
        'en_s1u8_n4_076_fill_in_blank',
        'en_s1u8_n4_077_type_answer',
        'en_s1u8_n4_078_word_arrange',
        'en_s1u8_n4_079_reply_builder',
        'en_s1u8_n4_080_dialog_complete',
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Section 1 · Unit 8 · Node 5
// 8.5 The Wright siblings + Unit 8 Review
//
// Coverage
// - Wright siblings
// - engine / propeller / glider / flight
// - company / business / machine
// - invent / test
// - successful
// - biography sequencing
// - Brothers Grimm review
// - storyteller / tale / collect / publish / popular
// - was / were / wasn't / weren't
// - regular past simple
// - dates and past-time expressions
// - object pronouns
// - special-occasion responses
//
// IMPORTANT:
// *_WORDS에는 무조건 단어만 등록.
// "bicycle shop", "printing business",
// "flying machine", "after that" 같은 구/문장 등록 금지.
//
// Reused:
// flight / glider / biography / career
// born / die / family / school / university
// move / work / study / help / start / travel
// congratulations / luck / cheers
// competition / prize / article / charity
//
// 4 lessons × 20 questions = 80
// type_answer: 3 per lesson
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT8_NODE5_WORDS = [
  {
    code: 'en-job-actress',
    english: 'actress',
    senseKey: 'female-actor',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '여배우',
      'aktrisa',
      'a woman who acts in films, television or plays',
      'актриса',
    ),
    examples: [
      {
        english: 'Ingrid Bergman was an actress from Sweden.',
        translations: L(
          '잉그리드 버그먼은 스웨덴 출신의 여배우였어요.',
          'Ingrid Bergman Shvetsiyalik aktrisa edi.',
          'Ingrid Bergman was an actress from Sweden.',
          'Ингрид Бергман была актрисой из Швеции.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈæktrəs/',
      ttsText: 'actress',
    },
    media: {
      emoji: '🎭',
      imageUrl: '',
      imageAlt: L('여배우', 'aktrisa', 'an actress', 'актриса'),
    },
    tags: ['jobs', 'film'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-job-astronaut',
    english: 'astronaut',
    senseKey: 'person-who-travels-in-space',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '우주비행사',
      'astronavt',
      'a person who travels in space',
      'космонавт; астронавт',
    ),
    examples: [
      {
        english: 'His dream was to be an astronaut.',
        translations: L(
          '그의 꿈은 우주비행사가 되는 것이었어요.',
          'Uning orzusi astronavt bo‘lish edi.',
          'His dream was to be an astronaut.',
          'Его мечтой было стать астронавтом.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈæstrənɔːt/',
      ttsText: 'astronaut',
    },
    media: {
      emoji: '🧑‍🚀',
      imageUrl: '',
      imageAlt: L('우주비행사', 'astronavt', 'an astronaut', 'астронавт'),
    },
    tags: ['jobs', 'space'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-birthday',
    english: 'birthday',
    senseKey: 'anniversary-of-birth',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '생일',
      'tug‘ilgan kun',
      'the day each year that celebrates when someone was born',
      'день рождения',
    ),
    examples: [
      {
        english: 'When is your birthday?',
        translations: L(
          '생일이 언제예요?',
          'Tug‘ilgan kuningiz qachon?',
          'When is your birthday?',
          'Когда у вас день рождения?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈbɜːθdeɪ/',
      ttsText: 'birthday',
    },
    media: {
      emoji: '🎂',
      imageUrl: '',
      imageAlt: L(
        '생일 케이크',
        'tug‘ilgan kun torti',
        'a birthday cake',
        'торт на день рождения',
      ),
    },
    tags: ['dates', 'life-events'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-job-boss',
    english: 'boss',
    senseKey: 'person-in-charge-at-work',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '상사; 책임자',
      'boshliq',
      'a person who is in charge of other people at work',
      'начальник',
    ),
    examples: [
      {
        english: 'Bill Gates was the boss of Microsoft.',
        translations: L(
          '빌 게이츠는 마이크로소프트의 책임자였어요.',
          'Bill Gates Microsoftning boshlig‘i edi.',
          'Bill Gates was the boss of Microsoft.',
          'Билл Гейтс был руководителем Microsoft.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/bɒs/',
      ttsText: 'boss',
    },
    media: {
      emoji: '👔',
      imageUrl: '',
      imageAlt: L(
        '회사의 책임자',
        'kompaniya boshlig‘i',
        'a boss',
        'начальник',
      ),
    },
    tags: ['jobs', 'work'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-century',
    english: 'century',
    senseKey: 'period-of-one-hundred-years',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '세기; 100년',
      'asr',
      'a period of one hundred years',
      'век; столетие',
    ),
    examples: [
      {
        english: 'The Brothers Grimm lived in the 19th century.',
        translations: L(
          '그림 형제는 19세기에 살았어요.',
          'Aka-uka Grimmlar 19-asrda yashagan.',
          'The Brothers Grimm lived in the 19th century.',
          'Братья Гримм жили в XIX веке.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈsentʃəri/',
      ttsText: 'century',
    },
    media: {
      emoji: '📜',
      imageUrl: '',
      imageAlt: L(
        '역사의 한 세기',
        'tarixdagi bir asr',
        'a century in history',
        'век в истории',
      ),
    },
    tags: ['time', 'history'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-characters',
    english: 'characters',
    senseKey: 'people-in-story-plural',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '등장인물들',
      'qahramonlar',
      'people in a story, film or play',
      'персонажи',
    ),
    examples: [
      {
        english: 'The characters were real children.',
        translations: L(
          '등장인물들은 실제 아이들이었어요.',
          'Qahramonlar haqiqiy bolalar edi.',
          'The characters were real children.',
          'Персонажи были настоящими детьми.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkærəktəz/',
      ttsText: 'characters',
    },
    media: {
      emoji: '👥',
      imageUrl: '',
      imageAlt: L(
        '이야기의 등장인물들',
        'hikoya qahramonlari',
        'story characters',
        'персонажи истории',
      ),
    },
    tags: ['stories', 'people'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-document',
    english: 'document',
    senseKey: 'written-or-recorded-information',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '문서; 기록물',
      'hujjat',
      'a written, printed or recorded piece of information',
      'документ',
    ),
    examples: [
      {
        english: 'The films are important historical documents.',
        translations: L(
          '그 영화들은 중요한 역사적 기록물이에요.',
          'Bu filmlar muhim tarixiy hujjatlardir.',
          'The films are important historical documents.',
          'Эти фильмы — важные исторические документы.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈdɒkjəmənt/',
      ttsText: 'document',
    },
    media: {
      emoji: '📄',
      imageUrl: '',
      imageAlt: L('문서', 'hujjat', 'a document', 'документ'),
    },
    tags: ['history', 'records'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-dream',
    english: 'dream',
    senseKey: 'strong-hope-for-future',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '꿈; 장래 희망',
      'orzu',
      'something you strongly hope to do or achieve',
      'мечта',
    ),
    examples: [
      {
        english: 'Her dream was to have a family.',
        translations: L(
          '그녀의 꿈은 가족을 이루는 것이었어요.',
          'Uning orzusi oila qurish edi.',
          'Her dream was to have a family.',
          'Её мечтой было создать семью.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/driːm/',
      ttsText: 'dream',
    },
    media: {
      emoji: '💭',
      imageUrl: '',
      imageAlt: L(
        '미래의 꿈',
        'kelajak orzusi',
        'a dream for the future',
        'мечта о будущем',
      ),
    },
    tags: ['life', 'goals'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-foundation',
    english: 'foundation',
    senseKey: 'organization-created-to-help-cause',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '재단',
      'jamg‘arma',
      'an organization created to support or help a particular cause',
      'фонд',
    ),
    examples: [
      {
        english: 'They use the foundation to help poor people.',
        translations: L(
          '그들은 가난한 사람들을 돕기 위해 재단을 이용해요.',
          'Ular kambag‘al odamlarga yordam berish uchun jamg‘armadan foydalanadi.',
          'They use the foundation to help poor people.',
          'Они используют фонд, чтобы помогать бедным людям.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/faʊnˈdeɪʃən/',
      ttsText: 'foundation',
    },
    media: {
      emoji: '🤝',
      imageUrl: '',
      imageAlt: L(
        '사람들을 돕는 재단',
        'odamlarga yordam beradigan jamg‘arma',
        'a charitable foundation',
        'благотворительный фонд',
      ),
    },
    tags: ['organizations', 'charity'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-animal-horse',
    english: 'horse',
    senseKey: 'large-animal-used-for-riding',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('말', 'ot', 'a large animal that people can ride', 'лошадь'),
    examples: [
      {
        english: 'She travelled around California on horses.',
        translations: L(
          '그녀는 말을 타고 캘리포니아를 여행했어요.',
          'U Kaliforniya bo‘ylab otda sayohat qilgan.',
          'She travelled around California on horses.',
          'Она путешествовала по Калифорнии на лошадях.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/hɔːs/',
      ttsText: 'horse',
    },
    media: {
      emoji: '🐎',
      imageUrl: '',
      imageAlt: L('말', 'ot', 'a horse', 'лошадь'),
    },
    tags: ['animals', 'travel'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-determiner-last',
    english: 'last',
    senseKey: 'previous-time-period',
    partOfSpeech: WordPartOfSpeech.DETERMINER,
    meaning: L(
      '지난; 바로 전의',
      'o‘tgan',
      'the one immediately before the present one',
      'прошлый',
    ),
    examples: [
      {
        english: 'We were on holiday last year.',
        translations: L(
          '우리는 작년에 휴가를 갔어요.',
          'Biz o‘tgan yili ta’tilda edik.',
          'We were on holiday last year.',
          'В прошлом году мы были в отпуске.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/lɑːst/',
      ttsText: 'last',
    },
    media: {
      emoji: '⬅️',
      imageUrl: '',
      imageAlt: L(
        '지난 시간을 나타내는 표시',
        'o‘tgan vaqt',
        'a previous time',
        'прошлое время',
      ),
    },
    tags: ['time', 'determiner'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-real',
    english: 'real',
    senseKey: 'actually-existing-not-imaginary',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '실제의; 진짜의',
      'haqiqiy',
      'actually existing and not imaginary',
      'настоящий; реальный',
    ),
    examples: [
      {
        english: 'The characters were real children.',
        translations: L(
          '등장인물들은 실제 아이들이었어요.',
          'Qahramonlar haqiqiy bolalar edi.',
          'The characters were real children.',
          'Персонажи были настоящими детьми.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/rɪəl/',
      ttsText: 'real',
    },
    media: {
      emoji: '✅',
      imageUrl: '',
      imageAlt: L(
        '실제임을 나타내는 표시',
        'haqiqiy ekanini bildiruvchi belgi',
        'something real',
        'что-то настоящее',
      ),
    },
    tags: ['adjectives', 'description'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adverb-yesterday',
    english: 'yesterday',
    senseKey: 'day-before-today',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L('어제', 'kecha', 'on the day before today', 'вчера'),
    examples: [
      {
        english: 'I listened to her for two hours yesterday.',
        translations: L(
          '저는 어제 두 시간 동안 그녀의 말을 들었어요.',
          'Men kecha uni ikki soat tingladim.',
          'I listened to her for two hours yesterday.',
          'Вчера я слушал её два часа.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈjestədeɪ/',
      ttsText: 'yesterday',
    },
    media: {
      emoji: '🗓️',
      imageUrl: '',
      imageAlt: L('어제 날짜', 'kechagi sana', 'yesterday', 'вчерашний день'),
    },
    tags: ['time', 'past'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-ordinal-eleventh',
    english: 'eleventh',
    senseKey: 'ordinal-11',
    partOfSpeech: WordPartOfSpeech.NUMERAL,
    meaning: L(
      '열한 번째',
      'o‘n birinchi',
      'number 11 in a series',
      'одиннадцатый',
    ),
    examples: [
      {
        english: 'Her birthday is on the eleventh of May.',
        translations: L(
          '그녀의 생일은 5월 11일이에요.',
          'Uning tug‘ilgan kuni o‘n birinchi mayda.',
          'Her birthday is on the eleventh of May.',
          'Её день рождения — одиннадцатого мая.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɪˈlevənθ/',
      ttsText: 'eleventh',
    },
    media: {
      emoji: '1️⃣1️⃣',
      imageUrl: '',
      imageAlt: L('열한 번째', 'o‘n birinchi', 'eleventh', 'одиннадцатый'),
    },
    tags: ['ordinal-numbers', 'dates'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-ordinal-twelfth',
    english: 'twelfth',
    senseKey: 'ordinal-12',
    partOfSpeech: WordPartOfSpeech.NUMERAL,
    meaning: L(
      '열두 번째',
      'o‘n ikkinchi',
      'number 12 in a series',
      'двенадцатый',
    ),
    examples: [
      {
        english: 'Today is the twelfth of June.',
        translations: L(
          '오늘은 6월 12일이에요.',
          'Bugun o‘n ikkinchi iyun.',
          'Today is the twelfth of June.',
          'Сегодня двенадцатое июня.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/twelfθ/',
      ttsText: 'twelfth',
    },
    media: {
      emoji: '1️⃣2️⃣',
      imageUrl: '',
      imageAlt: L('열두 번째', 'o‘n ikkinchi', 'twelfth', 'двенадцатый'),
    },
    tags: ['ordinal-numbers', 'dates'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-ordinal-twenty-first',
    english: 'twenty-first',
    senseKey: 'ordinal-21',
    partOfSpeech: WordPartOfSpeech.NUMERAL,
    meaning: L(
      '스물한 번째',
      'yigirma birinchi',
      'number 21 in a series',
      'двадцать первый',
    ),
    examples: [
      {
        english: 'My birthday is on the twenty-first of July.',
        translations: L(
          '제 생일은 7월 21일이에요.',
          'Mening tug‘ilgan kunim yigirma birinchi iyulda.',
          'My birthday is on the twenty-first of July.',
          'Мой день рождения — двадцать первого июля.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌtwenti ˈfɜːst/',
      ttsText: 'twenty-first',
    },
    media: {
      emoji: '2️⃣1️⃣',
      imageUrl: '',
      imageAlt: L(
        '스물한 번째',
        'yigirma birinchi',
        'twenty-first',
        'двадцать первый',
      ),
    },
    tags: ['ordinal-numbers', 'dates'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-ordinal-twenty-third',
    english: 'twenty-third',
    senseKey: 'ordinal-23',
    partOfSpeech: WordPartOfSpeech.NUMERAL,
    meaning: L(
      '스물세 번째',
      'yigirma uchinchi',
      'number 23 in a series',
      'двадцать третий',
    ),
    examples: [
      {
        english: 'The event is on the twenty-third of August.',
        translations: L(
          '그 행사는 8월 23일이에요.',
          'Tadbir yigirma uchinchi avgustda.',
          'The event is on the twenty-third of August.',
          'Мероприятие состоится двадцать третьего августа.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌtwenti ˈθɜːd/',
      ttsText: 'twenty-third',
    },
    media: {
      emoji: '2️⃣3️⃣',
      imageUrl: '',
      imageAlt: L(
        '스물세 번째',
        'yigirma uchinchi',
        'twenty-third',
        'двадцать третий',
      ),
    },
    tags: ['ordinal-numbers', 'dates'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-ordinal-thirty-first',
    english: 'thirty-first',
    senseKey: 'ordinal-31',
    partOfSpeech: WordPartOfSpeech.NUMERAL,
    meaning: L(
      '서른한 번째',
      'o‘ttiz birinchi',
      'number 31 in a series',
      'тридцать первый',
    ),
    examples: [
      {
        english: 'December has a thirty-first day.',
        translations: L(
          '12월에는 31일이 있어요.',
          'Dekabrda o‘ttiz birinchi kun bor.',
          'December has a thirty-first day.',
          'В декабре есть тридцать первый день.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌθɜːti ˈfɜːst/',
      ttsText: 'thirty-first',
    },
    media: {
      emoji: '3️⃣1️⃣',
      imageUrl: '',
      imageAlt: L(
        '서른한 번째',
        'o‘ttiz birinchi',
        'thirty-first',
        'тридцать первый',
      ),
    },
    tags: ['ordinal-numbers', 'dates'],
    difficulty: 1,
    isCore: true,
  },
  {
    code: 'en-noun-sibling',
    english: 'sibling',
    senseKey: 'brother-or-sister',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '형제자매',
      'aka-uka yoki opa-singil',
      'a brother or sister',
      'брат или сестра',
    ),
    examples: [
      {
        english: 'The Wright siblings lived in Ohio.',
        translations: L(
          '라이트 형제자매는 오하이오에 살았어요.',
          'Rayt aka-uka va opa-singillari Ogayoda yashagan.',
          'The Wright siblings lived in Ohio.',
          'Братья и сестра Райт жили в Огайо.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈsɪblɪŋ/',
      ttsText: 'sibling',
    },
    media: {
      emoji: '👫',
      imageUrl: '',
      imageAlt: L(
        '형제자매',
        'aka-uka yoki opa-singil',
        'siblings',
        'братья и сёстры',
      ),
    },
    tags: ['family', 'people'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-engine',
    english: 'engine',
    senseKey: 'machine-providing-power',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '엔진',
      'dvigatel',
      'a machine that provides power to make something move',
      'двигатель',
    ),
    examples: [
      {
        english: 'The aeroplane had an engine.',
        translations: L(
          '그 비행기에는 엔진이 있었어요.',
          'Samolyotda dvigatel bor edi.',
          'The aeroplane had an engine.',
          'У самолёта был двигатель.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈendʒɪn/',
      ttsText: 'engine',
    },
    media: {
      emoji: '⚙️',
      imageUrl: '',
      imageAlt: L('엔진', 'dvigatel', 'an engine', 'двигатель'),
    },
    tags: ['machines', 'flight'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-propeller',
    english: 'propeller',
    senseKey: 'rotating-blades-moving-aircraft',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '프로펠러',
      'parrak',
      'a set of blades that turn and move an aircraft or boat',
      'пропеллер',
    ),
    examples: [
      {
        english: 'The plane had a propeller.',
        translations: L(
          '그 비행기에는 프로펠러가 있었어요.',
          'Samolyotda parrak bor edi.',
          'The plane had a propeller.',
          'У самолёта был пропеллер.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/prəˈpelə/',
      ttsText: 'propeller',
    },
    media: {
      emoji: '🛩️',
      imageUrl: '',
      imageAlt: L(
        '비행기 프로펠러',
        'samolyot parragi',
        'an aeroplane propeller',
        'пропеллер самолёта',
      ),
    },
    tags: ['machines', 'flight'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-company',
    english: 'company',
    senseKey: 'business-organization',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '회사',
      'kompaniya',
      'an organization that sells goods or services',
      'компания',
    ),
    examples: [
      {
        english: 'They built a successful company.',
        translations: L(
          '그들은 성공적인 회사를 만들었어요.',
          'Ular muvaffaqiyatli kompaniya qurdilar.',
          'They built a successful company.',
          'Они создали успешную компанию.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkʌmpəni/',
      ttsText: 'company',
    },
    media: {
      emoji: '🏢',
      imageUrl: '',
      imageAlt: L('회사', 'kompaniya', 'a company', 'компания'),
    },
    tags: ['work', 'business'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-business-company',
    english: 'business',
    senseKey: 'commercial-company',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '사업체; 회사',
      'biznes',
      'a company that sells goods or services',
      'предприятие; бизнес',
    ),
    examples: [
      {
        english: 'The brothers started a printing business.',
        translations: L(
          '형제는 인쇄 사업을 시작했어요.',
          'Aka-ukalar bosmaxona biznesini boshlashdi.',
          'The brothers started a printing business.',
          'Братья начали печатный бизнес.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈbɪznəs/',
      ttsText: 'business',
    },
    media: {
      emoji: '💼',
      imageUrl: '',
      imageAlt: L('사업', 'biznes', 'a business', 'бизнес'),
    },
    tags: ['work', 'company'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-invent',
    english: 'invent',
    senseKey: 'create-new-device-or-idea',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '발명하다',
      'ixtiro qilmoq',
      'to create something new for the first time',
      'изобретать',
    ),
    examples: [
      {
        english: 'They invented their own bicycle.',
        translations: L(
          '그들은 자신들만의 자전거를 발명했어요.',
          'Ular o‘z velosipedlarini ixtiro qilishdi.',
          'They invented their own bicycle.',
          'Они изобрели собственный велосипед.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɪnˈvent/',
      ttsText: 'invent',
    },
    media: {
      emoji: '💡',
      imageUrl: '',
      imageAlt: L(
        '새로운 것을 발명하는 모습',
        'ixtiro',
        'an invention idea',
        'идея изобретения',
      ),
    },
    tags: ['inventions', 'verbs'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-test',
    english: 'test',
    senseKey: 'try-something-to-check-how-it-works',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '시험하다; 테스트하다',
      'sinamoq',
      'to try something to check how well it works',
      'испытывать',
    ),
    examples: [
      {
        english: 'They tested different flying machines.',
        translations: L(
          '그들은 여러 비행 기계를 시험했어요.',
          'Ular turli uchish mashinalarini sinashdi.',
          'They tested different flying machines.',
          'Они испытывали разные летательные аппараты.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/test/',
      ttsText: 'test',
    },
    media: {
      emoji: '🧪',
      imageUrl: '',
      imageAlt: L(
        '무언가를 시험하는 모습',
        'sinov',
        'testing something',
        'испытание',
      ),
    },
    tags: ['inventions', 'verbs'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-machine',
    english: 'machine',
    senseKey: 'device-that-does-work',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '기계',
      'mashina',
      'a device that uses power to do work',
      'машина; механизм',
    ),
    examples: [
      {
        english: 'They tested different machines.',
        translations: L(
          '그들은 여러 기계를 시험했어요.',
          'Ular turli mashinalarni sinashdi.',
          'They tested different machines.',
          'Они испытывали разные машины.',
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
      imageAlt: L('기계', 'mashina', 'a machine', 'машина'),
    },
    tags: ['machines', 'inventions'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-successful',
    english: 'successful',
    senseKey: 'achieving-wanted-result',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '성공적인',
      'muvaffaqiyatli',
      'achieving the result that you wanted',
      'успешный',
    ),
    examples: [
      {
        english: 'They were successful in 1903.',
        translations: L(
          '그들은 1903년에 성공했어요.',
          'Ular 1903-yilda muvaffaqiyatga erishishdi.',
          'They were successful in 1903.',
          'В 1903 году они добились успеха.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/səkˈsesfəl/',
      ttsText: 'successful',
    },
    media: {
      emoji: '✅',
      imageUrl: '',
      imageAlt: L('성공', 'muvaffaqiyat', 'success', 'успех'),
    },
    tags: ['adjectives', 'inventions'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-job-storyteller',
    english: 'storyteller',
    senseKey: 'person-who-tells-stories',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '이야기꾼',
      'hikoyachi',
      'a person who tells or writes stories',
      'рассказчик',
    ),
    examples: [
      {
        english: 'The Brothers Grimm were famous storytellers.',
        translations: L(
          '그림 형제는 유명한 이야기꾼이었어요.',
          'Aka-uka Grimmlar mashhur hikoyachilar edi.',
          'The Brothers Grimm were famous storytellers.',
          'Братья Гримм были известными рассказчиками.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈstɔːritelə/',
      ttsText: 'storyteller',
    },
    media: {
      emoji: '📚',
      imageUrl: '',
      imageAlt: L(
        '이야기를 들려주는 사람',
        'hikoya aytayotgan odam',
        'a storyteller',
        'рассказчик',
      ),
    },
    tags: ['stories', 'people'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-tale',
    english: 'tale',
    senseKey: 'traditional-or-imaginative-story',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '이야기; 동화',
      'ertak',
      'a story, especially an old or imaginative one',
      'сказка; история',
    ),
    examples: [
      {
        english: 'The brothers collected old tales.',
        translations: L(
          '그 형제는 옛이야기를 모았어요.',
          'Aka-ukalar eski ertaklarni to‘plashdi.',
          'The brothers collected old tales.',
          'Братья собирали старые сказки.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/teɪl/',
      ttsText: 'tale',
    },
    media: {
      emoji: '📕',
      imageUrl: '',
      imageAlt: L(
        '옛이야기 책',
        'ertak kitobi',
        'a book of tales',
        'книга сказок',
      ),
    },
    tags: ['stories', 'books'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-collect',
    english: 'collect',
    senseKey: 'bring-things-together',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '모으다',
      'to‘plamoq',
      'to bring things together as a group',
      'собирать',
    ),
    examples: [
      {
        english: 'They started to collect tales.',
        translations: L(
          '그들은 이야기를 모으기 시작했어요.',
          'Ular ertaklarni to‘plashni boshlashdi.',
          'They started to collect tales.',
          'Они начали собирать сказки.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/kəˈlekt/',
      ttsText: 'collect',
    },
    media: {
      emoji: '📚',
      imageUrl: '',
      imageAlt: L(
        '책을 모으는 모습',
        'kitoblarni to‘plash',
        'collecting books',
        'собирание книг',
      ),
    },
    tags: ['stories', 'verbs'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-publish',
    english: 'publish',
    senseKey: 'produce-book-for-public',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '출판하다',
      'nashr qilmoq',
      'to produce a book or text for people to read',
      'публиковать; издавать',
    ),
    examples: [
      {
        english: 'They published a book of tales.',
        translations: L(
          '그들은 이야기책을 출판했어요.',
          'Ular ertaklar kitobini nashr qilishdi.',
          'They published a book of tales.',
          'Они издали книгу сказок.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈpʌblɪʃ/',
      ttsText: 'publish',
    },
    media: {
      emoji: '📘',
      imageUrl: '',
      imageAlt: L(
        '출판된 책',
        'nashr qilingan kitob',
        'a published book',
        'изданная книга',
      ),
    },
    tags: ['books', 'verbs'],
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
        english: 'The book was very popular.',
        translations: L(
          '그 책은 매우 인기가 있었어요.',
          'Kitob juda mashhur edi.',
          'The book was very popular.',
          'Книга была очень популярной.',
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
        '인기 있는 책',
        'mashhur kitob',
        'a popular book',
        'популярная книга',
      ),
    },
    tags: ['adjectives', 'books'],
    difficulty: 1,
    isCore: true,
  },
];

export const EN_S1_UNIT8_NODE5_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · The Wright siblings
  // ===========================================================

  en_s1u8_n5_001_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The Wright siblings lived in Dayton, Ohio.',
    audioText: 'The Wright siblings lived in Dayton, Ohio.',
    answerTranslation: L(
      '라이트 형제자매는 오하이오주 데이턴에 살았어요.',
      'Rayt aka-uka va opa-singillari Ogayo shtatining Dayton shahrida yashagan.',
      'The Wright siblings lived in Dayton, Ohio.',
      'Братья и сестра Райт жили в Дейтоне, штат Огайо.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['wright-siblings', 'past-simple'],
  },

  en_s1u8_n5_002_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'engine',
    choices: [
      { text: 'propeller', label: '🛩️', emoji: '🛩️', imageUrl: '' },
      { text: 'engine', label: '⚙️', emoji: '⚙️', imageUrl: '' },
      { text: 'company', label: '🏢', emoji: '🏢', imageUrl: '' },
      { text: 'tale', label: '📕', emoji: '📕', imageUrl: '' },
    ],
    answerTranslation: L('엔진', 'dvigatel', 'engine', 'двигатель'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['engine', 'flight'],
  },

  en_s1u8_n5_003_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'sibling',
        native: 'aka-uka yoki opa-singil',
        nativeI18n: L(
          '형제자매',
          'aka-uka yoki opa-singil',
          'sibling',
          'брат или сестра',
        ),
      },
      {
        text: 'engine',
        native: 'dvigatel',
        nativeI18n: L('엔진', 'dvigatel', 'engine', 'двигатель'),
      },
      {
        text: 'propeller',
        native: 'parrak',
        nativeI18n: L('프로펠러', 'parrak', 'propeller', 'пропеллер'),
      },
      {
        text: 'company',
        native: 'kompaniya',
        nativeI18n: L('회사', 'kompaniya', 'company', 'компания'),
      },
      {
        text: 'glider',
        native: 'planer',
        nativeI18n: L('글라이더', 'planer', 'glider', 'планер'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['wright-siblings', 'matching'],
  },

  en_s1u8_n5_004_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'a',
      'bicycle',
      'shop',
      'opened',
      'The',
      'brothers',
      'engine',
      'tested',
    ],
    answer: 'The brothers opened a bicycle shop',
    answerTranslation: L(
      '그 형제는 자전거 가게를 열었어요.',
      'Aka-ukalar velosiped do‘koni ochishdi.',
      'The brothers opened a bicycle shop.',
      'Братья открыли велосипедный магазин.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['wright-siblings', 'past-simple'],
  },

  en_s1u8_n5_005_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'business',
      'a',
      'printing',
      'started',
      'brothers',
      'The',
      'company',
      'tested',
    ],
    answer: 'The brothers started a printing business',
    audioText: 'The brothers started a printing business.',
    answerTranslation: L(
      '그 형제는 인쇄 사업을 시작했어요.',
      'Aka-ukalar bosmaxona biznesini boshlashdi.',
      'The brothers started a printing business.',
      'Братья начали печатный бизнес.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['business', 'past-simple'],
  },

  en_s1u8_n5_006_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'sibling',
        native: 'aka-uka yoki opa-singil',
        nativeI18n: L(
          '형제자매',
          'aka-uka yoki opa-singil',
          'sibling',
          'брат или сестра',
        ),
      },
      {
        text: 'engine',
        native: 'dvigatel',
        nativeI18n: L('엔진', 'dvigatel', 'engine', 'двигатель'),
      },
      {
        text: 'propeller',
        native: 'parrak',
        nativeI18n: L('프로펠러', 'parrak', 'propeller', 'пропеллер'),
      },
      {
        text: 'company',
        native: 'kompaniya',
        nativeI18n: L('회사', 'kompaniya', 'company', 'компания'),
      },
      {
        text: 'glider',
        native: 'planer',
        nativeI18n: L('글라이더', 'planer', 'glider', 'планер'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['wright-siblings', 'listening'],
  },

  en_s1u8_n5_007_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'The aeroplane had an ',
    sentenceSuffix: ' and a propeller.',
    answer: 'engine',
    answerTranslation: L(
      '그 비행기에는 엔진과 프로펠러가 있었어요.',
      'Samolyotda dvigatel va parrak bor edi.',
      'The aeroplane had an engine and a propeller.',
      'У самолёта были двигатель и пропеллер.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "engine".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'engine'],
  },

  en_s1u8_n5_008_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'propeller',
    choices: [
      { text: 'engine', label: '⚙️', emoji: '⚙️', imageUrl: '' },
      { text: 'machine', label: '🏭', emoji: '🏭', imageUrl: '' },
      { text: 'propeller', label: '🛩️', emoji: '🛩️', imageUrl: '' },
      { text: 'company', label: '🏢', emoji: '🏢', imageUrl: '' },
    ],
    answerTranslation: L('프로펠러', 'parrak', 'propeller', 'пропеллер'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['propeller'],
  },

  en_s1u8_n5_009_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'In 1899, they started to make a glider.',
    audioText: 'In 1899, they started to make a glider.',
    answerI18n: L(
      '1899년에 그들은 글라이더를 만들기 시작했어요',
      '1899-yilda ular planer yasashni boshlashdi',
      'In 1899 they started to make a glider',
      'В 1899 году они начали делать планер',
    ),
    options: [
      'In',
      '1899',
      'they',
      'started',
      'to',
      'make',
      'a',
      'glider',
      'engine',
    ],
    optionsI18n: {
      ko: ['1899년에', '그들은', '글라이더를', '만들기', '시작했어요'],
      uz: ['1899-yilda', 'ular', 'planer', 'yasashni', 'boshlashdi'],
      en: ['In', '1899', 'they', 'started', 'to', 'make', 'a', 'glider'],
      ru: ['В', '1899', 'году', 'они', 'начали', 'делать', 'планер'],
    },
    answerTranslation: L(
      '1899년에 그들은 글라이더를 만들기 시작했어요.',
      '1899-yilda ular planer yasashni boshlashdi.',
      'In 1899, they started to make a glider.',
      'В 1899 году они начали делать планер.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['glider', 'wright-siblings'],
  },

  en_s1u8_n5_010_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What did the Wright brothers open?',
    options: [
      'They',
      'opened',
      'a',
      'bicycle',
      'shop',
      'company',
      'engine',
      'tested',
    ],
    answer: 'They opened a bicycle shop',
    answerTranslation: L(
      '그들은 자전거 가게를 열었어요.',
      'Ular velosiped do‘koni ochishdi.',
      'They opened a bicycle shop.',
      'Они открыли велосипедный магазин.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['wright-siblings', 'reply'],
  },

  en_s1u8_n5_011_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'They ',
    sentenceSuffix: ' their own bicycle.',
    answer: 'invented',
    answerTranslation: L(
      '그들은 자신들만의 자전거를 발명했어요.',
      'Ular o‘z velosipedlarini ixtiro qilishdi.',
      'They invented their own bicycle.',
      'Они изобрели собственный велосипед.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is the past form "invented".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'invent'],
  },

  en_s1u8_n5_012_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'invent',
        native: 'ixtiro qilmoq',
        nativeI18n: L('발명하다', 'ixtiro qilmoq', 'invent', 'изобретать'),
      },
      {
        text: 'test',
        native: 'sinamoq',
        nativeI18n: L('시험하다', 'sinamoq', 'test', 'испытывать'),
      },
      {
        text: 'machine',
        native: 'mashina',
        nativeI18n: L('기계', 'mashina', 'machine', 'машина'),
      },
      {
        text: 'successful',
        native: 'muvaffaqiyatli',
        nativeI18n: L('성공적인', 'muvaffaqiyatli', 'successful', 'успешный'),
      },
      {
        text: 'business',
        native: 'biznes',
        nativeI18n: L('사업', 'biznes', 'business', 'бизнес'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['inventions', 'matching'],
  },

  en_s1u8_n5_013_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'different',
      'machines',
      'They',
      'tested',
      'flying',
      'invented',
      'successful',
      'engine',
    ],
    answer: 'They tested different flying machines',
    answerTranslation: L(
      '그들은 여러 비행 기계를 시험했어요.',
      'Ular turli uchish mashinalarini sinashdi.',
      'They tested different flying machines.',
      'Они испытывали разные летательные аппараты.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['test', 'machine'],
  },

  en_s1u8_n5_014_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'invent',
        native: 'ixtiro qilmoq',
        nativeI18n: L('발명하다', 'ixtiro qilmoq', 'invent', 'изобретать'),
      },
      {
        text: 'test',
        native: 'sinamoq',
        nativeI18n: L('시험하다', 'sinamoq', 'test', 'испытывать'),
      },
      {
        text: 'machine',
        native: 'mashina',
        nativeI18n: L('기계', 'mashina', 'machine', 'машина'),
      },
      {
        text: 'successful',
        native: 'muvaffaqiyatli',
        nativeI18n: L('성공적인', 'muvaffaqiyatli', 'successful', 'успешный'),
      },
      {
        text: 'business',
        native: 'biznes',
        nativeI18n: L('사업', 'biznes', 'business', 'бизнес'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['inventions', 'listening'],
  },

  en_s1u8_n5_015_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'company',
    choices: [
      { text: 'machine', label: '🏭', emoji: '🏭', imageUrl: '' },
      { text: 'engine', label: '⚙️', emoji: '⚙️', imageUrl: '' },
      { text: 'company', label: '🏢', emoji: '🏢', imageUrl: '' },
      { text: 'propeller', label: '🛩️', emoji: '🛩️', imageUrl: '' },
    ],
    answerTranslation: L('회사', 'kompaniya', 'company', 'компания'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['company'],
  },

  en_s1u8_n5_016_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The aeroplane had an engine and a ___.',
    blankAnswers: ['propeller'],
    options: ['propeller', 'company', 'storyteller', 'business'],
    answer: 'propeller',
    answerTranslation: L(
      '그 비행기에는 엔진과 프로펠러가 있었어요.',
      'Samolyotda dvigatel va parrak bor edi.',
      'The aeroplane had an engine and a propeller.',
      'У самолёта были двигатель и пропеллер.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['propeller', 'engine'],
  },

  en_s1u8_n5_017_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'They ',
    sentenceSuffix: ' different flying machines.',
    answer: 'tested',
    answerTranslation: L(
      '그들은 여러 비행 기계를 시험했어요.',
      'Ular turli uchish mashinalarini sinashdi.',
      'They tested different flying machines.',
      'Они испытывали разные летательные аппараты.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is the past form "tested".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'test'],
  },

  en_s1u8_n5_018_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'company',
      'Wright',
      'the',
      'build',
      'helped',
      'Katharine',
      'brothers',
      'the',
      'to',
      'engine',
    ],
    answer: 'Katharine helped the brothers to build the Wright company',
    audioText: 'Katharine helped the brothers to build the Wright company.',
    answerTranslation: L(
      '캐서린은 형제들이 라이트 회사를 만드는 것을 도왔어요.',
      'Katharine aka-ukalariga Rayt kompaniyasini qurishda yordam berdi.',
      'Katharine helped the brothers to build the Wright company.',
      'Кэтрин помогла братьям создать компанию Райт.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['company', 'katharine'],
  },

  en_s1u8_n5_019_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Who continued to work with planes after Wilbur died?',
    options: [
      'Orville',
      'continued',
      'to',
      'work',
      'with',
      'planes',
      'Wilbur',
      'Katharine',
    ],
    answer: 'Orville continued to work with planes',
    answerTranslation: L(
      '오빌이 계속 비행기 관련 일을 했어요.',
      'Orville samolyotlar bilan ishlashda davom etdi.',
      'Orville continued to work with planes.',
      'Орвилл продолжил работать с самолётами.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['wright-siblings', 'reply'],
  },

  en_s1u8_n5_020_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Why were the Wright brothers famous?' },
    ],
    options: [
      'They created successful flying machines.',
      'They collected old tales.',
      'They worked as storytellers.',
      'They opened a newspaper in Germany.',
    ],
    answer: 'They created successful flying machines.',
    answerTranslation: L(
      '그들은 성공적인 비행 기계를 만들었기 때문이에요.',
      'Ular muvaffaqiyatli uchish mashinalarini yaratishgan.',
      'They created successful flying machines.',
      'Они создали успешные летательные аппараты.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['wright-siblings', 'dialog'],
  },

  // ===========================================================
  // Lesson 2 · Invention and flight
  // ===========================================================

  en_s1u8_n5_021_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'They invented their own bicycle.',
    audioText: 'They invented their own bicycle.',
    answerTranslation: L(
      '그들은 자신들만의 자전거를 발명했어요.',
      'Ular o‘z velosipedlarini ixtiro qilishdi.',
      'They invented their own bicycle.',
      'Они изобрели собственный велосипед.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['invent', 'past-simple'],
  },

  en_s1u8_n5_022_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'machine',
    choices: [
      { text: 'business', label: '💼', emoji: '💼', imageUrl: '' },
      { text: 'machine', label: '🏭', emoji: '🏭', imageUrl: '' },
      { text: 'company', label: '🏢', emoji: '🏢', imageUrl: '' },
      { text: 'tale', label: '📕', emoji: '📕', imageUrl: '' },
    ],
    answerTranslation: L('기계', 'mashina', 'machine', 'машина'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['machine'],
  },

  en_s1u8_n5_023_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'engine',
        native: 'dvigatel',
        nativeI18n: L('엔진', 'dvigatel', 'engine', 'двигатель'),
      },
      {
        text: 'propeller',
        native: 'parrak',
        nativeI18n: L('프로펠러', 'parrak', 'propeller', 'пропеллер'),
      },
      {
        text: 'flight',
        native: 'parvoz',
        nativeI18n: L('비행', 'parvoz', 'flight', 'полёт'),
      },
      {
        text: 'glider',
        native: 'planer',
        nativeI18n: L('글라이더', 'planer', 'glider', 'планер'),
      },
      {
        text: 'machine',
        native: 'mashina',
        nativeI18n: L('기계', 'mashina', 'machine', 'машина'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['flight', 'matching'],
  },

  en_s1u8_n5_024_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'Kitty',
      'Hawk',
      'to',
      'They',
      'moved',
      'in',
      '1900',
      'tested',
      'Ohio',
    ],
    answer: 'They moved to Kitty Hawk in 1900',
    answerTranslation: L(
      '그들은 1900년에 키티호크로 이사했어요.',
      'Ular 1900-yilda Kitty Hawkka ko‘chishdi.',
      'They moved to Kitty Hawk in 1900.',
      'В 1900 году они переехали в Китти-Хок.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['wright-siblings', 'past-time'],
  },

  en_s1u8_n5_025_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['1903', 'successful', 'were', 'They', 'in', 'tested', 'engine'],
    answer: 'They were successful in 1903',
    audioText: 'They were successful in 1903.',
    answerTranslation: L(
      '그들은 1903년에 성공했어요.',
      'Ular 1903-yilda muvaffaqiyatga erishishdi.',
      'They were successful in 1903.',
      'В 1903 году они добились успеха.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['successful', 'past-be'],
  },

  en_s1u8_n5_026_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'engine',
        native: 'dvigatel',
        nativeI18n: L('엔진', 'dvigatel', 'engine', 'двигатель'),
      },
      {
        text: 'propeller',
        native: 'parrak',
        nativeI18n: L('프로펠러', 'parrak', 'propeller', 'пропеллер'),
      },
      {
        text: 'flight',
        native: 'parvoz',
        nativeI18n: L('비행', 'parvoz', 'flight', 'полёт'),
      },
      {
        text: 'glider',
        native: 'planer',
        nativeI18n: L('글라이더', 'planer', 'glider', 'планер'),
      },
      {
        text: 'machine',
        native: 'mashina',
        nativeI18n: L('기계', 'mashina', 'machine', 'машина'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['flight', 'listening'],
  },

  en_s1u8_n5_027_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'They were ',
    sentenceSuffix: ' with the Wright Flyer I.',
    answer: 'successful',
    answerTranslation: L(
      '그들은 라이트 플라이어 1호로 성공했어요.',
      'Ular Wright Flyer I bilan muvaffaqiyatga erishishdi.',
      'They were successful with the Wright Flyer I.',
      'Они добились успеха с Wright Flyer I.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "successful".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'successful'],
  },

  en_s1u8_n5_028_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'engine',
    choices: [
      { text: 'company', label: '🏢', emoji: '🏢', imageUrl: '' },
      { text: 'engine', label: '⚙️', emoji: '⚙️', imageUrl: '' },
      { text: 'business', label: '💼', emoji: '💼', imageUrl: '' },
      { text: 'tale', label: '📕', emoji: '📕', imageUrl: '' },
    ],
    answerTranslation: L('엔진', 'dvigatel', 'engine', 'двигатель'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['engine'],
  },

  en_s1u8_n5_029_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'The aeroplane had an engine and a propeller.',
    audioText: 'The aeroplane had an engine and a propeller.',
    answerI18n: L(
      '그 비행기에는 엔진과 프로펠러가 있었어요',
      'Samolyotda dvigatel va parrak bor edi',
      'The aeroplane had an engine and a propeller',
      'У самолёта были двигатель и пропеллер',
    ),
    options: [
      'The',
      'aeroplane',
      'had',
      'an',
      'engine',
      'and',
      'a',
      'propeller',
      'company',
    ],
    optionsI18n: {
      ko: ['그', '비행기에는', '엔진과', '프로펠러가', '있었어요'],
      uz: ['Samolyotda', 'dvigatel', 'va', 'parrak', 'bor', 'edi'],
      en: ['The', 'aeroplane', 'had', 'an', 'engine', 'and', 'a', 'propeller'],
      ru: ['У', 'самолёта', 'были', 'двигатель', 'и', 'пропеллер'],
    },
    answerTranslation: L(
      '그 비행기에는 엔진과 프로펠러가 있었어요.',
      'Samolyotda dvigatel va parrak bor edi.',
      'The aeroplane had an engine and a propeller.',
      'У самолёта были двигатель и пропеллер.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['engine', 'propeller'],
  },

  en_s1u8_n5_030_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'How did Katharine help her brothers?',
    options: [
      'She',
      'helped',
      'them',
      'build',
      'the',
      'company',
      'tested',
      'engine',
    ],
    answer: 'She helped them build the company',
    answerTranslation: L(
      '그녀는 형제들이 회사를 만드는 것을 도왔어요.',
      'U ularga kompaniyani qurishda yordam berdi.',
      'She helped them build the company.',
      'Она помогла им создать компанию.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['katharine', 'object-pronouns'],
  },

  en_s1u8_n5_031_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'They built the Wright ',
    sentenceSuffix: '.',
    answer: 'company',
    answerTranslation: L(
      '그들은 라이트 회사를 만들었어요.',
      'Ular Rayt kompaniyasini qurdilar.',
      'They built the Wright company.',
      'Они создали компанию Райт.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "company".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'company'],
  },

  en_s1u8_n5_032_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'company',
        native: 'kompaniya',
        nativeI18n: L('회사', 'kompaniya', 'company', 'компания'),
      },
      {
        text: 'business',
        native: 'biznes',
        nativeI18n: L('사업', 'biznes', 'business', 'бизнес'),
      },
      {
        text: 'invent',
        native: 'ixtiro qilmoq',
        nativeI18n: L('발명하다', 'ixtiro qilmoq', 'invent', 'изобретать'),
      },
      {
        text: 'test',
        native: 'sinamoq',
        nativeI18n: L('시험하다', 'sinamoq', 'test', 'испытывать'),
      },
      {
        text: 'successful',
        native: 'muvaffaqiyatli',
        nativeI18n: L('성공적인', 'muvaffaqiyatli', 'successful', 'успешный'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['inventions', 'matching'],
  },

  en_s1u8_n5_033_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      '1912',
      'Wilbur',
      'died',
      'in',
      'Orville',
      'continued',
      'company',
    ],
    answer: 'Wilbur died in 1912',
    answerTranslation: L(
      '윌버는 1912년에 사망했어요.',
      'Wilbur 1912-yilda vafot etdi.',
      'Wilbur died in 1912.',
      'Уилбур умер в 1912 году.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['wright-siblings', 'past-time'],
  },

  en_s1u8_n5_034_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'company',
        native: 'kompaniya',
        nativeI18n: L('회사', 'kompaniya', 'company', 'компания'),
      },
      {
        text: 'business',
        native: 'biznes',
        nativeI18n: L('사업', 'biznes', 'business', 'бизнес'),
      },
      {
        text: 'invent',
        native: 'ixtiro qilmoq',
        nativeI18n: L('발명하다', 'ixtiro qilmoq', 'invent', 'изобретать'),
      },
      {
        text: 'test',
        native: 'sinamoq',
        nativeI18n: L('시험하다', 'sinamoq', 'test', 'испытывать'),
      },
      {
        text: 'successful',
        native: 'muvaffaqiyatli',
        nativeI18n: L('성공적인', 'muvaffaqiyatli', 'successful', 'успешный'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['inventions', 'listening'],
  },

  en_s1u8_n5_035_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'business',
    choices: [
      { text: 'engine', label: '⚙️', emoji: '⚙️', imageUrl: '' },
      { text: 'business', label: '💼', emoji: '💼', imageUrl: '' },
      { text: 'propeller', label: '🛩️', emoji: '🛩️', imageUrl: '' },
      { text: 'machine', label: '🏭', emoji: '🏭', imageUrl: '' },
    ],
    answerTranslation: L('사업', 'biznes', 'business', 'бизнес'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['business'],
  },

  en_s1u8_n5_036_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Orville ___ to work with planes.',
    blankAnswers: ['continued'],
    options: ['continued', 'continue', 'continues', 'continuing'],
    answer: 'continued',
    answerTranslation: L(
      '오빌은 계속 비행기 관련 일을 했어요.',
      'Orville samolyotlar bilan ishlashda davom etdi.',
      'Orville continued to work with planes.',
      'Орвилл продолжил работать с самолётами.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['past-simple', 'wright-siblings'],
  },

  en_s1u8_n5_037_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'The plane had a ',
    sentenceSuffix: '.',
    answer: 'propeller',
    answerTranslation: L(
      '그 비행기에는 프로펠러가 있었어요.',
      'Samolyotda parrak bor edi.',
      'The plane had a propeller.',
      'У самолёта был пропеллер.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "propeller".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['typing', 'propeller'],
  },

  en_s1u8_n5_038_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'Flyer',
      'III',
      'Wright',
      'the',
      'created',
      'brothers',
      'The',
      'engine',
      'tested',
    ],
    answer: 'The brothers created the Wright Flyer III',
    audioText: 'The brothers created the Wright Flyer III.',
    answerTranslation: L(
      '그 형제는 라이트 플라이어 3호를 만들었어요.',
      'Aka-ukalar Wright Flyer III ni yaratishdi.',
      'The brothers created the Wright Flyer III.',
      'Братья создали Wright Flyer III.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['wright-siblings', 'flight'],
  },

  en_s1u8_n5_039_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Where did the Wright siblings live?',
    options: ['They', 'lived', 'in', 'Dayton', 'Ohio', 'Kansas', 'Germany'],
    answer: 'They lived in Dayton Ohio',
    answerTranslation: L(
      '그들은 오하이오주 데이턴에 살았어요.',
      'Ular Ogayo shtatining Dayton shahrida yashagan.',
      'They lived in Dayton, Ohio.',
      'Они жили в Дейтоне, штат Огайо.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['wright-siblings', 'reply'],
  },

  en_s1u8_n5_040_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What did Katharine do later?' }],
    options: [
      'She married a journalist and moved to Kansas.',
      'She invented a book of tales.',
      'She became a propeller.',
      'She opened the University of Marburg.',
    ],
    answer: 'She married a journalist and moved to Kansas.',
    answerTranslation: L(
      '그녀는 기자와 결혼하고 캔자스로 이사했어요.',
      'U jurnalistga turmushga chiqib, Kansasga ko‘chdi.',
      'She married a journalist and moved to Kansas.',
      'Она вышла замуж за журналиста и переехала в Канзас.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['katharine', 'dialog'],
  },

  // ===========================================================
  // Lesson 3 · Unit 8 grammar review
  // ===========================================================

  en_s1u8_n5_041_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The Brothers Grimm were famous storytellers.',
    audioText: 'The Brothers Grimm were famous storytellers.',
    answerTranslation: L(
      '그림 형제는 유명한 이야기꾼이었어요.',
      'Aka-uka Grimmlar mashhur hikoyachilar edi.',
      'The Brothers Grimm were famous storytellers.',
      'Братья Гримм были известными рассказчиками.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['brothers-grimm', 'past-be'],
  },

  en_s1u8_n5_042_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'tale',
    choices: [
      { text: 'company', label: '🏢', emoji: '🏢', imageUrl: '' },
      { text: 'tale', label: '📕', emoji: '📕', imageUrl: '' },
      { text: 'engine', label: '⚙️', emoji: '⚙️', imageUrl: '' },
      { text: 'propeller', label: '🛩️', emoji: '🛩️', imageUrl: '' },
    ],
    answerTranslation: L('이야기', 'ertak', 'tale', 'сказка'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['tale'],
  },

  en_s1u8_n5_043_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'storyteller',
        native: 'hikoyachi',
        nativeI18n: L('이야기꾼', 'hikoyachi', 'storyteller', 'рассказчик'),
      },
      {
        text: 'tale',
        native: 'ertak',
        nativeI18n: L('이야기', 'ertak', 'tale', 'сказка'),
      },
      {
        text: 'collect',
        native: 'to‘plamoq',
        nativeI18n: L('모으다', 'to‘plamoq', 'collect', 'собирать'),
      },
      {
        text: 'publish',
        native: 'nashr qilmoq',
        nativeI18n: L('출판하다', 'nashr qilmoq', 'publish', 'издавать'),
      },
      {
        text: 'popular',
        native: 'mashhur',
        nativeI18n: L('인기 있는', 'mashhur', 'popular', 'популярный'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['brothers-grimm', 'matching'],
  },

  en_s1u8_n5_044_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['1785', 'Jacob', 'born', 'was', 'in', '1786', 'Wilhelm'],
    answer: 'Jacob was born in 1785',
    answerTranslation: L(
      '야코프는 1785년에 태어났어요.',
      'Jacob 1785-yilda tug‘ilgan.',
      'Jacob was born in 1785.',
      'Якоб родился в 1785 году.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['past-be', 'born'],
  },

  en_s1u8_n5_045_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'family',
      'the',
      'children',
      'nine',
      'were',
      'There',
      'was',
      'rich',
    ],
    answer: 'There were nine children in the family',
    audioText: 'There were nine children in the family.',
    answerTranslation: L(
      '그 가족에는 아이가 아홉 명 있었어요.',
      'Oilada to‘qqiz nafar bola bor edi.',
      'There were nine children in the family.',
      'В семье было девять детей.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['were', 'family'],
  },

  en_s1u8_n5_046_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'storyteller',
        native: 'hikoyachi',
        nativeI18n: L('이야기꾼', 'hikoyachi', 'storyteller', 'рассказчик'),
      },
      {
        text: 'tale',
        native: 'ertak',
        nativeI18n: L('이야기', 'ertak', 'tale', 'сказка'),
      },
      {
        text: 'collect',
        native: 'to‘plamoq',
        nativeI18n: L('모으다', 'to‘plamoq', 'collect', 'собирать'),
      },
      {
        text: 'publish',
        native: 'nashr qilmoq',
        nativeI18n: L('출판하다', 'nashr qilmoq', 'publish', 'издавать'),
      },
      {
        text: 'popular',
        native: 'mashhur',
        nativeI18n: L('인기 있는', 'mashhur', 'popular', 'популярный'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['brothers-grimm', 'listening'],
  },

  en_s1u8_n5_047_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'The Brothers Grimm ',
    sentenceSuffix: ' famous storytellers.',
    answer: 'were',
    answerTranslation: L(
      '그림 형제는 유명한 이야기꾼이었어요.',
      'Aka-uka Grimmlar mashhur hikoyachilar edi.',
      'The Brothers Grimm were famous storytellers.',
      'Братья Гримм были известными рассказчиками.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "were".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'were'],
  },

  en_s1u8_n5_048_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'storyteller',
    choices: [
      { text: 'pilot', label: '👩‍✈️', emoji: '👩‍✈️', imageUrl: '' },
      { text: 'carpenter', label: '🪚', emoji: '🪚', imageUrl: '' },
      { text: 'storyteller', label: '📚', emoji: '📚', imageUrl: '' },
      { text: 'scientist', label: '🔬', emoji: '🔬', imageUrl: '' },
    ],
    answerTranslation: L('이야기꾼', 'hikoyachi', 'storyteller', 'рассказчик'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['storyteller'],
  },

  en_s1u8_n5_049_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'They studied at the University of Marburg.',
    audioText: 'They studied at the University of Marburg.',
    answerI18n: L(
      '그들은 마르부르크 대학교에서 공부했어요',
      'Ular Marburg universitetida o‘qishdi',
      'They studied at the University of Marburg',
      'Они учились в Марбургском университете',
    ),
    options: [
      'They',
      'studied',
      'at',
      'the',
      'University',
      'of',
      'Marburg',
      'published',
    ],
    optionsI18n: {
      ko: ['그들은', '마르부르크', '대학교에서', '공부했어요'],
      uz: ['Ular', 'Marburg', 'universitetida', 'o‘qishdi'],
      en: ['They', 'studied', 'at', 'the', 'University', 'of', 'Marburg'],
      ru: ['Они', 'учились', 'в', 'Марбургском', 'университете'],
    },
    answerTranslation: L(
      '그들은 마르부르크 대학교에서 공부했어요.',
      'Ular Marburg universitetida o‘qishdi.',
      'They studied at the University of Marburg.',
      'Они учились в Марбургском университете.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['brothers-grimm', 'past-simple'],
  },

  en_s1u8_n5_050_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Were Jacob and Wilhelm rich?',
    options: ['No', 'they', 'were', 'not', 'rich', 'Yes', 'popular'],
    answer: 'No they were not rich',
    answerTranslation: L(
      '아니요, 그들은 부유하지 않았어요.',
      'Yo‘q, ular boy emas edi.',
      'No, they were not rich.',
      'Нет, они не были богатыми.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['past-be', 'reply'],
  },

  en_s1u8_n5_051_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Jacob and Wilhelm ',
    sentenceSuffix: ' at the University of Marburg.',
    answer: 'studied',
    answerTranslation: L(
      '야코프와 빌헬름은 마르부르크 대학교에서 공부했어요.',
      'Jacob va Wilhelm Marburg universitetida o‘qishdi.',
      'Jacob and Wilhelm studied at the University of Marburg.',
      'Якоб и Вильгельм учились в Марбургском университете.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is the past form "studied".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'past-simple'],
  },

  en_s1u8_n5_052_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'biography',
        native: 'biografiya',
        nativeI18n: L('일대기', 'biografiya', 'biography', 'биография'),
      },
      {
        text: 'pilot',
        native: 'uchuvchi',
        nativeI18n: L('조종사', 'uchuvchi', 'pilot', 'пилот'),
      },
      {
        text: 'competition',
        native: 'musobaqa',
        nativeI18n: L('대회', 'musobaqa', 'competition', 'соревнование'),
      },
      {
        text: 'article',
        native: 'maqola',
        nativeI18n: L('기사', 'maqola', 'article', 'статья'),
      },
      {
        text: 'charity',
        native: 'xayriya',
        nativeI18n: L('자선 활동', 'xayriya', 'charity', 'благотворительность'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit8-review', 'matching'],
  },

  en_s1u8_n5_053_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'book',
      'Their',
      'first',
      'was',
      'Children’s',
      'and',
      'Household',
      'Tales',
      'popular',
    ],
    answer: 'Their first book was Children’s and Household Tales',
    answerTranslation: L(
      '그들의 첫 번째 책은 《어린이와 가정을 위한 이야기》였어요.',
      'Ularning birinchi kitobi Children’s and Household Tales edi.',
      'Their first book was Children’s and Household Tales.',
      'Их первой книгой была Children’s and Household Tales.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['brothers-grimm', 'books'],
  },

  en_s1u8_n5_054_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'biography',
        native: 'biografiya',
        nativeI18n: L('일대기', 'biografiya', 'biography', 'биография'),
      },
      {
        text: 'pilot',
        native: 'uchuvchi',
        nativeI18n: L('조종사', 'uchuvchi', 'pilot', 'пилот'),
      },
      {
        text: 'competition',
        native: 'musobaqa',
        nativeI18n: L('대회', 'musobaqa', 'competition', 'соревнование'),
      },
      {
        text: 'article',
        native: 'maqola',
        nativeI18n: L('기사', 'maqola', 'article', 'статья'),
      },
      {
        text: 'charity',
        native: 'xayriya',
        nativeI18n: L('자선 활동', 'xayriya', 'charity', 'благотворительность'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['unit8-review', 'listening'],
  },

  en_s1u8_n5_055_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'popular',
    choices: [
      { text: 'successful', label: '✅', emoji: '✅', imageUrl: '' },
      { text: 'popular', label: '⭐', emoji: '⭐', imageUrl: '' },
      { text: 'engine', label: '⚙️', emoji: '⚙️', imageUrl: '' },
      { text: 'business', label: '💼', emoji: '💼', imageUrl: '' },
    ],
    answerTranslation: L('인기 있는', 'mashhur', 'popular', 'популярный'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['popular'],
  },

  en_s1u8_n5_056_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'They were interested in tales and started to ___ them.',
    blankAnswers: ['collect'],
    options: ['collect', 'publish', 'invent', 'test'],
    answer: 'collect',
    answerTranslation: L(
      '그들은 이야기에 관심이 있었고 그것들을 모으기 시작했어요.',
      'Ular ertaklarga qiziqib, ularni to‘plashni boshlashdi.',
      'They were interested in tales and started to collect them.',
      'Они интересовались сказками и начали их собирать.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['collect', 'tale'],
  },

  en_s1u8_n5_057_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Their book was very ',
    sentenceSuffix: '.',
    answer: 'popular',
    answerTranslation: L(
      '그들의 책은 매우 인기가 있었어요.',
      'Ularning kitobi juda mashhur edi.',
      'Their book was very popular.',
      'Их книга была очень популярной.',
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

  en_s1u8_n5_058_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['1863', 'Jacob', 'in', 'died', 'published', 'popular'],
    answer: 'Jacob died in 1863',
    audioText: 'Jacob died in 1863.',
    answerTranslation: L(
      '야코프는 1863년에 사망했어요.',
      'Jacob 1863-yilda vafot etdi.',
      'Jacob died in 1863.',
      'Якоб умер в 1863 году.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['brothers-grimm', 'past-time'],
  },

  en_s1u8_n5_059_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Were their stories for children at first?',
    options: ['No', 'they', 'were', 'not', 'at', 'first', 'Yes', 'popular'],
    answer: 'No they were not at first',
    answerTranslation: L(
      '아니요, 처음에는 그렇지 않았어요.',
      'Yo‘q, dastlab unday emas edi.',
      'No, they were not at first.',
      'Нет, сначала они были не для детей.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['brothers-grimm', 'reply'],
  },

  en_s1u8_n5_060_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Our neighbours had a young boy. Did your daughter play with him?',
      },
    ],
    options: [
      'Yes, she loved playing with him.',
      'Yes, she loved playing with he.',
      'Yes, she played with they.',
      'No, him played with her.',
    ],
    answer: 'Yes, she loved playing with him.',
    answerTranslation: L(
      '네, 딸은 그 아이와 노는 것을 아주 좋아했어요.',
      'Ha, qizim u bilan o‘ynashni juda yaxshi ko‘rardi.',
      'Yes, she loved playing with him.',
      'Да, она очень любила играть с ним.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['object-pronouns', 'him'],
  },

  // ===========================================================
  // Lesson 4 · Unit 8 final review
  // ===========================================================

  en_s1u8_n5_061_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Good luck with your exam!',
    audioText: 'Good luck with your exam!',
    answerTranslation: L(
      '시험 잘 보세요!',
      'Imtihoningizga omad!',
      'Good luck with your exam!',
      'Удачи на экзамене!',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['unit8-review', 'good-luck'],
  },

  en_s1u8_n5_062_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'biography',
    choices: [
      { text: 'competition', label: '🏆', emoji: '🏆', imageUrl: '' },
      { text: 'biography', label: '📖', emoji: '📖', imageUrl: '' },
      { text: 'engine', label: '⚙️', emoji: '⚙️', imageUrl: '' },
      { text: 'charity', label: '❤️', emoji: '❤️', imageUrl: '' },
    ],
    answerTranslation: L('일대기', 'biografiya', 'biography', 'биография'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['biography'],
  },

  en_s1u8_n5_063_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'biography',
        native: 'biografiya',
        nativeI18n: L('일대기', 'biografiya', 'biography', 'биография'),
      },
      {
        text: 'career',
        native: 'karyera',
        nativeI18n: L('경력', 'karyera', 'career', 'карьера'),
      },
      {
        text: 'prize',
        native: 'mukofot',
        nativeI18n: L('상', 'mukofot', 'prize', 'приз'),
      },
      {
        text: 'newspaper',
        native: 'gazeta',
        nativeI18n: L('신문', 'gazeta', 'newspaper', 'газета'),
      },
      {
        text: 'charity',
        native: 'xayriya',
        nativeI18n: L('자선 활동', 'xayriya', 'charity', 'благотворительность'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit8-review', 'matching'],
  },

  en_s1u8_n5_064_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['1966', 'mother', 'My', 'born', 'was', 'in', 'on', 'last'],
    answer: 'My mother was born in 1966',
    answerTranslation: L(
      '제 어머니는 1966년에 태어났어요.',
      'Onam 1966-yilda tug‘ilgan.',
      'My mother was born in 1966.',
      'Моя мама родилась в 1966 году.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit8-review', 'born', 'dates'],
  },

  en_s1u8_n5_065_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['Monday', 'job', 'new', 'his', 'started', 'Yves', 'on', 'last'],
    answer: 'Yves started his new job on Monday',
    audioText: 'Yves started his new job on Monday.',
    answerTranslation: L(
      '이브는 월요일에 새 일을 시작했어요.',
      'Yves dushanba kuni yangi ishini boshladi.',
      'Yves started his new job on Monday.',
      'Ив начал новую работу в понедельник.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['past-time', 'on-monday'],
  },

  en_s1u8_n5_066_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'biography',
        native: 'biografiya',
        nativeI18n: L('일대기', 'biografiya', 'biography', 'биография'),
      },
      {
        text: 'career',
        native: 'karyera',
        nativeI18n: L('경력', 'karyera', 'career', 'карьера'),
      },
      {
        text: 'prize',
        native: 'mukofot',
        nativeI18n: L('상', 'mukofot', 'prize', 'приз'),
      },
      {
        text: 'newspaper',
        native: 'gazeta',
        nativeI18n: L('신문', 'gazeta', 'newspaper', 'газета'),
      },
      {
        text: 'charity',
        native: 'xayriya',
        nativeI18n: L('자선 활동', 'xayriya', 'charity', 'благотворительность'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['unit8-review', 'listening'],
  },

  en_s1u8_n5_067_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'My mother was born ',
    sentenceSuffix: ' 1966.',
    answer: 'in',
    answerTranslation: L(
      '제 어머니는 1966년에 태어났어요.',
      'Onam 1966-yilda tug‘ilgan.',
      'My mother was born in 1966.',
      'Моя мама родилась в 1966 году.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English preposition is "in".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'dates'],
  },

  en_s1u8_n5_068_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'luck',
    choices: [
      { text: 'cheers', label: '🥂', emoji: '🥂', imageUrl: '' },
      { text: 'luck', label: '🍀', emoji: '🍀', imageUrl: '' },
      { text: 'career', label: '💼', emoji: '💼', imageUrl: '' },
      { text: 'prize', label: '🏅', emoji: '🏅', imageUrl: '' },
    ],
    answerTranslation: L('행운', 'omad', 'luck', 'удача'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['luck'],
  },

  en_s1u8_n5_069_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'You showed me your photos last week.',
    audioText: 'You showed me your photos last week.',
    answerI18n: L(
      '당신은 지난주에 저에게 사진을 보여 줬어요',
      'Siz o‘tgan hafta menga suratlaringizni ko‘rsatdingiz',
      'You showed me your photos last week',
      'На прошлой неделе вы показали мне свои фотографии',
    ),
    options: ['You', 'showed', 'me', 'your', 'photos', 'last', 'week', 'them'],
    optionsI18n: {
      ko: ['당신은', '지난주에', '저에게', '사진을', '보여', '줬어요'],
      uz: [
        'Siz',
        'o‘tgan',
        'hafta',
        'menga',
        'suratlaringizni',
        'ko‘rsatdingiz',
      ],
      en: ['You', 'showed', 'me', 'your', 'photos', 'last', 'week'],
      ru: [
        'На',
        'прошлой',
        'неделе',
        'вы',
        'показали',
        'мне',
        'свои',
        'фотографии',
      ],
    },
    answerTranslation: L(
      '당신은 지난주에 저에게 사진을 보여 줬어요.',
      'Siz o‘tgan hafta menga suratlaringizni ko‘rsatdingiz.',
      'You showed me your photos last week.',
      'На прошлой неделе вы показали мне свои фотографии.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['object-pronouns', 'past-time'],
  },

  en_s1u8_n5_070_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'My exam is on Tuesday at two o’clock.',
    options: ['Good', 'luck', 'That', 'is', 'great', 'Never', 'mind'],
    answer: 'Good luck',
    answerTranslation: L('행운을 빌어요!', 'Omad!', 'Good luck!', 'Удачи!'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['good-luck', 'reply'],
  },

  en_s1u8_n5_071_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'You showed me your photos ',
    sentenceSuffix: ' week.',
    answer: 'last',
    answerTranslation: L(
      '당신은 지난주에 저에게 사진을 보여 줬어요.',
      'Siz o‘tgan hafta menga suratlaringizni ko‘rsatdingiz.',
      'You showed me your photos last week.',
      'На прошлой неделе вы показали мне свои фотографии.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English word is "last".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['typing', 'past-time'],
  },

  en_s1u8_n5_072_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'luck',
        native: 'omad',
        nativeI18n: L('행운', 'omad', 'luck', 'удача'),
      },
      {
        text: 'congratulations',
        native: 'tabrik',
        nativeI18n: L('축하', 'tabrik', 'congratulations', 'поздравление'),
      },
      {
        text: 'cheers',
        native: 'sog‘ bo‘ling',
        nativeI18n: L('건배', 'sog‘ bo‘ling', 'cheers', 'за здоровье'),
      },
      {
        text: 'occasion',
        native: 'tadbir',
        nativeI18n: L('행사', 'tadbir', 'occasion', 'событие'),
      },
      {
        text: 'biography',
        native: 'biografiya',
        nativeI18n: L('일대기', 'biografiya', 'biography', 'биография'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit8-review', 'matching'],
  },

  en_s1u8_n5_073_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'After',
      'that',
      'we',
      'watched',
      'a',
      'film',
      'on',
      'TV',
      'Then',
      'photos',
    ],
    answer: 'After that we watched a film on TV',
    answerTranslation: L(
      '그 후 우리는 TV로 영화를 봤어요.',
      'Shundan keyin biz televizorda film ko‘rdik.',
      'After that, we watched a film on TV.',
      'После этого мы посмотрели фильм по телевизору.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['sequencers', 'after-that'],
  },

  en_s1u8_n5_074_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'luck',
        native: 'omad',
        nativeI18n: L('행운', 'omad', 'luck', 'удача'),
      },
      {
        text: 'congratulations',
        native: 'tabrik',
        nativeI18n: L('축하', 'tabrik', 'congratulations', 'поздравление'),
      },
      {
        text: 'cheers',
        native: 'sog‘ bo‘ling',
        nativeI18n: L('건배', 'sog‘ bo‘ling', 'cheers', 'за здоровье'),
      },
      {
        text: 'occasion',
        native: 'tadbir',
        nativeI18n: L('행사', 'tadbir', 'occasion', 'событие'),
      },
      {
        text: 'biography',
        native: 'biografiya',
        nativeI18n: L('일대기', 'biografiya', 'biography', 'биография'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['unit8-review', 'listening'],
  },

  en_s1u8_n5_075_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'congratulations',
    choices: [
      { text: 'luck', label: '🍀', emoji: '🍀', imageUrl: '' },
      { text: 'cheers', label: '🥂', emoji: '🥂', imageUrl: '' },
      { text: 'congratulations', label: '🎉', emoji: '🎉', imageUrl: '' },
      { text: 'career', label: '💼', emoji: '💼', imageUrl: '' },
    ],
    answerTranslation: L('축하', 'tabrik', 'congratulations', 'поздравление'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['congratulations'],
  },

  en_s1u8_n5_076_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'My parents weren’t at home, so I called ___ three times.',
    blankAnswers: ['them'],
    options: ['them', 'they', 'their', 'we'],
    answer: 'them',
    answerTranslation: L(
      '부모님이 집에 안 계셔서 저는 세 번 전화했어요.',
      'Ota-onam uyda emas edi, shuning uchun men ularga uch marta telefon qildim.',
      'My parents weren’t at home, so I called them three times.',
      'Моих родителей не было дома, поэтому я позвонил им три раза.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['object-pronouns', 'them'],
  },

  en_s1u8_n5_077_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'My parents weren’t at home, so I called ',
    sentenceSuffix: ' three times.',
    answer: 'them',
    answerTranslation: L(
      '부모님이 집에 안 계셔서 저는 세 번 전화했어요.',
      'Ota-onam uyda emas edi, shuning uchun men ularga uch marta telefon qildim.',
      'My parents weren’t at home, so I called them three times.',
      'Моих родителей не было дома, поэтому я позвонил им три раза.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The missing English object pronoun is "them".',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['typing', 'object-pronouns'],
  },

  en_s1u8_n5_078_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'home',
      'walked',
      'then',
      'we',
      'friend',
      'my',
      'for',
      'waited',
      'I',
      'and',
    ],
    answer: 'I waited for my friend and then we walked home',
    audioText: 'I waited for my friend, and then we walked home.',
    answerTranslation: L(
      '저는 친구를 기다렸고 그다음 함께 집까지 걸어갔어요.',
      'Men do‘stimni kutdim, keyin biz uyga piyoda bordik.',
      'I waited for my friend, and then we walked home.',
      'Я подождал друга, а затем мы пошли домой пешком.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['sequencers', 'then'],
  },

  en_s1u8_n5_079_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Sorry. I finished the coffee.',
    options: ['Never', 'mind', 'Good', 'luck', 'That', 'is', 'great'],
    answer: 'Never mind',
    answerTranslation: L(
      '괜찮아요.',
      'Hechqisi yo‘q.',
      'Never mind.',
      'Ничего страшного.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['never-mind', 'reply'],
  },

  en_s1u8_n5_080_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Rob’s son is nine years old and he can speak four languages!',
      },
    ],
    options: [
      'Really?',
      'Never mind.',
      'I’m sorry to hear that.',
      'Good luck!',
    ],
    answer: 'Really?',
    answerTranslation: L('정말요?', 'Rostdanmi?', 'Really?', 'Правда?'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['surprising-news', 'unit8-review', 'final'],
  },
};

export const EN_S1_UNIT8_NODE5 = {
  title: L(
    '라이트 형제자매',
    'Rayt aka-uka va opa-singillari',
    'The Wright siblings',
    'Братья и сестра Райт',
  ),
  section: 1,
  unit: 8,
  order: 5,
  isActive: true,

  lessons: [
    {
      title: L(
        '라이트 형제자매 이야기',
        'Raytlar hikoyasi',
        'The Wright siblings',
        'История семьи Райт',
      ),
      description: L(
        '라이트 형제자매의 삶을 따라가며 엔진, 프로펠러, 글라이더와 발명에 관한 핵심 단어를 배워요.',
        'Raytlar hayoti orqali dvigatel, parrak, planer va ixtirolarga oid asosiy so‘zlarni o‘rganasiz.',
        'Follow the Wright siblings’ story and learn key vocabulary about engines, propellers, gliders and inventions.',
        'Изучаем историю семьи Райт и лексику об двигателях, пропеллерах, планерах и изобретениях.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 1,
      questions: [
        'en_s1u8_n5_001_speaking',
        'en_s1u8_n5_002_image_choice',
        'en_s1u8_n5_003_word_matching',
        'en_s1u8_n5_004_translate_builder',
        'en_s1u8_n5_005_word_arrange',
        'en_s1u8_n5_006_audio_match',
        'en_s1u8_n5_007_type_answer',
        'en_s1u8_n5_008_image_choice',
        'en_s1u8_n5_009_sentence_builder',
        'en_s1u8_n5_010_reply_builder',
        'en_s1u8_n5_011_type_answer',
        'en_s1u8_n5_012_word_matching',
        'en_s1u8_n5_013_translate_builder',
        'en_s1u8_n5_014_audio_match',
        'en_s1u8_n5_015_image_choice',
        'en_s1u8_n5_016_fill_in_blank',
        'en_s1u8_n5_017_type_answer',
        'en_s1u8_n5_018_word_arrange',
        'en_s1u8_n5_019_reply_builder',
        'en_s1u8_n5_020_dialog_complete',
      ],
    },

    {
      title: L(
        '발명과 비행',
        'Ixtiro va parvoz',
        'Invention and flight',
        'Изобретения и полёт',
      ),
      description: L(
        'invent, test, successful 같은 단어와 과거형을 사용해 라이트 형제의 발명 과정을 설명해요.',
        'Invent, test va successful kabi so‘zlar hamda o‘tgan zamon bilan Raytlarning ixtiro jarayonini tasvirlaysiz.',
        'Use words such as invent, test and successful with the past tense to describe the Wright brothers’ work.',
        'Используем invent, test, successful и прошедшее время, чтобы рассказать о работе братьев Райт.',
      ),
      category: LessonCategory.EXPRESSION,
      level: LV,
      order: 2,
      questions: [
        'en_s1u8_n5_021_speaking',
        'en_s1u8_n5_022_image_choice',
        'en_s1u8_n5_023_word_matching',
        'en_s1u8_n5_024_translate_builder',
        'en_s1u8_n5_025_word_arrange',
        'en_s1u8_n5_026_audio_match',
        'en_s1u8_n5_027_type_answer',
        'en_s1u8_n5_028_image_choice',
        'en_s1u8_n5_029_sentence_builder',
        'en_s1u8_n5_030_reply_builder',
        'en_s1u8_n5_031_type_answer',
        'en_s1u8_n5_032_word_matching',
        'en_s1u8_n5_033_translate_builder',
        'en_s1u8_n5_034_audio_match',
        'en_s1u8_n5_035_image_choice',
        'en_s1u8_n5_036_fill_in_blank',
        'en_s1u8_n5_037_type_answer',
        'en_s1u8_n5_038_word_arrange',
        'en_s1u8_n5_039_reply_builder',
        'en_s1u8_n5_040_dialog_complete',
      ],
    },

    {
      title: L(
        '유닛 8 문법 복습',
        '8-unit grammatika takrorlash',
        'Unit 8 grammar review',
        'Повторение грамматики раздела 8',
      ),
      description: L(
        'was/were, 규칙동사 과거형, 목적격 대명사와 과거 인물 이야기를 함께 복습해요.',
        'Was/were, muntazam fe’llarning o‘tgan zamoni, obyekt olmoshlari va o‘tmishdagi insonlar haqidagi hikoyalarni takrorlaysiz.',
        'Review was/were, regular past verbs, object pronouns and stories about people from the past.',
        'Повторяем was/were, правильные глаголы прошедшего времени, объектные местоимения и истории о прошлом.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 3,
      questions: [
        'en_s1u8_n5_041_speaking',
        'en_s1u8_n5_042_image_choice',
        'en_s1u8_n5_043_word_matching',
        'en_s1u8_n5_044_translate_builder',
        'en_s1u8_n5_045_word_arrange',
        'en_s1u8_n5_046_audio_match',
        'en_s1u8_n5_047_type_answer',
        'en_s1u8_n5_048_image_choice',
        'en_s1u8_n5_049_sentence_builder',
        'en_s1u8_n5_050_reply_builder',
        'en_s1u8_n5_051_type_answer',
        'en_s1u8_n5_052_word_matching',
        'en_s1u8_n5_053_translate_builder',
        'en_s1u8_n5_054_audio_match',
        'en_s1u8_n5_055_image_choice',
        'en_s1u8_n5_056_fill_in_blank',
        'en_s1u8_n5_057_type_answer',
        'en_s1u8_n5_058_word_arrange',
        'en_s1u8_n5_059_reply_builder',
        'en_s1u8_n5_060_dialog_complete',
      ],
    },

    {
      title: L(
        '유닛 8 종합 복습',
        '8-unit umumiy takrorlash',
        'Unit 8 final review',
        'Итоговое повторение раздела 8',
      ),
      description: L(
        '날짜, 과거 시간 표현, 목적격 대명사, 사건 순서와 특별한 상황의 반응까지 Unit 8의 핵심을 종합 복습해요.',
        'Sanalar, o‘tgan zamon vaqt ifodalari, obyekt olmoshlari, voqealar ketma-ketligi va maxsus vaziyatlarga javoblarni umumiy takrorlaysiz.',
        'Review dates, past-time expressions, object pronouns, sequencing and responses for special occasions.',
        'Повторяем даты, выражения прошедшего времени, объектные местоимения, порядок событий и реакции в особых ситуациях.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 4,
      questions: [
        'en_s1u8_n5_061_speaking',
        'en_s1u8_n5_062_image_choice',
        'en_s1u8_n5_063_word_matching',
        'en_s1u8_n5_064_translate_builder',
        'en_s1u8_n5_065_word_arrange',
        'en_s1u8_n5_066_audio_match',
        'en_s1u8_n5_067_type_answer',
        'en_s1u8_n5_068_image_choice',
        'en_s1u8_n5_069_sentence_builder',
        'en_s1u8_n5_070_reply_builder',
        'en_s1u8_n5_071_type_answer',
        'en_s1u8_n5_072_word_matching',
        'en_s1u8_n5_073_translate_builder',
        'en_s1u8_n5_074_audio_match',
        'en_s1u8_n5_075_image_choice',
        'en_s1u8_n5_076_fill_in_blank',
        'en_s1u8_n5_077_type_answer',
        'en_s1u8_n5_078_word_arrange',
        'en_s1u8_n5_079_reply_builder',
        'en_s1u8_n5_080_dialog_complete',
      ],
    },
  ],
};
