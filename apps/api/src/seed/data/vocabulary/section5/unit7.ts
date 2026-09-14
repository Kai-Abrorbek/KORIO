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
    'Choose the expression that fits the blank.',
    'Выберите выражение, подходящее для пропуска.',
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
  prompt: ReturnType<typeof L>,
  expectedMeaning: string,
  tags: string[],
  difficulty = 4,
) => ({
  type: 'type_answer' as const,
  level: QuestionLevel.LEVEL_5,
  lessonCategory: LessonCategory.VOCABULARY,
  instruction: I.typeAnswer,
  answer,
  answerTranslation: prompt,
  grading: exactGrading(expectedMeaning),
  difficulty,
  tags,
  xpReward: 25,
  isActive: true,
});

const translateBuilder = (
  instruction: ReturnType<typeof L>,
  options: string[],
  answer: string,
  answerTranslation: ReturnType<typeof L>,
  tags: string[],
  difficulty = 4,
) => ({
  type: 'translate_builder' as const,
  level: QuestionLevel.LEVEL_5,
  lessonCategory: LessonCategory.VOCABULARY,
  instruction,
  options,
  answer,
  answerTranslation,
  difficulty,
  tags,
  xpReward: 20,
  isActive: true,
});

const wordArrange = (
  options: string[],
  answer: string,
  answerTranslation: ReturnType<typeof L>,
  tags: string[],
  difficulty = 4,
) => ({
  type: 'word_arrange' as const,
  level: QuestionLevel.LEVEL_5,
  lessonCategory: LessonCategory.VOCABULARY,
  instruction: I.arrange,
  options,
  answer,
  answerTranslation,
  difficulty,
  tags,
  xpReward: 20,
  isActive: true,
});

const fillBlank = (
  sentenceTemplate: string,
  blankAnswers: string[],
  options: string[],
  answerTranslation: ReturnType<typeof L>,
  tags: string[],
  difficulty = 4,
) => ({
  type: 'fill_in_blank' as const,
  level: QuestionLevel.LEVEL_5,
  lessonCategory: LessonCategory.VOCABULARY,
  instruction: I.fillBlank,
  sentenceTemplate,
  blankAnswers,
  options,
  answerTranslation,
  difficulty,
  tags,
  xpReward: 20,
  isActive: true,
});

const readingQuiz = (
  passage: string,
  question: string,
  options: string[],
  answer: string,
  answerTranslation: ReturnType<typeof L>,
  tags: string[],
  difficulty = 4,
) => ({
  type: 'reading_quiz' as const,
  level: QuestionLevel.LEVEL_5,
  lessonCategory: LessonCategory.VOCABULARY,
  instruction: I.reading,
  passage,
  question,
  options,
  answer,
  answerTranslation,
  difficulty,
  tags,
  xpReward: 25,
  isActive: true,
});

const errorHunt = (
  npcText: string,
  wrongWord: string,
  options: string[],
  answer: string,
  answerTranslation: ReturnType<typeof L>,
  tags: string[],
  difficulty = 4,
) => ({
  type: 'error_hunt' as const,
  level: QuestionLevel.LEVEL_5,
  lessonCategory: LessonCategory.VOCABULARY,
  instruction: I.error,
  npcText,
  wrongWord,
  options,
  answer,
  answerTranslation,
  difficulty,
  tags,
  xpReward: 25,
  isActive: true,
});

const clozePassage = (
  passage: string,
  blankAnswers: string[],
  options: string[],
  answerTranslation: ReturnType<typeof L>,
  tags: string[],
  difficulty = 5,
) => ({
  type: 'cloze_passage' as const,
  level: QuestionLevel.LEVEL_5,
  lessonCategory: LessonCategory.VOCABULARY,
  instruction: I.cloze,
  passage,
  blankAnswers,
  options,
  answerTranslation,
  difficulty,
  tags,
  xpReward: 25,
  isActive: true,
});

const grammarTypeAnswer = (
  answer: string,
  prompt: ReturnType<typeof L>,
  expectedMeaning: string,
  targetExpressions: string[],
  tags: string[],
  acceptedAnswers: string[] = [],
  difficulty = 5,
) => ({
  type: 'type_answer' as const,
  level: QuestionLevel.LEVEL_5,
  lessonCategory: LessonCategory.GRAMMAR,
  instruction: I.typeAnswer,
  answer,
  answerTranslation: prompt,
  grading: {
    mode: 'targetExpression' as const,
    expectedMeaning,
    targetExpressions,
    acceptedAnswers,
    tolerance: {
      punctuation: true,
      spacing: true,
      minorTypos: true,
    },
  },
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

export const S5_UNIT7_WORDS = [
  {
    code: 'device-strange-noise',
    korean: '이상한 소리가 나다',
    senseKey: 'device-make-strange-noise',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '기계나 전자 제품에서 평소와 다른 소리가 들리다',
      'qurilma yoki elektron jihozdan g‘alati ovoz chiqmoq',
      'to make a strange noise',
      'издавать странный звук',
    ),
    examples: [
      {
        korean: '냉장고에서 이상한 소리가 나요.',
        translations: L(
          '냉장고에서 평소와 다른 소리가 들려요.',
          'Muzlatkichdan g‘alati ovoz chiqyapti.',
          'The refrigerator is making a strange noise.',
          'Холодильник издаёт странный звук.',
        ),
      },
    ],
    pronunciation: {
      hangul: '이상한 소리가 나다',
      romanization: 'isanghan soriga nada',
      ttsText: '이상한 소리가 나다',
    },
    media: { emoji: '🔊' },
    tags: ['breakdown', 'symptom', 'sound'],
    difficulty: 4,
    isCore: true,
  },
  {
    code: 'washer-spin-not-work',
    korean: '탈수가 안 되다',
    senseKey: 'washer-spin-cycle-not-work',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '세탁기의 탈수 기능이 작동하지 않다',
      'kir yuvish mashinasining siqish funksiyasi ishlamaslik',
      'for the spin cycle not to work',
      'не работать в режиме отжима',
    ),
    examples: [
      {
        korean: '세탁기는 돌아가는데 탈수가 안 돼요.',
        translations: L(
          '세탁기는 작동하지만 탈수 기능은 작동하지 않아요.',
          'Kir yuvish mashinasi ishlaydi, lekin siqish ishlamaydi.',
          'The washing machine runs, but the spin cycle does not work.',
          'Стиральная машина работает, но отжим не включается.',
        ),
      },
    ],
    pronunciation: {
      hangul: '탈수가 안 되다',
      romanization: 'talsuga an doeda',
      ttsText: '탈수가 안 되다',
    },
    media: { emoji: '🧺' },
    tags: ['breakdown', 'washing-machine'],
    difficulty: 4,
    isCore: true,
  },
  {
    code: 'phone-call-disconnect',
    korean: '전화가 끊기다',
    senseKey: 'phone-call-disconnect',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '통화 중 전화 연결이 중간에 끊어지다',
      'telefon orqali gaplashayotganda aloqa uzilmoq',
      'for a phone call to get disconnected',
      'телефонная связь обрывается',
    ),
    examples: [
      {
        korean: '통화하다가 전화가 자꾸 끊겨요.',
        translations: L(
          '통화 중에 전화 연결이 계속 끊어져요.',
          'Gaplashayotganimda aloqa tez-tez uzilib qoladi.',
          'The call keeps getting disconnected while I am talking.',
          'Во время разговора связь постоянно обрывается.',
        ),
      },
    ],
    pronunciation: {
      hangul: '전화가 끊기다',
      romanization: 'jeonhwaga kkeunkida',
      ttsText: '전화가 끊기다',
    },
    media: { emoji: '📵' },
    tags: ['breakdown', 'phone'],
    difficulty: 4,
    isCore: true,
  },
  {
    code: 'vegetables-freeze',
    korean: '채소가 얼다',
    senseKey: 'vegetables-freeze',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '냉장고 안의 채소가 너무 차가워져 얼어 버리다',
      'muzlatkichdagi sabzavot muzlab qolmoq',
      'for vegetables to freeze',
      'овощи замерзают',
    ),
    examples: [
      {
        korean: '냉장고 온도가 너무 낮아서 채소가 얼었어요.',
        translations: L(
          '냉장고가 너무 차가워서 채소가 얼었어요.',
          'Muzlatkich juda sovuq bo‘lgani uchun sabzavot muzlab qoldi.',
          'The vegetables froze because the refrigerator was too cold.',
          'Овощи замёрзли, потому что в холодильнике было слишком холодно.',
        ),
      },
    ],
    pronunciation: {
      hangul: '채소가 얼다',
      romanization: 'chaesoga eolda',
      ttsText: '채소가 얼다',
    },
    media: { emoji: '🥬' },
    tags: ['breakdown', 'refrigerator'],
    difficulty: 4,
    isCore: true,
  },
  {
    code: 'temperature-control-not-work',
    korean: '온도 조절이 안 되다',
    senseKey: 'temperature-control-not-work',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '기기의 온도를 원하는 대로 바꿀 수 없다',
      'qurilma haroratini kerakli darajada sozlab bo‘lmaslik',
      'for temperature control not to work',
      'не работать регулировке температуры',
    ),
    examples: [
      {
        korean: '에어컨은 켜지는데 온도 조절이 안 돼요.',
        translations: L(
          '에어컨 전원은 들어오지만 온도를 바꿀 수 없어요.',
          'Konditsioner yonadi, lekin haroratni sozlab bo‘lmaydi.',
          'The air conditioner turns on, but the temperature cannot be adjusted.',
          'Кондиционер включается, но температуру нельзя отрегулировать.',
        ),
      },
    ],
    pronunciation: {
      hangul: '온도 조절이 안 되다',
      romanization: 'ondo jojeori an doeda',
      ttsText: '온도 조절이 안 되다',
    },
    media: { emoji: '🌡️' },
    tags: ['breakdown', 'temperature'],
    difficulty: 4,
    isCore: true,
  },
  {
    code: 'screen-not-display',
    korean: '화면이 안 나오다',
    senseKey: 'screen-not-display',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '기기는 켜져 있지만 화면에 영상이 나타나지 않다',
      'qurilma yoqilgan bo‘lsa ham ekranda tasvir chiqmaslik',
      'for the screen not to display anything',
      'на экране ничего не отображается',
    ),
    examples: [
      {
        korean: '텔레비전 전원을 켰는데 화면이 안 나와요.',
        translations: L(
          '텔레비전을 켰지만 화면에 영상이 보이지 않아요.',
          'Televizorni yoqdim, lekin ekranda tasvir chiqmayapti.',
          'I turned on the television, but nothing appears on the screen.',
          'Я включил телевизор, но на экране ничего нет.',
        ),
      },
    ],
    pronunciation: {
      hangul: '화면이 안 나오다',
      romanization: 'hwamyeoni an naoda',
      ttsText: '화면이 안 나오다',
    },
    media: { emoji: '📺' },
    tags: ['breakdown', 'screen'],
    difficulty: 4,
    isCore: true,
  },
  {
    code: 'display-stop-working',
    korean: '액정이 나가다',
    senseKey: 'display-stop-working',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '휴대폰 등의 액정 화면이 고장 나서 제대로 보이지 않다',
      'telefon kabi qurilmaning displeyi ishdan chiqmoq',
      'for an LCD display to stop working',
      'дисплей выходит из строя',
    ),
    examples: [
      {
        korean: '휴대폰을 떨어뜨려서 액정이 나갔어요.',
        translations: L(
          '휴대폰을 떨어뜨린 뒤 액정 화면이 고장 났어요.',
          'Telefonni tushirib yuborganim uchun displey ishdan chiqdi.',
          'The display stopped working after I dropped my phone.',
          'После того как я уронил телефон, дисплей вышел из строя.',
        ),
      },
    ],
    pronunciation: {
      hangul: '액정이 나가다',
      romanization: 'aekjeongi nagada',
      ttsText: '액정이 나가다',
    },
    media: { emoji: '📱' },
    tags: ['breakdown', 'phone', 'screen'],
    difficulty: 4,
    isCore: true,
  },
  {
    code: 'paper-jam',
    korean: '종이가 걸리다',
    senseKey: 'paper-jam',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '프린터나 복사기 안에 종이가 끼어 움직이지 않다',
      'printer yoki nusxa ko‘chirish qurilmasida qog‘oz tiqilib qolmoq',
      'for paper to get jammed',
      'бумага застревает',
    ),
    examples: [
      {
        korean: '복사기 안에 종이가 걸렸어요.',
        translations: L(
          '복사기 안에 종이가 끼어서 움직이지 않아요.',
          'Nusxa ko‘chirish qurilmasida qog‘oz tiqilib qoldi.',
          'Paper is jammed inside the copy machine.',
          'В копировальном аппарате застряла бумага.',
        ),
      },
    ],
    pronunciation: {
      hangul: '종이가 걸리다',
      romanization: 'jongiga geollida',
      ttsText: '종이가 걸리다',
    },
    media: { emoji: '🖨️' },
    tags: ['breakdown', 'printer'],
    difficulty: 4,
    isCore: true,
  },
  {
    code: 'drop-into-water',
    korean: '물에 빠뜨리다',
    senseKey: 'drop-object-into-water',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '물건을 실수로 물속에 떨어지게 하다',
      'buyumni tasodifan suvga tushirib yubormoq',
      'to drop something into water',
      'уронить что-либо в воду',
    ),
    examples: [
      {
        korean: '휴대폰을 물에 빠뜨렸어요.',
        translations: L(
          '실수로 휴대폰을 물속에 떨어뜨렸어요.',
          'Telefonimni tasodifan suvga tushirib yubordim.',
          'I dropped my phone into water.',
          'Я уронил телефон в воду.',
        ),
      },
    ],
    pronunciation: {
      hangul: '물에 빠뜨리다',
      romanization: 'mure ppateurida',
      ttsText: '물에 빠뜨리다',
    },
    media: { emoji: '💧' },
    tags: ['breakdown', 'cause'],
    difficulty: 4,
    isCore: true,
  },
  {
    code: 'drop-on-ground',
    korean: '땅에 떨어뜨리다',
    senseKey: 'drop-object-on-ground',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '들고 있던 물건을 실수로 땅에 떨어지게 하다',
      'ushlab turgan buyumni tasodifan yerga tushirib yubormoq',
      'to drop something on the ground',
      'уронить что-либо на землю',
    ),
    examples: [
      {
        korean: '카메라를 땅에 떨어뜨린 뒤 작동하지 않아요.',
        translations: L(
          '카메라를 땅에 떨어뜨린 뒤부터 작동하지 않아요.',
          'Kamerani yerga tushirib yuborgandan keyin u ishlamay qoldi.',
          'The camera has not worked since I dropped it on the ground.',
          'Камера не работает после того, как я уронил её на землю.',
        ),
      },
    ],
    pronunciation: {
      hangul: '땅에 떨어뜨리다',
      romanization: 'ttange tteoreotteurida',
      ttsText: '땅에 떨어뜨리다',
    },
    media: { emoji: '💥' },
    tags: ['breakdown', 'cause'],
    difficulty: 4,
    isCore: true,
  },
  {
    code: 'spill-drink',
    korean: '음료수를 쏟다',
    senseKey: 'spill-drink',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '컵이나 병의 음료수가 밖으로 흘러나오게 하다',
      'ichimlikni to‘kib yubormoq',
      'to spill a drink',
      'пролить напиток',
    ),
    examples: [
      {
        korean: '노트북에 음료수를 쏟았어요.',
        translations: L(
          '노트북 위에 음료수가 흘러 버렸어요.',
          'Noutbuk ustiga ichimlik to‘kib yubordim.',
          'I spilled a drink on the laptop.',
          'Я пролил напиток на ноутбук.',
        ),
      },
    ],
    pronunciation: {
      hangul: '음료수를 쏟다',
      romanization: 'eumnyosureul ssotda',
      ttsText: '음료수를 쏟다',
    },
    media: { emoji: '🥤' },
    tags: ['breakdown', 'cause'],
    difficulty: 4,
    isCore: true,
  },
  {
    code: 'dust-accumulate',
    korean: '먼지가 끼다',
    senseKey: 'dust-accumulate',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '물건의 안이나 표면에 먼지가 쌓이다',
      'buyumning ichi yoki yuzasiga chang yig‘ilmoq',
      'for dust to accumulate',
      'покрываться пылью',
    ),
    examples: [
      {
        korean: '컴퓨터 안에 먼지가 많이 꼈어요.',
        translations: L(
          '컴퓨터 내부에 먼지가 많이 쌓였어요.',
          'Kompyuter ichida juda ko‘p chang yig‘ilib qolgan.',
          'A lot of dust has accumulated inside the computer.',
          'Внутри компьютера скопилось много пыли.',
        ),
      },
    ],
    pronunciation: {
      hangul: '먼지가 끼다',
      romanization: 'meonjiga kkida',
      ttsText: '먼지가 끼다',
    },
    media: { emoji: '🌫️' },
    tags: ['breakdown', 'cause'],
    difficulty: 4,
    isCore: true,
  },
  {
    code: 'turn-power-on',
    korean: '전원을 켜다',
    senseKey: 'turn-power-on',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '기계나 전자 제품이 작동하도록 전기를 켜다',
      'qurilma ishlashi uchun quvvatni yoqmoq',
      'to turn the power on',
      'включить питание',
    ),
    examples: [
      {
        korean: '먼저 전원을 켜 보세요.',
        translations: L(
          '먼저 기기의 전원을 켜 보세요.',
          'Avval qurilmaning quvvatini yoqib ko‘ring.',
          'Try turning the power on first.',
          'Сначала попробуйте включить питание.',
        ),
      },
    ],
    pronunciation: {
      hangul: '전원을 켜다',
      romanization: 'jeonwoneul kyeoda',
      ttsText: '전원을 켜다',
    },
    media: { emoji: '🔛' },
    tags: ['device-operation', 'power'],
    difficulty: 4,
    isCore: true,
  },
  {
    code: 'turn-power-off',
    korean: '전원을 끄다',
    senseKey: 'turn-power-off',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '기계나 전자 제품의 작동을 멈추도록 전기를 끄다',
      'qurilma ishlashini to‘xtatish uchun quvvatni o‘chirmoq',
      'to turn the power off',
      'выключить питание',
    ),
    examples: [
      {
        korean: '전원을 껐다가 다시 켜 보세요.',
        translations: L(
          '기기를 한 번 끈 뒤 다시 켜 보세요.',
          'Qurilmani o‘chirib, keyin yana yoqib ko‘ring.',
          'Turn it off and then turn it back on.',
          'Выключите устройство, а затем снова включите.',
        ),
      },
    ],
    pronunciation: {
      hangul: '전원을 끄다',
      romanization: 'jeonwoneul kkeuda',
      ttsText: '전원을 끄다',
    },
    media: { emoji: '⏻' },
    tags: ['device-operation', 'power'],
    difficulty: 4,
    isCore: true,
  },
  {
    code: 'plug-in',
    korean: '플러그를 꽂다',
    senseKey: 'plug-into-outlet',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '전기를 연결하기 위해 플러그를 콘센트에 넣다',
      'elektrni ulash uchun vilkani rozetkaga tiqmoq',
      'to plug in a plug',
      'вставить вилку в розетку',
    ),
    examples: [
      {
        korean: '플러그가 빠져 있으면 다시 꽂아 보세요.',
        translations: L(
          '플러그가 빠져 있으면 콘센트에 다시 연결하세요.',
          'Vilka chiqib ketgan bo‘lsa, yana rozetkaga tiqib ko‘ring.',
          'If the plug is disconnected, plug it in again.',
          'Если вилка вынута, снова вставьте её в розетку.',
        ),
      },
    ],
    pronunciation: {
      hangul: '플러그를 꽂다',
      romanization: 'peulleogeureul kkotda',
      ttsText: '플러그를 꽂다',
    },
    media: { emoji: '🔌' },
    tags: ['device-operation', 'plug'],
    difficulty: 4,
    isCore: true,
  },
  {
    code: 'unplug',
    korean: '플러그를 빼다',
    senseKey: 'unplug-from-outlet',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '전기 연결을 끊기 위해 플러그를 콘센트에서 꺼내다',
      'elektr aloqasini uzish uchun vilkani rozetkadan chiqarmoq',
      'to unplug',
      'вынуть вилку из розетки',
    ),
    examples: [
      {
        korean: '청소하기 전에 플러그를 빼세요.',
        translations: L(
          '청소를 시작하기 전에 전기 플러그를 분리하세요.',
          'Tozalashdan oldin vilkani rozetkadan chiqaring.',
          'Unplug it before cleaning.',
          'Перед чисткой выньте вилку из розетки.',
        ),
      },
    ],
    pronunciation: {
      hangul: '플러그를 빼다',
      romanization: 'peulleogeureul ppaeda',
      ttsText: '플러그를 빼다',
    },
    media: { emoji: '🔌' },
    tags: ['device-operation', 'plug'],
    difficulty: 4,
    isCore: true,
  },
  {
    code: 'turn-faucet-on',
    korean: '수돗물을 틀다',
    senseKey: 'turn-faucet-on',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '수도꼭지를 열어 물이 나오게 하다',
      'jo‘mrakni ochib suv oqizmoq',
      'to turn on the tap',
      'открыть кран',
    ),
    examples: [
      {
        korean: '세탁기를 확인하기 전에 수돗물을 틀어 보세요.',
        translations: L(
          '세탁기에 물이 들어가도록 수도꼭지를 열어 보세요.',
          'Kir yuvish mashinasiga suv kirishi uchun jo‘mrakni ochib ko‘ring.',
          'Turn on the tap so water can enter the washing machine.',
          'Откройте кран, чтобы вода поступала в стиральную машину.',
        ),
      },
    ],
    pronunciation: {
      hangul: '수돗물을 틀다',
      romanization: 'sudonmureul teulda',
      ttsText: '수돗물을 틀다',
    },
    media: { emoji: '🚰' },
    tags: ['device-operation', 'water'],
    difficulty: 4,
    isCore: true,
  },
  {
    code: 'turn-faucet-off',
    korean: '수돗물을 잠그다',
    senseKey: 'turn-faucet-off',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '수도꼭지를 닫아 물이 나오지 않게 하다',
      'jo‘mrakni yopib suv oqishini to‘xtatmoq',
      'to turn off the tap',
      'закрыть кран',
    ),
    examples: [
      {
        korean: '물이 새면 먼저 수돗물을 잠그세요.',
        translations: L(
          '물이 새는 경우 먼저 수도꼭지를 닫으세요.',
          'Suv sizsa, avval jo‘mrakni yoping.',
          'If water is leaking, turn off the tap first.',
          'Если течёт вода, сначала закройте кран.',
        ),
      },
    ],
    pronunciation: {
      hangul: '수돗물을 잠그다',
      romanization: 'sudonmureul jamgeuda',
      ttsText: '수돗물을 잠그다',
    },
    media: { emoji: '🚱' },
    tags: ['device-operation', 'water'],
    difficulty: 4,
    isCore: true,
  },
  {
    code: 'start-engine',
    korean: '시동을 걸다',
    senseKey: 'start-engine',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '자동차 등의 엔진이 작동하도록 시작하다',
      'avtomobil dvigatelini ishga tushirmoq',
      'to start an engine',
      'завести двигатель',
    ),
    examples: [
      {
        korean: '차에 시동을 걸었는데 이상한 소리가 났어요.',
        translations: L(
          '자동차 엔진을 켜자 평소와 다른 소리가 났어요.',
          'Mashinaning dvigatelini ishga tushirganimda g‘alati ovoz chiqdi.',
          'When I started the car, it made a strange noise.',
          'Когда я завёл машину, появился странный звук.',
        ),
      },
    ],
    pronunciation: {
      hangul: '시동을 걸다',
      romanization: 'sidongeul geolda',
      ttsText: '시동을 걸다',
    },
    media: { emoji: '🚗' },
    tags: ['device-operation', 'car'],
    difficulty: 4,
    isCore: true,
  },
  {
    code: 'stop-engine',
    korean: '시동을 끄다',
    senseKey: 'stop-engine',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '자동차 등의 엔진 작동을 멈추다',
      'avtomobil dvigatelini o‘chirmoq',
      'to turn off an engine',
      'заглушить двигатель',
    ),
    examples: [
      {
        korean: '차를 세운 뒤 시동을 껐어요.',
        translations: L(
          '자동차를 세우고 엔진을 껐어요.',
          'Mashinani to‘xtatib, dvigatelni o‘chirdim.',
          'I stopped the car and turned off the engine.',
          'Я остановил машину и заглушил двигатель.',
        ),
      },
    ],
    pronunciation: {
      hangul: '시동을 끄다',
      romanization: 'sidongeul kkeuda',
      ttsText: '시동을 끄다',
    },
    media: { emoji: '🅿️' },
    tags: ['device-operation', 'car'],
    difficulty: 4,
    isCore: true,
  },
  {
    code: 'device-break-down-particle',
    korean: '고장이 나다',
    senseKey: 'device-break-down',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '기계나 전자 제품에 문제가 생겨 제대로 작동하지 않다',
      'qurilma buzilib, to‘g‘ri ishlamay qolmoq',
      'to break down',
      'сломаться',
    ),
    examples: [
      {
        korean: '휴대폰이 갑자기 고장이 났어요.',
        translations: L(
          '휴대폰에 갑자기 문제가 생겨 작동하지 않아요.',
          'Telefonim birdan buzilib qoldi.',
          'My phone suddenly broke down.',
          'Мой телефон внезапно сломался.',
        ),
      },
    ],
    pronunciation: {
      hangul: '고장이 나다',
      romanization: 'gojangi nada',
      ttsText: '고장이 나다',
    },
    media: { emoji: '🛠️' },
    tags: ['breakdown', 'repair'],
    difficulty: 4,
    isCore: true,
  },
  {
    code: 'repair-center',
    korean: '수리 센터',
    senseKey: 'repair-center',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '고장 난 제품을 검사하고 고치는 곳',
      'buzilgan mahsulotlarni tekshiradigan va tuzatadigan markaz',
      'repair center',
      'сервисный центр',
    ),
    examples: [
      {
        korean: '휴대폰을 수리 센터에 가져갔어요.',
        translations: L(
          '고장 난 휴대폰을 고치기 위해 수리 센터에 갔어요.',
          'Telefonni tuzatish uchun servis markaziga olib bordim.',
          'I took my phone to a repair center.',
          'Я отнёс телефон в сервисный центр.',
        ),
      },
    ],
    pronunciation: {
      hangul: '수리 센터',
      romanization: 'suri senteo',
      ttsText: '수리 센터',
    },
    media: { emoji: '🏢' },
    tags: ['repair', 'service'],
    difficulty: 4,
    isCore: true,
  },
  {
    code: 'repair-technician',
    korean: '수리 기사',
    senseKey: 'repair-technician',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '고장 난 기계나 제품을 전문적으로 고치는 사람',
      'buzilgan qurilmalarni professional ravishda tuzatadigan mutaxassis',
      'repair technician',
      'мастер по ремонту',
    ),
    examples: [
      {
        korean: '수리 기사가 세탁기를 확인했어요.',
        translations: L(
          '수리 기사가 고장 난 세탁기를 살펴봤어요.',
          'Ta’mirlash ustasi kir yuvish mashinasini tekshirdi.',
          'The repair technician checked the washing machine.',
          'Мастер проверил стиральную машину.',
        ),
      },
    ],
    pronunciation: {
      hangul: '수리 기사',
      romanization: 'suri gisa',
      ttsText: '수리 기사',
    },
    media: { emoji: '🧑‍🔧' },
    tags: ['repair', 'person'],
    difficulty: 4,
    isCore: true,
  },
  {
    code: 'repair-request',
    korean: '수리 신청',
    senseKey: 'repair-request',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '고장 난 제품을 고쳐 달라고 정식으로 요청하는 것',
      'buzilgan mahsulotni tuzatishni rasmiy ravishda so‘rash',
      'repair request',
      'заявка на ремонт',
    ),
    examples: [
      {
        korean: '수리 센터에 수리 신청을 했어요.',
        translations: L(
          '제품을 고쳐 달라고 수리 센터에 신청했어요.',
          'Servis markaziga ta’mirlash uchun ariza berdim.',
          'I submitted a repair request to the service center.',
          'Я подал заявку на ремонт в сервисный центр.',
        ),
      },
    ],
    pronunciation: {
      hangul: '수리 신청',
      romanization: 'suri sincheong',
      ttsText: '수리 신청',
    },
    media: { emoji: '📝' },
    tags: ['repair', 'request'],
    difficulty: 4,
    isCore: true,
  },
  {
    code: 'receive-repair-request',
    korean: '접수하다',
    senseKey: 'receive-service-request',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '신청이나 요청을 받아 공식적으로 처리하기 시작하다',
      'ariza yoki so‘rovni qabul qilib, rasmiy ishlov berishni boshlamoq',
      'to receive and register a request',
      'принять и зарегистрировать заявку',
    ),
    examples: [
      {
        korean: '수리 신청을 바로 접수해 드리겠습니다.',
        translations: L(
          '수리 요청을 지금 바로 받아 처리하겠습니다.',
          'Ta’mirlash so‘rovingizni hozir ro‘yxatdan o‘tkazamiz.',
          'We will register your repair request right away.',
          'Мы сразу зарегистрируем вашу заявку на ремонт.',
        ),
      },
    ],
    pronunciation: {
      hangul: '접수하다',
      romanization: 'jeopsuhada',
      ttsText: '접수하다',
    },
    media: { emoji: '📋' },
    tags: ['repair', 'service'],
    difficulty: 4,
    isCore: true,
  },
  {
    code: 'repair-device',
    korean: '수리하다',
    senseKey: 'repair-device',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '고장 난 기계나 제품을 다시 정상적으로 작동하게 고치다',
      'buzilgan qurilmani yana normal ishlaydigan qilib tuzatmoq',
      'to repair',
      'ремонтировать',
    ),
    examples: [
      {
        korean: '고장 난 복사기를 수리했어요.',
        translations: L(
          '작동하지 않던 복사기를 고쳤어요.',
          'Buzilgan nusxa ko‘chirish apparatini tuzatdim.',
          'I repaired the broken copy machine.',
          'Я отремонтировал сломанный копировальный аппарат.',
        ),
      },
    ],
    pronunciation: {
      hangul: '수리하다',
      romanization: 'surihada',
      ttsText: '수리하다',
    },
    media: { emoji: '🔧' },
    tags: ['repair', 'action'],
    difficulty: 4,
    isCore: true,
  },
  {
    code: 'replace-part',
    korean: '교체하다',
    senseKey: 'replace-part',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '고장 나거나 오래된 부품을 다른 것으로 바꾸다',
      'buzilgan yoki eski qismni boshqasiga almashtirmoq',
      'to replace',
      'заменить',
    ),
    examples: [
      {
        korean: '고장 난 부품을 새것으로 교체했어요.',
        translations: L(
          '문제가 있는 부품을 새로운 부품으로 바꿨어요.',
          'Buzilgan qismni yangisiga almashtirdim.',
          'I replaced the broken part with a new one.',
          'Я заменил сломанную деталь новой.',
        ),
      },
    ],
    pronunciation: {
      hangul: '교체하다',
      romanization: 'gyochehada',
      ttsText: '교체하다',
    },
    media: { emoji: '🔩' },
    tags: ['repair', 'replacement'],
    difficulty: 5,
    isCore: true,
  },
  {
    code: 'user-manual',
    korean: '사용 설명서',
    senseKey: 'user-manual',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '제품을 사용하는 방법과 주의 사항을 설명한 글',
      'mahsulotdan foydalanish usuli va ehtiyot choralarini tushuntiradigan qo‘llanma',
      'user manual',
      'инструкция по эксплуатации',
    ),
    examples: [
      {
        korean: '고장이라고 생각하기 전에 사용 설명서를 확인해 보세요.',
        translations: L(
          '제품이 고장 났다고 생각하기 전에 설명서를 읽어 보세요.',
          'Qurilma buzildi deb o‘ylashdan oldin qo‘llanmani tekshirib ko‘ring.',
          'Check the user manual before assuming the device is broken.',
          'Прежде чем считать устройство сломанным, проверьте инструкцию.',
        ),
      },
    ],
    pronunciation: {
      hangul: '사용 설명서',
      romanization: 'sayong seolmyeongseo',
      ttsText: '사용 설명서',
    },
    media: { emoji: '📖' },
    tags: ['repair', 'manual'],
    difficulty: 4,
    isCore: true,
  },
] satisfies readonly WordSeedEntry[];

export const S5_UNIT7_QUESTIONS = {
  // ══════════════════════════════════════════════════════════
  // Section 5 · Unit 7 · Node 1
  // 고장 증상과 기본 대처
  // ══════════════════════════════════════════════════════════

  // ──────────────────────────────────────────────────────────
  // Lesson 1 · 어떤 문제가 생겼어요?
  // 증상을 보고 정확한 고장 표현을 구별한다.
  // ──────────────────────────────────────────────────────────

  s5u7_001_reading_quiz: readingQuiz(
    '민수 씨가 텔레비전을 켰습니다. 소리는 정상적으로 들리지만 화면에는 아무것도 보이지 않습니다.',
    '텔레비전의 문제는 무엇이에요?',
    [
      '화면이 안 나와요.',
      '전화가 끊겨요.',
      '종이가 걸렸어요.',
      '탈수가 안 돼요.',
    ],
    '화면이 안 나와요.',
    L(
      '소리는 들리지만 화면에 영상이 보이지 않는 상황이에요.',
      'Ovoz eshitiladi, lekin ekranda tasvir yo‘q.',
      'The sound works, but nothing appears on the screen.',
      'Звук есть, но изображение на экране не появляется.',
    ),
    ['screen', 'symptom'],
  ),

  s5u7_002_type_answer: vocabTypeAnswer(
    '화면이 안 나오다',
    L(
      '기기는 켜져 있지만 화면에 영상이 나타나지 않는 상태',
      'Qurilma yoqilgan, lekin ekranda tasvir chiqmaydigan holat',
      'A device is on, but nothing appears on its screen',
      'Устройство включено, но на экране ничего не отображается',
    ),
    'The learner must write the Korean vocabulary expression meaning that a screen does not display anything.',
    ['screen', 'type-answer'],
  ),

  s5u7_003_translate_builder: translateBuilder(
    L(
      '텔레비전에서 평소와 다른 소리가 들린다고 말하기',
      'Televizordan g‘alati ovoz chiqayotganini ayting.',
      'Say that the television is making a strange noise.',
      'Скажите, что телевизор издаёт странный звук.',
    ),
    [
      '이상한 소리가',
      '텔레비전에서',
      '나요',
      '화면을',
      '종이가',
      '수리 센터에',
    ],
    '텔레비전에서 이상한 소리가 나요',
    L(
      '텔레비전에서 평소와 다른 소리가 들려요.',
      'Televizordan g‘alati ovoz chiqyapti.',
      'The television is making a strange noise.',
      'Телевизор издаёт странный звук.',
    ),
    ['sound', 'breakdown'],
  ),

  s5u7_004_fill_in_blank: fillBlank(
    '세탁기는 돌아가는데 ___가 안 돼요.',
    ['탈수'],
    ['세탁', '탈수', '화면', '통화', '전원'],
    L(
      '세탁기는 작동하지만 탈수 기능이 작동하지 않아요.',
      'Kir yuvish mashinasi ishlaydi, lekin siqish funksiyasi ishlamaydi.',
      'The washing machine runs, but the spin cycle does not work.',
      'Стиральная машина работает, но отжим не работает.',
    ),
    ['washing-machine', 'symptom'],
  ),

  s5u7_005_word_arrange: wordArrange(
    [
      '자꾸',
      '통화하다가',
      '전화가 끊겨요',
      '종이가 걸려요',
      '채소를 얼려요',
      '전원을 꽂아요',
    ],
    '통화하다가 자꾸 전화가 끊겨요',
    L(
      '통화 중에 전화 연결이 계속 끊어져요.',
      'Gaplashayotganda telefon aloqasi tez-tez uziladi.',
      'The call keeps getting disconnected while I am talking.',
      'Во время разговора связь постоянно обрывается.',
    ),
    ['phone', 'symptom'],
  ),

  s5u7_006_type_answer: vocabTypeAnswer(
    '전화가 끊기다',
    L(
      '통화 중에 연결이 중간에 자꾸 끝나는 상태',
      'Suhbat paytida telefon aloqasi tez-tez uzilib qoladigan holat',
      'A phone connection repeatedly disconnects during a call',
      'Телефонная связь постоянно обрывается во время разговора',
    ),
    'The learner must write the Korean vocabulary expression meaning that a phone call gets disconnected.',
    ['phone', 'type-answer'],
  ),

  s5u7_007_error_hunt: errorHunt(
    '냉장고 온도가 너무 낮아서 채소가 끊겼어요.',
    '끊겼어요.',
    ['얼었어요.', '녹았어요.', '걸렸어요.', '나갔어요.'],
    '얼었어요.',
    L(
      '온도가 너무 낮으면 채소는 얼 수 있어요.',
      'Harorat juda past bo‘lsa, sabzavot muzlashi mumkin.',
      'Vegetables can freeze when the temperature is too low.',
      'При слишком низкой температуре овощи могут замёрзнуть.',
    ),
    ['refrigerator', 'word-choice'],
  ),

  s5u7_008_translate_builder: translateBuilder(
    L(
      '냉장고 안의 채소가 얼었다고 말하기',
      'Muzlatkichdagi sabzavot muzlab qolganini ayting.',
      'Say that the vegetables in the refrigerator froze.',
      'Скажите, что овощи в холодильнике замёрзли.',
    ),
    ['냉장고에서', '채소가', '얼었어요', '전화가', '종이를', '수리했어요'],
    '냉장고에서 채소가 얼었어요',
    L(
      '냉장고가 너무 차가워서 채소가 얼었어요.',
      'Muzlatkich juda sovuq bo‘lgani uchun sabzavot muzladi.',
      'The vegetables froze in the refrigerator.',
      'Овощи замёрзли в холодильнике.',
    ),
    ['refrigerator', 'freeze'],
  ),

  s5u7_009_reading_quiz: readingQuiz(
    '에어컨 전원은 정상적으로 들어옵니다. 하지만 온도를 18도로 바꾸어도 방이 시원해지지 않고 설정 온도도 바뀌지 않습니다.',
    '가장 알맞은 고장 설명은 무엇이에요?',
    [
      '온도 조절이 안 돼요.',
      '액정이 나갔어요.',
      '전화가 끊겨요.',
      '종이가 걸렸어요.',
    ],
    '온도 조절이 안 돼요.',
    L(
      '에어컨은 켜지지만 원하는 온도로 조절할 수 없어요.',
      'Konditsioner yonadi, lekin haroratni kerakli darajada sozlab bo‘lmaydi.',
      'The air conditioner turns on, but its temperature cannot be adjusted.',
      'Кондиционер включается, но температуру нельзя отрегулировать.',
    ),
    ['temperature', 'symptom'],
  ),

  s5u7_010_fill_in_blank: fillBlank(
    '에어컨은 켜지는데 ___ 조절이 안 돼요.',
    ['온도'],
    ['화면', '온도', '종이', '전화', '액정'],
    L(
      '에어컨의 온도를 원하는 대로 바꿀 수 없어요.',
      'Konditsioner haroratini kerakli darajada o‘zgartirib bo‘lmaydi.',
      'The air conditioner temperature cannot be adjusted.',
      'Температуру кондиционера нельзя отрегулировать.',
    ),
    ['temperature', 'breakdown'],
  ),

  s5u7_011_type_answer: vocabTypeAnswer(
    '온도 조절이 안 되다',
    L(
      '기기의 온도를 원하는 값으로 바꿀 수 없는 상태',
      'Qurilma haroratini kerakli qiymatga o‘zgartirib bo‘lmaydigan holat',
      'A device temperature cannot be adjusted to the desired setting',
      'Температуру устройства невозможно установить на нужное значение',
    ),
    'The learner must write the Korean vocabulary expression meaning that temperature control does not work.',
    ['temperature', 'type-answer'],
  ),

  s5u7_012_translate_builder: translateBuilder(
    L(
      '복사기 안에 종이가 끼어 움직이지 않는다고 말하기',
      'Nusxa ko‘chirish qurilmasida qog‘oz tiqilib qolganini ayting.',
      'Say that paper is jammed in the copy machine.',
      'Скажите, что в копировальном аппарате застряла бумага.',
    ),
    ['복사기에', '종이가', '걸렸어요', '전화를', '액정이', '얼었어요'],
    '복사기에 종이가 걸렸어요',
    L(
      '복사기 내부에 종이가 끼었어요.',
      'Nusxa ko‘chirish qurilmasida qog‘oz tiqilib qoldi.',
      'Paper is jammed in the copy machine.',
      'В копировальном аппарате застряла бумага.',
    ),
    ['printer', 'paper-jam'],
  ),

  s5u7_013_cloze_passage: clozePassage(
    '복사를 하려고 했는데 복사기가 멈췄습니다. 안을 확인해 보니 ___가 ___ 있었습니다.',
    ['종이', '걸려'],
    ['걸려', '종이', '전화', '얼어', '액정'],
    L(
      '복사기 안에 종이가 걸려서 작동을 멈춘 상황이에요.',
      'Qog‘oz tiqilib qolgani uchun nusxa ko‘chirish qurilmasi to‘xtagan.',
      'The copy machine stopped because paper was jammed inside.',
      'Копировальный аппарат остановился из-за застрявшей бумаги.',
    ),
    ['printer', 'context'],
  ),

  s5u7_014_word_arrange: wordArrange(
    ['휴대폰', '액정이', '갑자기 나갔어요', '탈수가', '채소를', '복사기에'],
    '휴대폰 액정이 갑자기 나갔어요',
    L(
      '휴대폰의 화면 부품이 갑자기 고장 났어요.',
      'Telefon displeyi birdan ishdan chiqdi.',
      'The phone display suddenly stopped working.',
      'Дисплей телефона внезапно вышел из строя.',
    ),
    ['phone', 'display'],
  ),

  s5u7_015_type_answer: vocabTypeAnswer(
    '액정이 나가다',
    L(
      '휴대폰 등의 디스플레이가 고장 나 제대로 보이지 않는 상태',
      'Telefon kabi qurilmaning displeyi buzilib, to‘g‘ri ko‘rinmaydigan holat',
      'A phone or device display stops working properly',
      'Дисплей телефона или другого устройства выходит из строя',
    ),
    'The learner must write the Korean vocabulary expression meaning that an LCD display has stopped working.',
    ['phone', 'display', 'type-answer'],
    5,
  ),

  s5u7_016_reading_quiz: readingQuiz(
    '복사 버튼을 눌렀지만 기계가 멈췄습니다. 화면에는 종이를 확인하라는 표시가 나옵니다.',
    '먼저 확인해야 할 가능성이 가장 높은 문제는 무엇이에요?',
    [
      '종이가 걸렸는지 확인해요.',
      '채소가 얼었는지 확인해요.',
      '전화가 끊겼는지 확인해요.',
      '시동이 꺼졌는지 확인해요.',
    ],
    '종이가 걸렸는지 확인해요.',
    L(
      '복사기가 멈추고 종이 확인 표시가 나오면 종이 걸림을 먼저 확인해요.',
      'Qurilma to‘xtab qog‘oz belgisi chiqsa, avval qog‘oz tiqilganini tekshiriladi.',
      'A paper warning on a stopped copier suggests checking for a paper jam first.',
      'Если копир остановился и показывает предупреждение о бумаге, сначала проверяют замятие.',
    ),
    ['printer', 'problem-solving'],
    5,
  ),

  s5u7_017_translate_builder: translateBuilder(
    L(
      '세탁기는 작동하지만 탈수 기능은 작동하지 않는다고 말하기',
      'Kir yuvish mashinasi ishlaydi, lekin siqish funksiyasi ishlamasligini ayting.',
      'Say that the washing machine works, but the spin cycle does not.',
      'Скажите, что стиральная машина работает, но отжим не работает.',
    ),
    [
      '세탁기는 돌아가는데',
      '탈수가',
      '안 돼요',
      '전화는 끊기고',
      '종이를',
      '켜요',
    ],
    '세탁기는 돌아가는데 탈수가 안 돼요',
    L(
      '기계 전체가 멈춘 것이 아니라 탈수 기능에 문제가 있어요.',
      'Butun qurilma emas, aynan siqish funksiyasida muammo bor.',
      'The problem is specifically with the spin function, not the whole machine.',
      'Проблема именно в функции отжима, а не во всей машине.',
    ),
    ['washing-machine', 'symptom'],
    5,
  ),

  s5u7_018_fill_in_blank: fillBlank(
    '텔레비전은 소리가 나는데 ___이 안 나와요.',
    ['화면'],
    ['전화', '화면', '탈수', '종이', '온도'],
    L(
      '소리는 정상인데 화면에 영상이 보이지 않아요.',
      'Ovoz normal, lekin ekranda tasvir yo‘q.',
      'The sound works normally, but there is no picture on the screen.',
      'Звук работает нормально, но изображения на экране нет.',
    ),
    ['screen', 'contrast'],
  ),

  s5u7_019_error_hunt: errorHunt(
    '통화할 때마다 전화가 얼어요.',
    '얼어요.',
    ['끊겨요.', '걸려요.', '나가요.', '쏟아요.'],
    '끊겨요.',
    L(
      '통화 연결이 중간에 끝나는 문제에는 `전화가 끊기다`를 써요.',
      'Telefon aloqasi uzilishi uchun `전화가 끊기다` ishlatiladi.',
      'Use 전화가 끊기다 when a call connection gets disconnected.',
      'Для обрыва телефонной связи используется 전화가 끊기다.',
    ),
    ['phone', 'word-choice'],
  ),

  s5u7_020_word_arrange: wordArrange(
    [
      '여러 번',
      '전화가 끊겨서',
      '통화를 계속하기 어려워요',
      '채소를',
      '종이가',
      '전원을 얼려서',
    ],
    '여러 번 전화가 끊겨서 통화를 계속하기 어려워요',
    L(
      '전화 연결이 반복해서 끊겨 통화를 이어 가기 어려워요.',
      'Aloqa qayta-qayta uzilgani uchun suhbatni davom ettirish qiyin.',
      'The call disconnects repeatedly, making it difficult to continue talking.',
      'Связь постоянно обрывается, поэтому продолжать разговор трудно.',
    ),
    ['phone', 'context'],
    5,
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 2 · 왜 고장이 났어요?
  // 고장의 원인과 결과를 연결한다.
  // ──────────────────────────────────────────────────────────

  s5u7_021_reading_quiz: readingQuiz(
    '지수 씨는 카페에서 노트북을 사용하다가 실수로 커피를 쏟았습니다. 그 뒤부터 키보드가 제대로 작동하지 않습니다.',
    '노트북에 문제가 생긴 원인은 무엇이에요?',
    [
      '음료수를 쏟았어요.',
      '종이가 걸렸어요.',
      '채소가 얼었어요.',
      '플러그를 뺐어요.',
    ],
    '음료수를 쏟았어요.',
    L(
      '노트북에 커피를 쏟은 뒤 키보드에 문제가 생겼어요.',
      'Noutbuk ustiga qahva to‘kilgandan keyin klaviaturada muammo paydo bo‘ldi.',
      'The keyboard problem started after coffee was spilled on the laptop.',
      'Проблема с клавиатурой появилась после того, как на ноутбук пролили кофе.',
    ),
    ['cause', 'spill'],
  ),

  s5u7_022_type_answer: vocabTypeAnswer(
    '음료수를 쏟다',
    L(
      '컵이나 병의 음료가 실수로 밖으로 흘러나오게 하다',
      'Ichimlikni tasodifan to‘kib yubormoq',
      'To accidentally spill a drink',
      'Случайно пролить напиток',
    ),
    'The learner must write the Korean vocabulary expression meaning to spill a drink.',
    ['spill', 'type-answer'],
  ),

  s5u7_023_translate_builder: translateBuilder(
    L(
      '노트북 위에 음료를 쏟았다고 말하기',
      'Noutbuk ustiga ichimlik to‘kib yuborganingizni ayting.',
      'Say that you spilled a drink on the laptop.',
      'Скажите, что вы пролили напиток на ноутбук.',
    ),
    ['노트북에', '음료수를', '쏟았어요', '종이를', '전원을', '얼렸어요'],
    '노트북에 음료수를 쏟았어요',
    L(
      '전자 제품 위에 음료가 흘러 들어간 상황이에요.',
      'Elektron qurilma ustiga ichimlik to‘kilgan holat.',
      'A drink was spilled onto an electronic device.',
      'Напиток был пролит на электронное устройство.',
    ),
    ['cause', 'spill'],
  ),

  s5u7_024_fill_in_blank: fillBlank(
    '휴대폰을 물에 ___ 뒤부터 전원이 안 켜져요.',
    ['빠뜨린'],
    ['빠뜨린', '걸린', '얼린', '꽂은', '잠근'],
    L(
      '휴대폰이 물에 들어간 뒤부터 켜지지 않아요.',
      'Telefon suvga tushganidan keyin yoqilmayapti.',
      'The phone has not turned on since it was dropped into water.',
      'Телефон не включается после того, как его уронили в воду.',
    ),
    ['water-damage', 'cause'],
  ),

  s5u7_025_word_arrange: wordArrange(
    [
      '휴대폰을',
      '물에 빠뜨려서',
      '전원이 안 켜져요',
      '종이에',
      '채소가',
      '전화를 걸어요',
    ],
    '휴대폰을 물에 빠뜨려서 전원이 안 켜져요',
    L(
      '휴대폰을 물에 떨어뜨린 뒤 전원이 들어오지 않아요.',
      'Telefon suvga tushganidan keyin yoqilmayapti.',
      'The phone will not turn on after being dropped into water.',
      'Телефон не включается после падения в воду.',
    ),
    ['water-damage', 'cause-result'],
  ),

  s5u7_026_type_answer: vocabTypeAnswer(
    '물에 빠뜨리다',
    L(
      '물건을 실수로 물속에 떨어지게 하다',
      'Buyumni tasodifan suvga tushirib yubormoq',
      'To accidentally drop an object into water',
      'Случайно уронить предмет в воду',
    ),
    'The learner must write the Korean vocabulary expression meaning to drop an object into water.',
    ['water-damage', 'type-answer'],
  ),

  s5u7_027_error_hunt: errorHunt(
    '휴대폰을 바닥에 쏟아서 액정이 나갔어요.',
    '쏟아서',
    ['떨어뜨려서', '빠뜨려서', '꽂아서', '잠가서'],
    '떨어뜨려서',
    L(
      '바닥에는 물건을 `떨어뜨리다`, 액체는 `쏟다`라고 해요.',
      'Buyumni yerga `떨어뜨리다`, suyuqlikni esa `쏟다` deyiladi.',
      'Use 떨어뜨리다 for dropping an object and 쏟다 for spilling liquid.',
      'Для падения предмета используется 떨어뜨리다, а для жидкости — 쏟다.',
    ),
    ['drop', 'vocabulary-contrast'],
    5,
  ),

  s5u7_028_translate_builder: translateBuilder(
    L(
      '카메라를 땅에 떨어뜨린 뒤 작동하지 않는다고 말하기',
      'Kamerani yerga tushirib yuborgandan keyin ishlamay qolganini ayting.',
      'Say that the camera stopped working after you dropped it on the ground.',
      'Скажите, что камера перестала работать после падения на землю.',
    ),
    [
      '카메라를',
      '땅에 떨어뜨린 뒤',
      '작동하지 않아요',
      '음료수를',
      '수돗물을',
      '채소가 얼어요',
    ],
    '카메라를 땅에 떨어뜨린 뒤 작동하지 않아요',
    L(
      '카메라를 바닥에 떨어뜨린 것이 고장의 원인이에요.',
      'Kameraning yerga tushishi nosozlikka sabab bo‘lgan.',
      'Dropping the camera caused the malfunction.',
      'Причиной неисправности стало падение камеры.',
    ),
    ['drop', 'cause-result'],
    5,
  ),

  s5u7_029_reading_quiz: readingQuiz(
    '컴퓨터 팬 소리가 전보다 훨씬 커졌습니다. 안쪽을 열어 보니 팬과 통풍구에 먼지가 아주 많이 쌓여 있었습니다.',
    '문제의 원인으로 가장 알맞은 것은 무엇이에요?',
    [
      '먼지가 많이 꼈어요.',
      '전화가 끊겼어요.',
      '채소가 얼었어요.',
      '수돗물을 잠갔어요.',
    ],
    '먼지가 많이 꼈어요.',
    L(
      '컴퓨터 안에 쌓인 먼지가 문제와 관련 있어요.',
      'Kompyuter ichida yig‘ilgan chang muammoga bog‘liq.',
      'Dust accumulated inside the computer is related to the problem.',
      'Проблема связана со скопившейся внутри компьютера пылью.',
    ),
    ['dust', 'cause'],
  ),

  s5u7_030_fill_in_blank: fillBlank(
    '컴퓨터 안에 ___가 많이 껴서 청소가 필요해요.',
    ['먼지'],
    ['먼지', '액정', '채소', '전화', '종이'],
    L(
      '컴퓨터 내부에 먼지가 많이 쌓였어요.',
      'Kompyuter ichida juda ko‘p chang yig‘ilgan.',
      'A lot of dust has accumulated inside the computer.',
      'Внутри компьютера скопилось много пыли.',
    ),
    ['dust', 'computer'],
  ),

  s5u7_031_type_answer: vocabTypeAnswer(
    '먼지가 끼다',
    L(
      '물건의 안이나 표면에 먼지가 쌓이는 상태',
      'Buyumning ichi yoki yuzasiga chang yig‘ilib qolishi',
      'Dust accumulates inside or on the surface of something',
      'Пыль скапливается внутри или на поверхности предмета',
    ),
    'The learner must write the Korean vocabulary expression meaning that dust accumulates.',
    ['dust', 'type-answer'],
  ),

  s5u7_032_translate_builder: translateBuilder(
    L(
      '컴퓨터 안에 먼지가 많이 쌓였다고 말하기',
      'Kompyuter ichida juda ko‘p chang yig‘ilganini ayting.',
      'Say that a lot of dust has accumulated inside the computer.',
      'Скажите, что внутри компьютера скопилось много пыли.',
    ),
    [
      '컴퓨터 안에',
      '먼지가',
      '많이 꼈어요',
      '전화가',
      '종이를',
      '전원을 켰어요',
    ],
    '컴퓨터 안에 먼지가 많이 꼈어요',
    L(
      '컴퓨터 내부에 청소가 필요할 정도로 먼지가 쌓였어요.',
      'Kompyuter ichida tozalash kerak bo‘ladigan darajada chang yig‘ilgan.',
      'Enough dust has accumulated inside the computer that it needs cleaning.',
      'Внутри компьютера скопилось столько пыли, что его нужно почистить.',
    ),
    ['dust', 'computer'],
  ),

  s5u7_033_cloze_passage: clozePassage(
    '휴대폰을 여러 번 ___ 뒤 화면 상태가 나빠졌습니다. 어제는 결국 ___이 나가서 화면을 볼 수 없었습니다.',
    ['떨어뜨린', '액정'],
    ['액정', '떨어뜨린', '종이', '쏟은', '탈수'],
    L(
      '반복해서 떨어뜨린 것이 휴대폰 액정 고장으로 이어졌어요.',
      'Telefonni qayta-qayta tushirish displeyning buzilishiga olib keldi.',
      'Repeated drops eventually caused the phone display to fail.',
      'Повторные падения в итоге привели к поломке дисплея.',
    ),
    ['phone', 'cause-result'],
    5,
  ),

  s5u7_034_word_arrange: wordArrange(
    [
      '음료수를 쏟은 뒤',
      '노트북 키보드가',
      '제대로 작동하지 않아요',
      '전화를 끊은 뒤',
      '채소를',
      '수돗물을 틀어요',
    ],
    '음료수를 쏟은 뒤 노트북 키보드가 제대로 작동하지 않아요',
    L(
      '음료를 쏟은 뒤 노트북 키보드에 문제가 생겼어요.',
      'Ichimlik to‘kilgandan keyin noutbuk klaviaturasi to‘g‘ri ishlamayapti.',
      'The laptop keyboard stopped working properly after a drink was spilled.',
      'Клавиатура ноутбука перестала нормально работать после пролитого напитка.',
    ),
    ['spill', 'cause-result'],
    5,
  ),

  s5u7_035_type_answer: vocabTypeAnswer(
    '땅에 떨어뜨리다',
    L(
      '들고 있던 물건을 실수로 바닥이나 땅에 떨어지게 하다',
      'Ushlab turgan buyumni tasodifan yerga tushirib yubormoq',
      'To accidentally drop an object on the ground',
      'Случайно уронить предмет на землю',
    ),
    'The learner must write the Korean vocabulary expression meaning to drop an object on the ground.',
    ['drop', 'type-answer'],
  ),

  s5u7_036_reading_quiz: readingQuiz(
    '노트북은 충전도 되고 화면도 켜집니다. 하지만 커피를 쏟은 뒤부터 몇몇 키가 눌리지 않습니다.',
    '고장의 원인을 가장 정확하게 말한 것은 무엇이에요?',
    [
      '노트북에 음료수를 쏟았어요.',
      '노트북을 물에 빠뜨렸어요.',
      '노트북에 종이가 걸렸어요.',
      '노트북의 온도 조절이 안 돼요.',
    ],
    '노트북에 음료수를 쏟았어요.',
    L(
      '커피를 쏟은 사건과 키보드 문제가 연결되어 있어요.',
      'Qahva to‘kilishi bilan klaviatura muammosi bog‘liq.',
      'The spilled coffee is connected to the keyboard problem.',
      'Проблема с клавиатурой связана с пролитым кофе.',
    ),
    ['spill', 'reading'],
    5,
  ),

  s5u7_037_translate_builder: translateBuilder(
    L(
      '휴대폰을 여러 번 떨어뜨려서 액정이 고장 났다고 말하기',
      'Telefonni bir necha marta tushirib yuborganingiz uchun displey buzilganini ayting.',
      'Say that the display broke because you dropped the phone several times.',
      'Скажите, что дисплей сломался из-за того, что телефон несколько раз падал.',
    ),
    [
      '휴대폰을 여러 번 떨어뜨려서',
      '액정이',
      '나갔어요',
      '종이가',
      '전화가',
      '수돗물을 잠갔어요',
    ],
    '휴대폰을 여러 번 떨어뜨려서 액정이 나갔어요',
    L(
      '휴대폰을 반복해서 떨어뜨린 것이 액정 고장의 원인이에요.',
      'Telefonning qayta-qayta tushishi displey buzilishiga sabab bo‘lgan.',
      'Repeatedly dropping the phone caused the display to fail.',
      'Повторные падения телефона привели к поломке дисплея.',
    ),
    ['phone', 'drop', 'display'],
    5,
  ),

  s5u7_038_fill_in_blank: fillBlank(
    '노트북에 음료수를 ___ 뒤부터 키보드가 이상해요.',
    ['쏟은'],
    ['쏟은', '걸린', '얼은', '잠근', '꽂은'],
    L(
      '음료를 흘린 뒤 노트북 키보드에 문제가 생겼어요.',
      'Ichimlik to‘kilganidan keyin klaviaturada muammo paydo bo‘ldi.',
      'The keyboard developed a problem after a drink was spilled.',
      'После пролитого напитка возникла проблема с клавиатурой.',
    ),
    ['spill', 'cause'],
  ),

  s5u7_039_error_hunt: errorHunt(
    '컴퓨터 안에 먼지가 쏟아서 팬 소리가 커졌어요.',
    '쏟아서',
    ['껴서', '걸려서', '얼어서', '끊겨서'],
    '껴서',
    L(
      '먼지는 `끼다`, 액체는 `쏟다`와 함께 써요.',
      'Chang bilan `끼다`, suyuqlik bilan `쏟다` ishlatiladi.',
      'Use 끼다 with dust and 쏟다 with liquids.',
      'С пылью используется 끼다, а с жидкостью — 쏟다.',
    ),
    ['dust', 'collocation'],
  ),

  s5u7_040_word_arrange: wordArrange(
    [
      '고장의 원인을 설명할 때',
      '무슨 일이 있었는지',
      '구체적으로 말하는 것이 좋아요',
      '전화만',
      '채소를',
      '종이를 수리해요',
    ],
    '고장의 원인을 설명할 때 무슨 일이 있었는지 구체적으로 말하는 것이 좋아요',
    L(
      '수리를 요청할 때는 고장 전에 있었던 일을 구체적으로 설명하면 도움이 돼요.',
      'Ta’mirlash so‘raganda nosozlikdan oldin nima bo‘lganini aniq aytish foydali.',
      'When requesting a repair, it helps to explain clearly what happened before the problem.',
      'При обращении в ремонт полезно подробно объяснить, что произошло до неисправности.',
    ),
    ['repair', 'learning-strategy'],
    5,
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 3 · 먼저 어떻게 해 볼까요?
  // 전원·플러그·수도·시동 조작 표현을 정확히 구별한다.
  // ──────────────────────────────────────────────────────────

  s5u7_041_reading_quiz: readingQuiz(
    '컴퓨터 전원 버튼을 눌러도 아무 반응이 없습니다. 확인해 보니 전기 플러그가 콘센트에서 빠져 있습니다.',
    '먼저 무엇을 해 보는 것이 알맞아요?',
    [
      '플러그를 다시 꽂아요.',
      '수돗물을 틀어요.',
      '시동을 걸어요.',
      '종이를 빼요.',
    ],
    '플러그를 다시 꽂아요.',
    L(
      '전기가 연결되지 않았으므로 플러그를 다시 연결해야 해요.',
      'Elektr ulanmagan, shuning uchun vilkani yana ulash kerak.',
      'The plug is disconnected, so it should be plugged in again.',
      'Вилка отсоединена, поэтому её нужно снова вставить в розетку.',
    ),
    ['plug', 'problem-solving'],
  ),

  s5u7_042_type_answer: vocabTypeAnswer(
    '플러그를 꽂다',
    L(
      '전기를 연결하기 위해 전기 플러그를 콘센트에 넣다',
      'Elektrni ulash uchun vilkani rozetkaga tiqmoq',
      'To insert a plug into an outlet to connect power',
      'Вставить вилку в розетку для подключения питания',
    ),
    'The learner must write the Korean vocabulary expression meaning to plug a plug into an outlet.',
    ['plug', 'type-answer'],
  ),

  s5u7_043_translate_builder: translateBuilder(
    L(
      '플러그가 빠져 있어서 다시 연결했다고 말하기',
      'Vilka chiqib ketgani uchun uni yana ulaganingizni ayting.',
      'Say that you plugged it back in because the plug was disconnected.',
      'Скажите, что вы снова вставили вилку, потому что она была вынута.',
    ),
    [
      '플러그가 빠져 있어서',
      '다시',
      '꽂았어요',
      '수돗물을',
      '시동을',
      '종이가 걸렸어요',
    ],
    '플러그가 빠져 있어서 다시 꽂았어요',
    L(
      '전원 연결이 끊겨 있어 플러그를 다시 연결했어요.',
      'Elektr aloqasi uzilganligi uchun vilkani qayta uladim.',
      'The power connection was disconnected, so I plugged it back in.',
      'Питание было отключено, поэтому я снова вставил вилку.',
    ),
    ['plug', 'device-operation'],
  ),

  s5u7_044_fill_in_blank: fillBlank(
    '기기가 이상하면 전원을 한 번 ___다가 다시 켜 보세요.',
    ['껐다'],
    ['껐다', '걸었다', '틀었다', '쏟았다', '얼었다'],
    L(
      '기기의 전원을 한 번 끈 뒤 다시 켜 보는 기본 대처예요.',
      'Qurilmani bir marta o‘chirib, keyin qayta yoqib ko‘rish usuli.',
      'A basic troubleshooting step is to turn the device off and then on again.',
      'Базовый способ проверки — выключить устройство и снова включить.',
    ),
    ['power', 'troubleshooting'],
    5,
  ),

  s5u7_045_word_arrange: wordArrange(
    [
      '전원을',
      '껐다가',
      '다시 켜 보세요',
      '종이를',
      '물을 쏟고',
      '채소를 꽂으세요',
    ],
    '전원을 껐다가 다시 켜 보세요',
    L(
      '전원을 끈 후 다시 켜서 문제가 해결되는지 확인해요.',
      'Qurilmani o‘chirib, yana yoqib muammo hal bo‘lishini tekshiring.',
      'Turn the power off and back on to see whether the problem is resolved.',
      'Выключите и снова включите питание, чтобы проверить, исчезла ли проблема.',
    ),
    ['power', 'troubleshooting'],
  ),

  s5u7_046_type_answer: vocabTypeAnswer(
    '전원을 끄다',
    L(
      '전자 제품이나 기계의 작동을 멈추도록 전기를 끄다',
      'Elektron qurilma yoki mashina ishlashini to‘xtatish uchun quvvatni o‘chirmoq',
      'To turn off the power of a device or machine',
      'Выключить питание устройства или машины',
    ),
    'The learner must write the Korean vocabulary expression meaning to turn a device power off.',
    ['power', 'type-answer'],
  ),

  s5u7_047_error_hunt: errorHunt(
    '컴퓨터를 사용하기 전에 플러그를 잠그세요.',
    '잠그세요.',
    ['꽂으세요.', '켜세요.', '거세요.', '쏟으세요.'],
    '꽂으세요.',
    L(
      '플러그는 콘센트에 `꽂다`라고 해요.',
      'Vilka rozetkaga `꽂다` qilinadi.',
      'Use 꽂다 for inserting a plug into an outlet.',
      'Для вилки и розетки используется 꽂다.',
    ),
    ['plug', 'collocation'],
  ),

  s5u7_048_translate_builder: translateBuilder(
    L(
      '청소하기 전에 전기 플러그를 분리하라고 말하기',
      'Tozalashdan oldin vilkani rozetkadan chiqarishni ayting.',
      'Tell someone to unplug the device before cleaning it.',
      'Скажите, чтобы перед чисткой устройство отключили от розетки.',
    ),
    [
      '청소하기 전에',
      '플러그를',
      '빼세요',
      '시동을',
      '수돗물을',
      '액정이 나갔어요',
    ],
    '청소하기 전에 플러그를 빼세요',
    L(
      '청소 전에 전기 연결을 끊으라는 안전 안내예요.',
      'Tozalashdan oldin elektr aloqasini uzish haqidagi xavfsizlik ko‘rsatmasi.',
      'This is a safety instruction to disconnect power before cleaning.',
      'Это инструкция по безопасности: перед чисткой нужно отключить питание.',
    ),
    ['plug', 'safety'],
  ),

  s5u7_049_reading_quiz: readingQuiz(
    '세탁기에 물이 들어오지 않습니다. 전원과 플러그에는 문제가 없습니다. 확인해 보니 수도꼭지가 닫혀 있습니다.',
    '다음으로 해야 할 일은 무엇이에요?',
    [
      '수돗물을 틀어요.',
      '수돗물을 잠가요.',
      '시동을 걸어요.',
      '플러그를 빼요.',
    ],
    '수돗물을 틀어요.',
    L(
      '세탁기에 물이 들어오게 하려면 수도꼭지를 열어야 해요.',
      'Kir yuvish mashinasiga suv kirishi uchun jo‘mrakni ochish kerak.',
      'The tap must be opened so water can enter the washing machine.',
      'Чтобы вода поступала в стиральную машину, нужно открыть кран.',
    ),
    ['water', 'washing-machine'],
  ),

  s5u7_050_fill_in_blank: fillBlank(
    '세탁기에 물이 들어오지 않으면 먼저 수돗물을 ___ 있는지 확인하세요.',
    ['틀어'],
    ['틀어', '잠가', '쏟아', '꽂아', '걸어'],
    L(
      '세탁기 급수 문제에서는 수도꼭지가 열려 있는지 확인해요.',
      'Suv kelmasa, jo‘mrak ochiq ekanini tekshiring.',
      'For a water-supply problem, check whether the tap is open.',
      'При проблеме с подачей воды проверьте, открыт ли кран.',
    ),
    ['water', 'problem-solving'],
  ),

  s5u7_051_type_answer: vocabTypeAnswer(
    '수돗물을 틀다',
    L(
      '수도꼭지를 열어 물이 나오게 하다',
      'Jo‘mrakni ochib suv oqizmoq',
      'To open a tap so water flows',
      'Открыть кран, чтобы пошла вода',
    ),
    'The learner must write the Korean vocabulary expression meaning to turn on a water tap.',
    ['water', 'type-answer'],
  ),

  s5u7_052_translate_builder: translateBuilder(
    L(
      '물이 새기 때문에 먼저 수도꼭지를 닫으라고 말하기',
      'Suv sizayotgani uchun avval jo‘mrakni yopishni ayting.',
      'Say to turn off the tap first because water is leaking.',
      'Скажите сначала закрыть кран, потому что течёт вода.',
    ),
    [
      '물이 새니까',
      '먼저',
      '수돗물을 잠그세요',
      '시동을',
      '플러그를 꽂고',
      '화면을 켜세요',
    ],
    '물이 새니까 먼저 수돗물을 잠그세요',
    L(
      '물이 새는 상황에서는 먼저 수도를 닫는 것이 안전해요.',
      'Suv sizsa, avval jo‘mrakni yopish xavfsizroq.',
      'When water is leaking, turning off the tap first is safer.',
      'При утечке воды безопаснее сначала закрыть кран.',
    ),
    ['water', 'safety'],
    5,
  ),

  s5u7_053_cloze_passage: clozePassage(
    '자동차를 출발시키려면 먼저 ___을 걸어야 합니다. 운전을 마치고 차를 세운 뒤에는 ___을 끕니다.',
    ['시동', '시동'],
    ['시동', '시동', '전원', '수돗물', '플러그'],
    L(
      '자동차를 시작할 때는 시동을 걸고, 마친 뒤에는 시동을 꺼요.',
      'Mashina bilan yo‘lga chiqishda dvigatelni ishga tushirib, tugagach o‘chiriladi.',
      'Start the engine before driving and turn it off after parking.',
      'Перед поездкой заводят двигатель, а после парковки его выключают.',
    ),
    ['car', 'engine'],
  ),

  s5u7_054_word_arrange: wordArrange(
    [
      '차에',
      '시동을 걸었는데',
      '이상한 소리가 났어요',
      '수돗물을',
      '플러그를',
      '종이가 얼었어요',
    ],
    '차에 시동을 걸었는데 이상한 소리가 났어요',
    L(
      '자동차 엔진을 켠 뒤 평소와 다른 소리가 들렸어요.',
      'Dvigatelni ishga tushirgach, g‘alati ovoz eshitildi.',
      'A strange noise appeared after the car engine was started.',
      'После запуска двигателя появился странный звук.',
    ),
    ['car', 'sound'],
    5,
  ),

  s5u7_055_type_answer: vocabTypeAnswer(
    '시동을 걸다',
    L(
      '자동차 등의 엔진이 작동하도록 시작하다',
      'Avtomobil dvigatelini ishga tushirmoq',
      'To start a vehicle engine',
      'Завести двигатель автомобиля',
    ),
    'The learner must write the Korean vocabulary expression meaning to start a vehicle engine.',
    ['car', 'type-answer'],
  ),

  s5u7_056_reading_quiz: readingQuiz(
    '기계가 작동하지 않을 때 무조건 고장이라고 생각하기보다 전원, 플러그, 수도 연결처럼 기본적인 부분부터 확인하면 간단히 해결되는 경우도 있습니다.',
    '글의 핵심 내용은 무엇이에요?',
    [
      '수리를 신청하기 전에 기본 연결 상태를 먼저 확인해요.',
      '모든 문제는 부품을 교체해야 해결돼요.',
      '고장 난 기기는 바로 버리는 것이 좋아요.',
      '전원이 안 들어오면 수도부터 잠가요.',
    ],
    '수리를 신청하기 전에 기본 연결 상태를 먼저 확인해요.',
    L(
      '고장이라고 판단하기 전에 기본적인 전원과 연결 상태를 확인하는 습관을 배워요.',
      'Nosozlik deb hisoblashdan oldin quvvat va ulanishlarni tekshirish kerak.',
      'Check basic power and connections before deciding that a device is broken.',
      'Перед тем как считать устройство сломанным, нужно проверить питание и подключения.',
    ),
    ['problem-solving', 'repair'],
    5,
  ),

  s5u7_057_translate_builder: translateBuilder(
    L(
      '전원을 한 번 끈 뒤 다시 켜 보라고 말하기',
      'Qurilmani bir marta o‘chirib, keyin yana yoqib ko‘rishni ayting.',
      'Tell someone to turn the power off and then back on.',
      'Скажите выключить питание, а затем снова включить.',
    ),
    [
      '전원을',
      '껐다가',
      '다시 켜 보세요',
      '종이가',
      '수돗물을',
      '액정을 교체했어요',
    ],
    '전원을 껐다가 다시 켜 보세요',
    L(
      '기기를 재시작해 문제를 확인하는 기본적인 방법이에요.',
      'Qurilmani qayta ishga tushirish orqali muammoni tekshirish usuli.',
      'This is a basic troubleshooting step: restart the device.',
      'Это базовый способ диагностики: перезапустить устройство.',
    ),
    ['power', 'troubleshooting'],
    5,
  ),

  s5u7_058_fill_in_blank: fillBlank(
    '사용이 끝난 뒤에는 플러그를 ___ 것이 안전해요.',
    ['빼는'],
    ['빼는', '꽂는', '쏟는', '거는', '트는'],
    L(
      '상황에 따라 사용 후 전기 연결을 분리하는 것이 안전할 수 있어요.',
      'Ba’zi holatlarda ishlatgandan keyin elektr ulanishini uzish xavfsizroq.',
      'Depending on the device, disconnecting the plug after use can be safer.',
      'В некоторых случаях после использования безопаснее вынуть вилку из розетки.',
    ),
    ['plug', 'safety'],
  ),

  s5u7_059_error_hunt: errorHunt(
    '자동차를 출발하기 전에 시동을 꽂아요.',
    '꽂아요.',
    ['걸어요.', '틀어요.', '잠가요.', '쏟아요.'],
    '걸어요.',
    L(
      '자동차 엔진을 시작할 때는 `시동을 걸다`라고 해요.',
      'Dvigatelni ishga tushirish uchun `시동을 걸다` ishlatiladi.',
      'Use 시동을 걸다 for starting a vehicle engine.',
      'Для запуска двигателя используется 시동을 걸다.',
    ),
    ['car', 'collocation'],
  ),

  s5u7_060_word_arrange: wordArrange(
    [
      '고장이라고 생각하기 전에',
      '전원과 플러그부터',
      '확인해 보세요',
      '채소를',
      '전화만',
      '종이를 수리하세요',
    ],
    '고장이라고 생각하기 전에 전원과 플러그부터 확인해 보세요',
    L(
      '수리를 신청하기 전에 기본적인 연결 상태를 먼저 확인해요.',
      'Ta’mirlashdan oldin avval quvvat va ulanishlarni tekshiring.',
      'Check the basic power and connections before requesting a repair.',
      'Перед обращением в ремонт сначала проверьте питание и подключения.',
    ),
    ['problem-solving', 'repair'],
    5,
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 4 · 수리가 필요해요
  // 증상 → 기본 확인 → 수리 요청 흐름을 만든다.
  // ──────────────────────────────────────────────────────────

  s5u7_061_reading_quiz: readingQuiz(
    '유진 씨의 휴대폰은 통화할 때마다 연결이 끊깁니다. 전원을 껐다가 다시 켜 봤지만 같은 문제가 계속됩니다. 유진 씨는 결국 제품을 전문적으로 확인받기로 했습니다.',
    '유진 씨가 다음으로 하려는 일은 무엇이에요?',
    [
      '수리 센터에 가요.',
      '채소를 냉장고에 넣어요.',
      '수돗물을 잠가요.',
      '복사기 종이를 빼요.',
    ],
    '수리 센터에 가요.',
    L(
      '기본 대처로 해결되지 않아 전문적인 수리가 필요한 상황이에요.',
      'Oddiy choralar yordam bermagani uchun professional ta’mirlash kerak.',
      'Basic troubleshooting did not solve the problem, so professional repair is needed.',
      'Базовая проверка не помогла, поэтому нужен профессиональный ремонт.',
    ),
    ['repair-center', 'problem-solving'],
    5,
  ),

  s5u7_062_type_answer: vocabTypeAnswer(
    '수리 센터',
    L(
      '고장 난 제품을 전문적으로 검사하고 고치는 곳',
      'Buzilgan mahsulotlarni professional tekshiradigan va tuzatadigan joy',
      'A place that professionally checks and repairs broken products',
      'Место, где профессионально проверяют и ремонтируют неисправные устройства',
    ),
    'The learner must write the Korean vocabulary term meaning repair center.',
    ['repair-center', 'type-answer'],
  ),

  s5u7_063_translate_builder: translateBuilder(
    L(
      '휴대폰을 수리 센터에 가져갔다고 말하기',
      'Telefonni servis markaziga olib borganingizni ayting.',
      'Say that you took the phone to a repair center.',
      'Скажите, что вы отнесли телефон в сервисный центр.',
    ),
    [
      '휴대폰을',
      '수리 센터에',
      '가져갔어요',
      '채소를',
      '종이가',
      '수돗물을 잠갔어요',
    ],
    '휴대폰을 수리 센터에 가져갔어요',
    L(
      '고장 난 휴대폰을 전문적인 수리를 받으러 가져간 상황이에요.',
      'Buzilgan telefonni professional ta’mirlash uchun olib borilgan.',
      'The broken phone was taken in for professional repair.',
      'Сломанный телефон отнесли на профессиональный ремонт.',
    ),
    ['repair-center', 'phone'],
  ),

  s5u7_064_fill_in_blank: fillBlank(
    '고장 난 휴대폰을 고치려고 수리 ___에 갔어요.',
    ['센터'],
    ['센터', '기사', '설명서', '액정', '종이'],
    L(
      '고장 난 제품을 직접 가져가 수리를 받는 곳은 수리 센터예요.',
      'Buzilgan mahsulotni olib borib tuzatadigan joy — servis markazi.',
      'A repair center is where you take a broken device for service.',
      'Сервисный центр — это место, куда относят неисправное устройство.',
    ),
    ['repair-center', 'vocabulary'],
  ),

  s5u7_065_word_arrange: wordArrange(
    [
      '수리 기사가',
      '고장 난 세탁기를',
      '확인했어요',
      '채소가',
      '전화를',
      '종이를 얼렸어요',
    ],
    '수리 기사가 고장 난 세탁기를 확인했어요',
    L(
      '전문 수리 기사가 세탁기의 상태를 확인했어요.',
      'Ta’mirlash ustasi kir yuvish mashinasining holatini tekshirdi.',
      'A repair technician checked the broken washing machine.',
      'Мастер проверил неисправную стиральную машину.',
    ),
    ['repair-technician', 'washing-machine'],
  ),

  s5u7_066_type_answer: vocabTypeAnswer(
    '수리 기사',
    L(
      '고장 난 기계나 제품을 전문적으로 고치는 사람',
      'Buzilgan qurilmalarni professional tuzatadigan mutaxassis',
      'A professional who repairs broken machines or products',
      'Специалист, который ремонтирует неисправные устройства',
    ),
    'The learner must write the Korean vocabulary term meaning repair technician.',
    ['repair-technician', 'type-answer'],
  ),

  s5u7_067_error_hunt: errorHunt(
    '고장 난 세탁기를 수리 센터가 고쳤어요.',
    '수리 센터가',
    ['수리 기사가', '사용 설명서가', '액정이', '종이가'],
    '수리 기사가',
    L(
      '제품을 직접 고치는 사람은 `수리 기사`예요.',
      'Mahsulotni bevosita tuzatadigan odam — `수리 기사`.',
      'The person who directly repairs the product is a 수리 기사.',
      'Человек, который непосредственно ремонтирует устройство, — 수리 기사.',
    ),
    ['repair-technician', 'word-choice'],
  ),

  s5u7_068_translate_builder: translateBuilder(
    L(
      '수리 기사가 고장 난 복사기를 고쳤다고 말하기',
      'Ta’mirlash ustasi buzilgan nusxa ko‘chirish qurilmasini tuzatganini ayting.',
      'Say that the repair technician fixed the broken copy machine.',
      'Скажите, что мастер отремонтировал сломанный копировальный аппарат.',
    ),
    [
      '수리 기사가',
      '고장 난 복사기를',
      '수리했어요',
      '채소를',
      '전화가',
      '시동을 걸었어요',
    ],
    '수리 기사가 고장 난 복사기를 수리했어요',
    L(
      '전문 기사가 고장 난 복사기를 정상적으로 작동하도록 고쳤어요.',
      'Usta buzilgan nusxa ko‘chirish apparatini yana ishlaydigan qilib tuzatdi.',
      'The technician repaired the copy machine so it would work normally again.',
      'Мастер отремонтировал копировальный аппарат, чтобы он снова нормально работал.',
    ),
    ['repair-technician', 'repair'],
  ),

  s5u7_069_reading_quiz: readingQuiz(
    '세탁기가 작동하지 않아 수리 센터에 연락했습니다. 직원은 이름과 제품 종류, 고장 증상을 확인한 뒤 수리 요청을 시스템에 등록했습니다.',
    '직원이 한 일을 가장 알맞게 표현한 것은 무엇이에요?',
    [
      '수리 신청을 접수했어요.',
      '채소를 얼렸어요.',
      '플러그를 뺐어요.',
      '액정을 떨어뜨렸어요.',
    ],
    '수리 신청을 접수했어요.',
    L(
      '직원이 수리 요청 정보를 받아 공식적으로 등록했어요.',
      'Xodim ta’mirlash so‘rovi ma’lumotlarini qabul qilib ro‘yxatdan o‘tkazdi.',
      'The employee received and registered the repair request.',
      'Сотрудник принял и зарегистрировал заявку на ремонт.',
    ),
    ['repair-request', 'service'],
    5,
  ),

  s5u7_070_fill_in_blank: fillBlank(
    '수리 센터 직원이 제 수리 신청을 바로 ___했어요.',
    ['접수'],
    ['접수', '교체', '탈수', '시동', '액정'],
    L(
      '직원이 수리 요청을 공식적으로 받아 등록했어요.',
      'Xodim ta’mirlash so‘rovini rasmiy qabul qilib ro‘yxatdan o‘tkazdi.',
      'The employee officially received and registered the repair request.',
      'Сотрудник официально принял и зарегистрировал заявку.',
    ),
    ['repair-request', 'service'],
  ),

  s5u7_071_type_answer: vocabTypeAnswer(
    '접수하다',
    L(
      '신청이나 요청을 받아 공식적으로 처리하기 시작하다',
      'Ariza yoki so‘rovni qabul qilib, rasmiy ishlov berishni boshlamoq',
      'To receive and officially register an application or request',
      'Принять и официально зарегистрировать заявку или запрос',
    ),
    'The learner must write the Korean vocabulary verb meaning to receive and register a request.',
    ['service', 'type-answer'],
    5,
  ),

  s5u7_072_translate_builder: translateBuilder(
    L(
      '수리 센터가 신청을 바로 접수했다고 말하기',
      'Servis markazi arizani darhol qabul qilganini ayting.',
      'Say that the repair center registered the request right away.',
      'Скажите, что сервисный центр сразу зарегистрировал заявку.',
    ),
    [
      '수리 센터에서',
      '신청을',
      '바로 접수했어요',
      '채소를',
      '전원을',
      '종이가 걸렸어요',
    ],
    '수리 센터에서 신청을 바로 접수했어요',
    L(
      '수리 요청이 수리 센터에 정식으로 등록된 상황이에요.',
      'Ta’mirlash so‘rovi servis markazida rasmiy ro‘yxatdan o‘tkazildi.',
      'The repair request was formally registered at the repair center.',
      'Заявка на ремонт была официально зарегистрирована в сервисном центре.',
    ),
    ['repair-request', 'service'],
    5,
  ),

  s5u7_073_cloze_passage: clozePassage(
    '휴대폰 화면이 보이지 않아 수리 ___에 갔습니다. 수리 ___가 확인해 보니 액정 부품을 바꿔야 했습니다.',
    ['센터', '기사'],
    ['기사', '센터', '설명서', '종이', '전원'],
    L(
      '수리 센터에서 수리 기사가 휴대폰을 확인하는 상황이에요.',
      'Servis markazida usta telefonni tekshirayotgan holat.',
      'A repair technician is checking a phone at a repair center.',
      'Мастер проверяет телефон в сервисном центре.',
    ),
    ['repair-center', 'repair-technician'],
    5,
  ),

  s5u7_074_word_arrange: wordArrange(
    [
      '고장 난 부품을',
      '새 부품으로',
      '교체했어요',
      '전화가',
      '수돗물을',
      '채소를 수리했어요',
    ],
    '고장 난 부품을 새 부품으로 교체했어요',
    L(
      '문제가 있는 부품을 빼고 새로운 부품으로 바꿨어요.',
      'Buzilgan qism olib tashlanib, yangisiga almashtirildi.',
      'The broken part was replaced with a new one.',
      'Неисправную деталь заменили новой.',
    ),
    ['replacement', 'repair'],
    5,
  ),

  s5u7_075_type_answer: vocabTypeAnswer(
    '교체하다',
    L(
      '고장 나거나 오래된 부품을 다른 것으로 바꾸다',
      'Buzilgan yoki eski qismni boshqasiga almashtirmoq',
      'To replace a broken or old part with another one',
      'Заменить неисправную или старую деталь другой',
    ),
    'The learner must write the Korean vocabulary verb meaning to replace a broken or old part.',
    ['replacement', 'type-answer'],
    5,
  ),

  s5u7_076_reading_quiz: readingQuiz(
    '세탁기가 고장 난 것 같았지만 바로 수리 센터에 연락하지 않았습니다. 먼저 제품과 함께 받은 책을 읽고 전원, 플러그, 수도 연결을 차례로 확인했습니다.',
    '먼저 읽은 것은 무엇이에요?',
    ['사용 설명서', '수리 신청서', '신문 기사', '휴대폰 문자'],
    '사용 설명서',
    L(
      '제품 사용 방법과 기본 확인 사항이 적힌 사용 설명서를 먼저 읽었어요.',
      'Avval qurilmadan foydalanish va tekshirish usullari yozilgan qo‘llanma o‘qildi.',
      'The user manual was checked first for operating and troubleshooting instructions.',
      'Сначала проверили инструкцию по эксплуатации.',
    ),
    ['manual', 'problem-solving'],
  ),

  s5u7_077_translate_builder: translateBuilder(
    L(
      '수리를 신청하기 전에 사용 설명서를 확인했다고 말하기',
      'Ta’mirlashga ariza berishdan oldin qo‘llanmani tekshirganingizni ayting.',
      'Say that you checked the user manual before requesting a repair.',
      'Скажите, что перед заявкой на ремонт вы проверили инструкцию.',
    ),
    [
      '수리를 신청하기 전에',
      '사용 설명서를',
      '확인했어요',
      '액정을',
      '채소를',
      '시동을 걸었어요',
    ],
    '수리를 신청하기 전에 사용 설명서를 확인했어요',
    L(
      '바로 수리를 맡기기 전에 제품 설명서의 기본 확인 사항을 살펴봤어요.',
      'Ta’mirlashga bermasdan oldin qo‘llanmadagi asosiy tekshiruvlarni ko‘rdim.',
      'The manual was checked for basic troubleshooting before requesting service.',
      'Перед обращением в сервис были проверены основные рекомендации в инструкции.',
    ),
    ['manual', 'repair'],
    5,
  ),

  s5u7_078_fill_in_blank: fillBlank(
    '제품 사용법이나 기본적인 문제 해결 방법은 사용 ___에서 먼저 확인할 수 있어요.',
    ['설명서'],
    ['설명서', '기사', '센터', '액정', '종이'],
    L(
      '사용 설명서에는 제품 사용법과 기본적인 문제 해결 방법이 있어요.',
      'Qo‘llanmada foydalanish va oddiy muammolarni hal qilish usullari bor.',
      'A user manual contains operating instructions and basic troubleshooting information.',
      'В инструкции есть правила использования и основные способы устранения неполадок.',
    ),
    ['manual', 'problem-solving'],
  ),

  s5u7_079_error_hunt: errorHunt(
    '고장 난 부품을 새 부품으로 접수했어요.',
    '접수했어요.',
    ['교체했어요.', '쏟았어요.', '끊었어요.', '걸었어요.'],
    '교체했어요.',
    L(
      '부품을 다른 부품으로 바꿀 때는 `교체하다`를 써요.',
      'Qismni boshqasiga almashtirganda `교체하다` ishlatiladi.',
      'Use 교체하다 when replacing one part with another.',
      'Для замены одной детали другой используется 교체하다.',
    ),
    ['replacement', 'collocation'],
  ),

  s5u7_080_word_arrange: wordArrange(
    [
      '기본적인 방법으로 해결되지 않으면',
      '고장 증상을 정확히 설명하고',
      '수리를 신청해요',
      '채소를',
      '종이를',
      '전화만 얼려요',
    ],
    '기본적인 방법으로 해결되지 않으면 고장 증상을 정확히 설명하고 수리를 신청해요',
    L(
      '스스로 해결되지 않는 문제는 증상을 구체적으로 설명한 뒤 전문 수리를 요청해요.',
      'Oddiy usullar yordam bermasa, muammoni aniq tushuntirib professional ta’mirlash so‘raladi.',
      'If basic troubleshooting fails, describe the symptoms clearly and request professional repair.',
      'Если базовая проверка не помогает, нужно точно описать симптомы и обратиться в сервис.',
    ),
    ['repair', 'node-review'],
    5,
  ),
  // ──────────────────────────────────────────────────────────
  // Lesson 5 · 고장 상황을 설명하고 수리를 신청해요
  // 증상 → 원인 → 기본 대처 → 수리 요청을 종합한다.
  // ──────────────────────────────────────────────────────────

  s5u7_081_reading_quiz: readingQuiz(
    '민지 씨는 휴대폰을 물에 빠뜨렸습니다. 바로 전원을 껐고 충분히 말린 뒤 다시 켜 봤지만 화면이 나오지 않습니다.',
    '민지 씨 휴대폰의 현재 문제는 무엇이에요?',
    [
      '화면이 안 나와요.',
      '전화가 끊겨요.',
      '종이가 걸렸어요.',
      '탈수가 안 돼요.',
    ],
    '화면이 안 나와요.',
    L(
      '휴대폰을 물에 빠뜨린 뒤 화면이 보이지 않는 상황이에요.',
      'Telefon suvga tushganidan keyin ekran ko‘rinmayapti.',
      'The phone screen does not display anything after the phone was dropped into water.',
      'После падения телефона в воду на экране ничего не отображается.',
    ),
    ['phone', 'water-damage', 'screen'],
    5,
  ),

  s5u7_082_type_answer: vocabTypeAnswer(
    '고장이 나다',
    L(
      '기계나 전자 제품에 문제가 생겨 제대로 작동하지 않다',
      'Qurilma buzilib, to‘g‘ri ishlamay qolmoq',
      'For a machine or electronic device to break down',
      'Сломаться и перестать нормально работать',
    ),
    'The learner must write the Korean vocabulary expression meaning that a device breaks down.',
    ['breakdown', 'type-answer'],
    5,
  ),

  s5u7_083_translate_builder: translateBuilder(
    L(
      '휴대폰을 물에 빠뜨린 뒤 화면이 나오지 않는다고 말하기',
      'Telefonni suvga tushirib yuborgandan keyin ekran chiqmayotganini ayting.',
      'Say that the screen does not work after you dropped the phone into water.',
      'Скажите, что экран не работает после того, как вы уронили телефон в воду.',
    ),
    [
      '휴대폰을 물에 빠뜨린 뒤',
      '화면이',
      '안 나와요',
      '종이가',
      '수돗물을',
      '시동을 걸었어요',
    ],
    '휴대폰을 물에 빠뜨린 뒤 화면이 안 나와요',
    L(
      '물에 빠뜨린 일과 현재의 화면 고장을 함께 설명해요.',
      'Telefonning suvga tushishi va hozirgi ekran muammosi birga tushuntiriladi.',
      'The cause and the current screen problem are explained together.',
      'Одновременно объясняются причина и текущая проблема с экраном.',
    ),
    ['phone', 'cause-result'],
    5,
  ),

  s5u7_084_fill_in_blank: fillBlank(
    '전원을 껐다가 다시 켜 봤지만 같은 ___가 계속돼요.',
    ['문제'],
    ['문제', '채소', '종이', '수돗물', '시동'],
    L(
      '기기를 다시 켜 봐도 문제가 해결되지 않았어요.',
      'Qurilmani qayta yoqish ham muammoni hal qilmadi.',
      'Restarting the device did not solve the problem.',
      'Перезапуск устройства не решил проблему.',
    ),
    ['troubleshooting', 'problem'],
    5,
  ),

  s5u7_085_word_arrange: wordArrange(
    [
      '전원을 다시 켜 봤지만',
      '같은 문제가',
      '계속돼요',
      '채소를 얼렸지만',
      '종이를',
      '수돗물을 쏟아요',
    ],
    '전원을 다시 켜 봤지만 같은 문제가 계속돼요',
    L(
      '기기를 다시 시작해도 고장 증상이 그대로예요.',
      'Qurilmani qayta ishga tushirgandan keyin ham muammo davom etmoqda.',
      'The same problem continues even after restarting the device.',
      'Та же проблема остаётся даже после перезапуска устройства.',
    ),
    ['troubleshooting', 'symptom'],
    5,
  ),

  s5u7_086_type_answer: vocabTypeAnswer(
    '수리 신청',
    L(
      '고장 난 제품을 고쳐 달라고 정식으로 요청하는 것',
      'Buzilgan mahsulotni tuzatishni rasmiy so‘rash',
      'A formal request to have a broken product repaired',
      'Официальная заявка на ремонт неисправного устройства',
    ),
    'The learner must write the Korean vocabulary term meaning a repair request.',
    ['repair-request', 'type-answer'],
    5,
  ),

  s5u7_087_error_hunt: errorHunt(
    '문제가 계속돼서 수리 신청을 교체했어요.',
    '교체했어요.',
    ['했어요.', '쏟았어요.', '걸었어요.', '얼렸어요.'],
    '했어요.',
    L(
      '`수리 신청을 하다`가 자연스러운 표현이에요.',
      '`수리 신청을 하다` tabiiy birikma.',
      'The natural expression is 수리 신청을 하다.',
      'Естественное сочетание — 수리 신청을 하다.',
    ),
    ['repair-request', 'collocation'],
    5,
  ),

  s5u7_088_translate_builder: translateBuilder(
    L(
      '문제가 계속되어 수리를 신청했다고 말하기',
      'Muammo davom etgani uchun ta’mirlashga ariza berganingizni ayting.',
      'Say that you requested a repair because the problem continued.',
      'Скажите, что вы подали заявку на ремонт, потому что проблема не исчезла.',
    ),
    [
      '문제가 계속돼서',
      '수리 신청을',
      '했어요',
      '채소를',
      '액정을',
      '시동을 껐어요',
    ],
    '문제가 계속돼서 수리 신청을 했어요',
    L(
      '기본적인 방법으로 해결되지 않아 수리를 요청했어요.',
      'Oddiy usullar yordam bermagani uchun ta’mirlash so‘raldi.',
      'A repair was requested because basic troubleshooting did not solve the problem.',
      'Ремонт запросили, потому что базовые действия не решили проблему.',
    ),
    ['repair-request', 'problem-solving'],
    5,
  ),

  s5u7_089_reading_quiz: readingQuiz(
    '수리 센터 직원은 제품의 종류와 고장 증상, 언제부터 문제가 시작됐는지 물어봤습니다.',
    '수리 신청을 할 때 설명하면 도움이 되는 내용이 아닌 것은 무엇이에요?',
    [
      '오늘 점심에 무엇을 먹었는지',
      '어떤 제품인지',
      '어떤 문제가 있는지',
      '언제부터 문제가 생겼는지',
    ],
    '오늘 점심에 무엇을 먹었는지',
    L(
      '수리에는 제품 종류, 증상, 문제가 시작된 시점 같은 정보가 중요해요.',
      'Ta’mirlash uchun mahsulot turi, belgi va muammo qachon boshlanganligi muhim.',
      'The product type, symptoms, and when the problem began are useful repair information.',
      'Для ремонта важны тип устройства, симптомы и время появления проблемы.',
    ),
    ['repair-request', 'information'],
    5,
  ),

  s5u7_090_fill_in_blank: fillBlank(
    '수리 센터에 연락하면 어떤 ___가 있는지 구체적으로 설명해야 해요.',
    ['증상'],
    ['증상', '명절', '채소', '수돗물', '시동'],
    L(
      '제품에 나타나는 고장 증상을 구체적으로 설명해야 해요.',
      'Qurilmada qanday nosozlik belgisi borligini aniq tushuntirish kerak.',
      'You should clearly describe the symptoms of the malfunction.',
      'Нужно точно описать признаки неисправности.',
    ),
    ['repair', 'symptom'],
    5,
  ),

  s5u7_091_type_answer: vocabTypeAnswer(
    '사용 설명서',
    L(
      '제품의 사용 방법과 주의 사항, 기본적인 문제 해결 방법이 적힌 책이나 문서',
      'Mahsulotdan foydalanish, ehtiyot choralari va asosiy muammolarni hal qilish usullari yozilgan qo‘llanma',
      'A manual containing operating instructions, precautions, and basic troubleshooting',
      'Инструкция с правилами использования, мерами предосторожности и основными способами устранения неполадок',
    ),
    'The learner must write the Korean vocabulary term meaning user manual.',
    ['manual', 'type-answer'],
    5,
  ),

  s5u7_092_translate_builder: translateBuilder(
    L(
      '수리를 신청하기 전에 사용 설명서의 문제 해결 방법을 확인했다고 말하기',
      'Ta’mirlashga ariza berishdan oldin qo‘llanmadagi muammoni hal qilish usullarini tekshirganingizni ayting.',
      'Say that you checked the troubleshooting instructions in the user manual before requesting repair.',
      'Скажите, что перед заявкой на ремонт вы проверили способы устранения неполадок в инструкции.',
    ),
    [
      '수리를 신청하기 전에',
      '사용 설명서를',
      '확인했어요',
      '액정을',
      '채소를',
      '전화가 끊겼어요',
    ],
    '수리를 신청하기 전에 사용 설명서를 확인했어요',
    L(
      '바로 수리를 맡기지 않고 먼저 제품 설명서를 확인했어요.',
      'Darhol ta’mirlashga bermay, avval qo‘llanmani tekshirdim.',
      'The manual was checked before sending the product for repair.',
      'Перед обращением в сервис сначала проверили инструкцию.',
    ),
    ['manual', 'repair'],
    5,
  ),

  s5u7_093_cloze_passage: clozePassage(
    '휴대폰이 자꾸 꺼져서 먼저 사용 ___를 확인했습니다. 안내대로 전원을 다시 켜 봤지만 문제가 계속되어 결국 수리 ___을 했습니다.',
    ['설명서', '신청'],
    ['신청', '설명서', '기사', '종이', '액정'],
    L(
      '설명서를 확인한 뒤에도 문제가 해결되지 않아 수리를 신청했어요.',
      'Qo‘llanmani tekshirgandan keyin ham muammo hal bo‘lmagani uchun ta’mirlashga ariza berildi.',
      'The manual did not solve the problem, so a repair request was submitted.',
      'Проверка инструкции не помогла, поэтому была подана заявка на ремонт.',
    ),
    ['manual', 'repair-request'],
    5,
  ),

  s5u7_094_word_arrange: wordArrange(
    [
      '수리 센터에 연락해서',
      '고장 증상을',
      '구체적으로 설명했어요',
      '채소를',
      '시동이',
      '종이를 얼렸어요',
    ],
    '수리 센터에 연락해서 고장 증상을 구체적으로 설명했어요',
    L(
      '수리 센터에 제품의 문제를 자세히 설명했어요.',
      'Servis markaziga qurilma muammosini batafsil tushuntirdim.',
      'I contacted the repair center and described the symptoms in detail.',
      'Я связался с сервисным центром и подробно описал неисправность.',
    ),
    ['repair-center', 'symptom'],
    5,
  ),

  s5u7_095_type_answer: vocabTypeAnswer(
    '교체하다',
    L(
      '고장 난 부품이나 오래된 물건을 새로운 것으로 바꾸다',
      'Buzilgan yoki eski qismni yangisiga almashtirmoq',
      'To replace a broken or old part with a new one',
      'Заменить неисправную или старую деталь новой',
    ),
    'The learner must write the Korean vocabulary verb meaning to replace a broken or old part.',
    ['replacement', 'type-answer'],
    5,
  ),

  s5u7_096_reading_quiz: readingQuiz(
    '수리 기사가 휴대폰을 확인했습니다. 배터리는 정상이었지만 액정 부품이 손상되어 있었습니다. 기사는 새로운 액정 부품으로 바꿨습니다.',
    '수리 기사가 한 일은 무엇이에요?',
    [
      '액정 부품을 교체했어요.',
      '수리 신청을 취소했어요.',
      '수돗물을 잠갔어요.',
      '종이를 빼냈어요.',
    ],
    '액정 부품을 교체했어요.',
    L(
      '손상된 액정 부품을 새 부품으로 바꿨어요.',
      'Buzilgan displey qismi yangisiga almashtirildi.',
      'The damaged display part was replaced with a new one.',
      'Повреждённую деталь дисплея заменили новой.',
    ),
    ['replacement', 'repair'],
    5,
  ),

  s5u7_097_translate_builder: translateBuilder(
    L(
      '수리 기사가 고장 난 액정 부품을 새것으로 바꿨다고 말하기',
      'Usta buzilgan displey qismini yangisiga almashtirganini ayting.',
      'Say that the technician replaced the broken display part with a new one.',
      'Скажите, что мастер заменил сломанную деталь дисплея новой.',
    ),
    [
      '수리 기사가',
      '고장 난 액정 부품을',
      '새것으로 교체했어요',
      '종이를',
      '채소를',
      '수돗물을 틀었어요',
    ],
    '수리 기사가 고장 난 액정 부품을 새것으로 교체했어요',
    L(
      '고장 난 부품을 제거하고 새로운 부품으로 바꿨어요.',
      'Buzilgan qism olib tashlanib, yangi qism bilan almashtirildi.',
      'The broken part was removed and replaced with a new one.',
      'Неисправную деталь сняли и заменили новой.',
    ),
    ['replacement', 'repair-technician'],
    5,
  ),

  s5u7_098_fill_in_blank: fillBlank(
    '고장 난 부품은 수리하기 어렵다면 새 부품으로 ___할 수 있어요.',
    ['교체'],
    ['교체', '접수', '탈수', '시동', '통화'],
    L(
      '고치기 어려운 부품은 새로운 부품으로 바꿀 수 있어요.',
      'Tuzatish qiyin bo‘lgan qismni yangisiga almashtirish mumkin.',
      'A part that is difficult to repair can be replaced with a new one.',
      'Деталь, которую трудно отремонтировать, можно заменить новой.',
    ),
    ['replacement', 'repair'],
    5,
  ),

  s5u7_099_error_hunt: errorHunt(
    '수리 센터에 전화해서 휴대폰의 고장 증상을 얼렸어요.',
    '얼렸어요.',
    ['설명했어요.', '교체했어요.', '쏟았어요.', '잠갔어요.'],
    '설명했어요.',
    L(
      '문제나 증상은 상대방에게 `설명하다`라고 해요.',
      'Muammo yoki belgini boshqa odamga `설명하다` qilinadi.',
      'Use 설명하다 when describing a problem or symptom to someone.',
      'При описании проблемы или симптома используется 설명하다.',
    ),
    ['repair', 'collocation'],
    5,
  ),

  s5u7_100_word_arrange: wordArrange(
    [
      '문제가 생기면',
      '증상과 원인을 확인한 뒤',
      '필요하면 수리를 신청해요',
      '채소를',
      '종이를',
      '전화를 얼려요',
    ],
    '문제가 생기면 증상과 원인을 확인한 뒤 필요하면 수리를 신청해요',
    L(
      '고장 문제를 해결하는 전체 흐름을 정리하는 문장이에요.',
      'Bu nosozlikni hal qilishning umumiy jarayonini yakunlaydi.',
      'This summarizes the complete process for dealing with a device problem.',
      'Это итоговая схема действий при неисправности устройства.',
    ),
    ['node-review', 'repair', 'problem-solving'],
    5,
  ),
  // ══════════════════════════════════════════════════════════
  // Section 5 · Unit 7 · Node 2
  // V-았다가/었다가
  // 한 행동을 한 뒤 상태·행동이 바뀌는 흐름
  // ══════════════════════════════════════════════════════════

  // ──────────────────────────────────────────────────────────
  // Lesson 1 · 했다가 어떻게 됐어요?
  // 형태와 핵심 의미
  // ──────────────────────────────────────────────────────────

  s5u7_101_reading_quiz: readingQuiz(
    '휴대폰이 이상해서 전원을 껐습니다. 잠시 후 다시 켰습니다.',
    '두 행동을 자연스럽게 한 문장으로 연결한 것은 무엇이에요?',
    [
      '전원을 껐다가 다시 켰어요.',
      '전원을 끄지만 다시 켰어요.',
      '전원을 끄려고 다시 켰어요.',
      '전원을 끄면서 다시 켰어요.',
    ],
    '전원을 껐다가 다시 켰어요.',
    L(
      '먼저 전원을 끈 뒤 행동을 바꾸어 다시 켠 상황이에요.',
      'Avval quvvatni o‘chirib, keyin yana yoqilgan.',
      'The power was turned off first and then turned back on.',
      'Сначала питание выключили, а затем снова включили.',
    ),
    ['v-assdaga', 'power'],
    4,
  ),

  s5u7_102_type_answer: grammarTypeAnswer(
    '전원을 껐다가 다시 켜 보세요',
    L(
      '전원을 한 번 끈 후 다시 켜 보라고 쓰세요.',
      'Qurilmani bir marta o‘chirib, keyin yana yoqishni yozing.',
      'Write that the user should turn the power off and then turn it back on.',
      'Напишите, что нужно выключить питание, а затем снова включить.',
    ),
    'Turn the power off once and then turn it back on.',
    ['껐다가'],
    ['v-at-eotdaga', 'power', 'type-answer'],
  ),

  s5u7_103_translate_builder: translateBuilder(
    L(
      '전원을 끈 뒤 다시 켰다고 표현하기',
      'Qurilmani o‘chirib, keyin yana yoqqaningizni ayting.',
      'Say that you turned the power off and then back on.',
      'Скажите, что вы выключили питание, а затем снова включили.',
    ),
    [
      '전원을',
      '껐다가',
      '다시 켰어요',
      '종이를',
      '계속 껐어요',
      '수돗물을 틀었어요',
    ],
    '전원을 껐다가 다시 켰어요',
    L(
      '먼저 끄고 나중에 다시 켜는 행동의 변화를 표현해요.',
      'Avval o‘chirib, keyin yana yoqish ifodalanadi.',
      'It expresses turning something off and then back on.',
      'Выражается выключение и последующее включение.',
    ),
    ['v-assdaga', 'power'],
  ),

  s5u7_104_fill_in_blank: fillBlank(
    '컴퓨터가 이상해서 전원을 ___ 다시 켰어요.',
    ['껐다가'],
    ['껐다가', '끄려고', '끄니까', '끄면서', '끄지만'],
    L(
      '먼저 전원을 끈 뒤 다시 켰어요.',
      'Avval kompyuterni o‘chirib, keyin yana yoqdim.',
      'I turned the computer off and then back on.',
      'Я выключил компьютер, а затем снова включил.',
    ),
    ['v-assdaga', 'conjugation'],
  ),

  s5u7_105_word_arrange: wordArrange(
    [
      '휴대폰을',
      '켰다가',
      '다시 껐어요',
      '종이가',
      '계속 켰어요',
      '수돗물을 잠갔어요',
    ],
    '휴대폰을 켰다가 다시 껐어요',
    L(
      '휴대폰을 켠 뒤 다시 끈 상황이에요.',
      'Telefonni yoqib, keyin yana o‘chirdim.',
      'I turned the phone on and then turned it off again.',
      'Я включил телефон, а затем снова выключил.',
    ),
    ['v-assdaga', 'power'],
  ),

  s5u7_106_type_answer: grammarTypeAnswer(
    '휴대폰을 켰다가 다시 껐어요',
    L(
      '휴대폰을 먼저 켠 뒤 다시 껐다고 쓰세요.',
      'Telefonni avval yoqib, keyin yana o‘chirganingizni yozing.',
      'Write that you turned the phone on and then turned it off again.',
      'Напишите, что вы включили телефон, а затем снова выключили его.',
    ),
    'The speaker turned the phone on and then turned it off again.',
    ['켰다가'],
    ['v-assdaga', 'power', 'type-answer'],
  ),

  s5u7_107_error_hunt: errorHunt(
    '전원을 끄었다가 다시 켰어요.',
    '끄었다가',
    ['껐다가', '끄다가', '끄니까', '끄지만'],
    '껐다가',
    L(
      '`끄다`의 과거형은 `껐다`이고 여기에 `-가`가 붙어요.',
      '`끄다` fe’lining o‘tgan shakli `껐다`, unga `-가` qo‘shiladi.',
      '끄다 becomes 껐다 before -가 is added.',
      'Глагол 끄다 принимает форму 껐다 перед добавлением -가.',
    ),
    ['v-assdaga', 'conjugation'],
  ),

  s5u7_108_translate_builder: translateBuilder(
    L(
      '플러그를 뺀 뒤 다시 꽂았다고 말하기',
      'Vilkani chiqarib, keyin yana ulaganingizni ayting.',
      'Say that you unplugged it and then plugged it back in.',
      'Скажите, что вы вынули вилку, а затем снова вставили.',
    ),
    [
      '플러그를',
      '뺐다가',
      '다시 꽂았어요',
      '종이를',
      '계속 뺐어요',
      '시동을 걸었어요',
    ],
    '플러그를 뺐다가 다시 꽂았어요',
    L(
      '플러그를 분리한 뒤 다시 연결했어요.',
      'Vilkani chiqarib, keyin yana uladim.',
      'I unplugged it and then plugged it back in.',
      'Я вынул вилку, а затем снова вставил её.',
    ),
    ['v-assdaga', 'plug'],
  ),

  s5u7_109_reading_quiz: readingQuiz(
    '수진 씨는 플러그를 콘센트에서 뺐습니다. 그런데 다시 확인할 일이 있어서 곧 플러그를 꽂았습니다.',
    '가장 자연스러운 문장은 무엇이에요?',
    [
      '플러그를 뺐다가 다시 꽂았어요.',
      '플러그를 빼면서 계속 뺐어요.',
      '플러그를 빼니까 빼지 않았어요.',
      '플러그를 뽑기 위해 꽂았어요.',
    ],
    '플러그를 뺐다가 다시 꽂았어요.',
    L(
      '플러그를 빼는 행동 뒤에 반대 행동인 꽂기가 이어졌어요.',
      'Vilkani chiqarishdan keyin qarama-qarshi harakat — qayta ulash bo‘ldi.',
      'Unplugging was followed by the opposite action, plugging it back in.',
      'После извлечения вилки последовало обратное действие — её снова вставили.',
    ),
    ['v-assdaga', 'plug'],
  ),

  s5u7_110_fill_in_blank: fillBlank(
    '플러그를 ___ 다시 꽂아 보세요.',
    ['뺐다가'],
    ['뺐다가', '빼지만', '빼면서', '빼려고', '빼니까'],
    L(
      '플러그를 한 번 분리한 뒤 다시 연결해 보라는 뜻이에요.',
      'Vilkani bir marta chiqarib, keyin yana ulab ko‘ring.',
      'It means to unplug it once and then plug it back in.',
      'Это значит вынуть вилку, а затем снова вставить её.',
    ),
    ['v-assdaga', 'plug'],
  ),

  s5u7_111_type_answer: grammarTypeAnswer(
    '플러그를 뺐다가 다시 꽂아 보세요',
    L(
      '플러그를 한 번 분리한 다음 다시 연결해 보라고 쓰세요.',
      'Vilkani bir marta chiqarib, keyin yana ulab ko‘rishni yozing.',
      'Write an instruction to unplug it once and then plug it back in.',
      'Напишите совет вынуть вилку, а затем снова вставить её.',
    ),
    'The listener is instructed to unplug the device and then plug it back in.',
    ['뺐다가'],
    ['v-assdaga', 'plug', 'type-answer'],
  ),

  s5u7_112_translate_builder: translateBuilder(
    L(
      '수도꼭지를 닫았다가 다시 열었다고 표현하기',
      'Jo‘mrakni yopib, keyin yana ochganingizni ayting.',
      'Say that you turned the tap off and then opened it again.',
      'Скажите, что вы закрыли кран, а затем снова открыли.',
    ),
    [
      '수돗물을',
      '잠갔다가',
      '다시 틀었어요',
      '종이가',
      '계속 잠갔어요',
      '전화를 끊었어요',
    ],
    '수돗물을 잠갔다가 다시 틀었어요',
    L(
      '수도를 닫았다가 나중에 다시 열었어요.',
      'Jo‘mrakni yopib, keyin yana ochdim.',
      'I turned the tap off and then turned it back on.',
      'Я закрыл кран, а затем снова открыл.',
    ),
    ['v-assdaga', 'water'],
  ),

  s5u7_113_cloze_passage: clozePassage(
    '기기가 이상할 때는 전원을 ___ 다시 켜 보거나 플러그를 ___ 다시 꽂아 볼 수 있어요.',
    ['껐다가', '뺐다가'],
    ['껐다가', '뺐다가', '켜면서', '꽂으려고', '잠그지만'],
    L(
      '고장 확인을 위해 한 행동을 한 뒤 반대 행동으로 되돌리는 방법이에요.',
      'Nosozlikni tekshirish uchun bir harakatdan keyin qarama-qarshi harakat qilinadi.',
      'These troubleshooting steps reverse an action after doing it once.',
      'Это способы проверки, при которых после одного действия выполняется обратное.',
    ),
    ['v-assdaga', 'troubleshooting'],
    5,
  ),

  s5u7_114_word_arrange: wordArrange(
    [
      '수돗물을',
      '잠갔다가',
      '다시 틀었어요',
      '액정을',
      '계속 잠갔어요',
      '종이를 교체했어요',
    ],
    '수돗물을 잠갔다가 다시 틀었어요',
    L(
      '물을 잠시 막았다가 다시 나오게 했어요.',
      'Suvni vaqtincha yopib, keyin yana ochdim.',
      'I shut the water off and then turned it back on.',
      'Я перекрыл воду, а затем снова открыл её.',
    ),
    ['v-assdaga', 'water'],
  ),

  s5u7_115_type_answer: grammarTypeAnswer(
    '수돗물을 잠갔다가 다시 틀었어요',
    L(
      '수도를 먼저 닫은 뒤 다시 열었다고 쓰세요.',
      'Jo‘mrakni avval yopib, keyin yana ochganingizni yozing.',
      'Write that you turned the tap off and then turned it back on.',
      'Напишите, что вы сначала закрыли кран, а затем снова открыли его.',
    ),
    'The speaker turned the water off and then turned it back on.',
    ['잠갔다가'],
    ['v-assdaga', 'water', 'type-answer'],
  ),

  s5u7_116_reading_quiz: readingQuiz(
    '차에서 이상한 소리가 들렸습니다. 민수 씨는 엔진을 켰지만 걱정돼서 곧 다시 껐습니다.',
    '민수 씨의 행동을 가장 잘 표현한 것은 무엇이에요?',
    [
      '시동을 걸었다가 다시 껐어요.',
      '시동을 걸면서 계속 운전했어요.',
      '시동을 걸려고 껐어요.',
      '시동을 끄니까 걸었어요.',
    ],
    '시동을 걸었다가 다시 껐어요.',
    L(
      '엔진을 켰다가 곧 반대 행동인 끄기를 했어요.',
      'Dvigatelni yoqib, keyin tezda o‘chirdi.',
      'The engine was started and then quickly turned off.',
      'Двигатель завели, а затем вскоре заглушили.',
    ),
    ['v-assdaga', 'engine'],
  ),

  s5u7_117_translate_builder: translateBuilder(
    L(
      '차에 시동을 걸었다가 다시 껐다고 말하기',
      'Mashina dvigatelini ishga tushirib, keyin yana o‘chirganingizni ayting.',
      'Say that you started the car and then turned the engine off again.',
      'Скажите, что вы завели машину, а затем снова заглушили двигатель.',
    ),
    [
      '시동을',
      '걸었다가',
      '다시 껐어요',
      '플러그를',
      '계속 걸었어요',
      '수돗물을 틀었어요',
    ],
    '시동을 걸었다가 다시 껐어요',
    L(
      '자동차 엔진을 시작한 뒤 다시 멈췄어요.',
      'Dvigatelni ishga tushirib, keyin yana o‘chirdim.',
      'I started the engine and then turned it off again.',
      'Я завёл двигатель, а затем снова его заглушил.',
    ),
    ['v-assdaga', 'engine'],
  ),

  s5u7_118_fill_in_blank: fillBlank(
    '차에서 이상한 소리가 나서 시동을 ___ 바로 껐어요.',
    ['걸었다가'],
    ['걸었다가', '걸면서', '걸려고', '걸지만', '거니까'],
    L(
      '시동을 걸었지만 문제가 보여서 바로 다시 껐어요.',
      'Dvigatelni yoqdim, lekin muammo sezilib darhol o‘chirdim.',
      'I started the engine but immediately turned it off after noticing a problem.',
      'Я завёл двигатель, но, заметив проблему, сразу его заглушил.',
    ),
    ['v-assdaga', 'engine'],
  ),

  s5u7_119_error_hunt: errorHunt(
    '수돗물을 잠그었다가 다시 틀었어요.',
    '잠그었다가',
    ['잠갔다가', '잠그면서', '잠그니까', '잠그려고'],
    '잠갔다가',
    L(
      '`잠그다`는 과거형에서 `잠갔다`가 돼요.',
      '`잠그다` o‘tgan shaklda `잠갔다` bo‘ladi.',
      '잠그다 becomes 잠갔다 in the past form.',
      '잠그다 в прошедшей форме становится 잠갔다.',
    ),
    ['v-assdaga', 'conjugation'],
  ),

  s5u7_120_word_arrange: wordArrange(
    [
      '`V-았다가/었다가`는',
      '한 행동 뒤에',
      '행동이나 상태가 바뀔 때 자주 써요',
      '항상 같은 행동만 반복할 때',
      '명사에만',
      '미래만 설명해요',
    ],
    '`V-았다가/었다가`는 한 행동 뒤에 행동이나 상태가 바뀔 때 자주 써요',
    L(
      '이번 레슨에서 배운 문법의 핵심 의미를 정리해요.',
      'Bu darsdagi grammatikaning asosiy ma’nosi umumlashtiriladi.',
      'This summarizes the core meaning of the grammar.',
      'Это итог основного значения изученной грамматики.',
    ),
    ['v-assdaga', 'grammar-summary'],
    5,
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 2 · 반대로 바꿔 봐요
  // 켜다↔끄다, 꽂다↔빼다 등 반대 행동
  // ──────────────────────────────────────────────────────────

  s5u7_121_reading_quiz: readingQuiz(
    '복사기가 멈춰서 전원을 한 번 껐습니다. 잠시 기다렸다가 다시 켜니 정상적으로 작동했습니다.',
    '문제 해결 방법을 한 문장으로 말하면 무엇이에요?',
    [
      '전원을 껐다가 다시 켰어요.',
      '전원을 계속 껐어요.',
      '전원을 켜면서 껐어요.',
      '전원을 끄려고 수리했어요.',
    ],
    '전원을 껐다가 다시 켰어요.',
    L(
      '끄기와 다시 켜기가 이어지는 기본적인 재시작 방법이에요.',
      'O‘chirish va qayta yoqishdan iborat oddiy qayta ishga tushirish usuli.',
      'It is a basic restart: turn it off and then back on.',
      'Это обычный перезапуск: выключить и снова включить.',
    ),
    ['v-assdaga', 'troubleshooting'],
  ),

  s5u7_122_type_answer: grammarTypeAnswer(
    '복사기 전원을 껐다가 다시 켰어요',
    L(
      '복사기를 한 번 끈 뒤 다시 켰다고 쓰세요.',
      'Nusxa ko‘chirish qurilmasini bir marta o‘chirib, yana yoqqaningizni yozing.',
      'Write that you turned the copier off and then back on.',
      'Напишите, что вы выключили копировальный аппарат, а затем снова включили.',
    ),
    'The speaker turned the copy machine off and then back on.',
    ['껐다가'],
    ['v-assdaga', 'copier', 'type-answer'],
  ),

  s5u7_123_translate_builder: translateBuilder(
    L(
      '복사기 전원을 껐다가 다시 켰다고 말하기',
      'Nusxa ko‘chirish qurilmasini o‘chirib, yana yoqqaningizni ayting.',
      'Say that you turned the copy machine off and then back on.',
      'Скажите, что вы выключили копировальный аппарат и снова включили.',
    ),
    [
      '복사기 전원을',
      '껐다가',
      '다시 켰어요',
      '종이를',
      '계속 껐어요',
      '채소를 얼렸어요',
    ],
    '복사기 전원을 껐다가 다시 켰어요',
    L(
      '복사기를 재시작한 상황이에요.',
      'Nusxa ko‘chirish qurilmasi qayta ishga tushirildi.',
      'The copier was restarted.',
      'Копировальный аппарат перезапустили.',
    ),
    ['v-assdaga', 'copier'],
  ),

  s5u7_124_fill_in_blank: fillBlank(
    '전원 문제가 의심되면 플러그를 ___ 다시 꽂아 볼 수 있어요.',
    ['뺐다가'],
    ['뺐다가', '빼면서', '빼니까', '빼려고', '빼지만'],
    L(
      '전기 연결을 한 번 끊었다가 다시 연결해 볼 수 있어요.',
      'Elektr aloqasini bir marta uzib, yana ulab ko‘rish mumkin.',
      'You can disconnect the power once and reconnect it.',
      'Можно один раз отключить питание и снова подключить.',
    ),
    ['v-assdaga', 'plug'],
  ),

  s5u7_125_word_arrange: wordArrange(
    [
      '플러그를',
      '꽂았다가',
      '다시 뺐어요',
      '종이가',
      '계속 꽂았어요',
      '전화를 수리했어요',
    ],
    '플러그를 꽂았다가 다시 뺐어요',
    L(
      '플러그를 연결했다가 다시 분리했어요.',
      'Vilkani ulab, keyin yana chiqardim.',
      'I plugged it in and then unplugged it again.',
      'Я вставил вилку, а затем снова вынул её.',
    ),
    ['v-assdaga', 'plug'],
  ),

  s5u7_126_type_answer: grammarTypeAnswer(
    '플러그를 꽂았다가 다시 뺐어요',
    L(
      '플러그를 먼저 연결한 뒤 다시 분리했다고 쓰세요.',
      'Vilkani avval ulab, keyin yana chiqarganingizni yozing.',
      'Write that you plugged it in and then unplugged it again.',
      'Напишите, что вы сначала вставили вилку, а затем снова вынули её.',
    ),
    'The speaker plugged the device in and then unplugged it again.',
    ['꽂았다가'],
    ['v-assdaga', 'plug', 'type-answer'],
  ),

  s5u7_127_error_hunt: errorHunt(
    '플러그를 꽂았다가 다시 꽂았어요.',
    '다시 꽂았어요.',
    ['다시 뺐어요.', '계속 꽂았어요.', '종이를 뺐어요.', '물을 틀었어요.'],
    '다시 뺐어요.',
    L(
      '이 문맥은 연결한 뒤 반대 행동으로 바꾸는 연습이에요.',
      'Bu kontekstda ulashdan keyin qarama-qarshi harakat qilinadi.',
      'This context practises switching to the opposite action after plugging it in.',
      'В этом контексте после подключения выполняется противоположное действие.',
    ),
    ['v-assdaga', 'opposite-actions'],
  ),

  s5u7_128_translate_builder: translateBuilder(
    L(
      '수도를 열었다가 다시 닫았다고 말하기',
      'Jo‘mrakni ochib, keyin yana yopganingizni ayting.',
      'Say that you turned the water on and then off again.',
      'Скажите, что вы открыли воду, а затем снова закрыли.',
    ),
    [
      '수돗물을',
      '틀었다가',
      '다시 잠갔어요',
      '액정을',
      '계속 틀었어요',
      '플러그를 교체했어요',
    ],
    '수돗물을 틀었다가 다시 잠갔어요',
    L(
      '물을 나오게 했다가 다시 막았어요.',
      'Suvni ochib, keyin yana yopdim.',
      'I turned the water on and then off again.',
      'Я открыл воду, а затем снова перекрыл.',
    ),
    ['v-assdaga', 'water'],
  ),

  s5u7_129_reading_quiz: readingQuiz(
    '세탁기에 물이 들어오는지 확인하려고 수도꼭지를 열었습니다. 물이 새는 것을 보고 곧바로 다시 닫았습니다.',
    '가장 알맞은 표현은 무엇이에요?',
    [
      '수돗물을 틀었다가 다시 잠갔어요.',
      '수돗물을 계속 틀었어요.',
      '수돗물을 잠그려고 틀었어요.',
      '수돗물을 틀면서 잠갔어요.',
    ],
    '수돗물을 틀었다가 다시 잠갔어요.',
    L(
      '수도를 연 뒤 문제가 보여서 다시 닫았어요.',
      'Jo‘mrak ochilgach muammo ko‘rinib, yana yopildi.',
      'The tap was opened, but then closed again after a problem appeared.',
      'Кран открыли, но после обнаружения проблемы снова закрыли.',
    ),
    ['v-assdaga', 'water'],
  ),

  s5u7_130_fill_in_blank: fillBlank(
    '물이 새는지 보려고 수돗물을 ___ 바로 잠갔어요.',
    ['틀었다가'],
    ['틀었다가', '틀면서', '틀니까', '틀려고', '틀지만'],
    L(
      '수도를 열어 확인한 뒤 다시 닫았어요.',
      'Jo‘mrakni ochib tekshirganimdan so‘ng yana yopdim.',
      'I turned on the tap to check it and then turned it off again.',
      'Я открыл кран для проверки, а затем снова закрыл.',
    ),
    ['v-assdaga', 'water'],
  ),

  s5u7_131_type_answer: grammarTypeAnswer(
    '수돗물을 틀었다가 물이 새서 다시 잠갔어요',
    L(
      '수도를 열었지만 물이 새는 것을 보고 다시 닫았다고 쓰세요.',
      'Jo‘mrakni ochib, suv sizayotganini ko‘rgach yana yopganingizni yozing.',
      'Write that you turned the tap on, saw water leaking, and shut it off again.',
      'Напишите, что вы открыли кран, увидели утечку и снова закрыли его.',
    ),
    'The speaker turned the tap on but shut it again after seeing a water leak.',
    ['틀었다가'],
    ['v-assdaga', 'water', 'type-answer'],
  ),

  s5u7_132_translate_builder: translateBuilder(
    L(
      '차에 시동을 걸었다가 이상한 소리가 나서 껐다고 표현하기',
      'Mashina dvigatelini yoqib, g‘alati ovoz chiqqani uchun o‘chirganingizni ayting.',
      'Say that you started the car but turned it off after hearing a strange noise.',
      'Скажите, что вы завели машину, но заглушили двигатель из-за странного звука.',
    ),
    [
      '시동을 걸었다가',
      '이상한 소리가 나서',
      '다시 껐어요',
      '종이가 걸려서',
      '계속 운전하고',
      '수돗물을 틀었어요',
    ],
    '시동을 걸었다가 이상한 소리가 나서 다시 껐어요',
    L(
      '시동을 켠 뒤 문제가 보여 다시 끈 상황이에요.',
      'Dvigatel yoqilgach muammo sezilib, yana o‘chirildi.',
      'The engine was started, but turned off again after a problem appeared.',
      'Двигатель завели, но после появления проблемы снова заглушили.',
    ),
    ['v-assdaga', 'engine'],
  ),

  s5u7_133_cloze_passage: clozePassage(
    '전원을 ___ 다시 켜고, 플러그를 ___ 다시 꽂아 봤지만 문제는 그대로였습니다.',
    ['껐다가', '뺐다가'],
    ['뺐다가', '껐다가', '켜면서', '꽂으니까', '잠그려고'],
    L(
      '두 가지 기본적인 재설정 방법을 모두 시도했어요.',
      'Ikki xil oddiy qayta ulash usuli sinab ko‘rildi.',
      'Two basic reset steps were tried.',
      'Были испробованы два базовых способа перезапуска.',
    ),
    ['v-assdaga', 'troubleshooting'],
    5,
  ),

  s5u7_134_word_arrange: wordArrange(
    [
      '시동을 걸었다가',
      '이상한 소리가 들려서',
      '바로 껐어요',
      '종이를',
      '계속 운전했어요',
      '채소를 얼렸어요',
    ],
    '시동을 걸었다가 이상한 소리가 들려서 바로 껐어요',
    L(
      '차에서 이상한 소리가 나자 엔진을 다시 껐어요.',
      'Mashina g‘alati ovoz chiqargach, dvigatel yana o‘chirildi.',
      'The engine was turned off again after a strange noise was heard.',
      'После странного звука двигатель снова заглушили.',
    ),
    ['v-assdaga', 'engine'],
  ),

  s5u7_135_type_answer: grammarTypeAnswer(
    '시동을 걸었다가 이상한 소리가 나서 바로 껐어요',
    L(
      '엔진을 켰지만 이상한 소리가 나서 곧바로 껐다고 쓰세요.',
      'Dvigatelni yoqib, g‘alati ovoz chiqqani uchun darhol o‘chirganingizni yozing.',
      'Write that you started the engine but immediately shut it off because of a strange noise.',
      'Напишите, что вы завели двигатель, но сразу заглушили его из-за странного звука.',
    ),
    'The speaker started the engine but immediately turned it off because it made a strange noise.',
    ['걸었다가'],
    ['v-assdaga', 'engine', 'type-answer'],
  ),

  s5u7_136_reading_quiz: readingQuiz(
    '에어컨이 이상해서 전원을 껐다가 다시 켜고, 플러그도 뺐다가 다시 꽂았습니다. 그래도 온도 조절이 되지 않았습니다.',
    '글에서 하지 않은 행동은 무엇이에요?',
    [
      '수리 기사를 불렀어요.',
      '전원을 껐다가 켰어요.',
      '플러그를 뺐다가 꽂았어요.',
      '온도 조절 상태를 확인했어요.',
    ],
    '수리 기사를 불렀어요.',
    L(
      '아직 기본적인 확인만 했고 전문 수리는 요청하지 않았어요.',
      'Hali faqat oddiy tekshiruvlar bajarilgan, usta chaqirilmagan.',
      'Only basic troubleshooting was done; a technician was not called.',
      'Провели только базовую проверку, мастера ещё не вызывали.',
    ),
    ['v-assdaga', 'reading'],
  ),

  s5u7_137_translate_builder: translateBuilder(
    L(
      '전원을 켰다가 화면이 나오지 않아서 다시 껐다고 말하기',
      'Qurilmani yoqib, ekran chiqmagani uchun yana o‘chirganingizni ayting.',
      'Say that you turned it on but turned it off again because the screen did not appear.',
      'Скажите, что вы включили устройство, но снова выключили, потому что экран не появился.',
    ),
    [
      '전원을 켰다가',
      '화면이 안 나와서',
      '다시 껐어요',
      '종이를',
      '탈수가 돼서',
      '수돗물을 틀었어요',
    ],
    '전원을 켰다가 화면이 안 나와서 다시 껐어요',
    L(
      '전원을 켠 후 화면 문제를 확인하고 다시 껐어요.',
      'Qurilma yoqilgach ekran muammosi ko‘rinib, yana o‘chirildi.',
      'The screen problem appeared after turning it on, so it was turned off again.',
      'После включения обнаружилась проблема с экраном, поэтому устройство снова выключили.',
    ),
    ['v-assdaga', 'screen'],
  ),

  s5u7_138_fill_in_blank: fillBlank(
    '전원을 ___ 화면이 안 나와서 다시 껐어요.',
    ['켰다가'],
    ['켰다가', '켜면서', '켜니까', '켜려고', '켜지만'],
    L(
      '전원을 켠 뒤 문제가 보여 행동을 다시 바꿨어요.',
      'Qurilma yoqilgach muammo ko‘rinib, harakat o‘zgartirildi.',
      'After turning the power on, a problem appeared and the action was reversed.',
      'После включения возникла проблема, и действие пришлось изменить.',
    ),
    ['v-assdaga', 'screen'],
  ),

  s5u7_139_error_hunt: errorHunt(
    '플러그를 빼았다가 다시 꽂았어요.',
    '빼았다가',
    ['뺐다가', '빼면서', '빼려고', '빼니까'],
    '뺐다가',
    L(
      '`빼다`는 `뺐다가`로 활용해요.',
      '`빼다` fe’li `뺐다가` shaklida tuslanadi.',
      '빼다 conjugates to 뺐다가.',
      '빼다 принимает форму 뺐다가.',
    ),
    ['v-assdaga', 'conjugation'],
  ),

  s5u7_140_word_arrange: wordArrange(
    [
      '고장 난 기기를 확인할 때',
      '반대되는 조작을 해 보며',
      '상태 변화를 확인할 수 있어요',
      '무조건 버리고',
      '채소만',
      '종이를 먹어요',
    ],
    '고장 난 기기를 확인할 때 반대되는 조작을 해 보며 상태 변화를 확인할 수 있어요',
    L(
      '켜기와 끄기, 꽂기와 빼기 같은 대비를 실제 문제 해결과 연결해요.',
      'Yoqish-o‘chirish, ulash-ajratish kabi qarama-qarshi harakatlar muammoni tekshirish bilan bog‘lanadi.',
      'Opposite operations such as on/off and plug/unplug are connected to troubleshooting.',
      'Противоположные действия вроде включить/выключить и вставить/вынуть связываются с диагностикой.',
    ),
    ['v-assdaga', 'node-progression'],
    5,
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 3 · 껐다가 다시 켜 보세요
  // 실제 고장 대처 지시
  // ──────────────────────────────────────────────────────────

  s5u7_141_reading_quiz: readingQuiz(
    '휴대폰 통화가 자꾸 끊깁니다. 아직 수리 센터에 가기 전입니다. 사용 설명서에는 먼저 기기의 전원을 한 번 끈 뒤 다시 켜 보라고 되어 있습니다.',
    '먼저 해 볼 일은 무엇이에요?',
    [
      '전원을 껐다가 다시 켜 봐요.',
      '액정을 바로 교체해요.',
      '휴대폰을 물에 넣어요.',
      '수돗물을 잠가요.',
    ],
    '전원을 껐다가 다시 켜 봐요.',
    L(
      '전문 수리 전에 재시작을 먼저 시도하는 상황이에요.',
      'Professional ta’mirdan oldin qurilmani qayta ishga tushirish sinab ko‘riladi.',
      'Restarting the device is tried before professional repair.',
      'Перед профессиональным ремонтом сначала пробуют перезапустить устройство.',
    ),
    ['v-assdaga', 'troubleshooting'],
  ),

  s5u7_142_type_answer: grammarTypeAnswer(
    '전원을 껐다가 다시 켜 보세요',
    L(
      '기기를 한 번 끈 다음 다시 켜 보라고 조언하세요.',
      'Qurilmani bir marta o‘chirib, keyin yana yoqib ko‘rishni maslahat bering.',
      'Advise someone to turn the device off and then back on.',
      'Посоветуйте выключить устройство, а затем снова включить.',
    ),
    'The listener is advised to turn the device off once and then turn it back on.',
    ['껐다가'],
    ['v-assdaga', 'troubleshooting', 'type-answer'],
  ),

  s5u7_143_translate_builder: translateBuilder(
    L(
      '전원을 껐다가 다시 켜 보라고 조언하기',
      'Qurilmani o‘chirib, keyin yana yoqib ko‘rishni maslahat bering.',
      'Advise the person to turn the power off and then back on.',
      'Посоветуйте выключить питание, а затем снова включить.',
    ),
    [
      '전원을',
      '껐다가',
      '다시 켜 보세요',
      '계속 켜 두세요',
      '종이를',
      '액정을 버리세요',
    ],
    '전원을 껐다가 다시 켜 보세요',
    L(
      '교재 7과의 대표적인 고장 대처 표현이에요.',
      'Bu 7-darsdagi asosiy nosozlikni tekshirish ifodasi.',
      'This is a key troubleshooting expression from Lesson 7.',
      'Это ключевое выражение для устранения неисправностей из 7-го урока.',
    ),
    ['v-assdaga', 'power'],
  ),

  s5u7_144_fill_in_blank: fillBlank(
    '화면이 안 나오면 전원을 ___ 다시 켜 보세요.',
    ['껐다가'],
    ['껐다가', '끄면서', '끄려고', '끄지만', '끄니까'],
    L(
      '화면 문제를 확인하기 위해 기기를 재시작해요.',
      'Ekran muammosini tekshirish uchun qurilma qayta ishga tushiriladi.',
      'Restart the device to check the screen problem.',
      'Для проверки проблемы с экраном перезапустите устройство.',
    ),
    ['v-assdaga', 'screen'],
  ),

  s5u7_145_word_arrange: wordArrange(
    [
      '전화가 자꾸 끊기면',
      '전원을 껐다가',
      '다시 켜 보세요',
      '채소를 얼리고',
      '종이를',
      '수돗물을 잠그세요',
    ],
    '전화가 자꾸 끊기면 전원을 껐다가 다시 켜 보세요',
    L(
      '통화 문제가 반복될 때 먼저 재시작을 시도해요.',
      'Aloqa muammosi qayta-qayta bo‘lsa, avval qayta yoqib ko‘riladi.',
      'Try restarting first when calls repeatedly disconnect.',
      'Если связь постоянно обрывается, сначала попробуйте перезапустить устройство.',
    ),
    ['v-assdaga', 'phone'],
  ),

  s5u7_146_type_answer: grammarTypeAnswer(
    '전화가 자꾸 끊기면 전원을 껐다가 다시 켜 보세요',
    L(
      '통화가 계속 끊기는 경우 기기를 재시작해 보라고 조언하세요.',
      'Aloqa uzilaversa, qurilmani qayta ishga tushirishni maslahat bering.',
      'Advise restarting the device when phone calls keep disconnecting.',
      'Посоветуйте перезапустить устройство, если звонки постоянно обрываются.',
    ),
    'If phone calls keep disconnecting, the listener is advised to turn the device off and back on.',
    ['껐다가'],
    ['v-assdaga', 'phone', 'type-answer'],
  ),

  s5u7_147_error_hunt: errorHunt(
    '화면이 안 나오면 전원을 끄면서 다시 켜 보세요.',
    '끄면서',
    ['껐다가', '끄지만', '끄려고', '끄니까'],
    '껐다가',
    L(
      '두 행동을 동시에 하는 것이 아니라 첫 행동 뒤에 다음 행동을 해요.',
      'Ikki harakat bir vaqtda emas, biri tugagach ikkinchisi bajariladi.',
      'The actions are sequential, not simultaneous.',
      'Действия выполняются последовательно, а не одновременно.',
    ),
    ['v-assdaga', 'meaning-contrast'],
  ),

  s5u7_148_translate_builder: translateBuilder(
    L(
      '전원이 안 들어오면 플러그를 뺐다가 다시 꽂아 보라고 조언하기',
      'Quvvat kelmasa vilkani chiqarib, yana ulab ko‘rishni maslahat bering.',
      'If the power does not come on, advise unplugging and reconnecting the plug.',
      'Если питание не включается, посоветуйте вынуть вилку и снова вставить её.',
    ),
    [
      '전원이 안 들어오면',
      '플러그를 뺐다가',
      '다시 꽂아 보세요',
      '계속 빼 두세요',
      '시동을',
      '채소를 얼리세요',
    ],
    '전원이 안 들어오면 플러그를 뺐다가 다시 꽂아 보세요',
    L(
      '전기 연결 상태를 다시 확인하는 기본 대처예요.',
      'Elektr ulanishini qayta tekshirishning oddiy usuli.',
      'This is a basic way to recheck the electrical connection.',
      'Это базовый способ повторно проверить подключение к электричеству.',
    ),
    ['v-assdaga', 'plug'],
  ),

  s5u7_149_reading_quiz: readingQuiz(
    '세탁기에 물이 들어오지 않습니다. 수도 연결은 되어 있지만 물 흐름이 이상합니다. 수리 기사는 수도를 한 번 닫았다가 다시 열어 보라고 했습니다.',
    '수리 기사의 조언은 무엇이에요?',
    [
      '수돗물을 잠갔다가 다시 틀어 보세요.',
      '전원을 계속 꺼 두세요.',
      '플러그를 물에 넣어 보세요.',
      '종이를 새것으로 바꾸세요.',
    ],
    '수돗물을 잠갔다가 다시 틀어 보세요.',
    L(
      '수도 흐름을 다시 확인하기 위한 조치예요.',
      'Suv oqimini qayta tekshirish uchun qilinadigan ish.',
      'This step rechecks the water flow.',
      'Это действие для повторной проверки подачи воды.',
    ),
    ['v-assdaga', 'water'],
  ),

  s5u7_150_fill_in_blank: fillBlank(
    '세탁기에 물이 안 들어오면 수돗물을 ___ 다시 틀어 보세요.',
    ['잠갔다가'],
    ['잠갔다가', '잠그면서', '잠그려고', '잠그지만', '잠그니까'],
    L(
      '수도를 한 번 닫은 뒤 다시 열어 흐름을 확인해요.',
      'Jo‘mrakni bir marta yopib, keyin ochib suv oqimini tekshiring.',
      'Turn the water off once, then on again to check the flow.',
      'Один раз закройте воду, затем снова откройте и проверьте поток.',
    ),
    ['v-assdaga', 'water'],
  ),

  s5u7_151_type_answer: grammarTypeAnswer(
    '수돗물을 잠갔다가 다시 틀어 보세요',
    L(
      '수도를 한 번 닫은 다음 다시 열어 보라고 조언하세요.',
      'Jo‘mrakni bir marta yopib, keyin yana ochib ko‘rishni maslahat bering.',
      'Advise turning the tap off once and then on again.',
      'Посоветуйте один раз закрыть кран, а затем снова открыть.',
    ),
    'The listener is advised to turn the tap off once and then turn it back on.',
    ['잠갔다가'],
    ['v-assdaga', 'water', 'type-answer'],
  ),

  s5u7_152_translate_builder: translateBuilder(
    L(
      '차에서 이상한 소리가 나면 시동을 걸었다가 바로 끄지 말고 점검을 받으라고 말하기',
      'Mashinada g‘alati ovoz bo‘lsa, dvigatelni qayta-qayta yoqmasdan tekshirtirishni ayting.',
      'If the car makes a strange noise, say not to keep restarting it and to have it checked.',
      'Если машина издаёт странный звук, скажите не перезапускать двигатель снова и снова, а проверить машину.',
    ),
    [
      '이상한 소리가 계속 나면',
      '시동을 반복해서 걸지 말고',
      '점검을 받아 보세요',
      '채소를 얼리고',
      '종이를 빼고',
      '수돗물을 틀어 보세요',
    ],
    '이상한 소리가 계속 나면 시동을 반복해서 걸지 말고 점검을 받아 보세요',
    L(
      '기본 대처를 무리하게 반복하지 않고 필요한 경우 점검을 받아요.',
      'Oddiy chorani ortiqcha takrorlamay, kerak bo‘lsa tekshiruvdan o‘tiladi.',
      'Do not repeat troubleshooting unnecessarily; get the device checked when needed.',
      'Не нужно бесконечно повторять базовые действия — при необходимости обратитесь на проверку.',
    ),
    ['troubleshooting', 'safety'],
    5,
  ),

  s5u7_153_cloze_passage: clozePassage(
    '휴대폰 화면이 나오지 않아 전원을 ___ 다시 켜 봤습니다. 그래도 같아서 플러그도 ___ 다시 꽂아 봤습니다.',
    ['껐다가', '뺐다가'],
    ['뺐다가', '껐다가', '끄면서', '꽂으려고', '잠그니까'],
    L(
      '두 가지 기본적인 고장 대처를 순서대로 시도했어요.',
      'Ikki xil oddiy nosozlikni tekshirish usuli ketma-ket bajarildi.',
      'Two basic troubleshooting steps were tried in sequence.',
      'Последовательно попробовали два базовых способа устранения неисправности.',
    ),
    ['v-assdaga', 'troubleshooting'],
    5,
  ),

  s5u7_154_word_arrange: wordArrange(
    [
      '사용 설명서를 확인한 뒤',
      '전원을 껐다가',
      '다시 켜 봤어요',
      '종이를',
      '수돗물을 쏟고',
      '채소를 교체했어요',
    ],
    '사용 설명서를 확인한 뒤 전원을 껐다가 다시 켜 봤어요',
    L(
      '설명서의 안내를 보고 직접 기본 대처를 해 봤어요.',
      'Qo‘llanmani ko‘rib, oddiy tekshiruvni o‘zim bajardim.',
      'I checked the manual and tried a basic troubleshooting step myself.',
      'Я проверил инструкцию и сам попробовал базовый способ устранения проблемы.',
    ),
    ['manual', 'v-assdaga'],
  ),

  s5u7_155_type_answer: grammarTypeAnswer(
    '사용 설명서를 확인한 뒤 전원을 껐다가 다시 켜 봤어요',
    L(
      '설명서를 확인하고 기기를 한 번 재시작해 봤다고 쓰세요.',
      'Qo‘llanmani tekshirib, qurilmani bir marta qayta ishga tushirib ko‘rganingizni yozing.',
      'Write that you checked the manual and tried restarting the device once.',
      'Напишите, что вы проверили инструкцию и один раз попробовали перезапустить устройство.',
    ),
    'After checking the user manual, the speaker tried turning the device off and back on once.',
    ['껐다가'],
    ['manual', 'v-assdaga', 'type-answer'],
  ),

  s5u7_156_reading_quiz: readingQuiz(
    '민수 씨는 전화가 끊길 때마다 전원을 껐다가 다시 켰습니다. 처음에는 괜찮아졌지만 같은 문제가 계속 반복되었습니다.',
    '지금 가장 적절한 다음 행동은 무엇이에요?',
    [
      '수리 센터에 고장 증상을 설명해요.',
      '계속 같은 동작만 반복해요.',
      '휴대폰을 물에 넣어요.',
      '액정을 일부러 떨어뜨려요.',
    ],
    '수리 센터에 고장 증상을 설명해요.',
    L(
      '기본 대처를 해도 문제가 반복되면 전문적인 확인이 필요해요.',
      'Oddiy usuldan keyin ham muammo takrorlansa, professional tekshiruv kerak.',
      'Professional inspection is appropriate when the problem continues after basic troubleshooting.',
      'Если проблема повторяется после базовой проверки, нужна профессиональная диагностика.',
    ),
    ['repair', 'problem-solving'],
    5,
  ),

  s5u7_157_translate_builder: translateBuilder(
    L(
      '재시작해 봤지만 문제가 계속된다고 말하기',
      'Qayta ishga tushirib ko‘rganingizga qaramay muammo davom etayotganini ayting.',
      'Say that you restarted the device, but the problem still continues.',
      'Скажите, что вы перезапустили устройство, но проблема всё ещё остаётся.',
    ),
    [
      '전원을 껐다가 다시 켜 봤지만',
      '같은 문제가',
      '계속돼요',
      '채소가 얼어서',
      '종이를',
      '수돗물을 잠갔어요',
    ],
    '전원을 껐다가 다시 켜 봤지만 같은 문제가 계속돼요',
    L(
      '기본 대처 후에도 고장 증상이 사라지지 않았어요.',
      'Oddiy tekshiruvdan keyin ham nosozlik yo‘qolmadi.',
      'The symptom remained after basic troubleshooting.',
      'Неисправность не исчезла после базовой проверки.',
    ),
    ['v-assdaga', 'repair'],
    5,
  ),

  s5u7_158_fill_in_blank: fillBlank(
    '전원을 ___ 다시 켜 봤지만 화면이 여전히 안 나와요.',
    ['껐다가'],
    ['껐다가', '끄면서', '끄려고', '끄니까', '끄지만'],
    L(
      '재시작했지만 화면 문제가 해결되지 않았어요.',
      'Qayta yoqilgan bo‘lsa ham ekran muammosi hal bo‘lmadi.',
      'Restarting did not fix the screen problem.',
      'Перезапуск не решил проблему с экраном.',
    ),
    ['v-assdaga', 'screen'],
  ),

  s5u7_159_error_hunt: errorHunt(
    '플러그를 뺐다가 다시 빼 보세요.',
    '다시 빼 보세요.',
    ['다시 꽂아 보세요.', '계속 빼세요.', '종이를 빼세요.', '물을 잠그세요.'],
    '다시 꽂아 보세요.',
    L(
      '플러그를 분리한 다음에는 반대 행동인 연결을 해야 해요.',
      'Vilkani chiqargandan keyin qarama-qarshi harakat — qayta ulash kerak.',
      'After unplugging it, the next action should be plugging it back in.',
      'После извлечения вилки следующим действием должно быть её повторное подключение.',
    ),
    ['v-assdaga', 'opposite-actions'],
  ),

  s5u7_160_word_arrange: wordArrange(
    [
      '기본 대처를 해 봐도',
      '문제가 계속되면',
      '전문 수리를 신청하는 것이 좋아요',
      '계속 반복하고',
      '채소를',
      '종이를 얼려요',
    ],
    '기본 대처를 해 봐도 문제가 계속되면 전문 수리를 신청하는 것이 좋아요',
    L(
      '직접 확인할 단계와 전문 수리가 필요한 단계를 구별해요.',
      'O‘zingiz tekshiradigan bosqich va professional ta’mir bosqichi farqlanadi.',
      'It distinguishes basic self-checks from the point where professional repair is appropriate.',
      'Различаем базовую самостоятельную проверку и момент, когда нужен профессиональный ремонт.',
    ),
    ['troubleshooting', 'repair'],
    5,
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 4 · 했다가 문제가 생겼어요
  // 행동 → 예상 밖 결과 → 복구
  // ──────────────────────────────────────────────────────────

  s5u7_161_reading_quiz: readingQuiz(
    '지수 씨는 휴대폰을 책상 가장자리에 놓았습니다. 잠시 후 휴대폰을 건드려서 바닥에 떨어뜨렸습니다. 액정 화면이 제대로 보이지 않아 다시 주워 확인했습니다.',
    '문제 발생과 관련 있는 행동은 무엇이에요?',
    [
      '휴대폰을 떨어뜨렸어요.',
      '수돗물을 틀었어요.',
      '종이를 넣었어요.',
      '시동을 걸었어요.',
    ],
    '휴대폰을 떨어뜨렸어요.',
    L(
      '떨어뜨린 행동 뒤에 액정 문제가 생겼어요.',
      'Telefon tushirilgandan keyin displey muammosi paydo bo‘ldi.',
      'The display problem appeared after the phone was dropped.',
      'Проблема с дисплеем появилась после падения телефона.',
    ),
    ['cause-result', 'phone'],
    5,
  ),

  s5u7_162_type_answer: grammarTypeAnswer(
    '휴대폰을 떨어뜨렸다가 액정이 나가서 수리 센터에 갔어요',
    L(
      '휴대폰을 떨어뜨린 뒤 액정이 고장 나서 수리 센터에 갔다고 쓰세요.',
      'Telefonni tushirib yuborgach displey buzilib, servis markaziga borganingizni yozing.',
      'Write that you dropped the phone, the display failed, and you went to a repair center.',
      'Напишите, что вы уронили телефон, дисплей сломался, и вы пошли в сервисный центр.',
    ),
    'The speaker dropped the phone, the display failed as a result, and the speaker went to a repair center.',
    ['떨어뜨렸다가'],
    ['v-assdaga', 'phone', 'type-answer'],
  ),

  s5u7_163_translate_builder: translateBuilder(
    L(
      '휴대폰을 떨어뜨렸다가 액정이 고장 났다고 말하기',
      'Telefonni tushirib yuborgach displey ishdan chiqqanini ayting.',
      'Say that you dropped the phone and its display stopped working.',
      'Скажите, что вы уронили телефон, после чего дисплей перестал работать.',
    ),
    [
      '휴대폰을 떨어뜨렸다가',
      '액정이',
      '나갔어요',
      '전원을 껐다가',
      '종이가',
      '채소를 얼렸어요',
    ],
    '휴대폰을 떨어뜨렸다가 액정이 나갔어요',
    L(
      '앞 행동 뒤에 예상하지 못한 고장 결과가 생긴 상황이에요.',
      'Birinchi harakatdan keyin kutilmagan nosozlik yuz berdi.',
      'An unexpected malfunction followed the first action.',
      'После первого действия возникла неожиданная неисправность.',
    ),
    ['v-assdaga', 'phone'],
    5,
  ),

  s5u7_164_fill_in_blank: fillBlank(
    '휴대폰을 바닥에 ___ 액정이 나갔어요.',
    ['떨어뜨렸다가'],
    [
      '떨어뜨렸다가',
      '떨어뜨리면서',
      '떨어뜨리려고',
      '떨어뜨리니까',
      '떨어뜨리지만',
    ],
    L(
      '휴대폰을 떨어뜨린 뒤 액정에 문제가 생겼어요.',
      'Telefon tushirilgandan keyin displeyda muammo paydo bo‘ldi.',
      'The display developed a problem after the phone was dropped.',
      'После падения телефона возникла проблема с дисплеем.',
    ),
    ['v-assdaga', 'cause-result'],
  ),

  s5u7_165_word_arrange: wordArrange(
    [
      '노트북에 음료수를 쏟았다가',
      '키보드가',
      '작동하지 않게 됐어요',
      '종이가',
      '계속 마셨어요',
      '수돗물을 잠갔어요',
    ],
    '노트북에 음료수를 쏟았다가 키보드가 작동하지 않게 됐어요',
    L(
      '음료를 쏟은 뒤 키보드에 문제가 생겼어요.',
      'Ichimlik to‘kilgandan keyin klaviatura ishlamay qoldi.',
      'The keyboard stopped working after a drink was spilled on the laptop.',
      'Клавиатура перестала работать после пролитого на ноутбук напитка.',
    ),
    ['v-assdaga', 'spill'],
    5,
  ),

  s5u7_166_type_answer: grammarTypeAnswer(
    '노트북에 음료수를 쏟았다가 키보드가 작동하지 않게 됐어요',
    L(
      '노트북에 음료를 흘린 뒤 키보드가 작동하지 않게 됐다고 쓰세요.',
      'Noutbuk ustiga ichimlik to‘kib, keyin klaviatura ishlamay qolganini yozing.',
      'Write that you spilled a drink on the laptop and the keyboard stopped working.',
      'Напишите, что вы пролили напиток на ноутбук, после чего клавиатура перестала работать.',
    ),
    'The speaker spilled a drink on the laptop and the keyboard subsequently stopped working.',
    ['쏟았다가'],
    ['v-assdaga', 'spill', 'type-answer'],
  ),

  s5u7_167_error_hunt: errorHunt(
    '노트북에 음료수를 쏟으았다가 키보드가 고장 났어요.',
    '쏟으았다가',
    ['쏟았다가', '쏟으면서', '쏟으려고', '쏟으니까'],
    '쏟았다가',
    L(
      '`쏟다`는 `쏟았다가`로 활용해요.',
      '`쏟다` fe’li `쏟았다가` shaklida tuslanadi.',
      '쏟다 conjugates to 쏟았다가.',
      '쏟다 принимает форму 쏟았다가.',
    ),
    ['v-assdaga', 'conjugation'],
  ),

  s5u7_168_translate_builder: translateBuilder(
    L(
      '휴대폰을 물에 빠뜨렸다가 바로 꺼냈다고 말하기',
      'Telefonni suvga tushirib yuborib, darhol chiqarib olganingizni ayting.',
      'Say that you dropped the phone into water and immediately took it out.',
      'Скажите, что вы уронили телефон в воду и сразу достали его.',
    ),
    [
      '휴대폰을 물에 빠뜨렸다가',
      '바로',
      '꺼냈어요',
      '종이를',
      '계속 넣어 뒀어요',
      '시동을 걸었어요',
    ],
    '휴대폰을 물에 빠뜨렸다가 바로 꺼냈어요',
    L(
      '실수로 물에 넣었다가 곧바로 행동을 바꿔 꺼냈어요.',
      'Tasodifan suvga tushirib, darhol chiqarib olindi.',
      'It was accidentally dropped into water and then immediately taken out.',
      'Телефон случайно уронили в воду и сразу достали.',
    ),
    ['v-assdaga', 'water-damage'],
  ),

  s5u7_169_reading_quiz: readingQuiz(
    '민수 씨는 휴대폰을 물에 빠뜨렸지만 바로 꺼냈습니다. 전원은 켜지지 않았고 결국 수리 센터에 가져갔습니다.',
    '첫 두 행동을 `-았다가/었다가`로 연결하면 무엇이에요?',
    [
      '휴대폰을 물에 빠뜨렸다가 바로 꺼냈어요.',
      '휴대폰을 물에 빠뜨리면서 꺼냈어요.',
      '휴대폰을 꺼내려고 빠뜨렸어요.',
      '휴대폰을 빠뜨리니까 넣었어요.',
    ],
    '휴대폰을 물에 빠뜨렸다가 바로 꺼냈어요.',
    L(
      '실수로 물에 들어간 상태를 곧바로 되돌린 상황이에요.',
      'Telefon suvga tushib, holat darhol o‘zgartirildi.',
      'The accidental state was immediately reversed by taking the phone out.',
      'Телефон случайно попал в воду, после чего его сразу достали.',
    ),
    ['v-assdaga', 'water-damage'],
  ),

  s5u7_170_fill_in_blank: fillBlank(
    '휴대폰을 물에 ___ 바로 꺼냈어요.',
    ['빠뜨렸다가'],
    ['빠뜨렸다가', '빠뜨리면서', '빠뜨리려고', '빠뜨리니까', '빠뜨리지만'],
    L(
      '휴대폰을 물에 떨어뜨린 뒤 바로 꺼냈어요.',
      'Telefon suvga tushib, darhol chiqarib olindi.',
      'The phone was dropped into water and then immediately taken out.',
      'Телефон уронили в воду и сразу достали.',
    ),
    ['v-assdaga', 'water-damage'],
  ),

  s5u7_171_type_answer: grammarTypeAnswer(
    '휴대폰을 물에 빠뜨렸다가 바로 꺼냈어요',
    L(
      '휴대폰을 실수로 물속에 떨어뜨린 뒤 바로 꺼냈다고 쓰세요.',
      'Telefonni tasodifan suvga tushirib, darhol chiqarib olganingizni yozing.',
      'Write that you accidentally dropped the phone into water and immediately took it out.',
      'Напишите, что вы случайно уронили телефон в воду и сразу достали его.',
    ),
    'The speaker accidentally dropped the phone into water and immediately took it out.',
    ['빠뜨렸다가'],
    ['v-assdaga', 'water-damage', 'type-answer'],
  ),

  s5u7_172_translate_builder: translateBuilder(
    L(
      '복사기 덮개를 열었다가 종이를 빼고 다시 닫았다고 표현하기',
      'Nusxa ko‘chirish qurilmasi qopqog‘ini ochib, qog‘ozni olib, yana yopganingizni ayting.',
      'Say that you opened the copier cover, removed the paper, and closed it again.',
      'Скажите, что вы открыли крышку копира, вынули бумагу и снова закрыли её.',
    ),
    [
      '복사기 덮개를 열었다가',
      '걸린 종이를 빼고',
      '다시 닫았어요',
      '채소를',
      '계속 열어 뒀어요',
      '수돗물을 틀었어요',
    ],
    '복사기 덮개를 열었다가 걸린 종이를 빼고 다시 닫았어요',
    L(
      '종이 걸림을 해결하기 위해 열었던 덮개를 다시 닫았어요.',
      'Qog‘oz tiqilishini hal qilish uchun ochilgan qopqoq yana yopildi.',
      'The cover was opened to remove jammed paper and then closed again.',
      'Крышку открыли, чтобы убрать застрявшую бумагу, а затем снова закрыли.',
    ),
    ['v-assdaga', 'paper-jam'],
    5,
  ),

  s5u7_173_cloze_passage: clozePassage(
    '휴대폰을 ___ 액정이 나갔고, 노트북에는 음료수를 ___ 키보드에 문제가 생겼어요.',
    ['떨어뜨렸다가', '쏟았다가'],
    ['쏟았다가', '떨어뜨렸다가', '끄면서', '꽂으려고', '잠갔다가'],
    L(
      '두 가지 실수와 그 뒤의 고장 결과를 비교해요.',
      'Ikki xil xato va ulardan keyingi nosozlik natijalari taqqoslanadi.',
      'Two mistakes and their resulting malfunctions are compared.',
      'Сравниваются две ошибки и вызванные ими неисправности.',
    ),
    ['v-assdaga', 'cause-result'],
    5,
  ),

  s5u7_174_word_arrange: wordArrange(
    [
      '복사기 덮개를 열었다가',
      '걸린 종이를 제거하고',
      '다시 닫았어요',
      '액정을',
      '계속 열었어요',
      '채소를 교체했어요',
    ],
    '복사기 덮개를 열었다가 걸린 종이를 제거하고 다시 닫았어요',
    L(
      '종이 걸림을 직접 해결하는 순서를 표현해요.',
      'Qog‘oz tiqilishini hal qilish jarayoni ifodalanadi.',
      'It describes the sequence for clearing a paper jam.',
      'Описывается последовательность устранения замятия бумаги.',
    ),
    ['v-assdaga', 'paper-jam'],
    5,
  ),

  s5u7_175_type_answer: grammarTypeAnswer(
    '복사기 덮개를 열었다가 걸린 종이를 빼고 다시 닫았어요',
    L(
      '복사기 덮개를 열고 걸린 종이를 제거한 다음 다시 닫았다고 쓰세요.',
      'Nusxa ko‘chirish qurilmasi qopqog‘ini ochib, tiqilgan qog‘ozni olib, yana yopganingizni yozing.',
      'Write that you opened the copier cover, removed the jammed paper, and closed it again.',
      'Напишите, что вы открыли крышку копира, вынули застрявшую бумагу и снова закрыли её.',
    ),
    'The speaker opened the copier cover, removed the jammed paper, and closed the cover again.',
    ['열었다가'],
    ['v-assdaga', 'paper-jam', 'type-answer'],
  ),

  s5u7_176_reading_quiz: readingQuiz(
    '고장 난 제품을 확인할 때 한 행동을 했다가 예상과 다른 결과가 생기면 그 결과까지 함께 설명하는 것이 수리 기사에게 도움이 됩니다.',
    '글에서 강조하는 것은 무엇이에요?',
    [
      '행동과 그 뒤의 결과를 함께 설명해요.',
      '고장 원인은 말하지 않아요.',
      '제품 이름만 말하면 충분해요.',
      '항상 같은 행동을 반복해요.',
    ],
    '행동과 그 뒤의 결과를 함께 설명해요.',
    L(
      '무엇을 했고 그 뒤 어떤 문제가 생겼는지 함께 말하는 연습이에요.',
      'Nima qilganingiz va keyin qanday muammo bo‘lganini birga aytish mashqi.',
      'Practise explaining both the action and what happened afterward.',
      'Тренируемся объяснять и действие, и последовавший результат.',
    ),
    ['repair', 'cause-result'],
  ),

  s5u7_177_translate_builder: translateBuilder(
    L(
      '전원을 켰다가 이상한 소리가 나서 바로 껐다고 설명하기',
      'Qurilmani yoqib, g‘alati ovoz chiqqani uchun darhol o‘chirganingizni tushuntiring.',
      'Explain that you turned the device on but immediately turned it off because it made a strange noise.',
      'Объясните, что вы включили устройство, но сразу выключили его из-за странного звука.',
    ),
    [
      '전원을 켰다가',
      '이상한 소리가 나서',
      '바로 껐어요',
      '종이를 넣고',
      '계속 켜 뒀어요',
      '채소를 얼렸어요',
    ],
    '전원을 켰다가 이상한 소리가 나서 바로 껐어요',
    L(
      '행동과 예상 밖의 문제, 그다음 조치를 한 문장으로 연결해요.',
      'Harakat, kutilmagan muammo va keyingi chora bir gapda bog‘lanadi.',
      'The action, unexpected problem, and response are connected in one sentence.',
      'Действие, неожиданная проблема и последующая реакция соединяются в одном предложении.',
    ),
    ['v-assdaga', 'sound'],
    5,
  ),

  s5u7_178_fill_in_blank: fillBlank(
    '전원을 ___ 이상한 소리가 나서 바로 껐어요.',
    ['켰다가'],
    ['켰다가', '켜면서', '켜려고', '켜니까', '켜지만'],
    L(
      '전원을 켠 뒤 문제가 나타나 바로 행동을 바꿨어요.',
      'Qurilma yoqilgach muammo paydo bo‘lib, harakat darhol o‘zgartirildi.',
      'A problem appeared after turning it on, so the action was immediately reversed.',
      'После включения возникла проблема, поэтому действие сразу изменили.',
    ),
    ['v-assdaga', 'sound'],
  ),

  s5u7_179_error_hunt: errorHunt(
    '휴대폰을 물에 빠뜨리면서 바로 꺼냈어요.',
    '빠뜨리면서',
    ['빠뜨렸다가', '빠뜨리려고', '빠뜨리니까', '빠뜨리지만'],
    '빠뜨렸다가',
    L(
      '물에 넣기와 꺼내기는 동시에 하는 행동이 아니라 앞뒤로 이어져요.',
      'Suvga tushirish va chiqarish bir vaqtda emas, ketma-ket sodir bo‘ladi.',
      'Dropping it into water and taking it out are sequential, not simultaneous.',
      'Падение в воду и извлечение происходят последовательно, а не одновременно.',
    ),
    ['v-assdaga', 'meaning-contrast'],
  ),

  s5u7_180_word_arrange: wordArrange(
    [
      '`-았다가/었다가`를 쓰면',
      '먼저 한 행동과',
      '그 뒤의 변화나 결과를 연결할 수 있어요',
      '명사만',
      '항상 동시에',
      '과거를 지울 수 있어요',
    ],
    '`-았다가/었다가`를 쓰면 먼저 한 행동과 그 뒤의 변화나 결과를 연결할 수 있어요',
    L(
      '행동 뒤에 일어난 변화까지 표현하는 기능을 정리해요.',
      'Harakatdan keyingi o‘zgarishni ifodalash vazifasi umumlashtiriladi.',
      'This summarizes how the grammar links an action with a later change or result.',
      'Подводится итог тому, как грамматика связывает действие с последующим изменением или результатом.',
    ),
    ['v-assdaga', 'grammar-summary'],
    5,
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 5 · 고장 과정을 정확히 설명해요
  // 증상 → 행동 → 변화 → 수리 요청 종합
  // ──────────────────────────────────────────────────────────

  s5u7_181_reading_quiz: readingQuiz(
    '휴대폰 통화가 계속 끊겨서 전원을 껐다가 다시 켰습니다. 잠시 괜찮아졌지만 같은 문제가 다시 생겼습니다. 그래서 수리 센터에 연락했습니다.',
    '글의 순서와 같은 것은 무엇이에요?',
    [
      '문제 발생 → 재시작 → 문제 재발 → 수리 문의',
      '수리 문의 → 물에 빠뜨림 → 재시작 → 정상',
      '부품 교체 → 문제 발생 → 수도 확인 → 정상',
      '종이 걸림 → 시동 켜기 → 수리 취소 → 정상',
    ],
    '문제 발생 → 재시작 → 문제 재발 → 수리 문의',
    L(
      '고장부터 기본 대처와 전문 수리 문의까지 실제 흐름을 정리해요.',
      'Nosozlikdan oddiy choraga va professional ta’mir so‘rovigacha jarayon tartiblanadi.',
      'The real troubleshooting flow goes from the symptom to a basic reset and finally a repair inquiry.',
      'Реальный процесс идёт от неисправности к базовой проверке и затем к обращению в сервис.',
    ),
    ['v-assdaga', 'repair-flow'],
    5,
  ),

  s5u7_182_type_answer: grammarTypeAnswer(
    '전화가 자꾸 끊겨서 전원을 껐다가 다시 켜 봤어요',
    L(
      '통화가 계속 끊겨서 기기를 한 번 재시작해 봤다고 쓰세요.',
      'Aloqa uzilaversa, qurilmani bir marta qayta ishga tushirib ko‘rganingizni yozing.',
      'Write that you tried restarting the device because calls kept disconnecting.',
      'Напишите, что вы попробовали перезапустить устройство, потому что звонки постоянно обрывались.',
    ),
    'Because calls kept disconnecting, the speaker tried turning the device off and back on.',
    ['껐다가'],
    ['v-assdaga', 'phone', 'type-answer'],
  ),

  s5u7_183_translate_builder: translateBuilder(
    L(
      '전화가 계속 끊겨서 전원을 껐다가 다시 켜 봤다고 설명하기',
      'Aloqa uzilaverib, qurilmani o‘chirib yana yoqib ko‘rganingizni tushuntiring.',
      'Explain that you turned the device off and back on because calls kept disconnecting.',
      'Объясните, что вы выключили и снова включили устройство из-за постоянных обрывов связи.',
    ),
    [
      '전화가 자꾸 끊겨서',
      '전원을 껐다가',
      '다시 켜 봤어요',
      '종이가 걸려서',
      '채소를',
      '수돗물을 잠갔어요',
    ],
    '전화가 자꾸 끊겨서 전원을 껐다가 다시 켜 봤어요',
    L(
      '고장 증상과 직접 시도한 해결 방법을 함께 설명해요.',
      'Nosozlik belgisi va o‘zingiz sinab ko‘rgan yechim birga tushuntiriladi.',
      'The symptom and the troubleshooting step are explained together.',
      'Одновременно объясняются симптом и уже предпринятое действие.',
    ),
    ['v-assdaga', 'phone'],
    5,
  ),

  s5u7_184_fill_in_blank: fillBlank(
    '전화가 끊겨서 전원을 ___ 다시 켜 봤어요.',
    ['껐다가'],
    ['껐다가', '끄면서', '끄려고', '끄니까', '끄지만'],
    L(
      '통화 문제 때문에 재시작을 시도했어요.',
      'Aloqa muammosi sabab qayta ishga tushirish sinab ko‘rildi.',
      'A restart was tried because of the call problem.',
      'Из-за проблемы со связью попробовали перезапуск.',
    ),
    ['v-assdaga', 'phone'],
  ),

  s5u7_185_word_arrange: wordArrange(
    [
      '플러그를 뺐다가 다시 꽂아 봤는데',
      '전원이',
      '여전히 안 들어와요',
      '채소가',
      '종이를',
      '수돗물이 얼었어요',
    ],
    '플러그를 뺐다가 다시 꽂아 봤는데 전원이 여전히 안 들어와요',
    L(
      '전기 연결을 다시 해 봤지만 문제가 해결되지 않았어요.',
      'Elektr ulanishi qayta qilingan bo‘lsa ham muammo hal bo‘lmadi.',
      'Reconnect­ing the plug did not solve the power problem.',
      'Повторное подключение вилки не решило проблему с питанием.',
    ),
    ['v-assdaga', 'plug'],
    5,
  ),

  s5u7_186_type_answer: grammarTypeAnswer(
    '플러그를 뺐다가 다시 꽂아 봤는데 전원이 여전히 안 들어와요',
    L(
      '플러그를 다시 연결해 봤지만 여전히 전원이 들어오지 않는다고 쓰세요.',
      'Vilkani qayta ulab ko‘rgan bo‘lsangiz ham quvvat hali kelmayotganini yozing.',
      'Write that you reconnected the plug, but the device still has no power.',
      'Напишите, что вы переподключили вилку, но питание всё равно не включается.',
    ),
    'The speaker unplugged and reconnected the plug, but the device still has no power.',
    ['뺐다가'],
    ['v-assdaga', 'plug', 'type-answer'],
  ),

  s5u7_187_error_hunt: errorHunt(
    '전원이 안 들어와서 플러그를 빼면서 다시 꽂아 봤어요.',
    '빼면서',
    ['뺐다가', '빼려고', '빼니까', '빼지만'],
    '뺐다가',
    L(
      '플러그를 빼고 다시 꽂는 것은 순차적인 행동이에요.',
      'Vilkani chiqarish va qayta ulash ketma-ket harakatlar.',
      'Unplugging and reconnecting are sequential actions.',
      'Извлечение и повторное подключение вилки — последовательные действия.',
    ),
    ['v-assdaga', 'meaning-contrast'],
  ),

  s5u7_188_translate_builder: translateBuilder(
    L(
      '플러그를 다시 연결해 봤지만 전원이 들어오지 않았다고 말하기',
      'Vilkani qayta ulab ko‘rgan bo‘lsangiz ham quvvat kelmaganini ayting.',
      'Say that you reconnected the plug but the power still did not come on.',
      'Скажите, что вы переподключили вилку, но питание всё равно не включилось.',
    ),
    [
      '플러그를 뺐다가 다시 꽂아 봤지만',
      '전원이',
      '안 들어왔어요',
      '종이가',
      '채소를',
      '시동을 계속 걸었어요',
    ],
    '플러그를 뺐다가 다시 꽂아 봤지만 전원이 안 들어왔어요',
    L(
      '기본적인 전원 연결 확인으로는 문제가 해결되지 않았어요.',
      'Oddiy elektr ulanish tekshiruvi muammoni hal qilmadi.',
      'Basic connection troubleshooting did not solve the power issue.',
      'Базовая проверка подключения не решила проблему с питанием.',
    ),
    ['v-assdaga', 'plug'],
    5,
  ),

  s5u7_189_reading_quiz: readingQuiz(
    '세탁기에 물이 들어오지 않아 수도를 잠갔다가 다시 틀어 봤습니다. 그래도 물이 들어오지 않아 수리 센터에 연락했습니다.',
    '수리 센터에 알려 주면 가장 유용한 정보는 무엇이에요?',
    [
      '수도를 잠갔다가 다시 틀어 봐도 문제가 계속된다는 것',
      '좋아하는 음식이 무엇인지',
      '오늘 몇 시에 일어났는지',
      '휴대폰 색깔이 무엇인지',
    ],
    '수도를 잠갔다가 다시 틀어 봐도 문제가 계속된다는 것',
    L(
      '이미 시도한 조치와 그 결과를 알려 주면 고장 파악에 도움이 돼요.',
      'Sinab ko‘rilgan choralar va natijasini aytish nosozlikni aniqlashga yordam beradi.',
      'Telling the technician what was already tried and what happened is useful.',
      'Полезно сообщить мастеру, что уже было сделано и каков был результат.',
    ),
    ['repair', 'information'],
    5,
  ),

  s5u7_190_fill_in_blank: fillBlank(
    '수돗물을 ___ 다시 틀어 봐도 물이 안 들어와요.',
    ['잠갔다가'],
    ['잠갔다가', '잠그면서', '잠그려고', '잠그니까', '잠그지만'],
    L(
      '수도를 재설정해 봐도 급수 문제가 계속돼요.',
      'Jo‘mrakni qayta ochib ko‘rilsa ham suv kelmayapti.',
      'The water-supply problem continues even after resetting the tap.',
      'Проблема с подачей воды остаётся даже после повторного открытия крана.',
    ),
    ['v-assdaga', 'water'],
  ),

  s5u7_191_type_answer: grammarTypeAnswer(
    '수돗물을 잠갔다가 다시 틀어 봤는데도 물이 안 들어와요',
    L(
      '수도를 닫았다가 다시 열어 봤지만 여전히 물이 들어오지 않는다고 쓰세요.',
      'Jo‘mrakni yopib yana ochgan bo‘lsangiz ham suv hali kelmayotganini yozing.',
      'Write that you turned the tap off and back on, but water still does not enter.',
      'Напишите, что вы закрыли и снова открыли кран, но вода всё равно не поступает.',
    ),
    'The speaker turned the tap off and back on, but water still does not enter the machine.',
    ['잠갔다가'],
    ['v-assdaga', 'water', 'type-answer'],
  ),

  s5u7_192_translate_builder: translateBuilder(
    L(
      '차에 시동을 걸었다가 이상한 소리가 나서 곧바로 껐다고 수리 기사에게 설명하기',
      'Ustaga dvigatelni yoqqaningizda g‘alati ovoz chiqib, darhol o‘chirganingizni tushuntiring.',
      'Explain to the technician that you started the engine but shut it off immediately after hearing a strange noise.',
      'Объясните мастеру, что вы завели двигатель, но сразу заглушили его после странного звука.',
    ),
    [
      '시동을 걸었다가',
      '이상한 소리가 나서',
      '바로 껐어요',
      '계속 운전했고',
      '종이를',
      '수돗물을 틀었어요',
    ],
    '시동을 걸었다가 이상한 소리가 나서 바로 껐어요',
    L(
      '수리 기사에게 문제 발생 직전과 직후의 행동을 설명해요.',
      'Ustaga muammo oldidan va keyin nima qilganingiz tushuntiriladi.',
      'The actions immediately before and after the problem are explained to the technician.',
      'Мастеру объясняются действия непосредственно до и после возникновения проблемы.',
    ),
    ['v-assdaga', 'repair'],
    5,
  ),

  s5u7_193_cloze_passage: clozePassage(
    '휴대폰은 전원을 ___ 다시 켜 봤지만 전화가 계속 끊겼습니다. 플러그도 ___ 다시 꽂아 봤지만 같았습니다.',
    ['껐다가', '뺐다가'],
    ['뺐다가', '껐다가', '켜면서', '꽂으려고', '걸었다가'],
    L(
      '이미 시도한 두 가지 대처 방법과 실패 결과를 정리해요.',
      'Sinab ko‘rilgan ikki usul va ularning samara bermagani umumlashtiriladi.',
      'Two troubleshooting attempts and their unsuccessful results are summarized.',
      'Подводятся итоги двух безуспешных попыток устранить проблему.',
    ),
    ['v-assdaga', 'repair-flow'],
    5,
  ),

  s5u7_194_word_arrange: wordArrange(
    [
      '수리 센터에 연락해서',
      '전원을 껐다가 다시 켜 봤지만',
      '문제가 계속된다고 설명했어요',
      '채소를 얼리고',
      '종이를',
      '시동만 걸었어요',
    ],
    '수리 센터에 연락해서 전원을 껐다가 다시 켜 봤지만 문제가 계속된다고 설명했어요',
    L(
      '이미 한 대처와 현재 상태를 함께 수리 센터에 알려 줬어요.',
      'Bajargan choralarim va hozirgi holatni servis markaziga birga tushuntirdim.',
      'I told the repair center both what I had tried and that the problem was continuing.',
      'Я сообщил сервисному центру и о предпринятых действиях, и о том, что проблема продолжается.',
    ),
    ['v-assdaga', 'repair-request'],
    5,
  ),

  s5u7_195_type_answer: grammarTypeAnswer(
    '전원을 껐다가 다시 켜 봤지만 같은 문제가 계속돼요',
    L(
      '기기를 재시작해 봤지만 동일한 문제가 계속된다고 쓰세요.',
      'Qurilmani qayta ishga tushirib ko‘rganingizga qaramay, bir xil muammo davom etayotganini yozing.',
      'Write that you restarted the device, but the same problem continues.',
      'Напишите, что вы перезапустили устройство, но та же проблема продолжается.',
    ),
    'The speaker tried turning the device off and back on, but the same problem continues.',
    ['껐다가'],
    ['v-assdaga', 'repair-request', 'type-answer'],
  ),

  s5u7_196_reading_quiz: readingQuiz(
    '수리 기사는 고객에게 이미 무엇을 해 봤는지 물었습니다. 고객은 전원을 껐다가 다시 켜고 플러그도 뺐다가 다시 꽂았지만 문제가 해결되지 않았다고 설명했습니다.',
    '수리 기사가 이 정보를 묻는 이유로 가장 알맞은 것은 무엇이에요?',
    [
      '이미 확인한 방법과 남은 원인을 파악하기 위해서예요.',
      '고객의 취미를 알기 위해서예요.',
      '제품 색깔을 바꾸기 위해서예요.',
      '수리 신청을 무조건 취소하기 위해서예요.',
    ],
    '이미 확인한 방법과 남은 원인을 파악하기 위해서예요.',
    L(
      '이미 시도한 조치를 알면 같은 확인을 반복하지 않고 원인을 좁힐 수 있어요.',
      'Avval nima sinab ko‘rilganini bilish sababni toraytirishga yordam beradi.',
      'Knowing what has already been tried helps narrow down the remaining causes.',
      'Информация о уже выполненных действиях помогает сузить возможные причины.',
    ),
    ['repair', 'learning-value'],
    5,
  ),

  s5u7_197_translate_builder: translateBuilder(
    L(
      '전원과 플러그를 모두 다시 연결해 봤지만 문제가 해결되지 않았다고 설명하기',
      'Quvvat va vilkani qayta tekshirgan bo‘lsangiz ham muammo hal bo‘lmaganini tushuntiring.',
      'Explain that you reset both the power and plug connection, but the problem was not solved.',
      'Объясните, что вы проверили питание и вилку, но проблема не решилась.',
    ),
    [
      '전원을 껐다가 다시 켜고',
      '플러그도 뺐다가 다시 꽂아 봤지만',
      '문제가 해결되지 않았어요',
      '채소를 얼리고',
      '종이를',
      '수돗물을 계속 틀었어요',
    ],
    '전원을 껐다가 다시 켜고 플러그도 뺐다가 다시 꽂아 봤지만 문제가 해결되지 않았어요',
    L(
      '두 가지 기본 대처를 모두 했는데도 전문 점검이 필요한 상태예요.',
      'Ikki asosiy chorani ham bajargandan keyin professional tekshiruv kerak.',
      'Both basic troubleshooting steps failed, so professional inspection is needed.',
      'Оба базовых действия не помогли, поэтому нужна профессиональная диагностика.',
    ),
    ['v-assdaga', 'repair-flow'],
    5,
  ),

  s5u7_198_fill_in_blank: fillBlank(
    '수리 기사에게 전원을 ___ 다시 켜 봤다고 설명했어요.',
    ['껐다가'],
    ['껐다가', '끄면서', '끄려고', '끄니까', '끄지만'],
    L(
      '수리 기사에게 이미 시도한 재시작 방법을 알려 줬어요.',
      'Ustaga qurilmani qayta ishga tushirish sinab ko‘rilgani aytildi.',
      'The technician was told that restarting had already been tried.',
      'Мастеру сообщили, что перезапуск уже пробовали.',
    ),
    ['v-assdaga', 'repair'],
  ),

  s5u7_199_error_hunt: errorHunt(
    '전원을 껐다가 다시 켜 봤으니까 같은 문제가 계속돼요.',
    '봤으니까',
    ['봤지만', '보려고', '보면서', '봤다가'],
    '봤지만',
    L(
      '앞에서 해결 방법을 시도했는데도 결과가 좋지 않았으므로 대비가 필요해요.',
      'Yechim sinab ko‘rilgan bo‘lsa ham natija yaxshi bo‘lmagan, shuning uchun qarama-qarshilik kerak.',
      'The troubleshooting was attempted but failed, so a contrastive connection is needed.',
      'Способ был испробован, но не помог, поэтому нужна конструкция противопоставления.',
    ),
    ['v-assdaga', 'context'],
    5,
  ),

  s5u7_200_word_arrange: wordArrange(
    [
      '고장 상황을 설명할 때는',
      '무엇을 했다가 어떤 변화가 생겼는지',
      '구체적으로 말하면 도움이 돼요',
      '제품 이름만 외우고',
      '원인은 숨기고',
      '항상 같은 답만 말해요',
    ],
    '고장 상황을 설명할 때는 무엇을 했다가 어떤 변화가 생겼는지 구체적으로 말하면 도움이 돼요',
    L(
      '문법을 실제 수리 상황에서 정보를 전달하는 기능으로 연결하는 Node 마지막 문제예요.',
      'Bu Node grammatikani real ta’mirlash vaziyatida ma’lumot yetkazish bilan bog‘laydi.',
      'The node ends by connecting the grammar to useful communication in a real repair situation.',
      'Node завершается связью грамматики с полезным объяснением реальной неисправности.',
    ),
    ['v-assdaga', 'node-review', 'repair'],
    5,
  ),
  // ══════════════════════════════════════════════════════════
  // Section 5 · Unit 7 · Node 3
  // A-(으)ㄴ데도 / V-는데도 / N인데도
  // 기대되는 결과와 실제 결과가 다를 때
  // ══════════════════════════════════════════════════════════

  // ──────────────────────────────────────────────────────────
  // Lesson 1 · 그런데도 문제가 있어요
  // 핵심 의미와 형태 구별
  // ──────────────────────────────────────────────────────────

  s5u7_201_reading_quiz: readingQuiz(
    '휴대폰 배터리를 충분히 충전했습니다. 그런데 전원 버튼을 눌러도 켜지지 않습니다.',
    '두 내용을 가장 자연스럽게 연결한 것은 무엇이에요?',
    [
      '배터리를 충분히 충전했는데도 전원이 안 켜져요.',
      '배터리를 충분히 충전해서 전원이 안 켜져요.',
      '배터리를 충분히 충전하려고 전원이 안 켜져요.',
      '배터리를 충분히 충전하면서 전원이 안 켜져요.',
    ],
    '배터리를 충분히 충전했는데도 전원이 안 켜져요.',
    L(
      '충분히 충전했으면 켜질 것으로 예상하지만 실제로는 켜지지 않아요.',
      'Yetarlicha quvvatlangan bo‘lsa yoqilishi kutiladi, ammo aslida yoqilmayapti.',
      'Although it was fully charged, the phone still does not turn on.',
      'Хотя телефон достаточно зарядили, он всё равно не включается.',
    ),
    ['v-neundedo', 'contrast'],
    5,
  ),

  s5u7_202_type_answer: grammarTypeAnswer(
    '배터리를 충분히 충전했는데도 전원이 안 켜져요',
    L(
      '배터리를 충분히 충전했지만 전원이 켜지지 않는다고 쓰세요.',
      'Batareya yetarlicha quvvatlangan bo‘lsa ham, telefon yoqilmayotganini yozing.',
      'Write that the battery was fully charged, but the device still does not turn on.',
      'Напишите, что аккумулятор полностью заряжен, но устройство всё равно не включается.',
    ),
    'The battery was sufficiently charged, but contrary to expectation the device still does not turn on.',
    ['했는데도'],
    ['v-neundedo', 'power', 'type-answer'],
  ),

  s5u7_203_translate_builder: translateBuilder(
    L(
      '전원을 다시 켜 봤지만 화면이 나오지 않는다고 표현하기',
      'Qurilmani yana yoqib ko‘rgan bo‘lsangiz ham, ekran chiqmayotganini ayting.',
      'Say that the screen still does not appear even though you turned the power on again.',
      'Скажите, что экран всё равно не появляется, хотя вы снова включили питание.',
    ),
    [
      '전원을 다시 켰는데도',
      '화면이',
      '안 나와요',
      '종이가',
      '수돗물을 잠그고',
      '시동을 걸었어요',
    ],
    '전원을 다시 켰는데도 화면이 안 나와요',
    L(
      '전원을 다시 켰으면 화면이 나올 것으로 기대했지만 그렇지 않아요.',
      'Qayta yoqilganda ekran chiqishi kutilgan edi, ammo chiqmadi.',
      'The screen was expected to appear after restarting, but it did not.',
      'После повторного включения ожидалось изображение, но оно не появилось.',
    ),
    ['v-neundedo', 'screen'],
    5,
  ),

  s5u7_204_fill_in_blank: fillBlank(
    '플러그를 다시 꽂았___ 전원이 안 들어와요.',
    ['는데도'],
    ['는데도', '으려고', '으면서', '으니까', '으면'],
    L(
      '플러그를 다시 연결했지만 예상과 달리 전원이 들어오지 않아요.',
      'Vilka qayta ulangan bo‘lsa ham, quvvat kelmayapti.',
      'Even though the plug was reconnected, the device still has no power.',
      'Хотя вилку снова подключили, питание всё равно не включается.',
    ),
    ['v-neundedo', 'form'],
  ),

  s5u7_205_word_arrange: wordArrange(
    [
      '전원을 껐다가 다시 켰는데도',
      '같은 문제가',
      '계속돼요',
      '채소를 얼리고',
      '종이가',
      '수돗물을 틀었어요',
    ],
    '전원을 껐다가 다시 켰는데도 같은 문제가 계속돼요',
    L(
      '재시작을 했지만 문제가 해결되지 않았어요.',
      'Qayta ishga tushirilgan bo‘lsa ham, muammo hal bo‘lmadi.',
      'The same problem continues even after restarting.',
      'Та же проблема продолжается даже после перезапуска.',
    ),
    ['v-neundedo', 'troubleshooting'],
    5,
  ),

  s5u7_206_type_answer: grammarTypeAnswer(
    '전원을 껐다가 다시 켰는데도 같은 문제가 계속돼요',
    L(
      '기기를 재시작했지만 같은 문제가 계속된다고 쓰세요.',
      'Qurilmani qayta ishga tushirsangiz ham, bir xil muammo davom etayotganini yozing.',
      'Write that the same problem continues even though you restarted the device.',
      'Напишите, что та же проблема продолжается, несмотря на перезапуск устройства.',
    ),
    'The device was restarted, but contrary to expectation the same problem continues.',
    ['켰는데도'],
    ['v-neundedo', 'troubleshooting', 'type-answer'],
  ),

  s5u7_207_error_hunt: errorHunt(
    '플러그를 다시 꽂았은데도 전원이 안 들어와요.',
    '꽂았은데도',
    ['꽂았는데도', '꽂으면서', '꽂으려고', '꽂으니까'],
    '꽂았는데도',
    L(
      '동사 과거형 `꽂았다` 뒤에는 `-는데도`가 붙어서 `꽂았는데도`가 돼요.',
      'Fe’lning o‘tgan shakli `꽂았다`dan keyin `-는데도` keladi.',
      'The past verb form 꽂았다 takes -는데도: 꽂았는데도.',
      'После прошедшей формы 꽂았다 используется -는데도: 꽂았는데도.',
    ),
    ['v-neundedo', 'conjugation'],
  ),

  s5u7_208_translate_builder: translateBuilder(
    L(
      '사용 설명서를 읽었지만 문제를 해결하지 못했다고 말하기',
      'Qo‘llanmani o‘qigan bo‘lsangiz ham, muammoni hal qila olmaganingizni ayting.',
      'Say that you could not solve the problem even though you read the user manual.',
      'Скажите, что вы не смогли решить проблему, хотя прочитали инструкцию.',
    ),
    [
      '사용 설명서를 읽었는데도',
      '문제를',
      '해결하지 못했어요',
      '액정을',
      '종이가 걸리고',
      '수돗물을 틀었어요',
    ],
    '사용 설명서를 읽었는데도 문제를 해결하지 못했어요',
    L(
      '설명서를 읽었으므로 해결될 것으로 기대했지만 해결되지 않았어요.',
      'Qo‘llanma o‘qilgani uchun muammo hal bo‘lishi kutilgan edi, ammo bo‘lmadi.',
      'Reading the manual was expected to help, but the problem was not solved.',
      'Ожидалось, что инструкция поможет, но проблему решить не удалось.',
    ),
    ['v-neundedo', 'manual'],
    5,
  ),

  s5u7_209_reading_quiz: readingQuiz(
    '복사기에 걸린 종이를 모두 제거했습니다. 그런데 다시 복사를 시작하자 기계가 또 멈췄습니다.',
    '가장 자연스러운 표현은 무엇이에요?',
    [
      '걸린 종이를 제거했는데도 복사기가 또 멈췄어요.',
      '걸린 종이를 제거해서 복사기가 또 멈췄어요.',
      '걸린 종이를 제거하려고 복사기가 또 멈췄어요.',
      '걸린 종이를 제거하면서 복사기가 또 멈췄어요.',
    ],
    '걸린 종이를 제거했는데도 복사기가 또 멈췄어요.',
    L(
      '문제 원인을 제거했지만 예상과 달리 복사기가 다시 멈췄어요.',
      'Muammo sababi olib tashlangan bo‘lsa ham, qurilma yana to‘xtadi.',
      'The jammed paper was removed, but the copier stopped again.',
      'Застрявшую бумагу убрали, но копир снова остановился.',
    ),
    ['v-neundedo', 'paper-jam'],
    5,
  ),

  s5u7_210_fill_in_blank: fillBlank(
    '걸린 종이를 모두 제거했___ 복사기가 다시 멈췄어요.',
    ['는데도'],
    ['는데도', '으니까', '으려고', '으면서', '으면'],
    L(
      '종이를 제거했지만 복사기가 정상적으로 작동하지 않았어요.',
      'Qog‘oz olib tashlangan bo‘lsa ham, qurilma normal ishlamadi.',
      'The paper was removed, but the copier still did not work normally.',
      'Бумагу убрали, но копир всё равно не заработал нормально.',
    ),
    ['v-neundedo', 'paper-jam'],
  ),

  s5u7_211_type_answer: grammarTypeAnswer(
    '걸린 종이를 제거했는데도 복사기가 다시 멈췄어요',
    L(
      '걸린 종이를 제거했지만 복사기가 다시 멈췄다고 쓰세요.',
      'Tiqilgan qog‘ozni olib tashlagan bo‘lsangiz ham, qurilma yana to‘xtaganini yozing.',
      'Write that the copier stopped again even though you removed the jammed paper.',
      'Напишите, что копир снова остановился, хотя вы убрали застрявшую бумагу.',
    ),
    'The jammed paper was removed, but contrary to expectation the copier stopped again.',
    ['했는데도'],
    ['v-neundedo', 'paper-jam', 'type-answer'],
  ),

  s5u7_212_translate_builder: translateBuilder(
    L(
      '수도를 다시 열었지만 세탁기에 물이 들어오지 않는다고 말하기',
      'Jo‘mrakni yana ochgan bo‘lsangiz ham, kir yuvish mashinasiga suv kelmayotganini ayting.',
      'Say that water still does not enter the washing machine even though you reopened the tap.',
      'Скажите, что вода всё равно не поступает в стиральную машину, хотя кран снова открыт.',
    ),
    [
      '수돗물을 다시 틀었는데도',
      '세탁기에',
      '물이 안 들어와요',
      '플러그를',
      '종이가',
      '액정을 교체했어요',
    ],
    '수돗물을 다시 틀었는데도 세탁기에 물이 안 들어와요',
    L(
      '수도를 열면 물이 들어와야 하지만 실제로는 들어오지 않아요.',
      'Jo‘mrak ochilganda suv kelishi kerak, lekin kelmayapti.',
      'Water should enter after opening the tap, but it does not.',
      'После открытия крана вода должна поступать, но этого не происходит.',
    ),
    ['v-neundedo', 'water'],
    5,
  ),

  s5u7_213_cloze_passage: clozePassage(
    '전원을 다시 ___ 화면이 나오지 않았고, 플러그를 다시 ___ 전원이 들어오지 않았어요.',
    ['켰는데도', '꽂았는데도'],
    ['꽂았는데도', '켰는데도', '켜면서', '빼려고', '잠그니까'],
    L(
      '두 가지 조치를 했지만 기대했던 결과가 나오지 않았어요.',
      'Ikki chora ko‘rilgan bo‘lsa ham, kutilgan natija bo‘lmadi.',
      'Two troubleshooting actions were taken, but neither produced the expected result.',
      'Были выполнены два действия, но ни одно не дало ожидаемого результата.',
    ),
    ['v-neundedo', 'contrast'],
    5,
  ),

  s5u7_214_word_arrange: wordArrange(
    [
      '사용 설명서대로 했는데도',
      '문제가',
      '해결되지 않았어요',
      '채소를',
      '계속 읽어서',
      '종이를 수리했어요',
    ],
    '사용 설명서대로 했는데도 문제가 해결되지 않았어요',
    L(
      '설명서의 지시를 따랐지만 고장이 계속돼요.',
      'Qo‘llanmadagi ko‘rsatmalarga amal qilingan bo‘lsa ham, muammo davom etmoqda.',
      'The problem continues even though the manual instructions were followed.',
      'Проблема остаётся, хотя инструкции были выполнены.',
    ),
    ['v-neundedo', 'manual'],
    5,
  ),

  s5u7_215_type_answer: grammarTypeAnswer(
    '사용 설명서대로 했는데도 문제가 해결되지 않았어요',
    L(
      '사용 설명서의 방법을 따라 했지만 문제가 해결되지 않았다고 쓰세요.',
      'Qo‘llanmadagi usulga amal qilgan bo‘lsangiz ham, muammo hal bo‘lmaganini yozing.',
      'Write that the problem was not solved even though you followed the user manual.',
      'Напишите, что проблема не решилась, хотя вы следовали инструкции.',
    ),
    'The speaker followed the user manual, but the problem still was not solved.',
    ['했는데도'],
    ['v-neundedo', 'manual', 'type-answer'],
  ),

  s5u7_216_reading_quiz: readingQuiz(
    '자동차 정비를 받은 지 얼마 되지 않았습니다. 그런데 오늘 시동을 걸자 다시 이상한 소리가 났습니다.',
    '가장 알맞은 문장은 무엇이에요?',
    [
      '얼마 전에 정비했는데도 이상한 소리가 나요.',
      '얼마 전에 정비해서 이상한 소리가 나요.',
      '정비하려고 이상한 소리가 나요.',
      '정비하면서 이상한 소리가 나요.',
    ],
    '얼마 전에 정비했는데도 이상한 소리가 나요.',
    L(
      '최근에 정비했으면 문제가 없을 것으로 예상하지만 이상한 소리가 나요.',
      'Yaqinda ta’mirlangan bo‘lsa, muammo bo‘lmasligi kutiladi, ammo g‘alati ovoz bor.',
      'Although the car was serviced recently, it still makes a strange noise.',
      'Хотя машину недавно обслужили, она всё равно издаёт странный звук.',
    ),
    ['v-neundedo', 'car'],
    5,
  ),

  s5u7_217_translate_builder: translateBuilder(
    L(
      '얼마 전에 수리했지만 같은 문제가 다시 생겼다고 표현하기',
      'Yaqinda ta’mirlangan bo‘lsa ham, bir xil muammo yana paydo bo‘lganini ayting.',
      'Say that the same problem happened again even though it was repaired recently.',
      'Скажите, что та же проблема возникла снова, хотя устройство недавно ремонтировали.',
    ),
    [
      '얼마 전에 수리했는데도',
      '같은 문제가',
      '다시 생겼어요',
      '채소를',
      '전원을 끄고',
      '종이를 꽂았어요',
    ],
    '얼마 전에 수리했는데도 같은 문제가 다시 생겼어요',
    L(
      '최근 수리 후에는 정상이어야 하지만 같은 고장이 반복됐어요.',
      'Yaqinda ta’mirdan keyin normal ishlashi kerak edi, lekin muammo takrorlandi.',
      'The same malfunction returned even though the device was recently repaired.',
      'Та же неисправность повторилась, хотя устройство недавно ремонтировали.',
    ),
    ['v-neundedo', 'repair'],
    5,
  ),

  s5u7_218_fill_in_blank: fillBlank(
    '지난주에 수리했___ 같은 문제가 또 생겼어요.',
    ['는데도'],
    ['는데도', '으려고', '으면서', '으니까', '으면'],
    L(
      '최근에 수리했지만 같은 고장이 다시 생겼어요.',
      'Yaqinda ta’mirlangan bo‘lsa ham, muammo yana paydo bo‘ldi.',
      'The same problem returned despite the recent repair.',
      'Та же проблема снова возникла, несмотря на недавний ремонт.',
    ),
    ['v-neundedo', 'repair'],
  ),

  s5u7_219_error_hunt: errorHunt(
    '사용 설명서를 읽은데도 문제를 해결하지 못했어요.',
    '읽은데도',
    ['읽었는데도', '읽으면서', '읽으려고', '읽으니까'],
    '읽었는데도',
    L(
      '완료한 행동을 말하므로 `읽었다 + -는데도 → 읽었는데도`가 자연스러워요.',
      'Tugallangan harakat uchun `읽었다 + -는데도 → 읽었는데도` ishlatiladi.',
      'For the completed action, 읽었다 + -는데도 becomes 읽었는데도.',
      'Для завершённого действия 읽었다 + -는데도 даёт 읽었는데도.',
    ),
    ['v-neundedo', 'conjugation'],
  ),

  s5u7_220_word_arrange: wordArrange(
    [
      '`-는데도`는',
      '앞의 상황에서 기대되는 결과와',
      '실제 결과가 다를 때 써요',
      '항상 원인을 말하고',
      '동시에 행동하고',
      '명령만 만들어요',
    ],
    '`-는데도`는 앞의 상황에서 기대되는 결과와 실제 결과가 다를 때 써요',
    L(
      '문법의 핵심은 단순한 순서가 아니라 기대와 실제 결과의 대비예요.',
      'Grammatikaning asosi oddiy ketma-ketlik emas, kutilgan va haqiqiy natijaning qarama-qarshiligidir.',
      'The key meaning is contrast between an expected result and what actually happens.',
      'Главное значение — противопоставление ожидаемого и фактического результата.',
    ),
    ['neundedo', 'grammar-summary'],
    5,
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 2 · 괜찮은데도 이상해요
  // A-(으)ㄴ데도 / N인데도
  // ──────────────────────────────────────────────────────────

  s5u7_221_reading_quiz: readingQuiz(
    '배터리 상태는 좋습니다. 충전량도 충분합니다. 하지만 휴대폰이 자꾸 꺼집니다.',
    '가장 자연스러운 문장은 무엇이에요?',
    [
      '배터리가 좋은데도 휴대폰이 자꾸 꺼져요.',
      '배터리가 좋아서 휴대폰이 자꾸 꺼져요.',
      '배터리가 좋으려고 휴대폰이 자꾸 꺼져요.',
      '배터리가 좋으면서 휴대폰이 자꾸 꺼져요.',
    ],
    '배터리가 좋은데도 휴대폰이 자꾸 꺼져요.',
    L(
      '배터리 상태가 좋으면 정상 작동할 것으로 기대하지만 휴대폰이 꺼져요.',
      'Batareya yaxshi bo‘lsa normal ishlashi kutiladi, ammo telefon o‘chmoqda.',
      'The phone keeps shutting off even though the battery is in good condition.',
      'Телефон постоянно выключается, хотя аккумулятор в хорошем состоянии.',
    ),
    ['a-eundedo', 'battery'],
    5,
  ),

  s5u7_222_type_answer: grammarTypeAnswer(
    '배터리 상태가 좋은데도 휴대폰이 자꾸 꺼져요',
    L(
      '배터리 상태는 좋지만 휴대폰이 계속 꺼진다고 쓰세요.',
      'Batareya holati yaxshi bo‘lsa ham, telefon doim o‘chayotganini yozing.',
      'Write that the phone keeps turning off even though the battery is in good condition.',
      'Напишите, что телефон постоянно выключается, хотя аккумулятор исправен.',
    ),
    'The battery is in good condition, but contrary to expectation the phone keeps shutting off.',
    ['좋은데도'],
    ['a-eundedo', 'battery', 'type-answer'],
  ),

  s5u7_223_translate_builder: translateBuilder(
    L(
      '새 제품인데도 고장이 자주 난다고 말하기',
      'Mahsulot yangi bo‘lsa ham tez-tez buzilishini ayting.',
      'Say that the product often breaks down even though it is new.',
      'Скажите, что устройство часто ломается, хотя оно новое.',
    ),
    [
      '새 제품인데도',
      '고장이',
      '자주 나요',
      '오래된 제품이라서',
      '종이가',
      '수돗물을 틀어요',
    ],
    '새 제품인데도 고장이 자주 나요',
    L(
      '새 제품이면 고장이 적을 것으로 기대하지만 실제로는 자주 고장 나요.',
      'Yangi mahsulot kam buzilishi kutiladi, ammo tez-tez buziladi.',
      'A new product is expected to work well, but this one breaks down often.',
      'От нового устройства ожидают исправной работы, но оно часто ломается.',
    ),
    ['n-inde-do', 'breakdown'],
    5,
  ),

  s5u7_224_fill_in_blank: fillBlank(
    '새 제품___ 고장이 자주 나요.',
    ['인데도'],
    ['인데도', '이어서', '이지만', '이려고', '이면'],
    L(
      '새 제품이라는 조건과 예상 밖의 잦은 고장을 대비해요.',
      'Yangi mahsulot bo‘lishi bilan kutilmagan tez-tez buzilish qarama-qarshi qo‘yiladi.',
      'It contrasts being a new product with the unexpected frequent breakdowns.',
      'Противопоставляется новый товар и неожиданно частые поломки.',
    ),
    ['n-inde-do', 'form'],
  ),

  s5u7_225_word_arrange: wordArrange(
    [
      '새 제품인데도',
      '화면이',
      '자꾸 꺼져요',
      '오래된 제품이라서',
      '채소가',
      '종이를 넣어요',
    ],
    '새 제품인데도 화면이 자꾸 꺼져요',
    L(
      '새 제품인데 예상과 달리 화면 문제가 반복돼요.',
      'Yangi mahsulot bo‘lsa ham, ekran muammosi takrorlanmoqda.',
      'The screen keeps turning off even though the device is new.',
      'Экран постоянно выключается, хотя устройство новое.',
    ),
    ['n-inde-do', 'screen'],
    5,
  ),

  s5u7_226_type_answer: grammarTypeAnswer(
    '새 제품인데도 화면이 자꾸 꺼져요',
    L(
      '새 제품이지만 화면이 계속 꺼진다고 쓰세요.',
      'Mahsulot yangi bo‘lsa ham, ekran doim o‘chayotganini yozing.',
      'Write that the screen keeps turning off even though it is a new product.',
      'Напишите, что экран постоянно выключается, хотя устройство новое.',
    ),
    'The device is new, but its screen keeps turning off unexpectedly.',
    ['인데도'],
    ['n-inde-do', 'screen', 'type-answer'],
  ),

  s5u7_227_error_hunt: errorHunt(
    '새 제품은데도 고장이 났어요.',
    '제품은데도',
    ['제품인데도', '제품이지만', '제품이라서', '제품이면'],
    '제품인데도',
    L(
      '명사 뒤에는 `N인데도`를 사용해요.',
      'Ot so‘zdan keyin `N인데도` ishlatiladi.',
      'Use N인데도 after a noun.',
      'После существительного используется N인데도.',
    ),
    ['n-inde-do', 'conjugation'],
  ),

  s5u7_228_translate_builder: translateBuilder(
    L(
      '수리비가 비싼데도 다시 고칠 수밖에 없다고 말하기',
      'Ta’mirlash qimmat bo‘lsa ham, yana tuzatishdan boshqa iloj yo‘qligini ayting.',
      'Say that you have no choice but to repair it again even though the repair cost is high.',
      'Скажите, что приходится снова ремонтировать, хотя ремонт дорогой.',
    ),
    [
      '수리비가 비싼데도',
      '다시',
      '고칠 수밖에 없어요',
      '수리비가 싸서',
      '종이가',
      '액정을 버렸어요',
    ],
    '수리비가 비싼데도 다시 고칠 수밖에 없어요',
    L(
      '비용이 높다는 조건에도 불구하고 수리가 필요한 상황이에요.',
      'Narx yuqori bo‘lsa ham, ta’mirlash zarur.',
      'Repair is still necessary despite the high cost.',
      'Несмотря на высокую стоимость, ремонт всё равно необходим.',
    ),
    ['a-eundedo', 'repair-cost'],
    5,
  ),

  s5u7_229_reading_quiz: readingQuiz(
    '수리 센터가 집에서 아주 가깝습니다. 그런데 방문할 시간이 없어서 아직 가지 못했습니다.',
    '가장 자연스러운 문장은 무엇이에요?',
    [
      '수리 센터가 가까운데도 아직 못 갔어요.',
      '수리 센터가 가까워서 아직 못 갔어요.',
      '수리 센터가 가까우려고 아직 못 갔어요.',
      '수리 센터가 가까우면서 아직 못 갔어요.',
    ],
    '수리 센터가 가까운데도 아직 못 갔어요.',
    L(
      '가까우면 쉽게 갈 수 있을 것 같지만 실제로는 가지 못했어요.',
      'Yaqin bo‘lsa oson borish mumkin deb kutiladi, ammo bora olmadi.',
      'The repair center is nearby, but the speaker still has not been able to go.',
      'Сервисный центр рядом, но говорящий всё равно не смог туда сходить.',
    ),
    ['a-eundedo', 'repair-center'],
    5,
  ),

  s5u7_230_fill_in_blank: fillBlank(
    '수리 센터가 가까운___ 아직 방문하지 못했어요.',
    ['데도'],
    ['데도', '니까', '면서', '려고', '지만'],
    L(
      '수리 센터가 가까운 상황과 실제로 방문하지 못한 결과가 대비돼요.',
      'Servis markazi yaqinligi va bora olmaganlik qarama-qarshi.',
      'The nearby location contrasts with the fact that the speaker still could not visit.',
      'Близость сервисного центра противопоставляется тому, что посетить его всё равно не удалось.',
    ),
    ['a-eundedo', 'form'],
  ),

  s5u7_231_type_answer: grammarTypeAnswer(
    '수리 센터가 가까운데도 아직 방문하지 못했어요',
    L(
      '수리 센터가 가까이 있지만 아직 가지 못했다고 쓰세요.',
      'Servis markazi yaqin bo‘lsa ham, hali bora olmaganingizni yozing.',
      'Write that you still have not visited the repair center even though it is nearby.',
      'Напишите, что вы всё ещё не посетили сервисный центр, хотя он находится рядом.',
    ),
    'The repair center is close, but the speaker still has not been able to visit it.',
    ['가까운데도'],
    ['a-eundedo', 'repair-center', 'type-answer'],
  ),

  s5u7_232_translate_builder: translateBuilder(
    L(
      '설명은 쉬운데도 실제로 고치기는 어렵다고 표현하기',
      'Tushuntirish oson bo‘lsa ham, amalda tuzatish qiyinligini ayting.',
      'Say that the explanation is simple, but actually fixing it is difficult.',
      'Скажите, что объяснение простое, но на практике починить устройство трудно.',
    ),
    [
      '설명은 쉬운데도',
      '실제로 고치기는',
      '어려워요',
      '설명이 복잡해서',
      '종이가',
      '플러그를 꽂아요',
    ],
    '설명은 쉬운데도 실제로 고치기는 어려워요',
    L(
      '설명이 쉽다는 점과 실제 수리의 어려움이 대비돼요.',
      'Tushuntirishning osonligi va haqiqiy ta’mirlashning qiyinligi qarama-qarshi.',
      'The simple explanation contrasts with the difficulty of the actual repair.',
      'Простое объяснение противопоставляется сложности реального ремонта.',
    ),
    ['a-eundedo', 'repair'],
    5,
  ),

  s5u7_233_cloze_passage: clozePassage(
    '이 휴대폰은 새 제품___ 고장이 자주 나고, 수리 센터도 가까운___ 갈 시간이 없어요.',
    ['인데도', '데도'],
    ['데도', '인데도', '라서', '지만', '면서'],
    L(
      '명사 뒤 `인데도`와 형용사 뒤 `-(으)ㄴ데도`를 함께 구별해요.',
      'Ot bilan `인데도`, sifat bilan `-(으)ㄴ데도` farqlanadi.',
      'Practise distinguishing N인데도 from A-(으)ㄴ데도.',
      'Различаем N인데도 и A-(으)ㄴ데도.',
    ),
    ['n-inde-do', 'a-eundedo'],
    5,
  ),

  s5u7_234_word_arrange: wordArrange(
    [
      '수리비가 비싼데도',
      '고장 난 부품을',
      '교체해야 해요',
      '수리비가 싸고',
      '채소를',
      '전화를 끊어요',
    ],
    '수리비가 비싼데도 고장 난 부품을 교체해야 해요',
    L(
      '비용이 높지만 필요한 수리를 해야 하는 상황이에요.',
      'Narx yuqori bo‘lsa ham, zarur ta’mirlashni qilish kerak.',
      'The necessary part must be replaced despite the high repair cost.',
      'Несмотря на высокую стоимость, неисправную деталь нужно заменить.',
    ),
    ['a-eundedo', 'replacement'],
    5,
  ),

  s5u7_235_type_answer: grammarTypeAnswer(
    '수리비가 비싼데도 고장 난 부품을 교체해야 해요',
    L(
      '수리비는 비싸지만 고장 난 부품을 바꿔야 한다고 쓰세요.',
      'Ta’mirlash qimmat bo‘lsa ham, buzilgan qismni almashtirish kerakligini yozing.',
      'Write that the broken part has to be replaced even though the repair cost is high.',
      'Напишите, что неисправную деталь нужно заменить, хотя ремонт дорогой.',
    ),
    'The repair cost is high, but the broken part still has to be replaced.',
    ['비싼데도'],
    ['a-eundedo', 'replacement', 'type-answer'],
  ),

  s5u7_236_reading_quiz: readingQuiz(
    '수리 기사는 경험이 아주 많습니다. 그런데 이번 고장은 원인을 바로 찾지 못했습니다.',
    '가장 자연스러운 표현은 무엇이에요?',
    [
      '경험이 많은데도 원인을 바로 찾지 못했어요.',
      '경험이 많아서 원인을 바로 찾지 못했어요.',
      '경험이 많으려고 원인을 바로 찾지 못했어요.',
      '경험이 많으면서 원인을 바로 찾지 못했어요.',
    ],
    '경험이 많은데도 원인을 바로 찾지 못했어요.',
    L(
      '경험이 많으면 원인을 빨리 찾을 것으로 예상하지만 이번에는 그렇지 않았어요.',
      'Tajribasi ko‘p bo‘lsa sababni tez topishi kutiladi, ammo bu safar topolmadi.',
      'Although the technician is experienced, the cause could not be identified immediately.',
      'Хотя мастер опытный, причину сразу определить не удалось.',
    ),
    ['a-eundedo', 'repair-technician'],
    5,
  ),

  s5u7_237_translate_builder: translateBuilder(
    L(
      '수리 기사인데도 원인을 바로 찾지 못했다고 말하기',
      'Ta’mirlash ustasi bo‘lsa ham, sababni darhol topa olmaganini ayting.',
      'Say that even though the person is a repair technician, they could not identify the cause immediately.',
      'Скажите, что даже мастер по ремонту не смог сразу определить причину.',
    ),
    [
      '수리 기사인데도',
      '원인을',
      '바로 찾지 못했어요',
      '학생이라서',
      '종이를',
      '전원을 켰어요',
    ],
    '수리 기사인데도 원인을 바로 찾지 못했어요',
    L(
      '전문가라는 사실과 예상 밖의 어려운 고장이 대비돼요.',
      'Mutaxassis bo‘lishi va kutilmaganda sababni topa olmasligi qarama-qarshi.',
      'Being a professional contrasts with the unexpected difficulty of identifying the cause.',
      'Профессиональный статус противопоставляется неожиданной сложности диагностики.',
    ),
    ['n-inde-do', 'repair-technician'],
    5,
  ),

  s5u7_238_fill_in_blank: fillBlank(
    '전문 수리 기사___ 원인을 바로 찾지 못했어요.',
    ['인데도'],
    ['인데도', '이라서', '이니까', '이면서', '이면'],
    L(
      '명사 `수리 기사` 뒤에 `인데도`를 붙여 기대와 실제 결과를 대비해요.',
      'Ot `수리 기사`dan keyin `인데도` qo‘shilib, kutilgan va haqiqiy natija qarama-qarshi qo‘yiladi.',
      'Attach 인데도 to the noun 수리 기사 to express unexpected contrast.',
      'К существительному 수리 기사 добавляется 인데도 для выражения неожиданного контраста.',
    ),
    ['n-inde-do', 'form'],
  ),

  s5u7_239_error_hunt: errorHunt(
    '수리비가 비싸는데도 부품을 교체했어요.',
    '비싸는데도',
    ['비싼데도', '비싸서', '비싸지만', '비싸니까'],
    '비싼데도',
    L(
      '형용사 `비싸다`는 `비싼데도`로 활용해요.',
      'Sifat `비싸다` `비싼데도` shaklida tuslanadi.',
      'The adjective 비싸다 becomes 비싼데도.',
      'Прилагательное 비싸다 принимает форму 비싼데도.',
    ),
    ['a-eundedo', 'conjugation'],
  ),

  s5u7_240_word_arrange: wordArrange(
    [
      '형용사와 명사는',
      '동사와 형태가 다르므로',
      '앞말의 품사를 확인해야 해요',
      '모두 같은 형태만 쓰고',
      '뜻은 확인하지 않고',
      '과거만 사용해요',
    ],
    '형용사와 명사는 동사와 형태가 다르므로 앞말의 품사를 확인해야 해요',
    L(
      'A-(으)ㄴ데도, V-는데도, N인데도를 정확히 구별하는 학습 전략이에요.',
      'A-(으)ㄴ데도, V-는데도 va N인데도를 to‘g‘ri farqlash strategiyasi.',
      'This is a strategy for distinguishing adjective, verb, and noun forms accurately.',
      'Это стратегия точного различения форм для прилагательных, глаголов и существительных.',
    ),
    ['neundedo', 'grammar-summary'],
    5,
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 3 · 확인하는데도 계속 그래요
  // 현재 동작 V-는데도
  // ──────────────────────────────────────────────────────────

  s5u7_241_reading_quiz: readingQuiz(
    '수리 기사가 지금 세탁기를 계속 확인하고 있습니다. 하지만 아직 고장 원인을 찾지 못했습니다.',
    '가장 자연스러운 문장은 무엇이에요?',
    [
      '수리 기사가 계속 확인하는데도 원인을 못 찾고 있어요.',
      '수리 기사가 계속 확인해서 원인을 못 찾고 있어요.',
      '수리 기사가 확인하려고 원인을 못 찾고 있어요.',
      '수리 기사가 확인하면서 원인을 못 찾고 있어요.',
    ],
    '수리 기사가 계속 확인하는데도 원인을 못 찾고 있어요.',
    L(
      '계속 확인 중이면 원인을 찾을 것으로 기대하지만 아직 찾지 못했어요.',
      'Doim tekshirayotgan bo‘lsa sabab topilishi kutiladi, ammo hali topilmadi.',
      'The technician keeps checking, but still cannot find the cause.',
      'Мастер продолжает проверять устройство, но всё ещё не может найти причину.',
    ),
    ['v-neundedo', 'repair-technician'],
    5,
  ),

  s5u7_242_type_answer: grammarTypeAnswer(
    '수리 기사가 계속 확인하는데도 원인을 찾지 못하고 있어요',
    L(
      '수리 기사가 계속 확인하고 있지만 아직 원인을 찾지 못했다고 쓰세요.',
      'Usta doim tekshirayotgan bo‘lsa ham, hali sababni topa olmaganini yozing.',
      'Write that the technician keeps checking but still cannot identify the cause.',
      'Напишите, что мастер продолжает проверять, но всё ещё не может найти причину.',
    ),
    'The technician continues checking the device, but still cannot identify the cause.',
    ['확인하는데도'],
    ['v-neundedo', 'repair-technician', 'type-answer'],
  ),

  s5u7_243_translate_builder: translateBuilder(
    L(
      '충전하고 있는데도 배터리가 계속 줄어든다고 말하기',
      'Quvvatlayotgan bo‘lsangiz ham, batareya kamayishda davom etayotganini ayting.',
      'Say that the battery keeps decreasing even though the phone is charging.',
      'Скажите, что заряд продолжает уменьшаться, хотя телефон подключён к зарядке.',
    ),
    [
      '충전하고 있는데도',
      '배터리가',
      '계속 줄어들어요',
      '전원을 끄고',
      '종이가',
      '수돗물을 잠가요',
    ],
    '충전하고 있는데도 배터리가 계속 줄어들어요',
    L(
      '충전 중이면 배터리가 늘어야 하지만 오히려 줄고 있어요.',
      'Quvvatlanayotganda batareya ko‘payishi kerak, ammo kamaymoqda.',
      'The battery should increase while charging, but instead it keeps decreasing.',
      'Во время зарядки уровень батареи должен расти, но он продолжает снижаться.',
    ),
    ['v-neundedo', 'battery'],
    5,
  ),

  s5u7_244_fill_in_blank: fillBlank(
    '충전하고 있___ 배터리가 계속 줄어들어요.',
    ['는데도'],
    ['는데도', '으니까', '으려고', '으면서', '으면'],
    L(
      '충전 중이라는 상황과 배터리가 줄어드는 예상 밖의 결과를 대비해요.',
      'Quvvatlanish holati va batareyaning kamayishi qarama-qarshi.',
      'Charging is contrasted with the unexpected decrease in battery level.',
      'Зарядка противопоставляется неожиданному снижению уровня батареи.',
    ),
    ['v-neundedo', 'battery'],
  ),

  s5u7_245_word_arrange: wordArrange(
    [
      '수리 기사가 확인하는데도',
      '이상한 소리가',
      '계속 나요',
      '채소를',
      '확인해서 멈추고',
      '종이를 얼려요',
    ],
    '수리 기사가 확인하는데도 이상한 소리가 계속 나요',
    L(
      '전문가가 확인 중이지만 증상이 사라지지 않아요.',
      'Mutaxassis tekshirayotgan bo‘lsa ham, belgi yo‘qolmayapti.',
      'The strange noise continues even while the technician is checking the device.',
      'Странный звук продолжается, хотя мастер проверяет устройство.',
    ),
    ['v-neundedo', 'sound'],
    5,
  ),

  s5u7_246_type_answer: grammarTypeAnswer(
    '수리 기사가 확인하는데도 이상한 소리가 계속 나요',
    L(
      '수리 기사가 확인하고 있지만 이상한 소리가 계속 난다고 쓰세요.',
      'Usta tekshirayotgan bo‘lsa ham, g‘alati ovoz davom etayotganini yozing.',
      'Write that the strange noise continues even though the technician is checking the device.',
      'Напишите, что странный звук продолжается, хотя мастер проверяет устройство.',
    ),
    'The technician is checking the device, but the strange noise continues.',
    ['확인하는데도'],
    ['v-neundedo', 'sound', 'type-answer'],
  ),

  s5u7_247_error_hunt: errorHunt(
    '충전하고 있는ㄴ데도 배터리가 줄어요.',
    '있는ㄴ데도',
    ['있는데도', '있으니까', '있으면서', '있으려고'],
    '있는데도',
    L(
      '`있다` 뒤에는 바로 `-는데도`가 붙어서 `있는데도`가 돼요.',
      '`있다`dan keyin bevosita `-는데도` kelib `있는데도` bo‘ladi.',
      '있다 takes -는데도 directly: 있는데도.',
      'После 있다 напрямую добавляется -는데도: 있는데도.',
    ),
    ['v-neundedo', 'conjugation'],
  ),

  s5u7_248_translate_builder: translateBuilder(
    L(
      '플러그를 확인하는데도 전원 문제가 계속된다고 표현하기',
      'Vilkani tekshirayotgan bo‘lsangiz ham, quvvat muammosi davom etayotganini ayting.',
      'Say that the power problem continues even though you keep checking the plug.',
      'Скажите, что проблема с питанием продолжается, хотя вы проверяете вилку.',
    ),
    [
      '플러그를 확인하는데도',
      '전원 문제가',
      '계속돼요',
      '종이를',
      '채소가',
      '시동을 걸어요',
    ],
    '플러그를 확인하는데도 전원 문제가 계속돼요',
    L(
      '연결 상태를 확인하고 있지만 문제는 사라지지 않아요.',
      'Ulanishni tekshirayotgan bo‘lsa ham, muammo yo‘qolmayapti.',
      'The connection is being checked, but the power problem remains.',
      'Подключение проверяют, но проблема с питанием остаётся.',
    ),
    ['v-neundedo', 'plug'],
    5,
  ),

  s5u7_249_reading_quiz: readingQuiz(
    '세탁기가 작동하는 동안 계속 지켜보고 있습니다. 물은 들어오지만 탈수가 시작되지 않습니다.',
    '가장 알맞은 문장은 무엇이에요?',
    [
      '세탁기가 돌아가는데도 탈수가 안 돼요.',
      '세탁기가 돌아가서 탈수가 안 돼요.',
      '세탁기가 돌려고 탈수가 안 돼요.',
      '세탁기가 돌면서 탈수를 안 해요.',
    ],
    '세탁기가 돌아가는데도 탈수가 안 돼요.',
    L(
      '세탁기 자체는 움직이고 있지만 기대했던 탈수 기능은 작동하지 않아요.',
      'Mashina ishlayotgan bo‘lsa ham, siqish funksiyasi ishlamayapti.',
      'The washing machine runs, but the spin cycle still does not work.',
      'Стиральная машина работает, но отжим всё равно не запускается.',
    ),
    ['v-neundedo', 'washing-machine'],
    5,
  ),

  s5u7_250_fill_in_blank: fillBlank(
    '세탁기가 돌아가___ 탈수가 안 돼요.',
    ['는데도'],
    ['는데도', '면서', '니까', '려고', '면'],
    L(
      '전체 기기는 작동하지만 특정 기능은 작동하지 않는 대비예요.',
      'Qurilma ishlaydi, ammo ma’lum funksiya ishlamaydi.',
      'The machine runs, but a specific function does not work.',
      'Машина работает, но отдельная функция не работает.',
    ),
    ['v-neundedo', 'washing-machine'],
  ),

  s5u7_251_type_answer: grammarTypeAnswer(
    '세탁기가 돌아가는데도 탈수가 안 돼요',
    L(
      '세탁기는 작동하고 있지만 탈수 기능은 작동하지 않는다고 쓰세요.',
      'Kir yuvish mashinasi ishlayotgan bo‘lsa ham, siqish ishlamayotganini yozing.',
      'Write that the washing machine is running, but the spin cycle does not work.',
      'Напишите, что стиральная машина работает, но отжим не работает.',
    ),
    'The washing machine runs, but contrary to expectation the spin cycle does not work.',
    ['돌아가는데도'],
    ['v-neundedo', 'washing-machine', 'type-answer'],
  ),

  s5u7_252_translate_builder: translateBuilder(
    L(
      '전화를 다시 걸고 있는데도 연결이 계속 끊긴다고 말하기',
      'Qayta qo‘ng‘iroq qilayotgan bo‘lsangiz ham, aloqa uzilaverayotganini ayting.',
      'Say that the connection keeps dropping even though you keep calling again.',
      'Скажите, что связь продолжает обрываться, хотя вы снова звоните.',
    ),
    [
      '다시 전화하는데도',
      '연결이',
      '계속 끊겨요',
      '종이를',
      '채소를 얼리고',
      '수돗물을 틀어요',
    ],
    '다시 전화하는데도 연결이 계속 끊겨요',
    L(
      '통화를 다시 시도해도 같은 연결 문제가 반복돼요.',
      'Qo‘ng‘iroq qayta qilinsa ham, bir xil aloqa muammosi takrorlanadi.',
      'The same connection problem repeats even after trying the call again.',
      'Та же проблема со связью повторяется даже после повторного звонка.',
    ),
    ['v-neundedo', 'phone'],
    5,
  ),

  s5u7_253_cloze_passage: clozePassage(
    '세탁기가 ___ 탈수가 안 되고, 휴대폰을 ___ 전화가 계속 끊겨요.',
    ['돌아가는데도', '사용하는데도'],
    ['사용하는데도', '돌아가는데도', '돌아서', '사용하려고', '꺼졌는데도'],
    L(
      '현재 진행되는 상황 뒤의 예상 밖 결과를 두 문장으로 연습해요.',
      'Davom etayotgan holatdan keyingi kutilmagan natija ikki vaziyatda mashq qilinadi.',
      'Practise unexpected outcomes while an action or state is ongoing.',
      'Тренируем неожиданный результат при продолжающемся действии или состоянии.',
    ),
    ['v-neundedo', 'ongoing'],
    5,
  ),

  s5u7_254_word_arrange: wordArrange(
    [
      '충전기를 연결하는데도',
      '배터리가',
      '늘지 않아요',
      '충전기를 빼고',
      '종이가',
      '전원을 먹어요',
    ],
    '충전기를 연결하는데도 배터리가 늘지 않아요',
    L(
      '충전기를 연결하고 있지만 기대한 충전 결과가 나타나지 않아요.',
      'Zaryadlovchi ulangan bo‘lsa ham, batareya ko‘paymayapti.',
      'The battery level does not increase even though the charger is connected.',
      'Уровень заряда не растёт, хотя зарядное устройство подключено.',
    ),
    ['v-neundedo', 'battery'],
    5,
  ),

  s5u7_255_type_answer: grammarTypeAnswer(
    '충전기를 연결하는데도 배터리가 늘지 않아요',
    L(
      '충전기를 연결하고 있지만 배터리가 늘지 않는다고 쓰세요.',
      'Zaryadlovchi ulangan bo‘lsa ham, batareya oshmayotganini yozing.',
      'Write that the battery level does not increase even though the charger is connected.',
      'Напишите, что заряд не увеличивается, хотя зарядное устройство подключено.',
    ),
    'The charger is connected, but the battery level does not increase.',
    ['연결하는데도'],
    ['v-neundedo', 'battery', 'type-answer'],
  ),

  s5u7_256_reading_quiz: readingQuiz(
    '직원이 수리 신청 정보를 컴퓨터에 계속 입력하고 있습니다. 그런데 시스템 오류 때문에 접수가 완료되지 않습니다.',
    '가장 자연스러운 표현은 무엇이에요?',
    [
      '정보를 입력하는데도 접수가 완료되지 않아요.',
      '정보를 입력해서 접수가 완료되지 않아요.',
      '정보를 입력하려고 접수가 완료되지 않아요.',
      '정보를 입력하면서 접수를 취소해요.',
    ],
    '정보를 입력하는데도 접수가 완료되지 않아요.',
    L(
      '필요한 정보를 입력하고 있지만 시스템 문제로 접수가 끝나지 않아요.',
      'Kerakli ma’lumot kiritilayotgan bo‘lsa ham, tizim xatosi sabab ro‘yxat tugamayapti.',
      'The registration does not complete even though the information is being entered.',
      'Регистрация не завершается, хотя данные вводятся.',
    ),
    ['v-neundedo', 'repair-request'],
    5,
  ),

  s5u7_257_translate_builder: translateBuilder(
    L(
      '수리 신청을 하고 있는데도 접수가 완료되지 않는다고 표현하기',
      'Ta’mirlash arizasini topshirayotgan bo‘lsangiz ham, ro‘yxat tugamayotganini ayting.',
      'Say that registration is not completing even though you are submitting the repair request.',
      'Скажите, что регистрация не завершается, хотя вы оформляете заявку на ремонт.',
    ),
    [
      '수리 신청을 하는데도',
      '접수가',
      '완료되지 않아요',
      '액정을',
      '종이가 걸리고',
      '시동을 껐어요',
    ],
    '수리 신청을 하는데도 접수가 완료되지 않아요',
    L(
      '신청 절차를 진행하고 있지만 시스템상 완료되지 않는 상황이에요.',
      'Ariza jarayoni davom etmoqda, ammo tizimda tugamayapti.',
      'The request process is underway, but the system does not complete it.',
      'Заявка оформляется, но система не завершает регистрацию.',
    ),
    ['v-neundedo', 'repair-request'],
    5,
  ),

  s5u7_258_fill_in_blank: fillBlank(
    '수리 신청 정보를 입력하___ 접수가 완료되지 않아요.',
    ['는데도'],
    ['는데도', '려고', '니까', '면서', '면'],
    L(
      '정보 입력 중이라는 상황과 완료되지 않는 결과가 대비돼요.',
      'Ma’lumot kiritilmoqda, ammo jarayon tugamayapti.',
      'Entering the information is contrasted with the failure to complete registration.',
      'Ввод информации противопоставляется тому, что регистрация не завершается.',
    ),
    ['v-neundedo', 'repair-request'],
  ),

  s5u7_259_error_hunt: errorHunt(
    '세탁기가 돌아가는ㄴ데도 탈수가 안 돼요.',
    '돌아가는ㄴ데도',
    ['돌아가는데도', '돌아가면서', '돌아가니까', '돌아가려고'],
    '돌아가는데도',
    L(
      '동사 현재형은 어간에 `-는데도`를 붙여 `돌아가는데도`로 써요.',
      'Hozirgi zamon fe’liga `-는데도` qo‘shilib `돌아가는데도` bo‘ladi.',
      'For a present-tense verb, attach -는데도 directly: 돌아가는데도.',
      'Для глагола настоящего времени используется -는데도: 돌아가는데도.',
    ),
    ['v-neundedo', 'conjugation'],
  ),

  s5u7_260_word_arrange: wordArrange(
    [
      '현재 계속되는 행동에도',
      '`V-는데도`를 사용해서',
      '예상 밖의 결과를 말할 수 있어요',
      '명사에만 쓰고',
      '반드시 과거만 말하고',
      '항상 원인을 나타내요',
    ],
    '현재 계속되는 행동에도 `V-는데도`를 사용해서 예상 밖의 결과를 말할 수 있어요',
    L(
      '완료된 행동뿐 아니라 현재 진행 중인 상황에도 사용할 수 있다는 점을 정리해요.',
      'Bu shakl tugallangan harakatdan tashqari hozir davom etayotgan vaziyatda ham ishlatiladi.',
      'The grammar can describe unexpected results during ongoing actions as well as completed ones.',
      'Грамматика используется не только после завершённых, но и при продолжающихся действиях.',
    ),
    ['v-neundedo', 'grammar-summary'],
    5,
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 4 · 이렇게 했는데도 안 돼요
  // 고장 대처를 했지만 해결되지 않는 상황
  // ──────────────────────────────────────────────────────────

  s5u7_261_reading_quiz: readingQuiz(
    '컴퓨터가 켜지지 않아 플러그를 뺐다가 다시 꽂았습니다. 전원 버튼도 여러 번 눌러 봤습니다. 하지만 아무 반응이 없습니다.',
    '상황을 가장 잘 설명한 문장은 무엇이에요?',
    [
      '여러 가지 방법을 해 봤는데도 전원이 안 들어와요.',
      '여러 가지 방법을 해서 전원이 안 들어와요.',
      '전원을 켜려고 플러그를 뺐어요.',
      '플러그를 빼면서 전원이 들어와요.',
    ],
    '여러 가지 방법을 해 봤는데도 전원이 안 들어와요.',
    L(
      '여러 대처를 시도했으므로 해결될 것으로 기대하지만 여전히 작동하지 않아요.',
      'Bir necha usul sinab ko‘rilgani uchun hal bo‘lishi kutiladi, ammo ishlamayapti.',
      'Several troubleshooting steps were tried, but the device still has no power.',
      'Было испробовано несколько способов, но питание всё равно не включается.',
    ),
    ['v-neundedo', 'troubleshooting'],
    5,
  ),

  s5u7_262_type_answer: grammarTypeAnswer(
    '여러 가지 방법을 해 봤는데도 전원이 안 들어와요',
    L(
      '여러 해결 방법을 시도했지만 전원이 들어오지 않는다고 쓰세요.',
      'Bir necha yechimni sinab ko‘rsangiz ham, quvvat kelmayotganini yozing.',
      'Write that the device still has no power even though you tried several solutions.',
      'Напишите, что питание всё равно не включается, хотя вы попробовали несколько способов.',
    ),
    'Several troubleshooting methods were tried, but the device still has no power.',
    ['봤는데도'],
    ['v-neundedo', 'troubleshooting', 'type-answer'],
  ),

  s5u7_263_translate_builder: translateBuilder(
    L(
      '전원을 껐다가 다시 켜 봤는데도 화면이 나오지 않는다고 말하기',
      'Qurilmani o‘chirib yana yoqib ko‘rgan bo‘lsangiz ham, ekran chiqmayotganini ayting.',
      'Say that the screen still does not appear even though you restarted the device.',
      'Скажите, что экран всё равно не появляется, хотя вы перезапустили устройство.',
    ),
    [
      '전원을 껐다가 다시 켜 봤는데도',
      '화면이',
      '안 나와요',
      '종이를 제거해서',
      '채소가',
      '수돗물을 틀어요',
    ],
    '전원을 껐다가 다시 켜 봤는데도 화면이 안 나와요',
    L(
      '재시작이라는 기본 대처가 화면 문제를 해결하지 못했어요.',
      'Qayta ishga tushirish ekran muammosini hal qilmadi.',
      'Restarting did not solve the screen problem.',
      'Перезапуск не решил проблему с экраном.',
    ),
    ['v-neundedo', 'screen'],
    5,
  ),

  s5u7_264_fill_in_blank: fillBlank(
    '전원을 다시 켜 봤___ 화면이 안 나와요.',
    ['는데도'],
    ['는데도', '으니까', '으면서', '으려고', '으면'],
    L(
      '재시작 후에도 화면 고장이 계속돼요.',
      'Qayta yoqilgandan keyin ham ekran muammosi davom etmoqda.',
      'The screen problem continues even after restarting.',
      'Проблема с экраном сохраняется даже после перезапуска.',
    ),
    ['v-neundedo', 'screen'],
  ),

  s5u7_265_word_arrange: wordArrange(
    [
      '플러그를 다시 꽂았는데도',
      '컴퓨터가',
      '켜지지 않아요',
      '플러그를 빼서',
      '종이가',
      '채소를 수리해요',
    ],
    '플러그를 다시 꽂았는데도 컴퓨터가 켜지지 않아요',
    L(
      '전기 연결을 복구했지만 컴퓨터가 작동하지 않아요.',
      'Elektr aloqasi tiklangan bo‘lsa ham, kompyuter yoqilmayapti.',
      'The computer still does not turn on even after reconnecting the plug.',
      'Компьютер всё равно не включается после повторного подключения вилки.',
    ),
    ['v-neundedo', 'plug'],
    5,
  ),

  s5u7_266_type_answer: grammarTypeAnswer(
    '플러그를 다시 꽂았는데도 컴퓨터가 켜지지 않아요',
    L(
      '플러그를 다시 연결했지만 컴퓨터가 켜지지 않는다고 쓰세요.',
      'Vilkani qayta ulagan bo‘lsangiz ham, kompyuter yoqilmayotganini yozing.',
      'Write that the computer does not turn on even though you reconnected the plug.',
      'Напишите, что компьютер не включается, хотя вы снова подключили вилку.',
    ),
    'The plug was reconnected, but the computer still does not turn on.',
    ['꽂았는데도'],
    ['v-neundedo', 'plug', 'type-answer'],
  ),

  s5u7_267_error_hunt: errorHunt(
    '전원을 다시 켜 봤으니까 화면이 안 나와요.',
    '봤으니까',
    ['봤는데도', '보려고', '보면서', '봤다가'],
    '봤는데도',
    L(
      '재시작했지만 문제가 남아 있으므로 원인이 아니라 예상 밖의 결과를 나타내야 해요.',
      'Qayta yoqilgan bo‘lsa ham muammo qolgan, shuning uchun sabab emas, qarama-qarshilik kerak.',
      'The restart did not solve the problem, so contrast—not cause—is required.',
      'Перезапуск не решил проблему, поэтому нужно выразить контраст, а не причину.',
    ),
    ['v-neundedo', 'meaning-contrast'],
  ),

  s5u7_268_translate_builder: translateBuilder(
    L(
      '걸린 종이를 빼냈는데도 복사기가 계속 멈춘다고 표현하기',
      'Tiqilgan qog‘ozni olib tashlagan bo‘lsangiz ham, qurilma to‘xtayverayotganini ayting.',
      'Say that the copier keeps stopping even though you removed the jammed paper.',
      'Скажите, что копир продолжает останавливаться, хотя застрявшую бумагу убрали.',
    ),
    [
      '걸린 종이를 빼냈는데도',
      '복사기가',
      '계속 멈춰요',
      '종이를 넣어서',
      '채소가',
      '전화를 걸어요',
    ],
    '걸린 종이를 빼냈는데도 복사기가 계속 멈춰요',
    L(
      '가장 obvious한 원인을 제거했지만 고장이 계속돼요.',
      'Eng aniq sabab olib tashlangan bo‘lsa ham, nosozlik davom etmoqda.',
      'The obvious cause was removed, but the malfunction continues.',
      'Очевидную причину устранили, но неисправность продолжается.',
    ),
    ['v-neundedo', 'paper-jam'],
    5,
  ),

  s5u7_269_reading_quiz: readingQuiz(
    '세탁기에 물이 들어오지 않아서 수도꼭지를 확인했습니다. 수도는 열려 있었고 다시 잠갔다가 틀어 보기도 했지만 물은 여전히 들어오지 않았습니다.',
    '가장 알맞은 설명은 무엇이에요?',
    [
      '수도를 다시 확인했는데도 물이 안 들어와요.',
      '수도를 확인해서 물이 안 들어와요.',
      '수도를 확인하려고 물이 안 들어와요.',
      '수도를 확인하면서 물을 막아요.',
    ],
    '수도를 다시 확인했는데도 물이 안 들어와요.',
    L(
      '급수와 관련된 기본 확인을 했지만 문제가 계속돼요.',
      'Suv ta’minoti tekshirilgan bo‘lsa ham, muammo davom etmoqda.',
      'The water supply was checked, but the problem continues.',
      'Подачу воды проверили, но проблема остаётся.',
    ),
    ['v-neundedo', 'water'],
    5,
  ),

  s5u7_270_fill_in_blank: fillBlank(
    '수도를 다시 확인했___ 물이 안 들어와요.',
    ['는데도'],
    ['는데도', '으려고', '으면서', '으니까', '으면'],
    L(
      '필요한 확인을 했지만 급수 문제가 해결되지 않았어요.',
      'Kerakli tekshiruv bajarilgan bo‘lsa ham, suv muammosi hal bo‘lmadi.',
      'The necessary check was done, but the water-supply issue remains.',
      'Нужная проверка была выполнена, но проблема с подачей воды осталась.',
    ),
    ['v-neundedo', 'water'],
  ),

  s5u7_271_type_answer: grammarTypeAnswer(
    '수도를 다시 확인했는데도 세탁기에 물이 안 들어와요',
    L(
      '수도 상태를 다시 확인했지만 세탁기에 물이 들어오지 않는다고 쓰세요.',
      'Suv holatini yana tekshirgan bo‘lsangiz ham, mashinaga suv kelmayotganini yozing.',
      'Write that water still does not enter the washing machine even though you checked the tap again.',
      'Напишите, что вода всё равно не поступает в стиральную машину, хотя вы снова проверили кран.',
    ),
    'The water connection was checked again, but water still does not enter the washing machine.',
    ['확인했는데도'],
    ['v-neundedo', 'water', 'type-answer'],
  ),

  s5u7_272_translate_builder: translateBuilder(
    L(
      '충전기를 새것으로 바꿨는데도 배터리가 충전되지 않는다고 말하기',
      'Zaryadlovchini yangisiga almashtirgan bo‘lsangiz ham, batareya quvvatlanmayotganini ayting.',
      'Say that the battery does not charge even though you replaced the charger with a new one.',
      'Скажите, что батарея не заряжается, хотя вы заменили зарядное устройство новым.',
    ),
    [
      '충전기를 새것으로 바꿨는데도',
      '배터리가',
      '충전되지 않아요',
      '종이를 제거해서',
      '채소가',
      '수돗물을 잠가요',
    ],
    '충전기를 새것으로 바꿨는데도 배터리가 충전되지 않아요',
    L(
      '충전기 자체가 원인일 것으로 예상했지만 교체해도 문제가 남아 있어요.',
      'Muammo zaryadlovchida deb o‘ylangan, ammo almashtirilgandan keyin ham qolmoqda.',
      'The charger seemed to be the cause, but replacing it did not solve the problem.',
      'Предполагалось, что причина в зарядном устройстве, но его замена не помогла.',
    ),
    ['v-neundedo', 'battery'],
    5,
  ),

  s5u7_273_cloze_passage: clozePassage(
    '전원을 다시 ___ 화면이 안 나오고, 플러그를 다시 ___ 컴퓨터가 켜지지 않았어요.',
    ['켰는데도', '꽂았는데도'],
    ['꽂았는데도', '켰는데도', '켜서', '빼면서', '잠그려고'],
    L(
      '두 가지 기본 대처가 모두 실패한 상황을 비교해요.',
      'Ikki oddiy choraning ham samara bermagan holati taqqoslanadi.',
      'Two failed troubleshooting attempts are compared.',
      'Сравниваются две безуспешные попытки устранения неисправности.',
    ),
    ['v-neundedo', 'troubleshooting'],
    5,
  ),

  s5u7_274_word_arrange: wordArrange(
    [
      '여러 방법을 시도했는데도',
      '문제가 해결되지 않아서',
      '수리 센터에 연락했어요',
      '채소를 얼리고',
      '종이를',
      '시동을 걸었어요',
    ],
    '여러 방법을 시도했는데도 문제가 해결되지 않아서 수리 센터에 연락했어요',
    L(
      '기본 대처가 실패한 뒤 전문 수리로 넘어가는 흐름이에요.',
      'Oddiy choralar samara bermagach professional ta’mirga o‘tiladi.',
      'The flow moves from failed basic troubleshooting to professional repair.',
      'После неудачных базовых действий переходят к профессиональному ремонту.',
    ),
    ['v-neundedo', 'repair-flow'],
    5,
  ),

  s5u7_275_type_answer: grammarTypeAnswer(
    '여러 방법을 시도했는데도 문제가 해결되지 않아서 수리 센터에 연락했어요',
    L(
      '여러 해결 방법을 해 봤지만 문제가 남아서 수리 센터에 연락했다고 쓰세요.',
      'Bir necha yechimni sinab ko‘rgan bo‘lsangiz ham muammo qolib, servis markaziga murojaat qilganingizni yozing.',
      'Write that you contacted the repair center because the problem remained even after trying several solutions.',
      'Напишите, что вы обратились в сервисный центр, потому что проблема осталась, несмотря на несколько попыток её решить.',
    ),
    'Several troubleshooting methods were attempted, but the problem remained, so the speaker contacted a repair center.',
    ['시도했는데도'],
    ['v-neundedo', 'repair-flow', 'type-answer'],
  ),

  s5u7_276_reading_quiz: readingQuiz(
    '수리 센터에서 지난주에 액정을 새것으로 교체했습니다. 하지만 오늘 다시 화면에 줄이 생겼습니다.',
    '현재 상황을 가장 정확하게 설명한 것은 무엇이에요?',
    [
      '액정을 새것으로 교체했는데도 다시 문제가 생겼어요.',
      '액정을 교체해서 다시 문제가 생겼어요.',
      '액정을 교체하려고 다시 문제가 생겼어요.',
      '액정을 교체하면서 문제가 없어졌어요.',
    ],
    '액정을 새것으로 교체했는데도 다시 문제가 생겼어요.',
    L(
      '새 부품으로 바꾸면 정상이어야 하지만 같은 종류의 문제가 다시 나타났어요.',
      'Yangi qism o‘rnatilgach normal bo‘lishi kerak edi, ammo muammo yana paydo bo‘ldi.',
      'The display was replaced with a new one, but a problem appeared again.',
      'Дисплей заменили новым, но проблема снова появилась.',
    ),
    ['v-neundedo', 'replacement'],
    5,
  ),

  s5u7_277_translate_builder: translateBuilder(
    L(
      '새 액정으로 교체했는데도 화면에 문제가 있다고 설명하기',
      'Yangi displeyga almashtirilgan bo‘lsa ham, ekranda muammo borligini tushuntiring.',
      'Explain that there is still a screen problem even though the display was replaced.',
      'Объясните, что проблема с экраном осталась, хотя дисплей заменили.',
    ),
    [
      '새 액정으로 교체했는데도',
      '화면에',
      '문제가 있어요',
      '종이를 바꿔서',
      '채소가',
      '수돗물을 틀었어요',
    ],
    '새 액정으로 교체했는데도 화면에 문제가 있어요',
    L(
      '부품 교체라는 전문 수리를 했지만 고장이 완전히 해결되지 않았어요.',
      'Professional qism almashtirish bajarilgan bo‘lsa ham, muammo to‘liq hal bo‘lmadi.',
      'Even professional part replacement did not fully resolve the problem.',
      'Даже профессиональная замена детали не решила проблему полностью.',
    ),
    ['v-neundedo', 'replacement'],
    5,
  ),

  s5u7_278_fill_in_blank: fillBlank(
    '새 부품으로 교체했___ 같은 증상이 다시 나타났어요.',
    ['는데도'],
    ['는데도', '으니까', '으면서', '으려고', '으면'],
    L(
      '새 부품으로 바꿨지만 동일한 고장 증상이 반복됐어요.',
      'Yangi qismga almashtirilgan bo‘lsa ham, bir xil belgi takrorlandi.',
      'The same symptom returned despite replacing the part.',
      'Тот же симптом повторился, несмотря на замену детали.',
    ),
    ['v-neundedo', 'replacement'],
  ),

  s5u7_279_error_hunt: errorHunt(
    '여러 방법을 시도했는데서 문제가 해결되지 않았어요.',
    '했는데서',
    ['했는데도', '해서', '하면서', '하려고'],
    '했는데도',
    L(
      '여러 방법을 시도했지만 결과가 기대와 다르므로 `-는데도`가 필요해요.',
      'Bir necha usul sinab ko‘rilgan, ammo natija kutilganday emas, shuning uchun `-는데도` kerak.',
      'The attempts did not produce the expected result, so -는데도 is required.',
      'Попытки не дали ожидаемого результата, поэтому нужно -는데도.',
    ),
    ['v-neundedo', 'meaning-contrast'],
  ),

  s5u7_280_word_arrange: wordArrange(
    [
      '기본 대처를 했는데도',
      '고장 증상이 계속되면',
      '전문 점검이 필요해요',
      '같은 행동만 반복하고',
      '채소를',
      '종이를 먹어요',
    ],
    '기본 대처를 했는데도 고장 증상이 계속되면 전문 점검이 필요해요',
    L(
      '문법을 실제 고장 판단 기준과 연결해요.',
      'Grammatika real nosozlikni baholash mezoni bilan bog‘lanadi.',
      'The grammar is connected to a practical decision about when professional inspection is needed.',
      'Грамматика связывается с практическим решением о необходимости профессиональной проверки.',
    ),
    ['v-neundedo', 'repair'],
    5,
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 5 · 수리했는데도 또 그래요
  // 증상 + 조치 + 기대와 다른 결과 종합
  // ──────────────────────────────────────────────────────────

  s5u7_281_reading_quiz: readingQuiz(
    '휴대폰 화면이 안 나와서 수리 센터에 갔습니다. 수리 기사가 액정을 새것으로 교체했습니다. 처음에는 괜찮았지만 이틀 뒤 다시 화면이 나오지 않았습니다.',
    '상황을 가장 정확하게 요약한 것은 무엇이에요?',
    [
      '액정을 교체했는데도 화면 문제가 다시 생겼어요.',
      '액정을 교체해서 화면 문제가 생겼어요.',
      '액정을 교체하려고 화면 문제가 생겼어요.',
      '액정을 교체하면서 문제가 완전히 해결됐어요.',
    ],
    '액정을 교체했는데도 화면 문제가 다시 생겼어요.',
    L(
      '전문 수리를 했으면 문제가 없어야 하지만 다시 같은 문제가 생겼어요.',
      'Professional ta’mirdan keyin muammo bo‘lmasligi kerak edi, ammo yana paydo bo‘ldi.',
      'The display problem returned even though the display had been replaced.',
      'Проблема с экраном вернулась, хотя дисплей был заменён.',
    ),
    ['v-neundedo', 'repair-review'],
    5,
  ),

  s5u7_282_type_answer: grammarTypeAnswer(
    '액정을 새것으로 교체했는데도 화면 문제가 다시 생겼어요',
    L(
      '액정을 새 부품으로 바꿨지만 화면 문제가 다시 생겼다고 쓰세요.',
      'Displeyni yangisiga almashtirgan bo‘lsangiz ham, ekran muammosi yana paydo bo‘lganini yozing.',
      'Write that the screen problem returned even though the display was replaced with a new one.',
      'Напишите, что проблема с экраном снова появилась, хотя дисплей заменили новым.',
    ),
    'The display was replaced with a new one, but the screen problem returned.',
    ['교체했는데도'],
    ['v-neundedo', 'replacement', 'type-answer'],
  ),

  s5u7_283_translate_builder: translateBuilder(
    L(
      '지난주에 수리했는데도 같은 문제가 다시 생겼다고 말하기',
      'O‘tgan hafta ta’mirlangan bo‘lsa ham, bir xil muammo yana paydo bo‘lganini ayting.',
      'Say that the same problem happened again even though it was repaired last week.',
      'Скажите, что та же проблема появилась снова, хотя устройство ремонтировали на прошлой неделе.',
    ),
    [
      '지난주에 수리했는데도',
      '같은 문제가',
      '다시 생겼어요',
      '새 제품이라서',
      '종이가',
      '수돗물을 잠갔어요',
    ],
    '지난주에 수리했는데도 같은 문제가 다시 생겼어요',
    L(
      '최근 수리라는 기대와 반복되는 고장 결과를 대비해요.',
      'Yaqindagi ta’mir va takrorlangan nosozlik qarama-qarshi.',
      'A recent repair is contrasted with the return of the same malfunction.',
      'Недавний ремонт противопоставляется повторению той же неисправности.',
    ),
    ['v-neundedo', 'repair'],
    5,
  ),

  s5u7_284_fill_in_blank: fillBlank(
    '지난주에 수리했___ 같은 문제가 또 생겼어요.',
    ['는데도'],
    ['는데도', '으니까', '으려고', '으면서', '으면'],
    L(
      '최근 수리 후에도 같은 문제가 반복됐어요.',
      'Yaqinda ta’mirlanganidan keyin ham muammo takrorlandi.',
      'The same problem returned despite the recent repair.',
      'Та же проблема повторилась, несмотря на недавний ремонт.',
    ),
    ['v-neundedo', 'repair'],
  ),

  s5u7_285_word_arrange: wordArrange(
    [
      '새 제품인데도',
      '전화가 자꾸 끊겨서',
      '수리 신청을 했어요',
      '오래된 제품이라서',
      '채소를',
      '종이를 교체했어요',
    ],
    '새 제품인데도 전화가 자꾸 끊겨서 수리 신청을 했어요',
    L(
      '새 제품에서 예상 밖의 통화 문제가 반복돼 수리를 요청했어요.',
      'Yangi mahsulotda kutilmagan aloqa muammosi takrorlanib, ta’mir so‘raldi.',
      'A repair was requested because calls kept disconnecting even though the phone was new.',
      'Ремонт запросили, потому что связь постоянно обрывалась, хотя телефон был новым.',
    ),
    ['n-inde-do', 'repair-request'],
    5,
  ),

  s5u7_286_type_answer: grammarTypeAnswer(
    '새 제품인데도 전화가 자꾸 끊겨서 수리 신청을 했어요',
    L(
      '새 휴대폰이지만 전화가 계속 끊겨서 수리를 신청했다고 쓰세요.',
      'Telefon yangi bo‘lsa ham, aloqa uzilaverib ta’mirga ariza berganingizni yozing.',
      'Write that you requested repair because calls kept disconnecting even though the phone was new.',
      'Напишите, что вы подали заявку на ремонт, потому что связь постоянно обрывалась, хотя телефон был новым.',
    ),
    'The phone is new, but calls keep disconnecting, so the speaker requested repair.',
    ['인데도'],
    ['n-inde-do', 'repair-request', 'type-answer'],
  ),

  s5u7_287_error_hunt: errorHunt(
    '새 제품은데도 전화가 자꾸 끊겨요.',
    '제품은데도',
    ['제품인데도', '제품이라서', '제품이니까', '제품이면서'],
    '제품인데도',
    L(
      '명사 뒤에는 반드시 `N인데도`를 사용해요.',
      'Ot so‘zdan keyin `N인데도` ishlatiladi.',
      'A noun takes N인데도.',
      'После существительного используется N인데도.',
    ),
    ['n-inde-do', 'conjugation'],
  ),

  s5u7_288_translate_builder: translateBuilder(
    L(
      '수리비가 비싼데도 필요한 부품을 교체하기로 했다고 표현하기',
      'Ta’mirlash qimmat bo‘lsa ham, kerakli qismni almashtirishga qaror qilganingizni ayting.',
      'Say that you decided to replace the necessary part even though the repair cost is high.',
      'Скажите, что вы решили заменить нужную деталь, хотя ремонт дорогой.',
    ),
    [
      '수리비가 비싼데도',
      '필요한 부품을',
      '교체하기로 했어요',
      '수리비가 싸서',
      '종이를',
      '채소를 얼렸어요',
    ],
    '수리비가 비싼데도 필요한 부품을 교체하기로 했어요',
    L(
      '비싼 비용에도 불구하고 정상 사용을 위해 부품 교체를 선택했어요.',
      'Qimmat bo‘lsa ham, normal foydalanish uchun qism almashtirish tanlandi.',
      'The part will be replaced despite the high cost because it is necessary.',
      'Несмотря на высокую стоимость, решили заменить необходимую деталь.',
    ),
    ['a-eundedo', 'replacement'],
    5,
  ),

  s5u7_289_reading_quiz: readingQuiz(
    '수리 기사는 오랫동안 이 일을 해 온 전문가입니다. 하지만 이번 문제는 여러 번 확인해도 정확한 원인을 찾기 어려웠습니다.',
    '가장 알맞은 문장은 무엇이에요?',
    [
      '경험이 많은 수리 기사인데도 원인을 찾기 어려웠어요.',
      '경험이 많은 기사라서 원인을 찾기 어려웠어요.',
      '기사가 되려고 원인을 찾지 못했어요.',
      '기사가 일하면서 경험이 없었어요.',
    ],
    '경험이 많은 수리 기사인데도 원인을 찾기 어려웠어요.',
    L(
      '전문가라는 기대와 실제 진단의 어려움이 대비돼요.',
      'Mutaxassis bo‘lish haqidagi kutish va haqiqiy tashxis qiyinligi qarama-qarshi.',
      'Being an experienced professional contrasts with the difficulty of the diagnosis.',
      'Опыт специалиста противопоставляется сложности диагностики.',
    ),
    ['n-inde-do', 'repair-technician'],
    5,
  ),

  s5u7_290_fill_in_blank: fillBlank(
    '경험이 많은 수리 기사___ 원인을 바로 찾지 못했어요.',
    ['인데도'],
    ['인데도', '이라서', '이면서', '이니까', '이면'],
    L(
      '전문가라는 사실과 예상 밖의 진단 실패를 연결해요.',
      'Mutaxassis bo‘lish holati va kutilmagan tashxis qiyinligi bog‘lanadi.',
      'The professional role is contrasted with the unexpected failure to diagnose immediately.',
      'Профессиональный статус противопоставляется неожиданной сложности диагностики.',
    ),
    ['n-inde-do', 'repair-technician'],
  ),

  s5u7_291_type_answer: grammarTypeAnswer(
    '경험이 많은 수리 기사인데도 원인을 바로 찾지 못했어요',
    L(
      '경험 많은 수리 기사지만 원인을 바로 찾지 못했다고 쓰세요.',
      'Tajribali usta bo‘lsa ham, sababni darhol topa olmaganini yozing.',
      'Write that the experienced repair technician still could not identify the cause immediately.',
      'Напишите, что даже опытный мастер не смог сразу определить причину.',
    ),
    'The technician is experienced, but still could not identify the cause immediately.',
    ['인데도'],
    ['n-inde-do', 'repair-technician', 'type-answer'],
  ),

  s5u7_292_translate_builder: translateBuilder(
    L(
      '설명서를 따라 했는데도 해결되지 않아 수리를 신청했다고 말하기',
      'Qo‘llanmadagi ko‘rsatmalarga amal qilsangiz ham muammo hal bo‘lmay, ta’mirga ariza berganingizni ayting.',
      'Say that you requested repair because the problem was not solved even though you followed the manual.',
      'Скажите, что вы подали заявку на ремонт, потому что проблема не решилась, хотя вы следовали инструкции.',
    ),
    [
      '사용 설명서대로 했는데도',
      '문제가 해결되지 않아서',
      '수리 신청을 했어요',
      '종이를 제거해서',
      '채소를',
      '시동을 걸었어요',
    ],
    '사용 설명서대로 했는데도 문제가 해결되지 않아서 수리 신청을 했어요',
    L(
      '직접 해결 단계를 끝낸 뒤 전문 수리로 넘어간 상황이에요.',
      'Mustaqil yechim bosqichi tugagach professional ta’mirga o‘tildi.',
      'The speaker moved to professional repair after self-troubleshooting failed.',
      'После безуспешной самостоятельной проверки обратились за профессиональным ремонтом.',
    ),
    ['v-neundedo', 'repair-request'],
    5,
  ),

  s5u7_293_cloze_passage: clozePassage(
    '새 제품___ 전화가 자꾸 끊기고, 전원을 다시 ___ 같은 문제가 계속됐습니다.',
    ['인데도', '켰는데도'],
    ['켰는데도', '인데도', '이라서', '켜면서', '끄려고'],
    L(
      '명사형 `인데도`와 동사형 `-는데도`를 하나의 실제 고장 상황에서 함께 사용해요.',
      'Ot `인데도` va fe’l `-는데도` bir real nosozlik vaziyatida birga ishlatiladi.',
      'N인데도 and V-는데도 are combined in one realistic malfunction scenario.',
      'N인데도 и V-는데도 используются вместе в одной реальной ситуации неисправности.',
    ),
    ['n-inde-do', 'v-neundedo'],
    5,
  ),

  s5u7_294_word_arrange: wordArrange(
    [
      '수리했는데도 문제가 반복되면',
      '언제 어떤 수리를 받았는지',
      '정확히 설명하는 것이 좋아요',
      '고장 사실을 숨기고',
      '채소를',
      '종이를 얼려요',
    ],
    '수리했는데도 문제가 반복되면 언제 어떤 수리를 받았는지 정확히 설명하는 것이 좋아요',
    L(
      '반복 고장에서는 이전 수리 이력도 중요한 정보가 돼요.',
      'Takroriy nosozlikda oldingi ta’mir tarixi ham muhim ma’lumot.',
      'Previous repair history is important when the same malfunction returns.',
      'При повторной неисправности важна информация о предыдущем ремонте.',
    ),
    ['v-neundedo', 'repair-history'],
    5,
  ),

  s5u7_295_type_answer: grammarTypeAnswer(
    '지난주에 수리했는데도 같은 문제가 다시 생겼어요',
    L(
      '지난주에 수리를 받았지만 동일한 문제가 다시 발생했다고 쓰세요.',
      'O‘tgan hafta ta’mirlangan bo‘lsa ham, bir xil muammo yana paydo bo‘lganini yozing.',
      'Write that the same problem happened again even though the device was repaired last week.',
      'Напишите, что та же проблема возникла снова, хотя устройство ремонтировали на прошлой неделе.',
    ),
    'The device was repaired last week, but the same problem has occurred again.',
    ['수리했는데도'],
    ['v-neundedo', 'repair-history', 'type-answer'],
  ),

  s5u7_296_reading_quiz: readingQuiz(
    '고객은 새 휴대폰인데도 전화가 끊기고, 전원을 껐다가 다시 켜 봤는데도 같은 문제가 계속된다고 설명했습니다. 직원은 이전에 시도한 방법을 기록하고 수리 접수를 진행했습니다.',
    '고객이 전달한 정보가 중요한 이유는 무엇이에요?',
    [
      '제품 상태와 이미 시도한 해결 방법을 함께 알 수 있어서예요.',
      '고객의 취미를 알 수 있어서예요.',
      '휴대폰 색깔을 바꿀 수 있어서예요.',
      '수리비를 무조건 없앨 수 있어서예요.',
    ],
    '제품 상태와 이미 시도한 해결 방법을 함께 알 수 있어서예요.',
    L(
      '예상 밖의 고장과 이미 해 본 대처를 함께 알려 주면 진단에 도움이 돼요.',
      'Kutilmagan nosozlik va sinab ko‘rilgan choralarni birga aytish tashxisga yordam beradi.',
      'Describing both the unexpected malfunction and prior troubleshooting helps diagnosis.',
      'Описание неисправности и уже предпринятых действий помогает диагностике.',
    ),
    ['repair', 'learning-value'],
    5,
  ),

  s5u7_297_translate_builder: translateBuilder(
    L(
      '새 제품인데도 문제가 있고 재시작했는데도 해결되지 않았다고 설명하기',
      'Mahsulot yangi bo‘lsa ham muammo borligini va qayta yoqilgandan keyin ham hal bo‘lmaganini tushuntiring.',
      'Explain that the device has a problem even though it is new, and restarting did not solve it.',
      'Объясните, что устройство неисправно, хотя оно новое, и перезапуск не помог.',
    ),
    [
      '새 제품인데도 문제가 있고',
      '전원을 껐다가 다시 켰는데도',
      '해결되지 않았어요',
      '오래된 제품이라서',
      '종이를',
      '채소를 얼렸어요',
    ],
    '새 제품인데도 문제가 있고 전원을 껐다가 다시 켰는데도 해결되지 않았어요',
    L(
      '제품 상태와 실패한 해결 방법을 한 번에 정확히 전달해요.',
      'Mahsulot holati va samara bermagan yechim bir gapda aniq yetkaziladi.',
      'The product condition and unsuccessful troubleshooting are communicated together.',
      'Состояние устройства и неудачная попытка устранения проблемы объясняются вместе.',
    ),
    ['n-inde-do', 'v-neundedo', 'repair'],
    5,
  ),

  s5u7_298_fill_in_blank: fillBlank(
    '새 제품___ 고장이 나고, 재시작했___ 문제가 계속돼요.',
    ['인데도', '는데도'],
    ['인데도', '는데도', '이라서', '으면서', '으려고'],
    L(
      '명사형과 동사형을 실제 고장 설명 안에서 구별해요.',
      'Ot va fe’l shakllari real nosozlik tushuntirishida farqlanadi.',
      'Distinguish the noun and verb forms in a realistic repair explanation.',
      'Различаем формы после существительного и глагола в реальном описании неисправности.',
    ),
    ['n-inde-do', 'v-neundedo'],
  ),

  s5u7_299_error_hunt: errorHunt(
    '새 제품인데도 전원을 다시 켜서 문제가 계속돼요.',
    '켜서',
    ['켰는데도', '켜면서', '켜려고', '켰다가'],
    '켰는데도',
    L(
      '재시작했지만 문제가 남아 있으므로 두 번째 연결도 기대와 결과의 대비가 필요해요.',
      'Qayta yoqilgan bo‘lsa ham muammo qolgan, shuning uchun ikkinchi bog‘lanishda ham qarama-qarshilik kerak.',
      'The restart failed to solve the problem, so the second connection also requires contrast.',
      'Перезапуск не решил проблему, поэтому и во второй части нужен контраст.',
    ),
    ['v-neundedo', 'meaning-contrast'],
    5,
  ),

  s5u7_300_word_arrange: wordArrange(
    [
      '`A-(으)ㄴ데도 / V-는데도 / N인데도`는',
      '예상과 다른 결과를 설명해서',
      '고장 상황을 더 정확하게 전달할 수 있어요',
      '원인만 말하고',
      '항상 같은 결과를 만들고',
      '대화에서만 사용해요',
    ],
    '`A-(으)ㄴ데도 / V-는데도 / N인데도`는 예상과 다른 결과를 설명해서 고장 상황을 더 정확하게 전달할 수 있어요',
    L(
      '문법 자체를 외우는 데서 끝나지 않고 실제 수리 상황에서 필요한 정보 전달 기능으로 연결해요.',
      'Grammatikani yodlash bilan tugamay, real ta’mir vaziyatida kerakli ma’lumotni yetkazishga bog‘laymiz.',
      'The grammar is connected to clearly communicating unexpected malfunction results in real repair situations.',
      'Грамматика связывается с точной передачей неожиданных результатов в реальной ситуации ремонта.',
    ),
    ['neundedo', 'node-review', 'repair'],
    5,
  ), // ══════════════════════════════════════════════════════════
  // Section 5 · Unit 7 · Node 4
  // A/V-더니
  // 과거에 관찰한 상태·행동과 이후의 변화·결과
  // ══════════════════════════════════════════════════════════

  // ──────────────────────────────────────────────────────────
  // Lesson 1 · 그러더니 어떻게 됐어요?
  // 관찰한 행동·상태 → 뒤의 변화
  // ──────────────────────────────────────────────────────────

  s5u7_301_reading_quiz: readingQuiz(
    '컴퓨터를 사용하고 있는데 평소와 다른 소리가 나기 시작했습니다. 잠시 후 갑자기 전원이 꺼졌습니다.',
    '두 상황을 가장 자연스럽게 연결한 것은 무엇이에요?',
    [
      '컴퓨터에서 이상한 소리가 나더니 갑자기 전원이 꺼졌어요.',
      '컴퓨터에서 이상한 소리가 나서 전원을 일부러 껐어요.',
      '컴퓨터에서 이상한 소리가 나려고 전원이 꺼졌어요.',
      '컴퓨터에서 이상한 소리가 나면서 전원을 켰어요.',
    ],
    '컴퓨터에서 이상한 소리가 나더니 갑자기 전원이 꺼졌어요.',
    L(
      '이상한 소리가 나는 것을 관찰한 뒤 갑자기 전원이 꺼진 변화를 말해요.',
      'G‘alati ovoz kuzatilganidan keyin qurilma birdan o‘chganini bildiradi.',
      'A strange noise was observed, and then the computer suddenly turned off.',
      'Сначала появился странный звук, а затем компьютер внезапно выключился.',
    ),
    ['deo-ni', 'sound', 'power'],
    5,
  ),

  s5u7_302_type_answer: grammarTypeAnswer(
    '컴퓨터에서 이상한 소리가 나더니 갑자기 전원이 꺼졌어요',
    L(
      '컴퓨터에서 이상한 소리가 난 뒤 갑자기 전원이 꺼졌다고 `-더니`를 사용해 쓰세요.',
      'Kompyuterdan g‘alati ovoz chiqib, keyin birdan o‘chganini `-더니` bilan yozing.',
      'Using -더니, write that the computer made a strange noise and then suddenly turned off.',
      'Используя -더니, напишите, что компьютер издал странный звук, а затем внезапно выключился.',
    ),
    'A strange noise was observed from the computer, and then it suddenly powered off.',
    ['나더니'],
    ['deo-ni', 'sound', 'power', 'type-answer'],
  ),

  s5u7_303_translate_builder: translateBuilder(
    L(
      '컴퓨터에서 이상한 소리가 나다가 결국 전원이 꺼진 변화를 표현하기',
      'Kompyuterdan g‘alati ovoz chiqib, keyin quvvat o‘chganini ayting.',
      'Say that the computer made a strange noise and then the power went off.',
      'Скажите, что компьютер издавал странный звук, а затем питание отключилось.',
    ),
    [
      '갑자기 전원이 꺼졌어요',
      '수돗물을 틀었어요',
      '컴퓨터에서',
      '종이가 걸렸어요',
      '이상한 소리가 나더니',
      '액정을 교체했어요',
    ],
    '컴퓨터에서 이상한 소리가 나더니 갑자기 전원이 꺼졌어요',
    L(
      '관찰한 증상 뒤에 새로운 고장 상태가 생겼어요.',
      'Kuzatilgan belgidan keyin yangi nosozlik yuz berdi.',
      'A new malfunction occurred after the observed symptom.',
      'После наблюдаемого симптома возникла новая неисправность.',
    ),
    ['deo-ni', 'sound', 'power'],
    5,
  ),

  s5u7_304_fill_in_blank: fillBlank(
    '컴퓨터에서 이상한 소리가 ___ 갑자기 전원이 꺼졌어요.',
    ['나더니'],
    ['나더니', '나면서', '나려고', '나니까', '나지만'],
    L(
      '이상한 소리를 관찰한 뒤 전원이 꺼진 변화를 나타내요.',
      'G‘alati ovozdan keyin qurilmaning o‘chishi ifodalanadi.',
      'The power went off after the strange noise was observed.',
      'После появления странного звука питание отключилось.',
    ),
    ['deo-ni', 'conjugation'],
    5,
  ),

  s5u7_305_word_arrange: wordArrange(
    [
      '이제는 연결이 안 돼요',
      '수돗물을 잠갔어요',
      '전화가 자꾸 끊기더니',
      '종이를 제거했어요',
      '전에는 괜찮았는데',
      '액정을 교체했어요',
    ],
    '전화가 자꾸 끊기더니 이제는 연결이 안 돼요',
    L(
      '통화 끊김 증상이 반복된 뒤 더 심한 상태로 변했어요.',
      'Qo‘ng‘iroq uzilishi takrorlanib, keyin muammo yanada kuchaydi.',
      'Repeated disconnections were followed by a more serious connection problem.',
      'После повторных обрывов связи проблема стала ещё серьёзнее.',
    ),
    ['deo-ni', 'phone'],
    5,
  ),

  s5u7_306_type_answer: grammarTypeAnswer(
    '전화가 자꾸 끊기더니 이제는 연결이 안 돼요',
    L(
      '전화가 반복해서 끊기다가 이제는 아예 연결되지 않는다고 `-더니`로 쓰세요.',
      'Qo‘ng‘iroq tez-tez uzilib, endi umuman ulanmayotganini `-더니` bilan yozing.',
      'Using -더니, write that calls kept disconnecting and now they do not connect at all.',
      'Используя -더니, напишите, что связь часто обрывалась, а теперь соединения вообще нет.',
    ),
    'Phone calls repeatedly disconnected, and now the connection does not work at all.',
    ['끊기더니'],
    ['deo-ni', 'phone', 'type-answer'],
  ),

  s5u7_307_error_hunt: errorHunt(
    '전화가 자꾸 끊겨더니 이제는 연결이 안 돼요.',
    '끊겨더니',
    ['끊기더니', '끊기면서', '끊기려고', '끊기니까'],
    '끊기더니',
    L(
      '`끊기다`는 어간 `끊기-`에 `-더니`를 붙여 `끊기더니`라고 해요.',
      '`끊기다` fe’liga `-더니` qo‘shilib `끊기더니` bo‘ladi.',
      'Attach -더니 to the stem 끊기-: 끊기더니.',
      'К основе 끊기- добавляется -더니: 끊기더니.',
    ),
    ['deo-ni', 'conjugation'],
    5,
  ),

  s5u7_308_translate_builder: translateBuilder(
    L(
      '전화가 계속 끊기다가 이제는 전혀 연결되지 않는다고 말하기',
      'Qo‘ng‘iroq uzilaverib, endi umuman ulanmayotganini ayting.',
      'Say that calls kept disconnecting and now they do not connect at all.',
      'Скажите, что связь постоянно обрывалась, а теперь соединения вообще нет.',
    ),
    [
      '이제는 연결이 안 돼요',
      '플러그를 다시 꽂았어요',
      '전화가',
      '종이를 빼냈어요',
      '자꾸 끊기더니',
      '수돗물을 틀었어요',
    ],
    '전화가 자꾸 끊기더니 이제는 연결이 안 돼요',
    L(
      '처음 증상보다 현재 문제가 더 심해진 상황이에요.',
      'Hozirgi muammo avvalgi belgidan kuchliroq.',
      'The current problem is more severe than the earlier symptom.',
      'Текущая проблема серьёзнее первоначального симптома.',
    ),
    ['deo-ni', 'phone'],
    5,
  ),

  s5u7_309_reading_quiz: readingQuiz(
    '복사기를 사용할 때마다 종이가 자주 걸렸습니다. 며칠 뒤에는 전원은 들어오는데 복사가 전혀 되지 않았습니다.',
    '상황을 가장 자연스럽게 표현한 것은 무엇이에요?',
    [
      '복사기에 종이가 자꾸 걸리더니 결국 고장이 났어요.',
      '복사기에 종이가 걸려서 새 복사기를 샀어요.',
      '복사기에 종이가 걸리려고 전원을 켰어요.',
      '복사기에 종이가 걸리면서 계속 잘 작동했어요.',
    ],
    '복사기에 종이가 자꾸 걸리더니 결국 고장이 났어요.',
    L(
      '반복되는 종이 걸림 증상을 관찰한 뒤 결국 기계가 고장 난 상황이에요.',
      'Qog‘oz tiqilishi takrorlangach, qurilma oxiri buzildi.',
      'Repeated paper jams were observed before the copier eventually broke down.',
      'После повторных замятий бумаги копировальный аппарат в итоге сломался.',
    ),
    ['deo-ni', 'paper-jam'],
    5,
  ),

  s5u7_310_fill_in_blank: fillBlank(
    '복사기에 종이가 자꾸 ___ 결국 고장이 났어요.',
    ['걸리더니'],
    ['걸리더니', '걸리면서', '걸리려고', '걸리니까', '걸리지만'],
    L(
      '종이가 자주 걸리는 상태 뒤에 기계 고장이 이어졌어요.',
      'Qog‘oz tez-tez tiqilgandan keyin qurilma buzildi.',
      'Frequent paper jams were followed by a breakdown.',
      'После частых замятий бумаги произошла поломка.',
    ),
    ['deo-ni', 'paper-jam'],
    5,
  ),

  s5u7_311_type_answer: grammarTypeAnswer(
    '복사기에 종이가 자꾸 걸리더니 결국 고장이 났어요',
    L(
      '복사기에 종이가 반복해서 걸리다가 결국 고장 났다고 `-더니`를 사용해 쓰세요.',
      'Qog‘oz tez-tez tiqilib, oxiri qurilma buzilganini `-더니` bilan yozing.',
      'Using -더니, write that paper kept jamming and the copier eventually broke down.',
      'Используя -더니, напишите, что бумага постоянно застревала, а затем копир сломался.',
    ),
    'Paper repeatedly jammed in the copier, and eventually the machine broke down.',
    ['걸리더니'],
    ['deo-ni', 'paper-jam', 'type-answer'],
  ),

  s5u7_312_translate_builder: translateBuilder(
    L(
      '세탁기에서 이상한 소리가 나기 시작한 뒤 탈수가 되지 않는다고 말하기',
      'Kir yuvish mashinasidan g‘alati ovoz chiqib, keyin siqish ishlamay qolganini ayting.',
      'Say that the washing machine made a strange noise and then the spin cycle stopped working.',
      'Скажите, что стиральная машина начала издавать странный звук, а затем перестал работать отжим.',
    ),
    [
      '탈수가 안 돼요',
      '세탁기에서',
      '플러그를 빼요',
      '이상한 소리가 나더니',
      '종이를 넣어요',
      '수돗물을 잠갔어요',
    ],
    '세탁기에서 이상한 소리가 나더니 탈수가 안 돼요',
    L(
      '이상한 소리를 관찰한 뒤 탈수 기능에 문제가 생겼어요.',
      'G‘alati ovozdan keyin siqish funksiyasida muammo paydo bo‘ldi.',
      'The spin-cycle problem appeared after a strange noise was observed.',
      'Проблема с отжимом появилась после странного звука.',
    ),
    ['deo-ni', 'washing-machine'],
    5,
  ),

  s5u7_313_cloze_passage: clozePassage(
    '전화가 자꾸 ___ 이제는 연결이 안 되고, 복사기에 종이가 계속 ___ 결국 고장이 났어요.',
    ['끊기더니', '걸리더니'],
    ['걸리더니', '끊기더니', '끊으면서', '걸리려고', '꽂았는데도'],
    L(
      '반복해서 관찰된 증상 뒤에 더 심한 결과가 나타나는 두 상황이에요.',
      'Takroriy belgidan keyin kuchliroq natija paydo bo‘lgan ikki holat.',
      'Both cases show a more serious result after repeated symptoms.',
      'Обе ситуации показывают ухудшение после повторяющихся симптомов.',
    ),
    ['deo-ni', 'symptom-progression'],
    5,
  ),

  s5u7_314_word_arrange: wordArrange(
    [
      '탈수가 안 돼요',
      '액정을 교체했어요',
      '세탁기에서',
      '수돗물을 틀었어요',
      '이상한 소리가 나더니',
      '종이가 걸렸어요',
    ],
    '세탁기에서 이상한 소리가 나더니 탈수가 안 돼요',
    L(
      '세탁기의 초기 증상과 이후 기능 고장을 연결해요.',
      'Kir yuvish mashinasining dastlabki belgisi va keyingi nosozligi bog‘lanadi.',
      'The initial symptom is connected to the later functional failure.',
      'Начальный симптом связывается с последующей неисправностью.',
    ),
    ['deo-ni', 'washing-machine'],
    5,
  ),

  s5u7_315_type_answer: grammarTypeAnswer(
    '시동이 잘 걸리더니 갑자기 안 걸려요',
    L(
      '자동차 시동이 전에는 잘 걸렸는데 갑자기 걸리지 않는다고 `-더니`로 쓰세요.',
      'Mashina avval yaxshi ishga tushgan, ammo birdan ishlamay qolganini `-더니` bilan yozing.',
      'Using -더니, write that the engine used to start well but suddenly does not start.',
      'Используя -더니, напишите, что двигатель раньше хорошо заводился, но внезапно перестал.',
    ),
    'The engine had been starting normally, but now it suddenly does not start.',
    ['걸리더니'],
    ['deo-ni', 'engine', 'type-answer'],
  ),

  s5u7_316_reading_quiz: readingQuiz(
    '냉장고의 온도를 바꾸면 전에는 바로 조절됐습니다. 그런데 오늘부터는 아무리 바꿔도 온도가 그대로입니다.',
    '가장 자연스러운 표현은 무엇이에요?',
    [
      '온도 조절이 잘 되더니 오늘은 안 돼요.',
      '온도 조절이 잘 돼서 오늘은 안 돼요.',
      '온도 조절을 하려고 오늘은 안 돼요.',
      '온도 조절을 하면서 오늘은 잘 돼요.',
    ],
    '온도 조절이 잘 되더니 오늘은 안 돼요.',
    L(
      '과거에는 정상적으로 작동했지만 현재는 상태가 달라졌어요.',
      'Oldin normal ishlagan, ammo hozir holat o‘zgargan.',
      'Temperature control worked normally before, but now it does not.',
      'Раньше регулировка температуры работала нормально, а теперь нет.',
    ),
    ['deo-ni', 'temperature'],
    5,
  ),

  s5u7_317_translate_builder: translateBuilder(
    L(
      '온도 조절이 전에는 잘 됐지만 오늘은 작동하지 않는다고 말하기',
      'Harorat boshqaruvi avval yaxshi ishlagan, ammo bugun ishlamayotganini ayting.',
      'Say that the temperature control used to work well, but it does not work today.',
      'Скажите, что регулировка температуры раньше работала хорошо, но сегодня не работает.',
    ),
    [
      '오늘은 안 돼요',
      '종이가 걸렸어요',
      '온도 조절이',
      '플러그를 뺐어요',
      '잘 되더니',
      '시동을 껐어요',
    ],
    '온도 조절이 잘 되더니 오늘은 안 돼요',
    L(
      '정상 상태에서 고장 상태로 변한 것을 표현해요.',
      'Normal holatdan nosoz holatga o‘zgarish ifodalanadi.',
      'It describes a change from normal operation to malfunction.',
      'Описывается переход от нормальной работы к неисправности.',
    ),
    ['deo-ni', 'temperature'],
    5,
  ),

  s5u7_318_fill_in_blank: fillBlank(
    '온도 조절이 전에는 잘 ___ 오늘은 안 돼요.',
    ['되더니'],
    ['되더니', '되면서', '되려고', '되니까', '되지만'],
    L(
      '전의 정상 상태와 현재 고장 상태가 대비돼요.',
      'Oldingi normal holat va hozirgi nosoz holat taqqoslanadi.',
      'The previous normal state contrasts with the current malfunction.',
      'Прежняя нормальная работа противопоставляется текущей неисправности.',
    ),
    ['deo-ni', 'temperature'],
    5,
  ),

  s5u7_319_error_hunt: errorHunt(
    '온도 조절이 잘 되는데더니 오늘은 안 돼요.',
    '되는데더니',
    ['되더니', '되면서', '되려고', '되니까'],
    '되더니',
    L(
      '`되다`의 어간 `되-`에 바로 `-더니`를 붙여 `되더니`라고 해요.',
      '`되다`ning `되-` o‘zagiga `-더니` qo‘shilib `되더니` bo‘ladi.',
      'Attach -더니 directly to the stem 되-: 되더니.',
      'К основе 되- напрямую добавляется -더니: 되더니.',
    ),
    ['deo-ni', 'conjugation'],
    5,
  ),

  s5u7_320_word_arrange: wordArrange(
    [
      '뒤에 생긴 변화나 결과를',
      '`A/V-더니`는',
      '수돗물만 설명하고',
      '과거에 관찰한 상태나 행동과',
      '연결할 수 있어요',
      '명사에만 사용해요',
    ],
    '`A/V-더니`는 과거에 관찰한 상태나 행동과 뒤에 생긴 변화나 결과를 연결할 수 있어요',
    L(
      '이번 문법은 직접 관찰한 흐름과 변화를 연결할 때 유용해요.',
      'Bu grammatika kuzatilgan jarayon va o‘zgarishni bog‘lashda foydali.',
      'This grammar is useful for connecting an observed state or action with a later change or result.',
      'Эта грамматика помогает связать наблюдаемое состояние или действие с последующим изменением.',
    ),
    ['deo-ni', 'grammar-summary'],
    5,
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 2 · 전에는 괜찮더니 지금은 이상해요
  // 과거 상태 ↔ 현재 상태 대비
  // ──────────────────────────────────────────────────────────

  s5u7_321_reading_quiz: readingQuiz(
    '어제까지는 휴대폰 화면에 문제가 없었습니다. 그런데 오늘 아침부터 화면이 전혀 나오지 않습니다.',
    '가장 자연스러운 표현은 무엇이에요?',
    [
      '어제까지는 괜찮더니 오늘은 화면이 안 나와요.',
      '어제까지 괜찮아서 오늘 화면이 안 나와요.',
      '어제까지 괜찮으려고 오늘 화면이 안 나와요.',
      '어제까지 괜찮으면서 오늘도 잘 나와요.',
    ],
    '어제까지는 괜찮더니 오늘은 화면이 안 나와요.',
    L(
      '과거에 관찰한 정상 상태와 현재의 고장 상태를 대비해요.',
      'Oldingi yaxshi holat va hozirgi nosoz holat qarama-qarshi qo‘yiladi.',
      'The previously normal state is contrasted with the current screen failure.',
      'Прежнее нормальное состояние противопоставляется текущей неисправности экрана.',
    ),
    ['deo-ni', 'adjective', 'screen'],
    5,
  ),

  s5u7_322_type_answer: grammarTypeAnswer(
    '어제까지는 괜찮더니 오늘은 화면이 안 나와요',
    L(
      '어제까지는 괜찮았지만 오늘은 화면이 나오지 않는다고 `-더니`로 쓰세요.',
      'Kecha­gacha yaxshi bo‘lgan, ammo bugun ekran chiqmayotganini `-더니` bilan yozing.',
      'Using -더니, write that it was fine until yesterday, but the screen does not work today.',
      'Используя -더니, напишите, что до вчерашнего дня всё было нормально, а сегодня экран не работает.',
    ),
    'The device appeared fine until yesterday, but today the screen does not display anything.',
    ['괜찮더니'],
    ['deo-ni', 'adjective', 'screen', 'type-answer'],
  ),

  s5u7_323_translate_builder: translateBuilder(
    L(
      '전에는 정상적으로 화면이 나왔지만 오늘은 안 나온다고 표현하기',
      'Avval ekran normal ishlagan, ammo bugun tasvir chiqmayotganini ayting.',
      'Say that the screen used to display normally, but it does not today.',
      'Скажите, что раньше экран работал нормально, но сегодня изображения нет.',
    ),
    [
      '오늘은 안 나와요',
      '전에는',
      '수돗물을 잠가요',
      '화면이 잘 나오더니',
      '종이가 걸려요',
      '액정을 교체했어요',
    ],
    '전에는 화면이 잘 나오더니 오늘은 안 나와요',
    L(
      '과거와 현재의 화면 상태 변화를 표현해요.',
      'Ekranning oldingi va hozirgi holati o‘zgarishi ifodalanadi.',
      'It expresses a change between the previous and current screen condition.',
      'Выражается изменение состояния экрана между прошлым и настоящим.',
    ),
    ['deo-ni', 'screen'],
    5,
  ),

  s5u7_324_fill_in_blank: fillBlank(
    '기기가 전에는 ___ 오늘은 이상한 소리가 나요.',
    ['조용하더니'],
    ['조용하더니', '조용하면서', '조용하려고', '조용하니까', '조용하지만'],
    L(
      '전에는 조용했지만 지금은 이상한 소리가 나는 변화를 표현해요.',
      'Oldin jim bo‘lgan, hozir esa g‘alati ovoz chiqayotganini bildiradi.',
      'It used to be quiet, but now it makes a strange noise.',
      'Раньше устройство работало тихо, а теперь издаёт странный звук.',
    ),
    ['deo-ni', 'adjective', 'sound'],
    5,
  ),

  s5u7_325_word_arrange: wordArrange(
    [
      '오늘은 안 걸려요',
      '종이가 잘 빠져요',
      '시동이',
      '수돗물을 틀었어요',
      '전에는 잘 걸리더니',
      '액정을 바꿨어요',
    ],
    '시동이 전에는 잘 걸리더니 오늘은 안 걸려요',
    L(
      '자동차 시동 상태가 정상에서 고장으로 변했어요.',
      'Dvigatelning ishga tushish holati normaldan nosoz holatga o‘zgardi.',
      'The engine changed from starting normally to not starting.',
      'Двигатель раньше запускался нормально, а теперь не запускается.',
    ),
    ['deo-ni', 'engine'],
    5,
  ),

  s5u7_326_type_answer: grammarTypeAnswer(
    '처음에는 괜찮더니 지금은 이상한 소리가 나요',
    L(
      '처음에는 문제가 없어 보였지만 지금은 이상한 소리가 난다고 `-더니`로 쓰세요.',
      'Dastlab yaxshi bo‘lgan, ammo hozir g‘alati ovoz chiqayotganini `-더니` bilan yozing.',
      'Using -더니, write that it seemed fine at first, but now it makes a strange noise.',
      'Используя -더니, напишите, что сначала всё было нормально, а теперь слышен странный звук.',
    ),
    'The device seemed fine at first, but now it makes a strange noise.',
    ['괜찮더니'],
    ['deo-ni', 'adjective', 'sound', 'type-answer'],
  ),

  s5u7_327_error_hunt: errorHunt(
    '어제는 괜찮은더니 오늘은 화면이 안 나와요.',
    '괜찮은더니',
    ['괜찮더니', '괜찮으면서', '괜찮으니까', '괜찮으려고'],
    '괜찮더니',
    L(
      '형용사 `괜찮다`에는 `-은`을 넣지 않고 `괜찮더니`라고 해요.',
      '`괜찮다` sifatiga bevosita `-더니` qo‘shilib `괜찮더니` bo‘ladi.',
      'Do not add -은 here; 괜찮다 becomes 괜찮더니.',
      'Здесь не добавляется -은: 괜찮다 → 괜찮더니.',
    ),
    ['deo-ni', 'adjective', 'conjugation'],
    5,
  ),

  s5u7_328_translate_builder: translateBuilder(
    L(
      '냉장고 온도 조절이 전에는 잘 됐지만 오늘은 되지 않는다고 말하기',
      'Muzlatkich harorati avval yaxshi boshqarilgan, ammo bugun ishlamayotganini ayting.',
      'Say that the refrigerator temperature control used to work, but it does not today.',
      'Скажите, что регулировка температуры холодильника раньше работала, а сегодня нет.',
    ),
    [
      '오늘은 안 돼요',
      '온도 조절이',
      '채소를 얼렸어요',
      '전에는 잘 되더니',
      '플러그를 빼요',
      '종이가 걸렸어요',
    ],
    '온도 조절이 전에는 잘 되더니 오늘은 안 돼요',
    L(
      '정상적으로 조절되던 기능이 현재는 고장 난 상태예요.',
      'Oldin ishlagan boshqaruv funksiyasi hozir nosoz.',
      'A function that worked normally before is now malfunctioning.',
      'Функция, которая раньше работала нормально, теперь неисправна.',
    ),
    ['deo-ni', 'temperature'],
    5,
  ),

  s5u7_329_reading_quiz: readingQuiz(
    '자동차는 지난주까지 시동이 한 번에 잘 걸렸습니다. 오늘 아침에는 여러 번 시도해도 시동이 걸리지 않습니다.',
    '가장 자연스러운 문장은 무엇이에요?',
    [
      '지난주까지 시동이 잘 걸리더니 오늘은 안 걸려요.',
      '지난주까지 시동이 잘 걸려서 오늘은 안 걸려요.',
      '시동을 걸려고 오늘은 안 걸려요.',
      '시동을 걸면서 오늘도 잘 걸려요.',
    ],
    '지난주까지 시동이 잘 걸리더니 오늘은 안 걸려요.',
    L(
      '과거의 정상 상태와 오늘의 이상 상태를 대비해요.',
      'Oldingi normal holat va bugungi nosoz holat taqqoslanadi.',
      'The previous normal state is contrasted with today’s failure to start.',
      'Прежняя нормальная работа противопоставляется сегодняшней неисправности.',
    ),
    ['deo-ni', 'engine'],
    5,
  ),

  s5u7_330_fill_in_blank: fillBlank(
    '시동이 전에는 잘 ___ 오늘 아침에는 안 걸려요.',
    ['걸리더니'],
    ['걸리더니', '걸리면서', '걸리려고', '걸리니까', '걸리지만'],
    L(
      '전에는 잘 되던 시동이 현재는 걸리지 않아요.',
      'Oldin yaxshi ishlagan dvigatel hozir ishga tushmayapti.',
      'The engine used to start well, but now it does not.',
      'Раньше двигатель заводился хорошо, а теперь нет.',
    ),
    ['deo-ni', 'engine'],
    5,
  ),

  s5u7_331_type_answer: grammarTypeAnswer(
    '시동이 전에는 잘 걸리더니 오늘 아침에는 안 걸려요',
    L(
      '시동이 전에는 잘 걸렸지만 오늘 아침에는 걸리지 않는다고 쓰세요.',
      'Avval dvigatel yaxshi ishga tushgan, ammo bugun ertalab ishga tushmaganini yozing.',
      'Write that the engine used to start well, but it does not start this morning.',
      'Напишите, что раньше двигатель хорошо заводился, но сегодня утром не заводится.',
    ),
    'The engine used to start normally, but this morning it does not start.',
    ['걸리더니'],
    ['deo-ni', 'engine', 'type-answer'],
  ),

  s5u7_332_translate_builder: translateBuilder(
    L(
      '통화가 전에는 잘 됐지만 요즘은 자꾸 끊긴다고 말하기',
      'Avval qo‘ng‘iroqlar yaxshi ishlagan, ammo hozir tez-tez uzilayotganini ayting.',
      'Say that calls used to work well, but lately they keep disconnecting.',
      'Скажите, что раньше звонки работали нормально, а теперь связь постоянно обрывается.',
    ),
    [
      '요즘은 자꾸 끊겨요',
      '종이가 걸려요',
      '통화가',
      '전에는 잘 되더니',
      '수돗물을 잠가요',
      '시동을 껐어요',
    ],
    '통화가 전에는 잘 되더니 요즘은 자꾸 끊겨요',
    L(
      '통화 상태가 정상에서 불안정한 상태로 변했어요.',
      'Qo‘ng‘iroq holati normaldan beqaror holatga o‘zgardi.',
      'Call quality changed from normal to unstable.',
      'Связь изменилась с нормальной на нестабильную.',
    ),
    ['deo-ni', 'phone'],
    5,
  ),

  s5u7_333_cloze_passage: clozePassage(
    '화면이 전에는 잘 ___ 오늘은 안 나오고, 시동도 전에는 잘 ___ 오늘은 안 걸려요.',
    ['나오더니', '걸리더니'],
    ['걸리더니', '나오더니', '나오면서', '걸려고', '꺼졌는데도'],
    L(
      '두 기기의 과거 정상 상태와 현재 고장 상태를 비교해요.',
      'Ikki qurilmaning oldingi normal va hozirgi nosoz holati taqqoslanadi.',
      'The previous normal and current faulty states of two devices are compared.',
      'Сравниваются прежние нормальные и текущие неисправные состояния двух устройств.',
    ),
    ['deo-ni', 'state-change'],
    5,
  ),

  s5u7_334_word_arrange: wordArrange(
    [
      '오늘은 화면이 안 나와요',
      '플러그를 뺐어요',
      '전에는',
      '종이를 넣었어요',
      '화면이 잘 나오더니',
      '수돗물을 잠갔어요',
    ],
    '전에는 화면이 잘 나오더니 오늘은 화면이 안 나와요',
    L(
      '화면이 정상적으로 나오던 과거와 현재의 고장을 대비해요.',
      'Avvalgi normal ekran va hozirgi nosoz ekran taqqoslanadi.',
      'The previously working screen is contrasted with its current failure.',
      'Прежняя работа экрана противопоставляется текущей неисправности.',
    ),
    ['deo-ni', 'screen'],
    5,
  ),

  s5u7_335_type_answer: grammarTypeAnswer(
    '전에는 화면이 잘 나오더니 오늘은 화면이 안 나와요',
    L(
      '전에는 화면이 정상적으로 나왔지만 오늘은 나오지 않는다고 `-더니`로 쓰세요.',
      'Avval ekran normal chiqqan, ammo bugun chiqmayotganini `-더니` bilan yozing.',
      'Using -더니, write that the screen used to work normally but does not display today.',
      'Используя -더니, напишите, что раньше экран работал нормально, а сегодня изображения нет.',
    ),
    'The screen used to display normally, but today it does not display anything.',
    ['나오더니'],
    ['deo-ni', 'screen', 'type-answer'],
  ),

  s5u7_336_reading_quiz: readingQuiz(
    '세탁기를 처음 샀을 때는 소리가 거의 나지 않았습니다. 최근에는 작동할 때 이상한 소리가 크게 납니다.',
    '가장 자연스러운 표현은 무엇이에요?',
    [
      '처음에는 조용하더니 요즘은 이상한 소리가 나요.',
      '처음에는 조용해서 요즘 이상한 소리가 나요.',
      '조용하려고 이상한 소리가 나요.',
      '조용하면서 계속 조용해요.',
    ],
    '처음에는 조용하더니 요즘은 이상한 소리가 나요.',
    L(
      '조용했던 과거 상태가 소리가 나는 현재 상태로 바뀌었어요.',
      'Oldingi jim holat hozir g‘alati ovozli holatga o‘zgardi.',
      'The previously quiet machine now makes a strange noise.',
      'Раньше машина работала тихо, а теперь издаёт странный звук.',
    ),
    ['deo-ni', 'adjective', 'washing-machine'],
    5,
  ),

  s5u7_337_translate_builder: translateBuilder(
    L(
      '세탁기가 처음에는 조용했지만 요즘 이상한 소리가 난다고 말하기',
      'Kir yuvish mashinasi avval jim bo‘lgan, ammo hozir g‘alati ovoz chiqarayotganini ayting.',
      'Say that the washing machine was quiet at first but now makes a strange noise.',
      'Скажите, что сначала стиральная машина работала тихо, а теперь издаёт странный звук.',
    ),
    [
      '이상한 소리가 나요',
      '처음에는',
      '종이가 걸려요',
      '세탁기가 조용하더니',
      '수돗물을 틀어요',
      '플러그를 교체해요',
    ],
    '처음에는 세탁기가 조용하더니 이상한 소리가 나요',
    L(
      '소리가 없던 상태에서 고장 징후가 있는 상태로 변했어요.',
      'Jim holatdan nosozlik belgisi bor holatga o‘zgardi.',
      'The machine changed from quiet operation to showing a malfunction symptom.',
      'Машина перешла от тихой работы к появлению признака неисправности.',
    ),
    ['deo-ni', 'adjective', 'sound'],
    5,
  ),

  s5u7_338_fill_in_blank: fillBlank(
    '세탁기가 처음에는 ___ 요즘은 이상한 소리가 나요.',
    ['조용하더니'],
    ['조용하더니', '조용하면서', '조용하려고', '조용하니까', '조용하지만'],
    L(
      '과거의 조용한 상태와 현재의 소음 상태를 대비해요.',
      'Oldingi jim holat va hozirgi shovqin holati taqqoslanadi.',
      'The previously quiet state contrasts with the current noisy state.',
      'Прежняя тихая работа противопоставляется нынешнему шуму.',
    ),
    ['deo-ni', 'adjective'],
    5,
  ),

  s5u7_339_error_hunt: errorHunt(
    '세탁기가 처음에는 조용한더니 요즘은 이상한 소리가 나요.',
    '조용한더니',
    ['조용하더니', '조용하면서', '조용하니까', '조용하려고'],
    '조용하더니',
    L(
      '`조용하다`는 `조용하더니`로 활용해요.',
      '`조용하다` sifati `조용하더니` shaklida ishlatiladi.',
      '조용하다 becomes 조용하더니.',
      '조용하다 принимает форму 조용하더니.',
    ),
    ['deo-ni', 'adjective', 'conjugation'],
    5,
  ),

  s5u7_340_word_arrange: wordArrange(
    [
      '과거와 현재의 상태가 달라진 것을',
      '항상 원인만 말하고',
      '`A/V-더니`로',
      '자연스럽게 대비할 수 있어요',
      '수돗물에만 쓰고',
      '동시에 행동해요',
    ],
    '`A/V-더니`로 과거와 현재의 상태가 달라진 것을 자연스럽게 대비할 수 있어요',
    L(
      '과거에 관찰한 상태와 현재 상태의 차이를 표현할 수 있어요.',
      'Oldin kuzatilgan holat bilan hozirgi holat farqini ifodalash mumkin.',
      'A/V-더니 can contrast a previously observed state with the current one.',
      'A/V-더니 позволяет противопоставить ранее наблюдаемое состояние текущему.',
    ),
    ['deo-ni', 'grammar-summary'],
    5,
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 3 · 점점 심해지더니
  // 반복 증상 → 더 심한 상태
  // ──────────────────────────────────────────────────────────

  s5u7_341_reading_quiz: readingQuiz(
    '처음에는 통화 중에 전화가 가끔 한 번씩 끊겼습니다. 요즘은 통화할 때마다 계속 끊깁니다.',
    '가장 자연스러운 문장은 무엇이에요?',
    [
      '전화가 가끔 끊기더니 이제는 자꾸 끊겨요.',
      '전화가 가끔 끊겨서 이제는 잘 돼요.',
      '전화가 끊기려고 계속 통화해요.',
      '전화가 끊기면서 문제가 없어졌어요.',
    ],
    '전화가 가끔 끊기더니 이제는 자꾸 끊겨요.',
    L(
      '가벼운 증상에서 반복되는 심한 증상으로 변했어요.',
      'Yengil belgidan takroriy kuchli belgiga o‘zgardi.',
      'The symptom progressed from occasional disconnections to frequent ones.',
      'Симптом усилился: редкие обрывы стали частыми.',
    ),
    ['deo-ni', 'phone', 'progression'],
    5,
  ),

  s5u7_342_type_answer: grammarTypeAnswer(
    '전화가 가끔 끊기더니 이제는 자꾸 끊겨요',
    L(
      '전에는 전화가 가끔 끊겼지만 이제는 자주 끊긴다고 `-더니`로 쓰세요.',
      'Avval qo‘ng‘iroq ba’zan uzilgan, endi esa tez-tez uzilayotganini `-더니` bilan yozing.',
      'Using -더니, write that calls used to disconnect occasionally but now disconnect frequently.',
      'Используя -더니, напишите, что раньше связь обрывалась иногда, а теперь постоянно.',
    ),
    'Calls initially disconnected only occasionally, but now they disconnect frequently.',
    ['끊기더니'],
    ['deo-ni', 'phone', 'progression', 'type-answer'],
  ),

  s5u7_343_translate_builder: translateBuilder(
    L(
      '전화가 가끔 끊기다가 이제는 자꾸 끊긴다고 말하기',
      'Qo‘ng‘iroq avval ba’zan uzilgan, endi tez-tez uzilayotganini ayting.',
      'Say that calls used to disconnect occasionally and now disconnect frequently.',
      'Скажите, что раньше связь обрывалась иногда, а теперь постоянно.',
    ),
    [
      '전화가',
      '이제는 자꾸 끊겨요',
      '종이가 걸렸어요',
      '가끔 끊기더니',
      '수돗물을 틀었어요',
      '시동을 걸었어요',
    ],
    '전화가 가끔 끊기더니 이제는 자꾸 끊겨요',
    L(
      '같은 고장 증상이 점점 자주 나타나는 상황이에요.',
      'Bir xil nosozlik belgisi tobora tez-tez paydo bo‘lmoqda.',
      'The same malfunction symptom is becoming more frequent.',
      'Один и тот же симптом появляется всё чаще.',
    ),
    ['deo-ni', 'phone', 'progression'],
    5,
  ),

  s5u7_344_fill_in_blank: fillBlank(
    '전화가 처음에는 가끔 ___ 이제는 자꾸 끊겨요.',
    ['끊기더니'],
    ['끊기더니', '끊기면서', '끊기려고', '끊기니까', '끊기지만'],
    L(
      '통화 끊김 증상이 점점 심해지고 있어요.',
      'Aloqa uzilishi tobora kuchaymoqda.',
      'The disconnection problem is becoming more severe.',
      'Проблема с обрывами связи усиливается.',
    ),
    ['deo-ni', 'phone'],
    5,
  ),

  s5u7_345_word_arrange: wordArrange(
    [
      '이제는 아예 안 나와요',
      '플러그를 뺐어요',
      '화면이',
      '종이를 제거했어요',
      '가끔 안 나오더니',
      '수돗물을 틀었어요',
    ],
    '화면이 가끔 안 나오더니 이제는 아예 안 나와요',
    L(
      '가끔 나타나던 화면 문제가 완전한 화면 고장으로 심해졌어요.',
      'Vaqti-vaqti bilan bo‘lgan ekran muammosi to‘liq nosozlikka aylandi.',
      'An occasional screen problem progressed to a complete display failure.',
      'Редкая проблема с экраном переросла в полный отказ изображения.',
    ),
    ['deo-ni', 'screen', 'progression'],
    5,
  ),

  s5u7_346_type_answer: grammarTypeAnswer(
    '화면이 가끔 안 나오더니 이제는 아예 안 나와요',
    L(
      '처음에는 화면이 가끔 안 나왔지만 이제는 전혀 나오지 않는다고 `-더니`로 쓰세요.',
      'Avval ekran ba’zan chiqmagan, endi esa umuman chiqmayotganini `-더니` bilan yozing.',
      'Using -더니, write that the screen sometimes failed before but now does not display at all.',
      'Используя -더니, напишите, что раньше экран иногда не работал, а теперь изображения нет совсем.',
    ),
    'The screen initially failed only occasionally, but now it does not display at all.',
    ['나오더니'],
    ['deo-ni', 'screen', 'progression', 'type-answer'],
  ),

  s5u7_347_error_hunt: errorHunt(
    '화면이 가끔 안 나오는데더니 이제는 아예 안 나와요.',
    '나오는데더니',
    ['나오더니', '나오면서', '나오려고', '나오니까'],
    '나오더니',
    L(
      '`나오다`에 `-더니`를 바로 붙여 `나오더니`라고 해요.',
      '`나오다`ga bevosita `-더니` qo‘shilib `나오더니` bo‘ladi.',
      'Attach -더니 directly to 나오다: 나오더니.',
      'К 나오다 напрямую добавляется -더니: 나오더니.',
    ),
    ['deo-ni', 'conjugation'],
    5,
  ),

  s5u7_348_translate_builder: translateBuilder(
    L(
      '화면이 가끔 나오지 않다가 이제는 전혀 나오지 않는다고 표현하기',
      'Ekran avval ba’zan chiqmagan, endi esa umuman chiqmayotganini ayting.',
      'Say that the screen used to fail occasionally but now does not display at all.',
      'Скажите, что раньше экран иногда не работал, а теперь изображения совсем нет.',
    ),
    [
      '이제는 아예 안 나와요',
      '화면이',
      '종이가 걸리더니',
      '가끔 안 나오더니',
      '플러그를 꽂았어요',
      '수돗물을 잠갔어요',
    ],
    '화면이 가끔 안 나오더니 이제는 아예 안 나와요',
    L(
      '화면 증상이 더 심한 단계로 진행됐어요.',
      'Ekran muammosi yanada jiddiy bosqichga o‘tdi.',
      'The screen symptom progressed to a more serious stage.',
      'Проблема с экраном перешла в более серьёзную стадию.',
    ),
    ['deo-ni', 'screen', 'progression'],
    5,
  ),

  s5u7_349_reading_quiz: readingQuiz(
    '복사기는 처음에 가끔 종이가 걸렸습니다. 최근에는 거의 사용할 때마다 종이가 걸리고, 오늘은 아예 작동하지 않습니다.',
    '가장 자연스러운 표현은 무엇이에요?',
    [
      '종이가 자꾸 걸리더니 결국 복사기가 고장이 났어요.',
      '종이가 걸려서 복사기가 항상 정상이에요.',
      '종이를 넣으려고 복사기가 고장 났어요.',
      '종이가 걸리면서 고장이 없어졌어요.',
    ],
    '종이가 자꾸 걸리더니 결국 복사기가 고장이 났어요.',
    L(
      '반복되는 종이 걸림이 더 큰 고장으로 이어진 흐름을 관찰했어요.',
      'Takroriy qog‘oz tiqilishi kattaroq nosozlikka olib kelgan jarayon kuzatildi.',
      'Repeated paper jams were observed before the copier finally broke down.',
      'Повторные замятия бумаги предшествовали окончательной поломке копира.',
    ),
    ['deo-ni', 'paper-jam', 'progression'],
    5,
  ),

  s5u7_350_fill_in_blank: fillBlank(
    '종이가 자꾸 ___ 결국 복사기가 고장이 났어요.',
    ['걸리더니'],
    ['걸리더니', '걸리면서', '걸리려고', '걸리니까', '걸리지만'],
    L(
      '반복 증상 뒤에 더 큰 고장이 생겼어요.',
      'Takroriy belgidan keyin kattaroq nosozlik paydo bo‘ldi.',
      'A larger malfunction followed the repeated symptom.',
      'После повторяющегося симптома возникла более серьёзная поломка.',
    ),
    ['deo-ni', 'paper-jam'],
    5,
  ),

  s5u7_351_type_answer: grammarTypeAnswer(
    '종이가 자꾸 걸리더니 결국 복사기가 고장이 났어요',
    L(
      '복사기에 종이가 반복해서 걸리다가 결국 고장 났다고 쓰세요.',
      'Qog‘oz takror-takror tiqilib, oxiri qurilma buzilganini yozing.',
      'Write that paper kept jamming and the copier eventually broke down.',
      'Напишите, что бумага постоянно застревала, а затем копир сломался.',
    ),
    'Paper repeatedly jammed in the copier, and eventually the copier broke down.',
    ['걸리더니'],
    ['deo-ni', 'paper-jam', 'type-answer'],
  ),

  s5u7_352_translate_builder: translateBuilder(
    L(
      '세탁기가 처음에는 가끔 이상한 소리를 내다가 이제는 탈수가 되지 않는다고 말하기',
      'Kir yuvish mashinasi avval ba’zan g‘alati ovoz chiqarib, endi siqmayotganini ayting.',
      'Say that the washing machine started making strange noises and now the spin cycle does not work.',
      'Скажите, что стиральная машина начала издавать странные звуки, а теперь не работает отжим.',
    ),
    [
      '이제는 탈수가 안 돼요',
      '이상한 소리가 나더니',
      '종이가 걸렸어요',
      '세탁기에서',
      '수돗물을 잠갔어요',
      '액정을 교체했어요',
    ],
    '세탁기에서 이상한 소리가 나더니 이제는 탈수가 안 돼요',
    L(
      '초기 소음 증상 뒤에 기능 고장까지 생겼어요.',
      'Dastlabki shovqin belgisidan keyin funksiya ham ishdan chiqdi.',
      'The initial noise symptom was followed by a functional failure.',
      'За первоначальным шумом последовал отказ функции.',
    ),
    ['deo-ni', 'washing-machine', 'progression'],
    5,
  ),

  s5u7_353_cloze_passage: clozePassage(
    '화면이 가끔 안 ___ 이제는 전혀 안 나오고, 전화도 가끔 ___ 요즘은 계속 끊겨요.',
    ['나오더니', '끊기더니'],
    ['끊기더니', '나오더니', '나오면서', '끊으려고', '걸렸는데도'],
    L(
      '가벼운 증상이 점점 심해지는 두 사례를 함께 연습해요.',
      'Yengil belgining kuchayishi bo‘yicha ikki holat mashq qilinadi.',
      'Two examples practise symptoms becoming progressively more severe.',
      'Тренируются два примера постепенного ухудшения симптомов.',
    ),
    ['deo-ni', 'progression'],
    5,
  ),

  s5u7_354_word_arrange: wordArrange(
    [
      '탈수가 안 돼요',
      '수돗물을 틀었어요',
      '처음에는 잘 돌아가더니',
      '종이가 걸렸어요',
      '세탁기가',
      '액정을 교체했어요',
    ],
    '세탁기가 처음에는 잘 돌아가더니 탈수가 안 돼요',
    L(
      '처음 정상 작동에서 기능 고장으로 변했어요.',
      'Dastlab normal ishlashdan funksiya nosozligiga o‘zgardi.',
      'The machine changed from normal operation to spin-cycle failure.',
      'Машина перешла от нормальной работы к неисправности отжима.',
    ),
    ['deo-ni', 'washing-machine'],
    5,
  ),

  s5u7_355_type_answer: grammarTypeAnswer(
    '컴퓨터에서 이상한 소리가 나더니 결국 고장이 났어요',
    L(
      '컴퓨터에서 이상한 소리가 계속 난 뒤 결국 고장 났다고 `-더니`로 쓰세요.',
      'Kompyuterdan g‘alati ovoz chiqib, oxiri buzilganini `-더니` bilan yozing.',
      'Using -더니, write that the computer made a strange noise and eventually broke down.',
      'Используя -더니, напишите, что компьютер издавал странный звук, а затем сломался.',
    ),
    'A strange noise was observed from the computer before it eventually broke down.',
    ['나더니'],
    ['deo-ni', 'sound', 'breakdown', 'type-answer'],
  ),

  s5u7_356_reading_quiz: readingQuiz(
    '냉장고는 처음에는 가끔 온도가 맞지 않았습니다. 시간이 지나면서 조절이 더 어려워졌고 지금은 온도를 전혀 바꿀 수 없습니다.',
    '가장 자연스러운 표현은 무엇이에요?',
    [
      '온도 조절이 가끔 안 되더니 이제는 전혀 안 돼요.',
      '온도 조절이 안 돼서 지금은 잘 돼요.',
      '온도를 바꾸려고 계속 정상이에요.',
      '온도를 조절하면서 문제가 없어졌어요.',
    ],
    '온도 조절이 가끔 안 되더니 이제는 전혀 안 돼요.',
    L(
      '가끔 발생하던 온도 조절 문제가 완전한 기능 고장으로 심해졌어요.',
      'Ba’zan bo‘lgan harorat muammosi to‘liq funksiya nosozligiga aylandi.',
      'The occasional temperature-control problem progressed to complete failure.',
      'Редкая проблема с регулировкой температуры переросла в полный отказ.',
    ),
    ['deo-ni', 'temperature', 'progression'],
    5,
  ),

  s5u7_357_translate_builder: translateBuilder(
    L(
      '온도 조절이 가끔 안 되다가 이제는 전혀 되지 않는다고 표현하기',
      'Harorat boshqaruvi avval ba’zan ishlamagan, endi esa umuman ishlamayotganini ayting.',
      'Say that temperature control sometimes failed before and now does not work at all.',
      'Скажите, что раньше регулировка температуры иногда не работала, а теперь не работает совсем.',
    ),
    [
      '이제는 전혀 안 돼요',
      '종이를 빼냈어요',
      '온도 조절이',
      '가끔 안 되더니',
      '플러그를 꽂아요',
      '시동을 걸어요',
    ],
    '온도 조절이 가끔 안 되더니 이제는 전혀 안 돼요',
    L(
      '온도 조절 문제가 점점 심해진 상황이에요.',
      'Harorat boshqaruvi muammosi tobora kuchaydi.',
      'The temperature-control problem became progressively worse.',
      'Проблема с регулировкой температуры постепенно усилилась.',
    ),
    ['deo-ni', 'temperature'],
    5,
  ),

  s5u7_358_fill_in_blank: fillBlank(
    '온도 조절이 가끔 안 ___ 이제는 전혀 안 돼요.',
    ['되더니'],
    ['되더니', '되면서', '되려고', '되니까', '되지만'],
    L(
      '가끔 생기던 문제가 완전한 고장으로 진행됐어요.',
      'Vaqti-vaqti bilan bo‘lgan muammo to‘liq nosozlikka aylandi.',
      'An occasional problem progressed to complete failure.',
      'Редкая проблема переросла в полный отказ.',
    ),
    ['deo-ni', 'temperature'],
    5,
  ),

  s5u7_359_error_hunt: errorHunt(
    '전화가 가끔 끊기는데더니 이제는 계속 끊겨요.',
    '끊기는데더니',
    ['끊기더니', '끊기면서', '끊기려고', '끊기니까'],
    '끊기더니',
    L(
      '`끊기다`에는 `-는데`를 넣지 않고 바로 `-더니`를 붙여요.',
      '`끊기다`ga `-는데` emas, to‘g‘ridan-to‘g‘ri `-더니` qo‘shiladi.',
      'Do not insert -는데; attach -더니 directly to 끊기다.',
      'Не вставляйте -는데; добавляйте -더니 напрямую к 끊기다.',
    ),
    ['deo-ni', 'conjugation'],
    5,
  ),

  s5u7_360_word_arrange: wordArrange(
    [
      '수리 시점을 판단할 수 있어요',
      '같은 증상이',
      '점점 심해지는 흐름을 보면',
      '무조건 계속 사용하고',
      '종이만 교체하고',
      '고장 기록을 지워요',
    ],
    '같은 증상이 점점 심해지는 흐름을 보면 수리 시점을 판단할 수 있어요',
    L(
      '증상의 변화 과정을 이해하면 언제 전문 수리가 필요한지도 판단할 수 있어요.',
      'Belgining o‘zgarishini tushunish professional ta’mir qachon kerakligini aniqlashga yordam beradi.',
      'Understanding symptom progression helps determine when professional repair is needed.',
      'Понимание развития симптомов помогает определить, когда нужен профессиональный ремонт.',
    ),
    ['deo-ni', 'learning-value'],
    5,
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 4 · 고장 나기 전에 이런 증상이 있었어요
  // 고장 직전 징후 → 최종 고장
  // ──────────────────────────────────────────────────────────

  s5u7_361_reading_quiz: readingQuiz(
    '노트북을 사용하던 중 갑자기 이상한 소리가 나기 시작했습니다. 잠시 뒤 화면이 꺼지고 다시 켜지지 않았습니다.',
    '수리 기사에게 가장 유용한 설명은 무엇이에요?',
    [
      '이상한 소리가 나더니 화면이 꺼졌어요.',
      '화면이 꺼져서 노트북을 샀어요.',
      '노트북을 켜려고 소리가 났어요.',
      '소리가 나면서 아무 문제도 없었어요.',
    ],
    '이상한 소리가 나더니 화면이 꺼졌어요.',
    L(
      '고장 직전에 관찰한 증상과 최종 고장을 순서대로 전달해요.',
      'Nosozlikdan oldingi belgi va yakuniy buzilish tartib bilan aytiladi.',
      'It communicates the symptom immediately before the final failure.',
      'Передаётся симптом, наблюдавшийся непосредственно перед окончательной поломкой.',
    ),
    ['deo-ni', 'repair-information'],
    5,
  ),

  s5u7_362_type_answer: grammarTypeAnswer(
    '이상한 소리가 나더니 화면이 꺼졌어요',
    L(
      '이상한 소리가 난 뒤 화면이 꺼졌다고 `-더니`로 쓰세요.',
      'G‘alati ovoz chiqib, keyin ekran o‘chganini `-더니` bilan yozing.',
      'Using -더니, write that a strange noise occurred and then the screen turned off.',
      'Используя -더니, напишите, что появился странный звук, а затем экран погас.',
    ),
    'A strange noise was observed and was followed by the screen turning off.',
    ['나더니'],
    ['deo-ni', 'sound', 'screen', 'type-answer'],
  ),

  s5u7_363_translate_builder: translateBuilder(
    L(
      '이상한 소리가 난 뒤 화면이 꺼졌다고 설명하기',
      'G‘alati ovozdan keyin ekran o‘chganini tushuntiring.',
      'Explain that the screen turned off after a strange noise appeared.',
      'Объясните, что после странного звука экран выключился.',
    ),
    [
      '화면이 꺼졌어요',
      '종이가 걸렸어요',
      '이상한 소리가 나더니',
      '수돗물을 틀었어요',
      '컴퓨터에서',
      '플러그를 뺐어요',
    ],
    '컴퓨터에서 이상한 소리가 나더니 화면이 꺼졌어요',
    L(
      '고장 발생 직전의 변화를 정확히 설명해요.',
      'Nosozlikdan oldingi o‘zgarish aniq tushuntiriladi.',
      'The change immediately before the failure is explained clearly.',
      'Точно объясняется изменение непосредственно перед поломкой.',
    ),
    ['deo-ni', 'repair-information'],
    5,
  ),

  s5u7_364_fill_in_blank: fillBlank(
    '컴퓨터에서 이상한 소리가 ___ 화면이 꺼졌어요.',
    ['나더니'],
    ['나더니', '나면서', '나려고', '나니까', '나지만'],
    L(
      '소리 증상 뒤에 화면이 꺼졌어요.',
      'Ovoz belgisidan keyin ekran o‘chdi.',
      'The screen turned off after the noise symptom.',
      'Экран выключился после появления странного звука.',
    ),
    ['deo-ni', 'sound'],
    5,
  ),

  s5u7_365_word_arrange: wordArrange(
    [
      '액정이 나갔어요',
      '휴대폰 화면이',
      '수돗물을 틀었어요',
      '몇 번 깜빡이더니',
      '종이를 제거했어요',
      '플러그를 꽂았어요',
    ],
    '휴대폰 화면이 몇 번 깜빡이더니 액정이 나갔어요',
    L(
      '화면 이상 징후 뒤에 액정이 완전히 고장 났어요.',
      'Ekran belgilaridan keyin displey butunlay buzildi.',
      'The display failed completely after several warning signs.',
      'После нескольких признаков неисправности дисплей полностью вышел из строя.',
    ),
    ['deo-ni', 'display', 'repair-information'],
    5,
  ),

  s5u7_366_type_answer: grammarTypeAnswer(
    '휴대폰 화면이 몇 번 깜빡이더니 액정이 나갔어요',
    L(
      '휴대폰 화면이 몇 번 깜빡인 뒤 액정이 고장 났다고 `-더니`로 쓰세요.',
      'Telefon ekrani bir necha marta miltillab, keyin displey buzilganini `-더니` bilan yozing.',
      'Using -더니, write that the phone screen flickered several times and then the display failed.',
      'Используя -더니, напишите, что экран телефона несколько раз мигнул, после чего дисплей вышел из строя.',
    ),
    'The phone screen flickered several times before the display failed.',
    ['깜빡이더니'],
    ['deo-ni', 'display', 'type-answer'],
  ),

  s5u7_367_error_hunt: errorHunt(
    '휴대폰 화면이 깜빡여더니 액정이 나갔어요.',
    '깜빡여더니',
    ['깜빡이더니', '깜빡이면서', '깜빡이려고', '깜빡이니까'],
    '깜빡이더니',
    L(
      '`깜빡이다`는 어간 `깜빡이-`에 `-더니`를 붙여요.',
      '`깜빡이다`ning `깜빡이-` o‘zagiga `-더니` qo‘shiladi.',
      'Attach -더니 to the stem 깜빡이-: 깜빡이더니.',
      'К основе 깜빡이- добавляется -더니: 깜빡이더니.',
    ),
    ['deo-ni', 'conjugation'],
    5,
  ),

  s5u7_368_translate_builder: translateBuilder(
    L(
      '복사기에 종이가 반복해서 걸린 뒤 결국 고장 났다고 설명하기',
      'Qog‘oz takror-takror tiqilib, oxiri qurilma buzilganini tushuntiring.',
      'Explain that paper kept jamming before the copier eventually broke down.',
      'Объясните, что бумага постоянно застревала, после чего копир окончательно сломался.',
    ),
    [
      '결국 고장이 났어요',
      '복사기에',
      '수돗물을 잠갔어요',
      '종이가 자꾸 걸리더니',
      '액정을 교체했어요',
      '시동을 걸었어요',
    ],
    '복사기에 종이가 자꾸 걸리더니 결국 고장이 났어요',
    L(
      '수리 기사에게 반복된 고장 징후를 전달하는 문장이에요.',
      'Ustaga takrorlangan nosozlik belgilarini yetkazadi.',
      'It communicates a repeated warning sign to the repair technician.',
      'Предложение передаёт мастеру повторяющийся признак неисправности.',
    ),
    ['deo-ni', 'paper-jam', 'repair-information'],
    5,
  ),

  s5u7_369_reading_quiz: readingQuiz(
    '세탁기는 며칠 전부터 평소와 다른 소리를 냈습니다. 오늘은 작동은 하지만 탈수가 전혀 되지 않습니다.',
    '가장 자연스러운 설명은 무엇이에요?',
    [
      '세탁기에서 이상한 소리가 나더니 탈수가 안 돼요.',
      '이상한 소리가 나서 탈수를 일부러 안 해요.',
      '탈수하려고 이상한 소리가 나요.',
      '이상한 소리가 나면서 정상적으로 탈수해요.',
    ],
    '세탁기에서 이상한 소리가 나더니 탈수가 안 돼요.',
    L(
      '소음이라는 초기 징후 뒤에 탈수 기능 고장이 나타났어요.',
      'Shovqin belgisidan keyin siqish funksiyasi buzildi.',
      'The noise was an earlier sign before the spin-cycle failure appeared.',
      'Шум был ранним признаком перед отказом отжима.',
    ),
    ['deo-ni', 'washing-machine'],
    5,
  ),

  s5u7_370_fill_in_blank: fillBlank(
    '세탁기에서 이상한 소리가 ___ 탈수가 안 돼요.',
    ['나더니'],
    ['나더니', '나면서', '나려고', '나니까', '나지만'],
    L(
      '소음 뒤에 탈수 기능 문제가 생겼어요.',
      'Shovqindan keyin siqish funksiyasida muammo paydo bo‘ldi.',
      'The spin-cycle problem appeared after the noise.',
      'Проблема с отжимом появилась после шума.',
    ),
    ['deo-ni', 'washing-machine'],
    5,
  ),

  s5u7_371_type_answer: grammarTypeAnswer(
    '세탁기에서 이상한 소리가 나더니 탈수가 안 돼요',
    L(
      '세탁기에서 이상한 소리가 난 뒤 탈수가 되지 않는다고 `-더니`로 쓰세요.',
      'Kir yuvish mashinasidan g‘alati ovoz chiqib, keyin siqish ishlamay qolganini `-더니` bilan yozing.',
      'Using -더니, write that the washer made a strange noise and then the spin cycle stopped working.',
      'Используя -더니, напишите, что стиральная машина издавала странный звук, а затем перестал работать отжим.',
    ),
    'A strange noise was observed from the washer before the spin cycle stopped working.',
    ['나더니'],
    ['deo-ni', 'washing-machine', 'type-answer'],
  ),

  s5u7_372_translate_builder: translateBuilder(
    L(
      '자동차 시동이 잘 걸리지 않기 시작한 뒤 결국 전혀 걸리지 않는다고 말하기',
      'Mashina avval yomon ishga tushib, oxiri umuman ishga tushmay qolganini ayting.',
      'Say that the engine became difficult to start and eventually stopped starting altogether.',
      'Скажите, что двигатель стал плохо заводиться, а затем совсем перестал запускаться.',
    ),
    [
      '이제는 전혀 안 걸려요',
      '시동이',
      '종이가 걸려요',
      '잘 안 걸리더니',
      '수돗물을 잠가요',
      '액정을 교체해요',
    ],
    '시동이 잘 안 걸리더니 이제는 전혀 안 걸려요',
    L(
      '시동 문제가 점점 심해져 완전히 걸리지 않게 됐어요.',
      'Dvigatelni ishga tushirish muammosi kuchayib, oxiri umuman ishlamay qoldi.',
      'The starting problem worsened until the engine stopped starting completely.',
      'Проблема с запуском усилилась, пока двигатель совсем не перестал заводиться.',
    ),
    ['deo-ni', 'engine'],
    5,
  ),

  s5u7_373_cloze_passage: clozePassage(
    '컴퓨터에서 이상한 소리가 ___ 화면이 꺼졌고, 복사기에는 종이가 자꾸 ___ 결국 고장이 났어요.',
    ['나더니', '걸리더니'],
    ['걸리더니', '나더니', '나면서', '걸려고', '꺼졌는데도'],
    L(
      '고장 직전의 징후와 최종 결과를 두 기기에서 비교해요.',
      'Ikki qurilmada nosozlikdan oldingi belgi va yakuniy natija taqqoslanadi.',
      'Warning signs and final failures are compared across two devices.',
      'Сравниваются признаки перед поломкой и окончательные неисправности двух устройств.',
    ),
    ['deo-ni', 'repair-information'],
    5,
  ),

  s5u7_374_word_arrange: wordArrange(
    [
      '결국 고장이 났어요',
      '종이가 자꾸 걸리더니',
      '수돗물을 틀었어요',
      '복사기에',
      '액정을 바꿨어요',
      '플러그를 뺐어요',
    ],
    '복사기에 종이가 자꾸 걸리더니 결국 고장이 났어요',
    L(
      '반복 증상과 최종 고장을 하나의 흐름으로 연결해요.',
      'Takroriy belgi va yakuniy nosozlik bir jarayon sifatida bog‘lanadi.',
      'The repeated symptom and final breakdown are connected as one progression.',
      'Повторяющийся симптом и окончательная поломка связываются в один процесс.',
    ),
    ['deo-ni', 'paper-jam'],
    5,
  ),

  s5u7_375_type_answer: grammarTypeAnswer(
    '시동이 잘 안 걸리더니 이제는 전혀 안 걸려요',
    L(
      '시동이 처음에는 잘 걸리지 않다가 이제는 전혀 걸리지 않는다고 쓰세요.',
      'Dvigatel avval qiyin ishga tushgan, endi esa umuman ishga tushmayotganini yozing.',
      'Write that the engine was initially difficult to start and now does not start at all.',
      'Напишите, что двигатель сначала плохо заводился, а теперь совсем не запускается.',
    ),
    'The engine became difficult to start and now does not start at all.',
    ['걸리더니'],
    ['deo-ni', 'engine', 'type-answer'],
  ),

  s5u7_376_reading_quiz: readingQuiz(
    '냉장고의 온도가 며칠 전부터 일정하지 않았습니다. 오늘 아침에 보니 안에 있던 채소가 얼어 있었습니다.',
    '가장 자연스러운 설명은 무엇이에요?',
    [
      '온도 조절이 잘 안 되더니 채소가 얼었어요.',
      '온도 조절이 안 돼서 채소를 일부러 얼렸어요.',
      '채소를 얼리려고 온도를 조절했어요.',
      '온도를 조절하면서 문제가 없어졌어요.',
    ],
    '온도 조절이 잘 안 되더니 채소가 얼었어요.',
    L(
      '온도 조절 문제가 먼저 관찰되고 그 뒤 채소가 어는 결과가 나타났어요.',
      'Avval harorat muammosi kuzatildi, keyin sabzavot muzladi.',
      'Temperature-control problems were observed before the vegetables froze.',
      'Проблемы с регулировкой температуры наблюдались до того, как овощи замёрзли.',
    ),
    ['deo-ni', 'temperature', 'refrigerator'],
    5,
  ),

  s5u7_377_translate_builder: translateBuilder(
    L(
      '냉장고 온도 조절이 잘 되지 않기 시작한 뒤 채소가 얼었다고 설명하기',
      'Muzlatkich harorati yaxshi boshqarilmay, keyin sabzavot muzlaganini tushuntiring.',
      'Explain that the vegetables froze after the refrigerator temperature stopped regulating properly.',
      'Объясните, что овощи замёрзли после того, как регулировка температуры холодильника стала работать плохо.',
    ),
    [
      '채소가 얼었어요',
      '온도 조절이',
      '종이가 걸렸어요',
      '잘 안 되더니',
      '플러그를 꽂았어요',
      '전화를 끊었어요',
    ],
    '온도 조절이 잘 안 되더니 채소가 얼었어요',
    L(
      '기능 이상과 그 뒤의 실제 피해를 연결해요.',
      'Funksiya muammosi va undan keyingi natija bog‘lanadi.',
      'The functional problem is connected to the later real-world consequence.',
      'Неисправность функции связывается с последующим результатом.',
    ),
    ['deo-ni', 'temperature'],
    5,
  ),

  s5u7_378_fill_in_blank: fillBlank(
    '온도 조절이 잘 안 ___ 채소가 얼었어요.',
    ['되더니'],
    ['되더니', '되면서', '되려고', '되니까', '되지만'],
    L(
      '온도 문제가 나타난 뒤 채소가 얼었어요.',
      'Harorat muammosidan keyin sabzavot muzladi.',
      'The vegetables froze after temperature-control problems appeared.',
      'Овощи замёрзли после появления проблемы с регулировкой температуры.',
    ),
    ['deo-ni', 'temperature'],
    5,
  ),

  s5u7_379_error_hunt: errorHunt(
    '시동이 잘 안 걸려더니 이제는 전혀 안 걸려요.',
    '걸려더니',
    ['걸리더니', '걸리면서', '걸리려고', '걸리니까'],
    '걸리더니',
    L(
      '`걸리다`는 어간 `걸리-`에 `-더니`를 붙여 `걸리더니`가 돼요.',
      '`걸리다`ning `걸리-` o‘zagiga `-더니` qo‘shilib `걸리더니` bo‘ladi.',
      'Attach -더니 to 걸리-: 걸리더니.',
      'К основе 걸리- добавляется -더니: 걸리더니.',
    ),
    ['deo-ni', 'conjugation'],
    5,
  ),

  s5u7_380_word_arrange: wordArrange(
    [
      '수리 기사에게 중요한 정보예요',
      '고장 직전에',
      '어떤 변화가 있었는지는',
      '제품 색깔만 말하고',
      '항상 증상을 숨기고',
      '종이만 교체해요',
    ],
    '고장 직전에 어떤 변화가 있었는지는 수리 기사에게 중요한 정보예요',
    L(
      '고장 직전의 징후를 설명하면 원인 파악에 도움이 돼요.',
      'Nosozlikdan oldingi belgilarni aytish sababni aniqlashga yordam beradi.',
      'Describing warning signs before a failure can help diagnose the cause.',
      'Описание признаков перед поломкой помогает определить её причину.',
    ),
    ['deo-ni', 'repair-information'],
    5,
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 5 · 수리 기사에게 변화 과정을 설명해요
  // 과거 상태 → 증상 변화 → 현재 고장 종합
  // ──────────────────────────────────────────────────────────

  s5u7_381_reading_quiz: readingQuiz(
    '고객은 휴대폰이 처음에는 가끔 통화 중 끊기기만 했다고 설명했습니다. 며칠 뒤에는 더 자주 끊겼고, 지금은 아예 통화 연결이 되지 않습니다.',
    '수리 기사에게 가장 정확한 설명은 무엇이에요?',
    [
      '전화가 가끔 끊기더니 이제는 아예 연결이 안 돼요.',
      '전화가 끊겨서 일부러 연결하지 않았어요.',
      '전화를 연결하려고 계속 끊었어요.',
      '전화가 끊기면서 지금은 정상이에요.',
    ],
    '전화가 가끔 끊기더니 이제는 아예 연결이 안 돼요.',
    L(
      '증상이 어떻게 변했는지를 시간 순서대로 정확하게 전달해요.',
      'Belgi qanday o‘zgarganini vaqt tartibida aniq aytadi.',
      'It clearly communicates how the symptom changed over time.',
      'Точно передаётся, как симптом менялся со временем.',
    ),
    ['deo-ni', 'repair-explanation'],
    5,
  ),

  s5u7_382_type_answer: grammarTypeAnswer(
    '처음에는 전화가 가끔 끊기더니 이제는 자꾸 끊겨요',
    L(
      '처음에는 전화가 가끔 끊겼지만 현재는 자주 끊긴다고 `-더니`를 사용해 쓰세요.',
      'Avval qo‘ng‘iroq ba’zan uzilgan, hozir esa tez-tez uzilayotganini `-더니` bilan yozing.',
      'Using -더니, write that calls initially disconnected occasionally but now disconnect frequently.',
      'Используя -더니, напишите, что сначала связь обрывалась иногда, а теперь постоянно.',
    ),
    'Calls initially disconnected only occasionally, but now they disconnect frequently.',
    ['끊기더니'],
    ['deo-ni', 'phone', 'repair-explanation', 'type-answer'],
  ),

  s5u7_383_translate_builder: translateBuilder(
    L(
      '처음에는 전화가 가끔 끊겼지만 현재는 자주 끊긴다고 설명하기',
      'Avval qo‘ng‘iroq ba’zan uzilgan, hozir esa tez-tez uzilayotganini tushuntiring.',
      'Explain that calls disconnected occasionally at first but now disconnect frequently.',
      'Объясните, что сначала связь обрывалась иногда, а теперь постоянно.',
    ),
    [
      '처음에는',
      '이제는 자꾸 끊겨요',
      '수돗물을 틀었어요',
      '전화가 가끔 끊기더니',
      '종이를 제거했어요',
      '액정을 바꿨어요',
    ],
    '처음에는 전화가 가끔 끊기더니 이제는 자꾸 끊겨요',
    L(
      '수리 기사에게 증상이 심해진 과정을 설명해요.',
      'Ustaga belgi kuchaygan jarayon tushuntiriladi.',
      'The worsening symptom progression is explained to the technician.',
      'Мастеру объясняется, как симптом усиливался.',
    ),
    ['deo-ni', 'repair-explanation'],
    5,
  ),

  s5u7_384_fill_in_blank: fillBlank(
    '전화가 처음에는 가끔 ___ 이제는 자꾸 끊겨요.',
    ['끊기더니'],
    ['끊기더니', '끊기면서', '끊기려고', '끊기니까', '끊기지만'],
    L(
      '처음 증상과 현재 증상의 차이를 설명해요.',
      'Dastlabki va hozirgi belgilar farqi tushuntiriladi.',
      'The difference between the initial and current symptom is explained.',
      'Объясняется разница между первоначальным и текущим симптомом.',
    ),
    ['deo-ni', 'phone'],
    5,
  ),

  s5u7_385_word_arrange: wordArrange(
    [
      '결국 고장이 났어요',
      '플러그를 꽂았어요',
      '복사기에',
      '종이가 자꾸 걸리더니',
      '수돗물을 잠갔어요',
      '액정을 교체했어요',
    ],
    '복사기에 종이가 자꾸 걸리더니 결국 고장이 났어요',
    L(
      '반복된 종이 걸림부터 최종 고장까지의 과정을 설명해요.',
      'Qog‘oz tiqilishidan yakuniy nosozlikkacha jarayon tushuntiriladi.',
      'The progression from repeated paper jams to final breakdown is explained.',
      'Объясняется процесс от повторных замятий бумаги до окончательной поломки.',
    ),
    ['deo-ni', 'paper-jam', 'repair-explanation'],
    5,
  ),

  s5u7_386_type_answer: grammarTypeAnswer(
    '복사기에 종이가 자꾸 걸리더니 결국 고장이 났어요',
    L(
      '복사기에 종이가 계속 걸리다가 결국 기계가 고장 났다고 쓰세요.',
      'Qog‘oz doim tiqilib, oxiri qurilma buzilganini yozing.',
      'Write that paper kept jamming in the copier before it eventually broke down.',
      'Напишите, что бумага постоянно застревала, после чего копир окончательно сломался.',
    ),
    'Paper repeatedly jammed in the copier before it eventually broke down.',
    ['걸리더니'],
    ['deo-ni', 'paper-jam', 'repair-explanation', 'type-answer'],
  ),

  s5u7_387_error_hunt: errorHunt(
    '복사기에 종이가 자꾸 걸려더니 결국 고장이 났어요.',
    '걸려더니',
    ['걸리더니', '걸리면서', '걸리려고', '걸리니까'],
    '걸리더니',
    L(
      '`걸리다`의 어간은 `걸리-`이므로 `걸리더니`라고 해요.',
      '`걸리다`ning o‘zagi `걸리-`, shuning uchun `걸리더니` bo‘ladi.',
      'The stem is 걸리-, so the correct form is 걸리더니.',
      'Основа — 걸리-, поэтому правильная форма — 걸리더니.',
    ),
    ['deo-ni', 'conjugation'],
    5,
  ),

  s5u7_388_translate_builder: translateBuilder(
    L(
      '복사기에 종이가 계속 걸린 뒤 결국 고장 났다고 수리 기사에게 설명하기',
      'Ustaga qog‘oz doim tiqilib, oxiri qurilma buzilganini tushuntiring.',
      'Explain to the technician that paper kept jamming and the copier eventually broke down.',
      'Объясните мастеру, что бумага постоянно застревала, после чего копир сломался.',
    ),
    [
      '복사기에',
      '수돗물을 틀었어요',
      '결국 고장이 났어요',
      '종이가 자꾸 걸리더니',
      '시동을 걸었어요',
      '액정을 교체했어요',
    ],
    '복사기에 종이가 자꾸 걸리더니 결국 고장이 났어요',
    L(
      '고장의 진행 과정을 수리 기사에게 전달해요.',
      'Nosozlikning rivojlanish jarayoni ustaga yetkaziladi.',
      'The progression of the malfunction is communicated to the technician.',
      'Мастеру передаётся развитие неисправности.',
    ),
    ['deo-ni', 'repair-explanation'],
    5,
  ),

  s5u7_389_reading_quiz: readingQuiz(
    '세탁기는 얼마 전까지 잘 작동했습니다. 며칠 전부터 이상한 소리가 나기 시작했고 오늘은 탈수가 되지 않습니다.',
    '가장 정확하게 전체 흐름을 설명한 것은 무엇이에요?',
    [
      '세탁기가 잘 돌아가더니 이상한 소리가 나고 이제는 탈수가 안 돼요.',
      '세탁기가 잘 돌아가서 일부러 탈수를 안 해요.',
      '탈수하려고 이상한 소리를 냈어요.',
      '이상한 소리가 나면서 계속 정상이에요.',
    ],
    '세탁기가 잘 돌아가더니 이상한 소리가 나고 이제는 탈수가 안 돼요.',
    L(
      '정상 작동에서 초기 증상을 거쳐 기능 고장까지 진행된 상황이에요.',
      'Normal ishlashdan belgi orqali funksiya nosozligigacha bo‘lgan jarayon.',
      'The machine progressed from normal operation to an early symptom and then functional failure.',
      'Машина перешла от нормальной работы к начальному симптому и затем к отказу функции.',
    ),
    ['deo-ni', 'washing-machine', 'repair-explanation'],
    5,
  ),

  s5u7_390_fill_in_blank: fillBlank(
    '세탁기가 전에는 잘 ___ 지금은 탈수가 안 돼요.',
    ['돌아가더니'],
    ['돌아가더니', '돌아가면서', '돌아가려고', '돌아가니까', '돌아가지만'],
    L(
      '전의 정상 작동과 현재의 기능 고장을 대비해요.',
      'Oldingi normal ishlash va hozirgi funksiya nosozligi taqqoslanadi.',
      'Previous normal operation contrasts with the current spin-cycle failure.',
      'Прежняя нормальная работа противопоставляется текущему отказу отжима.',
    ),
    ['deo-ni', 'washing-machine'],
    5,
  ),

  s5u7_391_type_answer: grammarTypeAnswer(
    '세탁기가 잘 돌아가더니 갑자기 탈수가 안 돼요',
    L(
      '세탁기가 전에는 잘 작동했지만 갑자기 탈수가 되지 않는다고 `-더니`로 쓰세요.',
      'Mashina avval yaxshi ishlagan, ammo birdan siqish ishlamay qolganini `-더니` bilan yozing.',
      'Using -더니, write that the washing machine worked well before but suddenly the spin cycle stopped working.',
      'Используя -더니, напишите, что стиральная машина раньше работала нормально, но внезапно перестал работать отжим.',
    ),
    'The washing machine had been operating normally, but the spin cycle suddenly stopped working.',
    ['돌아가더니'],
    ['deo-ni', 'washing-machine', 'type-answer'],
  ),

  s5u7_392_translate_builder: translateBuilder(
    L(
      '세탁기가 잘 작동하다가 갑자기 탈수가 되지 않는다고 설명하기',
      'Kir yuvish mashinasi yaxshi ishlab, keyin birdan siqish ishlamay qolganini tushuntiring.',
      'Explain that the washing machine was working well and then suddenly the spin cycle stopped.',
      'Объясните, что стиральная машина работала нормально, а затем внезапно перестал работать отжим.',
    ),
    [
      '갑자기 탈수가 안 돼요',
      '세탁기가',
      '수돗물을 잠갔어요',
      '잘 돌아가더니',
      '종이가 걸렸어요',
      '플러그를 뺐어요',
    ],
    '세탁기가 잘 돌아가더니 갑자기 탈수가 안 돼요',
    L(
      '정상에서 고장으로 바뀐 시점을 구체적으로 설명해요.',
      'Normal holatdan nosoz holatga o‘tish aniq tushuntiriladi.',
      'It clearly describes the transition from normal operation to failure.',
      'Точно описывается переход от нормальной работы к неисправности.',
    ),
    ['deo-ni', 'washing-machine'],
    5,
  ),

  s5u7_393_cloze_passage: clozePassage(
    '전화가 가끔 ___ 이제는 자꾸 끊기고, 세탁기도 잘 ___ 갑자기 탈수가 안 돼요.',
    ['끊기더니', '돌아가더니'],
    ['돌아가더니', '끊기더니', '끊으면서', '돌아가려고', '걸렸는데도'],
    L(
      '서로 다른 기기의 변화 과정을 `-더니`로 설명해요.',
      'Turli qurilmalarning o‘zgarish jarayoni `-더니` bilan tushuntiriladi.',
      'Changes in two different devices are described with -더니.',
      'Изменения в двух разных устройствах описываются с помощью -더니.',
    ),
    ['deo-ni', 'repair-explanation'],
    5,
  ),

  s5u7_394_word_arrange: wordArrange(
    [
      '오늘은 안 나와요',
      '전에는',
      '종이를 빼냈어요',
      '화면이 잘 나오더니',
      '수돗물을 틀었어요',
      '액정을 교체했어요',
    ],
    '전에는 화면이 잘 나오더니 오늘은 안 나와요',
    L(
      '수리 기사에게 화면 상태가 언제부터 달라졌는지 설명할 수 있어요.',
      'Ustaga ekran holati qachondan o‘zgarganini tushuntirish mumkin.',
      'It helps explain to the technician how the screen condition changed over time.',
      'Так можно объяснить мастеру, как со временем изменилось состояние экрана.',
    ),
    ['deo-ni', 'screen', 'repair-explanation'],
    5,
  ),

  s5u7_395_type_answer: grammarTypeAnswer(
    '차에서 이상한 소리가 나더니 시동이 꺼졌어요',
    L(
      '자동차에서 이상한 소리가 난 뒤 시동이 꺼졌다고 `-더니`로 쓰세요.',
      'Mashinadan g‘alati ovoz chiqib, keyin dvigatel o‘chganini `-더니` bilan yozing.',
      'Using -더니, write that the car made a strange noise and then the engine stopped.',
      'Используя -더니, напишите, что машина издала странный звук, после чего двигатель заглох.',
    ),
    'A strange noise was observed from the car, and then the engine stopped.',
    ['나더니'],
    ['deo-ni', 'engine', 'sound', 'type-answer'],
  ),

  s5u7_396_reading_quiz: readingQuiz(
    '수리 기사는 고객에게 “처음부터 지금까지 증상이 어떻게 달라졌어요?”라고 물었습니다. 고객은 처음에는 화면이 가끔 안 나왔고 이제는 전혀 나오지 않는다고 설명했습니다.',
    '수리 기사가 이 정보를 묻는 이유는 무엇이에요?',
    [
      '고장이 어떻게 진행됐는지 파악하기 위해서예요.',
      '고객이 좋아하는 색을 알기 위해서예요.',
      '제품 이름을 숨기기 위해서예요.',
      '아무 문제도 없다고 판단하기 위해서예요.',
    ],
    '고장이 어떻게 진행됐는지 파악하기 위해서예요.',
    L(
      '증상의 변화 과정을 알면 원인과 고장 정도를 판단하는 데 도움이 돼요.',
      'Belgining o‘zgarishini bilish sabab va nosozlik darajasini aniqlashga yordam beradi.',
      'Symptom progression helps determine the cause and severity of the malfunction.',
      'Развитие симптомов помогает определить причину и серьёзность неисправности.',
    ),
    ['deo-ni', 'learning-value'],
    5,
  ),

  s5u7_397_translate_builder: translateBuilder(
    L(
      '처음에는 괜찮았지만 이상한 소리가 나기 시작했고 지금은 전원이 켜지지 않는다고 설명하기',
      'Dastlab yaxshi bo‘lgan, keyin g‘alati ovoz chiqib, hozir esa yoqilmayotganini tushuntiring.',
      'Explain that it was fine at first, then started making a strange noise, and now it does not turn on.',
      'Объясните, что сначала всё было нормально, затем появился странный звук, а теперь устройство не включается.',
    ),
    [
      '지금은 전원이 안 켜져요',
      '처음에는 괜찮더니',
      '종이가 걸리고',
      '이상한 소리가 나고',
      '수돗물을 잠갔어요',
      '액정을 교체했어요',
    ],
    '처음에는 괜찮더니 이상한 소리가 나고 지금은 전원이 안 켜져요',
    L(
      '정상 상태에서 초기 증상을 거쳐 현재 고장까지 설명해요.',
      'Normal holatdan dastlabki belgilar orqali hozirgi nosozlikkacha tushuntiriladi.',
      'It explains the full progression from normal operation to warning signs and the current failure.',
      'Описывается весь путь от нормальной работы через первые признаки к текущей неисправности.',
    ),
    ['deo-ni', 'repair-explanation'],
    5,
  ),

  s5u7_398_fill_in_blank: fillBlank(
    '처음에는 ___ 이상한 소리가 나고 지금은 전원이 안 켜져요.',
    ['괜찮더니'],
    ['괜찮더니', '괜찮으면서', '괜찮으려고', '괜찮으니까', '괜찮지만'],
    L(
      '처음 정상 상태에서 여러 고장 단계로 변했어요.',
      'Dastlabki normal holatdan bir necha nosozlik bosqichiga o‘tdi.',
      'The device progressed from an initially normal state through several malfunction stages.',
      'Устройство прошло от нормального состояния через несколько стадий неисправности.',
    ),
    ['deo-ni', 'adjective'],
    5,
  ),

  s5u7_399_error_hunt: errorHunt(
    '처음에는 괜찮았더니 지금은 이상한 소리가 나요.',
    '괜찮았더니',
    ['괜찮더니', '괜찮으면서', '괜찮으니까', '괜찮지만'],
    '괜찮더니',
    L(
      '이번 레슨의 목표는 과거에 관찰한 상태를 회상하는 `A/V-더니`예요. `괜찮다`는 `괜찮더니`로 써요.',
      'Bu dars maqsadi kuzatilgan oldingi holatni ifodalovchi `A/V-더니`; `괜찮다 → 괜찮더니`.',
      'The target is observational A/V-더니; 괜찮다 becomes 괜찮더니 here.',
      'Цель — наблюдательная конструкция A/V-더니; здесь 괜찮다 → 괜찮더니.',
    ),
    ['deo-ni', 'grammar-contrast'],
    5,
  ),

  s5u7_400_word_arrange: wordArrange(
    [
      '더 정확하게 전달할 수 있어요',
      '고장 증상이 어떻게 변했는지를',
      '`A/V-더니`를 사용하면',
      '증상은 숨기고',
      '수리 기사에게',
      '제품 이름만 말해요',
    ],
    '`A/V-더니`를 사용하면 고장 증상이 어떻게 변했는지를 수리 기사에게 더 정확하게 전달할 수 있어요',
    L(
      '문법을 실제 고장 설명에 사용해서 변화 과정까지 전달하는 것이 이번 Node의 목표예요.',
      'Bu Node maqsadi grammatikani real nosozlik tushuntirishida ishlatib, o‘zgarish jarayonini ham yetkazishdir.',
      'The goal of this node is to use the grammar to communicate how a malfunction changed over time.',
      'Цель Node — использовать грамматику, чтобы точно передавать развитие неисправности во времени.',
    ),
    ['deo-ni', 'node-review', 'repair-explanation'],
    5,
  ), // ══════════════════════════════════════════════════════════
  // Section 5 · Unit 7 · Node 5
  // V-도록 하다
  // 행동을 하게 지시하거나 꼭 실천하도록 권고하기
  // ══════════════════════════════════════════════════════════

  // ──────────────────────────────────────────────────────────
  // Lesson 1 · 이렇게 하도록 하세요
  // V-도록 하다 기본 형태와 기기 조작 지시
  // ──────────────────────────────────────────────────────────

  s5u7_401_reading_quiz: readingQuiz(
    '컴퓨터에서 이상한 소리가 납니다. 계속 사용하지 말고 먼저 전원을 끄는 것이 안전합니다.',
    '가장 자연스러운 안내는 무엇이에요?',
    [
      '먼저 전원을 끄도록 하세요.',
      '먼저 전원을 끄면서 하세요.',
      '먼저 전원을 끄려고 하세요.',
      '먼저 전원을 끄는데도 하세요.',
    ],
    '먼저 전원을 끄도록 하세요.',
    L(
      '문제가 있을 때 먼저 전원을 끄라는 지시예요.',
      'Muammo bo‘lsa avval qurilmani o‘chirish ko‘rsatmasi.',
      'This instructs the user to turn off the power first.',
      'Это инструкция сначала выключить питание.',
    ),
    ['dorok-hada', 'power'],
    5,
  ),

  s5u7_402_type_answer: grammarTypeAnswer(
    '먼저 전원을 끄도록 하세요',
    L(
      '문제가 생기면 먼저 기기의 전원을 끄라고 `-도록 하다`를 사용해 쓰세요.',
      'Muammo bo‘lsa avval qurilmani o‘chirishni `-도록 하다` bilan yozing.',
      'Using -도록 하다, tell the user to turn off the device first.',
      'Используя -도록 하다, скажите сначала выключить устройство.',
    ),
    'The listener is instructed to make sure the device is turned off first.',
    ['끄도록 하세요'],
    ['dorok-hada', 'power', 'type-answer'],
  ),

  s5u7_403_translate_builder: translateBuilder(
    L(
      '문제가 생기면 먼저 전원을 끄라고 안내하기',
      'Muammo bo‘lsa avval quvvatni o‘chirishni ayting.',
      'Tell the user to make sure the power is turned off first.',
      'Скажите сначала обязательно выключить питание.',
    ),
    [
      '먼저 전원을',
      '끄도록 하세요',
      '종이를 제거하세요',
      '문제가 생기면',
      '계속 사용하세요',
      '수돗물을 트세요',
    ],
    '문제가 생기면 먼저 전원을 끄도록 하세요',
    L(
      '기기에 문제가 생겼을 때의 기본 안전 조치예요.',
      'Qurilmada muammo bo‘lgandagi asosiy xavfsizlik chorasi.',
      'This is a basic safety step when a device has a problem.',
      'Это базовая мера безопасности при неисправности устройства.',
    ),
    ['dorok-hada', 'power'],
    5,
  ),

  s5u7_404_fill_in_blank: fillBlank(
    '기기에서 이상한 소리가 나면 전원을 ___.',
    ['끄도록 하세요'],
    [
      '끄도록 하세요',
      '켜도록 하세요',
      '틀도록 하세요',
      '걸도록 하세요',
      '꽂도록 하세요',
    ],
    L(
      '이상한 소리가 나는 기기는 먼저 전원을 끄는 것이 안전해요.',
      'G‘alati ovoz chiqayotgan qurilmani avval o‘chirish xavfsiz.',
      'It is safer to turn off a device that is making a strange noise.',
      'Устройство со странным звуком безопаснее сначала выключить.',
    ),
    ['dorok-hada', 'power'],
    5,
  ),

  s5u7_405_word_arrange: wordArrange(
    [
      '계속 사용하도록 하세요',
      '플러그를',
      '빼도록 하세요',
      '종이를 넣으세요',
      '전원을 끈 뒤',
      '수돗물을 트세요',
    ],
    '전원을 끈 뒤 플러그를 빼도록 하세요',
    L(
      '전원을 끈 다음 전기 연결도 분리하라는 안전 안내예요.',
      'Qurilmani o‘chirib, keyin elektr ulanishini uzish ko‘rsatmasi.',
      'Turn off the device and then unplug it for safety.',
      'Выключите устройство, а затем отсоедините вилку.',
    ),
    ['dorok-hada', 'plug', 'safety'],
    5,
  ),

  s5u7_406_type_answer: grammarTypeAnswer(
    '전원을 끈 뒤 플러그를 빼도록 하세요',
    L(
      '전원을 끈 다음 플러그를 빼라고 `-도록 하다`를 사용해 쓰세요.',
      'Qurilmani o‘chirib, keyin vilkani chiqarishni `-도록 하다` bilan yozing.',
      'Using -도록 하다, instruct the user to unplug the device after turning it off.',
      'Используя -도록 하다, скажите вынуть вилку после выключения устройства.',
    ),
    'The listener is instructed to unplug the device after turning off the power.',
    ['빼도록 하세요'],
    ['dorok-hada', 'plug', 'type-answer'],
  ),

  s5u7_407_error_hunt: errorHunt(
    '고장 확인 전에는 플러그를 빼려고 하세요.',
    '빼려고',
    ['빼도록', '빼면서', '빼니까', '빼지만'],
    '빼도록',
    L(
      '꼭 해야 할 행동을 지시할 때는 `V-도록 하세요`를 사용해요.',
      'Bajarilishi kerak bo‘lgan ish uchun `V-도록 하세요` ishlatiladi.',
      'Use V-도록 하세요 when instructing someone to make sure an action is done.',
      'Для обязательного указания используется V-도록 하세요.',
    ),
    ['dorok-hada', 'grammar-contrast'],
    5,
  ),

  s5u7_408_translate_builder: translateBuilder(
    L(
      '플러그가 빠져 있으면 다시 연결하라고 안내하기',
      'Vilka chiqib ketgan bo‘lsa, yana ulashni ayting.',
      'Tell the user to plug it back in if the plug is disconnected.',
      'Скажите снова подключить вилку, если она отсоединена.',
    ),
    [
      '다시 꽂도록 하세요',
      '플러그가 빠져 있으면',
      '계속 빼 두세요',
      '종이를 제거하세요',
      '수돗물을 잠그세요',
      '시동을 거세요',
    ],
    '플러그가 빠져 있으면 다시 꽂도록 하세요',
    L(
      '전원 연결 상태를 확인하고 필요한 조치를 하게 해요.',
      'Elektr ulanishini tekshirib, kerakli chorani bajarishga undaydi.',
      'It instructs the user to restore the power connection when necessary.',
      'Пользователю предлагается восстановить подключение питания при необходимости.',
    ),
    ['dorok-hada', 'plug'],
    5,
  ),

  s5u7_409_reading_quiz: readingQuiz(
    '세탁기에 물이 들어오지 않습니다. 수도꼭지가 닫혀 있는지 먼저 확인해야 합니다.',
    '가장 알맞은 안내는 무엇이에요?',
    [
      '수도꼭지가 열려 있는지 확인하도록 하세요.',
      '수도꼭지를 무조건 잠그도록 하세요.',
      '플러그를 물에 넣도록 하세요.',
      '종이를 확인하도록 하세요.',
    ],
    '수도꼭지가 열려 있는지 확인하도록 하세요.',
    L(
      '급수 문제에서는 수도 연결 상태를 먼저 확인해요.',
      'Suv kelmasa, avval jo‘mrak holatini tekshirish kerak.',
      'For a water-supply issue, check whether the tap is open.',
      'При проблеме с подачей воды сначала проверьте кран.',
    ),
    ['dorok-hada', 'water'],
    5,
  ),

  s5u7_410_fill_in_blank: fillBlank(
    '세탁기에 물이 안 들어오면 수도꼭지를 ___.',
    ['확인하도록 하세요'],
    [
      '확인하도록 하세요',
      '버리도록 하세요',
      '쏟도록 하세요',
      '떨어뜨리도록 하세요',
      '교체하지 않도록 하세요',
    ],
    L(
      '세탁기의 급수 문제에서는 수도 상태 확인이 필요해요.',
      'Kir yuvish mashinasida suv muammosi bo‘lsa, jo‘mrakni tekshirish kerak.',
      'A water-supply problem requires checking the tap.',
      'При проблеме с подачей воды нужно проверить кран.',
    ),
    ['dorok-hada', 'water'],
    5,
  ),

  s5u7_411_type_answer: grammarTypeAnswer(
    '세탁기에 물이 안 들어오면 수도꼭지를 확인하도록 하세요',
    L(
      '세탁기에 물이 들어오지 않으면 수도꼭지를 확인하라고 쓰세요.',
      'Kir yuvish mashinasiga suv kelmasa, jo‘mrakni tekshirishni yozing.',
      'Write an instruction to check the tap if water does not enter the washing machine.',
      'Напишите инструкцию проверить кран, если вода не поступает в стиральную машину.',
    ),
    'If water does not enter the washing machine, the listener should check the tap.',
    ['확인하도록 하세요'],
    ['dorok-hada', 'water', 'type-answer'],
  ),

  s5u7_412_translate_builder: translateBuilder(
    L(
      '물이 새면 먼저 수도를 잠그라고 지시하기',
      'Suv sizsa, avval jo‘mrakni yopishni ayting.',
      'If water is leaking, instruct the user to turn off the tap first.',
      'Если течёт вода, скажите сначала закрыть кран.',
    ),
    [
      '물이 새면',
      '먼저 수돗물을',
      '잠그도록 하세요',
      '계속 틀도록 하세요',
      '플러그를 꽂으세요',
      '시동을 거세요',
    ],
    '물이 새면 먼저 수돗물을 잠그도록 하세요',
    L(
      '물이 새는 상황에서는 물 공급을 먼저 막아야 해요.',
      'Suv sizayotgan bo‘lsa, avval suv oqimini to‘xtatish kerak.',
      'When water leaks, the water supply should be shut off first.',
      'При утечке воды сначала нужно перекрыть подачу воды.',
    ),
    ['dorok-hada', 'water', 'safety'],
    5,
  ),

  s5u7_413_cloze_passage: clozePassage(
    '기기에서 이상한 소리가 나면 전원을 ___ . 물이 새면 수돗물을 ___ .',
    ['끄도록 하세요', '잠그도록 하세요'],
    [
      '잠그도록 하세요',
      '끄도록 하세요',
      '켜도록 하세요',
      '틀도록 하세요',
      '쏟도록 하세요',
    ],
    L(
      '고장 상황에 따라 전기와 물을 안전하게 차단하는 방법을 구별해요.',
      'Nosozlikka qarab elektr va suvni xavfsiz to‘xtatish usullari farqlanadi.',
      'Distinguish how to safely shut off electricity and water depending on the problem.',
      'Различаем безопасное отключение электричества и воды в зависимости от ситуации.',
    ),
    ['dorok-hada', 'safety'],
    5,
  ),

  s5u7_414_word_arrange: wordArrange(
    [
      '수리 센터에 연락하도록 하세요',
      '계속 사용하도록 하세요',
      '문제가 계속되면',
      '채소를 얼리도록 하세요',
      '종이를 넣도록 하세요',
      '플러그를 물에 넣으세요',
    ],
    '문제가 계속되면 수리 센터에 연락하도록 하세요',
    L(
      '기본 대처로 해결되지 않는 문제는 전문 수리를 요청해요.',
      'Oddiy choralar yordam bermasa, servis markaziga murojaat qilinadi.',
      'Contact a repair center if basic troubleshooting does not solve the problem.',
      'Если базовые действия не помогли, обратитесь в сервисный центр.',
    ),
    ['dorok-hada', 'repair-center'],
    5,
  ),

  s5u7_415_type_answer: grammarTypeAnswer(
    '문제가 계속되면 수리 센터에 연락하도록 하세요',
    L(
      '문제가 계속되는 경우 수리 센터에 연락하라고 `-도록 하다`로 쓰세요.',
      'Muammo davom etsa, servis markaziga murojaat qilishni `-도록 하다` bilan yozing.',
      'Using -도록 하다, tell the user to contact a repair center if the problem continues.',
      'Используя -도록 하다, скажите обратиться в сервисный центр, если проблема продолжается.',
    ),
    'If the problem continues, the listener should contact a repair center.',
    ['연락하도록 하세요'],
    ['dorok-hada', 'repair-center', 'type-answer'],
  ),

  s5u7_416_reading_quiz: readingQuiz(
    '전원을 다시 켜 봐도 같은 문제가 반복됩니다. 사용자가 같은 방법만 계속 반복하는 것보다 전문적인 점검을 받는 것이 좋습니다.',
    '가장 적절한 안내는 무엇이에요?',
    [
      '수리 센터에서 점검을 받도록 하세요.',
      '계속 전원만 켜도록 하세요.',
      '기기를 물에 넣도록 하세요.',
      '문제가 없는 것처럼 사용하도록 하세요.',
    ],
    '수리 센터에서 점검을 받도록 하세요.',
    L(
      '기본적인 방법으로 해결되지 않으면 전문 점검이 필요해요.',
      'Oddiy usullar yordam bermasa professional tekshiruv kerak.',
      'Professional inspection is appropriate when basic troubleshooting fails.',
      'Если базовые действия не помогают, нужна профессиональная диагностика.',
    ),
    ['dorok-hada', 'inspection'],
    5,
  ),

  s5u7_417_translate_builder: translateBuilder(
    L(
      '문제가 반복되면 전문 점검을 받으라고 권하기',
      'Muammo takrorlansa, professional tekshiruvdan o‘tishni tavsiya qiling.',
      'Recommend getting a professional inspection if the problem keeps recurring.',
      'Посоветуйте пройти профессиональную диагностику, если проблема повторяется.',
    ),
    [
      '전문 점검을',
      '받도록 하세요',
      '문제가 반복되면',
      '계속 사용하세요',
      '채소를 얼리세요',
      '종이를 넣으세요',
    ],
    '문제가 반복되면 전문 점검을 받도록 하세요',
    L(
      '반복되는 고장에는 전문적인 확인이 필요해요.',
      'Takroriy nosozlik professional tekshiruvni talab qiladi.',
      'Repeated malfunctions require professional inspection.',
      'Повторная неисправность требует профессиональной проверки.',
    ),
    ['dorok-hada', 'inspection'],
    5,
  ),

  s5u7_418_fill_in_blank: fillBlank(
    '같은 문제가 계속되면 전문 점검을 ___.',
    ['받도록 하세요'],
    [
      '받도록 하세요',
      '피하도록 하세요',
      '버리도록 하세요',
      '쏟도록 하세요',
      '얼리도록 하세요',
    ],
    L(
      '같은 문제가 반복될 때는 전문적인 점검을 받아요.',
      'Bir xil muammo takrorlansa professional tekshiruvdan o‘tiladi.',
      'Get a professional inspection when the same problem persists.',
      'При повторении одной и той же проблемы пройдите профессиональную диагностику.',
    ),
    ['dorok-hada', 'inspection'],
    5,
  ),

  s5u7_419_error_hunt: errorHunt(
    '같은 문제가 계속되면 수리 센터에 연락하려고 하세요.',
    '연락하려고',
    ['연락하도록', '연락하면서', '연락하니까', '연락하지만'],
    '연락하도록',
    L(
      '실천해야 할 행동을 권하거나 지시할 때는 `연락하도록 하세요`가 알맞아요.',
      'Bajarilishi kerak bo‘lgan harakat uchun `연락하도록 하세요` mos.',
      'Use 연락하도록 하세요 when instructing the listener to make sure they contact the center.',
      'Для указания обратиться в сервис подходит 연락하도록 하세요.',
    ),
    ['dorok-hada', 'grammar-contrast'],
    5,
  ),

  s5u7_420_word_arrange: wordArrange(
    [
      '필요한 행동을',
      '`V-도록 하다`는',
      '꼭 실천하게',
      '안내할 때 쓸 수 있어요',
      '과거만 설명하고',
      '명사에만 붙어요',
    ],
    '`V-도록 하다`는 필요한 행동을 꼭 실천하게 안내할 때 쓸 수 있어요',
    L(
      '해야 할 행동을 지시하거나 권하는 것이 이번 문법의 핵심이에요.',
      'Kerakli harakatni bajarishga yo‘naltirish bu grammatikaning asosiy ma’nosi.',
      'The core use is to instruct or encourage someone to carry out a necessary action.',
      'Основное значение — побуждать или инструктировать выполнить необходимое действие.',
    ),
    ['dorok-hada', 'grammar-summary'],
    5,
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 2 · 고장 나지 않도록 하세요
  // V-지 않도록 하다 · 예방과 금지
  // ──────────────────────────────────────────────────────────

  s5u7_421_reading_quiz: readingQuiz(
    '전자 제품 근처에서 음료를 마시면 실수로 쏟을 수 있습니다. 노트북 근처에서는 특히 조심해야 합니다.',
    '가장 자연스러운 안내는 무엇이에요?',
    [
      '노트북에 음료수를 쏟지 않도록 하세요.',
      '노트북에 음료수를 쏟도록 하세요.',
      '노트북을 물에 빠뜨리도록 하세요.',
      '노트북을 떨어뜨리도록 하세요.',
    ],
    '노트북에 음료수를 쏟지 않도록 하세요.',
    L(
      '전자 제품에 음료를 흘리지 않도록 주의하라는 뜻이에요.',
      'Elektron qurilmaga ichimlik to‘kmaslikka ehtiyot bo‘lish kerak.',
      'It warns the user to avoid spilling drinks on the laptop.',
      'Это предупреждение не проливать напитки на ноутбук.',
    ),
    ['dorok-hada', 'negative', 'spill'],
    5,
  ),

  s5u7_422_type_answer: grammarTypeAnswer(
    '노트북에 음료수를 쏟지 않도록 하세요',
    L(
      '노트북에 음료를 흘리지 않게 조심하라고 `-지 않도록 하다`로 쓰세요.',
      'Noutbuk ustiga ichimlik to‘kmaslikni `-지 않도록 하다` bilan yozing.',
      'Using -지 않도록 하다, tell the user to make sure not to spill a drink on the laptop.',
      'Используя -지 않도록 하다, скажите не проливать напитки на ноутбук.',
    ),
    'The listener is instructed to take care not to spill a drink on the laptop.',
    ['쏟지 않도록 하세요'],
    ['dorok-hada', 'negative', 'spill', 'type-answer'],
  ),

  s5u7_423_translate_builder: translateBuilder(
    L(
      '휴대폰을 물에 빠뜨리지 않게 조심하라고 말하기',
      'Telefonni suvga tushirib yubormaslikka ehtiyot bo‘lishni ayting.',
      'Tell the user to be careful not to drop the phone into water.',
      'Скажите быть осторожным, чтобы не уронить телефон в воду.',
    ),
    [
      '휴대폰을',
      '물에 빠뜨리지 않도록 하세요',
      '물을 부으세요',
      '사용할 때',
      '종이를 넣으세요',
      '시동을 거세요',
    ],
    '사용할 때 휴대폰을 물에 빠뜨리지 않도록 하세요',
    L(
      '물 때문에 휴대폰이 고장 나지 않게 예방하는 안내예요.',
      'Telefon suv sabab buzilmasligi uchun ehtiyot chorasi.',
      'This prevents water damage to the phone.',
      'Это мера для предотвращения повреждения телефона водой.',
    ),
    ['dorok-hada', 'negative', 'water-damage'],
    5,
  ),

  s5u7_424_fill_in_blank: fillBlank(
    '휴대폰을 사용할 때 물에 ___.',
    ['빠뜨리지 않도록 하세요'],
    [
      '빠뜨리지 않도록 하세요',
      '빠뜨리도록 하세요',
      '쏟도록 하세요',
      '얼리도록 하세요',
      '걸리도록 하세요',
    ],
    L(
      '휴대폰이 물에 들어가지 않게 주의해야 해요.',
      'Telefon suvga tushmasligiga ehtiyot bo‘lish kerak.',
      'Be careful not to let the phone fall into water.',
      'Будьте осторожны, чтобы телефон не упал в воду.',
    ),
    ['dorok-hada', 'negative'],
    5,
  ),

  s5u7_425_word_arrange: wordArrange(
    [
      '휴대폰을',
      '떨어뜨리지 않도록 하세요',
      '걸을 때',
      '종이를 빼도록 하세요',
      '일부러 흔드세요',
      '음료수를 쏟으세요',
    ],
    '걸을 때 휴대폰을 떨어뜨리지 않도록 하세요',
    L(
      '이동 중에 휴대폰을 떨어뜨리지 않게 조심하라는 안내예요.',
      'Yurayotganda telefonni tushirib yubormaslik ko‘rsatmasi.',
      'Be careful not to drop the phone while walking.',
      'Будьте осторожны, чтобы не уронить телефон во время ходьбы.',
    ),
    ['dorok-hada', 'negative', 'drop'],
    5,
  ),

  s5u7_426_type_answer: grammarTypeAnswer(
    '걸을 때 휴대폰을 떨어뜨리지 않도록 하세요',
    L(
      '걸어가면서 휴대폰을 떨어뜨리지 않게 주의하라고 쓰세요.',
      'Yurayotganda telefonni tushirib yubormaslikka ehtiyot bo‘lishni yozing.',
      'Write an instruction to be careful not to drop the phone while walking.',
      'Напишите инструкцию быть осторожным и не уронить телефон во время ходьбы.',
    ),
    'The listener should take care not to drop the phone while walking.',
    ['떨어뜨리지 않도록 하세요'],
    ['dorok-hada', 'negative', 'drop', 'type-answer'],
  ),

  s5u7_427_error_hunt: errorHunt(
    '노트북 근처에서는 음료수를 쏟도록 하세요.',
    '쏟도록',
    ['쏟지 않도록', '쏟으면서', '쏟으려고', '쏟으니까'],
    '쏟지 않도록',
    L(
      '예방해야 하는 행동에는 `V-지 않도록 하세요`를 사용해요.',
      'Oldini olish kerak bo‘lgan ish uchun `V-지 않도록 하세요` ishlatiladi.',
      'Use V-지 않도록 하세요 for an action that should be avoided.',
      'Для действия, которого нужно избегать, используется V-지 않도록 하세요.',
    ),
    ['dorok-hada', 'negative', 'grammar-contrast'],
    5,
  ),

  s5u7_428_translate_builder: translateBuilder(
    L(
      '전자 제품 안에 먼지가 많이 쌓이지 않게 정기적으로 청소하라고 말하기',
      'Qurilma ichida chang ko‘p yig‘ilmasligi uchun muntazam tozalashni ayting.',
      'Tell the user to clean regularly so that too much dust does not accumulate inside the device.',
      'Скажите регулярно чистить устройство, чтобы внутри не скапливалось много пыли.',
    ),
    [
      '정기적으로 청소하도록 하세요',
      '전자 제품 안에',
      '먼지가 많이 끼지 않게',
      '먼지를 더 넣으세요',
      '플러그를 물에 넣으세요',
      '종이를 접으세요',
    ],
    '전자 제품 안에 먼지가 많이 끼지 않게 정기적으로 청소하도록 하세요',
    L(
      '먼지 때문에 고장이 생기지 않도록 예방하는 관리 방법이에요.',
      'Chang sabab nosozlik bo‘lmasligi uchun profilaktik parvarish.',
      'Regular cleaning helps prevent malfunctions caused by dust.',
      'Регулярная чистка помогает предотвратить неисправности из-за пыли.',
    ),
    ['dorok-hada', 'dust', 'maintenance'],
    5,
  ),

  s5u7_429_reading_quiz: readingQuiz(
    '컴퓨터 안에 먼지가 많이 쌓이면 열이 잘 빠지지 않아 문제가 생길 수 있습니다.',
    '가장 알맞은 관리 방법은 무엇이에요?',
    [
      '먼지가 많이 끼지 않도록 정기적으로 청소하세요.',
      '먼지가 더 끼도록 그대로 두세요.',
      '컴퓨터에 음료수를 쏟으세요.',
      '통풍구를 막도록 하세요.',
    ],
    '먼지가 많이 끼지 않도록 정기적으로 청소하세요.',
    L(
      '먼지가 쌓이는 것을 예방하기 위한 정기적인 관리가 필요해요.',
      'Chang yig‘ilishini oldini olish uchun muntazam parvarish kerak.',
      'Regular maintenance is needed to prevent dust buildup.',
      'Нужен регулярный уход, чтобы предотвратить накопление пыли.',
    ),
    ['dorok-hada', 'dust', 'maintenance'],
    5,
  ),

  s5u7_430_fill_in_blank: fillBlank(
    '컴퓨터 안에 먼지가 많이 끼지 않게 정기적으로 ___.',
    ['청소하도록 하세요'],
    [
      '청소하도록 하세요',
      '쏟도록 하세요',
      '떨어뜨리도록 하세요',
      '막도록 하세요',
      '얼리도록 하세요',
    ],
    L(
      '먼지가 쌓이지 않도록 정기적으로 청소해요.',
      'Chang yig‘ilmasligi uchun muntazam tozalanadi.',
      'Clean regularly to prevent dust buildup.',
      'Регулярно чистите устройство, чтобы пыль не скапливалась.',
    ),
    ['dorok-hada', 'maintenance'],
    5,
  ),

  s5u7_431_type_answer: grammarTypeAnswer(
    '먼지가 많이 끼지 않도록 정기적으로 청소하도록 하세요',
    L(
      '먼지가 많이 쌓이지 않게 정기적으로 청소하라고 쓰세요.',
      'Chang ko‘p yig‘ilmasligi uchun muntazam tozalashni yozing.',
      'Write an instruction to clean regularly so that too much dust does not accumulate.',
      'Напишите инструкцию регулярно чистить устройство, чтобы не скапливалось много пыли.',
    ),
    'The listener should clean the device regularly to prevent excessive dust buildup.',
    ['청소하도록 하세요'],
    ['dorok-hada', 'dust', 'maintenance', 'type-answer'],
  ),

  s5u7_432_translate_builder: translateBuilder(
    L(
      '젖은 손으로 플러그를 만지지 말라고 안전 안내하기',
      'Ho‘l qo‘l bilan vilkaga tegmaslikni ayting.',
      'Give a safety instruction not to touch the plug with wet hands.',
      'Дайте инструкцию не трогать вилку мокрыми руками.',
    ),
    [
      '젖은 손으로',
      '플러그를',
      '만지지 않도록 하세요',
      '물을 뿌리세요',
      '시동을 거세요',
      '종이를 넣으세요',
    ],
    '젖은 손으로 플러그를 만지지 않도록 하세요',
    L(
      '감전 위험을 줄이기 위한 기본적인 전기 안전 안내예요.',
      'Elektr toki xavfini kamaytirish uchun asosiy xavfsizlik qoidasi.',
      'This is a basic electrical safety instruction.',
      'Это базовое правило электробезопасности.',
    ),
    ['dorok-hada', 'negative', 'safety'],
    5,
  ),

  s5u7_433_cloze_passage: clozePassage(
    '휴대폰은 물에 ___ . 노트북에는 음료수를 ___ .',
    ['빠뜨리지 않도록 하세요', '쏟지 않도록 하세요'],
    [
      '쏟지 않도록 하세요',
      '빠뜨리지 않도록 하세요',
      '쏟도록 하세요',
      '빠뜨리도록 하세요',
      '얼리도록 하세요',
    ],
    L(
      '전자 제품 고장의 흔한 원인을 예방하는 두 가지 주의 사항이에요.',
      'Elektron qurilmalar nosozligining ikki keng tarqalgan sababini oldini oladi.',
      'These are two precautions against common causes of electronic-device damage.',
      'Это две меры предосторожности против частых причин поломки электроники.',
    ),
    ['dorok-hada', 'negative', 'prevention'],
    5,
  ),

  s5u7_434_word_arrange: wordArrange(
    [
      '젖은 손으로',
      '플러그를 만지지 않도록 하세요',
      '물을 더 뿌리세요',
      '안전을 위해',
      '계속 만지세요',
      '종이를 넣으세요',
    ],
    '안전을 위해 젖은 손으로 플러그를 만지지 않도록 하세요',
    L(
      '전기 제품을 안전하게 사용하는 방법을 안내해요.',
      'Elektr jihozidan xavfsiz foydalanish usuli.',
      'It gives guidance for safely using electrical equipment.',
      'Это инструкция по безопасному использованию электроприбора.',
    ),
    ['dorok-hada', 'negative', 'safety'],
    5,
  ),

  s5u7_435_type_answer: grammarTypeAnswer(
    '안전을 위해 젖은 손으로 플러그를 만지지 않도록 하세요',
    L(
      '안전을 위해 젖은 손으로 플러그를 만지지 말라고 쓰세요.',
      'Xavfsizlik uchun ho‘l qo‘l bilan vilkaga tegmaslikni yozing.',
      'Write a safety instruction not to touch the plug with wet hands.',
      'Напишите правило безопасности: не трогать вилку мокрыми руками.',
    ),
    'For safety, the listener should avoid touching the plug with wet hands.',
    ['만지지 않도록 하세요'],
    ['dorok-hada', 'negative', 'safety', 'type-answer'],
  ),

  s5u7_436_reading_quiz: readingQuiz(
    '사용 설명서에는 제품을 떨어뜨리거나 물에 빠뜨리면 고장 날 수 있다고 적혀 있습니다.',
    '설명서에 들어갈 수 있는 가장 알맞은 주의 사항은 무엇이에요?',
    [
      '제품을 떨어뜨리거나 물에 빠뜨리지 않도록 하세요.',
      '제품을 일부러 떨어뜨리도록 하세요.',
      '제품을 물속에서 사용하도록 하세요.',
      '제품에 음료수를 쏟도록 하세요.',
    ],
    '제품을 떨어뜨리거나 물에 빠뜨리지 않도록 하세요.',
    L(
      '충격과 물 때문에 생길 수 있는 고장을 예방하는 안내예요.',
      'Zarba va suv sabab nosozlikni oldini olish ko‘rsatmasi.',
      'This prevents damage caused by impact or water.',
      'Это предупреждение помогает предотвратить повреждение от удара или воды.',
    ),
    ['dorok-hada', 'negative', 'manual'],
    5,
  ),

  s5u7_437_translate_builder: translateBuilder(
    L(
      '제품을 떨어뜨리거나 물에 빠뜨리지 않게 주의하라고 안내하기',
      'Qurilmani tushirib yoki suvga tushirib yubormaslikni ayting.',
      'Tell the user not to drop the product or get it into water.',
      'Скажите не ронять устройство и не допускать попадания в воду.',
    ),
    [
      '제품을',
      '떨어뜨리거나',
      '물에 빠뜨리지 않도록 하세요',
      '음료수를 쏟으세요',
      '전원을 계속 켜세요',
      '종이를 넣으세요',
    ],
    '제품을 떨어뜨리거나 물에 빠뜨리지 않도록 하세요',
    L(
      '제품에 충격이나 물 피해가 생기지 않게 예방해요.',
      'Qurilmani zarba va suv zararidan himoya qiladi.',
      'It helps prevent impact and water damage.',
      'Это помогает предотвратить повреждение от удара и воды.',
    ),
    ['dorok-hada', 'negative', 'prevention'],
    5,
  ),

  s5u7_438_fill_in_blank: fillBlank(
    '전자 제품을 바닥에 ___.',
    ['떨어뜨리지 않도록 하세요'],
    [
      '떨어뜨리지 않도록 하세요',
      '떨어뜨리도록 하세요',
      '쏟도록 하세요',
      '얼리도록 하세요',
      '걸리도록 하세요',
    ],
    L(
      '충격으로 인한 고장을 막기 위해 제품을 떨어뜨리지 않아야 해요.',
      'Zarba sabab nosozlikni oldini olish uchun qurilmani tushirmaslik kerak.',
      'Avoid dropping the device to prevent impact damage.',
      'Не роняйте устройство, чтобы избежать повреждения от удара.',
    ),
    ['dorok-hada', 'negative', 'drop'],
    5,
  ),

  s5u7_439_error_hunt: errorHunt(
    '전자 제품에 물이 들어가도록 하세요.',
    '들어가도록',
    ['들어가지 않도록', '들어가면서', '들어가려고', '들어가니까'],
    '들어가지 않도록',
    L(
      '고장을 예방하려면 물이 들어가는 행동이 아니라 들어가지 않게 해야 해요.',
      'Nosozlikni oldini olish uchun suv kirmasligi kerak.',
      'To prevent damage, the instruction must say to keep water from entering.',
      'Чтобы предотвратить поломку, нужно не допускать попадания воды.',
    ),
    ['dorok-hada', 'negative', 'meaning'],
    5,
  ),

  s5u7_440_word_arrange: wordArrange(
    [
      '`V-지 않도록 하다`는',
      '고장이나 사고가 생길 수 있는 행동을',
      '피하도록 안내할 때 유용해요',
      '항상 고장을 만들고',
      '문제를 일부러 일으키고',
      '과거 사실만 말해요',
    ],
    '`V-지 않도록 하다`는 고장이나 사고가 생길 수 있는 행동을 피하도록 안내할 때 유용해요',
    L(
      '부정형은 안전과 예방 안내에서 특히 자주 사용할 수 있어요.',
      'Inkor shakli ayniqsa xavfsizlik va profilaktika ko‘rsatmalarida foydali.',
      'The negative form is especially useful for safety and prevention instructions.',
      'Отрицательная форма особенно полезна в правилах безопасности и профилактики.',
    ),
    ['dorok-hada', 'negative', 'grammar-summary'],
    5,
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 3 · 사용 설명서대로 하도록 하세요
  // 절차·순서·점검 안내
  // ──────────────────────────────────────────────────────────

  s5u7_441_reading_quiz: readingQuiz(
    '기기에 문제가 생겼다고 바로 분해하면 더 큰 문제가 생길 수 있습니다. 먼저 제품의 사용 설명서를 읽고 안내된 방법을 따라야 합니다.',
    '가장 알맞은 안내는 무엇이에요?',
    [
      '먼저 사용 설명서를 확인하도록 하세요.',
      '바로 제품을 분해하도록 하세요.',
      '설명서는 읽지 않도록 하세요.',
      '문제가 없는 것처럼 사용하도록 하세요.',
    ],
    '먼저 사용 설명서를 확인하도록 하세요.',
    L(
      '수리 전에 설명서의 기본 안내를 먼저 확인해요.',
      'Ta’mirdan oldin qo‘llanmadagi asosiy ko‘rsatmalar tekshiriladi.',
      'Check the user manual before attempting repair.',
      'Перед ремонтом сначала проверьте инструкцию.',
    ),
    ['dorok-hada', 'manual'],
    5,
  ),

  s5u7_442_type_answer: grammarTypeAnswer(
    '문제가 생기면 먼저 사용 설명서를 확인하도록 하세요',
    L(
      '제품에 문제가 생기면 먼저 사용 설명서를 확인하라고 쓰세요.',
      'Qurilmada muammo bo‘lsa, avval qo‘llanmani tekshirishni yozing.',
      'Write an instruction to check the user manual first when a problem occurs.',
      'Напишите инструкцию сначала проверить руководство, если возникла проблема.',
    ),
    'When a problem occurs, the listener should check the user manual first.',
    ['확인하도록 하세요'],
    ['dorok-hada', 'manual', 'type-answer'],
  ),

  s5u7_443_translate_builder: translateBuilder(
    L(
      '제품을 분해하기 전에 사용 설명서를 먼저 확인하라고 말하기',
      'Qurilmani ochishdan oldin qo‘llanmani tekshirishni ayting.',
      'Tell the user to check the manual before taking the product apart.',
      'Скажите проверить инструкцию перед разборкой устройства.',
    ),
    [
      '사용 설명서를',
      '먼저 확인하도록 하세요',
      '제품을 분해하기 전에',
      '바로 분해하세요',
      '음료수를 쏟으세요',
      '수돗물을 트세요',
    ],
    '제품을 분해하기 전에 사용 설명서를 먼저 확인하도록 하세요',
    L(
      '임의로 제품을 분해하기 전에 공식 안내를 확인해요.',
      'Qurilmani o‘zboshimchalik bilan ochishdan oldin rasmiy qo‘llanma tekshiriladi.',
      'Check the official instructions before disassembling the device.',
      'Перед разборкой устройства проверьте официальную инструкцию.',
    ),
    ['dorok-hada', 'manual'],
    5,
  ),

  s5u7_444_fill_in_blank: fillBlank(
    '고장이라고 생각하기 전에 기본 연결 상태를 ___.',
    ['확인하도록 하세요'],
    [
      '확인하도록 하세요',
      '무시하도록 하세요',
      '버리도록 하세요',
      '쏟도록 하세요',
      '떨어뜨리도록 하세요',
    ],
    L(
      '전원, 플러그, 수도 같은 기본 연결 상태를 먼저 확인해요.',
      'Quvvat, vilka va suv kabi asosiy ulanishlar avval tekshiriladi.',
      'Check basic connections such as power, plug, and water first.',
      'Сначала проверьте основные подключения: питание, вилку и воду.',
    ),
    ['dorok-hada', 'troubleshooting'],
    5,
  ),

  s5u7_445_word_arrange: wordArrange(
    [
      '확인하도록 하세요',
      '계속 사용하도록 하세요',
      '먼저 전원과',
      '플러그 상태를',
      '음료수를 쏟으세요',
      '종이를 접으세요',
    ],
    '먼저 전원과 플러그 상태를 확인하도록 하세요',
    L(
      '기기가 작동하지 않을 때 기본적인 전원 연결부터 확인해요.',
      'Qurilma ishlamasa avval quvvat ulanishi tekshiriladi.',
      'Check the power and plug connection first when a device does not work.',
      'Если устройство не работает, сначала проверьте питание и вилку.',
    ),
    ['dorok-hada', 'troubleshooting'],
    5,
  ),

  s5u7_446_type_answer: grammarTypeAnswer(
    '먼저 전원과 플러그 상태를 확인하도록 하세요',
    L(
      '기기 문제를 확인할 때 먼저 전원과 플러그 상태를 확인하라고 쓰세요.',
      'Qurilma muammosida avval quvvat va vilkani tekshirishni yozing.',
      'Write an instruction to check the power and plug connection first.',
      'Напишите инструкцию сначала проверить питание и вилку.',
    ),
    'The listener should first check the device power and plug connection.',
    ['확인하도록 하세요'],
    ['dorok-hada', 'troubleshooting', 'type-answer'],
  ),

  s5u7_447_error_hunt: errorHunt(
    '수리를 신청하기 전에 사용 설명서를 확인하려고 하세요.',
    '확인하려고',
    ['확인하도록', '확인하면서', '확인하니까', '확인하지만'],
    '확인하도록',
    L(
      '해야 할 절차를 안내하는 문장이므로 `확인하도록 하세요`가 알맞아요.',
      'Kerakli tartibni ko‘rsatishda `확인하도록 하세요` ishlatiladi.',
      'Because this is a procedural instruction, 확인하도록 하세요 is appropriate.',
      'Так как это инструкция по процедуре, подходит 확인하도록 하세요.',
    ),
    ['dorok-hada', 'manual', 'grammar-contrast'],
    5,
  ),

  s5u7_448_translate_builder: translateBuilder(
    L(
      '전원이 안 들어오면 플러그가 빠져 있는지 확인하라고 안내하기',
      'Quvvat kelmasa, vilka chiqib ketganini tekshirishni ayting.',
      'If there is no power, tell the user to check whether the plug is disconnected.',
      'Если нет питания, скажите проверить, не вынута ли вилка.',
    ),
    [
      '플러그가 빠져 있는지',
      '확인하도록 하세요',
      '전원이 안 들어오면',
      '플러그를 버리세요',
      '수돗물을 트세요',
      '종이를 넣으세요',
    ],
    '전원이 안 들어오면 플러그가 빠져 있는지 확인하도록 하세요',
    L(
      '전기 공급 문제를 기본 연결부터 확인해요.',
      'Elektr ta’minoti muammosi asosiy ulanishdan tekshiriladi.',
      'Start checking a power problem from the basic connection.',
      'Проверку проблемы с питанием начинают с основного подключения.',
    ),
    ['dorok-hada', 'plug'],
    5,
  ),

  s5u7_449_reading_quiz: readingQuiz(
    '복사기가 멈췄을 때는 억지로 종이를 잡아당기지 말고 전원을 끈 뒤 걸린 종이의 위치를 확인하는 것이 좋습니다.',
    '가장 알맞은 안내는 무엇이에요?',
    [
      '전원을 끈 뒤 걸린 종이를 확인하도록 하세요.',
      '종이를 세게 잡아당기도록 하세요.',
      '전원을 계속 켜 두도록 하세요.',
      '복사기에 물을 넣도록 하세요.',
    ],
    '전원을 끈 뒤 걸린 종이를 확인하도록 하세요.',
    L(
      '복사기 종이 걸림을 안전하게 확인하는 순서예요.',
      'Qog‘oz tiqilishini xavfsiz tekshirish tartibi.',
      'This is a safe procedure for checking a paper jam.',
      'Это безопасная процедура проверки замятия бумаги.',
    ),
    ['dorok-hada', 'paper-jam'],
    5,
  ),

  s5u7_450_fill_in_blank: fillBlank(
    '복사기가 멈추면 전원을 끈 뒤 걸린 종이를 ___.',
    ['확인하도록 하세요'],
    [
      '확인하도록 하세요',
      '더 넣도록 하세요',
      '젖게 하도록 하세요',
      '찢도록 하세요',
      '무시하도록 하세요',
    ],
    L(
      '전원을 끄고 종이가 어디에 걸렸는지 확인해요.',
      'Qurilmani o‘chirib, qog‘oz qayerda tiqilganini tekshiring.',
      'Turn it off and check where the paper is jammed.',
      'Выключите устройство и проверьте, где застряла бумага.',
    ),
    ['dorok-hada', 'paper-jam'],
    5,
  ),

  s5u7_451_type_answer: grammarTypeAnswer(
    '복사기가 멈추면 전원을 끈 뒤 걸린 종이를 확인하도록 하세요',
    L(
      '복사기가 멈추면 전원을 끄고 걸린 종이를 확인하라고 쓰세요.',
      'Qurilma to‘xtasa, uni o‘chirib, tiqilgan qog‘ozni tekshirishni yozing.',
      'Write an instruction to turn off the copier and check the jammed paper if it stops.',
      'Напишите инструкцию выключить копир и проверить застрявшую бумагу, если он остановился.',
    ),
    'If the copier stops, the listener should turn it off and inspect the jammed paper.',
    ['확인하도록 하세요'],
    ['dorok-hada', 'paper-jam', 'type-answer'],
  ),

  s5u7_452_translate_builder: translateBuilder(
    L(
      '화면이 안 나오면 전원을 재시작한 뒤 다시 확인하라고 안내하기',
      'Ekran chiqmasa, qurilmani qayta ishga tushirib, yana tekshirishni ayting.',
      'If the screen does not appear, tell the user to restart the device and check again.',
      'Если экран не работает, скажите перезапустить устройство и проверить снова.',
    ),
    [
      '다시 확인하도록 하세요',
      '전원을 껐다가 다시 켠 뒤',
      '화면이 안 나오면',
      '계속 끄도록 하세요',
      '채소를 얼리세요',
      '종이를 넣으세요',
    ],
    '화면이 안 나오면 전원을 껐다가 다시 켠 뒤 다시 확인하도록 하세요',
    L(
      '재시작 후 화면 상태를 다시 확인하는 절차예요.',
      'Qayta ishga tushirgandan keyin ekran yana tekshiriladi.',
      'This procedure checks the screen again after restarting.',
      'После перезапуска состояние экрана проверяется снова.',
    ),
    ['dorok-hada', 'screen'],
    5,
  ),

  s5u7_453_cloze_passage: clozePassage(
    '전원이 안 들어오면 플러그 상태를 ___ . 화면이 안 나오면 기기를 재시작한 뒤 다시 ___ .',
    ['확인하도록 하세요', '확인하도록 하세요'],
    [
      '확인하도록 하세요',
      '확인하도록 하세요',
      '버리도록 하세요',
      '쏟도록 하세요',
      '떨어뜨리도록 하세요',
    ],
    L(
      '문제 종류에 따라 필요한 기본 점검 절차를 적용해요.',
      'Muammo turiga qarab kerakli tekshiruv tartibi qo‘llanadi.',
      'Apply the appropriate basic checks depending on the problem.',
      'В зависимости от проблемы выполняйте соответствующую базовую проверку.',
    ),
    ['dorok-hada', 'troubleshooting'],
    5,
  ),

  s5u7_454_word_arrange: wordArrange(
    [
      '사용 설명서의 순서대로',
      '하나씩 확인하도록 하세요',
      '문제가 생기면',
      '아무 순서 없이 만지세요',
      '제품을 흔드세요',
      '물을 부으세요',
    ],
    '문제가 생기면 사용 설명서의 순서대로 하나씩 확인하도록 하세요',
    L(
      '설명서의 절차에 따라 문제를 하나씩 확인해요.',
      'Qo‘llanmadagi tartib bo‘yicha muammo bosqichma-bosqich tekshiriladi.',
      'Check the problem step by step according to the manual.',
      'Проверяйте проблему поэтапно согласно инструкции.',
    ),
    ['dorok-hada', 'manual'],
    5,
  ),

  s5u7_455_type_answer: grammarTypeAnswer(
    '문제가 생기면 사용 설명서의 순서대로 하나씩 확인하도록 하세요',
    L(
      '문제가 발생하면 사용 설명서에 나온 순서대로 하나씩 확인하라고 쓰세요.',
      'Muammo bo‘lsa, qo‘llanmadagi tartib bilan birma-bir tekshirishni yozing.',
      'Write an instruction to check each step in the order shown in the manual.',
      'Напишите инструкцию проверять пункты по порядку, указанному в руководстве.',
    ),
    'When a problem occurs, the listener should check each item in the order shown in the manual.',
    ['확인하도록 하세요'],
    ['dorok-hada', 'manual', 'type-answer'],
  ),

  s5u7_456_reading_quiz: readingQuiz(
    '수리 센터에서는 고객이 제품을 가져오기 전에 중요한 자료를 준비하면 접수가 더 빠릅니다. 제품 모델명과 고장 증상을 미리 확인하는 것이 좋습니다.',
    '가장 알맞은 안내는 무엇이에요?',
    [
      '모델명과 고장 증상을 미리 확인하도록 하세요.',
      '제품 정보를 모두 지우도록 하세요.',
      '고장 증상을 말하지 않도록 하세요.',
      '제품을 일부러 더 고장 내도록 하세요.',
    ],
    '모델명과 고장 증상을 미리 확인하도록 하세요.',
    L(
      '수리 접수 전에 필요한 정보를 준비하면 절차가 빨라져요.',
      'Ta’mir arizasidan oldin kerakli ma’lumotni tayyorlash jarayonni tezlashtiradi.',
      'Preparing the necessary information makes the repair process faster.',
      'Подготовка нужной информации ускоряет оформление ремонта.',
    ),
    ['dorok-hada', 'repair-request'],
    5,
  ),

  s5u7_457_translate_builder: translateBuilder(
    L(
      '수리를 신청하기 전에 제품 모델명과 고장 증상을 확인하라고 안내하기',
      'Ta’mirga ariza berishdan oldin model va nosozlik belgilarini tekshirishni ayting.',
      'Tell the user to check the product model and malfunction symptoms before requesting repair.',
      'Скажите проверить модель устройства и симптомы перед заявкой на ремонт.',
    ),
    [
      '제품 모델명과 고장 증상을',
      '미리 확인하도록 하세요',
      '수리를 신청하기 전에',
      '증상을 숨기세요',
      '종이를 넣으세요',
      '수돗물을 트세요',
    ],
    '수리를 신청하기 전에 제품 모델명과 고장 증상을 미리 확인하도록 하세요',
    L(
      '수리 접수에 필요한 기본 정보를 미리 준비해요.',
      'Ta’mir arizasi uchun kerakli asosiy ma’lumot oldindan tayyorlanadi.',
      'Prepare the basic information needed for a repair request.',
      'Заранее подготовьте основные данные для заявки на ремонт.',
    ),
    ['dorok-hada', 'repair-request'],
    5,
  ),

  s5u7_458_fill_in_blank: fillBlank(
    '수리 신청 전에 제품의 모델명과 고장 증상을 ___.',
    ['확인하도록 하세요'],
    [
      '확인하도록 하세요',
      '숨기도록 하세요',
      '지우도록 하세요',
      '바꾸도록 하세요',
      '무시하도록 하세요',
    ],
    L(
      '정확한 수리 접수를 위해 제품 정보를 미리 확인해요.',
      'Aniq ta’mir arizasi uchun qurilma ma’lumoti oldindan tekshiriladi.',
      'Check product information in advance for an accurate repair request.',
      'Заранее проверьте данные устройства для точного оформления ремонта.',
    ),
    ['dorok-hada', 'repair-request'],
    5,
  ),

  s5u7_459_error_hunt: errorHunt(
    '사용 설명서의 순서대로 확인하면서 하세요.',
    '확인하면서',
    ['확인하도록', '확인하려고', '확인하니까', '확인하지만'],
    '확인하도록',
    L(
      '실행해야 할 절차를 지시하므로 `확인하도록 하세요`가 자연스러워요.',
      'Bajarilishi kerak bo‘lgan tartib uchun `확인하도록 하세요` tabiiy.',
      'Because this is a required procedure, 확인하도록 하세요 is natural.',
      'Поскольку это обязательная процедура, естественно 확인하도록 하세요.',
    ),
    ['dorok-hada', 'grammar-contrast'],
    5,
  ),

  s5u7_460_word_arrange: wordArrange(
    [
      '문제를 더 정확하게 찾을 수 있어요',
      '기본적인 확인 절차를',
      '순서대로 하도록 하면',
      '아무것도 확인하지 않고',
      '제품을 버리면',
      '증상을 숨기면',
    ],
    '기본적인 확인 절차를 순서대로 하도록 하면 문제를 더 정확하게 찾을 수 있어요',
    L(
      '순서 있는 점검이 문제 원인을 찾는 데 도움이 돼요.',
      'Tartibli tekshiruv sababni aniqlashga yordam beradi.',
      'A systematic check helps identify the cause more accurately.',
      'Последовательная проверка помогает точнее определить причину.',
    ),
    ['dorok-hada', 'learning-value'],
    5,
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 4 · 수리 기사에게 이렇게 해 달라고 해요
  // 다른 사람에게 행동을 하게 하기
  // ──────────────────────────────────────────────────────────

  s5u7_461_reading_quiz: readingQuiz(
    '회사 복사기가 계속 멈춥니다. 담당자는 수리 기사에게 오늘 안에 복사기를 확인해 달라고 요청했습니다.',
    '상황을 `-도록 하다`로 가장 자연스럽게 표현한 것은 무엇이에요?',
    [
      '담당자가 수리 기사에게 오늘 복사기를 확인하도록 했어요.',
      '담당자가 복사기를 확인하면서 수리 기사였어요.',
      '담당자가 수리 기사를 확인하려고 했어요.',
      '담당자가 복사기를 확인했는데도 기사였어요.',
    ],
    '담당자가 수리 기사에게 오늘 복사기를 확인하도록 했어요.',
    L(
      '담당자가 수리 기사에게 특정 행동을 하게 한 상황이에요.',
      'Mas’ul shaxs ustaga ma’lum ishni bajarishni topshirdi.',
      'The person in charge had the technician inspect the copier.',
      'Ответственный поручил мастеру проверить копировальный аппарат.',
    ),
    ['dorok-hada', 'causative', 'technician'],
    5,
  ),

  s5u7_462_type_answer: grammarTypeAnswer(
    '담당자가 수리 기사에게 복사기를 확인하도록 했어요',
    L(
      '담당자가 수리 기사에게 복사기를 확인하게 했다고 `-도록 하다`로 쓰세요.',
      'Mas’ul shaxs ustaga qurilmani tekshirishni topshirganini `-도록 하다` bilan yozing.',
      'Using -도록 하다, write that the person in charge had the technician inspect the copier.',
      'Используя -도록 하다, напишите, что ответственный поручил мастеру проверить копир.',
    ),
    'The person in charge instructed the repair technician to inspect the copier.',
    ['확인하도록 했어요'],
    ['dorok-hada', 'causative', 'technician', 'type-answer'],
  ),

  s5u7_463_translate_builder: translateBuilder(
    L(
      '담당자가 수리 기사에게 복사기를 확인하게 했다고 표현하기',
      'Mas’ul shaxs ustaga nusxa ko‘chirish qurilmasini tekshirtirganini ayting.',
      'Say that the person in charge had the repair technician inspect the copier.',
      'Скажите, что ответственный поручил мастеру проверить копировальный аппарат.',
    ),
    [
      '복사기를 확인하도록 했어요',
      '담당자가',
      '종이를 버렸어요',
      '수리 기사에게',
      '물을 부었어요',
      '시동을 걸었어요',
    ],
    '담당자가 수리 기사에게 복사기를 확인하도록 했어요',
    L(
      '다른 사람에게 필요한 점검을 하게 한 상황이에요.',
      'Boshqa kishiga kerakli tekshiruvni bajarish topshirildi.',
      'Someone was instructed to carry out the necessary inspection.',
      'Другому человеку поручили выполнить необходимую проверку.',
    ),
    ['dorok-hada', 'causative'],
    5,
  ),

  s5u7_464_fill_in_blank: fillBlank(
    '담당자가 수리 기사에게 오늘 제품을 ___.',
    ['점검하도록 했어요'],
    [
      '점검하도록 했어요',
      '고장 내도록 했어요',
      '떨어뜨리도록 했어요',
      '쏟도록 했어요',
      '버리도록 했어요',
    ],
    L(
      '담당자가 수리 기사에게 제품 점검을 맡겼어요.',
      'Mas’ul shaxs ustaga qurilmani tekshirishni topshirdi.',
      'The person in charge assigned the technician to inspect the product.',
      'Ответственный поручил мастеру проверить устройство.',
    ),
    ['dorok-hada', 'causative'],
    5,
  ),

  s5u7_465_word_arrange: wordArrange(
    [
      '고장 난 부품을',
      '교체하도록 했어요',
      '수리 기사가',
      '그대로 두도록 했어요',
      '음료수를 쏟도록 했어요',
      '종이를 넣도록 했어요',
    ],
    '수리 기사가 고장 난 부품을 교체하도록 했어요',
    L(
      '고장 난 부품을 새 부품으로 바꾸게 한 상황이에요.',
      'Buzilgan qismni yangisiga almashtirish topshirildi.',
      'The broken part was ordered to be replaced.',
      'Было поручено заменить неисправную деталь.',
    ),
    ['dorok-hada', 'replacement'],
    5,
  ),

  s5u7_466_type_answer: grammarTypeAnswer(
    '수리 기사가 고장 난 부품을 교체하도록 했어요',
    L(
      '수리 기사가 고장 난 부품을 새것으로 바꾸게 했다고 쓰세요.',
      'Usta buzilgan qismni yangisiga almashtirishni topshirganini yozing.',
      'Write that the repair technician had the broken part replaced.',
      'Напишите, что мастер распорядился заменить неисправную деталь.',
    ),
    'The repair technician arranged for the broken part to be replaced.',
    ['교체하도록 했어요'],
    ['dorok-hada', 'replacement', 'type-answer'],
  ),

  s5u7_467_error_hunt: errorHunt(
    '담당자가 기사에게 제품을 점검하려고 했어요.',
    '점검하려고',
    ['점검하도록', '점검하면서', '점검하니까', '점검하지만'],
    '점검하도록',
    L(
      '다른 사람에게 점검을 하게 한 의미이므로 `점검하도록 했어요`가 맞아요.',
      'Boshqa odamga tekshiruvni bajartirish uchun `점검하도록 했어요` kerak.',
      'Because someone else was instructed to inspect it, use 점검하도록 했어요.',
      'Так как другому человеку поручили проверку, используется 점검하도록 했어요.',
    ),
    ['dorok-hada', 'causative', 'grammar-contrast'],
    5,
  ),

  s5u7_468_translate_builder: translateBuilder(
    L(
      '수리 기사가 직원에게 고장 접수를 먼저 처리하게 했다고 말하기',
      'Usta xodimga avval ta’mir arizasini rasmiylashtirishni topshirganini ayting.',
      'Say that the technician had the employee process the repair request first.',
      'Скажите, что мастер поручил сотруднику сначала оформить заявку на ремонт.',
    ),
    [
      '수리 기사가',
      '먼저 접수하도록 했어요',
      '직원에게',
      '접수를 취소했어요',
      '제품을 버렸어요',
      '물을 쏟았어요',
    ],
    '수리 기사가 직원에게 먼저 접수하도록 했어요',
    L(
      '수리 절차에서 접수를 먼저 처리하게 한 상황이에요.',
      'Ta’mir jarayonida avval arizani rasmiylashtirish topshirildi.',
      'The repair request was instructed to be processed first.',
      'Было поручено сначала оформить заявку на ремонт.',
    ),
    ['dorok-hada', 'repair-request'],
    5,
  ),

  s5u7_469_reading_quiz: readingQuiz(
    '고객이 가져온 휴대폰은 액정이 심하게 손상되어 있었습니다. 담당 기사는 부품을 주문한 뒤 새 액정으로 바꾸게 했습니다.',
    '가장 자연스러운 문장은 무엇이에요?',
    [
      '수리 기사가 새 액정으로 교체하도록 했어요.',
      '수리 기사가 액정을 떨어뜨리도록 했어요.',
      '수리 기사가 액정을 물에 넣도록 했어요.',
      '수리 기사가 고장을 그대로 두도록 했어요.',
    ],
    '수리 기사가 새 액정으로 교체하도록 했어요.',
    L(
      '손상된 액정을 새로운 부품으로 바꾸게 한 상황이에요.',
      'Buzilgan displeyni yangisiga almashtirish topshirildi.',
      'The damaged display was ordered to be replaced with a new one.',
      'Было поручено заменить повреждённый дисплей новым.',
    ),
    ['dorok-hada', 'replacement'],
    5,
  ),

  s5u7_470_fill_in_blank: fillBlank(
    '수리 기사가 손상된 액정을 새것으로 ___.',
    ['교체하도록 했어요'],
    [
      '교체하도록 했어요',
      '떨어뜨리도록 했어요',
      '쏟도록 했어요',
      '얼리도록 했어요',
      '무시하도록 했어요',
    ],
    L(
      '손상된 부품을 새 부품으로 바꾸게 했어요.',
      'Buzilgan qismni yangisiga almashtirish topshirildi.',
      'The damaged part was ordered to be replaced.',
      'Было поручено заменить повреждённую деталь.',
    ),
    ['dorok-hada', 'replacement'],
    5,
  ),

  s5u7_471_type_answer: grammarTypeAnswer(
    '수리 기사가 손상된 액정을 새것으로 교체하도록 했어요',
    L(
      '수리 기사가 손상된 액정을 새 부품으로 바꾸게 했다고 쓰세요.',
      'Usta buzilgan displeyni yangi qismga almashtirishni topshirganini yozing.',
      'Write that the technician had the damaged display replaced with a new one.',
      'Напишите, что мастер распорядился заменить повреждённый дисплей новым.',
    ),
    'The technician arranged for the damaged display to be replaced with a new one.',
    ['교체하도록 했어요'],
    ['dorok-hada', 'replacement', 'type-answer'],
  ),

  s5u7_472_translate_builder: translateBuilder(
    L(
      '담당자가 직원에게 고객의 고장 증상을 기록하게 했다고 표현하기',
      'Mas’ul shaxs xodimga mijozning nosozlik belgilarini yozib olishni topshirganini ayting.',
      'Say that the person in charge had the employee record the customer’s malfunction symptoms.',
      'Скажите, что ответственный поручил сотруднику записать симптомы неисправности клиента.',
    ),
    [
      '고장 증상을 기록하도록 했어요',
      '담당자가',
      '직원에게',
      '증상을 지우도록 했어요',
      '제품을 버렸어요',
      '종이를 넣었어요',
    ],
    '담당자가 직원에게 고장 증상을 기록하도록 했어요',
    L(
      '수리 과정에 필요한 정보를 기록하게 한 상황이에요.',
      'Ta’mir uchun kerakli ma’lumotni yozib olish topshirildi.',
      'The employee was instructed to record information needed for the repair.',
      'Сотруднику поручили записать информацию, необходимую для ремонта.',
    ),
    ['dorok-hada', 'repair-information'],
    5,
  ),

  s5u7_473_cloze_passage: clozePassage(
    '담당자가 기사에게 제품을 ___ . 그리고 직원에게 고객의 증상을 ___ .',
    ['점검하도록 했어요', '기록하도록 했어요'],
    [
      '기록하도록 했어요',
      '점검하도록 했어요',
      '버리도록 했어요',
      '쏟도록 했어요',
      '떨어뜨리도록 했어요',
    ],
    L(
      '수리 과정에서 사람마다 맡아야 할 행동을 지시해요.',
      'Ta’mir jarayonida har bir kishiga kerakli vazifa topshiriladi.',
      'Different people are assigned the necessary tasks in the repair process.',
      'В процессе ремонта разным людям поручаются необходимые действия.',
    ),
    ['dorok-hada', 'causative'],
    5,
  ),

  s5u7_474_word_arrange: wordArrange(
    [
      '직원에게',
      '기록하도록 했어요',
      '고객의 고장 증상을',
      '기록을 지우도록 했어요',
      '제품을 떨어뜨렸어요',
      '수돗물을 틀었어요',
    ],
    '직원에게 고객의 고장 증상을 기록하도록 했어요',
    L(
      '수리 접수에 필요한 증상 정보를 직원이 기록하게 했어요.',
      'Ta’mir arizasi uchun belgilarni xodim yozib oldi.',
      'The employee was instructed to record the malfunction symptoms.',
      'Сотруднику поручили записать симптомы неисправности.',
    ),
    ['dorok-hada', 'repair-information'],
    5,
  ),

  s5u7_475_type_answer: grammarTypeAnswer(
    '직원에게 고객의 고장 증상을 기록하도록 했어요',
    L(
      '직원에게 고객의 고장 증상을 적게 했다고 `-도록 하다`를 사용해 쓰세요.',
      'Xodimga mijozning nosozlik belgilarini yozdirganini `-도록 하다` bilan yozing.',
      'Using -도록 하다, write that the employee was instructed to record the customer’s symptoms.',
      'Используя -도록 하다, напишите, что сотруднику поручили записать симптомы клиента.',
    ),
    'The employee was instructed to record the customer’s malfunction symptoms.',
    ['기록하도록 했어요'],
    ['dorok-hada', 'repair-information', 'type-answer'],
  ),

  s5u7_476_reading_quiz: readingQuiz(
    '수리 부품이 아직 도착하지 않았습니다. 담당자는 직원에게 고객에게 상황을 설명하고 부품이 올 때까지 기다려 달라고 안내하게 했습니다.',
    '담당자가 직원에게 시킨 일은 무엇이에요?',
    [
      '고객에게 상황을 설명하도록 했어요.',
      '제품을 버리도록 했어요.',
      '고객의 전화를 끊도록 했어요.',
      '수리 신청을 삭제하도록 했어요.',
    ],
    '고객에게 상황을 설명하도록 했어요.',
    L(
      '직원이 고객에게 현재 수리 상황을 설명하게 했어요.',
      'Xodim mijozga hozirgi ta’mir holatini tushuntirishi kerak edi.',
      'The employee was instructed to explain the repair status to the customer.',
      'Сотруднику поручили объяснить клиенту текущий статус ремонта.',
    ),
    ['dorok-hada', 'service'],
    5,
  ),

  s5u7_477_translate_builder: translateBuilder(
    L(
      '담당자가 직원에게 고객에게 수리 상황을 설명하게 했다고 말하기',
      'Mas’ul shaxs xodimga mijozga ta’mir holatini tushuntirishni topshirganini ayting.',
      'Say that the person in charge had the employee explain the repair status to the customer.',
      'Скажите, что ответственный поручил сотруднику объяснить клиенту статус ремонта.',
    ),
    [
      '수리 상황을 설명하도록 했어요',
      '담당자가',
      '직원에게',
      '고객에게',
      '접수를 지우도록 했어요',
      '제품을 떨어뜨렸어요',
    ],
    '담당자가 직원에게 고객에게 수리 상황을 설명하도록 했어요',
    L(
      '고객이 현재 진행 상황을 알 수 있게 직원에게 설명을 맡겼어요.',
      'Mijoz holatni bilishi uchun xodimga tushuntirish topshirildi.',
      'The employee was assigned to explain the current repair status to the customer.',
      'Сотруднику поручили объяснить клиенту текущий статус ремонта.',
    ),
    ['dorok-hada', 'service'],
    5,
  ),

  s5u7_478_fill_in_blank: fillBlank(
    '담당자가 직원에게 고객에게 수리 상황을 ___.',
    ['설명하도록 했어요'],
    [
      '설명하도록 했어요',
      '숨기도록 했어요',
      '지우도록 했어요',
      '쏟도록 했어요',
      '떨어뜨리도록 했어요',
    ],
    L(
      '직원이 고객에게 수리 진행 상황을 알려 주게 했어요.',
      'Xodim mijozga ta’mir jarayonini tushuntirishi kerak edi.',
      'The employee was instructed to explain the repair progress.',
      'Сотруднику поручили объяснить ход ремонта.',
    ),
    ['dorok-hada', 'service'],
    5,
  ),

  s5u7_479_error_hunt: errorHunt(
    '담당자가 기사에게 제품을 확인하려고 했어요.',
    '확인하려고',
    ['확인하도록', '확인하면서', '확인하니까', '확인하지만'],
    '확인하도록',
    L(
      '담당자가 직접 확인하려는 것이 아니라 기사에게 확인을 시킨 상황이에요.',
      'Mas’ul shaxs o‘zi emas, ustaga tekshirishni topshirgan.',
      'The person in charge is instructing the technician, not intending to inspect it personally.',
      'Ответственный поручает проверку мастеру, а не собирается проверять сам.',
    ),
    ['dorok-hada', 'causative', 'meaning'],
    5,
  ),

  s5u7_480_word_arrange: wordArrange(
    [
      '`V-도록 하다`는',
      '다른 사람이',
      '필요한 행동을 하게 하는 뜻으로도',
      '사용할 수 있어요',
      '과거를 지우고',
      '명사만 설명해요',
    ],
    '`V-도록 하다`는 다른 사람이 필요한 행동을 하게 하는 뜻으로도 사용할 수 있어요',
    L(
      '직접 행동하는 것뿐 아니라 다른 사람에게 행동을 맡기는 상황에도 사용할 수 있어요.',
      'Bu grammatika boshqa kishiga vazifa topshirishda ham ishlatilishi mumkin.',
      'The grammar can also be used when having another person carry out an action.',
      'Грамматика также используется, когда действие поручается другому человеку.',
    ),
    ['dorok-hada', 'causative', 'grammar-summary'],
    5,
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 5 · 고장부터 수리까지 안내해요
  // Unit 7 통합: 증상 → 대처 → 예방 → 수리 신청
  // ──────────────────────────────────────────────────────────

  s5u7_481_reading_quiz: readingQuiz(
    '휴대폰 통화가 계속 끊깁니다. 전원을 껐다가 다시 켜 봐도 문제가 같습니다. 이런 경우에는 같은 방법만 반복하지 말고 수리 센터에 연락해 제품을 점검받는 것이 좋습니다.',
    '가장 적절한 마지막 안내는 무엇이에요?',
    [
      '수리 센터에 연락해서 점검을 받도록 하세요.',
      '계속 전원만 켰다 끄도록 하세요.',
      '휴대폰을 물에 빠뜨리도록 하세요.',
      '문제가 없는 것처럼 사용하도록 하세요.',
    ],
    '수리 센터에 연락해서 점검을 받도록 하세요.',
    L(
      '기본 대처로 해결되지 않은 문제는 전문 점검으로 이어져야 해요.',
      'Oddiy choralar yordam bermasa professional tekshiruv kerak.',
      'An unresolved problem should move on to professional inspection.',
      'Если базовые действия не помогли, нужна профессиональная диагностика.',
    ),
    ['dorok-hada', 'repair-flow'],
    5,
  ),

  s5u7_482_type_answer: grammarTypeAnswer(
    '문제가 계속되면 수리 센터에 연락해서 점검을 받도록 하세요',
    L(
      '문제가 계속될 때 수리 센터에 연락해 점검을 받으라고 쓰세요.',
      'Muammo davom etsa, servis markaziga murojaat qilib tekshiruvdan o‘tishni yozing.',
      'Write an instruction to contact a repair center and get the device inspected if the problem continues.',
      'Напишите инструкцию обратиться в сервисный центр и пройти диагностику, если проблема продолжается.',
    ),
    'If the problem persists, the listener should contact a repair center and have the device inspected.',
    ['받도록 하세요'],
    ['dorok-hada', 'repair-flow', 'type-answer'],
  ),

  s5u7_483_translate_builder: translateBuilder(
    L(
      '재시작해도 문제가 계속되면 수리 센터에서 점검받으라고 안내하기',
      'Qayta yoqilgandan keyin ham muammo davom etsa, servisda tekshirtirishni ayting.',
      'If the problem continues after restarting, tell the user to get it inspected at a repair center.',
      'Если проблема остаётся после перезапуска, скажите пройти диагностику в сервисном центре.',
    ),
    [
      '수리 센터에서',
      '점검을 받도록 하세요',
      '재시작해도 문제가 계속되면',
      '계속 사용하세요',
      '음료수를 쏟으세요',
      '종이를 넣으세요',
    ],
    '재시작해도 문제가 계속되면 수리 센터에서 점검을 받도록 하세요',
    L(
      '직접 해결 단계에서 전문 수리 단계로 넘어가는 기준이에요.',
      'Bu mustaqil tekshiruvdan professional ta’mirga o‘tish mezoni.',
      'This marks the point where self-troubleshooting should move to professional service.',
      'Это момент перехода от самостоятельной проверки к профессиональному ремонту.',
    ),
    ['dorok-hada', 'repair-flow'],
    5,
  ),

  s5u7_484_fill_in_blank: fillBlank(
    '재시작해도 문제가 계속되면 전문 점검을 ___.',
    ['받도록 하세요'],
    [
      '받도록 하세요',
      '피하도록 하세요',
      '취소하도록 하세요',
      '버리도록 하세요',
      '숨기도록 하세요',
    ],
    L(
      '기본 조치가 실패하면 전문 점검을 받아야 해요.',
      'Oddiy choralar ishlamasa professional tekshiruv kerak.',
      'Get a professional inspection when basic troubleshooting fails.',
      'Если базовые действия не помогли, пройдите профессиональную диагностику.',
    ),
    ['dorok-hada', 'repair-flow'],
    5,
  ),

  s5u7_485_word_arrange: wordArrange(
    [
      '미리 기록하도록 하세요',
      '고장 증상이',
      '언제부터 시작됐는지',
      '증상을 숨기도록 하세요',
      '제품을 버리도록 하세요',
      '종이를 넣으세요',
    ],
    '고장 증상이 언제부터 시작됐는지 미리 기록하도록 하세요',
    L(
      '수리 신청 전에 증상이 시작된 시점을 기록해 두면 도움이 돼요.',
      'Ta’mirdan oldin belgi qachon boshlanganini yozib qo‘yish foydali.',
      'Recording when the symptoms started helps with a repair request.',
      'Полезно заранее записать, когда появились симптомы.',
    ),
    ['dorok-hada', 'repair-information'],
    5,
  ),

  s5u7_486_type_answer: grammarTypeAnswer(
    '고장 증상이 언제부터 시작됐는지 미리 기록하도록 하세요',
    L(
      '수리 전에 고장 증상이 언제 시작됐는지 기록해 두라고 쓰세요.',
      'Ta’mirdan oldin nosozlik qachon boshlanganini yozib qo‘yishni yozing.',
      'Write an instruction to record when the malfunction symptoms started.',
      'Напишите инструкцию заранее записать, когда появились симптомы неисправности.',
    ),
    'The listener should record in advance when the malfunction symptoms began.',
    ['기록하도록 하세요'],
    ['dorok-hada', 'repair-information', 'type-answer'],
  ),

  s5u7_487_error_hunt: errorHunt(
    '수리 신청 전에 증상을 숨기도록 하세요.',
    '숨기도록',
    ['기록하도록', '확인하도록', '설명하도록', '지우도록'],
    '기록하도록',
    L(
      '수리에 필요한 정보는 숨기는 것이 아니라 기록해 두는 것이 좋아요.',
      'Ta’mir uchun ma’lumotni yashirish emas, yozib qo‘yish kerak.',
      'Repair information should be recorded, not hidden.',
      'Информацию для ремонта нужно записывать, а не скрывать.',
    ),
    ['dorok-hada', 'repair-information', 'meaning'],
    5,
  ),

  s5u7_488_translate_builder: translateBuilder(
    L(
      '수리 센터에 고장 증상과 이미 해 본 방법을 정확히 설명하라고 안내하기',
      'Servis markaziga nosozlik va sinab ko‘rilgan usullarni aniq tushuntirishni ayting.',
      'Tell the user to clearly explain the symptoms and what they have already tried to the repair center.',
      'Скажите точно объяснить сервисному центру симптомы и уже предпринятые действия.',
    ),
    [
      '정확히 설명하도록 하세요',
      '수리 센터에',
      '고장 증상과 이미 해 본 방법을',
      '증상을 숨기세요',
      '제품을 떨어뜨리세요',
      '물을 부으세요',
    ],
    '수리 센터에 고장 증상과 이미 해 본 방법을 정확히 설명하도록 하세요',
    L(
      '수리 기사에게 정확한 정보를 주면 원인을 찾는 데 도움이 돼요.',
      'Ustaga aniq ma’lumot berish sababni topishga yordam beradi.',
      'Accurate information helps the technician diagnose the problem.',
      'Точная информация помогает мастеру определить причину.',
    ),
    ['dorok-hada', 'repair-information'],
    5,
  ),

  s5u7_489_reading_quiz: readingQuiz(
    '수리 센터에 연락할 때 “고장 났어요”라고만 말하면 정확한 원인을 파악하기 어렵습니다. 언제부터, 어떤 증상이 있었는지와 무엇을 해 봤는지 함께 말하는 것이 좋습니다.',
    '가장 알맞은 안내는 무엇이에요?',
    [
      '고장 증상과 시도한 방법을 구체적으로 설명하도록 하세요.',
      '고장 증상을 숨기도록 하세요.',
      '제품 이름만 말하도록 하세요.',
      '문제가 없다고 말하도록 하세요.',
    ],
    '고장 증상과 시도한 방법을 구체적으로 설명하도록 하세요.',
    L(
      '정확한 진단을 위해 고장 정보와 이미 한 대처를 모두 전달해요.',
      'Aniq tashxis uchun nosozlik va bajarilgan choralarni aytish kerak.',
      'Explain both the malfunction and prior troubleshooting for an accurate diagnosis.',
      'Для точной диагностики сообщите и симптомы, и уже выполненные действия.',
    ),
    ['dorok-hada', 'repair-information'],
    5,
  ),

  s5u7_490_fill_in_blank: fillBlank(
    '수리 기사에게 고장 증상을 구체적으로 ___.',
    ['설명하도록 하세요'],
    [
      '설명하도록 하세요',
      '숨기도록 하세요',
      '지우도록 하세요',
      '바꾸도록 하세요',
      '잊도록 하세요',
    ],
    L(
      '수리 기사에게 문제가 어떻게 나타나는지 정확히 알려 줘요.',
      'Ustaga muammo qanday ko‘rinishini aniq tushuntiring.',
      'Clearly explain how the problem appears to the technician.',
      'Точно объясните мастеру, как проявляется проблема.',
    ),
    ['dorok-hada', 'repair-information'],
    5,
  ),

  s5u7_491_type_answer: grammarTypeAnswer(
    '수리 기사에게 고장 증상을 구체적으로 설명하도록 하세요',
    L(
      '수리 기사에게 제품의 고장 증상을 자세히 설명하라고 쓰세요.',
      'Ustaga qurilmaning nosozlik belgilarini batafsil tushuntirishni yozing.',
      'Write an instruction to explain the malfunction symptoms in detail to the technician.',
      'Напишите инструкцию подробно объяснить мастеру симптомы неисправности.',
    ),
    'The listener should explain the malfunction symptoms in detail to the repair technician.',
    ['설명하도록 하세요'],
    ['dorok-hada', 'repair-information', 'type-answer'],
  ),

  s5u7_492_translate_builder: translateBuilder(
    L(
      '수리 후 같은 문제가 다시 생기면 바로 수리 센터에 연락하라고 안내하기',
      'Ta’mirdan keyin bir xil muammo qaytsa, darhol servisga murojaat qilishni ayting.',
      'If the same problem returns after repair, tell the user to contact the repair center immediately.',
      'Если после ремонта проблема повторится, скажите сразу обратиться в сервисный центр.',
    ),
    [
      '바로 수리 센터에',
      '연락하도록 하세요',
      '수리 후 같은 문제가 다시 생기면',
      '계속 사용하세요',
      '제품을 떨어뜨리세요',
      '물을 부으세요',
    ],
    '수리 후 같은 문제가 다시 생기면 바로 수리 센터에 연락하도록 하세요',
    L(
      '수리 후 재발한 고장은 바로 서비스 센터에 알려야 해요.',
      'Ta’mirdan keyin qaytgan nosozlik haqida darhol servisga aytish kerak.',
      'A recurring problem after repair should be reported promptly.',
      'О повторной неисправности после ремонта нужно сразу сообщить в сервис.',
    ),
    ['dorok-hada', 'repair-history'],
    5,
  ),

  s5u7_493_cloze_passage: clozePassage(
    '수리 전에 고장 증상을 ___ . 수리 후 같은 문제가 다시 생기면 바로 수리 센터에 ___ .',
    ['기록하도록 하세요', '연락하도록 하세요'],
    [
      '연락하도록 하세요',
      '기록하도록 하세요',
      '숨기도록 하세요',
      '버리도록 하세요',
      '쏟도록 하세요',
    ],
    L(
      '수리 전에는 정보를 준비하고 수리 후 재발하면 바로 연락해요.',
      'Ta’mirdan oldin ma’lumot tayyorlanadi, qaytsa darhol servisga murojaat qilinadi.',
      'Prepare information before repair and contact the center promptly if the problem returns.',
      'До ремонта подготовьте информацию, а при повторении проблемы сразу свяжитесь с сервисом.',
    ),
    ['dorok-hada', 'repair-flow'],
    5,
  ),

  s5u7_494_word_arrange: wordArrange(
    [
      '같은 문제가 다시 생기면',
      '바로 연락하도록 하세요',
      '수리 센터에',
      '계속 사용하도록 하세요',
      '증상을 숨기도록 하세요',
      '제품을 떨어뜨리세요',
    ],
    '같은 문제가 다시 생기면 수리 센터에 바로 연락하도록 하세요',
    L(
      '수리 후 문제가 재발했을 때의 적절한 대응이에요.',
      'Ta’mirdan keyingi qayta nosozlikka to‘g‘ri javob.',
      'This is the appropriate response when a problem returns after repair.',
      'Это правильное действие при повторении проблемы после ремонта.',
    ),
    ['dorok-hada', 'repair-history'],
    5,
  ),

  s5u7_495_type_answer: grammarTypeAnswer(
    '같은 문제가 다시 생기면 수리 센터에 바로 연락하도록 하세요',
    L(
      '같은 고장이 다시 발생하면 바로 수리 센터에 연락하라고 쓰세요.',
      'Bir xil nosozlik qaytsa, darhol servis markaziga murojaat qilishni yozing.',
      'Write an instruction to contact the repair center immediately if the same problem returns.',
      'Напишите инструкцию сразу связаться с сервисным центром, если та же проблема повторится.',
    ),
    'If the same malfunction returns, the listener should contact the repair center immediately.',
    ['연락하도록 하세요'],
    ['dorok-hada', 'repair-history', 'type-answer'],
  ),

  s5u7_496_reading_quiz: readingQuiz(
    '전자 제품을 오래 사용하려면 문제가 생겼을 때만 관리하는 것이 아니라 평소에도 먼지를 제거하고 물이나 충격을 피해야 합니다.',
    '가장 알맞은 관리 원칙은 무엇이에요?',
    [
      '평소에도 제품을 안전하게 관리하도록 하세요.',
      '고장 날 때까지 아무것도 하지 않도록 하세요.',
      '제품을 자주 떨어뜨리도록 하세요.',
      '전자 제품에 물을 가까이 두도록 하세요.',
    ],
    '평소에도 제품을 안전하게 관리하도록 하세요.',
    L(
      '고장 예방을 위해 평소 관리 습관도 중요해요.',
      'Nosozlikni oldini olish uchun kundalik parvarish ham muhim.',
      'Regular maintenance is important for preventing malfunctions.',
      'Регулярный уход важен для предотвращения неисправностей.',
    ),
    ['dorok-hada', 'maintenance'],
    5,
  ),

  s5u7_497_translate_builder: translateBuilder(
    L(
      '제품을 오래 사용하려면 정기적으로 점검하고 안전하게 관리하라고 안내하기',
      'Qurilmani uzoq ishlatish uchun muntazam tekshirish va xavfsiz saqlashni ayting.',
      'Tell the user to inspect and maintain the product regularly so it lasts longer.',
      'Скажите регулярно проверять устройство и безопасно ухаживать за ним, чтобы оно служило дольше.',
    ),
    [
      '정기적으로 점검하고',
      '안전하게 관리하도록 하세요',
      '제품을 오래 사용하려면',
      '일부러 떨어뜨리세요',
      '물을 부으세요',
      '먼지를 더 넣으세요',
    ],
    '제품을 오래 사용하려면 정기적으로 점검하고 안전하게 관리하도록 하세요',
    L(
      '정기적인 점검과 안전한 사용이 고장 예방에 도움이 돼요.',
      'Muntazam tekshiruv va xavfsiz foydalanish nosozlikni oldini oladi.',
      'Regular inspection and safe use help prevent breakdowns.',
      'Регулярная проверка и безопасное использование помогают предотвратить поломки.',
    ),
    ['dorok-hada', 'maintenance'],
    5,
  ),

  s5u7_498_fill_in_blank: fillBlank(
    '제품을 오래 사용하려면 정기적으로 점검하고 안전하게 ___.',
    ['관리하도록 하세요'],
    [
      '관리하도록 하세요',
      '떨어뜨리도록 하세요',
      '쏟도록 하세요',
      '버리도록 하세요',
      '무시하도록 하세요',
    ],
    L(
      '제품을 오래 사용하려면 평소 관리가 중요해요.',
      'Qurilmani uzoq ishlatish uchun kundalik parvarish muhim.',
      'Regular care is important for long-term use.',
      'Для долгой службы устройства важен регулярный уход.',
    ),
    ['dorok-hada', 'maintenance'],
    5,
  ),

  s5u7_499_error_hunt: errorHunt(
    '같은 문제가 다시 생기면 계속 사용하도록 하세요.',
    '사용하도록',
    ['연락하도록', '점검하도록', '기록하도록', '설명하도록'],
    '연락하도록',
    L(
      '수리 후 같은 문제가 재발하면 계속 사용하는 것이 아니라 수리 센터에 연락해야 해요.',
      'Ta’mirdan keyin muammo qaytsa, ishlatishda davom etmay, servisga murojaat qilish kerak.',
      'If the problem returns after repair, contact the repair center rather than continuing to use it.',
      'Если проблема вернулась после ремонта, нужно обратиться в сервис, а не продолжать использование.',
    ),
    ['dorok-hada', 'repair-flow', 'meaning'],
    5,
  ),

  s5u7_500_word_arrange: wordArrange(
    [
      '고장을 예방하고',
      '`V-도록 하다`를 사용하면',
      '필요한 행동을 분명하게 안내해서',
      '문제가 생겼을 때 올바르게 대처할 수 있어요',
      '증상을 숨기고',
      '제품을 더 고장 내요',
    ],
    '`V-도록 하다`를 사용하면 필요한 행동을 분명하게 안내해서 고장을 예방하고 문제가 생겼을 때 올바르게 대처할 수 있어요',
    L(
      'Unit 7에서 배운 어휘와 문법을 실제 제품 관리와 수리 상황에 연결해요.',
      'Unit 7 lug‘at va grammatikasi real qurilma parvarishi va ta’mir vaziyatiga bog‘lanadi.',
      'This connects Unit 7 vocabulary and grammar to real device care and repair situations.',
      'Лексика и грамматика Unit 7 связываются с реальным уходом за устройствами и ремонтом.',
    ),
    ['dorok-hada', 'unit-review'],
    5,
  ),
};

export const S5_UNIT7_NODES = [
  {
    title: L(
      '고장 증상과 기본 대처',
      'Nosozlik belgilari va dastlabki choralar',
      'Breakdown Symptoms and Basic Troubleshooting',
      'Признаки неисправности и базовые действия',
    ),
    description: L(
      '제품의 고장 증상을 정확히 구별하고 원인과 기본 조작을 확인한 뒤 필요한 경우 수리를 신청한다',
      'Nosozlik belgilarini aniqlash, sabab va asosiy ulanishlarni tekshirish, kerak bo‘lsa ta’mirlashga murojaat qilish',
      'Identify device symptoms, connect them to likely causes, check basic operations, and request repair when needed',
      'Определяем признаки неисправности, связываем их с причиной, проверяем базовые действия и при необходимости обращаемся в ремонт',
    ),
    section: 5,
    unit: 7,
    order: 1,
    isActive: true,
    lessons: [
      {
        title: L(
          '어떤 문제가 생겼어요?',
          'Qanday muammo paydo bo‘ldi?',
          'What Is Wrong?',
          'Что случилось?',
        ),
        description: L(
          '기기별 고장 증상을 보고 알맞은 표현을 정확히 구별한다',
          'Qurilmalardagi nosozlik belgilarini to‘g‘ri ifodalar bilan ajratamiz',
          'Distinguish the correct Korean expressions for common device problems',
          'Различаем корейские выражения для типичных неисправностей',
        ),
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_5,
        order: 1,
        questions: [
          's5u7_001_reading_quiz',
          's5u7_002_type_answer',
          's5u7_003_translate_builder',
          's5u7_004_fill_in_blank',
          's5u7_005_word_arrange',
          's5u7_006_type_answer',
          's5u7_007_error_hunt',
          's5u7_008_translate_builder',
          's5u7_009_reading_quiz',
          's5u7_010_fill_in_blank',
          's5u7_011_type_answer',
          's5u7_012_translate_builder',
          's5u7_013_cloze_passage',
          's5u7_014_word_arrange',
          's5u7_015_type_answer',
          's5u7_016_reading_quiz',
          's5u7_017_translate_builder',
          's5u7_018_fill_in_blank',
          's5u7_019_error_hunt',
          's5u7_020_word_arrange',
        ],
      },
      {
        title: L(
          '왜 고장이 났어요?',
          'Nega buzildi?',
          'What Caused the Problem?',
          'Почему это сломалось?',
        ),
        description: L(
          '빠뜨리다, 떨어뜨리다, 쏟다, 먼지가 끼다를 구별하고 고장의 원인과 결과를 연결한다',
          'Suvga tushirish, yerga tushirish, ichimlik to‘kish va chang yig‘ilishini sabab-natija bilan bog‘laymiz',
          'Distinguish dropping, water damage, spills, and dust and connect causes to device problems',
          'Различаем падение, воду, пролитую жидкость и пыль и связываем причины с поломками',
        ),
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_5,
        order: 2,
        questions: [
          's5u7_021_reading_quiz',
          's5u7_022_type_answer',
          's5u7_023_translate_builder',
          's5u7_024_fill_in_blank',
          's5u7_025_word_arrange',
          's5u7_026_type_answer',
          's5u7_027_error_hunt',
          's5u7_028_translate_builder',
          's5u7_029_reading_quiz',
          's5u7_030_fill_in_blank',
          's5u7_031_type_answer',
          's5u7_032_translate_builder',
          's5u7_033_cloze_passage',
          's5u7_034_word_arrange',
          's5u7_035_type_answer',
          's5u7_036_reading_quiz',
          's5u7_037_translate_builder',
          's5u7_038_fill_in_blank',
          's5u7_039_error_hunt',
          's5u7_040_word_arrange',
        ],
      },
      {
        title: L(
          '먼저 어떻게 해 볼까요?',
          'Avval nima qilib ko‘ramiz?',
          'What Should We Try First?',
          'Что попробуем сначала?',
        ),
        description: L(
          '전원, 플러그, 수도, 자동차 시동을 켜고 끄는 표현을 상황에 맞게 구별한다',
          'Quvvat, vilka, suv va avtomobil dvigateliga oid yoqish-o‘chirish ifodalarini farqlaymiz',
          'Use the correct expressions for power, plugs, taps, and vehicle engines',
          'Правильно используем выражения для питания, вилок, крана и двигателя',
        ),
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_5,
        order: 3,
        questions: [
          's5u7_041_reading_quiz',
          's5u7_042_type_answer',
          's5u7_043_translate_builder',
          's5u7_044_fill_in_blank',
          's5u7_045_word_arrange',
          's5u7_046_type_answer',
          's5u7_047_error_hunt',
          's5u7_048_translate_builder',
          's5u7_049_reading_quiz',
          's5u7_050_fill_in_blank',
          's5u7_051_type_answer',
          's5u7_052_translate_builder',
          's5u7_053_cloze_passage',
          's5u7_054_word_arrange',
          's5u7_055_type_answer',
          's5u7_056_reading_quiz',
          's5u7_057_translate_builder',
          's5u7_058_fill_in_blank',
          's5u7_059_error_hunt',
          's5u7_060_word_arrange',
        ],
      },
      {
        title: L(
          '수리가 필요해요',
          'Ta’mirlash kerak',
          'It Needs Repair',
          'Нужен ремонт',
        ),
        description: L(
          '증상을 설명하고 수리 센터, 수리 기사, 접수, 교체, 사용 설명서 표현을 실제 수리 흐름에 연결한다',
          'Nosozlikni tushuntirib, servis markazi, usta, ro‘yxatdan o‘tkazish, almashtirish va qo‘llanma ifodalarini bog‘laymiz',
          'Connect symptom descriptions with repair centers, technicians, service requests, replacement, and user manuals',
          'Связываем описание неисправности с сервисным центром, мастером, заявкой, заменой и инструкцией',
        ),
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_5,
        order: 4,
        questions: [
          's5u7_061_reading_quiz',
          's5u7_062_type_answer',
          's5u7_063_translate_builder',
          's5u7_064_fill_in_blank',
          's5u7_065_word_arrange',
          's5u7_066_type_answer',
          's5u7_067_error_hunt',
          's5u7_068_translate_builder',
          's5u7_069_reading_quiz',
          's5u7_070_fill_in_blank',
          's5u7_071_type_answer',
          's5u7_072_translate_builder',
          's5u7_073_cloze_passage',
          's5u7_074_word_arrange',
          's5u7_075_type_answer',
          's5u7_076_reading_quiz',
          's5u7_077_translate_builder',
          's5u7_078_fill_in_blank',
          's5u7_079_error_hunt',
          's5u7_080_word_arrange',
        ],
      },
      {
        title: L(
          '고장 상황을 설명하고 수리를 신청해요',
          'Nosozlikni tushuntirib, ta’mirlashga murojaat qilamiz',
          'Describe the Problem and Request Repair',
          'Опишем проблему и подадим заявку на ремонт',
        ),
        description: L(
          '고장 증상과 원인을 설명하고 기본적인 방법을 확인한 뒤 해결되지 않으면 수리 센터에 정확한 정보를 전달한다',
          'Nosozlik belgisi va sababini tushuntirib, oddiy usullarni tekshirgach muammo hal bo‘lmasa servis markaziga aniq ma’lumot beramiz',
          'Describe symptoms and causes, try basic troubleshooting, and provide accurate information when requesting professional repair',
          'Описываем симптомы и причины, выполняем базовую проверку и передаём точную информацию при обращении в сервис',
        ),
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_5,
        order: 5,
        questions: [
          's5u7_081_reading_quiz',
          's5u7_082_type_answer',
          's5u7_083_translate_builder',
          's5u7_084_fill_in_blank',
          's5u7_085_word_arrange',
          's5u7_086_type_answer',
          's5u7_087_error_hunt',
          's5u7_088_translate_builder',
          's5u7_089_reading_quiz',
          's5u7_090_fill_in_blank',
          's5u7_091_type_answer',
          's5u7_092_translate_builder',
          's5u7_093_cloze_passage',
          's5u7_094_word_arrange',
          's5u7_095_type_answer',
          's5u7_096_reading_quiz',
          's5u7_097_translate_builder',
          's5u7_098_fill_in_blank',
          's5u7_099_error_hunt',
          's5u7_100_word_arrange',
        ],
      },
    ],
  },
  {
    title: L(
      '껐다가 다시 켜 보세요',
      'O‘chirib, yana yoqib ko‘ring',
      'Turn It Off and Then Back On',
      'Выключите и снова включите',
    ),
    description: L(
      'V-았다가/었다가를 사용해 한 행동 뒤의 변화, 반대 행동, 고장 결과와 실제 문제 해결 과정을 표현한다',
      'V-았다가/었다가 orqali bir harakatdan keyingi o‘zgarish, qarama-qarshi harakat va nosozlikni hal qilish jarayonini ifodalaymiz',
      'Use V-았다가/었다가 to express changes after an action, reversed actions, unexpected results, and troubleshooting sequences',
      'Используем V-았다가/었다가 для изменения после действия, обратных действий, неожиданных результатов и устранения неисправностей',
    ),
    section: 5,
    unit: 7,
    order: 2,
    isActive: true,
    lessons: [
      {
        title: L(
          '했다가 어떻게 됐어요?',
          'Keyin nima bo‘ldi?',
          'What Happened After That?',
          'Что произошло после этого?',
        ),
        description: L(
          'V-았다가/었다가의 형태를 익히고 한 행동 뒤에 행동이나 상태가 바뀌는 기본 의미를 배운다',
          'V-았다가/었다가 shaklini va bir harakatdan keyingi o‘zgarish ma’nosini o‘rganamiz',
          'Learn the form of V-았다가/었다가 and its basic meaning of a change after an action',
          'Изучаем форму V-았다가/었다가 и основное значение изменения после действия',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 1,
        questions: [
          's5u7_101_reading_quiz',
          's5u7_102_type_answer',
          's5u7_103_translate_builder',
          's5u7_104_fill_in_blank',
          's5u7_105_word_arrange',
          's5u7_106_type_answer',
          's5u7_107_error_hunt',
          's5u7_108_translate_builder',
          's5u7_109_reading_quiz',
          's5u7_110_fill_in_blank',
          's5u7_111_type_answer',
          's5u7_112_translate_builder',
          's5u7_113_cloze_passage',
          's5u7_114_word_arrange',
          's5u7_115_type_answer',
          's5u7_116_reading_quiz',
          's5u7_117_translate_builder',
          's5u7_118_fill_in_blank',
          's5u7_119_error_hunt',
          's5u7_120_word_arrange',
        ],
      },
      {
        title: L(
          '반대로 바꿔 봐요',
          'Qarama-qarshi harakatga o‘tamiz',
          'Switch to the Opposite Action',
          'Переходим к обратному действию',
        ),
        description: L(
          '켜다와 끄다, 꽂다와 빼다, 틀다와 잠그다처럼 서로 반대되는 조작을 V-았다가/었다가로 연결한다',
          'Yoqish-o‘chirish, ulash-ajratish va ochish-yopish kabi qarama-qarshi harakatlarni bog‘laymiz',
          'Connect opposite device operations such as on/off, plug/unplug, and open/close with V-았다가/었다가',
          'Связываем противоположные действия: включить/выключить, вставить/вынуть, открыть/закрыть',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 2,
        questions: [
          's5u7_121_reading_quiz',
          's5u7_122_type_answer',
          's5u7_123_translate_builder',
          's5u7_124_fill_in_blank',
          's5u7_125_word_arrange',
          's5u7_126_type_answer',
          's5u7_127_error_hunt',
          's5u7_128_translate_builder',
          's5u7_129_reading_quiz',
          's5u7_130_fill_in_blank',
          's5u7_131_type_answer',
          's5u7_132_translate_builder',
          's5u7_133_cloze_passage',
          's5u7_134_word_arrange',
          's5u7_135_type_answer',
          's5u7_136_reading_quiz',
          's5u7_137_translate_builder',
          's5u7_138_fill_in_blank',
          's5u7_139_error_hunt',
          's5u7_140_word_arrange',
        ],
      },
      {
        title: L(
          '껐다가 다시 켜 보세요',
          'O‘chirib, yana yoqib ko‘ring',
          'Turn It Off and Back On',
          'Выключите и снова включите',
        ),
        description: L(
          '전원, 플러그, 수도 연결 문제에서 V-았다가/었다가를 실제 고장 대처 지시로 사용한다',
          'Quvvat, vilka va suv muammolarida grammatikani real nosozlikni tekshirish uchun ishlatamiz',
          'Use V-았다가/었다가 in practical troubleshooting instructions involving power, plugs, and water',
          'Используем V-았다가/었다가 в практических инструкциях по проверке питания, вилки и воды',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 3,
        questions: [
          's5u7_141_reading_quiz',
          's5u7_142_type_answer',
          's5u7_143_translate_builder',
          's5u7_144_fill_in_blank',
          's5u7_145_word_arrange',
          's5u7_146_type_answer',
          's5u7_147_error_hunt',
          's5u7_148_translate_builder',
          's5u7_149_reading_quiz',
          's5u7_150_fill_in_blank',
          's5u7_151_type_answer',
          's5u7_152_translate_builder',
          's5u7_153_cloze_passage',
          's5u7_154_word_arrange',
          's5u7_155_type_answer',
          's5u7_156_reading_quiz',
          's5u7_157_translate_builder',
          's5u7_158_fill_in_blank',
          's5u7_159_error_hunt',
          's5u7_160_word_arrange',
        ],
      },
      {
        title: L(
          '했다가 문제가 생겼어요',
          'Qildim, keyin muammo chiqdi',
          'I Did It and Then a Problem Happened',
          'Сделал — и возникла проблема',
        ),
        description: L(
          '먼저 한 행동 뒤에 예상하지 못한 고장이나 변화가 생긴 상황을 설명하고 그 결과까지 연결한다',
          'Avvalgi harakatdan keyin kutilmagan nosozlik yoki o‘zgarishni ifodalaymiz',
          'Describe unexpected malfunctions or changes that occur after an earlier action',
          'Описываем неожиданные неисправности или изменения после предыдущего действия',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 4,
        questions: [
          's5u7_161_reading_quiz',
          's5u7_162_type_answer',
          's5u7_163_translate_builder',
          's5u7_164_fill_in_blank',
          's5u7_165_word_arrange',
          's5u7_166_type_answer',
          's5u7_167_error_hunt',
          's5u7_168_translate_builder',
          's5u7_169_reading_quiz',
          's5u7_170_fill_in_blank',
          's5u7_171_type_answer',
          's5u7_172_translate_builder',
          's5u7_173_cloze_passage',
          's5u7_174_word_arrange',
          's5u7_175_type_answer',
          's5u7_176_reading_quiz',
          's5u7_177_translate_builder',
          's5u7_178_fill_in_blank',
          's5u7_179_error_hunt',
          's5u7_180_word_arrange',
        ],
      },
      {
        title: L(
          '고장 과정을 정확히 설명해요',
          'Nosozlik jarayonini aniq tushuntiramiz',
          'Explain the Breakdown Clearly',
          'Точно объясняем процесс неисправности',
        ),
        description: L(
          '고장 증상, 직접 해 본 대처, 그 뒤의 결과를 V-았다가/었다가로 연결해 수리 기사에게 정확히 설명한다',
          'Nosozlik belgisi, sinab ko‘rilgan usul va natijani V-았다가/었다가 bilan bog‘lab tushuntiramiz',
          'Combine symptoms, attempted troubleshooting, and results with V-았다가/었다가 to explain a problem clearly to a technician',
          'Связываем симптомы, предпринятые действия и результат с V-았다가/었다가 для точного объяснения мастеру',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 5,
        questions: [
          's5u7_181_reading_quiz',
          's5u7_182_type_answer',
          's5u7_183_translate_builder',
          's5u7_184_fill_in_blank',
          's5u7_185_word_arrange',
          's5u7_186_type_answer',
          's5u7_187_error_hunt',
          's5u7_188_translate_builder',
          's5u7_189_reading_quiz',
          's5u7_190_fill_in_blank',
          's5u7_191_type_answer',
          's5u7_192_translate_builder',
          's5u7_193_cloze_passage',
          's5u7_194_word_arrange',
          's5u7_195_type_answer',
          's5u7_196_reading_quiz',
          's5u7_197_translate_builder',
          's5u7_198_fill_in_blank',
          's5u7_199_error_hunt',
          's5u7_200_word_arrange',
        ],
      },
    ],
  },
  {
    title: L(
      '고쳤는데도 또 그래요',
      'Tuzatilgan bo‘lsa ham, yana shunday',
      'It Still Happens Even After Repair',
      'Даже после ремонта проблема осталась',
    ),
    description: L(
      'A-(으)ㄴ데도, V-는데도, N인데도를 사용해 기대했던 결과와 실제 고장 상태가 다른 상황을 정확히 설명한다',
      'A-(으)ㄴ데도, V-는데도 va N인데도 orqali kutilgan natija bilan haqiqiy nosozlik holatini taqqoslaymiz',
      'Use A-(으)ㄴ데도, V-는데도, and N인데도 to describe situations where the actual malfunction differs from what was expected',
      'Используем A-(으)ㄴ데도, V-는데도 и N인데도, чтобы описывать результат, отличный от ожидаемого',
    ),
    section: 5,
    unit: 7,
    order: 3,
    isActive: true,
    lessons: [
      {
        title: L(
          '그런데도 문제가 있어요',
          'Shunga qaramay muammo bor',
          'There Is Still a Problem',
          'Несмотря на это, проблема остаётся',
        ),
        description: L(
          '동사 뒤 `-는데도`를 사용해 이미 한 행동과 예상 밖의 고장 결과를 대비한다',
          'Fe’ldan keyingi `-는데도` bilan bajarilgan harakat va kutilmagan natijani qarama-qarshi qo‘yamiz',
          'Use V-는데도 to contrast an action already taken with an unexpected malfunction',
          'Используем V-는데도 для противопоставления выполненного действия и неожиданного результата',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 1,
        questions: [
          's5u7_201_reading_quiz',
          's5u7_202_type_answer',
          's5u7_203_translate_builder',
          's5u7_204_fill_in_blank',
          's5u7_205_word_arrange',
          's5u7_206_type_answer',
          's5u7_207_error_hunt',
          's5u7_208_translate_builder',
          's5u7_209_reading_quiz',
          's5u7_210_fill_in_blank',
          's5u7_211_type_answer',
          's5u7_212_translate_builder',
          's5u7_213_cloze_passage',
          's5u7_214_word_arrange',
          's5u7_215_type_answer',
          's5u7_216_reading_quiz',
          's5u7_217_translate_builder',
          's5u7_218_fill_in_blank',
          's5u7_219_error_hunt',
          's5u7_220_word_arrange',
        ],
      },
      {
        title: L(
          '괜찮은데도 이상해요',
          'Yaxshi bo‘lsa ham g‘alati',
          'It Looks Fine, but Something Is Wrong',
          'Всё выглядит нормально, но что-то не так',
        ),
        description: L(
          'A-(으)ㄴ데도와 N인데도를 구별하고 제품 상태, 비용, 사람의 역할과 예상 밖 결과를 연결한다',
          'A-(으)ㄴ데도 va N인데도를 farqlab, holat, narx va odam roli bilan kutilmagan natijani bog‘laymiz',
          'Distinguish A-(으)ㄴ데도 and N인데도 while describing product condition, cost, and professional roles',
          'Различаем A-(으)ㄴ데도 и N인데도 при описании состояния, стоимости и роли специалиста',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 2,
        questions: [
          's5u7_221_reading_quiz',
          's5u7_222_type_answer',
          's5u7_223_translate_builder',
          's5u7_224_fill_in_blank',
          's5u7_225_word_arrange',
          's5u7_226_type_answer',
          's5u7_227_error_hunt',
          's5u7_228_translate_builder',
          's5u7_229_reading_quiz',
          's5u7_230_fill_in_blank',
          's5u7_231_type_answer',
          's5u7_232_translate_builder',
          's5u7_233_cloze_passage',
          's5u7_234_word_arrange',
          's5u7_235_type_answer',
          's5u7_236_reading_quiz',
          's5u7_237_translate_builder',
          's5u7_238_fill_in_blank',
          's5u7_239_error_hunt',
          's5u7_240_word_arrange',
        ],
      },
      {
        title: L(
          '확인하는데도 계속 그래요',
          'Tekshirsak ham davom etmoqda',
          'It Continues Even While We Check',
          'Проблема продолжается даже во время проверки',
        ),
        description: L(
          '현재 진행 중인 동작 뒤 `V-는데도`를 사용해 계속되는 문제와 예상 밖 결과를 표현한다',
          'Davom etayotgan fe’ldan keyin `V-는데도` bilan davom etuvchi muammoni ifodalaymiz',
          'Use V-는데도 after ongoing actions to describe problems that continue unexpectedly',
          'Используем V-는데도 после продолжающихся действий для описания сохраняющейся проблемы',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 3,
        questions: [
          's5u7_241_reading_quiz',
          's5u7_242_type_answer',
          's5u7_243_translate_builder',
          's5u7_244_fill_in_blank',
          's5u7_245_word_arrange',
          's5u7_246_type_answer',
          's5u7_247_error_hunt',
          's5u7_248_translate_builder',
          's5u7_249_reading_quiz',
          's5u7_250_fill_in_blank',
          's5u7_251_type_answer',
          's5u7_252_translate_builder',
          's5u7_253_cloze_passage',
          's5u7_254_word_arrange',
          's5u7_255_type_answer',
          's5u7_256_reading_quiz',
          's5u7_257_translate_builder',
          's5u7_258_fill_in_blank',
          's5u7_259_error_hunt',
          's5u7_260_word_arrange',
        ],
      },
      {
        title: L(
          '이렇게 했는데도 안 돼요',
          'Shunday qilsam ham ishlamayapti',
          'I Tried This, but It Still Does Not Work',
          'Я это сделал, но всё равно не работает',
        ),
        description: L(
          '전원, 플러그, 수도, 종이 걸림, 부품 교체 등 실제 고장 대처를 했지만 해결되지 않은 상황을 설명한다',
          'Quvvat, vilka, suv, qog‘oz tiqilishi va qism almashtirish kabi choralar yordam bermagan holatlarni tushuntiramiz',
          'Describe unresolved problems after practical troubleshooting such as power resets, plug checks, water checks, paper-jam removal, and part replacement',
          'Описываем ситуации, когда проверка питания, вилки, воды, бумаги и замена деталей не решили проблему',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 4,
        questions: [
          's5u7_261_reading_quiz',
          's5u7_262_type_answer',
          's5u7_263_translate_builder',
          's5u7_264_fill_in_blank',
          's5u7_265_word_arrange',
          's5u7_266_type_answer',
          's5u7_267_error_hunt',
          's5u7_268_translate_builder',
          's5u7_269_reading_quiz',
          's5u7_270_fill_in_blank',
          's5u7_271_type_answer',
          's5u7_272_translate_builder',
          's5u7_273_cloze_passage',
          's5u7_274_word_arrange',
          's5u7_275_type_answer',
          's5u7_276_reading_quiz',
          's5u7_277_translate_builder',
          's5u7_278_fill_in_blank',
          's5u7_279_error_hunt',
          's5u7_280_word_arrange',
        ],
      },
      {
        title: L(
          '수리했는데도 또 그래요',
          'Ta’mirlangan bo‘lsa ham yana takrorlandi',
          'The Problem Returned Even After Repair',
          'Проблема вернулась даже после ремонта',
        ),
        description: L(
          '제품 상태, 이전 수리, 직접 해 본 대처와 현재 증상을 세 형태로 종합해 수리 센터에 정확히 전달한다',
          'Mahsulot holati, oldingi ta’mir, bajarilgan choralar va hozirgi belgilarni uch shakl bilan birlashtiramiz',
          'Combine product condition, repair history, attempted troubleshooting, and current symptoms using all three forms',
          'Объединяем состояние устройства, историю ремонта, предпринятые действия и текущие симптомы с помощью всех трёх форм',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 5,
        questions: [
          's5u7_281_reading_quiz',
          's5u7_282_type_answer',
          's5u7_283_translate_builder',
          's5u7_284_fill_in_blank',
          's5u7_285_word_arrange',
          's5u7_286_type_answer',
          's5u7_287_error_hunt',
          's5u7_288_translate_builder',
          's5u7_289_reading_quiz',
          's5u7_290_fill_in_blank',
          's5u7_291_type_answer',
          's5u7_292_translate_builder',
          's5u7_293_cloze_passage',
          's5u7_294_word_arrange',
          's5u7_295_type_answer',
          's5u7_296_reading_quiz',
          's5u7_297_translate_builder',
          's5u7_298_fill_in_blank',
          's5u7_299_error_hunt',
          's5u7_300_word_arrange',
        ],
      },
    ],
  },
  {
    title: L(
      '이상한 소리가 나더니 꺼졌어요',
      'G‘alati ovoz chiqdi, keyin o‘chdi',
      'It Made a Strange Noise and Then Turned Off',
      'Появился странный звук, а затем устройство выключилось',
    ),
    description: L(
      'A/V-더니를 사용해 과거에 관찰한 상태나 행동과 이후의 변화, 증상 악화, 최종 고장을 연결해 설명한다',
      'A/V-더니 orqali kuzatilgan holat yoki harakatni keyingi o‘zgarish, kuchaygan belgi va yakuniy nosozlik bilan bog‘laymiz',
      'Use A/V-더니 to connect an observed past state or action with a later change, worsening symptom, or final malfunction',
      'Используем A/V-더니, чтобы связать наблюдаемое состояние или действие с последующим изменением, ухудшением симптома или поломкой',
    ),
    section: 5,
    unit: 7,
    order: 4,
    isActive: true,
    lessons: [
      {
        title: L(
          '그러더니 어떻게 됐어요?',
          'Keyin nima bo‘ldi?',
          'What Happened Next?',
          'Что произошло потом?',
        ),
        description: L(
          '관찰한 행동이나 상태 뒤에 새로운 변화와 결과가 나타나는 기본적인 A/V-더니 의미를 익힌다',
          'Kuzatilgan holat yoki harakatdan keyingi o‘zgarish va natijani A/V-더니 bilan ifodalaymiz',
          'Learn the core use of A/V-더니 for a later change or result after an observed state or action',
          'Изучаем основное употребление A/V-더니 для изменения или результата после наблюдаемого состояния или действия',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 1,
        questions: [
          's5u7_301_reading_quiz',
          's5u7_302_type_answer',
          's5u7_303_translate_builder',
          's5u7_304_fill_in_blank',
          's5u7_305_word_arrange',
          's5u7_306_type_answer',
          's5u7_307_error_hunt',
          's5u7_308_translate_builder',
          's5u7_309_reading_quiz',
          's5u7_310_fill_in_blank',
          's5u7_311_type_answer',
          's5u7_312_translate_builder',
          's5u7_313_cloze_passage',
          's5u7_314_word_arrange',
          's5u7_315_type_answer',
          's5u7_316_reading_quiz',
          's5u7_317_translate_builder',
          's5u7_318_fill_in_blank',
          's5u7_319_error_hunt',
          's5u7_320_word_arrange',
        ],
      },
      {
        title: L(
          '전에는 괜찮더니 지금은 이상해요',
          'Avval yaxshi edi, hozir esa g‘alati',
          'It Used to Be Fine, but Now It Is Not',
          'Раньше всё было нормально, а теперь нет',
        ),
        description: L(
          '형용사와 상태 동사에 -더니를 사용해 과거에 관찰한 상태와 현재 상태의 변화를 대비한다',
          'Sifat va holat fe’llari bilan -더니 ishlatib, oldingi va hozirgi holatni taqqoslaymiz',
          'Use -더니 with adjectives and state verbs to contrast a previously observed state with the current one',
          'Используем -더니 с прилагательными и глаголами состояния для сравнения прошлого и текущего состояния',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 2,
        questions: [
          's5u7_321_reading_quiz',
          's5u7_322_type_answer',
          's5u7_323_translate_builder',
          's5u7_324_fill_in_blank',
          's5u7_325_word_arrange',
          's5u7_326_type_answer',
          's5u7_327_error_hunt',
          's5u7_328_translate_builder',
          's5u7_329_reading_quiz',
          's5u7_330_fill_in_blank',
          's5u7_331_type_answer',
          's5u7_332_translate_builder',
          's5u7_333_cloze_passage',
          's5u7_334_word_arrange',
          's5u7_335_type_answer',
          's5u7_336_reading_quiz',
          's5u7_337_translate_builder',
          's5u7_338_fill_in_blank',
          's5u7_339_error_hunt',
          's5u7_340_word_arrange',
        ],
      },
      {
        title: L(
          '점점 심해지더니',
          'Tobora kuchayib bordi',
          'It Kept Getting Worse',
          'Проблема становилась всё серьёзнее',
        ),
        description: L(
          '가끔 나타나던 증상이 반복되거나 더 심한 고장으로 변하는 과정을 A/V-더니로 표현한다',
          'Vaqti-vaqti bilan bo‘lgan belgining takrorlanishi yoki kuchayishini A/V-더니 bilan ifodalaymiz',
          'Use A/V-더니 to describe symptoms becoming more frequent or progressing into a more serious malfunction',
          'Используем A/V-더니 для описания учащающихся симптомов и перехода к более серьёзной неисправности',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 3,
        questions: [
          's5u7_341_reading_quiz',
          's5u7_342_type_answer',
          's5u7_343_translate_builder',
          's5u7_344_fill_in_blank',
          's5u7_345_word_arrange',
          's5u7_346_type_answer',
          's5u7_347_error_hunt',
          's5u7_348_translate_builder',
          's5u7_349_reading_quiz',
          's5u7_350_fill_in_blank',
          's5u7_351_type_answer',
          's5u7_352_translate_builder',
          's5u7_353_cloze_passage',
          's5u7_354_word_arrange',
          's5u7_355_type_answer',
          's5u7_356_reading_quiz',
          's5u7_357_translate_builder',
          's5u7_358_fill_in_blank',
          's5u7_359_error_hunt',
          's5u7_360_word_arrange',
        ],
      },
      {
        title: L(
          '고장 나기 전에 이런 증상이 있었어요',
          'Buzilishdan oldin shunday belgilar bor edi',
          'These Symptoms Appeared Before It Broke',
          'Перед поломкой были такие симптомы',
        ),
        description: L(
          '소음, 화면 이상, 종이 걸림, 시동 문제처럼 최종 고장 전에 나타난 징후와 결과를 연결해 설명한다',
          'Shovqin, ekran, qog‘oz va dvigatel muammolarini yakuniy nosozlik bilan bog‘lab tushuntiramiz',
          'Connect warning signs such as noise, screen issues, paper jams, and engine problems with the later failure',
          'Связываем шум, проблемы экрана, замятие бумаги и запуск двигателя с последующей поломкой',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 4,
        questions: [
          's5u7_361_reading_quiz',
          's5u7_362_type_answer',
          's5u7_363_translate_builder',
          's5u7_364_fill_in_blank',
          's5u7_365_word_arrange',
          's5u7_366_type_answer',
          's5u7_367_error_hunt',
          's5u7_368_translate_builder',
          's5u7_369_reading_quiz',
          's5u7_370_fill_in_blank',
          's5u7_371_type_answer',
          's5u7_372_translate_builder',
          's5u7_373_cloze_passage',
          's5u7_374_word_arrange',
          's5u7_375_type_answer',
          's5u7_376_reading_quiz',
          's5u7_377_translate_builder',
          's5u7_378_fill_in_blank',
          's5u7_379_error_hunt',
          's5u7_380_word_arrange',
        ],
      },
      {
        title: L(
          '수리 기사에게 변화 과정을 설명해요',
          'Ustaga o‘zgarish jarayonini tushuntiramiz',
          'Explain How the Problem Changed',
          'Объясняем мастеру, как менялась проблема',
        ),
        description: L(
          '처음 상태, 반복된 증상, 악화 과정과 현재 고장을 A/V-더니로 연결해 수리 기사에게 정확한 고장 이력을 전달한다',
          'Dastlabki holat, takroriy belgi, kuchayish va hozirgi nosozlikni A/V-더니 bilan bog‘lab ustaga tushuntiramiz',
          'Use A/V-더니 to connect the initial condition, repeated symptoms, worsening progression, and current failure for a clear repair history',
          'Связываем начальное состояние, повторные симптомы, ухудшение и текущую неисправность с помощью A/V-더니',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 5,
        questions: [
          's5u7_381_reading_quiz',
          's5u7_382_type_answer',
          's5u7_383_translate_builder',
          's5u7_384_fill_in_blank',
          's5u7_385_word_arrange',
          's5u7_386_type_answer',
          's5u7_387_error_hunt',
          's5u7_388_translate_builder',
          's5u7_389_reading_quiz',
          's5u7_390_fill_in_blank',
          's5u7_391_type_answer',
          's5u7_392_translate_builder',
          's5u7_393_cloze_passage',
          's5u7_394_word_arrange',
          's5u7_395_type_answer',
          's5u7_396_reading_quiz',
          's5u7_397_translate_builder',
          's5u7_398_fill_in_blank',
          's5u7_399_error_hunt',
          's5u7_400_word_arrange',
        ],
      },
    ],
  },
  {
    title: L(
      '문제가 생기면 이렇게 하도록 하세요',
      'Muammo bo‘lsa shunday qiling',
      'Make Sure to Do This When There Is a Problem',
      'При проблеме обязательно сделайте так',
    ),
    description: L(
      'V-도록 하다와 V-지 않도록 하다를 사용해 기기 조작, 안전 수칙, 고장 예방, 점검 절차와 수리 요청을 정확하게 안내한다',
      'V-도록 하다 va V-지 않도록 하다 orqali qurilma boshqaruvi, xavfsizlik, profilaktika, tekshiruv va ta’mir ko‘rsatmalarini beramiz',
      'Use V-도록 하다 and V-지 않도록 하다 to give clear instructions for device operation, safety, prevention, troubleshooting, and repair',
      'Используем V-도록 하다 и V-지 않도록 하다 для инструкций по эксплуатации, безопасности, профилактике, диагностике и ремонту',
    ),
    section: 5,
    unit: 7,
    order: 5,
    isActive: true,
    lessons: [
      {
        title: L(
          '이렇게 하도록 하세요',
          'Shunday qilishni unutmang',
          'Make Sure to Do This',
          'Обязательно сделайте так',
        ),
        description: L(
          'V-도록 하다의 기본 형태를 익히고 전원, 플러그, 수도와 같은 기본 고장 대처 행동을 지시한다',
          'V-도록 하다 asosiy shaklini o‘rganib, quvvat, vilka va suv bo‘yicha ko‘rsatmalar beramiz',
          'Learn the basic form of V-도록 하다 through practical power, plug, and water troubleshooting instructions',
          'Изучаем базовую форму V-도록 하다 на инструкциях по питанию, вилке и воде',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 1,
        questions: [
          's5u7_401_reading_quiz',
          's5u7_402_type_answer',
          's5u7_403_translate_builder',
          's5u7_404_fill_in_blank',
          's5u7_405_word_arrange',
          's5u7_406_type_answer',
          's5u7_407_error_hunt',
          's5u7_408_translate_builder',
          's5u7_409_reading_quiz',
          's5u7_410_fill_in_blank',
          's5u7_411_type_answer',
          's5u7_412_translate_builder',
          's5u7_413_cloze_passage',
          's5u7_414_word_arrange',
          's5u7_415_type_answer',
          's5u7_416_reading_quiz',
          's5u7_417_translate_builder',
          's5u7_418_fill_in_blank',
          's5u7_419_error_hunt',
          's5u7_420_word_arrange',
        ],
      },
      {
        title: L(
          '고장 나지 않도록 하세요',
          'Buzilmasligiga ehtiyot bo‘ling',
          'Make Sure It Does Not Get Damaged',
          'Не допускайте поломки',
        ),
        description: L(
          'V-지 않도록 하다를 사용해 물, 충격, 음료, 먼지와 관련된 고장 원인을 예방하는 안전 수칙을 말한다',
          'V-지 않도록 하다 orqali suv, zarba, ichimlik va chang sabab nosozlikni oldini olamiz',
          'Use V-지 않도록 하다 for safety instructions that prevent water, impact, spills, and dust damage',
          'Используем V-지 않도록 하다 для предотвращения повреждений от воды, ударов, жидкости и пыли',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 2,
        questions: [
          's5u7_421_reading_quiz',
          's5u7_422_type_answer',
          's5u7_423_translate_builder',
          's5u7_424_fill_in_blank',
          's5u7_425_word_arrange',
          's5u7_426_type_answer',
          's5u7_427_error_hunt',
          's5u7_428_translate_builder',
          's5u7_429_reading_quiz',
          's5u7_430_fill_in_blank',
          's5u7_431_type_answer',
          's5u7_432_translate_builder',
          's5u7_433_cloze_passage',
          's5u7_434_word_arrange',
          's5u7_435_type_answer',
          's5u7_436_reading_quiz',
          's5u7_437_translate_builder',
          's5u7_438_fill_in_blank',
          's5u7_439_error_hunt',
          's5u7_440_word_arrange',
        ],
      },
      {
        title: L(
          '사용 설명서대로 하도록 하세요',
          'Qo‘llanma bo‘yicha bajaring',
          'Follow the User Manual',
          'Следуйте инструкции',
        ),
        description: L(
          '사용 설명서와 기본 점검 절차를 따라 전원, 연결, 종이 걸림, 수리 준비를 순서대로 확인한다',
          'Qo‘llanma bo‘yicha quvvat, ulanish, qog‘oz tiqilishi va ta’mir tayyorgarligini tekshiramiz',
          'Follow systematic troubleshooting procedures for power, connections, paper jams, and repair preparation',
          'Следуем последовательной проверке питания, подключений, замятия бумаги и подготовки к ремонту',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 3,
        questions: [
          's5u7_441_reading_quiz',
          's5u7_442_type_answer',
          's5u7_443_translate_builder',
          's5u7_444_fill_in_blank',
          's5u7_445_word_arrange',
          's5u7_446_type_answer',
          's5u7_447_error_hunt',
          's5u7_448_translate_builder',
          's5u7_449_reading_quiz',
          's5u7_450_fill_in_blank',
          's5u7_451_type_answer',
          's5u7_452_translate_builder',
          's5u7_453_cloze_passage',
          's5u7_454_word_arrange',
          's5u7_455_type_answer',
          's5u7_456_reading_quiz',
          's5u7_457_translate_builder',
          's5u7_458_fill_in_blank',
          's5u7_459_error_hunt',
          's5u7_460_word_arrange',
        ],
      },
      {
        title: L(
          '수리 기사에게 이렇게 해 달라고 해요',
          'Ustaga shunday qilishni topshiramiz',
          'Have the Technician Do It',
          'Поручаем это мастеру',
        ),
        description: L(
          'V-도록 하다를 다른 사람에게 행동을 맡기거나 지시하는 의미로 확장해 점검, 접수, 부품 교체와 고객 안내 상황을 연습한다',
          'V-도록 하다 orqali boshqa kishiga tekshiruv, ariza, qism almashtirish va mijozga tushuntirish vazifasini topshiramiz',
          'Extend V-도록 하다 to assigning actions such as inspection, registration, part replacement, and customer communication',
          'Используем V-도록 하다 для поручения проверки, оформления, замены деталей и информирования клиента',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 4,
        questions: [
          's5u7_461_reading_quiz',
          's5u7_462_type_answer',
          's5u7_463_translate_builder',
          's5u7_464_fill_in_blank',
          's5u7_465_word_arrange',
          's5u7_466_type_answer',
          's5u7_467_error_hunt',
          's5u7_468_translate_builder',
          's5u7_469_reading_quiz',
          's5u7_470_fill_in_blank',
          's5u7_471_type_answer',
          's5u7_472_translate_builder',
          's5u7_473_cloze_passage',
          's5u7_474_word_arrange',
          's5u7_475_type_answer',
          's5u7_476_reading_quiz',
          's5u7_477_translate_builder',
          's5u7_478_fill_in_blank',
          's5u7_479_error_hunt',
          's5u7_480_word_arrange',
        ],
      },
      {
        title: L(
          '고장부터 수리까지 안내해요',
          'Nosozlikdan ta’mirgacha yo‘l ko‘rsatamiz',
          'Guide the Process from Breakdown to Repair',
          'От неисправности до ремонта',
        ),
        description: L(
          'Unit 7의 고장 어휘와 네 문법을 활용해 증상 확인, 기본 대처, 예방, 정보 기록과 전문 수리 요청까지 실제 흐름으로 통합한다',
          'Unit 7 lug‘ati va grammatikasi bilan belgi, tekshiruv, profilaktika, ma’lumot va professional ta’mirni birlashtiramiz',
          'Integrate Unit 7 vocabulary and grammar into a realistic flow from symptoms and troubleshooting to prevention and professional repair',
          'Объединяем лексику и грамматику Unit 7 в реальный процесс от симптомов и проверки до профилактики и ремонта',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 5,
        questions: [
          's5u7_481_reading_quiz',
          's5u7_482_type_answer',
          's5u7_483_translate_builder',
          's5u7_484_fill_in_blank',
          's5u7_485_word_arrange',
          's5u7_486_type_answer',
          's5u7_487_error_hunt',
          's5u7_488_translate_builder',
          's5u7_489_reading_quiz',
          's5u7_490_fill_in_blank',
          's5u7_491_type_answer',
          's5u7_492_translate_builder',
          's5u7_493_cloze_passage',
          's5u7_494_word_arrange',
          's5u7_495_type_answer',
          's5u7_496_reading_quiz',
          's5u7_497_translate_builder',
          's5u7_498_fill_in_blank',
          's5u7_499_error_hunt',
          's5u7_500_word_arrange',
        ],
      },
    ],
  },
];
