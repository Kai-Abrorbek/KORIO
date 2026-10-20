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
// Section 1 · Unit 2 · Node 1
// 2.1 What's this in English?
//
// 4 lessons × 20 questions = 80
//
// Lesson 1: Objects + singular / plural
// Lesson 2: this / that / these / those + it / they
// Lesson 3: Numbers 11–100
// Lesson 4: Integrated listening & speaking
// ─────────────────────────────────────────────────────────────

const REPLY_INSTRUCTION = L(
  '상대의 말을 듣고 알맞은 대답을 만드세요.',
  'Suhbatdoshning gapini tinglab, mos javob tuzing.',
  'Listen and build the correct reply.',
  'Послушайте собеседника и составьте подходящий ответ.',
);

export const EN_S1_UNIT2_NODE1_WORDS = [
  {
    code: 'en-object-apple',
    english: 'apple',
    senseKey: 'fruit',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('사과', 'olma', 'a round fruit', 'яблоко'),
    examples: [
      {
        english: 'It’s an apple.',
        translations: L(
          '그것은 사과예요.',
          'Bu olma.',
          'It’s an apple.',
          'Это яблоко.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈæpl/',
      ttsText: 'apple',
    },
    media: {
      emoji: '🍎',
      imageUrl: '',
      imageAlt: L('사과', 'olma', 'an apple', 'яблоко'),
    },
    tags: ['objects', 'food'],
    difficulty: 1,
    usageNote: L(
      'apple 앞에는 an을 써요.',
      'apple oldidan an ishlatiladi.',
      'Use an before apple.',
      'Перед apple используется an.',
    ),
    isCore: true,
  },

  {
    code: 'en-object-book',
    english: 'book',
    senseKey: 'reading-object',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('책', 'kitob', 'a set of written pages', 'книга'),
    examples: [
      {
        english: 'It’s a book.',
        translations: L(
          '그것은 책이에요.',
          'Bu kitob.',
          'It’s a book.',
          'Это книга.',
        ),
      },
      {
        english: 'They’re books.',
        translations: L(
          '그것들은 책이에요.',
          'Bular kitoblar.',
          'They’re books.',
          'Это книги.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/bʊk/',
      ttsText: 'book',
    },
    media: {
      emoji: '📕',
      imageUrl: '',
      imageAlt: L('책', 'kitob', 'a book', 'книга'),
    },
    tags: ['objects', 'classroom'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-object-key',
    english: 'key',
    senseKey: 'door-key',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('열쇠', 'kalit', 'an object used to open a lock', 'ключ'),
    examples: [
      {
        english: 'These are keys.',
        translations: L(
          '이것들은 열쇠예요.',
          'Bular kalitlar.',
          'These are keys.',
          'Это ключи.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/kiː/',
      ttsText: 'key',
    },
    media: {
      emoji: '🔑',
      imageUrl: '',
      imageAlt: L('열쇠', 'kalit', 'a key', 'ключ'),
    },
    tags: ['objects'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-object-laptop',
    english: 'laptop',
    senseKey: 'portable-computer',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('노트북 컴퓨터', 'noutbuk', 'a portable computer', 'ноутбук'),
    examples: [
      {
        english: 'That’s a laptop.',
        translations: L(
          '저것은 노트북이에요.',
          'U noutbuk.',
          'That’s a laptop.',
          'Это ноутбук.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈlæptɒp/',
      ttsText: 'laptop',
    },
    media: {
      emoji: '💻',
      imageUrl: '',
      imageAlt: L('노트북', 'noutbuk', 'a laptop', 'ноутбук'),
    },
    tags: ['objects', 'technology'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-object-notepad',
    english: 'notepad',
    senseKey: 'writing-pad',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '메모장',
      'bloknot',
      'a small pad of paper for notes',
      'блокнот',
    ),
    examples: [
      {
        english: 'It’s a notepad.',
        translations: L(
          '그것은 메모장이에요.',
          'Bu bloknot.',
          'It’s a notepad.',
          'Это блокнот.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈnəʊtpæd/',
      ttsText: 'notepad',
    },
    media: {
      emoji: '🗒️',
      imageUrl: '',
      imageAlt: L('메모장', 'bloknot', 'a notepad', 'блокнот'),
    },
    tags: ['objects', 'classroom'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-object-pen',
    english: 'pen',
    senseKey: 'writing-tool',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('펜', 'ruchka', 'an object used for writing', 'ручка'),
    examples: [
      {
        english: 'They’re pens.',
        translations: L(
          '그것들은 펜이에요.',
          'Bular ruchkalar.',
          'They’re pens.',
          'Это ручки.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/pen/',
      ttsText: 'pen',
    },
    media: {
      emoji: '🖊️',
      imageUrl: '',
      imageAlt: L('펜', 'ruchka', 'a pen', 'ручка'),
    },
    tags: ['objects', 'classroom'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-object-phone',
    english: 'phone',
    senseKey: 'mobile-phone',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('전화기; 휴대전화', 'telefon', 'a telephone', 'телефон'),
    examples: [
      {
        english: 'Those are phones.',
        translations: L(
          '저것들은 전화기예요.',
          'Anavilar telefonlar.',
          'Those are phones.',
          'Вон те — телефоны.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/fəʊn/',
      ttsText: 'phone',
    },
    media: {
      emoji: '📱',
      imageUrl: '',
      imageAlt: L('휴대전화', 'telefon', 'a phone', 'телефон'),
    },
    tags: ['objects', 'technology'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-object-tablet',
    english: 'tablet',
    senseKey: 'tablet-computer',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '태블릿 컴퓨터',
      'planshet',
      'a small flat computer with a touch screen',
      'планшет',
    ),
    examples: [
      {
        english: 'What’s this? It’s a tablet.',
        translations: L(
          '이게 뭐예요? 태블릿이에요.',
          'Bu nima? Bu planshet.',
          'What’s this? It’s a tablet.',
          'Что это? Это планшет.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈtæblət/',
      ttsText: 'tablet',
    },
    media: {
      emoji: '📱',
      imageUrl: '',
      imageAlt: L('태블릿', 'planshet', 'a tablet', 'планшет'),
    },
    tags: ['objects', 'technology'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-object-umbrella',
    english: 'umbrella',
    senseKey: 'rain-cover',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '우산',
      'soyabon',
      'an object used for protection from rain',
      'зонт',
    ),
    examples: [
      {
        english: 'It’s an umbrella.',
        translations: L(
          '그것은 우산이에요.',
          'Bu soyabon.',
          'It’s an umbrella.',
          'Это зонт.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ʌmˈbrelə/',
      ttsText: 'umbrella',
    },
    media: {
      emoji: '☂️',
      imageUrl: '',
      imageAlt: L('우산', 'soyabon', 'an umbrella', 'зонт'),
    },
    tags: ['objects'],
    difficulty: 1,
    usageNote: L(
      'umbrella 앞에는 an을 써요.',
      'umbrella oldidan an ishlatiladi.',
      'Use an before umbrella.',
      'Перед umbrella используется an.',
    ),
    isCore: true,
  },

  {
    code: 'en-object-wallet',
    english: 'wallet',
    senseKey: 'money-holder',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('지갑', 'hamyon', 'a small case for money and cards', 'кошелёк'),
    examples: [
      {
        english: 'Those are wallets.',
        translations: L(
          '저것들은 지갑이에요.',
          'Anavilar hamyonlar.',
          'Those are wallets.',
          'Вон те — кошельки.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈwɒlɪt/',
      ttsText: 'wallet',
    },
    media: {
      emoji: '👛',
      imageUrl: '',
      imageAlt: L('지갑', 'hamyon', 'a wallet', 'кошелёк'),
    },
    tags: ['objects'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-demonstrative-this',
    english: 'this',
    senseKey: 'near-singular',
    partOfSpeech: WordPartOfSpeech.PRONOUN,
    meaning: L(
      '이것; 이',
      'bu',
      'used for one thing near the speaker',
      'это; этот',
    ),
    examples: [
      {
        english: 'What’s this?',
        translations: L('이게 뭐예요?', 'Bu nima?', 'What’s this?', 'Что это?'),
      },
    ],
    pronunciation: {
      ipa: '/ðɪs/',
      ttsText: 'this',
    },
    media: {
      emoji: '👇',
      imageUrl: '',
      imageAlt: L(
        '가까이 있는 한 물건',
        'yaqindagi bitta buyum',
        'one nearby object',
        'один предмет рядом',
      ),
    },
    tags: ['grammar', 'demonstratives'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-demonstrative-that',
    english: 'that',
    senseKey: 'far-singular',
    partOfSpeech: WordPartOfSpeech.PRONOUN,
    meaning: L(
      '저것; 그',
      'u; ana u',
      'used for one thing farther from the speaker',
      'то; тот',
    ),
    examples: [
      {
        english: 'What’s that?',
        translations: L(
          '저게 뭐예요?',
          'U nima?',
          'What’s that?',
          'Что это там?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ðæt/',
      ttsText: 'that',
    },
    media: {
      emoji: '👉',
      imageUrl: '',
      imageAlt: L(
        '멀리 있는 한 물건',
        'uzoqdagi bitta buyum',
        'one distant object',
        'один предмет вдали',
      ),
    },
    tags: ['grammar', 'demonstratives'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-demonstrative-these',
    english: 'these',
    senseKey: 'near-plural',
    partOfSpeech: WordPartOfSpeech.PRONOUN,
    meaning: L(
      '이것들; 이 사람들',
      'bular',
      'used for two or more things near the speaker',
      'эти',
    ),
    examples: [
      {
        english: 'What are these?',
        translations: L(
          '이것들은 뭐예요?',
          'Bular nima?',
          'What are these?',
          'Что это?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ðiːz/',
      ttsText: 'these',
    },
    media: {
      emoji: '👇',
      imageUrl: '',
      imageAlt: L(
        '가까이 있는 여러 물건',
        'yaqindagi bir nechta buyum',
        'several nearby objects',
        'несколько предметов рядом',
      ),
    },
    tags: ['grammar', 'demonstratives'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-demonstrative-those',
    english: 'those',
    senseKey: 'far-plural',
    partOfSpeech: WordPartOfSpeech.PRONOUN,
    meaning: L(
      '저것들; 그 사람들',
      'anavilar',
      'used for two or more things farther from the speaker',
      'те',
    ),
    examples: [
      {
        english: 'What are those?',
        translations: L(
          '저것들은 뭐예요?',
          'Anavilar nima?',
          'What are those?',
          'Что это там?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ðəʊz/',
      ttsText: 'those',
    },
    media: {
      emoji: '👉',
      imageUrl: '',
      imageAlt: L(
        '멀리 있는 여러 물건',
        'uzoqdagi bir nechta buyum',
        'several distant objects',
        'несколько предметов вдали',
      ),
    },
    tags: ['grammar', 'demonstratives'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-pronoun-it',
    english: 'it',
    senseKey: 'third-person-singular-thing',
    partOfSpeech: WordPartOfSpeech.PRONOUN,
    meaning: L('그것', 'u', 'a pronoun for one thing', 'оно; это'),
    examples: [
      {
        english: 'It’s a phone.',
        translations: L(
          '그것은 전화기예요.',
          'U telefon.',
          'It’s a phone.',
          'Это телефон.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɪt/',
      ttsText: 'it',
    },
    media: {
      emoji: '1️⃣',
      imageUrl: '',
      imageAlt: L('한 물건', 'bitta buyum', 'one thing', 'один предмет'),
    },
    tags: ['grammar', 'pronoun'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-pronoun-they',
    english: 'they',
    senseKey: 'third-person-plural',
    partOfSpeech: WordPartOfSpeech.PRONOUN,
    meaning: L(
      '그들; 그것들',
      'ular',
      'a pronoun for two or more people or things',
      'они',
    ),
    examples: [
      {
        english: 'They’re keys.',
        translations: L(
          '그것들은 열쇠예요.',
          'Ular kalitlar.',
          'They’re keys.',
          'Это ключи.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ðeɪ/',
      ttsText: 'they',
    },
    media: {
      emoji: '🔢',
      imageUrl: '',
      imageAlt: L(
        '여러 물건',
        'bir nechta buyum',
        'several things',
        'несколько предметов',
      ),
    },
    tags: ['grammar', 'pronoun'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-number-eleven',
    english: 'eleven',
    senseKey: 'number-11',
    partOfSpeech: WordPartOfSpeech.NUMERAL,
    meaning: L('열하나; 11', 'o‘n bir; 11', 'the number 11', 'одиннадцать; 11'),
    examples: [
      {
        english: 'Eleven books.',
        translations: L(
          '책 열한 권.',
          'O‘n bir kitob.',
          'Eleven books.',
          'Одиннадцать книг.',
        ),
      },
    ],
    pronunciation: { ipa: '/ɪˈlevn/', ttsText: 'eleven' },
    media: {
      emoji: '1️⃣1️⃣',
      imageUrl: '',
      imageAlt: L('숫자 11', '11 raqami', 'the number 11', 'число 11'),
    },
    tags: ['numbers', 'eleven-to-hundred'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-number-twelve',
    english: 'twelve',
    senseKey: 'number-12',
    partOfSpeech: WordPartOfSpeech.NUMERAL,
    meaning: L('열둘; 12', 'o‘n ikki; 12', 'the number 12', 'двенадцать; 12'),
    examples: [
      {
        english: 'Twelve pens.',
        translations: L(
          '펜 열두 개.',
          'O‘n ikki ruchka.',
          'Twelve pens.',
          'Двенадцать ручек.',
        ),
      },
    ],
    pronunciation: { ipa: '/twelv/', ttsText: 'twelve' },
    media: {
      emoji: '1️⃣2️⃣',
      imageUrl: '',
      imageAlt: L('숫자 12', '12 raqami', 'the number 12', 'число 12'),
    },
    tags: ['numbers', 'eleven-to-hundred'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-number-thirteen',
    english: 'thirteen',
    senseKey: 'number-13',
    partOfSpeech: WordPartOfSpeech.NUMERAL,
    meaning: L('열셋; 13', 'o‘n uch; 13', 'the number 13', 'тринадцать; 13'),
    examples: [
      {
        english: 'Thirteen phones.',
        translations: L(
          '전화기 열세 개.',
          'O‘n uch telefon.',
          'Thirteen phones.',
          'Тринадцать телефонов.',
        ),
      },
    ],
    pronunciation: { ipa: '/ˌθɜːˈtiːn/', ttsText: 'thirteen' },
    media: {
      emoji: '1️⃣3️⃣',
      imageUrl: '',
      imageAlt: L('숫자 13', '13 raqami', 'the number 13', 'число 13'),
    },
    tags: ['numbers', 'teen'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-number-fourteen',
    english: 'fourteen',
    senseKey: 'number-14',
    partOfSpeech: WordPartOfSpeech.NUMERAL,
    meaning: L(
      '열넷; 14',
      'o‘n to‘rt; 14',
      'the number 14',
      'четырнадцать; 14',
    ),
    examples: [
      {
        english: 'Fourteen keys.',
        translations: L(
          '열쇠 열네 개.',
          'O‘n to‘rt kalit.',
          'Fourteen keys.',
          'Четырнадцать ключей.',
        ),
      },
    ],
    pronunciation: { ipa: '/ˌfɔːˈtiːn/', ttsText: 'fourteen' },
    media: {
      emoji: '1️⃣4️⃣',
      imageUrl: '',
      imageAlt: L('숫자 14', '14 raqami', 'the number 14', 'число 14'),
    },
    tags: ['numbers', 'teen'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-number-fifteen',
    english: 'fifteen',
    senseKey: 'number-15',
    partOfSpeech: WordPartOfSpeech.NUMERAL,
    meaning: L('열다섯; 15', 'o‘n besh; 15', 'the number 15', 'пятнадцать; 15'),
    examples: [
      {
        english: 'Fifteen books.',
        translations: L(
          '책 열다섯 권.',
          'O‘n besh kitob.',
          'Fifteen books.',
          'Пятнадцать книг.',
        ),
      },
    ],
    pronunciation: { ipa: '/ˌfɪfˈtiːn/', ttsText: 'fifteen' },
    media: {
      emoji: '1️⃣5️⃣',
      imageUrl: '',
      imageAlt: L('숫자 15', '15 raqami', 'the number 15', 'число 15'),
    },
    tags: ['numbers', 'teen'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-number-sixteen',
    english: 'sixteen',
    senseKey: 'number-16',
    partOfSpeech: WordPartOfSpeech.NUMERAL,
    meaning: L(
      '열여섯; 16',
      'o‘n olti; 16',
      'the number 16',
      'шестнадцать; 16',
    ),
    examples: [
      {
        english: 'Sixteen tablets.',
        translations: L(
          '태블릿 열여섯 개.',
          'O‘n olti planshet.',
          'Sixteen tablets.',
          'Шестнадцать планшетов.',
        ),
      },
    ],
    pronunciation: { ipa: '/ˌsɪkˈstiːn/', ttsText: 'sixteen' },
    media: {
      emoji: '1️⃣6️⃣',
      imageUrl: '',
      imageAlt: L('숫자 16', '16 raqami', 'the number 16', 'число 16'),
    },
    tags: ['numbers', 'teen'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-number-seventeen',
    english: 'seventeen',
    senseKey: 'number-17',
    partOfSpeech: WordPartOfSpeech.NUMERAL,
    meaning: L(
      '열일곱; 17',
      'o‘n yetti; 17',
      'the number 17',
      'семнадцать; 17',
    ),
    examples: [
      {
        english: 'Seventeen pens.',
        translations: L(
          '펜 열일곱 개.',
          'O‘n yetti ruchka.',
          'Seventeen pens.',
          'Семнадцать ручек.',
        ),
      },
    ],
    pronunciation: { ipa: '/ˌsevənˈtiːn/', ttsText: 'seventeen' },
    media: {
      emoji: '1️⃣7️⃣',
      imageUrl: '',
      imageAlt: L('숫자 17', '17 raqami', 'the number 17', 'число 17'),
    },
    tags: ['numbers', 'teen'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-number-eighteen',
    english: 'eighteen',
    senseKey: 'number-18',
    partOfSpeech: WordPartOfSpeech.NUMERAL,
    meaning: L(
      '열여덟; 18',
      'o‘n sakkiz; 18',
      'the number 18',
      'восемнадцать; 18',
    ),
    examples: [
      {
        english: 'Eighteen phones.',
        translations: L(
          '전화기 열여덟 개.',
          'O‘n sakkiz telefon.',
          'Eighteen phones.',
          'Восемнадцать телефонов.',
        ),
      },
    ],
    pronunciation: { ipa: '/ˌeɪˈtiːn/', ttsText: 'eighteen' },
    media: {
      emoji: '1️⃣8️⃣',
      imageUrl: '',
      imageAlt: L('숫자 18', '18 raqami', 'the number 18', 'число 18'),
    },
    tags: ['numbers', 'teen'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-number-nineteen',
    english: 'nineteen',
    senseKey: 'number-19',
    partOfSpeech: WordPartOfSpeech.NUMERAL,
    meaning: L(
      '열아홉; 19',
      'o‘n to‘qqiz; 19',
      'the number 19',
      'девятнадцать; 19',
    ),
    examples: [
      {
        english: 'Nineteen wallets.',
        translations: L(
          '지갑 열아홉 개.',
          'O‘n to‘qqiz hamyon.',
          'Nineteen wallets.',
          'Девятнадцать кошельков.',
        ),
      },
    ],
    pronunciation: { ipa: '/ˌnaɪnˈtiːn/', ttsText: 'nineteen' },
    media: {
      emoji: '1️⃣9️⃣',
      imageUrl: '',
      imageAlt: L('숫자 19', '19 raqami', 'the number 19', 'число 19'),
    },
    tags: ['numbers', 'teen'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-number-twenty',
    english: 'twenty',
    senseKey: 'number-20',
    partOfSpeech: WordPartOfSpeech.NUMERAL,
    meaning: L('스물; 20', 'yigirma; 20', 'the number 20', 'двадцать; 20'),
    examples: [
      {
        english: 'Twenty books.',
        translations: L(
          '책 스무 권.',
          'Yigirma kitob.',
          'Twenty books.',
          'Двадцать книг.',
        ),
      },
    ],
    pronunciation: { ipa: '/ˈtwenti/', ttsText: 'twenty' },
    media: {
      emoji: '2️⃣0️⃣',
      imageUrl: '',
      imageAlt: L('숫자 20', '20 raqami', 'the number 20', 'число 20'),
    },
    tags: ['numbers', 'tens'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-number-twenty-one',
    english: 'twenty-one',
    senseKey: 'number-21',
    partOfSpeech: WordPartOfSpeech.NUMERAL,
    meaning: L(
      '스물하나; 21',
      'yigirma bir; 21',
      'the number 21',
      'двадцать один; 21',
    ),
    examples: [
      {
        english: 'Twenty-one pens.',
        translations: L(
          '펜 스물한 개.',
          'Yigirma bir ruchka.',
          'Twenty-one pens.',
          'Двадцать одна ручка.',
        ),
      },
    ],
    pronunciation: { ipa: '/ˌtwenti ˈwʌn/', ttsText: 'twenty-one' },
    media: {
      emoji: '2️⃣1️⃣',
      imageUrl: '',
      imageAlt: L('숫자 21', '21 raqami', 'the number 21', 'число 21'),
    },
    tags: ['numbers'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-number-twenty-two',
    english: 'twenty-two',
    senseKey: 'number-22',
    partOfSpeech: WordPartOfSpeech.NUMERAL,
    meaning: L(
      '스물둘; 22',
      'yigirma ikki; 22',
      'the number 22',
      'двадцать два; 22',
    ),
    examples: [
      {
        english: 'Twenty-two phones.',
        translations: L(
          '전화기 스물두 개.',
          'Yigirma ikki telefon.',
          'Twenty-two phones.',
          'Двадцать два телефона.',
        ),
      },
    ],
    pronunciation: { ipa: '/ˌtwenti ˈtuː/', ttsText: 'twenty-two' },
    media: {
      emoji: '2️⃣2️⃣',
      imageUrl: '',
      imageAlt: L('숫자 22', '22 raqami', 'the number 22', 'число 22'),
    },
    tags: ['numbers'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-number-thirty',
    english: 'thirty',
    senseKey: 'number-30',
    partOfSpeech: WordPartOfSpeech.NUMERAL,
    meaning: L('서른; 30', 'o‘ttiz; 30', 'the number 30', 'тридцать; 30'),
    examples: [
      {
        english: 'Thirty tablets.',
        translations: L(
          '태블릿 서른 개.',
          'O‘ttiz planshet.',
          'Thirty tablets.',
          'Тридцать планшетов.',
        ),
      },
    ],
    pronunciation: { ipa: '/ˈθɜːti/', ttsText: 'thirty' },
    media: {
      emoji: '3️⃣0️⃣',
      imageUrl: '',
      imageAlt: L('숫자 30', '30 raqami', 'the number 30', 'число 30'),
    },
    tags: ['numbers', 'tens'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-number-forty',
    english: 'forty',
    senseKey: 'number-40',
    partOfSpeech: WordPartOfSpeech.NUMERAL,
    meaning: L('마흔; 40', 'qirq; 40', 'the number 40', 'сорок; 40'),
    examples: [
      {
        english: 'Forty books.',
        translations: L(
          '책 마흔 권.',
          'Qirq kitob.',
          'Forty books.',
          'Сорок книг.',
        ),
      },
    ],
    pronunciation: { ipa: '/ˈfɔːti/', ttsText: 'forty' },
    media: {
      emoji: '4️⃣0️⃣',
      imageUrl: '',
      imageAlt: L('숫자 40', '40 raqami', 'the number 40', 'число 40'),
    },
    tags: ['numbers', 'tens'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-number-fifty',
    english: 'fifty',
    senseKey: 'number-50',
    partOfSpeech: WordPartOfSpeech.NUMERAL,
    meaning: L('쉰; 50', 'ellik; 50', 'the number 50', 'пятьдесят; 50'),
    examples: [
      {
        english: 'Fifty keys.',
        translations: L(
          '열쇠 쉰 개.',
          'Ellik kalit.',
          'Fifty keys.',
          'Пятьдесят ключей.',
        ),
      },
    ],
    pronunciation: { ipa: '/ˈfɪfti/', ttsText: 'fifty' },
    media: {
      emoji: '5️⃣0️⃣',
      imageUrl: '',
      imageAlt: L('숫자 50', '50 raqami', 'the number 50', 'число 50'),
    },
    tags: ['numbers', 'tens'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-number-sixty',
    english: 'sixty',
    senseKey: 'number-60',
    partOfSpeech: WordPartOfSpeech.NUMERAL,
    meaning: L('예순; 60', 'oltmish; 60', 'the number 60', 'шестьдесят; 60'),
    examples: [
      {
        english: 'Sixty phones.',
        translations: L(
          '전화기 예순 개.',
          'Oltmish telefon.',
          'Sixty phones.',
          'Шестьдесят телефонов.',
        ),
      },
    ],
    pronunciation: { ipa: '/ˈsɪksti/', ttsText: 'sixty' },
    media: {
      emoji: '6️⃣0️⃣',
      imageUrl: '',
      imageAlt: L('숫자 60', '60 raqami', 'the number 60', 'число 60'),
    },
    tags: ['numbers', 'tens'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-number-seventy',
    english: 'seventy',
    senseKey: 'number-70',
    partOfSpeech: WordPartOfSpeech.NUMERAL,
    meaning: L('일흔; 70', 'yetmish; 70', 'the number 70', 'семьдесят; 70'),
    examples: [
      {
        english: 'Seventy pens.',
        translations: L(
          '펜 일흔 개.',
          'Yetmish ruchka.',
          'Seventy pens.',
          'Семьдесят ручек.',
        ),
      },
    ],
    pronunciation: { ipa: '/ˈsevənti/', ttsText: 'seventy' },
    media: {
      emoji: '7️⃣0️⃣',
      imageUrl: '',
      imageAlt: L('숫자 70', '70 raqami', 'the number 70', 'число 70'),
    },
    tags: ['numbers', 'tens'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-number-eighty',
    english: 'eighty',
    senseKey: 'number-80',
    partOfSpeech: WordPartOfSpeech.NUMERAL,
    meaning: L('여든; 80', 'sakson; 80', 'the number 80', 'восемьдесят; 80'),
    examples: [
      {
        english: 'Eighty books.',
        translations: L(
          '책 여든 권.',
          'Sakson kitob.',
          'Eighty books.',
          'Восемьдесят книг.',
        ),
      },
    ],
    pronunciation: { ipa: '/ˈeɪti/', ttsText: 'eighty' },
    media: {
      emoji: '8️⃣0️⃣',
      imageUrl: '',
      imageAlt: L('숫자 80', '80 raqami', 'the number 80', 'число 80'),
    },
    tags: ['numbers', 'tens'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-number-ninety',
    english: 'ninety',
    senseKey: 'number-90',
    partOfSpeech: WordPartOfSpeech.NUMERAL,
    meaning: L('아흔; 90', 'to‘qson; 90', 'the number 90', 'девяносто; 90'),
    examples: [
      {
        english: 'Ninety laptops.',
        translations: L(
          '노트북 아흔 대.',
          'To‘qson noutbuk.',
          'Ninety laptops.',
          'Девяносто ноутбуков.',
        ),
      },
    ],
    pronunciation: { ipa: '/ˈnaɪnti/', ttsText: 'ninety' },
    media: {
      emoji: '9️⃣0️⃣',
      imageUrl: '',
      imageAlt: L('숫자 90', '90 raqami', 'the number 90', 'число 90'),
    },
    tags: ['numbers', 'tens'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-number-hundred',
    english: 'a hundred',
    senseKey: 'number-100',
    partOfSpeech: WordPartOfSpeech.NUMERAL,
    meaning: L('백; 100', 'yuz; 100', 'the number 100', 'сто; 100'),
    examples: [
      {
        english: 'A hundred books.',
        translations: L(
          '책 백 권.',
          'Yuzta kitob.',
          'A hundred books.',
          'Сто книг.',
        ),
      },
    ],
    pronunciation: { ipa: '/ə ˈhʌndrəd/', ttsText: 'a hundred' },
    media: {
      emoji: '💯',
      imageUrl: '',
      imageAlt: L('숫자 100', '100 raqami', 'the number 100', 'число 100'),
    },
    tags: ['numbers', 'hundred'],
    difficulty: 1,
    isCore: true,
  },
];

// ─────────────────────────────────────────────────────────────
// Questions
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT2_NODE1_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Objects
  // ===========================================================

  en_s1u2_n1_001_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'A tablet.',
    audioText: 'A tablet.',
    answerTranslation: L('태블릿.', 'Planshet.', 'A tablet.', 'Планшет.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['objects', 'tablet'],
  },

  en_s1u2_n1_002_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: L(
      '영어 단어와 맞는 그림을 고르세요.',
      'Inglizcha so‘zga mos rasmni tanlang.',
      'Choose the picture that matches the English word.',
      'Выберите картинку, соответствующую английскому слову.',
    ),
    answer: 'umbrella',
    choices: [
      { text: 'key', label: '🔑', emoji: '🔑', imageUrl: '' },
      { text: 'umbrella', label: '☂️', emoji: '☂️', imageUrl: '' },
      { text: 'book', label: '📕', emoji: '📕', imageUrl: '' },
      { text: 'wallet', label: '👛', emoji: '👛', imageUrl: '' },
    ],
    answerTranslation: L('우산', 'soyabon', 'umbrella', 'зонт'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['objects', 'umbrella'],
  },

  en_s1u2_n1_003_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'An umbrella.',
    audioText: 'An umbrella.',
    answerTranslation: L('우산.', 'Soyabon.', 'An umbrella.', 'Зонт.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['objects', 'article-an'],
  },

  en_s1u2_n1_004_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ apple',
    blankAnswers: ['an'],
    options: ['a', 'an', 'the', 'are'],
    answer: 'an',
    answerTranslation: L('사과 하나', 'bitta olma', 'an apple', 'яблоко'),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['objects', 'article'],
  },

  en_s1u2_n1_005_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'A book.',
    audioText: 'A book.',
    answerTranslation: L('책.', 'Kitob.', 'A book.', 'Книга.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['objects', 'book'],
  },

  en_s1u2_n1_006_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      { korean: 'apple', native: 'olma' },
      { korean: 'book', native: 'kitob' },
      { korean: 'key', native: 'kalit' },
      { korean: 'pen', native: 'ruchka' },
      { korean: 'phone', native: 'telefon' },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['objects', 'matching'],
  },

  en_s1u2_n1_007_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'A laptop.',
    audioText: 'A laptop.',
    answerTranslation: L('노트북.', 'Noutbuk.', 'A laptop.', 'Ноутбук.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['objects', 'laptop'],
  },

  en_s1u2_n1_008_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: L(
      '영어 단어와 맞는 그림을 고르세요.',
      'Inglizcha so‘zga mos rasmni tanlang.',
      'Choose the picture that matches the English word.',
      'Выберите картинку, соответствующую английскому слову.',
    ),
    answer: 'wallet',
    choices: [
      { text: 'phone', label: '📱', emoji: '📱', imageUrl: '' },
      { text: 'pen', label: '🖊️', emoji: '🖊️', imageUrl: '' },
      { text: 'wallet', label: '👛', emoji: '👛', imageUrl: '' },
      { text: 'laptop', label: '💻', emoji: '💻', imageUrl: '' },
    ],
    answerTranslation: L('지갑', 'hamyon', 'wallet', 'кошелёк'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['objects', 'wallet'],
  },

  en_s1u2_n1_009_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'A notepad.',
    audioText: 'A notepad.',
    answerTranslation: L('메모장.', 'Bloknot.', 'A notepad.', 'Блокнот.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['objects', 'notepad'],
  },

  en_s1u2_n1_010_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ umbrella',
    blankAnswers: ['an'],
    options: ['the', 'are', 'a', 'an'],
    answer: 'an',
    answerTranslation: L('우산 하나', 'bitta soyabon', 'an umbrella', 'зонт'),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['objects', 'article'],
  },

  en_s1u2_n1_011_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      { korean: 'laptop', native: 'noutbuk' },
      { korean: 'notepad', native: 'bloknot' },
      { korean: 'tablet', native: 'planshet' },
      { korean: 'umbrella', native: 'soyabon' },
      { korean: 'wallet', native: 'hamyon' },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['objects', 'listening'],
  },

  en_s1u2_n1_012_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'A phone.',
    audioText: 'A phone.',
    answerTranslation: L('전화기.', 'Telefon.', 'A phone.', 'Телефон.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['objects', 'phone'],
  },

  en_s1u2_n1_013_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['are', 'These', 'keys', 'phones', 'a'],
    answer: 'These are keys',
    audioText: 'These are keys.',
    answerTranslation: L(
      '이것들은 열쇠예요.',
      'Bular kalitlar.',
      'These are keys.',
      'Это ключи.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['objects', 'plural'],
  },

  en_s1u2_n1_014_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Books.',
    audioText: 'Books.',
    answerTranslation: L('책들.', 'Kitoblar.', 'Books.', 'Книги.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['plural', 's-sound'],
  },

  en_s1u2_n1_015_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'one book → five ___',
    blankAnswers: ['books'],
    options: ['book', 'books', 'bookes', 'bookies'],
    answer: 'books',
    answerTranslation: L(
      '책 한 권 → 책 다섯 권',
      'bir kitob → besh kitob',
      'one book → five books',
      'одна книга → пять книг',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['plural', 'books'],
  },

  en_s1u2_n1_016_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What’s this in English?',
    options: ['It’s', 'a', 'tablet', 'phones', 'They’re', 'an'],
    answer: 'It’s a tablet',
    answerTranslation: L(
      '태블릿이에요.',
      'Bu planshet.',
      'It’s a tablet.',
      'Это планшет.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['objects', 'reply-builder'],
  },

  en_s1u2_n1_017_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Keys.',
    audioText: 'Keys.',
    answerTranslation: L('열쇠들.', 'Kalitlar.', 'Keys.', 'Ключи.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['plural', 'z-sound'],
  },

  en_s1u2_n1_018_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['They’re', 'pens', 'It’s', 'a', 'phone', 'keys'],
    answer: 'They’re pens',
    answerTranslation: L(
      '그것들은 펜이에요.',
      'Ular ruchkalar.',
      'They’re pens.',
      'Это ручки.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['objects', 'plural'],
  },

  en_s1u2_n1_019_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Apples.',
    audioText: 'Apples.',
    answerTranslation: L('사과들.', 'Olmalar.', 'Apples.', 'Яблоки.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['plural', 'z-sound'],
  },

  en_s1u2_n1_020_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'They’re phones.',
    audioText: 'They’re phones.',
    answerI18n: L(
      'They are phones',
      'Ular telefonlar',
      'They are phones',
      'Это телефоны',
    ),
    options: ['They’re', 'phones', 'It’s', 'a', 'keys'],
    optionsI18n: {
      ko: ['They', 'are', 'phones', 'books', 'one'],
      uz: ['Ular', 'telefonlar', 'kitoblar', 'bitta'],
      en: ['They', 'are', 'phones', 'books', 'one'],
      ru: ['Это', 'телефоны', 'книги', 'один'],
    },
    answerTranslation: L(
      '그것들은 전화기예요.',
      'Ular telefonlar.',
      'They’re phones.',
      'Это телефоны.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['objects', 'plural'],
  },

  // ===========================================================
  // Lesson 2 · This / that / these / those
  // ===========================================================

  en_s1u2_n1_021_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'What’s this?',
    audioText: 'What’s this?',
    answerTranslation: L(
      '이게 뭐예요?',
      'Bu nima?',
      'What’s this?',
      'Что это?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['this', 'question'],
  },

  en_s1u2_n1_022_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'What’s ___?',
    blankAnswers: ['this'],
    options: ['these', 'those', 'this', 'they'],
    answer: 'this',
    answerTranslation: L(
      '이게 뭐예요?',
      'Bu nima?',
      'What’s this?',
      'Что это?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['this', 'singular'],
  },

  en_s1u2_n1_023_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'It’s a tablet.',
    audioText: 'It’s a tablet.',
    answerTranslation: L(
      '태블릿이에요.',
      'Bu planshet.',
      'It’s a tablet.',
      'Это планшет.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['it', 'this'],
  },

  en_s1u2_n1_024_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['It’s', 'a', 'book', 'They’re', 'these', 'books'],
    answer: 'It’s a book',
    answerTranslation: L(
      '책이에요.',
      'Bu kitob.',
      'It’s a book.',
      'Это книга.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['it', 'singular'],
  },

  en_s1u2_n1_025_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'What’s that?',
    audioText: 'What’s that?',
    answerTranslation: L(
      '저게 뭐예요?',
      'U nima?',
      'What’s that?',
      'Что это там?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['that', 'question'],
  },

  en_s1u2_n1_026_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What’s that in English?' }],
    options: [
      'It’s an umbrella.',
      'They’re umbrellas.',
      'These are keys.',
      'What are those?',
    ],
    answer: 'It’s an umbrella.',
    answerTranslation: L(
      '우산이에요.',
      'Bu soyabon.',
      'It’s an umbrella.',
      'Это зонт.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['that', 'dialog'],
  },

  en_s1u2_n1_027_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      { korean: 'this', native: 'bu' },
      { korean: 'that', native: 'u' },
      { korean: 'these', native: 'bular' },
      { korean: 'those', native: 'anavilar' },
      { korean: 'they', native: 'ular' },
    ],
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['demonstratives', 'matching'],
  },

  en_s1u2_n1_028_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'What are these?',
    audioText: 'What are these?',
    answerTranslation: L(
      '이것들은 뭐예요?',
      'Bular nima?',
      'What are these?',
      'Что это?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['these', 'plural'],
  },

  en_s1u2_n1_029_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'What ___ these?',
    blankAnswers: ['are'],
    options: ['is', 'am', 'are', 'be'],
    answer: 'are',
    answerTranslation: L(
      '이것들은 뭐예요?',
      'Bular nima?',
      'What are these?',
      'Что это?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['these', 'be'],
  },

  en_s1u2_n1_030_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What are these in English?',
    options: ['They’re', 'keys', 'It’s', 'a', 'phone', 'that'],
    answer: 'They’re keys',
    answerTranslation: L(
      '열쇠들이에요.',
      'Ular kalitlar.',
      'They’re keys.',
      'Это ключи.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['these', 'reply-builder'],
  },

  en_s1u2_n1_031_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'They’re keys.',
    audioText: 'They’re keys.',
    answerTranslation: L(
      '열쇠들이에요.',
      'Ular kalitlar.',
      'They’re keys.',
      'Это ключи.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['they', 'plural'],
  },

  en_s1u2_n1_032_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['those', 'are', 'What', 'this', 'is', 'they'],
    answer: 'What are those',
    audioText: 'What are those?',
    answerTranslation: L(
      '저것들은 뭐예요?',
      'Anavilar nima?',
      'What are those?',
      'Что это там?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['those', 'arrange'],
  },

  en_s1u2_n1_033_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      { korean: 'this', native: 'bu' },
      { korean: 'that', native: 'u' },
      { korean: 'these', native: 'bular' },
      { korean: 'those', native: 'anavilar' },
      { korean: 'they', native: 'ular' },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['demonstratives', 'listening'],
  },

  en_s1u2_n1_034_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'What are those?',
    audioText: 'What are those?',
    answerTranslation: L(
      '저것들은 뭐예요?',
      'Anavilar nima?',
      'What are those?',
      'Что это там?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['those', 'plural'],
  },

  en_s1u2_n1_035_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'They___ phones.',
    blankAnswers: ['’re'],
    options: ['’re', '’s', '’m', 'is'],
    answer: '’re',
    answerTranslation: L(
      '그것들은 전화기예요.',
      'Ular telefonlar.',
      'They’re phones.',
      'Это телефоны.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['they', 'be'],
  },

  en_s1u2_n1_036_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'They’re phones.',
    audioText: 'They’re phones.',
    answerTranslation: L(
      '그것들은 전화기예요.',
      'Ular telefonlar.',
      'They’re phones.',
      'Это телефоны.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['they', 'plural'],
  },

  en_s1u2_n1_037_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'What are those in English?',
    audioText: 'What are those in English?',
    answerI18n: L(
      'What are those in English',
      'Anavilar ingliz tilida nima',
      'What are those in English',
      'Как это называется по-английски',
    ),
    options: ['What', 'are', 'those', 'in', 'English', 'this', 'is'],
    optionsI18n: {
      ko: ['What', 'are', 'those', 'in', 'English', 'this', 'is'],
      uz: ['Anavilar', 'ingliz', 'tilida', 'nima', 'bular', 'bu'],
      en: ['What', 'are', 'those', 'in', 'English', 'this', 'is'],
      ru: ['Как', 'это', 'называется', 'по-английски', 'здесь', 'один'],
    },
    answerTranslation: L(
      '저것들은 영어로 뭐라고 해요?',
      'Anavilar ingliz tilida nima?',
      'What are those in English?',
      'Как это называется по-английски?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['those', 'sentence-builder'],
  },

  en_s1u2_n1_038_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Who’s that?',
    audioText: 'Who’s that?',
    answerTranslation: L(
      '저 사람은 누구예요?',
      'U kim?',
      'Who’s that?',
      'Кто это?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['who', 'that'],
  },

  en_s1u2_n1_039_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Who’s that?' }],
    options: [
      'It’s my friend, Lynne.',
      'They’re phones.',
      'Those are keys.',
      'It’s an umbrella.',
    ],
    answer: 'It’s my friend, Lynne.',
    answerTranslation: L(
      '제 친구 Lynne이에요.',
      'Bu mening do‘stim Lynne.',
      'It’s my friend, Lynne.',
      'Это моя подруга Линн.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['who', 'that', 'dialog'],
  },

  en_s1u2_n1_040_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['What', 'are', 'these', 'in', 'English', 'that', 'is'],
    answer: 'What are these in English',
    answerTranslation: L(
      '이것들은 영어로 뭐라고 해요?',
      'Bular ingliz tilida nima?',
      'What are these in English?',
      'Как это называется по-английски?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['these', 'review'],
  },

  // ===========================================================
  // Lesson 3 · Numbers 11–100
  // ===========================================================

  en_s1u2_n1_041_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      { korean: 'eleven', native: '11' },
      { korean: 'twelve', native: '12' },
      { korean: 'thirteen', native: '13' },
      { korean: 'fourteen', native: '14' },
      { korean: 'fifteen', native: '15' },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['numbers', 'matching'],
  },

  en_s1u2_n1_042_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Eleven. Twelve. Thirteen.',
    audioText: 'Eleven. Twelve. Thirteen.',
    answerTranslation: L(
      '11, 12, 13.',
      '11, 12, 13.',
      'Eleven, twelve, thirteen.',
      'Одиннадцать, двенадцать, тринадцать.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['numbers', 'eleven-thirteen'],
  },

  en_s1u2_n1_043_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'thirteen, fourteen, fifteen, ___',
    blankAnswers: ['sixteen'],
    options: ['sixteen', 'sixty', 'seventeen', 'twenty'],
    answer: 'sixteen',
    answerTranslation: L(
      '13, 14, 15, 16',
      '13, 14, 15, 16',
      'thirteen, fourteen, fifteen, sixteen',
      'тринадцать, четырнадцать, пятнадцать, шестнадцать',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['numbers', 'sequence'],
  },

  en_s1u2_n1_044_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Fourteen. Fifteen. Sixteen.',
    audioText: 'Fourteen. Fifteen. Sixteen.',
    answerTranslation: L(
      '14, 15, 16.',
      '14, 15, 16.',
      'Fourteen, fifteen, sixteen.',
      'Четырнадцать, пятнадцать, шестнадцать.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['numbers', 'teen'],
  },

  en_s1u2_n1_045_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      { korean: 'sixteen', native: '16' },
      { korean: 'seventeen', native: '17' },
      { korean: 'eighteen', native: '18' },
      { korean: 'nineteen', native: '19' },
      { korean: 'twenty', native: '20' },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['numbers', 'listening'],
  },

  en_s1u2_n1_046_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Seventeen. Eighteen. Nineteen.',
    audioText: 'Seventeen. Eighteen. Nineteen.',
    answerTranslation: L(
      '17, 18, 19.',
      '17, 18, 19.',
      'Seventeen, eighteen, nineteen.',
      'Семнадцать, восемнадцать, девятнадцать.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['numbers', 'teen'],
  },

  en_s1u2_n1_047_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'nineteen, twenty, ___',
    blankAnswers: ['twenty-one'],
    options: ['twenty-one', 'twelve', 'thirty', 'twenty-two'],
    answer: 'twenty-one',
    answerTranslation: L(
      '19, 20, 21',
      '19, 20, 21',
      'nineteen, twenty, twenty-one',
      'девятнадцать, двадцать, двадцать один',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['numbers', 'sequence'],
  },

  en_s1u2_n1_048_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['twenty-two', 'twenty', 'twenty-one', 'nineteen', 'thirty'],
    answer: 'twenty twenty-one twenty-two',
    audioText: 'Twenty, twenty-one, twenty-two.',
    answerTranslation: L(
      '20, 21, 22.',
      '20, 21, 22.',
      'Twenty, twenty-one, twenty-two.',
      'Двадцать, двадцать один, двадцать два.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['numbers', 'arrange'],
  },

  en_s1u2_n1_049_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Twenty. Twenty-one. Twenty-two.',
    audioText: 'Twenty. Twenty-one. Twenty-two.',
    answerTranslation: L(
      '20, 21, 22.',
      '20, 21, 22.',
      'Twenty, twenty-one, twenty-two.',
      'Двадцать, двадцать один, двадцать два.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['numbers', 'twenty'],
  },

  en_s1u2_n1_050_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['twenty', 'three', 'twenty-three', 'thirty', 'thirteen'],
    answer: 'twenty-three',
    answerTranslation: L('23', '23', 'twenty-three', 'двадцать три'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['numbers', '23'],
  },

  en_s1u2_n1_051_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'thirty-one, thirty-two, thirty-three, ___',
    blankAnswers: ['thirty-four'],
    options: ['thirty-four', 'forty', 'thirteen', 'thirty-five'],
    answer: 'thirty-four',
    answerTranslation: L(
      '31, 32, 33, 34',
      '31, 32, 33, 34',
      'thirty-one, thirty-two, thirty-three, thirty-four',
      'тридцать один, тридцать два, тридцать три, тридцать четыре',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['numbers', 'sequence'],
  },

  en_s1u2_n1_052_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Thirty. Forty. Fifty.',
    audioText: 'Thirty. Forty. Fifty.',
    answerTranslation: L(
      '30, 40, 50.',
      '30, 40, 50.',
      'Thirty, forty, fifty.',
      'Тридцать, сорок, пятьдесят.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['numbers', 'tens'],
  },

  en_s1u2_n1_053_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Sixty-nine.',
    audioText: 'Sixty-nine.',
    answerI18n: L(
      'sixty-nine',
      'oltmish to‘qqiz',
      'sixty-nine',
      'шестьдесят девять',
    ),
    options: ['sixty-nine', 'sixteen', 'ninety', 'sixty'],
    optionsI18n: {
      ko: ['sixty-nine', 'sixteen', 'ninety', 'sixty'],
      uz: ['oltmish', 'to‘qqiz', 'o‘n', 'to‘qson'],
      en: ['sixty-nine', 'sixteen', 'ninety', 'sixty'],
      ru: ['шестьдесят', 'девять', 'девяносто', 'шестнадцать'],
    },
    answerTranslation: L('69', '69', 'sixty-nine', 'шестьдесят девять'),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['numbers', '69'],
  },

  en_s1u2_n1_054_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Sixty. Seventy. Eighty. Ninety.',
    audioText: 'Sixty. Seventy. Eighty. Ninety.',
    answerTranslation: L(
      '60, 70, 80, 90.',
      '60, 70, 80, 90.',
      'Sixty, seventy, eighty, ninety.',
      'Шестьдесят, семьдесят, восемьдесят, девяносто.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['numbers', 'tens'],
  },

  en_s1u2_n1_055_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What number is this: 82?' }],
    options: ['Eighty-two.', 'Eighteen-two.', 'Twenty-eight.', 'Eighty.'],
    answer: 'Eighty-two.',
    answerTranslation: L(
      '82예요.',
      'Sakson ikki.',
      'Eighty-two.',
      'Восемьдесят два.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['numbers', '82'],
  },

  en_s1u2_n1_056_speaking: {
    type: 'speaking',
    level: LV,
    instruction: L(
      '`-teen`의 강세를 살려 따라 말하세요.',
      '`-teen` urg‘usiga e’tibor berib takrorlang.',
      'Repeat with the stress on -teen.',
      'Повторите, ставя ударение на -teen.',
    ),
    answer: 'Thirteen.',
    audioText: 'Thirteen.',
    answerTranslation: L('13.', '13.', 'Thirteen.', 'Тринадцать.'),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['numbers', 'stress', 'teen'],
  },

  en_s1u2_n1_057_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '들은 숫자를 고르세요.',
      'Eshitgan soningizni tanlang.',
      'Choose the number you hear.',
      'Выберите число, которое вы слышите.',
    ),
    sentenceTemplate: '___',
    blankAnswers: ['thirty'],
    options: ['thirteen', 'thirty', 'three', 'twenty'],
    answer: 'thirty',
    audioText: 'Thirty.',
    answerTranslation: L('30.', '30.', 'Thirty.', 'Тридцать.'),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['numbers', 'teen-ty'],
  },

  en_s1u2_n1_058_speaking: {
    type: 'speaking',
    level: LV,
    instruction: L(
      '`-ty`의 앞부분 강세를 살려 따라 말하세요.',
      '`-ty` sonidagi birinchi urg‘uga e’tibor berib takrorlang.',
      'Repeat with the main stress before -ty.',
      'Повторите, ставя главное ударение перед -ty.',
    ),
    answer: 'Thirty.',
    audioText: 'Thirty.',
    answerTranslation: L('30.', '30.', 'Thirty.', 'Тридцать.'),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['numbers', 'stress', 'ty'],
  },

  en_s1u2_n1_059_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What number is 97?',
    options: ['It’s', 'ninety-seven', 'seventeen', 'seventy-nine', 'They’re'],
    answer: 'It’s ninety-seven',
    answerTranslation: L(
      '97이에요.',
      'Bu to‘qson yetti.',
      'It’s ninety-seven.',
      'Это девяносто семь.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['numbers', '97', 'reply-builder'],
  },

  en_s1u2_n1_060_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'A hundred.',
    audioText: 'A hundred.',
    answerTranslation: L('100.', '100.', 'A hundred.', 'Сто.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['numbers', 'hundred'],
  },

  // ===========================================================
  // Lesson 4 · Objects + numbers + singular/plural review
  // ===========================================================

  en_s1u2_n1_061_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'What’s this in English?',
    audioText: 'What’s this in English?',
    answerTranslation: L(
      '이것은 영어로 뭐라고 해요?',
      'Bu ingliz tilida nima?',
      'What’s this in English?',
      'Как это называется по-английски?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'this'],
  },

  en_s1u2_n1_062_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'It___ a tablet.',
    blankAnswers: ['’s'],
    options: ['’re', '’s', 'are', '’m'],
    answer: '’s',
    answerTranslation: L(
      '태블릿이에요.',
      'Bu planshet.',
      'It’s a tablet.',
      'Это планшет.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'it'],
  },

  en_s1u2_n1_063_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What’s that in English?',
    options: ['It’s', 'a', 'notepad', 'They’re', 'pens', 'these'],
    answer: 'It’s a notepad',
    answerTranslation: L(
      '메모장이에요.',
      'Bu bloknot.',
      'It’s a notepad.',
      'Это блокнот.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'that'],
  },

  en_s1u2_n1_064_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'It’s a notepad.',
    audioText: 'It’s a notepad.',
    answerTranslation: L(
      '메모장이에요.',
      'Bu bloknot.',
      'It’s a notepad.',
      'Это блокнот.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'singular'],
  },

  en_s1u2_n1_065_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['What', 'are', 'those', 'in', 'English', 'this', 'is'],
    answer: 'What are those in English',
    answerTranslation: L(
      '저것들은 영어로 뭐라고 해요?',
      'Anavilar ingliz tilida nima?',
      'What are those in English?',
      'Как это называется по-английски?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'those'],
  },

  en_s1u2_n1_066_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      { korean: 'book', native: 'kitob' },
      { korean: 'key', native: 'kalit' },
      { korean: 'phone', native: 'telefon' },
      { korean: 'tablet', native: 'planshet' },
      { korean: 'wallet', native: 'hamyon' },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['review', 'objects'],
  },

  en_s1u2_n1_067_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'They’re wallets.',
    audioText: 'They’re wallets.',
    answerTranslation: L(
      '그것들은 지갑이에요.',
      'Ular hamyonlar.',
      'They’re wallets.',
      'Это кошельки.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'plural'],
  },

  en_s1u2_n1_068_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'What ___ those?',
    blankAnswers: ['are'],
    options: ['are', 'is', 'am', '’s'],
    answer: 'are',
    answerTranslation: L(
      '저것들은 뭐예요?',
      'Anavilar nima?',
      'What are those?',
      'Что это там?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'those'],
  },

  en_s1u2_n1_069_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['They’re', 'umbrellas', 'an', 'It’s', 'these'],
    answer: 'They’re umbrellas',
    audioText: 'They’re umbrellas.',
    answerTranslation: L(
      '그것들은 우산이에요.',
      'Ular soyabonlar.',
      'They’re umbrellas.',
      'Это зонты.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['review', 'plural'],
  },

  en_s1u2_n1_070_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'They’re umbrellas.',
    audioText: 'They’re umbrellas.',
    answerTranslation: L(
      '그것들은 우산이에요.',
      'Ular soyabonlar.',
      'They’re umbrellas.',
      'Это зонты.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'plural'],
  },

  en_s1u2_n1_071_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What are these in English?' }],
    options: [
      'They’re pens.',
      'It’s a pen.',
      'This is thirteen.',
      'That’s my friend.',
    ],
    answer: 'They’re pens.',
    answerTranslation: L(
      '펜들이에요.',
      'Ular ruchkalar.',
      'They’re pens.',
      'Это ручки.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'plural'],
  },

  en_s1u2_n1_072_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'They’re laptops.',
    audioText: 'They’re laptops.',
    answerI18n: L(
      'They are laptops',
      'Ular noutbuklar',
      'They are laptops',
      'Это ноутбуки',
    ),
    options: ['They’re', 'laptops', 'It’s', 'a', 'wallet'],
    optionsI18n: {
      ko: ['They', 'are', 'laptops', 'one', 'wallet'],
      uz: ['Ular', 'noutbuklar', 'bitta', 'hamyon'],
      en: ['They', 'are', 'laptops', 'one', 'wallet'],
      ru: ['Это', 'ноутбуки', 'один', 'кошелёк'],
    },
    answerTranslation: L(
      '그것들은 노트북이에요.',
      'Ular noutbuklar.',
      'They’re laptops.',
      'Это ноутбуки.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['review', 'plural'],
  },

  en_s1u2_n1_073_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Thirteen.',
    audioText: 'Thirteen.',
    answerTranslation: L('13.', '13.', 'Thirteen.', 'Тринадцать.'),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['review', 'teen-ty'],
  },

  en_s1u2_n1_074_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '들은 숫자를 고르세요.',
      'Eshitgan soningizni tanlang.',
      'Choose the number you hear.',
      'Выберите услышанное число.',
    ),
    sentenceTemplate: '___',
    blankAnswers: ['fifty'],
    options: ['fifteen', 'fifty', 'five', 'forty'],
    answer: 'fifty',
    audioText: 'Fifty.',
    answerTranslation: L('50.', '50.', 'Fifty.', 'Пятьдесят.'),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['review', 'teen-ty'],
  },

  en_s1u2_n1_075_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'How many books?',
    options: ['There', 'are', 'fourteen', 'books', 'forty', 'It’s'],
    answer: 'There are fourteen books',
    answerTranslation: L(
      '책이 열네 권 있어요.',
      'O‘n to‘rt kitob bor.',
      'There are fourteen books.',
      'Есть четырнадцать книг.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'numbers', 'reply-builder'],
  },

  en_s1u2_n1_076_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Fourteen books.',
    audioText: 'Fourteen books.',
    answerTranslation: L(
      '책 열네 권.',
      'O‘n to‘rt kitob.',
      'Fourteen books.',
      'Четырнадцать книг.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['review', 'numbers'],
  },

  en_s1u2_n1_077_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      { korean: 'thirteen', native: '13' },
      { korean: 'thirty', native: '30' },
      { korean: 'fifteen', native: '15' },
      { korean: 'fifty', native: '50' },
      { korean: 'eighty', native: '80' },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['review', 'teen-ty'],
  },

  en_s1u2_n1_078_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['They’re', 'twenty-eight', 'pens', 'eighteen', 'It’s', 'books'],
    answer: 'They’re twenty-eight pens',
    answerTranslation: L(
      '그것들은 펜 스물여덟 개예요.',
      'Ular yigirma sakkizta ruchka.',
      'They’re twenty-eight pens.',
      'Это двадцать восемь ручек.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['review', 'numbers', 'plural'],
  },

  en_s1u2_n1_079_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Twenty-eight pens.',
    audioText: 'Twenty-eight pens.',
    answerTranslation: L(
      '펜 스물여덟 개.',
      'Yigirma sakkizta ruchka.',
      'Twenty-eight pens.',
      'Двадцать восемь ручек.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['review', 'numbers'],
  },

  en_s1u2_n1_080_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'What are those in English?' },
      { speaker: 'user', text: 'They’re keys.' },
      { speaker: 'npc', text: 'How many?' },
    ],
    options: [
      'There are eighteen.',
      'It’s an umbrella.',
      'This is a tablet.',
      'Thirty is a phone.',
    ],
    answer: 'There are eighteen.',
    answerTranslation: L(
      '열여덟 개예요.',
      'O‘n sakkizta.',
      'There are eighteen.',
      'Их восемнадцать.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'numbers', 'unit2'],
  },
};

// ─────────────────────────────────────────────────────────────
// Node
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT2_NODE1 = {
  title: L(
    '이건 영어로 뭐예요?',
    'Bu ingliz tilida nima?',
    'What’s this in English?',
    'Как это по-английски?',
  ),
  section: 1,
  unit: 2,
  order: 1,
  isActive: true,

  lessons: [
    {
      title: L(
        '내 가방 속 물건',
        'Sumkamdagi buyumlar',
        'Things in my bag',
        'Вещи в моей сумке',
      ),
      description: L(
        '자주 쓰는 물건의 이름과 a/an, 단수·복수 형태를 익혀요.',
        'Kundalik buyumlar nomlari, a/an va birlik-ko‘plik shakllarini o‘rganasiz.',
        'Learn common objects, a/an, and singular and plural forms.',
        'Учимся называть предметы и использовать a/an, единственное и множественное число.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 1,
      questions: [
        'en_s1u2_n1_001_speaking',
        'en_s1u2_n1_002_image_choice',
        'en_s1u2_n1_003_speaking',
        'en_s1u2_n1_004_fill_in_blank',
        'en_s1u2_n1_005_speaking',
        'en_s1u2_n1_006_word_matching',
        'en_s1u2_n1_007_speaking',
        'en_s1u2_n1_008_image_choice',
        'en_s1u2_n1_009_speaking',
        'en_s1u2_n1_010_fill_in_blank',
        'en_s1u2_n1_011_audio_match',
        'en_s1u2_n1_012_speaking',
        'en_s1u2_n1_013_word_arrange',
        'en_s1u2_n1_014_speaking',
        'en_s1u2_n1_015_fill_in_blank',
        'en_s1u2_n1_016_reply_builder',
        'en_s1u2_n1_017_speaking',
        'en_s1u2_n1_018_translate_builder',
        'en_s1u2_n1_019_speaking',
        'en_s1u2_n1_020_sentence_builder',
      ],
    },

    {
      title: L(
        '이것, 저것, 이것들, 저것들',
        'Bu, u, bular, anavilar',
        'This, that, these and those',
        'This, that, these и those',
      ),
      description: L(
        '가깝거나 먼 하나·여러 물건을 가리키고 영어 이름을 물어요.',
        'Yaqin va uzoqdagi bitta yoki bir nechta buyumni ko‘rsatib, inglizcha nomini so‘raysiz.',
        'Point to nearby and distant objects and ask what they are called.',
        'Учимся указывать на близкие и далёкие предметы и спрашивать их названия.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 2,
      questions: [
        'en_s1u2_n1_021_speaking',
        'en_s1u2_n1_022_fill_in_blank',
        'en_s1u2_n1_023_speaking',
        'en_s1u2_n1_024_translate_builder',
        'en_s1u2_n1_025_speaking',
        'en_s1u2_n1_026_dialog_complete',
        'en_s1u2_n1_027_word_matching',
        'en_s1u2_n1_028_speaking',
        'en_s1u2_n1_029_fill_in_blank',
        'en_s1u2_n1_030_reply_builder',
        'en_s1u2_n1_031_speaking',
        'en_s1u2_n1_032_word_arrange',
        'en_s1u2_n1_033_audio_match',
        'en_s1u2_n1_034_speaking',
        'en_s1u2_n1_035_fill_in_blank',
        'en_s1u2_n1_036_speaking',
        'en_s1u2_n1_037_sentence_builder',
        'en_s1u2_n1_038_speaking',
        'en_s1u2_n1_039_dialog_complete',
        'en_s1u2_n1_040_translate_builder',
      ],
    },

    {
      title: L(
        '숫자 11부터 100까지',
        '11 dan 100 gacha sonlar',
        'Numbers 11–100',
        'Числа от 11 до 100',
      ),
      description: L(
        '11부터 100까지 숫자를 말하고 -teen과 -ty 발음 차이를 구별해요.',
        '11 dan 100 gacha sonlarni aytasiz va -teen hamda -ty talaffuzini farqlaysiz.',
        'Say numbers from 11 to 100 and distinguish -teen from -ty.',
        'Учимся произносить числа от 11 до 100 и различать -teen и -ty.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 3,
      questions: [
        'en_s1u2_n1_041_word_matching',
        'en_s1u2_n1_042_speaking',
        'en_s1u2_n1_043_fill_in_blank',
        'en_s1u2_n1_044_speaking',
        'en_s1u2_n1_045_audio_match',
        'en_s1u2_n1_046_speaking',
        'en_s1u2_n1_047_fill_in_blank',
        'en_s1u2_n1_048_word_arrange',
        'en_s1u2_n1_049_speaking',
        'en_s1u2_n1_050_translate_builder',
        'en_s1u2_n1_051_fill_in_blank',
        'en_s1u2_n1_052_speaking',
        'en_s1u2_n1_053_sentence_builder',
        'en_s1u2_n1_054_speaking',
        'en_s1u2_n1_055_dialog_complete',
        'en_s1u2_n1_056_speaking',
        'en_s1u2_n1_057_fill_in_blank',
        'en_s1u2_n1_058_speaking',
        'en_s1u2_n1_059_reply_builder',
        'en_s1u2_n1_060_speaking',
      ],
    },

    {
      title: L(
        '몇 개예요?',
        'Nechta?',
        'Objects and numbers',
        'Предметы и числа',
      ),
      description: L(
        '물건 이름, 단수·복수, this/that/these/those와 숫자를 함께 복습해요.',
        'Buyumlar, birlik-ko‘plik, this/that/these/those va sonlarni birga takrorlaysiz.',
        'Review objects, singular and plural, demonstratives and numbers together.',
        'Повторяем предметы, единственное и множественное число, указательные слова и числа.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 4,
      questions: [
        'en_s1u2_n1_061_speaking',
        'en_s1u2_n1_062_fill_in_blank',
        'en_s1u2_n1_063_reply_builder',
        'en_s1u2_n1_064_speaking',
        'en_s1u2_n1_065_translate_builder',
        'en_s1u2_n1_066_audio_match',
        'en_s1u2_n1_067_speaking',
        'en_s1u2_n1_068_fill_in_blank',
        'en_s1u2_n1_069_word_arrange',
        'en_s1u2_n1_070_speaking',
        'en_s1u2_n1_071_dialog_complete',
        'en_s1u2_n1_072_sentence_builder',
        'en_s1u2_n1_073_speaking',
        'en_s1u2_n1_074_fill_in_blank',
        'en_s1u2_n1_075_reply_builder',
        'en_s1u2_n1_076_speaking',
        'en_s1u2_n1_077_word_matching',
        'en_s1u2_n1_078_translate_builder',
        'en_s1u2_n1_079_speaking',
        'en_s1u2_n1_080_dialog_complete',
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Section 1 · Unit 2 · Node 2
// 2.2 What's your job?
//
// 4 lessons × 20 questions = 80
//
// Lesson 1: Jobs
// Lesson 2: be — he / she / it / they
// Lesson 3: Asking about jobs and countries
// Lesson 4: Pronouns in context
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT2_NODE2_WORDS = [
  {
    code: 'en-job-job',
    english: 'job',
    senseKey: 'paid-work',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '직업; 일',
      'kasb; ish',
      'the work a person does regularly',
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
    media: {
      emoji: '💼',
      imageUrl: '',
      imageAlt: L(
        '직업을 나타내는 가방',
        'kasbni bildiruvchi sumka',
        'a briefcase representing a job',
        'портфель, обозначающий работу',
      ),
    },
    tags: ['jobs'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-job-doctor',
    english: 'doctor',
    senseKey: 'medical-doctor',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('의사', 'shifokor', 'a person who treats sick people', 'врач'),
    examples: [
      {
        english: 'He’s a doctor.',
        translations: L(
          '그는 의사예요.',
          'U shifokor.',
          'He’s a doctor.',
          'Он врач.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈdɒktə/',
      ttsText: 'doctor',
    },
    media: {
      emoji: '👨‍⚕️',
      imageUrl: '',
      imageAlt: L('의사', 'shifokor', 'a doctor', 'врач'),
    },
    tags: ['jobs', 'medical'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-job-engineer',
    english: 'engineer',
    senseKey: 'technical-worker',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '엔지니어; 기술자',
      'muhandis',
      'a person who designs or builds machines or systems',
      'инженер',
    ),
    examples: [
      {
        english: 'She’s an engineer.',
        translations: L(
          '그녀는 엔지니어예요.',
          'U muhandis.',
          'She’s an engineer.',
          'Она инженер.',
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
    tags: ['jobs'],
    difficulty: 1,
    usageNote: L(
      'engineer 앞에는 an을 써요.',
      'engineer oldidan an ishlatiladi.',
      'Use an before engineer.',
      'Перед engineer используется an.',
    ),
    isCore: true,
  },

  {
    code: 'en-job-nurse',
    english: 'nurse',
    senseKey: 'medical-nurse',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '간호사',
      'hamshira',
      'a person who cares for sick people',
      'медсестра; медбрат',
    ),
    examples: [
      {
        english: 'They’re nurses.',
        translations: L(
          '그들은 간호사예요.',
          'Ular hamshiralar.',
          'They’re nurses.',
          'Они медсёстры.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/nɜːs/',
      ttsText: 'nurse',
    },
    media: {
      emoji: '🧑‍⚕️',
      imageUrl: '',
      imageAlt: L('간호사', 'hamshira', 'a nurse', 'медсестра'),
    },
    tags: ['jobs', 'medical'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-job-shop-assistant',
    english: 'shop assistant',
    senseKey: 'store-worker',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '매장 직원; 판매원',
      'do‘kon sotuvchisi',
      'a person who works in a shop and helps customers',
      'продавец-консультант',
    ),
    examples: [
      {
        english: 'She’s a shop assistant.',
        translations: L(
          '그녀는 매장 직원이에요.',
          'U do‘kon sotuvchisi.',
          'She’s a shop assistant.',
          'Она продавец-консультант.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈʃɒp əˌsɪstənt/',
      ttsText: 'shop assistant',
    },
    media: {
      emoji: '🛍️',
      imageUrl: '',
      imageAlt: L(
        '매장 직원',
        'do‘kon sotuvchisi',
        'a shop assistant',
        'продавец-консультант',
      ),
    },
    tags: ['jobs', 'shop'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-job-student',
    english: 'student',
    senseKey: 'learner',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '학생',
      'talaba; o‘quvchi',
      'a person who studies',
      'студент; ученик',
    ),
    examples: [
      {
        english: 'They’re students.',
        translations: L(
          '그들은 학생이에요.',
          'Ular talabalar.',
          'They’re students.',
          'Они студенты.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈstjuːdənt/',
      ttsText: 'student',
    },
    media: {
      emoji: '🎓',
      imageUrl: '',
      imageAlt: L('학생', 'talaba', 'a student', 'студент'),
    },
    tags: ['jobs', 'study'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-job-taxi-driver',
    english: 'taxi driver',
    senseKey: 'taxi-worker',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '택시 기사',
      'taksi haydovchisi',
      'a person who drives a taxi',
      'таксист',
    ),
    examples: [
      {
        english: 'He’s a taxi driver.',
        translations: L(
          '그는 택시 기사예요.',
          'U taksi haydovchisi.',
          'He’s a taxi driver.',
          'Он таксист.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈtæksi ˌdraɪvə/',
      ttsText: 'taxi driver',
    },
    media: {
      emoji: '🚕',
      imageUrl: '',
      imageAlt: L('택시 기사', 'taksi haydovchisi', 'a taxi driver', 'таксист'),
    },
    tags: ['jobs', 'transport'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-job-teacher',
    english: 'teacher',
    senseKey: 'education-worker',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('교사; 선생님', 'o‘qituvchi', 'a person who teaches', 'учитель'),
    examples: [
      {
        english: 'Fernando is a teacher.',
        translations: L(
          'Fernando는 선생님이에요.',
          'Fernando o‘qituvchi.',
          'Fernando is a teacher.',
          'Фернандо — учитель.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈtiːtʃə/',
      ttsText: 'teacher',
    },
    media: {
      emoji: '🧑‍🏫',
      imageUrl: '',
      imageAlt: L('선생님', 'o‘qituvchi', 'a teacher', 'учитель'),
    },
    tags: ['jobs', 'education'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-job-waiter',
    english: 'waiter',
    senseKey: 'restaurant-server',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '웨이터; 식당 종업원',
      'ofitsiant',
      'a man who serves food in a restaurant',
      'официант',
    ),
    examples: [
      {
        english: 'Thierry’s a waiter.',
        translations: L(
          'Thierry는 웨이터예요.',
          'Thierry ofitsiant.',
          'Thierry’s a waiter.',
          'Тьерри — официант.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈweɪtə/',
      ttsText: 'waiter',
    },
    media: {
      emoji: '🍽️',
      imageUrl: '',
      imageAlt: L('웨이터', 'ofitsiant', 'a waiter', 'официант'),
    },
    tags: ['jobs', 'restaurant'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-job-chef',
    english: 'chef',
    senseKey: 'professional-cook',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('요리사; 셰프', 'oshpaz', 'a professional cook', 'шеф-повар'),
    examples: [
      {
        english: 'Frank is a chef.',
        translations: L(
          'Frank는 요리사예요.',
          'Frank oshpaz.',
          'Frank is a chef.',
          'Фрэнк — шеф-повар.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ʃef/',
      ttsText: 'chef',
    },
    media: {
      emoji: '👨‍🍳',
      imageUrl: '',
      imageAlt: L('요리사', 'oshpaz', 'a chef', 'шеф-повар'),
    },
    tags: ['jobs', 'restaurant'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-employment-unemployed',
    english: 'unemployed',
    senseKey: 'without-job',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '실업 상태인; 직업이 없는',
      'ishsiz',
      'without a job',
      'безработный',
    ),
    examples: [
      {
        english: 'He isn’t a waiter. He’s unemployed.',
        translations: L(
          '그는 웨이터가 아니에요. 직업이 없어요.',
          'U ofitsiant emas. U ishsiz.',
          'He isn’t a waiter. He’s unemployed.',
          'Он не официант. Он безработный.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌʌnɪmˈplɔɪd/',
      ttsText: 'unemployed',
    },
    media: {
      emoji: '💼',
      imageUrl: '',
      imageAlt: L(
        '직업을 찾고 있는 사람',
        'ish qidirayotgan odam',
        'a person looking for work',
        'человек, ищущий работу',
      ),
    },
    tags: ['jobs', 'employment'],
    difficulty: 1,
    isCore: false,
  },

  {
    code: 'en-place-school',
    english: 'school',
    senseKey: 'education-place',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('학교', 'maktab', 'a place where people learn', 'школа'),
    examples: [
      {
        english: 'He’s a teacher in a school.',
        translations: L(
          '그는 학교 선생님이에요.',
          'U maktabda o‘qituvchi.',
          'He’s a teacher in a school.',
          'Он учитель в школе.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/skuːl/',
      ttsText: 'school',
    },
    media: {
      emoji: '🏫',
      imageUrl: '',
      imageAlt: L('학교', 'maktab', 'a school', 'школа'),
    },
    tags: ['places', 'education'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-place-language-school',
    english: 'language school',
    senseKey: 'language-education-place',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '어학원; 언어 학교',
      'til maktabi',
      'a school where people study languages',
      'языковая школа',
    ),
    examples: [
      {
        english: 'She’s a teacher at a language school.',
        translations: L(
          '그녀는 어학원 선생님이에요.',
          'U til maktabida o‘qituvchi.',
          'She’s a teacher at a language school.',
          'Она учитель в языковой школе.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈlæŋɡwɪdʒ skuːl/',
      ttsText: 'language school',
    },
    media: {
      emoji: '🏫',
      imageUrl: '',
      imageAlt: L(
        '어학원',
        'til maktabi',
        'a language school',
        'языковая школа',
      ),
    },
    tags: ['places', 'education'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-place-hospital',
    english: 'hospital',
    senseKey: 'medical-place',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '병원',
      'kasalxona',
      'a place where sick or injured people receive treatment',
      'больница',
    ),
    examples: [
      {
        english: 'They’re nurses in a hospital.',
        translations: L(
          '그들은 병원 간호사예요.',
          'Ular kasalxonada hamshiralar.',
          'They’re nurses in a hospital.',
          'Они медсёстры в больнице.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈhɒspɪtl/',
      ttsText: 'hospital',
    },
    media: {
      emoji: '🏥',
      imageUrl: '',
      imageAlt: L('병원', 'kasalxona', 'a hospital', 'больница'),
    },
    tags: ['places', 'medical'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-hotel-restaurant',
    english: 'restaurant',
    senseKey: 'place-eat',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '식당; 레스토랑',
      'restoran',
      'a place where people pay to eat meals',
      'ресторан',
    ),
    examples: [
      {
        english: 'Frank is a chef in a restaurant.',
        translations: L(
          'Frank는 식당 요리사예요.',
          'Frank restoranda oshpaz.',
          'Frank is a chef in a restaurant.',
          'Фрэнк — шеф-повар в ресторане.',
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
      imageAlt: L('레스토랑', 'restoran', 'a restaurant', 'ресторан'),
    },
    tags: ['places', 'restaurant'],
    difficulty: 1,
    isCore: false,
  },
];

export const EN_S1_UNIT2_NODE2_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Jobs
  // ===========================================================

  en_s1u2_n2_001_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      { korean: 'doctor', native: 'shifokor' },
      { korean: 'nurse', native: 'hamshira' },
      { korean: 'student', native: 'talaba' },
      { korean: 'teacher', native: 'o‘qituvchi' },
      { korean: 'waiter', native: 'ofitsiant' },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['jobs', 'matching'],
  },

  en_s1u2_n2_002_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Doctor.',
    audioText: 'Doctor.',
    answerTranslation: L('의사.', 'Shifokor.', 'Doctor.', 'Врач.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['jobs', 'doctor', 'stress'],
  },

  en_s1u2_n2_003_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I’m a ___.',
    blankAnswers: ['doctor'],
    options: ['teacher', 'doctor', 'student', 'nurse'],
    answer: 'doctor',
    answerTranslation: L(
      '저는 의사예요.',
      'Men shifokorman.',
      'I’m a doctor.',
      'Я врач.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['jobs', 'doctor'],
  },

  en_s1u2_n2_004_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Engineer.',
    audioText: 'Engineer.',
    answerTranslation: L('엔지니어.', 'Muhandis.', 'Engineer.', 'Инженер.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['jobs', 'engineer', 'stress'],
  },

  en_s1u2_n2_005_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      { korean: 'doctor', native: 'shifokor' },
      { korean: 'nurse', native: 'hamshira' },
      { korean: 'student', native: 'talaba' },
      { korean: 'teacher', native: 'o‘qituvchi' },
      { korean: 'waiter', native: 'ofitsiant' },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['jobs', 'listening'],
  },

  en_s1u2_n2_006_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Nurse.',
    audioText: 'Nurse.',
    answerTranslation: L('간호사.', 'Hamshira.', 'Nurse.', 'Медсестра.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['jobs', 'nurse'],
  },

  en_s1u2_n2_007_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Harry’s ___ engineer.',
    blankAnswers: ['an'],
    options: ['a', 'an', 'are', 'the'],
    answer: 'an',
    answerTranslation: L(
      'Harry는 엔지니어예요.',
      'Harry muhandis.',
      'Harry’s an engineer.',
      'Гарри — инженер.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['jobs', 'article', 'engineer'],
  },

  en_s1u2_n2_008_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Shop assistant.',
    audioText: 'Shop assistant.',
    answerTranslation: L(
      '매장 직원.',
      'Do‘kon sotuvchisi.',
      'Shop assistant.',
      'Продавец-консультант.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['jobs', 'shop-assistant', 'stress'],
  },

  en_s1u2_n2_009_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['She’s', 'a', 'shop', 'assistant', 'doctor', 'They’re'],
    answer: 'She’s a shop assistant',
    answerTranslation: L(
      '그녀는 매장 직원이에요.',
      'U do‘kon sotuvchisi.',
      'She’s a shop assistant.',
      'Она продавец-консультант.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['jobs', 'shop-assistant'],
  },

  en_s1u2_n2_010_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Student.',
    audioText: 'Student.',
    answerTranslation: L('학생.', 'Talaba.', 'Student.', 'Студент.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['jobs', 'student', 'stress'],
  },

  en_s1u2_n2_011_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What’s your job?' }],
    options: [
      'I’m a student.',
      'I’m from Japan.',
      'They’re nurses.',
      'It’s a school.',
    ],
    answer: 'I’m a student.',
    answerTranslation: L(
      '저는 학생이에요.',
      'Men talabaman.',
      'I’m a student.',
      'Я студент.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['jobs', 'dialog'],
  },

  en_s1u2_n2_012_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Taxi driver.',
    audioText: 'Taxi driver.',
    answerTranslation: L(
      '택시 기사.',
      'Taksi haydovchisi.',
      'Taxi driver.',
      'Таксист.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['jobs', 'taxi-driver', 'stress'],
  },

  en_s1u2_n2_013_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['a', 'driver', 'He’s', 'taxi', 'teacher', 'an'],
    answer: 'He’s a taxi driver',
    audioText: 'He’s a taxi driver.',
    answerTranslation: L(
      '그는 택시 기사예요.',
      'U taksi haydovchisi.',
      'He’s a taxi driver.',
      'Он таксист.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['jobs', 'taxi-driver'],
  },

  en_s1u2_n2_014_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Teacher.',
    audioText: 'Teacher.',
    answerTranslation: L('선생님.', 'O‘qituvchi.', 'Teacher.', 'Учитель.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['jobs', 'teacher', 'stress'],
  },

  en_s1u2_n2_015_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '네 음절인 직업을 고르세요.',
      'To‘rt bo‘g‘inli kasbni tanlang.',
      'Choose the four-syllable job.',
      'Выберите профессию из четырёх слогов.',
    ),
    sentenceTemplate: '___',
    blankAnswers: ['taxi driver'],
    options: ['waiter', 'teacher', 'doctor', 'taxi driver'],
    answer: 'taxi driver',
    answerTranslation: L(
      'taxi driver는 네 음절이에요.',
      'taxi driver to‘rt bo‘g‘inli.',
      'taxi driver has four syllables.',
      'taxi driver состоит из четырёх слогов.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['jobs', 'stress', 'syllables'],
  },

  en_s1u2_n2_016_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Waiter.',
    audioText: 'Waiter.',
    answerTranslation: L('웨이터.', 'Ofitsiant.', 'Waiter.', 'Официант.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['jobs', 'waiter', 'stress'],
  },

  en_s1u2_n2_017_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What’s your job?',
    options: ['I’m', 'a', 'teacher', 'They’re', 'doctor', 'from'],
    answer: 'I’m a teacher',
    answerTranslation: L(
      '저는 선생님이에요.',
      'Men o‘qituvchiman.',
      'I’m a teacher.',
      'Я учитель.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['jobs', 'reply-builder'],
  },

  en_s1u2_n2_018_speaking: {
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
    difficulty: 1,
    tags: ['jobs', 'question'],
  },

  en_s1u2_n2_019_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Thierry’s a waiter.',
    audioText: 'Thierry’s a waiter.',
    answerI18n: L(
      'Thierry는 웨이터예요',
      'Thierry ofitsiant',
      'Thierry is a waiter',
      'Тьерри официант',
    ),
    options: ['Thierry’s', 'a', 'waiter', 'teacher', 'They’re'],
    optionsI18n: {
      ko: ['Thierry는', '웨이터예요', '선생님이에요', '간호사예요'],
      uz: ['Thierry', 'ofitsiant', 'o‘qituvchi', 'hamshira'],
      en: ['Thierry', 'is', 'a', 'waiter', 'teacher', 'nurse'],
      ru: ['Тьерри', 'официант', 'учитель', 'медбрат'],
    },
    answerTranslation: L(
      'Thierry는 웨이터예요.',
      'Thierry ofitsiant.',
      'Thierry’s a waiter.',
      'Тьерри — официант.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['jobs', 'sentence-builder'],
  },

  en_s1u2_n2_020_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I’m a doctor.',
    audioText: 'I’m a doctor.',
    answerTranslation: L(
      '저는 의사예요.',
      'Men shifokorman.',
      'I’m a doctor.',
      'Я врач.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['jobs', 'review'],
  },

  // ===========================================================
  // Lesson 2 · be: he / she / it / they
  // ===========================================================

  en_s1u2_n2_021_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'He’s a teacher.',
    audioText: 'He’s a teacher.',
    answerTranslation: L(
      '그는 선생님이에요.',
      'U o‘qituvchi.',
      'He’s a teacher.',
      'Он учитель.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'he', 'positive'],
  },

  en_s1u2_n2_022_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'He ___ a teacher.',
    blankAnswers: ['is'],
    options: ['is', 'are', 'am', 'aren’t'],
    answer: 'is',
    answerTranslation: L(
      '그는 선생님이에요.',
      'U o‘qituvchi.',
      'He is a teacher.',
      'Он учитель.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'he'],
  },

  en_s1u2_n2_023_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She’s an engineer.',
    audioText: 'She’s an engineer.',
    answerTranslation: L(
      '그녀는 엔지니어예요.',
      'U muhandis.',
      'She’s an engineer.',
      'Она инженер.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'she', 'positive'],
  },

  en_s1u2_n2_024_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['She’s', 'an', 'engineer', 'They’re', 'doctor', 'a'],
    answer: 'She’s an engineer',
    answerTranslation: L(
      '그녀는 엔지니어예요.',
      'U muhandis.',
      'She’s an engineer.',
      'Она инженер.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'she'],
  },

  en_s1u2_n2_025_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'They’re nurses.',
    audioText: 'They’re nurses.',
    answerTranslation: L(
      '그들은 간호사예요.',
      'Ular hamshiralar.',
      'They’re nurses.',
      'Они медсёстры.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'they', 'positive'],
  },

  en_s1u2_n2_026_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'They ___ nurses.',
    blankAnswers: ['are'],
    options: ['is', 'am', 'are', 'isn’t'],
    answer: 'are',
    answerTranslation: L(
      '그들은 간호사예요.',
      'Ular hamshiralar.',
      'They are nurses.',
      'Они медсёстры.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'they'],
  },

  en_s1u2_n2_027_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'It’s a language school.',
    audioText: 'It’s a language school.',
    answerTranslation: L(
      '그곳은 어학원이에요.',
      'Bu til maktabi.',
      'It’s a language school.',
      'Это языковая школа.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'it', 'school'],
  },

  en_s1u2_n2_028_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['a', 'school', 'language', 'It’s', 'They’re', 'hospital'],
    answer: 'It’s a language school',
    audioText: 'It’s a language school.',
    answerTranslation: L(
      '그곳은 어학원이에요.',
      'Bu til maktabi.',
      'It’s a language school.',
      'Это языковая школа.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['be', 'it'],
  },

  en_s1u2_n2_029_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'He isn’t a student.',
    audioText: 'He isn’t a student.',
    answerTranslation: L(
      '그는 학생이 아니에요.',
      'U talaba emas.',
      'He isn’t a student.',
      'Он не студент.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'he', 'negative'],
  },

  en_s1u2_n2_030_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'He ___ a student.',
    blankAnswers: ['isn’t'],
    options: ['is', 'isn’t', 'aren’t', 'am not'],
    answer: 'isn’t',
    answerTranslation: L(
      '그는 학생이 아니에요.',
      'U talaba emas.',
      'He isn’t a student.',
      'Он не студент.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'negative'],
  },

  en_s1u2_n2_031_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She isn’t a doctor.',
    audioText: 'She isn’t a doctor.',
    answerTranslation: L(
      '그녀는 의사가 아니에요.',
      'U shifokor emas.',
      'She isn’t a doctor.',
      'Она не врач.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'she', 'negative'],
  },

  en_s1u2_n2_032_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Is she a doctor?',
    options: ['No', 'she', 'isn’t', 'They', 'aren’t', 'teacher'],
    answer: 'No she isn’t',
    answerTranslation: L(
      '아니요, 의사가 아니에요.',
      'Yo‘q, u shifokor emas.',
      'No, she isn’t.',
      'Нет.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['be', 'she', 'short-answer'],
  },

  en_s1u2_n2_033_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'They aren’t doctors.',
    audioText: 'They aren’t doctors.',
    answerTranslation: L(
      '그들은 의사가 아니에요.',
      'Ular shifokor emas.',
      'They aren’t doctors.',
      'Они не врачи.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'they', 'negative'],
  },

  en_s1u2_n2_034_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'They ___ doctors.',
    blankAnswers: ['aren’t'],
    options: ['isn’t', 'are', 'aren’t', 'is'],
    answer: 'aren’t',
    answerTranslation: L(
      '그들은 의사가 아니에요.',
      'Ular shifokor emas.',
      'They aren’t doctors.',
      'Они не врачи.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'they', 'negative'],
  },

  en_s1u2_n2_035_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Is he a teacher?',
    audioText: 'Is he a teacher?',
    answerTranslation: L(
      '그는 선생님이에요?',
      'U o‘qituvchimi?',
      'Is he a teacher?',
      'Он учитель?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'he', 'question'],
  },

  en_s1u2_n2_036_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Is Fernando a student?' }],
    options: [
      'No, he isn’t. He’s a teacher.',
      'No, they aren’t.',
      'Yes, she is.',
      'It’s a school.',
    ],
    answer: 'No, he isn’t. He’s a teacher.',
    answerTranslation: L(
      '아니요. 그는 학생이 아니고 선생님이에요.',
      'Yo‘q. U talaba emas. U o‘qituvchi.',
      'No, he isn’t. He’s a teacher.',
      'Нет. Он не студент. Он учитель.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['be', 'he', 'dialog'],
  },

  en_s1u2_n2_037_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Are they doctors?',
    audioText: 'Are they doctors?',
    answerTranslation: L(
      '그들은 의사예요?',
      'Ular shifokormi?',
      'Are they doctors?',
      'Они врачи?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'they', 'question'],
  },

  en_s1u2_n2_038_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'No, they aren’t.',
    audioText: 'No, they aren’t.',
    answerI18n: L(
      '아니요 그들은 아니에요',
      'Yo‘q ular emas',
      'No they aren’t',
      'Нет они не являются',
    ),
    options: ['No', 'they', 'aren’t', 'Yes', 'he', 'is'],
    optionsI18n: {
      ko: ['아니요', '그들은', '아니에요', '네', '그는'],
      uz: ['Yo‘q', 'ular', 'emas', 'Ha', 'u'],
      en: ['No', 'they', 'aren’t', 'Yes', 'he', 'is'],
      ru: ['Нет', 'они', 'не', 'Да', 'он'],
    },
    answerTranslation: L(
      '아니요, 아니에요.',
      'Yo‘q.',
      'No, they aren’t.',
      'Нет.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['be', 'short-answer'],
  },

  en_s1u2_n2_039_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Yes, they are.',
    audioText: 'Yes, they are.',
    answerTranslation: L('네, 맞아요.', 'Ha.', 'Yes, they are.', 'Да.'),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'short-answer'],
  },

  en_s1u2_n2_040_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['They', 'aren’t', 'doctors', 'isn’t', 'a', 'teacher'],
    answer: 'They aren’t doctors',
    answerTranslation: L(
      '그들은 의사가 아니에요.',
      'Ular shifokor emas.',
      'They aren’t doctors.',
      'Они не врачи.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'negative', 'review'],
  },

  // ===========================================================
  // Lesson 3 · What’s his/her job?
  // ===========================================================

  en_s1u2_n2_041_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Is he a doctor?',
    audioText: 'Is he a doctor?',
    answerTranslation: L(
      '그는 의사예요?',
      'U shifokormi?',
      'Is he a doctor?',
      'Он врач?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['jobs', 'question'],
  },

  en_s1u2_n2_042_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ he a doctor?',
    blankAnswers: ['Is'],
    options: ['Are', 'Is', 'Am', 'Does'],
    answer: 'Is',
    answerTranslation: L(
      '그는 의사예요?',
      'U shifokormi?',
      'Is he a doctor?',
      'Он врач?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'he', 'question'],
  },

  en_s1u2_n2_043_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'No, he isn’t.',
    audioText: 'No, he isn’t.',
    answerTranslation: L('아니요, 아니에요.', 'Yo‘q.', 'No, he isn’t.', 'Нет.'),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'short-answer'],
  },

  en_s1u2_n2_044_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Is he a student?',
    options: ['No', 'he', 'isn’t', 'He’s', 'a', 'teacher', 'nurse'],
    answer: 'No he isn’t',
    answerTranslation: L(
      '아니요, 학생이 아니에요.',
      'Yo‘q, u talaba emas.',
      'No, he isn’t.',
      'Нет.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['be', 'short-answer', 'reply-builder'],
  },

  en_s1u2_n2_045_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'He’s a teacher.',
    audioText: 'He’s a teacher.',
    answerTranslation: L(
      '그는 선생님이에요.',
      'U o‘qituvchi.',
      'He’s a teacher.',
      'Он учитель.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['jobs', 'teacher'],
  },

  en_s1u2_n2_046_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['from', 'Mexico', 'He’s', 'Japan', 'They’re'],
    answer: 'He’s from Mexico',
    audioText: 'He’s from Mexico.',
    answerTranslation: L(
      '그는 멕시코 출신이에요.',
      'U Meksikadan.',
      'He’s from Mexico.',
      'Он из Мексики.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['be', 'country'],
  },

  en_s1u2_n2_047_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Is she an engineer?',
    audioText: 'Is she an engineer?',
    answerTranslation: L(
      '그녀는 엔지니어예요?',
      'U muhandismi?',
      'Is she an engineer?',
      'Она инженер?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['jobs', 'engineer'],
  },

  en_s1u2_n2_048_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Yes, she ___.',
    blankAnswers: ['is'],
    options: ['is', 'are', 'isn’t', 'aren’t'],
    answer: 'is',
    answerTranslation: L('네, 맞아요.', 'Ha.', 'Yes, she is.', 'Да.'),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'she', 'short-answer'],
  },

  en_s1u2_n2_049_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She’s an engineer.',
    audioText: 'She’s an engineer.',
    answerTranslation: L(
      '그녀는 엔지니어예요.',
      'U muhandis.',
      'She’s an engineer.',
      'Она инженер.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['jobs', 'engineer'],
  },

  en_s1u2_n2_050_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['She’s', 'from', 'Russia', 'They’re', 'doctor', 'France'],
    answer: 'She’s from Russia',
    answerTranslation: L(
      '그녀는 러시아 출신이에요.',
      'U Rossiyadan.',
      'She’s from Russia.',
      'Она из России.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'country'],
  },

  en_s1u2_n2_051_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Are they doctors?',
    audioText: 'Are they doctors?',
    answerTranslation: L(
      '그들은 의사예요?',
      'Ular shifokormi?',
      'Are they doctors?',
      'Они врачи?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['jobs', 'they'],
  },

  en_s1u2_n2_052_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Are Jack and Katie doctors?' }],
    options: [
      'No, they aren’t. They’re nurses.',
      'No, he isn’t.',
      'Yes, she is.',
      'It’s a hospital.',
    ],
    answer: 'No, they aren’t. They’re nurses.',
    answerTranslation: L(
      '아니요. 그들은 의사가 아니라 간호사예요.',
      'Yo‘q. Ular shifokor emas. Ular hamshiralar.',
      'No, they aren’t. They’re nurses.',
      'Нет. Они не врачи. Они медсёстры.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['jobs', 'they', 'dialog'],
  },

  en_s1u2_n2_053_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'They’re nurses.',
    audioText: 'They’re nurses.',
    answerTranslation: L(
      '그들은 간호사예요.',
      'Ular hamshiralar.',
      'They’re nurses.',
      'Они медсёстры.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['jobs', 'nurse'],
  },

  en_s1u2_n2_054_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'They’re nurses in a hospital.',
    audioText: 'They’re nurses in a hospital.',
    answerI18n: L(
      '그들은 병원 간호사예요',
      'Ular kasalxonada hamshiralar',
      'They are nurses in a hospital',
      'Они медсёстры в больнице',
    ),
    options: ['They’re', 'nurses', 'in', 'a', 'hospital', 'doctors', 'school'],
    optionsI18n: {
      ko: ['그들은', '병원', '간호사예요', '의사예요', '학교'],
      uz: ['Ular', 'kasalxonada', 'hamshiralar', 'shifokorlar', 'maktabda'],
      en: ['They', 'are', 'nurses', 'in', 'a', 'hospital', 'doctors'],
      ru: ['Они', 'медсёстры', 'в', 'больнице', 'врачи', 'школе'],
    },
    answerTranslation: L(
      '그들은 병원 간호사예요.',
      'Ular kasalxonada hamshiralar.',
      'They’re nurses in a hospital.',
      'Они медсёстры в больнице.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['jobs', 'hospital'],
  },

  en_s1u2_n2_055_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Is he from Germany?',
    audioText: 'Is he from Germany?',
    answerTranslation: L(
      '그는 독일 출신이에요?',
      'U Germaniyadanmi?',
      'Is he from Germany?',
      'Он из Германии?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['country', 'question'],
  },

  en_s1u2_n2_056_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'No, he ___.',
    blankAnswers: ['isn’t'],
    options: ['is', 'isn’t', 'are', 'aren’t'],
    answer: 'isn’t',
    answerTranslation: L('아니요, 아니에요.', 'Yo‘q.', 'No, he isn’t.', 'Нет.'),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'short-answer'],
  },

  en_s1u2_n2_057_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'He’s from France.',
    audioText: 'He’s from France.',
    answerTranslation: L(
      '그는 프랑스 출신이에요.',
      'U Fransiyadan.',
      'He’s from France.',
      'Он из Франции.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['country', 'origin'],
  },

  en_s1u2_n2_058_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Is she a teacher?',
    options: ['Yes', 'she', 'is', 'No', 'they', 'aren’t', 'doctor'],
    answer: 'Yes she is',
    answerTranslation: L('네, 맞아요.', 'Ha.', 'Yes, she is.', 'Да.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['be', 'short-answer', 'reply-builder'],
  },

  en_s1u2_n2_059_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She’s a teacher.',
    audioText: 'She’s a teacher.',
    answerTranslation: L(
      '그녀는 선생님이에요.',
      'U o‘qituvchi.',
      'She’s a teacher.',
      'Она учитель.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['jobs', 'teacher'],
  },

  en_s1u2_n2_060_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['from', 'They’re', 'Slovakia', 'Russia', 'She’s'],
    answer: 'They’re from Slovakia',
    audioText: 'They’re from Slovakia.',
    answerTranslation: L(
      '그들은 슬로바키아 출신이에요.',
      'Ular Slovakiyadan.',
      'They’re from Slovakia.',
      'Они из Словакии.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['country', 'they'],
  },

  // ===========================================================
  // Lesson 4 · Understanding pronouns
  // ===========================================================

  en_s1u2_n2_061_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Julie is an engineer.',
    audioText: 'Julie is an engineer.',
    answerTranslation: L(
      'Julie는 엔지니어예요.',
      'Julie muhandis.',
      'Julie is an engineer.',
      'Джули — инженер.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['reading', 'julie', 'engineer'],
  },

  en_s1u2_n2_062_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      'Julie를 가리키는 대명사를 고르세요.',
      'Julie o‘rniga ishlatiladigan olmoshni tanlang.',
      'Choose the pronoun that refers to Julie.',
      'Выберите местоимение, которое заменяет Julie.',
    ),
    sentenceTemplate: 'Julie is an engineer. ___ is from Australia.',
    blankAnswers: ['She'],
    options: ['He', 'She', 'It', 'They'],
    answer: 'She',
    answerTranslation: L(
      'Julie는 엔지니어예요. 그녀는 호주 출신이에요.',
      'Julie muhandis. U Avstraliyadan.',
      'Julie is an engineer. She is from Australia.',
      'Джули — инженер. Она из Австралии.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['pronouns', 'she'],
  },

  en_s1u2_n2_063_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Frank is a chef.',
    audioText: 'Frank is a chef.',
    answerTranslation: L(
      'Frank는 요리사예요.',
      'Frank oshpaz.',
      'Frank is a chef.',
      'Фрэнк — шеф-повар.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['reading', 'frank', 'chef'],
  },

  en_s1u2_n2_064_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      'Frank를 가리키는 대명사를 고르세요.',
      'Frank o‘rniga ishlatiladigan olmoshni tanlang.',
      'Choose the pronoun that refers to Frank.',
      'Выберите местоимение, которое заменяет Frank.',
    ),
    sentenceTemplate: 'Frank is a chef. ___ is on holiday.',
    blankAnswers: ['He'],
    options: ['She', 'It', 'They', 'He'],
    answer: 'He',
    answerTranslation: L(
      'Frank는 요리사예요. 그는 휴가 중이에요.',
      'Frank oshpaz. U ta’tilda.',
      'Frank is a chef. He is on holiday.',
      'Фрэнк — шеф-повар. Он в отпуске.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['pronouns', 'he'],
  },

  en_s1u2_n2_065_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'They’re from Australia.',
    audioText: 'They’re from Australia.',
    answerTranslation: L(
      '그들은 호주 출신이에요.',
      'Ular Avstraliyadan.',
      'They’re from Australia.',
      'Они из Австралии.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['reading', 'they'],
  },

  en_s1u2_n2_066_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      'Julie와 Frank를 함께 가리키는 대명사를 고르세요.',
      'Julie va Frank o‘rniga ishlatiladigan olmoshni tanlang.',
      'Choose the pronoun that refers to Julie and Frank.',
      'Выберите местоимение, которое заменяет Julie и Frank.',
    ),
    sentenceTemplate:
      'Julie and Frank are in Italy. ___ are there for ten days.',
    blankAnswers: ['They'],
    options: ['He', 'She', 'It', 'They'],
    answer: 'They',
    answerTranslation: L(
      'Julie와 Frank는 이탈리아에 있어요. 그들은 열흘 동안 그곳에 있어요.',
      'Julie va Frank Italiyada. Ular u yerda o‘n kun.',
      'Julie and Frank are in Italy. They are there for ten days.',
      'Джули и Фрэнк в Италии. Они там десять дней.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['pronouns', 'they'],
  },

  en_s1u2_n2_067_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'It’s an Italian restaurant.',
    audioText: 'It’s an Italian restaurant.',
    answerTranslation: L(
      '그곳은 이탈리아 식당이에요.',
      'Bu italyan restorani.',
      'It’s an Italian restaurant.',
      'Это итальянский ресторан.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['reading', 'it', 'restaurant'],
  },

  en_s1u2_n2_068_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      'restaurant를 대신하는 대명사를 고르세요.',
      'restaurant o‘rniga ishlatiladigan olmoshni tanlang.',
      'Choose the pronoun that replaces restaurant.',
      'Выберите местоимение, заменяющее restaurant.',
    ),
    sentenceTemplate: 'The restaurant is in Melbourne. ___ is Italian.',
    blankAnswers: ['It'],
    options: ['It', 'He', 'She', 'They'],
    answer: 'It',
    answerTranslation: L(
      '그 식당은 멜버른에 있어요. 이탈리아 식당이에요.',
      'Restoran Melburnda. U italyan restorani.',
      'The restaurant is in Melbourne. It is Italian.',
      'Ресторан находится в Мельбурне. Он итальянский.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['pronouns', 'it'],
  },

  en_s1u2_n2_069_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['business', 'She’s', 'on', 'holiday', 'He’s'],
    answer: 'She’s on business',
    audioText: 'She’s on business.',
    answerTranslation: L(
      '그녀는 업무로 그곳에 있어요.',
      'U ish bilan u yerda.',
      'She’s on business.',
      'Она там по делам.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['reading', 'julie', 'business'],
  },

  en_s1u2_n2_070_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'He’s on holiday.',
    audioText: 'He’s on holiday.',
    answerTranslation: L(
      '그는 휴가 중이에요.',
      'U ta’tilda.',
      'He’s on holiday.',
      'Он в отпуске.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['reading', 'frank', 'holiday'],
  },

  en_s1u2_n2_071_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Who is an engineer?' }],
    options: [
      'Julie is.',
      'Frank is.',
      'The restaurant is.',
      'They are chefs.',
    ],
    answer: 'Julie is.',
    answerTranslation: L('Julie예요.', 'Julie.', 'Julie is.', 'Джули.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['reading', 'julie'],
  },

  en_s1u2_n2_072_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Arturo is from Mexico.',
    audioText: 'Arturo is from Mexico.',
    answerTranslation: L(
      'Arturo는 멕시코 출신이에요.',
      'Arturo Meksikadan.',
      'Arturo is from Mexico.',
      'Артуро из Мексики.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['reading', 'arturo'],
  },

  en_s1u2_n2_073_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Arturo is from Mexico. ___ is a doctor.',
    blankAnswers: ['He'],
    options: ['They', 'She', 'He', 'It'],
    answer: 'He',
    answerTranslation: L(
      'Arturo는 멕시코 출신이에요. 그는 의사예요.',
      'Arturo Meksikadan. U shifokor.',
      'Arturo is from Mexico. He is a doctor.',
      'Артуро из Мексики. Он врач.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['pronouns', 'he', 'arturo'],
  },

  en_s1u2_n2_074_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Romina is from Argentina.',
    audioText: 'Romina is from Argentina.',
    answerTranslation: L(
      'Romina는 아르헨티나 출신이에요.',
      'Romina Argentinadan.',
      'Romina is from Argentina.',
      'Ромина из Аргентины.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['reading', 'romina'],
  },

  en_s1u2_n2_075_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Romina is a teacher. ___ works at a language school.',
    blankAnswers: ['She'],
    options: ['It', 'They', 'He', 'She'],
    answer: 'She',
    answerTranslation: L(
      'Romina는 선생님이에요. 그녀는 어학원에서 일해요.',
      'Romina o‘qituvchi. U til maktabida ishlaydi.',
      'Romina is a teacher. She works at a language school.',
      'Ромина — учитель. Она работает в языковой школе.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['pronouns', 'she', 'romina'],
  },

  en_s1u2_n2_076_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Who’s there on business?',
    options: ['Arturo', 'is', 'Romina', 'They', 'are', 'holiday'],
    answer: 'Arturo is',
    answerTranslation: L('Arturo예요.', 'Arturo.', 'Arturo is.', 'Артуро.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['reading', 'business'],
  },

  en_s1u2_n2_077_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'They’re in Thailand.',
    audioText: 'They’re in Thailand.',
    answerTranslation: L(
      '그들은 태국에 있어요.',
      'Ular Tailandda.',
      'They’re in Thailand.',
      'Они в Таиланде.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['reading', 'they', 'thailand'],
  },

  en_s1u2_n2_078_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'She’s a teacher at a language school.',
    audioText: 'She’s a teacher at a language school.',
    answerI18n: L(
      '그녀는 어학원 선생님이에요',
      'U til maktabida o‘qituvchi',
      'She is a teacher at a language school',
      'Она учитель в языковой школе',
    ),
    options: [
      'She’s',
      'a',
      'teacher',
      'at',
      'language',
      'school',
      'doctor',
      'hospital',
    ],
    optionsI18n: {
      ko: ['그녀는', '어학원', '선생님이에요', '의사예요', '병원'],
      uz: ['U', 'til', 'maktabida', 'o‘qituvchi', 'shifokor', 'kasalxonada'],
      en: ['She', 'is', 'a', 'teacher', 'at', 'language', 'school', 'doctor'],
      ru: ['Она', 'учитель', 'в', 'языковой', 'школе', 'врач', 'больнице'],
    },
    answerTranslation: L(
      '그녀는 어학원 선생님이에요.',
      'U til maktabida o‘qituvchi.',
      'She’s a teacher at a language school.',
      'Она учитель в языковой школе.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['reading', 'romina', 'language-school'],
  },

  en_s1u2_n2_079_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'He’s a doctor at a hospital.',
    audioText: 'He’s a doctor at a hospital.',
    answerTranslation: L(
      '그는 병원 의사예요.',
      'U kasalxonada shifokor.',
      'He’s a doctor at a hospital.',
      'Он врач в больнице.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['reading', 'arturo', 'hospital'],
  },

  en_s1u2_n2_080_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Who’s in Thailand?' },
      { speaker: 'user', text: 'Arturo and Romina.' },
      { speaker: 'npc', text: 'Are they there on business?' },
    ],
    options: [
      'He is, but she isn’t.',
      'She is, but he isn’t.',
      'Yes, they’re doctors.',
      'No, they’re in Mexico.',
    ],
    answer: 'He is, but she isn’t.',
    answerTranslation: L(
      'Arturo는 업무로 갔지만 Romina는 아니에요.',
      'Arturo ish bilan, Romina esa yo‘q.',
      'He is, but she isn’t.',
      'Он — да, а она — нет.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['reading', 'pronouns', 'review'],
  },
};

// ─────────────────────────────────────────────────────────────
// Node 2
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT2_NODE2 = {
  title: L(
    '직업이 뭐예요?',
    'Kasbingiz nima?',
    'What’s your job?',
    'Кем вы работаете?',
  ),
  section: 1,
  unit: 2,
  order: 2,
  isActive: true,

  lessons: [
    {
      title: L('직업 이름', 'Kasblar', 'Jobs', 'Профессии'),
      description: L(
        '자주 쓰는 직업 이름을 듣고 말하며 직업명 강세를 익혀요.',
        'Asosiy kasb nomlarini tinglab aytasiz va urg‘usini mashq qilasiz.',
        'Learn common job names and practise their word stress.',
        'Учимся называть профессии и правильно ставить ударение.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 1,
      questions: [
        'en_s1u2_n2_001_word_matching',
        'en_s1u2_n2_002_speaking',
        'en_s1u2_n2_003_fill_in_blank',
        'en_s1u2_n2_004_speaking',
        'en_s1u2_n2_005_audio_match',
        'en_s1u2_n2_006_speaking',
        'en_s1u2_n2_007_fill_in_blank',
        'en_s1u2_n2_008_speaking',
        'en_s1u2_n2_009_translate_builder',
        'en_s1u2_n2_010_speaking',
        'en_s1u2_n2_011_dialog_complete',
        'en_s1u2_n2_012_speaking',
        'en_s1u2_n2_013_word_arrange',
        'en_s1u2_n2_014_speaking',
        'en_s1u2_n2_015_fill_in_blank',
        'en_s1u2_n2_016_speaking',
        'en_s1u2_n2_017_reply_builder',
        'en_s1u2_n2_018_speaking',
        'en_s1u2_n2_019_sentence_builder',
        'en_s1u2_n2_020_speaking',
      ],
    },

    {
      title: L(
        'He, she, it, they와 be',
        'He, she, it, they va be',
        'Be with he, she, it and they',
        'Be с he, she, it и they',
      ),
      description: L(
        'he, she, it, they에 맞춰 is와 are를 사용하고 부정문과 질문도 만들어요.',
        'he, she, it va they bilan is va are ishlatib, inkor va savol shakllarini tuzasiz.',
        'Use is and are with he, she, it and they in positive, negative and question forms.',
        'Используем is и are с he, she, it и they в утверждениях, отрицаниях и вопросах.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 2,
      questions: [
        'en_s1u2_n2_021_speaking',
        'en_s1u2_n2_022_fill_in_blank',
        'en_s1u2_n2_023_speaking',
        'en_s1u2_n2_024_translate_builder',
        'en_s1u2_n2_025_speaking',
        'en_s1u2_n2_026_fill_in_blank',
        'en_s1u2_n2_027_speaking',
        'en_s1u2_n2_028_word_arrange',
        'en_s1u2_n2_029_speaking',
        'en_s1u2_n2_030_fill_in_blank',
        'en_s1u2_n2_031_speaking',
        'en_s1u2_n2_032_reply_builder',
        'en_s1u2_n2_033_speaking',
        'en_s1u2_n2_034_fill_in_blank',
        'en_s1u2_n2_035_speaking',
        'en_s1u2_n2_036_dialog_complete',
        'en_s1u2_n2_037_speaking',
        'en_s1u2_n2_038_sentence_builder',
        'en_s1u2_n2_039_speaking',
        'en_s1u2_n2_040_translate_builder',
      ],
    },

    {
      title: L(
        '직업과 출신 묻기',
        'Kasb va kelib chiqishni so‘rash',
        'Jobs and countries',
        'Профессии и страны',
      ),
      description: L(
        '상대의 직업과 출신을 묻고 Yes/No 짧은 대답으로 자연스럽게 답해요.',
        'Odamning kasbi va qayerdan ekanini so‘rab, qisqa Yes/No javoblarini mashq qilasiz.',
        'Ask about people’s jobs and countries and use short Yes/No answers.',
        'Спрашиваем о профессии и происхождении и используем краткие ответы Yes/No.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 3,
      questions: [
        'en_s1u2_n2_041_speaking',
        'en_s1u2_n2_042_fill_in_blank',
        'en_s1u2_n2_043_speaking',
        'en_s1u2_n2_044_reply_builder',
        'en_s1u2_n2_045_speaking',
        'en_s1u2_n2_046_word_arrange',
        'en_s1u2_n2_047_speaking',
        'en_s1u2_n2_048_fill_in_blank',
        'en_s1u2_n2_049_speaking',
        'en_s1u2_n2_050_translate_builder',
        'en_s1u2_n2_051_speaking',
        'en_s1u2_n2_052_dialog_complete',
        'en_s1u2_n2_053_speaking',
        'en_s1u2_n2_054_sentence_builder',
        'en_s1u2_n2_055_speaking',
        'en_s1u2_n2_056_fill_in_blank',
        'en_s1u2_n2_057_speaking',
        'en_s1u2_n2_058_reply_builder',
        'en_s1u2_n2_059_speaking',
        'en_s1u2_n2_060_word_arrange',
      ],
    },

    {
      title: L(
        '누구를 가리킬까요?',
        'Olmosh kimni bildiradi?',
        'Understanding pronouns',
        'Понимаем местоимения',
      ),
      description: L(
        '짧은 글 속에서 he, she, it, they가 어떤 사람이나 장소를 가리키는지 이해해요.',
        'Qisqa matnda he, she, it va they kim yoki nimani anglatishini tushunasiz.',
        'Understand who or what he, she, it and they refer to in short texts.',
        'Учимся понимать, кого или что обозначают he, she, it и they в коротких текстах.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 4,
      questions: [
        'en_s1u2_n2_061_speaking',
        'en_s1u2_n2_062_fill_in_blank',
        'en_s1u2_n2_063_speaking',
        'en_s1u2_n2_064_fill_in_blank',
        'en_s1u2_n2_065_speaking',
        'en_s1u2_n2_066_fill_in_blank',
        'en_s1u2_n2_067_speaking',
        'en_s1u2_n2_068_fill_in_blank',
        'en_s1u2_n2_069_word_arrange',
        'en_s1u2_n2_070_speaking',
        'en_s1u2_n2_071_dialog_complete',
        'en_s1u2_n2_072_speaking',
        'en_s1u2_n2_073_fill_in_blank',
        'en_s1u2_n2_074_speaking',
        'en_s1u2_n2_075_fill_in_blank',
        'en_s1u2_n2_076_reply_builder',
        'en_s1u2_n2_077_speaking',
        'en_s1u2_n2_078_sentence_builder',
        'en_s1u2_n2_079_speaking',
        'en_s1u2_n2_080_dialog_complete',
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Section 1 · Unit 2 · Node 3
// 2.3 Where are they?
//
// Coverage
// - subject pronouns:
//   I / you / he / she / it / we / they
// - replacing people / things with pronouns
// - Where's ...? / Where are ...?
// - in + country / area / city
// - on + street / road
// - near / next to + building / landmark
// - at home / at work / at school
// - phone conversations about location
// - Coursebook + Workbook location practice
//
// 4 lessons × 20 questions = 80
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT2_NODE3_WORDS = [
  {
    code: 'en-pronoun-i',
    english: 'I',
    senseKey: 'first-person-singular',
    partOfSpeech: WordPartOfSpeech.PRONOUN,
    meaning: L('나; 저는', 'men', 'the speaker', 'я'),
    examples: [
      {
        english: 'I’m an engineer.',
        translations: L(
          '저는 엔지니어예요.',
          'Men muhandisman.',
          'I’m an engineer.',
          'Я инженер.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/aɪ/',
      ttsText: 'I',
    },
    media: {
      emoji: '🙋',
      imageUrl: '',
      imageAlt: L(
        '자기 자신을 가리키는 사람',
        'o‘zini ko‘rsatayotgan odam',
        'a person referring to themselves',
        'человек, указывающий на себя',
      ),
    },
    tags: ['pronouns', 'subject-pronouns'],
    difficulty: 1,
    usageNote: L(
      'I는 항상 대문자로 써요.',
      'I har doim bosh harf bilan yoziladi.',
      'I is always written with a capital letter.',
      'I всегда пишется с заглавной буквы.',
    ),
    isCore: true,
  },

  {
    code: 'en-pronoun-you',
    english: 'you',
    senseKey: 'second-person',
    partOfSpeech: WordPartOfSpeech.PRONOUN,
    meaning: L(
      '너; 당신; 여러분',
      'siz; sen',
      'the person or people being spoken to',
      'ты; вы',
    ),
    examples: [
      {
        english: 'Are you at home?',
        translations: L(
          '집에 있어요?',
          'Uydamisiz?',
          'Are you at home?',
          'Вы дома?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/juː/',
      ttsText: 'you',
    },
    media: {
      emoji: '👉',
      imageUrl: '',
      imageAlt: L(
        '상대방을 가리키는 사람',
        'suhbatdoshni ko‘rsatayotgan odam',
        'a person pointing to someone else',
        'человек, указывающий на собеседника',
      ),
    },
    tags: ['pronouns', 'subject-pronouns'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-pronoun-he',
    english: 'he',
    senseKey: 'third-person-singular-male',
    partOfSpeech: WordPartOfSpeech.PRONOUN,
    meaning: L('그; 그는', 'u', 'a male person', 'он'),
    examples: [
      {
        english: 'He’s on Robson Street.',
        translations: L(
          '그는 Robson Street에 있어요.',
          'U Robson Streetda.',
          'He’s on Robson Street.',
          'Он на Robson Street.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/hiː/',
      ttsText: 'he',
    },
    media: {
      emoji: '👨',
      imageUrl: '',
      imageAlt: L('남성 한 명', 'bir erkak', 'one man', 'один мужчина'),
    },
    tags: ['pronouns', 'subject-pronouns'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-pronoun-she',
    english: 'she',
    senseKey: 'third-person-singular-female',
    partOfSpeech: WordPartOfSpeech.PRONOUN,
    meaning: L('그녀; 그녀는', 'u', 'a female person', 'она'),
    examples: [
      {
        english: 'She’s on the Champs-Elysees.',
        translations: L(
          '그녀는 Champs-Elysees에 있어요.',
          'U Champs-Elyseesda.',
          'She’s on the Champs-Elysees.',
          'Она на Champs-Elysees.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ʃiː/',
      ttsText: 'she',
    },
    media: {
      emoji: '👩',
      imageUrl: '',
      imageAlt: L('여성 한 명', 'bir ayol', 'one woman', 'одна женщина'),
    },
    tags: ['pronouns', 'subject-pronouns'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-preposition-in',
    english: 'in',
    senseKey: 'location-inside-area',
    partOfSpeech: WordPartOfSpeech.OTHER,
    meaning: L('~에; ~안에', '-da; ichida', 'inside a place or area', 'в'),
    examples: [
      {
        english: 'The Palace Museum is in Beijing.',
        translations: L(
          'Palace Museum은 베이징에 있어요.',
          'Palace Museum Pekinda.',
          'The Palace Museum is in Beijing.',
          'Palace Museum находится в Пекине.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɪn/',
      ttsText: 'in',
    },
    media: {
      emoji: '📍',
      imageUrl: '',
      imageAlt: L(
        '지역 안의 위치',
        'hudud ichidagi joy',
        'a location inside an area',
        'место внутри территории',
      ),
    },
    tags: ['prepositions', 'place'],
    difficulty: 1,
    usageNote: L(
      '나라, 지역, 도시와 함께 써요: in Argentina, in Chinatown, in Tokyo.',
      'Mamlakat, hudud va shahar bilan ishlatiladi: in Argentina, in Chinatown, in Tokyo.',
      'Use in with countries, areas and cities: in Argentina, in Chinatown, in Tokyo.',
      'Используйте in со странами, районами и городами: in Argentina, in Chinatown, in Tokyo.',
    ),
    isCore: true,
  },

  {
    code: 'en-preposition-on',
    english: 'on',
    senseKey: 'location-street-road',
    partOfSpeech: WordPartOfSpeech.OTHER,
    meaning: L(
      '~에; ~위에',
      '-da',
      'used to say that something is located on a street or road',
      'на',
    ),
    examples: [
      {
        english: 'The Metropolitan Opera is on 65th Street.',
        translations: L(
          'Metropolitan Opera는 65th Street에 있어요.',
          'Metropolitan Opera 65th Streetda.',
          'The Metropolitan Opera is on 65th Street.',
          'Metropolitan Opera находится на 65th Street.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɒn/',
      ttsText: 'on',
    },
    media: {
      emoji: '🛣️',
      imageUrl: '',
      imageAlt: L(
        '도로 위의 위치',
        'ko‘chadagi joy',
        'a location on a street',
        'место на улице',
      ),
    },
    tags: ['prepositions', 'place'],
    difficulty: 1,
    usageNote: L(
      '거리와 도로 이름과 함께 써요: on Oxford Street, on Khaosan Road.',
      'Ko‘cha va yo‘l nomlari bilan ishlatiladi: on Oxford Street, on Khaosan Road.',
      'Use on with streets and roads: on Oxford Street, on Khaosan Road.',
      'Используйте on с названиями улиц и дорог: on Oxford Street, on Khaosan Road.',
    ),
    isCore: true,
  },

  {
    code: 'en-preposition-near',
    english: 'near',
    senseKey: 'close-to-place',
    partOfSpeech: WordPartOfSpeech.OTHER,
    meaning: L(
      '~근처에',
      'yaqinida',
      'close to a place',
      'рядом с; недалеко от',
    ),
    examples: [
      {
        english: 'The Tower of London is near Tower Bridge.',
        translations: L(
          'Tower of London은 Tower Bridge 근처에 있어요.',
          'Tower of London Tower Bridge yaqinida.',
          'The Tower of London is near Tower Bridge.',
          'Tower of London находится рядом с Tower Bridge.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/nɪə/',
      ttsText: 'near',
    },
    media: {
      emoji: '📍',
      imageUrl: '',
      imageAlt: L(
        '서로 가까운 두 장소',
        'bir-biriga yaqin ikki joy',
        'two nearby places',
        'два места рядом',
      ),
    },
    tags: ['prepositions', 'place'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-preposition-next-to',
    english: 'next to',
    senseKey: 'immediately-beside',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '~바로 옆에',
      'yonida',
      'directly beside something',
      'рядом с; непосредственно возле',
    ),
    examples: [
      {
        english: 'It’s next to the museum.',
        translations: L(
          '그것은 박물관 바로 옆에 있어요.',
          'U muzeyning yonida.',
          'It’s next to the museum.',
          'Это рядом с музеем.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈnekst tuː/',
      ttsText: 'next to',
    },
    media: {
      emoji: '↔️',
      imageUrl: '',
      imageAlt: L(
        '바로 옆에 있는 두 장소',
        'yonma-yon turgan ikki joy',
        'two places directly beside each other',
        'два места непосредственно рядом',
      ),
    },
    tags: ['prepositions', 'place'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-preposition-at',
    english: 'at',
    senseKey: 'location-point',
    partOfSpeech: WordPartOfSpeech.OTHER,
    meaning: L('~에', '-da', 'used for a particular point or place', 'в; на'),
    examples: [
      {
        english: 'I’m at home.',
        translations: L(
          '저는 집에 있어요.',
          'Men uydaman.',
          'I’m at home.',
          'Я дома.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/æt/',
      ttsText: 'at',
    },
    media: {
      emoji: '📌',
      imageUrl: '',
      imageAlt: L(
        '특정 장소',
        'aniq joy',
        'a specific place',
        'конкретное место',
      ),
    },
    tags: ['prepositions', 'place'],
    difficulty: 1,
    usageNote: L(
      'home, work, school과는 at을 써요: at home, at work, at school.',
      'home, work va school bilan at ishlatiladi: at home, at work, at school.',
      'Use at with home, work and school: at home, at work, at school.',
      'С home, work и school используется at: at home, at work, at school.',
    ),
    isCore: true,
  },
];

export const EN_S1_UNIT2_NODE3_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Subject pronouns
  // ===========================================================

  en_s1u2_n3_001_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I.',
    audioText: 'I.',
    answerTranslation: L('나.', 'Men.', 'I.', 'Я.'),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['pronouns', 'i'],
  },

  en_s1u2_n3_002_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'You.',
    audioText: 'You.',
    answerTranslation: L('당신.', 'Siz.', 'You.', 'Вы.'),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['pronouns', 'you'],
  },

  en_s1u2_n3_003_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      'Mark를 대신할 알맞은 대명사를 고르세요.',
      'Mark o‘rniga mos olmoshni tanlang.',
      'Choose the correct pronoun for Mark.',
      'Выберите правильное местоимение вместо Mark.',
    ),
    sentenceTemplate: 'This is Mark. ___’s a taxi driver.',
    blankAnswers: ['He'],
    options: ['He', 'She', 'It', 'They'],
    answer: 'He',
    answerTranslation: L(
      'Mark는 택시 기사예요.',
      'Mark taksi haydovchisi.',
      'Mark is a taxi driver.',
      'Марк — таксист.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['pronouns', 'he'],
  },

  en_s1u2_n3_004_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'He.',
    audioText: 'He.',
    answerTranslation: L('그.', 'U.', 'He.', 'Он.'),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['pronouns', 'he'],
  },

  en_s1u2_n3_005_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      'Isabelle을 대신할 알맞은 대명사를 고르세요.',
      'Isabelle o‘rniga mos olmoshni tanlang.',
      'Choose the correct pronoun for Isabelle.',
      'Выберите правильное местоимение вместо Isabelle.',
    ),
    sentenceTemplate: 'Isabelle is from Australia. ___’s a teacher.',
    blankAnswers: ['She'],
    options: ['He', 'She', 'It', 'They'],
    answer: 'She',
    answerTranslation: L(
      'Isabelle은 호주 출신이고 선생님이에요.',
      'Isabelle Avstraliyadan. U o‘qituvchi.',
      'Isabelle is from Australia. She’s a teacher.',
      'Изабель из Австралии. Она учитель.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['pronouns', 'she'],
  },

  en_s1u2_n3_006_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She.',
    audioText: 'She.',
    answerTranslation: L('그녀.', 'U.', 'She.', 'Она.'),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['pronouns', 'she'],
  },

  en_s1u2_n3_007_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      'wallet을 대신할 알맞은 대명사를 고르세요.',
      'wallet o‘rniga mos olmoshni tanlang.',
      'Choose the correct pronoun for wallet.',
      'Выберите правильное местоимение вместо wallet.',
    ),
    sentenceTemplate: 'Where’s my wallet? ___ isn’t in my bag.',
    blankAnswers: ['It'],
    options: ['He', 'It', 'We', 'They'],
    answer: 'It',
    answerTranslation: L(
      '내 지갑이 어디 있지? 가방 안에는 없어요.',
      'Hamyonim qayerda? U sumkamda emas.',
      'Where’s my wallet? It isn’t in my bag.',
      'Где мой кошелёк? Его нет в сумке.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['pronouns', 'it'],
  },

  en_s1u2_n3_008_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'It.',
    audioText: 'It.',
    answerTranslation: L('그것.', 'U.', 'It.', 'Оно.'),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['pronouns', 'it'],
  },

  en_s1u2_n3_009_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      'Thorsten과 I를 대신할 대명사를 고르세요.',
      'Thorsten va I o‘rniga mos olmoshni tanlang.',
      'Choose the pronoun for Thorsten and I.',
      'Выберите местоимение вместо Thorsten and I.',
    ),
    sentenceTemplate: 'Thorsten and I are from Germany. ___’re waiters.',
    blankAnswers: ['We'],
    options: ['They', 'We', 'You', 'He'],
    answer: 'We',
    answerTranslation: L(
      'Thorsten과 저는 독일 출신이고 웨이터예요.',
      'Thorsten va men Germaniyadanmiz. Biz ofitsiantmiz.',
      'Thorsten and I are from Germany. We’re waiters.',
      'Мы с Торстеном из Германии. Мы официанты.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['pronouns', 'we'],
  },

  en_s1u2_n3_010_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'We.',
    audioText: 'We.',
    answerTranslation: L('우리.', 'Biz.', 'We.', 'Мы.'),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['pronouns', 'we'],
  },

  en_s1u2_n3_011_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      'Maksym과 Agata를 대신할 대명사를 고르세요.',
      'Maksym va Agata o‘rniga mos olmoshni tanlang.',
      'Choose the pronoun for Maksym and Agata.',
      'Выберите местоимение вместо Maksym and Agata.',
    ),
    sentenceTemplate: 'Maksym and Agata are from Poland. ___’re doctors.',
    blankAnswers: ['They'],
    options: ['She', 'They', 'We', 'It'],
    answer: 'They',
    answerTranslation: L(
      'Maksym과 Agata는 폴란드 출신이고 의사예요.',
      'Maksym va Agata Polshadan. Ular shifokorlar.',
      'Maksym and Agata are from Poland. They’re doctors.',
      'Максим и Агата из Польши. Они врачи.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['pronouns', 'they'],
  },

  en_s1u2_n3_012_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'They.',
    audioText: 'They.',
    answerTranslation: L('그들.', 'Ular.', 'They.', 'Они.'),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['pronouns', 'they'],
  },

  en_s1u2_n3_013_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Nice to meet you, Julio. Are ___ from Spain?',
    blankAnswers: ['you'],
    options: ['you', 'he', 'they', 'it'],
    answer: 'you',
    answerTranslation: L(
      '만나서 반가워요, Julio. 스페인 출신이에요?',
      'Tanishganimdan xursandman, Julio. Ispaniyadanmisiz?',
      'Nice to meet you, Julio. Are you from Spain?',
      'Приятно познакомиться, Хулио. Вы из Испании?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['pronouns', 'you'],
  },

  en_s1u2_n3_014_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Are you from Spain?',
    audioText: 'Are you from Spain?',
    answerTranslation: L(
      '스페인 출신이에요?',
      'Ispaniyadanmisiz?',
      'Are you from Spain?',
      'Вы из Испании?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['pronouns', 'you'],
  },

  en_s1u2_n3_015_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      { korean: 'I', native: 'men' },
      { korean: 'you', native: 'siz' },
      { korean: 'he', native: 'u — erkak' },
      { korean: 'she', native: 'u — ayol' },
      { korean: 'we', native: 'biz' },
    ],
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['pronouns', 'matching'],
  },

  en_s1u2_n3_016_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Those are nice apples. They’re from France.',
    audioText: 'Those are nice apples. They’re from France.',
    answerTranslation: L(
      '저것들은 좋은 사과예요. 프랑스산이에요.',
      'Anavilar yaxshi olmalar. Ular Fransiyadan.',
      'Those are nice apples. They’re from France.',
      'Это хорошие яблоки. Они из Франции.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['pronouns', 'they', 'objects'],
  },

  en_s1u2_n3_017_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Are Sam and Ella here to study?',
    options: ['No', 'they', 'aren’t', 'he', 'isn’t', 'study'],
    answer: 'No they aren’t',
    answerTranslation: L(
      '아니요, 아니에요.',
      'Yo‘q.',
      'No, they aren’t.',
      'Нет.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['pronouns', 'they', 'reply-builder'],
  },

  en_s1u2_n3_018_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'We’re doctors.',
    audioText: 'We’re doctors.',
    answerI18n: L(
      '우리는 의사예요',
      'Biz shifokorlarmiz',
      'We are doctors',
      'Мы врачи',
    ),
    options: ['We’re', 'doctors', 'They’re', 'students', 'He’s'],
    optionsI18n: {
      ko: ['우리는', '의사예요', '그들은', '학생이에요'],
      uz: ['Biz', 'shifokorlarmiz', 'Ular', 'talabalar'],
      en: ['We', 'are', 'doctors', 'They', 'students'],
      ru: ['Мы', 'врачи', 'Они', 'студенты'],
    },
    answerTranslation: L(
      '우리는 의사예요.',
      'Biz shifokorlarmiz.',
      'We’re doctors.',
      'Мы врачи.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['pronouns', 'we'],
  },

  en_s1u2_n3_019_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I, you, he, she, it, we, they.',
    audioText: 'I, you, he, she, it, we, they.',
    answerTranslation: L(
      'I, you, he, she, it, we, they.',
      'I, you, he, she, it, we, they.',
      'I, you, he, she, it, we, they.',
      'I, you, he, she, it, we, they.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['pronouns', 'review'],
  },

  en_s1u2_n3_020_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Are you and Markus friends?' }],
    options: ['Yes, we are.', 'Yes, they are.', 'Yes, he is.', 'Yes, it is.'],
    answer: 'Yes, we are.',
    answerTranslation: L(
      '네, 우리는 친구예요.',
      'Ha, biz do‘stmiz.',
      'Yes, we are.',
      'Да.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['pronouns', 'we', 'short-answer'],
  },

  // ===========================================================
  // Lesson 2 · Where are they?
  // ===========================================================

  en_s1u2_n3_021_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Where are they?',
    audioText: 'Where are they?',
    answerTranslation: L(
      '그들은 어디에 있어요?',
      'Ular qayerda?',
      'Where are they?',
      'Где они?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['location', 'where'],
  },

  en_s1u2_n3_022_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Where ___ they?',
    blankAnswers: ['are'],
    options: ['are', 'is', 'am', 'be'],
    answer: 'are',
    answerTranslation: L(
      '그들은 어디에 있어요?',
      'Ular qayerda?',
      'Where are they?',
      'Где они?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['location', 'they'],
  },

  en_s1u2_n3_023_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'He’s on Robson Street.',
    audioText: 'He’s on Robson Street.',
    answerTranslation: L(
      '그는 Robson Street에 있어요.',
      'U Robson Streetda.',
      'He’s on Robson Street.',
      'Он на Robson Street.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['location', 'on'],
  },

  en_s1u2_n3_024_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Robson Street is ___ Vancouver.',
    blankAnswers: ['in'],
    options: ['in', 'on', 'near', 'at'],
    answer: 'in',
    answerTranslation: L(
      'Robson Street은 밴쿠버에 있어요.',
      'Robson Street Vankuverda.',
      'Robson Street is in Vancouver.',
      'Robson Street находится в Ванкувере.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['location', 'in', 'vancouver'],
  },

  en_s1u2_n3_025_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Robson Street is in Vancouver, Canada.',
    audioText: 'Robson Street is in Vancouver, Canada.',
    answerTranslation: L(
      'Robson Street은 캐나다 밴쿠버에 있어요.',
      'Robson Street Kanadaning Vankuver shahrida.',
      'Robson Street is in Vancouver, Canada.',
      'Robson Street находится в Ванкувере, Канада.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['location', 'city', 'country'],
  },

  en_s1u2_n3_026_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['The', 'Champs-Elysees', 'is', 'in', 'Paris', 'London', 'on'],
    answer: 'The Champs-Elysees is in Paris',
    answerTranslation: L(
      'Champs-Elysees는 파리에 있어요.',
      'Champs-Elysees Parijda.',
      'The Champs-Elysees is in Paris.',
      'Champs-Elysees находится в Париже.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['location', 'paris'],
  },

  en_s1u2_n3_027_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The Champs-Elysees is in Paris, France.',
    audioText: 'The Champs-Elysees is in Paris, France.',
    answerTranslation: L(
      'Champs-Elysees는 프랑스 파리에 있어요.',
      'Champs-Elysees Fransiyaning Parij shahrida.',
      'The Champs-Elysees is in Paris, France.',
      'Champs-Elysees находится в Париже, Франция.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['location', 'france'],
  },

  en_s1u2_n3_028_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Abbey Road is ___ London.',
    blankAnswers: ['in'],
    options: ['in', 'on', 'next to', 'at'],
    answer: 'in',
    answerTranslation: L(
      'Abbey Road는 런던에 있어요.',
      'Abbey Road Londonda.',
      'Abbey Road is in London.',
      'Abbey Road находится в Лондоне.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['location', 'london'],
  },

  en_s1u2_n3_029_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Abbey Road is in London, UK.',
    audioText: 'Abbey Road is in London, UK.',
    answerTranslation: L(
      'Abbey Road는 영국 런던에 있어요.',
      'Abbey Road Buyuk Britaniyaning London shahrida.',
      'Abbey Road is in London, UK.',
      'Abbey Road находится в Лондоне, Великобритания.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['location', 'london', 'uk'],
  },

  en_s1u2_n3_030_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Where’s Robson Street?' }],
    options: [
      'It’s in Vancouver, Canada.',
      'It’s in Paris, France.',
      'It’s in Madrid, Spain.',
      'It’s in Perth, Australia.',
    ],
    answer: 'It’s in Vancouver, Canada.',
    answerTranslation: L(
      '캐나다 밴쿠버에 있어요.',
      'U Kanadaning Vankuver shahrida.',
      'It’s in Vancouver, Canada.',
      'Она находится в Ванкувере, Канада.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['location', 'dialog'],
  },

  en_s1u2_n3_031_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Hi, Lewis. Helen here.',
    audioText: 'Hi, Lewis. Helen here.',
    answerTranslation: L(
      '안녕, Lewis. Helen이야.',
      'Salom, Lewis. Bu Helen.',
      'Hi, Lewis. Helen here.',
      'Привет, Льюис. Это Хелен.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['phone', 'conversation'],
  },

  en_s1u2_n3_032_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Are you at home?',
    options: ['No', 'I’m', 'in', 'London', 'they', 'are', 'home'],
    answer: 'No I’m in London',
    answerTranslation: L(
      '아니요, 저는 런던에 있어요.',
      'Yo‘q, men Londondaman.',
      'No, I’m in London.',
      'Нет, я в Лондоне.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['phone', 'location', 'reply-builder'],
  },

  en_s1u2_n3_033_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I’m in London.',
    audioText: 'I’m in London.',
    answerTranslation: L(
      '저는 런던에 있어요.',
      'Men Londondaman.',
      'I’m in London.',
      'Я в Лондоне.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['location', 'in'],
  },

  en_s1u2_n3_034_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I’m ___ the Victoria and Albert Museum.',
    blankAnswers: ['at'],
    options: ['at', 'on', 'near', 'from'],
    answer: 'at',
    answerTranslation: L(
      '저는 Victoria and Albert Museum에 있어요.',
      'Men Victoria and Albert Museumdaman.',
      'I’m at the Victoria and Albert Museum.',
      'Я в Victoria and Albert Museum.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['location', 'at'],
  },

  en_s1u2_n3_035_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'It’s on Cromwell Road.',
    audioText: 'It’s on Cromwell Road.',
    answerTranslation: L(
      'Cromwell Road에 있어요.',
      'U Cromwell Roadda.',
      'It’s on Cromwell Road.',
      'Он находится на Cromwell Road.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['location', 'on'],
  },

  en_s1u2_n3_036_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'It’s on Cromwell Road, ___ the Science Museum.',
    blankAnswers: ['near'],
    options: ['near', 'in', 'at', 'from'],
    answer: 'near',
    answerTranslation: L(
      'Cromwell Road에 있고 Science Museum 근처예요.',
      'U Cromwell Roadda, Science Museum yaqinida.',
      'It’s on Cromwell Road, near the Science Museum.',
      'Он находится на Cromwell Road, рядом с Science Museum.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['location', 'near'],
  },

  en_s1u2_n3_037_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Is Max with you?',
    audioText: 'Is Max with you?',
    answerTranslation: L(
      'Max도 같이 있어요?',
      'Max ham siz bilanmi?',
      'Is Max with you?',
      'Макс с вами?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['phone', 'conversation'],
  },

  en_s1u2_n3_038_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Is Max with you?' }],
    options: [
      'Yes, he is. We’re here on holiday.',
      'Yes, it is. They’re doctors.',
      'No, they are London.',
      'He’s a museum.',
    ],
    answer: 'Yes, he is. We’re here on holiday.',
    answerTranslation: L(
      '네. 우리는 여기 휴가로 와 있어요.',
      'Ha. Biz bu yerda ta’tildamiz.',
      'Yes, he is. We’re here on holiday.',
      'Да. Мы здесь в отпуске.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['phone', 'pronouns', 'dialog'],
  },

  en_s1u2_n3_039_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['here', 'holiday', 'We’re', 'on', 'home', 'They’re'],
    answer: 'We’re here on holiday',
    audioText: 'We’re here on holiday.',
    answerTranslation: L(
      '우리는 여기 휴가로 와 있어요.',
      'Biz bu yerda ta’tildamiz.',
      'We’re here on holiday.',
      'Мы здесь в отпуске.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['phone', 'holiday'],
  },

  en_s1u2_n3_040_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'It’s on Cromwell Road.',
    audioText: 'It’s on Cromwell Road.',
    answerI18n: L(
      'Cromwell Road에 있어요',
      'U Cromwell Roadda',
      'It is on Cromwell Road',
      'Это на Cromwell Road',
    ),
    options: ['It’s', 'on', 'Cromwell', 'Road', 'in', 'London'],
    optionsI18n: {
      ko: ['Cromwell', 'Road에', '있어요', '런던에', '근처에'],
      uz: ['U', 'Cromwell', 'Roadda', 'Londonda', 'yaqinida'],
      en: ['It', 'is', 'on', 'Cromwell', 'Road', 'London'],
      ru: ['Это', 'на', 'Cromwell', 'Road', 'в', 'Лондоне'],
    },
    answerTranslation: L(
      'Cromwell Road에 있어요.',
      'U Cromwell Roadda.',
      'It’s on Cromwell Road.',
      'Это на Cromwell Road.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['location', 'on', 'sentence-builder'],
  },

  // ===========================================================
  // Lesson 3 · In / on / near / next to / at
  // ===========================================================

  en_s1u2_n3_041_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'In.',
    audioText: 'In.',
    answerTranslation: L('~에.', '-da.', 'In.', 'В.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['prepositions', 'in'],
  },

  en_s1u2_n3_042_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The Palace Museum is ___ Beijing.',
    blankAnswers: ['in'],
    options: ['in', 'on', 'near', 'at'],
    answer: 'in',
    answerTranslation: L(
      'Palace Museum은 베이징에 있어요.',
      'Palace Museum Pekinda.',
      'The Palace Museum is in Beijing.',
      'Palace Museum находится в Пекине.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['prepositions', 'in', 'city'],
  },

  en_s1u2_n3_043_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The Palace Museum is in Beijing.',
    audioText: 'The Palace Museum is in Beijing.',
    answerTranslation: L(
      'Palace Museum은 베이징에 있어요.',
      'Palace Museum Pekinda.',
      'The Palace Museum is in Beijing.',
      'Palace Museum находится в Пекине.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['location', 'in'],
  },

  en_s1u2_n3_044_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'On.',
    audioText: 'On.',
    answerTranslation: L('~에.', '-da.', 'On.', 'На.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['prepositions', 'on'],
  },

  en_s1u2_n3_045_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The Metropolitan Opera is ___ 65th Street.',
    blankAnswers: ['on'],
    options: ['in', 'on', 'near', 'at'],
    answer: 'on',
    answerTranslation: L(
      'Metropolitan Opera는 65th Street에 있어요.',
      'Metropolitan Opera 65th Streetda.',
      'The Metropolitan Opera is on 65th Street.',
      'Metropolitan Opera находится на 65th Street.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['prepositions', 'on', 'street'],
  },

  en_s1u2_n3_046_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The Metropolitan Opera is on 65th Street.',
    audioText: 'The Metropolitan Opera is on 65th Street.',
    answerTranslation: L(
      'Metropolitan Opera는 65th Street에 있어요.',
      'Metropolitan Opera 65th Streetda.',
      'The Metropolitan Opera is on 65th Street.',
      'Metropolitan Opera находится на 65th Street.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['location', 'on'],
  },

  en_s1u2_n3_047_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Near.',
    audioText: 'Near.',
    answerTranslation: L('근처에.', 'Yaqinida.', 'Near.', 'Рядом.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['prepositions', 'near'],
  },

  en_s1u2_n3_048_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The Tower of London is ___ Tower Bridge.',
    blankAnswers: ['near'],
    options: ['near', 'in', 'on', 'from'],
    answer: 'near',
    answerTranslation: L(
      'Tower of London은 Tower Bridge 근처에 있어요.',
      'Tower of London Tower Bridge yaqinida.',
      'The Tower of London is near Tower Bridge.',
      'Tower of London находится рядом с Tower Bridge.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['prepositions', 'near', 'landmark'],
  },

  en_s1u2_n3_049_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The Tower of London is near Tower Bridge.',
    audioText: 'The Tower of London is near Tower Bridge.',
    answerTranslation: L(
      'Tower of London은 Tower Bridge 근처에 있어요.',
      'Tower of London Tower Bridge yaqinida.',
      'The Tower of London is near Tower Bridge.',
      'Tower of London находится рядом с Tower Bridge.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['location', 'near'],
  },

  en_s1u2_n3_050_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Next to.',
    audioText: 'Next to.',
    answerTranslation: L('바로 옆에.', 'Yonida.', 'Next to.', 'Рядом с.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['prepositions', 'next-to'],
  },

  en_s1u2_n3_051_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The Tuileries Garden is ___ the Louvre Museum.',
    blankAnswers: ['near'],
    options: ['near', 'in', 'on', 'at'],
    answer: 'near',
    answerTranslation: L(
      'Tuileries Garden은 Louvre Museum 근처에 있어요.',
      'Tuileries Garden Louvre Museum yaqinida.',
      'The Tuileries Garden is near the Louvre Museum.',
      'Tuileries Garden находится рядом с Louvre Museum.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['prepositions', 'near'],
  },

  en_s1u2_n3_052_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['The', 'Colosseum', 'is', 'in', 'Italy', 'on', 'Rome'],
    answer: 'The Colosseum is in Italy',
    answerTranslation: L(
      'Colosseum은 이탈리아에 있어요.',
      'Colosseum Italiyada.',
      'The Colosseum is in Italy.',
      'Colosseum находится в Италии.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['prepositions', 'in', 'country'],
  },

  en_s1u2_n3_053_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The Colosseum is in Italy.',
    audioText: 'The Colosseum is in Italy.',
    answerTranslation: L(
      'Colosseum은 이탈리아에 있어요.',
      'Colosseum Italiyada.',
      'The Colosseum is in Italy.',
      'Colosseum находится в Италии.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['location', 'in', 'italy'],
  },

  en_s1u2_n3_054_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      { korean: 'in', native: 'shahar / mamlakat ichida' },
      { korean: 'on', native: 'ko‘cha / yo‘lda' },
      { korean: 'near', native: 'yaqinida' },
      { korean: 'next to', native: 'yonida' },
      { korean: 'at', native: 'aniq joyda' },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['prepositions', 'matching'],
  },

  en_s1u2_n3_055_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I’m at home.',
    audioText: 'I’m at home.',
    answerTranslation: L(
      '저는 집에 있어요.',
      'Men uydaman.',
      'I’m at home.',
      'Я дома.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['prepositions', 'at', 'home'],
  },

  en_s1u2_n3_056_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I’m ___ home.',
    blankAnswers: ['at'],
    options: ['at', 'in', 'on', 'near'],
    answer: 'at',
    answerTranslation: L(
      '저는 집에 있어요.',
      'Men uydaman.',
      'I’m at home.',
      'Я дома.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['prepositions', 'at-home'],
  },

  en_s1u2_n3_057_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She’s at work.',
    audioText: 'She’s at work.',
    answerTranslation: L(
      '그녀는 직장에 있어요.',
      'U ishda.',
      'She’s at work.',
      'Она на работе.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['prepositions', 'at-work'],
  },

  en_s1u2_n3_058_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'They’re ___ school.',
    blankAnswers: ['at'],
    options: ['at', 'on', 'near', 'from'],
    answer: 'at',
    answerTranslation: L(
      '그들은 학교에 있어요.',
      'Ular maktabda.',
      'They’re at school.',
      'Они в школе.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['prepositions', 'at-school'],
  },

  en_s1u2_n3_059_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      { korean: 'in Beijing', native: 'Pekinda' },
      { korean: 'on Oxford Street', native: 'Oxford Streetda' },
      { korean: 'near Tower Bridge', native: 'Tower Bridge yaqinida' },
      { korean: 'at home', native: 'uyda' },
      { korean: 'at school', native: 'maktabda' },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['prepositions', 'listening'],
  },

  en_s1u2_n3_060_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Where’s the Tower of London?',
    options: ['It’s', 'near', 'Tower', 'Bridge', 'on', 'Italy'],
    answer: 'It’s near Tower Bridge',
    answerTranslation: L(
      'Tower Bridge 근처에 있어요.',
      'U Tower Bridge yaqinida.',
      'It’s near Tower Bridge.',
      'Он рядом с Tower Bridge.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['prepositions', 'reply-builder'],
  },

  // ===========================================================
  // Lesson 4 · City map review
  // ===========================================================

  en_s1u2_n3_061_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Where’s Manchester?',
    audioText: 'Where’s Manchester?',
    answerTranslation: L(
      'Manchester는 어디에 있어요?',
      'Manchester qayerda?',
      'Where’s Manchester?',
      'Где находится Манчестер?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['location', 'manchester'],
  },

  en_s1u2_n3_062_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Where’s Manchester?' }],
    options: [
      'It’s in the UK.',
      'It’s on the UK.',
      'It’s near the UK.',
      'It’s at the UK.',
    ],
    answer: 'It’s in the UK.',
    answerTranslation: L(
      '영국에 있어요.',
      'U Buyuk Britaniyada.',
      'It’s in the UK.',
      'Он находится в Великобритании.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['location', 'in', 'uk'],
  },

  en_s1u2_n3_063_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The Manchester Art Gallery is on Mosley Street.',
    audioText: 'The Manchester Art Gallery is on Mosley Street.',
    answerTranslation: L(
      'Manchester Art Gallery는 Mosley Street에 있어요.',
      'Manchester Art Gallery Mosley Streetda.',
      'The Manchester Art Gallery is on Mosley Street.',
      'Manchester Art Gallery находится на Mosley Street.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['location', 'on', 'manchester'],
  },

  en_s1u2_n3_064_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The Manchester Art Gallery is ___ Mosley Street.',
    blankAnswers: ['on'],
    options: ['on', 'in', 'at', 'from'],
    answer: 'on',
    answerTranslation: L(
      'Manchester Art Gallery는 Mosley Street에 있어요.',
      'Manchester Art Gallery Mosley Streetda.',
      'The Manchester Art Gallery is on Mosley Street.',
      'Manchester Art Gallery находится на Mosley Street.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['prepositions', 'on'],
  },

  en_s1u2_n3_065_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The Arndale Shopping Centre is on Market Street.',
    audioText: 'The Arndale Shopping Centre is on Market Street.',
    answerTranslation: L(
      'Arndale Shopping Centre는 Market Street에 있어요.',
      'Arndale Shopping Centre Market Streetda.',
      'The Arndale Shopping Centre is on Market Street.',
      'Arndale Shopping Centre находится на Market Street.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['location', 'on'],
  },

  en_s1u2_n3_066_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The Arndale Shopping Centre is ___ Market Street.',
    blankAnswers: ['on'],
    options: ['near', 'on', 'in', 'at'],
    answer: 'on',
    answerTranslation: L(
      'Arndale Shopping Centre는 Market Street에 있어요.',
      'Arndale Shopping Centre Market Streetda.',
      'The Arndale Shopping Centre is on Market Street.',
      'Arndale Shopping Centre находится на Market Street.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['prepositions', 'on'],
  },

  en_s1u2_n3_067_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The Royal Exchange Theatre is near the Arndale Shopping Centre.',
    audioText:
      'The Royal Exchange Theatre is near the Arndale Shopping Centre.',
    answerTranslation: L(
      'Royal Exchange Theatre는 Arndale Shopping Centre 근처에 있어요.',
      'Royal Exchange Theatre Arndale Shopping Centre yaqinida.',
      'The Royal Exchange Theatre is near the Arndale Shopping Centre.',
      'Royal Exchange Theatre находится рядом с Arndale Shopping Centre.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['location', 'near'],
  },

  en_s1u2_n3_068_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'The',
      'Palace',
      'Theatre',
      'is',
      'on',
      'Oxford',
      'Street',
      'near',
      'Manchester',
    ],
    answer: 'The Palace Theatre is on Oxford Street',
    answerTranslation: L(
      'Palace Theatre는 Oxford Street에 있어요.',
      'Palace Theatre Oxford Streetda.',
      'The Palace Theatre is on Oxford Street.',
      'Palace Theatre находится на Oxford Street.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['location', 'on', 'builder'],
  },

  en_s1u2_n3_069_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The Palace Theatre is on Oxford Street.',
    audioText: 'The Palace Theatre is on Oxford Street.',
    answerTranslation: L(
      'Palace Theatre는 Oxford Street에 있어요.',
      'Palace Theatre Oxford Streetda.',
      'The Palace Theatre is on Oxford Street.',
      'Palace Theatre находится на Oxford Street.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['location', 'on'],
  },

  en_s1u2_n3_070_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The Cornerhouse cinema is ___ the Palace Hotel.',
    blankAnswers: ['near'],
    options: ['near', 'in', 'on', 'from'],
    answer: 'near',
    answerTranslation: L(
      'Cornerhouse cinema는 Palace Hotel 근처에 있어요.',
      'Cornerhouse cinema Palace Hotel yaqinida.',
      'The Cornerhouse cinema is near the Palace Hotel.',
      'Cornerhouse cinema находится рядом с Palace Hotel.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['location', 'near'],
  },

  en_s1u2_n3_071_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The Cornerhouse cinema is near the Palace Hotel.',
    audioText: 'The Cornerhouse cinema is near the Palace Hotel.',
    answerTranslation: L(
      'Cornerhouse cinema는 Palace Hotel 근처에 있어요.',
      'Cornerhouse cinema Palace Hotel yaqinida.',
      'The Cornerhouse cinema is near the Palace Hotel.',
      'Cornerhouse cinema находится рядом с Palace Hotel.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['location', 'near'],
  },

  en_s1u2_n3_072_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['Street', 'is', 'Store', 'Where', 'the', 'on'],
    answer: 'Where is Store Street',
    audioText: 'Where is Store Street?',
    answerTranslation: L(
      'Store Street은 어디에 있어요?',
      'Store Street qayerda?',
      'Where is Store Street?',
      'Где находится Store Street?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['location', 'where'],
  },

  en_s1u2_n3_073_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Where’s the library?',
    audioText: 'Where’s the library?',
    answerTranslation: L(
      '도서관은 어디에 있어요?',
      'Kutubxona qayerda?',
      'Where’s the library?',
      'Где библиотека?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['location', 'where'],
  },

  en_s1u2_n3_074_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Where’s the Palace Theatre?',
    options: ['It’s', 'on', 'Oxford', 'Street', 'in', 'near', 'London'],
    answer: 'It’s on Oxford Street',
    answerTranslation: L(
      'Oxford Street에 있어요.',
      'U Oxford Streetda.',
      'It’s on Oxford Street.',
      'Он находится на Oxford Street.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['location', 'reply-builder'],
  },

  en_s1u2_n3_075_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'We’re in New York.',
    audioText: 'We’re in New York.',
    answerTranslation: L(
      '우리는 뉴욕에 있어요.',
      'Biz Nyu-Yorkdamiz.',
      'We’re in New York.',
      'Мы в Нью-Йорке.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['pronouns', 'we', 'location'],
  },

  en_s1u2_n3_076_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      'Jack과 말하는 사람을 함께 가리키는 대명사를 고르세요.',
      'Jack va gapiruvchini birga bildiradigan olmoshni tanlang.',
      'Choose the pronoun for Jack and the speaker together.',
      'Выберите местоимение для Jack и говорящего вместе.',
    ),
    sentenceTemplate: 'Jack and I are in New York. ___’re here on business.',
    blankAnswers: ['We'],
    options: ['We', 'They', 'He', 'You'],
    answer: 'We',
    answerTranslation: L(
      'Jack과 저는 뉴욕에 있어요. 우리는 업무로 와 있어요.',
      'Jack va men Nyu-Yorkdamiz. Biz ish bilan bu yerdamiz.',
      'Jack and I are in New York. We’re here on business.',
      'Мы с Джеком в Нью-Йорке. Мы здесь по делам.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['pronouns', 'we'],
  },

  en_s1u2_n3_077_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She’s on holiday with friends.',
    audioText: 'She’s on holiday with friends.',
    answerTranslation: L(
      '그녀는 친구들과 휴가 중이에요.',
      'U do‘stlari bilan ta’tilda.',
      'She’s on holiday with friends.',
      'Она в отпуске с друзьями.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['pronouns', 'she', 'holiday'],
  },

  en_s1u2_n3_078_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      'Ellen을 대신할 대명사를 고르세요.',
      'Ellen o‘rniga mos olmoshni tanlang.',
      'Choose the pronoun for Ellen.',
      'Выберите местоимение вместо Ellen.',
    ),
    sentenceTemplate: 'Ellen isn’t in New York. ___’s on holiday.',
    blankAnswers: ['She'],
    options: ['She', 'He', 'They', 'It'],
    answer: 'She',
    answerTranslation: L(
      'Ellen은 뉴욕에 없어요. 그녀는 휴가 중이에요.',
      'Ellen Nyu-Yorkda emas. U ta’tilda.',
      'Ellen isn’t in New York. She’s on holiday.',
      'Эллен не в Нью-Йорке. Она в отпуске.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['pronouns', 'she'],
  },

  en_s1u2_n3_079_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'They’re in Izmir.',
    audioText: 'They’re in Izmir.',
    answerI18n: L(
      '그들은 Izmir에 있어요',
      'Ular Izmirda',
      'They are in Izmir',
      'Они в Измире',
    ),
    options: ['They’re', 'in', 'Izmir', 'New', 'York', 'She’s'],
    optionsI18n: {
      ko: ['그들은', 'Izmir에', '있어요', '뉴욕에', '그녀는'],
      uz: ['Ular', 'Izmirda', 'Nyu-Yorkda', 'U'],
      en: ['They', 'are', 'in', 'Izmir', 'New York', 'She'],
      ru: ['Они', 'в', 'Измире', 'Нью-Йорке', 'Она'],
    },
    answerTranslation: L(
      '그들은 Izmir에 있어요.',
      'Ular Izmirda.',
      'They’re in Izmir.',
      'Они в Измире.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['pronouns', 'they', 'location'],
  },

  en_s1u2_n3_080_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Where are they?' },
      { speaker: 'user', text: 'They’re in Izmir.' },
      { speaker: 'npc', text: 'Where’s that?' },
    ],
    options: [
      'It’s in Turkey.',
      'They’re Turkey.',
      'It’s on Turkey.',
      'He’s in Turkey.',
    ],
    answer: 'It’s in Turkey.',
    answerTranslation: L(
      '튀르키예에 있어요.',
      'U Turkiyada.',
      'It’s in Turkey.',
      'Это в Турции.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['pronouns', 'it', 'location', 'review'],
  },
};

// ─────────────────────────────────────────────────────────────
// Node 3
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT2_NODE3 = {
  title: L(
    '그들은 어디에 있어요?',
    'Ular qayerda?',
    'Where are they?',
    'Где они?',
  ),
  section: 1,
  unit: 2,
  order: 3,
  isActive: true,

  lessons: [
    {
      title: L(
        'I, you, he, she, it, we, they',
        'I, you, he, she, it, we, they',
        'Subject pronouns',
        'Личные местоимения',
      ),
      description: L(
        '사람과 사물을 I, you, he, she, it, we, they로 바꿔 말하는 법을 익혀요.',
        'Odam va buyumlarni I, you, he, she, it, we, they bilan ifodalashni o‘rganasiz.',
        'Learn to replace people and things with I, you, he, she, it, we and they.',
        'Учимся заменять людей и предметы местоимениями I, you, he, she, it, we и they.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 1,
      questions: [
        'en_s1u2_n3_001_speaking',
        'en_s1u2_n3_002_speaking',
        'en_s1u2_n3_003_fill_in_blank',
        'en_s1u2_n3_004_speaking',
        'en_s1u2_n3_005_fill_in_blank',
        'en_s1u2_n3_006_speaking',
        'en_s1u2_n3_007_fill_in_blank',
        'en_s1u2_n3_008_speaking',
        'en_s1u2_n3_009_fill_in_blank',
        'en_s1u2_n3_010_speaking',
        'en_s1u2_n3_011_fill_in_blank',
        'en_s1u2_n3_012_speaking',
        'en_s1u2_n3_013_fill_in_blank',
        'en_s1u2_n3_014_speaking',
        'en_s1u2_n3_015_word_matching',
        'en_s1u2_n3_016_speaking',
        'en_s1u2_n3_017_reply_builder',
        'en_s1u2_n3_018_sentence_builder',
        'en_s1u2_n3_019_speaking',
        'en_s1u2_n3_020_dialog_complete',
      ],
    },

    {
      title: L(
        '지금 어디에 있어요?',
        'Hozir qayerdasiz?',
        'Where are you now?',
        'Где вы сейчас?',
      ),
      description: L(
        '장소를 묻고 도시·거리·건물 위치를 짧게 설명해요.',
        'Joylashuvni so‘rab, shahar, ko‘cha va bino qayerdaligini aytasiz.',
        'Ask where people and places are and give simple location information.',
        'Спрашиваем, где находятся люди и места, и даём простые ответы.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 2,
      questions: [
        'en_s1u2_n3_021_speaking',
        'en_s1u2_n3_022_fill_in_blank',
        'en_s1u2_n3_023_speaking',
        'en_s1u2_n3_024_fill_in_blank',
        'en_s1u2_n3_025_speaking',
        'en_s1u2_n3_026_translate_builder',
        'en_s1u2_n3_027_speaking',
        'en_s1u2_n3_028_fill_in_blank',
        'en_s1u2_n3_029_speaking',
        'en_s1u2_n3_030_dialog_complete',
        'en_s1u2_n3_031_speaking',
        'en_s1u2_n3_032_reply_builder',
        'en_s1u2_n3_033_speaking',
        'en_s1u2_n3_034_fill_in_blank',
        'en_s1u2_n3_035_speaking',
        'en_s1u2_n3_036_fill_in_blank',
        'en_s1u2_n3_037_speaking',
        'en_s1u2_n3_038_dialog_complete',
        'en_s1u2_n3_039_word_arrange',
        'en_s1u2_n3_040_sentence_builder',
      ],
    },

    {
      title: L(
        'in, on, near, next to',
        'in, on, near, next to',
        'Prepositions of place',
        'Предлоги места',
      ),
      description: L(
        '나라·도시에는 in, 거리에는 on, 가까운 장소에는 near/next to를 사용하고 home·work·school에는 at을 써요.',
        'Mamlakat va shahar bilan in, ko‘cha bilan on, yaqin joylar bilan near/next to va home, work, school bilan at ishlatasiz.',
        'Use in with countries and cities, on with streets, near/next to for nearby places, and at with home, work and school.',
        'Используем in со странами и городами, on с улицами, near/next to для близких мест и at с home, work и school.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 3,
      questions: [
        'en_s1u2_n3_041_speaking',
        'en_s1u2_n3_042_fill_in_blank',
        'en_s1u2_n3_043_speaking',
        'en_s1u2_n3_044_speaking',
        'en_s1u2_n3_045_fill_in_blank',
        'en_s1u2_n3_046_speaking',
        'en_s1u2_n3_047_speaking',
        'en_s1u2_n3_048_fill_in_blank',
        'en_s1u2_n3_049_speaking',
        'en_s1u2_n3_050_speaking',
        'en_s1u2_n3_051_fill_in_blank',
        'en_s1u2_n3_052_translate_builder',
        'en_s1u2_n3_053_speaking',
        'en_s1u2_n3_054_word_matching',
        'en_s1u2_n3_055_speaking',
        'en_s1u2_n3_056_fill_in_blank',
        'en_s1u2_n3_057_speaking',
        'en_s1u2_n3_058_fill_in_blank',
        'en_s1u2_n3_059_audio_match',
        'en_s1u2_n3_060_reply_builder',
      ],
    },

    {
      title: L(
        '지도에서 장소 찾기',
        'Xaritada joy topish',
        'Finding places on a map',
        'Ищем места на карте',
      ),
      description: L(
        '실제 도시와 장소를 이용해 대명사와 장소 전치사를 함께 복습해요.',
        'Haqiqiy shahar va joylar orqali olmoshlar va joy predloglarini birga takrorlaysiz.',
        'Review subject pronouns and prepositions using real city locations.',
        'Повторяем местоимения и предлоги места на примерах реальных городских мест.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 4,
      questions: [
        'en_s1u2_n3_061_speaking',
        'en_s1u2_n3_062_dialog_complete',
        'en_s1u2_n3_063_speaking',
        'en_s1u2_n3_064_fill_in_blank',
        'en_s1u2_n3_065_speaking',
        'en_s1u2_n3_066_fill_in_blank',
        'en_s1u2_n3_067_speaking',
        'en_s1u2_n3_068_translate_builder',
        'en_s1u2_n3_069_speaking',
        'en_s1u2_n3_070_fill_in_blank',
        'en_s1u2_n3_071_speaking',
        'en_s1u2_n3_072_word_arrange',
        'en_s1u2_n3_073_speaking',
        'en_s1u2_n3_074_reply_builder',
        'en_s1u2_n3_075_speaking',
        'en_s1u2_n3_076_fill_in_blank',
        'en_s1u2_n3_077_speaking',
        'en_s1u2_n3_078_fill_in_blank',
        'en_s1u2_n3_079_sentence_builder',
        'en_s1u2_n3_080_dialog_complete',
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Section 1 · Unit 2 · Node 4
// 2.4 Speaking and writing
//
// Coverage
// - What time is it?
// - number + number: two thirty
// - oh + number: ten oh five
// - o'clock
// - What time's the film / bus / train / meeting / class / party?
// - at + single event time
// - from ... to ... + time range
// - Excuse me / One moment
// - reading blog profiles
// - age / job / country / friend / location
// - informal contractions:
//   My name is → My name's
//   I am → I'm
//   he is → he's
//   she is → she's
//   it is → it's
//   we are → we're
//   they are → they're
//   is not → isn't
//   are not → aren't
// - writing a simple blog about yourself and a friend
//
// 4 lessons × 20 questions = 80
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT2_NODE4_WORDS = [
  {
    code: 'en-time-time',
    english: 'time',
    senseKey: 'clock-time',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('시간', 'vaqt', 'the time shown by a clock', 'время'),
    examples: [
      {
        english: 'What time is it?',
        translations: L(
          '몇 시예요?',
          'Soat necha?',
          'What time is it?',
          'Который час?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/taɪm/',
      ttsText: 'time',
    },
    media: {
      emoji: '🕒',
      imageUrl: '',
      imageAlt: L(
        '시계의 시간',
        'soatdagi vaqt',
        'the time on a clock',
        'время на часах',
      ),
    },
    tags: ['time'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-time-oclock',
    english: "o'clock",
    senseKey: 'exact-hour',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '정각',
      'roppa-rosa',
      'used after a number for an exact hour',
      'ровно',
    ),
    examples: [
      {
        english: 'It’s eight o’clock.',
        translations: L(
          '8시 정각이에요.',
          'Soat roppa-rosa sakkiz.',
          'It’s eight o’clock.',
          'Сейчас ровно восемь часов.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/əˈklɒk/',
      ttsText: "o'clock",
    },
    media: {
      emoji: '🕗',
      imageUrl: '',
      imageAlt: L(
        '8시 정각의 시계',
        'soat sakkiz',
        'a clock showing eight o’clock',
        'часы, показывающие восемь часов',
      ),
    },
    tags: ['time'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-event-film',
    english: 'film',
    senseKey: 'movie',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('영화', 'film', 'a movie', 'фильм'),
    examples: [
      {
        english: 'What time’s the film?',
        translations: L(
          '영화가 몇 시예요?',
          'Film soat nechada?',
          'What time’s the film?',
          'Во сколько фильм?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/fɪlm/',
      ttsText: 'film',
    },
    media: {
      emoji: '🎬',
      imageUrl: '',
      imageAlt: L('영화', 'film', 'a film', 'фильм'),
    },
    tags: ['time', 'events'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-event-meeting',
    english: 'meeting',
    senseKey: 'organized-meeting',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '회의; 모임',
      'uchrashuv; yig‘ilish',
      'an organized occasion when people meet',
      'встреча; собрание',
    ),
    examples: [
      {
        english: 'What time’s the meeting?',
        translations: L(
          '회의가 몇 시예요?',
          'Yig‘ilish soat nechada?',
          'What time’s the meeting?',
          'Во сколько встреча?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈmiːtɪŋ/',
      ttsText: 'meeting',
    },
    media: {
      emoji: '👥',
      imageUrl: '',
      imageAlt: L(
        '회의 중인 사람들',
        'yig‘ilishdagi odamlar',
        'people in a meeting',
        'люди на встрече',
      ),
    },
    tags: ['time', 'events'],
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
        english: 'What time’s the next train?',
        translations: L(
          '다음 기차가 몇 시예요?',
          'Keyingi poyezd soat nechada?',
          'What time’s the next train?',
          'Во сколько следующий поезд?',
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
    tags: ['transport', 'time'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-transport-bus',
    english: 'bus',
    senseKey: 'road-public-transport',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '버스',
      'avtobus',
      'a large road vehicle for passengers',
      'автобус',
    ),
    examples: [
      {
        english: 'What time’s the next bus?',
        translations: L(
          '다음 버스가 몇 시예요?',
          'Keyingi avtobus soat nechada?',
          'What time’s the next bus?',
          'Во сколько следующий автобус?',
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
    tags: ['transport', 'time'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-education-class',
    english: 'class',
    senseKey: 'lesson-group',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('수업', 'dars', 'a lesson or period of study', 'занятие; урок'),
    examples: [
      {
        english: 'What time’s your English class?',
        translations: L(
          '영어 수업이 몇 시예요?',
          'Ingliz tili darsingiz soat nechada?',
          'What time’s your English class?',
          'Во сколько у вас урок английского?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/klɑːs/',
      ttsText: 'class',
    },
    media: {
      emoji: '📚',
      imageUrl: '',
      imageAlt: L('수업', 'dars', 'a class', 'занятие'),
    },
    tags: ['education', 'time'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-time-next',
    english: 'next',
    senseKey: 'following-one',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '다음의',
      'keyingi',
      'coming immediately after this one',
      'следующий',
    ),
    examples: [
      {
        english: 'What time’s the next train?',
        translations: L(
          '다음 기차가 몇 시예요?',
          'Keyingi poyezd soat nechada?',
          'What time’s the next train?',
          'Во сколько следующий поезд?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/nekst/',
      ttsText: 'next',
    },
    media: {
      emoji: '➡️',
      imageUrl: '',
      imageAlt: L(
        '다음 순서',
        'keyingi navbat',
        'the next item',
        'следующий элемент',
      ),
    },
    tags: ['time', 'sequence'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-phrase-one-moment',
    english: 'one moment',
    senseKey: 'wait-short-time',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '잠시만요',
      'bir daqiqa',
      'a phrase asking someone to wait briefly',
      'одну минуту',
    ),
    examples: [
      {
        english: 'One moment. It’s ten forty-two.',
        translations: L(
          '잠시만요. 10시 42분이에요.',
          'Bir daqiqa. Soat o‘n qirq ikki.',
          'One moment. It’s ten forty-two.',
          'Одну минуту. Сейчас десять сорок две.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/wʌn ˈməʊmənt/',
      ttsText: 'one moment',
    },
    media: {
      emoji: '☝️',
      imageUrl: '',
      imageAlt: L(
        '잠시 기다려 달라는 손짓',
        'biroz kutishni bildiruvchi ishora',
        'a gesture asking someone to wait',
        'жест с просьбой немного подождать',
      ),
    },
    tags: ['conversation', 'time'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-writing-blog',
    english: 'blog',
    senseKey: 'online-personal-writing',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '블로그',
      'blog',
      'a website or online page with personal writing',
      'блог',
    ),
    examples: [
      {
        english: 'Write a blog about you and your friend.',
        translations: L(
          '자신과 친구에 대한 블로그를 써 보세요.',
          'O‘zingiz va do‘stingiz haqida blog yozing.',
          'Write a blog about you and your friend.',
          'Напишите блог о себе и своём друге.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/blɒɡ/',
      ttsText: 'blog',
    },
    media: {
      emoji: '💻',
      imageUrl: '',
      imageAlt: L(
        '온라인 블로그',
        'onlayn blog',
        'an online blog',
        'онлайн-блог',
      ),
    },
    tags: ['writing'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-writing-profile',
    english: 'profile',
    senseKey: 'personal-information-page',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '프로필; 자기소개',
      'profil',
      'a short description containing personal information',
      'профиль',
    ),
    examples: [
      {
        english: 'Read the profile.',
        translations: L(
          '프로필을 읽으세요.',
          'Profilni o‘qing.',
          'Read the profile.',
          'Прочитайте профиль.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈprəʊfaɪl/',
      ttsText: 'profile',
    },
    media: {
      emoji: '👤',
      imageUrl: '',
      imageAlt: L(
        '개인 프로필',
        'shaxsiy profil',
        'a personal profile',
        'личный профиль',
      ),
    },
    tags: ['writing', 'personal-information'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-media-photo',
    english: 'photo',
    senseKey: 'photograph',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('사진', 'rasm; surat', 'a photograph', 'фотография'),
    examples: [
      {
        english: 'I’m with my friend Pedro in this photo.',
        translations: L(
          '이 사진에서 저는 친구 Pedro와 함께 있어요.',
          'Bu suratda men do‘stim Pedro bilanman.',
          'I’m with my friend Pedro in this photo.',
          'На этой фотографии я с моим другом Педро.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈfəʊtəʊ/',
      ttsText: 'photo',
    },
    media: {
      emoji: '📷',
      imageUrl: '',
      imageAlt: L('사진', 'surat', 'a photo', 'фотография'),
    },
    tags: ['writing', 'personal-information'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-business-company',
    english: 'company',
    senseKey: 'business-organization',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('회사', 'kompaniya', 'a business organization', 'компания'),
    examples: [
      {
        english: 'ENI is an electricity company.',
        translations: L(
          'ENI는 전력 회사예요.',
          'ENI elektr kompaniyasi.',
          'ENI is an electricity company.',
          'ENI — энергетическая компания.',
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
    tags: ['work', 'places'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-business-office',
    english: 'office',
    senseKey: 'workplace-room',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('사무실', 'ofis', 'a place where people work at desks', 'офис'),
    examples: [
      {
        english: 'The offices are near Ciampino airport.',
        translations: L(
          '사무실은 Ciampino 공항 근처에 있어요.',
          'Ofislar Ciampino aeroporti yaqinida.',
          'The offices are near Ciampino airport.',
          'Офисы находятся рядом с аэропортом Чампино.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈɒfɪs/',
      ttsText: 'office',
    },
    media: {
      emoji: '🏢',
      imageUrl: '',
      imageAlt: L('사무실', 'ofis', 'an office', 'офис'),
    },
    tags: ['work', 'places'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-place-airport',
    english: 'airport',
    senseKey: 'air-travel-place',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '공항',
      'aeroport',
      'a place where planes arrive and leave',
      'аэропорт',
    ),
    examples: [
      {
        english: 'The offices are near the airport.',
        translations: L(
          '사무실은 공항 근처에 있어요.',
          'Ofislar aeroport yaqinida.',
          'The offices are near the airport.',
          'Офисы находятся рядом с аэропортом.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈeəpɔːt/',
      ttsText: 'airport',
    },
    media: {
      emoji: '✈️',
      imageUrl: '',
      imageAlt: L('공항', 'aeroport', 'an airport', 'аэропорт'),
    },
    tags: ['places', 'travel'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-business-electricity',
    english: 'electricity',
    senseKey: 'electrical-power',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '전기; 전력',
      'elektr energiyasi',
      'electrical power',
      'электричество',
    ),
    examples: [
      {
        english: 'ENI is an electricity company.',
        translations: L(
          'ENI는 전력 회사예요.',
          'ENI elektr kompaniyasi.',
          'ENI is an electricity company.',
          'ENI — энергетическая компания.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɪˌlekˈtrɪsəti/',
      ttsText: 'electricity',
    },
    media: {
      emoji: '⚡',
      imageUrl: '',
      imageAlt: L(
        '전기 에너지',
        'elektr energiyasi',
        'electric power',
        'электрическая энергия',
      ),
    },
    tags: ['work'],
    difficulty: 1,
    isCore: false,
  },

  {
    code: 'en-person-age',
    english: 'age',
    senseKey: 'years-old',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '나이',
      'yosh',
      'the number of years a person has lived',
      'возраст',
    ),
    examples: [
      {
        english: 'Age: twenty-three.',
        translations: L(
          '나이: 23세.',
          'Yosh: yigirma uch.',
          'Age: twenty-three.',
          'Возраст: двадцать три.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/eɪdʒ/',
      ttsText: 'age',
    },
    media: {
      emoji: '🎂',
      imageUrl: '',
      imageAlt: L('나이', 'yosh', 'age', 'возраст'),
    },
    tags: ['personal-information'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adverb-together',
    english: 'together',
    senseKey: 'with-each-other',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L(
      '함께',
      'birga',
      'with another person or other people',
      'вместе',
    ),
    examples: [
      {
        english: 'We’re in an English class together.',
        translations: L(
          '우리는 영어 수업을 함께 들어요.',
          'Biz ingliz tili darsida birgamiz.',
          'We’re in an English class together.',
          'Мы вместе на уроке английского.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/təˈɡeðə/',
      ttsText: 'together',
    },
    media: {
      emoji: '👥',
      imageUrl: '',
      imageAlt: L(
        '함께 있는 두 사람',
        'birga turgan ikki odam',
        'two people together',
        'два человека вместе',
      ),
    },
    tags: ['conversation'],
    difficulty: 1,
    isCore: true,
  },
];

export const EN_S1_UNIT2_NODE4_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · What time is it?
  // ===========================================================

  en_s1u2_n4_001_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'What time is it?',
    audioText: 'What time is it?',
    answerTranslation: L(
      '몇 시예요?',
      'Soat necha?',
      'What time is it?',
      'Который час?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['time', 'question'],
  },

  en_s1u2_n4_002_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'What ___ is it?',
    blankAnswers: ['time'],
    options: ['time', 'class', 'train', 'number'],
    answer: 'time',
    answerTranslation: L(
      '몇 시예요?',
      'Soat necha?',
      'What time is it?',
      'Который час?',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['time'],
  },

  en_s1u2_n4_003_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'It’s one fifteen.',
    audioText: 'It’s one fifteen.',
    answerTranslation: L(
      '1시 15분이에요.',
      'Soat bir o‘n besh.',
      'It’s one fifteen.',
      'Сейчас час пятнадцать.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['time', '1:15'],
  },

  en_s1u2_n4_004_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What time is it?',
    options: ['It’s', 'one', 'fifteen', 'at', 'meeting', 'from'],
    answer: 'It’s one fifteen',
    answerTranslation: L(
      '1시 15분이에요.',
      'Soat bir o‘n besh.',
      'It’s one fifteen.',
      'Сейчас час пятнадцать.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['time', 'reply-builder'],
  },

  en_s1u2_n4_005_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'It’s two thirty.',
    audioText: 'It’s two thirty.',
    answerTranslation: L(
      '2시 30분이에요.',
      'Soat ikki o‘ttiz.',
      'It’s two thirty.',
      'Сейчас два тридцать.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['time', '2:30'],
  },

  en_s1u2_n4_006_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['thirty', 'It’s', 'two', 'at', 'five'],
    answer: 'It’s two thirty',
    audioText: 'It’s two thirty.',
    answerTranslation: L(
      '2시 30분이에요.',
      'Soat ikki o‘ttiz.',
      'It’s two thirty.',
      'Сейчас два тридцать.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['time', 'arrange'],
  },

  en_s1u2_n4_007_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'It’s eight o’clock.',
    audioText: 'It’s eight o’clock.',
    answerTranslation: L(
      '8시 정각이에요.',
      'Soat roppa-rosa sakkiz.',
      'It’s eight o’clock.',
      'Сейчас ровно восемь.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['time', 'oclock'],
  },

  en_s1u2_n4_008_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'It’s eight ___.',
    blankAnswers: ["o'clock"],
    options: ["o'clock", 'time', 'moment', 'next'],
    answer: "o'clock",
    answerTranslation: L(
      '8시 정각이에요.',
      'Soat roppa-rosa sakkiz.',
      'It’s eight o’clock.',
      'Сейчас ровно восемь.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['time', 'oclock'],
  },

  en_s1u2_n4_009_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'It’s ten oh five.',
    audioText: 'It’s ten oh five.',
    answerTranslation: L(
      '10시 5분이에요.',
      'Soat o‘n-u besh daqiqa.',
      'It’s ten oh five.',
      'Сейчас десять ноль пять.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['time', 'oh', '10:05'],
  },

  en_s1u2_n4_010_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '10:05를 말할 때 알맞은 말을 고르세요.',
      '10:05 ni aytishda mos so‘zni tanlang.',
      'Choose the correct word for 10:05.',
      'Выберите правильное слово для 10:05.',
    ),
    sentenceTemplate: 'It’s ten ___ five.',
    blankAnswers: ['oh'],
    options: ['oh', 'o’clock', 'at', 'to'],
    answer: 'oh',
    answerTranslation: L(
      '10시 5분은 ten oh five라고 말해요.',
      '10:05 — ten oh five.',
      '10:05 can be said as ten oh five.',
      '10:05 можно сказать ten oh five.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['time', 'oh'],
  },

  en_s1u2_n4_011_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      { korean: 'one fifteen', native: '1:15' },
      { korean: 'two thirty', native: '2:30' },
      { korean: 'eight o’clock', native: '8:00' },
      { korean: 'ten oh five', native: '10:05' },
      { korean: 'nine fifty', native: '9:50' },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['time', 'listening'],
  },

  en_s1u2_n4_012_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'It’s nine fifty.',
    audioText: 'It’s nine fifty.',
    answerTranslation: L(
      '9시 50분이에요.',
      'Soat to‘qqiz ellik.',
      'It’s nine fifty.',
      'Сейчас девять пятьдесят.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['time', '9:50'],
  },

  en_s1u2_n4_013_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '들은 시간을 고르세요.',
      'Eshitgan vaqtingizni tanlang.',
      'Choose the time you hear.',
      'Выберите время, которое вы слышите.',
    ),
    sentenceTemplate: '___',
    blankAnswers: ['7:30'],
    options: ['7:30', '7:13', '6:30', '8:30'],
    answer: '7:30',
    audioText: 'Seven thirty.',
    answerTranslation: L(
      '7시 30분.',
      'Soat yetti o‘ttiz.',
      'Seven thirty.',
      'Семь тридцать.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['time', 'listening'],
  },

  en_s1u2_n4_014_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Seven thirty.',
    audioText: 'Seven thirty.',
    answerTranslation: L(
      '7시 30분.',
      'Soat yetti o‘ttiz.',
      'Seven thirty.',
      'Семь тридцать.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['time', '7:30'],
  },

  en_s1u2_n4_015_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['It’s', 'four', 'twenty-five', 'at', 'film', 'from'],
    answer: 'It’s four twenty-five',
    answerTranslation: L(
      '4시 25분이에요.',
      'Soat to‘rt yigirma besh.',
      'It’s four twenty-five.',
      'Сейчас четыре двадцать пять.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['time', 'builder'],
  },

  en_s1u2_n4_016_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'It’s four twenty-five.',
    audioText: 'It’s four twenty-five.',
    answerTranslation: L(
      '4시 25분이에요.',
      'Soat to‘rt yigirma besh.',
      'It’s four twenty-five.',
      'Сейчас четыре двадцать пять.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['time', '4:25'],
  },

  en_s1u2_n4_017_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '현재 시간을 묻는 질문을 완성하세요.',
      'Hozirgi vaqtni so‘rash savolini to‘ldiring.',
      'Complete the question asking for the current time.',
      'Дополните вопрос о текущем времени.',
    ),
    sentenceTemplate: 'What time ___ it?',
    blankAnswers: ['is'],
    options: ['is', 'are', 'at', 'from'],
    answer: 'is',
    answerTranslation: L(
      '몇 시예요?',
      'Soat necha?',
      'What time is it?',
      'Который час?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['time', 'question'],
  },

  en_s1u2_n4_018_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'It’s ten oh five.',
    audioText: 'It’s ten oh five.',
    answerI18n: L(
      '10시 5분이에요',
      'Soat o‘n-u besh daqiqa',
      'It is ten oh five',
      'Сейчас десять ноль пять',
    ),
    options: ['It’s', 'ten', 'oh', 'five', 'fifty', 'at'],
    optionsI18n: {
      ko: ['10시', '5분이에요', '50분', '정각'],
      uz: ['soat', 'o‘n', 'besh', 'ellik'],
      en: ['It', 'is', 'ten', 'oh', 'five', 'fifty'],
      ru: ['Сейчас', 'десять', 'ноль', 'пять', 'пятьдесят'],
    },
    answerTranslation: L(
      '10시 5분이에요.',
      'Soat o‘n-u besh daqiqa.',
      'It’s ten oh five.',
      'Сейчас десять ноль пять.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['time', 'sentence-builder'],
  },

  en_s1u2_n4_019_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'What time is it? It’s six forty.',
    audioText: 'What time is it? It’s six forty.',
    answerTranslation: L(
      '몇 시예요? 6시 40분이에요.',
      'Soat necha? Soat olti qirq.',
      'What time is it? It’s six forty.',
      'Который час? Сейчас шесть сорок.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['time', 'review'],
  },

  en_s1u2_n4_020_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What time is it?' }],
    options: [
      'It’s one twenty-five.',
      'It’s at one twenty-five.',
      'It’s from one twenty-five.',
      'At time one twenty-five.',
    ],
    answer: 'It’s one twenty-five.',
    answerTranslation: L(
      '1시 25분이에요.',
      'Soat bir yigirma besh.',
      'It’s one twenty-five.',
      'Сейчас час двадцать пять.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['time', 'current-time', 'dialog'],
  },

  // ===========================================================
  // Lesson 2 · Events and schedules
  // ===========================================================

  en_s1u2_n4_021_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'What time’s the film?',
    audioText: 'What time’s the film?',
    answerTranslation: L(
      '영화가 몇 시예요?',
      'Film soat nechada?',
      'What time’s the film?',
      'Во сколько фильм?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['time', 'film'],
  },

  en_s1u2_n4_022_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What time’s the film?',
    options: ['It’s', 'at', 'seven', 'thirty', 'from', 'film'],
    answer: 'It’s at seven thirty',
    answerTranslation: L(
      '7시 30분이에요.',
      'Soat yetti o‘ttizda.',
      'It’s at seven thirty.',
      'Он в семь тридцать.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['time', 'film', 'reply-builder'],
  },

  en_s1u2_n4_023_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'It’s at seven thirty.',
    audioText: 'It’s at seven thirty.',
    answerTranslation: L(
      '7시 30분이에요.',
      'Soat yetti o‘ttizda.',
      'It’s at seven thirty.',
      'Он в семь тридцать.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['time', 'at'],
  },

  en_s1u2_n4_024_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The film is ___ seven thirty.',
    blankAnswers: ['at'],
    options: ['at', 'from', 'to', 'in'],
    answer: 'at',
    answerTranslation: L(
      '영화는 7시 30분이에요.',
      'Film soat yetti o‘ttizda.',
      'The film is at seven thirty.',
      'Фильм в семь тридцать.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['time', 'at'],
  },

  en_s1u2_n4_025_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'What time’s the meeting?',
    audioText: 'What time’s the meeting?',
    answerTranslation: L(
      '회의가 몇 시예요?',
      'Yig‘ilish soat nechada?',
      'What time’s the meeting?',
      'Во сколько встреча?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['time', 'meeting'],
  },

  en_s1u2_n4_026_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['It’s', 'from', 'two', 'o’clock', 'to', 'four', 'at', 'meeting'],
    answer: 'It’s from two o’clock to four',
    answerTranslation: L(
      '2시부터 4시까지예요.',
      'Soat ikkidan to‘rtgacha.',
      'It’s from two o’clock to four.',
      'С двух до четырёх.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['time', 'from-to'],
  },

  en_s1u2_n4_027_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'It’s from two o’clock to four o’clock.',
    audioText: 'It’s from two o’clock to four o’clock.',
    answerTranslation: L(
      '2시부터 4시까지예요.',
      'Soat ikkidan to‘rtgacha.',
      'It’s from two o’clock to four o’clock.',
      'С двух до четырёх.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['time', 'from-to'],
  },

  en_s1u2_n4_028_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'It’s ___ ten o’clock ___ eleven thirty.',
    blankAnswers: ['from', 'to'],
    options: ['from', 'to', 'at', 'in'],
    answer: 'from',
    answerTranslation: L(
      '10시부터 11시 30분까지예요.',
      'Soat o‘ndan o‘n bir yarimgacha.',
      'It’s from ten o’clock to eleven thirty.',
      'С десяти до одиннадцати тридцати.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['time', 'from-to'],
  },

  en_s1u2_n4_029_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Excuse me. What time’s the next train?',
    audioText: 'Excuse me. What time’s the next train?',
    answerTranslation: L(
      '실례합니다. 다음 기차가 몇 시예요?',
      'Kechirasiz. Keyingi poyezd soat nechada?',
      'Excuse me. What time’s the next train?',
      'Извините. Во сколько следующий поезд?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['time', 'train'],
  },

  en_s1u2_n4_030_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'user', text: 'Excuse me. What time’s the next train?' },
    ],
    options: [
      'One moment. It’s at ten forty-two.',
      'I’m a train.',
      'It’s from train to bus.',
      'The meeting is a nurse.',
    ],
    answer: 'One moment. It’s at ten forty-two.',
    answerTranslation: L(
      '잠시만요. 10시 42분이에요.',
      'Bir daqiqa. Soat o‘n qirq ikkida.',
      'One moment. It’s at ten forty-two.',
      'Одну минуту. В десять сорок две.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['time', 'train', 'dialog'],
  },

  en_s1u2_n4_031_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'One moment.',
    audioText: 'One moment.',
    answerTranslation: L(
      '잠시만요.',
      'Bir daqiqa.',
      'One moment.',
      'Одну минуту.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['conversation', 'one-moment'],
  },

  en_s1u2_n4_032_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['next', 'What', 'time’s', 'the', 'bus', 'meeting', 'is'],
    answer: 'What time’s the next bus',
    audioText: 'What time’s the next bus?',
    answerTranslation: L(
      '다음 버스가 몇 시예요?',
      'Keyingi avtobus soat nechada?',
      'What time’s the next bus?',
      'Во сколько следующий автобус?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['time', 'bus'],
  },

  en_s1u2_n4_033_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'What time’s the next bus?',
    audioText: 'What time’s the next bus?',
    answerTranslation: L(
      '다음 버스가 몇 시예요?',
      'Keyingi avtobus soat nechada?',
      'What time’s the next bus?',
      'Во сколько следующий автобус?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['time', 'bus'],
  },

  en_s1u2_n4_034_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What time’s the next bus?',
    options: ['It’s', 'at', 'five', 'fifteen', 'from', 'eleven'],
    answer: 'It’s at five fifteen',
    answerTranslation: L(
      '5시 15분이에요.',
      'Soat besh o‘n beshda.',
      'It’s at five fifteen.',
      'Он в пять пятнадцать.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['time', 'bus', 'reply-builder'],
  },

  en_s1u2_n4_035_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'What time’s your English class?',
    audioText: 'What time’s your English class?',
    answerTranslation: L(
      '영어 수업이 몇 시예요?',
      'Ingliz tili darsingiz soat nechada?',
      'What time’s your English class?',
      'Во сколько у вас английский?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['time', 'class'],
  },

  en_s1u2_n4_036_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'My English class is ___ two thirty.',
    blankAnswers: ['at'],
    options: ['at', 'to', 'from', 'on'],
    answer: 'at',
    answerTranslation: L(
      '영어 수업은 2시 30분이에요.',
      'Ingliz tili darsim soat ikki o‘ttizda.',
      'My English class is at two thirty.',
      'Урок английского в два тридцать.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['time', 'class', 'at'],
  },

  en_s1u2_n4_037_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'What time’s the party?',
    audioText: 'What time’s the party?',
    answerTranslation: L(
      '파티가 몇 시예요?',
      'Bazm soat nechada?',
      'What time’s the party?',
      'Во сколько вечеринка?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['time', 'event'],
  },

  en_s1u2_n4_038_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'It’s from eight fifteen to eleven forty-five.',
    audioText: 'It’s from eight fifteen to eleven forty-five.',
    answerI18n: L(
      '8시 15분부터 11시 45분까지예요',
      'Soat sakkiz o‘n beshdan o‘n bir qirq beshgacha',
      'It is from eight fifteen to eleven forty-five',
      'С восьми пятнадцати до одиннадцати сорока пяти',
    ),
    options: [
      'It’s',
      'from',
      'eight',
      'fifteen',
      'to',
      'eleven',
      'forty-five',
      'at',
    ],
    optionsI18n: {
      ko: ['8시', '15분부터', '11시', '45분까지', '정각'],
      uz: ['sakkiz', 'o‘n', 'beshdan', 'o‘n', 'bir', 'qirq', 'beshgacha'],
      en: [
        'It',
        'is',
        'from',
        'eight',
        'fifteen',
        'to',
        'eleven',
        'forty-five',
      ],
      ru: ['с', 'восьми', 'пятнадцати', 'до', 'одиннадцати', 'сорока', 'пяти'],
    },
    answerTranslation: L(
      '8시 15분부터 11시 45분까지예요.',
      'Soat sakkiz o‘n beshdan o‘n bir qirq beshgacha.',
      'It’s from eight fifteen to eleven forty-five.',
      'С восьми пятнадцати до одиннадцати сорока пяти.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['time', 'from-to', 'sentence-builder'],
  },

  en_s1u2_n4_039_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      { korean: 'at eleven fifty', native: '11:50' },
      { korean: 'at twelve forty', native: '12:40' },
      { korean: 'at six fifteen', native: '6:15' },
      { korean: 'at two thirty', native: '2:30' },
      { korean: 'at five fifteen', native: '5:15' },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['time', 'schedule', 'listening'],
  },

  en_s1u2_n4_040_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What time’s the meeting?' }],
    options: [
      'It’s from six o’clock to seven thirty.',
      'It’s six o’clock to.',
      'It’s at six to seven.',
      'It’s meeting seven.',
    ],
    answer: 'It’s from six o’clock to seven thirty.',
    answerTranslation: L(
      '6시부터 7시 30분까지예요.',
      'Soat oltidan yetti o‘ttizgacha.',
      'It’s from six o’clock to seven thirty.',
      'С шести до семи тридцати.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['time', 'meeting', 'review'],
  },

  // ===========================================================
  // Lesson 3 · Reading a blog
  // Adriana / Gio
  // ===========================================================

  en_s1u2_n4_041_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'My name’s Adriana.',
    audioText: 'My name’s Adriana.',
    answerTranslation: L(
      '제 이름은 Adriana예요.',
      'Mening ismim Adriana.',
      'My name’s Adriana.',
      'Меня зовут Адриана.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['blog', 'adriana'],
  },

  en_s1u2_n4_042_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Adriana is from ___.',
    blankAnswers: ['Brazil'],
    options: ['Brazil', 'Italy', 'Turkey', 'Canada'],
    answer: 'Brazil',
    answerTranslation: L(
      'Adriana는 브라질 출신이에요.',
      'Adriana Braziliyadan.',
      'Adriana is from Brazil.',
      'Адриана из Бразилии.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['blog', 'adriana', 'country'],
  },

  en_s1u2_n4_043_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I’m eighteen.',
    audioText: 'I’m eighteen.',
    answerTranslation: L(
      '저는 18살이에요.',
      'Men o‘n sakkiz yoshdaman.',
      'I’m eighteen.',
      'Мне восемнадцать.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['blog', 'age'],
  },

  en_s1u2_n4_044_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      'Adriana의 나이를 고르세요.',
      'Adriananing yoshini tanlang.',
      'Choose Adriana’s age.',
      'Выберите возраст Адрианы.',
    ),
    sentenceTemplate: 'Adriana is ___.',
    blankAnswers: ['eighteen'],
    options: ['eighteen', 'twenty-three', 'twenty-five', 'twenty-seven'],
    answer: 'eighteen',
    answerTranslation: L(
      'Adriana는 18살이에요.',
      'Adriana o‘n sakkiz yoshda.',
      'Adriana is eighteen.',
      'Адриане восемнадцать.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['blog', 'adriana', 'age'],
  },

  en_s1u2_n4_045_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I’m with my friend Pedro in this photo.',
    audioText: 'I’m with my friend Pedro in this photo.',
    answerTranslation: L(
      '이 사진에서 저는 친구 Pedro와 함께 있어요.',
      'Bu suratda men do‘stim Pedro bilanman.',
      'I’m with my friend Pedro in this photo.',
      'На этой фотографии я с моим другом Педро.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['blog', 'photo', 'friend'],
  },

  en_s1u2_n4_046_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Who’s Adriana’s friend?',
    options: ['Her', 'friend', 'is', 'Pedro', 'Gio', 'Nevin'],
    answer: 'Her friend is Pedro',
    answerTranslation: L(
      '그녀의 친구는 Pedro예요.',
      'Uning do‘sti Pedro.',
      'Her friend is Pedro.',
      'Её друг — Педро.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['blog', 'adriana', 'pedro'],
  },

  en_s1u2_n4_047_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I’m a student in a language school in Vancouver.',
    audioText: 'I’m a student in a language school in Vancouver.',
    answerTranslation: L(
      '저는 밴쿠버의 어학원 학생이에요.',
      'Men Vankuverdagi til maktabida talabaman.',
      'I’m a student in a language school in Vancouver.',
      'Я студентка языковой школы в Ванкувере.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['blog', 'adriana', 'school'],
  },

  en_s1u2_n4_048_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Adriana is a ___ in Vancouver.',
    blankAnswers: ['student'],
    options: ['student', 'chef', 'engineer', 'nurse'],
    answer: 'student',
    answerTranslation: L(
      'Adriana는 밴쿠버의 학생이에요.',
      'Adriana Vankuverda talaba.',
      'Adriana is a student in Vancouver.',
      'Адриана — студентка в Ванкувере.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['blog', 'adriana', 'job'],
  },

  en_s1u2_n4_049_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Pedro isn’t a student. He’s a chef.',
    audioText: 'Pedro isn’t a student. He’s a chef.',
    answerTranslation: L(
      'Pedro는 학생이 아니에요. 요리사예요.',
      'Pedro talaba emas. U oshpaz.',
      'Pedro isn’t a student. He’s a chef.',
      'Педро не студент. Он повар.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['blog', 'pedro', 'negative'],
  },

  en_s1u2_n4_050_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Is Pedro a student?' }],
    options: [
      'No, he isn’t. He’s a chef.',
      'Yes, she is.',
      'No, they aren’t engineers.',
      'He’s from Ankara.',
    ],
    answer: 'No, he isn’t. He’s a chef.',
    answerTranslation: L(
      '아니요. 그는 학생이 아니라 요리사예요.',
      'Yo‘q. U talaba emas. U oshpaz.',
      'No, he isn’t. He’s a chef.',
      'Нет. Он не студент. Он повар.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['blog', 'pedro', 'dialog'],
  },

  en_s1u2_n4_051_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The restaurant is next to the school.',
    audioText: 'The restaurant is next to the school.',
    answerTranslation: L(
      '레스토랑은 학교 바로 옆에 있어요.',
      'Restoran maktabning yonida.',
      'The restaurant is next to the school.',
      'Ресторан находится рядом со школой.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['blog', 'place', 'next-to'],
  },

  en_s1u2_n4_052_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I’m Gio from Italy.',
    audioText: 'I’m Gio from Italy.',
    answerTranslation: L(
      '저는 이탈리아 출신 Gio예요.',
      'Men Italiyadan Gio.',
      'I’m Gio from Italy.',
      'Я Джио из Италии.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['blog', 'gio', 'country'],
  },

  en_s1u2_n4_053_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      'Gio의 나이를 고르세요.',
      'Gioning yoshini tanlang.',
      'Choose Gio’s age.',
      'Выберите возраст Джио.',
    ),
    sentenceTemplate: 'Gio is ___.',
    blankAnswers: ['twenty-seven'],
    options: ['eighteen', 'twenty-three', 'twenty-five', 'twenty-seven'],
    answer: 'twenty-seven',
    answerTranslation: L(
      'Gio는 27살이에요.',
      'Gio yigirma yetti yoshda.',
      'Gio is twenty-seven.',
      'Джио двадцать семь.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['blog', 'gio', 'age'],
  },

  en_s1u2_n4_054_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I’m an engineer with ENI.',
    audioText: 'I’m an engineer with ENI.',
    answerTranslation: L(
      '저는 ENI의 엔지니어예요.',
      'Men ENIda muhandisman.',
      'I’m an engineer with ENI.',
      'Я инженер в ENI.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['blog', 'gio', 'job'],
  },

  en_s1u2_n4_055_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'ENI is an ___ company.',
    blankAnswers: ['electricity'],
    options: ['electricity', 'airport', 'student', 'restaurant'],
    answer: 'electricity',
    answerTranslation: L(
      'ENI는 전력 회사예요.',
      'ENI elektr kompaniyasi.',
      'ENI is an electricity company.',
      'ENI — энергетическая компания.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['blog', 'company'],
  },

  en_s1u2_n4_056_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The offices are near Ciampino airport.',
    audioText: 'The offices are near Ciampino airport.',
    answerTranslation: L(
      '사무실은 Ciampino 공항 근처에 있어요.',
      'Ofislar Ciampino aeroporti yaqinida.',
      'The offices are near Ciampino airport.',
      'Офисы находятся рядом с аэропортом Чампино.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['blog', 'office', 'airport'],
  },

  en_s1u2_n4_057_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      'Nevin의 나이를 고르세요.',
      'Nevinning yoshini tanlang.',
      'Choose Nevin’s age.',
      'Выберите возраст Невин.',
    ),
    sentenceTemplate: 'Nevin is ___.',
    blankAnswers: ['twenty-five'],
    options: ['eighteen', 'twenty-three', 'twenty-five', 'twenty-seven'],
    answer: 'twenty-five',
    answerTranslation: L(
      'Nevin은 25살이에요.',
      'Nevin yigirma besh yoshda.',
      'Nevin is twenty-five.',
      'Невин двадцать пять.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['blog', 'nevin', 'age'],
  },

  en_s1u2_n4_058_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['Nevin’s', 'from', 'Ankara', 'in', 'Turkey', 'Italy', 'Rome'],
    answer: 'Nevin’s from Ankara in Turkey',
    answerTranslation: L(
      'Nevin은 튀르키예 앙카라 출신이에요.',
      'Nevin Turkiyaning Ankara shahridan.',
      'Nevin’s from Ankara in Turkey.',
      'Невин из Анкары в Турции.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['blog', 'nevin', 'country'],
  },

  en_s1u2_n4_059_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She’s a nurse.',
    audioText: 'She’s a nurse.',
    answerTranslation: L(
      '그녀는 간호사예요.',
      'U hamshira.',
      'She’s a nurse.',
      'Она медсестра.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['blog', 'nevin', 'job'],
  },

  en_s1u2_n4_060_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'We’re in an English class together.',
    audioText: 'We’re in an English class together.',
    answerI18n: L(
      '우리는 영어 수업을 함께 들어요',
      'Biz ingliz tili darsida birgamiz',
      'We are in an English class together',
      'Мы вместе на уроке английского',
    ),
    options: ['We’re', 'in', 'an', 'English', 'class', 'together', 'office'],
    optionsI18n: {
      ko: ['우리는', '영어', '수업을', '함께', '들어요', '사무실'],
      uz: ['Biz', 'ingliz', 'tili', 'darsida', 'birgamiz', 'ofisda'],
      en: ['We', 'are', 'in', 'an', 'English', 'class', 'together'],
      ru: ['Мы', 'вместе', 'на', 'уроке', 'английского', 'офисе'],
    },
    answerTranslation: L(
      '우리는 영어 수업을 함께 들어요.',
      'Biz ingliz tili darsida birgamiz.',
      'We’re in an English class together.',
      'Мы вместе на уроке английского.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['blog', 'together', 'review'],
  },

  // ===========================================================
  // Lesson 4 · Contractions + writing a blog
  // ===========================================================

  en_s1u2_n4_061_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'My name’s Huba.',
    audioText: 'My name’s Huba.',
    answerTranslation: L(
      '제 이름은 Huba예요.',
      'Mening ismim Huba.',
      'My name’s Huba.',
      'Меня зовут Хуба.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['contractions', 'blog'],
  },

  en_s1u2_n4_062_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '친구에게 쓰는 글에 자연스러운 축약형을 고르세요.',
      'Do‘stga yozishda tabiiy qisqartma shaklini tanlang.',
      'Choose the natural contraction for informal writing.',
      'Выберите естественную сокращённую форму для неформального письма.',
    ),
    sentenceTemplate: 'My name ___ Huba.',
    blankAnswers: ["'s"],
    options: ["'s", 'is not', 'are', "'re"],
    answer: "'s",
    answerTranslation: L(
      '제 이름은 Huba예요.',
      'Mening ismim Huba.',
      'My name’s Huba.',
      'Меня зовут Хуба.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['contractions', 'my-name-is'],
  },

  en_s1u2_n4_063_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I’m from Hungary.',
    audioText: 'I’m from Hungary.',
    answerTranslation: L(
      '저는 헝가리 출신이에요.',
      'Men Vengriyadanman.',
      'I’m from Hungary.',
      'Я из Венгрии.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['contractions', 'im'],
  },

  en_s1u2_n4_064_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['from', 'Hungary', 'I’m', 'is', 'teacher'],
    answer: 'I’m from Hungary',
    audioText: 'I’m from Hungary.',
    answerTranslation: L(
      '저는 헝가리 출신이에요.',
      'Men Vengriyadanman.',
      'I’m from Hungary.',
      'Я из Венгрии.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['contractions', 'im'],
  },

  en_s1u2_n4_065_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'He’s from Indonesia.',
    audioText: 'He’s from Indonesia.',
    answerTranslation: L(
      '그는 인도네시아 출신이에요.',
      'U Indoneziyadan.',
      'He’s from Indonesia.',
      'Он из Индонезии.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['contractions', 'hes'],
  },

  en_s1u2_n4_066_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'He is from Indonesia. → ___ from Indonesia.',
    blankAnswers: ["He's"],
    options: ["He's", "He're", "He'sn't", 'He am'],
    answer: "He's",
    answerTranslation: L(
      '그는 인도네시아 출신이에요.',
      'U Indoneziyadan.',
      'He’s from Indonesia.',
      'Он из Индонезии.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['contractions', 'hes'],
  },

  en_s1u2_n4_067_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'We’re here to study.',
    audioText: 'We’re here to study.',
    answerTranslation: L(
      '우리는 공부하러 여기 왔어요.',
      'Biz bu yerga o‘qish uchun keldik.',
      'We’re here to study.',
      'Мы здесь, чтобы учиться.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['contractions', 'were'],
  },

  en_s1u2_n4_068_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'We are here to study. → ___ here to study.',
    blankAnswers: ["We're"],
    options: ["We're", "We's", "We isn't", 'We am'],
    answer: "We're",
    answerTranslation: L(
      '우리는 공부하러 여기 왔어요.',
      'Biz bu yerga o‘qish uchun keldik.',
      'We’re here to study.',
      'Мы здесь, чтобы учиться.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['contractions', 'were'],
  },

  en_s1u2_n4_069_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'He isn’t on business.',
    audioText: 'He isn’t on business.',
    answerTranslation: L(
      '그는 업무로 온 게 아니에요.',
      'U ish bilan kelmagan.',
      'He isn’t on business.',
      'Он здесь не по делам.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['contractions', 'isnt'],
  },

  en_s1u2_n4_070_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'He is not on business. → He ___ on business.',
    blankAnswers: ['isn’t'],
    options: ['isn’t', 'aren’t', "I'm not", 'doesn’t'],
    answer: 'isn’t',
    answerTranslation: L(
      '그는 업무로 온 게 아니에요.',
      'U ish bilan kelmagan.',
      'He isn’t on business.',
      'Он здесь не по делам.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['contractions', 'isnt'],
  },

  en_s1u2_n4_071_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She’s a friend.',
    audioText: 'She’s a friend.',
    answerTranslation: L(
      '그녀는 친구예요.',
      'U do‘st.',
      'She’s a friend.',
      'Она подруга.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['contractions', 'shes'],
  },

  en_s1u2_n4_072_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She is a friend. → ___ a friend.',
    blankAnswers: ["She's"],
    options: ["She's", "She're", "She aren't", 'She am'],
    answer: "She's",
    answerTranslation: L(
      '그녀는 친구예요.',
      'U do‘st.',
      'She’s a friend.',
      'Она подруга.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['contractions', 'shes'],
  },

  en_s1u2_n4_073_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'We aren’t at home.',
    audioText: 'We aren’t at home.',
    answerTranslation: L(
      '우리는 집에 없어요.',
      'Biz uyda emasmiz.',
      'We aren’t at home.',
      'Нас нет дома.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['contractions', 'arent'],
  },

  en_s1u2_n4_074_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'We are not at home. → We ___ at home.',
    blankAnswers: ['aren’t'],
    options: ['aren’t', 'isn’t', 'not are', 'am not'],
    answer: 'aren’t',
    answerTranslation: L(
      '우리는 집에 없어요.',
      'Biz uyda emasmiz.',
      'We aren’t at home.',
      'Нас нет дома.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['contractions', 'arent'],
  },

  en_s1u2_n4_075_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'It’s a company in Berlin.',
    audioText: 'It’s a company in Berlin.',
    answerTranslation: L(
      '그곳은 베를린의 회사예요.',
      'Bu Berlindagi kompaniya.',
      'It’s a company in Berlin.',
      'Это компания в Берлине.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['contractions', 'its'],
  },

  en_s1u2_n4_076_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'It is a company in Berlin. → ___ a company in Berlin.',
    blankAnswers: ['It’s'],
    options: ['It’s', 'It’re', 'Its', 'It am'],
    answer: 'It’s',
    answerTranslation: L(
      '그곳은 베를린의 회사예요.',
      'Bu Berlindagi kompaniya.',
      'It’s a company in Berlin.',
      'Это компания в Берлине.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['contractions', 'its'],
  },

  en_s1u2_n4_077_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'My name’s Liana. I’m twenty-three and I’m from Italy.',
    audioText: 'My name’s Liana. I’m twenty-three and I’m from Italy.',
    answerTranslation: L(
      '제 이름은 Liana예요. 저는 23살이고 이탈리아 출신이에요.',
      'Mening ismim Liana. Men yigirma uch yoshdaman va Italiyadanman.',
      'My name’s Liana. I’m twenty-three and I’m from Italy.',
      'Меня зовут Лиана. Мне двадцать три, и я из Италии.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['blog', 'liana', 'profile'],
  },

  en_s1u2_n4_078_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'I’m a nurse in a hospital.',
    audioText: 'I’m a nurse in a hospital.',
    answerI18n: L(
      '저는 병원 간호사예요',
      'Men kasalxonada hamshiraman',
      'I am a nurse in a hospital',
      'Я медсестра в больнице',
    ),
    options: ['I’m', 'a', 'nurse', 'in', 'hospital', 'teacher', 'shop'],
    optionsI18n: {
      ko: ['저는', '병원', '간호사예요', '선생님이에요', '가게'],
      uz: ['Men', 'kasalxonada', 'hamshiraman', 'o‘qituvchiman', 'do‘kon'],
      en: ['I', 'am', 'a', 'nurse', 'in', 'hospital', 'teacher'],
      ru: ['Я', 'медсестра', 'в', 'больнице', 'учитель', 'магазине'],
    },
    answerTranslation: L(
      '저는 병원 간호사예요.',
      'Men kasalxonada hamshiraman.',
      'I’m a nurse in a hospital.',
      'Я медсестра в больнице.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['blog', 'liana', 'job'],
  },

  en_s1u2_n4_079_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'Matteo’s',
      'my',
      'friend',
      'and',
      'he’s',
      'a',
      'nice',
      'guy',
      'nurse',
    ],
    answer: 'Matteo’s my friend and he’s a nice guy',
    answerTranslation: L(
      'Matteo는 제 친구이고 정말 좋은 사람이에요.',
      'Matteo mening do‘stim va u juda yaxshi yigit.',
      'Matteo’s my friend and he’s a nice guy.',
      'Маттео — мой друг, и он очень хороший парень.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['blog', 'liana', 'matteo'],
  },

  en_s1u2_n4_080_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'user',
        text: 'My name’s Liana. I’m from Italy. I’m a nurse in a hospital.',
      },
      {
        speaker: 'npc',
        text: 'Who’s Matteo?',
      },
    ],
    options: [
      'He’s my friend. He’s a shop assistant.',
      'She’s my nurse. She’s Italy.',
      'They’re a hospital.',
      'It’s twenty-three.',
    ],
    answer: 'He’s my friend. He’s a shop assistant.',
    answerTranslation: L(
      '그는 제 친구예요. 매장 직원이에요.',
      'U mening do‘stim. U do‘kon sotuvchisi.',
      'He’s my friend. He’s a shop assistant.',
      'Он мой друг. Он продавец-консультант.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['blog', 'profile', 'unit2'],
  },
};

// ─────────────────────────────────────────────────────────────
// Node 4
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT2_NODE4 = {
  title: L('몇 시예요?', 'Soat necha?', 'What time is it?', 'Который час?'),
  section: 1,
  unit: 2,
  order: 4,
  isActive: true,

  lessons: [
    {
      title: L(
        '시간 말하기',
        'Vaqtni aytish',
        'Telling the time',
        'Как сказать время',
      ),
      description: L(
        '시계를 보고 현재 시간을 영어로 듣고 말하며 o’clock과 oh를 익혀요.',
        'Soatga qarab vaqtni inglizcha tinglab aytasiz va o’clock hamda oh shakllarini o‘rganasiz.',
        'Tell the current time and use o’clock and oh correctly.',
        'Учимся говорить текущее время и использовать o’clock и oh.',
      ),
      category: LessonCategory.LISTENING,
      level: LV,
      order: 1,
      questions: [
        'en_s1u2_n4_001_speaking',
        'en_s1u2_n4_002_fill_in_blank',
        'en_s1u2_n4_003_speaking',
        'en_s1u2_n4_004_reply_builder',
        'en_s1u2_n4_005_speaking',
        'en_s1u2_n4_006_word_arrange',
        'en_s1u2_n4_007_speaking',
        'en_s1u2_n4_008_fill_in_blank',
        'en_s1u2_n4_009_speaking',
        'en_s1u2_n4_010_fill_in_blank',
        'en_s1u2_n4_011_audio_match',
        'en_s1u2_n4_012_speaking',
        'en_s1u2_n4_013_fill_in_blank',
        'en_s1u2_n4_014_speaking',
        'en_s1u2_n4_015_translate_builder',
        'en_s1u2_n4_016_speaking',
        'en_s1u2_n4_017_fill_in_blank',
        'en_s1u2_n4_018_sentence_builder',
        'en_s1u2_n4_019_speaking',
        'en_s1u2_n4_020_dialog_complete',
      ],
    },

    {
      title: L(
        '몇 시에 시작해요?',
        'Soat nechada boshlanadi?',
        'What time does it start?',
        'Во сколько начинается?',
      ),
      description: L(
        '영화, 회의, 버스, 기차, 수업의 시간을 묻고 한 시각은 at, 시간 범위는 from ... to ...로 말해요.',
        'Film, yig‘ilish, avtobus, poyezd va dars vaqtini so‘rab, bitta vaqt bilan at, vaqt oralig‘i bilan from ... to ... ishlatasiz.',
        'Ask about event times and use at for one time and from ... to ... for a time range.',
        'Спрашиваем время событий и используем at для одного времени и from ... to ... для диапазона.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 2,
      questions: [
        'en_s1u2_n4_021_speaking',
        'en_s1u2_n4_022_reply_builder',
        'en_s1u2_n4_023_speaking',
        'en_s1u2_n4_024_fill_in_blank',
        'en_s1u2_n4_025_speaking',
        'en_s1u2_n4_026_translate_builder',
        'en_s1u2_n4_027_speaking',
        'en_s1u2_n4_028_fill_in_blank',
        'en_s1u2_n4_029_speaking',
        'en_s1u2_n4_030_dialog_complete',
        'en_s1u2_n4_031_speaking',
        'en_s1u2_n4_032_word_arrange',
        'en_s1u2_n4_033_speaking',
        'en_s1u2_n4_034_reply_builder',
        'en_s1u2_n4_035_speaking',
        'en_s1u2_n4_036_fill_in_blank',
        'en_s1u2_n4_037_speaking',
        'en_s1u2_n4_038_sentence_builder',
        'en_s1u2_n4_039_audio_match',
        'en_s1u2_n4_040_dialog_complete',
      ],
    },

    {
      title: L(
        '블로그 프로필 읽기',
        'Blog profilini o‘qish',
        'Reading a blog',
        'Читаем блог',
      ),
      description: L(
        'Adriana와 Gio의 소개 글에서 나라, 나이, 직업, 친구와 장소 정보를 이해해요.',
        'Adriana va Gioning profilidan mamlakat, yosh, kasb, do‘st va joy ma’lumotlarini tushunasiz.',
        'Read Adriana and Gio’s profiles and understand country, age, job, friends and places.',
        'Читаем профили Адрианы и Джио и понимаем информацию о стране, возрасте, работе, друзьях и местах.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 3,
      questions: [
        'en_s1u2_n4_041_speaking',
        'en_s1u2_n4_042_fill_in_blank',
        'en_s1u2_n4_043_speaking',
        'en_s1u2_n4_044_fill_in_blank',
        'en_s1u2_n4_045_speaking',
        'en_s1u2_n4_046_reply_builder',
        'en_s1u2_n4_047_speaking',
        'en_s1u2_n4_048_fill_in_blank',
        'en_s1u2_n4_049_speaking',
        'en_s1u2_n4_050_dialog_complete',
        'en_s1u2_n4_051_speaking',
        'en_s1u2_n4_052_speaking',
        'en_s1u2_n4_053_fill_in_blank',
        'en_s1u2_n4_054_speaking',
        'en_s1u2_n4_055_fill_in_blank',
        'en_s1u2_n4_056_speaking',
        'en_s1u2_n4_057_fill_in_blank',
        'en_s1u2_n4_058_translate_builder',
        'en_s1u2_n4_059_speaking',
        'en_s1u2_n4_060_sentence_builder',
      ],
    },

    {
      title: L(
        '내 블로그 만들기',
        'Mening blogim',
        'Writing a blog',
        'Пишем блог',
      ),
      description: L(
        '친구에게 쓰는 자연스러운 영어에서 축약형을 사용하고 이름, 나라, 나이, 직업, 친구 정보를 연결해 자기소개를 만들어요.',
        'Do‘stlarga yoziladigan tabiiy ingliz tilida qisqartmalarni ishlatib, ism, mamlakat, yosh, kasb va do‘st haqidagi ma’lumotlarni bog‘laysiz.',
        'Use contractions in informal writing and build a simple profile about yourself and a friend.',
        'Используем сокращения в неформальном письме и составляем простой профиль о себе и друге.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 4,
      questions: [
        'en_s1u2_n4_061_speaking',
        'en_s1u2_n4_062_fill_in_blank',
        'en_s1u2_n4_063_speaking',
        'en_s1u2_n4_064_word_arrange',
        'en_s1u2_n4_065_speaking',
        'en_s1u2_n4_066_fill_in_blank',
        'en_s1u2_n4_067_speaking',
        'en_s1u2_n4_068_fill_in_blank',
        'en_s1u2_n4_069_speaking',
        'en_s1u2_n4_070_fill_in_blank',
        'en_s1u2_n4_071_speaking',
        'en_s1u2_n4_072_fill_in_blank',
        'en_s1u2_n4_073_speaking',
        'en_s1u2_n4_074_fill_in_blank',
        'en_s1u2_n4_075_speaking',
        'en_s1u2_n4_076_fill_in_blank',
        'en_s1u2_n4_077_speaking',
        'en_s1u2_n4_078_sentence_builder',
        'en_s1u2_n4_079_translate_builder',
        'en_s1u2_n4_080_dialog_complete',
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Section 1 · Unit 2 · Node 5
// 2.5 Witney Antiques + Unit 1–2 Review
//
// Coverage
// - antique / antiques dealer
// - table / chair / bookcase / clock
// - old / beautiful / expensive / favourite / special
// - grandmother
// - for sale
// - auction / sell / bid / city hall
// - What is it?
// - How old is it?
// - Where is it from?
// - Is it nice / expensive / beautiful?
// - Why is it special?
//
// Cumulative review:
// - a / an
// - singular / plural
// - this / that / these / those
// - it / they
// - jobs
// - be: am / is / are / isn't / aren't
// - subject pronouns
// - question words
// - countries / spelling
// - in / on / near / next to
// - numbers
// - telling the time
//
// 4 lessons × 20 questions = 80
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT2_NODE5_WORDS = [
  {
    code: 'en-antique-antique',
    english: 'antique',
    senseKey: 'old-valuable-object',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '골동품',
      'antiqa buyum',
      'an old object that is valuable or interesting',
      'антикварная вещь',
    ),
    examples: [
      {
        english: 'This clock is an antique.',
        translations: L(
          '이 시계는 골동품이에요.',
          'Bu soat antiqa buyum.',
          'This clock is an antique.',
          'Эти часы — антиквариат.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ænˈtiːk/',
      ttsText: 'antique',
    },
    media: {
      emoji: '🏺',
      imageUrl: '',
      imageAlt: L(
        '오래된 골동품',
        'eski antiqa buyum',
        'an antique object',
        'антикварная вещь',
      ),
    },
    tags: ['antiques', 'objects'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-job-antiques-dealer',
    english: 'antiques dealer',
    senseKey: 'person-selling-antiques',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '골동품 판매상',
      'antiqa buyumlar sotuvchisi',
      'a person who buys and sells antiques',
      'антиквар',
    ),
    examples: [
      {
        english: 'He’s an antiques dealer.',
        translations: L(
          '그는 골동품 판매상이에요.',
          'U antiqa buyumlar sotuvchisi.',
          'He’s an antiques dealer.',
          'Он антиквар.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ænˈtiːks ˌdiːlə/',
      ttsText: 'antiques dealer',
    },
    media: {
      emoji: '🧑‍💼',
      imageUrl: '',
      imageAlt: L(
        '골동품을 판매하는 사람',
        'antiqa buyum sotayotgan odam',
        'an antiques dealer',
        'продавец антиквариата',
      ),
    },
    tags: ['antiques', 'jobs'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-object-table',
    english: 'table',
    senseKey: 'furniture-table',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '탁자; 테이블',
      'stol',
      'a piece of furniture with a flat top',
      'стол',
    ),
    examples: [
      {
        english: 'It’s an old table.',
        translations: L(
          '오래된 테이블이에요.',
          'Bu eski stol.',
          'It’s an old table.',
          'Это старый стол.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈteɪbl/',
      ttsText: 'table',
    },
    media: {
      emoji: '🪑',
      imageUrl: '',
      imageAlt: L('테이블', 'stol', 'a table', 'стол'),
    },
    tags: ['objects', 'furniture'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-object-chair',
    english: 'chair',
    senseKey: 'furniture-chair',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('의자', 'stul', 'a seat for one person', 'стул'),
    examples: [
      {
        english: 'These are old chairs.',
        translations: L(
          '이것들은 오래된 의자예요.',
          'Bular eski stullar.',
          'These are old chairs.',
          'Это старые стулья.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/tʃeə/',
      ttsText: 'chair',
    },
    media: {
      emoji: '🪑',
      imageUrl: '',
      imageAlt: L('의자', 'stul', 'a chair', 'стул'),
    },
    tags: ['objects', 'furniture'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-object-bookcase',
    english: 'bookcase',
    senseKey: 'furniture-for-books',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '책장',
      'kitob javoni',
      'a piece of furniture for books',
      'книжный шкаф',
    ),
    examples: [
      {
        english: 'The books are in a bookcase.',
        translations: L(
          '책들이 책장 안에 있어요.',
          'Kitoblar kitob javonida.',
          'The books are in a bookcase.',
          'Книги находятся в книжном шкафу.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈbʊkkeɪs/',
      ttsText: 'bookcase',
    },
    media: {
      emoji: '📚',
      imageUrl: '',
      imageAlt: L(
        '책이 있는 책장',
        'kitobli javon',
        'a bookcase',
        'книжный шкаф',
      ),
    },
    tags: ['objects', 'furniture'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-object-clock',
    english: 'clock',
    senseKey: 'time-device',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('시계', 'soat', 'a device that shows the time', 'часы'),
    examples: [
      {
        english: 'The clock says eleven o’clock.',
        translations: L(
          '시계가 11시를 가리켜요.',
          'Soat o‘n birni ko‘rsatmoqda.',
          'The clock says eleven o’clock.',
          'Часы показывают одиннадцать.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/klɒk/',
      ttsText: 'clock',
    },
    media: {
      emoji: '🕰️',
      imageUrl: '',
      imageAlt: L('오래된 시계', 'eski soat', 'an old clock', 'старые часы'),
    },
    tags: ['objects', 'time'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-old',
    english: 'old',
    senseKey: 'not-new',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '오래된; 나이가 많은',
      'eski; qari',
      'having existed for a long time',
      'старый',
    ),
    examples: [
      {
        english: 'The table is very old.',
        translations: L(
          '그 테이블은 아주 오래됐어요.',
          'Stol juda eski.',
          'The table is very old.',
          'Стол очень старый.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/əʊld/',
      ttsText: 'old',
    },
    media: {
      emoji: '🕰️',
      imageUrl: '',
      imageAlt: L(
        '오래된 물건',
        'eski buyum',
        'an old object',
        'старый предмет',
      ),
    },
    tags: ['adjectives', 'antiques'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-beautiful',
    english: 'beautiful',
    senseKey: 'very-attractive',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '아름다운',
      'chiroyli',
      'very attractive or pleasing to look at',
      'красивый',
    ),
    examples: [
      {
        english: 'It’s a beautiful clock.',
        translations: L(
          '아름다운 시계예요.',
          'Bu chiroyli soat.',
          'It’s a beautiful clock.',
          'Это красивые часы.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈbjuːtɪfl/',
      ttsText: 'beautiful',
    },
    media: {
      emoji: '✨',
      imageUrl: '',
      imageAlt: L(
        '아름다운 골동품',
        'chiroyli antiqa buyum',
        'a beautiful antique',
        'красивый антиквариат',
      ),
    },
    tags: ['adjectives', 'description'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-expensive',
    english: 'expensive',
    senseKey: 'costs-a-lot',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('비싼', 'qimmat', 'costing a lot of money', 'дорогой'),
    examples: [
      {
        english: 'Is the chair expensive?',
        translations: L(
          '그 의자는 비싸요?',
          'Stul qimmatmi?',
          'Is the chair expensive?',
          'Этот стул дорогой?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɪkˈspensɪv/',
      ttsText: 'expensive',
    },
    media: {
      emoji: '💰',
      imageUrl: '',
      imageAlt: L(
        '비싼 물건',
        'qimmat buyum',
        'an expensive object',
        'дорогой предмет',
      ),
    },
    tags: ['adjectives', 'description'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-favourite',
    english: 'favourite',
    senseKey: 'liked-most',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '가장 좋아하는',
      'eng sevimli',
      'liked more than others',
      'любимый',
    ),
    examples: [
      {
        english: 'This is my favourite clock.',
        translations: L(
          '이건 제가 가장 좋아하는 시계예요.',
          'Bu mening eng sevimli soatim.',
          'This is my favourite clock.',
          'Это мои любимые часы.',
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
        '가장 좋아하는 물건',
        'eng sevimli buyum',
        'a favourite object',
        'любимый предмет',
      ),
    },
    tags: ['adjectives', 'description'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-special',
    english: 'special',
    senseKey: 'important-unusual',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '특별한',
      'alohida; maxsus',
      'important or different in a good way',
      'особенный',
    ),
    examples: [
      {
        english: 'Why is it special?',
        translations: L(
          '왜 특별해요?',
          'Nega u alohida?',
          'Why is it special?',
          'Почему он особенный?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈspeʃl/',
      ttsText: 'special',
    },
    media: {
      emoji: '⭐',
      imageUrl: '',
      imageAlt: L(
        '특별한 물건',
        'alohida buyum',
        'a special object',
        'особенный предмет',
      ),
    },
    tags: ['adjectives', 'description'],
    difficulty: 1,
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
      'the mother of a person’s mother or father',
      'бабушка',
    ),
    examples: [
      {
        english: 'It was my grandmother’s clock.',
        translations: L(
          '그건 제 할머니의 시계였어요.',
          'Bu buvimning soati edi.',
          'It was my grandmother’s clock.',
          'Это были часы моей бабушки.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈɡrænmʌðə/',
      ttsText: 'grandmother',
    },
    media: {
      emoji: '👵',
      imageUrl: '',
      imageAlt: L('할머니', 'buvi', 'a grandmother', 'бабушка'),
    },
    tags: ['family', 'antiques'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-commerce-for-sale',
    english: 'for sale',
    senseKey: 'available-to-buy',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '판매 중인',
      'sotuvda',
      'available for someone to buy',
      'продаётся',
    ),
    examples: [
      {
        english: 'The table is for sale.',
        translations: L(
          '그 테이블은 판매 중이에요.',
          'Stol sotuvda.',
          'The table is for sale.',
          'Стол продаётся.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/fə ˈseɪl/',
      ttsText: 'for sale',
    },
    media: {
      emoji: '🏷️',
      imageUrl: '',
      imageAlt: L(
        '판매 표지가 붙은 물건',
        'sotuv belgisi bor buyum',
        'an object marked for sale',
        'предмет с табличкой о продаже',
      ),
    },
    tags: ['shopping', 'antiques'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-event-auction',
    english: 'auction',
    senseKey: 'public-bidding-sale',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '경매',
      'auksion',
      'a public sale where people offer prices',
      'аукцион',
    ),
    examples: [
      {
        english: 'The auction is at the city hall.',
        translations: L(
          '경매는 시청에서 열려요.',
          'Auksion shahar hokimiyatida.',
          'The auction is at the city hall.',
          'Аукцион проходит в мэрии.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈɔːkʃn/',
      ttsText: 'auction',
    },
    media: {
      emoji: '🔨',
      imageUrl: '',
      imageAlt: L('경매', 'auksion', 'an auction', 'аукцион'),
    },
    tags: ['shopping', 'antiques'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-place-city-hall',
    english: 'city hall',
    senseKey: 'city-government-building',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '시청',
      'shahar hokimiyati binosi',
      'a building used by a city government',
      'мэрия',
    ),
    examples: [
      {
        english: 'The auction is at the city hall.',
        translations: L(
          '경매는 시청에서 열려요.',
          'Auksion shahar hokimiyatida.',
          'The auction is at the city hall.',
          'Аукцион проходит в мэрии.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌsɪti ˈhɔːl/',
      ttsText: 'city hall',
    },
    media: {
      emoji: '🏛️',
      imageUrl: '',
      imageAlt: L('시청', 'shahar hokimiyati', 'a city hall', 'мэрия'),
    },
    tags: ['places', 'auction'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-commerce-sell',
    english: 'sell',
    senseKey: 'exchange-for-money',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '팔다',
      'sotmoq',
      'to give something to someone for money',
      'продавать',
    ),
    examples: [
      {
        english: 'I want to sell this clock.',
        translations: L(
          '이 시계를 팔고 싶어요.',
          'Men bu soatni sotmoqchiman.',
          'I want to sell this clock.',
          'Я хочу продать эти часы.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/sel/',
      ttsText: 'sell',
    },
    media: {
      emoji: '💵',
      imageUrl: '',
      imageAlt: L(
        '물건을 판매하는 사람',
        'buyum sotayotgan odam',
        'a person selling an object',
        'человек, продающий предмет',
      ),
    },
    tags: ['shopping', 'auction'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-commerce-bid',
    english: 'bid',
    senseKey: 'offer-price-auction',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '경매에서 가격을 부르다',
      'auksionda narx taklif qilmoq',
      'to offer a price at an auction',
      'делать ставку на аукционе',
    ),
    examples: [
      {
        english: 'I want to bid for the chair.',
        translations: L(
          '그 의자에 입찰하고 싶어요.',
          'Men stul uchun narx taklif qilmoqchiman.',
          'I want to bid for the chair.',
          'Я хочу сделать ставку на стул.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/bɪd/',
      ttsText: 'bid',
    },
    media: {
      emoji: '🙋',
      imageUrl: '',
      imageAlt: L(
        '경매에서 입찰하는 사람',
        'auksionda narx taklif qilayotgan odam',
        'a person bidding at an auction',
        'человек, делающий ставку',
      ),
    },
    tags: ['shopping', 'auction'],
    difficulty: 1,
    isCore: true,
  },
];

export const EN_S1_UNIT2_NODE5_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Witney Antiques
  // ===========================================================

  en_s1u2_n5_001_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Antique.',
    audioText: 'Antique.',
    answerTranslation: L(
      '골동품.',
      'Antiqa buyum.',
      'Antique.',
      'Антикварная вещь.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['antiques'],
  },

  en_s1u2_n5_002_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Antiques dealer.',
    audioText: 'Antiques dealer.',
    answerTranslation: L(
      '골동품 판매상.',
      'Antiqa buyumlar sotuvchisi.',
      'Antiques dealer.',
      'Антиквар.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['antiques', 'job'],
  },

  en_s1u2_n5_003_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      { korean: 'table', native: 'stol' },
      { korean: 'chair', native: 'stul' },
      { korean: 'bookcase', native: 'kitob javoni' },
      { korean: 'clock', native: 'soat' },
      { korean: 'antique', native: 'antiqa buyum' },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['antiques', 'objects'],
  },

  en_s1u2_n5_004_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Table.',
    audioText: 'Table.',
    answerTranslation: L('테이블.', 'Stol.', 'Table.', 'Стол.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['objects', 'table'],
  },

  en_s1u2_n5_005_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'three ___',
    blankAnswers: ['books'],
    options: ['book', 'books', 'bookcase', 'clock'],
    answer: 'books',
    answerTranslation: L('책 세 권', 'uchta kitob', 'three books', 'три книги'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['objects', 'plural'],
  },

  en_s1u2_n5_006_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Four clocks.',
    audioText: 'Four clocks.',
    answerTranslation: L(
      '시계 네 개.',
      'To‘rtta soat.',
      'Four clocks.',
      'Четыре часов.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['objects', 'clock', 'numbers'],
  },

  en_s1u2_n5_007_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'six ___',
    blankAnswers: ['tables'],
    options: ['table', 'tables', 'chairs', 'clocks'],
    answer: 'tables',
    answerTranslation: L(
      '테이블 여섯 개',
      'oltita stol',
      'six tables',
      'шесть столов',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['objects', 'plural'],
  },

  en_s1u2_n5_008_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Ten chairs.',
    audioText: 'Ten chairs.',
    answerTranslation: L(
      '의자 열 개.',
      'O‘nta stul.',
      'Ten chairs.',
      'Десять стульев.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['objects', 'chairs', 'numbers'],
  },

  en_s1u2_n5_009_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      { korean: 'old', native: 'eski' },
      { korean: 'beautiful', native: 'chiroyli' },
      { korean: 'expensive', native: 'qimmat' },
      { korean: 'favourite', native: 'eng sevimli' },
      { korean: 'special', native: 'alohida' },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['adjectives', 'listening'],
  },

  en_s1u2_n5_010_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Old.',
    audioText: 'Old.',
    answerTranslation: L('오래된.', 'Eski.', 'Old.', 'Старый.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['adjectives', 'old'],
  },

  en_s1u2_n5_011_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'It’s a ___ clock.',
    blankAnswers: ['beautiful'],
    options: ['beautiful', 'doctor', 'country', 'meeting'],
    answer: 'beautiful',
    answerTranslation: L(
      '아름다운 시계예요.',
      'Bu chiroyli soat.',
      'It’s a beautiful clock.',
      'Это красивые часы.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['adjectives', 'beautiful'],
  },

  en_s1u2_n5_012_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Expensive.',
    audioText: 'Expensive.',
    answerTranslation: L('비싼.', 'Qimmat.', 'Expensive.', 'Дорогой.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['adjectives', 'expensive'],
  },

  en_s1u2_n5_013_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Is the clock expensive?',
    options: ['Yes', 'it', 'is', 'No', 'they', 'aren’t', 'clock'],
    answer: 'Yes it is',
    answerTranslation: L('네, 비싸요.', 'Ha, qimmat.', 'Yes, it is.', 'Да.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['adjectives', 'reply-builder'],
  },

  en_s1u2_n5_014_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'This is my favourite clock.',
    audioText: 'This is my favourite clock.',
    answerTranslation: L(
      '이건 제가 가장 좋아하는 시계예요.',
      'Bu mening eng sevimli soatim.',
      'This is my favourite clock.',
      'Это мои любимые часы.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['favourite', 'clock'],
  },

  en_s1u2_n5_015_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['This', 'is', 'my', 'favourite', 'chair', 'clock', 'old'],
    answer: 'This is my favourite chair',
    answerTranslation: L(
      '이건 제가 가장 좋아하는 의자예요.',
      'Bu mening eng sevimli stulim.',
      'This is my favourite chair.',
      'Это мой любимый стул.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['favourite', 'builder'],
  },

  en_s1u2_n5_016_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Grandmother.',
    audioText: 'Grandmother.',
    answerTranslation: L('할머니.', 'Buvi.', 'Grandmother.', 'Бабушка.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['family', 'grandmother'],
  },

  en_s1u2_n5_017_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'It’s my ___ clock.',
    blankAnswers: ['grandmother’s'],
    options: ['grandmother’s', 'grandmother', 'grandmothers', 'dealer'],
    answer: 'grandmother’s',
    answerTranslation: L(
      '제 할머니의 시계예요.',
      'Bu buvimning soati.',
      'It’s my grandmother’s clock.',
      'Это часы моей бабушки.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['grandmother', 'possession'],
  },

  en_s1u2_n5_018_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'It’s special.',
    audioText: 'It’s special.',
    answerTranslation: L(
      '특별해요.',
      'U alohida.',
      'It’s special.',
      'Он особенный.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['special'],
  },

  en_s1u2_n5_019_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['is', 'Why', 'special', 'it', 'old', 'beautiful'],
    answer: 'Why is it special',
    audioText: 'Why is it special?',
    answerTranslation: L(
      '왜 특별해요?',
      'Nega u alohida?',
      'Why is it special?',
      'Почему он особенный?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['special', 'question'],
  },

  en_s1u2_n5_020_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Why is it special?',
    audioText: 'Why is it special?',
    answerTranslation: L(
      '왜 특별해요?',
      'Nega u alohida?',
      'Why is it special?',
      'Почему он особенный?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['special', 'question'],
  },

  // ===========================================================
  // Lesson 2 · At the auction
  // ===========================================================

  en_s1u2_n5_021_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Auction.',
    audioText: 'Auction.',
    answerTranslation: L('경매.', 'Auksion.', 'Auction.', 'Аукцион.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['auction'],
  },

  en_s1u2_n5_022_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      { korean: 'auction', native: 'auksion' },
      { korean: 'sell', native: 'sotmoq' },
      { korean: 'bid', native: 'narx taklif qilmoq' },
      { korean: 'for sale', native: 'sotuvda' },
      { korean: 'city hall', native: 'shahar hokimiyati' },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['auction', 'matching'],
  },

  en_s1u2_n5_023_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The auction is at the city hall.',
    audioText: 'The auction is at the city hall.',
    answerTranslation: L(
      '경매는 시청에서 열려요.',
      'Auksion shahar hokimiyatida.',
      'The auction is at the city hall.',
      'Аукцион проходит в мэрии.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['auction', 'city-hall'],
  },

  en_s1u2_n5_024_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The clock is ___ sale.',
    blankAnswers: ['for'],
    options: ['for', 'from', 'at', 'on'],
    answer: 'for',
    answerTranslation: L(
      '그 시계는 판매 중이에요.',
      'Soat sotuvda.',
      'The clock is for sale.',
      'Часы продаются.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['for-sale'],
  },

  en_s1u2_n5_025_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'It’s for sale.',
    audioText: 'It’s for sale.',
    answerTranslation: L(
      '판매 중이에요.',
      'U sotuvda.',
      'It’s for sale.',
      'Это продаётся.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['for-sale'],
  },

  en_s1u2_n5_026_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['I', 'want', 'to', 'sell', 'this', 'table', 'buy', 'clock'],
    answer: 'I want to sell this table',
    answerTranslation: L(
      '이 테이블을 팔고 싶어요.',
      'Men bu stolni sotmoqchiman.',
      'I want to sell this table.',
      'Я хочу продать этот стол.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['sell', 'auction'],
  },

  en_s1u2_n5_027_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I want to sell this table.',
    audioText: 'I want to sell this table.',
    answerTranslation: L(
      '이 테이블을 팔고 싶어요.',
      'Men bu stolni sotmoqchiman.',
      'I want to sell this table.',
      'Я хочу продать этот стол.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['sell', 'auction'],
  },

  en_s1u2_n5_028_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'What is it?',
    audioText: 'What is it?',
    answerTranslation: L('그게 뭐예요?', 'Bu nima?', 'What is it?', 'Что это?'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['auction', 'question'],
  },

  en_s1u2_n5_029_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What is it?',
    options: ['It’s', 'an', 'old', 'clock', 'They’re', 'chairs'],
    answer: 'It’s an old clock',
    answerTranslation: L(
      '오래된 시계예요.',
      'Bu eski soat.',
      'It’s an old clock.',
      'Это старые часы.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['auction', 'description', 'reply-builder'],
  },

  en_s1u2_n5_030_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'How old is it?',
    audioText: 'How old is it?',
    answerTranslation: L(
      '얼마나 오래됐어요?',
      'U necha yoshda?',
      'How old is it?',
      'Сколько ему лет?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['auction', 'age'],
  },

  en_s1u2_n5_031_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'How old is the table?' }],
    options: [
      'It’s about a hundred years old.',
      'It’s from France old.',
      'It’s a table years.',
      'They’re a hundred.',
    ],
    answer: 'It’s about a hundred years old.',
    answerTranslation: L(
      '약 100년 됐어요.',
      'U taxminan yuz yillik.',
      'It’s about a hundred years old.',
      'Ему около ста лет.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['auction', 'age'],
  },

  en_s1u2_n5_032_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Where is it from?',
    audioText: 'Where is it from?',
    answerTranslation: L(
      '어디에서 온 거예요?',
      'U qayerdan?',
      'Where is it from?',
      'Откуда он?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['auction', 'origin'],
  },

  en_s1u2_n5_033_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['from', 'is', 'France', 'It', 'beautiful', 'chair'],
    answer: 'It is from France',
    audioText: 'It is from France.',
    answerTranslation: L(
      '프랑스에서 온 거예요.',
      'U Fransiyadan.',
      'It is from France.',
      'Он из Франции.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['auction', 'origin'],
  },

  en_s1u2_n5_034_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Is it beautiful?',
    audioText: 'Is it beautiful?',
    answerTranslation: L(
      '아름다워요?',
      'U chiroylimi?',
      'Is it beautiful?',
      'Он красивый?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['auction', 'beautiful'],
  },

  en_s1u2_n5_035_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Is it ___?',
    blankAnswers: ['expensive'],
    options: ['expensive', 'teacher', 'France', 'twenty'],
    answer: 'expensive',
    answerTranslation: L(
      '비싸요?',
      'U qimmatmi?',
      'Is it expensive?',
      'Он дорогой?',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['auction', 'expensive'],
  },

  en_s1u2_n5_036_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Why is it special?',
    audioText: 'Why is it special?',
    answerTranslation: L(
      '왜 특별해요?',
      'Nega u alohida?',
      'Why is it special?',
      'Почему он особенный?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['auction', 'special'],
  },

  en_s1u2_n5_037_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Why is it special?',
    options: [
      'It',
      'was',
      'my',
      'grandmother’s',
      'clock',
      'France',
      'expensive',
    ],
    answer: 'It was my grandmother’s clock',
    answerTranslation: L(
      '제 할머니의 시계였어요.',
      'Bu buvimning soati edi.',
      'It was my grandmother’s clock.',
      'Это были часы моей бабушки.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['auction', 'special', 'grandmother'],
  },

  en_s1u2_n5_038_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I want to bid for the chair.',
    audioText: 'I want to bid for the chair.',
    answerTranslation: L(
      '그 의자에 입찰하고 싶어요.',
      'Men stul uchun narx taklif qilmoqchiman.',
      'I want to bid for the chair.',
      'Я хочу сделать ставку на стул.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['auction', 'bid'],
  },

  en_s1u2_n5_039_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'It’s old, beautiful and special.',
    audioText: 'It’s old, beautiful and special.',
    answerI18n: L(
      '오래됐고 아름답고 특별해요',
      'U eski chiroyli va alohida',
      'It is old beautiful and special',
      'Он старый красивый и особенный',
    ),
    options: ['It’s', 'old', 'beautiful', 'and', 'special', 'doctor', 'from'],
    optionsI18n: {
      ko: ['오래됐고', '아름답고', '특별해요', '비싸고', '의사'],
      uz: ['U', 'eski', 'chiroyli', 'va', 'alohida', 'qimmat'],
      en: ['It', 'is', 'old', 'beautiful', 'and', 'special', 'expensive'],
      ru: ['Он', 'старый', 'красивый', 'и', 'особенный', 'дорогой'],
    },
    answerTranslation: L(
      '오래됐고 아름답고 특별해요.',
      'U eski, chiroyli va alohida.',
      'It’s old, beautiful and special.',
      'Он старый, красивый и особенный.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['auction', 'description'],
  },

  en_s1u2_n5_040_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'What is it?' },
      { speaker: 'user', text: 'It’s an old chair.' },
      { speaker: 'npc', text: 'Why is it special?' },
    ],
    options: [
      'It was my grandmother’s.',
      'It is from eleven o’clock.',
      'They’re a teacher.',
      'It’s on business.',
    ],
    answer: 'It was my grandmother’s.',
    answerTranslation: L(
      '제 할머니 것이었어요.',
      'U buvimniki edi.',
      'It was my grandmother’s.',
      'Он принадлежал моей бабушке.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['auction', 'presentation'],
  },

  // ===========================================================
  // Lesson 3 · Unit 2 grammar review
  // ===========================================================

  en_s1u2_n5_041_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'What’s this in English?',
    audioText: 'What’s this in English?',
    answerTranslation: L(
      '이것은 영어로 뭐예요?',
      'Bu ingliz tilida nima?',
      'What’s this in English?',
      'Как это по-английски?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'objects'],
  },

  en_s1u2_n5_042_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What’s this in English?' }],
    options: [
      'It’s a notepad.',
      'They’re pens.',
      'It’s an pens.',
      'These a notepad.',
    ],
    answer: 'It’s a notepad.',
    answerTranslation: L(
      '메모장이에요.',
      'Bu bloknot.',
      'It’s a notepad.',
      'Это блокнот.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'this', 'a'],
  },

  en_s1u2_n5_043_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'What are those?',
    audioText: 'What are those?',
    answerTranslation: L(
      '저것들은 뭐예요?',
      'Anavilar nima?',
      'What are those?',
      'Что это там?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'those'],
  },

  en_s1u2_n5_044_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What are those?',
    options: ['They’re', 'pens', 'It’s', 'a', 'pen', 'this'],
    answer: 'They’re pens',
    answerTranslation: L(
      '펜들이에요.',
      'Ular ruchkalar.',
      'They’re pens.',
      'Это ручки.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'those', 'they'],
  },

  en_s1u2_n5_045_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A laptop, two ___.',
    blankAnswers: ['books'],
    options: ['book', 'books', 'bookes', 'a books'],
    answer: 'books',
    answerTranslation: L(
      '노트북 한 대, 책 두 권.',
      'Bitta noutbuk, ikkita kitob.',
      'A laptop, two books.',
      'Ноутбук и две книги.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'plural'],
  },

  en_s1u2_n5_046_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ umbrella',
    blankAnswers: ['an'],
    options: ['a', 'an', 'are', 'is'],
    answer: 'an',
    answerTranslation: L('우산 하나', 'bitta soyabon', 'an umbrella', 'зонт'),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'article'],
  },

  en_s1u2_n5_047_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'He’s an engineer.',
    audioText: 'He’s an engineer.',
    answerTranslation: L(
      '그는 엔지니어예요.',
      'U muhandis.',
      'He’s an engineer.',
      'Он инженер.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'job', 'he'],
  },

  en_s1u2_n5_048_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Is he ___ engineer?',
    blankAnswers: ['an'],
    options: ['an', 'a', 'are', 'the'],
    answer: 'an',
    answerTranslation: L(
      '그는 엔지니어예요?',
      'U muhandismi?',
      'Is he an engineer?',
      'Он инженер?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'job', 'article'],
  },

  en_s1u2_n5_049_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Is he an engineer?' }],
    options: ['Yes, he is.', 'Yes, they are.', 'Yes, she is.', 'Yes, it is.'],
    answer: 'Yes, he is.',
    answerTranslation: L('네, 맞아요.', 'Ha.', 'Yes, he is.', 'Да.'),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'be', 'short-answer'],
  },

  en_s1u2_n5_050_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'He isn’t from the USA. He’s from Australia.',
    audioText: 'He isn’t from the USA. He’s from Australia.',
    answerTranslation: L(
      '그는 미국 출신이 아니고 호주 출신이에요.',
      'U AQShdan emas. U Avstraliyadan.',
      'He isn’t from the USA. He’s from Australia.',
      'Он не из США. Он из Австралии.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'negative', 'country'],
  },

  en_s1u2_n5_051_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      'Paolo와 나를 함께 가리키는 대명사를 고르세요.',
      'Paolo va gapiruvchini birga bildiradigan olmoshni tanlang.',
      'Choose the pronoun for Paolo and the speaker.',
      'Выберите местоимение для Паоло и говорящего.',
    ),
    sentenceTemplate: 'Paolo and I are in New York. ___ are on holiday.',
    blankAnswers: ['We'],
    options: ['We', 'They', 'He', 'She'],
    answer: 'We',
    answerTranslation: L(
      'Paolo와 저는 뉴욕에 있어요. 우리는 휴가 중이에요.',
      'Paolo va men Nyu-Yorkdamiz. Biz ta’tildamiz.',
      'Paolo and I are in New York. We are on holiday.',
      'Мы с Паоло в Нью-Йорке. Мы в отпуске.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'pronouns', 'we'],
  },

  en_s1u2_n5_052_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      'Hannah를 대신할 대명사를 고르세요.',
      'Hannah o‘rniga mos olmoshni tanlang.',
      'Choose the pronoun for Hannah.',
      'Выберите местоимение вместо Hannah.',
    ),
    sentenceTemplate: 'Hannah is twenty. ___ is from California.',
    blankAnswers: ['She'],
    options: ['She', 'He', 'It', 'They'],
    answer: 'She',
    answerTranslation: L(
      'Hannah는 20살이고 캘리포니아 출신이에요.',
      'Hannah yigirma yoshda. U Kaliforniyadan.',
      'Hannah is twenty. She is from California.',
      'Ханне двадцать. Она из Калифорнии.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'pronouns', 'she'],
  },

  en_s1u2_n5_053_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      'New York를 대신할 대명사를 고르세요.',
      'New York o‘rniga mos olmoshni tanlang.',
      'Choose the pronoun for New York.',
      'Выберите местоимение вместо New York.',
    ),
    sentenceTemplate: 'New York is a great city. ___ is in the USA.',
    blankAnswers: ['It'],
    options: ['It', 'He', 'She', 'They'],
    answer: 'It',
    answerTranslation: L(
      '뉴욕은 멋진 도시예요. 미국에 있어요.',
      'Nyu-York ajoyib shahar. U AQShda.',
      'New York is a great city. It is in the USA.',
      'Нью-Йорк — отличный город. Он находится в США.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'pronouns', 'it'],
  },

  en_s1u2_n5_054_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The museum is on Baker Street.',
    audioText: 'The museum is on Baker Street.',
    answerTranslation: L(
      '박물관은 Baker Street에 있어요.',
      'Muzey Baker Streetda.',
      'The museum is on Baker Street.',
      'Музей находится на Baker Street.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'prepositions', 'on'],
  },

  en_s1u2_n5_055_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The museum is ___ Baker Street.',
    blankAnswers: ['on'],
    options: ['on', 'in', 'near', 'from'],
    answer: 'on',
    answerTranslation: L(
      '박물관은 Baker Street에 있어요.',
      'Muzey Baker Streetda.',
      'The museum is on Baker Street.',
      'Музей находится на Baker Street.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'prepositions', 'on'],
  },

  en_s1u2_n5_056_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The museum is ___ the station.',
    blankAnswers: ['near'],
    options: ['near', 'in', 'from', 'at'],
    answer: 'near',
    answerTranslation: L(
      '박물관은 역 근처에 있어요.',
      'Muzey bekat yaqinida.',
      'The museum is near the station.',
      'Музей находится рядом со станцией.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'prepositions', 'near'],
  },

  en_s1u2_n5_057_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The gardens are in Chinatown.',
    audioText: 'The gardens are in Chinatown.',
    answerTranslation: L(
      '정원은 차이나타운에 있어요.',
      'Bog‘lar Chinatownda.',
      'The gardens are in Chinatown.',
      'Сады находятся в Чайнатауне.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'prepositions', 'in'],
  },

  en_s1u2_n5_058_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['The', 'museum', 'is', 'next', 'to', 'the', 'station', 'from'],
    answer: 'The museum is next to the station',
    answerTranslation: L(
      '박물관은 역 바로 옆에 있어요.',
      'Muzey bekatning yonida.',
      'The museum is next to the station.',
      'Музей находится рядом со станцией.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'prepositions', 'next-to'],
  },

  en_s1u2_n5_059_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Twelve. Seventeen. Eighty-four. A hundred.',
    audioText: 'Twelve. Seventeen. Eighty-four. A hundred.',
    answerTranslation: L(
      '12, 17, 84, 100.',
      '12, 17, 84, 100.',
      'Twelve, seventeen, eighty-four, a hundred.',
      'Двенадцать, семнадцать, восемьдесят четыре, сто.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['review', 'numbers'],
  },

  en_s1u2_n5_060_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'They’re students in New York.',
    audioText: 'They’re students in New York.',
    answerI18n: L(
      '그들은 뉴욕의 학생들이에요',
      'Ular Nyu-Yorkdagi talabalar',
      'They are students in New York',
      'Они студенты в Нью-Йорке',
    ),
    options: ['They’re', 'students', 'in', 'New', 'York', 'He’s', 'teacher'],
    optionsI18n: {
      ko: ['그들은', '학생들이에요', '뉴욕에', '선생님', '그는'],
      uz: ['Ular', 'talabalar', 'Nyu-Yorkda', 'o‘qituvchi', 'u'],
      en: ['They', 'are', 'students', 'in', 'New', 'York', 'teacher'],
      ru: ['Они', 'студенты', 'в', 'Нью-Йорке', 'учитель'],
    },
    answerTranslation: L(
      '그들은 뉴욕의 학생들이에요.',
      'Ular Nyu-Yorkdagi talabalar.',
      'They’re students in New York.',
      'Они студенты в Нью-Йорке.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'pronouns', 'location'],
  },

  // ===========================================================
  // Lesson 4 · Units 1–2 cumulative review
  // ===========================================================

  en_s1u2_n5_061_speaking: {
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
    difficulty: 1,
    tags: ['review', 'unit1', 'question-words'],
  },

  en_s1u2_n5_062_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What’s your name?',
    options: ['I’m', 'Sophie', 'from', 'teacher', 'They’re'],
    answer: 'I’m Sophie',
    answerTranslation: L(
      '저는 Sophie예요.',
      'Men Sophieman.',
      'I’m Sophie.',
      'Я Софи.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'introduction'],
  },

  en_s1u2_n5_063_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Where are you from?',
    audioText: 'Where are you from?',
    answerTranslation: L(
      '어디 출신이에요?',
      'Qayerdansiz?',
      'Where are you from?',
      'Откуда вы?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'where'],
  },

  en_s1u2_n5_064_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Where are you from?' }],
    options: [
      'I’m from Turkey.',
      'I’m twenty-five.',
      'I’m a notepad.',
      'It’s at seven.',
    ],
    answer: 'I’m from Turkey.',
    answerTranslation: L(
      '저는 튀르키예 출신이에요.',
      'Men Turkiyadanman.',
      'I’m from Turkey.',
      'Я из Турции.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'country'],
  },

  en_s1u2_n5_065_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'How do you spell clock?',
    audioText: 'How do you spell clock?',
    answerTranslation: L(
      'clock은 철자가 어떻게 돼요?',
      'clock qanday harflanadi?',
      'How do you spell clock?',
      'Как пишется clock по буквам?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'spelling'],
  },

  en_s1u2_n5_066_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['C', 'L', 'O', 'C', 'K', 'B', 'T'],
    answer: 'C L O C K',
    audioText: 'C-L-O-C-K.',
    answerTranslation: L(
      'C-L-O-C-K.',
      'C-L-O-C-K.',
      'C-L-O-C-K.',
      'C-L-O-C-K.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['review', 'spelling'],
  },

  en_s1u2_n5_067_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '알맞은 질문사를 고르세요.',
      'Mos savol so‘zini tanlang.',
      'Choose the correct question word.',
      'Выберите правильное вопросительное слово.',
    ),
    sentenceTemplate: '___’s that?',
    blankAnswers: ['Who'],
    options: ['Who', 'Where', 'How', 'What time'],
    answer: 'Who',
    answerTranslation: L(
      '저 사람은 누구예요?',
      'U kim?',
      'Who’s that?',
      'Кто это?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'who'],
  },

  en_s1u2_n5_068_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Who’s that?' }],
    options: [
      'It’s Charlie. He’s my friend.',
      'They’re apples.',
      'It’s at eleven.',
      'I’m from Turkey.',
    ],
    answer: 'It’s Charlie. He’s my friend.',
    answerTranslation: L(
      'Charlie예요. 제 친구예요.',
      'Bu Charlie. U mening do‘stim.',
      'It’s Charlie. He’s my friend.',
      'Это Чарли. Он мой друг.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'who', 'friend'],
  },

  en_s1u2_n5_069_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'What time is it?',
    audioText: 'What time is it?',
    answerTranslation: L(
      '몇 시예요?',
      'Soat necha?',
      'What time is it?',
      'Который час?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'time'],
  },

  en_s1u2_n5_070_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What time is it?',
    options: ['It’s', 'one', 'forty-five', 'at', 'from', 'meeting'],
    answer: 'It’s one forty-five',
    answerTranslation: L(
      '1시 45분이에요.',
      'Soat bir qirq besh.',
      'It’s one forty-five.',
      'Сейчас час сорок пять.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'time'],
  },

  en_s1u2_n5_071_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'What time’s the meeting?',
    audioText: 'What time’s the meeting?',
    answerTranslation: L(
      '회의가 몇 시예요?',
      'Yig‘ilish soat nechada?',
      'What time’s the meeting?',
      'Во сколько встреча?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'time', 'meeting'],
  },

  en_s1u2_n5_072_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['It’s', 'from', 'two', 'o’clock', 'to', 'three', 'at', 'meeting'],
    answer: 'It’s from two o’clock to three',
    answerTranslation: L(
      '2시부터 3시까지예요.',
      'Soat ikkidan uchgacha.',
      'It’s from two o’clock to three.',
      'С двух до трёх.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'time', 'from-to'],
  },

  en_s1u2_n5_073_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'What time’s the next bus?',
    audioText: 'What time’s the next bus?',
    answerTranslation: L(
      '다음 버스가 몇 시예요?',
      'Keyingi avtobus soat nechada?',
      'What time’s the next bus?',
      'Во сколько следующий автобус?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'time', 'bus'],
  },

  en_s1u2_n5_074_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What time’s the next bus?',
    options: ['It’s', 'at', 'eleven', 'twenty', 'from', 'bus'],
    answer: 'It’s at eleven twenty',
    answerTranslation: L(
      '11시 20분이에요.',
      'Soat o‘n bir yigirmada.',
      'It’s at eleven twenty.',
      'Он в одиннадцать двадцать.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'time', 'at'],
  },

  en_s1u2_n5_075_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ you from Germany?',
    blankAnswers: ['Are'],
    options: ['Are', 'Is', 'Am', 'What'],
    answer: 'Are',
    answerTranslation: L(
      '독일 출신이에요?',
      'Germaniyadanmisiz?',
      'Are you from Germany?',
      'Вы из Германии?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'be'],
  },

  en_s1u2_n5_076_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'He ___ an engineer. He’s a teacher.',
    blankAnswers: ['isn’t'],
    options: ['isn’t', 'is', 'aren’t', 'are'],
    answer: 'isn’t',
    answerTranslation: L(
      '그는 엔지니어가 아니에요. 선생님이에요.',
      'U muhandis emas. U o‘qituvchi.',
      'He isn’t an engineer. He’s a teacher.',
      'Он не инженер. Он учитель.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'be', 'negative'],
  },

  en_s1u2_n5_077_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'We aren’t on holiday. We’re on business.',
    audioText: 'We aren’t on holiday. We’re on business.',
    answerTranslation: L(
      '우리는 휴가가 아니라 업무로 왔어요.',
      'Biz ta’tilda emasmiz. Biz ish bilan keldik.',
      'We aren’t on holiday. We’re on business.',
      'Мы не в отпуске. Мы здесь по делам.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'be', 'we'],
  },

  en_s1u2_n5_078_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'What are these in English?',
    audioText: 'What are these in English?',
    answerI18n: L(
      '이것들은 영어로 뭐예요',
      'Bular ingliz tilida nima',
      'What are these in English',
      'Как это называется по-английски',
    ),
    options: ['What', 'are', 'these', 'in', 'English', 'that', 'is'],
    optionsI18n: {
      ko: ['이것들은', '영어로', '뭐예요', '저것은'],
      uz: ['Bular', 'ingliz', 'tilida', 'nima', 'u'],
      en: ['What', 'are', 'these', 'in', 'English', 'that', 'is'],
      ru: ['Как', 'это', 'называется', 'по-английски', 'там'],
    },
    answerTranslation: L(
      '이것들은 영어로 뭐예요?',
      'Bular ingliz tilida nima?',
      'What are these in English?',
      'Как это называется по-английски?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['review', 'these'],
  },

  en_s1u2_n5_079_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'They’re students.',
    audioText: 'They’re students.',
    answerTranslation: L(
      '그들은 학생이에요.',
      'Ular talabalar.',
      'They’re students.',
      'Они студенты.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'they', 'jobs'],
  },

  en_s1u2_n5_080_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'What’s your name?' },
      { speaker: 'user', text: 'I’m Mina.' },
      { speaker: 'npc', text: 'Where are you from?' },
      { speaker: 'user', text: 'I’m from Korea.' },
      { speaker: 'npc', text: 'What’s your job?' },
    ],
    options: [
      'I’m a student.',
      'It’s at seven thirty.',
      'They’re umbrellas.',
      'It’s near the station.',
    ],
    answer: 'I’m a student.',
    answerTranslation: L(
      '저는 학생이에요.',
      'Men talabaman.',
      'I’m a student.',
      'Я студент.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'unit1', 'unit2', 'final'],
  },
};

// ─────────────────────────────────────────────────────────────
// Node 5
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT2_NODE5 = {
  title: L(
    '오래된 물건과 종합 복습',
    'Eski buyumlar va umumiy takrorlash',
    'Antiques and review',
    'Антиквариат и повторение',
  ),
  section: 1,
  unit: 2,
  order: 5,
  isActive: true,

  lessons: [
    {
      title: L(
        '골동품 가게',
        'Antiqa buyumlar do‘koni',
        'Witney Antiques',
        'Антикварный магазин',
      ),
      description: L(
        '골동품, 가구와 물건을 묘사하는 old, beautiful, expensive, favourite, special을 익혀요.',
        'Antiqa buyumlar va mebellarni old, beautiful, expensive, favourite va special bilan tasvirlashni o‘rganasiz.',
        'Learn antique objects and describe them with old, beautiful, expensive, favourite and special.',
        'Учимся называть антикварные предметы и описывать их словами old, beautiful, expensive, favourite и special.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 1,
      questions: [
        'en_s1u2_n5_001_speaking',
        'en_s1u2_n5_002_speaking',
        'en_s1u2_n5_003_word_matching',
        'en_s1u2_n5_004_speaking',
        'en_s1u2_n5_005_fill_in_blank',
        'en_s1u2_n5_006_speaking',
        'en_s1u2_n5_007_fill_in_blank',
        'en_s1u2_n5_008_speaking',
        'en_s1u2_n5_009_audio_match',
        'en_s1u2_n5_010_speaking',
        'en_s1u2_n5_011_fill_in_blank',
        'en_s1u2_n5_012_speaking',
        'en_s1u2_n5_013_reply_builder',
        'en_s1u2_n5_014_speaking',
        'en_s1u2_n5_015_translate_builder',
        'en_s1u2_n5_016_speaking',
        'en_s1u2_n5_017_fill_in_blank',
        'en_s1u2_n5_018_speaking',
        'en_s1u2_n5_019_word_arrange',
        'en_s1u2_n5_020_speaking',
      ],
    },

    {
      title: L(
        '경매에서 물건 소개하기',
        'Auksionda buyumni tanishtirish',
        'At an auction',
        'На аукционе',
      ),
      description: L(
        '물건이 무엇인지, 얼마나 오래됐는지, 어디에서 왔는지, 왜 특별한지 설명하고 판매·입찰 표현을 익혀요.',
        'Buyum nima ekanini, necha yillikligini, qayerdan ekanini va nega alohidaligini aytib, sotish va narx taklif qilishni o‘rganasiz.',
        'Describe an old object, say where it is from and why it is special, and practise selling and bidding.',
        'Описываем старый предмет, говорим, откуда он и почему особенный, и практикуем лексику продажи и ставок.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 2,
      questions: [
        'en_s1u2_n5_021_speaking',
        'en_s1u2_n5_022_word_matching',
        'en_s1u2_n5_023_speaking',
        'en_s1u2_n5_024_fill_in_blank',
        'en_s1u2_n5_025_speaking',
        'en_s1u2_n5_026_translate_builder',
        'en_s1u2_n5_027_speaking',
        'en_s1u2_n5_028_speaking',
        'en_s1u2_n5_029_reply_builder',
        'en_s1u2_n5_030_speaking',
        'en_s1u2_n5_031_dialog_complete',
        'en_s1u2_n5_032_speaking',
        'en_s1u2_n5_033_word_arrange',
        'en_s1u2_n5_034_speaking',
        'en_s1u2_n5_035_fill_in_blank',
        'en_s1u2_n5_036_speaking',
        'en_s1u2_n5_037_reply_builder',
        'en_s1u2_n5_038_speaking',
        'en_s1u2_n5_039_sentence_builder',
        'en_s1u2_n5_040_dialog_complete',
      ],
    },

    {
      title: L(
        'Unit 2 문법 복습',
        'Unit 2 grammatika takrori',
        'Unit 2 grammar review',
        'Повторение грамматики Unit 2',
      ),
      description: L(
        '물건의 단수·복수, a/an, this/that/these/those, 직업, be동사, 대명사와 장소 전치사를 함께 복습해요.',
        'Birlik-ko‘plik, a/an, this/that/these/those, kasblar, be, olmoshlar va joy predloglarini takrorlaysiz.',
        'Review objects, a/an, demonstratives, jobs, be, subject pronouns and prepositions of place.',
        'Повторяем предметы, a/an, указательные слова, профессии, be, местоимения и предлоги места.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 3,
      questions: [
        'en_s1u2_n5_041_speaking',
        'en_s1u2_n5_042_dialog_complete',
        'en_s1u2_n5_043_speaking',
        'en_s1u2_n5_044_reply_builder',
        'en_s1u2_n5_045_fill_in_blank',
        'en_s1u2_n5_046_fill_in_blank',
        'en_s1u2_n5_047_speaking',
        'en_s1u2_n5_048_fill_in_blank',
        'en_s1u2_n5_049_dialog_complete',
        'en_s1u2_n5_050_speaking',
        'en_s1u2_n5_051_fill_in_blank',
        'en_s1u2_n5_052_fill_in_blank',
        'en_s1u2_n5_053_fill_in_blank',
        'en_s1u2_n5_054_speaking',
        'en_s1u2_n5_055_fill_in_blank',
        'en_s1u2_n5_056_fill_in_blank',
        'en_s1u2_n5_057_speaking',
        'en_s1u2_n5_058_translate_builder',
        'en_s1u2_n5_059_speaking',
        'en_s1u2_n5_060_sentence_builder',
      ],
    },

    {
      title: L(
        'Unit 1–2 종합 복습',
        'Unit 1–2 umumiy takrorlash',
        'Units 1–2 review',
        'Повторение Units 1–2',
      ),
      description: L(
        '이름·출신·철자·질문사·be동사·직업·물건·위치·시간까지 처음 두 유닛의 핵심을 한 번에 복습해요.',
        'Ism, mamlakat, harflanish, savol so‘zlari, be, kasblar, buyumlar, joylashuv va vaqtni birga takrorlaysiz.',
        'Review the key language from Units 1 and 2: introductions, spelling, question words, be, jobs, objects, locations and time.',
        'Повторяем основную лексику и грамматику Units 1 и 2: знакомство, написание, вопросительные слова, be, профессии, предметы, места и время.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 4,
      questions: [
        'en_s1u2_n5_061_speaking',
        'en_s1u2_n5_062_reply_builder',
        'en_s1u2_n5_063_speaking',
        'en_s1u2_n5_064_dialog_complete',
        'en_s1u2_n5_065_speaking',
        'en_s1u2_n5_066_word_arrange',
        'en_s1u2_n5_067_fill_in_blank',
        'en_s1u2_n5_068_dialog_complete',
        'en_s1u2_n5_069_speaking',
        'en_s1u2_n5_070_reply_builder',
        'en_s1u2_n5_071_speaking',
        'en_s1u2_n5_072_translate_builder',
        'en_s1u2_n5_073_speaking',
        'en_s1u2_n5_074_reply_builder',
        'en_s1u2_n5_075_fill_in_blank',
        'en_s1u2_n5_076_fill_in_blank',
        'en_s1u2_n5_077_speaking',
        'en_s1u2_n5_078_sentence_builder',
        'en_s1u2_n5_079_speaking',
        'en_s1u2_n5_080_dialog_complete',
      ],
    },
  ],
};
