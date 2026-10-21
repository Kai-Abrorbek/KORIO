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
// Section 1 · Unit 5 · Node 1
// 5.1 Clothes style
//
// Coverage
// - adverbs of frequency:
//   always / usually / often / sometimes / never
// - frequency adverbs before most verbs
// - frequency adverbs after be
// - clothes styles:
//   smart / casual / fashion / sports
// - colours:
//   yellow / green / red / brown / blue / white / grey / black
// - clothes:
//   dress / hat / jacket / jeans / jumper / shirt
//   shoes / skirt / top / trainers / trousers / T-shirt
// - describing what people wear
// - talking about usual clothes and shopping habits
//
// IMPORTANT
// *_WORDS에는 단어만 등록한다.
// "smart clothes", "red dress", "wear a jacket" 같은
// 문장/구문은 WORDS에 넣지 않고 문제/예문에서만 사용한다.
//
// 4 lessons × 20 questions = 80
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT5_NODE1_WORDS = [
  {
    code: 'en-frequency-always',
    english: 'always',
    senseKey: 'every-time',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L('항상', 'har doim', 'every time', 'всегда'),
    examples: [
      {
        english: 'I always wear a jacket to work.',
        translations: L(
          '저는 출근할 때 항상 재킷을 입어요.',
          'Men ishga har doim kurtka kiyaman.',
          'I always wear a jacket to work.',
          'Я всегда надеваю пиджак на работу.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈɔːlweɪz/',
      ttsText: 'always',
    },
    media: {
      emoji: '🔁',
      imageUrl: '',
      imageAlt: L(
        '항상 반복되는 일',
        'har doim takrorlanadigan ish',
        'something that happens every time',
        'то, что происходит всегда',
      ),
    },
    tags: ['frequency'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-frequency-usually',
    english: 'usually',
    senseKey: 'most-of-the-time',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L('보통', 'odatda', 'most of the time', 'обычно'),
    examples: [
      {
        english: 'I usually wear jeans at the weekend.',
        translations: L(
          '저는 주말에 보통 청바지를 입어요.',
          'Men dam olish kunlari odatda jinsi kiyaman.',
          'I usually wear jeans at the weekend.',
          'По выходным я обычно ношу джинсы.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈjuːʒuəli/',
      ttsText: 'usually',
    },
    media: {
      emoji: '📆',
      imageUrl: '',
      imageAlt: L(
        '대부분의 날',
        'ko‘p kunlar',
        'most days',
        'большинство дней',
      ),
    },
    tags: ['frequency'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-frequency-often',
    english: 'often',
    senseKey: 'many-times',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L('자주', 'tez-tez', 'many times', 'часто'),
    examples: [
      {
        english: 'She often wears black shoes.',
        translations: L(
          '그녀는 검은 신발을 자주 신어요.',
          'U tez-tez qora tufli kiyadi.',
          'She often wears black shoes.',
          'Она часто носит чёрную обувь.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈɒfən/',
      ttsText: 'often',
    },
    media: {
      emoji: '🔄',
      imageUrl: '',
      imageAlt: L(
        '자주 반복되는 일',
        'tez-tez takrorlanadigan ish',
        'something that happens often',
        'то, что происходит часто',
      ),
    },
    tags: ['frequency'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-frequency-sometimes',
    english: 'sometimes',
    senseKey: 'on-some-occasions',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L('가끔', 'ba’zan', 'on some occasions', 'иногда'),
    examples: [
      {
        english: 'I sometimes wear a hat.',
        translations: L(
          '저는 가끔 모자를 써요.',
          'Men ba’zan bosh kiyim kiyaman.',
          'I sometimes wear a hat.',
          'Я иногда ношу шляпу.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈsʌmtaɪmz/',
      ttsText: 'sometimes',
    },
    media: {
      emoji: '🎲',
      imageUrl: '',
      imageAlt: L(
        '가끔 일어나는 일',
        'ba’zan sodir bo‘ladigan ish',
        'something that happens sometimes',
        'то, что происходит иногда',
      ),
    },
    tags: ['frequency'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-frequency-never',
    english: 'never',
    senseKey: 'not-at-any-time',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L('절대 ~하지 않다', 'hech qachon', 'not at any time', 'никогда'),
    examples: [
      {
        english: 'He never wears a hat.',
        translations: L(
          '그는 절대 모자를 쓰지 않아요.',
          'U hech qachon bosh kiyim kiymaydi.',
          'He never wears a hat.',
          'Он никогда не носит шляпу.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈnevə/',
      ttsText: 'never',
    },
    media: {
      emoji: '🚫',
      imageUrl: '',
      imageAlt: L(
        '전혀 하지 않는 일',
        'hech qachon qilinmaydigan ish',
        'something that never happens',
        'то, что никогда не происходит',
      ),
    },
    tags: ['frequency'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-wear',
    english: 'wear',
    senseKey: 'have-clothes-on-body',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '입다; 착용하다',
      'kiymoq',
      'to have clothes on your body',
      'носить; надевать',
    ),
    examples: [
      {
        english: 'I wear a shirt to work.',
        translations: L(
          '저는 출근할 때 셔츠를 입어요.',
          'Men ishga ko‘ylak kiyaman.',
          'I wear a shirt to work.',
          'Я ношу рубашку на работу.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/weə/',
      ttsText: 'wear',
    },
    media: {
      emoji: '👕',
      imageUrl: '',
      imageAlt: L(
        '옷을 입은 사람',
        'kiyim kiygan odam',
        'a person wearing clothes',
        'человек в одежде',
      ),
    },
    tags: ['clothes', 'verbs'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-clothing-clothes',
    english: 'clothes',
    senseKey: 'things-you-wear',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('옷', 'kiyimlar', 'things that people wear', 'одежда'),
    examples: [
      {
        english: 'These clothes are new.',
        translations: L(
          '이 옷들은 새것이에요.',
          'Bu kiyimlar yangi.',
          'These clothes are new.',
          'Эта одежда новая.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/kləʊðz/',
      ttsText: 'clothes',
    },
    media: {
      emoji: '👚',
      imageUrl: '',
      imageAlt: L('여러 벌의 옷', 'kiyimlar', 'clothes', 'одежда'),
    },
    tags: ['clothes'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-style-smart',
    english: 'smart',
    senseKey: 'neat-formal-looking',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '단정한; 격식 있는',
      'ozoda; rasmiy',
      'neat and suitable for formal situations',
      'элегантный; нарядный',
    ),
    examples: [
      {
        english: 'She wears smart clothes at work.',
        translations: L(
          '그녀는 직장에서 단정한 옷을 입어요.',
          'U ishda rasmiy kiyim kiyadi.',
          'She wears smart clothes at work.',
          'На работе она носит элегантную одежду.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/smɑːt/',
      ttsText: 'smart',
    },
    media: {
      emoji: '👔',
      imageUrl: '',
      imageAlt: L(
        '단정한 옷차림',
        'ozoda kiyim',
        'smart clothing',
        'элегантная одежда',
      ),
    },
    tags: ['clothes', 'style'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-style-casual',
    english: 'casual',
    senseKey: 'informal-relaxed-style',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '편한; 캐주얼한',
      'kundalik; norasmiy',
      'informal and relaxed',
      'повседневный; неформальный',
    ),
    examples: [
      {
        english: 'I wear casual clothes at home.',
        translations: L(
          '저는 집에서 편한 옷을 입어요.',
          'Men uyda kundalik kiyim kiyaman.',
          'I wear casual clothes at home.',
          'Дома я ношу повседневную одежду.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkæʒuəl/',
      ttsText: 'casual',
    },
    media: {
      emoji: '👕',
      imageUrl: '',
      imageAlt: L(
        '편한 옷차림',
        'kundalik kiyim',
        'casual clothing',
        'повседневная одежда',
      ),
    },
    tags: ['clothes', 'style'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-style-fashion',
    english: 'fashion',
    senseKey: 'popular-clothing-style',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('패션; 유행', 'moda', 'a popular style of clothes', 'мода'),
    examples: [
      {
        english: 'She loves fashion.',
        translations: L(
          '그녀는 패션을 아주 좋아해요.',
          'U modani juda yaxshi ko‘radi.',
          'She loves fashion.',
          'Она любит моду.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈfæʃən/',
      ttsText: 'fashion',
    },
    media: {
      emoji: '✨',
      imageUrl: '',
      imageAlt: L(
        '유행하는 옷',
        'modadagi kiyim',
        'fashionable clothes',
        'модная одежда',
      ),
    },
    tags: ['clothes', 'style'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-style-sports',
    english: 'sports',
    senseKey: 'sport-related',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('스포츠; 운동', 'sport', 'sport or physical activity', 'спорт'),
    examples: [
      {
        english: 'He likes sports clothes.',
        translations: L(
          '그는 운동복 스타일의 옷을 좋아해요.',
          'U sport kiyimlarini yoqtiradi.',
          'He likes sports clothes.',
          'Ему нравится спортивная одежда.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/spɔːts/',
      ttsText: 'sports',
    },
    media: {
      emoji: '⚽',
      imageUrl: '',
      imageAlt: L('스포츠', 'sport', 'sports', 'спорт'),
    },
    tags: ['clothes', 'style'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-color-yellow',
    english: 'yellow',
    senseKey: 'colour-yellow',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('노란색', 'sariq', 'yellow', 'жёлтый'),
    examples: [
      {
        english: 'His T-shirt is yellow.',
        translations: L(
          '그의 티셔츠는 노란색이에요.',
          'Uning futbolkasi sariq.',
          'His T-shirt is yellow.',
          'Его футболка жёлтая.',
        ),
      },
    ],
    pronunciation: { ipa: '/ˈjeləʊ/', ttsText: 'yellow' },
    media: {
      emoji: '🟨',
      imageUrl: '',
      imageAlt: L('노란색', 'sariq rang', 'yellow', 'жёлтый цвет'),
    },
    tags: ['colours'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-color-green',
    english: 'green',
    senseKey: 'colour-green',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('초록색', 'yashil', 'green', 'зелёный'),
    examples: [
      {
        english: 'Her jumper is green.',
        translations: L(
          '그녀의 스웨터는 초록색이에요.',
          'Uning jemperi yashil.',
          'Her jumper is green.',
          'Её джемпер зелёный.',
        ),
      },
    ],
    pronunciation: { ipa: '/ɡriːn/', ttsText: 'green' },
    media: {
      emoji: '🟩',
      imageUrl: '',
      imageAlt: L('초록색', 'yashil rang', 'green', 'зелёный цвет'),
    },
    tags: ['colours'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-color-red',
    english: 'red',
    senseKey: 'colour-red',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('빨간색', 'qizil', 'red', 'красный'),
    examples: [
      {
        english: 'She has a red dress.',
        translations: L(
          '그녀는 빨간 드레스가 있어요.',
          'Uning qizil ko‘ylagi bor.',
          'She has a red dress.',
          'У неё есть красное платье.',
        ),
      },
    ],
    pronunciation: { ipa: '/red/', ttsText: 'red' },
    media: {
      emoji: '🟥',
      imageUrl: '',
      imageAlt: L('빨간색', 'qizil rang', 'red', 'красный цвет'),
    },
    tags: ['colours'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-color-brown',
    english: 'brown',
    senseKey: 'colour-brown',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('갈색', 'jigarrang', 'brown', 'коричневый'),
    examples: [
      {
        english: 'My trousers are brown.',
        translations: L(
          '제 바지는 갈색이에요.',
          'Shimim jigarrang.',
          'My trousers are brown.',
          'Мои брюки коричневые.',
        ),
      },
    ],
    pronunciation: { ipa: '/braʊn/', ttsText: 'brown' },
    media: {
      emoji: '🟫',
      imageUrl: '',
      imageAlt: L('갈색', 'jigarrang', 'brown', 'коричневый цвет'),
    },
    tags: ['colours'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-color-blue',
    english: 'blue',
    senseKey: 'colour-blue',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('파란색', 'ko‘k', 'blue', 'синий'),
    examples: [
      {
        english: 'I wear blue jeans.',
        translations: L(
          '저는 파란 청바지를 입어요.',
          'Men ko‘k jinsi kiyaman.',
          'I wear blue jeans.',
          'Я ношу синие джинсы.',
        ),
      },
    ],
    pronunciation: { ipa: '/bluː/', ttsText: 'blue' },
    media: {
      emoji: '🟦',
      imageUrl: '',
      imageAlt: L('파란색', 'ko‘k rang', 'blue', 'синий цвет'),
    },
    tags: ['colours'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-color-white',
    english: 'white',
    senseKey: 'colour-white',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('흰색', 'oq', 'white', 'белый'),
    examples: [
      {
        english: 'He wears a white shirt.',
        translations: L(
          '그는 흰 셔츠를 입어요.',
          'U oq ko‘ylak kiyadi.',
          'He wears a white shirt.',
          'Он носит белую рубашку.',
        ),
      },
    ],
    pronunciation: { ipa: '/waɪt/', ttsText: 'white' },
    media: {
      emoji: '⬜',
      imageUrl: '',
      imageAlt: L('흰색', 'oq rang', 'white', 'белый цвет'),
    },
    tags: ['colours'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-color-grey',
    english: 'grey',
    senseKey: 'colour-grey',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('회색', 'kulrang', 'grey', 'серый'),
    examples: [
      {
        english: 'Her jacket is grey.',
        translations: L(
          '그녀의 재킷은 회색이에요.',
          'Uning kurtkasi kulrang.',
          'Her jacket is grey.',
          'Её куртка серая.',
        ),
      },
    ],
    pronunciation: { ipa: '/ɡreɪ/', ttsText: 'grey' },
    media: {
      emoji: '🩶',
      imageUrl: '',
      imageAlt: L('회색', 'kulrang', 'grey', 'серый цвет'),
    },
    tags: ['colours'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-color-black',
    english: 'black',
    senseKey: 'colour-black',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('검은색', 'qora', 'black', 'чёрный'),
    examples: [
      {
        english: 'My shoes are black.',
        translations: L(
          '제 신발은 검은색이에요.',
          'Tuflim qora.',
          'My shoes are black.',
          'Моя обувь чёрная.',
        ),
      },
    ],
    pronunciation: { ipa: '/blæk/', ttsText: 'black' },
    media: {
      emoji: '⬛',
      imageUrl: '',
      imageAlt: L('검은색', 'qora rang', 'black', 'чёрный цвет'),
    },
    tags: ['colours'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-clothing-dress',
    english: 'dress',
    senseKey: 'one-piece-clothing',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '드레스; 원피스',
      'ko‘ylak',
      'a one-piece item of clothing',
      'платье',
    ),
    examples: [
      {
        english: 'She wears a red dress.',
        translations: L(
          '그녀는 빨간 드레스를 입어요.',
          'U qizil ko‘ylak kiyadi.',
          'She wears a red dress.',
          'Она носит красное платье.',
        ),
      },
    ],
    pronunciation: { ipa: '/dres/', ttsText: 'dress' },
    media: {
      emoji: '👗',
      imageUrl: '',
      imageAlt: L('드레스', 'ko‘ylak', 'a dress', 'платье'),
    },
    tags: ['clothes'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-clothing-hat',
    english: 'hat',
    senseKey: 'head-covering',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('모자', 'bosh kiyim', 'a covering worn on the head', 'шляпа'),
    examples: [
      {
        english: 'I sometimes wear a hat.',
        translations: L(
          '저는 가끔 모자를 써요.',
          'Men ba’zan bosh kiyim kiyaman.',
          'I sometimes wear a hat.',
          'Я иногда ношу шляпу.',
        ),
      },
    ],
    pronunciation: { ipa: '/hæt/', ttsText: 'hat' },
    media: {
      emoji: '👒',
      imageUrl: '',
      imageAlt: L('모자', 'bosh kiyim', 'a hat', 'шляпа'),
    },
    tags: ['clothes'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-clothing-jacket',
    english: 'jacket',
    senseKey: 'short-outer-clothing',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '재킷',
      'kurtka',
      'a short piece of outer clothing',
      'куртка; пиджак',
    ),
    examples: [
      {
        english: 'His jacket is blue.',
        translations: L(
          '그의 재킷은 파란색이에요.',
          'Uning kurtkasi ko‘k.',
          'His jacket is blue.',
          'Его куртка синяя.',
        ),
      },
    ],
    pronunciation: { ipa: '/ˈdʒækɪt/', ttsText: 'jacket' },
    media: {
      emoji: '🧥',
      imageUrl: '',
      imageAlt: L('재킷', 'kurtka', 'a jacket', 'куртка'),
    },
    tags: ['clothes'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-clothing-jeans',
    english: 'jeans',
    senseKey: 'denim-trousers',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('청바지', 'jinsi', 'trousers made from denim', 'джинсы'),
    examples: [
      {
        english: 'I usually wear jeans.',
        translations: L(
          '저는 보통 청바지를 입어요.',
          'Men odatda jinsi kiyaman.',
          'I usually wear jeans.',
          'Я обычно ношу джинсы.',
        ),
      },
    ],
    pronunciation: { ipa: '/dʒiːnz/', ttsText: 'jeans' },
    media: {
      emoji: '👖',
      imageUrl: '',
      imageAlt: L('청바지', 'jinsi', 'jeans', 'джинсы'),
    },
    tags: ['clothes'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-clothing-jumper',
    english: 'jumper',
    senseKey: 'warm-knitted-top',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '스웨터',
      'jemper',
      'a warm knitted piece of clothing for the upper body',
      'джемпер; свитер',
    ),
    examples: [
      {
        english: 'Her jumper is green.',
        translations: L(
          '그녀의 스웨터는 초록색이에요.',
          'Uning jemperi yashil.',
          'Her jumper is green.',
          'Её джемпер зелёный.',
        ),
      },
    ],
    pronunciation: { ipa: '/ˈdʒʌmpə/', ttsText: 'jumper' },
    media: {
      emoji: '🧶',
      imageUrl: '',
      imageAlt: L('스웨터', 'jemper', 'a jumper', 'джемпер'),
    },
    tags: ['clothes'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-clothing-shirt',
    english: 'shirt',
    senseKey: 'collared-upper-garment',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '셔츠',
      'ko‘ylak',
      'an upper-body garment with a collar',
      'рубашка',
    ),
    examples: [
      {
        english: 'He wears a white shirt.',
        translations: L(
          '그는 흰 셔츠를 입어요.',
          'U oq ko‘ylak kiyadi.',
          'He wears a white shirt.',
          'Он носит белую рубашку.',
        ),
      },
    ],
    pronunciation: { ipa: '/ʃɜːt/', ttsText: 'shirt' },
    media: {
      emoji: '👔',
      imageUrl: '',
      imageAlt: L('셔츠', 'ko‘ylak', 'a shirt', 'рубашка'),
    },
    tags: ['clothes'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-clothing-shoes',
    english: 'shoes',
    senseKey: 'footwear',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('신발', 'tufli', 'things worn on the feet', 'обувь; туфли'),
    examples: [
      {
        english: 'My shoes are black.',
        translations: L(
          '제 신발은 검은색이에요.',
          'Tuflim qora.',
          'My shoes are black.',
          'Моя обувь чёрная.',
        ),
      },
    ],
    pronunciation: { ipa: '/ʃuːz/', ttsText: 'shoes' },
    media: {
      emoji: '👞',
      imageUrl: '',
      imageAlt: L('신발', 'tufli', 'shoes', 'обувь'),
    },
    tags: ['clothes'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-clothing-skirt',
    english: 'skirt',
    senseKey: 'waist-hanging-garment',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('치마', 'yubka', 'a garment worn from the waist down', 'юбка'),
    examples: [
      {
        english: 'She has a grey skirt.',
        translations: L(
          '그녀는 회색 치마가 있어요.',
          'Uning kulrang yubkasi bor.',
          'She has a grey skirt.',
          'У неё серая юбка.',
        ),
      },
    ],
    pronunciation: { ipa: '/skɜːt/', ttsText: 'skirt' },
    media: {
      emoji: '👗',
      imageUrl: '',
      imageAlt: L('치마', 'yubka', 'a skirt', 'юбка'),
    },
    tags: ['clothes'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-clothing-top',
    english: 'top',
    senseKey: 'upper-body-clothing',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '상의',
      'ustki kiyim',
      'a piece of clothing for the upper body',
      'топ; верхняя одежда',
    ),
    examples: [
      {
        english: 'Her top is red.',
        translations: L(
          '그녀의 상의는 빨간색이에요.',
          'Uning ustki kiyimi qizil.',
          'Her top is red.',
          'Её топ красный.',
        ),
      },
    ],
    pronunciation: { ipa: '/tɒp/', ttsText: 'top' },
    media: {
      emoji: '👚',
      imageUrl: '',
      imageAlt: L('상의', 'ustki kiyim', 'a top', 'топ'),
    },
    tags: ['clothes'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-clothing-trainers',
    english: 'trainers',
    senseKey: 'sports-shoes',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '운동화',
      'krossovka',
      'shoes worn for sport or casual use',
      'кроссовки',
    ),
    examples: [
      {
        english: 'I wear trainers at the weekend.',
        translations: L(
          '저는 주말에 운동화를 신어요.',
          'Men dam olish kunlari krossovka kiyaman.',
          'I wear trainers at the weekend.',
          'По выходным я ношу кроссовки.',
        ),
      },
    ],
    pronunciation: { ipa: '/ˈtreɪnəz/', ttsText: 'trainers' },
    media: {
      emoji: '👟',
      imageUrl: '',
      imageAlt: L('운동화', 'krossovka', 'trainers', 'кроссовки'),
    },
    tags: ['clothes'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-clothing-trousers',
    english: 'trousers',
    senseKey: 'leg-covering-garment',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '바지',
      'shim',
      'clothing that covers both legs separately',
      'брюки',
    ),
    examples: [
      {
        english: 'His trousers are brown.',
        translations: L(
          '그의 바지는 갈색이에요.',
          'Uning shimi jigarrang.',
          'His trousers are brown.',
          'Его брюки коричневые.',
        ),
      },
    ],
    pronunciation: { ipa: '/ˈtraʊzəz/', ttsText: 'trousers' },
    media: {
      emoji: '👖',
      imageUrl: '',
      imageAlt: L('바지', 'shim', 'trousers', 'брюки'),
    },
    tags: ['clothes'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-clothing-t-shirt',
    english: 'T-shirt',
    senseKey: 'short-sleeved-casual-top',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('티셔츠', 'futbolka', 'a casual short-sleeved top', 'футболка'),
    examples: [
      {
        english: 'He wears a yellow T-shirt.',
        translations: L(
          '그는 노란 티셔츠를 입어요.',
          'U sariq futbolka kiyadi.',
          'He wears a yellow T-shirt.',
          'Он носит жёлтую футболку.',
        ),
      },
    ],
    pronunciation: { ipa: '/ˈtiː ʃɜːt/', ttsText: 'T-shirt' },
    media: {
      emoji: '👕',
      imageUrl: '',
      imageAlt: L('티셔츠', 'futbolka', 'a T-shirt', 'футболка'),
    },
    tags: ['clothes'],
    difficulty: 1,
    isCore: true,
  },
];

export const EN_S1_UNIT5_NODE1_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Frequency and clothes style
  // ===========================================================

  en_s1u5_n1_001_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I always wear casual clothes at home.',
    audioText: 'I always wear casual clothes at home.',
    answerTranslation: L(
      '저는 집에서 항상 편한 옷을 입어요.',
      'Men uyda har doim kundalik kiyim kiyaman.',
      'I always wear casual clothes at home.',
      'Дома я всегда ношу повседневную одежду.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['frequency', 'always', 'clothes'],
  },

  en_s1u5_n1_002_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'jacket',
    choices: [
      { text: 'hat', label: '👒', emoji: '👒', imageUrl: '' },
      { text: 'jacket', label: '🧥', emoji: '🧥', imageUrl: '' },
      { text: 'trainers', label: '👟', emoji: '👟', imageUrl: '' },
      { text: 'T-shirt', label: '👕', emoji: '👕', imageUrl: '' },
    ],
    answerTranslation: L('재킷', 'kurtka', 'jacket', 'куртка'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['clothes', 'jacket'],
  },

  en_s1u5_n1_003_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'always',
        native: 'har doim',
        nativeI18n: L('항상', 'har doim', 'every time', 'всегда'),
      },
      {
        text: 'usually',
        native: 'odatda',
        nativeI18n: L('보통', 'odatda', 'most of the time', 'обычно'),
      },
      {
        text: 'often',
        native: 'tez-tez',
        nativeI18n: L('자주', 'tez-tez', 'many times', 'часто'),
      },
      {
        text: 'sometimes',
        native: 'ba’zan',
        nativeI18n: L('가끔', 'ba’zan', 'on some occasions', 'иногда'),
      },
      {
        text: 'never',
        native: 'hech qachon',
        nativeI18n: L(
          '절대 ~하지 않다',
          'hech qachon',
          'not at any time',
          'никогда',
        ),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['frequency', 'matching'],
  },

  en_s1u5_n1_004_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'wear',
      'I',
      'work',
      'usually',
      'smart',
      'at',
      'clothes',
      'never',
      'am',
    ],
    answer: 'I usually wear smart clothes at work',
    answerTranslation: L(
      '저는 직장에서 보통 단정한 옷을 입어요.',
      'Men ishda odatda rasmiy kiyim kiyaman.',
      'I usually wear smart clothes at work.',
      'На работе я обычно ношу элегантную одежду.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['frequency', 'usually', 'smart-clothes'],
  },

  en_s1u5_n1_005_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['sports', 'wears', 'She', 'often', 'clothes', 'never', 'wear'],
    answer: 'She often wears sports clothes',
    audioText: 'She often wears sports clothes.',
    answerTranslation: L(
      '그녀는 운동복 스타일의 옷을 자주 입어요.',
      'U tez-tez sport kiyimlarini kiyadi.',
      'She often wears sports clothes.',
      'Она часто носит спортивную одежду.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['frequency', 'often', 'sports-clothes'],
  },

  en_s1u5_n1_006_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'always',
        native: 'har doim',
        nativeI18n: L('항상', 'har doim', 'every time', 'всегда'),
      },
      {
        text: 'usually',
        native: 'odatda',
        nativeI18n: L('보통', 'odatda', 'most of the time', 'обычно'),
      },
      {
        text: 'often',
        native: 'tez-tez',
        nativeI18n: L('자주', 'tez-tez', 'many times', 'часто'),
      },
      {
        text: 'sometimes',
        native: 'ba’zan',
        nativeI18n: L('가끔', 'ba’zan', 'on some occasions', 'иногда'),
      },
      {
        text: 'never',
        native: 'hech qachon',
        nativeI18n: L(
          '절대 ~하지 않다',
          'hech qachon',
          'not at any time',
          'никогда',
        ),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['frequency', 'listening'],
  },

  en_s1u5_n1_007_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She never wears sports clothes at work.',
    audioText: 'She never wears sports clothes at work.',
    answerTranslation: L(
      '그녀는 직장에서 운동복 스타일의 옷을 절대 입지 않아요.',
      'U ishda hech qachon sport kiyimlarini kiymaydi.',
      'She never wears sports clothes at work.',
      'Она никогда не носит спортивную одежду на работе.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['frequency', 'never', 'clothes'],
  },

  en_s1u5_n1_008_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'He sometimes wears fashion clothes.',
    audioText: 'He sometimes wears fashion clothes.',
    answerI18n: L(
      '그는 가끔 유행하는 옷을 입어요',
      'U ba’zan moda kiyimlarini kiyadi',
      'He sometimes wears fashion clothes',
      'Он иногда носит модную одежду',
    ),
    options: ['fashion', 'He', 'wears', 'sometimes', 'clothes', 'never'],
    optionsI18n: {
      ko: ['그는', '가끔', '유행하는', '옷을', '입어요', '항상', '신발을'],
      uz: [
        'U',
        'ba’zan',
        'moda',
        'kiyimlarini',
        'kiyadi',
        'har doim',
        'sotib oladi',
      ],
      en: ['He', 'sometimes', 'wears', 'fashion', 'clothes', 'always', 'buys'],
      ru: ['Он', 'иногда', 'носит', 'модную', 'одежду', 'всегда', 'покупает'],
    },
    answerTranslation: L(
      '그는 가끔 유행하는 옷을 입어요.',
      'U ba’zan moda kiyimlarini kiyadi.',
      'He sometimes wears fashion clothes.',
      'Он иногда носит модную одежду.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['frequency', 'sometimes', 'sentence-builder'],
  },

  en_s1u5_n1_009_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I ___ wear casual clothes at home.',
    blankAnswers: ['always'],
    options: ['always', 'wears', 'smart', 'clothes'],
    answer: 'always',
    answerTranslation: L(
      '저는 집에서 항상 편한 옷을 입어요.',
      'Men uyda har doim kundalik kiyim kiyaman.',
      'I always wear casual clothes at home.',
      'Дома я всегда ношу повседневную одежду.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['frequency', 'always'],
  },

  en_s1u5_n1_010_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'dress',
    choices: [
      { text: 'shirt', label: '👔', emoji: '👔', imageUrl: '' },
      { text: 'dress', label: '👗', emoji: '👗', imageUrl: '' },
      { text: 'trainers', label: '👟', emoji: '👟', imageUrl: '' },
      { text: 'hat', label: '👒', emoji: '👒', imageUrl: '' },
    ],
    answerTranslation: L('드레스', 'ko‘ylak', 'dress', 'платье'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['clothes', 'dress'],
  },

  en_s1u5_n1_011_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What do you usually wear at work?',
    options: [
      'I',
      'usually',
      'wear',
      'a',
      'shirt',
      'and',
      'trousers',
      'never',
      'wears',
    ],
    answer: 'I usually wear a shirt and trousers',
    answerTranslation: L(
      '저는 직장에서 보통 셔츠와 바지를 입어요.',
      'Men ishda odatda ko‘ylak va shim kiyaman.',
      'I usually wear a shirt and trousers.',
      'На работе я обычно ношу рубашку и брюки.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['frequency', 'clothes', 'reply'],
  },

  en_s1u5_n1_012_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'at',
      'We',
      'often',
      'clothes',
      'buy',
      'weekend',
      'the',
      'never',
      'wear',
    ],
    answer: 'We often buy clothes at the weekend',
    answerTranslation: L(
      '우리는 주말에 옷을 자주 사요.',
      'Biz dam olish kunlari tez-tez kiyim sotib olamiz.',
      'We often buy clothes at the weekend.',
      'Мы часто покупаем одежду по выходным.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['frequency', 'often', 'shopping'],
  },

  en_s1u5_n1_013_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'a',
      'always',
      'My',
      'jacket',
      'sister',
      'wears',
      'to',
      'work',
      'never',
    ],
    answer: 'My sister always wears a jacket to work',
    audioText: 'My sister always wears a jacket to work.',
    answerTranslation: L(
      '제 여자 형제는 출근할 때 항상 재킷을 입어요.',
      'Opam yoki singlim ishga har doim kurtka kiyadi.',
      'My sister always wears a jacket to work.',
      'Моя сестра всегда надевает пиджак на работу.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['frequency', 'always', 'jacket'],
  },

  en_s1u5_n1_014_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Do you often buy clothes online?' }],
    options: [
      'Yes, I sometimes do.',
      'Yes, I sometimes does.',
      'Yes, I am sometimes buy.',
      'Yes, clothes often is.',
    ],
    answer: 'Yes, I sometimes do.',
    answerTranslation: L(
      '네, 가끔 그래요.',
      'Ha, ba’zan sotib olaman.',
      'Yes, I sometimes do.',
      'Да, иногда.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['frequency', 'shopping', 'dialog'],
  },

  en_s1u5_n1_015_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I sometimes go clothes shopping with my friend.',
    audioText: 'I sometimes go clothes shopping with my friend.',
    answerTranslation: L(
      '저는 가끔 친구와 옷을 사러 가요.',
      'Men ba’zan do‘stim bilan kiyim xarid qilgani boraman.',
      'I sometimes go clothes shopping with my friend.',
      'Я иногда хожу за одеждой с другом.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['frequency', 'sometimes', 'shopping'],
  },

  en_s1u5_n1_016_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'They never wear smart clothes at home.',
    audioText: 'They never wear smart clothes at home.',
    answerI18n: L(
      '그들은 집에서 단정한 옷을 절대 입지 않아요',
      'Ular uyda hech qachon rasmiy kiyim kiymaydi',
      'They never wear smart clothes at home',
      'Они никогда не носят элегантную одежду дома',
    ),
    options: [
      'home',
      'smart',
      'They',
      'never',
      'at',
      'clothes',
      'wear',
      'always',
    ],
    optionsI18n: {
      ko: [
        '그들은',
        '집에서',
        '단정한',
        '옷을',
        '절대',
        '입지',
        '않아요',
        '항상',
        '사요',
      ],
      uz: [
        'Ular',
        'uyda',
        'hech qachon',
        'rasmiy',
        'kiyim',
        'kiymaydi',
        'har doim',
        'sotib oladi',
      ],
      en: [
        'They',
        'never',
        'wear',
        'smart',
        'clothes',
        'at',
        'home',
        'always',
        'buy',
      ],
      ru: [
        'Они',
        'никогда',
        'не носят',
        'элегантную',
        'одежду',
        'дома',
        'всегда',
        'покупают',
      ],
    },
    answerTranslation: L(
      '그들은 집에서 단정한 옷을 절대 입지 않아요.',
      'Ular uyda hech qachon rasmiy kiyim kiymaydi.',
      'They never wear smart clothes at home.',
      'Они никогда не носят элегантную одежду дома.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['frequency', 'never', 'smart'],
  },

  en_s1u5_n1_017_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'trainers',
    choices: [
      { text: 'shoes', label: '👞', emoji: '👞', imageUrl: '' },
      { text: 'hat', label: '👒', emoji: '👒', imageUrl: '' },
      { text: 'trainers', label: '👟', emoji: '👟', imageUrl: '' },
      { text: 'jacket', label: '🧥', emoji: '🧥', imageUrl: '' },
    ],
    answerTranslation: L('운동화', 'krossovka', 'trainers', 'кроссовки'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['clothes', 'trainers'],
  },

  en_s1u5_n1_018_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She is ___ happy with her new clothes.',
    blankAnswers: ['always'],
    options: ['always', 'wear', 'usually wears', 'clothes'],
    answer: 'always',
    answerTranslation: L(
      '그녀는 새 옷에 항상 만족해요.',
      'U yangi kiyimlaridan har doim xursand.',
      'She is always happy with her new clothes.',
      'Она всегда довольна своей новой одеждой.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['frequency', 'be', 'always'],
  },

  en_s1u5_n1_019_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['usually', 'My', 'clothes', 'casual', 'are', 'wear', 'never'],
    answer: 'My clothes are usually casual',
    answerTranslation: L(
      '제 옷은 보통 편한 스타일이에요.',
      'Mening kiyimlarim odatda kundalik uslubda.',
      'My clothes are usually casual.',
      'Моя одежда обычно повседневная.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['frequency', 'be', 'casual'],
  },

  en_s1u5_n1_020_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What do you wear at the weekend?',
    options: [
      'I',
      'usually',
      'wear',
      'jeans',
      'and',
      'a',
      'T-shirt',
      'wears',
      'smart',
    ],
    answer: 'I usually wear jeans and a T-shirt',
    answerTranslation: L(
      '저는 주말에 보통 청바지와 티셔츠를 입어요.',
      'Men dam olish kunlari odatda jinsi va futbolka kiyaman.',
      'I usually wear jeans and a T-shirt.',
      'По выходным я обычно ношу джинсы и футболку.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['frequency', 'weekend', 'clothes'],
  },

  // ===========================================================
  // Lesson 2 · Colours and clothes
  // ===========================================================

  en_s1u5_n1_021_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'My favourite colour is blue.',
    audioText: 'My favourite colour is blue.',
    answerTranslation: L(
      '제가 가장 좋아하는 색은 파란색이에요.',
      'Mening sevimli rangim ko‘k.',
      'My favourite colour is blue.',
      'Мой любимый цвет — синий.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['colours', 'blue'],
  },

  en_s1u5_n1_022_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'red',
    choices: [
      { text: 'green', label: '🟩', emoji: '🟩', imageUrl: '' },
      { text: 'blue', label: '🟦', emoji: '🟦', imageUrl: '' },
      { text: 'red', label: '🟥', emoji: '🟥', imageUrl: '' },
      { text: 'yellow', label: '🟨', emoji: '🟨', imageUrl: '' },
    ],
    answerTranslation: L('빨간색', 'qizil', 'red', 'красный'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['colours', 'red'],
  },

  en_s1u5_n1_023_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'red',
        native: 'qizil',
        nativeI18n: L('빨간색', 'qizil', 'the colour red', 'красный'),
      },
      {
        text: 'blue',
        native: 'ko‘k',
        nativeI18n: L('파란색', 'ko‘k', 'the colour blue', 'синий'),
      },
      {
        text: 'green',
        native: 'yashil',
        nativeI18n: L('초록색', 'yashil', 'the colour green', 'зелёный'),
      },
      {
        text: 'black',
        native: 'qora',
        nativeI18n: L('검은색', 'qora', 'the colour black', 'чёрный'),
      },
      {
        text: 'white',
        native: 'oq',
        nativeI18n: L('흰색', 'oq', 'the colour white', 'белый'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['colours', 'matching'],
  },

  en_s1u5_n1_024_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['red', 'She', 'a', 'dress', 'has', 'blue', 'wears'],
    answer: 'She has a red dress',
    answerTranslation: L(
      '그녀는 빨간 드레스가 있어요.',
      'Uning qizil ko‘ylagi bor.',
      'She has a red dress.',
      'У неё есть красное платье.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['clothes', 'red', 'dress'],
  },

  en_s1u5_n1_025_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['black', 'He', 'shoes', 'wears', 'shirt', 'blue'],
    answer: 'He wears black shoes',
    audioText: 'He wears black shoes.',
    answerTranslation: L(
      '그는 검은 신발을 신어요.',
      'U qora tufli kiyadi.',
      'He wears black shoes.',
      'Он носит чёрную обувь.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['clothes', 'black', 'shoes'],
  },

  en_s1u5_n1_026_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'dress',
        native: 'ko‘ylak',
        nativeI18n: L('드레스', 'ko‘ylak', 'a one-piece garment', 'платье'),
      },
      {
        text: 'hat',
        native: 'bosh kiyim',
        nativeI18n: L('모자', 'bosh kiyim', 'headwear', 'шляпа'),
      },
      {
        text: 'jacket',
        native: 'kurtka',
        nativeI18n: L('재킷', 'kurtka', 'outer clothing', 'куртка'),
      },
      {
        text: 'shirt',
        native: 'ko‘ylak',
        nativeI18n: L('셔츠', 'ko‘ylak', 'a collared top', 'рубашка'),
      },
      {
        text: 'trainers',
        native: 'krossovka',
        nativeI18n: L('운동화', 'krossovka', 'sports shoes', 'кроссовки'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['clothes', 'listening'],
  },

  en_s1u5_n1_027_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'These trousers are brown.',
    audioText: 'These trousers are brown.',
    answerTranslation: L(
      '이 바지는 갈색이에요.',
      'Bu shim jigarrang.',
      'These trousers are brown.',
      'Эти брюки коричневые.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['clothes', 'brown', 'trousers'],
  },

  en_s1u5_n1_028_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'She has a green jumper and blue jeans.',
    audioText: 'She has a green jumper and blue jeans.',
    answerI18n: L(
      '그녀는 초록색 스웨터와 파란 청바지가 있어요',
      'Uning yashil jemperi va ko‘k jinsisi bor',
      'She has a green jumper and blue jeans',
      'У неё зелёный джемпер и синие джинсы',
    ),
    options: [
      'blue',
      'green',
      'She',
      'has',
      'a',
      'jumper',
      'and',
      'jeans',
      'black',
    ],
    optionsI18n: {
      ko: [
        '그녀는',
        '초록색',
        '스웨터와',
        '파란',
        '청바지가',
        '있어요',
        '빨간',
        '모자가',
      ],
      uz: [
        'Uning',
        'yashil',
        'jemperi',
        'va',
        'ko‘k',
        'jinsisi',
        'bor',
        'qora',
        'ko‘ylagi',
      ],
      en: [
        'She',
        'has',
        'a',
        'green',
        'jumper',
        'and',
        'blue',
        'jeans',
        'black',
        'hat',
      ],
      ru: [
        'У неё',
        'зелёный',
        'джемпер',
        'и',
        'синие',
        'джинсы',
        'красная',
        'шляпа',
      ],
    },
    answerTranslation: L(
      '그녀는 초록색 스웨터와 파란 청바지가 있어요.',
      'Uning yashil jemperi va ko‘k jinsisi bor.',
      'She has a green jumper and blue jeans.',
      'У неё зелёный джемпер и синие джинсы.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['clothes', 'colours', 'sentence-builder'],
  },

  en_s1u5_n1_029_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I wear a ___ shirt.',
    blankAnswers: ['white'],
    options: ['white', 'dress', 'jeans', 'wear'],
    answer: 'white',
    answerTranslation: L(
      '저는 흰 셔츠를 입어요.',
      'Men oq ko‘ylak kiyaman.',
      'I wear a white shirt.',
      'Я ношу белую рубашку.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['clothes', 'white', 'shirt'],
  },

  en_s1u5_n1_030_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'hat',
    choices: [
      { text: 'jacket', label: '🧥', emoji: '🧥', imageUrl: '' },
      { text: 'T-shirt', label: '👕', emoji: '👕', imageUrl: '' },
      { text: 'hat', label: '👒', emoji: '👒', imageUrl: '' },
      { text: 'trainers', label: '👟', emoji: '👟', imageUrl: '' },
    ],
    answerTranslation: L('모자', 'bosh kiyim', 'hat', 'шляпа'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['clothes', 'hat'],
  },

  en_s1u5_n1_031_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What’s your favourite colour?',
    options: ['My', 'favourite', 'colour', 'is', 'green', 'wear', 'jacket'],
    answer: 'My favourite colour is green',
    answerTranslation: L(
      '제가 가장 좋아하는 색은 초록색이에요.',
      'Mening sevimli rangim yashil.',
      'My favourite colour is green.',
      'Мой любимый цвет — зелёный.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['colours', 'green', 'reply'],
  },

  en_s1u5_n1_032_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'I',
      'weekend',
      'trainers',
      'wear',
      'at',
      'the',
      'shoes',
      'usually',
    ],
    answer: 'I wear trainers at the weekend',
    answerTranslation: L(
      '저는 주말에 운동화를 신어요.',
      'Men dam olish kunlari krossovka kiyaman.',
      'I wear trainers at the weekend.',
      'По выходным я ношу кроссовки.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['clothes', 'trainers', 'weekend'],
  },

  en_s1u5_n1_033_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'jeans',
        native: 'jinsi',
        nativeI18n: L('청바지', 'jinsi', 'denim trousers', 'джинсы'),
      },
      {
        text: 'jumper',
        native: 'jemper',
        nativeI18n: L('스웨터', 'jemper', 'a warm knitted top', 'джемпер'),
      },
      {
        text: 'skirt',
        native: 'yubka',
        nativeI18n: L('치마', 'yubka', 'a garment worn from the waist', 'юбка'),
      },
      {
        text: 'top',
        native: 'ustki kiyim',
        nativeI18n: L('상의', 'ustki kiyim', 'upper-body clothing', 'топ'),
      },
      {
        text: 'trousers',
        native: 'shim',
        nativeI18n: L('바지', 'shim', 'leg-covering clothing', 'брюки'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['clothes', 'matching'],
  },

  en_s1u5_n1_034_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['grey', 'His', 'is', 'jacket', 'blue', 'are'],
    answer: 'His jacket is grey',
    audioText: 'His jacket is grey.',
    answerTranslation: L(
      '그의 재킷은 회색이에요.',
      'Uning kurtkasi kulrang.',
      'His jacket is grey.',
      'Его куртка серая.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['clothes', 'grey', 'jacket'],
  },

  en_s1u5_n1_035_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Her skirt is black.',
    audioText: 'Her skirt is black.',
    answerTranslation: L(
      '그녀의 치마는 검은색이에요.',
      'Uning yubkasi qora.',
      'Her skirt is black.',
      'Её юбка чёрная.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['clothes', 'black', 'skirt'],
  },

  en_s1u5_n1_036_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'He has a yellow T-shirt and blue jeans.',
    audioText: 'He has a yellow T-shirt and blue jeans.',
    answerI18n: L(
      '그는 노란 티셔츠와 파란 청바지가 있어요',
      'Uning sariq futbolkasi va ko‘k jinsisi bor',
      'He has a yellow T-shirt and blue jeans',
      'У него жёлтая футболка и синие джинсы',
    ),
    options: [
      'blue',
      'He',
      'yellow',
      'has',
      'a',
      'T-shirt',
      'and',
      'jeans',
      'green',
    ],
    optionsI18n: {
      ko: [
        '그는',
        '노란',
        '티셔츠와',
        '파란',
        '청바지가',
        '있어요',
        '초록색',
        '모자가',
      ],
      uz: [
        'Uning',
        'sariq',
        'futbolkasi',
        'va',
        'ko‘k',
        'jinsisi',
        'bor',
        'yashil',
        'kurtkasi',
      ],
      en: [
        'He',
        'has',
        'a',
        'yellow',
        'T-shirt',
        'and',
        'blue',
        'jeans',
        'green',
        'jacket',
      ],
      ru: [
        'У него',
        'жёлтая',
        'футболка',
        'и',
        'синие',
        'джинсы',
        'зелёная',
        'куртка',
      ],
    },
    answerTranslation: L(
      '그는 노란 티셔츠와 파란 청바지가 있어요.',
      'Uning sariq futbolkasi va ko‘k jinsisi bor.',
      'He has a yellow T-shirt and blue jeans.',
      'У него жёлтая футболка и синие джинсы.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['clothes', 'colours', 'sentence-builder'],
  },

  en_s1u5_n1_037_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'shoes',
    choices: [
      { text: 'hat', label: '👒', emoji: '👒', imageUrl: '' },
      { text: 'shoes', label: '👞', emoji: '👞', imageUrl: '' },
      { text: 'jacket', label: '🧥', emoji: '🧥', imageUrl: '' },
      { text: 'T-shirt', label: '👕', emoji: '👕', imageUrl: '' },
    ],
    answerTranslation: L('신발', 'tufli', 'shoes', 'обувь'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['clothes', 'shoes'],
  },

  en_s1u5_n1_038_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'jeans',
        native: 'jinsi',
        nativeI18n: L('청바지', 'jinsi', 'denim trousers', 'джинсы'),
      },
      {
        text: 'jumper',
        native: 'jemper',
        nativeI18n: L('스웨터', 'jemper', 'a warm knitted top', 'джемпер'),
      },
      {
        text: 'skirt',
        native: 'yubka',
        nativeI18n: L('치마', 'yubka', 'a skirt', 'юбка'),
      },
      {
        text: 'top',
        native: 'ustki kiyim',
        nativeI18n: L('상의', 'ustki kiyim', 'a top', 'топ'),
      },
      {
        text: 'trousers',
        native: 'shim',
        nativeI18n: L('바지', 'shim', 'trousers', 'брюки'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['clothes', 'listening'],
  },

  en_s1u5_n1_039_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She wears a ___ dress.',
    blankAnswers: ['blue'],
    options: ['blue', 'jeans', 'wear', 'shoes'],
    answer: 'blue',
    answerTranslation: L(
      '그녀는 파란 드레스를 입어요.',
      'U ko‘k ko‘ylak kiyadi.',
      'She wears a blue dress.',
      'Она носит синее платье.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['clothes', 'blue', 'dress'],
  },

  en_s1u5_n1_040_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What colour is your jacket?',
    options: ['My', 'jacket', 'is', 'brown', 'wear', 'blue'],
    answer: 'My jacket is brown',
    answerTranslation: L(
      '제 재킷은 갈색이에요.',
      'Mening kurtkam jigarrang.',
      'My jacket is brown.',
      'Моя куртка коричневая.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['clothes', 'brown', 'reply'],
  },

  // ===========================================================
  // Lesson 3 · What people wear
  // ===========================================================

  en_s1u5_n1_041_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I usually wear jeans and trainers.',
    audioText: 'I usually wear jeans and trainers.',
    answerTranslation: L(
      '저는 보통 청바지와 운동화를 신어요.',
      'Men odatda jinsi va krossovka kiyaman.',
      'I usually wear jeans and trainers.',
      'Я обычно ношу джинсы и кроссовки.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['frequency', 'clothes', 'usually'],
  },

  en_s1u5_n1_042_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'skirt',
    choices: [
      { text: 'jacket', label: '🧥', emoji: '🧥', imageUrl: '' },
      { text: 'skirt', label: '👗', emoji: '👗', imageUrl: '' },
      { text: 'trainers', label: '👟', emoji: '👟', imageUrl: '' },
      { text: 'hat', label: '👒', emoji: '👒', imageUrl: '' },
    ],
    answerTranslation: L('치마', 'yubka', 'skirt', 'юбка'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['clothes', 'skirt'],
  },

  en_s1u5_n1_043_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'always',
        native: 'har doim',
        nativeI18n: L('항상', 'har doim', 'every time', 'всегда'),
      },
      {
        text: 'usually',
        native: 'odatda',
        nativeI18n: L('보통', 'odatda', 'most of the time', 'обычно'),
      },
      {
        text: 'often',
        native: 'tez-tez',
        nativeI18n: L('자주', 'tez-tez', 'many times', 'часто'),
      },
      {
        text: 'sometimes',
        native: 'ba’zan',
        nativeI18n: L('가끔', 'ba’zan', 'on some occasions', 'иногда'),
      },
      {
        text: 'never',
        native: 'hech qachon',
        nativeI18n: L(
          '절대 ~하지 않다',
          'hech qachon',
          'not at any time',
          'никогда',
        ),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['frequency', 'matching'],
  },

  en_s1u5_n1_044_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['red', 'wears', 'She', 'often', 'a', 'top', 'never', 'shirt'],
    answer: 'She often wears a red top',
    answerTranslation: L(
      '그녀는 빨간 상의를 자주 입어요.',
      'U tez-tez qizil ustki kiyim kiyadi.',
      'She often wears a red top.',
      'Она часто носит красный топ.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['frequency', 'often', 'red', 'top'],
  },

  en_s1u5_n1_045_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'wear',
      'They',
      'sometimes',
      'smart',
      'to',
      'clothes',
      'work',
      'always',
    ],
    answer: 'They sometimes wear smart clothes to work',
    audioText: 'They sometimes wear smart clothes to work.',
    answerTranslation: L(
      '그들은 가끔 직장에 단정한 옷을 입고 가요.',
      'Ular ba’zan ishga rasmiy kiyim kiyadi.',
      'They sometimes wear smart clothes to work.',
      'Они иногда носят элегантную одежду на работу.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['frequency', 'sometimes', 'smart'],
  },

  en_s1u5_n1_046_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'shirt',
        native: 'ko‘ylak',
        nativeI18n: L('셔츠', 'ko‘ylak', 'a shirt', 'рубашка'),
      },
      {
        text: 'shoes',
        native: 'tufli',
        nativeI18n: L('신발', 'tufli', 'shoes', 'обувь'),
      },
      {
        text: 'skirt',
        native: 'yubka',
        nativeI18n: L('치마', 'yubka', 'a skirt', 'юбка'),
      },
      {
        text: 'trainers',
        native: 'krossovka',
        nativeI18n: L('운동화', 'krossovka', 'trainers', 'кроссовки'),
      },
      {
        text: 'T-shirt',
        native: 'futbolka',
        nativeI18n: L('티셔츠', 'futbolka', 'a T-shirt', 'футболка'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['clothes', 'listening'],
  },

  en_s1u5_n1_047_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'He always wears a white shirt.',
    audioText: 'He always wears a white shirt.',
    answerTranslation: L(
      '그는 항상 흰 셔츠를 입어요.',
      'U har doim oq ko‘ylak kiyadi.',
      'He always wears a white shirt.',
      'Он всегда носит белую рубашку.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['frequency', 'always', 'white', 'shirt'],
  },

  en_s1u5_n1_048_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'My sister never wears black trousers.',
    audioText: 'My sister never wears black trousers.',
    answerI18n: L(
      '제 여자 형제는 검은 바지를 절대 입지 않아요',
      'Opam yoki singlim hech qachon qora shim kiymaydi',
      'My sister never wears black trousers',
      'Моя сестра никогда не носит чёрные брюки',
    ),
    options: ['black', 'My', 'trousers', 'never', 'sister', 'wears', 'always'],
    optionsI18n: {
      ko: [
        '제',
        '여자',
        '형제는',
        '검은',
        '바지를',
        '절대',
        '입지',
        '않아요',
        '항상',
      ],
      uz: [
        'Opam',
        'yoki',
        'singlim',
        'hech qachon',
        'qora',
        'shim',
        'kiymaydi',
        'har doim',
      ],
      en: ['My', 'sister', 'never', 'wears', 'black', 'trousers', 'always'],
      ru: ['Моя', 'сестра', 'никогда', 'не носит', 'чёрные', 'брюки', 'всегда'],
    },
    answerTranslation: L(
      '제 여자 형제는 검은 바지를 절대 입지 않아요.',
      'Opam yoki singlim hech qachon qora shim kiymaydi.',
      'My sister never wears black trousers.',
      'Моя сестра никогда не носит чёрные брюки.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['frequency', 'never', 'black', 'trousers'],
  },

  en_s1u5_n1_049_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Her clothes are ___ smart.',
    blankAnswers: ['always'],
    options: ['always', 'wears', 'never wear', 'shirt'],
    answer: 'always',
    answerTranslation: L(
      '그녀의 옷차림은 항상 단정해요.',
      'Uning kiyimlari har doim ozoda.',
      'Her clothes are always smart.',
      'Её одежда всегда элегантная.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['frequency', 'be', 'always'],
  },

  en_s1u5_n1_050_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'jumper',
    choices: [
      { text: 'hat', label: '👒', emoji: '👒', imageUrl: '' },
      { text: 'trainers', label: '👟', emoji: '👟', imageUrl: '' },
      { text: 'jumper', label: '🧶', emoji: '🧶', imageUrl: '' },
      { text: 'jacket', label: '🧥', emoji: '🧥', imageUrl: '' },
    ],
    answerTranslation: L('스웨터', 'jemper', 'jumper', 'джемпер'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['clothes', 'jumper'],
  },

  en_s1u5_n1_051_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What do you usually wear on Fridays?',
    options: [
      'I',
      'usually',
      'wear',
      'jeans',
      'and',
      'a',
      'T-shirt',
      'never',
      'dress',
    ],
    answer: 'I usually wear jeans and a T-shirt',
    answerTranslation: L(
      '저는 금요일에 보통 청바지와 티셔츠를 입어요.',
      'Men juma kunlari odatda jinsi va futbolka kiyaman.',
      'I usually wear jeans and a T-shirt.',
      'По пятницам я обычно ношу джинсы и футболку.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['frequency', 'usually', 'clothes'],
  },

  en_s1u5_n1_052_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'We',
      'never',
      'buy',
      'expensive',
      'clothes',
      'online',
      'wear',
      'often',
    ],
    answer: 'We never buy expensive clothes online',
    answerTranslation: L(
      '우리는 온라인에서 비싼 옷을 절대 사지 않아요.',
      'Biz hech qachon internetdan qimmat kiyim sotib olmaymiz.',
      'We never buy expensive clothes online.',
      'Мы никогда не покупаем дорогую одежду в интернете.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['frequency', 'never', 'shopping'],
  },

  en_s1u5_n1_053_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'yellow',
        native: 'sariq',
        nativeI18n: L('노란색', 'sariq', 'the colour yellow', 'жёлтый'),
      },
      {
        text: 'brown',
        native: 'jigarrang',
        nativeI18n: L('갈색', 'jigarrang', 'the colour brown', 'коричневый'),
      },
      {
        text: 'blue',
        native: 'ko‘k',
        nativeI18n: L('파란색', 'ko‘k', 'the colour blue', 'синий'),
      },
      {
        text: 'grey',
        native: 'kulrang',
        nativeI18n: L('회색', 'kulrang', 'the colour grey', 'серый'),
      },
      {
        text: 'black',
        native: 'qora',
        nativeI18n: L('검은색', 'qora', 'the colour black', 'чёрный'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['colours', 'matching'],
  },

  en_s1u5_n1_054_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['often', 'My', 'smart', 'parents', 'clothes', 'wear', 'never'],
    answer: 'My parents often wear smart clothes',
    audioText: 'My parents often wear smart clothes.',
    answerTranslation: L(
      '제 부모님은 단정한 옷을 자주 입어요.',
      'Ota-onam tez-tez rasmiy kiyim kiyadi.',
      'My parents often wear smart clothes.',
      'Мои родители часто носят элегантную одежду.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['frequency', 'often', 'smart'],
  },

  en_s1u5_n1_055_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I sometimes wear a hat.',
    audioText: 'I sometimes wear a hat.',
    answerTranslation: L(
      '저는 가끔 모자를 써요.',
      'Men ba’zan bosh kiyim kiyaman.',
      'I sometimes wear a hat.',
      'Я иногда ношу шляпу.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['frequency', 'sometimes', 'hat'],
  },

  en_s1u5_n1_056_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'He usually wears a grey jacket and black shoes.',
    audioText: 'He usually wears a grey jacket and black shoes.',
    answerI18n: L(
      '그는 보통 회색 재킷과 검은 신발을 착용해요',
      'U odatda kulrang kurtka va qora tufli kiyadi',
      'He usually wears a grey jacket and black shoes',
      'Он обычно носит серую куртку и чёрную обувь',
    ),
    options: [
      'black',
      'He',
      'grey',
      'usually',
      'wears',
      'a',
      'jacket',
      'and',
      'shoes',
      'red',
    ],
    optionsI18n: {
      ko: [
        '그는',
        '보통',
        '회색',
        '재킷과',
        '검은',
        '신발을',
        '착용해요',
        '빨간',
        '모자를',
      ],
      uz: [
        'U',
        'odatda',
        'kulrang',
        'kurtka',
        'va',
        'qora',
        'tufli',
        'kiyadi',
        'qizil',
        'bosh kiyim',
      ],
      en: [
        'He',
        'usually',
        'wears',
        'a',
        'grey',
        'jacket',
        'and',
        'black',
        'shoes',
        'red',
        'hat',
      ],
      ru: [
        'Он',
        'обычно',
        'носит',
        'серую',
        'куртку',
        'и',
        'чёрную',
        'обувь',
        'красную',
        'шляпу',
      ],
    },
    answerTranslation: L(
      '그는 보통 회색 재킷과 검은 신발을 착용해요.',
      'U odatda kulrang kurtka va qora tufli kiyadi.',
      'He usually wears a grey jacket and black shoes.',
      'Он обычно носит серую куртку и чёрную обувь.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['frequency', 'usually', 'colours', 'clothes'],
  },

  en_s1u5_n1_057_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'T-shirt',
    choices: [
      { text: 'jacket', label: '🧥', emoji: '🧥', imageUrl: '' },
      { text: 'T-shirt', label: '👕', emoji: '👕', imageUrl: '' },
      { text: 'hat', label: '👒', emoji: '👒', imageUrl: '' },
      { text: 'shoes', label: '👞', emoji: '👞', imageUrl: '' },
    ],
    answerTranslation: L('티셔츠', 'futbolka', 'T-shirt', 'футболка'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['clothes', 't-shirt'],
  },

  en_s1u5_n1_058_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'red',
        native: 'qizil',
        nativeI18n: L('빨간색', 'qizil', 'red', 'красный'),
      },
      {
        text: 'green',
        native: 'yashil',
        nativeI18n: L('초록색', 'yashil', 'green', 'зелёный'),
      },
      {
        text: 'brown',
        native: 'jigarrang',
        nativeI18n: L('갈색', 'jigarrang', 'brown', 'коричневый'),
      },
      {
        text: 'grey',
        native: 'kulrang',
        nativeI18n: L('회색', 'kulrang', 'grey', 'серый'),
      },
      {
        text: 'white',
        native: 'oq',
        nativeI18n: L('흰색', 'oq', 'white', 'белый'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['colours', 'listening'],
  },

  en_s1u5_n1_059_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She ___ buys clothes online.',
    blankAnswers: ['sometimes'],
    options: ['sometimes', 'wears', 'smart', 'never wears'],
    answer: 'sometimes',
    answerTranslation: L(
      '그녀는 가끔 온라인에서 옷을 사요.',
      'U ba’zan internetdan kiyim sotib oladi.',
      'She sometimes buys clothes online.',
      'Она иногда покупает одежду в интернете.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['frequency', 'sometimes', 'shopping'],
  },

  en_s1u5_n1_060_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Do you often wear trainers?',
    options: ['Yes', 'I', 'often', 'wear', 'trainers', 'does', 'never'],
    answer: 'Yes I often wear trainers',
    answerTranslation: L(
      '네, 저는 운동화를 자주 신어요.',
      'Ha, men tez-tez krossovka kiyaman.',
      'Yes, I often wear trainers.',
      'Да, я часто ношу кроссовки.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['frequency', 'often', 'trainers'],
  },

  // ===========================================================
  // Lesson 4 · Style, reasons and review
  // ===========================================================

  en_s1u5_n1_061_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I wear a jacket because I work in an office.',
    audioText: 'I wear a jacket because I work in an office.',
    answerTranslation: L(
      '저는 사무실에서 일하기 때문에 재킷을 입어요.',
      'Men ofisda ishlaganim uchun kurtka kiyaman.',
      'I wear a jacket because I work in an office.',
      'Я ношу пиджак, потому что работаю в офисе.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['because', 'clothes', 'jacket'],
  },

  en_s1u5_n1_062_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'jeans',
    choices: [
      { text: 'hat', label: '👒', emoji: '👒', imageUrl: '' },
      { text: 'jacket', label: '🧥', emoji: '🧥', imageUrl: '' },
      { text: 'jeans', label: '👖', emoji: '👖', imageUrl: '' },
      { text: 'trainers', label: '👟', emoji: '👟', imageUrl: '' },
    ],
    answerTranslation: L('청바지', 'jinsi', 'jeans', 'джинсы'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['clothes', 'jeans'],
  },

  en_s1u5_n1_063_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'smart',
        native: 'ozoda',
        nativeI18n: L(
          '단정한',
          'ozoda',
          'neat and formal-looking',
          'элегантный',
        ),
      },
      {
        text: 'casual',
        native: 'kundalik',
        nativeI18n: L(
          '편한; 캐주얼한',
          'kundalik',
          'informal and relaxed',
          'повседневный',
        ),
      },
      {
        text: 'fashion',
        native: 'moda',
        nativeI18n: L('패션', 'moda', 'popular clothing style', 'мода'),
      },
      {
        text: 'clothes',
        native: 'kiyimlar',
        nativeI18n: L('옷', 'kiyimlar', 'things people wear', 'одежда'),
      },
      {
        text: 'wear',
        native: 'kiymoq',
        nativeI18n: L('입다', 'kiymoq', 'have clothes on your body', 'носить'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['style', 'clothes', 'matching'],
  },

  en_s1u5_n1_064_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'the',
      'I',
      'dress',
      'like',
      'this',
      'but',
      'don’t',
      'hat',
      'I',
      'and',
    ],
    answer: 'I like this dress but I don’t like the hat',
    answerTranslation: L(
      '저는 이 드레스는 좋아하지만 그 모자는 좋아하지 않아요.',
      'Menga bu ko‘ylak yoqadi, lekin bosh kiyim yoqmaydi.',
      'I like this dress but I don’t like the hat.',
      'Мне нравится это платье, но не нравится эта шляпа.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['but', 'clothes', 'dress', 'hat'],
  },

  en_s1u5_n1_065_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'smart',
      'bank',
      'a',
      'because',
      'She',
      'clothes',
      'works',
      'wears',
      'in',
      'and',
    ],
    answer: 'She wears smart clothes because she works in a bank',
    audioText: 'She wears smart clothes because she works in a bank.',
    answerTranslation: L(
      '그녀는 은행에서 일하기 때문에 단정한 옷을 입어요.',
      'U bankda ishlagani uchun rasmiy kiyim kiyadi.',
      'She wears smart clothes because she works in a bank.',
      'Она носит элегантную одежду, потому что работает в банке.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['because', 'smart', 'clothes'],
  },

  en_s1u5_n1_066_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'jacket',
        native: 'kurtka',
        nativeI18n: L('재킷', 'kurtka', 'a jacket', 'куртка'),
      },
      {
        text: 'jeans',
        native: 'jinsi',
        nativeI18n: L('청바지', 'jinsi', 'jeans', 'джинсы'),
      },
      {
        text: 'shirt',
        native: 'ko‘ylak',
        nativeI18n: L('셔츠', 'ko‘ylak', 'a shirt', 'рубашка'),
      },
      {
        text: 'shoes',
        native: 'tufli',
        nativeI18n: L('신발', 'tufli', 'shoes', 'обувь'),
      },
      {
        text: 'trousers',
        native: 'shim',
        nativeI18n: L('바지', 'shim', 'trousers', 'брюки'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['clothes', 'review', 'listening'],
  },

  en_s1u5_n1_067_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'My brother wears casual clothes at home.',
    audioText: 'My brother wears casual clothes at home.',
    answerTranslation: L(
      '제 남자 형제는 집에서 편한 옷을 입어요.',
      'Akam yoki ukam uyda kundalik kiyim kiyadi.',
      'My brother wears casual clothes at home.',
      'Мой брат дома носит повседневную одежду.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['casual', 'clothes', 'family'],
  },

  en_s1u5_n1_068_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'I have a blue jacket and black trousers.',
    audioText: 'I have a blue jacket and black trousers.',
    answerI18n: L(
      '저는 파란 재킷과 검은 바지가 있어요',
      'Mening ko‘k kurtkam va qora shimim bor',
      'I have a blue jacket and black trousers',
      'У меня есть синяя куртка и чёрные брюки',
    ),
    options: [
      'black',
      'I',
      'blue',
      'have',
      'a',
      'jacket',
      'and',
      'trousers',
      'red',
    ],
    optionsI18n: {
      ko: [
        '저는',
        '파란',
        '재킷과',
        '검은',
        '바지가',
        '있어요',
        '빨간',
        '모자가',
      ],
      uz: [
        'Mening',
        'ko‘k',
        'kurtkam',
        'va',
        'qora',
        'shimim',
        'bor',
        'qizil',
        'bosh kiyimim',
      ],
      en: [
        'I',
        'have',
        'a',
        'blue',
        'jacket',
        'and',
        'black',
        'trousers',
        'red',
        'hat',
      ],
      ru: [
        'У меня',
        'есть',
        'синяя',
        'куртка',
        'и',
        'чёрные',
        'брюки',
        'красная',
        'шляпа',
      ],
    },
    answerTranslation: L(
      '저는 파란 재킷과 검은 바지가 있어요.',
      'Mening ko‘k kurtkam va qora shimim bor.',
      'I have a blue jacket and black trousers.',
      'У меня есть синяя куртка и чёрные брюки.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['clothes', 'colours', 'sentence-builder'],
  },

  en_s1u5_n1_069_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I wear smart clothes ___ I work in a bank.',
    blankAnswers: ['because'],
    options: ['because', 'but', 'never', 'wear'],
    answer: 'because',
    answerTranslation: L(
      '저는 은행에서 일하기 때문에 단정한 옷을 입어요.',
      'Men bankda ishlaganim uchun rasmiy kiyim kiyaman.',
      'I wear smart clothes because I work in a bank.',
      'Я ношу элегантную одежду, потому что работаю в банке.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['because', 'reading-skill'],
  },

  en_s1u5_n1_070_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'top',
    choices: [
      { text: 'hat', label: '👒', emoji: '👒', imageUrl: '' },
      { text: 'top', label: '👚', emoji: '👚', imageUrl: '' },
      { text: 'trainers', label: '👟', emoji: '👟', imageUrl: '' },
      { text: 'jacket', label: '🧥', emoji: '🧥', imageUrl: '' },
    ],
    answerTranslation: L('상의', 'ustki kiyim', 'top', 'топ'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['clothes', 'top'],
  },

  en_s1u5_n1_071_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Why do you wear smart clothes at work?',
    options: ['Because', 'I', 'work', 'in', 'a', 'bank', 'wear', 'usually'],
    answer: 'Because I work in a bank',
    answerTranslation: L(
      '은행에서 일하기 때문이에요.',
      'Chunki men bankda ishlayman.',
      'Because I work in a bank.',
      'Потому что я работаю в банке.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['because', 'reply', 'smart'],
  },

  en_s1u5_n1_072_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'grey',
      'My',
      'are',
      'black',
      'shoes',
      'and',
      'jacket',
      'is',
      'my',
      'blue',
    ],
    answer: 'My shoes are black and my jacket is grey',
    answerTranslation: L(
      '제 신발은 검은색이고 재킷은 회색이에요.',
      'Tuflim qora, kurtkam esa kulrang.',
      'My shoes are black and my jacket is grey.',
      'Моя обувь чёрная, а куртка серая.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['and', 'colours', 'clothes'],
  },

  en_s1u5_n1_073_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'dress',
        native: 'ko‘ylak',
        nativeI18n: L('드레스', 'ko‘ylak', 'a dress', 'платье'),
      },
      {
        text: 'hat',
        native: 'bosh kiyim',
        nativeI18n: L('모자', 'bosh kiyim', 'a hat', 'шляпа'),
      },
      {
        text: 'jacket',
        native: 'kurtka',
        nativeI18n: L('재킷', 'kurtka', 'a jacket', 'куртка'),
      },
      {
        text: 'top',
        native: 'ustki kiyim',
        nativeI18n: L('상의', 'ustki kiyim', 'a top', 'топ'),
      },
      {
        text: 'trainers',
        native: 'krossovka',
        nativeI18n: L('운동화', 'krossovka', 'trainers', 'кроссовки'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['clothes', 'review', 'matching'],
  },

  en_s1u5_n1_074_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'fashion',
      'expensive',
      'She',
      'likes',
      'but',
      'doesn’t',
      'buy',
      'clothes',
      'smart',
    ],
    answer: 'She likes fashion but doesn’t buy expensive clothes',
    audioText: 'She likes fashion but doesn’t buy expensive clothes.',
    answerTranslation: L(
      '그녀는 패션을 좋아하지만 비싼 옷은 사지 않아요.',
      'U modani yoqtiradi, lekin qimmat kiyim sotib olmaydi.',
      'She likes fashion but doesn’t buy expensive clothes.',
      'Она любит моду, но не покупает дорогую одежду.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['but', 'fashion', 'clothes'],
  },

  en_s1u5_n1_075_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'We usually wear casual clothes at the weekend.',
    audioText: 'We usually wear casual clothes at the weekend.',
    answerTranslation: L(
      '우리는 주말에 보통 편한 옷을 입어요.',
      'Biz dam olish kunlari odatda kundalik kiyim kiyaman.',
      'We usually wear casual clothes at the weekend.',
      'По выходным мы обычно носим повседневную одежду.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['frequency', 'usually', 'casual'],
  },

  en_s1u5_n1_076_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'He often wears his old brown jacket.',
    audioText: 'He often wears his old brown jacket.',
    answerI18n: L(
      '그는 오래된 갈색 재킷을 자주 입어요',
      'U eski jigarrang kurtkasini tez-tez kiyadi',
      'He often wears his old brown jacket',
      'Он часто носит свою старую коричневую куртку',
    ),
    options: [
      'brown',
      'He',
      'often',
      'wears',
      'his',
      'old',
      'jacket',
      'never',
      'blue',
    ],
    optionsI18n: {
      ko: [
        '그는',
        '오래된',
        '갈색',
        '재킷을',
        '자주',
        '입어요',
        '파란',
        '모자를',
      ],
      uz: [
        'U',
        'eski',
        'jigarrang',
        'kurtkasini',
        'tez-tez',
        'kiyadi',
        'ko‘k',
        'bosh kiyimni',
      ],
      en: [
        'He',
        'often',
        'wears',
        'his',
        'old',
        'brown',
        'jacket',
        'never',
        'blue',
        'hat',
      ],
      ru: [
        'Он',
        'часто',
        'носит',
        'свою',
        'старую',
        'коричневую',
        'куртку',
        'никогда',
        'синюю',
        'шляпу',
      ],
    },
    answerTranslation: L(
      '그는 오래된 갈색 재킷을 자주 입어요.',
      'U eski jigarrang kurtkasini tez-tez kiyadi.',
      'He often wears his old brown jacket.',
      'Он часто носит свою старую коричневую куртку.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['frequency', 'often', 'brown', 'jacket'],
  },

  en_s1u5_n1_077_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'dress',
    choices: [
      { text: 'trainers', label: '👟', emoji: '👟', imageUrl: '' },
      { text: 'hat', label: '👒', emoji: '👒', imageUrl: '' },
      { text: 'dress', label: '👗', emoji: '👗', imageUrl: '' },
      { text: 'jacket', label: '🧥', emoji: '🧥', imageUrl: '' },
    ],
    answerTranslation: L('드레스', 'ko‘ylak', 'dress', 'платье'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['clothes', 'dress', 'review'],
  },

  en_s1u5_n1_078_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'smart',
        native: 'ozoda',
        nativeI18n: L('단정한', 'ozoda', 'smart', 'элегантный'),
      },
      {
        text: 'casual',
        native: 'kundalik',
        nativeI18n: L('편한', 'kundalik', 'casual', 'повседневный'),
      },
      {
        text: 'always',
        native: 'har doim',
        nativeI18n: L('항상', 'har doim', 'every time', 'всегда'),
      },
      {
        text: 'often',
        native: 'tez-tez',
        nativeI18n: L('자주', 'tez-tez', 'many times', 'часто'),
      },
      {
        text: 'never',
        native: 'hech qachon',
        nativeI18n: L(
          '절대 ~하지 않다',
          'hech qachon',
          'not at any time',
          'никогда',
        ),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['style', 'frequency', 'review'],
  },

  en_s1u5_n1_079_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I like trainers ___ they look good.',
    blankAnswers: ['because'],
    options: ['because', 'but', 'never', 'usually'],
    answer: 'because',
    answerTranslation: L(
      '저는 운동화가 보기 좋기 때문에 좋아해요.',
      'Menga krossovkalar yoqadi, chunki ular chiroyli ko‘rinadi.',
      'I like trainers because they look good.',
      'Мне нравятся кроссовки, потому что они хорошо выглядят.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['because', 'reading-skill', 'trainers'],
  },

  en_s1u5_n1_080_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What do you usually wear at the weekend?',
    options: ['I', 'usually', 'wear', 'casual', 'clothes', 'smart', 'does'],
    answer: 'I usually wear casual clothes',
    answerTranslation: L(
      '저는 주말에 보통 편한 옷을 입어요.',
      'Men dam olish kunlari odatda kundalik kiyim kiyaman.',
      'I usually wear casual clothes.',
      'По выходным я обычно ношу повседневную одежду.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['frequency', 'usually', 'casual', 'final'],
  },
};

export const EN_S1_UNIT5_NODE1 = {
  title: L('옷 스타일', 'Kiyim uslubi', 'Clothes style', 'Стиль одежды'),
  section: 1,
  unit: 5,
  order: 1,
  isActive: true,

  lessons: [
    {
      title: L(
        '얼마나 자주 입어요?',
        'Qanchalik tez-tez kiyasiz?',
        'How often do you wear it?',
        'Как часто вы это носите?',
      ),
      description: L(
        'always, usually, often, sometimes, never를 사용해 평소 어떤 스타일의 옷을 입는지 말해요.',
        'always, usually, often, sometimes va never yordamida odatda qanday kiyim kiyishingizni aytasiz.',
        'Use always, usually, often, sometimes and never to talk about the clothes you normally wear.',
        'Используем always, usually, often, sometimes и never, чтобы говорить о том, какую одежду вы обычно носите.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 1,
      questions: [
        'en_s1u5_n1_001_speaking',
        'en_s1u5_n1_002_image_choice',
        'en_s1u5_n1_003_word_matching',
        'en_s1u5_n1_004_translate_builder',
        'en_s1u5_n1_005_word_arrange',
        'en_s1u5_n1_006_audio_match',
        'en_s1u5_n1_007_speaking',
        'en_s1u5_n1_008_sentence_builder',
        'en_s1u5_n1_009_fill_in_blank',
        'en_s1u5_n1_010_image_choice',
        'en_s1u5_n1_011_reply_builder',
        'en_s1u5_n1_012_translate_builder',
        'en_s1u5_n1_013_word_arrange',
        'en_s1u5_n1_014_dialog_complete',
        'en_s1u5_n1_015_speaking',
        'en_s1u5_n1_016_sentence_builder',
        'en_s1u5_n1_017_image_choice',
        'en_s1u5_n1_018_fill_in_blank',
        'en_s1u5_n1_019_translate_builder',
        'en_s1u5_n1_020_reply_builder',
      ],
    },

    {
      title: L(
        '색깔과 옷',
        'Ranglar va kiyimlar',
        'Colours and clothes',
        'Цвета и одежда',
      ),
      description: L(
        '기본 색깔과 dress, jacket, jeans, jumper, shirt, shoes 같은 핵심 옷 단어를 익혀요.',
        'Asosiy ranglar hamda dress, jacket, jeans, jumper, shirt va shoes kabi kiyim so‘zlarini o‘rganasiz.',
        'Learn basic colours and core clothing words such as dress, jacket, jeans, jumper, shirt and shoes.',
        'Изучаем основные цвета и названия одежды: dress, jacket, jeans, jumper, shirt, shoes и другие.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 2,
      questions: [
        'en_s1u5_n1_021_speaking',
        'en_s1u5_n1_022_image_choice',
        'en_s1u5_n1_023_word_matching',
        'en_s1u5_n1_024_translate_builder',
        'en_s1u5_n1_025_word_arrange',
        'en_s1u5_n1_026_audio_match',
        'en_s1u5_n1_027_speaking',
        'en_s1u5_n1_028_sentence_builder',
        'en_s1u5_n1_029_fill_in_blank',
        'en_s1u5_n1_030_image_choice',
        'en_s1u5_n1_031_reply_builder',
        'en_s1u5_n1_032_translate_builder',
        'en_s1u5_n1_033_word_matching',
        'en_s1u5_n1_034_word_arrange',
        'en_s1u5_n1_035_speaking',
        'en_s1u5_n1_036_sentence_builder',
        'en_s1u5_n1_037_image_choice',
        'en_s1u5_n1_038_audio_match',
        'en_s1u5_n1_039_fill_in_blank',
        'en_s1u5_n1_040_reply_builder',
      ],
    },

    {
      title: L(
        '평소 옷차림 말하기',
        'Odatdagi kiyim haqida gapirish',
        'Talk about what people wear',
        'Говорим о привычной одежде',
      ),
      description: L(
        '옷과 색깔을 빈도부사와 결합해 자신과 다른 사람이 평소 무엇을 입는지 말해요.',
        'Kiyim va ranglarni chastota ravishlari bilan birga ishlatib, o‘zingiz va boshqalarning odatiy kiyimi haqida gapirasiz.',
        'Combine clothes, colours and frequency adverbs to describe what you and other people normally wear.',
        'Соединяем лексику одежды, цвета и наречия частотности, чтобы описывать привычный стиль.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 3,
      questions: [
        'en_s1u5_n1_041_speaking',
        'en_s1u5_n1_042_image_choice',
        'en_s1u5_n1_043_word_matching',
        'en_s1u5_n1_044_translate_builder',
        'en_s1u5_n1_045_word_arrange',
        'en_s1u5_n1_046_audio_match',
        'en_s1u5_n1_047_speaking',
        'en_s1u5_n1_048_sentence_builder',
        'en_s1u5_n1_049_fill_in_blank',
        'en_s1u5_n1_050_image_choice',
        'en_s1u5_n1_051_reply_builder',
        'en_s1u5_n1_052_translate_builder',
        'en_s1u5_n1_053_word_matching',
        'en_s1u5_n1_054_word_arrange',
        'en_s1u5_n1_055_speaking',
        'en_s1u5_n1_056_sentence_builder',
        'en_s1u5_n1_057_image_choice',
        'en_s1u5_n1_058_audio_match',
        'en_s1u5_n1_059_fill_in_blank',
        'en_s1u5_n1_060_reply_builder',
      ],
    },

    {
      title: L(
        '내 스타일 설명하기',
        'O‘z uslubimni tasvirlash',
        'Describe your style',
        'Описываем свой стиль',
      ),
      description: L(
        'and, but, because와 옷·색깔·빈도 표현을 함께 사용해 옷 스타일과 선택 이유를 말해요.',
        'and, but, because hamda kiyim, rang va chastota so‘zlarini birga ishlatib, uslubingiz va tanlovingiz sababini aytasiz.',
        'Use and, but and because with clothes, colours and frequency language to describe style and explain choices.',
        'Используем and, but и because вместе с лексикой одежды, цветов и частотности, чтобы описывать стиль и объяснять выбор.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 4,
      questions: [
        'en_s1u5_n1_061_speaking',
        'en_s1u5_n1_062_image_choice',
        'en_s1u5_n1_063_word_matching',
        'en_s1u5_n1_064_translate_builder',
        'en_s1u5_n1_065_word_arrange',
        'en_s1u5_n1_066_audio_match',
        'en_s1u5_n1_067_speaking',
        'en_s1u5_n1_068_sentence_builder',
        'en_s1u5_n1_069_fill_in_blank',
        'en_s1u5_n1_070_image_choice',
        'en_s1u5_n1_071_reply_builder',
        'en_s1u5_n1_072_translate_builder',
        'en_s1u5_n1_073_word_matching',
        'en_s1u5_n1_074_word_arrange',
        'en_s1u5_n1_075_speaking',
        'en_s1u5_n1_076_sentence_builder',
        'en_s1u5_n1_077_image_choice',
        'en_s1u5_n1_078_audio_match',
        'en_s1u5_n1_079_fill_in_blank',
        'en_s1u5_n1_080_reply_builder',
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Section 1 · Unit 5 · Node 2
// 5.2 Amazing architecture
//
// Coverage
// - adjectives:
//   different / exciting / interesting / modern / unusual
//   + review: beautiful / big / old
// - architecture vocabulary:
//   stadium / design / architecture / museum / palace
// - Wh- questions:
//   What / Where / When / Why
// - Wh- word + is/are + subject
// - Wh- word + do/does + subject + verb
// - describing a building
// - explaining why you like a building
// - listening for chunks
//
// Existing words reused, not duplicated in *_WORDS:
// beautiful / big / old / building / restaurant / office
// what / where / hotel / house
//
// 4 lessons × 20 questions = 80
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT5_NODE2_WORDS = [
  {
    code: 'en-adjective-different',
    english: 'different',
    senseKey: 'not-the-same',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('다른', 'boshqacha', 'not the same', 'другой; отличающийся'),
    examples: [
      {
        english: 'This building is different from the others.',
        translations: L(
          '이 건물은 다른 건물들과 달라요.',
          'Bu bino boshqalaridan farq qiladi.',
          'This building is different from the others.',
          'Это здание отличается от других.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈdɪfrənt/',
      ttsText: 'different',
    },
    media: {
      emoji: '↔️',
      imageUrl: '',
      imageAlt: L(
        '서로 다른 두 가지',
        'bir-biridan farqli ikki narsa',
        'two different things',
        'две разные вещи',
      ),
    },
    tags: ['adjectives', 'buildings'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-exciting',
    english: 'exciting',
    senseKey: 'causing-excitement',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '흥미진진한; 신나는',
      'hayajonli',
      'making you feel excited',
      'захватывающий',
    ),
    examples: [
      {
        english: 'The design is exciting.',
        translations: L(
          '그 디자인은 흥미진진해요.',
          'Dizayn hayajonli.',
          'The design is exciting.',
          'Дизайн захватывающий.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɪkˈsaɪtɪŋ/',
      ttsText: 'exciting',
    },
    media: {
      emoji: '🤩',
      imageUrl: '',
      imageAlt: L(
        '흥미로운 모습',
        'hayajonli ko‘rinish',
        'something exciting',
        'что-то захватывающее',
      ),
    },
    tags: ['adjectives', 'buildings'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-interesting',
    english: 'interesting',
    senseKey: 'holding-attention',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '흥미로운',
      'qiziqarli',
      'making you want to know more',
      'интересный',
    ),
    examples: [
      {
        english: 'It is a very interesting building.',
        translations: L(
          '아주 흥미로운 건물이에요.',
          'Bu juda qiziqarli bino.',
          'It is a very interesting building.',
          'Это очень интересное здание.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈɪntrəstɪŋ/',
      ttsText: 'interesting',
    },
    media: {
      emoji: '💡',
      imageUrl: '',
      imageAlt: L(
        '흥미로운 것',
        'qiziqarli narsa',
        'something interesting',
        'что-то интересное',
      ),
    },
    tags: ['adjectives', 'buildings'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-modern',
    english: 'modern',
    senseKey: 'new-current-style',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '현대적인; 최신식의',
      'zamonaviy',
      'using a new or current style',
      'современный',
    ),
    examples: [
      {
        english: 'The stadium is very modern.',
        translations: L(
          '그 경기장은 아주 현대적이에요.',
          'Stadion juda zamonaviy.',
          'The stadium is very modern.',
          'Стадион очень современный.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈmɒdən/',
      ttsText: 'modern',
    },
    media: {
      emoji: '🏙️',
      imageUrl: '',
      imageAlt: L(
        '현대적인 건물',
        'zamonaviy bino',
        'a modern building',
        'современное здание',
      ),
    },
    tags: ['adjectives', 'buildings'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-unusual',
    english: 'unusual',
    senseKey: 'not-common',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '특이한; 흔하지 않은',
      'g‘ayrioddiy',
      'different from what is usual',
      'необычный',
    ),
    examples: [
      {
        english: 'It is an unusual house.',
        translations: L(
          '특이한 집이에요.',
          'Bu g‘ayrioddiy uy.',
          'It is an unusual house.',
          'Это необычный дом.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ʌnˈjuːʒuəl/',
      ttsText: 'unusual',
    },
    media: {
      emoji: '🏠',
      imageUrl: '',
      imageAlt: L(
        '특이한 집',
        'g‘ayrioddiy uy',
        'an unusual house',
        'необычный дом',
      ),
    },
    tags: ['adjectives', 'buildings'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-question-when',
    english: 'when',
    senseKey: 'question-about-time',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L('언제', 'qachon', 'at what time', 'когда'),
    examples: [
      {
        english: 'When is the museum open?',
        translations: L(
          '박물관은 언제 열려 있어요?',
          'Muzey qachon ochiq?',
          'When is the museum open?',
          'Когда открыт музей?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/wen/',
      ttsText: 'when',
    },
    media: {
      emoji: '🕐',
      imageUrl: '',
      imageAlt: L(
        '시간을 묻는 질문',
        'vaqt haqida savol',
        'a question about time',
        'вопрос о времени',
      ),
    },
    tags: ['question-words'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-question-why',
    english: 'why',
    senseKey: 'question-about-reason',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L('왜', 'nega', 'for what reason', 'почему'),
    examples: [
      {
        english: 'Why do you like this building?',
        translations: L(
          '왜 이 건물을 좋아해요?',
          'Nega bu bino sizga yoqadi?',
          'Why do you like this building?',
          'Почему вам нравится это здание?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/waɪ/',
      ttsText: 'why',
    },
    media: {
      emoji: '❓',
      imageUrl: '',
      imageAlt: L(
        '이유를 묻는 질문',
        'sabab haqida savol',
        'a question asking for a reason',
        'вопрос о причине',
      ),
    },
    tags: ['question-words'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-place-stadium',
    english: 'stadium',
    senseKey: 'sports-arena',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '경기장',
      'stadion',
      'a large place for sports events',
      'стадион',
    ),
    examples: [
      {
        english: 'The stadium is in Munich.',
        translations: L(
          '그 경기장은 뮌헨에 있어요.',
          'Stadion Myunxenda.',
          'The stadium is in Munich.',
          'Стадион находится в Мюнхене.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈsteɪdiəm/',
      ttsText: 'stadium',
    },
    media: {
      emoji: '🏟️',
      imageUrl: '',
      imageAlt: L('경기장', 'stadion', 'a stadium', 'стадион'),
    },
    tags: ['buildings', 'places'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-design',
    english: 'design',
    senseKey: 'appearance-plan',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '디자인; 설계',
      'dizayn',
      'the way something is planned or looks',
      'дизайн',
    ),
    examples: [
      {
        english: 'I like the design of this building.',
        translations: L(
          '저는 이 건물의 디자인이 좋아요.',
          'Menga bu binoning dizayni yoqadi.',
          'I like the design of this building.',
          'Мне нравится дизайн этого здания.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/dɪˈzaɪn/',
      ttsText: 'design',
    },
    media: {
      emoji: '📐',
      imageUrl: '',
      imageAlt: L(
        '건물 디자인',
        'bino dizayni',
        'building design',
        'дизайн здания',
      ),
    },
    tags: ['architecture', 'design'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-architecture',
    english: 'architecture',
    senseKey: 'building-design-art',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '건축; 건축 양식',
      'arxitektura',
      'the art and style of designing buildings',
      'архитектура',
    ),
    examples: [
      {
        english: 'I like modern architecture.',
        translations: L(
          '저는 현대 건축을 좋아해요.',
          'Menga zamonaviy arxitektura yoqadi.',
          'I like modern architecture.',
          'Мне нравится современная архитектура.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈɑːkɪtektʃə/',
      ttsText: 'architecture',
    },
    media: {
      emoji: '🏛️',
      imageUrl: '',
      imageAlt: L('건축물', 'arxitektura', 'architecture', 'архитектура'),
    },
    tags: ['architecture'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-place-museum',
    english: 'museum',
    senseKey: 'public-collection-building',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '박물관; 미술관',
      'muzey',
      'a place where important objects are shown',
      'музей',
    ),
    examples: [
      {
        english: 'The museum is open today.',
        translations: L(
          '박물관은 오늘 열려 있어요.',
          'Muzey bugun ochiq.',
          'The museum is open today.',
          'Музей сегодня открыт.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/mjuˈziːəm/',
      ttsText: 'museum',
    },
    media: {
      emoji: '🏛️',
      imageUrl: '',
      imageAlt: L('박물관', 'muzey', 'a museum', 'музей'),
    },
    tags: ['buildings', 'places'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-place-palace',
    english: 'palace',
    senseKey: 'large-royal-house',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '궁전',
      'saroy',
      'a large home of a king, queen, or important person',
      'дворец',
    ),
    examples: [
      {
        english: 'The palace is old and beautiful.',
        translations: L(
          '그 궁전은 오래되고 아름다워요.',
          'Saroy eski va chiroyli.',
          'The palace is old and beautiful.',
          'Дворец старый и красивый.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈpælɪs/',
      ttsText: 'palace',
    },
    media: {
      emoji: '🏰',
      imageUrl: '',
      imageAlt: L('궁전', 'saroy', 'a palace', 'дворец'),
    },
    tags: ['buildings', 'places'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-open',
    english: 'open',
    senseKey: 'available-for-visitors',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '열려 있는; 영업 중인',
      'ochiq',
      'available for people to enter or use',
      'открытый',
    ),
    examples: [
      {
        english: 'The museum is open from ten to six.',
        translations: L(
          '박물관은 10시부터 6시까지 열려 있어요.',
          'Muzey soat o‘ndan oltigacha ochiq.',
          'The museum is open from ten to six.',
          'Музей открыт с десяти до шести.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈəʊpən/',
      ttsText: 'open',
    },
    media: {
      emoji: '🔓',
      imageUrl: '',
      imageAlt: L(
        '열려 있는 장소',
        'ochiq joy',
        'an open place',
        'открытое место',
      ),
    },
    tags: ['buildings', 'opening-times'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-closed',
    english: 'closed',
    senseKey: 'not-open-for-visitors',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '닫혀 있는; 영업하지 않는',
      'yopiq',
      'not open for people to enter or use',
      'закрытый',
    ),
    examples: [
      {
        english: 'The museum is closed in January.',
        translations: L(
          '박물관은 1월에 문을 닫아요.',
          'Muzey yanvar oyida yopiq.',
          'The museum is closed in January.',
          'Музей закрыт в январе.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/kləʊzd/',
      ttsText: 'closed',
    },
    media: {
      emoji: '🔒',
      imageUrl: '',
      imageAlt: L(
        '닫혀 있는 장소',
        'yopiq joy',
        'a closed place',
        'закрытое место',
      ),
    },
    tags: ['buildings', 'opening-times'],
    difficulty: 1,
    isCore: true,
  },
];

export const EN_S1_UNIT5_NODE2_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Adjectives for buildings
  // ===========================================================

  en_s1u5_n2_001_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The building is modern and unusual.',
    audioText: 'The building is modern and unusual.',
    answerTranslation: L(
      '그 건물은 현대적이고 특이해요.',
      'Bino zamonaviy va g‘ayrioddiy.',
      'The building is modern and unusual.',
      'Здание современное и необычное.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['buildings', 'modern', 'unusual'],
  },

  en_s1u5_n2_002_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'stadium',
    choices: [
      { text: 'stadium', label: '🏟️', emoji: '🏟️', imageUrl: '' },
      { text: 'restaurant', label: '🍽️', emoji: '🍽️', imageUrl: '' },
      { text: 'office', label: '🏢', emoji: '🏢', imageUrl: '' },
      { text: 'house', label: '🏠', emoji: '🏠', imageUrl: '' },
    ],
    answerTranslation: L('경기장', 'stadion', 'stadium', 'стадион'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['buildings', 'stadium'],
  },

  en_s1u5_n2_003_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'different',
        native: 'boshqacha',
        nativeI18n: L('다른', 'boshqacha', 'not the same', 'другой'),
      },
      {
        text: 'exciting',
        native: 'hayajonli',
        nativeI18n: L('흥미진진한', 'hayajonli', 'exciting', 'захватывающий'),
      },
      {
        text: 'interesting',
        native: 'qiziqarli',
        nativeI18n: L('흥미로운', 'qiziqarli', 'interesting', 'интересный'),
      },
      {
        text: 'modern',
        native: 'zamonaviy',
        nativeI18n: L('현대적인', 'zamonaviy', 'modern', 'современный'),
      },
      {
        text: 'unusual',
        native: 'g‘ayrioddiy',
        nativeI18n: L('특이한', 'g‘ayrioddiy', 'unusual', 'необычный'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['adjectives', 'buildings', 'matching'],
  },

  en_s1u5_n2_004_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'It',
      'is',
      'a',
      'beautiful',
      'old',
      'building',
      'modern',
      'does',
    ],
    answer: 'It is a beautiful old building',
    answerTranslation: L(
      '아름답고 오래된 건물이에요.',
      'Bu chiroyli eski bino.',
      'It is a beautiful old building.',
      'Это красивое старое здание.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['buildings', 'beautiful', 'old'],
  },

  en_s1u5_n2_005_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['The', 'museum', 'is', 'big', 'and', 'interesting', 'stadium'],
    answer: 'The museum is big and interesting',
    audioText: 'The museum is big and interesting.',
    answerTranslation: L(
      '그 박물관은 크고 흥미로워요.',
      'Muzey katta va qiziqarli.',
      'The museum is big and interesting.',
      'Музей большой и интересный.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['museum', 'big', 'interesting'],
  },

  en_s1u5_n2_006_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'modern',
        native: 'zamonaviy',
        nativeI18n: L('현대적인', 'zamonaviy', 'modern', 'современный'),
      },
      {
        text: 'unusual',
        native: 'g‘ayrioddiy',
        nativeI18n: L('특이한', 'g‘ayrioddiy', 'unusual', 'необычный'),
      },
      {
        text: 'different',
        native: 'boshqacha',
        nativeI18n: L('다른', 'boshqacha', 'different', 'другой'),
      },
      {
        text: 'exciting',
        native: 'hayajonli',
        nativeI18n: L('흥미진진한', 'hayajonli', 'exciting', 'захватывающий'),
      },
      {
        text: 'interesting',
        native: 'qiziqarli',
        nativeI18n: L('흥미로운', 'qiziqarli', 'interesting', 'интересный'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['adjectives', 'listening'],
  },

  en_s1u5_n2_007_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'museum',
    choices: [
      { text: 'museum', label: '🏛️', emoji: '🏛️', imageUrl: '' },
      { text: 'restaurant', label: '🍽️', emoji: '🍽️', imageUrl: '' },
      { text: 'stadium', label: '🏟️', emoji: '🏟️', imageUrl: '' },
      { text: 'house', label: '🏠', emoji: '🏠', imageUrl: '' },
    ],
    answerTranslation: L('박물관', 'muzey', 'museum', 'музей'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['museum', 'buildings'],
  },

  en_s1u5_n2_008_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'This house is very ___.',
    blankAnswers: ['unusual'],
    options: ['unusual', 'stadium', 'when', 'office'],
    answer: 'unusual',
    answerTranslation: L(
      '이 집은 아주 특이해요.',
      'Bu uy juda g‘ayrioddiy.',
      'This house is very unusual.',
      'Этот дом очень необычный.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unusual', 'house'],
  },

  en_s1u5_n2_009_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'The building is modern but very different.',
    audioText: 'The building is modern but very different.',
    answerI18n: L(
      '그 건물은 현대적이지만 매우 달라요',
      'Bino zamonaviy, lekin juda boshqacha',
      'The building is modern but very different',
      'Здание современное, но очень необычное',
    ),
    options: [
      'The',
      'building',
      'is',
      'modern',
      'but',
      'very',
      'different',
      'old',
    ],
    optionsI18n: {
      ko: ['그', '건물은', '현대적이지만', '매우', '달라요', '오래됐어요'],
      uz: ['Bino', 'zamonaviy', 'lekin', 'juda', 'boshqacha', 'eski'],
      en: [
        'The',
        'building',
        'is',
        'modern',
        'but',
        'very',
        'different',
        'old',
      ],
      ru: ['Здание', 'современное', 'но', 'очень', 'необычное', 'старое'],
    },
    answerTranslation: L(
      '그 건물은 현대적이지만 매우 달라요.',
      'Bino zamonaviy, lekin juda boshqacha.',
      'The building is modern but very different.',
      'Здание современное, но очень необычное.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['modern', 'different', 'sentence-builder'],
  },

  en_s1u5_n2_010_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What do you think of the building?',
    options: [
      'I',
      'think',
      'it',
      'is',
      'beautiful',
      'and',
      'interesting',
      'when',
    ],
    answer: 'I think it is beautiful and interesting',
    answerTranslation: L(
      '아름답고 흥미롭다고 생각해요.',
      'Menimcha, u chiroyli va qiziqarli.',
      'I think it is beautiful and interesting.',
      'Я думаю, что оно красивое и интересное.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['buildings', 'opinion', 'reply'],
  },

  en_s1u5_n2_011_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['This', 'stadium', 'is', 'big', 'and', 'modern', 'museum', 'why'],
    answer: 'This stadium is big and modern',
    answerTranslation: L(
      '이 경기장은 크고 현대적이에요.',
      'Bu stadion katta va zamonaviy.',
      'This stadium is big and modern.',
      'Этот стадион большой и современный.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['stadium', 'big', 'modern'],
  },

  en_s1u5_n2_012_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'stadium',
        native: 'stadion',
        nativeI18n: L('경기장', 'stadion', 'sports arena', 'стадион'),
      },
      {
        text: 'museum',
        native: 'muzey',
        nativeI18n: L('박물관', 'muzey', 'museum', 'музей'),
      },
      {
        text: 'palace',
        native: 'saroy',
        nativeI18n: L('궁전', 'saroy', 'palace', 'дворец'),
      },
      {
        text: 'design',
        native: 'dizayn',
        nativeI18n: L('디자인', 'dizayn', 'design', 'дизайн'),
      },
      {
        text: 'architecture',
        native: 'arxitektura',
        nativeI18n: L('건축', 'arxitektura', 'architecture', 'архитектура'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['architecture', 'matching'],
  },

  en_s1u5_n2_013_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'stadium',
        native: 'stadion',
        nativeI18n: L('경기장', 'stadion', 'stadium', 'стадион'),
      },
      {
        text: 'museum',
        native: 'muzey',
        nativeI18n: L('박물관', 'muzey', 'museum', 'музей'),
      },
      {
        text: 'palace',
        native: 'saroy',
        nativeI18n: L('궁전', 'saroy', 'palace', 'дворец'),
      },
      {
        text: 'design',
        native: 'dizayn',
        nativeI18n: L('디자인', 'dizayn', 'design', 'дизайн'),
      },
      {
        text: 'architecture',
        native: 'arxitektura',
        nativeI18n: L('건축', 'arxitektura', 'architecture', 'архитектура'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['architecture', 'listening'],
  },

  en_s1u5_n2_014_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'palace',
    choices: [
      { text: 'stadium', label: '🏟️', emoji: '🏟️', imageUrl: '' },
      { text: 'palace', label: '🏰', emoji: '🏰', imageUrl: '' },
      { text: 'office', label: '🏢', emoji: '🏢', imageUrl: '' },
      { text: 'restaurant', label: '🍽️', emoji: '🍽️', imageUrl: '' },
    ],
    answerTranslation: L('궁전', 'saroy', 'palace', 'дворец'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['palace', 'buildings'],
  },

  en_s1u5_n2_015_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The design is exciting.',
    audioText: 'The design is exciting.',
    answerTranslation: L(
      '그 디자인은 흥미진진해요.',
      'Dizayn hayajonli.',
      'The design is exciting.',
      'Дизайн захватывающий.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['design', 'exciting'],
  },

  en_s1u5_n2_016_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The palace is old but ___.',
    blankAnswers: ['beautiful'],
    options: ['beautiful', 'when', 'stadium', 'closed'],
    answer: 'beautiful',
    answerTranslation: L(
      '그 궁전은 오래됐지만 아름다워요.',
      'Saroy eski, lekin chiroyli.',
      'The palace is old but beautiful.',
      'Дворец старый, но красивый.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['palace', 'old', 'beautiful'],
  },

  en_s1u5_n2_017_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'It',
      'looks',
      'unusual',
      'but',
      'interesting',
      'where',
      'stadium',
    ],
    answer: 'It looks unusual but interesting',
    answerTranslation: L(
      '특이해 보이지만 흥미로워요.',
      'U g‘ayrioddiy, lekin qiziqarli ko‘rinadi.',
      'It looks unusual but interesting.',
      'Оно выглядит необычно, но интересно.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['unusual', 'interesting', 'but'],
  },

  en_s1u5_n2_018_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['This', 'modern', 'building', 'is', 'a', 'museum', 'stadium'],
    answer: 'This modern building is a museum',
    audioText: 'This modern building is a museum.',
    answerTranslation: L(
      '이 현대적인 건물은 박물관이에요.',
      'Bu zamonaviy bino muzey.',
      'This modern building is a museum.',
      'Это современное здание — музей.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['modern', 'building', 'museum'],
  },

  en_s1u5_n2_019_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Do you like this building?',
    options: ['Yes', 'I', 'do', 'It', 'is', 'very', 'interesting', 'does'],
    answer: 'Yes I do It is very interesting',
    answerTranslation: L(
      '네, 좋아해요. 아주 흥미로워요.',
      'Ha, yoqadi. U juda qiziqarli.',
      'Yes, I do. It is very interesting.',
      'Да. Оно очень интересное.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['building', 'interesting', 'reply'],
  },

  en_s1u5_n2_020_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What is that building?' }],
    options: [
      'It’s a museum.',
      'It museum does.',
      'It’s why museum.',
      'Museum it are.',
    ],
    answer: 'It’s a museum.',
    answerTranslation: L(
      '박물관이에요.',
      'Bu muzey.',
      'It’s a museum.',
      'Это музей.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['museum', 'what', 'dialog'],
  },

  // ===========================================================
  // Lesson 2 · What / Where / When / Why
  // ===========================================================

  en_s1u5_n2_021_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Where is the museum?',
    audioText: 'Where is the museum?',
    answerTranslation: L(
      '박물관은 어디에 있어요?',
      'Muzey qayerda?',
      'Where is the museum?',
      'Где находится музей?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['wh-questions', 'where', 'museum'],
  },

  en_s1u5_n2_022_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'office',
    choices: [
      { text: 'stadium', label: '🏟️', emoji: '🏟️', imageUrl: '' },
      { text: 'office', label: '🏢', emoji: '🏢', imageUrl: '' },
      { text: 'restaurant', label: '🍽️', emoji: '🍽️', imageUrl: '' },
      { text: 'house', label: '🏠', emoji: '🏠', imageUrl: '' },
    ],
    answerTranslation: L('사무실', 'ofis', 'office', 'офис'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['office', 'buildings'],
  },

  en_s1u5_n2_023_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'what',
        native: 'nima',
        nativeI18n: L('무엇', 'nima', 'what', 'что'),
      },
      {
        text: 'where',
        native: 'qayerda',
        nativeI18n: L('어디', 'qayerda', 'where', 'где'),
      },
      {
        text: 'when',
        native: 'qachon',
        nativeI18n: L('언제', 'qachon', 'when', 'когда'),
      },
      {
        text: 'why',
        native: 'nega',
        nativeI18n: L('왜', 'nega', 'why', 'почему'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['question-words', 'matching'],
  },

  en_s1u5_n2_024_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['Where', 'is', 'the', 'building', 'do', 'why', 'museum'],
    answer: 'Where is the building',
    answerTranslation: L(
      '그 건물은 어디에 있어요?',
      'Bino qayerda?',
      'Where is the building?',
      'Где находится здание?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['wh-questions', 'where'],
  },

  en_s1u5_n2_025_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['When', 'does', 'the', 'museum', 'open', 'why', 'is'],
    answer: 'When does the museum open',
    audioText: 'When does the museum open?',
    answerTranslation: L(
      '박물관은 언제 문을 열어요?',
      'Muzey qachon ochiladi?',
      'When does the museum open?',
      'Когда открывается музей?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['wh-questions', 'when', 'museum'],
  },

  en_s1u5_n2_026_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'what',
        native: 'nima',
        nativeI18n: L('무엇', 'nima', 'what', 'что'),
      },
      {
        text: 'where',
        native: 'qayerda',
        nativeI18n: L('어디', 'qayerda', 'where', 'где'),
      },
      {
        text: 'when',
        native: 'qachon',
        nativeI18n: L('언제', 'qachon', 'when', 'когда'),
      },
      {
        text: 'why',
        native: 'nega',
        nativeI18n: L('왜', 'nega', 'why', 'почему'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['question-words', 'listening'],
  },

  en_s1u5_n2_027_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ do you like it?',
    blankAnswers: ['Why'],
    options: ['Why', 'When', 'Where', 'What'],
    answer: 'Why',
    answerTranslation: L(
      '왜 그것을 좋아해요?',
      'Nega u sizga yoqadi?',
      'Why do you like it?',
      'Почему вам это нравится?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['wh-questions', 'why'],
  },

  en_s1u5_n2_028_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Where is it?',
    options: ['It', 'is', 'in', 'Prague', 'when', 'does'],
    answer: 'It is in Prague',
    answerTranslation: L(
      '프라하에 있어요.',
      'U Pragada.',
      'It is in Prague.',
      'Оно находится в Праге.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['where', 'reply'],
  },

  en_s1u5_n2_029_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Why do you like this building?',
    audioText: 'Why do you like this building?',
    answerI18n: L(
      '왜 이 건물을 좋아해요',
      'Nega bu bino sizga yoqadi',
      'Why do you like this building',
      'Почему вам нравится это здание',
    ),
    options: ['Why', 'do', 'you', 'like', 'this', 'building', 'when'],
    optionsI18n: {
      ko: ['왜', '이', '건물을', '좋아해요', '언제'],
      uz: ['Nega', 'bu', 'bino', 'sizga', 'yoqadi', 'qachon'],
      en: ['Why', 'do', 'you', 'like', 'this', 'building', 'when'],
      ru: ['Почему', 'вам', 'нравится', 'это', 'здание', 'когда'],
    },
    answerTranslation: L(
      '왜 이 건물을 좋아해요?',
      'Nega bu bino sizga yoqadi?',
      'Why do you like this building?',
      'Почему вам нравится это здание?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['wh-questions', 'why', 'sentence-builder'],
  },

  en_s1u5_n2_030_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'office',
    choices: [
      { text: 'office', label: '🏢', emoji: '🏢', imageUrl: '' },
      { text: 'stadium', label: '🏟️', emoji: '🏟️', imageUrl: '' },
      { text: 'restaurant', label: '🍽️', emoji: '🍽️', imageUrl: '' },
      { text: 'palace', label: '🏰', emoji: '🏰', imageUrl: '' },
    ],
    answerTranslation: L('사무실', 'ofis', 'office', 'офис'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['office', 'buildings'],
  },

  en_s1u5_n2_031_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['What', 'do', 'people', 'do', 'there', 'where', 'is'],
    answer: 'What do people do there',
    answerTranslation: L(
      '사람들은 거기에서 무엇을 해요?',
      'Odamlar u yerda nima qiladi?',
      'What do people do there?',
      'Что люди там делают?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['wh-questions', 'what'],
  },

  en_s1u5_n2_032_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'modern',
        native: 'zamonaviy',
        nativeI18n: L('현대적인', 'zamonaviy', 'modern', 'современный'),
      },
      {
        text: 'old',
        native: 'eski',
        nativeI18n: L('오래된', 'eski', 'old', 'старый'),
      },
      {
        text: 'beautiful',
        native: 'chiroyli',
        nativeI18n: L('아름다운', 'chiroyli', 'beautiful', 'красивый'),
      },
      {
        text: 'unusual',
        native: 'g‘ayrioddiy',
        nativeI18n: L('특이한', 'g‘ayrioddiy', 'unusual', 'необычный'),
      },
      {
        text: 'interesting',
        native: 'qiziqarli',
        nativeI18n: L('흥미로운', 'qiziqarli', 'interesting', 'интересный'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['adjectives', 'review', 'matching'],
  },

  en_s1u5_n2_033_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ is the restaurant open?',
    blankAnswers: ['When'],
    options: ['When', 'Why', 'Where', 'What'],
    answer: 'When',
    answerTranslation: L(
      '그 식당은 언제 열려 있어요?',
      'Restoran qachon ochiq?',
      'When is the restaurant open?',
      'Когда открыт ресторан?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['wh-questions', 'when'],
  },

  en_s1u5_n2_034_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'open',
        native: 'ochiq',
        nativeI18n: L('열려 있는', 'ochiq', 'open', 'открытый'),
      },
      {
        text: 'closed',
        native: 'yopiq',
        nativeI18n: L('닫혀 있는', 'yopiq', 'closed', 'закрытый'),
      },
      {
        text: 'museum',
        native: 'muzey',
        nativeI18n: L('박물관', 'muzey', 'museum', 'музей'),
      },
      {
        text: 'stadium',
        native: 'stadion',
        nativeI18n: L('경기장', 'stadion', 'stadium', 'стадион'),
      },
      {
        text: 'palace',
        native: 'saroy',
        nativeI18n: L('궁전', 'saroy', 'palace', 'дворец'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['buildings', 'opening-times', 'listening'],
  },

  en_s1u5_n2_035_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Why do you like it?',
    audioText: 'Why do you like it?',
    answerTranslation: L(
      '왜 그것을 좋아해요?',
      'Nega u sizga yoqadi?',
      'Why do you like it?',
      'Почему вам это нравится?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['wh-questions', 'why'],
  },

  en_s1u5_n2_036_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['What', 'does', 'your', 'partner', 'do', 'where', 'is'],
    answer: 'What does your partner do',
    audioText: 'What does your partner do?',
    answerTranslation: L(
      '파트너는 무슨 일을 해요?',
      'Sherigingiz nima ish qiladi?',
      'What does your partner do?',
      'Чем занимается ваш партнёр?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['wh-questions', 'what', 'does'],
  },

  en_s1u5_n2_037_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Where does your family live?',
    audioText: 'Where does your family live?',
    answerI18n: L(
      '가족은 어디에 살아요',
      'Oilangiz qayerda yashaydi',
      'Where does your family live',
      'Где живёт ваша семья',
    ),
    options: ['Where', 'does', 'your', 'family', 'live', 'when', 'do'],
    optionsI18n: {
      ko: ['가족은', '어디에', '살아요', '언제', '가요'],
      uz: ['Oilangiz', 'qayerda', 'yashaydi', 'qachon', 'boradi'],
      en: ['Where', 'does', 'your', 'family', 'live', 'when', 'go'],
      ru: ['Где', 'живёт', 'ваша', 'семья', 'когда', 'идёт'],
    },
    answerTranslation: L(
      '가족은 어디에 살아요?',
      'Oilangiz qayerda yashaydi?',
      'Where does your family live?',
      'Где живёт ваша семья?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['wh-questions', 'where', 'sentence-builder'],
  },

  en_s1u5_n2_038_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Why do you like this museum?',
    options: ['Because', 'it', 'is', 'interesting', 'where', 'does'],
    answer: 'Because it is interesting',
    answerTranslation: L(
      '흥미롭기 때문이에요.',
      'Chunki u qiziqarli.',
      'Because it is interesting.',
      'Потому что он интересный.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['why', 'because', 'museum'],
  },

  en_s1u5_n2_039_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'restaurant',
    choices: [
      { text: 'museum', label: '🏛️', emoji: '🏛️', imageUrl: '' },
      { text: 'restaurant', label: '🍽️', emoji: '🍽️', imageUrl: '' },
      { text: 'office', label: '🏢', emoji: '🏢', imageUrl: '' },
      { text: 'stadium', label: '🏟️', emoji: '🏟️', imageUrl: '' },
    ],
    answerTranslation: L('식당', 'restoran', 'restaurant', 'ресторан'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['restaurant', 'buildings'],
  },

  en_s1u5_n2_040_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'When is the museum open?' }],
    options: [
      'From ten to six.',
      'Because it is interesting.',
      'It is in Prague.',
      'It is a museum.',
    ],
    answer: 'From ten to six.',
    answerTranslation: L(
      '10시부터 6시까지요.',
      'Soat o‘ndan oltigacha.',
      'From ten to six.',
      'С десяти до шести.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['when', 'opening-times', 'dialog'],
  },

  // ===========================================================
  // Lesson 3 · Talk about a building you like
  // ===========================================================

  en_s1u5_n2_041_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I like this building because it is unusual.',
    audioText: 'I like this building because it is unusual.',
    answerTranslation: L(
      '이 건물은 특이해서 좋아해요.',
      'Menga bu bino yoqadi, chunki u g‘ayrioddiy.',
      'I like this building because it is unusual.',
      'Мне нравится это здание, потому что оно необычное.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['building', 'unusual', 'because'],
  },

  en_s1u5_n2_042_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'stadium',
    choices: [
      { text: 'stadium', label: '🏟️', emoji: '🏟️', imageUrl: '' },
      { text: 'palace', label: '🏰', emoji: '🏰', imageUrl: '' },
      { text: 'office', label: '🏢', emoji: '🏢', imageUrl: '' },
      { text: 'restaurant', label: '🍽️', emoji: '🍽️', imageUrl: '' },
    ],
    answerTranslation: L('경기장', 'stadion', 'stadium', 'стадион'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['stadium', 'buildings'],
  },

  en_s1u5_n2_043_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'beautiful',
        native: 'chiroyli',
        nativeI18n: L('아름다운', 'chiroyli', 'beautiful', 'красивый'),
      },
      {
        text: 'big',
        native: 'katta',
        nativeI18n: L('큰', 'katta', 'big', 'большой'),
      },
      {
        text: 'modern',
        native: 'zamonaviy',
        nativeI18n: L('현대적인', 'zamonaviy', 'modern', 'современный'),
      },
      {
        text: 'different',
        native: 'boshqacha',
        nativeI18n: L('다른', 'boshqacha', 'different', 'другой'),
      },
      {
        text: 'unusual',
        native: 'g‘ayrioddiy',
        nativeI18n: L('특이한', 'g‘ayrioddiy', 'unusual', 'необычный'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['adjectives', 'matching'],
  },

  en_s1u5_n2_044_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'The',
      'palace',
      'is',
      'old',
      'and',
      'beautiful',
      'modern',
      'does',
    ],
    answer: 'The palace is old and beautiful',
    answerTranslation: L(
      '그 궁전은 오래되고 아름다워요.',
      'Saroy eski va chiroyli.',
      'The palace is old and beautiful.',
      'Дворец старый и красивый.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['palace', 'old', 'beautiful'],
  },

  en_s1u5_n2_045_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'The',
      'restaurant',
      'is',
      'in',
      'a',
      'modern',
      'building',
      'museum',
    ],
    answer: 'The restaurant is in a modern building',
    audioText: 'The restaurant is in a modern building.',
    answerTranslation: L(
      '그 식당은 현대적인 건물 안에 있어요.',
      'Restoran zamonaviy binoda joylashgan.',
      'The restaurant is in a modern building.',
      'Ресторан находится в современном здании.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['restaurant', 'modern', 'building'],
  },

  en_s1u5_n2_046_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'museum',
        native: 'muzey',
        nativeI18n: L('박물관', 'muzey', 'museum', 'музей'),
      },
      {
        text: 'palace',
        native: 'saroy',
        nativeI18n: L('궁전', 'saroy', 'palace', 'дворец'),
      },
      {
        text: 'stadium',
        native: 'stadion',
        nativeI18n: L('경기장', 'stadion', 'stadium', 'стадион'),
      },
      {
        text: 'office',
        native: 'ofis',
        nativeI18n: L('사무실', 'ofis', 'office', 'офис'),
      },
      {
        text: 'restaurant',
        native: 'restoran',
        nativeI18n: L('식당', 'restoran', 'restaurant', 'ресторан'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['buildings', 'places', 'listening'],
  },

  en_s1u5_n2_047_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What building do you like?',
    options: ['I', 'like', 'the', 'museum', 'why', 'does'],
    answer: 'I like the museum',
    answerTranslation: L(
      '저는 그 박물관을 좋아해요.',
      'Menga muzey yoqadi.',
      'I like the museum.',
      'Мне нравится музей.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['building', 'museum', 'reply'],
  },

  en_s1u5_n2_048_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'It is interesting because the design is unusual.',
    audioText: 'It is interesting because the design is unusual.',
    answerI18n: L(
      '디자인이 특이해서 흥미로워요',
      'Dizayni g‘ayrioddiy bo‘lgani uchun qiziqarli',
      'It is interesting because the design is unusual',
      'Это интересно, потому что дизайн необычный',
    ),
    options: [
      'It',
      'is',
      'interesting',
      'because',
      'the',
      'design',
      'is',
      'unusual',
      'modern',
    ],
    optionsI18n: {
      ko: ['디자인이', '특이해서', '흥미로워요', '현대적이라서'],
      uz: [
        'Dizayni',
        'g‘ayrioddiy',
        'bo‘lgani',
        'uchun',
        'qiziqarli',
        'zamonaviy',
      ],
      en: [
        'It',
        'is',
        'interesting',
        'because',
        'the',
        'design',
        'is',
        'unusual',
        'modern',
      ],
      ru: [
        'Это',
        'интересно',
        'потому что',
        'дизайн',
        'необычный',
        'современный',
      ],
    },
    answerTranslation: L(
      '디자인이 특이해서 흥미로워요.',
      'Dizayni g‘ayrioddiy bo‘lgani uchun qiziqarli.',
      'It is interesting because the design is unusual.',
      'Это интересно, потому что дизайн необычный.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['interesting', 'design', 'unusual', 'because'],
  },

  en_s1u5_n2_049_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The house is very ___ because it looks different.',
    blankAnswers: ['unusual'],
    options: ['unusual', 'when', 'museum', 'open'],
    answer: 'unusual',
    answerTranslation: L(
      '그 집은 모습이 달라서 아주 특이해요.',
      'Uy boshqacha ko‘ringani uchun juda g‘ayrioddiy.',
      'The house is very unusual because it looks different.',
      'Дом очень необычный, потому что выглядит иначе.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unusual', 'different'],
  },

  en_s1u5_n2_050_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'museum',
    choices: [
      { text: 'museum', label: '🏛️', emoji: '🏛️', imageUrl: '' },
      { text: 'office', label: '🏢', emoji: '🏢', imageUrl: '' },
      { text: 'stadium', label: '🏟️', emoji: '🏟️', imageUrl: '' },
      { text: 'restaurant', label: '🍽️', emoji: '🍽️', imageUrl: '' },
    ],
    answerTranslation: L('박물관', 'muzey', 'museum', 'музей'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['museum', 'buildings'],
  },

  en_s1u5_n2_051_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'The',
      'stadium',
      'changes',
      'colour',
      'at',
      'night',
      'museum',
      'does',
    ],
    answer: 'The stadium changes colour at night',
    answerTranslation: L(
      '그 경기장은 밤에 색이 바뀌어요.',
      'Stadion tunda rangini o‘zgartiradi.',
      'The stadium changes colour at night.',
      'Стадион меняет цвет ночью.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['stadium', 'colour', 'building-description'],
  },

  en_s1u5_n2_052_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'when',
        native: 'qachon',
        nativeI18n: L('언제', 'qachon', 'when', 'когда'),
      },
      {
        text: 'why',
        native: 'nega',
        nativeI18n: L('왜', 'nega', 'why', 'почему'),
      },
      {
        text: 'design',
        native: 'dizayn',
        nativeI18n: L('디자인', 'dizayn', 'design', 'дизайн'),
      },
      {
        text: 'museum',
        native: 'muzey',
        nativeI18n: L('박물관', 'muzey', 'museum', 'музей'),
      },
      {
        text: 'palace',
        native: 'saroy',
        nativeI18n: L('궁전', 'saroy', 'palace', 'дворец'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['review', 'matching'],
  },

  en_s1u5_n2_053_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['The', 'office', 'building', 'looks', 'modern', 'museum', 'why'],
    answer: 'The office building looks modern',
    audioText: 'The office building looks modern.',
    answerTranslation: L(
      '그 사무실 건물은 현대적으로 보여요.',
      'Ofis binosi zamonaviy ko‘rinadi.',
      'The office building looks modern.',
      'Офисное здание выглядит современно.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['office', 'building', 'modern'],
  },

  en_s1u5_n2_054_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'different',
        native: 'boshqacha',
        nativeI18n: L('다른', 'boshqacha', 'different', 'другой'),
      },
      {
        text: 'exciting',
        native: 'hayajonli',
        nativeI18n: L('흥미진진한', 'hayajonli', 'exciting', 'захватывающий'),
      },
      {
        text: 'interesting',
        native: 'qiziqarli',
        nativeI18n: L('흥미로운', 'qiziqarli', 'interesting', 'интересный'),
      },
      {
        text: 'modern',
        native: 'zamonaviy',
        nativeI18n: L('현대적인', 'zamonaviy', 'modern', 'современный'),
      },
      {
        text: 'unusual',
        native: 'g‘ayrioddiy',
        nativeI18n: L('특이한', 'g‘ayrioddiy', 'unusual', 'необычный'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['adjectives', 'listening'],
  },

  en_s1u5_n2_055_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The museum is open from ten to six.',
    audioText: 'The museum is open from ten to six.',
    answerTranslation: L(
      '박물관은 10시부터 6시까지 열려 있어요.',
      'Muzey soat o‘ndan oltigacha ochiq.',
      'The museum is open from ten to six.',
      'Музей открыт с десяти до шести.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['museum', 'open', 'time'],
  },

  en_s1u5_n2_056_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'I like the palace because it is beautiful.',
    audioText: 'I like the palace because it is beautiful.',
    answerI18n: L(
      '그 궁전은 아름다워서 좋아해요',
      'Menga saroy yoqadi, chunki u chiroyli',
      'I like the palace because it is beautiful',
      'Мне нравится дворец, потому что он красивый',
    ),
    options: [
      'I',
      'like',
      'the',
      'palace',
      'because',
      'it',
      'is',
      'beautiful',
      'modern',
    ],
    optionsI18n: {
      ko: ['그', '궁전은', '아름다워서', '좋아해요', '현대적이라서'],
      uz: ['Menga', 'saroy', 'yoqadi', 'chunki', 'u', 'chiroyli', 'zamonaviy'],
      en: [
        'I',
        'like',
        'the',
        'palace',
        'because',
        'it',
        'is',
        'beautiful',
        'modern',
      ],
      ru: [
        'Мне',
        'нравится',
        'дворец',
        'потому что',
        'он',
        'красивый',
        'современный',
      ],
    },
    answerTranslation: L(
      '그 궁전은 아름다워서 좋아해요.',
      'Menga saroy yoqadi, chunki u chiroyli.',
      'I like the palace because it is beautiful.',
      'Мне нравится дворец, потому что он красивый.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['palace', 'beautiful', 'because'],
  },

  en_s1u5_n2_057_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'office',
    choices: [
      { text: 'palace', label: '🏰', emoji: '🏰', imageUrl: '' },
      { text: 'office', label: '🏢', emoji: '🏢', imageUrl: '' },
      { text: 'stadium', label: '🏟️', emoji: '🏟️', imageUrl: '' },
      { text: 'restaurant', label: '🍽️', emoji: '🍽️', imageUrl: '' },
    ],
    answerTranslation: L('사무실', 'ofis', 'office', 'офис'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['office', 'buildings'],
  },

  en_s1u5_n2_058_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The museum is ___ in January.',
    blankAnswers: ['closed'],
    options: ['closed', 'interesting', 'stadium', 'why'],
    answer: 'closed',
    answerTranslation: L(
      '박물관은 1월에 문을 닫아요.',
      'Muzey yanvar oyida yopiq.',
      'The museum is closed in January.',
      'Музей закрыт в январе.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['museum', 'closed'],
  },

  en_s1u5_n2_059_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['Why', 'is', 'the', 'museum', 'closed', 'today', 'when', 'do'],
    answer: 'Why is the museum closed today',
    answerTranslation: L(
      '박물관은 오늘 왜 문을 닫았어요?',
      'Muzey bugun nega yopiq?',
      'Why is the museum closed today?',
      'Почему музей сегодня закрыт?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['why', 'museum', 'closed'],
  },

  en_s1u5_n2_060_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'When is the museum open?',
    options: ['It', 'is', 'open', 'from', 'ten', 'to', 'six', 'why'],
    answer: 'It is open from ten to six',
    answerTranslation: L(
      '10시부터 6시까지 열려 있어요.',
      'U soat o‘ndan oltigacha ochiq.',
      'It is open from ten to six.',
      'Он открыт с десяти до шести.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['when', 'museum', 'open', 'reply'],
  },

  // ===========================================================
  // Lesson 4 · Wh-questions + listening chunks + review
  // ===========================================================

  en_s1u5_n2_061_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'What music do you like?',
    audioText: 'What music do you like?',
    answerTranslation: L(
      '어떤 음악을 좋아해요?',
      'Qanday musiqa sizga yoqadi?',
      'What music do you like?',
      'Какую музыку вы любите?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['chunks', 'what', 'listening'],
  },

  en_s1u5_n2_062_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'palace',
    choices: [
      { text: 'palace', label: '🏰', emoji: '🏰', imageUrl: '' },
      { text: 'stadium', label: '🏟️', emoji: '🏟️', imageUrl: '' },
      { text: 'office', label: '🏢', emoji: '🏢', imageUrl: '' },
      { text: 'restaurant', label: '🍽️', emoji: '🍽️', imageUrl: '' },
    ],
    answerTranslation: L('궁전', 'saroy', 'palace', 'дворец'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['palace', 'review'],
  },

  en_s1u5_n2_063_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'architecture',
        native: 'arxitektura',
        nativeI18n: L('건축', 'arxitektura', 'architecture', 'архитектура'),
      },
      {
        text: 'design',
        native: 'dizayn',
        nativeI18n: L('디자인', 'dizayn', 'design', 'дизайн'),
      },
      {
        text: 'modern',
        native: 'zamonaviy',
        nativeI18n: L('현대적인', 'zamonaviy', 'modern', 'современный'),
      },
      {
        text: 'interesting',
        native: 'qiziqarli',
        nativeI18n: L('흥미로운', 'qiziqarli', 'interesting', 'интересный'),
      },
      {
        text: 'unusual',
        native: 'g‘ayrioddiy',
        nativeI18n: L('특이한', 'g‘ayrioddiy', 'unusual', 'необычный'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['architecture', 'review', 'matching'],
  },

  en_s1u5_n2_064_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['Where', 'do', 'you', 'go', 'on', 'holiday', 'when', 'does'],
    answer: 'Where do you go on holiday',
    answerTranslation: L(
      '휴가 때 어디에 가요?',
      'Ta’tilda qayerga borasiz?',
      'Where do you go on holiday?',
      'Куда вы ездите в отпуск?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['wh-questions', 'where', 'review'],
  },

  en_s1u5_n2_065_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['What', 'clothes', 'do', 'you', 'wear', 'at', 'work', 'why'],
    answer: 'What clothes do you wear at work',
    audioText: 'What clothes do you wear at work?',
    answerTranslation: L(
      '직장에서 어떤 옷을 입어요?',
      'Ishda qanday kiyim kiyasiz?',
      'What clothes do you wear at work?',
      'Какую одежду вы носите на работе?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['wh-questions', 'what', 'clothes', 'review'],
  },

  en_s1u5_n2_066_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'beautiful',
        native: 'chiroyli',
        nativeI18n: L('아름다운', 'chiroyli', 'beautiful', 'красивый'),
      },
      {
        text: 'different',
        native: 'boshqacha',
        nativeI18n: L('다른', 'boshqacha', 'different', 'другой'),
      },
      {
        text: 'exciting',
        native: 'hayajonli',
        nativeI18n: L('흥미진진한', 'hayajonli', 'exciting', 'захватывающий'),
      },
      {
        text: 'interesting',
        native: 'qiziqarli',
        nativeI18n: L('흥미로운', 'qiziqarli', 'interesting', 'интересный'),
      },
      {
        text: 'modern',
        native: 'zamonaviy',
        nativeI18n: L('현대적인', 'zamonaviy', 'modern', 'современный'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['adjectives', 'review', 'listening'],
  },

  en_s1u5_n2_067_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ is your favourite building?',
    blankAnswers: ['What'],
    options: ['What', 'When', 'Why', 'Where'],
    answer: 'What',
    answerTranslation: L(
      '가장 좋아하는 건물은 무엇이에요?',
      'Sevimli binoyingiz qaysi?',
      'What is your favourite building?',
      'Какое ваше любимое здание?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['wh-questions', 'what'],
  },

  en_s1u5_n2_068_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Why do people visit this museum?',
    audioText: 'Why do people visit this museum?',
    answerI18n: L(
      '사람들은 왜 이 박물관을 방문해요',
      'Odamlar nega bu muzeyga tashrif buyuradi',
      'Why do people visit this museum',
      'Почему люди посещают этот музей',
    ),
    options: ['Why', 'do', 'people', 'visit', 'this', 'museum', 'where'],
    optionsI18n: {
      ko: ['사람들은', '왜', '이', '박물관을', '방문해요', '어디에서'],
      uz: [
        'Odamlar',
        'nega',
        'bu',
        'muzeyga',
        'tashrif',
        'buyuradi',
        'qayerda',
      ],
      en: ['Why', 'do', 'people', 'visit', 'this', 'museum', 'where'],
      ru: ['Почему', 'люди', 'посещают', 'этот', 'музей', 'где'],
    },
    answerTranslation: L(
      '사람들은 왜 이 박물관을 방문해요?',
      'Odamlar nega bu muzeyga tashrif buyuradi?',
      'Why do people visit this museum?',
      'Почему люди посещают этот музей?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['why', 'museum', 'sentence-builder'],
  },

  en_s1u5_n2_069_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Where is the stadium?',
    options: ['It', 'is', 'near', 'the', 'station', 'why', 'open'],
    answer: 'It is near the station',
    answerTranslation: L(
      '역 근처에 있어요.',
      'U vokzal yaqinida.',
      'It is near the station.',
      'Он находится рядом со станцией.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['where', 'stadium', 'reply'],
  },

  en_s1u5_n2_070_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'restaurant',
    choices: [
      { text: 'restaurant', label: '🍽️', emoji: '🍽️', imageUrl: '' },
      { text: 'museum', label: '🏛️', emoji: '🏛️', imageUrl: '' },
      { text: 'office', label: '🏢', emoji: '🏢', imageUrl: '' },
      { text: 'stadium', label: '🏟️', emoji: '🏟️', imageUrl: '' },
    ],
    answerTranslation: L('식당', 'restoran', 'restaurant', 'ресторан'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['restaurant', 'review'],
  },

  en_s1u5_n2_071_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['When', 'does', 'the', 'restaurant', 'close', 'why', 'is'],
    answer: 'When does the restaurant close',
    answerTranslation: L(
      '그 식당은 언제 문을 닫아요?',
      'Restoran qachon yopiladi?',
      'When does the restaurant close?',
      'Когда закрывается ресторан?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['when', 'restaurant', 'wh-questions'],
  },

  en_s1u5_n2_072_word_matching: {
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
        text: 'stadium',
        native: 'stadion',
        nativeI18n: L('경기장', 'stadion', 'stadium', 'стадион'),
      },
      {
        text: 'palace',
        native: 'saroy',
        nativeI18n: L('궁전', 'saroy', 'palace', 'дворец'),
      },
      {
        text: 'office',
        native: 'ofis',
        nativeI18n: L('사무실', 'ofis', 'office', 'офис'),
      },
      {
        text: 'restaurant',
        native: 'restoran',
        nativeI18n: L('식당', 'restoran', 'restaurant', 'ресторан'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['buildings', 'review', 'matching'],
  },

  en_s1u5_n2_073_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'what',
        native: 'nima',
        nativeI18n: L('무엇', 'nima', 'what', 'что'),
      },
      {
        text: 'where',
        native: 'qayerda',
        nativeI18n: L('어디', 'qayerda', 'where', 'где'),
      },
      {
        text: 'when',
        native: 'qachon',
        nativeI18n: L('언제', 'qachon', 'when', 'когда'),
      },
      {
        text: 'why',
        native: 'nega',
        nativeI18n: L('왜', 'nega', 'why', 'почему'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['question-words', 'review', 'listening'],
  },

  en_s1u5_n2_074_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['Why', 'do', 'you', 'study', 'English', 'where', 'does'],
    answer: 'Why do you study English',
    audioText: 'Why do you study English?',
    answerTranslation: L(
      '왜 영어를 공부해요?',
      'Nega ingliz tilini o‘rganasiz?',
      'Why do you study English?',
      'Почему вы изучаете английский?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['why', 'wh-questions', 'review'],
  },

  en_s1u5_n2_075_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'This building looks amazing.',
    audioText: 'This building looks amazing.',
    answerTranslation: L(
      '이 건물은 정말 멋져 보여요.',
      'Bu bino juda ajoyib ko‘rinadi.',
      'This building looks amazing.',
      'Это здание выглядит потрясающе.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['building', 'architecture', 'speaking'],
  },

  en_s1u5_n2_076_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'The hotel has a swimming pool and a restaurant.',
    audioText: 'The hotel has a swimming pool and a restaurant.',
    answerI18n: L(
      '그 호텔에는 수영장과 식당이 있어요',
      'Mehmonxonada basseyn va restoran bor',
      'The hotel has a swimming pool and a restaurant',
      'В отеле есть бассейн и ресторан',
    ),
    options: [
      'The',
      'hotel',
      'has',
      'a',
      'swimming',
      'pool',
      'and',
      'a',
      'restaurant',
      'museum',
    ],
    optionsI18n: {
      ko: ['그', '호텔에는', '수영장과', '식당이', '있어요', '박물관이'],
      uz: ['Mehmonxonada', 'basseyn', 'va', 'restoran', 'bor', 'muzey'],
      en: [
        'The',
        'hotel',
        'has',
        'a',
        'swimming',
        'pool',
        'and',
        'a',
        'restaurant',
        'museum',
      ],
      ru: ['В', 'отеле', 'есть', 'бассейн', 'и', 'ресторан', 'музей'],
    },
    answerTranslation: L(
      '그 호텔에는 수영장과 식당이 있어요.',
      'Mehmonxonada basseyn va restoran bor.',
      'The hotel has a swimming pool and a restaurant.',
      'В отеле есть бассейн и ресторан.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['hotel', 'restaurant', 'listening-chunks'],
  },

  en_s1u5_n2_077_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'hotel',
    choices: [
      { text: 'hotel', label: '🏨', emoji: '🏨', imageUrl: '' },
      { text: 'stadium', label: '🏟️', emoji: '🏟️', imageUrl: '' },
      { text: 'office', label: '🏢', emoji: '🏢', imageUrl: '' },
      { text: 'restaurant', label: '🍽️', emoji: '🍽️', imageUrl: '' },
    ],
    answerTranslation: L('호텔', 'mehmonxona', 'hotel', 'отель'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['hotel', 'review'],
  },

  en_s1u5_n2_078_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'The palace is ___ because it has many beautiful paintings.',
    blankAnswers: ['interesting'],
    options: ['interesting', 'when', 'closed', 'stadium'],
    answer: 'interesting',
    answerTranslation: L(
      '그 궁전은 아름다운 그림이 많아서 흥미로워요.',
      'Saroyda ko‘plab chiroyli rasmlar bo‘lgani uchun u qiziqarli.',
      'The palace is interesting because it has many beautiful paintings.',
      'Дворец интересный, потому что в нём много красивых картин.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['palace', 'interesting', 'because'],
  },

  en_s1u5_n2_079_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'I',
      'like',
      'this',
      'building',
      'because',
      'the',
      'design',
      'is',
      'different',
      'when',
    ],
    answer: 'I like this building because the design is different',
    answerTranslation: L(
      '디자인이 독특해서 이 건물이 좋아요.',
      'Menga bu bino yoqadi, chunki uning dizayni boshqacha.',
      'I like this building because the design is different.',
      'Мне нравится это здание, потому что его дизайн необычный.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['building', 'design', 'different', 'because'],
  },

  en_s1u5_n2_080_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Why do you like it?',
    options: ['Because', 'it', 'looks', 'amazing', 'where', 'does'],
    answer: 'Because it looks amazing',
    answerTranslation: L(
      '정말 멋져 보이기 때문이에요.',
      'Chunki u juda ajoyib ko‘rinadi.',
      'Because it looks amazing.',
      'Потому что оно выглядит потрясающе.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['why', 'because', 'building', 'final'],
  },
};

export const EN_S1_UNIT5_NODE2 = {
  title: L(
    '놀라운 건축물',
    'Ajoyib arxitektura',
    'Amazing architecture',
    'Удивительная архитектура',
  ),
  section: 1,
  unit: 5,
  order: 2,
  isActive: true,

  lessons: [
    {
      title: L(
        '건물 묘사하기',
        'Binolarni tasvirlash',
        'Describe buildings',
        'Описываем здания',
      ),
      description: L(
        'modern, unusual, different, exciting, interesting 같은 형용사로 건물을 묘사해요.',
        'modern, unusual, different, exciting va interesting kabi sifatlar bilan binolarni tasvirlaysiz.',
        'Describe buildings with adjectives such as modern, unusual, different, exciting and interesting.',
        'Описываем здания с помощью modern, unusual, different, exciting и interesting.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 1,
      questions: [
        'en_s1u5_n2_001_speaking',
        'en_s1u5_n2_002_image_choice',
        'en_s1u5_n2_003_word_matching',
        'en_s1u5_n2_004_translate_builder',
        'en_s1u5_n2_005_word_arrange',
        'en_s1u5_n2_006_audio_match',
        'en_s1u5_n2_007_image_choice',
        'en_s1u5_n2_008_fill_in_blank',
        'en_s1u5_n2_009_sentence_builder',
        'en_s1u5_n2_010_reply_builder',
        'en_s1u5_n2_011_translate_builder',
        'en_s1u5_n2_012_word_matching',
        'en_s1u5_n2_013_audio_match',
        'en_s1u5_n2_014_image_choice',
        'en_s1u5_n2_015_speaking',
        'en_s1u5_n2_016_fill_in_blank',
        'en_s1u5_n2_017_translate_builder',
        'en_s1u5_n2_018_word_arrange',
        'en_s1u5_n2_019_reply_builder',
        'en_s1u5_n2_020_dialog_complete',
      ],
    },

    {
      title: L(
        '무엇, 어디, 언제, 왜',
        'Nima, qayerda, qachon, nega',
        'What, where, when and why',
        'Что, где, когда и почему',
      ),
      description: L(
        'What, Where, When, Why와 is, are, do, does를 사용해 기본 Wh- 의문문을 만들어요.',
        'What, Where, When, Why hamda is, are, do, does yordamida Wh-savollar tuzasiz.',
        'Build basic Wh- questions with What, Where, When, Why, is, are, do and does.',
        'Строим основные Wh-вопросы с What, Where, When, Why, is, are, do и does.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 2,
      questions: [
        'en_s1u5_n2_021_speaking',
        'en_s1u5_n2_022_image_choice',
        'en_s1u5_n2_023_word_matching',
        'en_s1u5_n2_024_translate_builder',
        'en_s1u5_n2_025_word_arrange',
        'en_s1u5_n2_026_audio_match',
        'en_s1u5_n2_027_fill_in_blank',
        'en_s1u5_n2_028_reply_builder',
        'en_s1u5_n2_029_sentence_builder',
        'en_s1u5_n2_030_image_choice',
        'en_s1u5_n2_031_translate_builder',
        'en_s1u5_n2_032_word_matching',
        'en_s1u5_n2_033_fill_in_blank',
        'en_s1u5_n2_034_audio_match',
        'en_s1u5_n2_035_speaking',
        'en_s1u5_n2_036_word_arrange',
        'en_s1u5_n2_037_sentence_builder',
        'en_s1u5_n2_038_reply_builder',
        'en_s1u5_n2_039_image_choice',
        'en_s1u5_n2_040_dialog_complete',
      ],
    },

    {
      title: L(
        '좋아하는 건물 말하기',
        'Yoqtirgan bino haqida gapirish',
        'Talk about a building you like',
        'Говорим о любимом здании',
      ),
      description: L(
        '건물의 위치, 모습, 이용 시간과 좋아하는 이유를 묻고 답해요.',
        'Binoning joylashuvi, ko‘rinishi, ish vaqti va uni nima uchun yoqtirishingiz haqida savol berib javob berasiz.',
        'Ask and answer about a building’s location, appearance, opening times and why you like it.',
        'Спрашиваем и отвечаем о местоположении, внешнем виде, времени работы здания и причинах, почему оно нравится.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 3,
      questions: [
        'en_s1u5_n2_041_speaking',
        'en_s1u5_n2_042_image_choice',
        'en_s1u5_n2_043_word_matching',
        'en_s1u5_n2_044_translate_builder',
        'en_s1u5_n2_045_word_arrange',
        'en_s1u5_n2_046_audio_match',
        'en_s1u5_n2_047_reply_builder',
        'en_s1u5_n2_048_sentence_builder',
        'en_s1u5_n2_049_fill_in_blank',
        'en_s1u5_n2_050_image_choice',
        'en_s1u5_n2_051_translate_builder',
        'en_s1u5_n2_052_word_matching',
        'en_s1u5_n2_053_word_arrange',
        'en_s1u5_n2_054_audio_match',
        'en_s1u5_n2_055_speaking',
        'en_s1u5_n2_056_sentence_builder',
        'en_s1u5_n2_057_image_choice',
        'en_s1u5_n2_058_fill_in_blank',
        'en_s1u5_n2_059_translate_builder',
        'en_s1u5_n2_060_reply_builder',
      ],
    },

    {
      title: L(
        '건축과 질문 복습',
        'Arxitektura va savollarni takrorlash',
        'Architecture and question review',
        'Повторение архитектуры и вопросов',
      ),
      description: L(
        '건축 어휘와 Wh- 의문문을 실제 대화와 듣기 덩어리로 다시 연습해요.',
        'Arxitektura so‘zlari va Wh-savollarni haqiqiy suhbat hamda tinglash bo‘laklari orqali takrorlaysiz.',
        'Review architecture vocabulary and Wh- questions through practical conversation and listening chunks.',
        'Повторяем лексику архитектуры и Wh-вопросы через практические диалоги и речевые блоки.',
      ),
      category: LessonCategory.LISTENING,
      level: LV,
      order: 4,
      questions: [
        'en_s1u5_n2_061_speaking',
        'en_s1u5_n2_062_image_choice',
        'en_s1u5_n2_063_word_matching',
        'en_s1u5_n2_064_translate_builder',
        'en_s1u5_n2_065_word_arrange',
        'en_s1u5_n2_066_audio_match',
        'en_s1u5_n2_067_fill_in_blank',
        'en_s1u5_n2_068_sentence_builder',
        'en_s1u5_n2_069_reply_builder',
        'en_s1u5_n2_070_image_choice',
        'en_s1u5_n2_071_translate_builder',
        'en_s1u5_n2_072_word_matching',
        'en_s1u5_n2_073_audio_match',
        'en_s1u5_n2_074_word_arrange',
        'en_s1u5_n2_075_speaking',
        'en_s1u5_n2_076_sentence_builder',
        'en_s1u5_n2_077_image_choice',
        'en_s1u5_n2_078_fill_in_blank',
        'en_s1u5_n2_079_translate_builder',
        'en_s1u5_n2_080_reply_builder',
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Section 1 · Unit 5 · Node 3
// 5.3 Styles around the world
//
// Coverage
// - present simple: positive / negative / questions
// - do / does / don't / doesn't
// - styles and fashion
// - body parts:
//   arm / body / face / foot / hair / hand / head / leg
// - singular / plural body vocabulary
// - very / really + adjective
// - traditional / colourful / bare / skin / hairstyle
//
// Existing Unit 5 words reused:
// wear / clothes / fashion / dress / shoes
// colours / always / usually / often / sometimes / never
//
// *_WORDS에는 단어만 등록.
// 4 lessons × 20 questions = 80
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT5_NODE3_WORDS = [
  {
    code: 'en-noun-style',
    english: 'style',
    senseKey: 'way-of-looking-or-dressing',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '스타일; 방식',
      'uslub',
      'a particular way of looking or dressing',
      'стиль',
    ),
    examples: [
      {
        english: 'I like her style.',
        translations: L(
          '저는 그녀의 스타일이 좋아요.',
          'Menga uning uslubi yoqadi.',
          'I like her style.',
          'Мне нравится её стиль.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/staɪl/',
      ttsText: 'style',
    },
    media: {
      emoji: '✨',
      imageUrl: '',
      imageAlt: L(
        '옷 스타일',
        'kiyinish uslubi',
        'clothing style',
        'стиль одежды',
      ),
    },
    tags: ['style', 'fashion'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-traditional',
    english: 'traditional',
    senseKey: 'following-old-customs',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '전통적인',
      'an’anaviy',
      'following customs from the past',
      'традиционный',
    ),
    examples: [
      {
        english: 'They wear traditional clothes.',
        translations: L(
          '그들은 전통 옷을 입어요.',
          'Ular an’anaviy kiyim kiyadi.',
          'They wear traditional clothes.',
          'Они носят традиционную одежду.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/trəˈdɪʃənəl/',
      ttsText: 'traditional',
    },
    media: {
      emoji: '👘',
      imageUrl: '',
      imageAlt: L(
        '전통 옷',
        'an’anaviy kiyim',
        'traditional clothing',
        'традиционная одежда',
      ),
    },
    tags: ['style', 'fashion'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-colourful',
    english: 'colourful',
    senseKey: 'having-many-bright-colours',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '화려한; 다채로운',
      'rang-barang',
      'having many bright colours',
      'яркий; разноцветный',
    ),
    examples: [
      {
        english: 'Her clothes are really colourful.',
        translations: L(
          '그녀의 옷은 정말 화려해요.',
          'Uning kiyimlari juda rang-barang.',
          'Her clothes are really colourful.',
          'Её одежда очень яркая.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkʌləfəl/',
      ttsText: 'colourful',
    },
    media: {
      emoji: '🌈',
      imageUrl: '',
      imageAlt: L(
        '다채로운 색',
        'rang-barang ranglar',
        'many bright colours',
        'яркие цвета',
      ),
    },
    tags: ['style', 'colours'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-skin',
    english: 'skin',
    senseKey: 'outer-body-covering',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('피부', 'teri', 'the outer covering of the body', 'кожа'),
    examples: [
      {
        english: 'Her skin is brown.',
        translations: L(
          '그녀의 피부는 갈색이에요.',
          'Uning terisi jigarrang.',
          'Her skin is brown.',
          'У неё коричневая кожа.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/skɪn/',
      ttsText: 'skin',
    },
    media: {
      emoji: '🖐️',
      imageUrl: '',
      imageAlt: L('피부', 'teri', 'skin', 'кожа'),
    },
    tags: ['body'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-hairstyle',
    english: 'hairstyle',
    senseKey: 'way-hair-is-arranged',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '헤어스타일',
      'soch turmagi',
      'the way a person arranges their hair',
      'причёска',
    ),
    examples: [
      {
        english: 'She has an unusual hairstyle.',
        translations: L(
          '그녀는 특이한 헤어스타일을 하고 있어요.',
          'Uning g‘ayrioddiy soch turmagi bor.',
          'She has an unusual hairstyle.',
          'У неё необычная причёска.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈheəstaɪl/',
      ttsText: 'hairstyle',
    },
    media: {
      emoji: '💇',
      imageUrl: '',
      imageAlt: L('헤어스타일', 'soch turmagi', 'hairstyle', 'причёска'),
    },
    tags: ['style', 'body'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-bare',
    english: 'bare',
    senseKey: 'not-covered',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '맨; 가리지 않은',
      'yalang',
      'not covered by clothing or shoes',
      'голый; босой',
    ),
    examples: [
      {
        english: 'The children walk with bare feet.',
        translations: L(
          '아이들은 맨발로 걸어요.',
          'Bolalar yalang oyoq yuradi.',
          'The children walk with bare feet.',
          'Дети ходят босиком.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/beə/',
      ttsText: 'bare',
    },
    media: {
      emoji: '🦶',
      imageUrl: '',
      imageAlt: L('맨발', 'yalang oyoq', 'bare feet', 'босые ноги'),
    },
    tags: ['body', 'style'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-clothing-shawl',
    english: 'shawl',
    senseKey: 'cloth-worn-around-shoulders',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '숄',
      'shol',
      'a large piece of cloth worn around the shoulders or body',
      'шаль',
    ),
    examples: [
      {
        english: 'She wears a shawl around her body.',
        translations: L(
          '그녀는 몸에 숄을 둘러요.',
          'U tanasiga shol o‘raydi.',
          'She wears a shawl around her body.',
          'Она носит шаль вокруг тела.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ʃɔːl/',
      ttsText: 'shawl',
    },
    media: {
      emoji: '🧣',
      imageUrl: '',
      imageAlt: L('숄', 'shol', 'a shawl', 'шаль'),
    },
    tags: ['clothes', 'style'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-body-arm',
    english: 'arm',
    senseKey: 'upper-limb',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '팔',
      'qo‘l',
      'the part of the body from the shoulder to the hand',
      'рука',
    ),
    examples: [
      {
        english: 'She has long arms.',
        translations: L(
          '그녀는 팔이 길어요.',
          'Uning qo‘llari uzun.',
          'She has long arms.',
          'У неё длинные руки.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɑːm/',
      ttsText: 'arm',
    },
    media: {
      emoji: '💪',
      imageUrl: '',
      imageAlt: L('팔', 'qo‘l', 'an arm', 'рука'),
    },
    tags: ['body-parts'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-body-body',
    english: 'body',
    senseKey: 'whole-human-body',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('몸', 'tana', 'the whole physical part of a person', 'тело'),
    examples: [
      {
        english: 'The shawl goes around her body.',
        translations: L(
          '숄이 그녀의 몸을 둘러요.',
          'Shol uning tanasi atrofida turadi.',
          'The shawl goes around her body.',
          'Шаль обёрнута вокруг её тела.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈbɒdi/',
      ttsText: 'body',
    },
    media: {
      emoji: '🧍',
      imageUrl: '',
      imageAlt: L('몸', 'tana', 'a body', 'тело'),
    },
    tags: ['body-parts'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-body-face',
    english: 'face',
    senseKey: 'front-of-head',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('얼굴', 'yuz', 'the front part of the head', 'лицо'),
    examples: [
      {
        english: 'She has a lovely face.',
        translations: L(
          '그녀는 아름다운 얼굴을 가졌어요.',
          'Uning yuzi chiroyli.',
          'She has a lovely face.',
          'У неё красивое лицо.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/feɪs/',
      ttsText: 'face',
    },
    media: {
      emoji: '🙂',
      imageUrl: '',
      imageAlt: L('얼굴', 'yuz', 'a face', 'лицо'),
    },
    tags: ['body-parts'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-body-foot',
    english: 'foot',
    senseKey: 'end-of-leg',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '발',
      'oyoq panjasi',
      'the end of the leg that you stand on',
      'ступня',
    ),
    examples: [
      {
        english: 'My left foot hurts.',
        translations: L(
          '제 왼발이 아파요.',
          'Chap oyog‘im og‘riyapti.',
          'My left foot hurts.',
          'У меня болит левая ступня.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/fʊt/',
      ttsText: 'foot',
    },
    media: {
      emoji: '🦶',
      imageUrl: '',
      imageAlt: L('발', 'oyoq panjasi', 'a foot', 'ступня'),
    },
    tags: ['body-parts'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-body-hair',
    english: 'hair',
    senseKey: 'hair-on-head',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '머리카락; 머리',
      'soch',
      'the hair growing on a person’s head',
      'волосы',
    ),
    examples: [
      {
        english: 'She has really long hair.',
        translations: L(
          '그녀는 머리가 정말 길어요.',
          'Uning sochi juda uzun.',
          'She has really long hair.',
          'У неё очень длинные волосы.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/heə/',
      ttsText: 'hair',
    },
    media: {
      emoji: '💇',
      imageUrl: '',
      imageAlt: L('머리카락', 'soch', 'hair', 'волосы'),
    },
    tags: ['body-parts'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-body-hand',
    english: 'hand',
    senseKey: 'end-of-arm',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '손',
      'qo‘l panjasi',
      'the part at the end of your arm',
      'кисть руки',
    ),
    examples: [
      {
        english: 'His hands are big.',
        translations: L(
          '그의 손은 커요.',
          'Uning qo‘llari katta.',
          'His hands are big.',
          'У него большие руки.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/hænd/',
      ttsText: 'hand',
    },
    media: {
      emoji: '✋',
      imageUrl: '',
      imageAlt: L('손', 'qo‘l panjasi', 'a hand', 'кисть руки'),
    },
    tags: ['body-parts'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-body-head',
    english: 'head',
    senseKey: 'top-body-part',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '머리',
      'bosh',
      'the top part of the body containing the face and brain',
      'голова',
    ),
    examples: [
      {
        english: 'She puts flowers on her head.',
        translations: L(
          '그녀는 머리에 꽃을 올려요.',
          'U boshiga gullar qo‘yadi.',
          'She puts flowers on her head.',
          'Она кладёт цветы на голову.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/hed/',
      ttsText: 'head',
    },
    media: {
      emoji: '👤',
      imageUrl: '',
      imageAlt: L('머리', 'bosh', 'a head', 'голова'),
    },
    tags: ['body-parts'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-body-leg',
    english: 'leg',
    senseKey: 'lower-limb',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '다리',
      'oyoq',
      'the part of the body used for standing and walking',
      'нога',
    ),
    examples: [
      {
        english: 'His legs are long.',
        translations: L(
          '그의 다리는 길어요.',
          'Uning oyoqlari uzun.',
          'His legs are long.',
          'У него длинные ноги.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/leɡ/',
      ttsText: 'leg',
    },
    media: {
      emoji: '🦵',
      imageUrl: '',
      imageAlt: L('다리', 'oyoq', 'a leg', 'нога'),
    },
    tags: ['body-parts'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adverb-very',
    english: 'very',
    senseKey: 'high-degree',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L('매우; 아주', 'juda', 'to a high degree', 'очень'),
    examples: [
      {
        english: 'It is very cold.',
        translations: L(
          '아주 추워요.',
          'Juda sovuq.',
          'It is very cold.',
          'Очень холодно.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈveri/',
      ttsText: 'very',
    },
    media: {
      emoji: '⬆️',
      imageUrl: '',
      imageAlt: L(
        '강한 정도',
        'yuqori daraja',
        'a high degree',
        'высокая степень',
      ),
    },
    tags: ['adjective-modifiers'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adverb-really',
    english: 'really',
    senseKey: 'strong-degree',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L(
      '정말; 아주',
      'juda; rostdan ham',
      'very; to a strong degree',
      'очень; действительно',
    ),
    examples: [
      {
        english: 'Her hair is really long.',
        translations: L(
          '그녀의 머리는 정말 길어요.',
          'Uning sochi juda uzun.',
          'Her hair is really long.',
          'У неё действительно длинные волосы.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈrɪəli/',
      ttsText: 'really',
    },
    media: {
      emoji: '‼️',
      imageUrl: '',
      imageAlt: L(
        '강조',
        'kuchli ta’kid',
        'strong emphasis',
        'сильное усиление',
      ),
    },
    tags: ['adjective-modifiers'],
    difficulty: 1,
    isCore: true,
  },
];

export const EN_S1_UNIT5_NODE3_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Present simple: all forms
  // ===========================================================

  en_s1u5_n3_001_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'They wear colourful clothes.',
    audioText: 'They wear colourful clothes.',
    answerTranslation: L(
      '그들은 화려한 옷을 입어요.',
      'Ular rang-barang kiyim kiyadi.',
      'They wear colourful clothes.',
      'Они носят яркую одежду.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple', 'style'],
  },

  en_s1u5_n3_002_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'shawl',
    choices: [
      { text: 'shawl', label: '🧣', emoji: '🧣', imageUrl: '' },
      { text: 'shoes', label: '👞', emoji: '👞', imageUrl: '' },
      { text: 'hat', label: '👒', emoji: '👒', imageUrl: '' },
      { text: 'dress', label: '👗', emoji: '👗', imageUrl: '' },
    ],
    answerTranslation: L('숄', 'shol', 'shawl', 'шаль'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['style', 'shawl'],
  },

  en_s1u5_n3_003_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'style',
        native: 'uslub',
        nativeI18n: L('스타일', 'uslub', 'style', 'стиль'),
      },
      {
        text: 'traditional',
        native: 'an’anaviy',
        nativeI18n: L('전통적인', 'an’anaviy', 'traditional', 'традиционный'),
      },
      {
        text: 'colourful',
        native: 'rang-barang',
        nativeI18n: L('다채로운', 'rang-barang', 'colourful', 'разноцветный'),
      },
      {
        text: 'shawl',
        native: 'shol',
        nativeI18n: L('숄', 'shol', 'shawl', 'шаль'),
      },
      {
        text: 'hairstyle',
        native: 'soch turmagi',
        nativeI18n: L('헤어스타일', 'soch turmagi', 'hairstyle', 'причёска'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['style', 'matching'],
  },

  en_s1u5_n3_004_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'wear',
      'They',
      'traditional',
      'clothes',
      'does',
      'doesn’t',
      'style',
    ],
    answer: 'They wear traditional clothes',
    answerTranslation: L(
      '그들은 전통 옷을 입어요.',
      'Ular an’anaviy kiyim kiyadi.',
      'They wear traditional clothes.',
      'Они носят традиционную одежду.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple', 'traditional'],
  },

  en_s1u5_n3_005_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['She', 'wears', 'a', 'colourful', 'dress', 'wear', 'do'],
    answer: 'She wears a colourful dress',
    audioText: 'She wears a colourful dress.',
    answerTranslation: L(
      '그녀는 화려한 드레스를 입어요.',
      'U rang-barang ko‘ylak kiyadi.',
      'She wears a colourful dress.',
      'Она носит яркое платье.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['present-simple', 'third-person'],
  },

  en_s1u5_n3_006_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'style',
        native: 'uslub',
        nativeI18n: L('스타일', 'uslub', 'style', 'стиль'),
      },
      {
        text: 'skin',
        native: 'teri',
        nativeI18n: L('피부', 'teri', 'skin', 'кожа'),
      },
      {
        text: 'bare',
        native: 'yalang',
        nativeI18n: L('맨', 'yalang', 'bare', 'голый'),
      },
      {
        text: 'shawl',
        native: 'shol',
        nativeI18n: L('숄', 'shol', 'shawl', 'шаль'),
      },
      {
        text: 'hairstyle',
        native: 'soch turmagi',
        nativeI18n: L('헤어스타일', 'soch turmagi', 'hairstyle', 'причёска'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['style', 'listening'],
  },

  en_s1u5_n3_007_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She ___ a long skirt.',
    blankAnswers: ['wears'],
    options: ['wears', 'wear', 'do', 'don’t'],
    answer: 'wears',
    answerTranslation: L(
      '그녀는 긴 치마를 입어요.',
      'U uzun yubka kiyadi.',
      'She wears a long skirt.',
      'Она носит длинную юбку.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple', 'third-person'],
  },

  en_s1u5_n3_008_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'They do not wear shoes in the street.',
    audioText: 'They do not wear shoes in the street.',
    answerI18n: L(
      '그들은 거리에서 신발을 신지 않아요',
      'Ular ko‘chada poyabzal kiymaydi',
      'They do not wear shoes in the street',
      'Они не носят обувь на улице',
    ),
    options: [
      'They',
      'do',
      'not',
      'wear',
      'shoes',
      'in',
      'the',
      'street',
      'does',
    ],
    optionsI18n: {
      ko: ['그들은', '거리에서', '신발을', '신지', '않아요', '항상'],
      uz: ['Ular', 'ko‘chada', 'poyabzal', 'kiymaydi', 'har doim'],
      en: ['They', 'do', 'not', 'wear', 'shoes', 'in', 'the', 'street', 'does'],
      ru: ['Они', 'не', 'носят', 'обувь', 'на', 'улице', 'всегда'],
    },
    answerTranslation: L(
      '그들은 거리에서 신발을 신지 않아요.',
      'Ular ko‘chada poyabzal kiymaydi.',
      'They do not wear shoes in the street.',
      'Они не носят обувь на улице.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['present-simple', 'negative'],
  },

  en_s1u5_n3_009_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Do you like traditional clothes?',
    options: ['Yes', 'I', 'do', 'does', 'wear'],
    answer: 'Yes I do',
    answerTranslation: L('네, 좋아해요.', 'Ha, yoqadi.', 'Yes, I do.', 'Да.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['present-simple', 'do', 'reply'],
  },

  en_s1u5_n3_010_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'traditional',
    choices: [
      { text: 'traditional', label: '👘', emoji: '👘', imageUrl: '' },
      { text: 'modern', label: '🏙️', emoji: '🏙️', imageUrl: '' },
      { text: 'trainers', label: '👟', emoji: '👟', imageUrl: '' },
      { text: 'hat', label: '👒', emoji: '👒', imageUrl: '' },
    ],
    answerTranslation: L(
      '전통적인',
      'an’anaviy',
      'traditional',
      'традиционный',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['traditional', 'style'],
  },

  en_s1u5_n3_011_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'He',
      'doesn’t',
      'wear',
      'traditional',
      'clothes',
      'don’t',
      'wears',
    ],
    answer: 'He doesn’t wear traditional clothes',
    answerTranslation: L(
      '그는 전통 옷을 입지 않아요.',
      'U an’anaviy kiyim kiymaydi.',
      'He doesn’t wear traditional clothes.',
      'Он не носит традиционную одежду.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple', 'doesnt'],
  },

  en_s1u5_n3_012_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'wear',
        native: 'kiymoq',
        nativeI18n: L('입다', 'kiymoq', 'wear', 'носить'),
      },
      {
        text: 'style',
        native: 'uslub',
        nativeI18n: L('스타일', 'uslub', 'style', 'стиль'),
      },
      {
        text: 'fashion',
        native: 'moda',
        nativeI18n: L('패션', 'moda', 'fashion', 'мода'),
      },
      {
        text: 'colourful',
        native: 'rang-barang',
        nativeI18n: L('화려한', 'rang-barang', 'colourful', 'яркий'),
      },
      {
        text: 'traditional',
        native: 'an’anaviy',
        nativeI18n: L('전통적인', 'an’anaviy', 'traditional', 'традиционный'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['style', 'fashion', 'matching'],
  },

  en_s1u5_n3_013_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['Do', 'they', 'wear', 'shoes', 'in', 'the', 'street', 'does'],
    answer: 'Do they wear shoes in the street',
    audioText: 'Do they wear shoes in the street?',
    answerTranslation: L(
      '그들은 거리에서 신발을 신어요?',
      'Ular ko‘chada poyabzal kiyadimi?',
      'Do they wear shoes in the street?',
      'Они носят обувь на улице?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['present-simple', 'questions'],
  },

  en_s1u5_n3_014_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'traditional',
        native: 'an’anaviy',
        nativeI18n: L('전통적인', 'an’anaviy', 'traditional', 'традиционный'),
      },
      {
        text: 'colourful',
        native: 'rang-barang',
        nativeI18n: L('화려한', 'rang-barang', 'colourful', 'яркий'),
      },
      {
        text: 'bare',
        native: 'yalang',
        nativeI18n: L('맨', 'yalang', 'bare', 'босой'),
      },
      {
        text: 'skin',
        native: 'teri',
        nativeI18n: L('피부', 'teri', 'skin', 'кожа'),
      },
      {
        text: 'style',
        native: 'uslub',
        nativeI18n: L('스타일', 'uslub', 'style', 'стиль'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['style', 'listening'],
  },

  en_s1u5_n3_015_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Does she like colourful clothes?',
    audioText: 'Does she like colourful clothes?',
    answerTranslation: L(
      '그녀는 화려한 옷을 좋아해요?',
      'U rang-barang kiyimlarni yoqtiradimi?',
      'Does she like colourful clothes?',
      'Ей нравится яркая одежда?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple', 'does'],
  },

  en_s1u5_n3_016_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She ___ like brown skin.',
    blankAnswers: ['doesn’t'],
    options: ['doesn’t', 'don’t', 'does', 'wear'],
    answer: 'doesn’t',
    answerTranslation: L(
      '그녀는 갈색 피부를 좋아하지 않아요.',
      'U jigarrang terini yoqtirmaydi.',
      'She doesn’t like brown skin.',
      'Ей не нравится коричневая кожа.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple', 'doesnt'],
  },

  en_s1u5_n3_017_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'hairstyle',
    choices: [
      { text: 'hairstyle', label: '💇', emoji: '💇', imageUrl: '' },
      { text: 'shoes', label: '👞', emoji: '👞', imageUrl: '' },
      { text: 'shawl', label: '🧣', emoji: '🧣', imageUrl: '' },
      { text: 'dress', label: '👗', emoji: '👗', imageUrl: '' },
    ],
    answerTranslation: L('헤어스타일', 'soch turmagi', 'hairstyle', 'причёска'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['hairstyle', 'style'],
  },

  en_s1u5_n3_018_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Does she wear trousers?',
    options: ['No', 'she', 'doesn’t', 'don’t', 'wear'],
    answer: 'No she doesn’t',
    answerTranslation: L(
      '아니요, 입지 않아요.',
      'Yo‘q, kiymaydi.',
      'No, she doesn’t.',
      'Нет.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['present-simple', 'doesnt', 'reply'],
  },

  en_s1u5_n3_019_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['What', 'do', 'they', 'wear', 'on', 'special', 'days', 'does'],
    answer: 'What do they wear on special days',
    answerTranslation: L(
      '그들은 특별한 날에 무엇을 입어요?',
      'Ular maxsus kunlarda nima kiyadi?',
      'What do they wear on special days?',
      'Что они носят в особые дни?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple', 'what'],
  },

  en_s1u5_n3_020_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Do you and your friend like the same style?' },
    ],
    options: [
      'No, we don’t.',
      'No, we doesn’t.',
      'No, we not.',
      'No, she don’t.',
    ],
    answer: 'No, we don’t.',
    answerTranslation: L(
      '아니요, 그렇지 않아요.',
      'Yo‘q, yoqtirmaymiz.',
      'No, we don’t.',
      'Нет.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['present-simple', 'dialog'],
  },

  // ===========================================================
  // Lesson 2 · Parts of the body
  // ===========================================================

  en_s1u5_n3_021_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She has long hair.',
    audioText: 'She has long hair.',
    answerTranslation: L(
      '그녀는 머리가 길어요.',
      'Uning sochi uzun.',
      'She has long hair.',
      'У неё длинные волосы.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['body-parts', 'hair'],
  },

  en_s1u5_n3_022_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'hand',
    choices: [
      { text: 'hand', label: '✋', emoji: '✋', imageUrl: '' },
      { text: 'foot', label: '🦶', emoji: '🦶', imageUrl: '' },
      { text: 'leg', label: '🦵', emoji: '🦵', imageUrl: '' },
      { text: 'face', label: '🙂', emoji: '🙂', imageUrl: '' },
    ],
    answerTranslation: L('손', 'qo‘l panjasi', 'hand', 'кисть руки'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['body-parts', 'hand'],
  },

  en_s1u5_n3_023_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'arm',
        native: 'qo‘l',
        nativeI18n: L('팔', 'qo‘l', 'arm', 'рука'),
      },
      {
        text: 'hand',
        native: 'qo‘l panjasi',
        nativeI18n: L('손', 'qo‘l panjasi', 'hand', 'кисть руки'),
      },
      {
        text: 'leg',
        native: 'oyoq',
        nativeI18n: L('다리', 'oyoq', 'leg', 'нога'),
      },
      {
        text: 'foot',
        native: 'oyoq panjasi',
        nativeI18n: L('발', 'oyoq panjasi', 'foot', 'ступня'),
      },
      {
        text: 'head',
        native: 'bosh',
        nativeI18n: L('머리', 'bosh', 'head', 'голова'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['body-parts', 'matching'],
  },

  en_s1u5_n3_024_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['She', 'puts', 'flowers', 'on', 'her', 'head', 'foot', 'wears'],
    answer: 'She puts flowers on her head',
    answerTranslation: L(
      '그녀는 머리에 꽃을 올려요.',
      'U boshiga gullar qo‘yadi.',
      'She puts flowers on her head.',
      'Она кладёт цветы на голову.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['body-parts', 'head'],
  },

  en_s1u5_n3_025_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['His', 'hands', 'are', 'very', 'big', 'legs', 'is'],
    answer: 'His hands are very big',
    audioText: 'His hands are very big.',
    answerTranslation: L(
      '그의 손은 아주 커요.',
      'Uning qo‘llari juda katta.',
      'His hands are very big.',
      'У него очень большие руки.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['body-parts', 'hands', 'very'],
  },

  en_s1u5_n3_026_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'arm',
        native: 'qo‘l',
        nativeI18n: L('팔', 'qo‘l', 'arm', 'рука'),
      },
      {
        text: 'body',
        native: 'tana',
        nativeI18n: L('몸', 'tana', 'body', 'тело'),
      },
      {
        text: 'face',
        native: 'yuz',
        nativeI18n: L('얼굴', 'yuz', 'face', 'лицо'),
      },
      {
        text: 'head',
        native: 'bosh',
        nativeI18n: L('머리', 'bosh', 'head', 'голова'),
      },
      {
        text: 'hair',
        native: 'soch',
        nativeI18n: L('머리카락', 'soch', 'hair', 'волосы'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['body-parts', 'listening'],
  },

  en_s1u5_n3_027_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She has long ___.',
    blankAnswers: ['hair'],
    options: ['hair', 'head', 'foot', 'body'],
    answer: 'hair',
    answerTranslation: L(
      '그녀는 머리가 길어요.',
      'Uning sochi uzun.',
      'She has long hair.',
      'У неё длинные волосы.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['body-parts', 'hair'],
  },

  en_s1u5_n3_028_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'They have bare feet.',
    audioText: 'They have bare feet.',
    answerI18n: L(
      '그들은 맨발이에요',
      'Ular yalang oyoq',
      'They have bare feet',
      'Они босиком',
    ),
    options: ['They', 'have', 'bare', 'feet', 'hands', 'wear'],
    optionsI18n: {
      ko: ['그들은', '맨발이에요', '손이', '커요'],
      uz: ['Ular', 'yalang', 'oyoq', 'qo‘llari', 'katta'],
      en: ['They', 'have', 'bare', 'feet', 'hands', 'big'],
      ru: ['Они', 'босиком', 'руки', 'большие'],
    },
    answerTranslation: L(
      '그들은 맨발이에요.',
      'Ular yalang oyoq.',
      'They have bare feet.',
      'Они босиком.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['body-parts', 'feet', 'bare'],
  },

  en_s1u5_n3_029_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What does she put on her head?',
    options: ['She', 'puts', 'flowers', 'on', 'her', 'head', 'feet'],
    answer: 'She puts flowers on her head',
    answerTranslation: L(
      '그녀는 머리에 꽃을 올려요.',
      'U boshiga gullar qo‘yadi.',
      'She puts flowers on her head.',
      'Она кладёт цветы на голову.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['body-parts', 'head', 'reply'],
  },

  en_s1u5_n3_030_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'foot',
    choices: [
      { text: 'foot', label: '🦶', emoji: '🦶', imageUrl: '' },
      { text: 'hand', label: '✋', emoji: '✋', imageUrl: '' },
      { text: 'face', label: '🙂', emoji: '🙂', imageUrl: '' },
      { text: 'leg', label: '🦵', emoji: '🦵', imageUrl: '' },
    ],
    answerTranslation: L('발', 'oyoq panjasi', 'foot', 'ступня'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['body-parts', 'foot'],
  },

  en_s1u5_n3_031_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['Her', 'face', 'is', 'very', 'beautiful', 'hand', 'are'],
    answer: 'Her face is very beautiful',
    answerTranslation: L(
      '그녀의 얼굴은 아주 아름다워요.',
      'Uning yuzi juda chiroyli.',
      'Her face is very beautiful.',
      'У неё очень красивое лицо.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['body-parts', 'face', 'very'],
  },

  en_s1u5_n3_032_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'body',
        native: 'tana',
        nativeI18n: L('몸', 'tana', 'body', 'тело'),
      },
      {
        text: 'face',
        native: 'yuz',
        nativeI18n: L('얼굴', 'yuz', 'face', 'лицо'),
      },
      {
        text: 'hair',
        native: 'soch',
        nativeI18n: L('머리카락', 'soch', 'hair', 'волосы'),
      },
      {
        text: 'hand',
        native: 'qo‘l panjasi',
        nativeI18n: L('손', 'qo‘l panjasi', 'hand', 'кисть руки'),
      },
      {
        text: 'leg',
        native: 'oyoq',
        nativeI18n: L('다리', 'oyoq', 'leg', 'нога'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['body-parts', 'matching'],
  },

  en_s1u5_n3_033_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['Her', 'legs', 'are', 'really', 'long', 'hands', 'is'],
    answer: 'Her legs are really long',
    audioText: 'Her legs are really long.',
    answerTranslation: L(
      '그녀의 다리는 정말 길어요.',
      'Uning oyoqlari juda uzun.',
      'Her legs are really long.',
      'У неё очень длинные ноги.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['body-parts', 'legs', 'really'],
  },

  en_s1u5_n3_034_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'foot',
        native: 'oyoq panjasi',
        nativeI18n: L('발', 'oyoq panjasi', 'foot', 'ступня'),
      },
      {
        text: 'hand',
        native: 'qo‘l panjasi',
        nativeI18n: L('손', 'qo‘l panjasi', 'hand', 'кисть руки'),
      },
      {
        text: 'leg',
        native: 'oyoq',
        nativeI18n: L('다리', 'oyoq', 'leg', 'нога'),
      },
      {
        text: 'face',
        native: 'yuz',
        nativeI18n: L('얼굴', 'yuz', 'face', 'лицо'),
      },
      {
        text: 'body',
        native: 'tana',
        nativeI18n: L('몸', 'tana', 'body', 'тело'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['body-parts', 'listening'],
  },

  en_s1u5_n3_035_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'His arms are strong.',
    audioText: 'His arms are strong.',
    answerTranslation: L(
      '그의 팔은 튼튼해요.',
      'Uning qo‘llari kuchli.',
      'His arms are strong.',
      'У него сильные руки.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['body-parts', 'arms'],
  },

  en_s1u5_n3_036_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She puts the shawl around her ___.',
    blankAnswers: ['body'],
    options: ['body', 'hair', 'foot', 'hand'],
    answer: 'body',
    answerTranslation: L(
      '그녀는 몸에 숄을 둘러요.',
      'U tanasiga shol o‘raydi.',
      'She puts the shawl around her body.',
      'Она оборачивает шаль вокруг тела.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['body-parts', 'body', 'shawl'],
  },

  en_s1u5_n3_037_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'leg',
    choices: [
      { text: 'leg', label: '🦵', emoji: '🦵', imageUrl: '' },
      { text: 'foot', label: '🦶', emoji: '🦶', imageUrl: '' },
      { text: 'hand', label: '✋', emoji: '✋', imageUrl: '' },
      { text: 'face', label: '🙂', emoji: '🙂', imageUrl: '' },
    ],
    answerTranslation: L('다리', 'oyoq', 'leg', 'нога'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['body-parts', 'leg'],
  },

  en_s1u5_n3_038_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What colour is her hair?',
    options: ['Her', 'hair', 'is', 'black', 'head', 'wears'],
    answer: 'Her hair is black',
    answerTranslation: L(
      '그녀의 머리는 검은색이에요.',
      'Uning sochi qora.',
      'Her hair is black.',
      'У неё чёрные волосы.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['body-parts', 'hair', 'reply'],
  },

  en_s1u5_n3_039_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'The',
      'children',
      'walk',
      'with',
      'bare',
      'feet',
      'hands',
      'wear',
    ],
    answer: 'The children walk with bare feet',
    answerTranslation: L(
      '아이들은 맨발로 걸어요.',
      'Bolalar yalang oyoq yuradi.',
      'The children walk with bare feet.',
      'Дети ходят босиком.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['body-parts', 'bare', 'feet'],
  },

  en_s1u5_n3_040_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What does she have on her head?' }],
    options: [
      'She has flowers on her head.',
      'She has flowers on her feet.',
      'She wear flowers on head.',
      'Her head does flowers.',
    ],
    answer: 'She has flowers on her head.',
    answerTranslation: L(
      '그녀는 머리에 꽃을 하고 있어요.',
      'Uning boshida gullar bor.',
      'She has flowers on her head.',
      'У неё на голове цветы.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['body-parts', 'head', 'dialog'],
  },

  // ===========================================================
  // Lesson 3 · Very / really + style
  // ===========================================================

  en_s1u5_n3_041_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Her hair is really long.',
    audioText: 'Her hair is really long.',
    answerTranslation: L(
      '그녀의 머리는 정말 길어요.',
      'Uning sochi juda uzun.',
      'Her hair is really long.',
      'У неё очень длинные волосы.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['really', 'hair'],
  },

  en_s1u5_n3_042_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'face',
    choices: [
      { text: 'face', label: '🙂', emoji: '🙂', imageUrl: '' },
      { text: 'hand', label: '✋', emoji: '✋', imageUrl: '' },
      { text: 'leg', label: '🦵', emoji: '🦵', imageUrl: '' },
      { text: 'foot', label: '🦶', emoji: '🦶', imageUrl: '' },
    ],
    answerTranslation: L('얼굴', 'yuz', 'face', 'лицо'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['body-parts', 'face'],
  },

  en_s1u5_n3_043_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'very',
        native: 'juda',
        nativeI18n: L('매우', 'juda', 'very', 'очень'),
      },
      {
        text: 'really',
        native: 'juda',
        nativeI18n: L('정말', 'juda', 'really', 'действительно'),
      },
      {
        text: 'colourful',
        native: 'rang-barang',
        nativeI18n: L('화려한', 'rang-barang', 'colourful', 'яркий'),
      },
      {
        text: 'traditional',
        native: 'an’anaviy',
        nativeI18n: L('전통적인', 'an’anaviy', 'traditional', 'традиционный'),
      },
      {
        text: 'bare',
        native: 'yalang',
        nativeI18n: L('맨', 'yalang', 'bare', 'босой'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['modifiers', 'matching'],
  },

  en_s1u5_n3_044_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['Her', 'clothes', 'are', 'really', 'colourful', 'very', 'wear'],
    answer: 'Her clothes are really colourful',
    answerTranslation: L(
      '그녀의 옷은 정말 화려해요.',
      'Uning kiyimlari juda rang-barang.',
      'Her clothes are really colourful.',
      'Её одежда очень яркая.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['really', 'colourful'],
  },

  en_s1u5_n3_045_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['That', 'hat', 'is', 'very', 'nice', 'really', 'wear'],
    answer: 'That hat is very nice',
    audioText: 'That hat is very nice.',
    answerTranslation: L(
      '저 모자는 아주 멋져요.',
      'U bosh kiyim juda chiroyli.',
      'That hat is very nice.',
      'Эта шляпа очень красивая.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['very', 'style'],
  },

  en_s1u5_n3_046_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'very',
        native: 'juda',
        nativeI18n: L('매우', 'juda', 'very', 'очень'),
      },
      {
        text: 'really',
        native: 'juda',
        nativeI18n: L('정말', 'juda', 'really', 'действительно'),
      },
      {
        text: 'style',
        native: 'uslub',
        nativeI18n: L('스타일', 'uslub', 'style', 'стиль'),
      },
      {
        text: 'hairstyle',
        native: 'soch turmagi',
        nativeI18n: L('헤어스타일', 'soch turmagi', 'hairstyle', 'причёска'),
      },
      {
        text: 'skin',
        native: 'teri',
        nativeI18n: L('피부', 'teri', 'skin', 'кожа'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['style', 'modifiers', 'listening'],
  },

  en_s1u5_n3_047_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Her hair is ___ long.',
    blankAnswers: ['really'],
    options: ['really', 'wear', 'does', 'hair'],
    answer: 'really',
    answerTranslation: L(
      '그녀의 머리는 정말 길어요.',
      'Uning sochi juda uzun.',
      'Her hair is really long.',
      'У неё очень длинные волосы.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['really', 'hair'],
  },

  en_s1u5_n3_048_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'They wear really beautiful clothes.',
    audioText: 'They wear really beautiful clothes.',
    answerI18n: L(
      '그들은 정말 아름다운 옷을 입어요',
      'Ular juda chiroyli kiyim kiyadi',
      'They wear really beautiful clothes',
      'Они носят очень красивую одежду',
    ),
    options: ['They', 'wear', 'really', 'beautiful', 'clothes', 'does', 'very'],
    optionsI18n: {
      ko: ['그들은', '정말', '아름다운', '옷을', '입어요', '매우'],
      uz: ['Ular', 'juda', 'chiroyli', 'kiyim', 'kiyadi', 'haqiqatan'],
      en: ['They', 'wear', 'really', 'beautiful', 'clothes', 'very', 'does'],
      ru: ['Они', 'носят', 'очень', 'красивую', 'одежду', 'действительно'],
    },
    answerTranslation: L(
      '그들은 정말 아름다운 옷을 입어요.',
      'Ular juda chiroyli kiyim kiyadi.',
      'They wear really beautiful clothes.',
      'Они носят очень красивую одежду.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['really', 'clothes'],
  },

  en_s1u5_n3_049_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What do you think of her style?',
    options: ['It', 'is', 'really', 'beautiful', 'does', 'wear'],
    answer: 'It is really beautiful',
    answerTranslation: L(
      '정말 아름다워요.',
      'U juda chiroyli.',
      'It is really beautiful.',
      'Он очень красивый.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['style', 'really', 'reply'],
  },

  en_s1u5_n3_050_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'hair',
    choices: [
      { text: 'hair', label: '💇', emoji: '💇', imageUrl: '' },
      { text: 'hand', label: '✋', emoji: '✋', imageUrl: '' },
      { text: 'foot', label: '🦶', emoji: '🦶', imageUrl: '' },
      { text: 'leg', label: '🦵', emoji: '🦵', imageUrl: '' },
    ],
    answerTranslation: L('머리카락', 'soch', 'hair', 'волосы'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['body-parts', 'hair'],
  },

  en_s1u5_n3_051_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['His', 'jacket', 'is', 'very', 'old', 'really', 'wears'],
    answer: 'His jacket is very old',
    answerTranslation: L(
      '그의 재킷은 아주 오래됐어요.',
      'Uning kurtkasi juda eski.',
      'His jacket is very old.',
      'Его куртка очень старая.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['very', 'clothes'],
  },

  en_s1u5_n3_052_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'face',
        native: 'yuz',
        nativeI18n: L('얼굴', 'yuz', 'face', 'лицо'),
      },
      {
        text: 'hair',
        native: 'soch',
        nativeI18n: L('머리카락', 'soch', 'hair', 'волосы'),
      },
      {
        text: 'head',
        native: 'bosh',
        nativeI18n: L('머리', 'bosh', 'head', 'голова'),
      },
      {
        text: 'skin',
        native: 'teri',
        nativeI18n: L('피부', 'teri', 'skin', 'кожа'),
      },
      {
        text: 'body',
        native: 'tana',
        nativeI18n: L('몸', 'tana', 'body', 'тело'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['body-parts', 'matching'],
  },

  en_s1u5_n3_053_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['She', 'has', 'a', 'really', 'lovely', 'face', 'hair', 'does'],
    answer: 'She has a really lovely face',
    audioText: 'She has a really lovely face.',
    answerTranslation: L(
      '그녀는 정말 아름다운 얼굴을 가졌어요.',
      'Uning yuzi juda chiroyli.',
      'She has a really lovely face.',
      'У неё очень красивое лицо.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['really', 'face'],
  },

  en_s1u5_n3_054_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'arm',
        native: 'qo‘l',
        nativeI18n: L('팔', 'qo‘l', 'arm', 'рука'),
      },
      {
        text: 'hand',
        native: 'qo‘l panjasi',
        nativeI18n: L('손', 'qo‘l panjasi', 'hand', 'кисть руки'),
      },
      {
        text: 'head',
        native: 'bosh',
        nativeI18n: L('머리', 'bosh', 'head', 'голова'),
      },
      {
        text: 'leg',
        native: 'oyoq',
        nativeI18n: L('다리', 'oyoq', 'leg', 'нога'),
      },
      {
        text: 'foot',
        native: 'oyoq panjasi',
        nativeI18n: L('발', 'oyoq panjasi', 'foot', 'ступня'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['body-parts', 'listening'],
  },

  en_s1u5_n3_055_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Their clothes are really colourful.',
    audioText: 'Their clothes are really colourful.',
    answerTranslation: L(
      '그들의 옷은 정말 화려해요.',
      'Ularning kiyimlari juda rang-barang.',
      'Their clothes are really colourful.',
      'Их одежда очень яркая.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['really', 'colourful'],
  },

  en_s1u5_n3_056_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'This traditional dress is ___ beautiful.',
    blankAnswers: ['really'],
    options: ['really', 'does', 'wear', 'style'],
    answer: 'really',
    answerTranslation: L(
      '이 전통 드레스는 정말 아름다워요.',
      'Bu an’anaviy ko‘ylak juda chiroyli.',
      'This traditional dress is really beautiful.',
      'Это традиционное платье очень красивое.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['really', 'traditional'],
  },

  en_s1u5_n3_057_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'head',
    choices: [
      { text: 'head', label: '👤', emoji: '👤', imageUrl: '' },
      { text: 'face', label: '🙂', emoji: '🙂', imageUrl: '' },
      { text: 'hand', label: '✋', emoji: '✋', imageUrl: '' },
      { text: 'foot', label: '🦶', emoji: '🦶', imageUrl: '' },
    ],
    answerTranslation: L('머리', 'bosh', 'head', 'голова'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['body-parts', 'head'],
  },

  en_s1u5_n3_058_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Is her hair long?',
    options: ['Yes', 'it', 'is', 'really', 'long', 'does'],
    answer: 'Yes it is really long',
    answerTranslation: L(
      '네, 정말 길어요.',
      'Ha, juda uzun.',
      'Yes, it is really long.',
      'Да, они очень длинные.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['really', 'hair', 'reply'],
  },

  en_s1u5_n3_059_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'They',
      'wear',
      'really',
      'beautiful',
      'traditional',
      'clothes',
      'does',
    ],
    answer: 'They wear really beautiful traditional clothes',
    answerTranslation: L(
      '그들은 정말 아름다운 전통 옷을 입어요.',
      'Ular juda chiroyli an’anaviy kiyim kiyadi.',
      'They wear really beautiful traditional clothes.',
      'Они носят очень красивую традиционную одежду.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['really', 'traditional', 'style'],
  },

  en_s1u5_n3_060_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'What do you think of that hairstyle?' },
    ],
    options: [
      'It’s really interesting.',
      'It really does hairstyle.',
      'It is hair very.',
      'It wear interesting.',
    ],
    answer: 'It’s really interesting.',
    answerTranslation: L(
      '정말 흥미로워요.',
      'U juda qiziqarli.',
      'It’s really interesting.',
      'Она очень интересная.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['hairstyle', 'really', 'dialog'],
  },

  // ===========================================================
  // Lesson 4 · Styles around the world + review
  // ===========================================================

  en_s1u5_n3_061_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I like traditional styles from other countries.',
    audioText: 'I like traditional styles from other countries.',
    answerTranslation: L(
      '저는 다른 나라의 전통 스타일을 좋아해요.',
      'Menga boshqa mamlakatlarning an’anaviy uslublari yoqadi.',
      'I like traditional styles from other countries.',
      'Мне нравятся традиционные стили других стран.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['style', 'traditional'],
  },

  en_s1u5_n3_062_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'body',
    choices: [
      { text: 'body', label: '🧍', emoji: '🧍', imageUrl: '' },
      { text: 'face', label: '🙂', emoji: '🙂', imageUrl: '' },
      { text: 'hand', label: '✋', emoji: '✋', imageUrl: '' },
      { text: 'foot', label: '🦶', emoji: '🦶', imageUrl: '' },
    ],
    answerTranslation: L('몸', 'tana', 'body', 'тело'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['body-parts', 'body'],
  },

  en_s1u5_n3_063_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'arm',
        native: 'qo‘l',
        nativeI18n: L('팔', 'qo‘l', 'arm', 'рука'),
      },
      {
        text: 'face',
        native: 'yuz',
        nativeI18n: L('얼굴', 'yuz', 'face', 'лицо'),
      },
      {
        text: 'foot',
        native: 'oyoq panjasi',
        nativeI18n: L('발', 'oyoq panjasi', 'foot', 'ступня'),
      },
      {
        text: 'hair',
        native: 'soch',
        nativeI18n: L('머리카락', 'soch', 'hair', 'волосы'),
      },
      {
        text: 'head',
        native: 'bosh',
        nativeI18n: L('머리', 'bosh', 'head', 'голова'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['body-parts', 'review', 'matching'],
  },

  en_s1u5_n3_064_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'Do',
      'you',
      'like',
      'styles',
      'from',
      'other',
      'countries',
      'does',
    ],
    answer: 'Do you like styles from other countries',
    answerTranslation: L(
      '다른 나라의 스타일을 좋아해요?',
      'Boshqa mamlakatlarning uslublari sizga yoqadimi?',
      'Do you like styles from other countries?',
      'Вам нравятся стили других стран?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple', 'style', 'questions'],
  },

  en_s1u5_n3_065_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['What', 'clothes', 'does', 'she', 'wear', 'do', 'style'],
    answer: 'What clothes does she wear',
    audioText: 'What clothes does she wear?',
    answerTranslation: L(
      '그녀는 어떤 옷을 입어요?',
      'U qanday kiyim kiyadi?',
      'What clothes does she wear?',
      'Какую одежду она носит?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['present-simple', 'does', 'what'],
  },

  en_s1u5_n3_066_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'traditional',
        native: 'an’anaviy',
        nativeI18n: L('전통적인', 'an’anaviy', 'traditional', 'традиционный'),
      },
      {
        text: 'colourful',
        native: 'rang-barang',
        nativeI18n: L('화려한', 'rang-barang', 'colourful', 'яркий'),
      },
      {
        text: 'hairstyle',
        native: 'soch turmagi',
        nativeI18n: L('헤어스타일', 'soch turmagi', 'hairstyle', 'причёска'),
      },
      {
        text: 'skin',
        native: 'teri',
        nativeI18n: L('피부', 'teri', 'skin', 'кожа'),
      },
      {
        text: 'bare',
        native: 'yalang',
        nativeI18n: L('맨', 'yalang', 'bare', 'босой'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['style', 'review', 'listening'],
  },

  en_s1u5_n3_067_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ she wear traditional clothes?',
    blankAnswers: ['Does'],
    options: ['Does', 'Do', 'Don’t', 'Doesn’t'],
    answer: 'Does',
    answerTranslation: L(
      '그녀는 전통 옷을 입어요?',
      'U an’anaviy kiyim kiyadimi?',
      'Does she wear traditional clothes?',
      'Она носит традиционную одежду?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple', 'does'],
  },

  en_s1u5_n3_068_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'She does not usually wear a traditional dress.',
    audioText: 'She does not usually wear a traditional dress.',
    answerI18n: L(
      '그녀는 보통 전통 드레스를 입지 않아요',
      'U odatda an’anaviy ko‘ylak kiymaydi',
      'She does not usually wear a traditional dress',
      'Она обычно не носит традиционное платье',
    ),
    options: [
      'She',
      'does',
      'not',
      'usually',
      'wear',
      'a',
      'traditional',
      'dress',
      'do',
    ],
    optionsI18n: {
      ko: ['그녀는', '보통', '전통', '드레스를', '입지', '않아요', '항상'],
      uz: ['U', 'odatda', 'an’anaviy', 'ko‘ylak', 'kiymaydi', 'har doim'],
      en: [
        'She',
        'does',
        'not',
        'usually',
        'wear',
        'a',
        'traditional',
        'dress',
        'do',
      ],
      ru: ['Она', 'обычно', 'не', 'носит', 'традиционное', 'платье', 'всегда'],
    },
    answerTranslation: L(
      '그녀는 보통 전통 드레스를 입지 않아요.',
      'U odatda an’anaviy ko‘ylak kiymaydi.',
      'She does not usually wear a traditional dress.',
      'Она обычно не носит традиционное платье.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['present-simple', 'negative', 'traditional'],
  },

  en_s1u5_n3_069_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Do you always wear shoes in the street?',
    options: ['Yes', 'I', 'do', 'always', 'wear', 'shoes', 'does'],
    answer: 'Yes I always wear shoes',
    answerTranslation: L(
      '네, 저는 항상 신발을 신어요.',
      'Ha, men har doim poyabzal kiyaman.',
      'Yes, I always wear shoes.',
      'Да, я всегда ношу обувь.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['present-simple', 'always', 'reply'],
  },

  en_s1u5_n3_070_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'arm',
    choices: [
      { text: 'arm', label: '💪', emoji: '💪', imageUrl: '' },
      { text: 'hand', label: '✋', emoji: '✋', imageUrl: '' },
      { text: 'leg', label: '🦵', emoji: '🦵', imageUrl: '' },
      { text: 'foot', label: '🦶', emoji: '🦶', imageUrl: '' },
    ],
    answerTranslation: L('팔', 'qo‘l', 'arm', 'рука'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['body-parts', 'arm'],
  },

  en_s1u5_n3_071_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'Her',
      'style',
      'is',
      'really',
      'colourful',
      'traditional',
      'wear',
    ],
    answer: 'Her style is really colourful',
    answerTranslation: L(
      '그녀의 스타일은 정말 화려해요.',
      'Uning uslubi juda rang-barang.',
      'Her style is really colourful.',
      'Её стиль очень яркий.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['style', 'really', 'colourful'],
  },

  en_s1u5_n3_072_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'body',
        native: 'tana',
        nativeI18n: L('몸', 'tana', 'body', 'тело'),
      },
      {
        text: 'hand',
        native: 'qo‘l panjasi',
        nativeI18n: L('손', 'qo‘l panjasi', 'hand', 'кисть руки'),
      },
      {
        text: 'leg',
        native: 'oyoq',
        nativeI18n: L('다리', 'oyoq', 'leg', 'нога'),
      },
      {
        text: 'very',
        native: 'juda',
        nativeI18n: L('매우', 'juda', 'very', 'очень'),
      },
      {
        text: 'really',
        native: 'juda',
        nativeI18n: L('정말', 'juda', 'really', 'действительно'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['review', 'matching'],
  },

  en_s1u5_n3_073_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'arm',
        native: 'qo‘l',
        nativeI18n: L('팔', 'qo‘l', 'arm', 'рука'),
      },
      {
        text: 'face',
        native: 'yuz',
        nativeI18n: L('얼굴', 'yuz', 'face', 'лицо'),
      },
      {
        text: 'hair',
        native: 'soch',
        nativeI18n: L('머리카락', 'soch', 'hair', 'волосы'),
      },
      {
        text: 'head',
        native: 'bosh',
        nativeI18n: L('머리', 'bosh', 'head', 'голова'),
      },
      {
        text: 'foot',
        native: 'oyoq panjasi',
        nativeI18n: L('발', 'oyoq panjasi', 'foot', 'ступня'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['body-parts', 'review', 'listening'],
  },

  en_s1u5_n3_074_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['Why', 'do', 'they', 'wear', 'traditional', 'clothes', 'does'],
    answer: 'Why do they wear traditional clothes',
    audioText: 'Why do they wear traditional clothes?',
    answerTranslation: L(
      '그들은 왜 전통 옷을 입어요?',
      'Ular nega an’anaviy kiyim kiyadi?',
      'Why do they wear traditional clothes?',
      'Почему они носят традиционную одежду?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['present-simple', 'why', 'traditional'],
  },

  en_s1u5_n3_075_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'They have really long hair.',
    audioText: 'They have really long hair.',
    answerTranslation: L(
      '그들은 머리가 정말 길어요.',
      'Ularning sochi juda uzun.',
      'They have really long hair.',
      'У них очень длинные волосы.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['hair', 'really'],
  },

  en_s1u5_n3_076_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'They ___ always wear shoes.',
    blankAnswers: ['don’t'],
    options: ['don’t', 'doesn’t', 'do', 'does'],
    answer: 'don’t',
    answerTranslation: L(
      '그들은 항상 신발을 신는 것은 아니에요.',
      'Ular har doim ham poyabzal kiymaydi.',
      'They don’t always wear shoes.',
      'Они не всегда носят обувь.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple', 'dont', 'always'],
  },

  en_s1u5_n3_077_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'hand',
    choices: [
      { text: 'hand', label: '✋', emoji: '✋', imageUrl: '' },
      { text: 'arm', label: '💪', emoji: '💪', imageUrl: '' },
      { text: 'foot', label: '🦶', emoji: '🦶', imageUrl: '' },
      { text: 'head', label: '👤', emoji: '👤', imageUrl: '' },
    ],
    answerTranslation: L('손', 'qo‘l panjasi', 'hand', 'кисть руки'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['body-parts', 'hand'],
  },

  en_s1u5_n3_078_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What style do you like?',
    options: ['I', 'like', 'traditional', 'style', 'does', 'wear'],
    answer: 'I like traditional style',
    answerTranslation: L(
      '저는 전통적인 스타일을 좋아해요.',
      'Menga an’anaviy uslub yoqadi.',
      'I like traditional style.',
      'Мне нравится традиционный стиль.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['style', 'traditional', 'reply'],
  },

  en_s1u5_n3_079_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'She',
      'has',
      'a',
      'really',
      'interesting',
      'hairstyle',
      'does',
      'wear',
    ],
    answer: 'She has a really interesting hairstyle',
    answerTranslation: L(
      '그녀는 정말 흥미로운 헤어스타일을 하고 있어요.',
      'Uning juda qiziqarli soch turmagi bor.',
      'She has a really interesting hairstyle.',
      'У неё очень интересная причёска.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['hairstyle', 'really', 'style'],
  },

  en_s1u5_n3_080_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Do you like her style?' }],
    options: [
      'Yes, I do. It’s really colourful.',
      'Yes, I does. It really colour.',
      'Yes, she do colourful.',
      'Yes, style wears really.',
    ],
    answer: 'Yes, I do. It’s really colourful.',
    answerTranslation: L(
      '네, 좋아해요. 정말 화려해요.',
      'Ha, yoqadi. U juda rang-barang.',
      'Yes, I do. It’s really colourful.',
      'Да. Он очень яркий.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['style', 'really', 'present-simple', 'final'],
  },
};

export const EN_S1_UNIT5_NODE3 = {
  title: L(
    '세계의 다양한 스타일',
    'Dunyo uslublari',
    'Styles around the world',
    'Стили со всего мира',
  ),
  section: 1,
  unit: 5,
  order: 3,
  isActive: true,

  lessons: [
    {
      title: L(
        '현재시제 완성하기',
        'Hozirgi zamonni mustahkamlash',
        'Present simple: all forms',
        'Present Simple: все формы',
      ),
      description: L(
        '현재시제의 긍정문, 부정문, do/does 의문문을 스타일과 옷 표현으로 연습해요.',
        'Hozirgi zamonning tasdiq, inkor va do/does savol shakllarini kiyim va uslub mavzusida mashq qilasiz.',
        'Practice positive, negative and do/does question forms of the present simple through clothes and style.',
        'Практикуем утвердительные, отрицательные формы и вопросы с do/does на теме одежды и стиля.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 1,
      questions: [
        'en_s1u5_n3_001_speaking',
        'en_s1u5_n3_002_image_choice',
        'en_s1u5_n3_003_word_matching',
        'en_s1u5_n3_004_translate_builder',
        'en_s1u5_n3_005_word_arrange',
        'en_s1u5_n3_006_audio_match',
        'en_s1u5_n3_007_fill_in_blank',
        'en_s1u5_n3_008_sentence_builder',
        'en_s1u5_n3_009_reply_builder',
        'en_s1u5_n3_010_image_choice',
        'en_s1u5_n3_011_translate_builder',
        'en_s1u5_n3_012_word_matching',
        'en_s1u5_n3_013_word_arrange',
        'en_s1u5_n3_014_audio_match',
        'en_s1u5_n3_015_speaking',
        'en_s1u5_n3_016_fill_in_blank',
        'en_s1u5_n3_017_image_choice',
        'en_s1u5_n3_018_reply_builder',
        'en_s1u5_n3_019_translate_builder',
        'en_s1u5_n3_020_dialog_complete',
      ],
    },

    {
      title: L('신체 부위', 'Tana qismlari', 'Parts of the body', 'Части тела'),
      description: L(
        'arm, hand, leg, foot, face, hair, head, body를 익히고 사람의 모습을 묘사해요.',
        'arm, hand, leg, foot, face, hair, head va body so‘zlarini o‘rganib, odamlarning tashqi ko‘rinishini tasvirlaysiz.',
        'Learn arm, hand, leg, foot, face, hair, head and body and use them to describe people.',
        'Изучаем arm, hand, leg, foot, face, hair, head и body и описываем внешность людей.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 2,
      questions: [
        'en_s1u5_n3_021_speaking',
        'en_s1u5_n3_022_image_choice',
        'en_s1u5_n3_023_word_matching',
        'en_s1u5_n3_024_translate_builder',
        'en_s1u5_n3_025_word_arrange',
        'en_s1u5_n3_026_audio_match',
        'en_s1u5_n3_027_fill_in_blank',
        'en_s1u5_n3_028_sentence_builder',
        'en_s1u5_n3_029_reply_builder',
        'en_s1u5_n3_030_image_choice',
        'en_s1u5_n3_031_translate_builder',
        'en_s1u5_n3_032_word_matching',
        'en_s1u5_n3_033_word_arrange',
        'en_s1u5_n3_034_audio_match',
        'en_s1u5_n3_035_speaking',
        'en_s1u5_n3_036_fill_in_blank',
        'en_s1u5_n3_037_image_choice',
        'en_s1u5_n3_038_reply_builder',
        'en_s1u5_n3_039_translate_builder',
        'en_s1u5_n3_040_dialog_complete',
      ],
    },

    {
      title: L(
        '정말, 아주',
        'Juda va rostdan ham',
        'Very and really',
        'Very и really',
      ),
      description: L(
        'very와 really를 형용사 앞에 사용해 옷, 외모, 스타일을 더 자연스럽게 묘사해요.',
        'very va really so‘zlarini sifatlar oldida ishlatib, kiyim va tashqi ko‘rinishni tabiiyroq tasvirlaysiz.',
        'Use very and really before adjectives to describe clothes, appearance and style more naturally.',
        'Используем very и really перед прилагательными, чтобы естественнее описывать одежду, внешность и стиль.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 3,
      questions: [
        'en_s1u5_n3_041_speaking',
        'en_s1u5_n3_042_image_choice',
        'en_s1u5_n3_043_word_matching',
        'en_s1u5_n3_044_translate_builder',
        'en_s1u5_n3_045_word_arrange',
        'en_s1u5_n3_046_audio_match',
        'en_s1u5_n3_047_fill_in_blank',
        'en_s1u5_n3_048_sentence_builder',
        'en_s1u5_n3_049_reply_builder',
        'en_s1u5_n3_050_image_choice',
        'en_s1u5_n3_051_translate_builder',
        'en_s1u5_n3_052_word_matching',
        'en_s1u5_n3_053_word_arrange',
        'en_s1u5_n3_054_audio_match',
        'en_s1u5_n3_055_speaking',
        'en_s1u5_n3_056_fill_in_blank',
        'en_s1u5_n3_057_image_choice',
        'en_s1u5_n3_058_reply_builder',
        'en_s1u5_n3_059_translate_builder',
        'en_s1u5_n3_060_dialog_complete',
      ],
    },

    {
      title: L(
        '스타일과 패션 말하기',
        'Uslub va moda haqida gapirish',
        'Talk about style and fashion',
        'Говорим о стиле и моде',
      ),
      description: L(
        '현재시제, 신체 부위, 스타일 어휘, very와 really를 함께 사용해 사람들의 패션을 설명해요.',
        'Hozirgi zamon, tana qismlari, uslub so‘zlari hamda very va really yordamida odamlarning kiyinish uslubini tasvirlaysiz.',
        'Combine the present simple, body vocabulary, style words, very and really to talk about fashion.',
        'Соединяем Present Simple, части тела, лексику стиля, very и really для разговора о моде.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 4,
      questions: [
        'en_s1u5_n3_061_speaking',
        'en_s1u5_n3_062_image_choice',
        'en_s1u5_n3_063_word_matching',
        'en_s1u5_n3_064_translate_builder',
        'en_s1u5_n3_065_word_arrange',
        'en_s1u5_n3_066_audio_match',
        'en_s1u5_n3_067_fill_in_blank',
        'en_s1u5_n3_068_sentence_builder',
        'en_s1u5_n3_069_reply_builder',
        'en_s1u5_n3_070_image_choice',
        'en_s1u5_n3_071_translate_builder',
        'en_s1u5_n3_072_word_matching',
        'en_s1u5_n3_073_audio_match',
        'en_s1u5_n3_074_word_arrange',
        'en_s1u5_n3_075_speaking',
        'en_s1u5_n3_076_fill_in_blank',
        'en_s1u5_n3_077_image_choice',
        'en_s1u5_n3_078_reply_builder',
        'en_s1u5_n3_079_translate_builder',
        'en_s1u5_n3_080_dialog_complete',
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Section 1 · Unit 5 · Node 4
// 5.4 Speaking and writing
//
// Coverage
// - asking for and giving travel information
// - ticket / metro / station / platform / gate / flight / stop
// - buy / leave / arrive / next / single
// - travel announcements
// - asking about price, time, destination
// - making arrangements by text
// - text / email / busy / meet / cinema / concert / camera
// - short natural text-message replies
//
// Existing words reused, not duplicated:
// bus / train / airport / journey / price / pharmacy / phone
//
// *_WORDS에는 단어만 등록.
// 문장/구문은 examples/questions에서만 사용.
// 4 lessons × 20 questions = 80
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT5_NODE4_WORDS = [
  {
    code: 'en-travel-ticket',
    english: 'ticket',
    senseKey: 'travel-entry-document',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '표; 티켓',
      'chipta',
      'a document that allows you to travel or enter a place',
      'билет',
    ),
    examples: [
      {
        english: 'Where do I buy a ticket?',
        translations: L(
          '표는 어디에서 사요?',
          'Chiptani qayerdan sotib olaman?',
          'Where do I buy a ticket?',
          'Где я могу купить билет?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈtɪkɪt/',
      ttsText: 'ticket',
    },
    media: {
      emoji: '🎫',
      imageUrl: '',
      imageAlt: L('티켓', 'chipta', 'a ticket', 'билет'),
    },
    tags: ['travel', 'transport'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-transport-metro',
    english: 'metro',
    senseKey: 'city-underground-railway',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('지하철', 'metro', 'a city railway system', 'метро'),
    examples: [
      {
        english: 'The next metro leaves at nine.',
        translations: L(
          '다음 지하철은 9시에 출발해요.',
          'Keyingi metro soat to‘qqizda jo‘naydi.',
          'The next metro leaves at nine.',
          'Следующий поезд метро отправляется в девять.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈmetrəʊ/',
      ttsText: 'metro',
    },
    media: {
      emoji: '🚇',
      imageUrl: '',
      imageAlt: L('지하철', 'metro', 'a metro train', 'метро'),
    },
    tags: ['travel', 'transport'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-place-station',
    english: 'station',
    senseKey: 'public-transport-station',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '역; 정류장',
      'vokzal; bekat',
      'a place where trains or other transport stop',
      'станция; вокзал',
    ),
    examples: [
      {
        english: 'The station is near the hotel.',
        translations: L(
          '역은 호텔 근처에 있어요.',
          'Vokzal mehmonxona yaqinida.',
          'The station is near the hotel.',
          'Станция находится рядом с отелем.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈsteɪʃən/',
      ttsText: 'station',
    },
    media: {
      emoji: '🚉',
      imageUrl: '',
      imageAlt: L('역', 'vokzal', 'a station', 'станция'),
    },
    tags: ['travel', 'places'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-travel-platform',
    english: 'platform',
    senseKey: 'train-boarding-area',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '승강장; 플랫폼',
      'platforma',
      'the area where passengers get on a train',
      'платформа',
    ),
    examples: [
      {
        english: 'The train leaves from platform seven.',
        translations: L(
          '기차는 7번 승강장에서 출발해요.',
          'Poyezd yettinchi platformadan jo‘naydi.',
          'The train leaves from platform seven.',
          'Поезд отправляется с седьмой платформы.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈplætfɔːm/',
      ttsText: 'platform',
    },
    media: {
      emoji: '🚉',
      imageUrl: '',
      imageAlt: L(
        '기차 승강장',
        'poyezd platformasi',
        'a train platform',
        'железнодорожная платформа',
      ),
    },
    tags: ['travel', 'station'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-travel-gate',
    english: 'gate',
    senseKey: 'airport-boarding-gate',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '탑승구; 게이트',
      'chiqish darvozasi',
      'the place at an airport where passengers board',
      'выход на посадку',
    ),
    examples: [
      {
        english: 'The flight leaves from gate A10.',
        translations: L(
          '비행기는 A10 게이트에서 출발해요.',
          'Reys A10 chiqish darvozasidan jo‘naydi.',
          'The flight leaves from gate A10.',
          'Рейс отправляется от выхода A10.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɡeɪt/',
      ttsText: 'gate',
    },
    media: {
      emoji: '🚪',
      imageUrl: '',
      imageAlt: L(
        '공항 탑승구',
        'aeroport chiqish darvozasi',
        'an airport gate',
        'выход на посадку',
      ),
    },
    tags: ['travel', 'airport'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-travel-flight',
    english: 'flight',
    senseKey: 'journey-by-plane',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('항공편; 비행', 'reys', 'a journey by plane', 'рейс; полёт'),
    examples: [
      {
        english: 'The flight leaves at eight.',
        translations: L(
          '항공편은 8시에 출발해요.',
          'Reys soat sakkizda jo‘naydi.',
          'The flight leaves at eight.',
          'Рейс отправляется в восемь.',
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
      imageAlt: L('항공편', 'reys', 'a flight', 'рейс'),
    },
    tags: ['travel', 'airport'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-transport-stop',
    english: 'stop',
    senseKey: 'public-transport-stop',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '정류장',
      'bekat',
      'a place where a bus or other transport stops',
      'остановка',
    ),
    examples: [
      {
        english: 'The bus stop is near the bank.',
        translations: L(
          '버스 정류장은 은행 근처에 있어요.',
          'Avtobus bekati bank yaqinida.',
          'The bus stop is near the bank.',
          'Автобусная остановка находится рядом с банком.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/stɒp/',
      ttsText: 'stop',
    },
    media: {
      emoji: '🚏',
      imageUrl: '',
      imageAlt: L(
        '버스 정류장',
        'avtobus bekati',
        'a bus stop',
        'автобусная остановка',
      ),
    },
    tags: ['travel', 'transport'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-buy',
    english: 'buy',
    senseKey: 'get-by-paying-money',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '사다',
      'sotib olmoq',
      'to get something by paying money',
      'покупать',
    ),
    examples: [
      {
        english: 'I buy my ticket on the bus.',
        translations: L(
          '저는 버스에서 표를 사요.',
          'Men chiptani avtobusda sotib olaman.',
          'I buy my ticket on the bus.',
          'Я покупаю билет в автобусе.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/baɪ/',
      ttsText: 'buy',
    },
    media: {
      emoji: '💳',
      imageUrl: '',
      imageAlt: L(
        '물건을 사는 모습',
        'xarid qilish',
        'buying something',
        'покупка',
      ),
    },
    tags: ['verbs', 'shopping', 'travel'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-leave',
    english: 'leave',
    senseKey: 'depart-from-place',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '떠나다; 출발하다',
      'jo‘namoq',
      'to go away from a place',
      'уезжать; отправляться',
    ),
    examples: [
      {
        english: 'The train leaves at eleven.',
        translations: L(
          '기차는 11시에 출발해요.',
          'Poyezd soat o‘n birda jo‘naydi.',
          'The train leaves at eleven.',
          'Поезд отправляется в одиннадцать.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/liːv/',
      ttsText: 'leave',
    },
    media: {
      emoji: '🚆',
      imageUrl: '',
      imageAlt: L(
        '출발하는 기차',
        'jo‘nayotgan poyezd',
        'a departing train',
        'отправляющийся поезд',
      ),
    },
    tags: ['travel', 'verbs'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-arrive',
    english: 'arrive',
    senseKey: 'reach-destination',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L('도착하다', 'yetib kelmoq', 'to reach a place', 'прибывать'),
    examples: [
      {
        english: 'It arrives at twelve thirty.',
        translations: L(
          '12시 30분에 도착해요.',
          'U soat o‘n ikki yarimda yetib keladi.',
          'It arrives at twelve thirty.',
          'Он прибывает в двенадцать тридцать.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/əˈraɪv/',
      ttsText: 'arrive',
    },
    media: {
      emoji: '🏁',
      imageUrl: '',
      imageAlt: L('도착', 'yetib kelish', 'arrival', 'прибытие'),
    },
    tags: ['travel', 'verbs'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-travel-single',
    english: 'single',
    senseKey: 'one-way-ticket',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '편도의',
      'bir tomonlama',
      'for a journey in one direction',
      'в одну сторону',
    ),
    examples: [
      {
        english: 'A single ticket is two euros.',
        translations: L(
          '편도표는 2유로예요.',
          'Bir tomonlama chipta ikki yevro turadi.',
          'A single ticket is two euros.',
          'Билет в одну сторону стоит два евро.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈsɪŋɡəl/',
      ttsText: 'single',
    },
    media: {
      emoji: '➡️',
      imageUrl: '',
      imageAlt: L(
        '편도 여행',
        'bir tomonlama safar',
        'a one-way journey',
        'поездка в одну сторону',
      ),
    },
    tags: ['travel', 'tickets'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-next',
    english: 'next',
    senseKey: 'coming-after-current',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '다음의',
      'keyingi',
      'coming immediately after this one',
      'следующий',
    ),
    examples: [
      {
        english: 'What time is the next train?',
        translations: L(
          '다음 기차는 몇 시예요?',
          'Keyingi poyezd soat nechada?',
          'What time is the next train?',
          'Во сколько следующий поезд?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/nekst/',
      ttsText: 'next',
    },
    media: {
      emoji: '⏭️',
      imageUrl: '',
      imageAlt: L('다음', 'keyingi', 'next', 'следующий'),
    },
    tags: ['time', 'travel'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-machine',
    english: 'machine',
    senseKey: 'mechanical-device',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '기계',
      'mashina; qurilma',
      'a device that does a particular job',
      'аппарат; машина',
    ),
    examples: [
      {
        english: 'You buy the ticket from the machine.',
        translations: L(
          '기계에서 표를 사요.',
          'Chiptani qurilmadan sotib olasiz.',
          'You buy the ticket from the machine.',
          'Билет покупают в автомате.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/məˈʃiːn/',
      ttsText: 'machine',
    },
    media: {
      emoji: '🎟️',
      imageUrl: '',
      imageAlt: L(
        '티켓 기계',
        'chipta qurilmasi',
        'a ticket machine',
        'билетный автомат',
      ),
    },
    tags: ['travel', 'objects'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-travel-announcement',
    english: 'announcement',
    senseKey: 'public-spoken-information',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '안내 방송; 발표',
      'e’lon',
      'public spoken or written information',
      'объявление',
    ),
    examples: [
      {
        english: 'Listen to the travel announcement.',
        translations: L(
          '교통 안내 방송을 들으세요.',
          'Safar haqidagi e’lonni tinglang.',
          'Listen to the travel announcement.',
          'Послушайте транспортное объявление.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/əˈnaʊnsmənt/',
      ttsText: 'announcement',
    },
    media: {
      emoji: '📢',
      imageUrl: '',
      imageAlt: L('안내 방송', 'e’lon', 'an announcement', 'объявление'),
    },
    tags: ['travel', 'listening'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-text',
    english: 'text',
    senseKey: 'phone-message',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '문자 메시지',
      'matnli xabar',
      'a short message sent by phone',
      'текстовое сообщение',
    ),
    examples: [
      {
        english: 'I usually send a text.',
        translations: L(
          '저는 보통 문자를 보내요.',
          'Men odatda xabar yuboraman.',
          'I usually send a text.',
          'Я обычно отправляю сообщение.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/tekst/',
      ttsText: 'text',
    },
    media: {
      emoji: '💬',
      imageUrl: '',
      imageAlt: L('문자 메시지', 'xabar', 'a text message', 'сообщение'),
    },
    tags: ['communication'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-email',
    english: 'email',
    senseKey: 'electronic-message',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '이메일',
      'elektron xat',
      'a message sent electronically',
      'электронное письмо',
    ),
    examples: [
      {
        english: 'I sometimes send an email.',
        translations: L(
          '저는 가끔 이메일을 보내요.',
          'Men ba’zan elektron xat yuboraman.',
          'I sometimes send an email.',
          'Я иногда отправляю электронное письмо.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈiːmeɪl/',
      ttsText: 'email',
    },
    media: {
      emoji: '📧',
      imageUrl: '',
      imageAlt: L('이메일', 'elektron xat', 'an email', 'электронное письмо'),
    },
    tags: ['communication'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-busy',
    english: 'busy',
    senseKey: 'having-things-to-do',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('바쁜', 'band', 'having a lot to do', 'занятый'),
    examples: [
      {
        english: 'Are you busy on Saturday?',
        translations: L(
          '토요일에 바빠요?',
          'Shanba kuni bandmisiz?',
          'Are you busy on Saturday?',
          'Вы заняты в субботу?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈbɪzi/',
      ttsText: 'busy',
    },
    media: {
      emoji: '📅',
      imageUrl: '',
      imageAlt: L(
        '바쁜 일정',
        'band jadval',
        'a busy schedule',
        'плотный график',
      ),
    },
    tags: ['arrangements'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-meet',
    english: 'meet',
    senseKey: 'come-together',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '만나다',
      'uchrashmoq',
      'to come together with another person',
      'встречаться',
    ),
    examples: [
      {
        english: 'Can we meet at two?',
        translations: L(
          '2시에 만날 수 있어요?',
          'Soat ikkida uchrasha olamizmi?',
          'Can we meet at two?',
          'Мы можем встретиться в два?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/miːt/',
      ttsText: 'meet',
    },
    media: {
      emoji: '🤝',
      imageUrl: '',
      imageAlt: L('만남', 'uchrashuv', 'meeting someone', 'встреча'),
    },
    tags: ['arrangements', 'verbs'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-place-cinema',
    english: 'cinema',
    senseKey: 'movie-theatre',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '영화관',
      'kinoteatr',
      'a place where people watch films',
      'кинотеатр',
    ),
    examples: [
      {
        english: 'See you at the cinema.',
        translations: L(
          '영화관에서 봐요.',
          'Kinoteatrda ko‘rishamiz.',
          'See you at the cinema.',
          'Увидимся в кинотеатре.',
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
    tags: ['places', 'arrangements'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-event-concert',
    english: 'concert',
    senseKey: 'live-music-event',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '콘서트; 공연',
      'konsert',
      'an event where music is performed live',
      'концерт',
    ),
    examples: [
      {
        english: 'Do you want to go to a concert?',
        translations: L(
          '콘서트에 가고 싶어요?',
          'Konsertga borishni xohlaysizmi?',
          'Do you want to go to a concert?',
          'Хотите пойти на концерт?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkɒnsət/',
      ttsText: 'concert',
    },
    media: {
      emoji: '🎵',
      imageUrl: '',
      imageAlt: L('콘서트', 'konsert', 'a concert', 'концерт'),
    },
    tags: ['events', 'arrangements'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-object-camera',
    english: 'camera',
    senseKey: 'photo-taking-device',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '카메라',
      'kamera',
      'a device used to take photographs',
      'камера; фотоаппарат',
    ),
    examples: [
      {
        english: 'I want to buy a new camera.',
        translations: L(
          '새 카메라를 사고 싶어요.',
          'Men yangi kamera sotib olmoqchiman.',
          'I want to buy a new camera.',
          'Я хочу купить новую камеру.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkæmərə/',
      ttsText: 'camera',
    },
    media: {
      emoji: '📷',
      imageUrl: '',
      imageAlt: L('카메라', 'kamera', 'a camera', 'камера'),
    },
    tags: ['objects', 'shopping'],
    difficulty: 1,
    isCore: true,
  },
];

export const EN_S1_UNIT5_NODE4_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Ask for travel information
  // ===========================================================

  en_s1u5_n4_001_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Where do I buy a ticket?',
    audioText: 'Where do I buy a ticket?',
    answerTranslation: L(
      '표는 어디에서 사요?',
      'Chiptani qayerdan sotib olaman?',
      'Where do I buy a ticket?',
      'Где я могу купить билет?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['travel', 'ticket'],
  },

  en_s1u5_n4_002_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'ticket',
    choices: [
      { text: 'ticket', label: '🎫', emoji: '🎫', imageUrl: '' },
      { text: 'camera', label: '📷', emoji: '📷', imageUrl: '' },
      { text: 'phone', label: '📱', emoji: '📱', imageUrl: '' },
      { text: 'train', label: '🚆', emoji: '🚆', imageUrl: '' },
    ],
    answerTranslation: L('표', 'chipta', 'ticket', 'билет'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['travel', 'ticket'],
  },

  en_s1u5_n4_003_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'ticket',
        native: 'chipta',
        nativeI18n: L('표', 'chipta', 'ticket', 'билет'),
      },
      {
        text: 'metro',
        native: 'metro',
        nativeI18n: L('지하철', 'metro', 'metro', 'метро'),
      },
      {
        text: 'station',
        native: 'vokzal',
        nativeI18n: L('역', 'vokzal', 'station', 'станция'),
      },
      {
        text: 'platform',
        native: 'platforma',
        nativeI18n: L('승강장', 'platforma', 'platform', 'платформа'),
      },
      {
        text: 'stop',
        native: 'bekat',
        nativeI18n: L('정류장', 'bekat', 'stop', 'остановка'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['travel', 'matching'],
  },

  en_s1u5_n4_004_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['Where', 'do', 'I', 'buy', 'a', 'ticket', 'does', 'train'],
    answer: 'Where do I buy a ticket',
    answerTranslation: L(
      '표는 어디에서 사요?',
      'Chiptani qayerdan sotib olaman?',
      'Where do I buy a ticket?',
      'Где я могу купить билет?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['travel', 'ticket', 'buy'],
  },

  en_s1u5_n4_005_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['Does', 'this', 'bus', 'go', 'to', 'the', 'station', 'do'],
    answer: 'Does this bus go to the station',
    audioText: 'Does this bus go to the station?',
    answerTranslation: L(
      '이 버스는 역에 가요?',
      'Bu avtobus vokzalga boradimi?',
      'Does this bus go to the station?',
      'Этот автобус идёт до станции?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['travel', 'bus', 'station'],
  },

  en_s1u5_n4_006_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'ticket',
        native: 'chipta',
        nativeI18n: L('표', 'chipta', 'ticket', 'билет'),
      },
      {
        text: 'metro',
        native: 'metro',
        nativeI18n: L('지하철', 'metro', 'metro', 'метро'),
      },
      {
        text: 'station',
        native: 'vokzal',
        nativeI18n: L('역', 'vokzal', 'station', 'станция'),
      },
      {
        text: 'platform',
        native: 'platforma',
        nativeI18n: L('승강장', 'platforma', 'platform', 'платформа'),
      },
      {
        text: 'stop',
        native: 'bekat',
        nativeI18n: L('정류장', 'bekat', 'stop', 'остановка'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['travel', 'listening'],
  },

  en_s1u5_n4_007_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'metro',
    choices: [
      { text: 'bus', label: '🚌', emoji: '🚌', imageUrl: '' },
      { text: 'metro', label: '🚇', emoji: '🚇', imageUrl: '' },
      { text: 'flight', label: '✈️', emoji: '✈️', imageUrl: '' },
      { text: 'camera', label: '📷', emoji: '📷', imageUrl: '' },
    ],
    answerTranslation: L('지하철', 'metro', 'metro', 'метро'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['metro', 'transport'],
  },

  en_s1u5_n4_008_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Where do I buy a ticket?',
    options: ['You', 'buy', 'it', 'on', 'the', 'bus', 'does', 'leaves'],
    answer: 'You buy it on the bus',
    answerTranslation: L(
      '버스에서 사요.',
      'Uni avtobusda sotib olasiz.',
      'You buy it on the bus.',
      'Вы покупаете его в автобусе.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['ticket', 'buy', 'reply'],
  },

  en_s1u5_n4_009_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'What time is the ___ train?',
    blankAnswers: ['next'],
    options: ['next', 'single', 'buy', 'platform'],
    answer: 'next',
    answerTranslation: L(
      '다음 기차는 몇 시예요?',
      'Keyingi poyezd soat nechada?',
      'What time is the next train?',
      'Во сколько следующий поезд?',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['travel', 'next', 'train'],
  },

  en_s1u5_n4_010_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'The next train leaves at nine thirty.',
    audioText: 'The next train leaves at nine thirty.',
    answerI18n: L(
      '다음 기차는 9시 30분에 출발해요',
      'Keyingi poyezd soat to‘qqiz yarimda jo‘naydi',
      'The next train leaves at nine thirty',
      'Следующий поезд отправляется в девять тридцать',
    ),
    options: [
      'The',
      'next',
      'train',
      'leaves',
      'at',
      'nine',
      'thirty',
      'arrives',
    ],
    optionsI18n: {
      ko: ['다음', '기차는', '9시', '30분에', '출발해요', '도착해요'],
      uz: [
        'Keyingi',
        'poyezd',
        'soat',
        'to‘qqiz',
        'yarimda',
        'jo‘naydi',
        'yetib keladi',
      ],
      en: ['The', 'next', 'train', 'leaves', 'at', 'nine', 'thirty', 'arrives'],
      ru: [
        'Следующий',
        'поезд',
        'отправляется',
        'в',
        'девять',
        'тридцать',
        'прибывает',
      ],
    },
    answerTranslation: L(
      '다음 기차는 9시 30분에 출발해요.',
      'Keyingi poyezd soat to‘qqiz yarimda jo‘naydi.',
      'The next train leaves at nine thirty.',
      'Следующий поезд отправляется в девять тридцать.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['train', 'leave', 'time'],
  },

  en_s1u5_n4_011_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'station',
    choices: [
      { text: 'station', label: '🚉', emoji: '🚉', imageUrl: '' },
      { text: 'cinema', label: '🎬', emoji: '🎬', imageUrl: '' },
      { text: 'pharmacy', label: '💊', emoji: '💊', imageUrl: '' },
      { text: 'camera', label: '📷', emoji: '📷', imageUrl: '' },
    ],
    answerTranslation: L('역', 'vokzal', 'station', 'станция'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['station', 'travel'],
  },

  en_s1u5_n4_012_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'buy',
        native: 'sotib olmoq',
        nativeI18n: L('사다', 'sotib olmoq', 'buy', 'покупать'),
      },
      {
        text: 'leave',
        native: 'jo‘namoq',
        nativeI18n: L('출발하다', 'jo‘namoq', 'leave', 'отправляться'),
      },
      {
        text: 'arrive',
        native: 'yetib kelmoq',
        nativeI18n: L('도착하다', 'yetib kelmoq', 'arrive', 'прибывать'),
      },
      {
        text: 'next',
        native: 'keyingi',
        nativeI18n: L('다음의', 'keyingi', 'next', 'следующий'),
      },
      {
        text: 'single',
        native: 'bir tomonlama',
        nativeI18n: L('편도의', 'bir tomonlama', 'one-way', 'в одну сторону'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['travel', 'verbs', 'matching'],
  },

  en_s1u5_n4_013_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['How', 'much', 'is', 'a', 'single', 'ticket', 'where', 'does'],
    answer: 'How much is a single ticket',
    answerTranslation: L(
      '편도표는 얼마예요?',
      'Bir tomonlama chipta qancha turadi?',
      'How much is a single ticket?',
      'Сколько стоит билет в одну сторону?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['ticket', 'single', 'price'],
  },

  en_s1u5_n4_014_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'buy',
        native: 'sotib olmoq',
        nativeI18n: L('사다', 'sotib olmoq', 'buy', 'покупать'),
      },
      {
        text: 'leave',
        native: 'jo‘namoq',
        nativeI18n: L('출발하다', 'jo‘namoq', 'leave', 'отправляться'),
      },
      {
        text: 'arrive',
        native: 'yetib kelmoq',
        nativeI18n: L('도착하다', 'yetib kelmoq', 'arrive', 'прибывать'),
      },
      {
        text: 'next',
        native: 'keyingi',
        nativeI18n: L('다음', 'keyingi', 'next', 'следующий'),
      },
      {
        text: 'single',
        native: 'bir tomonlama',
        nativeI18n: L('편도', 'bir tomonlama', 'single', 'в одну сторону'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['travel', 'listening'],
  },

  en_s1u5_n4_015_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['It', 'arrives', 'at', 'twelve', 'thirty', 'leaves', 'does'],
    answer: 'It arrives at twelve thirty',
    audioText: 'It arrives at twelve thirty.',
    answerTranslation: L(
      '12시 30분에 도착해요.',
      'U soat o‘n ikki yarimda yetib keladi.',
      'It arrives at twelve thirty.',
      'Он прибывает в двенадцать тридцать.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['arrive', 'time', 'travel'],
  },

  en_s1u5_n4_016_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'machine',
    choices: [
      { text: 'machine', label: '🎟️', emoji: '🎟️', imageUrl: '' },
      { text: 'camera', label: '📷', emoji: '📷', imageUrl: '' },
      { text: 'phone', label: '📱', emoji: '📱', imageUrl: '' },
      { text: 'ticket', label: '🎫', emoji: '🎫', imageUrl: '' },
    ],
    answerTranslation: L('기계', 'qurilma', 'machine', 'автомат'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['machine', 'ticket'],
  },

  en_s1u5_n4_017_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The train leaves from platform seven.',
    audioText: 'The train leaves from platform seven.',
    answerTranslation: L(
      '기차는 7번 승강장에서 출발해요.',
      'Poyezd yettinchi platformadan jo‘naydi.',
      'The train leaves from platform seven.',
      'Поезд отправляется с седьмой платформы.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['train', 'platform', 'leave'],
  },

  en_s1u5_n4_018_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What time does the train leave?',
    options: ['It', 'leaves', 'at', 'eleven', 'forty-five', 'arrives', 'does'],
    answer: 'It leaves at eleven forty-five',
    answerTranslation: L(
      '11시 45분에 출발해요.',
      'U soat o‘n bir qirq beshda jo‘naydi.',
      'It leaves at eleven forty-five.',
      'Он отправляется в одиннадцать сорок пять.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['leave', 'time', 'reply'],
  },

  en_s1u5_n4_019_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The train ___ from platform seven.',
    blankAnswers: ['leaves'],
    options: ['leaves', 'arrive', 'buy', 'single'],
    answer: 'leaves',
    answerTranslation: L(
      '기차는 7번 승강장에서 출발해요.',
      'Poyezd yettinchi platformadan jo‘naydi.',
      'The train leaves from platform seven.',
      'Поезд отправляется с седьмой платформы.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['leave', 'platform'],
  },

  en_s1u5_n4_020_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'How much is it to the airport?' }],
    options: [
      'It’s fifteen euros.',
      'It leaves at fifteen.',
      'It is platform fifteen.',
      'You buy fifteen.',
    ],
    answer: 'It’s fifteen euros.',
    answerTranslation: L(
      '15유로예요.',
      'O‘n besh yevro.',
      'It’s fifteen euros.',
      'Пятнадцать евро.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['price', 'travel', 'dialog'],
  },

  // ===========================================================
  // Lesson 2 · Travel announcements
  // ===========================================================

  en_s1u5_n4_021_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Flight BA sixty-six leaves from gate nine.',
    audioText: 'Flight BA sixty-six leaves from gate nine.',
    answerTranslation: L(
      'BA66편은 9번 게이트에서 출발해요.',
      'BA oltmish olti reysi to‘qqizinchi chiqish darvozasidan jo‘naydi.',
      'Flight BA sixty-six leaves from gate nine.',
      'Рейс BA шестьдесят шесть отправляется от выхода девять.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['flight', 'gate', 'announcement'],
  },

  en_s1u5_n4_022_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'flight',
    choices: [
      { text: 'flight', label: '✈️', emoji: '✈️', imageUrl: '' },
      { text: 'metro', label: '🚇', emoji: '🚇', imageUrl: '' },
      { text: 'bus', label: '🚌', emoji: '🚌', imageUrl: '' },
      { text: 'ticket', label: '🎫', emoji: '🎫', imageUrl: '' },
    ],
    answerTranslation: L('항공편', 'reys', 'flight', 'рейс'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['flight', 'airport'],
  },

  en_s1u5_n4_023_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'platform',
        native: 'platforma',
        nativeI18n: L('승강장', 'platforma', 'platform', 'платформа'),
      },
      {
        text: 'gate',
        native: 'chiqish darvozasi',
        nativeI18n: L('탑승구', 'chiqish darvozasi', 'gate', 'выход'),
      },
      {
        text: 'flight',
        native: 'reys',
        nativeI18n: L('항공편', 'reys', 'flight', 'рейс'),
      },
      {
        text: 'stop',
        native: 'bekat',
        nativeI18n: L('정류장', 'bekat', 'stop', 'остановка'),
      },
      {
        text: 'announcement',
        native: 'e’lon',
        nativeI18n: L('안내 방송', 'e’lon', 'announcement', 'объявление'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['travel', 'announcements', 'matching'],
  },

  en_s1u5_n4_024_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'The',
      'flight',
      'leaves',
      'from',
      'gate',
      'A10',
      'platform',
      'arrives',
    ],
    answer: 'The flight leaves from gate A10',
    answerTranslation: L(
      '항공편은 A10 게이트에서 출발해요.',
      'Reys A10 chiqish darvozasidan jo‘naydi.',
      'The flight leaves from gate A10.',
      'Рейс отправляется от выхода A10.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['flight', 'gate'],
  },

  en_s1u5_n4_025_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'The',
      'train',
      'is',
      'fifteen',
      'minutes',
      'late',
      'gate',
      'flight',
    ],
    answer: 'The train is fifteen minutes late',
    audioText: 'The train is fifteen minutes late.',
    answerTranslation: L(
      '기차가 15분 늦어요.',
      'Poyezd o‘n besh daqiqa kechikdi.',
      'The train is fifteen minutes late.',
      'Поезд опаздывает на пятнадцать минут.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['announcement', 'train', 'time'],
  },

  en_s1u5_n4_026_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'platform',
        native: 'platforma',
        nativeI18n: L('승강장', 'platforma', 'platform', 'платформа'),
      },
      {
        text: 'gate',
        native: 'chiqish darvozasi',
        nativeI18n: L('탑승구', 'chiqish darvozasi', 'gate', 'выход'),
      },
      {
        text: 'flight',
        native: 'reys',
        nativeI18n: L('항공편', 'reys', 'flight', 'рейс'),
      },
      {
        text: 'stop',
        native: 'bekat',
        nativeI18n: L('정류장', 'bekat', 'stop', 'остановка'),
      },
      {
        text: 'announcement',
        native: 'e’lon',
        nativeI18n: L('안내 방송', 'e’lon', 'announcement', 'объявление'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['announcement', 'listening'],
  },

  en_s1u5_n4_027_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'gate',
    choices: [
      { text: 'gate', label: '🚪', emoji: '🚪', imageUrl: '' },
      { text: 'platform', label: '🚉', emoji: '🚉', imageUrl: '' },
      { text: 'stop', label: '🚏', emoji: '🚏', imageUrl: '' },
      { text: 'ticket', label: '🎫', emoji: '🎫', imageUrl: '' },
    ],
    answerTranslation: L(
      '탑승구',
      'chiqish darvozasi',
      'gate',
      'выход на посадку',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['airport', 'gate'],
  },

  en_s1u5_n4_028_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'The bus leaves from stop twelve.',
    audioText: 'The bus leaves from stop twelve.',
    answerI18n: L(
      '버스는 12번 정류장에서 출발해요',
      'Avtobus o‘n ikkinchi bekatdan jo‘naydi',
      'The bus leaves from stop twelve',
      'Автобус отправляется от остановки двенадцать',
    ),
    options: [
      'The',
      'bus',
      'leaves',
      'from',
      'stop',
      'twelve',
      'gate',
      'arrives',
    ],
    optionsI18n: {
      ko: [
        '버스는',
        '12번',
        '정류장에서',
        '출발해요',
        '게이트에서',
        '도착해요',
      ],
      uz: [
        'Avtobus',
        'o‘n ikkinchi',
        'bekatdan',
        'jo‘naydi',
        'darvozadan',
        'yetib keladi',
      ],
      en: ['The', 'bus', 'leaves', 'from', 'stop', 'twelve', 'gate', 'arrives'],
      ru: [
        'Автобус',
        'отправляется',
        'от',
        'остановки',
        'двенадцать',
        'выхода',
        'прибывает',
      ],
    },
    answerTranslation: L(
      '버스는 12번 정류장에서 출발해요.',
      'Avtobus o‘n ikkinchi bekatdan jo‘naydi.',
      'The bus leaves from stop twelve.',
      'Автобус отправляется от остановки двенадцать.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['bus', 'stop', 'leave'],
  },

  en_s1u5_n4_029_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Flight EZ402 leaves from ___ A10.',
    blankAnswers: ['gate'],
    options: ['gate', 'platform', 'ticket', 'metro'],
    answer: 'gate',
    answerTranslation: L(
      'EZ402편은 A10 게이트에서 출발해요.',
      'EZ402 reysi A10 chiqish darvozasidan jo‘naydi.',
      'Flight EZ402 leaves from gate A10.',
      'Рейс EZ402 отправляется от выхода A10.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['flight', 'gate'],
  },

  en_s1u5_n4_030_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Which platform does the train leave from?',
    options: ['It', 'leaves', 'from', 'platform', 'three', 'gate', 'arrives'],
    answer: 'It leaves from platform three',
    answerTranslation: L(
      '3번 승강장에서 출발해요.',
      'U uchinchi platformadan jo‘naydi.',
      'It leaves from platform three.',
      'Он отправляется с третьей платформы.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['platform', 'train', 'reply'],
  },

  en_s1u5_n4_031_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'platform',
    choices: [
      { text: 'platform', label: '🚉', emoji: '🚉', imageUrl: '' },
      { text: 'gate', label: '🚪', emoji: '🚪', imageUrl: '' },
      { text: 'flight', label: '✈️', emoji: '✈️', imageUrl: '' },
      { text: 'camera', label: '📷', emoji: '📷', imageUrl: '' },
    ],
    answerTranslation: L('승강장', 'platforma', 'platform', 'платформа'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['platform', 'station'],
  },

  en_s1u5_n4_032_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'leave',
        native: 'jo‘namoq',
        nativeI18n: L('출발하다', 'jo‘namoq', 'leave', 'отправляться'),
      },
      {
        text: 'arrive',
        native: 'yetib kelmoq',
        nativeI18n: L('도착하다', 'yetib kelmoq', 'arrive', 'прибывать'),
      },
      {
        text: 'flight',
        native: 'reys',
        nativeI18n: L('항공편', 'reys', 'flight', 'рейс'),
      },
      {
        text: 'platform',
        native: 'platforma',
        nativeI18n: L('승강장', 'platforma', 'platform', 'платформа'),
      },
      {
        text: 'gate',
        native: 'chiqish darvozasi',
        nativeI18n: L('탑승구', 'chiqish darvozasi', 'gate', 'выход'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['travel', 'review', 'matching'],
  },

  en_s1u5_n4_033_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'The',
      'flight',
      'arrives',
      'at',
      'four',
      'fifteen',
      'leaves',
      'platform',
    ],
    answer: 'The flight arrives at four fifteen',
    answerTranslation: L(
      '항공편은 4시 15분에 도착해요.',
      'Reys soat to‘rt o‘n beshda yetib keladi.',
      'The flight arrives at four fifteen.',
      'Рейс прибывает в четыре пятнадцать.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['flight', 'arrive', 'time'],
  },

  en_s1u5_n4_034_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'station',
        native: 'vokzal',
        nativeI18n: L('역', 'vokzal', 'station', 'станция'),
      },
      {
        text: 'metro',
        native: 'metro',
        nativeI18n: L('지하철', 'metro', 'metro', 'метро'),
      },
      {
        text: 'ticket',
        native: 'chipta',
        nativeI18n: L('표', 'chipta', 'ticket', 'билет'),
      },
      {
        text: 'machine',
        native: 'qurilma',
        nativeI18n: L('기계', 'qurilma', 'machine', 'автомат'),
      },
      {
        text: 'stop',
        native: 'bekat',
        nativeI18n: L('정류장', 'bekat', 'stop', 'остановка'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['travel', 'listening'],
  },

  en_s1u5_n4_035_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'The',
      'next',
      'metro',
      'leaves',
      'at',
      'eight',
      'forty',
      'arrives',
    ],
    answer: 'The next metro leaves at eight forty',
    audioText: 'The next metro leaves at eight forty.',
    answerTranslation: L(
      '다음 지하철은 8시 40분에 출발해요.',
      'Keyingi metro soat sakkiz qirqda jo‘naydi.',
      'The next metro leaves at eight forty.',
      'Следующий поезд метро отправляется в восемь сорок.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['metro', 'next', 'leave'],
  },

  en_s1u5_n4_036_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'stop',
    choices: [
      { text: 'stop', label: '🚏', emoji: '🚏', imageUrl: '' },
      { text: 'station', label: '🚉', emoji: '🚉', imageUrl: '' },
      { text: 'gate', label: '🚪', emoji: '🚪', imageUrl: '' },
      { text: 'ticket', label: '🎫', emoji: '🎫', imageUrl: '' },
    ],
    answerTranslation: L('정류장', 'bekat', 'stop', 'остановка'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['stop', 'transport'],
  },

  en_s1u5_n4_037_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The flight ___ at four fifteen.',
    blankAnswers: ['arrives'],
    options: ['arrives', 'leave', 'buy', 'single'],
    answer: 'arrives',
    answerTranslation: L(
      '항공편은 4시 15분에 도착해요.',
      'Reys soat to‘rt o‘n beshda yetib keladi.',
      'The flight arrives at four fifteen.',
      'Рейс прибывает в четыре пятнадцать.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['flight', 'arrive'],
  },

  en_s1u5_n4_038_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'The flight leaves from gate A ten.',
    audioText: 'The flight leaves from gate A ten.',
    answerI18n: L(
      '항공편은 A10 게이트에서 출발해요',
      'Reys A10 chiqish darvozasidan jo‘naydi',
      'The flight leaves from gate A ten',
      'Рейс отправляется от выхода A десять',
    ),
    options: [
      'The',
      'flight',
      'leaves',
      'from',
      'gate',
      'A',
      'ten',
      'platform',
    ],
    optionsI18n: {
      ko: ['항공편은', 'A10', '게이트에서', '출발해요', '승강장에서'],
      uz: [
        'Reys',
        'A10',
        'chiqish',
        'darvozasidan',
        'jo‘naydi',
        'platformadan',
      ],
      en: ['The', 'flight', 'leaves', 'from', 'gate', 'A', 'ten', 'platform'],
      ru: ['Рейс', 'отправляется', 'от', 'выхода', 'A', 'десять', 'платформы'],
    },
    answerTranslation: L(
      '항공편은 A10 게이트에서 출발해요.',
      'Reys A10 chiqish darvozasidan jo‘naydi.',
      'The flight leaves from gate A ten.',
      'Рейс отправляется от выхода A десять.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['flight', 'gate', 'announcement'],
  },

  en_s1u5_n4_039_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What time does the flight arrive?',
    options: ['It', 'arrives', 'at', 'four', 'fifteen', 'leaves', 'gate'],
    answer: 'It arrives at four fifteen',
    answerTranslation: L(
      '4시 15분에 도착해요.',
      'U soat to‘rt o‘n beshda yetib keladi.',
      'It arrives at four fifteen.',
      'Он прибывает в четыре пятнадцать.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['flight', 'arrive', 'reply'],
  },

  en_s1u5_n4_040_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Where does the train leave from?' }],
    options: [
      'From platform three.',
      'At platform three o’clock.',
      'It costs platform three.',
      'Three train leaves.',
    ],
    answer: 'From platform three.',
    answerTranslation: L(
      '3번 승강장에서요.',
      'Uchinchi platformadan.',
      'From platform three.',
      'С третьей платформы.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['platform', 'travel', 'dialog'],
  },

  // ===========================================================
  // Lesson 3 · Making arrangements by text
  // ===========================================================

  en_s1u5_n4_041_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Are you busy on Saturday?',
    audioText: 'Are you busy on Saturday?',
    answerTranslation: L(
      '토요일에 바빠요?',
      'Shanba kuni bandmisiz?',
      'Are you busy on Saturday?',
      'Вы заняты в субботу?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['arrangements', 'busy'],
  },

  en_s1u5_n4_042_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'text',
    choices: [
      { text: 'text', label: '💬', emoji: '💬', imageUrl: '' },
      { text: 'camera', label: '📷', emoji: '📷', imageUrl: '' },
      { text: 'ticket', label: '🎫', emoji: '🎫', imageUrl: '' },
      { text: 'flight', label: '✈️', emoji: '✈️', imageUrl: '' },
    ],
    answerTranslation: L('문자 메시지', 'matnli xabar', 'text', 'сообщение'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['communication', 'text'],
  },

  en_s1u5_n4_043_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'text',
        native: 'matnli xabar',
        nativeI18n: L('문자', 'matnli xabar', 'text message', 'сообщение'),
      },
      {
        text: 'email',
        native: 'elektron xat',
        nativeI18n: L('이메일', 'elektron xat', 'email', 'электронное письмо'),
      },
      {
        text: 'busy',
        native: 'band',
        nativeI18n: L('바쁜', 'band', 'busy', 'занятый'),
      },
      {
        text: 'meet',
        native: 'uchrashmoq',
        nativeI18n: L('만나다', 'uchrashmoq', 'meet', 'встречаться'),
      },
      {
        text: 'cinema',
        native: 'kinoteatr',
        nativeI18n: L('영화관', 'kinoteatr', 'cinema', 'кинотеатр'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['arrangements', 'matching'],
  },

  en_s1u5_n4_044_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['Are', 'you', 'busy', 'on', 'Saturday', 'meet', 'do'],
    answer: 'Are you busy on Saturday',
    answerTranslation: L(
      '토요일에 바빠요?',
      'Shanba kuni bandmisiz?',
      'Are you busy on Saturday?',
      'Вы заняты в субботу?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['busy', 'arrangements'],
  },

  en_s1u5_n4_045_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['Do', 'you', 'want', 'to', 'come', 'with', 'me', 'does'],
    answer: 'Do you want to come with me',
    audioText: 'Do you want to come with me?',
    answerTranslation: L(
      '저랑 같이 갈래요?',
      'Men bilan borishni xohlaysizmi?',
      'Do you want to come with me?',
      'Хотите пойти со мной?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['arrangements', 'invitation'],
  },

  en_s1u5_n4_046_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'text',
        native: 'matnli xabar',
        nativeI18n: L('문자', 'matnli xabar', 'text', 'сообщение'),
      },
      {
        text: 'email',
        native: 'elektron xat',
        nativeI18n: L('이메일', 'elektron xat', 'email', 'электронное письмо'),
      },
      {
        text: 'busy',
        native: 'band',
        nativeI18n: L('바쁜', 'band', 'busy', 'занятый'),
      },
      {
        text: 'meet',
        native: 'uchrashmoq',
        nativeI18n: L('만나다', 'uchrashmoq', 'meet', 'встречаться'),
      },
      {
        text: 'cinema',
        native: 'kinoteatr',
        nativeI18n: L('영화관', 'kinoteatr', 'cinema', 'кинотеатр'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['arrangements', 'listening'],
  },

  en_s1u5_n4_047_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'cinema',
    choices: [
      { text: 'cinema', label: '🎬', emoji: '🎬', imageUrl: '' },
      { text: 'concert', label: '🎵', emoji: '🎵', imageUrl: '' },
      { text: 'station', label: '🚉', emoji: '🚉', imageUrl: '' },
      { text: 'pharmacy', label: '💊', emoji: '💊', imageUrl: '' },
    ],
    answerTranslation: L('영화관', 'kinoteatr', 'cinema', 'кинотеатр'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['cinema', 'places'],
  },

  en_s1u5_n4_048_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Are you busy on Friday?',
    options: ['No', 'not', 'busy', 'Why', 'meet', 'does'],
    answer: 'No not busy Why',
    answerTranslation: L(
      '아니요, 안 바빠요. 왜요?',
      'Yo‘q, band emasman. Nega?',
      'No, not busy. Why?',
      'Нет, не занят. А что?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['busy', 'texting', 'reply'],
  },

  en_s1u5_n4_049_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Can we ___ at two?',
    blankAnswers: ['meet'],
    options: ['meet', 'busy', 'text', 'email'],
    answer: 'meet',
    answerTranslation: L(
      '2시에 만날 수 있어요?',
      'Soat ikkida uchrasha olamizmi?',
      'Can we meet at two?',
      'Мы можем встретиться в два?',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['meet', 'arrangements'],
  },

  en_s1u5_n4_050_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Can we meet by the museum?',
    audioText: 'Can we meet by the museum?',
    answerI18n: L(
      '박물관 옆에서 만날 수 있어요',
      'Muzey yonida uchrasha olamizmi',
      'Can we meet by the museum',
      'Мы можем встретиться у музея',
    ),
    options: ['Can', 'we', 'meet', 'by', 'the', 'museum', 'cinema', 'does'],
    optionsI18n: {
      ko: ['박물관', '옆에서', '만날', '수', '있어요', '영화관에서'],
      uz: ['Muzey', 'yonida', 'uchrasha', 'olamizmi', 'kinoteatrda'],
      en: ['Can', 'we', 'meet', 'by', 'the', 'museum', 'cinema'],
      ru: ['Мы', 'можем', 'встретиться', 'у', 'музея', 'кинотеатра'],
    },
    answerTranslation: L(
      '박물관 옆에서 만날 수 있어요?',
      'Muzey yonida uchrasha olamizmi?',
      'Can we meet by the museum?',
      'Мы можем встретиться у музея?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['meet', 'arrangements'],
  },

  en_s1u5_n4_051_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'concert',
    choices: [
      { text: 'concert', label: '🎵', emoji: '🎵', imageUrl: '' },
      { text: 'cinema', label: '🎬', emoji: '🎬', imageUrl: '' },
      { text: 'flight', label: '✈️', emoji: '✈️', imageUrl: '' },
      { text: 'camera', label: '📷', emoji: '📷', imageUrl: '' },
    ],
    answerTranslation: L('콘서트', 'konsert', 'concert', 'концерт'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['concert', 'arrangements'],
  },

  en_s1u5_n4_052_word_matching: {
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
        text: 'concert',
        native: 'konsert',
        nativeI18n: L('콘서트', 'konsert', 'concert', 'концерт'),
      },
      {
        text: 'camera',
        native: 'kamera',
        nativeI18n: L('카메라', 'kamera', 'camera', 'камера'),
      },
      {
        text: 'text',
        native: 'matnli xabar',
        nativeI18n: L('문자', 'matnli xabar', 'text', 'сообщение'),
      },
      {
        text: 'meet',
        native: 'uchrashmoq',
        nativeI18n: L('만나다', 'uchrashmoq', 'meet', 'встречаться'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['arrangements', 'matching'],
  },

  en_s1u5_n4_053_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['What', 'time', 'do', 'you', 'want', 'to', 'meet', 'where'],
    answer: 'What time do you want to meet',
    answerTranslation: L(
      '몇 시에 만나고 싶어요?',
      'Soat nechada uchrashmoqchisiz?',
      'What time do you want to meet?',
      'Во сколько вы хотите встретиться?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['meet', 'time', 'arrangements'],
  },

  en_s1u5_n4_054_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'concert',
        native: 'konsert',
        nativeI18n: L('콘서트', 'konsert', 'concert', 'концерт'),
      },
      {
        text: 'camera',
        native: 'kamera',
        nativeI18n: L('카메라', 'kamera', 'camera', 'камера'),
      },
      {
        text: 'cinema',
        native: 'kinoteatr',
        nativeI18n: L('영화관', 'kinoteatr', 'cinema', 'кинотеатр'),
      },
      {
        text: 'email',
        native: 'elektron xat',
        nativeI18n: L('이메일', 'elektron xat', 'email', 'электронное письмо'),
      },
      {
        text: 'busy',
        native: 'band',
        nativeI18n: L('바쁜', 'band', 'busy', 'занятый'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['arrangements', 'listening'],
  },

  en_s1u5_n4_055_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['Do', 'you', 'want', 'to', 'see', 'a', 'film', 'meet'],
    answer: 'Do you want to see a film',
    audioText: 'Do you want to see a film?',
    answerTranslation: L(
      '영화 보러 갈래요?',
      'Film ko‘rishni xohlaysizmi?',
      'Do you want to see a film?',
      'Хотите посмотреть фильм?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['cinema', 'invitation'],
  },

  en_s1u5_n4_056_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'camera',
    choices: [
      { text: 'camera', label: '📷', emoji: '📷', imageUrl: '' },
      { text: 'phone', label: '📱', emoji: '📱', imageUrl: '' },
      { text: 'ticket', label: '🎫', emoji: '🎫', imageUrl: '' },
      { text: 'email', label: '📧', emoji: '📧', imageUrl: '' },
    ],
    answerTranslation: L('카메라', 'kamera', 'camera', 'камера'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['camera', 'shopping'],
  },

  en_s1u5_n4_057_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Are you ___ on Friday?',
    blankAnswers: ['busy'],
    options: ['busy', 'meet', 'text', 'camera'],
    answer: 'busy',
    answerTranslation: L(
      '금요일에 바빠요?',
      'Juma kuni bandmisiz?',
      'Are you busy on Friday?',
      'Вы заняты в пятницу?',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['busy', 'arrangements'],
  },

  en_s1u5_n4_058_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'See you at the cinema at six fifteen.',
    audioText: 'See you at the cinema at six fifteen.',
    answerI18n: L(
      '6시 15분에 영화관에서 봐요',
      'Soat olti o‘n beshda kinoteatrda ko‘rishamiz',
      'See you at the cinema at six fifteen',
      'Увидимся в кинотеатре в шесть пятнадцать',
    ),
    options: [
      'See',
      'you',
      'at',
      'the',
      'cinema',
      'at',
      'six',
      'fifteen',
      'station',
    ],
    optionsI18n: {
      ko: ['6시', '15분에', '영화관에서', '봐요', '역에서'],
      uz: [
        'Soat',
        'olti',
        'o‘n beshda',
        'kinoteatrda',
        'ko‘rishamiz',
        'vokzalda',
      ],
      en: [
        'See',
        'you',
        'at',
        'the',
        'cinema',
        'at',
        'six',
        'fifteen',
        'station',
      ],
      ru: [
        'Увидимся',
        'в',
        'кинотеатре',
        'в',
        'шесть',
        'пятнадцать',
        'на станции',
      ],
    },
    answerTranslation: L(
      '6시 15분에 영화관에서 봐요.',
      'Soat olti o‘n beshda kinoteatrda ko‘rishamiz.',
      'See you at the cinema at six fifteen.',
      'Увидимся в кинотеатре в шесть пятнадцать.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['cinema', 'meet', 'time'],
  },

  en_s1u5_n4_059_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Can we meet at seven thirty?',
    options: ['Yes', 'See', 'you', 'there', 'busy', 'does'],
    answer: 'Yes See you there',
    answerTranslation: L(
      '네. 거기서 봐요.',
      'Ha. O‘sha yerda ko‘rishamiz.',
      'Yes. See you there.',
      'Да. Увидимся там.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['meet', 'texting', 'reply'],
  },

  en_s1u5_n4_060_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Do you want to meet for dinner?' }],
    options: [
      'OK. What time?',
      'OK. What ticket?',
      'The train leaves.',
      'No, platform seven.',
    ],
    answer: 'OK. What time?',
    answerTranslation: L(
      '좋아요. 몇 시에요?',
      'Mayli. Soat nechada?',
      'OK. What time?',
      'Хорошо. Во сколько?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['arrangements', 'texting', 'dialog'],
  },

  // ===========================================================
  // Lesson 4 · Travel + arrangements review
  // ===========================================================

  en_s1u5_n4_061_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'What time is the next train to the city centre?',
    audioText: 'What time is the next train to the city centre?',
    answerTranslation: L(
      '도심으로 가는 다음 기차는 몇 시예요?',
      'Shahar markaziga keyingi poyezd soat nechada?',
      'What time is the next train to the city centre?',
      'Во сколько следующий поезд до центра города?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['travel', 'next', 'train'],
  },

  en_s1u5_n4_062_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'email',
    choices: [
      { text: 'email', label: '📧', emoji: '📧', imageUrl: '' },
      { text: 'ticket', label: '🎫', emoji: '🎫', imageUrl: '' },
      { text: 'camera', label: '📷', emoji: '📷', imageUrl: '' },
      { text: 'metro', label: '🚇', emoji: '🚇', imageUrl: '' },
    ],
    answerTranslation: L(
      '이메일',
      'elektron xat',
      'email',
      'электронное письмо',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['email', 'communication'],
  },

  en_s1u5_n4_063_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'ticket',
        native: 'chipta',
        nativeI18n: L('표', 'chipta', 'ticket', 'билет'),
      },
      {
        text: 'flight',
        native: 'reys',
        nativeI18n: L('항공편', 'reys', 'flight', 'рейс'),
      },
      {
        text: 'meet',
        native: 'uchrashmoq',
        nativeI18n: L('만나다', 'uchrashmoq', 'meet', 'встречаться'),
      },
      {
        text: 'busy',
        native: 'band',
        nativeI18n: L('바쁜', 'band', 'busy', 'занятый'),
      },
      {
        text: 'concert',
        native: 'konsert',
        nativeI18n: L('콘서트', 'konsert', 'concert', 'концерт'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['review', 'matching'],
  },

  en_s1u5_n4_064_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['Where', 'does', 'the', 'bus', 'go', 'from', 'when', 'ticket'],
    answer: 'Where does the bus go from',
    answerTranslation: L(
      '버스는 어디에서 출발해요?',
      'Avtobus qayerdan jo‘naydi?',
      'Where does the bus go from?',
      'Откуда отправляется автобус?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['bus', 'travel', 'where'],
  },

  en_s1u5_n4_065_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['Can', 'we', 'meet', 'near', 'the', 'station', 'ticket', 'does'],
    answer: 'Can we meet near the station',
    audioText: 'Can we meet near the station?',
    answerTranslation: L(
      '역 근처에서 만날 수 있어요?',
      'Vokzal yaqinida uchrasha olamizmi?',
      'Can we meet near the station?',
      'Мы можем встретиться рядом со станцией?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['meet', 'station', 'arrangements'],
  },

  en_s1u5_n4_066_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'platform',
        native: 'platforma',
        nativeI18n: L('승강장', 'platforma', 'platform', 'платформа'),
      },
      {
        text: 'gate',
        native: 'chiqish darvozasi',
        nativeI18n: L('탑승구', 'chiqish darvozasi', 'gate', 'выход'),
      },
      {
        text: 'cinema',
        native: 'kinoteatr',
        nativeI18n: L('영화관', 'kinoteatr', 'cinema', 'кинотеатр'),
      },
      {
        text: 'camera',
        native: 'kamera',
        nativeI18n: L('카메라', 'kamera', 'camera', 'камера'),
      },
      {
        text: 'email',
        native: 'elektron xat',
        nativeI18n: L('이메일', 'elektron xat', 'email', 'электронное письмо'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['review', 'listening'],
  },

  en_s1u5_n4_067_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'ticket',
    choices: [
      { text: 'ticket', label: '🎫', emoji: '🎫', imageUrl: '' },
      { text: 'text', label: '💬', emoji: '💬', imageUrl: '' },
      { text: 'camera', label: '📷', emoji: '📷', imageUrl: '' },
      { text: 'gate', label: '🚪', emoji: '🚪', imageUrl: '' },
    ],
    answerTranslation: L('표', 'chipta', 'ticket', 'билет'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['ticket', 'review'],
  },

  en_s1u5_n4_068_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'You buy your ticket from the machine.',
    audioText: 'You buy your ticket from the machine.',
    answerI18n: L(
      '기계에서 표를 사요',
      'Chiptangizni qurilmadan sotib olasiz',
      'You buy your ticket from the machine',
      'Вы покупаете билет в автомате',
    ),
    options: ['You', 'buy', 'your', 'ticket', 'from', 'the', 'machine', 'gate'],
    optionsI18n: {
      ko: ['기계에서', '표를', '사요', '게이트에서'],
      uz: ['Chiptangizni', 'qurilmadan', 'sotib', 'olasiz', 'darvozadan'],
      en: ['You', 'buy', 'your', 'ticket', 'from', 'the', 'machine', 'gate'],
      ru: ['Вы', 'покупаете', 'билет', 'в', 'автомате', 'у', 'выхода'],
    },
    answerTranslation: L(
      '기계에서 표를 사요.',
      'Chiptangizni qurilmadan sotib olasiz.',
      'You buy your ticket from the machine.',
      'Вы покупаете билет в автомате.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['ticket', 'machine', 'buy'],
  },

  en_s1u5_n4_069_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Can we ___ at the cinema?',
    blankAnswers: ['meet'],
    options: ['meet', 'leave', 'arrive', 'buy'],
    answer: 'meet',
    answerTranslation: L(
      '영화관에서 만날 수 있어요?',
      'Kinoteatrda uchrasha olamizmi?',
      'Can we meet at the cinema?',
      'Мы можем встретиться в кинотеатре?',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['meet', 'cinema'],
  },

  en_s1u5_n4_070_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What time is the next train?',
    options: ['It', 'leaves', 'at', 'ten', 'thirty-five', 'meet', 'busy'],
    answer: 'It leaves at ten thirty-five',
    answerTranslation: L(
      '10시 35분에 출발해요.',
      'U soat o‘n o‘ttiz beshda jo‘naydi.',
      'It leaves at ten thirty-five.',
      'Он отправляется в десять тридцать пять.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['train', 'leave', 'reply'],
  },

  en_s1u5_n4_071_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'concert',
    choices: [
      { text: 'concert', label: '🎵', emoji: '🎵', imageUrl: '' },
      { text: 'flight', label: '✈️', emoji: '✈️', imageUrl: '' },
      { text: 'station', label: '🚉', emoji: '🚉', imageUrl: '' },
      { text: 'ticket', label: '🎫', emoji: '🎫', imageUrl: '' },
    ],
    answerTranslation: L('콘서트', 'konsert', 'concert', 'концерт'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['concert', 'review'],
  },

  en_s1u5_n4_072_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'buy',
        native: 'sotib olmoq',
        nativeI18n: L('사다', 'sotib olmoq', 'buy', 'покупать'),
      },
      {
        text: 'leave',
        native: 'jo‘namoq',
        nativeI18n: L('출발하다', 'jo‘namoq', 'leave', 'отправляться'),
      },
      {
        text: 'arrive',
        native: 'yetib kelmoq',
        nativeI18n: L('도착하다', 'yetib kelmoq', 'arrive', 'прибывать'),
      },
      {
        text: 'meet',
        native: 'uchrashmoq',
        nativeI18n: L('만나다', 'uchrashmoq', 'meet', 'встречаться'),
      },
      {
        text: 'busy',
        native: 'band',
        nativeI18n: L('바쁜', 'band', 'busy', 'занятый'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['review', 'verbs', 'matching'],
  },

  en_s1u5_n4_073_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['Do', 'you', 'want', 'to', 'go', 'to', 'a', 'concert', 'ticket'],
    answer: 'Do you want to go to a concert',
    answerTranslation: L(
      '콘서트에 갈래요?',
      'Konsertga borishni xohlaysizmi?',
      'Do you want to go to a concert?',
      'Хотите пойти на концерт?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['concert', 'invitation'],
  },

  en_s1u5_n4_074_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'ticket',
        native: 'chipta',
        nativeI18n: L('표', 'chipta', 'ticket', 'билет'),
      },
      {
        text: 'station',
        native: 'vokzal',
        nativeI18n: L('역', 'vokzal', 'station', 'станция'),
      },
      {
        text: 'flight',
        native: 'reys',
        nativeI18n: L('항공편', 'reys', 'flight', 'рейс'),
      },
      {
        text: 'cinema',
        native: 'kinoteatr',
        nativeI18n: L('영화관', 'kinoteatr', 'cinema', 'кинотеатр'),
      },
      {
        text: 'concert',
        native: 'konsert',
        nativeI18n: L('콘서트', 'konsert', 'concert', 'концерт'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['review', 'listening'],
  },

  en_s1u5_n4_075_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['I', 'want', 'to', 'buy', 'a', 'new', 'camera', 'ticket'],
    answer: 'I want to buy a new camera',
    audioText: 'I want to buy a new camera.',
    answerTranslation: L(
      '새 카메라를 사고 싶어요.',
      'Men yangi kamera sotib olmoqchiman.',
      'I want to buy a new camera.',
      'Я хочу купить новую камеру.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['camera', 'buy', 'shopping'],
  },

  en_s1u5_n4_076_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'flight',
    choices: [
      { text: 'flight', label: '✈️', emoji: '✈️', imageUrl: '' },
      { text: 'metro', label: '🚇', emoji: '🚇', imageUrl: '' },
      { text: 'cinema', label: '🎬', emoji: '🎬', imageUrl: '' },
      { text: 'camera', label: '📷', emoji: '📷', imageUrl: '' },
    ],
    answerTranslation: L('항공편', 'reys', 'flight', 'рейс'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['flight', 'review'],
  },

  en_s1u5_n4_077_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The flight ___ at eight forty.',
    blankAnswers: ['leaves'],
    options: ['leaves', 'busy', 'meet', 'ticket'],
    answer: 'leaves',
    answerTranslation: L(
      '항공편은 8시 40분에 출발해요.',
      'Reys soat sakkiz qirqda jo‘naydi.',
      'The flight leaves at eight forty.',
      'Рейс отправляется в восемь сорок.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['flight', 'leave'],
  },

  en_s1u5_n4_078_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Can we meet at the cinema at seven?',
    audioText: 'Can we meet at the cinema at seven?',
    answerI18n: L(
      '7시에 영화관에서 만날 수 있어요',
      'Soat yettida kinoteatrda uchrasha olamizmi',
      'Can we meet at the cinema at seven',
      'Мы можем встретиться в кинотеатре в семь',
    ),
    options: [
      'Can',
      'we',
      'meet',
      'at',
      'the',
      'cinema',
      'at',
      'seven',
      'station',
    ],
    optionsI18n: {
      ko: ['7시에', '영화관에서', '만날', '수', '있어요', '역에서'],
      uz: [
        'Soat',
        'yettida',
        'kinoteatrda',
        'uchrasha',
        'olamizmi',
        'vokzalda',
      ],
      en: [
        'Can',
        'we',
        'meet',
        'at',
        'the',
        'cinema',
        'at',
        'seven',
        'station',
      ],
      ru: [
        'Мы',
        'можем',
        'встретиться',
        'в',
        'кинотеатре',
        'в',
        'семь',
        'на станции',
      ],
    },
    answerTranslation: L(
      '7시에 영화관에서 만날 수 있어요?',
      'Soat yettida kinoteatrda uchrasha olamizmi?',
      'Can we meet at the cinema at seven?',
      'Мы можем встретиться в кинотеатре в семь?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['meet', 'cinema', 'time'],
  },

  en_s1u5_n4_079_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Can we meet by the museum at two?',
    options: ['Yes', 'See', 'you', 'there', 'at', 'two', 'ticket', 'busy'],
    answer: 'Yes See you there at two',
    answerTranslation: L(
      '네. 2시에 거기서 봐요.',
      'Ha. Soat ikkida o‘sha yerda ko‘rishamiz.',
      'Yes. See you there at two.',
      'Да. Увидимся там в два.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['meet', 'time', 'reply'],
  },

  en_s1u5_n4_080_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Do you want to go to a concert on Saturday?' },
    ],
    options: [
      'Yes. What time?',
      'Yes. What platform?',
      'The ticket arrives.',
      'No. Gate A10.',
    ],
    answer: 'Yes. What time?',
    answerTranslation: L(
      '네. 몇 시에요?',
      'Ha. Soat nechada?',
      'Yes. What time?',
      'Да. Во сколько?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['concert', 'arrangements', 'final'],
  },
};

export const EN_S1_UNIT5_NODE4 = {
  title: L(
    '말하기와 쓰기',
    'Gapirish va yozish',
    'Speaking and writing',
    'Говорение и письмо',
  ),
  section: 1,
  unit: 5,
  order: 4,
  isActive: true,

  lessons: [
    {
      title: L(
        '교통 정보 묻기',
        'Safar ma’lumotini so‘rash',
        'Ask for travel information',
        'Запрашиваем информацию о поездке',
      ),
      description: L(
        '표를 사는 곳, 교통수단의 목적지, 다음 출발 시간과 가격을 묻고 답해요.',
        'Chipta qayerdan olinishi, transport qayerga borishi, keyingi jo‘nash vaqti va narxini so‘rab javob berasiz.',
        'Ask and answer where to buy a ticket, where transport goes, the next departure time and the price.',
        'Спрашиваем и отвечаем, где купить билет, куда идёт транспорт, когда следующее отправление и сколько стоит поездка.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 1,
      questions: [
        'en_s1u5_n4_001_speaking',
        'en_s1u5_n4_002_image_choice',
        'en_s1u5_n4_003_word_matching',
        'en_s1u5_n4_004_translate_builder',
        'en_s1u5_n4_005_word_arrange',
        'en_s1u5_n4_006_audio_match',
        'en_s1u5_n4_007_image_choice',
        'en_s1u5_n4_008_reply_builder',
        'en_s1u5_n4_009_fill_in_blank',
        'en_s1u5_n4_010_sentence_builder',
        'en_s1u5_n4_011_image_choice',
        'en_s1u5_n4_012_word_matching',
        'en_s1u5_n4_013_translate_builder',
        'en_s1u5_n4_014_audio_match',
        'en_s1u5_n4_015_word_arrange',
        'en_s1u5_n4_016_image_choice',
        'en_s1u5_n4_017_speaking',
        'en_s1u5_n4_018_reply_builder',
        'en_s1u5_n4_019_fill_in_blank',
        'en_s1u5_n4_020_dialog_complete',
      ],
    },

    {
      title: L(
        '교통 안내 방송 듣기',
        'Transport e’lonlarini tinglash',
        'Understand travel announcements',
        'Понимаем транспортные объявления',
      ),
      description: L(
        '시간, 장소, 승강장, 탑승구, 항공편 번호처럼 안내 방송에서 중요한 정보를 듣고 찾아요.',
        'E’lonlardan vaqt, joy, platforma, chiqish darvozasi va reys kabi muhim ma’lumotlarni ajratasiz.',
        'Listen for important information such as times, places, platforms, gates and flight details.',
        'Учимся слышать в объявлениях время, место, платформу, выход и номер рейса.',
      ),
      category: LessonCategory.LISTENING,
      level: LV,
      order: 2,
      questions: [
        'en_s1u5_n4_021_speaking',
        'en_s1u5_n4_022_image_choice',
        'en_s1u5_n4_023_word_matching',
        'en_s1u5_n4_024_translate_builder',
        'en_s1u5_n4_025_word_arrange',
        'en_s1u5_n4_026_audio_match',
        'en_s1u5_n4_027_image_choice',
        'en_s1u5_n4_028_sentence_builder',
        'en_s1u5_n4_029_fill_in_blank',
        'en_s1u5_n4_030_reply_builder',
        'en_s1u5_n4_031_image_choice',
        'en_s1u5_n4_032_word_matching',
        'en_s1u5_n4_033_translate_builder',
        'en_s1u5_n4_034_audio_match',
        'en_s1u5_n4_035_word_arrange',
        'en_s1u5_n4_036_image_choice',
        'en_s1u5_n4_037_fill_in_blank',
        'en_s1u5_n4_038_sentence_builder',
        'en_s1u5_n4_039_reply_builder',
        'en_s1u5_n4_040_dialog_complete',
      ],
    },

    {
      title: L(
        '문자로 약속 잡기',
        'Xabar orqali uchrashuv belgilash',
        'Make arrangements by text',
        'Договариваемся о встрече в сообщениях',
      ),
      description: L(
        'Are you busy?, What time?, Can we meet...? 같은 짧고 자연스러운 문자 표현으로 시간과 장소를 정해요.',
        'Are you busy?, What time?, Can we meet...? kabi qisqa iboralar bilan uchrashuv vaqti va joyini kelishasiz.',
        'Use short natural messages such as Are you busy?, What time? and Can we meet...? to arrange a time and place.',
        'Используем короткие естественные сообщения вроде Are you busy?, What time? и Can we meet...? для выбора времени и места встречи.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 3,
      questions: [
        'en_s1u5_n4_041_speaking',
        'en_s1u5_n4_042_image_choice',
        'en_s1u5_n4_043_word_matching',
        'en_s1u5_n4_044_translate_builder',
        'en_s1u5_n4_045_word_arrange',
        'en_s1u5_n4_046_audio_match',
        'en_s1u5_n4_047_image_choice',
        'en_s1u5_n4_048_reply_builder',
        'en_s1u5_n4_049_fill_in_blank',
        'en_s1u5_n4_050_sentence_builder',
        'en_s1u5_n4_051_image_choice',
        'en_s1u5_n4_052_word_matching',
        'en_s1u5_n4_053_translate_builder',
        'en_s1u5_n4_054_audio_match',
        'en_s1u5_n4_055_word_arrange',
        'en_s1u5_n4_056_image_choice',
        'en_s1u5_n4_057_fill_in_blank',
        'en_s1u5_n4_058_sentence_builder',
        'en_s1u5_n4_059_reply_builder',
        'en_s1u5_n4_060_dialog_complete',
      ],
    },

    {
      title: L(
        '여행과 약속 실전',
        'Safar va uchrashuv amaliyoti',
        'Travel and arrangements',
        'Поездки и встречи',
      ),
      description: L(
        '교통 정보와 약속 잡기 표현을 함께 사용해 실제 여행 상황처럼 묻고 답해요.',
        'Safar ma’lumotlari va uchrashuv belgilash iboralarini birlashtirib, haqiqiy vaziyatlarga o‘xshash mashqlarni bajarasiz.',
        'Combine travel information and arrangement language in practical everyday situations.',
        'Объединяем транспортные выражения и договорённости о встрече в практических ситуациях.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 4,
      questions: [
        'en_s1u5_n4_061_speaking',
        'en_s1u5_n4_062_image_choice',
        'en_s1u5_n4_063_word_matching',
        'en_s1u5_n4_064_translate_builder',
        'en_s1u5_n4_065_word_arrange',
        'en_s1u5_n4_066_audio_match',
        'en_s1u5_n4_067_image_choice',
        'en_s1u5_n4_068_sentence_builder',
        'en_s1u5_n4_069_fill_in_blank',
        'en_s1u5_n4_070_reply_builder',
        'en_s1u5_n4_071_image_choice',
        'en_s1u5_n4_072_word_matching',
        'en_s1u5_n4_073_translate_builder',
        'en_s1u5_n4_074_audio_match',
        'en_s1u5_n4_075_word_arrange',
        'en_s1u5_n4_076_image_choice',
        'en_s1u5_n4_077_fill_in_blank',
        'en_s1u5_n4_078_sentence_builder',
        'en_s1u5_n4_079_reply_builder',
        'en_s1u5_n4_080_dialog_complete',
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Section 1 · Unit 5 · Node 5
// 5.5 Architecture in Amsterdam + Unit 5 Review
//
// Coverage
// - Amsterdam architecture and places
// - canal / railway / hall / science / centre
// - view / symbol / tall / similar
// - visit / plan
// - describing buildings
// - talking about weekend plans
// - writing a simple email about plans
// - Unit 5 review:
//   colours / clothes / frequency
//   Wh- questions
//   buildings / style / body parts
//   travel information
//
// Existing words reused:
// building / museum / station / stadium / modern / unusual
// beautiful / old / big / interesting / architecture
// email / weekend / clothes / colours / body parts
// ticket / bus / next / buy / etc.
//
// *_WORDS에는 문장/구문 금지.
// 단어만 등록.
//
// 4 lessons × 20 questions = 80
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT5_NODE5_WORDS = [
  {
    code: 'en-place-canal',
    english: 'canal',
    senseKey: 'man-made-waterway',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('운하', 'kanal', 'a man-made waterway', 'канал'),
    examples: [
      {
        english: 'Amsterdam has many canals.',
        translations: L(
          '암스테르담에는 운하가 많아요.',
          'Amsterdamda ko‘plab kanallar bor.',
          'Amsterdam has many canals.',
          'В Амстердаме много каналов.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/kəˈnæl/',
      ttsText: 'canal',
    },
    media: {
      emoji: '🚤',
      imageUrl: '',
      imageAlt: L(
        '도시의 운하',
        'shahar kanali',
        'a city canal',
        'городской канал',
      ),
    },
    tags: ['city', 'architecture'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-food-cheese',
    english: 'cheese',
    senseKey: 'food-made-from-milk',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('치즈', 'pishloq', 'a food made from milk', 'сыр'),
    examples: [
      {
        english: 'There is a cheese museum in the city.',
        translations: L(
          '도시에 치즈 박물관이 있어요.',
          'Shaharda pishloq muzeyi bor.',
          'There is a cheese museum in the city.',
          'В городе есть музей сыра.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/tʃiːz/',
      ttsText: 'cheese',
    },
    media: {
      emoji: '🧀',
      imageUrl: '',
      imageAlt: L('치즈', 'pishloq', 'cheese', 'сыр'),
    },
    tags: ['food'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-place-supermarket',
    english: 'supermarket',
    senseKey: 'large-food-shop',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '슈퍼마켓',
      'supermarket',
      'a large shop that sells food and everyday products',
      'супермаркет',
    ),
    examples: [
      {
        english: 'The supermarket is near the station.',
        translations: L(
          '슈퍼마켓은 역 근처에 있어요.',
          'Supermarket vokzal yaqinida.',
          'The supermarket is near the station.',
          'Супермаркет находится рядом со станцией.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈsuːpəmɑːkɪt/',
      ttsText: 'supermarket',
    },
    media: {
      emoji: '🛒',
      imageUrl: '',
      imageAlt: L('슈퍼마켓', 'supermarket', 'a supermarket', 'супермаркет'),
    },
    tags: ['places', 'shops'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-railway',
    english: 'railway',
    senseKey: 'train-transport-system',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '철도',
      'temiryo‘l',
      'a system of trains and tracks',
      'железная дорога',
    ),
    examples: [
      {
        english: 'Amsterdam Centraal is a railway station.',
        translations: L(
          '암스테르담 중앙역은 기차역이에요.',
          'Amsterdam Centraal temiryo‘l vokzali.',
          'Amsterdam Centraal is a railway station.',
          'Amsterdam Centraal — железнодорожный вокзал.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈreɪlweɪ/',
      ttsText: 'railway',
    },
    media: {
      emoji: '🚆',
      imageUrl: '',
      imageAlt: L('철도', 'temiryo‘l', 'a railway', 'железная дорога'),
    },
    tags: ['travel', 'transport'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-place-hall',
    english: 'hall',
    senseKey: 'large-room-or-building',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '홀; 회관',
      'zal',
      'a large room or building used for events',
      'зал',
    ),
    examples: [
      {
        english: 'The city has a modern concert hall.',
        translations: L(
          '그 도시에는 현대적인 공연장이 있어요.',
          'Shaharda zamonaviy konsert zali bor.',
          'The city has a modern concert hall.',
          'В городе есть современный концертный зал.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/hɔːl/',
      ttsText: 'hall',
    },
    media: {
      emoji: '🎵',
      imageUrl: '',
      imageAlt: L('공연장', 'konsert zali', 'a concert hall', 'концертный зал'),
    },
    tags: ['buildings', 'places'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-science',
    english: 'science',
    senseKey: 'study-of-natural-world',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('과학', 'fan', 'the study of the natural world', 'наука'),
    examples: [
      {
        english: 'The science centre is interesting.',
        translations: L(
          '과학 센터는 흥미로워요.',
          'Fan markazi qiziqarli.',
          'The science centre is interesting.',
          'Научный центр интересный.',
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
    tags: ['education'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-place-centre',
    english: 'centre',
    senseKey: 'main-place-for-activity',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '센터; 중심',
      'markaz',
      'a main place for a particular activity',
      'центр',
    ),
    examples: [
      {
        english: 'The science centre has great views.',
        translations: L(
          '과학 센터에서는 멋진 전망을 볼 수 있어요.',
          'Fan markazidan ajoyib manzaralar ko‘rinadi.',
          'The science centre has great views.',
          'Из научного центра открывается прекрасный вид.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈsentə/',
      ttsText: 'centre',
    },
    media: {
      emoji: '🏢',
      imageUrl: '',
      imageAlt: L('센터', 'markaz', 'a centre', 'центр'),
    },
    tags: ['places'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-view',
    english: 'view',
    senseKey: 'what-you-can-see-from-place',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('전망; 경치', 'manzara', 'what you can see from a place', 'вид'),
    examples: [
      {
        english: 'The building has a great view of the city.',
        translations: L(
          '그 건물에서는 도시의 멋진 전망을 볼 수 있어요.',
          'Binodan shaharning ajoyib manzarasi ko‘rinadi.',
          'The building has a great view of the city.',
          'Из здания открывается прекрасный вид на город.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/vjuː/',
      ttsText: 'view',
    },
    media: {
      emoji: '🌇',
      imageUrl: '',
      imageAlt: L(
        '도시 전망',
        'shahar manzarasi',
        'a city view',
        'вид на город',
      ),
    },
    tags: ['architecture', 'city'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-symbol',
    english: 'symbol',
    senseKey: 'thing-representing-something',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '상징',
      'ramz',
      'something that represents another thing',
      'символ',
    ),
    examples: [
      {
        english: 'The canal houses are symbols of the city.',
        translations: L(
          '운하 주택들은 도시의 상징이에요.',
          'Kanal bo‘yidagi uylar shaharning ramzlari.',
          'The canal houses are symbols of the city.',
          'Дома у каналов — символы города.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈsɪmbəl/',
      ttsText: 'symbol',
    },
    media: {
      emoji: '⭐',
      imageUrl: '',
      imageAlt: L(
        '도시의 상징',
        'shahar ramzi',
        'a city symbol',
        'символ города',
      ),
    },
    tags: ['city', 'architecture'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-tall',
    english: 'tall',
    senseKey: 'large-height',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('높은; 키가 큰', 'baland', 'having a large height', 'высокий'),
    examples: [
      {
        english: 'The building is twenty-two metres tall.',
        translations: L(
          '그 건물은 높이가 22미터예요.',
          'Bino yigirma ikki metr baland.',
          'The building is twenty-two metres tall.',
          'Высота здания — двадцать два метра.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/tɔːl/',
      ttsText: 'tall',
    },
    media: {
      emoji: '📏',
      imageUrl: '',
      imageAlt: L(
        '높은 건물',
        'baland bino',
        'a tall building',
        'высокое здание',
      ),
    },
    tags: ['adjectives', 'buildings'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-similar',
    english: 'similar',
    senseKey: 'almost-the-same',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('비슷한', 'o‘xshash', 'almost the same', 'похожий'),
    examples: [
      {
        english: 'The two buildings are very similar.',
        translations: L(
          '두 건물은 아주 비슷해요.',
          'Ikki bino juda o‘xshash.',
          'The two buildings are very similar.',
          'Эти два здания очень похожи.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈsɪmɪlə/',
      ttsText: 'similar',
    },
    media: {
      emoji: '🟰',
      imageUrl: '',
      imageAlt: L(
        '비슷한 두 건물',
        'o‘xshash ikki bino',
        'two similar buildings',
        'два похожих здания',
      ),
    },
    tags: ['adjectives', 'comparison'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-visit',
    english: 'visit',
    senseKey: 'go-to-see-place',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '방문하다',
      'tashrif buyurmoq',
      'to go to see a place or person',
      'посещать',
    ),
    examples: [
      {
        english: 'I want to visit the museum.',
        translations: L(
          '저는 박물관을 방문하고 싶어요.',
          'Men muzeyga tashrif buyurmoqchiman.',
          'I want to visit the museum.',
          'Я хочу посетить музей.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈvɪzɪt/',
      ttsText: 'visit',
    },
    media: {
      emoji: '🏛️',
      imageUrl: '',
      imageAlt: L(
        '장소 방문',
        'joyga tashrif',
        'visiting a place',
        'посещение места',
      ),
    },
    tags: ['travel', 'verbs'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-plan',
    english: 'plan',
    senseKey: 'intention-for-future',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('계획', 'reja', 'something you intend to do', 'план'),
    examples: [
      {
        english: 'My plan is to visit the museum.',
        translations: L(
          '제 계획은 박물관을 방문하는 거예요.',
          'Mening rejam muzeyga borish.',
          'My plan is to visit the museum.',
          'Мой план — посетить музей.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/plæn/',
      ttsText: 'plan',
    },
    media: {
      emoji: '📝',
      imageUrl: '',
      imageAlt: L(
        '여행 계획',
        'sayohat rejasi',
        'a travel plan',
        'план поездки',
      ),
    },
    tags: ['plans', 'travel'],
    difficulty: 1,
    isCore: true,
  },
];

export const EN_S1_UNIT5_NODE5_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Architecture in Amsterdam
  // ===========================================================

  en_s1u5_n5_001_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Amsterdam has many canal houses.',
    audioText: 'Amsterdam has many canal houses.',
    answerTranslation: L(
      '암스테르담에는 운하 주택이 많아요.',
      'Amsterdamda ko‘plab kanal bo‘yidagi uylar bor.',
      'Amsterdam has many canal houses.',
      'В Амстердаме много домов у каналов.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['amsterdam', 'canal', 'architecture'],
  },

  en_s1u5_n5_002_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'canal',
    choices: [
      { text: 'canal', label: '🚤', emoji: '🚤', imageUrl: '' },
      { text: 'railway', label: '🚆', emoji: '🚆', imageUrl: '' },
      { text: 'science', label: '🔬', emoji: '🔬', imageUrl: '' },
      { text: 'cheese', label: '🧀', emoji: '🧀', imageUrl: '' },
    ],
    answerTranslation: L('운하', 'kanal', 'canal', 'канал'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['canal', 'city'],
  },

  en_s1u5_n5_003_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'canal',
        native: 'kanal',
        nativeI18n: L('운하', 'kanal', 'canal', 'канал'),
      },
      {
        text: 'railway',
        native: 'temiryo‘l',
        nativeI18n: L('철도', 'temiryo‘l', 'railway', 'железная дорога'),
      },
      {
        text: 'hall',
        native: 'zal',
        nativeI18n: L('홀; 회관', 'zal', 'hall', 'зал'),
      },
      {
        text: 'science',
        native: 'fan',
        nativeI18n: L('과학', 'fan', 'science', 'наука'),
      },
      {
        text: 'centre',
        native: 'markaz',
        nativeI18n: L('센터', 'markaz', 'centre', 'центр'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['amsterdam', 'matching'],
  },

  en_s1u5_n5_004_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['The', 'station', 'is', 'very', 'busy', 'museum', 'tall'],
    answer: 'The station is very busy',
    answerTranslation: L(
      '그 역은 아주 붐벼요.',
      'Vokzal juda gavjum.',
      'The station is very busy.',
      'Станция очень оживлённая.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['station', 'amsterdam'],
  },

  en_s1u5_n5_005_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'The',
      'museum',
      'is',
      'one',
      'hundred',
      'and',
      'forty',
      'years',
      'old',
      'modern',
    ],
    answer: 'The museum is one hundred and forty years old',
    audioText: 'The museum is one hundred and forty years old.',
    answerTranslation: L(
      '그 박물관은 140년 되었어요.',
      'Muzey bir yuz qirq yillik.',
      'The museum is one hundred and forty years old.',
      'Музею сто сорок лет.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['museum', 'old', 'architecture'],
  },

  en_s1u5_n5_006_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'canal',
        native: 'kanal',
        nativeI18n: L('운하', 'kanal', 'canal', 'канал'),
      },
      {
        text: 'railway',
        native: 'temiryo‘l',
        nativeI18n: L('철도', 'temiryo‘l', 'railway', 'железная дорога'),
      },
      {
        text: 'hall',
        native: 'zal',
        nativeI18n: L('홀', 'zal', 'hall', 'зал'),
      },
      {
        text: 'science',
        native: 'fan',
        nativeI18n: L('과학', 'fan', 'science', 'наука'),
      },
      {
        text: 'centre',
        native: 'markaz',
        nativeI18n: L('센터', 'markaz', 'centre', 'центр'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['amsterdam', 'listening'],
  },

  en_s1u5_n5_007_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'supermarket',
    choices: [
      { text: 'supermarket', label: '🛒', emoji: '🛒', imageUrl: '' },
      { text: 'museum', label: '🏛️', emoji: '🏛️', imageUrl: '' },
      { text: 'stadium', label: '🏟️', emoji: '🏟️', imageUrl: '' },
      { text: 'station', label: '🚉', emoji: '🚉', imageUrl: '' },
    ],
    answerTranslation: L(
      '슈퍼마켓',
      'supermarket',
      'supermarket',
      'супермаркет',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['places', 'supermarket'],
  },

  en_s1u5_n5_008_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The city has a modern concert ___.',
    blankAnswers: ['hall'],
    options: ['hall', 'canal', 'view', 'railway'],
    answer: 'hall',
    answerTranslation: L(
      '그 도시에는 현대적인 공연장이 있어요.',
      'Shaharda zamonaviy konsert zali bor.',
      'The city has a modern concert hall.',
      'В городе есть современный концертный зал.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['hall', 'modern'],
  },

  en_s1u5_n5_009_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'The science centre is very interesting.',
    audioText: 'The science centre is very interesting.',
    answerI18n: L(
      '그 과학 센터는 아주 흥미로워요',
      'Fan markazi juda qiziqarli',
      'The science centre is very interesting',
      'Научный центр очень интересный',
    ),
    options: ['The', 'science', 'centre', 'is', 'very', 'interesting', 'old'],
    optionsI18n: {
      ko: ['그', '과학', '센터는', '아주', '흥미로워요', '오래됐어요'],
      uz: ['Fan', 'markazi', 'juda', 'qiziqarli', 'eski'],
      en: ['The', 'science', 'centre', 'is', 'very', 'interesting', 'old'],
      ru: ['Научный', 'центр', 'очень', 'интересный', 'старый'],
    },
    answerTranslation: L(
      '그 과학 센터는 아주 흥미로워요.',
      'Fan markazi juda qiziqarli.',
      'The science centre is very interesting.',
      'Научный центр очень интересный.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['science', 'centre', 'interesting'],
  },

  en_s1u5_n5_010_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What building do you want to visit?',
    options: ['I', 'want', 'to', 'visit', 'the', 'museum', 'does', 'canal'],
    answer: 'I want to visit the museum',
    answerTranslation: L(
      '저는 박물관을 방문하고 싶어요.',
      'Men muzeyga tashrif buyurmoqchiman.',
      'I want to visit the museum.',
      'Я хочу посетить музей.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['visit', 'museum', 'reply'],
  },

  en_s1u5_n5_011_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'The',
      'canal',
      'houses',
      'are',
      'symbols',
      'of',
      'the',
      'city',
      'station',
    ],
    answer: 'The canal houses are symbols of the city',
    answerTranslation: L(
      '운하 주택들은 도시의 상징이에요.',
      'Kanal bo‘yidagi uylar shaharning ramzlari.',
      'The canal houses are symbols of the city.',
      'Дома у каналов — символы города.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['canal', 'symbol', 'city'],
  },

  en_s1u5_n5_012_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'view',
        native: 'manzara',
        nativeI18n: L('전망', 'manzara', 'view', 'вид'),
      },
      {
        text: 'symbol',
        native: 'ramz',
        nativeI18n: L('상징', 'ramz', 'symbol', 'символ'),
      },
      {
        text: 'tall',
        native: 'baland',
        nativeI18n: L('높은', 'baland', 'tall', 'высокий'),
      },
      {
        text: 'similar',
        native: 'o‘xshash',
        nativeI18n: L('비슷한', 'o‘xshash', 'similar', 'похожий'),
      },
      {
        text: 'visit',
        native: 'tashrif buyurmoq',
        nativeI18n: L('방문하다', 'tashrif buyurmoq', 'visit', 'посещать'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['architecture', 'matching'],
  },

  en_s1u5_n5_013_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'cheese',
    choices: [
      { text: 'cheese', label: '🧀', emoji: '🧀', imageUrl: '' },
      { text: 'camera', label: '📷', emoji: '📷', imageUrl: '' },
      { text: 'ticket', label: '🎫', emoji: '🎫', imageUrl: '' },
      { text: 'canal', label: '🚤', emoji: '🚤', imageUrl: '' },
    ],
    answerTranslation: L('치즈', 'pishloq', 'cheese', 'сыр'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['cheese'],
  },

  en_s1u5_n5_014_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'view',
        native: 'manzara',
        nativeI18n: L('전망', 'manzara', 'view', 'вид'),
      },
      {
        text: 'symbol',
        native: 'ramz',
        nativeI18n: L('상징', 'ramz', 'symbol', 'символ'),
      },
      {
        text: 'tall',
        native: 'baland',
        nativeI18n: L('높은', 'baland', 'tall', 'высокий'),
      },
      {
        text: 'similar',
        native: 'o‘xshash',
        nativeI18n: L('비슷한', 'o‘xshash', 'similar', 'похожий'),
      },
      {
        text: 'visit',
        native: 'tashrif buyurmoq',
        nativeI18n: L('방문하다', 'tashrif buyurmoq', 'visit', 'посещать'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['architecture', 'listening'],
  },

  en_s1u5_n5_015_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'The',
      'building',
      'has',
      'great',
      'views',
      'of',
      'the',
      'city',
      'similar',
    ],
    answer: 'The building has great views of the city',
    audioText: 'The building has great views of the city.',
    answerTranslation: L(
      '그 건물에서는 도시의 멋진 전망을 볼 수 있어요.',
      'Binodan shaharning ajoyib manzaralari ko‘rinadi.',
      'The building has great views of the city.',
      'Из здания открывается прекрасный вид на город.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['view', 'building', 'city'],
  },

  en_s1u5_n5_016_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The building is twenty-two metres ___.',
    blankAnswers: ['tall'],
    options: ['tall', 'similar', 'canal', 'visit'],
    answer: 'tall',
    answerTranslation: L(
      '그 건물은 높이가 22미터예요.',
      'Bino yigirma ikki metr baland.',
      'The building is twenty-two metres tall.',
      'Высота здания — двадцать два метра.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['tall', 'building'],
  },

  en_s1u5_n5_017_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The two buildings are very similar.',
    audioText: 'The two buildings are very similar.',
    answerTranslation: L(
      '두 건물은 아주 비슷해요.',
      'Ikki bino juda o‘xshash.',
      'The two buildings are very similar.',
      'Эти два здания очень похожи.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['similar', 'buildings'],
  },

  en_s1u5_n5_018_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'railway',
    choices: [
      { text: 'railway', label: '🚆', emoji: '🚆', imageUrl: '' },
      { text: 'canal', label: '🚤', emoji: '🚤', imageUrl: '' },
      { text: 'science', label: '🔬', emoji: '🔬', imageUrl: '' },
      { text: 'hall', label: '🎵', emoji: '🎵', imageUrl: '' },
    ],
    answerTranslation: L('철도', 'temiryo‘l', 'railway', 'железная дорога'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['railway', 'transport'],
  },

  en_s1u5_n5_019_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'The',
      'concert',
      'hall',
      'is',
      'modern',
      'and',
      'interesting',
      'old',
    ],
    answer: 'The concert hall is modern and interesting',
    answerTranslation: L(
      '그 공연장은 현대적이고 흥미로워요.',
      'Konsert zali zamonaviy va qiziqarli.',
      'The concert hall is modern and interesting.',
      'Концертный зал современный и интересный.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['hall', 'modern', 'interesting'],
  },

  en_s1u5_n5_020_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'What do you want to visit in Amsterdam?' },
    ],
    options: [
      'I want to visit the museum.',
      'I visit want museum.',
      'The museum does visit.',
      'I want station tall.',
    ],
    answer: 'I want to visit the museum.',
    answerTranslation: L(
      '저는 박물관을 방문하고 싶어요.',
      'Men muzeyga tashrif buyurmoqchiman.',
      'I want to visit the museum.',
      'Я хочу посетить музей.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['visit', 'amsterdam', 'dialog'],
  },

  // ===========================================================
  // Lesson 2 · Describe buildings and places
  // ===========================================================

  en_s1u5_n5_021_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The station has an unusual clock.',
    audioText: 'The station has an unusual clock.',
    answerTranslation: L(
      '그 역에는 특이한 시계가 있어요.',
      'Vokzalda g‘ayrioddiy soat bor.',
      'The station has an unusual clock.',
      'На станции есть необычные часы.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['station', 'unusual', 'clock'],
  },

  en_s1u5_n5_022_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'view',
    choices: [
      { text: 'view', label: '🌇', emoji: '🌇', imageUrl: '' },
      { text: 'ticket', label: '🎫', emoji: '🎫', imageUrl: '' },
      { text: 'cheese', label: '🧀', emoji: '🧀', imageUrl: '' },
      { text: 'camera', label: '📷', emoji: '📷', imageUrl: '' },
    ],
    answerTranslation: L('전망', 'manzara', 'view', 'вид'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['view'],
  },

  en_s1u5_n5_023_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'modern',
        native: 'zamonaviy',
        nativeI18n: L('현대적인', 'zamonaviy', 'modern', 'современный'),
      },
      {
        text: 'unusual',
        native: 'g‘ayrioddiy',
        nativeI18n: L('특이한', 'g‘ayrioddiy', 'unusual', 'необычный'),
      },
      {
        text: 'tall',
        native: 'baland',
        nativeI18n: L('높은', 'baland', 'tall', 'высокий'),
      },
      {
        text: 'similar',
        native: 'o‘xshash',
        nativeI18n: L('비슷한', 'o‘xshash', 'similar', 'похожий'),
      },
      {
        text: 'busy',
        native: 'band',
        nativeI18n: L('붐비는; 바쁜', 'band', 'busy', 'оживлённый'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['adjectives', 'buildings', 'matching'],
  },

  en_s1u5_n5_024_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'The',
      'station',
      'is',
      'usually',
      'very',
      'busy',
      'museum',
      'tall',
    ],
    answer: 'The station is usually very busy',
    answerTranslation: L(
      '그 역은 보통 아주 붐벼요.',
      'Vokzal odatda juda gavjum.',
      'The station is usually very busy.',
      'Станция обычно очень оживлённая.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['station', 'usually', 'busy'],
  },

  en_s1u5_n5_025_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'The',
      'canal',
      'houses',
      'are',
      'hundreds',
      'of',
      'years',
      'old',
      'modern',
    ],
    answer: 'The canal houses are hundreds of years old',
    audioText: 'The canal houses are hundreds of years old.',
    answerTranslation: L(
      '운하 주택들은 수백 년 되었어요.',
      'Kanal bo‘yidagi uylar yuzlab yillik.',
      'The canal houses are hundreds of years old.',
      'Домам у каналов сотни лет.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['canal', 'old', 'buildings'],
  },

  en_s1u5_n5_026_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'modern',
        native: 'zamonaviy',
        nativeI18n: L('현대적인', 'zamonaviy', 'modern', 'современный'),
      },
      {
        text: 'unusual',
        native: 'g‘ayrioddiy',
        nativeI18n: L('특이한', 'g‘ayrioddiy', 'unusual', 'необычный'),
      },
      {
        text: 'tall',
        native: 'baland',
        nativeI18n: L('높은', 'baland', 'tall', 'высокий'),
      },
      {
        text: 'similar',
        native: 'o‘xshash',
        nativeI18n: L('비슷한', 'o‘xshash', 'similar', 'похожий'),
      },
      {
        text: 'view',
        native: 'manzara',
        nativeI18n: L('전망', 'manzara', 'view', 'вид'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['architecture', 'listening'],
  },

  en_s1u5_n5_027_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The two stations are very ___.',
    blankAnswers: ['similar'],
    options: ['similar', 'tall', 'visit', 'canal'],
    answer: 'similar',
    answerTranslation: L(
      '두 역은 아주 비슷해요.',
      'Ikki vokzal juda o‘xshash.',
      'The two stations are very similar.',
      'Эти две станции очень похожи.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['similar', 'station'],
  },

  en_s1u5_n5_028_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'The science centre has great views of the city.',
    audioText: 'The science centre has great views of the city.',
    answerI18n: L(
      '그 과학 센터에서는 도시의 멋진 전망을 볼 수 있어요',
      'Fan markazidan shaharning ajoyib manzaralari ko‘rinadi',
      'The science centre has great views of the city',
      'Из научного центра открывается прекрасный вид на город',
    ),
    options: [
      'The',
      'science',
      'centre',
      'has',
      'great',
      'views',
      'of',
      'the',
      'city',
      'railway',
    ],
    optionsI18n: {
      ko: [
        '그',
        '과학',
        '센터에서는',
        '도시의',
        '멋진',
        '전망을',
        '볼',
        '수',
        '있어요',
        '철도',
      ],
      uz: [
        'Fan',
        'markazidan',
        'shaharning',
        'ajoyib',
        'manzaralari',
        'ko‘rinadi',
        'temiryo‘l',
      ],
      en: [
        'The',
        'science',
        'centre',
        'has',
        'great',
        'views',
        'of',
        'the',
        'city',
        'railway',
      ],
      ru: [
        'Из',
        'научного',
        'центра',
        'открывается',
        'прекрасный',
        'вид',
        'на',
        'город',
        'железная дорога',
      ],
    },
    answerTranslation: L(
      '그 과학 센터에서는 도시의 멋진 전망을 볼 수 있어요.',
      'Fan markazidan shaharning ajoyib manzaralari ko‘rinadi.',
      'The science centre has great views of the city.',
      'Из научного центра открывается прекрасный вид на город.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['science', 'centre', 'view'],
  },

  en_s1u5_n5_029_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Why do you like this building?',
    options: ['Because', 'it', 'has', 'a', 'great', 'view', 'does', 'visit'],
    answer: 'Because it has a great view',
    answerTranslation: L(
      '전망이 멋지기 때문이에요.',
      'Chunki uning manzarasi ajoyib.',
      'Because it has a great view.',
      'Потому что оттуда прекрасный вид.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['why', 'view', 'reply'],
  },

  en_s1u5_n5_030_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'centre',
    choices: [
      { text: 'centre', label: '🏢', emoji: '🏢', imageUrl: '' },
      { text: 'canal', label: '🚤', emoji: '🚤', imageUrl: '' },
      { text: 'cheese', label: '🧀', emoji: '🧀', imageUrl: '' },
      { text: 'railway', label: '🚆', emoji: '🚆', imageUrl: '' },
    ],
    answerTranslation: L('센터', 'markaz', 'centre', 'центр'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['centre'],
  },

  en_s1u5_n5_031_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'This',
      'building',
      'is',
      'twenty-two',
      'metres',
      'tall',
      'view',
      'similar',
    ],
    answer: 'This building is twenty-two metres tall',
    answerTranslation: L(
      '이 건물은 높이가 22미터예요.',
      'Bu bino yigirma ikki metr baland.',
      'This building is twenty-two metres tall.',
      'Высота этого здания — двадцать два метра.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['building', 'tall'],
  },

  en_s1u5_n5_032_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'canal',
        native: 'kanal',
        nativeI18n: L('운하', 'kanal', 'canal', 'канал'),
      },
      {
        text: 'symbol',
        native: 'ramz',
        nativeI18n: L('상징', 'ramz', 'symbol', 'символ'),
      },
      {
        text: 'view',
        native: 'manzara',
        nativeI18n: L('전망', 'manzara', 'view', 'вид'),
      },
      {
        text: 'railway',
        native: 'temiryo‘l',
        nativeI18n: L('철도', 'temiryo‘l', 'railway', 'железная дорога'),
      },
      {
        text: 'hall',
        native: 'zal',
        nativeI18n: L('홀', 'zal', 'hall', 'зал'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['architecture', 'matching'],
  },

  en_s1u5_n5_033_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'The',
      'canal',
      'houses',
      'are',
      'symbols',
      'of',
      'Amsterdam',
      'museum',
    ],
    answer: 'The canal houses are symbols of Amsterdam',
    audioText: 'The canal houses are symbols of Amsterdam.',
    answerTranslation: L(
      '운하 주택들은 암스테르담의 상징이에요.',
      'Kanal bo‘yidagi uylar Amsterdamning ramzlari.',
      'The canal houses are symbols of Amsterdam.',
      'Дома у каналов — символы Амстердама.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['canal', 'symbol', 'amsterdam'],
  },

  en_s1u5_n5_034_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'canal',
        native: 'kanal',
        nativeI18n: L('운하', 'kanal', 'canal', 'канал'),
      },
      {
        text: 'symbol',
        native: 'ramz',
        nativeI18n: L('상징', 'ramz', 'symbol', 'символ'),
      },
      {
        text: 'view',
        native: 'manzara',
        nativeI18n: L('전망', 'manzara', 'view', 'вид'),
      },
      {
        text: 'tall',
        native: 'baland',
        nativeI18n: L('높은', 'baland', 'tall', 'высокий'),
      },
      {
        text: 'similar',
        native: 'o‘xshash',
        nativeI18n: L('비슷한', 'o‘xshash', 'similar', 'похожий'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['architecture', 'listening'],
  },

  en_s1u5_n5_035_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The concert hall is modern.',
    audioText: 'The concert hall is modern.',
    answerTranslation: L(
      '그 공연장은 현대적이에요.',
      'Konsert zali zamonaviy.',
      'The concert hall is modern.',
      'Концертный зал современный.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['hall', 'modern'],
  },

  en_s1u5_n5_036_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The station has an unusual ___.',
    blankAnswers: ['clock'],
    options: ['clock', 'canal', 'view', 'science'],
    answer: 'clock',
    answerTranslation: L(
      '그 역에는 특이한 시계가 있어요.',
      'Vokzalda g‘ayrioddiy soat bor.',
      'The station has an unusual clock.',
      'На станции есть необычные часы.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['station', 'clock', 'unusual'],
  },

  en_s1u5_n5_037_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'hall',
    choices: [
      { text: 'hall', label: '🎵', emoji: '🎵', imageUrl: '' },
      { text: 'canal', label: '🚤', emoji: '🚤', imageUrl: '' },
      { text: 'station', label: '🚉', emoji: '🚉', imageUrl: '' },
      { text: 'supermarket', label: '🛒', emoji: '🛒', imageUrl: '' },
    ],
    answerTranslation: L('홀; 회관', 'zal', 'hall', 'зал'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['hall'],
  },

  en_s1u5_n5_038_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Are the two buildings similar?',
    options: ['Yes', 'they', 'are', 'very', 'similar', 'does'],
    answer: 'Yes they are very similar',
    answerTranslation: L(
      '네, 아주 비슷해요.',
      'Ha, ular juda o‘xshash.',
      'Yes, they are very similar.',
      'Да, они очень похожи.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['similar', 'reply'],
  },

  en_s1u5_n5_039_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'The',
      'science',
      'centre',
      'has',
      'a',
      'great',
      'view',
      'visit',
      'similar',
    ],
    answer: 'The science centre has a great view',
    answerTranslation: L(
      '그 과학 센터에서는 멋진 전망을 볼 수 있어요.',
      'Fan markazidan ajoyib manzara ko‘rinadi.',
      'The science centre has a great view.',
      'Из научного центра открывается прекрасный вид.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['science', 'centre', 'view'],
  },

  en_s1u5_n5_040_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Why do you like the science centre?' },
    ],
    options: [
      'Because it has great views.',
      'Because it is a railway.',
      'It views because great.',
      'Because visit the canal.',
    ],
    answer: 'Because it has great views.',
    answerTranslation: L(
      '전망이 멋지기 때문이에요.',
      'Chunki u yerdan ajoyib manzaralar ko‘rinadi.',
      'Because it has great views.',
      'Потому что оттуда открывается прекрасный вид.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['why', 'view', 'dialog'],
  },

  // ===========================================================
  // Lesson 3 · Weekend plans and email
  // ===========================================================

  en_s1u5_n5_041_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I want to visit the museum.',
    audioText: 'I want to visit the museum.',
    answerTranslation: L(
      '저는 박물관을 방문하고 싶어요.',
      'Men muzeyga tashrif buyurmoqchiman.',
      'I want to visit the museum.',
      'Я хочу посетить музей.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['plans', 'visit'],
  },

  en_s1u5_n5_042_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'plan',
    choices: [
      { text: 'plan', label: '📝', emoji: '📝', imageUrl: '' },
      { text: 'ticket', label: '🎫', emoji: '🎫', imageUrl: '' },
      { text: 'cheese', label: '🧀', emoji: '🧀', imageUrl: '' },
      { text: 'canal', label: '🚤', emoji: '🚤', imageUrl: '' },
    ],
    answerTranslation: L('계획', 'reja', 'plan', 'план'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['plans'],
  },

  en_s1u5_n5_043_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'visit',
        native: 'tashrif buyurmoq',
        nativeI18n: L('방문하다', 'tashrif buyurmoq', 'visit', 'посещать'),
      },
      {
        text: 'plan',
        native: 'reja',
        nativeI18n: L('계획', 'reja', 'plan', 'план'),
      },
      {
        text: 'email',
        native: 'elektron xat',
        nativeI18n: L('이메일', 'elektron xat', 'email', 'электронное письмо'),
      },
      {
        text: 'museum',
        native: 'muzey',
        nativeI18n: L('박물관', 'muzey', 'museum', 'музей'),
      },
      {
        text: 'canal',
        native: 'kanal',
        nativeI18n: L('운하', 'kanal', 'canal', 'канал'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['plans', 'matching'],
  },

  en_s1u5_n5_044_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'I',
      'want',
      'to',
      'go',
      'to',
      'Amsterdam',
      'this',
      'weekend',
      'museum',
    ],
    answer: 'I want to go to Amsterdam this weekend',
    answerTranslation: L(
      '이번 주말에 암스테르담에 가고 싶어요.',
      'Men bu dam olish kunlari Amsterdamga bormoqchiman.',
      'I want to go to Amsterdam this weekend.',
      'Я хочу поехать в Амстердам на этих выходных.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['plans', 'weekend', 'amsterdam'],
  },

  en_s1u5_n5_045_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'I',
      'want',
      'to',
      'visit',
      'the',
      'science',
      'centre',
      'railway',
    ],
    answer: 'I want to visit the science centre',
    audioText: 'I want to visit the science centre.',
    answerTranslation: L(
      '과학 센터를 방문하고 싶어요.',
      'Men fan markaziga tashrif buyurmoqchiman.',
      'I want to visit the science centre.',
      'Я хочу посетить научный центр.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['visit', 'science', 'centre'],
  },

  en_s1u5_n5_046_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'visit',
        native: 'tashrif buyurmoq',
        nativeI18n: L('방문하다', 'tashrif buyurmoq', 'visit', 'посещать'),
      },
      {
        text: 'plan',
        native: 'reja',
        nativeI18n: L('계획', 'reja', 'plan', 'план'),
      },
      {
        text: 'email',
        native: 'elektron xat',
        nativeI18n: L('이메일', 'elektron xat', 'email', 'электронное письмо'),
      },
      {
        text: 'canal',
        native: 'kanal',
        nativeI18n: L('운하', 'kanal', 'canal', 'канал'),
      },
      {
        text: 'centre',
        native: 'markaz',
        nativeI18n: L('센터', 'markaz', 'centre', 'центр'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['plans', 'listening'],
  },

  en_s1u5_n5_047_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I want to ___ the museum.',
    blankAnswers: ['visit'],
    options: ['visit', 'similar', 'tall', 'plan'],
    answer: 'visit',
    answerTranslation: L(
      '저는 박물관을 방문하고 싶어요.',
      'Men muzeyga tashrif buyurmoqchiman.',
      'I want to visit the museum.',
      'Я хочу посетить музей.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['visit', 'museum'],
  },

  en_s1u5_n5_048_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'I want to see the canal houses.',
    audioText: 'I want to see the canal houses.',
    answerI18n: L(
      '저는 운하 주택들을 보고 싶어요',
      'Men kanal bo‘yidagi uylarni ko‘rmoqchiman',
      'I want to see the canal houses',
      'Я хочу увидеть дома у каналов',
    ),
    options: ['I', 'want', 'to', 'see', 'the', 'canal', 'houses', 'station'],
    optionsI18n: {
      ko: ['저는', '운하', '주택들을', '보고', '싶어요', '역을'],
      uz: ['Men', 'kanal', 'bo‘yidagi', 'uylarni', 'ko‘rmoqchiman', 'vokzalni'],
      en: ['I', 'want', 'to', 'see', 'the', 'canal', 'houses', 'station'],
      ru: ['Я', 'хочу', 'увидеть', 'дома', 'у', 'каналов', 'станцию'],
    },
    answerTranslation: L(
      '저는 운하 주택들을 보고 싶어요.',
      'Men kanal bo‘yidagi uylarni ko‘rmoqchiman.',
      'I want to see the canal houses.',
      'Я хочу увидеть дома у каналов.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['plans', 'canal'],
  },

  en_s1u5_n5_049_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What do you want to do this weekend?',
    options: ['I', 'want', 'to', 'visit', 'the', 'museum', 'does', 'similar'],
    answer: 'I want to visit the museum',
    answerTranslation: L(
      '박물관을 방문하고 싶어요.',
      'Men muzeyga tashrif buyurmoqchiman.',
      'I want to visit the museum.',
      'Я хочу посетить музей.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['weekend', 'plans', 'reply'],
  },

  en_s1u5_n5_050_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'email',
    choices: [
      { text: 'email', label: '📧', emoji: '📧', imageUrl: '' },
      { text: 'ticket', label: '🎫', emoji: '🎫', imageUrl: '' },
      { text: 'camera', label: '📷', emoji: '📷', imageUrl: '' },
      { text: 'cheese', label: '🧀', emoji: '🧀', imageUrl: '' },
    ],
    answerTranslation: L(
      '이메일',
      'elektron xat',
      'email',
      'электронное письмо',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['email', 'plans'],
  },

  en_s1u5_n5_051_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'I',
      'want',
      'to',
      'visit',
      'the',
      'museum',
      'and',
      'the',
      'station',
      'does',
    ],
    answer: 'I want to visit the museum and the station',
    answerTranslation: L(
      '박물관과 역을 방문하고 싶어요.',
      'Men muzey va vokzalga tashrif buyurmoqchiman.',
      'I want to visit the museum and the station.',
      'Я хочу посетить музей и вокзал.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['visit', 'museum', 'station'],
  },

  en_s1u5_n5_052_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'supermarket',
        native: 'supermarket',
        nativeI18n: L('슈퍼마켓', 'supermarket', 'supermarket', 'супермаркет'),
      },
      {
        text: 'cheese',
        native: 'pishloq',
        nativeI18n: L('치즈', 'pishloq', 'cheese', 'сыр'),
      },
      {
        text: 'science',
        native: 'fan',
        nativeI18n: L('과학', 'fan', 'science', 'наука'),
      },
      {
        text: 'centre',
        native: 'markaz',
        nativeI18n: L('센터', 'markaz', 'centre', 'центр'),
      },
      {
        text: 'hall',
        native: 'zal',
        nativeI18n: L('홀', 'zal', 'hall', 'зал'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['places', 'matching'],
  },

  en_s1u5_n5_053_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'I',
      'want',
      'to',
      'go',
      'to',
      'the',
      'concert',
      'hall',
      'museum',
    ],
    answer: 'I want to go to the concert hall',
    audioText: 'I want to go to the concert hall.',
    answerTranslation: L(
      '공연장에 가고 싶어요.',
      'Men konsert zaliga bormoqchiman.',
      'I want to go to the concert hall.',
      'Я хочу пойти в концертный зал.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['plans', 'hall'],
  },

  en_s1u5_n5_054_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'supermarket',
        native: 'supermarket',
        nativeI18n: L('슈퍼마켓', 'supermarket', 'supermarket', 'супермаркет'),
      },
      {
        text: 'cheese',
        native: 'pishloq',
        nativeI18n: L('치즈', 'pishloq', 'cheese', 'сыр'),
      },
      {
        text: 'science',
        native: 'fan',
        nativeI18n: L('과학', 'fan', 'science', 'наука'),
      },
      {
        text: 'centre',
        native: 'markaz',
        nativeI18n: L('센터', 'markaz', 'centre', 'центр'),
      },
      {
        text: 'hall',
        native: 'zal',
        nativeI18n: L('홀', 'zal', 'hall', 'зал'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['places', 'listening'],
  },

  en_s1u5_n5_055_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I want to go to Amsterdam for the weekend.',
    audioText: 'I want to go to Amsterdam for the weekend.',
    answerTranslation: L(
      '주말에 암스테르담에 가고 싶어요.',
      'Men dam olish kunlari Amsterdamga bormoqchiman.',
      'I want to go to Amsterdam for the weekend.',
      'Я хочу поехать в Амстердам на выходные.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['plans', 'weekend'],
  },

  en_s1u5_n5_056_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'My ___ is to visit the museum.',
    blankAnswers: ['plan'],
    options: ['plan', 'view', 'symbol', 'canal'],
    answer: 'plan',
    answerTranslation: L(
      '제 계획은 박물관을 방문하는 거예요.',
      'Mening rejam muzeyga tashrif buyurish.',
      'My plan is to visit the museum.',
      'Мой план — посетить музей.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['plan', 'visit'],
  },

  en_s1u5_n5_057_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'supermarket',
    choices: [
      { text: 'supermarket', label: '🛒', emoji: '🛒', imageUrl: '' },
      { text: 'museum', label: '🏛️', emoji: '🏛️', imageUrl: '' },
      { text: 'station', label: '🚉', emoji: '🚉', imageUrl: '' },
      { text: 'cinema', label: '🎬', emoji: '🎬', imageUrl: '' },
    ],
    answerTranslation: L(
      '슈퍼마켓',
      'supermarket',
      'supermarket',
      'супермаркет',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['supermarket'],
  },

  en_s1u5_n5_058_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Do you want to visit the science centre?',
    options: ['Yes', 'I', 'do', 'It', 'looks', 'interesting', 'does'],
    answer: 'Yes I do It looks interesting',
    answerTranslation: L(
      '네. 흥미로워 보여요.',
      'Ha. U qiziqarli ko‘rinadi.',
      'Yes, I do. It looks interesting.',
      'Да. Он выглядит интересно.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['visit', 'science', 'reply'],
  },

  en_s1u5_n5_059_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'I',
      'want',
      'to',
      'see',
      'the',
      'city',
      'from',
      'the',
      'science',
      'centre',
    ],
    answer: 'I want to see the city from the science centre',
    answerTranslation: L(
      '과학 센터에서 도시를 보고 싶어요.',
      'Men fan markazidan shaharni ko‘rmoqchiman.',
      'I want to see the city from the science centre.',
      'Я хочу посмотреть на город из научного центра.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['plans', 'science', 'centre', 'view'],
  },

  en_s1u5_n5_060_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'What do you want to do in Amsterdam?' },
    ],
    options: [
      'I want to visit the canal houses.',
      'I want canal visit houses.',
      'The houses want Amsterdam.',
      'I do visit want.',
    ],
    answer: 'I want to visit the canal houses.',
    answerTranslation: L(
      '운하 주택들을 방문하고 싶어요.',
      'Men kanal bo‘yidagi uylarni ko‘rmoqchiman.',
      'I want to visit the canal houses.',
      'Я хочу посетить дома у каналов.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['plans', 'canal', 'dialog'],
  },

  // ===========================================================
  // Lesson 4 · Unit 5 Review
  // ===========================================================

  en_s1u5_n5_061_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I usually wear blue jeans.',
    audioText: 'I usually wear blue jeans.',
    answerTranslation: L(
      '저는 보통 파란 청바지를 입어요.',
      'Men odatda ko‘k jinsi kiyaman.',
      'I usually wear blue jeans.',
      'Я обычно ношу синие джинсы.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['review', 'frequency', 'clothes'],
  },

  en_s1u5_n5_062_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'blue',
    choices: [
      { text: 'blue', label: '🟦', emoji: '🟦', imageUrl: '' },
      { text: 'red', label: '🟥', emoji: '🟥', imageUrl: '' },
      { text: 'green', label: '🟩', emoji: '🟩', imageUrl: '' },
      { text: 'yellow', label: '🟨', emoji: '🟨', imageUrl: '' },
    ],
    answerTranslation: L('파란색', 'ko‘k', 'blue', 'синий'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['review', 'colours'],
  },

  en_s1u5_n5_063_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'always',
        native: 'har doim',
        nativeI18n: L('항상', 'har doim', 'always', 'всегда'),
      },
      {
        text: 'usually',
        native: 'odatda',
        nativeI18n: L('보통', 'odatda', 'usually', 'обычно'),
      },
      {
        text: 'often',
        native: 'tez-tez',
        nativeI18n: L('자주', 'tez-tez', 'often', 'часто'),
      },
      {
        text: 'sometimes',
        native: 'ba’zan',
        nativeI18n: L('가끔', 'ba’zan', 'sometimes', 'иногда'),
      },
      {
        text: 'never',
        native: 'hech qachon',
        nativeI18n: L('절대 ~않다', 'hech qachon', 'never', 'никогда'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['review', 'frequency', 'matching'],
  },

  en_s1u5_n5_064_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'My',
      'father',
      'sometimes',
      'wears',
      'sports',
      'clothes',
      'never',
      'do',
    ],
    answer: 'My father sometimes wears sports clothes',
    answerTranslation: L(
      '제 아버지는 가끔 운동복 스타일의 옷을 입어요.',
      'Otam ba’zan sport kiyimlarini kiyadi.',
      'My father sometimes wears sports clothes.',
      'Мой отец иногда носит спортивную одежду.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'frequency', 'clothes'],
  },

  en_s1u5_n5_065_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['Why', 'do', 'you', 'like', 'the', 'building', 'where', 'does'],
    answer: 'Why do you like the building',
    audioText: 'Why do you like the building?',
    answerTranslation: L(
      '왜 그 건물을 좋아해요?',
      'Nega bu bino sizga yoqadi?',
      'Why do you like the building?',
      'Почему вам нравится это здание?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['review', 'wh-questions'],
  },

  en_s1u5_n5_066_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'arm',
        native: 'qo‘l',
        nativeI18n: L('팔', 'qo‘l', 'arm', 'рука'),
      },
      {
        text: 'face',
        native: 'yuz',
        nativeI18n: L('얼굴', 'yuz', 'face', 'лицо'),
      },
      {
        text: 'hair',
        native: 'soch',
        nativeI18n: L('머리카락', 'soch', 'hair', 'волосы'),
      },
      {
        text: 'head',
        native: 'bosh',
        nativeI18n: L('머리', 'bosh', 'head', 'голова'),
      },
      {
        text: 'foot',
        native: 'oyoq panjasi',
        nativeI18n: L('발', 'oyoq panjasi', 'foot', 'ступня'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['review', 'body-parts', 'listening'],
  },

  en_s1u5_n5_067_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'What time is the ___ bus to the city centre?',
    blankAnswers: ['next'],
    options: ['next', 'tall', 'similar', 'view'],
    answer: 'next',
    answerTranslation: L(
      '도심으로 가는 다음 버스는 몇 시예요?',
      'Shahar markaziga keyingi avtobus soat nechada?',
      'What time is the next bus to the city centre?',
      'Во сколько следующий автобус до центра города?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'travel', 'next'],
  },

  en_s1u5_n5_068_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Where does the bus go from?',
    audioText: 'Where does the bus go from?',
    answerI18n: L(
      '버스는 어디에서 출발해요',
      'Avtobus qayerdan jo‘naydi',
      'Where does the bus go from',
      'Откуда отправляется автобус',
    ),
    options: ['Where', 'does', 'the', 'bus', 'go', 'from', 'when'],
    optionsI18n: {
      ko: ['버스는', '어디에서', '출발해요', '언제'],
      uz: ['Avtobus', 'qayerdan', 'jo‘naydi', 'qachon'],
      en: ['Where', 'does', 'the', 'bus', 'go', 'from', 'when'],
      ru: ['Откуда', 'отправляется', 'автобус', 'когда'],
    },
    answerTranslation: L(
      '버스는 어디에서 출발해요?',
      'Avtobus qayerdan jo‘naydi?',
      'Where does the bus go from?',
      'Откуда отправляется автобус?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['review', 'travel', 'where'],
  },

  en_s1u5_n5_069_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'How much is it to the city centre?',
    options: ['It', 'is', 'five', 'euros', 'next', 'does'],
    answer: 'It is five euros',
    answerTranslation: L(
      '5유로예요.',
      'Besh yevro.',
      'It is five euros.',
      'Пять евро.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'price', 'travel'],
  },

  en_s1u5_n5_070_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'head',
    choices: [
      { text: 'head', label: '👤', emoji: '👤', imageUrl: '' },
      { text: 'hand', label: '✋', emoji: '✋', imageUrl: '' },
      { text: 'foot', label: '🦶', emoji: '🦶', imageUrl: '' },
      { text: 'leg', label: '🦵', emoji: '🦵', imageUrl: '' },
    ],
    answerTranslation: L('머리', 'bosh', 'head', 'голова'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['review', 'body-parts'],
  },

  en_s1u5_n5_071_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'My',
      'work',
      'clothes',
      'are',
      'always',
      'smart',
      'never',
      'wear',
    ],
    answer: 'My work clothes are always smart',
    answerTranslation: L(
      '제 출근 옷은 항상 단정해요.',
      'Mening ish kiyimlarim har doim ozoda.',
      'My work clothes are always smart.',
      'Моя рабочая одежда всегда элегантная.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'frequency', 'smart'],
  },

  en_s1u5_n5_072_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'modern',
        native: 'zamonaviy',
        nativeI18n: L('현대적인', 'zamonaviy', 'modern', 'современный'),
      },
      {
        text: 'unusual',
        native: 'g‘ayrioddiy',
        nativeI18n: L('특이한', 'g‘ayrioddiy', 'unusual', 'необычный'),
      },
      {
        text: 'traditional',
        native: 'an’anaviy',
        nativeI18n: L('전통적인', 'an’anaviy', 'traditional', 'традиционный'),
      },
      {
        text: 'colourful',
        native: 'rang-barang',
        nativeI18n: L('화려한', 'rang-barang', 'colourful', 'яркий'),
      },
      {
        text: 'similar',
        native: 'o‘xshash',
        nativeI18n: L('비슷한', 'o‘xshash', 'similar', 'похожий'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['review', 'adjectives', 'matching'],
  },

  en_s1u5_n5_073_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'ticket',
        native: 'chipta',
        nativeI18n: L('표', 'chipta', 'ticket', 'билет'),
      },
      {
        text: 'station',
        native: 'vokzal',
        nativeI18n: L('역', 'vokzal', 'station', 'станция'),
      },
      {
        text: 'platform',
        native: 'platforma',
        nativeI18n: L('승강장', 'platforma', 'platform', 'платформа'),
      },
      {
        text: 'flight',
        native: 'reys',
        nativeI18n: L('항공편', 'reys', 'flight', 'рейс'),
      },
      {
        text: 'metro',
        native: 'metro',
        nativeI18n: L('지하철', 'metro', 'metro', 'метро'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['review', 'travel', 'listening'],
  },

  en_s1u5_n5_074_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['Where', 'do', 'I', 'buy', 'a', 'ticket', 'does', 'next'],
    answer: 'Where do I buy a ticket',
    audioText: 'Where do I buy a ticket?',
    answerTranslation: L(
      '표는 어디에서 사요?',
      'Chiptani qayerdan sotib olaman?',
      'Where do I buy a ticket?',
      'Где я могу купить билет?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['review', 'ticket', 'travel'],
  },

  en_s1u5_n5_075_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Her clothes are really colourful.',
    audioText: 'Her clothes are really colourful.',
    answerTranslation: L(
      '그녀의 옷은 정말 화려해요.',
      'Uning kiyimlari juda rang-barang.',
      'Her clothes are really colourful.',
      'Её одежда очень яркая.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['review', 'really', 'colourful'],
  },

  en_s1u5_n5_076_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ do you like this building?',
    blankAnswers: ['Why'],
    options: ['Why', 'When', 'Where', 'What'],
    answer: 'Why',
    answerTranslation: L(
      '왜 이 건물을 좋아해요?',
      'Nega bu bino sizga yoqadi?',
      'Why do you like this building?',
      'Почему вам нравится это здание?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'why'],
  },

  en_s1u5_n5_077_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'ticket',
    choices: [
      { text: 'ticket', label: '🎫', emoji: '🎫', imageUrl: '' },
      { text: 'camera', label: '📷', emoji: '📷', imageUrl: '' },
      { text: 'email', label: '📧', emoji: '📧', imageUrl: '' },
      { text: 'cheese', label: '🧀', emoji: '🧀', imageUrl: '' },
    ],
    answerTranslation: L('표', 'chipta', 'ticket', 'билет'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['review', 'ticket'],
  },

  en_s1u5_n5_078_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'She usually wears a colourful dress.',
    audioText: 'She usually wears a colourful dress.',
    answerI18n: L(
      '그녀는 보통 화려한 드레스를 입어요',
      'U odatda rang-barang ko‘ylak kiyadi',
      'She usually wears a colourful dress',
      'Она обычно носит яркое платье',
    ),
    options: [
      'She',
      'usually',
      'wears',
      'a',
      'colourful',
      'dress',
      'never',
      'does',
    ],
    optionsI18n: {
      ko: ['그녀는', '보통', '화려한', '드레스를', '입어요', '절대'],
      uz: ['U', 'odatda', 'rang-barang', 'ko‘ylak', 'kiyadi', 'hech qachon'],
      en: [
        'She',
        'usually',
        'wears',
        'a',
        'colourful',
        'dress',
        'never',
        'does',
      ],
      ru: ['Она', 'обычно', 'носит', 'яркое', 'платье', 'никогда'],
    },
    answerTranslation: L(
      '그녀는 보통 화려한 드레스를 입어요.',
      'U odatda rang-barang ko‘ylak kiyadi.',
      'She usually wears a colourful dress.',
      'Она обычно носит яркое платье.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['review', 'frequency', 'style'],
  },

  en_s1u5_n5_079_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Does this bus go to the city centre?',
    options: ['Yes', 'it', 'does', 'No', 'ticket', 'similar'],
    answer: 'Yes it does',
    answerTranslation: L('네, 가요.', 'Ha, boradi.', 'Yes, it does.', 'Да.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'bus', 'reply'],
  },

  en_s1u5_n5_080_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'What time is the next bus to the city centre?' },
    ],
    options: [
      'It leaves at ten thirty.',
      'It is very colourful.',
      'It has long hair.',
      'The building is similar.',
    ],
    answer: 'It leaves at ten thirty.',
    answerTranslation: L(
      '10시 30분에 출발해요.',
      'U soat o‘n yarimda jo‘naydi.',
      'It leaves at ten thirty.',
      'Он отправляется в десять тридцать.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'travel', 'final'],
  },
};

export const EN_S1_UNIT5_NODE5 = {
  title: L(
    '암스테르담 건축과 복습',
    'Amsterdam arxitekturasi va takrorlash',
    'Architecture in Amsterdam',
    'Архитектура Амстердама',
  ),
  section: 1,
  unit: 5,
  order: 5,
  isActive: true,

  lessons: [
    {
      title: L(
        '암스테르담의 건축물',
        'Amsterdam binolari',
        'Architecture in Amsterdam',
        'Архитектура Амстердама',
      ),
      description: L(
        '운하 주택, 기차역, 박물관, 공연장, 과학 센터 같은 암스테르담의 장소를 배워요.',
        'Amsterdamdagi kanal uylari, vokzal, muzey, konsert zali va fan markazi kabi joylarni o‘rganasiz.',
        'Learn about Amsterdam places such as canal houses, a railway station, museum, concert hall and science centre.',
        'Изучаем места Амстердама: дома у каналов, вокзал, музей, концертный зал и научный центр.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 1,
      questions: [
        'en_s1u5_n5_001_speaking',
        'en_s1u5_n5_002_image_choice',
        'en_s1u5_n5_003_word_matching',
        'en_s1u5_n5_004_translate_builder',
        'en_s1u5_n5_005_word_arrange',
        'en_s1u5_n5_006_audio_match',
        'en_s1u5_n5_007_image_choice',
        'en_s1u5_n5_008_fill_in_blank',
        'en_s1u5_n5_009_sentence_builder',
        'en_s1u5_n5_010_reply_builder',
        'en_s1u5_n5_011_translate_builder',
        'en_s1u5_n5_012_word_matching',
        'en_s1u5_n5_013_image_choice',
        'en_s1u5_n5_014_audio_match',
        'en_s1u5_n5_015_word_arrange',
        'en_s1u5_n5_016_fill_in_blank',
        'en_s1u5_n5_017_speaking',
        'en_s1u5_n5_018_image_choice',
        'en_s1u5_n5_019_translate_builder',
        'en_s1u5_n5_020_dialog_complete',
      ],
    },

    {
      title: L(
        '건물 특징 설명하기',
        'Binolar xususiyatlarini tasvirlash',
        'Describe buildings',
        'Описываем здания',
      ),
      description: L(
        '건물의 나이, 높이, 전망, 독특한 특징과 서로 비슷한 점을 설명해요.',
        'Binolarning yoshi, balandligi, manzarasi, g‘ayrioddiy xususiyatlari va o‘xshash tomonlarini tasvirlaysiz.',
        'Describe a building’s age, height, views, unusual features and similarities.',
        'Описываем возраст, высоту, вид, необычные особенности и сходства зданий.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 2,
      questions: [
        'en_s1u5_n5_021_speaking',
        'en_s1u5_n5_022_image_choice',
        'en_s1u5_n5_023_word_matching',
        'en_s1u5_n5_024_translate_builder',
        'en_s1u5_n5_025_word_arrange',
        'en_s1u5_n5_026_audio_match',
        'en_s1u5_n5_027_fill_in_blank',
        'en_s1u5_n5_028_sentence_builder',
        'en_s1u5_n5_029_reply_builder',
        'en_s1u5_n5_030_image_choice',
        'en_s1u5_n5_031_translate_builder',
        'en_s1u5_n5_032_word_matching',
        'en_s1u5_n5_033_word_arrange',
        'en_s1u5_n5_034_audio_match',
        'en_s1u5_n5_035_speaking',
        'en_s1u5_n5_036_fill_in_blank',
        'en_s1u5_n5_037_image_choice',
        'en_s1u5_n5_038_reply_builder',
        'en_s1u5_n5_039_translate_builder',
        'en_s1u5_n5_040_dialog_complete',
      ],
    },

    {
      title: L(
        '주말 여행 계획',
        'Dam olish kunlari sayohat rejasi',
        'Weekend plans',
        'Планы на выходные',
      ),
      description: L(
        'I want to go..., I want to visit...을 사용해 여행 계획을 말하고 간단한 이메일 내용을 연습해요.',
        'I want to go... va I want to visit... yordamida sayohat rejalari haqida gapirib, oddiy email mazmunini mashq qilasiz.',
        'Use I want to go... and I want to visit... to talk about travel plans and simple email content.',
        'Используем I want to go... и I want to visit... для разговора о планах поездки и простых письмах.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 3,
      questions: [
        'en_s1u5_n5_041_speaking',
        'en_s1u5_n5_042_image_choice',
        'en_s1u5_n5_043_word_matching',
        'en_s1u5_n5_044_translate_builder',
        'en_s1u5_n5_045_word_arrange',
        'en_s1u5_n5_046_audio_match',
        'en_s1u5_n5_047_fill_in_blank',
        'en_s1u5_n5_048_sentence_builder',
        'en_s1u5_n5_049_reply_builder',
        'en_s1u5_n5_050_image_choice',
        'en_s1u5_n5_051_translate_builder',
        'en_s1u5_n5_052_word_matching',
        'en_s1u5_n5_053_word_arrange',
        'en_s1u5_n5_054_audio_match',
        'en_s1u5_n5_055_speaking',
        'en_s1u5_n5_056_fill_in_blank',
        'en_s1u5_n5_057_image_choice',
        'en_s1u5_n5_058_reply_builder',
        'en_s1u5_n5_059_translate_builder',
        'en_s1u5_n5_060_dialog_complete',
      ],
    },

    {
      title: L(
        '유닛 5 종합 복습',
        '5-unit umumiy takrorlash',
        'Unit 5 review',
        'Повторение раздела 5',
      ),
      description: L(
        '옷과 색깔, 빈도부사, Wh-질문, 건물, 신체 부위, 스타일, 교통 정보를 한 번에 복습해요.',
        'Kiyim va ranglar, chastota ravishlari, Wh-savollar, binolar, tana qismlari, uslub va transport ma’lumotlarini takrorlaysiz.',
        'Review clothes and colours, frequency adverbs, Wh- questions, buildings, body parts, style and travel information.',
        'Повторяем одежду и цвета, наречия частотности, Wh-вопросы, здания, части тела, стиль и транспорт.',
      ),
      category: LessonCategory.LISTENING,
      level: LV,
      order: 4,
      questions: [
        'en_s1u5_n5_061_speaking',
        'en_s1u5_n5_062_image_choice',
        'en_s1u5_n5_063_word_matching',
        'en_s1u5_n5_064_translate_builder',
        'en_s1u5_n5_065_word_arrange',
        'en_s1u5_n5_066_audio_match',
        'en_s1u5_n5_067_fill_in_blank',
        'en_s1u5_n5_068_sentence_builder',
        'en_s1u5_n5_069_reply_builder',
        'en_s1u5_n5_070_image_choice',
        'en_s1u5_n5_071_translate_builder',
        'en_s1u5_n5_072_word_matching',
        'en_s1u5_n5_073_audio_match',
        'en_s1u5_n5_074_word_arrange',
        'en_s1u5_n5_075_speaking',
        'en_s1u5_n5_076_fill_in_blank',
        'en_s1u5_n5_077_image_choice',
        'en_s1u5_n5_078_sentence_builder',
        'en_s1u5_n5_079_reply_builder',
        'en_s1u5_n5_080_dialog_complete',
      ],
    },
  ],
};
