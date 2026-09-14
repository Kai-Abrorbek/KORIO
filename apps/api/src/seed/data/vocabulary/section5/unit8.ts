import { LessonCategory } from '../../../../lessons/schemas/lesson.schema';
import { QuestionLevel } from '../../../../lessons/schemas/question.schema';
import { WordPartOfSpeech } from '../../../../words/schemas/word.schema';
import type { WordSeedEntry } from '../../../word-seed.types';

const L = (ko: string, uz: string, en: string, ru: string) => ({
  ko,
  uz,
  en,
  ru,
});

const I = {
  typeAnswer: L(
    '뜻에 맞는 한국어 표현을 입력하세요.',
    'Ma’noga mos koreyscha ifodani yozing.',
    'Type the Korean expression that matches the meaning.',
    'Введите корейское выражение, соответствующее значению.',
  ),
  arrange: L(
    '단어를 알맞은 순서로 배열하세요.',
    'So‘zlarni to‘g‘ri tartibda joylashtiring.',
    'Arrange the words in the correct order.',
    'Расположите слова в правильном порядке.',
  ),
  reading: L(
    '글을 읽고 알맞은 답을 고르세요.',
    'Matnni o‘qib, to‘g‘ri javobni tanlang.',
    'Read the text and choose the correct answer.',
    'Прочитайте текст и выберите правильный ответ.',
  ),
  error: L(
    '틀린 부분을 찾아 알맞게 고치세요.',
    'Xato qismini topib, to‘g‘rilang.',
    'Find the incorrect part and correct it.',
    'Найдите ошибку и исправьте её.',
  ),
  cloze: L(
    '문맥에 맞는 표현으로 빈칸을 채우세요.',
    'Bo‘sh joylarni mazmunga mos ifodalar bilan to‘ldiring.',
    'Fill in the blanks with expressions that fit the context.',
    'Заполните пропуски подходящими по смыслу выражениями.',
  ),
  fillBlank: L(
    '빈칸에 알맞은 표현을 고르세요.',
    'Bo‘sh joyga mos ifodani tanlang.',
    'Choose the expression for the blank.',
    'Выберите подходящее выражение для пропуска.',
  ),
};

const exactGrading = (expectedMeaning: string) => ({
  mode: 'exact' as const,
  expectedMeaning,
  acceptedAnswers: [],
  tolerance: {
    punctuation: true,
    spacing: false,
    minorTypos: false,
  },
});

const vocabTypeAnswer = (
  answer: string,
  meaning: ReturnType<typeof L>,
  expectedMeaning: string,
  tags: string[],
  difficulty = 5,
) => ({
  type: 'type_answer' as const,
  level: QuestionLevel.LEVEL_5,
  lessonCategory: LessonCategory.VOCABULARY,
  instruction: I.typeAnswer,
  answer,
  answerTranslation: meaning,
  grading: exactGrading(expectedMeaning),
  tags,
  difficulty,
  xpReward: 25,
  isActive: true,
});

const translateBuilder = (
  instruction: ReturnType<typeof L>,
  options: string[],
  answer: string,
  hint: ReturnType<typeof L>,
  tags: string[],
  difficulty = 5,
) => ({
  type: 'translate_builder' as const,
  level: QuestionLevel.LEVEL_5,
  lessonCategory: LessonCategory.VOCABULARY,
  instruction,
  options,
  answer,
  hint,
  tags,
  difficulty,
  xpReward: 25,
  isActive: true,
});

const wordArrange = (
  options: string[],
  answer: string,
  hint: ReturnType<typeof L>,
  tags: string[],
  difficulty = 5,
) => ({
  type: 'word_arrange' as const,
  level: QuestionLevel.LEVEL_5,
  lessonCategory: LessonCategory.VOCABULARY,
  instruction: I.arrange,
  options,
  answer,
  hint,
  tags,
  difficulty,
  xpReward: 20,
  isActive: true,
});

const fillBlank = (
  npcText: string,
  blankAnswers: string[],
  options: string[],
  hint: ReturnType<typeof L>,
  tags: string[],
  difficulty = 5,
) => ({
  type: 'fill_in_blank' as const,
  level: QuestionLevel.LEVEL_5,
  lessonCategory: LessonCategory.VOCABULARY,
  instruction: I.fillBlank,
  npcText,
  blankAnswers,
  options,
  hint,
  tags,
  difficulty,
  xpReward: 20,
  isActive: true,
});

const readingQuiz = (
  npcText: string,
  instruction: string,
  options: string[],
  answer: string,
  hint: ReturnType<typeof L>,
  tags: string[],
  difficulty = 5,
) => ({
  type: 'reading_quiz' as const,
  level: QuestionLevel.LEVEL_5,
  lessonCategory: LessonCategory.VOCABULARY,
  npcText,
  instruction: L(instruction, instruction, instruction, instruction),
  options,
  answer,
  hint,
  tags,
  difficulty,
  xpReward: 20,
  isActive: true,
});

const errorHunt = (
  npcText: string,
  wrongWord: string,
  options: string[],
  answer: string,
  hint: ReturnType<typeof L>,
  tags: string[],
  difficulty = 5,
) => ({
  type: 'error_hunt' as const,
  level: QuestionLevel.LEVEL_5,
  lessonCategory: LessonCategory.VOCABULARY,
  instruction: I.error,
  npcText,
  wrongWord,
  options,
  answer,
  hint,
  tags,
  difficulty,
  xpReward: 20,
  isActive: true,
});

const clozePassage = (
  npcText: string,
  blankAnswers: string[],
  options: string[],
  hint: ReturnType<typeof L>,
  tags: string[],
  difficulty = 5,
) => ({
  type: 'cloze_passage' as const,
  level: QuestionLevel.LEVEL_5,
  lessonCategory: LessonCategory.VOCABULARY,
  instruction: I.cloze,
  npcText,
  blankAnswers,
  options,
  hint,
  tags,
  difficulty,
  xpReward: 25,
  isActive: true,
});

const targetExpressionGrading = (
  expectedMeaning: string,
  targetExpressions: string[],
  acceptedAnswers: string[] = [],
) => ({
  mode: 'targetExpression' as const,
  expectedMeaning,
  targetExpressions,
  acceptedAnswers,
  tolerance: {
    punctuation: true,
    spacing: true,
    minorTypos: true,
  },
});

const grammarTypeAnswer = (
  answer: string,
  meaning: ReturnType<typeof L>,
  expectedMeaning: string,
  targetExpressions: string[],
  tags: string[],
  difficulty = 5,
) => ({
  type: 'type_answer' as const,
  level: QuestionLevel.LEVEL_5,
  lessonCategory: LessonCategory.GRAMMAR,
  instruction: I.typeAnswer,
  answer,
  answerTranslation: meaning,
  grading: targetExpressionGrading(expectedMeaning, targetExpressions),
  tags,
  difficulty,
  xpReward: 25,
  isActive: true,
});

const grammarTranslateBuilder = (
  ...args: Parameters<typeof translateBuilder>
) => ({
  ...translateBuilder(...args),
  lessonCategory: LessonCategory.GRAMMAR,
});

const grammarWordArrange = (...args: Parameters<typeof wordArrange>) => ({
  ...wordArrange(...args),
  lessonCategory: LessonCategory.GRAMMAR,
});

const grammarFillBlank = (...args: Parameters<typeof fillBlank>) => ({
  ...fillBlank(...args),
  lessonCategory: LessonCategory.GRAMMAR,
});

const grammarErrorHunt = (...args: Parameters<typeof errorHunt>) => ({
  ...errorHunt(...args),
  lessonCategory: LessonCategory.GRAMMAR,
});

const grammarClozePassage = (...args: Parameters<typeof clozePassage>) => ({
  ...clozePassage(...args),
  lessonCategory: LessonCategory.GRAMMAR,
});

const grammarReadingQuiz = (
  npcText: string,
  options: string[],
  answer: string,
  hint: ReturnType<typeof L>,
  tags: string[],
  difficulty = 5,
) => ({
  type: 'reading_quiz' as const,
  level: QuestionLevel.LEVEL_5,
  lessonCategory: LessonCategory.GRAMMAR,
  instruction: I.reading,
  npcText,
  options,
  answer,
  hint,
  tags,
  difficulty,
  xpReward: 20,
  isActive: true,
});

export const S5_UNIT8_WORDS: WordSeedEntry[] = [
  {
    code: 'traffic-accident',
    korean: '교통사고',
    senseKey: 'traffic-accident',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '차, 오토바이, 자전거 등이 도로에서 부딪히거나 문제가 생기는 사고',
      'Yo‘lda avtomobil, mototsikl yoki velosiped bilan bog‘liq hodisa',
      'a traffic accident',
      'дорожно-транспортное происшествие',
    ),
    examples: [
      {
        korean: '출근길에 교통사고가 나서 길이 많이 막혔어요.',
        translations: L(
          '출근길에 교통사고가 나서 길이 많이 막혔어요.',
          'Ishga ketayotganda yo‘l-transport hodisasi bo‘lib, yo‘l juda tirband bo‘ldi.',
          'There was a traffic accident during rush hour, so the road was very congested.',
          'По дороге на работу произошло ДТП, поэтому образовалась большая пробка.',
        ),
      },
    ],
    pronunciation: {
      hangul: '교통사고',
      romanization: 'gyotongsago',
      ttsText: '교통사고',
    },
    media: { emoji: '🚗' },
    tags: ['traffic', 'accident', 'unit-8'],
    difficulty: 4,
    isCore: true,
  },

  {
    code: 'traffic-accident-happen',
    korean: '사고가 나다',
    senseKey: 'accident-happen',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '사고가 발생하다',
      'Hodisa yuz bermoq',
      'for an accident to happen',
      'произойти об аварии',
    ),
    examples: [
      {
        korean: '비가 많이 오는 날에는 사고가 나지 않게 조심해야 해요.',
        translations: L(
          '비가 많이 오는 날에는 사고가 나지 않게 조심해야 해요.',
          'Kuchli yomg‘irda avariya bo‘lmasligi uchun ehtiyot bo‘lish kerak.',
          'You should be careful to avoid an accident on heavily rainy days.',
          'В сильный дождь нужно быть осторожным, чтобы не попасть в аварию.',
        ),
      },
    ],
    pronunciation: {
      hangul: '사고가 나다',
      romanization: 'sagoga nada',
      ttsText: '사고가 나다',
    },
    media: { emoji: '💥' },
    tags: ['traffic', 'accident', 'event'],
    difficulty: 4,
    isCore: true,
  },

  {
    code: 'fasten-seatbelt',
    korean: '안전벨트를 매다',
    senseKey: 'fasten-seatbelt',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '차를 탈 때 몸을 보호하기 위해 안전벨트를 착용하다',
      'Mashinada tanani himoya qilish uchun xavfsizlik kamarini taqmoq',
      'to fasten a seat belt',
      'пристегнуть ремень безопасности',
    ),
    examples: [
      {
        korean: '차가 출발하기 전에 안전벨트를 매세요.',
        translations: L(
          '차가 출발하기 전에 안전벨트를 매세요.',
          'Mashina yurishidan oldin xavfsizlik kamarini taqing.',
          'Fasten your seat belt before the car starts moving.',
          'Пристегните ремень безопасности до начала движения.',
        ),
      },
    ],
    pronunciation: {
      hangul: '안전벨트를 매다',
      romanization: 'anjeonbelteureul maeda',
      ttsText: '안전벨트를 매다',
    },
    media: { emoji: '🪢' },
    tags: ['traffic', 'safety', 'seatbelt'],
    difficulty: 4,
    isCore: true,
  },

  {
    code: 'speeding',
    korean: '과속',
    senseKey: 'speeding',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '정해진 속도보다 너무 빠르게 운전하는 것',
      'Belgilangan tezlikdan tezroq haydash',
      'speeding',
      'превышение скорости',
    ),
    examples: [
      {
        korean: '과속은 큰 교통사고의 원인이 될 수 있어요.',
        translations: L(
          '과속은 큰 교통사고의 원인이 될 수 있어요.',
          'Tezlikni oshirish katta yo‘l-transport hodisasiga sabab bo‘lishi mumkin.',
          'Speeding can cause serious traffic accidents.',
          'Превышение скорости может стать причиной серьёзного ДТП.',
        ),
      },
    ],
    pronunciation: {
      hangul: '과속',
      romanization: 'gwasok',
      ttsText: '과속',
    },
    media: { emoji: '🏎️' },
    tags: ['traffic', 'speed', 'danger'],
    difficulty: 4,
    isCore: true,
  },

  {
    code: 'speed',
    korean: '과속하다',
    senseKey: 'speed-vehicle',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '정해진 속도보다 빠르게 운전하다',
      'Belgilangan tezlikdan tez haydamoq',
      'to speed',
      'превышать скорость',
    ),
    examples: [
      {
        korean: '도로가 비어 있어도 과속하면 위험해요.',
        translations: L(
          '도로가 비어 있어도 과속하면 위험해요.',
          'Yo‘l bo‘sh bo‘lsa ham tezlikni oshirish xavfli.',
          'Speeding is dangerous even when the road is empty.',
          'Превышать скорость опасно, даже если дорога пустая.',
        ),
      },
    ],
    pronunciation: {
      hangul: '과속하다',
      romanization: 'gwasokhada',
      ttsText: '과속하다',
    },
    media: { emoji: '💨' },
    tags: ['traffic', 'speed', 'driving'],
    difficulty: 4,
    isCore: true,
  },

  {
    code: 'speed-limit',
    korean: '제한 속도',
    senseKey: 'speed-limit',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '도로에서 허용되는 가장 높은 운전 속도',
      'Yo‘lda ruxsat etilgan eng yuqori tezlik',
      'speed limit',
      'ограничение скорости',
    ),
    examples: [
      {
        korean: '이 도로의 제한 속도는 시속 60킬로미터예요.',
        translations: L(
          '이 도로의 제한 속도는 시속 60킬로미터예요.',
          'Bu yo‘lda tezlik cheklovi soatiga 60 kilometr.',
          'The speed limit on this road is 60 kilometers per hour.',
          'Ограничение скорости на этой дороге — 60 километров в час.',
        ),
      },
    ],
    pronunciation: {
      hangul: '제한 속도',
      romanization: 'jehan sokdo',
      ttsText: '제한 속도',
    },
    media: { emoji: '🚫' },
    tags: ['traffic', 'speed', 'rule'],
    difficulty: 4,
    isCore: true,
  },

  {
    code: 'obey-speed-limit',
    korean: '제한 속도를 지키다',
    senseKey: 'obey-speed-limit',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '도로에서 정해 놓은 속도를 넘지 않고 운전하다',
      'Yo‘lda belgilangan tezlikdan oshmay haydamoq',
      'to obey the speed limit',
      'соблюдать ограничение скорости',
    ),
    examples: [
      {
        korean: '사고를 예방하려면 제한 속도를 지켜야 해요.',
        translations: L(
          '사고를 예방하려면 제한 속도를 지켜야 해요.',
          'Avariyani oldini olish uchun tezlik chekloviga rioya qilish kerak.',
          'You should obey the speed limit to prevent accidents.',
          'Чтобы предотвратить аварию, нужно соблюдать ограничение скорости.',
        ),
      },
    ],
    pronunciation: {
      hangul: '제한 속도를 지키다',
      romanization: 'jehan sokdoreul jikida',
      ttsText: '제한 속도를 지키다',
    },
    media: { emoji: '🛣️' },
    tags: ['traffic', 'speed', 'safety'],
    difficulty: 4,
    isCore: true,
  },

  {
    code: 'traffic-signal',
    korean: '교통 신호',
    senseKey: 'traffic-signal',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '차와 보행자가 언제 움직이거나 멈춰야 하는지 알려 주는 신호',
      'Mashina va piyodalarga qachon yurish yoki to‘xtashni ko‘rsatadigan signal',
      'traffic signal',
      'дорожный сигнал',
    ),
    examples: [
      {
        korean: '교차로에서는 교통 신호를 잘 확인하세요.',
        translations: L(
          '교차로에서는 교통 신호를 잘 확인하세요.',
          'Chorrahada svetofor signalini diqqat bilan tekshiring.',
          'Check the traffic signal carefully at intersections.',
          'На перекрёстке внимательно следите за сигналами светофора.',
        ),
      },
    ],
    pronunciation: {
      hangul: '교통 신호',
      romanization: 'gyotong sinho',
      ttsText: '교통 신호',
    },
    media: { emoji: '🚦' },
    tags: ['traffic', 'signal', 'safety'],
    difficulty: 4,
    isCore: true,
  },

  {
    code: 'obey-traffic-signal',
    korean: '신호를 지키다',
    senseKey: 'obey-traffic-signal',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '교통 신호의 지시에 맞게 운전하거나 이동하다',
      'Yo‘l signaliga muvofiq harakat qilmoq',
      'to obey traffic signals',
      'соблюдать сигналы светофора',
    ),
    examples: [
      {
        korean: '운전할 때는 반드시 신호를 지켜야 해요.',
        translations: L(
          '운전할 때는 반드시 신호를 지켜야 해요.',
          'Mashina haydaganda albatta yo‘l signaliga rioya qilish kerak.',
          'You must obey traffic signals when driving.',
          'При вождении обязательно нужно соблюдать сигналы светофора.',
        ),
      },
    ],
    pronunciation: {
      hangul: '신호를 지키다',
      romanization: 'sinhoreul jikida',
      ttsText: '신호를 지키다',
    },
    media: { emoji: '🚦' },
    tags: ['traffic', 'signal', 'rule'],
    difficulty: 4,
    isCore: true,
  },

  {
    code: 'check-surroundings',
    korean: '주변을 살피다',
    senseKey: 'check-surroundings',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '주위에 다른 차나 사람이 있는지 주의 깊게 보다',
      'Atrofda boshqa mashina yoki odam borligini diqqat bilan tekshirmoq',
      'to check the surroundings',
      'осмотреться по сторонам',
    ),
    examples: [
      {
        korean: '차를 움직이기 전에 주변을 잘 살피세요.',
        translations: L(
          '차를 움직이기 전에 주변을 잘 살피세요.',
          'Mashinani harakatlantirishdan oldin atrofni yaxshilab tekshiring.',
          'Check your surroundings carefully before moving the car.',
          'Перед началом движения внимательно осмотритесь.',
        ),
      },
    ],
    pronunciation: {
      hangul: '주변을 살피다',
      romanization: 'jubyeoneul salpida',
      ttsText: '주변을 살피다',
    },
    media: { emoji: '👀' },
    tags: ['traffic', 'safety', 'awareness'],
    difficulty: 4,
    isCore: true,
  },

  {
    code: 'drunk-driving',
    korean: '음주 운전',
    senseKey: 'drunk-driving',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '술을 마신 상태에서 자동차를 운전하는 것',
      'Spirtli ichimlik ichgan holda mashina haydash',
      'drunk driving',
      'вождение в нетрезвом виде',
    ),
    examples: [
      {
        korean: '음주 운전은 매우 위험한 행동이에요.',
        translations: L(
          '음주 운전은 매우 위험한 행동이에요.',
          'Mast holda mashina haydash juda xavfli.',
          'Drunk driving is extremely dangerous.',
          'Вождение в нетрезвом виде очень опасно.',
        ),
      },
    ],
    pronunciation: {
      hangul: '음주 운전',
      romanization: 'eumju unjeon',
      ttsText: '음주 운전',
    },
    media: { emoji: '🚫' },
    tags: ['traffic', 'driving', 'danger'],
    difficulty: 4,
    isCore: true,
  },

  {
    code: 'drive-drunk',
    korean: '음주 운전을 하다',
    senseKey: 'drive-drunk',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '술을 마신 뒤 자동차를 운전하다',
      'Spirtli ichimlik ichgandan keyin mashina haydamoq',
      'to drive under the influence of alcohol',
      'управлять автомобилем в состоянии опьянения',
    ),
    examples: [
      {
        korean: '술을 마셨으면 음주 운전을 하면 안 돼요.',
        translations: L(
          '술을 마셨으면 음주 운전을 하면 안 돼요.',
          'Spirtli ichimlik ichgan bo‘lsangiz, mashina haydamaslik kerak.',
          'You must not drive after drinking alcohol.',
          'После употребления алкоголя нельзя садиться за руль.',
        ),
      },
    ],
    pronunciation: {
      hangul: '음주 운전을 하다',
      romanization: 'eumju unjeoneul hada',
      ttsText: '음주 운전을 하다',
    },
    media: { emoji: '⛔' },
    tags: ['traffic', 'driving', 'danger'],
    difficulty: 4,
    isCore: true,
  },
  {
    code: 'cause-accident',
    korean: '사고를 내다',
    senseKey: 'cause-accident',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '자신의 행동 때문에 사고가 발생하게 하다',
      'O‘z harakati sabab avariya keltirib chiqarmoq',
      'to cause an accident',
      'стать виновником аварии',
    ),
    examples: [
      {
        korean: '운전 중 신호를 어겨서 사고를 냈어요.',
        translations: L(
          '운전 중 신호를 어겨서 사고를 냈어요.',
          'Haydash paytida signalni buzib, avariyaga sabab bo‘ldi.',
          'The driver caused an accident after disobeying the signal.',
          'Водитель нарушил сигнал и стал виновником аварии.',
        ),
      },
    ],
    pronunciation: {
      hangul: '사고를 내다',
      romanization: 'sagoreul naeda',
      ttsText: '사고를 내다',
    },
    media: { emoji: '💥' },
    tags: ['accident', 'traffic', 'cause'],
    difficulty: 4,
    isCore: true,
  },

  {
    code: 'suffer-accident',
    korean: '사고를 당하다',
    senseKey: 'suffer-accident',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '원하지 않은 사고의 피해를 입다',
      'Kutilmagan avariya qurboni bo‘lmoq',
      'to be involved in or suffer an accident',
      'пострадать в аварии',
    ),
    examples: [
      {
        korean: '친구가 교통사고를 당해서 병원에 입원했어요.',
        translations: L(
          '친구가 교통사고를 당해서 병원에 입원했어요.',
          'Do‘stim avariyaga uchrab kasalxonaga yotqizildi.',
          'My friend was in a traffic accident and was hospitalized.',
          'Мой друг попал в ДТП и был госпитализирован.',
        ),
      },
    ],
    pronunciation: {
      hangul: '사고를 당하다',
      romanization: 'sagoreul danghada',
      ttsText: '사고를 당하다',
    },
    media: { emoji: '🚑' },
    tags: ['accident', 'traffic', 'victim'],
    difficulty: 4,
    isCore: true,
  },

  {
    code: 'disobey-signal',
    korean: '신호를 어기다',
    senseKey: 'disobey-traffic-signal',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '교통 신호의 지시를 따르지 않다',
      'Yo‘l signaliga rioya qilmaslik',
      'to disobey a traffic signal',
      'нарушить сигнал светофора',
    ),
    examples: [
      {
        korean: '신호를 어기면 큰 사고가 날 수 있어요.',
        translations: L(
          '신호를 어기면 큰 사고가 날 수 있어요.',
          'Signalga rioya qilinmasa katta avariya yuz berishi mumkin.',
          'Disobeying a traffic signal can cause a serious accident.',
          'Нарушение сигнала светофора может привести к серьёзной аварии.',
        ),
      },
    ],
    pronunciation: {
      hangul: '신호를 어기다',
      romanization: 'sinhoreul eogida',
      ttsText: '신호를 어기다',
    },
    media: { emoji: '🚦' },
    tags: ['traffic', 'signal', 'violation'],
    difficulty: 4,
    isCore: true,
  },

  {
    code: 'get-trapped',
    korean: '갇히다',
    senseKey: 'be-trapped-inside',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '어떤 곳에서 밖으로 나가지 못하게 되다',
      'Bir joydan tashqariga chiqa olmay qolmoq',
      'to get trapped',
      'оказаться запертым',
    ),
    examples: [
      {
        korean: '엘리베이터에 갇힌 적이 있어요.',
        translations: L(
          '엘리베이터에 갇힌 적이 있어요.',
          'Men liftda qolib ketganman.',
          'I have been trapped in an elevator before.',
          'Мне доводилось застревать в лифте.',
        ),
      },
    ],
    pronunciation: {
      hangul: '갇히다',
      romanization: 'gachida',
      ttsText: '갇히다',
    },
    media: { emoji: '🛗' },
    tags: ['accident', 'experience'],
    difficulty: 4,
    isCore: true,
  },

  {
    code: 'get-caught-in',
    korean: '끼이다',
    senseKey: 'be-caught-between',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '두 물체 사이에 들어가 움직이지 못하게 되다',
      'Ikki narsa orasida qisilib qolmoq',
      'to get caught or trapped between things',
      'застрять между чем-либо',
    ),
    examples: [
      {
        korean: '가방이 지하철 문에 끼였어요.',
        translations: L(
          '가방이 지하철 문에 끼였어요.',
          'Sumkam metro eshigiga qisilib qoldi.',
          'My bag got caught in the subway door.',
          'Моя сумка застряла в двери метро.',
        ),
      },
    ],
    pronunciation: {
      hangul: '끼이다',
      romanization: 'kkiida',
      ttsText: '끼이다',
    },
    media: { emoji: '🚇' },
    tags: ['accident', 'subway'],
    difficulty: 4,
    isCore: true,
  },

  {
    code: 'fall-into-water',
    korean: '빠지다',
    senseKey: 'fall-into-water',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '물이나 구멍 같은 곳 안으로 떨어지다',
      'Suv yoki chuqurlikka tushib ketmoq',
      'to fall into water or a hole',
      'упасть в воду или яму',
    ),
    examples: [
      {
        korean: '어릴 때 물에 빠진 적이 있어요.',
        translations: L(
          '어릴 때 물에 빠진 적이 있어요.',
          'Bolaligimda suvga tushib ketganman.',
          'I once fell into water when I was young.',
          'В детстве я однажды упал в воду.',
        ),
      },
    ],
    pronunciation: {
      hangul: '빠지다',
      romanization: 'ppajida',
      ttsText: '빠지다',
    },
    media: { emoji: '🌊' },
    tags: ['accident', 'water'],
    difficulty: 4,
    isCore: true,
  },

  {
    code: 'be-bitten',
    korean: '물리다',
    senseKey: 'be-bitten-by-animal',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '동물이나 벌레가 이로 물어서 상처를 입다',
      'Hayvon yoki hasharot tishlab jarohatlamoq',
      'to be bitten',
      'быть укушенным',
    ),
    examples: [
      {
        korean: '산에서 뱀에 물려서 병원에 갔어요.',
        translations: L(
          '산에서 뱀에 물려서 병원에 갔어요.',
          'Tog‘da ilon chaqib, kasalxonaga bordim.',
          'I was bitten by a snake in the mountains and went to the hospital.',
          'В горах меня укусила змея, поэтому я поехал в больницу.',
        ),
      },
    ],
    pronunciation: {
      hangul: '물리다',
      romanization: 'mullida',
      ttsText: '물리다',
    },
    media: { emoji: '🐍' },
    tags: ['accident', 'injury'],
    difficulty: 4,
    isCore: true,
  },

  {
    code: 'slip',
    korean: '미끄러지다',
    senseKey: 'slip-and-fall',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '미끄러운 곳에서 중심을 잃고 넘어질 듯 움직이다',
      'Sirpanchiq joyda muvozanatni yo‘qotmoq',
      'to slip',
      'поскользнуться',
    ),
    examples: [
      {
        korean: '눈길에 미끄러져서 발목을 다쳤어요.',
        translations: L(
          '눈길에 미끄러져서 발목을 다쳤어요.',
          'Qorli yo‘lda sirpanib, to‘pig‘imni jarohatladim.',
          'I slipped on the snowy road and injured my ankle.',
          'Я поскользнулся на снегу и повредил лодыжку.',
        ),
      },
    ],
    pronunciation: {
      hangul: '미끄러지다',
      romanization: 'mikkeureojida',
      ttsText: '미끄러지다',
    },
    media: { emoji: '🧊' },
    tags: ['accident', 'injury', 'winter'],
    difficulty: 4,
    isCore: true,
  },

  {
    code: 'sprain',
    korean: '삐다',
    senseKey: 'sprain-joint',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '관절이 갑자기 꺾이거나 비틀려서 다치다',
      'Bo‘g‘imni qayirib yoki burab jarohatlamoq',
      'to sprain',
      'растянуть или подвернуть сустав',
    ),
    examples: [
      {
        korean: '계단에서 넘어져서 발목을 삐었어요.',
        translations: L(
          '계단에서 넘어져서 발목을 삐었어요.',
          'Zinadan yiqilib, to‘pig‘imni qayirib oldim.',
          'I fell on the stairs and sprained my ankle.',
          'Я упал на лестнице и подвернул лодыжку.',
        ),
      },
    ],
    pronunciation: {
      hangul: '삐다',
      romanization: 'ppida',
      ttsText: '삐다',
    },
    media: { emoji: '🦶' },
    tags: ['injury', 'treatment'],
    difficulty: 4,
    isCore: true,
  },

  {
    code: 'break-bone',
    korean: '부러지다',
    senseKey: 'bone-break',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '뼈나 단단한 것이 꺾여서 두 부분 이상으로 나뉘다',
      'Suyak yoki qattiq narsa sinmoq',
      'to be broken; to fracture',
      'сломаться; получить перелом',
    ),
    examples: [
      {
        korean: '사고로 다리가 부러져서 깁스를 했어요.',
        translations: L(
          '사고로 다리가 부러져서 깁스를 했어요.',
          'Avariyada oyog‘im sinib, gips qo‘yildi.',
          'My leg was broken in the accident, so I got a cast.',
          'В аварии я сломал ногу, поэтому мне наложили гипс.',
        ),
      },
    ],
    pronunciation: {
      hangul: '부러지다',
      romanization: 'bureojida',
      ttsText: '부러지다',
    },
    media: { emoji: '🦴' },
    tags: ['injury', 'accident'],
    difficulty: 4,
    isCore: true,
  },

  {
    code: 'tear-wound',
    korean: '찢어지다',
    senseKey: 'skin-tear',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '피부나 물건이 갈라져 벌어지다',
      'Teri yoki narsa yirtilmoq',
      'to be torn or cut open',
      'разорваться; получить рваную рану',
    ),
    examples: [
      {
        korean: '넘어져서 이마가 찢어졌어요.',
        translations: L(
          '넘어져서 이마가 찢어졌어요.',
          'Yiqilib, peshonam yorildi.',
          'I fell and cut my forehead open.',
          'Я упал и рассёк лоб.',
        ),
      },
    ],
    pronunciation: {
      hangul: '찢어지다',
      romanization: 'jjijeojida',
      ttsText: '찢어지다',
    },
    media: { emoji: '🩹' },
    tags: ['injury', 'accident'],
    difficulty: 4,
    isCore: true,
  },

  {
    code: 'wear-cast',
    korean: '깁스를 하다',
    senseKey: 'wear-cast-treatment',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '부러지거나 다친 뼈를 고정하기 위해 깁스를 붙이다',
      'Singan yoki jarohatlangan joyga gips qo‘ymoq',
      'to get or wear a cast',
      'наложить гипс',
    ),
    examples: [
      {
        korean: '팔이 부러져서 한 달 동안 깁스를 했어요.',
        translations: L(
          '팔이 부러져서 한 달 동안 깁스를 했어요.',
          'Qo‘lim sinib, bir oy gipsda yurdim.',
          'I broke my arm and wore a cast for a month.',
          'Я сломал руку и месяц ходил в гипсе.',
        ),
      },
    ],
    pronunciation: {
      hangul: '깁스를 하다',
      romanization: 'gipseureul hada',
      ttsText: '깁스를 하다',
    },
    media: { emoji: '🩼' },
    tags: ['injury', 'treatment'],
    difficulty: 4,
    isCore: true,
  },

  {
    code: 'have-surgery',
    korean: '수술하다',
    senseKey: 'undergo-surgery',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '병원에서 몸의 아픈 부분을 치료하기 위해 수술을 받다',
      'Kasalxonada operatsiya qilinmoq',
      'to have surgery',
      'перенести операцию',
    ),
    examples: [
      {
        korean: '사고로 다친 다리를 수술했어요.',
        translations: L(
          '사고로 다친 다리를 수술했어요.',
          'Avariyada jarohatlangan oyog‘imni operatsiya qildirishdi.',
          'I had surgery on the leg injured in the accident.',
          'Мне сделали операцию на ноге, повреждённой в аварии.',
        ),
      },
    ],
    pronunciation: {
      hangul: '수술하다',
      romanization: 'susulhada',
      ttsText: '수술하다',
    },
    media: { emoji: '🏥' },
    tags: ['injury', 'treatment'],
    difficulty: 4,
    isCore: true,
  },

  {
    code: 'stitch-wound',
    korean: '꿰매다',
    senseKey: 'stitch-wound',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '찢어진 상처를 실로 봉합하다',
      'Yaralangan joyni tikmoq',
      'to stitch a wound',
      'зашить рану',
    ),
    examples: [
      {
        korean: '이마가 찢어져서 병원에서 꿰맸어요.',
        translations: L(
          '이마가 찢어져서 병원에서 꿰맸어요.',
          'Peshonam yorilib, kasalxonada tikishdi.',
          'My forehead was cut open, so it was stitched at the hospital.',
          'Я рассёк лоб, и в больнице рану зашили.',
        ),
      },
    ],
    pronunciation: {
      hangul: '꿰매다',
      romanization: 'kkwemaeda',
      ttsText: '꿰매다',
    },
    media: { emoji: '🪡' },
    tags: ['injury', 'treatment'],
    difficulty: 4,
    isCore: true,
  },

  {
    code: 'be-hospitalized',
    korean: '입원하다',
    senseKey: 'be-admitted-to-hospital',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '치료를 받기 위해 병원에 머물다',
      'Davolanish uchun kasalxonaga yotmoq',
      'to be hospitalized',
      'лечь в больницу',
    ),
    examples: [
      {
        korean: '교통사고를 당해서 일주일 동안 입원했어요.',
        translations: L(
          '교통사고를 당해서 일주일 동안 입원했어요.',
          'Avariyaga uchrab bir hafta kasalxonada yotdim.',
          'I was hospitalized for a week after a traffic accident.',
          'После ДТП я неделю провёл в больнице.',
        ),
      },
    ],
    pronunciation: {
      hangul: '입원하다',
      romanization: 'ibwonhada',
      ttsText: '입원하다',
    },
    media: { emoji: '🛏️' },
    tags: ['hospital', 'treatment'],
    difficulty: 4,
    isCore: true,
  },

  {
    code: 'visit-sick-person',
    korean: '문병을 가다',
    senseKey: 'visit-sick-person',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '아파서 병원이나 집에 있는 사람을 찾아가 위로하다',
      'Kasal odamni ko‘rish va holidan xabar olish uchun bormoq',
      'to visit someone who is sick',
      'навещать больного',
    ),
    examples: [
      {
        korean: '친구가 입원해서 병원에 문병을 갔어요.',
        translations: L(
          '친구가 입원해서 병원에 문병을 갔어요.',
          'Do‘stim kasalxonaga yotgani uchun uni ko‘rgani bordim.',
          'My friend was hospitalized, so I went to visit them.',
          'Мой друг попал в больницу, поэтому я пошёл его навестить.',
        ),
      },
    ],
    pronunciation: {
      hangul: '문병을 가다',
      romanization: 'munbyeongeul gada',
      ttsText: '문병을 가다',
    },
    media: { emoji: '💐' },
    tags: ['hospital', 'visit'],
    difficulty: 4,
    isCore: true,
  },

  {
    code: 'leave-hospital',
    korean: '퇴원하다',
    senseKey: 'be-discharged-from-hospital',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '치료가 끝나 병원에서 나가다',
      'Davolanish tugab kasalxonadan chiqmoq',
      'to be discharged from the hospital',
      'выписаться из больницы',
    ),
    examples: [
      {
        korean: '상태가 좋아져서 오늘 퇴원했어요.',
        translations: L(
          '상태가 좋아져서 오늘 퇴원했어요.',
          'Ahvolim yaxshilanib, bugun kasalxonadan chiqdim.',
          'I got better and was discharged today.',
          'Мне стало лучше, и сегодня меня выписали.',
        ),
      },
    ],
    pronunciation: {
      hangul: '퇴원하다',
      romanization: 'toewonhada',
      ttsText: '퇴원하다',
    },
    media: { emoji: '🏠' },
    tags: ['hospital', 'treatment'],
    difficulty: 4,
    isCore: true,
  },
];

export const S5_UNIT8_QUESTIONS = {
  // ══════════════════════════════════════════════════════════
  // Node 1 · 교통사고를 예방해요
  // 5 lessons × 20 questions
  // ══════════════════════════════════════════════════════════

  // ──────────────────────────────────────────────────────────
  // Lesson 1 · 교통사고가 났어요
  // 사고 / 사고가 나다
  // ──────────────────────────────────────────────────────────

  s5u8_001_reading_quiz: readingQuiz(
    '아침에 큰길에서 자동차 두 대가 부딪혀 경찰차가 와 있었습니다. 사고 때문에 도로도 많이 막혔습니다.',
    '이 상황을 무엇이라고 해요?',
    ['교통사고', '음주 운전', '제한 속도', '교통 신호'],
    '교통사고',
    L(
      '도로에서 차와 관련된 사고가 발생한 상황이에요.',
      'Yo‘lda avtomobillar bilan bog‘liq hodisa yuz bergan.',
      'A traffic accident involving cars occurred on the road.',
      'На дороге произошло ДТП с автомобилями.',
    ),
    ['traffic-accident', 'context'],
  ),

  s5u8_002_type_answer: vocabTypeAnswer(
    '교통사고',
    L(
      '도로에서 자동차 등이 부딪히거나 문제가 생기는 사고',
      'Yo‘lda avtomobillar bilan bog‘liq hodisa',
      'a traffic accident',
      'дорожно-транспортное происшествие',
    ),
    'A traffic accident on the road.',
    ['traffic-accident', 'type-answer'],
  ),

  s5u8_003_translate_builder: translateBuilder(
    L(
      '출근길에 도로에서 사고가 발생했다고 말하기',
      'Ishga ketayotganda yo‘lda avariya bo‘lganini ayting.',
      'Say that there was a traffic accident on the way to work.',
      'Скажите, что по дороге на работу произошло ДТП.',
    ),
    [
      '교통사고가 났어요',
      '출근길에',
      '음주 운전을 했어요',
      '제한 속도를',
      '도로에서',
      '안전벨트를 맸어요',
    ],
    '출근길에 도로에서 교통사고가 났어요',
    L(
      '어디에서 어떤 일이 발생했는지 함께 표현해요.',
      'Qayerda qanday hodisa bo‘lganini birga aytamiz.',
      'It states both where and what happened.',
      'Указывается, где и что произошло.',
    ),
    ['traffic-accident', 'builder'],
  ),

  s5u8_004_fill_in_blank: fillBlank(
    '아침에 도로에서 큰 ___가 났어요.',
    ['교통사고'],
    ['교통사고', '안전벨트', '제한 속도', '교통 신호', '주변'],
    L(
      '도로에서 차와 관련된 사고가 발생했어요.',
      'Yo‘lda avtomobil bilan bog‘liq hodisa yuz berdi.',
      'A traffic accident occurred on the road.',
      'На дороге произошло ДТП.',
    ),
    ['traffic-accident'],
  ),

  s5u8_005_word_arrange: wordArrange(
    [
      '길이 많이 막혔어요',
      '교통사고가 나서',
      '안전벨트를 맸어요',
      '아침에',
      '신호를 지켰어요',
      '과속했어요',
    ],
    '아침에 교통사고가 나서 길이 많이 막혔어요',
    L(
      '사고 발생과 그 결과를 자연스럽게 연결해요.',
      'Hodisa va uning natijasi bog‘lanadi.',
      'The accident and its result are connected.',
      'Авария и её результат связываются в одном предложении.',
    ),
    ['traffic-accident', 'context'],
  ),

  s5u8_006_type_answer: vocabTypeAnswer(
    '사고가 나다',
    L(
      '사고가 발생하다',
      'Hodisa yuz bermoq',
      'for an accident to happen',
      'произойти об аварии',
    ),
    'For an accident to occur.',
    ['traffic-accident-happen', 'type-answer'],
  ),

  s5u8_007_error_hunt: errorHunt(
    '도로에서 교통사고를 났어요.',
    '사고를',
    ['사고가', '사고를', '사고에', '사고로'],
    '사고가',
    L(
      '`사고가 나다`가 한 덩어리처럼 쓰이는 표현이에요.',
      '`사고가 나다` birikma sifatida ishlatiladi.',
      'The natural expression is 사고가 나다.',
      'Естественное выражение — 사고가 나다.',
    ),
    ['traffic-accident-happen', 'collocation'],
  ),

  s5u8_008_translate_builder: translateBuilder(
    L(
      '사고가 발생하지 않게 조심해야 한다고 말하기',
      'Avariya bo‘lmasligi uchun ehtiyot bo‘lish kerakligini ayting.',
      'Say that you should be careful to avoid an accident.',
      'Скажите, что нужно быть осторожным, чтобы не произошло аварии.',
    ),
    [
      '조심해야 해요',
      '사고가 나지 않게',
      '과속해야 해요',
      '안전벨트를 풀고',
      '신호를 무시하고',
      '주변을 보지 말고',
    ],
    '사고가 나지 않게 조심해야 해요',
    L(
      '교통사고를 예방하기 위한 기본적인 태도예요.',
      'Bu avariyani oldini olishning asosiy yondashuvi.',
      'This is a basic attitude for preventing accidents.',
      'Это базовый принцип предотвращения ДТП.',
    ),
    ['traffic-accident', 'prevention'],
  ),

  s5u8_009_reading_quiz: readingQuiz(
    '비가 많이 오는 날에는 길이 미끄럽고 앞이 잘 보이지 않을 수 있습니다. 평소보다 더 천천히 운전하는 것이 좋습니다.',
    '이 글의 목적은 무엇이에요?',
    [
      '교통사고를 예방하기 위해서예요.',
      '더 빨리 운전하기 위해서예요.',
      '음주 운전을 하기 위해서예요.',
      '신호를 무시하기 위해서예요.',
    ],
    '교통사고를 예방하기 위해서예요.',
    L(
      '위험한 도로 상황에서는 사고 예방이 중요해요.',
      'Xavfli yo‘l sharoitida avariyani oldini olish muhim.',
      'Accident prevention is especially important in dangerous road conditions.',
      'В опасных дорожных условиях особенно важно предотвращать аварии.',
    ),
    ['traffic-accident', 'prevention'],
  ),

  s5u8_010_fill_in_blank: fillBlank(
    '길이 미끄러우면 ___가 나지 않게 더 조심해야 해요.',
    ['사고'],
    ['사고', '벨트', '속도', '신호', '주변'],
    L(
      '도로 상태가 좋지 않을수록 사고를 조심해야 해요.',
      'Yo‘l yomon bo‘lsa, avariya xavfiga ko‘proq ehtiyot bo‘lish kerak.',
      'You should be more careful about accidents when road conditions are poor.',
      'При плохих дорожных условиях нужно быть особенно осторожным.',
    ),
    ['traffic-accident'],
  ),

  s5u8_011_type_answer: vocabTypeAnswer(
    '교통사고',
    L(
      '자동차나 다른 교통수단과 관련해 도로에서 일어나는 사고',
      'Transport vositalari bilan bog‘liq yo‘l hodisasi',
      'an accident involving vehicles on the road',
      'авария с транспортом на дороге',
    ),
    'An accident involving vehicles on a road.',
    ['traffic-accident', 'type-answer'],
  ),

  s5u8_012_translate_builder: translateBuilder(
    L(
      '비 오는 날에는 사고가 나지 않게 천천히 운전해야 한다고 표현하기',
      'Yomg‘irli kunda avariya bo‘lmasligi uchun sekin haydash kerakligini ayting.',
      'Say that you should drive slowly on rainy days to prevent an accident.',
      'Скажите, что в дождливый день нужно ехать медленно, чтобы избежать аварии.',
    ),
    [
      '천천히 운전해야 해요',
      '사고가 나지 않게',
      '비 오는 날에는',
      '과속해야 해요',
      '신호를 무시해야 해요',
      '안전벨트를 풀어야 해요',
    ],
    '비 오는 날에는 사고가 나지 않게 천천히 운전해야 해요',
    L(
      '날씨와 안전한 운전 행동을 연결해요.',
      'Ob-havo va xavfsiz haydash harakati bog‘lanadi.',
      'It connects weather conditions with safe driving behavior.',
      'Связываются погодные условия и безопасное вождение.',
    ),
    ['traffic-accident', 'prevention'],
  ),

  s5u8_013_cloze_passage: clozePassage(
    '도로에서 ___가 나면 다른 차도 위험할 수 있습니다. 그래서 운전할 때는 ___가 나지 않게 항상 조심해야 합니다.',
    ['교통사고', '사고'],
    ['사고', '교통사고', '안전벨트', '제한 속도', '교통 신호'],
    L(
      '사고 관련 핵심 표현을 문맥 안에서 구별해요.',
      'Avariya bilan bog‘liq asosiy ifodalar kontekstda farqlanadi.',
      'Distinguish core accident expressions in context.',
      'Различаем основные выражения об авариях в контексте.',
    ),
    ['traffic-accident', 'cloze'],
  ),

  s5u8_014_word_arrange: wordArrange(
    [
      '항상 조심해야 해요',
      '사고가 나지 않게',
      '운전할 때는',
      '과속해야 해요',
      '신호를 무시하고',
      '벨트를 풀어요',
    ],
    '운전할 때는 사고가 나지 않게 항상 조심해야 해요',
    L(
      '안전 운전의 가장 기본적인 목표를 표현해요.',
      'Xavfsiz haydashning asosiy maqsadi ifodalanadi.',
      'It expresses the basic goal of safe driving.',
      'Выражается основная цель безопасного вождения.',
    ),
    ['traffic-accident', 'safety'],
  ),

  s5u8_015_type_answer: vocabTypeAnswer(
    '사고가 나다',
    L(
      '예상하지 못한 사고가 발생하다',
      'Kutilmagan hodisa sodir bo‘lmoq',
      'for an unexpected accident to occur',
      'произойти о неожиданной аварии',
    ),
    'For an unexpected accident to happen.',
    ['traffic-accident-happen', 'type-answer'],
  ),

  s5u8_016_reading_quiz: readingQuiz(
    '민수 씨는 운전 중 앞을 잘 보고 속도를 줄였습니다. 위험한 상황이 있었지만 사고는 발생하지 않았습니다.',
    '민수 씨에게 일어나지 않은 일은 무엇이에요?',
    [
      '교통사고가 났어요.',
      '속도를 줄였어요.',
      '앞을 잘 봤어요.',
      '위험한 상황이 있었어요.',
    ],
    '교통사고가 났어요.',
    L(
      '위험한 상황은 있었지만 실제 사고는 나지 않았어요.',
      'Xavfli vaziyat bo‘ldi, ammo avariya yuz bermadi.',
      'There was danger, but no traffic accident actually occurred.',
      'Опасная ситуация была, но ДТП не произошло.',
    ),
    ['traffic-accident', 'reading'],
  ),

  s5u8_017_translate_builder: translateBuilder(
    L(
      '위험한 상황이 있었지만 사고는 발생하지 않았다고 말하기',
      'Xavfli vaziyat bo‘lgan, ammo avariya yuz bermaganini ayting.',
      'Say that there was a dangerous situation, but no accident occurred.',
      'Скажите, что была опасная ситуация, но аварии не произошло.',
    ),
    [
      '사고는 나지 않았어요',
      '위험한 상황이 있었지만',
      '과속했어요',
      '음주 운전을 했어요',
      '신호를 무시했어요',
      '안전벨트를 풀었어요',
    ],
    '위험한 상황이 있었지만 사고는 나지 않았어요',
    L(
      '위험과 실제 사고 발생을 구별해요.',
      'Xavf va haqiqiy avariya farqlanadi.',
      'It distinguishes danger from an actual accident.',
      'Различаются опасность и фактическая авария.',
    ),
    ['traffic-accident', 'context'],
  ),

  s5u8_018_fill_in_blank: fillBlank(
    '운전할 때는 ___가 나지 않게 앞을 잘 봐야 해요.',
    ['사고'],
    ['사고', '과속', '벨트', '신호', '속도'],
    L(
      '앞을 잘 보는 것은 사고 예방의 기본이에요.',
      'Oldinga diqqat bilan qarash avariyani oldini olishning asosidir.',
      'Watching the road carefully is fundamental to accident prevention.',
      'Внимательно следить за дорогой — основа предотвращения аварий.',
    ),
    ['traffic-accident'],
  ),

  s5u8_019_error_hunt: errorHunt(
    '어제 길에서 교통사고를 났어요.',
    '사고를',
    ['사고가', '사고에', '사고로', '사고도'],
    '사고가',
    L(
      '`교통사고가 나다`라고 말해요.',
      '`교통사고가 나다` deb aytiladi.',
      'The correct expression is 교통사고가 나다.',
      'Правильное выражение — 교통사고가 나다.',
    ),
    ['traffic-accident-happen', 'collocation'],
  ),

  s5u8_020_word_arrange: wordArrange(
    [
      '먼저 생각해야 해요',
      '사고를 예방하는 것을',
      '운전할 때는',
      '과속부터 하고',
      '신호를 무시하고',
      '주변을 보지 말아야 해요',
    ],
    '운전할 때는 사고를 예방하는 것을 먼저 생각해야 해요',
    L(
      '이번 레슨의 핵심은 사고 발생보다 사고 예방이에요.',
      'Bu darsning asosiy maqsadi avariyani oldini olish.',
      'The key focus is preventing accidents before they happen.',
      'Главная цель — предотвращать аварии до их возникновения.',
    ),
    ['traffic-accident', 'lesson-review'],
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 2 · 안전벨트를 매고 속도를 지켜요
  // 안전벨트 / 과속 / 제한 속도
  // ──────────────────────────────────────────────────────────

  s5u8_021_reading_quiz: readingQuiz(
    '차가 출발하기 전에 운전자와 승객 모두 몸을 좌석에 안전하게 고정했습니다.',
    '이 사람들이 한 행동은 무엇이에요?',
    [
      '안전벨트를 맸어요.',
      '과속했어요.',
      '음주 운전을 했어요.',
      '신호를 무시했어요.',
    ],
    '안전벨트를 맸어요.',
    L(
      '차가 출발하기 전에 안전벨트를 착용했어요.',
      'Mashina yurishidan oldin xavfsizlik kamari taqildi.',
      'They fastened their seat belts before the car moved.',
      'Они пристегнули ремни безопасности до начала движения.',
    ),
    ['seatbelt', 'safety'],
  ),

  s5u8_022_type_answer: vocabTypeAnswer(
    '안전벨트를 매다',
    L(
      '자동차 안에서 몸을 보호하기 위해 안전띠를 착용하다',
      'Mashinada tanani himoya qilish uchun xavfsizlik kamarini taqmoq',
      'to fasten a seat belt',
      'пристегнуть ремень безопасности',
    ),
    'To fasten a seat belt.',
    ['seatbelt', 'type-answer'],
  ),

  s5u8_023_translate_builder: translateBuilder(
    L(
      '차가 출발하기 전에 안전띠를 착용해야 한다고 표현하기',
      'Mashina yurishidan oldin xavfsizlik kamarini taqish kerakligini ayting.',
      'Say that you should fasten your seat belt before the car starts.',
      'Скажите, что нужно пристегнуть ремень до начала движения.',
    ),
    [
      '안전벨트를 매야 해요',
      '차가 출발하기 전에',
      '과속해야 해요',
      '신호를 무시해야 해요',
      '주변을 보지 말아야 해요',
      '음주 운전을 해야 해요',
    ],
    '차가 출발하기 전에 안전벨트를 매야 해요',
    L(
      '운전을 시작하기 전 가장 기본적인 안전 행동이에요.',
      'Haydashdan oldingi eng asosiy xavfsizlik harakati.',
      'This is one of the most basic safety actions before driving.',
      'Это одно из основных правил безопасности перед поездкой.',
    ),
    ['seatbelt', 'safety'],
  ),

  s5u8_024_fill_in_blank: fillBlank(
    '차를 타면 먼저 안전벨트를 ___.',
    ['매야 해요'],
    [
      '매야 해요',
      '풀어야 해요',
      '버려야 해요',
      '지나쳐야 해요',
      '무시해야 해요',
    ],
    L(
      '차 안에서는 안전벨트를 착용해야 해요.',
      'Mashinada xavfsizlik kamarini taqish kerak.',
      'You should wear a seat belt in a car.',
      'В автомобиле нужно пристёгиваться.',
    ),
    ['seatbelt'],
  ),

  s5u8_025_word_arrange: wordArrange(
    [
      '안전벨트를 꼭 매세요',
      '과속하세요',
      '차를 타면',
      '신호를 무시하세요',
      '주변을 보지 마세요',
      '음주 운전을 하세요',
    ],
    '차를 타면 안전벨트를 꼭 매세요',
    L(
      '탑승 후 안전벨트를 착용하는 습관을 익혀요.',
      'Mashina ichiga kirgach kamar taqish odatini o‘rganamiz.',
      'Build the habit of fastening your seat belt after getting in.',
      'Формируем привычку пристёгиваться после посадки в автомобиль.',
    ),
    ['seatbelt', 'safety'],
  ),

  s5u8_026_type_answer: vocabTypeAnswer(
    '과속하다',
    L(
      '정해진 속도보다 너무 빠르게 운전하다',
      'Belgilangan tezlikdan tez haydamoq',
      'to speed',
      'превышать скорость',
    ),
    'To drive faster than the allowed speed.',
    ['speeding', 'type-answer'],
  ),

  s5u8_027_error_hunt: errorHunt(
    '차를 타면 안전벨트를 입어요.',
    '입어요.',
    ['매요.', '지켜요.', '살펴요.', '달려요.'],
    '매요.',
    L(
      '안전벨트는 `입다`가 아니라 `매다`를 사용해요.',
      'Xavfsizlik kamari bilan `입다` emas, `매다` ishlatiladi.',
      'Use 매다, not 입다, with 안전벨트.',
      'С 안전벨트 используется 매다, а не 입다.',
    ),
    ['seatbelt', 'collocation'],
  ),

  s5u8_028_translate_builder: translateBuilder(
    L(
      '도로가 비어 있어도 너무 빠르게 운전하면 위험하다고 말하기',
      'Yo‘l bo‘sh bo‘lsa ham tezlikni oshirish xavfli ekanini ayting.',
      'Say that speeding is dangerous even when the road is empty.',
      'Скажите, что превышать скорость опасно, даже если дорога пустая.',
    ),
    [
      '과속하면 위험해요',
      '도로가 비어 있어도',
      '안전벨트를 풀면 안전해요',
      '신호를 무시하면 좋아요',
      '음주 운전을 하면 괜찮아요',
      '주변을 보지 않아도 돼요',
    ],
    '도로가 비어 있어도 과속하면 위험해요',
    L(
      '차가 적다고 해서 속도를 마음대로 높이면 안 돼요.',
      'Mashina kam bo‘lsa ham tezlikni xohlagancha oshirib bo‘lmaydi.',
      'An empty road does not make speeding safe.',
      'Пустая дорога не делает превышение скорости безопасным.',
    ),
    ['speeding', 'danger'],
  ),

  s5u8_029_reading_quiz: readingQuiz(
    '도로 표지판에는 시속 50킬로미터라고 적혀 있습니다. 운전자는 그보다 빠르게 달리지 않았습니다.',
    '운전자가 지킨 것은 무엇이에요?',
    ['제한 속도', '음주 운전', '교통사고', '안전벨트'],
    '제한 속도',
    L(
      '도로에 정해진 최대 운전 속도를 넘지 않았어요.',
      'Yo‘lda belgilangan maksimal tezlikdan oshmadi.',
      'The driver did not exceed the posted speed limit.',
      'Водитель не превысил установленное ограничение скорости.',
    ),
    ['speed-limit', 'reading'],
  ),

  s5u8_030_fill_in_blank: fillBlank(
    '이 도로의 ___는 시속 50킬로미터예요.',
    ['제한 속도'],
    ['제한 속도', '음주 운전', '교통사고', '안전벨트', '교통 신호'],
    L(
      '도로마다 허용되는 최대 속도가 정해져 있어요.',
      'Har bir yo‘lda ruxsat etilgan maksimal tezlik bor.',
      'Each road has a maximum permitted speed.',
      'На каждой дороге установлена максимальная разрешённая скорость.',
    ),
    ['speed-limit'],
  ),

  s5u8_031_type_answer: vocabTypeAnswer(
    '제한 속도',
    L(
      '도로에서 허용하는 가장 높은 운전 속도',
      'Yo‘lda ruxsat etilgan eng yuqori tezlik',
      'the maximum speed permitted on a road',
      'максимальная разрешённая скорость на дороге',
    ),
    'The maximum speed permitted on a road.',
    ['speed-limit', 'type-answer'],
  ),

  s5u8_032_translate_builder: translateBuilder(
    L(
      '사고를 막으려면 도로에서 정한 속도를 지켜야 한다고 말하기',
      'Avariyani oldini olish uchun belgilangan tezlikka rioya qilish kerakligini ayting.',
      'Say that you should obey the speed limit to prevent accidents.',
      'Скажите, что для предотвращения аварий нужно соблюдать ограничение скорости.',
    ),
    [
      '제한 속도를 지켜야 해요',
      '사고를 예방하려면',
      '과속해야 해요',
      '신호를 무시해야 해요',
      '벨트를 풀어야 해요',
      '음주 운전을 해야 해요',
    ],
    '사고를 예방하려면 제한 속도를 지켜야 해요',
    L(
      '속도 규칙을 지키는 이유를 사고 예방과 연결해요.',
      'Tezlik qoidasiga rioya qilish avariya profilaktikasi bilan bog‘lanadi.',
      'Obeying the speed limit is connected to accident prevention.',
      'Соблюдение ограничения скорости связывается с предотвращением аварий.',
    ),
    ['speed-limit', 'safety'],
  ),

  s5u8_033_cloze_passage: clozePassage(
    '차에 타면 먼저 ___를 매고, 운전할 때는 ___를 지켜야 해요.',
    ['안전벨트', '제한 속도'],
    ['제한 속도', '안전벨트', '음주 운전', '교통사고', '주변'],
    L(
      '탑승 안전과 속도 안전을 함께 확인해요.',
      'Kamar va tezlik xavfsizligi birga mashq qilinadi.',
      'Practise both seat-belt and speed safety.',
      'Тренируем безопасность ремня и скорости.',
    ),
    ['seatbelt', 'speed-limit'],
  ),

  s5u8_034_word_arrange: wordArrange(
    [
      '제한 속도를 지켜야 해요',
      '도로에서는',
      '과속해야 해요',
      '음주 운전을 하고',
      '안전하게 운전하려면',
      '신호를 무시해요',
    ],
    '안전하게 운전하려면 도로에서는 제한 속도를 지켜야 해요',
    L(
      '제한 속도 준수를 안전 운전과 연결해요.',
      'Tezlik chekloviga rioya qilish xavfsiz haydash bilan bog‘lanadi.',
      'Speed-limit compliance is linked to safe driving.',
      'Соблюдение ограничения скорости связывается с безопасным вождением.',
    ),
    ['speed-limit', 'safety'],
  ),

  s5u8_035_type_answer: vocabTypeAnswer(
    '제한 속도를 지키다',
    L(
      '도로에서 정해진 속도를 넘지 않고 운전하다',
      'Belgilangan tezlikdan oshmay haydamoq',
      'to obey the speed limit',
      'соблюдать ограничение скорости',
    ),
    'To drive without exceeding the posted speed limit.',
    ['speed-limit', 'type-answer'],
  ),

  s5u8_036_reading_quiz: readingQuiz(
    '운전자는 제한 속도가 60인 도로에서 시속 90킬로미터로 달렸습니다.',
    '이 운전자의 행동은 무엇이에요?',
    [
      '과속했어요.',
      '제한 속도를 지켰어요.',
      '주변을 살폈어요.',
      '안전벨트를 맸어요.',
    ],
    '과속했어요.',
    L(
      '허용된 속도보다 훨씬 빠르게 운전했어요.',
      'Ruxsat etilgan tezlikdan ancha tez haydadi.',
      'The driver travelled much faster than the permitted speed.',
      'Водитель ехал значительно быстрее разрешённой скорости.',
    ),
    ['speeding', 'speed-limit'],
  ),

  s5u8_037_translate_builder: translateBuilder(
    L(
      '제한 속도가 60인 곳에서 90으로 달리면 과속이라고 말하기',
      'Cheklov 60 bo‘lgan yo‘lda 90 bilan yurish tezlikni oshirish ekanini ayting.',
      'Say that driving at 90 where the limit is 60 is speeding.',
      'Скажите, что ехать 90 при ограничении 60 — это превышение скорости.',
    ),
    [
      '과속이에요',
      '제한 속도가 60인데',
      '시속 90으로 달리면',
      '안전 운전이에요',
      '신호를 지키는 거예요',
      '주변을 살피는 거예요',
    ],
    '제한 속도가 60인데 시속 90으로 달리면 과속이에요',
    L(
      '제한 속도와 과속의 관계를 구체적인 숫자로 이해해요.',
      'Tezlik cheklovi va tezlik oshirish aniq sonlar bilan tushuniladi.',
      'Understand speeding relative to a concrete speed limit.',
      'Понимаем превышение скорости на конкретном примере.',
    ),
    ['speeding', 'speed-limit'],
  ),

  s5u8_038_fill_in_blank: fillBlank(
    '허용된 속도보다 너무 빠르게 운전하는 것을 ___이라고 해요.',
    ['과속'],
    ['과속', '안전벨트', '교통 신호', '교통사고', '주변'],
    L(
      '정해진 속도를 넘는 운전을 `과속`이라고 해요.',
      'Belgilangan tezlikdan oshish `과속` deyiladi.',
      'Driving above the allowed speed is called 과속.',
      'Превышение разрешённой скорости называется 과속.',
    ),
    ['speeding'],
  ),

  s5u8_039_error_hunt: errorHunt(
    '안전하게 운전하려면 제한 속도를 무시해야 해요.',
    '무시해야',
    ['지켜야', '넘어야', '버려야', '풀어야'],
    '지켜야',
    L(
      '안전 운전을 위해서는 제한 속도를 `지켜야` 해요.',
      'Xavfsiz haydash uchun tezlik chekloviga `rioya qilish` kerak.',
      'For safe driving, you should obey the speed limit.',
      'Для безопасного вождения нужно соблюдать ограничение скорости.',
    ),
    ['speed-limit', 'meaning'],
  ),

  s5u8_040_word_arrange: wordArrange(
    [
      '사고 위험이 커져요',
      '제한 속도를 넘어서',
      '과속하면',
      '안전벨트를 매고',
      '신호를 지키면',
      '주변을 살피면',
    ],
    '제한 속도를 넘어서 과속하면 사고 위험이 커져요',
    L(
      '속도 위반이 실제 사고 위험과 연결된다는 것을 배워요.',
      'Tezlikni oshirish avariya xavfini kuchaytirishi o‘rganiladi.',
      'Speeding is connected to a higher accident risk.',
      'Превышение скорости связывается с повышенным риском аварии.',
    ),
    ['speeding', 'lesson-review'],
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 3 · 신호와 주변을 확인해요
  // 교통 신호 / 신호를 지키다 / 주변을 살피다
  // ──────────────────────────────────────────────────────────

  s5u8_041_reading_quiz: readingQuiz(
    '교차로에 빨간불이 켜졌습니다. 운전자는 차를 멈추고 초록불이 될 때까지 기다렸습니다.',
    '운전자는 무엇을 잘했어요?',
    [
      '신호를 지켰어요.',
      '과속했어요.',
      '음주 운전을 했어요.',
      '사고를 냈어요.',
    ],
    '신호를 지켰어요.',
    L(
      '교통 신호의 지시에 맞게 차를 멈췄어요.',
      'Yo‘l signaliga muvofiq mashinani to‘xtatdi.',
      'The driver stopped according to the traffic signal.',
      'Водитель остановился в соответствии с сигналом светофора.',
    ),
    ['traffic-signal', 'safety'],
  ),

  s5u8_042_type_answer: vocabTypeAnswer(
    '교통 신호',
    L(
      '차와 사람이 언제 움직이거나 멈춰야 하는지 알려 주는 신호',
      'Mashina va odamlarga qachon yurish yoki to‘xtashni ko‘rsatadigan signal',
      'a signal that controls traffic movement',
      'сигнал, регулирующий дорожное движение',
    ),
    'A signal that controls when traffic should move or stop.',
    ['traffic-signal', 'type-answer'],
  ),

  s5u8_043_translate_builder: translateBuilder(
    L(
      '교차로에서는 도로의 신호를 꼭 따라야 한다고 말하기',
      'Chorrahada yo‘l signaliga albatta rioya qilish kerakligini ayting.',
      'Say that you must obey traffic signals at an intersection.',
      'Скажите, что на перекрёстке обязательно нужно соблюдать сигналы светофора.',
    ),
    [
      '신호를 꼭 지켜야 해요',
      '교차로에서는',
      '신호를 무시해야 해요',
      '과속해야 해요',
      '벨트를 풀어야 해요',
      '주변을 보지 않아야 해요',
    ],
    '교차로에서는 신호를 꼭 지켜야 해요',
    L(
      '교차로 안전에서 신호 준수는 매우 중요해요.',
      'Chorrahada signalga rioya qilish juda muhim.',
      'Obeying signals is essential for intersection safety.',
      'Соблюдение сигналов особенно важно на перекрёстках.',
    ),
    ['traffic-signal', 'safety'],
  ),

  s5u8_044_fill_in_blank: fillBlank(
    '빨간불이면 차를 멈추고 교통 ___를 지켜야 해요.',
    ['신호'],
    ['신호', '사고', '벨트', '속도', '음주'],
    L(
      '빨간 신호에서는 차를 멈춰야 해요.',
      'Qizil signalda mashinani to‘xtatish kerak.',
      'You should stop at a red traffic signal.',
      'На красный сигнал нужно остановиться.',
    ),
    ['traffic-signal'],
  ),

  s5u8_045_word_arrange: wordArrange(
    [
      '신호를 잘 확인해야 해요',
      '교차로에서는',
      '과속해야 해요',
      '주변을 보지 말아야 해요',
      '안전하게 운전하려면',
      '음주 운전을 해야 해요',
    ],
    '안전하게 운전하려면 교차로에서는 신호를 잘 확인해야 해요',
    L(
      '신호 확인을 안전한 교차로 통과와 연결해요.',
      'Signalni tekshirish xavfsiz chorrahadan o‘tish bilan bog‘lanadi.',
      'Checking signals is connected to safe intersection driving.',
      'Проверка сигналов связывается с безопасным проездом перекрёстка.',
    ),
    ['traffic-signal', 'safety'],
  ),

  s5u8_046_type_answer: vocabTypeAnswer(
    '신호를 지키다',
    L(
      '교통 신호에 맞게 멈추거나 움직이다',
      'Yo‘l signaliga muvofiq to‘xtamoq yoki yurmoq',
      'to obey traffic signals',
      'соблюдать сигналы светофора',
    ),
    'To obey traffic signals.',
    ['traffic-signal', 'type-answer'],
  ),

  s5u8_047_error_hunt: errorHunt(
    '안전하게 운전하려면 신호를 버려야 해요.',
    '버려야',
    ['지켜야', '넘어야', '풀어야', '쏟아야'],
    '지켜야',
    L(
      '교통 신호는 버리는 것이 아니라 `지키다`라고 해요.',
      'Yo‘l signaliga `rioya qilish` kerak.',
      'Traffic signals should be obeyed: 신호를 지키다.',
      'Сигналы светофора нужно соблюдать: 신호를 지키다.',
    ),
    ['traffic-signal', 'collocation'],
  ),

  s5u8_048_translate_builder: translateBuilder(
    L(
      '신호가 바뀌어도 바로 움직이지 말고 주위를 확인해야 한다고 말하기',
      'Signal o‘zgarsa ham darhol yurmay, atrofni tekshirish kerakligini ayting.',
      'Say that you should check your surroundings before moving even when the signal changes.',
      'Скажите, что даже после смены сигнала нужно сначала осмотреться.',
    ),
    [
      '주변을 살펴야 해요',
      '바로 움직이지 말고',
      '신호가 바뀌어도',
      '과속해야 해요',
      '눈을 감아야 해요',
      '벨트를 풀어야 해요',
    ],
    '신호가 바뀌어도 바로 움직이지 말고 주변을 살펴야 해요',
    L(
      '신호뿐 아니라 실제 주변 상황도 함께 확인해야 해요.',
      'Faqat signal emas, haqiqiy atrof holatini ham tekshirish kerak.',
      'You should check the actual surroundings as well as the signal.',
      'Нужно проверять не только сигнал, но и реальную обстановку вокруг.',
    ),
    ['check-surroundings', 'traffic-signal'],
  ),

  s5u8_049_reading_quiz: readingQuiz(
    '주차한 차를 출발시키기 전에 운전자는 앞, 뒤, 옆에 사람이나 다른 차가 있는지 천천히 확인했습니다.',
    '운전자가 한 행동은 무엇이에요?',
    [
      '주변을 살폈어요.',
      '과속했어요.',
      '음주 운전을 했어요.',
      '사고를 냈어요.',
    ],
    '주변을 살폈어요.',
    L(
      '차를 움직이기 전 주위의 사람과 차를 확인했어요.',
      'Mashina yurishidan oldin atrofdagi odam va mashinalarni tekshirdi.',
      'The driver checked people and vehicles around the car before moving.',
      'Перед началом движения водитель проверил людей и машины вокруг.',
    ),
    ['check-surroundings', 'safety'],
  ),

  s5u8_050_fill_in_blank: fillBlank(
    '차를 출발시키기 전에 ___을 잘 살펴야 해요.',
    ['주변'],
    ['주변', '과속', '사고', '음주 운전', '제한 속도'],
    L(
      '차 주변에 사람이나 다른 차가 있는지 확인해야 해요.',
      'Mashina atrofida odam yoki boshqa mashina borligini tekshirish kerak.',
      'Check whether people or other vehicles are around the car.',
      'Проверьте, нет ли рядом людей или других машин.',
    ),
    ['check-surroundings'],
  ),

  s5u8_051_type_answer: vocabTypeAnswer(
    '주변을 살피다',
    L(
      '주위에 사람이나 차가 있는지 주의 깊게 확인하다',
      'Atrofda odam yoki mashina borligini diqqat bilan tekshirmoq',
      'to carefully check the surroundings',
      'внимательно осмотреться вокруг',
    ),
    'To carefully check the surroundings.',
    ['check-surroundings', 'type-answer'],
  ),

  s5u8_052_translate_builder: translateBuilder(
    L(
      '차를 움직이기 전 앞뒤와 옆을 잘 확인해야 한다고 표현하기',
      'Mashinani harakatlantirishdan oldin old, orqa va yon tomonlarni tekshirish kerakligini ayting.',
      'Say that you should carefully check around the car before moving it.',
      'Скажите, что перед началом движения нужно внимательно осмотреться вокруг машины.',
    ),
    [
      '주변을 잘 살펴야 해요',
      '차를 움직이기 전에',
      '눈을 감아야 해요',
      '과속해야 해요',
      '신호를 무시해야 해요',
      '음주 운전을 해야 해요',
    ],
    '차를 움직이기 전에 주변을 잘 살펴야 해요',
    L(
      '출발 전 확인 습관은 사고 예방에 중요해요.',
      'Harakatdan oldingi tekshiruv avariyani oldini olish uchun muhim.',
      'Checking before moving is important for accident prevention.',
      'Проверка перед началом движения важна для предотвращения аварий.',
    ),
    ['check-surroundings', 'prevention'],
  ),

  s5u8_053_cloze_passage: clozePassage(
    '교차로에서는 ___를 지키고, 차를 움직이기 전에는 ___을 잘 살펴야 해요.',
    ['신호', '주변'],
    ['주변', '신호', '과속', '음주 운전', '교통사고'],
    L(
      '신호 준수와 주변 확인을 상황에 맞게 구별해요.',
      'Signalga rioya qilish va atrofni tekshirish farqlanadi.',
      'Distinguish obeying signals from checking surroundings.',
      'Различаем соблюдение сигналов и проверку окружающей обстановки.',
    ),
    ['traffic-signal', 'check-surroundings'],
  ),

  s5u8_054_word_arrange: wordArrange(
    [
      '사고를 예방할 수 있어요',
      '신호를 지키고',
      '과속하고',
      '주변을 잘 살피면',
      '음주 운전을 하면',
      '벨트를 풀면',
    ],
    '신호를 지키고 주변을 잘 살피면 사고를 예방할 수 있어요',
    L(
      '두 안전 행동이 실제 사고 예방으로 이어져요.',
      'Ikki xavfsiz harakat avariyani oldini olishga yordam beradi.',
      'The two safety behaviors help prevent accidents.',
      'Эти два безопасных действия помогают предотвращать аварии.',
    ),
    ['traffic-signal', 'check-surroundings'],
  ),

  s5u8_055_type_answer: vocabTypeAnswer(
    '신호를 지키다',
    L(
      '빨간불, 초록불 등 교통 신호의 지시에 맞게 행동하다',
      'Qizil va yashil kabi yo‘l signallariga amal qilmoq',
      'to follow traffic signals such as red and green lights',
      'соблюдать сигналы светофора',
    ),
    'To follow traffic signals.',
    ['traffic-signal', 'type-answer'],
  ),

  s5u8_056_reading_quiz: readingQuiz(
    '운전자는 초록불이 켜지자 바로 출발하지 않았습니다. 옆에서 자전거가 오는 것을 확인한 뒤 자전거가 지나간 후 출발했습니다.',
    '이 운전자의 좋은 습관은 무엇이에요?',
    ['주변을 살펴요.', '과속해요.', '신호를 무시해요.', '음주 운전을 해요.'],
    '주변을 살펴요.',
    L(
      '신호가 바뀐 뒤에도 주변 위험을 한 번 더 확인했어요.',
      'Signal o‘zgargandan keyin ham atrofdagi xavfni yana tekshirdi.',
      'The driver checked for danger even after the signal changed.',
      'Водитель ещё раз проверил обстановку даже после смены сигнала.',
    ),
    ['check-surroundings', 'judgment'],
  ),

  s5u8_057_translate_builder: translateBuilder(
    L(
      '신호만 보지 말고 주변의 사람과 차도 확인해야 한다고 말하기',
      'Faqat signalga emas, atrofdagi odam va mashinalarga ham qarash kerakligini ayting.',
      'Say that you should check people and cars around you, not only the traffic signal.',
      'Скажите, что нужно следить не только за сигналом, но и за людьми и машинами вокруг.',
    ),
    [
      '주변의 사람과 차도 확인해야 해요',
      '신호만 보지 말고',
      '과속해야 해요',
      '벨트를 풀어야 해요',
      '눈을 감아야 해요',
      '음주 운전을 해야 해요',
    ],
    '신호만 보지 말고 주변의 사람과 차도 확인해야 해요',
    L(
      '실제 도로에서는 여러 정보를 함께 확인해야 해요.',
      'Haqiqiy yo‘lda bir nechta ma’lumotni birga tekshirish kerak.',
      'Real driving requires checking multiple sources of information.',
      'На реальной дороге нужно учитывать сразу несколько источников информации.',
    ),
    ['check-surroundings', 'traffic-signal'],
  ),

  s5u8_058_fill_in_blank: fillBlank(
    '차선을 바꾸기 전에는 반드시 ___을 살펴야 해요.',
    ['주변'],
    ['주변', '과속', '음주 운전', '사고', '제한 속도'],
    L(
      '움직임을 바꾸기 전에 다른 차가 있는지 확인해요.',
      'Harakat yo‘nalishini o‘zgartirishdan oldin boshqa mashinalarni tekshiring.',
      'Check for other vehicles before changing your movement.',
      'Перед изменением направления нужно проверить другие машины.',
    ),
    ['check-surroundings'],
  ),

  s5u8_059_error_hunt: errorHunt(
    '교차로에서는 신호를 버리고 운전해야 해요.',
    '버리고',
    ['지키고', '쏟고', '풀고', '넘고'],
    '지키고',
    L(
      '교차로에서는 교통 신호를 `지키고` 운전해야 해요.',
      'Chorrahada yo‘l signaliga `rioya qilib` haydash kerak.',
      'You should drive while obeying traffic signals.',
      'На перекрёстке нужно ехать, соблюдая сигналы.',
    ),
    ['traffic-signal', 'collocation'],
  ),

  s5u8_060_word_arrange: wordArrange(
    [
      '안전 운전의 기본이에요',
      '과속과',
      '신호를 지키고',
      '주변을 확인하는 것은',
      '음주 운전을 하는 것은',
      '신호를 무시하는 것은',
    ],
    '신호를 지키고 주변을 확인하는 것은 안전 운전의 기본이에요',
    L(
      '신호와 주변 확인이 단순 어휘가 아니라 안전 행동이라는 점을 정리해요.',
      'Signal va atrofni tekshirish xavfsiz harakat ekanini umumlashtiramiz.',
      'Signal compliance and awareness are core safe-driving behaviors.',
      'Соблюдение сигналов и контроль обстановки — основы безопасного вождения.',
    ),
    ['traffic-signal', 'check-surroundings', 'lesson-review'],
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 4 · 위험한 운전을 피해야 해요
  // 음주 운전 + 과속 + 위험 행동 판단
  // ──────────────────────────────────────────────────────────

  s5u8_061_reading_quiz: readingQuiz(
    '한 사람은 저녁 식사에서 술을 여러 잔 마셨습니다. 집에 갈 때 자신의 자동차를 직접 운전하려고 합니다.',
    '이 행동을 무엇이라고 해요?',
    ['음주 운전', '안전 운전', '제한 속도', '교통 신호'],
    '음주 운전',
    L(
      '술을 마신 상태에서 자동차를 운전하려는 상황이에요.',
      'Spirtli ichimlik ichgan holda mashina haydash vaziyati.',
      'The person is attempting to drive after drinking alcohol.',
      'Человек собирается вести машину после употребления алкоголя.',
    ),
    ['drunk-driving', 'danger'],
  ),

  s5u8_062_type_answer: vocabTypeAnswer(
    '음주 운전',
    L(
      '술을 마신 상태에서 자동차를 운전하는 것',
      'Spirtli ichimlik ichgan holda mashina haydash',
      'drunk driving',
      'вождение в нетрезвом виде',
    ),
    'Driving a vehicle after drinking alcohol.',
    ['drunk-driving', 'type-answer'],
  ),

  s5u8_063_translate_builder: translateBuilder(
    L(
      '술을 마신 후 자동차를 운전하는 것은 매우 위험하다고 말하기',
      'Spirtli ichimlik ichgandan keyin mashina haydash juda xavfli ekanini ayting.',
      'Say that drunk driving is extremely dangerous.',
      'Скажите, что вождение в нетрезвом виде очень опасно.',
    ),
    [
      '매우 위험해요',
      '음주 운전은',
      '안전해요',
      '제한 속도를 지켜요',
      '신호를 잘 지켜요',
      '주변을 잘 살펴요',
    ],
    '음주 운전은 매우 위험해요',
    L(
      '음주 운전을 위험 행동으로 정확하게 분류해요.',
      'Mast holda haydash xavfli harakat sifatida aniqlanadi.',
      'Drunk driving is correctly identified as dangerous behavior.',
      'Вождение в нетрезвом виде определяется как опасное поведение.',
    ),
    ['drunk-driving', 'danger'],
  ),

  s5u8_064_fill_in_blank: fillBlank(
    '술을 마신 뒤 자동차를 운전하는 것을 ___이라고 해요.',
    ['음주 운전'],
    ['음주 운전', '교통 신호', '제한 속도', '안전벨트', '교통사고'],
    L(
      '술을 마신 상태의 운전을 `음주 운전`이라고 해요.',
      'Spirtli ichimlik ichib haydash `음주 운전` deyiladi.',
      'Driving after drinking is called 음주 운전.',
      'Вождение после употребления алкоголя называется 음주 운전.',
    ),
    ['drunk-driving'],
  ),

  s5u8_065_word_arrange: wordArrange(
    [
      '절대로 하면 안 돼요',
      '제한 속도를 지켜야 해요',
      '음주 운전은',
      '신호를 잘 봐야 해요',
      '주변을 살펴야 해요',
      '안전벨트를 매야 해요',
    ],
    '음주 운전은 절대로 하면 안 돼요',
    L(
      '음주 운전에 대한 명확한 안전 판단을 연습해요.',
      'Mast holda haydashga nisbatan aniq xavfsizlik qarori mashq qilinadi.',
      'Practise making a clear safety judgment about drunk driving.',
      'Тренируем однозначную оценку вождения в нетрезвом виде.',
    ),
    ['drunk-driving', 'danger'],
  ),

  s5u8_066_type_answer: vocabTypeAnswer(
    '음주 운전을 하다',
    L(
      '술을 마신 상태에서 자동차를 운전하다',
      'Spirtli ichimlik ichgan holda mashina haydamoq',
      'to drive after drinking alcohol',
      'управлять машиной после употребления алкоголя',
    ),
    'To drive after consuming alcohol.',
    ['drunk-driving', 'type-answer'],
  ),

  s5u8_067_error_hunt: errorHunt(
    '술을 마신 뒤에는 음주 운전을 해야 해요.',
    '해야',
    ['하면 안', '계속', '빨리', '반드시'],
    '하면 안',
    L(
      '음주 운전은 해야 하는 행동이 아니라 금지해야 하는 위험 행동이에요.',
      'Mast holda haydash bajarilishi kerak emas, taqiqlanishi kerak bo‘lgan xavfli harakat.',
      'Drunk driving is a dangerous behavior that should be avoided.',
      'Вождение в нетрезвом виде — опасное действие, которого нужно избегать.',
    ),
    ['drunk-driving', 'meaning'],
  ),

  s5u8_068_translate_builder: translateBuilder(
    L(
      '술을 마셨다면 자동차를 직접 운전하면 안 된다고 말하기',
      'Spirtli ichimlik ichgan bo‘lsangiz, mashinani o‘zingiz haydamaslik kerakligini ayting.',
      'Say that you must not drive yourself after drinking alcohol.',
      'Скажите, что после употребления алкоголя нельзя самому садиться за руль.',
    ),
    [
      '직접 운전하면 안 돼요',
      '술을 마셨다면',
      '과속해야 해요',
      '신호를 무시해야 해요',
      '안전벨트를 풀어야 해요',
      '주변을 보지 않아야 해요',
    ],
    '술을 마셨다면 직접 운전하면 안 돼요',
    L(
      '상황에 맞는 안전한 선택을 판단하는 문제예요.',
      'Vaziyatga mos xavfsiz tanlovni aniqlash mashqi.',
      'The learner identifies the safe choice for the situation.',
      'Учащийся определяет безопасный выбор в данной ситуации.',
    ),
    ['drunk-driving', 'judgment'],
  ),

  s5u8_069_reading_quiz: readingQuiz(
    '운전자 A는 제한 속도를 지키며 주변을 확인했습니다. 운전자 B는 제한 속도를 크게 넘겨 빠르게 달렸습니다.',
    '더 위험한 행동을 한 사람은 누구예요?',
    [
      '운전자 B',
      '운전자 A',
      '둘 다 똑같이 안전해요.',
      '둘 다 운전하지 않았어요.',
    ],
    '운전자 B',
    L(
      '제한 속도를 크게 넘는 과속은 사고 위험을 높여요.',
      'Tezlik cheklovidan ancha oshish avariya xavfini kuchaytiradi.',
      'Driving far above the speed limit increases accident risk.',
      'Сильное превышение скорости повышает риск аварии.',
    ),
    ['speeding', 'judgment'],
  ),

  s5u8_070_fill_in_blank: fillBlank(
    '제한 속도를 크게 넘어서 운전하는 것은 ___이에요.',
    ['과속'],
    ['과속', '안전벨트', '주변', '교통 신호', '교통사고'],
    L(
      '허용된 속도를 넘는 운전은 과속이에요.',
      'Ruxsat etilgan tezlikdan oshish `과속`.',
      'Driving above the allowed speed is speeding.',
      'Езда выше разрешённой скорости — это превышение скорости.',
    ),
    ['speeding'],
  ),

  s5u8_071_type_answer: vocabTypeAnswer(
    '과속',
    L(
      '도로의 제한 속도보다 빠르게 운전하는 행동',
      'Yo‘l tezlik cheklovidan tezroq haydash',
      'the act of driving above the speed limit',
      'превышение установленной скорости',
    ),
    'Driving above a road speed limit.',
    ['speeding', 'type-answer'],
  ),

  s5u8_072_translate_builder: translateBuilder(
    L(
      '과속과 음주 운전은 모두 사고 위험을 높인다고 표현하기',
      'Tezlikni oshirish va mast holda haydash ikkalasi ham avariya xavfini oshirishini ayting.',
      'Say that both speeding and drunk driving increase accident risk.',
      'Скажите, что и превышение скорости, и вождение в нетрезвом виде повышают риск аварии.',
    ),
    [
      '사고 위험을 높여요',
      '과속과 음주 운전은',
      '둘 다',
      '사고를 예방해요',
      '안전벨트를 매요',
      '신호를 잘 지켜요',
    ],
    '과속과 음주 운전은 둘 다 사고 위험을 높여요',
    L(
      '서로 다른 두 위험 행동의 공통점을 이해해요.',
      'Ikki xil xavfli harakatning umumiy jihati tushuniladi.',
      'Understand the shared risk of two dangerous driving behaviors.',
      'Понимаем общий риск двух опасных видов поведения.',
    ),
    ['speeding', 'drunk-driving'],
  ),

  s5u8_073_cloze_passage: clozePassage(
    '제한 속도를 넘어서 운전하는 것을 ___이라고 하고, 술을 마신 뒤 운전하는 것을 ___이라고 해요.',
    ['과속', '음주 운전'],
    ['음주 운전', '과속', '교통 신호', '안전벨트', '주변'],
    L(
      '두 가지 위험 운전 행동을 정확히 구별해요.',
      'Ikki xavfli haydash turi aniq farqlanadi.',
      'Distinguish two dangerous driving behaviors.',
      'Различаем два вида опасного вождения.',
    ),
    ['speeding', 'drunk-driving'],
  ),

  s5u8_074_word_arrange: wordArrange(
    [
      '사고 위험이 높아져요',
      '과속하거나',
      '신호를 지키거나',
      '음주 운전을 하면',
      '주변을 잘 살피면',
      '벨트를 매면',
    ],
    '과속하거나 음주 운전을 하면 사고 위험이 높아져요',
    L(
      '위험 행동과 사고 가능성을 연결해요.',
      'Xavfli harakat va avariya ehtimoli bog‘lanadi.',
      'Dangerous behavior is connected to accident risk.',
      'Опасное поведение связывается с риском аварии.',
    ),
    ['speeding', 'drunk-driving'],
  ),

  s5u8_075_type_answer: vocabTypeAnswer(
    '음주 운전',
    L(
      '술을 마신 사람이 자동차를 운전하는 위험한 행동',
      'Spirtli ichimlik ichgan odamning mashina haydashi',
      'the dangerous act of driving after drinking',
      'опасное вождение после употребления алкоголя',
    ),
    'The dangerous act of driving after drinking alcohol.',
    ['drunk-driving', 'type-answer'],
  ),

  s5u8_076_reading_quiz: readingQuiz(
    '운전자는 술을 마신 뒤 자동차 열쇠를 가족에게 주고 택시를 이용했습니다.',
    '이 선택이 좋은 이유는 무엇이에요?',
    [
      '음주 운전을 피했기 때문이에요.',
      '과속할 수 있기 때문이에요.',
      '신호를 무시할 수 있기 때문이에요.',
      '안전벨트를 매지 않아도 되기 때문이에요.',
    ],
    '음주 운전을 피했기 때문이에요.',
    L(
      '술을 마신 뒤 직접 운전하지 않는 것이 안전한 선택이에요.',
      'Ichgandan keyin o‘zi haydamaslik xavfsiz tanlov.',
      'Not driving after drinking is the safe choice.',
      'Не садиться за руль после алкоголя — безопасный выбор.',
    ),
    ['drunk-driving', 'judgment'],
  ),

  s5u8_077_translate_builder: translateBuilder(
    L(
      '술을 마신 날에는 직접 운전하지 않는 것이 안전하다고 말하기',
      'Spirtli ichimlik ichgan kuni o‘zi haydamaslik xavfsiz ekanini ayting.',
      'Say that it is safer not to drive yourself on a day when you have been drinking.',
      'Скажите, что после употребления алкоголя безопаснее самому не садиться за руль.',
    ),
    [
      '직접 운전하지 않는 것이 안전해요',
      '술을 마신 날에는',
      '과속하는 것이 안전해요',
      '신호를 무시하는 것이 좋아요',
      '벨트를 풀어야 해요',
      '주변을 안 봐도 돼요',
    ],
    '술을 마신 날에는 직접 운전하지 않는 것이 안전해요',
    L(
      '단어의 의미를 실제 안전한 선택으로 연결해요.',
      'So‘z ma’nosi haqiqiy xavfsiz tanlov bilan bog‘lanadi.',
      'The vocabulary is connected to a real safe decision.',
      'Лексика связывается с реальным безопасным решением.',
    ),
    ['drunk-driving', 'safety'],
  ),

  s5u8_078_fill_in_blank: fillBlank(
    '술을 마셨다면 ___ 운전을 하면 안 돼요.',
    ['음주'],
    ['음주', '안전', '제한', '신호', '주변'],
    L(
      '술을 마신 상태의 운전은 피해야 해요.',
      'Spirtli ichimlik ichgan holda haydashdan qochish kerak.',
      'Driving after drinking should be avoided.',
      'Нужно избегать вождения после употребления алкоголя.',
    ),
    ['drunk-driving'],
  ),

  s5u8_079_error_hunt: errorHunt(
    '과속과 음주 운전은 안전한 운전 습관이에요.',
    '안전한',
    ['위험한', '편리한', '조용한', '간단한'],
    '위험한',
    L(
      '과속과 음주 운전은 모두 사고 위험을 높이는 `위험한` 행동이에요.',
      'Tezlikni oshirish va mast haydash `xavfli` harakatlar.',
      'Speeding and drunk driving are dangerous behaviors.',
      'Превышение скорости и вождение в нетрезвом виде — опасные действия.',
    ),
    ['speeding', 'drunk-driving'],
  ),

  s5u8_080_word_arrange: wordArrange(
    [
      '피해야 해요',
      '과속과',
      '사고를 예방하려면',
      '음주 운전을',
      '신호를 무시하고',
      '벨트를 풀고',
    ],
    '사고를 예방하려면 과속과 음주 운전을 피해야 해요',
    L(
      '이번 레슨의 위험 행동 두 가지를 사고 예방과 연결해요.',
      'Ikki xavfli harakat avariya profilaktikasi bilan bog‘lanadi.',
      'The two dangerous behaviors are connected to accident prevention.',
      'Два опасных действия связываются с предотвращением аварий.',
    ),
    ['speeding', 'drunk-driving', 'lesson-review'],
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 5 · 안전 운전 습관을 선택해요
  // Unit 8 핵심 WORD 종합
  // ──────────────────────────────────────────────────────────

  s5u8_081_reading_quiz: readingQuiz(
    '지수 씨는 차에 타자마자 안전벨트를 맸습니다. 제한 속도를 지키고, 교차로에서는 신호와 주변 상황도 확인했습니다.',
    '지수 씨의 운전을 가장 잘 설명한 것은 무엇이에요?',
    [
      '안전한 운전 습관을 지키고 있어요.',
      '계속 과속하고 있어요.',
      '음주 운전을 하고 있어요.',
      '신호를 무시하고 있어요.',
    ],
    '안전한 운전 습관을 지키고 있어요.',
    L(
      '여러 안전 행동을 함께 실천하고 있어요.',
      'Bir nechta xavfsiz haydash odatiga amal qilmoqda.',
      'Several safe-driving behaviors are being practised together.',
      'Одновременно соблюдаются несколько правил безопасного вождения.',
    ),
    ['unit-8-vocab', 'integration'],
  ),

  s5u8_082_type_answer: vocabTypeAnswer(
    '안전벨트를 매다',
    L(
      '자동차를 타고 이동할 때 몸을 보호하기 위해 안전띠를 착용하다',
      'Mashinada tanani himoya qilish uchun xavfsizlik kamarini taqmoq',
      'to fasten a seat belt for protection in a car',
      'пристегнуть ремень безопасности в автомобиле',
    ),
    'To fasten a seat belt for protection.',
    ['seatbelt', 'type-answer'],
  ),

  s5u8_083_translate_builder: translateBuilder(
    L(
      '운전 전에 안전벨트를 착용하고 출발 전 주변을 확인해야 한다고 표현하기',
      'Haydashdan oldin kamarni taqib, harakatdan oldin atrofni tekshirish kerakligini ayting.',
      'Say that you should fasten your seat belt and check your surroundings before starting.',
      'Скажите, что перед поездкой нужно пристегнуться и проверить обстановку вокруг.',
    ),
    [
      '주변을 살펴야 해요',
      '출발하기 전에',
      '안전벨트를 매고',
      '과속해야 해요',
      '신호를 무시해야 해요',
      '음주 운전을 해야 해요',
    ],
    '안전벨트를 매고 출발하기 전에 주변을 살펴야 해요',
    L(
      '서로 다른 안전 행동을 하나의 실제 운전 순서로 묶어요.',
      'Turli xavfsizlik harakatlari haqiqiy haydash ketma-ketligida bog‘lanadi.',
      'Different safety behaviors are combined into a realistic driving sequence.',
      'Разные правила безопасности объединяются в реальную последовательность действий.',
    ),
    ['seatbelt', 'check-surroundings'],
  ),

  s5u8_084_fill_in_blank: fillBlank(
    '운전자는 도로의 ___ 속도를 지켜야 해요.',
    ['제한'],
    ['제한', '음주', '사고', '주변', '벨트'],
    L(
      '도로마다 정해진 제한 속도를 따라야 해요.',
      'Har bir yo‘lda belgilangan tezlikka rioya qilish kerak.',
      'Drivers should obey the posted speed limit.',
      'Водители должны соблюдать установленное ограничение скорости.',
    ),
    ['speed-limit'],
  ),

  s5u8_085_word_arrange: wordArrange(
    [
      '제한 속도를 지키고',
      '과속하고',
      '안전벨트를 매고',
      '신호를 무시하고',
      '안전하게 운전하려면',
      '주변을 살펴야 해요',
    ],
    '안전하게 운전하려면 안전벨트를 매고 제한 속도를 지키고 주변을 살펴야 해요',
    L(
      '세 가지 핵심 안전 행동을 한 문장으로 종합해요.',
      'Uchta asosiy xavfsizlik odati bir gapda umumlashtiriladi.',
      'Three core safe-driving behaviors are combined.',
      'Три основных правила безопасного вождения объединяются в одном предложении.',
    ),
    ['unit-8-vocab', 'integration'],
  ),

  s5u8_086_type_answer: vocabTypeAnswer(
    '제한 속도를 지키다',
    L(
      '도로에서 허용된 최고 속도를 넘지 않다',
      'Yo‘lda ruxsat etilgan maksimal tezlikdan oshmaslik',
      'to stay within the speed limit',
      'не превышать ограничение скорости',
    ),
    'To stay within the posted speed limit.',
    ['speed-limit', 'type-answer'],
  ),

  s5u8_087_error_hunt: errorHunt(
    '사고를 예방하려면 제한 속도를 넘어야 해요.',
    '넘어야',
    ['지켜야', '버려야', '풀어야', '쏟아야'],
    '지켜야',
    L(
      '사고 예방을 위해 제한 속도를 `지켜야` 해요.',
      'Avariyani oldini olish uchun tezlik chekloviga `rioya qilish` kerak.',
      'You should obey the speed limit to prevent accidents.',
      'Для предотвращения аварий нужно соблюдать ограничение скорости.',
    ),
    ['speed-limit', 'meaning'],
  ),

  s5u8_088_translate_builder: translateBuilder(
    L(
      '교차로에서는 신호를 지키고 주위의 차와 사람을 확인해야 한다고 말하기',
      'Chorrahada signalga rioya qilib, atrofdagi mashina va odamlarni tekshirish kerakligini ayting.',
      'Say that you should obey the signal and check nearby cars and people at an intersection.',
      'Скажите, что на перекрёстке нужно соблюдать сигнал и проверять машины и людей вокруг.',
    ),
    [
      '주변을 살펴야 해요',
      '교차로에서는',
      '신호를 지키고',
      '과속해야 해요',
      '음주 운전을 해야 해요',
      '안전벨트를 풀어야 해요',
    ],
    '교차로에서는 신호를 지키고 주변을 살펴야 해요',
    L(
      '신호와 실제 주변 상황을 동시에 고려해요.',
      'Signal va real atrof holati birga hisobga olinadi.',
      'Both traffic signals and the actual surroundings must be considered.',
      'Нужно учитывать и сигналы, и реальную дорожную обстановку.',
    ),
    ['traffic-signal', 'check-surroundings'],
  ),

  s5u8_089_reading_quiz: readingQuiz(
    'A는 안전벨트를 매고 제한 속도를 지킵니다. B는 술을 마신 뒤 과속해서 운전합니다.',
    '사고 위험이 더 높은 사람은 누구예요?',
    ['B', 'A', '둘 다 똑같이 안전해요.', '둘 다 운전하지 않아요.'],
    'B',
    L(
      '음주 운전과 과속이 함께 나타나 매우 위험한 상황이에요.',
      'Mast haydash va tezlikni oshirish birga kelib juda xavfli vaziyat yaratadi.',
      'Drunk driving combined with speeding creates a very dangerous situation.',
      'Сочетание вождения в нетрезвом виде и превышения скорости крайне опасно.',
    ),
    ['drunk-driving', 'speeding', 'judgment'],
  ),

  s5u8_090_fill_in_blank: fillBlank(
    '교차로에서는 교통 ___를 지키고 주변을 확인해야 해요.',
    ['신호'],
    ['신호', '사고', '음주', '벨트', '과속'],
    L(
      '교차로에서는 신호와 주변 상황을 함께 확인해요.',
      'Chorrahada signal va atrof vaziyati birga tekshiriladi.',
      'At intersections, check both the signal and the surroundings.',
      'На перекрёстке проверяйте и сигнал, и окружающую обстановку.',
    ),
    ['traffic-signal'],
  ),

  s5u8_091_type_answer: vocabTypeAnswer(
    '주변을 살피다',
    L(
      '운전 중 주위의 사람이나 다른 차를 주의 깊게 확인하다',
      'Haydash paytida atrofdagi odam va mashinalarni diqqat bilan tekshirmoq',
      'to carefully check nearby people and vehicles',
      'внимательно следить за людьми и машинами вокруг',
    ),
    'To carefully check nearby people and vehicles.',
    ['check-surroundings', 'type-answer'],
  ),

  s5u8_092_translate_builder: translateBuilder(
    L(
      '안전하게 운전하려면 과속과 음주 운전을 피해야 한다고 말하기',
      'Xavfsiz haydash uchun tezlik oshirish va mast holda haydashdan qochish kerakligini ayting.',
      'Say that safe driving requires avoiding speeding and drunk driving.',
      'Скажите, что для безопасного вождения нужно избегать превышения скорости и вождения в нетрезвом виде.',
    ),
    [
      '피해야 해요',
      '안전하게 운전하려면',
      '과속과 음주 운전을',
      '신호를 무시해야 해요',
      '벨트를 풀어야 해요',
      '주변을 보지 말아야 해요',
    ],
    '안전하게 운전하려면 과속과 음주 운전을 피해야 해요',
    L(
      '좋은 행동뿐 아니라 피해야 할 행동도 함께 정리해요.',
      'Yaxshi harakatlar bilan birga qochish kerak bo‘lgan harakatlar ham umumlashtiriladi.',
      'Review both good habits and behaviors that must be avoided.',
      'Повторяем и хорошие привычки, и действия, которых нужно избегать.',
    ),
    ['speeding', 'drunk-driving'],
  ),

  s5u8_093_cloze_passage: clozePassage(
    '안전하게 운전하려면 차에 타자마자 ___를 매고, 도로에서는 ___를 지키고, 움직이기 전에는 주변을 살펴야 해요.',
    ['안전벨트', '제한 속도'],
    ['제한 속도', '안전벨트', '음주 운전', '교통사고', '과속'],
    L(
      '출발 전부터 실제 주행까지 필요한 안전 행동을 순서대로 복습해요.',
      'Mashinaga kirishdan haqiqiy haydashgacha xavfsizlik odatlari takrorlanadi.',
      'Review safety behaviors from entering the car through actual driving.',
      'Повторяем правила безопасности от посадки в автомобиль до движения.',
    ),
    ['seatbelt', 'speed-limit', 'integration'],
  ),

  s5u8_094_word_arrange: wordArrange(
    [
      '신호를 지켜야 해요',
      '교통사고를 예방하려면',
      '과속하고',
      '제한 속도를 지키고',
      '음주 운전을 하고',
      '주변을 살펴야 해요',
    ],
    '교통사고를 예방하려면 제한 속도를 지키고 신호를 지켜야 해요',
    L(
      '교통 규칙 준수가 사고 예방으로 이어진다는 점을 종합해요.',
      'Yo‘l qoidalariga rioya qilish avariyani oldini olish bilan bog‘lanadi.',
      'Following road rules is tied directly to accident prevention.',
      'Соблюдение дорожных правил напрямую связано с предотвращением аварий.',
    ),
    ['traffic-accident', 'speed-limit', 'traffic-signal'],
  ),

  s5u8_095_type_answer: vocabTypeAnswer(
    '음주 운전을 하다',
    L(
      '술을 마신 상태에서 자동차를 운전하다',
      'Spirtli ichimlik ichgan holatda mashina haydamoq',
      'to drive a car after drinking alcohol',
      'вести автомобиль после употребления алкоголя',
    ),
    'To drive a vehicle after drinking alcohol.',
    ['drunk-driving', 'type-answer'],
  ),

  s5u8_096_reading_quiz: readingQuiz(
    '운전자는 차에 타서 안전벨트를 맸습니다. 제한 속도를 지켰고 교차로의 신호를 확인했습니다. 출발하거나 방향을 바꿀 때마다 주변도 확인했습니다.',
    '이 글에서 반복해서 강조하는 것은 무엇이에요?',
    [
      '사고를 예방하는 안전 습관',
      '더 빠르게 운전하는 방법',
      '교통 규칙을 무시하는 방법',
      '술을 마시고 운전하는 방법',
    ],
    '사고를 예방하는 안전 습관',
    L(
      '각 단어를 별도로 암기하는 것이 아니라 실제 안전 행동으로 연결해요.',
      'Har bir so‘zni alohida yodlash emas, haqiqiy xavfsiz harakat bilan bog‘lash maqsad.',
      'The vocabulary is connected to real safety behavior instead of isolated memorization.',
      'Лексика связывается с реальным безопасным поведением, а не учится изолированно.',
    ),
    ['unit-8-vocab', 'learning-value'],
  ),

  s5u8_097_translate_builder: translateBuilder(
    L(
      '사고를 예방하려면 안전벨트, 속도, 신호, 주변을 모두 신경 써야 한다고 표현하기',
      'Avariyani oldini olish uchun kamar, tezlik, signal va atrofga hammasiga e’tibor berish kerakligini ayting.',
      'Say that preventing accidents requires paying attention to seat belts, speed, signals, and surroundings.',
      'Скажите, что для предотвращения аварий нужно следить за ремнём, скоростью, сигналами и обстановкой.',
    ),
    [
      '모두 신경 써야 해요',
      '신호와 주변을',
      '안전벨트와 속도,',
      '사고를 예방하려면',
      '과속만 하면 돼요',
      '음주 운전이 필요해요',
    ],
    '사고를 예방하려면 안전벨트와 속도, 신호와 주변을 모두 신경 써야 해요',
    L(
      'Unit 8의 핵심 안전 요소를 하나의 개념으로 묶어요.',
      'Unit 8dagi asosiy xavfsizlik omillari bitta tushunchaga birlashtiriladi.',
      'The major Unit 8 safety elements are combined into one concept.',
      'Основные элементы безопасности Unit 8 объединяются в одну систему.',
    ),
    ['unit-8-vocab', 'integration'],
  ),

  s5u8_098_fill_in_blank: fillBlank(
    '사고를 예방하려면 과속과 ___ 운전을 피해야 해요.',
    ['음주'],
    ['음주', '안전', '제한', '신호', '주변'],
    L(
      '과속과 음주 운전은 대표적인 위험 행동이에요.',
      'Tezlikni oshirish va mast haydash asosiy xavfli harakatlar.',
      'Speeding and drunk driving are major dangerous behaviors.',
      'Превышение скорости и вождение в нетрезвом виде — основные опасные действия.',
    ),
    ['speeding', 'drunk-driving'],
  ),

  s5u8_099_error_hunt: errorHunt(
    '안전하게 운전하려면 주변을 무시해야 해요.',
    '무시해야',
    ['살펴야', '버려야', '넘어야', '풀어야'],
    '살펴야',
    L(
      '안전 운전에서는 주변을 무시하는 것이 아니라 잘 `살펴야` 해요.',
      'Xavfsiz haydashda atrofni e’tiborsiz qoldirmay, `tekshirish` kerak.',
      'For safe driving, you should check your surroundings rather than ignore them.',
      'Для безопасного вождения нужно следить за обстановкой, а не игнорировать её.',
    ),
    ['check-surroundings', 'meaning'],
  ),

  s5u8_100_word_arrange: wordArrange(
    [
      '실제로 사고를 예방하는 것이에요',
      '과속과 음주 운전을 피하고',
      '신호와 제한 속도를 지키고',
      '안전벨트를 매고',
      '이 단원의 어휘를 배우는 목적은',
      '주변을 무시하는 것이에요',
    ],
    '이 단원의 어휘를 배우는 목적은 안전벨트를 매고 신호와 제한 속도를 지키고 과속과 음주 운전을 피하고 실제로 사고를 예방하는 것이에요',
    L(
      '단어를 외우는 데서 끝내지 않고 실제 교통 상황에서 안전한 판단을 할 수 있게 하는 것이 목표예요.',
      'Maqsad so‘zlarni yodlash emas, haqiqiy yo‘l vaziyatida xavfsiz qaror qila olish.',
      'The goal is not just memorization, but making safe decisions in real traffic situations.',
      'Цель — не просто запомнить слова, а уметь принимать безопасные решения в реальных дорожных ситуациях.',
    ),
    ['unit-8-vocab', 'node-review'],
  ),
  // ══════════════════════════════════════════════════════════
  // Node 2 · V-다가
  // 진행 중이던 행동이 중단되거나 다른 사건·행동으로 바뀔 때
  // ══════════════════════════════════════════════════════════

  // ──────────────────────────────────────────────────────────
  // Lesson 1 · 운전하다가 사고가 났어요
  // V-다가 핵심 의미
  // ──────────────────────────────────────────────────────────

  s5u8_101_reading_quiz: grammarReadingQuiz(
    '민수 씨는 자동차를 운전하고 있었습니다. 그런데 가는 중에 갑자기 교통사고가 났습니다. 진행 중이던 행동과 뒤의 사건을 가장 자연스럽게 연결한 문장을 고르세요.',
    [
      '운전하다가 교통사고가 났어요.',
      '운전하면서 교통사고를 예방했어요.',
      '운전하려고 교통사고가 났어요.',
      '운전했는데도 교통사고를 했어요.',
    ],
    '운전하다가 교통사고가 났어요.',
    L(
      '운전이라는 행동이 진행되는 중에 사고가 발생했어요.',
      'Mashina haydash davomida avariya yuz berdi.',
      'The accident happened while the driving action was in progress.',
      'Авария произошла во время движения.',
    ),
    ['v-daga', 'traffic-accident'],
  ),

  s5u8_102_type_answer: grammarTypeAnswer(
    '운전하다가 교통사고가 났어요',
    L(
      '운전하고 있던 중에 교통사고가 발생했다고 `-다가`를 사용해 쓰세요.',
      'Mashina haydab ketayotganda avariya bo‘lganini `-다가` bilan yozing.',
      'Using -다가, write that a traffic accident happened while driving.',
      'Используя -다가, напишите, что во время вождения произошла авария.',
    ),
    'A traffic accident occurred while the speaker was driving.',
    ['운전하다가'],
    ['v-daga', 'traffic-accident', 'type-answer'],
  ),

  s5u8_103_translate_builder: grammarTranslateBuilder(
    L(
      '운전하고 있던 중에 사고가 발생했다고 말하기',
      'Mashina haydab ketayotganda avariya bo‘lganini ayting.',
      'Say that an accident happened while driving.',
      'Скажите, что во время вождения произошла авария.',
    ),
    [
      '교통사고가 났어요',
      '운전하다가',
      '안전벨트를 매고',
      '제한 속도를 지켜서',
      '신호를 보고',
      '주변을 살폈어요',
    ],
    '운전하다가 교통사고가 났어요',
    L(
      '`V-다가`는 진행 중이던 행동에서 다른 사건으로 바뀌는 흐름을 나타낼 수 있어요.',
      '`V-다가` davom etayotgan harakatdan boshqa hodisaga o‘tishni bildiradi.',
      'V-다가 can show another event occurring during an action in progress.',
      'V-다가 может показывать событие, возникшее во время продолжающегося действия.',
    ),
    ['v-daga', 'traffic-accident'],
  ),

  s5u8_104_fill_in_blank: grammarFillBlank(
    '자동차를 운전___ 사고가 났어요.',
    ['하다가'],
    ['하다가', '하면서', '하려고', '하니까', '하지만'],
    L(
      '운전 중에 사고가 발생해 진행 중이던 행동이 끊겼어요.',
      'Haydash paytida avariya bo‘lib, davom etayotgan harakat uzildi.',
      'The driving action was interrupted by an accident.',
      'Продолжающееся вождение было прервано аварией.',
    ),
    ['v-daga', 'form'],
  ),

  s5u8_105_word_arrange: grammarWordArrange(
    [
      '교통사고가 났어요',
      '길을 가다가',
      '안전벨트를 맸어요',
      '제한 속도를 지켰어요',
      '신호를 봤어요',
      '주변을 살폈어요',
    ],
    '길을 가다가 교통사고가 났어요',
    L(
      '이동 중에 예상하지 못한 사고가 발생한 상황이에요.',
      'Yo‘lda ketayotganda kutilmagan avariya yuz berdi.',
      'An unexpected accident occurred while travelling.',
      'Во время движения неожиданно произошла авария.',
    ),
    ['v-daga', 'traffic-accident'],
  ),

  s5u8_106_type_answer: grammarTypeAnswer(
    '길을 가다가 교통사고를 봤어요',
    L(
      '길을 가는 중에 교통사고 현장을 보았다고 `-다가`로 쓰세요.',
      'Yo‘lda ketayotib avariya joyini ko‘rganingizni `-다가` bilan yozing.',
      'Using -다가, write that you saw a traffic accident while travelling.',
      'Используя -다가, напишите, что по дороге вы увидели аварию.',
    ),
    'The speaker saw a traffic accident while travelling along the road.',
    ['가다가'],
    ['v-daga', 'traffic-accident', 'type-answer'],
  ),

  s5u8_107_error_hunt: grammarErrorHunt(
    '자동차를 운전해다가 사고가 났어요.',
    '운전해다가',
    ['운전하다가', '운전하면서', '운전하려고', '운전하니까'],
    '운전하다가',
    L(
      '`운전하다`는 어간 뒤에 바로 `-다가`를 붙여 `운전하다가`라고 해요.',
      '`운전하다`ga bevosita `-다가` qo‘shilib `운전하다가` bo‘ladi.',
      'Attach -다가 directly to 운전하다: 운전하다가.',
      'К 운전하다 напрямую добавляется -다가: 운전하다가.',
    ),
    ['v-daga', 'conjugation'],
  ),

  s5u8_108_translate_builder: grammarTranslateBuilder(
    L(
      '길을 가고 있던 중에 교통사고를 보았다고 표현하기',
      'Yo‘lda ketayotganda avariyani ko‘rganingizni ayting.',
      'Say that you saw a traffic accident while on your way.',
      'Скажите, что по дороге вы увидели ДТП.',
    ),
    [
      '교통사고를 봤어요',
      '길을 가다가',
      '과속했어요',
      '신호를 무시했어요',
      '안전벨트를 풀었어요',
      '음주 운전을 했어요',
    ],
    '길을 가다가 교통사고를 봤어요',
    L(
      '가던 행동 도중 새로운 사건을 발견한 상황이에요.',
      'Ketayotgan paytda yangi hodisa ko‘rildi.',
      'A new event was encountered while the movement was in progress.',
      'Новое событие было замечено во время движения.',
    ),
    ['v-daga', 'traffic-accident'],
  ),

  s5u8_109_reading_quiz: grammarReadingQuiz(
    '사람이 횡단보도를 건너고 있었습니다. 아직 반대편에 도착하기 전에 교통 신호가 바뀌었습니다. 두 사건의 관계를 가장 자연스럽게 표현한 문장을 고르세요.',
    [
      '길을 건너다가 신호가 바뀌었어요.',
      '길을 건너면서 신호를 지켰어요.',
      '길을 건너려고 신호가 바뀌었어요.',
      '길을 건넜는데도 신호가 없었어요.',
    ],
    '길을 건너다가 신호가 바뀌었어요.',
    L(
      '길을 건너는 행동이 끝나기 전에 신호가 바뀌었어요.',
      'Yo‘lni kesib o‘tish tugashidan oldin signal o‘zgardi.',
      'The signal changed before the crossing action was completed.',
      'Сигнал изменился до завершения перехода дороги.',
    ),
    ['v-daga', 'traffic-signal'],
  ),

  s5u8_110_fill_in_blank: grammarFillBlank(
    '횡단보도를 건너___ 신호가 바뀌었어요.',
    ['다가'],
    ['다가', '면서', '려고', '니까', '지만'],
    L(
      '건너는 도중에 다른 사건인 신호 변화가 생겼어요.',
      'Yo‘lni kesib o‘tish paytida signal o‘zgardi.',
      'The signal changed while the crossing was in progress.',
      'Сигнал изменился во время перехода.',
    ),
    ['v-daga', 'form'],
  ),

  s5u8_111_type_answer: grammarTypeAnswer(
    '횡단보도를 건너다가 신호가 바뀌었어요',
    L(
      '횡단보도를 건너는 도중에 신호가 바뀌었다고 `-다가`를 사용해 쓰세요.',
      'Piyodalar yo‘lagidan o‘tayotganda signal o‘zgarganini `-다가` bilan yozing.',
      'Using -다가, write that the signal changed while crossing the crosswalk.',
      'Используя -다가, напишите, что сигнал изменился во время перехода.',
    ),
    'The traffic signal changed while the speaker was crossing the crosswalk.',
    ['건너다가'],
    ['v-daga', 'traffic-signal', 'type-answer'],
  ),

  s5u8_112_translate_builder: grammarTranslateBuilder(
    L(
      '횡단보도를 건너는 도중 신호가 바뀌었다고 표현하기',
      'Piyodalar yo‘lagidan o‘tayotganda signal o‘zgarganini ayting.',
      'Say that the signal changed while crossing the crosswalk.',
      'Скажите, что сигнал изменился во время перехода.',
    ),
    [
      '신호가 바뀌었어요',
      '횡단보도를 건너다가',
      '과속했어요',
      '벨트를 풀었어요',
      '주변을 무시했어요',
      '자동차를 운전했어요',
    ],
    '횡단보도를 건너다가 신호가 바뀌었어요',
    L(
      '진행 중인 이동과 갑자기 생긴 변화를 연결해요.',
      'Davom etayotgan harakat va kutilmagan o‘zgarish bog‘lanadi.',
      'The ongoing movement is connected with a sudden change.',
      'Продолжающееся движение связывается с внезапным изменением.',
    ),
    ['v-daga', 'traffic-signal'],
  ),

  s5u8_113_cloze_passage: grammarClozePassage(
    '자동차를 운전___ 사고가 났고, 횡단보도를 건너___ 신호가 바뀌었어요.',
    ['하다가', '다가'],
    ['다가', '하다가', '하면서', '하려고', '니까'],
    L(
      '둘 다 진행 중이던 행동에 다른 사건이 발생한 상황이에요.',
      'Ikkala holatda ham davom etayotgan harakat paytida boshqa hodisa yuz berdi.',
      'In both examples, another event occurred during an action in progress.',
      'В обоих случаях другое событие произошло во время продолжающегося действия.',
    ),
    ['v-daga', 'form'],
  ),

  s5u8_114_word_arrange: grammarWordArrange(
    [
      '신호가 바뀌었어요',
      '횡단보도를',
      '과속했어요',
      '건너다가',
      '안전벨트를 맸어요',
      '주변을 살폈어요',
    ],
    '횡단보도를 건너다가 신호가 바뀌었어요',
    L(
      '첫 행동이 끝나기 전에 새로운 변화가 생겼어요.',
      'Birinchi harakat tugamasidan yangi o‘zgarish bo‘ldi.',
      'A new change occurred before the first action finished.',
      'Новое изменение произошло до завершения первого действия.',
    ),
    ['v-daga', 'traffic-signal'],
  ),

  s5u8_115_type_answer: grammarTypeAnswer(
    '버스를 기다리다가 택시를 탔어요',
    L(
      '버스를 기다리고 있었지만 중간에 행동을 바꾸어 택시를 탔다고 `-다가`로 쓰세요.',
      'Avtobus kutayotgan paytda fikringizni o‘zgartirib taksiga chiqqaningizni `-다가` bilan yozing.',
      'Using -다가, write that you were waiting for a bus but switched to taking a taxi.',
      'Используя -다가, напишите, что вы ждали автобус, но затем поехали на такси.',
    ),
    'The speaker was waiting for a bus but stopped and took a taxi instead.',
    ['기다리다가'],
    ['v-daga', 'action-change', 'type-answer'],
  ),

  s5u8_116_reading_quiz: grammarReadingQuiz(
    '수진 씨는 버스를 기다리고 있었습니다. 시간이 너무 오래 걸려서 버스를 계속 기다리지 않고 택시를 탔습니다. 가장 자연스러운 문장을 고르세요.',
    [
      '버스를 기다리다가 택시를 탔어요.',
      '버스를 기다리면서 계속 버스를 탔어요.',
      '버스를 기다리려고 택시를 탔어요.',
      '버스를 기다렸는데도 버스가 택시예요.',
    ],
    '버스를 기다리다가 택시를 탔어요.',
    L(
      '기다리는 행동을 중단하고 다른 행동으로 바꿨어요.',
      'Kutish to‘xtatilib, boshqa harakatga o‘tildi.',
      'The waiting action was stopped and replaced by another action.',
      'Ожидание было прекращено и заменено другим действием.',
    ),
    ['v-daga', 'action-change'],
  ),

  s5u8_117_translate_builder: grammarTranslateBuilder(
    L(
      '버스를 기다리던 중 생각을 바꾸어 택시를 탔다고 말하기',
      'Avtobus kutayotib fikringizni o‘zgartirib taksiga chiqqaningizni ayting.',
      'Say that you stopped waiting for the bus and took a taxi instead.',
      'Скажите, что вы перестали ждать автобус и поехали на такси.',
    ),
    [
      '택시를 탔어요',
      '버스를',
      '기다리다가',
      '계속 기다렸어요',
      '과속했어요',
      '신호를 무시했어요',
    ],
    '버스를 기다리다가 택시를 탔어요',
    L(
      '`-다가`는 행동을 중간에 바꾸는 상황에도 사용할 수 있어요.',
      '`-다가` harakatni yo‘lda o‘zgartirishda ham ishlatiladi.',
      '-다가 can also describe switching from one action to another.',
      '-다가 также используется при смене одного действия на другое.',
    ),
    ['v-daga', 'action-change'],
  ),

  s5u8_118_fill_in_blank: grammarFillBlank(
    '버스를 기다리___ 택시를 탔어요.',
    ['다가'],
    ['다가', '면서', '려고', '니까', '지만'],
    L(
      '기다리던 행동을 중단하고 택시를 타는 행동으로 바꿨어요.',
      'Kutish to‘xtatilib, taksiga chiqishga o‘tildi.',
      'Waiting was interrupted and changed to taking a taxi.',
      'Ожидание было прервано и сменилось поездкой на такси.',
    ),
    ['v-daga', 'form'],
  ),

  s5u8_119_error_hunt: grammarErrorHunt(
    '버스를 기다려다가 택시를 탔어요.',
    '기다려다가',
    ['기다리다가', '기다리면서', '기다리려고', '기다리니까'],
    '기다리다가',
    L(
      '`기다리다`는 어간 `기다리-`에 `-다가`를 붙여 `기다리다가`라고 해요.',
      '`기다리다`ning `기다리-` o‘zagiga `-다가` qo‘shilib `기다리다가` bo‘ladi.',
      'Attach -다가 to the stem 기다리-: 기다리다가.',
      'К основе 기다리- добавляется -다가: 기다리다가.',
    ),
    ['v-daga', 'conjugation'],
  ),

  s5u8_120_word_arrange: grammarWordArrange(
    [
      '다른 사건이 생기거나',
      '`V-다가`는',
      '다른 행동으로 바뀔 때 써요',
      '진행 중이던 행동에',
      '명사에만 붙고',
      '항상 동시에 행동해요',
    ],
    '`V-다가`는 진행 중이던 행동에 다른 사건이 생기거나 다른 행동으로 바뀔 때 써요',
    L(
      '첫 레슨에서 배운 `-다가`의 핵심 의미를 정리해요.',
      'Birinchi darsdagi `-다가`ning asosiy ma’nosi umumlashtiriladi.',
      'This summarizes the core meaning of -다가.',
      'Это итог основного значения -다가.',
    ),
    ['v-daga', 'grammar-summary'],
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 2 · 운전하다가 신호를 못 봤어요
  // 진행 중 행동 + 위험 상황
  // ──────────────────────────────────────────────────────────

  s5u8_121_reading_quiz: grammarReadingQuiz(
    '운전자는 자동차를 운전하는 중에 잠시 다른 곳을 보았습니다. 그 사이 교통 신호가 바뀌었지만 운전자는 바로 확인하지 못했습니다. 가장 자연스러운 문장을 고르세요.',
    [
      '운전하다가 신호를 못 봤어요.',
      '운전하면서 신호를 잘 지켰어요.',
      '운전하려고 신호를 못 봤어요.',
      '운전했는데도 신호를 매었어요.',
    ],
    '운전하다가 신호를 못 봤어요.',
    L(
      '운전이라는 진행 중 행동에서 주의가 다른 곳으로 바뀐 상황이에요.',
      'Haydash paytida e’tibor boshqa tomonga o‘zgargan.',
      'Attention shifted during the ongoing driving action.',
      'Во время движения внимание переключилось на другое.',
    ),
    ['v-daga', 'traffic-signal', 'risk'],
  ),

  s5u8_122_type_answer: grammarTypeAnswer(
    '운전하다가 신호를 못 봤어요',
    L(
      '운전하는 중에 신호를 보지 못했다고 `-다가`를 사용해 쓰세요.',
      'Mashina haydab ketayotganda signalni ko‘rmay qolganingizni `-다가` bilan yozing.',
      'Using -다가, write that you failed to see the traffic signal while driving.',
      'Используя -다가, напишите, что во время вождения вы не заметили сигнал.',
    ),
    'The speaker failed to notice a traffic signal while driving.',
    ['운전하다가'],
    ['v-daga', 'traffic-signal', 'type-answer'],
  ),

  s5u8_123_translate_builder: grammarTranslateBuilder(
    L(
      '운전 중 신호를 보지 못했다고 말하기',
      'Haydash paytida signalni ko‘rmay qolganingizni ayting.',
      'Say that you failed to notice the signal while driving.',
      'Скажите, что во время вождения вы не заметили сигнал.',
    ),
    [
      '신호를 못 봤어요',
      '운전하다가',
      '제한 속도를 지켰어요',
      '안전벨트를 맸어요',
      '주변을 잘 봤어요',
      '차를 세웠어요',
    ],
    '운전하다가 신호를 못 봤어요',
    L(
      '운전 중 주의가 흐트러지면 중요한 신호를 놓칠 수 있어요.',
      'Haydashda e’tibor chalg‘isa muhim signalni o‘tkazib yuborish mumkin.',
      'Distraction while driving can cause a driver to miss an important signal.',
      'Отвлечение за рулём может привести к тому, что водитель пропустит важный сигнал.',
    ),
    ['v-daga', 'traffic-signal'],
  ),

  s5u8_124_fill_in_blank: grammarFillBlank(
    '운전___ 신호를 못 봤어요.',
    ['하다가'],
    ['하다가', '하면서', '하려고', '하니까', '하지만'],
    L(
      '운전하는 중간에 신호 확인을 놓친 상황이에요.',
      'Haydash jarayonida signalni tekshirish o‘tkazib yuborildi.',
      'The driver missed the signal during the driving action.',
      'Во время движения водитель пропустил сигнал.',
    ),
    ['v-daga', 'form'],
  ),

  s5u8_125_word_arrange: grammarWordArrange(
    [
      '사고가 날 뻔했어요',
      '신호를 보지 못하고',
      '운전하다가',
      '안전벨트를 매고',
      '제한 속도를 지켜서',
      '주변을 살펴서',
    ],
    '운전하다가 신호를 보지 못하고 사고가 날 뻔했어요',
    L(
      '운전 중 신호를 놓친 것이 위험한 상황으로 이어졌어요.',
      'Haydashda signalni o‘tkazib yuborish xavfli vaziyatga olib keldi.',
      'Missing the signal while driving led to a dangerous situation.',
      'Пропущенный сигнал во время движения привёл к опасной ситуации.',
    ),
    ['v-daga', 'traffic-signal', 'risk'],
  ),

  s5u8_126_type_answer: grammarTypeAnswer(
    '운전하다가 주변을 제대로 확인하지 못했어요',
    L(
      '운전하는 중에 주변을 제대로 확인하지 못했다고 `-다가`로 쓰세요.',
      'Haydash paytida atrofni yaxshi tekshira olmaganingizni `-다가` bilan yozing.',
      'Using -다가, write that you failed to check your surroundings properly while driving.',
      'Используя -다가, напишите, что во время вождения вы не смогли как следует проверить обстановку.',
    ),
    'The speaker failed to properly check the surroundings while driving.',
    ['운전하다가'],
    ['v-daga', 'check-surroundings', 'type-answer'],
  ),

  s5u8_127_error_hunt: grammarErrorHunt(
    '운전해다가 주변을 제대로 확인하지 못했어요.',
    '운전해다가',
    ['운전하다가', '운전하면서', '운전하려고', '운전하니까'],
    '운전하다가',
    L(
      '`하다` 동사는 `해다가`가 아니라 `하다가`로 사용해요.',
      '`하다` fe’li `해다가` emas, `하다가` shaklida ishlatiladi.',
      'With 하다 verbs, use 하다가, not 해다가.',
      'С глаголами на 하다 используется 하다가, а не 해다가.',
    ),
    ['v-daga', 'conjugation'],
  ),

  s5u8_128_translate_builder: grammarTranslateBuilder(
    L(
      '운전하는 중에 주변 확인을 제대로 하지 못했다고 표현하기',
      'Haydash paytida atrofni yaxshi tekshira olmaganingizni ayting.',
      'Say that you failed to check your surroundings properly while driving.',
      'Скажите, что во время вождения вы плохо проверили обстановку вокруг.',
    ),
    [
      '주변을 제대로 확인하지 못했어요',
      '운전하다가',
      '주변을 잘 살폈어요',
      '제한 속도를 지켰어요',
      '신호를 잘 봤어요',
      '안전벨트를 맸어요',
    ],
    '운전하다가 주변을 제대로 확인하지 못했어요',
    L(
      '운전 중 주변 확인을 놓치는 것이 위험할 수 있다는 상황이에요.',
      'Haydash paytida atrofni tekshirmaslik xavfli bo‘lishi mumkin.',
      'Failing to check the surroundings during driving can be dangerous.',
      'Недостаточная проверка обстановки во время движения может быть опасной.',
    ),
    ['v-daga', 'check-surroundings'],
  ),

  s5u8_129_reading_quiz: grammarReadingQuiz(
    '운전자는 제한 속도를 지키지 않고 빠르게 달리고 있었습니다. 그러던 중 도로에서 위험한 상황이 생겨 급하게 속도를 줄였습니다. 가장 자연스러운 표현을 고르세요.',
    [
      '과속하다가 위험한 상황이 생겼어요.',
      '과속하면서 항상 안전했어요.',
      '과속하려고 위험을 피했어요.',
      '과속했는데도 제한 속도를 지켰어요.',
    ],
    '과속하다가 위험한 상황이 생겼어요.',
    L(
      '과속이라는 위험 행동을 하는 도중 새로운 위험 상황이 생겼어요.',
      'Tezlikni oshirib ketayotganda yangi xavf yuz berdi.',
      'A dangerous situation occurred while the driver was speeding.',
      'Опасная ситуация возникла во время превышения скорости.',
    ),
    ['v-daga', 'speeding', 'risk'],
  ),

  s5u8_130_fill_in_blank: grammarFillBlank(
    '과속___ 위험한 상황이 생겼어요.',
    ['하다가'],
    ['하다가', '하면서', '하려고', '하니까', '하지만'],
    L(
      '과속 중에 다른 위험 상황이 발생했어요.',
      'Tezlik oshirilayotgan paytda boshqa xavf yuz berdi.',
      'Another dangerous situation arose while speeding.',
      'Во время превышения скорости возникла другая опасная ситуация.',
    ),
    ['v-daga', 'speeding'],
  ),

  s5u8_131_type_answer: grammarTypeAnswer(
    '과속하다가 교통사고가 났어요',
    L(
      '제한 속도를 넘겨 운전하던 중 교통사고가 발생했다고 `-다가`로 쓰세요.',
      'Tezlikni oshirib ketayotganda avariya bo‘lganini `-다가` bilan yozing.',
      'Using -다가, write that a traffic accident happened while speeding.',
      'Используя -다가, напишите, что во время превышения скорости произошла авария.',
    ),
    'A traffic accident occurred while the driver was speeding.',
    ['과속하다가'],
    ['v-daga', 'speeding', 'traffic-accident', 'type-answer'],
  ),

  s5u8_132_translate_builder: grammarTranslateBuilder(
    L(
      '과속하던 중 사고가 발생했다고 표현하기',
      'Tezlikni oshirib ketayotganda avariya bo‘lganini ayting.',
      'Say that an accident happened while speeding.',
      'Скажите, что авария произошла во время превышения скорости.',
    ),
    [
      '교통사고가 났어요',
      '과속하다가',
      '제한 속도를 지켜서',
      '안전벨트를 매서',
      '신호를 잘 봐서',
      '주변을 살펴서',
    ],
    '과속하다가 교통사고가 났어요',
    L(
      '위험한 운전 행동과 사고 발생을 직접 연결해요.',
      'Xavfli haydash va avariya yuz berishi bog‘lanadi.',
      'The dangerous driving behavior is directly connected with the accident.',
      'Опасное вождение напрямую связывается с аварией.',
    ),
    ['v-daga', 'speeding', 'traffic-accident'],
  ),

  s5u8_133_cloze_passage: grammarClozePassage(
    '운전___ 신호를 못 봤고, 과속___ 위험한 상황이 생겼어요.',
    ['하다가', '하다가'],
    ['하다가', '하다가', '하면서', '하려고', '하니까'],
    L(
      '운전 중에 생길 수 있는 두 가지 위험 상황을 `-다가`로 표현해요.',
      'Haydashdagi ikki xavfli vaziyat `-다가` bilan ifodalanadi.',
      'Two dangerous situations during driving are expressed with -다가.',
      'Две опасные ситуации во время движения выражаются с помощью -다가.',
    ),
    ['v-daga', 'risk'],
  ),

  s5u8_134_word_arrange: grammarWordArrange(
    [
      '교통사고가 났어요',
      '과속하다가',
      '제한 속도를 지키고',
      '신호를 잘 보고',
      '주변을 살피고',
      '안전벨트를 매서',
    ],
    '과속하다가 교통사고가 났어요',
    L(
      '과속 중에 실제 사고가 발생한 상황이에요.',
      'Tezlikni oshirish paytida haqiqiy avariya yuz berdi.',
      'A real accident happened while speeding.',
      'Во время превышения скорости произошла реальная авария.',
    ),
    ['v-daga', 'speeding'],
  ),

  s5u8_135_type_answer: grammarTypeAnswer(
    '신호를 무시하고 가다가 사고가 났어요',
    L(
      '신호를 지키지 않고 계속 가던 중 사고가 발생했다고 `-다가`를 사용해 쓰세요.',
      'Signalga rioya qilmay ketayotganda avariya bo‘lganini `-다가` bilan yozing.',
      'Using -다가, write that an accident happened while continuing after ignoring a traffic signal.',
      'Используя -다가, напишите, что авария произошла, когда водитель продолжил движение, проигнорировав сигнал.',
    ),
    'An accident occurred while the driver continued after ignoring the traffic signal.',
    ['가다가'],
    ['v-daga', 'traffic-signal', 'type-answer'],
  ),

  s5u8_136_reading_quiz: grammarReadingQuiz(
    '운전자는 빨간 신호를 무시한 채 계속 앞으로 갔습니다. 그러던 중 교차로에서 사고가 났습니다. 가장 자연스러운 설명을 고르세요.',
    [
      '신호를 무시하고 가다가 사고가 났어요.',
      '신호를 지키면서 사고를 예방했어요.',
      '신호를 보려고 사고가 났어요.',
      '신호를 지켰는데도 과속했어요.',
    ],
    '신호를 무시하고 가다가 사고가 났어요.',
    L(
      '잘못된 행동을 계속하던 도중 사고가 발생했어요.',
      'Noto‘g‘ri harakat davomida avariya yuz berdi.',
      'The accident occurred while the unsafe action continued.',
      'Авария произошла во время продолжения опасного действия.',
    ),
    ['v-daga', 'traffic-signal', 'traffic-accident'],
  ),

  s5u8_137_translate_builder: grammarTranslateBuilder(
    L(
      '신호를 무시하고 계속 가던 중 사고가 났다고 말하기',
      'Signalga rioya qilmay ketayotganda avariya bo‘lganini ayting.',
      'Say that an accident happened while continuing after ignoring the signal.',
      'Скажите, что авария произошла во время движения после игнорирования сигнала.',
    ),
    [
      '사고가 났어요',
      '신호를 무시하고',
      '가다가',
      '신호를 잘 지키고',
      '주변을 살펴서',
      '제한 속도를 지켜서',
    ],
    '신호를 무시하고 가다가 사고가 났어요',
    L(
      '교통 신호 위반이 실제 사고 상황으로 이어진 예예요.',
      'Signalga rioya qilmaslik avariyaga olib kelgan misol.',
      'This is an example of ignoring a traffic signal leading to an accident.',
      'Это пример того, как игнорирование сигнала привело к аварии.',
    ),
    ['v-daga', 'traffic-signal'],
  ),

  s5u8_138_fill_in_blank: grammarFillBlank(
    '신호를 무시하고 가___ 사고가 났어요.',
    ['다가'],
    ['다가', '면서', '려고', '니까', '지만'],
    L(
      '계속 가고 있던 도중 사고가 발생했어요.',
      'Ketishda davom etayotgan paytda avariya yuz berdi.',
      'The accident occurred while the movement continued.',
      'Авария произошла во время продолжающегося движения.',
    ),
    ['v-daga', 'form'],
  ),

  s5u8_139_error_hunt: grammarErrorHunt(
    '과속해다가 사고가 났어요.',
    '과속해다가',
    ['과속하다가', '과속하면서', '과속하려고', '과속하니까'],
    '과속하다가',
    L(
      '`과속하다`도 `운전하다`처럼 `과속하다가`로 써요.',
      '`과속하다` ham `과속하다가` shaklida ishlatiladi.',
      '과속하다 also becomes 과속하다가.',
      '과속하다 также принимает форму 과속하다가.',
    ),
    ['v-daga', 'conjugation'],
  ),

  s5u8_140_word_arrange: grammarWordArrange(
    [
      '사고로 이어질 수 있어요',
      '과속하다가',
      '신호를 놓치거나',
      '운전에 집중하지 않으면',
      '항상 안전하고',
      '주변을 볼 필요가 없어요',
    ],
    '운전에 집중하지 않으면 과속하다가 신호를 놓치거나 사고로 이어질 수 있어요',
    L(
      '문법을 실제 안전 판단과 연결하는 것이 핵심이에요.',
      'Grammatikani haqiqiy xavfsizlik qarori bilan bog‘lash muhim.',
      'The grammar is connected with practical traffic-safety judgment.',
      'Грамматика связывается с реальной оценкой дорожной безопасности.',
    ),
    ['v-daga', 'lesson-review', 'risk'],
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 3 · 하던 일을 바꿨어요
  // 진행 행동 중단 → 다른 행동
  // ──────────────────────────────────────────────────────────

  s5u8_141_reading_quiz: grammarReadingQuiz(
    '수진 씨는 집까지 걸어가고 있었습니다. 그런데 비가 많이 오기 시작해서 걷는 것을 그만두고 버스를 탔습니다. 가장 자연스러운 문장을 고르세요.',
    [
      '걸어가다가 버스를 탔어요.',
      '걸어가면서 계속 걸었어요.',
      '걸어가려고 버스를 탔어요.',
      '걸어갔는데도 버스를 걸었어요.',
    ],
    '걸어가다가 버스를 탔어요.',
    L(
      '걷던 행동을 중단하고 버스를 타는 행동으로 바뀌었어요.',
      'Yurish to‘xtatilib, avtobusga chiqishga o‘tildi.',
      'The walking action stopped and changed to taking a bus.',
      'Ходьба была прекращена и сменилась поездкой на автобусе.',
    ),
    ['v-daga', 'action-change'],
  ),

  s5u8_142_type_answer: grammarTypeAnswer(
    '걸어가다가 버스를 탔어요',
    L(
      '걸어서 가던 중 행동을 바꾸어 버스를 탔다고 `-다가`로 쓰세요.',
      'Piyoda ketayotib, keyin avtobusga chiqqaningizni `-다가` bilan yozing.',
      'Using -다가, write that you were walking but switched to taking a bus.',
      'Используя -다가, напишите, что вы шли пешком, а затем поехали на автобусе.',
    ),
    'The speaker was walking but changed to taking a bus.',
    ['걸어가다가'],
    ['v-daga', 'action-change', 'type-answer'],
  ),

  s5u8_143_translate_builder: grammarTranslateBuilder(
    L(
      '걷던 중 이동 방법을 바꾸어 버스를 탔다고 말하기',
      'Piyoda ketayotib, keyin avtobusga chiqqaningizni ayting.',
      'Say that you stopped walking and took a bus instead.',
      'Скажите, что вы перестали идти пешком и сели на автобус.',
    ),
    [
      '버스를 탔어요',
      '걸어가다가',
      '계속 걸었어요',
      '과속했어요',
      '신호를 무시했어요',
      '안전벨트를 풀었어요',
    ],
    '걸어가다가 버스를 탔어요',
    L(
      '진행하던 행동을 다른 행동으로 바꾸는 `-다가`예요.',
      'Bu davom etayotgan harakatni boshqasiga almashtiradigan `-다가`.',
      'Here -다가 marks a switch from one ongoing action to another.',
      'Здесь -다가 показывает смену одного продолжающегося действия другим.',
    ),
    ['v-daga', 'action-change'],
  ),

  s5u8_144_fill_in_blank: grammarFillBlank(
    '집에 걸어가___ 버스를 탔어요.',
    ['다가'],
    ['다가', '면서', '려고', '니까', '지만'],
    L(
      '걸어서 가는 것을 중간에 그만두고 버스를 탔어요.',
      'Piyoda yurish to‘xtatilib, avtobusga chiqildi.',
      'The walking was stopped midway and replaced by taking a bus.',
      'Ходьба была прекращена, и вместо неё человек сел на автобус.',
    ),
    ['v-daga', 'form'],
  ),

  s5u8_145_word_arrange: grammarWordArrange(
    [
      '잠시 쉬었어요',
      '운전하다가',
      '안전벨트를 풀고',
      '과속했어요',
      '피곤해서',
      '신호를 무시했어요',
    ],
    '운전하다가 피곤해서 잠시 쉬었어요',
    L(
      '운전 중 피곤함을 느껴 운전을 멈추고 쉰 상황이에요.',
      'Haydash paytida charchab, to‘xtab dam olindi.',
      'The driver became tired and stopped driving to rest.',
      'Водитель устал и остановился отдохнуть.',
    ),
    ['v-daga', 'action-change', 'safety'],
  ),

  s5u8_146_type_answer: grammarTypeAnswer(
    '운전하다가 피곤해서 잠시 쉬었어요',
    L(
      '운전하던 중 피곤해져서 운전을 멈추고 잠깐 쉬었다고 `-다가`로 쓰세요.',
      'Haydab ketayotib charchab, to‘xtab dam olganingizni `-다가` bilan yozing.',
      'Using -다가, write that you became tired while driving and stopped to rest.',
      'Используя -다가, напишите, что вы устали за рулём и остановились отдохнуть.',
    ),
    'The speaker became tired while driving and stopped to rest.',
    ['운전하다가'],
    ['v-daga', 'safety', 'type-answer'],
  ),

  s5u8_147_error_hunt: grammarErrorHunt(
    '집에 걸어가아다가 버스를 탔어요.',
    '걸어가아다가',
    ['걸어가다가', '걸어가면서', '걸어가려고', '걸어가니까'],
    '걸어가다가',
    L(
      '`가다`에 `-다가`를 붙이면 `가다가`예요. `아`를 추가하지 않아요.',
      '`가다`ga `-다가` qo‘shilsa `가다가`; qo‘shimcha `아` kerak emas.',
      '가다 + -다가 becomes 가다가; do not add 아.',
      '가다 + -다가 даёт 가다가; дополнительное 아 не добавляется.',
    ),
    ['v-daga', 'conjugation'],
  ),

  s5u8_148_translate_builder: grammarTranslateBuilder(
    L(
      '운전 중 피곤해서 차를 세우고 쉬었다고 표현하기',
      'Haydash paytida charchab, mashinani to‘xtatib dam olganingizni ayting.',
      'Say that you got tired while driving and stopped to rest.',
      'Скажите, что вы устали во время вождения и остановились отдохнуть.',
    ),
    [
      '잠시 쉬었어요',
      '운전하다가',
      '피곤해서',
      '계속 과속했어요',
      '신호를 무시했어요',
      '주변을 안 봤어요',
    ],
    '운전하다가 피곤해서 잠시 쉬었어요',
    L(
      '위험을 느끼고 안전한 행동으로 바꾼 좋은 예예요.',
      'Xavfni sezib xavfsiz harakatga o‘tishning yaxshi misoli.',
      'This is a good example of changing to a safer action after noticing risk.',
      'Это хороший пример перехода к более безопасному действию после появления риска.',
    ),
    ['v-daga', 'safety'],
  ),

  s5u8_149_reading_quiz: grammarReadingQuiz(
    '민수 씨는 자동차로 목적지까지 가고 있었습니다. 중간에 길이 너무 막혀서 차를 세우고 지하철로 이동했습니다. 가장 자연스러운 문장을 고르세요.',
    [
      '차로 가다가 지하철을 탔어요.',
      '차로 가면서 계속 차로 갔어요.',
      '차로 가려고 지하철을 탔어요.',
      '차로 갔는데도 지하철이 차예요.',
    ],
    '차로 가다가 지하철을 탔어요.',
    L(
      '한 이동 방법을 중단하고 다른 이동 방법으로 바꿨어요.',
      'Bir transport usuli to‘xtatilib, boshqasiga o‘tildi.',
      'One mode of transport was stopped and replaced by another.',
      'Один способ передвижения был заменён другим.',
    ),
    ['v-daga', 'action-change'],
  ),

  s5u8_150_fill_in_blank: grammarFillBlank(
    '차로 가___ 지하철을 탔어요.',
    ['다가'],
    ['다가', '면서', '려고', '니까', '지만'],
    L(
      '차로 이동하던 중 다른 교통수단으로 바꿨어요.',
      'Mashina bilan ketayotib boshqa transportga o‘tildi.',
      'The speaker changed transportation midway.',
      'По пути способ передвижения был изменён.',
    ),
    ['v-daga', 'action-change'],
  ),

  s5u8_151_type_answer: grammarTypeAnswer(
    '차로 가다가 지하철을 탔어요',
    L(
      '자동차로 이동하던 중 지하철로 바꾸었다고 `-다가`를 사용해 쓰세요.',
      'Mashina bilan ketayotib metroga o‘tganingizni `-다가` bilan yozing.',
      'Using -다가, write that you switched from travelling by car to taking the subway.',
      'Используя -다가, напишите, что по пути вы пересели с машины на метро.',
    ),
    'The speaker was travelling by car but switched to the subway.',
    ['가다가'],
    ['v-daga', 'action-change', 'type-answer'],
  ),

  s5u8_152_translate_builder: grammarTranslateBuilder(
    L(
      '자동차로 이동하던 중 지하철로 바꾸었다고 표현하기',
      'Mashina bilan ketayotib metroga o‘tganingizni ayting.',
      'Say that you switched from travelling by car to the subway.',
      'Скажите, что по дороге вы пересели с автомобиля на метро.',
    ),
    [
      '지하철을 탔어요',
      '차로 가다가',
      '계속 운전했어요',
      '과속했어요',
      '신호를 무시했어요',
      '안전벨트를 풀었어요',
    ],
    '차로 가다가 지하철을 탔어요',
    L(
      '진행 중인 이동 방법의 변화를 표현해요.',
      'Davom etayotgan transport usuli o‘zgarishi ifodalanadi.',
      'It describes a change in transportation during the journey.',
      'Описывается смена транспорта во время поездки.',
    ),
    ['v-daga', 'action-change'],
  ),

  s5u8_153_cloze_passage: grammarClozePassage(
    '집에 걸어가___ 버스를 탔고, 자동차로 가___ 길이 막혀서 지하철을 탔어요.',
    ['다가', '다가'],
    ['다가', '다가', '면서', '려고', '니까'],
    L(
      '두 경우 모두 이동 방법이 중간에 바뀌었어요.',
      'Ikkala vaziyatda ham transport usuli yo‘lda o‘zgardi.',
      'In both cases, the mode of travel changed midway.',
      'В обоих случаях способ передвижения изменился по пути.',
    ),
    ['v-daga', 'action-change'],
  ),

  s5u8_154_word_arrange: grammarWordArrange(
    [
      '잠깐 쉬었어요',
      '계속 과속했어요',
      '운전하다가',
      '피곤해서',
      '음주 운전을 했어요',
      '신호를 무시했어요',
    ],
    '운전하다가 피곤해서 잠깐 쉬었어요',
    L(
      '위험한 상태가 생겼을 때 행동을 바꾸는 것이 안전해요.',
      'Xavfli holat paydo bo‘lsa, harakatni o‘zgartirish xavfsiz.',
      'Changing your action when a dangerous condition appears is safer.',
      'При появлении опасного состояния безопаснее изменить действие.',
    ),
    ['v-daga', 'safety'],
  ),

  s5u8_155_type_answer: grammarTypeAnswer(
    '버스를 기다리다가 걸어가기로 했어요',
    L(
      '버스를 기다리던 중 기다리는 것을 그만두고 걸어가기로 했다고 `-다가`로 쓰세요.',
      'Avtobus kutishni to‘xtatib piyoda ketishga qaror qilganingizni `-다가` bilan yozing.',
      'Using -다가, write that you stopped waiting for the bus and decided to walk.',
      'Используя -다가, напишите, что вы перестали ждать автобус и решили пойти пешком.',
    ),
    'The speaker stopped waiting for the bus and decided to walk.',
    ['기다리다가'],
    ['v-daga', 'action-change', 'type-answer'],
  ),

  s5u8_156_reading_quiz: grammarReadingQuiz(
    '버스가 오랫동안 오지 않았습니다. 지수 씨는 처음에는 계속 버스를 기다렸지만 결국 기다리는 것을 그만두고 걸어서 갔습니다. 가장 자연스러운 문장을 고르세요.',
    [
      '버스를 기다리다가 걸어갔어요.',
      '버스를 기다리면서 계속 기다렸어요.',
      '버스를 기다리려고 걸었어요.',
      '버스를 기다렸는데도 버스가 걸었어요.',
    ],
    '버스를 기다리다가 걸어갔어요.',
    L(
      '기다리던 행동을 중단하고 걷는 행동으로 바꿨어요.',
      'Kutish to‘xtatilib, piyoda yurishga o‘tildi.',
      'The waiting action was stopped and changed to walking.',
      'Ожидание было прекращено и сменилось ходьбой.',
    ),
    ['v-daga', 'action-change'],
  ),

  s5u8_157_translate_builder: grammarTranslateBuilder(
    L(
      '버스를 기다리다가 결국 걸어서 갔다고 말하기',
      'Avtobus kutib, oxiri piyoda ketganingizni ayting.',
      'Say that you stopped waiting for the bus and eventually walked.',
      'Скажите, что вы перестали ждать автобус и в итоге пошли пешком.',
    ),
    [
      '걸어갔어요',
      '버스를 기다리다가',
      '계속 기다렸어요',
      '과속했어요',
      '음주 운전을 했어요',
      '신호를 무시했어요',
    ],
    '버스를 기다리다가 걸어갔어요',
    L(
      '`-다가`가 행동 전환을 나타내는 전형적인 예예요.',
      'Bu `-다가` bilan harakat almashishning odatiy misoli.',
      'This is a typical example of -다가 marking a change of action.',
      'Это типичный пример смены действия с помощью -다가.',
    ),
    ['v-daga', 'action-change'],
  ),

  s5u8_158_fill_in_blank: grammarFillBlank(
    '버스를 기다리___ 결국 걸어갔어요.',
    ['다가'],
    ['다가', '면서', '려고', '니까', '지만'],
    L(
      '기다리던 행동에서 걷는 행동으로 바뀌었어요.',
      'Kutishdan piyoda yurishga o‘tildi.',
      'The action changed from waiting to walking.',
      'Действие сменилось с ожидания на ходьбу.',
    ),
    ['v-daga', 'form'],
  ),

  s5u8_159_error_hunt: grammarErrorHunt(
    '운전하면서 피곤해서 차를 세우고 쉬었어요.',
    '운전하면서',
    ['운전하다가', '운전하려고', '운전하니까', '운전하지만'],
    '운전하다가',
    L(
      '운전을 계속하면서 쉬는 것이 아니라 운전을 중단한 뒤 쉬었으므로 `운전하다가`가 알맞아요.',
      'Haydash va dam olish bir vaqtda emas; haydash to‘xtagach dam olindi, shuning uchun `운전하다가`.',
      'The driving stops before resting, so 운전하다가 is appropriate rather than 운전하면서.',
      'Вождение прекращается перед отдыхом, поэтому подходит 운전하다가, а не 운전하면서.',
    ),
    ['v-daga', 'grammar-contrast'],
  ),

  s5u8_160_word_arrange: grammarWordArrange(
    [
      '첫 행동이 끝나기 전에',
      '다른 행동으로',
      '`V-다가`는',
      '바뀌는 상황도 표현할 수 있어요',
      '항상 두 행동을 동시에 하고',
      '명사만 연결해요',
    ],
    '`V-다가`는 첫 행동이 끝나기 전에 다른 행동으로 바뀌는 상황도 표현할 수 있어요',
    L(
      '사건 발생뿐 아니라 행동 전환도 `-다가`의 중요한 기능이에요.',
      'Faqat hodisa emas, harakat almashishi ham `-다가`ning muhim vazifasi.',
      '-다가 can mark a change of action as well as an unexpected event.',
      '-다가 может обозначать не только событие, но и смену действия.',
    ),
    ['v-daga', 'grammar-summary'],
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 4 · -다가, -면서, -았다가를 구별해요
  // 문법 기능 비교
  // ──────────────────────────────────────────────────────────

  s5u8_161_reading_quiz: grammarReadingQuiz(
    '민수 씨는 자동차를 운전하고 있었습니다. 운전하던 중 사고가 나서 더 이상 운전할 수 없었습니다. 두 행동은 동시에 계속된 것이 아닙니다. 가장 알맞은 문장을 고르세요.',
    [
      '운전하다가 사고가 났어요.',
      '운전하면서 사고를 계속했어요.',
      '운전했다가 사고를 켰어요.',
      '운전하려고 사고가 났어요.',
    ],
    '운전하다가 사고가 났어요.',
    L(
      '첫 행동이 진행 중일 때 다른 사건이 생겨 첫 행동이 끊겼어요.',
      'Birinchi harakat davomida boshqa hodisa bo‘lib, harakat uzildi.',
      'Another event interrupted the first action while it was in progress.',
      'Другое событие прервало первое действие в процессе.',
    ),
    ['v-daga', 'grammar-contrast'],
  ),

  s5u8_162_type_answer: grammarTypeAnswer(
    '운전하다가 사고가 났어요',
    L(
      '운전 중 사고가 생겨 운전이 중단된 상황을 `-다가`로 쓰세요.',
      'Haydash paytida avariya bo‘lib harakat to‘xtaganini `-다가` bilan yozing.',
      'Using -다가, write that driving was interrupted by an accident.',
      'Используя -다가, напишите, что вождение было прервано аварией.',
    ),
    'Driving was in progress when an accident occurred and interrupted it.',
    ['운전하다가'],
    ['v-daga', 'grammar-contrast', 'type-answer'],
  ),

  s5u8_163_translate_builder: grammarTranslateBuilder(
    L(
      '운전 중 사고가 발생해 운전이 중단됐다고 표현하기',
      'Haydash vaqtida avariya bo‘lib, harakat to‘xtaganini ayting.',
      'Say that an accident happened while driving and interrupted the driving.',
      'Скажите, что во время движения произошла авария и вождение прекратилось.',
    ),
    [
      '사고가 났어요',
      '운전하다가',
      '운전하면서',
      '전원을 껐다가',
      '계속 운전했어요',
      '안전벨트를 맸어요',
    ],
    '운전하다가 사고가 났어요',
    L(
      '진행 중이던 행동의 중단이 핵심이면 `-다가`를 사용해요.',
      'Agar asosiy ma’no davom etayotgan harakatning uzilishi bo‘lsa, `-다가` ishlatiladi.',
      'Use -다가 when interruption of an ongoing action is central.',
      'Используйте -다가, когда важно прерывание продолжающегося действия.',
    ),
    ['v-daga', 'grammar-contrast'],
  ),

  s5u8_164_fill_in_blank: grammarFillBlank(
    '운전___ 사고가 나서 차를 세웠어요.',
    ['하다가'],
    ['하다가', '하면서', '했다가', '하려고', '하지만'],
    L(
      '사고가 운전 중에 발생해 운전을 중단했어요.',
      'Avariya haydash paytida bo‘lib, harakat to‘xtadi.',
      'The accident happened during driving and stopped the action.',
      'Авария произошла во время движения и прервала его.',
    ),
    ['v-daga', 'grammar-contrast'],
  ),

  s5u8_165_word_arrange: grammarWordArrange(
    [
      '음악을 들었어요',
      '운전하면서',
      '사고가 나서 중단했어요',
      '운전하다가',
      '전원을 껐다가',
      '다시 켰어요',
    ],
    '운전하면서 음악을 들었어요',
    L(
      '`-면서`는 두 행동이 동시에 진행되는 상황에 사용할 수 있어요.',
      '`-면서` ikki harakat bir vaqtda davom etganda ishlatiladi.',
      '-면서 can describe two actions occurring simultaneously.',
      '-면서 используется для двух одновременных действий.',
    ),
    ['v-daga', 'myeonseo', 'grammar-contrast'],
  ),

  s5u8_166_type_answer: grammarTypeAnswer(
    '운전하다가 차를 세웠어요',
    L(
      '운전을 계속하는 중에 그 행동을 중단하고 차를 세웠다고 `-다가`로 쓰세요.',
      'Haydashni davom ettirib, keyin to‘xtab mashinani qo‘yganingizni `-다가` bilan yozing.',
      'Using -다가, write that you stopped driving and pulled the car over.',
      'Используя -다가, напишите, что вы прекратили движение и остановили машину.',
    ),
    'The speaker was driving and then interrupted that action by stopping the car.',
    ['운전하다가'],
    ['v-daga', 'grammar-contrast', 'type-answer'],
  ),

  s5u8_167_error_hunt: grammarErrorHunt(
    '운전하면서 사고가 나서 운전을 멈췄어요.',
    '운전하면서',
    ['운전하다가', '운전하려고', '운전하니까', '운전하지만'],
    '운전하다가',
    L(
      '사고 때문에 운전이 중단됐으므로 동시 진행을 나타내는 `-면서`보다 `-다가`가 알맞아요.',
      'Avariya sabab haydash uzildi, shuning uchun `-면서` emas `-다가` mos.',
      'Because the accident interrupted the driving, -다가 is more appropriate than -면서.',
      'Поскольку авария прервала движение, -다가 подходит лучше, чем -면서.',
    ),
    ['v-daga', 'myeonseo', 'grammar-contrast'],
  ),

  s5u8_168_translate_builder: grammarTranslateBuilder(
    L(
      '두 행동을 동시에 했다는 의미로 운전하며 음악을 들었다고 표현하기',
      'Ikki harakat bir vaqtda bo‘lganini bildirib, haydab musiqa tinglaganingizni ayting.',
      'Express that you listened to music while driving, with both actions continuing simultaneously.',
      'Выразите, что вы слушали музыку во время вождения, и оба действия происходили одновременно.',
    ),
    [
      '음악을 들었어요',
      '운전하면서',
      '운전하다가',
      '사고가 났어요',
      '전원을 껐다가',
      '차를 세웠어요',
    ],
    '운전하면서 음악을 들었어요',
    L(
      '두 행동이 동시에 계속되면 `-면서`가 자연스러워요.',
      'Ikki harakat bir vaqtda davom etsa `-면서` tabiiy.',
      'Use -면서 when two actions continue at the same time.',
      'Используйте -면서, когда два действия продолжаются одновременно.',
    ),
    ['myeonseo', 'grammar-contrast'],
  ),

  s5u8_169_reading_quiz: grammarReadingQuiz(
    '휴대폰 전원을 완전히 끈 뒤 다시 켰습니다. 첫 번째 행동이 끝난 후 반대 행동을 했습니다. 어떤 표현이 가장 알맞아요?',
    [
      '전원을 껐다가 다시 켰어요.',
      '전원을 끄다가 계속 껐어요.',
      '전원을 끄면서 다시 껐어요.',
      '전원을 끄려고 껐어요.',
    ],
    '전원을 껐다가 다시 켰어요.',
    L(
      '첫 행동을 완료한 뒤 반대되는 행동을 했으므로 Unit 7의 `-았다가/었다가`가 알맞아요.',
      'Birinchi harakat tugab, keyin qarama-qarshi harakat bo‘lgani uchun `-았다가/었다가` mos.',
      'Because the first action was completed before the opposite action, -았다가/었다가 is appropriate.',
      'Поскольку первое действие завершено до обратного, подходит -았다가/었다가.',
    ),
    ['v-daga', 'v-assdaga', 'grammar-contrast'],
  ),

  s5u8_170_fill_in_blank: grammarFillBlank(
    '전원을 완전히 ___ 다시 켰어요.',
    ['껐다가'],
    ['껐다가', '끄다가', '끄면서', '끄려고', '끄니까'],
    L(
      '끄는 행동을 끝낸 뒤 다시 켜는 반대 행동을 했어요.',
      'O‘chirish tugagach, keyin yana yoqildi.',
      'Turning off was completed before the opposite action of turning it back on.',
      'Выключение завершилось до обратного действия — повторного включения.',
    ),
    ['v-assdaga', 'grammar-contrast'],
  ),

  s5u8_171_type_answer: grammarTypeAnswer(
    '길을 가다가 사고 현장을 봤어요',
    L(
      '길을 가는 행동이 진행되는 중에 사고 현장을 보았다고 `-다가`로 쓰세요.',
      'Yo‘lda ketayotib avariya joyini ko‘rganingizni `-다가` bilan yozing.',
      'Using -다가, write that you saw an accident scene while travelling.',
      'Используя -다가, напишите, что по дороге вы увидели место аварии.',
    ),
    'The speaker saw an accident scene while travelling.',
    ['가다가'],
    ['v-daga', 'grammar-contrast', 'type-answer'],
  ),

  s5u8_172_translate_builder: grammarTranslateBuilder(
    L(
      '길을 가는 중에 사고 현장을 보았다고 표현하기',
      'Yo‘lda ketayotib avariya joyini ko‘rganingizni ayting.',
      'Say that you saw an accident scene while travelling.',
      'Скажите, что по дороге вы увидели место аварии.',
    ),
    [
      '사고 현장을 봤어요',
      '길을 가다가',
      '길을 가면서 계속 걸었어요',
      '전원을 껐다가',
      '안전벨트를 매고',
      '제한 속도를 지켰어요',
    ],
    '길을 가다가 사고 현장을 봤어요',
    L(
      '진행 중인 행동에서 새로운 사건을 만났으므로 `-다가`를 써요.',
      'Davom etayotgan harakatda yangi hodisa uchragani uchun `-다가` ishlatiladi.',
      'Use -다가 because another event was encountered during an ongoing action.',
      'Используется -다가, потому что во время продолжающегося действия встретилось новое событие.',
    ),
    ['v-daga', 'grammar-contrast'],
  ),

  s5u8_173_cloze_passage: grammarClozePassage(
    '운전___ 사고가 났어요. 운전___ 음악을 들었어요. 전원을 ___ 다시 켰어요.',
    ['하다가', '하면서', '껐다가'],
    ['껐다가', '하면서', '하다가', '하려고', '했는데도', '하니까'],
    L(
      '`-다가`, `-면서`, `-았다가/었다가`의 기능 차이를 한 번에 구별해요.',
      '`-다가`, `-면서`, `-았다가/었다가` vazifalari farqlanadi.',
      'Distinguish the functions of -다가, -면서, and -았다가/었다가.',
      'Различаем функции -다가, -면서 и -았다가/었다가.',
    ),
    ['v-daga', 'grammar-contrast'],
  ),

  s5u8_174_word_arrange: grammarWordArrange(
    [
      '사고가 났어요',
      '운전하다가',
      '운전하면서',
      '음악을 들었어요',
      '전원을 껐다가',
      '다시 켰어요',
    ],
    '운전하다가 사고가 났어요',
    L(
      '운전 중 사고 때문에 첫 행동이 중단된 문장을 선택해서 만들어요.',
      'Avariya sabab haydash uzilgan gap tuziladi.',
      'Build the sentence where the driving action is interrupted by an accident.',
      'Составляется предложение, где вождение прерывается аварией.',
    ),
    ['v-daga', 'grammar-contrast'],
  ),

  s5u8_175_type_answer: grammarTypeAnswer(
    '운전하면서 주변을 살폈어요',
    L(
      '운전과 주변 확인을 동시에 계속했다고 `-면서`를 사용해 쓰세요.',
      'Haydash va atrofni tekshirish bir vaqtda bo‘lganini `-면서` bilan yozing.',
      'Using -면서, write that you checked your surroundings while driving.',
      'Используя -면서, напишите, что вы следили за обстановкой во время вождения.',
    ),
    'The speaker checked the surroundings while continuing to drive.',
    ['운전하면서'],
    ['myeonseo', 'grammar-contrast', 'type-answer'],
  ),

  s5u8_176_reading_quiz: grammarReadingQuiz(
    'A는 운전 중 사고가 나서 운전을 멈췄습니다. B는 계속 운전하면서 주변을 확인했습니다. C는 전원을 완전히 끈 뒤 다시 켰습니다. A의 문장에 필요한 문법은 무엇인가요?',
    ['V-다가', 'V-면서', 'V-았다가/었다가', 'N인데도'],
    'V-다가',
    L(
      'A는 운전이 진행되는 중 사고로 인해 행동이 중단됐어요.',
      'A holatida haydash davomida avariya sabab harakat uzildi.',
      'A describes an ongoing action interrupted by an accident.',
      'В случае A продолжающееся действие было прервано аварией.',
    ),
    ['v-daga', 'grammar-contrast'],
  ),

  s5u8_177_translate_builder: grammarTranslateBuilder(
    L(
      '운전 중 사고 때문에 운전이 멈춘 상황을 표현하기',
      'Haydash paytida avariya sabab harakat to‘xtaganini ayting.',
      'Express that driving was interrupted because an accident occurred.',
      'Выразите, что вождение было прервано из-за аварии.',
    ),
    [
      '사고가 났어요',
      '운전하다가',
      '운전하면서',
      '음악을 들었어요',
      '전원을 껐다가',
      '다시 켰어요',
    ],
    '운전하다가 사고가 났어요',
    L(
      '행동 중단이 핵심이므로 `-다가`를 사용해요.',
      'Harakatning uzilishi asosiy bo‘lgani uchun `-다가` ishlatiladi.',
      'Use -다가 because the key meaning is interruption.',
      'Используется -다가, потому что главное значение — прерывание.',
    ),
    ['v-daga', 'grammar-contrast'],
  ),

  s5u8_178_fill_in_blank: grammarFillBlank(
    '운전___ 음악을 들었어요.',
    ['하면서'],
    ['하면서', '하다가', '했다가', '하려고', '하지만'],
    L(
      '운전과 음악 듣기가 동시에 계속됐으므로 `-면서`가 알맞아요.',
      'Haydash va musiqa tinglash bir vaqtda davom etgani uchun `-면서` mos.',
      'Because driving and listening continued simultaneously, -면서 is appropriate.',
      'Поскольку вождение и прослушивание музыки продолжались одновременно, подходит -면서.',
    ),
    ['myeonseo', 'grammar-contrast'],
  ),

  s5u8_179_error_hunt: grammarErrorHunt(
    '운전하다가 음악을 계속 들으면서 운전했어요.',
    '운전하다가',
    ['운전하면서', '운전하려고', '운전하니까', '운전하지만'],
    '운전하면서',
    L(
      '두 행동이 동시에 계속되는 뜻이라면 `운전하면서`가 더 정확해요.',
      'Ikki harakat bir vaqtda davom etsa `운전하면서` aniqroq.',
      'If both actions continue simultaneously, 운전하면서 is more accurate.',
      'Если оба действия продолжаются одновременно, точнее 운전하면서.',
    ),
    ['v-daga', 'myeonseo', 'grammar-contrast'],
  ),

  s5u8_180_word_arrange: grammarWordArrange(
    [
      '상황을 먼저 봐야 해요',
      '첫 행동이 중단되는지',
      '두 행동이 동시에 계속되는지',
      '문법 형태를 고를 때는',
      '무조건 `-다가`만 쓰고',
      '뜻은 보지 않아도 돼요',
    ],
    '문법 형태를 고를 때는 첫 행동이 중단되는지 두 행동이 동시에 계속되는지 상황을 먼저 봐야 해요',
    L(
      '형태 암기보다 실제 행동 관계를 이해하는 것이 중요해요.',
      'Shaklni yodlashdan ko‘ra harakatlar munosabatini tushunish muhim.',
      'Understanding the relationship between actions matters more than memorizing forms.',
      'Важнее понимать связь между действиями, чем просто запоминать формы.',
    ),
    ['v-daga', 'grammar-summary'],
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 5 · 사고가 어떻게 났는지 설명해요
  // V-다가 종합 생산
  // ──────────────────────────────────────────────────────────

  s5u8_181_reading_quiz: grammarReadingQuiz(
    '운전자는 제한 속도보다 빠르게 달리고 있었습니다. 교차로에 가까워졌을 때 신호를 늦게 확인했고 결국 사고가 났습니다. 사고가 발생하기 직전 진행 중이던 위험 행동을 가장 잘 나타낸 문장을 고르세요.',
    [
      '과속하다가 교통사고가 났어요.',
      '제한 속도를 지키면서 사고를 예방했어요.',
      '안전벨트를 매려고 사고가 났어요.',
      '주변을 살폈는데도 과속을 매었어요.',
    ],
    '과속하다가 교통사고가 났어요.',
    L(
      '사고 직전 진행되고 있던 위험 행동이 과속이었어요.',
      'Avariyadan oldingi davom etayotgan xavfli harakat tezlik oshirish edi.',
      'The dangerous action in progress immediately before the accident was speeding.',
      'Опасным действием непосредственно перед аварией было превышение скорости.',
    ),
    ['v-daga', 'speeding', 'integration'],
  ),

  s5u8_182_type_answer: grammarTypeAnswer(
    '과속하다가 교통사고가 났어요',
    L(
      '과속하던 중 교통사고가 발생했다고 `-다가`를 사용해 쓰세요.',
      'Tezlikni oshirib ketayotganda avariya bo‘lganini `-다가` bilan yozing.',
      'Using -다가, write that a traffic accident occurred while speeding.',
      'Используя -다가, напишите, что авария произошла во время превышения скорости.',
    ),
    'A traffic accident occurred while the driver was speeding.',
    ['과속하다가'],
    ['v-daga', 'speeding', 'type-answer'],
  ),

  s5u8_183_translate_builder: grammarTranslateBuilder(
    L(
      '과속하던 중 교통사고가 발생했다고 설명하기',
      'Tezlikni oshirib ketayotganda avariya bo‘lganini tushuntiring.',
      'Explain that a traffic accident happened while speeding.',
      'Объясните, что авария произошла во время превышения скорости.',
    ),
    [
      '교통사고가 났어요',
      '과속하다가',
      '제한 속도를 지키면서',
      '신호를 잘 보고',
      '주변을 살피고',
      '안전벨트를 맸어요',
    ],
    '과속하다가 교통사고가 났어요',
    L(
      '사고 원인을 설명할 때 사고 전 행동을 구체적으로 말할 수 있어요.',
      'Avariya sababini tushuntirishda oldingi harakatni aniq aytish mumkin.',
      'The action before the accident can be described clearly when explaining what happened.',
      'При объяснении аварии можно точно описать действие, предшествовавшее ей.',
    ),
    ['v-daga', 'speeding', 'integration'],
  ),

  s5u8_184_fill_in_blank: grammarFillBlank(
    '제한 속도를 넘겨 달리___ 교통사고가 났어요.',
    ['다가'],
    ['다가', '면서', '려고', '니까', '지만'],
    L(
      '빠르게 달리던 중 사고가 발생했어요.',
      'Tez ketayotgan paytda avariya yuz berdi.',
      'The accident occurred while the driver was travelling too fast.',
      'Авария произошла во время слишком быстрой езды.',
    ),
    ['v-daga', 'speeding'],
  ),

  s5u8_185_word_arrange: grammarWordArrange(
    [
      '사고가 났어요',
      '신호를 무시하고',
      '가다가',
      '신호를 지켜서',
      '주변을 살펴서',
      '제한 속도를 지켜서',
    ],
    '신호를 무시하고 가다가 사고가 났어요',
    L(
      '사고 전 위험 행동과 사고 발생을 한 문장으로 설명해요.',
      'Avariya oldidagi xavfli harakat va avariya bir gapda tushuntiriladi.',
      'The unsafe action before the accident and the accident itself are described together.',
      'Опасное действие перед аварией и сама авария описываются вместе.',
    ),
    ['v-daga', 'traffic-signal', 'integration'],
  ),

  s5u8_186_type_answer: grammarTypeAnswer(
    '신호를 무시하고 가다가 사고가 났어요',
    L(
      '신호를 무시한 채 계속 가던 중 사고가 났다고 `-다가`로 쓰세요.',
      'Signalga rioya qilmay ketayotib avariya bo‘lganini `-다가` bilan yozing.',
      'Using -다가, write that an accident happened while continuing after ignoring the signal.',
      'Используя -다가, напишите, что авария произошла во время движения после игнорирования сигнала.',
    ),
    'An accident occurred while the driver continued after ignoring a traffic signal.',
    ['가다가'],
    ['v-daga', 'traffic-signal', 'type-answer'],
  ),

  s5u8_187_error_hunt: grammarErrorHunt(
    '신호를 무시하고 가면서 사고가 나서 운전을 멈췄어요.',
    '가면서',
    ['가다가', '가려고', '가니까', '가지만'],
    '가다가',
    L(
      '사고가 생겨 이동이 중단됐기 때문에 `가다가`가 더 정확해요.',
      'Avariya sabab harakat to‘xtagani uchun `가다가` aniqroq.',
      'Because the movement was interrupted by the accident, 가다가 is more accurate.',
      'Поскольку движение было прервано аварией, точнее использовать 가다가.',
    ),
    ['v-daga', 'grammar-contrast'],
  ),

  s5u8_188_translate_builder: grammarTranslateBuilder(
    L(
      '신호를 무시하고 계속 가던 중 사고가 발생했다고 설명하기',
      'Signalga rioya qilmay ketayotganda avariya bo‘lganini tushuntiring.',
      'Explain that an accident occurred while continuing after ignoring the signal.',
      'Объясните, что авария произошла во время движения после игнорирования сигнала.',
    ),
    [
      '사고가 났어요',
      '신호를 무시하고',
      '가다가',
      '신호를 지키면서',
      '안전벨트를 매고',
      '주변을 살폈어요',
    ],
    '신호를 무시하고 가다가 사고가 났어요',
    L(
      '교통사고가 난 과정을 시간 순서대로 설명할 수 있어요.',
      'Avariya jarayonini vaqt tartibida tushuntirish mumkin.',
      'The sequence leading to a traffic accident can be explained clearly.',
      'Можно чётко объяснить последовательность событий, приведших к аварии.',
    ),
    ['v-daga', 'traffic-signal', 'integration'],
  ),

  s5u8_189_reading_quiz: grammarReadingQuiz(
    '운전자는 출발하기 전에 주변을 충분히 확인하지 않았습니다. 차를 움직이기 시작한 뒤 가까이에 사람이 있는 것을 보고 급히 멈췄습니다. 가장 자연스러운 설명을 고르세요.',
    [
      '출발하다가 사람을 보고 급히 멈췄어요.',
      '출발하면서 계속 안전했어요.',
      '출발하려고 사람을 멈췄어요.',
      '출발했는데도 주변을 매었어요.',
    ],
    '출발하다가 사람을 보고 급히 멈췄어요.',
    L(
      '출발하던 행동이 사람을 발견하면서 중단됐어요.',
      'Harakatni boshlash odamni ko‘rgach to‘xtatildi.',
      'The action of starting to move was interrupted after seeing a person nearby.',
      'Начало движения было прервано после того, как водитель увидел человека.',
    ),
    ['v-daga', 'check-surroundings', 'integration'],
  ),

  s5u8_190_fill_in_blank: grammarFillBlank(
    '차를 출발하___ 사람을 보고 급히 멈췄어요.',
    ['다가'],
    ['다가', '면서', '려고', '니까', '지만'],
    L(
      '출발을 진행하던 중 사람을 발견해 행동을 멈췄어요.',
      'Harakatni boshlash paytida odam ko‘rilib, harakat to‘xtatildi.',
      'The movement was interrupted when a person was noticed.',
      'Движение было прервано, когда водитель заметил человека.',
    ),
    ['v-daga', 'check-surroundings'],
  ),

  s5u8_191_type_answer: grammarTypeAnswer(
    '출발하다가 사람을 보고 급히 멈췄어요',
    L(
      '차를 출발시키던 중 사람을 발견해 급하게 멈췄다고 `-다가`로 쓰세요.',
      'Mashinani yurgiza boshlaganda odamni ko‘rib tez to‘xtaganingizni `-다가` bilan yozing.',
      'Using -다가, write that you saw a person while starting the car and stopped quickly.',
      'Используя -다가, напишите, что при начале движения вы увидели человека и резко остановились.',
    ),
    'The driver noticed a person while starting to move and stopped quickly.',
    ['출발하다가'],
    ['v-daga', 'check-surroundings', 'type-answer'],
  ),

  s5u8_192_translate_builder: grammarTranslateBuilder(
    L(
      '차를 출발시키던 중 사람을 발견해 급히 멈췄다고 표현하기',
      'Mashinani yurgiza boshlaganda odamni ko‘rib tez to‘xtaganingizni ayting.',
      'Say that you saw a person while starting the car and stopped quickly.',
      'Скажите, что при начале движения вы увидели человека и резко остановились.',
    ),
    [
      '급히 멈췄어요',
      '사람을 보고',
      '출발하다가',
      '계속 과속했어요',
      '신호를 무시했어요',
      '주변을 보지 않았어요',
    ],
    '출발하다가 사람을 보고 급히 멈췄어요',
    L(
      '주변 확인이 왜 중요한지 실제 위험 상황과 연결해요.',
      'Atrofni tekshirish nega muhimligi haqiqiy xavf bilan bog‘lanadi.',
      'The importance of checking surroundings is connected to a realistic danger.',
      'Важность проверки обстановки связывается с реальной опасной ситуацией.',
    ),
    ['v-daga', 'check-surroundings', 'integration'],
  ),

  s5u8_193_cloze_passage: grammarClozePassage(
    '과속___ 사고가 났고, 신호를 무시하고 가___ 또 다른 위험한 상황이 생겼어요.',
    ['하다가', '다가'],
    ['다가', '하다가', '하면서', '하려고', '니까'],
    L(
      '교통사고 원인을 설명하는 두 가지 `-다가` 패턴을 함께 연습해요.',
      'Avariya sababini tushuntiruvchi ikki `-다가` shakli mashq qilinadi.',
      'Practise two -다가 patterns used to explain unsafe events leading to accidents.',
      'Тренируются два шаблона -다가 для объяснения опасных событий перед аварией.',
    ),
    ['v-daga', 'integration'],
  ),

  s5u8_194_word_arrange: grammarWordArrange(
    [
      '급히 멈췄어요',
      '출발하다가',
      '주변에 사람이 있는 것을 보고',
      '계속 과속했어요',
      '신호를 무시했어요',
      '안전벨트를 풀었어요',
    ],
    '출발하다가 주변에 사람이 있는 것을 보고 급히 멈췄어요',
    L(
      '행동 진행, 위험 발견, 행동 중단의 순서를 표현해요.',
      'Harakat, xavfni ko‘rish va harakatni to‘xtatish tartibi ifodalanadi.',
      'It expresses the sequence of action, danger detection, and interruption.',
      'Выражается последовательность: действие, обнаружение опасности и остановка.',
    ),
    ['v-daga', 'check-surroundings'],
  ),

  s5u8_195_type_answer: grammarTypeAnswer(
    '운전하다가 위험한 상황이 생기면 바로 속도를 줄여야 해요',
    L(
      '운전 중 위험한 상황이 생기는 경우 바로 속도를 낮춰야 한다고 `-다가`를 사용해 쓰세요.',
      'Haydash paytida xavf bo‘lsa darhol tezlikni kamaytirish kerakligini `-다가` bilan yozing.',
      'Using -다가, write that you should reduce speed immediately if a dangerous situation occurs while driving.',
      'Используя -다가, напишите, что при опасной ситуации во время движения нужно сразу снизить скорость.',
    ),
    'If a dangerous situation arises while driving, the driver should immediately reduce speed.',
    ['운전하다가'],
    ['v-daga', 'safety', 'type-answer'],
  ),

  s5u8_196_reading_quiz: grammarReadingQuiz(
    '운전 중에는 예상하지 못한 상황이 생길 수 있습니다. 신호가 바뀌거나 사람이 나타나거나 앞의 상황이 달라지면 계속 같은 속도로 가는 것이 아니라 안전하게 대응해야 합니다. 이 글과 가장 가까운 문장을 고르세요.',
    [
      '운전하다가 위험한 상황이 생기면 속도를 줄여야 해요.',
      '운전하다가 위험한 상황이 생기면 더 과속해야 해요.',
      '운전하면서 주변은 보지 않아도 돼요.',
      '신호를 무시하고 계속 가야 해요.',
    ],
    '운전하다가 위험한 상황이 생기면 속도를 줄여야 해요.',
    L(
      '`-다가`를 문법 문제에서 끝내지 않고 실제 안전 대응으로 연결해요.',
      '`-다가` faqat grammatika emas, haqiqiy xavfsizlik qarori bilan bog‘lanadi.',
      'The grammar is connected to a practical safe response rather than isolated form practice.',
      'Грамматика связывается с реальной безопасной реакцией, а не остаётся только упражнением на форму.',
    ),
    ['v-daga', 'safety', 'learning-value'],
  ),

  s5u8_197_translate_builder: grammarTranslateBuilder(
    L(
      '운전 중 위험한 상황이 생기면 바로 속도를 줄여야 한다고 표현하기',
      'Haydash paytida xavfli vaziyat paydo bo‘lsa darhol tezlikni kamaytirish kerakligini ayting.',
      'Say that you should immediately reduce your speed if a dangerous situation occurs while driving.',
      'Скажите, что при опасной ситуации во время движения нужно сразу снизить скорость.',
    ),
    [
      '바로 속도를 줄여야 해요',
      '운전하다가',
      '위험한 상황이 생기면',
      '더 과속해야 해요',
      '신호를 무시해야 해요',
      '주변을 보지 말아야 해요',
    ],
    '운전하다가 위험한 상황이 생기면 바로 속도를 줄여야 해요',
    L(
      '진행 중인 운전과 안전한 대응을 하나의 실제 상황으로 연결해요.',
      'Davom etayotgan haydash va xavfsiz javob bir vaziyatda bog‘lanadi.',
      'Ongoing driving and the appropriate safety response are connected in one realistic situation.',
      'Продолжающееся вождение и безопасная реакция объединяются в одной реальной ситуации.',
    ),
    ['v-daga', 'safety', 'integration'],
  ),

  s5u8_198_fill_in_blank: grammarFillBlank(
    '운전___ 위험한 상황이 생기면 속도를 줄여야 해요.',
    ['하다가'],
    ['하다가', '하면서', '하려고', '하니까', '하지만'],
    L(
      '운전 중에 예상하지 못한 위험이 생긴 상황이에요.',
      'Haydash paytida kutilmagan xavf paydo bo‘ldi.',
      'An unexpected danger arose while driving.',
      'Во время движения возникла неожиданная опасность.',
    ),
    ['v-daga', 'safety'],
  ),

  s5u8_199_error_hunt: grammarErrorHunt(
    '과속하면서 사고가 나서 운전을 멈췄어요.',
    '과속하면서',
    ['과속하다가', '과속하려고', '과속하니까', '과속하지만'],
    '과속하다가',
    L(
      '사고가 발생하면서 과속 행동이 중단됐으므로 `과속하다가`가 더 정확해요.',
      'Avariya sabab tezlik oshirish to‘xtagani uchun `과속하다가` aniqroq.',
      'Because the accident interrupted the speeding action, 과속하다가 is more accurate.',
      'Поскольку авария прервала превышение скорости, точнее 과속하다가.',
    ),
    ['v-daga', 'grammar-contrast'],
  ),

  s5u8_200_word_arrange: grammarWordArrange(
    [
      '어떤 일이 이어졌는지',
      '교통사고 상황을',
      '`V-다가`를 사용하면',
      '더 구체적으로 설명할 수 있어요',
      '진행 중이던 행동에',
      '문법 형태만 외우면 돼요',
    ],
    '`V-다가`를 사용하면 진행 중이던 행동에 어떤 일이 이어졌는지 교통사고 상황을 더 구체적으로 설명할 수 있어요',
    L(
      '이번 Node의 목표는 `-다가` 형태 자체가 아니라 사고가 어떻게 발생했는지를 설명하는 능력이에요.',
      'Bu Node maqsadi faqat `-다가` shakli emas, avariya qanday yuz berganini tushuntira olish.',
      'The goal is not merely the -다가 form, but the ability to explain how an accident unfolded.',
      'Цель Node — не просто форма -다가, а умение объяснить, как развивалась аварийная ситуация.',
    ),
    ['v-daga', 'node-review', 'traffic-accident'],
  ), // ══════════════════════════════════════════════════════════
  // Node 3
  // A-다고(요), V-ㄴ다고/는다고(요), N(이)라고(요)
  // 들은 내용을 다시 확인하거나 사고 소식을 전달하기
  // ══════════════════════════════════════════════════════════

  // ──────────────────────────────────────────────────────────
  // Lesson 1 · 사고가 났다고요?
  // 들은 내용을 다시 확인하기
  // ──────────────────────────────────────────────────────────

  s5u8_201_reading_quiz: grammarReadingQuiz(
    '친구에게서 “민수 씨가 어제 교통사고를 당했어요.”라는 말을 들었습니다. 정확히 들었는지 다시 확인하려고 합니다.',
    [
      '민수 씨가 교통사고를 당했다고요?',
      '민수 씨가 교통사고를 당하면서요?',
      '민수 씨가 교통사고를 당하려고요?',
      '민수 씨가 교통사고를 당하다가요?',
    ],
    '민수 씨가 교통사고를 당했다고요?',
    L(
      '이미 들은 사고 소식을 다시 확인하는 표현이에요.',
      'Eshitilgan avariya xabarini qayta aniqlashtirish ifodasi.',
      'This expression confirms accident news that was just heard.',
      'Это выражение используется для уточнения только что услышанной новости об аварии.',
    ),
    ['reported-speech', 'accident-news'],
  ),

  s5u8_202_type_answer: grammarTypeAnswer(
    '민수 씨가 교통사고를 당했다고요?',
    L(
      '민수 씨가 교통사고를 당했다는 말을 듣고 놀라서 다시 확인하세요.',
      'Minsu avariyaga uchraganini eshitib, hayron bo‘lib yana aniqlashtiring.',
      'You heard that Minsu was in a traffic accident. Confirm what you heard.',
      'Вы услышали, что Минсу попал в ДТП. Переспросите для подтверждения.',
    ),
    'The speaker confirms that Minsu was involved in a traffic accident.',
    ['당했다고요'],
    ['reported-speech', 'accident-news', 'type-answer'],
  ),

  s5u8_203_translate_builder: grammarTranslateBuilder(
    L(
      '친구가 교통사고를 당했다는 말을 다시 확인하기',
      'Do‘stingiz avariyaga uchraganini qayta aniqlashtiring.',
      'Confirm that your friend was involved in a traffic accident.',
      'Переспросите, правда ли друг попал в ДТП.',
    ),
    [
      '친구가',
      '교통사고를 당했다고요?',
      '사고를 낸다고요?',
      '과속하면서요?',
      '문병을 간다고요?',
      '퇴원이라고요?',
    ],
    '친구가 교통사고를 당했다고요?',
    L(
      '완료된 과거 사건은 `-았/었다고요?`로 다시 확인할 수 있어요.',
      'Tugallangan o‘tgan hodisa `-았/었다고요?` bilan qayta so‘raladi.',
      'A completed past event can be confirmed with -았/었다고요?',
      'Завершённое событие в прошлом можно уточнить с помощью -았/었다고요?',
    ),
    ['reported-speech', 'past'],
  ),

  s5u8_204_fill_in_blank: grammarFillBlank(
    '어제 교통사고가 났___?',
    ['다고요'],
    ['다고요', '는다고요', '라고요', '다가요', '면서요'],
    L(
      '`났어요`라는 과거 사실을 다시 확인하면 `났다고요?`가 돼요.',
      '`났어요` o‘tgan voqeasini qayta so‘rashda `났다고요?` bo‘ladi.',
      'To confirm the past statement 났어요, use 났다고요?',
      'Для уточнения прошедшего 났어요 используется 났다고요?',
    ),
    ['reported-speech', 'past-form'],
  ),

  s5u8_205_word_arrange: grammarWordArrange(
    [
      '교통사고가',
      '났다고요?',
      '어제',
      '과속한다고요?',
      '병원이라고요?',
      '위험하다고요?',
    ],
    '어제 교통사고가 났다고요?',
    L(
      '들은 사고 소식의 시간과 내용을 함께 확인해요.',
      'Eshitilgan hodisaning vaqti va mazmuni birga aniqlashtiriladi.',
      'Confirm both the timing and content of the accident news.',
      'Уточняются и время, и содержание новости об аварии.',
    ),
    ['reported-speech', 'accident-news'],
  ),

  s5u8_206_type_answer: grammarTypeAnswer(
    '어제 사고가 났다고요?',
    L(
      '사고가 어제 발생했다는 말을 다시 확인하세요.',
      'Avariya kecha bo‘lganini qayta aniqlashtiring.',
      'Confirm that the accident happened yesterday.',
      'Переспросите, правда ли авария произошла вчера.',
    ),
    'The speaker confirms that an accident happened yesterday.',
    ['났다고요'],
    ['reported-speech', 'past', 'type-answer'],
  ),

  s5u8_207_error_hunt: grammarErrorHunt(
    '어제 사고가 났는다고요?',
    '났는다고요?',
    ['났다고요?', '난다고요?', '났다가요?', '났으면서요?'],
    '났다고요?',
    L(
      '과거형 `났다` 뒤에는 `-다고요`를 붙여 `났다고요?`라고 해요.',
      'O‘tgan zamon `났다`dan keyin `-다고요` keladi.',
      'The past form 났다 takes -다고요: 났다고요?',
      'После формы прошлого времени 났다 используется -다고요: 났다고요?',
    ),
    ['reported-speech', 'conjugation'],
  ),

  s5u8_208_translate_builder: grammarTranslateBuilder(
    L(
      '운전자가 사고를 냈다는 말을 다시 확인하기',
      'Haydovchi avariyaga sabab bo‘lganini qayta aniqlashtiring.',
      'Confirm that the driver caused the accident.',
      'Уточните, правда ли водитель стал виновником аварии.',
    ),
    [
      '운전자가',
      '사고를 냈다고요?',
      '사고를 당한다고요?',
      '안전벨트를 맨다고요?',
      '주위를 살핀다고요?',
      '제한 속도라고요?',
    ],
    '운전자가 사고를 냈다고요?',
    L(
      '`사고를 내다`와 `사고를 당하다`의 의미도 함께 구별해요.',
      '`사고를 내다` va `사고를 당하다` ma’nolari ham farqlanadi.',
      'This also distinguishes causing an accident from suffering one.',
      'Также различаются значения «стать виновником» и «пострадать в аварии».',
    ),
    ['reported-speech', 'cause-accident'],
  ),

  s5u8_209_reading_quiz: grammarReadingQuiz(
    '직장 동료가 “박 과장님이 출근길에 사고를 냈어요.”라고 말했습니다. 상대방이 놀라서 내용을 다시 물었습니다.',
    [
      '박 과장님이 사고를 냈다고요?',
      '박 과장님이 사고를 낸다고요?',
      '박 과장님이 사고라고요?',
      '박 과장님이 사고를 내면서요?',
    ],
    '박 과장님이 사고를 냈다고요?',
    L(
      '이미 발생한 사고이므로 과거 사실을 다시 확인해야 해요.',
      'Hodisa allaqachon bo‘lgan, shuning uchun o‘tgan fakt aniqlashtiriladi.',
      'The accident already happened, so the past event is being confirmed.',
      'Авария уже произошла, поэтому уточняется событие прошлого.',
    ),
    ['reported-speech', 'cause-accident'],
  ),

  s5u8_210_fill_in_blank: grammarFillBlank(
    '박 과장님이 사고를 ___?',
    ['냈다고요'],
    ['냈다고요', '낸다고요', '내라고요', '내다가요', '내면서요'],
    L(
      '`사고를 냈어요`를 다시 확인하면 `사고를 냈다고요?`예요.',
      '`사고를 냈어요`ni qayta so‘rashda `사고를 냈다고요?` bo‘ladi.',
      '사고를 냈어요 becomes 사고를 냈다고요? when confirming it.',
      '사고를 냈어요 при переспросе становится 사고를 냈다고요?',
    ),
    ['reported-speech', 'past'],
  ),

  s5u8_211_type_answer: grammarTypeAnswer(
    '운전자가 신호를 어겼다고요?',
    L(
      '운전자가 교통 신호를 지키지 않았다는 말을 다시 확인하세요.',
      'Haydovchi signalga rioya qilmaganini qayta aniqlashtiring.',
      'Confirm that the driver disobeyed the traffic signal.',
      'Переспросите, правда ли водитель нарушил сигнал светофора.',
    ),
    'The speaker confirms that the driver disobeyed the traffic signal.',
    ['어겼다고요'],
    ['reported-speech', 'disobey-signal', 'type-answer'],
  ),

  s5u8_212_translate_builder: grammarTranslateBuilder(
    L(
      '운전자가 신호를 어겼다는 사고 정보를 다시 확인하기',
      'Haydovchi signalni buzganini qayta aniqlashtiring.',
      'Confirm that the driver disobeyed the signal.',
      'Уточните, правда ли водитель нарушил сигнал.',
    ),
    [
      '운전자가',
      '신호를 어겼다고요?',
      '신호를 지킨다고요?',
      '안전벨트라고요?',
      '문병을 갔다고요?',
      '퇴원한다고요?',
    ],
    '운전자가 신호를 어겼다고요?',
    L(
      '사고가 난 이유를 들었을 때도 같은 방식으로 확인할 수 있어요.',
      'Avariya sababini eshitganda ham shu tarzda aniqlashtirish mumkin.',
      'The same form can confirm information about the cause of an accident.',
      'Этой же формой можно уточнить информацию о причине аварии.',
    ),
    ['reported-speech', 'disobey-signal'],
  ),

  s5u8_213_cloze_passage: grammarClozePassage(
    '친구가 교통사고를 ___? 운전자가 신호를 ___?',
    ['당했다고요', '어겼다고요'],
    [
      '어겼다고요',
      '당했다고요',
      '당한다고요',
      '어긴다고요',
      '사고라고요',
      '신호라고요',
    ],
    L(
      '과거에 이미 일어난 두 사건을 다시 확인해요.',
      'O‘tgan zamonda sodir bo‘lgan ikki hodisa qayta aniqlashtiriladi.',
      'Confirm two events that already occurred.',
      'Уточняются два уже произошедших события.',
    ),
    ['reported-speech', 'past'],
  ),

  s5u8_214_word_arrange: grammarWordArrange(
    [
      '사고를',
      '당했다고요?',
      '친구가',
      '사고를 낸다고요?',
      '병원이라고요?',
      '위험하다고요?',
    ],
    '친구가 사고를 당했다고요?',
    L(
      '사고 피해자가 누구인지 정확하게 다시 확인해요.',
      'Avariya jabrlanuvchisi kim ekanini aniq qayta so‘raymiz.',
      'Confirm exactly who was involved as the victim.',
      'Уточняется, кто именно пострадал в аварии.',
    ),
    ['reported-speech', 'suffer-accident'],
  ),

  s5u8_215_type_answer: grammarTypeAnswer(
    '친구가 사고를 당했다고요?',
    L(
      '친구가 사고의 피해를 입었다는 말을 놀라서 다시 확인하세요.',
      'Do‘stingiz avariya qurboni bo‘lganini hayron bo‘lib qayta so‘rang.',
      'Confirm in surprise that your friend suffered an accident.',
      'С удивлением переспросите, правда ли друг пострадал в аварии.',
    ),
    'The speaker confirms that their friend suffered an accident.',
    ['당했다고요'],
    ['reported-speech', 'suffer-accident', 'type-answer'],
  ),

  s5u8_216_reading_quiz: grammarReadingQuiz(
    '한 사람은 사고를 일으킨 운전자이고 다른 사람은 그 사고 때문에 다쳤습니다. “사고를 냈다고요?”는 누구에 대한 확인이에요?',
    [
      '사고를 일으킨 사람',
      '사고의 피해를 입은 사람',
      '문병을 간 사람',
      '퇴원한 사람',
    ],
    '사고를 일으킨 사람',
    L(
      '`사고를 내다`는 사고를 일으킨 쪽을 말해요.',
      '`사고를 내다` avariyaga sabab bo‘lgan tomonni bildiradi.',
      '사고를 내다 refers to the person who caused the accident.',
      '사고를 내다 относится к человеку, ставшему причиной аварии.',
    ),
    ['cause-accident', 'meaning'],
  ),

  s5u8_217_translate_builder: grammarTranslateBuilder(
    L(
      '사고의 피해를 입었다는 뜻으로 “사고를 당했다”는 말을 다시 확인하기',
      'Avariya qurboni bo‘lgan ma’noda aytilgan xabarni qayta so‘rang.',
      'Confirm the statement that someone suffered an accident.',
      'Переспросите утверждение о том, что человек пострадал в аварии.',
    ),
    [
      '사고를 당했다고요?',
      '사고를 냈다고요?',
      '사고를 낸다고요?',
      '교통사고라고요?',
      '과속한다고요?',
      '신호를 어긴다고요?',
    ],
    '사고를 당했다고요?',
    L(
      '`당하다`는 피해를 입은 쪽을 나타내요.',
      '`당하다` jabrlangan tomonni bildiradi.',
      '당하다 marks the person who suffered the accident.',
      '당하다 обозначает пострадавшую сторону.',
    ),
    ['reported-speech', 'suffer-accident'],
  ),

  s5u8_218_fill_in_blank: grammarFillBlank(
    '친구가 교통사고를 당했___?',
    ['다고요'],
    ['다고요', '는다고요', '라고요', '다가요', '면서요'],
    L(
      '과거 사건의 완성된 형태 `당했다` 뒤에 `-고요`가 연결돼요.',
      'O‘tgan `당했다` shakliga `-고요` ulanadi.',
      'The completed past form 당했다 becomes 당했다고요.',
      'Прошедшая форма 당했다 превращается в 당했다고요.',
    ),
    ['reported-speech', 'past-form'],
  ),

  s5u8_219_error_hunt: grammarErrorHunt(
    '친구가 사고를 당했는다고요?',
    '당했는다고요?',
    ['당했다고요?', '당한다고요?', '당하다가요?', '당하면서요?'],
    '당했다고요?',
    L(
      '과거형에는 현재 동사형 `-는다고`를 사용하지 않아요.',
      'O‘tgan zamonda hozirgi fe’l shakli `-는다고` ishlatilmaydi.',
      'Do not use present-tense -는다고 after a past verb form.',
      'После формы прошедшего времени не используется настоящее -는다고.',
    ),
    ['reported-speech', 'conjugation'],
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 2 · 지금도 아프다고요?
  // A-다고요 / V-ㄴ다고·는다고요
  // ──────────────────────────────────────────────────────────

  s5u8_221_reading_quiz: grammarReadingQuiz(
    '친구가 “이 길은 밤에 아주 위험해요.”라고 말했습니다. 상대방이 놀라서 다시 확인하려고 합니다.',
    [
      '이 길이 밤에 위험하다고요?',
      '이 길이 밤에 위험한는다고요?',
      '이 길이 밤에 위험이라고요?',
      '이 길이 밤에 위험하다가요?',
    ],
    '이 길이 밤에 위험하다고요?',
    L(
      '형용사 `위험하다`에는 `-다고요`를 붙여요.',
      '`위험하다` sifatiga `-다고요` qo‘shiladi.',
      'The adjective 위험하다 takes -다고요.',
      'К прилагательному 위험하다 добавляется -다고요.',
    ),
    ['reported-speech', 'adjective'],
  ),

  s5u8_222_type_answer: grammarTypeAnswer(
    '이 길이 밤에는 위험하다고요?',
    L(
      '이 길이 밤에는 위험하다는 말을 다시 확인하세요.',
      'Bu yo‘l tunda xavfli ekanini qayta aniqlashtiring.',
      'Confirm that this road is dangerous at night.',
      'Переспросите, правда ли эта дорога опасна ночью.',
    ),
    'The speaker confirms that the road is dangerous at night.',
    ['위험하다고요'],
    ['reported-speech', 'adjective', 'type-answer'],
  ),

  s5u8_223_translate_builder: grammarTranslateBuilder(
    L(
      '비 오는 날에는 도로가 더 위험하다는 말을 다시 확인하기',
      'Yomg‘irli kunda yo‘l xavfliroq ekanini qayta so‘rang.',
      'Confirm that the road is more dangerous on rainy days.',
      'Уточните, правда ли в дождливый день дорога опаснее.',
    ),
    [
      '도로가 더 위험하다고요?',
      '비 오는 날에는',
      '도로가 위험한는다고요?',
      '과속이라고요?',
      '신호를 어겼다고요?',
      '입원한다고요?',
    ],
    '비 오는 날에는 도로가 더 위험하다고요?',
    L(
      '형용사에는 동사 현재형 `-는다고`가 아니라 `-다고`를 써요.',
      'Sifatda fe’lning `-는다고` shakli emas, `-다고` ishlatiladi.',
      'Adjectives take -다고, not the present verb form -는다고.',
      'С прилагательными используется -다고, а не глагольное -는다고.',
    ),
    ['reported-speech', 'adjective'],
  ),

  s5u8_224_fill_in_blank: grammarFillBlank(
    '이 도로가 아주 위험하___?',
    ['다고요'],
    ['다고요', '는다고요', 'ㄴ다고요', '라고요', '다가요'],
    L(
      '`위험하다 → 위험하다고요?`예요.',
      '`위험하다 → 위험하다고요?` bo‘ladi.',
      '위험하다 becomes 위험하다고요?',
      '위험하다 превращается в 위험하다고요?',
    ),
    ['reported-speech', 'adjective-form'],
  ),

  s5u8_225_word_arrange: grammarWordArrange(
    [
      '위험하다고요?',
      '이 길이',
      '밤에는',
      '위험한는다고요?',
      '사고라고요?',
      '간다고요?',
    ],
    '이 길이 밤에는 위험하다고요?',
    L(
      '형용사 정보를 다시 확인하는 문장이에요.',
      'Sifat ma’lumoti qayta aniqlashtirilmoqda.',
      'This sentence confirms descriptive information.',
      'В предложении уточняется описание состояния.',
    ),
    ['reported-speech', 'adjective'],
  ),

  s5u8_226_type_answer: grammarTypeAnswer(
    '민수 씨가 내일 퇴원한다고요?',
    L(
      '민수 씨가 내일 병원에서 나간다는 말을 다시 확인하세요.',
      'Minsu ertaga kasalxonadan chiqishini qayta aniqlashtiring.',
      'Confirm that Minsu will be discharged tomorrow.',
      'Переспросите, правда ли Минсу завтра выпишут.',
    ),
    'The speaker confirms that Minsu will leave the hospital tomorrow.',
    ['퇴원한다고요'],
    ['reported-speech', 'verb-present', 'type-answer'],
  ),

  s5u8_227_error_hunt: grammarErrorHunt(
    '민수 씨가 내일 퇴원하다고요?',
    '퇴원하다고요?',
    ['퇴원한다고요?', '퇴원했다고요?', '퇴원이라요?', '퇴원하다가요?'],
    '퇴원한다고요?',
    L(
      '현재·미래 행동인 `퇴원하다`는 `퇴원한다고요?`로 표현해요.',
      'Hozirgi/kelajak harakat `퇴원하다 → 퇴원한다고요?`.',
      'For a present/future verb, 퇴원하다 becomes 퇴원한다고요?',
      'Для глагола настоящего/будущего времени 퇴원하다 → 퇴원한다고요?',
    ),
    ['reported-speech', 'verb-present', 'conjugation'],
  ),

  s5u8_228_translate_builder: grammarTranslateBuilder(
    L(
      '친구가 내일 퇴원한다는 말을 다시 확인하기',
      'Do‘stingiz ertaga kasalxonadan chiqishini qayta so‘rang.',
      'Confirm that your friend will be discharged tomorrow.',
      'Уточните, правда ли друг завтра выпишется.',
    ),
    [
      '친구가',
      '내일 퇴원한다고요?',
      '어제 퇴원했다고요?',
      '병원이라고요?',
      '위험하다고요?',
      '입원하다가요?',
    ],
    '친구가 내일 퇴원한다고요?',
    L(
      '행동 동사의 현재·미래 내용에는 `-ㄴ다고/는다고요`를 사용해요.',
      'Harakat fe’lining hozirgi/kelajak mazmunida `-ㄴ다고/는다고요` ishlatiladi.',
      'Present/future action verbs take -ㄴ다고/는다고요.',
      'Для действий настоящего/будущего используется -ㄴ다고/는다고요.',
    ),
    ['reported-speech', 'verb-present'],
  ),

  s5u8_229_reading_quiz: grammarReadingQuiz(
    '친구가 “오늘 병원에 문병을 가요.”라고 했습니다. 그 내용을 다시 확인하는 문장은 무엇이에요?',
    [
      '오늘 병원에 문병을 간다고요?',
      '오늘 병원에 문병을 가다고요?',
      '오늘 병원이 문병이라고요?',
      '오늘 문병을 갔다고요?',
    ],
    '오늘 병원에 문병을 간다고요?',
    L(
      '`가다`처럼 받침이 없는 동사는 `간다고요?`가 돼요.',
      '`가다` kabi fe’l `간다고요?` bo‘ladi.',
      'A vowel-ending verb such as 가다 becomes 간다고요?',
      'Глагол 가다 принимает форму 간다고요?',
    ),
    ['reported-speech', 'verb-present'],
  ),

  s5u8_231_type_answer: grammarTypeAnswer(
    '친구가 오늘 문병을 간다고요?',
    L(
      '친구가 오늘 아픈 사람을 만나러 병원에 간다는 말을 다시 확인하세요.',
      'Do‘stingiz bugun kasal odamni ko‘rgani borishini qayta aniqlashtiring.',
      'Confirm that your friend is going to visit someone sick today.',
      'Переспросите, правда ли друг сегодня идёт навестить больного.',
    ),
    'The speaker confirms that their friend is going to visit a sick person today.',
    ['간다고요'],
    ['reported-speech', 'visit-sick-person', 'type-answer'],
  ),

  s5u8_232_translate_builder: grammarTranslateBuilder(
    L(
      '친구가 오늘 병원에 문병을 간다는 말을 확인하기',
      'Do‘stingiz bugun kasalxonaga bemorni ko‘rgani borishini aniqlashtiring.',
      'Confirm that your friend is going to the hospital to visit someone sick today.',
      'Уточните, правда ли друг сегодня идёт в больницу навестить больного.',
    ),
    [
      '친구가',
      '오늘 병원에',
      '문병을 간다고요?',
      '문병을 갔다고요?',
      '입원이라고요?',
      '위험하다고요?',
    ],
    '친구가 오늘 병원에 문병을 간다고요?',
    L(
      '`가다`의 현재·미래 인용형을 실제 병원 상황에서 연습해요.',
      '`가다`ning hozirgi/kelajak shakli kasalxona vaziyatida mashq qilinadi.',
      'Practise the present/future reported form of 가다 in a hospital context.',
      'Тренируем форму 가다 в контексте посещения больницы.',
    ),
    ['reported-speech', 'visit-sick-person'],
  ),

  s5u8_233_cloze_passage: grammarClozePassage(
    '이 길이 아주 ___? 민수 씨가 내일 ___?',
    ['위험하다고요', '퇴원한다고요'],
    [
      '퇴원한다고요',
      '위험하다고요',
      '위험한는다고요',
      '퇴원하다고요',
      '병원이라고요',
      '퇴원했다고요',
    ],
    L(
      '형용사 `A-다고요`와 동사 `V-ㄴ/는다고요`를 구별해요.',
      'Sifat `A-다고요` va fe’l `V-ㄴ/는다고요` farqlanadi.',
      'Distinguish adjective A-다고요 from verb V-ㄴ/는다고요.',
      'Различаем A-다고요 для прилагательных и V-ㄴ/는다고요 для глаголов.',
    ),
    ['reported-speech', 'form-contrast'],
  ),

  s5u8_234_word_arrange: grammarWordArrange(
    [
      '내일',
      '퇴원한다고요?',
      '친구가',
      '퇴원하다고요?',
      '위험하다고요?',
      '병원이라고요?',
    ],
    '친구가 내일 퇴원한다고요?',
    L(
      '앞으로 할 행동을 다시 확인하는 표현이에요.',
      'Kelajakdagi harakat qayta aniqlashtirilmoqda.',
      'This confirms a future action.',
      'Уточняется действие в будущем.',
    ),
    ['reported-speech', 'verb-present'],
  ),

  s5u8_235_type_answer: grammarTypeAnswer(
    '눈길이 아주 미끄럽다고요?',
    L(
      '눈이 온 길이 매우 미끄럽다는 말을 다시 확인하세요.',
      'Qorli yo‘l juda sirpanchiq ekanini qayta so‘rang.',
      'Confirm that the snowy road is very slippery.',
      'Переспросите, правда ли заснеженная дорога очень скользкая.',
    ),
    'The speaker confirms that the snowy road is very slippery.',
    ['미끄럽다고요'],
    ['reported-speech', 'adjective', 'type-answer'],
  ),

  s5u8_236_reading_quiz: grammarReadingQuiz(
    '“눈이 많이 와서 도로가 아주 미끄러워요.”라는 말을 들었습니다. 다시 확인할 때 가장 알맞은 표현은 무엇이에요?',
    [
      '도로가 아주 미끄럽다고요?',
      '도로가 아주 미끄러운다고요?',
      '도로가 아주 미끄러진다고요?',
      '도로가 아주 미끄럼이라고요?',
    ],
    '도로가 아주 미끄럽다고요?',
    L(
      '`미끄럽다`는 상태를 나타내는 형용사라서 `미끄럽다고요?`를 사용해요.',
      '`미끄럽다` sifat bo‘lgani uchun `미끄럽다고요?` ishlatiladi.',
      '미끄럽다 is an adjective, so use 미끄럽다고요?',
      '미끄럽다 — прилагательное, поэтому используется 미끄럽다고요?',
    ),
    ['reported-speech', 'adjective'],
  ),

  s5u8_237_translate_builder: grammarTranslateBuilder(
    L(
      '눈길이 매우 미끄럽다는 정보를 다시 확인하기',
      'Qorli yo‘l juda sirpanchiq ekanini qayta aniqlashtiring.',
      'Confirm that the snowy road is very slippery.',
      'Уточните, правда ли заснеженная дорога очень скользкая.',
    ),
    [
      '눈길이',
      '아주 미끄럽다고요?',
      '미끄러진다고요?',
      '과속한다고요?',
      '병원이라고요?',
      '사고를 냈다고요?',
    ],
    '눈길이 아주 미끄럽다고요?',
    L(
      '사고 위험을 설명하는 형용사도 `A-다고요`로 확인해요.',
      'Avariya xavfini ifodalovchi sifat ham `A-다고요` bilan aniqlashtiriladi.',
      'Adjectives describing accident risk are also confirmed with A-다고요.',
      'Прилагательные, описывающие риск аварии, также уточняются через A-다고요.',
    ),
    ['reported-speech', 'adjective', 'safety'],
  ),

  s5u8_238_fill_in_blank: grammarFillBlank(
    '눈길이 아주 미끄럽___?',
    ['다고요'],
    ['다고요', '는다고요', 'ㄴ다고요', '이라고요', '다가요'],
    L(
      '`미끄럽다 → 미끄럽다고요?`예요.',
      '`미끄럽다 → 미끄럽다고요?`.',
      '미끄럽다 becomes 미끄럽다고요?',
      '미끄럽다 превращается в 미끄럽다고요?',
    ),
    ['reported-speech', 'adjective-form'],
  ),

  s5u8_239_error_hunt: grammarErrorHunt(
    '이 길은 위험한는다고요?',
    '위험한는다고요?',
    ['위험하다고요?', '위험한다고요?', '위험이라고요?', '위험하다가요?'],
    '위험하다고요?',
    L(
      '형용사는 `-ㄴ/는다고요`가 아니라 `-다고요`를 사용해요.',
      'Sifat `-ㄴ/는다고요` emas, `-다고요` oladi.',
      'Adjectives use -다고요, not -ㄴ/는다고요.',
      'С прилагательными используется -다고요, а не -ㄴ/는다고요.',
    ),
    ['reported-speech', 'adjective', 'conjugation'],
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 3 · 병원이라고요?
  // N(이)라고요 + 세 형태 구별
  // ──────────────────────────────────────────────────────────

  s5u8_241_reading_quiz: grammarReadingQuiz(
    '친구가 “민수 씨가 지금 있는 곳은 서울병원이에요.”라고 말했습니다. 장소 이름을 정확히 들었는지 확인하려고 합니다.',
    [
      '서울병원이라고요?',
      '서울병원다고요?',
      '서울병원는다고요?',
      '서울병원ㄴ다고요?',
    ],
    '서울병원이라고요?',
    L(
      '받침 있는 명사 `서울병원` 뒤에는 `이라고요?`를 사용해요.',
      'Undosh bilan tugagan `서울병원`dan keyin `이라고요?` ishlatiladi.',
      'The consonant-ending noun 서울병원 takes 이라고요?',
      'После существительного 서울병원 с конечной согласной используется 이라고요?',
    ),
    ['reported-speech', 'noun'],
  ),

  s5u8_242_type_answer: grammarTypeAnswer(
    '민수 씨가 있는 곳이 서울병원이라고요?',
    L(
      '민수 씨가 서울병원에 있다는 말을 병원 이름까지 포함해 다시 확인하세요.',
      'Minsu Seul kasalxonasida ekanini nomi bilan qayta aniqlashtiring.',
      'Confirm that the place where Minsu is staying is Seoul Hospital.',
      'Уточните, правда ли Минсу находится в больнице «Сеул».',
    ),
    'The speaker confirms that Minsu is at Seoul Hospital.',
    ['서울병원이라고요'],
    ['reported-speech', 'noun', 'type-answer'],
  ),

  s5u8_243_translate_builder: grammarTranslateBuilder(
    L(
      '사고가 난 곳이 교차로라는 말을 다시 확인하기',
      'Avariya bo‘lgan joy chorraha ekanini qayta aniqlashtiring.',
      'Confirm that the accident location was an intersection.',
      'Уточните, правда ли авария произошла на перекрёстке.',
    ),
    [
      '사고가 난 곳이',
      '교차로라고요?',
      '교차로이라고요?',
      '위험하다고요?',
      '사고를 냈다고요?',
      '입원한다고요?',
    ],
    '사고가 난 곳이 교차로라고요?',
    L(
      '받침 없는 명사 `교차로` 뒤에는 `라고요?`를 사용해요.',
      'Unli bilan tugagan `교차로`dan keyin `라고요?` ishlatiladi.',
      'The vowel-ending noun 교차로 takes 라고요?',
      'После существительного 교차로 без конечной согласной используется 라고요?',
    ),
    ['reported-speech', 'noun'],
  ),

  s5u8_244_fill_in_blank: grammarFillBlank(
    '사고가 난 곳이 교차로___?',
    ['라고요'],
    ['라고요', '이라고요', '다고요', '는다고요', '다가요'],
    L(
      '`교차로`는 받침이 없어서 `교차로라고요?`예요.',
      '`교차로` undoshsiz tugagani uchun `교차로라고요?`.',
      '교차로 has no final consonant, so use 교차로라고요?',
      'У 교차로 нет конечной согласной, поэтому используется 교차로라고요?',
    ),
    ['reported-speech', 'noun-form'],
  ),

  s5u8_245_word_arrange: grammarWordArrange(
    [
      '교통사고라고요?',
      '큰 사고가',
      '신호를 어겼다고요?',
      '위험하다고요?',
      '입원한다고요?',
      '과속한다고요?',
    ],
    '큰 사고가 교통사고라고요?',
    L(
      '명사의 이름이나 종류를 다시 확인할 때 `N(이)라고요?`를 사용해요.',
      'Otning nomi yoki turini qayta so‘rashda `N(이)라고요?` ishlatiladi.',
      'Use N(이)라고요? to confirm a noun identity or category.',
      'N(이)라고요? используется для уточнения названия или категории.',
    ),
    ['reported-speech', 'noun'],
  ),

  s5u8_246_type_answer: grammarTypeAnswer(
    '사고가 난 곳이 교차로라고요?',
    L(
      '사고가 난 장소가 교차로라는 말을 다시 확인하세요.',
      'Avariya joyi chorraha ekanini qayta aniqlashtiring.',
      'Confirm that the accident happened at an intersection.',
      'Переспросите, правда ли место аварии — перекрёсток.',
    ),
    'The speaker confirms that the accident location was an intersection.',
    ['교차로라고요'],
    ['reported-speech', 'noun', 'type-answer'],
  ),

  s5u8_247_error_hunt: grammarErrorHunt(
    '민수 씨가 있는 곳이 병원라고요?',
    '병원라고요?',
    ['병원이라고요?', '병원다고요?', '병원는다고요?', '병원다가요?'],
    '병원이라고요?',
    L(
      '`병원`은 받침이 있으므로 `병원이라고요?`라고 해요.',
      '`병원` undosh bilan tugagani uchun `병원이라고요?`.',
      '병원 ends in a consonant, so use 병원이라고요?',
      '병원 оканчивается на согласную, поэтому используется 병원이라고요?',
    ),
    ['reported-speech', 'noun', 'conjugation'],
  ),

  s5u8_248_translate_builder: grammarTranslateBuilder(
    L(
      '친구가 입원한 곳이 대학병원이라는 말을 다시 확인하기',
      'Do‘stingiz yotgan joy universitet kasalxonasi ekanini qayta so‘rang.',
      'Confirm that your friend was admitted to a university hospital.',
      'Уточните, правда ли друг лежит в университетской больнице.',
    ),
    [
      '친구가 입원한 곳이',
      '대학병원이라고요?',
      '대학병원라고요?',
      '입원한다고요?',
      '위험하다고요?',
      '수술했다고요?',
    ],
    '친구가 입원한 곳이 대학병원이라고요?',
    L(
      '병원 이름이나 종류처럼 명사 정보를 확인해요.',
      'Kasalxona nomi yoki turi kabi ot ma’lumoti aniqlashtiriladi.',
      'This confirms noun information such as the hospital name or type.',
      'Уточняется информация-существительное, например название или тип больницы.',
    ),
    ['reported-speech', 'noun', 'hospital'],
  ),

  s5u8_249_reading_quiz: grammarReadingQuiz(
    '“사고 원인은 과속이에요.”라는 말을 들었습니다. 다시 확인하는 가장 알맞은 표현은 무엇이에요?',
    [
      '사고 원인이 과속이라고요?',
      '사고 원인이 과속다고요?',
      '사고 원인이 과속한다고요?',
      '사고 원인이 과속하다가요?',
    ],
    '사고 원인이 과속이라고요?',
    L(
      '`과속`을 명사로 사용하면 `과속이라고요?`예요.',
      '`과속` ot sifatida `과속이라고요?` bo‘ladi.',
      'When 과속 is used as a noun, use 과속이라고요?',
      'Когда 과속 используется как существительное, форма — 과속이라고요?',
    ),
    ['reported-speech', 'noun', 'speeding'],
  ),

  s5u8_250_fill_in_blank: grammarFillBlank(
    '사고 원인이 과속___?',
    ['이라고요'],
    ['이라고요', '라고요', '다고요', '는다고요', '다가요'],
    L(
      '`과속`은 받침이 있으므로 `과속이라고요?`라고 해요.',
      '`과속` undosh bilan tugagani uchun `과속이라고요?`.',
      '과속 ends in a consonant, so use 과속이라고요?',
      '과속 оканчивается на согласную, поэтому используется 과속이라고요?',
    ),
    ['reported-speech', 'noun-form'],
  ),

  s5u8_251_type_answer: grammarTypeAnswer(
    '사고 원인이 과속이라고요?',
    L(
      '사고의 원인이 과속이라는 말을 다시 확인하세요.',
      'Avariya sababi tezlikni oshirish ekanini qayta aniqlashtiring.',
      'Confirm that speeding was the cause of the accident.',
      'Переспросите, правда ли причиной аварии было превышение скорости.',
    ),
    'The speaker confirms that speeding was the cause of the accident.',
    ['과속이라고요'],
    ['reported-speech', 'noun', 'type-answer'],
  ),

  s5u8_252_translate_builder: grammarTranslateBuilder(
    L(
      '사고 원인이 음주 운전이라는 말을 다시 확인하기',
      'Avariya sababi mast holda haydash ekanini qayta so‘rang.',
      'Confirm that drunk driving was the cause of the accident.',
      'Уточните, правда ли причиной аварии было вождение в нетрезвом виде.',
    ),
    [
      '사고 원인이',
      '음주 운전이라고요?',
      '음주 운전한다고요?',
      '위험하다고요?',
      '퇴원했다고요?',
      '문병을 간다고요?',
    ],
    '사고 원인이 음주 운전이라고요?',
    L(
      '`음주 운전`은 여기서 사고 원인을 나타내는 명사예요.',
      '`음주 운전` bu yerda avariya sababini bildiruvchi ot.',
      'Here 음주 운전 functions as a noun naming the accident cause.',
      'Здесь 음주 운전 — существительное, обозначающее причину аварии.',
    ),
    ['reported-speech', 'noun', 'drunk-driving'],
  ),

  s5u8_253_cloze_passage: grammarClozePassage(
    '사고가 난 곳이 ___? 사고 원인이 ___?',
    ['교차로라고요', '과속이라고요'],
    [
      '과속이라고요',
      '교차로라고요',
      '교차로이라고요',
      '과속한다고요',
      '위험하다고요',
      '입원했다고요',
    ],
    L(
      '받침 유무에 따라 `라고요`와 `이라고요`를 구별해요.',
      'Oxirgi undoshga qarab `라고요` va `이라고요` farqlanadi.',
      'Distinguish 라고요 and 이라고요 based on the noun ending.',
      'Различаем 라고요 и 이라고요 в зависимости от конечной согласной.',
    ),
    ['reported-speech', 'noun'],
  ),

  s5u8_254_word_arrange: grammarWordArrange(
    [
      '과속이라고요?',
      '사고 원인이',
      '과속한다고요?',
      '위험하다고요?',
      '사고를 냈다고요?',
      '교차로라고요?',
    ],
    '사고 원인이 과속이라고요?',
    L(
      '명사로 원인을 설명한 내용을 다시 확인해요.',
      'Sabab ot bilan ifodalangan xabar qayta aniqlashtiriladi.',
      'Confirm information where the cause is expressed as a noun.',
      'Уточняется информация, где причина выражена существительным.',
    ),
    ['reported-speech', 'noun'],
  ),

  s5u8_255_type_answer: grammarTypeAnswer(
    '사고 원인이 음주 운전이라고요?',
    L(
      '사고의 원인이 음주 운전이었다는 말을 다시 확인하세요.',
      'Avariya sababi mast holda haydash bo‘lganini qayta aniqlashtiring.',
      'Confirm that drunk driving was the cause of the accident.',
      'Переспросите, правда ли причиной аварии было вождение в нетрезвом виде.',
    ),
    'The speaker confirms that drunk driving was the accident cause.',
    ['음주 운전이라고요'],
    ['reported-speech', 'noun', 'type-answer'],
  ),

  s5u8_257_translate_builder: grammarTranslateBuilder(
    L(
      '사고가 난 곳이 교차로이고 원인이 과속이라는 말을 차례로 확인하기',
      'Avariya joyi chorraha va sababi tezlik ekanini ketma-ket aniqlashtiring.',
      'Confirm that the accident location was an intersection and the cause was speeding.',
      'Уточните, что место аварии — перекрёсток, а причина — превышение скорости.',
    ),
    [
      '사고가 난 곳이 교차로라고요?',
      '사고 원인은 과속이라고요?',
      '사고 원인은 과속한다고요?',
      '교차로가 위험하다고요?',
      '친구가 퇴원한다고요?',
      '사고를 냈다고요?',
    ],
    '사고가 난 곳이 교차로라고요? 사고 원인은 과속이라고요?',
    L(
      '사고 장소와 원인처럼 핵심 정보를 정확하게 다시 확인할 수 있어요.',
      'Avariya joyi va sababi kabi muhim ma’lumot aniq qayta so‘raladi.',
      'Important accident details such as location and cause can be confirmed precisely.',
      'Можно точно уточнять ключевые данные аварии: место и причину.',
    ),
    ['reported-speech', 'noun', 'accident-news'],
  ),

  s5u8_258_fill_in_blank: grammarFillBlank(
    '친구가 입원한 곳이 대학병원___?',
    ['이라고요'],
    ['이라고요', '라고요', '한다고요', '다고요', '다가요'],
    L(
      '`대학병원`은 받침 있는 명사예요.',
      '`대학병원` undosh bilan tugagan ot.',
      '대학병원 is a consonant-ending noun.',
      '대학병원 — существительное с конечной согласной.',
    ),
    ['reported-speech', 'noun-form'],
  ),

  s5u8_259_error_hunt: grammarErrorHunt(
    '사고가 난 곳이 교차로이라고요?',
    '교차로이라고요?',
    ['교차로라고요?', '교차로한다고요?', '교차로다고요?', '교차로다가요?'],
    '교차로라고요?',
    L(
      '`교차로`는 받침이 없으므로 `이라고요`가 아니라 `라고요`를 사용해요.',
      '`교차로` undoshsiz, shuning uchun `이라고요` emas `라고요`.',
      '교차로 has no final consonant, so use 라고요 rather than 이라고요.',
      'У 교차로 нет конечной согласной, поэтому используется 라고요, а не 이라고요.',
    ),
    ['reported-speech', 'noun', 'conjugation'],
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 4 · 다리가 부러졌다고요?
  // 사고 → 부상 → 치료 소식 전달
  // ──────────────────────────────────────────────────────────

  s5u8_261_reading_quiz: grammarReadingQuiz(
    '친구가 “사고 때문에 민수 씨 다리가 부러졌어요.”라고 말했습니다. 놀라서 부상 내용을 다시 확인하려고 합니다.',
    [
      '민수 씨 다리가 부러졌다고요?',
      '민수 씨 다리가 부러진다고요?',
      '민수 씨 다리가 부러짐이라고요?',
      '민수 씨 다리가 부러지다가요?',
    ],
    '민수 씨 다리가 부러졌다고요?',
    L(
      '이미 발생한 부상은 과거형 `부러졌다고요?`로 확인해요.',
      'Bo‘lib o‘tgan jarohat `부러졌다고요?` bilan aniqlashtiriladi.',
      'A completed injury is confirmed with 부러졌다고요?',
      'Уже полученная травма уточняется формой 부러졌다고요?',
    ),
    ['reported-speech', 'injury'],
  ),

  s5u8_262_type_answer: grammarTypeAnswer(
    '사고로 다리가 부러졌다고요?',
    L(
      '사고 때문에 다리가 부러졌다는 말을 다시 확인하세요.',
      'Avariya sabab oyoq singanini qayta aniqlashtiring.',
      'Confirm that a leg was broken in the accident.',
      'Переспросите, правда ли в аварии была сломана нога.',
    ),
    'The speaker confirms that a leg was broken in the accident.',
    ['부러졌다고요'],
    ['reported-speech', 'break-bone', 'type-answer'],
  ),

  s5u8_263_translate_builder: grammarTranslateBuilder(
    L(
      '사고 때문에 다리가 부러졌다는 부상 소식을 확인하기',
      'Avariya sabab oyoq singanini qayta so‘rang.',
      'Confirm the news that a leg was broken in the accident.',
      'Уточните новость о том, что в аварии была сломана нога.',
    ),
    [
      '사고로',
      '다리가 부러졌다고요?',
      '다리가 부러진다고요?',
      '퇴원한다고요?',
      '과속이라고요?',
      '문병을 간다고요?',
    ],
    '사고로 다리가 부러졌다고요?',
    L(
      '사고 결과로 생긴 부상 정보를 확인하는 문장이에요.',
      'Avariya oqibatidagi jarohat haqidagi xabar aniqlashtiriladi.',
      'This confirms information about an injury caused by the accident.',
      'Уточняется информация о травме, полученной в результате аварии.',
    ),
    ['reported-speech', 'break-bone'],
  ),

  s5u8_264_fill_in_blank: grammarFillBlank(
    '사고로 다리가 부러졌___?',
    ['다고요'],
    ['다고요', '는다고요', '라고요', '다가요', '면서요'],
    L(
      '과거형 `부러졌다` 뒤에는 `-다고요`를 붙여요.',
      'O‘tgan `부러졌다`dan keyin `-다고요` qo‘shiladi.',
      'The past form 부러졌다 takes -다고요.',
      'После прошедшей формы 부러졌다 используется -다고요.',
    ),
    ['reported-speech', 'past-form'],
  ),

  s5u8_265_word_arrange: grammarWordArrange(
    [
      '깁스를 했다고요?',
      '다리가 부러져서',
      '퇴원한다고요?',
      '과속이라고요?',
      '병원이라고요?',
      '신호를 어겼다고요?',
    ],
    '다리가 부러져서 깁스를 했다고요?',
    L(
      '부상과 치료 내용을 한 문장으로 다시 확인해요.',
      'Jarohat va davolanish bir gapda aniqlashtiriladi.',
      'Confirm both the injury and the resulting treatment.',
      'Одновременно уточняются травма и последующее лечение.',
    ),
    ['reported-speech', 'wear-cast'],
  ),

  s5u8_266_type_answer: grammarTypeAnswer(
    '다리가 부러져서 깁스를 했다고요?',
    L(
      '다리가 부러져 깁스를 했다는 말을 다시 확인하세요.',
      'Oyoq sinib, gips qo‘yilganini qayta aniqlashtiring.',
      'Confirm that a cast was needed because the leg was broken.',
      'Переспросите, правда ли из-за перелома ноги наложили гипс.',
    ),
    'The speaker confirms that a cast was applied because the leg was broken.',
    ['깁스를 했다고요'],
    ['reported-speech', 'wear-cast', 'type-answer'],
  ),

  s5u8_267_error_hunt: grammarErrorHunt(
    '다리가 부러져서 깁스를 했는다고요?',
    '했는다고요?',
    ['했다고요?', '한다고요?', '하다가요?', '하면서요?'],
    '했다고요?',
    L(
      '이미 받은 치료이므로 과거형 `했다고요?`가 필요해요.',
      'Davolanish allaqachon bo‘lgan, shuning uchun `했다고요?` kerak.',
      'Because the treatment already happened, use 했다고요?',
      'Поскольку лечение уже произошло, используется 했다고요?',
    ),
    ['reported-speech', 'past', 'conjugation'],
  ),

  s5u8_268_translate_builder: grammarTranslateBuilder(
    L(
      '팔이 부러져 깁스를 했다는 소식을 다시 확인하기',
      'Qo‘l sinib, gips qo‘yilganini qayta so‘rang.',
      'Confirm that someone got a cast after breaking an arm.',
      'Уточните, правда ли после перелома руки наложили гипс.',
    ),
    [
      '팔이 부러져서',
      '깁스를 했다고요?',
      '깁스를 한다고요?',
      '사고 원인이라고요?',
      '문병을 간다고요?',
      '신호를 어겼다고요?',
    ],
    '팔이 부러져서 깁스를 했다고요?',
    L(
      '사고 뒤 치료 내용을 들었을 때 자연스럽게 다시 확인할 수 있어요.',
      'Avariyadan keyingi davolanish xabarini tabiiy tarzda aniqlashtirish mumkin.',
      'This naturally confirms treatment information heard after an accident.',
      'Так естественно уточняют информацию о лечении после аварии.',
    ),
    ['reported-speech', 'wear-cast'],
  ),

  s5u8_269_reading_quiz: grammarReadingQuiz(
    '“상처가 심해서 병원에서 수술했어요.”라는 소식을 들었습니다. 다시 확인하는 문장은 무엇이에요?',
    [
      '병원에서 수술했다고요?',
      '병원에서 수술한다고요?',
      '병원이 수술이라고요?',
      '병원에서 수술하다가요?',
    ],
    '병원에서 수술했다고요?',
    L(
      '이미 끝난 수술이므로 과거형으로 다시 확인해요.',
      'Operatsiya allaqachon bo‘lgan, shuning uchun o‘tgan shakl ishlatiladi.',
      'The surgery already happened, so the past reported form is used.',
      'Операция уже состоялась, поэтому используется форма прошлого времени.',
    ),
    ['reported-speech', 'have-surgery'],
  ),

  s5u8_270_fill_in_blank: grammarFillBlank(
    '병원에서 수술했___?',
    ['다고요'],
    ['다고요', '는다고요', '라고요', '다가요', '면서요'],
    L(
      '`수술했다 → 수술했다고요?`예요.',
      '`수술했다 → 수술했다고요?`.',
      '수술했다 becomes 수술했다고요?',
      '수술했다 превращается в 수술했다고요?',
    ),
    ['reported-speech', 'past-form'],
  ),

  s5u8_271_type_answer: grammarTypeAnswer(
    '상처가 심해서 수술했다고요?',
    L(
      '상처가 심해서 수술을 받았다는 말을 다시 확인하세요.',
      'Yara og‘ir bo‘lgani uchun operatsiya qilinganini qayta aniqlashtiring.',
      'Confirm that surgery was performed because the injury was serious.',
      'Переспросите, правда ли из-за серьёзной травмы понадобилась операция.',
    ),
    'The speaker confirms that surgery was needed because the injury was serious.',
    ['수술했다고요'],
    ['reported-speech', 'have-surgery', 'type-answer'],
  ),

  s5u8_272_translate_builder: grammarTranslateBuilder(
    L(
      '이마가 찢어져 병원에서 상처를 꿰맸다는 말을 확인하기',
      'Peshona yorilib, kasalxonada yara tikilganini qayta so‘rang.',
      'Confirm that a forehead wound was stitched at the hospital.',
      'Уточните, правда ли рассечённый лоб зашили в больнице.',
    ),
    [
      '이마가 찢어져서',
      '병원에서 꿰맸다고요?',
      '병원에서 꿰맨다고요?',
      '퇴원이라고요?',
      '과속했다고요?',
      '문병이라고요?',
    ],
    '이마가 찢어져서 병원에서 꿰맸다고요?',
    L(
      '부상 종류와 치료 방법을 정확하게 확인해요.',
      'Jarohat turi va davolash usuli aniq aniqlashtiriladi.',
      'Confirm both the type of injury and the treatment.',
      'Уточняются и вид травмы, и способ лечения.',
    ),
    ['reported-speech', 'stitch-wound'],
  ),

  s5u8_273_cloze_passage: grammarClozePassage(
    '다리가 ___? 그래서 병원에 ___?',
    ['부러졌다고요', '입원했다고요'],
    [
      '입원했다고요',
      '부러졌다고요',
      '부러진다고요',
      '입원한다고요',
      '병원이라고요',
      '위험하다고요',
    ],
    L(
      '사고 후 부상과 입원 소식을 시간 순서대로 확인해요.',
      'Avariyadan keyingi jarohat va kasalxonaga yotish xabari tartib bilan aniqlashtiriladi.',
      'Confirm the injury and hospitalization in sequence.',
      'Последовательно уточняются травма и госпитализация.',
    ),
    ['reported-speech', 'injury', 'hospital'],
  ),

  s5u8_274_word_arrange: grammarWordArrange(
    [
      '입원했다고요?',
      '교통사고를 당해서',
      '퇴원한다고요?',
      '과속했다고요?',
      '문병이라고요?',
      '신호를 어겼다고요?',
    ],
    '교통사고를 당해서 입원했다고요?',
    L(
      '사고를 당한 결과 병원에 입원했다는 내용을 확인해요.',
      'Avariya oqibatida kasalxonaga yotqizilganini aniqlashtiramiz.',
      'Confirm that hospitalization resulted from the traffic accident.',
      'Уточняется, что госпитализация произошла вследствие ДТП.',
    ),
    ['reported-speech', 'be-hospitalized'],
  ),

  s5u8_275_type_answer: grammarTypeAnswer(
    '교통사고를 당해서 입원했다고요?',
    L(
      '교통사고를 당한 뒤 병원에 입원했다는 말을 다시 확인하세요.',
      'Avariyadan keyin kasalxonaga yotqizilganini qayta aniqlashtiring.',
      'Confirm that someone was hospitalized after a traffic accident.',
      'Переспросите, правда ли после ДТП человека госпитализировали.',
    ),
    'The speaker confirms that someone was hospitalized after a traffic accident.',
    ['입원했다고요'],
    ['reported-speech', 'be-hospitalized', 'type-answer'],
  ),

  s5u8_276_reading_quiz: grammarReadingQuiz(
    '친구가 사고를 당해 일주일 동안 병원에서 치료를 받았습니다. 오늘 상태가 좋아져 집에 간다는 소식을 들었습니다.',
    [
      '오늘 퇴원한다고요?',
      '오늘 퇴원했다고요?',
      '오늘 퇴원이라고요?',
      '오늘 퇴원하다가요?',
    ],
    '오늘 퇴원한다고요?',
    L(
      '아직 앞으로 할 일이라면 현재·미래 동사형 `퇴원한다고요?`를 사용해요.',
      'Hali kelajakdagi ish bo‘lsa `퇴원한다고요?` ishlatiladi.',
      'If the discharge is still upcoming, use the present/future verb form 퇴원한다고요?',
      'Если выписка ещё предстоит, используется 퇴원한다고요?',
    ),
    ['reported-speech', 'leave-hospital'],
  ),

  s5u8_277_translate_builder: grammarTranslateBuilder(
    L(
      '친구가 오늘 병원에서 퇴원한다는 소식을 다시 확인하기',
      'Do‘stingiz bugun kasalxonadan chiqishini qayta so‘rang.',
      'Confirm that your friend is being discharged today.',
      'Уточните, правда ли друга сегодня выписывают.',
    ),
    [
      '친구가',
      '오늘 퇴원한다고요?',
      '어제 퇴원했다고요?',
      '병원이라고요?',
      '수술했다고요?',
      '과속한다고요?',
    ],
    '친구가 오늘 퇴원한다고요?',
    L(
      '완료된 과거 사건과 앞으로 할 행동을 구별해요.',
      'Tugagan o‘tgan hodisa va kelajak harakati farqlanadi.',
      'Distinguish a completed past event from an upcoming action.',
      'Различаем завершённое прошлое событие и предстоящее действие.',
    ),
    ['reported-speech', 'leave-hospital'],
  ),

  s5u8_279_error_hunt: grammarErrorHunt(
    '친구가 오늘 퇴원하다고요?',
    '퇴원하다고요?',
    ['퇴원한다고요?', '퇴원했다고요?', '퇴원이라고요?', '퇴원하다가요?'],
    '퇴원한다고요?',
    L(
      '현재·미래의 행동 동사에는 `-ㄴ다고/는다고요`를 사용해요.',
      'Hozirgi/kelajak fe’lga `-ㄴ다고/는다고요` ishlatiladi.',
      'Present/future action verbs take -ㄴ다고/는다고요.',
      'Для глаголов настоящего/будущего используется -ㄴ다고/는다고요.',
    ),
    ['reported-speech', 'conjugation'],
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 5 · 사고 소식을 정확히 확인해요
  // A / V / N + 시제 통합
  // ──────────────────────────────────────────────────────────

  s5u8_281_reading_quiz: grammarReadingQuiz(
    '소식을 들었습니다. “지수 씨가 어제 눈길에 미끄러져서 다리가 부러졌고 지금 병원에 입원해 있어요. 내일 수술할 예정이에요.” 가장 먼저 과거 사고 사실을 확인하는 문장은 무엇이에요?',
    [
      '지수 씨가 눈길에 미끄러졌다고요?',
      '지수 씨가 내일 수술한다고요?',
      '지수 씨가 병원이라고요?',
      '눈길이 위험하다고요?',
    ],
    '지수 씨가 눈길에 미끄러졌다고요?',
    L(
      '여러 정보 중 먼저 이미 발생한 사고 사실을 골라 확인해요.',
      'Bir nechta ma’lumotdan avval sodir bo‘lgan hodisa aniqlashtiriladi.',
      'Identify and confirm the already completed accident event.',
      'Из нескольких сведений сначала уточняется уже произошедшее событие.',
    ),
    ['reported-speech', 'integration'],
  ),

  s5u8_282_type_answer: grammarTypeAnswer(
    '지수 씨가 눈길에 미끄러졌다고요?',
    L(
      '지수 씨가 눈길에서 미끄러졌다는 사고 소식을 다시 확인하세요.',
      'Jisu qorli yo‘lda sirpanib ketganini qayta aniqlashtiring.',
      'Confirm that Jisu slipped on a snowy road.',
      'Переспросите, правда ли Джису поскользнулась на заснеженной дороге.',
    ),
    'The speaker confirms that Jisu slipped on a snowy road.',
    ['미끄러졌다고요'],
    ['reported-speech', 'slip', 'type-answer'],
  ),

  s5u8_283_translate_builder: grammarTranslateBuilder(
    L(
      '지수 씨가 눈길에 미끄러졌다는 사고 소식을 확인하기',
      'Jisu qorli yo‘lda sirpanib ketganini qayta so‘rang.',
      'Confirm that Jisu slipped on the snowy road.',
      'Уточните, правда ли Джису поскользнулась на заснеженной дороге.',
    ),
    [
      '지수 씨가',
      '눈길에 미끄러졌다고요?',
      '눈길이 미끄럽다고요?',
      '내일 수술한다고요?',
      '병원이라고요?',
      '과속이라고요?',
    ],
    '지수 씨가 눈길에 미끄러졌다고요?',
    L(
      '과거 행동과 현재 상태를 섞지 않고 정확하게 구별해요.',
      'O‘tgan harakat va hozirgi holat aralashtirilmaydi.',
      'Keep the past event distinct from current-state information.',
      'Чётко отличаем событие прошлого от текущего состояния.',
    ),
    ['reported-speech', 'slip'],
  ),

  s5u8_284_fill_in_blank: grammarFillBlank(
    '지수 씨가 눈길에 미끄러졌___?',
    ['다고요'],
    ['다고요', '는다고요', '라고요', '다가요', '면서요'],
    L(
      '이미 일어난 사건이므로 과거 인용형을 사용해요.',
      'Hodisa allaqachon bo‘lgan, shuning uchun o‘tgan shakl ishlatiladi.',
      'Use the past reported form because the event already happened.',
      'Используется форма прошлого времени, поскольку событие уже произошло.',
    ),
    ['reported-speech', 'past-form'],
  ),

  s5u8_285_word_arrange: grammarWordArrange(
    [
      '다리가 부러졌다고요?',
      '미끄러져서',
      '눈길에',
      '내일 수술한다고요?',
      '병원이라고요?',
      '위험하다고요?',
    ],
    '눈길에 미끄러져서 다리가 부러졌다고요?',
    L(
      '사고 발생과 부상 결과를 함께 확인해요.',
      'Hodisa va jarohat natijasi birga aniqlashtiriladi.',
      'Confirm both the accident event and the resulting injury.',
      'Одновременно уточняются происшествие и полученная травма.',
    ),
    ['reported-speech', 'injury'],
  ),

  s5u8_286_type_answer: grammarTypeAnswer(
    '눈길에 미끄러져서 다리가 부러졌다고요?',
    L(
      '눈길에 미끄러진 결과 다리가 부러졌다는 말을 다시 확인하세요.',
      'Qorli yo‘lda sirpanib, oyoq singanini qayta aniqlashtiring.',
      'Confirm that a leg was broken after slipping on a snowy road.',
      'Переспросите, правда ли нога была сломана после падения на снегу.',
    ),
    'The speaker confirms that the person broke a leg after slipping on a snowy road.',
    ['부러졌다고요'],
    ['reported-speech', 'injury', 'type-answer'],
  ),

  s5u8_287_error_hunt: grammarErrorHunt(
    '눈길이 아주 미끄러운다고요?',
    '미끄러운다고요?',
    ['미끄럽다고요?', '미끄러진다고요?', '미끄럼이라고요?', '미끄러지다가요?'],
    '미끄럽다고요?',
    L(
      '`미끄럽다`는 형용사이므로 `미끄럽다고요?`가 맞아요.',
      '`미끄럽다` sifat, shuning uchun `미끄럽다고요?` to‘g‘ri.',
      '미끄럽다 is an adjective, so 미끄럽다고요? is correct.',
      '미끄럽다 — прилагательное, поэтому правильно 미끄럽다고요?',
    ),
    ['reported-speech', 'adjective', 'conjugation'],
  ),

  s5u8_288_translate_builder: grammarTranslateBuilder(
    L(
      '눈길이 매우 미끄럽다는 현재 상태를 확인하기',
      'Qorli yo‘l juda sirpanchiq ekanini qayta aniqlashtiring.',
      'Confirm the current information that the snowy road is very slippery.',
      'Уточните текущую информацию о том, что заснеженная дорога очень скользкая.',
    ),
    [
      '눈길이',
      '아주 미끄럽다고요?',
      '미끄러졌다고요?',
      '과속이라고요?',
      '수술한다고요?',
      '입원했다고요?',
    ],
    '눈길이 아주 미끄럽다고요?',
    L(
      '사고 사건이 아니라 도로 상태를 설명하므로 형용사형을 사용해요.',
      'Bu hodisa emas, yo‘l holati, shuning uchun sifat shakli ishlatiladi.',
      'This describes road condition rather than an event, so use the adjective form.',
      'Описывается состояние дороги, а не событие, поэтому используется форма прилагательного.',
    ),
    ['reported-speech', 'adjective', 'safety'],
  ),

  s5u8_289_reading_quiz: grammarReadingQuiz(
    '“지수 씨는 지금 서울병원에 입원해 있고 내일 수술해요.”라는 말을 들었습니다. 내일 예정된 행동을 확인하려면 무엇이라고 해야 해요?',
    [
      '내일 수술한다고요?',
      '내일 수술했다고요?',
      '내일 수술이라고요?',
      '내일 수술하다가요?',
    ],
    '내일 수술한다고요?',
    L(
      '아직 하지 않은 예정된 행동이므로 현재·미래 동사형을 사용해요.',
      'Hali bo‘lmagan rejalashtirilgan harakat uchun hozirgi/kelajak fe’l shakli ishlatiladi.',
      'Use the present/future verb form for an action that is still scheduled.',
      'Для ещё не выполненного запланированного действия используется форма настоящего/будущего.',
    ),
    ['reported-speech', 'verb-present', 'hospital'],
  ),

  s5u8_291_type_answer: grammarTypeAnswer(
    '지수 씨가 내일 수술한다고요?',
    L(
      '지수 씨가 내일 수술을 받을 예정이라는 말을 다시 확인하세요.',
      'Jisu ertaga operatsiya qilinishini qayta aniqlashtiring.',
      'Confirm that Jisu is having surgery tomorrow.',
      'Переспросите, правда ли Джису завтра будут оперировать.',
    ),
    'The speaker confirms that Jisu is scheduled for surgery tomorrow.',
    ['수술한다고요'],
    ['reported-speech', 'have-surgery', 'type-answer'],
  ),

  s5u8_292_translate_builder: grammarTranslateBuilder(
    L(
      '지수 씨가 내일 수술한다는 예정 정보를 다시 확인하기',
      'Jisu ertaga operatsiya qilinishini qayta so‘rang.',
      'Confirm that Jisu is having surgery tomorrow.',
      'Уточните, правда ли Джису завтра будут оперировать.',
    ),
    [
      '지수 씨가',
      '내일 수술한다고요?',
      '어제 수술했다고요?',
      '수술이라고요?',
      '위험하다고요?',
      '문병을 갔다고요?',
    ],
    '지수 씨가 내일 수술한다고요?',
    L(
      '시간 표현을 보고 과거인지 예정인지 판단해야 해요.',
      'Vaqt ifodasiga qarab o‘tgan yoki kelajak ekanini aniqlash kerak.',
      'Use the time expression to decide whether the event is past or upcoming.',
      'По указанию времени нужно определить, событие уже произошло или ещё предстоит.',
    ),
    ['reported-speech', 'verb-present'],
  ),

  s5u8_293_cloze_passage: grammarClozePassage(
    '눈길이 아주 ___? 지수 씨가 미끄러져서 다리가 ___? 그리고 내일 ___?',
    ['미끄럽다고요', '부러졌다고요', '수술한다고요'],
    [
      '수술한다고요',
      '미끄럽다고요',
      '부러졌다고요',
      '미끄러졌다고요',
      '병원이라고요',
      '수술했다고요',
    ],
    L(
      '현재 상태, 과거 사건, 미래 행동을 각각 알맞은 형태로 구별해요.',
      'Hozirgi holat, o‘tgan hodisa va kelajak harakati alohida shaklda farqlanadi.',
      'Distinguish a current state, past event, and future action with the correct forms.',
      'Различаем текущее состояние, событие прошлого и будущее действие.',
    ),
    ['reported-speech', 'tense-contrast'],
  ),

  s5u8_294_word_arrange: grammarWordArrange(
    [
      '대학병원이라고요?',
      '입원한 곳이',
      '지수 씨가',
      '위험하다고요?',
      '수술했다고요?',
      '퇴원한다고요?',
    ],
    '지수 씨가 입원한 곳이 대학병원이라고요?',
    L(
      '사고 후 필요한 장소 정보도 명사형으로 정확하게 확인해요.',
      'Avariyadan keyingi joy ma’lumoti ot shakli bilan aniq so‘raladi.',
      'Confirm location information after an accident using the noun form.',
      'Информация о месте после аварии уточняется формой для существительного.',
    ),
    ['reported-speech', 'noun', 'hospital'],
  ),

  s5u8_295_type_answer: grammarTypeAnswer(
    '지수 씨가 입원한 곳이 대학병원이라고요?',
    L(
      '지수 씨가 입원한 병원이 대학병원이라는 말을 다시 확인하세요.',
      'Jisu yotgan kasalxona universitet kasalxonasi ekanini qayta aniqlashtiring.',
      'Confirm that Jisu was admitted to a university hospital.',
      'Переспросите, правда ли Джису лежит в университетской больнице.',
    ),
    'The speaker confirms that Jisu is hospitalized at a university hospital.',
    ['대학병원이라고요'],
    ['reported-speech', 'noun', 'type-answer'],
  ),

  s5u8_297_translate_builder: grammarTranslateBuilder(
    L(
      '친구가 사고를 당했고 다리가 부러졌다는 두 정보를 차례로 확인하기',
      'Do‘stingiz avariyaga uchragani va oyog‘i singanini ketma-ket aniqlashtiring.',
      'Confirm that your friend was in an accident and that their leg was broken.',
      'Уточните, что друг попал в аварию и сломал ногу.',
    ),
    [
      '친구가 사고를 당했다고요?',
      '다리도 부러졌다고요?',
      '내일 과속한다고요?',
      '병원이라고요?',
      '길이 위험하다고요?',
      '신호를 어긴다고요?',
    ],
    '친구가 사고를 당했다고요? 다리도 부러졌다고요?',
    L(
      '사고 사실과 부상 정도를 따로 확인해서 정보를 놓치지 않아요.',
      'Avariya va jarohat darajasi alohida aniqlashtiriladi.',
      'Confirm the accident and injury separately so important details are not missed.',
      'Авария и травма уточняются отдельно, чтобы не пропустить важные детали.',
    ),
    ['reported-speech', 'integration'],
  ),

  s5u8_298_fill_in_blank: grammarFillBlank(
    '친구가 사고를 당했___? 다리도 부러졌___?',
    ['다고요', '다고요'],
    ['다고요', '다고요', '는다고요', '라고요', '다가요', '면서요'],
    L(
      '둘 다 이미 일어난 과거 사건이에요.',
      'Ikkalasi ham bo‘lib o‘tgan hodisa.',
      'Both are completed past events.',
      'Оба события уже произошли в прошлом.',
    ),
    ['reported-speech', 'past'],
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 1 · 아무리 조심해도 사고가 날 수 있어요
  // 핵심 의미
  // ──────────────────────────────────────────────────────────

  s5u8_301_reading_quiz: grammarReadingQuiz(
    '운전자는 제한 속도를 지키고 주변도 잘 살폈습니다. 하지만 다른 차가 갑자기 끼어들면 예상하지 못한 사고가 생길 수도 있습니다.',
    [
      '아무리 조심해도 사고가 날 수 있어요.',
      '조심하다가 사고를 예방했어요.',
      '조심하면서 항상 사고가 나요.',
      '조심했다고 사고를 냈어요.',
    ],
    '아무리 조심해도 사고가 날 수 있어요.',
    L(
      '매우 조심하는 조건에서도 사고 가능성이 완전히 없어지는 것은 아니라는 뜻이에요.',
      'Juda ehtiyot bo‘lsa ham avariya ehtimoli butunlay yo‘qolmasligini bildiradi.',
      'It means that even with great care, the possibility of an accident does not disappear completely.',
      'Это означает, что даже при большой осторожности возможность аварии полностью не исчезает.',
    ),
    ['amuri-ado-eodo', 'traffic-accident'],
  ),

  s5u8_302_type_answer: grammarTypeAnswer(
    '아무리 조심해도 사고가 날 수 있어요',
    L(
      '매우 조심하더라도 사고가 생길 가능성이 있다는 뜻으로 `아무리 -아도/어도`를 사용해 쓰세요.',
      'Juda ehtiyot bo‘lsa ham avariya bo‘lishi mumkinligini `아무리 -아도/어도` bilan yozing.',
      'Using 아무리 -아도/어도, write that an accident can happen no matter how careful you are.',
      'Используя 아무리 -아도/어도, напишите, что авария может произойти, как бы осторожны вы ни были.',
    ),
    'An accident can still happen no matter how careful someone is.',
    ['아무리 조심해도'],
    ['amuri-ado-eodo', 'traffic-accident', 'type-answer'],
  ),

  s5u8_303_translate_builder: grammarTranslateBuilder(
    L(
      '아무리 조심하더라도 사고가 발생할 가능성은 있다고 표현하기',
      'Qanchalik ehtiyot bo‘lsangiz ham avariya bo‘lishi mumkinligini ayting.',
      'Say that an accident can happen no matter how careful you are.',
      'Скажите, что авария может произойти, как бы осторожны вы ни были.',
    ),
    [
      '사고가 날 수 있어요',
      '아무리 조심해도',
      '조심하다가',
      '사고가 절대 안 나요',
      '과속해도',
      '신호를 무시하면',
    ],
    '아무리 조심해도 사고가 날 수 있어요',
    L(
      '`아무리`는 조건이나 정도가 매우 커도 뒤의 결과가 달라지지 않는다는 뜻을 강조해요.',
      '`아무리` shart yoki daraja juda katta bo‘lsa ham natija o‘zgarmasligini ta’kidlaydi.',
      '아무리 emphasizes that the result remains unchanged regardless of degree or condition.',
      '아무리 подчёркивает, что результат не меняется независимо от степени или условия.',
    ),
    ['amuri-ado-eodo', 'traffic-accident'],
  ),

  s5u8_304_fill_in_blank: grammarFillBlank(
    '아무리 조심___ 사고가 날 가능성은 있어요.',
    ['해도'],
    ['해도', '하다가', '하면서', '하려고', '했다고'],
    L(
      '`조심하다`는 `조심해도`로 활용해요.',
      '`조심하다 → 조심해도` bo‘ladi.',
      '조심하다 becomes 조심해도.',
      '조심하다 принимает форму 조심해도.',
    ),
    ['amuri-ado-eodo', 'form'],
  ),

  s5u8_305_word_arrange: grammarWordArrange(
    [
      '예상하지 못한 일이 생길 수 있어요',
      '아무리',
      '조심해도',
      '항상 사고를 내고',
      '과속하면',
      '신호를 어기면',
    ],
    '아무리 조심해도 예상하지 못한 일이 생길 수 있어요',
    L(
      '많이 조심해도 예상하지 못한 상황이 생길 수 있다는 뜻이에요.',
      'Juda ehtiyot bo‘lsa ham kutilmagan vaziyat bo‘lishi mumkin.',
      'Unexpected situations can still arise despite being very careful.',
      'Даже при большой осторожности могут возникнуть непредвиденные ситуации.',
    ),
    ['amuri-ado-eodo', 'safety'],
  ),

  s5u8_306_type_answer: grammarTypeAnswer(
    '아무리 안전하게 운전해도 다른 차 때문에 위험할 수 있어요',
    L(
      '매우 안전하게 운전하더라도 다른 차 때문에 위험할 수 있다고 쓰세요.',
      'Juda xavfsiz haydasangiz ham boshqa mashina sabab xavf bo‘lishi mumkinligini yozing.',
      'Write that no matter how safely you drive, another car can still create danger.',
      'Напишите, что, как бы безопасно вы ни ехали, другая машина всё равно может создать опасность.',
    ),
    'Another vehicle can still create danger no matter how safely the person drives.',
    ['아무리 안전하게 운전해도'],
    ['amuri-ado-eodo', 'safety', 'type-answer'],
  ),

  s5u8_307_error_hunt: grammarErrorHunt(
    '아무리 조심하도 사고가 날 수 있어요.',
    '조심하도',
    ['조심해도', '조심하다가', '조심하면서', '조심하려고'],
    '조심해도',
    L(
      '`하다` 동사는 `하여도 → 해도`로 줄여 써요.',
      '`하다` fe’li `하여도 → 해도` shaklida qisqaradi.',
      '하다 contracts from 하여도 to 해도.',
      'Для 하다 форма 하여도 сокращается до 해도.',
    ),
    ['amuri-ado-eodo', 'conjugation'],
  ),

  s5u8_308_translate_builder: grammarTranslateBuilder(
    L(
      '아무리 안전하게 운전해도 예상하지 못한 위험이 생길 수 있다고 표현하기',
      'Qanchalik xavfsiz haydasangiz ham kutilmagan xavf paydo bo‘lishi mumkinligini ayting.',
      'Say that unexpected danger can arise no matter how safely you drive.',
      'Скажите, что непредвиденная опасность может возникнуть, как бы безопасно вы ни ехали.',
    ),
    [
      '예상하지 못한 위험이 생길 수 있어요',
      '아무리 안전하게 운전해도',
      '위험이 절대 없어요',
      '과속하면서',
      '신호를 어겼다고',
      '운전하다가',
    ],
    '아무리 안전하게 운전해도 예상하지 못한 위험이 생길 수 있어요',
    L(
      '앞의 조건이 강해도 뒤의 가능성이 그대로 남아 있어요.',
      'Oldingi shart kuchli bo‘lsa ham keyingi imkoniyat saqlanadi.',
      'The possibility in the second clause remains even under the strong condition in the first.',
      'Возможность во второй части сохраняется даже при сильном условии в первой.',
    ),
    ['amuri-ado-eodo', 'safety'],
  ),

  s5u8_309_reading_quiz: grammarReadingQuiz(
    '운전자가 길을 잘 알고 있어도 밤에는 시야가 좁아질 수 있습니다. 익숙한 길이라는 이유만으로 방심하면 안 됩니다.',
    [
      '아무리 익숙한 길이어도 방심하면 안 돼요.',
      '익숙한 길이라서 신호를 무시해도 돼요.',
      '익숙한 길을 가다가 항상 안전해요.',
      '익숙한 길이라고 과속해야 해요.',
    ],
    '아무리 익숙한 길이어도 방심하면 안 돼요.',
    L(
      '길에 익숙한 정도가 커도 안전 수칙은 그대로 지켜야 한다는 뜻이에요.',
      'Yo‘l qanchalik tanish bo‘lsa ham xavfsizlik qoidalariga amal qilish kerak.',
      'Even on a very familiar road, safety rules still apply.',
      'Даже на очень знакомой дороге правила безопасности всё равно нужно соблюдать.',
    ),
    ['amuri-ado-eodo', 'safety'],
  ),

  s5u8_310_fill_in_blank: grammarFillBlank(
    '아무리 길을 잘 알___ 주변을 살펴야 해요.',
    ['아도'],
    ['아도', '아서', '다가', '지만', '려고'],
    L(
      '`알다`는 `알아도`가 돼요.',
      '`알다 → 알아도`.',
      '알다 becomes 알아도.',
      '알다 превращается в 알아도.',
    ),
    ['amuri-ado-eodo', 'form'],
  ),

  s5u8_311_type_answer: grammarTypeAnswer(
    '아무리 길을 잘 알아도 신호를 지켜야 해요',
    L(
      '길을 아주 잘 알고 있어도 교통 신호를 지켜야 한다고 쓰세요.',
      'Yo‘lni juda yaxshi bilsangiz ham signalga rioya qilish kerakligini yozing.',
      'Write that you must obey traffic signals no matter how well you know the road.',
      'Напишите, что нужно соблюдать сигналы светофора, как бы хорошо вы ни знали дорогу.',
    ),
    'Traffic signals must be obeyed no matter how well the driver knows the road.',
    ['아무리 길을 잘 알아도'],
    ['amuri-ado-eodo', 'traffic-signal', 'type-answer'],
  ),

  s5u8_312_translate_builder: grammarTranslateBuilder(
    L(
      '길을 아주 잘 알고 있어도 신호는 지켜야 한다고 말하기',
      'Yo‘lni juda yaxshi bilsangiz ham signalga rioya qilish kerakligini ayting.',
      'Say that you must obey the signal no matter how well you know the road.',
      'Скажите, что нужно соблюдать сигнал, как бы хорошо вы ни знали дорогу.',
    ),
    [
      '신호는 지켜야 해요',
      '아무리 길을 잘 알아도',
      '신호를 무시해도 돼요',
      '제한 속도를 넘고',
      '과속한다고요',
      '주변을 안 봐도 돼요',
    ],
    '아무리 길을 잘 알아도 신호는 지켜야 해요',
    L(
      '익숙함이 교통 규칙을 지키지 않아도 되는 이유가 될 수 없어요.',
      'Yo‘lni bilish qoidalarni buzishga sabab bo‘la olmaydi.',
      'Familiarity with the road is not a reason to ignore traffic rules.',
      'Знание дороги не является причиной игнорировать правила.',
    ),
    ['amuri-ado-eodo', 'traffic-signal'],
  ),

  s5u8_313_cloze_passage: grammarClozePassage(
    '아무리 ___ 사고가 날 수 있고, 아무리 길을 잘 ___ 신호를 지켜야 해요.',
    ['조심해도', '알아도'],
    ['알아도', '조심해도', '조심하다가', '알면서', '과속해도', '어겼다고요'],
    L(
      '두 문장 모두 강한 조건에도 뒤의 사실이나 의무가 바뀌지 않아요.',
      'Ikkala gapda ham kuchli shart natija yoki majburiyatni o‘zgartirmaydi.',
      'In both sentences, a strong condition does not change the result or obligation.',
      'В обоих предложениях сильное условие не меняет результат или обязанность.',
    ),
    ['amuri-ado-eodo', 'core-meaning'],
  ),

  s5u8_314_word_arrange: grammarWordArrange(
    [
      '안전벨트는 매야 해요',
      '아무리',
      '가까운 거리여도',
      '과속해도 돼요',
      '신호를 무시하고',
      '주변을 보지 않아도 돼요',
    ],
    '아무리 가까운 거리여도 안전벨트는 매야 해요',
    L(
      '이동 거리가 짧아도 기본 안전 수칙은 바뀌지 않아요.',
      'Masofa qisqa bo‘lsa ham asosiy xavfsizlik qoidasi o‘zgarmaydi.',
      'Basic safety rules do not change even for a short trip.',
      'Основные правила безопасности не меняются даже при короткой поездке.',
    ),
    ['amuri-ado-eodo', 'seatbelt'],
  ),

  s5u8_315_type_answer: grammarTypeAnswer(
    '아무리 가까운 곳에 가도 안전벨트를 매야 해요',
    L(
      '아주 가까운 곳에 가더라도 안전벨트를 착용해야 한다고 쓰세요.',
      'Juda yaqin joyga borsangiz ham xavfsizlik kamarini taqish kerakligini yozing.',
      'Write that you must fasten your seat belt even if you are only going somewhere very close.',
      'Напишите, что ремень нужно пристегнуть, даже если вы едете совсем недалеко.',
    ),
    'A seat belt must be fastened even when travelling only a very short distance.',
    ['아무리 가까운 곳에 가도'],
    ['amuri-ado-eodo', 'seatbelt', 'type-answer'],
  ),

  s5u8_316_reading_quiz: grammarReadingQuiz(
    '집 바로 앞까지 자동차로 이동하더라도 사고 가능성이 없는 것은 아닙니다. 자동차가 움직이기 전에 해야 할 기본 행동은 달라지지 않습니다.',
    [
      '아무리 가까운 곳에 가도 안전벨트를 매야 해요.',
      '가까우면 안전벨트를 풀어야 해요.',
      '가까운 길에서는 신호를 무시해도 돼요.',
      '거리가 짧으면 과속하는 것이 좋아요.',
    ],
    '아무리 가까운 곳에 가도 안전벨트를 매야 해요.',
    L(
      '짧은 이동도 기본 안전 규칙의 예외가 아니에요.',
      'Qisqa safar ham asosiy xavfsizlik qoidalaridan istisno emas.',
      'A short trip is not an exception to basic safety rules.',
      'Короткая поездка не является исключением из основных правил безопасности.',
    ),
    ['amuri-ado-eodo', 'seatbelt'],
  ),

  s5u8_317_translate_builder: grammarTranslateBuilder(
    L(
      '아주 가까운 곳에 가더라도 안전벨트를 착용해야 한다고 표현하기',
      'Juda yaqin joyga borsangiz ham kamar taqish kerakligini ayting.',
      'Say that you must fasten your seat belt even when travelling somewhere very close.',
      'Скажите, что ремень нужно пристегнуть, даже если ехать совсем недалеко.',
    ),
    [
      '안전벨트를 매야 해요',
      '아무리 가까운 곳에 가도',
      '안전벨트를 풀어도 돼요',
      '과속하면서',
      '신호를 어기고',
      '주변을 안 봐도 돼요',
    ],
    '아무리 가까운 곳에 가도 안전벨트를 매야 해요',
    L(
      '거리가 짧다는 조건이 안전벨트 의무를 바꾸지 않아요.',
      'Masofa qisqaligi kamar taqish majburiyatini o‘zgartirmaydi.',
      'A short distance does not change the need to wear a seat belt.',
      'Короткое расстояние не отменяет необходимость ремня.',
    ),
    ['amuri-ado-eodo', 'seatbelt'],
  ),

  s5u8_318_fill_in_blank: grammarFillBlank(
    '아무리 가까운 곳에 가___ 안전벨트를 매야 해요.',
    ['도'],
    ['도', '서', '다가', '지만', '려고'],
    L(
      '`가다 → 가도`로 활용해요.',
      '`가다 → 가도`.',
      '가다 becomes 가도.',
      '가다 превращается в 가도.',
    ),
    ['amuri-ado-eodo', 'form'],
  ),

  s5u8_319_error_hunt: grammarErrorHunt(
    '아무리 길을 잘 알도 신호를 지켜야 해요.',
    '알도',
    ['알아도', '알다가', '알면서', '알려고'],
    '알아도',
    L(
      '`알다`는 `알도`가 아니라 `알아도`로 활용해요.',
      '`알다` `알도` emas, `알아도` bo‘ladi.',
      '알다 becomes 알아도, not 알도.',
      '알다 превращается в 알아도, а не 알도.',
    ),
    ['amuri-ado-eodo', 'conjugation'],
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 2 · 아무리 바빠도 안전이 먼저예요
  // A/V 활용
  // ──────────────────────────────────────────────────────────

  s5u8_321_reading_quiz: grammarReadingQuiz(
    '약속 시간에 늦었더라도 제한 속도를 넘으면 안 됩니다. 시간이 부족하다는 이유가 과속을 정당화할 수는 없습니다.',
    [
      '아무리 늦어도 과속하면 안 돼요.',
      '늦었으니까 과속해야 해요.',
      '늦다가 제한 속도를 지켜요.',
      '늦으면서 사고가 안전해요.',
    ],
    '아무리 늦어도 과속하면 안 돼요.',
    L(
      '아주 늦은 상황이어도 과속 금지는 그대로예요.',
      'Juda kech qolgan bo‘lsangiz ham tezlikni oshirish mumkin emas.',
      'Even when very late, the prohibition on speeding remains.',
      'Даже если вы сильно опаздываете, превышать скорость нельзя.',
    ),
    ['amuri-ado-eodo', 'speeding'],
  ),

  s5u8_322_type_answer: grammarTypeAnswer(
    '아무리 늦어도 과속하면 안 돼요',
    L(
      '아주 많이 늦었더라도 과속하면 안 된다고 쓰세요.',
      'Juda kech qolgan bo‘lsangiz ham tezlikni oshirmaslik kerakligini yozing.',
      'Write that you must not speed no matter how late you are.',
      'Напишите, что нельзя превышать скорость, как бы сильно вы ни опаздывали.',
    ),
    'Speeding is not acceptable no matter how late the person is.',
    ['아무리 늦어도'],
    ['amuri-ado-eodo', 'speeding', 'type-answer'],
  ),

  s5u8_323_translate_builder: grammarTranslateBuilder(
    L(
      '아무리 시간이 부족해도 과속하면 안 된다고 말하기',
      'Vaqt qanchalik kam bo‘lsa ham tezlikni oshirmaslik kerakligini ayting.',
      'Say that you must not speed no matter how little time you have.',
      'Скажите, что нельзя превышать скорость, как бы мало времени ни оставалось.',
    ),
    [
      '과속하면 안 돼요',
      '아무리 시간이 부족해도',
      '과속해야 해요',
      '제한 속도를 넘고',
      '신호를 어겨도 돼요',
      '주변을 안 봐도 돼요',
    ],
    '아무리 시간이 부족해도 과속하면 안 돼요',
    L(
      '시간 부족은 위험 운전의 이유가 될 수 없어요.',
      'Vaqt yetishmasligi xavfli haydashga sabab bo‘la olmaydi.',
      'Lack of time does not justify dangerous driving.',
      'Нехватка времени не оправдывает опасное вождение.',
    ),
    ['amuri-ado-eodo', 'speeding'],
  ),

  s5u8_324_fill_in_blank: grammarFillBlank(
    '아무리 늦___ 제한 속도를 지켜야 해요.',
    ['어도'],
    ['어도', '아서', '다가', '지만', '으려고'],
    L(
      '`늦다 → 늦어도`로 활용해요.',
      '`늦다 → 늦어도`.',
      '늦다 becomes 늦어도.',
      '늦다 превращается в 늦어도.',
    ),
    ['amuri-ado-eodo', 'adjective-form'],
  ),

  s5u8_325_word_arrange: grammarWordArrange(
    [
      '음주 운전을 하면 안 돼요',
      '아무리',
      '집이 가까워도',
      '택시를 타야 하고',
      '과속해도 되고',
      '신호를 무시해도 돼요',
    ],
    '아무리 집이 가까워도 음주 운전을 하면 안 돼요',
    L(
      '집이 가까워도 술을 마셨다면 직접 운전하면 안 돼요.',
      'Uy yaqin bo‘lsa ham ichgan bo‘lsangiz o‘zingiz haydamasligingiz kerak.',
      'Even if home is very close, you must not drive after drinking.',
      'Даже если дом совсем рядом, после алкоголя нельзя вести машину.',
    ),
    ['amuri-ado-eodo', 'drunk-driving'],
  ),

  s5u8_326_type_answer: grammarTypeAnswer(
    '아무리 집이 가까워도 음주 운전을 하면 안 돼요',
    L(
      '집까지 거리가 매우 가까워도 술을 마셨다면 운전하면 안 된다고 쓰세요.',
      'Uy juda yaqin bo‘lsa ham ichganingizdan keyin haydamaslik kerakligini yozing.',
      'Write that drunk driving is not allowed even if home is very close.',
      'Напишите, что нельзя вести машину после алкоголя, даже если дом совсем рядом.',
    ),
    'Drunk driving is not acceptable even when the destination is very close.',
    ['아무리 집이 가까워도'],
    ['amuri-ado-eodo', 'drunk-driving', 'type-answer'],
  ),

  s5u8_327_error_hunt: grammarErrorHunt(
    '아무리 집이 가깝아도 음주 운전을 하면 안 돼요.',
    '가깝아도',
    ['가까워도', '가깝다가', '가까우면서', '가깝지만'],
    '가까워도',
    L(
      '`가깝다`는 ㅂ 불규칙 활용으로 `가까워도`가 돼요.',
      '`가깝다` ㅂ istisno tuslanishi bilan `가까워도` bo‘ladi.',
      '가깝다 is a ㅂ-irregular adjective and becomes 가까워도.',
      '가깝다 — нерегулярное на ㅂ прилагательное, форма — 가까워도.',
    ),
    ['amuri-ado-eodo', 'conjugation'],
  ),

  s5u8_328_translate_builder: grammarTranslateBuilder(
    L(
      '집이 아무리 가까워도 술을 마셨으면 직접 운전하면 안 된다고 표현하기',
      'Uy qanchalik yaqin bo‘lsa ham ichgan bo‘lsangiz o‘zingiz haydamasligingizni ayting.',
      'Say that you must not drive yourself after drinking no matter how close home is.',
      'Скажите, что нельзя самому вести машину после алкоголя, как бы близко ни был дом.',
    ),
    [
      '직접 운전하면 안 돼요',
      '술을 마셨다면',
      '아무리 집이 가까워도',
      '직접 운전해야 해요',
      '과속해도 돼요',
      '제한 속도를 넘어요',
    ],
    '아무리 집이 가까워도 술을 마셨다면 직접 운전하면 안 돼요',
    L(
      '거리보다 안전 기준이 우선이에요.',
      'Masofadan ko‘ra xavfsizlik mezoni ustun.',
      'Safety requirements take priority over distance.',
      'Требования безопасности важнее расстояния.',
    ),
    ['amuri-ado-eodo', 'drunk-driving'],
  ),

  s5u8_329_reading_quiz: grammarReadingQuiz(
    '사고가 자주 나지 않는 조용한 도로라도 신호가 있다면 지켜야 합니다. 다른 차가 보이지 않는다고 규칙을 무시할 수는 없습니다.',
    [
      '아무리 차가 없어도 신호를 지켜야 해요.',
      '차가 없으면 신호를 어겨도 돼요.',
      '차가 없다고 과속해야 해요.',
      '차가 없다가 사고가 안전해요.',
    ],
    '아무리 차가 없어도 신호를 지켜야 해요.',
    L(
      '주변에 차가 거의 없어도 교통 신호의 효력은 그대로예요.',
      'Atrofda mashina deyarli bo‘lmasa ham signalga rioya qilish kerak.',
      'Traffic signals still apply even when almost no cars are present.',
      'Сигналы светофора нужно соблюдать, даже если машин почти нет.',
    ),
    ['amuri-ado-eodo', 'traffic-signal'],
  ),

  s5u8_330_fill_in_blank: grammarFillBlank(
    '아무리 다른 차가 없___ 신호를 지켜야 해요.',
    ['어도'],
    ['어도', '어서', '다가', '지만', '으려고'],
    L(
      '`없다 → 없어도`로 활용해요.',
      '`없다 → 없어도`.',
      '없다 becomes 없어도.',
      '없다 превращается в 없어도.',
    ),
    ['amuri-ado-eodo', 'adjective-form'],
  ),

  s5u8_331_type_answer: grammarTypeAnswer(
    '아무리 차가 없어도 신호를 어기면 안 돼요',
    L(
      '도로에 차가 전혀 없는 것처럼 보여도 신호를 어기면 안 된다고 쓰세요.',
      'Yo‘lda mashina yo‘qdek ko‘rinsa ham signalni buzmaslik kerakligini yozing.',
      'Write that you must not disobey a traffic signal even when there appear to be no cars.',
      'Напишите, что нельзя нарушать сигнал, даже если кажется, что машин нет.',
    ),
    'Traffic signals must not be disobeyed even when there appear to be no other cars.',
    ['아무리 차가 없어도'],
    ['amuri-ado-eodo', 'traffic-signal', 'type-answer'],
  ),

  s5u8_332_translate_builder: grammarTranslateBuilder(
    L(
      '다른 차가 아무리 없어도 교통 신호는 지켜야 한다고 표현하기',
      'Boshqa mashina bo‘lmasa ham signalga rioya qilish kerakligini ayting.',
      'Say that traffic signals must be obeyed no matter how empty the road is.',
      'Скажите, что сигналы нужно соблюдать, какой бы пустой ни была дорога.',
    ),
    [
      '교통 신호는 지켜야 해요',
      '아무리 다른 차가 없어도',
      '신호를 어겨도 돼요',
      '과속하면 안전해요',
      '주변을 볼 필요가 없어요',
      '안전벨트를 풀어요',
    ],
    '아무리 다른 차가 없어도 교통 신호는 지켜야 해요',
    L(
      '다른 차의 유무와 교통 규칙 준수는 별개의 문제예요.',
      'Boshqa mashina bor-yo‘qligi qoidaga rioya qilishni o‘zgartirmaydi.',
      'The presence of other cars does not change the obligation to obey traffic rules.',
      'Наличие других машин не отменяет обязанность соблюдать правила.',
    ),
    ['amuri-ado-eodo', 'traffic-signal'],
  ),

  s5u8_333_cloze_passage: grammarClozePassage(
    '아무리 ___ 과속하면 안 되고, 아무리 집이 ___ 음주 운전을 하면 안 돼요.',
    ['늦어도', '가까워도'],
    ['가까워도', '늦어도', '늦다가', '가깝아도', '과속해도', '운전하다가'],
    L(
      '늦음과 거리 모두 위험 운전의 예외 조건이 될 수 없어요.',
      'Kech qolish ham, masofa ham xavfli haydashga istisno bo‘la olmaydi.',
      'Neither lateness nor distance can justify dangerous driving.',
      'Ни опоздание, ни расстояние не оправдывают опасное вождение.',
    ),
    ['amuri-ado-eodo', 'safety'],
  ),

  s5u8_334_word_arrange: grammarWordArrange(
    [
      '주변을 확인해야 해요',
      '아무리',
      '도로가 한산해도',
      '신호를 무시하고',
      '과속해도 되고',
      '차가 없다고',
    ],
    '아무리 도로가 한산해도 주변을 확인해야 해요',
    L(
      '교통량이 적어도 주변 확인은 필요해요.',
      'Yo‘l bo‘sh bo‘lsa ham atrofni tekshirish kerak.',
      'You still need to check your surroundings even when traffic is light.',
      'Даже при небольшом движении нужно следить за обстановкой.',
    ),
    ['amuri-ado-eodo', 'check-surroundings'],
  ),

  s5u8_335_type_answer: grammarTypeAnswer(
    '아무리 도로가 한산해도 주변을 잘 살펴야 해요',
    L(
      '도로에 차가 거의 없어도 주변을 잘 확인해야 한다고 쓰세요.',
      'Yo‘lda mashina kam bo‘lsa ham atrofni yaxshi tekshirish kerakligini yozing.',
      'Write that you should check your surroundings carefully even when the road is quiet.',
      'Напишите, что нужно внимательно следить за обстановкой, даже если дорога почти пустая.',
    ),
    'The driver must check the surroundings carefully even when traffic is very light.',
    ['아무리 도로가 한산해도'],
    ['amuri-ado-eodo', 'check-surroundings', 'type-answer'],
  ),

  s5u8_336_reading_quiz: grammarReadingQuiz(
    '밤늦게 도로에 차가 거의 보이지 않았습니다. 그래도 운전자는 방향을 바꾸기 전 앞뒤와 옆을 확인했습니다.',
    [
      '아무리 도로가 한산해도 주변을 살펴야 해요.',
      '도로가 한산하면 주변을 볼 필요가 없어요.',
      '차가 없어서 신호도 필요 없어요.',
      '도로가 한산하다고 과속해야 해요.',
    ],
    '아무리 도로가 한산해도 주변을 살펴야 해요.',
    L(
      '교통량이 적은 조건에서도 안전 확인은 계속 필요해요.',
      'Harakat kam bo‘lsa ham xavfsizlik tekshiruvi kerak.',
      'Safety checks remain necessary even with very light traffic.',
      'Проверка безопасности нужна даже при очень слабом движении.',
    ),
    ['amuri-ado-eodo', 'check-surroundings'],
  ),

  s5u8_337_translate_builder: grammarTranslateBuilder(
    L(
      '도로가 아무리 한산하더라도 방향을 바꾸기 전 주변을 확인해야 한다고 말하기',
      'Yo‘l qanchalik bo‘sh bo‘lsa ham yo‘nalishni o‘zgartirishdan oldin atrofni tekshirish kerakligini ayting.',
      'Say that you must check your surroundings before changing direction no matter how quiet the road is.',
      'Скажите, что перед изменением направления нужно осмотреться, какой бы пустой ни была дорога.',
    ),
    [
      '주변을 확인해야 해요',
      '방향을 바꾸기 전에는',
      '아무리 도로가 한산해도',
      '주변을 안 봐도 돼요',
      '신호를 어겨도 돼요',
      '과속해야 해요',
    ],
    '아무리 도로가 한산해도 방향을 바꾸기 전에는 주변을 확인해야 해요',
    L(
      '도로 상황과 무관하게 기본 확인 절차를 지켜야 해요.',
      'Yo‘l holatidan qat’i nazar asosiy tekshiruv bajarilishi kerak.',
      'Basic checks must be followed regardless of road conditions.',
      'Базовую проверку нужно выполнять независимо от дорожной обстановки.',
    ),
    ['amuri-ado-eodo', 'check-surroundings'],
  ),

  s5u8_339_error_hunt: grammarErrorHunt(
    '아무리 늦아도 과속하면 안 돼요.',
    '늦아도',
    ['늦어도', '늦다가', '늦으면서', '늦지만'],
    '늦어도',
    L(
      '`늦다`는 모음 조화에 따라 `늦어도`라고 해요.',
      '`늦다` `늦어도` shaklida tuslanadi.',
      '늦다 takes -어도: 늦어도.',
      '늦다 принимает -어도: 늦어도.',
    ),
    ['amuri-ado-eodo', 'conjugation'],
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 3 · 아무리 아파도 무리하면 안 돼요
  // 사고·부상·치료 상황
  // ──────────────────────────────────────────────────────────

  s5u8_341_reading_quiz: grammarReadingQuiz(
    '사고 뒤 다친 사람이 빨리 일상으로 돌아가고 싶어 합니다. 하지만 아직 통증이 심하고 의사가 충분히 쉬라고 했습니다.',
    [
      '아무리 빨리 회복하고 싶어도 무리하면 안 돼요.',
      '빨리 회복하고 싶어서 무리해야 해요.',
      '회복하다가 병원에 가요.',
      '회복한다고 바로 퇴원해야 해요.',
    ],
    '아무리 빨리 회복하고 싶어도 무리하면 안 돼요.',
    L(
      '회복하고 싶은 마음이 커도 몸 상태를 무시하면 안 된다는 뜻이에요.',
      'Tez tuzalish istagi kuchli bo‘lsa ham tanani zo‘riqtirmaslik kerak.',
      'No matter how much someone wants to recover quickly, they should not overexert themselves.',
      'Как бы сильно человек ни хотел быстрее восстановиться, нельзя перенапрягаться.',
    ),
    ['amuri-ado-eodo', 'injury'],
  ),

  s5u8_342_type_answer: grammarTypeAnswer(
    '아무리 빨리 회복하고 싶어도 무리하면 안 돼요',
    L(
      '빨리 회복하고 싶은 마음이 매우 커도 무리하면 안 된다고 쓰세요.',
      'Tez tuzalishni juda xohlasangiz ham o‘zingizni zo‘riqtirmaslik kerakligini yozing.',
      'Write that you should not overexert yourself no matter how much you want to recover quickly.',
      'Напишите, что нельзя перенапрягаться, как бы сильно ни хотелось быстрее восстановиться.',
    ),
    'The injured person should not overexert themselves despite strongly wanting a quick recovery.',
    ['아무리 빨리 회복하고 싶어도'],
    ['amuri-ado-eodo', 'injury', 'type-answer'],
  ),

  s5u8_343_translate_builder: grammarTranslateBuilder(
    L(
      '아무리 빨리 낫고 싶어도 의사의 지시를 따라야 한다고 표현하기',
      'Qanchalik tez tuzalishni xohlasangiz ham shifokor ko‘rsatmasiga amal qilish kerakligini ayting.',
      'Say that you must follow the doctor’s instructions no matter how much you want to recover quickly.',
      'Скажите, что нужно следовать указаниям врача, как бы сильно ни хотелось быстрее выздороветь.',
    ),
    [
      '의사의 지시를 따라야 해요',
      '아무리 빨리 낫고 싶어도',
      '바로 운전해야 해요',
      '치료를 중단해도 돼요',
      '무리해서 움직여도 돼요',
      '병원을 바로 나가야 해요',
    ],
    '아무리 빨리 낫고 싶어도 의사의 지시를 따라야 해요',
    L(
      '회복 속도보다 안전한 치료가 우선이에요.',
      'Tez tuzalishdan ko‘ra xavfsiz davolanish muhimroq.',
      'Safe treatment takes priority over recovering quickly.',
      'Безопасное лечение важнее скорости восстановления.',
    ),
    ['amuri-ado-eodo', 'treatment'],
  ),

  s5u8_344_fill_in_blank: grammarFillBlank(
    '아무리 빨리 낫고 싶___ 무리하면 안 돼요.',
    ['어도'],
    ['어도', '어서', '다가', '지만', '으려고'],
    L(
      '`싶다 → 싶어도`로 활용해요.',
      '`싶다 → 싶어도`.',
      '싶다 becomes 싶어도.',
      '싶다 превращается в 싶어도.',
    ),
    ['amuri-ado-eodo', 'form'],
  ),

  s5u8_345_word_arrange: grammarWordArrange(
    [
      '운전하면 안 돼요',
      '아무리',
      '급한 일이 있어도',
      '몸이 많이 아프면',
      '과속해야 하고',
      '치료를 그만둬야 해요',
    ],
    '아무리 급한 일이 있어도 몸이 많이 아프면 운전하면 안 돼요',
    L(
      '급한 상황이어도 몸 상태가 좋지 않다면 운전을 피해야 해요.',
      'Shoshilinch ish bo‘lsa ham sog‘liq yomon bo‘lsa haydamaslik kerak.',
      'Even in an urgent situation, driving should be avoided when the person is unwell.',
      'Даже в срочной ситуации нельзя садиться за руль при плохом самочувствии.',
    ),
    ['amuri-ado-eodo', 'safety'],
  ),

  s5u8_346_type_answer: grammarTypeAnswer(
    '아무리 급한 일이 있어도 몸이 아프면 운전하면 안 돼요',
    L(
      '아주 급한 일이 있더라도 몸이 아프면 운전하지 말아야 한다고 쓰세요.',
      'Juda shoshilinch ish bo‘lsa ham sog‘lig‘ingiz yomon bo‘lsa haydamaslik kerakligini yozing.',
      'Write that you should not drive when sick even if something is very urgent.',
      'Напишите, что нельзя вести машину при плохом самочувствии, даже если дело очень срочное.',
    ),
    'A sick person should not drive even when something is very urgent.',
    ['아무리 급한 일이 있어도'],
    ['amuri-ado-eodo', 'safety', 'type-answer'],
  ),

  s5u8_347_error_hunt: grammarErrorHunt(
    '아무리 빨리 낫고 싶아도 무리하면 안 돼요.',
    '싶아도',
    ['싶어도', '싶다가', '싶으면서', '싶지만'],
    '싶어도',
    L(
      '`싶다`는 `싶어도`라고 활용해요.',
      '`싶다 → 싶어도`.',
      '싶다 takes -어도: 싶어도.',
      '싶다 принимает -어도: 싶어도.',
    ),
    ['amuri-ado-eodo', 'conjugation'],
  ),

  s5u8_348_translate_builder: grammarTranslateBuilder(
    L(
      '아무리 급한 일이 있어도 다친 상태에서는 무리해서 움직이면 안 된다고 말하기',
      'Ish qanchalik shoshilinch bo‘lsa ham jarohat bilan o‘zingizni zo‘riqtirmaslik kerakligini ayting.',
      'Say that an injured person should not overexert themselves no matter how urgent something is.',
      'Скажите, что при травме нельзя перенапрягаться, каким бы срочным ни было дело.',
    ),
    [
      '무리해서 움직이면 안 돼요',
      '다친 상태에서는',
      '아무리 급한 일이 있어도',
      '바로 운전해야 해요',
      '치료를 중단해도 돼요',
      '과속해도 돼요',
    ],
    '아무리 급한 일이 있어도 다친 상태에서는 무리해서 움직이면 안 돼요',
    L(
      '상황의 긴급함보다 부상 상태를 먼저 고려해야 해요.',
      'Vaziyatning shoshilinchligidan ko‘ra jarohat holati muhim.',
      'The injury condition should take priority over urgency.',
      'Состояние травмы важнее срочности ситуации.',
    ),
    ['amuri-ado-eodo', 'injury'],
  ),

  s5u8_349_reading_quiz: grammarReadingQuiz(
    '입원한 환자의 상태가 많이 좋아졌습니다. 하지만 아직 검사가 끝나지 않았고 의사가 퇴원해도 된다고 하지 않았습니다.',
    [
      '아무리 상태가 좋아도 마음대로 퇴원하면 안 돼요.',
      '상태가 좋으면 검사를 받지 않아도 돼요.',
      '상태가 좋아서 바로 운전해야 해요.',
      '상태가 좋다고 치료를 중단해야 해요.',
    ],
    '아무리 상태가 좋아도 마음대로 퇴원하면 안 돼요.',
    L(
      '상태가 좋아 보여도 필요한 치료와 확인 절차는 끝내야 해요.',
      'Ahvol yaxshi ko‘rinsa ham davolash va tekshiruv tugashi kerak.',
      'Even when the patient feels much better, necessary treatment and checks should be completed.',
      'Даже при хорошем самочувствии нужно завершить необходимые проверки и лечение.',
    ),
    ['amuri-ado-eodo', 'hospital'],
  ),

  s5u8_350_fill_in_blank: grammarFillBlank(
    '아무리 상태가 좋___ 의사의 확인 없이 퇴원하면 안 돼요.',
    ['아도'],
    ['아도', '아서', '다가', '지만', '으려고'],
    L(
      '`좋다 → 좋아도`로 활용해요.',
      '`좋다 → 좋아도`.',
      '좋다 becomes 좋아도.',
      '좋다 превращается в 좋아도.',
    ),
    ['amuri-ado-eodo', 'adjective-form'],
  ),

  s5u8_351_type_answer: grammarTypeAnswer(
    '아무리 상태가 좋아도 의사의 확인 없이 퇴원하면 안 돼요',
    L(
      '몸 상태가 아주 좋아졌더라도 의사의 확인 없이 퇴원하면 안 된다고 쓰세요.',
      'Ahvol juda yaxshilansa ham shifokor tasdig‘isiz chiqib ketmaslik kerakligini yozing.',
      'Write that you should not leave the hospital without a doctor’s approval no matter how much better you feel.',
      'Напишите, что нельзя выписываться без разрешения врача, как бы хорошо вы себя ни чувствовали.',
    ),
    'The patient should not leave the hospital without medical approval even when feeling much better.',
    ['아무리 상태가 좋아도'],
    ['amuri-ado-eodo', 'leave-hospital', 'type-answer'],
  ),

  s5u8_352_translate_builder: grammarTranslateBuilder(
    L(
      '몸 상태가 아무리 좋아 보여도 필요한 검사는 받아야 한다고 표현하기',
      'Ahvol qanchalik yaxshi ko‘rinsa ham kerakli tekshiruvlardan o‘tish kerakligini ayting.',
      'Say that necessary examinations should still be completed no matter how good the condition looks.',
      'Скажите, что необходимые обследования нужно пройти, как бы хорошо ни выглядело состояние.',
    ),
    [
      '필요한 검사는 받아야 해요',
      '아무리 상태가 좋아 보여도',
      '검사를 취소해도 돼요',
      '치료를 바로 끝내야 해요',
      '퇴원부터 해야 해요',
      '운전해도 괜찮아요',
    ],
    '아무리 상태가 좋아 보여도 필요한 검사는 받아야 해요',
    L(
      '겉으로 좋아 보이는 상태만으로 치료 절차를 생략하면 안 돼요.',
      'Tashqi holat yaxshi ko‘rinsa ham davolash tartibini tashlab yubormaslik kerak.',
      'Necessary medical steps should not be skipped simply because the person appears better.',
      'Нельзя пропускать необходимые медицинские процедуры только потому, что человек выглядит лучше.',
    ),
    ['amuri-ado-eodo', 'treatment'],
  ),

  s5u8_353_cloze_passage: grammarClozePassage(
    '아무리 빨리 ___ 무리하면 안 되고, 아무리 상태가 ___ 필요한 치료는 받아야 해요.',
    ['낫고 싶어도', '좋아도'],
    [
      '좋아도',
      '낫고 싶어도',
      '낫고 싶다가',
      '좋아서',
      '퇴원해도',
      '입원하다가',
    ],
    L(
      '회복 욕구와 현재 상태가 모두 치료 원칙을 바꾸지는 못해요.',
      'Tez tuzalish istagi va yaxshi holat davolash qoidasini o‘zgartirmaydi.',
      'Neither the desire to recover quickly nor feeling better changes basic treatment principles.',
      'Ни желание быстрее выздороветь, ни улучшение состояния не отменяют основные принципы лечения.',
    ),
    ['amuri-ado-eodo', 'treatment'],
  ),

  s5u8_354_word_arrange: grammarWordArrange(
    [
      '치료를 계속 받아야 해요',
      '아무리',
      '불편해도',
      '의사가 필요하다고 하면',
      '마음대로 퇴원하고',
      '검사를 취소해도 돼요',
    ],
    '아무리 불편해도 의사가 필요하다고 하면 치료를 계속 받아야 해요',
    L(
      '치료가 불편해도 필요한 치료는 계속해야 한다는 뜻이에요.',
      'Davolanish noqulay bo‘lsa ham zarur bo‘lsa davom ettirish kerak.',
      'Necessary treatment should continue even when it is uncomfortable.',
      'Необходимое лечение нужно продолжать, даже если оно неудобно.',
    ),
    ['amuri-ado-eodo', 'treatment'],
  ),

  s5u8_355_type_answer: grammarTypeAnswer(
    '아무리 치료가 불편해도 필요한 치료는 받아야 해요',
    L(
      '치료 과정이 매우 불편하더라도 필요한 치료는 받아야 한다고 쓰세요.',
      'Davolanish juda noqulay bo‘lsa ham zarur davolanishni olish kerakligini yozing.',
      'Write that necessary treatment must be received no matter how uncomfortable it is.',
      'Напишите, что необходимое лечение нужно пройти, каким бы неудобным оно ни было.',
    ),
    'Necessary treatment should be received regardless of how uncomfortable it is.',
    ['아무리 치료가 불편해도'],
    ['amuri-ado-eodo', 'treatment', 'type-answer'],
  ),

  s5u8_356_reading_quiz: grammarReadingQuiz(
    '깁스를 한 사람이 답답해서 빨리 풀고 싶어 합니다. 하지만 아직 뼈가 완전히 붙지 않았고 의사가 조금 더 기다리라고 했습니다.',
    [
      '아무리 불편해도 의사의 지시를 따라야 해요.',
      '불편하면 바로 깁스를 풀어도 돼요.',
      '답답하다고 치료를 그만둬야 해요.',
      '깁스를 하다가 바로 운전해야 해요.',
    ],
    '아무리 불편해도 의사의 지시를 따라야 해요.',
    L(
      '불편함이 커도 안전한 치료 원칙은 유지돼요.',
      'Noqulaylik katta bo‘lsa ham xavfsiz davolash qoidasi saqlanadi.',
      'Treatment guidance remains important even when discomfort is significant.',
      'Рекомендации по лечению остаются важными, даже если очень неудобно.',
    ),
    ['amuri-ado-eodo', 'wear-cast'],
  ),

  s5u8_357_translate_builder: grammarTranslateBuilder(
    L(
      '깁스가 아무리 불편해도 의사가 괜찮다고 할 때까지 기다려야 한다고 말하기',
      'Gips qanchalik noqulay bo‘lsa ham shifokor ruxsat berguncha kutish kerakligini ayting.',
      'Say that you should wait until the doctor approves no matter how uncomfortable the cast is.',
      'Скажите, что нужно ждать разрешения врача, каким бы неудобным ни был гипс.',
    ),
    [
      '의사가 괜찮다고 할 때까지 기다려야 해요',
      '아무리 깁스가 불편해도',
      '바로 깁스를 풀어야 해요',
      '치료를 그만둬도 돼요',
      '퇴원부터 해야 해요',
      '운전해도 괜찮아요',
    ],
    '아무리 깁스가 불편해도 의사가 괜찮다고 할 때까지 기다려야 해요',
    L(
      '불편한 정도보다 치료의 안전성이 더 중요해요.',
      'Noqulaylikdan ko‘ra davolash xavfsizligi muhimroq.',
      'Treatment safety matters more than the degree of discomfort.',
      'Безопасность лечения важнее степени неудобства.',
    ),
    ['amuri-ado-eodo', 'wear-cast'],
  ),

  s5u8_359_error_hunt: grammarErrorHunt(
    '아무리 상태가 좋어도 의사의 확인 없이 퇴원하면 안 돼요.',
    '좋어도',
    ['좋아도', '좋다가', '좋으면서', '좋지만'],
    '좋아도',
    L(
      '`좋다`는 `좋아도`라고 활용해요.',
      '`좋다 → 좋아도`.',
      '좋다 takes -아도: 좋아도.',
      '좋다 принимает -아도: 좋아도.',
    ),
    ['amuri-ado-eodo', 'conjugation'],
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 4 · 아무리 비가 와도 vs 비가 오지만
  // 의미 차이와 형태 구별
  // ──────────────────────────────────────────────────────────

  s5u8_361_reading_quiz: grammarReadingQuiz(
    '“비가 많이 오는 정도가 아무리 심해도 약속된 안전교육은 진행합니다.”처럼 정도가 매우 커도 결과가 바뀌지 않음을 강조하고 싶습니다.',
    [
      '아무리 비가 많이 와도 안전교육은 진행해요.',
      '비가 많이 오지만 안전교육은 진행해요.',
      '비가 많이 와서 안전교육을 진행해요.',
      '비가 많이 오다가 안전교육을 진행해요.',
    ],
    '아무리 비가 많이 와도 안전교육은 진행해요.',
    L(
      '단순한 대조보다 조건의 정도가 커도 결과가 변하지 않는다는 점을 강조해요.',
      'Oddiy qarama-qarshilikdan ko‘ra shart kuchli bo‘lsa ham natija o‘zgarmasligi ta’kidlanadi.',
      'This emphasizes that the result remains unchanged regardless of how strong the condition is.',
      'Подчёркивается, что результат не меняется, какой бы сильной ни была ситуация.',
    ),
    ['amuri-ado-eodo', 'grammar-contrast'],
  ),

  s5u8_362_type_answer: grammarTypeAnswer(
    '아무리 비가 많이 와도 제한 속도를 지켜야 해요',
    L(
      '비가 매우 많이 오더라도 제한 속도를 지켜야 한다는 뜻을 강조해서 쓰세요.',
      'Yomg‘ir juda kuchli yog‘sa ham tezlik chekloviga rioya qilish kerakligini ta’kidlab yozing.',
      'Emphasize that the speed limit must be obeyed no matter how heavily it rains.',
      'Подчеркните, что ограничение скорости нужно соблюдать, как бы сильно ни шёл дождь.',
    ),
    'The speed limit must be obeyed regardless of how heavily it rains.',
    ['아무리 비가 많이 와도'],
    ['amuri-ado-eodo', 'speed-limit', 'type-answer'],
  ),

  s5u8_363_translate_builder: grammarTranslateBuilder(
    L(
      '비가 아무리 많이 오더라도 제한 속도를 지켜야 한다고 강조하기',
      'Yomg‘ir qanchalik kuchli yog‘sa ham tezlik chekloviga amal qilishni ta’kidlang.',
      'Emphasize that the speed limit must be obeyed no matter how heavily it rains.',
      'Подчеркните, что ограничение скорости нужно соблюдать, как бы сильно ни шёл дождь.',
    ),
    [
      '제한 속도를 지켜야 해요',
      '아무리 비가 많이 와도',
      '제한 속도를 넘어요',
      '비가 와서 과속해요',
      '신호를 무시해도 돼요',
      '주변을 볼 필요가 없어요',
    ],
    '아무리 비가 많이 와도 제한 속도를 지켜야 해요',
    L(
      '`아무리`가 앞 조건의 강한 정도를 강조해요.',
      '`아무리` oldingi shartning kuchli darajasini ta’kidlaydi.',
      '아무리 emphasizes the extreme degree of the preceding condition.',
      '아무리 подчёркивает высокую степень условия.',
    ),
    ['amuri-ado-eodo', 'speed-limit'],
  ),

  s5u8_365_word_arrange: grammarWordArrange(
    [
      '신호를 지켜야 해요',
      '아무리',
      '도로가 복잡해도',
      '도로가 복잡하지만',
      '신호를 무시하고',
      '과속해야 해요',
    ],
    '아무리 도로가 복잡해도 신호를 지켜야 해요',
    L(
      '복잡함의 정도가 커도 신호 준수 의무는 변하지 않아요.',
      'Yo‘l qanchalik murakkab bo‘lsa ham signalga rioya qilish majburiyati o‘zgarmaydi.',
      'The obligation to obey signals does not change regardless of how complicated traffic is.',
      'Обязанность соблюдать сигналы не меняется, каким бы сложным ни было движение.',
    ),
    ['amuri-ado-eodo', 'traffic-signal'],
  ),

  s5u8_366_type_answer: grammarTypeAnswer(
    '아무리 도로가 복잡해도 신호를 지켜야 해요',
    L(
      '도로 상황이 매우 복잡하더라도 신호를 지켜야 한다고 `아무리`를 사용해 쓰세요.',
      'Yo‘l juda murakkab bo‘lsa ham signalga rioya qilish kerakligini `아무리` bilan yozing.',
      'Using 아무리, write that traffic signals must be obeyed no matter how complicated the road is.',
      'Используя 아무리, напишите, что сигналы нужно соблюдать, какой бы сложной ни была дорожная ситуация.',
    ),
    'Traffic signals must be obeyed regardless of how complicated the road situation is.',
    ['아무리 도로가 복잡해도'],
    ['amuri-ado-eodo', 'traffic-signal', 'type-answer'],
  ),

  s5u8_367_error_hunt: grammarErrorHunt(
    '아무리 도로가 복잡하도 신호를 지켜야 해요.',
    '복잡하도',
    ['복잡해도', '복잡하지만', '복잡하다가', '복잡하면서'],
    '복잡해도',
    L(
      '`복잡하다`는 `복잡해도`로 활용해요.',
      '`복잡하다 → 복잡해도`.',
      '복잡하다 becomes 복잡해도.',
      '복잡하다 превращается в 복잡해도.',
    ),
    ['amuri-ado-eodo', 'conjugation'],
  ),

  s5u8_368_translate_builder: grammarTranslateBuilder(
    L(
      '도로가 아무리 복잡하더라도 신호를 따라야 한다고 표현하기',
      'Yo‘l qanchalik murakkab bo‘lsa ham signalga amal qilish kerakligini ayting.',
      'Say that the signals must be followed no matter how complicated traffic is.',
      'Скажите, что сигналы нужно соблюдать, каким бы сложным ни было движение.',
    ),
    [
      '신호를 따라야 해요',
      '아무리 도로가 복잡해도',
      '신호를 무시해요',
      '과속하면 더 좋아요',
      '주변을 안 봐도 돼요',
      '제한 속도를 넘어요',
    ],
    '아무리 도로가 복잡해도 신호를 따라야 해요',
    L(
      '조건의 정도보다 뒤의 안전 원칙이 더 강하게 유지돼요.',
      'Shart darajasidan qat’i nazar xavfsizlik qoidasi saqlanadi.',
      'The safety principle remains regardless of the degree of the condition.',
      'Правило безопасности сохраняется независимо от степени условия.',
    ),
    ['amuri-ado-eodo', 'traffic-signal'],
  ),

  s5u8_369_reading_quiz: grammarReadingQuiz(
    '두 문장이 있습니다. ① 비가 오지만 운전해요. ② 아무리 비가 많이 와도 제한 속도를 지켜요. 두 번째 문장이 특별히 강조하는 것은 무엇이에요?',
    [
      '비의 정도가 매우 심해도 결과가 바뀌지 않아요.',
      '비가 온 것이 제한 속도의 원인이에요.',
      '두 행동이 동시에 계속돼요.',
      '비가 그친 뒤 제한 속도가 바뀌어요.',
    ],
    '비의 정도가 매우 심해도 결과가 바뀌지 않아요.',
    L(
      '`-지만`은 일반적인 대조가 가능하지만 `아무리 -아도/어도`는 강한 조건에도 결과가 유지됨을 더 강조해요.',
      '`-지만` oddiy qarama-qarshilik, `아무리 -아도/어도` esa kuchli shartda ham natija saqlanishini kuchliroq ta’kidlaydi.',
      '-지만 can mark ordinary contrast, while 아무리 -아도/어도 strongly emphasizes an unchanged result despite an extreme condition.',
      '-지만 выражает обычное противопоставление, а 아무리 -아도/어도 сильнее подчёркивает неизменность результата при крайнем условии.',
    ),
    ['amuri-ado-eodo', 'grammar-contrast'],
  ),

  s5u8_370_fill_in_blank: grammarFillBlank(
    '조건의 정도가 매우 커도 결과가 달라지지 않음을 강조하려면 ___를 함께 쓰는 것이 자연스러워요.',
    ['아무리'],
    ['아무리', '그래서', '때문에', '다가', '먼저'],
    L(
      '`아무리`가 정도의 강함을 강조해요.',
      '`아무리` darajaning kuchliligini ta’kidlaydi.',
      '아무리 emphasizes the extreme degree.',
      '아무리 подчёркивает высокую степень.',
    ),
    ['amuri-ado-eodo', 'meaning'],
  ),

  s5u8_371_type_answer: grammarTypeAnswer(
    '아무리 비가 많이 와도 주변을 잘 살펴야 해요',
    L(
      '비가 매우 많이 오는 상황이어도 주변 확인이 필요하다는 뜻을 강조해 쓰세요.',
      'Yomg‘ir juda kuchli yog‘sa ham atrofni tekshirish kerakligini ta’kidlab yozing.',
      'Write that you must check your surroundings no matter how heavily it rains.',
      'Напишите, что нужно внимательно следить за обстановкой, как бы сильно ни шёл дождь.',
    ),
    'The driver must check the surroundings regardless of how heavily it rains.',
    ['아무리 비가 많이 와도'],
    ['amuri-ado-eodo', 'check-surroundings', 'type-answer'],
  ),

  s5u8_372_translate_builder: grammarTranslateBuilder(
    L(
      '비가 아무리 많이 와도 주변을 잘 확인해야 한다고 표현하기',
      'Yomg‘ir qanchalik kuchli yog‘sa ham atrofni tekshirish kerakligini ayting.',
      'Say that you must check your surroundings no matter how heavily it rains.',
      'Скажите, что нужно следить за обстановкой, как бы сильно ни шёл дождь.',
    ),
    [
      '주변을 잘 확인해야 해요',
      '아무리 비가 많이 와도',
      '앞만 보면 돼요',
      '신호를 무시해도 돼요',
      '과속해야 해요',
      '안전벨트를 풀어요',
    ],
    '아무리 비가 많이 와도 주변을 잘 확인해야 해요',
    L(
      '날씨가 나쁠수록 오히려 안전 확인이 더 중요해질 수 있어요.',
      'Ob-havo yomonlashgan sari xavfsizlik tekshiruvi yanada muhim bo‘lishi mumkin.',
      'Safety checks can become even more important as weather conditions worsen.',
      'При ухудшении погоды проверка безопасности может стать ещё важнее.',
    ),
    ['amuri-ado-eodo', 'check-surroundings'],
  ),

  s5u8_373_cloze_passage: grammarClozePassage(
    '아무리 비가 많이 ___ 제한 속도를 지켜야 하고, 아무리 도로가 ___ 신호를 따라야 해요.',
    ['와도', '복잡해도'],
    ['복잡해도', '와도', '오다가', '복잡하지만', '과속해도', '신호를 어겨도'],
    L(
      '동사와 형용사의 `-아도/어도` 활용을 함께 구별해요.',
      'Fe’l va sifatning `-아도/어도` shakllari birga farqlanadi.',
      'Distinguish -아도/어도 forms for verbs and adjectives.',
      'Различаем формы -아도/어도 после глаголов и прилагательных.',
    ),
    ['amuri-ado-eodo', 'form-contrast'],
  ),

  s5u8_375_type_answer: grammarTypeAnswer(
    '아무리 도로가 익숙해도 방심하면 안 돼요',
    L(
      '도로가 매우 익숙하더라도 방심해서는 안 된다는 뜻으로 쓰세요.',
      'Yo‘l juda tanish bo‘lsa ham beparvo bo‘lmaslik kerakligini yozing.',
      'Write that you must not become careless no matter how familiar the road is.',
      'Напишите, что нельзя терять бдительность, какой бы знакомой ни была дорога.',
    ),
    'The driver must not become careless regardless of how familiar the road is.',
    ['아무리 도로가 익숙해도'],
    ['amuri-ado-eodo', 'safety', 'type-answer'],
  ),

  s5u8_376_reading_quiz: grammarReadingQuiz(
    '매일 다니는 길에서는 위험한 곳을 이미 잘 알고 있다고 생각해서 주의를 덜 기울이기 쉽습니다. 하지만 익숙한 길에서도 다른 차량이나 보행자의 움직임은 달라질 수 있습니다.',
    [
      '아무리 익숙한 길이어도 방심하면 안 돼요.',
      '익숙한 길이면 신호를 보지 않아도 돼요.',
      '익숙한 길에서는 과속하는 것이 안전해요.',
      '익숙하면 주변을 확인하지 않아도 돼요.',
    ],
    '아무리 익숙한 길이어도 방심하면 안 돼요.',
    L(
      '익숙함의 정도가 높아도 예상하지 못한 상황은 생길 수 있어요.',
      'Yo‘l juda tanish bo‘lsa ham kutilmagan vaziyat yuz berishi mumkin.',
      'Unexpected situations can occur even on very familiar roads.',
      'Непредвиденные ситуации возможны даже на очень знакомой дороге.',
    ),
    ['amuri-ado-eodo', 'safety'],
  ),

  s5u8_377_translate_builder: grammarTranslateBuilder(
    L(
      '매일 다니는 익숙한 길이어도 방심하면 안 된다고 강조하기',
      'Har kuni yuradigan tanish yo‘l bo‘lsa ham beparvo bo‘lmaslik kerakligini ta’kidlang.',
      'Emphasize that you must not become careless even on a very familiar road.',
      'Подчеркните, что нельзя терять бдительность даже на хорошо знакомой дороге.',
    ),
    [
      '방심하면 안 돼요',
      '아무리 익숙한 길이어도',
      '신호를 무시해도 돼요',
      '과속해도 안전해요',
      '주변을 볼 필요가 없어요',
      '벨트를 풀어도 돼요',
    ],
    '아무리 익숙한 길이어도 방심하면 안 돼요',
    L(
      '익숙함을 안전의 보장으로 생각하면 안 돼요.',
      'Tanishlikni xavfsizlik kafolati deb o‘ylamaslik kerak.',
      'Familiarity should not be treated as a guarantee of safety.',
      'Знакомая дорога не является гарантией безопасности.',
    ),
    ['amuri-ado-eodo', 'safety'],
  ),

  s5u8_379_error_hunt: grammarErrorHunt(
    '아무리 비가 많이 오도 주변을 잘 살펴야 해요.',
    '오도',
    ['와도', '오다가', '오면서', '오지만'],
    '와도',
    L(
      '`오다`에 `-아도`가 붙으면 `와도`가 돼요.',
      '`오다 + -아도 → 와도`.',
      '오다 + -아도 contracts to 와도.',
      '오다 + -아도 превращается в 와도.',
    ),
    ['amuri-ado-eodo', 'conjugation'],
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 5 · 어떤 상황이어도 안전은 지켜야 해요
  // Unit 8 통합 생산
  // ──────────────────────────────────────────────────────────

  s5u8_381_reading_quiz: grammarReadingQuiz(
    '운전자는 약속 시간에 매우 늦었습니다. 길에는 차도 거의 없었습니다. 그래도 제한 속도를 지키고 신호를 확인했습니다.',
    [
      '아무리 늦고 길이 한산해도 안전 규칙을 지켜야 해요.',
      '늦었으니까 과속하는 것이 좋아요.',
      '차가 없으면 신호를 무시해도 돼요.',
      '길이 한산해서 안전벨트를 풀어야 해요.',
    ],
    '아무리 늦고 길이 한산해도 안전 규칙을 지켜야 해요.',
    L(
      '여러 조건이 함께 있어도 안전 원칙은 변하지 않아요.',
      'Bir nechta shart birga bo‘lsa ham xavfsizlik qoidasi o‘zgarmaydi.',
      'Safety principles remain unchanged even when several conditions occur together.',
      'Правила безопасности не меняются даже при нескольких условиях одновременно.',
    ),
    ['amuri-ado-eodo', 'integration'],
  ),

  s5u8_382_type_answer: grammarTypeAnswer(
    '아무리 늦어도 제한 속도를 지켜야 해요',
    L(
      '시간에 매우 늦었더라도 제한 속도를 지켜야 한다고 쓰세요.',
      'Juda kech qolgan bo‘lsangiz ham tezlik chekloviga rioya qilish kerakligini yozing.',
      'Write that you must obey the speed limit no matter how late you are.',
      'Напишите, что нужно соблюдать ограничение скорости, как бы сильно вы ни опаздывали.',
    ),
    'The speed limit must be obeyed regardless of how late the driver is.',
    ['아무리 늦어도'],
    ['amuri-ado-eodo', 'speed-limit', 'type-answer'],
  ),

  s5u8_383_translate_builder: grammarTranslateBuilder(
    L(
      '아무리 늦었더라도 제한 속도를 넘지 말아야 한다고 표현하기',
      'Qanchalik kech qolgan bo‘lsangiz ham tezlik cheklovidan oshmaslik kerakligini ayting.',
      'Say that you must not exceed the speed limit no matter how late you are.',
      'Скажите, что нельзя превышать ограничение скорости, как бы сильно вы ни опаздывали.',
    ),
    [
      '제한 속도를 넘으면 안 돼요',
      '아무리 늦어도',
      '과속해야 해요',
      '신호를 어겨도 돼요',
      '주변을 무시해도 돼요',
      '안전벨트를 풀어요',
    ],
    '아무리 늦어도 제한 속도를 넘으면 안 돼요',
    L(
      '급한 상황에서도 속도 규칙은 유지돼요.',
      'Shoshilinch vaziyatda ham tezlik qoidasi saqlanadi.',
      'Speed rules remain in force even in urgent situations.',
      'Правила скорости действуют даже в срочной ситуации.',
    ),
    ['amuri-ado-eodo', 'speed-limit'],
  ),

  s5u8_384_fill_in_blank: grammarFillBlank(
    '아무리 늦___ 제한 속도를 넘으면 안 돼요.',
    ['어도'],
    ['어도', '어서', '다가', '지만', '으려고'],
    L(
      '`늦다 → 늦어도`로 활용해요.',
      '`늦다 → 늦어도`.',
      '늦다 becomes 늦어도.',
      '늦다 превращается в 늦어도.',
    ),
    ['amuri-ado-eodo', 'form'],
  ),

  s5u8_385_word_arrange: grammarWordArrange(
    [
      '직접 운전하면 안 돼요',
      '아무리',
      '집이 가까워도',
      '술을 마셨다면',
      '빨리 가야 하니까',
      '과속해도 돼요',
    ],
    '아무리 집이 가까워도 술을 마셨다면 직접 운전하면 안 돼요',
    L(
      '거리와 관계없이 음주 후에는 직접 운전하면 안 돼요.',
      'Masofadan qat’i nazar ichgandan keyin o‘zi haydamaslik kerak.',
      'After drinking, a person must not drive regardless of distance.',
      'После алкоголя нельзя вести машину независимо от расстояния.',
    ),
    ['amuri-ado-eodo', 'drunk-driving'],
  ),

  s5u8_386_type_answer: grammarTypeAnswer(
    '아무리 집이 가까워도 술을 마셨다면 운전하면 안 돼요',
    L(
      '집이 매우 가까운 곳이어도 술을 마셨다면 운전해서는 안 된다고 쓰세요.',
      'Uy juda yaqin bo‘lsa ham ichganingizdan keyin haydamaslik kerakligini yozing.',
      'Write that you must not drive after drinking even when home is very close.',
      'Напишите, что нельзя вести машину после алкоголя, даже если дом совсем рядом.',
    ),
    'A person must not drive after drinking even if home is extremely close.',
    ['아무리 집이 가까워도'],
    ['amuri-ado-eodo', 'drunk-driving', 'type-answer'],
  ),

  s5u8_387_error_hunt: grammarErrorHunt(
    '아무리 집이 가까우도 술을 마셨다면 운전하면 안 돼요.',
    '가까우도',
    ['가까워도', '가깝지만', '가까우면서', '가깝다가'],
    '가까워도',
    L(
      '`가깝다`는 ㅂ 불규칙 활용으로 `가까워도`가 돼요.',
      '`가깝다 → 가까워도` ㅂ istisno tuslanishi.',
      'The ㅂ-irregular adjective 가깝다 becomes 가까워도.',
      'Нерегулярное на ㅂ прилагательное 가깝다 принимает форму 가까워도.',
    ),
    ['amuri-ado-eodo', 'conjugation'],
  ),

  s5u8_388_translate_builder: grammarTranslateBuilder(
    L(
      '집이 아무리 가까워도 술을 마셨으면 택시나 대중교통을 이용해야 한다고 표현하기',
      'Uy qanchalik yaqin bo‘lsa ham ichgan bo‘lsangiz taksi yoki jamoat transportidan foydalanish kerakligini ayting.',
      'Say that you should use a taxi or public transportation after drinking no matter how close home is.',
      'Скажите, что после алкоголя нужно воспользоваться такси или общественным транспортом, как бы близко ни был дом.',
    ),
    [
      '택시나 대중교통을 이용해야 해요',
      '술을 마셨다면',
      '아무리 집이 가까워도',
      '직접 운전해야 해요',
      '과속해서 가야 해요',
      '신호를 무시해도 돼요',
    ],
    '아무리 집이 가까워도 술을 마셨다면 택시나 대중교통을 이용해야 해요',
    L(
      '위험 행동을 피하는 실제 대안을 함께 판단해요.',
      'Xavfli harakatdan qochish uchun amaliy muqobil tanlanadi.',
      'The learner also identifies a practical alternative to dangerous behavior.',
      'Также выбирается практичная безопасная альтернатива опасному поведению.',
    ),
    ['amuri-ado-eodo', 'drunk-driving'],
  ),

  s5u8_389_reading_quiz: grammarReadingQuiz(
    '사고를 당한 친구가 많이 좋아져서 빨리 집에 가고 싶어 합니다. 하지만 아직 의사가 며칠 더 치료를 받아야 한다고 했습니다.',
    [
      '아무리 상태가 좋아도 필요한 치료는 받아야 해요.',
      '상태가 좋아 보이면 바로 퇴원해야 해요.',
      '집에 가고 싶으니까 치료를 그만둬도 돼요.',
      '조금 나아졌다고 바로 운전해도 돼요.',
    ],
    '아무리 상태가 좋아도 필요한 치료는 받아야 해요.',
    L(
      '현재 상태가 많이 좋아졌어도 필요한 치료는 끝내야 해요.',
      'Ahvol ancha yaxshilansa ham zarur davolanish tugashi kerak.',
      'Necessary treatment should be completed even when the condition has greatly improved.',
      'Необходимое лечение нужно завершить, даже если состояние значительно улучшилось.',
    ),
    ['amuri-ado-eodo', 'treatment'],
  ),

  s5u8_390_fill_in_blank: grammarFillBlank(
    '아무리 상태가 좋___ 필요한 치료는 받아야 해요.',
    ['아도'],
    ['아도', '아서', '다가', '지만', '으려고'],
    L(
      '`좋다 → 좋아도`로 활용해요.',
      '`좋다 → 좋아도`.',
      '좋다 becomes 좋아도.',
      '좋다 превращается в 좋아도.',
    ),
    ['amuri-ado-eodo', 'form'],
  ),

  s5u8_391_type_answer: grammarTypeAnswer(
    '아무리 상태가 좋아도 필요한 치료는 받아야 해요',
    L(
      '몸 상태가 아주 좋아졌더라도 필요한 치료는 계속 받아야 한다고 쓰세요.',
      'Ahvol juda yaxshilansa ham zarur davolanishni davom ettirish kerakligini yozing.',
      'Write that necessary treatment should continue no matter how much the condition improves.',
      'Напишите, что необходимое лечение нужно продолжать, как бы сильно ни улучшилось состояние.',
    ),
    'Necessary treatment should continue regardless of how much the condition improves.',
    ['아무리 상태가 좋아도'],
    ['amuri-ado-eodo', 'treatment', 'type-answer'],
  ),

  s5u8_392_translate_builder: grammarTranslateBuilder(
    L(
      '몸이 아무리 좋아져도 의사가 확인하기 전에는 마음대로 퇴원하면 안 된다고 말하기',
      'Ahvol qanchalik yaxshilansa ham shifokor tekshirmaguncha o‘zboshimchalik bilan chiqmaslik kerakligini ayting.',
      'Say that you must not leave the hospital on your own no matter how much better you feel before the doctor checks you.',
      'Скажите, что нельзя самостоятельно выписываться до осмотра врача, как бы хорошо вы себя ни чувствовали.',
    ),
    [
      '마음대로 퇴원하면 안 돼요',
      '의사가 확인하기 전에는',
      '아무리 몸이 좋아져도',
      '바로 운전해야 해요',
      '치료를 중단해도 돼요',
      '검사를 취소해야 해요',
    ],
    '아무리 몸이 좋아져도 의사가 확인하기 전에는 마음대로 퇴원하면 안 돼요',
    L(
      '회복 정도와 퇴원 절차를 구별해서 판단해요.',
      'Tuzalish darajasi va kasalxonadan chiqish tartibi alohida baholanadi.',
      'The degree of recovery and the discharge procedure should be considered separately.',
      'Степень восстановления и процедура выписки — разные вещи.',
    ),
    ['amuri-ado-eodo', 'leave-hospital'],
  ),

  s5u8_393_cloze_passage: grammarClozePassage(
    '아무리 ___ 제한 속도를 지켜야 하고, 아무리 집이 ___ 음주 운전을 하면 안 되고, 아무리 상태가 ___ 필요한 치료는 받아야 해요.',
    ['늦어도', '가까워도', '좋아도'],
    ['좋아도', '가까워도', '늦어도', '과속해도', '위험해도', '입원해도'],
    L(
      '교통안전과 치료 상황에서 같은 문법 원리를 적용해요.',
      'Yo‘l xavfsizligi va davolanishda bir xil grammatika tamoyili qo‘llanadi.',
      'The same grammar principle is applied across traffic-safety and treatment situations.',
      'Один и тот же грамматический принцип применяется и к дорожной безопасности, и к лечению.',
    ),
    ['amuri-ado-eodo', 'integration'],
  ),

  s5u8_394_word_arrange: grammarWordArrange(
    [
      '신호를 지켜야 해요',
      '아무리',
      '길을 잘 알아도',
      '신호를 무시하고',
      '과속해도 되고',
      '주변을 볼 필요가 없어요',
    ],
    '아무리 길을 잘 알아도 신호를 지켜야 해요',
    L(
      '익숙한 상황에서도 기본 규칙을 유지해야 해요.',
      'Tanish vaziyatda ham asosiy qoidaga rioya qilish kerak.',
      'Basic rules remain necessary even in familiar situations.',
      'Основные правила нужно соблюдать даже в знакомой ситуации.',
    ),
    ['amuri-ado-eodo', 'traffic-signal'],
  ),

  s5u8_395_type_answer: grammarTypeAnswer(
    '아무리 길을 잘 알아도 주변을 살펴야 해요',
    L(
      '도로를 아주 잘 알고 있더라도 주변 상황을 확인해야 한다고 쓰세요.',
      'Yo‘lni juda yaxshi bilsangiz ham atrof holatini tekshirish kerakligini yozing.',
      'Write that you must check your surroundings no matter how well you know the road.',
      'Напишите, что нужно следить за обстановкой, как бы хорошо вы ни знали дорогу.',
    ),
    'The driver must check the surroundings regardless of how well they know the road.',
    ['아무리 길을 잘 알아도'],
    ['amuri-ado-eodo', 'check-surroundings', 'type-answer'],
  ),

  s5u8_396_reading_quiz: grammarReadingQuiz(
    '안전 운전에서는 “나는 운전을 잘하니까 괜찮다”라는 생각이 위험할 수 있습니다. 운전 경험이 많아도 교통 규칙과 주변 확인은 계속 필요합니다.',
    [
      '아무리 운전을 잘해도 안전 규칙을 지켜야 해요.',
      '운전을 잘하면 과속해도 괜찮아요.',
      '경험이 많으면 신호를 무시해도 돼요.',
      '운전을 잘한다고 주변을 볼 필요는 없어요.',
    ],
    '아무리 운전을 잘해도 안전 규칙을 지켜야 해요.',
    L(
      '운전 능력의 정도가 높아도 안전 규칙의 예외가 될 수 없어요.',
      'Haydash mahorati yuqori bo‘lsa ham xavfsizlik qoidasidan istisno emas.',
      'Driving skill does not create an exception to safety rules.',
      'Высокое мастерство вождения не освобождает от правил безопасности.',
    ),
    ['amuri-ado-eodo', 'safety'],
  ),

  s5u8_397_translate_builder: grammarTranslateBuilder(
    L(
      '운전을 아무리 잘해도 제한 속도와 신호를 지켜야 한다고 표현하기',
      'Qanchalik yaxshi haydasangiz ham tezlik va signal qoidalariga rioya qilish kerakligini ayting.',
      'Say that you must obey speed limits and signals no matter how well you drive.',
      'Скажите, что нужно соблюдать скорость и сигналы, как бы хорошо вы ни водили.',
    ),
    [
      '제한 속도와 신호를 지켜야 해요',
      '아무리 운전을 잘해도',
      '과속해도 괜찮아요',
      '신호를 무시해도 돼요',
      '주변을 안 봐도 돼요',
      '안전벨트를 풀어도 돼요',
    ],
    '아무리 운전을 잘해도 제한 속도와 신호를 지켜야 해요',
    L(
      '운전 실력과 교통 규칙 준수는 별개의 문제예요.',
      'Haydash mahorati va yo‘l qoidalariga rioya qilish alohida masala.',
      'Driving skill and compliance with traffic rules are separate issues.',
      'Навык вождения и соблюдение правил — разные вещи.',
    ),
    ['amuri-ado-eodo', 'safety'],
  ),

  s5u8_399_error_hunt: grammarErrorHunt(
    '아무리 운전을 잘하도 안전 규칙을 지켜야 해요.',
    '잘하도',
    ['잘해도', '잘하다가', '잘하면서', '잘하지만'],
    '잘해도',
    L(
      '`잘하다`는 `잘해도`로 활용해요.',
      '`잘하다 → 잘해도`.',
      '잘하다 becomes 잘해도.',
      '잘하다 превращается в 잘해도.',
    ),
    ['amuri-ado-eodo', 'conjugation'],
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 1 · 많이 다치지 않아야 할 텐데요
  // 사고 소식을 듣고 걱정·바람 표현하기
  // ──────────────────────────────────────────────────────────

  s5u8_401_reading_quiz: grammarReadingQuiz(
    '친구가 출근길에 교통사고를 당했다는 소식을 들었습니다. 아직 얼마나 다쳤는지는 알 수 없습니다. 친구의 상태를 걱정하고 있습니다.',
    [
      '많이 다치지 않아야 할 텐데요.',
      '많이 다쳐야 해요.',
      '사고를 내야 할 텐데요.',
      '과속해야 할 텐데요.',
    ],
    '많이 다치지 않아야 할 텐데요.',
    L(
      '결과를 아직 모르지만 친구가 크게 다치지 않았기를 바라는 마음이에요.',
      'Natija hali noma’lum, lekin do‘stingiz qattiq jarohatlanmagan bo‘lishini istayapsiz.',
      'The result is still unknown, and the speaker hopes the friend was not badly injured.',
      'Результат пока неизвестен, и говорящий надеется, что друг не получил серьёзных травм.',
    ),
    ['aya-eoya-hal-tende', 'accident', 'concern'],
  ),

  s5u8_402_type_answer: grammarTypeAnswer(
    '많이 다치지 않아야 할 텐데요',
    L(
      '사고를 당한 친구가 크게 다치지 않았기를 걱정하며 바라세요.',
      'Avariyaga uchragan do‘stingiz qattiq jarohatlanmagan bo‘lishini xavotir bilan tilang.',
      'Express the worried hope that your friend was not badly injured.',
      'Выразите надежду и беспокойство, что друг не получил серьёзных травм.',
    ),
    'The speaker hopes with concern that the friend was not badly injured.',
    ['다치지 않아야 할 텐데요'],
    ['aya-eoya-hal-tende', 'injury', 'type-answer'],
  ),

  s5u8_403_translate_builder: grammarTranslateBuilder(
    L(
      '사고를 당한 친구가 크게 다치지 않았기를 걱정하며 말하기',
      'Avariyaga uchragan do‘stingiz qattiq jarohatlanmagan bo‘lishini xavotir bilan ayting.',
      'Express concern and hope that your friend was not badly injured in the accident.',
      'Выразите надежду, что друг не получил серьёзных травм в аварии.',
    ),
    [
      '많이 다치지',
      '사고를 당한 친구가',
      '않아야 할 텐데요',
      '많이 다쳐야 해요',
      '사고를 내야 할 텐데요',
      '과속하지 않아야 해요',
    ],
    '사고를 당한 친구가 많이 다치지 않아야 할 텐데요',
    L(
      '아직 정확한 상태를 모르는 상황에서 걱정과 바람을 함께 나타내요.',
      'Aniq holat noma’lum paytda xavotir va umid birga ifodalanadi.',
      'It combines concern and hope when the exact condition is still unknown.',
      'Выражаются одновременно беспокойство и надежда, когда точное состояние ещё неизвестно.',
    ),
    ['aya-eoya-hal-tende', 'injury'],
  ),

  s5u8_404_fill_in_blank: grammarFillBlank(
    '사고가 너무 크지 ___ 할 텐데요.',
    ['않아야'],
    ['않아야', '않아서', '않다가', '않으면서', '않으려고'],
    L(
      '좋지 않은 결과가 생기지 않기를 바라면 부정형 V-지 않아야 할 텐데요를 사용할 수 있어요.',
      'Yomon natija bo‘lmasligini istashda V-지 않아야 할 텐데요 ishlatilishi mumkin.',
      'The negative form V-지 않아야 할 텐데요 can express hope that an undesirable result does not occur.',
      'Форма V-지 않아야 할 텐데요 может выражать надежду, что нежелательный результат не произойдёт.',
    ),
    ['aya-eoya-hal-tende', 'negative'],
  ),

  s5u8_405_word_arrange: grammarWordArrange(
    [
      '많이 다치지',
      '친구가',
      '사고를 당했는데',
      '사고를 내야 해요',
      '않아야 할 텐데요',
      '과속했다고요',
    ],
    '사고를 당했는데 친구가 많이 다치지 않아야 할 텐데요',
    L(
      '사고 소식을 들은 뒤 아직 모르는 부상 정도를 걱정하는 상황이에요.',
      'Avariya xabaridan keyin jarohat darajasi noma’lum bo‘lgani uchun xavotir bildiriladi.',
      'The speaker is concerned because the extent of the injury is still unknown.',
      'Говорящий беспокоится, потому что степень травмы пока неизвестна.',
    ),
    ['aya-eoya-hal-tende', 'injury'],
  ),

  s5u8_406_type_answer: grammarTypeAnswer(
    '사고가 크지 않아야 할 텐데요',
    L(
      '교통사고가 심각한 사고가 아니기를 걱정하며 바라세요.',
      'Yo‘l hodisasi jiddiy bo‘lmagan bo‘lishini xavotir bilan tilang.',
      'Express the worried hope that the accident is not serious.',
      'Выразите надежду и беспокойство, что авария не очень серьёзная.',
    ),
    'The speaker hopes that the accident is not serious.',
    ['크지 않아야 할 텐데요'],
    ['aya-eoya-hal-tende', 'traffic-accident', 'type-answer'],
  ),

  s5u8_407_error_hunt: grammarErrorHunt(
    '친구가 많이 다치지 않어야 할 텐데요.',
    '않어야',
    ['않아야', '않다가', '않으면서', '않으려고'],
    '않아야',
    L(
      '않다는 않아야로 활용해요.',
      '않다 → 않아야 shaklida tuslanadi.',
      '않다 becomes 않아야.',
      '않다 принимает форму 않아야.',
    ),
    ['aya-eoya-hal-tende', 'conjugation'],
  ),

  s5u8_408_translate_builder: grammarTranslateBuilder(
    L(
      '교통사고가 심각하지 않기를 걱정하며 표현하기',
      'Avariya jiddiy bo‘lmagan bo‘lishini xavotir bilan ayting.',
      'Express the hope that the traffic accident is not serious.',
      'Выразите надежду, что ДТП не очень серьёзное.',
    ),
    [
      '사고가',
      '크지 않아야 할 텐데요',
      '사고를 내야 할 텐데요',
      '과속해야 할 텐데요',
      '크다고요',
      '신호를 어겨야 해요',
    ],
    '사고가 크지 않아야 할 텐데요',
    L(
      '확실한 결과를 말하는 것이 아니라 걱정하면서 바라는 상태를 표현해요.',
      'Bu aniq natija emas, xavotir bilan kutilayotgan holat.',
      'This does not state a confirmed result; it expresses a hoped-for condition with concern.',
      'Это не подтверждённый результат, а желаемое состояние, о котором беспокоятся.',
    ),
    ['aya-eoya-hal-tende', 'concern'],
  ),

  s5u8_409_reading_quiz: grammarReadingQuiz(
    '교통사고로 다친 사람이 오늘 수술을 받습니다. 가족들은 아직 수술 결과를 알 수 없어서 걱정하며 기다리고 있습니다.',
    [
      '수술이 잘돼야 할 텐데요.',
      '수술을 취소해야 해요.',
      '사고를 내야 할 텐데요.',
      '바로 퇴원해야 해요.',
    ],
    '수술이 잘돼야 할 텐데요.',
    L(
      '아직 결과를 알 수 없는 수술이 잘되기를 바라는 표현이에요.',
      'Natijasi hali noma’lum operatsiya yaxshi o‘tishini tilash ifodasi.',
      'This expresses hope that an operation whose result is not yet known goes well.',
      'Это выражение надежды на успешный исход операции, результат которой ещё неизвестен.',
    ),
    ['aya-eoya-hal-tende', 'surgery', 'concern'],
  ),

  s5u8_410_fill_in_blank: grammarFillBlank(
    '오늘 수술이 잘___ 할 텐데요.',
    ['돼야'],
    ['돼야', '돼서', '되다가', '되면서', '되려고'],
    L(
      '잘되다는 잘돼야로 활용해요.',
      '잘되다 → 잘돼야.',
      '잘되다 becomes 잘돼야.',
      '잘되다 принимает форму 잘돼야.',
    ),
    ['aya-eoya-hal-tende', 'conjugation'],
  ),

  s5u8_411_type_answer: grammarTypeAnswer(
    '수술이 잘돼야 할 텐데요',
    L(
      '아직 결과를 모르는 수술이 잘되기를 걱정하며 바라세요.',
      'Natijasi noma’lum operatsiya yaxshi o‘tishini xavotir bilan tilang.',
      'Express the hope that the surgery goes well.',
      'Выразите надежду, что операция пройдёт хорошо.',
    ),
    'The speaker hopes with concern that the surgery goes well.',
    ['잘돼야 할 텐데요'],
    ['aya-eoya-hal-tende', 'surgery', 'type-answer'],
  ),

  s5u8_412_translate_builder: grammarTranslateBuilder(
    L(
      '오늘 예정된 수술이 잘되기를 걱정하며 말하기',
      'Bugungi operatsiya yaxshi o‘tishini xavotir bilan ayting.',
      'Express the worried hope that today’s surgery goes well.',
      'Выразите надежду, что сегодняшняя операция пройдёт хорошо.',
    ),
    [
      '잘돼야 할 텐데요',
      '오늘 수술이',
      '수술했다고요',
      '바로 퇴원해야 해요',
      '사고를 내야 해요',
      '깁스를 풀어야 해요',
    ],
    '오늘 수술이 잘돼야 할 텐데요',
    L(
      '미래 결과에 대한 기대와 걱정을 함께 표현해요.',
      'Kelajakdagi natijaga umid va xavotir birga ifodalanadi.',
      'It expresses both expectation and concern about a future result.',
      'Выражаются одновременно ожидание и беспокойство о будущем результате.',
    ),
    ['aya-eoya-hal-tende', 'surgery'],
  ),

  s5u8_413_cloze_passage: grammarClozePassage(
    '사고가 너무 크지 ___ 할 텐데요. 오늘 수술도 잘___ 할 텐데요.',
    ['않아야', '돼야'],
    ['돼야', '않아야', '않다가', '돼서', '했다고', '한다고'],
    L(
      '사고의 심각성과 수술 결과처럼 아직 확실하지 않은 일을 걱정하며 바라요.',
      'Avariya og‘irligi va operatsiya natijasi kabi hali noma’lum narsalar haqida xavotir va umid bildiriladi.',
      'The speaker expresses concern and hope about uncertain accident severity and surgery results.',
      'Выражаются беспокойство и надежда относительно тяжести аварии и результата операции.',
    ),
    ['aya-eoya-hal-tende', 'concern'],
  ),

  s5u8_414_word_arrange: grammarWordArrange(
    ['친구 상태가', '할 텐데요', '빨리', '좋아져야', '사고를 내야', '과속해야'],
    '친구 상태가 빨리 좋아져야 할 텐데요',
    L(
      '사고 후 친구의 상태가 빨리 좋아지기를 바라는 표현이에요.',
      'Avariyadan keyin do‘stingizning ahvoli tez yaxshilanishini tilash ifodasi.',
      'This expresses hope that the friend’s condition improves quickly after the accident.',
      'Выражается надежда, что после аварии состояние друга быстро улучшится.',
    ),
    ['aya-eoya-hal-tende', 'recovery'],
  ),

  s5u8_415_type_answer: grammarTypeAnswer(
    '친구 상태가 빨리 좋아져야 할 텐데요',
    L(
      '사고를 당한 친구의 상태가 빨리 좋아지기를 걱정하며 바라세요.',
      'Avariyaga uchragan do‘stingizning ahvoli tez yaxshilanishini xavotir bilan tilang.',
      'Express hope that your injured friend’s condition improves quickly.',
      'Выразите надежду, что состояние пострадавшего друга быстро улучшится.',
    ),
    'The speaker hopes that the injured friend’s condition improves quickly.',
    ['좋아져야 할 텐데요'],
    ['aya-eoya-hal-tende', 'recovery', 'type-answer'],
  ),

  s5u8_416_reading_quiz: grammarReadingQuiz(
    '사고를 당한 친구는 아직 병원에 있습니다. 상태가 어떻게 될지는 확실하지 않습니다. 이런 상황에서 할 텐데요가 들어간 표현이 자연스러운 이유는 무엇이에요?',
    [
      '아직 확실하지 않은 결과에 대한 걱정과 바람을 나타내기 때문이에요.',
      '이미 확정된 과거 사실만 전달하기 때문이에요.',
      '두 행동이 동시에 진행됨을 나타내기 때문이에요.',
      '사고의 직접적인 원인을 나타내기 때문이에요.',
    ],
    '아직 확실하지 않은 결과에 대한 걱정과 바람을 나타내기 때문이에요.',
    L(
      '필요하거나 바라는 상태가 실현될지 확실하지 않을 때 걱정이나 기대가 함께 나타날 수 있어요.',
      'Kerakli yoki istalgan holat amalga oshishi noma’lum bo‘lsa, xavotir va umid birga ifodalanishi mumkin.',
      'The form can express concern or expectation when a necessary or desired condition is still uncertain.',
      'Форма может выражать беспокойство или ожидание, когда необходимое или желаемое состояние ещё не определено.',
    ),
    ['aya-eoya-hal-tende', 'meaning'],
  ),

  s5u8_417_translate_builder: grammarTranslateBuilder(
    L(
      '상처가 너무 심하지 않기를 걱정하며 말하기',
      'Jarohat juda og‘ir bo‘lmagan bo‘lishini xavotir bilan ayting.',
      'Express the hope that the injury is not too serious.',
      'Выразите надежду, что травма не слишком серьёзная.',
    ),
    [
      '상처가',
      '심하지 않아야 할 텐데요',
      '심해야 할 텐데요',
      '수술한다고요',
      '바로 퇴원해야 해요',
      '깁스를 했다고요',
    ],
    '상처가 심하지 않아야 할 텐데요',
    L(
      '좋지 않은 상태가 아니기를 바라는 부정형 표현이에요.',
      'Yomon holat bo‘lmasligini tilovchi inkor shakli.',
      'This negative form expresses hope that an undesirable condition is not present.',
      'Отрицательная форма выражает надежду на отсутствие нежелательного состояния.',
    ),
    ['aya-eoya-hal-tende', 'injury', 'negative'],
  ),

  s5u8_418_fill_in_blank: grammarFillBlank(
    '상처가 너무 심하지 ___ 할 텐데요.',
    ['않아야'],
    ['않아야', '않아서', '않다가', '않으면', '않으려고'],
    L(
      '부정형은 지 않아야 할 텐데요로 만들 수 있어요.',
      'Inkor shakli 지 않아야 할 텐데요 bilan tuziladi.',
      'The negative pattern can be formed with 지 않아야 할 텐데요.',
      'Отрицательная форма строится как 지 않아야 할 텐데요.',
    ),
    ['aya-eoya-hal-tende', 'negative'],
  ),

  s5u8_419_error_hunt: grammarErrorHunt(
    '친구 상태가 빨리 좋아지어야 할 텐데요.',
    '좋아지어야',
    ['좋아져야', '좋아지다가', '좋아지면서', '좋아지려고'],
    '좋아져야',
    L(
      '좋아지다에 어야가 붙으면 좋아져야로 줄어들어요.',
      '좋아지다 + 어야 → 좋아져야.',
      '좋아지다 + 어야 contracts to 좋아져야.',
      '좋아지다 + 어야 сокращается до 좋아져야.',
    ),
    ['aya-eoya-hal-tende', 'conjugation'],
  ),

  s5u8_420_word_arrange: grammarWordArrange(
    [
      '빨리 좋아져야',
      '입원한 친구가',
      '할 텐데요',
      '사고를 내야',
      '과속해야',
      '신호를 어겨야',
    ],
    '입원한 친구가 빨리 좋아져야 할 텐데요',
    L(
      '입원 중인 친구의 회복을 바라는 문장이에요.',
      'Kasalxonadagi do‘stning tez tuzalishini tilovchi gap.',
      'This sentence expresses hope for a hospitalized friend’s recovery.',
      'Это предложение выражает надежду на скорое улучшение состояния госпитализированного друга.',
    ),
    ['aya-eoya-hal-tende', 'hospital'],
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 2 · 퇴원하려면 상태가 좋아야 할 텐데요
  // 필요한 조건·예상되는 필요
  // ──────────────────────────────────────────────────────────

  s5u8_421_reading_quiz: grammarReadingQuiz(
    '친구는 내일 병원에서 퇴원하고 싶어 합니다. 하지만 아직 몸 상태가 완전히 좋아진 것은 아닙니다. 내일 퇴원하기 위해 필요한 조건을 예상합니다.',
    [
      '내일 퇴원하려면 상태가 좋아야 할 텐데요.',
      '상태가 나빠야 퇴원할 수 있어요.',
      '퇴원하다가 입원해야 해요.',
      '사고를 당해야 퇴원할 수 있어요.',
    ],
    '내일 퇴원하려면 상태가 좋아야 할 텐데요.',
    L(
      '퇴원을 위해 필요한 조건을 예상하면서 아직 가능한지 걱정하는 표현이에요.',
      'Kasalxonadan chiqish uchun kerakli shartni taxmin qilib, bunga imkon bo‘lishidan xavotir bildiriladi.',
      'It expresses an expected requirement for discharge while showing uncertainty about whether it can be met.',
      'Выражается предполагаемое условие для выписки и беспокойство о том, удастся ли его выполнить.',
    ),
    ['aya-eoya-hal-tende', 'leave-hospital', 'condition'],
  ),

  s5u8_422_type_answer: grammarTypeAnswer(
    '내일 퇴원하려면 상태가 좋아야 할 텐데요',
    L(
      '내일 퇴원하려면 몸 상태가 좋아야 할 것이라고 예상하며 걱정해서 쓰세요.',
      'Ertaga chiqish uchun ahvol yaxshi bo‘lishi kerakligini taxmin va xavotir bilan yozing.',
      'Write that the condition would need to be good in order to be discharged tomorrow.',
      'Напишите, что для завтрашней выписки состояние должно быть достаточно хорошим.',
    ),
    'A good condition is expected to be necessary for discharge tomorrow.',
    ['좋아야 할 텐데요'],
    ['aya-eoya-hal-tende', 'leave-hospital', 'type-answer'],
  ),

  s5u8_423_translate_builder: grammarTranslateBuilder(
    L(
      '내일 퇴원하기 위해서는 상태가 좋아야 할 것이라고 예상하기',
      'Ertaga kasalxonadan chiqish uchun ahvol yaxshi bo‘lishi kerakligini taxmin qiling.',
      'Say that the patient’s condition would need to be good for discharge tomorrow.',
      'Скажите, что для выписки завтра состояние должно быть хорошим.',
    ),
    [
      '상태가 좋아야 할 텐데요',
      '내일 퇴원하려면',
      '상태가 나빠야 해요',
      '사고를 내야 해요',
      '과속해야 할 텐데요',
      '깁스를 해야 퇴원해요',
    ],
    '내일 퇴원하려면 상태가 좋아야 할 텐데요',
    L(
      '앞의 목표를 이루기 위해 필요할 것으로 예상되는 조건을 말해요.',
      'Oldingi maqsad uchun kerak bo‘lishi kutilgan shart aytiladi.',
      'It states a condition expected to be necessary for achieving the preceding goal.',
      'Указывается условие, которое, как ожидается, необходимо для достижения цели.',
    ),
    ['aya-eoya-hal-tende', 'condition'],
  ),

  s5u8_424_fill_in_blank: grammarFillBlank(
    '퇴원하려면 상태가 좋___ 할 텐데요.',
    ['아야'],
    ['아야', '아서', '다가', '지만', '으려고'],
    L(
      '좋다는 좋아야로 활용해요.',
      '좋다 → 좋아야.',
      '좋다 becomes 좋아야.',
      '좋다 превращается в 좋아야.',
    ),
    ['aya-eoya-hal-tende', 'conjugation'],
  ),

  s5u8_425_word_arrange: grammarWordArrange(
    [
      '충분히 좋아져야',
      '다친 곳이',
      '할 텐데요',
      '깁스를 풀려면',
      '더 다쳐야',
      '사고를 내야',
    ],
    '깁스를 풀려면 다친 곳이 충분히 좋아져야 할 텐데요',
    L(
      '깁스를 풀기 전에 다친 곳이 충분히 좋아져야 한다고 예상하는 상황이에요.',
      'Gipsni yechishdan oldin jarohat yetarlicha tuzalishi kerakligi taxmin qilinadi.',
      'The injured area is expected to need sufficient recovery before the cast can be removed.',
      'Предполагается, что перед снятием гипса повреждённое место должно достаточно восстановиться.',
    ),
    ['aya-eoya-hal-tende', 'wear-cast'],
  ),

  s5u8_426_type_answer: grammarTypeAnswer(
    '깁스를 풀려면 다친 곳이 충분히 좋아져야 할 텐데요',
    L(
      '깁스를 풀기 위해서는 다친 곳이 충분히 좋아져야 할 것이라고 쓰세요.',
      'Gipsni yechish uchun jarohatlangan joy yetarlicha tuzalishi kerakligini yozing.',
      'Write that the injured area would need to recover sufficiently before the cast can be removed.',
      'Напишите, что для снятия гипса повреждённое место должно достаточно восстановиться.',
    ),
    'The injured area is expected to need sufficient recovery before the cast can be removed.',
    ['좋아져야 할 텐데요'],
    ['aya-eoya-hal-tende', 'wear-cast', 'type-answer'],
  ),

  s5u8_427_error_hunt: grammarErrorHunt(
    '퇴원하려면 상태가 좋어야 할 텐데요.',
    '좋어야',
    ['좋아야', '좋다가', '좋으면서', '좋지만'],
    '좋아야',
    L(
      '좋다는 좋아야로 활용해요.',
      '좋다 → 좋아야.',
      '좋다 becomes 좋아야.',
      '좋다 принимает форму 좋아야.',
    ),
    ['aya-eoya-hal-tende', 'conjugation'],
  ),

  s5u8_428_translate_builder: grammarTranslateBuilder(
    L(
      '깁스를 풀기 위해 다친 곳이 충분히 좋아져야 한다고 예상하기',
      'Gipsni yechish uchun jarohatlangan joy yetarlicha tuzalishi kerakligini ayting.',
      'Say that the injured area would need to recover enough before removing the cast.',
      'Скажите, что для снятия гипса повреждённое место должно достаточно восстановиться.',
    ),
    [
      '다친 곳이',
      '충분히 좋아져야 할 텐데요',
      '깁스를 풀려면',
      '더 다쳐야 해요',
      '바로 운전해야 해요',
      '치료를 중단해야 해요',
    ],
    '깁스를 풀려면 다친 곳이 충분히 좋아져야 할 텐데요',
    L(
      '목표와 그 목표에 필요한 조건을 연결해요.',
      'Maqsad va unga kerakli shart bog‘lanadi.',
      'It connects a goal with a condition expected to be necessary for it.',
      'Цель связывается с условием, которое предположительно необходимо для неё.',
    ),
    ['aya-eoya-hal-tende', 'condition'],
  ),

  s5u8_429_reading_quiz: grammarReadingQuiz(
    '내일 수술이 예정되어 있습니다. 병원에서는 수술 전에 필요한 검사를 모두 확인해야 합니다. 아직 검사가 다 끝났는지는 모릅니다.',
    [
      '수술 전에 필요한 검사가 끝나야 할 텐데요.',
      '수술 전에 검사를 취소해야 해요.',
      '검사가 끝났다고요?',
      '수술하다가 검사를 해요.',
    ],
    '수술 전에 필요한 검사가 끝나야 할 텐데요.',
    L(
      '수술을 위해 먼저 완료되어야 할 조건을 예상하는 표현이에요.',
      'Operatsiya uchun oldindan bajarilishi kerak bo‘lgan shart taxmin qilinmoqda.',
      'It expresses a condition expected to be completed before surgery.',
      'Выражается условие, которое, как ожидается, должно быть выполнено до операции.',
    ),
    ['aya-eoya-hal-tende', 'surgery', 'condition'],
  ),

  s5u8_430_fill_in_blank: grammarFillBlank(
    '수술 전에 필요한 검사가 끝나___ 할 텐데요.',
    ['야'],
    ['야', '서', '다가', '지만', '려고'],
    L(
      '끝나다는 끝나야로 활용해요.',
      '끝나다 → 끝나야.',
      '끝나다 becomes 끝나야.',
      '끝나다 превращается в 끝나야.',
    ),
    ['aya-eoya-hal-tende', 'form'],
  ),

  s5u8_431_type_answer: grammarTypeAnswer(
    '수술 전에 필요한 검사가 끝나야 할 텐데요',
    L(
      '수술하기 전에 필요한 검사가 완료되어야 할 것이라고 예상해서 쓰세요.',
      'Operatsiyadan oldin kerakli tekshiruvlar tugashi kerakligini yozing.',
      'Write that the necessary examination would need to be completed before surgery.',
      'Напишите, что необходимые обследования должны быть завершены до операции.',
    ),
    'The necessary examination is expected to need completion before surgery.',
    ['끝나야 할 텐데요'],
    ['aya-eoya-hal-tende', 'surgery', 'type-answer'],
  ),

  s5u8_432_translate_builder: grammarTranslateBuilder(
    L(
      '수술 전에 필요한 검사가 끝나 있어야 한다고 예상하기',
      'Operatsiyadan oldin kerakli tekshiruvlar tugagan bo‘lishi kerakligini ayting.',
      'Say that the necessary examination should be completed before surgery.',
      'Скажите, что необходимые обследования должны быть завершены до операции.',
    ),
    [
      '수술 전에',
      '필요한 검사가',
      '끝나야 할 텐데요',
      '검사를 취소해야 해요',
      '바로 퇴원해야 해요',
      '수술했다고요',
    ],
    '수술 전에 필요한 검사가 끝나야 할 텐데요',
    L(
      '앞으로 할 일에 필요한 선행 조건을 예상해요.',
      'Kelajakdagi ish uchun kerakli old shart taxmin qilinadi.',
      'It anticipates a prerequisite for an upcoming event.',
      'Предполагается предварительное условие для предстоящего события.',
    ),
    ['aya-eoya-hal-tende', 'condition'],
  ),

  s5u8_433_cloze_passage: grammarClozePassage(
    '내일 퇴원하려면 상태가 ___ 할 텐데요. 수술 전에는 필요한 검사도 ___ 할 텐데요.',
    ['좋아야', '끝나야'],
    ['끝나야', '좋아야', '나빠야', '취소해야', '좋다고', '끝나다가'],
    L(
      '퇴원과 수술 각각에 필요한 조건을 구별해요.',
      'Kasalxonadan chiqish va operatsiya uchun kerakli shartlar farqlanadi.',
      'Distinguish the conditions needed for discharge and surgery.',
      'Различаем условия, необходимые для выписки и операции.',
    ),
    ['aya-eoya-hal-tende', 'condition'],
  ),

  s5u8_434_word_arrange: grammarWordArrange(
    [
      '입원한 병원을',
      '문병을 가려면',
      '알아야',
      '사고를 내야',
      '할 텐데요',
      '퇴원했다고요',
    ],
    '문병을 가려면 입원한 병원을 알아야 할 텐데요',
    L(
      '친구를 문병하려면 먼저 어느 병원에 있는지 알아야 해요.',
      'Do‘stingizni ko‘rgani borish uchun avval qaysi kasalxonada ekanini bilish kerak.',
      'To visit the friend, you would first need to know which hospital they are in.',
      'Чтобы навестить друга, сначала нужно знать, в какой больнице он находится.',
    ),
    ['aya-eoya-hal-tende', 'visit-sick-person'],
  ),

  s5u8_435_type_answer: grammarTypeAnswer(
    '문병을 가려면 친구가 입원한 병원을 알아야 할 텐데요',
    L(
      '문병을 가기 위해서는 친구가 어느 병원에 입원했는지 알아야 할 것이라고 쓰세요.',
      'Do‘stingizni ko‘rgani borish uchun qaysi kasalxonada ekanini bilish kerakligini yozing.',
      'Write that you would need to know the hospital where your friend was admitted before visiting.',
      'Напишите, что для посещения нужно знать, в какой больнице лежит друг.',
    ),
    'The speaker expects that knowing the hospital is necessary before visiting the friend.',
    ['알아야 할 텐데요'],
    ['aya-eoya-hal-tende', 'visit-sick-person', 'type-answer'],
  ),

  s5u8_436_reading_quiz: grammarReadingQuiz(
    '친구가 교통사고로 입원했다는 소식은 들었지만 어느 병원인지는 듣지 못했습니다. 친구를 문병하려고 합니다.',
    [
      '먼저 친구가 입원한 병원을 알아야 할 텐데요.',
      '먼저 사고를 내야 할 텐데요.',
      '병원을 몰라도 바로 문병을 가야 해요.',
      '친구가 과속해야 할 텐데요.',
    ],
    '먼저 친구가 입원한 병원을 알아야 할 텐데요.',
    L(
      '문병이라는 계획을 실행하기 전에 필요한 정보가 아직 없어요.',
      'Do‘stni ko‘rgani borish rejasi uchun kerakli ma’lumot hali yo‘q.',
      'Information needed for the planned hospital visit is still missing.',
      'Для запланированного посещения больницы пока не хватает необходимой информации.',
    ),
    ['aya-eoya-hal-tende', 'visit-sick-person'],
  ),

  s5u8_437_translate_builder: grammarTranslateBuilder(
    L(
      '문병을 가려면 친구가 어느 병원에 있는지 먼저 알아야 한다고 말하기',
      'Do‘stingizni ko‘rgani borish uchun avval qaysi kasalxonada ekanini bilish kerakligini ayting.',
      'Say that you would need to know which hospital your friend is in before visiting.',
      'Скажите, что перед посещением нужно узнать, в какой больнице находится друг.',
    ),
    [
      '먼저 알아야 할 텐데요',
      '문병을 가려면',
      '친구가 어느 병원에 있는지',
      '사고를 내야 해요',
      '과속해야 해요',
      '퇴원했다고요',
    ],
    '문병을 가려면 친구가 어느 병원에 있는지 먼저 알아야 할 텐데요',
    L(
      '계획을 실행하기 전에 필요한 정보를 예상하는 상황이에요.',
      'Rejani bajarishdan oldin kerakli ma’lumot taxmin qilinmoqda.',
      'It expresses information expected to be necessary before carrying out a plan.',
      'Выражается информация, которая, как ожидается, нужна до выполнения плана.',
    ),
    ['aya-eoya-hal-tende', 'visit-sick-person'],
  ),

  s5u8_438_fill_in_blank: grammarFillBlank(
    '문병을 가려면 어느 병원인지 알___ 할 텐데요.',
    ['아야'],
    ['아야', '아서', '다가', '지만', '려고'],
    L(
      '알다는 알아야로 활용해요.',
      '알다 → 알아야.',
      '알다 becomes 알아야.',
      '알다 превращается в 알아야.',
    ),
    ['aya-eoya-hal-tende', 'form'],
  ),

  s5u8_439_error_hunt: grammarErrorHunt(
    '문병을 가려면 어느 병원인지 알어야 할 텐데요.',
    '알어야',
    ['알아야', '알다가', '알면서', '알려고'],
    '알아야',
    L(
      '알다는 알아야라고 활용해요.',
      '알다 → 알아야.',
      '알다 takes -아야: 알아야.',
      '알다 принимает -아야: 알아야.',
    ),
    ['aya-eoya-hal-tende', 'conjugation'],
  ),

  s5u8_440_word_arrange: grammarWordArrange(
    [
      '필요한 조건이나 정보를',
      '미리 생각할 수 있어요',
      '앞으로 할 일을 위해',
      '알아야 할 텐데요처럼',
      '사고를 내야 하고',
      '과속해야 해요',
    ],
    '앞으로 할 일을 위해 필요한 조건이나 정보를 알아야 할 텐데요처럼 미리 생각할 수 있어요',
    L(
      '걱정뿐 아니라 앞으로 필요한 일을 예상하는 기능도 익혀요.',
      'Faqat xavotir emas, kelajakda kerak bo‘ladigan ishni taxmin qilish vazifasi ham o‘rganiladi.',
      'The form can anticipate future requirements as well as express concern.',
      'Форма может не только выражать беспокойство, но и предполагать будущую необходимость.',
    ),
    ['aya-eoya-hal-tende', 'lesson-review'],
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 3 · 문병을 가기 전에 연락해야 할 텐데요
  // 교재 말하기 기능: 문병하기
  // ──────────────────────────────────────────────────────────

  s5u8_441_reading_quiz: grammarReadingQuiz(
    '친구가 사고로 입원했다는 소식을 들었습니다. 병원에 바로 찾아가기보다 친구가 쉬고 있는지 먼저 확인하려고 합니다.',
    [
      '문병을 가기 전에 먼저 연락해야 할 텐데요.',
      '문병을 가기 전에 과속해야 할 텐데요.',
      '친구에게 연락하지 않아야 해요.',
      '병원을 몰라도 찾아가야 해요.',
    ],
    '문병을 가기 전에 먼저 연락해야 할 텐데요.',
    L(
      '문병 전에 필요한 행동을 예상하면서 조심스럽게 계획하는 상황이에요.',
      'Bemorni ko‘rgani borishdan oldin kerakli ish ehtiyotkorlik bilan rejalashtirilmoqda.',
      'The speaker anticipates a necessary step before visiting the hospitalized friend.',
      'Говорящий предполагает необходимое действие перед посещением друга в больнице.',
    ),
    ['aya-eoya-hal-tende', 'visit-sick-person'],
  ),

  s5u8_442_type_answer: grammarTypeAnswer(
    '문병을 가기 전에 친구에게 연락해야 할 텐데요',
    L(
      '입원한 친구를 찾아가기 전에 먼저 연락할 필요가 있을 것이라고 쓰세요.',
      'Kasalxonadagi do‘stni ko‘rgani borishdan oldin unga qo‘ng‘iroq qilish kerakligini yozing.',
      'Write that you would probably need to contact your hospitalized friend before visiting.',
      'Напишите, что перед посещением госпитализированного друга, вероятно, нужно сначала связаться с ним.',
    ),
    'The speaker expects that contacting the friend is necessary before the hospital visit.',
    ['연락해야 할 텐데요'],
    ['aya-eoya-hal-tende', 'visit-sick-person', 'type-answer'],
  ),

  s5u8_443_translate_builder: grammarTranslateBuilder(
    L(
      '입원한 친구를 문병하기 전에 먼저 연락해야 할 것이라고 말하기',
      'Kasalxonadagi do‘stni ko‘rgani borishdan oldin avval bog‘lanish kerakligini ayting.',
      'Say that you would need to contact your friend before visiting them in the hospital.',
      'Скажите, что перед посещением друга в больнице нужно сначала связаться с ним.',
    ),
    [
      '친구에게 연락해야 할 텐데요',
      '문병을 가기 전에',
      '사고를 내야 할 텐데요',
      '바로 퇴원해야 해요',
      '과속해야 해요',
      '친구에게 연락하지 않아야 해요',
    ],
    '문병을 가기 전에 친구에게 연락해야 할 텐데요',
    L(
      '문병 계획에 필요한 준비 행동을 말해요.',
      'Bemorni ko‘rgani borish rejasidagi kerakli tayyorgarlik harakati.',
      'It describes a preparation expected to be necessary for the hospital visit.',
      'Описывается подготовительное действие, необходимое для посещения больного.',
    ),
    ['aya-eoya-hal-tende', 'visit-sick-person'],
  ),

  s5u8_444_fill_in_blank: grammarFillBlank(
    '문병을 가기 전에 친구에게 연락하___ 할 텐데요.',
    ['여야'],
    ['여야', '면서', '다가', '려고', '지만'],
    L(
      '연락하다는 연락해야로 활용해요.',
      '연락하다 → 연락해야.',
      '연락하다 becomes 연락해야.',
      '연락하다 превращается в 연락해야.',
    ),
    ['aya-eoya-hal-tende', 'form'],
  ),

  s5u8_445_word_arrange: grammarWordArrange(
    [
      '면회 시간을',
      '문병을 가기 전에',
      '확인해야 할 텐데요',
      '사고를 당해야 해요',
      '신호를 어겨야 해요',
      '과속해야 해요',
    ],
    '문병을 가기 전에 면회 시간을 확인해야 할 텐데요',
    L(
      '병원 방문 전에 확인할 정보가 있다는 뜻이에요.',
      'Kasalxonaga borishdan oldin tekshirilishi kerak bo‘lgan ma’lumot bor.',
      'There is information that likely needs checking before the hospital visit.',
      'Перед посещением больницы, вероятно, нужно проверить необходимую информацию.',
    ),
    ['aya-eoya-hal-tende', 'visit-sick-person'],
  ),

  s5u8_446_type_answer: grammarTypeAnswer(
    '문병을 가기 전에 면회 시간을 확인해야 할 텐데요',
    L(
      '문병 전에 병원의 면회 시간을 확인할 필요가 있을 것이라고 쓰세요.',
      'Bemorni ko‘rgani borishdan oldin tashrif vaqtini tekshirish kerakligini yozing.',
      'Write that you would need to check the hospital visiting hours before going.',
      'Напишите, что перед посещением нужно проверить часы приёма посетителей.',
    ),
    'The speaker expects that hospital visiting hours need to be checked before the visit.',
    ['확인해야 할 텐데요'],
    ['aya-eoya-hal-tende', 'visit-sick-person', 'type-answer'],
  ),

  s5u8_447_error_hunt: grammarErrorHunt(
    '문병을 가기 전에 면회 시간을 확인하야 할 텐데요.',
    '확인하야',
    ['확인해야', '확인하다가', '확인하면서', '확인하려고'],
    '확인해야',
    L(
      '확인하다는 확인해야로 활용해요.',
      '확인하다 → 확인해야.',
      '확인하다 becomes 확인해야.',
      '확인하다 превращается в 확인해야.',
    ),
    ['aya-eoya-hal-tende', 'conjugation'],
  ),

  s5u8_448_translate_builder: grammarTranslateBuilder(
    L(
      '문병 전에 병원의 면회 시간을 확인해야 할 것이라고 표현하기',
      'Bemorni ko‘rgani borishdan oldin tashrif vaqtini tekshirish kerakligini ayting.',
      'Say that you would need to check hospital visiting hours before visiting.',
      'Скажите, что перед посещением нужно проверить часы посещения.',
    ),
    [
      '확인해야 할 텐데요',
      '병원의 면회 시간을',
      '문병을 가기 전에',
      '확인하지 않아야 해요',
      '바로 퇴원해야 해요',
      '과속해야 해요',
    ],
    '문병을 가기 전에 병원의 면회 시간을 확인해야 할 텐데요',
    L(
      '방문 전에 필요한 정보를 미리 확인하는 상황이에요.',
      'Tashrifdan oldin kerakli ma’lumot tekshirilmoqda.',
      'The speaker anticipates checking necessary information before the visit.',
      'Предполагается предварительная проверка необходимой информации.',
    ),
    ['aya-eoya-hal-tende', 'visit-sick-person'],
  ),

  s5u8_449_reading_quiz: grammarReadingQuiz(
    '입원한 친구가 사고 후 많이 피곤해 보였습니다. 오늘 문병을 가려고 하지만 친구가 너무 힘든 상태라면 오래 이야기하지 않는 것이 좋습니다.',
    [
      '친구가 너무 피곤하지 않아야 할 텐데요.',
      '친구가 더 피곤해야 해요.',
      '친구가 과속해야 할 텐데요.',
      '친구가 사고를 내야 해요.',
    ],
    '친구가 너무 피곤하지 않아야 할 텐데요.',
    L(
      '문병을 앞두고 친구의 현재 상태가 너무 힘들지 않기를 걱정해요.',
      'Tashrif oldidan do‘stingiz juda charchamagan bo‘lishini umid qilasiz.',
      'Before visiting, the speaker hopes the friend is not too exhausted.',
      'Перед посещением говорящий надеется, что друг не слишком утомлён.',
    ),
    ['aya-eoya-hal-tende', 'visit-sick-person', 'concern'],
  ),

  s5u8_450_fill_in_blank: grammarFillBlank(
    '친구가 너무 피곤하지 ___ 할 텐데요.',
    ['않아야'],
    ['않아야', '않아서', '않다가', '않으면서', '않으려고'],
    L(
      '바라지 않는 상태를 피하고 싶을 때 지 않아야 할 텐데요를 사용할 수 있어요.',
      'Istalmagan holat bo‘lmasligini xohlashda 지 않아야 할 텐데요 ishlatiladi.',
      '지 않아야 할 텐데요 can express hope that an undesirable state is absent.',
      '지 않아야 할 텐데요 может выражать надежду на отсутствие нежелательного состояния.',
    ),
    ['aya-eoya-hal-tende', 'negative'],
  ),

  s5u8_451_type_answer: grammarTypeAnswer(
    '친구가 너무 피곤하지 않아야 할 텐데요',
    L(
      '문병을 가려고 하는데 입원한 친구가 너무 피곤하지 않기를 바라세요.',
      'Bemorni ko‘rgani bormoqchisiz, do‘stingiz juda charchamagan bo‘lishini tilang.',
      'You are going to visit your friend. Express hope that the friend is not too tired.',
      'Вы собираетесь навестить друга. Выразите надежду, что он не слишком устал.',
    ),
    'The speaker hopes the hospitalized friend is not too exhausted for the visit.',
    ['피곤하지 않아야 할 텐데요'],
    ['aya-eoya-hal-tende', 'visit-sick-person', 'type-answer'],
  ),

  s5u8_452_translate_builder: grammarTranslateBuilder(
    L(
      '문병을 가기 전에 친구가 너무 피곤하지 않기를 바라기',
      'Tashrifdan oldin do‘stingiz juda charchamagan bo‘lishini tilang.',
      'Express hope that your friend is not too tired before you visit.',
      'Выразите надежду, что перед посещением друг не слишком устал.',
    ),
    [
      '친구가',
      '너무 피곤하지 않아야 할 텐데요',
      '더 피곤해야 해요',
      '바로 퇴원해야 해요',
      '사고를 내야 해요',
      '문병을 취소했다고요',
    ],
    '친구가 너무 피곤하지 않아야 할 텐데요',
    L(
      '상대방의 몸 상태를 배려하면서 걱정하는 표현이에요.',
      'Bu boshqa odamning sog‘lig‘ini hisobga olib bildirilgan xavotir.',
      'It expresses concern while being considerate of the other person’s condition.',
      'Это выражение заботливого беспокойства о состоянии другого человека.',
    ),
    ['aya-eoya-hal-tende', 'concern'],
  ),

  s5u8_453_cloze_passage: grammarClozePassage(
    '문병을 가기 전에 친구에게 ___ 할 텐데요. 병원의 면회 시간도 ___ 할 텐데요.',
    ['연락해야', '확인해야'],
    [
      '확인해야',
      '연락해야',
      '과속해야',
      '입원해야',
      '연락했다고',
      '확인하다가',
    ],
    L(
      '문병 전에 필요한 두 가지 준비 행동을 순서대로 연습해요.',
      'Tashrifdan oldingi ikki tayyorgarlik harakati mashq qilinadi.',
      'Practise two preparations expected before visiting someone in hospital.',
      'Практикуются два подготовительных действия перед посещением больного.',
    ),
    ['aya-eoya-hal-tende', 'visit-sick-person'],
  ),

  s5u8_454_word_arrange: grammarWordArrange(
    [
      '친구 상태가',
      '오늘은',
      '할 텐데요',
      '좀 좋아야',
      '더 다쳐야',
      '사고를 내야',
    ],
    '친구 상태가 오늘은 좀 좋아야 할 텐데요',
    L(
      '문병하는 날에는 친구의 상태가 조금 좋아졌기를 바라는 마음이에요.',
      'Tashrif kuni do‘stingizning ahvoli biroz yaxshilangan bo‘lishini tilash.',
      'The speaker hopes the friend is feeling somewhat better on the day of the visit.',
      'Говорящий надеется, что в день посещения другу уже немного лучше.',
    ),
    ['aya-eoya-hal-tende', 'concern'],
  ),

  s5u8_455_type_answer: grammarTypeAnswer(
    '친구 상태가 오늘은 좀 좋아야 할 텐데요',
    L(
      '오늘 문병을 가는데 친구의 상태가 조금 좋아졌기를 바라세요.',
      'Bugun do‘stingizni ko‘rgani borasiz, uning ahvoli biroz yaxshilangan bo‘lishini tilang.',
      'You are visiting today. Express hope that your friend is feeling somewhat better.',
      'Сегодня вы идёте навестить друга. Выразите надежду, что ему уже немного лучше.',
    ),
    'The speaker hopes the friend is feeling somewhat better today.',
    ['좋아야 할 텐데요'],
    ['aya-eoya-hal-tende', 'visit-sick-person', 'type-answer'],
  ),

  s5u8_456_reading_quiz: grammarReadingQuiz(
    '문병을 갈 때는 자신의 일정만 생각하기보다 입원한 사람의 상태와 병원의 방문 시간을 함께 고려해야 합니다.',
    [
      '문병 전에는 친구 상태와 면회 시간을 확인해야 할 텐데요.',
      '친구 상태가 나빠도 오래 이야기해야 해요.',
      '면회 시간은 확인하지 않아도 돼요.',
      '병원에 갈 때 과속해야 해요.',
    ],
    '문병 전에는 친구 상태와 면회 시간을 확인해야 할 텐데요.',
    L(
      '문병하기라는 실제 기능에 필요한 준비와 배려를 함께 연습해요.',
      'Bemorni ko‘rishdagi amaliy tayyorgarlik va e’tibor birga mashq qilinadi.',
      'This practises both practical preparation and consideration when visiting someone sick.',
      'Практикуются и подготовка, и внимательность при посещении больного.',
    ),
    ['aya-eoya-hal-tende', 'learning-value'],
  ),

  s5u8_457_translate_builder: grammarTranslateBuilder(
    L(
      '입원한 친구의 상태가 오늘은 조금 좋아져 있기를 바라기',
      'Kasalxonadagi do‘stingizning ahvoli bugun biroz yaxshilangan bo‘lishini tilang.',
      'Express hope that your hospitalized friend’s condition has improved somewhat today.',
      'Выразите надежду, что состояние друга в больнице сегодня немного улучшилось.',
    ),
    [
      '오늘은 좀 좋아져야 할 텐데요',
      '입원한 친구 상태가',
      '더 나빠야 해요',
      '과속해야 해요',
      '사고를 내야 해요',
      '퇴원했다고요',
    ],
    '입원한 친구 상태가 오늘은 좀 좋아져야 할 텐데요',
    L(
      '문병을 앞두고 상대의 회복을 바라는 자연스러운 상황이에요.',
      'Tashrif oldidan do‘stning yaxshilanishini tilash tabiiy vaziyat.',
      'This is a natural expression of hope for recovery before a hospital visit.',
      'Это естественное выражение надежды на улучшение состояния перед посещением.',
    ),
    ['aya-eoya-hal-tende', 'hospital'],
  ),

  s5u8_458_fill_in_blank: grammarFillBlank(
    '친구 상태가 오늘은 좀 좋아져___ 할 텐데요.',
    ['야'],
    ['야', '서', '다가', '지만', '려고'],
    L(
      '좋아지다는 좋아져야로 활용해요.',
      '좋아지다 → 좋아져야.',
      '좋아지다 becomes 좋아져야.',
      '좋아지다 превращается в 좋아져야.',
    ),
    ['aya-eoya-hal-tende', 'form'],
  ),

  s5u8_459_error_hunt: grammarErrorHunt(
    '문병을 가기 전에 친구에게 연락하어야 할 텐데요.',
    '연락하어야',
    ['연락해야', '연락하다가', '연락하면서', '연락하려고'],
    '연락해야',
    L(
      '하다 동사는 하여야가 해야로 줄어들어요.',
      '하다 → 하여야 → 해야.',
      '하여야 contracts to 해야 with 하다 verbs.',
      'С глаголами на 하다 форма 하여야 сокращается до 해야.',
    ),
    ['aya-eoya-hal-tende', 'conjugation'],
  ),

  s5u8_460_word_arrange: grammarWordArrange(
    [
      '면회 시간을 확인해야',
      '친구에게 먼저 연락해야 하고',
      '문병을 가려면',
      '할 텐데요',
      '과속해야 하고',
      '신호를 어겨야 해요',
    ],
    '문병을 가려면 친구에게 먼저 연락해야 하고 면회 시간을 확인해야 할 텐데요',
    L(
      '실제 문병 준비 과정을 하나의 흐름으로 정리해요.',
      'Haqiqiy kasal ko‘rishga tayyorgarlik jarayoni bir oqimda umumlashtiriladi.',
      'This summarizes practical preparation for visiting someone in hospital.',
      'Обобщается практическая подготовка к посещению больного.',
    ),
    ['aya-eoya-hal-tende', 'visit-sick-person', 'lesson-review'],
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 4 · 해야 해요 vs 해야 할 텐데요
  // 직접 의무와 걱정·예상 구별
  // ──────────────────────────────────────────────────────────

  s5u8_461_reading_quiz: grammarReadingQuiz(
    '자동차를 타는 사람에게 반드시 지켜야 하는 규칙을 직접 알려 주려고 합니다. 아직 결과를 걱정하거나 추측하는 상황은 아닙니다.',
    [
      '안전벨트를 매야 해요.',
      '안전벨트를 매야 할 텐데요.',
      '안전벨트를 맸다고요?',
      '안전벨트를 매다가요.',
    ],
    '안전벨트를 매야 해요.',
    L(
      '확실한 규칙이나 직접적인 의무를 말할 때는 단순한 -아야/어야 해요가 자연스러워요.',
      'Aniq qoida yoki bevosita majburiyatda oddiy -아야/어야 해요 tabiiy.',
      'Plain -아야/어야 해요 is natural for a definite rule or direct obligation.',
      'Для чёткого правила или прямой обязанности естественно использовать -아야/어야 해요.',
    ),
    ['aya-eoya-hal-tende', 'grammar-contrast'],
  ),

  s5u8_462_type_answer: grammarTypeAnswer(
    '친구 상태가 빨리 좋아져야 할 텐데요',
    L(
      '친구 상태가 앞으로 빨리 좋아지기를 걱정하며 바라세요.',
      'Do‘stingizning ahvoli tez yaxshilanishini xavotir bilan tilang.',
      'Express concern and hope that your friend’s condition improves quickly.',
      'Выразите надежду и беспокойство, что состояние друга быстро улучшится.',
    ),
    'The speaker hopes with concern that the friend’s condition improves quickly.',
    ['좋아져야 할 텐데요'],
    ['aya-eoya-hal-tende', 'grammar-contrast', 'type-answer'],
  ),

  s5u8_463_translate_builder: grammarTranslateBuilder(
    L(
      '아직 결과를 모르는 친구의 상태가 빨리 좋아지기를 걱정하며 말하기',
      'Natijasi noma’lum do‘stingizning ahvoli tez yaxshilanishini xavotir bilan ayting.',
      'Express the worried hope that your friend’s condition improves quickly.',
      'Выразите надежду, что состояние друга быстро улучшится.',
    ),
    [
      '빨리 좋아져야 할 텐데요',
      '친구 상태가',
      '빨리 좋아져야 해요',
      '과속해야 해요',
      '사고를 냈다고요',
      '신호를 어겨야 해요',
    ],
    '친구 상태가 빨리 좋아져야 할 텐데요',
    L(
      '단순 명령이 아니라 미래 상태에 대한 기대와 걱정이에요.',
      'Bu oddiy buyruq emas, kelajak holatiga umid va xavotir.',
      'This is not a simple command; it expresses expectation and concern about a future condition.',
      'Это не простой приказ, а ожидание и беспокойство о будущем состоянии.',
    ),
    ['aya-eoya-hal-tende', 'grammar-contrast'],
  ),

  s5u8_464_fill_in_blank: grammarFillBlank(
    '운전할 때는 안전벨트를 ___.',
    ['매야 해요'],
    ['매야 해요', '매야 할 텐데요', '맸다고요', '매다가요', '매면서요'],
    L(
      '일반적인 안전 규칙을 직접 전달하는 문장이에요.',
      'Bu umumiy xavfsizlik qoidasini bevosita bildiradi.',
      'This directly states a general safety rule.',
      'Это прямое изложение общего правила безопасности.',
    ),
    ['aya-eoya-hal-tende', 'grammar-contrast'],
  ),

  s5u8_465_word_arrange: grammarWordArrange(
    [
      '안전벨트를',
      '운전할 때는',
      '매야 해요',
      '매야 할 텐데요',
      '과속해야 해요',
      '신호를 어겨야 해요',
    ],
    '운전할 때는 안전벨트를 매야 해요',
    L(
      '확실하게 지켜야 하는 교통안전 규칙이에요.',
      'Bu aniq rioya qilinishi kerak bo‘lgan yo‘l xavfsizligi qoidasi.',
      'This is a definite traffic-safety requirement.',
      'Это чёткое правило дорожной безопасности.',
    ),
    ['aya-eoya-hal-tende', 'grammar-contrast'],
  ),

  s5u8_466_type_answer: grammarTypeAnswer(
    '수술이 잘 끝나야 할 텐데요',
    L(
      '아직 결과를 모르는 수술이 잘 끝나기를 걱정하며 바라세요.',
      'Natijasi noma’lum operatsiya yaxshi tugashini xavotir bilan tilang.',
      'Express the worried hope that the surgery ends successfully.',
      'Выразите надежду и беспокойство, что операция закончится успешно.',
    ),
    'The speaker hopes with concern that the surgery ends successfully.',
    ['잘 끝나야 할 텐데요'],
    ['aya-eoya-hal-tende', 'surgery', 'type-answer'],
  ),

  s5u8_467_error_hunt: grammarErrorHunt(
    '수술이 잘 끝나어야 할 텐데요.',
    '끝나어야',
    ['끝나야', '끝나다가', '끝나면서', '끝나려고'],
    '끝나야',
    L(
      '끝나다는 끝나야로 활용해요.',
      '끝나다 → 끝나야.',
      '끝나다 becomes 끝나야.',
      '끝나다 превращается в 끝나야.',
    ),
    ['aya-eoya-hal-tende', 'conjugation'],
  ),

  s5u8_468_translate_builder: grammarTranslateBuilder(
    L(
      '아직 결과를 알 수 없는 수술이 잘 끝나기를 걱정하며 표현하기',
      'Natijasi noma’lum operatsiya yaxshi tugashini xavotir bilan ayting.',
      'Express hope that the surgery ends well.',
      'Выразите надежду, что операция закончится успешно.',
    ),
    [
      '수술이',
      '잘 끝나야 할 텐데요',
      '수술을 취소해야 해요',
      '바로 퇴원해야 해요',
      '사고를 내야 해요',
      '잘 끝났다고요',
    ],
    '수술이 잘 끝나야 할 텐데요',
    L(
      '아직 결과가 확정되지 않은 상황에서 바람과 걱정을 나타내요.',
      'Natija hali noma’lum bo‘lgan vaziyatda umid va xavotir ifodalanadi.',
      'It expresses hope and concern before the outcome is known.',
      'Выражаются надежда и беспокойство до того, как станет известен результат.',
    ),
    ['aya-eoya-hal-tende', 'surgery'],
  ),

  s5u8_469_reading_quiz: grammarReadingQuiz(
    '도로에서 반드시 지켜야 하는 일반적인 규칙을 말하려고 합니다. 운전자의 감정이나 불확실한 미래 결과를 표현하는 상황이 아닙니다.',
    [
      '제한 속도를 지켜야 해요.',
      '제한 속도를 지켜야 할 텐데요.',
      '제한 속도를 지켰다고요?',
      '제한 속도를 지키다가요.',
    ],
    '제한 속도를 지켜야 해요.',
    L(
      '명확한 규칙 자체를 전달할 때는 해야 해요가 직접적이에요.',
      'Aniq qoidani aytishda 해야 해요 bevosita shakl.',
      '해야 해요 directly expresses the rule itself.',
      '해야 해요 прямо выражает само правило.',
    ),
    ['aya-eoya-hal-tende', 'grammar-contrast'],
  ),

  s5u8_470_fill_in_blank: grammarFillBlank(
    '운전자는 제한 속도를 ___.',
    ['지켜야 해요'],
    [
      '지켜야 해요',
      '지켜야 할 텐데요',
      '지켰다고요',
      '지키다가요',
      '지키면서요',
    ],
    L(
      '일반적인 교통 규칙을 직접 설명하는 문장이에요.',
      'Bu umumiy yo‘l qoidasini bevosita tushuntiradi.',
      'This directly explains a general traffic rule.',
      'Это прямое описание общего дорожного правила.',
    ),
    ['aya-eoya-hal-tende', 'grammar-contrast'],
  ),

  s5u8_471_type_answer: grammarTypeAnswer(
    '사고가 더 커지지 않아야 할 텐데요',
    L(
      '아직 처리 중인 사고 상황이 더 심각해지지 않기를 걱정하며 바라세요.',
      'Hali davom etayotgan avariya holati yanada og‘irlashmasligini xavotir bilan tilang.',
      'Express the hope that the accident situation does not become more serious.',
      'Выразите надежду, что ситуация с аварией не станет ещё серьёзнее.',
    ),
    'The speaker hopes with concern that the accident situation does not become more serious.',
    ['커지지 않아야 할 텐데요'],
    ['aya-eoya-hal-tende', 'traffic-accident', 'type-answer'],
  ),

  s5u8_472_translate_builder: grammarTranslateBuilder(
    L(
      '사고 상황이 더 심각해지지 않기를 걱정하며 말하기',
      'Avariya holati yanada jiddiylashmasligini xavotir bilan ayting.',
      'Express the worried hope that the accident situation does not get worse.',
      'Выразите надежду, что ситуация с аварией не ухудшится.',
    ),
    [
      '사고가',
      '더 커지지 않아야 할 텐데요',
      '더 커져야 해요',
      '사고를 내야 해요',
      '과속해야 해요',
      '신호를 어겼다고요',
    ],
    '사고가 더 커지지 않아야 할 텐데요',
    L(
      '불확실한 미래에 대한 걱정을 표현해요.',
      'Noaniq kelajak haqida xavotir ifodalanadi.',
      'It expresses concern about an uncertain future outcome.',
      'Выражается беспокойство о неопределённом будущем результате.',
    ),
    ['aya-eoya-hal-tende', 'concern'],
  ),

  s5u8_473_cloze_passage: grammarClozePassage(
    '운전할 때는 안전벨트를 ___ 해요. 사고를 당한 친구는 많이 다치지 ___ 할 텐데요.',
    ['매야', '않아야'],
    ['않아야', '매야', '매다가', '다쳐야', '맸다고', '당한다고'],
    L(
      '직접적인 안전 의무와 걱정하며 바라는 상태를 구별해요.',
      'Bevosita xavfsizlik majburiyati va xavotirli umid farqlanadi.',
      'Distinguish a direct safety obligation from a worried hope about an uncertain condition.',
      'Различаем прямую обязанность и обеспокоенную надежду на неопределённое состояние.',
    ),
    ['aya-eoya-hal-tende', 'grammar-contrast'],
  ),

  s5u8_474_word_arrange: grammarWordArrange(
    [
      '친구 상태가',
      '할 텐데요',
      '빨리 좋아져야',
      '안전벨트를 매야 해요',
      '제한 속도를 지켜야 해요',
      '사고를 내야 해요',
    ],
    '친구 상태가 빨리 좋아져야 할 텐데요',
    L(
      '규칙을 명령하는 것이 아니라 친구의 회복을 걱정하며 바라요.',
      'Bu qoida emas, do‘stning tuzalishiga umid va xavotir.',
      'This expresses concern for recovery rather than giving a rule.',
      'Здесь выражается беспокойство о выздоровлении, а не правило.',
    ),
    ['aya-eoya-hal-tende', 'grammar-contrast'],
  ),

  s5u8_475_type_answer: grammarTypeAnswer(
    '친구 상태가 빨리 좋아져야 할 텐데요',
    L(
      '친구의 회복이라는 아직 확실하지 않은 미래 상태에 대한 바람을 쓰세요.',
      'Do‘stning hali noma’lum kelajakdagi tuzalishiga umid bildiring.',
      'Express hope about the friend’s still-uncertain future recovery.',
      'Выразите надежду на ещё неопределённое будущее выздоровление друга.',
    ),
    'The speaker hopes that the friend’s condition improves soon.',
    ['좋아져야 할 텐데요'],
    ['aya-eoya-hal-tende', 'recovery', 'type-answer'],
  ),

  s5u8_476_reading_quiz: grammarReadingQuiz(
    '두 문장이 있습니다. “안전벨트를 매야 해요.”는 교통 규칙을 직접 말합니다. “친구 상태가 좋아져야 할 텐데요.”는 친구의 앞으로 상태를 걱정합니다.',
    [
      '해야 해요는 직접적인 필요를, 해야 할 텐데요는 예상·걱정을 함께 나타낼 수 있어요.',
      '두 표현은 언제나 완전히 같은 의미예요.',
      '해야 할 텐데요는 과거 사건만 나타내요.',
      '해야 해요는 들은 말을 다시 확인할 때만 써요.',
    ],
    '해야 해요는 직접적인 필요를, 해야 할 텐데요는 예상·걱정을 함께 나타낼 수 있어요.',
    L(
      '두 표현의 핵심적인 화용 차이를 이해하는 문제예요.',
      'Ikki shaklning asosiy nutqiy farqi tushuniladi.',
      'This checks the key pragmatic difference between the two forms.',
      'Проверяется основное прагматическое различие между двумя формами.',
    ),
    ['aya-eoya-hal-tende', 'grammar-contrast'],
  ),

  s5u8_477_translate_builder: grammarTranslateBuilder(
    L(
      '친구가 크게 다치지 않았기를 걱정하며 말하기',
      'Do‘stingiz qattiq jarohatlanmagan bo‘lishini xavotir bilan ayting.',
      'Express the worried hope that your friend was not seriously injured.',
      'Выразите надежду, что друг не получил серьёзных травм.',
    ),
    [
      '친구가',
      '크게 다치지 않아야 할 텐데요',
      '크게 다쳐야 해요',
      '안전벨트를 매야 해요',
      '제한 속도를 지켜야 해요',
      '사고를 냈다고요',
    ],
    '친구가 크게 다치지 않아야 할 텐데요',
    L(
      '직접적인 명령이 아니라 사고 결과에 대한 걱정이에요.',
      'Bu buyruq emas, avariya natijasiga nisbatan xavotir.',
      'This is concern about an accident outcome rather than a direct command.',
      'Это беспокойство о результате аварии, а не прямое указание.',
    ),
    ['aya-eoya-hal-tende', 'grammar-contrast'],
  ),

  s5u8_478_fill_in_blank: grammarFillBlank(
    '친구가 크게 다치지 ___ 할 텐데요.',
    ['않아야'],
    ['않아야', '않아서', '않다가', '않으면서', '않으려고'],
    L(
      '걱정하며 바라지 않는 결과에는 지 않아야 할 텐데요를 사용할 수 있어요.',
      'Istalmagan natijaga nisbatan xavotirda 지 않아야 할 텐데요 ishlatilishi mumkin.',
      '지 않아야 할 텐데요 can express worried hope that an undesirable result does not occur.',
      '지 않아야 할 텐데요 может выражать надежду, что нежелательный результат не произошёл.',
    ),
    ['aya-eoya-hal-tende', 'negative'],
  ),

  s5u8_479_error_hunt: grammarErrorHunt(
    '운전할 때는 제한 속도를 지키어야 해요.',
    '지키어야',
    ['지켜야', '지키다가', '지키면서', '지키려고'],
    '지켜야',
    L(
      '지키다는 지켜야로 줄여서 활용해요.',
      '지키다 + 어야 → 지켜야.',
      '지키다 + 어야 contracts to 지켜야.',
      '지키다 + 어야 сокращается до 지켜야.',
    ),
    ['aya-eoya-hal-tende', 'conjugation'],
  ),

  s5u8_480_word_arrange: grammarWordArrange(
    [
      '사고를 당한 친구는',
      '운전자는 안전 규칙을 지켜야 하고',
      '빨리 좋아져야 할 텐데요',
      '과속해야 하고',
      '사고를 내야 하고',
      '신호를 어겨야 해요',
    ],
    '운전자는 안전 규칙을 지켜야 하고 사고를 당한 친구는 빨리 좋아져야 할 텐데요',
    L(
      '확실한 의무와 걱정·바람을 한 문장에서 구별해요.',
      'Aniq majburiyat va xavotirli umid bir gapda farqlanadi.',
      'A definite obligation and a worried hope are distinguished in one sentence.',
      'В одном предложении различаются чёткая обязанность и обеспокоенная надежда.',
    ),
    ['aya-eoya-hal-tende', 'lesson-review'],
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 5 · 사고부터 문병까지
  // Unit 8 최종 통합
  // ──────────────────────────────────────────────────────────

  s5u8_481_reading_quiz: grammarReadingQuiz(
    '친구가 교통사고를 당해 병원으로 갔다는 소식을 들었습니다. 아직 정확한 부상 상태는 듣지 못했습니다.',
    [
      '친구가 많이 다치지 않아야 할 텐데요.',
      '친구가 사고를 내야 할 텐데요.',
      '친구가 과속해야 해요.',
      '친구가 신호를 어겨야 해요.',
    ],
    '친구가 많이 다치지 않아야 할 텐데요.',
    L(
      'Unit 8의 사고 소식을 듣고 자연스럽게 걱정을 표현하는 상황이에요.',
      'Unit 8dagi avariya xabaridan keyin tabiiy xavotir ifodalanadi.',
      'This naturally expresses concern after hearing accident news.',
      'Это естественное выражение беспокойства после новости об аварии.',
    ),
    ['aya-eoya-hal-tende', 'unit-review'],
  ),

  s5u8_482_type_answer: grammarTypeAnswer(
    '친구가 많이 다치지 않아야 할 텐데요',
    L(
      '교통사고 소식을 들은 뒤 친구가 크게 다치지 않았기를 바라세요.',
      'Avariya xabaridan keyin do‘stingiz qattiq jarohatlanmagan bo‘lishini tilang.',
      'After hearing about the accident, express hope that your friend was not badly injured.',
      'После новости об аварии выразите надежду, что друг не получил серьёзных травм.',
    ),
    'The speaker hopes the friend was not badly injured in the traffic accident.',
    ['다치지 않아야 할 텐데요'],
    ['aya-eoya-hal-tende', 'unit-review', 'type-answer'],
  ),

  s5u8_483_translate_builder: grammarTranslateBuilder(
    L(
      '사고를 당한 친구가 크게 다치지 않았기를 걱정하며 표현하기',
      'Avariyaga uchragan do‘stingiz qattiq jarohatlanmagan bo‘lishini xavotir bilan ayting.',
      'Express the worried hope that your friend was not badly injured.',
      'Выразите надежду, что друг не получил серьёзных травм.',
    ),
    [
      '사고를 당한 친구가',
      '많이 다치지 않아야 할 텐데요',
      '사고를 내야 할 텐데요',
      '과속해야 해요',
      '음주 운전을 해야 해요',
      '신호를 어겨야 해요',
    ],
    '사고를 당한 친구가 많이 다치지 않아야 할 텐데요',
    L(
      '사고 어휘와 이번 문법을 자연스럽게 결합해요.',
      'Avariya lug‘ati va yangi grammatika tabiiy birlashtiriladi.',
      'It naturally combines accident vocabulary with the target grammar.',
      'Лексика об авариях естественно объединяется с целевой грамматикой.',
    ),
    ['aya-eoya-hal-tende', 'accident'],
  ),

  s5u8_484_fill_in_blank: grammarFillBlank(
    '친구가 많이 다치지 ___ 할 텐데요.',
    ['않아야'],
    ['않아야', '않아서', '않다가', '않으면서', '않으려고'],
    L(
      '좋지 않은 사고 결과가 아니기를 걱정하며 바라요.',
      'Yomon avariya natijasi bo‘lmagan bo‘lishini umid qilamiz.',
      'It expresses hope that the accident did not result in serious injury.',
      'Выражается надежда, что авария не привела к серьёзной травме.',
    ),
    ['aya-eoya-hal-tende', 'negative'],
  ),

  s5u8_485_word_arrange: grammarWordArrange(
    [
      '빨리 좋아져야',
      '사고를 당한 친구가',
      '할 텐데요',
      '사고를 내야',
      '과속해야',
      '신호를 어겨야',
    ],
    '사고를 당한 친구가 빨리 좋아져야 할 텐데요',
    L(
      '사고를 당한 뒤 친구가 빨리 회복하기를 바라요.',
      'Avariyadan keyin do‘stingiz tez yaxshilanishini tilaysiz.',
      'The speaker hopes the friend recovers quickly after the accident.',
      'Говорящий надеется на быстрое улучшение состояния друга после аварии.',
    ),
    ['aya-eoya-hal-tende', 'recovery'],
  ),

  s5u8_486_type_answer: grammarTypeAnswer(
    '사고를 당한 친구가 빨리 좋아져야 할 텐데요',
    L(
      '교통사고를 당한 친구의 상태가 빨리 좋아지기를 바라세요.',
      'Avariyaga uchragan do‘stingizning ahvoli tez yaxshilanishini tilang.',
      'Express hope that your friend’s condition improves quickly after the accident.',
      'Выразите надежду, что состояние друга после ДТП быстро улучшится.',
    ),
    'The speaker hopes the friend’s condition improves quickly after the accident.',
    ['좋아져야 할 텐데요'],
    ['aya-eoya-hal-tende', 'recovery', 'type-answer'],
  ),

  s5u8_487_error_hunt: grammarErrorHunt(
    '사고를 당한 친구가 빨리 좋아지어야 할 텐데요.',
    '좋아지어야',
    ['좋아져야', '좋아지다가', '좋아지면서', '좋아지려고'],
    '좋아져야',
    L(
      '좋아지다는 좋아져야로 활용해요.',
      '좋아지다 + 어야 → 좋아져야.',
      '좋아지다 + 어야 becomes 좋아져야.',
      '좋아지다 + 어야 превращается в 좋아져야.',
    ),
    ['aya-eoya-hal-tende', 'conjugation'],
  ),

  s5u8_488_translate_builder: grammarTranslateBuilder(
    L(
      '사고 후 입원한 친구의 상태가 빨리 좋아지기를 걱정하며 말하기',
      'Avariyadan keyin kasalxonadagi do‘stingizning ahvoli tez yaxshilanishini xavotir bilan ayting.',
      'Express the worried hope that your hospitalized friend improves quickly.',
      'Выразите надежду, что состояние госпитализированного после аварии друга быстро улучшится.',
    ),
    [
      '빨리 좋아져야 할 텐데요',
      '사고 후 입원한 친구 상태가',
      '더 나빠야 해요',
      '사고를 내야 할 텐데요',
      '과속해야 해요',
      '신호를 어겨야 해요',
    ],
    '사고 후 입원한 친구 상태가 빨리 좋아져야 할 텐데요',
    L(
      '사고, 입원, 회복의 흐름을 한 문장에 연결해요.',
      'Avariya, kasalxona va tiklanish jarayoni bir gapda bog‘lanadi.',
      'It connects the sequence of accident, hospitalization, and recovery.',
      'Связываются авария, госпитализация и восстановление.',
    ),
    ['aya-eoya-hal-tende', 'hospital'],
  ),

  s5u8_489_reading_quiz: grammarReadingQuiz(
    '친구의 상태가 조금 좋아졌다는 소식을 들었습니다. 이번 주에 문병을 가고 싶지만 아직 어느 시간에 방문할 수 있는지 모릅니다.',
    [
      '문병을 가기 전에 면회 시간을 확인해야 할 텐데요.',
      '면회 시간을 몰라도 바로 가야 해요.',
      '병원에 갈 때 과속해야 해요.',
      '친구가 퇴원했다고 말해야 해요.',
    ],
    '문병을 가기 전에 면회 시간을 확인해야 할 텐데요.',
    L(
      '사고 소식을 들은 다음 실제 문병 계획에 필요한 행동으로 이어져요.',
      'Avariya xabaridan keyin haqiqiy tashrif rejasi uchun kerakli harakatga o‘tiladi.',
      'The accident news leads naturally into practical planning for a hospital visit.',
      'После новости об аварии ситуация естественно переходит к подготовке посещения больного.',
    ),
    ['aya-eoya-hal-tende', 'visit-sick-person'],
  ),

  s5u8_490_fill_in_blank: grammarFillBlank(
    '문병을 가기 전에 면회 시간을 확인하___ 할 텐데요.',
    ['여야'],
    ['여야', '면서', '다가', '려고', '지만'],
    L(
      '확인하다는 확인해야로 활용해요.',
      '확인하다 → 확인해야.',
      '확인하다 becomes 확인해야.',
      '확인하다 превращается в 확인해야.',
    ),
    ['aya-eoya-hal-tende', 'form'],
  ),

  s5u8_491_type_answer: grammarTypeAnswer(
    '문병을 가기 전에 면회 시간을 확인해야 할 텐데요',
    L(
      '입원한 친구를 만나러 가기 전에 병원 면회 시간을 확인할 필요가 있다고 쓰세요.',
      'Kasalxonadagi do‘stingizni ko‘rgani borishdan oldin tashrif vaqtini tekshirish kerakligini yozing.',
      'Write that you would need to check visiting hours before going to see your hospitalized friend.',
      'Напишите, что перед посещением госпитализированного друга нужно проверить часы посещения.',
    ),
    'The speaker expects checking visiting hours to be necessary before visiting the friend.',
    ['확인해야 할 텐데요'],
    ['aya-eoya-hal-tende', 'visit-sick-person', 'type-answer'],
  ),

  s5u8_492_translate_builder: grammarTranslateBuilder(
    L(
      '문병 전에 병원의 면회 시간을 확인해야 할 것이라고 표현하기',
      'Tashrifdan oldin kasalxonaning tashrif vaqtini tekshirish kerakligini ayting.',
      'Say that the hospital visiting hours should be checked before the visit.',
      'Скажите, что перед посещением следует проверить часы приёма посетителей.',
    ),
    [
      '면회 시간을 확인해야 할 텐데요',
      '문병을 가기 전에',
      '면회 시간을 무시해야 해요',
      '병원에 과속해서 가야 해요',
      '친구가 사고를 내야 해요',
      '바로 퇴원해야 해요',
    ],
    '문병을 가기 전에 면회 시간을 확인해야 할 텐데요',
    L(
      '문병이라는 실제 과제를 수행하기 위해 필요한 정보를 확인해요.',
      'Bemorni ko‘rish vazifasi uchun kerakli ma’lumot tekshiriladi.',
      'This identifies information needed for the real-world task of visiting someone sick.',
      'Определяется информация, необходимая для реального посещения больного.',
    ),
    ['aya-eoya-hal-tende', 'visit-sick-person'],
  ),

  s5u8_493_cloze_passage: grammarClozePassage(
    '사고가 너무 크지 ___ 할 텐데요. 수술도 잘___ 할 텐데요. 문병을 가기 전에는 친구에게 ___ 할 텐데요.',
    ['않아야', '돼야', '연락해야'],
    ['연락해야', '돼야', '않아야', '다쳐야', '과속해야', '사고를 내야'],
    L(
      '사고 소식, 치료 결과, 문병 준비까지 Unit 8의 흐름을 한 번에 복습해요.',
      'Avariya, davolanish natijasi va tashrif tayyorgarligi birga takrorlanadi.',
      'Review the full Unit 8 flow from accident news through treatment and hospital visiting.',
      'Повторяется весь ход Unit 8: от новости об аварии до лечения и посещения больного.',
    ),
    ['aya-eoya-hal-tende', 'integration'],
  ),

  s5u8_494_word_arrange: grammarWordArrange(
    [
      '상태가 좋아야',
      '친구가 내일 퇴원하려면',
      '할 텐데요',
      '사고를 내야',
      '과속해야',
      '신호를 어겨야',
    ],
    '친구가 내일 퇴원하려면 상태가 좋아야 할 텐데요',
    L(
      '퇴원이라는 목표와 필요한 상태를 연결해요.',
      'Kasalxonadan chiqish maqsadi va kerakli holat bog‘lanadi.',
      'It connects discharge with the condition expected to be necessary for it.',
      'Выписка связывается с состоянием, которое предположительно необходимо для неё.',
    ),
    ['aya-eoya-hal-tende', 'leave-hospital'],
  ),

  s5u8_495_type_answer: grammarTypeAnswer(
    '친구가 내일 퇴원하려면 상태가 좋아야 할 텐데요',
    L(
      '친구가 내일 퇴원하려면 상태가 충분히 좋아야 할 것이라고 쓰세요.',
      'Do‘stingiz ertaga chiqishi uchun ahvoli yaxshi bo‘lishi kerakligini yozing.',
      'Write that your friend’s condition would need to be good enough to be discharged tomorrow.',
      'Напишите, что для выписки завтра состояние друга должно быть достаточно хорошим.',
    ),
    'The friend’s condition is expected to need improvement for discharge tomorrow.',
    ['좋아야 할 텐데요'],
    ['aya-eoya-hal-tende', 'leave-hospital', 'type-answer'],
  ),

  s5u8_496_reading_quiz: grammarReadingQuiz(
    '이번 단원에서는 사고가 난 과정만 설명하는 것이 아니라 사고 소식을 듣고 확인하고, 부상과 치료 상태를 걱정하고, 실제로 문병을 준비하는 표현까지 배웠습니다.',
    [
      '사고 소식을 이해하고 실제 상황에 맞게 반응하는 것이 중요해요.',
      '문법 형태만 외우면 사고 정보는 이해하지 않아도 돼요.',
      '부상과 치료 어휘는 문법과 함께 사용할 수 없어요.',
      '문병은 사고 단원과 관계가 없어요.',
    ],
    '사고 소식을 이해하고 실제 상황에 맞게 반응하는 것이 중요해요.',
    L(
      '어휘와 문법을 실제 사고·문병 상황에서 사용할 수 있게 연결한 최종 복습이에요.',
      'Lug‘at va grammatika haqiqiy avariya va bemorni ko‘rish vaziyatlari bilan bog‘lanadi.',
      'This final review connects vocabulary and grammar to realistic accident and hospital-visit situations.',
      'Итоговое повторение связывает лексику и грамматику с реальными ситуациями аварии и посещения больного.',
    ),
    ['unit-8', 'learning-value'],
  ),

  s5u8_497_translate_builder: grammarTranslateBuilder(
    L(
      '사고를 당한 친구가 빨리 좋아지고 수술도 잘되기를 걱정하며 표현하기',
      'Avariyaga uchragan do‘stingiz tez yaxshilanib, operatsiya ham yaxshi o‘tishini xavotir bilan ayting.',
      'Express hope that your injured friend improves quickly and that the surgery goes well.',
      'Выразите надежду, что пострадавший друг быстро поправится и операция пройдёт хорошо.',
    ),
    [
      '수술도 잘돼야 할 텐데요',
      '사고를 당한 친구가',
      '빨리 좋아져야 하고',
      '사고를 더 내야 해요',
      '과속해야 해요',
      '신호를 어겨야 해요',
    ],
    '사고를 당한 친구가 빨리 좋아져야 하고 수술도 잘돼야 할 텐데요',
    L(
      '사고 후 회복과 치료 결과에 대한 두 가지 걱정을 함께 표현해요.',
      'Avariyadan keyingi tiklanish va davolanish natijasiga ikki xil xavotir birga ifodalanadi.',
      'It combines concern about both recovery and the treatment outcome.',
      'Одновременно выражается беспокойство и о восстановлении, и о результате лечения.',
    ),
    ['aya-eoya-hal-tende', 'integration'],
  ),

  s5u8_498_fill_in_blank: grammarFillBlank(
    '내일 퇴원하려면 상태가 좋___ 할 텐데요.',
    ['아야'],
    ['아야', '아서', '다가', '지만', '으려고'],
    L(
      '좋다는 좋아야로 활용해요.',
      '좋다 → 좋아야.',
      '좋다 becomes 좋아야.',
      '좋다 превращается в 좋아야.',
    ),
    ['aya-eoya-hal-tende', 'form'],
  ),

  s5u8_499_error_hunt: grammarErrorHunt(
    '오늘 수술이 잘되야 할 텐데요.',
    '잘되야',
    ['잘돼야', '잘되다가', '잘되면서', '잘되려고'],
    '잘돼야',
    L(
      '잘되다에 어야가 붙으면 잘되어야가 되고, 자연스럽게 잘돼야로 줄여 써요.',
      '잘되다 + 어야 → 잘되어야 → 잘돼야.',
      '잘되다 + 어야 becomes 잘되어야, commonly contracted to 잘돼야.',
      '잘되다 + 어야 даёт 잘되어야, обычно сокращается до 잘돼야.',
    ),
    ['aya-eoya-hal-tende', 'conjugation'],
  ),

  s5u8_500_word_arrange: grammarWordArrange(
    [
      '빨리 좋아져야 하고',
      '수술도 잘돼야',
      '사고를 당한 친구가',
      '할 텐데요',
      '과속해야 하고',
      '신호를 어겨야 해요',
    ],
    '사고를 당한 친구가 빨리 좋아져야 하고 수술도 잘돼야 할 텐데요',
    L(
      'Unit 8 마지막에는 사고 사실을 이해하는 데서 끝나지 않고 상대의 회복을 걱정하고 바라는 표현까지 사용할 수 있어야 해요.',
      'Unit 8 oxirida faqat avariyani tushunish emas, do‘stning tiklanishiga umid va xavotir bildirish ham maqsad.',
      'By the end of Unit 8, the learner can go beyond understanding an accident and express concern and hope for recovery.',
      'К концу Unit 8 ученик не только понимает информацию об аварии, но и умеет выражать беспокойство и надежду на выздоровление.',
    ),
    ['aya-eoya-hal-tende', 'unit-review'],
  ),

  // 수정본

  s5u8_230_fill_in_blank: grammarFillBlank(
    '친구가 오늘 문병을 ___?',
    ['간다고요'],
    ['간다고요', '갔다고요', '가다고요', '가는다고요', '가라고요'],
    L(
      '현재 동작 가다는 간다고요로 확인해요.',
      'Hozirgi harakat 가다 → 간다고요 shaklida tasdiqlanadi.',
      'For the present action 가다, use 간다고요 to confirm what you heard.',
      'Для настоящего действия 가다 используется 간다고요 при переспросе.',
    ),
    ['reported-confirmation', 'visit-sick-person'],
  ),

  s5u8_278_fill_in_blank: grammarFillBlank(
    '친구가 오늘 ___?',
    ['퇴원한다고요'],
    [
      '퇴원한다고요',
      '퇴원했다고요',
      '퇴원하다고요',
      '퇴원하는다고요',
      '퇴원이라고요',
    ],
    L(
      '현재 동작 퇴원하다는 퇴원한다고요로 확인해요.',
      'Hozirgi harakat 퇴원하다 → 퇴원한다고요.',
      'Use 퇴원한다고요 to confirm a present/future discharge from hospital.',
      'Для подтверждения сообщения о выписке используется 퇴원한다고요.',
    ),
    ['reported-confirmation', 'leave-hospital'],
  ),

  s5u8_290_fill_in_blank: grammarFillBlank(
    '지수 씨가 내일 ___?',
    ['수술한다고요'],
    [
      '수술한다고요',
      '수술했다고요',
      '수술하다고요',
      '수술하는다고요',
      '수술이라고요',
    ],
    L(
      '수술하다는 동사이므로 수술한다고요라고 해요.',
      '수술하다 fe’l bo‘lgani uchun 수술한다고요 ishlatiladi.',
      'Because 수술하다 is a verb, the confirmation form is 수술한다고요.',
      'Поскольку 수술하다 — глагол, используется 수술한다고요.',
    ),
    ['reported-confirmation', 'have-surgery'],
  ),

  s5u8_338_fill_in_blank: grammarFillBlank(
    '아무리 도로가 ___ 주변을 확인해야 해요.',
    ['한산해도'],
    ['한산해도', '한산해서', '한산하지만', '한산하니까', '한산한데'],
    L(
      '한산하다는 자연스럽게 한산해도로 활용해요.',
      '한산하다 tabiiy shaklda 한산해도 bo‘ladi.',
      '한산하다 naturally becomes 한산해도.',
      '한산하다 естественно принимает форму 한산해도.',
    ),
    ['amuri-a-eodo', 'driving-safety'],
  ),

  s5u8_358_fill_in_blank: grammarFillBlank(
    '아무리 치료가 ___ 끝까지 받아야 해요.',
    ['불편해도'],
    ['불편해도', '불편해서', '불편하지만', '불편하니까', '불편한데'],
    L(
      '불편하다는 불편해도로 활용하는 것이 자연스러워요.',
      '불편하다 → 불편해도 tabiiy shakl.',
      'The natural form of 불편하다 here is 불편해도.',
      'Естественная форма 불편하다 здесь — 불편해도.',
    ),
    ['amuri-a-eodo', 'treatment'],
  ),

  s5u8_364_fill_in_blank: grammarFillBlank(
    '아무리 비가 많이 ___ 제한 속도를 지켜야 해요.',
    ['와도'],
    ['와도', '와서', '오지만', '오니까', '오는데'],
    L(
      '오다는 아도와 결합할 때 와도가 돼요.',
      '오다 + 아도 → 와도.',
      '오다 + 아도 contracts to 와도.',
      '오다 + 아도 превращается в 와도.',
    ),
    ['amuri-a-eodo', 'driving-safety'],
  ),

  s5u8_378_fill_in_blank: grammarFillBlank(
    '아무리 길이 ___ 주변을 잘 살펴야 해요.',
    ['익숙해도'],
    ['익숙해도', '익숙해서', '익숙하지만', '익숙하니까', '익숙한데'],
    L(
      '익숙하다는 익숙해도로 자연스럽게 활용해요.',
      '익숙하다 → 익숙해도.',
      '익숙하다 naturally becomes 익숙해도.',
      '익숙하다 естественно принимает форму 익숙해도.',
    ),
    ['amuri-a-eodo', 'driving-safety'],
  ),

  s5u8_398_fill_in_blank: grammarFillBlank(
    '아무리 운전을 ___ 안전벨트를 매야 해요.',
    ['잘해도'],
    ['잘해도', '잘해서', '잘하지만', '잘하니까', '잘하는데'],
    L(
      '잘하다는 잘해도로 자연스럽게 활용해요.',
      '잘하다 → 잘해도.',
      '잘하다 naturally becomes 잘해도.',
      '잘하다 естественно принимает форму 잘해도.',
    ),
    ['amuri-a-eodo', 'driving-safety'],
  ),
  s5u8_220_word_arrange: grammarWordArrange(
    [
      '아키라 씨가',
      '사고를 당했다고요',
      '어제',
      '사고를 낸다고요',
      '병원이라고요',
      '퇴원한다고요',
    ],
    '아키라 씨가 어제 사고를 당했다고요',
    L(
      '들은 사고 소식을 다시 확인하는 문장이에요.',
      'Eshitilgan avariya xabarini qayta tasdiqlaydigan gap.',
      'This sentence confirms accident news that the speaker has just heard.',
      'Это предложение подтверждает только что услышанную новость об аварии.',
    ),
    ['reported-confirmation', 'suffer-accident'],
  ),

  s5u8_240_word_arrange: grammarWordArrange(
    [
      '도로가',
      '지금도',
      '미끄럽다고요',
      '미끄러진다고요',
      '도로라고요',
      '안전하다고요',
    ],
    '도로가 지금도 미끄럽다고요',
    L(
      '현재 도로 상태에 대한 말을 다시 확인해요.',
      'Yo‘lning hozirgi holati haqidagi xabarni qayta tasdiqlaymiz.',
      'Confirm what you heard about the current road condition.',
      'Повторно уточняем услышанное о текущем состоянии дороги.',
    ),
    ['reported-confirmation', 'adjective'],
  ),

  s5u8_260_word_arrange: grammarWordArrange(
    [
      '사고 장소가',
      '학교 앞',
      '교차로라고요',
      '교차로가 사고라고요',
      '학교 앞에서',
      '미끄럽다고요',
    ],
    '사고 장소가 학교 앞 교차로라고요',
    L(
      '들은 사고 장소가 맞는지 명사 표현으로 확인해요.',
      'Eshitilgan avariya joyini ot shakli bilan tasdiqlaymiz.',
      'Confirm the reported accident location using the noun form.',
      'Уточняем услышанное место аварии с помощью формы после существительного.',
    ),
    ['reported-confirmation', 'noun'],
  ),

  s5u8_280_word_arrange: grammarWordArrange(
    [
      '친구의 다리가',
      '부러졌다고요',
      '교통사고로',
      '부러진다고요',
      '깁스라고요',
      '퇴원한다고요',
    ],
    '친구의 다리가 교통사고로 부러졌다고요',
    L(
      '이미 일어난 부상 소식을 다시 확인하는 문장이에요.',
      'Sodir bo‘lgan jarohat haqidagi xabarni qayta tasdiqlaydi.',
      'This confirms news about an injury that has already happened.',
      'Это подтверждение новости об уже полученной травме.',
    ),
    ['reported-confirmation', 'break-bone'],
  ),

  s5u8_300_word_arrange: grammarWordArrange(
    [
      '지수 씨가',
      '내일',
      '퇴원한다고요',
      '퇴원했다고요',
      '병원이라고요',
      '수술했다고요',
    ],
    '지수 씨가 내일 퇴원한다고요',
    L(
      '내일 예정된 퇴원 소식을 다시 확인해요.',
      'Ertaga rejalashtirilgan chiqish haqidagi xabarni qayta tasdiqlaymiz.',
      'Confirm what you heard about a discharge planned for tomorrow.',
      'Уточняем услышанное о выписке, запланированной на завтра.',
    ),
    ['reported-confirmation', 'leave-hospital'],
  ),
  s5u8_245_type_answer: grammarTypeAnswer(
    '사고 원인이 과속이라고요',
    L(
      '사고의 원인이 과속이라는 말을 듣고 다시 확인하세요.',
      'Avariya sababi tezlikni oshirish bo‘lganini eshitib, qayta tasdiqlang.',
      'Confirm what you heard: the cause of the accident was speeding.',
      'Переспросите услышанное: причиной аварии было превышение скорости.',
    ),
    'The speaker confirms that speeding was the cause of the accident.',
    ['과속이라고요'],
    ['reported-confirmation', 'speeding', 'type-answer'],
  ),

  s5u8_256_reading_quiz: grammarReadingQuiz(
    '사고 장소가 학교 앞 교차로라는 말을 들었습니다. 정확히 들었는지 다시 확인하려고 합니다.',
    [
      '사고 장소가 학교 앞 교차로라고요?',
      '사고 장소가 학교 앞 교차로는다고요?',
      '사고 장소가 학교 앞 교차로다고요?',
      '사고 장소가 학교 앞 교차로한다고요?',
    ],
    '사고 장소가 학교 앞 교차로라고요?',
    L(
      '교차로는 명사이므로 N(이)라고요 형태를 사용해요.',
      '교차로 ot bo‘lgani uchun N(이)라고요 shakli ishlatiladi.',
      '교차로 is a noun, so use the N(이)라고요 form.',
      '교차로 — существительное, поэтому используется N(이)라고요.',
    ),
    ['reported-confirmation', 'noun'],
  ),

  s5u8_296_reading_quiz: grammarReadingQuiz(
    '지수 씨가 내일 병원에서 퇴원한다는 말을 들었습니다. 예상보다 빨라서 다시 확인하려고 합니다.',
    [
      '지수 씨가 내일 퇴원한다고요?',
      '지수 씨가 내일 퇴원하다고요?',
      '지수 씨가 내일 퇴원이라고요?',
      '지수 씨가 내일 퇴원는다고요?',
    ],
    '지수 씨가 내일 퇴원한다고요?',
    L(
      '퇴원하다는 동사이므로 현재·예정된 행동을 확인할 때 퇴원한다고요라고 해요.',
      '퇴원하다 fe’l, shuning uchun rejalashtirilgan harakatni 퇴원한다고요 bilan tasdiqlaymiz.',
      '퇴원하다 is a verb, so use 퇴원한다고요 to confirm the planned action.',
      '퇴원하다 — глагол, поэтому для переспроса о запланированном действии используется 퇴원한다고요.',
    ),
    ['reported-confirmation', 'leave-hospital'],
  ),

  s5u8_299_error_hunt: grammarErrorHunt(
    '지수 씨가 내일 수술하다고요?',
    '수술하다고요?',
    ['수술한다고요?', '수술했다고요?', '수술이라고요?', '수술할까요?'],
    '수술한다고요?',
    L(
      '수술하다는 동사이므로 예정된 행동을 다시 확인할 때 수술한다고요라고 해요.',
      '수술하다 fe’l, shuning uchun rejalashtirilgan harakat 수술한다고요 shaklida tasdiqlanadi.',
      'Because 수술하다 is a verb, use 수술한다고요 when confirming the planned action.',
      'Поскольку 수술하다 — глагол, для переспроса о запланированном действии используется 수술한다고요.',
    ),
    ['reported-confirmation', 'have-surgery', 'error-hunt'],
  ),
  s5u8_320_word_arrange: grammarWordArrange(
    [
      '제한 속도를 지켜야 해요',
      '아무리 늦어도',
      '운전할 때는',
      '과속해도 괜찮아요',
      '시간이 없어서',
      '신호를 어겨도 돼요',
    ],
    '아무리 늦어도 운전할 때는 제한 속도를 지켜야 해요',
    L(
      '시간이 부족해도 안전 규칙은 바뀌지 않아요.',
      'Vaqt yetishmasa ham xavfsizlik qoidasi o‘zgarmaydi.',
      'Even when you are late, the safety rule does not change.',
      'Даже если вы опаздываете, правило безопасности не меняется.',
    ),
    ['amuri-a-eodo', 'obey-speed-limit'],
  ),

  s5u8_340_word_arrange: grammarWordArrange(
    [
      '주변을 잘 살펴야 해요',
      '아무리 도로가 한산해도',
      '운전할 때는',
      '차가 없으니까',
      '속도를 높여도 돼요',
      '앞만 보면 돼요',
    ],
    '아무리 도로가 한산해도 운전할 때는 주변을 잘 살펴야 해요',
    L(
      '차가 적어 보여도 주변 확인은 계속 필요해요.',
      'Mashina kam ko‘rinsa ham atrofni tekshirish kerak.',
      'Even when the road looks empty, you still need to check your surroundings.',
      'Даже если дорога кажется пустой, всё равно нужно следить за обстановкой.',
    ),
    ['amuri-a-eodo', 'check-surroundings'],
  ),

  s5u8_360_word_arrange: grammarWordArrange(
    [
      '치료를 끝까지 받아야 해요',
      '아무리 빨리 낫고 싶어도',
      '다쳤을 때는',
      '병원을 바로 나가도 돼요',
      '치료가 불편해서',
      '깁스를 풀어도 돼요',
    ],
    '아무리 빨리 낫고 싶어도 다쳤을 때는 치료를 끝까지 받아야 해요',
    L(
      '빨리 회복하고 싶다는 마음이 커도 필요한 치료는 계속해야 해요.',
      'Tezroq tuzalishni istasangiz ham kerakli davolanishni davom ettirish zarur.',
      'Even if you strongly want to recover quickly, necessary treatment should be completed.',
      'Даже если очень хочется быстрее поправиться, необходимое лечение нужно пройти до конца.',
    ),
    ['amuri-a-eodo', 'treatment'],
  ),

  s5u8_374_word_arrange: grammarWordArrange(
    [
      '제한 속도를 지켜야 해요',
      '아무리 비가 많이 와도',
      '운전할 때는',
      '빨리 도착하려고',
      '속도를 높여야 해요',
      '차선을 바꿔야 해요',
    ],
    '아무리 비가 많이 와도 운전할 때는 제한 속도를 지켜야 해요',
    L(
      '날씨가 나빠도 안전 규칙은 그대로 지켜야 해요.',
      'Ob-havo yomon bo‘lsa ham xavfsizlik qoidalariga amal qilish kerak.',
      'Safety rules still apply even in bad weather.',
      'Даже в плохую погоду правила безопасности нужно соблюдать.',
    ),
    ['amuri-a-eodo', 'driving-safety'],
  ),

  s5u8_380_word_arrange: grammarWordArrange(
    [
      '주변을 확인해야 해요',
      '아무리 길이 익숙해도',
      '운전하기 전에는',
      '길을 잘 아니까',
      '앞을 보지 않아도 돼요',
      '신호를 확인하지 않아도 돼요',
    ],
    '아무리 길이 익숙해도 운전하기 전에는 주변을 확인해야 해요',
    L(
      '익숙한 길이어도 방심하지 않는 것이 중요해요.',
      'Tanish yo‘l bo‘lsa ham ehtiyotsizlik qilmaslik muhim.',
      'Even on a familiar road, it is important not to become careless.',
      'Даже на знакомой дороге важно не терять внимательность.',
    ),
    ['amuri-a-eodo', 'check-surroundings'],
  ),

  s5u8_400_word_arrange: grammarWordArrange(
    [
      '안전벨트를 꼭 매야 해요',
      '아무리 운전을 잘해도',
      '차를 탈 때는',
      '운전을 잘하니까',
      '안전벨트가 필요 없어요',
      '짧은 거리라서',
    ],
    '아무리 운전을 잘해도 차를 탈 때는 안전벨트를 꼭 매야 해요',
    L(
      '운전 실력과 관계없이 기본적인 안전 규칙을 지켜야 해요.',
      'Haydash mahoratidan qat’i nazar asosiy xavfsizlik qoidalariga amal qilish kerak.',
      'Basic safety rules apply regardless of driving skill.',
      'Основные правила безопасности нужно соблюдать независимо от водительского опыта.',
    ),
    ['amuri-a-eodo', 'fasten-seatbelt', 'node-review'],
  ),
};

export const S5_UNIT8_NODES = [
  {
    title: L(
      '교통사고를 예방해요',
      'Yo‘l-transport hodisasining oldini olamiz',
      'Prevent Traffic Accidents',
      'Предотвращаем дорожные аварии',
    ),
    description: L(
      '교통사고, 안전벨트, 과속, 제한 속도, 교통 신호, 주변 확인, 음주 운전 어휘를 실제 교통안전 상황에서 익힌다',
      'Yo‘l hodisasi, xavfsizlik kamari, tezlik, signal, atrofni tekshirish va mast haydashga oid lug‘atni real vaziyatlarda o‘rganamiz',
      'Learn core traffic-safety vocabulary including accidents, seat belts, speeding, speed limits, signals, awareness, and drunk driving',
      'Изучаем лексику дорожной безопасности: аварии, ремни, скорость, сигналы, контроль обстановки и вождение в нетрезвом виде',
    ),
    section: 5,
    unit: 8,
    order: 1,
    isActive: true,
    lessons: [
      {
        title: L(
          '교통사고가 났어요',
          'Yo‘l-transport hodisasi yuz berdi',
          'There Was a Traffic Accident',
          'Произошла дорожная авария',
        ),
        description: L(
          '교통사고와 사고가 나다를 익히고 사고 상황과 사고 예방의 차이를 이해한다',
          '교통사고 va 사고가 나다 ifodalarini o‘rganib, hodisa va profilaktikani farqlaymiz',
          'Learn 교통사고 and 사고가 나다 while distinguishing an actual accident from accident prevention',
          'Изучаем 교통사고 и 사고가 나다 и различаем аварию и её предотвращение',
        ),
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_5,
        order: 1,
        questions: [
          's5u8_001_reading_quiz',
          's5u8_002_type_answer',
          's5u8_003_translate_builder',
          's5u8_004_fill_in_blank',
          's5u8_005_word_arrange',
          's5u8_006_type_answer',
          's5u8_007_error_hunt',
          's5u8_008_translate_builder',
          's5u8_009_reading_quiz',
          's5u8_010_fill_in_blank',
          's5u8_011_type_answer',
          's5u8_012_translate_builder',
          's5u8_013_cloze_passage',
          's5u8_014_word_arrange',
          's5u8_015_type_answer',
          's5u8_016_reading_quiz',
          's5u8_017_translate_builder',
          's5u8_018_fill_in_blank',
          's5u8_019_error_hunt',
          's5u8_020_word_arrange',
        ],
      },
      {
        title: L(
          '안전벨트를 매고 속도를 지켜요',
          'Kamarni taqib, tezlikka rioya qilamiz',
          'Fasten Your Seat Belt and Watch Your Speed',
          'Пристёгиваемся и соблюдаем скорость',
        ),
        description: L(
          '안전벨트를 매다, 과속, 제한 속도, 제한 속도를 지키다를 실제 운전 상황에서 구별하고 사용한다',
          'Xavfsizlik kamari, tezlik oshirish va tezlik chekloviga rioya qilishni real vaziyatlarda o‘rganamiz',
          'Practise seat-belt use, speeding, speed limits, and obeying the speed limit in realistic situations',
          'Практикуем ремни безопасности, превышение скорости и соблюдение ограничений',
        ),
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_5,
        order: 2,
        questions: [
          's5u8_021_reading_quiz',
          's5u8_022_type_answer',
          's5u8_023_translate_builder',
          's5u8_024_fill_in_blank',
          's5u8_025_word_arrange',
          's5u8_026_type_answer',
          's5u8_027_error_hunt',
          's5u8_028_translate_builder',
          's5u8_029_reading_quiz',
          's5u8_030_fill_in_blank',
          's5u8_031_type_answer',
          's5u8_032_translate_builder',
          's5u8_033_cloze_passage',
          's5u8_034_word_arrange',
          's5u8_035_type_answer',
          's5u8_036_reading_quiz',
          's5u8_037_translate_builder',
          's5u8_038_fill_in_blank',
          's5u8_039_error_hunt',
          's5u8_040_word_arrange',
        ],
      },
      {
        title: L(
          '신호와 주변을 확인해요',
          'Signal va atrofni tekshiramiz',
          'Check Signals and Your Surroundings',
          'Проверяем сигналы и обстановку',
        ),
        description: L(
          '교통 신호, 신호를 지키다, 주변을 살피다를 사용해 교차로와 출발 상황에서 필요한 안전 행동을 익힌다',
          'Signalga rioya qilish va atrofni tekshirishni chorraha va harakat boshlash vaziyatlarida mashq qilamiz',
          'Practise obeying signals and checking surroundings at intersections and before moving',
          'Практикуем соблюдение сигналов и контроль обстановки на перекрёстках и перед движением',
        ),
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_5,
        order: 3,
        questions: [
          's5u8_041_reading_quiz',
          's5u8_042_type_answer',
          's5u8_043_translate_builder',
          's5u8_044_fill_in_blank',
          's5u8_045_word_arrange',
          's5u8_046_type_answer',
          's5u8_047_error_hunt',
          's5u8_048_translate_builder',
          's5u8_049_reading_quiz',
          's5u8_050_fill_in_blank',
          's5u8_051_type_answer',
          's5u8_052_translate_builder',
          's5u8_053_cloze_passage',
          's5u8_054_word_arrange',
          's5u8_055_type_answer',
          's5u8_056_reading_quiz',
          's5u8_057_translate_builder',
          's5u8_058_fill_in_blank',
          's5u8_059_error_hunt',
          's5u8_060_word_arrange',
        ],
      },
      {
        title: L(
          '위험한 운전을 피해야 해요',
          'Xavfli haydashdan qochish kerak',
          'Avoid Dangerous Driving',
          'Избегаем опасного вождения',
        ),
        description: L(
          '과속과 음주 운전의 의미를 정확히 구별하고 실제 상황에서 위험한 행동과 안전한 선택을 판단한다',
          'Tezlik oshirish va mast haydashni farqlab, xavfli va xavfsiz tanlovlarni aniqlaymiz',
          'Distinguish speeding and drunk driving and make safe decisions in realistic traffic situations',
          'Различаем превышение скорости и вождение в нетрезвом виде и выбираем безопасное поведение',
        ),
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_5,
        order: 4,
        questions: [
          's5u8_061_reading_quiz',
          's5u8_062_type_answer',
          's5u8_063_translate_builder',
          's5u8_064_fill_in_blank',
          's5u8_065_word_arrange',
          's5u8_066_type_answer',
          's5u8_067_error_hunt',
          's5u8_068_translate_builder',
          's5u8_069_reading_quiz',
          's5u8_070_fill_in_blank',
          's5u8_071_type_answer',
          's5u8_072_translate_builder',
          's5u8_073_cloze_passage',
          's5u8_074_word_arrange',
          's5u8_075_type_answer',
          's5u8_076_reading_quiz',
          's5u8_077_translate_builder',
          's5u8_078_fill_in_blank',
          's5u8_079_error_hunt',
          's5u8_080_word_arrange',
        ],
      },
      {
        title: L(
          '안전 운전 습관을 선택해요',
          'Xavfsiz haydash odatlarini tanlaymiz',
          'Choose Safe Driving Habits',
          'Выбираем безопасные привычки вождения',
        ),
        description: L(
          'Unit 8의 핵심 교통안전 어휘를 통합해 실제 도로 상황에서 사고 위험을 판단하고 안전한 행동을 선택한다',
          'Unit 8dagi asosiy yo‘l xavfsizligi lug‘atini birlashtirib, real vaziyatda xavfsiz qaror qilamiz',
          'Integrate Unit 8 traffic-safety vocabulary to judge accident risk and choose safe actions in realistic situations',
          'Объединяем лексику Unit 8, чтобы оценивать риск аварии и выбирать безопасные действия',
        ),
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_5,
        order: 5,
        questions: [
          's5u8_081_reading_quiz',
          's5u8_082_type_answer',
          's5u8_083_translate_builder',
          's5u8_084_fill_in_blank',
          's5u8_085_word_arrange',
          's5u8_086_type_answer',
          's5u8_087_error_hunt',
          's5u8_088_translate_builder',
          's5u8_089_reading_quiz',
          's5u8_090_fill_in_blank',
          's5u8_091_type_answer',
          's5u8_092_translate_builder',
          's5u8_093_cloze_passage',
          's5u8_094_word_arrange',
          's5u8_095_type_answer',
          's5u8_096_reading_quiz',
          's5u8_097_translate_builder',
          's5u8_098_fill_in_blank',
          's5u8_099_error_hunt',
          's5u8_100_word_arrange',
        ],
      },
    ],
  },
  {
    title: L(
      '운전하다가 사고가 났어요',
      'Haydab ketayotganda avariya bo‘ldi',
      'An Accident Happened While Driving',
      'Во время вождения произошла авария',
    ),
    description: L(
      'V-다가를 사용해 진행 중이던 행동에 다른 사건이 생기거나 행동이 중단·변경되는 상황을 교통사고와 안전 운전 맥락에서 표현한다',
      'V-다가 orqali davom etayotgan harakat paytida boshqa hodisa yuz berishi yoki harakatning to‘xtashi va o‘zgarishini yo‘l xavfsizligi vaziyatlarida ifodalaymiz',
      'Use V-다가 to describe an event occurring during an ongoing action or an action being interrupted or changed in traffic-safety situations',
      'Используем V-다가 для событий во время продолжающегося действия, его прерывания или смены в дорожных ситуациях',
    ),
    section: 5,
    unit: 8,
    order: 2,
    isActive: true,
    lessons: [
      {
        title: L(
          '운전하다가 사고가 났어요',
          'Haydab ketayotganda avariya bo‘ldi',
          'An Accident Happened While Driving',
          'Во время вождения произошла авария',
        ),
        description: L(
          '진행 중인 행동에 다른 사건이 발생하는 V-다가의 기본 의미와 형태를 익힌다',
          'Davom etayotgan harakat paytida boshqa hodisa yuz berishini bildiruvchi V-다가ni o‘rganamiz',
          'Learn the basic form and meaning of V-다가 when another event occurs during an ongoing action',
          'Изучаем основную форму и значение V-다가, когда во время действия происходит другое событие',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 1,
        questions: [
          's5u8_101_reading_quiz',
          's5u8_102_type_answer',
          's5u8_103_translate_builder',
          's5u8_104_fill_in_blank',
          's5u8_105_word_arrange',
          's5u8_106_type_answer',
          's5u8_107_error_hunt',
          's5u8_108_translate_builder',
          's5u8_109_reading_quiz',
          's5u8_110_fill_in_blank',
          's5u8_111_type_answer',
          's5u8_112_translate_builder',
          's5u8_113_cloze_passage',
          's5u8_114_word_arrange',
          's5u8_115_type_answer',
          's5u8_116_reading_quiz',
          's5u8_117_translate_builder',
          's5u8_118_fill_in_blank',
          's5u8_119_error_hunt',
          's5u8_120_word_arrange',
        ],
      },
      {
        title: L(
          '운전하다가 신호를 못 봤어요',
          'Haydash paytida signalni ko‘rmadim',
          'I Missed the Signal While Driving',
          'Во время вождения я не заметил сигнал',
        ),
        description: L(
          '운전 중 신호, 주변, 속도와 관련된 위험 상황이 발생하는 흐름을 V-다가로 설명한다',
          'Haydash paytida signal, atrof va tezlik bilan bog‘liq xavfli vaziyatlarni V-다가 bilan tushuntiramiz',
          'Use V-다가 to explain risky situations involving signals, surroundings, and speed while driving',
          'Используем V-다가 для опасных ситуаций, связанных с сигналами, обстановкой и скоростью',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 2,
        questions: [
          's5u8_121_reading_quiz',
          's5u8_122_type_answer',
          's5u8_123_translate_builder',
          's5u8_124_fill_in_blank',
          's5u8_125_word_arrange',
          's5u8_126_type_answer',
          's5u8_127_error_hunt',
          's5u8_128_translate_builder',
          's5u8_129_reading_quiz',
          's5u8_130_fill_in_blank',
          's5u8_131_type_answer',
          's5u8_132_translate_builder',
          's5u8_133_cloze_passage',
          's5u8_134_word_arrange',
          's5u8_135_type_answer',
          's5u8_136_reading_quiz',
          's5u8_137_translate_builder',
          's5u8_138_fill_in_blank',
          's5u8_139_error_hunt',
          's5u8_140_word_arrange',
        ],
      },
      {
        title: L(
          '하던 일을 바꿨어요',
          'Qilayotgan ishimni o‘zgartirdim',
          'I Changed What I Was Doing',
          'Я сменил действие',
        ),
        description: L(
          '첫 행동을 끝까지 하지 않고 중간에 멈추거나 다른 행동으로 바뀌는 V-다가의 쓰임을 익힌다',
          'Birinchi harakatni tugatmay to‘xtatish yoki boshqa harakatga o‘tishdagi V-다가ni o‘rganamiz',
          'Learn how V-다가 marks an action being stopped midway or changed to another action',
          'Изучаем V-다가 для прекращения действия на полпути или перехода к другому действию',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 3,
        questions: [
          's5u8_141_reading_quiz',
          's5u8_142_type_answer',
          's5u8_143_translate_builder',
          's5u8_144_fill_in_blank',
          's5u8_145_word_arrange',
          's5u8_146_type_answer',
          's5u8_147_error_hunt',
          's5u8_148_translate_builder',
          's5u8_149_reading_quiz',
          's5u8_150_fill_in_blank',
          's5u8_151_type_answer',
          's5u8_152_translate_builder',
          's5u8_153_cloze_passage',
          's5u8_154_word_arrange',
          's5u8_155_type_answer',
          's5u8_156_reading_quiz',
          's5u8_157_translate_builder',
          's5u8_158_fill_in_blank',
          's5u8_159_error_hunt',
          's5u8_160_word_arrange',
        ],
      },
      {
        title: L(
          '-다가, -면서, -았다가를 구별해요',
          '-다가, -면서 va -았다가ni farqlaymiz',
          'Distinguish -다가, -면서, and -았다가',
          'Различаем -다가, -면서 и -았다가',
        ),
        description: L(
          '행동의 중단, 동시 진행, 완료 후 전환을 비교해 상황에 맞는 연결 표현을 선택한다',
          'Harakat uzilishi, bir vaqtda davom etish va tugagandan keyingi o‘zgarishni taqqoslaymiz',
          'Compare interruption, simultaneous actions, and a change after completing the first action',
          'Сравниваем прерывание действия, одновременность и смену после завершённого действия',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 4,
        questions: [
          's5u8_161_reading_quiz',
          's5u8_162_type_answer',
          's5u8_163_translate_builder',
          's5u8_164_fill_in_blank',
          's5u8_165_word_arrange',
          's5u8_166_type_answer',
          's5u8_167_error_hunt',
          's5u8_168_translate_builder',
          's5u8_169_reading_quiz',
          's5u8_170_fill_in_blank',
          's5u8_171_type_answer',
          's5u8_172_translate_builder',
          's5u8_173_cloze_passage',
          's5u8_174_word_arrange',
          's5u8_175_type_answer',
          's5u8_176_reading_quiz',
          's5u8_177_translate_builder',
          's5u8_178_fill_in_blank',
          's5u8_179_error_hunt',
          's5u8_180_word_arrange',
        ],
      },
      {
        title: L(
          '사고가 어떻게 났는지 설명해요',
          'Avariya qanday bo‘lganini tushuntiramiz',
          'Explain How the Accident Happened',
          'Объясняем, как произошла авария',
        ),
        description: L(
          '과속, 신호 위반, 주변 확인과 같은 교통안전 어휘와 V-다가를 통합해 사고 직전 행동과 발생 과정을 설명한다',
          'Tezlik, signal va atrofni tekshirish lug‘ati bilan V-다가ni birlashtirib avariya oldidagi jarayonni tushuntiramiz',
          'Combine V-다가 with traffic-safety vocabulary to explain the actions and events immediately before an accident',
          'Объединяем V-다가 с лексикой дорожной безопасности для объяснения событий перед аварией',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 5,
        questions: [
          's5u8_181_reading_quiz',
          's5u8_182_type_answer',
          's5u8_183_translate_builder',
          's5u8_184_fill_in_blank',
          's5u8_185_word_arrange',
          's5u8_186_type_answer',
          's5u8_187_error_hunt',
          's5u8_188_translate_builder',
          's5u8_189_reading_quiz',
          's5u8_190_fill_in_blank',
          's5u8_191_type_answer',
          's5u8_192_translate_builder',
          's5u8_193_cloze_passage',
          's5u8_194_word_arrange',
          's5u8_195_type_answer',
          's5u8_196_reading_quiz',
          's5u8_197_translate_builder',
          's5u8_198_fill_in_blank',
          's5u8_199_error_hunt',
          's5u8_200_word_arrange',
        ],
      },
    ],
  },
  {
    title: L(
      '교통사고가 났다고요?',
      'Avariya bo‘lganini aytyapsizmi?',
      'You Said There Was a Traffic Accident?',
      'Вы сказали, что произошло ДТП?',
    ),
    description: L(
      'A-다고(요), V-ㄴ다고/는다고(요), N(이)라고(요)를 사용해 들은 사고 소식의 장소, 원인, 부상과 치료 내용을 정확하게 다시 확인한다',
      'A-다고(요), V-ㄴ다고/는다고(요), N(이)라고(요) orqali eshitilgan avariya, joy, sabab, jarohat va davolanish ma’lumotlarini aniqlashtiramiz',
      'Use A-다고(요), V-ㄴ다고/는다고(요), and N(이)라고(요) to accurately confirm accident, location, cause, injury, and treatment information',
      'Используем A-다고(요), V-ㄴ다고/는다고(요) и N(이)라고(요), чтобы точно уточнять сведения об аварии, месте, причине, травмах и лечении',
    ),
    section: 5,
    unit: 8,
    order: 3,
    isActive: true,
    lessons: [
      {
        title: L(
          '사고가 났다고요?',
          'Avariya bo‘lganini aytyapsizmi?',
          'You Said There Was an Accident?',
          'Вы сказали, что произошла авария?',
        ),
        description: L(
          '이미 들은 과거 사고 소식을 `-았/었다고요?`로 다시 확인하고 사고를 내다와 사고를 당하다의 의미를 구별한다',
          'O‘tgan avariya xabarini `-았/었다고요?` bilan aniqlashtirib, 사고를 내다 va 사고를 당하다ni farqlaymiz',
          'Confirm past accident news with -았/었다고요? and distinguish causing an accident from suffering one',
          'Уточняем прошлые события через -았/었다고요? и различаем 사고를 내다 и 사고를 당하다',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 1,
        questions: [
          's5u8_201_reading_quiz',
          's5u8_202_type_answer',
          's5u8_203_translate_builder',
          's5u8_204_fill_in_blank',
          's5u8_205_word_arrange',
          's5u8_206_type_answer',
          's5u8_207_error_hunt',
          's5u8_208_translate_builder',
          's5u8_209_reading_quiz',
          's5u8_210_fill_in_blank',
          's5u8_211_type_answer',
          's5u8_212_translate_builder',
          's5u8_213_cloze_passage',
          's5u8_214_word_arrange',
          's5u8_215_type_answer',
          's5u8_216_reading_quiz',
          's5u8_217_translate_builder',
          's5u8_218_fill_in_blank',
          's5u8_219_error_hunt',
          's5u8_220_word_arrange',
        ],
      },
      {
        title: L(
          '지금도 위험하다고요?',
          'Hali ham xavfli ekanmi?',
          'You Said It Is Still Dangerous?',
          'Вы сказали, что всё ещё опасно?',
        ),
        description: L(
          '형용사 A-다고요와 현재·미래 행동 동사 V-ㄴ다고/는다고요의 차이를 도로 안전과 병원 상황에서 익힌다',
          'A-다고요 va V-ㄴ다고/는다고요 farqini yo‘l xavfsizligi va kasalxona vaziyatlarida o‘rganamiz',
          'Distinguish adjective A-다고요 from present/future verb V-ㄴ다고/는다고요 in road and hospital situations',
          'Различаем A-다고요 для прилагательных и V-ㄴ다고/는다고요 для действий в дорожных и больничных ситуациях',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 2,
        questions: [
          's5u8_221_reading_quiz',
          's5u8_222_type_answer',
          's5u8_223_translate_builder',
          's5u8_224_fill_in_blank',
          's5u8_225_word_arrange',
          's5u8_226_type_answer',
          's5u8_227_error_hunt',
          's5u8_228_translate_builder',
          's5u8_229_reading_quiz',
          's5u8_230_fill_in_blank',
          's5u8_231_type_answer',
          's5u8_232_translate_builder',
          's5u8_233_cloze_passage',
          's5u8_234_word_arrange',
          's5u8_235_type_answer',
          's5u8_236_reading_quiz',
          's5u8_237_translate_builder',
          's5u8_238_fill_in_blank',
          's5u8_239_error_hunt',
          's5u8_240_word_arrange',
        ],
      },
      {
        title: L(
          '병원이라고요?',
          'Kasalxona ekanmi?',
          'You Said It Is a Hospital?',
          'Вы сказали, что это больница?',
        ),
        description: L(
          '받침 유무에 따라 N이라고요와 N라고요를 구별하고 형용사·동사·명사 형태를 함께 비교한다',
          'Oxirgi undoshga qarab N이라고요 va N라고요ni farqlab, sifat, fe’l va ot shakllarini taqqoslaymiz',
          'Distinguish N이라고요 and N라고요 according to the final consonant and compare noun, verb, and adjective forms',
          'Различаем N이라고요 и N라고요 по конечной согласной и сравниваем формы существительных, глаголов и прилагательных',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 3,
        questions: [
          's5u8_241_reading_quiz',
          's5u8_242_type_answer',
          's5u8_243_translate_builder',
          's5u8_244_fill_in_blank',
          's5u8_245_word_arrange',
          's5u8_246_type_answer',
          's5u8_247_error_hunt',
          's5u8_248_translate_builder',
          's5u8_249_reading_quiz',
          's5u8_250_fill_in_blank',
          's5u8_251_type_answer',
          's5u8_252_translate_builder',
          's5u8_253_cloze_passage',
          's5u8_254_word_arrange',
          's5u8_255_type_answer',
          's5u8_256_reading_quiz',
          's5u8_257_translate_builder',
          's5u8_258_fill_in_blank',
          's5u8_259_error_hunt',
          's5u8_260_word_arrange',
        ],
      },
      {
        title: L(
          '다리가 부러졌다고요?',
          'Oyog‘i singanini aytyapsizmi?',
          'You Said the Leg Was Broken?',
          'Вы сказали, что нога сломана?',
        ),
        description: L(
          '교통사고 뒤의 부상, 깁스, 수술, 입원과 퇴원 소식을 시제에 맞는 형태로 정확하게 확인한다',
          'Avariyadan keyingi jarohat, gips, operatsiya, kasalxonaga yotish va chiqish xabarlarini zamonga mos aniqlashtiramiz',
          'Accurately confirm injury, cast, surgery, hospitalization, and discharge information using the correct tense',
          'Точно уточняем сведения о травмах, гипсе, операции, госпитализации и выписке с правильным временем',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 4,
        questions: [
          's5u8_261_reading_quiz',
          's5u8_262_type_answer',
          's5u8_263_translate_builder',
          's5u8_264_fill_in_blank',
          's5u8_265_word_arrange',
          's5u8_266_type_answer',
          's5u8_267_error_hunt',
          's5u8_268_translate_builder',
          's5u8_269_reading_quiz',
          's5u8_270_fill_in_blank',
          's5u8_271_type_answer',
          's5u8_272_translate_builder',
          's5u8_273_cloze_passage',
          's5u8_274_word_arrange',
          's5u8_275_type_answer',
          's5u8_276_reading_quiz',
          's5u8_277_translate_builder',
          's5u8_278_fill_in_blank',
          's5u8_279_error_hunt',
          's5u8_280_word_arrange',
        ],
      },
      {
        title: L(
          '사고 소식을 정확히 확인해요',
          'Avariya xabarini aniq tekshiramiz',
          'Confirm Accident News Accurately',
          'Точно уточняем сведения об аварии',
        ),
        description: L(
          'A-다고요, V-ㄴ다고/는다고요, N(이)라고요와 과거형을 종합해 사고 발생, 도로 상태, 장소, 부상과 치료 계획을 정확하게 확인한다',
          'A-다고요, V-ㄴ다고/는다고요, N(이)라고요 va o‘tgan shakllarni birlashtirib avariya, yo‘l, joy, jarohat va davolanish ma’lumotlarini aniqlashtiramiz',
          'Integrate adjective, verb, noun, and past reported forms to confirm accident events, road conditions, locations, injuries, and treatment plans',
          'Объединяем формы после прилагательных, глаголов, существительных и прошедшего времени для точного уточнения аварии, места, травм и лечения',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 5,
        questions: [
          's5u8_281_reading_quiz',
          's5u8_282_type_answer',
          's5u8_283_translate_builder',
          's5u8_284_fill_in_blank',
          's5u8_285_word_arrange',
          's5u8_286_type_answer',
          's5u8_287_error_hunt',
          's5u8_288_translate_builder',
          's5u8_289_reading_quiz',
          's5u8_290_fill_in_blank',
          's5u8_291_type_answer',
          's5u8_292_translate_builder',
          's5u8_293_cloze_passage',
          's5u8_294_word_arrange',
          's5u8_295_type_answer',
          's5u8_296_reading_quiz',
          's5u8_297_translate_builder',
          's5u8_298_fill_in_blank',
          's5u8_299_error_hunt',
          's5u8_300_word_arrange',
        ],
      },
    ],
  },
  {
    title: L(
      '아무리 조심해도 사고가 날 수 있어요',
      'Qanchalik ehtiyot bo‘lsangiz ham avariya bo‘lishi mumkin',
      'An Accident Can Happen No Matter How Careful You Are',
      'Авария может произойти, как бы осторожны вы ни были',
    ),
    description: L(
      '아무리 A/V-아도/어도를 사용해 조건이나 정도가 매우 커도 뒤의 결과, 안전 원칙이나 필요한 행동이 바뀌지 않는 상황을 표현한다',
      '아무리 A/V-아도/어도 orqali shart yoki daraja kuchli bo‘lsa ham natija va xavfsizlik qoidasi o‘zgarmasligini ifodalaymiz',
      'Use 아무리 A/V-아도/어도 to express that a result, safety principle, or necessary action remains unchanged regardless of degree or condition',
      'Используем 아무리 A/V-아도/어도, чтобы показать, что результат, правило безопасности или необходимое действие не меняется независимо от степени или условия',
    ),
    section: 5,
    unit: 8,
    order: 4,
    isActive: true,
    lessons: [
      {
        title: L(
          '아무리 조심해도 사고가 날 수 있어요',
          'Qanchalik ehtiyot bo‘lsangiz ham avariya bo‘lishi mumkin',
          'An Accident Can Happen No Matter How Careful You Are',
          'Авария может произойти, как бы осторожны вы ни были',
        ),
        description: L(
          '아무리 A/V-아도/어도의 핵심 의미를 교통사고, 신호, 안전벨트 상황에서 익힌다',
          'Grammatikaning asosiy ma’nosini avariya, signal va xavfsizlik kamari vaziyatlarida o‘rganamiz',
          'Learn the core meaning through accidents, traffic signals, and seat-belt situations',
          'Изучаем основное значение на ситуациях с авариями, сигналами и ремнями безопасности',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 1,
        questions: [
          's5u8_301_reading_quiz',
          's5u8_302_type_answer',
          's5u8_303_translate_builder',
          's5u8_304_fill_in_blank',
          's5u8_305_word_arrange',
          's5u8_306_type_answer',
          's5u8_307_error_hunt',
          's5u8_308_translate_builder',
          's5u8_309_reading_quiz',
          's5u8_310_fill_in_blank',
          's5u8_311_type_answer',
          's5u8_312_translate_builder',
          's5u8_313_cloze_passage',
          's5u8_314_word_arrange',
          's5u8_315_type_answer',
          's5u8_316_reading_quiz',
          's5u8_317_translate_builder',
          's5u8_318_fill_in_blank',
          's5u8_319_error_hunt',
          's5u8_320_word_arrange',
        ],
      },
      {
        title: L(
          '아무리 바빠도 안전이 먼저예요',
          'Qanchalik band bo‘lsangiz ham xavfsizlik birinchi',
          'Safety Comes First No Matter How Busy You Are',
          'Безопасность важнее, как бы вы ни спешили',
        ),
        description: L(
          '늦다, 가깝다, 없다 같은 다양한 형용사와 동사의 -아도/어도 활용을 안전 운전 상황에서 연습한다',
          'Turli sifat va fe’llarning -아도/어도 shaklini xavfsiz haydash vaziyatlarida mashq qilamiz',
          'Practise -아도/어도 conjugation with varied adjectives and verbs in safe-driving situations',
          'Практикуем формы -아도/어도 с разными глаголами и прилагательными в дорожных ситуациях',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 2,
        questions: [
          's5u8_321_reading_quiz',
          's5u8_322_type_answer',
          's5u8_323_translate_builder',
          's5u8_324_fill_in_blank',
          's5u8_325_word_arrange',
          's5u8_326_type_answer',
          's5u8_327_error_hunt',
          's5u8_328_translate_builder',
          's5u8_329_reading_quiz',
          's5u8_330_fill_in_blank',
          's5u8_331_type_answer',
          's5u8_332_translate_builder',
          's5u8_333_cloze_passage',
          's5u8_334_word_arrange',
          's5u8_335_type_answer',
          's5u8_336_reading_quiz',
          's5u8_337_translate_builder',
          's5u8_338_fill_in_blank',
          's5u8_339_error_hunt',
          's5u8_340_word_arrange',
        ],
      },
      {
        title: L(
          '아무리 아파도 무리하면 안 돼요',
          'Qanchalik og‘risa ham o‘zingizni zo‘riqtirmang',
          'Do Not Overexert Yourself No Matter How You Feel',
          'Не перенапрягайтесь, даже если очень хотите быстрее восстановиться',
        ),
        description: L(
          '사고 뒤 부상, 깁스, 치료와 퇴원 상황에서 아무리 -아도/어도를 사용해 안전한 판단을 연습한다',
          'Jarohat, gips, davolanish va kasalxonadan chiqish vaziyatlarida grammatikani xavfsiz qaror bilan bog‘laymiz',
          'Apply the grammar to injury, casts, treatment, and discharge decisions after accidents',
          'Применяем грамматику к травмам, гипсу, лечению и выписке после аварии',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 3,
        questions: [
          's5u8_341_reading_quiz',
          's5u8_342_type_answer',
          's5u8_343_translate_builder',
          's5u8_344_fill_in_blank',
          's5u8_345_word_arrange',
          's5u8_346_type_answer',
          's5u8_347_error_hunt',
          's5u8_348_translate_builder',
          's5u8_349_reading_quiz',
          's5u8_350_fill_in_blank',
          's5u8_351_type_answer',
          's5u8_352_translate_builder',
          's5u8_353_cloze_passage',
          's5u8_354_word_arrange',
          's5u8_355_type_answer',
          's5u8_356_reading_quiz',
          's5u8_357_translate_builder',
          's5u8_358_fill_in_blank',
          's5u8_359_error_hunt',
          's5u8_360_word_arrange',
        ],
      },
      {
        title: L(
          '조건이 커져도 결과는 같아요',
          'Shart kuchaysa ham natija bir xil',
          'The Result Stays the Same',
          'Условие сильнее, а результат тот же',
        ),
        description: L(
          '아무리 -아도/어도의 강조 의미를 일반 대조 표현과 비교하고 동사·형용사 활용을 정확히 구별한다',
          '아무리 -아도/어도ning kuchli ma’nosini oddiy qarama-qarshilik bilan taqqoslab, fe’l va sifat shakllarini farqlaymiz',
          'Compare the emphatic concessive meaning with ordinary contrast and distinguish verb and adjective forms',
          'Сравниваем усиленное уступительное значение с обычным противопоставлением и различаем формы глаголов и прилагательных',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 4,
        questions: [
          's5u8_361_reading_quiz',
          's5u8_362_type_answer',
          's5u8_363_translate_builder',
          's5u8_364_fill_in_blank',
          's5u8_365_word_arrange',
          's5u8_366_type_answer',
          's5u8_367_error_hunt',
          's5u8_368_translate_builder',
          's5u8_369_reading_quiz',
          's5u8_370_fill_in_blank',
          's5u8_371_type_answer',
          's5u8_372_translate_builder',
          's5u8_373_cloze_passage',
          's5u8_374_word_arrange',
          's5u8_375_type_answer',
          's5u8_376_reading_quiz',
          's5u8_377_translate_builder',
          's5u8_378_fill_in_blank',
          's5u8_379_error_hunt',
          's5u8_380_word_arrange',
        ],
      },
      {
        title: L(
          '어떤 상황이어도 안전은 지켜야 해요',
          'Har qanday vaziyatda ham xavfsizlikka rioya qilamiz',
          'Safety Rules Still Apply in Any Situation',
          'Правила безопасности действуют в любой ситуации',
        ),
        description: L(
          'Unit 8의 교통사고, 과속, 음주 운전, 신호, 부상과 치료 어휘를 아무리 -아도/어도와 통합해 실제 판단을 연습한다',
          'Unit 8 lug‘atini 아무리 -아도/어도 bilan birlashtirib haqiqiy xavfsizlik va davolanish qarorlarini mashq qilamiz',
          'Integrate Unit 8 accident, speeding, drunk-driving, signal, injury, and treatment vocabulary with 아무리 -아도/어도',
          'Объединяем лексику Unit 8 об авариях, скорости, алкоголе, сигналах, травмах и лечении с 아무리 -아도/어도',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 5,
        questions: [
          's5u8_381_reading_quiz',
          's5u8_382_type_answer',
          's5u8_383_translate_builder',
          's5u8_384_fill_in_blank',
          's5u8_385_word_arrange',
          's5u8_386_type_answer',
          's5u8_387_error_hunt',
          's5u8_388_translate_builder',
          's5u8_389_reading_quiz',
          's5u8_390_fill_in_blank',
          's5u8_391_type_answer',
          's5u8_392_translate_builder',
          's5u8_393_cloze_passage',
          's5u8_394_word_arrange',
          's5u8_395_type_answer',
          's5u8_396_reading_quiz',
          's5u8_397_translate_builder',
          's5u8_398_fill_in_blank',
          's5u8_399_error_hunt',
          's5u8_400_word_arrange',
        ],
      },
    ],
  },
  {
    title: L(
      '많이 다치지 않아야 할 텐데요',
      'Qattiq jarohatlanmagan bo‘lishi kerak edi',
      'I Hope They Were Not Badly Injured',
      'Надеюсь, травмы не серьёзные',
    ),
    description: L(
      'A/V-아야/어야 할 텐데(요)를 사용해 사고와 치료의 아직 확실하지 않은 결과를 걱정하거나, 앞으로 필요한 조건과 행동을 예상한다',
      'A/V-아야/어야 할 텐데(요) orqali avariya va davolanish natijasiga xavotir bildiramiz hamda kelajakdagi kerakli shart va harakatlarni taxmin qilamiz',
      'Use A/V-아야/어야 할 텐데(요) to express concern about uncertain accident and treatment outcomes and to anticipate necessary conditions or actions',
      'Используем A/V-아야/어야 할 텐데(요), чтобы выражать беспокойство о результате аварии и лечения и предполагать необходимые условия или действия',
    ),
    section: 5,
    unit: 8,
    order: 5,
    isActive: true,
    lessons: [
      {
        title: L(
          '많이 다치지 않아야 할 텐데요',
          'Qattiq jarohatlanmagan bo‘lishini umid qilaman',
          'I Hope They Were Not Badly Injured',
          'Надеюсь, травмы не серьёзные',
        ),
        description: L(
          '사고 소식을 들은 뒤 부상 정도, 수술 결과와 회복 상태에 대한 걱정과 바람을 표현한다',
          'Avariya xabaridan keyin jarohat, operatsiya va tiklanish haqida umid va xavotir bildiramiz',
          'Express concern and hope about injuries, surgery results, and recovery after hearing accident news',
          'Выражаем беспокойство и надежду относительно травм, операции и восстановления после аварии',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 1,
        questions: [
          's5u8_401_reading_quiz',
          's5u8_402_type_answer',
          's5u8_403_translate_builder',
          's5u8_404_fill_in_blank',
          's5u8_405_word_arrange',
          's5u8_406_type_answer',
          's5u8_407_error_hunt',
          's5u8_408_translate_builder',
          's5u8_409_reading_quiz',
          's5u8_410_fill_in_blank',
          's5u8_411_type_answer',
          's5u8_412_translate_builder',
          's5u8_413_cloze_passage',
          's5u8_414_word_arrange',
          's5u8_415_type_answer',
          's5u8_416_reading_quiz',
          's5u8_417_translate_builder',
          's5u8_418_fill_in_blank',
          's5u8_419_error_hunt',
          's5u8_420_word_arrange',
        ],
      },
      {
        title: L(
          '퇴원하려면 상태가 좋아야 할 텐데요',
          'Chiqish uchun ahvol yaxshi bo‘lishi kerak',
          'The Condition Should Be Good Enough for Discharge',
          'Для выписки состояние должно быть хорошим',
        ),
        description: L(
          '퇴원, 수술, 깁스와 문병 계획을 위해 앞으로 필요할 것으로 예상되는 조건이나 정보를 표현한다',
          'Kasalxonadan chiqish, operatsiya, gips va tashrif uchun kerak bo‘ladigan shartlarni ifodalaymiz',
          'Express conditions or information expected to be necessary for discharge, surgery, casts, and hospital visits',
          'Выражаем условия и информацию, которые понадобятся для выписки, операции, гипса и посещения больного',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 2,
        questions: [
          's5u8_421_reading_quiz',
          's5u8_422_type_answer',
          's5u8_423_translate_builder',
          's5u8_424_fill_in_blank',
          's5u8_425_word_arrange',
          's5u8_426_type_answer',
          's5u8_427_error_hunt',
          's5u8_428_translate_builder',
          's5u8_429_reading_quiz',
          's5u8_430_fill_in_blank',
          's5u8_431_type_answer',
          's5u8_432_translate_builder',
          's5u8_433_cloze_passage',
          's5u8_434_word_arrange',
          's5u8_435_type_answer',
          's5u8_436_reading_quiz',
          's5u8_437_translate_builder',
          's5u8_438_fill_in_blank',
          's5u8_439_error_hunt',
          's5u8_440_word_arrange',
        ],
      },
      {
        title: L(
          '문병을 가기 전에 연락해야 할 텐데요',
          'Bemorni ko‘rishdan oldin bog‘lanish kerak',
          'We Should Contact Them Before Visiting',
          'Перед посещением нужно связаться',
        ),
        description: L(
          '교재의 문병하기 기능에 맞춰 병원, 면회 시간, 친구 상태와 방문 준비를 실제 상황으로 연습한다',
          'Darslikdagi bemorni ko‘rish mavzusiga mos ravishda kasalxona, tashrif va bemorning holatini mashq qilamiz',
          'Practise hospital visiting, visiting hours, the friend’s condition, and preparation in realistic situations',
          'Практикуем посещение больного, часы посещения, состояние друга и подготовку к визиту',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 3,
        questions: [
          's5u8_441_reading_quiz',
          's5u8_442_type_answer',
          's5u8_443_translate_builder',
          's5u8_444_fill_in_blank',
          's5u8_445_word_arrange',
          's5u8_446_type_answer',
          's5u8_447_error_hunt',
          's5u8_448_translate_builder',
          's5u8_449_reading_quiz',
          's5u8_450_fill_in_blank',
          's5u8_451_type_answer',
          's5u8_452_translate_builder',
          's5u8_453_cloze_passage',
          's5u8_454_word_arrange',
          's5u8_455_type_answer',
          's5u8_456_reading_quiz',
          's5u8_457_translate_builder',
          's5u8_458_fill_in_blank',
          's5u8_459_error_hunt',
          's5u8_460_word_arrange',
        ],
      },
      {
        title: L(
          '해야 해요와 해야 할 텐데요',
          '해야 해요 va 해야 할 텐데요',
          '해야 해요 vs 해야 할 텐데요',
          '해야 해요 и 해야 할 텐데요',
        ),
        description: L(
          '확실한 규칙이나 직접적인 필요를 나타내는 -아야/어야 해요와 예상·걱정을 포함하는 -아야/어야 할 텐데요를 구별한다',
          'Bevosita majburiyatni bildiruvchi -아야/어야 해요 va taxmin-xavotirli -아야/어야 할 텐데요ni farqlaymiz',
          'Distinguish direct necessity with -아야/어야 해요 from anticipated necessity or concern with -아야/어야 할 텐데요',
          'Различаем прямую необходимость -아야/어야 해요 и предполагаемую необходимость или беспокойство -아야/어야 할 텐데요',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 4,
        questions: [
          's5u8_461_reading_quiz',
          's5u8_462_type_answer',
          's5u8_463_translate_builder',
          's5u8_464_fill_in_blank',
          's5u8_465_word_arrange',
          's5u8_466_type_answer',
          's5u8_467_error_hunt',
          's5u8_468_translate_builder',
          's5u8_469_reading_quiz',
          's5u8_470_fill_in_blank',
          's5u8_471_type_answer',
          's5u8_472_translate_builder',
          's5u8_473_cloze_passage',
          's5u8_474_word_arrange',
          's5u8_475_type_answer',
          's5u8_476_reading_quiz',
          's5u8_477_translate_builder',
          's5u8_478_fill_in_blank',
          's5u8_479_error_hunt',
          's5u8_480_word_arrange',
        ],
      },
      {
        title: L(
          '사고부터 문병까지',
          'Avariyadan bemorni ko‘rishgacha',
          'From the Accident to the Hospital Visit',
          'От аварии до посещения больного',
        ),
        description: L(
          'Unit 8에서 배운 사고, 안전 운전, 사고 소식, 부상과 치료, 문병 어휘와 네 문법을 실제 흐름으로 통합한다',
          'Unit 8dagi avariya, xavfsizlik, xabar, jarohat, davolanish va tashrif lug‘ati hamda grammatikasini birlashtiramiz',
          'Integrate Unit 8 accident, road-safety, accident-news, injury, treatment, and hospital-visit language into a realistic flow',
          'Объединяем лексику и грамматику Unit 8 об авариях, безопасности, травмах, лечении и посещении больного',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 5,
        questions: [
          's5u8_481_reading_quiz',
          's5u8_482_type_answer',
          's5u8_483_translate_builder',
          's5u8_484_fill_in_blank',
          's5u8_485_word_arrange',
          's5u8_486_type_answer',
          's5u8_487_error_hunt',
          's5u8_488_translate_builder',
          's5u8_489_reading_quiz',
          's5u8_490_fill_in_blank',
          's5u8_491_type_answer',
          's5u8_492_translate_builder',
          's5u8_493_cloze_passage',
          's5u8_494_word_arrange',
          's5u8_495_type_answer',
          's5u8_496_reading_quiz',
          's5u8_497_translate_builder',
          's5u8_498_fill_in_blank',
          's5u8_499_error_hunt',
          's5u8_500_word_arrange',
        ],
      },
    ],
  },
];
