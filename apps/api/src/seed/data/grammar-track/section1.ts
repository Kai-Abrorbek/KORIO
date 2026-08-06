/**
 * 문법 문제 풀이 트랙 (어휘 트랙과 같은 섹션/유닛/노드/레슨 구조).
 *
 * - 레슨 하나 = 문법 하나 (grammarCode 로 Grammar 컬렉션과 연결)
 * - 레슨당 문제 12개: grammar_blank 6 + grammar_build 6
 * - 이 문제들은 어휘 트랙에서 쓰지 않는다. 유형이 따로라 섞이지 않고,
 *   애초에 문법 레슨의 questionIds 에만 들어간다.
 */
import { LessonCategory } from '../../../lessons/schemas/lesson.schema';
import { QuestionLevel } from '../../../lessons/schemas/question.schema';

const I = {
  blank: {
    ko: '빈칸에 알맞은 말을 쓰세요',
    uz: "Bo'sh joyga mos so'zni yozing",
    en: 'Write the missing part',
    ru: 'Впишите пропущенную часть',
  },
  build: {
    ko: '순서에 맞게 문장을 만드세요',
    uz: "So'zlarni to'g'ri tartibda joylashtiring",
    en: 'Build the sentence in order',
    ru: 'Составьте предложение по порядку',
  },
};

/** 빈칸 문제 하나 만들기 */
function blank(
  code: string,
  grammar: string,
  full: string,
  answer: string,
  gloss: { uz: string; en: string; ru: string },
) {
  const at = full.indexOf(answer);
  return {
    [code]: {
      type: 'grammar_blank',
      level: '1',
      lessonCategory: 'grammar',
      instruction: I.blank,
      sentencePrefix: full.slice(0, at),
      sentenceSuffix: full.slice(at + answer.length),
      answer,
      answerTranslation: { ko: full, ...gloss },
      tags: [grammar],
      acceptedAnswers: [],
    },
  };
}

/** 조립 문제 하나 만들기 — rows 의 correct 를 이으면 full 이 된다 */
function build(
  code: string,
  grammar: string,
  rows: { options: string[]; correct: string }[],
  gloss: { uz: string; en: string; ru: string },
) {
  const full = rows.map((r) => r.correct).join(' ');
  return {
    [code]: {
      type: 'grammar_build',
      level: '1',
      lessonCategory: 'grammar',
      instruction: I.build,
      answer: full,
      buildRows: rows,
      answerTranslation: { ko: full, ...gloss },
      tags: [grammar],
      acceptedAnswers: [],
    },
  };
}

