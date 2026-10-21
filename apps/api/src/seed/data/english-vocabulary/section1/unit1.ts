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
// Section 1 · Unit 1 · Node 1
// 1.1 On business or on holiday?
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT1_NODE1_WORDS = [
  {
    code: 'en-greeting-hello',
    english: 'hello',
    senseKey: 'greeting',
    partOfSpeech: WordPartOfSpeech.INTERJECTION,
    meaning: L(
      '안녕하세요; 안녕',
      'salom',
      'a greeting',
      'привет; здравствуйте',
    ),
    examples: [
      {
        english: 'Hello, I’m Anna.',
        translations: L(
          '안녕하세요, 저는 안나예요.',
          'Salom, men Annaman.',
          'Hello, I’m Anna.',
          'Здравствуйте, я Анна.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/həˈləʊ/',
      ttsText: 'hello',
    },
    media: {
      emoji: '👋',
      imageUrl: '',
      imageAlt: L(
        '인사하는 사람',
        'salomlashayotgan odam',
        'a person saying hello',
        'человек, который здоровается',
      ),
    },
    tags: ['greeting', 'introduction'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-greeting-hi',
    english: 'hi',
    senseKey: 'informal-greeting',
    partOfSpeech: WordPartOfSpeech.INTERJECTION,
    meaning: L('안녕', 'salom', 'an informal greeting', 'привет'),
    examples: [
      {
        english: 'Hi, I’m Paul.',
        translations: L(
          '안녕, 저는 폴이에요.',
          'Salom, men Polman.',
          'Hi, I’m Paul.',
          'Привет, я Пол.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/haɪ/',
      ttsText: 'hi',
    },
    media: {
      emoji: '👋',
      imageUrl: '',
      imageAlt: L(
        '가볍게 인사하는 사람',
        'norasmiy salomlashayotgan odam',
        'a person saying hi',
        'человек, который говорит привет',
      ),
    },
    tags: ['greeting', 'introduction'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-pronoun-i',
    english: 'I',
    senseKey: 'first-person-singular',
    partOfSpeech: WordPartOfSpeech.PRONOUN,
    meaning: L('나; 저', 'men', 'the speaker', 'я'),
    examples: [
      {
        english: 'I’m Paul.',
        translations: L('저는 폴이에요.', 'Men Polman.', 'I’m Paul.', 'Я Пол.'),
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
        '자신을 가리키는 사람',
        'o‘zini ko‘rsatayotgan odam',
        'a person referring to themself',
        'человек, указывающий на себя',
      ),
    },
    tags: ['pronoun', 'be'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-pronoun-you',
    english: 'you',
    senseKey: 'second-person',
    partOfSpeech: WordPartOfSpeech.PRONOUN,
    meaning: L('너; 당신', 'siz; sen', 'the person being spoken to', 'ты; вы'),
    examples: [
      {
        english: 'Are you here on holiday?',
        translations: L(
          '휴가로 여기 오셨어요?',
          'Bu yerga ta’tilga keldingizmi?',
          'Are you here on holiday?',
          'Вы здесь в отпуске?',
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
        'suhbatdoshini ko‘rsatayotgan odam',
        'a person referring to another person',
        'человек, обращающийся к собеседнику',
      ),
    },
    tags: ['pronoun', 'be'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-be',
    english: 'be',
    senseKey: 'copular-verb',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L('~이다; ~에 있다', 'bo‘lmoq', 'to be', 'быть'),
    examples: [
      {
        english: 'I’m Paul.',
        translations: L('저는 폴이에요.', 'Men Polman.', 'I’m Paul.', 'Я Пол.'),
      },
      {
        english: 'You’re here on holiday.',
        translations: L(
          '당신은 휴가로 여기 왔어요.',
          'Siz bu yerga ta’tilga kelgansiz.',
          'You’re here on holiday.',
          'Вы здесь в отпуске.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/biː/',
      ttsText: 'be',
    },
    media: {
      emoji: '🔗',
      imageUrl: '',
      imageAlt: L(
        '주어와 정보를 연결하는 표시',
        'ega va ma’lumotni bog‘lovchi belgi',
        'a symbol connecting a subject and information',
        'символ связи подлежащего и информации',
      ),
    },
    tags: ['grammar', 'be'],
    difficulty: 1,
    usageNote: L(
      'I와 함께 am, you와 함께 are를 사용해요.',
      'I bilan am, you bilan are ishlatiladi.',
      'Use am with I and are with you.',
      'С I используется am, с you — are.',
    ),
    isCore: true,
  },

  {
    code: 'en-adverb-not',
    english: 'not',
    senseKey: 'negation',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L(
      '아니다; ~않다',
      'emas',
      'used to make a statement negative',
      'не',
    ),
    examples: [
      {
        english: 'I’m not on business.',
        translations: L(
          '저는 업무로 온 게 아니에요.',
          'Men ish bilan kelmaganman.',
          'I’m not on business.',
          'Я здесь не по делам.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/nɒt/',
      ttsText: 'not',
    },
    media: {
      emoji: '❌',
      imageUrl: '',
      imageAlt: L(
        '부정을 나타내는 표시',
        'inkor belgisi',
        'a negative symbol',
        'знак отрицания',
      ),
    },
    tags: ['grammar', 'negative'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-place-here',
    english: 'here',
    senseKey: 'this-place',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L('여기; 여기에', 'bu yerda', 'in this place', 'здесь'),
    examples: [
      {
        english: 'I’m here to study.',
        translations: L(
          '저는 공부하러 여기 왔어요.',
          'Men bu yerga o‘qish uchun keldim.',
          'I’m here to study.',
          'Я здесь, чтобы учиться.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/hɪə/',
      ttsText: 'here',
    },
    media: {
      emoji: '📍',
      imageUrl: '',
      imageAlt: L(
        '현재 위치 표시',
        'joylashuv belgisi',
        'a location marker',
        'метка местоположения',
      ),
    },
    tags: ['place'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-business',
    english: 'business',
    senseKey: 'work-purpose',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '업무; 사업',
      'ish; biznes',
      'work or commercial activity',
      'дело; бизнес',
    ),
    examples: [
      {
        english: 'I’m here on business.',
        translations: L(
          '저는 업무로 여기 왔어요.',
          'Men bu yerga ish bilan keldim.',
          'I’m here on business.',
          'Я здесь по делам.',
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
      imageAlt: L(
        '업무용 가방',
        'ish sumkasi',
        'a business briefcase',
        'деловой портфель',
      ),
    },
    tags: ['reason-for-visit'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-holiday',
    english: 'holiday',
    senseKey: 'vacation',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('휴가', 'ta’til', 'a vacation', 'отпуск'),
    examples: [
      {
        english: 'I’m here on holiday.',
        translations: L(
          '저는 휴가로 여기 왔어요.',
          'Men bu yerga ta’tilga keldim.',
          'I’m here on holiday.',
          'Я здесь в отпуске.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈhɒlədeɪ/',
      ttsText: 'holiday',
    },
    media: {
      emoji: '🏖️',
      imageUrl: '',
      imageAlt: L(
        '휴가를 보내는 사람',
        'ta’tildagi odam',
        'a person on holiday',
        'человек в отпуске',
      ),
    },
    tags: ['reason-for-visit'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-study',
    english: 'study',
    senseKey: 'learn',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '공부하다',
      'o‘qimoq; o‘rganmoq',
      'to learn about a subject',
      'учиться; изучать',
    ),
    examples: [
      {
        english: 'I’m here to study.',
        translations: L(
          '저는 공부하러 여기 왔어요.',
          'Men bu yerga o‘qish uchun keldim.',
          'I’m here to study.',
          'Я здесь, чтобы учиться.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈstʌdi/',
      ttsText: 'study',
    },
    media: {
      emoji: '📚',
      imageUrl: '',
      imageAlt: L(
        '공부하는 학생',
        'o‘qiyotgan talaba',
        'a student studying',
        'учащийся студент',
      ),
    },
    tags: ['reason-for-visit'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-phrase-on-business',
    english: 'on business',
    senseKey: 'for-work',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L('업무로; 출장으로', 'ish bilan', 'for work', 'по делам'),
    examples: [
      {
        english: 'Are you here on business?',
        translations: L(
          '업무로 여기 오셨어요?',
          'Bu yerga ish bilan keldingizmi?',
          'Are you here on business?',
          'Вы здесь по делам?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɒn ˈbɪznəs/',
      ttsText: 'on business',
    },
    media: {
      emoji: '💼',
      imageUrl: '',
      imageAlt: L(
        '출장 중인 사람',
        'ish safaridagi odam',
        'a person travelling for work',
        'человек в деловой поездке',
      ),
    },
    tags: ['reason-for-visit', 'phrase'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-phrase-on-holiday',
    english: 'on holiday',
    senseKey: 'on-vacation',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L('휴가로; 휴가 중인', 'ta’tilda', 'on vacation', 'в отпуске'),
    examples: [
      {
        english: 'Are you here on holiday?',
        translations: L(
          '휴가로 여기 오셨어요?',
          'Bu yerga ta’tilga keldingizmi?',
          'Are you here on holiday?',
          'Вы здесь в отпуске?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɒn ˈhɒlədeɪ/',
      ttsText: 'on holiday',
    },
    media: {
      emoji: '🏖️',
      imageUrl: '',
      imageAlt: L(
        '휴가 중인 여행자',
        'ta’tildagi sayyoh',
        'a traveller on holiday',
        'путешественник в отпуске',
      ),
    },
    tags: ['reason-for-visit', 'phrase'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-phrase-to-study',
    english: 'to study',
    senseKey: 'purpose-study',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '공부하기 위해; 공부하러',
      'o‘qish uchun',
      'for the purpose of studying',
      'чтобы учиться',
    ),
    examples: [
      {
        english: 'I’m here to study.',
        translations: L(
          '저는 공부하러 여기 왔어요.',
          'Men bu yerga o‘qish uchun keldim.',
          'I’m here to study.',
          'Я здесь, чтобы учиться.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/tə ˈstʌdi/',
      ttsText: 'to study',
    },
    media: {
      emoji: '🎓',
      imageUrl: '',
      imageAlt: L(
        '공부하러 온 학생',
        'o‘qish uchun kelgan talaba',
        'a student who came to study',
        'студент, приехавший учиться',
      ),
    },
    tags: ['reason-for-visit', 'phrase'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-phrase-nice-to-meet-you',
    english: 'Nice to meet you.',
    senseKey: 'first-meeting',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '만나서 반가워요.',
      'Tanishganimdan xursandman.',
      'used when meeting someone for the first time',
      'Приятно познакомиться.',
    ),
    examples: [
      {
        english: 'Hello, I’m Alisa. Nice to meet you.',
        translations: L(
          '안녕하세요, 저는 알리사예요. 만나서 반가워요.',
          'Salom, men Alisaman. Tanishganimdan xursandman.',
          'Hello, I’m Alisa. Nice to meet you.',
          'Здравствуйте, я Алиса. Приятно познакомиться.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/naɪs tə miːt juː/',
      ttsText: 'Nice to meet you.',
    },
    media: {
      emoji: '🤝',
      imageUrl: '',
      imageAlt: L(
        '처음 만나는 두 사람',
        'birinchi marta uchrashayotgan ikki odam',
        'two people meeting for the first time',
        'двое людей при первом знакомстве',
      ),
    },
    tags: ['greeting', 'introduction', 'phrase'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-phrase-and-you',
    english: 'And you?',
    senseKey: 'return-question',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '당신은요?',
      'Siz-chi?',
      'used to ask the same thing back',
      'А вы?',
    ),
    examples: [
      {
        english: 'I’m here to study. And you?',
        translations: L(
          '저는 공부하러 왔어요. 당신은요?',
          'Men o‘qish uchun keldim. Siz-chi?',
          'I’m here to study. And you?',
          'Я здесь, чтобы учиться. А вы?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ənd juː/',
      ttsText: 'And you?',
    },
    media: {
      emoji: '↩️',
      imageUrl: '',
      imageAlt: L(
        '상대방에게 같은 질문을 돌려주는 모습',
        'savolni suhbatdoshiga qaytarish',
        'asking the same question back',
        'встречный вопрос собеседнику',
      ),
    },
    tags: ['conversation', 'phrase'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-answer-yes',
    english: 'yes',
    senseKey: 'affirmative',
    partOfSpeech: WordPartOfSpeech.INTERJECTION,
    meaning: L('네; 예', 'ha', 'an affirmative answer', 'да'),
    examples: [
      {
        english: 'Yes, I am.',
        translations: L('네, 맞아요.', 'Ha.', 'Yes, I am.', 'Да.'),
      },
    ],
    pronunciation: {
      ipa: '/jes/',
      ttsText: 'yes',
    },
    media: {
      emoji: '✅',
      imageUrl: '',
      imageAlt: L(
        '긍정을 나타내는 표시',
        'tasdiq belgisi',
        'an affirmative symbol',
        'знак согласия',
      ),
    },
    tags: ['short-answer'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-answer-no',
    english: 'no',
    senseKey: 'negative-answer',
    partOfSpeech: WordPartOfSpeech.INTERJECTION,
    meaning: L('아니요', 'yo‘q', 'a negative answer', 'нет'),
    examples: [
      {
        english: 'No, I’m not.',
        translations: L('아니요, 아니에요.', 'Yo‘q.', 'No, I’m not.', 'Нет.'),
      },
    ],
    pronunciation: {
      ipa: '/nəʊ/',
      ttsText: 'no',
    },
    media: {
      emoji: '❌',
      imageUrl: '',
      imageAlt: L(
        '부정을 나타내는 표시',
        'inkor belgisi',
        'a negative symbol',
        'знак отрицания',
      ),
    },
    tags: ['short-answer'],
    difficulty: 1,
    isCore: true,
  },
  {
    code: 'en-verb-am',
    english: 'am',
    senseKey: 'present-form-of-be-with-i',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      'be동사의 현재형; I와 함께 쓰는 ~이다/~에 있다',
      'be fe’lining I bilan ishlatiladigan hozirgi zamon shakli',
      'the present form of be used with I',
      'форма настоящего времени be, используемая с I',
    ),
    examples: [
      {
        english: 'I am here on holiday.',
        translations: L(
          '저는 휴가로 여기 와 있어요.',
          'Men bu yerda ta’tildaman.',
          'I am here on holiday.',
          'Я здесь в отпуске.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/æm/',
      ttsText: 'am',
    },
    media: {
      emoji: '🔗',
      imageUrl: '',
      imageAlt: L(
        'I와 am을 연결하는 표현',
        'I va am bog‘lanishi',
        'I with am',
        'I с формой am',
      ),
    },
    tags: ['be', 'grammar'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-other-and',
    english: 'and',
    senseKey: 'connect-words-or-ideas',
    partOfSpeech: WordPartOfSpeech.OTHER,
    meaning: L('그리고; ~와/과', 'va', 'used to connect words or ideas', 'и'),
    examples: [
      {
        english: 'Anna and Paul are here.',
        translations: L(
          '안나와 폴이 여기 있어요.',
          'Anna va Paul shu yerda.',
          'Anna and Paul are here.',
          'Анна и Пол здесь.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ænd/',
      ttsText: 'and',
    },
    media: {
      emoji: '➕',
      imageUrl: '',
      imageAlt: L(
        '두 항목을 연결하는 표시',
        'ikki narsani bog‘lash belgisi',
        'two things being connected',
        'соединение двух элементов',
      ),
    },
    tags: ['connector', 'grammar'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-are',
    english: 'are',
    senseKey: 'present-form-of-be-with-you-we-they',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      'be동사의 현재형; you/we/they와 함께 쓰는 ~이다/~에 있다',
      'be fe’lining you, we, they bilan ishlatiladigan hozirgi zamon shakli',
      'the present form of be used with you, we and they',
      'форма настоящего времени be с you, we и they',
    ),
    examples: [
      {
        english: 'Are you here to study?',
        translations: L(
          '공부하러 여기 오셨어요?',
          'Bu yerga o‘qish uchun keldingizmi?',
          'Are you here to study?',
          'Вы здесь, чтобы учиться?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɑː(r)/',
      ttsText: 'are',
    },
    media: {
      emoji: '🔗',
      imageUrl: '',
      imageAlt: L(
        'you와 are를 연결하는 표현',
        'you va are bog‘lanishi',
        'you with are',
        'you с формой are',
      ),
    },
    tags: ['be', 'grammar'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-introduce',
    english: 'introduce',
    senseKey: 'tell-people-each-others-names',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '소개하다',
      'tanishtirmoq',
      'to tell people each other’s names',
      'представлять; знакомить',
    ),
    examples: [
      {
        english: 'Let me introduce you to Anna.',
        translations: L(
          '안나를 소개해 드릴게요.',
          'Sizni Anna bilan tanishtiray.',
          'Let me introduce you to Anna.',
          'Позвольте представить вам Анну.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌɪntrəˈdjuːs/',
      ttsText: 'introduce',
    },
    media: {
      emoji: '🤝',
      imageUrl: '',
      imageAlt: L(
        '두 사람을 소개하는 모습',
        'ikki odamni tanishtirish',
        'introducing two people',
        'знакомство двух людей',
      ),
    },
    tags: ['introduction', 'people'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-is',
    english: 'is',
    senseKey: 'present-form-of-be-with-he-she-it',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      'be동사의 현재형; he/she/it와 함께 쓰는 ~이다/~에 있다',
      'be fe’lining he, she, it bilan ishlatiladigan hozirgi zamon shakli',
      'the present form of be used with he, she and it',
      'форма настоящего времени be с he, she и it',
    ),
    examples: [
      {
        english: 'My address is in London.',
        translations: L(
          '제 주소는 런던에 있어요.',
          'Mening manzilim Londonda.',
          'My address is in London.',
          'Мой адрес находится в Лондоне.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɪz/',
      ttsText: 'is',
    },
    media: {
      emoji: '🔗',
      imageUrl: '',
      imageAlt: L(
        '주어와 is를 연결하는 표현',
        'ega va is bog‘lanishi',
        'a subject with is',
        'подлежащее с формой is',
      ),
    },
    tags: ['be', 'grammar'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-other-on',
    english: 'on',
    senseKey: 'preposition-used-in-fixed-state-expressions',
    partOfSpeech: WordPartOfSpeech.OTHER,
    meaning: L(
      '~에; ~중인',
      '-da; bilan',
      'a preposition used in expressions such as on holiday',
      'предлог, используемый в выражениях типа on holiday',
    ),
    examples: [
      {
        english: 'Are you on holiday?',
        translations: L(
          '휴가 중이세요?',
          'Ta’tildamisiz?',
          'Are you on holiday?',
          'Вы в отпуске?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɒn/',
      ttsText: 'on',
    },
    media: {
      emoji: '🔗',
      imageUrl: '',
      imageAlt: L(
        '단어를 연결하는 전치사',
        'so‘zlarni bog‘lovchi predlog',
        'a connecting preposition',
        'предлог для связи слов',
      ),
    },
    tags: ['preposition', 'grammar'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-determiner-that',
    english: 'that',
    senseKey: 'particular-thing-away-from-speaker',
    partOfSpeech: WordPartOfSpeech.DETERMINER,
    meaning: L(
      '그; 저',
      'u; o‘sha',
      'used to refer to a particular thing',
      'тот; та; то',
    ),
    examples: [
      {
        english: 'How do you spell that?',
        translations: L(
          '그거 철자가 어떻게 돼요?',
          'Buni qanday harflaysiz?',
          'How do you spell that?',
          'Как это пишется по буквам?',
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
        '특정 대상을 가리키는 모습',
        'ma’lum narsani ko‘rsatish',
        'pointing to a particular thing',
        'указание на конкретный предмет',
      ),
    },
    tags: ['determiner', 'question'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adverb-too',
    english: 'too',
    senseKey: 'also-as-well',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L('또한; ~도', 'ham', 'also; as well', 'тоже; также'),
    examples: [
      {
        english: 'You too.',
        translations: L('당신도요.', 'Siz ham.', 'You too.', 'И вам тоже.'),
      },
    ],
    pronunciation: {
      ipa: '/tuː/',
      ttsText: 'too',
    },
    media: {
      emoji: '➕',
      imageUrl: '',
      imageAlt: L(
        '같은 내용을 하나 더 더하는 표시',
        'yana bir xil ma’no qo‘shish',
        'adding the same idea',
        'добавление того же значения',
      ),
    },
    tags: ['adverb', 'response'],
    difficulty: 1,
    isCore: true,
  },
];

// ─────────────────────────────────────────────────────────────
// Questions
// 4 lessons × 20 = 80
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT1_NODE1_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Hello, I’m ...
  // q001 ~ q020
  // ===========================================================

  en_s1u1_n1_001_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Hello.',
    audioText: 'Hello.',
    answerTranslation: L('안녕하세요.', 'Salom.', 'Hello.', 'Здравствуйте.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['greeting', 'hello'],
  },

  en_s1u1_n1_002_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: L(
      '영어 단어와 맞는 그림을 고르세요.',
      'Inglizcha so‘zga mos rasmni tanlang.',
      'Choose the picture that matches the English word.',
      'Выберите картинку, соответствующую английскому слову.',
    ),
    answer: 'holiday',
    choices: [
      { text: 'business', label: '💼', emoji: '💼', imageUrl: '' },
      { text: 'holiday', label: '🏖️', emoji: '🏖️', imageUrl: '' },
      { text: 'study', label: '📚', emoji: '📚', imageUrl: '' },
      { text: 'hello', label: '👋', emoji: '👋', imageUrl: '' },
    ],
    answerTranslation: L('휴가', 'ta’til', 'holiday', 'отпуск'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['holiday', 'image'],
  },

  en_s1u1_n1_003_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Hi.',
    audioText: 'Hi.',
    answerTranslation: L('안녕.', 'Salom.', 'Hi.', 'Привет.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['greeting', 'hi'],
  },

  en_s1u1_n1_004_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___, I’m Paul.',
    blankAnswers: ['Hi'],
    options: ['Hi', 'Study', 'Holiday', 'Business'],
    answer: 'Hi',
    answerTranslation: L(
      '안녕, 저는 폴이에요.',
      'Salom, men Polman.',
      'Hi, I’m Paul.',
      'Привет, я Пол.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['greeting', 'introduction'],
  },

  en_s1u1_n1_005_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I’m Paul.',
    audioText: 'I’m Paul.',
    answerTranslation: L(
      '저는 폴이에요.',
      'Men Polman.',
      'I’m Paul.',
      'Я Пол.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['introduction', 'be'],
  },

  en_s1u1_n1_006_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['I’m', 'Alisa', 'Hi', 'you', 'holiday'],
    answer: 'Hi I’m Alisa',
    answerTranslation: L(
      '안녕, 저는 알리사예요.',
      'Salom, men Alisaman.',
      'Hi, I’m Alisa.',
      'Привет, я Алиса.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['greeting', 'introduction'],
  },

  en_s1u1_n1_007_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Hello, I’m Alisa.',
    audioText: 'Hello, I’m Alisa.',
    answerTranslation: L(
      '안녕하세요, 저는 알리사예요.',
      'Salom, men Alisaman.',
      'Hello, I’m Alisa.',
      'Здравствуйте, я Алиса.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['greeting', 'introduction'],
  },

  en_s1u1_n1_008_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Hello, I’m Paul.' }],
    options: ['Hi, I’m Alisa.', 'On holiday.', 'No, I’m not.', 'Are you here?'],
    answer: 'Hi, I’m Alisa.',
    answerTranslation: L(
      '안녕, 저는 알리사예요.',
      'Salom, men Alisaman.',
      'Hi, I’m Alisa.',
      'Привет, я Алиса.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['introduction', 'dialog'],
  },

  en_s1u1_n1_009_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Nice to meet you.',
    audioText: 'Nice to meet you.',
    answerTranslation: L(
      '만나서 반가워요.',
      'Tanishganimdan xursandman.',
      'Nice to meet you.',
      'Приятно познакомиться.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['first-meeting'],
  },

  en_s1u1_n1_010_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Nice to ___ you.',
    blankAnswers: ['meet'],
    options: ['meet', 'study', 'business', 'holiday'],
    answer: 'meet',
    answerTranslation: L(
      '만나서 반가워요.',
      'Tanishganimdan xursandman.',
      'Nice to meet you.',
      'Приятно познакомиться.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['first-meeting', 'meet'],
  },

  en_s1u1_n1_011_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['meet', 'you', 'Nice', 'to', 'business', 'Hi'],
    answer: 'Nice to meet you',
    audioText: 'Nice to meet you.',
    answerTranslation: L(
      '만나서 반가워요.',
      'Tanishganimdan xursandman.',
      'Nice to meet you.',
      'Приятно познакомиться.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['first-meeting', 'arrange'],
  },

  en_s1u1_n1_012_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'And you?',
    audioText: 'And you?',
    answerTranslation: L('당신은요?', 'Siz-chi?', 'And you?', 'А вы?'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['conversation'],
  },

  en_s1u1_n1_013_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: L(
      '영어 단어와 맞는 그림을 고르세요.',
      'Inglizcha so‘zga mos rasmni tanlang.',
      'Choose the picture that matches the English word.',
      'Выберите картинку, соответствующую английскому слову.',
    ),
    answer: 'business',
    choices: [
      { text: 'holiday', label: '🏖️', emoji: '🏖️', imageUrl: '' },
      { text: 'study', label: '📚', emoji: '📚', imageUrl: '' },
      { text: 'business', label: '💼', emoji: '💼', imageUrl: '' },
      { text: 'hello', label: '👋', emoji: '👋', imageUrl: '' },
    ],
    answerTranslation: L(
      '업무; 사업',
      'ish; biznes',
      'business',
      'дело; бизнес',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['business', 'image'],
  },

  en_s1u1_n1_014_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Hello, ___ Paul.',
    blankAnswers: ['I’m'],
    options: ['I’m', 'you', 'Are', 'not'],
    answer: 'I’m',
    answerTranslation: L(
      '안녕하세요, 저는 폴이에요.',
      'Salom, men Polman.',
      'Hello, I’m Paul.',
      'Здравствуйте, я Пол.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'i-am'],
  },

  en_s1u1_n1_015_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Hi, I’m Julie.',
    audioText: 'Hi, I’m Julie.',
    answerTranslation: L(
      '안녕, 저는 줄리예요.',
      'Salom, men Juliman.',
      'Hi, I’m Julie.',
      'Привет, я Джули.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['introduction'],
  },

  en_s1u1_n1_016_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['Nice', 'meet', 'you', 'to', 'holiday', 'I’m'],
    answer: 'Nice to meet you',
    answerTranslation: L(
      '만나서 반가워요.',
      'Tanishganimdan xursandman.',
      'Nice to meet you.',
      'Приятно познакомиться.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['first-meeting'],
  },

  en_s1u1_n1_017_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Nice to meet you.' }],
    options: ['And you.', 'On business.', 'No, I’m not.', 'Are you holiday?'],
    answer: 'And you.',
    answerTranslation: L('당신도요.', 'Siz ham.', 'And you.', 'И мне тоже.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['first-meeting', 'dialog'],
  },

  en_s1u1_n1_018_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Hello, I’m Sunil.',
    audioText: 'Hello, I’m Sunil.',
    answerTranslation: L(
      '안녕하세요, 저는 수닐이에요.',
      'Salom, men Sunilman.',
      'Hello, I’m Sunil.',
      'Здравствуйте, я Сунил.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['introduction'],
  },

  en_s1u1_n1_019_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ to meet you.',
    blankAnswers: ['Nice'],
    options: ['Nice', 'Here', 'Study', 'Business'],
    answer: 'Nice',
    answerTranslation: L(
      '만나서 반가워요.',
      'Tanishganimdan xursandman.',
      'Nice to meet you.',
      'Приятно познакомиться.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['first-meeting'],
  },

  en_s1u1_n1_020_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['Alisa', 'Hello', 'I’m', 'holiday', 'Are'],
    answer: 'Hello I’m Alisa',
    audioText: 'Hello, I’m Alisa.',
    answerTranslation: L(
      '안녕하세요, 저는 알리사예요.',
      'Salom, men Alisaman.',
      'Hello, I’m Alisa.',
      'Здравствуйте, я Алиса.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['introduction', 'arrange'],
  },

  // ===========================================================
  // Lesson 2 · Business, holiday or study?
  // q021 ~ q040
  // ===========================================================

  en_s1u1_n1_021_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      { korean: 'business', native: 'ish' },
      { korean: 'holiday', native: 'ta’til' },
      { korean: 'study', native: 'o‘qimoq' },
      { korean: 'here', native: 'bu yerda' },
      { korean: 'meet', native: 'tanishmoq' },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['reason-for-visit', 'matching'],
  },

  en_s1u1_n1_022_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I’m here on holiday.',
    audioText: 'I’m here on holiday.',
    answerTranslation: L(
      '저는 휴가로 여기 왔어요.',
      'Men bu yerga ta’tilga keldim.',
      'I’m here on holiday.',
      'Я здесь в отпуске.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['holiday'],
  },

  en_s1u1_n1_023_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I’m here on ___.',
    blankAnswers: ['holiday'],
    options: ['holiday', 'study', 'meet', 'hello'],
    answer: 'holiday',
    answerTranslation: L(
      '저는 휴가로 여기 왔어요.',
      'Men bu yerga ta’tilga keldim.',
      'I’m here on holiday.',
      'Я здесь в отпуске.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['holiday'],
  },

  en_s1u1_n1_024_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I’m here on business.',
    audioText: 'I’m here on business.',
    answerTranslation: L(
      '저는 업무로 여기 왔어요.',
      'Men bu yerga ish bilan keldim.',
      'I’m here on business.',
      'Я здесь по делам.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['business'],
  },

  en_s1u1_n1_025_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['I’m', 'here', 'on', 'business', 'holiday', 'you'],
    answer: 'I’m here on business',
    answerTranslation: L(
      '저는 업무로 여기 왔어요.',
      'Men bu yerga ish bilan keldim.',
      'I’m here on business.',
      'Я здесь по делам.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['business'],
  },

  en_s1u1_n1_026_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I’m here to study.',
    audioText: 'I’m here to study.',
    answerTranslation: L(
      '저는 공부하러 여기 왔어요.',
      'Men bu yerga o‘qish uchun keldim.',
      'I’m here to study.',
      'Я здесь, чтобы учиться.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['study'],
  },

  en_s1u1_n1_027_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I’m here to ___.',
    blankAnswers: ['study'],
    options: ['study', 'holiday', 'business', 'meet'],
    answer: 'study',
    answerTranslation: L(
      '저는 공부하러 여기 왔어요.',
      'Men bu yerga o‘qish uchun keldim.',
      'I’m here to study.',
      'Я здесь, чтобы учиться.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['study'],
  },

  en_s1u1_n1_028_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      { korean: 'hello', native: 'salom' },
      { korean: 'business', native: 'ish' },
      { korean: 'holiday', native: 'ta’til' },
      { korean: 'study', native: 'o‘qimoq' },
      { korean: 'here', native: 'bu yerda' },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['reason-for-visit', 'listening'],
  },

  en_s1u1_n1_029_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'On holiday.',
    audioText: 'On holiday.',
    answerTranslation: L('휴가로요.', 'Ta’tilga.', 'On holiday.', 'В отпуске.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['holiday'],
  },

  en_s1u1_n1_030_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['I’m', 'here', 'to', 'study', 'holiday', 'business'],
    answer: 'I’m here to study',
    audioText: 'I’m here to study.',
    answerTranslation: L(
      '저는 공부하러 여기 왔어요.',
      'Men bu yerga o‘qish uchun keldim.',
      'I’m here to study.',
      'Я здесь, чтобы учиться.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['study', 'arrange'],
  },

  en_s1u1_n1_031_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'On business.',
    audioText: 'On business.',
    answerTranslation: L(
      '업무로요.',
      'Ish bilan.',
      'On business.',
      'По делам.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['business'],
  },

  en_s1u1_n1_032_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'I’m here on holiday.',
    audioText: 'I’m here on holiday.',
    answerI18n: L(
      '저는 휴가로 여기 왔어요',
      'Men bu yerga ta’tilga keldim',
      'I’m here on holiday',
      'Я здесь в отпуске',
    ),
    optionsI18n: {
      ko: ['저는', '휴가로', '여기', '왔어요', '업무로', '공부하러'],
      uz: ['Men', 'bu', 'yerga', 'ta’tilga', 'keldim', 'ish'],
      en: ['I’m', 'here', 'on', 'holiday', 'business', 'study'],
      ru: ['Я', 'здесь', 'в', 'отпуске', 'по', 'делам'],
    },
    answerTranslation: L(
      '저는 휴가로 여기 왔어요.',
      'Men bu yerga ta’tilga keldim.',
      'I’m here on holiday.',
      'Я здесь в отпуске.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['holiday', 'sentence-builder'],
  },

  en_s1u1_n1_033_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'To study.',
    audioText: 'To study.',
    answerTranslation: L(
      '공부하러요.',
      'O‘qish uchun.',
      'To study.',
      'Чтобы учиться.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['study'],
  },

  en_s1u1_n1_034_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I’m ___ on business.',
    blankAnswers: ['here'],
    options: ['here', 'meet', 'holiday', 'study'],
    answer: 'here',
    answerTranslation: L(
      '저는 업무로 여기 왔어요.',
      'Men bu yerga ish bilan keldim.',
      'I’m here on business.',
      'Я здесь по делам.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['here', 'business'],
  },

  en_s1u1_n1_035_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I’m here on holiday.',
    audioText: 'I’m here on holiday.',
    answerTranslation: L(
      '저는 휴가로 여기 왔어요.',
      'Men bu yerga ta’tilga keldim.',
      'I’m here on holiday.',
      'Я здесь в отпуске.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['holiday'],
  },

  en_s1u1_n1_036_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['I’m', 'here', 'on', 'holiday', 'business', 'meet'],
    answer: 'I’m here on holiday',
    answerTranslation: L(
      '저는 휴가로 여기 왔어요.',
      'Men bu yerga ta’tilga keldim.',
      'I’m here on holiday.',
      'Я здесь в отпуске.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['holiday'],
  },

  en_s1u1_n1_037_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I’m here to study.',
    audioText: 'I’m here to study.',
    answerTranslation: L(
      '저는 공부하러 여기 왔어요.',
      'Men bu yerga o‘qish uchun keldim.',
      'I’m here to study.',
      'Я здесь, чтобы учиться.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['study'],
  },

  en_s1u1_n1_038_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'I’m here to study.',
    audioText: 'I’m here to study.',
    answerI18n: L(
      '저는 공부하러 여기 왔어요',
      'Men bu yerga o‘qish uchun keldim',
      'I’m here to study',
      'Я здесь чтобы учиться',
    ),
    optionsI18n: {
      ko: ['저는', '공부하러', '여기', '왔어요', '휴가로', '업무로'],
      uz: ['Men', 'bu', 'yerga', 'o‘qish', 'uchun', 'keldim', 'ta’tilga'],
      en: ['I’m', 'here', 'to', 'study', 'holiday', 'business'],
      ru: ['Я', 'здесь', 'чтобы', 'учиться', 'в', 'отпуске'],
    },
    answerTranslation: L(
      '저는 공부하러 여기 왔어요.',
      'Men bu yerga o‘qish uchun keldim.',
      'I’m here to study.',
      'Я здесь, чтобы учиться.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['study', 'sentence-builder'],
  },

  en_s1u1_n1_039_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'I’m here on business. And you?' }],
    options: [
      'I’m here on holiday.',
      'Nice to business.',
      'Are you study?',
      'No, you are.',
    ],
    answer: 'I’m here on holiday.',
    answerTranslation: L(
      '저는 휴가로 여기 왔어요.',
      'Men bu yerga ta’tilga keldim.',
      'I’m here on holiday.',
      'Я здесь в отпуске.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['reason-for-visit', 'dialog'],
  },

  en_s1u1_n1_040_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I’m here on business.',
    audioText: 'I’m here on business.',
    answerTranslation: L(
      '저는 업무로 여기 왔어요.',
      'Men bu yerga ish bilan keldim.',
      'I’m here on business.',
      'Я здесь по делам.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['business'],
  },

  // ===========================================================
  // Lesson 3 · I’m / You’re / not
  // q041 ~ q060
  // ===========================================================

  en_s1u1_n1_041_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I am Paul.',
    audioText: 'I am Paul.',
    answerTranslation: L(
      '저는 폴이에요.',
      'Men Polman.',
      'I am Paul.',
      'Я Пол.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'am'],
  },

  en_s1u1_n1_042_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I ___ Paul.',
    blankAnswers: ['am'],
    options: ['am', 'are', 'not', 'you'],
    answer: 'am',
    answerTranslation: L(
      '저는 폴이에요.',
      'Men Polman.',
      'I am Paul.',
      'Я Пол.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'am'],
  },

  en_s1u1_n1_043_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I’m Paul.',
    audioText: 'I’m Paul.',
    answerTranslation: L(
      '저는 폴이에요.',
      'Men Polman.',
      'I’m Paul.',
      'Я Пол.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'contraction'],
  },

  en_s1u1_n1_044_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ Paul.',
    blankAnswers: ['I’m'],
    options: ['I’m', 'You’re', 'Are', 'aren’t'],
    answer: 'I’m',
    answerTranslation: L(
      '저는 폴이에요.',
      'Men Polman.',
      'I’m Paul.',
      'Я Пол.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'contraction'],
  },

  en_s1u1_n1_045_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'You are here on holiday.',
    audioText: 'You are here on holiday.',
    answerTranslation: L(
      '당신은 휴가로 여기 왔어요.',
      'Siz bu yerga ta’tilga kelgansiz.',
      'You are here on holiday.',
      'Вы здесь в отпуске.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'are'],
  },

  en_s1u1_n1_046_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'You ___ here on holiday.',
    blankAnswers: ['are'],
    options: ['are', 'am', 'not', 'I’m'],
    answer: 'are',
    answerTranslation: L(
      '당신은 휴가로 여기 왔어요.',
      'Siz bu yerga ta’tilga kelgansiz.',
      'You are here on holiday.',
      'Вы здесь в отпуске.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'are'],
  },

  en_s1u1_n1_047_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'You’re here on holiday.',
    audioText: 'You’re here on holiday.',
    answerTranslation: L(
      '당신은 휴가로 여기 왔어요.',
      'Siz bu yerga ta’tilga kelgansiz.',
      'You’re here on holiday.',
      'Вы здесь в отпуске.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'contraction'],
  },

  en_s1u1_n1_048_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['You’re', 'here', 'on', 'holiday', 'I’m', 'business'],
    answer: 'You’re here on holiday',
    answerTranslation: L(
      '당신은 휴가로 여기 왔어요.',
      'Siz bu yerga ta’tilga kelgansiz.',
      'You’re here on holiday.',
      'Вы здесь в отпуске.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'positive'],
  },

  en_s1u1_n1_049_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I’m not here on holiday.',
    audioText: 'I’m not here on holiday.',
    answerTranslation: L(
      '저는 휴가로 여기 온 게 아니에요.',
      'Men bu yerga ta’tilga kelmaganman.',
      'I’m not here on holiday.',
      'Я здесь не в отпуске.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'negative'],
  },

  en_s1u1_n1_050_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I’m ___ here on holiday.',
    blankAnswers: ['not'],
    options: ['not', 'are', 'am', 'yes'],
    answer: 'not',
    answerTranslation: L(
      '저는 휴가로 여기 온 게 아니에요.',
      'Men bu yerga ta’tilga kelmaganman.',
      'I’m not here on holiday.',
      'Я здесь не в отпуске.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'negative'],
  },

  en_s1u1_n1_051_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['I’m', 'not', 'here', 'on', 'business', 'holiday'],
    answer: 'I’m not here on business',
    audioText: 'I’m not here on business.',
    answerTranslation: L(
      '저는 업무로 여기 온 게 아니에요.',
      'Men bu yerga ish bilan kelmaganman.',
      'I’m not here on business.',
      'Я здесь не по делам.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'negative'],
  },

  en_s1u1_n1_052_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'You aren’t here to study.',
    audioText: 'You aren’t here to study.',
    answerTranslation: L(
      '당신은 공부하러 여기 온 게 아니에요.',
      'Siz bu yerga o‘qish uchun kelmagansiz.',
      'You aren’t here to study.',
      'Вы здесь не для учёбы.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'negative'],
  },

  en_s1u1_n1_053_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'You ___ here to study.',
    blankAnswers: ['aren’t'],
    options: ['aren’t', 'am not', 'I’m', 'are I'],
    answer: 'aren’t',
    answerTranslation: L(
      '당신은 공부하러 여기 온 게 아니에요.',
      'Siz bu yerga o‘qish uchun kelmagansiz.',
      'You aren’t here to study.',
      'Вы здесь не для учёбы.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'negative'],
  },

  en_s1u1_n1_054_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I’m not on business.',
    audioText: 'I’m not on business.',
    answerTranslation: L(
      '저는 업무로 온 게 아니에요.',
      'Men ish bilan kelmaganman.',
      'I’m not on business.',
      'Я не по делам.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'negative'],
  },

  en_s1u1_n1_055_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'I’m not here on business.',
    audioText: 'I’m not here on business.',
    answerI18n: L(
      '저는 업무로 여기 온 게 아니에요',
      'Men bu yerga ish bilan kelmaganman',
      'I’m not here on business',
      'Я здесь не по делам',
    ),
    optionsI18n: {
      ko: ['저는', '업무로', '여기', '온', '게', '아니에요', '휴가로'],
      uz: ['Men', 'bu', 'yerga', 'ish', 'bilan', 'kelmaganman', 'ta’tilga'],
      en: ['I’m', 'not', 'here', 'on', 'business', 'holiday'],
      ru: ['Я', 'здесь', 'не', 'по', 'делам', 'в', 'отпуске'],
    },
    answerTranslation: L(
      '저는 업무로 여기 온 게 아니에요.',
      'Men bu yerga ish bilan kelmaganman.',
      'I’m not here on business.',
      'Я здесь не по делам.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['be', 'negative'],
  },

  en_s1u1_n1_056_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ not on business.',
    blankAnswers: ['I’m'],
    options: ['I’m', 'You’re', 'Are', 'You'],
    answer: 'I’m',
    answerTranslation: L(
      '저는 업무로 온 게 아니에요.',
      'Men ish bilan kelmaganman.',
      'I’m not on business.',
      'Я не по делам.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'negative'],
  },

  en_s1u1_n1_057_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'You’re here to study.',
    audioText: 'You’re here to study.',
    answerTranslation: L(
      '당신은 공부하러 여기 왔어요.',
      'Siz bu yerga o‘qish uchun kelgansiz.',
      'You’re here to study.',
      'Вы здесь, чтобы учиться.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'positive'],
  },

  en_s1u1_n1_058_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['I’m', 'not', 'here', 'to', 'study', 'holiday'],
    answer: 'I’m not here to study',
    answerTranslation: L(
      '저는 공부하러 여기 온 게 아니에요.',
      'Men bu yerga o‘qish uchun kelmaganman.',
      'I’m not here to study.',
      'Я здесь не для учёбы.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'negative'],
  },

  en_s1u1_n1_059_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'You’re here on holiday.' }],
    options: [
      'No, I’m not. I’m here to study.',
      'Yes, you am.',
      'I holiday.',
      'Are business.',
    ],
    answer: 'No, I’m not. I’m here to study.',
    answerTranslation: L(
      '아니요. 저는 공부하러 여기 왔어요.',
      'Yo‘q. Men bu yerga o‘qish uchun keldim.',
      'No, I’m not. I’m here to study.',
      'Нет. Я здесь, чтобы учиться.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['be', 'negative', 'dialog'],
  },

  en_s1u1_n1_060_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'You aren’t on business.',
    audioText: 'You aren’t on business.',
    answerTranslation: L(
      '당신은 업무로 온 게 아니에요.',
      'Siz ish bilan kelmagansiz.',
      'You aren’t on business.',
      'Вы не по делам.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'negative'],
  },

  // ===========================================================
  // Lesson 4 · Are you ...?
  // Questions + short answers + cumulative practice
  // q061 ~ q080
  // ===========================================================

  en_s1u1_n1_061_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Are you here on holiday?',
    audioText: 'Are you here on holiday?',
    answerTranslation: L(
      '휴가로 여기 오셨어요?',
      'Bu yerga ta’tilga keldingizmi?',
      'Are you here on holiday?',
      'Вы здесь в отпуске?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'question'],
  },

  en_s1u1_n1_062_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ you here on holiday?',
    blankAnswers: ['Are'],
    options: ['Are', 'Am', 'You’re', 'I’m'],
    answer: 'Are',
    answerTranslation: L(
      '휴가로 여기 오셨어요?',
      'Bu yerga ta’tilga keldingizmi?',
      'Are you here on holiday?',
      'Вы здесь в отпуске?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'question'],
  },

  en_s1u1_n1_063_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Are you here on business?',
    audioText: 'Are you here on business?',
    answerTranslation: L(
      '업무로 여기 오셨어요?',
      'Bu yerga ish bilan keldingizmi?',
      'Are you here on business?',
      'Вы здесь по делам?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'question'],
  },

  en_s1u1_n1_064_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['Are', 'you', 'here', 'on', 'business', 'holiday'],
    answer: 'Are you here on business',
    answerTranslation: L(
      '업무로 여기 오셨어요?',
      'Bu yerga ish bilan keldingizmi?',
      'Are you here on business?',
      'Вы здесь по делам?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'question'],
  },

  en_s1u1_n1_065_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Are you here to study?',
    audioText: 'Are you here to study?',
    answerTranslation: L(
      '공부하러 여기 오셨어요?',
      'Bu yerga o‘qish uchun keldingizmi?',
      'Are you here to study?',
      'Вы здесь, чтобы учиться?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'question'],
  },

  en_s1u1_n1_066_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['Are', 'you', 'here', 'to', 'study', 'holiday'],
    answer: 'Are you here to study',
    audioText: 'Are you here to study?',
    answerTranslation: L(
      '공부하러 여기 오셨어요?',
      'Bu yerga o‘qish uchun keldingizmi?',
      'Are you here to study?',
      'Вы здесь, чтобы учиться?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'question', 'arrange'],
  },

  en_s1u1_n1_067_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Yes, I am.',
    audioText: 'Yes, I am.',
    answerTranslation: L('네, 맞아요.', 'Ha.', 'Yes, I am.', 'Да.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['short-answer', 'yes'],
  },

  en_s1u1_n1_068_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Yes, I ___.',
    blankAnswers: ['am'],
    options: ['am', 'are', 'not', 'you'],
    answer: 'am',
    answerTranslation: L('네, 맞아요.', 'Ha.', 'Yes, I am.', 'Да.'),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['short-answer', 'yes'],
  },

  en_s1u1_n1_069_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'No, I’m not.',
    audioText: 'No, I’m not.',
    answerTranslation: L('아니요, 아니에요.', 'Yo‘q.', 'No, I’m not.', 'Нет.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['short-answer', 'no'],
  },

  en_s1u1_n1_070_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'No, I’m ___.',
    blankAnswers: ['not'],
    options: ['not', 'am', 'are', 'yes'],
    answer: 'not',
    answerTranslation: L('아니요, 아니에요.', 'Yo‘q.', 'No, I’m not.', 'Нет.'),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['short-answer', 'no'],
  },

  en_s1u1_n1_071_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Are you here on holiday?' }],
    options: ['Yes, I am.', 'Yes, you are.', 'I holiday.', 'Are I.'],
    answer: 'Yes, I am.',
    answerTranslation: L('네, 맞아요.', 'Ha.', 'Yes, I am.', 'Да.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['be', 'question', 'dialog'],
  },

  en_s1u1_n1_072_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'You are on holiday.',
    audioText: 'You are on holiday.',
    answerTranslation: L(
      '당신은 휴가 중이에요.',
      'Siz ta’tildasiz.',
      'You are on holiday.',
      'Вы в отпуске.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'statement'],
  },

  en_s1u1_n1_073_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '평서문이 되도록 알맞은 표현을 고르세요.',
      'Darak gap bo‘lishi uchun mos shaklni tanlang.',
      'Choose the form that makes this a statement.',
      'Выберите форму для утвердительного предложения.',
    ),
    sentenceTemplate: '___ on holiday.',
    blankAnswers: ['You are'],
    options: ['You are', 'Are you', 'I am', 'Are I'],
    answer: 'You are',
    answerTranslation: L(
      '당신은 휴가 중이에요.',
      'Siz ta’tildasiz.',
      'You are on holiday.',
      'Вы в отпуске.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['be', 'statement', 'word-order'],
  },

  en_s1u1_n1_074_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Are you on holiday?',
    audioText: 'Are you on holiday?',
    answerTranslation: L(
      '휴가 중이세요?',
      'Ta’tildamisiz?',
      'Are you on holiday?',
      'Вы в отпуске?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'question'],
  },

  en_s1u1_n1_075_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '의문문이 되도록 알맞은 표현을 고르세요.',
      'So‘roq gap bo‘lishi uchun mos shaklni tanlang.',
      'Choose the form that makes this a question.',
      'Выберите форму для вопросительного предложения.',
    ),
    sentenceTemplate: '___ on holiday?',
    blankAnswers: ['Are you'],
    options: ['Are you', 'You are', 'I am', 'You’re'],
    answer: 'Are you',
    answerTranslation: L(
      '휴가 중이세요?',
      'Ta’tildamisiz?',
      'Are you on holiday?',
      'Вы в отпуске?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['be', 'question', 'word-order'],
  },

  en_s1u1_n1_076_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Are you here on business?',
    audioText: 'Are you here on business?',
    answerI18n: L(
      '업무로 여기 오셨어요',
      'Bu yerga ish bilan keldingizmi',
      'Are you here on business',
      'Вы здесь по делам',
    ),
    optionsI18n: {
      ko: ['업무로', '여기', '오셨어요', '휴가로', '당신은'],
      uz: ['bu', 'yerga', 'ish', 'bilan', 'keldingizmi', 'ta’tilga'],
      en: ['Are', 'you', 'here', 'on', 'business', 'holiday'],
      ru: ['Вы', 'здесь', 'по', 'делам', 'в', 'отпуске'],
    },
    answerTranslation: L(
      '업무로 여기 오셨어요?',
      'Bu yerga ish bilan keldingizmi?',
      'Are you here on business?',
      'Вы здесь по делам?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['be', 'question', 'sentence-builder'],
  },

  en_s1u1_n1_077_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Are you here on business?' }],
    options: [
      'No, I’m not. I’m here on holiday.',
      'Yes, you am.',
      'I business not.',
      'Are holiday.',
    ],
    answer: 'No, I’m not. I’m here on holiday.',
    answerTranslation: L(
      '아니요. 저는 휴가로 여기 왔어요.',
      'Yo‘q. Men bu yerga ta’tilga keldim.',
      'No, I’m not. I’m here on holiday.',
      'Нет. Я здесь в отпуске.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['be', 'question', 'dialog'],
  },

  en_s1u1_n1_078_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      { korean: 'yes', native: 'ha' },
      { korean: 'no', native: 'yo‘q' },
      { korean: 'I', native: 'men' },
      { korean: 'you', native: 'siz' },
      { korean: 'not', native: 'emas' },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['be', 'matching'],
  },

  en_s1u1_n1_079_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'No, I’m not. I’m here to study.',
    audioText: 'No, I’m not. I’m here to study.',
    answerTranslation: L(
      '아니요. 저는 공부하러 여기 왔어요.',
      'Yo‘q. Men bu yerga o‘qish uchun keldim.',
      'No, I’m not. I’m here to study.',
      'Нет. Я здесь, чтобы учиться.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['be', 'question', 'short-answer'],
  },

  en_s1u1_n1_080_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['No', 'I’m', 'not', 'here', 'on', 'holiday', 'business'],
    answer: 'No I’m not',
    answerTranslation: L('아니요, 아니에요.', 'Yo‘q.', 'No, I’m not.', 'Нет.'),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'short-answer', 'review'],
  },
};

// ─────────────────────────────────────────────────────────────
// Node
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT1_NODE1 = {
  title: L('첫 만남', 'Birinchi uchrashuv', 'First meetings', 'Первая встреча'),
  section: 1,
  unit: 1,
  order: 1,
  isActive: true,
  lessons: [
    {
      title: L(
        '안녕하세요, 저는…',
        'Salom, men…',
        'Hello, I’m…',
        'Здравствуйте, я…',
      ),
      description: L(
        '처음 만난 사람에게 인사하고 자신을 소개해요.',
        'Birinchi uchrashuvda salomlashib, o‘zingizni tanishtirasiz.',
        'Greet someone and introduce yourself.',
        'Поздоровайтесь и представьтесь.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 1,
      questions: [
        'en_s1u1_n1_001_speaking',
        'en_s1u1_n1_002_image_choice',
        'en_s1u1_n1_003_speaking',
        'en_s1u1_n1_004_fill_in_blank',
        'en_s1u1_n1_005_speaking',
        'en_s1u1_n1_006_translate_builder',
        'en_s1u1_n1_007_speaking',
        'en_s1u1_n1_008_dialog_complete',
        'en_s1u1_n1_009_speaking',
        'en_s1u1_n1_010_fill_in_blank',
        'en_s1u1_n1_011_word_arrange',
        'en_s1u1_n1_012_speaking',
        'en_s1u1_n1_013_image_choice',
        'en_s1u1_n1_014_fill_in_blank',
        'en_s1u1_n1_015_speaking',
        'en_s1u1_n1_016_translate_builder',
        'en_s1u1_n1_017_dialog_complete',
        'en_s1u1_n1_018_speaking',
        'en_s1u1_n1_019_fill_in_blank',
        'en_s1u1_n1_020_word_arrange',
      ],
    },

    {
      title: L(
        '업무, 휴가, 공부',
        'Ish, ta’til va o‘qish',
        'Business, holiday or study',
        'Работа, отпуск или учёба',
      ),
      description: L(
        '업무, 휴가, 공부처럼 여기 온 이유를 말해요.',
        'Bu yerga nima sababdan kelganingizni aytasiz.',
        'Say whether you are here for business, a holiday, or study.',
        'Говорим, приехали ли вы по работе, в отпуск или на учёбу.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 2,
      questions: [
        'en_s1u1_n1_021_word_matching',
        'en_s1u1_n1_022_speaking',
        'en_s1u1_n1_023_fill_in_blank',
        'en_s1u1_n1_024_speaking',
        'en_s1u1_n1_025_translate_builder',
        'en_s1u1_n1_026_speaking',
        'en_s1u1_n1_027_fill_in_blank',
        'en_s1u1_n1_028_audio_match',
        'en_s1u1_n1_029_speaking',
        'en_s1u1_n1_030_word_arrange',
        'en_s1u1_n1_031_speaking',
        'en_s1u1_n1_032_sentence_builder',
        'en_s1u1_n1_033_speaking',
        'en_s1u1_n1_034_fill_in_blank',
        'en_s1u1_n1_035_speaking',
        'en_s1u1_n1_036_translate_builder',
        'en_s1u1_n1_037_speaking',
        'en_s1u1_n1_038_sentence_builder',
        'en_s1u1_n1_039_dialog_complete',
        'en_s1u1_n1_040_speaking',
      ],
    },

    {
      title: L(
        'I’m과 You’re',
        'I’m va You’re',
        'I’m and You’re',
        'I’m и You’re',
      ),
      description: L(
        'I와 you에 맞는 be동사 긍정문과 부정문을 익혀요.',
        'I va you bilan be fe’lining tasdiq va inkor shakllarini o‘rganasiz.',
        'Use positive and negative forms of be with I and you.',
        'Учимся использовать be с I и you в утверждениях и отрицаниях.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 3,
      questions: [
        'en_s1u1_n1_041_speaking',
        'en_s1u1_n1_042_fill_in_blank',
        'en_s1u1_n1_043_speaking',
        'en_s1u1_n1_044_fill_in_blank',
        'en_s1u1_n1_045_speaking',
        'en_s1u1_n1_046_fill_in_blank',
        'en_s1u1_n1_047_speaking',
        'en_s1u1_n1_048_translate_builder',
        'en_s1u1_n1_049_speaking',
        'en_s1u1_n1_050_fill_in_blank',
        'en_s1u1_n1_051_word_arrange',
        'en_s1u1_n1_052_speaking',
        'en_s1u1_n1_053_fill_in_blank',
        'en_s1u1_n1_054_speaking',
        'en_s1u1_n1_055_sentence_builder',
        'en_s1u1_n1_056_fill_in_blank',
        'en_s1u1_n1_057_speaking',
        'en_s1u1_n1_058_translate_builder',
        'en_s1u1_n1_059_dialog_complete',
        'en_s1u1_n1_060_speaking',
      ],
    },

    {
      title: L('Are you…?', 'Are you…?', 'Are you…?', 'Are you…?'),
      description: L(
        'Are you로 질문하고 Yes, I am / No, I’m not으로 대답해요.',
        'Are you bilan savol berib, Yes, I am yoki No, I’m not deb javob berasiz.',
        'Ask questions with Are you and answer with Yes, I am or No, I’m not.',
        'Задаём вопросы с Are you и отвечаем Yes, I am или No, I’m not.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 4,
      questions: [
        'en_s1u1_n1_061_speaking',
        'en_s1u1_n1_062_fill_in_blank',
        'en_s1u1_n1_063_speaking',
        'en_s1u1_n1_064_translate_builder',
        'en_s1u1_n1_065_speaking',
        'en_s1u1_n1_066_word_arrange',
        'en_s1u1_n1_067_speaking',
        'en_s1u1_n1_068_fill_in_blank',
        'en_s1u1_n1_069_speaking',
        'en_s1u1_n1_070_fill_in_blank',
        'en_s1u1_n1_071_dialog_complete',
        'en_s1u1_n1_072_speaking',
        'en_s1u1_n1_073_fill_in_blank',
        'en_s1u1_n1_074_speaking',
        'en_s1u1_n1_075_fill_in_blank',
        'en_s1u1_n1_076_sentence_builder',
        'en_s1u1_n1_077_dialog_complete',
        'en_s1u1_n1_078_word_matching',
        'en_s1u1_n1_079_speaking',
        'en_s1u1_n1_080_translate_builder',
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Section 1 · Unit 1 · Node 2
// 1.2 Where are you from?
//
// Coverage
// - numbers 1–10
// - countries:
//   Australia, Brazil, China, Indonesia, Japan,
//   Russia, Spain, Turkey, the UK, the USA
// - pronunciation of country names
// - city ↔ country associations from Workbook
// - Where are you from?
// - Where in ...?
// - I'm / We're / You're from ...
// - We're not / We aren't
// - You're not / You aren't
// - Are you from ...?
// - Yes, we are. / No, we aren't.
// - proper nouns and capital letters
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT1_NODE2_WORDS = [
  {
    code: 'en-number-one',
    english: 'one',
    senseKey: 'number-1',
    partOfSpeech: WordPartOfSpeech.NUMERAL,
    meaning: L('하나; 1', 'bir; 1', 'the number 1', 'один; 1'),
    examples: [
      {
        english: 'Number one is China.',
        translations: L(
          '1번은 중국이에요.',
          'Birinchi raqam — Xitoy.',
          'Number one is China.',
          'Номер один — Китай.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/wʌn/',
      ttsText: 'one',
    },
    media: {
      emoji: '1️⃣',
      imageUrl: '',
      imageAlt: L('숫자 1', '1 raqami', 'the number one', 'число один'),
    },
    tags: ['numbers', 'one-to-ten'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-number-two',
    english: 'two',
    senseKey: 'number-2',
    partOfSpeech: WordPartOfSpeech.NUMERAL,
    meaning: L('둘; 2', 'ikki; 2', 'the number 2', 'два; 2'),
    examples: [
      {
        english: 'One, two, three.',
        translations: L(
          '하나, 둘, 셋.',
          'Bir, ikki, uch.',
          'One, two, three.',
          'Один, два, три.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/tuː/',
      ttsText: 'two',
    },
    media: {
      emoji: '2️⃣',
      imageUrl: '',
      imageAlt: L('숫자 2', '2 raqami', 'the number two', 'число два'),
    },
    tags: ['numbers', 'one-to-ten'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-number-three',
    english: 'three',
    senseKey: 'number-3',
    partOfSpeech: WordPartOfSpeech.NUMERAL,
    meaning: L('셋; 3', 'uch; 3', 'the number 3', 'три; 3'),
    examples: [
      {
        english: 'One, two, three.',
        translations: L(
          '하나, 둘, 셋.',
          'Bir, ikki, uch.',
          'One, two, three.',
          'Один, два, три.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/θriː/',
      ttsText: 'three',
    },
    media: {
      emoji: '3️⃣',
      imageUrl: '',
      imageAlt: L('숫자 3', '3 raqami', 'the number three', 'число три'),
    },
    tags: ['numbers', 'one-to-ten'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-number-four',
    english: 'four',
    senseKey: 'number-4',
    partOfSpeech: WordPartOfSpeech.NUMERAL,
    meaning: L('넷; 4', 'to‘rt; 4', 'the number 4', 'четыре; 4'),
    examples: [
      {
        english: 'Two, four, six.',
        translations: L(
          '둘, 넷, 여섯.',
          'Ikki, to‘rt, olti.',
          'Two, four, six.',
          'Два, четыре, шесть.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/fɔː/',
      ttsText: 'four',
    },
    media: {
      emoji: '4️⃣',
      imageUrl: '',
      imageAlt: L('숫자 4', '4 raqami', 'the number four', 'число четыре'),
    },
    tags: ['numbers', 'one-to-ten'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-number-five',
    english: 'five',
    senseKey: 'number-5',
    partOfSpeech: WordPartOfSpeech.NUMERAL,
    meaning: L('다섯; 5', 'besh; 5', 'the number 5', 'пять; 5'),
    examples: [
      {
        english: 'Five, six, seven.',
        translations: L(
          '다섯, 여섯, 일곱.',
          'Besh, olti, yetti.',
          'Five, six, seven.',
          'Пять, шесть, семь.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/faɪv/',
      ttsText: 'five',
    },
    media: {
      emoji: '5️⃣',
      imageUrl: '',
      imageAlt: L('숫자 5', '5 raqami', 'the number five', 'число пять'),
    },
    tags: ['numbers', 'one-to-ten'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-number-six',
    english: 'six',
    senseKey: 'number-6',
    partOfSpeech: WordPartOfSpeech.NUMERAL,
    meaning: L('여섯; 6', 'olti; 6', 'the number 6', 'шесть; 6'),
    examples: [
      {
        english: 'Six, eight, ten.',
        translations: L(
          '여섯, 여덟, 열.',
          'Olti, sakkiz, o‘n.',
          'Six, eight, ten.',
          'Шесть, восемь, десять.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/sɪks/',
      ttsText: 'six',
    },
    media: {
      emoji: '6️⃣',
      imageUrl: '',
      imageAlt: L('숫자 6', '6 raqami', 'the number six', 'число шесть'),
    },
    tags: ['numbers', 'one-to-ten'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-number-seven',
    english: 'seven',
    senseKey: 'number-7',
    partOfSpeech: WordPartOfSpeech.NUMERAL,
    meaning: L('일곱; 7', 'yetti; 7', 'the number 7', 'семь; 7'),
    examples: [
      {
        english: 'Seven, eight, nine.',
        translations: L(
          '일곱, 여덟, 아홉.',
          'Yetti, sakkiz, to‘qqiz.',
          'Seven, eight, nine.',
          'Семь, восемь, девять.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈsevən/',
      ttsText: 'seven',
    },
    media: {
      emoji: '7️⃣',
      imageUrl: '',
      imageAlt: L('숫자 7', '7 raqami', 'the number seven', 'число семь'),
    },
    tags: ['numbers', 'one-to-ten'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-number-eight',
    english: 'eight',
    senseKey: 'number-8',
    partOfSpeech: WordPartOfSpeech.NUMERAL,
    meaning: L('여덟; 8', 'sakkiz; 8', 'the number 8', 'восемь; 8'),
    examples: [
      {
        english: 'Six, eight, ten.',
        translations: L(
          '여섯, 여덟, 열.',
          'Olti, sakkiz, o‘n.',
          'Six, eight, ten.',
          'Шесть, восемь, десять.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/eɪt/',
      ttsText: 'eight',
    },
    media: {
      emoji: '8️⃣',
      imageUrl: '',
      imageAlt: L('숫자 8', '8 raqami', 'the number eight', 'число восемь'),
    },
    tags: ['numbers', 'one-to-ten'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-number-nine',
    english: 'nine',
    senseKey: 'number-9',
    partOfSpeech: WordPartOfSpeech.NUMERAL,
    meaning: L('아홉; 9', 'to‘qqiz; 9', 'the number 9', 'девять; 9'),
    examples: [
      {
        english: 'Ten, nine, eight.',
        translations: L(
          '열, 아홉, 여덟.',
          'O‘n, to‘qqiz, sakkiz.',
          'Ten, nine, eight.',
          'Десять, девять, восемь.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/naɪn/',
      ttsText: 'nine',
    },
    media: {
      emoji: '9️⃣',
      imageUrl: '',
      imageAlt: L('숫자 9', '9 raqami', 'the number nine', 'число девять'),
    },
    tags: ['numbers', 'one-to-ten'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-number-ten',
    english: 'ten',
    senseKey: 'number-10',
    partOfSpeech: WordPartOfSpeech.NUMERAL,
    meaning: L('열; 10', 'o‘n; 10', 'the number 10', 'десять; 10'),
    examples: [
      {
        english: 'Ten, nine, eight.',
        translations: L(
          '열, 아홉, 여덟.',
          'O‘n, to‘qqiz, sakkiz.',
          'Ten, nine, eight.',
          'Десять, девять, восемь.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ten/',
      ttsText: 'ten',
    },
    media: {
      emoji: '🔟',
      imageUrl: '',
      imageAlt: L('숫자 10', '10 raqami', 'the number ten', 'число десять'),
    },
    tags: ['numbers', 'one-to-ten'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-country-australia',
    english: 'Australia',
    senseKey: 'country',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('호주', 'Avstraliya', 'Australia', 'Австралия'),
    examples: [
      {
        english: 'We’re from Australia.',
        translations: L(
          '우리는 호주 출신이에요.',
          'Biz Avstraliyadanmiz.',
          'We’re from Australia.',
          'Мы из Австралии.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɒˈstreɪliə/',
      ttsText: 'Australia',
    },
    media: {
      emoji: '🇦🇺',
      imageUrl: '',
      imageAlt: L(
        '호주 국기',
        'Avstraliya bayrog‘i',
        'the Australian flag',
        'флаг Австралии',
      ),
    },
    tags: ['countries'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-country-brazil',
    english: 'Brazil',
    senseKey: 'country',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('브라질', 'Braziliya', 'Brazil', 'Бразилия'),
    examples: [
      {
        english: 'Are you from Brazil?',
        translations: L(
          '브라질 출신이에요?',
          'Siz Braziliyadanmisiz?',
          'Are you from Brazil?',
          'Вы из Бразилии?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/brəˈzɪl/',
      ttsText: 'Brazil',
    },
    media: {
      emoji: '🇧🇷',
      imageUrl: '',
      imageAlt: L(
        '브라질 국기',
        'Braziliya bayrog‘i',
        'the Brazilian flag',
        'флаг Бразилии',
      ),
    },
    tags: ['countries'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-country-china',
    english: 'China',
    senseKey: 'country',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('중국', 'Xitoy', 'China', 'Китай'),
    examples: [
      {
        english: 'We’re from China.',
        translations: L(
          '우리는 중국 출신이에요.',
          'Biz Xitoydanmiz.',
          'We’re from China.',
          'Мы из Китая.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈtʃaɪnə/',
      ttsText: 'China',
    },
    media: {
      emoji: '🇨🇳',
      imageUrl: '',
      imageAlt: L(
        '중국 국기',
        'Xitoy bayrog‘i',
        'the Chinese flag',
        'флаг Китая',
      ),
    },
    tags: ['countries'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-country-indonesia',
    english: 'Indonesia',
    senseKey: 'country',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('인도네시아', 'Indoneziya', 'Indonesia', 'Индонезия'),
    examples: [
      {
        english: 'I’m from Indonesia.',
        translations: L(
          '저는 인도네시아 출신이에요.',
          'Men Indoneziyadanman.',
          'I’m from Indonesia.',
          'Я из Индонезии.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌɪndəˈniːziə/',
      ttsText: 'Indonesia',
    },
    media: {
      emoji: '🇮🇩',
      imageUrl: '',
      imageAlt: L(
        '인도네시아 국기',
        'Indoneziya bayrog‘i',
        'the Indonesian flag',
        'флаг Индонезии',
      ),
    },
    tags: ['countries'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-country-japan',
    english: 'Japan',
    senseKey: 'country',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('일본', 'Yaponiya', 'Japan', 'Япония'),
    examples: [
      {
        english: 'I’m from Japan.',
        translations: L(
          '저는 일본 출신이에요.',
          'Men Yaponiyadanman.',
          'I’m from Japan.',
          'Я из Японии.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/dʒəˈpæn/',
      ttsText: 'Japan',
    },
    media: {
      emoji: '🇯🇵',
      imageUrl: '',
      imageAlt: L(
        '일본 국기',
        'Yaponiya bayrog‘i',
        'the Japanese flag',
        'флаг Японии',
      ),
    },
    tags: ['countries'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-country-russia',
    english: 'Russia',
    senseKey: 'country',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('러시아', 'Rossiya', 'Russia', 'Россия'),
    examples: [
      {
        english: 'I’m from Russia.',
        translations: L(
          '저는 러시아 출신이에요.',
          'Men Rossiyadanman.',
          'I’m from Russia.',
          'Я из России.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈrʌʃə/',
      ttsText: 'Russia',
    },
    media: {
      emoji: '🇷🇺',
      imageUrl: '',
      imageAlt: L(
        '러시아 국기',
        'Rossiya bayrog‘i',
        'the Russian flag',
        'флаг России',
      ),
    },
    tags: ['countries'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-country-spain',
    english: 'Spain',
    senseKey: 'country',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('스페인', 'Ispaniya', 'Spain', 'Испания'),
    examples: [
      {
        english: 'We’re from Spain.',
        translations: L(
          '우리는 스페인 출신이에요.',
          'Biz Ispaniyadanmiz.',
          'We’re from Spain.',
          'Мы из Испании.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/speɪn/',
      ttsText: 'Spain',
    },
    media: {
      emoji: '🇪🇸',
      imageUrl: '',
      imageAlt: L(
        '스페인 국기',
        'Ispaniya bayrog‘i',
        'the Spanish flag',
        'флаг Испании',
      ),
    },
    tags: ['countries'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-country-turkey',
    english: 'Turkey',
    senseKey: 'country',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('튀르키예', 'Turkiya', 'Turkey', 'Турция'),
    examples: [
      {
        english: 'I’m from Turkey.',
        translations: L(
          '저는 튀르키예 출신이에요.',
          'Men Turkiyadanman.',
          'I’m from Turkey.',
          'Я из Турции.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈtɜːki/',
      ttsText: 'Turkey',
    },
    media: {
      emoji: '🇹🇷',
      imageUrl: '',
      imageAlt: L(
        '튀르키예 국기',
        'Turkiya bayrog‘i',
        'the Turkish flag',
        'флаг Турции',
      ),
    },
    tags: ['countries'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-country-uk',
    english: 'the UK',
    senseKey: 'country',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '영국',
      'Buyuk Britaniya',
      'the United Kingdom',
      'Великобритания',
    ),
    examples: [
      {
        english: 'We’re from the UK.',
        translations: L(
          '우리는 영국 출신이에요.',
          'Biz Buyuk Britaniyadanmiz.',
          'We’re from the UK.',
          'Мы из Великобритании.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ðə ˌjuːˈkeɪ/',
      ttsText: 'the UK',
    },
    media: {
      emoji: '🇬🇧',
      imageUrl: '',
      imageAlt: L(
        '영국 국기',
        'Buyuk Britaniya bayrog‘i',
        'the UK flag',
        'флаг Великобритании',
      ),
    },
    tags: ['countries'],
    difficulty: 1,
    usageNote: L(
      'UK 앞에는 보통 the를 써요.',
      'UK oldidan odatda the ishlatiladi.',
      'We normally use the before UK.',
      'Перед UK обычно используется the.',
    ),
    isCore: true,
  },

  {
    code: 'en-country-usa',
    english: 'the USA',
    senseKey: 'country',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('미국', 'AQSh', 'the United States of America', 'США'),
    examples: [
      {
        english: 'You’re from the USA.',
        translations: L(
          '당신은 미국 출신이에요.',
          'Siz AQShdansiz.',
          'You’re from the USA.',
          'Вы из США.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ðə ˌjuːesˈeɪ/',
      ttsText: 'the USA',
    },
    media: {
      emoji: '🇺🇸',
      imageUrl: '',
      imageAlt: L('미국 국기', 'AQSh bayrog‘i', 'the USA flag', 'флаг США'),
    },
    tags: ['countries'],
    difficulty: 1,
    usageNote: L(
      'USA 앞에는 보통 the를 써요.',
      'USA oldidan odatda the ishlatiladi.',
      'We normally use the before USA.',
      'Перед USA обычно используется the.',
    ),
    isCore: true,
  },

  {
    code: 'en-pronoun-we',
    english: 'we',
    senseKey: 'first-person-plural',
    partOfSpeech: WordPartOfSpeech.PRONOUN,
    meaning: L(
      '우리; 우리는',
      'biz',
      'the speaker and one or more other people',
      'мы',
    ),
    examples: [
      {
        english: 'We’re from Spain.',
        translations: L(
          '우리는 스페인 출신이에요.',
          'Biz Ispaniyadanmiz.',
          'We’re from Spain.',
          'Мы из Испании.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/wiː/',
      ttsText: 'we',
    },
    media: {
      emoji: '👥',
      imageUrl: '',
      imageAlt: L(
        '함께 있는 여러 사람',
        'bir guruh odam',
        'a group of people',
        'группа людей',
      ),
    },
    tags: ['pronoun', 'be'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-preposition-from',
    english: 'from',
    senseKey: 'origin',
    partOfSpeech: WordPartOfSpeech.OTHER,
    meaning: L(
      '~에서; ~출신의',
      '-dan',
      'used to show a place of origin',
      'из; родом из',
    ),
    examples: [
      {
        english: 'Where are you from?',
        translations: L(
          '어디 출신이에요?',
          'Qayerdansiz?',
          'Where are you from?',
          'Откуда вы?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/frɒm/',
      ttsText: 'from',
    },
    media: {
      emoji: '🌍',
      imageUrl: '',
      imageAlt: L(
        '출신지를 나타내는 지도',
        'kelib chiqish joyini ko‘rsatuvchi xarita',
        'a map showing a place of origin',
        'карта, показывающая место происхождения',
      ),
    },
    tags: ['origin', 'grammar'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-question-where',
    english: 'where',
    senseKey: 'place-question',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L('어디', 'qayer', 'used to ask about a place', 'где; откуда'),
    examples: [
      {
        english: 'Where are you from?',
        translations: L(
          '어디 출신이에요?',
          'Qayerdansiz?',
          'Where are you from?',
          'Откуда вы?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/weə/',
      ttsText: 'where',
    },
    media: {
      emoji: '❓',
      imageUrl: '',
      imageAlt: L(
        '장소를 묻는 질문',
        'joy haqida savol',
        'a question about a place',
        'вопрос о месте',
      ),
    },
    tags: ['question', 'origin'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-country',
    english: 'country',
    senseKey: 'nation',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('나라; 국가', 'mamlakat', 'a nation', 'страна'),
    examples: [
      {
        english: 'Brazil is a country.',
        translations: L(
          '브라질은 나라예요.',
          'Braziliya — mamlakat.',
          'Brazil is a country.',
          'Бразилия — страна.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkʌntri/',
      ttsText: 'country',
    },
    media: {
      emoji: '🌍',
      imageUrl: '',
      imageAlt: L('세계 지도', 'dunyo xaritasi', 'a world map', 'карта мира'),
    },
    tags: ['countries'],
    difficulty: 1,
    isCore: false,
  },

  {
    code: 'en-noun-city',
    english: 'city',
    senseKey: 'large-town',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('도시', 'shahar', 'a large town', 'город'),
    examples: [
      {
        english: 'Sydney is a city in Australia.',
        translations: L(
          '시드니는 호주에 있는 도시예요.',
          'Sidney Avstraliyadagi shahar.',
          'Sydney is a city in Australia.',
          'Сидней — город в Австралии.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈsɪti/',
      ttsText: 'city',
    },
    media: {
      emoji: '🏙️',
      imageUrl: '',
      imageAlt: L('도시', 'shahar', 'a city', 'город'),
    },
    tags: ['places'],
    difficulty: 1,
    isCore: false,
  },
  {
    code: 'en-other-in',
    english: 'in',
    senseKey: 'inside-place-preposition',
    partOfSpeech: WordPartOfSpeech.OTHER,
    meaning: L(
      '~안에; ~에서',
      '-da; ichida',
      'inside or within a place',
      'в; внутри',
    ),
    examples: [
      {
        english: 'We are in a hotel.',
        translations: L(
          '우리는 호텔 안에 있어요.',
          'Biz mehmonxonadamiz.',
          'We are in a hotel.',
          'Мы в отеле.',
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
        '장소 안에 있는 위치',
        'joy ichidagi holat',
        'a position inside a place',
        'положение внутри места',
      ),
    },
    tags: ['preposition', 'place'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-map',
    english: 'map',
    senseKey: 'drawing-showing-places',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '지도',
      'xarita',
      'a drawing that shows where places are',
      'карта',
    ),
    examples: [
      {
        english: 'This is a map of the world.',
        translations: L(
          '이것은 세계 지도예요.',
          'Bu dunyo xaritasi.',
          'This is a map of the world.',
          'Это карта мира.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/mæp/',
      ttsText: 'map',
    },
    media: {
      emoji: '🗺️',
      imageUrl: '',
      imageAlt: L('세계 지도', 'dunyo xaritasi', 'a world map', 'карта мира'),
    },
    tags: ['places', 'countries'],
    difficulty: 1,
    isCore: true,
  },
];

// ─────────────────────────────────────────────────────────────
// Questions
// 4 lessons × 20 = 80
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT1_NODE2_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Numbers 1–10
  // ===========================================================

  en_s1u1_n2_001_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'One.',
    audioText: 'One.',
    answerTranslation: L('하나.', 'Bir.', 'One.', 'Один.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['numbers', 'one'],
  },

  en_s1u1_n2_002_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Two.',
    audioText: 'Two.',
    answerTranslation: L('둘.', 'Ikki.', 'Two.', 'Два.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['numbers', 'two'],
  },

  en_s1u1_n2_003_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Three.',
    audioText: 'Three.',
    answerTranslation: L('셋.', 'Uch.', 'Three.', 'Три.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['numbers', 'three'],
  },

  en_s1u1_n2_004_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      { korean: 'one', native: '1' },
      { korean: 'two', native: '2' },
      { korean: 'three', native: '3' },
      { korean: 'four', native: '4' },
      { korean: 'five', native: '5' },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['numbers', 'matching'],
  },

  en_s1u1_n2_005_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Four.',
    audioText: 'Four.',
    answerTranslation: L('넷.', 'To‘rt.', 'Four.', 'Четыре.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['numbers', 'four'],
  },

  en_s1u1_n2_006_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'one, two, ___',
    blankAnswers: ['three'],
    options: ['three', 'five', 'seven', 'nine'],
    answer: 'three',
    answerTranslation: L(
      '하나, 둘, 셋',
      'bir, ikki, uch',
      'one, two, three',
      'один, два, три',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['numbers', 'sequence'],
  },

  en_s1u1_n2_007_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Five.',
    audioText: 'Five.',
    answerTranslation: L('다섯.', 'Besh.', 'Five.', 'Пять.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['numbers', 'five'],
  },

  en_s1u1_n2_008_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      { korean: 'six', native: '6' },
      { korean: 'seven', native: '7' },
      { korean: 'eight', native: '8' },
      { korean: 'nine', native: '9' },
      { korean: 'ten', native: '10' },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['numbers', 'listening'],
  },

  en_s1u1_n2_009_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Six.',
    audioText: 'Six.',
    answerTranslation: L('여섯.', 'Olti.', 'Six.', 'Шесть.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['numbers', 'six'],
  },

  en_s1u1_n2_010_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'two, four, ___',
    blankAnswers: ['six'],
    options: ['six', 'five', 'eight', 'ten'],
    answer: 'six',
    answerTranslation: L(
      '둘, 넷, 여섯',
      'ikki, to‘rt, olti',
      'two, four, six',
      'два, четыре, шесть',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['numbers', 'sequence'],
  },

  en_s1u1_n2_011_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Seven.',
    audioText: 'Seven.',
    answerTranslation: L('일곱.', 'Yetti.', 'Seven.', 'Семь.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['numbers', 'seven'],
  },

  en_s1u1_n2_012_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      { korean: 'six', native: '6' },
      { korean: 'seven', native: '7' },
      { korean: 'eight', native: '8' },
      { korean: 'nine', native: '9' },
      { korean: 'ten', native: '10' },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['numbers', 'matching'],
  },

  en_s1u1_n2_013_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Eight.',
    audioText: 'Eight.',
    answerTranslation: L('여덟.', 'Sakkiz.', 'Eight.', 'Восемь.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['numbers', 'eight'],
  },

  en_s1u1_n2_014_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'six, eight, ___',
    blankAnswers: ['ten'],
    options: ['ten', 'seven', 'nine', 'five'],
    answer: 'ten',
    answerTranslation: L(
      '여섯, 여덟, 열',
      'olti, sakkiz, o‘n',
      'six, eight, ten',
      'шесть, восемь, десять',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['numbers', 'sequence'],
  },

  en_s1u1_n2_015_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Nine.',
    audioText: 'Nine.',
    answerTranslation: L('아홉.', 'To‘qqiz.', 'Nine.', 'Девять.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['numbers', 'nine'],
  },

  en_s1u1_n2_016_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['three', 'one', 'two', 'five', 'four'],
    answer: 'one two three',
    audioText: 'One, two, three.',
    answerTranslation: L(
      '하나, 둘, 셋.',
      'Bir, ikki, uch.',
      'One, two, three.',
      'Один, два, три.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['numbers', 'arrange'],
  },

  en_s1u1_n2_017_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Ten.',
    audioText: 'Ten.',
    answerTranslation: L('열.', 'O‘n.', 'Ten.', 'Десять.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['numbers', 'ten'],
  },

  en_s1u1_n2_018_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'ten, nine, ___',
    blankAnswers: ['eight'],
    options: ['eight', 'seven', 'six', 'five'],
    answer: 'eight',
    answerTranslation: L(
      '열, 아홉, 여덟',
      'o‘n, to‘qqiz, sakkiz',
      'ten, nine, eight',
      'десять, девять, восемь',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['numbers', 'sequence'],
  },

  en_s1u1_n2_019_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'One, two, three.',
    audioText: 'One, two, three.',
    answerI18n: L(
      '하나 둘 셋',
      'bir ikki uch',
      'one two three',
      'один два три',
    ),
    optionsI18n: {
      ko: ['둘', '넷', '하나', '셋', '다섯'],
      uz: ['ikki', 'to‘rt', 'bir', 'uch', 'besh'],
      en: ['two', 'four', 'one', 'three', 'five'],
      ru: ['два', 'четыре', 'один', 'три', 'пять'],
    },
    answerTranslation: L(
      '하나, 둘, 셋.',
      'Bir, ikki, uch.',
      'One, two, three.',
      'Один, два, три.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['numbers', 'sentence-builder'],
  },

  en_s1u1_n2_020_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'One, two, three, four, five, six, seven, eight, nine, ten.',
    audioText: 'One, two, three, four, five, six, seven, eight, nine, ten.',
    answerTranslation: L(
      '하나부터 열까지.',
      'Birdan o‘ngacha.',
      'One to ten.',
      'От одного до десяти.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['numbers', 'review'],
  },

  // ===========================================================
  // Lesson 2 · Countries
  // ===========================================================

  en_s1u1_n2_021_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      { korean: 'Australia', native: 'Avstraliya' },
      { korean: 'Brazil', native: 'Braziliya' },
      { korean: 'China', native: 'Xitoy' },
      { korean: 'Indonesia', native: 'Indoneziya' },
      { korean: 'Japan', native: 'Yaponiya' },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['countries', 'matching'],
  },

  en_s1u1_n2_022_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Australia.',
    audioText: 'Australia.',
    answerTranslation: L('호주.', 'Avstraliya.', 'Australia.', 'Австралия.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['countries', 'pronunciation'],
  },

  en_s1u1_n2_023_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Brazil.',
    audioText: 'Brazil.',
    answerTranslation: L('브라질.', 'Braziliya.', 'Brazil.', 'Бразилия.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['countries', 'pronunciation'],
  },

  en_s1u1_n2_024_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      { korean: 'Russia', native: 'Rossiya' },
      { korean: 'Spain', native: 'Ispaniya' },
      { korean: 'Turkey', native: 'Turkiya' },
      { korean: 'the UK', native: 'Buyuk Britaniya' },
      { korean: 'the USA', native: 'AQSh' },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['countries', 'listening'],
  },

  en_s1u1_n2_025_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'China.',
    audioText: 'China.',
    answerTranslation: L('중국.', 'Xitoy.', 'China.', 'Китай.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['countries', 'pronunciation'],
  },

  en_s1u1_n2_026_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Sydney is in ___.',
    blankAnswers: ['Australia'],
    options: ['Australia', 'Brazil', 'China', 'Russia'],
    answer: 'Australia',
    answerTranslation: L(
      '시드니는 호주에 있어요.',
      'Sidney Avstraliyada.',
      'Sydney is in Australia.',
      'Сидней находится в Австралии.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['countries', 'cities'],
  },

  en_s1u1_n2_027_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Indonesia.',
    audioText: 'Indonesia.',
    answerTranslation: L(
      '인도네시아.',
      'Indoneziya.',
      'Indonesia.',
      'Индонезия.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['countries', 'pronunciation'],
  },

  en_s1u1_n2_028_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Beijing is in ___.',
    blankAnswers: ['China'],
    options: ['China', 'Japan', 'Turkey', 'Spain'],
    answer: 'China',
    answerTranslation: L(
      '베이징은 중국에 있어요.',
      'Pekin Xitoyda.',
      'Beijing is in China.',
      'Пекин находится в Китае.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['countries', 'cities'],
  },

  en_s1u1_n2_029_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Japan.',
    audioText: 'Japan.',
    answerTranslation: L('일본.', 'Yaponiya.', 'Japan.', 'Япония.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['countries', 'pronunciation'],
  },

  en_s1u1_n2_030_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      { korean: 'Russia', native: 'Rossiya' },
      { korean: 'Spain', native: 'Ispaniya' },
      { korean: 'Turkey', native: 'Turkiya' },
      { korean: 'the UK', native: 'Buyuk Britaniya' },
      { korean: 'the USA', native: 'AQSh' },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['countries', 'matching'],
  },

  en_s1u1_n2_031_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Russia.',
    audioText: 'Russia.',
    answerTranslation: L('러시아.', 'Rossiya.', 'Russia.', 'Россия.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['countries', 'pronunciation'],
  },

  en_s1u1_n2_032_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Rio de Janeiro is in ___.',
    blankAnswers: ['Brazil'],
    options: ['Brazil', 'Spain', 'Russia', 'Australia'],
    answer: 'Brazil',
    answerTranslation: L(
      '리우데자네이루는 브라질에 있어요.',
      'Rio-de-Janeyro Braziliyada.',
      'Rio de Janeiro is in Brazil.',
      'Рио-де-Жанейро находится в Бразилии.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['countries', 'cities'],
  },

  en_s1u1_n2_033_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Spain.',
    audioText: 'Spain.',
    answerTranslation: L('스페인.', 'Ispaniya.', 'Spain.', 'Испания.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['countries', 'pronunciation'],
  },

  en_s1u1_n2_034_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Istanbul is in ___.',
    blankAnswers: ['Turkey'],
    options: ['Turkey', 'Spain', 'Japan', 'China'],
    answer: 'Turkey',
    answerTranslation: L(
      '이스탄불은 튀르키예에 있어요.',
      'Istanbul Turkiyada.',
      'Istanbul is in Turkey.',
      'Стамбул находится в Турции.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['countries', 'cities'],
  },

  en_s1u1_n2_035_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Turkey.',
    audioText: 'Turkey.',
    answerTranslation: L('튀르키예.', 'Turkiya.', 'Turkey.', 'Турция.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['countries', 'pronunciation'],
  },

  en_s1u1_n2_036_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Tokyo is in ___.',
    blankAnswers: ['Japan'],
    options: ['Japan', 'China', 'Indonesia', 'Russia'],
    answer: 'Japan',
    answerTranslation: L(
      '도쿄는 일본에 있어요.',
      'Tokio Yaponiyada.',
      'Tokyo is in Japan.',
      'Токио находится в Японии.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['countries', 'cities'],
  },

  en_s1u1_n2_037_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The UK.',
    audioText: 'The UK.',
    answerTranslation: L(
      '영국.',
      'Buyuk Britaniya.',
      'The UK.',
      'Великобритания.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['countries', 'pronunciation'],
  },

  en_s1u1_n2_038_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Madrid is in ___.',
    blankAnswers: ['Spain'],
    options: ['Spain', 'Brazil', 'Turkey', 'Russia'],
    answer: 'Spain',
    answerTranslation: L(
      '마드리드는 스페인에 있어요.',
      'Madrid Ispaniyada.',
      'Madrid is in Spain.',
      'Мадрид находится в Испании.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['countries', 'cities'],
  },

  en_s1u1_n2_039_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The USA.',
    audioText: 'The USA.',
    answerTranslation: L('미국.', 'AQSh.', 'The USA.', 'США.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['countries', 'pronunciation'],
  },

  en_s1u1_n2_040_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Java is in ___.',
    blankAnswers: ['Indonesia'],
    options: ['Indonesia', 'Japan', 'China', 'Australia'],
    answer: 'Indonesia',
    answerTranslation: L(
      '자바는 인도네시아에 있어요.',
      'Yava Indoneziyada.',
      'Java is in Indonesia.',
      'Ява находится в Индонезии.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['countries', 'cities'],
  },

  // ===========================================================
  // Lesson 3 · Where are you from?
  // be (we / you)
  // ===========================================================

  en_s1u1_n2_041_speaking: {
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
    tags: ['origin', 'question'],
  },

  en_s1u1_n2_042_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Where ___ you from?',
    blankAnswers: ['are'],
    options: ['are', 'am', 'is', 'not'],
    answer: 'are',
    answerTranslation: L(
      '어디 출신이에요?',
      'Qayerdansiz?',
      'Where are you from?',
      'Откуда вы?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'where'],
  },

  en_s1u1_n2_043_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I’m from Brazil.',
    audioText: 'I’m from Brazil.',
    answerTranslation: L(
      '저는 브라질 출신이에요.',
      'Men Braziliyadanman.',
      'I’m from Brazil.',
      'Я из Бразилии.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['origin', 'brazil'],
  },

  en_s1u1_n2_044_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['from', 'Brazil', 'I’m', 'China', 'you'],
    answer: 'I’m from Brazil',
    answerTranslation: L(
      '저는 브라질 출신이에요.',
      'Men Braziliyadanman.',
      'I’m from Brazil.',
      'Я из Бразилии.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['origin', 'builder'],
  },

  en_s1u1_n2_045_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'We’re from China.',
    audioText: 'We’re from China.',
    answerTranslation: L(
      '우리는 중국 출신이에요.',
      'Biz Xitoydanmiz.',
      'We’re from China.',
      'Мы из Китая.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'we', 'positive'],
  },

  en_s1u1_n2_046_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'We ___ from China.',
    blankAnswers: ['are'],
    options: ['are', 'am', 'is', 'not'],
    answer: 'are',
    answerTranslation: L(
      '우리는 중국 출신이에요.',
      'Biz Xitoydanmiz.',
      'We are from China.',
      'Мы из Китая.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'we'],
  },

  en_s1u1_n2_047_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'You’re from the USA.',
    audioText: 'You’re from the USA.',
    answerTranslation: L(
      '당신은 미국 출신이에요.',
      'Siz AQShdansiz.',
      'You’re from the USA.',
      'Вы из США.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'you', 'positive'],
  },

  en_s1u1_n2_048_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['from', 'the USA', 'You’re', 'We’re', 'Brazil'],
    answer: 'You’re from the USA',
    audioText: 'You’re from the USA.',
    answerTranslation: L(
      '당신은 미국 출신이에요.',
      'Siz AQShdansiz.',
      'You’re from the USA.',
      'Вы из США.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'origin', 'arrange'],
  },

  en_s1u1_n2_049_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'We’re not from the USA.',
    audioText: 'We’re not from the USA.',
    answerTranslation: L(
      '우리는 미국 출신이 아니에요.',
      'Biz AQShdan emasmiz.',
      'We’re not from the USA.',
      'Мы не из США.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'we', 'negative'],
  },

  en_s1u1_n2_050_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'We’re ___ from the USA.',
    blankAnswers: ['not'],
    options: ['not', 'are', 'am', 'yes'],
    answer: 'not',
    answerTranslation: L(
      '우리는 미국 출신이 아니에요.',
      'Biz AQShdan emasmiz.',
      'We’re not from the USA.',
      'Мы не из США.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'negative'],
  },

  en_s1u1_n2_051_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'We aren’t from Russia.',
    audioText: 'We aren’t from Russia.',
    answerTranslation: L(
      '우리는 러시아 출신이 아니에요.',
      'Biz Rossiyadan emasmiz.',
      'We aren’t from Russia.',
      'Мы не из России.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'we', 'negative'],
  },

  en_s1u1_n2_052_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'We ___ from Russia.',
    blankAnswers: ['aren’t'],
    options: ['aren’t', 'isn’t', 'am not', 'I’m'],
    answer: 'aren’t',
    answerTranslation: L(
      '우리는 러시아 출신이 아니에요.',
      'Biz Rossiyadan emasmiz.',
      'We aren’t from Russia.',
      'Мы не из России.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'negative'],
  },

  en_s1u1_n2_053_speaking: {
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
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'question', 'spain'],
  },

  en_s1u1_n2_054_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['from', 'Spain', 'Are', 'you', 'We’re', 'Japan'],
    answer: 'Are you from Spain',
    answerTranslation: L(
      '스페인 출신이에요?',
      'Ispaniyadanmisiz?',
      'Are you from Spain?',
      'Вы из Испании?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['be', 'question'],
  },

  en_s1u1_n2_055_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Yes, we are.',
    audioText: 'Yes, we are.',
    answerTranslation: L('네, 맞아요.', 'Ha.', 'Yes, we are.', 'Да.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['short-answer', 'we'],
  },

  en_s1u1_n2_056_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '자연스러운 짧은 대답을 고르세요.',
      'Tabiiy qisqa javobni tanlang.',
      'Choose the correct short answer.',
      'Выберите правильный краткий ответ.',
    ),
    sentenceTemplate: 'Are you from Australia? — Yes, we ___.',
    blankAnswers: ['are'],
    options: ['are', '’re', 'aren’t', 'am'],
    answer: 'are',
    answerTranslation: L(
      '호주 출신이에요? — 네, 맞아요.',
      'Avstraliyadanmisiz? — Ha.',
      'Are you from Australia? — Yes, we are.',
      'Вы из Австралии? — Да.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['short-answer', 'contraction'],
  },

  en_s1u1_n2_057_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'No, we aren’t.',
    audioText: 'No, we aren’t.',
    answerTranslation: L(
      '아니요, 아니에요.',
      'Yo‘q.',
      'No, we aren’t.',
      'Нет.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['short-answer', 'negative'],
  },

  en_s1u1_n2_058_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Are you from Sydney?' }],
    options: [
      'No, we aren’t. We’re from Perth.',
      'Yes, we’re.',
      'No, we not.',
      'We are from?',
    ],
    answer: 'No, we aren’t. We’re from Perth.',
    answerTranslation: L(
      '시드니 출신이에요? — 아니요. 우리는 퍼스 출신이에요.',
      'Sidneydanmisiz? — Yo‘q. Biz Pertdanmiz.',
      'Are you from Sydney? — No, we aren’t. We’re from Perth.',
      'Вы из Сиднея? — Нет. Мы из Перта.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['origin', 'dialog', 'short-answer'],
  },

  en_s1u1_n2_059_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Where are you from?',
    audioText: 'Where are you from?',
    answerI18n: L(
      '어디 출신이에요',
      'Qayerdansiz',
      'Where are you from',
      'Откуда вы',
    ),
    optionsI18n: {
      ko: ['어디', '출신이에요', '누구', '휴가', '여기'],
      uz: ['Qayerdansiz', 'Kimsiz', 'ta’til', 'bu', 'yer'],
      en: ['Where', 'are', 'you', 'from', 'Who', 'holiday'],
      ru: ['Откуда', 'вы', 'Кто', 'отпуск', 'здесь'],
    },
    answerTranslation: L(
      '어디 출신이에요?',
      'Qayerdansiz?',
      'Where are you from?',
      'Откуда вы?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['origin', 'sentence-builder'],
  },

  en_s1u1_n2_060_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Where in Australia?',
    audioText: 'Where in Australia?',
    answerTranslation: L(
      '호주 어디예요?',
      'Avstraliyaning qayeridan?',
      'Where in Australia?',
      'Откуда именно в Австралии?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['origin', 'city'],
  },

  // ===========================================================
  // Lesson 4 · Countries, cities and capital letters
  // cumulative practice + proper nouns
  // ===========================================================

  en_s1u1_n2_061_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I’m from Russia.',
    audioText: 'I’m from Russia.',
    answerTranslation: L(
      '저는 러시아 출신이에요.',
      'Men Rossiyadanman.',
      'I’m from Russia.',
      'Я из России.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['origin', 'russia'],
  },

  en_s1u1_n2_062_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '대문자를 올바르게 쓴 단어를 고르세요.',
      'Bosh harfi to‘g‘ri yozilgan so‘zni tanlang.',
      'Choose the word with the correct capital letter.',
      'Выберите слово с правильной заглавной буквой.',
    ),
    sentenceTemplate: 'I’m from ___.',
    blankAnswers: ['Spain'],
    options: ['Spain', 'spain', 'SPain', 'spAIN'],
    answer: 'Spain',
    answerTranslation: L(
      '저는 스페인 출신이에요.',
      'Men Ispaniyadanman.',
      'I’m from Spain.',
      'Я из Испании.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['capital-letters', 'proper-noun'],
  },

  en_s1u1_n2_063_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'We’re from Perth.',
    audioText: 'We’re from Perth.',
    answerTranslation: L(
      '우리는 퍼스 출신이에요.',
      'Biz Pertdanmiz.',
      'We’re from Perth.',
      'Мы из Перта.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['city', 'origin'],
  },

  en_s1u1_n2_064_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '대문자를 올바르게 쓴 이름을 고르세요.',
      'Bosh harfi to‘g‘ri yozilgan ismni tanlang.',
      'Choose the correctly capitalized name.',
      'Выберите имя с правильной заглавной буквой.',
    ),
    sentenceTemplate: 'Hello, I’m ___.',
    blankAnswers: ['Carlos'],
    options: ['Carlos', 'carlos', 'CARlos', 'carLos'],
    answer: 'Carlos',
    answerTranslation: L(
      '안녕하세요, 저는 카를로스예요.',
      'Salom, men Karlosman.',
      'Hello, I’m Carlos.',
      'Здравствуйте, я Карлос.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['capital-letters', 'proper-noun'],
  },

  en_s1u1_n2_065_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I’m from Canada.',
    audioText: 'I’m from Canada.',
    answerTranslation: L(
      '저는 캐나다 출신이에요.',
      'Men Kanadadanman.',
      'I’m from Canada.',
      'Я из Канады.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['proper-noun', 'origin'],
  },

  en_s1u1_n2_066_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '대문자를 올바르게 쓴 도시 이름을 고르세요.',
      'Shahar nomining to‘g‘ri yozilgan shaklini tanlang.',
      'Choose the correctly capitalized city name.',
      'Выберите название города с правильной заглавной буквой.',
    ),
    sentenceTemplate: 'I’m from ___ in Spain.',
    blankAnswers: ['Seville'],
    options: ['Seville', 'seville', 'SEville', 'seVille'],
    answer: 'Seville',
    answerTranslation: L(
      '저는 스페인 세비야 출신이에요.',
      'Men Ispaniyaning Sevilya shahridanman.',
      'I’m from Seville in Spain.',
      'Я из Севильи в Испании.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['capital-letters', 'city'],
  },

  en_s1u1_n2_067_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'We’re from Chennai in India.',
    audioText: 'We’re from Chennai in India.',
    answerTranslation: L(
      '우리는 인도 첸나이 출신이에요.',
      'Biz Hindistonning Chennay shahridanmiz.',
      'We’re from Chennai in India.',
      'Мы из Ченнаи в Индии.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['proper-noun', 'city', 'country'],
  },

  en_s1u1_n2_068_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['from', 'Turkey', 'I’m', 'turkey', 'Spain'],
    answer: 'I’m from Turkey',
    answerTranslation: L(
      '저는 튀르키예 출신이에요.',
      'Men Turkiyadanman.',
      'I’m from Turkey.',
      'Я из Турции.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['capital-letters', 'builder'],
  },

  en_s1u1_n2_069_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Are you from Sydney?',
    audioText: 'Are you from Sydney?',
    answerTranslation: L(
      '시드니 출신이에요?',
      'Sidneydanmisiz?',
      'Are you from Sydney?',
      'Вы из Сиднея?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['origin', 'question'],
  },

  en_s1u1_n2_070_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Where are you from?' }],
    options: [
      'I’m from Aberdeen.',
      'Yes, I are.',
      'Where from?',
      'I’m not where.',
    ],
    answer: 'I’m from Aberdeen.',
    answerTranslation: L(
      '저는 애버딘 출신이에요.',
      'Men Aberdindanman.',
      'I’m from Aberdeen.',
      'Я из Абердина.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['origin', 'dialog'],
  },

  en_s1u1_n2_071_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'We’re on holiday in Nicaragua.',
    audioText: 'We’re on holiday in Nicaragua.',
    answerTranslation: L(
      '우리는 니카라과에서 휴가 중이에요.',
      'Biz Nikaraguada ta’tildamiz.',
      'We’re on holiday in Nicaragua.',
      'Мы в отпуске в Никарагуа.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['proper-noun', 'holiday'],
  },

  en_s1u1_n2_072_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '대문자를 올바르게 쓴 단어를 고르세요.',
      'Bosh harfi to‘g‘ri yozilgan so‘zni tanlang.',
      'Choose the correctly capitalized word.',
      'Выберите слово с правильной заглавной буквой.',
    ),
    sentenceTemplate: 'We are in a hotel in ___.',
    blankAnswers: ['Granada'],
    options: ['Granada', 'granada', 'GRanada', 'graNada'],
    answer: 'Granada',
    answerTranslation: L(
      '우리는 그라나다의 호텔에 있어요.',
      'Biz Granadadagi mehmonxonadamiz.',
      'We are in a hotel in Granada.',
      'Мы в отеле в Гранаде.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['capital-letters', 'city'],
  },

  en_s1u1_n2_073_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Where in Australia?',
    audioText: 'Where in Australia?',
    answerTranslation: L(
      '호주 어디예요?',
      'Avstraliyaning qayeridan?',
      'Where in Australia?',
      'Откуда именно в Австралии?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['origin', 'follow-up-question'],
  },

  en_s1u1_n2_074_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['Where', 'are', 'you', 'from', 'holiday', 'China'],
    answer: 'Where are you from',
    audioText: 'Where are you from?',
    answerTranslation: L(
      '어디 출신이에요?',
      'Qayerdansiz?',
      'Where are you from?',
      'Откуда вы?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['origin', 'arrange'],
  },

  en_s1u1_n2_075_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'No, we aren’t. We’re from Australia.',
    audioText: 'No, we aren’t. We’re from Australia.',
    answerTranslation: L(
      '아니요. 우리는 호주 출신이에요.',
      'Yo‘q. Biz Avstraliyadanmiz.',
      'No, we aren’t. We’re from Australia.',
      'Нет. Мы из Австралии.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['short-answer', 'origin'],
  },

  en_s1u1_n2_076_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Are you from Sydney?' }],
    options: [
      'No, we aren’t. We’re from Perth.',
      'Yes, we’re.',
      'No, we are Sydney.',
      'Where we from?',
    ],
    answer: 'No, we aren’t. We’re from Perth.',
    answerTranslation: L(
      '시드니 출신이에요? — 아니요. 우리는 퍼스 출신이에요.',
      'Sidneydanmisiz? — Yo‘q. Biz Pertdanmiz.',
      'Are you from Sydney? — No, we aren’t. We’re from Perth.',
      'Вы из Сиднея? — Нет. Мы из Перта.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['short-answer', 'dialog'],
  },

  en_s1u1_n2_077_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '올바른 짧은 대답을 완성하세요.',
      'To‘g‘ri qisqa javobni to‘ldiring.',
      'Complete the correct short answer.',
      'Дополните правильный краткий ответ.',
    ),
    sentenceTemplate: 'Are you from Brazil? — Yes, we ___.',
    blankAnswers: ['are'],
    options: ['are', '’re', 'aren’t', 'am'],
    answer: 'are',
    answerTranslation: L(
      '브라질 출신이에요? — 네, 맞아요.',
      'Braziliyadanmisiz? — Ha.',
      'Are you from Brazil? — Yes, we are.',
      'Вы из Бразилии? — Да.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['short-answer', 'contraction'],
  },

  en_s1u1_n2_078_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'We’re from the UK.',
    audioText: 'We’re from the UK.',
    answerI18n: L(
      '우리는 영국 출신이에요',
      'Biz Buyuk Britaniyadanmiz',
      'We’re from the UK',
      'Мы из Великобритании',
    ),
    optionsI18n: {
      ko: ['우리는', '영국', '출신이에요', '미국', '아니에요'],
      uz: ['Biz', 'Buyuk', 'Britaniyadanmiz', 'AQShdanmiz', 'emas'],
      en: ['We’re', 'from', 'the UK', 'the USA', 'not'],
      ru: ['Мы', 'из', 'Великобритании', 'США', 'не'],
    },
    answerTranslation: L(
      '우리는 영국 출신이에요.',
      'Biz Buyuk Britaniyadanmiz.',
      'We’re from the UK.',
      'Мы из Великобритании.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['origin', 'sentence-builder'],
  },

  en_s1u1_n2_079_speaking: {
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
    tags: ['origin', 'review'],
  },

  en_s1u1_n2_080_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Where are you from?' },
      { speaker: 'user', text: 'I’m from Indonesia.' },
      { speaker: 'npc', text: 'Where in Indonesia?' },
    ],
    options: [
      'I’m from Java.',
      'Yes, I am.',
      'No, we aren’t.',
      'I’m on business.',
    ],
    answer: 'I’m from Java.',
    answerTranslation: L(
      '저는 자바 출신이에요.',
      'Men Yavadanman.',
      'I’m from Java.',
      'Я с Явы.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['origin', 'city', 'review'],
  },
};

// ─────────────────────────────────────────────────────────────
// Node 2
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT1_NODE2 = {
  title: L(
    '어디 출신이에요?',
    'Qayerdansiz?',
    'Where are you from?',
    'Откуда вы?',
  ),
  section: 1,
  unit: 1,
  order: 2,
  isActive: true,

  lessons: [
    {
      title: L(
        '숫자 1부터 10까지',
        '1 dan 10 gacha sonlar',
        'Numbers 1–10',
        'Числа от 1 до 10',
      ),
      description: L(
        '영어 숫자 1부터 10까지 듣고 말해요.',
        'Ingliz tilida 1 dan 10 gacha sonlarni tinglab aytasiz.',
        'Listen to and say the numbers from one to ten.',
        'Слушаем и произносим числа от одного до десяти.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 1,
      questions: [
        'en_s1u1_n2_001_speaking',
        'en_s1u1_n2_002_speaking',
        'en_s1u1_n2_003_speaking',
        'en_s1u1_n2_004_word_matching',
        'en_s1u1_n2_005_speaking',
        'en_s1u1_n2_006_fill_in_blank',
        'en_s1u1_n2_007_speaking',
        'en_s1u1_n2_008_audio_match',
        'en_s1u1_n2_009_speaking',
        'en_s1u1_n2_010_fill_in_blank',
        'en_s1u1_n2_011_speaking',
        'en_s1u1_n2_012_word_matching',
        'en_s1u1_n2_013_speaking',
        'en_s1u1_n2_014_fill_in_blank',
        'en_s1u1_n2_015_speaking',
        'en_s1u1_n2_016_word_arrange',
        'en_s1u1_n2_017_speaking',
        'en_s1u1_n2_018_fill_in_blank',
        'en_s1u1_n2_019_sentence_builder',
        'en_s1u1_n2_020_speaking',
      ],
    },

    {
      title: L('나라 이름', 'Mamlakatlar', 'Countries', 'Страны'),
      description: L(
        '주요 국가 이름을 듣고 말하고 도시와 나라를 연결해요.',
        'Mamlakat nomlarini tinglab aytasiz va shaharlarni mamlakatlar bilan bog‘laysiz.',
        'Listen to and say country names and connect cities with countries.',
        'Слушаем и произносим названия стран и связываем города со странами.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 2,
      questions: [
        'en_s1u1_n2_021_word_matching',
        'en_s1u1_n2_022_speaking',
        'en_s1u1_n2_023_speaking',
        'en_s1u1_n2_024_audio_match',
        'en_s1u1_n2_025_speaking',
        'en_s1u1_n2_026_fill_in_blank',
        'en_s1u1_n2_027_speaking',
        'en_s1u1_n2_028_fill_in_blank',
        'en_s1u1_n2_029_speaking',
        'en_s1u1_n2_030_word_matching',
        'en_s1u1_n2_031_speaking',
        'en_s1u1_n2_032_fill_in_blank',
        'en_s1u1_n2_033_speaking',
        'en_s1u1_n2_034_fill_in_blank',
        'en_s1u1_n2_035_speaking',
        'en_s1u1_n2_036_fill_in_blank',
        'en_s1u1_n2_037_speaking',
        'en_s1u1_n2_038_fill_in_blank',
        'en_s1u1_n2_039_speaking',
        'en_s1u1_n2_040_fill_in_blank',
      ],
    },

    {
      title: L(
        '어디 출신이에요?',
        'Qayerdansiz?',
        'Where are you from?',
        'Откуда вы?',
      ),
      description: L(
        '출신을 묻고 답하며 we와 you에 맞는 be동사를 사용해요.',
        'Kelib chiqish joyini so‘rab-javob berasiz va we hamda you bilan be fe’lini ishlatasiz.',
        'Ask and answer about origin using be with we and you.',
        'Спрашиваем и отвечаем о происхождении, используя be с we и you.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 3,
      questions: [
        'en_s1u1_n2_041_speaking',
        'en_s1u1_n2_042_fill_in_blank',
        'en_s1u1_n2_043_speaking',
        'en_s1u1_n2_044_translate_builder',
        'en_s1u1_n2_045_speaking',
        'en_s1u1_n2_046_fill_in_blank',
        'en_s1u1_n2_047_speaking',
        'en_s1u1_n2_048_word_arrange',
        'en_s1u1_n2_049_speaking',
        'en_s1u1_n2_050_fill_in_blank',
        'en_s1u1_n2_051_speaking',
        'en_s1u1_n2_052_fill_in_blank',
        'en_s1u1_n2_053_speaking',
        'en_s1u1_n2_054_translate_builder',
        'en_s1u1_n2_055_speaking',
        'en_s1u1_n2_056_fill_in_blank',
        'en_s1u1_n2_057_speaking',
        'en_s1u1_n2_058_dialog_complete',
        'en_s1u1_n2_059_sentence_builder',
        'en_s1u1_n2_060_speaking',
      ],
    },

    {
      title: L(
        '나라와 도시',
        'Mamlakat va shaharlar',
        'Countries and cities',
        'Страны и города',
      ),
      description: L(
        '출신 표현을 복습하고 사람·나라·도시 이름의 대문자 규칙을 익혀요.',
        'Kelib chiqish ifodalarini takrorlab, odam, mamlakat va shahar nomlarida bosh harflarni o‘rganasiz.',
        'Review talking about origin and learn capital letters for names, countries, and cities.',
        'Повторяем происхождение и учим заглавные буквы в именах, странах и городах.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 4,
      questions: [
        'en_s1u1_n2_061_speaking',
        'en_s1u1_n2_062_fill_in_blank',
        'en_s1u1_n2_063_speaking',
        'en_s1u1_n2_064_fill_in_blank',
        'en_s1u1_n2_065_speaking',
        'en_s1u1_n2_066_fill_in_blank',
        'en_s1u1_n2_067_speaking',
        'en_s1u1_n2_068_translate_builder',
        'en_s1u1_n2_069_speaking',
        'en_s1u1_n2_070_dialog_complete',
        'en_s1u1_n2_071_speaking',
        'en_s1u1_n2_072_fill_in_blank',
        'en_s1u1_n2_073_speaking',
        'en_s1u1_n2_074_word_arrange',
        'en_s1u1_n2_075_speaking',
        'en_s1u1_n2_076_dialog_complete',
        'en_s1u1_n2_077_fill_in_blank',
        'en_s1u1_n2_078_sentence_builder',
        'en_s1u1_n2_079_speaking',
        'en_s1u1_n2_080_dialog_complete',
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Section 1 · Unit 1 · Node 3
// 1.3 How do you spell that?
//
// Coverage
// - English alphabet A–Z
// - alphabet pronunciation groups
// - capital letter / double letter
// - What's your name?
// - My name's ...
// - How do you spell that?
// - Yes, that's right.
// - What / Where / How
// - What's your first name?
// - What's your last name?
// - Where are you from?
// - Where in ...?
// - What's your phone number?
// - 0 = oh
// - double eight
// - simple registration / conference interaction
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT1_NODE3_WORDS = [
  {
    code: 'en-alphabet-alphabet',
    english: 'alphabet',
    senseKey: 'letters-system',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '알파벳; 문자 체계',
      'alifbo',
      'a set of letters used in a language',
      'алфавит',
    ),
    examples: [
      {
        english: 'Say the alphabet.',
        translations: L(
          '알파벳을 말해 보세요.',
          'Alifboni ayting.',
          'Say the alphabet.',
          'Произнесите алфавит.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈælfəbet/',
      ttsText: 'alphabet',
    },
    media: {
      emoji: '🔤',
      imageUrl: '',
      imageAlt: L(
        '영어 알파벳',
        'ingliz alifbosi',
        'the English alphabet',
        'английский алфавит',
      ),
    },
    tags: ['alphabet', 'spelling'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-person-name',
    english: 'name',
    senseKey: 'person-name',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('이름', 'ism', 'a word used to identify a person', 'имя'),
    examples: [
      {
        english: 'What’s your name?',
        translations: L(
          '이름이 뭐예요?',
          'Ismingiz nima?',
          'What’s your name?',
          'Как вас зовут?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/neɪm/',
      ttsText: 'name',
    },
    media: {
      emoji: '🏷️',
      imageUrl: '',
      imageAlt: L(
        '이름표',
        'ism yozilgan belgi',
        'a name tag',
        'именная карточка',
      ),
    },
    tags: ['personal-information'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-person-first-name',
    english: 'first name',
    senseKey: 'given-name',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L('이름; 성을 제외한 이름', 'ism', 'a person’s given name', 'имя'),
    examples: [
      {
        english: 'What’s your first name?',
        translations: L(
          '이름이 뭐예요?',
          'Ismingiz nima?',
          'What’s your first name?',
          'Как ваше имя?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈfɜːst neɪm/',
      ttsText: 'first name',
    },
    media: {
      emoji: '👤',
      imageUrl: '',
      imageAlt: L(
        '신청서의 이름 칸',
        'formadagi ism qatori',
        'a first-name field on a form',
        'поле имени в анкете',
      ),
    },
    tags: ['personal-information', 'forms'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-person-last-name',
    english: 'last name',
    senseKey: 'family-name',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L('성', 'familiya', 'a person’s family name', 'фамилия'),
    examples: [
      {
        english: 'What’s your last name?',
        translations: L(
          '성이 뭐예요?',
          'Familiyangiz nima?',
          'What’s your last name?',
          'Какая у вас фамилия?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈlɑːst neɪm/',
      ttsText: 'last name',
    },
    media: {
      emoji: '🪪',
      imageUrl: '',
      imageAlt: L(
        '신청서의 성 칸',
        'formadagi familiya qatori',
        'a last-name field on a form',
        'поле фамилии в анкете',
      ),
    },
    tags: ['personal-information', 'forms'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-spell',
    english: 'spell',
    senseKey: 'say-letters',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '철자를 말하다; 철자를 쓰다',
      'harflab aytmoq; harflab yozmoq',
      'to say or write the letters of a word',
      'произносить или писать по буквам',
    ),
    examples: [
      {
        english: 'How do you spell that?',
        translations: L(
          '그거 철자가 어떻게 돼요?',
          'Buni qanday harflaysiz?',
          'How do you spell that?',
          'Как это пишется по буквам?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/spel/',
      ttsText: 'spell',
    },
    media: {
      emoji: '🔡',
      imageUrl: '',
      imageAlt: L(
        '단어의 철자를 하나씩 말하는 모습',
        'so‘zni harflab aytish',
        'spelling a word letter by letter',
        'произнесение слова по буквам',
      ),
    },
    tags: ['alphabet', 'spelling'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-letter-capital',
    english: 'capital',
    senseKey: 'uppercase-letter',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '대문자의',
      'bosh harf',
      'written as an uppercase letter',
      'заглавный',
    ),
    examples: [
      {
        english: 'Capital C.',
        translations: L(
          '대문자 C.',
          'Bosh C harfi.',
          'Capital C.',
          'Заглавная C.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkæpɪtl/',
      ttsText: 'capital',
    },
    media: {
      emoji: '🔠',
      imageUrl: '',
      imageAlt: L('대문자', 'bosh harf', 'a capital letter', 'заглавная буква'),
    },
    tags: ['alphabet', 'spelling'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-letter-double',
    english: 'double',
    senseKey: 'two-same-letters',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '두 개의; 같은 글자가 두 번인',
      'ikkita; ikki marta',
      'two of the same letter or number',
      'двойной; два одинаковых',
    ),
    examples: [
      {
        english: 'Double T.',
        translations: L(
          'T가 두 개예요.',
          'Ikki T.',
          'Double T.',
          'Две буквы T.',
        ),
      },
      {
        english: 'Double eight.',
        translations: L(
          '8이 두 개예요.',
          'Ikki sakkiz.',
          'Double eight.',
          'Две восьмёрки.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈdʌbl/',
      ttsText: 'double',
    },
    media: {
      emoji: '2️⃣',
      imageUrl: '',
      imageAlt: L(
        '같은 것이 두 개',
        'ikkita bir xil narsa',
        'two identical items',
        'два одинаковых элемента',
      ),
    },
    tags: ['alphabet', 'numbers', 'spelling'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-question-what',
    english: 'what',
    senseKey: 'question-word-thing',
    partOfSpeech: WordPartOfSpeech.OTHER,
    meaning: L(
      '무엇; 뭐',
      'nima',
      'a question word used to ask about a thing or information',
      'что',
    ),
    examples: [
      {
        english: 'What’s your name?',
        translations: L(
          '이름이 뭐예요?',
          'Ismingiz nima?',
          'What’s your name?',
          'Как вас зовут?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/wɒt/',
      ttsText: 'what',
    },
    media: {
      emoji: '❓',
      imageUrl: '',
      imageAlt: L(
        '정보를 묻는 질문 표시',
        'ma’lumot so‘rash belgisi',
        'a question asking for information',
        'вопрос о какой-либо информации',
      ),
    },
    tags: ['question-word'],
    difficulty: 1,
    usageNote: L(
      '이름이나 전화번호 같은 정보를 물을 때 사용할 수 있어요.',
      'Ism yoki telefon raqami kabi ma’lumotlarni so‘rashda ishlatiladi.',
      'Used to ask for information such as a name or phone number.',
      'Используется, чтобы спросить имя, номер телефона и другую информацию.',
    ),
    isCore: true,
  },

  {
    code: 'en-question-how',
    english: 'how',
    senseKey: 'question-word-way',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L(
      '어떻게',
      'qanday',
      'a question word used to ask about the way something is done',
      'как',
    ),
    examples: [
      {
        english: 'How do you spell that?',
        translations: L(
          '그거 철자가 어떻게 돼요?',
          'Buni qanday harflaysiz?',
          'How do you spell that?',
          'Как это пишется по буквам?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/haʊ/',
      ttsText: 'how',
    },
    media: {
      emoji: '❔',
      imageUrl: '',
      imageAlt: L(
        '방법을 묻는 질문',
        'usul haqida savol',
        'a question about how something is done',
        'вопрос о способе действия',
      ),
    },
    tags: ['question-word'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-phone',
    english: 'phone',
    senseKey: 'telephone',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('전화; 전화기', 'telefon', 'a telephone', 'телефон'),
    examples: [
      {
        english: 'What’s your phone number?',
        translations: L(
          '전화번호가 뭐예요?',
          'Telefon raqamingiz nima?',
          'What’s your phone number?',
          'Какой у вас номер телефона?',
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
    tags: ['personal-information'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-phrase-phone-number',
    english: 'phone number',
    senseKey: 'telephone-number',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '전화번호',
      'telefon raqami',
      'a number used to call someone',
      'номер телефона',
    ),
    examples: [
      {
        english: 'What’s your phone number?',
        translations: L(
          '전화번호가 뭐예요?',
          'Telefon raqamingiz nima?',
          'What’s your phone number?',
          'Какой у вас номер телефона?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈfəʊn ˌnʌmbə/',
      ttsText: 'phone number',
    },
    media: {
      emoji: '☎️',
      imageUrl: '',
      imageAlt: L(
        '전화번호',
        'telefon raqami',
        'a phone number',
        'номер телефона',
      ),
    },
    tags: ['personal-information', 'numbers'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-response-right',
    english: 'right',
    senseKey: 'correct',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('맞는; 정확한', 'to‘g‘ri', 'correct', 'правильный'),
    examples: [
      {
        english: 'Yes, that’s right.',
        translations: L(
          '네, 맞아요.',
          'Ha, to‘g‘ri.',
          'Yes, that’s right.',
          'Да, всё правильно.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/raɪt/',
      ttsText: 'right',
    },
    media: {
      emoji: '✅',
      imageUrl: '',
      imageAlt: L(
        '정답 표시',
        'to‘g‘ri javob belgisi',
        'a correct-answer symbol',
        'знак правильного ответа',
      ),
    },
    tags: ['conversation', 'spelling'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-address',
    english: 'address',
    senseKey: 'home-address',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('주소', 'manzil', 'details of where someone lives', 'адрес'),
    examples: [
      {
        english: 'What’s your address?',
        translations: L(
          '주소가 뭐예요?',
          'Manzilingiz nima?',
          'What’s your address?',
          'Какой у вас адрес?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/əˈdres/',
      ttsText: 'address',
    },
    media: {
      emoji: '🏠',
      imageUrl: '',
      imageAlt: L(
        '주소가 적힌 집',
        'manzili ko‘rsatilgan uy',
        'a home address',
        'домашний адрес',
      ),
    },
    tags: ['personal-information', 'pronunciation'],
    difficulty: 1,
    isCore: false,
  },

  {
    code: 'en-noun-home',
    english: 'home',
    senseKey: 'place-live',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('집; 가정', 'uy', 'the place where someone lives', 'дом'),
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
      ipa: '/həʊm/',
      ttsText: 'home',
    },
    media: {
      emoji: '🏠',
      imageUrl: '',
      imageAlt: L('집', 'uy', 'a home', 'дом'),
    },
    tags: ['pronunciation', 'places'],
    difficulty: 1,
    isCore: false,
  },

  {
    code: 'en-verb-see',
    english: 'see',
    senseKey: 'use-eyes',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '보다',
      'ko‘rmoq',
      'to notice something with your eyes',
      'видеть',
    ),
    examples: [
      {
        english: 'See you.',
        translations: L(
          '또 봐요.',
          'Ko‘rishguncha.',
          'See you.',
          'До встречи.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/siː/',
      ttsText: 'see',
    },
    media: {
      emoji: '👀',
      imageUrl: '',
      imageAlt: L('눈으로 보는 모습', 'ko‘rish', 'seeing', 'зрение'),
    },
    tags: ['pronunciation'],
    difficulty: 1,
    isCore: false,
  },

  {
    code: 'en-greeting-bye',
    english: 'bye',
    senseKey: 'informal-goodbye',
    partOfSpeech: WordPartOfSpeech.INTERJECTION,
    meaning: L('안녕; 잘 가', 'xayr', 'an informal goodbye', 'пока'),
    examples: [
      {
        english: 'Bye.',
        translations: L('안녕.', 'Xayr.', 'Bye.', 'Пока.'),
      },
    ],
    pronunciation: {
      ipa: '/baɪ/',
      ttsText: 'bye',
    },
    media: {
      emoji: '👋',
      imageUrl: '',
      imageAlt: L(
        '작별 인사하는 사람',
        'xayrlashayotgan odam',
        'a person saying goodbye',
        'человек, который прощается',
      ),
    },
    tags: ['pronunciation', 'greeting'],
    difficulty: 1,
    isCore: false,
  },

  {
    code: 'en-event-conference',
    english: 'conference',
    senseKey: 'formal-meeting',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '회의; 컨퍼런스',
      'konferensiya',
      'a large formal meeting',
      'конференция',
    ),
    examples: [
      {
        english: 'Are you here for the conference?',
        translations: L(
          '컨퍼런스 때문에 여기 오셨어요?',
          'Konferensiya uchun keldingizmi?',
          'Are you here for the conference?',
          'Вы здесь на конференцию?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkɒnfərəns/',
      ttsText: 'conference',
    },
    media: {
      emoji: '🎫',
      imageUrl: '',
      imageAlt: L(
        '컨퍼런스 행사',
        'konferensiya tadbiri',
        'a conference',
        'конференция',
      ),
    },
    tags: ['personal-information', 'conversation'],
    difficulty: 1,
    isCore: false,
  },
  {
    code: 'en-noun-letter',
    english: 'letter',
    senseKey: 'alphabet-symbol',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '글자; 알파벳 문자',
      'harf',
      'a written symbol in an alphabet',
      'буква',
    ),
    examples: [
      {
        english: 'My name has five letters.',
        translations: L(
          '제 이름은 다섯 글자예요.',
          'Mening ismim beshta harfdan iborat.',
          'My name has five letters.',
          'В моём имени пять букв.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈletə(r)/',
      ttsText: 'letter',
    },
    media: {
      emoji: '🔤',
      imageUrl: '',
      imageAlt: L(
        '알파벳 글자',
        'alifbo harfi',
        'an alphabet letter',
        'буква алфавита',
      ),
    },
    tags: ['alphabet', 'spelling'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-meeting',
    english: 'meeting',
    senseKey: 'planned-gathering-of-people',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '회의; 모임',
      'uchrashuv; yig‘ilish',
      'a planned occasion when people meet',
      'встреча; собрание',
    ),
    examples: [
      {
        english: 'What time is the meeting?',
        translations: L(
          '회의가 몇 시예요?',
          'Uchrashuv soat nechada?',
          'What time is the meeting?',
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
        'uchrashuvdagi odamlar',
        'people at a meeting',
        'люди на встрече',
      ),
    },
    tags: ['events', 'time'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-number',
    english: 'number',
    senseKey: 'word-or-symbol-representing-amount',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '숫자; 번호',
      'raqam; son',
      'a word or symbol that represents an amount or position',
      'число; номер',
    ),
    examples: [
      {
        english: 'Number one is China.',
        translations: L(
          '1번은 중국이에요.',
          'Birinchi raqam — Xitoy.',
          'Number one is China.',
          'Номер один — Китай.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈnʌmbə(r)/',
      ttsText: 'number',
    },
    media: {
      emoji: '🔢',
      imageUrl: '',
      imageAlt: L('여러 숫자', 'raqamlar', 'numbers', 'числа'),
    },
    tags: ['numbers', 'personal-information'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-determiner-your',
    english: 'your',
    senseKey: 'belonging-to-person-being-spoken-to',
    partOfSpeech: WordPartOfSpeech.DETERMINER,
    meaning: L(
      '당신의; 너의',
      'sizning; sening',
      'belonging to the person being spoken to',
      'ваш; твой',
    ),
    examples: [
      {
        english: 'What is your name?',
        translations: L(
          '이름이 뭐예요?',
          'Ismingiz nima?',
          'What is your name?',
          'Как вас зовут?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/jɔː(r)/',
      ttsText: 'your',
    },
    media: {
      emoji: '👉',
      imageUrl: '',
      imageAlt: L(
        '상대방의 것을 가리키는 표현',
        'suhbatdoshga tegishli narsani ko‘rsatish',
        'something belonging to another person',
        'то, что принадлежит собеседнику',
      ),
    },
    tags: ['determiner', 'personal-information'],
    difficulty: 1,
    isCore: true,
  },
];

export const EN_S1_UNIT1_NODE3_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · A–M
  // ===========================================================

  en_s1u1_n3_001_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'A.',
    audioText: 'A.',
    answerTranslation: L('A.', 'A.', 'A.', 'A.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['alphabet', 'A'],
  },

  en_s1u1_n3_002_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'B. C. D. E.',
    audioText: 'B. C. D. E.',
    answerTranslation: L(
      'B, C, D, E.',
      'B, C, D, E.',
      'B, C, D, E.',
      'B, C, D, E.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['alphabet', 'B', 'C', 'D', 'E'],
  },

  en_s1u1_n3_003_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A, B, C, ___',
    blankAnswers: ['D'],
    options: ['D', 'G', 'J', 'M'],
    answer: 'D',
    answerTranslation: L(
      'A, B, C, D',
      'A, B, C, D',
      'A, B, C, D',
      'A, B, C, D',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['alphabet', 'sequence'],
  },

  en_s1u1_n3_004_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'F. G. H.',
    audioText: 'F. G. H.',
    answerTranslation: L('F, G, H.', 'F, G, H.', 'F, G, H.', 'F, G, H.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['alphabet', 'F', 'G', 'H'],
  },

  en_s1u1_n3_005_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      { korean: 'A', native: 'A' },
      { korean: 'B', native: 'B' },
      { korean: 'C', native: 'C' },
      { korean: 'D', native: 'D' },
      { korean: 'E', native: 'E' },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['alphabet', 'listening'],
  },

  en_s1u1_n3_006_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I. J.',
    audioText: 'I. J.',
    answerTranslation: L('I, J.', 'I, J.', 'I, J.', 'I, J.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['alphabet', 'I', 'J'],
  },

  en_s1u1_n3_007_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['C', 'A', 'E', 'B', 'D'],
    answer: 'A B C D E',
    audioText: 'A, B, C, D, E.',
    answerTranslation: L(
      'A, B, C, D, E.',
      'A, B, C, D, E.',
      'A, B, C, D, E.',
      'A, B, C, D, E.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['alphabet', 'arrange'],
  },

  en_s1u1_n3_008_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'K. L. M.',
    audioText: 'K. L. M.',
    answerTranslation: L('K, L, M.', 'K, L, M.', 'K, L, M.', 'K, L, M.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['alphabet', 'K', 'L', 'M'],
  },

  en_s1u1_n3_009_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'F, G, H, ___',
    blankAnswers: ['I'],
    options: ['I', 'E', 'K', 'M'],
    answer: 'I',
    answerTranslation: L(
      'F, G, H, I',
      'F, G, H, I',
      'F, G, H, I',
      'F, G, H, I',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['alphabet', 'sequence'],
  },

  en_s1u1_n3_010_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'A, B, C, D, E, F.',
    audioText: 'A, B, C, D, E, F.',
    answerTranslation: L(
      'A부터 F까지.',
      'A dan F gacha.',
      'A through F.',
      'От A до F.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['alphabet', 'review'],
  },

  en_s1u1_n3_011_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      { korean: 'F', native: 'F' },
      { korean: 'G', native: 'G' },
      { korean: 'H', native: 'H' },
      { korean: 'I', native: 'I' },
      { korean: 'J', native: 'J' },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['alphabet', 'matching'],
  },

  en_s1u1_n3_012_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'G. J.',
    audioText: 'G. J.',
    answerTranslation: L('G와 J.', 'G va J.', 'G and J.', 'G и J.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['alphabet', 'similar-sounds'],
  },

  en_s1u1_n3_013_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '들은 글자를 고르세요.',
      'Eshitgan harfni tanlang.',
      'Choose the letter you hear.',
      'Выберите услышанную букву.',
    ),
    sentenceTemplate: '___',
    blankAnswers: ['E'],
    options: ['E', 'I', 'A', 'R'],
    answer: 'E',
    audioText: 'E.',
    answerTranslation: L('E.', 'E.', 'E.', 'E.'),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['alphabet', 'listening', 'E-I'],
  },

  en_s1u1_n3_014_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'E. I.',
    audioText: 'E. I.',
    answerTranslation: L('E, I.', 'E, I.', 'E, I.', 'E, I.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['alphabet', 'similar-sounds'],
  },

  en_s1u1_n3_015_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      { korean: 'I', native: 'I' },
      { korean: 'J', native: 'J' },
      { korean: 'K', native: 'K' },
      { korean: 'L', native: 'L' },
      { korean: 'M', native: 'M' },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['alphabet', 'listening'],
  },

  en_s1u1_n3_016_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'F. V.',
    audioText: 'F. V.',
    answerTranslation: L('F, V.', 'F, V.', 'F, V.', 'F, V.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['alphabet', 'similar-sounds'],
  },

  en_s1u1_n3_017_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'J, K, L, ___',
    blankAnswers: ['M'],
    options: ['M', 'N', 'I', 'H'],
    answer: 'M',
    answerTranslation: L(
      'J, K, L, M',
      'J, K, L, M',
      'J, K, L, M',
      'J, K, L, M',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['alphabet', 'sequence'],
  },

  en_s1u1_n3_018_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'A, B, C, D, E, F, G, H, I, J, K, L, M.',
    audioText: 'A, B, C, D, E, F, G, H, I, J, K, L, M.',
    answerTranslation: L(
      'A부터 M까지.',
      'A dan M gacha.',
      'A through M.',
      'От A до M.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['alphabet', 'review'],
  },

  en_s1u1_n3_019_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['J', 'G', 'H', 'I', 'K'],
    answer: 'G H I J K',
    audioText: 'G, H, I, J, K.',
    answerTranslation: L(
      'G, H, I, J, K.',
      'G, H, I, J, K.',
      'G, H, I, J, K.',
      'G, H, I, J, K.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['alphabet', 'arrange'],
  },

  en_s1u1_n3_020_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The English alphabet.',
    audioText: 'The English alphabet.',
    answerTranslation: L(
      '영어 알파벳.',
      'Ingliz alifbosi.',
      'The English alphabet.',
      'Английский алфавит.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['alphabet'],
  },

  // ===========================================================
  // Lesson 2 · N–Z + alphabet sounds
  // ===========================================================

  en_s1u1_n3_021_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'N. O. P. Q. R.',
    audioText: 'N. O. P. Q. R.',
    answerTranslation: L(
      'N, O, P, Q, R.',
      'N, O, P, Q, R.',
      'N, O, P, Q, R.',
      'N, O, P, Q, R.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['alphabet', 'N', 'O', 'P', 'Q', 'R'],
  },

  en_s1u1_n3_022_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'S. T. U. V. W.',
    audioText: 'S. T. U. V. W.',
    answerTranslation: L(
      'S, T, U, V, W.',
      'S, T, U, V, W.',
      'S, T, U, V, W.',
      'S, T, U, V, W.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['alphabet', 'S', 'T', 'U', 'V', 'W'],
  },

  en_s1u1_n3_023_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      { korean: 'N', native: 'N' },
      { korean: 'O', native: 'O' },
      { korean: 'P', native: 'P' },
      { korean: 'Q', native: 'Q' },
      { korean: 'R', native: 'R' },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['alphabet', 'listening'],
  },

  en_s1u1_n3_024_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'X. Y. Z.',
    audioText: 'X. Y. Z.',
    answerTranslation: L('X, Y, Z.', 'X, Y, Z.', 'X, Y, Z.', 'X, Y, Z.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['alphabet', 'X', 'Y', 'Z'],
  },

  en_s1u1_n3_025_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'N, O, P, ___',
    blankAnswers: ['Q'],
    options: ['Q', 'R', 'S', 'M'],
    answer: 'Q',
    answerTranslation: L(
      'N, O, P, Q',
      'N, O, P, Q',
      'N, O, P, Q',
      'N, O, P, Q',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['alphabet', 'sequence'],
  },

  en_s1u1_n3_026_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Q. U. W.',
    audioText: 'Q. U. W.',
    answerTranslation: L('Q, U, W.', 'Q, U, W.', 'Q, U, W.', 'Q, U, W.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['alphabet', 'you-sound'],
  },

  en_s1u1_n3_027_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '“you”와 비슷한 소리로 시작하는 글자를 고르세요.',
      '“you”ga o‘xshash tovush bilan aytiladigan harfni tanlang.',
      'Choose a letter pronounced with the “you” sound.',
      'Выберите букву, произносимую со звуком, похожим на “you”.',
    ),
    sentenceTemplate: '___',
    blankAnswers: ['U'],
    options: ['U', 'O', 'I', 'R'],
    answer: 'U',
    answerTranslation: L('U.', 'U.', 'U.', 'U.'),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['alphabet', 'pronunciation'],
  },

  en_s1u1_n3_028_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'R.',
    audioText: 'R.',
    answerTranslation: L('R.', 'R.', 'R.', 'R.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['alphabet', 'R', 'pronunciation'],
  },

  en_s1u1_n3_029_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '글자와 발음을 기억하기 위한 단어를 연결하세요.',
      'Harfni eslab qolish uchun mos talaffuz so‘zi bilan bog‘lang.',
      'Match each letter with its pronunciation reminder.',
      'Соедините букву со словом-подсказкой для произношения.',
    ),
    pairs: [
      { korean: 'A', native: 'day' },
      { korean: 'E', native: 'meet' },
      { korean: 'I', native: 'hi' },
      { korean: 'O', native: 'no' },
      { korean: 'U', native: 'you' },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['alphabet', 'pronunciation'],
  },

  en_s1u1_n3_030_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'A. H. J. K.',
    audioText: 'A. H. J. K.',
    answerTranslation: L(
      'A, H, J, K.',
      'A, H, J, K.',
      'A, H, J, K.',
      'A, H, J, K.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['alphabet', 'pronunciation', 'ay-sound'],
  },

  en_s1u1_n3_031_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '“no”와 비슷한 소리로 말하는 글자를 고르세요.',
      '“no”ga o‘xshash tovush bilan aytiladigan harfni tanlang.',
      'Choose the letter pronounced like the vowel sound in “no”.',
      'Выберите букву со звуком, похожим на гласный в “no”.',
    ),
    sentenceTemplate: '___',
    blankAnswers: ['O'],
    options: ['O', 'U', 'I', 'A'],
    answer: 'O',
    answerTranslation: L('O.', 'O.', 'O.', 'O.'),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['alphabet', 'pronunciation'],
  },

  en_s1u1_n3_032_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'B. C. D. E. G. P. T. V.',
    audioText: 'B. C. D. E. G. P. T. V.',
    answerTranslation: L(
      'B, C, D, E, G, P, T, V.',
      'B, C, D, E, G, P, T, V.',
      'B, C, D, E, G, P, T, V.',
      'B, C, D, E, G, P, T, V.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['alphabet', 'pronunciation', 'ee-sound'],
  },

  en_s1u1_n3_033_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '“are”처럼 들리는 글자를 고르세요.',
      '“are”ga o‘xshash aytiladigan harfni tanlang.',
      'Choose the letter pronounced like “are”.',
      'Выберите букву, которая произносится похоже на “are”.',
    ),
    sentenceTemplate: '___',
    blankAnswers: ['R'],
    options: ['R', 'A', 'O', 'Y'],
    answer: 'R',
    answerTranslation: L('R.', 'R.', 'R.', 'R.'),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['alphabet', 'pronunciation'],
  },

  en_s1u1_n3_034_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I. Y.',
    audioText: 'I. Y.',
    answerTranslation: L('I, Y.', 'I, Y.', 'I, Y.', 'I, Y.'),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['alphabet', 'pronunciation', 'eye-sound'],
  },

  en_s1u1_n3_035_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: L(
      '글자를 듣고 발음이 비슷한 단어와 연결하세요.',
      'Harfni tinglab, talaffuzi o‘xshash so‘z bilan moslang.',
      'Listen and match each letter with the pronunciation reminder.',
      'Прослушайте буквы и сопоставьте их со словами-подсказками.',
    ),
    pairs: [
      { korean: 'A', native: 'eight' },
      { korean: 'B', native: 'three' },
      { korean: 'F', native: 'ten' },
      { korean: 'I', native: 'five' },
      { korean: 'O', native: 'no' },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['alphabet', 'pronunciation'],
  },

  en_s1u1_n3_036_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'F. L. M. N. S. X. Z.',
    audioText: 'F. L. M. N. S. X. Z.',
    answerTranslation: L(
      'F, L, M, N, S, X, Z.',
      'F, L, M, N, S, X, Z.',
      'F, L, M, N, S, X, Z.',
      'F, L, M, N, S, X, Z.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['alphabet', 'pronunciation'],
  },

  en_s1u1_n3_037_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['R', 'H', 'T'],
    answer: 'H R',
    audioText: 'H R.',
    answerTranslation: L('H-R.', 'H-R.', 'H-R.', 'H-R.'),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['alphabet', 'abbreviation'],
  },

  en_s1u1_n3_038_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'H-R.',
    audioText: 'H-R.',
    answerTranslation: L('H-R.', 'H-R.', 'H-R.', 'H-R.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['alphabet', 'abbreviation'],
  },

  en_s1u1_n3_039_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'X, Y, ___',
    blankAnswers: ['Z'],
    options: ['Z', 'W', 'V', 'S'],
    answer: 'Z',
    answerTranslation: L('X, Y, Z', 'X, Y, Z', 'X, Y, Z', 'X, Y, Z'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['alphabet', 'sequence'],
  },

  en_s1u1_n3_040_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'T-V. F-A-Q. I-M-F. A-S-A-P. W-H-O.',
    audioText: 'T-V. F-A-Q. I-M-F. A-S-A-P. W-H-O.',
    answerTranslation: L(
      'TV, FAQ, IMF, ASAP, WHO의 글자를 말해요.',
      'TV, FAQ, IMF, ASAP va WHO harflarini aytamiz.',
      'T-V. F-A-Q. I-M-F. A-S-A-P. W-H-O.',
      'Произнесите по буквам TV, FAQ, IMF, ASAP и WHO.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['alphabet', 'abbreviation', 'review'],
  },

  // ===========================================================
  // Lesson 3 · What's your name?
  // Name + spelling + capital / double
  // ===========================================================

  en_s1u1_n3_041_speaking: {
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
    tags: ['name', 'question'],
  },

  en_s1u1_n3_042_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ your name?',
    blankAnswers: ['What’s'],
    options: ['What’s', 'Where', 'How', 'Are'],
    answer: 'What’s',
    answerTranslation: L(
      '이름이 뭐예요?',
      'Ismingiz nima?',
      'What’s your name?',
      'Как вас зовут?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['what', 'name'],
  },

  en_s1u1_n3_043_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'My name’s Roger.',
    audioText: 'My name’s Roger.',
    answerTranslation: L(
      '제 이름은 로저예요.',
      'Mening ismim Roger.',
      'My name’s Roger.',
      'Меня зовут Роджер.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['name', 'introduction'],
  },

  en_s1u1_n3_044_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['name’s', 'My', 'Roger', 'How', 'from'],
    answer: 'My name’s Roger',
    answerTranslation: L(
      '제 이름은 로저예요.',
      'Mening ismim Roger.',
      'My name’s Roger.',
      'Меня зовут Роджер.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['name', 'builder'],
  },

  en_s1u1_n3_045_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'How do you spell that?',
    audioText: 'How do you spell that?',
    answerTranslation: L(
      '그거 철자가 어떻게 돼요?',
      'Buni qanday harflaysiz?',
      'How do you spell that?',
      'Как это пишется по буквам?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['spelling', 'how'],
  },

  en_s1u1_n3_046_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'How do you ___ that?',
    blankAnswers: ['spell'],
    options: ['spell', 'name', 'from', 'meet'],
    answer: 'spell',
    answerTranslation: L(
      '그거 철자가 어떻게 돼요?',
      'Buni qanday harflaysiz?',
      'How do you spell that?',
      'Как это пишется по буквам?',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['spell'],
  },

  en_s1u1_n3_047_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'R-O-G-E-R.',
    audioText: 'R-O-G-E-R.',
    answerTranslation: L(
      'R-O-G-E-R.',
      'R-O-G-E-R.',
      'R-O-G-E-R.',
      'R-O-G-E-R.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['spelling', 'name'],
  },

  en_s1u1_n3_048_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['G', 'R', 'E', 'O', 'R'],
    answer: 'R O G E R',
    audioText: 'R-O-G-E-R.',
    answerTranslation: L(
      'R-O-G-E-R.',
      'R-O-G-E-R.',
      'R-O-G-E-R.',
      'R-O-G-E-R.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['spelling', 'arrange'],
  },

  en_s1u1_n3_049_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Yes, that’s right.',
    audioText: 'Yes, that’s right.',
    answerTranslation: L(
      '네, 맞아요.',
      'Ha, to‘g‘ri.',
      'Yes, that’s right.',
      'Да, всё правильно.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['spelling', 'confirmation'],
  },

  en_s1u1_n3_050_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'How do you spell your name?' },
      { speaker: 'user', text: 'M-A-Y-A.' },
      { speaker: 'npc', text: 'M-A-Y-A?' },
    ],
    options: [
      'Yes, that’s right.',
      'I’m from Maya.',
      'What’s from?',
      'No, I’m holiday.',
    ],
    answer: 'Yes, that’s right.',
    answerTranslation: L(
      '네, 맞아요.',
      'Ha, to‘g‘ri.',
      'Yes, that’s right.',
      'Да, всё правильно.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['spelling', 'dialog'],
  },

  en_s1u1_n3_051_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Capital C.',
    audioText: 'Capital C.',
    answerTranslation: L(
      '대문자 C.',
      'Bosh C harfi.',
      'Capital C.',
      'Заглавная C.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['capital', 'spelling'],
  },

  en_s1u1_n3_052_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ C.',
    blankAnswers: ['Capital'],
    options: ['Capital', 'Double', 'Phone', 'Name'],
    answer: 'Capital',
    answerTranslation: L(
      '대문자 C.',
      'Bosh C harfi.',
      'Capital C.',
      'Заглавная C.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['capital', 'spelling'],
  },

  en_s1u1_n3_053_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Double T.',
    audioText: 'Double T.',
    answerTranslation: L(
      'T가 두 개예요.',
      'Ikki T.',
      'Double T.',
      'Две буквы T.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['double', 'spelling'],
  },

  en_s1u1_n3_054_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'How do you spell that?',
    audioText: 'How do you spell that?',
    answerI18n: L(
      '그거 철자가 어떻게 돼요',
      'Buni qanday harflaysiz',
      'How do you spell that',
      'Как это пишется по буквам',
    ),
    optionsI18n: {
      ko: ['그거', '철자가', '어떻게', '돼요', '이름이', '어디'],
      uz: ['Buni', 'qanday', 'harflaysiz', 'ism', 'qayer'],
      en: ['How', 'do', 'you', 'spell', 'that', 'Where'],
      ru: ['Как', 'это', 'пишется', 'по', 'буквам', 'Откуда'],
    },
    answerTranslation: L(
      '그거 철자가 어떻게 돼요?',
      'Buni qanday harflaysiz?',
      'How do you spell that?',
      'Как это пишется по буквам?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['spelling', 'sentence-builder'],
  },

  en_s1u1_n3_055_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'What’s your last name?',
    audioText: 'What’s your last name?',
    answerTranslation: L(
      '성이 뭐예요?',
      'Familiyangiz nima?',
      'What’s your last name?',
      'Какая у вас фамилия?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['last-name'],
  },

  en_s1u1_n3_056_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'What’s your ___ name?',
    blankAnswers: ['last'],
    options: ['last', 'spell', 'where', 'phone'],
    answer: 'last',
    answerTranslation: L(
      '성이 뭐예요?',
      'Familiyangiz nima?',
      'What’s your last name?',
      'Какая у вас фамилия?',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['last-name'],
  },

  en_s1u1_n3_057_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'K-E-I-R-A.',
    audioText: 'K-E-I-R-A.',
    answerTranslation: L(
      'K-E-I-R-A.',
      'K-E-I-R-A.',
      'K-E-I-R-A.',
      'K-E-I-R-A.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['spelling', 'name'],
  },

  en_s1u1_n3_058_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: L(
      '이름의 철자를 듣고 알맞은 이름과 연결하세요.',
      'Ismning harflanishini tinglab, to‘g‘ri ism bilan moslang.',
      'Listen to each spelling and match it with the correct name.',
      'Прослушайте написание по буквам и сопоставьте его с именем.',
    ),
    pairs: [
      { korean: 'A-N-N-A', native: 'Anna' },
      { korean: 'M-A-Y-A', native: 'Maya' },
      { korean: 'R-O-G-E-R', native: 'Roger' },
      { korean: 'L-E-O', native: 'Leo' },
      { korean: 'S-A-R-A', native: 'Sara' },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['spelling', 'names', 'listening'],
  },

  en_s1u1_n3_059_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'How do you spell your name?',
    audioText: 'How do you spell your name?',
    answerTranslation: L(
      '이름 철자가 어떻게 돼요?',
      'Ismingizni qanday harflaysiz?',
      'How do you spell your name?',
      'Как пишется ваше имя по буквам?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['spelling', 'name'],
  },

  en_s1u1_n3_060_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['How', 'do', 'you', 'spell', 'that', 'What'],
    answer: 'How do you spell that',
    answerTranslation: L(
      '그거 철자가 어떻게 돼요?',
      'Buni qanday harflaysiz?',
      'How do you spell that?',
      'Как это пишется по буквам?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['spelling', 'review'],
  },

  // ===========================================================
  // Lesson 4 · What / Where / How
  // Personal information
  // ===========================================================

  en_s1u1_n3_061_speaking: {
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
    tags: ['what', 'name'],
  },

  en_s1u1_n3_062_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ your name?',
    blankAnswers: ['What’s'],
    options: ['What’s', 'How', 'Where', 'Are'],
    answer: 'What’s',
    answerTranslation: L(
      '이름이 뭐예요?',
      'Ismingiz nima?',
      'What’s your name?',
      'Как вас зовут?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['question-word', 'what'],
  },

  en_s1u1_n3_063_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'How do you spell that?',
    audioText: 'How do you spell that?',
    answerTranslation: L(
      '그거 철자가 어떻게 돼요?',
      'Buni qanday harflaysiz?',
      'How do you spell that?',
      'Как это пишется по буквам?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['question-word', 'how'],
  },

  en_s1u1_n3_064_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ do you spell that?',
    blankAnswers: ['How'],
    options: ['How', 'What', 'Where', 'Are'],
    answer: 'How',
    answerTranslation: L(
      '그거 철자가 어떻게 돼요?',
      'Buni qanday harflaysiz?',
      'How do you spell that?',
      'Как это пишется по буквам?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['question-word', 'how'],
  },

  en_s1u1_n3_065_speaking: {
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
    tags: ['question-word', 'where'],
  },

  en_s1u1_n3_066_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['Where', 'are', 'you', 'from', 'How', 'name'],
    answer: 'Where are you from',
    answerTranslation: L(
      '어디 출신이에요?',
      'Qayerdansiz?',
      'Where are you from?',
      'Откуда вы?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['question-word', 'where'],
  },

  en_s1u1_n3_067_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Where in Spain?',
    audioText: 'Where in Spain?',
    answerTranslation: L(
      '스페인 어디예요?',
      'Ispaniyaning qayeridan?',
      'Where in Spain?',
      'Откуда именно в Испании?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['question-word', 'where', 'country'],
  },

  en_s1u1_n3_068_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ in Spain?',
    blankAnswers: ['Where'],
    options: ['Where', 'What', 'How', 'Who'],
    answer: 'Where',
    answerTranslation: L(
      '스페인 어디예요?',
      'Ispaniyaning qayeridan?',
      'Where in Spain?',
      'Откуда именно в Испании?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['question-word', 'where'],
  },

  en_s1u1_n3_069_speaking: {
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
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['what', 'phone-number'],
  },

  en_s1u1_n3_070_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What’s your phone number?' }],
    options: [
      'It’s 020 7355 2488.',
      'I’m from Brazil.',
      'My name’s Sara.',
      'S-A-R-A.',
    ],
    answer: 'It’s 020 7355 2488.',
    answerTranslation: L(
      '020 7355 2488이에요.',
      '020 7355 2488.',
      'It’s 020 7355 2488.',
      '020 7355 2488.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['phone-number', 'dialog'],
  },

  en_s1u1_n3_071_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Oh.',
    audioText: 'Oh.',
    answerTranslation: L(
      '전화번호에서 0.',
      'Telefon raqamida 0.',
      'Zero when saying a phone number.',
      'Ноль при произнесении номера телефона.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['phone-number', 'zero', 'oh'],
  },

  en_s1u1_n3_072_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '전화번호에서 0을 읽는 말을 고르세요.',
      'Telefon raqamida 0 ni qanday aytishni tanlang.',
      'Choose how 0 is commonly said in a phone number.',
      'Выберите, как обычно произносится 0 в номере телефона.',
    ),
    sentenceTemplate: '0 = ___',
    blankAnswers: ['oh'],
    options: ['oh', 'one', 'double', 'zeroes'],
    answer: 'oh',
    answerTranslation: L(
      '전화번호에서 0은 “oh”라고 말할 수 있어요.',
      'Telefon raqamida 0 ni “oh” deb aytish mumkin.',
      '0 can be said as “oh” in a phone number.',
      'В номере телефона 0 можно произносить как “oh”.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['phone-number', 'oh'],
  },

  en_s1u1_n3_073_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Double eight.',
    audioText: 'Double eight.',
    answerTranslation: L(
      '8이 두 개.',
      'Ikki sakkiz.',
      'Double eight.',
      'Две восьмёрки.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['phone-number', 'double'],
  },

  en_s1u1_n3_074_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'What’s your phone number?',
    audioText: 'What’s your phone number?',
    answerI18n: L(
      '전화번호가 뭐예요',
      'Telefon raqamingiz nima',
      'What’s your phone number',
      'Какой у вас номер телефона',
    ),
    optionsI18n: {
      ko: ['전화번호가', '뭐예요', '이름이', '어디', '철자가'],
      uz: ['Telefon', 'raqamingiz', 'nima', 'ismingiz', 'qayer'],
      en: ['What’s', 'your', 'phone', 'number', 'Where', 'name'],
      ru: ['Какой', 'у', 'вас', 'номер', 'телефона', 'Откуда'],
    },
    answerTranslation: L(
      '전화번호가 뭐예요?',
      'Telefon raqamingiz nima?',
      'What’s your phone number?',
      'Какой у вас номер телефона?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['phone-number', 'sentence-builder'],
  },

  en_s1u1_n3_075_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'What’s your first name?',
    audioText: 'What’s your first name?',
    answerTranslation: L(
      '이름이 뭐예요?',
      'Ismingiz nima?',
      'What’s your first name?',
      'Как ваше имя?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['first-name', 'forms'],
  },

  en_s1u1_n3_076_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'What’s your ___ name?',
    blankAnswers: ['first'],
    options: ['first', 'phone', 'country', 'spell'],
    answer: 'first',
    answerTranslation: L(
      '이름이 뭐예요?',
      'Ismingiz nima?',
      'What’s your first name?',
      'Как ваше имя?',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['first-name', 'forms'],
  },

  en_s1u1_n3_077_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Are you here for the conference?',
    audioText: 'Are you here for the conference?',
    answerTranslation: L(
      '컨퍼런스 때문에 여기 오셨어요?',
      'Konferensiya uchun keldingizmi?',
      'Are you here for the conference?',
      'Вы здесь на конференцию?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['conference', 'conversation'],
  },

  en_s1u1_n3_078_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'What’s your name?' },
      { speaker: 'user', text: 'My name’s Maya Kim.' },
      { speaker: 'npc', text: 'How do you spell Maya?' },
    ],
    options: [
      'M-A-Y-A.',
      'I’m from Maya.',
      'Yes, I am Maya.',
      'My phone is Korea.',
    ],
    answer: 'M-A-Y-A.',
    answerTranslation: L('M-A-Y-A.', 'M-A-Y-A.', 'M-A-Y-A.', 'M-A-Y-A.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['name', 'spelling', 'dialog'],
  },

  en_s1u1_n3_079_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Thanks. Have a nice day.',
    audioText: 'Thanks. Have a nice day.',
    answerTranslation: L(
      '고마워요. 좋은 하루 보내세요.',
      'Rahmat. Kuningiz yaxshi o‘tsin.',
      'Thanks. Have a nice day.',
      'Спасибо. Хорошего дня.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['conversation', 'closing'],
  },

  en_s1u1_n3_080_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['phone', 'your', 'What’s', 'number', 'name'],
    answer: 'What’s your phone number',
    audioText: 'What’s your phone number?',
    answerTranslation: L(
      '전화번호가 뭐예요?',
      'Telefon raqamingiz nima?',
      'What’s your phone number?',
      'Какой у вас номер телефона?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['question-words', 'review'],
  },
};

// ─────────────────────────────────────────────────────────────
// Node 3
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT1_NODE3 = {
  title: L(
    '철자가 어떻게 돼요?',
    'Qanday harflanadi?',
    'How do you spell that?',
    'Как это пишется?',
  ),
  section: 1,
  unit: 1,
  order: 3,
  isActive: true,

  lessons: [
    {
      title: L('알파벳 A–M', 'A–M alifbosi', 'The alphabet A–M', 'Алфавит A–M'),
      description: L(
        '영어 알파벳 A부터 M까지 듣고 말해요.',
        'Ingliz alifbosining A dan M gacha harflarini tinglab aytasiz.',
        'Listen to and say the letters A through M.',
        'Слушаем и произносим буквы от A до M.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 1,
      questions: [
        'en_s1u1_n3_001_speaking',
        'en_s1u1_n3_002_speaking',
        'en_s1u1_n3_003_fill_in_blank',
        'en_s1u1_n3_004_speaking',
        'en_s1u1_n3_005_audio_match',
        'en_s1u1_n3_006_speaking',
        'en_s1u1_n3_007_word_arrange',
        'en_s1u1_n3_008_speaking',
        'en_s1u1_n3_009_fill_in_blank',
        'en_s1u1_n3_010_speaking',
        'en_s1u1_n3_011_word_matching',
        'en_s1u1_n3_012_speaking',
        'en_s1u1_n3_013_fill_in_blank',
        'en_s1u1_n3_014_speaking',
        'en_s1u1_n3_015_audio_match',
        'en_s1u1_n3_016_speaking',
        'en_s1u1_n3_017_fill_in_blank',
        'en_s1u1_n3_018_speaking',
        'en_s1u1_n3_019_word_arrange',
        'en_s1u1_n3_020_speaking',
      ],
    },

    {
      title: L('알파벳 N–Z', 'N–Z alifbosi', 'The alphabet N–Z', 'Алфавит N–Z'),
      description: L(
        'N부터 Z까지 말하고 비슷한 알파벳 발음을 구별해요.',
        'N dan Z gacha harflarni aytib, o‘xshash talaffuzlarni farqlaysiz.',
        'Say N through Z and recognize common alphabet sound groups.',
        'Произносим буквы N–Z и различаем похожие звуки.',
      ),
      category: LessonCategory.LISTENING,
      level: LV,
      order: 2,
      questions: [
        'en_s1u1_n3_021_speaking',
        'en_s1u1_n3_022_speaking',
        'en_s1u1_n3_023_audio_match',
        'en_s1u1_n3_024_speaking',
        'en_s1u1_n3_025_fill_in_blank',
        'en_s1u1_n3_026_speaking',
        'en_s1u1_n3_027_fill_in_blank',
        'en_s1u1_n3_028_speaking',
        'en_s1u1_n3_029_word_matching',
        'en_s1u1_n3_030_speaking',
        'en_s1u1_n3_031_fill_in_blank',
        'en_s1u1_n3_032_speaking',
        'en_s1u1_n3_033_fill_in_blank',
        'en_s1u1_n3_034_speaking',
        'en_s1u1_n3_035_audio_match',
        'en_s1u1_n3_036_speaking',
        'en_s1u1_n3_037_word_arrange',
        'en_s1u1_n3_038_speaking',
        'en_s1u1_n3_039_fill_in_blank',
        'en_s1u1_n3_040_speaking',
      ],
    },

    {
      title: L(
        '이름 철자 말하기',
        'Ismni harflab aytish',
        'Spelling your name',
        'Как произнести имя по буквам',
      ),
      description: L(
        '이름을 묻고 철자를 하나씩 말하며 상대의 철자를 확인해요.',
        'Ismni so‘raysiz, harflab aytasiz va to‘g‘ri eshitganingizni tekshirasiz.',
        'Ask someone’s name, spell it, and confirm the spelling.',
        'Спрашиваем имя, произносим его по буквам и подтверждаем написание.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 3,
      questions: [
        'en_s1u1_n3_041_speaking',
        'en_s1u1_n3_042_fill_in_blank',
        'en_s1u1_n3_043_speaking',
        'en_s1u1_n3_044_translate_builder',
        'en_s1u1_n3_045_speaking',
        'en_s1u1_n3_046_fill_in_blank',
        'en_s1u1_n3_047_speaking',
        'en_s1u1_n3_048_word_arrange',
        'en_s1u1_n3_049_speaking',
        'en_s1u1_n3_050_dialog_complete',
        'en_s1u1_n3_051_speaking',
        'en_s1u1_n3_052_fill_in_blank',
        'en_s1u1_n3_053_speaking',
        'en_s1u1_n3_054_sentence_builder',
        'en_s1u1_n3_055_speaking',
        'en_s1u1_n3_056_fill_in_blank',
        'en_s1u1_n3_057_speaking',
        'en_s1u1_n3_058_audio_match',
        'en_s1u1_n3_059_speaking',
        'en_s1u1_n3_060_translate_builder',
      ],
    },

    {
      title: L(
        'What, Where, How',
        'What, Where, How',
        'What, Where and How',
        'What, Where и How',
      ),
      description: L(
        '질문사를 사용해 이름, 출신, 철자, 전화번호 같은 기본 정보를 물어요.',
        'So‘roq so‘zlari yordamida ism, kelib chiqish joyi, harflanish va telefon raqamini so‘raysiz.',
        'Use question words to ask for names, origin, spelling, and phone numbers.',
        'Используем вопросительные слова, чтобы спросить имя, происхождение, написание и номер телефона.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 4,
      questions: [
        'en_s1u1_n3_061_speaking',
        'en_s1u1_n3_062_fill_in_blank',
        'en_s1u1_n3_063_speaking',
        'en_s1u1_n3_064_fill_in_blank',
        'en_s1u1_n3_065_speaking',
        'en_s1u1_n3_066_translate_builder',
        'en_s1u1_n3_067_speaking',
        'en_s1u1_n3_068_fill_in_blank',
        'en_s1u1_n3_069_speaking',
        'en_s1u1_n3_070_dialog_complete',
        'en_s1u1_n3_071_speaking',
        'en_s1u1_n3_072_fill_in_blank',
        'en_s1u1_n3_073_speaking',
        'en_s1u1_n3_074_sentence_builder',
        'en_s1u1_n3_075_speaking',
        'en_s1u1_n3_076_fill_in_blank',
        'en_s1u1_n3_077_speaking',
        'en_s1u1_n3_078_dialog_complete',
        'en_s1u1_n3_079_speaking',
        'en_s1u1_n3_080_word_arrange',
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Section 1 · Unit 1 · Node 4
// 1.4 Speaking and writing
//
// Coverage
// - Hello / Hi
// - Good morning / Morning
// - How are you?
// - Fine, thanks. And you?
// - Great, thanks.
// - Have a nice day.
// - Thanks. You, too.
// - Goodbye / Bye
// - See you later.
// - quick responses to greetings / goodbyes
// - registration form fields
// - First name / Last name
// - Country
// - Home address
// - Phone number
// - Reason for visit
// - Signature
// - capital letters:
//   names / cities / countries / I / first word / roads & streets
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT1_NODE4_WORDS = [
  {
    code: 'en-greeting-good-morning',
    english: 'Good morning.',
    senseKey: 'morning-greeting',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '좋은 아침이에요; 안녕하세요',
      'Xayrli tong.',
      'a greeting used in the morning',
      'Доброе утро.',
    ),
    examples: [
      {
        english: 'Good morning.',
        translations: L(
          '좋은 아침이에요.',
          'Xayrli tong.',
          'Good morning.',
          'Доброе утро.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɡʊd ˈmɔːnɪŋ/',
      ttsText: 'Good morning.',
    },
    media: {
      emoji: '🌅',
      imageUrl: '',
      imageAlt: L(
        '아침에 인사하는 사람',
        'ertalab salomlashayotgan odam',
        'a person greeting someone in the morning',
        'человек, который здоровается утром',
      ),
    },
    tags: ['greeting', 'morning'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-greeting-morning',
    english: 'Morning.',
    senseKey: 'informal-morning-greeting',
    partOfSpeech: WordPartOfSpeech.INTERJECTION,
    meaning: L(
      '좋은 아침; 안녕하세요',
      'Xayrli tong.',
      'an informal way to say good morning',
      'Доброе утро.',
    ),
    examples: [
      {
        english: 'Morning, Patrick.',
        translations: L(
          '좋은 아침이에요, 패트릭.',
          'Xayrli tong, Patrik.',
          'Morning, Patrick.',
          'Доброе утро, Патрик.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈmɔːnɪŋ/',
      ttsText: 'Morning.',
    },
    media: {
      emoji: '☀️',
      imageUrl: '',
      imageAlt: L(
        '아침 인사',
        'ertalabki salomlashuv',
        'a morning greeting',
        'утреннее приветствие',
      ),
    },
    tags: ['greeting', 'morning', 'informal'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-greeting-how-are-you',
    english: 'How are you?',
    senseKey: 'greeting-wellbeing',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '어떻게 지내세요?',
      'Qalaysiz?',
      'a greeting asking how someone is',
      'Как вы?',
    ),
    examples: [
      {
        english: 'Hi. How are you?',
        translations: L(
          '안녕하세요. 어떻게 지내세요?',
          'Salom. Qalaysiz?',
          'Hi. How are you?',
          'Привет. Как вы?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/haʊ ə juː/',
      ttsText: 'How are you?',
    },
    media: {
      emoji: '🙂',
      imageUrl: '',
      imageAlt: L(
        '안부를 묻는 사람',
        'hol-ahvol so‘rayotgan odam',
        'a person asking how someone is',
        'человек, который спрашивает, как дела',
      ),
    },
    tags: ['greeting', 'conversation'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-response-fine',
    english: 'fine',
    senseKey: 'well',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('괜찮은; 잘 지내는', 'yaxshi', 'well; all right', 'хорошо'),
    examples: [
      {
        english: 'Fine, thanks. And you?',
        translations: L(
          '잘 지내요, 고마워요. 당신은요?',
          'Yaxshi, rahmat. Siz-chi?',
          'Fine, thanks. And you?',
          'Хорошо, спасибо. А вы?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/faɪn/',
      ttsText: 'fine',
    },
    media: {
      emoji: '🙂',
      imageUrl: '',
      imageAlt: L(
        '괜찮다고 말하는 사람',
        'yaxshi ekanini aytayotgan odam',
        'a person saying they are fine',
        'человек, который говорит, что у него всё хорошо',
      ),
    },
    tags: ['greeting', 'response'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-response-great',
    english: 'great',
    senseKey: 'very-good',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('아주 좋은; 훌륭한', 'juda yaxshi', 'very good', 'отлично'),
    examples: [
      {
        english: 'Great, thanks.',
        translations: L(
          '아주 잘 지내요, 고마워요.',
          'Juda yaxshi, rahmat.',
          'Great, thanks.',
          'Отлично, спасибо.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɡreɪt/',
      ttsText: 'great',
    },
    media: {
      emoji: '😄',
      imageUrl: '',
      imageAlt: L(
        '기분이 좋은 사람',
        'kayfiyati yaxshi odam',
        'a happy person',
        'человек в хорошем настроении',
      ),
    },
    tags: ['greeting', 'response'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-response-thanks',
    english: 'thanks',
    senseKey: 'informal-thank-you',
    partOfSpeech: WordPartOfSpeech.INTERJECTION,
    meaning: L(
      '고마워요',
      'rahmat',
      'an informal expression of thanks',
      'спасибо',
    ),
    examples: [
      {
        english: 'Fine, thanks.',
        translations: L(
          '잘 지내요, 고마워요.',
          'Yaxshi, rahmat.',
          'Fine, thanks.',
          'Хорошо, спасибо.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/θæŋks/',
      ttsText: 'thanks',
    },
    media: {
      emoji: '🙏',
      imageUrl: '',
      imageAlt: L(
        '감사하는 사람',
        'minnatdorchilik bildirayotgan odam',
        'a person saying thanks',
        'человек, который благодарит',
      ),
    },
    tags: ['conversation', 'thanks'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-goodbye-have-nice-day',
    english: 'Have a nice day.',
    senseKey: 'good-wish-day',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '좋은 하루 보내세요.',
      'Kuningiz yaxshi o‘tsin.',
      'a polite wish when saying goodbye',
      'Хорошего дня.',
    ),
    examples: [
      {
        english: 'Have a nice day.',
        translations: L(
          '좋은 하루 보내세요.',
          'Kuningiz yaxshi o‘tsin.',
          'Have a nice day.',
          'Хорошего дня.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/hæv ə naɪs deɪ/',
      ttsText: 'Have a nice day.',
    },
    media: {
      emoji: '☀️',
      imageUrl: '',
      imageAlt: L(
        '좋은 하루를 바라며 인사하는 사람',
        'yaxshi kun tilayotgan odam',
        'a person wishing someone a nice day',
        'человек, желающий хорошего дня',
      ),
    },
    tags: ['goodbye', 'conversation'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-response-you-too',
    english: 'You, too.',
    senseKey: 'same-wish-back',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '당신도요.',
      'Sizga ham.',
      'used to return the same wish',
      'И вам тоже.',
    ),
    examples: [
      {
        english: 'Thanks. You, too.',
        translations: L(
          '고마워요. 당신도요.',
          'Rahmat. Sizga ham.',
          'Thanks. You, too.',
          'Спасибо. И вам тоже.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/juː tuː/',
      ttsText: 'You, too.',
    },
    media: {
      emoji: '↩️',
      imageUrl: '',
      imageAlt: L(
        '같은 인사를 돌려주는 사람',
        'tilakni qaytarayotgan odam',
        'a person returning the same wish',
        'человек, отвечающий тем же пожеланием',
      ),
    },
    tags: ['conversation', 'response'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-goodbye-goodbye',
    english: 'goodbye',
    senseKey: 'farewell',
    partOfSpeech: WordPartOfSpeech.INTERJECTION,
    meaning: L(
      '안녕히 가세요; 안녕히 계세요',
      'xayr',
      'a word used when leaving',
      'до свидания',
    ),
    examples: [
      {
        english: 'Goodbye.',
        translations: L('안녕히 가세요.', 'Xayr.', 'Goodbye.', 'До свидания.'),
      },
    ],
    pronunciation: {
      ipa: '/ˌɡʊdˈbaɪ/',
      ttsText: 'goodbye',
    },
    media: {
      emoji: '👋',
      imageUrl: '',
      imageAlt: L(
        '작별 인사를 하는 사람',
        'xayrlashayotgan odam',
        'a person saying goodbye',
        'человек, который прощается',
      ),
    },
    tags: ['goodbye'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-goodbye-see-you-later',
    english: 'See you later.',
    senseKey: 'informal-farewell',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '나중에 봐요.',
      'Keyin ko‘rishamiz.',
      'an informal goodbye meaning you will meet again later',
      'До встречи.',
    ),
    examples: [
      {
        english: 'Bye. See you later.',
        translations: L(
          '안녕. 나중에 봐요.',
          'Xayr. Keyin ko‘rishamiz.',
          'Bye. See you later.',
          'Пока. До встречи.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/siː juː ˈleɪtə/',
      ttsText: 'See you later.',
    },
    media: {
      emoji: '👋',
      imageUrl: '',
      imageAlt: L(
        '다시 만나기로 하고 헤어지는 사람들',
        'keyin yana ko‘rishishga kelishib xayrlashayotgan odamlar',
        'people saying they will see each other later',
        'люди, которые прощаются до следующей встречи',
      ),
    },
    tags: ['goodbye', 'conversation'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-form-registration-card',
    english: 'registration card',
    senseKey: 'registration-form',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '등록 카드; 등록 양식',
      'ro‘yxatdan o‘tish kartasi',
      'a form used to record personal information',
      'регистрационная карточка',
    ),
    examples: [
      {
        english: 'Complete the registration card.',
        translations: L(
          '등록 카드를 작성하세요.',
          'Ro‘yxatdan o‘tish kartasini to‘ldiring.',
          'Complete the registration card.',
          'Заполните регистрационную карточку.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌredʒɪˈstreɪʃn kɑːd/',
      ttsText: 'registration card',
    },
    media: {
      emoji: '📋',
      imageUrl: '',
      imageAlt: L(
        '등록 양식',
        'ro‘yxatdan o‘tish formasi',
        'a registration form',
        'регистрационная форма',
      ),
    },
    tags: ['forms', 'personal-information'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-form-home-address',
    english: 'home address',
    senseKey: 'home-location',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '집 주소',
      'uy manzili',
      'the address where someone lives',
      'домашний адрес',
    ),
    examples: [
      {
        english: 'My home address is 39 Beykoz Sokak, Ankara.',
        translations: L(
          '제 집 주소는 앙카라의 39 Beykoz Sokak이에요.',
          'Uy manzilim Ankara, 39 Beykoz Sokak.',
          'My home address is 39 Beykoz Sokak, Ankara.',
          'Мой домашний адрес — 39 Beykoz Sokak, Анкара.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌhəʊm əˈdres/',
      ttsText: 'home address',
    },
    media: {
      emoji: '🏠',
      imageUrl: '',
      imageAlt: L('집 주소', 'uy manzili', 'a home address', 'домашний адрес'),
    },
    tags: ['forms', 'personal-information'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-form-reason-for-visit',
    english: 'reason for visit',
    senseKey: 'purpose-of-visit',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '방문 목적',
      'tashrif sababi',
      'the purpose of a visit',
      'цель визита',
    ),
    examples: [
      {
        english: 'Reason for visit: on business.',
        translations: L(
          '방문 목적: 업무.',
          'Tashrif sababi: ish.',
          'Reason for visit: on business.',
          'Цель визита: по делам.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈriːzn fə ˈvɪzɪt/',
      ttsText: 'reason for visit',
    },
    media: {
      emoji: '🧳',
      imageUrl: '',
      imageAlt: L(
        '방문 목적을 적는 칸',
        'tashrif sababini yozish joyi',
        'a field for the reason for a visit',
        'поле для цели визита',
      ),
    },
    tags: ['forms', 'visit'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-form-signature',
    english: 'signature',
    senseKey: 'written-name-sign',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '서명',
      'imzo',
      'a person’s written name used to sign a document',
      'подпись',
    ),
    examples: [
      {
        english: 'Signature: Faruk Akkaya.',
        translations: L(
          '서명: Faruk Akkaya.',
          'Imzo: Faruk Akkaya.',
          'Signature: Faruk Akkaya.',
          'Подпись: Faruk Akkaya.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈsɪɡnətʃə/',
      ttsText: 'signature',
    },
    media: {
      emoji: '✍️',
      imageUrl: '',
      imageAlt: L(
        '문서에 하는 서명',
        'hujjatdagi imzo',
        'a signature on a document',
        'подпись на документе',
      ),
    },
    tags: ['forms', 'personal-information'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-address-road',
    english: 'road',
    senseKey: 'street-name-road',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('도로; 길', 'yo‘l', 'a road', 'дорога'),
    examples: [
      {
        english: '8 Park Road',
        translations: L(
          '8 Park Road',
          '8 Park Road',
          '8 Park Road',
          '8 Park Road',
        ),
      },
    ],
    pronunciation: {
      ipa: '/rəʊd/',
      ttsText: 'road',
    },
    media: {
      emoji: '🛣️',
      imageUrl: '',
      imageAlt: L('도로', 'yo‘l', 'a road', 'дорога'),
    },
    tags: ['address', 'capital-letters'],
    difficulty: 1,
    isCore: true,
  },
  {
    code: 'en-noun-day',
    english: 'day',
    senseKey: 'period-of-twenty-four-hours',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('날; 하루', 'kun', 'a period of twenty-four hours', 'день'),
    examples: [
      {
        english: 'Have a nice day.',
        translations: L(
          '좋은 하루 보내세요.',
          'Kuningiz yaxshi o‘tsin.',
          'Have a nice day.',
          'Хорошего дня.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/deɪ/',
      ttsText: 'day',
    },
    media: {
      emoji: '☀️',
      imageUrl: '',
      imageAlt: L(
        '하루를 나타내는 해',
        'kunni bildiruvchi quyosh',
        'a day',
        'день',
      ),
    },
    tags: ['time', 'greeting'],
    difficulty: 1,
    isCore: true,
  },
  {
    code: 'en-address-street',
    english: 'street',
    senseKey: 'street-name',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('거리; 길', 'ko‘cha', 'a street', 'улица'),
    examples: [
      {
        english: 'Street names use capital letters.',
        translations: L(
          '거리 이름에는 대문자를 써요.',
          'Ko‘cha nomlarida bosh harflar ishlatiladi.',
          'Street names use capital letters.',
          'Названия улиц пишутся с заглавной буквы.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/striːt/',
      ttsText: 'street',
    },
    media: {
      emoji: '🛣️',
      imageUrl: '',
      imageAlt: L('거리', 'ko‘cha', 'a street', 'улица'),
    },
    tags: ['address', 'capital-letters'],
    difficulty: 1,
    isCore: true,
  },
];

export const EN_S1_UNIT1_NODE4_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Hello! How are you?
  // ===========================================================

  en_s1u1_n4_001_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Good morning.',
    audioText: 'Good morning.',
    answerTranslation: L(
      '좋은 아침이에요.',
      'Xayrli tong.',
      'Good morning.',
      'Доброе утро.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['greeting', 'morning'],
  },

  en_s1u1_n4_002_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Morning.',
    audioText: 'Morning.',
    answerTranslation: L(
      '좋은 아침이에요.',
      'Xayrli tong.',
      'Morning.',
      'Доброе утро.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['greeting', 'morning'],
  },

  en_s1u1_n4_003_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Good ___.',
    blankAnswers: ['morning'],
    options: ['morning', 'later', 'thanks', 'fine'],
    answer: 'morning',
    answerTranslation: L(
      '좋은 아침이에요.',
      'Xayrli tong.',
      'Good morning.',
      'Доброе утро.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['greeting', 'morning'],
  },

  en_s1u1_n4_004_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Hi. How are you?',
    audioText: 'Hi. How are you?',
    answerTranslation: L(
      '안녕하세요. 어떻게 지내세요?',
      'Salom. Qalaysiz?',
      'Hi. How are you?',
      'Привет. Как вы?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['greeting', 'how-are-you'],
  },

  en_s1u1_n4_005_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Hi. How are you?' }],
    options: [
      'Fine, thanks. And you?',
      'See you later.',
      'Goodbye.',
      'My name’s Anna.',
    ],
    answer: 'Fine, thanks. And you?',
    answerTranslation: L(
      '잘 지내요, 고마워요. 당신은요?',
      'Yaxshi, rahmat. Siz-chi?',
      'Fine, thanks. And you?',
      'Хорошо, спасибо. А вы?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['greeting', 'response'],
  },

  en_s1u1_n4_006_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Fine, thanks. And you?',
    audioText: 'Fine, thanks. And you?',
    answerTranslation: L(
      '잘 지내요, 고마워요. 당신은요?',
      'Yaxshi, rahmat. Siz-chi?',
      'Fine, thanks. And you?',
      'Хорошо, спасибо. А вы?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['greeting', 'response'],
  },

  en_s1u1_n4_007_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___, thanks. And you?',
    blankAnswers: ['Fine'],
    options: ['Fine', 'Bye', 'Morning', 'Later'],
    answer: 'Fine',
    answerTranslation: L(
      '잘 지내요, 고마워요. 당신은요?',
      'Yaxshi, rahmat. Siz-chi?',
      'Fine, thanks. And you?',
      'Хорошо, спасибо. А вы?',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['fine', 'response'],
  },

  en_s1u1_n4_008_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Great, thanks.',
    audioText: 'Great, thanks.',
    answerTranslation: L(
      '아주 잘 지내요, 고마워요.',
      'Juda yaxshi, rahmat.',
      'Great, thanks.',
      'Отлично, спасибо.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['great', 'response'],
  },

  en_s1u1_n4_009_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['How', 'are', 'you', 'Fine', 'morning'],
    answer: 'How are you',
    answerTranslation: L(
      '어떻게 지내세요?',
      'Qalaysiz?',
      'How are you?',
      'Как вы?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['greeting', 'builder'],
  },

  en_s1u1_n4_010_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Hello.',
    audioText: 'Hello.',
    answerTranslation: L('안녕하세요.', 'Salom.', 'Hello.', 'Здравствуйте.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['hello', 'review'],
  },

  en_s1u1_n4_011_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      { korean: 'Good morning.', native: 'Xayrli tong.' },
      { korean: 'How are you?', native: 'Qalaysiz?' },
      { korean: 'Fine.', native: 'Yaxshi.' },
      { korean: 'Great.', native: 'Juda yaxshi.' },
      { korean: 'Thanks.', native: 'Rahmat.' },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['greeting', 'matching'],
  },

  en_s1u1_n4_012_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Morning, Patrick.',
    audioText: 'Morning, Patrick.',
    answerTranslation: L(
      '좋은 아침이에요, 패트릭.',
      'Xayrli tong, Patrik.',
      'Morning, Patrick.',
      'Доброе утро, Патрик.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['morning', 'name'],
  },

  en_s1u1_n4_013_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'How ___ you?',
    blankAnswers: ['are'],
    options: ['are', 'am', 'is', 'do'],
    answer: 'are',
    answerTranslation: L(
      '어떻게 지내세요?',
      'Qalaysiz?',
      'How are you?',
      'Как вы?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['greeting', 'be'],
  },

  en_s1u1_n4_014_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Fine. And you?',
    audioText: 'Fine. And you?',
    answerTranslation: L(
      '잘 지내요. 당신은요?',
      'Yaxshi. Siz-chi?',
      'Fine. And you?',
      'Хорошо. А вы?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['response'],
  },

  en_s1u1_n4_015_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      { korean: 'Hello.', native: 'Salom.' },
      { korean: 'Good morning.', native: 'Xayrli tong.' },
      { korean: 'How are you?', native: 'Qalaysiz?' },
      { korean: 'Fine, thanks.', native: 'Yaxshi, rahmat.' },
      { korean: 'Great, thanks.', native: 'Juda yaxshi, rahmat.' },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['greeting', 'listening'],
  },

  en_s1u1_n4_016_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Great, thanks.',
    audioText: 'Great, thanks.',
    answerTranslation: L(
      '아주 잘 지내요, 고마워요.',
      'Juda yaxshi, rahmat.',
      'Great, thanks.',
      'Отлично, спасибо.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['response'],
  },

  en_s1u1_n4_017_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Fine, thanks. And you?',
    audioText: 'Fine, thanks. And you?',
    answerI18n: L(
      '잘 지내요 고마워요 당신은요',
      'Yaxshi rahmat Siz-chi',
      'Fine thanks And you',
      'Хорошо спасибо А вы',
    ),
    optionsI18n: {
      ko: ['잘', '지내요', '고마워요', '당신은요', '안녕히', '나중에'],
      uz: ['Yaxshi', 'rahmat', 'Siz-chi', 'xayr', 'keyin'],
      en: ['Fine', 'thanks', 'And', 'you', 'Goodbye', 'later'],
      ru: ['Хорошо', 'спасибо', 'А', 'вы', 'До', 'свидания'],
    },
    answerTranslation: L(
      '잘 지내요, 고마워요. 당신은요?',
      'Yaxshi, rahmat. Siz-chi?',
      'Fine, thanks. And you?',
      'Хорошо, спасибо. А вы?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['greeting', 'sentence-builder'],
  },

  en_s1u1_n4_018_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Hi. How are you?',
    audioText: 'Hi. How are you?',
    answerTranslation: L(
      '안녕하세요. 어떻게 지내세요?',
      'Salom. Qalaysiz?',
      'Hi. How are you?',
      'Привет. Как вы?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['greeting'],
  },

  en_s1u1_n4_019_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Good morning.' }],
    options: ['Morning.', 'See you later.', 'On business.', 'My address.'],
    answer: 'Morning.',
    answerTranslation: L(
      '좋은 아침이에요.',
      'Xayrli tong.',
      'Morning.',
      'Доброе утро.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['greeting', 'quick-response'],
  },

  en_s1u1_n4_020_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Good morning. How are you?',
    audioText: 'Good morning. How are you?',
    answerTranslation: L(
      '좋은 아침이에요. 어떻게 지내세요?',
      'Xayrli tong. Qalaysiz?',
      'Good morning. How are you?',
      'Доброе утро. Как вы?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['greeting', 'review'],
  },

  // ===========================================================
  // Lesson 2 · Goodbye! See you later.
  // ===========================================================

  en_s1u1_n4_021_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Have a nice day.',
    audioText: 'Have a nice day.',
    answerTranslation: L(
      '좋은 하루 보내세요.',
      'Kuningiz yaxshi o‘tsin.',
      'Have a nice day.',
      'Хорошего дня.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['goodbye', 'nice-day'],
  },

  en_s1u1_n4_022_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Have a nice day.' }],
    options: [
      'Thanks. You, too.',
      'Fine. And you?',
      'Good morning.',
      'I’m from Spain.',
    ],
    answer: 'Thanks. You, too.',
    answerTranslation: L(
      '고마워요. 당신도요.',
      'Rahmat. Sizga ham.',
      'Thanks. You, too.',
      'Спасибо. И вам тоже.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['goodbye', 'response'],
  },

  en_s1u1_n4_023_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Thanks. You, too.',
    audioText: 'Thanks. You, too.',
    answerTranslation: L(
      '고마워요. 당신도요.',
      'Rahmat. Sizga ham.',
      'Thanks. You, too.',
      'Спасибо. И вам тоже.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['thanks', 'response'],
  },

  en_s1u1_n4_024_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Have a nice ___.',
    blankAnswers: ['day'],
    options: ['day', 'morning', 'name', 'country'],
    answer: 'day',
    answerTranslation: L(
      '좋은 하루 보내세요.',
      'Kuningiz yaxshi o‘tsin.',
      'Have a nice day.',
      'Хорошего дня.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['goodbye', 'day'],
  },

  en_s1u1_n4_025_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Goodbye.',
    audioText: 'Goodbye.',
    answerTranslation: L('안녕히 가세요.', 'Xayr.', 'Goodbye.', 'До свидания.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['goodbye'],
  },

  en_s1u1_n4_026_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Bye.',
    audioText: 'Bye.',
    answerTranslation: L('안녕.', 'Xayr.', 'Bye.', 'Пока.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['goodbye'],
  },

  en_s1u1_n4_027_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'See you ___.',
    blankAnswers: ['later'],
    options: ['later', 'fine', 'morning', 'country'],
    answer: 'later',
    answerTranslation: L(
      '나중에 봐요.',
      'Keyin ko‘rishamiz.',
      'See you later.',
      'До встречи.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['goodbye', 'later'],
  },

  en_s1u1_n4_028_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Bye. See you later.',
    audioText: 'Bye. See you later.',
    answerTranslation: L(
      '안녕. 나중에 봐요.',
      'Xayr. Keyin ko‘rishamiz.',
      'Bye. See you later.',
      'Пока. До встречи.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['goodbye', 'later'],
  },

  en_s1u1_n4_029_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['Have', 'a', 'nice', 'day', 'morning', 'later'],
    answer: 'Have a nice day',
    answerTranslation: L(
      '좋은 하루 보내세요.',
      'Kuningiz yaxshi o‘tsin.',
      'Have a nice day.',
      'Хорошего дня.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['goodbye', 'builder'],
  },

  en_s1u1_n4_030_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'See you later.',
    audioText: 'See you later.',
    answerTranslation: L(
      '나중에 봐요.',
      'Keyin ko‘rishamiz.',
      'See you later.',
      'До встречи.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['goodbye'],
  },

  en_s1u1_n4_031_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      { korean: 'Goodbye.', native: 'Xayr.' },
      { korean: 'Bye.', native: 'Xayr.' },
      { korean: 'See you later.', native: 'Keyin ko‘rishamiz.' },
      { korean: 'Have a nice day.', native: 'Kuningiz yaxshi o‘tsin.' },
      { korean: 'You, too.', native: 'Sizga ham.' },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['goodbye', 'matching'],
  },

  en_s1u1_n4_032_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Thanks. Bye.',
    audioText: 'Thanks. Bye.',
    answerTranslation: L(
      '고마워요. 안녕.',
      'Rahmat. Xayr.',
      'Thanks. Bye.',
      'Спасибо. Пока.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['goodbye', 'quick-response'],
  },

  en_s1u1_n4_033_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Goodbye.' }],
    options: ['Bye.', 'Fine, thanks.', 'Good morning.', 'I’m from China.'],
    answer: 'Bye.',
    answerTranslation: L('안녕.', 'Xayr.', 'Bye.', 'Пока.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['goodbye', 'quick-response'],
  },

  en_s1u1_n4_034_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Bye.',
    audioText: 'Bye.',
    answerTranslation: L('안녕.', 'Xayr.', 'Bye.', 'Пока.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['goodbye', 'quick-response'],
  },

  en_s1u1_n4_035_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      { korean: 'Have a nice day.', native: 'Kuningiz yaxshi o‘tsin.' },
      { korean: 'Thanks.', native: 'Rahmat.' },
      { korean: 'You, too.', native: 'Sizga ham.' },
      { korean: 'Goodbye.', native: 'Xayr.' },
      { korean: 'See you later.', native: 'Keyin ko‘rishamiz.' },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['goodbye', 'listening'],
  },

  en_s1u1_n4_036_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Have a nice day.',
    audioText: 'Have a nice day.',
    answerTranslation: L(
      '좋은 하루 보내세요.',
      'Kuningiz yaxshi o‘tsin.',
      'Have a nice day.',
      'Хорошего дня.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['goodbye'],
  },

  en_s1u1_n4_037_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['you', 'later', 'See', 'Bye', 'morning'],
    answer: 'See you later',
    audioText: 'See you later.',
    answerTranslation: L(
      '나중에 봐요.',
      'Keyin ko‘rishamiz.',
      'See you later.',
      'До встречи.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['goodbye', 'arrange'],
  },

  en_s1u1_n4_038_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Thanks. You, too.',
    audioText: 'Thanks. You, too.',
    answerTranslation: L(
      '고마워요. 당신도요.',
      'Rahmat. Sizga ham.',
      'Thanks. You, too.',
      'Спасибо. И вам тоже.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['goodbye', 'response'],
  },

  en_s1u1_n4_039_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'See you later.' }],
    options: ['Bye.', 'Fine, thanks.', 'Good morning.', 'On holiday.'],
    answer: 'Bye.',
    answerTranslation: L('안녕.', 'Xayr.', 'Bye.', 'Пока.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['goodbye', 'quick-response'],
  },

  en_s1u1_n4_040_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Bye. See you later.',
    audioText: 'Bye. See you later.',
    answerTranslation: L(
      '안녕. 나중에 봐요.',
      'Xayr. Keyin ko‘rishamiz.',
      'Bye. See you later.',
      'Пока. До встречи.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['goodbye', 'review'],
  },

  // ===========================================================
  // Lesson 3 · Filling in a form
  // ===========================================================

  en_s1u1_n4_041_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'First name.',
    audioText: 'First name.',
    answerTranslation: L('이름.', 'Ism.', 'First name.', 'Имя.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['forms', 'first-name'],
  },

  en_s1u1_n4_042_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Last name.',
    audioText: 'Last name.',
    answerTranslation: L('성.', 'Familiya.', 'Last name.', 'Фамилия.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['forms', 'last-name'],
  },

  en_s1u1_n4_043_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      { korean: 'First name', native: 'Eva' },
      { korean: 'Last name', native: 'Sanz' },
      { korean: 'Country', native: 'Spain' },
      { korean: 'Home address', native: 'Avenida Lusitana, 13, Granada' },
      { korean: 'Phone number', native: '0034 758 3902281' },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['forms', 'matching'],
  },

  en_s1u1_n4_044_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Home address.',
    audioText: 'Home address.',
    answerTranslation: L(
      '집 주소.',
      'Uy manzili.',
      'Home address.',
      'Домашний адрес.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['forms', 'address'],
  },

  en_s1u1_n4_045_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Faruk Akkaya → Last name: ___',
    blankAnswers: ['Akkaya'],
    options: ['Akkaya', 'Faruk', 'Turkey', 'Ankara'],
    answer: 'Akkaya',
    answerTranslation: L(
      '성: Akkaya',
      'Familiya: Akkaya',
      'Last name: Akkaya',
      'Фамилия: Akkaya',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['forms', 'last-name'],
  },

  en_s1u1_n4_046_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Country.',
    audioText: 'Country.',
    answerTranslation: L('나라.', 'Mamlakat.', 'Country.', 'Страна.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['forms', 'country'],
  },

  en_s1u1_n4_047_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Faruk Akkaya is from ___.',
    blankAnswers: ['Turkey'],
    options: ['Turkey', 'Ankara', 'Akkaya', 'English'],
    answer: 'Turkey',
    answerTranslation: L(
      'Faruk Akkaya는 튀르키예 출신이에요.',
      'Faruk Akkaya Turkiyadan.',
      'Faruk Akkaya is from Turkey.',
      'Фарук Аккая из Турции.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['forms', 'country'],
  },

  en_s1u1_n4_048_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Phone number.',
    audioText: 'Phone number.',
    answerTranslation: L(
      '전화번호.',
      'Telefon raqami.',
      'Phone number.',
      'Номер телефона.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['forms', 'phone-number'],
  },

  en_s1u1_n4_049_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Faruk’s phone number is ___.',
    blankAnswers: ['0090 508 99200437'],
    options: ['0090 508 99200437', '39 Beykoz Sokak', 'Turkey', 'Faruk Akkaya'],
    answer: '0090 508 99200437',
    answerTranslation: L(
      'Faruk의 전화번호는 0090 508 99200437이에요.',
      'Farukning telefon raqami 0090 508 99200437.',
      'Faruk’s phone number is 0090 508 99200437.',
      'Номер телефона Фарука — 0090 508 99200437.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['forms', 'phone-number'],
  },

  en_s1u1_n4_050_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Signature.',
    audioText: 'Signature.',
    answerTranslation: L('서명.', 'Imzo.', 'Signature.', 'Подпись.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['forms', 'signature'],
  },

  en_s1u1_n4_051_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      { korean: 'First name', native: 'Ism' },
      { korean: 'Last name', native: 'Familiya' },
      { korean: 'Country', native: 'Mamlakat' },
      { korean: 'Home address', native: 'Uy manzili' },
      { korean: 'Signature', native: 'Imzo' },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['forms', 'listening'],
  },

  en_s1u1_n4_052_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Reason for visit.',
    audioText: 'Reason for visit.',
    answerTranslation: L(
      '방문 목적.',
      'Tashrif sababi.',
      'Reason for visit.',
      'Цель визита.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['forms', 'visit'],
  },

  en_s1u1_n4_053_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Josie is here on ___.',
    blankAnswers: ['business'],
    options: ['business', 'holiday', 'Spain', 'Austin'],
    answer: 'business',
    answerTranslation: L(
      'Josie는 업무로 여기 왔어요.',
      'Josie bu yerga ish bilan kelgan.',
      'Josie is here on business.',
      'Джози здесь по делам.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['forms', 'reason-for-visit'],
  },

  en_s1u1_n4_054_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I’m here on business.',
    audioText: 'I’m here on business.',
    answerTranslation: L(
      '저는 업무로 여기 왔어요.',
      'Men bu yerga ish bilan keldim.',
      'I’m here on business.',
      'Я здесь по делам.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['forms', 'reason-for-visit'],
  },

  en_s1u1_n4_055_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Faruk’s home address is 39 Beykoz Sokak, ___.',
    blankAnswers: ['Ankara'],
    options: ['Ankara', 'Turkey', 'Faruk', 'Akkaya'],
    answer: 'Ankara',
    answerTranslation: L(
      'Faruk의 집 주소는 앙카라의 39 Beykoz Sokak이에요.',
      'Farukning uy manzili Ankara, 39 Beykoz Sokak.',
      'Faruk’s home address is 39 Beykoz Sokak, Ankara.',
      'Домашний адрес Фарука — 39 Beykoz Sokak, Анкара.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['forms', 'address'],
  },

  en_s1u1_n4_056_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'My address is 909 Cameron Road, Austin, Texas.',
    audioText: 'My address is 909 Cameron Road, Austin, Texas.',
    answerTranslation: L(
      '제 주소는 909 Cameron Road, Austin, Texas예요.',
      'Mening manzilim 909 Cameron Road, Austin, Texas.',
      'My address is 909 Cameron Road, Austin, Texas.',
      'Мой адрес — 909 Cameron Road, Остин, Техас.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['forms', 'address'],
  },

  en_s1u1_n4_057_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'I’m here to study English.',
    audioText: 'I’m here to study English.',
    answerI18n: L(
      '저는 영어를 공부하러 여기 왔어요',
      'Men bu yerga ingliz tilini o‘rganish uchun keldim',
      'I’m here to study English',
      'Я здесь чтобы изучать английский',
    ),
    optionsI18n: {
      ko: ['저는', '영어를', '공부하러', '여기', '왔어요', '업무로'],
      uz: [
        'Men',
        'bu',
        'yerga',
        'ingliz',
        'tilini',
        'o‘rganish',
        'uchun',
        'keldim',
      ],
      en: ['I’m', 'here', 'to', 'study', 'English', 'business'],
      ru: ['Я', 'здесь', 'чтобы', 'изучать', 'английский', 'по', 'делам'],
    },
    answerTranslation: L(
      '저는 영어를 공부하러 여기 왔어요.',
      'Men bu yerga ingliz tilini o‘rganish uchun keldim.',
      'I’m here to study English.',
      'Я здесь, чтобы изучать английский.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['forms', 'study'],
  },

  en_s1u1_n4_058_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'My phone number is 0090 508 99200437.',
    audioText: 'My phone number is 0090 508 99200437.',
    answerTranslation: L(
      '제 전화번호는 0090 508 99200437이에요.',
      'Mening telefon raqamim 0090 508 99200437.',
      'My phone number is 0090 508 99200437.',
      'Мой номер телефона — 0090 508 99200437.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['forms', 'phone-number'],
  },

  en_s1u1_n4_059_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What’s your first name?' }],
    options: ['Faruk.', 'Akkaya.', 'Turkey.', '39 Beykoz Sokak.'],
    answer: 'Faruk.',
    answerTranslation: L('Faruk이에요.', 'Faruk.', 'Faruk.', 'Фарук.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['forms', 'first-name'],
  },

  en_s1u1_n4_060_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Faruk Akkaya.',
    audioText: 'Faruk Akkaya.',
    answerTranslation: L(
      'Faruk Akkaya.',
      'Faruk Akkaya.',
      'Faruk Akkaya.',
      'Фарук Аккая.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['forms', 'signature'],
  },

  // ===========================================================
  // Lesson 4 · Capital letters and registration
  // ===========================================================

  en_s1u1_n4_061_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Havva Yilmaz.',
    audioText: 'Havva Yilmaz.',
    answerTranslation: L(
      'Havva Yilmaz.',
      'Havva Yilmaz.',
      'Havva Yilmaz.',
      'Хавва Йылмаз.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['capital-letters', 'name'],
  },

  en_s1u1_n4_062_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '사람 이름을 올바르게 쓴 것을 고르세요.',
      'Odam ismi to‘g‘ri bosh harf bilan yozilgan variantni tanlang.',
      'Choose the correctly capitalized name.',
      'Выберите имя, написанное с правильными заглавными буквами.',
    ),
    sentenceTemplate: '___',
    blankAnswers: ['Havva Yilmaz'],
    options: ['Havva Yilmaz', 'havva yilmaz', 'Havva yilmaz', 'havva Yilmaz'],
    answer: 'Havva Yilmaz',
    answerTranslation: L(
      '사람 이름은 대문자로 시작해요.',
      'Odam ismlari bosh harf bilan boshlanadi.',
      'Names begin with capital letters.',
      'Имена начинаются с заглавной буквы.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['capital-letters', 'name'],
  },

  en_s1u1_n4_063_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'London.',
    audioText: 'London.',
    answerTranslation: L('런던.', 'London.', 'London.', 'Лондон.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['capital-letters', 'city'],
  },

  en_s1u1_n4_064_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '도시 이름을 올바르게 쓴 것을 고르세요.',
      'Shahar nomi to‘g‘ri yozilgan variantni tanlang.',
      'Choose the correctly capitalized city name.',
      'Выберите название города с правильной заглавной буквой.',
    ),
    sentenceTemplate: '___',
    blankAnswers: ['London'],
    options: ['London', 'london', 'LONdon', 'lonDon'],
    answer: 'London',
    answerTranslation: L(
      '도시 이름은 대문자로 시작해요.',
      'Shahar nomlari bosh harf bilan boshlanadi.',
      'City names begin with capital letters.',
      'Названия городов начинаются с заглавной буквы.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['capital-letters', 'city'],
  },

  en_s1u1_n4_065_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'China.',
    audioText: 'China.',
    answerTranslation: L('중국.', 'Xitoy.', 'China.', 'Китай.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['capital-letters', 'country'],
  },

  en_s1u1_n4_066_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '나라 이름을 올바르게 쓴 것을 고르세요.',
      'Mamlakat nomi to‘g‘ri yozilgan variantni tanlang.',
      'Choose the correctly capitalized country name.',
      'Выберите название страны с правильной заглавной буквой.',
    ),
    sentenceTemplate: '___',
    blankAnswers: ['China'],
    options: ['China', 'china', 'CHina', 'chiNa'],
    answer: 'China',
    answerTranslation: L(
      '나라 이름은 대문자로 시작해요.',
      'Mamlakat nomlari bosh harf bilan boshlanadi.',
      'Country names begin with capital letters.',
      'Названия стран начинаются с заглавной буквы.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['capital-letters', 'country'],
  },

  en_s1u1_n4_067_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I am from Poland.',
    audioText: 'I am from Poland.',
    answerTranslation: L(
      '저는 폴란드 출신이에요.',
      'Men Polshadanman.',
      'I am from Poland.',
      'Я из Польши.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['capital-letters', 'I'],
  },

  en_s1u1_n4_068_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '올바르게 쓴 문장을 고르세요.',
      'To‘g‘ri yozilgan gapni tanlang.',
      'Choose the correctly capitalized sentence.',
      'Выберите предложение с правильными заглавными буквами.',
    ),
    sentenceTemplate: '___',
    blankAnswers: ['I am from Poland.'],
    options: [
      'I am from Poland.',
      'i am from Poland.',
      'I am from poland.',
      'i am from poland.',
    ],
    answer: 'I am from Poland.',
    answerTranslation: L(
      'I는 항상 대문자로 쓰고 나라 이름도 대문자로 시작해요.',
      'I har doim bosh harf bilan, mamlakat nomi ham bosh harf bilan yoziladi.',
      'I is always capitalized, and country names begin with capital letters.',
      'I всегда пишется с заглавной буквы, как и названия стран.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['capital-letters', 'I', 'country'],
  },

  en_s1u1_n4_069_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'We are on holiday.',
    audioText: 'We are on holiday.',
    answerTranslation: L(
      '우리는 휴가 중이에요.',
      'Biz ta’tildamiz.',
      'We are on holiday.',
      'Мы в отпуске.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['capital-letters', 'sentence'],
  },

  en_s1u1_n4_070_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '문장의 첫 단어를 올바르게 쓴 것을 고르세요.',
      'Gapning birinchi so‘zi to‘g‘ri yozilgan variantni tanlang.',
      'Choose the correctly capitalized first word.',
      'Выберите правильно написанное первое слово предложения.',
    ),
    sentenceTemplate: '___ are on holiday.',
    blankAnswers: ['We'],
    options: ['We', 'we', 'WE', 'wE'],
    answer: 'We',
    answerTranslation: L(
      '문장의 첫 단어는 대문자로 시작해요.',
      'Gapning birinchi so‘zi bosh harf bilan boshlanadi.',
      'The first word in a sentence begins with a capital letter.',
      'Первое слово предложения начинается с заглавной буквы.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['capital-letters', 'sentence'],
  },

  en_s1u1_n4_071_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Eight Park Road.',
    audioText: 'Eight Park Road.',
    answerTranslation: L(
      '8 Park Road.',
      '8 Park Road.',
      '8 Park Road.',
      '8 Park Road.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['capital-letters', 'road'],
  },

  en_s1u1_n4_072_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '도로 이름을 올바르게 쓴 것을 고르세요.',
      'Yo‘l nomi to‘g‘ri yozilgan variantni tanlang.',
      'Choose the correctly capitalized road name.',
      'Выберите название дороги с правильными заглавными буквами.',
    ),
    sentenceTemplate: '8 ___',
    blankAnswers: ['Park Road'],
    options: ['Park Road', 'park road', 'Park road', 'park Road'],
    answer: 'Park Road',
    answerTranslation: L(
      '도로와 거리 이름은 대문자로 써요.',
      'Yo‘l va ko‘cha nomlari bosh harflar bilan yoziladi.',
      'Road and street names use capital letters.',
      'Названия дорог и улиц пишутся с заглавных букв.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['capital-letters', 'road'],
  },

  en_s1u1_n4_073_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'My name is Josie Harris.',
    audioText: 'My name is Josie Harris.',
    answerTranslation: L(
      '제 이름은 Josie Harris예요.',
      'Mening ismim Josie Harris.',
      'My name is Josie Harris.',
      'Меня зовут Джози Харрис.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['forms', 'capital-letters'],
  },

  en_s1u1_n4_074_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Josie Harris → First name: ___',
    blankAnswers: ['Josie'],
    options: ['Josie', 'Harris', 'USA', 'Texas'],
    answer: 'Josie',
    answerTranslation: L(
      '이름: Josie',
      'Ism: Josie',
      'First name: Josie',
      'Имя: Josie',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['forms', 'first-name'],
  },

  en_s1u1_n4_075_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I’m from the USA.',
    audioText: 'I’m from the USA.',
    answerTranslation: L(
      '저는 미국 출신이에요.',
      'Men AQShdanman.',
      'I’m from the USA.',
      'Я из США.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['forms', 'country'],
  },

  en_s1u1_n4_076_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Josie Harris → Country: ___',
    blankAnswers: ['the USA'],
    options: ['the USA', 'Austin', 'Texas', 'Harris'],
    answer: 'the USA',
    answerTranslation: L(
      '나라: 미국',
      'Mamlakat: AQSh',
      'Country: the USA',
      'Страна: США',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['forms', 'country'],
  },

  en_s1u1_n4_077_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'My address is 909 Cameron Road, Austin, Texas.',
    audioText: 'My address is 909 Cameron Road, Austin, Texas.',
    answerTranslation: L(
      '제 주소는 909 Cameron Road, Austin, Texas예요.',
      'Mening manzilim 909 Cameron Road, Austin, Texas.',
      'My address is 909 Cameron Road, Austin, Texas.',
      'Мой адрес — 909 Cameron Road, Остин, Техас.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['forms', 'address', 'capital-letters'],
  },

  en_s1u1_n4_078_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'I’m here on business.',
    audioText: 'I’m here on business.',
    answerI18n: L(
      '저는 업무로 여기 왔어요',
      'Men bu yerga ish bilan keldim',
      'I’m here on business',
      'Я здесь по делам',
    ),
    optionsI18n: {
      ko: ['저는', '업무로', '여기', '왔어요', '휴가로', '공부하러'],
      uz: ['Men', 'bu', 'yerga', 'ish', 'bilan', 'keldim', 'ta’tilga'],
      en: ['I’m', 'here', 'on', 'business', 'holiday', 'study'],
      ru: ['Я', 'здесь', 'по', 'делам', 'в', 'отпуске'],
    },
    answerTranslation: L(
      '저는 업무로 여기 왔어요.',
      'Men bu yerga ish bilan keldim.',
      'I’m here on business.',
      'Я здесь по делам.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['forms', 'reason-for-visit'],
  },

  en_s1u1_n4_079_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Have a nice day.' }],
    options: [
      'Thanks. You, too.',
      'My address is Austin.',
      'I’m from the USA.',
      'First name.',
    ],
    answer: 'Thanks. You, too.',
    answerTranslation: L(
      '고마워요. 당신도 좋은 하루 보내세요.',
      'Rahmat. Sizga ham.',
      'Thanks. You, too.',
      'Спасибо. И вам тоже.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['greeting', 'goodbye', 'review'],
  },

  en_s1u1_n4_080_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Goodbye. Have a nice day.',
    audioText: 'Goodbye. Have a nice day.',
    answerTranslation: L(
      '안녕히 가세요. 좋은 하루 보내세요.',
      'Xayr. Kuningiz yaxshi o‘tsin.',
      'Goodbye. Have a nice day.',
      'До свидания. Хорошего дня.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['goodbye', 'review'],
  },
};

// ─────────────────────────────────────────────────────────────
// Node 4
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT1_NODE4 = {
  title: L(
    '인사하고 정보 적기',
    'Salomlashish va ma’lumot yozish',
    'Greetings and personal information',
    'Приветствия и личная информация',
  ),
  section: 1,
  unit: 1,
  order: 4,
  isActive: true,

  lessons: [
    {
      title: L('어떻게 지내세요?', 'Qalaysiz?', 'How are you?', 'Как вы?'),
      description: L(
        '아침 인사와 안부를 묻고 자연스럽게 대답해요.',
        'Ertalab salomlashib, hol-ahvol so‘rash va javob berishni o‘rganasiz.',
        'Greet people and ask and answer How are you?',
        'Учимся здороваться и отвечать на вопрос How are you?',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 1,
      questions: [
        'en_s1u1_n4_001_speaking',
        'en_s1u1_n4_002_speaking',
        'en_s1u1_n4_003_fill_in_blank',
        'en_s1u1_n4_004_speaking',
        'en_s1u1_n4_005_dialog_complete',
        'en_s1u1_n4_006_speaking',
        'en_s1u1_n4_007_fill_in_blank',
        'en_s1u1_n4_008_speaking',
        'en_s1u1_n4_009_translate_builder',
        'en_s1u1_n4_010_speaking',
        'en_s1u1_n4_011_word_matching',
        'en_s1u1_n4_012_speaking',
        'en_s1u1_n4_013_fill_in_blank',
        'en_s1u1_n4_014_speaking',
        'en_s1u1_n4_015_audio_match',
        'en_s1u1_n4_016_speaking',
        'en_s1u1_n4_017_sentence_builder',
        'en_s1u1_n4_018_speaking',
        'en_s1u1_n4_019_dialog_complete',
        'en_s1u1_n4_020_speaking',
      ],
    },

    {
      title: L(
        '좋은 하루 보내세요',
        'Kuningiz yaxshi o‘tsin',
        'Have a nice day',
        'Хорошего дня',
      ),
      description: L(
        'Goodbye, Bye, See you later 같은 작별 표현과 빠른 대답을 연습해요.',
        'Goodbye, Bye va See you later kabi xayrlashuvlarni tez javoblar bilan mashq qilasiz.',
        'Practise common goodbyes and quick responses.',
        'Практикуем прощания и быстрые ответы.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 2,
      questions: [
        'en_s1u1_n4_021_speaking',
        'en_s1u1_n4_022_dialog_complete',
        'en_s1u1_n4_023_speaking',
        'en_s1u1_n4_024_fill_in_blank',
        'en_s1u1_n4_025_speaking',
        'en_s1u1_n4_026_speaking',
        'en_s1u1_n4_027_fill_in_blank',
        'en_s1u1_n4_028_speaking',
        'en_s1u1_n4_029_translate_builder',
        'en_s1u1_n4_030_speaking',
        'en_s1u1_n4_031_word_matching',
        'en_s1u1_n4_032_speaking',
        'en_s1u1_n4_033_dialog_complete',
        'en_s1u1_n4_034_speaking',
        'en_s1u1_n4_035_audio_match',
        'en_s1u1_n4_036_speaking',
        'en_s1u1_n4_037_word_arrange',
        'en_s1u1_n4_038_speaking',
        'en_s1u1_n4_039_dialog_complete',
        'en_s1u1_n4_040_speaking',
      ],
    },

    {
      title: L(
        '등록 양식 작성하기',
        'Ro‘yxatdan o‘tish formasini to‘ldirish',
        'Filling in a form',
        'Заполнение анкеты',
      ),
      description: L(
        '이름, 성, 나라, 주소, 전화번호, 방문 목적, 서명 항목을 익혀요.',
        'Ism, familiya, mamlakat, manzil, telefon raqami, tashrif sababi va imzoni o‘rganasiz.',
        'Learn the main fields on a registration form.',
        'Учимся понимать основные поля регистрационной формы.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 3,
      questions: [
        'en_s1u1_n4_041_speaking',
        'en_s1u1_n4_042_speaking',
        'en_s1u1_n4_043_word_matching',
        'en_s1u1_n4_044_speaking',
        'en_s1u1_n4_045_fill_in_blank',
        'en_s1u1_n4_046_speaking',
        'en_s1u1_n4_047_fill_in_blank',
        'en_s1u1_n4_048_speaking',
        'en_s1u1_n4_049_fill_in_blank',
        'en_s1u1_n4_050_speaking',
        'en_s1u1_n4_051_audio_match',
        'en_s1u1_n4_052_speaking',
        'en_s1u1_n4_053_fill_in_blank',
        'en_s1u1_n4_054_speaking',
        'en_s1u1_n4_055_fill_in_blank',
        'en_s1u1_n4_056_speaking',
        'en_s1u1_n4_057_sentence_builder',
        'en_s1u1_n4_058_speaking',
        'en_s1u1_n4_059_dialog_complete',
        'en_s1u1_n4_060_speaking',
      ],
    },

    {
      title: L(
        '대문자 확인하기',
        'Bosh harflarni tekshirish',
        'Checking capital letters',
        'Проверяем заглавные буквы',
      ),
      description: L(
        '사람·도시·나라·I·문장 첫 단어·도로 이름의 대문자 규칙을 익히고 등록 정보를 복습해요.',
        'Ism, shahar, mamlakat, I, gap boshi va yo‘l nomlaridagi bosh harflarni o‘rganasiz.',
        'Use capital letters correctly in names, cities, countries, sentences, and addresses.',
        'Учимся правильно использовать заглавные буквы в именах, городах, странах, предложениях и адресах.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 4,
      questions: [
        'en_s1u1_n4_061_speaking',
        'en_s1u1_n4_062_fill_in_blank',
        'en_s1u1_n4_063_speaking',
        'en_s1u1_n4_064_fill_in_blank',
        'en_s1u1_n4_065_speaking',
        'en_s1u1_n4_066_fill_in_blank',
        'en_s1u1_n4_067_speaking',
        'en_s1u1_n4_068_fill_in_blank',
        'en_s1u1_n4_069_speaking',
        'en_s1u1_n4_070_fill_in_blank',
        'en_s1u1_n4_071_speaking',
        'en_s1u1_n4_072_fill_in_blank',
        'en_s1u1_n4_073_speaking',
        'en_s1u1_n4_074_fill_in_blank',
        'en_s1u1_n4_075_speaking',
        'en_s1u1_n4_076_fill_in_blank',
        'en_s1u1_n4_077_speaking',
        'en_s1u1_n4_078_sentence_builder',
        'en_s1u1_n4_079_dialog_complete',
        'en_s1u1_n4_080_speaking',
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Section 1 · Unit 1 · Node 5
// 1.5 At the hotel + Listening for pleasure + Unit 1 Review
//
// 4 lessons × 20 questions = 80
//
// Lesson 1: At the hotel
// Lesson 2: Hotel check-in
// Lesson 3: Murder in Kingston
// Lesson 4: Unit 1 review
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT1_NODE5_WORDS = [
  {
    code: 'en-place-hotel',
    english: 'hotel',
    senseKey: 'accommodation',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '호텔',
      'mehmonxona',
      'a place where people pay to stay',
      'отель',
    ),
    examples: [
      {
        english: 'We are in a hotel.',
        translations: L(
          '우리는 호텔에 있어요.',
          'Biz mehmonxonadamiz.',
          'We are in a hotel.',
          'Мы в отеле.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/həʊˈtel/',
      ttsText: 'hotel',
    },
    media: {
      emoji: '🏨',
      imageUrl: '',
      imageAlt: L(
        '호텔 건물',
        'mehmonxona binosi',
        'a hotel building',
        'здание отеля',
      ),
    },
    tags: ['hotel', 'travel'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-hotel-breakfast',
    english: 'breakfast',
    senseKey: 'morning-meal',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('아침 식사', 'nonushta', 'the first meal of the day', 'завтрак'),
    examples: [
      {
        english: 'Where’s breakfast?',
        translations: L(
          '아침 식사는 어디예요?',
          'Nonushta qayerda?',
          'Where’s breakfast?',
          'Где завтрак?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈbrekfəst/',
      ttsText: 'breakfast',
    },
    media: {
      emoji: '🍳',
      imageUrl: '',
      imageAlt: L('아침 식사', 'nonushta', 'breakfast', 'завтрак'),
    },
    tags: ['hotel', 'food'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-hotel-conference-room',
    english: 'conference room',
    senseKey: 'meeting-room',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '회의실',
      'konferensiya xonasi',
      'a room for meetings',
      'конференц-зал',
    ),
    examples: [
      {
        english: 'The conference room is over there.',
        translations: L(
          '회의실은 저쪽에 있어요.',
          'Konferensiya xonasi ana u yerda.',
          'The conference room is over there.',
          'Конференц-зал находится вон там.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkɒnfərəns ruːm/',
      ttsText: 'conference room',
    },
    media: {
      emoji: '🧑‍💼',
      imageUrl: '',
      imageAlt: L(
        '회의실',
        'konferensiya xonasi',
        'a conference room',
        'конференц-зал',
      ),
    },
    tags: ['hotel', 'business'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-hotel-credit-card',
    english: 'credit card',
    senseKey: 'payment-card',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '신용카드',
      'kredit karta',
      'a card used to pay for things',
      'кредитная карта',
    ),
    examples: [
      {
        english: 'Here’s my credit card.',
        translations: L(
          '제 신용카드 여기 있어요.',
          'Mana mening kredit kartam.',
          'Here’s my credit card.',
          'Вот моя кредитная карта.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkredɪt kɑːd/',
      ttsText: 'credit card',
    },
    media: {
      emoji: '💳',
      imageUrl: '',
      imageAlt: L(
        '신용카드',
        'kredit karta',
        'a credit card',
        'кредитная карта',
      ),
    },
    tags: ['hotel', 'payment'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-hotel-guest',
    english: 'guest',
    senseKey: 'hotel-customer',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '투숙객; 손님',
      'mehmon',
      'a person staying at a hotel',
      'гость',
    ),
    examples: [
      {
        english: 'The guest is at reception.',
        translations: L(
          '투숙객이 프런트에 있어요.',
          'Mehmon qabulxonada.',
          'The guest is at reception.',
          'Гость находится у стойки регистрации.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɡest/',
      ttsText: 'guest',
    },
    media: {
      emoji: '🧳',
      imageUrl: '',
      imageAlt: L(
        '호텔 투숙객',
        'mehmonxona mehmoni',
        'a hotel guest',
        'гость отеля',
      ),
    },
    tags: ['hotel', 'people'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-hotel-receptionist',
    english: 'receptionist',
    senseKey: 'hotel-worker',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '접수 직원; 프런트 직원',
      'qabulxona xodimi',
      'a person who welcomes guests and gives information',
      'администратор на ресепшене',
    ),
    examples: [
      {
        english: 'The receptionist asks for your name.',
        translations: L(
          '프런트 직원이 이름을 물어요.',
          'Qabulxona xodimi ismingizni so‘raydi.',
          'The receptionist asks for your name.',
          'Администратор спрашивает ваше имя.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/rɪˈsepʃənɪst/',
      ttsText: 'receptionist',
    },
    media: {
      emoji: '🛎️',
      imageUrl: '',
      imageAlt: L(
        '호텔 프런트 직원',
        'mehmonxona qabulxona xodimi',
        'a hotel receptionist',
        'администратор отеля',
      ),
    },
    tags: ['hotel', 'people'],
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
        english: 'The restaurant is over there.',
        translations: L(
          '식당은 저쪽에 있어요.',
          'Restoran ana u yerda.',
          'The restaurant is over there.',
          'Ресторан находится вон там.',
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
    tags: ['hotel', 'food'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-hotel-room-key',
    english: 'room key',
    senseKey: 'hotel-room-key',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '객실 열쇠',
      'xona kaliti',
      'a key for a hotel room',
      'ключ от номера',
    ),
    examples: [
      {
        english: 'Here’s your room key.',
        translations: L(
          '객실 열쇠 여기 있습니다.',
          'Mana xona kalitingiz.',
          'Here’s your room key.',
          'Вот ваш ключ от номера.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈruːm kiː/',
      ttsText: 'room key',
    },
    media: {
      emoji: '🔑',
      imageUrl: '',
      imageAlt: L(
        '호텔 객실 열쇠',
        'mehmonxona xona kaliti',
        'a hotel room key',
        'ключ от гостиничного номера',
      ),
    },
    tags: ['hotel', 'room'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-hotel-check-in',
    english: 'check-in',
    senseKey: 'hotel-registration',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '체크인; 투숙 수속',
      'ro‘yxatdan o‘tish',
      'the process of registering at a hotel',
      'регистрация в отеле',
    ),
    examples: [
      {
        english: 'Is check-in here?',
        translations: L(
          '체크인은 여기서 하나요?',
          'Ro‘yxatdan o‘tish shu yerdami?',
          'Is check-in here?',
          'Регистрация здесь?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈtʃek ɪn/',
      ttsText: 'check-in',
    },
    media: {
      emoji: '🛎️',
      imageUrl: '',
      imageAlt: L(
        '호텔 체크인',
        'mehmonxonada ro‘yxatdan o‘tish',
        'hotel check-in',
        'регистрация в отеле',
      ),
    },
    tags: ['hotel', 'check-in'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-hotel-number-of-nights',
    english: 'number of nights',
    senseKey: 'hotel-stay-length',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '숙박 일수',
      'tunlar soni',
      'the number of nights a guest stays',
      'количество ночей',
    ),
    examples: [
      {
        english: 'Number of nights: three.',
        translations: L(
          '숙박 일수: 3박.',
          'Tunlar soni: uch.',
          'Number of nights: three.',
          'Количество ночей: три.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈnʌmbər əv naɪts/',
      ttsText: 'number of nights',
    },
    media: {
      emoji: '🌙',
      imageUrl: '',
      imageAlt: L(
        '호텔 숙박 일수',
        'mehmonxonada tunlar soni',
        'number of hotel nights',
        'количество ночей в отеле',
      ),
    },
    tags: ['hotel', 'forms', 'numbers'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-hotel-sign',
    english: 'sign',
    senseKey: 'write-signature',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '서명하다',
      'imzo qo‘ymoq',
      'to write your signature',
      'подписывать',
    ),
    examples: [
      {
        english: 'Sign here, please.',
        translations: L(
          '여기에 서명해 주세요.',
          'Iltimos, shu yerga imzo qo‘ying.',
          'Sign here, please.',
          'Подпишите здесь, пожалуйста.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/saɪn/',
      ttsText: 'sign',
    },
    media: {
      emoji: '✍️',
      imageUrl: '',
      imageAlt: L(
        '서명하는 사람',
        'imzo qo‘yayotgan odam',
        'a person signing a form',
        'человек, подписывающий документ',
      ),
    },
    tags: ['hotel', 'forms'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-place-over-there',
    english: 'over there',
    senseKey: 'distant-location',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '저쪽에',
      'ana u yerda',
      'in a place away from the speaker',
      'вон там',
    ),
    examples: [
      {
        english: 'The restaurant is over there.',
        translations: L(
          '식당은 저쪽에 있어요.',
          'Restoran ana u yerda.',
          'The restaurant is over there.',
          'Ресторан вон там.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌəʊvə ˈðeə/',
      ttsText: 'over there',
    },
    media: {
      emoji: '👉',
      imageUrl: '',
      imageAlt: L(
        '멀리 있는 장소를 가리키는 사람',
        'uzoqdagi joyni ko‘rsatayotgan odam',
        'a person pointing to a place',
        'человек, указывающий на место',
      ),
    },
    tags: ['place', 'hotel'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-person-full-name',
    english: 'full name',
    senseKey: 'complete-name',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '성명을 모두 포함한 이름',
      'to‘liq ism',
      'a person’s complete name',
      'полное имя',
    ),
    examples: [
      {
        english: 'What’s your full name?',
        translations: L(
          '성함이 어떻게 되세요?',
          'To‘liq ismingiz nima?',
          'What’s your full name?',
          'Как ваше полное имя?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌfʊl ˈneɪm/',
      ttsText: 'full name',
    },
    media: {
      emoji: '🪪',
      imageUrl: '',
      imageAlt: L(
        '신분증에 적힌 전체 이름',
        'hujjatdagi to‘liq ism',
        'a full name on an ID card',
        'полное имя в документе',
      ),
    },
    tags: ['personal-information'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-police-chief-inspector',
    english: 'Chief Inspector',
    senseKey: 'police-rank',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '수석 경감',
      'bosh inspektor',
      'a senior police officer',
      'старший инспектор',
    ),
    examples: [
      {
        english: 'I’m Chief Inspector Thomas Abbot.',
        translations: L(
          '저는 수석 경감 Thomas Abbot입니다.',
          'Men bosh inspektor Thomas Abbotman.',
          'I’m Chief Inspector Thomas Abbot.',
          'Я старший инспектор Томас Эббот.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌtʃiːf ɪnˈspektə/',
      ttsText: 'Chief Inspector',
    },
    media: {
      emoji: '👮',
      imageUrl: '',
      imageAlt: L(
        '경찰 수사관',
        'politsiya inspektori',
        'a police inspector',
        'инспектор полиции',
      ),
    },
    tags: ['listening-story', 'police'],
    difficulty: 1,
    isCore: false,
  },

  {
    code: 'en-police-department',
    english: 'police department',
    senseKey: 'police-organization',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '경찰서; 경찰 부서',
      'politsiya bo‘limi',
      'an organization responsible for policing an area',
      'полицейское управление',
    ),
    examples: [
      {
        english: 'I’m from the Kingston Police Department.',
        translations: L(
          '저는 Kingston 경찰서에서 왔어요.',
          'Men Kingston politsiya bo‘limidanman.',
          'I’m from the Kingston Police Department.',
          'Я из полицейского управления Кингстона.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/pəˈliːs dɪˌpɑːtmənt/',
      ttsText: 'police department',
    },
    media: {
      emoji: '🚓',
      imageUrl: '',
      imageAlt: L(
        '경찰서',
        'politsiya bo‘limi',
        'a police department',
        'полицейское управление',
      ),
    },
    tags: ['listening-story', 'police'],
    difficulty: 1,
    isCore: false,
  },

  {
    code: 'en-crime-murder',
    english: 'murder',
    senseKey: 'killing-crime',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '살인',
      'qotillik',
      'the crime of deliberately killing someone',
      'убийство',
    ),
    examples: [
      {
        english: 'The police ask questions about a murder.',
        translations: L(
          '경찰이 살인 사건에 대해 질문해요.',
          'Politsiya qotillik haqida savollar beradi.',
          'The police ask questions about a murder.',
          'Полиция задаёт вопросы об убийстве.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈmɜːdə/',
      ttsText: 'murder',
    },
    media: {
      emoji: '🔎',
      imageUrl: '',
      imageAlt: L(
        '사건을 조사하는 경찰',
        'jinoyatni tekshirayotgan politsiya',
        'police investigating a case',
        'полиция, расследующая дело',
      ),
    },
    tags: ['listening-story'],
    difficulty: 1,
    isCore: false,
  },

  {
    code: 'en-person-friend',
    english: 'friend',
    senseKey: 'person-you-like',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('친구', 'do‘st', 'a person you know and like', 'друг'),
    examples: [
      {
        english: 'She’s here with her friend.',
        translations: L(
          '그녀는 친구와 함께 여기 있어요.',
          'U bu yerda do‘sti bilan.',
          'She’s here with her friend.',
          'Она здесь со своей подругой.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/frend/',
      ttsText: 'friend',
    },
    media: {
      emoji: '🧑‍🤝‍🧑',
      imageUrl: '',
      imageAlt: L('두 친구', 'ikki do‘st', 'two friends', 'два друга'),
    },
    tags: ['people', 'listening-story'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-job-businesswoman',
    english: 'businesswoman',
    senseKey: 'female-business-person',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '여성 사업가',
      'ishbilarmon ayol',
      'a woman who works in business',
      'деловая женщина',
    ),
    examples: [
      {
        english: 'I’m a businesswoman.',
        translations: L(
          '저는 사업가예요.',
          'Men ishbilarmon ayolman.',
          'I’m a businesswoman.',
          'Я деловая женщина.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈbɪznəswʊmən/',
      ttsText: 'businesswoman',
    },
    media: {
      emoji: '👩‍💼',
      imageUrl: '',
      imageAlt: L(
        '여성 사업가',
        'ishbilarmon ayol',
        'a businesswoman',
        'деловая женщина',
      ),
    },
    tags: ['job', 'listening-story'],
    difficulty: 1,
    isCore: false,
  },

  {
    code: 'en-verb-lie',
    english: 'lie',
    senseKey: 'say-not-true',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '거짓말하다',
      'yolg‘on gapirmoq',
      'to say something that is not true',
      'лгать',
    ),
    examples: [
      {
        english: 'Who is lying?',
        translations: L(
          '누가 거짓말하고 있어요?',
          'Kim yolg‘on gapiryapti?',
          'Who is lying?',
          'Кто лжёт?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/laɪ/',
      ttsText: 'lie',
    },
    media: {
      emoji: '🤥',
      imageUrl: '',
      imageAlt: L(
        '거짓말하는 사람',
        'yolg‘on gapirayotgan odam',
        'a person telling a lie',
        'человек, который лжёт',
      ),
    },
    tags: ['listening-story'],
    difficulty: 1,
    isCore: false,
  },
];

export const EN_S1_UNIT1_NODE5_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · At the hotel
  // q001 ~ q020
  // ===========================================================

  en_s1u1_n5_001_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Hotel.',
    audioText: 'Hotel.',
    answerTranslation: L('호텔.', 'Mehmonxona.', 'Hotel.', 'Отель.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['hotel'],
  },

  en_s1u1_n5_002_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Receptionist.',
    audioText: 'Receptionist.',
    answerTranslation: L(
      '프런트 직원.',
      'Qabulxona xodimi.',
      'Receptionist.',
      'Администратор.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['hotel', 'receptionist'],
  },

  en_s1u1_n5_003_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      { korean: 'receptionist', native: 'qabulxona xodimi' },
      { korean: 'guest', native: 'mehmon' },
      { korean: 'restaurant', native: 'restoran' },
      { korean: 'breakfast', native: 'nonushta' },
      { korean: 'room key', native: 'xona kaliti' },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['hotel', 'matching'],
  },

  en_s1u1_n5_004_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Guest.',
    audioText: 'Guest.',
    answerTranslation: L('투숙객.', 'Mehmon.', 'Guest.', 'Гость.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['hotel', 'guest'],
  },

  en_s1u1_n5_005_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The ___ works at the hotel desk.',
    blankAnswers: ['receptionist'],
    options: ['receptionist', 'guest', 'breakfast', 'room key'],
    answer: 'receptionist',
    answerTranslation: L(
      '프런트 직원은 호텔 데스크에서 일해요.',
      'Qabulxona xodimi mehmonxona stolida ishlaydi.',
      'The receptionist works at the hotel desk.',
      'Администратор работает за стойкой отеля.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['hotel', 'receptionist'],
  },

  en_s1u1_n5_006_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Breakfast.',
    audioText: 'Breakfast.',
    answerTranslation: L('아침 식사.', 'Nonushta.', 'Breakfast.', 'Завтрак.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['hotel', 'breakfast'],
  },

  en_s1u1_n5_007_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Conference room.',
    audioText: 'Conference room.',
    answerTranslation: L(
      '회의실.',
      'Konferensiya xonasi.',
      'Conference room.',
      'Конференц-зал.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['hotel', 'conference-room'],
  },

  en_s1u1_n5_008_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      { korean: 'credit card', native: 'kredit karta' },
      { korean: 'conference room', native: 'konferensiya xonasi' },
      { korean: 'check-in', native: 'ro‘yxatdan o‘tish' },
      { korean: 'restaurant', native: 'restoran' },
      { korean: 'room key', native: 'xona kaliti' },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['hotel', 'listening'],
  },

  en_s1u1_n5_009_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Credit card.',
    audioText: 'Credit card.',
    answerTranslation: L(
      '신용카드.',
      'Kredit karta.',
      'Credit card.',
      'Кредитная карта.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['hotel', 'credit-card'],
  },

  en_s1u1_n5_010_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Here’s your ___.',
    blankAnswers: ['room key'],
    options: ['room key', 'breakfast', 'restaurant', 'guest'],
    answer: 'room key',
    answerTranslation: L(
      '객실 열쇠 여기 있습니다.',
      'Mana xona kalitingiz.',
      'Here’s your room key.',
      'Вот ваш ключ от номера.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['hotel', 'room-key'],
  },

  en_s1u1_n5_011_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Room key.',
    audioText: 'Room key.',
    answerTranslation: L(
      '객실 열쇠.',
      'Xona kaliti.',
      'Room key.',
      'Ключ от номера.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['hotel', 'room-key'],
  },

  en_s1u1_n5_012_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['Where’s', 'breakfast', 'room', 'key', 'guest'],
    answer: 'Where’s breakfast',
    answerTranslation: L(
      '아침 식사는 어디예요?',
      'Nonushta qayerda?',
      'Where’s breakfast?',
      'Где завтрак?',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['hotel', 'breakfast'],
  },

  en_s1u1_n5_013_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Restaurant.',
    audioText: 'Restaurant.',
    answerTranslation: L('레스토랑.', 'Restoran.', 'Restaurant.', 'Ресторан.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['hotel', 'restaurant'],
  },

  en_s1u1_n5_014_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The restaurant is ___.',
    blankAnswers: ['over there'],
    options: ['over there', 'credit card', 'guest', 'breakfast'],
    answer: 'over there',
    answerTranslation: L(
      '레스토랑은 저쪽에 있어요.',
      'Restoran ana u yerda.',
      'The restaurant is over there.',
      'Ресторан находится вон там.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['hotel', 'place'],
  },

  en_s1u1_n5_015_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The restaurant is over there.',
    audioText: 'The restaurant is over there.',
    answerTranslation: L(
      '레스토랑은 저쪽에 있어요.',
      'Restoran ana u yerda.',
      'The restaurant is over there.',
      'Ресторан находится вон там.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['hotel', 'restaurant'],
  },

  en_s1u1_n5_016_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['your', 'Here’s', 'room', 'key', 'restaurant'],
    answer: 'Here’s your room key',
    audioText: 'Here’s your room key.',
    answerTranslation: L(
      '객실 열쇠 여기 있습니다.',
      'Mana xona kalitingiz.',
      'Here’s your room key.',
      'Вот ваш ключ от номера.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['hotel', 'room-key'],
  },

  en_s1u1_n5_017_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Check-in.',
    audioText: 'Check-in.',
    answerTranslation: L(
      '체크인.',
      'Ro‘yxatdan o‘tish.',
      'Check-in.',
      'Регистрация.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['hotel', 'check-in'],
  },

  en_s1u1_n5_018_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Number of ___: three.',
    blankAnswers: ['nights'],
    options: ['nights', 'names', 'rooms', 'countries'],
    answer: 'nights',
    answerTranslation: L(
      '숙박 일수: 3박.',
      'Tunlar soni: uch.',
      'Number of nights: three.',
      'Количество ночей: три.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['hotel', 'nights'],
  },

  en_s1u1_n5_019_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Number of nights.',
    audioText: 'Number of nights.',
    answerTranslation: L(
      '숙박 일수.',
      'Tunlar soni.',
      'Number of nights.',
      'Количество ночей.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['hotel', 'forms'],
  },

  en_s1u1_n5_020_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'The restaurant is over there.',
    audioText: 'The restaurant is over there.',
    answerI18n: L(
      '레스토랑은 저쪽에 있어요',
      'Restoran ana u yerda',
      'The restaurant is over there',
      'Ресторан находится вон там',
    ),
    optionsI18n: {
      ko: ['레스토랑은', '저쪽에', '있어요', '객실은', '여기에'],
      uz: ['Restoran', 'ana', 'u', 'yerda', 'xona', 'bu'],
      en: ['The', 'restaurant', 'is', 'over', 'there', 'room'],
      ru: ['Ресторан', 'находится', 'вон', 'там', 'номер', 'здесь'],
    },
    answerTranslation: L(
      '레스토랑은 저쪽에 있어요.',
      'Restoran ana u yerda.',
      'The restaurant is over there.',
      'Ресторан находится вон там.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['hotel', 'sentence-builder'],
  },

  // ===========================================================
  // Lesson 2 · Hotel check-in
  // q021 ~ q040
  // ===========================================================

  en_s1u1_n5_021_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Is check-in here?',
    audioText: 'Is check-in here?',
    answerTranslation: L(
      '체크인은 여기서 하나요?',
      'Ro‘yxatdan o‘tish shu yerdami?',
      'Is check-in here?',
      'Регистрация здесь?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['hotel', 'check-in'],
  },

  en_s1u1_n5_022_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'user', text: 'Is check-in here?' }],
    options: [
      'Yes. What’s your name?',
      'I’m from France.',
      'See you later.',
      'Breakfast.',
    ],
    answer: 'Yes. What’s your name?',
    answerTranslation: L(
      '네. 이름이 어떻게 되세요?',
      'Ha. Ismingiz nima?',
      'Yes. What’s your name?',
      'Да. Как вас зовут?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['hotel', 'dialog'],
  },

  en_s1u1_n5_023_speaking: {
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
    tags: ['hotel', 'name'],
  },

  en_s1u1_n5_024_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'What’s your ___?',
    blankAnswers: ['address'],
    options: ['address', 'breakfast', 'restaurant', 'holiday'],
    answer: 'address',
    answerTranslation: L(
      '주소가 뭐예요?',
      'Manzilingiz nima?',
      'What’s your address?',
      'Какой у вас адрес?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['hotel', 'address'],
  },

  en_s1u1_n5_025_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'What’s your address?',
    audioText: 'What’s your address?',
    answerTranslation: L(
      '주소가 뭐예요?',
      'Manzilingiz nima?',
      'What’s your address?',
      'Какой у вас адрес?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['hotel', 'address'],
  },

  en_s1u1_n5_026_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['here', 'Sign', 'please', 'breakfast', 'your'],
    answer: 'Sign here please',
    answerTranslation: L(
      '여기에 서명해 주세요.',
      'Iltimos, shu yerga imzo qo‘ying.',
      'Sign here, please.',
      'Подпишите здесь, пожалуйста.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['hotel', 'sign'],
  },

  en_s1u1_n5_027_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Sign here, please.',
    audioText: 'Sign here, please.',
    answerTranslation: L(
      '여기에 서명해 주세요.',
      'Iltimos, shu yerga imzo qo‘ying.',
      'Sign here, please.',
      'Подпишите здесь, пожалуйста.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['hotel', 'sign'],
  },

  en_s1u1_n5_028_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Here’s my credit card.',
    audioText: 'Here’s my credit card.',
    answerTranslation: L(
      '제 신용카드 여기 있어요.',
      'Mana mening kredit kartam.',
      'Here’s my credit card.',
      'Вот моя кредитная карта.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['hotel', 'credit-card'],
  },

  en_s1u1_n5_029_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['credit', 'Here’s', 'my', 'card', 'room'],
    answer: 'Here’s my credit card',
    audioText: 'Here’s my credit card.',
    answerTranslation: L(
      '제 신용카드 여기 있어요.',
      'Mana mening kredit kartam.',
      'Here’s my credit card.',
      'Вот моя кредитная карта.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['hotel', 'credit-card'],
  },

  en_s1u1_n5_030_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Are you here on business?',
    audioText: 'Are you here on business?',
    answerTranslation: L(
      '업무로 여기 오셨어요?',
      'Bu yerga ish bilan keldingizmi?',
      'Are you here on business?',
      'Вы здесь по делам?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['hotel', 'business'],
  },

  en_s1u1_n5_031_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Are you here on business?' }],
    options: [
      'No, I’m here on holiday.',
      'Room key.',
      'Good morning restaurant.',
      'What address?',
    ],
    answer: 'No, I’m here on holiday.',
    answerTranslation: L(
      '아니요, 저는 휴가로 왔어요.',
      'Yo‘q, men ta’tilga keldim.',
      'No, I’m here on holiday.',
      'Нет, я здесь в отпуске.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['hotel', 'business', 'holiday'],
  },

  en_s1u1_n5_032_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I’m from France.',
    audioText: 'I’m from France.',
    answerTranslation: L(
      '저는 프랑스 출신이에요.',
      'Men Fransiyadanman.',
      'I’m from France.',
      'Я из Франции.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['hotel', 'origin'],
  },

  en_s1u1_n5_033_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Where’s ___?',
    blankAnswers: ['breakfast'],
    options: ['breakfast', 'business', 'credit', 'guest'],
    answer: 'breakfast',
    answerTranslation: L(
      '아침 식사는 어디예요?',
      'Nonushta qayerda?',
      'Where’s breakfast?',
      'Где завтрак?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['hotel', 'breakfast'],
  },

  en_s1u1_n5_034_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Where’s breakfast?',
    audioText: 'Where’s breakfast?',
    answerTranslation: L(
      '아침 식사는 어디예요?',
      'Nonushta qayerda?',
      'Where’s breakfast?',
      'Где завтрак?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['hotel', 'breakfast'],
  },

  en_s1u1_n5_035_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Here’s your room key.',
    audioText: 'Here’s your room key.',
    answerI18n: L(
      '객실 열쇠 여기 있습니다',
      'Mana xona kalitingiz',
      'Here’s your room key',
      'Вот ваш ключ от номера',
    ),
    optionsI18n: {
      ko: ['객실', '열쇠', '여기', '있습니다', '신용카드', '식당'],
      uz: ['Mana', 'xona', 'kalitingiz', 'kredit', 'karta', 'restoran'],
      en: ['Here’s', 'your', 'room', 'key', 'credit', 'card'],
      ru: ['Вот', 'ваш', 'ключ', 'от', 'номера', 'карта'],
    },
    answerTranslation: L(
      '객실 열쇠 여기 있습니다.',
      'Mana xona kalitingiz.',
      'Here’s your room key.',
      'Вот ваш ключ от номера.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['hotel', 'room-key'],
  },

  en_s1u1_n5_036_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Here’s your room key.',
    audioText: 'Here’s your room key.',
    answerTranslation: L(
      '객실 열쇠 여기 있습니다.',
      'Mana xona kalitingiz.',
      'Here’s your room key.',
      'Вот ваш ключ от номера.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['hotel', 'room-key'],
  },

  en_s1u1_n5_037_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'user', text: 'Where’s breakfast?' }],
    options: [
      'The restaurant is over there.',
      'I’m Richard.',
      'I’m from France.',
      'Here’s my credit card.',
    ],
    answer: 'The restaurant is over there.',
    answerTranslation: L(
      '레스토랑은 저쪽에 있어요.',
      'Restoran ana u yerda.',
      'The restaurant is over there.',
      'Ресторан находится вон там.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['hotel', 'dialog'],
  },

  en_s1u1_n5_038_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The restaurant is over there.',
    audioText: 'The restaurant is over there.',
    answerTranslation: L(
      '레스토랑은 저쪽에 있어요.',
      'Restoran ana u yerda.',
      'The restaurant is over there.',
      'Ресторан находится вон там.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['hotel', 'restaurant'],
  },

  en_s1u1_n5_039_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      { korean: 'Is check-in here?', native: 'Ro‘yxatdan o‘tish shu yerdami?' },
      { korean: 'What’s your address?', native: 'Manzilingiz nima?' },
      { korean: 'Sign here, please.', native: 'Shu yerga imzo qo‘ying.' },
      { korean: 'Where’s breakfast?', native: 'Nonushta qayerda?' },
      { korean: 'Here’s your room key.', native: 'Mana xona kalitingiz.' },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['hotel', 'dialog'],
  },

  en_s1u1_n5_040_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Goodbye. See you later.',
    audioText: 'Goodbye. See you later.',
    answerTranslation: L(
      '안녕히 가세요. 나중에 봐요.',
      'Xayr. Keyin ko‘rishamiz.',
      'Goodbye. See you later.',
      'До свидания. До встречи.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['hotel', 'goodbye'],
  },

  // ===========================================================
  // Lesson 3 · Murder in Kingston
  // Workbook listening for pleasure
  // q041 ~ q060
  // ===========================================================

  en_s1u1_n5_041_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Good morning. I’m Chief Inspector Thomas Abbot.',
    audioText: 'Good morning. I’m Chief Inspector Thomas Abbot.',
    answerTranslation: L(
      '좋은 아침입니다. 저는 수석 경감 Thomas Abbot입니다.',
      'Xayrli tong. Men bosh inspektor Thomas Abbotman.',
      'Good morning. I’m Chief Inspector Thomas Abbot.',
      'Доброе утро. Я старший инспектор Томас Эббот.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['listening-story', 'introduction'],
  },

  en_s1u1_n5_042_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'What’s your ___ name?',
    blankAnswers: ['full'],
    options: ['full', 'holiday', 'room', 'country'],
    answer: 'full',
    answerTranslation: L(
      '성함이 어떻게 되세요?',
      'To‘liq ismingiz nima?',
      'What’s your full name?',
      'Как ваше полное имя?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['listening-story', 'full-name'],
  },

  en_s1u1_n5_043_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'What’s your full name?',
    audioText: 'What’s your full name?',
    answerTranslation: L(
      '성함이 어떻게 되세요?',
      'To‘liq ismingiz nima?',
      'What’s your full name?',
      'Как ваше полное имя?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['listening-story', 'full-name'],
  },

  en_s1u1_n5_044_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['H', 'O', 'F', 'F', 'M', 'A', 'N'],
    answer: 'H O F F M A N',
    audioText: 'H-O-F-F-M-A-N.',
    answerTranslation: L(
      'H-O-F-F-M-A-N.',
      'H-O-F-F-M-A-N.',
      'H-O-F-F-M-A-N.',
      'H-O-F-F-M-A-N.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['listening-story', 'spelling'],
  },

  en_s1u1_n5_045_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'H-O-F-F-M-A-N.',
    audioText: 'H-O-F-F-M-A-N.',
    answerTranslation: L(
      'H-O-F-F-M-A-N.',
      'H-O-F-F-M-A-N.',
      'H-O-F-F-M-A-N.',
      'H-O-F-F-M-A-N.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['listening-story', 'spelling'],
  },

  en_s1u1_n5_046_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Hoffman? Is that H-O-F-F-M-A-N?' }],
    options: [
      'Yes, it is.',
      'I’m on holiday.',
      'My address is Brighton.',
      'Good morning.',
    ],
    answer: 'Yes, it is.',
    answerTranslation: L('네, 맞아요.', 'Ha, to‘g‘ri.', 'Yes, it is.', 'Да.'),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['listening-story', 'confirmation'],
  },

  en_s1u1_n5_047_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'What’s your home address, please?',
    audioText: 'What’s your home address, please?',
    answerTranslation: L(
      '집 주소가 어떻게 되세요?',
      'Uy manzilingiz nima?',
      'What’s your home address, please?',
      'Какой у вас домашний адрес?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['listening-story', 'address'],
  },

  en_s1u1_n5_048_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'It’s 98 Sydney ___.',
    blankAnswers: ['Street'],
    options: ['Street', 'Country', 'Holiday', 'Business'],
    answer: 'Street',
    answerTranslation: L(
      '98 Sydney Street예요.',
      '98 Sydney Street.',
      'It’s 98 Sydney Street.',
      '98 Sydney Street.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['listening-story', 'address'],
  },

  en_s1u1_n5_049_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Are you here on holiday?',
    audioText: 'Are you here on holiday?',
    answerTranslation: L(
      '휴가로 여기 오셨어요?',
      'Bu yerga ta’tilga keldingizmi?',
      'Are you here on holiday?',
      'Вы здесь в отпуске?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['listening-story', 'holiday'],
  },

  en_s1u1_n5_050_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Are you here on holiday, Mrs Hoffman?' },
    ],
    options: ['Yes, I am.', 'Yes, I’m.', 'I are.', 'Yes, you are.'],
    answer: 'Yes, I am.',
    answerTranslation: L('네, 맞아요.', 'Ha.', 'Yes, I am.', 'Да.'),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['listening-story', 'short-answer'],
  },

  en_s1u1_n5_051_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She’s here with her friend.',
    audioText: 'She’s here with her friend.',
    answerTranslation: L(
      '그녀는 친구와 함께 여기 있어요.',
      'U bu yerda do‘sti bilan.',
      'She’s here with her friend.',
      'Она здесь со своей подругой.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['listening-story', 'friend'],
  },

  en_s1u1_n5_052_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Mrs Wright is from the ___.',
    blankAnswers: ['USA'],
    options: ['USA', 'Australia', 'France', 'Japan'],
    answer: 'USA',
    answerTranslation: L(
      'Wright 씨는 미국 출신이에요.',
      'Mrs Wright AQShdan.',
      'Mrs Wright is from the USA.',
      'Миссис Райт из США.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['listening-story', 'origin'],
  },

  en_s1u1_n5_053_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I’m not from Australia. I’m from the USA.',
    audioText: 'I’m not from Australia. I’m from the USA.',
    answerTranslation: L(
      '저는 호주 출신이 아니에요. 미국 출신이에요.',
      'Men Avstraliyadan emasman. Men AQShdanman.',
      'I’m not from Australia. I’m from the USA.',
      'Я не из Австралии. Я из США.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['listening-story', 'negative'],
  },

  en_s1u1_n5_054_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['I’m', 'here', 'on', 'business', 'holiday', 'from'],
    answer: 'I’m here on business',
    answerTranslation: L(
      '저는 업무로 여기 왔어요.',
      'Men bu yerga ish bilan keldim.',
      'I’m here on business.',
      'Я здесь по делам.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['listening-story', 'business'],
  },

  en_s1u1_n5_055_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I’m here on business.',
    audioText: 'I’m here on business.',
    answerTranslation: L(
      '저는 업무로 여기 왔어요.',
      'Men bu yerga ish bilan keldim.',
      'I’m here on business.',
      'Я здесь по делам.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['listening-story', 'business'],
  },

  en_s1u1_n5_056_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I’m a ___.',
    blankAnswers: ['businesswoman'],
    options: ['businesswoman', 'restaurant', 'room key', 'country'],
    answer: 'businesswoman',
    answerTranslation: L(
      '저는 여성 사업가예요.',
      'Men ishbilarmon ayolman.',
      'I’m a businesswoman.',
      'Я деловая женщина.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['listening-story', 'job'],
  },

  en_s1u1_n5_057_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I’m a businesswoman.',
    audioText: 'I’m a businesswoman.',
    answerTranslation: L(
      '저는 여성 사업가예요.',
      'Men ishbilarmon ayolman.',
      'I’m a businesswoman.',
      'Я деловая женщина.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['listening-story', 'job'],
  },

  en_s1u1_n5_058_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Mrs Hoffman says you’re friends.' }],
    options: [
      'I know her, but we aren’t friends.',
      'Yes, we’re Australia.',
      'My room key is France.',
      'Good morning business.',
    ],
    answer: 'I know her, but we aren’t friends.',
    answerTranslation: L(
      '그분을 알지만 우리는 친구는 아니에요.',
      'Men uni taniyman, lekin biz do‘st emasmiz.',
      'I know her, but we aren’t friends.',
      'Я её знаю, но мы не друзья.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['listening-story', 'negative'],
  },

  en_s1u1_n5_059_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Who is lying?',
    audioText: 'Who is lying?',
    answerTranslation: L(
      '누가 거짓말하고 있어요?',
      'Kim yolg‘on gapiryapti?',
      'Who is lying?',
      'Кто лжёт?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['listening-story'],
  },

  en_s1u1_n5_060_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Mrs Hoffman isn’t here!' }],
    options: [
      'But I think I know why.',
      'I’m from breakfast.',
      'Room key, please.',
      'Good morning Australia.',
    ],
    answer: 'But I think I know why.',
    answerTranslation: L(
      '하지만 이유를 알 것 같아요.',
      'Lekin men sababini bilaman deb o‘ylayman.',
      'But I think I know why.',
      'Но, кажется, я знаю почему.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['listening-story', 'ending'],
  },

  // ===========================================================
  // Lesson 4 · Unit 1 Review
  // q061 ~ q080
  // ===========================================================

  en_s1u1_n5_061_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Hello, I’m Gary.',
    audioText: 'Hello, I’m Gary.',
    answerTranslation: L(
      '안녕하세요, 저는 Gary예요.',
      'Salom, men Garyman.',
      'Hello, I’m Gary.',
      'Здравствуйте, я Гэри.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'introduction'],
  },

  en_s1u1_n5_062_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['Nice', 'to', 'meet', 'you', 'holiday'],
    answer: 'Nice to meet you',
    audioText: 'Nice to meet you.',
    answerTranslation: L(
      '만나서 반가워요.',
      'Tanishganimdan xursandman.',
      'Nice to meet you.',
      'Приятно познакомиться.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['review', 'introduction'],
  },

  en_s1u1_n5_063_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Are you here on holiday?',
    audioText: 'Are you here on holiday?',
    answerTranslation: L(
      '휴가로 여기 오셨어요?',
      'Bu yerga ta’tilga keldingizmi?',
      'Are you here on holiday?',
      'Вы здесь в отпуске?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'be'],
  },

  en_s1u1_n5_064_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Are you here on holiday?' }],
    options: [
      'No, I’m not. I’m here on business.',
      'No, I aren’t.',
      'Yes, I’m.',
      'Are business.',
    ],
    answer: 'No, I’m not. I’m here on business.',
    answerTranslation: L(
      '아니요. 저는 업무로 여기 왔어요.',
      'Yo‘q. Men bu yerga ish bilan keldim.',
      'No, I’m not. I’m here on business.',
      'Нет. Я здесь по делам.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'be', 'short-answer'],
  },

  en_s1u1_n5_065_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ your name?',
    blankAnswers: ['What’s'],
    options: ['What’s', 'How', 'Where', 'Are'],
    answer: 'What’s',
    answerTranslation: L(
      '이름이 뭐예요?',
      'Ismingiz nima?',
      'What’s your name?',
      'Как вас зовут?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'question-word'],
  },

  en_s1u1_n5_066_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'How do you spell that?',
    audioText: 'How do you spell that?',
    answerTranslation: L(
      '그거 철자가 어떻게 돼요?',
      'Buni qanday harflaysiz?',
      'How do you spell that?',
      'Как это пишется по буквам?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'spelling'],
  },

  en_s1u1_n5_067_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Where are you ___?',
    blankAnswers: ['from'],
    options: ['from', 'spell', 'name', 'phone'],
    answer: 'from',
    answerTranslation: L(
      '어디 출신이에요?',
      'Qayerdansiz?',
      'Where are you from?',
      'Откуда вы?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'origin'],
  },

  en_s1u1_n5_068_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Where in Canada?',
    audioText: 'Where in Canada?',
    answerTranslation: L(
      '캐나다 어디예요?',
      'Kanadaning qayeridan?',
      'Where in Canada?',
      'Откуда именно в Канаде?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'where'],
  },

  en_s1u1_n5_069_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ you here on business?',
    blankAnswers: ['Are'],
    options: ['Are', 'Am', 'You’re', 'What'],
    answer: 'Are',
    answerTranslation: L(
      '업무로 여기 오셨어요?',
      'Bu yerga ish bilan keldingizmi?',
      'Are you here on business?',
      'Вы здесь по делам?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'be'],
  },

  en_s1u1_n5_070_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['We’re', 'from', 'China', 'not', 'Japan'],
    answer: 'We’re from China',
    answerTranslation: L(
      '우리는 중국 출신이에요.',
      'Biz Xitoydanmiz.',
      'We’re from China.',
      'Мы из Китая.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'we', 'origin'],
  },

  en_s1u1_n5_071_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '올바른 나라 이름을 고르세요.',
      'To‘g‘ri mamlakat nomini tanlang.',
      'Choose the correctly spelled country.',
      'Выберите правильно написанное название страны.',
    ),
    sentenceTemplate: '___',
    blankAnswers: ['Japan'],
    options: ['Japan', 'Japen', 'Jappan', 'Japon'],
    answer: 'Japan',
    answerTranslation: L('일본.', 'Yaponiya.', 'Japan.', 'Япония.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['review', 'countries'],
  },

  en_s1u1_n5_072_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '올바른 나라 이름을 고르세요.',
      'To‘g‘ri mamlakat nomini tanlang.',
      'Choose the correctly spelled country.',
      'Выберите правильно написанное название страны.',
    ),
    sentenceTemplate: '___',
    blankAnswers: ['Turkey'],
    options: ['Turkey', 'Turky', 'Turkei', 'Torkey'],
    answer: 'Turkey',
    answerTranslation: L('튀르키예.', 'Turkiya.', 'Turkey.', 'Турция.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['review', 'countries'],
  },

  en_s1u1_n5_073_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Brazil. Russia. China. Indonesia.',
    audioText: 'Brazil. Russia. China. Indonesia.',
    answerTranslation: L(
      '브라질, 러시아, 중국, 인도네시아.',
      'Braziliya, Rossiya, Xitoy, Indoneziya.',
      'Brazil, Russia, China, Indonesia.',
      'Бразилия, Россия, Китай, Индонезия.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['review', 'countries'],
  },

  en_s1u1_n5_074_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '올바르게 쓴 이름을 고르세요.',
      'To‘g‘ri bosh harf bilan yozilgan ismni tanlang.',
      'Choose the correctly capitalized name.',
      'Выберите правильно написанное имя.',
    ),
    sentenceTemplate: 'My name is ___.',
    blankAnswers: ['Kabelo'],
    options: ['Kabelo', 'kabelo', 'KABElo', 'kabeLo'],
    answer: 'Kabelo',
    answerTranslation: L(
      '제 이름은 Kabelo예요.',
      'Mening ismim Kabelo.',
      'My name is Kabelo.',
      'Меня зовут Кабело.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'capital-letters'],
  },

  en_s1u1_n5_075_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I’m from Johannesburg in South Africa.',
    audioText: 'I’m from Johannesburg in South Africa.',
    answerTranslation: L(
      '저는 남아프리카 공화국의 요하네스버그 출신이에요.',
      'Men Janubiy Afrikaning Johannesburg shahridanman.',
      'I’m from Johannesburg in South Africa.',
      'Я из Йоханнесбурга в Южной Африке.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'capital-letters', 'origin'],
  },

  en_s1u1_n5_076_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '대문자를 올바르게 사용한 문장을 고르세요.',
      'Bosh harflari to‘g‘ri ishlatilgan gapni tanlang.',
      'Choose the sentence with correct capital letters.',
      'Выберите предложение с правильными заглавными буквами.',
    ),
    sentenceTemplate: '___',
    blankAnswers: ['We are in a hotel in London.'],
    options: [
      'We are in a hotel in London.',
      'we are in a hotel in london.',
      'We are in a hotel in london.',
      'we are in a hotel in London.',
    ],
    answer: 'We are in a hotel in London.',
    answerTranslation: L(
      '우리는 런던의 호텔에 있어요.',
      'Biz Londondagi mehmonxonadamiz.',
      'We are in a hotel in London.',
      'Мы в отеле в Лондоне.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'capital-letters'],
  },

  en_s1u1_n5_077_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Nice to meet you.' }],
    options: ['Me, too.', 'See you from.', 'I am address.', 'Where nice?'],
    answer: 'Me, too.',
    answerTranslation: L('저도요.', 'Men ham.', 'Me, too.', 'Мне тоже.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'response'],
  },

  en_s1u1_n5_078_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'How are you?' }],
    options: [
      'Fine, thanks. And you?',
      'I’m from China.',
      'G-A-R-Y.',
      'On business.',
    ],
    answer: 'Fine, thanks. And you?',
    answerTranslation: L(
      '잘 지내요, 고마워요. 당신은요?',
      'Yaxshi, rahmat. Siz-chi?',
      'Fine, thanks. And you?',
      'Хорошо, спасибо. А вы?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'greeting'],
  },

  en_s1u1_n5_079_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Have a nice day.' }],
    options: [
      'Thanks. You, too.',
      'I’m here to study.',
      'My name’s Gary.',
      'Where in Spain?',
    ],
    answer: 'Thanks. You, too.',
    answerTranslation: L(
      '고마워요. 당신도요.',
      'Rahmat. Sizga ham.',
      'Thanks. You, too.',
      'Спасибо. И вам тоже.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'goodbye'],
  },

  en_s1u1_n5_080_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Goodbye. Bye. See you later.',
    audioText: 'Goodbye. Bye. See you later.',
    answerTranslation: L(
      '안녕히 가세요. 안녕. 나중에 봐요.',
      'Xayr. Xayr. Keyin ko‘rishamiz.',
      'Goodbye. Bye. See you later.',
      'До свидания. Пока. До встречи.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'goodbye', 'unit-final'],
  },
};

// ─────────────────────────────────────────────────────────────
// Node 5
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT1_NODE5 = {
  title: L('호텔에서', 'Mehmonxonada', 'At the hotel', 'В отеле'),
  section: 1,
  unit: 1,
  order: 5,
  isActive: true,

  lessons: [
    {
      title: L(
        '호텔에서 필요한 말',
        'Mehmonxonadagi so‘zlar',
        'At the hotel',
        'В отеле',
      ),
      description: L(
        '호텔에서 자주 보는 사람, 장소, 물건의 영어 표현을 익혀요.',
        'Mehmonxonada ko‘p uchraydigan odamlar, joylar va buyumlarning inglizcha nomlarini o‘rganasiz.',
        'Learn common people, places and things at a hotel.',
        'Учимся называть людей, места и предметы в отеле.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 1,
      questions: [
        'en_s1u1_n5_001_speaking',
        'en_s1u1_n5_002_speaking',
        'en_s1u1_n5_003_word_matching',
        'en_s1u1_n5_004_speaking',
        'en_s1u1_n5_005_fill_in_blank',
        'en_s1u1_n5_006_speaking',
        'en_s1u1_n5_007_speaking',
        'en_s1u1_n5_008_audio_match',
        'en_s1u1_n5_009_speaking',
        'en_s1u1_n5_010_fill_in_blank',
        'en_s1u1_n5_011_speaking',
        'en_s1u1_n5_012_translate_builder',
        'en_s1u1_n5_013_speaking',
        'en_s1u1_n5_014_fill_in_blank',
        'en_s1u1_n5_015_speaking',
        'en_s1u1_n5_016_word_arrange',
        'en_s1u1_n5_017_speaking',
        'en_s1u1_n5_018_fill_in_blank',
        'en_s1u1_n5_019_speaking',
        'en_s1u1_n5_020_sentence_builder',
      ],
    },

    {
      title: L(
        '호텔 체크인',
        'Mehmonxonaga joylashish',
        'Hotel check-in',
        'Регистрация в отеле',
      ),
      description: L(
        '프런트 직원과 투숙객이 실제 체크인에서 사용하는 표현을 연습해요.',
        'Mehmonxona xodimi va mehmon o‘rtasidagi ro‘yxatdan o‘tish suhbatini mashq qilasiz.',
        'Practise a simple conversation between a receptionist and a hotel guest.',
        'Практикуем разговор администратора и гостя при регистрации.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 2,
      questions: [
        'en_s1u1_n5_021_speaking',
        'en_s1u1_n5_022_dialog_complete',
        'en_s1u1_n5_023_speaking',
        'en_s1u1_n5_024_fill_in_blank',
        'en_s1u1_n5_025_speaking',
        'en_s1u1_n5_026_translate_builder',
        'en_s1u1_n5_027_speaking',
        'en_s1u1_n5_028_speaking',
        'en_s1u1_n5_029_word_arrange',
        'en_s1u1_n5_030_speaking',
        'en_s1u1_n5_031_dialog_complete',
        'en_s1u1_n5_032_speaking',
        'en_s1u1_n5_033_fill_in_blank',
        'en_s1u1_n5_034_speaking',
        'en_s1u1_n5_035_sentence_builder',
        'en_s1u1_n5_036_speaking',
        'en_s1u1_n5_037_dialog_complete',
        'en_s1u1_n5_038_speaking',
        'en_s1u1_n5_039_audio_match',
        'en_s1u1_n5_040_speaking',
      ],
    },

    {
      title: L(
        '킹스턴 살인 사건',
        'Kingstondagi qotillik',
        'Murder in Kingston',
        'Убийство в Кингстоне',
      ),
      description: L(
        '짧은 수사 대화를 들으며 이름, 철자, 주소, 출신과 방문 목적을 다시 익혀요.',
        'Tergov suhbatini tinglab, ism, harflanish, manzil, kelib chiqish va tashrif sababini takrorlaysiz.',
        'Use a short mystery story to review names, spelling, addresses, origin and reasons for visiting.',
        'Повторяем имя, написание, адрес, происхождение и цель визита через короткую детективную историю.',
      ),
      category: LessonCategory.LISTENING,
      level: LV,
      order: 3,
      questions: [
        'en_s1u1_n5_041_speaking',
        'en_s1u1_n5_042_fill_in_blank',
        'en_s1u1_n5_043_speaking',
        'en_s1u1_n5_044_word_arrange',
        'en_s1u1_n5_045_speaking',
        'en_s1u1_n5_046_dialog_complete',
        'en_s1u1_n5_047_speaking',
        'en_s1u1_n5_048_fill_in_blank',
        'en_s1u1_n5_049_speaking',
        'en_s1u1_n5_050_dialog_complete',
        'en_s1u1_n5_051_speaking',
        'en_s1u1_n5_052_fill_in_blank',
        'en_s1u1_n5_053_speaking',
        'en_s1u1_n5_054_translate_builder',
        'en_s1u1_n5_055_speaking',
        'en_s1u1_n5_056_fill_in_blank',
        'en_s1u1_n5_057_speaking',
        'en_s1u1_n5_058_dialog_complete',
        'en_s1u1_n5_059_speaking',
        'en_s1u1_n5_060_dialog_complete',
      ],
    },

    {
      title: L(
        '첫 만남 종합',
        'Birinchi uchrashuv — umumiy takrorlash',
        'First meetings review',
        'Повторение: первая встреча',
      ),
      description: L(
        'Unit 1에서 배운 인사, 소개, 출신, 철자, be동사, 질문사, 대문자와 작별 표현을 종합 복습해요.',
        'Unit 1 dagi salomlashish, tanishuv, kelib chiqish, harflanish, be, savol so‘zlari, bosh harflar va xayrlashuvlarni takrorlaysiz.',
        'Review greetings, introductions, origin, spelling, be, question words, capitals and goodbyes.',
        'Повторяем приветствия, знакомство, происхождение, написание, be, вопросительные слова, заглавные буквы и прощания.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 4,
      questions: [
        'en_s1u1_n5_061_speaking',
        'en_s1u1_n5_062_word_arrange',
        'en_s1u1_n5_063_speaking',
        'en_s1u1_n5_064_dialog_complete',
        'en_s1u1_n5_065_fill_in_blank',
        'en_s1u1_n5_066_speaking',
        'en_s1u1_n5_067_fill_in_blank',
        'en_s1u1_n5_068_speaking',
        'en_s1u1_n5_069_fill_in_blank',
        'en_s1u1_n5_070_translate_builder',
        'en_s1u1_n5_071_fill_in_blank',
        'en_s1u1_n5_072_fill_in_blank',
        'en_s1u1_n5_073_speaking',
        'en_s1u1_n5_074_fill_in_blank',
        'en_s1u1_n5_075_speaking',
        'en_s1u1_n5_076_fill_in_blank',
        'en_s1u1_n5_077_dialog_complete',
        'en_s1u1_n5_078_dialog_complete',
        'en_s1u1_n5_079_dialog_complete',
        'en_s1u1_n5_080_speaking',
      ],
    },
  ],
};
