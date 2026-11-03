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
// Section 2 · Unit 2 · Node 1
// 2.1 A day in the life of a scientist
//
// Coverage
// - scientist / research / island / penguin / seal
// - daily activities
// - get / go / have / make / listen / play / read / see / watch
// - breakfast / lunch / dinner / shower / music / film / game
// - work / college / friend / book
// - present simple positive
// - I / you / we / they + base verb
// - he / she / it + verb-s
// - third person spelling:
//   work → works
//   study → studies
//   go → goes
//   watch → watches
// - third person pronunciation
// - adverbs of frequency
// - always / usually / often / sometimes / never
// - hardly ever
// - adverb position
//
// IMPORTANT:
// *_WORDS에는 단어 하나만 등록.
// "get up", "go to bed", "have a shower",
// "play video games", "hardly ever" 같은 구는 headword로 등록하지 않음.
// 대신 문제 안에서 실제 표현으로 모두 학습.
//
// 4 lessons × 20 questions = 80
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT2_NODE1_WORDS = [
  {
    code: 'en-person-scientist',
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
        english: 'Melanie is a scientist.',
        translations: L(
          'Melanie는 과학자예요.',
          'Melanie olim.',
          'Melanie is a scientist.',
          'Мелани — учёный.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈsaɪəntɪst/',
      ttsText: 'scientist',
    },
    tags: ['people', 'science', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-person-herpetologist',
    english: 'herpetologist',
    senseKey: 'scientist-studying-reptiles',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '파충류학자',
      'gerpetolog',
      'a scientist who studies reptiles and amphibians',
      'герпетолог',
    ),
    examples: [
      {
        english: 'Lisa is a herpetologist.',
        translations: L(
          'Lisa는 파충류학자예요.',
          'Lisa gerpetolog.',
          'Lisa is a herpetologist.',
          'Лиза — герпетолог.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌhɜːpɪˈtɒlədʒɪst/',
      ttsText: 'herpetologist',
    },
    tags: ['people', 'science', 'unit2'],
    difficulty: 3,
    isCore: true,
  },

  {
    code: 'en-noun-zoology',
    english: 'zoology',
    senseKey: 'study-of-animals',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '동물학',
      'zoologiya',
      'the scientific study of animals',
      'зоология',
    ),
    examples: [
      {
        english: 'She is a professor of zoology.',
        translations: L(
          '그녀는 동물학 교수예요.',
          'U zoologiya professori.',
          'She is a professor of zoology.',
          'Она профессор зоологии.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/zuːˈɒlədʒi/',
      ttsText: 'zoology',
    },
    tags: ['science', 'unit2'],
    difficulty: 3,
    isCore: true,
  },

  {
    code: 'en-noun-research',
    english: 'research',
    senseKey: 'careful-study',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '연구',
      'tadqiqot',
      'careful study to discover new information',
      'исследование',
    ),
    examples: [
      {
        english: 'Scientists do research on the island.',
        translations: L(
          '과학자들은 섬에서 연구해요.',
          'Olimlar orolda tadqiqot olib boradi.',
          'Scientists do research on the island.',
          'Учёные проводят исследования на острове.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/rɪˈsɜːtʃ/',
      ttsText: 'research',
    },
    tags: ['science', 'unit2'],
    difficulty: 2,
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
        english: 'She works on an island.',
        translations: L(
          '그녀는 섬에서 일해요.',
          'U orolda ishlaydi.',
          'She works on an island.',
          'Она работает на острове.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈaɪlənd/',
      ttsText: 'island',
    },
    tags: ['places', 'science', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-animal-penguin',
    english: 'penguin',
    senseKey: 'flightless-seabird',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '펭귄',
      'pingvin',
      'a black-and-white seabird that cannot fly',
      'пингвин',
    ),
    examples: [
      {
        english: 'She studies penguins.',
        translations: L(
          '그녀는 펭귄을 연구해요.',
          'U pingvinlarni o‘rganadi.',
          'She studies penguins.',
          'Она изучает пингвинов.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈpeŋɡwɪn/',
      ttsText: 'penguin',
    },
    tags: ['animals', 'science', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-animal-seal',
    english: 'seal',
    senseKey: 'sea-mammal',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '물개; 바다표범',
      'tyulen',
      'a sea mammal with flippers',
      'тюлень',
    ),
    examples: [
      {
        english: 'There are seals on the island.',
        translations: L(
          '섬에는 바다표범이 있어요.',
          'Orolda tyulenlar bor.',
          'There are seals on the island.',
          'На острове есть тюлени.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/siːl/',
      ttsText: 'seal',
    },
    tags: ['animals', 'science', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-animal-reptile',
    english: 'reptile',
    senseKey: 'cold-blooded-animal',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '파충류',
      'sudralib yuruvchi',
      'an animal such as a snake or lizard',
      'рептилия',
    ),
    examples: [
      {
        english: 'A herpetologist studies reptiles.',
        translations: L(
          '파충류학자는 파충류를 연구해요.',
          'Gerpetolog sudralib yuruvchilarni o‘rganadi.',
          'A herpetologist studies reptiles.',
          'Герпетолог изучает рептилий.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈreptaɪl/',
      ttsText: 'reptile',
    },
    tags: ['animals', 'science', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-place-beach',
    english: 'beach',
    senseKey: 'shore-by-sea',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('해변', 'plyaj', 'an area next to the sea', 'пляж'),
    examples: [
      {
        english: 'She goes to the beach.',
        translations: L(
          '그녀는 해변에 가요.',
          'U plyajga boradi.',
          'She goes to the beach.',
          'Она ходит на пляж.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/biːtʃ/',
      ttsText: 'beach',
    },
    tags: ['places', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-vehicle-boat',
    english: 'boat',
    senseKey: 'small-water-vehicle',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('배; 보트', 'qayiq', 'a small vehicle used on water', 'лодка'),
    examples: [
      {
        english: 'She goes out in a boat.',
        translations: L(
          '그녀는 배를 타고 나가요.',
          'U qayiqda chiqadi.',
          'She goes out in a boat.',
          'Она выходит в море на лодке.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/bəʊt/',
      ttsText: 'boat',
    },
    tags: ['transport', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-photo',
    english: 'photo',
    senseKey: 'photograph',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('사진', 'surat', 'a photograph', 'фотография'),
    examples: [
      {
        english: 'She takes photos.',
        translations: L(
          '그녀는 사진을 찍어요.',
          'U suratga oladi.',
          'She takes photos.',
          'Она фотографирует.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈfəʊtəʊ/',
      ttsText: 'photo',
    },
    tags: ['activities', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-meal-breakfast',
    english: 'breakfast',
    senseKey: 'morning-meal',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('아침 식사', 'nonushta', 'the first meal of the day', 'завтрак'),
    examples: [
      {
        english: 'I have breakfast at seven.',
        translations: L(
          '저는 7시에 아침을 먹어요.',
          'Men soat yettida nonushta qilaman.',
          'I have breakfast at seven.',
          'Я завтракаю в семь.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈbrekfəst/',
      ttsText: 'breakfast',
    },
    tags: ['daily-activities', 'meals', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-meal-lunch',
    english: 'lunch',
    senseKey: 'midday-meal',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '점심 식사',
      'tushlik',
      'a meal eaten around the middle of the day',
      'обед',
    ),
    examples: [
      {
        english: 'We have lunch at work.',
        translations: L(
          '우리는 직장에서 점심을 먹어요.',
          'Biz ishda tushlik qilamiz.',
          'We have lunch at work.',
          'Мы обедаем на работе.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/lʌntʃ/',
      ttsText: 'lunch',
    },
    tags: ['daily-activities', 'meals', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-meal-dinner',
    english: 'dinner',
    senseKey: 'main-evening-meal',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '저녁 식사',
      'kechki ovqat',
      'the main meal eaten in the evening',
      'ужин',
    ),
    examples: [
      {
        english: 'They have dinner together.',
        translations: L(
          '그들은 함께 저녁을 먹어요.',
          'Ular birga kechki ovqat yeydi.',
          'They have dinner together.',
          'Они ужинают вместе.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈdɪnə/',
      ttsText: 'dinner',
    },
    tags: ['daily-activities', 'meals', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-shower',
    english: 'shower',
    senseKey: 'washing-under-running-water',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('샤워', 'dush', 'washing yourself under running water', 'душ'),
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
      ipa: '/ˈʃaʊə/',
      ttsText: 'shower',
    },
    tags: ['daily-activities', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-music',
    english: 'music',
    senseKey: 'organized-sound',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '음악',
      'musiqa',
      'sounds organized as songs or musical pieces',
      'музыка',
    ),
    examples: [
      {
        english: 'I listen to music.',
        translations: L(
          '저는 음악을 들어요.',
          'Men musiqa tinglayman.',
          'I listen to music.',
          'Я слушаю музыку.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈmjuːzɪk/',
      ttsText: 'music',
    },
    tags: ['daily-activities', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-film',
    english: 'film',
    senseKey: 'movie',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('영화', 'film', 'a movie', 'фильм'),
    examples: [
      {
        english: 'We watch a film.',
        translations: L(
          '우리는 영화를 봐요.',
          'Biz film ko‘ramiz.',
          'We watch a film.',
          'Мы смотрим фильм.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/fɪlm/',
      ttsText: 'film',
    },
    tags: ['daily-activities', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-game',
    english: 'game',
    senseKey: 'activity-played-for-fun',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('게임', 'o‘yin', 'an activity played for fun', 'игра'),
    examples: [
      {
        english: 'They play video games.',
        translations: L(
          '그들은 비디오 게임을 해요.',
          'Ular video o‘yinlar o‘ynaydi.',
          'They play video games.',
          'Они играют в видеоигры.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɡeɪm/',
      ttsText: 'game',
    },
    tags: ['daily-activities', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-person-friend',
    english: 'friend',
    senseKey: 'person-you-like',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('친구', 'do‘st', 'a person you know and like', 'друг'),
    examples: [
      {
        english: 'I see friends at weekends.',
        translations: L(
          '저는 주말에 친구들을 만나요.',
          'Men dam olish kunlari do‘stlarimni ko‘raman.',
          'I see friends at weekends.',
          'По выходным я встречаюсь с друзьями.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/frend/',
      ttsText: 'friend',
    },
    tags: ['daily-activities', 'people', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-book',
    english: 'book',
    senseKey: 'written-work-with-pages',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('책', 'kitob', 'a written work with pages', 'книга'),
    examples: [
      {
        english: 'She reads a book.',
        translations: L(
          '그녀는 책을 읽어요.',
          'U kitob o‘qiydi.',
          'She reads a book.',
          'Она читает книгу.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/bʊk/',
      ttsText: 'book',
    },
    tags: ['daily-activities', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-work',
    english: 'work',
    senseKey: 'job-activity',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '일; 직장',
      'ish',
      'a job or the activity you do as part of a job',
      'работа',
    ),
    examples: [
      {
        english: 'I go to work at eight.',
        translations: L(
          '저는 8시에 출근해요.',
          'Men soat sakkizda ishga boraman.',
          'I go to work at eight.',
          'Я иду на работу в восемь.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/wɜːk/',
      ttsText: 'work',
    },
    tags: ['daily-activities', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-place-college',
    english: 'college',
    senseKey: 'education-institution',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '대학; 전문대학',
      'kollej',
      'an institution where people study after school',
      'колледж',
    ),
    examples: [
      {
        english: 'She goes to college.',
        translations: L(
          '그녀는 대학에 가요.',
          'U kollejga boradi.',
          'She goes to college.',
          'Она ходит в колледж.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkɒlɪdʒ/',
      ttsText: 'college',
    },
    tags: ['daily-activities', 'education', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-time-morning',
    english: 'morning',
    senseKey: 'early-part-of-day',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('아침; 오전', 'ertalab', 'the early part of the day', 'утро'),
    examples: [
      {
        english: 'I work in the morning.',
        translations: L(
          '저는 아침에 일해요.',
          'Men ertalab ishlayman.',
          'I work in the morning.',
          'Я работаю утром.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈmɔːnɪŋ/',
      ttsText: 'morning',
    },
    tags: ['time', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-time-afternoon',
    english: 'afternoon',
    senseKey: 'part-of-day-after-noon',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '오후',
      'tushdan keyin',
      'the part of the day after midday',
      'день; после полудня',
    ),
    examples: [
      {
        english: 'She studies in the afternoon.',
        translations: L(
          '그녀는 오후에 공부해요.',
          'U tushdan keyin o‘qiydi.',
          'She studies in the afternoon.',
          'Она занимается днём.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌɑːftəˈnuːn/',
      ttsText: 'afternoon',
    },
    tags: ['time', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-time-evening',
    english: 'evening',
    senseKey: 'late-part-of-day',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '저녁',
      'kechqurun',
      'the part of the day between afternoon and night',
      'вечер',
    ),
    examples: [
      {
        english: 'We relax in the evening.',
        translations: L(
          '우리는 저녁에 쉬어요.',
          'Biz kechqurun dam olamiz.',
          'We relax in the evening.',
          'Вечером мы отдыхаем.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈiːvnɪŋ/',
      ttsText: 'evening',
    },
    tags: ['time', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-time-weekend',
    english: 'weekend',
    senseKey: 'saturday-and-sunday',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('주말', 'dam olish kunlari', 'Saturday and Sunday', 'выходные'),
    examples: [
      {
        english: 'I see friends at weekends.',
        translations: L(
          '저는 주말에 친구들을 만나요.',
          'Men dam olish kunlari do‘stlarim bilan uchrashaman.',
          'I see friends at weekends.',
          'Я встречаюсь с друзьями по выходным.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌwiːkˈend/',
      ttsText: 'weekend',
    },
    tags: ['time', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-adjective-early',
    english: 'early',
    senseKey: 'before-usual-time',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '이른; 일찍',
      'erta',
      'before the usual or expected time',
      'ранний; рано',
    ),
    examples: [
      {
        english: 'She gets up early.',
        translations: L(
          '그녀는 일찍 일어나요.',
          'U erta turadi.',
          'She gets up early.',
          'Она рано встаёт.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈɜːli/',
      ttsText: 'early',
    },
    tags: ['time', 'routine', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-adjective-late',
    english: 'late',
    senseKey: 'after-expected-time',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '늦은; 늦게',
      'kech',
      'after the usual or expected time',
      'поздний; поздно',
    ),
    examples: [
      {
        english: 'She goes to bed late.',
        translations: L(
          '그녀는 늦게 자요.',
          'U kech uxlaydi.',
          'She goes to bed late.',
          'Она поздно ложится спать.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/leɪt/',
      ttsText: 'late',
    },
    tags: ['time', 'routine', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-adjective-dangerous',
    english: 'dangerous',
    senseKey: 'likely-to-cause-harm',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('위험한', 'xavfli', 'likely to cause harm or injury', 'опасный'),
    examples: [
      {
        english: 'Her work is sometimes dangerous.',
        translations: L(
          '그녀의 일은 때때로 위험해요.',
          'Uning ishi ba’zan xavfli.',
          'Her work is sometimes dangerous.',
          'Её работа иногда опасна.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈdeɪndʒərəs/',
      ttsText: 'dangerous',
    },
    tags: ['description', 'science', 'unit2'],
    difficulty: 2,
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
        english: 'She has an interesting job.',
        translations: L(
          '그녀는 흥미로운 직업을 가지고 있어요.',
          'Uning qiziqarli ishi bor.',
          'She has an interesting job.',
          'У неё интересная работа.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈɪntrəstɪŋ/',
      ttsText: 'interesting',
    },
    tags: ['description', 'unit2'],
    difficulty: 2,
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
        english: 'She is always busy.',
        translations: L(
          '그녀는 항상 바빠요.',
          'U doim band.',
          'She is always busy.',
          'Она всегда занята.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈbɪzi/',
      ttsText: 'busy',
    },
    tags: ['description', 'frequency', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-adverb-always',
    english: 'always',
    senseKey: 'every-time',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L('항상', 'har doim', 'every time', 'всегда'),
    examples: [
      {
        english: 'She always gets up early.',
        translations: L(
          '그녀는 항상 일찍 일어나요.',
          'U har doim erta turadi.',
          'She always gets up early.',
          'Она всегда рано встаёт.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈɔːlweɪz/',
      ttsText: 'always',
    },
    tags: ['frequency', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-adverb-usually',
    english: 'usually',
    senseKey: 'most-of-the-time',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L('보통', 'odatda', 'most of the time', 'обычно'),
    examples: [
      {
        english: 'I usually have breakfast at home.',
        translations: L(
          '저는 보통 집에서 아침을 먹어요.',
          'Men odatda uyda nonushta qilaman.',
          'I usually have breakfast at home.',
          'Я обычно завтракаю дома.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈjuːʒuəli/',
      ttsText: 'usually',
    },
    tags: ['frequency', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-adverb-often',
    english: 'often',
    senseKey: 'many-times',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L('자주', 'tez-tez', 'many times', 'часто'),
    examples: [
      {
        english: 'We often listen to music.',
        translations: L(
          '우리는 자주 음악을 들어요.',
          'Biz tez-tez musiqa tinglaymiz.',
          'We often listen to music.',
          'Мы часто слушаем музыку.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈɒfən/',
      ttsText: 'often',
    },
    tags: ['frequency', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-adverb-sometimes',
    english: 'sometimes',
    senseKey: 'on-some-occasions',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L('때때로; 가끔', 'ba’zan', 'on some occasions', 'иногда'),
    examples: [
      {
        english: 'She sometimes works late.',
        translations: L(
          '그녀는 가끔 늦게까지 일해요.',
          'U ba’zan kechgacha ishlaydi.',
          'She sometimes works late.',
          'Она иногда работает допоздна.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈsʌmtaɪmz/',
      ttsText: 'sometimes',
    },
    tags: ['frequency', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-adverb-hardly',
    english: 'hardly',
    senseKey: 'almost-not',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L(
      '거의 ~않다',
      'deyarli ... emas',
      'almost not',
      'едва; почти не',
    ),
    examples: [
      {
        english: 'She hardly ever watches TV.',
        translations: L(
          '그녀는 TV를 거의 보지 않아요.',
          'U deyarli hech qachon televizor ko‘rmaydi.',
          'She hardly ever watches TV.',
          'Она почти никогда не смотрит телевизор.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈhɑːdli/',
      ttsText: 'hardly',
    },
    tags: ['frequency', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-adverb-ever',
    english: 'ever',
    senseKey: 'at-any-time',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L(
      '언제든; 어느 때라도',
      'hech qachon; qachondir',
      'at any time',
      'когда-либо',
    ),
    examples: [
      {
        english: 'She hardly ever watches TV.',
        translations: L(
          '그녀는 TV를 거의 보지 않아요.',
          'U deyarli hech qachon televizor ko‘rmaydi.',
          'She hardly ever watches TV.',
          'Она почти никогда не смотрит телевизор.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈevə/',
      ttsText: 'ever',
    },
    tags: ['frequency', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-adverb-never',
    english: 'never',
    senseKey: 'at-no-time',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L('절대 ~않다', 'hech qachon', 'at no time', 'никогда'),
    examples: [
      {
        english: 'She never gets up late.',
        translations: L(
          '그녀는 절대 늦게 일어나지 않아요.',
          'U hech qachon kech turmaydi.',
          'She never gets up late.',
          'Она никогда не встаёт поздно.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈnevə/',
      ttsText: 'never',
    },
    tags: ['frequency', 'unit2'],
    difficulty: 2,
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
        english: 'She works on Bird Island.',
        translations: L(
          '그녀는 버드 아일랜드에서 일해요.',
          'U Bird Islandda ishlaydi.',
          'She works on Bird Island.',
          'Она работает на острове Бёрд.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/wɜːk/',
      ttsText: 'work',
    },
    tags: ['verbs', 'routine', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-verb-study',
    english: 'study',
    senseKey: 'learn-about-subject',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '공부하다; 연구하다',
      'o‘qimoq; o‘rganmoq',
      'to learn about a subject',
      'учиться; изучать',
    ),
    examples: [
      {
        english: 'She studies penguins.',
        translations: L(
          '그녀는 펭귄을 연구해요.',
          'U pingvinlarni o‘rganadi.',
          'She studies penguins.',
          'Она изучает пингвинов.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈstʌdi/',
      ttsText: 'study',
    },
    tags: ['verbs', 'science', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-verb-write',
    english: 'write',
    senseKey: 'produce-written-words',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L('쓰다', 'yozmoq', 'to produce words in written form', 'писать'),
    examples: [
      {
        english: 'She writes emails.',
        translations: L(
          '그녀는 이메일을 써요.',
          'U elektron xatlar yozadi.',
          'She writes emails.',
          'Она пишет электронные письма.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/raɪt/',
      ttsText: 'write',
    },
    tags: ['verbs', 'routine', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-verb-email',
    english: 'email',
    senseKey: 'send-electronic-message',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '이메일을 보내다',
      'elektron xat yubormoq',
      'to send an email',
      'отправлять электронное письмо',
    ),
    examples: [
      {
        english: 'She emails her friends.',
        translations: L(
          '그녀는 친구들에게 이메일을 보내요.',
          'U do‘stlariga elektron xat yuboradi.',
          'She emails her friends.',
          'Она пишет друзьям по электронной почте.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈiːmeɪl/',
      ttsText: 'email',
    },
    tags: ['verbs', 'routine', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-verb-meet',
    english: 'meet',
    senseKey: 'come-together-with-people',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '만나다',
      'uchrashmoq',
      'to come together with another person',
      'встречать; встречаться',
    ),
    examples: [
      {
        english: 'She meets other scientists.',
        translations: L(
          '그녀는 다른 과학자들을 만나요.',
          'U boshqa olimlar bilan uchrashadi.',
          'She meets other scientists.',
          'Она встречается с другими учёными.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/miːt/',
      ttsText: 'meet',
    },
    tags: ['verbs', 'routine', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-verb-visit',
    english: 'visit',
    senseKey: 'go-to-see-place-or-person',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '방문하다',
      'tashrif buyurmoq',
      'to go and see a person or place',
      'посещать',
    ),
    examples: [
      {
        english: 'She visits different islands.',
        translations: L(
          '그녀는 여러 섬을 방문해요.',
          'U turli orollarga tashrif buyuradi.',
          'She visits different islands.',
          'Она посещает разные острова.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈvɪzɪt/',
      ttsText: 'visit',
    },
    tags: ['verbs', 'science', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-verb-relax',
    english: 'relax',
    senseKey: 'rest-and-become-calm',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '쉬다; 휴식하다',
      'dam olmoq',
      'to rest and become less active',
      'отдыхать',
    ),
    examples: [
      {
        english: 'She relaxes in the evening.',
        translations: L(
          '그녀는 저녁에 쉬어요.',
          'U kechqurun dam oladi.',
          'She relaxes in the evening.',
          'Она отдыхает вечером.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/rɪˈlæks/',
      ttsText: 'relax',
    },
    tags: ['verbs', 'routine', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-verb-dance',
    english: 'dance',
    senseKey: 'move-to-music',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '춤추다',
      'raqsga tushmoq',
      'to move your body to music',
      'танцевать',
    ),
    examples: [
      {
        english: 'She sometimes dances.',
        translations: L(
          '그녀는 가끔 춤을 춰요.',
          'U ba’zan raqsga tushadi.',
          'She sometimes dances.',
          'Она иногда танцует.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/dɑːns/',
      ttsText: 'dance',
    },
    tags: ['verbs', 'routine', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-verb-get',
    english: 'get',
    senseKey: 'general-action-verb',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '얻다; ~하게 되다',
      'olmoq; bo‘lmoq',
      'a common verb used in many expressions',
      'получать; становиться',
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
      ipa: '/ɡet/',
      ttsText: 'get',
    },
    tags: ['verbs', 'daily-activities', 'unit2'],
    difficulty: 2,
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
        english: 'I go to work at eight.',
        translations: L(
          '저는 8시에 출근해요.',
          'Men soat sakkizda ishga boraman.',
          'I go to work at eight.',
          'Я иду на работу в восемь.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɡəʊ/',
      ttsText: 'go',
    },
    tags: ['verbs', 'daily-activities', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-verb-have',
    english: 'have',
    senseKey: 'possess-or-experience',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '가지다; 먹다; 하다',
      'ega bo‘lmoq; qilmoq',
      'to possess, experience or take part in something',
      'иметь; делать',
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
    tags: ['verbs', 'daily-activities', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-verb-make',
    english: 'make',
    senseKey: 'create-or-prepare',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '만들다; 준비하다',
      'qilmoq; tayyorlamoq',
      'to create or prepare something',
      'делать; готовить',
    ),
    examples: [
      {
        english: 'I make breakfast.',
        translations: L(
          '저는 아침 식사를 준비해요.',
          'Men nonushta tayyorlayman.',
          'I make breakfast.',
          'Я готовлю завтрак.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/meɪk/',
      ttsText: 'make',
    },
    tags: ['verbs', 'daily-activities', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-verb-listen',
    english: 'listen',
    senseKey: 'pay-attention-to-sound',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L('듣다', 'tinglamoq', 'to pay attention to sound', 'слушать'),
    examples: [
      {
        english: 'I listen to music.',
        translations: L(
          '저는 음악을 들어요.',
          'Men musiqa tinglayman.',
          'I listen to music.',
          'Я слушаю музыку.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈlɪsən/',
      ttsText: 'listen',
    },
    tags: ['verbs', 'daily-activities', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-verb-play',
    english: 'play',
    senseKey: 'take-part-in-game',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '놀다; 게임하다',
      'o‘ynamoq',
      'to take part in a game',
      'играть',
    ),
    examples: [
      {
        english: 'They play video games.',
        translations: L(
          '그들은 비디오 게임을 해요.',
          'Ular video o‘yinlar o‘ynaydi.',
          'They play video games.',
          'Они играют в видеоигры.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/pleɪ/',
      ttsText: 'play',
    },
    tags: ['verbs', 'daily-activities', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-verb-read',
    english: 'read',
    senseKey: 'understand-written-words',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '읽다',
      'o‘qimoq',
      'to look at and understand written words',
      'читать',
    ),
    examples: [
      {
        english: 'She reads a book.',
        translations: L(
          '그녀는 책을 읽어요.',
          'U kitob o‘qiydi.',
          'She reads a book.',
          'Она читает книгу.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/riːd/',
      ttsText: 'read',
    },
    tags: ['verbs', 'daily-activities', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-verb-see',
    english: 'see',
    senseKey: 'meet-or-perceive',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '보다; 만나다',
      'ko‘rmoq',
      'to notice with your eyes or meet someone',
      'видеть; встречаться',
    ),
    examples: [
      {
        english: 'I see friends at weekends.',
        translations: L(
          '저는 주말에 친구들을 만나요.',
          'Men dam olish kunlari do‘stlarimni ko‘raman.',
          'I see friends at weekends.',
          'Я встречаюсь с друзьями по выходным.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/siː/',
      ttsText: 'see',
    },
    tags: ['verbs', 'daily-activities', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-verb-watch',
    english: 'watch',
    senseKey: 'look-at-for-time',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '보다; 시청하다',
      'tomosha qilmoq',
      'to look at something for a period of time',
      'смотреть',
    ),
    examples: [
      {
        english: 'We watch TV in the evening.',
        translations: L(
          '우리는 저녁에 TV를 봐요.',
          'Biz kechqurun televizor ko‘ramiz.',
          'We watch TV in the evening.',
          'Мы смотрим телевизор вечером.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/wɒtʃ/',
      ttsText: 'watch',
    },
    tags: ['verbs', 'daily-activities', 'unit2'],
    difficulty: 2,
    isCore: true,
  },
];

export const EN_S2_UNIT2_NODE1_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Daily activities
  // ===========================================================

  en_s2u2_n1_001_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'breakfast',
        native: 'nonushta',
        nativeI18n: L('아침 식사', 'nonushta', 'breakfast', 'завтрак'),
      },
      {
        text: 'lunch',
        native: 'tushlik',
        nativeI18n: L('점심 식사', 'tushlik', 'lunch', 'обед'),
      },
      {
        text: 'dinner',
        native: 'kechki ovqat',
        nativeI18n: L('저녁 식사', 'kechki ovqat', 'dinner', 'ужин'),
      },
      {
        text: 'shower',
        native: 'dush',
        nativeI18n: L('샤워', 'dush', 'shower', 'душ'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['daily-activities', 'meals'],
  },

  en_s2u2_n1_002_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'breakfast',
    choices: [
      { text: 'breakfast', label: '🍳', emoji: '🍳', imageUrl: '' },
      { text: 'shower', label: '🚿', emoji: '🚿', imageUrl: '' },
      { text: 'music', label: '🎵', emoji: '🎵', imageUrl: '' },
      { text: 'book', label: '📖', emoji: '📖', imageUrl: '' },
    ],
    answerTranslation: L('아침 식사', 'nonushta', 'breakfast', 'завтрак'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['daily-activities', 'breakfast'],
  },

  en_s2u2_n1_003_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I ___ up at seven.',
    blankAnswers: ['get'],
    options: ['get', 'go', 'have', 'make'],
    answer: 'get',
    answerTranslation: L(
      '저는 7시에 일어나요.',
      'Men soat yettida turaman.',
      'I get up at seven.',
      'Я встаю в семь.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['daily-activities', 'get-up'],
  },

  en_s2u2_n1_004_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I ___ breakfast in the morning.',
    blankAnswers: ['make'],
    options: ['make', 'play', 'watch', 'see'],
    answer: 'make',
    answerTranslation: L(
      '저는 아침에 아침 식사를 준비해요.',
      'Men ertalab nonushta tayyorlayman.',
      'I make breakfast in the morning.',
      'Утром я готовлю завтрак.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['daily-activities', 'make-breakfast'],
  },

  en_s2u2_n1_005_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I ___ a shower.',
    blankAnswers: ['have'],
    options: ['have', 'make', 'play', 'read'],
    answer: 'have',
    answerTranslation: L(
      '저는 샤워해요.',
      'Men dush qabul qilaman.',
      'I have a shower.',
      'Я принимаю душ.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['daily-activities', 'shower'],
  },

  en_s2u2_n1_006_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I ___ to work at eight.',
    blankAnswers: ['go'],
    options: ['go', 'get', 'see', 'read'],
    answer: 'go',
    answerTranslation: L(
      '저는 8시에 출근해요.',
      'Men soat sakkizda ishga boraman.',
      'I go to work at eight.',
      'Я иду на работу в восемь.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['daily-activities', 'work'],
  },

  en_s2u2_n1_007_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'music',
        native: 'musiqa',
        nativeI18n: L('음악', 'musiqa', 'music', 'музыка'),
      },
      {
        text: 'film',
        native: 'film',
        nativeI18n: L('영화', 'film', 'film', 'фильм'),
      },
      {
        text: 'book',
        native: 'kitob',
        nativeI18n: L('책', 'kitob', 'book', 'книга'),
      },
      {
        text: 'game',
        native: 'o‘yin',
        nativeI18n: L('게임', 'o‘yin', 'game', 'игра'),
      },
      {
        text: 'friend',
        native: 'do‘st',
        nativeI18n: L('친구', 'do‘st', 'friend', 'друг'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['daily-activities'],
  },

  en_s2u2_n1_008_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'We ___ to music.',
    blankAnswers: ['listen'],
    options: ['listen', 'watch', 'read', 'play'],
    answer: 'listen',
    answerTranslation: L(
      '우리는 음악을 들어요.',
      'Biz musiqa tinglaymiz.',
      'We listen to music.',
      'Мы слушаем музыку.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['daily-activities', 'music'],
  },

  en_s2u2_n1_009_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'They ___ video games.',
    blankAnswers: ['play'],
    options: ['play', 'read', 'listen', 'make'],
    answer: 'play',
    answerTranslation: L(
      '그들은 비디오 게임을 해요.',
      'Ular video o‘yinlar o‘ynaydi.',
      'They play video games.',
      'Они играют в видеоигры.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['daily-activities', 'games'],
  },

  en_s2u2_n1_010_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I ___ a book in the evening.',
    blankAnswers: ['read'],
    options: ['read', 'watch', 'see', 'go'],
    answer: 'read',
    answerTranslation: L(
      '저는 저녁에 책을 읽어요.',
      'Men kechqurun kitob o‘qiyman.',
      'I read a book in the evening.',
      'Я читаю книгу вечером.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['daily-activities', 'book'],
  },

  en_s2u2_n1_011_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'We ___ TV after dinner.',
    blankAnswers: ['watch'],
    options: ['watch', 'listen', 'read', 'make'],
    answer: 'watch',
    answerTranslation: L(
      '우리는 저녁 식사 후 TV를 봐요.',
      'Biz kechki ovqatdan keyin televizor ko‘ramiz.',
      'We watch TV after dinner.',
      'После ужина мы смотрим телевизор.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['daily-activities', 'watch-tv'],
  },

  en_s2u2_n1_012_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I ___ friends at weekends.',
    blankAnswers: ['see'],
    options: ['see', 'read', 'make', 'listen'],
    answer: 'see',
    answerTranslation: L(
      '저는 주말에 친구들을 만나요.',
      'Men dam olish kunlari do‘stlarim bilan uchrashaman.',
      'I see friends at weekends.',
      'По выходным я встречаюсь с друзьями.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['daily-activities', 'friends'],
  },

  en_s2u2_n1_013_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['lunch', 'have', 'at', 'I', 'one', 'make'],
    answer: 'I have lunch at one',
    audioText: 'I have lunch at one.',
    answerTranslation: L(
      '저는 1시에 점심을 먹어요.',
      'Men soat birda tushlik qilaman.',
      'I have lunch at one.',
      'Я обедаю в час.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['daily-activities', 'lunch'],
  },

  en_s2u2_n1_014_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['home', 'go', 'six', 'at', 'I', 'work'],
    answer: 'I go home at six',
    answerTranslation: L(
      '저는 6시에 집에 가요.',
      'Men soat oltida uyga boraman.',
      'I go home at six.',
      'Я иду домой в шесть.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['daily-activities', 'go-home'],
  },

  en_s2u2_n1_015_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'I go to bed late.',
    audioText: 'I go to bed late.',
    answerI18n: L(
      '저는 늦게 자요',
      'Men kech uxlayman',
      'I go to bed late',
      'Я поздно ложусь спать',
    ),
    options: ['I', 'go', 'to', 'bed', 'late', 'work'],
    optionsI18n: {
      ko: ['저는', '늦게', '자요'],
      uz: ['Men', 'kech', 'uxlayman'],
      en: ['I', 'go', 'to', 'bed', 'late'],
      ru: ['Я', 'поздно', 'ложусь', 'спать'],
    },
    answerTranslation: L(
      '저는 늦게 자요.',
      'Men kech uxlayman.',
      'I go to bed late.',
      'Я поздно ложусь спать.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['daily-activities', 'bed'],
  },

  en_s2u2_n1_016_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I get up, have breakfast and go to work.',
    audioText: 'I get up, have breakfast and go to work.',
    answerTranslation: L(
      '저는 일어나서 아침을 먹고 출근해요.',
      'Men turaman, nonushta qilaman va ishga boraman.',
      'I get up, have breakfast and go to work.',
      'Я встаю, завтракаю и иду на работу.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['daily-activities', 'routine'],
  },

  en_s2u2_n1_017_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What do you do after work?' }],
    options: ['I go home.', 'I am home go.', 'I going home.', 'I home is.'],
    answer: 'I go home.',
    answerTranslation: L(
      '저는 집에 가요.',
      'Men uyga boraman.',
      'I go home.',
      'Я иду домой.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['daily-activities', 'conversation'],
  },

  en_s2u2_n1_018_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What do you do in the evening?',
    options: ['I', 'listen', 'to', 'music', 'breakfast', 'go'],
    answer: 'I listen to music',
    answerTranslation: L(
      '저는 음악을 들어요.',
      'Men musiqa tinglayman.',
      'I listen to music.',
      'Я слушаю музыку.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['daily-activities', 'music'],
  },

  en_s2u2_n1_019_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I watch TV or a film in the evening.',
    audioText: 'I watch TV or a film in the evening.',
    answerTranslation: L(
      '저는 저녁에 TV나 영화를 봐요.',
      'Men kechqurun televizor yoki film ko‘raman.',
      'I watch TV or a film in the evening.',
      'Вечером я смотрю телевизор или фильм.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['daily-activities', 'film'],
  },

  en_s2u2_n1_020_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I get up early and go to bed late.',
    audioText: 'I get up early and go to bed late.',
    answerTranslation: L(
      '저는 일찍 일어나고 늦게 자요.',
      'Men erta turaman va kech uxlayman.',
      'I get up early and go to bed late.',
      'Я рано встаю и поздно ложусь спать.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['daily-activities', 'review'],
  },

  // ===========================================================
  // Lesson 2 · Present simple positive
  // ===========================================================

  en_s2u2_n1_021_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I ___ at a research centre.',
    blankAnswers: ['work'],
    options: ['work', 'works', 'working', 'worked'],
    answer: 'work',
    answerTranslation: L(
      '저는 연구 센터에서 일해요.',
      'Men tadqiqot markazida ishlayman.',
      'I work at a research centre.',
      'Я работаю в исследовательском центре.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['present-simple', 'positive'],
  },

  en_s2u2_n1_022_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'We ___ penguins.',
    blankAnswers: ['study'],
    options: ['study', 'studies', 'studys', 'studying'],
    answer: 'study',
    answerTranslation: L(
      '우리는 펭귄을 연구해요.',
      'Biz pingvinlarni o‘rganamiz.',
      'We study penguins.',
      'Мы изучаем пингвинов.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['present-simple', 'study'],
  },

  en_s2u2_n1_023_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'They ___ emails every day.',
    blankAnswers: ['write'],
    options: ['write', 'writes', 'writing', 'writs'],
    answer: 'write',
    answerTranslation: L(
      '그들은 매일 이메일을 써요.',
      'Ular har kuni elektron xatlar yozadi.',
      'They write emails every day.',
      'Они каждый день пишут электронные письма.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['present-simple', 'write'],
  },

  en_s2u2_n1_024_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'You ___ other scientists.',
    blankAnswers: ['meet'],
    options: ['meet', 'meets', 'meeting', 'met'],
    answer: 'meet',
    answerTranslation: L(
      '당신은 다른 과학자들을 만나요.',
      'Siz boshqa olimlar bilan uchrashasiz.',
      'You meet other scientists.',
      'Вы встречаетесь с другими учёными.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['present-simple', 'meet'],
  },

  en_s2u2_n1_025_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['work', 'island', 'on', 'an', 'We', 'works'],
    answer: 'We work on an island',
    answerTranslation: L(
      '우리는 섬에서 일해요.',
      'Biz orolda ishlaymiz.',
      'We work on an island.',
      'Мы работаем на острове.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['present-simple', 'work'],
  },

  en_s2u2_n1_026_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['different', 'visit', 'They', 'islands', 'visits', 'island'],
    answer: 'They visit different islands',
    audioText: 'They visit different islands.',
    answerTranslation: L(
      '그들은 여러 섬을 방문해요.',
      'Ular turli orollarga tashrif buyuradi.',
      'They visit different islands.',
      'Они посещают разные острова.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['present-simple', 'visit'],
  },

  en_s2u2_n1_027_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'We take photos.',
    audioText: 'We take photos.',
    answerI18n: L(
      '우리는 사진을 찍어요',
      'Biz suratga olamiz',
      'We take photos',
      'Мы фотографируем',
    ),
    options: ['We', 'take', 'photos', 'takes', 'photo'],
    optionsI18n: {
      ko: ['우리는', '사진을', '찍어요'],
      uz: ['Biz', 'suratga', 'olamiz'],
      en: ['We', 'take', 'photos'],
      ru: ['Мы', 'фотографируем'],
    },
    answerTranslation: L(
      '우리는 사진을 찍어요.',
      'Biz suratga olamiz.',
      'We take photos.',
      'Мы фотографируем.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['present-simple', 'photos'],
  },

  en_s2u2_n1_028_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I ___ lunch at one.',
    blankAnswers: ['have'],
    options: ['have', 'has', 'having', 'haves'],
    answer: 'have',
    answerTranslation: L(
      '저는 1시에 점심을 먹어요.',
      'Men soat birda tushlik qilaman.',
      'I have lunch at one.',
      'Я обедаю в час.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['present-simple', 'have'],
  },

  en_s2u2_n1_029_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'We ___ home in the evening.',
    blankAnswers: ['go'],
    options: ['go', 'goes', 'going', 'gos'],
    answer: 'go',
    answerTranslation: L(
      '우리는 저녁에 집에 가요.',
      'Biz kechqurun uyga boramiz.',
      'We go home in the evening.',
      'Мы идём домой вечером.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['present-simple', 'go'],
  },

  en_s2u2_n1_030_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'They ___ books after dinner.',
    blankAnswers: ['read'],
    options: ['read', 'reads', 'reading', 'reades'],
    answer: 'read',
    answerTranslation: L(
      '그들은 저녁 식사 후 책을 읽어요.',
      'Ular kechki ovqatdan keyin kitob o‘qiydi.',
      'They read books after dinner.',
      'Они читают книги после ужина.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['present-simple', 'read'],
  },

  en_s2u2_n1_031_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I work, study and write emails.',
    audioText: 'I work, study and write emails.',
    answerTranslation: L(
      '저는 일하고 공부하고 이메일을 써요.',
      'Men ishlayman, o‘qiyman va elektron xatlar yozaman.',
      'I work, study and write emails.',
      'Я работаю, учусь и пишу электронные письма.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['present-simple', 'routine'],
  },

  en_s2u2_n1_032_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Where do you work?' }],
    options: [
      'I work on an island.',
      'I works on an island.',
      'I working island.',
      'I am work island.',
    ],
    answer: 'I work on an island.',
    answerTranslation: L(
      '저는 섬에서 일해요.',
      'Men orolda ishlayman.',
      'I work on an island.',
      'Я работаю на острове.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['present-simple', 'conversation'],
  },

  en_s2u2_n1_033_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What do you study?',
    options: ['I', 'study', 'penguins', 'studies', 'work', 'island'],
    answer: 'I study penguins',
    answerTranslation: L(
      '저는 펭귄을 연구해요.',
      'Men pingvinlarni o‘rganaman.',
      'I study penguins.',
      'Я изучаю пингвинов.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['present-simple', 'study'],
  },

  en_s2u2_n1_034_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'We ',
    sentenceSuffix: ' other scientists.',
    answer: 'meet',
    answerTranslation: L(
      '우리는 다른 과학자들을 만나요.',
      'Biz boshqa olimlar bilan uchrashamiz.',
      'We meet other scientists.',
      'Мы встречаемся с другими учёными.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Use the base verb meet with we.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: true,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['present-simple', 'typing'],
  },

  en_s2u2_n1_035_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'They ',
    sentenceSuffix: ' different islands.',
    answer: 'visit',
    answerTranslation: L(
      '그들은 여러 섬을 방문해요.',
      'Ular turli orollarga tashrif buyuradi.',
      'They visit different islands.',
      'Они посещают разные острова.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Use the base verb visit with they.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: true,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['present-simple', 'typing'],
  },

  en_s2u2_n1_036_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['read', 'in', 'evening', 'the', 'We', 'reads'],
    answer: 'We read in the evening',
    answerTranslation: L(
      '우리는 저녁에 읽어요.',
      'Biz kechqurun o‘qiymiz.',
      'We read in the evening.',
      'Мы читаем вечером.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['present-simple', 'read'],
  },

  en_s2u2_n1_037_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['lunch', 'together', 'have', 'We', 'has', 'dinner'],
    answer: 'We have lunch together',
    audioText: 'We have lunch together.',
    answerTranslation: L(
      '우리는 함께 점심을 먹어요.',
      'Biz birga tushlik qilamiz.',
      'We have lunch together.',
      'Мы обедаем вместе.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['present-simple', 'have'],
  },

  en_s2u2_n1_038_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'They work on islands and study animals.',
    audioText: 'They work on islands and study animals.',
    answerTranslation: L(
      '그들은 섬에서 일하고 동물을 연구해요.',
      'Ular orollarda ishlaydi va hayvonlarni o‘rganadi.',
      'They work on islands and study animals.',
      'Они работают на островах и изучают животных.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['present-simple', 'science'],
  },

  en_s2u2_n1_039_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'You ___ TV in the evening.',
    blankAnswers: ['watch'],
    options: ['watch', 'watches', 'watchs', 'watching'],
    answer: 'watch',
    answerTranslation: L(
      '당신은 저녁에 TV를 봐요.',
      'Siz kechqurun televizor ko‘rasiz.',
      'You watch TV in the evening.',
      'Вы смотрите телевизор вечером.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['present-simple', 'watch'],
  },

  en_s2u2_n1_040_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I get up early, work in the morning and relax in the evening.',
    audioText: 'I get up early, work in the morning and relax in the evening.',
    answerTranslation: L(
      '저는 일찍 일어나서 아침에 일하고 저녁에는 쉬어요.',
      'Men erta turaman, ertalab ishlayman va kechqurun dam olaman.',
      'I get up early, work in the morning and relax in the evening.',
      'Я рано встаю, работаю утром и отдыхаю вечером.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['present-simple', 'review'],
  },

  // ===========================================================
  // Lesson 3 · Third person singular
  // ===========================================================

  en_s2u2_n1_041_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She ___ on Bird Island.',
    blankAnswers: ['works'],
    options: ['works', 'work', 'workes', 'working'],
    answer: 'works',
    answerTranslation: L(
      '그녀는 버드 아일랜드에서 일해요.',
      'U Bird Islandda ishlaydi.',
      'She works on Bird Island.',
      'Она работает на острове Бёрд.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['third-person', 'works'],
  },

  en_s2u2_n1_042_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She ___ penguins.',
    blankAnswers: ['studies'],
    options: ['studies', 'study', 'studys', 'studyes'],
    answer: 'studies',
    answerTranslation: L(
      '그녀는 펭귄을 연구해요.',
      'U pingvinlarni o‘rganadi.',
      'She studies penguins.',
      'Она изучает пингвинов.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['third-person', 'studies'],
  },

  en_s2u2_n1_043_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'He ___ to work early.',
    blankAnswers: ['goes'],
    options: ['goes', 'go', 'gos', 'going'],
    answer: 'goes',
    answerTranslation: L(
      '그는 일찍 출근해요.',
      'U ishga erta boradi.',
      'He goes to work early.',
      'Он рано идёт на работу.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['third-person', 'goes'],
  },

  en_s2u2_n1_044_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She ___ TV in the evening.',
    blankAnswers: ['watches'],
    options: ['watches', 'watch', 'watchs', 'watchies'],
    answer: 'watches',
    answerTranslation: L(
      '그녀는 저녁에 TV를 봐요.',
      'U kechqurun televizor ko‘radi.',
      'She watches TV in the evening.',
      'Она смотрит телевизор вечером.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['third-person', 'watches'],
  },

  en_s2u2_n1_045_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'He ___ breakfast at seven.',
    blankAnswers: ['has'],
    options: ['has', 'have', 'haves', 'having'],
    answer: 'has',
    answerTranslation: L(
      '그는 7시에 아침을 먹어요.',
      'U soat yettida nonushta qiladi.',
      'He has breakfast at seven.',
      'Он завтракает в семь.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['third-person', 'has'],
  },

  en_s2u2_n1_046_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She ___ a book at night.',
    blankAnswers: ['reads'],
    options: ['reads', 'read', 'reades', 'reading'],
    answer: 'reads',
    answerTranslation: L(
      '그녀는 밤에 책을 읽어요.',
      'U kechasi kitob o‘qiydi.',
      'She reads a book at night.',
      'Она читает книгу вечером.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['third-person', 'reads'],
  },

  en_s2u2_n1_047_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'He ___ emails to his friends.',
    blankAnswers: ['writes'],
    options: ['writes', 'write', 'writs', 'writing'],
    answer: 'writes',
    answerTranslation: L(
      '그는 친구들에게 이메일을 써요.',
      'U do‘stlariga elektron xatlar yozadi.',
      'He writes emails to his friends.',
      'Он пишет электронные письма друзьям.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['third-person', 'writes'],
  },

  en_s2u2_n1_048_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'study → she ',
    sentenceSuffix: '',
    answer: 'studies',
    answerTranslation: L(
      'study → she studies',
      'study → she studies',
      'study → she studies',
      'study → she studies',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Change consonant + y to -ies: studies.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['third-person', 'spelling'],
  },

  en_s2u2_n1_049_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'go → he ',
    sentenceSuffix: '',
    answer: 'goes',
    answerTranslation: L(
      'go → he goes',
      'go → he goes',
      'go → he goes',
      'go → he goes',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The third person singular form of go is goes.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['third-person', 'spelling'],
  },

  en_s2u2_n1_050_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'watch → she ',
    sentenceSuffix: '',
    answer: 'watches',
    answerTranslation: L(
      'watch → she watches',
      'watch → she watches',
      'watch → she watches',
      'watch → she watches',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Add -es after watch: watches.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['third-person', 'spelling'],
  },

  en_s2u2_n1_051_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '기본형과 3인칭 단수형을 연결하세요.',
      'Fe’lning asosiy va uchinchi shaxs birlik shakllarini moslang.',
      'Match each base verb with its third person singular form.',
      'Соедините глагол с формой третьего лица единственного числа.',
    ),
    pairs: [
      {
        text: 'work',
        native: 'works',
        nativeI18n: L('works', 'works', 'works', 'works'),
      },
      {
        text: 'study',
        native: 'studies',
        nativeI18n: L('studies', 'studies', 'studies', 'studies'),
      },
      {
        text: 'go',
        native: 'goes',
        nativeI18n: L('goes', 'goes', 'goes', 'goes'),
      },
      {
        text: 'watch',
        native: 'watches',
        nativeI18n: L('watches', 'watches', 'watches', 'watches'),
      },
      {
        text: 'read',
        native: 'reads',
        nativeI18n: L('reads', 'reads', 'reads', 'reads'),
      },
    ],
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['third-person', 'spelling'],
  },

  en_s2u2_n1_052_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['penguins', 'studies', 'She', 'study', 'island'],
    answer: 'She studies penguins',
    audioText: 'She studies penguins.',
    answerTranslation: L(
      '그녀는 펭귄을 연구해요.',
      'U pingvinlarni o‘rganadi.',
      'She studies penguins.',
      'Она изучает пингвинов.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['third-person', 'studies'],
  },

  en_s2u2_n1_053_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['works', 'island', 'an', 'on', 'She', 'work'],
    answer: 'She works on an island',
    answerTranslation: L(
      '그녀는 섬에서 일해요.',
      'U orolda ishlaydi.',
      'She works on an island.',
      'Она работает на острове.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['third-person', 'works'],
  },

  en_s2u2_n1_054_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'He goes to bed late.',
    audioText: 'He goes to bed late.',
    answerI18n: L(
      '그는 늦게 자요',
      'U kech uxlaydi',
      'He goes to bed late',
      'Он поздно ложится спать',
    ),
    options: ['He', 'goes', 'to', 'bed', 'late', 'go'],
    optionsI18n: {
      ko: ['그는', '늦게', '자요'],
      uz: ['U', 'kech', 'uxlaydi'],
      en: ['He', 'goes', 'to', 'bed', 'late'],
      ru: ['Он', 'поздно', 'ложится', 'спать'],
    },
    answerTranslation: L(
      '그는 늦게 자요.',
      'U kech uxlaydi.',
      'He goes to bed late.',
      'Он поздно ложится спать.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['third-person', 'goes'],
  },

  en_s2u2_n1_055_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What does Melanie study?' }],
    options: [
      'She studies penguins.',
      'She study penguins.',
      'She studying penguins.',
      'She is study penguins.',
    ],
    answer: 'She studies penguins.',
    answerTranslation: L(
      '그녀는 펭귄을 연구해요.',
      'U pingvinlarni o‘rganadi.',
      'She studies penguins.',
      'Она изучает пингвинов.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['third-person', 'science'],
  },

  en_s2u2_n1_056_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She ___ different islands.',
    blankAnswers: ['visits'],
    options: ['visits', 'visit', 'visites', 'visiting'],
    answer: 'visits',
    answerTranslation: L(
      '그녀는 여러 섬을 방문해요.',
      'U turli orollarga tashrif buyuradi.',
      'She visits different islands.',
      'Она посещает разные острова.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['third-person', 'visits'],
  },

  en_s2u2_n1_057_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She ___ other scientists.',
    blankAnswers: ['meets'],
    options: ['meets', 'meet', 'meetes', 'meeting'],
    answer: 'meets',
    answerTranslation: L(
      '그녀는 다른 과학자들을 만나요.',
      'U boshqa olimlar bilan uchrashadi.',
      'She meets other scientists.',
      'Она встречается с другими учёными.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['third-person', 'meets'],
  },

  en_s2u2_n1_058_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She works, studies, visits and takes photos.',
    audioText: 'She works, studies, visits and takes photos.',
    answerTranslation: L(
      '그녀는 일하고 연구하고 방문하고 사진을 찍어요.',
      'U ishlaydi, o‘rganadi, tashrif buyuradi va suratga oladi.',
      'She works, studies, visits and takes photos.',
      'Она работает, изучает, посещает и фотографирует.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['third-person', 'review'],
  },

  en_s2u2_n1_059_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Works, goes, watches, studies.',
    audioText: 'Works, goes, watches, studies.',
    answerTranslation: L(
      'works, goes, watches, studies',
      'works, goes, watches, studies',
      'Works, goes, watches, studies.',
      'Works, goes, watches, studies.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['third-person', 'pronunciation'],
  },

  en_s2u2_n1_060_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She gets up early, works all day and goes to bed late.',
    audioText: 'She gets up early, works all day and goes to bed late.',
    answerTranslation: L(
      '그녀는 일찍 일어나서 하루 종일 일하고 늦게 자요.',
      'U erta turadi, kun bo‘yi ishlaydi va kech uxlaydi.',
      'She gets up early, works all day and goes to bed late.',
      'Она рано встаёт, работает весь день и поздно ложится спать.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['third-person', 'routine'],
  },

  // ===========================================================
  // Lesson 4 · Adverbs of frequency
  // ===========================================================

  en_s2u2_n1_061_word_matching: {
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
    tags: ['frequency'],
  },

  en_s2u2_n1_062_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '100% = ___.',
    blankAnswers: ['always'],
    options: ['always', 'sometimes', 'never', 'hardly ever'],
    answer: 'always',
    answerTranslation: L(
      '100% = 항상',
      '100% = har doim',
      '100% = always',
      '100% = всегда',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['frequency', 'always'],
  },

  en_s2u2_n1_063_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '0% = ___.',
    blankAnswers: ['never'],
    options: ['never', 'always', 'usually', 'often'],
    answer: 'never',
    answerTranslation: L(
      '0% = 절대 ~않다',
      '0% = hech qachon',
      '0% = never',
      '0% = никогда',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['frequency', 'never'],
  },

  en_s2u2_n1_064_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She ___ gets up early.',
    blankAnswers: ['always'],
    options: ['always', 'never', 'late', 'early'],
    answer: 'always',
    answerTranslation: L(
      '그녀는 항상 일찍 일어나요.',
      'U har doim erta turadi.',
      'She always gets up early.',
      'Она всегда рано встаёт.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['frequency', 'position'],
  },

  en_s2u2_n1_065_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'We ___ listen to music in the evening.',
    blankAnswers: ['often'],
    options: ['often', 'early', 'late', 'busy'],
    answer: 'often',
    answerTranslation: L(
      '우리는 저녁에 자주 음악을 들어요.',
      'Biz kechqurun tez-tez musiqa tinglaymiz.',
      'We often listen to music in the evening.',
      'Мы часто слушаем музыку вечером.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['frequency', 'often'],
  },

  en_s2u2_n1_066_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She ___ works late.',
    blankAnswers: ['sometimes'],
    options: ['sometimes', 'island', 'dinner', 'scientist'],
    answer: 'sometimes',
    answerTranslation: L(
      '그녀는 가끔 늦게까지 일해요.',
      'U ba’zan kechgacha ishlaydi.',
      'She sometimes works late.',
      'Она иногда работает допоздна.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['frequency', 'sometimes'],
  },

  en_s2u2_n1_067_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'He ___ gets up late.',
    blankAnswers: ['never'],
    options: ['never', 'always', 'usually', 'often'],
    answer: 'never',
    answerTranslation: L(
      '그는 절대 늦게 일어나지 않아요.',
      'U hech qachon kech turmaydi.',
      'He never gets up late.',
      'Он никогда не встаёт поздно.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['frequency', 'never'],
  },

  en_s2u2_n1_068_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She ___ ever watches TV.',
    blankAnswers: ['hardly'],
    options: ['hardly', 'always', 'usually', 'often'],
    answer: 'hardly',
    answerTranslation: L(
      '그녀는 TV를 거의 보지 않아요.',
      'U deyarli hech qachon televizor ko‘rmaydi.',
      'She hardly ever watches TV.',
      'Она почти никогда не смотрит телевизор.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['frequency', 'hardly-ever'],
  },

  en_s2u2_n1_069_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['usually', 'breakfast', 'I', 'have', 'home', 'at'],
    answer: 'I usually have breakfast at home',
    audioText: 'I usually have breakfast at home.',
    answerTranslation: L(
      '저는 보통 집에서 아침을 먹어요.',
      'Men odatda uyda nonushta qilaman.',
      'I usually have breakfast at home.',
      'Я обычно завтракаю дома.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['frequency', 'usually'],
  },

  en_s2u2_n1_070_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['sometimes', 'dangerous', 'is', 'Her', 'work', 'always'],
    answer: 'Her work is sometimes dangerous',
    answerTranslation: L(
      '그녀의 일은 가끔 위험해요.',
      'Uning ishi ba’zan xavfli.',
      'Her work is sometimes dangerous.',
      'Её работа иногда опасна.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['frequency', 'be-position'],
  },

  en_s2u2_n1_071_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She is ___ busy.',
    blankAnswers: ['always'],
    options: ['always', 'never', 'early', 'late'],
    answer: 'always',
    answerTranslation: L(
      '그녀는 항상 바빠요.',
      'U har doim band.',
      'She is always busy.',
      'Она всегда занята.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['frequency', 'be-position'],
  },

  en_s2u2_n1_072_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Adverbs of frequency usually come ___ the main verb.',
    blankAnswers: ['before'],
    options: ['before', 'after', 'under', 'without'],
    answer: 'before',
    answerTranslation: L(
      '빈도부사는 보통 일반동사 앞에 와요.',
      'Takroriylik ravishlari odatda asosiy fe’ldan oldin keladi.',
      'Adverbs of frequency usually come before the main verb.',
      'Наречия частотности обычно стоят перед смысловым глаголом.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['frequency', 'position'],
  },

  en_s2u2_n1_073_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'With be, the adverb usually comes ___ the verb.',
    blankAnswers: ['after'],
    options: ['after', 'before', 'without', 'under'],
    answer: 'after',
    answerTranslation: L(
      'be동사와 함께 사용할 때 빈도부사는 보통 be동사 뒤에 와요.',
      'Be fe’li bilan takroriylik ravishi odatda undan keyin keladi.',
      'With be, the adverb usually comes after the verb.',
      'С глаголом be наречие частотности обычно стоит после него.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['frequency', 'be-position'],
  },

  en_s2u2_n1_074_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'She hardly ever goes to bed early.',
    audioText: 'She hardly ever goes to bed early.',
    answerI18n: L(
      '그녀는 일찍 자는 일이 거의 없어요',
      'U deyarli hech qachon erta uxlamaydi',
      'She hardly ever goes to bed early',
      'Она почти никогда не ложится спать рано',
    ),
    options: ['She', 'hardly', 'ever', 'goes', 'to', 'bed', 'early'],
    optionsI18n: {
      ko: ['그녀는', '일찍', '자는', '일이', '거의', '없어요'],
      uz: ['U', 'deyarli', 'hech', 'qachon', 'erta', 'uxlamaydi'],
      en: ['She', 'hardly', 'ever', 'goes', 'to', 'bed', 'early'],
      ru: ['Она', 'почти', 'никогда', 'не', 'ложится', 'спать', 'рано'],
    },
    answerTranslation: L(
      '그녀는 일찍 자는 일이 거의 없어요.',
      'U deyarli hech qachon erta uxlamaydi.',
      'She hardly ever goes to bed early.',
      'Она почти никогда не ложится спать рано.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['frequency', 'hardly-ever'],
  },

  en_s2u2_n1_075_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'How often do you listen to music?' },
    ],
    options: [
      'I often listen to music.',
      'I listen often music.',
      'I am often listen music.',
      'I often music listen.',
    ],
    answer: 'I often listen to music.',
    answerTranslation: L(
      '저는 자주 음악을 들어요.',
      'Men tez-tez musiqa tinglayman.',
      'I often listen to music.',
      'Я часто слушаю музыку.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['frequency', 'conversation'],
  },

  en_s2u2_n1_076_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'How often do you see your friends?',
    options: ['I', 'usually', 'see', 'them', 'weekends', 'at'],
    answer: 'I usually see them at weekends',
    answerTranslation: L(
      '저는 보통 주말에 친구들을 만나요.',
      'Men odatda dam olish kunlari ularni ko‘raman.',
      'I usually see them at weekends.',
      'Я обычно встречаюсь с ними по выходным.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['frequency', 'friends'],
  },

  en_s2u2_n1_077_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I always get up early.',
    audioText: 'I always get up early.',
    answerTranslation: L(
      '저는 항상 일찍 일어나요.',
      'Men har doim erta turaman.',
      'I always get up early.',
      'Я всегда рано встаю.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['frequency', 'always'],
  },

  en_s2u2_n1_078_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I sometimes watch a film in the evening.',
    audioText: 'I sometimes watch a film in the evening.',
    answerTranslation: L(
      '저는 가끔 저녁에 영화를 봐요.',
      'Men ba’zan kechqurun film ko‘raman.',
      'I sometimes watch a film in the evening.',
      'Я иногда смотрю фильм вечером.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['frequency', 'sometimes'],
  },

  en_s2u2_n1_079_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I never play video games in the morning.',
    audioText: 'I never play video games in the morning.',
    answerTranslation: L(
      '저는 아침에는 절대 비디오 게임을 하지 않아요.',
      'Men ertalab hech qachon video o‘yin o‘ynamayman.',
      'I never play video games in the morning.',
      'Я никогда не играю в видеоигры утром.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['frequency', 'never'],
  },

  en_s2u2_n1_080_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'She usually gets up early, works during the day and sometimes relaxes with a book in the evening.',
    audioText:
      'She usually gets up early, works during the day and sometimes relaxes with a book in the evening.',
    answerTranslation: L(
      '그녀는 보통 일찍 일어나 낮에는 일하고 저녁에는 가끔 책을 읽으며 쉬어요.',
      'U odatda erta turadi, kunduzi ishlaydi va kechqurun ba’zan kitob bilan dam oladi.',
      'She usually gets up early, works during the day and sometimes relaxes with a book in the evening.',
      'Она обычно рано встаёт, работает днём и иногда отдыхает вечером с книгой.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['frequency', 'present-simple', 'unit-review'],
  },
};

// ─────────────────────────────────────────────────────────────
// Node 1
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT2_NODE1 = {
  title: L(
    '과학자의 하루',
    'Olimning bir kuni',
    'A day in the life of a scientist',
    'День из жизни учёного',
  ),
  section: 2,
  unit: 2,
  order: 1,
  isActive: true,

  lessons: [
    {
      title: L(
        '나의 하루',
        'Mening kunim',
        'My daily activities',
        'Мои ежедневные дела',
      ),
      description: L(
        '일어나기, 식사하기, 출근하기, 음악 듣기, 친구 만나기처럼 일상에서 자주 사용하는 활동 표현을 익혀요.',
        'Turish, ovqatlanish, ishga borish, musiqa tinglash va do‘stlar bilan uchrashish kabi kundalik faoliyatlarni o‘rganasiz.',
        'Learn common daily activities such as getting up, eating meals, going to work, listening to music and seeing friends.',
        'Изучаем повседневные действия: вставать, есть, ходить на работу, слушать музыку и встречаться с друзьями.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 1,
      questions: [
        'en_s2u2_n1_001_word_matching',
        'en_s2u2_n1_002_image_choice',
        'en_s2u2_n1_003_fill_in_blank',
        'en_s2u2_n1_004_fill_in_blank',
        'en_s2u2_n1_005_fill_in_blank',
        'en_s2u2_n1_006_fill_in_blank',
        'en_s2u2_n1_007_word_matching',
        'en_s2u2_n1_008_fill_in_blank',
        'en_s2u2_n1_009_fill_in_blank',
        'en_s2u2_n1_010_fill_in_blank',
        'en_s2u2_n1_011_fill_in_blank',
        'en_s2u2_n1_012_fill_in_blank',
        'en_s2u2_n1_013_word_arrange',
        'en_s2u2_n1_014_translate_builder',
        'en_s2u2_n1_015_sentence_builder',
        'en_s2u2_n1_016_speaking',
        'en_s2u2_n1_017_dialog_complete',
        'en_s2u2_n1_018_reply_builder',
        'en_s2u2_n1_019_speaking',
        'en_s2u2_n1_020_speaking',
      ],
    },

    {
      title: L(
        '매일 하는 일',
        'Har kuni qiladigan ishlar',
        'Present simple routines',
        'Повседневные действия',
      ),
      description: L(
        'I, you, we, they와 현재형 동사의 기본형을 사용해서 습관과 일상을 말해요.',
        'I, you, we, they bilan fe’lning asosiy shaklini ishlatib odat va kundalik ishlar haqida gapirasiz.',
        'Use the present simple with I, you, we and they to talk about habits and routines.',
        'Используем Present Simple с I, you, we и they для привычек и повседневных действий.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 2,
      questions: [
        'en_s2u2_n1_021_fill_in_blank',
        'en_s2u2_n1_022_fill_in_blank',
        'en_s2u2_n1_023_fill_in_blank',
        'en_s2u2_n1_024_fill_in_blank',
        'en_s2u2_n1_025_translate_builder',
        'en_s2u2_n1_026_word_arrange',
        'en_s2u2_n1_027_sentence_builder',
        'en_s2u2_n1_028_fill_in_blank',
        'en_s2u2_n1_029_fill_in_blank',
        'en_s2u2_n1_030_fill_in_blank',
        'en_s2u2_n1_031_speaking',
        'en_s2u2_n1_032_dialog_complete',
        'en_s2u2_n1_033_reply_builder',
        'en_s2u2_n1_034_type_answer',
        'en_s2u2_n1_035_type_answer',
        'en_s2u2_n1_036_translate_builder',
        'en_s2u2_n1_037_word_arrange',
        'en_s2u2_n1_038_speaking',
        'en_s2u2_n1_039_fill_in_blank',
        'en_s2u2_n1_040_speaking',
      ],
    },

    {
      title: L(
        '그녀는 펭귄을 연구해요',
        'U pingvinlarni o‘rganadi',
        'She studies penguins',
        'Она изучает пингвинов',
      ),
      description: L(
        'he, she, it과 함께 사용하는 현재형 3인칭 단수의 -s, -es, -ies 형태와 발음을 연습해요.',
        'He, she, it bilan ishlatiladigan hozirgi zamon -s, -es va -ies shakllari hamda talaffuzini mashq qilasiz.',
        'Practise third person singular present simple forms with -s, -es and -ies.',
        'Практикуем формы третьего лица единственного числа с -s, -es и -ies.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 3,
      questions: [
        'en_s2u2_n1_041_fill_in_blank',
        'en_s2u2_n1_042_fill_in_blank',
        'en_s2u2_n1_043_fill_in_blank',
        'en_s2u2_n1_044_fill_in_blank',
        'en_s2u2_n1_045_fill_in_blank',
        'en_s2u2_n1_046_fill_in_blank',
        'en_s2u2_n1_047_fill_in_blank',
        'en_s2u2_n1_048_type_answer',
        'en_s2u2_n1_049_type_answer',
        'en_s2u2_n1_050_type_answer',
        'en_s2u2_n1_051_word_matching',
        'en_s2u2_n1_052_word_arrange',
        'en_s2u2_n1_053_translate_builder',
        'en_s2u2_n1_054_sentence_builder',
        'en_s2u2_n1_055_dialog_complete',
        'en_s2u2_n1_056_fill_in_blank',
        'en_s2u2_n1_057_fill_in_blank',
        'en_s2u2_n1_058_speaking',
        'en_s2u2_n1_059_speaking',
        'en_s2u2_n1_060_speaking',
      ],
    },

    {
      title: L(
        '항상, 보통, 가끔',
        'Har doim, odatda, ba’zan',
        'Always, usually, sometimes',
        'Всегда, обычно, иногда',
      ),
      description: L(
        'always, usually, often, sometimes, hardly ever, never를 사용해서 행동의 빈도를 말하고 문장 안의 위치를 익혀요.',
        'Always, usually, often, sometimes, hardly ever va never yordamida ish-harakat qanchalik tez-tez bo‘lishini aytasiz.',
        'Use adverbs of frequency to say how often routines happen and practise their position in sentences.',
        'Используем наречия частотности и учимся правильно ставить их в предложении.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 4,
      questions: [
        'en_s2u2_n1_061_word_matching',
        'en_s2u2_n1_062_fill_in_blank',
        'en_s2u2_n1_063_fill_in_blank',
        'en_s2u2_n1_064_fill_in_blank',
        'en_s2u2_n1_065_fill_in_blank',
        'en_s2u2_n1_066_fill_in_blank',
        'en_s2u2_n1_067_fill_in_blank',
        'en_s2u2_n1_068_fill_in_blank',
        'en_s2u2_n1_069_word_arrange',
        'en_s2u2_n1_070_translate_builder',
        'en_s2u2_n1_071_fill_in_blank',
        'en_s2u2_n1_072_fill_in_blank',
        'en_s2u2_n1_073_fill_in_blank',
        'en_s2u2_n1_074_sentence_builder',
        'en_s2u2_n1_075_dialog_complete',
        'en_s2u2_n1_076_reply_builder',
        'en_s2u2_n1_077_speaking',
        'en_s2u2_n1_078_speaking',
        'en_s2u2_n1_079_speaking',
        'en_s2u2_n1_080_speaking',
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Section 2 · Unit 2 · Node 2
// 2.2 Spending time
//
// Coverage
// - telling the time
// - o'clock / past / to
// - half past / quarter past / quarter to
// - five / ten / twenty / twenty-five past / to
// - astronaut training and routines
// - space / Earth / exercise / sleeping bags
// - present simple negative
// - don't / doesn't + base verb
// - negative sentences with adverbs of frequency
//
// IMPORTANT:
// *_WORDS에는 단어만 등록.
// "free time", "sleeping bag", "quarter past",
// "quarter to" 같은 구는 headword로 등록하지 않음.
//
// 4 lessons × 20 questions = 80
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT2_NODE2_WORDS = [
  {
    code: 'en-person-astronaut',
    english: 'astronaut',
    senseKey: 'person-who-travels-in-space',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '우주비행사',
      'astronavt',
      'a person who travels and works in space',
      'астронавт',
    ),
    examples: [
      {
        english: 'She is an astronaut.',
        translations: L(
          '그녀는 우주비행사예요.',
          'U astronavt.',
          'She is an astronaut.',
          'Она астронавт.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈæstrənɔːt/',
      ttsText: 'astronaut',
    },
    tags: ['space', 'people', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-person-trainee',
    english: 'trainee',
    senseKey: 'person-learning-a-job',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '훈련생',
      'stajyor; tinglovchi',
      'a person who is learning how to do a job',
      'стажёр',
    ),
    examples: [
      {
        english: 'She is a trainee astronaut.',
        translations: L(
          '그녀는 우주비행사 훈련생이에요.',
          'U astronavt stajyor.',
          'She is a trainee astronaut.',
          'Она астронавт-стажёр.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌtreɪˈniː/',
      ttsText: 'trainee',
    },
    tags: ['space', 'people', 'training', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-training',
    english: 'training',
    senseKey: 'learning-skills-for-job',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '훈련',
      'mashg‘ulot; tayyorgarlik',
      'the process of learning skills for a job or activity',
      'тренировка; подготовка',
    ),
    examples: [
      {
        english: 'Astronaut training takes a long time.',
        translations: L(
          '우주비행사 훈련은 오랜 시간이 걸려요.',
          'Astronavt tayyorgarligi uzoq vaqt oladi.',
          'Astronaut training takes a long time.',
          'Подготовка астронавтов занимает много времени.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈtreɪnɪŋ/',
      ttsText: 'training',
    },
    tags: ['space', 'training', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-space',
    english: 'space',
    senseKey: 'area-beyond-earth',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('우주', 'kosmos', 'the area beyond the Earth', 'космос'),
    examples: [
      {
        english: 'Astronauts live and work in space.',
        translations: L(
          '우주비행사들은 우주에서 생활하고 일해요.',
          'Astronavtlar kosmosda yashaydi va ishlaydi.',
          'Astronauts live and work in space.',
          'Астронавты живут и работают в космосе.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/speɪs/',
      ttsText: 'space',
    },
    tags: ['space', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-place-earth',
    english: 'Earth',
    senseKey: 'planet-we-live-on',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('지구', 'Yer', 'the planet where we live', 'Земля'),
    examples: [
      {
        english: 'The space station goes around Earth.',
        translations: L(
          '우주 정거장은 지구 주위를 돌아요.',
          'Kosmik stansiya Yer atrofida aylanadi.',
          'The space station goes around Earth.',
          'Космическая станция вращается вокруг Земли.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɜːθ/',
      ttsText: 'Earth',
    },
    tags: ['space', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-place-centre',
    english: 'centre',
    senseKey: 'place-for-particular-activity',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '센터; 중심',
      'markaz',
      'a place used for a particular activity',
      'центр',
    ),
    examples: [
      {
        english: 'She trains at an astronaut centre.',
        translations: L(
          '그녀는 우주비행사 센터에서 훈련해요.',
          'U astronavtlar markazida mashq qiladi.',
          'She trains at an astronaut centre.',
          'Она тренируется в центре подготовки астронавтов.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈsentə/',
      ttsText: 'centre',
    },
    tags: ['places', 'training', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-class',
    english: 'class',
    senseKey: 'lesson-group',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('수업', 'dars', 'a lesson or period of study', 'занятие; урок'),
    examples: [
      {
        english: 'She goes to morning classes.',
        translations: L(
          '그녀는 오전 수업에 가요.',
          'U ertalabki darslarga boradi.',
          'She goes to morning classes.',
          'Она ходит на утренние занятия.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/klɑːs/',
      ttsText: 'class',
    },
    tags: ['training', 'daily-routine', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-break',
    english: 'break',
    senseKey: 'short-rest-from-work',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '휴식 시간',
      'tanaffus',
      'a short period of rest from work or study',
      'перерыв',
    ),
    examples: [
      {
        english: 'She stops for a break.',
        translations: L(
          '그녀는 잠시 쉬어요.',
          'U tanaffus qiladi.',
          'She stops for a break.',
          'Она делает перерыв.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/breɪk/',
      ttsText: 'break',
    },
    tags: ['time', 'daily-routine', 'unit2'],
    difficulty: 2,
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
        english: 'Astronauts sleep in special bags.',
        translations: L(
          '우주비행사들은 특별한 가방 안에서 자요.',
          'Astronavtlar maxsus qoplarda uxlaydi.',
          'Astronauts sleep in special bags.',
          'Астронавты спят в специальных мешках.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/sliːp/',
      ttsText: 'sleep',
    },
    tags: ['daily-routine', 'space', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-bed',
    english: 'bed',
    senseKey: 'furniture-for-sleeping',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '침대',
      'karavot',
      'a piece of furniture used for sleeping',
      'кровать',
    ),
    examples: [
      {
        english: 'Astronauts do not sleep in a bed.',
        translations: L(
          '우주비행사들은 침대에서 자지 않아요.',
          'Astronavtlar karavotda uxlamaydi.',
          'Astronauts do not sleep in a bed.',
          'Астронавты не спят в кровати.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/bed/',
      ttsText: 'bed',
    },
    tags: ['home', 'space', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-bag',
    english: 'bag',
    senseKey: 'container-made-of-soft-material',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '가방; 자루',
      'sumka; qop',
      'a container made from soft material',
      'сумка; мешок',
    ),
    examples: [
      {
        english: 'They sleep in special bags.',
        translations: L(
          '그들은 특별한 가방 안에서 자요.',
          'Ular maxsus qoplarda uxlaydi.',
          'They sleep in special bags.',
          'Они спят в специальных мешках.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/bæɡ/',
      ttsText: 'bag',
    },
    tags: ['objects', 'space', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-wall',
    english: 'wall',
    senseKey: 'vertical-side-of-room',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('벽', 'devor', 'one of the vertical sides of a room', 'стена'),
    examples: [
      {
        english: 'The sleeping bags are on the walls.',
        translations: L(
          '수면용 가방은 벽에 있어요.',
          'Uxlash qoplari devorlarda.',
          'The sleeping bags are on the walls.',
          'Спальные мешки находятся на стенах.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/wɔːl/',
      ttsText: 'wall',
    },
    tags: ['space', 'objects', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-place-gym',
    english: 'gym',
    senseKey: 'place-for-exercise',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '체육관; 헬스장',
      'sport zali',
      'a place where people exercise',
      'спортзал',
    ),
    examples: [
      {
        english: 'Astronauts exercise in the gym.',
        translations: L(
          '우주비행사들은 체육관에서 운동해요.',
          'Astronavtlar sport zalida mashq qiladi.',
          'Astronauts exercise in the gym.',
          'Астронавты тренируются в спортзале.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/dʒɪm/',
      ttsText: 'gym',
    },
    tags: ['exercise', 'space', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-verb-exercise',
    english: 'exercise',
    senseKey: 'physical-activity',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '운동하다',
      'mashq qilmoq',
      'to do physical activity to keep healthy',
      'тренироваться',
    ),
    examples: [
      {
        english: 'Astronauts exercise every day.',
        translations: L(
          '우주비행사들은 매일 운동해요.',
          'Astronavtlar har kuni mashq qiladi.',
          'Astronauts exercise every day.',
          'Астронавты тренируются каждый день.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈeksəsaɪz/',
      ttsText: 'exercise',
    },
    tags: ['exercise', 'space', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-exercise',
    english: 'exercise',
    senseKey: 'physical-activity-noun',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '운동',
      'mashq',
      'physical activity done to stay healthy',
      'физические упражнения',
    ),
    examples: [
      {
        english: 'Astronauts do two hours of exercise.',
        translations: L(
          '우주비행사들은 두 시간 동안 운동해요.',
          'Astronavtlar ikki soat mashq qiladi.',
          'Astronauts do two hours of exercise.',
          'Астронавты занимаются два часа.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈeksəsaɪz/',
      ttsText: 'exercise',
    },
    tags: ['exercise', 'space', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-shower',
    english: 'shower',
    senseKey: 'washing-under-running-water',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('샤워', 'dush', 'washing yourself under running water', 'душ'),
    examples: [
      {
        english: 'Astronauts do not have showers in space.',
        translations: L(
          '우주비행사들은 우주에서 샤워하지 않아요.',
          'Astronavtlar kosmosda dush qabul qilmaydi.',
          'Astronauts do not have showers in space.',
          'Астронавты не принимают душ в космосе.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈʃaʊə/',
      ttsText: 'shower',
    },
    tags: ['daily-routine', 'space', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-movie',
    english: 'movie',
    senseKey: 'film',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('영화', 'film', 'a film', 'фильм'),
    examples: [
      {
        english: 'Astronauts sometimes watch movies.',
        translations: L(
          '우주비행사들은 가끔 영화를 봐요.',
          'Astronavtlar ba’zan film ko‘radi.',
          'Astronauts sometimes watch movies.',
          'Астронавты иногда смотрят фильмы.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈmuːvi/',
      ttsText: 'movie',
    },
    tags: ['free-time', 'space', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-drink-coffee',
    english: 'coffee',
    senseKey: 'coffee-drink',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '커피',
      'qahva',
      'a drink made from roasted coffee beans',
      'кофе',
    ),
    examples: [
      {
        english: 'He drinks coffee.',
        translations: L(
          '그는 커피를 마셔요.',
          'U qahva ichadi.',
          'He drinks coffee.',
          'Он пьёт кофе.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkɒfi/',
      ttsText: 'coffee',
    },
    tags: ['food', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-food-chocolate',
    english: 'chocolate',
    senseKey: 'sweet-food-made-from-cocoa',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('초콜릿', 'shokolad', 'a sweet food made from cocoa', 'шоколад'),
    examples: [
      {
        english: 'He likes chocolate.',
        translations: L(
          '그는 초콜릿을 좋아해요.',
          'U shokoladni yaxshi ko‘radi.',
          'He likes chocolate.',
          'Он любит шоколад.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈtʃɒklət/',
      ttsText: 'chocolate',
    },
    tags: ['food', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-food-fruit',
    english: 'fruit',
    senseKey: 'plant-food',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '과일',
      'meva',
      'food such as apples, oranges or bananas',
      'фрукты',
    ),
    examples: [
      {
        english: 'He eats fruit.',
        translations: L(
          '그는 과일을 먹어요.',
          'U meva yeydi.',
          'He eats fruit.',
          'Он ест фрукты.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/fruːt/',
      ttsText: 'fruit',
    },
    tags: ['food', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-time',
    english: 'time',
    senseKey: 'measured-hours-and-minutes',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('시간', 'vaqt', 'the measured period shown by a clock', 'время'),
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
    tags: ['time', 'unit2'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-clock',
    english: 'clock',
    senseKey: 'device-showing-time',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('시계', 'soat', 'a device that shows the time', 'часы'),
    examples: [
      {
        english: 'Look at the clock.',
        translations: L(
          '시계를 보세요.',
          'Soatga qarang.',
          'Look at the clock.',
          'Посмотрите на часы.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/klɒk/',
      ttsText: 'clock',
    },
    tags: ['time', 'unit2'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-hour',
    english: 'hour',
    senseKey: 'sixty-minutes',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('시간; 한 시간', 'soat', 'a period of sixty minutes', 'час'),
    examples: [
      {
        english: 'They exercise for two hours.',
        translations: L(
          '그들은 두 시간 동안 운동해요.',
          'Ular ikki soat mashq qiladi.',
          'They exercise for two hours.',
          'Они тренируются два часа.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈaʊə/',
      ttsText: 'hour',
    },
    tags: ['time', 'unit2'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-minute',
    english: 'minute',
    senseKey: 'sixty-seconds',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('분', 'daqiqa', 'a period of sixty seconds', 'минута'),
    examples: [
      {
        english: 'Five minutes is a short time.',
        translations: L(
          '5분은 짧은 시간이에요.',
          'Besh daqiqa qisqa vaqt.',
          'Five minutes is a short time.',
          'Пять минут — короткое время.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈmɪnɪt/',
      ttsText: 'minute',
    },
    tags: ['time', 'unit2'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-quarter',
    english: 'quarter',
    senseKey: 'one-fourth',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '4분의 1; 15분',
      'chorak',
      'one of four equal parts; fifteen minutes when telling the time',
      'четверть',
    ),
    examples: [
      {
        english: 'It is quarter past eight.',
        translations: L(
          '8시 15분이에요.',
          'Soat sakkizdan chorak o‘tdi.',
          'It is quarter past eight.',
          'Сейчас четверть девятого.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkwɔːtə/',
      ttsText: 'quarter',
    },
    tags: ['time', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-half',
    english: 'half',
    senseKey: 'one-of-two-equal-parts',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '절반; 30분',
      'yarim',
      'one of two equal parts; thirty minutes when telling the time',
      'половина',
    ),
    examples: [
      {
        english: 'It is half past nine.',
        translations: L(
          '9시 30분이에요.',
          'Soat to‘qqiz yarim.',
          'It is half past nine.',
          'Сейчас половина десятого.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/hɑːf/',
      ttsText: 'half',
    },
    tags: ['time', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-time-past',
    english: 'past',
    senseKey: 'minutes-after-hour',
    partOfSpeech: WordPartOfSpeech.OTHER,
    meaning: L(
      '~시를 지난',
      '...dan o‘tgan',
      'used when the minutes are after an hour',
      'после',
    ),
    examples: [
      {
        english: 'It is ten past six.',
        translations: L(
          '6시 10분이에요.',
          'Soat oltidan o‘n daqiqa o‘tdi.',
          'It is ten past six.',
          'Сейчас десять минут седьмого.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/pɑːst/',
      ttsText: 'past',
    },
    tags: ['time', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-time-to',
    english: 'to',
    senseKey: 'minutes-before-next-hour',
    partOfSpeech: WordPartOfSpeech.OTHER,
    meaning: L(
      '~시 전',
      '...ga qolgan',
      'used when the minutes are before the next hour',
      'без',
    ),
    examples: [
      {
        english: 'It is ten to two.',
        translations: L(
          '2시 10분 전이에요.',
          'Soat ikkiga o‘n daqiqa qoldi.',
          'It is ten to two.',
          'Без десяти два.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/tuː/',
      ttsText: 'to',
    },
    tags: ['time', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-time-oclock',
    english: "o'clock",
    senseKey: 'exact-hour',
    partOfSpeech: WordPartOfSpeech.OTHER,
    meaning: L('정각', 'aniq soat', 'used for an exact hour', 'ровно'),
    examples: [
      {
        english: 'It is twelve o’clock.',
        translations: L(
          '12시 정각이에요.',
          'Soat roppa-rosa o‘n ikki.',
          'It is twelve o’clock.',
          'Сейчас ровно двенадцать.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/əˈklɒk/',
      ttsText: "o'clock",
    },
    tags: ['time', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-adjective-free',
    english: 'free',
    senseKey: 'not-busy',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('한가한; 자유로운', 'bo‘sh', 'not busy or working', 'свободный'),
    examples: [
      {
        english: 'Astronauts do not have a lot of free time.',
        translations: L(
          '우주비행사들은 자유 시간이 많지 않아요.',
          'Astronavtlarning bo‘sh vaqti ko‘p emas.',
          'Astronauts do not have a lot of free time.',
          'У астронавтов не так много свободного времени.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/friː/',
      ttsText: 'free',
    },
    tags: ['time', 'space', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-adjective-perfect',
    english: 'perfect',
    senseKey: 'completely-good',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('완벽한', 'mukammal', 'as good as possible', 'идеальный'),
    examples: [
      {
        english: 'For him, every day in space is perfect.',
        translations: L(
          '그에게는 우주에서의 매일이 완벽해요.',
          'U uchun kosmosdagi har bir kun mukammal.',
          'For him, every day in space is perfect.',
          'Для него каждый день в космосе идеален.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈpɜːfɪkt/',
      ttsText: 'perfect',
    },
    tags: ['description', 'space', 'unit2'],
    difficulty: 2,
    isCore: true,
  },
];

export const EN_S2_UNIT2_NODE2_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Telling the time
  // ===========================================================

  en_s2u2_n2_001_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '8:05 = five ___ eight.',
    blankAnswers: ['past'],
    options: ['past', 'to', 'half', 'quarter'],
    answer: 'past',
    answerTranslation: L(
      '8시 5분',
      '8:05',
      'five past eight',
      'пять минут девятого',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['time', 'past'],
  },

  en_s2u2_n2_002_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '9:55 = five ___ ten.',
    blankAnswers: ['to'],
    options: ['to', 'past', 'half', 'quarter'],
    answer: 'to',
    answerTranslation: L(
      '10시 5분 전',
      '10 ga besh daqiqa qoldi',
      'five to ten',
      'без пяти десять',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['time', 'to'],
  },

  en_s2u2_n2_003_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '9:30 = ___ past nine.',
    blankAnswers: ['half'],
    options: ['half', 'quarter', 'five', 'ten'],
    answer: 'half',
    answerTranslation: L(
      '9시 30분',
      'Soat to‘qqiz yarim.',
      'half past nine',
      'половина десятого',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['time', 'half'],
  },

  en_s2u2_n2_004_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '1:15 = ___ past one.',
    blankAnswers: ['quarter'],
    options: ['quarter', 'half', 'twenty', 'five'],
    answer: 'quarter',
    answerTranslation: L(
      '1시 15분',
      'Soat birdan chorak o‘tdi.',
      'quarter past one',
      'четверть второго',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['time', 'quarter-past'],
  },

  en_s2u2_n2_005_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '10:45 = quarter ___ eleven.',
    blankAnswers: ['to'],
    options: ['to', 'past', 'at', 'half'],
    answer: 'to',
    answerTranslation: L(
      '11시 15분 전',
      'Soat o‘n birga chorak qoldi.',
      'quarter to eleven',
      'без четверти одиннадцать',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['time', 'quarter-to'],
  },

  en_s2u2_n2_006_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '6:10 = ten ___ six.',
    blankAnswers: ['past'],
    options: ['past', 'to', 'half', 'quarter'],
    answer: 'past',
    answerTranslation: L(
      '6시 10분',
      'Soat oltidan o‘n daqiqa o‘tdi.',
      'ten past six',
      'десять минут седьмого',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['time', 'past'],
  },

  en_s2u2_n2_007_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '1:50 = ten ___ two.',
    blankAnswers: ['to'],
    options: ['to', 'past', 'at', 'after'],
    answer: 'to',
    answerTranslation: L(
      '2시 10분 전',
      'Soat ikkiga o‘n daqiqa qoldi.',
      'ten to two',
      'без десяти два',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['time', 'to'],
  },

  en_s2u2_n2_008_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '12:00 = twelve ___.',
    blankAnswers: ["o'clock"],
    options: ["o'clock", 'past', 'to', 'half'],
    answer: "o'clock",
    answerTranslation: L(
      '12시 정각',
      'Soat roppa-rosa o‘n ikki.',
      'twelve o’clock',
      'ровно двенадцать',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['time', 'oclock'],
  },

  en_s2u2_n2_009_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '시간과 표현을 연결하세요.',
      'Vaqt va ifodani moslang.',
      'Match each time with its expression.',
      'Соедините время с выражением.',
    ),
    pairs: [
      {
        text: '7:20',
        native: 'twenty past seven',
        nativeI18n: L(
          '7시 20분',
          'yettidan yigirma daqiqa o‘tdi',
          'twenty past seven',
          'двадцать минут восьмого',
        ),
      },
      {
        text: '2:40',
        native: 'twenty to three',
        nativeI18n: L(
          '3시 20분 전',
          'uchga yigirma daqiqa qoldi',
          'twenty to three',
          'без двадцати три',
        ),
      },
      {
        text: '4:25',
        native: 'twenty-five past four',
        nativeI18n: L(
          '4시 25분',
          'to‘rtdan yigirma besh daqiqa o‘tdi',
          'twenty-five past four',
          'двадцать пять минут пятого',
        ),
      },
      {
        text: '4:35',
        native: 'twenty-five to five',
        nativeI18n: L(
          '5시 25분 전',
          'beshga yigirma besh daqiqa qoldi',
          'twenty-five to five',
          'без двадцати пяти пять',
        ),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['time', 'matching'],
  },

  en_s2u2_n2_010_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: '8:30 = ',
    sentenceSuffix: '',
    answer: 'half past eight',
    answerTranslation: L(
      '8시 30분',
      'Soat sakkiz yarim.',
      'half past eight',
      'половина девятого',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Write the time expression half past eight.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: true,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['time', 'typing'],
  },

  en_s2u2_n2_011_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: '5:45 = ',
    sentenceSuffix: '',
    answer: 'quarter to six',
    answerTranslation: L(
      '6시 15분 전',
      'Soat oltiga chorak qoldi.',
      'quarter to six',
      'без четверти шесть',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Write the time expression quarter to six.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: true,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['time', 'typing'],
  },

  en_s2u2_n2_012_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['quarter', 'past', 'It’s', 'one', 'to', 'half'],
    answer: 'It’s quarter past one',
    audioText: 'It’s quarter past one.',
    answerTranslation: L(
      '1시 15분이에요.',
      'Soat birdan chorak o‘tdi.',
      'It’s quarter past one.',
      'Сейчас четверть второго.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['time', 'quarter'],
  },

  en_s2u2_n2_013_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['ten', 'past', 'six', 'to', 'It’s', 'seven'],
    answer: 'It’s ten past six',
    answerTranslation: L(
      '6시 10분이에요.',
      'Soat oltidan o‘n daqiqa o‘tdi.',
      'It’s ten past six.',
      'Сейчас десять минут седьмого.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['time', 'past'],
  },

  en_s2u2_n2_014_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'It’s twenty to three.',
    audioText: 'It’s twenty to three.',
    answerI18n: L(
      '3시 20분 전이에요',
      'Soat uchga yigirma daqiqa qoldi',
      'It’s twenty to three',
      'Без двадцати три',
    ),
    options: ['It’s', 'twenty', 'to', 'three', 'past', 'two'],
    optionsI18n: {
      ko: ['3시', '20분', '전이에요'],
      uz: ['Soat', 'uchga', 'yigirma', 'daqiqa', 'qoldi'],
      en: ['It’s', 'twenty', 'to', 'three'],
      ru: ['Без', 'двадцати', 'три'],
    },
    answerTranslation: L(
      '3시 20분 전이에요.',
      'Soat uchga yigirma daqiqa qoldi.',
      'It’s twenty to three.',
      'Без двадцати три.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['time', 'to'],
  },

  en_s2u2_n2_015_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What time is it?' }],
    options: [
      'It’s half past nine.',
      'It half nine.',
      'It’s nine to half.',
      'Half is nine.',
    ],
    answer: 'It’s half past nine.',
    answerTranslation: L(
      '9시 30분이에요.',
      'Soat to‘qqiz yarim.',
      'It’s half past nine.',
      'Сейчас половина десятого.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['time', 'conversation'],
  },

  en_s2u2_n2_016_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What time is it?',
    options: ['It’s', 'quarter', 'to', 'eleven', 'past', 'ten'],
    answer: 'It’s quarter to eleven',
    answerTranslation: L(
      '11시 15분 전이에요.',
      'Soat o‘n birga chorak qoldi.',
      'It’s quarter to eleven.',
      'Без четверти одиннадцать.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['time', 'quarter'],
  },

  en_s2u2_n2_017_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'It’s five past eight.',
    audioText: 'It’s five past eight.',
    answerTranslation: L(
      '8시 5분이에요.',
      'Soat sakkizdan besh daqiqa o‘tdi.',
      'It’s five past eight.',
      'Сейчас пять минут девятого.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['time', 'speaking'],
  },

  en_s2u2_n2_018_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'It’s twenty-five past four.',
    audioText: 'It’s twenty-five past four.',
    answerTranslation: L(
      '4시 25분이에요.',
      'Soat to‘rtdan yigirma besh daqiqa o‘tdi.',
      'It’s twenty-five past four.',
      'Сейчас двадцать пять минут пятого.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['time', 'speaking'],
  },

  en_s2u2_n2_019_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'It’s twenty-five to five.',
    audioText: 'It’s twenty-five to five.',
    answerTranslation: L(
      '5시 25분 전이에요.',
      'Soat beshga yigirma besh daqiqa qoldi.',
      'It’s twenty-five to five.',
      'Без двадцати пяти пять.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['time', 'speaking'],
  },

  en_s2u2_n2_020_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'quarter',
        native: 'chorak',
        nativeI18n: L('15분', 'chorak', 'quarter', 'четверть'),
      },
      {
        text: 'half',
        native: 'yarim',
        nativeI18n: L('30분; 절반', 'yarim', 'half', 'половина'),
      },
      {
        text: 'hour',
        native: 'soat',
        nativeI18n: L('한 시간', 'soat', 'hour', 'час'),
      },
      {
        text: 'minute',
        native: 'daqiqa',
        nativeI18n: L('분', 'daqiqa', 'minute', 'минута'),
      },
      {
        text: 'clock',
        native: 'soat',
        nativeI18n: L('시계', 'soat', 'clock', 'часы'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['time', 'review'],
  },

  // ===========================================================
  // Lesson 2 · An astronaut's day
  // ===========================================================

  en_s2u2_n2_021_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'astronaut',
        native: 'astronavt',
        nativeI18n: L('우주비행사', 'astronavt', 'astronaut', 'астронавт'),
      },
      {
        text: 'trainee',
        native: 'stajyor',
        nativeI18n: L('훈련생', 'stajyor', 'trainee', 'стажёр'),
      },
      {
        text: 'training',
        native: 'tayyorgarlik',
        nativeI18n: L('훈련', 'tayyorgarlik', 'training', 'подготовка'),
      },
      {
        text: 'space',
        native: 'kosmos',
        nativeI18n: L('우주', 'kosmos', 'space', 'космос'),
      },
      {
        text: 'Earth',
        native: 'Yer',
        nativeI18n: L('지구', 'Yer', 'Earth', 'Земля'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['space', 'astronaut'],
  },

  en_s2u2_n2_022_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Sana is a trainee ___.',
    blankAnswers: ['astronaut'],
    options: ['astronaut', 'scientist', 'teacher', 'journalist'],
    answer: 'astronaut',
    answerTranslation: L(
      'Sana는 우주비행사 훈련생이에요.',
      'Sana astronavt stajyor.',
      'Sana is a trainee astronaut.',
      'Сана — астронавт-стажёр.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['astronaut', 'trainee'],
  },

  en_s2u2_n2_023_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She goes to morning ___.',
    blankAnswers: ['classes'],
    options: ['classes', 'walls', 'bags', 'movies'],
    answer: 'classes',
    answerTranslation: L(
      '그녀는 오전 수업에 가요.',
      'U ertalabki darslarga boradi.',
      'She goes to morning classes.',
      'Она ходит на утренние занятия.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['astronaut', 'training'],
  },

  en_s2u2_n2_024_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She stops for a ___.',
    blankAnswers: ['break'],
    options: ['break', 'wall', 'space', 'bed'],
    answer: 'break',
    answerTranslation: L(
      '그녀는 잠시 쉬어요.',
      'U tanaffus qiladi.',
      'She stops for a break.',
      'Она делает перерыв.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['astronaut', 'break'],
  },

  en_s2u2_n2_025_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'bed',
        native: 'karavot',
        nativeI18n: L('침대', 'karavot', 'bed', 'кровать'),
      },
      {
        text: 'bag',
        native: 'qop',
        nativeI18n: L('가방; 자루', 'qop', 'bag', 'мешок'),
      },
      {
        text: 'wall',
        native: 'devor',
        nativeI18n: L('벽', 'devor', 'wall', 'стена'),
      },
      {
        text: 'gym',
        native: 'sport zali',
        nativeI18n: L('체육관', 'sport zali', 'gym', 'спортзал'),
      },
      {
        text: 'exercise',
        native: 'mashq',
        nativeI18n: L('운동', 'mashq', 'exercise', 'упражнение'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['space', 'daily-life'],
  },

  en_s2u2_n2_026_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Astronauts do two hours of ___ every day.',
    blankAnswers: ['exercise'],
    options: ['exercise', 'break', 'coffee', 'sleep'],
    answer: 'exercise',
    answerTranslation: L(
      '우주비행사들은 매일 두 시간 동안 운동해요.',
      'Astronavtlar har kuni ikki soat mashq qiladi.',
      'Astronauts do two hours of exercise every day.',
      'Астронавты каждый день занимаются два часа.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['space', 'exercise'],
  },

  en_s2u2_n2_027_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Astronauts sleep in special ___.',
    blankAnswers: ['bags'],
    options: ['bags', 'gyms', 'showers', 'classes'],
    answer: 'bags',
    answerTranslation: L(
      '우주비행사들은 특별한 가방에서 자요.',
      'Astronavtlar maxsus qoplarda uxlaydi.',
      'Astronauts sleep in special bags.',
      'Астронавты спят в специальных мешках.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['space', 'sleep'],
  },

  en_s2u2_n2_028_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The sleeping bags are on the ___.',
    blankAnswers: ['walls'],
    options: ['walls', 'beds', 'gyms', 'classes'],
    answer: 'walls',
    answerTranslation: L(
      '수면용 가방은 벽에 있어요.',
      'Uxlash qoplari devorlarda.',
      'The sleeping bags are on the walls.',
      'Спальные мешки находятся на стенах.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['space', 'walls'],
  },

  en_s2u2_n2_029_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Astronauts do not have ___ in space.',
    blankAnswers: ['showers'],
    options: ['showers', 'exercise', 'work', 'time'],
    answer: 'showers',
    answerTranslation: L(
      '우주비행사들은 우주에서 샤워하지 않아요.',
      'Astronavtlar kosmosda dush qabul qilmaydi.',
      'Astronauts do not have showers in space.',
      'Астронавты не принимают душ в космосе.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['space', 'shower'],
  },

  en_s2u2_n2_030_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Astronauts do not have a lot of ___ time.',
    blankAnswers: ['free'],
    options: ['free', 'perfect', 'late', 'early'],
    answer: 'free',
    answerTranslation: L(
      '우주비행사들은 자유 시간이 많지 않아요.',
      'Astronavtlarning bo‘sh vaqti ko‘p emas.',
      'Astronauts do not have a lot of free time.',
      'У астронавтов мало свободного времени.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['space', 'free-time'],
  },

  en_s2u2_n2_031_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['hours', 'They', 'exercise', 'two', 'for', 'sleep'],
    answer: 'They exercise for two hours',
    audioText: 'They exercise for two hours.',
    answerTranslation: L(
      '그들은 두 시간 동안 운동해요.',
      'Ular ikki soat mashq qiladi.',
      'They exercise for two hours.',
      'Они тренируются два часа.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['space', 'exercise'],
  },

  en_s2u2_n2_032_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['space', 'in', 'Astronauts', 'work', 'Earth', 'works'],
    answer: 'Astronauts work in space',
    answerTranslation: L(
      '우주비행사들은 우주에서 일해요.',
      'Astronavtlar kosmosda ishlaydi.',
      'Astronauts work in space.',
      'Астронавты работают в космосе.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['space', 'astronaut'],
  },

  en_s2u2_n2_033_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'They sleep in special bags.',
    audioText: 'They sleep in special bags.',
    answerI18n: L(
      '그들은 특별한 가방에서 자요',
      'Ular maxsus qoplarda uxlaydi',
      'They sleep in special bags',
      'Они спят в специальных мешках',
    ),
    options: ['They', 'sleep', 'in', 'special', 'bags', 'beds', 'exercise'],
    optionsI18n: {
      ko: ['그들은', '특별한', '가방에서', '자요'],
      uz: ['Ular', 'maxsus', 'qoplarda', 'uxlaydi'],
      en: ['They', 'sleep', 'in', 'special', 'bags'],
      ru: ['Они', 'спят', 'в', 'специальных', 'мешках'],
    },
    answerTranslation: L(
      '그들은 특별한 가방에서 자요.',
      'Ular maxsus qoplarda uxlaydi.',
      'They sleep in special bags.',
      'Они спят в специальных мешках.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['space', 'sleep'],
  },

  en_s2u2_n2_034_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Do astronauts sleep in beds?' }],
    options: [
      'No, they don’t.',
      'No, they doesn’t.',
      'Yes, they doesn’t.',
      'No, they not.',
    ],
    answer: 'No, they don’t.',
    answerTranslation: L('아니요.', 'Yo‘q.', 'No, they don’t.', 'Нет.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['space', 'negative'],
  },

  en_s2u2_n2_035_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Do astronauts exercise every day?' },
    ],
    options: [
      'Yes, they do.',
      'Yes, they does.',
      'No, they do.',
      'Yes, they are.',
    ],
    answer: 'Yes, they do.',
    answerTranslation: L('네.', 'Ha.', 'Yes, they do.', 'Да.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['space', 'exercise'],
  },

  en_s2u2_n2_036_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Astronauts work, exercise and sleep in space.',
    audioText: 'Astronauts work, exercise and sleep in space.',
    answerTranslation: L(
      '우주비행사들은 우주에서 일하고 운동하고 잠을 자요.',
      'Astronavtlar kosmosda ishlaydi, mashq qiladi va uxlaydi.',
      'Astronauts work, exercise and sleep in space.',
      'Астронавты работают, тренируются и спят в космосе.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['space', 'routine'],
  },

  en_s2u2_n2_037_word_matching: {
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
        text: 'chocolate',
        native: 'shokolad',
        nativeI18n: L('초콜릿', 'shokolad', 'chocolate', 'шоколад'),
      },
      {
        text: 'fruit',
        native: 'meva',
        nativeI18n: L('과일', 'meva', 'fruit', 'фрукты'),
      },
      {
        text: 'movie',
        native: 'film',
        nativeI18n: L('영화', 'film', 'movie', 'фильм'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['space', 'free-time'],
  },

  en_s2u2_n2_038_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Life in space is very different from life on Earth.',
    audioText: 'Life in space is very different from life on Earth.',
    answerTranslation: L(
      '우주 생활은 지구 생활과 매우 달라요.',
      'Kosmosdagi hayot Yerdagi hayotdan juda farq qiladi.',
      'Life in space is very different from life on Earth.',
      'Жизнь в космосе сильно отличается от жизни на Земле.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['space', 'earth'],
  },

  en_s2u2_n2_039_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'For Chris, every day in space is ___.',
    blankAnswers: ['perfect'],
    options: ['perfect', 'late', 'free', 'closed'],
    answer: 'perfect',
    answerTranslation: L(
      'Chris에게는 우주에서의 매일이 완벽해요.',
      'Chris uchun kosmosdagi har bir kun mukammal.',
      'For Chris, every day in space is perfect.',
      'Для Криса каждый день в космосе идеален.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['space', 'perfect'],
  },

  en_s2u2_n2_040_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Astronauts do not have showers and they do not sleep in beds.',
    audioText: 'Astronauts do not have showers and they do not sleep in beds.',
    answerTranslation: L(
      '우주비행사들은 샤워하지 않고 침대에서 자지 않아요.',
      'Astronavtlar dush qabul qilmaydi va karavotda uxlamaydi.',
      'Astronauts do not have showers and they do not sleep in beds.',
      'Астронавты не принимают душ и не спят в кроватях.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['space', 'review'],
  },

  // ===========================================================
  // Lesson 3 · Present simple negative
  // ===========================================================

  en_s2u2_n2_041_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I ___ have a lot of free time.',
    blankAnswers: ['don’t'],
    options: ['don’t', 'doesn’t', 'isn’t', 'aren’t'],
    answer: 'don’t',
    answerTranslation: L(
      '저는 자유 시간이 많지 않아요.',
      'Mening bo‘sh vaqtim ko‘p emas.',
      'I don’t have a lot of free time.',
      'У меня не так много свободного времени.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['present-simple-negative', 'dont'],
  },

  en_s2u2_n2_042_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'We ___ work at weekends.',
    blankAnswers: ['don’t'],
    options: ['don’t', 'doesn’t', 'isn’t', 'not'],
    answer: 'don’t',
    answerTranslation: L(
      '우리는 주말에 일하지 않아요.',
      'Biz dam olish kunlari ishlamaymiz.',
      'We don’t work at weekends.',
      'Мы не работаем по выходным.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['present-simple-negative', 'dont'],
  },

  en_s2u2_n2_043_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'They ___ sleep in beds.',
    blankAnswers: ['don’t'],
    options: ['don’t', 'doesn’t', 'aren’t', 'isn’t'],
    answer: 'don’t',
    answerTranslation: L(
      '그들은 침대에서 자지 않아요.',
      'Ular karavotda uxlamaydi.',
      'They don’t sleep in beds.',
      'Они не спят в кроватях.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['present-simple-negative', 'dont'],
  },

  en_s2u2_n2_044_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'He ___ have a lot of free time.',
    blankAnswers: ['doesn’t'],
    options: ['doesn’t', 'don’t', 'isn’t', 'aren’t'],
    answer: 'doesn’t',
    answerTranslation: L(
      '그는 자유 시간이 많지 않아요.',
      'Uning bo‘sh vaqti ko‘p emas.',
      'He doesn’t have a lot of free time.',
      'У него мало свободного времени.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['present-simple-negative', 'doesnt'],
  },

  en_s2u2_n2_045_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She ___ sleep in a bed.',
    blankAnswers: ['doesn’t'],
    options: ['doesn’t', 'don’t', 'not', 'isn’t'],
    answer: 'doesn’t',
    answerTranslation: L(
      '그녀는 침대에서 자지 않아요.',
      'U karavotda uxlamaydi.',
      'She doesn’t sleep in a bed.',
      'Она не спит в кровати.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['present-simple-negative', 'doesnt'],
  },

  en_s2u2_n2_046_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'He doesn’t ___ to classes at weekends.',
    blankAnswers: ['go'],
    options: ['go', 'goes', 'going', 'went'],
    answer: 'go',
    answerTranslation: L(
      '그는 주말에는 수업에 가지 않아요.',
      'U dam olish kunlari darslarga bormaydi.',
      'He doesn’t go to classes at weekends.',
      'По выходным он не ходит на занятия.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['present-simple-negative', 'base-verb'],
  },

  en_s2u2_n2_047_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She doesn’t ___ coffee.',
    blankAnswers: ['drink'],
    options: ['drink', 'drinks', 'drinking', 'drank'],
    answer: 'drink',
    answerTranslation: L(
      '그녀는 커피를 마시지 않아요.',
      'U qahva ichmaydi.',
      'She doesn’t drink coffee.',
      'Она не пьёт кофе.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['present-simple-negative', 'base-verb'],
  },

  en_s2u2_n2_048_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'It doesn’t ___ on Sundays.',
    blankAnswers: ['open'],
    options: ['open', 'opens', 'opening', 'opened'],
    answer: 'open',
    answerTranslation: L(
      '그곳은 일요일에는 열지 않아요.',
      'U yakshanba kunlari ochilmaydi.',
      'It doesn’t open on Sundays.',
      'По воскресеньям это место не открывается.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['present-simple-negative', 'base-verb'],
  },

  en_s2u2_n2_049_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I ',
    sentenceSuffix: ' drive to work.',
    answer: 'don’t',
    answerTranslation: L(
      '저는 차를 운전해서 출근하지 않아요.',
      'Men ishga mashinada bormayman.',
      'I don’t drive to work.',
      'Я не езжу на работу на машине.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Use don’t to make the present simple negative with I.',
      acceptedAnswers: ['do not'],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['present-simple-negative', 'typing'],
  },

  en_s2u2_n2_050_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'She ',
    sentenceSuffix: ' go to classes at weekends.',
    answer: 'doesn’t',
    answerTranslation: L(
      '그녀는 주말에는 수업에 가지 않아요.',
      'U dam olish kunlari darslarga bormaydi.',
      'She doesn’t go to classes at weekends.',
      'Она не ходит на занятия по выходным.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'Use doesn’t to make the present simple negative with she.',
      acceptedAnswers: ['does not'],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['present-simple-negative', 'typing'],
  },

  en_s2u2_n2_051_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '주어와 부정형을 연결하세요.',
      'Ega va inkor shaklini moslang.',
      'Match each subject with its negative form.',
      'Соедините подлежащее с отрицательной формой.',
    ),
    pairs: [
      {
        text: 'I',
        native: 'don’t',
        nativeI18n: L('don’t', 'don’t', 'don’t', 'don’t'),
      },
      {
        text: 'we',
        native: 'don’t',
        nativeI18n: L('don’t', 'don’t', 'don’t', 'don’t'),
      },
      {
        text: 'they',
        native: 'don’t',
        nativeI18n: L('don’t', 'don’t', 'don’t', 'don’t'),
      },
      {
        text: 'he',
        native: 'doesn’t',
        nativeI18n: L('doesn’t', 'doesn’t', 'doesn’t', 'doesn’t'),
      },
      {
        text: 'she',
        native: 'doesn’t',
        nativeI18n: L('doesn’t', 'doesn’t', 'doesn’t', 'doesn’t'),
      },
    ],
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['present-simple-negative'],
  },

  en_s2u2_n2_052_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['don’t', 'city', 'in', 'We', 'live', 'doesn’t'],
    answer: 'We don’t live in a city',
    audioText: 'We don’t live in a city.',
    answerTranslation: L(
      '우리는 도시에 살지 않아요.',
      'Biz shaharda yashamaymiz.',
      'We don’t live in a city.',
      'Мы не живём в городе.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['present-simple-negative'],
  },

  en_s2u2_n2_053_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['doesn’t', 'He', 'Chinese', 'speak', 'speaks', 'don’t'],
    answer: 'He doesn’t speak Chinese',
    answerTranslation: L(
      '그는 중국어를 하지 않아요.',
      'U xitoy tilida gapirmaydi.',
      'He doesn’t speak Chinese.',
      'Он не говорит по-китайски.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['present-simple-negative'],
  },

  en_s2u2_n2_054_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'She doesn’t get up at six.',
    audioText: 'She doesn’t get up at six.',
    answerI18n: L(
      '그녀는 6시에 일어나지 않아요',
      'U soat oltida turmaydi',
      'She doesn’t get up at six',
      'Она не встаёт в шесть',
    ),
    options: ['She', 'doesn’t', 'get', 'up', 'at', 'six', 'gets'],
    optionsI18n: {
      ko: ['그녀는', '6시에', '일어나지', '않아요'],
      uz: ['U', 'soat', 'oltida', 'turmaydi'],
      en: ['She', 'doesn’t', 'get', 'up', 'at', 'six'],
      ru: ['Она', 'не', 'встаёт', 'в', 'шесть'],
    },
    answerTranslation: L(
      '그녀는 6시에 일어나지 않아요.',
      'U soat oltida turmaydi.',
      'She doesn’t get up at six.',
      'Она не встаёт в шесть.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['present-simple-negative'],
  },

  en_s2u2_n2_055_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Does Chris have a lot of free time?' },
    ],
    options: [
      'No, he doesn’t.',
      'No, he don’t.',
      'Yes, he doesn’t.',
      'No, he isn’t.',
    ],
    answer: 'No, he doesn’t.',
    answerTranslation: L('아니요.', 'Yo‘q.', 'No, he doesn’t.', 'Нет.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['present-simple-negative', 'space'],
  },

  en_s2u2_n2_056_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She doesn’t ___ in a factory.',
    blankAnswers: ['work'],
    options: ['work', 'works', 'working', 'worked'],
    answer: 'work',
    answerTranslation: L(
      '그녀는 공장에서 일하지 않아요.',
      'U fabrikada ishlamaydi.',
      'She doesn’t work in a factory.',
      'Она не работает на фабрике.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['present-simple-negative', 'base-verb'],
  },

  en_s2u2_n2_057_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'They don’t ___ a car.',
    blankAnswers: ['have'],
    options: ['have', 'has', 'having', 'haves'],
    answer: 'have',
    answerTranslation: L(
      '그들은 차가 없어요.',
      'Ularning mashinasi yo‘q.',
      'They don’t have a car.',
      'У них нет машины.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['present-simple-negative'],
  },

  en_s2u2_n2_058_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'He doesn’t have a lot of free time.',
    audioText: 'He doesn’t have a lot of free time.',
    answerTranslation: L(
      '그는 자유 시간이 많지 않아요.',
      'Uning bo‘sh vaqti ko‘p emas.',
      'He doesn’t have a lot of free time.',
      'У него мало свободного времени.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['present-simple-negative', 'doesnt'],
  },

  en_s2u2_n2_059_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Astronauts don’t sleep in beds.',
    audioText: 'Astronauts don’t sleep in beds.',
    answerTranslation: L(
      '우주비행사들은 침대에서 자지 않아요.',
      'Astronavtlar karavotda uxlamaydi.',
      'Astronauts don’t sleep in beds.',
      'Астронавты не спят в кроватях.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['present-simple-negative', 'space'],
  },

  en_s2u2_n2_060_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She doesn’t go to classes at weekends.',
    audioText: 'She doesn’t go to classes at weekends.',
    answerTranslation: L(
      '그녀는 주말에는 수업에 가지 않아요.',
      'U dam olish kunlari darslarga bormaydi.',
      'She doesn’t go to classes at weekends.',
      'Она не ходит на занятия по выходным.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['present-simple-negative', 'review'],
  },

  // ===========================================================
  // Lesson 4 · Negative routines and review
  // ===========================================================

  en_s2u2_n2_061_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'We ___ usually go out on Fridays.',
    blankAnswers: ['don’t'],
    options: ['don’t', 'doesn’t', 'aren’t', 'never'],
    answer: 'don’t',
    answerTranslation: L(
      '우리는 보통 금요일에는 외출하지 않아요.',
      'Biz odatda juma kunlari tashqariga chiqmaymiz.',
      'We don’t usually go out on Fridays.',
      'Мы обычно не выходим по пятницам.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['negative', 'frequency'],
  },

  en_s2u2_n2_062_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'He ___ often watch television.',
    blankAnswers: ['doesn’t'],
    options: ['doesn’t', 'don’t', 'isn’t', 'never'],
    answer: 'doesn’t',
    answerTranslation: L(
      '그는 TV를 자주 보지 않아요.',
      'U televizorni tez-tez ko‘rmaydi.',
      'He doesn’t often watch television.',
      'Он нечасто смотрит телевизор.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['negative', 'frequency'],
  },

  en_s2u2_n2_063_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'They ___ usually go shopping.',
    blankAnswers: ['don’t'],
    options: ['don’t', 'doesn’t', 'isn’t', 'aren’t'],
    answer: 'don’t',
    answerTranslation: L(
      '그들은 보통 쇼핑하러 가지 않아요.',
      'Ular odatda xarid qilishga bormaydi.',
      'They don’t usually go shopping.',
      'Они обычно не ходят за покупками.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['negative', 'frequency'],
  },

  en_s2u2_n2_064_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She ___ usually have coffee.',
    blankAnswers: ['doesn’t'],
    options: ['doesn’t', 'don’t', 'isn’t', 'not'],
    answer: 'doesn’t',
    answerTranslation: L(
      '그녀는 보통 커피를 마시지 않아요.',
      'U odatda qahva ichmaydi.',
      'She doesn’t usually have coffee.',
      'Она обычно не пьёт кофе.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['negative', 'frequency'],
  },

  en_s2u2_n2_065_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'We use ___ without don’t or doesn’t.',
    blankAnswers: ['never'],
    options: ['never', 'usually', 'often', 'sometimes'],
    answer: 'never',
    answerTranslation: L(
      'never는 don’t나 doesn’t 없이 사용해요.',
      'Never don’t yoki doesn’t bilan birga ishlatilmaydi.',
      'We use never without don’t or doesn’t.',
      'Never используется без don’t или doesn’t.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['negative', 'never'],
  },

  en_s2u2_n2_066_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She ___ gets up late.',
    blankAnswers: ['never'],
    options: ['never', 'doesn’t never', 'don’t never', 'not never'],
    answer: 'never',
    answerTranslation: L(
      '그녀는 절대 늦게 일어나지 않아요.',
      'U hech qachon kech turmaydi.',
      'She never gets up late.',
      'Она никогда не встаёт поздно.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['negative', 'never'],
  },

  en_s2u2_n2_067_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She ___ ever takes photos.',
    blankAnswers: ['hardly'],
    options: ['hardly', 'doesn’t hardly', 'not', 'don’t'],
    answer: 'hardly',
    answerTranslation: L(
      '그녀는 사진을 거의 찍지 않아요.',
      'U deyarli hech qachon suratga olmaydi.',
      'She hardly ever takes photos.',
      'Она почти никогда не фотографирует.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['negative', 'hardly-ever'],
  },

  en_s2u2_n2_068_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['doesn’t', 'usually', 'She', 'coffee', 'drink', 'drinks'],
    answer: 'She doesn’t usually drink coffee',
    audioText: 'She doesn’t usually drink coffee.',
    answerTranslation: L(
      '그녀는 보통 커피를 마시지 않아요.',
      'U odatda qahva ichmaydi.',
      'She doesn’t usually drink coffee.',
      'Она обычно не пьёт кофе.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['negative', 'frequency'],
  },

  en_s2u2_n2_069_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['often', 'don’t', 'We', 'movies', 'watch', 'watches'],
    answer: 'We don’t often watch movies',
    answerTranslation: L(
      '우리는 영화를 자주 보지 않아요.',
      'Biz filmlarni tez-tez ko‘rmaymiz.',
      'We don’t often watch movies.',
      'Мы нечасто смотрим фильмы.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['negative', 'frequency'],
  },

  en_s2u2_n2_070_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'He doesn’t usually get up late.',
    audioText: 'He doesn’t usually get up late.',
    answerI18n: L(
      '그는 보통 늦게 일어나지 않아요',
      'U odatda kech turmaydi',
      'He doesn’t usually get up late',
      'Он обычно не встаёт поздно',
    ),
    options: ['He', 'doesn’t', 'usually', 'get', 'up', 'late', 'gets'],
    optionsI18n: {
      ko: ['그는', '보통', '늦게', '일어나지', '않아요'],
      uz: ['U', 'odatda', 'kech', 'turmaydi'],
      en: ['He', 'doesn’t', 'usually', 'get', 'up', 'late'],
      ru: ['Он', 'обычно', 'не', 'встаёт', 'поздно'],
    },
    answerTranslation: L(
      '그는 보통 늦게 일어나지 않아요.',
      'U odatda kech turmaydi.',
      'He doesn’t usually get up late.',
      'Он обычно не встаёт поздно.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['negative', 'frequency'],
  },

  en_s2u2_n2_071_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Chris ',
    sentenceSuffix: ' have much free time.',
    answer: 'doesn’t',
    answerTranslation: L(
      'Chris는 자유 시간이 많지 않아요.',
      'Chrisning bo‘sh vaqti ko‘p emas.',
      'Chris doesn’t have much free time.',
      'У Криса мало свободного времени.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'Use doesn’t with the third person singular subject Chris.',
      acceptedAnswers: ['does not'],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['negative', 'typing'],
  },

  en_s2u2_n2_072_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Astronauts ',
    sentenceSuffix: ' have showers in space.',
    answer: 'don’t',
    answerTranslation: L(
      '우주비행사들은 우주에서 샤워하지 않아요.',
      'Astronavtlar kosmosda dush qabul qilmaydi.',
      'Astronauts don’t have showers in space.',
      'Астронавты не принимают душ в космосе.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Use don’t with the plural subject astronauts.',
      acceptedAnswers: ['do not'],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['negative', 'typing'],
  },

  en_s2u2_n2_073_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Does he sleep in a bed?' }],
    options: [
      'No, he doesn’t.',
      'No, he don’t.',
      'No, he isn’t sleep.',
      'No, he doesn’t sleeps.',
    ],
    answer: 'No, he doesn’t.',
    answerTranslation: L('아니요.', 'Yo‘q.', 'No, he doesn’t.', 'Нет.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['negative', 'short-answer'],
  },

  en_s2u2_n2_074_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Do they have showers in space?' }],
    options: [
      'No, they don’t.',
      'No, they doesn’t.',
      'No, they aren’t.',
      'No, they don’t have does.',
    ],
    answer: 'No, they don’t.',
    answerTranslation: L('아니요.', 'Yo‘q.', 'No, they don’t.', 'Нет.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['negative', 'short-answer'],
  },

  en_s2u2_n2_075_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What time do you get up?',
    options: ['I', 'get', 'up', 'at', 'seven', 'gets'],
    answer: 'I get up at seven',
    answerTranslation: L(
      '저는 7시에 일어나요.',
      'Men soat yettida turaman.',
      'I get up at seven.',
      'Я встаю в семь.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['time', 'routine'],
  },

  en_s2u2_n2_076_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What time do you go to bed?',
    options: ['I', 'go', 'to', 'bed', 'at', 'eleven', 'goes'],
    answer: 'I go to bed at eleven',
    answerTranslation: L(
      '저는 11시에 자요.',
      'Men soat o‘n birda uxlayman.',
      'I go to bed at eleven.',
      'Я ложусь спать в одиннадцать.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['time', 'routine'],
  },

  en_s2u2_n2_077_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I don’t usually go to bed late.',
    audioText: 'I don’t usually go to bed late.',
    answerTranslation: L(
      '저는 보통 늦게 자지 않아요.',
      'Men odatda kech uxlamayman.',
      'I don’t usually go to bed late.',
      'Я обычно не ложусь спать поздно.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['negative', 'routine'],
  },

  en_s2u2_n2_078_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I never get up at eleven.',
    audioText: 'I never get up at eleven.',
    answerTranslation: L(
      '저는 절대 11시에 일어나지 않아요.',
      'Men hech qachon soat o‘n birda turmayman.',
      'I never get up at eleven.',
      'Я никогда не встаю в одиннадцать.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['negative', 'never'],
  },

  en_s2u2_n2_079_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Astronauts don’t have a lot of free time because they work and exercise every day.',
    audioText:
      'Astronauts don’t have a lot of free time because they work and exercise every day.',
    answerTranslation: L(
      '우주비행사들은 매일 일하고 운동하기 때문에 자유 시간이 많지 않아요.',
      'Astronavtlarning bo‘sh vaqti ko‘p emas, chunki ular har kuni ishlaydi va mashq qiladi.',
      'Astronauts don’t have a lot of free time because they work and exercise every day.',
      'У астронавтов мало свободного времени, потому что они каждый день работают и тренируются.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['negative', 'space', 'review'],
  },

  en_s2u2_n2_080_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'They don’t sleep in beds, they don’t have showers, and they exercise every day.',
    audioText:
      'They don’t sleep in beds, they don’t have showers, and they exercise every day.',
    answerTranslation: L(
      '그들은 침대에서 자지 않고 샤워하지 않으며 매일 운동해요.',
      'Ular karavotda uxlamaydi, dush qabul qilmaydi va har kuni mashq qiladi.',
      'They don’t sleep in beds, they don’t have showers, and they exercise every day.',
      'Они не спят в кроватях, не принимают душ и каждый день тренируются.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['negative', 'space', 'unit-review'],
  },
};

// ─────────────────────────────────────────────────────────────
// Node 2
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT2_NODE2 = {
  title: L(
    '시간 보내기',
    'Vaqt o‘tkazish',
    'Spending time',
    'Как мы проводим время',
  ),
  section: 2,
  unit: 2,
  order: 2,
  isActive: true,

  lessons: [
    {
      title: L('몇 시예요?', 'Soat necha?', 'What time is it?', 'Который час?'),
      description: L(
        'o’clock, past, to, half, quarter를 사용해서 여러 시각을 말해요.',
        'O’clock, past, to, half va quarter yordamida vaqtni aytishni mashq qilasiz.',
        'Tell the time using o’clock, past, to, half and quarter.',
        'Учимся говорить время с o’clock, past, to, half и quarter.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 1,
      questions: [
        'en_s2u2_n2_001_fill_in_blank',
        'en_s2u2_n2_002_fill_in_blank',
        'en_s2u2_n2_003_fill_in_blank',
        'en_s2u2_n2_004_fill_in_blank',
        'en_s2u2_n2_005_fill_in_blank',
        'en_s2u2_n2_006_fill_in_blank',
        'en_s2u2_n2_007_fill_in_blank',
        'en_s2u2_n2_008_fill_in_blank',
        'en_s2u2_n2_009_word_matching',
        'en_s2u2_n2_010_type_answer',
        'en_s2u2_n2_011_type_answer',
        'en_s2u2_n2_012_word_arrange',
        'en_s2u2_n2_013_translate_builder',
        'en_s2u2_n2_014_sentence_builder',
        'en_s2u2_n2_015_dialog_complete',
        'en_s2u2_n2_016_reply_builder',
        'en_s2u2_n2_017_speaking',
        'en_s2u2_n2_018_speaking',
        'en_s2u2_n2_019_speaking',
        'en_s2u2_n2_020_word_matching',
      ],
    },

    {
      title: L(
        '우주비행사의 하루',
        'Astronavtning bir kuni',
        'An astronaut’s day',
        'День астронавта',
      ),
      description: L(
        '우주비행사의 훈련, 운동, 수면과 우주에서의 생활에 필요한 어휘를 익혀요.',
        'Astronavtlarning tayyorgarligi, mashqlari, uyqusi va kosmosdagi hayoti haqidagi so‘zlarni o‘rganasiz.',
        'Learn vocabulary for astronaut training, exercise, sleep and everyday life in space.',
        'Изучаем лексику о подготовке, тренировках, сне и повседневной жизни астронавтов.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 2,
      questions: [
        'en_s2u2_n2_021_word_matching',
        'en_s2u2_n2_022_fill_in_blank',
        'en_s2u2_n2_023_fill_in_blank',
        'en_s2u2_n2_024_fill_in_blank',
        'en_s2u2_n2_025_word_matching',
        'en_s2u2_n2_026_fill_in_blank',
        'en_s2u2_n2_027_fill_in_blank',
        'en_s2u2_n2_028_fill_in_blank',
        'en_s2u2_n2_029_fill_in_blank',
        'en_s2u2_n2_030_fill_in_blank',
        'en_s2u2_n2_031_word_arrange',
        'en_s2u2_n2_032_translate_builder',
        'en_s2u2_n2_033_sentence_builder',
        'en_s2u2_n2_034_dialog_complete',
        'en_s2u2_n2_035_dialog_complete',
        'en_s2u2_n2_036_speaking',
        'en_s2u2_n2_037_word_matching',
        'en_s2u2_n2_038_speaking',
        'en_s2u2_n2_039_fill_in_blank',
        'en_s2u2_n2_040_speaking',
      ],
    },

    {
      title: L('하지 않아요', 'Qilmayman', 'I don’t do it', 'Я этого не делаю'),
      description: L(
        'I, you, we, they에는 don’t를, he, she, it에는 doesn’t를 사용해서 현재시제 부정문을 만들어요.',
        'I, you, we, they bilan don’t, he, she, it bilan doesn’t ishlatib hozirgi zamon inkor gaplarini tuzasiz.',
        'Make present simple negative sentences with don’t and doesn’t.',
        'Строим отрицательные предложения Present Simple с don’t и doesn’t.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 3,
      questions: [
        'en_s2u2_n2_041_fill_in_blank',
        'en_s2u2_n2_042_fill_in_blank',
        'en_s2u2_n2_043_fill_in_blank',
        'en_s2u2_n2_044_fill_in_blank',
        'en_s2u2_n2_045_fill_in_blank',
        'en_s2u2_n2_046_fill_in_blank',
        'en_s2u2_n2_047_fill_in_blank',
        'en_s2u2_n2_048_fill_in_blank',
        'en_s2u2_n2_049_type_answer',
        'en_s2u2_n2_050_type_answer',
        'en_s2u2_n2_051_word_matching',
        'en_s2u2_n2_052_word_arrange',
        'en_s2u2_n2_053_translate_builder',
        'en_s2u2_n2_054_sentence_builder',
        'en_s2u2_n2_055_dialog_complete',
        'en_s2u2_n2_056_fill_in_blank',
        'en_s2u2_n2_057_fill_in_blank',
        'en_s2u2_n2_058_speaking',
        'en_s2u2_n2_059_speaking',
        'en_s2u2_n2_060_speaking',
      ],
    },

    {
      title: L(
        '보통 하지 않아요',
        'Odatda qilmayman',
        'I don’t usually do it',
        'Обычно я этого не делаю',
      ),
      description: L(
        'don’t와 doesn’t가 있는 부정문에서 빈도부사의 위치를 연습하고 시간·우주 생활 내용을 함께 복습해요.',
        'Don’t va doesn’t qatnashgan gaplarda takroriylik ravishlari o‘rnini mashq qilib, vaqt va kosmos mavzusini takrorlaysiz.',
        'Practise adverb position in negative present simple sentences and review time and life in space.',
        'Практикуем положение наречий частотности в отрицательных предложениях и повторяем тему времени и космоса.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 4,
      questions: [
        'en_s2u2_n2_061_fill_in_blank',
        'en_s2u2_n2_062_fill_in_blank',
        'en_s2u2_n2_063_fill_in_blank',
        'en_s2u2_n2_064_fill_in_blank',
        'en_s2u2_n2_065_fill_in_blank',
        'en_s2u2_n2_066_fill_in_blank',
        'en_s2u2_n2_067_fill_in_blank',
        'en_s2u2_n2_068_word_arrange',
        'en_s2u2_n2_069_translate_builder',
        'en_s2u2_n2_070_sentence_builder',
        'en_s2u2_n2_071_type_answer',
        'en_s2u2_n2_072_type_answer',
        'en_s2u2_n2_073_dialog_complete',
        'en_s2u2_n2_074_dialog_complete',
        'en_s2u2_n2_075_reply_builder',
        'en_s2u2_n2_076_reply_builder',
        'en_s2u2_n2_077_speaking',
        'en_s2u2_n2_078_speaking',
        'en_s2u2_n2_079_speaking',
        'en_s2u2_n2_080_speaking',
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Section 2 · Unit 2 · Node 3
// 2.3 Vocabulary and skills development
//
// Coverage
// - conjunctions: and / but / because / or / so
// - understanding conjunctions in reading
// - body clock / sleep / meals / healthy routines
// - verb + preposition:
//   agree with
//   ask for
//   laugh at
//   listen to
//   look at / look for
//   pay for
//   talk to
//   think about
//   wait for
//   worry about
// - prepositions are NOT stored as phrases
// - all headwords are single words only
//
// 4 lessons × 20 questions = 80
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT2_NODE3_WORDS = [
  {
    code: 'en-conjunction-and',
    english: 'and',
    senseKey: 'joins-similar-ideas',
    partOfSpeech: WordPartOfSpeech.OTHER,
    meaning: L('그리고', 'va', 'used to join similar ideas or items', 'и'),
    examples: [
      {
        english: 'I eat breakfast and lunch.',
        translations: L(
          '저는 아침과 점심을 먹어요.',
          'Men nonushta va tushlik qilaman.',
          'I eat breakfast and lunch.',
          'Я завтракаю и обедаю.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ænd/',
      ttsText: 'and',
    },
    tags: ['conjunction', 'unit2'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-conjunction-but',
    english: 'but',
    senseKey: 'joins-contrasting-ideas',
    partOfSpeech: WordPartOfSpeech.OTHER,
    meaning: L('하지만', 'lekin', 'used to join contrasting ideas', 'но'),
    examples: [
      {
        english: 'I sleep a lot, but I am tired.',
        translations: L(
          '저는 많이 자지만 피곤해요.',
          'Men ko‘p uxlayman, lekin charchaganman.',
          'I sleep a lot, but I am tired.',
          'Я много сплю, но устаю.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/bʌt/',
      ttsText: 'but',
    },
    tags: ['conjunction', 'unit2'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-conjunction-because',
    english: 'because',
    senseKey: 'gives-reason',
    partOfSpeech: WordPartOfSpeech.OTHER,
    meaning: L('~이기 때문에', 'chunki', 'used to give a reason', 'потому что'),
    examples: [
      {
        english: 'I am tired because I do not sleep enough.',
        translations: L(
          '저는 충분히 자지 않아서 피곤해요.',
          'Men yetarlicha uxlamaganim uchun charchaganman.',
          'I am tired because I do not sleep enough.',
          'Я устал, потому что недостаточно сплю.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/bɪˈkɒz/',
      ttsText: 'because',
    },
    tags: ['conjunction', 'reason', 'unit2'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-conjunction-or',
    english: 'or',
    senseKey: 'joins-alternatives',
    partOfSpeech: WordPartOfSpeech.OTHER,
    meaning: L(
      '또는',
      'yoki',
      'used to show alternatives or possibilities',
      'или',
    ),
    examples: [
      {
        english: 'Do you drink tea or coffee?',
        translations: L(
          '차 또는 커피를 마셔요?',
          'Choy yoki qahva ichasizmi?',
          'Do you drink tea or coffee?',
          'Вы пьёте чай или кофе?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɔː/',
      ttsText: 'or',
    },
    tags: ['conjunction', 'choice', 'unit2'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-conjunction-so',
    english: 'so',
    senseKey: 'shows-result',
    partOfSpeech: WordPartOfSpeech.OTHER,
    meaning: L('그래서', 'shuning uchun', 'used to show a result', 'поэтому'),
    examples: [
      {
        english: 'I am tired, so I go to bed early.',
        translations: L(
          '저는 피곤해서 일찍 자요.',
          'Men charchaganman, shuning uchun erta uxlayman.',
          'I am tired, so I go to bed early.',
          'Я устал, поэтому рано ложусь спать.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/səʊ/',
      ttsText: 'so',
    },
    tags: ['conjunction', 'result', 'unit2'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-body',
    english: 'body',
    senseKey: 'physical-human-body',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('몸', 'tana', 'the physical structure of a person', 'тело'),
    examples: [
      {
        english: 'Listen to your body.',
        translations: L(
          '자신의 몸에 귀를 기울이세요.',
          'Tanangizni tinglang.',
          'Listen to your body.',
          'Прислушивайтесь к своему телу.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈbɒdi/',
      ttsText: 'body',
    },
    tags: ['body', 'health', 'unit2'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-clock',
    english: 'clock',
    senseKey: 'device-or-system-for-time',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '시계',
      'soat',
      'something used to measure or show time',
      'часы',
    ),
    examples: [
      {
        english: 'Everyone has a different body clock.',
        translations: L(
          '사람마다 생체 시계가 달라요.',
          'Har kimning tana soati boshqacha.',
          'Everyone has a different body clock.',
          'У каждого человека свои биологические часы.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/klɒk/',
      ttsText: 'clock',
    },
    tags: ['time', 'body', 'unit2'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-meal',
    english: 'meal',
    senseKey: 'occasion-when-food-is-eaten',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('식사', 'ovqat', 'an occasion when you eat food', 'приём пищи'),
    examples: [
      {
        english: 'Some people eat three meals a day.',
        translations: L(
          '어떤 사람들은 하루에 세 끼를 먹어요.',
          'Ba’zi odamlar kuniga uch mahal ovqatlanadi.',
          'Some people eat three meals a day.',
          'Некоторые люди едят три раза в день.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/miːl/',
      ttsText: 'meal',
    },
    tags: ['food', 'routine', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-food',
    english: 'food',
    senseKey: 'things-people-eat',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('음식', 'ovqat', 'things that people eat', 'еда'),
    examples: [
      {
        english: 'Sleep and food are important.',
        translations: L(
          '수면과 음식은 중요해요.',
          'Uyqu va ovqat muhim.',
          'Sleep and food are important.',
          'Сон и питание важны.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/fuːd/',
      ttsText: 'food',
    },
    tags: ['food', 'health', 'unit2'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-tired',
    english: 'tired',
    senseKey: 'needing-rest',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('피곤한', 'charchagan', 'needing rest or sleep', 'уставший'),
    examples: [
      {
        english: 'I feel tired during the day.',
        translations: L(
          '저는 낮에 피곤함을 느껴요.',
          'Men kun davomida charchoq his qilaman.',
          'I feel tired during the day.',
          'Днём я чувствую усталость.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈtaɪəd/',
      ttsText: 'tired',
    },
    tags: ['health', 'body', 'unit2'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-hungry',
    english: 'hungry',
    senseKey: 'needing-food',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('배고픈', 'och', 'needing or wanting food', 'голодный'),
    examples: [
      {
        english: 'I feel hungry in the afternoon.',
        translations: L(
          '저는 오후에 배가 고파요.',
          'Men tushdan keyin och bo‘laman.',
          'I feel hungry in the afternoon.',
          'Днём я чувствую голод.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈhʌŋɡri/',
      ttsText: 'hungry',
    },
    tags: ['health', 'food', 'unit2'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-worried',
    english: 'worried',
    senseKey: 'anxious-about-something',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '걱정하는',
      'xavotirlangan',
      'feeling unhappy because you are thinking about a problem',
      'обеспокоенный',
    ),
    examples: [
      {
        english: 'I am worried about something.',
        translations: L(
          '저는 무언가가 걱정돼요.',
          'Men nimadandir xavotirdaman.',
          'I am worried about something.',
          'Я о чём-то беспокоюсь.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈwʌrid/',
      ttsText: 'worried',
    },
    tags: ['feelings', 'sleep', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-expert',
    english: 'expert',
    senseKey: 'person-with-special-knowledge',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '전문가',
      'mutaxassis',
      'a person with special knowledge or skill',
      'эксперт',
    ),
    examples: [
      {
        english: 'A sleep expert studies sleep.',
        translations: L(
          '수면 전문가는 수면을 연구해요.',
          'Uyqu bo‘yicha mutaxassis uyquni o‘rganadi.',
          'A sleep expert studies sleep.',
          'Специалист по сну изучает сон.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈekspɜːt/',
      ttsText: 'expert',
    },
    tags: ['people', 'health', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-adjective-healthy',
    english: 'healthy',
    senseKey: 'good-for-health',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '건강한',
      'sog‘lom',
      'in good health or good for your health',
      'здоровый',
    ),
    examples: [
      {
        english: 'A good routine can help you live a healthy life.',
        translations: L(
          '좋은 생활 습관은 건강하게 사는 데 도움이 돼요.',
          'Yaxshi tartib sog‘lom yashashga yordam beradi.',
          'A good routine can help you live a healthy life.',
          'Хороший режим помогает вести здоровый образ жизни.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈhelθi/',
      ttsText: 'healthy',
    },
    tags: ['health', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-life',
    english: 'life',
    senseKey: 'way-of-living',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('삶; 생활', 'hayot', 'the way a person lives', 'жизнь'),
    examples: [
      {
        english: 'You can live a healthier life.',
        translations: L(
          '더 건강한 삶을 살 수 있어요.',
          'Siz sog‘lomroq hayot kechirishingiz mumkin.',
          'You can live a healthier life.',
          'Вы можете вести более здоровую жизнь.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/laɪf/',
      ttsText: 'life',
    },
    tags: ['health', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-verb-agree',
    english: 'agree',
    senseKey: 'have-same-opinion',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '동의하다',
      'rozi bo‘lmoq',
      'to have the same opinion as someone',
      'соглашаться',
    ),
    examples: [
      {
        english: 'I agree with you.',
        translations: L(
          '저는 당신에게 동의해요.',
          'Men sizga qo‘shilaman.',
          'I agree with you.',
          'Я с вами согласен.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/əˈɡriː/',
      ttsText: 'agree',
    },
    tags: ['verb-preposition', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-verb-ask',
    english: 'ask',
    senseKey: 'request-information-or-thing',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '묻다; 요청하다',
      'so‘ramoq',
      'to request information or something you want',
      'спрашивать; просить',
    ),
    examples: [
      {
        english: 'Ask for help.',
        translations: L(
          '도움을 요청하세요.',
          'Yordam so‘rang.',
          'Ask for help.',
          'Попросите о помощи.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɑːsk/',
      ttsText: 'ask',
    },
    tags: ['verb-preposition', 'unit2'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-laugh',
    english: 'laugh',
    senseKey: 'make-sound-when-amused',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '웃다',
      'kulmoq',
      'to make a sound when something is funny',
      'смеяться',
    ),
    examples: [
      {
        english: 'Do not laugh at other people.',
        translations: L(
          '다른 사람들을 비웃지 마세요.',
          'Boshqa odamlarning ustidan kulmang.',
          'Do not laugh at other people.',
          'Не смейтесь над другими людьми.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/lɑːf/',
      ttsText: 'laugh',
    },
    tags: ['verb-preposition', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-verb-look',
    english: 'look',
    senseKey: 'direct-eyes-attention',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '보다; 찾다',
      'qaramoq; qidirmoq',
      'to direct your eyes or try to find something',
      'смотреть; искать',
    ),
    examples: [
      {
        english: 'Look at the clock.',
        translations: L(
          '시계를 보세요.',
          'Soatga qarang.',
          'Look at the clock.',
          'Посмотрите на часы.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/lʊk/',
      ttsText: 'look',
    },
    tags: ['verb-preposition', 'unit2'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-pay',
    english: 'pay',
    senseKey: 'give-money-for-something',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '지불하다',
      'to‘lamoq',
      'to give money for something',
      'платить',
    ),
    examples: [
      {
        english: 'We pay for our lunch.',
        translations: L(
          '우리는 점심값을 내요.',
          'Biz tushligimiz uchun to‘laymiz.',
          'We pay for our lunch.',
          'Мы платим за обед.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/peɪ/',
      ttsText: 'pay',
    },
    tags: ['verb-preposition', 'money', 'unit2'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-talk',
    english: 'talk',
    senseKey: 'speak-with-someone',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '이야기하다',
      'gaplashmoq',
      'to speak with someone',
      'разговаривать',
    ),
    examples: [
      {
        english: 'I talk to my family every day.',
        translations: L(
          '저는 매일 가족과 이야기해요.',
          'Men har kuni oilam bilan gaplashaman.',
          'I talk to my family every day.',
          'Я каждый день разговариваю с семьёй.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/tɔːk/',
      ttsText: 'talk',
    },
    tags: ['verb-preposition', 'unit2'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-think',
    english: 'think',
    senseKey: 'use-mind-to-consider',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '생각하다',
      'o‘ylamoq',
      'to use your mind to consider something',
      'думать',
    ),
    examples: [
      {
        english: 'Think about your answer.',
        translations: L(
          '답을 생각해 보세요.',
          'Javobingiz haqida o‘ylang.',
          'Think about your answer.',
          'Подумайте над ответом.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/θɪŋk/',
      ttsText: 'think',
    },
    tags: ['verb-preposition', 'unit2'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-wait',
    english: 'wait',
    senseKey: 'stay-until-something-happens',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '기다리다',
      'kutmoq',
      'to stay until someone arrives or something happens',
      'ждать',
    ),
    examples: [
      {
        english: 'We wait for the bus.',
        translations: L(
          '우리는 버스를 기다려요.',
          'Biz avtobusni kutamiz.',
          'We wait for the bus.',
          'Мы ждём автобус.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/weɪt/',
      ttsText: 'wait',
    },
    tags: ['verb-preposition', 'unit2'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-worry',
    english: 'worry',
    senseKey: 'feel-anxious',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '걱정하다',
      'xavotirlanmoq',
      'to feel anxious about something',
      'беспокоиться',
    ),
    examples: [
      {
        english: 'Do not worry about it.',
        translations: L(
          '그것을 걱정하지 마세요.',
          'Bu haqda xavotirlanmang.',
          'Do not worry about it.',
          'Не беспокойтесь об этом.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈwʌri/',
      ttsText: 'worry',
    },
    tags: ['verb-preposition', 'feelings', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-preposition-about',
    english: 'about',
    senseKey: 'concerning-topic',
    partOfSpeech: WordPartOfSpeech.OTHER,
    meaning: L(
      '~에 대해',
      'haqida',
      'concerning a particular subject',
      'о; об',
    ),
    examples: [
      {
        english: 'Think about it.',
        translations: L(
          '그것에 대해 생각해 보세요.',
          'Bu haqda o‘ylang.',
          'Think about it.',
          'Подумайте об этом.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/əˈbaʊt/',
      ttsText: 'about',
    },
    tags: ['preposition', 'unit2'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-preposition-at',
    english: 'at',
    senseKey: 'target-or-point',
    partOfSpeech: WordPartOfSpeech.OTHER,
    meaning: L(
      '~을 향해; ~에서',
      'da; ga',
      'used for a point, place or target',
      'в; на',
    ),
    examples: [
      {
        english: 'Look at the clock.',
        translations: L(
          '시계를 보세요.',
          'Soatga qarang.',
          'Look at the clock.',
          'Посмотрите на часы.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/æt/',
      ttsText: 'at',
    },
    tags: ['preposition', 'unit2'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-preposition-for',
    english: 'for',
    senseKey: 'purpose-or-receiver',
    partOfSpeech: WordPartOfSpeech.OTHER,
    meaning: L(
      '~을 위해; ~을',
      'uchun',
      'used to show purpose or what something is intended for',
      'для; за',
    ),
    examples: [
      {
        english: 'Wait for me.',
        translations: L(
          '저를 기다려 주세요.',
          'Meni kuting.',
          'Wait for me.',
          'Подождите меня.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/fɔː/',
      ttsText: 'for',
    },
    tags: ['preposition', 'unit2'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-preposition-to',
    english: 'to',
    senseKey: 'direction-or-receiver',
    partOfSpeech: WordPartOfSpeech.OTHER,
    meaning: L(
      '~에게; ~로',
      'ga',
      'used to show direction or the person receiving an action',
      'к',
    ),
    examples: [
      {
        english: 'Talk to your teacher.',
        translations: L(
          '선생님과 이야기하세요.',
          'O‘qituvchingiz bilan gaplashing.',
          'Talk to your teacher.',
          'Поговорите с учителем.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/tuː/',
      ttsText: 'to',
    },
    tags: ['preposition', 'unit2'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-preposition-with',
    english: 'with',
    senseKey: 'together-or-relation',
    partOfSpeech: WordPartOfSpeech.OTHER,
    meaning: L(
      '~와 함께; ~와',
      'bilan',
      'used to show connection or being together',
      'с',
    ),
    examples: [
      {
        english: 'I agree with you.',
        translations: L(
          '저는 당신에게 동의해요.',
          'Men sizga qo‘shilaman.',
          'I agree with you.',
          'Я с вами согласен.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/wɪð/',
      ttsText: 'with',
    },
    tags: ['preposition', 'unit2'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-news',
    english: 'news',
    senseKey: 'information-about-events',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '뉴스',
      'yangiliklar',
      'information about recent events',
      'новости',
    ),
    examples: [
      {
        english: 'I watch the news every morning.',
        translations: L(
          '저는 매일 아침 뉴스를 봐요.',
          'Men har kuni ertalab yangiliklarni ko‘raman.',
          'I watch the news every morning.',
          'Я каждое утро смотрю новости.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/njuːz/',
      ttsText: 'news',
    },
    tags: ['media', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-radio',
    english: 'radio',
    senseKey: 'audio-broadcast-medium',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '라디오',
      'radio',
      'a system for broadcasting sound programmes',
      'радио',
    ),
    examples: [
      {
        english: 'I listen to it on the radio.',
        translations: L(
          '저는 라디오에서 그것을 들어요.',
          'Men uni radioda tinglayman.',
          'I listen to it on the radio.',
          'Я слушаю это по радио.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈreɪdiəʊ/',
      ttsText: 'radio',
    },
    tags: ['media', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-discount',
    english: 'discount',
    senseKey: 'reduction-in-price',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('할인', 'chegirma', 'a reduction in the usual price', 'скидка'),
    examples: [
      {
        english: 'Students ask for a discount.',
        translations: L(
          '학생들은 할인을 요청해요.',
          'Talabalar chegirma so‘raydi.',
          'Students ask for a discount.',
          'Студенты просят скидку.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈdɪskaʊnt/',
      ttsText: 'discount',
    },
    tags: ['money', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-cash',
    english: 'cash',
    senseKey: 'physical-money',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('현금', 'naqd pul', 'money in coins and notes', 'наличные'),
    examples: [
      {
        english: 'We pay in cash.',
        translations: L(
          '우리는 현금으로 지불해요.',
          'Biz naqd pul bilan to‘laymiz.',
          'We pay in cash.',
          'Мы платим наличными.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/kæʃ/',
      ttsText: 'cash',
    },
    tags: ['money', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-reply',
    english: 'reply',
    senseKey: 'answer-to-message-or-question',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '답변; 회신',
      'javob',
      'an answer to a question or message',
      'ответ',
    ),
    examples: [
      {
        english: 'We have a reply from them.',
        translations: L(
          '그들에게서 답변이 왔어요.',
          'Ulardan javob keldi.',
          'We have a reply from them.',
          'Мы получили от них ответ.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/rɪˈplaɪ/',
      ttsText: 'reply',
    },
    tags: ['communication', 'unit2'],
    difficulty: 2,
    isCore: true,
  },
];

export const EN_S2_UNIT2_NODE3_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · and / but / because / or / so
  // ===========================================================

  en_s2u2_n3_001_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'and',
        native: 'va',
        nativeI18n: L('그리고', 'va', 'and', 'и'),
      },
      {
        text: 'but',
        native: 'lekin',
        nativeI18n: L('하지만', 'lekin', 'but', 'но'),
      },
      {
        text: 'because',
        native: 'chunki',
        nativeI18n: L('왜냐하면', 'chunki', 'because', 'потому что'),
      },
      {
        text: 'or',
        native: 'yoki',
        nativeI18n: L('또는', 'yoki', 'or', 'или'),
      },
      {
        text: 'so',
        native: 'shuning uchun',
        nativeI18n: L('그래서', 'shuning uchun', 'so', 'поэтому'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['conjunctions'],
  },

  en_s2u2_n3_002_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I have breakfast ___ lunch.',
    blankAnswers: ['and'],
    options: ['and', 'but', 'because', 'or', 'so'],
    answer: 'and',
    answerTranslation: L(
      '저는 아침과 점심을 먹어요.',
      'Men nonushta va tushlik qilaman.',
      'I have breakfast and lunch.',
      'Я завтракаю и обедаю.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['conjunctions', 'and'],
  },

  en_s2u2_n3_003_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I sleep a lot, ___ I still feel tired.',
    blankAnswers: ['but'],
    options: ['but', 'and', 'because', 'or', 'so'],
    answer: 'but',
    answerTranslation: L(
      '저는 많이 자지만 여전히 피곤해요.',
      'Men ko‘p uxlayman, lekin baribir charchayman.',
      'I sleep a lot, but I still feel tired.',
      'Я много сплю, но всё равно чувствую усталость.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['conjunctions', 'but'],
  },

  en_s2u2_n3_004_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I wake up at night ___ I am worried.',
    blankAnswers: ['because'],
    options: ['because', 'so', 'and', 'or', 'but'],
    answer: 'because',
    answerTranslation: L(
      '저는 걱정이 있어서 밤에 깨요.',
      'Men xavotirlanganim uchun kechasi uyg‘onaman.',
      'I wake up at night because I am worried.',
      'Я просыпаюсь ночью, потому что беспокоюсь.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['conjunctions', 'because'],
  },

  en_s2u2_n3_005_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Do you drink tea ___ coffee?',
    blankAnswers: ['or'],
    options: ['or', 'and', 'so', 'because', 'but'],
    answer: 'or',
    answerTranslation: L(
      '차나 커피를 마셔요?',
      'Choy yoki qahva ichasizmi?',
      'Do you drink tea or coffee?',
      'Вы пьёте чай или кофе?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['conjunctions', 'or'],
  },

  en_s2u2_n3_006_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I am tired, ___ I go to bed early.',
    blankAnswers: ['so'],
    options: ['so', 'because', 'but', 'and', 'or'],
    answer: 'so',
    answerTranslation: L(
      '저는 피곤해서 일찍 자요.',
      'Men charchaganman, shuning uchun erta uxlayman.',
      'I am tired, so I go to bed early.',
      'Я устал, поэтому рано ложусь спать.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['conjunctions', 'so'],
  },

  en_s2u2_n3_007_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I wake up early ___ I go to bed early.',
    blankAnswers: ['because'],
    options: ['because', 'or', 'but', 'and', 'so'],
    answer: 'because',
    answerTranslation: L(
      '저는 일찍 자기 때문에 일찍 일어나요.',
      'Men erta uxlaganim uchun erta turaman.',
      'I wake up early because I go to bed early.',
      'Я рано встаю, потому что рано ложусь спать.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['conjunctions', 'reason'],
  },

  en_s2u2_n3_008_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'People are different, ___ there is no perfect time to sleep.',
    blankAnswers: ['so'],
    options: ['so', 'because', 'or', 'and', 'but'],
    answer: 'so',
    answerTranslation: L(
      '사람마다 다르기 때문에 완벽한 수면 시간은 없어요.',
      'Odamlar har xil, shuning uchun uxlash uchun mukammal vaqt yo‘q.',
      'People are different, so there is no perfect time to sleep.',
      'Люди разные, поэтому идеального времени для сна нет.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['conjunctions', 'result'],
  },

  en_s2u2_n3_009_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Why do you go to bed early?' }],
    options: [
      'Because I get up early.',
      'So I get up early.',
      'Or I get up early.',
      'But I get up early.',
    ],
    answer: 'Because I get up early.',
    answerTranslation: L(
      '일찍 일어나기 때문이에요.',
      'Chunki men erta turaman.',
      'Because I get up early.',
      'Потому что я рано встаю.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['conjunctions', 'because'],
  },

  en_s2u2_n3_010_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'I’m very tired.',
    options: ['go', 'to', 'bed', 'early', 'so', 'you'],
    answer: 'So go to bed early',
    answerTranslation: L(
      '그럼 일찍 자세요.',
      'Unda erta uxlang.',
      'So go to bed early.',
      'Тогда ложитесь спать пораньше.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['conjunctions', 'so'],
  },

  en_s2u2_n3_011_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['tired', 'but', 'sleep', 'I', 'well', 'feel'],
    answer: 'I sleep well but feel tired',
    audioText: 'I sleep well but feel tired.',
    answerTranslation: L(
      '저는 잘 자지만 피곤해요.',
      'Men yaxshi uxlayman, lekin charchayman.',
      'I sleep well but feel tired.',
      'Я хорошо сплю, но чувствую усталость.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['conjunctions', 'but'],
  },

  en_s2u2_n3_012_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['tea', 'coffee', 'or', 'Do', 'drink', 'you', 'and'],
    answer: 'Do you drink tea or coffee',
    answerTranslation: L(
      '차나 커피를 마셔요?',
      'Choy yoki qahva ichasizmi?',
      'Do you drink tea or coffee?',
      'Вы пьёте чай или кофе?',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['conjunctions', 'or'],
  },

  en_s2u2_n3_013_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'I am hungry, so I have lunch.',
    audioText: 'I am hungry, so I have lunch.',
    answerI18n: L(
      '저는 배가 고파서 점심을 먹어요',
      'Men ochman, shuning uchun tushlik qilaman',
      'I am hungry, so I have lunch',
      'Я голоден, поэтому обедаю',
    ),
    options: ['I', 'am', 'hungry,', 'so', 'have', 'lunch.', 'because'],
    optionsI18n: {
      ko: ['저는', '배가', '고파서', '점심을', '먹어요'],
      uz: ['Men', 'ochman', 'shuning', 'uchun', 'tushlik', 'qilaman'],
      en: ['I', 'am', 'hungry,', 'so', 'I', 'have', 'lunch.'],
      ru: ['Я', 'голоден,', 'поэтому', 'обедаю'],
    },
    answerTranslation: L(
      '저는 배가 고파서 점심을 먹어요.',
      'Men ochman, shuning uchun tushlik qilaman.',
      'I am hungry, so I have lunch.',
      'Я голоден, поэтому обедаю.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['conjunctions', 'so'],
  },

  en_s2u2_n3_014_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I am tired ',
    sentenceSuffix: ' I do not sleep enough.',
    answer: 'because',
    answerTranslation: L(
      '저는 충분히 자지 않아서 피곤해요.',
      'Men yetarlicha uxlamaganim uchun charchaganman.',
      'I am tired because I do not sleep enough.',
      'Я устал, потому что недостаточно сплю.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Use because to introduce the reason.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: true,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['conjunctions', 'typing'],
  },

  en_s2u2_n3_015_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I am tired, ',
    sentenceSuffix: ' I go to bed early.',
    answer: 'so',
    answerTranslation: L(
      '저는 피곤해서 일찍 자요.',
      'Men charchaganman, shuning uchun erta uxlayman.',
      'I am tired, so I go to bed early.',
      'Я устал, поэтому рано ложусь спать.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Use so to introduce the result.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: true,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['conjunctions', 'typing'],
  },

  en_s2u2_n3_016_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I sleep well, but I sometimes feel tired.',
    audioText: 'I sleep well, but I sometimes feel tired.',
    answerTranslation: L(
      '저는 잘 자지만 가끔 피곤해요.',
      'Men yaxshi uxlayman, lekin ba’zan charchayman.',
      'I sleep well, but I sometimes feel tired.',
      'Я хорошо сплю, но иногда чувствую усталость.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['conjunctions', 'but'],
  },

  en_s2u2_n3_017_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I have breakfast and then I go to work.',
    audioText: 'I have breakfast and then I go to work.',
    answerTranslation: L(
      '저는 아침을 먹고 출근해요.',
      'Men nonushta qilaman va keyin ishga boraman.',
      'I have breakfast and then I go to work.',
      'Я завтракаю, а затем иду на работу.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['conjunctions', 'and'],
  },

  en_s2u2_n3_018_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I am hungry because I do not eat breakfast.',
    audioText: 'I am hungry because I do not eat breakfast.',
    answerTranslation: L(
      '저는 아침을 먹지 않아서 배가 고파요.',
      'Men nonushta qilmaganim uchun ochman.',
      'I am hungry because I do not eat breakfast.',
      'Я голоден, потому что не завтракаю.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['conjunctions', 'because'],
  },

  en_s2u2_n3_019_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Would you like tea ___ coffee?',
    blankAnswers: ['or'],
    options: ['or', 'because', 'so', 'but', 'and'],
    answer: 'or',
    answerTranslation: L(
      '차 또는 커피를 원하세요?',
      'Choy yoki qahva xohlaysizmi?',
      'Would you like tea or coffee?',
      'Хотите чай или кофе?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['conjunctions', 'or'],
  },

  en_s2u2_n3_020_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'And joins ideas, but shows contrast, because gives a reason, or gives a choice, and so shows a result.',
    audioText:
      'And joins ideas, but shows contrast, because gives a reason, or gives a choice, and so shows a result.',
    answerTranslation: L(
      'and는 내용을 연결하고, but은 대조를 나타내며, because는 이유, or는 선택, so는 결과를 나타내요.',
      'And fikrlarni bog‘laydi, but qarama-qarshilikni, because sababni, or tanlovni va so natijani bildiradi.',
      'And joins ideas, but shows contrast, because gives a reason, or gives a choice, and so shows a result.',
      'And соединяет идеи, but показывает противопоставление, because — причину, or — выбор, а so — результат.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['conjunctions', 'review'],
  },

  // ===========================================================
  // Lesson 2 · Know your body clock
  // ===========================================================

  en_s2u2_n3_021_word_matching: {
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
        text: 'tired',
        native: 'charchagan',
        nativeI18n: L('피곤한', 'charchagan', 'tired', 'уставший'),
      },
      {
        text: 'hungry',
        native: 'och',
        nativeI18n: L('배고픈', 'och', 'hungry', 'голодный'),
      },
      {
        text: 'expert',
        native: 'mutaxassis',
        nativeI18n: L('전문가', 'mutaxassis', 'expert', 'эксперт'),
      },
      {
        text: 'healthy',
        native: 'sog‘lom',
        nativeI18n: L('건강한', 'sog‘lom', 'healthy', 'здоровый'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['body-clock', 'health'],
  },

  en_s2u2_n3_022_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Many people get enough sleep ___ still feel tired.',
    blankAnswers: ['but'],
    options: ['but', 'because', 'or', 'so', 'and'],
    answer: 'but',
    answerTranslation: L(
      '많은 사람들은 충분히 자지만 여전히 피곤해요.',
      'Ko‘p odamlar yetarlicha uxlaydi, lekin baribir charchaydi.',
      'Many people get enough sleep but still feel tired.',
      'Многие достаточно спят, но всё равно чувствуют усталость.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['body-clock', 'conjunctions'],
  },

  en_s2u2_n3_023_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'People can feel tired ___ they sleep at the wrong time.',
    blankAnswers: ['because'],
    options: ['because', 'so', 'but', 'or', 'and'],
    answer: 'because',
    answerTranslation: L(
      '사람들은 잘못된 시간에 자서 피곤할 수 있어요.',
      'Odamlar noto‘g‘ri vaqtda uxlagani uchun charchashi mumkin.',
      'People can feel tired because they sleep at the wrong time.',
      'Люди могут уставать, потому что спят не в то время.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['body-clock', 'sleep'],
  },

  en_s2u2_n3_024_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Everyone’s body clock is ___.',
    blankAnswers: ['different'],
    options: ['different', 'hungry', 'tired', 'wrong'],
    answer: 'different',
    answerTranslation: L(
      '사람마다 생체 시계가 달라요.',
      'Har kimning tana soati boshqacha.',
      'Everyone’s body clock is different.',
      'Биологические часы у всех разные.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['body-clock'],
  },

  en_s2u2_n3_025_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Is there one perfect time for everyone to sleep?',
      },
    ],
    options: [
      'No, everyone’s body clock is different.',
      'Yes, everybody sleeps at the same time.',
      'Yes, because everyone is the same.',
      'No, people never need sleep.',
    ],
    answer: 'No, everyone’s body clock is different.',
    answerTranslation: L(
      '아니요. 사람마다 생체 시계가 달라요.',
      'Yo‘q. Har kimning tana soati boshqacha.',
      'No, everyone’s body clock is different.',
      'Нет. Биологические часы у всех разные.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['body-clock', 'reading'],
  },

  en_s2u2_n3_026_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'It is important to think about what time you ___.',
    blankAnswers: ['eat'],
    options: ['eat', 'listen', 'wait', 'laugh'],
    answer: 'eat',
    answerTranslation: L(
      '몇 시에 먹는지 생각하는 것이 중요해요.',
      'Qachon ovqatlanishingiz haqida o‘ylash muhim.',
      'It is important to think about what time you eat.',
      'Важно думать о том, в какое время вы едите.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['body-clock', 'meals'],
  },

  en_s2u2_n3_027_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Breakfast is an important ___.',
    blankAnswers: ['meal'],
    options: ['meal', 'expert', 'clock', 'reply'],
    answer: 'meal',
    answerTranslation: L(
      '아침 식사는 중요한 식사예요.',
      'Nonushta muhim ovqat.',
      'Breakfast is an important meal.',
      'Завтрак — важный приём пищи.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['body-clock', 'meal'],
  },

  en_s2u2_n3_028_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['your', 'Listen', 'body', 'to', 'clock', 'for'],
    answer: 'Listen to your body clock',
    audioText: 'Listen to your body clock.',
    answerTranslation: L(
      '자신의 생체 시계에 귀를 기울이세요.',
      'Tana soatingizni tinglang.',
      'Listen to your body clock.',
      'Прислушивайтесь к своим биологическим часам.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['body-clock', 'listen-to'],
  },

  en_s2u2_n3_029_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['live', 'healthier', 'a', 'can', 'life', 'You', 'healthy'],
    answer: 'You can live a healthier life',
    answerTranslation: L(
      '더 건강한 삶을 살 수 있어요.',
      'Siz sog‘lomroq hayot kechirishingiz mumkin.',
      'You can live a healthier life.',
      'Вы можете вести более здоровую жизнь.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['body-clock', 'healthy'],
  },

  en_s2u2_n3_030_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'I feel tired and hungry during the day.',
    audioText: 'I feel tired and hungry during the day.',
    answerI18n: L(
      '저는 낮에 피곤하고 배가 고파요',
      'Men kun davomida charchagan va och bo‘laman',
      'I feel tired and hungry during the day',
      'Днём я чувствую усталость и голод',
    ),
    options: ['I', 'feel', 'tired', 'and', 'hungry', 'during', 'the', 'day.'],
    optionsI18n: {
      ko: ['저는', '낮에', '피곤하고', '배가', '고파요'],
      uz: ['Men', 'kun', 'davomida', 'charchagan', 'va', 'och', 'bo‘laman'],
      en: ['I', 'feel', 'tired', 'and', 'hungry', 'during', 'the', 'day.'],
      ru: ['Днём', 'я', 'чувствую', 'усталость', 'и', 'голод'],
    },
    answerTranslation: L(
      '저는 낮에 피곤하고 배가 고파요.',
      'Men kun davomida charchagan va och bo‘laman.',
      'I feel tired and hungry during the day.',
      'Днём я чувствую усталость и голод.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['body-clock', 'health'],
  },

  en_s2u2_n3_031_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Why are you tired in the morning?' },
    ],
    options: [
      'Because I don’t get enough sleep.',
      'So I don’t get enough sleep.',
      'Or I don’t get enough sleep.',
      'And I don’t get enough sleep.',
    ],
    answer: 'Because I don’t get enough sleep.',
    answerTranslation: L(
      '충분히 자지 못하기 때문이에요.',
      'Chunki men yetarlicha uxlamayman.',
      'Because I don’t get enough sleep.',
      'Потому что я недостаточно сплю.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['body-clock', 'because'],
  },

  en_s2u2_n3_032_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'I’m always tired in the morning.',
    options: ['Think', 'about', 'your', 'body', 'clock', 'for'],
    answer: 'Think about your body clock',
    answerTranslation: L(
      '자신의 생체 시계에 대해 생각해 보세요.',
      'Tana soatingiz haqida o‘ylab ko‘ring.',
      'Think about your body clock.',
      'Подумайте о своих биологических часах.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['body-clock', 'think-about'],
  },

  en_s2u2_n3_033_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A sleep ___ knows a lot about sleep.',
    blankAnswers: ['expert'],
    options: ['expert', 'meal', 'reply', 'discount'],
    answer: 'expert',
    answerTranslation: L(
      '수면 전문가는 수면에 대해 많이 알아요.',
      'Uyqu mutaxassisi uyqu haqida ko‘p biladi.',
      'A sleep expert knows a lot about sleep.',
      'Специалист по сну много знает о сне.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['body-clock', 'expert'],
  },

  en_s2u2_n3_034_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'A good routine can help you live a ',
    sentenceSuffix: ' life.',
    answer: 'healthy',
    answerTranslation: L(
      '좋은 생활 습관은 건강한 삶에 도움이 돼요.',
      'Yaxshi tartib sog‘lom hayot kechirishga yordam beradi.',
      'A good routine can help you live a healthy life.',
      'Хороший режим помогает вести здоровую жизнь.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Use the adjective healthy.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: true,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['body-clock', 'typing'],
  },

  en_s2u2_n3_035_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Everyone has a different body clock.',
    audioText: 'Everyone has a different body clock.',
    answerTranslation: L(
      '사람마다 생체 시계가 달라요.',
      'Har kimning tana soati boshqacha.',
      'Everyone has a different body clock.',
      'У каждого свои биологические часы.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['body-clock'],
  },

  en_s2u2_n3_036_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'It is important to think about when you sleep and eat.',
    audioText: 'It is important to think about when you sleep and eat.',
    answerTranslation: L(
      '언제 자고 먹는지 생각하는 것이 중요해요.',
      'Qachon uxlashingiz va ovqatlanishingiz haqida o‘ylash muhim.',
      'It is important to think about when you sleep and eat.',
      'Важно думать о том, когда вы спите и едите.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['body-clock', 'routine'],
  },

  en_s2u2_n3_037_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'If you listen to your body clock, you can live a ___ life.',
    blankAnswers: ['healthier'],
    options: ['healthier', 'hungrier', 'later', 'tireder'],
    answer: 'healthier',
    answerTranslation: L(
      '생체 시계에 귀를 기울이면 더 건강하게 살 수 있어요.',
      'Tana soatingizni tinglasangiz, sog‘lomroq yashashingiz mumkin.',
      'If you listen to your body clock, you can live a healthier life.',
      'Если прислушиваться к биологическим часам, можно жить здоровее.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['body-clock', 'healthy'],
  },

  en_s2u2_n3_038_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I sometimes wake up because I am worried.',
    audioText: 'I sometimes wake up because I am worried.',
    answerTranslation: L(
      '저는 가끔 걱정이 있어서 잠에서 깨요.',
      'Men ba’zan xavotirlanganim uchun uyg‘onaman.',
      'I sometimes wake up because I am worried.',
      'Я иногда просыпаюсь, потому что беспокоюсь.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['body-clock', 'worried'],
  },

  en_s2u2_n3_039_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'There is no perfect time to sleep because people are different.',
    audioText:
      'There is no perfect time to sleep because people are different.',
    answerTranslation: L(
      '사람마다 다르기 때문에 완벽한 수면 시간은 없어요.',
      'Odamlar har xil bo‘lgani uchun uxlash uchun mukammal vaqt yo‘q.',
      'There is no perfect time to sleep because people are different.',
      'Идеального времени для сна нет, потому что люди разные.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['body-clock', 'reading'],
  },

  en_s2u2_n3_040_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Listen to your body clock and think about when you sleep and eat.',
    audioText:
      'Listen to your body clock and think about when you sleep and eat.',
    answerTranslation: L(
      '자신의 생체 시계에 귀를 기울이고 언제 자고 먹는지 생각하세요.',
      'Tana soatingizni tinglang va qachon uxlashingiz hamda ovqatlanishingiz haqida o‘ylang.',
      'Listen to your body clock and think about when you sleep and eat.',
      'Прислушивайтесь к биологическим часам и думайте о том, когда вы спите и едите.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['body-clock', 'review'],
  },

  // ===========================================================
  // Lesson 3 · Verb + preposition
  // ===========================================================

  en_s2u2_n3_041_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '동사와 함께 사용하는 전치사를 연결하세요.',
      'Fe’l bilan ishlatiladigan predlogni moslang.',
      'Match each verb with its preposition.',
      'Соедините глагол с предлогом.',
    ),
    pairs: [
      {
        text: 'agree',
        native: 'with',
        nativeI18n: L('with', 'with', 'with', 'with'),
      },
      {
        text: 'ask',
        native: 'for',
        nativeI18n: L('for', 'for', 'for', 'for'),
      },
      {
        text: 'laugh',
        native: 'at',
        nativeI18n: L('at', 'at', 'at', 'at'),
      },
      {
        text: 'listen',
        native: 'to',
        nativeI18n: L('to', 'to', 'to', 'to'),
      },
      {
        text: 'think',
        native: 'about',
        nativeI18n: L('about', 'about', 'about', 'about'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['verb-preposition'],
  },

  en_s2u2_n3_042_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '동사와 함께 사용하는 전치사를 연결하세요.',
      'Fe’l bilan ishlatiladigan predlogni moslang.',
      'Match each verb with its preposition.',
      'Соедините глагол с предлогом.',
    ),
    pairs: [
      {
        text: 'pay',
        native: 'for',
        nativeI18n: L('for', 'for', 'for', 'for'),
      },
      {
        text: 'talk',
        native: 'to',
        nativeI18n: L('to', 'to', 'to', 'to'),
      },
      {
        text: 'wait',
        native: 'for',
        nativeI18n: L('for', 'for', 'for', 'for'),
      },
      {
        text: 'worry',
        native: 'about',
        nativeI18n: L('about', 'about', 'about', 'about'),
      },
      {
        text: 'look',
        native: 'at',
        nativeI18n: L('at', 'at', 'at', 'at'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['verb-preposition'],
  },

  en_s2u2_n3_043_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I agree ___ you.',
    blankAnswers: ['with'],
    options: ['with', 'to', 'for', 'at', 'about'],
    answer: 'with',
    answerTranslation: L(
      '저는 당신에게 동의해요.',
      'Men sizga qo‘shilaman.',
      'I agree with you.',
      'Я с вами согласен.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['verb-preposition', 'agree-with'],
  },

  en_s2u2_n3_044_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Ask ___ help.',
    blankAnswers: ['for'],
    options: ['for', 'with', 'at', 'to', 'about'],
    answer: 'for',
    answerTranslation: L(
      '도움을 요청하세요.',
      'Yordam so‘rang.',
      'Ask for help.',
      'Попросите о помощи.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['verb-preposition', 'ask-for'],
  },

  en_s2u2_n3_045_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Do not laugh ___ other people.',
    blankAnswers: ['at'],
    options: ['at', 'for', 'to', 'with', 'about'],
    answer: 'at',
    answerTranslation: L(
      '다른 사람들을 비웃지 마세요.',
      'Boshqa odamlarning ustidan kulmang.',
      'Do not laugh at other people.',
      'Не смейтесь над другими людьми.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['verb-preposition', 'laugh-at'],
  },

  en_s2u2_n3_046_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I listen ___ the radio.',
    blankAnswers: ['to'],
    options: ['to', 'at', 'with', 'about', 'for'],
    answer: 'to',
    answerTranslation: L(
      '저는 라디오를 들어요.',
      'Men radio tinglayman.',
      'I listen to the radio.',
      'Я слушаю радио.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['verb-preposition', 'listen-to'],
  },

  en_s2u2_n3_047_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Look ___ the clock.',
    blankAnswers: ['at'],
    options: ['at', 'for', 'with', 'to', 'about'],
    answer: 'at',
    answerTranslation: L(
      '시계를 보세요.',
      'Soatga qarang.',
      'Look at the clock.',
      'Посмотрите на часы.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['verb-preposition', 'look-at'],
  },

  en_s2u2_n3_048_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Are you looking ___ your keys?',
    blankAnswers: ['for'],
    options: ['for', 'at', 'with', 'to', 'about'],
    answer: 'for',
    answerTranslation: L(
      '열쇠를 찾고 있어요?',
      'Kalitlaringizni qidiryapsizmi?',
      'Are you looking for your keys?',
      'Вы ищете свои ключи?',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['verb-preposition', 'look-for'],
  },

  en_s2u2_n3_049_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Do you pay ___ lunch at work?',
    blankAnswers: ['for'],
    options: ['for', 'to', 'at', 'with', 'about'],
    answer: 'for',
    answerTranslation: L(
      '직장에서 점심값을 내요?',
      'Ishda tushlik uchun pul to‘laysizmi?',
      'Do you pay for lunch at work?',
      'Вы платите за обед на работе?',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['verb-preposition', 'pay-for'],
  },

  en_s2u2_n3_050_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I want to talk ___ you.',
    blankAnswers: ['to'],
    options: ['to', 'for', 'at', 'with', 'about'],
    answer: 'to',
    answerTranslation: L(
      '당신과 이야기하고 싶어요.',
      'Men siz bilan gaplashmoqchiman.',
      'I want to talk to you.',
      'Я хочу поговорить с вами.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['verb-preposition', 'talk-to'],
  },

  en_s2u2_n3_051_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Think ___ your answer.',
    blankAnswers: ['about'],
    options: ['about', 'at', 'to', 'for', 'with'],
    answer: 'about',
    answerTranslation: L(
      '답에 대해 생각해 보세요.',
      'Javobingiz haqida o‘ylang.',
      'Think about your answer.',
      'Подумайте над ответом.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['verb-preposition', 'think-about'],
  },

  en_s2u2_n3_052_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'We wait ___ the bus.',
    blankAnswers: ['for'],
    options: ['for', 'at', 'about', 'with', 'to'],
    answer: 'for',
    answerTranslation: L(
      '우리는 버스를 기다려요.',
      'Biz avtobusni kutamiz.',
      'We wait for the bus.',
      'Мы ждём автобус.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['verb-preposition', 'wait-for'],
  },

  en_s2u2_n3_053_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Do not worry ___ it.',
    blankAnswers: ['about'],
    options: ['about', 'with', 'at', 'to', 'for'],
    answer: 'about',
    answerTranslation: L(
      '그것을 걱정하지 마세요.',
      'Bu haqda xavotirlanmang.',
      'Do not worry about it.',
      'Не беспокойтесь об этом.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['verb-preposition', 'worry-about'],
  },

  en_s2u2_n3_054_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['family', 'to', 'I', 'my', 'talk', 'for'],
    answer: 'I talk to my family',
    audioText: 'I talk to my family.',
    answerTranslation: L(
      '저는 가족과 이야기해요.',
      'Men oilam bilan gaplashaman.',
      'I talk to my family.',
      'Я разговариваю со своей семьёй.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['verb-preposition', 'talk-to'],
  },

  en_s2u2_n3_055_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['help', 'for', 'They', 'ask', 'about', 'at'],
    answer: 'They ask for help',
    answerTranslation: L(
      '그들은 도움을 요청해요.',
      'Ular yordam so‘raydi.',
      'They ask for help.',
      'Они просят о помощи.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['verb-preposition', 'ask-for'],
  },

  en_s2u2_n3_056_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'She worries about her family.',
    audioText: 'She worries about her family.',
    answerI18n: L(
      '그녀는 가족을 걱정해요',
      'U oilasi haqida xavotirlanadi',
      'She worries about her family',
      'Она беспокоится о своей семье',
    ),
    options: ['She', 'worries', 'about', 'her', 'family.', 'for', 'at'],
    optionsI18n: {
      ko: ['그녀는', '가족을', '걱정해요'],
      uz: ['U', 'oilasi', 'haqida', 'xavotirlanadi'],
      en: ['She', 'worries', 'about', 'her', 'family.'],
      ru: ['Она', 'беспокоится', 'о', 'своей', 'семье'],
    },
    answerTranslation: L(
      '그녀는 가족을 걱정해요.',
      'U oilasi haqida xavotirlanadi.',
      'She worries about her family.',
      'Она беспокоится о своей семье.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['verb-preposition', 'worry-about'],
  },

  en_s2u2_n3_057_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'I think it’s a good idea.' }],
    options: [
      'I agree with you.',
      'I agree to you.',
      'I agree for you.',
      'I agree at you.',
    ],
    answer: 'I agree with you.',
    answerTranslation: L(
      '저도 동의해요.',
      'Men sizga qo‘shilaman.',
      'I agree with you.',
      'Я с вами согласен.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['verb-preposition', 'agree-with'],
  },

  en_s2u2_n3_058_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'I don’t understand this.' }],
    options: [
      'Ask for help.',
      'Ask at help.',
      'Ask with help.',
      'Ask about help for.',
    ],
    answer: 'Ask for help.',
    answerTranslation: L(
      '도움을 요청하세요.',
      'Yordam so‘rang.',
      'Ask for help.',
      'Попросите о помощи.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['verb-preposition', 'ask-for'],
  },

  en_s2u2_n3_059_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I listen to music and talk to my friends.',
    audioText: 'I listen to music and talk to my friends.',
    answerTranslation: L(
      '저는 음악을 듣고 친구들과 이야기해요.',
      'Men musiqa tinglayman va do‘stlarim bilan gaplashaman.',
      'I listen to music and talk to my friends.',
      'Я слушаю музыку и разговариваю с друзьями.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['verb-preposition', 'review'],
  },

  en_s2u2_n3_060_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I wait for the bus and think about my day.',
    audioText: 'I wait for the bus and think about my day.',
    answerTranslation: L(
      '저는 버스를 기다리며 하루에 대해 생각해요.',
      'Men avtobusni kutaman va kunim haqida o‘ylayman.',
      'I wait for the bus and think about my day.',
      'Я жду автобус и думаю о своём дне.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['verb-preposition', 'review'],
  },

  // ===========================================================
  // Lesson 4 · Verb + preposition & conjunction review
  // ===========================================================

  en_s2u2_n3_061_word_matching: {
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
        text: 'radio',
        native: 'radio',
        nativeI18n: L('라디오', 'radio', 'radio', 'радио'),
      },
      {
        text: 'discount',
        native: 'chegirma',
        nativeI18n: L('할인', 'chegirma', 'discount', 'скидка'),
      },
      {
        text: 'cash',
        native: 'naqd pul',
        nativeI18n: L('현금', 'naqd pul', 'cash', 'наличные'),
      },
      {
        text: 'reply',
        native: 'javob',
        nativeI18n: L('답변', 'javob', 'reply', 'ответ'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['verb-preposition', 'review'],
  },

  en_s2u2_n3_062_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I watch the ___ on TV every morning.',
    blankAnswers: ['news'],
    options: ['news', 'cash', 'discount', 'reply'],
    answer: 'news',
    answerTranslation: L(
      '저는 매일 아침 TV 뉴스를 봐요.',
      'Men har kuni ertalab televizorda yangiliklarni ko‘raman.',
      'I watch the news on TV every morning.',
      'Я каждое утро смотрю новости по телевизору.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['news'],
  },

  en_s2u2_n3_063_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I listen to it on the ___.',
    blankAnswers: ['radio'],
    options: ['radio', 'discount', 'reply', 'cash'],
    answer: 'radio',
    answerTranslation: L(
      '저는 그것을 라디오에서 들어요.',
      'Men uni radioda tinglayman.',
      'I listen to it on the radio.',
      'Я слушаю это по радио.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['radio', 'listen-to'],
  },

  en_s2u2_n3_064_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Students ask for a ___.',
    blankAnswers: ['discount'],
    options: ['discount', 'cash', 'radio', 'reply'],
    answer: 'discount',
    answerTranslation: L(
      '학생들은 할인을 요청해요.',
      'Talabalar chegirma so‘raydi.',
      'Students ask for a discount.',
      'Студенты просят скидку.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['discount', 'ask-for'],
  },

  en_s2u2_n3_065_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'We pay in ___.',
    blankAnswers: ['cash'],
    options: ['cash', 'reply', 'news', 'radio'],
    answer: 'cash',
    answerTranslation: L(
      '우리는 현금으로 지불해요.',
      'Biz naqd pul bilan to‘laymiz.',
      'We pay in cash.',
      'Мы платим наличными.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['cash', 'pay'],
  },

  en_s2u2_n3_066_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'We have a ___ from them.',
    blankAnswers: ['reply'],
    options: ['reply', 'cash', 'news', 'discount'],
    answer: 'reply',
    answerTranslation: L(
      '그들에게서 답변이 왔어요.',
      'Ulardan javob keldi.',
      'We have a reply from them.',
      'Мы получили от них ответ.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['reply'],
  },

  en_s2u2_n3_067_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I listen ___ the news on the radio.',
    blankAnswers: ['to'],
    options: ['to', 'for', 'with', 'at', 'about'],
    answer: 'to',
    answerTranslation: L(
      '저는 라디오 뉴스를 들어요.',
      'Men radioda yangiliklarni tinglayman.',
      'I listen to the news on the radio.',
      'Я слушаю новости по радио.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['listen-to', 'news'],
  },

  en_s2u2_n3_068_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I am worried ___ my family.',
    blankAnswers: ['about'],
    options: ['about', 'to', 'at', 'for', 'with'],
    answer: 'about',
    answerTranslation: L(
      '저는 가족이 걱정돼요.',
      'Men oilam haqida xavotirdaman.',
      'I am worried about my family.',
      'Я беспокоюсь о своей семье.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['worry-about'],
  },

  en_s2u2_n3_069_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I am tired ___ I go to bed early.',
    blankAnswers: ['so'],
    options: ['so', 'because', 'but', 'or', 'and'],
    answer: 'so',
    answerTranslation: L(
      '저는 피곤해서 일찍 자요.',
      'Men charchaganman, shuning uchun erta uxlayman.',
      'I am tired, so I go to bed early.',
      'Я устал, поэтому рано ложусь спать.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['conjunctions', 'review'],
  },

  en_s2u2_n3_070_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I sleep for a long time, ___ I still feel tired.',
    blankAnswers: ['but'],
    options: ['but', 'so', 'because', 'and', 'or'],
    answer: 'but',
    answerTranslation: L(
      '저는 오래 자지만 여전히 피곤해요.',
      'Men uzoq uxlayman, lekin baribir charchayman.',
      'I sleep for a long time, but I still feel tired.',
      'Я долго сплю, но всё равно чувствую усталость.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['conjunctions', 'review'],
  },

  en_s2u2_n3_071_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['for', 'Students', 'a', 'ask', 'discount', 'about'],
    answer: 'Students ask for a discount',
    audioText: 'Students ask for a discount.',
    answerTranslation: L(
      '학생들은 할인을 요청해요.',
      'Talabalar chegirma so‘raydi.',
      'Students ask for a discount.',
      'Студенты просят скидку.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['ask-for', 'discount'],
  },

  en_s2u2_n3_072_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['agree', 'with', 'I', 'you', 'for', 'to'],
    answer: 'I agree with you',
    answerTranslation: L(
      '저는 당신에게 동의해요.',
      'Men sizga qo‘shilaman.',
      'I agree with you.',
      'Я с вами согласен.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['agree-with'],
  },

  en_s2u2_n3_073_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'I think about my family and talk to them.',
    audioText: 'I think about my family and talk to them.',
    answerI18n: L(
      '저는 가족을 생각하고 가족과 이야기해요',
      'Men oilam haqida o‘ylayman va ular bilan gaplashaman',
      'I think about my family and talk to them',
      'Я думаю о семье и разговариваю с ними',
    ),
    options: [
      'I',
      'think',
      'about',
      'my',
      'family',
      'and',
      'talk',
      'to',
      'them.',
    ],
    optionsI18n: {
      ko: ['저는', '가족을', '생각하고', '가족과', '이야기해요'],
      uz: [
        'Men',
        'oilam',
        'haqida',
        'o‘ylayman',
        'va',
        'ular',
        'bilan',
        'gaplashaman',
      ],
      en: ['I', 'think', 'about', 'my', 'family', 'and', 'talk', 'to', 'them.'],
      ru: ['Я', 'думаю', 'о', 'семье', 'и', 'разговариваю', 'с', 'ними'],
    },
    answerTranslation: L(
      '저는 가족을 생각하고 가족과 이야기해요.',
      'Men oilam haqida o‘ylayman va ular bilan gaplashaman.',
      'I think about my family and talk to them.',
      'Я думаю о семье и разговариваю с ними.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['verb-preposition', 'conjunctions'],
  },

  en_s2u2_n3_074_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Do you pay for tea and coffee at work?' },
    ],
    options: [
      'No, they’re free.',
      'No, I pay to them.',
      'Yes, I listen to them.',
      'No, I wait for them.',
    ],
    answer: 'No, they’re free.',
    answerTranslation: L(
      '아니요, 무료예요.',
      'Yo‘q, ular bepul.',
      'No, they’re free.',
      'Нет, они бесплатные.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['pay-for', 'conversation'],
  },

  en_s2u2_n3_075_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Can I talk to you before the meeting?' },
    ],
    options: [
      'OK. Are you free after lunch?',
      'I agree for the lunch.',
      'I wait about the meeting.',
      'I listen at lunch.',
    ],
    answer: 'OK. Are you free after lunch?',
    answerTranslation: L(
      '좋아요. 점심 후에 시간 있어요?',
      'Mayli. Tushlikdan keyin bo‘shmisiz?',
      'OK. Are you free after lunch?',
      'Хорошо. Вы свободны после обеда?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['talk-to', 'conversation'],
  },

  en_s2u2_n3_076_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What do you do when you don’t understand something?',
    options: ['I', 'ask', 'for', 'help', 'about', 'wait'],
    answer: 'I ask for help',
    answerTranslation: L(
      '저는 도움을 요청해요.',
      'Men yordam so‘rayman.',
      'I ask for help.',
      'Я прошу о помощи.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['ask-for', 'conversation'],
  },

  en_s2u2_n3_077_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I agree ',
    sentenceSuffix: ' you.',
    answer: 'with',
    answerTranslation: L(
      '저는 당신에게 동의해요.',
      'Men sizga qo‘shilaman.',
      'I agree with you.',
      'Я с вами согласен.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Use the preposition with after agree.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['verb-preposition', 'typing'],
  },

  en_s2u2_n3_078_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'We wait ',
    sentenceSuffix: ' the bus.',
    answer: 'for',
    answerTranslation: L(
      '우리는 버스를 기다려요.',
      'Biz avtobusni kutamiz.',
      'We wait for the bus.',
      'Мы ждём автобус.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Use the preposition for after wait.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['verb-preposition', 'typing'],
  },

  en_s2u2_n3_079_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I listen to the news, talk to my family and think about my day.',
    audioText:
      'I listen to the news, talk to my family and think about my day.',
    answerTranslation: L(
      '저는 뉴스를 듣고 가족과 이야기하며 하루에 대해 생각해요.',
      'Men yangiliklarni tinglayman, oilam bilan gaplashaman va kunim haqida o‘ylayman.',
      'I listen to the news, talk to my family and think about my day.',
      'Я слушаю новости, разговариваю с семьёй и думаю о своём дне.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['verb-preposition', 'review'],
  },

  en_s2u2_n3_080_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'I sleep well, but I sometimes feel tired, so I listen to my body and think about my routine.',
    audioText:
      'I sleep well, but I sometimes feel tired, so I listen to my body and think about my routine.',
    answerTranslation: L(
      '저는 잘 자지만 가끔 피곤해서 제 몸에 귀를 기울이고 생활 습관을 생각해 봐요.',
      'Men yaxshi uxlayman, lekin ba’zan charchayman, shuning uchun tanamni tinglab, tartibim haqida o‘ylayman.',
      'I sleep well, but I sometimes feel tired, so I listen to my body and think about my routine.',
      'Я хорошо сплю, но иногда устаю, поэтому прислушиваюсь к телу и думаю о своём режиме.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit2', 'node-review'],
  },
};

// ─────────────────────────────────────────────────────────────
// Node 3
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT2_NODE3 = {
  title: L(
    '생체 시계와 단어 연결',
    'Tana soati va so‘z birikmalari',
    'Body clocks and word connections',
    'Биологические часы и сочетания слов',
  ),
  section: 2,
  unit: 2,
  order: 3,
  isActive: true,

  lessons: [
    {
      title: L(
        '그리고, 하지만, 왜냐하면',
        'Va, lekin, chunki',
        'And, but, because',
        'And, but и because',
      ),
      description: L(
        'and, but, because, or, so를 사용해서 생각의 연결, 대조, 이유, 선택과 결과를 표현해요.',
        'And, but, because, or va so yordamida fikrlarni bog‘lash, qarama-qarshilik, sabab, tanlov va natijani ifodalaysiz.',
        'Use and, but, because, or and so to connect ideas, contrast them, give reasons, choices and results.',
        'Используем and, but, because, or и so для связи идей, противопоставления, причины, выбора и результата.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 1,
      questions: [
        'en_s2u2_n3_001_word_matching',
        'en_s2u2_n3_002_fill_in_blank',
        'en_s2u2_n3_003_fill_in_blank',
        'en_s2u2_n3_004_fill_in_blank',
        'en_s2u2_n3_005_fill_in_blank',
        'en_s2u2_n3_006_fill_in_blank',
        'en_s2u2_n3_007_fill_in_blank',
        'en_s2u2_n3_008_fill_in_blank',
        'en_s2u2_n3_009_dialog_complete',
        'en_s2u2_n3_010_reply_builder',
        'en_s2u2_n3_011_word_arrange',
        'en_s2u2_n3_012_translate_builder',
        'en_s2u2_n3_013_sentence_builder',
        'en_s2u2_n3_014_type_answer',
        'en_s2u2_n3_015_type_answer',
        'en_s2u2_n3_016_speaking',
        'en_s2u2_n3_017_speaking',
        'en_s2u2_n3_018_speaking',
        'en_s2u2_n3_019_fill_in_blank',
        'en_s2u2_n3_020_speaking',
      ],
    },

    {
      title: L(
        '나의 생체 시계',
        'Mening tana soatim',
        'Know your body clock',
        'Знай свои биологические часы',
      ),
      description: L(
        '수면, 음식, 피로와 배고픔에 관한 글을 통해 자신의 생체 시계와 건강한 생활 습관을 이해해요.',
        'Uyqu, ovqat, charchoq va ochlik haqidagi matn orqali tana soati va sog‘lom odatlarni tushunasiz.',
        'Use a text about sleep, food, tiredness and hunger to understand body clocks and healthier routines.',
        'Читаем о сне, питании, усталости и голоде и узнаём о биологических часах.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 2,
      questions: [
        'en_s2u2_n3_021_word_matching',
        'en_s2u2_n3_022_fill_in_blank',
        'en_s2u2_n3_023_fill_in_blank',
        'en_s2u2_n3_024_fill_in_blank',
        'en_s2u2_n3_025_dialog_complete',
        'en_s2u2_n3_026_fill_in_blank',
        'en_s2u2_n3_027_fill_in_blank',
        'en_s2u2_n3_028_word_arrange',
        'en_s2u2_n3_029_translate_builder',
        'en_s2u2_n3_030_sentence_builder',
        'en_s2u2_n3_031_dialog_complete',
        'en_s2u2_n3_032_reply_builder',
        'en_s2u2_n3_033_fill_in_blank',
        'en_s2u2_n3_034_type_answer',
        'en_s2u2_n3_035_speaking',
        'en_s2u2_n3_036_speaking',
        'en_s2u2_n3_037_fill_in_blank',
        'en_s2u2_n3_038_speaking',
        'en_s2u2_n3_039_speaking',
        'en_s2u2_n3_040_speaking',
      ],
    },

    {
      title: L(
        '동사와 전치사',
        'Fe’l va predlog',
        'Verb + preposition',
        'Глагол + предлог',
      ),
      description: L(
        'agree with, ask for, laugh at, listen to, look at/for, pay for, talk to, think about, wait for, worry about의 결합을 연습해요.',
        'Agree with, ask for, laugh at, listen to, look at/for, pay for, talk to, think about, wait for va worry about birikmalarini mashq qilasiz.',
        'Practise the verb and preposition combinations used in this lesson.',
        'Практикуем сочетания глаголов с предлогами из этого урока.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 3,
      questions: [
        'en_s2u2_n3_041_word_matching',
        'en_s2u2_n3_042_word_matching',
        'en_s2u2_n3_043_fill_in_blank',
        'en_s2u2_n3_044_fill_in_blank',
        'en_s2u2_n3_045_fill_in_blank',
        'en_s2u2_n3_046_fill_in_blank',
        'en_s2u2_n3_047_fill_in_blank',
        'en_s2u2_n3_048_fill_in_blank',
        'en_s2u2_n3_049_fill_in_blank',
        'en_s2u2_n3_050_fill_in_blank',
        'en_s2u2_n3_051_fill_in_blank',
        'en_s2u2_n3_052_fill_in_blank',
        'en_s2u2_n3_053_fill_in_blank',
        'en_s2u2_n3_054_word_arrange',
        'en_s2u2_n3_055_translate_builder',
        'en_s2u2_n3_056_sentence_builder',
        'en_s2u2_n3_057_dialog_complete',
        'en_s2u2_n3_058_dialog_complete',
        'en_s2u2_n3_059_speaking',
        'en_s2u2_n3_060_speaking',
      ],
    },

    {
      title: L(
        '접속사와 전치사 종합',
        'Bog‘lovchilar va predloglar takrori',
        'Conjunction and preposition review',
        'Повторение союзов и предлогов',
      ),
      description: L(
        '2.3에서 배운 접속사와 동사+전치사 조합을 뉴스, 가족, 돈, 수면과 일상 상황에서 종합적으로 사용해요.',
        '2.3 dagi bog‘lovchilar va fe’l+predlog birikmalarini yangiliklar, oila, pul, uyqu va kundalik vaziyatlarda takrorlaysiz.',
        'Review the conjunctions and verb-preposition combinations from 2.3 in everyday contexts.',
        'Повторяем союзы и сочетания глагол + предлог в повседневных ситуациях.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 4,
      questions: [
        'en_s2u2_n3_061_word_matching',
        'en_s2u2_n3_062_fill_in_blank',
        'en_s2u2_n3_063_fill_in_blank',
        'en_s2u2_n3_064_fill_in_blank',
        'en_s2u2_n3_065_fill_in_blank',
        'en_s2u2_n3_066_fill_in_blank',
        'en_s2u2_n3_067_fill_in_blank',
        'en_s2u2_n3_068_fill_in_blank',
        'en_s2u2_n3_069_fill_in_blank',
        'en_s2u2_n3_070_fill_in_blank',
        'en_s2u2_n3_071_word_arrange',
        'en_s2u2_n3_072_translate_builder',
        'en_s2u2_n3_073_sentence_builder',
        'en_s2u2_n3_074_dialog_complete',
        'en_s2u2_n3_075_dialog_complete',
        'en_s2u2_n3_076_reply_builder',
        'en_s2u2_n3_077_type_answer',
        'en_s2u2_n3_078_type_answer',
        'en_s2u2_n3_079_speaking',
        'en_s2u2_n3_080_speaking',
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Section 2 · Unit 2 · Node 4
// 2.4 Speaking and writing
//
// Coverage
// - making suggestions
// - making arrangements
// - Would you like to ...?
// - Are you free ...?
// - Do you want to ...?
// - How about ...?
// - accepting suggestions
// - refusing suggestions politely
// - arranging a time and place
// - Where shall we meet?
// - What time ...?
// - describe where you live
// - city / town / countryside
// - transport / traffic / shops / restaurants / museums / parks
// - house / apartment
// - busy / quiet / beautiful / terrible
// - writing with and / but / because / or
//
// IMPORTANT:
// *_WORDS에는 단어만 등록.
// "go out", "have plans", "24-hour city",
// "quarter to eight", "near the park" 같은 구는 headword로 등록하지 않음.
//
// 이전 Node에서 이미 등록한
// restaurant / beach / busy / free / dinner / weekend / meet 등은
// 여기서 중복 WORD 등록하지 않고 문제에서 재사용.
//
// 4 lessons × 20 questions = 80
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT2_NODE4_WORDS = [
  {
    code: 'en-noun-suggestion',
    english: 'suggestion',
    senseKey: 'idea-offered-for-consideration',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '제안',
      'taklif',
      'an idea about what someone could do',
      'предложение',
    ),
    examples: [
      {
        english: 'That is a good suggestion.',
        translations: L(
          '좋은 제안이에요.',
          'Bu yaxshi taklif.',
          'That is a good suggestion.',
          'Это хорошее предложение.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/səˈdʒestʃən/',
      ttsText: 'suggestion',
    },
    tags: ['speaking', 'arrangements', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-arrangement',
    english: 'arrangement',
    senseKey: 'plan-made-with-someone',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '약속; 계획',
      'kelishuv; reja',
      'a plan agreed with another person',
      'договорённость',
    ),
    examples: [
      {
        english: 'We make an arrangement for tonight.',
        translations: L(
          '우리는 오늘 밤 약속을 잡아요.',
          'Biz bugun kechqurun uchun kelishamiz.',
          'We make an arrangement for tonight.',
          'Мы договариваемся на сегодняшний вечер.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/əˈreɪndʒmənt/',
      ttsText: 'arrangement',
    },
    tags: ['speaking', 'arrangements', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-verb-suggest',
    english: 'suggest',
    senseKey: 'offer-an-idea',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '제안하다',
      'taklif qilmoq',
      'to offer an idea for someone to consider',
      'предлагать',
    ),
    examples: [
      {
        english: 'She suggests a restaurant.',
        translations: L(
          '그녀는 식당을 제안해요.',
          'U restoran taklif qiladi.',
          'She suggests a restaurant.',
          'Она предлагает ресторан.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/səˈdʒest/',
      ttsText: 'suggest',
    },
    tags: ['speaking', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-verb-arrange',
    english: 'arrange',
    senseKey: 'make-a-plan',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '정하다; 준비하다',
      'kelishmoq; tashkil qilmoq',
      'to make plans for something',
      'договариваться; организовывать',
    ),
    examples: [
      {
        english: 'They arrange a time to meet.',
        translations: L(
          '그들은 만날 시간을 정해요.',
          'Ular uchrashish vaqtini kelishadi.',
          'They arrange a time to meet.',
          'Они договариваются о времени встречи.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/əˈreɪndʒ/',
      ttsText: 'arrange',
    },
    tags: ['speaking', 'arrangements', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-verb-accept',
    english: 'accept',
    senseKey: 'say-yes-to-offer',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '수락하다',
      'qabul qilmoq',
      'to say yes to an offer or suggestion',
      'принимать',
    ),
    examples: [
      {
        english: 'She accepts the suggestion.',
        translations: L(
          '그녀는 제안을 수락해요.',
          'U taklifni qabul qiladi.',
          'She accepts the suggestion.',
          'Она принимает предложение.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/əkˈsept/',
      ttsText: 'accept',
    },
    tags: ['speaking', 'arrangements', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-verb-refuse',
    english: 'refuse',
    senseKey: 'say-no-to-offer',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '거절하다',
      'rad etmoq',
      'to say no to an offer or suggestion',
      'отказываться',
    ),
    examples: [
      {
        english: 'He politely refuses the invitation.',
        translations: L(
          '그는 정중하게 거절해요.',
          'U muloyimlik bilan rad etadi.',
          'He politely refuses the invitation.',
          'Он вежливо отказывается.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/rɪˈfjuːz/',
      ttsText: 'refuse',
    },
    tags: ['speaking', 'arrangements', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-verb-prefer',
    english: 'prefer',
    senseKey: 'like-one-thing-more',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '더 좋아하다; 선호하다',
      'afzal ko‘rmoq',
      'to like one thing more than another',
      'предпочитать',
    ),
    examples: [
      {
        english: 'I prefer the countryside.',
        translations: L(
          '저는 시골을 더 좋아해요.',
          'Men qishloq joylarini afzal ko‘raman.',
          'I prefer the countryside.',
          'Я предпочитаю сельскую местность.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/prɪˈfɜː/',
      ttsText: 'prefer',
    },
    tags: ['places', 'writing', 'unit2'],
    difficulty: 2,
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
      'a place where people watch films',
      'кинотеатр',
    ),
    examples: [
      {
        english: 'Would you like to go to the cinema?',
        translations: L(
          '영화관에 갈래요?',
          'Kinoteatrga borishni xohlaysizmi?',
          'Would you like to go to the cinema?',
          'Хотите пойти в кино?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈsɪnəmə/',
      ttsText: 'cinema',
    },
    tags: ['places', 'arrangements', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-place-hotel',
    english: 'hotel',
    senseKey: 'place-providing-rooms',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '호텔',
      'mehmonxona',
      'a place where people pay to stay',
      'отель',
    ),
    examples: [
      {
        english: 'Let’s go to your hotel.',
        translations: L(
          '당신의 호텔로 가요.',
          'Mehmonxonangizga boraylik.',
          'Let’s go to your hotel.',
          'Давайте пойдём в ваш отель.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/həʊˈtel/',
      ttsText: 'hotel',
    },
    tags: ['places', 'arrangements', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-shopping',
    english: 'shopping',
    senseKey: 'activity-of-buying-things',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '쇼핑',
      'xarid qilish',
      'the activity of buying things from shops',
      'покупки',
    ),
    examples: [
      {
        english: 'We can go shopping.',
        translations: L(
          '우리는 쇼핑하러 갈 수 있어요.',
          'Biz xarid qilishga bora olamiz.',
          'We can go shopping.',
          'Мы можем пойти за покупками.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈʃɒpɪŋ/',
      ttsText: 'shopping',
    },
    tags: ['activities', 'arrangements', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-meeting',
    english: 'meeting',
    senseKey: 'planned-event-with-people',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '회의; 만남',
      'uchrashuv',
      'an arranged occasion when people meet',
      'встреча; собрание',
    ),
    examples: [
      {
        english: 'I have a meeting tomorrow.',
        translations: L(
          '저는 내일 회의가 있어요.',
          'Ertaga uchrashuvim bor.',
          'I have a meeting tomorrow.',
          'У меня завтра встреча.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈmiːtɪŋ/',
      ttsText: 'meeting',
    },
    tags: ['arrangements', 'work', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-time-tomorrow',
    english: 'tomorrow',
    senseKey: 'day-after-today',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L('내일', 'ertaga', 'on the day after today', 'завтра'),
    examples: [
      {
        english: 'Are you free tomorrow?',
        translations: L(
          '내일 시간 있어요?',
          'Ertaga bo‘shmisiz?',
          'Are you free tomorrow?',
          'Вы свободны завтра?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/təˈmɒrəʊ/',
      ttsText: 'tomorrow',
    },
    tags: ['time', 'arrangements', 'unit2'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-time-tonight',
    english: 'tonight',
    senseKey: 'this-evening-or-night',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L(
      '오늘 밤',
      'bugun kechqurun',
      'during the evening or night of today',
      'сегодня вечером',
    ),
    examples: [
      {
        english: 'Would you like to go out tonight?',
        translations: L(
          '오늘 밤 외출할래요?',
          'Bugun kechqurun tashqariga chiqishni xohlaysizmi?',
          'Would you like to go out tonight?',
          'Хотите куда-нибудь сходить сегодня вечером?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/təˈnaɪt/',
      ttsText: 'tonight',
    },
    tags: ['time', 'arrangements', 'unit2'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-plan',
    english: 'plan',
    senseKey: 'intention-or-arrangement',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('계획', 'reja', 'something you intend or arrange to do', 'план'),
    examples: [
      {
        english: 'I have plans tonight.',
        translations: L(
          '저는 오늘 밤 계획이 있어요.',
          'Bugun kechqurun rejam bor.',
          'I have plans tonight.',
          'У меня есть планы на вечер.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/plæn/',
      ttsText: 'plan',
    },
    tags: ['arrangements', 'unit2'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-place-city',
    english: 'city',
    senseKey: 'large-town',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('도시', 'shahar', 'a large and important town', 'город'),
    examples: [
      {
        english: 'I live in a big city.',
        translations: L(
          '저는 큰 도시에 살아요.',
          'Men katta shaharda yashayman.',
          'I live in a big city.',
          'Я живу в большом городе.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈsɪti/',
      ttsText: 'city',
    },
    tags: ['places', 'writing', 'unit2'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-place-town',
    english: 'town',
    senseKey: 'urban-area-smaller-than-city',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '소도시; 마을',
      'kichik shahar',
      'a place where people live that is smaller than a city',
      'городок',
    ),
    examples: [
      {
        english: 'I live in a small town.',
        translations: L(
          '저는 작은 도시에 살아요.',
          'Men kichik shaharda yashayman.',
          'I live in a small town.',
          'Я живу в небольшом городе.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/taʊn/',
      ttsText: 'town',
    },
    tags: ['places', 'writing', 'unit2'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-place-countryside',
    english: 'countryside',
    senseKey: 'land-outside-towns-and-cities',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '시골; 교외의 자연 지역',
      'qishloq joylari',
      'land outside towns and cities',
      'сельская местность',
    ),
    examples: [
      {
        english: 'I prefer the countryside because it is quiet.',
        translations: L(
          '저는 조용해서 시골을 더 좋아해요.',
          'Men qishloq joylarini afzal ko‘raman, chunki u tinch.',
          'I prefer the countryside because it is quiet.',
          'Я предпочитаю сельскую местность, потому что там тихо.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkʌntrisaɪd/',
      ttsText: 'countryside',
    },
    tags: ['places', 'writing', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-traffic',
    english: 'traffic',
    senseKey: 'vehicles-on-roads',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '교통; 차량 흐름',
      'transport harakati',
      'vehicles moving on roads',
      'дорожное движение',
    ),
    examples: [
      {
        english: 'The traffic is terrible.',
        translations: L(
          '교통 상황이 아주 나빠요.',
          'Transport harakati juda yomon.',
          'The traffic is terrible.',
          'Дорожное движение ужасное.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈtræfɪk/',
      ttsText: 'traffic',
    },
    tags: ['city', 'writing', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-place-museum',
    english: 'museum',
    senseKey: 'building-with-objects-to-view',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '박물관',
      'muzey',
      'a building where important or interesting objects are shown',
      'музей',
    ),
    examples: [
      {
        english: 'There are lots of museums.',
        translations: L(
          '박물관이 많이 있어요.',
          'Ko‘p muzeylar bor.',
          'There are lots of museums.',
          'Здесь много музеев.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/mjuˈziːəm/',
      ttsText: 'museum',
    },
    tags: ['places', 'city', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-place-park',
    english: 'park',
    senseKey: 'public-green-area',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('공원', 'bog‘', 'a public area of grass and trees', 'парк'),
    examples: [
      {
        english: 'My favourite place is the park.',
        translations: L(
          '제가 가장 좋아하는 장소는 공원이에요.',
          'Mening sevimli joyim bog‘.',
          'My favourite place is the park.',
          'Моё любимое место — парк.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/pɑːk/',
      ttsText: 'park',
    },
    tags: ['places', 'city', 'unit2'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-place-cafe',
    english: 'café',
    senseKey: 'small-place-serving-drinks-food',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '카페',
      'kafe',
      'a small place that serves drinks and simple food',
      'кафе',
    ),
    examples: [
      {
        english: 'I often have lunch in a café.',
        translations: L(
          '저는 자주 카페에서 점심을 먹어요.',
          'Men tez-tez kafeda tushlik qilaman.',
          'I often have lunch in a café.',
          'Я часто обедаю в кафе.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkæfeɪ/',
      ttsText: 'cafe',
    },
    tags: ['places', 'city', 'unit2'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-place-apartment',
    english: 'apartment',
    senseKey: 'set-of-rooms-for-living',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '아파트; 공동주택의 한 세대',
      'kvartira',
      'a set of rooms used as a home',
      'квартира',
    ),
    examples: [
      {
        english: 'I live in an apartment.',
        translations: L(
          '저는 아파트에 살아요.',
          'Men kvartirada yashayman.',
          'I live in an apartment.',
          'Я живу в квартире.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/əˈpɑːtmənt/',
      ttsText: 'apartment',
    },
    tags: ['home', 'writing', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-place-house',
    english: 'house',
    senseKey: 'building-used-as-home',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('집; 주택', 'uy', 'a building where people live', 'дом'),
    examples: [
      {
        english: 'My family lives in a house.',
        translations: L(
          '우리 가족은 주택에 살아요.',
          'Oilam uyda yashaydi.',
          'My family lives in a house.',
          'Моя семья живёт в доме.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/haʊs/',
      ttsText: 'house',
    },
    tags: ['home', 'writing', 'unit2'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-place-office',
    english: 'office',
    senseKey: 'room-or-building-for-work',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '사무실',
      'ofis',
      'a room or building where people work',
      'офис',
    ),
    examples: [
      {
        english: 'My office is near the park.',
        translations: L(
          '제 사무실은 공원 근처에 있어요.',
          'Mening ofisim bog‘ yaqinida.',
          'My office is near the park.',
          'Мой офис находится рядом с парком.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈɒfɪs/',
      ttsText: 'office',
    },
    tags: ['work', 'places', 'unit2'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-place-shop',
    english: 'shop',
    senseKey: 'place-selling-things',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('가게', 'do‘kon', 'a place where things are sold', 'магазин'),
    examples: [
      {
        english: 'There are lots of shops.',
        translations: L(
          '가게가 많이 있어요.',
          'Ko‘p do‘konlar bor.',
          'There are lots of shops.',
          'Здесь много магазинов.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ʃɒp/',
      ttsText: 'shop',
    },
    tags: ['places', 'city', 'unit2'],
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
      'very attractive or pleasant to look at',
      'красивый',
    ),
    examples: [
      {
        english: 'It is a beautiful place.',
        translations: L(
          '아름다운 곳이에요.',
          'Bu chiroyli joy.',
          'It is a beautiful place.',
          'Это красивое место.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈbjuːtɪfəl/',
      ttsText: 'beautiful',
    },
    tags: ['description', 'writing', 'unit2'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-quiet',
    english: 'quiet',
    senseKey: 'not-noisy',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('조용한', 'tinch', 'making little or no noise', 'тихий'),
    examples: [
      {
        english: 'It is very quiet in winter.',
        translations: L(
          '겨울에는 아주 조용해요.',
          'Qishda juda tinch.',
          'It is very quiet in winter.',
          'Зимой здесь очень тихо.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkwaɪət/',
      ttsText: 'quiet',
    },
    tags: ['description', 'writing', 'unit2'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-terrible',
    english: 'terrible',
    senseKey: 'very-bad',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('아주 나쁜; 끔찍한', 'juda yomon', 'very bad', 'ужасный'),
    examples: [
      {
        english: 'The traffic is terrible.',
        translations: L(
          '교통 상황이 아주 나빠요.',
          'Transport harakati juda yomon.',
          'The traffic is terrible.',
          'Дорожное движение ужасное.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈterəbəl/',
      ttsText: 'terrible',
    },
    tags: ['description', 'city', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-adverb-outside',
    english: 'outside',
    senseKey: 'not-inside-building',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L(
      '밖에서',
      'tashqarida',
      'not inside a building',
      'снаружи; на улице',
    ),
    examples: [
      {
        english: 'I often have lunch outside.',
        translations: L(
          '저는 자주 밖에서 점심을 먹어요.',
          'Men tez-tez tashqarida tushlik qilaman.',
          'I often have lunch outside.',
          'Я часто обедаю на улице.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌaʊtˈsaɪd/',
      ttsText: 'outside',
    },
    tags: ['places', 'writing', 'unit2'],
    difficulty: 1,
    isCore: true,
  },
];

export const EN_S2_UNIT2_NODE4_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Making suggestions
  // ===========================================================

  en_s2u2_n4_001_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Would you like to go out for dinner tonight?',
    audioText: 'Would you like to go out for dinner tonight?',
    answerTranslation: L(
      '오늘 저녁에 나가서 식사할래요?',
      'Bugun kechqurun ovqatlanishga chiqishni xohlaysizmi?',
      'Would you like to go out for dinner tonight?',
      'Хотите сегодня вечером пойти куда-нибудь поужинать?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['suggestions', 'dinner'],
  },

  en_s2u2_n4_002_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['you', 'Would', 'like', 'to', 'go', 'shopping'],
    answer: 'Would you like to go shopping',
    audioText: 'Would you like to go shopping?',
    answerTranslation: L(
      '쇼핑하러 갈래요?',
      'Xarid qilishga borishni xohlaysizmi?',
      'Would you like to go shopping?',
      'Хотите пойти за покупками?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['suggestions', 'would-like'],
  },

  en_s2u2_n4_003_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['free', 'Are', 'tomorrow', 'you', 'tonight', 'do'],
    answer: 'Are you free tomorrow',
    answerTranslation: L(
      '내일 시간 있어요?',
      'Ertaga bo‘shmisiz?',
      'Are you free tomorrow?',
      'Вы свободны завтра?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['suggestions', 'free'],
  },

  en_s2u2_n4_004_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Do you ___ to go to a restaurant?',
    blankAnswers: ['want'],
    options: ['want', 'like', 'free', 'meet'],
    answer: 'want',
    answerTranslation: L(
      '식당에 가고 싶어요?',
      'Restoranga borishni xohlaysizmi?',
      'Do you want to go to a restaurant?',
      'Хотите пойти в ресторан?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['suggestions'],
  },

  en_s2u2_n4_005_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'How ___ the new restaurant near the park?',
    blankAnswers: ['about'],
    options: ['about', 'for', 'at', 'with'],
    answer: 'about',
    answerTranslation: L(
      '공원 근처 새 식당은 어때요?',
      'Bog‘ yaqinidagi yangi restoran qanday?',
      'How about the new restaurant near the park?',
      'Как насчёт нового ресторана рядом с парком?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['suggestions', 'how-about'],
  },

  en_s2u2_n4_006_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Would you like to go out for dinner tonight?' },
    ],
    options: [
      'Yes, I’d love to.',
      'Yes, I love.',
      'Yes, I’d dinner.',
      'I free to.',
    ],
    answer: 'Yes, I’d love to.',
    answerTranslation: L(
      '네, 좋아요.',
      'Ha, mamnuniyat bilan.',
      'Yes, I’d love to.',
      'Да, с удовольствием.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['suggestions', 'accepting'],
  },

  en_s2u2_n4_007_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'How about going to the cinema?' }],
    options: [
      'Yes, that sounds nice.',
      'Yes, that sound nice.',
      'Yes, cinema sounds.',
      'I nice cinema.',
    ],
    answer: 'Yes, that sounds nice.',
    answerTranslation: L(
      '네, 좋겠네요.',
      'Ha, yaxshi eshitilyapti.',
      'Yes, that sounds nice.',
      'Да, звучит хорошо.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['suggestions', 'accepting'],
  },

  en_s2u2_n4_008_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Are you free tonight?',
    options: ['Yes', 'I', 'am', 'free', 'busy', 'tomorrow'],
    answer: 'Yes I am',
    answerTranslation: L(
      '네, 시간 있어요.',
      'Ha, bo‘shman.',
      'Yes, I am.',
      'Да.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['suggestions', 'accepting'],
  },

  en_s2u2_n4_009_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Would you like to have dinner tonight?' },
    ],
    options: [
      'I’m sorry, but I’m busy this evening.',
      'I’m sorry, but I busy evening.',
      'No, I don’t busy.',
      'I’m busy but yes no.',
    ],
    answer: 'I’m sorry, but I’m busy this evening.',
    answerTranslation: L(
      '미안하지만 오늘 저녁에는 바빠요.',
      'Kechirasiz, lekin bugun kechqurun bandman.',
      'I’m sorry, but I’m busy this evening.',
      'Извините, но сегодня вечером я занят.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['suggestions', 'refusing'],
  },

  en_s2u2_n4_010_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Do you want to go out tonight?' }],
    options: [
      'Thanks, but I’m afraid I have plans tonight.',
      'Thanks, I afraid plans.',
      'I have afraid tonight.',
      'Plans but thanks yes.',
    ],
    answer: 'Thanks, but I’m afraid I have plans tonight.',
    answerTranslation: L(
      '고맙지만 미안해요. 오늘 밤에는 계획이 있어요.',
      'Rahmat, lekin afsuski, bugun kechqurun rejam bor.',
      'Thanks, but I’m afraid I have plans tonight.',
      'Спасибо, но, боюсь, у меня сегодня планы.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['suggestions', 'refusing'],
  },

  en_s2u2_n4_011_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Thanks, but I’m ___ I have plans tonight.',
    blankAnswers: ['afraid'],
    options: ['afraid', 'free', 'quiet', 'outside'],
    answer: 'afraid',
    answerTranslation: L(
      '고맙지만 미안해요. 오늘 밤에는 계획이 있어요.',
      'Rahmat, lekin afsuski, bugun kechqurun rejam bor.',
      'Thanks, but I’m afraid I have plans tonight.',
      'Спасибо, но, боюсь, у меня сегодня планы.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['refusing'],
  },

  en_s2u2_n4_012_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'suggestion',
        native: 'taklif',
        nativeI18n: L('제안', 'taklif', 'suggestion', 'предложение'),
      },
      {
        text: 'arrangement',
        native: 'kelishuv',
        nativeI18n: L(
          '약속; 계획',
          'kelishuv',
          'arrangement',
          'договорённость',
        ),
      },
      {
        text: 'accept',
        native: 'qabul qilmoq',
        nativeI18n: L('수락하다', 'qabul qilmoq', 'accept', 'принимать'),
      },
      {
        text: 'refuse',
        native: 'rad etmoq',
        nativeI18n: L('거절하다', 'rad etmoq', 'refuse', 'отказываться'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['suggestions'],
  },

  en_s2u2_n4_013_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Would you like to go to the cinema?',
    audioText: 'Would you like to go to the cinema?',
    answerI18n: L(
      '영화관에 갈래요',
      'Kinoteatrga borishni xohlaysizmi',
      'Would you like to go to the cinema',
      'Хотите пойти в кино',
    ),
    options: ['Would', 'you', 'like', 'to', 'go', 'to', 'the', 'cinema?'],
    optionsI18n: {
      ko: ['영화관에', '갈래요'],
      uz: ['Kinoteatrga', 'borishni', 'xohlaysizmi'],
      en: ['Would', 'you', 'like', 'to', 'go', 'to', 'the', 'cinema?'],
      ru: ['Хотите', 'пойти', 'в', 'кино'],
    },
    answerTranslation: L(
      '영화관에 갈래요?',
      'Kinoteatrga borishni xohlaysizmi?',
      'Would you like to go to the cinema?',
      'Хотите пойти в кино?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['suggestions'],
  },

  en_s2u2_n4_014_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Are you ',
    sentenceSuffix: ' tomorrow?',
    answer: 'free',
    answerTranslation: L(
      '내일 시간 있어요?',
      'Ertaga bo‘shmisiz?',
      'Are you free tomorrow?',
      'Вы свободны завтра?',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Use free when asking if someone has no plans.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: true,
      },
    },
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['suggestions', 'typing'],
  },

  en_s2u2_n4_015_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I have ',
    sentenceSuffix: ' tonight.',
    answer: 'plans',
    answerTranslation: L(
      '저는 오늘 밤 계획이 있어요.',
      'Bugun kechqurun rejam bor.',
      'I have plans tonight.',
      'У меня сегодня вечером планы.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Use plans.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: true,
      },
    },
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['refusing', 'typing'],
  },

  en_s2u2_n4_016_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'How about going shopping tomorrow?',
    audioText: 'How about going shopping tomorrow?',
    answerTranslation: L(
      '내일 쇼핑하러 가는 건 어때요?',
      'Ertaga xarid qilishga borish qanday?',
      'How about going shopping tomorrow?',
      'Как насчёт того, чтобы завтра пойти за покупками?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['suggestions', 'shopping'],
  },

  en_s2u2_n4_017_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Yes, I’d love to.',
    audioText: 'Yes, I’d love to.',
    answerTranslation: L(
      '네, 좋아요.',
      'Ha, mamnuniyat bilan.',
      'Yes, I’d love to.',
      'Да, с удовольствием.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['accepting'],
  },

  en_s2u2_n4_018_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I’m sorry, but I’m busy this evening.',
    audioText: 'I’m sorry, but I’m busy this evening.',
    answerTranslation: L(
      '미안하지만 오늘 저녁에는 바빠요.',
      'Kechirasiz, lekin bugun kechqurun bandman.',
      'I’m sorry, but I’m busy this evening.',
      'Извините, но сегодня вечером я занят.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['refusing'],
  },

  en_s2u2_n4_019_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Are you free tomorrow?' }],
    options: [
      'Yes. What do you want to do?',
      'Yes. What you want do?',
      'Yes. What are want?',
      'Yes. Do you what?',
    ],
    answer: 'Yes. What do you want to do?',
    answerTranslation: L(
      '네. 뭐 하고 싶어요?',
      'Ha. Nima qilishni xohlaysiz?',
      'Yes. What do you want to do?',
      'Да. Что вы хотите делать?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['suggestions'],
  },

  en_s2u2_n4_020_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Would you like to go out tonight? Yes, I’d love to.',
    audioText: 'Would you like to go out tonight? Yes, I’d love to.',
    answerTranslation: L(
      '오늘 밤 외출할래요? 네, 좋아요.',
      'Bugun kechqurun tashqariga chiqishni xohlaysizmi? Ha, mamnuniyat bilan.',
      'Would you like to go out tonight? Yes, I’d love to.',
      'Хотите сегодня куда-нибудь сходить? Да, с удовольствием.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['suggestions', 'review'],
  },

  // ===========================================================
  // Lesson 2 · Making arrangements
  // ===========================================================

  en_s2u2_n4_021_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Where shall we meet?',
    audioText: 'Where shall we meet?',
    answerTranslation: L(
      '어디에서 만날까요?',
      'Qayerda uchrashamiz?',
      'Where shall we meet?',
      'Где встретимся?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['arrangements', 'place'],
  },

  en_s2u2_n4_022_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'What time shall we meet?',
    audioText: 'What time shall we meet?',
    answerTranslation: L(
      '몇 시에 만날까요?',
      'Soat nechada uchrashamiz?',
      'What time shall we meet?',
      'Во сколько встретимся?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['arrangements', 'time'],
  },

  en_s2u2_n4_023_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['shall', 'Where', 'meet', 'we', 'time', 'restaurant'],
    answer: 'Where shall we meet',
    audioText: 'Where shall we meet?',
    answerTranslation: L(
      '어디에서 만날까요?',
      'Qayerda uchrashamiz?',
      'Where shall we meet?',
      'Где встретимся?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['arrangements'],
  },

  en_s2u2_n4_024_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['time', 'meet', 'shall', 'What', 'we', 'where'],
    answer: 'What time shall we meet',
    answerTranslation: L(
      '몇 시에 만날까요?',
      'Soat nechada uchrashamiz?',
      'What time shall we meet?',
      'Во сколько встретимся?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['arrangements'],
  },

  en_s2u2_n4_025_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Where shall we meet?',
    options: ['Let’s', 'meet', 'at', 'the', 'restaurant', 'time'],
    answer: 'Let’s meet at the restaurant',
    answerTranslation: L(
      '식당에서 만나요.',
      'Restoranda uchrashaylik.',
      'Let’s meet at the restaurant.',
      'Давайте встретимся в ресторане.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['arrangements', 'place'],
  },

  en_s2u2_n4_026_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What time shall we meet?',
    options: ['Let’s', 'meet', 'at', 'quarter', 'to', 'eight'],
    answer: 'Let’s meet at quarter to eight',
    answerTranslation: L(
      '7시 45분에 만나요.',
      'Soat sakkizga chorak qolganda uchrashaylik.',
      'Let’s meet at quarter to eight.',
      'Давайте встретимся без четверти восемь.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['arrangements', 'time'],
  },

  en_s2u2_n4_027_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Would you like to go out for dinner?' },
      { speaker: 'user', text: 'Yes, I’d love to.' },
      { speaker: 'npc', text: 'Where shall we meet?' },
    ],
    options: [
      'Let’s meet at the new restaurant.',
      'Let’s meeting restaurant.',
      'Meet we at restaurant?',
      'Restaurant meet is.',
    ],
    answer: 'Let’s meet at the new restaurant.',
    answerTranslation: L(
      '새 식당에서 만나요.',
      'Yangi restoranda uchrashaylik.',
      'Let’s meet at the new restaurant.',
      'Давайте встретимся в новом ресторане.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['arrangements'],
  },

  en_s2u2_n4_028_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Let’s meet at quarter to eight.' }],
    options: [
      'OK. See you then.',
      'OK. See you time.',
      'OK. Meet then is.',
      'Then see at.',
    ],
    answer: 'OK. See you then.',
    answerTranslation: L(
      '좋아요. 그때 봐요.',
      'Mayli. Unda ko‘rishamiz.',
      'OK. See you then.',
      'Хорошо. До встречи.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['arrangements', 'closing'],
  },

  en_s2u2_n4_029_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Let’s ___ at the cinema.',
    blankAnswers: ['meet'],
    options: ['meet', 'meets', 'meeting', 'met'],
    answer: 'meet',
    answerTranslation: L(
      '영화관에서 만나요.',
      'Kinoteatrda uchrashaylik.',
      'Let’s meet at the cinema.',
      'Давайте встретимся у кинотеатра.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['arrangements'],
  },

  en_s2u2_n4_030_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Where ___ we meet?',
    blankAnswers: ['shall'],
    options: ['shall', 'do', 'are', 'does'],
    answer: 'shall',
    answerTranslation: L(
      '어디에서 만날까요?',
      'Qayerda uchrashamiz?',
      'Where shall we meet?',
      'Где встретимся?',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['arrangements'],
  },

  en_s2u2_n4_031_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'What ___ shall we meet?',
    blankAnswers: ['time'],
    options: ['time', 'place', 'plan', 'cinema'],
    answer: 'time',
    answerTranslation: L(
      '몇 시에 만날까요?',
      'Soat nechada uchrashamiz?',
      'What time shall we meet?',
      'Во сколько встретимся?',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['arrangements'],
  },

  en_s2u2_n4_032_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Let’s meet at half past nine.',
    audioText: 'Let’s meet at half past nine.',
    answerI18n: L(
      '9시 30분에 만나요',
      'Soat to‘qqiz yarimda uchrashaylik',
      'Let’s meet at half past nine',
      'Давайте встретимся в половине десятого',
    ),
    options: ['Let’s', 'meet', 'at', 'half', 'past', 'nine.'],
    optionsI18n: {
      ko: ['9시', '30분에', '만나요'],
      uz: ['Soat', 'to‘qqiz', 'yarimda', 'uchrashaylik'],
      en: ['Let’s', 'meet', 'at', 'half', 'past', 'nine.'],
      ru: ['Давайте', 'встретимся', 'в', 'половине', 'десятого'],
    },
    answerTranslation: L(
      '9시 30분에 만나요.',
      'Soat to‘qqiz yarimda uchrashaylik.',
      'Let’s meet at half past nine.',
      'Давайте встретимся в половине десятого.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['arrangements', 'time'],
  },

  en_s2u2_n4_033_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Where shall we ',
    sentenceSuffix: '?',
    answer: 'meet',
    answerTranslation: L(
      '어디에서 만날까요?',
      'Qayerda uchrashamiz?',
      'Where shall we meet?',
      'Где встретимся?',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Use meet.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: true,
      },
    },
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['arrangements', 'typing'],
  },

  en_s2u2_n4_034_word_matching: {
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
        text: 'hotel',
        native: 'mehmonxona',
        nativeI18n: L('호텔', 'mehmonxona', 'hotel', 'отель'),
      },
      {
        text: 'meeting',
        native: 'uchrashuv',
        nativeI18n: L('회의; 만남', 'uchrashuv', 'meeting', 'встреча'),
      },
      {
        text: 'shopping',
        native: 'xarid qilish',
        nativeI18n: L('쇼핑', 'xarid qilish', 'shopping', 'покупки'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['arrangements'],
  },

  en_s2u2_n4_035_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Are you free tomorrow?' }],
    options: [
      'Yes. How about the cinema?',
      'Yes. How the cinema?',
      'Yes. Cinema about?',
      'Yes. About go cinema do.',
    ],
    answer: 'Yes. How about the cinema?',
    answerTranslation: L(
      '네. 영화관은 어때요?',
      'Ha. Kinoteatr qanday?',
      'Yes. How about the cinema?',
      'Да. Как насчёт кино?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['arrangements', 'suggestions'],
  },

  en_s2u2_n4_036_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Let’s meet at the restaurant at eight.',
    audioText: 'Let’s meet at the restaurant at eight.',
    answerTranslation: L(
      '8시에 식당에서 만나요.',
      'Soat sakkizda restoranda uchrashaylik.',
      'Let’s meet at the restaurant at eight.',
      'Давайте встретимся в ресторане в восемь.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['arrangements'],
  },

  en_s2u2_n4_037_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Where shall we meet?',
    audioText: 'Where shall we meet?',
    answerTranslation: L(
      '어디에서 만날까요?',
      'Qayerda uchrashamiz?',
      'Where shall we meet?',
      'Где встретимся?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['arrangements'],
  },

  en_s2u2_n4_038_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'What time shall we meet?',
    audioText: 'What time shall we meet?',
    answerTranslation: L(
      '몇 시에 만날까요?',
      'Soat nechada uchrashamiz?',
      'What time shall we meet?',
      'Во сколько встретимся?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['arrangements'],
  },

  en_s2u2_n4_039_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Would you like to have dinner? Yes, I’d love to. Where shall we meet?',
    audioText:
      'Would you like to have dinner? Yes, I’d love to. Where shall we meet?',
    answerTranslation: L(
      '저녁 먹을래요? 네, 좋아요. 어디에서 만날까요?',
      'Kechki ovqat yeyishni xohlaysizmi? Ha, mamnuniyat bilan. Qayerda uchrashamiz?',
      'Would you like to have dinner? Yes, I’d love to. Where shall we meet?',
      'Хотите поужинать? Да, с удовольствием. Где встретимся?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['arrangements', 'review'],
  },

  en_s2u2_n4_040_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Let’s meet at the restaurant at quarter to eight. OK. See you then.',
    audioText:
      'Let’s meet at the restaurant at quarter to eight. OK. See you then.',
    answerTranslation: L(
      '7시 45분에 식당에서 만나요. 좋아요. 그때 봐요.',
      'Soat sakkizga chorak qolganda restoranda uchrashaylik. Mayli. Ko‘rishamiz.',
      'Let’s meet at the restaurant at quarter to eight. OK. See you then.',
      'Давайте встретимся в ресторане без четверти восемь. Хорошо. До встречи.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['arrangements', 'review'],
  },

  // ===========================================================
  // Lesson 3 · Describe where you live
  // ===========================================================

  en_s2u2_n4_041_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'city',
        native: 'shahar',
        nativeI18n: L('도시', 'shahar', 'city', 'город'),
      },
      {
        text: 'town',
        native: 'kichik shahar',
        nativeI18n: L('소도시', 'kichik shahar', 'town', 'городок'),
      },
      {
        text: 'countryside',
        native: 'qishloq joylari',
        nativeI18n: L(
          '시골',
          'qishloq joylari',
          'countryside',
          'сельская местность',
        ),
      },
      {
        text: 'traffic',
        native: 'transport harakati',
        nativeI18n: L(
          '교통',
          'transport harakati',
          'traffic',
          'дорожное движение',
        ),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['where-you-live'],
  },

  en_s2u2_n4_042_word_matching: {
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
        text: 'park',
        native: 'bog‘',
        nativeI18n: L('공원', 'bog‘', 'park', 'парк'),
      },
      {
        text: 'café',
        native: 'kafe',
        nativeI18n: L('카페', 'kafe', 'café', 'кафе'),
      },
      {
        text: 'shop',
        native: 'do‘kon',
        nativeI18n: L('가게', 'do‘kon', 'shop', 'магазин'),
      },
      {
        text: 'office',
        native: 'ofis',
        nativeI18n: L('사무실', 'ofis', 'office', 'офис'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['where-you-live', 'places'],
  },

  en_s2u2_n4_043_word_matching: {
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
        text: 'quiet',
        native: 'tinch',
        nativeI18n: L('조용한', 'tinch', 'quiet', 'тихий'),
      },
      {
        text: 'terrible',
        native: 'juda yomon',
        nativeI18n: L('아주 나쁜', 'juda yomon', 'terrible', 'ужасный'),
      },
      {
        text: 'outside',
        native: 'tashqarida',
        nativeI18n: L('밖에서', 'tashqarida', 'outside', 'снаружи'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['where-you-live', 'description'],
  },

  en_s2u2_n4_044_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I live in a very big ___.',
    blankAnswers: ['city'],
    options: ['city', 'traffic', 'museum', 'office'],
    answer: 'city',
    answerTranslation: L(
      '저는 아주 큰 도시에 살아요.',
      'Men juda katta shaharda yashayman.',
      'I live in a very big city.',
      'Я живу в очень большом городе.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['where-you-live', 'city'],
  },

  en_s2u2_n4_045_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The buses and trains are very ___.',
    blankAnswers: ['good'],
    options: ['good', 'terrible', 'outside', 'town'],
    answer: 'good',
    answerTranslation: L(
      '버스와 기차가 아주 좋아요.',
      'Avtobus va poyezdlar juda yaxshi.',
      'The buses and trains are very good.',
      'Автобусы и поезда очень хорошие.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['where-you-live', 'transport'],
  },

  en_s2u2_n4_046_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I often have lunch ___ in a café.',
    blankAnswers: ['outside'],
    options: ['outside', 'quiet', 'traffic', 'town'],
    answer: 'outside',
    answerTranslation: L(
      '저는 자주 카페의 야외에서 점심을 먹어요.',
      'Men tez-tez kafeda tashqarida tushlik qilaman.',
      'I often have lunch outside in a café.',
      'Я часто обедаю на улице в кафе.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['where-you-live', 'outside'],
  },

  en_s2u2_n4_047_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'It is a really ___ place.',
    blankAnswers: ['beautiful'],
    options: ['beautiful', 'terrible', 'traffic', 'office'],
    answer: 'beautiful',
    answerTranslation: L(
      '정말 아름다운 곳이에요.',
      'Bu juda chiroyli joy.',
      'It is a really beautiful place.',
      'Это действительно красивое место.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['where-you-live', 'beautiful'],
  },

  en_s2u2_n4_048_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'In winter it is very ___.',
    blankAnswers: ['quiet'],
    options: ['quiet', 'traffic', 'outside', 'museum'],
    answer: 'quiet',
    answerTranslation: L(
      '겨울에는 아주 조용해요.',
      'Qishda juda tinch.',
      'In winter it is very quiet.',
      'Зимой здесь очень тихо.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['where-you-live', 'quiet'],
  },

  en_s2u2_n4_049_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I live in a small ___.',
    blankAnswers: ['town'],
    options: ['town', 'traffic', 'office', 'museum'],
    answer: 'town',
    answerTranslation: L(
      '저는 작은 도시에 살아요.',
      'Men kichik shaharda yashayman.',
      'I live in a small town.',
      'Я живу в небольшом городе.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['where-you-live', 'town'],
  },

  en_s2u2_n4_050_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The ___ is terrible.',
    blankAnswers: ['traffic'],
    options: ['traffic', 'museum', 'café', 'house'],
    answer: 'traffic',
    answerTranslation: L(
      '교통 상황이 아주 나빠요.',
      'Transport harakati juda yomon.',
      'The traffic is terrible.',
      'Дорожное движение ужасное.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['where-you-live', 'traffic'],
  },

  en_s2u2_n4_051_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'There are lots of shops and ___.',
    blankAnswers: ['museums'],
    options: ['museums', 'traffic', 'outside', 'quiet'],
    answer: 'museums',
    answerTranslation: L(
      '가게와 박물관이 많이 있어요.',
      'Ko‘p do‘konlar va muzeylar bor.',
      'There are lots of shops and museums.',
      'Здесь много магазинов и музеев.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['where-you-live', 'places'],
  },

  en_s2u2_n4_052_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'My favourite place is the ___.',
    blankAnswers: ['park'],
    options: ['park', 'traffic', 'outside', 'town'],
    answer: 'park',
    answerTranslation: L(
      '제가 가장 좋아하는 장소는 공원이에요.',
      'Mening sevimli joyim bog‘.',
      'My favourite place is the park.',
      'Моё любимое место — парк.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['where-you-live', 'park'],
  },

  en_s2u2_n4_053_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'My ___ is near the park.',
    blankAnswers: ['office'],
    options: ['office', 'traffic', 'outside', 'quiet'],
    answer: 'office',
    answerTranslation: L(
      '제 사무실은 공원 근처에 있어요.',
      'Mening ofisim bog‘ yaqinida.',
      'My office is near the park.',
      'Мой офис рядом с парком.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['where-you-live', 'office'],
  },

  en_s2u2_n4_054_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['live', 'small', 'I', 'town', 'a', 'in'],
    answer: 'I live in a small town',
    audioText: 'I live in a small town.',
    answerTranslation: L(
      '저는 작은 도시에 살아요.',
      'Men kichik shaharda yashayman.',
      'I live in a small town.',
      'Я живу в небольшом городе.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['where-you-live'],
  },

  en_s2u2_n4_055_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['beautiful', 'It', 'place', 'a', 'is', 'really', 'traffic'],
    answer: 'It is a really beautiful place',
    answerTranslation: L(
      '정말 아름다운 곳이에요.',
      'Bu juda chiroyli joy.',
      'It is a really beautiful place.',
      'Это действительно красивое место.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['where-you-live'],
  },

  en_s2u2_n4_056_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'There are lots of shops and restaurants.',
    audioText: 'There are lots of shops and restaurants.',
    answerI18n: L(
      '가게와 식당이 많이 있어요',
      'Ko‘p do‘konlar va restoranlar bor',
      'There are lots of shops and restaurants',
      'Здесь много магазинов и ресторанов',
    ),
    options: ['There', 'are', 'lots', 'of', 'shops', 'and', 'restaurants.'],
    optionsI18n: {
      ko: ['가게와', '식당이', '많이', '있어요'],
      uz: ['Ko‘p', 'do‘konlar', 'va', 'restoranlar', 'bor'],
      en: ['There', 'are', 'lots', 'of', 'shops', 'and', 'restaurants.'],
      ru: ['Здесь', 'много', 'магазинов', 'и', 'ресторанов'],
    },
    answerTranslation: L(
      '가게와 식당이 많이 있어요.',
      'Ko‘p do‘konlar va restoranlar bor.',
      'There are lots of shops and restaurants.',
      'Здесь много магазинов и ресторанов.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['where-you-live', 'places'],
  },

  en_s2u2_n4_057_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Do you like where you live?' }],
    options: [
      'Yes, it’s a beautiful place.',
      'Yes, beautiful it place.',
      'Yes, I place beautiful.',
      'Yes, it beautiful are.',
    ],
    answer: 'Yes, it’s a beautiful place.',
    answerTranslation: L(
      '네, 아름다운 곳이에요.',
      'Ha, bu chiroyli joy.',
      'Yes, it’s a beautiful place.',
      'Да, это красивое место.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['where-you-live'],
  },

  en_s2u2_n4_058_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Do you prefer the city or the countryside?',
    options: ['I', 'prefer', 'the', 'countryside', 'because', 'quiet'],
    answer: 'I prefer the countryside',
    answerTranslation: L(
      '저는 시골을 더 좋아해요.',
      'Men qishloq joylarini afzal ko‘raman.',
      'I prefer the countryside.',
      'Я предпочитаю сельскую местность.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['where-you-live', 'prefer'],
  },

  en_s2u2_n4_059_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'I live in a big city. There are lots of shops, restaurants and museums.',
    audioText:
      'I live in a big city. There are lots of shops, restaurants and museums.',
    answerTranslation: L(
      '저는 큰 도시에 살아요. 가게, 식당, 박물관이 많이 있어요.',
      'Men katta shaharda yashayman. Ko‘p do‘konlar, restoranlar va muzeylar bor.',
      'I live in a big city. There are lots of shops, restaurants and museums.',
      'Я живу в большом городе. Здесь много магазинов, ресторанов и музеев.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['where-you-live', 'description'],
  },

  en_s2u2_n4_060_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I live in a small town near the sea. It is beautiful and quiet.',
    audioText:
      'I live in a small town near the sea. It is beautiful and quiet.',
    answerTranslation: L(
      '저는 바다 근처 작은 도시에 살아요. 아름답고 조용해요.',
      'Men dengiz yaqinidagi kichik shaharda yashayman. U chiroyli va tinch.',
      'I live in a small town near the sea. It is beautiful and quiet.',
      'Я живу в небольшом городе у моря. Здесь красиво и тихо.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['where-you-live', 'description'],
  },

  // ===========================================================
  // Lesson 4 · Writing about where you live
  // ===========================================================

  en_s2u2_n4_061_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I like my city ___ there are lots of things to do.',
    blankAnswers: ['because'],
    options: ['because', 'but', 'or', 'and'],
    answer: 'because',
    answerTranslation: L(
      '할 일이 많아서 저는 제 도시를 좋아해요.',
      'Shahrimni yaxshi ko‘raman, chunki qiladigan ishlar ko‘p.',
      'I like my city because there are lots of things to do.',
      'Мне нравится мой город, потому что здесь много занятий.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['writing', 'because'],
  },

  en_s2u2_n4_062_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'It is a busy city, ___ the public transport is good.',
    blankAnswers: ['but'],
    options: ['but', 'because', 'or', 'and'],
    answer: 'but',
    answerTranslation: L(
      '바쁜 도시이지만 대중교통은 좋아요.',
      'Bu gavjum shahar, lekin jamoat transporti yaxshi.',
      'It is a busy city, but the public transport is good.',
      'Это оживлённый город, но общественный транспорт хороший.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['writing', 'but'],
  },

  en_s2u2_n4_063_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'There are cafés ___ restaurants near my house.',
    blankAnswers: ['and'],
    options: ['and', 'but', 'because', 'or'],
    answer: 'and',
    answerTranslation: L(
      '우리 집 근처에는 카페와 식당이 있어요.',
      'Uyim yaqinida kafelar va restoranlar bor.',
      'There are cafés and restaurants near my house.',
      'Рядом с моим домом есть кафе и рестораны.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['writing', 'and'],
  },

  en_s2u2_n4_064_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'At the weekend, I go to the park ___ the beach.',
    blankAnswers: ['or'],
    options: ['or', 'and', 'because', 'but'],
    answer: 'or',
    answerTranslation: L(
      '주말에는 공원이나 해변에 가요.',
      'Dam olish kunlari bog‘ yoki plyajga boraman.',
      'At the weekend, I go to the park or the beach.',
      'По выходным я хожу в парк или на пляж.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['writing', 'or'],
  },

  en_s2u2_n4_065_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I live here ___ my job is here.',
    blankAnswers: ['because'],
    options: ['because', 'but', 'or', 'and'],
    answer: 'because',
    answerTranslation: L(
      '직장이 여기 있어서 이곳에 살아요.',
      'Ishim shu yerda bo‘lgani uchun shu yerda yashayman.',
      'I live here because my job is here.',
      'Я живу здесь, потому что моя работа находится здесь.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['writing', 'because'],
  },

  en_s2u2_n4_066_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The traffic is terrible, ___ I like the city.',
    blankAnswers: ['but'],
    options: ['but', 'because', 'or', 'and'],
    answer: 'but',
    answerTranslation: L(
      '교통은 아주 나쁘지만 저는 이 도시를 좋아해요.',
      'Transport harakati juda yomon, lekin men shaharni yaxshi ko‘raman.',
      'The traffic is terrible, but I like the city.',
      'Движение ужасное, но мне нравится город.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['writing', 'but'],
  },

  en_s2u2_n4_067_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'because',
      'quiet',
      'countryside',
      'the',
      'I',
      'prefer',
      'it',
      'is',
    ],
    answer: 'I prefer the countryside because it is quiet',
    audioText: 'I prefer the countryside because it is quiet.',
    answerTranslation: L(
      '조용해서 저는 시골을 더 좋아해요.',
      'Men qishloq joylarini afzal ko‘raman, chunki u tinch.',
      'I prefer the countryside because it is quiet.',
      'Я предпочитаю сельскую местность, потому что там тихо.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['writing', 'because'],
  },

  en_s2u2_n4_068_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['beautiful', 'small', 'is', 'town', 'My', 'and', 'quiet'],
    answer: 'My town is small and beautiful',
    answerTranslation: L(
      '제가 사는 도시는 작고 아름다워요.',
      'Mening shahrim kichik va chiroyli.',
      'My town is small and beautiful.',
      'Мой городок маленький и красивый.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['writing', 'and'],
  },

  en_s2u2_n4_069_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'It is busy, but there are lots of things to do.',
    audioText: 'It is busy, but there are lots of things to do.',
    answerI18n: L(
      '바쁘고 복잡하지만 할 일이 많이 있어요',
      'U gavjum, lekin qiladigan ishlar ko‘p',
      'It is busy, but there are lots of things to do',
      'Здесь оживлённо, но есть много занятий',
    ),
    options: [
      'It',
      'is',
      'busy,',
      'but',
      'there',
      'are',
      'lots',
      'of',
      'things',
      'to',
      'do.',
    ],
    optionsI18n: {
      ko: ['바쁘고', '복잡하지만', '할', '일이', '많이', '있어요'],
      uz: ['U', 'gavjum', 'lekin', 'qiladigan', 'ishlar', 'ko‘p'],
      en: [
        'It',
        'is',
        'busy,',
        'but',
        'there',
        'are',
        'lots',
        'of',
        'things',
        'to',
        'do.',
      ],
      ru: ['Здесь', 'оживлённо,', 'но', 'есть', 'много', 'занятий'],
    },
    answerTranslation: L(
      '바쁘고 복잡하지만 할 일이 많이 있어요.',
      'U gavjum, lekin qiladigan ishlar ko‘p.',
      'It is busy, but there are lots of things to do.',
      'Здесь оживлённо, но есть много занятий.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['writing', 'but'],
  },

  en_s2u2_n4_070_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I like living here ___ my family and friends are here.',
    blankAnswers: ['because'],
    options: ['because', 'but', 'or', 'and'],
    answer: 'because',
    answerTranslation: L(
      '가족과 친구들이 여기 있어서 이곳에 사는 것이 좋아요.',
      'Oilam va do‘stlarim shu yerda bo‘lgani uchun bu yerda yashashni yaxshi ko‘raman.',
      'I like living here because my family and friends are here.',
      'Мне нравится жить здесь, потому что здесь моя семья и друзья.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['writing', 'because'],
  },

  en_s2u2_n4_071_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'You can go shopping ___ visit a museum.',
    blankAnswers: ['or'],
    options: ['or', 'because', 'but', 'so'],
    answer: 'or',
    answerTranslation: L(
      '쇼핑을 하거나 박물관을 방문할 수 있어요.',
      'Xarid qilishingiz yoki muzeyga borishingiz mumkin.',
      'You can go shopping or visit a museum.',
      'Можно пойти за покупками или посетить музей.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['writing', 'or'],
  },

  en_s2u2_n4_072_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'There are buses ___ trains.',
    blankAnswers: ['and'],
    options: ['and', 'but', 'because', 'or'],
    answer: 'and',
    answerTranslation: L(
      '버스와 기차가 있어요.',
      'Avtobuslar va poyezdlar bor.',
      'There are buses and trains.',
      'Есть автобусы и поезда.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['writing', 'and'],
  },

  en_s2u2_n4_073_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Why do you like living there?' }],
    options: [
      'Because it’s beautiful and quiet.',
      'But it beautiful quiet.',
      'Or because beautiful.',
      'Because is quiet it.',
    ],
    answer: 'Because it’s beautiful and quiet.',
    answerTranslation: L(
      '아름답고 조용하기 때문이에요.',
      'Chunki u chiroyli va tinch.',
      'Because it’s beautiful and quiet.',
      'Потому что там красиво и тихо.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['writing', 'description'],
  },

  en_s2u2_n4_074_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What do you like about your city?',
    options: ['There', 'are', 'lots', 'of', 'shops', 'and', 'cafés'],
    answer: 'There are lots of shops and cafés',
    answerTranslation: L(
      '가게와 카페가 많이 있어요.',
      'Ko‘p do‘konlar va kafelar bor.',
      'There are lots of shops and cafés.',
      'Здесь много магазинов и кафе.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['writing', 'description'],
  },

  en_s2u2_n4_075_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I like my town ',
    sentenceSuffix: ' it is quiet.',
    answer: 'because',
    answerTranslation: L(
      '조용해서 저는 제가 사는 도시를 좋아해요.',
      'Shahrimni yaxshi ko‘raman, chunki u tinch.',
      'I like my town because it is quiet.',
      'Мне нравится мой городок, потому что там тихо.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Use because to give a reason.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['writing', 'typing'],
  },

  en_s2u2_n4_076_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'The traffic is terrible, ',
    sentenceSuffix: ' I like the city.',
    answer: 'but',
    answerTranslation: L(
      '교통은 아주 나쁘지만 저는 이 도시를 좋아해요.',
      'Transport harakati juda yomon, lekin men shaharni yaxshi ko‘raman.',
      'The traffic is terrible, but I like the city.',
      'Движение ужасное, но мне нравится город.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Use but to show contrast.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['writing', 'typing'],
  },

  en_s2u2_n4_077_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I live in a big city because my job is here.',
    audioText: 'I live in a big city because my job is here.',
    answerTranslation: L(
      '직장이 여기에 있어서 큰 도시에 살아요.',
      'Ishim shu yerda bo‘lgani uchun katta shaharda yashayman.',
      'I live in a big city because my job is here.',
      'Я живу в большом городе, потому что здесь моя работа.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['writing', 'because'],
  },

  en_s2u2_n4_078_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'It is busy and the traffic is terrible, but there are lots of things to do.',
    audioText:
      'It is busy and the traffic is terrible, but there are lots of things to do.',
    answerTranslation: L(
      '붐비고 교통은 아주 나쁘지만 할 일이 많이 있어요.',
      'U gavjum va transport harakati juda yomon, lekin qiladigan ishlar ko‘p.',
      'It is busy and the traffic is terrible, but there are lots of things to do.',
      'Здесь оживлённо и ужасное движение, но есть много занятий.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['writing', 'description'],
  },

  en_s2u2_n4_079_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'At the weekend, I go to the park or have lunch outside in a café.',
    audioText:
      'At the weekend, I go to the park or have lunch outside in a café.',
    answerTranslation: L(
      '주말에는 공원에 가거나 카페 야외에서 점심을 먹어요.',
      'Dam olish kunlari bog‘ga boraman yoki kafeda tashqarida tushlik qilaman.',
      'At the weekend, I go to the park or have lunch outside in a café.',
      'По выходным я хожу в парк или обедаю на улице в кафе.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['writing', 'description'],
  },

  en_s2u2_n4_080_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'I live in a small town. It is beautiful and quiet, but there are not many shops. I like living here because my family is here.',
    audioText:
      'I live in a small town. It is beautiful and quiet, but there are not many shops. I like living here because my family is here.',
    answerTranslation: L(
      '저는 작은 도시에 살아요. 아름답고 조용하지만 가게가 많지는 않아요. 가족이 이곳에 있어서 여기 사는 것이 좋아요.',
      'Men kichik shaharda yashayman. U chiroyli va tinch, lekin do‘konlar ko‘p emas. Oilam shu yerda bo‘lgani uchun bu yerda yashashni yaxshi ko‘raman.',
      'I live in a small town. It is beautiful and quiet, but there are not many shops. I like living here because my family is here.',
      'Я живу в небольшом городе. Здесь красиво и тихо, но магазинов немного. Мне нравится жить здесь, потому что здесь моя семья.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['writing', 'node-review'],
  },
};

// ─────────────────────────────────────────────────────────────
// Node 4
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT2_NODE4 = {
  title: L(
    '약속 잡기와 사는 곳 설명하기',
    'Uchrashuv rejalash va yashash joyini tasvirlash',
    'Making arrangements and describing where you live',
    'Договорённости и описание места проживания',
  ),
  section: 2,
  unit: 2,
  order: 4,
  isActive: true,

  lessons: [
    {
      title: L(
        '같이 할래요?',
        'Birga qilamizmi?',
        'Would you like to?',
        'Хотите вместе?',
      ),
      description: L(
        'Would you like to, Are you free, Do you want to, How about을 사용해 제안하고 자연스럽게 수락하거나 거절해요.',
        'Would you like to, Are you free, Do you want to va How about yordamida taklif qilish, qabul qilish va muloyim rad etishni mashq qilasiz.',
        'Make, accept and politely refuse suggestions using the key expressions from 2.4.',
        'Учимся предлагать, принимать и вежливо отклонять предложения.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 1,
      questions: [
        'en_s2u2_n4_001_speaking',
        'en_s2u2_n4_002_word_arrange',
        'en_s2u2_n4_003_translate_builder',
        'en_s2u2_n4_004_fill_in_blank',
        'en_s2u2_n4_005_fill_in_blank',
        'en_s2u2_n4_006_dialog_complete',
        'en_s2u2_n4_007_dialog_complete',
        'en_s2u2_n4_008_reply_builder',
        'en_s2u2_n4_009_dialog_complete',
        'en_s2u2_n4_010_dialog_complete',
        'en_s2u2_n4_011_fill_in_blank',
        'en_s2u2_n4_012_word_matching',
        'en_s2u2_n4_013_sentence_builder',
        'en_s2u2_n4_014_type_answer',
        'en_s2u2_n4_015_type_answer',
        'en_s2u2_n4_016_speaking',
        'en_s2u2_n4_017_speaking',
        'en_s2u2_n4_018_speaking',
        'en_s2u2_n4_019_dialog_complete',
        'en_s2u2_n4_020_speaking',
      ],
    },

    {
      title: L(
        '언제 어디에서 만날까요?',
        'Qachon va qayerda uchrashamiz?',
        'When and where shall we meet?',
        'Когда и где встретимся?',
      ),
      description: L(
        '제안을 수락한 뒤 Where shall we meet, What time shall we meet, Let’s meet...을 사용해 시간과 장소를 정해요.',
        'Taklifni qabul qilgandan keyin Where shall we meet, What time shall we meet va Let’s meet yordamida vaqt va joyni kelishasiz.',
        'Arrange a meeting place and time after making or accepting a suggestion.',
        'Договариваемся о времени и месте встречи.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 2,
      questions: [
        'en_s2u2_n4_021_speaking',
        'en_s2u2_n4_022_speaking',
        'en_s2u2_n4_023_word_arrange',
        'en_s2u2_n4_024_translate_builder',
        'en_s2u2_n4_025_reply_builder',
        'en_s2u2_n4_026_reply_builder',
        'en_s2u2_n4_027_dialog_complete',
        'en_s2u2_n4_028_dialog_complete',
        'en_s2u2_n4_029_fill_in_blank',
        'en_s2u2_n4_030_fill_in_blank',
        'en_s2u2_n4_031_fill_in_blank',
        'en_s2u2_n4_032_sentence_builder',
        'en_s2u2_n4_033_type_answer',
        'en_s2u2_n4_034_word_matching',
        'en_s2u2_n4_035_dialog_complete',
        'en_s2u2_n4_036_speaking',
        'en_s2u2_n4_037_speaking',
        'en_s2u2_n4_038_speaking',
        'en_s2u2_n4_039_speaking',
        'en_s2u2_n4_040_speaking',
      ],
    },

    {
      title: L(
        '내가 사는 곳',
        'Men yashaydigan joy',
        'Where I live',
        'Где я живу',
      ),
      description: L(
        'city, town, countryside와 교통, 상점, 박물관, 공원 같은 장소 어휘 및 beautiful, quiet, terrible 같은 묘사 표현을 익혀요.',
        'City, town, countryside, transport, do‘kon, muzey va bog‘ kabi joylar hamda beautiful, quiet, terrible kabi tasvirlovchi so‘zlarni o‘rganasiz.',
        'Learn vocabulary for describing a city, town or countryside and the places and features around you.',
        'Изучаем лексику для описания города, небольшого города или сельской местности.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 3,
      questions: [
        'en_s2u2_n4_041_word_matching',
        'en_s2u2_n4_042_word_matching',
        'en_s2u2_n4_043_word_matching',
        'en_s2u2_n4_044_fill_in_blank',
        'en_s2u2_n4_045_fill_in_blank',
        'en_s2u2_n4_046_fill_in_blank',
        'en_s2u2_n4_047_fill_in_blank',
        'en_s2u2_n4_048_fill_in_blank',
        'en_s2u2_n4_049_fill_in_blank',
        'en_s2u2_n4_050_fill_in_blank',
        'en_s2u2_n4_051_fill_in_blank',
        'en_s2u2_n4_052_fill_in_blank',
        'en_s2u2_n4_053_fill_in_blank',
        'en_s2u2_n4_054_word_arrange',
        'en_s2u2_n4_055_translate_builder',
        'en_s2u2_n4_056_sentence_builder',
        'en_s2u2_n4_057_dialog_complete',
        'en_s2u2_n4_058_reply_builder',
        'en_s2u2_n4_059_speaking',
        'en_s2u2_n4_060_speaking',
      ],
    },

    {
      title: L(
        '사는 곳에 대해 쓰기',
        'Yashash joyi haqida yozish',
        'Writing about where you live',
        'Пишем о месте, где живём',
      ),
      description: L(
        'and, but, because, or를 사용해서 자신이 사는 곳의 장점, 단점, 장소와 생활을 자연스럽게 연결해 설명해요.',
        'And, but, because va or yordamida yashash joyingizning yaxshi va yomon tomonlari, joylari va kundalik hayotini bog‘lab yozasiz.',
        'Use and, but, because and or to connect ideas when writing about where you live.',
        'Используем and, but, because и or, чтобы связно писать о месте проживания.',
      ),
      category: LessonCategory.EXPRESSION,
      level: LV,
      order: 4,
      questions: [
        'en_s2u2_n4_061_fill_in_blank',
        'en_s2u2_n4_062_fill_in_blank',
        'en_s2u2_n4_063_fill_in_blank',
        'en_s2u2_n4_064_fill_in_blank',
        'en_s2u2_n4_065_fill_in_blank',
        'en_s2u2_n4_066_fill_in_blank',
        'en_s2u2_n4_067_word_arrange',
        'en_s2u2_n4_068_translate_builder',
        'en_s2u2_n4_069_sentence_builder',
        'en_s2u2_n4_070_fill_in_blank',
        'en_s2u2_n4_071_fill_in_blank',
        'en_s2u2_n4_072_fill_in_blank',
        'en_s2u2_n4_073_dialog_complete',
        'en_s2u2_n4_074_reply_builder',
        'en_s2u2_n4_075_type_answer',
        'en_s2u2_n4_076_type_answer',
        'en_s2u2_n4_077_speaking',
        'en_s2u2_n4_078_speaking',
        'en_s2u2_n4_079_speaking',
        'en_s2u2_n4_080_speaking',
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Section 2 · Unit 2 · Node 5
// 2.5 Video + Listening for pleasure + Unit 2 Review
//
// Coverage
// - The Menna family
// - weekday / weekend routines
// - work / school / breakfast / park / relatives
// - Saturday / Sunday activities
// - barbecue
//
// Workbook 2.5:
// - adult education
// - courses for adults
// - evening classes
// - get a qualification
// - learn a new skill
// - make new friends
// - jewellery-making class
// - exercise class
// - language class
// - radio programme vocabulary
//
// Unit 2 cumulative review:
// - daily activities
// - present simple positive
// - present simple negative
// - third person singular
// - adverbs of frequency
// - telling the time
// - conjunctions
// - verb + preposition
// - making suggestions
// - making arrangements
// - describing where you live
//
// IMPORTANT:
// *_WORDS에는 단어 하나만 등록.
// "adult education", "evening class", "body clock",
// "go to work", "make new friends", "get a qualification",
// "jewellery-making class" 같은 구는 headword로 등록하지 않음.
//
// 이미 이전 Node에서 등록한 단어는 재등록하지 않고 문제에서 재사용.
//
// 4 lessons × 20 questions = 80
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT2_NODE5_WORDS = [
  {
    code: 'en-adjective-adult',
    english: 'adult',
    senseKey: 'fully-grown-person',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '성인의',
      'kattalar uchun',
      'for or relating to fully grown people',
      'взрослый',
    ),
    examples: [
      {
        english: 'This is an adult education course.',
        translations: L(
          '이것은 성인 교육 과정이에요.',
          'Bu kattalar uchun ta’lim kursi.',
          'This is an adult education course.',
          'Это курс образования для взрослых.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈædʌlt/',
      ttsText: 'adult',
    },
    tags: ['education', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-education',
    english: 'education',
    senseKey: 'process-of-learning',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '교육',
      'ta’lim',
      'the process of teaching and learning',
      'образование',
    ),
    examples: [
      {
        english: 'Adult education is popular.',
        translations: L(
          '성인 교육은 인기가 있어요.',
          'Kattalar ta’limi mashhur.',
          'Adult education is popular.',
          'Образование для взрослых популярно.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌedʒuˈkeɪʃən/',
      ttsText: 'education',
    },
    tags: ['education', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-qualification',
    english: 'qualification',
    senseKey: 'official-proof-of-skill-or-education',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '자격; 자격증',
      'malaka; sertifikat',
      'an official record showing that you have completed training or education',
      'квалификация',
    ),
    examples: [
      {
        english: 'Some adults want to get a qualification.',
        translations: L(
          '어떤 성인들은 자격을 취득하고 싶어 해요.',
          'Ba’zi kattalar malaka olishni xohlaydi.',
          'Some adults want to get a qualification.',
          'Некоторые взрослые хотят получить квалификацию.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌkwɒlɪfɪˈkeɪʃən/',
      ttsText: 'qualification',
    },
    tags: ['education', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-skill',
    english: 'skill',
    senseKey: 'ability-to-do-something-well',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '기술; 능력',
      'ko‘nikma',
      'an ability to do something well',
      'навык',
    ),
    examples: [
      {
        english: 'You can learn a new skill.',
        translations: L(
          '새로운 기술을 배울 수 있어요.',
          'Siz yangi ko‘nikma o‘rganishingiz mumkin.',
          'You can learn a new skill.',
          'Вы можете освоить новый навык.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/skɪl/',
      ttsText: 'skill',
    },
    tags: ['education', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-course',
    english: 'course',
    senseKey: 'series-of-lessons',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '과정; 강좌',
      'kurs',
      'a series of lessons about a particular subject',
      'курс',
    ),
    examples: [
      {
        english: 'The college has courses for adults.',
        translations: L(
          '그 대학에는 성인을 위한 강좌가 있어요.',
          'Kollejda kattalar uchun kurslar bor.',
          'The college has courses for adults.',
          'В колледже есть курсы для взрослых.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/kɔːs/',
      ttsText: 'course',
    },
    tags: ['education', 'unit2'],
    difficulty: 2,
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
        english: 'Adults learn new things.',
        translations: L(
          '성인들은 새로운 것을 배워요.',
          'Kattalar yangi narsalarni o‘rganadi.',
          'Adults learn new things.',
          'Взрослые изучают новое.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/lɜːn/',
      ttsText: 'learn',
    },
    tags: ['education', 'verbs', 'unit2'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-jewellery',
    english: 'jewellery',
    senseKey: 'decorative-personal-objects',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '보석류; 장신구',
      'zargarlik buyumlari',
      'decorative objects that people wear',
      'ювелирные изделия',
    ),
    examples: [
      {
        english: 'She takes a jewellery-making class.',
        translations: L(
          '그녀는 장신구 만들기 수업을 들어요.',
          'U zargarlik buyumlari yasash darsiga qatnaydi.',
          'She takes a jewellery-making class.',
          'Она ходит на занятие по изготовлению украшений.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈdʒuːəlri/',
      ttsText: 'jewellery',
    },
    tags: ['education', 'hobbies', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-listener',
    english: 'listener',
    senseKey: 'person-who-listens',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '청취자',
      'tinglovchi',
      'a person who listens to something such as a radio programme',
      'слушатель',
    ),
    examples: [
      {
        english: 'Listeners call the radio programme.',
        translations: L(
          '청취자들이 라디오 프로그램에 전화해요.',
          'Tinglovchilar radio dasturiga qo‘ng‘iroq qiladi.',
          'Listeners call the radio programme.',
          'Слушатели звонят в радиопрограмму.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈlɪsənə/',
      ttsText: 'listener',
    },
    tags: ['radio', 'education', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-time-autumn',
    english: 'autumn',
    senseKey: 'season-between-summer-and-winter',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('가을', 'kuz', 'the season between summer and winter', 'осень'),
    examples: [
      {
        english: 'Many courses start in autumn.',
        translations: L(
          '많은 강좌가 가을에 시작해요.',
          'Ko‘p kurslar kuzda boshlanadi.',
          'Many courses start in autumn.',
          'Многие курсы начинаются осенью.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈɔːtəm/',
      ttsText: 'autumn',
    },
    tags: ['time', 'education', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-adjective-foreign',
    english: 'foreign',
    senseKey: 'from-another-country',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '외국의',
      'xorijiy',
      'from or connected with another country',
      'иностранный',
    ),
    examples: [
      {
        english: 'You can learn a foreign language.',
        translations: L(
          '외국어를 배울 수 있어요.',
          'Siz xorijiy til o‘rganishingiz mumkin.',
          'You can learn a foreign language.',
          'Можно изучать иностранный язык.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈfɒrən/',
      ttsText: 'foreign',
    },
    tags: ['education', 'languages', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-guitar',
    english: 'guitar',
    senseKey: 'stringed-musical-instrument',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('기타', 'gitara', 'a musical instrument with strings', 'гитара'),
    examples: [
      {
        english: 'You can learn the guitar.',
        translations: L(
          '기타를 배울 수 있어요.',
          'Gitara chalishni o‘rganishingiz mumkin.',
          'You can learn the guitar.',
          'Можно научиться играть на гитаре.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɡɪˈtɑː/',
      ttsText: 'guitar',
    },
    tags: ['music', 'education', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-barbecue',
    english: 'barbecue',
    senseKey: 'meal-cooked-outdoors',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '바비큐',
      'barbekyu',
      'a meal where food is cooked outside over a fire',
      'барбекю',
    ),
    examples: [
      {
        english: 'The family has a barbecue.',
        translations: L(
          '그 가족은 바비큐를 해요.',
          'Oila barbekyu qiladi.',
          'The family has a barbecue.',
          'Семья устраивает барбекю.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈbɑːbɪkjuː/',
      ttsText: 'barbecue',
    },
    tags: ['family', 'weekend', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-network',
    english: 'network',
    senseKey: 'television-broadcasting-organization',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '방송망; 네트워크',
      'tarmoq',
      'an organization that broadcasts television or radio programmes',
      'телесеть',
    ),
    examples: [
      {
        english: 'Roberto works for a television network.',
        translations: L(
          'Roberto는 텔레비전 방송사에서 일해요.',
          'Roberto televizion tarmoqda ishlaydi.',
          'Roberto works for a television network.',
          'Роберто работает в телевизионной сети.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈnetwɜːk/',
      ttsText: 'network',
    },
    tags: ['work', 'video', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-channel',
    english: 'channel',
    senseKey: 'television-station',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '채널',
      'kanal',
      'a television or radio broadcasting station',
      'канал',
    ),
    examples: [
      {
        english: 'This programme is on Channel 9.',
        translations: L(
          '이 프로그램은 채널 9에서 해요.',
          'Bu dastur 9-kanalda.',
          'This programme is on Channel 9.',
          'Эта программа идёт на девятом канале.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈtʃænəl/',
      ttsText: 'channel',
    },
    tags: ['media', 'video', 'unit2'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-sport-tennis',
    english: 'tennis',
    senseKey: 'racket-sport',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '테니스',
      'tennis',
      'a sport played with rackets and a ball',
      'теннис',
    ),
    examples: [
      {
        english: 'They play tennis at the weekend.',
        translations: L(
          '그들은 주말에 테니스를 쳐요.',
          'Ular dam olish kunlari tennis o‘ynaydi.',
          'They play tennis at the weekend.',
          'Они играют в теннис по выходным.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈtenɪs/',
      ttsText: 'tennis',
    },
    tags: ['sport', 'weekend', 'unit2'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-time-saturday',
    english: 'Saturday',
    senseKey: 'day-after-friday',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('토요일', 'shanba', 'the day after Friday', 'суббота'),
    examples: [
      {
        english: 'The family has more free time on Saturday.',
        translations: L(
          '그 가족은 토요일에 자유 시간이 더 많아요.',
          'Oilaning shanba kuni bo‘sh vaqti ko‘proq.',
          'The family has more free time on Saturday.',
          'В субботу у семьи больше свободного времени.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈsætədeɪ/',
      ttsText: 'Saturday',
    },
    tags: ['days', 'weekend', 'unit2'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-time-sunday',
    english: 'Sunday',
    senseKey: 'day-after-saturday',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('일요일', 'yakshanba', 'the day after Saturday', 'воскресенье'),
    examples: [
      {
        english: 'The family visits relatives on Sunday.',
        translations: L(
          '그 가족은 일요일에 친척들을 방문해요.',
          'Oila yakshanba kuni qarindoshlarini ko‘radi.',
          'The family visits relatives on Sunday.',
          'В воскресенье семья навещает родственников.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈsʌndeɪ/',
      ttsText: 'Sunday',
    },
    tags: ['days', 'weekend', 'unit2'],
    difficulty: 1,
    isCore: true,
  },
];

export const EN_S2_UNIT2_NODE5_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · The Menna family
  // ===========================================================

  en_s2u2_n5_001_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'Saturday',
        native: 'shanba',
        nativeI18n: L('토요일', 'shanba', 'Saturday', 'суббота'),
      },
      {
        text: 'Sunday',
        native: 'yakshanba',
        nativeI18n: L('일요일', 'yakshanba', 'Sunday', 'воскресенье'),
      },
      {
        text: 'barbecue',
        native: 'barbekyu',
        nativeI18n: L('바비큐', 'barbekyu', 'barbecue', 'барбекю'),
      },
      {
        text: 'tennis',
        native: 'tennis',
        nativeI18n: L('테니스', 'tennis', 'tennis', 'теннис'),
      },
      {
        text: 'network',
        native: 'tarmoq',
        nativeI18n: L('방송망', 'tarmoq', 'network', 'телесеть'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['video', 'menna-family'],
  },

  en_s2u2_n5_002_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Roberto works for a television ___.',
    blankAnswers: ['network'],
    options: ['network', 'barbecue', 'tennis', 'park'],
    answer: 'network',
    answerTranslation: L(
      'Roberto는 텔레비전 방송사에서 일해요.',
      'Roberto televizion tarmoqda ishlaydi.',
      'Roberto works for a television network.',
      'Роберто работает в телевизионной сети.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['video', 'work'],
  },

  en_s2u2_n5_003_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The girls go to ___.',
    blankAnswers: ['school'],
    options: ['school', 'network', 'barbecue', 'channel'],
    answer: 'school',
    answerTranslation: L(
      '아이들은 학교에 가요.',
      'Qizlar maktabga boradi.',
      'The girls go to school.',
      'Девочки ходят в школу.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['video', 'routine'],
  },

  en_s2u2_n5_004_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'At the weekend, the family has more free ___.',
    blankAnswers: ['time'],
    options: ['time', 'network', 'channel', 'traffic'],
    answer: 'time',
    answerTranslation: L(
      '주말에는 가족에게 자유 시간이 더 많아요.',
      'Dam olish kunlari oilaning bo‘sh vaqti ko‘proq.',
      'At the weekend, the family has more free time.',
      'По выходным у семьи больше свободного времени.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['video', 'weekend'],
  },

  en_s2u2_n5_005_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The family has a ___ at the weekend.',
    blankAnswers: ['barbecue'],
    options: ['barbecue', 'network', 'channel', 'course'],
    answer: 'barbecue',
    answerTranslation: L(
      '그 가족은 주말에 바비큐를 해요.',
      'Oila dam olish kunlari barbekyu qiladi.',
      'The family has a barbecue at the weekend.',
      'По выходным семья устраивает барбекю.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['video', 'barbecue'],
  },

  en_s2u2_n5_006_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'They go to the ___.',
    blankAnswers: ['park'],
    options: ['park', 'network', 'channel', 'course'],
    answer: 'park',
    answerTranslation: L(
      '그들은 공원에 가요.',
      'Ular bog‘ga boradi.',
      'They go to the park.',
      'Они ходят в парк.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['video', 'park'],
  },

  en_s2u2_n5_007_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The family visits relatives on ___.',
    blankAnswers: ['Sunday'],
    options: ['Sunday', 'network', 'barbecue', 'course'],
    answer: 'Sunday',
    answerTranslation: L(
      '그 가족은 일요일에 친척들을 방문해요.',
      'Oila yakshanba kuni qarindoshlarini ko‘radi.',
      'The family visits relatives on Sunday.',
      'В воскресенье семья навещает родственников.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['video', 'sunday'],
  },

  en_s2u2_n5_008_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['family', 'weekend', 'The', 'together', 'spends', 'the'],
    answer: 'The family spends the weekend together',
    audioText: 'The family spends the weekend together.',
    answerTranslation: L(
      '그 가족은 주말을 함께 보내요.',
      'Oila dam olish kunlarini birga o‘tkazadi.',
      'The family spends the weekend together.',
      'Семья проводит выходные вместе.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['video', 'family'],
  },

  en_s2u2_n5_009_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['go', 'They', 'park', 'the', 'to', 'network'],
    answer: 'They go to the park',
    answerTranslation: L(
      '그들은 공원에 가요.',
      'Ular bog‘ga boradi.',
      'They go to the park.',
      'Они ходят в парк.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['video', 'park'],
  },

  en_s2u2_n5_010_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'The family has a barbecue on Sunday.',
    audioText: 'The family has a barbecue on Sunday.',
    answerI18n: L(
      '그 가족은 일요일에 바비큐를 해요',
      'Oila yakshanba kuni barbekyu qiladi',
      'The family has a barbecue on Sunday',
      'Семья устраивает барбекю в воскресенье',
    ),
    options: ['The', 'family', 'has', 'a', 'barbecue', 'on', 'Sunday.'],
    optionsI18n: {
      ko: ['그', '가족은', '일요일에', '바비큐를', '해요'],
      uz: ['Oila', 'yakshanba', 'kuni', 'barbekyu', 'qiladi'],
      en: ['The', 'family', 'has', 'a', 'barbecue', 'on', 'Sunday.'],
      ru: ['Семья', 'устраивает', 'барбекю', 'в', 'воскресенье'],
    },
    answerTranslation: L(
      '그 가족은 일요일에 바비큐를 해요.',
      'Oila yakshanba kuni barbekyu qiladi.',
      'The family has a barbecue on Sunday.',
      'Семья устраивает барбекю в воскресенье.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['video', 'barbecue'],
  },

  en_s2u2_n5_011_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Roberto ___ for a television network.',
    blankAnswers: ['works'],
    options: ['works', 'work', 'working', 'worked'],
    answer: 'works',
    answerTranslation: L(
      'Roberto는 텔레비전 방송사에서 일해요.',
      'Roberto televizion tarmoqda ishlaydi.',
      'Roberto works for a television network.',
      'Роберто работает в телевизионной сети.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['video', 'present-simple'],
  },

  en_s2u2_n5_012_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The girls ___ to school.',
    blankAnswers: ['go'],
    options: ['go', 'goes', 'going', 'gos'],
    answer: 'go',
    answerTranslation: L(
      '아이들은 학교에 가요.',
      'Qizlar maktabga boradi.',
      'The girls go to school.',
      'Девочки ходят в школу.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['video', 'present-simple'],
  },

  en_s2u2_n5_013_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The family usually ___ relatives on Sunday.',
    blankAnswers: ['visits'],
    options: ['visits', 'visit', 'visiting', 'visites'],
    answer: 'visits',
    answerTranslation: L(
      '그 가족은 보통 일요일에 친척들을 방문해요.',
      'Oila odatda yakshanba kuni qarindoshlarini ko‘radi.',
      'The family usually visits relatives on Sunday.',
      'Семья обычно навещает родственников в воскресенье.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['video', 'frequency'],
  },

  en_s2u2_n5_014_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What does Roberto do?' }],
    options: [
      'He works for a television network.',
      'He work for a television network.',
      'He working for a network.',
      'He does works network.',
    ],
    answer: 'He works for a television network.',
    answerTranslation: L(
      '그는 텔레비전 방송사에서 일해요.',
      'U televizion tarmoqda ishlaydi.',
      'He works for a television network.',
      'Он работает в телевизионной сети.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['video', 'work'],
  },

  en_s2u2_n5_015_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'What does the family do at the weekend?' },
    ],
    options: [
      'They spend time together.',
      'They spends time together.',
      'They spending together.',
      'They does together.',
    ],
    answer: 'They spend time together.',
    answerTranslation: L(
      '그들은 함께 시간을 보내요.',
      'Ular vaqtni birga o‘tkazadi.',
      'They spend time together.',
      'Они проводят время вместе.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['video', 'weekend'],
  },

  en_s2u2_n5_016_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What do they do on Sunday?',
    options: ['They', 'visit', 'their', 'family', 'visits', 'work'],
    answer: 'They visit their family',
    answerTranslation: L(
      '그들은 가족을 방문해요.',
      'Ular oilasini ko‘rgani boradi.',
      'They visit their family.',
      'Они навещают семью.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['video', 'sunday'],
  },

  en_s2u2_n5_017_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The Menna family has a busy week.',
    audioText: 'The Menna family has a busy week.',
    answerTranslation: L(
      'Menna 가족은 바쁜 한 주를 보내요.',
      'Menna oilasining haftasi band.',
      'The Menna family has a busy week.',
      'У семьи Менна насыщенная неделя.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['video', 'family'],
  },

  en_s2u2_n5_018_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'At the weekend, they spend more time together.',
    audioText: 'At the weekend, they spend more time together.',
    answerTranslation: L(
      '주말에는 그들이 함께 더 많은 시간을 보내요.',
      'Dam olish kunlari ular ko‘proq vaqtni birga o‘tkazadi.',
      'At the weekend, they spend more time together.',
      'По выходным они проводят больше времени вместе.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['video', 'weekend'],
  },

  en_s2u2_n5_019_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'They go to the park and visit relatives.',
    audioText: 'They go to the park and visit relatives.',
    answerTranslation: L(
      '그들은 공원에 가고 친척들을 방문해요.',
      'Ular bog‘ga boradi va qarindoshlarini ko‘radi.',
      'They go to the park and visit relatives.',
      'Они ходят в парк и навещают родственников.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['video', 'routine'],
  },

  en_s2u2_n5_020_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Their weekday routine is different from their weekend routine.',
    audioText: 'Their weekday routine is different from their weekend routine.',
    answerTranslation: L(
      '그들의 평일 생활은 주말 생활과 달라요.',
      'Ularning hafta ichidagi tartibi dam olish kunlaridagi tartibdan farq qiladi.',
      'Their weekday routine is different from their weekend routine.',
      'Их будни отличаются от выходных.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['video', 'review'],
  },

  // ===========================================================
  // Lesson 2 · Adult education
  // ===========================================================

  en_s2u2_n5_021_word_matching: {
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
        text: 'qualification',
        native: 'malaka',
        nativeI18n: L('자격', 'malaka', 'qualification', 'квалификация'),
      },
      {
        text: 'skill',
        native: 'ko‘nikma',
        nativeI18n: L('기술', 'ko‘nikma', 'skill', 'навык'),
      },
      {
        text: 'course',
        native: 'kurs',
        nativeI18n: L('강좌', 'kurs', 'course', 'курс'),
      },
      {
        text: 'jewellery',
        native: 'zargarlik buyumlari',
        nativeI18n: L(
          '장신구',
          'zargarlik buyumlari',
          'jewellery',
          'украшения',
        ),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['adult-education'],
  },

  en_s2u2_n5_022_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Many colleges have courses for ___.',
    blankAnswers: ['adults'],
    options: ['adults', 'traffic', 'barbecue', 'networks'],
    answer: 'adults',
    answerTranslation: L(
      '많은 대학에는 성인을 위한 강좌가 있어요.',
      'Ko‘p kollejlarda kattalar uchun kurslar bor.',
      'Many colleges have courses for adults.',
      'Во многих колледжах есть курсы для взрослых.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['adult-education'],
  },

  en_s2u2_n5_023_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Adults can ___ new things.',
    blankAnswers: ['learn'],
    options: ['learn', 'traffic', 'channel', 'barbecue'],
    answer: 'learn',
    answerTranslation: L(
      '성인들은 새로운 것을 배울 수 있어요.',
      'Kattalar yangi narsalarni o‘rganishi mumkin.',
      'Adults can learn new things.',
      'Взрослые могут изучать новое.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['adult-education', 'learn'],
  },

  en_s2u2_n5_024_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Some people want to get a new ___.',
    blankAnswers: ['qualification'],
    options: ['qualification', 'traffic', 'barbecue', 'network'],
    answer: 'qualification',
    answerTranslation: L(
      '어떤 사람들은 새로운 자격을 취득하고 싶어 해요.',
      'Ba’zi odamlar yangi malaka olishni xohlaydi.',
      'Some people want to get a new qualification.',
      'Некоторые хотят получить новую квалификацию.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['adult-education', 'qualification'],
  },

  en_s2u2_n5_025_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'You can learn a new ___.',
    blankAnswers: ['skill'],
    options: ['skill', 'network', 'traffic', 'barbecue'],
    answer: 'skill',
    answerTranslation: L(
      '새로운 기술을 배울 수 있어요.',
      'Yangi ko‘nikma o‘rganishingiz mumkin.',
      'You can learn a new skill.',
      'Вы можете освоить новый навык.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['adult-education', 'skill'],
  },

  en_s2u2_n5_026_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Some adults go to courses to make new ___.',
    blankAnswers: ['friends'],
    options: ['friends', 'networks', 'channels', 'clocks'],
    answer: 'friends',
    answerTranslation: L(
      '어떤 성인들은 새로운 친구를 사귀기 위해 강좌에 가요.',
      'Ba’zi kattalar yangi do‘stlar orttirish uchun kursga boradi.',
      'Some adults go to courses to make new friends.',
      'Некоторые взрослые ходят на курсы, чтобы завести новых друзей.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['adult-education', 'friends'],
  },

  en_s2u2_n5_027_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Adult courses are often in the ___.',
    blankAnswers: ['evening'],
    options: ['evening', 'traffic', 'network', 'barbecue'],
    answer: 'evening',
    answerTranslation: L(
      '성인 강좌는 종종 저녁에 열려요.',
      'Kattalar kurslari ko‘pincha kechqurun bo‘ladi.',
      'Adult courses are often in the evening.',
      'Курсы для взрослых часто проходят вечером.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['adult-education', 'evening'],
  },

  en_s2u2_n5_028_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'People who work can go to evening ___.',
    blankAnswers: ['classes'],
    options: ['classes', 'channels', 'networks', 'barbecues'],
    answer: 'classes',
    answerTranslation: L(
      '일하는 사람들은 저녁 수업에 갈 수 있어요.',
      'Ishlaydigan odamlar kechki darslarga bora oladi.',
      'People who work can go to evening classes.',
      'Работающие люди могут ходить на вечерние занятия.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['adult-education', 'classes'],
  },

  en_s2u2_n5_029_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '수업 종류와 핵심 단어를 연결하세요.',
      'Dars turini asosiy so‘z bilan moslang.',
      'Match each type of class with its key word.',
      'Соедините тип занятия с ключевым словом.',
    ),
    pairs: [
      {
        text: 'jewellery-making class',
        native: 'jewellery',
        nativeI18n: L('장신구', 'jewellery', 'jewellery', 'украшения'),
      },
      {
        text: 'exercise class',
        native: 'exercise',
        nativeI18n: L('운동', 'exercise', 'exercise', 'упражнения'),
      },
      {
        text: 'language class',
        native: 'language',
        nativeI18n: L('언어', 'language', 'language', 'язык'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['adult-education', 'classes'],
  },

  en_s2u2_n5_030_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'autumn',
        native: 'kuz',
        nativeI18n: L('가을', 'kuz', 'autumn', 'осень'),
      },
      {
        text: 'foreign',
        native: 'xorijiy',
        nativeI18n: L('외국의', 'xorijiy', 'foreign', 'иностранный'),
      },
      {
        text: 'guitar',
        native: 'gitara',
        nativeI18n: L('기타', 'gitara', 'guitar', 'гитара'),
      },
      {
        text: 'listener',
        native: 'tinglovchi',
        nativeI18n: L('청취자', 'tinglovchi', 'listener', 'слушатель'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['adult-education', 'radio'],
  },

  en_s2u2_n5_031_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['learn', 'new', 'Adults', 'skills', 'can', 'courses'],
    answer: 'Adults can learn new skills',
    audioText: 'Adults can learn new skills.',
    answerTranslation: L(
      '성인들은 새로운 기술을 배울 수 있어요.',
      'Kattalar yangi ko‘nikmalarni o‘rganishi mumkin.',
      'Adults can learn new skills.',
      'Взрослые могут осваивать новые навыки.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['adult-education'],
  },

  en_s2u2_n5_032_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['course', 'an', 'evening', 'takes', 'She', 'qualification'],
    answer: 'She takes an evening course',
    answerTranslation: L(
      '그녀는 저녁 강좌를 들어요.',
      'U kechki kursga qatnaydi.',
      'She takes an evening course.',
      'Она посещает вечерний курс.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['adult-education'],
  },

  en_s2u2_n5_033_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'People can learn a foreign language.',
    audioText: 'People can learn a foreign language.',
    answerI18n: L(
      '사람들은 외국어를 배울 수 있어요',
      'Odamlar xorijiy til o‘rganishi mumkin',
      'People can learn a foreign language',
      'Люди могут изучать иностранный язык',
    ),
    options: ['People', 'can', 'learn', 'a', 'foreign', 'language.'],
    optionsI18n: {
      ko: ['사람들은', '외국어를', '배울', '수', '있어요'],
      uz: ['Odamlar', 'xorijiy', 'til', 'o‘rganishi', 'mumkin'],
      en: ['People', 'can', 'learn', 'a', 'foreign', 'language.'],
      ru: ['Люди', 'могут', 'изучать', 'иностранный', 'язык'],
    },
    answerTranslation: L(
      '사람들은 외국어를 배울 수 있어요.',
      'Odamlar xorijiy til o‘rganishi mumkin.',
      'People can learn a foreign language.',
      'Люди могут изучать иностранный язык.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['adult-education', 'language'],
  },

  en_s2u2_n5_034_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Why do adults go to evening classes?' },
    ],
    options: [
      'To learn new things.',
      'To traffic new things.',
      'To barbecue new things.',
      'To network a class.',
    ],
    answer: 'To learn new things.',
    answerTranslation: L(
      '새로운 것을 배우기 위해서요.',
      'Yangi narsalarni o‘rganish uchun.',
      'To learn new things.',
      'Чтобы узнавать новое.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['adult-education'],
  },

  en_s2u2_n5_035_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What can you get from a course?' }],
    options: ['A qualification.', 'A traffic.', 'A network.', 'An autumn.'],
    answer: 'A qualification.',
    answerTranslation: L(
      '자격을 취득할 수 있어요.',
      'Malaka olishingiz mumkin.',
      'A qualification.',
      'Квалификацию.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['adult-education', 'qualification'],
  },

  en_s2u2_n5_036_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'You can learn a new ',
    sentenceSuffix: '.',
    answer: 'skill',
    answerTranslation: L(
      '새로운 기술을 배울 수 있어요.',
      'Yangi ko‘nikma o‘rganishingiz mumkin.',
      'You can learn a new skill.',
      'Вы можете освоить новый навык.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Use skill.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: true,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['adult-education', 'typing'],
  },

  en_s2u2_n5_037_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Many courses start in ',
    sentenceSuffix: '.',
    answer: 'autumn',
    answerTranslation: L(
      '많은 강좌가 가을에 시작해요.',
      'Ko‘p kurslar kuzda boshlanadi.',
      'Many courses start in autumn.',
      'Многие курсы начинаются осенью.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Use autumn.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: true,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['adult-education', 'autumn'],
  },

  en_s2u2_n5_038_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Adult education courses are often in the evening.',
    audioText: 'Adult education courses are often in the evening.',
    answerTranslation: L(
      '성인 교육 강좌는 종종 저녁에 열려요.',
      'Kattalar ta’lim kurslari ko‘pincha kechqurun bo‘ladi.',
      'Adult education courses are often in the evening.',
      'Курсы для взрослых часто проходят вечером.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['adult-education'],
  },

  en_s2u2_n5_039_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'People can get a qualification, learn a new skill or make new friends.',
    audioText:
      'People can get a qualification, learn a new skill or make new friends.',
    answerTranslation: L(
      '사람들은 자격을 취득하거나 새로운 기술을 배우거나 새 친구를 사귈 수 있어요.',
      'Odamlar malaka olishi, yangi ko‘nikma o‘rganishi yoki yangi do‘stlar orttirishi mumkin.',
      'People can get a qualification, learn a new skill or make new friends.',
      'Люди могут получить квалификацию, освоить новый навык или завести новых друзей.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['adult-education', 'review'],
  },

  en_s2u2_n5_040_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'You can take a language, exercise or jewellery-making class.',
    audioText: 'You can take a language, exercise or jewellery-making class.',
    answerTranslation: L(
      '언어, 운동 또는 장신구 만들기 수업을 들을 수 있어요.',
      'Til, mashq yoki zargarlik buyumlari yasash darsiga qatnashishingiz mumkin.',
      'You can take a language, exercise or jewellery-making class.',
      'Можно посещать языковые, спортивные занятия или занятия по изготовлению украшений.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['adult-education', 'review'],
  },

  // ===========================================================
  // Lesson 3 · Unit 2 Grammar & Vocabulary Review
  // ===========================================================

  en_s2u2_n5_041_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I ___ in the city.',
    blankAnswers: ['work'],
    options: ['work', 'works', 'working', 'does'],
    answer: 'work',
    answerTranslation: L(
      '저는 도시에서 일해요.',
      'Men shaharda ishlayman.',
      'I work in the city.',
      'Я работаю в городе.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['unit2-review', 'present-simple'],
  },

  en_s2u2_n5_042_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She ___ home by bus.',
    blankAnswers: ['goes'],
    options: ['goes', 'go', 'gos', 'going'],
    answer: 'goes',
    answerTranslation: L(
      '그녀는 버스를 타고 집에 가요.',
      'U uyga avtobusda boradi.',
      'She goes home by bus.',
      'Она едет домой на автобусе.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['unit2-review', 'third-person'],
  },

  en_s2u2_n5_043_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'My friend ___ in a bank.',
    blankAnswers: ['works'],
    options: ['works', 'work', 'working', 'does work'],
    answer: 'works',
    answerTranslation: L(
      '제 친구는 은행에서 일해요.',
      'Do‘stim bankda ishlaydi.',
      'My friend works in a bank.',
      'Мой друг работает в банке.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['unit2-review', 'third-person'],
  },

  en_s2u2_n5_044_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'We ___ have a car.',
    blankAnswers: ['don’t'],
    options: ['don’t', 'doesn’t', 'isn’t', 'aren’t'],
    answer: 'don’t',
    answerTranslation: L(
      '우리는 차가 없어요.',
      'Bizning mashinamiz yo‘q.',
      'We don’t have a car.',
      'У нас нет машины.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['unit2-review', 'negative'],
  },

  en_s2u2_n5_045_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'He ___ drive to work.',
    blankAnswers: ['doesn’t'],
    options: ['doesn’t', 'don’t', 'isn’t', 'not'],
    answer: 'doesn’t',
    answerTranslation: L(
      '그는 운전해서 출근하지 않아요.',
      'U ishga mashinada bormaydi.',
      'He doesn’t drive to work.',
      'Он не ездит на работу на машине.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['unit2-review', 'negative'],
  },

  en_s2u2_n5_046_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She doesn’t ___ at weekends.',
    blankAnswers: ['work'],
    options: ['work', 'works', 'working', 'worked'],
    answer: 'work',
    answerTranslation: L(
      '그녀는 주말에 일하지 않아요.',
      'U dam olish kunlari ishlamaydi.',
      'She doesn’t work at weekends.',
      'Она не работает по выходным.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['unit2-review', 'base-verb'],
  },

  en_s2u2_n5_047_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I ___ have breakfast before work.',
    blankAnswers: ['usually'],
    options: ['usually', 'never not', 'traffic', 'quarter'],
    answer: 'usually',
    answerTranslation: L(
      '저는 보통 출근 전에 아침을 먹어요.',
      'Men odatda ishga borishdan oldin nonushta qilaman.',
      'I usually have breakfast before work.',
      'Я обычно завтракаю перед работой.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['unit2-review', 'frequency'],
  },

  en_s2u2_n5_048_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She is ___ late.',
    blankAnswers: ['never'],
    options: ['never', 'doesn’t', 'don’t', 'not never'],
    answer: 'never',
    answerTranslation: L(
      '그녀는 절대 늦지 않아요.',
      'U hech qachon kech qolmaydi.',
      'She is never late.',
      'Она никогда не опаздывает.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['unit2-review', 'frequency'],
  },

  en_s2u2_n5_049_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '7:30 = ___ past seven.',
    blankAnswers: ['half'],
    options: ['half', 'quarter', 'ten', 'five'],
    answer: 'half',
    answerTranslation: L(
      '7시 30분',
      'Soat yetti yarim.',
      'half past seven',
      'половина восьмого',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit2-review', 'time'],
  },

  en_s2u2_n5_050_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '8:45 = quarter ___ nine.',
    blankAnswers: ['to'],
    options: ['to', 'past', 'at', 'after'],
    answer: 'to',
    answerTranslation: L(
      '9시 15분 전',
      'Soat to‘qqizga chorak qoldi.',
      'quarter to nine',
      'без четверти девять',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit2-review', 'time'],
  },

  en_s2u2_n5_051_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I am tired, ___ I go to bed early.',
    blankAnswers: ['so'],
    options: ['so', 'because', 'but', 'or'],
    answer: 'so',
    answerTranslation: L(
      '저는 피곤해서 일찍 자요.',
      'Men charchaganman, shuning uchun erta uxlayman.',
      'I am tired, so I go to bed early.',
      'Я устал, поэтому рано ложусь спать.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['unit2-review', 'conjunctions'],
  },

  en_s2u2_n5_052_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I go to bed early ___ I get up at six.',
    blankAnswers: ['because'],
    options: ['because', 'so', 'or', 'but'],
    answer: 'because',
    answerTranslation: L(
      '저는 6시에 일어나기 때문에 일찍 자요.',
      'Men soat oltida turganim uchun erta uxlayman.',
      'I go to bed early because I get up at six.',
      'Я рано ложусь спать, потому что встаю в шесть.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['unit2-review', 'conjunctions'],
  },

  en_s2u2_n5_053_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I agree ___ you.',
    blankAnswers: ['with'],
    options: ['with', 'for', 'to', 'about'],
    answer: 'with',
    answerTranslation: L(
      '저는 당신에게 동의해요.',
      'Men sizga qo‘shilaman.',
      'I agree with you.',
      'Я с вами согласен.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['unit2-review', 'verb-preposition'],
  },

  en_s2u2_n5_054_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'We wait ___ the bus.',
    blankAnswers: ['for'],
    options: ['for', 'with', 'at', 'about'],
    answer: 'for',
    answerTranslation: L(
      '우리는 버스를 기다려요.',
      'Biz avtobusni kutamiz.',
      'We wait for the bus.',
      'Мы ждём автобус.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['unit2-review', 'verb-preposition'],
  },

  en_s2u2_n5_055_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Think ___ your answer.',
    blankAnswers: ['about'],
    options: ['about', 'for', 'with', 'at'],
    answer: 'about',
    answerTranslation: L(
      '답에 대해 생각해 보세요.',
      'Javobingiz haqida o‘ylang.',
      'Think about your answer.',
      'Подумайте над ответом.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['unit2-review', 'verb-preposition'],
  },

  en_s2u2_n5_056_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['usually', 'home', 'I', 'at', 'breakfast', 'have'],
    answer: 'I usually have breakfast at home',
    audioText: 'I usually have breakfast at home.',
    answerTranslation: L(
      '저는 보통 집에서 아침을 먹어요.',
      'Men odatda uyda nonushta qilaman.',
      'I usually have breakfast at home.',
      'Я обычно завтракаю дома.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['unit2-review', 'frequency'],
  },

  en_s2u2_n5_057_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['doesn’t', 'She', 'work', 'weekends', 'at', 'works'],
    answer: 'She doesn’t work at weekends',
    answerTranslation: L(
      '그녀는 주말에 일하지 않아요.',
      'U dam olish kunlari ishlamaydi.',
      'She doesn’t work at weekends.',
      'Она не работает по выходным.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['unit2-review', 'negative'],
  },

  en_s2u2_n5_058_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'He usually goes to work at eight.',
    audioText: 'He usually goes to work at eight.',
    answerI18n: L(
      '그는 보통 8시에 출근해요',
      'U odatda soat sakkizda ishga boradi',
      'He usually goes to work at eight',
      'Он обычно идёт на работу в восемь',
    ),
    options: ['He', 'usually', 'goes', 'to', 'work', 'at', 'eight.'],
    optionsI18n: {
      ko: ['그는', '보통', '8시에', '출근해요'],
      uz: ['U', 'odatda', 'soat', 'sakkizda', 'ishga', 'boradi'],
      en: ['He', 'usually', 'goes', 'to', 'work', 'at', 'eight.'],
      ru: ['Он', 'обычно', 'идёт', 'на', 'работу', 'в', 'восемь'],
    },
    answerTranslation: L(
      '그는 보통 8시에 출근해요.',
      'U odatda soat sakkizda ishga boradi.',
      'He usually goes to work at eight.',
      'Он обычно идёт на работу в восемь.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['unit2-review', 'present-simple'],
  },

  en_s2u2_n5_059_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I usually get up early, have breakfast and go to work.',
    audioText: 'I usually get up early, have breakfast and go to work.',
    answerTranslation: L(
      '저는 보통 일찍 일어나 아침을 먹고 출근해요.',
      'Men odatda erta turaman, nonushta qilaman va ishga boraman.',
      'I usually get up early, have breakfast and go to work.',
      'Я обычно рано встаю, завтракаю и иду на работу.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['unit2-review', 'routine'],
  },

  en_s2u2_n5_060_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She doesn’t work at weekends, so she spends time with her family.',
    audioText:
      'She doesn’t work at weekends, so she spends time with her family.',
    answerTranslation: L(
      '그녀는 주말에 일하지 않아서 가족과 시간을 보내요.',
      'U dam olish kunlari ishlamaydi, shuning uchun oilasi bilan vaqt o‘tkazadi.',
      'She doesn’t work at weekends, so she spends time with her family.',
      'Она не работает по выходным, поэтому проводит время с семьёй.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['unit2-review', 'grammar'],
  },

  // ===========================================================
  // Lesson 4 · Unit 2 Speaking & Writing Review
  // ===========================================================

  en_s2u2_n5_061_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Are you free tomorrow?' }],
    options: ['Yes, I am.', 'Yes, I do.', 'Yes, I free.', 'Yes, I does.'],
    answer: 'Yes, I am.',
    answerTranslation: L(
      '네, 시간 있어요.',
      'Ha, bo‘shman.',
      'Yes, I am.',
      'Да.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['unit2-review', 'arrangements'],
  },

  en_s2u2_n5_062_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Would you like to go out for lunch tomorrow?' },
    ],
    options: [
      'Yes, I’d love to.',
      'Yes, I love.',
      'Yes, I’d like lunch go.',
      'Yes, I do love to lunch.',
    ],
    answer: 'Yes, I’d love to.',
    answerTranslation: L(
      '네, 좋아요.',
      'Ha, mamnuniyat bilan.',
      'Yes, I’d love to.',
      'Да, с удовольствием.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit2-review', 'suggestions'],
  },

  en_s2u2_n5_063_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Where shall we meet?' }],
    options: [
      'Let’s meet at the restaurant.',
      'Let’s meeting restaurant.',
      'Meet we restaurant.',
      'Restaurant shall meet.',
    ],
    answer: 'Let’s meet at the restaurant.',
    answerTranslation: L(
      '식당에서 만나요.',
      'Restoranda uchrashaylik.',
      'Let’s meet at the restaurant.',
      'Давайте встретимся в ресторане.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit2-review', 'arrangements'],
  },

  en_s2u2_n5_064_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What time shall we meet?' }],
    options: [
      'At quarter to eight.',
      'In quarter eight.',
      'On quarter eight.',
      'Quarter past to eight.',
    ],
    answer: 'At quarter to eight.',
    answerTranslation: L(
      '7시 45분에요.',
      'Soat sakkizga chorak qolganda.',
      'At quarter to eight.',
      'Без четверти восемь.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit2-review', 'time'],
  },

  en_s2u2_n5_065_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Would you like to have dinner tonight?' },
    ],
    options: [
      'I’m sorry, but I’m busy tonight.',
      'I’m sorry, I busy.',
      'I don’t busy tonight.',
      'Busy I am dinner.',
    ],
    answer: 'I’m sorry, but I’m busy tonight.',
    answerTranslation: L(
      '미안하지만 오늘 밤에는 바빠요.',
      'Kechirasiz, lekin bugun kechqurun bandman.',
      'I’m sorry, but I’m busy tonight.',
      'Извините, но сегодня вечером я занят.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit2-review', 'refusing'],
  },

  en_s2u2_n5_066_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['shall', 'meet', 'Where', 'we', 'time', 'at'],
    answer: 'Where shall we meet',
    audioText: 'Where shall we meet?',
    answerTranslation: L(
      '어디에서 만날까요?',
      'Qayerda uchrashamiz?',
      'Where shall we meet?',
      'Где встретимся?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['unit2-review', 'arrangements'],
  },

  en_s2u2_n5_067_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['free', 'Are', 'tonight', 'you', 'shall', 'meet'],
    answer: 'Are you free tonight',
    answerTranslation: L(
      '오늘 밤 시간 있어요?',
      'Bugun kechqurun bo‘shmisiz?',
      'Are you free tonight?',
      'Вы свободны сегодня вечером?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit2-review', 'suggestions'],
  },

  en_s2u2_n5_068_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Let’s meet at the cinema at seven.',
    audioText: 'Let’s meet at the cinema at seven.',
    answerI18n: L(
      '7시에 영화관에서 만나요',
      'Soat yettida kinoteatrda uchrashaylik',
      'Let’s meet at the cinema at seven',
      'Давайте встретимся у кинотеатра в семь',
    ),
    options: ['Let’s', 'meet', 'at', 'the', 'cinema', 'at', 'seven.'],
    optionsI18n: {
      ko: ['7시에', '영화관에서', '만나요'],
      uz: ['Soat', 'yettida', 'kinoteatrda', 'uchrashaylik'],
      en: ['Let’s', 'meet', 'at', 'the', 'cinema', 'at', 'seven.'],
      ru: ['Давайте', 'встретимся', 'у', 'кинотеатра', 'в', 'семь'],
    },
    answerTranslation: L(
      '7시에 영화관에서 만나요.',
      'Soat yettida kinoteatrda uchrashaylik.',
      'Let’s meet at the cinema at seven.',
      'Давайте встретимся у кинотеатра в семь.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['unit2-review', 'arrangements'],
  },

  en_s2u2_n5_069_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I live in a small ___.',
    blankAnswers: ['town'],
    options: ['town', 'traffic', 'quiet', 'outside'],
    answer: 'town',
    answerTranslation: L(
      '저는 작은 도시에 살아요.',
      'Men kichik shaharda yashayman.',
      'I live in a small town.',
      'Я живу в небольшом городе.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit2-review', 'where-you-live'],
  },

  en_s2u2_n5_070_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The traffic is ___.',
    blankAnswers: ['terrible'],
    options: ['terrible', 'museum', 'outside', 'town'],
    answer: 'terrible',
    answerTranslation: L(
      '교통 상황이 아주 나빠요.',
      'Transport harakati juda yomon.',
      'The traffic is terrible.',
      'Дорожное движение ужасное.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit2-review', 'city'],
  },

  en_s2u2_n5_071_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'There are lots of shops ___ restaurants.',
    blankAnswers: ['and'],
    options: ['and', 'but', 'because', 'or'],
    answer: 'and',
    answerTranslation: L(
      '가게와 식당이 많이 있어요.',
      'Ko‘p do‘konlar va restoranlar bor.',
      'There are lots of shops and restaurants.',
      'Здесь много магазинов и ресторанов.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit2-review', 'writing'],
  },

  en_s2u2_n5_072_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'It is busy, ___ I like living here.',
    blankAnswers: ['but'],
    options: ['but', 'because', 'or', 'and'],
    answer: 'but',
    answerTranslation: L(
      '붐비지만 저는 여기 사는 것이 좋아요.',
      'U gavjum, lekin men bu yerda yashashni yaxshi ko‘raman.',
      'It is busy, but I like living here.',
      'Здесь оживлённо, но мне нравится здесь жить.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['unit2-review', 'writing'],
  },

  en_s2u2_n5_073_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I like my town ___ it is quiet.',
    blankAnswers: ['because'],
    options: ['because', 'but', 'or', 'and'],
    answer: 'because',
    answerTranslation: L(
      '조용해서 저는 제가 사는 도시를 좋아해요.',
      'Shahrimni yaxshi ko‘raman, chunki u tinch.',
      'I like my town because it is quiet.',
      'Мне нравится мой городок, потому что там тихо.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['unit2-review', 'writing'],
  },

  en_s2u2_n5_074_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'At the weekend, I go to the park ___ the cinema.',
    blankAnswers: ['or'],
    options: ['or', 'because', 'but', 'so'],
    answer: 'or',
    answerTranslation: L(
      '주말에는 공원이나 영화관에 가요.',
      'Dam olish kunlari bog‘ yoki kinoteatrga boraman.',
      'At the weekend, I go to the park or the cinema.',
      'По выходным я хожу в парк или кино.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit2-review', 'writing'],
  },

  en_s2u2_n5_075_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Do you like where you live?',
    options: ['Yes', 'it', 'is', 'beautiful', 'and', 'quiet'],
    answer: 'Yes it is beautiful and quiet',
    answerTranslation: L(
      '네, 아름답고 조용해요.',
      'Ha, u chiroyli va tinch.',
      'Yes, it is beautiful and quiet.',
      'Да, здесь красиво и тихо.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit2-review', 'where-you-live'],
  },

  en_s2u2_n5_076_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Why do you like your town?',
    options: ['Because', 'it', 'is', 'quiet', 'but', 'traffic'],
    answer: 'Because it is quiet',
    answerTranslation: L(
      '조용하기 때문이에요.',
      'Chunki u tinch.',
      'Because it is quiet.',
      'Потому что там тихо.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit2-review', 'where-you-live'],
  },

  en_s2u2_n5_077_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Would you like to go to the cinema tonight? Yes, I’d love to.',
    audioText: 'Would you like to go to the cinema tonight? Yes, I’d love to.',
    answerTranslation: L(
      '오늘 밤 영화관에 갈래요? 네, 좋아요.',
      'Bugun kechqurun kinoteatrga borishni xohlaysizmi? Ha, mamnuniyat bilan.',
      'Would you like to go to the cinema tonight? Yes, I’d love to.',
      'Хотите сегодня вечером пойти в кино? Да, с удовольствием.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit2-review', 'suggestions'],
  },

  en_s2u2_n5_078_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Let’s meet at the cinema at half past seven.',
    audioText: 'Let’s meet at the cinema at half past seven.',
    answerTranslation: L(
      '7시 30분에 영화관에서 만나요.',
      'Soat yetti yarimda kinoteatrda uchrashaylik.',
      'Let’s meet at the cinema at half past seven.',
      'Давайте встретимся у кинотеатра в половине восьмого.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit2-review', 'arrangements'],
  },

  en_s2u2_n5_079_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'I live in a busy city, but there are lots of shops, cafés and parks.',
    audioText:
      'I live in a busy city, but there are lots of shops, cafés and parks.',
    answerTranslation: L(
      '저는 붐비는 도시에 살지만 가게, 카페, 공원이 많이 있어요.',
      'Men gavjum shaharda yashayman, lekin ko‘p do‘konlar, kafelar va bog‘lar bor.',
      'I live in a busy city, but there are lots of shops, cafés and parks.',
      'Я живу в оживлённом городе, но здесь много магазинов, кафе и парков.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['unit2-review', 'writing'],
  },

  en_s2u2_n5_080_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'I usually get up early and go to work, but at the weekend I relax, see friends and spend time with my family.',
    audioText:
      'I usually get up early and go to work, but at the weekend I relax, see friends and spend time with my family.',
    answerTranslation: L(
      '저는 보통 일찍 일어나 출근하지만 주말에는 쉬고 친구들을 만나며 가족과 시간을 보내요.',
      'Men odatda erta turib ishga boraman, lekin dam olish kunlari dam olaman, do‘stlarimni ko‘raman va oilam bilan vaqt o‘tkazaman.',
      'I usually get up early and go to work, but at the weekend I relax, see friends and spend time with my family.',
      'Обычно я рано встаю и иду на работу, но по выходным отдыхаю, встречаюсь с друзьями и провожу время с семьёй.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['unit2-review', 'final'],
  },
};

// ─────────────────────────────────────────────────────────────
// Node 5
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT2_NODE5 = {
  title: L(
    '가족의 주말과 Unit 2 종합 복습',
    'Oila dam olish kunlari va Unit 2 takrori',
    'Family weekends and Unit 2 review',
    'Семейные выходные и повторение Unit 2',
  ),
  section: 2,
  unit: 2,
  order: 5,
  isActive: true,

  lessons: [
    {
      title: L(
        'Menna 가족의 하루',
        'Menna oilasining kuni',
        'The Menna family',
        'Семья Менна',
      ),
      description: L(
        'Menna 가족의 평일과 주말 생활을 통해 현재형, 빈도 표현과 가족의 일상 활동을 복습해요.',
        'Menna oilasining hafta ichi va dam olish kunlari orqali hozirgi zamon, takroriylik va kundalik faoliyatlarni takrorlaysiz.',
        'Review routines, present simple and frequency through the Menna family’s weekday and weekend life.',
        'Повторяем распорядок дня, Present Simple и частотность на примере семьи Менна.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 1,
      questions: [
        'en_s2u2_n5_001_word_matching',
        'en_s2u2_n5_002_fill_in_blank',
        'en_s2u2_n5_003_fill_in_blank',
        'en_s2u2_n5_004_fill_in_blank',
        'en_s2u2_n5_005_fill_in_blank',
        'en_s2u2_n5_006_fill_in_blank',
        'en_s2u2_n5_007_fill_in_blank',
        'en_s2u2_n5_008_word_arrange',
        'en_s2u2_n5_009_translate_builder',
        'en_s2u2_n5_010_sentence_builder',
        'en_s2u2_n5_011_fill_in_blank',
        'en_s2u2_n5_012_fill_in_blank',
        'en_s2u2_n5_013_fill_in_blank',
        'en_s2u2_n5_014_dialog_complete',
        'en_s2u2_n5_015_dialog_complete',
        'en_s2u2_n5_016_reply_builder',
        'en_s2u2_n5_017_speaking',
        'en_s2u2_n5_018_speaking',
        'en_s2u2_n5_019_speaking',
        'en_s2u2_n5_020_speaking',
      ],
    },

    {
      title: L(
        '성인 교육',
        'Kattalar ta’limi',
        'Adult education',
        'Образование для взрослых',
      ),
      description: L(
        '성인 강좌, 자격, 새로운 기술, 저녁 수업과 다양한 수업 종류에 관한 어휘를 익혀요.',
        'Kattalar kurslari, malaka, yangi ko‘nikmalar, kechki darslar va turli kurslar haqidagi so‘zlarni o‘rganasiz.',
        'Learn vocabulary for adult courses, qualifications, new skills, evening classes and different kinds of classes.',
        'Изучаем лексику о курсах для взрослых, квалификации, навыках и вечерних занятиях.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 2,
      questions: [
        'en_s2u2_n5_021_word_matching',
        'en_s2u2_n5_022_fill_in_blank',
        'en_s2u2_n5_023_fill_in_blank',
        'en_s2u2_n5_024_fill_in_blank',
        'en_s2u2_n5_025_fill_in_blank',
        'en_s2u2_n5_026_fill_in_blank',
        'en_s2u2_n5_027_fill_in_blank',
        'en_s2u2_n5_028_fill_in_blank',
        'en_s2u2_n5_029_word_matching',
        'en_s2u2_n5_030_word_matching',
        'en_s2u2_n5_031_word_arrange',
        'en_s2u2_n5_032_translate_builder',
        'en_s2u2_n5_033_sentence_builder',
        'en_s2u2_n5_034_dialog_complete',
        'en_s2u2_n5_035_dialog_complete',
        'en_s2u2_n5_036_type_answer',
        'en_s2u2_n5_037_type_answer',
        'en_s2u2_n5_038_speaking',
        'en_s2u2_n5_039_speaking',
        'en_s2u2_n5_040_speaking',
      ],
    },

    {
      title: L(
        'Unit 2 문법과 어휘 복습',
        'Unit 2 grammatika va lug‘at takrori',
        'Unit 2 grammar and vocabulary review',
        'Повторение грамматики и лексики Unit 2',
      ),
      description: L(
        '현재형 긍정·부정, 3인칭 단수, 빈도부사, 시간 표현, 접속사와 동사+전치사를 종합해서 복습해요.',
        'Hozirgi zamon tasdiq va inkor, uchinchi shaxs, takroriylik, vaqt, bog‘lovchi va fe’l+predloglarni takrorlaysiz.',
        'Review present simple forms, frequency, telling the time, conjunctions and verb-preposition combinations.',
        'Повторяем Present Simple, наречия частотности, время, союзы и сочетания глаголов с предлогами.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 3,
      questions: [
        'en_s2u2_n5_041_fill_in_blank',
        'en_s2u2_n5_042_fill_in_blank',
        'en_s2u2_n5_043_fill_in_blank',
        'en_s2u2_n5_044_fill_in_blank',
        'en_s2u2_n5_045_fill_in_blank',
        'en_s2u2_n5_046_fill_in_blank',
        'en_s2u2_n5_047_fill_in_blank',
        'en_s2u2_n5_048_fill_in_blank',
        'en_s2u2_n5_049_fill_in_blank',
        'en_s2u2_n5_050_fill_in_blank',
        'en_s2u2_n5_051_fill_in_blank',
        'en_s2u2_n5_052_fill_in_blank',
        'en_s2u2_n5_053_fill_in_blank',
        'en_s2u2_n5_054_fill_in_blank',
        'en_s2u2_n5_055_fill_in_blank',
        'en_s2u2_n5_056_word_arrange',
        'en_s2u2_n5_057_translate_builder',
        'en_s2u2_n5_058_sentence_builder',
        'en_s2u2_n5_059_speaking',
        'en_s2u2_n5_060_speaking',
      ],
    },

    {
      title: L(
        'Unit 2 말하기와 쓰기 복습',
        'Unit 2 gapirish va yozish takrori',
        'Unit 2 speaking and writing review',
        'Повторение говорения и письма Unit 2',
      ),
      description: L(
        '제안하기, 약속 잡기, 시간과 장소 정하기, 사는 곳 묘사하기까지 Unit 2의 실전 표현을 종합해요.',
        'Taklif qilish, uchrashuv belgilash, vaqt va joyni kelishish hamda yashash joyini tasvirlashni takrorlaysiz.',
        'Finish Unit 2 by reviewing suggestions, arrangements, meeting times and places, and descriptions of where you live.',
        'Завершаем Unit 2 повторением предложений, договорённостей и описания места проживания.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 4,
      questions: [
        'en_s2u2_n5_061_dialog_complete',
        'en_s2u2_n5_062_dialog_complete',
        'en_s2u2_n5_063_dialog_complete',
        'en_s2u2_n5_064_dialog_complete',
        'en_s2u2_n5_065_dialog_complete',
        'en_s2u2_n5_066_word_arrange',
        'en_s2u2_n5_067_translate_builder',
        'en_s2u2_n5_068_sentence_builder',
        'en_s2u2_n5_069_fill_in_blank',
        'en_s2u2_n5_070_fill_in_blank',
        'en_s2u2_n5_071_fill_in_blank',
        'en_s2u2_n5_072_fill_in_blank',
        'en_s2u2_n5_073_fill_in_blank',
        'en_s2u2_n5_074_fill_in_blank',
        'en_s2u2_n5_075_reply_builder',
        'en_s2u2_n5_076_reply_builder',
        'en_s2u2_n5_077_speaking',
        'en_s2u2_n5_078_speaking',
        'en_s2u2_n5_079_speaking',
        'en_s2u2_n5_080_speaking',
      ],
    },
  ],
};