// ─────────────────────────────────────────────
// 문법 1. -았/었어요 (과거)
// ─────────────────────────────────────────────
const G1 = 'past-asseoyo';
const G1_Q = {
  ...blank('gp_g1_01', G1, '어제 영화를 봤어요.', '봤어요', {
    uz: "Kecha kino ko'rdim.",
    en: 'I watched a movie yesterday.',
    ru: 'Вчера я смотрел фильм.',
  }),
  ...blank('gp_g1_02', G1, '아침을 먹었어요.', '먹었어요', {
    uz: 'Nonushta qildim.',
    en: 'I had breakfast.',
    ru: 'Я позавтракал.',
  }),
  ...blank('gp_g1_03', G1, '친구를 만났어요.', '만났어요', {
    uz: "Do'stimni uchratdim.",
    en: 'I met a friend.',
    ru: 'Я встретил друга.',
  }),
  ...blank('gp_g1_04', G1, '어제 학교에 갔어요.', '갔어요', {
    uz: 'Kecha maktabga bordim.',
    en: 'I went to school yesterday.',
    ru: 'Вчера я ходил в школу.',
  }),
  ...blank('gp_g1_05', G1, '책을 읽었어요.', '읽었어요', {
    uz: "Kitob o'qidim.",
    en: 'I read a book.',
    ru: 'Я читал книгу.',
  }),
  ...blank('gp_g1_06', G1, '물을 마셨어요.', '마셨어요', {
    uz: 'Suv ichdim.',
    en: 'I drank water.',
    ru: 'Я выпил воды.',
  }),
  ...build(
    'gp_g1_07',
    G1,
    [
      { options: ['어제', '내일', '지금'], correct: '어제' },
      { options: ['영화를', '학교를', '물을'], correct: '영화를' },
      { options: ['봤어요.', '봐요.', '볼 거예요.'], correct: '봤어요.' },
    ],
    {
      uz: "Kecha kino ko'rdim.",
      en: 'I watched a movie yesterday.',
      ru: 'Вчера я смотрел фильм.',
    },
  ),
  ...build(
    'gp_g1_08',
    G1,
    [
      { options: ['아침을', '저녁이', '학교를'], correct: '아침을' },
      { options: ['먹었어요.', '먹어요.', '먹을 거예요.'], correct: '먹었어요.' },
    ],
    {
      uz: 'Nonushta qildim.',
      en: 'I had breakfast.',
      ru: 'Я позавтракал.',
    },
  ),
  ...build(
    'gp_g1_09',
    G1,
    [
      { options: ['친구를', '친구가', '친구도'], correct: '친구를' },
      { options: ['만났어요.', '만나요.', '만날 거예요.'], correct: '만났어요.' },
    ],
    {
      uz: "Do'stimni uchratdim.",
      en: 'I met a friend.',
      ru: 'Я встретил друга.',
    },
  ),
  ...build(
    'gp_g1_10',
    G1,
    [
      { options: ['주말에', '내일', '지금'], correct: '주말에' },
      { options: ['집에서', '집에는', '집을'], correct: '집에서' },
      { options: ['쉬었어요.', '쉬어요.', '쉴 거예요.'], correct: '쉬었어요.' },
    ],
    {
      uz: 'Dam olish kunlari uyda dam oldim.',
      en: 'I rested at home on the weekend.',
      ru: 'На выходных я отдыхал дома.',
    },
  ),
  ...build(
    'gp_g1_11',
    G1,
    [
      { options: ['어제', '내일', '매일'], correct: '어제' },
      { options: ['날씨가', '날씨를', '날씨도'], correct: '날씨가' },
      { options: ['좋았어요.', '좋아요.', '좋을 거예요.'], correct: '좋았어요.' },
    ],
    {
      uz: 'Kecha havo yaxshi edi.',
      en: 'The weather was nice yesterday.',
      ru: 'Вчера была хорошая погода.',
    },
  ),
  ...build(
    'gp_g1_12',
    G1,
    [
      { options: ['커피를', '커피가', '커피도'], correct: '커피를' },
      { options: ['마셨어요.', '마셔요.', '마실 거예요.'], correct: '마셨어요.' },
    ],
    {
      uz: 'Qahva ichdim.',
      en: 'I drank coffee.',
      ru: 'Я выпил кофе.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 2. -고 있다 (진행)
// ─────────────────────────────────────────────
const G2 = 'prog-goitda';
const G2_Q = {
  ...blank('gp_g2_01', G2, '지금 밥을 먹고 있어요.', '먹고 있어요', {
    uz: 'Hozir ovqat yeyapman.',
    en: 'I am eating now.',
    ru: 'Сейчас я ем.',
  }),
  ...blank('gp_g2_02', G2, '친구를 기다리고 있어요.', '기다리고 있어요', {
    uz: "Do'stimni kutyapman.",
    en: 'I am waiting for a friend.',
    ru: 'Я жду друга.',
  }),
  ...blank('gp_g2_03', G2, '밖에 비가 오고 있어요.', '오고 있어요', {
    uz: "Tashqarida yomg'ir yog'yapti.",
    en: 'It is raining outside.',
    ru: 'На улице идёт дождь.',
  }),
  ...blank('gp_g2_04', G2, '음악을 듣고 있어요.', '듣고 있어요', {
    uz: 'Musiqa tinglayapman.',
    en: 'I am listening to music.',
    ru: 'Я слушаю музыку.',
  }),
  ...blank('gp_g2_05', G2, '한국어를 배우고 있어요.', '배우고 있어요', {
    uz: "Koreys tilini o'rganyapman.",
    en: 'I am learning Korean.',
    ru: 'Я учу корейский.',
  }),
  ...blank('gp_g2_06', G2, '동생이 자고 있어요.', '자고 있어요', {
    uz: 'Ukam uxlayapti.',
    en: 'My sibling is sleeping.',
    ru: 'Мой брат спит.',
  }),
  ...build(
    'gp_g2_07',
    G2,
    [
      { options: ['지금', '어제', '내일'], correct: '지금' },
      { options: ['밥을', '밥이', '밥도'], correct: '밥을' },
      {
        options: ['먹고 있어요.', '먹었어요.', '먹을 거예요.'],
        correct: '먹고 있어요.',
      },
    ],
    {
      uz: 'Hozir ovqat yeyapman.',
      en: 'I am eating now.',
      ru: 'Сейчас я ем.',
    },
  ),
  ...build(
    'gp_g2_08',
    G2,
    [
      { options: ['친구를', '친구가', '친구도'], correct: '친구를' },
      {
        options: ['기다리고 있어요.', '기다렸어요.', '기다릴 거예요.'],
        correct: '기다리고 있어요.',
      },
    ],
    {
      uz: "Do'stimni kutyapman.",
      en: 'I am waiting for a friend.',
      ru: 'Я жду друга.',
    },
  ),
  ...build(
    'gp_g2_09',
    G2,
    [
      { options: ['밖에', '집에', '학교에'], correct: '밖에' },
      { options: ['비가', '비를', '비도'], correct: '비가' },
      {
        options: ['오고 있어요.', '왔어요.', '올 거예요.'],
        correct: '오고 있어요.',
      },
    ],
    {
      uz: "Tashqarida yomg'ir yog'yapti.",
      en: 'It is raining outside.',
      ru: 'На улице идёт дождь.',
    },
  ),
  ...build(
    'gp_g2_10',
    G2,
    [
      { options: ['음악을', '음악이', '음악도'], correct: '음악을' },
      {
        options: ['듣고 있어요.', '들었어요.', '들을 거예요.'],
        correct: '듣고 있어요.',
      },
    ],
    {
      uz: 'Musiqa tinglayapman.',
      en: 'I am listening to music.',
      ru: 'Я слушаю музыку.',
    },
  ),
  ...build(
    'gp_g2_11',
    G2,
    [
      { options: ['한국어를', '한국어가', '한국어도'], correct: '한국어를' },
      {
        options: ['배우고 있어요.', '배웠어요.', '배울 거예요.'],
        correct: '배우고 있어요.',
      },
    ],
    {
      uz: "Koreys tilini o'rganyapman.",
      en: 'I am learning Korean.',
      ru: 'Я учу корейский.',
    },
  ),
  ...build(
    'gp_g2_12',
    G2,
    [
      { options: ['동생이', '동생을', '동생도'], correct: '동생이' },
      {
        options: ['자고 있어요.', '잤어요.', '잘 거예요.'],
        correct: '자고 있어요.',
      },
    ],
    {
      uz: 'Ukam uxlayapti.',
      en: 'My sibling is sleeping.',
      ru: 'Мой брат спит.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 3. -(으)ㄹ 거예요 (미래)
// ─────────────────────────────────────────────
const G3 = 'future-lgeoye';
const G3_Q = {
  ...blank('gp_g3_01', G3, '내일 학교에 갈 거예요.', '갈 거예요', {
    uz: 'Ertaga maktabga boraman.',
    en: 'I will go to school tomorrow.',
    ru: 'Завтра я пойду в школу.',
  }),
  ...blank('gp_g3_02', G3, '주말에 쉴 거예요.', '쉴 거예요', {
    uz: 'Dam olish kunlari dam olaman.',
    en: 'I will rest on the weekend.',
    ru: 'На выходных я буду отдыхать.',
  }),
  ...blank('gp_g3_03', G3, '내일 친구를 만날 거예요.', '만날 거예요', {
    uz: "Ertaga do'stim bilan uchrashaman.",
    en: 'I will meet a friend tomorrow.',
    ru: 'Завтра я встречусь с другом.',
  }),
  ...blank('gp_g3_04', G3, '저녁에 밥을 먹을 거예요.', '먹을 거예요', {
    uz: 'Kechqurun ovqat yeyman.',
    en: 'I will eat in the evening.',
    ru: 'Вечером я поем.',
  }),
  ...blank('gp_g3_05', G3, '한국에 갈 거예요.', '갈 거예요', {
    uz: 'Koreyaga boraman.',
    en: 'I will go to Korea.',
    ru: 'Я поеду в Корею.',
  }),
  ...blank('gp_g3_06', G3, '책을 읽을 거예요.', '읽을 거예요', {
    uz: "Kitob o'qiyman.",
    en: 'I will read a book.',
    ru: 'Я буду читать книгу.',
  }),
  ...build(
    'gp_g3_07',
    G3,
    [
      { options: ['내일', '어제', '지금'], correct: '내일' },
      { options: ['학교에', '학교를', '학교가'], correct: '학교에' },
      { options: ['갈 거예요.', '갔어요.', '가고 있어요.'], correct: '갈 거예요.' },
    ],
    {
      uz: 'Ertaga maktabga boraman.',
      en: 'I will go to school tomorrow.',
      ru: 'Завтра я пойду в школу.',
    },
  ),
  ...build(
    'gp_g3_08',
    G3,
    [
      { options: ['주말에', '어제', '지금'], correct: '주말에' },
      { options: ['쉴 거예요.', '쉬었어요.', '쉬고 있어요.'], correct: '쉴 거예요.' },
    ],
    {
      uz: 'Dam olish kunlari dam olaman.',
      en: 'I will rest on the weekend.',
      ru: 'На выходных я буду отдыхать.',
    },
  ),
  ...build(
    'gp_g3_09',
    G3,
    [
      { options: ['내일', '어제', '지금'], correct: '내일' },
      { options: ['친구를', '친구가', '친구도'], correct: '친구를' },
      {
        options: ['만날 거예요.', '만났어요.', '만나고 있어요.'],
        correct: '만날 거예요.',
      },
    ],
    {
      uz: "Ertaga do'stim bilan uchrashaman.",
      en: 'I will meet a friend tomorrow.',
      ru: 'Завтра я встречусь с другом.',
    },
  ),
  ...build(
    'gp_g3_10',
    G3,
    [
      { options: ['저녁에', '어제', '지금'], correct: '저녁에' },
      { options: ['밥을', '밥이', '밥도'], correct: '밥을' },
      {
        options: ['먹을 거예요.', '먹었어요.', '먹고 있어요.'],
        correct: '먹을 거예요.',
      },
    ],
    {
      uz: 'Kechqurun ovqat yeyman.',
      en: 'I will eat in the evening.',
      ru: 'Вечером я поем.',
    },
  ),
  ...build(
    'gp_g3_11',
    G3,
    [
      { options: ['한국에', '한국을', '한국이'], correct: '한국에' },
      { options: ['갈 거예요.', '갔어요.', '가고 있어요.'], correct: '갈 거예요.' },
    ],
    {
      uz: 'Koreyaga boraman.',
      en: 'I will go to Korea.',
      ru: 'Я поеду в Корею.',
    },
  ),
  ...build(
    'gp_g3_12',
    G3,
    [
      { options: ['책을', '책이', '책도'], correct: '책을' },
      {
        options: ['읽을 거예요.', '읽었어요.', '읽고 있어요.'],
        correct: '읽을 거예요.',
      },
    ],
    {
      uz: "Kitob o'qiyman.",
      en: 'I will read a book.',
      ru: 'Я буду читать книгу.',
    },
  ),
};

export const GT_S1_QUESTIONS: Record<string, any> = {
  ...G1_Q,
  ...G2_Q,
  ...G3_Q,
};

/** 빈칸 6 + 조립 6 을 번갈아 섞는다 */
function mix(prefix: string): string[] {
  const out: string[] = [];
  for (let i = 0; i < 6; i++) {
    out.push(`${prefix}_0${i + 1}`);
    const b = i + 7;
    out.push(`${prefix}_${b < 10 ? '0' + b : b}`);
  }
  return out;
}

export const GT_S1_NODES = [
  {
    title: {
      ko: '과거와 진행',
      uz: "O'tgan zamon va hozirgi davom",
      en: 'Past and Progressive',
      ru: 'Прошедшее и настоящее продолженное',
    },
    section: 1,
    unit: 1,
    order: 1,
    category: LessonCategory.GRAMMAR,
    isActive: true,
    lessons: [
      {
        title: {
          ko: '-았/었어요',
          uz: '-았/었어요',
          en: '-았/었어요',
          ru: '-았/었어요',
        },
        description: {
          ko: '지난 일을 말할 때',
          uz: "O'tgan ish haqida gapirish",
          en: 'Talking about the past',
          ru: 'Говорим о прошлом',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_1,
        order: 1,
        grammarCode: G1,
        questions: mix('gp_g1'),
      },
      {
        title: {
          ko: '-고 있다',
          uz: '-고 있다',
          en: '-고 있다',
          ru: '-고 있다',
        },
        description: {
          ko: '지금 하는 중일 때',
          uz: 'Hozir davom etayotgan ish',
          en: 'Something happening now',
          ru: 'Действие происходит сейчас',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_1,
        order: 2,
        grammarCode: G2,
        questions: mix('gp_g2'),
      },
    ],
  },
  {
    title: {
      ko: '앞으로의 일',
      uz: 'Kelasi zamon',
      en: 'The Future',
      ru: 'Будущее',
    },
    section: 1,
    unit: 2,
    order: 1,
    category: LessonCategory.GRAMMAR,
    isActive: true,
    lessons: [
      {
        title: {
          ko: '-(으)ㄹ 거예요',
          uz: '-(으)ㄹ 거예요',
          en: '-(으)ㄹ 거예요',
          ru: '-(으)ㄹ 거예요',
        },
        description: {
          ko: '앞으로 할 일을 말할 때',
          uz: 'Kelajakdagi ish haqida',
          en: 'Talking about what you will do',
          ru: 'Говорим о будущем',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_1,
        order: 1,
        grammarCode: G3,
        questions: mix('gp_g3'),
      },
    ],
  },
];
