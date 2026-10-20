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

const REPLY_INSTRUCTION = L(
  '상대의 말을 듣고 알맞은 대답을 만드세요.',
  'Suhbatdoshning gapini tinglab, mos javob tuzing.',
  'Listen and build the correct reply.',
  'Послушайте собеседника и составьте подходящий ответ.',
);

// ─────────────────────────────────────────────────────────────
// Section 1 · Unit 3 · Node 1
// 3.1 My neighbours
//
// Coverage
// - adjective + noun:
//   clever woman / funny film / friendly dog
//   great book / hard job / lovely city
// - a/an before adjective + noun
// - irregular plurals:
//   man → men
//   woman → women
//   person → people
//   child → children
// - neighbour / flat / building / village / house / garden
// - musician / artist / painting / manager / pet / goldfish
// - have got / has got positive
// - contractions:
//   I've got / you've got / we've got / they've got
//   he's got / she's got / it's got
// - describing neighbours, homes, jobs, children and pets
// - reading skill: identify key nouns and adjectives
//
// 4 lessons × 20 questions = 80
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT3_NODE1_WORDS = [
  {
    code: 'en-person-neighbour',
    english: 'neighbour',
    senseKey: 'person-living-nearby',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('이웃', 'qo‘shni', 'a person who lives near you', 'сосед'),
    examples: [
      {
        english: 'Antony is my neighbour.',
        translations: L(
          'Antony는 제 이웃이에요.',
          'Antony mening qo‘shnim.',
          'Antony is my neighbour.',
          'Антони — мой сосед.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈneɪbə/',
      ttsText: 'neighbour',
    },
    media: {
      emoji: '🏘️',
      imageUrl: '',
      imageAlt: L(
        '옆집에 사는 이웃',
        'yonma-yon yashaydigan qo‘shni',
        'a neighbour',
        'сосед',
      ),
    },
    tags: ['people', 'home'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-home-flat',
    english: 'flat',
    senseKey: 'apartment-home',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '아파트; 공동주택 한 세대',
      'kvartira',
      'a home that is part of a larger building',
      'квартира',
    ),
    examples: [
      {
        english: 'We’ve got a lovely flat.',
        translations: L(
          '우리는 멋진 아파트가 있어요.',
          'Bizning chiroyli kvartiramiz bor.',
          'We’ve got a lovely flat.',
          'У нас прекрасная квартира.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/flæt/',
      ttsText: 'flat',
    },
    media: {
      emoji: '🏢',
      imageUrl: '',
      imageAlt: L('아파트', 'kvartira', 'a flat', 'квартира'),
    },
    tags: ['home'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-place-building',
    english: 'building',
    senseKey: 'structure',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('건물', 'bino', 'a structure with walls and a roof', 'здание'),
    examples: [
      {
        english: 'There are twenty flats in the building.',
        translations: L(
          '그 건물에는 아파트가 스무 세대 있어요.',
          'Binoda yigirmata kvartira bor.',
          'There are twenty flats in the building.',
          'В здании двадцать квартир.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈbɪldɪŋ/',
      ttsText: 'building',
    },
    media: {
      emoji: '🏢',
      imageUrl: '',
      imageAlt: L('건물', 'bino', 'a building', 'здание'),
    },
    tags: ['places', 'home'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-home-village',
    english: 'village',
    senseKey: 'small-settlement',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('마을', 'qishloq', 'a small place where people live', 'деревня'),
    examples: [
      {
        english: 'We’ve got a house in a quiet village.',
        translations: L(
          '우리는 조용한 마을에 집이 있어요.',
          'Bizning tinch qishloqda uyimiz bor.',
          'We’ve got a house in a quiet village.',
          'У нас есть дом в тихой деревне.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈvɪlɪdʒ/',
      ttsText: 'village',
    },
    media: {
      emoji: '🏘️',
      imageUrl: '',
      imageAlt: L('작은 마을', 'kichik qishloq', 'a village', 'деревня'),
    },
    tags: ['places', 'home'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-home-garden',
    english: 'garden',
    senseKey: 'home-garden',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '정원',
      'bog‘',
      'an area outside a house where plants grow',
      'сад',
    ),
    examples: [
      {
        english: 'They’ve got a lovely garden.',
        translations: L(
          '그들에게는 멋진 정원이 있어요.',
          'Ularning chiroyli bog‘i bor.',
          'They’ve got a lovely garden.',
          'У них прекрасный сад.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈɡɑːdn/',
      ttsText: 'garden',
    },
    media: {
      emoji: '🌳',
      imageUrl: '',
      imageAlt: L('정원', 'bog‘', 'a garden', 'сад'),
    },
    tags: ['home'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-job-musician',
    english: 'musician',
    senseKey: 'music-profession',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '음악가',
      'musiqachi',
      'a person who plays or creates music',
      'музыкант',
    ),
    examples: [
      {
        english: 'He’s a musician.',
        translations: L(
          '그는 음악가예요.',
          'U musiqachi.',
          'He’s a musician.',
          'Он музыкант.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/mjuˈzɪʃn/',
      ttsText: 'musician',
    },
    media: {
      emoji: '🎵',
      imageUrl: '',
      imageAlt: L('음악가', 'musiqachi', 'a musician', 'музыкант'),
    },
    tags: ['jobs', 'people'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-job-artist',
    english: 'artist',
    senseKey: 'visual-artist',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '예술가; 화가',
      'rassom; san’atkor',
      'a person who creates art',
      'художник',
    ),
    examples: [
      {
        english: 'They’re artists.',
        translations: L(
          '그들은 예술가예요.',
          'Ular rassomlar.',
          'They’re artists.',
          'Они художники.',
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
      imageAlt: L('예술가', 'rassom', 'an artist', 'художник'),
    },
    tags: ['jobs', 'people'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-art-painting',
    english: 'painting',
    senseKey: 'painted-picture',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '그림; 회화 작품',
      'rasm',
      'a picture made with paint',
      'картина',
    ),
    examples: [
      {
        english: 'They’ve got lovely paintings.',
        translations: L(
          '그들은 멋진 그림들을 가지고 있어요.',
          'Ularning chiroyli rasmlari bor.',
          'They’ve got lovely paintings.',
          'У них прекрасные картины.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈpeɪntɪŋ/',
      ttsText: 'painting',
    },
    media: {
      emoji: '🖼️',
      imageUrl: '',
      imageAlt: L('그림', 'rasm', 'a painting', 'картина'),
    },
    tags: ['art', 'possessions'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-job-manager',
    english: 'manager',
    senseKey: 'person-in-charge',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '관리자; 매니저',
      'menejer',
      'a person who is responsible for a business or place',
      'менеджер',
    ),
    examples: [
      {
        english: 'She’s the manager.',
        translations: L(
          '그녀가 관리자예요.',
          'U menejer.',
          'She’s the manager.',
          'Она менеджер.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈmænɪdʒə/',
      ttsText: 'manager',
    },
    media: {
      emoji: '🧑‍💼',
      imageUrl: '',
      imageAlt: L('관리자', 'menejer', 'a manager', 'менеджер'),
    },
    tags: ['jobs'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-animal-pet',
    english: 'pet',
    senseKey: 'animal-kept-at-home',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '반려동물',
      'uy hayvoni',
      'an animal kept at home',
      'домашнее животное',
    ),
    examples: [
      {
        english: 'We’ve got two pets.',
        translations: L(
          '우리는 반려동물이 두 마리 있어요.',
          'Bizning ikkita uy hayvonimiz bor.',
          'We’ve got two pets.',
          'У нас два домашних животных.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/pet/',
      ttsText: 'pet',
    },
    media: {
      emoji: '🐾',
      imageUrl: '',
      imageAlt: L('반려동물', 'uy hayvoni', 'a pet', 'домашнее животное'),
    },
    tags: ['animals', 'possessions'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-animal-goldfish',
    english: 'goldfish',
    senseKey: 'pet-fish',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '금붕어',
      'oltin baliq',
      'a small orange fish often kept as a pet',
      'золотая рыбка',
    ),
    examples: [
      {
        english: 'She’s got two goldfish.',
        translations: L(
          '그녀에게는 금붕어가 두 마리 있어요.',
          'Uning ikkita oltin balig‘i bor.',
          'She’s got two goldfish.',
          'У неё две золотые рыбки.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈɡəʊldfɪʃ/',
      ttsText: 'goldfish',
    },
    media: {
      emoji: '🐠',
      imageUrl: '',
      imageAlt: L('금붕어', 'oltin baliq', 'a goldfish', 'золотая рыбка'),
    },
    tags: ['animals', 'pets'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-clever',
    english: 'clever',
    senseKey: 'intelligent',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '영리한; 똑똑한',
      'aqlli',
      'quick to learn and understand',
      'умный',
    ),
    examples: [
      {
        english: 'She’s a clever woman.',
        translations: L(
          '그녀는 똑똑한 여성이에요.',
          'U aqlli ayol.',
          'She’s a clever woman.',
          'Она умная женщина.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈklevə/',
      ttsText: 'clever',
    },
    media: {
      emoji: '🧠',
      imageUrl: '',
      imageAlt: L(
        '똑똑한 사람',
        'aqlli odam',
        'a clever person',
        'умный человек',
      ),
    },
    tags: ['adjectives', 'description'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-funny',
    english: 'funny',
    senseKey: 'makes-you-laugh',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('웃긴; 재미있는', 'kulgili', 'making you laugh', 'смешной'),
    examples: [
      {
        english: 'It’s a funny film.',
        translations: L(
          '재미있는 영화예요.',
          'Bu kulgili film.',
          'It’s a funny film.',
          'Это смешной фильм.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈfʌni/',
      ttsText: 'funny',
    },
    media: {
      emoji: '😂',
      imageUrl: '',
      imageAlt: L(
        '재미있는 것',
        'kulgili narsa',
        'something funny',
        'что-то смешное',
      ),
    },
    tags: ['adjectives', 'description'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-friendly',
    english: 'friendly',
    senseKey: 'kind-and-pleasant',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '친절한; 다정한',
      'do‘stona; mehribon',
      'kind and pleasant towards people',
      'дружелюбный',
    ),
    examples: [
      {
        english: 'They’re friendly neighbours.',
        translations: L(
          '그들은 친절한 이웃이에요.',
          'Ular do‘stona qo‘shnilar.',
          'They’re friendly neighbours.',
          'Они дружелюбные соседи.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈfrendli/',
      ttsText: 'friendly',
    },
    media: {
      emoji: '😊',
      imageUrl: '',
      imageAlt: L(
        '친절한 사람',
        'mehribon odam',
        'a friendly person',
        'дружелюбный человек',
      ),
    },
    tags: ['adjectives', 'description'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-great',
    english: 'great',
    senseKey: 'very-good',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('훌륭한; 아주 좋은', 'ajoyib', 'very good', 'отличный'),
    examples: [
      {
        english: 'It’s a great book.',
        translations: L(
          '훌륭한 책이에요.',
          'Bu ajoyib kitob.',
          'It’s a great book.',
          'Это отличная книга.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɡreɪt/',
      ttsText: 'great',
    },
    media: {
      emoji: '👍',
      imageUrl: '',
      imageAlt: L(
        '아주 좋은 것',
        'ajoyib narsa',
        'something great',
        'что-то отличное',
      ),
    },
    tags: ['adjectives', 'description'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-hard',
    english: 'hard',
    senseKey: 'difficult',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '힘든; 어려운',
      'qiyin',
      'difficult and needing a lot of effort',
      'трудный',
    ),
    examples: [
      {
        english: 'He’s got a hard job.',
        translations: L(
          '그에게는 힘든 일이 있어요.',
          'Uning ishi qiyin.',
          'He’s got a hard job.',
          'У него трудная работа.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/hɑːd/',
      ttsText: 'hard',
    },
    media: {
      emoji: '💼',
      imageUrl: '',
      imageAlt: L('힘든 일', 'qiyin ish', 'a hard job', 'трудная работа'),
    },
    tags: ['adjectives', 'description'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-lovely',
    english: 'lovely',
    senseKey: 'very-nice',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '아주 좋은; 사랑스러운',
      'juda yoqimli',
      'very pleasant or attractive',
      'прекрасный; милый',
    ),
    examples: [
      {
        english: 'Prague is a lovely city.',
        translations: L(
          '프라하는 멋진 도시예요.',
          'Praga juda yoqimli shahar.',
          'Prague is a lovely city.',
          'Прага — прекрасный город.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈlʌvli/',
      ttsText: 'lovely',
    },
    media: {
      emoji: '❤️',
      imageUrl: '',
      imageAlt: L(
        '멋진 도시',
        'yoqimli shahar',
        'a lovely city',
        'прекрасный город',
      ),
    },
    tags: ['adjectives', 'description'],
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
        english: 'They’ve got a house in a quiet village.',
        translations: L(
          '그들은 조용한 마을에 집이 있어요.',
          'Ularning tinch qishloqda uyi bor.',
          'They’ve got a house in a quiet village.',
          'У них есть дом в тихой деревне.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkwaɪət/',
      ttsText: 'quiet',
    },
    media: {
      emoji: '🤫',
      imageUrl: '',
      imageAlt: L('조용한 장소', 'tinch joy', 'a quiet place', 'тихое место'),
    },
    tags: ['adjectives', 'description'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-person-man',
    english: 'man',
    senseKey: 'adult-male',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('남자; 남성', 'erkak', 'an adult male person', 'мужчина'),
    examples: [
      {
        english: 'He’s a funny man.',
        translations: L(
          '그는 재미있는 남자예요.',
          'U kulgili erkak.',
          'He’s a funny man.',
          'Он смешной мужчина.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/mæn/',
      ttsText: 'man',
    },
    media: {
      emoji: '👨',
      imageUrl: '',
      imageAlt: L('남자', 'erkak', 'a man', 'мужчина'),
    },
    tags: ['people', 'irregular-plural'],
    difficulty: 1,
    usageNote: L(
      '복수형은 men이에요.',
      'Ko‘plik shakli men.',
      'The plural is men.',
      'Множественное число — men.',
    ),
    isCore: true,
  },

  {
    code: 'en-person-woman',
    english: 'woman',
    senseKey: 'adult-female',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('여자; 여성', 'ayol', 'an adult female person', 'женщина'),
    examples: [
      {
        english: 'She’s a clever woman.',
        translations: L(
          '그녀는 똑똑한 여성이에요.',
          'U aqlli ayol.',
          'She’s a clever woman.',
          'Она умная женщина.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈwʊmən/',
      ttsText: 'woman',
    },
    media: {
      emoji: '👩',
      imageUrl: '',
      imageAlt: L('여자', 'ayol', 'a woman', 'женщина'),
    },
    tags: ['people', 'irregular-plural'],
    difficulty: 1,
    usageNote: L(
      '복수형은 women이에요.',
      'Ko‘plik shakli women.',
      'The plural is women.',
      'Множественное число — women.',
    ),
    isCore: true,
  },

  {
    code: 'en-person-person',
    english: 'person',
    senseKey: 'human-individual',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('사람 한 명', 'odam', 'one human being', 'человек'),
    examples: [
      {
        english: 'She’s a lovely person.',
        translations: L(
          '그녀는 정말 좋은 사람이에요.',
          'U juda yoqimli odam.',
          'She’s a lovely person.',
          'Она прекрасный человек.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈpɜːsn/',
      ttsText: 'person',
    },
    media: {
      emoji: '🧍',
      imageUrl: '',
      imageAlt: L('사람 한 명', 'bir odam', 'one person', 'один человек'),
    },
    tags: ['people', 'irregular-plural'],
    difficulty: 1,
    usageNote: L(
      '복수형은 people이에요.',
      'Ko‘plik shakli people.',
      'The plural is people.',
      'Множественное число — people.',
    ),
    isCore: true,
  },

  {
    code: 'en-person-child',
    english: 'child',
    senseKey: 'young-person',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('아이 한 명', 'bola', 'a young person', 'ребёнок'),
    examples: [
      {
        english: 'They’ve got two children.',
        translations: L(
          '그들은 아이가 두 명 있어요.',
          'Ularning ikki farzandi bor.',
          'They’ve got two children.',
          'У них двое детей.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/tʃaɪld/',
      ttsText: 'child',
    },
    media: {
      emoji: '🧒',
      imageUrl: '',
      imageAlt: L('아이', 'bola', 'a child', 'ребёнок'),
    },
    tags: ['people', 'irregular-plural'],
    difficulty: 1,
    usageNote: L(
      '복수형은 children이에요.',
      'Ko‘plik shakli children.',
      'The plural is children.',
      'Множественное число — children.',
    ),
    isCore: true,
  },
];

export const EN_S1_UNIT3_NODE1_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Adjective + noun / irregular plurals
  // ===========================================================

  en_s1u3_n1_001_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'A clever woman.',
    audioText: 'A clever woman.',
    answerTranslation: L(
      '똑똑한 여성.',
      'Aqlli ayol.',
      'A clever woman.',
      'Умная женщина.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['adjective-noun', 'clever'],
  },

  en_s1u3_n1_002_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: L(
      '영어 표현과 맞는 그림을 고르세요.',
      'Inglizcha iboraga mos rasmni tanlang.',
      'Choose the picture that matches the English phrase.',
      'Выберите картинку, соответствующую английской фразе.',
    ),
    answer: 'friendly dog',
    choices: [
      { text: 'friendly dog', label: '🐕', emoji: '🐕', imageUrl: '' },
      { text: 'great book', label: '📕', emoji: '📕', imageUrl: '' },
      { text: 'hard job', label: '💼', emoji: '💼', imageUrl: '' },
      { text: 'lovely city', label: '🏙️', emoji: '🏙️', imageUrl: '' },
    ],
    answerTranslation: L(
      '친근한 개',
      'do‘stona it',
      'friendly dog',
      'дружелюбная собака',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['adjective-noun', 'friendly'],
  },

  en_s1u3_n1_003_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'A funny film.',
    audioText: 'A funny film.',
    answerTranslation: L(
      '재미있는 영화.',
      'Kulgili film.',
      'A funny film.',
      'Смешной фильм.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['adjective-noun', 'funny'],
  },

  en_s1u3_n1_004_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'a ___ book',
    blankAnswers: ['great'],
    options: ['great', 'hard', 'friendly', 'clever'],
    answer: 'great',
    answerTranslation: L(
      '훌륭한 책',
      'ajoyib kitob',
      'a great book',
      'отличная книга',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['adjective-noun', 'great'],
  },

  en_s1u3_n1_005_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'A hard job.',
    audioText: 'A hard job.',
    answerTranslation: L(
      '힘든 일.',
      'Qiyin ish.',
      'A hard job.',
      'Трудная работа.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['adjective-noun', 'hard'],
  },

  en_s1u3_n1_006_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      { korean: 'clever', native: 'aqlli' },
      { korean: 'funny', native: 'kulgili' },
      { korean: 'friendly', native: 'do‘stona' },
      { korean: 'great', native: 'ajoyib' },
      { korean: 'lovely', native: 'juda yoqimli' },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['adjectives', 'matching'],
  },

  en_s1u3_n1_007_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'A lovely city.',
    audioText: 'A lovely city.',
    answerTranslation: L(
      '멋진 도시.',
      'Juda yoqimli shahar.',
      'A lovely city.',
      'Прекрасный город.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['adjective-noun', 'lovely'],
  },

  en_s1u3_n1_008_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '영어에서 형용사가 들어갈 위치를 고르세요.',
      'Ingliz tilida sifatning to‘g‘ri o‘rnini tanlang.',
      'Choose the correct position of the adjective.',
      'Выберите правильное место прилагательного.',
    ),
    sentenceTemplate: 'a ___ woman',
    blankAnswers: ['clever'],
    options: ['clever', 'woman clever', 'is clever', 'cleverly'],
    answer: 'clever',
    answerTranslation: L(
      '똑똑한 여성',
      'aqlli ayol',
      'a clever woman',
      'умная женщина',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['adjective-noun', 'word-order'],
  },

  en_s1u3_n1_009_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'An old woman.',
    audioText: 'An old woman.',
    answerTranslation: L(
      '나이 든 여성.',
      'Keksa ayol.',
      'An old woman.',
      'Пожилая женщина.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['article', 'adjective-noun'],
  },

  en_s1u3_n1_010_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ old woman',
    blankAnswers: ['an'],
    options: ['a', 'an', 'are', 'the'],
    answer: 'an',
    answerTranslation: L(
      '나이 든 여성 한 명',
      'bir keksa ayol',
      'an old woman',
      'пожилая женщина',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['article', 'an'],
  },

  en_s1u3_n1_011_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Man. Men.',
    audioText: 'Man. Men.',
    answerTranslation: L(
      '남자 한 명. 남자들.',
      'Bir erkak. Erkaklar.',
      'Man. Men.',
      'Мужчина. Мужчины.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['irregular-plural', 'man'],
  },

  en_s1u3_n1_012_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'one man → three ___',
    blankAnswers: ['men'],
    options: ['mans', 'mens', 'men', 'man'],
    answer: 'men',
    answerTranslation: L(
      '남자 한 명 → 남자 세 명',
      'bir erkak → uch erkak',
      'one man → three men',
      'один мужчина → три мужчины',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['irregular-plural', 'man-men'],
  },

  en_s1u3_n1_013_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Woman. Women.',
    audioText: 'Woman. Women.',
    answerTranslation: L(
      '여성 한 명. 여성들.',
      'Bir ayol. Ayollar.',
      'Woman. Women.',
      'Женщина. Женщины.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['irregular-plural', 'woman'],
  },

  en_s1u3_n1_014_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'one woman → two ___',
    blankAnswers: ['women'],
    options: ['womans', 'woman', 'women', 'womens'],
    answer: 'women',
    answerTranslation: L(
      '여성 한 명 → 여성 두 명',
      'bir ayol → ikki ayol',
      'one woman → two women',
      'одна женщина → две женщины',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['irregular-plural', 'woman-women'],
  },

  en_s1u3_n1_015_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Person. People.',
    audioText: 'Person. People.',
    answerTranslation: L(
      '사람 한 명. 사람들.',
      'Bir odam. Odamlar.',
      'Person. People.',
      'Человек. Люди.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['irregular-plural', 'person'],
  },

  en_s1u3_n1_016_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'one person → five ___',
    blankAnswers: ['people'],
    options: ['persons', 'peoples', 'people', 'person'],
    answer: 'people',
    answerTranslation: L(
      '사람 한 명 → 사람 다섯 명',
      'bir odam → besh odam',
      'one person → five people',
      'один человек → пять человек',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['irregular-plural', 'person-people'],
  },

  en_s1u3_n1_017_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Child. Children.',
    audioText: 'Child. Children.',
    answerTranslation: L(
      '아이 한 명. 아이들.',
      'Bir bola. Bolalar.',
      'Child. Children.',
      'Ребёнок. Дети.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['irregular-plural', 'child'],
  },

  en_s1u3_n1_018_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      { korean: 'man', native: 'erkak' },
      { korean: 'men', native: 'erkaklar' },
      { korean: 'woman', native: 'ayol' },
      { korean: 'women', native: 'ayollar' },
      { korean: 'children', native: 'bolalar' },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['irregular-plural', 'listening'],
  },

  en_s1u3_n1_019_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['They’re', 'clever', 'children', 'child', 'a', 'friendly'],
    answer: 'They’re clever children',
    answerTranslation: L(
      '그들은 똑똑한 아이들이에요.',
      'Ular aqlli bolalar.',
      'They’re clever children.',
      'Они умные дети.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['adjective-noun', 'children'],
  },

  en_s1u3_n1_020_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'They’re friendly people.',
    audioText: 'They’re friendly people.',
    answerI18n: L(
      '그들은 친절한 사람들이에요',
      'Ular do‘stona odamlar',
      'They are friendly people',
      'Они дружелюбные люди',
    ),
    options: ['They’re', 'friendly', 'people', 'person', 'a', 'hard'],
    optionsI18n: {
      ko: ['그들은', '친절한', '사람들이에요', '사람 한 명', '힘든'],
      uz: ['Ular', 'do‘stona', 'odamlar', 'odam', 'qiyin'],
      en: ['They', 'are', 'friendly', 'people', 'person', 'hard'],
      ru: ['Они', 'дружелюбные', 'люди', 'человек', 'трудные'],
    },
    answerTranslation: L(
      '그들은 친절한 사람들이에요.',
      'Ular do‘stona odamlar.',
      'They’re friendly people.',
      'Они дружелюбные люди.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['adjective-noun', 'people'],
  },

  // ===========================================================
  // Lesson 2 · Have got / has got
  // ===========================================================

  en_s1u3_n1_021_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I’ve got a flat.',
    audioText: 'I’ve got a flat.',
    answerTranslation: L(
      '저는 아파트가 있어요.',
      'Mening kvartiram bor.',
      'I’ve got a flat.',
      'У меня есть квартира.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['have-got', 'i'],
  },

  en_s1u3_n1_022_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I ___ got a flat.',
    blankAnswers: ['have'],
    options: ['have', 'has', 'is', 'are'],
    answer: 'have',
    answerTranslation: L(
      '저는 아파트가 있어요.',
      'Mening kvartiram bor.',
      'I have got a flat.',
      'У меня есть квартира.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['have-got', 'i'],
  },

  en_s1u3_n1_023_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'You’ve got a lovely flat.',
    audioText: 'You’ve got a lovely flat.',
    answerTranslation: L(
      '당신에게는 멋진 아파트가 있어요.',
      'Sizning chiroyli kvartirangiz bor.',
      'You’ve got a lovely flat.',
      'У вас прекрасная квартира.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['have-got', 'you'],
  },

  en_s1u3_n1_024_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'You___ got a lovely flat.',
    blankAnswers: ['’ve'],
    options: ['’ve', '’s', '’re', '’m'],
    answer: '’ve',
    answerTranslation: L(
      '당신에게는 멋진 아파트가 있어요.',
      'Sizning chiroyli kvartirangiz bor.',
      'You’ve got a lovely flat.',
      'У вас прекрасная квартира.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['have-got', 'contraction'],
  },

  en_s1u3_n1_025_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'We’ve got five neighbours.',
    audioText: 'We’ve got five neighbours.',
    answerTranslation: L(
      '우리는 이웃이 다섯 명 있어요.',
      'Bizning beshta qo‘shnimiz bor.',
      'We’ve got five neighbours.',
      'У нас пять соседей.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['have-got', 'we', 'neighbours'],
  },

  en_s1u3_n1_026_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['five', 'got', 'neighbours', 'We’ve', 'has', 'flat'],
    answer: 'We’ve got five neighbours',
    audioText: 'We’ve got five neighbours.',
    answerTranslation: L(
      '우리는 이웃이 다섯 명 있어요.',
      'Bizning beshta qo‘shnimiz bor.',
      'We’ve got five neighbours.',
      'У нас пять соседей.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['have-got', 'we'],
  },

  en_s1u3_n1_027_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'They’ve got two children.',
    audioText: 'They’ve got two children.',
    answerTranslation: L(
      '그들은 아이가 두 명 있어요.',
      'Ularning ikki farzandi bor.',
      'They’ve got two children.',
      'У них двое детей.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['have-got', 'they', 'children'],
  },

  en_s1u3_n1_028_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'They ___ got two children.',
    blankAnswers: ['have'],
    options: ['have', 'has', 'is', 'am'],
    answer: 'have',
    answerTranslation: L(
      '그들은 아이가 두 명 있어요.',
      'Ularning ikki farzandi bor.',
      'They have got two children.',
      'У них двое детей.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['have-got', 'they'],
  },

  en_s1u3_n1_029_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'He’s got a hard job.',
    audioText: 'He’s got a hard job.',
    answerTranslation: L(
      '그에게는 힘든 일이 있어요.',
      'Uning ishi qiyin.',
      'He’s got a hard job.',
      'У него трудная работа.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['has-got', 'he'],
  },

  en_s1u3_n1_030_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'He ___ got a hard job.',
    blankAnswers: ['has'],
    options: ['has', 'have', 'are', 'am'],
    answer: 'has',
    answerTranslation: L(
      '그에게는 힘든 일이 있어요.',
      'Uning ishi qiyin.',
      'He has got a hard job.',
      'У него трудная работа.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['has-got', 'he'],
  },

  en_s1u3_n1_031_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She’s got a bicycle shop.',
    audioText: 'She’s got a bicycle shop.',
    answerTranslation: L(
      '그녀에게는 자전거 가게가 있어요.',
      'Uning velosiped do‘koni bor.',
      'She’s got a bicycle shop.',
      'У неё есть велосипедный магазин.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['has-got', 'she'],
  },

  en_s1u3_n1_032_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Tell me about Adele.',
    options: ['She’s', 'got', 'a', 'bicycle', 'shop', 'They’ve', 'teacher'],
    answer: 'She’s got a bicycle shop',
    answerTranslation: L(
      '그녀에게는 자전거 가게가 있어요.',
      'Uning velosiped do‘koni bor.',
      'She’s got a bicycle shop.',
      'У неё есть велосипедный магазин.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['has-got', 'she', 'reply-builder'],
  },

  en_s1u3_n1_033_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'It’s got four rooms.',
    audioText: 'It’s got four rooms.',
    answerTranslation: L(
      '방이 네 개 있어요.',
      'Unda to‘rtta xona bor.',
      'It’s got four rooms.',
      'В нём четыре комнаты.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['has-got', 'it', 'rooms'],
  },

  en_s1u3_n1_034_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The house ___ got four rooms.',
    blankAnswers: ['has'],
    options: ['has', 'have', 'are', 'is'],
    answer: 'has',
    answerTranslation: L(
      '그 집에는 방이 네 개 있어요.',
      'Uyda to‘rtta xona bor.',
      'The house has got four rooms.',
      'В доме четыре комнаты.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['has-got', 'it'],
  },

  en_s1u3_n1_035_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'We’ve got two cats and a dog.',
    audioText: 'We’ve got two cats and a dog.',
    answerTranslation: L(
      '우리는 고양이 두 마리와 개 한 마리가 있어요.',
      'Bizning ikkita mushugimiz va bitta itimiz bor.',
      'We’ve got two cats and a dog.',
      'У нас две кошки и собака.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['have-got', 'pets'],
  },

  en_s1u3_n1_036_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['We’ve', 'got', 'two', 'cats', 'and', 'a', 'dog', 'has'],
    answer: 'We’ve got two cats and a dog',
    answerTranslation: L(
      '우리는 고양이 두 마리와 개 한 마리가 있어요.',
      'Bizning ikkita mushugimiz va bitta itimiz bor.',
      'We’ve got two cats and a dog.',
      'У нас две кошки и собака.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['have-got', 'pets'],
  },

  en_s1u3_n1_037_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'They’ve got a lovely garden.',
    audioText: 'They’ve got a lovely garden.',
    answerTranslation: L(
      '그들에게는 멋진 정원이 있어요.',
      'Ularning chiroyli bog‘i bor.',
      'They’ve got a lovely garden.',
      'У них прекрасный сад.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['have-got', 'garden'],
  },

  en_s1u3_n1_038_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '주어에 맞는 표현을 고르세요.',
      'Ega bilan mos shaklni tanlang.',
      'Choose the correct form for the subject.',
      'Выберите правильную форму для подлежащего.',
    ),
    sentenceTemplate: 'My neighbour ___ got a friendly dog.',
    blankAnswers: ['has'],
    options: ['has', 'have', 'are', 'am'],
    answer: 'has',
    answerTranslation: L(
      '제 이웃에게는 친근한 개가 있어요.',
      'Qo‘shnimning do‘stona iti bor.',
      'My neighbour has got a friendly dog.',
      'У моего соседа дружелюбная собака.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['has-got', 'neighbour'],
  },

  en_s1u3_n1_039_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'She’s got two goldfish.',
    audioText: 'She’s got two goldfish.',
    answerI18n: L(
      '그녀에게는 금붕어가 두 마리 있어요',
      'Uning ikkita oltin balig‘i bor',
      'She has got two goldfish',
      'У неё две золотые рыбки',
    ),
    options: ['She’s', 'got', 'two', 'goldfish', 'They’ve', 'children'],
    optionsI18n: {
      ko: ['그녀에게는', '금붕어가', '두', '마리', '아이들이'],
      uz: ['Uning', 'ikkita', 'oltin', 'balig‘i', 'bor', 'bolalari'],
      en: ['She', 'has', 'got', 'two', 'goldfish', 'children'],
      ru: ['У', 'неё', 'две', 'золотые', 'рыбки', 'дети'],
    },
    answerTranslation: L(
      '그녀에게는 금붕어가 두 마리 있어요.',
      'Uning ikkita oltin balig‘i bor.',
      'She’s got two goldfish.',
      'У неё две золотые рыбки.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['has-got', 'pets'],
  },

  en_s1u3_n1_040_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'I’ve got. You’ve got. He’s got. She’s got. We’ve got. They’ve got.',
    audioText:
      'I’ve got. You’ve got. He’s got. She’s got. We’ve got. They’ve got.',
    answerTranslation: L(
      'have got과 has got의 주요 축약형.',
      'have got va has got qisqartma shakllari.',
      'Common contractions of have got and has got.',
      'Основные сокращённые формы have got и has got.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['have-got', 'contractions', 'review'],
  },

  // ===========================================================
  // Lesson 3 · My neighbours
  // ===========================================================

  en_s1u3_n1_041_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'My neighbours are very friendly.',
    audioText: 'My neighbours are very friendly.',
    answerTranslation: L(
      '제 이웃들은 아주 친절해요.',
      'Mening qo‘shnilarim juda do‘stona.',
      'My neighbours are very friendly.',
      'Мои соседи очень дружелюбные.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['neighbours', 'friendly'],
  },

  en_s1u3_n1_042_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      { korean: 'neighbour', native: 'qo‘shni' },
      { korean: 'flat', native: 'kvartira' },
      { korean: 'building', native: 'bino' },
      { korean: 'village', native: 'qishloq' },
      { korean: 'garden', native: 'bog‘' },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['home', 'neighbours'],
  },

  en_s1u3_n1_043_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'We’ve got a flat near the city centre.',
    audioText: 'We’ve got a flat near the city centre.',
    answerTranslation: L(
      '우리는 도심 근처에 아파트가 있어요.',
      'Bizning shahar markazi yaqinida kvartiramiz bor.',
      'We’ve got a flat near the city centre.',
      'У нас квартира рядом с центром города.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['flat', 'have-got'],
  },

  en_s1u3_n1_044_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'They live in a big ___.',
    blankAnswers: ['building'],
    options: ['building', 'painting', 'manager', 'goldfish'],
    answer: 'building',
    answerTranslation: L(
      '그들은 큰 건물에 살아요.',
      'Ular katta binoda yashaydi.',
      'They live in a big building.',
      'Они живут в большом здании.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['building'],
  },

  en_s1u3_n1_045_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'He’s a musician.',
    audioText: 'He’s a musician.',
    answerTranslation: L(
      '그는 음악가예요.',
      'U musiqachi.',
      'He’s a musician.',
      'Он музыкант.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['musician', 'jobs'],
  },

  en_s1u3_n1_046_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Amit’s got a job in a ___.',
    blankAnswers: ['hospital'],
    options: ['hospital', 'painting', 'goldfish', 'woman'],
    answer: 'hospital',
    answerTranslation: L(
      'Amit은 병원에 직장이 있어요.',
      'Amit kasalxonada ishlaydi.',
      'Amit’s got a job in a hospital.',
      'Амит работает в больнице.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['neighbours', 'job'],
  },

  en_s1u3_n1_047_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She’s a clever woman. She’s funny, too.',
    audioText: 'She’s a clever woman. She’s funny, too.',
    answerTranslation: L(
      '그녀는 똑똑한 여성이에요. 재미있기도 해요.',
      'U aqlli ayol. U kulgili ham.',
      'She’s a clever woman. She’s funny, too.',
      'Она умная женщина. И ещё она смешная.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['description', 'clever', 'funny'],
  },

  en_s1u3_n1_048_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What’s Syreeta like?',
    options: ['She’s', 'clever', 'and', 'funny', 'He’s', 'manager', 'hard'],
    answer: 'She’s clever and funny',
    answerTranslation: L(
      '그녀는 똑똑하고 재미있어요.',
      'U aqlli va kulgili.',
      'She’s clever and funny.',
      'Она умная и смешная.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['description', 'reply-builder'],
  },

  en_s1u3_n1_049_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'They’ve got two great children.',
    audioText: 'They’ve got two great children.',
    answerTranslation: L(
      '그들에게는 멋진 아이가 두 명 있어요.',
      'Ularning ikkita ajoyib farzandi bor.',
      'They’ve got two great children.',
      'У них двое замечательных детей.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['children', 'have-got'],
  },

  en_s1u3_n1_050_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Have they got children?' }],
    options: [
      'They’ve got two children.',
      'He’s a child.',
      'It’s a lovely city.',
      'She’s a manager.',
    ],
    answer: 'They’ve got two children.',
    answerTranslation: L(
      '아이 둘이 있어요.',
      'Ularning ikki farzandi bor.',
      'They’ve got two children.',
      'У них двое детей.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['children', 'dialog'],
  },

  en_s1u3_n1_051_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'They’re artists.',
    audioText: 'They’re artists.',
    answerTranslation: L(
      '그들은 예술가예요.',
      'Ular rassomlar.',
      'They’re artists.',
      'Они художники.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['artists', 'jobs'],
  },

  en_s1u3_n1_052_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'They’ve got lovely ___ in their house.',
    blankAnswers: ['paintings'],
    options: ['paintings', 'managers', 'villages', 'children'],
    answer: 'paintings',
    answerTranslation: L(
      '그들의 집에는 멋진 그림들이 있어요.',
      'Ularning uyida chiroyli rasmlar bor.',
      'They’ve got lovely paintings in their house.',
      'У них дома прекрасные картины.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['paintings', 'artists'],
  },

  en_s1u3_n1_053_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'He’s got a nice pet.',
    audioText: 'He’s got a nice pet.',
    answerTranslation: L(
      '그에게는 귀여운 반려동물이 있어요.',
      'Uning yaxshi uy hayvoni bor.',
      'He’s got a nice pet.',
      'У него хороший домашний питомец.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['pets', 'has-got'],
  },

  en_s1u3_n1_054_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      { korean: 'musician', native: 'musiqachi' },
      { korean: 'artist', native: 'rassom' },
      { korean: 'painting', native: 'rasm' },
      { korean: 'manager', native: 'menejer' },
      { korean: 'goldfish', native: 'oltin baliq' },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['people', 'possessions', 'listening'],
  },

  en_s1u3_n1_055_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She’s the manager.',
    audioText: 'She’s the manager.',
    answerTranslation: L(
      '그녀가 관리자예요.',
      'U menejer.',
      'She’s the manager.',
      'Она менеджер.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['manager', 'jobs'],
  },

  en_s1u3_n1_056_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She’s got a quiet ___ there.',
    blankAnswers: ['room'],
    options: ['room', 'child', 'woman', 'painting'],
    answer: 'room',
    answerTranslation: L(
      '그녀에게는 그곳에 조용한 방이 있어요.',
      'Uning u yerda tinch xonasi bor.',
      'She’s got a quiet room there.',
      'У неё там тихая комната.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['room', 'quiet'],
  },

  en_s1u3_n1_057_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She’s got two goldfish.',
    audioText: 'She’s got two goldfish.',
    answerTranslation: L(
      '그녀에게는 금붕어 두 마리가 있어요.',
      'Uning ikkita oltin balig‘i bor.',
      'She’s got two goldfish.',
      'У неё две золотые рыбки.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['goldfish', 'pets'],
  },

  en_s1u3_n1_058_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['They’ve', 'got', 'a', 'lovely', 'garden', 'hard', 'job'],
    answer: 'They’ve got a lovely garden',
    answerTranslation: L(
      '그들에게는 멋진 정원이 있어요.',
      'Ularning chiroyli bog‘i bor.',
      'They’ve got a lovely garden.',
      'У них прекрасный сад.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['garden', 'have-got'],
  },

  en_s1u3_n1_059_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'They’ve got a house in a quiet village.',
    audioText: 'They’ve got a house in a quiet village.',
    answerTranslation: L(
      '그들은 조용한 마을에 집이 있어요.',
      'Ularning tinch qishloqda uyi bor.',
      'They’ve got a house in a quiet village.',
      'У них дом в тихой деревне.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['village', 'house'],
  },

  en_s1u3_n1_060_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'My neighbour has got a friendly dog.',
    audioText: 'My neighbour has got a friendly dog.',
    answerI18n: L(
      '제 이웃에게는 친근한 개가 있어요',
      'Qo‘shnimning do‘stona iti bor',
      'My neighbour has got a friendly dog',
      'У моего соседа дружелюбная собака',
    ),
    options: ['My', 'neighbour', 'has', 'got', 'a', 'friendly', 'dog', 'have'],
    optionsI18n: {
      ko: ['제', '이웃에게는', '친근한', '개가', '있어요', '고양이'],
      uz: ['Qo‘shnimning', 'do‘stona', 'iti', 'bor', 'mushugi'],
      en: ['My', 'neighbour', 'has', 'got', 'a', 'friendly', 'dog', 'have'],
      ru: ['У', 'моего', 'соседа', 'дружелюбная', 'собака', 'кошка'],
    },
    answerTranslation: L(
      '제 이웃에게는 친근한 개가 있어요.',
      'Qo‘shnimning do‘stona iti bor.',
      'My neighbour has got a friendly dog.',
      'У моего соседа дружелюбная собака.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['neighbour', 'has-got', 'friendly'],
  },

  // ===========================================================
  // Lesson 4 · Reading skills: key words
  // ===========================================================

  en_s1u3_n1_061_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Nouns are key words.',
    audioText: 'Nouns are key words.',
    answerTranslation: L(
      '명사는 핵심어예요.',
      'Otlar kalit so‘zlardir.',
      'Nouns are key words.',
      'Существительные — ключевые слова.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['reading-skills', 'nouns'],
  },

  en_s1u3_n1_062_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '문장에서 명사를 고르세요.',
      'Gapdagi otni tanlang.',
      'Choose the noun in the sentence.',
      'Выберите существительное в предложении.',
    ),
    sentenceTemplate: 'She’s a clever woman.',
    blankAnswers: ['woman'],
    options: ['woman', 'clever', 'she', 'is'],
    answer: 'woman',
    answerTranslation: L(
      'woman은 명사예요.',
      'woman — ot.',
      'woman is a noun.',
      'woman — существительное.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['reading-skills', 'noun'],
  },

  en_s1u3_n1_063_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Adjectives give information about nouns.',
    audioText: 'Adjectives give information about nouns.',
    answerTranslation: L(
      '형용사는 명사에 대한 정보를 줘요.',
      'Sifatlar otlar haqida ma’lumot beradi.',
      'Adjectives give information about nouns.',
      'Прилагательные дают информацию о существительных.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['reading-skills', 'adjectives'],
  },

  en_s1u3_n1_064_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      'woman을 설명하는 형용사를 고르세요.',
      'woman so‘zini tasvirlayotgan sifatni tanlang.',
      'Choose the adjective describing woman.',
      'Выберите прилагательное, описывающее woman.',
    ),
    sentenceTemplate: 'She’s a clever woman.',
    blankAnswers: ['clever'],
    options: ['clever', 'woman', 'she', 'a'],
    answer: 'clever',
    answerTranslation: L(
      'clever가 woman을 설명해요.',
      'clever woman so‘zini tasvirlaydi.',
      'clever describes woman.',
      'clever описывает woman.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['reading-skills', 'adjective'],
  },

  en_s1u3_n1_065_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'We’ve got a lovely flat in Poznan.',
    audioText: 'We’ve got a lovely flat in Poznan.',
    answerTranslation: L(
      '우리는 포즈난에 멋진 아파트가 있어요.',
      'Bizning Poznanda chiroyli kvartiramiz bor.',
      'We’ve got a lovely flat in Poznan.',
      'У нас прекрасная квартира в Познани.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['reading-skills', 'flat'],
  },

  en_s1u3_n1_066_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '문장의 핵심 명사를 고르세요.',
      'Gapdagi asosiy otni tanlang.',
      'Choose the key noun.',
      'Выберите ключевое существительное.',
    ),
    sentenceTemplate: 'We’ve got a lovely flat in Poznan.',
    blankAnswers: ['flat'],
    options: ['flat', 'lovely', 'we', 'got'],
    answer: 'flat',
    answerTranslation: L(
      'flat이 핵심 명사예요.',
      'flat — asosiy ot.',
      'flat is the key noun.',
      'flat — ключевое существительное.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['reading-skills', 'noun'],
  },

  en_s1u3_n1_067_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      'flat을 설명하는 형용사를 고르세요.',
      'flat so‘zini tasvirlayotgan sifatni tanlang.',
      'Choose the adjective describing flat.',
      'Выберите прилагательное, описывающее flat.',
    ),
    sentenceTemplate: 'We’ve got a lovely flat.',
    blankAnswers: ['lovely'],
    options: ['lovely', 'flat', 'got', 'we'],
    answer: 'lovely',
    answerTranslation: L(
      'lovely가 flat을 설명해요.',
      'lovely flat so‘zini tasvirlaydi.',
      'lovely describes flat.',
      'lovely описывает flat.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['reading-skills', 'adjective'],
  },

  en_s1u3_n1_068_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'It’s a great city.',
    audioText: 'It’s a great city.',
    answerTranslation: L(
      '훌륭한 도시예요.',
      'Bu ajoyib shahar.',
      'It’s a great city.',
      'Это отличный город.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['reading-skills', 'great-city'],
  },

  en_s1u3_n1_069_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '핵심어 조합을 고르세요.',
      'Asosiy so‘zlar birikmasini tanlang.',
      'Choose the key-word phrase.',
      'Выберите сочетание ключевых слов.',
    ),
    sentenceTemplate: 'It’s a great city.',
    blankAnswers: ['great city'],
    options: ['great city', 'it is', 'a great', 'is a'],
    answer: 'great city',
    answerTranslation: L(
      'great city가 중요한 정보를 전달해요.',
      'great city muhim ma’lumotni beradi.',
      'great city carries the important information.',
      'great city передаёт важную информацию.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['reading-skills', 'key-words'],
  },

  en_s1u3_n1_070_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She’s got a hard job.',
    audioText: 'She’s got a hard job.',
    answerTranslation: L(
      '그녀에게는 힘든 일이 있어요.',
      'Uning ishi qiyin.',
      'She’s got a hard job.',
      'У неё трудная работа.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['reading-skills', 'hard-job'],
  },

  en_s1u3_n1_071_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      'job을 설명하는 단어를 고르세요.',
      'job so‘zini tasvirlayotgan so‘zni tanlang.',
      'Choose the word describing job.',
      'Выберите слово, описывающее job.',
    ),
    sentenceTemplate: 'She’s got a ___ job.',
    blankAnswers: ['hard'],
    options: ['hard', 'job', 'she', 'got'],
    answer: 'hard',
    answerTranslation: L(
      'hard job = 힘든 일',
      'hard job = qiyin ish',
      'hard job = a difficult job',
      'hard job = трудная работа',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['reading-skills', 'adjective'],
  },

  en_s1u3_n1_072_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Poland. Poznan. Agnieska.',
    audioText: 'Poland. Poznan. Agnieska.',
    answerTranslation: L(
      'Poland, Poznan, Agnieska.',
      'Poland, Poznan, Agnieska.',
      'Poland, Poznan, Agnieska.',
      'Poland, Poznan, Agnieska.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['reading-skills', 'capital-letters'],
  },

  en_s1u3_n1_073_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '대문자로 시작해야 하는 고유명사를 고르세요.',
      'Bosh harf bilan yoziladigan atoqli otni tanlang.',
      'Choose the proper noun that needs a capital letter.',
      'Выберите имя собственное, которое пишется с заглавной буквы.',
    ),
    sentenceTemplate: '___ is in Poland.',
    blankAnswers: ['Poznan'],
    options: ['Poznan', 'city', 'flat', 'job'],
    answer: 'Poznan',
    answerTranslation: L(
      'Poznan은 도시 이름이라 대문자로 시작해요.',
      'Poznan shahar nomi, shuning uchun bosh harf bilan yoziladi.',
      'Poznan is a city name, so it begins with a capital letter.',
      'Poznan — название города, поэтому пишется с заглавной буквы.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['reading-skills', 'capital-letters'],
  },

  en_s1u3_n1_074_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What are the key words in “a lovely flat”?',
    options: ['lovely', 'flat', 'a', 'is', 'got'],
    answer: 'lovely flat',
    answerTranslation: L(
      'lovely와 flat이에요.',
      'lovely va flat.',
      'lovely and flat.',
      'lovely и flat.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['reading-skills', 'key-words'],
  },

  en_s1u3_n1_075_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'A quiet room.',
    audioText: 'A quiet room.',
    answerTranslation: L(
      '조용한 방.',
      'Tinch xona.',
      'A quiet room.',
      'Тихая комната.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['reading-skills', 'quiet-room'],
  },

  en_s1u3_n1_076_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '형용사 + 명사 순서를 완성하세요.',
      'Sifat + ot tartibini to‘ldiring.',
      'Complete the adjective + noun phrase.',
      'Завершите сочетание прилагательное + существительное.',
    ),
    sentenceTemplate: 'a ___ room',
    blankAnswers: ['quiet'],
    options: ['quiet', 'room quiet', 'quietly', 'is quiet'],
    answer: 'quiet',
    answerTranslation: L(
      '조용한 방',
      'tinch xona',
      'a quiet room',
      'тихая комната',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['adjective-noun', 'quiet'],
  },

  en_s1u3_n1_077_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'They’ve got four children and two pets.',
    audioText: 'They’ve got four children and two pets.',
    answerTranslation: L(
      '그들은 아이 넷과 반려동물 둘이 있어요.',
      'Ularning to‘rtta farzandi va ikkita uy hayvoni bor.',
      'They’ve got four children and two pets.',
      'У них четверо детей и два домашних животных.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['have-got', 'children', 'pets'],
  },

  en_s1u3_n1_078_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'They’ve',
      'got',
      'four',
      'children',
      'and',
      'two',
      'pets',
      'child',
    ],
    answer: 'They’ve got four children and two pets',
    answerTranslation: L(
      '그들은 아이 넷과 반려동물 둘이 있어요.',
      'Ularning to‘rtta farzandi va ikkita uy hayvoni bor.',
      'They’ve got four children and two pets.',
      'У них четверо детей и два домашних животных.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['have-got', 'irregular-plural'],
  },

  en_s1u3_n1_079_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'My neighbour is a lovely person. She’s got a friendly dog.',
    audioText: 'My neighbour is a lovely person. She’s got a friendly dog.',
    answerTranslation: L(
      '제 이웃은 정말 좋은 사람이에요. 친근한 개가 한 마리 있어요.',
      'Mening qo‘shnim juda yoqimli odam. Uning do‘stona iti bor.',
      'My neighbour is a lovely person. She’s got a friendly dog.',
      'Моя соседка — прекрасный человек. У неё дружелюбная собака.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['neighbour', 'description', 'has-got'],
  },

  en_s1u3_n1_080_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Tell me about your neighbours.' },
      { speaker: 'user', text: 'They’re lovely people.' },
      { speaker: 'npc', text: 'Have they got children?' },
    ],
    options: [
      'They’ve got two children.',
      'He’s a clever woman.',
      'It’s a friendly people.',
      'They has got a child.',
    ],
    answer: 'They’ve got two children.',
    answerTranslation: L(
      '아이 둘이 있어요.',
      'Ularning ikki farzandi bor.',
      'They’ve got two children.',
      'У них двое детей.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['neighbours', 'have-got', 'final'],
  },
};

// ─────────────────────────────────────────────────────────────
// Node 1
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT3_NODE1 = {
  title: L('우리 이웃', 'Mening qo‘shnilarim', 'My neighbours', 'Мои соседи'),
  section: 1,
  unit: 3,
  order: 1,
  isActive: true,

  lessons: [
    {
      title: L(
        '어떤 사람이에요?',
        'U qanday odam?',
        'Describing people and things',
        'Описываем людей и предметы',
      ),
      description: L(
        '형용사를 명사 앞에 놓아 사람과 사물을 묘사하고 man, woman, person, child의 불규칙 복수형을 익혀요.',
        'Sifatni otdan oldin qo‘yib odam va buyumlarni tasvirlaysiz hamda man, woman, person va child so‘zlarining noodatiy ko‘plik shakllarini o‘rganasiz.',
        'Use adjectives before nouns and learn the irregular plurals of man, woman, person and child.',
        'Учимся ставить прилагательные перед существительными и использовать неправильные формы множественного числа man, woman, person и child.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 1,
      questions: [
        'en_s1u3_n1_001_speaking',
        'en_s1u3_n1_002_image_choice',
        'en_s1u3_n1_003_speaking',
        'en_s1u3_n1_004_fill_in_blank',
        'en_s1u3_n1_005_speaking',
        'en_s1u3_n1_006_word_matching',
        'en_s1u3_n1_007_speaking',
        'en_s1u3_n1_008_fill_in_blank',
        'en_s1u3_n1_009_speaking',
        'en_s1u3_n1_010_fill_in_blank',
        'en_s1u3_n1_011_speaking',
        'en_s1u3_n1_012_fill_in_blank',
        'en_s1u3_n1_013_speaking',
        'en_s1u3_n1_014_fill_in_blank',
        'en_s1u3_n1_015_speaking',
        'en_s1u3_n1_016_fill_in_blank',
        'en_s1u3_n1_017_speaking',
        'en_s1u3_n1_018_audio_match',
        'en_s1u3_n1_019_translate_builder',
        'en_s1u3_n1_020_sentence_builder',
      ],
    },

    {
      title: L(
        '무엇을 가지고 있어요?',
        'Nimangiz bor?',
        'Have got and has got',
        'Have got и has got',
      ),
      description: L(
        'I, you, we, they에는 have got을, he, she, it에는 has got을 사용하고 축약형도 함께 익혀요.',
        'I, you, we, they bilan have got, he, she, it bilan has got ishlatasiz va qisqartma shakllarini o‘rganasiz.',
        'Use have got with I, you, we and they, and has got with he, she and it, including contractions.',
        'Используем have got с I, you, we, they и has got с he, she, it, включая сокращения.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 2,
      questions: [
        'en_s1u3_n1_021_speaking',
        'en_s1u3_n1_022_fill_in_blank',
        'en_s1u3_n1_023_speaking',
        'en_s1u3_n1_024_fill_in_blank',
        'en_s1u3_n1_025_speaking',
        'en_s1u3_n1_026_word_arrange',
        'en_s1u3_n1_027_speaking',
        'en_s1u3_n1_028_fill_in_blank',
        'en_s1u3_n1_029_speaking',
        'en_s1u3_n1_030_fill_in_blank',
        'en_s1u3_n1_031_speaking',
        'en_s1u3_n1_032_reply_builder',
        'en_s1u3_n1_033_speaking',
        'en_s1u3_n1_034_fill_in_blank',
        'en_s1u3_n1_035_speaking',
        'en_s1u3_n1_036_translate_builder',
        'en_s1u3_n1_037_speaking',
        'en_s1u3_n1_038_fill_in_blank',
        'en_s1u3_n1_039_sentence_builder',
        'en_s1u3_n1_040_speaking',
      ],
    },

    {
      title: L(
        '내 이웃 소개하기',
        'Qo‘shnilarimni tanishtirish',
        'Talking about neighbours',
        'Рассказываем о соседях',
      ),
      description: L(
        '이웃의 집, 직업, 성격, 아이와 반려동물에 대해 have got과 형용사를 사용해 말해요.',
        'Qo‘shnilarning uyi, kasbi, xarakteri, bolalari va uy hayvonlari haqida have got va sifatlar bilan gapirasiz.',
        'Talk about neighbours, homes, jobs, children and pets using have got and descriptive adjectives.',
        'Рассказываем о соседях, доме, работе, детях и питомцах с помощью have got и прилагательных.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 3,
      questions: [
        'en_s1u3_n1_041_speaking',
        'en_s1u3_n1_042_word_matching',
        'en_s1u3_n1_043_speaking',
        'en_s1u3_n1_044_fill_in_blank',
        'en_s1u3_n1_045_speaking',
        'en_s1u3_n1_046_fill_in_blank',
        'en_s1u3_n1_047_speaking',
        'en_s1u3_n1_048_reply_builder',
        'en_s1u3_n1_049_speaking',
        'en_s1u3_n1_050_dialog_complete',
        'en_s1u3_n1_051_speaking',
        'en_s1u3_n1_052_fill_in_blank',
        'en_s1u3_n1_053_speaking',
        'en_s1u3_n1_054_audio_match',
        'en_s1u3_n1_055_speaking',
        'en_s1u3_n1_056_fill_in_blank',
        'en_s1u3_n1_057_speaking',
        'en_s1u3_n1_058_translate_builder',
        'en_s1u3_n1_059_speaking',
        'en_s1u3_n1_060_sentence_builder',
      ],
    },

    {
      title: L(
        '글의 핵심어 찾기',
        'Matndagi kalit so‘zlar',
        'Finding key words',
        'Находим ключевые слова',
      ),
      description: L(
        '짧은 글에서 명사와 형용사를 찾아 사람, 장소와 사물에 대한 핵심 정보를 빠르게 이해해요.',
        'Qisqa matnda ot va sifatlarni topib, odam, joy va buyumlar haqidagi asosiy ma’lumotni tez tushunasiz.',
        'Identify nouns and adjectives as key words to understand the important information in a short text.',
        'Находим существительные и прилагательные как ключевые слова и быстро понимаем основную информацию текста.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 4,
      questions: [
        'en_s1u3_n1_061_speaking',
        'en_s1u3_n1_062_fill_in_blank',
        'en_s1u3_n1_063_speaking',
        'en_s1u3_n1_064_fill_in_blank',
        'en_s1u3_n1_065_speaking',
        'en_s1u3_n1_066_fill_in_blank',
        'en_s1u3_n1_067_fill_in_blank',
        'en_s1u3_n1_068_speaking',
        'en_s1u3_n1_069_fill_in_blank',
        'en_s1u3_n1_070_speaking',
        'en_s1u3_n1_071_fill_in_blank',
        'en_s1u3_n1_072_speaking',
        'en_s1u3_n1_073_fill_in_blank',
        'en_s1u3_n1_074_reply_builder',
        'en_s1u3_n1_075_speaking',
        'en_s1u3_n1_076_fill_in_blank',
        'en_s1u3_n1_077_speaking',
        'en_s1u3_n1_078_translate_builder',
        'en_s1u3_n1_079_speaking',
        'en_s1u3_n1_080_dialog_complete',
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Section 1 · Unit 3 · Node 2
// 3.2 Possessions
//
// Coverage
// - bicycle / car / bank account / television / mobile phone
// - best friend
// - have got negative:
//   haven't got / hasn't got
// - questions:
//   Have I/you/we/they got ...?
//   Has he/she/it got ...?
// - short answers:
//   Yes, I/you/we/they have.
//   No, I/you/we/they haven't.
//   Yes, he/she/it has.
//   No, he/she/it hasn't.
// - stress in yes/no questions and answers
// - opposite adjectives:
//   old ↔ new
//   happy ↔ sad
//   good ↔ bad
//   big ↔ small
//   old ↔ young
//   rich ↔ poor
//   expensive ↔ cheap
//   cold ↔ hot
// - adjective + noun with a/an
// - talking about possessions
//
// 4 lessons × 20 questions = 80
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT3_NODE2_WORDS = [
  {
    code: 'en-transport-bicycle',
    english: 'bicycle',
    senseKey: 'two-wheel-vehicle',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '자전거',
      'velosiped',
      'a vehicle with two wheels that you move using pedals',
      'велосипед',
    ),
    examples: [
      {
        english: 'Have you got a bicycle?',
        translations: L(
          '자전거가 있어요?',
          'Velosipedingiz bormi?',
          'Have you got a bicycle?',
          'У вас есть велосипед?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈbaɪsɪkl/',
      ttsText: 'bicycle',
    },
    media: {
      emoji: '🚲',
      imageUrl: '',
      imageAlt: L('자전거', 'velosiped', 'a bicycle', 'велосипед'),
    },
    tags: ['possessions', 'transport'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-transport-car',
    english: 'car',
    senseKey: 'road-vehicle',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '자동차',
      'mashina',
      'a road vehicle with four wheels',
      'машина',
    ),
    examples: [
      {
        english: 'Have they got a car?',
        translations: L(
          '그들은 자동차가 있어요?',
          'Ularning mashinasi bormi?',
          'Have they got a car?',
          'У них есть машина?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/kɑː/',
      ttsText: 'car',
    },
    media: {
      emoji: '🚗',
      imageUrl: '',
      imageAlt: L('자동차', 'mashina', 'a car', 'машина'),
    },
    tags: ['possessions', 'transport'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-finance-bank-account',
    english: 'bank account',
    senseKey: 'money-account-at-bank',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '은행 계좌',
      'bank hisobi',
      'an account for keeping money at a bank',
      'банковский счёт',
    ),
    examples: [
      {
        english: 'I haven’t got a bank account.',
        translations: L(
          '저는 은행 계좌가 없어요.',
          'Mening bank hisobim yo‘q.',
          'I haven’t got a bank account.',
          'У меня нет банковского счёта.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈbæŋk əˌkaʊnt/',
      ttsText: 'bank account',
    },
    media: {
      emoji: '🏦',
      imageUrl: '',
      imageAlt: L(
        '은행 계좌',
        'bank hisobi',
        'a bank account',
        'банковский счёт',
      ),
    },
    tags: ['possessions', 'money'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-object-television',
    english: 'television',
    senseKey: 'television-device',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '텔레비전',
      'televizor',
      'a device used for watching television programmes',
      'телевизор',
    ),
    examples: [
      {
        english: 'We haven’t got a television.',
        translations: L(
          '우리는 텔레비전이 없어요.',
          'Bizning televizorimiz yo‘q.',
          'We haven’t got a television.',
          'У нас нет телевизора.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈtelɪvɪʒn/',
      ttsText: 'television',
    },
    media: {
      emoji: '📺',
      imageUrl: '',
      imageAlt: L('텔레비전', 'televizor', 'a television', 'телевизор'),
    },
    tags: ['possessions', 'technology'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-object-mobile-phone',
    english: 'mobile phone',
    senseKey: 'portable-phone',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '휴대전화',
      'mobil telefon',
      'a portable telephone',
      'мобильный телефон',
    ),
    examples: [
      {
        english: 'Has she got a mobile phone?',
        translations: L(
          '그녀는 휴대전화가 있어요?',
          'Uning mobil telefoni bormi?',
          'Has she got a mobile phone?',
          'У неё есть мобильный телефон?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌməʊbaɪl ˈfəʊn/',
      ttsText: 'mobile phone',
    },
    media: {
      emoji: '📱',
      imageUrl: '',
      imageAlt: L(
        '휴대전화',
        'mobil telefon',
        'a mobile phone',
        'мобильный телефон',
      ),
    },
    tags: ['possessions', 'technology'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-person-best-friend',
    english: 'best friend',
    senseKey: 'closest-friend',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '가장 친한 친구',
      'eng yaqin do‘st',
      'the friend you are closest to',
      'лучший друг',
    ),
    examples: [
      {
        english: 'Has your best friend got a pet?',
        translations: L(
          '가장 친한 친구는 반려동물이 있어요?',
          'Eng yaqin do‘stingizning uy hayvoni bormi?',
          'Has your best friend got a pet?',
          'У вашего лучшего друга есть питомец?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌbest ˈfrend/',
      ttsText: 'best friend',
    },
    media: {
      emoji: '🧑‍🤝‍🧑',
      imageUrl: '',
      imageAlt: L(
        '친한 친구 두 명',
        'ikki yaqin do‘st',
        'two best friends',
        'два близких друга',
      ),
    },
    tags: ['people', 'friends'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-new',
    english: 'new',
    senseKey: 'not-old',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('새로운; 새것인', 'yangi', 'recently made or bought', 'новый'),
    examples: [
      {
        english: 'It’s a new phone.',
        translations: L(
          '새 휴대전화예요.',
          'Bu yangi telefon.',
          'It’s a new phone.',
          'Это новый телефон.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/njuː/',
      ttsText: 'new',
    },
    media: {
      emoji: '✨',
      imageUrl: '',
      imageAlt: L('새 물건', 'yangi buyum', 'a new object', 'новый предмет'),
    },
    tags: ['adjectives', 'opposites'],
    difficulty: 1,
    usageNote: L(
      'old의 반대말이에요.',
      'old so‘zining teskarisi.',
      'The opposite of old.',
      'Антоним слова old.',
    ),
    isCore: true,
  },

  {
    code: 'en-adjective-happy',
    english: 'happy',
    senseKey: 'feeling-good',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '행복한; 기쁜',
      'xursand',
      'feeling pleased and good',
      'счастливый',
    ),
    examples: [
      {
        english: 'She’s happy.',
        translations: L(
          '그녀는 행복해요.',
          'U xursand.',
          'She’s happy.',
          'Она счастлива.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈhæpi/',
      ttsText: 'happy',
    },
    media: {
      emoji: '😊',
      imageUrl: '',
      imageAlt: L(
        '행복한 사람',
        'xursand odam',
        'a happy person',
        'счастливый человек',
      ),
    },
    tags: ['adjectives', 'opposites'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-sad',
    english: 'sad',
    senseKey: 'unhappy',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('슬픈', 'xafa', 'unhappy', 'грустный'),
    examples: [
      {
        english: 'He’s sad.',
        translations: L('그는 슬퍼요.', 'U xafa.', 'He’s sad.', 'Он грустный.'),
      },
    ],
    pronunciation: {
      ipa: '/sæd/',
      ttsText: 'sad',
    },
    media: {
      emoji: '😢',
      imageUrl: '',
      imageAlt: L('슬픈 사람', 'xafa odam', 'a sad person', 'грустный человек'),
    },
    tags: ['adjectives', 'opposites'],
    difficulty: 1,
    usageNote: L(
      'happy의 반대말이에요.',
      'happy so‘zining teskarisi.',
      'The opposite of happy.',
      'Антоним слова happy.',
    ),
    isCore: true,
  },

  {
    code: 'en-adjective-good',
    english: 'good',
    senseKey: 'positive-quality',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('좋은', 'yaxshi', 'of a high or acceptable quality', 'хороший'),
    examples: [
      {
        english: 'It’s a good car.',
        translations: L(
          '좋은 자동차예요.',
          'Bu yaxshi mashina.',
          'It’s a good car.',
          'Это хорошая машина.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɡʊd/',
      ttsText: 'good',
    },
    media: {
      emoji: '👍',
      imageUrl: '',
      imageAlt: L(
        '좋은 것',
        'yaxshi narsa',
        'something good',
        'что-то хорошее',
      ),
    },
    tags: ['adjectives', 'opposites'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-bad',
    english: 'bad',
    senseKey: 'poor-quality',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('나쁜', 'yomon', 'not good', 'плохой'),
    examples: [
      {
        english: 'It’s a bad phone.',
        translations: L(
          '좋지 않은 휴대전화예요.',
          'Bu yomon telefon.',
          'It’s a bad phone.',
          'Это плохой телефон.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/bæd/',
      ttsText: 'bad',
    },
    media: {
      emoji: '👎',
      imageUrl: '',
      imageAlt: L('나쁜 것', 'yomon narsa', 'something bad', 'что-то плохое'),
    },
    tags: ['adjectives', 'opposites'],
    difficulty: 1,
    usageNote: L(
      'good의 반대말이에요.',
      'good so‘zining teskarisi.',
      'The opposite of good.',
      'Антоним слова good.',
    ),
    isCore: true,
  },

  {
    code: 'en-adjective-big',
    english: 'big',
    senseKey: 'large-size',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('큰', 'katta', 'large in size', 'большой'),
    examples: [
      {
        english: 'They’ve got a big television.',
        translations: L(
          '그들에게는 큰 텔레비전이 있어요.',
          'Ularning katta televizori bor.',
          'They’ve got a big television.',
          'У них большой телевизор.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/bɪɡ/',
      ttsText: 'big',
    },
    media: {
      emoji: '⬛',
      imageUrl: '',
      imageAlt: L('큰 물건', 'katta buyum', 'a big object', 'большой предмет'),
    },
    tags: ['adjectives', 'opposites'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-small',
    english: 'small',
    senseKey: 'little-size',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('작은', 'kichik', 'not large', 'маленький'),
    examples: [
      {
        english: 'It’s a small flat.',
        translations: L(
          '작은 아파트예요.',
          'Bu kichik kvartira.',
          'It’s a small flat.',
          'Это маленькая квартира.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/smɔːl/',
      ttsText: 'small',
    },
    media: {
      emoji: '▪️',
      imageUrl: '',
      imageAlt: L(
        '작은 물건',
        'kichik buyum',
        'a small object',
        'маленький предмет',
      ),
    },
    tags: ['adjectives', 'opposites'],
    difficulty: 1,
    usageNote: L(
      'big의 반대말이에요.',
      'big so‘zining teskarisi.',
      'The opposite of big.',
      'Антоним слова big.',
    ),
    isCore: true,
  },

  {
    code: 'en-adjective-young',
    english: 'young',
    senseKey: 'not-old-person',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('젊은; 어린', 'yosh', 'not old', 'молодой'),
    examples: [
      {
        english: 'He’s a young man.',
        translations: L(
          '그는 젊은 남자예요.',
          'U yosh erkak.',
          'He’s a young man.',
          'Он молодой мужчина.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/jʌŋ/',
      ttsText: 'young',
    },
    media: {
      emoji: '🧑',
      imageUrl: '',
      imageAlt: L(
        '젊은 사람',
        'yosh odam',
        'a young person',
        'молодой человек',
      ),
    },
    tags: ['adjectives', 'opposites'],
    difficulty: 1,
    usageNote: L(
      '사람의 나이를 말할 때 old의 반대말이에요.',
      'Odam yoshini aytganda old so‘zining teskarisi.',
      'For people, it is the opposite of old.',
      'При описании людей это антоним old.',
    ),
    isCore: true,
  },

  {
    code: 'en-adjective-rich',
    english: 'rich',
    senseKey: 'has-much-money',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('부유한', 'boy', 'having a lot of money', 'богатый'),
    examples: [
      {
        english: 'It’s a rich country.',
        translations: L(
          '부유한 나라예요.',
          'Bu boy mamlakat.',
          'It’s a rich country.',
          'Это богатая страна.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/rɪtʃ/',
      ttsText: 'rich',
    },
    media: {
      emoji: '💰',
      imageUrl: '',
      imageAlt: L('부유함', 'boylik', 'wealth', 'богатство'),
    },
    tags: ['adjectives', 'opposites'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-poor',
    english: 'poor',
    senseKey: 'has-little-money',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('가난한', 'kambag‘al', 'having very little money', 'бедный'),
    examples: [
      {
        english: 'It’s a poor country.',
        translations: L(
          '가난한 나라예요.',
          'Bu kambag‘al mamlakat.',
          'It’s a poor country.',
          'Это бедная страна.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/pɔː/',
      ttsText: 'poor',
    },
    media: {
      emoji: '🪙',
      imageUrl: '',
      imageAlt: L('돈이 적음', 'kam pul', 'little money', 'мало денег'),
    },
    tags: ['adjectives', 'opposites'],
    difficulty: 1,
    usageNote: L(
      'rich의 반대말이에요.',
      'rich so‘zining teskarisi.',
      'The opposite of rich.',
      'Антоним слова rich.',
    ),
    isCore: true,
  },

  {
    code: 'en-adjective-cheap',
    english: 'cheap',
    senseKey: 'low-price',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('싼', 'arzon', 'costing little money', 'дешёвый'),
    examples: [
      {
        english: 'It’s a cheap bicycle.',
        translations: L(
          '싼 자전거예요.',
          'Bu arzon velosiped.',
          'It’s a cheap bicycle.',
          'Это дешёвый велосипед.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/tʃiːp/',
      ttsText: 'cheap',
    },
    media: {
      emoji: '🏷️',
      imageUrl: '',
      imageAlt: L(
        '싼 물건',
        'arzon buyum',
        'a cheap object',
        'дешёвый предмет',
      ),
    },
    tags: ['adjectives', 'opposites'],
    difficulty: 1,
    usageNote: L(
      'expensive의 반대말이에요.',
      'expensive so‘zining teskarisi.',
      'The opposite of expensive.',
      'Антоним слова expensive.',
    ),
    isCore: true,
  },

  {
    code: 'en-adjective-cold',
    english: 'cold',
    senseKey: 'low-temperature',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('차가운; 추운', 'sovuq', 'having a low temperature', 'холодный'),
    examples: [
      {
        english: 'It’s cold.',
        translations: L('추워요.', 'Sovuq.', 'It’s cold.', 'Холодно.'),
      },
    ],
    pronunciation: {
      ipa: '/kəʊld/',
      ttsText: 'cold',
    },
    media: {
      emoji: '🥶',
      imageUrl: '',
      imageAlt: L(
        '차가운 것',
        'sovuq narsa',
        'something cold',
        'что-то холодное',
      ),
    },
    tags: ['adjectives', 'opposites'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-hot',
    english: 'hot',
    senseKey: 'high-temperature',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '뜨거운; 더운',
      'issiq',
      'having a high temperature',
      'горячий; жаркий',
    ),
    examples: [
      {
        english: 'It’s hot.',
        translations: L('더워요.', 'Issiq.', 'It’s hot.', 'Жарко.'),
      },
    ],
    pronunciation: {
      ipa: '/hɒt/',
      ttsText: 'hot',
    },
    media: {
      emoji: '🔥',
      imageUrl: '',
      imageAlt: L(
        '뜨거운 것',
        'issiq narsa',
        'something hot',
        'что-то горячее',
      ),
    },
    tags: ['adjectives', 'opposites'],
    difficulty: 1,
    usageNote: L(
      'cold의 반대말이에요.',
      'cold so‘zining teskarisi.',
      'The opposite of cold.',
      'Антоним слова cold.',
    ),
    isCore: true,
  },
];

export const EN_S1_UNIT3_NODE2_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Haven't got / hasn't got
  // ===========================================================

  en_s1u3_n2_001_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Have you got a bicycle?',
    audioText: 'Have you got a bicycle?',
    answerTranslation: L(
      '자전거가 있어요?',
      'Velosipedingiz bormi?',
      'Have you got a bicycle?',
      'У вас есть велосипед?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['have-got', 'bicycle'],
  },

  en_s1u3_n2_002_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      { korean: 'bicycle', native: 'velosiped' },
      { korean: 'car', native: 'mashina' },
      { korean: 'bank account', native: 'bank hisobi' },
      { korean: 'television', native: 'televizor' },
      { korean: 'mobile phone', native: 'mobil telefon' },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['possessions', 'matching'],
  },

  en_s1u3_n2_003_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I haven’t got a bicycle.',
    audioText: 'I haven’t got a bicycle.',
    answerTranslation: L(
      '저는 자전거가 없어요.',
      'Mening velosipedim yo‘q.',
      'I haven’t got a bicycle.',
      'У меня нет велосипеда.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['have-got', 'negative'],
  },

  en_s1u3_n2_004_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I ___ got a bicycle.',
    blankAnswers: ['haven’t'],
    options: ['haven’t', 'hasn’t', 'have', 'has'],
    answer: 'haven’t',
    answerTranslation: L(
      '저는 자전거가 없어요.',
      'Mening velosipedim yo‘q.',
      'I haven’t got a bicycle.',
      'У меня нет велосипеда.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['have-got', 'haven’t'],
  },

  en_s1u3_n2_005_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'We haven’t got a television.',
    audioText: 'We haven’t got a television.',
    answerTranslation: L(
      '우리는 텔레비전이 없어요.',
      'Bizning televizorimiz yo‘q.',
      'We haven’t got a television.',
      'У нас нет телевизора.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['have-got', 'we', 'negative'],
  },

  en_s1u3_n2_006_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'We ___ got a television.',
    blankAnswers: ['haven’t'],
    options: ['haven’t', 'hasn’t', 'aren’t', 'isn’t'],
    answer: 'haven’t',
    answerTranslation: L(
      '우리는 텔레비전이 없어요.',
      'Bizning televizorimiz yo‘q.',
      'We haven’t got a television.',
      'У нас нет телевизора.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['have-got', 'negative'],
  },

  en_s1u3_n2_007_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'They haven’t got a car.',
    audioText: 'They haven’t got a car.',
    answerTranslation: L(
      '그들은 자동차가 없어요.',
      'Ularning mashinasi yo‘q.',
      'They haven’t got a car.',
      'У них нет машины.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['have-got', 'they', 'negative'],
  },

  en_s1u3_n2_008_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'They ___ got a car.',
    blankAnswers: ['haven’t'],
    options: ['haven’t', 'hasn’t', 'have', 'are'],
    answer: 'haven’t',
    answerTranslation: L(
      '그들은 자동차가 없어요.',
      'Ularning mashinasi yo‘q.',
      'They haven’t got a car.',
      'У них нет машины.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['have-got', 'they'],
  },

  en_s1u3_n2_009_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'He hasn’t got a bank account.',
    audioText: 'He hasn’t got a bank account.',
    answerTranslation: L(
      '그는 은행 계좌가 없어요.',
      'Uning bank hisobi yo‘q.',
      'He hasn’t got a bank account.',
      'У него нет банковского счёта.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['has-got', 'negative'],
  },

  en_s1u3_n2_010_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'He ___ got a bank account.',
    blankAnswers: ['hasn’t'],
    options: ['hasn’t', 'haven’t', 'has', 'is'],
    answer: 'hasn’t',
    answerTranslation: L(
      '그는 은행 계좌가 없어요.',
      'Uning bank hisobi yo‘q.',
      'He hasn’t got a bank account.',
      'У него нет банковского счёта.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['has-got', 'hasn’t'],
  },

  en_s1u3_n2_011_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She hasn’t got a mobile phone.',
    audioText: 'She hasn’t got a mobile phone.',
    answerTranslation: L(
      '그녀는 휴대전화가 없어요.',
      'Uning mobil telefoni yo‘q.',
      'She hasn’t got a mobile phone.',
      'У неё нет мобильного телефона.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['has-got', 'she'],
  },

  en_s1u3_n2_012_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      { korean: 'haven’t got', native: 'yo‘q — I/you/we/they' },
      { korean: 'hasn’t got', native: 'yo‘q — he/she/it' },
      { korean: 'bank account', native: 'bank hisobi' },
      { korean: 'mobile phone', native: 'mobil telefon' },
      { korean: 'bicycle', native: 'velosiped' },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['have-got', 'negative', 'listening'],
  },

  en_s1u3_n2_013_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Tell me about Mia.',
    options: ['She', 'hasn’t', 'got', 'a', 'car', 'haven’t', 'They'],
    answer: 'She hasn’t got a car',
    answerTranslation: L(
      'Mia는 자동차가 없어요.',
      'Mianing mashinasi yo‘q.',
      'She hasn’t got a car.',
      'У неё нет машины.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['has-got', 'negative', 'reply-builder'],
  },

  en_s1u3_n2_014_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'My village hasn’t got a hospital.',
    audioText: 'My village hasn’t got a hospital.',
    answerTranslation: L(
      '우리 마을에는 병원이 없어요.',
      'Mening qishlog‘imda kasalxona yo‘q.',
      'My village hasn’t got a hospital.',
      'В моей деревне нет больницы.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['has-got', 'village'],
  },

  en_s1u3_n2_015_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'My village ___ got a hospital.',
    blankAnswers: ['hasn’t'],
    options: ['hasn’t', 'haven’t', 'doesn’t', 'isn’t'],
    answer: 'hasn’t',
    answerTranslation: L(
      '우리 마을에는 병원이 없어요.',
      'Mening qishlog‘imda kasalxona yo‘q.',
      'My village hasn’t got a hospital.',
      'В моей деревне нет больницы.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['has-got', 'negative'],
  },

  en_s1u3_n2_016_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['We', 'haven’t', 'got', 'a', 'television', 'hasn’t', 'car'],
    answer: 'We haven’t got a television',
    answerTranslation: L(
      '우리는 텔레비전이 없어요.',
      'Bizning televizorimiz yo‘q.',
      'We haven’t got a television.',
      'У нас нет телевизора.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['have-got', 'negative'],
  },

  en_s1u3_n2_017_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Kim hasn’t got a car.',
    audioText: 'Kim hasn’t got a car.',
    answerTranslation: L(
      'Kim은 자동차가 없어요.',
      'Kimning mashinasi yo‘q.',
      'Kim hasn’t got a car.',
      'У Ким нет машины.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['has-got', 'negative'],
  },

  en_s1u3_n2_018_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['got', 'hasn’t', 'Kim', 'a', 'car', 'have', 'phone'],
    answer: 'Kim hasn’t got a car',
    audioText: 'Kim hasn’t got a car.',
    answerTranslation: L(
      'Kim은 자동차가 없어요.',
      'Kimning mashinasi yo‘q.',
      'Kim hasn’t got a car.',
      'У Ким нет машины.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['has-got', 'negative'],
  },

  en_s1u3_n2_019_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What haven’t you got?',
    options: ['I', 'haven’t', 'got', 'a', 'bank', 'account', 'hasn’t'],
    answer: 'I haven’t got a bank account',
    answerTranslation: L(
      '저는 은행 계좌가 없어요.',
      'Mening bank hisobim yo‘q.',
      'I haven’t got a bank account.',
      'У меня нет банковского счёта.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['have-got', 'negative', 'reply-builder'],
  },

  en_s1u3_n2_020_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Has Leo got a bicycle?' },
      { speaker: 'user', text: 'No.' },
    ],
    options: [
      'He hasn’t got a bicycle.',
      'He haven’t got a bicycle.',
      'They hasn’t got a bicycle.',
      'He isn’t got a bicycle.',
    ],
    answer: 'He hasn’t got a bicycle.',
    answerTranslation: L(
      '그는 자전거가 없어요.',
      'Uning velosipedi yo‘q.',
      'He hasn’t got a bicycle.',
      'У него нет велосипеда.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['has-got', 'negative', 'dialog'],
  },

  // ===========================================================
  // Lesson 2 · Questions and short answers
  // ===========================================================

  en_s1u3_n2_021_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Have you got a car?',
    audioText: 'Have you got a car?',
    answerTranslation: L(
      '자동차가 있어요?',
      'Mashinangiz bormi?',
      'Have you got a car?',
      'У вас есть машина?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['have-got', 'question'],
  },

  en_s1u3_n2_022_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ you got a car?',
    blankAnswers: ['Have'],
    options: ['Have', 'Has', 'Are', 'Is'],
    answer: 'Have',
    answerTranslation: L(
      '자동차가 있어요?',
      'Mashinangiz bormi?',
      'Have you got a car?',
      'У вас есть машина?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['have-got', 'question'],
  },

  en_s1u3_n2_023_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Yes, I have.',
    audioText: 'Yes, I have.',
    answerTranslation: L('네, 있어요.', 'Ha, bor.', 'Yes, I have.', 'Да.'),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['short-answer', 'have'],
  },

  en_s1u3_n2_024_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Have you got a car?' }],
    options: ['Yes, I have.', 'Yes, I has.', 'Yes, I am.', 'Yes, I got.'],
    answer: 'Yes, I have.',
    answerTranslation: L('네, 있어요.', 'Ha, bor.', 'Yes, I have.', 'Да.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['short-answer', 'dialog'],
  },

  en_s1u3_n2_025_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'No, I haven’t.',
    audioText: 'No, I haven’t.',
    answerTranslation: L('아니요, 없어요.', 'Yo‘q.', 'No, I haven’t.', 'Нет.'),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['short-answer', 'haven’t'],
  },

  en_s1u3_n2_026_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'No, I ___.',
    blankAnswers: ['haven’t'],
    options: ['haven’t', 'hasn’t', 'isn’t', 'aren’t'],
    answer: 'haven’t',
    answerTranslation: L('아니요, 없어요.', 'Yo‘q.', 'No, I haven’t.', 'Нет.'),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['short-answer', 'haven’t'],
  },

  en_s1u3_n2_027_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Have your friends got cars?',
    audioText: 'Have your friends got cars?',
    answerTranslation: L(
      '친구들은 자동차가 있어요?',
      'Do‘stlaringizning mashinalari bormi?',
      'Have your friends got cars?',
      'У ваших друзей есть машины?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['have-got', 'they', 'question'],
  },

  en_s1u3_n2_028_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Have your friends got cars?',
    options: ['No', 'they', 'haven’t', 'hasn’t', 'he', 'cars'],
    answer: 'No they haven’t',
    answerTranslation: L(
      '아니요, 없어요.',
      'Yo‘q, ularda yo‘q.',
      'No, they haven’t.',
      'Нет.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['short-answer', 'they', 'reply-builder'],
  },

  en_s1u3_n2_029_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Has your house got a garden?',
    audioText: 'Has your house got a garden?',
    answerTranslation: L(
      '집에 정원이 있어요?',
      'Uyingizning bog‘i bormi?',
      'Has your house got a garden?',
      'У вашего дома есть сад?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['has-got', 'question', 'garden'],
  },

  en_s1u3_n2_030_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ your house got a garden?',
    blankAnswers: ['Has'],
    options: ['Has', 'Have', 'Is', 'Are'],
    answer: 'Has',
    answerTranslation: L(
      '집에 정원이 있어요?',
      'Uyingizning bog‘i bormi?',
      'Has your house got a garden?',
      'У вашего дома есть сад?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['has-got', 'question'],
  },

  en_s1u3_n2_031_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Yes, it has.',
    audioText: 'Yes, it has.',
    answerTranslation: L('네, 있어요.', 'Ha, bor.', 'Yes, it has.', 'Да.'),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['short-answer', 'it'],
  },

  en_s1u3_n2_032_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Has your house got a garden?' }],
    options: [
      'Yes, it has.',
      'Yes, it have.',
      'Yes, they has.',
      'Yes, it is got.',
    ],
    answer: 'Yes, it has.',
    answerTranslation: L('네, 있어요.', 'Ha, bor.', 'Yes, it has.', 'Да.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['short-answer', 'it', 'dialog'],
  },

  en_s1u3_n2_033_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Has your neighbour got a dog?',
    audioText: 'Has your neighbour got a dog?',
    answerTranslation: L(
      '이웃은 개가 있어요?',
      'Qo‘shningizning iti bormi?',
      'Has your neighbour got a dog?',
      'У вашего соседа есть собака?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['has-got', 'neighbour', 'question'],
  },

  en_s1u3_n2_034_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Has your neighbour got a dog?',
    options: ['No', 'he', 'hasn’t', 'haven’t', 'they', 'has'],
    answer: 'No he hasn’t',
    answerTranslation: L(
      '아니요, 없어요.',
      'Yo‘q, unda yo‘q.',
      'No, he hasn’t.',
      'Нет.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['short-answer', 'he', 'reply-builder'],
  },

  en_s1u3_n2_035_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Has Kate got a job?',
    audioText: 'Has Kate got a job?',
    answerTranslation: L(
      'Kate는 직업이 있어요?',
      'Katening ishi bormi?',
      'Has Kate got a job?',
      'У Кейт есть работа?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['has-got', 'job'],
  },

  en_s1u3_n2_036_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Yes, she ___.',
    blankAnswers: ['has'],
    options: ['has', 'have', 'hasn’t', 'haven’t'],
    answer: 'has',
    answerTranslation: L('네, 있어요.', 'Ha, bor.', 'Yes, she has.', 'Да.'),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['short-answer', 'she'],
  },

  en_s1u3_n2_037_speaking: {
    type: 'speaking',
    level: LV,
    instruction: L(
      '질문의 핵심 단어에 강세를 두어 따라 말하세요.',
      'Savoldagi asosiy so‘zga urg‘u berib takrorlang.',
      'Repeat, stressing the key word in the question.',
      'Повторите, выделяя ударением ключевое слово вопроса.',
    ),
    answer: 'Have you got a car?',
    audioText: 'Have you got a car?',
    answerTranslation: L(
      '자동차가 있어요?',
      'Mashinangiz bormi?',
      'Have you got a car?',
      'У вас есть машина?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['pronunciation', 'stress', 'question'],
  },

  en_s1u3_n2_038_speaking: {
    type: 'speaking',
    level: LV,
    instruction: L(
      '대답의 핵심 단어에 강세를 두어 따라 말하세요.',
      'Javobdagi asosiy so‘zga urg‘u berib takrorlang.',
      'Repeat, stressing the key word in the answer.',
      'Повторите, выделяя ударением ключевое слово ответа.',
    ),
    answer: 'No, I haven’t.',
    audioText: 'No, I haven’t.',
    answerTranslation: L('아니요, 없어요.', 'Yo‘q.', 'No, I haven’t.', 'Нет.'),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['pronunciation', 'stress', 'answer'],
  },

  en_s1u3_n2_039_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      { korean: 'Have you got a car?', native: 'Mashinangiz bormi?' },
      { korean: 'Yes, I have.', native: 'Ha, bor.' },
      { korean: 'No, I haven’t.', native: 'Yo‘q.' },
      { korean: 'Has she got a pet?', native: 'Uning uy hayvoni bormi?' },
      { korean: 'No, she hasn’t.', native: 'Yo‘q, unda yo‘q.' },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['have-got', 'short-answers', 'listening'],
  },

  en_s1u3_n2_040_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'No, he hasn’t.',
    audioText: 'No, he hasn’t.',
    answerI18n: L(
      '아니요, 그에게는 없어요',
      'Yo‘q, unda yo‘q',
      'No he has not',
      'Нет, у него нет',
    ),
    options: ['No', 'he', 'hasn’t', 'Yes', 'they', 'have'],
    optionsI18n: {
      ko: ['아니요', '그에게는', '없어요', '네', '그들에게는'],
      uz: ['Yo‘q', 'unda', 'yo‘q', 'Ha', 'ularda'],
      en: ['No', 'he', 'has', 'not', 'Yes', 'they'],
      ru: ['Нет', 'у', 'него', 'нет', 'Да', 'у них'],
    },
    answerTranslation: L(
      '아니요, 없어요.',
      'Yo‘q, unda yo‘q.',
      'No, he hasn’t.',
      'Нет.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['short-answer', 'sentence-builder'],
  },

  // ===========================================================
  // Lesson 3 · Opposite adjectives
  // ===========================================================

  en_s1u3_n2_041_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Old. New.',
    audioText: 'Old. New.',
    answerTranslation: L(
      '오래된. 새로운.',
      'Eski. Yangi.',
      'Old. New.',
      'Старый. Новый.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['opposites', 'old-new'],
  },

  en_s1u3_n2_042_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '서로 반대되는 형용사를 연결하세요.',
      'Qarama-qarshi sifatlarni ulang.',
      'Match the opposite adjectives.',
      'Соедините противоположные прилагательные.',
    ),
    pairs: [
      { korean: 'old', native: 'new' },
      { korean: 'happy', native: 'sad' },
      { korean: 'good', native: 'bad' },
      { korean: 'big', native: 'small' },
      { korean: 'rich', native: 'poor' },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['opposites', 'matching'],
  },

  en_s1u3_n2_043_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Happy. Sad.',
    audioText: 'Happy. Sad.',
    answerTranslation: L(
      '행복한. 슬픈.',
      'Xursand. Xafa.',
      'Happy. Sad.',
      'Счастливый. Грустный.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['opposites', 'happy-sad'],
  },

  en_s1u3_n2_044_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      'happy의 반대말을 고르세요.',
      'happy so‘zining teskarisini tanlang.',
      'Choose the opposite of happy.',
      'Выберите антоним happy.',
    ),
    sentenceTemplate: 'happy ↔ ___',
    blankAnswers: ['sad'],
    options: ['sad', 'small', 'cheap', 'new'],
    answer: 'sad',
    answerTranslation: L(
      'happy ↔ sad',
      'happy ↔ sad',
      'happy ↔ sad',
      'happy ↔ sad',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['opposites', 'happy-sad'],
  },

  en_s1u3_n2_045_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Good. Bad.',
    audioText: 'Good. Bad.',
    answerTranslation: L(
      '좋은. 나쁜.',
      'Yaxshi. Yomon.',
      'Good. Bad.',
      'Хороший. Плохой.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['opposites', 'good-bad'],
  },

  en_s1u3_n2_046_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      'good의 반대말을 고르세요.',
      'good so‘zining teskarisini tanlang.',
      'Choose the opposite of good.',
      'Выберите антоним good.',
    ),
    sentenceTemplate: 'good ↔ ___',
    blankAnswers: ['bad'],
    options: ['bad', 'cold', 'young', 'rich'],
    answer: 'bad',
    answerTranslation: L(
      'good ↔ bad',
      'good ↔ bad',
      'good ↔ bad',
      'good ↔ bad',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['opposites', 'good-bad'],
  },

  en_s1u3_n2_047_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Big. Small.',
    audioText: 'Big. Small.',
    answerTranslation: L(
      '큰. 작은.',
      'Katta. Kichik.',
      'Big. Small.',
      'Большой. Маленький.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['opposites', 'big-small'],
  },

  en_s1u3_n2_048_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      'big의 반대말을 고르세요.',
      'big so‘zining teskarisini tanlang.',
      'Choose the opposite of big.',
      'Выберите антоним big.',
    ),
    sentenceTemplate: 'big ↔ ___',
    blankAnswers: ['small'],
    options: ['small', 'sad', 'poor', 'old'],
    answer: 'small',
    answerTranslation: L(
      'big ↔ small',
      'big ↔ small',
      'big ↔ small',
      'big ↔ small',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['opposites', 'big-small'],
  },

  en_s1u3_n2_049_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Old. Young.',
    audioText: 'Old. Young.',
    answerTranslation: L(
      '나이 든. 젊은.',
      'Qari. Yosh.',
      'Old. Young.',
      'Старый. Молодой.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['opposites', 'old-young'],
  },

  en_s1u3_n2_050_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '사람을 설명할 때 old의 반대말을 고르세요.',
      'Odamni tasvirlaganda old so‘zining teskarisini tanlang.',
      'Choose the opposite of old when describing a person.',
      'Выберите антоним old при описании человека.',
    ),
    sentenceTemplate: 'an old man ↔ a ___ man',
    blankAnswers: ['young'],
    options: ['young', 'new', 'cheap', 'cold'],
    answer: 'young',
    answerTranslation: L(
      '나이 든 남자 ↔ 젊은 남자',
      'qari erkak ↔ yosh erkak',
      'an old man ↔ a young man',
      'старый мужчина ↔ молодой мужчина',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['opposites', 'old-young'],
  },

  en_s1u3_n2_051_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Rich. Poor.',
    audioText: 'Rich. Poor.',
    answerTranslation: L(
      '부유한. 가난한.',
      'Boy. Kambag‘al.',
      'Rich. Poor.',
      'Богатый. Бедный.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['opposites', 'rich-poor'],
  },

  en_s1u3_n2_052_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['It’s', 'a', 'rich', 'country', 'poor', 'city', 'an'],
    answer: 'It’s a rich country',
    answerTranslation: L(
      '부유한 나라예요.',
      'Bu boy mamlakat.',
      'It’s a rich country.',
      'Это богатая страна.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['adjective-noun', 'rich'],
  },

  en_s1u3_n2_053_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Expensive. Cheap.',
    audioText: 'Expensive. Cheap.',
    answerTranslation: L(
      '비싼. 싼.',
      'Qimmat. Arzon.',
      'Expensive. Cheap.',
      'Дорогой. Дешёвый.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['opposites', 'expensive-cheap'],
  },

  en_s1u3_n2_054_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      'expensive의 반대말을 고르세요.',
      'expensive so‘zining teskarisini tanlang.',
      'Choose the opposite of expensive.',
      'Выберите антоним expensive.',
    ),
    sentenceTemplate: 'expensive ↔ ___',
    blankAnswers: ['cheap'],
    options: ['cheap', 'small', 'cold', 'sad'],
    answer: 'cheap',
    answerTranslation: L(
      'expensive ↔ cheap',
      'expensive ↔ cheap',
      'expensive ↔ cheap',
      'expensive ↔ cheap',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['opposites', 'expensive-cheap'],
  },

  en_s1u3_n2_055_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Cold. Hot.',
    audioText: 'Cold. Hot.',
    answerTranslation: L(
      '차가운. 뜨거운.',
      'Sovuq. Issiq.',
      'Cold. Hot.',
      'Холодный. Горячий.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['opposites', 'cold-hot'],
  },

  en_s1u3_n2_056_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      { korean: 'new', native: 'yangi' },
      { korean: 'sad', native: 'xafa' },
      { korean: 'small', native: 'kichik' },
      { korean: 'cheap', native: 'arzon' },
      { korean: 'hot', native: 'issiq' },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['opposites', 'listening'],
  },

  en_s1u3_n2_057_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['It’s', 'a', 'cheap', 'car', 'expensive', 'an', 'phone'],
    answer: 'It’s a cheap car',
    answerTranslation: L(
      '싼 자동차예요.',
      'Bu arzon mashina.',
      'It’s a cheap car.',
      'Это дешёвая машина.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['adjective-noun', 'cheap'],
  },

  en_s1u3_n2_058_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'It’s an old phone.',
    audioText: 'It’s an old phone.',
    answerTranslation: L(
      '오래된 휴대전화예요.',
      'Bu eski telefon.',
      'It’s an old phone.',
      'Это старый телефон.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['adjective-noun', 'old'],
  },

  en_s1u3_n2_059_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Is it an old phone?',
    options: ['No', 'it’s', 'a', 'new', 'phone', 'young', 'car'],
    answer: 'No it’s a new phone',
    answerTranslation: L(
      '아니요, 새 휴대전화예요.',
      'Yo‘q, bu yangi telefon.',
      'No, it’s a new phone.',
      'Нет, это новый телефон.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['opposites', 'reply-builder'],
  },

  en_s1u3_n2_060_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Is your flat big?' }],
    options: [
      'No, it’s small.',
      'No, it’s young.',
      'No, it’s rich.',
      'No, it’s hot.',
    ],
    answer: 'No, it’s small.',
    answerTranslation: L(
      '아니요, 작아요.',
      'Yo‘q, u kichik.',
      'No, it’s small.',
      'Нет, она маленькая.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['opposites', 'big-small', 'dialog'],
  },

  // ===========================================================
  // Lesson 4 · Talking about possessions
  // ===========================================================

  en_s1u3_n2_061_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Have you got a pet?',
    audioText: 'Have you got a pet?',
    answerTranslation: L(
      '반려동물이 있어요?',
      'Uy hayvoningiz bormi?',
      'Have you got a pet?',
      'У вас есть питомец?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['possessions', 'pet'],
  },

  en_s1u3_n2_062_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Have you got a pet?',
    options: ['Yes', 'I', 'have', 'I’ve', 'got', 'a', 'dog'],
    answer: 'Yes I have',
    answerTranslation: L('네, 있어요.', 'Ha, bor.', 'Yes, I have.', 'Да.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['possessions', 'short-answer'],
  },

  en_s1u3_n2_063_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I’ve got a dog.',
    audioText: 'I’ve got a dog.',
    answerTranslation: L(
      '저는 개가 한 마리 있어요.',
      'Mening itim bor.',
      'I’ve got a dog.',
      'У меня есть собака.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['possessions', 'dog'],
  },

  en_s1u3_n2_064_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I’ve got an ___ laptop.',
    blankAnswers: ['old'],
    options: ['old', 'young', 'rich', 'happy'],
    answer: 'old',
    answerTranslation: L(
      '저는 오래된 노트북이 있어요.',
      'Mening eski noutbukim bor.',
      'I’ve got an old laptop.',
      'У меня есть старый ноутбук.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['possessions', 'adjective-noun'],
  },

  en_s1u3_n2_065_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I’ve got an old laptop.',
    audioText: 'I’ve got an old laptop.',
    answerTranslation: L(
      '저는 오래된 노트북이 있어요.',
      'Mening eski noutbukim bor.',
      'I’ve got an old laptop.',
      'У меня есть старый ноутбук.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['possessions', 'laptop'],
  },

  en_s1u3_n2_066_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Have you got a laptop?' },
      { speaker: 'user', text: 'Yes.' },
      { speaker: 'npc', text: 'Is it new?' },
    ],
    options: [
      'No, it’s old.',
      'No, it’s young.',
      'No, he hasn’t.',
      'No, they’re old.',
    ],
    answer: 'No, it’s old.',
    answerTranslation: L(
      '아니요, 오래됐어요.',
      'Yo‘q, u eski.',
      'No, it’s old.',
      'Нет, он старый.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['possessions', 'old-new', 'dialog'],
  },

  en_s1u3_n2_067_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Has your best friend got a car?',
    audioText: 'Has your best friend got a car?',
    answerTranslation: L(
      '가장 친한 친구는 자동차가 있어요?',
      'Eng yaqin do‘stingizning mashinasi bormi?',
      'Has your best friend got a car?',
      'У вашего лучшего друга есть машина?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['best-friend', 'car'],
  },

  en_s1u3_n2_068_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Has your best friend got a car?',
    options: ['Yes', 'she', 'has', 'She’s', 'got', 'a', 'small', 'car'],
    answer: 'Yes she has',
    answerTranslation: L('네, 있어요.', 'Ha, bor.', 'Yes, she has.', 'Да.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['best-friend', 'short-answer'],
  },

  en_s1u3_n2_069_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She’s got a small car.',
    audioText: 'She’s got a small car.',
    answerTranslation: L(
      '그녀에게는 작은 자동차가 있어요.',
      'Uning kichik mashinasi bor.',
      'She’s got a small car.',
      'У неё маленькая машина.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['possessions', 'small-car'],
  },

  en_s1u3_n2_070_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She’s got a ___ car.',
    blankAnswers: ['small'],
    options: ['small', 'poor', 'sad', 'cold'],
    answer: 'small',
    answerTranslation: L(
      '그녀에게는 작은 자동차가 있어요.',
      'Uning kichik mashinasi bor.',
      'She’s got a small car.',
      'У неё маленькая машина.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['adjective-noun', 'small'],
  },

  en_s1u3_n2_071_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Have your neighbours got a television?',
    audioText: 'Have your neighbours got a television?',
    answerTranslation: L(
      '이웃들은 텔레비전이 있어요?',
      'Qo‘shnilaringizning televizori bormi?',
      'Have your neighbours got a television?',
      'У ваших соседей есть телевизор?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['neighbours', 'television'],
  },

  en_s1u3_n2_072_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Have your neighbours got a television?',
    options: [
      'Yes',
      'they',
      'have',
      'They’ve',
      'got',
      'a',
      'big',
      'television',
    ],
    answer: 'Yes they have',
    answerTranslation: L(
      '네, 있어요.',
      'Ha, ularda bor.',
      'Yes, they have.',
      'Да.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['neighbours', 'short-answer'],
  },

  en_s1u3_n2_073_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'They’ve got a big television.',
    audioText: 'They’ve got a big television.',
    answerTranslation: L(
      '그들에게는 큰 텔레비전이 있어요.',
      'Ularning katta televizori bor.',
      'They’ve got a big television.',
      'У них большой телевизор.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['possessions', 'big'],
  },

  en_s1u3_n2_074_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['got', 'a', 'television', 'They’ve', 'big', 'small', 'has'],
    answer: 'They’ve got a big television',
    audioText: 'They’ve got a big television.',
    answerTranslation: L(
      '그들에게는 큰 텔레비전이 있어요.',
      'Ularning katta televizori bor.',
      'They’ve got a big television.',
      'У них большой телевизор.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['possessions', 'big'],
  },

  en_s1u3_n2_075_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Have you got an English book?',
    audioText: 'Have you got an English book?',
    answerTranslation: L(
      '영어책이 있어요?',
      'Ingliz tili kitobingiz bormi?',
      'Have you got an English book?',
      'У вас есть учебник английского?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['possessions', 'english-book'],
  },

  en_s1u3_n2_076_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Have you got an English book?' }],
    options: [
      'Yes, I have. It’s a good book.',
      'Yes, I has. It’s good book.',
      'Yes, I am. It’s a good.',
      'Yes, it have. I’m book.',
    ],
    answer: 'Yes, I have. It’s a good book.',
    answerTranslation: L(
      '네, 있어요. 좋은 책이에요.',
      'Ha, bor. Bu yaxshi kitob.',
      'Yes, I have. It’s a good book.',
      'Да. Это хорошая книга.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['possessions', 'good', 'dialog'],
  },

  en_s1u3_n2_077_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I haven’t got a car, but I’ve got a bicycle.',
    audioText: 'I haven’t got a car, but I’ve got a bicycle.',
    answerTranslation: L(
      '자동차는 없지만 자전거는 있어요.',
      'Mening mashinam yo‘q, lekin velosipedim bor.',
      'I haven’t got a car, but I’ve got a bicycle.',
      'У меня нет машины, но есть велосипед.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['possessions', 'positive-negative'],
  },

  en_s1u3_n2_078_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'I',
      'haven’t',
      'got',
      'a',
      'car',
      'but',
      'I’ve',
      'bicycle',
      'hasn’t',
    ],
    answer: 'I haven’t got a car but I’ve got a bicycle',
    answerTranslation: L(
      '자동차는 없지만 자전거는 있어요.',
      'Mening mashinam yo‘q, lekin velosipedim bor.',
      'I haven’t got a car, but I’ve got a bicycle.',
      'У меня нет машины, но есть велосипед.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['possessions', 'positive-negative'],
  },

  en_s1u3_n2_079_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I’ve got a new phone. It’s small and cheap.',
    audioText: 'I’ve got a new phone. It’s small and cheap.',
    answerTranslation: L(
      '저는 새 휴대전화가 있어요. 작고 저렴해요.',
      'Mening yangi telefonim bor. U kichik va arzon.',
      'I’ve got a new phone. It’s small and cheap.',
      'У меня новый телефон. Он маленький и дешёвый.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['possessions', 'description'],
  },

  en_s1u3_n2_080_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      { korean: 'a new phone', native: 'yangi telefon' },
      { korean: 'a small flat', native: 'kichik kvartira' },
      { korean: 'a cheap bicycle', native: 'arzon velosiped' },
      { korean: 'a big television', native: 'katta televizor' },
      { korean: 'a good English book', native: 'yaxshi ingliz tili kitobi' },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['possessions', 'adjectives', 'review'],
  },
};

// ─────────────────────────────────────────────────────────────
// Node 2
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT3_NODE2 = {
  title: L(
    '무엇을 가지고 있어요?',
    'Nimangiz bor?',
    'Possessions',
    'Что у вас есть?',
  ),
  section: 1,
  unit: 3,
  order: 2,
  isActive: true,

  lessons: [
    {
      title: L(
        '없다고 말하기',
        'Yo‘qligini aytish',
        'Saying what you haven’t got',
        'Говорим, чего у нас нет',
      ),
      description: L(
        'I, you, we, they에는 haven’t got을, he, she, it에는 hasn’t got을 사용해 가지고 있지 않은 것을 말해요.',
        'I, you, we, they bilan haven’t got, he, she, it bilan hasn’t got ishlatib, nima yo‘qligini aytasiz.',
        'Use haven’t got with I, you, we and they, and hasn’t got with he, she and it.',
        'Используем haven’t got с I, you, we, they и hasn’t got с he, she, it.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 1,
      questions: [
        'en_s1u3_n2_001_speaking',
        'en_s1u3_n2_002_word_matching',
        'en_s1u3_n2_003_speaking',
        'en_s1u3_n2_004_fill_in_blank',
        'en_s1u3_n2_005_speaking',
        'en_s1u3_n2_006_fill_in_blank',
        'en_s1u3_n2_007_speaking',
        'en_s1u3_n2_008_fill_in_blank',
        'en_s1u3_n2_009_speaking',
        'en_s1u3_n2_010_fill_in_blank',
        'en_s1u3_n2_011_speaking',
        'en_s1u3_n2_012_audio_match',
        'en_s1u3_n2_013_reply_builder',
        'en_s1u3_n2_014_speaking',
        'en_s1u3_n2_015_fill_in_blank',
        'en_s1u3_n2_016_translate_builder',
        'en_s1u3_n2_017_speaking',
        'en_s1u3_n2_018_word_arrange',
        'en_s1u3_n2_019_reply_builder',
        'en_s1u3_n2_020_dialog_complete',
      ],
    },

    {
      title: L('있어요?', 'Bormi?', 'Have you got ...?', 'У вас есть ...?'),
      description: L(
        'Have ... got?과 Has ... got?으로 소유를 묻고 have, haven’t, has, hasn’t로 짧게 대답해요.',
        'Have ... got? va Has ... got? bilan savol berib, have, haven’t, has va hasn’t bilan qisqa javob berasiz.',
        'Ask possession questions with Have ... got? and Has ... got? and use the correct short answers.',
        'Задаём вопросы Have ... got? и Has ... got? и используем правильные краткие ответы.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 2,
      questions: [
        'en_s1u3_n2_021_speaking',
        'en_s1u3_n2_022_fill_in_blank',
        'en_s1u3_n2_023_speaking',
        'en_s1u3_n2_024_dialog_complete',
        'en_s1u3_n2_025_speaking',
        'en_s1u3_n2_026_fill_in_blank',
        'en_s1u3_n2_027_speaking',
        'en_s1u3_n2_028_reply_builder',
        'en_s1u3_n2_029_speaking',
        'en_s1u3_n2_030_fill_in_blank',
        'en_s1u3_n2_031_speaking',
        'en_s1u3_n2_032_dialog_complete',
        'en_s1u3_n2_033_speaking',
        'en_s1u3_n2_034_reply_builder',
        'en_s1u3_n2_035_speaking',
        'en_s1u3_n2_036_fill_in_blank',
        'en_s1u3_n2_037_speaking',
        'en_s1u3_n2_038_speaking',
        'en_s1u3_n2_039_audio_match',
        'en_s1u3_n2_040_sentence_builder',
      ],
    },

    {
      title: L(
        '반대말로 묘사하기',
        'Qarama-qarshi sifatlar',
        'Opposite adjectives',
        'Противоположные прилагательные',
      ),
      description: L(
        'old/new, happy/sad, good/bad, big/small, old/young, rich/poor, expensive/cheap, cold/hot을 쌍으로 익혀요.',
        'old/new, happy/sad, good/bad, big/small, old/young, rich/poor, expensive/cheap va cold/hot juftliklarini o‘rganasiz.',
        'Learn the adjective pairs old/new, happy/sad, good/bad, big/small, old/young, rich/poor, expensive/cheap and cold/hot.',
        'Изучаем пары old/new, happy/sad, good/bad, big/small, old/young, rich/poor, expensive/cheap и cold/hot.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 3,
      questions: [
        'en_s1u3_n2_041_speaking',
        'en_s1u3_n2_042_word_matching',
        'en_s1u3_n2_043_speaking',
        'en_s1u3_n2_044_fill_in_blank',
        'en_s1u3_n2_045_speaking',
        'en_s1u3_n2_046_fill_in_blank',
        'en_s1u3_n2_047_speaking',
        'en_s1u3_n2_048_fill_in_blank',
        'en_s1u3_n2_049_speaking',
        'en_s1u3_n2_050_fill_in_blank',
        'en_s1u3_n2_051_speaking',
        'en_s1u3_n2_052_translate_builder',
        'en_s1u3_n2_053_speaking',
        'en_s1u3_n2_054_fill_in_blank',
        'en_s1u3_n2_055_speaking',
        'en_s1u3_n2_056_audio_match',
        'en_s1u3_n2_057_translate_builder',
        'en_s1u3_n2_058_speaking',
        'en_s1u3_n2_059_reply_builder',
        'en_s1u3_n2_060_dialog_complete',
      ],
    },

    {
      title: L(
        '내 물건 이야기하기',
        'Buyumlarim haqida gapirish',
        'Talking about possessions',
        'Говорим о своих вещах',
      ),
      description: L(
        '가지고 있는 것과 없는 것을 묻고 답하며 형용사를 붙여 물건의 특징까지 설명해요.',
        'Nima bor va nima yo‘qligini so‘rab-javob berasiz va sifatlar bilan buyumlarni tasvirlaysiz.',
        'Ask and answer about possessions and add adjectives to describe the things people have.',
        'Спрашиваем о вещах и описываем их с помощью прилагательных.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 4,
      questions: [
        'en_s1u3_n2_061_speaking',
        'en_s1u3_n2_062_reply_builder',
        'en_s1u3_n2_063_speaking',
        'en_s1u3_n2_064_fill_in_blank',
        'en_s1u3_n2_065_speaking',
        'en_s1u3_n2_066_dialog_complete',
        'en_s1u3_n2_067_speaking',
        'en_s1u3_n2_068_reply_builder',
        'en_s1u3_n2_069_speaking',
        'en_s1u3_n2_070_fill_in_blank',
        'en_s1u3_n2_071_speaking',
        'en_s1u3_n2_072_reply_builder',
        'en_s1u3_n2_073_speaking',
        'en_s1u3_n2_074_word_arrange',
        'en_s1u3_n2_075_speaking',
        'en_s1u3_n2_076_dialog_complete',
        'en_s1u3_n2_077_speaking',
        'en_s1u3_n2_078_translate_builder',
        'en_s1u3_n2_079_speaking',
        'en_s1u3_n2_080_audio_match',
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Section 1 · Unit 3 · Node 3
// 3.3 Family
//
// Coverage
// - family vocabulary:
//   grandfather / grandmother
//   father / mother / parents
//   son / daughter / children
//   brother / sister
//   husband / wife
//   grandparents
// - married
// - possessive determiners:
//   my / your / his / her / its / our / their
// - possessive 's:
//   Mina's brother
//   Mina and Leo's daughter
// - talking about family:
//   age / job / married
//   brothers and sisters
// - listening skill:
//   final 's = is / has / possession
//
// 4 lessons × 20 questions = 80
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT3_NODE3_WORDS = [
  {
    code: 'en-family-family',
    english: 'family',
    senseKey: 'related-people',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '가족',
      'oila',
      'a group of people who are related to each other',
      'семья',
    ),
    examples: [
      {
        english: 'This is my family.',
        translations: L(
          '이쪽은 제 가족이에요.',
          'Bu mening oilam.',
          'This is my family.',
          'Это моя семья.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈfæməli/',
      ttsText: 'family',
    },
    media: {
      emoji: '👨‍👩‍👧‍👦',
      imageUrl: '',
      imageAlt: L(
        '함께 있는 가족',
        'birga turgan oila',
        'a family together',
        'семья вместе',
      ),
    },
    tags: ['family'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-family-grandfather',
    english: 'grandfather',
    senseKey: 'male-grandparent',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '할아버지; 외할아버지',
      'bobo',
      'the father of your mother or father',
      'дедушка',
    ),
    examples: [
      {
        english: 'My grandfather is seventy.',
        translations: L(
          '제 할아버지는 70살이에요.',
          'Mening bobom yetmish yoshda.',
          'My grandfather is seventy.',
          'Моему дедушке семьдесят.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈɡrænfɑːðə/',
      ttsText: 'grandfather',
    },
    media: {
      emoji: '👴',
      imageUrl: '',
      imageAlt: L('할아버지', 'bobo', 'a grandfather', 'дедушка'),
    },
    tags: ['family'],
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
      'the mother of your mother or father',
      'бабушка',
    ),
    examples: [
      {
        english: 'Her grandmother is a teacher.',
        translations: L(
          '그녀의 할머니는 선생님이에요.',
          'Uning buvisi o‘qituvchi.',
          'Her grandmother is a teacher.',
          'Её бабушка — учитель.',
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
    tags: ['family'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-family-grandparent',
    english: 'grandparent',
    senseKey: 'parent-of-parent',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '조부모 중 한 명',
      'bobo yoki buvi',
      'a grandfather or grandmother',
      'дедушка или бабушка',
    ),
    examples: [
      {
        english: 'My grandparents are from Turkey.',
        translations: L(
          '제 조부모님은 튀르키예 출신이에요.',
          'Mening bobo-buvim Turkiyadan.',
          'My grandparents are from Turkey.',
          'Мои бабушка и дедушка из Турции.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈɡrænpeərənt/',
      ttsText: 'grandparent',
    },
    media: {
      emoji: '👴👵',
      imageUrl: '',
      imageAlt: L(
        '조부모',
        'bobo va buvi',
        'grandparents',
        'бабушка и дедушка',
      ),
    },
    tags: ['family'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-family-father',
    english: 'father',
    senseKey: 'male-parent',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('아버지', 'ota', 'a male parent', 'отец'),
    examples: [
      {
        english: 'His father is an engineer.',
        translations: L(
          '그의 아버지는 엔지니어예요.',
          'Uning otasi muhandis.',
          'His father is an engineer.',
          'Его отец — инженер.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈfɑːðə/',
      ttsText: 'father',
    },
    media: {
      emoji: '👨',
      imageUrl: '',
      imageAlt: L('아버지', 'ota', 'a father', 'отец'),
    },
    tags: ['family'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-family-mother',
    english: 'mother',
    senseKey: 'female-parent',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('어머니', 'ona', 'a female parent', 'мать'),
    examples: [
      {
        english: 'My mother is a nurse.',
        translations: L(
          '제 어머니는 간호사예요.',
          'Mening onam hamshira.',
          'My mother is a nurse.',
          'Моя мама — медсестра.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈmʌðə/',
      ttsText: 'mother',
    },
    media: {
      emoji: '👩',
      imageUrl: '',
      imageAlt: L('어머니', 'ona', 'a mother', 'мать'),
    },
    tags: ['family'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-family-parent',
    english: 'parent',
    senseKey: 'mother-or-father',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '부모 중 한 명',
      'ota yoki ona',
      'a mother or father',
      'родитель',
    ),
    examples: [
      {
        english: 'My parents are at home.',
        translations: L(
          '제 부모님은 집에 있어요.',
          'Ota-onam uyda.',
          'My parents are at home.',
          'Мои родители дома.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈpeərənt/',
      ttsText: 'parent',
    },
    media: {
      emoji: '👨‍👩‍👧',
      imageUrl: '',
      imageAlt: L('부모', 'ota-ona', 'parents', 'родители'),
    },
    tags: ['family'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-family-son',
    english: 'son',
    senseKey: 'male-child',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('아들', 'o‘g‘il', 'a male child', 'сын'),
    examples: [
      {
        english: 'Their son is seven.',
        translations: L(
          '그들의 아들은 7살이에요.',
          'Ularning o‘g‘li yetti yoshda.',
          'Their son is seven.',
          'Их сыну семь лет.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/sʌn/',
      ttsText: 'son',
    },
    media: {
      emoji: '👦',
      imageUrl: '',
      imageAlt: L('아들', 'o‘g‘il', 'a son', 'сын'),
    },
    tags: ['family'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-family-daughter',
    english: 'daughter',
    senseKey: 'female-child',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('딸', 'qiz', 'a female child', 'дочь'),
    examples: [
      {
        english: 'Their daughter is ten.',
        translations: L(
          '그들의 딸은 10살이에요.',
          'Ularning qizi o‘n yoshda.',
          'Their daughter is ten.',
          'Их дочери десять лет.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈdɔːtə/',
      ttsText: 'daughter',
    },
    media: {
      emoji: '👧',
      imageUrl: '',
      imageAlt: L('딸', 'qiz', 'a daughter', 'дочь'),
    },
    tags: ['family'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-family-brother',
    english: 'brother',
    senseKey: 'male-sibling',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('형; 오빠; 남동생', 'aka; uka', 'a male sibling', 'брат'),
    examples: [
      {
        english: 'I’ve got one brother.',
        translations: L(
          '저는 형제가 한 명 있어요.',
          'Mening bitta akam yoki ukam bor.',
          'I’ve got one brother.',
          'У меня один брат.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈbrʌðə/',
      ttsText: 'brother',
    },
    media: {
      emoji: '👦',
      imageUrl: '',
      imageAlt: L('남자 형제', 'aka yoki uka', 'a brother', 'брат'),
    },
    tags: ['family'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-family-sister',
    english: 'sister',
    senseKey: 'female-sibling',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '누나; 언니; 여동생',
      'opa; singil',
      'a female sibling',
      'сестра',
    ),
    examples: [
      {
        english: 'My sister is married.',
        translations: L(
          '제 여자 형제는 결혼했어요.',
          'Mening opam yoki singlim turmush qurgan.',
          'My sister is married.',
          'Моя сестра замужем.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈsɪstə/',
      ttsText: 'sister',
    },
    media: {
      emoji: '👧',
      imageUrl: '',
      imageAlt: L('여자 형제', 'opa yoki singil', 'a sister', 'сестра'),
    },
    tags: ['family'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-family-husband',
    english: 'husband',
    senseKey: 'married-man',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('남편', 'er', 'a married man in relation to his wife', 'муж'),
    examples: [
      {
        english: 'Her husband is a doctor.',
        translations: L(
          '그녀의 남편은 의사예요.',
          'Uning eri shifokor.',
          'Her husband is a doctor.',
          'Её муж — врач.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈhʌzbənd/',
      ttsText: 'husband',
    },
    media: {
      emoji: '👨',
      imageUrl: '',
      imageAlt: L('남편', 'er', 'a husband', 'муж'),
    },
    tags: ['family', 'marriage'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-family-wife',
    english: 'wife',
    senseKey: 'married-woman',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '아내',
      'xotin; rafiqa',
      'a married woman in relation to her husband',
      'жена',
    ),
    examples: [
      {
        english: 'His wife is an engineer.',
        translations: L(
          '그의 아내는 엔지니어예요.',
          'Uning rafiqasi muhandis.',
          'His wife is an engineer.',
          'Его жена — инженер.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/waɪf/',
      ttsText: 'wife',
    },
    media: {
      emoji: '👩',
      imageUrl: '',
      imageAlt: L('아내', 'rafiqa', 'a wife', 'жена'),
    },
    tags: ['family', 'marriage'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-family-married',
    english: 'married',
    senseKey: 'having-spouse',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '결혼한',
      'turmush qurgan',
      'having a husband or wife',
      'женатый; замужняя',
    ),
    examples: [
      {
        english: 'Is your brother married?',
        translations: L(
          '형제는 결혼했어요?',
          'Akangiz yoki ukangiz turmush qurganmi?',
          'Is your brother married?',
          'Ваш брат женат?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈmærid/',
      ttsText: 'married',
    },
    media: {
      emoji: '💍',
      imageUrl: '',
      imageAlt: L(
        '결혼한 두 사람',
        'turmush qurgan juftlik',
        'a married couple',
        'супружеская пара',
      ),
    },
    tags: ['family', 'marriage'],
    difficulty: 1,
    isCore: true,
  },
];

export const EN_S1_UNIT3_NODE3_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Family members
  // ===========================================================

  en_s1u3_n3_001_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'This is my family.',
    audioText: 'This is my family.',
    answerTranslation: L(
      '이쪽은 제 가족이에요.',
      'Bu mening oilam.',
      'This is my family.',
      'Это моя семья.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['family'],
  },

  en_s1u3_n3_002_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      { korean: 'father', native: 'ota' },
      { korean: 'mother', native: 'ona' },
      { korean: 'brother', native: 'aka / uka' },
      { korean: 'sister', native: 'opa / singil' },
      { korean: 'parents', native: 'ota-ona' },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['family', 'matching'],
  },

  en_s1u3_n3_003_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Father and mother. Parents.',
    audioText: 'Father and mother. Parents.',
    answerTranslation: L(
      '아버지와 어머니. 부모님.',
      'Ota va ona. Ota-ona.',
      'Father and mother. Parents.',
      'Отец и мать. Родители.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['family', 'parents'],
  },

  en_s1u3_n3_004_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'My father and mother are my ___.',
    blankAnswers: ['parents'],
    options: ['parents', 'children', 'grandparents', 'neighbours'],
    answer: 'parents',
    answerTranslation: L(
      '아버지와 어머니는 제 부모님이에요.',
      'Otam va onam mening ota-onam.',
      'My father and mother are my parents.',
      'Мои отец и мать — мои родители.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['family', 'parents'],
  },

  en_s1u3_n3_005_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Brother and sister.',
    audioText: 'Brother and sister.',
    answerTranslation: L(
      '남자 형제와 여자 형제.',
      'Aka yoki uka va opa yoki singil.',
      'Brother and sister.',
      'Брат и сестра.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['family', 'siblings'],
  },

  en_s1u3_n3_006_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Maya is Leo’s ___. They have the same parents.',
    blankAnswers: ['sister'],
    options: ['sister', 'mother', 'wife', 'daughter'],
    answer: 'sister',
    answerTranslation: L(
      'Maya는 Leo의 여자 형제예요.',
      'Maya Leoning opa yoki singlisi.',
      'Maya is Leo’s sister.',
      'Майя — сестра Лео.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['family', 'sister'],
  },

  en_s1u3_n3_007_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Son and daughter. Children.',
    audioText: 'Son and daughter. Children.',
    answerTranslation: L(
      '아들과 딸. 자녀들.',
      'O‘g‘il va qiz. Farzandlar.',
      'Son and daughter. Children.',
      'Сын и дочь. Дети.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['family', 'children'],
  },

  en_s1u3_n3_008_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'They’ve got one son and one ___.',
    blankAnswers: ['daughter'],
    options: ['daughter', 'mother', 'wife', 'grandmother'],
    answer: 'daughter',
    answerTranslation: L(
      '그들에게는 아들 한 명과 딸 한 명이 있어요.',
      'Ularning bir o‘g‘li va bir qizi bor.',
      'They’ve got one son and one daughter.',
      'У них есть сын и дочь.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['family', 'daughter'],
  },

  en_s1u3_n3_009_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Grandfather and grandmother. Grandparents.',
    audioText: 'Grandfather and grandmother. Grandparents.',
    answerTranslation: L(
      '할아버지와 할머니. 조부모님.',
      'Bobo va buvi. Bobo-buvi.',
      'Grandfather and grandmother. Grandparents.',
      'Дедушка и бабушка. Бабушка и дедушка.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['family', 'grandparents'],
  },

  en_s1u3_n3_010_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'My mother’s parents are my ___.',
    blankAnswers: ['grandparents'],
    options: ['grandparents', 'parents', 'children', 'friends'],
    answer: 'grandparents',
    answerTranslation: L(
      '어머니의 부모님은 제 조부모님이에요.',
      'Onamning ota-onasi mening bobo-buvim.',
      'My mother’s parents are my grandparents.',
      'Родители моей мамы — мои бабушка и дедушка.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['family', 'grandparents'],
  },

  en_s1u3_n3_011_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Husband and wife.',
    audioText: 'Husband and wife.',
    answerTranslation: L(
      '남편과 아내.',
      'Er va xotin.',
      'Husband and wife.',
      'Муж и жена.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['family', 'marriage'],
  },

  en_s1u3_n3_012_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Who’s Omar?' },
      { speaker: 'user', text: 'He’s Lina’s husband.' },
      { speaker: 'npc', text: 'And who’s Lina?' },
    ],
    options: [
      'She’s Omar’s wife.',
      'She’s Omar’s son.',
      'He’s Omar’s sister.',
      'They’re Omar’s parents.',
    ],
    answer: 'She’s Omar’s wife.',
    answerTranslation: L(
      '그녀는 Omar의 아내예요.',
      'U Omarning rafiqasi.',
      'She’s Omar’s wife.',
      'Она жена Омара.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['family', 'husband', 'wife'],
  },

  en_s1u3_n3_013_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'My sister is married.',
    audioText: 'My sister is married.',
    answerTranslation: L(
      '제 여자 형제는 결혼했어요.',
      'Mening opam yoki singlim turmush qurgan.',
      'My sister is married.',
      'Моя сестра замужем.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['family', 'married'],
  },

  en_s1u3_n3_014_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Is your brother ___?',
    blankAnswers: ['married'],
    options: ['married', 'daughter', 'parents', 'family'],
    answer: 'married',
    answerTranslation: L(
      '형제는 결혼했어요?',
      'Akangiz yoki ukangiz turmush qurganmi?',
      'Is your brother married?',
      'Ваш брат женат?',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['family', 'married'],
  },

  en_s1u3_n3_015_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      { korean: 'grandfather', native: 'bobo' },
      { korean: 'grandmother', native: 'buvi' },
      { korean: 'son', native: 'o‘g‘il' },
      { korean: 'daughter', native: 'qiz' },
      { korean: 'wife', native: 'rafiqa' },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['family', 'listening'],
  },

  en_s1u3_n3_016_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'My grandparents are old.',
    audioText: 'My grandparents are old.',
    answerTranslation: L(
      '제 조부모님은 연세가 많아요.',
      'Mening bobo-buvim keksa.',
      'My grandparents are old.',
      'Мои бабушка и дедушка пожилые.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['family', 'grandparents'],
  },

  en_s1u3_n3_017_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Who’s Hana?',
    options: ['She’s', 'my', 'sister', 'brother', 'father', 'They’re'],
    answer: 'She’s my sister',
    answerTranslation: L(
      '제 여자 형제예요.',
      'U mening opam yoki singlim.',
      'She’s my sister.',
      'Она моя сестра.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['family', 'sister', 'reply-builder'],
  },

  en_s1u3_n3_018_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['They’re', 'my', 'parents', 'children', 'husband', 'is'],
    answer: 'They’re my parents',
    answerTranslation: L(
      '그분들은 제 부모님이에요.',
      'Ular mening ota-onam.',
      'They’re my parents.',
      'Они мои родители.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['family', 'parents'],
  },

  en_s1u3_n3_019_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'My brother is twenty-six. He’s an engineer.',
    audioText: 'My brother is twenty-six. He’s an engineer.',
    answerTranslation: L(
      '제 형제는 26살이고 엔지니어예요.',
      'Akam yoki ukam yigirma olti yoshda. U muhandis.',
      'My brother is twenty-six. He’s an engineer.',
      'Моему брату двадцать шесть. Он инженер.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['family', 'age', 'job'],
  },

  en_s1u3_n3_020_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Tell me about your family.' },
      { speaker: 'user', text: 'I’ve got one brother and one sister.' },
      { speaker: 'npc', text: 'Is your sister married?' },
    ],
    options: [
      'Yes, she is.',
      'Yes, he has.',
      'Yes, they are my parents.',
      'Yes, it is.',
    ],
    answer: 'Yes, she is.',
    answerTranslation: L(
      '네, 결혼했어요.',
      'Ha, turmush qurgan.',
      'Yes, she is.',
      'Да.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['family', 'married', 'dialog'],
  },

  // ===========================================================
  // Lesson 2 · Possessive determiners
  // my / your / his / her / its / our / their
  // ===========================================================

  en_s1u3_n3_021_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'My name’s Daniel.',
    audioText: 'My name’s Daniel.',
    answerTranslation: L(
      '제 이름은 Daniel이에요.',
      'Mening ismim Daniel.',
      'My name’s Daniel.',
      'Меня зовут Даниэль.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['possessive-determiners', 'my'],
  },

  en_s1u3_n3_022_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I’m Sofia. ___ brother is a doctor.',
    blankAnswers: ['My'],
    options: ['My', 'Your', 'His', 'Their'],
    answer: 'My',
    answerTranslation: L(
      '저는 Sofia예요. 제 형제는 의사예요.',
      'Men Sofiaman. Mening akam yoki ukam shifokor.',
      'I’m Sofia. My brother is a doctor.',
      'Я София. Мой брат врач.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['possessive-determiners', 'my'],
  },

  en_s1u3_n3_023_speaking: {
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
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['possessive-determiners', 'your'],
  },

  en_s1u3_n3_024_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'You’re from Turkey. ___ name’s Emir.',
    blankAnswers: ['Your'],
    options: ['Your', 'My', 'His', 'Our'],
    answer: 'Your',
    answerTranslation: L(
      '당신은 튀르키예 출신이고 이름은 Emir예요.',
      'Siz Turkiyadansiz. Ismingiz Emir.',
      'You’re from Turkey. Your name’s Emir.',
      'Вы из Турции. Вас зовут Эмир.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['possessive-determiners', 'your'],
  },

  en_s1u3_n3_025_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'His wife is a teacher.',
    audioText: 'His wife is a teacher.',
    answerTranslation: L(
      '그의 아내는 선생님이에요.',
      'Uning rafiqasi o‘qituvchi.',
      'His wife is a teacher.',
      'Его жена — учитель.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['possessive-determiners', 'his'],
  },

  en_s1u3_n3_026_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Omar is a doctor. ___ wife is a teacher.',
    blankAnswers: ['His'],
    options: ['His', 'Her', 'Their', 'Our'],
    answer: 'His',
    answerTranslation: L(
      'Omar는 의사예요. 그의 아내는 선생님이에요.',
      'Omar shifokor. Uning rafiqasi o‘qituvchi.',
      'Omar is a doctor. His wife is a teacher.',
      'Омар врач. Его жена — учитель.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['possessive-determiners', 'his'],
  },

  en_s1u3_n3_027_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Her husband is an engineer.',
    audioText: 'Her husband is an engineer.',
    answerTranslation: L(
      '그녀의 남편은 엔지니어예요.',
      'Uning eri muhandis.',
      'Her husband is an engineer.',
      'Её муж — инженер.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['possessive-determiners', 'her'],
  },

  en_s1u3_n3_028_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Lina is a nurse. ___ husband is an engineer.',
    blankAnswers: ['Her'],
    options: ['Her', 'His', 'My', 'Its'],
    answer: 'Her',
    answerTranslation: L(
      'Lina는 간호사예요. 그녀의 남편은 엔지니어예요.',
      'Lina hamshira. Uning eri muhandis.',
      'Lina is a nurse. Her husband is an engineer.',
      'Лина медсестра. Её муж инженер.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['possessive-determiners', 'her'],
  },

  en_s1u3_n3_029_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Its name is Max.',
    audioText: 'Its name is Max.',
    answerTranslation: L(
      '그것의 이름은 Max예요.',
      'Uning nomi Max.',
      'Its name is Max.',
      'Его зовут Макс.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['possessive-determiners', 'its'],
  },

  en_s1u3_n3_030_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The dog is friendly. ___ name is Max.',
    blankAnswers: ['Its'],
    options: ['Its', 'His', 'Their', 'Our'],
    answer: 'Its',
    answerTranslation: L(
      '그 개는 친근해요. 이름은 Max예요.',
      'It do‘stona. Uning nomi Max.',
      'The dog is friendly. Its name is Max.',
      'Собака дружелюбная. Её зовут Макс.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['possessive-determiners', 'its'],
  },

  en_s1u3_n3_031_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Our parents are from Canada.',
    audioText: 'Our parents are from Canada.',
    answerTranslation: L(
      '우리 부모님은 캐나다 출신이에요.',
      'Bizning ota-onamiz Kanadadan.',
      'Our parents are from Canada.',
      'Наши родители из Канады.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['possessive-determiners', 'our'],
  },

  en_s1u3_n3_032_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Aziza and I are sisters. ___ parents live in Kenya.',
    blankAnswers: ['Our'],
    options: ['Our', 'Their', 'Her', 'Your'],
    answer: 'Our',
    answerTranslation: L(
      'Aziza와 저는 자매예요. 우리 부모님은 케냐에 살아요.',
      'Aziza va men opa-singilmiz. Bizning ota-onamiz Keniyada yashaydi.',
      'Aziza and I are sisters. Our parents live in Kenya.',
      'Мы с Азизой сёстры. Наши родители живут в Кении.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['possessive-determiners', 'our'],
  },

  en_s1u3_n3_033_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Their daughter is ten.',
    audioText: 'Their daughter is ten.',
    answerTranslation: L(
      '그들의 딸은 10살이에요.',
      'Ularning qizi o‘n yoshda.',
      'Their daughter is ten.',
      'Их дочери десять лет.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['possessive-determiners', 'their'],
  },

  en_s1u3_n3_034_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Sam and Mia are married. ___ son is five.',
    blankAnswers: ['Their'],
    options: ['Their', 'Our', 'His', 'Its'],
    answer: 'Their',
    answerTranslation: L(
      'Sam과 Mia는 결혼했어요. 그들의 아들은 5살이에요.',
      'Sam va Mia turmush qurgan. Ularning o‘g‘li besh yoshda.',
      'Sam and Mia are married. Their son is five.',
      'Сэм и Миа женаты. Их сыну пять лет.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['possessive-determiners', 'their'],
  },

  en_s1u3_n3_035_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      { korean: 'I → my', native: 'men → mening' },
      { korean: 'you → your', native: 'siz → sizning' },
      { korean: 'he → his', native: 'u → uning' },
      { korean: 'she → her', native: 'u → uning' },
      { korean: 'we → our', native: 'biz → bizning' },
    ],
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['possessive-determiners', 'matching'],
  },

  en_s1u3_n3_036_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      { korean: 'my brother', native: 'mening akam / ukam' },
      { korean: 'your sister', native: 'sizning opangiz / singlingiz' },
      { korean: 'his wife', native: 'uning rafiqasi' },
      { korean: 'our parents', native: 'bizning ota-onamiz' },
      { korean: 'their son', native: 'ularning o‘g‘li' },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['possessive-determiners', 'listening'],
  },

  en_s1u3_n3_037_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['Their', 'daughter', 'is', 'a', 'student', 'Our', 'His'],
    answer: 'Their daughter is a student',
    answerTranslation: L(
      '그들의 딸은 학생이에요.',
      'Ularning qizi talaba.',
      'Their daughter is a student.',
      'Их дочь — студентка.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['possessive-determiners', 'their'],
  },

  en_s1u3_n3_038_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'My brother is a teacher and his wife is a doctor.',
    audioText: 'My brother is a teacher and his wife is a doctor.',
    answerTranslation: L(
      '제 형제는 선생님이고 그의 아내는 의사예요.',
      'Akam yoki ukam o‘qituvchi, uning rafiqasi esa shifokor.',
      'My brother is a teacher and his wife is a doctor.',
      'Мой брат учитель, а его жена врач.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['possessive-determiners', 'family'],
  },

  en_s1u3_n3_039_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Their son is seven.',
    audioText: 'Their son is seven.',
    answerI18n: L(
      '그들의 아들은 일곱 살이에요',
      'Ularning o‘g‘li yetti yoshda',
      'Their son is seven',
      'Их сыну семь лет',
    ),
    options: ['Their', 'son', 'is', 'seven', 'Our', 'daughter'],
    optionsI18n: {
      ko: ['그들의', '아들은', '일곱', '살이에요', '우리의', '딸은'],
      uz: ['Ularning', 'o‘g‘li', 'yetti', 'yoshda', 'Bizning', 'qizi'],
      en: ['Their', 'son', 'is', 'seven', 'Our', 'daughter'],
      ru: ['Их', 'сыну', 'семь', 'лет', 'Наш', 'дочь'],
    },
    answerTranslation: L(
      '그들의 아들은 7살이에요.',
      'Ularning o‘g‘li yetti yoshda.',
      'Their son is seven.',
      'Их сыну семь лет.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['possessive-determiners', 'sentence-builder'],
  },

  en_s1u3_n3_040_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Who are Ana and Pavel?' },
      { speaker: 'user', text: 'They’re my neighbours.' },
      { speaker: 'npc', text: 'Have they got children?' },
    ],
    options: [
      'Yes. Their son is nine.',
      'Yes. Our son is nine.',
      'Yes. His son are nine.',
      'Yes. Its son is nine.',
    ],
    answer: 'Yes. Their son is nine.',
    answerTranslation: L(
      '네. 그들의 아들은 9살이에요.',
      'Ha. Ularning o‘g‘li to‘qqiz yoshda.',
      'Yes. Their son is nine.',
      'Да. Их сыну девять лет.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['possessive-determiners', 'their', 'dialog'],
  },

  // ===========================================================
  // Lesson 3 · Possessive 's
  // ===========================================================

  en_s1u3_n3_041_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Sofia’s brother is a doctor.',
    audioText: 'Sofia’s brother is a doctor.',
    answerTranslation: L(
      'Sofia의 형제는 의사예요.',
      'Sofianing akasi yoki ukasi shifokor.',
      'Sofia’s brother is a doctor.',
      'Брат Софии — врач.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['possessive-s', 'family'],
  },

  en_s1u3_n3_042_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '소유를 나타내는 형태를 완성하세요.',
      'Egalik shaklini to‘ldiring.',
      'Complete the possessive form.',
      'Дополните притяжательную форму.',
    ),
    sentenceTemplate: 'Sofia___ brother',
    blankAnswers: ['’s'],
    options: ['’s', 's’', '’re', '’ve'],
    answer: '’s',
    answerTranslation: L(
      'Sofia의 형제',
      'Sofianing akasi yoki ukasi',
      'Sofia’s brother',
      'брат Софии',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['possessive-s'],
  },

  en_s1u3_n3_043_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Mila’s mother is a nurse.',
    audioText: 'Mila’s mother is a nurse.',
    answerTranslation: L(
      'Mila의 어머니는 간호사예요.',
      'Milaning onasi hamshira.',
      'Mila’s mother is a nurse.',
      'Мама Милы — медсестра.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['possessive-s', 'mother'],
  },

  en_s1u3_n3_044_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Omar___ wife is an engineer.',
    blankAnswers: ['’s'],
    options: ['’s', '’re', '’ve', 's'],
    answer: '’s',
    answerTranslation: L(
      'Omar의 아내는 엔지니어예요.',
      'Omarning rafiqasi muhandis.',
      'Omar’s wife is an engineer.',
      'Жена Омара — инженер.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['possessive-s', 'wife'],
  },

  en_s1u3_n3_045_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Maya and Leo’s daughter is six.',
    audioText: 'Maya and Leo’s daughter is six.',
    answerTranslation: L(
      'Maya와 Leo의 딸은 6살이에요.',
      'Maya va Leoning qizi olti yoshda.',
      'Maya and Leo’s daughter is six.',
      'Дочери Майи и Лео шесть лет.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['possessive-s', 'shared-possession'],
  },

  en_s1u3_n3_046_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '두 사람이 함께 가진 것을 나타내도록 완성하세요.',
      'Ikki kishiga birgalikda tegishli narsani ko‘rsatuvchi shaklni to‘ldiring.',
      'Complete the shared possessive form.',
      'Дополните форму совместного владения.',
    ),
    sentenceTemplate: 'Maya and Leo___ daughter is six.',
    blankAnswers: ['’s'],
    options: ['’s', '’ve', '’re', 's'],
    answer: '’s',
    answerTranslation: L(
      'Maya와 Leo의 딸은 6살이에요.',
      'Maya va Leoning qizi olti yoshda.',
      'Maya and Leo’s daughter is six.',
      'Дочери Майи и Лео шесть лет.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['possessive-s', 'shared-possession'],
  },

  en_s1u3_n3_047_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'My husband’s name is Karim.',
    audioText: 'My husband’s name is Karim.',
    answerTranslation: L(
      '제 남편의 이름은 Karim이에요.',
      'Erimning ismi Karim.',
      'My husband’s name is Karim.',
      'Моего мужа зовут Карим.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['possessive-s', 'husband'],
  },

  en_s1u3_n3_048_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'My husband___ name is Karim.',
    blankAnswers: ['’s'],
    options: ['’s', '’re', 's’', '’ve'],
    answer: '’s',
    answerTranslation: L(
      '제 남편의 이름은 Karim이에요.',
      'Erimning ismi Karim.',
      'My husband’s name is Karim.',
      'Моего мужа зовут Карим.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['possessive-s'],
  },

  en_s1u3_n3_049_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'This is Nora and Sam’s son.',
    audioText: 'This is Nora and Sam’s son.',
    answerTranslation: L(
      '이 아이는 Nora와 Sam의 아들이에요.',
      'Bu Nora va Samning o‘g‘li.',
      'This is Nora and Sam’s son.',
      'Это сын Норы и Сэма.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['possessive-s', 'shared-possession'],
  },

  en_s1u3_n3_050_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['This', 'is', 'Nora', 'and', 'Sam’s', 'son', 'sons'],
    answer: 'This is Nora and Sam’s son',
    answerTranslation: L(
      '이 아이는 Nora와 Sam의 아들이에요.',
      'Bu Nora va Samning o‘g‘li.',
      'This is Nora and Sam’s son.',
      'Это сын Норы и Сэма.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['possessive-s', 'shared-possession'],
  },

  en_s1u3_n3_051_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['mother', 'is', 'Mia’s', 'a', 'teacher', 'daughter', 'are'],
    answer: 'Mia’s mother is a teacher',
    audioText: 'Mia’s mother is a teacher.',
    answerTranslation: L(
      'Mia의 어머니는 선생님이에요.',
      'Mianing onasi o‘qituvchi.',
      'Mia’s mother is a teacher.',
      'Мама Мии — учитель.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['possessive-s', 'word-arrange'],
  },

  en_s1u3_n3_052_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Leo’s parents are in Italy.',
    audioText: 'Leo’s parents are in Italy.',
    answerTranslation: L(
      'Leo의 부모님은 이탈리아에 있어요.',
      'Leoning ota-onasi Italiyada.',
      'Leo’s parents are in Italy.',
      'Родители Лео находятся в Италии.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['possessive-s', 'parents'],
  },

  en_s1u3_n3_053_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'My friend___ job is difficult.',
    blankAnswers: ['’s'],
    options: ['’s', '’re', 's', '’ve'],
    answer: '’s',
    answerTranslation: L(
      '제 친구의 일은 어려워요.',
      'Do‘stimning ishi qiyin.',
      'My friend’s job is difficult.',
      'Работа моего друга трудная.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['possessive-s'],
  },

  en_s1u3_n3_054_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'My brother’s wife is very friendly.',
    audioText: 'My brother’s wife is very friendly.',
    answerTranslation: L(
      '제 형제의 아내는 아주 친절해요.',
      'Akam yoki ukamning rafiqasi juda mehribon.',
      'My brother’s wife is very friendly.',
      'Жена моего брата очень дружелюбная.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['possessive-s', 'family'],
  },

  en_s1u3_n3_055_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Who’s Elena?',
    options: ['She’s', 'Marco’s', 'sister', 'brother', 'His', 'daughter'],
    answer: 'She’s Marco’s sister',
    answerTranslation: L(
      '그녀는 Marco의 여자 형제예요.',
      'U Marconing opa yoki singlisi.',
      'She’s Marco’s sister.',
      'Она сестра Марко.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['possessive-s', 'reply-builder'],
  },

  en_s1u3_n3_056_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Elena is Marco___ sister.',
    blankAnswers: ['’s'],
    options: ['’s', '’re', 's’', '’ve'],
    answer: '’s',
    answerTranslation: L(
      'Elena는 Marco의 여자 형제예요.',
      'Elena Marconing opa yoki singlisi.',
      'Elena is Marco’s sister.',
      'Елена — сестра Марко.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['possessive-s'],
  },

  en_s1u3_n3_057_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Dina’s car is new.',
    audioText: 'Dina’s car is new.',
    answerTranslation: L(
      'Dina의 자동차는 새것이에요.',
      'Dinaning mashinasi yangi.',
      'Dina’s car is new.',
      'Машина Дины новая.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['possessive-s', 'possession'],
  },

  en_s1u3_n3_058_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'My sister’s husband is a doctor.',
    audioText: 'My sister’s husband is a doctor.',
    answerI18n: L(
      '제 여자 형제의 남편은 의사예요',
      'Opam yoki singlimning eri shifokor',
      'My sister’s husband is a doctor',
      'Муж моей сестры — врач',
    ),
    options: ['My', 'sister’s', 'husband', 'is', 'a', 'doctor', 'brother'],
    optionsI18n: {
      ko: ['제', '여자 형제의', '남편은', '의사예요', '남자 형제'],
      uz: ['Opamning', 'eri', 'shifokor', 'akam', 'o‘qituvchi'],
      en: ['My', 'sister’s', 'husband', 'is', 'a', 'doctor', 'brother'],
      ru: ['Муж', 'моей', 'сестры', 'врач', 'брат', 'учитель'],
    },
    answerTranslation: L(
      '제 여자 형제의 남편은 의사예요.',
      'Opam yoki singlimning eri shifokor.',
      'My sister’s husband is a doctor.',
      'Муж моей сестры — врач.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['possessive-s', 'sentence-builder'],
  },

  en_s1u3_n3_059_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Amir and Sara’s children are at school.',
    audioText: 'Amir and Sara’s children are at school.',
    answerTranslation: L(
      'Amir와 Sara의 아이들은 학교에 있어요.',
      'Amir va Saraning bolalari maktabda.',
      'Amir and Sara’s children are at school.',
      'Дети Амира и Сары в школе.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['possessive-s', 'shared-possession'],
  },

  en_s1u3_n3_060_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Who are Amir and Sara?' },
      { speaker: 'user', text: 'They’re my neighbours.' },
      { speaker: 'npc', text: 'And who’s Adam?' },
    ],
    options: [
      'He’s Amir and Sara’s son.',
      'He’s Amir and Sara son.',
      'He’s Amir’s and Sara son.',
      'They’re Amir and Sara’s son.',
    ],
    answer: 'He’s Amir and Sara’s son.',
    answerTranslation: L(
      '그는 Amir와 Sara의 아들이에요.',
      'U Amir va Saraning o‘g‘li.',
      'He’s Amir and Sara’s son.',
      'Он сын Амира и Сары.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['possessive-s', 'shared-possession', 'dialog'],
  },

  // ===========================================================
  // Lesson 4 · Understanding final 's + talking about family
  // ===========================================================

  en_s1u3_n3_061_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Nina’s a nurse.',
    audioText: 'Nina’s a nurse.',
    answerTranslation: L(
      'Nina는 간호사예요.',
      'Nina hamshira.',
      'Nina’s a nurse.',
      'Нина — медсестра.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['final-s', 'is'],
  },

  en_s1u3_n3_062_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      "문장에서 's의 의미를 고르세요.",
      "Gapdagi 's nimani anglatishini tanlang.",
      "Choose the meaning of 's in the sentence.",
      "Выберите значение 's в предложении.",
    ),
    sentenceTemplate: 'Nina’s a nurse. → ’s = ___',
    blankAnswers: ['is'],
    options: ['is', 'has', 'possession', 'are'],
    answer: 'is',
    answerTranslation: L(
      'Nina’s = Nina is',
      'Nina’s = Nina is',
      'Nina’s = Nina is',
      'Nina’s = Nina is',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['final-s', 'is'],
  },

  en_s1u3_n3_063_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Nina’s got two children.',
    audioText: 'Nina’s got two children.',
    answerTranslation: L(
      'Nina에게는 아이가 두 명 있어요.',
      'Ninaning ikki farzandi bor.',
      'Nina’s got two children.',
      'У Нины двое детей.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['final-s', 'has'],
  },

  en_s1u3_n3_064_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      "문장에서 's의 의미를 고르세요.",
      "Gapdagi 's nimani anglatishini tanlang.",
      "Choose the meaning of 's in the sentence.",
      "Выберите значение 's в предложении.",
    ),
    sentenceTemplate: 'Nina’s got two children. → ’s = ___',
    blankAnswers: ['has'],
    options: ['has', 'is', 'possession', 'are'],
    answer: 'has',
    answerTranslation: L(
      'Nina’s got = Nina has got',
      'Nina’s got = Nina has got',
      'Nina’s got = Nina has got',
      'Nina’s got = Nina has got',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['final-s', 'has'],
  },

  en_s1u3_n3_065_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Nina’s husband is a teacher.',
    audioText: 'Nina’s husband is a teacher.',
    answerTranslation: L(
      'Nina의 남편은 선생님이에요.',
      'Ninaning eri o‘qituvchi.',
      'Nina’s husband is a teacher.',
      'Муж Нины — учитель.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['final-s', 'possession'],
  },

  en_s1u3_n3_066_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      "문장에서 's의 의미를 고르세요.",
      "Gapdagi 's nimani anglatishini tanlang.",
      "Choose the meaning of 's in the sentence.",
      "Выберите значение 's в предложении.",
    ),
    sentenceTemplate: 'Nina’s husband is a teacher. → ’s = ___',
    blankAnswers: ['possession'],
    options: ['possession', 'is', 'has', 'are'],
    answer: 'possession',
    answerTranslation: L(
      'Nina’s husband = Nina의 남편',
      'Nina’s husband = Ninaning eri',
      'Nina’s husband = the husband of Nina',
      'Nina’s husband = муж Нины',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['final-s', 'possession'],
  },

  en_s1u3_n3_067_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      { korean: 'Omar’s funny.', native: 'Omar kulgili.' },
      { korean: 'Lena’s a teacher.', native: 'Lena o‘qituvchi.' },
      { korean: 'Max’s got a dog.', native: 'Maxning iti bor.' },
      {
        korean: 'Sara’s brother is a doctor.',
        native: 'Saraning akasi yoki ukasi shifokor.',
      },
      {
        korean: 'Mia’s parents are in Rome.',
        native: 'Mianing ota-onasi Rimda.',
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['final-s', 'listening'],
  },

  en_s1u3_n3_068_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Have you got any brothers and sisters?',
    audioText: 'Have you got any brothers and sisters?',
    answerTranslation: L(
      '남자 형제나 여자 형제가 있어요?',
      'Aka-uka yoki opa-singlingiz bormi?',
      'Have you got any brothers and sisters?',
      'У вас есть братья или сёстры?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['family', 'conversation'],
  },

  en_s1u3_n3_069_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Have you got any brothers and sisters?',
    options: ['Yes', 'I’ve', 'got', 'one', 'brother', 'has', 'daughter'],
    answer: 'Yes I’ve got one brother',
    answerTranslation: L(
      '네, 형제가 한 명 있어요.',
      'Ha, mening bitta akam yoki ukam bor.',
      'Yes, I’ve got one brother.',
      'Да, у меня есть один брат.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['family', 'brother', 'reply-builder'],
  },

  en_s1u3_n3_070_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'What are their names?',
    audioText: 'What are their names?',
    answerTranslation: L(
      '그들의 이름은 뭐예요?',
      'Ularning ismlari nima?',
      'What are their names?',
      'Как их зовут?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['family', 'their'],
  },

  en_s1u3_n3_071_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'What are ___ names?',
    blankAnswers: ['their'],
    options: ['their', 'his', 'its', 'my'],
    answer: 'their',
    answerTranslation: L(
      '그들의 이름은 뭐예요?',
      'Ularning ismlari nima?',
      'What are their names?',
      'Как их зовут?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['family', 'their'],
  },

  en_s1u3_n3_072_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'What are their jobs?',
    audioText: 'What are their jobs?',
    answerTranslation: L(
      '그들의 직업은 뭐예요?',
      'Ularning kasblari nima?',
      'What are their jobs?',
      'Кем они работают?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['family', 'jobs'],
  },

  en_s1u3_n3_073_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Have you got any brothers and sisters?' },
      { speaker: 'user', text: 'Yes. I’ve got two sisters.' },
      { speaker: 'npc', text: 'What are their jobs?' },
    ],
    options: [
      'They’re teachers.',
      'Their teachers.',
      'She’s teachers.',
      'They’ve teachers.',
    ],
    answer: 'They’re teachers.',
    answerTranslation: L(
      '그들은 선생님이에요.',
      'Ular o‘qituvchilar.',
      'They’re teachers.',
      'Они учителя.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['family', 'jobs', 'dialog'],
  },

  en_s1u3_n3_074_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Is your sister married?',
    audioText: 'Is your sister married?',
    answerTranslation: L(
      '여자 형제는 결혼했어요?',
      'Opangiz yoki singlingiz turmush qurganmi?',
      'Is your sister married?',
      'Ваша сестра замужем?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['family', 'married'],
  },

  en_s1u3_n3_075_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'My brother is twenty-eight and he’s ___.',
    blankAnswers: ['married'],
    options: ['married', 'parents', 'daughter', 'family'],
    answer: 'married',
    answerTranslation: L(
      '제 형제는 28살이고 결혼했어요.',
      'Akam yoki ukam yigirma sakkiz yoshda va u turmush qurgan.',
      'My brother is twenty-eight and he’s married.',
      'Моему брату двадцать восемь, и он женат.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['family', 'married'],
  },

  en_s1u3_n3_076_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'My',
      'sister',
      'is',
      'twenty-five',
      'and',
      'she’s',
      'a',
      'nurse',
      'brother',
    ],
    answer: 'My sister is twenty-five and she’s a nurse',
    answerTranslation: L(
      '제 여자 형제는 25살이고 간호사예요.',
      'Opam yoki singlim yigirma besh yoshda va u hamshira.',
      'My sister is twenty-five and she’s a nurse.',
      'Моей сестре двадцать пять, и она медсестра.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['family', 'age', 'job'],
  },

  en_s1u3_n3_077_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'My brother is thirty. He’s an engineer.',
    audioText: 'My brother is thirty. He’s an engineer.',
    answerTranslation: L(
      '제 형제는 30살이고 엔지니어예요.',
      'Akam yoki ukam o‘ttiz yoshda. U muhandis.',
      'My brother is thirty. He’s an engineer.',
      'Моему брату тридцать. Он инженер.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['family', 'age', 'job'],
  },

  en_s1u3_n3_078_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'My parents have got two children.',
    audioText: 'My parents have got two children.',
    answerI18n: L(
      '제 부모님에게는 자녀가 두 명 있어요',
      'Ota-onamning ikki farzandi bor',
      'My parents have got two children',
      'У моих родителей двое детей',
    ),
    options: ['My', 'parents', 'have', 'got', 'two', 'children', 'has'],
    optionsI18n: {
      ko: ['제', '부모님에게는', '자녀가', '두', '명', '있어요'],
      uz: ['Ota-onamning', 'ikki', 'farzandi', 'bor'],
      en: ['My', 'parents', 'have', 'got', 'two', 'children'],
      ru: ['У', 'моих', 'родителей', 'двое', 'детей'],
    },
    answerTranslation: L(
      '제 부모님에게는 자녀가 두 명 있어요.',
      'Ota-onamning ikki farzandi bor.',
      'My parents have got two children.',
      'У моих родителей двое детей.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['family', 'sentence-builder'],
  },

  en_s1u3_n3_079_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I’ve got one brother. His name’s Adam and he’s a teacher.',
    audioText: 'I’ve got one brother. His name’s Adam and he’s a teacher.',
    answerTranslation: L(
      '저는 형제가 한 명 있어요. 이름은 Adam이고 선생님이에요.',
      'Mening bitta akam yoki ukam bor. Uning ismi Adam va u o‘qituvchi.',
      'I’ve got one brother. His name’s Adam and he’s a teacher.',
      'У меня один брат. Его зовут Адам, и он учитель.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['family', 'possessive-determiners', 'final-s'],
  },

  en_s1u3_n3_080_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Have you got any brothers and sisters?' },
      { speaker: 'user', text: 'Yes. I’ve got one sister.' },
      { speaker: 'npc', text: 'What’s her name?' },
      { speaker: 'user', text: 'Her name’s Sara.' },
      { speaker: 'npc', text: 'Is she married?' },
    ],
    options: [
      'Yes, she is. Her husband’s a doctor.',
      'Yes, she has. His husband a doctor.',
      'Yes, they are. Its husband is a doctor.',
      'Yes, I am. Their husband’s doctor.',
    ],
    answer: 'Yes, she is. Her husband’s a doctor.',
    answerTranslation: L(
      '네. 그녀의 남편은 의사예요.',
      'Ha. Uning eri shifokor.',
      'Yes, she is. Her husband’s a doctor.',
      'Да. Её муж — врач.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['family', 'married', 'final-s', 'final'],
  },
};

// ─────────────────────────────────────────────────────────────
// Node 3
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT3_NODE3 = {
  title: L('우리 가족', 'Mening oilam', 'Family', 'Семья'),
  section: 1,
  unit: 3,
  order: 3,
  isActive: true,

  lessons: [
    {
      title: L('가족 구성원', 'Oila a’zolari', 'Family members', 'Члены семьи'),
      description: L(
        '부모, 형제자매, 자녀, 조부모와 부부를 나타내는 기본 가족 어휘를 익혀요.',
        'Ota-ona, aka-uka, opa-singil, farzandlar, bobo-buvi va er-xotin haqidagi asosiy so‘zlarni o‘rganasiz.',
        'Learn the key words for parents, siblings, children, grandparents, husbands and wives.',
        'Учимся называть родителей, братьев и сестёр, детей, бабушек и дедушек, мужа и жену.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 1,
      questions: [
        'en_s1u3_n3_001_speaking',
        'en_s1u3_n3_002_word_matching',
        'en_s1u3_n3_003_speaking',
        'en_s1u3_n3_004_fill_in_blank',
        'en_s1u3_n3_005_speaking',
        'en_s1u3_n3_006_fill_in_blank',
        'en_s1u3_n3_007_speaking',
        'en_s1u3_n3_008_fill_in_blank',
        'en_s1u3_n3_009_speaking',
        'en_s1u3_n3_010_fill_in_blank',
        'en_s1u3_n3_011_speaking',
        'en_s1u3_n3_012_dialog_complete',
        'en_s1u3_n3_013_speaking',
        'en_s1u3_n3_014_fill_in_blank',
        'en_s1u3_n3_015_audio_match',
        'en_s1u3_n3_016_speaking',
        'en_s1u3_n3_017_reply_builder',
        'en_s1u3_n3_018_translate_builder',
        'en_s1u3_n3_019_speaking',
        'en_s1u3_n3_020_dialog_complete',
      ],
    },

    {
      title: L(
        'my, your, his, her',
        'my, your, his, her',
        'Possessive determiners',
        'Притяжательные определители',
      ),
      description: L(
        'I→my, you→your, he→his, she→her, it→its, we→our, they→their의 관계를 익혀요.',
        'I→my, you→your, he→his, she→her, it→its, we→our va they→their shakllarini o‘rganasiz.',
        'Use my, your, his, her, its, our and their to show who a person or thing belongs to.',
        'Используем my, your, his, her, its, our и their, чтобы показать принадлежность.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 2,
      questions: [
        'en_s1u3_n3_021_speaking',
        'en_s1u3_n3_022_fill_in_blank',
        'en_s1u3_n3_023_speaking',
        'en_s1u3_n3_024_fill_in_blank',
        'en_s1u3_n3_025_speaking',
        'en_s1u3_n3_026_fill_in_blank',
        'en_s1u3_n3_027_speaking',
        'en_s1u3_n3_028_fill_in_blank',
        'en_s1u3_n3_029_speaking',
        'en_s1u3_n3_030_fill_in_blank',
        'en_s1u3_n3_031_speaking',
        'en_s1u3_n3_032_fill_in_blank',
        'en_s1u3_n3_033_speaking',
        'en_s1u3_n3_034_fill_in_blank',
        'en_s1u3_n3_035_word_matching',
        'en_s1u3_n3_036_audio_match',
        'en_s1u3_n3_037_translate_builder',
        'en_s1u3_n3_038_speaking',
        'en_s1u3_n3_039_sentence_builder',
        'en_s1u3_n3_040_dialog_complete',
      ],
    },

    {
      title: L(
        '누구의 가족이에요?',
        'Bu kimning oilasi?',
        'Possessive ’s',
        'Притяжательное ’s',
      ),
      description: L(
        "이름이나 가족 명사 뒤에 ’s를 붙여 '누구의 것인지' 말하고 두 사람이 함께 가진 관계도 표현해요.",
        'Ism yoki oila so‘zidan keyin ’s qo‘shib egalikni va ikki kishiga birga tegishli munosabatni ifodalaysiz.',
        'Use possessive ’s after a name or family word, including possessions shared by two people.',
        'Используем притяжательное ’s после имени или семейного слова, включая общую принадлежность двух людей.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 3,
      questions: [
        'en_s1u3_n3_041_speaking',
        'en_s1u3_n3_042_fill_in_blank',
        'en_s1u3_n3_043_speaking',
        'en_s1u3_n3_044_fill_in_blank',
        'en_s1u3_n3_045_speaking',
        'en_s1u3_n3_046_fill_in_blank',
        'en_s1u3_n3_047_speaking',
        'en_s1u3_n3_048_fill_in_blank',
        'en_s1u3_n3_049_speaking',
        'en_s1u3_n3_050_translate_builder',
        'en_s1u3_n3_051_word_arrange',
        'en_s1u3_n3_052_speaking',
        'en_s1u3_n3_053_fill_in_blank',
        'en_s1u3_n3_054_speaking',
        'en_s1u3_n3_055_reply_builder',
        'en_s1u3_n3_056_fill_in_blank',
        'en_s1u3_n3_057_speaking',
        'en_s1u3_n3_058_sentence_builder',
        'en_s1u3_n3_059_speaking',
        'en_s1u3_n3_060_dialog_complete',
      ],
    },

    {
      title: L(
        '문장 끝의 ’s 이해하기',
        'Gap oxiridagi ’s ni tushunish',
        'Understanding final ’s',
        'Понимаем конечное ’s',
      ),
      description: L(
        '’s 뒤에 무엇이 오는지 듣고 is, has, 소유격 중 어떤 의미인지 구별하면서 가족의 나이·직업·결혼 여부를 묻고 답해요.',
        '’s dan keyin nima kelishini tinglab, uning is, has yoki egalik ekanini ajratasiz va oila a’zolarining yoshi, kasbi hamda oilaviy holati haqida gapirasiz.',
        'Use what follows ’s to distinguish is, has and possession, then talk about family members, ages, jobs and marriage.',
        'По слову после ’s определяем значение is, has или принадлежность и говорим о возрасте, работе и семейном положении.',
      ),
      category: LessonCategory.LISTENING,
      level: LV,
      order: 4,
      questions: [
        'en_s1u3_n3_061_speaking',
        'en_s1u3_n3_062_fill_in_blank',
        'en_s1u3_n3_063_speaking',
        'en_s1u3_n3_064_fill_in_blank',
        'en_s1u3_n3_065_speaking',
        'en_s1u3_n3_066_fill_in_blank',
        'en_s1u3_n3_067_audio_match',
        'en_s1u3_n3_068_speaking',
        'en_s1u3_n3_069_reply_builder',
        'en_s1u3_n3_070_speaking',
        'en_s1u3_n3_071_fill_in_blank',
        'en_s1u3_n3_072_speaking',
        'en_s1u3_n3_073_dialog_complete',
        'en_s1u3_n3_074_speaking',
        'en_s1u3_n3_075_fill_in_blank',
        'en_s1u3_n3_076_translate_builder',
        'en_s1u3_n3_077_speaking',
        'en_s1u3_n3_078_sentence_builder',
        'en_s1u3_n3_079_speaking',
        'en_s1u3_n3_080_dialog_complete',
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Section 1 · Unit 3 · Node 4
// 3.4 Speaking and writing
//
// Coverage
// - everyday expressions:
//   Atishoo! → Bless you!
//   Excuse me. That's my seat. → I'm so sorry.
//   Tea? → Yes, please.
//   Excuse me. Where's the toilet? → Sorry, I don't know.
//   Can I sit here? → Yes, of course.
//   Thank you. → You're welcome.
//   After you. → Thanks.
//   Sorry I'm late. → That's OK. Don't worry.
// - polite intonation
// - identify polite / not polite delivery
// - social media message structure:
//   greeting
//   say where you are / why
//   describe place / people / accommodation
//   end the message
// - and = similar/additional ideas
// - but = contrasting ideas
// - location / holiday / business / conference review
// - hotel / city / room / restaurant description
//
// 4 lessons × 20 questions = 80
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT3_NODE4_WORDS = [
  {
    code: 'en-expression-excuse-me',
    english: 'Excuse me.',
    senseKey: 'polite-attention',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '실례합니다.',
      'Kechirasiz.',
      'a polite expression used to get someone’s attention',
      'Извините.',
    ),
    examples: [
      {
        english: 'Excuse me. Can I sit here?',
        translations: L(
          '실례합니다. 여기 앉아도 돼요?',
          'Kechirasiz. Bu yerga o‘tirsam bo‘ladimi?',
          'Excuse me. Can I sit here?',
          'Извините. Можно здесь сесть?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɪkˈskjuːz miː/',
      ttsText: 'Excuse me.',
    },
    media: {
      emoji: '🙋',
      imageUrl: '',
      imageAlt: L(
        '정중하게 말을 거는 사람',
        'muloyim murojaat qilayotgan odam',
        'a person politely getting someone’s attention',
        'человек, вежливо обращающийся к кому-то',
      ),
    },
    tags: ['everyday-expressions', 'polite'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-expression-bless-you',
    english: 'Bless you!',
    senseKey: 'response-to-sneeze',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '재채기했을 때 하는 인사.',
      'Aksirgandan keyin aytiladigan ibora.',
      'an expression said after someone sneezes',
      'выражение, которое говорят после чихания',
    ),
    examples: [
      {
        english: 'Atishoo! Bless you!',
        translations: L(
          '에취! Bless you!',
          'Aksu! Bless you!',
          'Atishoo! Bless you!',
          'Апчхи! Будьте здоровы!',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈbles juː/',
      ttsText: 'Bless you!',
    },
    media: {
      emoji: '🤧',
      imageUrl: '',
      imageAlt: L(
        '재채기하는 사람',
        'aksirayotgan odam',
        'a person sneezing',
        'чихающий человек',
      ),
    },
    tags: ['everyday-expressions'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-expression-of-course',
    english: 'Of course.',
    senseKey: 'polite-agreement-permission',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '물론이죠.',
      'Albatta.',
      'used to agree or give permission',
      'Конечно.',
    ),
    examples: [
      {
        english: 'Can I sit here? Yes, of course.',
        translations: L(
          '여기 앉아도 돼요? 네, 물론이죠.',
          'Bu yerga o‘tirsam bo‘ladimi? Ha, albatta.',
          'Can I sit here? Yes, of course.',
          'Можно здесь сесть? Да, конечно.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/əv ˈkɔːs/',
      ttsText: 'Of course.',
    },
    media: {
      emoji: '✅',
      imageUrl: '',
      imageAlt: L(
        '허락하는 사람',
        'ruxsat berayotgan odam',
        'a person giving permission',
        'человек, дающий разрешение',
      ),
    },
    tags: ['everyday-expressions', 'polite'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-expression-youre-welcome',
    english: "You're welcome.",
    senseKey: 'response-to-thanks',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '천만에요.',
      'Arzimaydi.',
      'a polite response to thank you',
      'Пожалуйста.',
    ),
    examples: [
      {
        english: 'Thank you. You’re welcome.',
        translations: L(
          '고마워요. 천만에요.',
          'Rahmat. Arzimaydi.',
          'Thank you. You’re welcome.',
          'Спасибо. Пожалуйста.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/jɔː ˈwelkəm/',
      ttsText: "You're welcome.",
    },
    media: {
      emoji: '😊',
      imageUrl: '',
      imageAlt: L(
        '감사에 답하는 사람',
        'rahmatga javob berayotgan odam',
        'a person responding to thanks',
        'человек, отвечающий на благодарность',
      ),
    },
    tags: ['everyday-expressions', 'polite'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-expression-after-you',
    english: 'After you.',
    senseKey: 'invite-other-person-first',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '먼저 가세요.',
      'Siz birinchi.',
      'used politely to let another person go first',
      'После вас.',
    ),
    examples: [
      {
        english: 'After you. Thanks.',
        translations: L(
          '먼저 가세요. 고마워요.',
          'Siz birinchi. Rahmat.',
          'After you. Thanks.',
          'После вас. Спасибо.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈɑːftə juː/',
      ttsText: 'After you.',
    },
    media: {
      emoji: '🚪',
      imageUrl: '',
      imageAlt: L(
        '다른 사람에게 먼저 가라고 하는 모습',
        'boshqa odamni oldin o‘tkazayotgan kishi',
        'letting another person go first',
        'человек пропускает другого вперёд',
      ),
    },
    tags: ['everyday-expressions', 'polite'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-expression-dont-worry',
    english: "Don't worry.",
    senseKey: 'reassurance',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '걱정하지 마세요.',
      'Xavotir olmang.',
      'used to tell someone that a problem is not serious',
      'Не беспокойтесь.',
    ),
    examples: [
      {
        english: "That's OK. Don't worry.",
        translations: L(
          '괜찮아요. 걱정하지 마세요.',
          'Mayli. Xavotir olmang.',
          "That's OK. Don't worry.",
          'Всё нормально. Не беспокойтесь.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/dəʊnt ˈwʌri/',
      ttsText: "Don't worry.",
    },
    media: {
      emoji: '🙂',
      imageUrl: '',
      imageAlt: L(
        '괜찮다고 안심시키는 사람',
        'tinchlantirayotgan odam',
        'a person reassuring someone',
        'человек успокаивает другого',
      ),
    },
    tags: ['everyday-expressions'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-place-toilet',
    english: 'toilet',
    senseKey: 'restroom',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('화장실', 'hojatxona', 'a room with a toilet', 'туалет'),
    examples: [
      {
        english: 'Excuse me. Where’s the toilet?',
        translations: L(
          '실례합니다. 화장실이 어디예요?',
          'Kechirasiz. Hojatxona qayerda?',
          'Excuse me. Where’s the toilet?',
          'Извините. Где туалет?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈtɔɪlət/',
      ttsText: 'toilet',
    },
    media: {
      emoji: '🚻',
      imageUrl: '',
      imageAlt: L('화장실', 'hojatxona', 'a toilet', 'туалет'),
    },
    tags: ['places', 'everyday-expressions'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-event-conference',
    english: 'conference',
    senseKey: 'large-work-meeting',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '회의; 컨퍼런스',
      'konferensiya',
      'a large formal meeting for people with a shared subject or job',
      'конференция',
    ),
    examples: [
      {
        english: 'She’s here for a conference.',
        translations: L(
          '그녀는 컨퍼런스 때문에 여기 왔어요.',
          'U bu yerga konferensiya uchun kelgan.',
          'She’s here for a conference.',
          'Она здесь на конференции.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkɒnfərəns/',
      ttsText: 'conference',
    },
    media: {
      emoji: '👥',
      imageUrl: '',
      imageAlt: L('컨퍼런스', 'konferensiya', 'a conference', 'конференция'),
    },
    tags: ['travel', 'work'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-writing-social-media-message',
    english: 'social media message',
    senseKey: 'informal-online-message',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '소셜미디어 메시지',
      'ijtimoiy tarmoq xabari',
      'an informal message sent through social media',
      'сообщение в социальной сети',
    ),
    examples: [
      {
        english: 'Write a social media message to a friend.',
        translations: L(
          '친구에게 소셜미디어 메시지를 써 보세요.',
          'Do‘stingizga ijtimoiy tarmoq xabari yozing.',
          'Write a social media message to a friend.',
          'Напишите сообщение другу в социальной сети.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌsəʊʃl ˈmiːdiə ˈmesɪdʒ/',
      ttsText: 'social media message',
    },
    media: {
      emoji: '💬',
      imageUrl: '',
      imageAlt: L(
        '휴대전화의 메시지',
        'telefondagi xabar',
        'a message on a phone',
        'сообщение на телефоне',
      ),
    },
    tags: ['writing', 'messages'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-writing-message-me',
    english: 'Message me soon.',
    senseKey: 'ask-for-reply',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '곧 메시지해 줘.',
      'Tez orada menga yoz.',
      'send me a message soon',
      'Напиши мне скоро.',
    ),
    examples: [
      {
        english: 'Message me soon. Bye!',
        translations: L(
          '곧 메시지해 줘. 안녕!',
          'Tez orada menga yoz. Xayr!',
          'Message me soon. Bye!',
          'Напиши мне скоро. Пока!',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈmesɪdʒ miː suːn/',
      ttsText: 'Message me soon.',
    },
    media: {
      emoji: '📱',
      imageUrl: '',
      imageAlt: L(
        '메시지를 보내는 휴대전화',
        'xabar yuborilayotgan telefon',
        'a phone sending a message',
        'телефон с сообщением',
      ),
    },
    tags: ['writing', 'messages'],
    difficulty: 1,
    isCore: true,
  },
];

export const EN_S1_UNIT3_NODE4_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Everyday expressions
  // ===========================================================

  en_s1u3_n4_001_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Excuse me.',
    audioText: 'Excuse me.',
    answerTranslation: L(
      '실례합니다.',
      'Kechirasiz.',
      'Excuse me.',
      'Извините.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['everyday-expressions', 'polite'],
  },

  en_s1u3_n4_002_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Can I sit here?',
    audioText: 'Can I sit here?',
    answerTranslation: L(
      '여기 앉아도 돼요?',
      'Bu yerga o‘tirsam bo‘ladimi?',
      'Can I sit here?',
      'Можно здесь сесть?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['everyday-expressions', 'permission'],
  },

  en_s1u3_n4_003_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Can I sit here?',
    options: ['Yes', 'of', 'course', 'please', 'sorry', 'welcome'],
    answer: 'Yes of course',
    answerTranslation: L(
      '네, 물론이죠.',
      'Ha, albatta.',
      'Yes, of course.',
      'Да, конечно.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['everyday-expressions', 'permission'],
  },

  en_s1u3_n4_004_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Yes, of course.',
    audioText: 'Yes, of course.',
    answerTranslation: L(
      '네, 물론이죠.',
      'Ha, albatta.',
      'Yes, of course.',
      'Да, конечно.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['everyday-expressions', 'of-course'],
  },

  en_s1u3_n4_005_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Tea?' }],
    options: [
      'Yes, please.',
      'Bless you!',
      "Sorry, I don't know.",
      "That's OK. Don't worry.",
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
    tags: ['everyday-expressions', 'offer'],
  },

  en_s1u3_n4_006_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Yes, please.',
    audioText: 'Yes, please.',
    answerTranslation: L(
      '네, 주세요.',
      'Ha, iltimos.',
      'Yes, please.',
      'Да, пожалуйста.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['everyday-expressions', 'please'],
  },

  en_s1u3_n4_007_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Thank you.',
    audioText: 'Thank you.',
    answerTranslation: L('고마워요.', 'Rahmat.', 'Thank you.', 'Спасибо.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['everyday-expressions', 'thanks'],
  },

  en_s1u3_n4_008_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Thank you.' }],
    options: ["You're welcome.", 'Yes, please.', 'Bless you!', "I'm so sorry."],
    answer: "You're welcome.",
    answerTranslation: L(
      '천만에요.',
      'Arzimaydi.',
      "You're welcome.",
      'Пожалуйста.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['everyday-expressions', 'thanks'],
  },

  en_s1u3_n4_009_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: "You're welcome.",
    audioText: "You're welcome.",
    answerTranslation: L(
      '천만에요.',
      'Arzimaydi.',
      "You're welcome.",
      'Пожалуйста.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['everyday-expressions', 'welcome'],
  },

  en_s1u3_n4_010_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Atishoo!' }],
    options: ['Bless you!', 'After you.', 'Yes, please.', 'Excuse me.'],
    answer: 'Bless you!',
    answerTranslation: L(
      '재채기했을 때 하는 인사.',
      'Aksirganda aytiladigan ibora.',
      'Bless you!',
      'Будьте здоровы!',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['everyday-expressions', 'bless-you'],
  },

  en_s1u3_n4_011_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Bless you!',
    audioText: 'Bless you!',
    answerTranslation: L(
      'Bless you!',
      'Bless you!',
      'Bless you!',
      'Будьте здоровы!',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['everyday-expressions', 'bless-you'],
  },

  en_s1u3_n4_012_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'After you.',
    audioText: 'After you.',
    answerTranslation: L(
      '먼저 가세요.',
      'Siz birinchi.',
      'After you.',
      'После вас.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['everyday-expressions', 'after-you'],
  },

  en_s1u3_n4_013_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'After you.',
    options: ['Oh', 'thanks', 'sorry', 'please', 'welcome'],
    answer: 'Oh thanks',
    answerTranslation: L(
      '아, 고마워요.',
      'Oh, rahmat.',
      'Oh, thanks.',
      'О, спасибо.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['everyday-expressions', 'after-you'],
  },

  en_s1u3_n4_014_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: "Sorry, I'm late.",
    audioText: "Sorry, I'm late.",
    answerTranslation: L(
      '늦어서 미안해요.',
      'Kech qolganim uchun uzr.',
      "Sorry, I'm late.",
      'Извините, я опоздал.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['everyday-expressions', 'sorry'],
  },

  en_s1u3_n4_015_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: "Sorry, I'm late." }],
    options: [
      "That's OK. Don't worry.",
      "Sorry, I don't know.",
      'Yes, please.',
      'Bless you!',
    ],
    answer: "That's OK. Don't worry.",
    answerTranslation: L(
      '괜찮아요. 걱정하지 마세요.',
      'Mayli. Xavotir olmang.',
      "That's OK. Don't worry.",
      'Всё нормально. Не беспокойтесь.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['everyday-expressions', 'dont-worry'],
  },

  en_s1u3_n4_016_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: "That's OK. Don't worry.",
    audioText: "That's OK. Don't worry.",
    answerTranslation: L(
      '괜찮아요. 걱정하지 마세요.',
      'Mayli. Xavotir olmang.',
      "That's OK. Don't worry.",
      'Всё нормально. Не беспокойтесь.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['everyday-expressions', 'dont-worry'],
  },

  en_s1u3_n4_017_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: "Excuse me. Where's the toilet?",
    audioText: "Excuse me. Where's the toilet?",
    answerTranslation: L(
      '실례합니다. 화장실이 어디예요?',
      'Kechirasiz. Hojatxona qayerda?',
      "Excuse me. Where's the toilet?",
      'Извините. Где туалет?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['everyday-expressions', 'toilet'],
  },

  en_s1u3_n4_018_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: "Excuse me. Where's the toilet?",
    options: ['Sorry', 'I', "don't", 'know', 'please', 'welcome'],
    answer: "Sorry I don't know",
    answerTranslation: L(
      '미안하지만 모르겠어요.',
      'Kechirasiz, bilmayman.',
      "Sorry, I don't know.",
      'Извините, я не знаю.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['everyday-expressions', 'dont-know'],
  },

  en_s1u3_n4_019_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      { korean: 'Thank you.', native: 'Rahmat.' },
      { korean: "You're welcome.", native: 'Arzimaydi.' },
      { korean: 'After you.', native: 'Siz birinchi.' },
      { korean: 'Bless you!', native: 'Aksirgandan keyingi ibora.' },
      { korean: 'Excuse me.', native: 'Kechirasiz.' },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['everyday-expressions', 'listening'],
  },

  en_s1u3_n4_020_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: "Excuse me. That's my seat." }],
    options: [
      "Oh, I'm so sorry.",
      "You're welcome.",
      'Yes, please.',
      'Bless you!',
    ],
    answer: "Oh, I'm so sorry.",
    answerTranslation: L(
      '아, 정말 미안해요.',
      'Oh, juda uzr.',
      "Oh, I'm so sorry.",
      'Ой, простите меня.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['everyday-expressions', 'seat'],
  },

  // ===========================================================
  // Lesson 2 · Polite intonation
  // ===========================================================

  en_s1u3_n4_021_speaking: {
    type: 'speaking',
    level: LV,
    instruction: L(
      '정중한 억양으로 따라 말하세요.',
      'Muloyim ohangda takrorlang.',
      'Repeat using polite intonation.',
      'Повторите с вежливой интонацией.',
    ),
    answer: 'Excuse me.',
    audioText: 'Excuse me.',
    answerTranslation: L(
      '실례합니다.',
      'Kechirasiz.',
      'Excuse me.',
      'Извините.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['pronunciation', 'polite-intonation'],
  },

  en_s1u3_n4_022_speaking: {
    type: 'speaking',
    level: LV,
    instruction: L(
      '정중한 억양으로 질문하세요.',
      'Savolni muloyim ohangda ayting.',
      'Say the question with polite intonation.',
      'Произнесите вопрос с вежливой интонацией.',
    ),
    answer: 'Can I sit here?',
    audioText: 'Can I sit here?',
    answerTranslation: L(
      '여기 앉아도 돼요?',
      'Bu yerga o‘tirsam bo‘ladimi?',
      'Can I sit here?',
      'Можно здесь сесть?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['pronunciation', 'polite-intonation'],
  },

  en_s1u3_n4_023_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '상대에게 허락할 때 가장 자연스러운 말을 고르세요.',
      'Ruxsat berishda eng tabiiy javobni tanlang.',
      'Choose the natural polite reply giving permission.',
      'Выберите естественный вежливый ответ с разрешением.',
    ),
    sentenceTemplate: 'Can I sit here? — Yes, ___.',
    blankAnswers: ['of course'],
    options: ['of course', 'bless you', 'after you', "don't worry"],
    answer: 'of course',
    answerTranslation: L('물론이죠.', 'Albatta.', 'Of course.', 'Конечно.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['polite', 'permission'],
  },

  en_s1u3_n4_024_speaking: {
    type: 'speaking',
    level: LV,
    instruction: L(
      '부드럽고 정중하게 따라 말하세요.',
      'Yumshoq va muloyim tarzda takrorlang.',
      'Repeat in a warm, polite way.',
      'Повторите мягко и вежливо.',
    ),
    answer: 'Yes, of course.',
    audioText: 'Yes, of course.',
    answerTranslation: L(
      '네, 물론이죠.',
      'Ha, albatta.',
      'Yes, of course.',
      'Да, конечно.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['pronunciation', 'polite-intonation'],
  },

  en_s1u3_n4_025_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'user', text: 'Excuse me. Can I sit here?' }],
    options: [
      'Yes, of course.',
      'No. Sit there.',
      "I don't know toilet.",
      'Bless you.',
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
    tags: ['polite', 'dialog'],
  },

  en_s1u3_n4_026_speaking: {
    type: 'speaking',
    level: LV,
    instruction: L(
      '감사의 느낌이 들도록 자연스럽게 말하세요.',
      'Minnatdorchilik ohangida tabiiy ayting.',
      'Say it naturally with thankful intonation.',
      'Произнесите естественно с благодарной интонацией.',
    ),
    answer: 'Thanks very much.',
    audioText: 'Thanks very much.',
    answerTranslation: L(
      '정말 고마워요.',
      'Katta rahmat.',
      'Thanks very much.',
      'Большое спасибо.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['pronunciation', 'thanks'],
  },

  en_s1u3_n4_027_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Thanks very much.',
    options: ["You're", 'welcome', 'Bless', 'you', 'Sorry', 'please'],
    answer: "You're welcome",
    answerTranslation: L(
      '천만에요.',
      'Arzimaydi.',
      "You're welcome.",
      'Пожалуйста.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['polite', 'thanks'],
  },

  en_s1u3_n4_028_speaking: {
    type: 'speaking',
    level: LV,
    instruction: L(
      '정중하고 친절하게 말하세요.',
      'Muloyim va do‘stona ayting.',
      'Say it politely and warmly.',
      'Произнесите вежливо и дружелюбно.',
    ),
    answer: "You're welcome.",
    audioText: "You're welcome.",
    answerTranslation: L(
      '천만에요.',
      'Arzimaydi.',
      "You're welcome.",
      'Пожалуйста.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['pronunciation', 'welcome'],
  },

  en_s1u3_n4_029_speaking: {
    type: 'speaking',
    level: LV,
    instruction: L(
      '상대방을 먼저 보내는 정중한 억양으로 말하세요.',
      'Boshqa odamni oldin o‘tkazadigan muloyim ohangda ayting.',
      'Say it politely while letting another person go first.',
      'Произнесите вежливо, пропуская другого человека вперёд.',
    ),
    answer: 'After you.',
    audioText: 'After you.',
    answerTranslation: L(
      '먼저 가세요.',
      'Siz birinchi.',
      'After you.',
      'После вас.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['pronunciation', 'after-you'],
  },

  en_s1u3_n4_030_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'After you.' }],
    options: [
      'Oh, thanks.',
      "Sorry, I don't know.",
      "I'm so sorry.",
      'Yes, please.',
    ],
    answer: 'Oh, thanks.',
    answerTranslation: L(
      '아, 고마워요.',
      'Oh, rahmat.',
      'Oh, thanks.',
      'О, спасибо.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['polite', 'after-you'],
  },

  en_s1u3_n4_031_speaking: {
    type: 'speaking',
    level: LV,
    instruction: L(
      '미안한 느낌을 담아 말하세요.',
      'Uzr so‘rash ohangida ayting.',
      'Say it with apologetic intonation.',
      'Произнесите с извиняющейся интонацией.',
    ),
    answer: "Sorry, I'm late.",
    audioText: "Sorry, I'm late.",
    answerTranslation: L(
      '늦어서 미안해요.',
      'Kech qolganim uchun uzr.',
      "Sorry, I'm late.",
      'Извините, я опоздал.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['pronunciation', 'sorry'],
  },

  en_s1u3_n4_032_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: "Sorry, I'm late.",
    options: ["That's", 'OK', "Don't", 'worry', 'Bless', 'please'],
    answer: "That's OK Don't worry",
    answerTranslation: L(
      '괜찮아요. 걱정하지 마세요.',
      'Mayli. Xavotir olmang.',
      "That's OK. Don't worry.",
      'Всё нормально. Не беспокойтесь.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['polite', 'reassurance'],
  },

  en_s1u3_n4_033_speaking: {
    type: 'speaking',
    level: LV,
    instruction: L(
      '상대를 안심시키는 부드러운 억양으로 말하세요.',
      'Suhbatdoshni tinchlantiradigan yumshoq ohangda ayting.',
      'Say it with reassuring, friendly intonation.',
      'Произнесите мягко и успокаивающе.',
    ),
    answer: "That's OK. Don't worry.",
    audioText: "That's OK. Don't worry.",
    answerTranslation: L(
      '괜찮아요. 걱정하지 마세요.',
      'Mayli. Xavotir olmang.',
      "That's OK. Don't worry.",
      'Всё нормально. Не беспокойтесь.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['pronunciation', 'reassurance'],
  },

  en_s1u3_n4_034_speaking: {
    type: 'speaking',
    level: LV,
    instruction: L(
      '길을 묻는 상황처럼 정중하게 말하세요.',
      'Yo‘l so‘rayotgandek muloyim ayting.',
      'Say it politely as if asking for directions.',
      'Произнесите вежливо, как при вопросе о направлении.',
    ),
    answer: "Excuse me. Where's the toilet?",
    audioText: "Excuse me. Where's the toilet?",
    answerTranslation: L(
      '실례합니다. 화장실이 어디예요?',
      'Kechirasiz. Hojatxona qayerda?',
      "Excuse me. Where's the toilet?",
      'Извините. Где туалет?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['pronunciation', 'polite-question'],
  },

  en_s1u3_n4_035_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: "Excuse me. Where's the toilet?" }],
    options: [
      "Sorry, I don't know.",
      'Yes, please.',
      'After you.',
      "You're welcome.",
    ],
    answer: "Sorry, I don't know.",
    answerTranslation: L(
      '미안하지만 모르겠어요.',
      'Kechirasiz, bilmayman.',
      "Sorry, I don't know.",
      'Извините, я не знаю.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['polite', 'dont-know'],
  },

  en_s1u3_n4_036_speaking: {
    type: 'speaking',
    level: LV,
    instruction: L(
      '모른다고 답하지만 무례하지 않도록 부드럽게 말하세요.',
      'Bilmasligingizni muloyim tarzda ayting.',
      'Say it gently so the answer sounds polite.',
      'Произнесите мягко, чтобы ответ звучал вежливо.',
    ),
    answer: "Sorry, I don't know.",
    audioText: "Sorry, I don't know.",
    answerTranslation: L(
      '미안하지만 모르겠어요.',
      'Kechirasiz, bilmayman.',
      "Sorry, I don't know.",
      'Извините, я не знаю.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['pronunciation', 'polite-intonation'],
  },

  en_s1u3_n4_037_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['Can', 'I', 'sit', 'here', 'please', 'toilet'],
    answer: 'Can I sit here',
    audioText: 'Can I sit here?',
    answerTranslation: L(
      '여기 앉아도 돼요?',
      'Bu yerga o‘tirsam bo‘ladimi?',
      'Can I sit here?',
      'Можно здесь сесть?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['polite', 'word-arrange'],
  },

  en_s1u3_n4_038_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Yes, of course.',
    audioText: 'Yes, of course.',
    answerI18n: L(
      '네, 물론이죠',
      'Ha, albatta',
      'Yes of course',
      'Да, конечно',
    ),
    options: ['Yes', 'of', 'course', 'No', 'sorry'],
    optionsI18n: {
      ko: ['네', '물론이죠', '아니요', '미안해요'],
      uz: ['Ha', 'albatta', 'Yo‘q', 'kechirasiz'],
      en: ['Yes', 'of', 'course', 'No', 'sorry'],
      ru: ['Да', 'конечно', 'Нет', 'извините'],
    },
    answerTranslation: L(
      '네, 물론이죠.',
      'Ha, albatta.',
      'Yes, of course.',
      'Да, конечно.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['polite', 'sentence-builder'],
  },

  en_s1u3_n4_039_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      { korean: 'Can I sit here?', native: 'Bu yerga o‘tirsam bo‘ladimi?' },
      { korean: 'Yes, of course.', native: 'Ha, albatta.' },
      { korean: "Sorry, I'm late.", native: 'Kech qolganim uchun uzr.' },
      { korean: "Don't worry.", native: 'Xavotir olmang.' },
      { korean: "Sorry, I don't know.", native: 'Kechirasiz, bilmayman.' },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['polite-intonation', 'listening'],
  },

  en_s1u3_n4_040_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'user', text: "Excuse me. That's my seat." },
      { speaker: 'npc', text: "Oh, I'm so sorry." },
    ],
    options: [
      "That's OK.",
      'Bless you!',
      'Yes, please.',
      "Sorry, I don't know.",
    ],
    answer: "That's OK.",
    answerTranslation: L('괜찮아요.', 'Mayli.', "That's OK.", 'Всё нормально.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['polite', 'review'],
  },

  // ===========================================================
  // Lesson 3 · and / but + message structure
  // ===========================================================

  en_s1u3_n4_041_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The hotel is nice and the room is big.',
    audioText: 'The hotel is nice and the room is big.',
    answerTranslation: L(
      '호텔은 좋고 방은 커요.',
      'Mehmonxona yaxshi va xona katta.',
      'The hotel is nice and the room is big.',
      'Отель хороший, и комната большая.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['and', 'writing'],
  },

  en_s1u3_n4_042_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '비슷한 내용을 연결하는 단어를 고르세요.',
      'O‘xshash fikrlarni bog‘laydigan so‘zni tanlang.',
      'Choose the word that joins similar ideas.',
      'Выберите слово, соединяющее похожие идеи.',
    ),
    sentenceTemplate: 'The hotel is nice ___ the room is big.',
    blankAnswers: ['and'],
    options: ['and', 'but', 'from', 'at'],
    answer: 'and',
    answerTranslation: L(
      '호텔은 좋고 방은 커요.',
      'Mehmonxona yaxshi va xona katta.',
      'The hotel is nice and the room is big.',
      'Отель хороший, и комната большая.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['and', 'similar-ideas'],
  },

  en_s1u3_n4_043_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The city is beautiful, but it’s expensive.',
    audioText: 'The city is beautiful, but it’s expensive.',
    answerTranslation: L(
      '도시는 아름답지만 비싸요.',
      'Shahar chiroyli, lekin qimmat.',
      'The city is beautiful, but it’s expensive.',
      'Город красивый, но дорогой.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['but', 'writing'],
  },

  en_s1u3_n4_044_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '서로 대비되는 내용을 연결하는 단어를 고르세요.',
      'Qarama-qarshi fikrlarni bog‘laydigan so‘zni tanlang.',
      'Choose the word that joins contrasting ideas.',
      'Выберите слово, соединяющее противоположные идеи.',
    ),
    sentenceTemplate: 'The city is beautiful, ___ it’s expensive.',
    blankAnswers: ['but'],
    options: ['but', 'and', 'at', 'to'],
    answer: 'but',
    answerTranslation: L(
      '도시는 아름답지만 비싸요.',
      'Shahar chiroyli, lekin qimmat.',
      'The city is beautiful, but it’s expensive.',
      'Город красивый, но дорогой.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['but', 'contrast'],
  },

  en_s1u3_n4_045_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She’s got one brother and one sister.',
    audioText: 'She’s got one brother and one sister.',
    answerTranslation: L(
      '그녀에게는 남자 형제 한 명과 여자 형제 한 명이 있어요.',
      'Uning bitta akasi yoki ukasi va bitta opasi yoki singlisi bor.',
      'She’s got one brother and one sister.',
      'У неё есть один брат и одна сестра.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['and', 'family'],
  },

  en_s1u3_n4_046_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She’s got one brother ___ one sister.',
    blankAnswers: ['and'],
    options: ['and', 'but', 'near', 'from'],
    answer: 'and',
    answerTranslation: L(
      '그녀에게는 남자 형제 한 명과 여자 형제 한 명이 있어요.',
      'Uning bitta akasi yoki ukasi va bitta opasi yoki singlisi bor.',
      'She’s got one brother and one sister.',
      'У неё есть один брат и одна сестра.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['and', 'family'],
  },

  en_s1u3_n4_047_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I’ve got a phone, but I haven’t got a laptop.',
    audioText: 'I’ve got a phone, but I haven’t got a laptop.',
    answerTranslation: L(
      '휴대전화는 있지만 노트북은 없어요.',
      'Telefonim bor, lekin noutbukim yo‘q.',
      'I’ve got a phone, but I haven’t got a laptop.',
      'У меня есть телефон, но нет ноутбука.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['but', 'possessions'],
  },

  en_s1u3_n4_048_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I’ve got a phone, ___ I haven’t got a laptop.',
    blankAnswers: ['but'],
    options: ['but', 'and', 'in', 'on'],
    answer: 'but',
    answerTranslation: L(
      '휴대전화는 있지만 노트북은 없어요.',
      'Telefonim bor, lekin noutbukim yo‘q.',
      'I’ve got a phone, but I haven’t got a laptop.',
      'У меня есть телефон, но нет ноутбука.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['but', 'possessions'],
  },

  en_s1u3_n4_049_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'My friend is funny and very friendly.',
    audioText: 'My friend is funny and very friendly.',
    answerTranslation: L(
      '제 친구는 재미있고 아주 친절해요.',
      'Do‘stim kulgili va juda mehribon.',
      'My friend is funny and very friendly.',
      'Мой друг весёлый и очень дружелюбный.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['and', 'adjectives'],
  },

  en_s1u3_n4_050_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['My', 'friend', 'is', 'funny', 'and', 'very', 'friendly', 'but'],
    answer: 'My friend is funny and very friendly',
    answerTranslation: L(
      '제 친구는 재미있고 아주 친절해요.',
      'Do‘stim kulgili va juda mehribon.',
      'My friend is funny and very friendly.',
      'Мой друг весёлый и очень дружелюбный.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['and', 'translate-builder'],
  },

  en_s1u3_n4_051_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Our hotel is small, but our room is lovely.',
    audioText: 'Our hotel is small, but our room is lovely.',
    answerTranslation: L(
      '우리 호텔은 작지만 방은 아주 좋아요.',
      'Mehmonxonamiz kichik, lekin xonamiz juda yoqimli.',
      'Our hotel is small, but our room is lovely.',
      'Наш отель маленький, но комната прекрасная.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['but', 'hotel'],
  },

  en_s1u3_n4_052_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['Our', 'hotel', 'is', 'small', 'but', 'nice', 'and'],
    answer: 'Our hotel is small but nice',
    audioText: 'Our hotel is small but nice.',
    answerTranslation: L(
      '우리 호텔은 작지만 좋아요.',
      'Mehmonxonamiz kichik, lekin yaxshi.',
      'Our hotel is small but nice.',
      'Наш отель маленький, но хороший.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['but', 'word-arrange'],
  },

  en_s1u3_n4_053_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The restaurant is good and it’s cheap.',
    audioText: 'The restaurant is good and it’s cheap.',
    answerTranslation: L(
      '그 식당은 좋고 저렴해요.',
      'Restoran yaxshi va arzon.',
      'The restaurant is good and it’s cheap.',
      'Ресторан хороший и недорогой.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['and', 'restaurant'],
  },

  en_s1u3_n4_054_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The restaurant is good ___ it’s cheap.',
    blankAnswers: ['and'],
    options: ['and', 'but', 'to', 'from'],
    answer: 'and',
    answerTranslation: L(
      '그 식당은 좋고 저렴해요.',
      'Restoran yaxshi va arzon.',
      'The restaurant is good and it’s cheap.',
      'Ресторан хороший и недорогой.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['and', 'similar-ideas'],
  },

  en_s1u3_n4_055_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'My job is hard, but I’m happy.',
    audioText: 'My job is hard, but I’m happy.',
    answerTranslation: L(
      '제 일은 힘들지만 저는 행복해요.',
      'Ishim qiyin, lekin men xursandman.',
      'My job is hard, but I’m happy.',
      'Моя работа трудная, но я счастлив.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['but', 'contrast'],
  },

  en_s1u3_n4_056_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'My job is hard, ___ I’m happy.',
    blankAnswers: ['but'],
    options: ['but', 'and', 'in', 'at'],
    answer: 'but',
    answerTranslation: L(
      '제 일은 힘들지만 저는 행복해요.',
      'Ishim qiyin, lekin men xursandman.',
      'My job is hard, but I’m happy.',
      'Моя работа трудная, но я счастлив.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['but', 'contrast'],
  },

  en_s1u3_n4_057_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Hi, Hana. I hope you’re well.',
    audioText: 'Hi, Hana. I hope you’re well.',
    answerTranslation: L(
      '안녕, Hana. 잘 지내고 있길 바라.',
      'Salom, Hana. Yaxshi yuribsan degan umiddaman.',
      'Hi, Hana. I hope you’re well.',
      'Привет, Хана. Надеюсь, у тебя всё хорошо.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['message', 'opening'],
  },

  en_s1u3_n4_058_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '메시지의 시작 부분에 알맞은 표현을 고르세요.',
      'Xabarning boshlanishiga mos iborani tanlang.',
      'Choose the expression for the beginning of a message.',
      'Выберите фразу для начала сообщения.',
    ),
    sentenceTemplate: 'Hi, Hana. ___.',
    blankAnswers: ["I hope you're well"],
    options: [
      "I hope you're well",
      'Message me soon',
      'After you',
      "Don't worry",
    ],
    answer: "I hope you're well",
    answerTranslation: L(
      '잘 지내고 있길 바라.',
      'Yaxshi yuribsan degan umiddaman.',
      "I hope you're well.",
      'Надеюсь, у тебя всё хорошо.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['message', 'opening'],
  },

  en_s1u3_n4_059_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Message me soon. Bye!',
    audioText: 'Message me soon. Bye!',
    answerTranslation: L(
      '곧 메시지해 줘. 안녕!',
      'Tez orada menga yoz. Xayr!',
      'Message me soon. Bye!',
      'Напиши мне скоро. Пока!',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['message', 'ending'],
  },

  en_s1u3_n4_060_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'The city is beautiful, but it’s expensive.',
    audioText: 'The city is beautiful, but it’s expensive.',
    answerI18n: L(
      '도시는 아름답지만 비싸요',
      'Shahar chiroyli, lekin qimmat',
      'The city is beautiful but it is expensive',
      'Город красивый, но дорогой',
    ),
    options: ['The', 'city', 'is', 'beautiful', 'but', 'it’s', 'expensive'],
    optionsI18n: {
      ko: ['도시는', '아름답지만', '비싸요'],
      uz: ['Shahar', 'chiroyli', 'lekin', 'qimmat'],
      en: ['The', 'city', 'is', 'beautiful', 'but', 'it', 'is', 'expensive'],
      ru: ['Город', 'красивый', 'но', 'дорогой'],
    },
    answerTranslation: L(
      '도시는 아름답지만 비싸요.',
      'Shahar chiroyli, lekin qimmat.',
      'The city is beautiful, but it’s expensive.',
      'Город красивый, но дорогой.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['and-but', 'sentence-builder'],
  },

  // ===========================================================
  // Lesson 4 · Write a social media message
  // ===========================================================

  en_s1u3_n4_061_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Hi, Amir. I hope you’re well.',
    audioText: 'Hi, Amir. I hope you’re well.',
    answerTranslation: L(
      '안녕, Amir. 잘 지내고 있길 바라.',
      'Salom, Amir. Yaxshi yuribsan degan umiddaman.',
      'Hi, Amir. I hope you’re well.',
      'Привет, Амир. Надеюсь, у тебя всё хорошо.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['message', 'opening'],
  },

  en_s1u3_n4_062_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '메시지의 자연스러운 첫 문장을 고르세요.',
      'Xabarning tabiiy birinchi jumlasini tanlang.',
      'Choose a natural opening for the message.',
      'Выберите естественное начало сообщения.',
    ),
    sentenceTemplate: 'Hi, Amir. ___.',
    blankAnswers: ["I hope you're well"],
    options: ["I hope you're well", "That's my seat", 'Bless you', 'After you'],
    answer: "I hope you're well",
    answerTranslation: L(
      '잘 지내고 있길 바라.',
      'Yaxshi yuribsan degan umiddaman.',
      "I hope you're well.",
      'Надеюсь, у тебя всё хорошо.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['message', 'opening'],
  },

  en_s1u3_n4_063_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I’m in Lisbon on holiday.',
    audioText: 'I’m in Lisbon on holiday.',
    answerTranslation: L(
      '저는 휴가로 리스본에 와 있어요.',
      'Men Lissabonda ta’tildaman.',
      'I’m in Lisbon on holiday.',
      'Я в Лиссабоне в отпуске.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['message', 'location', 'holiday'],
  },

  en_s1u3_n4_064_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['I’m', 'in', 'Lisbon', 'on', 'holiday', 'business', 'at'],
    answer: 'I’m in Lisbon on holiday',
    answerTranslation: L(
      '저는 휴가로 리스본에 와 있어요.',
      'Men Lissabonda ta’tildaman.',
      'I’m in Lisbon on holiday.',
      'Я в Лиссабоне в отпуске.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['message', 'holiday'],
  },

  en_s1u3_n4_065_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I’m here with my sister.',
    audioText: 'I’m here with my sister.',
    answerTranslation: L(
      '저는 여자 형제와 함께 여기 있어요.',
      'Men bu yerda opam yoki singlim bilanman.',
      'I’m here with my sister.',
      'Я здесь с сестрой.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['message', 'family'],
  },

  en_s1u3_n4_066_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I’m here ___ my sister.',
    blankAnswers: ['with'],
    options: ['with', 'from', 'at', 'to'],
    answer: 'with',
    answerTranslation: L(
      '저는 여자 형제와 함께 여기 있어요.',
      'Men bu yerda opam yoki singlim bilanman.',
      'I’m here with my sister.',
      'Я здесь с сестрой.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['message', 'with'],
  },

  en_s1u3_n4_067_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She’s here for a conference, but I’m on holiday.',
    audioText: 'She’s here for a conference, but I’m on holiday.',
    answerTranslation: L(
      '그녀는 컨퍼런스 때문에 왔지만 저는 휴가 중이에요.',
      'U konferensiya uchun kelgan, lekin men ta’tildaman.',
      'She’s here for a conference, but I’m on holiday.',
      'Она здесь на конференции, а я в отпуске.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['message', 'conference', 'but'],
  },

  en_s1u3_n4_068_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She’s here for a conference, ___ I’m on holiday.',
    blankAnswers: ['but'],
    options: ['but', 'and', 'from', 'near'],
    answer: 'but',
    answerTranslation: L(
      '그녀는 컨퍼런스 때문에 왔지만 저는 휴가 중이에요.',
      'U konferensiya uchun kelgan, lekin men ta’tildaman.',
      'She’s here for a conference, but I’m on holiday.',
      'Она здесь на конференции, а я в отпуске.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['message', 'but'],
  },

  en_s1u3_n4_069_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Lisbon is beautiful and the people are friendly.',
    audioText: 'Lisbon is beautiful and the people are friendly.',
    answerTranslation: L(
      '리스본은 아름답고 사람들은 친절해요.',
      'Lissabon chiroyli va odamlar mehribon.',
      'Lisbon is beautiful and the people are friendly.',
      'Лиссабон красивый, и люди дружелюбные.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['message', 'and', 'description'],
  },

  en_s1u3_n4_070_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'Lisbon',
      'is',
      'beautiful',
      'and',
      'the',
      'people',
      'are',
      'friendly',
      'but',
    ],
    answer: 'Lisbon is beautiful and the people are friendly',
    answerTranslation: L(
      '리스본은 아름답고 사람들은 친절해요.',
      'Lissabon chiroyli va odamlar mehribon.',
      'Lisbon is beautiful and the people are friendly.',
      'Лиссабон красивый, и люди дружелюбные.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['message', 'and'],
  },

  en_s1u3_n4_071_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Our hotel is near the city centre.',
    audioText: 'Our hotel is near the city centre.',
    answerTranslation: L(
      '우리 호텔은 도심 근처에 있어요.',
      'Mehmonxonamiz shahar markazi yaqinida.',
      'Our hotel is near the city centre.',
      'Наш отель рядом с центром города.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['message', 'hotel', 'location'],
  },

  en_s1u3_n4_072_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Our hotel is ___ the city centre.',
    blankAnswers: ['near'],
    options: ['near', 'from', 'on', 'to'],
    answer: 'near',
    answerTranslation: L(
      '우리 호텔은 도심 근처에 있어요.',
      'Mehmonxonamiz shahar markazi yaqinida.',
      'Our hotel is near the city centre.',
      'Наш отель рядом с центром города.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['message', 'near'],
  },

  en_s1u3_n4_073_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The room is small, but it’s very nice.',
    audioText: 'The room is small, but it’s very nice.',
    answerTranslation: L(
      '방은 작지만 아주 좋아요.',
      'Xona kichik, lekin juda yaxshi.',
      'The room is small, but it’s very nice.',
      'Комната маленькая, но очень хорошая.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['message', 'but', 'room'],
  },

  en_s1u3_n4_074_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['The', 'room', 'is', 'small', 'but', 'nice', 'and'],
    answer: 'The room is small but nice',
    audioText: 'The room is small but nice.',
    answerTranslation: L(
      '방은 작지만 좋아요.',
      'Xona kichik, lekin yaxshi.',
      'The room is small but nice.',
      'Комната маленькая, но хорошая.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['message', 'but'],
  },

  en_s1u3_n4_075_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The food is good and it’s cheap.',
    audioText: 'The food is good and it’s cheap.',
    answerTranslation: L(
      '음식은 맛있고 저렴해요.',
      'Ovqat yaxshi va arzon.',
      'The food is good and it’s cheap.',
      'Еда хорошая и недорогая.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['message', 'and', 'food'],
  },

  en_s1u3_n4_076_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The food is good ___ it’s cheap.',
    blankAnswers: ['and'],
    options: ['and', 'but', 'from', 'at'],
    answer: 'and',
    answerTranslation: L(
      '음식은 맛있고 저렴해요.',
      'Ovqat yaxshi va arzon.',
      'The food is good and it’s cheap.',
      'Еда хорошая и недорогая.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['message', 'and'],
  },

  en_s1u3_n4_077_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Message me soon. Bye for now.',
    audioText: 'Message me soon. Bye for now.',
    answerTranslation: L(
      '곧 메시지해 줘. 일단 안녕.',
      'Tez orada menga yoz. Hozircha xayr.',
      'Message me soon. Bye for now.',
      'Напиши мне скоро. Пока!',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['message', 'ending'],
  },

  en_s1u3_n4_078_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['Message', 'me', 'soon', 'Bye', 'for', 'now', 'Excuse'],
    answer: 'Message me soon Bye for now',
    answerTranslation: L(
      '곧 메시지해 줘. 일단 안녕.',
      'Tez orada menga yoz. Hozircha xayr.',
      'Message me soon. Bye for now.',
      'Напиши мне скоро. Пока!',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['message', 'ending'],
  },

  en_s1u3_n4_079_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Hi, Amir. I’m in Lisbon on holiday. The city is beautiful and our hotel is nice, but our room is small. Message me soon. Bye!',
    audioText:
      'Hi, Amir. I’m in Lisbon on holiday. The city is beautiful and our hotel is nice, but our room is small. Message me soon. Bye!',
    answerTranslation: L(
      '안녕, Amir. 나는 리스본에서 휴가 중이야. 도시는 아름답고 호텔도 좋지만 우리 방은 작아. 곧 메시지해 줘. 안녕!',
      'Salom, Amir. Men Lissabonda ta’tildaman. Shahar chiroyli va mehmonxonamiz yaxshi, lekin xonamiz kichik. Tez orada menga yoz. Xayr!',
      'Hi, Amir. I’m in Lisbon on holiday. The city is beautiful and our hotel is nice, but our room is small. Message me soon. Bye!',
      'Привет, Амир. Я в Лиссабоне в отпуске. Город красивый, и наш отель хороший, но комната маленькая. Напиши мне скоро. Пока!',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['message', 'complete-message'],
  },

  en_s1u3_n4_080_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: L(
      '소셜미디어 메시지의 마지막 문장으로 가장 자연스러운 것을 고르세요.',
      'Ijtimoiy tarmoq xabarining oxiri uchun eng tabiiy jumlani tanlang.',
      'Choose the most natural ending for the social media message.',
      'Выберите наиболее естественное завершение сообщения.',
    ),
    dialogLines: [
      {
        speaker: 'user',
        text: 'Hi, Leo. I’m in Prague with my sister. It’s a lovely city, but it’s cold today. Our hotel is near the centre.',
      },
    ],
    options: [
      'Message me soon. Bye for now!',
      'Excuse me. That’s my seat.',
      'Bless you! Can I sit here?',
      'Yes, of course. Where’s the toilet?',
    ],
    answer: 'Message me soon. Bye for now!',
    answerTranslation: L(
      '곧 메시지해 줘. 일단 안녕!',
      'Tez orada menga yoz. Hozircha xayr!',
      'Message me soon. Bye for now!',
      'Напиши мне скоро. Пока!',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['message', 'ending', 'final'],
  },
};

// ─────────────────────────────────────────────────────────────
// Node 4
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT3_NODE4 = {
  title: L(
    '일상 표현과 메시지',
    'Kundalik iboralar va xabar',
    'Everyday expressions',
    'Повседневные выражения',
  ),
  section: 1,
  unit: 3,
  order: 4,
  isActive: true,

  lessons: [
    {
      title: L(
        '일상에서 자주 쓰는 표현',
        'Kundalik iboralar',
        'Everyday expressions',
        'Повседневные выражения',
      ),
      description: L(
        '감사, 사과, 허락, 자리, 화장실, 재채기처럼 일상에서 바로 쓰는 짧은 표현과 자연스러운 대답을 익혀요.',
        'Rahmat aytish, uzr so‘rash, ruxsat so‘rash, joy, hojatxona va aksirish kabi kundalik vaziyatlarda ishlatiladigan qisqa iboralarni o‘rganasiz.',
        'Learn short everyday expressions for thanks, apologies, permission, seats, directions and other common situations.',
        'Учимся коротким повседневным выражениям для благодарности, извинений, разрешения и других обычных ситуаций.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 1,
      questions: [
        'en_s1u3_n4_001_speaking',
        'en_s1u3_n4_002_speaking',
        'en_s1u3_n4_003_reply_builder',
        'en_s1u3_n4_004_speaking',
        'en_s1u3_n4_005_dialog_complete',
        'en_s1u3_n4_006_speaking',
        'en_s1u3_n4_007_speaking',
        'en_s1u3_n4_008_dialog_complete',
        'en_s1u3_n4_009_speaking',
        'en_s1u3_n4_010_dialog_complete',
        'en_s1u3_n4_011_speaking',
        'en_s1u3_n4_012_speaking',
        'en_s1u3_n4_013_reply_builder',
        'en_s1u3_n4_014_speaking',
        'en_s1u3_n4_015_dialog_complete',
        'en_s1u3_n4_016_speaking',
        'en_s1u3_n4_017_speaking',
        'en_s1u3_n4_018_reply_builder',
        'en_s1u3_n4_019_audio_match',
        'en_s1u3_n4_020_dialog_complete',
      ],
    },

    {
      title: L(
        '정중하게 말하기',
        'Muloyim gapirish',
        'Polite intonation',
        'Вежливая интонация',
      ),
      description: L(
        '같은 표현도 억양에 따라 정중하거나 무례하게 들릴 수 있다는 점을 익히고 자연스러운 정중한 억양으로 반복해 말해요.',
        'Bir xil ibora ohangga qarab muloyim yoki qo‘pol eshitilishini tushunib, tabiiy muloyim ohangda gapirishni mashq qilasiz.',
        'Notice how intonation affects politeness and practise the everyday expressions with natural polite intonation.',
        'Учимся слышать, как интонация влияет на вежливость, и произносить выражения естественно и вежливо.',
      ),
      category: LessonCategory.LISTENING,
      level: LV,
      order: 2,
      questions: [
        'en_s1u3_n4_021_speaking',
        'en_s1u3_n4_022_speaking',
        'en_s1u3_n4_023_fill_in_blank',
        'en_s1u3_n4_024_speaking',
        'en_s1u3_n4_025_dialog_complete',
        'en_s1u3_n4_026_speaking',
        'en_s1u3_n4_027_reply_builder',
        'en_s1u3_n4_028_speaking',
        'en_s1u3_n4_029_speaking',
        'en_s1u3_n4_030_dialog_complete',
        'en_s1u3_n4_031_speaking',
        'en_s1u3_n4_032_reply_builder',
        'en_s1u3_n4_033_speaking',
        'en_s1u3_n4_034_speaking',
        'en_s1u3_n4_035_dialog_complete',
        'en_s1u3_n4_036_speaking',
        'en_s1u3_n4_037_word_arrange',
        'en_s1u3_n4_038_sentence_builder',
        'en_s1u3_n4_039_audio_match',
        'en_s1u3_n4_040_dialog_complete',
      ],
    },

    {
      title: L(
        'and와 but으로 연결하기',
        'and va but bilan bog‘lash',
        'Using and and but',
        'Используем and и but',
      ),
      description: L(
        '비슷한 내용을 추가할 때 and, 서로 대비되는 내용을 연결할 때 but을 사용하고 메시지의 시작과 끝 표현도 익혀요.',
        'O‘xshash fikrlarni qo‘shishda and, qarama-qarshi fikrlarni bog‘lashda but ishlatasiz va xabarni boshlash hamda tugatishni o‘rganasiz.',
        'Use and for similar ideas and but for contrasting ideas, and learn useful openings and endings for messages.',
        'Используем and для похожих идей, but для контраста и учимся начинать и заканчивать сообщения.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 3,
      questions: [
        'en_s1u3_n4_041_speaking',
        'en_s1u3_n4_042_fill_in_blank',
        'en_s1u3_n4_043_speaking',
        'en_s1u3_n4_044_fill_in_blank',
        'en_s1u3_n4_045_speaking',
        'en_s1u3_n4_046_fill_in_blank',
        'en_s1u3_n4_047_speaking',
        'en_s1u3_n4_048_fill_in_blank',
        'en_s1u3_n4_049_speaking',
        'en_s1u3_n4_050_translate_builder',
        'en_s1u3_n4_051_speaking',
        'en_s1u3_n4_052_word_arrange',
        'en_s1u3_n4_053_speaking',
        'en_s1u3_n4_054_fill_in_blank',
        'en_s1u3_n4_055_speaking',
        'en_s1u3_n4_056_fill_in_blank',
        'en_s1u3_n4_057_speaking',
        'en_s1u3_n4_058_fill_in_blank',
        'en_s1u3_n4_059_speaking',
        'en_s1u3_n4_060_sentence_builder',
      ],
    },

    {
      title: L(
        '친구에게 메시지 쓰기',
        'Do‘stga xabar yozish',
        'Writing a social media message',
        'Пишем сообщение другу',
      ),
      description: L(
        '어디에 있는지, 왜 그곳에 있는지, 누구와 함께 있는지, 장소가 어떤지 차례로 말하고 and와 but을 사용해 짧은 여행 메시지를 완성해요.',
        'Qayerdaligingiz, nega u yerda ekaningiz, kim bilan ekaningiz va joy qandayligini aytib, and hamda but bilan qisqa sayohat xabarini yozasiz.',
        'Build a complete informal message about where you are, why you are there, who you are with and what the place is like.',
        'Составляем полное неформальное сообщение: где вы, почему вы там, с кем вы и какое это место.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 4,
      questions: [
        'en_s1u3_n4_061_speaking',
        'en_s1u3_n4_062_fill_in_blank',
        'en_s1u3_n4_063_speaking',
        'en_s1u3_n4_064_translate_builder',
        'en_s1u3_n4_065_speaking',
        'en_s1u3_n4_066_fill_in_blank',
        'en_s1u3_n4_067_speaking',
        'en_s1u3_n4_068_fill_in_blank',
        'en_s1u3_n4_069_speaking',
        'en_s1u3_n4_070_translate_builder',
        'en_s1u3_n4_071_speaking',
        'en_s1u3_n4_072_fill_in_blank',
        'en_s1u3_n4_073_speaking',
        'en_s1u3_n4_074_word_arrange',
        'en_s1u3_n4_075_speaking',
        'en_s1u3_n4_076_fill_in_blank',
        'en_s1u3_n4_077_speaking',
        'en_s1u3_n4_078_translate_builder',
        'en_s1u3_n4_079_speaking',
        'en_s1u3_n4_080_dialog_complete',
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Section 1 · Unit 3 · Node 5
// 3.5 Video + Review
//
// Coverage
// - gadget / gadget-free
// - computer / desk / office
// - collect / collection / collector
// - fridge magnet / comic / doll / box
// - describing possessions:
//   have got / haven't got
//   has got / hasn't got
// - interview questions:
//   Where are you from?
//   What's your job?
//   Have you got ...?
//   Has he/she got ...?
//   Is it big?
//   What objects have you got?
//   Are you happy?
// - listening for key possession information
// - unusual collections
// - Unit 3 cumulative review:
//   adjective + noun
//   opposite adjectives
//   have/has got
//   negatives
//   questions + short answers
//   family
//   possessive determiners
//   possessive 's
//   final 's
//   everyday expressions
//   and / but
//   social-media message correction
//
// 4 lessons × 20 questions = 80
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT3_NODE5_WORDS = [
  {
    code: 'en-technology-gadget',
    english: 'gadget',
    senseKey: 'small-useful-device',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '전자기기; 작은 기기',
      'gadjet; kichik elektron qurilma',
      'a small useful electronic device',
      'гаджет; небольшое электронное устройство',
    ),
    examples: [
      {
        english: 'I haven’t got many gadgets.',
        translations: L(
          '저는 전자기기가 많지 않아요.',
          'Menda ko‘p gadjet yo‘q.',
          'I haven’t got many gadgets.',
          'У меня немного гаджетов.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈɡædʒɪt/',
      ttsText: 'gadget',
    },
    media: {
      emoji: '📱',
      imageUrl: '',
      imageAlt: L(
        '작은 전자기기',
        'kichik elektron qurilma',
        'a small electronic gadget',
        'небольшой электронный гаджет',
      ),
    },
    tags: ['technology', 'possessions'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-gadget-free',
    english: 'gadget-free',
    senseKey: 'without-electronic-gadgets',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '전자기기를 거의 사용하지 않는',
      'gadjetlarsiz',
      'without using electronic gadgets',
      'без гаджетов',
    ),
    examples: [
      {
        english: 'He likes a gadget-free life.',
        translations: L(
          '그는 전자기기 없는 생활을 좋아해요.',
          'U gadjetlarsiz hayotni yoqtiradi.',
          'He likes a gadget-free life.',
          'Ему нравится жизнь без гаджетов.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈɡædʒɪt friː/',
      ttsText: 'gadget-free',
    },
    media: {
      emoji: '📵',
      imageUrl: '',
      imageAlt: L(
        '전자기기가 없는 생활',
        'gadjetlarsiz hayot',
        'a gadget-free life',
        'жизнь без гаджетов',
      ),
    },
    tags: ['technology', 'lifestyle'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-technology-computer',
    english: 'computer',
    senseKey: 'electronic-computing-device',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '컴퓨터',
      'kompyuter',
      'an electronic device used for work and information',
      'компьютер',
    ),
    examples: [
      {
        english: 'Have you got a computer?',
        translations: L(
          '컴퓨터가 있어요?',
          'Kompyuteringiz bormi?',
          'Have you got a computer?',
          'У вас есть компьютер?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/kəmˈpjuːtə/',
      ttsText: 'computer',
    },
    media: {
      emoji: '💻',
      imageUrl: '',
      imageAlt: L('컴퓨터', 'kompyuter', 'a computer', 'компьютер'),
    },
    tags: ['technology', 'possessions'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-object-desk',
    english: 'desk',
    senseKey: 'work-table',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '책상',
      'yozuv stoli',
      'a table used for work or study',
      'письменный стол',
    ),
    examples: [
      {
        english: 'There’s a desk in the office.',
        translations: L(
          '사무실에 책상이 있어요.',
          'Ofisda yozuv stoli bor.',
          'There’s a desk in the office.',
          'В офисе есть письменный стол.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/desk/',
      ttsText: 'desk',
    },
    media: {
      emoji: '🖥️',
      imageUrl: '',
      imageAlt: L('책상', 'yozuv stoli', 'a desk', 'письменный стол'),
    },
    tags: ['objects', 'work'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-collect',
    english: 'collect',
    senseKey: 'bring-together-as-hobby',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '수집하다',
      'to‘plamoq',
      'to bring together objects of the same type as a hobby',
      'коллекционировать',
    ),
    examples: [
      {
        english: 'I collect old postcards.',
        translations: L(
          '저는 오래된 엽서를 수집해요.',
          'Men eski otkritkalarni to‘playman.',
          'I collect old postcards.',
          'Я коллекционирую старые открытки.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/kəˈlekt/',
      ttsText: 'collect',
    },
    media: {
      emoji: '📦',
      imageUrl: '',
      imageAlt: L(
        '여러 물건을 모은 모습',
        'to‘plangan buyumlar',
        'a group of collected objects',
        'собранные предметы',
      ),
    },
    tags: ['collections', 'hobbies'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-collection',
    english: 'collection',
    senseKey: 'group-of-collected-things',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '수집품; 컬렉션',
      'to‘plam',
      'a group of things collected together',
      'коллекция',
    ),
    examples: [
      {
        english: 'She’s got a large collection.',
        translations: L(
          '그녀는 큰 컬렉션을 가지고 있어요.',
          'Uning katta to‘plami bor.',
          'She’s got a large collection.',
          'У неё большая коллекция.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/kəˈlekʃn/',
      ttsText: 'collection',
    },
    media: {
      emoji: '🗃️',
      imageUrl: '',
      imageAlt: L('수집품', 'to‘plam', 'a collection', 'коллекция'),
    },
    tags: ['collections', 'hobbies'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-person-collector',
    english: 'collector',
    senseKey: 'person-who-collects',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '수집가',
      'kolleksioner; to‘plovchi',
      'a person who collects things',
      'коллекционер',
    ),
    examples: [
      {
        english: 'He’s a comic collector.',
        translations: L(
          '그는 만화책 수집가예요.',
          'U komiks to‘plovchisi.',
          'He’s a comic collector.',
          'Он коллекционер комиксов.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/kəˈlektə/',
      ttsText: 'collector',
    },
    media: {
      emoji: '🧑‍收藏',
      imageUrl: '',
      imageAlt: L(
        '수집품을 살펴보는 사람',
        'to‘plamini ko‘rayotgan odam',
        'a collector looking at a collection',
        'коллекционер рассматривает коллекцию',
      ),
    },
    tags: ['collections', 'people'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-object-fridge-magnet',
    english: 'fridge magnet',
    senseKey: 'magnet-for-refrigerator',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '냉장고 자석',
      'muzlatgich magniti',
      'a small magnet placed on a fridge',
      'магнит на холодильник',
    ),
    examples: [
      {
        english: 'She collects fridge magnets.',
        translations: L(
          '그녀는 냉장고 자석을 수집해요.',
          'U muzlatgich magnitlarini to‘playdi.',
          'She collects fridge magnets.',
          'Она коллекционирует магниты на холодильник.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈfrɪdʒ ˌmæɡnət/',
      ttsText: 'fridge magnet',
    },
    media: {
      emoji: '🧲',
      imageUrl: '',
      imageAlt: L(
        '냉장고에 붙은 자석',
        'muzlatgichdagi magnit',
        'a fridge magnet',
        'магнит на холодильнике',
      ),
    },
    tags: ['collections', 'objects'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-media-comic',
    english: 'comic',
    senseKey: 'comic-book',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '만화책',
      'komiks',
      'a book or magazine telling a story with pictures',
      'комикс',
    ),
    examples: [
      {
        english: 'He’s got a box of comics.',
        translations: L(
          '그는 만화책 한 상자를 가지고 있어요.',
          'Uning bir quti komiksi bor.',
          'He’s got a box of comics.',
          'У него коробка комиксов.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkɒmɪk/',
      ttsText: 'comic',
    },
    media: {
      emoji: '📚',
      imageUrl: '',
      imageAlt: L('만화책', 'komiks', 'a comic', 'комикс'),
    },
    tags: ['collections', 'reading'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-toy-doll',
    english: 'doll',
    senseKey: 'toy-person',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '인형',
      'qo‘g‘irchoq',
      'a toy that looks like a person',
      'кукла',
    ),
    examples: [
      {
        english: 'She’s got twenty dolls.',
        translations: L(
          '그녀는 인형 스무 개를 가지고 있어요.',
          'Uning yigirmata qo‘g‘irchog‘i bor.',
          'She’s got twenty dolls.',
          'У неё двадцать кукол.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/dɒl/',
      ttsText: 'doll',
    },
    media: {
      emoji: '🪆',
      imageUrl: '',
      imageAlt: L('인형', 'qo‘g‘irchoq', 'a doll', 'кукла'),
    },
    tags: ['collections', 'toys'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-object-box',
    english: 'box',
    senseKey: 'container-with-sides',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('상자', 'quti', 'a container with flat sides', 'коробка'),
    examples: [
      {
        english: 'The comics are in boxes.',
        translations: L(
          '만화책들은 상자 안에 있어요.',
          'Komikslar qutilarda.',
          'The comics are in boxes.',
          'Комиксы находятся в коробках.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/bɒks/',
      ttsText: 'box',
    },
    media: {
      emoji: '📦',
      imageUrl: '',
      imageAlt: L('상자', 'quti', 'a box', 'коробка'),
    },
    tags: ['objects', 'collections'],
    difficulty: 1,
    isCore: true,
  },
];

export const EN_S1_UNIT3_NODE5_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · A gadget-free life
  // ===========================================================

  en_s1u3_n5_001_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Gadget.',
    audioText: 'Gadget.',
    answerTranslation: L('전자기기.', 'Gadjet.', 'Gadget.', 'Гаджет.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['gadget', 'technology'],
  },

  en_s1u3_n5_002_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      { korean: 'computer', native: 'kompyuter' },
      { korean: 'mobile phone', native: 'mobil telefon' },
      { korean: 'television', native: 'televizor' },
      { korean: 'desk', native: 'yozuv stoli' },
      { korean: 'car', native: 'mashina' },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['technology', 'possessions'],
  },

  en_s1u3_n5_003_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'He hasn’t got a computer.',
    audioText: 'He hasn’t got a computer.',
    answerTranslation: L(
      '그는 컴퓨터가 없어요.',
      'Uning kompyuteri yo‘q.',
      'He hasn’t got a computer.',
      'У него нет компьютера.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['gadget-free', 'hasnt-got'],
  },

  en_s1u3_n5_004_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'He ___ got a computer.',
    blankAnswers: ['hasn’t'],
    options: ['hasn’t', 'haven’t', 'has', 'is'],
    answer: 'hasn’t',
    answerTranslation: L(
      '그는 컴퓨터가 없어요.',
      'Uning kompyuteri yo‘q.',
      'He hasn’t got a computer.',
      'У него нет компьютера.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['hasnt-got', 'computer'],
  },

  en_s1u3_n5_005_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'He’s got a phone.',
    audioText: 'He’s got a phone.',
    answerTranslation: L(
      '그는 휴대전화가 있어요.',
      'Uning telefoni bor.',
      'He’s got a phone.',
      'У него есть телефон.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['has-got', 'phone'],
  },

  en_s1u3_n5_006_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Has he got a phone?',
    options: ['Yes', 'he', 'has', 'haven’t', 'they', 'phone'],
    answer: 'Yes he has',
    answerTranslation: L('네, 있어요.', 'Ha, bor.', 'Yes, he has.', 'Да.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['has-got', 'short-answer'],
  },

  en_s1u3_n5_007_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'He hasn’t got a television.',
    audioText: 'He hasn’t got a television.',
    answerTranslation: L(
      '그는 텔레비전이 없어요.',
      'Uning televizori yo‘q.',
      'He hasn’t got a television.',
      'У него нет телевизора.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['gadget-free', 'television'],
  },

  en_s1u3_n5_008_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Has he got a television?' }],
    options: [
      'No, he hasn’t.',
      'No, he haven’t.',
      'No, he isn’t.',
      'No, they haven’t.',
    ],
    answer: 'No, he hasn’t.',
    answerTranslation: L('아니요, 없어요.', 'Yo‘q.', 'No, he hasn’t.', 'Нет.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['has-got', 'short-answer'],
  },

  en_s1u3_n5_009_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'He works in an office at home.',
    audioText: 'He works in an office at home.',
    answerTranslation: L(
      '그는 집에 있는 사무실에서 일해요.',
      'U uyidagi ofisda ishlaydi.',
      'He works in an office at home.',
      'Он работает в домашнем офисе.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['office', 'home'],
  },

  en_s1u3_n5_010_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'There’s a ___ in his office.',
    blankAnswers: ['desk'],
    options: ['desk', 'collector', 'family', 'village'],
    answer: 'desk',
    answerTranslation: L(
      '그의 사무실에는 책상이 있어요.',
      'Uning ofisida yozuv stoli bor.',
      'There’s a desk in his office.',
      'В его офисе есть письменный стол.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['desk', 'office'],
  },

  en_s1u3_n5_011_speaking: {
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
    tags: ['interview', 'where'],
  },

  en_s1u3_n5_012_speaking: {
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
    tags: ['interview', 'job'],
  },

  en_s1u3_n5_013_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['Have', 'you', 'got', 'a', 'computer', 'Has', 'phone'],
    answer: 'Have you got a computer',
    audioText: 'Have you got a computer?',
    answerTranslation: L(
      '컴퓨터가 있어요?',
      'Kompyuteringiz bormi?',
      'Have you got a computer?',
      'У вас есть компьютер?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['interview', 'have-got'],
  },

  en_s1u3_n5_014_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Have you got a computer?',
    audioText: 'Have you got a computer?',
    answerTranslation: L(
      '컴퓨터가 있어요?',
      'Kompyuteringiz bormi?',
      'Have you got a computer?',
      'У вас есть компьютер?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['interview', 'computer'],
  },

  en_s1u3_n5_015_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Have you got a car?',
    audioText: 'Have you got a car?',
    answerTranslation: L(
      '자동차가 있어요?',
      'Mashinangiz bormi?',
      'Have you got a car?',
      'У вас есть машина?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['interview', 'car'],
  },

  en_s1u3_n5_016_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Have you got a car?',
    options: ['No', 'I', 'haven’t', 'hasn’t', 'Yes', 'car'],
    answer: 'No I haven’t',
    answerTranslation: L('아니요, 없어요.', 'Yo‘q.', 'No, I haven’t.', 'Нет.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['interview', 'short-answer'],
  },

  en_s1u3_n5_017_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Is your office big?',
    audioText: 'Is your office big?',
    answerTranslation: L(
      '사무실이 커요?',
      'Ofisingiz kattami?',
      'Is your office big?',
      'Ваш офис большой?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['interview', 'office', 'big'],
  },

  en_s1u3_n5_018_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['What', 'objects', 'have', 'you', 'got', 'office', 'has'],
    answer: 'What objects have you got',
    answerTranslation: L(
      '어떤 물건을 가지고 있어요?',
      'Qanday buyumlaringiz bor?',
      'What objects have you got?',
      'Какие вещи у вас есть?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['interview', 'possessions'],
  },

  en_s1u3_n5_019_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Are you happy with your life?',
    audioText: 'Are you happy with your life?',
    answerTranslation: L(
      '지금 생활에 만족하고 행복해요?',
      'Hayotingizdan xursandmisiz?',
      'Are you happy with your life?',
      'Вы довольны своей жизнью?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['interview', 'happy'],
  },

  en_s1u3_n5_020_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Have you got many gadgets?' },
      { speaker: 'user', text: 'No. I haven’t got a computer or a TV.' },
      { speaker: 'npc', text: 'Have you got a phone?' },
    ],
    options: ['Yes, I have.', 'Yes, I has.', 'Yes, it have.', 'Yes, I am.'],
    answer: 'Yes, I have.',
    answerTranslation: L('네, 있어요.', 'Ha, bor.', 'Yes, I have.', 'Да.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['gadget-free', 'interview', 'final'],
  },

  // ===========================================================
  // Lesson 2 · Unusual collections
  // ===========================================================

  en_s1u3_n5_021_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Collect.',
    audioText: 'Collect.',
    answerTranslation: L(
      '수집하다.',
      'To‘plamoq.',
      'Collect.',
      'Коллекционировать.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['collections', 'collect'],
  },

  en_s1u3_n5_022_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Collection.',
    audioText: 'Collection.',
    answerTranslation: L(
      '컬렉션; 수집품.',
      'To‘plam.',
      'Collection.',
      'Коллекция.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['collections', 'collection'],
  },

  en_s1u3_n5_023_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Collector.',
    audioText: 'Collector.',
    answerTranslation: L(
      '수집가.',
      'To‘plovchi.',
      'Collector.',
      'Коллекционер.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['collections', 'collector'],
  },

  en_s1u3_n5_024_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      { korean: 'collect', native: 'to‘plamoq' },
      { korean: 'collection', native: 'to‘plam' },
      { korean: 'collector', native: 'to‘plovchi' },
      { korean: 'fridge magnet', native: 'muzlatgich magniti' },
      { korean: 'doll', native: 'qo‘g‘irchoq' },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['collections', 'matching'],
  },

  en_s1u3_n5_025_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She collects fridge magnets.',
    audioText: 'She collects fridge magnets.',
    answerTranslation: L(
      '그녀는 냉장고 자석을 수집해요.',
      'U muzlatgich magnitlarini to‘playdi.',
      'She collects fridge magnets.',
      'Она коллекционирует магниты на холодильник.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['collections', 'fridge-magnets'],
  },

  en_s1u3_n5_026_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She’s a magnet ___.',
    blankAnswers: ['collector'],
    options: ['collector', 'collection', 'collect', 'computer'],
    answer: 'collector',
    answerTranslation: L(
      '그녀는 자석 수집가예요.',
      'U magnit to‘plovchisi.',
      'She’s a magnet collector.',
      'Она коллекционер магнитов.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['collector', 'word-family'],
  },

  en_s1u3_n5_027_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'He’s got a large comic collection.',
    audioText: 'He’s got a large comic collection.',
    answerTranslation: L(
      '그는 큰 만화책 컬렉션을 가지고 있어요.',
      'Uning katta komiks to‘plami bor.',
      'He’s got a large comic collection.',
      'У него большая коллекция комиксов.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['collections', 'comics'],
  },

  en_s1u3_n5_028_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'He’s got a comic ___.',
    blankAnswers: ['collection'],
    options: ['collection', 'collector', 'collect', 'desk'],
    answer: 'collection',
    answerTranslation: L(
      '그는 만화책 컬렉션을 가지고 있어요.',
      'Uning komiks to‘plami bor.',
      'He’s got a comic collection.',
      'У него коллекция комиксов.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['collection', 'word-family'],
  },

  en_s1u3_n5_029_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She’s got a lot of dolls.',
    audioText: 'She’s got a lot of dolls.',
    answerTranslation: L(
      '그녀는 인형을 많이 가지고 있어요.',
      'Uning ko‘p qo‘g‘irchoqlari bor.',
      'She’s got a lot of dolls.',
      'У неё много кукол.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['collections', 'dolls'],
  },

  en_s1u3_n5_030_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      { korean: 'fridge magnets', native: 'muzlatgich magnitlari' },
      { korean: 'comics', native: 'komikslar' },
      { korean: 'dolls', native: 'qo‘g‘irchoqlar' },
      { korean: 'collection', native: 'to‘plam' },
      { korean: 'collector', native: 'to‘plovchi' },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['collections', 'listening'],
  },

  en_s1u3_n5_031_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The magnets are on the fridge.',
    audioText: 'The magnets are on the fridge.',
    answerTranslation: L(
      '자석들은 냉장고에 붙어 있어요.',
      'Magnitlar muzlatgichda.',
      'The magnets are on the fridge.',
      'Магниты находятся на холодильнике.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['collections', 'location'],
  },

  en_s1u3_n5_032_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The magnets are ___ the fridge.',
    blankAnswers: ['on'],
    options: ['on', 'in', 'from', 'to'],
    answer: 'on',
    answerTranslation: L(
      '자석들은 냉장고에 붙어 있어요.',
      'Magnitlar muzlatgichda.',
      'The magnets are on the fridge.',
      'Магниты находятся на холодильнике.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['collections', 'on'],
  },

  en_s1u3_n5_033_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The comics are in boxes.',
    audioText: 'The comics are in boxes.',
    answerTranslation: L(
      '만화책들은 상자 안에 있어요.',
      'Komikslar qutilarda.',
      'The comics are in boxes.',
      'Комиксы находятся в коробках.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['collections', 'boxes'],
  },

  en_s1u3_n5_034_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['The', 'comics', 'are', 'in', 'boxes', 'on', 'fridge'],
    answer: 'The comics are in boxes',
    audioText: 'The comics are in boxes.',
    answerTranslation: L(
      '만화책들은 상자 안에 있어요.',
      'Komikslar qutilarda.',
      'The comics are in boxes.',
      'Комиксы находятся в коробках.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['collections', 'location'],
  },

  en_s1u3_n5_035_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Have you got a collection?',
    audioText: 'Have you got a collection?',
    answerTranslation: L(
      '수집하는 게 있어요?',
      'To‘plamingiz bormi?',
      'Have you got a collection?',
      'У вас есть коллекция?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['collections', 'question'],
  },

  en_s1u3_n5_036_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Have you got a collection?',
    options: ['Yes', 'I', 'have', 'I’ve', 'got', 'comics'],
    answer: 'Yes I have',
    answerTranslation: L('네, 있어요.', 'Ha, bor.', 'Yes, I have.', 'Да.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['collections', 'short-answer'],
  },

  en_s1u3_n5_037_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I collect old postcards.',
    audioText: 'I collect old postcards.',
    answerTranslation: L(
      '저는 오래된 엽서를 수집해요.',
      'Men eski otkritkalarni to‘playman.',
      'I collect old postcards.',
      'Я коллекционирую старые открытки.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['collections', 'collect'],
  },

  en_s1u3_n5_038_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['I', 'collect', 'old', 'postcards', 'collector', 'dolls', 'got'],
    answer: 'I collect old postcards',
    answerTranslation: L(
      '저는 오래된 엽서를 수집해요.',
      'Men eski otkritkalarni to‘playman.',
      'I collect old postcards.',
      'Я коллекционирую старые открытки.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['collections', 'collect'],
  },

  en_s1u3_n5_039_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'My friend has got a small collection of toy cars.',
    audioText: 'My friend has got a small collection of toy cars.',
    answerTranslation: L(
      '제 친구에게는 작은 장난감 자동차 컬렉션이 있어요.',
      'Do‘stimning kichik o‘yinchoq mashinalar to‘plami bor.',
      'My friend has got a small collection of toy cars.',
      'У моего друга небольшая коллекция игрушечных машин.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['collections', 'friend'],
  },

  en_s1u3_n5_040_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Have you got a collection?' },
      { speaker: 'user', text: 'Yes. I collect postcards.' },
      { speaker: 'npc', text: 'Where are they from?' },
    ],
    options: [
      'They’re from different countries.',
      'It’s a collector.',
      'They has got countries.',
      'I’m from a collection.',
    ],
    answer: 'They’re from different countries.',
    answerTranslation: L(
      '여러 나라에서 온 것들이에요.',
      'Ular turli mamlakatlardan.',
      'They’re from different countries.',
      'Они из разных стран.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['collections', 'listening-for-pleasure', 'final'],
  },

  // ===========================================================
  // Lesson 3 · Unit 3 grammar review
  // ===========================================================

  en_s1u3_n5_041_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'A clever man.',
    audioText: 'A clever man.',
    answerTranslation: L(
      '똑똑한 남자.',
      'Aqlli erkak.',
      'A clever man.',
      'Умный мужчина.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'adjective-noun'],
  },

  en_s1u3_n5_042_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '영어의 올바른 형용사 + 명사 순서를 고르세요.',
      'Ingliz tilidagi to‘g‘ri sifat + ot tartibini tanlang.',
      'Choose the correct adjective + noun order.',
      'Выберите правильный порядок прилагательное + существительное.',
    ),
    sentenceTemplate: 'a ___ man',
    blankAnswers: ['clever'],
    options: ['clever', 'man clever', 'cleverly', 'is clever'],
    answer: 'clever',
    answerTranslation: L(
      '똑똑한 남자',
      'aqlli erkak',
      'a clever man',
      'умный мужчина',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'adjective-noun'],
  },

  en_s1u3_n5_043_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Friendly neighbours.',
    audioText: 'Friendly neighbours.',
    answerTranslation: L(
      '친절한 이웃들.',
      'Mehribon qo‘shnilar.',
      'Friendly neighbours.',
      'Дружелюбные соседи.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'adjective-noun'],
  },

  en_s1u3_n5_044_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      'old의 반대말을 고르세요.',
      'old so‘zining teskarisini tanlang.',
      'Choose the opposite of old for an object.',
      'Выберите антоним old для предмета.',
    ),
    sentenceTemplate: 'old ↔ ___',
    blankAnswers: ['new'],
    options: ['new', 'young', 'poor', 'hot'],
    answer: 'new',
    answerTranslation: L('old ↔ new', 'old ↔ new', 'old ↔ new', 'old ↔ new'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['review', 'opposites'],
  },

  en_s1u3_n5_045_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '반대되는 형용사를 연결하세요.',
      'Qarama-qarshi sifatlarni ulang.',
      'Match the opposite adjectives.',
      'Соедините противоположные прилагательные.',
    ),
    pairs: [
      { korean: 'big', native: 'small' },
      { korean: 'rich', native: 'poor' },
      { korean: 'expensive', native: 'cheap' },
      { korean: 'happy', native: 'sad' },
      { korean: 'hot', native: 'cold' },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['review', 'opposites'],
  },

  en_s1u3_n5_046_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I’ve got a new bicycle.',
    audioText: 'I’ve got a new bicycle.',
    answerTranslation: L(
      '저는 새 자전거가 있어요.',
      'Mening yangi velosipedim bor.',
      'I’ve got a new bicycle.',
      'У меня новый велосипед.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'have-got', 'new'],
  },

  en_s1u3_n5_047_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'They’ve got a small house.',
    audioText: 'They’ve got a small house.',
    answerTranslation: L(
      '그들은 작은 집이 있어요.',
      'Ularning kichik uyi bor.',
      'They’ve got a small house.',
      'У них маленький дом.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'have-got', 'small'],
  },

  en_s1u3_n5_048_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ you and Maya got pets?',
    blankAnswers: ['Have'],
    options: ['Have', 'Has', 'Are', 'Is'],
    answer: 'Have',
    answerTranslation: L(
      '당신과 Maya는 반려동물이 있어요?',
      'Siz va Mayaning uy hayvonlaringiz bormi?',
      'Have you and Maya got pets?',
      'У вас с Майей есть питомцы?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'have-got', 'question'],
  },

  en_s1u3_n5_049_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Have you and Maya got pets?' }],
    options: [
      'No, we haven’t.',
      'No, we hasn’t.',
      'No, we aren’t got.',
      'No, she hasn’t.',
    ],
    answer: 'No, we haven’t.',
    answerTranslation: L(
      '아니요, 없어요.',
      'Yo‘q, bizda yo‘q.',
      'No, we haven’t.',
      'Нет.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'short-answer'],
  },

  en_s1u3_n5_050_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'My mother has got three cats.',
    audioText: 'My mother has got three cats.',
    answerTranslation: L(
      '제 어머니는 고양이가 세 마리 있어요.',
      'Onamning uchta mushugi bor.',
      'My mother has got three cats.',
      'У моей мамы три кошки.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'has-got'],
  },

  en_s1u3_n5_051_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'My mother ___ got three cats.',
    blankAnswers: ['has'],
    options: ['has', 'have', 'hasn’t', 'is'],
    answer: 'has',
    answerTranslation: L(
      '제 어머니는 고양이가 세 마리 있어요.',
      'Onamning uchta mushugi bor.',
      'My mother has got three cats.',
      'У моей мамы три кошки.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'has-got'],
  },

  en_s1u3_n5_052_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Has she got a big house?',
    audioText: 'Has she got a big house?',
    answerTranslation: L(
      '그녀는 큰 집이 있어요?',
      'Uning katta uyi bormi?',
      'Has she got a big house?',
      'У неё большой дом?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'has-got', 'question'],
  },

  en_s1u3_n5_053_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Has she got a big house?',
    options: ['No', 'she', 'hasn’t', 'haven’t', 'Yes', 'house'],
    answer: 'No she hasn’t',
    answerTranslation: L('아니요, 없어요.', 'Yo‘q.', 'No, she hasn’t.', 'Нет.'),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'short-answer'],
  },

  en_s1u3_n5_054_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'It’s a small house, but it’s got a garden.',
    audioText: 'It’s a small house, but it’s got a garden.',
    answerTranslation: L(
      '작은 집이지만 정원이 있어요.',
      'Uy kichik, lekin uning bog‘i bor.',
      'It’s a small house, but it’s got a garden.',
      'Дом маленький, но у него есть сад.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'has-got', 'but'],
  },

  en_s1u3_n5_055_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'My parents ___ got a car.',
    blankAnswers: ['haven’t'],
    options: ['haven’t', 'hasn’t', 'isn’t', 'has'],
    answer: 'haven’t',
    answerTranslation: L(
      '제 부모님은 자동차가 없어요.',
      'Ota-onamning mashinasi yo‘q.',
      'My parents haven’t got a car.',
      'У моих родителей нет машины.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'negative'],
  },

  en_s1u3_n5_056_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'My brother hasn’t got a car.',
    audioText: 'My brother hasn’t got a car.',
    answerTranslation: L(
      '제 형제는 자동차가 없어요.',
      'Akam yoki ukamning mashinasi yo‘q.',
      'My brother hasn’t got a car.',
      'У моего брата нет машины.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'negative'],
  },

  en_s1u3_n5_057_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Lina is Omar’s wife.',
    audioText: 'Lina is Omar’s wife.',
    answerTranslation: L(
      'Lina는 Omar의 아내예요.',
      'Lina Omarning rafiqasi.',
      'Lina is Omar’s wife.',
      'Лина — жена Омара.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'possessive-s'],
  },

  en_s1u3_n5_058_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Lina is Omar___ wife.',
    blankAnswers: ['’s'],
    options: ['’s', '’ve', '’re', 's'],
    answer: '’s',
    answerTranslation: L(
      'Lina는 Omar의 아내예요.',
      'Lina Omarning rafiqasi.',
      'Lina is Omar’s wife.',
      'Лина — жена Омара.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'possessive-s'],
  },

  en_s1u3_n5_059_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Omar and Lina’s children are young.',
    audioText: 'Omar and Lina’s children are young.',
    answerTranslation: L(
      'Omar와 Lina의 아이들은 어려요.',
      'Omar va Linaning bolalari yosh.',
      'Omar and Lina’s children are young.',
      'Дети Омара и Лины маленькие.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'possessive-s', 'family'],
  },

  en_s1u3_n5_060_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'My neighbours have got a friendly dog.',
    audioText: 'My neighbours have got a friendly dog.',
    answerI18n: L(
      '제 이웃들은 친근한 개를 한 마리 키워요',
      'Qo‘shnilarimning do‘stona iti bor',
      'My neighbours have got a friendly dog',
      'У моих соседей дружелюбная собака',
    ),
    options: ['My', 'neighbours', 'have', 'got', 'a', 'friendly', 'dog', 'has'],
    optionsI18n: {
      ko: ['제', '이웃들은', '친근한', '개가', '있어요'],
      uz: ['Qo‘shnilarimning', 'do‘stona', 'iti', 'bor'],
      en: ['My', 'neighbours', 'have', 'got', 'a', 'friendly', 'dog'],
      ru: ['У', 'моих', 'соседей', 'дружелюбная', 'собака'],
    },
    answerTranslation: L(
      '제 이웃들은 친근한 개가 한 마리 있어요.',
      'Qo‘shnilarimning do‘stona iti bor.',
      'My neighbours have got a friendly dog.',
      'У моих соседей дружелюбная собака.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['review', 'have-got', 'adjective-noun'],
  },

  // ===========================================================
  // Lesson 4 · Functional language + writing review
  // ===========================================================

  en_s1u3_n5_061_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Bless you!',
    audioText: 'Bless you!',
    answerTranslation: L(
      '재채기했을 때 하는 표현.',
      'Aksirganda aytiladigan ibora.',
      'Bless you!',
      'Будьте здоровы!',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'everyday-expressions'],
  },

  en_s1u3_n5_062_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Coffee?' }],
    options: [
      'Yes, please.',
      'Bless you!',
      "Sorry, I don't know.",
      "That's OK. Don't worry.",
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
    tags: ['review', 'everyday-expressions'],
  },

  en_s1u3_n5_063_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Excuse me. Where’s the office?',
    audioText: 'Excuse me. Where’s the office?',
    answerTranslation: L(
      '실례합니다. 사무실이 어디예요?',
      'Kechirasiz. Ofis qayerda?',
      'Excuse me. Where’s the office?',
      'Извините. Где офис?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'everyday-expressions'],
  },

  en_s1u3_n5_064_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Excuse me. Where’s the office?',
    options: ['Sorry', 'I', 'don’t', 'know', 'Yes', 'please'],
    answer: 'Sorry I don’t know',
    answerTranslation: L(
      '미안하지만 모르겠어요.',
      'Kechirasiz, bilmayman.',
      'Sorry, I don’t know.',
      'Извините, я не знаю.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'everyday-expressions'],
  },

  en_s1u3_n5_065_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Can I sit here?',
    audioText: 'Can I sit here?',
    answerTranslation: L(
      '여기 앉아도 돼요?',
      'Bu yerga o‘tirsam bo‘ladimi?',
      'Can I sit here?',
      'Можно здесь сесть?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'permission'],
  },

  en_s1u3_n5_066_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Can I sit here?' }],
    options: [
      'Yes, of course.',
      "You're welcome.",
      'Bless you!',
      "Sorry, I'm late.",
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
    tags: ['review', 'permission'],
  },

  en_s1u3_n5_067_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Thank you. You’re welcome.',
    audioText: 'Thank you. You’re welcome.',
    answerTranslation: L(
      '고마워요. 천만에요.',
      'Rahmat. Arzimaydi.',
      'Thank you. You’re welcome.',
      'Спасибо. Пожалуйста.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'thanks'],
  },

  en_s1u3_n5_068_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: "Sorry, I'm late." }],
    options: [
      "That's OK. Don't worry.",
      'Yes, please.',
      "You're welcome.",
      'After you.',
    ],
    answer: "That's OK. Don't worry.",
    answerTranslation: L(
      '괜찮아요. 걱정하지 마세요.',
      'Mayli. Xavotir olmang.',
      "That's OK. Don't worry.",
      'Всё нормально. Не беспокойтесь.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'sorry'],
  },

  en_s1u3_n5_069_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I hope you’re well.',
    audioText: 'I hope you’re well.',
    answerTranslation: L(
      '잘 지내고 있길 바라.',
      'Yaxshi yuribsan degan umiddaman.',
      'I hope you’re well.',
      'Надеюсь, у тебя всё хорошо.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'message', 'opening'],
  },

  en_s1u3_n5_070_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '비슷한 두 정보를 연결하세요.',
      'Ikki o‘xshash fikrni bog‘lang.',
      'Join the two similar ideas.',
      'Соедините две похожие идеи.',
    ),
    sentenceTemplate: 'The hotel is nice ___ the room is big.',
    blankAnswers: ['and'],
    options: ['and', 'but', 'from', 'to'],
    answer: 'and',
    answerTranslation: L(
      '호텔은 좋고 방은 커요.',
      'Mehmonxona yaxshi va xona katta.',
      'The hotel is nice and the room is big.',
      'Отель хороший, и комната большая.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'and'],
  },

  en_s1u3_n5_071_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The city is beautiful, but it’s expensive.',
    audioText: 'The city is beautiful, but it’s expensive.',
    answerTranslation: L(
      '도시는 아름답지만 비싸요.',
      'Shahar chiroyli, lekin qimmat.',
      'The city is beautiful, but it’s expensive.',
      'Город красивый, но дорогой.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'but'],
  },

  en_s1u3_n5_072_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '대비되는 두 정보를 연결하세요.',
      'Ikki qarama-qarshi fikrni bog‘lang.',
      'Join the two contrasting ideas.',
      'Соедините две противоположные идеи.',
    ),
    sentenceTemplate: 'My job is hard, ___ I’m happy.',
    blankAnswers: ['but'],
    options: ['but', 'and', 'near', 'at'],
    answer: 'but',
    answerTranslation: L(
      '제 일은 힘들지만 행복해요.',
      'Ishim qiyin, lekin men xursandman.',
      'My job is hard, but I’m happy.',
      'Моя работа трудная, но я счастлив.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'but'],
  },

  en_s1u3_n5_073_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I’m in Rome for a week.',
    audioText: 'I’m in Rome for a week.',
    answerTranslation: L(
      '저는 일주일 동안 로마에 있어요.',
      'Men Rimda bir haftaga keldim.',
      'I’m in Rome for a week.',
      'Я в Риме на неделю.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'message', 'location'],
  },

  en_s1u3_n5_074_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '장소 앞에 알맞은 전치사를 고르세요.',
      'Joy oldidan to‘g‘ri predlogni tanlang.',
      'Choose the correct preposition before the place.',
      'Выберите правильный предлог перед местом.',
    ),
    sentenceTemplate: 'I’m ___ Rome for a week.',
    blankAnswers: ['in'],
    options: ['in', 'at', 'on', 'from'],
    answer: 'in',
    answerTranslation: L(
      '저는 일주일 동안 로마에 있어요.',
      'Men Rimda bir haftaga keldim.',
      'I’m in Rome for a week.',
      'Я в Риме на неделю.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'message', 'preposition'],
  },

  en_s1u3_n5_075_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I’m here for a conference.',
    audioText: 'I’m here for a conference.',
    answerTranslation: L(
      '저는 컨퍼런스 때문에 여기 있어요.',
      'Men bu yerga konferensiya uchun kelganman.',
      'I’m here for a conference.',
      'Я здесь на конференции.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'message', 'conference'],
  },

  en_s1u3_n5_076_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '주어와 맞는 be동사를 고르세요.',
      'Ega bilan mos be fe’lini tanlang.',
      'Choose the correct form of be.',
      'Выберите правильную форму be.',
    ),
    sentenceTemplate: 'The food ___ great.',
    blankAnswers: ['is'],
    options: ['is', 'are', 'am', 'have'],
    answer: 'is',
    answerTranslation: L(
      '음식이 훌륭해요.',
      'Ovqat ajoyib.',
      'The food is great.',
      'Еда отличная.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'message', 'be'],
  },

  en_s1u3_n5_077_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      'we와 맞는 be동사를 고르세요.',
      'we bilan mos be fe’lini tanlang.',
      'Choose the correct form of be with we.',
      'Выберите правильную форму be с we.',
    ),
    sentenceTemplate: 'We ___ in the same hotel.',
    blankAnswers: ['are'],
    options: ['are', 'is', 'am', 'has'],
    answer: 'are',
    answerTranslation: L(
      '우리는 같은 호텔에 있어요.',
      'Biz bir xil mehmonxonadamiz.',
      'We are in the same hotel.',
      'Мы в одном отеле.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'message', 'be'],
  },

  en_s1u3_n5_078_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      'he와 맞는 have got 형태를 고르세요.',
      'he bilan mos have got shaklini tanlang.',
      'Choose the correct have got form with he.',
      'Выберите правильную форму have got с he.',
    ),
    sentenceTemplate: 'He ___ got a room next to mine.',
    blankAnswers: ['has'],
    options: ['has', 'have', 'are', 'am'],
    answer: 'has',
    answerTranslation: L(
      '그는 제 방 옆에 방이 있어요.',
      'Uning mening xonam yonida xonasi bor.',
      'He has got a room next to mine.',
      'У него комната рядом с моей.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'message', 'has-got'],
  },

  en_s1u3_n5_079_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Hi, Lena. I’m in Madrid for three days. I’m here with my brother. The city is beautiful and our hotel is nice, but our room is small. Message me soon. Bye!',
    audioText:
      'Hi, Lena. I’m in Madrid for three days. I’m here with my brother. The city is beautiful and our hotel is nice, but our room is small. Message me soon. Bye!',
    answerTranslation: L(
      '안녕, Lena. 나는 사흘 동안 마드리드에 있어. 형제와 함께 왔어. 도시는 아름답고 호텔도 좋지만 방은 작아. 곧 메시지해 줘. 안녕!',
      'Salom, Lena. Men Madridda uch kunman. Akam yoki ukam bilanman. Shahar chiroyli va mehmonxonamiz yaxshi, lekin xonamiz kichik. Tez orada yoz. Xayr!',
      'Hi, Lena. I’m in Madrid for three days. I’m here with my brother. The city is beautiful and our hotel is nice, but our room is small. Message me soon. Bye!',
      'Привет, Лена. Я в Мадриде на три дня. Я здесь с братом. Город красивый, и отель хороший, но комната маленькая. Напиши мне скоро. Пока!',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'message', 'complete-message'],
  },

  en_s1u3_n5_080_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: L(
      'Unit 3에서 배운 내용으로 가장 자연스러운 마지막 답을 고르세요.',
      'Unit 3 da o‘rganganlaringiz asosida eng tabiiy oxirgi javobni tanlang.',
      'Choose the most natural final reply using Unit 3 language.',
      'Выберите наиболее естественный итоговый ответ, используя материал Unit 3.',
    ),
    dialogLines: [
      { speaker: 'npc', text: 'Have you got any brothers or sisters?' },
      { speaker: 'user', text: 'Yes. I’ve got one sister.' },
      { speaker: 'npc', text: 'What’s her name?' },
      { speaker: 'user', text: 'Her name’s Mia.' },
      { speaker: 'npc', text: 'Has she got a family?' },
    ],
    options: [
      'Yes, she has. She’s got a husband and two children.',
      'Yes, she have. Her got a husband and two children.',
      'Yes, she is. They has two child.',
      'Yes, I has. She are married.',
    ],
    answer: 'Yes, she has. She’s got a husband and two children.',
    answerTranslation: L(
      '네. 남편과 아이 둘이 있어요.',
      'Ha. Uning eri va ikki farzandi bor.',
      'Yes, she has. She’s got a husband and two children.',
      'Да. У неё есть муж и двое детей.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'family', 'has-got', 'final'],
  },
};

// ─────────────────────────────────────────────────────────────
// Node 5
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT3_NODE5 = {
  title: L(
    '전자기기와 수집품',
    'Gadjetlar va to‘plamlar',
    'Gadgets and collections',
    'Гаджеты и коллекции',
  ),
  section: 1,
  unit: 3,
  order: 5,
  isActive: true,

  lessons: [
    {
      title: L(
        '전자기기 없는 생활',
        'Gadjetlarsiz hayot',
        'A gadget-free life',
        'Жизнь без гаджетов',
      ),
      description: L(
        '컴퓨터, 휴대전화, 텔레비전, 자동차 같은 소유물을 have got과 haven’t got으로 말하고 간단한 인터뷰 질문을 만들어요.',
        'Kompyuter, telefon, televizor va mashina kabi buyumlar haqida have got va haven’t got bilan gapirib, oddiy intervyu savollarini tuzasiz.',
        'Talk about gadgets and possessions with have got and haven’t got, and build simple interview questions.',
        'Говорим о гаджетах и вещах с have got и haven’t got и составляем простые вопросы для интервью.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 1,
      questions: [
        'en_s1u3_n5_001_speaking',
        'en_s1u3_n5_002_word_matching',
        'en_s1u3_n5_003_speaking',
        'en_s1u3_n5_004_fill_in_blank',
        'en_s1u3_n5_005_speaking',
        'en_s1u3_n5_006_reply_builder',
        'en_s1u3_n5_007_speaking',
        'en_s1u3_n5_008_dialog_complete',
        'en_s1u3_n5_009_speaking',
        'en_s1u3_n5_010_fill_in_blank',
        'en_s1u3_n5_011_speaking',
        'en_s1u3_n5_012_speaking',
        'en_s1u3_n5_013_word_arrange',
        'en_s1u3_n5_014_speaking',
        'en_s1u3_n5_015_speaking',
        'en_s1u3_n5_016_reply_builder',
        'en_s1u3_n5_017_speaking',
        'en_s1u3_n5_018_translate_builder',
        'en_s1u3_n5_019_speaking',
        'en_s1u3_n5_020_dialog_complete',
      ],
    },

    {
      title: L(
        '특이한 수집품',
        'G‘ayrioddiy to‘plamlar',
        'Unusual collections',
        'Необычные коллекции',
      ),
      description: L(
        'collect, collection, collector의 차이를 익히고 자석, 만화책, 인형 같은 수집품에 대해 듣고 말해요.',
        'collect, collection va collector farqini o‘rganib, magnitlar, komikslar va qo‘g‘irchoqlar kabi to‘plamlar haqida tinglab gapirasiz.',
        'Learn collect, collection and collector and listen for information about unusual collections.',
        'Различаем collect, collection и collector и слушаем информацию о необычных коллекциях.',
      ),
      category: LessonCategory.LISTENING,
      level: LV,
      order: 2,
      questions: [
        'en_s1u3_n5_021_speaking',
        'en_s1u3_n5_022_speaking',
        'en_s1u3_n5_023_speaking',
        'en_s1u3_n5_024_word_matching',
        'en_s1u3_n5_025_speaking',
        'en_s1u3_n5_026_fill_in_blank',
        'en_s1u3_n5_027_speaking',
        'en_s1u3_n5_028_fill_in_blank',
        'en_s1u3_n5_029_speaking',
        'en_s1u3_n5_030_audio_match',
        'en_s1u3_n5_031_speaking',
        'en_s1u3_n5_032_fill_in_blank',
        'en_s1u3_n5_033_speaking',
        'en_s1u3_n5_034_word_arrange',
        'en_s1u3_n5_035_speaking',
        'en_s1u3_n5_036_reply_builder',
        'en_s1u3_n5_037_speaking',
        'en_s1u3_n5_038_translate_builder',
        'en_s1u3_n5_039_speaking',
        'en_s1u3_n5_040_dialog_complete',
      ],
    },

    {
      title: L(
        'Unit 3 문법 복습',
        'Unit 3 grammatika takrori',
        'Unit 3 grammar review',
        'Повторение грамматики Unit 3',
      ),
      description: L(
        '형용사+명사, 반대말, have got의 긍정·부정·질문·짧은 대답과 가족 소유격 ’s를 함께 복습해요.',
        'Sifat+ot, qarama-qarshi sifatlar, have gotning tasdiq, inkor, savol va qisqa javob shakllari hamda oilaga oid ’s ni takrorlaysiz.',
        'Review adjective + noun order, opposites, all main have got forms and possessive ’s.',
        'Повторяем порядок прилагательное + существительное, антонимы, основные формы have got и притяжательное ’s.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 3,
      questions: [
        'en_s1u3_n5_041_speaking',
        'en_s1u3_n5_042_fill_in_blank',
        'en_s1u3_n5_043_speaking',
        'en_s1u3_n5_044_fill_in_blank',
        'en_s1u3_n5_045_word_matching',
        'en_s1u3_n5_046_speaking',
        'en_s1u3_n5_047_speaking',
        'en_s1u3_n5_048_fill_in_blank',
        'en_s1u3_n5_049_dialog_complete',
        'en_s1u3_n5_050_speaking',
        'en_s1u3_n5_051_fill_in_blank',
        'en_s1u3_n5_052_speaking',
        'en_s1u3_n5_053_reply_builder',
        'en_s1u3_n5_054_speaking',
        'en_s1u3_n5_055_fill_in_blank',
        'en_s1u3_n5_056_speaking',
        'en_s1u3_n5_057_speaking',
        'en_s1u3_n5_058_fill_in_blank',
        'en_s1u3_n5_059_speaking',
        'en_s1u3_n5_060_sentence_builder',
      ],
    },

    {
      title: L(
        'Unit 3 종합 복습',
        'Unit 3 umumiy takrorlash',
        'Unit 3 review',
        'Повторение Unit 3',
      ),
      description: L(
        '일상 표현, 가족, 소유, and/but, 장소 표현과 소셜미디어 메시지까지 Unit 3의 핵심을 실제 대화와 짧은 글로 다시 사용해요.',
        'Kundalik iboralar, oila, egalik, and/but, joy ifodalari va ijtimoiy tarmoq xabarlarini suhbat va qisqa matnda takrorlaysiz.',
        'Recycle Unit 3 language through everyday expressions, family talk, possession and a short social-media message.',
        'Повторяем Unit 3 через повседневные выражения, семью, принадлежность и короткое сообщение в социальной сети.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 4,
      questions: [
        'en_s1u3_n5_061_speaking',
        'en_s1u3_n5_062_dialog_complete',
        'en_s1u3_n5_063_speaking',
        'en_s1u3_n5_064_reply_builder',
        'en_s1u3_n5_065_speaking',
        'en_s1u3_n5_066_dialog_complete',
        'en_s1u3_n5_067_speaking',
        'en_s1u3_n5_068_dialog_complete',
        'en_s1u3_n5_069_speaking',
        'en_s1u3_n5_070_fill_in_blank',
        'en_s1u3_n5_071_speaking',
        'en_s1u3_n5_072_fill_in_blank',
        'en_s1u3_n5_073_speaking',
        'en_s1u3_n5_074_fill_in_blank',
        'en_s1u3_n5_075_speaking',
        'en_s1u3_n5_076_fill_in_blank',
        'en_s1u3_n5_077_fill_in_blank',
        'en_s1u3_n5_078_fill_in_blank',
        'en_s1u3_n5_079_speaking',
        'en_s1u3_n5_080_dialog_complete',
      ],
    },
  ],
};
