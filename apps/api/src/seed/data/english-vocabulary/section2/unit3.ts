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
// Section 2 · Unit 3 · Node 1
// 3.1 Jobs
//
// Coverage
// - businessman / businesswoman
// - chef / cleaner / dentist / hairdresser
// - journalist / mechanic / musician / nurse
// - photographer / pilot / student
// - police officer (actual 3.1 grammar content)
// - job descriptions
// - inside / outside
// - well-paid / badly-paid
// - computer / hands
// - salary / hospital / magazine / camera
// - unusual jobs
// - yes/no questions with be
// - yes/no questions with other verbs
// - Are / Is / Do / Does
// - short answers
// - do / does pronunciation
// - Máté and Dana
// - Nancy Rica Schiff
//
// 4 lessons × 20 questions = 80
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT3_NODE1_WORDS = [
  {
    code: 'en-noun-job',
    english: 'job',
    senseKey: 'paid-work',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '직업; 일',
      'kasb; ish',
      'the work that a person does to earn money',
      'работа; профессия',
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
      ipa: '/dʒɒb/',
      ttsText: 'job',
    },
    tags: ['jobs', 'unit3'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-person-businessman',
    english: 'businessman',
    senseKey: 'male-person-working-in-business',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '남성 사업가',
      'biznesmen',
      'a man who works in business',
      'бизнесмен',
    ),
    examples: [
      {
        english: 'He is a businessman.',
        translations: L(
          '그는 사업가예요.',
          'U biznesmen.',
          'He is a businessman.',
          'Он бизнесмен.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈbɪznəsmæn/',
      ttsText: 'businessman',
    },
    tags: ['jobs', 'business', 'unit3'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-person-businesswoman',
    english: 'businesswoman',
    senseKey: 'female-person-working-in-business',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '여성 사업가',
      'biznes ayol',
      'a woman who works in business',
      'бизнесвумен',
    ),
    examples: [
      {
        english: 'She is a businesswoman.',
        translations: L(
          '그녀는 사업가예요.',
          'U biznes ayol.',
          'She is a businesswoman.',
          'Она бизнесвумен.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈbɪznəswʊmən/',
      ttsText: 'businesswoman',
    },
    tags: ['jobs', 'business', 'unit3'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-person-chef',
    english: 'chef',
    senseKey: 'professional-cook',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('요리사; 셰프', 'oshpaz', 'a professional cook', 'шеф-повар'),
    examples: [
      {
        english: 'She is a chef.',
        translations: L(
          '그녀는 요리사예요.',
          'U oshpaz.',
          'She is a chef.',
          'Она повар.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ʃef/',
      ttsText: 'chef',
    },
    tags: ['jobs', 'food', 'unit3'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-person-cleaner',
    english: 'cleaner',
    senseKey: 'person-who-cleans',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '청소원',
      'farrosh',
      'a person whose job is to clean places',
      'уборщик',
    ),
    examples: [
      {
        english: 'He is a cleaner.',
        translations: L(
          '그는 청소원이에요.',
          'U farrosh.',
          'He is a cleaner.',
          'Он уборщик.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkliːnə/',
      ttsText: 'cleaner',
    },
    tags: ['jobs', 'unit3'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-person-dentist',
    english: 'dentist',
    senseKey: 'person-who-treats-teeth',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '치과 의사',
      'tish shifokori',
      'a person whose job is to treat teeth',
      'стоматолог',
    ),
    examples: [
      {
        english: 'She is a dentist.',
        translations: L(
          '그녀는 치과 의사예요.',
          'U tish shifokori.',
          'She is a dentist.',
          'Она стоматолог.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈdentɪst/',
      ttsText: 'dentist',
    },
    tags: ['jobs', 'health', 'unit3'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-person-hairdresser',
    english: 'hairdresser',
    senseKey: 'person-who-cuts-hair',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '미용사',
      'sartarosh',
      'a person whose job is to cut and style hair',
      'парикмахер',
    ),
    examples: [
      {
        english: 'She is a hairdresser.',
        translations: L(
          '그녀는 미용사예요.',
          'U sartarosh.',
          'She is a hairdresser.',
          'Она парикмахер.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈheədresə/',
      ttsText: 'hairdresser',
    },
    tags: ['jobs', 'unit3'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-person-journalist',
    english: 'journalist',
    senseKey: 'person-who-writes-news',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '기자',
      'jurnalist',
      'a person who writes or reports news',
      'журналист',
    ),
    examples: [
      {
        english: 'She is a journalist.',
        translations: L(
          '그녀는 기자예요.',
          'U jurnalist.',
          'She is a journalist.',
          'Она журналист.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈdʒɜːnəlɪst/',
      ttsText: 'journalist',
    },
    tags: ['jobs', 'media', 'unit3'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-person-mechanic',
    english: 'mechanic',
    senseKey: 'person-who-repairs-machines',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '정비사',
      'mexanik',
      'a person whose job is to repair cars or machines',
      'механик',
    ),
    examples: [
      {
        english: 'He is a mechanic.',
        translations: L(
          '그는 정비사예요.',
          'U mexanik.',
          'He is a mechanic.',
          'Он механик.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/məˈkænɪk/',
      ttsText: 'mechanic',
    },
    tags: ['jobs', 'unit3'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-person-musician',
    english: 'musician',
    senseKey: 'person-who-plays-music',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '음악가',
      'musiqachi',
      'a person who plays or writes music',
      'музыкант',
    ),
    examples: [
      {
        english: 'He is a musician.',
        translations: L(
          '그는 음악가예요.',
          'U musiqachi.',
          'He is a musician.',
          'Он музыкант.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/mjuˈzɪʃən/',
      ttsText: 'musician',
    },
    tags: ['jobs', 'music', 'unit3'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-person-nurse',
    english: 'nurse',
    senseKey: 'person-who-cares-for-patients',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '간호사',
      'hamshira',
      'a person whose job is to care for sick people',
      'медсестра; медбрат',
    ),
    examples: [
      {
        english: 'She is a nurse.',
        translations: L(
          '그녀는 간호사예요.',
          'U hamshira.',
          'She is a nurse.',
          'Она медсестра.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/nɜːs/',
      ttsText: 'nurse',
    },
    tags: ['jobs', 'health', 'unit3'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-person-photographer',
    english: 'photographer',
    senseKey: 'person-who-takes-photographs',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '사진작가',
      'fotograf',
      'a person whose job is to take photographs',
      'фотограф',
    ),
    examples: [
      {
        english: 'Nancy is a photographer.',
        translations: L(
          'Nancy는 사진작가예요.',
          'Nancy fotograf.',
          'Nancy is a photographer.',
          'Нэнси фотограф.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/fəˈtɒɡrəfə/',
      ttsText: 'photographer',
    },
    tags: ['jobs', 'photography', 'unit3'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-person-pilot',
    english: 'pilot',
    senseKey: 'person-who-flies-aircraft',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '조종사',
      'uchuvchi',
      'a person whose job is to fly an aircraft',
      'пилот',
    ),
    examples: [
      {
        english: 'He is a pilot.',
        translations: L(
          '그는 조종사예요.',
          'U uchuvchi.',
          'He is a pilot.',
          'Он пилот.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈpaɪlət/',
      ttsText: 'pilot',
    },
    tags: ['jobs', 'transport', 'unit3'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-person-student',
    english: 'student',
    senseKey: 'person-who-studies',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '학생',
      'talaba',
      'a person who studies at a school, college or university',
      'студент',
    ),
    examples: [
      {
        english: 'She is a student.',
        translations: L(
          '그녀는 학생이에요.',
          'U talaba.',
          'She is a student.',
          'Она студентка.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈstjuːdənt/',
      ttsText: 'student',
    },
    tags: ['jobs', 'education', 'unit3'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-job-police-officer',
    english: 'police officer',
    senseKey: 'member-of-police-force',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '경찰관',
      'politsiya xodimi',
      'a person whose job is to work for the police',
      'полицейский',
    ),
    examples: [
      {
        english: 'Is Dana a police officer?',
        translations: L(
          'Dana는 경찰관인가요?',
          'Dana politsiya xodimimi?',
          'Is Dana a police officer?',
          'Дана полицейский?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/pəˈliːs ˌɒfɪsə/',
      ttsText: 'police officer',
    },
    tags: ['jobs', 'unit3'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-adjective-unusual',
    english: 'unusual',
    senseKey: 'not-normal-or-common',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '특이한; 흔하지 않은',
      'g‘ayrioddiy',
      'different from what is normal or common',
      'необычный',
    ),
    examples: [
      {
        english: 'They have unusual jobs.',
        translations: L(
          '그들은 특이한 직업을 가지고 있어요.',
          'Ularning g‘ayrioddiy kasblari bor.',
          'They have unusual jobs.',
          'У них необычные профессии.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ʌnˈjuːʒuəl/',
      ttsText: 'unusual',
    },
    tags: ['jobs', 'description', 'unit3'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-adverb-inside',
    english: 'inside',
    senseKey: 'within-building',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L(
      '안에서; 실내에서',
      'ichkarida',
      'in or into a building',
      'внутри',
    ),
    examples: [
      {
        english: 'Nurses usually work inside.',
        translations: L(
          '간호사는 보통 실내에서 일해요.',
          'Hamshiralar odatda ichkarida ishlaydi.',
          'Nurses usually work inside.',
          'Медсёстры обычно работают в помещении.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌɪnˈsaɪd/',
      ttsText: 'inside',
    },
    tags: ['jobs', 'workplace', 'unit3'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-well-paid',
    english: 'well-paid',
    senseKey: 'earning-good-salary',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '보수가 좋은',
      'yaxshi haq to‘lanadigan',
      'earning a good amount of money',
      'хорошо оплачиваемый',
    ),
    examples: [
      {
        english: 'Her job is well-paid.',
        translations: L(
          '그녀의 직업은 보수가 좋아요.',
          'Uning ishiga yaxshi haq to‘lanadi.',
          'Her job is well-paid.',
          'Её работа хорошо оплачивается.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌwel ˈpeɪd/',
      ttsText: 'well paid',
    },
    tags: ['jobs', 'money', 'unit3'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-adjective-badly-paid',
    english: 'badly-paid',
    senseKey: 'earning-little-money',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '보수가 낮은',
      'kam haq to‘lanadigan',
      'earning only a small amount of money',
      'плохо оплачиваемый',
    ),
    examples: [
      {
        english: 'The job is badly-paid.',
        translations: L(
          '그 직업은 보수가 낮아요.',
          'Bu ishga kam haq to‘lanadi.',
          'The job is badly-paid.',
          'Эта работа плохо оплачивается.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌbædli ˈpeɪd/',
      ttsText: 'badly paid',
    },
    tags: ['jobs', 'money', 'unit3'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-computer',
    english: 'computer',
    senseKey: 'electronic-device',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '컴퓨터',
      'kompyuter',
      'an electronic device used to store and process information',
      'компьютер',
    ),
    examples: [
      {
        english: 'She works with a computer.',
        translations: L(
          '그녀는 컴퓨터로 일해요.',
          'U kompyuter bilan ishlaydi.',
          'She works with a computer.',
          'Она работает за компьютером.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/kəmˈpjuːtə/',
      ttsText: 'computer',
    },
    tags: ['jobs', 'work', 'unit3'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-hand',
    english: 'hand',
    senseKey: 'body-part-at-end-of-arm',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '손',
      'qo‘l',
      'the part of the body at the end of the arm',
      'рука; кисть',
    ),
    examples: [
      {
        english: 'Mechanics work with their hands.',
        translations: L(
          '정비사는 손으로 일해요.',
          'Mexaniklar qo‘llari bilan ishlaydi.',
          'Mechanics work with their hands.',
          'Механики работают руками.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/hænd/',
      ttsText: 'hand',
    },
    tags: ['body', 'jobs', 'unit3'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-salary',
    english: 'salary',
    senseKey: 'regular-pay-for-job',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '급여; 월급',
      'maosh',
      'money that a person regularly receives for doing a job',
      'зарплата',
    ),
    examples: [
      {
        english: 'I earn a good salary.',
        translations: L(
          '저는 급여를 많이 받아요.',
          'Men yaxshi maosh olaman.',
          'I earn a good salary.',
          'Я получаю хорошую зарплату.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈsæləri/',
      ttsText: 'salary',
    },
    tags: ['jobs', 'money', 'unit3'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-place-hospital',
    english: 'hospital',
    senseKey: 'place-for-medical-treatment',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '병원',
      'kasalxona',
      'a place where sick or injured people receive medical treatment',
      'больница',
    ),
    examples: [
      {
        english: 'A nurse works in a hospital.',
        translations: L(
          '간호사는 병원에서 일해요.',
          'Hamshira kasalxonada ishlaydi.',
          'A nurse works in a hospital.',
          'Медсестра работает в больнице.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈhɒspɪtəl/',
      ttsText: 'hospital',
    },
    tags: ['jobs', 'places', 'unit3'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-magazine',
    english: 'magazine',
    senseKey: 'regular-publication',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '잡지',
      'jurnal',
      'a publication with articles and pictures',
      'журнал',
    ),
    examples: [
      {
        english: 'She takes photos for magazines.',
        translations: L(
          '그녀는 잡지용 사진을 찍어요.',
          'U jurnallar uchun suratga oladi.',
          'She takes photos for magazines.',
          'Она фотографирует для журналов.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌmæɡəˈziːn/',
      ttsText: 'magazine',
    },
    tags: ['jobs', 'media', 'unit3'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-camera',
    english: 'camera',
    senseKey: 'device-for-taking-photos',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '카메라',
      'kamera',
      'a device used to take photographs',
      'камера; фотоаппарат',
    ),
    examples: [
      {
        english: 'Nancy uses a camera at work.',
        translations: L(
          'Nancy는 일할 때 카메라를 사용해요.',
          'Nancy ishda kameradan foydalanadi.',
          'Nancy uses a camera at work.',
          'Нэнси использует камеру на работе.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkæmərə/',
      ttsText: 'camera',
    },
    tags: ['jobs', 'photography', 'unit3'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-weather',
    english: 'weather',
    senseKey: 'conditions-outside',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '날씨',
      'ob-havo',
      'the conditions outside, such as rain, wind or temperature',
      'погода',
    ),
    examples: [
      {
        english: 'Dana checks the weather every day.',
        translations: L(
          'Dana는 매일 날씨를 확인해요.',
          'Dana har kuni ob-havoni tekshiradi.',
          'Dana checks the weather every day.',
          'Дана каждый день проверяет погоду.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈweðə/',
      ttsText: 'weather',
    },
    tags: ['jobs', 'unit3'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-piano',
    english: 'piano',
    senseKey: 'keyboard-musical-instrument',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '피아노',
      'pianino',
      'a large musical instrument with black and white keys',
      'пианино',
    ),
    examples: [
      {
        english: 'Máté plays the piano.',
        translations: L(
          'Máté는 피아노를 연주해요.',
          'Máté pianino chaladi.',
          'Máté plays the piano.',
          'Мате играет на пианино.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/piˈænəʊ/',
      ttsText: 'piano',
    },
    tags: ['jobs', 'music', 'unit3'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-place-theatre',
    english: 'theatre',
    senseKey: 'building-for-performances',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '극장',
      'teatr',
      'a building where plays or performances are shown',
      'театр',
    ),
    examples: [
      {
        english: 'Máté works at the theatre.',
        translations: L(
          'Máté는 극장에서 일해요.',
          'Máté teatrda ishlaydi.',
          'Máté works at the theatre.',
          'Мате работает в театре.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈθɪətə/',
      ttsText: 'theatre',
    },
    tags: ['jobs', 'places', 'unit3'],
    difficulty: 2,
    isCore: true,
  },
];

export const EN_S2_UNIT3_NODE1_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Jobs
  // ===========================================================

  en_s2u3_n1_001_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'mechanic',
        native: 'mexanik',
        nativeI18n: L('정비사', 'mexanik', 'mechanic', 'механик'),
      },
      {
        text: 'cleaner',
        native: 'farrosh',
        nativeI18n: L('청소원', 'farrosh', 'cleaner', 'уборщик'),
      },
      {
        text: 'pilot',
        native: 'uchuvchi',
        nativeI18n: L('조종사', 'uchuvchi', 'pilot', 'пилот'),
      },
      {
        text: 'photographer',
        native: 'fotograf',
        nativeI18n: L('사진작가', 'fotograf', 'photographer', 'фотограф'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['jobs'],
  },

  en_s2u3_n1_002_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'student',
        native: 'talaba',
        nativeI18n: L('학생', 'talaba', 'student', 'студент'),
      },
      {
        text: 'journalist',
        native: 'jurnalist',
        nativeI18n: L('기자', 'jurnalist', 'journalist', 'журналист'),
      },
      {
        text: 'chef',
        native: 'oshpaz',
        nativeI18n: L('요리사', 'oshpaz', 'chef', 'повар'),
      },
      {
        text: 'businesswoman',
        native: 'biznes ayol',
        nativeI18n: L(
          '여성 사업가',
          'biznes ayol',
          'businesswoman',
          'бизнесвумен',
        ),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['jobs'],
  },

  en_s2u3_n1_003_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'musician',
        native: 'musiqachi',
        nativeI18n: L('음악가', 'musiqachi', 'musician', 'музыкант'),
      },
      {
        text: 'dentist',
        native: 'tish shifokori',
        nativeI18n: L('치과 의사', 'tish shifokori', 'dentist', 'стоматолог'),
      },
      {
        text: 'nurse',
        native: 'hamshira',
        nativeI18n: L('간호사', 'hamshira', 'nurse', 'медсестра'),
      },
      {
        text: 'hairdresser',
        native: 'sartarosh',
        nativeI18n: L('미용사', 'sartarosh', 'hairdresser', 'парикмахер'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['jobs'],
  },

  en_s2u3_n1_004_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A ___ repairs cars.',
    blankAnswers: ['mechanic'],
    options: ['mechanic', 'pilot', 'nurse', 'student'],
    answer: 'mechanic',
    answerTranslation: L(
      '정비사는 자동차를 수리해요.',
      'Mexanik mashinalarni ta’mirlaydi.',
      'A mechanic repairs cars.',
      'Механик ремонтирует машины.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['jobs', 'mechanic'],
  },

  en_s2u3_n1_005_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A ___ flies a plane.',
    blankAnswers: ['pilot'],
    options: ['pilot', 'chef', 'dentist', 'cleaner'],
    answer: 'pilot',
    answerTranslation: L(
      '조종사는 비행기를 조종해요.',
      'Uchuvchi samolyotni boshqaradi.',
      'A pilot flies a plane.',
      'Пилот управляет самолётом.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['jobs', 'pilot'],
  },

  en_s2u3_n1_006_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A ___ takes photos.',
    blankAnswers: ['photographer'],
    options: ['photographer', 'journalist', 'cleaner', 'nurse'],
    answer: 'photographer',
    answerTranslation: L(
      '사진작가는 사진을 찍어요.',
      'Fotograf suratga oladi.',
      'A photographer takes photos.',
      'Фотограф делает фотографии.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['jobs', 'photographer'],
  },

  en_s2u3_n1_007_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A ___ cooks food professionally.',
    blankAnswers: ['chef'],
    options: ['chef', 'pilot', 'student', 'mechanic'],
    answer: 'chef',
    answerTranslation: L(
      '요리사는 전문적으로 음식을 만들어요.',
      'Oshpaz professional ravishda ovqat tayyorlaydi.',
      'A chef cooks food professionally.',
      'Повар профессионально готовит еду.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['jobs', 'chef'],
  },

  en_s2u3_n1_008_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A ___ works with teeth.',
    blankAnswers: ['dentist'],
    options: ['dentist', 'nurse', 'hairdresser', 'musician'],
    answer: 'dentist',
    answerTranslation: L(
      '치과 의사는 치아를 치료해요.',
      'Tish shifokori tishlarni davolaydi.',
      'A dentist works with teeth.',
      'Стоматолог лечит зубы.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['jobs', 'dentist'],
  },

  en_s2u3_n1_009_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A ___ looks after people in a hospital.',
    blankAnswers: ['nurse'],
    options: ['nurse', 'pilot', 'cleaner', 'musician'],
    answer: 'nurse',
    answerTranslation: L(
      '간호사는 병원에서 사람들을 돌봐요.',
      'Hamshira kasalxonada odamlarni parvarish qiladi.',
      'A nurse looks after people in a hospital.',
      'Медсестра ухаживает за людьми в больнице.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['jobs', 'nurse'],
  },

  en_s2u3_n1_010_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A ___ cuts and styles hair.',
    blankAnswers: ['hairdresser'],
    options: ['hairdresser', 'journalist', 'chef', 'mechanic'],
    answer: 'hairdresser',
    answerTranslation: L(
      '미용사는 머리를 자르고 스타일링해요.',
      'Sartarosh sochni kesadi va turmaklaydi.',
      'A hairdresser cuts and styles hair.',
      'Парикмахер стрижёт и укладывает волосы.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['jobs', 'hairdresser'],
  },

  en_s2u3_n1_011_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A ___ writes articles for newspapers or magazines.',
    blankAnswers: ['journalist'],
    options: ['journalist', 'dentist', 'pilot', 'cleaner'],
    answer: 'journalist',
    answerTranslation: L(
      '기자는 신문이나 잡지에 기사를 써요.',
      'Jurnalist gazeta yoki jurnallar uchun maqola yozadi.',
      'A journalist writes articles for newspapers or magazines.',
      'Журналист пишет статьи для газет или журналов.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['jobs', 'journalist'],
  },

  en_s2u3_n1_012_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A ___ plays music.',
    blankAnswers: ['musician'],
    options: ['musician', 'cleaner', 'student', 'nurse'],
    answer: 'musician',
    answerTranslation: L(
      '음악가는 음악을 연주해요.',
      'Musiqachi musiqa chaladi.',
      'A musician plays music.',
      'Музыкант играет музыку.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['jobs', 'musician'],
  },

  en_s2u3_n1_013_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A ___ cleans offices or other places.',
    blankAnswers: ['cleaner'],
    options: ['cleaner', 'photographer', 'chef', 'pilot'],
    answer: 'cleaner',
    answerTranslation: L(
      '청소원은 사무실이나 다른 장소를 청소해요.',
      'Farrosh ofislar yoki boshqa joylarni tozalaydi.',
      'A cleaner cleans offices or other places.',
      'Уборщик убирает офисы и другие помещения.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['jobs', 'cleaner'],
  },

  en_s2u3_n1_014_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A ___ studies at college or university.',
    blankAnswers: ['student'],
    options: ['student', 'pilot', 'chef', 'businesswoman'],
    answer: 'student',
    answerTranslation: L(
      '학생은 대학에서 공부해요.',
      'Talaba kollej yoki universitetda o‘qiydi.',
      'A student studies at college or university.',
      'Студент учится в колледже или университете.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['jobs', 'student'],
  },

  en_s2u3_n1_015_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['is', 'a', 'She', 'businesswoman', 'pilot'],
    answer: 'She is a businesswoman',
    audioText: 'She is a businesswoman.',
    answerTranslation: L(
      '그녀는 사업가예요.',
      'U biznes ayol.',
      'She is a businesswoman.',
      'Она бизнесвумен.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['jobs'],
  },

  en_s2u3_n1_016_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['is', 'He', 'mechanic', 'a', 'nurse'],
    answer: 'He is a mechanic',
    answerTranslation: L(
      '그는 정비사예요.',
      'U mexanik.',
      'He is a mechanic.',
      'Он механик.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['jobs'],
  },

  en_s2u3_n1_017_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'She is a photographer.',
    audioText: 'She is a photographer.',
    answerI18n: L(
      '그녀는 사진작가예요',
      'U fotograf',
      'She is a photographer',
      'Она фотограф',
    ),
    options: ['She', 'is', 'a', 'photographer.'],
    optionsI18n: {
      ko: ['그녀는', '사진작가예요'],
      uz: ['U', 'fotograf'],
      en: ['She', 'is', 'a', 'photographer.'],
      ru: ['Она', 'фотограф'],
    },
    answerTranslation: L(
      '그녀는 사진작가예요.',
      'U fotograf.',
      'She is a photographer.',
      'Она фотограф.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['jobs'],
  },

  en_s2u3_n1_018_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I think the best job is a pilot.',
    audioText: 'I think the best job is a pilot.',
    answerTranslation: L(
      '저는 조종사가 가장 좋은 직업이라고 생각해요.',
      'Menimcha, eng yaxshi kasb uchuvchi.',
      'I think the best job is a pilot.',
      'Я думаю, что лучшая профессия — пилот.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['jobs', 'opinion'],
  },

  en_s2u3_n1_019_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'A journalist writes articles and meets people.',
    audioText: 'A journalist writes articles and meets people.',
    answerTranslation: L(
      '기자는 기사를 쓰고 사람들을 만나요.',
      'Jurnalist maqolalar yozadi va odamlar bilan uchrashadi.',
      'A journalist writes articles and meets people.',
      'Журналист пишет статьи и встречается с людьми.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['jobs', 'journalist'],
  },

  en_s2u3_n1_020_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'A mechanic, cleaner, pilot, photographer, student, journalist, chef, businesswoman, musician, dentist, nurse and hairdresser are all jobs.',
    audioText:
      'A mechanic, cleaner, pilot, photographer, student, journalist, chef, businesswoman, musician, dentist, nurse and hairdresser are all jobs.',
    answerTranslation: L(
      '정비사, 청소원, 조종사, 사진작가, 학생, 기자, 요리사, 사업가, 음악가, 치과 의사, 간호사와 미용사는 모두 직업이에요.',
      'Mexanik, farrosh, uchuvchi, fotograf, talaba, jurnalist, oshpaz, biznes ayol, musiqachi, tish shifokori, hamshira va sartarosh — barchasi kasblar.',
      'A mechanic, cleaner, pilot, photographer, student, journalist, chef, businesswoman, musician, dentist, nurse and hairdresser are all jobs.',
      'Механик, уборщик, пилот, фотограф, студент, журналист, повар, бизнесвумен, музыкант, стоматолог, медсестра и парикмахер — это профессии.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['jobs', 'review'],
  },

  // ===========================================================
  // Lesson 2 · Describing jobs
  // ===========================================================

  en_s2u3_n1_021_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'inside',
        native: 'ichkarida',
        nativeI18n: L('실내에서', 'ichkarida', 'inside', 'внутри'),
      },
      {
        text: 'well-paid',
        native: 'yaxshi haq to‘lanadigan',
        nativeI18n: L(
          '보수가 좋은',
          'yaxshi haq to‘lanadigan',
          'well-paid',
          'хорошо оплачиваемый',
        ),
      },
      {
        text: 'badly-paid',
        native: 'kam haq to‘lanadigan',
        nativeI18n: L(
          '보수가 낮은',
          'kam haq to‘lanadigan',
          'badly-paid',
          'плохо оплачиваемый',
        ),
      },
      {
        text: 'salary',
        native: 'maosh',
        nativeI18n: L('급여', 'maosh', 'salary', 'зарплата'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['job-description'],
  },

  en_s2u3_n1_022_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I earn a good ___.',
    blankAnswers: ['salary'],
    options: ['salary', 'camera', 'hospital', 'weather'],
    answer: 'salary',
    answerTranslation: L(
      '저는 급여를 많이 받아요.',
      'Men yaxshi maosh olaman.',
      'I earn a good salary.',
      'Я получаю хорошую зарплату.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['job-description', 'salary'],
  },

  en_s2u3_n1_023_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A nurse usually works ___.',
    blankAnswers: ['inside'],
    options: ['inside', 'salary', 'camera', 'music'],
    answer: 'inside',
    answerTranslation: L(
      '간호사는 보통 실내에서 일해요.',
      'Hamshira odatda ichkarida ishlaydi.',
      'A nurse usually works inside.',
      'Медсестра обычно работает в помещении.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['job-description', 'inside'],
  },

  en_s2u3_n1_024_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A mechanic works with his ___.',
    blankAnswers: ['hands'],
    options: ['hands', 'salary', 'magazine', 'weather'],
    answer: 'hands',
    answerTranslation: L(
      '정비사는 손으로 일해요.',
      'Mexanik qo‘llari bilan ishlaydi.',
      'A mechanic works with his hands.',
      'Механик работает руками.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['job-description', 'hands'],
  },

  en_s2u3_n1_025_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A businesswoman often works with a ___.',
    blankAnswers: ['computer'],
    options: ['computer', 'piano', 'camera', 'tooth'],
    answer: 'computer',
    answerTranslation: L(
      '사업가는 자주 컴퓨터로 일해요.',
      'Biznes ayol ko‘pincha kompyuter bilan ishlaydi.',
      'A businesswoman often works with a computer.',
      'Бизнесвумен часто работает за компьютером.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['job-description', 'computer'],
  },

  en_s2u3_n1_026_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A nurse works in a ___.',
    blankAnswers: ['hospital'],
    options: ['hospital', 'camera', 'salary', 'magazine'],
    answer: 'hospital',
    answerTranslation: L(
      '간호사는 병원에서 일해요.',
      'Hamshira kasalxonada ishlaydi.',
      'A nurse works in a hospital.',
      'Медсестра работает в больнице.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['job-description', 'hospital'],
  },

  en_s2u3_n1_027_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A photographer works with a ___.',
    blankAnswers: ['camera'],
    options: ['camera', 'salary', 'hospital', 'piano'],
    answer: 'camera',
    answerTranslation: L(
      '사진작가는 카메라로 일해요.',
      'Fotograf kamera bilan ishlaydi.',
      'A photographer works with a camera.',
      'Фотограф работает с камерой.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['job-description', 'camera'],
  },

  en_s2u3_n1_028_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A photographer can take photos for ___.',
    blankAnswers: ['magazines'],
    options: ['magazines', 'hospitals', 'salaries', 'weather'],
    answer: 'magazines',
    answerTranslation: L(
      '사진작가는 잡지용 사진을 찍을 수 있어요.',
      'Fotograf jurnallar uchun suratga olishi mumkin.',
      'A photographer can take photos for magazines.',
      'Фотограф может снимать для журналов.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['job-description', 'magazine'],
  },

  en_s2u3_n1_029_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A job with a good salary is ___.',
    blankAnswers: ['well-paid'],
    options: ['well-paid', 'badly-paid', 'inside', 'unusual'],
    answer: 'well-paid',
    answerTranslation: L(
      '급여가 좋은 직업은 보수가 좋은 직업이에요.',
      'Yaxshi maoshli ish yaxshi haq to‘lanadigan ish.',
      'A job with a good salary is well-paid.',
      'Работа с хорошей зарплатой хорошо оплачивается.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['job-description', 'well-paid'],
  },

  en_s2u3_n1_030_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A job with a low salary is ___.',
    blankAnswers: ['badly-paid'],
    options: ['badly-paid', 'well-paid', 'inside', 'unusual'],
    answer: 'badly-paid',
    answerTranslation: L(
      '급여가 낮은 직업은 보수가 낮아요.',
      'Kam maoshli ishga kam haq to‘lanadi.',
      'A job with a low salary is badly-paid.',
      'Работа с низкой зарплатой плохо оплачивается.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['job-description', 'badly-paid'],
  },

  en_s2u3_n1_031_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '직업과 가장 잘 어울리는 설명을 연결하세요.',
      'Kasbni unga mos tavsif bilan moslang.',
      'Match each job with the best description.',
      'Соедините профессию с подходящим описанием.',
    ),
    pairs: [
      {
        text: 'nurse',
        native: 'hospital',
        nativeI18n: L('병원', 'kasalxona', 'hospital', 'больница'),
      },
      {
        text: 'mechanic',
        native: 'hands',
        nativeI18n: L('손', 'qo‘llar', 'hands', 'руки'),
      },
      {
        text: 'photographer',
        native: 'camera',
        nativeI18n: L('카메라', 'kamera', 'camera', 'камера'),
      },
      {
        text: 'businesswoman',
        native: 'computer',
        nativeI18n: L('컴퓨터', 'kompyuter', 'computer', 'компьютер'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['job-description'],
  },

  en_s2u3_n1_032_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['works', 'hospital', 'a', 'in', 'She'],
    answer: 'She works in a hospital',
    audioText: 'She works in a hospital.',
    answerTranslation: L(
      '그녀는 병원에서 일해요.',
      'U kasalxonada ishlaydi.',
      'She works in a hospital.',
      'Она работает в больнице.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['job-description'],
  },

  en_s2u3_n1_033_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['works', 'with', 'computer', 'a', 'He', 'hands'],
    answer: 'He works with a computer',
    answerTranslation: L(
      '그는 컴퓨터로 일해요.',
      'U kompyuter bilan ishlaydi.',
      'He works with a computer.',
      'Он работает за компьютером.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['job-description'],
  },

  en_s2u3_n1_034_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'My job is well-paid.',
    audioText: 'My job is well-paid.',
    answerI18n: L(
      '제 직업은 보수가 좋아요',
      'Mening ishimga yaxshi haq to‘lanadi',
      'My job is well-paid',
      'Моя работа хорошо оплачивается',
    ),
    options: ['My', 'job', 'is', 'well-paid.'],
    optionsI18n: {
      ko: ['제', '직업은', '보수가', '좋아요'],
      uz: ['Mening', 'ishimga', 'yaxshi', 'haq', 'to‘lanadi'],
      en: ['My', 'job', 'is', 'well-paid.'],
      ru: ['Моя', 'работа', 'хорошо', 'оплачивается'],
    },
    answerTranslation: L(
      '제 직업은 보수가 좋아요.',
      'Mening ishimga yaxshi haq to‘lanadi.',
      'My job is well-paid.',
      'Моя работа хорошо оплачивается.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['job-description'],
  },

  en_s2u3_n1_035_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What is your job like?' }],
    options: [
      'It’s interesting and well-paid.',
      'It interesting and pay well.',
      'It does well-paid.',
      'It is salary.',
    ],
    answer: 'It’s interesting and well-paid.',
    answerTranslation: L(
      '흥미롭고 보수가 좋아요.',
      'U qiziqarli va yaxshi haq to‘lanadi.',
      'It’s interesting and well-paid.',
      'Она интересная и хорошо оплачивается.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['job-description'],
  },

  en_s2u3_n1_036_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What do you use at work?',
    options: ['I', 'use', 'a', 'computer', 'salary', 'inside'],
    answer: 'I use a computer',
    answerTranslation: L(
      '저는 컴퓨터를 사용해요.',
      'Men kompyuterdan foydalanaman.',
      'I use a computer.',
      'Я использую компьютер.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['job-description'],
  },

  en_s2u3_n1_037_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'A mechanic works with his hands.',
    audioText: 'A mechanic works with his hands.',
    answerTranslation: L(
      '정비사는 손으로 일해요.',
      'Mexanik qo‘llari bilan ishlaydi.',
      'A mechanic works with his hands.',
      'Механик работает руками.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['job-description'],
  },

  en_s2u3_n1_038_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'A nurse works inside in a hospital.',
    audioText: 'A nurse works inside in a hospital.',
    answerTranslation: L(
      '간호사는 병원 실내에서 일해요.',
      'Hamshira kasalxonada ichkarida ishlaydi.',
      'A nurse works inside in a hospital.',
      'Медсестра работает в помещении больницы.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['job-description'],
  },

  en_s2u3_n1_039_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'A photographer works with a camera and travels a lot.',
    audioText: 'A photographer works with a camera and travels a lot.',
    answerTranslation: L(
      '사진작가는 카메라로 일하고 여행을 많이 해요.',
      'Fotograf kamera bilan ishlaydi va ko‘p sayohat qiladi.',
      'A photographer works with a camera and travels a lot.',
      'Фотограф работает с камерой и много путешествует.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['job-description'],
  },

  en_s2u3_n1_040_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Jobs can be inside or outside, well-paid or badly-paid, and people can work with computers or with their hands.',
    audioText:
      'Jobs can be inside or outside, well-paid or badly-paid, and people can work with computers or with their hands.',
    answerTranslation: L(
      '직업은 실내나 실외에서 할 수 있고 보수가 좋거나 낮을 수 있으며 컴퓨터나 손을 사용해서 일할 수도 있어요.',
      'Ishlar ichkarida yoki tashqarida, yaxshi yoki kam haq to‘lanadigan bo‘lishi mumkin, odamlar kompyuter yoki qo‘llari bilan ishlashi mumkin.',
      'Jobs can be inside or outside, well-paid or badly-paid, and people can work with computers or with their hands.',
      'Работа может быть в помещении или на улице, хорошо или плохо оплачиваемой, а работать можно за компьютером или руками.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['job-description', 'review'],
  },

  // ===========================================================
  // Lesson 3 · Yes / No questions
  // ===========================================================

  en_s2u3_n1_041_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ you a pilot?',
    blankAnswers: ['Are'],
    options: ['Are', 'Do', 'Does', 'Is'],
    answer: 'Are',
    answerTranslation: L(
      '당신은 조종사인가요?',
      'Siz uchuvchimisiz?',
      'Are you a pilot?',
      'Вы пилот?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['yes-no-questions', 'be'],
  },

  en_s2u3_n1_042_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ your job very difficult?',
    blankAnswers: ['Is'],
    options: ['Is', 'Do', 'Does', 'Are'],
    answer: 'Is',
    answerTranslation: L(
      '당신의 직업은 매우 어려운가요?',
      'Ishingiz juda qiyinmi?',
      'Is your job very difficult?',
      'Ваша работа очень сложная?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['yes-no-questions', 'be'],
  },

  en_s2u3_n1_043_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ your job make you happy?',
    blankAnswers: ['Does'],
    options: ['Does', 'Do', 'Is', 'Are'],
    answer: 'Does',
    answerTranslation: L(
      '당신의 직업은 당신을 행복하게 하나요?',
      'Ishingiz sizni baxtli qiladimi?',
      'Does your job make you happy?',
      'Ваша работа делает вас счастливым?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['yes-no-questions', 'does'],
  },

  en_s2u3_n1_044_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ you have an unusual job?',
    blankAnswers: ['Do'],
    options: ['Do', 'Does', 'Are', 'Is'],
    answer: 'Do',
    answerTranslation: L(
      '당신은 특이한 직업을 가지고 있나요?',
      'Sizning g‘ayrioddiy kasbingiz bormi?',
      'Do you have an unusual job?',
      'У вас необычная работа?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['yes-no-questions', 'do'],
  },

  en_s2u3_n1_045_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ you bored at work?',
    blankAnswers: ['Are'],
    options: ['Are', 'Do', 'Does', 'Is'],
    answer: 'Are',
    answerTranslation: L(
      '직장에서 지루한가요?',
      'Ishda zerikasizmi?',
      'Are you bored at work?',
      'Вам скучно на работе?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['yes-no-questions', 'be'],
  },

  en_s2u3_n1_046_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ all your work days the same?',
    blankAnswers: ['Are'],
    options: ['Are', 'Do', 'Does', 'Is'],
    answer: 'Are',
    answerTranslation: L(
      '모든 근무일이 똑같나요?',
      'Barcha ish kunlaringiz bir xilmi?',
      'Are all your work days the same?',
      'Все ваши рабочие дни одинаковые?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['yes-no-questions', 'be'],
  },

  en_s2u3_n1_047_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ you enjoy helping people?',
    blankAnswers: ['Do'],
    options: ['Do', 'Does', 'Are', 'Is'],
    answer: 'Do',
    answerTranslation: L(
      '사람들을 돕는 것을 좋아하나요?',
      'Odamlarga yordam berishni yoqtirasizmi?',
      'Do you enjoy helping people?',
      'Вам нравится помогать людям?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['yes-no-questions', 'do'],
  },

  en_s2u3_n1_048_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ you speak a foreign language?',
    blankAnswers: ['Do'],
    options: ['Do', 'Are', 'Does', 'Is'],
    answer: 'Do',
    answerTranslation: L(
      '외국어를 하나 할 수 있나요?',
      'Xorijiy tilda gapirasizmi?',
      'Do you speak a foreign language?',
      'Вы говорите на иностранном языке?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['yes-no-questions', 'do'],
  },

  en_s2u3_n1_049_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ a job in education interest you?',
    blankAnswers: ['Does'],
    options: ['Does', 'Do', 'Is', 'Are'],
    answer: 'Does',
    answerTranslation: L(
      '교육 분야의 직업에 관심이 있나요?',
      'Ta’lim sohasidagi ish sizni qiziqtiradimi?',
      'Does a job in education interest you?',
      'Вас интересует работа в сфере образования?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['yes-no-questions', 'does'],
  },

  en_s2u3_n1_050_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Are you a pilot?' }],
    options: ['Yes, I am.', 'Yes, I do.', 'Yes, I does.', 'Yes, I is.'],
    answer: 'Yes, I am.',
    answerTranslation: L('네, 맞아요.', 'Ha.', 'Yes, I am.', 'Да.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['yes-no-questions', 'short-answer'],
  },

  en_s2u3_n1_051_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Is your job difficult?' }],
    options: [
      'No, it isn’t.',
      'No, it doesn’t.',
      'No, it don’t.',
      'No, it aren’t.',
    ],
    answer: 'No, it isn’t.',
    answerTranslation: L('아니요.', 'Yo‘q.', 'No, it isn’t.', 'Нет.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['yes-no-questions', 'short-answer'],
  },

  en_s2u3_n1_052_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Does your job make you happy?' }],
    options: ['Yes, it does.', 'Yes, it is.', 'Yes, it do.', 'Yes, it are.'],
    answer: 'Yes, it does.',
    answerTranslation: L('네.', 'Ha.', 'Yes, it does.', 'Да.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['yes-no-questions', 'short-answer'],
  },

  en_s2u3_n1_053_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Do you have an unusual job?' }],
    options: ['No, I don’t.', 'No, I’m not.', 'No, I doesn’t.', 'No, I isn’t.'],
    answer: 'No, I don’t.',
    answerTranslation: L('아니요.', 'Yo‘q.', 'No, I don’t.', 'Нет.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['yes-no-questions', 'short-answer'],
  },

  en_s2u3_n1_054_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['you', 'a', 'Do', 'job', 'have'],
    answer: 'Do you have a job',
    audioText: 'Do you have a job?',
    answerTranslation: L(
      '직업이 있나요?',
      'Ishingiz bormi?',
      'Do you have a job?',
      'У вас есть работа?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['yes-no-questions'],
  },

  en_s2u3_n1_055_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['he', 'Does', 'piano', 'the', 'play'],
    answer: 'Does he play the piano',
    audioText: 'Does he play the piano?',
    answerTranslation: L(
      '그는 피아노를 연주하나요?',
      'U pianino chaladimi?',
      'Does he play the piano?',
      'Он играет на пианино?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['yes-no-questions', 'does'],
  },

  en_s2u3_n1_056_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['she', 'Does', 'weather', 'check', 'the', 'is'],
    answer: 'Does she check the weather',
    answerTranslation: L(
      '그녀는 날씨를 확인하나요?',
      'U ob-havoni tekshiradimi?',
      'Does she check the weather?',
      'Она проверяет погоду?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['yes-no-questions', 'does'],
  },

  en_s2u3_n1_057_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Do they like their jobs?',
    audioText: 'Do they like their jobs?',
    answerI18n: L(
      '그들은 자기 직업을 좋아하나요',
      'Ular o‘z ishlarini yoqtiradimi',
      'Do they like their jobs',
      'Им нравится их работа',
    ),
    options: ['Do', 'they', 'like', 'their', 'jobs?'],
    optionsI18n: {
      ko: ['그들은', '자기', '직업을', '좋아하나요'],
      uz: ['Ular', 'o‘z', 'ishlarini', 'yoqtiradimi'],
      en: ['Do', 'they', 'like', 'their', 'jobs?'],
      ru: ['Им', 'нравится', 'их', 'работа'],
    },
    answerTranslation: L(
      '그들은 자기 직업을 좋아하나요?',
      'Ular o‘z ishlarini yoqtiradimi?',
      'Do they like their jobs?',
      'Им нравится их работа?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['yes-no-questions'],
  },

  en_s2u3_n1_058_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: '',
    sentenceSuffix: ' he sell tickets?',
    answer: 'Does',
    answerTranslation: L(
      '그는 표를 판매하나요?',
      'U chipta sotadimi?',
      'Does he sell tickets?',
      'Он продаёт билеты?',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Use Does with he in a present simple yes/no question.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['yes-no-questions', 'typing'],
  },

  en_s2u3_n1_059_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Do you have a job?',
    audioText: 'Do you have a job?',
    answerTranslation: L(
      '직업이 있나요?',
      'Ishingiz bormi?',
      'Do you have a job?',
      'У вас есть работа?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['yes-no-questions'],
  },

  en_s2u3_n1_060_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Use are or is with be, and use do or does with other present simple verbs.',
    audioText:
      'Use are or is with be, and use do or does with other present simple verbs.',
    answerTranslation: L(
      'be동사 질문에는 are나 is를 쓰고, 다른 현재형 동사 질문에는 do나 does를 사용해요.',
      'Be fe’li bilan are yoki is, boshqa hozirgi zamon fe’llari bilan do yoki does ishlatiladi.',
      'Use are or is with be, and use do or does with other present simple verbs.',
      'С глаголом be используйте are или is, а с другими глаголами Present Simple — do или does.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['yes-no-questions', 'review'],
  },

  // ===========================================================
  // Lesson 4 · Unusual jobs
  // ===========================================================

  en_s2u3_n1_061_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Máté is a piano ___.',
    blankAnswers: ['player'],
    options: ['player', 'weather', 'camera', 'salary'],
    answer: 'player',
    answerTranslation: L(
      'Máté는 피아노 연주자예요.',
      'Máté pianino ijrochisi.',
      'Máté is a piano player.',
      'Мате — пианист.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['unusual-jobs', 'mate'],
  },

  en_s2u3_n1_062_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Máté works at the ___.',
    blankAnswers: ['theatre'],
    options: ['theatre', 'hospital', 'weather', 'salary'],
    answer: 'theatre',
    answerTranslation: L(
      'Máté는 극장에서 일해요.',
      'Máté teatrda ishlaydi.',
      'Máté works at the theatre.',
      'Мате работает в театре.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['unusual-jobs', 'mate'],
  },

  en_s2u3_n1_063_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Dana checks the ___ every day.',
    blankAnswers: ['weather'],
    options: ['weather', 'salary', 'piano', 'magazine'],
    answer: 'weather',
    answerTranslation: L(
      'Dana는 매일 날씨를 확인해요.',
      'Dana har kuni ob-havoni tekshiradi.',
      'Dana checks the weather every day.',
      'Дана каждый день проверяет погоду.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['unusual-jobs', 'dana'],
  },

  en_s2u3_n1_064_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ Dana a police officer?',
    blankAnswers: ['Is'],
    options: ['Is', 'Does', 'Do', 'Are'],
    answer: 'Is',
    answerTranslation: L(
      'Dana는 경찰관인가요?',
      'Dana politsiya xodimimi?',
      'Is Dana a police officer?',
      'Дана полицейский?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unusual-jobs', 'yes-no-questions'],
  },

  en_s2u3_n1_065_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Is Dana a police officer?' }],
    options: [
      'No, she isn’t.',
      'No, she doesn’t.',
      'No, she don’t.',
      'No, she aren’t.',
    ],
    answer: 'No, she isn’t.',
    answerTranslation: L('아니요.', 'Yo‘q.', 'No, she isn’t.', 'Нет.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['unusual-jobs', 'short-answer'],
  },

  en_s2u3_n1_066_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ Máté play fast music?',
    blankAnswers: ['Does'],
    options: ['Does', 'Do', 'Is', 'Are'],
    answer: 'Does',
    answerTranslation: L(
      'Máté는 빠른 음악을 연주하나요?',
      'Máté tez musiqa chaladimi?',
      'Does Máté play fast music?',
      'Мате играет быструю музыку?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['unusual-jobs', 'mate'],
  },

  en_s2u3_n1_067_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Does Máté play fast music?' }],
    options: [
      'No, he doesn’t.',
      'No, he isn’t.',
      'No, he don’t.',
      'No, he aren’t.',
    ],
    answer: 'No, he doesn’t.',
    answerTranslation: L('아니요.', 'Yo‘q.', 'No, he doesn’t.', 'Нет.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['unusual-jobs', 'short-answer'],
  },

  en_s2u3_n1_068_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ Dana work in a big office?',
    blankAnswers: ['Does'],
    options: ['Does', 'Is', 'Do', 'Are'],
    answer: 'Does',
    answerTranslation: L(
      'Dana는 큰 사무실에서 일하나요?',
      'Dana katta ofisda ishlaydimi?',
      'Does Dana work in a big office?',
      'Дана работает в большом офисе?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['unusual-jobs', 'dana'],
  },

  en_s2u3_n1_069_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Does Dana like her job?' }],
    options: [
      'Yes, she does.',
      'Yes, she is.',
      'Yes, she do.',
      'Yes, she are.',
    ],
    answer: 'Yes, she does.',
    answerTranslation: L('네.', 'Ha.', 'Yes, she does.', 'Да.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['unusual-jobs', 'short-answer'],
  },

  en_s2u3_n1_070_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ Dana and Máté have unusual jobs?',
    blankAnswers: ['Do'],
    options: ['Do', 'Does', 'Are', 'Is'],
    answer: 'Do',
    answerTranslation: L(
      'Dana와 Máté는 특이한 직업을 가지고 있나요?',
      'Dana va Máténing g‘ayrioddiy kasblari bormi?',
      'Do Dana and Máté have unusual jobs?',
      'У Даны и Мате необычные профессии?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['unusual-jobs'],
  },

  en_s2u3_n1_071_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Do Dana and Máté have unusual jobs?' },
    ],
    options: [
      'Yes, they do.',
      'Yes, they are.',
      'Yes, they does.',
      'Yes, they is.',
    ],
    answer: 'Yes, they do.',
    answerTranslation: L('네.', 'Ha.', 'Yes, they do.', 'Да.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['unusual-jobs', 'short-answer'],
  },

  en_s2u3_n1_072_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Nancy Rica Schiff is a ___.',
    blankAnswers: ['photographer'],
    options: ['photographer', 'pilot', 'cleaner', 'chef'],
    answer: 'photographer',
    answerTranslation: L(
      'Nancy Rica Schiff는 사진작가예요.',
      'Nancy Rica Schiff fotograf.',
      'Nancy Rica Schiff is a photographer.',
      'Нэнси Рика Шифф — фотограф.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['nancy', 'reading'],
  },

  en_s2u3_n1_073_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Does Nancy work from home?' }],
    options: [
      'No, she doesn’t.',
      'No, she isn’t.',
      'No, she don’t.',
      'No, she aren’t.',
    ],
    answer: 'No, she doesn’t.',
    answerTranslation: L('아니요.', 'Yo‘q.', 'No, she doesn’t.', 'Нет.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['nancy', 'reading'],
  },

  en_s2u3_n1_074_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Is Nancy’s job unusual?' }],
    options: [
      'No, it isn’t.',
      'No, it doesn’t.',
      'No, she doesn’t.',
      'No, they aren’t.',
    ],
    answer: 'No, it isn’t.',
    answerTranslation: L('아니요.', 'Yo‘q.', 'No, it isn’t.', 'Нет.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['nancy', 'reading'],
  },

  en_s2u3_n1_075_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Does Nancy use a camera at work?' }],
    options: [
      'Yes, she does.',
      'Yes, she is.',
      'Yes, she do.',
      'Yes, it does.',
    ],
    answer: 'Yes, she does.',
    answerTranslation: L('네.', 'Ha.', 'Yes, she does.', 'Да.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['nancy', 'reading'],
  },

  en_s2u3_n1_076_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Does Nancy’s job include a lot of travel?' },
    ],
    options: ['Yes, it does.', 'Yes, she is.', 'No, it isn’t.', 'Yes, it do.'],
    answer: 'Yes, it does.',
    answerTranslation: L('네.', 'Ha.', 'Yes, it does.', 'Да.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['nancy', 'reading'],
  },

  en_s2u3_n1_077_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Are all of Nancy’s photos in her two books?' },
    ],
    options: [
      'No, they aren’t.',
      'No, they don’t.',
      'No, it isn’t.',
      'No, she doesn’t.',
    ],
    answer: 'No, they aren’t.',
    answerTranslation: L('아니요.', 'Yo‘q.', 'No, they aren’t.', 'Нет.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['nancy', 'reading'],
  },

  en_s2u3_n1_078_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Nancy travels around America with her camera and takes photographs of people at work.',
    audioText:
      'Nancy travels around America with her camera and takes photographs of people at work.',
    answerTranslation: L(
      'Nancy는 카메라를 가지고 미국을 여행하며 일하는 사람들의 사진을 찍어요.',
      'Nancy kamerasi bilan Amerika bo‘ylab sayohat qilib, ishlayotgan odamlarni suratga oladi.',
      'Nancy travels around America with her camera and takes photographs of people at work.',
      'Нэнси путешествует по Америке с камерой и фотографирует людей за работой.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['nancy', 'reading'],
  },

  en_s2u3_n1_079_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Do and does are usually not stressed in questions, but they are stressed in short answers.',
    audioText:
      'Do and does are usually not stressed in questions, but they are stressed in short answers.',
    answerTranslation: L(
      'do와 does는 질문에서는 보통 강세를 받지 않지만 짧은 대답에서는 강세를 받아요.',
      'Do va does savollarda odatda urg‘u olmaydi, qisqa javoblarda esa urg‘u oladi.',
      'Do and does are usually not stressed in questions, but they are stressed in short answers.',
      'Do и does обычно не ударные в вопросах, но получают ударение в кратких ответах.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['pronunciation', 'do-does'],
  },

  en_s2u3_n1_080_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Do they like their jobs? Yes, they do. Does he play the piano? Yes, he does.',
    audioText:
      'Do they like their jobs? Yes, they do. Does he play the piano? Yes, he does.',
    answerTranslation: L(
      '그들은 자기 직업을 좋아하나요? 네. 그는 피아노를 연주하나요? 네.',
      'Ular o‘z ishlarini yoqtiradimi? Ha. U pianino chaladimi? Ha.',
      'Do they like their jobs? Yes, they do. Does he play the piano? Yes, he does.',
      'Им нравится их работа? Да. Он играет на пианино? Да.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['unit3', 'node-review'],
  },
};

// ─────────────────────────────────────────────────────────────
// Node 1
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT3_NODE1 = {
  title: L(
    '직업과 Yes/No 질문',
    'Kasblar va Yes/No savollar',
    'Jobs and yes/no questions',
    'Профессии и вопросы Yes/No',
  ),
  section: 2,
  unit: 3,
  order: 1,
  isActive: true,

  lessons: [
    {
      title: L('무슨 일을 하나요?', 'Qanday kasblar bor?', 'Jobs', 'Профессии'),
      description: L(
        '사업가, 요리사, 청소원, 치과 의사, 미용사, 기자, 정비사, 음악가, 간호사, 사진작가, 조종사와 학생 등 3.1의 핵심 직업 어휘를 익혀요.',
        '3.1 dagi biznesmen, oshpaz, farrosh, tish shifokori, sartarosh, jurnalist, mexanik, musiqachi, hamshira, fotograf, uchuvchi va talaba kabi kasblarni o‘rganasiz.',
        'Learn the core job vocabulary from 3.1.',
        'Изучаем основную лексику профессий из 3.1.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 1,
      questions: [
        'en_s2u3_n1_001_word_matching',
        'en_s2u3_n1_002_word_matching',
        'en_s2u3_n1_003_word_matching',
        'en_s2u3_n1_004_fill_in_blank',
        'en_s2u3_n1_005_fill_in_blank',
        'en_s2u3_n1_006_fill_in_blank',
        'en_s2u3_n1_007_fill_in_blank',
        'en_s2u3_n1_008_fill_in_blank',
        'en_s2u3_n1_009_fill_in_blank',
        'en_s2u3_n1_010_fill_in_blank',
        'en_s2u3_n1_011_fill_in_blank',
        'en_s2u3_n1_012_fill_in_blank',
        'en_s2u3_n1_013_fill_in_blank',
        'en_s2u3_n1_014_fill_in_blank',
        'en_s2u3_n1_015_word_arrange',
        'en_s2u3_n1_016_translate_builder',
        'en_s2u3_n1_017_sentence_builder',
        'en_s2u3_n1_018_speaking',
        'en_s2u3_n1_019_speaking',
        'en_s2u3_n1_020_speaking',
      ],
    },

    {
      title: L(
        '어떤 직업인가요?',
        'Ish qanday?',
        'Describing jobs',
        'Описание работы',
      ),
      description: L(
        '실내·실외 근무, 보수, 컴퓨터나 손 사용처럼 직업의 특징을 설명하는 표현을 익혀요.',
        'Ichkarida yoki tashqarida ishlash, maosh, kompyuter yoki qo‘l bilan ishlash kabi ish xususiyatlarini o‘rganasiz.',
        'Describe jobs using workplace, pay and the tools people use.',
        'Учимся описывать работу: место, оплату и используемые инструменты.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 2,
      questions: [
        'en_s2u3_n1_021_word_matching',
        'en_s2u3_n1_022_fill_in_blank',
        'en_s2u3_n1_023_fill_in_blank',
        'en_s2u3_n1_024_fill_in_blank',
        'en_s2u3_n1_025_fill_in_blank',
        'en_s2u3_n1_026_fill_in_blank',
        'en_s2u3_n1_027_fill_in_blank',
        'en_s2u3_n1_028_fill_in_blank',
        'en_s2u3_n1_029_fill_in_blank',
        'en_s2u3_n1_030_fill_in_blank',
        'en_s2u3_n1_031_word_matching',
        'en_s2u3_n1_032_word_arrange',
        'en_s2u3_n1_033_translate_builder',
        'en_s2u3_n1_034_sentence_builder',
        'en_s2u3_n1_035_dialog_complete',
        'en_s2u3_n1_036_reply_builder',
        'en_s2u3_n1_037_speaking',
        'en_s2u3_n1_038_speaking',
        'en_s2u3_n1_039_speaking',
        'en_s2u3_n1_040_speaking',
      ],
    },

    {
      title: L(
        'Yes/No 질문하기',
        'Yes/No savollar',
        'Yes/no questions',
        'Вопросы Yes/No',
      ),
      description: L(
        'be동사에는 Are/Is를, 일반동사에는 Do/Does를 사용해서 현재형 Yes/No 질문과 짧은 대답을 만들어요.',
        'Be bilan Are/Is, boshqa fe’llar bilan Do/Does ishlatib Yes/No savollar va qisqa javoblar tuzasiz.',
        'Make present simple yes/no questions and short answers with Are, Is, Do and Does.',
        'Строим вопросы Yes/No и краткие ответы с Are, Is, Do и Does.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 3,
      questions: [
        'en_s2u3_n1_041_fill_in_blank',
        'en_s2u3_n1_042_fill_in_blank',
        'en_s2u3_n1_043_fill_in_blank',
        'en_s2u3_n1_044_fill_in_blank',
        'en_s2u3_n1_045_fill_in_blank',
        'en_s2u3_n1_046_fill_in_blank',
        'en_s2u3_n1_047_fill_in_blank',
        'en_s2u3_n1_048_fill_in_blank',
        'en_s2u3_n1_049_fill_in_blank',
        'en_s2u3_n1_050_dialog_complete',
        'en_s2u3_n1_051_dialog_complete',
        'en_s2u3_n1_052_dialog_complete',
        'en_s2u3_n1_053_dialog_complete',
        'en_s2u3_n1_054_word_arrange',
        'en_s2u3_n1_055_word_arrange',
        'en_s2u3_n1_056_translate_builder',
        'en_s2u3_n1_057_sentence_builder',
        'en_s2u3_n1_058_type_answer',
        'en_s2u3_n1_059_speaking',
        'en_s2u3_n1_060_speaking',
      ],
    },

    {
      title: L(
        '특이한 직업',
        'G‘ayrioddiy kasblar',
        'Unusual jobs',
        'Необычные профессии',
      ),
      description: L(
        'Máté와 Dana의 특이한 직업, 사진작가 Nancy Rica Schiff의 글을 통해 Yes/No 질문과 짧은 대답을 복습하고 do/does의 발음을 익혀요.',
        'Máté, Dana va fotograf Nancy Rica Schiff haqidagi materiallar orqali Yes/No savollar, qisqa javoblar va do/does talaffuzini mashq qilasiz.',
        'Review yes/no questions through Máté, Dana and photographer Nancy Rica Schiff, and practise the pronunciation of do and does.',
        'Повторяем вопросы Yes/No на материалах о Мате, Дане и фотографе Нэнси Рика Шифф и тренируем произношение do/does.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 4,
      questions: [
        'en_s2u3_n1_061_fill_in_blank',
        'en_s2u3_n1_062_fill_in_blank',
        'en_s2u3_n1_063_fill_in_blank',
        'en_s2u3_n1_064_fill_in_blank',
        'en_s2u3_n1_065_dialog_complete',
        'en_s2u3_n1_066_fill_in_blank',
        'en_s2u3_n1_067_dialog_complete',
        'en_s2u3_n1_068_fill_in_blank',
        'en_s2u3_n1_069_dialog_complete',
        'en_s2u3_n1_070_fill_in_blank',
        'en_s2u3_n1_071_dialog_complete',
        'en_s2u3_n1_072_fill_in_blank',
        'en_s2u3_n1_073_dialog_complete',
        'en_s2u3_n1_074_dialog_complete',
        'en_s2u3_n1_075_dialog_complete',
        'en_s2u3_n1_076_dialog_complete',
        'en_s2u3_n1_077_dialog_complete',
        'en_s2u3_n1_078_speaking',
        'en_s2u3_n1_079_speaking',
        'en_s2u3_n1_080_speaking',
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Section 2 · Unit 3 · Node 2
// 3.2 What do you do?
//
// Coverage
// - work vocabulary
// - company / boss / manager / colleague
// - office / factory
// - freelance
// - unemployed / retired
// - full-time / part-time
// - earn / money
// - Pierre and his family
// - place of work / hours / money / people / company-no company
//
// Wh-questions:
// - what
// - who
// - where
// - when
// - why
// - how
// - how often
// - what time
//
// Reading:
// - police officer interview
// - stand-up meetings
//
// IMPORTANT:
// - 기존 Node에서 등록한 job / hospital / salary / meeting / hour 등은
//   WORDS에 중복 등록하지 않고 재사용.
// - "work from home", "work for a company", "long hours",
//   "stand-up meeting" 등은 phrase headword로 등록하지 않음.
//
// 4 lessons × 20 questions = 80
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT3_NODE2_WORDS = [
  {
    code: 'en-noun-company',
    english: 'company',
    senseKey: 'business-organization',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('회사', 'kompaniya', 'a business organization', 'компания'),
    examples: [
      {
        english: 'He works for a big company.',
        translations: L(
          '그는 큰 회사에서 일해요.',
          'U katta kompaniyada ishlaydi.',
          'He works for a big company.',
          'Он работает в большой компании.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkʌmpəni/',
      ttsText: 'company',
    },
    tags: ['work', 'unit3'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-person-boss',
    english: 'boss',
    senseKey: 'person-in-charge-at-work',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '상사; 사장',
      'boshliq',
      'the person who is in charge of you at work',
      'начальник',
    ),
    examples: [
      {
        english: 'I do not have a boss.',
        translations: L(
          '저는 상사가 없어요.',
          'Mening boshlig‘im yo‘q.',
          'I do not have a boss.',
          'У меня нет начальника.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/bɒs/',
      ttsText: 'boss',
    },
    tags: ['work', 'people', 'unit3'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-person-manager',
    english: 'manager',
    senseKey: 'person-managing-workplace',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '관리자; 매니저',
      'menejer',
      'a person who manages a business or group of workers',
      'менеджер',
    ),
    examples: [
      {
        english: 'She is a manager.',
        translations: L(
          '그녀는 관리자예요.',
          'U menejer.',
          'She is a manager.',
          'Она менеджер.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈmænɪdʒə/',
      ttsText: 'manager',
    },
    tags: ['work', 'people', 'unit3'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-person-colleague',
    english: 'colleague',
    senseKey: 'person-you-work-with',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('직장 동료', 'hamkasb', 'a person you work with', 'коллега'),
    examples: [
      {
        english: 'I work with five colleagues.',
        translations: L(
          '저는 다섯 명의 동료와 일해요.',
          'Men besh hamkasb bilan ishlayman.',
          'I work with five colleagues.',
          'Я работаю с пятью коллегами.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkɒliːɡ/',
      ttsText: 'colleague',
    },
    tags: ['work', 'people', 'unit3'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-place-factory',
    english: 'factory',
    senseKey: 'building-where-products-made',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '공장',
      'zavod',
      'a building where products are made',
      'фабрика; завод',
    ),
    examples: [
      {
        english: 'His father works in a factory.',
        translations: L(
          '그의 아버지는 공장에서 일해요.',
          'Uning otasi zavodda ishlaydi.',
          'His father works in a factory.',
          'Его отец работает на заводе.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈfæktəri/',
      ttsText: 'factory',
    },
    tags: ['work', 'places', 'unit3'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-place-office',
    english: 'office',
    senseKey: 'place-for-office-work',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '사무실',
      'ofis',
      'a room or building where people do office work',
      'офис',
    ),
    examples: [
      {
        english: 'She works in a big office.',
        translations: L(
          '그녀는 큰 사무실에서 일해요.',
          'U katta ofisda ishlaydi.',
          'She works in a big office.',
          'Она работает в большом офисе.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈɒfɪs/',
      ttsText: 'office',
    },
    tags: ['work', 'places', 'unit3'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-freelance',
    english: 'freelance',
    senseKey: 'working-independently',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '프리랜서의; 독립적으로 일하는',
      'frilanser',
      'working independently for different people or companies',
      'внештатный',
    ),
    examples: [
      {
        english: 'Pierre works freelance.',
        translations: L(
          'Pierre는 프리랜서로 일해요.',
          'Pierre frilanser bo‘lib ishlaydi.',
          'Pierre works freelance.',
          'Пьер работает фрилансером.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈfriːlɑːns/',
      ttsText: 'freelance',
    },
    tags: ['work', 'unit3'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-adjective-unemployed',
    english: 'unemployed',
    senseKey: 'without-a-job',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('실업 상태인', 'ishsiz', 'without a job', 'безработный'),
    examples: [
      {
        english: 'His brother is unemployed.',
        translations: L(
          '그의 남동생은 실업 상태예요.',
          'Uning ukasi ishsiz.',
          'His brother is unemployed.',
          'Его брат безработный.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌʌnɪmˈplɔɪd/',
      ttsText: 'unemployed',
    },
    tags: ['work', 'employment', 'unit3'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-adjective-retired',
    english: 'retired',
    senseKey: 'stopped-working-because-of-age',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '은퇴한',
      'nafaqadagi',
      'having stopped working, usually because of age',
      'на пенсии',
    ),
    examples: [
      {
        english: 'His grandfather is retired.',
        translations: L(
          '그의 할아버지는 은퇴했어요.',
          'Uning bobosi nafaqada.',
          'His grandfather is retired.',
          'Его дедушка на пенсии.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/rɪˈtaɪəd/',
      ttsText: 'retired',
    },
    tags: ['work', 'employment', 'unit3'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-adverb-full-time',
    english: 'full-time',
    senseKey: 'working-normal-full-hours',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L(
      '풀타임으로',
      'to‘liq ish vaqtida',
      'for the normal number of hours in a working week',
      'полный рабочий день',
    ),
    examples: [
      {
        english: 'She works full-time.',
        translations: L(
          '그녀는 풀타임으로 일해요.',
          'U to‘liq ish vaqtida ishlaydi.',
          'She works full-time.',
          'Она работает полный рабочий день.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌfʊl ˈtaɪm/',
      ttsText: 'full time',
    },
    tags: ['work', 'hours', 'unit3'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-adverb-part-time',
    english: 'part-time',
    senseKey: 'working-fewer-than-full-hours',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L(
      '파트타임으로',
      'yarim stavkada',
      'for fewer hours than a full-time job',
      'неполный рабочий день',
    ),
    examples: [
      {
        english: 'His grandmother works part-time.',
        translations: L(
          '그의 할머니는 파트타임으로 일해요.',
          'Uning buvisi yarim stavkada ishlaydi.',
          'His grandmother works part-time.',
          'Его бабушка работает неполный рабочий день.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌpɑːt ˈtaɪm/',
      ttsText: 'part time',
    },
    tags: ['work', 'hours', 'unit3'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-verb-earn',
    english: 'earn',
    senseKey: 'receive-money-for-work',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '벌다',
      'pul topmoq',
      'to receive money for work',
      'зарабатывать',
    ),
    examples: [
      {
        english: 'She earns a good salary.',
        translations: L(
          '그녀는 급여를 많이 받아요.',
          'U yaxshi maosh oladi.',
          'She earns a good salary.',
          'Она хорошо зарабатывает.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɜːn/',
      ttsText: 'earn',
    },
    tags: ['work', 'money', 'unit3'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-money',
    english: 'money',
    senseKey: 'currency-used-to-buy-things',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '돈',
      'pul',
      'what people use to buy things and pay for services',
      'деньги',
    ),
    examples: [
      {
        english: 'He wants to work and earn money.',
        translations: L(
          '그는 일해서 돈을 벌고 싶어 해요.',
          'U ishlashni va pul topishni xohlaydi.',
          'He wants to work and earn money.',
          'Он хочет работать и зарабатывать деньги.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈmʌni/',
      ttsText: 'money',
    },
    tags: ['work', 'money', 'unit3'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-place',
    english: 'place',
    senseKey: 'particular-location',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('장소', 'joy', 'a particular location', 'место'),
    examples: [
      {
        english: 'A hospital is a place of work.',
        translations: L(
          '병원은 일하는 장소예요.',
          'Kasalxona ish joyi.',
          'A hospital is a place of work.',
          'Больница — это место работы.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/pleɪs/',
      ttsText: 'place',
    },
    tags: ['work', 'places', 'unit3'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-comfortable',
    english: 'comfortable',
    senseKey: 'physically-relaxed',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('편안한', 'qulay', 'feeling physically relaxed', 'удобный'),
    examples: [
      {
        english: 'People do not feel comfortable standing for a long time.',
        translations: L(
          '사람들은 오래 서 있으면 편안하지 않아요.',
          'Odamlar uzoq vaqt tik turganda o‘zini qulay his qilmaydi.',
          'People do not feel comfortable standing for a long time.',
          'Людям неудобно долго стоять.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkʌmftəbəl/',
      ttsText: 'comfortable',
    },
    tags: ['meetings', 'unit3'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-problem',
    english: 'problem',
    senseKey: 'difficulty-needing-solution',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '문제',
      'muammo',
      'a difficulty that needs a solution',
      'проблема',
    ),
    examples: [
      {
        english: 'They talk about a possible future problem.',
        translations: L(
          '그들은 앞으로 생길 수 있는 문제에 대해 이야기해요.',
          'Ular kelajakdagi mumkin bo‘lgan muammo haqida gaplashadi.',
          'They talk about a possible future problem.',
          'Они обсуждают возможную будущую проблему.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈprɒbləm/',
      ttsText: 'problem',
    },
    tags: ['meetings', 'unit3'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-future',
    english: 'future',
    senseKey: 'relating-to-time-after-now',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '미래의; 앞으로의',
      'kelajakdagi',
      'relating to the time after now',
      'будущий',
    ),
    examples: [
      {
        english: 'They discuss a possible future problem.',
        translations: L(
          '그들은 앞으로 생길 수 있는 문제를 논의해요.',
          'Ular kelajakdagi mumkin bo‘lgan muammoni muhokama qiladi.',
          'They discuss a possible future problem.',
          'Они обсуждают возможную будущую проблему.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈfjuːtʃə/',
      ttsText: 'future',
    },
    tags: ['meetings', 'unit3'],
    difficulty: 2,
    isCore: true,
  },
];

export const EN_S2_UNIT3_NODE2_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Talking about work
  // ===========================================================

  en_s2u3_n2_001_word_matching: {
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
        text: 'boss',
        native: 'boshliq',
        nativeI18n: L('상사', 'boshliq', 'boss', 'начальник'),
      },
      {
        text: 'manager',
        native: 'menejer',
        nativeI18n: L('관리자', 'menejer', 'manager', 'менеджер'),
      },
      {
        text: 'colleague',
        native: 'hamkasb',
        nativeI18n: L('직장 동료', 'hamkasb', 'colleague', 'коллега'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['work'],
  },

  en_s2u3_n2_002_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'factory',
        native: 'zavod',
        nativeI18n: L('공장', 'zavod', 'factory', 'завод'),
      },
      {
        text: 'office',
        native: 'ofis',
        nativeI18n: L('사무실', 'ofis', 'office', 'офис'),
      },
      {
        text: 'unemployed',
        native: 'ishsiz',
        nativeI18n: L('실업 상태인', 'ishsiz', 'unemployed', 'безработный'),
      },
      {
        text: 'retired',
        native: 'nafaqadagi',
        nativeI18n: L('은퇴한', 'nafaqadagi', 'retired', 'на пенсии'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['work'],
  },

  en_s2u3_n2_003_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'full-time',
        native: 'to‘liq ish vaqtida',
        nativeI18n: L(
          '풀타임으로',
          'to‘liq ish vaqtida',
          'full-time',
          'полный рабочий день',
        ),
      },
      {
        text: 'part-time',
        native: 'yarim stavkada',
        nativeI18n: L(
          '파트타임으로',
          'yarim stavkada',
          'part-time',
          'неполный рабочий день',
        ),
      },
      {
        text: 'freelance',
        native: 'frilanser',
        nativeI18n: L('프리랜서로', 'frilanser', 'freelance', 'фриланс'),
      },
      {
        text: 'earn',
        native: 'pul topmoq',
        nativeI18n: L('벌다', 'pul topmoq', 'earn', 'зарабатывать'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['work'],
  },

  en_s2u3_n2_004_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Pierre works from home and works ___.',
    blankAnswers: ['freelance'],
    options: ['freelance', 'retired', 'unemployed', 'full-time'],
    answer: 'freelance',
    answerTranslation: L(
      'Pierre는 집에서 프리랜서로 일해요.',
      'Pierre uyda frilanser bo‘lib ishlaydi.',
      'Pierre works from home and works freelance.',
      'Пьер работает дома как фрилансер.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['work', 'pierre'],
  },

  en_s2u3_n2_005_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Pierre does not have a ___.',
    blankAnswers: ['boss'],
    options: ['boss', 'factory', 'salary', 'hospital'],
    answer: 'boss',
    answerTranslation: L(
      'Pierre에게는 상사가 없어요.',
      'Pierrening boshlig‘i yo‘q.',
      'Pierre does not have a boss.',
      'У Пьера нет начальника.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['work', 'pierre'],
  },

  en_s2u3_n2_006_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Pierre’s father works in a ___.',
    blankAnswers: ['factory'],
    options: ['factory', 'manager', 'money', 'colleague'],
    answer: 'factory',
    answerTranslation: L(
      'Pierre의 아버지는 공장에서 일해요.',
      'Pierrening otasi zavodda ishlaydi.',
      'Pierre’s father works in a factory.',
      'Отец Пьера работает на заводе.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['work', 'factory'],
  },

  en_s2u3_n2_007_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'His father works for a big ___.',
    blankAnswers: ['company'],
    options: ['company', 'money', 'office', 'colleague'],
    answer: 'company',
    answerTranslation: L(
      '그의 아버지는 큰 회사에서 일해요.',
      'Uning otasi katta kompaniyada ishlaydi.',
      'His father works for a big company.',
      'Его отец работает в большой компании.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['work', 'company'],
  },

  en_s2u3_n2_008_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Pierre’s mother works in a big ___.',
    blankAnswers: ['office'],
    options: ['office', 'factory', 'money', 'boss'],
    answer: 'office',
    answerTranslation: L(
      'Pierre의 어머니는 큰 사무실에서 일해요.',
      'Pierrening onasi katta ofisda ishlaydi.',
      'Pierre’s mother works in a big office.',
      'Мать Пьера работает в большом офисе.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['work', 'office'],
  },

  en_s2u3_n2_009_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She ___ a very good salary.',
    blankAnswers: ['earns'],
    options: ['earns', 'earn', 'earning', 'earned'],
    answer: 'earns',
    answerTranslation: L(
      '그녀는 급여를 많이 받아요.',
      'U juda yaxshi maosh oladi.',
      'She earns a very good salary.',
      'Она получает очень хорошую зарплату.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['work', 'money'],
  },

  en_s2u3_n2_010_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Pierre’s brother is ___.',
    blankAnswers: ['unemployed'],
    options: ['unemployed', 'retired', 'freelance', 'part-time'],
    answer: 'unemployed',
    answerTranslation: L(
      'Pierre의 남동생은 실업 상태예요.',
      'Pierrening ukasi ishsiz.',
      'Pierre’s brother is unemployed.',
      'Брат Пьера безработный.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['work', 'unemployed'],
  },

  en_s2u3_n2_011_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'His sister works long ___.',
    blankAnswers: ['hours'],
    options: ['hours', 'money', 'bosses', 'companies'],
    answer: 'hours',
    answerTranslation: L(
      '그의 여동생은 장시간 일해요.',
      'Uning singlisi uzoq vaqt ishlaydi.',
      'His sister works long hours.',
      'Его сестра работает много часов.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['work', 'hours'],
  },

  en_s2u3_n2_012_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Pierre’s grandfather is ___.',
    blankAnswers: ['retired'],
    options: ['retired', 'freelance', 'full-time', 'unemployed'],
    answer: 'retired',
    answerTranslation: L(
      'Pierre의 할아버지는 은퇴했어요.',
      'Pierrening bobosi nafaqada.',
      'Pierre’s grandfather is retired.',
      'Дедушка Пьера на пенсии.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['work', 'retired'],
  },

  en_s2u3_n2_013_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'His grandmother works ___.',
    blankAnswers: ['part-time'],
    options: ['part-time', 'retired', 'unemployed', 'freelance'],
    answer: 'part-time',
    answerTranslation: L(
      '그의 할머니는 파트타임으로 일해요.',
      'Uning buvisi yarim stavkada ishlaydi.',
      'His grandmother works part-time.',
      'Его бабушка работает неполный рабочий день.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['work', 'part-time'],
  },

  en_s2u3_n2_014_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She works twenty ___ a week.',
    blankAnswers: ['hours'],
    options: ['hours', 'companies', 'bosses', 'salaries'],
    answer: 'hours',
    answerTranslation: L(
      '그녀는 일주일에 20시간 일해요.',
      'U haftasiga yigirma soat ishlaydi.',
      'She works twenty hours a week.',
      'Она работает двадцать часов в неделю.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['work', 'hours'],
  },

  en_s2u3_n2_015_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '표현을 알맞은 범주와 연결하세요.',
      'Ifodani to‘g‘ri kategoriya bilan moslang.',
      'Match each expression with the correct work category.',
      'Соедините выражение с правильной категорией.',
    ),
    pairs: [
      {
        text: 'factory',
        native: 'place',
        nativeI18n: L('근무 장소', 'joy', 'place', 'место'),
      },
      {
        text: 'salary',
        native: 'money',
        nativeI18n: L('돈', 'pul', 'money', 'деньги'),
      },
      {
        text: 'colleague',
        native: 'people',
        nativeI18n: L('함께 일하는 사람', 'odamlar', 'people', 'люди'),
      },
      {
        text: 'full-time',
        native: 'hours',
        nativeI18n: L('근무 시간', 'ish vaqti', 'hours', 'часы'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['work', 'categories'],
  },

  en_s2u3_n2_016_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['works', 'home', 'from', 'Pierre', 'office'],
    answer: 'Pierre works from home',
    audioText: 'Pierre works from home.',
    answerTranslation: L(
      'Pierre는 집에서 일해요.',
      'Pierre uyda ishlaydi.',
      'Pierre works from home.',
      'Пьер работает из дома.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['work', 'pierre'],
  },

  en_s2u3_n2_017_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['money', 'wants', 'earn', 'He', 'to', 'company'],
    answer: 'He wants to earn money',
    answerTranslation: L(
      '그는 돈을 벌고 싶어 해요.',
      'U pul topishni xohlaydi.',
      'He wants to earn money.',
      'Он хочет зарабатывать деньги.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['work', 'money'],
  },

  en_s2u3_n2_018_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'She works full-time in an office.',
    audioText: 'She works full-time in an office.',
    answerI18n: L(
      '그녀는 사무실에서 풀타임으로 일해요',
      'U ofisda to‘liq ish vaqtida ishlaydi',
      'She works full-time in an office',
      'Она работает полный день в офисе',
    ),
    options: ['She', 'works', 'full-time', 'in', 'an', 'office.'],
    optionsI18n: {
      ko: ['그녀는', '사무실에서', '풀타임으로', '일해요'],
      uz: ['U', 'ofisda', 'to‘liq', 'ish', 'vaqtida', 'ishlaydi'],
      en: ['She', 'works', 'full-time', 'in', 'an', 'office.'],
      ru: ['Она', 'работает', 'полный', 'день', 'в', 'офисе'],
    },
    answerTranslation: L(
      '그녀는 사무실에서 풀타임으로 일해요.',
      'U ofisda to‘liq ish vaqtida ishlaydi.',
      'She works full-time in an office.',
      'Она работает полный день в офисе.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['work'],
  },

  en_s2u3_n2_019_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Pierre works freelance, his father works for a company and his grandmother works part-time.',
    audioText:
      'Pierre works freelance, his father works for a company and his grandmother works part-time.',
    answerTranslation: L(
      'Pierre는 프리랜서로 일하고, 그의 아버지는 회사에서 일하며, 할머니는 파트타임으로 일해요.',
      'Pierre frilanser bo‘lib ishlaydi, otasi kompaniyada ishlaydi va buvisi yarim stavkada ishlaydi.',
      'Pierre works freelance, his father works for a company and his grandmother works part-time.',
      'Пьер работает фрилансером, его отец работает в компании, а бабушка — неполный день.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['work', 'review'],
  },

  en_s2u3_n2_020_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'We can talk about work by describing the place, hours, money, company and people we work with.',
    audioText:
      'We can talk about work by describing the place, hours, money, company and people we work with.',
    answerTranslation: L(
      '근무 장소, 시간, 돈, 회사와 함께 일하는 사람을 설명해서 일에 대해 이야기할 수 있어요.',
      'Ish haqida joy, ish vaqti, pul, kompaniya va hamkasblarni tasvirlab gapirish mumkin.',
      'We can talk about work by describing the place, hours, money, company and people we work with.',
      'О работе можно говорить, описывая место, часы, оплату, компанию и коллег.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['work', 'review'],
  },

  // ===========================================================
  // Lesson 2 · Wh-questions
  // ===========================================================

  en_s2u3_n2_021_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '의문사와 쓰임을 연결하세요.',
      'So‘roq so‘zini uning vazifasi bilan moslang.',
      'Match each question word with its use.',
      'Соедините вопросительное слово с его значением.',
    ),
    pairs: [
      {
        text: 'what',
        native: 'thing',
        nativeI18n: L('사물·내용', 'narsa', 'thing', 'вещь'),
      },
      {
        text: 'who',
        native: 'person',
        nativeI18n: L('사람', 'odam', 'person', 'человек'),
      },
      {
        text: 'where',
        native: 'place',
        nativeI18n: L('장소', 'joy', 'place', 'место'),
      },
      {
        text: 'why',
        native: 'reason',
        nativeI18n: L('이유', 'sabab', 'reason', 'причина'),
      },
    ],
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['wh-questions'],
  },

  en_s2u3_n2_022_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '의문사와 쓰임을 연결하세요.',
      'So‘roq so‘zini uning vazifasi bilan moslang.',
      'Match each question word with its use.',
      'Соедините вопросительное слово с его значением.',
    ),
    pairs: [
      {
        text: 'when',
        native: 'time',
        nativeI18n: L('시간', 'vaqt', 'time', 'время'),
      },
      {
        text: 'how often',
        native: 'frequency',
        nativeI18n: L('빈도', 'takroriylik', 'frequency', 'частота'),
      },
      {
        text: 'how',
        native: 'way',
        nativeI18n: L('방법', 'usul', 'way', 'способ'),
      },
      {
        text: 'what time',
        native: 'exact time',
        nativeI18n: L('정확한 시각', 'aniq vaqt', 'exact time', 'точное время'),
      },
    ],
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['wh-questions'],
  },

  en_s2u3_n2_023_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ do you live?',
    blankAnswers: ['Where'],
    options: ['Where', 'Who', 'Why', 'When'],
    answer: 'Where',
    answerTranslation: L(
      '어디에 살아요?',
      'Qayerda yashaysiz?',
      'Where do you live?',
      'Где вы живёте?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['wh-questions', 'where'],
  },

  en_s2u3_n2_024_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ do you usually wear to work?',
    blankAnswers: ['What'],
    options: ['What', 'Where', 'Who', 'Why'],
    answer: 'What',
    answerTranslation: L(
      '보통 출근할 때 무엇을 입어요?',
      'Odatda ishga nima kiyib borasiz?',
      'What do you usually wear to work?',
      'Что вы обычно носите на работу?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['wh-questions', 'what'],
  },

  en_s2u3_n2_025_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ do you want to learn English?',
    blankAnswers: ['Why'],
    options: ['Why', 'Who', 'Where', 'When'],
    answer: 'Why',
    answerTranslation: L(
      '왜 영어를 배우고 싶어요?',
      'Nega ingliz tilini o‘rganmoqchisiz?',
      'Why do you want to learn English?',
      'Почему вы хотите изучать английский?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['wh-questions', 'why'],
  },

  en_s2u3_n2_026_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ do you start work?',
    blankAnswers: ['What time'],
    options: ['What time', 'Who', 'Why', 'Where'],
    answer: 'What time',
    answerTranslation: L(
      '몇 시에 일을 시작해요?',
      'Ishni soat nechada boshlaysiz?',
      'What time do you start work?',
      'Во сколько вы начинаете работу?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['wh-questions', 'what-time'],
  },

  en_s2u3_n2_027_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ do you take breaks?',
    blankAnswers: ['When'],
    options: ['When', 'Who', 'Why', 'Where'],
    answer: 'When',
    answerTranslation: L(
      '언제 휴식을 취해요?',
      'Qachon tanaffus qilasiz?',
      'When do you take breaks?',
      'Когда вы делаете перерывы?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['wh-questions', 'when'],
  },

  en_s2u3_n2_028_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ do you live with?',
    blankAnswers: ['Who'],
    options: ['Who', 'What', 'Where', 'How often'],
    answer: 'Who',
    answerTranslation: L(
      '누구와 함께 살아요?',
      'Kim bilan yashaysiz?',
      'Who do you live with?',
      'С кем вы живёте?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['wh-questions', 'who'],
  },

  en_s2u3_n2_029_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ do you do when you are bored?',
    blankAnswers: ['What'],
    options: ['What', 'Who', 'When', 'Where'],
    answer: 'What',
    answerTranslation: L(
      '지루할 때 무엇을 해요?',
      'Zeriksangiz nima qilasiz?',
      'What do you do when you are bored?',
      'Что вы делаете, когда вам скучно?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['wh-questions', 'what'],
  },

  en_s2u3_n2_030_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ do you check your emails?',
    blankAnswers: ['How often'],
    options: ['How often', 'Who', 'Where', 'What'],
    answer: 'How often',
    answerTranslation: L(
      '얼마나 자주 이메일을 확인해요?',
      'Elektron pochtangizni qanchalik tez-tez tekshirasiz?',
      'How often do you check your emails?',
      'Как часто вы проверяете электронную почту?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['wh-questions', 'how-often'],
  },

  en_s2u3_n2_031_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['do', 'Where', 'work', 'you', 'who'],
    answer: 'Where do you work',
    audioText: 'Where do you work?',
    answerTranslation: L(
      '어디에서 일해요?',
      'Qayerda ishlaysiz?',
      'Where do you work?',
      'Где вы работаете?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['wh-questions'],
  },

  en_s2u3_n2_032_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['do', 'Who', 'with', 'work', 'you', 'why'],
    answer: 'Who do you work with',
    audioText: 'Who do you work with?',
    answerTranslation: L(
      '누구와 함께 일해요?',
      'Kim bilan ishlaysiz?',
      'Who do you work with?',
      'С кем вы работаете?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['wh-questions'],
  },

  en_s2u3_n2_033_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['often', 'How', 'meetings', 'do', 'have', 'you'],
    answer: 'How often do you have meetings',
    answerTranslation: L(
      '얼마나 자주 회의를 해요?',
      'Qanchalik tez-tez yig‘ilish qilasiz?',
      'How often do you have meetings?',
      'Как часто у вас бывают собрания?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['wh-questions'],
  },

  en_s2u3_n2_034_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Why do you like your job?',
    audioText: 'Why do you like your job?',
    answerI18n: L(
      '왜 자신의 직업을 좋아해요',
      'Nega ishingizni yoqtirasiz',
      'Why do you like your job',
      'Почему вам нравится ваша работа',
    ),
    options: ['Why', 'do', 'you', 'like', 'your', 'job?'],
    optionsI18n: {
      ko: ['왜', '자신의', '직업을', '좋아해요'],
      uz: ['Nega', 'ishingizni', 'yoqtirasiz'],
      en: ['Why', 'do', 'you', 'like', 'your', 'job?'],
      ru: ['Почему', 'вам', 'нравится', 'ваша', 'работа'],
    },
    answerTranslation: L(
      '왜 자신의 직업을 좋아해요?',
      'Nega ishingizni yoqtirasiz?',
      'Why do you like your job?',
      'Почему вам нравится ваша работа?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['wh-questions'],
  },

  en_s2u3_n2_035_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: '',
    sentenceSuffix: ' do you work?',
    answer: 'Where',
    answerTranslation: L(
      '어디에서 일해요?',
      'Qayerda ishlaysiz?',
      'Where do you work?',
      'Где вы работаете?',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Use Where to ask about a place.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['wh-questions', 'typing'],
  },

  en_s2u3_n2_036_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: '',
    sentenceSuffix: ' do you have meetings?',
    answer: 'How often',
    answerTranslation: L(
      '얼마나 자주 회의를 해요?',
      'Qanchalik tez-tez yig‘ilish qilasiz?',
      'How often do you have meetings?',
      'Как часто у вас бывают собрания?',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Use How often to ask about frequency.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['wh-questions', 'typing'],
  },

  en_s2u3_n2_037_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What do you do?' }],
    options: [
      'I’m a police officer.',
      'I work every day.',
      'At seven o’clock.',
      'In Edinburgh.',
    ],
    answer: 'I’m a police officer.',
    answerTranslation: L(
      '저는 경찰관이에요.',
      'Men politsiya xodimiman.',
      'I’m a police officer.',
      'Я полицейский.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['wh-questions', 'police-interview'],
  },

  en_s2u3_n2_038_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Where do you work?' }],
    options: [
      'I work in a police station.',
      'Because it’s interesting.',
      'At seven o’clock.',
      'Every day.',
    ],
    answer: 'I work in a police station.',
    answerTranslation: L(
      '경찰서에서 일해요.',
      'Men politsiya bo‘limida ishlayman.',
      'I work in a police station.',
      'Я работаю в полицейском участке.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['wh-questions', 'police-interview'],
  },

  en_s2u3_n2_039_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Why do you like your job?' }],
    options: [
      'Because it’s interesting.',
      'In a police station.',
      'At seven o’clock.',
      'With police officers.',
    ],
    answer: 'Because it’s interesting.',
    answerTranslation: L(
      '흥미롭기 때문이에요.',
      'Chunki u qiziqarli.',
      'Because it’s interesting.',
      'Потому что она интересная.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['wh-questions', 'police-interview'],
  },

  en_s2u3_n2_040_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'What asks about things, who asks about people, where asks about places, when asks about time and why asks about reasons.',
    audioText:
      'What asks about things, who asks about people, where asks about places, when asks about time and why asks about reasons.',
    answerTranslation: L(
      'what은 사물이나 내용을, who는 사람을, where는 장소를, when은 시간을, why는 이유를 물어요.',
      'What narsa haqida, who odam haqida, where joy haqida, when vaqt haqida va why sabab haqida so‘raydi.',
      'What asks about things, who asks about people, where asks about places, when asks about time and why asks about reasons.',
      'What спрашивает о вещах, who — о людях, where — о месте, when — о времени, why — о причине.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['wh-questions', 'review'],
  },

  // ===========================================================
  // Lesson 3 · Police officer interview
  // ===========================================================

  en_s2u3_n2_041_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Where do you work?' }],
    options: [
      'I work in St. Leonards Police Station in Edinburgh.',
      'I work every day.',
      'I work with lots of people.',
      'I start at seven.',
    ],
    answer: 'I work in St. Leonards Police Station in Edinburgh.',
    answerTranslation: L(
      '저는 Edinburgh의 St. Leonards 경찰서에서 일해요.',
      'Men Edinburghdagi St. Leonards politsiya bo‘limida ishlayman.',
      'I work in St. Leonards Police Station in Edinburgh.',
      'Я работаю в полицейском участке St. Leonards в Эдинбурге.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['police-interview'],
  },

  en_s2u3_n2_042_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Why do you like your job?' }],
    options: [
      'It’s interesting and my days are never the same.',
      'I start at seven.',
      'I work in Edinburgh.',
      'We have meetings every day.',
    ],
    answer: 'It’s interesting and my days are never the same.',
    answerTranslation: L(
      '흥미롭고 매일이 똑같지 않기 때문이에요.',
      'U qiziqarli va kunlarim hech qachon bir xil emas.',
      'It’s interesting and my days are never the same.',
      'Она интересная, и мои дни никогда не бывают одинаковыми.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['police-interview'],
  },

  en_s2u3_n2_043_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Who do you work with?' }],
    options: [
      'Lots of different people.',
      'At seven o’clock.',
      'In Edinburgh.',
      'Every day.',
    ],
    answer: 'Lots of different people.',
    answerTranslation: L(
      '많은 다양한 사람들과 일해요.',
      'Ko‘p turli odamlar bilan ishlayman.',
      'Lots of different people.',
      'С множеством разных людей.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['police-interview', 'who'],
  },

  en_s2u3_n2_044_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What time do you start work?' }],
    options: [
      'Sometimes I start at seven in the morning.',
      'With lots of people.',
      'Because it is interesting.',
      'At the police station.',
    ],
    answer: 'Sometimes I start at seven in the morning.',
    answerTranslation: L(
      '가끔 아침 7시에 일을 시작해요.',
      'Ba’zan ertalab soat yettida ish boshlayman.',
      'Sometimes I start at seven in the morning.',
      'Иногда я начинаю работать в семь утра.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['police-interview', 'what-time'],
  },

  en_s2u3_n2_045_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Sometimes she works ___.',
    blankAnswers: ['nights'],
    options: ['nights', 'boss', 'factory', 'salary'],
    answer: 'nights',
    answerTranslation: L(
      '가끔 그녀는 야간 근무를 해요.',
      'Ba’zan u kechasi ishlaydi.',
      'Sometimes she works nights.',
      'Иногда она работает ночью.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['police-interview', 'hours'],
  },

  en_s2u3_n2_046_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'How often do you have meetings?' }],
    options: [
      'Every day.',
      'At the police station.',
      'With my boss.',
      'Because they are useful.',
    ],
    answer: 'Every day.',
    answerTranslation: L(
      '매일이요.',
      'Har kuni.',
      'Every day.',
      'Каждый день.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['police-interview', 'how-often'],
  },

  en_s2u3_n2_047_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'How do you travel to work?' }],
    options: [
      'I walk a lot.',
      'At seven o’clock.',
      'Every day.',
      'With police officers.',
    ],
    answer: 'I walk a lot.',
    answerTranslation: L(
      '저는 많이 걸어요.',
      'Men ko‘p piyoda yuraman.',
      'I walk a lot.',
      'Я много хожу пешком.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['police-interview', 'how'],
  },

  en_s2u3_n2_048_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'When do you usually go to bed?' }],
    options: [
      'I always go to bed early.',
      'I work with my boss.',
      'I work in Edinburgh.',
      'I have meetings every day.',
    ],
    answer: 'I always go to bed early.',
    answerTranslation: L(
      '저는 항상 일찍 자요.',
      'Men doim erta uxlayman.',
      'I always go to bed early.',
      'Я всегда рано ложусь спать.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['police-interview', 'when'],
  },

  en_s2u3_n2_049_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ do you work with?',
    blankAnswers: ['Who'],
    options: ['Who', 'Where', 'When', 'Why'],
    answer: 'Who',
    answerTranslation: L(
      '누구와 함께 일해요?',
      'Kim bilan ishlaysiz?',
      'Who do you work with?',
      'С кем вы работаете?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['police-interview'],
  },

  en_s2u3_n2_050_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ do you travel to work?',
    blankAnswers: ['How'],
    options: ['How', 'Who', 'When', 'What'],
    answer: 'How',
    answerTranslation: L(
      '어떻게 출근해요?',
      'Ishga qanday borasiz?',
      'How do you travel to work?',
      'Как вы добираетесь до работы?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['police-interview'],
  },

  en_s2u3_n2_051_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['often', 'do', 'meetings', 'How', 'have', 'you'],
    answer: 'How often do you have meetings',
    audioText: 'How often do you have meetings?',
    answerTranslation: L(
      '얼마나 자주 회의를 해요?',
      'Qanchalik tez-tez yig‘ilish qilasiz?',
      'How often do you have meetings?',
      'Как часто у вас бывают собрания?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['police-interview'],
  },

  en_s2u3_n2_052_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['you', 'Why', 'job', 'like', 'your', 'do'],
    answer: 'Why do you like your job',
    answerTranslation: L(
      '왜 자신의 직업을 좋아해요?',
      'Nega ishingizni yoqtirasiz?',
      'Why do you like your job?',
      'Почему вам нравится ваша работа?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['police-interview'],
  },

  en_s2u3_n2_053_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Who do you work with?',
    audioText: 'Who do you work with?',
    answerI18n: L(
      '누구와 함께 일해요',
      'Kim bilan ishlaysiz',
      'Who do you work with',
      'С кем вы работаете',
    ),
    options: ['Who', 'do', 'you', 'work', 'with?'],
    optionsI18n: {
      ko: ['누구와', '함께', '일해요'],
      uz: ['Kim', 'bilan', 'ishlaysiz'],
      en: ['Who', 'do', 'you', 'work', 'with?'],
      ru: ['С', 'кем', 'вы', 'работаете'],
    },
    answerTranslation: L(
      '누구와 함께 일해요?',
      'Kim bilan ishlaysiz?',
      'Who do you work with?',
      'С кем вы работаете?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['police-interview'],
  },

  en_s2u3_n2_054_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Where do you work?',
    options: ['I', 'work', 'in', 'an', 'office', 'why'],
    answer: 'I work in an office',
    answerTranslation: L(
      '저는 사무실에서 일해요.',
      'Men ofisda ishlayman.',
      'I work in an office.',
      'Я работаю в офисе.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['work-interview'],
  },

  en_s2u3_n2_055_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What time do you start work?',
    options: ['I', 'start', 'at', 'nine', 'who', 'why'],
    answer: 'I start at nine',
    answerTranslation: L(
      '저는 9시에 시작해요.',
      'Men soat to‘qqizda boshlayman.',
      'I start at nine.',
      'Я начинаю в девять.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['work-interview'],
  },

  en_s2u3_n2_056_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Who do you work with?',
    options: ['I', 'work', 'with', 'five', 'colleagues', 'where'],
    answer: 'I work with five colleagues',
    answerTranslation: L(
      '저는 다섯 명의 동료와 일해요.',
      'Men besh hamkasb bilan ishlayman.',
      'I work with five colleagues.',
      'Я работаю с пятью коллегами.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['work-interview'],
  },

  en_s2u3_n2_057_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'What do you do?',
    audioText: 'What do you do?',
    answerTranslation: L(
      '무슨 일을 해요?',
      'Nima ish qilasiz?',
      'What do you do?',
      'Кем вы работаете?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['work-interview'],
  },

  en_s2u3_n2_058_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Where do you work?',
    audioText: 'Where do you work?',
    answerTranslation: L(
      '어디에서 일해요?',
      'Qayerda ishlaysiz?',
      'Where do you work?',
      'Где вы работаете?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['work-interview'],
  },

  en_s2u3_n2_059_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'How often do you have meetings?',
    audioText: 'How often do you have meetings?',
    answerTranslation: L(
      '얼마나 자주 회의를 해요?',
      'Qanchalik tez-tez yig‘ilish qilasiz?',
      'How often do you have meetings?',
      'Как часто у вас бывают собрания?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['work-interview'],
  },

  en_s2u3_n2_060_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'A work interview can ask what you do, where you work, who you work with, what time you start and how often you have meetings.',
    audioText:
      'A work interview can ask what you do, where you work, who you work with, what time you start and how often you have meetings.',
    answerTranslation: L(
      '직업 인터뷰에서는 무슨 일을 하는지, 어디에서 일하는지, 누구와 일하는지, 몇 시에 시작하는지, 얼마나 자주 회의를 하는지 물을 수 있어요.',
      'Ish haqidagi suhbatda nima ish qilishingiz, qayerda ishlashingiz, kim bilan ishlashingiz, qachon boshlashingiz va qanchalik tez-tez yig‘ilish qilishingiz so‘ralishi mumkin.',
      'A work interview can ask what you do, where you work, who you work with, what time you start and how often you have meetings.',
      'В интервью о работе могут спросить, кем вы работаете, где, с кем, во сколько начинаете и как часто проводите собрания.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['work-interview', 'review'],
  },

  // ===========================================================
  // Lesson 4 · Stand-up meetings
  // ===========================================================

  en_s2u3_n2_061_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What is a stand-up meeting?' }],
    options: [
      'A meeting where people stand and discuss work.',
      'A meeting where everybody sleeps.',
      'A meeting only for managers.',
      'A meeting in a restaurant.',
    ],
    answer: 'A meeting where people stand and discuss work.',
    answerTranslation: L(
      '사람들이 서서 업무를 논의하는 회의예요.',
      'Odamlar tik turib ishni muhokama qiladigan yig‘ilish.',
      'A meeting where people stand and discuss work.',
      'Это встреча, на которой люди стоят и обсуждают работу.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['stand-up-meetings', 'reading'],
  },

  en_s2u3_n2_062_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Where do stand-up meetings happen?' },
    ],
    options: [
      'In offices around the world.',
      'Only in hospitals.',
      'Only outside.',
      'Only in restaurants.',
    ],
    answer: 'In offices around the world.',
    answerTranslation: L(
      '세계 여러 사무실에서 열려요.',
      'Dunyo bo‘ylab ofislarda bo‘ladi.',
      'In offices around the world.',
      'В офисах по всему миру.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['stand-up-meetings', 'reading'],
  },

  en_s2u3_n2_063_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Stand-up meetings are very common in ___ companies.',
    blankAnswers: ['software'],
    options: ['software', 'hospital', 'restaurant', 'music'],
    answer: 'software',
    answerTranslation: L(
      '스탠드업 회의는 소프트웨어 회사에서 매우 흔해요.',
      'Stand-up yig‘ilishlari dasturiy ta’minot kompaniyalarida juda keng tarqalgan.',
      'Stand-up meetings are very common in software companies.',
      'Такие встречи очень распространены в компаниях по разработке программного обеспечения.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['stand-up-meetings', 'reading'],
  },

  en_s2u3_n2_064_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Why do people stand up?' }],
    options: [
      'Because they talk only about important things.',
      'Because they want to sleep.',
      'Because there are no offices.',
      'Because they do not work.',
    ],
    answer: 'Because they talk only about important things.',
    answerTranslation: L(
      '중요한 내용만 이야기하게 되기 때문이에요.',
      'Chunki ular faqat muhim narsalar haqida gapiradi.',
      'Because they talk only about important things.',
      'Потому что так они говорят только о важном.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['stand-up-meetings', 'reading'],
  },

  en_s2u3_n2_065_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'People do not feel very ___ when they stand for a long time.',
    blankAnswers: ['comfortable'],
    options: ['comfortable', 'retired', 'freelance', 'unemployed'],
    answer: 'comfortable',
    answerTranslation: L(
      '사람들은 오래 서 있으면 편안하지 않아요.',
      'Odamlar uzoq tik tursa o‘zini qulay his qilmaydi.',
      'People do not feel very comfortable when they stand for a long time.',
      'Людям не очень удобно долго стоять.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['stand-up-meetings', 'reading'],
  },

  en_s2u3_n2_066_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Who usually speaks in a stand-up meeting?' },
    ],
    options: [
      'Everyone.',
      'Only the boss.',
      'Only the manager.',
      'Only new workers.',
    ],
    answer: 'Everyone.',
    answerTranslation: L(
      '보통 모두가 이야기해요.',
      'Odatda hamma gapiradi.',
      'Everyone.',
      'Все.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['stand-up-meetings', 'reading'],
  },

  en_s2u3_n2_067_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Sometimes there is not enough ___.',
    blankAnswers: ['time'],
    options: ['time', 'money', 'salary', 'company'],
    answer: 'time',
    answerTranslation: L(
      '가끔 시간이 충분하지 않아요.',
      'Ba’zan vaqt yetarli bo‘lmaydi.',
      'Sometimes there is not enough time.',
      'Иногда времени недостаточно.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['stand-up-meetings', 'reading'],
  },

  en_s2u3_n2_068_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'When do companies usually have stand-up meetings?',
      },
    ],
    options: [
      'In the morning.',
      'At midnight.',
      'Only at weekends.',
      'After dinner.',
    ],
    answer: 'In the morning.',
    answerTranslation: L(
      '보통 아침에 해요.',
      'Odatda ertalab.',
      'In the morning.',
      'Обычно утром.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['stand-up-meetings', 'reading'],
  },

  en_s2u3_n2_069_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Stand-up meetings are often at about ___ a.m.',
    blankAnswers: ['9'],
    options: ['9', '2', '12', '5'],
    answer: '9',
    answerTranslation: L(
      '스탠드업 회의는 보통 오전 9시쯤 열려요.',
      'Stand-up yig‘ilishlari odatda ertalab soat to‘qqizlarda bo‘ladi.',
      'Stand-up meetings are often at about 9 a.m.',
      'Такие встречи часто проходят около девяти утра.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['stand-up-meetings', 'reading'],
  },

  en_s2u3_n2_070_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'How often do companies usually have stand-up meetings?',
      },
    ],
    options: [
      'Usually once a week.',
      'Once every ten years.',
      'Only once.',
      'Never.',
    ],
    answer: 'Usually once a week.',
    answerTranslation: L(
      '보통 일주일에 한 번이에요.',
      'Odatda haftada bir marta.',
      'Usually once a week.',
      'Обычно раз в неделю.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['stand-up-meetings', 'reading'],
  },

  en_s2u3_n2_071_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Some companies have stand-up meetings every ___.',
    blankAnswers: ['day'],
    options: ['day', 'year', 'month', 'hour'],
    answer: 'day',
    answerTranslation: L(
      '어떤 회사들은 매일 스탠드업 회의를 해요.',
      'Ba’zi kompaniyalar har kuni stand-up yig‘ilishi qiladi.',
      'Some companies have stand-up meetings every day.',
      'Некоторые компании проводят такие встречи каждый день.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['stand-up-meetings', 'reading'],
  },

  en_s2u3_n2_072_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '회의에서 이야기하는 내용을 연결하세요.',
      'Yig‘ilishda muhokama qilinadigan mavzularni moslang.',
      'Match the topics people discuss in stand-up meetings.',
      'Соедините темы, которые обсуждают на stand-up встречах.',
    ),
    pairs: [
      {
        text: 'yesterday',
        native: 'work',
        nativeI18n: L('어제 한 일', 'kechagi ish', 'work', 'работа'),
      },
      {
        text: 'today',
        native: 'plans',
        nativeI18n: L('오늘의 계획', 'bugungi rejalar', 'plans', 'планы'),
      },
      {
        text: 'future',
        native: 'problem',
        nativeI18n: L(
          '앞으로 생길 수 있는 문제',
          'kelajakdagi muammo',
          'problem',
          'проблема',
        ),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['stand-up-meetings', 'reading'],
  },

  en_s2u3_n2_073_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'People talk about a possible future ___.',
    blankAnswers: ['problem'],
    options: ['problem', 'salary', 'boss', 'factory'],
    answer: 'problem',
    answerTranslation: L(
      '사람들은 앞으로 생길 수 있는 문제에 대해 이야기해요.',
      'Odamlar kelajakdagi mumkin bo‘lgan muammo haqida gaplashadi.',
      'People talk about a possible future problem.',
      'Люди обсуждают возможную будущую проблему.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['stand-up-meetings', 'reading'],
  },

  en_s2u3_n2_074_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['usually', 'Everyone', 'speaks', 'meeting', 'the', 'in'],
    answer: 'Everyone usually speaks in the meeting',
    audioText: 'Everyone usually speaks in the meeting.',
    answerTranslation: L(
      '보통 회의에서 모두가 이야기해요.',
      'Yig‘ilishda odatda hamma gapiradi.',
      'Everyone usually speaks in the meeting.',
      'Обычно на встрече говорят все.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['stand-up-meetings'],
  },

  en_s2u3_n2_075_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['meetings', 'morning', 'in', 'are', 'usually', 'the'],
    answer: 'Meetings are usually in the morning',
    answerTranslation: L(
      '회의는 보통 아침에 열려요.',
      'Yig‘ilishlar odatda ertalab bo‘ladi.',
      'Meetings are usually in the morning.',
      'Встречи обычно проходят утром.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['stand-up-meetings'],
  },

  en_s2u3_n2_076_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'They talk about plans for today.',
    audioText: 'They talk about plans for today.',
    answerI18n: L(
      '그들은 오늘의 계획에 대해 이야기해요',
      'Ular bugungi rejalar haqida gaplashadi',
      'They talk about plans for today',
      'Они говорят о планах на сегодня',
    ),
    options: ['They', 'talk', 'about', 'plans', 'for', 'today.'],
    optionsI18n: {
      ko: ['그들은', '오늘의', '계획에', '대해', '이야기해요'],
      uz: ['Ular', 'bugungi', 'rejalar', 'haqida', 'gaplashadi'],
      en: ['They', 'talk', 'about', 'plans', 'for', 'today.'],
      ru: ['Они', 'говорят', 'о', 'планах', 'на', 'сегодня'],
    },
    answerTranslation: L(
      '그들은 오늘의 계획에 대해 이야기해요.',
      'Ular bugungi rejalar haqida gaplashadi.',
      'They talk about plans for today.',
      'Они говорят о планах на сегодня.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['stand-up-meetings'],
  },

  en_s2u3_n2_077_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Why are stand-up meetings useful?' },
    ],
    options: [
      'People focus on important things.',
      'People sleep during them.',
      'Nobody speaks.',
      'They are always very long.',
    ],
    answer: 'People focus on important things.',
    answerTranslation: L(
      '사람들이 중요한 내용에 집중하기 때문이에요.',
      'Odamlar muhim narsalarga e’tibor beradi.',
      'People focus on important things.',
      'Люди сосредотачиваются на важных вещах.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['stand-up-meetings', 'reading'],
  },

  en_s2u3_n2_078_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'In a stand-up meeting, people stand and discuss work.',
    audioText: 'In a stand-up meeting, people stand and discuss work.',
    answerTranslation: L(
      '스탠드업 회의에서는 사람들이 서서 업무를 논의해요.',
      'Stand-up yig‘ilishida odamlar tik turib ishni muhokama qiladi.',
      'In a stand-up meeting, people stand and discuss work.',
      'На stand-up встрече люди стоят и обсуждают работу.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['stand-up-meetings'],
  },

  en_s2u3_n2_079_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'They usually talk about yesterday’s work, today’s plans and a possible future problem.',
    audioText:
      'They usually talk about yesterday’s work, today’s plans and a possible future problem.',
    answerTranslation: L(
      '보통 어제 한 일, 오늘의 계획과 앞으로 생길 수 있는 문제에 대해 이야기해요.',
      'Ular odatda kechagi ish, bugungi rejalar va kelajakdagi mumkin bo‘lgan muammo haqida gaplashadi.',
      'They usually talk about yesterday’s work, today’s plans and a possible future problem.',
      'Обычно они обсуждают вчерашнюю работу, планы на сегодня и возможную будущую проблему.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['stand-up-meetings', 'review'],
  },

  en_s2u3_n2_080_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'What do you do? Where do you work? Who do you work with? What time do you start and how often do you have meetings?',
    audioText:
      'What do you do? Where do you work? Who do you work with? What time do you start and how often do you have meetings?',
    answerTranslation: L(
      '무슨 일을 해요? 어디에서 일해요? 누구와 일해요? 몇 시에 시작하고 얼마나 자주 회의를 해요?',
      'Nima ish qilasiz? Qayerda ishlaysiz? Kim bilan ishlaysiz? Soat nechada boshlaysiz va qanchalik tez-tez yig‘ilish qilasiz?',
      'What do you do? Where do you work? Who do you work with? What time do you start and how often do you have meetings?',
      'Кем вы работаете? Где? С кем? Во сколько начинаете и как часто проводите собрания?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit3', 'node-review'],
  },
};

// ─────────────────────────────────────────────────────────────
// Node 2
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT3_NODE2 = {
  title: L(
    '무슨 일을 하나요?',
    'Nima ish qilasiz?',
    'What do you do?',
    'Кем вы работаете?',
  ),
  section: 2,
  unit: 3,
  order: 2,
  isActive: true,

  lessons: [
    {
      title: L(
        '일에 대해 말하기',
        'Ish haqida gapirish',
        'Talking about work',
        'Говорим о работе',
      ),
      description: L(
        '회사, 직장 동료, 상사, 근무 장소, 급여, 근무 시간, 프리랜서·실업·은퇴 상태를 사용해 일에 대해 설명해요.',
        'Kompaniya, hamkasb, boshliq, ish joyi, maosh, ish vaqti, frilanser, ishsiz va nafaqadagi holatlarni o‘rganasiz.',
        'Describe work using companies, people, workplaces, money, hours and employment status.',
        'Описываем работу: компанию, коллег, место, оплату, часы и занятость.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 1,
      questions: [
        'en_s2u3_n2_001_word_matching',
        'en_s2u3_n2_002_word_matching',
        'en_s2u3_n2_003_word_matching',
        'en_s2u3_n2_004_fill_in_blank',
        'en_s2u3_n2_005_fill_in_blank',
        'en_s2u3_n2_006_fill_in_blank',
        'en_s2u3_n2_007_fill_in_blank',
        'en_s2u3_n2_008_fill_in_blank',
        'en_s2u3_n2_009_fill_in_blank',
        'en_s2u3_n2_010_fill_in_blank',
        'en_s2u3_n2_011_fill_in_blank',
        'en_s2u3_n2_012_fill_in_blank',
        'en_s2u3_n2_013_fill_in_blank',
        'en_s2u3_n2_014_fill_in_blank',
        'en_s2u3_n2_015_word_matching',
        'en_s2u3_n2_016_word_arrange',
        'en_s2u3_n2_017_translate_builder',
        'en_s2u3_n2_018_sentence_builder',
        'en_s2u3_n2_019_speaking',
        'en_s2u3_n2_020_speaking',
      ],
    },

    {
      title: L('의문사 질문', 'Wh-savollar', 'Wh-questions', 'Wh-вопросы'),
      description: L(
        'what, who, where, when, why, how, how often, what time을 사용해 일과 일상에 관한 구체적인 정보를 물어요.',
        'What, who, where, when, why, how, how often va what time yordamida ish va kundalik hayot haqida savollar berasiz.',
        'Ask for specific information using what, who, where, when, why, how, how often and what time.',
        'Задаём вопросы с what, who, where, when, why, how, how often и what time.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 2,
      questions: [
        'en_s2u3_n2_021_word_matching',
        'en_s2u3_n2_022_word_matching',
        'en_s2u3_n2_023_fill_in_blank',
        'en_s2u3_n2_024_fill_in_blank',
        'en_s2u3_n2_025_fill_in_blank',
        'en_s2u3_n2_026_fill_in_blank',
        'en_s2u3_n2_027_fill_in_blank',
        'en_s2u3_n2_028_fill_in_blank',
        'en_s2u3_n2_029_fill_in_blank',
        'en_s2u3_n2_030_fill_in_blank',
        'en_s2u3_n2_031_word_arrange',
        'en_s2u3_n2_032_word_arrange',
        'en_s2u3_n2_033_translate_builder',
        'en_s2u3_n2_034_sentence_builder',
        'en_s2u3_n2_035_type_answer',
        'en_s2u3_n2_036_type_answer',
        'en_s2u3_n2_037_dialog_complete',
        'en_s2u3_n2_038_dialog_complete',
        'en_s2u3_n2_039_dialog_complete',
        'en_s2u3_n2_040_speaking',
      ],
    },

    {
      title: L(
        '경찰관 인터뷰',
        'Politsiya xodimi bilan suhbat',
        'A police officer interview',
        'Интервью с полицейским',
      ),
      description: L(
        '경찰관 인터뷰를 통해 직업, 근무 장소, 동료, 시작 시간, 회의 빈도, 출근 방법과 취침 시간을 묻고 답해요.',
        'Politsiya xodimi bilan suhbat orqali ish, ish joyi, hamkasblar, boshlash vaqti, yig‘ilishlar, qatnov va uyqu haqida savol-javob qilasiz.',
        'Use the police officer interview to practise detailed Wh-questions about work and routines.',
        'Практикуем Wh-вопросы о работе и распорядке на интервью с полицейским.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 3,
      questions: [
        'en_s2u3_n2_041_dialog_complete',
        'en_s2u3_n2_042_dialog_complete',
        'en_s2u3_n2_043_dialog_complete',
        'en_s2u3_n2_044_dialog_complete',
        'en_s2u3_n2_045_fill_in_blank',
        'en_s2u3_n2_046_dialog_complete',
        'en_s2u3_n2_047_dialog_complete',
        'en_s2u3_n2_048_dialog_complete',
        'en_s2u3_n2_049_fill_in_blank',
        'en_s2u3_n2_050_fill_in_blank',
        'en_s2u3_n2_051_word_arrange',
        'en_s2u3_n2_052_translate_builder',
        'en_s2u3_n2_053_sentence_builder',
        'en_s2u3_n2_054_reply_builder',
        'en_s2u3_n2_055_reply_builder',
        'en_s2u3_n2_056_reply_builder',
        'en_s2u3_n2_057_speaking',
        'en_s2u3_n2_058_speaking',
        'en_s2u3_n2_059_speaking',
        'en_s2u3_n2_060_speaking',
      ],
    },

    {
      title: L(
        '스탠드업 회의',
        'Stand-up yig‘ilishlari',
        'Stand-up meetings',
        'Stand-up встречи',
      ),
      description: L(
        '서서 진행하는 업무 회의에 관한 글을 읽고 장소, 이유, 참여자, 시간, 빈도와 회의에서 다루는 세 가지 내용을 이해해요.',
        'Tik turib o‘tkaziladigan ish yig‘ilishlari haqidagi matndan joy, sabab, ishtirokchilar, vaqt, takroriylik va muhokama qilinadigan mavzularni o‘rganasiz.',
        'Read about stand-up meetings and understand where, why, when and how often they happen and what people discuss.',
        'Читаем о stand-up встречах: где, зачем, когда и как часто они проходят и что на них обсуждают.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 4,
      questions: [
        'en_s2u3_n2_061_dialog_complete',
        'en_s2u3_n2_062_dialog_complete',
        'en_s2u3_n2_063_fill_in_blank',
        'en_s2u3_n2_064_dialog_complete',
        'en_s2u3_n2_065_fill_in_blank',
        'en_s2u3_n2_066_dialog_complete',
        'en_s2u3_n2_067_fill_in_blank',
        'en_s2u3_n2_068_dialog_complete',
        'en_s2u3_n2_069_fill_in_blank',
        'en_s2u3_n2_070_dialog_complete',
        'en_s2u3_n2_071_fill_in_blank',
        'en_s2u3_n2_072_word_matching',
        'en_s2u3_n2_073_fill_in_blank',
        'en_s2u3_n2_074_word_arrange',
        'en_s2u3_n2_075_translate_builder',
        'en_s2u3_n2_076_sentence_builder',
        'en_s2u3_n2_077_dialog_complete',
        'en_s2u3_n2_078_speaking',
        'en_s2u3_n2_079_speaking',
        'en_s2u3_n2_080_speaking',
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Section 2 · Unit 3 · Node 3
// 3.3 Vocabulary and skills development
//
// Coverage
// - schwa /ə/
// - unstressed syllables
// - author / mechanic / pilot / teacher pronunciation
// - address / again / answer / breakfast
// - centre / daughter / future / internet
// - schwa in common connected phrases
//
// - suffix -er
// - verb → noun
// - bake → baker
// - begin → beginner
// - build → builder
// - clean → cleaner
// - cook → cooker
// - dance → dancer
// - drive → driver
// - farm → farmer
// - heat → heater
// - make → maker
// - manage → manager
// - paint → painter
// - play → player
// - run → runner
// - sing → singer
// - teach → teacher
// - win → winner
// - work → worker
// - write → writer
//
// - spelling rules:
//   normal verb + -er
//   verb ending in -e → +r
//   short vowel + consonant → double consonant + -er
//
// - describing people/jobs with definitions
// - jobs and happiness listening topic
//
// IMPORTANT:
// *_WORDS에는 한 단어만 등록.
// "office worker", "a new job", "for ten minutes",
// "lots of books", "at home" 등은 headword로 등록하지 않음.
//
// Already registered and therefore reused without duplicate WORD entries:
// cleaner / mechanic / pilot / computer / manager / office /
// inside / outside / salary / colleague / full-time / etc.
//
// 4 lessons × 20 questions = 80
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT3_NODE3_WORDS = [
  {
    code: 'en-person-author',
    english: 'author',
    senseKey: 'person-who-writes-books',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '작가',
      'muallif',
      'a person who writes books or other texts',
      'автор',
    ),
    examples: [
      {
        english: 'She is an author.',
        translations: L(
          '그녀는 작가예요.',
          'U muallif.',
          'She is an author.',
          'Она автор.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈɔːθə/',
      ttsText: 'author',
    },
    tags: ['jobs', 'schwa', 'unit3'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-person-baker',
    english: 'baker',
    senseKey: 'person-who-bakes-bread',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '제빵사',
      'nonvoy',
      'a person whose job is to make bread and cakes',
      'пекарь',
    ),
    examples: [
      {
        english: 'My father is a baker.',
        translations: L(
          '제 아버지는 제빵사예요.',
          'Otam novvoy.',
          'My father is a baker.',
          'Мой отец пекарь.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈbeɪkə/',
      ttsText: 'baker',
    },
    tags: ['jobs', 'suffix-er', 'unit3'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-person-beginner',
    english: 'beginner',
    senseKey: 'person-starting-to-learn',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '초보자',
      'boshlovchi',
      'a person who is starting to learn something',
      'начинающий',
    ),
    examples: [
      {
        english: 'I am a beginner.',
        translations: L(
          '저는 초보자예요.',
          'Men boshlovchiman.',
          'I am a beginner.',
          'Я начинающий.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/bɪˈɡɪnə/',
      ttsText: 'beginner',
    },
    tags: ['people', 'suffix-er', 'unit3'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-person-builder',
    english: 'builder',
    senseKey: 'person-who-builds',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '건설 노동자',
      'quruvchi',
      'a person whose job is to build things',
      'строитель',
    ),
    examples: [
      {
        english: 'He is a builder.',
        translations: L(
          '그는 건설 노동자예요.',
          'U quruvchi.',
          'He is a builder.',
          'Он строитель.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈbɪldə/',
      ttsText: 'builder',
    },
    tags: ['jobs', 'suffix-er', 'unit3'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-cooker',
    english: 'cooker',
    senseKey: 'appliance-for-cooking',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '조리기; 레인지',
      'ovqat pishirgich',
      'a large appliance used for cooking food',
      'плита',
    ),
    examples: [
      {
        english: 'The cooker is in the kitchen.',
        translations: L(
          '조리기는 주방에 있어요.',
          'Ovqat pishirgich oshxonada.',
          'The cooker is in the kitchen.',
          'Плита находится на кухне.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkʊkə/',
      ttsText: 'cooker',
    },
    tags: ['objects', 'suffix-er', 'unit3'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-person-dancer',
    english: 'dancer',
    senseKey: 'person-who-dances',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('무용수; 댄서', 'raqqos', 'a person who dances', 'танцор'),
    examples: [
      {
        english: 'She is a dancer.',
        translations: L(
          '그녀는 무용수예요.',
          'U raqqosa.',
          'She is a dancer.',
          'Она танцовщица.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈdɑːnsə/',
      ttsText: 'dancer',
    },
    tags: ['jobs', 'suffix-er', 'unit3'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-person-driver',
    english: 'driver',
    senseKey: 'person-who-drives',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '운전사',
      'haydovchi',
      'a person who drives a vehicle',
      'водитель',
    ),
    examples: [
      {
        english: 'He is a driver.',
        translations: L(
          '그는 운전사예요.',
          'U haydovchi.',
          'He is a driver.',
          'Он водитель.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈdraɪvə/',
      ttsText: 'driver',
    },
    tags: ['jobs', 'suffix-er', 'unit3'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-person-farmer',
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
        english: 'He is a farmer.',
        translations: L(
          '그는 농부예요.',
          'U fermer.',
          'He is a farmer.',
          'Он фермер.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈfɑːmə/',
      ttsText: 'farmer',
    },
    tags: ['jobs', 'suffix-er', 'unit3'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-heater',
    english: 'heater',
    senseKey: 'device-that-makes-space-warm',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '난방기',
      'isitgich',
      'a device used to make a place warm',
      'обогреватель',
    ),
    examples: [
      {
        english: 'The heater makes the room warm.',
        translations: L(
          '난방기는 방을 따뜻하게 해요.',
          'Isitgich xonani iliq qiladi.',
          'The heater makes the room warm.',
          'Обогреватель делает комнату тёплой.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈhiːtə/',
      ttsText: 'heater',
    },
    tags: ['objects', 'suffix-er', 'unit3'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-person-maker',
    english: 'maker',
    senseKey: 'person-or-company-that-makes',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '제작자; 제조자',
      'ishlab chiqaruvchi',
      'a person or company that makes something',
      'изготовитель',
    ),
    examples: [
      {
        english: 'She is a furniture maker.',
        translations: L(
          '그녀는 가구 제작자예요.',
          'U mebel ishlab chiqaruvchi.',
          'She is a furniture maker.',
          'Она изготовитель мебели.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈmeɪkə/',
      ttsText: 'maker',
    },
    tags: ['jobs', 'suffix-er', 'unit3'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-person-painter',
    english: 'painter',
    senseKey: 'person-who-paints',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '화가; 페인트공',
      'rassom; bo‘yoqchi',
      'a person who paints pictures or surfaces',
      'художник; маляр',
    ),
    examples: [
      {
        english: 'He is a painter.',
        translations: L(
          '그는 화가예요.',
          'U rassom.',
          'He is a painter.',
          'Он художник.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈpeɪntə/',
      ttsText: 'painter',
    },
    tags: ['jobs', 'suffix-er', 'unit3'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-person-player',
    english: 'player',
    senseKey: 'person-who-plays-game-or-instrument',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '선수; 연주자',
      'o‘yinchi; ijrochi',
      'a person who plays a sport, game or musical instrument',
      'игрок; исполнитель',
    ),
    examples: [
      {
        english: 'He is a good tennis player.',
        translations: L(
          '그는 훌륭한 테니스 선수예요.',
          'U yaxshi tennis o‘yinchisi.',
          'He is a good tennis player.',
          'Он хороший теннисист.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈpleɪə/',
      ttsText: 'player',
    },
    tags: ['people', 'suffix-er', 'unit3'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-person-runner',
    english: 'runner',
    senseKey: 'person-who-runs',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '달리기 선수',
      'yuguruvchi',
      'a person who runs, especially in races',
      'бегун',
    ),
    examples: [
      {
        english: 'She is a fast runner.',
        translations: L(
          '그녀는 빠른 달리기 선수예요.',
          'U tez yuguruvchi.',
          'She is a fast runner.',
          'Она быстро бегает.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈrʌnə/',
      ttsText: 'runner',
    },
    tags: ['people', 'suffix-er', 'unit3'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-person-singer',
    english: 'singer',
    senseKey: 'person-who-sings',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('가수', 'qo‘shiqchi', 'a person who sings', 'певец'),
    examples: [
      {
        english: 'She is a singer.',
        translations: L(
          '그녀는 가수예요.',
          'U qo‘shiqchi.',
          'She is a singer.',
          'Она певица.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈsɪŋə/',
      ttsText: 'singer',
    },
    tags: ['jobs', 'suffix-er', 'unit3'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-person-teacher',
    english: 'teacher',
    senseKey: 'person-who-teaches',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '교사; 선생님',
      'o‘qituvchi',
      'a person whose job is to teach',
      'учитель',
    ),
    examples: [
      {
        english: 'He is a teacher.',
        translations: L(
          '그는 선생님이에요.',
          'U o‘qituvchi.',
          'He is a teacher.',
          'Он учитель.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈtiːtʃə/',
      ttsText: 'teacher',
    },
    tags: ['jobs', 'suffix-er', 'schwa', 'unit3'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-person-winner',
    english: 'winner',
    senseKey: 'person-who-wins',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '우승자; 승자',
      'g‘olib',
      'a person who wins a competition',
      'победитель',
    ),
    examples: [
      {
        english: 'She is the winner.',
        translations: L(
          '그녀가 우승자예요.',
          'U g‘olib.',
          'She is the winner.',
          'Она победительница.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈwɪnə/',
      ttsText: 'winner',
    },
    tags: ['people', 'suffix-er', 'unit3'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-person-worker',
    english: 'worker',
    senseKey: 'person-who-works',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('노동자; 근로자', 'ishchi', 'a person who works', 'работник'),
    examples: [
      {
        english: 'She is an office worker.',
        translations: L(
          '그녀는 사무직 근로자예요.',
          'U ofis ishchisi.',
          'She is an office worker.',
          'Она офисный работник.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈwɜːkə/',
      ttsText: 'worker',
    },
    tags: ['jobs', 'suffix-er', 'unit3'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-person-writer',
    english: 'writer',
    senseKey: 'person-who-writes',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '작가; 글 쓰는 사람',
      'yozuvchi',
      'a person who writes books, stories or other texts',
      'писатель',
    ),
    examples: [
      {
        english: 'My cousin is a writer.',
        translations: L(
          '제 사촌은 작가예요.',
          'Mening amakivachcham yozuvchi.',
          'My cousin is a writer.',
          'Мой двоюродный брат писатель.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈraɪtə/',
      ttsText: 'writer',
    },
    tags: ['jobs', 'suffix-er', 'unit3'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-verb-bake',
    english: 'bake',
    senseKey: 'cook-food-in-oven',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L('굽다', 'pechda pishirmoq', 'to cook food in an oven', 'печь'),
    examples: [
      {
        english: 'They bake bread.',
        translations: L(
          '그들은 빵을 구워요.',
          'Ular non pishiradi.',
          'They bake bread.',
          'Они пекут хлеб.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/beɪk/',
      ttsText: 'bake',
    },
    tags: ['verbs', 'suffix-er', 'unit3'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-begin',
    english: 'begin',
    senseKey: 'start',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L('시작하다', 'boshlamoq', 'to start', 'начинать'),
    examples: [
      {
        english: 'The class begins at nine.',
        translations: L(
          '수업은 9시에 시작해요.',
          'Dars soat to‘qqizda boshlanadi.',
          'The class begins at nine.',
          'Урок начинается в девять.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/bɪˈɡɪn/',
      ttsText: 'begin',
    },
    tags: ['verbs', 'suffix-er', 'unit3'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-build',
    english: 'build',
    senseKey: 'make-building-or-structure',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '짓다; 만들다',
      'qurmoq',
      'to make a building or structure',
      'строить',
    ),
    examples: [
      {
        english: 'They build houses.',
        translations: L(
          '그들은 집을 지어요.',
          'Ular uylar quradi.',
          'They build houses.',
          'Они строят дома.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/bɪld/',
      ttsText: 'build',
    },
    tags: ['verbs', 'suffix-er', 'unit3'],
    difficulty: 1,
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
        english: 'They dance together.',
        translations: L(
          '그들은 함께 춤춰요.',
          'Ular birga raqsga tushadi.',
          'They dance together.',
          'Они танцуют вместе.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/dɑːns/',
      ttsText: 'dance',
    },
    tags: ['verbs', 'suffix-er', 'unit3'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-drive',
    english: 'drive',
    senseKey: 'control-vehicle',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '운전하다',
      'haydamoq',
      'to control a car or other vehicle',
      'водить',
    ),
    examples: [
      {
        english: 'He drives a bus.',
        translations: L(
          '그는 버스를 운전해요.',
          'U avtobus haydaydi.',
          'He drives a bus.',
          'Он водит автобус.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/draɪv/',
      ttsText: 'drive',
    },
    tags: ['verbs', 'suffix-er', 'unit3'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-farm',
    english: 'farm',
    senseKey: 'work-land-for-food',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '농사를 짓다',
      'dehqonchilik qilmoq',
      'to use land to grow food or keep animals',
      'заниматься сельским хозяйством',
    ),
    examples: [
      {
        english: 'They farm this land.',
        translations: L(
          '그들은 이 땅에서 농사를 지어요.',
          'Ular bu yerda dehqonchilik qiladi.',
          'They farm this land.',
          'Они обрабатывают эту землю.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/fɑːm/',
      ttsText: 'farm',
    },
    tags: ['verbs', 'suffix-er', 'unit3'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-verb-heat',
    english: 'heat',
    senseKey: 'make-hot-or-warm',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '데우다; 따뜻하게 하다',
      'isitmoq',
      'to make something hot or warm',
      'нагревать',
    ),
    examples: [
      {
        english: 'The machine heats the room.',
        translations: L(
          '기계가 방을 따뜻하게 해요.',
          'Qurilma xonani isitadi.',
          'The machine heats the room.',
          'Устройство нагревает комнату.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/hiːt/',
      ttsText: 'heat',
    },
    tags: ['verbs', 'suffix-er', 'unit3'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-verb-make',
    english: 'make',
    senseKey: 'create-or-produce',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '만들다',
      'yasamoq',
      'to create or produce something',
      'делать; создавать',
    ),
    examples: [
      {
        english: 'They make furniture.',
        translations: L(
          '그들은 가구를 만들어요.',
          'Ular mebel yasaydi.',
          'They make furniture.',
          'Они делают мебель.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/meɪk/',
      ttsText: 'make',
    },
    tags: ['verbs', 'suffix-er', 'unit3'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-manage',
    english: 'manage',
    senseKey: 'control-work-or-people',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '관리하다',
      'boshqarmoq',
      'to control or organize work or people',
      'управлять',
    ),
    examples: [
      {
        english: 'She manages a team.',
        translations: L(
          '그녀는 팀을 관리해요.',
          'U jamoani boshqaradi.',
          'She manages a team.',
          'Она управляет командой.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈmænɪdʒ/',
      ttsText: 'manage',
    },
    tags: ['verbs', 'suffix-er', 'unit3'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-verb-paint',
    english: 'paint',
    senseKey: 'cover-with-paint-or-make-picture',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '칠하다; 그림을 그리다',
      'bo‘yamoq; rasm chizmoq',
      'to cover something with paint or make a picture with paint',
      'красить; рисовать',
    ),
    examples: [
      {
        english: 'He paints houses.',
        translations: L(
          '그는 집에 페인트를 칠해요.',
          'U uylarni bo‘yaydi.',
          'He paints houses.',
          'Он красит дома.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/peɪnt/',
      ttsText: 'paint',
    },
    tags: ['verbs', 'suffix-er', 'unit3'],
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
        english: 'She sings very well.',
        translations: L(
          '그녀는 노래를 아주 잘해요.',
          'U juda yaxshi qo‘shiq aytadi.',
          'She sings very well.',
          'Она очень хорошо поёт.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/sɪŋ/',
      ttsText: 'sing',
    },
    tags: ['verbs', 'suffix-er', 'unit3'],
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
      'o‘qitmoq',
      'to help someone learn something',
      'учить; преподавать',
    ),
    examples: [
      {
        english: 'She teaches English.',
        translations: L(
          '그녀는 영어를 가르쳐요.',
          'U ingliz tilini o‘qitadi.',
          'She teaches English.',
          'Она преподаёт английский.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/tiːtʃ/',
      ttsText: 'teach',
    },
    tags: ['verbs', 'suffix-er', 'unit3'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-win',
    english: 'win',
    senseKey: 'be-best-in-competition',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '이기다; 우승하다',
      'yutmoq',
      'to be the best in a game or competition',
      'побеждать',
    ),
    examples: [
      {
        english: 'She wins the competition.',
        translations: L(
          '그녀는 대회에서 우승해요.',
          'U musobaqada g‘olib bo‘ladi.',
          'She wins the competition.',
          'Она побеждает в соревновании.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/wɪn/',
      ttsText: 'win',
    },
    tags: ['verbs', 'suffix-er', 'unit3'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-write',
    english: 'write',
    senseKey: 'produce-written-words',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '쓰다',
      'yozmoq',
      'to produce words using a pen, keyboard or similar tool',
      'писать',
    ),
    examples: [
      {
        english: 'She writes books.',
        translations: L(
          '그녀는 책을 써요.',
          'U kitob yozadi.',
          'She writes books.',
          'Она пишет книги.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/raɪt/',
      ttsText: 'write',
    },
    tags: ['verbs', 'suffix-er', 'unit3'],
    difficulty: 1,
    isCore: true,
  },
];

export const EN_S2_UNIT3_NODE3_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · The schwa /ə/
  // ===========================================================

  en_s2u3_n3_001_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'author',
        native: 'muallif',
        nativeI18n: L('작가', 'muallif', 'author', 'автор'),
      },
      {
        text: 'mechanic',
        native: 'mexanik',
        nativeI18n: L('정비사', 'mexanik', 'mechanic', 'механик'),
      },
      {
        text: 'pilot',
        native: 'uchuvchi',
        nativeI18n: L('조종사', 'uchuvchi', 'pilot', 'пилот'),
      },
      {
        text: 'teacher',
        native: 'o‘qituvchi',
        nativeI18n: L('교사', 'o‘qituvchi', 'teacher', 'учитель'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['schwa', 'jobs'],
  },

  en_s2u3_n3_002_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The final sound in “author” is ___.',
    blankAnswers: ['/ə/'],
    options: ['/ə/', '/iː/', '/æ/', '/uː/'],
    answer: '/ə/',
    answerTranslation: L(
      'author의 마지막 소리는 /ə/예요.',
      'Author so‘zining oxirgi tovushi /ə/.',
      'The final sound in “author” is /ə/.',
      'Последний звук в слове author — /ə/.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['schwa', 'pronunciation'],
  },

  en_s2u3_n3_003_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The first unstressed sound in “mechanic” can be ___.',
    blankAnswers: ['/ə/'],
    options: ['/ə/', '/ɑː/', '/ɔː/', '/eɪ/'],
    answer: '/ə/',
    answerTranslation: L(
      'mechanic의 첫 비강세 모음은 /ə/로 발음될 수 있어요.',
      'Mechanic so‘zidagi birinchi urg‘usiz unli /ə/ bo‘lishi mumkin.',
      'The first unstressed sound in “mechanic” can be /ə/.',
      'Первый безударный гласный в mechanic может произноситься как /ə/.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['schwa', 'pronunciation'],
  },

  en_s2u3_n3_004_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The last syllable of “pilot” is usually ___.',
    blankAnswers: ['unstressed'],
    options: ['unstressed', 'stressed', 'silent', 'long'],
    answer: 'unstressed',
    answerTranslation: L(
      'pilot의 마지막 음절은 보통 강세를 받지 않아요.',
      'Pilot so‘zining oxirgi bo‘g‘ini odatda urg‘usiz.',
      'The last syllable of “pilot” is usually unstressed.',
      'Последний слог в слове pilot обычно безударный.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['schwa', 'stress'],
  },

  en_s2u3_n3_005_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The final sound in “teacher” is ___.',
    blankAnswers: ['/ə/'],
    options: ['/ə/', '/e/', '/aɪ/', '/ɪ/'],
    answer: '/ə/',
    answerTranslation: L(
      'teacher의 마지막 소리는 /ə/예요.',
      'Teacher so‘zining oxirgi tovushi /ə/.',
      'The final sound in “teacher” is /ə/.',
      'Последний звук в слове teacher — /ə/.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['schwa', 'pronunciation'],
  },

  en_s2u3_n3_006_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The schwa /ə/ usually appears in ___ syllables.',
    blankAnswers: ['unstressed'],
    options: ['unstressed', 'stressed', 'long', 'silent'],
    answer: 'unstressed',
    answerTranslation: L(
      'schwa /ə/는 보통 강세가 없는 음절에 나타나요.',
      'Schwa /ə/ odatda urg‘usiz bo‘g‘inlarda keladi.',
      'The schwa /ə/ usually appears in unstressed syllables.',
      'Звук schwa /ə/ обычно встречается в безударных слогах.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['schwa', 'rule'],
  },

  en_s2u3_n3_007_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'In natural speech, small unstressed words can contain the ___ sound.',
    blankAnswers: ['schwa'],
    options: ['schwa', 'stress', 'long', 'silent'],
    answer: 'schwa',
    answerTranslation: L(
      '자연스러운 발화에서 강세가 없는 짧은 단어에는 schwa 소리가 나타날 수 있어요.',
      'Tabiiy nutqda urg‘usiz kichik so‘zlarda schwa tovushi bo‘lishi mumkin.',
      'In natural speech, small unstressed words can contain the schwa sound.',
      'В естественной речи в коротких безударных словах может появляться schwa.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['schwa', 'connected-speech'],
  },

  en_s2u3_n3_008_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'author',
    audioText: 'author',
    answerTranslation: L('작가', 'muallif', 'author', 'автор'),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['schwa', 'author'],
  },

  en_s2u3_n3_009_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'mechanic',
    audioText: 'mechanic',
    answerTranslation: L('정비사', 'mexanik', 'mechanic', 'механик'),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['schwa', 'mechanic'],
  },

  en_s2u3_n3_010_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'pilot',
    audioText: 'pilot',
    answerTranslation: L('조종사', 'uchuvchi', 'pilot', 'пилот'),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['schwa', 'pilot'],
  },

  en_s2u3_n3_011_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'teacher',
    audioText: 'teacher',
    answerTranslation: L('교사', 'o‘qituvchi', 'teacher', 'учитель'),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['schwa', 'teacher'],
  },

  en_s2u3_n3_012_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'address',
    audioText: 'address',
    answerTranslation: L('주소', 'manzil', 'address', 'адрес'),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['schwa', 'pronunciation'],
  },

  en_s2u3_n3_013_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'again',
    audioText: 'again',
    answerTranslation: L('다시', 'yana', 'again', 'снова'),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['schwa', 'pronunciation'],
  },

  en_s2u3_n3_014_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'answer',
    audioText: 'answer',
    answerTranslation: L('대답', 'javob', 'answer', 'ответ'),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['schwa', 'pronunciation'],
  },

  en_s2u3_n3_015_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'breakfast',
    audioText: 'breakfast',
    answerTranslation: L('아침 식사', 'nonushta', 'breakfast', 'завтрак'),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['schwa', 'pronunciation'],
  },

  en_s2u3_n3_016_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'centre',
    audioText: 'centre',
    answerTranslation: L('중심; 센터', 'markaz', 'centre', 'центр'),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['schwa', 'pronunciation'],
  },

  en_s2u3_n3_017_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'daughter',
    audioText: 'daughter',
    answerTranslation: L('딸', 'qiz', 'daughter', 'дочь'),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['schwa', 'pronunciation'],
  },

  en_s2u3_n3_018_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'future',
    audioText: 'future',
    answerTranslation: L('미래', 'kelajak', 'future', 'будущее'),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['schwa', 'pronunciation'],
  },

  en_s2u3_n3_019_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'internet',
    audioText: 'internet',
    answerTranslation: L('인터넷', 'internet', 'internet', 'интернет'),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['schwa', 'pronunciation'],
  },

  en_s2u3_n3_020_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'a new job, for ten minutes, lots of books, at home',
    audioText: 'a new job, for ten minutes, lots of books, at home',
    answerTranslation: L(
      '새 직업, 10분 동안, 많은 책, 집에서',
      'yangi ish, o‘n daqiqa davomida, ko‘p kitoblar, uyda',
      'a new job, for ten minutes, lots of books, at home',
      'новая работа, десять минут, много книг, дома',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['schwa', 'connected-speech', 'review'],
  },

  // ===========================================================
  // Lesson 2 · The -er suffix
  // ===========================================================

  en_s2u3_n3_021_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '동사와 -er 명사를 연결하세요.',
      'Fe’lni -er bilan yasalgan ot bilan moslang.',
      'Match each verb with its -er noun.',
      'Соедините глагол с существительным на -er.',
    ),
    pairs: [
      {
        text: 'bake',
        native: 'baker',
        nativeI18n: L('baker', 'baker', 'baker', 'baker'),
      },
      {
        text: 'build',
        native: 'builder',
        nativeI18n: L('builder', 'builder', 'builder', 'builder'),
      },
      {
        text: 'dance',
        native: 'dancer',
        nativeI18n: L('dancer', 'dancer', 'dancer', 'dancer'),
      },
      {
        text: 'drive',
        native: 'driver',
        nativeI18n: L('driver', 'driver', 'driver', 'driver'),
      },
      {
        text: 'paint',
        native: 'painter',
        nativeI18n: L('painter', 'painter', 'painter', 'painter'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['suffix-er'],
  },

  en_s2u3_n3_022_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '동사와 -er 명사를 연결하세요.',
      'Fe’lni -er bilan yasalgan ot bilan moslang.',
      'Match each verb with its -er noun.',
      'Соедините глагол с существительным на -er.',
    ),
    pairs: [
      {
        text: 'run',
        native: 'runner',
        nativeI18n: L('runner', 'runner', 'runner', 'runner'),
      },
      {
        text: 'sing',
        native: 'singer',
        nativeI18n: L('singer', 'singer', 'singer', 'singer'),
      },
      {
        text: 'teach',
        native: 'teacher',
        nativeI18n: L('teacher', 'teacher', 'teacher', 'teacher'),
      },
      {
        text: 'win',
        native: 'winner',
        nativeI18n: L('winner', 'winner', 'winner', 'winner'),
      },
      {
        text: 'write',
        native: 'writer',
        nativeI18n: L('writer', 'writer', 'writer', 'writer'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['suffix-er'],
  },

  en_s2u3_n3_023_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'teach → ___',
    blankAnswers: ['teacher'],
    options: ['teacher', 'techer', 'teachor', 'teaching'],
    answer: 'teacher',
    answerTranslation: L(
      'teach에서 teacher가 돼요.',
      'Teach → teacher.',
      'teach → teacher',
      'teach → teacher',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['suffix-er', 'spelling'],
  },

  en_s2u3_n3_024_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'paint → ___',
    blankAnswers: ['painter'],
    options: ['painter', 'paintter', 'paintr', 'paintor'],
    answer: 'painter',
    answerTranslation: L(
      'paint에서 painter가 돼요.',
      'Paint → painter.',
      'paint → painter',
      'paint → painter',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['suffix-er', 'spelling'],
  },

  en_s2u3_n3_025_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'build → ___',
    blankAnswers: ['builder'],
    options: ['builder', 'builderer', 'buildr', 'buildor'],
    answer: 'builder',
    answerTranslation: L(
      'build에서 builder가 돼요.',
      'Build → builder.',
      'build → builder',
      'build → builder',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['suffix-er', 'spelling'],
  },

  en_s2u3_n3_026_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'sing → ___',
    blankAnswers: ['singer'],
    options: ['singer', 'singger', 'singr', 'singor'],
    answer: 'singer',
    answerTranslation: L(
      'sing에서 singer가 돼요.',
      'Sing → singer.',
      'sing → singer',
      'sing → singer',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['suffix-er', 'spelling'],
  },

  en_s2u3_n3_027_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'bake → ___',
    blankAnswers: ['baker'],
    options: ['baker', 'bakeer', 'bakker', 'bakor'],
    answer: 'baker',
    answerTranslation: L(
      'bake에서 baker가 돼요.',
      'Bake → baker.',
      'bake → baker',
      'bake → baker',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['suffix-er', 'final-e'],
  },

  en_s2u3_n3_028_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'dance → ___',
    blankAnswers: ['dancer'],
    options: ['dancer', 'danceer', 'danncer', 'dancor'],
    answer: 'dancer',
    answerTranslation: L(
      'dance에서 dancer가 돼요.',
      'Dance → dancer.',
      'dance → dancer',
      'dance → dancer',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['suffix-er', 'final-e'],
  },

  en_s2u3_n3_029_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'drive → ___',
    blankAnswers: ['driver'],
    options: ['driver', 'driveer', 'drivver', 'drivor'],
    answer: 'driver',
    answerTranslation: L(
      'drive에서 driver가 돼요.',
      'Drive → driver.',
      'drive → driver',
      'drive → driver',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['suffix-er', 'final-e'],
  },

  en_s2u3_n3_030_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'write → ___',
    blankAnswers: ['writer'],
    options: ['writer', 'writeer', 'writter', 'writor'],
    answer: 'writer',
    answerTranslation: L(
      'write에서 writer가 돼요.',
      'Write → writer.',
      'write → writer',
      'write → writer',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['suffix-er', 'final-e'],
  },

  en_s2u3_n3_031_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'run → ___',
    blankAnswers: ['runner'],
    options: ['runner', 'runer', 'runrer', 'runor'],
    answer: 'runner',
    answerTranslation: L(
      'run은 마지막 자음을 두 번 써서 runner가 돼요.',
      'Run so‘zi oxirgi undoshni ikki marta yozib runner bo‘ladi.',
      'run → runner',
      'run → runner',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['suffix-er', 'double-consonant'],
  },

  en_s2u3_n3_032_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'win → ___',
    blankAnswers: ['winner'],
    options: ['winner', 'winer', 'winrer', 'winor'],
    answer: 'winner',
    answerTranslation: L(
      'win은 마지막 자음을 두 번 써서 winner가 돼요.',
      'Win so‘zi oxirgi undoshni ikki marta yozib winner bo‘ladi.',
      'win → winner',
      'win → winner',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['suffix-er', 'double-consonant'],
  },

  en_s2u3_n3_033_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'begin → ___',
    blankAnswers: ['beginner'],
    options: ['beginner', 'beginer', 'beginnor', 'beger'],
    answer: 'beginner',
    answerTranslation: L(
      'begin은 beginner가 돼요.',
      'Begin → beginner.',
      'begin → beginner',
      'begin → beginner',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['suffix-er', 'double-consonant'],
  },

  en_s2u3_n3_034_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'heat → ___',
    blankAnswers: ['heater'],
    options: ['heater', 'heatter', 'heatr', 'heator'],
    answer: 'heater',
    answerTranslation: L(
      'heat에서 heater가 돼요.',
      'Heat → heater.',
      'heat → heater',
      'heat → heater',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['suffix-er'],
  },

  en_s2u3_n3_035_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'make → ___',
    blankAnswers: ['maker'],
    options: ['maker', 'makeer', 'makker', 'makor'],
    answer: 'maker',
    answerTranslation: L(
      'make에서 maker가 돼요.',
      'Make → maker.',
      'make → maker',
      'make → maker',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['suffix-er', 'final-e'],
  },

  en_s2u3_n3_036_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['a', 'teacher', 'teaches', 'A', 'teach'],
    answer: 'A teacher teaches',
    audioText: 'A teacher teaches.',
    answerTranslation: L(
      '교사는 가르쳐요.',
      'O‘qituvchi o‘qitadi.',
      'A teacher teaches.',
      'Учитель учит.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['suffix-er'],
  },

  en_s2u3_n3_037_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['runner', 'runs', 'A', 'fast', 'writer'],
    answer: 'A runner runs fast',
    answerTranslation: L(
      '달리기 선수는 빠르게 달려요.',
      'Yuguruvchi tez yuguradi.',
      'A runner runs fast.',
      'Бегун быстро бегает.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['suffix-er'],
  },

  en_s2u3_n3_038_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'write → ',
    sentenceSuffix: '',
    answer: 'writer',
    answerTranslation: L(
      'write → writer',
      'write → writer',
      'write → writer',
      'write → writer',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Write the -er noun formed from write: writer.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['suffix-er', 'typing'],
  },

  en_s2u3_n3_039_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'win → ',
    sentenceSuffix: '',
    answer: 'winner',
    answerTranslation: L(
      'win → winner',
      'win → winner',
      'win → winner',
      'win → winner',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'Write the -er noun formed from win: winner, with double n.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['suffix-er', 'typing'],
  },

  en_s2u3_n3_040_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'We often add -er to a verb to make a noun, but the spelling sometimes changes.',
    audioText:
      'We often add -er to a verb to make a noun, but the spelling sometimes changes.',
    answerTranslation: L(
      '동사에 -er를 붙여 명사를 만드는 경우가 많지만 철자가 바뀌기도 해요.',
      'Ko‘pincha fe’lga -er qo‘shib ot yasaymiz, lekin ba’zan imlo o‘zgaradi.',
      'We often add -er to a verb to make a noun, but the spelling sometimes changes.',
      'Мы часто добавляем -er к глаголу, чтобы образовать существительное, но написание иногда меняется.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['suffix-er', 'review'],
  },

  // ===========================================================
  // Lesson 3 · -er vocabulary development
  // ===========================================================

  en_s2u3_n3_041_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'baker',
        native: 'nonvoy',
        nativeI18n: L('제빵사', 'nonvoy', 'baker', 'пекарь'),
      },
      {
        text: 'builder',
        native: 'quruvchi',
        nativeI18n: L('건설 노동자', 'quruvchi', 'builder', 'строитель'),
      },
      {
        text: 'dancer',
        native: 'raqqos',
        nativeI18n: L('무용수', 'raqqos', 'dancer', 'танцор'),
      },
      {
        text: 'driver',
        native: 'haydovchi',
        nativeI18n: L('운전사', 'haydovchi', 'driver', 'водитель'),
      },
      {
        text: 'farmer',
        native: 'fermer',
        nativeI18n: L('농부', 'fermer', 'farmer', 'фермер'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['suffix-er', 'people'],
  },

  en_s2u3_n3_042_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'painter',
        native: 'rassom',
        nativeI18n: L('화가', 'rassom', 'painter', 'художник'),
      },
      {
        text: 'runner',
        native: 'yuguruvchi',
        nativeI18n: L('달리기 선수', 'yuguruvchi', 'runner', 'бегун'),
      },
      {
        text: 'singer',
        native: 'qo‘shiqchi',
        nativeI18n: L('가수', 'qo‘shiqchi', 'singer', 'певец'),
      },
      {
        text: 'teacher',
        native: 'o‘qituvchi',
        nativeI18n: L('교사', 'o‘qituvchi', 'teacher', 'учитель'),
      },
      {
        text: 'writer',
        native: 'yozuvchi',
        nativeI18n: L('작가', 'yozuvchi', 'writer', 'писатель'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['suffix-er', 'people'],
  },

  en_s2u3_n3_043_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A person who bakes bread is a ___.',
    blankAnswers: ['baker'],
    options: ['baker', 'builder', 'driver', 'teacher'],
    answer: 'baker',
    answerTranslation: L(
      '빵을 굽는 사람은 제빵사예요.',
      'Non pishiradigan odam novvoy.',
      'A person who bakes bread is a baker.',
      'Человек, который печёт хлеб, — пекарь.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['definitions', 'baker'],
  },

  en_s2u3_n3_044_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A person who builds houses is a ___.',
    blankAnswers: ['builder'],
    options: ['builder', 'baker', 'singer', 'runner'],
    answer: 'builder',
    answerTranslation: L(
      '집을 짓는 사람은 건설 노동자예요.',
      'Uy quradigan odam quruvchi.',
      'A person who builds houses is a builder.',
      'Человек, который строит дома, — строитель.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['definitions', 'builder'],
  },

  en_s2u3_n3_045_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A person who drives is a ___.',
    blankAnswers: ['driver'],
    options: ['driver', 'writer', 'teacher', 'singer'],
    answer: 'driver',
    answerTranslation: L(
      '운전하는 사람은 운전사예요.',
      'Mashina haydaydigan odam haydovchi.',
      'A person who drives is a driver.',
      'Человек, который водит машину, — водитель.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['definitions', 'driver'],
  },

  en_s2u3_n3_046_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A person who works on a farm is a ___.',
    blankAnswers: ['farmer'],
    options: ['farmer', 'runner', 'writer', 'dancer'],
    answer: 'farmer',
    answerTranslation: L(
      '농장에서 일하는 사람은 농부예요.',
      'Fermada ishlaydigan odam fermer.',
      'A person who works on a farm is a farmer.',
      'Человек, который работает на ферме, — фермер.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['definitions', 'farmer'],
  },

  en_s2u3_n3_047_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A person who sings is a ___.',
    blankAnswers: ['singer'],
    options: ['singer', 'runner', 'builder', 'painter'],
    answer: 'singer',
    answerTranslation: L(
      '노래하는 사람은 가수예요.',
      'Qo‘shiq aytadigan odam qo‘shiqchi.',
      'A person who sings is a singer.',
      'Человек, который поёт, — певец.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['definitions', 'singer'],
  },

  en_s2u3_n3_048_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A person who teaches is a ___.',
    blankAnswers: ['teacher'],
    options: ['teacher', 'driver', 'runner', 'maker'],
    answer: 'teacher',
    answerTranslation: L(
      '가르치는 사람은 교사예요.',
      'O‘qitadigan odam o‘qituvchi.',
      'A person who teaches is a teacher.',
      'Человек, который учит, — учитель.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['definitions', 'teacher'],
  },

  en_s2u3_n3_049_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A person who writes books is a ___.',
    blankAnswers: ['writer'],
    options: ['writer', 'driver', 'runner', 'heater'],
    answer: 'writer',
    answerTranslation: L(
      '책을 쓰는 사람은 작가예요.',
      'Kitob yozadigan odam yozuvchi.',
      'A person who writes books is a writer.',
      'Человек, который пишет книги, — писатель.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['definitions', 'writer'],
  },

  en_s2u3_n3_050_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A person who wins is a ___.',
    blankAnswers: ['winner'],
    options: ['winner', 'writer', 'worker', 'beginner'],
    answer: 'winner',
    answerTranslation: L(
      '이긴 사람은 승자예요.',
      'Yutgan odam g‘olib.',
      'A person who wins is a winner.',
      'Человек, который победил, — победитель.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['definitions', 'winner'],
  },

  en_s2u3_n3_051_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A person who is starting to learn is a ___.',
    blankAnswers: ['beginner'],
    options: ['beginner', 'winner', 'worker', 'maker'],
    answer: 'beginner',
    answerTranslation: L(
      '막 배우기 시작한 사람은 초보자예요.',
      'Endi o‘rganishni boshlagan odam boshlovchi.',
      'A person who is starting to learn is a beginner.',
      'Человек, который только начинает учиться, — начинающий.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['definitions', 'beginner'],
  },

  en_s2u3_n3_052_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A machine that makes a room warm is a ___.',
    blankAnswers: ['heater'],
    options: ['heater', 'runner', 'teacher', 'writer'],
    answer: 'heater',
    answerTranslation: L(
      '방을 따뜻하게 하는 기계는 난방기예요.',
      'Xonani isitadigan qurilma isitgich.',
      'A machine that makes a room warm is a heater.',
      'Устройство, которое обогревает комнату, — обогреватель.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['definitions', 'heater'],
  },

  en_s2u3_n3_053_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A kitchen appliance used for cooking is a ___.',
    blankAnswers: ['cooker'],
    options: ['cooker', 'worker', 'teacher', 'runner'],
    answer: 'cooker',
    answerTranslation: L(
      '요리에 사용하는 주방 기기는 cooker예요.',
      'Ovqat tayyorlash uchun ishlatiladigan oshxona jihozi cooker.',
      'A kitchen appliance used for cooking is a cooker.',
      'Кухонный прибор для приготовления пищи — плита.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['definitions', 'cooker'],
  },

  en_s2u3_n3_054_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A person who paints is a ___.',
    blankAnswers: ['painter'],
    options: ['painter', 'player', 'runner', 'builder'],
    answer: 'painter',
    answerTranslation: L(
      '그림을 그리거나 페인트칠을 하는 사람은 painter예요.',
      'Rasm chizadigan yoki bo‘yaydigan odam painter.',
      'A person who paints is a painter.',
      'Человек, который рисует или красит, — painter.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['definitions', 'painter'],
  },

  en_s2u3_n3_055_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A person who dances is a ___.',
    blankAnswers: ['dancer'],
    options: ['dancer', 'driver', 'builder', 'worker'],
    answer: 'dancer',
    answerTranslation: L(
      '춤추는 사람은 무용수예요.',
      'Raqsga tushadigan odam raqqos.',
      'A person who dances is a dancer.',
      'Человек, который танцует, — танцор.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['definitions', 'dancer'],
  },

  en_s2u3_n3_056_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A person who runs is a ___.',
    blankAnswers: ['runner'],
    options: ['runner', 'writer', 'teacher', 'maker'],
    answer: 'runner',
    answerTranslation: L(
      '달리는 사람은 runner예요.',
      'Yuguradigan odam yuguruvchi.',
      'A person who runs is a runner.',
      'Человек, который бегает, — бегун.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['definitions', 'runner'],
  },

  en_s2u3_n3_057_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['books', 'writer', 'A', 'writes', 'teacher'],
    answer: 'A writer writes books',
    audioText: 'A writer writes books.',
    answerTranslation: L(
      '작가는 책을 써요.',
      'Yozuvchi kitob yozadi.',
      'A writer writes books.',
      'Писатель пишет книги.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['definitions', 'writer'],
  },

  en_s2u3_n3_058_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['singer', 'sings', 'A', 'songs', 'driver'],
    answer: 'A singer sings songs',
    answerTranslation: L(
      '가수는 노래를 불러요.',
      'Qo‘shiqchi qo‘shiqlar aytadi.',
      'A singer sings songs.',
      'Певец поёт песни.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['definitions', 'singer'],
  },

  en_s2u3_n3_059_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Baker, builder, dancer, driver, farmer, painter, runner, singer, teacher and writer are nouns.',
    audioText:
      'Baker, builder, dancer, driver, farmer, painter, runner, singer, teacher and writer are nouns.',
    answerTranslation: L(
      'baker, builder, dancer, driver, farmer, painter, runner, singer, teacher, writer는 명사예요.',
      'Baker, builder, dancer, driver, farmer, painter, runner, singer, teacher va writer — otlar.',
      'Baker, builder, dancer, driver, farmer, painter, runner, singer, teacher and writer are nouns.',
      'Baker, builder, dancer, driver, farmer, painter, runner, singer, teacher и writer — существительные.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['suffix-er', 'review'],
  },

  en_s2u3_n3_060_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Some -er nouns describe people, but cooker and heater describe things.',
    audioText:
      'Some -er nouns describe people, but cooker and heater describe things.',
    answerTranslation: L(
      '일부 -er 명사는 사람을 나타내지만 cooker와 heater는 사물을 나타내요.',
      'Ba’zi -er otlari odamlarni bildiradi, lekin cooker va heater buyumlarni bildiradi.',
      'Some -er nouns describe people, but cooker and heater describe things.',
      'Некоторые существительные на -er обозначают людей, а cooker и heater — предметы.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['suffix-er', 'review'],
  },

  // ===========================================================
  // Lesson 4 · Jobs, definitions and review
  // ===========================================================

  en_s2u3_n3_061_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '직업과 기본 동사를 연결하세요.',
      'Kasbni asosiy fe’l bilan moslang.',
      'Match each job with its base verb.',
      'Соедините профессию с исходным глаголом.',
    ),
    pairs: [
      {
        text: 'baker',
        native: 'bake',
        nativeI18n: L('bake', 'bake', 'bake', 'bake'),
      },
      {
        text: 'builder',
        native: 'build',
        nativeI18n: L('build', 'build', 'build', 'build'),
      },
      {
        text: 'driver',
        native: 'drive',
        nativeI18n: L('drive', 'drive', 'drive', 'drive'),
      },
      {
        text: 'teacher',
        native: 'teach',
        nativeI18n: L('teach', 'teach', 'teach', 'teach'),
      },
      {
        text: 'writer',
        native: 'write',
        nativeI18n: L('write', 'write', 'write', 'write'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['suffix-er', 'review'],
  },

  en_s2u3_n3_062_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '직업과 기본 동사를 연결하세요.',
      'Kasbni asosiy fe’l bilan moslang.',
      'Match each job with its base verb.',
      'Соедините профессию с исходным глаголом.',
    ),
    pairs: [
      {
        text: 'dancer',
        native: 'dance',
        nativeI18n: L('dance', 'dance', 'dance', 'dance'),
      },
      {
        text: 'painter',
        native: 'paint',
        nativeI18n: L('paint', 'paint', 'paint', 'paint'),
      },
      {
        text: 'runner',
        native: 'run',
        nativeI18n: L('run', 'run', 'run', 'run'),
      },
      {
        text: 'singer',
        native: 'sing',
        nativeI18n: L('sing', 'sing', 'sing', 'sing'),
      },
      {
        text: 'winner',
        native: 'win',
        nativeI18n: L('win', 'win', 'win', 'win'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['suffix-er', 'review'],
  },

  en_s2u3_n3_063_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'My father is a ___. We get free bread and cakes.',
    blankAnswers: ['baker'],
    options: ['baker', 'runner', 'driver', 'teacher'],
    answer: 'baker',
    answerTranslation: L(
      '제 아버지는 제빵사예요. 우리는 빵과 케이크를 무료로 받아요.',
      'Otam novvoy. Biz non va tortlarni bepul olamiz.',
      'My father is a baker. We get free bread and cakes.',
      'Мой отец пекарь. Мы бесплатно получаем хлеб и пирожные.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['suffix-er', 'context'],
  },

  en_s2u3_n3_064_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'When I have a problem at work, I speak to my ___.',
    blankAnswers: ['manager'],
    options: ['manager', 'heater', 'runner', 'baker'],
    answer: 'manager',
    answerTranslation: L(
      '직장에서 문제가 생기면 관리자와 이야기해요.',
      'Ishda muammom bo‘lsa, menejerim bilan gaplashaman.',
      'When I have a problem at work, I speak to my manager.',
      'Когда у меня проблема на работе, я говорю с менеджером.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['suffix-er', 'context'],
  },

  en_s2u3_n3_065_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'My cousin is a famous ___. Her books are very popular.',
    blankAnswers: ['writer'],
    options: ['writer', 'driver', 'runner', 'heater'],
    answer: 'writer',
    answerTranslation: L(
      '제 사촌은 유명한 작가예요. 그녀의 책은 매우 인기가 있어요.',
      'Mening qarindoshim mashhur yozuvchi. Uning kitoblari juda mashhur.',
      'My cousin is a famous writer. Her books are very popular.',
      'Моя родственница известная писательница. Её книги очень популярны.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['suffix-er', 'context'],
  },

  en_s2u3_n3_066_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A person who works in an office can be an office ___.',
    blankAnswers: ['worker'],
    options: ['worker', 'winner', 'runner', 'heater'],
    answer: 'worker',
    answerTranslation: L(
      '사무실에서 일하는 사람은 office worker라고 할 수 있어요.',
      'Ofisda ishlaydigan odam office worker bo‘lishi mumkin.',
      'A person who works in an office can be an office worker.',
      'Человека, работающего в офисе, можно назвать office worker.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['suffix-er', 'worker'],
  },

  en_s2u3_n3_067_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A person who manages other workers is a ___.',
    blankAnswers: ['manager'],
    options: ['manager', 'maker', 'heater', 'runner'],
    answer: 'manager',
    answerTranslation: L(
      '다른 직원들을 관리하는 사람은 manager예요.',
      'Boshqa ishchilarni boshqaradigan odam menejer.',
      'A person who manages other workers is a manager.',
      'Человек, который управляет другими работниками, — менеджер.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['suffix-er', 'manager'],
  },

  en_s2u3_n3_068_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A person who makes things is a ___.',
    blankAnswers: ['maker'],
    options: ['maker', 'runner', 'winner', 'heater'],
    answer: 'maker',
    answerTranslation: L(
      '무언가를 만드는 사람은 maker예요.',
      'Narsa yasaydigan odam maker.',
      'A person who makes things is a maker.',
      'Человек, который что-то изготавливает, — maker.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['suffix-er', 'maker'],
  },

  en_s2u3_n3_069_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The person who finishes first is the ___.',
    blankAnswers: ['winner'],
    options: ['winner', 'beginner', 'worker', 'writer'],
    answer: 'winner',
    answerTranslation: L(
      '가장 먼저 끝내는 사람이 승자예요.',
      'Birinchi bo‘lib tugatgan odam g‘olib.',
      'The person who finishes first is the winner.',
      'Тот, кто финиширует первым, — победитель.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['suffix-er', 'winner'],
  },

  en_s2u3_n3_070_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Someone new to an activity is a ___.',
    blankAnswers: ['beginner'],
    options: ['beginner', 'winner', 'worker', 'teacher'],
    answer: 'beginner',
    answerTranslation: L(
      '어떤 활동을 막 시작한 사람은 beginner예요.',
      'Biror faoliyatni endi boshlagan odam beginner.',
      'Someone new to an activity is a beginner.',
      'Человек, который только начинает заниматься чем-либо, — начинающий.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['suffix-er', 'beginner'],
  },

  en_s2u3_n3_071_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['a', 'famous', 'writer', 'is', 'She'],
    answer: 'She is a famous writer',
    audioText: 'She is a famous writer.',
    answerTranslation: L(
      '그녀는 유명한 작가예요.',
      'U mashhur yozuvchi.',
      'She is a famous writer.',
      'Она известная писательница.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['suffix-er', 'context'],
  },

  en_s2u3_n3_072_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['manager', 'a', 'is', 'He', 'writer', 'the'],
    answer: 'He is a manager',
    answerTranslation: L(
      '그는 관리자예요.',
      'U menejer.',
      'He is a manager.',
      'Он менеджер.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['suffix-er', 'context'],
  },

  en_s2u3_n3_073_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'The winner finishes first.',
    audioText: 'The winner finishes first.',
    answerI18n: L(
      '승자는 가장 먼저 끝내요',
      'G‘olib birinchi bo‘lib tugatadi',
      'The winner finishes first',
      'Победитель финиширует первым',
    ),
    options: ['The', 'winner', 'finishes', 'first.'],
    optionsI18n: {
      ko: ['승자는', '가장', '먼저', '끝내요'],
      uz: ['G‘olib', 'birinchi', 'bo‘lib', 'tugatadi'],
      en: ['The', 'winner', 'finishes', 'first.'],
      ru: ['Победитель', 'финиширует', 'первым'],
    },
    answerTranslation: L(
      '승자는 가장 먼저 끝내요.',
      'G‘olib birinchi bo‘lib tugatadi.',
      'The winner finishes first.',
      'Победитель финиширует первым.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['suffix-er', 'winner'],
  },

  en_s2u3_n3_074_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'A person who teaches is a ',
    sentenceSuffix: '.',
    answer: 'teacher',
    answerTranslation: L(
      '가르치는 사람은 교사예요.',
      'O‘qitadigan odam o‘qituvchi.',
      'A person who teaches is a teacher.',
      'Человек, который учит, — учитель.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Write the noun teacher.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: true,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['definitions', 'typing'],
  },

  en_s2u3_n3_075_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'A person who drives is a ',
    sentenceSuffix: '.',
    answer: 'driver',
    answerTranslation: L(
      '운전하는 사람은 운전사예요.',
      'Mashina haydaydigan odam haydovchi.',
      'A person who drives is a driver.',
      'Человек, который водит машину, — водитель.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Write the noun driver.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: true,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['definitions', 'typing'],
  },

  en_s2u3_n3_076_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What does a baker do?' }],
    options: [
      'A baker bakes bread and cakes.',
      'A baker drives buses.',
      'A baker teaches students.',
      'A baker paints houses.',
    ],
    answer: 'A baker bakes bread and cakes.',
    answerTranslation: L(
      '제빵사는 빵과 케이크를 구워요.',
      'Novvoy non va tort pishiradi.',
      'A baker bakes bread and cakes.',
      'Пекарь печёт хлеб и пирожные.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['definitions', 'baker'],
  },

  en_s2u3_n3_077_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What does a teacher do?' }],
    options: [
      'A teacher teaches.',
      'A teacher drives.',
      'A teacher wins.',
      'A teacher heats rooms.',
    ],
    answer: 'A teacher teaches.',
    answerTranslation: L(
      '교사는 가르쳐요.',
      'O‘qituvchi o‘qitadi.',
      'A teacher teaches.',
      'Учитель учит.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['definitions', 'teacher'],
  },

  en_s2u3_n3_078_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'An author writes, a mechanic repairs things, a pilot flies and a teacher teaches.',
    audioText:
      'An author writes, a mechanic repairs things, a pilot flies and a teacher teaches.',
    answerTranslation: L(
      '작가는 글을 쓰고, 정비사는 수리하고, 조종사는 비행하며, 교사는 가르쳐요.',
      'Muallif yozadi, mexanik ta’mirlaydi, uchuvchi uchadi va o‘qituvchi o‘qitadi.',
      'An author writes, a mechanic repairs things, a pilot flies and a teacher teaches.',
      'Автор пишет, механик ремонтирует, пилот летает, а учитель учит.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['jobs', 'review'],
  },

  en_s2u3_n3_079_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Baker comes from bake, driver comes from drive, writer comes from write, runner comes from run and winner comes from win.',
    audioText:
      'Baker comes from bake, driver comes from drive, writer comes from write, runner comes from run and winner comes from win.',
    answerTranslation: L(
      'baker는 bake에서, driver는 drive에서, writer는 write에서, runner는 run에서, winner는 win에서 만들어져요.',
      'Baker bake dan, driver drive dan, writer write dan, runner run dan va winner win dan yasaladi.',
      'Baker comes from bake, driver comes from drive, writer comes from write, runner comes from run and winner comes from win.',
      'Baker образовано от bake, driver от drive, writer от write, runner от run, а winner от win.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['suffix-er', 'review'],
  },

  en_s2u3_n3_080_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'The schwa is common in unstressed syllables, and the suffix -er can make nouns from many verbs.',
    audioText:
      'The schwa is common in unstressed syllables, and the suffix -er can make nouns from many verbs.',
    answerTranslation: L(
      'schwa는 강세가 없는 음절에서 흔하고, -er 접미사는 많은 동사에서 명사를 만들 수 있어요.',
      'Schwa urg‘usiz bo‘g‘inlarda ko‘p uchraydi va -er qo‘shimchasi ko‘plab fe’llardan ot yasaydi.',
      'The schwa is common in unstressed syllables, and the suffix -er can make nouns from many verbs.',
      'Schwa часто встречается в безударных слогах, а суффикс -er образует существительные от многих глаголов.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['unit3', 'node-review'],
  },
};

// ─────────────────────────────────────────────────────────────
// Node 3
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT3_NODE3 = {
  title: L(
    '직업 단어 만들기와 발음',
    'Kasb so‘zlarini yasash va talaffuz',
    'Building job words and pronunciation',
    'Образование слов профессий и произношение',
  ),
  section: 2,
  unit: 3,
  order: 3,
  isActive: true,

  lessons: [
    {
      title: L(
        'schwa /ə/ 소리',
        'Schwa /ə/ tovushi',
        'The schwa /ə/',
        'Звук schwa /ə/',
      ),
      description: L(
        'author, mechanic, pilot, teacher와 여러 일상 단어를 통해 강세가 없는 음절의 schwa /ə/ 소리를 익혀요.',
        'Author, mechanic, pilot, teacher va boshqa so‘zlar orqali urg‘usiz bo‘g‘inlardagi schwa /ə/ tovushini o‘rganasiz.',
        'Recognize and pronounce the schwa /ə/ in unstressed syllables and connected speech.',
        'Учимся распознавать и произносить schwa /ə/ в безударных слогах.',
      ),
      category: LessonCategory.LISTENING,
      level: LV,
      order: 1,
      questions: [
        'en_s2u3_n3_001_word_matching',
        'en_s2u3_n3_002_fill_in_blank',
        'en_s2u3_n3_003_fill_in_blank',
        'en_s2u3_n3_004_fill_in_blank',
        'en_s2u3_n3_005_fill_in_blank',
        'en_s2u3_n3_006_fill_in_blank',
        'en_s2u3_n3_007_fill_in_blank',
        'en_s2u3_n3_008_speaking',
        'en_s2u3_n3_009_speaking',
        'en_s2u3_n3_010_speaking',
        'en_s2u3_n3_011_speaking',
        'en_s2u3_n3_012_speaking',
        'en_s2u3_n3_013_speaking',
        'en_s2u3_n3_014_speaking',
        'en_s2u3_n3_015_speaking',
        'en_s2u3_n3_016_speaking',
        'en_s2u3_n3_017_speaking',
        'en_s2u3_n3_018_speaking',
        'en_s2u3_n3_019_speaking',
        'en_s2u3_n3_020_speaking',
      ],
    },

    {
      title: L(
        '-er로 단어 만들기',
        '-er bilan so‘z yasash',
        'Making words with -er',
        'Образование слов с -er',
      ),
      description: L(
        '동사에 -er를 붙여 명사를 만드는 기본 규칙과 -e로 끝나는 동사, 마지막 자음을 겹쳐 쓰는 단어를 연습해요.',
        'Fe’lga -er qo‘shish, -e bilan tugaydigan fe’llar va oxirgi undosh ikki marta yoziladigan so‘zlarni mashq qilasiz.',
        'Learn how -er forms nouns, including final-e and doubled-consonant spelling patterns.',
        'Изучаем образование существительных с -er, включая конечную -e и удвоение согласной.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 2,
      questions: [
        'en_s2u3_n3_021_word_matching',
        'en_s2u3_n3_022_word_matching',
        'en_s2u3_n3_023_fill_in_blank',
        'en_s2u3_n3_024_fill_in_blank',
        'en_s2u3_n3_025_fill_in_blank',
        'en_s2u3_n3_026_fill_in_blank',
        'en_s2u3_n3_027_fill_in_blank',
        'en_s2u3_n3_028_fill_in_blank',
        'en_s2u3_n3_029_fill_in_blank',
        'en_s2u3_n3_030_fill_in_blank',
        'en_s2u3_n3_031_fill_in_blank',
        'en_s2u3_n3_032_fill_in_blank',
        'en_s2u3_n3_033_fill_in_blank',
        'en_s2u3_n3_034_fill_in_blank',
        'en_s2u3_n3_035_fill_in_blank',
        'en_s2u3_n3_036_word_arrange',
        'en_s2u3_n3_037_translate_builder',
        'en_s2u3_n3_038_type_answer',
        'en_s2u3_n3_039_type_answer',
        'en_s2u3_n3_040_speaking',
      ],
    },

    {
      title: L(
        '-er 어휘 확장',
        '-er lug‘atini kengaytirish',
        '-er vocabulary development',
        'Расширение лексики с -er',
      ),
      description: L(
        'baker, beginner, builder, cooker, dancer, driver, farmer, heater, painter, runner, singer, teacher, winner, worker, writer 등의 뜻을 구별해요.',
        'Baker, beginner, builder, cooker, dancer, driver, farmer, heater, painter, runner, singer, teacher, winner, worker va writer so‘zlarini o‘rganasiz.',
        'Develop your vocabulary with the -er nouns from the 3.3 coursebook and workbook.',
        'Расширяем словарный запас существительными на -er из раздела 3.3.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 3,
      questions: [
        'en_s2u3_n3_041_word_matching',
        'en_s2u3_n3_042_word_matching',
        'en_s2u3_n3_043_fill_in_blank',
        'en_s2u3_n3_044_fill_in_blank',
        'en_s2u3_n3_045_fill_in_blank',
        'en_s2u3_n3_046_fill_in_blank',
        'en_s2u3_n3_047_fill_in_blank',
        'en_s2u3_n3_048_fill_in_blank',
        'en_s2u3_n3_049_fill_in_blank',
        'en_s2u3_n3_050_fill_in_blank',
        'en_s2u3_n3_051_fill_in_blank',
        'en_s2u3_n3_052_fill_in_blank',
        'en_s2u3_n3_053_fill_in_blank',
        'en_s2u3_n3_054_fill_in_blank',
        'en_s2u3_n3_055_fill_in_blank',
        'en_s2u3_n3_056_fill_in_blank',
        'en_s2u3_n3_057_word_arrange',
        'en_s2u3_n3_058_translate_builder',
        'en_s2u3_n3_059_speaking',
        'en_s2u3_n3_060_speaking',
      ],
    },

    {
      title: L(
        '직업을 정의해서 설명하기',
        'Kasblarni ta’riflash',
        'Defining jobs',
        'Описание профессий',
      ),
      description: L(
        '사람이 무엇을 하는지 설명해서 직업 단어를 추론하고, 기본 동사와 -er 명사의 관계를 종합 복습해요.',
        'Odam nima qilishini ta’riflab kasb so‘zini topasiz va fe’l bilan -er otlari orasidagi bog‘lanishni takrorlaysiz.',
        'Use definitions to identify jobs and review the relationship between verbs and -er nouns.',
        'Определяем профессии по описанию и повторяем связь между глаголами и существительными на -er.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 4,
      questions: [
        'en_s2u3_n3_061_word_matching',
        'en_s2u3_n3_062_word_matching',
        'en_s2u3_n3_063_fill_in_blank',
        'en_s2u3_n3_064_fill_in_blank',
        'en_s2u3_n3_065_fill_in_blank',
        'en_s2u3_n3_066_fill_in_blank',
        'en_s2u3_n3_067_fill_in_blank',
        'en_s2u3_n3_068_fill_in_blank',
        'en_s2u3_n3_069_fill_in_blank',
        'en_s2u3_n3_070_fill_in_blank',
        'en_s2u3_n3_071_word_arrange',
        'en_s2u3_n3_072_translate_builder',
        'en_s2u3_n3_073_sentence_builder',
        'en_s2u3_n3_074_type_answer',
        'en_s2u3_n3_075_type_answer',
        'en_s2u3_n3_076_dialog_complete',
        'en_s2u3_n3_077_dialog_complete',
        'en_s2u3_n3_078_speaking',
        'en_s2u3_n3_079_speaking',
        'en_s2u3_n3_080_speaking',
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Section 2 · Unit 3 · Node 4
// 3.4 Speaking and writing
//
// Coverage
// - making requests with Can / Could
// - Could I ...? / Could you ...?
// - Can I ...? / Can you ...?
// - polite requests
// - positive responses
// - negative responses
// - Of course.
// - Sure.
// - That's fine.
// - I'm afraid not.
// - I'm sorry, but ...
//
// Request verbs:
// - bring
// - call
// - leave
// - lend
// - park
// - pay
// - tell
// - use
//
// Situations:
// - course / classroom
// - computer room
// - staying with an English-speaking family
// - joining a library
// - staying in a hotel
// - restaurant / café
// - car park / school
//
// Email:
// - formal / informal
// - Dear ...
// - Hi / Hello ...
// - Best wishes
// - Regards
// - Yours sincerely
// - Love
// - All the best
// - requests in emails
//
// IMPORTANT:
// *_WORDS에는 단어만 등록.
// "personal details", "computer room", "Best wishes",
// "Yours sincerely", "All the best" 등은 headword로 등록하지 않음.
//
// 기존 Unit에서 이미 등록된
// course / meeting / party / question / information / park 등은
// 중복 WORD 등록하지 않고 문제에서 재사용.
//
// 4 lessons × 20 questions = 80
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT3_NODE4_WORDS = [
  {
    code: 'en-noun-request',
    english: 'request',
    senseKey: 'polite-asking-for-something',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '요청',
      'iltimos; so‘rov',
      'a polite act of asking for something',
      'просьба',
    ),
    examples: [
      {
        english: 'That is a polite request.',
        translations: L(
          '그것은 정중한 요청이에요.',
          'Bu muloyim iltimos.',
          'That is a polite request.',
          'Это вежливая просьба.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/rɪˈkwest/',
      ttsText: 'request',
    },
    tags: ['requests', 'speaking', 'unit3'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-person-administrator',
    english: 'administrator',
    senseKey: 'person-who-organizes-office-or-course',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '행정 담당자',
      'administrator',
      'a person who organizes or manages administrative work',
      'администратор',
    ),
    examples: [
      {
        english: 'Please tell the administrator.',
        translations: L(
          '행정 담당자에게 말해 주세요.',
          'Iltimos, administratorga ayting.',
          'Please tell the administrator.',
          'Пожалуйста, скажите администратору.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ədˈmɪnɪstreɪtə/',
      ttsText: 'administrator',
    },
    tags: ['requests', 'course', 'unit3'],
    difficulty: 3,
    isCore: true,
  },

  {
    code: 'en-noun-detail',
    english: 'detail',
    senseKey: 'small-piece-of-information',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '세부 정보',
      'tafsilot',
      'a small piece of information about something',
      'подробность',
    ),
    examples: [
      {
        english: 'Please give your personal details.',
        translations: L(
          '개인 정보를 알려 주세요.',
          'Iltimos, shaxsiy ma’lumotlaringizni bering.',
          'Please give your personal details.',
          'Пожалуйста, сообщите личные данные.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈdiːteɪl/',
      ttsText: 'detail',
    },
    tags: ['requests', 'information', 'unit3'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-password',
    english: 'password',
    senseKey: 'secret-word-for-access',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '비밀번호',
      'parol',
      'a secret word or group of characters used to access something',
      'пароль',
    ),
    examples: [
      {
        english: 'You need a password.',
        translations: L(
          '비밀번호가 필요해요.',
          'Sizga parol kerak.',
          'You need a password.',
          'Вам нужен пароль.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈpɑːswɜːd/',
      ttsText: 'password',
    },
    tags: ['requests', 'computer', 'unit3'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-adjective-polite',
    english: 'polite',
    senseKey: 'showing-good-manners',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '정중한',
      'muloyim',
      'showing good manners and respect',
      'вежливый',
    ),
    examples: [
      {
        english: 'Could you help me? is polite.',
        translations: L(
          'Could you help me?는 정중한 표현이에요.',
          'Could you help me? muloyim ifoda.',
          'Could you help me? is polite.',
          'Could you help me? — вежливая фраза.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/pəˈlaɪt/',
      ttsText: 'polite',
    },
    tags: ['requests', 'speaking', 'unit3'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-adjective-formal',
    english: 'formal',
    senseKey: 'suitable-for-official-situation',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '격식 있는',
      'rasmiy',
      'suitable for an official or serious situation',
      'официальный',
    ),
    examples: [
      {
        english: 'This email is formal.',
        translations: L(
          '이 이메일은 격식 있어요.',
          'Bu email rasmiy.',
          'This email is formal.',
          'Это официальное письмо.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈfɔːməl/',
      ttsText: 'formal',
    },
    tags: ['email', 'writing', 'unit3'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-adjective-informal',
    english: 'informal',
    senseKey: 'relaxed-not-official',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '비격식적인',
      'norasmiy',
      'relaxed and suitable for friends or people you know well',
      'неофициальный',
    ),
    examples: [
      {
        english: 'This message is informal.',
        translations: L(
          '이 메시지는 비격식적이에요.',
          'Bu xabar norasmiy.',
          'This message is informal.',
          'Это неофициальное сообщение.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɪnˈfɔːməl/',
      ttsText: 'informal',
    },
    tags: ['email', 'writing', 'unit3'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-verb-lend',
    english: 'lend',
    senseKey: 'give-temporarily',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '빌려주다',
      'qarzga bermoq',
      'to give something to someone for a short time',
      'одалживать',
    ),
    examples: [
      {
        english: 'Could you lend me some money?',
        translations: L(
          '돈을 조금 빌려줄 수 있나요?',
          'Menga biroz pul qarzga bera olasizmi?',
          'Could you lend me some money?',
          'Не могли бы вы одолжить мне немного денег?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/lend/',
      ttsText: 'lend',
    },
    tags: ['requests', 'verbs', 'unit3'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-verb-park',
    english: 'park',
    senseKey: 'leave-vehicle-in-place',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '주차하다',
      'mashina qo‘ymoq',
      'to leave a vehicle in a place for a period of time',
      'парковать',
    ),
    examples: [
      {
        english: 'Can I park here?',
        translations: L(
          '여기에 주차해도 돼요?',
          'Bu yerga mashina qo‘ysam bo‘ladimi?',
          'Can I park here?',
          'Можно здесь припарковаться?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/pɑːk/',
      ttsText: 'park',
    },
    tags: ['requests', 'verbs', 'unit3'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-attach',
    english: 'attach',
    senseKey: 'add-file-to-message',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '첨부하다',
      'ilova qilmoq',
      'to add a file or document to an email',
      'прикреплять',
    ),
    examples: [
      {
        english: 'I am attaching the information.',
        translations: L(
          '정보를 첨부하고 있어요.',
          'Ma’lumotni ilova qilyapman.',
          'I am attaching the information.',
          'Я прикрепляю информацию.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/əˈtætʃ/',
      ttsText: 'attach',
    },
    tags: ['email', 'writing', 'unit3'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-photography',
    english: 'photography',
    senseKey: 'activity-of-taking-photographs',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '사진 촬영; 사진술',
      'fotografiya',
      'the activity or art of taking photographs',
      'фотография',
    ),
    examples: [
      {
        english: 'It is a photography course.',
        translations: L(
          '사진 촬영 강좌예요.',
          'Bu fotografiya kursi.',
          'It is a photography course.',
          'Это курс фотографии.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/fəˈtɒɡrəfi/',
      ttsText: 'photography',
    },
    tags: ['email', 'course', 'unit3'],
    difficulty: 2,
    isCore: true,
  },
];

export const EN_S2_UNIT3_NODE4_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Making requests
  // ===========================================================

  en_s2u3_n4_001_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Could I open the window?' }],
    options: [
      'Yes, of course.',
      'Yes, I open.',
      'No, I could.',
      'Window is yes.',
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
    tags: ['requests', 'positive-response'],
  },

  en_s2u3_n4_002_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Could you give your personal details to the administrator?',
      },
    ],
    options: [
      'Sorry, but I don’t have them with me today.',
      'Sorry, I am not details.',
      'No, details administrator.',
      'I don’t administrator.',
    ],
    answer: 'Sorry, but I don’t have them with me today.',
    answerTranslation: L(
      '미안하지만 오늘은 가지고 있지 않아요.',
      'Kechirasiz, lekin bugun ular yonimda yo‘q.',
      'Sorry, but I don’t have them with me today.',
      'Извините, но сегодня их у меня с собой нет.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['requests', 'negative-response'],
  },

  en_s2u3_n4_003_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Could I send them by email later?' },
    ],
    options: [
      'That’s fine.',
      'That fine send.',
      'Yes, email later is.',
      'I send fine.',
    ],
    answer: 'That’s fine.',
    answerTranslation: L('괜찮아요.', 'Mayli.', 'That’s fine.', 'Хорошо.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['requests', 'positive-response'],
  },

  en_s2u3_n4_004_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Can you repeat that, please?' }],
    options: [
      'Sure.',
      'Sure repeat you.',
      'No, repeat can.',
      'Please sure that.',
    ],
    answer: 'Sure.',
    answerTranslation: L('물론이죠.', 'Albatta.', 'Sure.', 'Конечно.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['requests', 'positive-response'],
  },

  en_s2u3_n4_005_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Can we use the computers after class?' },
    ],
    options: [
      'Yes, of course, but you need a password.',
      'Yes, you need computer.',
      'No, password use.',
      'Computer of course need.',
    ],
    answer: 'Yes, of course, but you need a password.',
    answerTranslation: L(
      '네, 물론이지만 비밀번호가 필요해요.',
      'Ha, albatta, lekin sizga parol kerak.',
      'Yes, of course, but you need a password.',
      'Да, конечно, но вам нужен пароль.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['requests', 'password'],
  },

  en_s2u3_n4_006_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Can we leave our books and bags in the computer room?',
      },
    ],
    options: [
      'I’m afraid not.',
      'I’m afraid yes.',
      'I don’t afraid.',
      'Not can room.',
    ],
    answer: 'I’m afraid not.',
    answerTranslation: L(
      '유감이지만 안 돼요.',
      'Afsuski, yo‘q.',
      'I’m afraid not.',
      'Боюсь, что нет.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['requests', 'negative-response'],
  },

  en_s2u3_n4_007_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ I open the window?',
    blankAnswers: ['Could'],
    options: ['Could', 'Does', 'Am', 'Did'],
    answer: 'Could',
    answerTranslation: L(
      '창문을 열어도 될까요?',
      'Derazani ochsam bo‘ladimi?',
      'Could I open the window?',
      'Можно мне открыть окно?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['requests', 'could-i'],
  },

  en_s2u3_n4_008_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ you repeat the question?',
    blankAnswers: ['Could'],
    options: ['Could', 'Are', 'Does', 'Have'],
    answer: 'Could',
    answerTranslation: L(
      '질문을 다시 말해 주시겠어요?',
      'Savolni qaytara olasizmi?',
      'Could you repeat the question?',
      'Не могли бы вы повторить вопрос?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['requests', 'could-you'],
  },

  en_s2u3_n4_009_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ I use your pen, please?',
    blankAnswers: ['Can'],
    options: ['Can', 'Does', 'Is', 'Have'],
    answer: 'Can',
    answerTranslation: L(
      '펜을 사용해도 될까요?',
      'Ruchkangizdan foydalansam bo‘ladimi?',
      'Can I use your pen, please?',
      'Можно воспользоваться вашей ручкой?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['requests', 'can-i'],
  },

  en_s2u3_n4_010_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ you pass the salt?',
    blankAnswers: ['Can'],
    options: ['Can', 'Are', 'Do', 'Is'],
    answer: 'Can',
    answerTranslation: L(
      '소금을 건네줄래요?',
      'Tuzni uzatib yubora olasizmi?',
      'Can you pass the salt?',
      'Можете передать соль?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['requests', 'can-you'],
  },

  en_s2u3_n4_011_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Could you repeat the question, ___?',
    blankAnswers: ['please'],
    options: ['please', 'sorry', 'afraid', 'formal'],
    answer: 'please',
    answerTranslation: L(
      '질문을 다시 말해 주시겠어요?',
      'Iltimos, savolni qaytara olasizmi?',
      'Could you repeat the question, please?',
      'Не могли бы вы повторить вопрос, пожалуйста?',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['requests', 'polite'],
  },

  en_s2u3_n4_012_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Can I use your phone?' }],
    options: [
      'Yes, that’s fine.',
      'Yes, I phone.',
      'No, phone is use.',
      'That can fine.',
    ],
    answer: 'Yes, that’s fine.',
    answerTranslation: L(
      '네, 괜찮아요.',
      'Ha, mayli.',
      'Yes, that’s fine.',
      'Да, конечно.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['requests', 'positive-response'],
  },

  en_s2u3_n4_013_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Could I leave early tomorrow?' }],
    options: [
      'I’m sorry, but that’s not possible.',
      'I’m sorry, possible.',
      'No, I leave tomorrow.',
      'Could not sorry possible.',
    ],
    answer: 'I’m sorry, but that’s not possible.',
    answerTranslation: L(
      '미안하지만 그건 어려워요.',
      'Kechirasiz, lekin buning iloji yo‘q.',
      'I’m sorry, but that’s not possible.',
      'Извините, но это невозможно.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['requests', 'negative-response'],
  },

  en_s2u3_n4_014_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['Could', 'you', 'repeat', 'that', 'please'],
    answer: 'Could you repeat that please',
    audioText: 'Could you repeat that, please?',
    answerTranslation: L(
      '다시 말해 주시겠어요?',
      'Iltimos, buni qaytara olasizmi?',
      'Could you repeat that, please?',
      'Не могли бы вы повторить это, пожалуйста?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['requests'],
  },

  en_s2u3_n4_015_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['Can', 'I', 'use', 'your', 'pen', 'please'],
    answer: 'Can I use your pen please',
    answerTranslation: L(
      '펜을 사용해도 될까요?',
      'Ruchkangizdan foydalansam bo‘ladimi?',
      'Can I use your pen, please?',
      'Можно воспользоваться вашей ручкой?',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['requests'],
  },

  en_s2u3_n4_016_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Could I open the window?',
    options: ['Yes', 'of', 'course', 'sorry', 'not'],
    answer: 'Yes of course',
    answerTranslation: L(
      '네, 물론이죠.',
      'Ha, albatta.',
      'Yes, of course.',
      'Да, конечно.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['requests', 'reply'],
  },

  en_s2u3_n4_017_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Can we leave our bags here?',
    options: ['I’m', 'afraid', 'not', 'yes', 'course'],
    answer: 'I’m afraid not',
    answerTranslation: L(
      '유감이지만 안 돼요.',
      'Afsuski, yo‘q.',
      'I’m afraid not.',
      'Боюсь, что нет.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['requests', 'reply'],
  },

  en_s2u3_n4_018_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Could you repeat the question, please?',
    audioText: 'Could you repeat the question, please?',
    answerTranslation: L(
      '질문을 다시 말해 주시겠어요?',
      'Iltimos, savolni qaytara olasizmi?',
      'Could you repeat the question, please?',
      'Не могли бы вы повторить вопрос, пожалуйста?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['requests', 'speaking'],
  },

  en_s2u3_n4_019_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I’m afraid not.',
    audioText: 'I’m afraid not.',
    answerTranslation: L(
      '유감이지만 안 돼요.',
      'Afsuski, yo‘q.',
      'I’m afraid not.',
      'Боюсь, что нет.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['requests', 'negative-response'],
  },

  en_s2u3_n4_020_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Can and could both make requests, but could can sound more formal and polite.',
    audioText:
      'Can and could both make requests, but could can sound more formal and polite.',
    answerTranslation: L(
      'Can과 could 모두 요청에 사용할 수 있지만 could가 더 격식 있고 정중하게 들릴 수 있어요.',
      'Can va could ikkalasi ham iltimos uchun ishlatiladi, lekin could rasmiyroq va muloyimroq eshitiladi.',
      'Can and could both make requests, but could can sound more formal and polite.',
      'Can и could используются для просьб, но could может звучать более формально и вежливо.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['requests', 'review'],
  },

  // ===========================================================
  // Lesson 2 · Request verbs and situations
  // ===========================================================

  en_s2u3_n4_021_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'lend',
        native: 'qarzga bermoq',
        nativeI18n: L('빌려주다', 'qarzga bermoq', 'lend', 'одалживать'),
      },
      {
        text: 'park',
        native: 'mashina qo‘ymoq',
        nativeI18n: L('주차하다', 'mashina qo‘ymoq', 'park', 'парковать'),
      },
      {
        text: 'pay',
        native: 'to‘lamoq',
        nativeI18n: L('지불하다', 'to‘lamoq', 'pay', 'платить'),
      },
      {
        text: 'use',
        native: 'foydalanmoq',
        nativeI18n: L('사용하다', 'foydalanmoq', 'use', 'использовать'),
      },
      {
        text: 'tell',
        native: 'aytmoq',
        nativeI18n: L('말해 주다', 'aytmoq', 'tell', 'говорить'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['requests', 'verbs'],
  },

  en_s2u3_n4_022_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Can I ___ a friend with me?',
    blankAnswers: ['bring'],
    options: ['bring', 'park', 'pay', 'tell'],
    answer: 'bring',
    answerTranslation: L(
      '친구를 데려와도 돼요?',
      'Do‘stimni olib kelsam bo‘ladimi?',
      'Can I bring a friend with me?',
      'Можно мне привести друга?',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['requests', 'bring'],
  },

  en_s2u3_n4_023_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Could you ___ me at my office in the morning?',
    blankAnswers: ['call'],
    options: ['call', 'park', 'lend', 'leave'],
    answer: 'call',
    answerTranslation: L(
      '아침에 제 사무실로 전화해 주시겠어요?',
      'Ertalab ofisimga qo‘ng‘iroq qila olasizmi?',
      'Could you call me at my office in the morning?',
      'Не могли бы вы позвонить мне утром в офис?',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['requests', 'call'],
  },

  en_s2u3_n4_024_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Can I ___ the phone?',
    blankAnswers: ['use'],
    options: ['use', 'lend', 'tell', 'park'],
    answer: 'use',
    answerTranslation: L(
      '전화를 사용해도 돼요?',
      'Telefondan foydalansam bo‘ladimi?',
      'Can I use the phone?',
      'Можно воспользоваться телефоном?',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['requests', 'use'],
  },

  en_s2u3_n4_025_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Could you ___ me some money for the bus?',
    blankAnswers: ['lend'],
    options: ['lend', 'pay', 'park', 'tell'],
    answer: 'lend',
    answerTranslation: L(
      '버스비로 돈을 조금 빌려주실 수 있나요?',
      'Avtobus uchun menga biroz pul qarzga bera olasizmi?',
      'Could you lend me some money for the bus?',
      'Не могли бы вы одолжить мне немного денег на автобус?',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['requests', 'lend'],
  },

  en_s2u3_n4_026_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Can I ___ my own beer?',
    blankAnswers: ['bring'],
    options: ['bring', 'lend', 'tell', 'pay'],
    answer: 'bring',
    answerTranslation: L(
      '제가 맥주를 가져와도 돼요?',
      'O‘z pivoimni olib kelsam bo‘ladimi?',
      'Can I bring my own beer?',
      'Можно принести своё пиво?',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['requests', 'bring'],
  },

  en_s2u3_n4_027_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Can I ___ here for about an hour?',
    blankAnswers: ['park'],
    options: ['park', 'pay', 'lend', 'tell'],
    answer: 'park',
    answerTranslation: L(
      '여기에 한 시간 정도 주차해도 돼요?',
      'Bu yerda taxminan bir soat mashina qo‘ysam bo‘ladimi?',
      'Can I park here for about an hour?',
      'Можно припарковаться здесь примерно на час?',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['requests', 'park'],
  },

  en_s2u3_n4_028_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Could you ___ me the time?',
    blankAnswers: ['tell'],
    options: ['tell', 'lend', 'park', 'leave'],
    answer: 'tell',
    answerTranslation: L(
      '몇 시인지 알려 주시겠어요?',
      'Soat necha ekanini ayta olasizmi?',
      'Could you tell me the time?',
      'Не могли бы вы сказать, который час?',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['requests', 'tell'],
  },

  en_s2u3_n4_029_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Can I ___ for this later?',
    blankAnswers: ['pay'],
    options: ['pay', 'park', 'tell', 'lend'],
    answer: 'pay',
    answerTranslation: L(
      '이건 나중에 계산해도 돼요?',
      'Buning pulini keyin to‘lasam bo‘ladimi?',
      'Can I pay for this later?',
      'Можно заплатить за это позже?',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['requests', 'pay'],
  },

  en_s2u3_n4_030_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'You are staying with an English-speaking family. You want to use the phone.',
      },
    ],
    options: [
      'Can I use the phone, please?',
      'Do I phone?',
      'Could phone use me?',
      'I can the phone?',
    ],
    answer: 'Can I use the phone, please?',
    answerTranslation: L(
      '전화를 사용해도 될까요?',
      'Iltimos, telefondan foydalansam bo‘ladimi?',
      'Can I use the phone, please?',
      'Можно воспользоваться телефоном?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['requests', 'situation'],
  },

  en_s2u3_n4_031_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'You are joining a library. You want information.',
      },
    ],
    options: [
      'Could you give me some information, please?',
      'Information give me?',
      'Can information I?',
      'Could I information?',
    ],
    answer: 'Could you give me some information, please?',
    answerTranslation: L(
      '정보를 좀 알려 주시겠어요?',
      'Iltimos, menga biroz ma’lumot bera olasizmi?',
      'Could you give me some information, please?',
      'Не могли бы вы дать мне немного информации?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['requests', 'library'],
  },

  en_s2u3_n4_032_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'You are staying in a hotel. You want an extra towel.',
      },
    ],
    options: [
      'Could I have another towel, please?',
      'I have towel?',
      'Could another towel me?',
      'Can towel another?',
    ],
    answer: 'Could I have another towel, please?',
    answerTranslation: L(
      '수건을 하나 더 받을 수 있을까요?',
      'Iltimos, yana bitta sochiq olsam bo‘ladimi?',
      'Could I have another towel, please?',
      'Можно мне ещё одно полотенце?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['requests', 'hotel'],
  },

  en_s2u3_n4_033_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'You are in a restaurant. You want to pay for your meal.',
      },
    ],
    options: [
      'Could I pay, please?',
      'Could meal I?',
      'Can I meal?',
      'Pay me please?',
    ],
    answer: 'Could I pay, please?',
    answerTranslation: L(
      '계산할게요.',
      'Iltimos, hisobni to‘lasam.',
      'Could I pay, please?',
      'Можно оплатить счёт?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['requests', 'restaurant'],
  },

  en_s2u3_n4_034_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'You want to borrow your colleague’s pencil.',
      },
    ],
    options: [
      'Can I use your pencil?',
      'Can you pencil?',
      'Could pencil use?',
      'Do I pencil use?',
    ],
    answer: 'Can I use your pencil?',
    answerTranslation: L(
      '연필을 사용해도 될까요?',
      'Qalamingizdan foydalansam bo‘ladimi?',
      'Can I use your pencil?',
      'Можно воспользоваться вашим карандашом?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['requests', 'situation'],
  },

  en_s2u3_n4_035_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['Could', 'you', 'lend', 'me', 'some', 'money'],
    answer: 'Could you lend me some money',
    audioText: 'Could you lend me some money?',
    answerTranslation: L(
      '돈을 좀 빌려주시겠어요?',
      'Menga biroz pul qarzga bera olasizmi?',
      'Could you lend me some money?',
      'Не могли бы вы одолжить мне немного денег?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['requests', 'lend'],
  },

  en_s2u3_n4_036_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['Can', 'I', 'park', 'here', 'please', 'tell'],
    answer: 'Can I park here please',
    answerTranslation: L(
      '여기에 주차해도 될까요?',
      'Iltimos, bu yerga mashina qo‘ysam bo‘ladimi?',
      'Can I park here, please?',
      'Можно здесь припарковаться?',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['requests', 'park'],
  },

  en_s2u3_n4_037_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Could you lend me some money?',
    options: ['Yes', 'of', 'course', 'I’m', 'afraid'],
    answer: 'Yes of course',
    answerTranslation: L(
      '네, 물론이죠.',
      'Ha, albatta.',
      'Yes, of course.',
      'Да, конечно.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['requests', 'reply'],
  },

  en_s2u3_n4_038_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Could you tell me the time, please?',
    audioText: 'Could you tell me the time, please?',
    answerTranslation: L(
      '몇 시인지 알려 주시겠어요?',
      'Iltimos, soat necha ekanini ayta olasizmi?',
      'Could you tell me the time, please?',
      'Не могли бы вы сказать, который час?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['requests'],
  },

  en_s2u3_n4_039_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Can I bring a friend with me?',
    audioText: 'Can I bring a friend with me?',
    answerTranslation: L(
      '친구를 데려와도 돼요?',
      'Do‘stimni olib kelsam bo‘ladimi?',
      'Can I bring a friend with me?',
      'Можно мне привести друга?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['requests'],
  },

  en_s2u3_n4_040_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'We can use bring, call, use, lend, park, tell and pay when making different requests.',
    audioText:
      'We can use bring, call, use, lend, park, tell and pay when making different requests.',
    answerTranslation: L(
      '여러 요청을 할 때 bring, call, use, lend, park, tell, pay를 사용할 수 있어요.',
      'Turli iltimoslarda bring, call, use, lend, park, tell va pay fe’llaridan foydalanish mumkin.',
      'We can use bring, call, use, lend, park, tell and pay when making different requests.',
      'В разных просьбах можно использовать bring, call, use, lend, park, tell и pay.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['requests', 'review'],
  },

  // ===========================================================
  // Lesson 3 · Opening and closing an email
  // ===========================================================

  en_s2u3_n4_041_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '이메일 표현과 격식 정도를 연결하세요.',
      'Email ifodasini rasmiylik darajasi bilan moslang.',
      'Match the email expression with its style.',
      'Соедините выражение из письма со стилем.',
    ),
    pairs: [
      {
        text: 'Dear Mr Green',
        native: 'formal',
        nativeI18n: L('격식', 'rasmiy', 'formal', 'официально'),
      },
      {
        text: 'Yours sincerely',
        native: 'formal',
        nativeI18n: L('격식', 'rasmiy', 'formal', 'официально'),
      },
      {
        text: 'Hi John',
        native: 'informal',
        nativeI18n: L('비격식', 'norasmiy', 'informal', 'неофициально'),
      },
      {
        text: 'Love',
        native: 'informal',
        nativeI18n: L('비격식', 'norasmiy', 'informal', 'неофициально'),
      },
    ],
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['email', 'formal-informal'],
  },

  en_s2u3_n4_042_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ Ricardo,',
    blankAnswers: ['Dear'],
    options: ['Dear', 'Love', 'Regards', 'Sincerely'],
    answer: 'Dear',
    answerTranslation: L(
      'Ricardo에게,',
      'Hurmatli Ricardo,',
      'Dear Ricardo,',
      'Дорогой Рикардо,',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['email', 'opening'],
  },

  en_s2u3_n4_043_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ Mrs Zammit,',
    blankAnswers: ['Dear'],
    options: ['Dear', 'Love', 'Hello', 'Regards'],
    answer: 'Dear',
    answerTranslation: L(
      'Zammit 여사님께,',
      'Hurmatli Zammit xonim,',
      'Dear Mrs Zammit,',
      'Уважаемая миссис Заммит,',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['email', 'formal'],
  },

  en_s2u3_n4_044_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ Roz,',
    blankAnswers: ['Hello'],
    options: ['Hello', 'Yours sincerely', 'Regards', 'Best wishes'],
    answer: 'Hello',
    answerTranslation: L(
      '안녕 Roz,',
      'Salom Roz,',
      'Hello Roz,',
      'Привет, Роз,',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['email', 'informal'],
  },

  en_s2u3_n4_045_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Best ____,',
    blankAnswers: ['wishes'],
    options: ['wishes', 'love', 'dear', 'hello'],
    answer: 'wishes',
    answerTranslation: L(
      '행운을 빌며,',
      'Eng yaxshi tilaklar bilan,',
      'Best wishes,',
      'С наилучшими пожеланиями,',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['email', 'closing'],
  },

  en_s2u3_n4_046_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Yours ____,',
    blankAnswers: ['sincerely'],
    options: ['sincerely', 'love', 'hello', 'wishes'],
    answer: 'sincerely',
    answerTranslation: L(
      '진심을 담아,',
      'Hurmat bilan,',
      'Yours sincerely,',
      'С уважением,',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['email', 'formal'],
  },

  en_s2u3_n4_047_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___, Sally x',
    blankAnswers: ['Love'],
    options: ['Love', 'Dear', 'Hello', 'Could'],
    answer: 'Love',
    answerTranslation: L(
      '사랑을 담아, Sally',
      'Sevgi bilan, Sally',
      'Love, Sally x',
      'С любовью, Салли',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['email', 'informal'],
  },

  en_s2u3_n4_048_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___, Roger',
    blankAnswers: ['Regards'],
    options: ['Regards', 'Hello', 'Dear', 'Love'],
    answer: 'Regards',
    answerTranslation: L(
      '안부를 전하며, Roger',
      'Hurmat bilan, Roger',
      'Regards, Roger',
      'С уважением, Роджер',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['email', 'closing'],
  },

  en_s2u3_n4_049_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Dear Ricardo, I hope you’re well. Could you let me know when you’re free for a meeting this week, please?',
      },
    ],
    options: [
      'Thanks for your email. Can we meet on Friday?',
      'Hi! Your brother can come.',
      'I am attaching information about the photography course.',
      'Love, Sally.',
    ],
    answer: 'Thanks for your email. Can we meet on Friday?',
    answerTranslation: L(
      '이메일 고마워요. 금요일에 만날 수 있을까요?',
      'Emailingiz uchun rahmat. Juma kuni uchrashsak bo‘ladimi?',
      'Thanks for your email. Can we meet on Friday?',
      'Спасибо за письмо. Можем встретиться в пятницу?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['email', 'matching'],
  },

  en_s2u3_n4_050_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Could you send me some information about the photography course, please?',
      },
    ],
    options: [
      'I’m attaching all the information you will need.',
      'Your brother can come.',
      'Can we meet on Friday?',
      'I’m afraid you can’t park here.',
    ],
    answer: 'I’m attaching all the information you will need.',
    answerTranslation: L(
      '필요한 정보를 모두 첨부합니다.',
      'Sizga kerak bo‘ladigan barcha ma’lumotni ilova qilyapman.',
      'I’m attaching all the information you will need.',
      'Я прикрепляю всю необходимую информацию.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['email', 'photography'],
  },

  en_s2u3_n4_051_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Can I bring my brother to your party tomorrow night?',
      },
    ],
    options: [
      'Of course your brother can come!',
      'Yours sincerely.',
      'I’m attaching the course information.',
      'Can we meet on Friday?',
    ],
    answer: 'Of course your brother can come!',
    answerTranslation: L(
      '물론 동생을 데려와도 돼!',
      'Albatta, akang yoki ukang kelishi mumkin!',
      'Of course your brother can come!',
      'Конечно, твой брат может прийти!',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['email', 'informal'],
  },

  en_s2u3_n4_052_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I’m writing ___ the weekend photography course.',
    blankAnswers: ['about'],
    options: ['about', 'at', 'with', 'to'],
    answer: 'about',
    answerTranslation: L(
      '주말 사진 강좌에 관해 글을 드립니다.',
      'Dam olish kunlari fotografiya kursi haqida yozyapman.',
      'I’m writing about the weekend photography course.',
      'Я пишу по поводу курса фотографии выходного дня.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['email', 'writing'],
  },

  en_s2u3_n4_053_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Could you ___ me some information, please?',
    blankAnswers: ['send'],
    options: ['send', 'sent', 'sending', 'sends'],
    answer: 'send',
    answerTranslation: L(
      '정보를 보내 주시겠어요?',
      'Menga biroz ma’lumot yubora olasizmi?',
      'Could you send me some information, please?',
      'Не могли бы вы прислать мне информацию?',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['email', 'request'],
  },

  en_s2u3_n4_054_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Could you let me ___ when you’re free?',
    blankAnswers: ['know'],
    options: ['know', 'knows', 'knowing', 'known'],
    answer: 'know',
    answerTranslation: L(
      '언제 시간이 되는지 알려 주시겠어요?',
      'Qachon bo‘sh ekaningizni menga ayta olasizmi?',
      'Could you let me know when you’re free?',
      'Не могли бы вы сообщить, когда будете свободны?',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['email', 'request'],
  },

  en_s2u3_n4_055_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['Dear', 'Mrs', 'Zammit'],
    answer: 'Dear Mrs Zammit',
    audioText: 'Dear Mrs Zammit.',
    answerTranslation: L(
      'Zammit 여사님께',
      'Hurmatli Zammit xonim',
      'Dear Mrs Zammit',
      'Уважаемая миссис Заммит',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['email', 'formal'],
  },

  en_s2u3_n4_056_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['Could', 'you', 'send', 'me', 'some', 'information'],
    answer: 'Could you send me some information',
    answerTranslation: L(
      '정보를 좀 보내 주시겠어요?',
      'Menga biroz ma’lumot yubora olasizmi?',
      'Could you send me some information?',
      'Не могли бы вы прислать мне информацию?',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['email', 'request'],
  },

  en_s2u3_n4_057_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Yours ',
    sentenceSuffix: ',',
    answer: 'sincerely',
    answerTranslation: L(
      '진심을 담아,',
      'Hurmat bilan,',
      'Yours sincerely,',
      'С уважением,',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Complete the formal email closing: Yours sincerely.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: true,
      },
    },
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['email', 'typing'],
  },

  en_s2u3_n4_058_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Best ',
    sentenceSuffix: ',',
    answer: 'wishes',
    answerTranslation: L(
      '행운을 빌며,',
      'Eng yaxshi tilaklar bilan,',
      'Best wishes,',
      'С наилучшими пожеланиями,',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Complete the email closing: Best wishes.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: true,
      },
    },
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['email', 'typing'],
  },

  en_s2u3_n4_059_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Dear Mrs Zammit, could you send me some information about the photography course, please?',
    audioText:
      'Dear Mrs Zammit, could you send me some information about the photography course, please?',
    answerTranslation: L(
      'Zammit 여사님께, 사진 강좌에 관한 정보를 보내 주시겠어요?',
      'Hurmatli Zammit xonim, fotografiya kursi haqida ma’lumot yubora olasizmi?',
      'Dear Mrs Zammit, could you send me some information about the photography course, please?',
      'Уважаемая миссис Заммит, не могли бы вы прислать информацию о курсе фотографии?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['email', 'formal'],
  },

  en_s2u3_n4_060_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Formal emails can use Dear and Yours sincerely, while informal emails can use Hi, Hello and Love.',
    audioText:
      'Formal emails can use Dear and Yours sincerely, while informal emails can use Hi, Hello and Love.',
    answerTranslation: L(
      '격식 있는 이메일에는 Dear와 Yours sincerely를 사용할 수 있고, 비격식 이메일에는 Hi, Hello, Love를 사용할 수 있어요.',
      'Rasmiy emaillarda Dear va Yours sincerely, norasmiy emaillarda esa Hi, Hello va Love ishlatilishi mumkin.',
      'Formal emails can use Dear and Yours sincerely, while informal emails can use Hi, Hello and Love.',
      'В официальных письмах можно использовать Dear и Yours sincerely, а в неофициальных — Hi, Hello и Love.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['email', 'review'],
  },

  // ===========================================================
  // Lesson 4 · Requests in emails and review
  // ===========================================================

  en_s2u3_n4_061_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ Marion,',
    blankAnswers: ['Dear'],
    options: ['Dear', 'Love', 'Regards', 'Sincerely'],
    answer: 'Dear',
    answerTranslation: L(
      'Marion에게,',
      'Hurmatli Marion,',
      'Dear Marion,',
      'Дорогая Мэрион,',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['email', 'workbook'],
  },

  en_s2u3_n4_062_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Thank you for your email. ___ meet on Tuesday?',
    blankAnswers: ['Can we'],
    options: ['Can we', 'Can I', 'Do we', 'Are we'],
    answer: 'Can we',
    answerTranslation: L(
      '이메일 고마워요. 화요일에 만날 수 있을까요?',
      'Emailingiz uchun rahmat. Seshanba kuni uchrashsak bo‘ladimi?',
      'Thank you for your email. Can we meet on Tuesday?',
      'Спасибо за письмо. Можем встретиться во вторник?',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['email', 'request'],
  },

  en_s2u3_n4_063_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ in the afternoon.',
    blankAnswers: ['I’m free'],
    options: ['I’m free', 'See you', 'Can I', 'Love'],
    answer: 'I’m free',
    answerTranslation: L(
      '오후에는 시간이 돼요.',
      'Tushdan keyin bo‘shman.',
      'I’m free in the afternoon.',
      'Днём я свободен.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['email', 'workbook'],
  },

  en_s2u3_n4_064_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Best ___, Paul',
    blankAnswers: ['wishes'],
    options: ['wishes', 'love', 'dear', 'hello'],
    answer: 'wishes',
    answerTranslation: L(
      '행운을 빌며, Paul',
      'Eng yaxshi tilaklar bilan, Paul',
      'Best wishes, Paul',
      'С наилучшими пожеланиями, Пол',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['email', 'closing'],
  },

  en_s2u3_n4_065_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ Sarah,',
    blankAnswers: ['Hi'],
    options: ['Hi', 'Yours sincerely', 'Regards', 'Dear Mr'],
    answer: 'Hi',
    answerTranslation: L(
      '안녕 Sarah,',
      'Salom Sarah,',
      'Hi Sarah,',
      'Привет, Сара,',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['email', 'informal'],
  },

  en_s2u3_n4_066_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___? I have a quick question.',
    blankAnswers: ['How are you'],
    options: ['How are you', 'Yours sincerely', 'Dear', 'Best wishes'],
    answer: 'How are you',
    answerTranslation: L(
      '잘 지내? 간단히 물어볼 게 있어.',
      'Qalaysiz? Tezkor savolim bor.',
      'How are you? I have a quick question.',
      'Как дела? У меня небольшой вопрос.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['email', 'informal'],
  },

  en_s2u3_n4_067_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ stay at your house?',
    blankAnswers: ['Can I'],
    options: ['Can I', 'Can we', 'Am I', 'Do I'],
    answer: 'Can I',
    answerTranslation: L(
      '네 집에 묵어도 될까?',
      'Uyingizda qolsam bo‘ladimi?',
      'Can I stay at your house?',
      'Можно мне остановиться у тебя?',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['email', 'request'],
  },

  en_s2u3_n4_068_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___, Marion',
    blankAnswers: ['Love'],
    options: ['Love', 'Dear', 'Hello', 'Could'],
    answer: 'Love',
    answerTranslation: L(
      '사랑을 담아, Marion',
      'Sevgi bilan, Marion',
      'Love, Marion',
      'С любовью, Мэрион',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['email', 'informal'],
  },

  en_s2u3_n4_069_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Excuse me, can you help me with this exercise, please?',
      },
    ],
    options: [
      'Yes, of course.',
      'No, I exercise.',
      'Can help me?',
      'I’m exercise.',
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
    tags: ['requests', 'workbook'],
  },

  en_s2u3_n4_070_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Can we have two, please?' }],
    options: [
      'Sure. Anything to eat?',
      'No, I have two.',
      'Anything two?',
      'Can two sure.',
    ],
    answer: 'Sure. Anything to eat?',
    answerTranslation: L(
      '물론이죠. 드실 것도 있나요?',
      'Albatta. Yeyishga biror narsa kerakmi?',
      'Sure. Anything to eat?',
      'Конечно. Что-нибудь поесть?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['requests', 'workbook'],
  },

  en_s2u3_n4_071_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Can I borrow your phone?' }],
    options: [
      'Of course. What’s the problem?',
      'No phone borrow.',
      'Yes, problem phone.',
      'Borrow course what.',
    ],
    answer: 'Of course. What’s the problem?',
    answerTranslation: L(
      '물론이죠. 무슨 문제예요?',
      'Albatta. Muammo nima?',
      'Of course. What’s the problem?',
      'Конечно. Что случилось?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['requests', 'workbook'],
  },

  en_s2u3_n4_072_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Can I leave my car here?' }],
    options: [
      'I’m afraid not.',
      'Yes, I car.',
      'Not can leave?',
      'I afraid car.',
    ],
    answer: 'I’m afraid not.',
    answerTranslation: L(
      '유감이지만 안 돼요.',
      'Afsuski, yo‘q.',
      'I’m afraid not.',
      'Боюсь, что нет.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['requests', 'negative-response'],
  },

  en_s2u3_n4_073_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['Can', 'I', 'stay', 'at', 'your', 'house'],
    answer: 'Can I stay at your house',
    audioText: 'Can I stay at your house?',
    answerTranslation: L(
      '네 집에 묵어도 될까?',
      'Uyingizda qolsam bo‘ladimi?',
      'Can I stay at your house?',
      'Можно мне остановиться у тебя?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['email', 'request'],
  },

  en_s2u3_n4_074_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['Could', 'you', 'let', 'me', 'know', 'please'],
    answer: 'Could you let me know please',
    answerTranslation: L(
      '알려 주시겠어요?',
      'Iltimos, menga ayta olasizmi?',
      'Could you let me know, please?',
      'Не могли бы вы сообщить мне?',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['email', 'request'],
  },

  en_s2u3_n4_075_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Could you send me some information, please?',
    audioText: 'Could you send me some information, please?',
    answerI18n: L(
      '정보를 좀 보내 주시겠어요',
      'Menga biroz ma’lumot yubora olasizmi',
      'Could you send me some information, please',
      'Не могли бы вы прислать мне информацию',
    ),
    options: ['Could', 'you', 'send', 'me', 'some', 'information,', 'please?'],
    optionsI18n: {
      ko: ['정보를', '좀', '보내', '주시겠어요'],
      uz: ['Menga', 'biroz', 'ma’lumot', 'yubora', 'olasizmi'],
      en: ['Could', 'you', 'send', 'me', 'some', 'information,', 'please?'],
      ru: ['Не', 'могли', 'бы', 'вы', 'прислать', 'мне', 'информацию'],
    },
    answerTranslation: L(
      '정보를 좀 보내 주시겠어요?',
      'Menga biroz ma’lumot yubora olasizmi?',
      'Could you send me some information, please?',
      'Не могли бы вы прислать мне информацию?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['email', 'request'],
  },

  en_s2u3_n4_076_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Could you ',
    sentenceSuffix: ' me some information, please?',
    answer: 'send',
    answerTranslation: L(
      '정보를 좀 보내 주시겠어요?',
      'Menga biroz ma’lumot yubora olasizmi?',
      'Could you send me some information, please?',
      'Не могли бы вы прислать мне информацию?',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'Use send in the request Could you send me some information, please?',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: true,
      },
    },
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['requests', 'typing'],
  },

  en_s2u3_n4_077_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Dear Marion, thank you for your email. Can we meet on Tuesday? I’m free in the afternoon. Best wishes, Paul.',
    audioText:
      'Dear Marion, thank you for your email. Can we meet on Tuesday? I’m free in the afternoon. Best wishes, Paul.',
    answerTranslation: L(
      'Marion에게, 이메일 고마워요. 화요일에 만날 수 있을까요? 오후에는 시간이 돼요. 행운을 빌며, Paul.',
      'Hurmatli Marion, emailingiz uchun rahmat. Seshanba kuni uchrashsak bo‘ladimi? Tushdan keyin bo‘shman. Eng yaxshi tilaklar bilan, Paul.',
      'Dear Marion, thank you for your email. Can we meet on Tuesday? I’m free in the afternoon. Best wishes, Paul.',
      'Дорогая Мэрион, спасибо за письмо. Можем встретиться во вторник? Днём я свободен. С наилучшими пожеланиями, Пол.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['email', 'workbook'],
  },

  en_s2u3_n4_078_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Hi Sarah, how are you? I have a quick question. Can I stay at your house? Love, Marion.',
    audioText:
      'Hi Sarah, how are you? I have a quick question. Can I stay at your house? Love, Marion.',
    answerTranslation: L(
      '안녕 Sarah, 잘 지내? 간단히 물어볼 게 있어. 네 집에 묵어도 될까? 사랑을 담아, Marion.',
      'Salom Sarah, qalaysiz? Tezkor savolim bor. Uyingizda qolsam bo‘ladimi? Sevgi bilan, Marion.',
      'Hi Sarah, how are you? I have a quick question. Can I stay at your house? Love, Marion.',
      'Привет, Сара, как дела? У меня небольшой вопрос. Можно мне остановиться у тебя? С любовью, Мэрион.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['email', 'informal'],
  },

  en_s2u3_n4_079_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'A polite request can begin with Can I, Can you, Could I or Could you.',
    audioText:
      'A polite request can begin with Can I, Can you, Could I or Could you.',
    answerTranslation: L(
      '정중한 요청은 Can I, Can you, Could I, Could you로 시작할 수 있어요.',
      'Muloyim iltimos Can I, Can you, Could I yoki Could you bilan boshlanishi mumkin.',
      'A polite request can begin with Can I, Can you, Could I or Could you.',
      'Вежливая просьба может начинаться с Can I, Can you, Could I или Could you.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['requests', 'review'],
  },

  en_s2u3_n4_080_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Use a suitable opening, make the request politely, give the necessary information and finish the email with an appropriate closing.',
    audioText:
      'Use a suitable opening, make the request politely, give the necessary information and finish the email with an appropriate closing.',
    answerTranslation: L(
      '적절한 인사말로 시작하고, 정중하게 요청한 뒤 필요한 정보를 쓰고 알맞은 맺음말로 이메일을 끝내요.',
      'Mos salomlashuv bilan boshlang, iltimosni muloyim ayting, kerakli ma’lumotni yozing va emailni mos yakun bilan tugating.',
      'Use a suitable opening, make the request politely, give the necessary information and finish the email with an appropriate closing.',
      'Начните с подходящего обращения, вежливо сформулируйте просьбу, сообщите нужную информацию и завершите письмо подходящей заключительной фразой.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['unit3', 'node-review'],
  },
};

// ─────────────────────────────────────────────────────────────
// Node 4
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT3_NODE4 = {
  title: L(
    '정중하게 요청하기',
    'Muloyim iltimos qilish',
    'Making polite requests',
    'Вежливые просьбы',
  ),
  section: 2,
  unit: 3,
  order: 4,
  isActive: true,

  lessons: [
    {
      title: L(
        '요청하고 대답하기',
        'Iltimos qilish va javob berish',
        'Making and answering requests',
        'Просьбы и ответы',
      ),
      description: L(
        'Can I, Can you, Could I, Could you를 사용해 요청하고 Of course, Sure, I’m afraid not 등의 표현으로 대답해요.',
        'Can I, Can you, Could I va Could you bilan iltimos qilib, Of course, Sure va I’m afraid not kabi javoblarni mashq qilasiz.',
        'Make requests with Can and Could and respond positively or negatively.',
        'Учимся просить с Can и Could и отвечать на просьбы.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 1,
      questions: [
        'en_s2u3_n4_001_dialog_complete',
        'en_s2u3_n4_002_dialog_complete',
        'en_s2u3_n4_003_dialog_complete',
        'en_s2u3_n4_004_dialog_complete',
        'en_s2u3_n4_005_dialog_complete',
        'en_s2u3_n4_006_dialog_complete',
        'en_s2u3_n4_007_fill_in_blank',
        'en_s2u3_n4_008_fill_in_blank',
        'en_s2u3_n4_009_fill_in_blank',
        'en_s2u3_n4_010_fill_in_blank',
        'en_s2u3_n4_011_fill_in_blank',
        'en_s2u3_n4_012_dialog_complete',
        'en_s2u3_n4_013_dialog_complete',
        'en_s2u3_n4_014_word_arrange',
        'en_s2u3_n4_015_translate_builder',
        'en_s2u3_n4_016_reply_builder',
        'en_s2u3_n4_017_reply_builder',
        'en_s2u3_n4_018_speaking',
        'en_s2u3_n4_019_speaking',
        'en_s2u3_n4_020_speaking',
      ],
    },

    {
      title: L(
        '상황에 맞게 부탁하기',
        'Vaziyatga mos iltimos qilish',
        'Requests for different situations',
        'Просьбы в разных ситуациях',
      ),
      description: L(
        'bring, call, use, lend, park, tell, pay 등의 동사를 사용해 집, 도서관, 호텔, 식당 등 다양한 상황에서 요청해요.',
        'Bring, call, use, lend, park, tell va pay fe’llari bilan uy, kutubxona, mehmonxona va restoran kabi joylarda iltimos qilishni mashq qilasiz.',
        'Use common request verbs in situations such as a home, library, hotel and restaurant.',
        'Практикуем просьбы с разными глаголами дома, в библиотеке, отеле и ресторане.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 2,
      questions: [
        'en_s2u3_n4_021_word_matching',
        'en_s2u3_n4_022_fill_in_blank',
        'en_s2u3_n4_023_fill_in_blank',
        'en_s2u3_n4_024_fill_in_blank',
        'en_s2u3_n4_025_fill_in_blank',
        'en_s2u3_n4_026_fill_in_blank',
        'en_s2u3_n4_027_fill_in_blank',
        'en_s2u3_n4_028_fill_in_blank',
        'en_s2u3_n4_029_fill_in_blank',
        'en_s2u3_n4_030_dialog_complete',
        'en_s2u3_n4_031_dialog_complete',
        'en_s2u3_n4_032_dialog_complete',
        'en_s2u3_n4_033_dialog_complete',
        'en_s2u3_n4_034_dialog_complete',
        'en_s2u3_n4_035_word_arrange',
        'en_s2u3_n4_036_translate_builder',
        'en_s2u3_n4_037_reply_builder',
        'en_s2u3_n4_038_speaking',
        'en_s2u3_n4_039_speaking',
        'en_s2u3_n4_040_speaking',
      ],
    },

    {
      title: L(
        '이메일 시작과 끝맺기',
        'Emailni boshlash va tugatish',
        'Opening and closing an email',
        'Начало и завершение письма',
      ),
      description: L(
        'Dear, Hi, Hello와 Best wishes, Regards, Yours sincerely, Love 등을 구분해 격식 있는 이메일과 비격식 이메일을 작성해요.',
        'Dear, Hi, Hello hamda Best wishes, Regards, Yours sincerely va Love yordamida rasmiy va norasmiy emaillarni farqlaysiz.',
        'Choose suitable formal and informal openings and closings for emails.',
        'Выбираем подходящие официальные и неофициальные обращения и завершения письма.',
      ),
      category: LessonCategory.EXPRESSION,
      level: LV,
      order: 3,
      questions: [
        'en_s2u3_n4_041_word_matching',
        'en_s2u3_n4_042_fill_in_blank',
        'en_s2u3_n4_043_fill_in_blank',
        'en_s2u3_n4_044_fill_in_blank',
        'en_s2u3_n4_045_fill_in_blank',
        'en_s2u3_n4_046_fill_in_blank',
        'en_s2u3_n4_047_fill_in_blank',
        'en_s2u3_n4_048_fill_in_blank',
        'en_s2u3_n4_049_dialog_complete',
        'en_s2u3_n4_050_dialog_complete',
        'en_s2u3_n4_051_dialog_complete',
        'en_s2u3_n4_052_fill_in_blank',
        'en_s2u3_n4_053_fill_in_blank',
        'en_s2u3_n4_054_fill_in_blank',
        'en_s2u3_n4_055_word_arrange',
        'en_s2u3_n4_056_translate_builder',
        'en_s2u3_n4_057_type_answer',
        'en_s2u3_n4_058_type_answer',
        'en_s2u3_n4_059_speaking',
        'en_s2u3_n4_060_speaking',
      ],
    },

    {
      title: L(
        '이메일로 요청하기',
        'Email orqali iltimos qilish',
        'Making requests by email',
        'Просьбы по электронной почте',
      ),
      description: L(
        'Workbook의 이메일 완성 활동과 다양한 요청 상황을 종합해 자연스럽게 요청하고 적절한 opening과 closing을 선택해요.',
        'Workbookdagi email mashqlari va turli iltimos vaziyatlarini birlashtirib, mos boshlanish va yakunni tanlaysiz.',
        'Combine polite requests with appropriate email openings and closings.',
        'Объединяем вежливые просьбы с подходящим началом и завершением письма.',
      ),
      category: LessonCategory.EXPRESSION,
      level: LV,
      order: 4,
      questions: [
        'en_s2u3_n4_061_fill_in_blank',
        'en_s2u3_n4_062_fill_in_blank',
        'en_s2u3_n4_063_fill_in_blank',
        'en_s2u3_n4_064_fill_in_blank',
        'en_s2u3_n4_065_fill_in_blank',
        'en_s2u3_n4_066_fill_in_blank',
        'en_s2u3_n4_067_fill_in_blank',
        'en_s2u3_n4_068_fill_in_blank',
        'en_s2u3_n4_069_dialog_complete',
        'en_s2u3_n4_070_dialog_complete',
        'en_s2u3_n4_071_dialog_complete',
        'en_s2u3_n4_072_dialog_complete',
        'en_s2u3_n4_073_word_arrange',
        'en_s2u3_n4_074_translate_builder',
        'en_s2u3_n4_075_sentence_builder',
        'en_s2u3_n4_076_type_answer',
        'en_s2u3_n4_077_speaking',
        'en_s2u3_n4_078_speaking',
        'en_s2u3_n4_079_speaking',
        'en_s2u3_n4_080_speaking',
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Section 2 · Unit 3 · Node 5
// 3.5 Video + Unit 3 Review
//
// Coverage
// - An Iranian doctor in the USA
// - Arash Fazli
// - Mount Sinai Hospital
// - doctor / patient / medicine / illness
// - neurology / degree
// - hospital-related vocabulary
// - describing a doctor's work
//
// Unit 3 Review:
// - jobs
// - places of work
// - work hours
// - uniform
// - meetings
// - retired / student
// - salary / earn
// - full-time / part-time / freelance
// - work from home
// - long hours
// - colleagues / boss
//
// Grammar:
// - yes/no questions
// - Wh-questions
// - what / where / when / why / who / how often
//
// Vocabulary development:
// - verb + -er nouns
//
// Speaking:
// - making requests
// - Can I / Can you
// - Could I / Could you
// - positive / negative responses
//
// IMPORTANT:
// WORDS에는 단일 headword만 등록.
// "Mount Sinai Hospital", "medical degree",
// "phone number" 같은 phrase는 WORD로 등록하지 않음.
//
// Already registered and reused:
// hospital / nurse / office / uniform / meeting / student
// retired / hours / salary / colleague / company
// full-time / part-time / freelance / manager
// businessman / businesswoman / chef / cleaner / dentist
// hairdresser / journalist / mechanic / musician / pilot
// photographer / teacher / worker etc.
//
// 4 lessons × 20 questions = 80
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT3_NODE5_WORDS = [
  {
    code: 'en-person-doctor',
    english: 'doctor',
    senseKey: 'person-who-treats-sick-people',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '의사',
      'shifokor',
      'a person whose job is to treat sick or injured people',
      'врач',
    ),
    examples: [
      {
        english: 'He is a doctor.',
        translations: L(
          '그는 의사예요.',
          'U shifokor.',
          'He is a doctor.',
          'Он врач.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈdɒktə/',
      ttsText: 'doctor',
    },
    tags: ['jobs', 'health', 'unit3'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-person-patient',
    english: 'patient',
    senseKey: 'person-receiving-medical-treatment',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '환자',
      'bemor',
      'a person who receives medical treatment',
      'пациент',
    ),
    examples: [
      {
        english: 'The doctor visits a patient.',
        translations: L(
          '의사가 환자를 방문해요.',
          'Shifokor bemorni ko‘radi.',
          'The doctor visits a patient.',
          'Врач посещает пациента.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈpeɪʃənt/',
      ttsText: 'patient',
    },
    tags: ['health', 'hospital', 'unit3'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-medicine',
    english: 'medicine',
    senseKey: 'substance-used-to-treat-illness',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '약; 의약품',
      'dori',
      'a substance used to treat an illness',
      'лекарство',
    ),
    examples: [
      {
        english: 'The patient needs medicine.',
        translations: L(
          '환자에게 약이 필요해요.',
          'Bemorga dori kerak.',
          'The patient needs medicine.',
          'Пациенту нужно лекарство.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈmedɪsən/',
      ttsText: 'medicine',
    },
    tags: ['health', 'hospital', 'unit3'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-illness',
    english: 'illness',
    senseKey: 'state-of-being-sick',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '질병',
      'kasallik',
      'a disease or period of being sick',
      'болезнь',
    ),
    examples: [
      {
        english: 'Doctors discuss their patients’ illnesses.',
        translations: L(
          '의사들은 환자들의 질병에 대해 이야기해요.',
          'Shifokorlar bemorlarning kasalliklarini muhokama qiladi.',
          'Doctors discuss their patients’ illnesses.',
          'Врачи обсуждают болезни своих пациентов.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈɪlnəs/',
      ttsText: 'illness',
    },
    tags: ['health', 'hospital', 'unit3'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-neurology',
    english: 'neurology',
    senseKey: 'medical-study-of-nervous-system',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '신경학',
      'nevrologiya',
      'the area of medicine concerned with the nervous system',
      'неврология',
    ),
    examples: [
      {
        english: 'He works in neurology.',
        translations: L(
          '그는 신경학 분야에서 일해요.',
          'U nevrologiya sohasida ishlaydi.',
          'He works in neurology.',
          'Он работает в области неврологии.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/njʊəˈrɒlədʒi/',
      ttsText: 'neurology',
    },
    tags: ['health', 'medicine', 'unit3'],
    difficulty: 3,
    isCore: true,
  },

  {
    code: 'en-noun-degree',
    english: 'degree',
    senseKey: 'university-qualification',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '학위',
      'daraja',
      'a qualification received after completing university study',
      'учёная степень',
    ),
    examples: [
      {
        english: 'She has a university degree.',
        translations: L(
          '그녀는 대학 학위가 있어요.',
          'Uning universitet darajasi bor.',
          'She has a university degree.',
          'У неё есть университетская степень.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/dɪˈɡriː/',
      ttsText: 'degree',
    },
    tags: ['education', 'work', 'unit3'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-person-receptionist',
    english: 'receptionist',
    senseKey: 'person-who-greets-visitors',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '접수원',
      'qabulxona xodimi',
      'a person who welcomes visitors and answers questions in an office or hospital',
      'администратор на ресепшене',
    ),
    examples: [
      {
        english: 'The receptionist works at the hospital.',
        translations: L(
          '접수원은 병원에서 일해요.',
          'Qabulxona xodimi kasalxonada ishlaydi.',
          'The receptionist works at the hospital.',
          'Администратор работает в больнице.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/rɪˈsepʃənɪst/',
      ttsText: 'receptionist',
    },
    tags: ['jobs', 'hospital', 'unit3'],
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
      'a piece of furniture used for sleeping or resting',
      'кровать',
    ),
    examples: [
      {
        english: 'The patient is in bed.',
        translations: L(
          '환자가 침대에 있어요.',
          'Bemor karavotda.',
          'The patient is in bed.',
          'Пациент лежит в кровати.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/bed/',
      ttsText: 'bed',
    },
    tags: ['hospital', 'objects', 'unit3'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-pillow',
    english: 'pillow',
    senseKey: 'soft-object-for-head-in-bed',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '베개',
      'yostiq',
      'a soft object that supports your head in bed',
      'подушка',
    ),
    examples: [
      {
        english: 'There is a pillow on the bed.',
        translations: L(
          '침대 위에 베개가 있어요.',
          'Karavotda yostiq bor.',
          'There is a pillow on the bed.',
          'На кровати есть подушка.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈpɪləʊ/',
      ttsText: 'pillow',
    },
    tags: ['hospital', 'objects', 'unit3'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-laptop',
    english: 'laptop',
    senseKey: 'portable-computer',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '노트북 컴퓨터',
      'noutbuk',
      'a small portable computer',
      'ноутбук',
    ),
    examples: [
      {
        english: 'The doctor uses a laptop.',
        translations: L(
          '의사는 노트북을 사용해요.',
          'Shifokor noutbukdan foydalanadi.',
          'The doctor uses a laptop.',
          'Врач использует ноутбук.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈlæptɒp/',
      ttsText: 'laptop',
    },
    tags: ['technology', 'work', 'unit3'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-phone',
    english: 'phone',
    senseKey: 'device-used-to-call-people',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '전화기; 전화',
      'telefon',
      'a device used to call or communicate with people',
      'телефон',
    ),
    examples: [
      {
        english: 'The doctor has a phone.',
        translations: L(
          '의사에게 전화기가 있어요.',
          'Shifokorda telefon bor.',
          'The doctor has a phone.',
          'У врача есть телефон.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/fəʊn/',
      ttsText: 'phone',
    },
    tags: ['technology', 'work', 'unit3'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-place-university',
    english: 'university',
    senseKey: 'institution-for-higher-education',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '대학교',
      'universitet',
      'an institution where people study for degrees',
      'университет',
    ),
    examples: [
      {
        english: 'She studies at university.',
        translations: L(
          '그녀는 대학에서 공부해요.',
          'U universitetda o‘qiydi.',
          'She studies at university.',
          'Она учится в университете.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌjuːnɪˈvɜːsəti/',
      ttsText: 'university',
    },
    tags: ['education', 'unit3'],
    difficulty: 2,
    isCore: true,
  },
];

export const EN_S2_UNIT3_NODE5_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · An Iranian doctor in the USA
  // ===========================================================

  en_s2u3_n5_001_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'doctor',
        native: 'shifokor',
        nativeI18n: L('의사', 'shifokor', 'doctor', 'врач'),
      },
      {
        text: 'patient',
        native: 'bemor',
        nativeI18n: L('환자', 'bemor', 'patient', 'пациент'),
      },
      {
        text: 'medicine',
        native: 'dori',
        nativeI18n: L('약', 'dori', 'medicine', 'лекарство'),
      },
      {
        text: 'illness',
        native: 'kasallik',
        nativeI18n: L('질병', 'kasallik', 'illness', 'болезнь'),
      },
      {
        text: 'neurology',
        native: 'nevrologiya',
        nativeI18n: L('신경학', 'nevrologiya', 'neurology', 'неврология'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['video', 'medicine'],
  },

  en_s2u3_n5_002_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'degree',
        native: 'daraja',
        nativeI18n: L('학위', 'daraja', 'degree', 'степень'),
      },
      {
        text: 'receptionist',
        native: 'qabulxona xodimi',
        nativeI18n: L(
          '접수원',
          'qabulxona xodimi',
          'receptionist',
          'администратор',
        ),
      },
      {
        text: 'bed',
        native: 'karavot',
        nativeI18n: L('침대', 'karavot', 'bed', 'кровать'),
      },
      {
        text: 'pillow',
        native: 'yostiq',
        nativeI18n: L('베개', 'yostiq', 'pillow', 'подушка'),
      },
      {
        text: 'laptop',
        native: 'noutbuk',
        nativeI18n: L('노트북', 'noutbuk', 'laptop', 'ноутбук'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['video', 'hospital'],
  },

  en_s2u3_n5_003_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Arash Fazli is a ___.',
    blankAnswers: ['doctor'],
    options: ['doctor', 'pilot', 'mechanic', 'journalist'],
    answer: 'doctor',
    answerTranslation: L(
      'Arash Fazli는 의사예요.',
      'Arash Fazli shifokor.',
      'Arash Fazli is a doctor.',
      'Араш Фазли — врач.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['video', 'doctor'],
  },

  en_s2u3_n5_004_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'He works in ___.',
    blankAnswers: ['neurology'],
    options: ['neurology', 'photography', 'journalism', 'music'],
    answer: 'neurology',
    answerTranslation: L(
      '그는 신경학 분야에서 일해요.',
      'U nevrologiya sohasida ishlaydi.',
      'He works in neurology.',
      'Он работает в области неврологии.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['video', 'neurology'],
  },

  en_s2u3_n5_005_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'He works at Mount Sinai ___.',
    blankAnswers: ['Hospital'],
    options: ['Hospital', 'Factory', 'Office', 'University'],
    answer: 'Hospital',
    answerTranslation: L(
      '그는 Mount Sinai Hospital에서 일해요.',
      'U Mount Sinai Hospitalda ishlaydi.',
      'He works at Mount Sinai Hospital.',
      'Он работает в Mount Sinai Hospital.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['video', 'hospital'],
  },

  en_s2u3_n5_006_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A doctor visits ___.',
    blankAnswers: ['patients'],
    options: ['patients', 'pilots', 'builders', 'drivers'],
    answer: 'patients',
    answerTranslation: L(
      '의사는 환자들을 방문해요.',
      'Shifokor bemorlarni ko‘radi.',
      'A doctor visits patients.',
      'Врач посещает пациентов.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['video', 'patients'],
  },

  en_s2u3_n5_007_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Doctors discuss their patients’ ___.',
    blankAnswers: ['illnesses'],
    options: ['illnesses', 'offices', 'meetings', 'salaries'],
    answer: 'illnesses',
    answerTranslation: L(
      '의사들은 환자들의 질병에 대해 이야기해요.',
      'Shifokorlar bemorlarning kasalliklarini muhokama qiladi.',
      'Doctors discuss their patients’ illnesses.',
      'Врачи обсуждают болезни пациентов.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['video', 'illness'],
  },

  en_s2u3_n5_008_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A sick person may need ___.',
    blankAnswers: ['medicine'],
    options: ['medicine', 'salary', 'uniform', 'meeting'],
    answer: 'medicine',
    answerTranslation: L(
      '아픈 사람에게 약이 필요할 수 있어요.',
      'Kasal odamga dori kerak bo‘lishi mumkin.',
      'A sick person may need medicine.',
      'Больному человеку может понадобиться лекарство.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['video', 'medicine'],
  },

  en_s2u3_n5_009_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A university qualification is a ___.',
    blankAnswers: ['degree'],
    options: ['degree', 'pillow', 'patient', 'medicine'],
    answer: 'degree',
    answerTranslation: L(
      '대학에서 받는 자격은 학위예요.',
      'Universitet malakasi daraja hisoblanadi.',
      'A university qualification is a degree.',
      'Университетская квалификация — это степень.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['video', 'degree'],
  },

  en_s2u3_n5_010_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A patient can rest in a ___.',
    blankAnswers: ['bed'],
    options: ['bed', 'degree', 'salary', 'office'],
    answer: 'bed',
    answerTranslation: L(
      '환자는 침대에서 쉴 수 있어요.',
      'Bemor karavotda dam olishi mumkin.',
      'A patient can rest in a bed.',
      'Пациент может отдыхать в кровати.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['video', 'hospital'],
  },

  en_s2u3_n5_011_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A ___ can welcome people at a hospital.',
    blankAnswers: ['receptionist'],
    options: ['receptionist', 'pilot', 'farmer', 'singer'],
    answer: 'receptionist',
    answerTranslation: L(
      '접수원은 병원에서 사람들을 맞이할 수 있어요.',
      'Qabulxona xodimi kasalxonada odamlarni kutib oladi.',
      'A receptionist can welcome people at a hospital.',
      'Администратор может встречать людей в больнице.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['video', 'hospital'],
  },

  en_s2u3_n5_012_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A doctor can use a ___ for work.',
    blankAnswers: ['laptop'],
    options: ['laptop', 'pillow', 'medicine', 'degree'],
    answer: 'laptop',
    answerTranslation: L(
      '의사는 업무에 노트북을 사용할 수 있어요.',
      'Shifokor ishda noutbukdan foydalanishi mumkin.',
      'A doctor can use a laptop for work.',
      'Врач может использовать ноутбук для работы.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['video', 'technology'],
  },

  en_s2u3_n5_013_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['works', 'hospital', 'a', 'in', 'doctor', 'The'],
    answer: 'The doctor works in a hospital',
    audioText: 'The doctor works in a hospital.',
    answerTranslation: L(
      '의사는 병원에서 일해요.',
      'Shifokor kasalxonada ishlaydi.',
      'The doctor works in a hospital.',
      'Врач работает в больнице.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['video', 'doctor'],
  },

  en_s2u3_n5_014_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['doctor', 'visits', 'The', 'patients', 'office'],
    answer: 'The doctor visits patients',
    answerTranslation: L(
      '의사는 환자들을 진료해요.',
      'Shifokor bemorlarni ko‘radi.',
      'The doctor visits patients.',
      'Врач посещает пациентов.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['video', 'patients'],
  },

  en_s2u3_n5_015_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'He works in neurology at Mount Sinai Hospital.',
    audioText: 'He works in neurology at Mount Sinai Hospital.',
    answerI18n: L(
      '그는 Mount Sinai Hospital의 신경학 분야에서 일해요',
      'U Mount Sinai Hospitalda nevrologiya sohasida ishlaydi',
      'He works in neurology at Mount Sinai Hospital',
      'Он работает в области неврологии в Mount Sinai Hospital',
    ),
    options: [
      'He',
      'works',
      'in',
      'neurology',
      'at',
      'Mount',
      'Sinai',
      'Hospital.',
    ],
    optionsI18n: {
      ko: [
        '그는',
        'Mount',
        'Sinai',
        'Hospital의',
        '신경학',
        '분야에서',
        '일해요',
      ],
      uz: [
        'U',
        'Mount',
        'Sinai',
        'Hospitalda',
        'nevrologiya',
        'sohasida',
        'ishlaydi',
      ],
      en: [
        'He',
        'works',
        'in',
        'neurology',
        'at',
        'Mount',
        'Sinai',
        'Hospital.',
      ],
      ru: [
        'Он',
        'работает',
        'в',
        'области',
        'неврологии',
        'в',
        'Mount',
        'Sinai',
        'Hospital',
      ],
    },
    answerTranslation: L(
      '그는 Mount Sinai Hospital의 신경학 분야에서 일해요.',
      'U Mount Sinai Hospitalda nevrologiya sohasida ishlaydi.',
      'He works in neurology at Mount Sinai Hospital.',
      'Он работает в области неврологии в Mount Sinai Hospital.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['video', 'neurology'],
  },

  en_s2u3_n5_016_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Where does Arash Fazli work?' }],
    options: [
      'At Mount Sinai Hospital.',
      'In a factory.',
      'At a cinema.',
      'In a restaurant.',
    ],
    answer: 'At Mount Sinai Hospital.',
    answerTranslation: L(
      'Mount Sinai Hospital에서요.',
      'Mount Sinai Hospitalda.',
      'At Mount Sinai Hospital.',
      'В Mount Sinai Hospital.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['video', 'work'],
  },

  en_s2u3_n5_017_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'What area of medicine does he work in?' },
    ],
    options: ['Neurology.', 'Photography.', 'Journalism.', 'Engineering.'],
    answer: 'Neurology.',
    answerTranslation: L(
      '신경학이요.',
      'Nevrologiya.',
      'Neurology.',
      'Неврология.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['video', 'neurology'],
  },

  en_s2u3_n5_018_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Arash Fazli is a doctor in neurology.',
    audioText: 'Arash Fazli is a doctor in neurology.',
    answerTranslation: L(
      'Arash Fazli는 신경학 분야의 의사예요.',
      'Arash Fazli nevrologiya sohasidagi shifokor.',
      'Arash Fazli is a doctor in neurology.',
      'Араш Фазли — врач в области неврологии.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['video', 'doctor'],
  },

  en_s2u3_n5_019_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Doctors visit patients and discuss their illnesses.',
    audioText: 'Doctors visit patients and discuss their illnesses.',
    answerTranslation: L(
      '의사들은 환자들을 진료하고 질병에 대해 이야기해요.',
      'Shifokorlar bemorlarni ko‘radi va ularning kasalliklarini muhokama qiladi.',
      'Doctors visit patients and discuss their illnesses.',
      'Врачи посещают пациентов и обсуждают их болезни.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['video', 'patients'],
  },

  en_s2u3_n5_020_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'A hospital has doctors, nurses, patients and receptionists.',
    audioText: 'A hospital has doctors, nurses, patients and receptionists.',
    answerTranslation: L(
      '병원에는 의사, 간호사, 환자와 접수원이 있어요.',
      'Kasalxonada shifokorlar, hamshiralar, bemorlar va qabulxona xodimlari bor.',
      'A hospital has doctors, nurses, patients and receptionists.',
      'В больнице есть врачи, медсёстры, пациенты и администраторы.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['video', 'review'],
  },

  // ===========================================================
  // Lesson 2 · Jobs and work review
  // ===========================================================

  en_s2u3_n5_021_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'photographer',
        native: 'fotograf',
        nativeI18n: L('사진작가', 'fotograf', 'photographer', 'фотограф'),
      },
      {
        text: 'journalist',
        native: 'jurnalist',
        nativeI18n: L('기자', 'jurnalist', 'journalist', 'журналист'),
      },
      {
        text: 'mechanic',
        native: 'mexanik',
        nativeI18n: L('정비사', 'mexanik', 'mechanic', 'механик'),
      },
      {
        text: 'hairdresser',
        native: 'sartarosh',
        nativeI18n: L('미용사', 'sartarosh', 'hairdresser', 'парикмахер'),
      },
      {
        text: 'dentist',
        native: 'tish shifokori',
        nativeI18n: L('치과 의사', 'tish shifokori', 'dentist', 'стоматолог'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit3-review', 'jobs'],
  },

  en_s2u3_n5_022_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'freelance',
        native: 'frilanser',
        nativeI18n: L('프리랜서', 'frilanser', 'freelance', 'фриланс'),
      },
      {
        text: 'retired',
        native: 'nafaqadagi',
        nativeI18n: L('은퇴한', 'nafaqadagi', 'retired', 'на пенсии'),
      },
      {
        text: 'part-time',
        native: 'yarim stavkada',
        nativeI18n: L(
          '파트타임으로',
          'yarim stavkada',
          'part-time',
          'неполный рабочий день',
        ),
      },
      {
        text: 'salary',
        native: 'maosh',
        nativeI18n: L('급여', 'maosh', 'salary', 'зарплата'),
      },
      {
        text: 'colleague',
        native: 'hamkasb',
        nativeI18n: L('동료', 'hamkasb', 'colleague', 'коллега'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit3-review', 'work'],
  },

  en_s2u3_n5_023_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I work in an ___.',
    blankAnswers: ['office'],
    options: ['office', 'salary', 'uniform', 'student'],
    answer: 'office',
    answerTranslation: L(
      '저는 사무실에서 일해요.',
      'Men ofisda ishlayman.',
      'I work in an office.',
      'Я работаю в офисе.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit3-review', 'office'],
  },

  en_s2u3_n5_024_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I have a lot of ___.',
    blankAnswers: ['meetings'],
    options: ['meetings', 'uniform', 'retired', 'student'],
    answer: 'meetings',
    answerTranslation: L(
      '저는 회의가 많아요.',
      'Mening yig‘ilishlarim ko‘p.',
      'I have a lot of meetings.',
      'У меня много встреч.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit3-review', 'meetings'],
  },

  en_s2u3_n5_025_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Police officers can be in ___.',
    blankAnswers: ['uniform'],
    options: ['uniform', 'salary', 'office', 'student'],
    answer: 'uniform',
    answerTranslation: L(
      '경찰관은 제복을 입고 있을 수 있어요.',
      'Politsiya xodimlari formada bo‘lishi mumkin.',
      'Police officers can be in uniform.',
      'Полицейские могут быть в форме.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit3-review', 'uniform'],
  },

  en_s2u3_n5_026_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A nurse can wear a ___.',
    blankAnswers: ['uniform'],
    options: ['uniform', 'meeting', 'salary', 'student'],
    answer: 'uniform',
    answerTranslation: L(
      '간호사는 제복을 입을 수 있어요.',
      'Hamshira forma kiyishi mumkin.',
      'A nurse can wear a uniform.',
      'Медсестра может носить форму.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit3-review', 'uniform'],
  },

  en_s2u3_n5_027_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Some people work long ___.',
    blankAnswers: ['hours'],
    options: ['hours', 'salaries', 'uniforms', 'offices'],
    answer: 'hours',
    answerTranslation: L(
      '어떤 사람들은 장시간 일해요.',
      'Ba’zi odamlar uzoq vaqt ishlaydi.',
      'Some people work long hours.',
      'Некоторые люди работают много часов.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit3-review', 'hours'],
  },

  en_s2u3_n5_028_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'My grandfather is ___.',
    blankAnswers: ['retired'],
    options: ['retired', 'salary', 'office', 'meeting'],
    answer: 'retired',
    answerTranslation: L(
      '제 할아버지는 은퇴했어요.',
      'Bobom nafaqada.',
      'My grandfather is retired.',
      'Мой дедушка на пенсии.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit3-review', 'retired'],
  },

  en_s2u3_n5_029_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Where do you work?' }],
    options: [
      'I work in a hospital.',
      'At about ten.',
      'Because I like helping people.',
      'Every day.',
    ],
    answer: 'I work in a hospital.',
    answerTranslation: L(
      '병원에서 일해요.',
      'Men kasalxonada ishlayman.',
      'I work in a hospital.',
      'Я работаю в больнице.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['unit3-review', 'where'],
  },

  en_s2u3_n5_030_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What time do you start work?' }],
    options: [
      'At about ten.',
      'In a hospital.',
      'With my customers.',
      'Because I help people.',
    ],
    answer: 'At about ten.',
    answerTranslation: L(
      '10시쯤이요.',
      'Taxminan soat o‘nda.',
      'At about ten.',
      'Примерно в десять.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['unit3-review', 'what-time'],
  },

  en_s2u3_n5_031_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What do you wear at work?' }],
    options: ['A uniform.', 'At ten.', 'In an office.', 'Every day.'],
    answer: 'A uniform.',
    answerTranslation: L(
      '제복을 입어요.',
      'Forma kiyaman.',
      'A uniform.',
      'Форму.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['unit3-review', 'uniform'],
  },

  en_s2u3_n5_032_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Why do you enjoy your job?' }],
    options: [
      'Because I can help other people.',
      'In a hospital.',
      'At ten o’clock.',
      'With my customers.',
    ],
    answer: 'Because I can help other people.',
    answerTranslation: L(
      '다른 사람들을 도울 수 있기 때문이에요.',
      'Chunki boshqa odamlarga yordam bera olaman.',
      'Because I can help other people.',
      'Потому что я могу помогать другим людям.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['unit3-review', 'why'],
  },

  en_s2u3_n5_033_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Who do you speak to at work?' }],
    options: ['My customers.', 'At ten.', 'Every day.', 'In a hospital.'],
    answer: 'My customers.',
    answerTranslation: L(
      '제 고객들과 이야기해요.',
      'Mijozlarim bilan gaplashaman.',
      'My customers.',
      'С моими клиентами.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['unit3-review', 'who'],
  },

  en_s2u3_n5_034_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'How often do you work from home?' }],
    options: ['Every day.', 'At ten.', 'In an office.', 'A uniform.'],
    answer: 'Every day.',
    answerTranslation: L(
      '매일이요.',
      'Har kuni.',
      'Every day.',
      'Каждый день.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['unit3-review', 'how-often'],
  },

  en_s2u3_n5_035_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['work', 'Where', 'do', 'you'],
    answer: 'Where do you work',
    audioText: 'Where do you work?',
    answerTranslation: L(
      '어디에서 일해요?',
      'Qayerda ishlaysiz?',
      'Where do you work?',
      'Где вы работаете?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['unit3-review', 'wh-question'],
  },

  en_s2u3_n5_036_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['Why', 'do', 'you', 'enjoy', 'your', 'job'],
    answer: 'Why do you enjoy your job',
    answerTranslation: L(
      '왜 자신의 직업을 좋아해요?',
      'Nega ishingizni yoqtirasiz?',
      'Why do you enjoy your job?',
      'Почему вам нравится ваша работа?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['unit3-review', 'wh-question'],
  },

  en_s2u3_n5_037_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'I work from home every day.',
    audioText: 'I work from home every day.',
    answerI18n: L(
      '저는 매일 집에서 일해요',
      'Men har kuni uyda ishlayman',
      'I work from home every day',
      'Я каждый день работаю из дома',
    ),
    options: ['I', 'work', 'from', 'home', 'every', 'day.'],
    optionsI18n: {
      ko: ['저는', '매일', '집에서', '일해요'],
      uz: ['Men', 'har', 'kuni', 'uyda', 'ishlayman'],
      en: ['I', 'work', 'from', 'home', 'every', 'day.'],
      ru: ['Я', 'каждый', 'день', 'работаю', 'из', 'дома'],
    },
    answerTranslation: L(
      '저는 매일 집에서 일해요.',
      'Men har kuni uyda ishlayman.',
      'I work from home every day.',
      'Я каждый день работаю из дома.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['unit3-review', 'work'],
  },

  en_s2u3_n5_038_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I work in an office and I have a lot of meetings.',
    audioText: 'I work in an office and I have a lot of meetings.',
    answerTranslation: L(
      '저는 사무실에서 일하고 회의가 많아요.',
      'Men ofisda ishlayman va yig‘ilishlarim ko‘p.',
      'I work in an office and I have a lot of meetings.',
      'Я работаю в офисе, и у меня много встреч.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit3-review', 'work'],
  },

  en_s2u3_n5_039_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Some people work long hours and some people work part-time.',
    audioText: 'Some people work long hours and some people work part-time.',
    answerTranslation: L(
      '어떤 사람들은 장시간 일하고 어떤 사람들은 파트타임으로 일해요.',
      'Ba’zi odamlar uzoq vaqt, boshqalari esa yarim stavkada ishlaydi.',
      'Some people work long hours and some people work part-time.',
      'Некоторые работают много часов, а некоторые — неполный день.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit3-review', 'hours'],
  },

  en_s2u3_n5_040_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'We can describe a job by talking about the workplace, hours, salary, uniform, boss and colleagues.',
    audioText:
      'We can describe a job by talking about the workplace, hours, salary, uniform, boss and colleagues.',
    answerTranslation: L(
      '근무 장소, 시간, 급여, 제복, 상사와 동료에 대해 말해서 직업을 설명할 수 있어요.',
      'Ish joyi, soatlar, maosh, forma, boshliq va hamkasblar haqida gapirib ishni tasvirlash mumkin.',
      'We can describe a job by talking about the workplace, hours, salary, uniform, boss and colleagues.',
      'Работу можно описать через место, часы, зарплату, форму, начальника и коллег.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['unit3-review', 'jobs'],
  },

  // ===========================================================
  // Lesson 3 · Questions and -er review
  // ===========================================================

  en_s2u3_n5_041_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '의문사와 질문 내용을 연결하세요.',
      'So‘roq so‘zini uning ma’nosi bilan moslang.',
      'Match each question word with the information it asks for.',
      'Соедините вопросительное слово с типом информации.',
    ),
    pairs: [
      {
        text: 'where',
        native: 'place',
        nativeI18n: L('장소', 'joy', 'place', 'место'),
      },
      {
        text: 'when',
        native: 'time',
        nativeI18n: L('시간', 'vaqt', 'time', 'время'),
      },
      {
        text: 'who',
        native: 'person',
        nativeI18n: L('사람', 'odam', 'person', 'человек'),
      },
      {
        text: 'why',
        native: 'reason',
        nativeI18n: L('이유', 'sabab', 'reason', 'причина'),
      },
      {
        text: 'how often',
        native: 'frequency',
        nativeI18n: L('빈도', 'takroriylik', 'frequency', 'частота'),
      },
    ],
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit3-review', 'wh-questions'],
  },

  en_s2u3_n5_042_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ do you work?',
    blankAnswers: ['Where'],
    options: ['Where', 'Who', 'Why', 'When'],
    answer: 'Where',
    answerTranslation: L(
      '어디에서 일해요?',
      'Qayerda ishlaysiz?',
      'Where do you work?',
      'Где вы работаете?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit3-review', 'where'],
  },

  en_s2u3_n5_043_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ time do you start work?',
    blankAnswers: ['What'],
    options: ['What', 'Who', 'Why', 'How'],
    answer: 'What',
    answerTranslation: L(
      '몇 시에 일을 시작해요?',
      'Ishni soat nechada boshlaysiz?',
      'What time do you start work?',
      'Во сколько вы начинаете работу?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit3-review', 'what-time'],
  },

  en_s2u3_n5_044_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ do you speak to at work?',
    blankAnswers: ['Who'],
    options: ['Who', 'Where', 'When', 'Why'],
    answer: 'Who',
    answerTranslation: L(
      '직장에서 누구와 이야기해요?',
      'Ishda kim bilan gaplashasiz?',
      'Who do you speak to at work?',
      'С кем вы разговариваете на работе?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit3-review', 'who'],
  },

  en_s2u3_n5_045_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ do you enjoy your job?',
    blankAnswers: ['Why'],
    options: ['Why', 'Where', 'Who', 'When'],
    answer: 'Why',
    answerTranslation: L(
      '왜 자신의 직업을 좋아해요?',
      'Nega ishingizni yoqtirasiz?',
      'Why do you enjoy your job?',
      'Почему вам нравится ваша работа?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit3-review', 'why'],
  },

  en_s2u3_n5_046_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ often do you work from home?',
    blankAnswers: ['How'],
    options: ['How', 'What', 'Where', 'Who'],
    answer: 'How',
    answerTranslation: L(
      '얼마나 자주 집에서 일해요?',
      'Qanchalik tez-tez uyda ishlaysiz?',
      'How often do you work from home?',
      'Как часто вы работаете из дома?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit3-review', 'how-often'],
  },

  en_s2u3_n5_047_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ you work from home?',
    blankAnswers: ['Do'],
    options: ['Do', 'Does', 'Are', 'Is'],
    answer: 'Do',
    answerTranslation: L(
      '집에서 일하나요?',
      'Uyda ishlaysizmi?',
      'Do you work from home?',
      'Вы работаете из дома?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit3-review', 'yes-no'],
  },

  en_s2u3_n5_048_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ she work part-time?',
    blankAnswers: ['Does'],
    options: ['Does', 'Do', 'Is', 'Are'],
    answer: 'Does',
    answerTranslation: L(
      '그녀는 파트타임으로 일하나요?',
      'U yarim stavkada ishlaydimi?',
      'Does she work part-time?',
      'Она работает неполный день?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit3-review', 'does'],
  },

  en_s2u3_n5_049_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ he retired?',
    blankAnswers: ['Is'],
    options: ['Is', 'Does', 'Do', 'Are'],
    answer: 'Is',
    answerTranslation: L(
      '그는 은퇴했나요?',
      'U nafaqadami?',
      'Is he retired?',
      'Он на пенсии?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit3-review', 'be'],
  },

  en_s2u3_n5_050_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '동사와 -er 명사를 연결하세요.',
      'Fe’lni -er oti bilan moslang.',
      'Match each verb with its -er noun.',
      'Соедините глагол с существительным на -er.',
    ),
    pairs: [
      {
        text: 'teach',
        native: 'teacher',
        nativeI18n: L('teacher', 'teacher', 'teacher', 'teacher'),
      },
      {
        text: 'write',
        native: 'writer',
        nativeI18n: L('writer', 'writer', 'writer', 'writer'),
      },
      {
        text: 'drive',
        native: 'driver',
        nativeI18n: L('driver', 'driver', 'driver', 'driver'),
      },
      {
        text: 'run',
        native: 'runner',
        nativeI18n: L('runner', 'runner', 'runner', 'runner'),
      },
      {
        text: 'win',
        native: 'winner',
        nativeI18n: L('winner', 'winner', 'winner', 'winner'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit3-review', 'suffix-er'],
  },

  en_s2u3_n5_051_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'teach → ___',
    blankAnswers: ['teacher'],
    options: ['teacher', 'techer', 'teachor', 'teaching'],
    answer: 'teacher',
    answerTranslation: L(
      'teach → teacher',
      'teach → teacher',
      'teach → teacher',
      'teach → teacher',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit3-review', 'suffix-er'],
  },

  en_s2u3_n5_052_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'write → ___',
    blankAnswers: ['writer'],
    options: ['writer', 'writeer', 'writter', 'writor'],
    answer: 'writer',
    answerTranslation: L(
      'write → writer',
      'write → writer',
      'write → writer',
      'write → writer',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit3-review', 'suffix-er'],
  },

  en_s2u3_n5_053_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'run → ___',
    blankAnswers: ['runner'],
    options: ['runner', 'runer', 'runor', 'runrer'],
    answer: 'runner',
    answerTranslation: L(
      'run → runner',
      'run → runner',
      'run → runner',
      'run → runner',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['unit3-review', 'suffix-er'],
  },

  en_s2u3_n5_054_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'win → ___',
    blankAnswers: ['winner'],
    options: ['winner', 'winer', 'winor', 'winrer'],
    answer: 'winner',
    answerTranslation: L(
      'win → winner',
      'win → winner',
      'win → winner',
      'win → winner',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['unit3-review', 'suffix-er'],
  },

  en_s2u3_n5_055_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['do', 'work', 'Where', 'you'],
    answer: 'Where do you work',
    audioText: 'Where do you work?',
    answerTranslation: L(
      '어디에서 일해요?',
      'Qayerda ishlaysiz?',
      'Where do you work?',
      'Где вы работаете?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['unit3-review', 'questions'],
  },

  en_s2u3_n5_056_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['Who', 'do', 'you', 'work', 'with'],
    answer: 'Who do you work with',
    answerTranslation: L(
      '누구와 함께 일해요?',
      'Kim bilan ishlaysiz?',
      'Who do you work with?',
      'С кем вы работаете?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['unit3-review', 'questions'],
  },

  en_s2u3_n5_057_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'How often do you work from home?',
    audioText: 'How often do you work from home?',
    answerI18n: L(
      '얼마나 자주 집에서 일해요',
      'Qanchalik tez-tez uyda ishlaysiz',
      'How often do you work from home',
      'Как часто вы работаете из дома',
    ),
    options: ['How', 'often', 'do', 'you', 'work', 'from', 'home?'],
    optionsI18n: {
      ko: ['얼마나', '자주', '집에서', '일해요'],
      uz: ['Qanchalik', 'tez-tez', 'uyda', 'ishlaysiz'],
      en: ['How', 'often', 'do', 'you', 'work', 'from', 'home?'],
      ru: ['Как', 'часто', 'вы', 'работаете', 'из', 'дома'],
    },
    answerTranslation: L(
      '얼마나 자주 집에서 일해요?',
      'Qanchalik tez-tez uyda ishlaysiz?',
      'How often do you work from home?',
      'Как часто вы работаете из дома?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['unit3-review', 'questions'],
  },

  en_s2u3_n5_058_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: '',
    sentenceSuffix: ' do you work?',
    answer: 'Where',
    answerTranslation: L(
      '어디에서 일해요?',
      'Qayerda ishlaysiz?',
      'Where do you work?',
      'Где вы работаете?',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Use Where to ask about a workplace.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit3-review', 'typing'],
  },

  en_s2u3_n5_059_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Where do you work? What time do you start? Who do you work with? Why do you enjoy your job?',
    audioText:
      'Where do you work? What time do you start? Who do you work with? Why do you enjoy your job?',
    answerTranslation: L(
      '어디에서 일해요? 몇 시에 시작해요? 누구와 일해요? 왜 자신의 직업을 좋아해요?',
      'Qayerda ishlaysiz? Soat nechada boshlaysiz? Kim bilan ishlaysiz? Nega ishingizni yoqtirasiz?',
      'Where do you work? What time do you start? Who do you work with? Why do you enjoy your job?',
      'Где вы работаете? Во сколько начинаете? С кем работаете? Почему вам нравится работа?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit3-review', 'questions'],
  },

  en_s2u3_n5_060_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Unit 3 uses yes-no questions and Wh-questions to ask about jobs and working life.',
    audioText:
      'Unit 3 uses yes-no questions and Wh-questions to ask about jobs and working life.',
    answerTranslation: L(
      'Unit 3에서는 Yes/No 질문과 Wh-질문으로 직업과 직장 생활에 대해 물어요.',
      'Unit 3 da ish va ish hayoti haqida Yes/No va Wh-savollar ishlatiladi.',
      'Unit 3 uses yes-no questions and Wh-questions to ask about jobs and working life.',
      'В Unit 3 вопросы Yes/No и Wh используются для разговора о работе.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['unit3-review', 'grammar'],
  },

  // ===========================================================
  // Lesson 4 · Requests and Unit 3 final review
  // ===========================================================

  en_s2u3_n5_061_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Can ___ help me with the photocopier, please?',
    blankAnswers: ['you'],
    options: ['you', 'I', 'he', 'we'],
    answer: 'you',
    answerTranslation: L(
      '복사기 사용하는 것을 도와주시겠어요?',
      'Fotokopiya apparati bilan menga yordam bera olasizmi?',
      'Can you help me with the photocopier, please?',
      'Можете помочь мне с копировальным аппаратом?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit3-review', 'requests'],
  },

  en_s2u3_n5_062_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Could ___ leave early today, please?',
    blankAnswers: ['I'],
    options: ['I', 'you', 'he', 'they'],
    answer: 'I',
    answerTranslation: L(
      '오늘 일찍 가도 될까요?',
      'Bugun ertaroq ketsam bo‘ladimi?',
      'Could I leave early today, please?',
      'Можно мне сегодня уйти пораньше?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit3-review', 'requests'],
  },

  en_s2u3_n5_063_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Can ___ give me your number, please?',
    blankAnswers: ['you'],
    options: ['you', 'I', 'he', 'we'],
    answer: 'you',
    answerTranslation: L(
      '전화번호를 알려주시겠어요?',
      'Raqamingizni bera olasizmi?',
      'Can you give me your number, please?',
      'Можете дать мне свой номер?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit3-review', 'requests'],
  },

  en_s2u3_n5_064_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Could ___ write your name here, please?',
    blankAnswers: ['you'],
    options: ['you', 'I', 'she', 'we'],
    answer: 'you',
    answerTranslation: L(
      '여기에 이름을 써주시겠어요?',
      'Ismingizni bu yerga yoza olasizmi?',
      'Could you write your name here, please?',
      'Не могли бы вы написать здесь своё имя?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit3-review', 'requests'],
  },

  en_s2u3_n5_065_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Could ___ ask a question?',
    blankAnswers: ['I'],
    options: ['I', 'you', 'they', 'she'],
    answer: 'I',
    answerTranslation: L(
      '질문해도 될까요?',
      'Savol bersam bo‘ladimi?',
      'Could I ask a question?',
      'Можно задать вопрос?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit3-review', 'requests'],
  },

  en_s2u3_n5_066_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Can ___ use your phone for a moment, please?',
    blankAnswers: ['I'],
    options: ['I', 'you', 'he', 'they'],
    answer: 'I',
    answerTranslation: L(
      '잠깐 전화기를 사용해도 될까요?',
      'Telefoningizdan bir daqiqa foydalansam bo‘ladimi?',
      'Can I use your phone for a moment, please?',
      'Можно ненадолго воспользоваться вашим телефоном?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit3-review', 'requests'],
  },

  en_s2u3_n5_067_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Can you help me, please?' }],
    options: ['Yes, of course.', 'Yes, I am.', 'Yes, I do.', 'Yes, help.'],
    answer: 'Yes, of course.',
    answerTranslation: L(
      '네, 물론이죠.',
      'Ha, albatta.',
      'Yes, of course.',
      'Да, конечно.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['unit3-review', 'requests'],
  },

  en_s2u3_n5_068_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Could I leave early today?' }],
    options: [
      'I’m sorry, but that’s not possible.',
      'Yes, I do.',
      'No, I don’t leave.',
      'You are early.',
    ],
    answer: 'I’m sorry, but that’s not possible.',
    answerTranslation: L(
      '미안하지만 그건 어려워요.',
      'Kechirasiz, lekin buning iloji yo‘q.',
      'I’m sorry, but that’s not possible.',
      'Извините, но это невозможно.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit3-review', 'requests'],
  },

  en_s2u3_n5_069_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Could I ask a question?' }],
    options: ['Sure.', 'Yes, I ask.', 'Question is sure.', 'No, I question.'],
    answer: 'Sure.',
    answerTranslation: L('물론이죠.', 'Albatta.', 'Sure.', 'Конечно.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['unit3-review', 'requests'],
  },

  en_s2u3_n5_070_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Can I use your phone for a moment?' },
    ],
    options: [
      'Yes, that’s fine.',
      'Yes, I use.',
      'Phone does.',
      'You are phone.',
    ],
    answer: 'Yes, that’s fine.',
    answerTranslation: L(
      '네, 괜찮아요.',
      'Ha, mayli.',
      'Yes, that’s fine.',
      'Да, конечно.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['unit3-review', 'requests'],
  },

  en_s2u3_n5_071_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['Can', 'you', 'help', 'me', 'please'],
    answer: 'Can you help me please',
    audioText: 'Can you help me, please?',
    answerTranslation: L(
      '도와주시겠어요?',
      'Menga yordam bera olasizmi?',
      'Can you help me, please?',
      'Можете мне помочь?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['unit3-review', 'requests'],
  },

  en_s2u3_n5_072_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['Could', 'I', 'ask', 'a', 'question'],
    answer: 'Could I ask a question',
    answerTranslation: L(
      '질문해도 될까요?',
      'Savol bersam bo‘ladimi?',
      'Could I ask a question?',
      'Можно задать вопрос?',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['unit3-review', 'requests'],
  },

  en_s2u3_n5_073_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Could you write your name here, please?',
    audioText: 'Could you write your name here, please?',
    answerI18n: L(
      '여기에 이름을 써주시겠어요',
      'Ismingizni bu yerga yoza olasizmi',
      'Could you write your name here, please',
      'Не могли бы вы написать здесь своё имя',
    ),
    options: ['Could', 'you', 'write', 'your', 'name', 'here,', 'please?'],
    optionsI18n: {
      ko: ['여기에', '이름을', '써주시겠어요'],
      uz: ['Ismingizni', 'bu', 'yerga', 'yoza', 'olasizmi'],
      en: ['Could', 'you', 'write', 'your', 'name', 'here,', 'please?'],
      ru: ['Не', 'могли', 'бы', 'вы', 'написать', 'здесь', 'своё', 'имя'],
    },
    answerTranslation: L(
      '여기에 이름을 써주시겠어요?',
      'Ismingizni bu yerga yoza olasizmi?',
      'Could you write your name here, please?',
      'Не могли бы вы написать здесь своё имя?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['unit3-review', 'requests'],
  },

  en_s2u3_n5_074_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Could ',
    sentenceSuffix: ' help me, please?',
    answer: 'you',
    answerTranslation: L(
      '도와주시겠어요?',
      'Menga yordam bera olasizmi?',
      'Could you help me, please?',
      'Не могли бы вы мне помочь?',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Use you in a request asking another person for help.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit3-review', 'typing'],
  },

  en_s2u3_n5_075_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Can I use your phone for a moment?',
    options: ['Yes', 'of', 'course', 'I’m', 'afraid'],
    answer: 'Yes of course',
    answerTranslation: L(
      '네, 물론이죠.',
      'Ha, albatta.',
      'Yes, of course.',
      'Да, конечно.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['unit3-review', 'requests'],
  },

  en_s2u3_n5_076_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Could I leave early today?',
    options: ['I’m', 'afraid', 'not', 'yes', 'course'],
    answer: 'I’m afraid not',
    answerTranslation: L(
      '유감이지만 안 돼요.',
      'Afsuski, yo‘q.',
      'I’m afraid not.',
      'Боюсь, что нет.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit3-review', 'requests'],
  },

  en_s2u3_n5_077_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Can you help me with the photocopier, please?',
    audioText: 'Can you help me with the photocopier, please?',
    answerTranslation: L(
      '복사기 사용하는 것을 도와주시겠어요?',
      'Fotokopiya apparati bilan menga yordam bera olasizmi?',
      'Can you help me with the photocopier, please?',
      'Можете помочь мне с копировальным аппаратом?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit3-review', 'requests'],
  },

  en_s2u3_n5_078_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Could I ask a question?',
    audioText: 'Could I ask a question?',
    answerTranslation: L(
      '질문해도 될까요?',
      'Savol bersam bo‘ladimi?',
      'Could I ask a question?',
      'Можно задать вопрос?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['unit3-review', 'requests'],
  },

  en_s2u3_n5_079_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Unit 3 teaches us how to talk about jobs, ask about working life and make polite requests.',
    audioText:
      'Unit 3 teaches us how to talk about jobs, ask about working life and make polite requests.',
    answerTranslation: L(
      'Unit 3에서는 직업에 대해 말하고, 직장 생활에 대해 질문하고, 정중하게 요청하는 방법을 배워요.',
      'Unit 3 da kasblar haqida gapirish, ish hayoti haqida savol berish va muloyim iltimos qilishni o‘rganamiz.',
      'Unit 3 teaches us how to talk about jobs, ask about working life and make polite requests.',
      'В Unit 3 мы учимся говорить о профессиях, задавать вопросы о работе и вежливо просить.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit3-review', 'final'],
  },

  en_s2u3_n5_080_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'A doctor works with patients, a photographer uses a camera, a mechanic works with his hands and an office worker may have many meetings.',
    audioText:
      'A doctor works with patients, a photographer uses a camera, a mechanic works with his hands and an office worker may have many meetings.',
    answerTranslation: L(
      '의사는 환자와 일하고, 사진작가는 카메라를 사용하며, 정비사는 손으로 일하고, 사무직 근로자는 회의가 많을 수 있어요.',
      'Shifokor bemorlar bilan ishlaydi, fotograf kameradan foydalanadi, mexanik qo‘llari bilan ishlaydi va ofis ishchisining ko‘p yig‘ilishlari bo‘lishi mumkin.',
      'A doctor works with patients, a photographer uses a camera, a mechanic works with his hands and an office worker may have many meetings.',
      'Врач работает с пациентами, фотограф использует камеру, механик работает руками, а у офисного работника может быть много встреч.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit3', 'node-review'],
  },
};

// ─────────────────────────────────────────────────────────────
// Node 5
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT3_NODE5 = {
  title: L(
    '의사의 하루와 Unit 3 종합 복습',
    'Shifokor kuni va Unit 3 takrori',
    'A doctor’s work and Unit 3 review',
    'Работа врача и повторение Unit 3',
  ),
  section: 2,
  unit: 3,
  order: 5,
  isActive: true,

  lessons: [
    {
      title: L(
        '미국에서 일하는 의사',
        'AQShda ishlaydigan shifokor',
        'An Iranian doctor in the USA',
        'Иранский врач в США',
      ),
      description: L(
        'Arash Fazli의 병원 생활을 통해 doctor, patient, medicine, illness, neurology 등 의료 관련 어휘를 익혀요.',
        'Arash Fazli haqidagi video orqali doctor, patient, medicine, illness va neurology kabi tibbiyot so‘zlarini o‘rganasiz.',
        'Learn medical and hospital vocabulary through the video about Arash Fazli.',
        'Изучаем медицинскую лексику по видео об Араше Фазли.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 1,
      questions: [
        'en_s2u3_n5_001_word_matching',
        'en_s2u3_n5_002_word_matching',
        'en_s2u3_n5_003_fill_in_blank',
        'en_s2u3_n5_004_fill_in_blank',
        'en_s2u3_n5_005_fill_in_blank',
        'en_s2u3_n5_006_fill_in_blank',
        'en_s2u3_n5_007_fill_in_blank',
        'en_s2u3_n5_008_fill_in_blank',
        'en_s2u3_n5_009_fill_in_blank',
        'en_s2u3_n5_010_fill_in_blank',
        'en_s2u3_n5_011_fill_in_blank',
        'en_s2u3_n5_012_fill_in_blank',
        'en_s2u3_n5_013_word_arrange',
        'en_s2u3_n5_014_translate_builder',
        'en_s2u3_n5_015_sentence_builder',
        'en_s2u3_n5_016_dialog_complete',
        'en_s2u3_n5_017_dialog_complete',
        'en_s2u3_n5_018_speaking',
        'en_s2u3_n5_019_speaking',
        'en_s2u3_n5_020_speaking',
      ],
    },

    {
      title: L(
        '직업과 근무 형태 복습',
        'Kasblar va ish shakllari takrori',
        'Jobs and working life review',
        'Повторение профессий и работы',
      ),
      description: L(
        '직업, 근무 장소, 회의, 근무 시간, 제복, 재택근무, 파트타임과 은퇴 상태 등 Unit 3 핵심 어휘를 복습해요.',
        'Kasblar, ish joyi, yig‘ilishlar, ish vaqti, forma, uyda ishlash, part-time va nafaqani takrorlaysiz.',
        'Review the key Unit 3 vocabulary for jobs, workplaces, hours and working arrangements.',
        'Повторяем ключевую лексику Unit 3 о профессиях и условиях работы.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 2,
      questions: [
        'en_s2u3_n5_021_word_matching',
        'en_s2u3_n5_022_word_matching',
        'en_s2u3_n5_023_fill_in_blank',
        'en_s2u3_n5_024_fill_in_blank',
        'en_s2u3_n5_025_fill_in_blank',
        'en_s2u3_n5_026_fill_in_blank',
        'en_s2u3_n5_027_fill_in_blank',
        'en_s2u3_n5_028_fill_in_blank',
        'en_s2u3_n5_029_dialog_complete',
        'en_s2u3_n5_030_dialog_complete',
        'en_s2u3_n5_031_dialog_complete',
        'en_s2u3_n5_032_dialog_complete',
        'en_s2u3_n5_033_dialog_complete',
        'en_s2u3_n5_034_dialog_complete',
        'en_s2u3_n5_035_word_arrange',
        'en_s2u3_n5_036_translate_builder',
        'en_s2u3_n5_037_sentence_builder',
        'en_s2u3_n5_038_speaking',
        'en_s2u3_n5_039_speaking',
        'en_s2u3_n5_040_speaking',
      ],
    },

    {
      title: L(
        '질문과 -er 단어 복습',
        'Savollar va -er so‘zlari takrori',
        'Questions and -er review',
        'Повторение вопросов и слов на -er',
      ),
      description: L(
        'Do/Does/Is 질문, where·who·why·how often 등의 의문사와 teacher, writer, runner, winner 같은 -er 명사를 복습해요.',
        'Do/Does/Is savollari, where, who, why, how often va teacher, writer, runner, winner kabi -er otlarini takrorlaysiz.',
        'Review yes/no questions, Wh-questions and common nouns formed with -er.',
        'Повторяем вопросы Yes/No, Wh-вопросы и существительные с -er.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 3,
      questions: [
        'en_s2u3_n5_041_word_matching',
        'en_s2u3_n5_042_fill_in_blank',
        'en_s2u3_n5_043_fill_in_blank',
        'en_s2u3_n5_044_fill_in_blank',
        'en_s2u3_n5_045_fill_in_blank',
        'en_s2u3_n5_046_fill_in_blank',
        'en_s2u3_n5_047_fill_in_blank',
        'en_s2u3_n5_048_fill_in_blank',
        'en_s2u3_n5_049_fill_in_blank',
        'en_s2u3_n5_050_word_matching',
        'en_s2u3_n5_051_fill_in_blank',
        'en_s2u3_n5_052_fill_in_blank',
        'en_s2u3_n5_053_fill_in_blank',
        'en_s2u3_n5_054_fill_in_blank',
        'en_s2u3_n5_055_word_arrange',
        'en_s2u3_n5_056_translate_builder',
        'en_s2u3_n5_057_sentence_builder',
        'en_s2u3_n5_058_type_answer',
        'en_s2u3_n5_059_speaking',
        'en_s2u3_n5_060_speaking',
      ],
    },

    {
      title: L(
        '요청 표현과 Unit 3 마무리',
        'Iltimoslar va Unit 3 yakuni',
        'Requests and Unit 3 final review',
        'Просьбы и итоговое повторение Unit 3',
      ),
      description: L(
        'Can I, Can you, Could I, Could you 요청과 긍정·거절 응답을 복습하고 Unit 3 전체 내용을 마무리해요.',
        'Can I, Can you, Could I va Could you bilan iltimoslarni, javoblarni va Unit 3 mazmunini yakuniy takrorlaysiz.',
        'Review polite requests and responses and finish the complete Unit 3 review.',
        'Повторяем вежливые просьбы и ответы и завершаем Unit 3.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 4,
      questions: [
        'en_s2u3_n5_061_fill_in_blank',
        'en_s2u3_n5_062_fill_in_blank',
        'en_s2u3_n5_063_fill_in_blank',
        'en_s2u3_n5_064_fill_in_blank',
        'en_s2u3_n5_065_fill_in_blank',
        'en_s2u3_n5_066_fill_in_blank',
        'en_s2u3_n5_067_dialog_complete',
        'en_s2u3_n5_068_dialog_complete',
        'en_s2u3_n5_069_dialog_complete',
        'en_s2u3_n5_070_dialog_complete',
        'en_s2u3_n5_071_word_arrange',
        'en_s2u3_n5_072_translate_builder',
        'en_s2u3_n5_073_sentence_builder',
        'en_s2u3_n5_074_type_answer',
        'en_s2u3_n5_075_reply_builder',
        'en_s2u3_n5_076_reply_builder',
        'en_s2u3_n5_077_speaking',
        'en_s2u3_n5_078_speaking',
        'en_s2u3_n5_079_speaking',
        'en_s2u3_n5_080_speaking',
      ],
    },
  ],
};
