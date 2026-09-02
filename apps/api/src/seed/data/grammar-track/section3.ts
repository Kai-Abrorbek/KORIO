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
      level: '3',
      lessonCategory: 'grammar',
      instruction: I.blank,
      sentencePrefix: full.slice(0, at),
      sentenceSuffix: full.slice(at + answer.length),
      answer,
      answerTranslation: {
        ko: full,
        ...gloss,
      },
      tags: [grammar],
      acceptedAnswers: [],
    },
  };
}

function build(
  code: string,
  grammar: string,
  rows: {
    options: string[];
    correct: string;
    glue?: boolean;
    hints?: Record<string, string>;
  }[],
  gloss: { uz: string; en: string; ru: string },
) {
  const full = rows.reduce(
    (acc, row, i) =>
      i === 0 || row.glue ? acc + row.correct : acc + ' ' + row.correct,
    '',
  );

  return {
    [code]: {
      type: 'grammar_build',
      level: '3',
      lessonCategory: 'grammar',
      instruction: I.build,
      answer: full,
      buildRows: rows,
      answerTranslation: {
        ko: full,
        ...gloss,
      },
      tags: [grammar],
      acceptedAnswers: [],
    },
  };
}

function mix20(prefix: string): string[] {
  const out: string[] = [];

  for (let i = 1; i <= 10; i++) {
    out.push(`${prefix}_${String(i).padStart(2, '0')}`);
    out.push(`${prefix}_${String(i + 10).padStart(2, '0')}`);
  }

  return out;
}

// ═══════════════════════════════════════════════════════════
// UNIT 1
// 소개 · 자기소개 · 주말 활동
// ═══════════════════════════════════════════════════════════

// ─────────────────────────────────────────────
// 문법 1. N(이)라고 하다
// 받침 O → N이라고 하다
// 받침 X → N라고 하다
// ─────────────────────────────────────────────
const G1 = 'noun-irago-hada';

const G1_Q = {
  // ═══════════════════════════════════════════
  // grammar_blank 10
  // ═══════════════════════════════════════════

  ...blank('gp_s3_u1_g1_01', G1, '저는 민수라고 해요.', '민수라고 해요', {
    uz: 'Mening ismim Minsu.',
    en: 'My name is Minsu.',
    ru: 'Меня зовут Минсу.',
  }),

  ...blank(
    'gp_s3_u1_g1_02',
    G1,
    '제 친구는 하산이라고 해요.',
    '하산이라고 해요',
    {
      uz: "Do'stimning ismi Hasan.",
      en: "My friend's name is Hassan.",
      ru: 'Моего друга зовут Хасан.',
    },
  ),

  ...blank(
    'gp_s3_u1_g1_03',
    G1,
    '이 음식은 비빔밥이라고 해요.',
    '비빔밥이라고 해요',
    {
      uz: 'Bu taom bibimbap deb ataladi.',
      en: 'This dish is called bibimbap.',
      ru: 'Это блюдо называется пибимпап.',
    },
  ),

  ...blank(
    'gp_s3_u1_g1_04',
    G1,
    '이 운동은 태권도라고 해요.',
    '태권도라고 해요',
    {
      uz: 'Bu sport taekvondo deb ataladi.',
      en: 'This sport is called taekwondo.',
      ru: 'Этот вид спорта называется тхэквондо.',
    },
  ),

  ...blank(
    'gp_s3_u1_g1_05',
    G1,
    '이 꽃은 무궁화라고 해요.',
    '무궁화라고 해요',
    {
      uz: 'Bu gul mugunghva deb ataladi.',
      en: 'This flower is called mugunghwa.',
      ru: 'Этот цветок называется мугунхва.',
    },
  ),

  ...blank(
    'gp_s3_u1_g1_06',
    G1,
    '이 전통 집은 한옥이라고 해요.',
    '한옥이라고 해요',
    {
      uz: 'Bu anʼanaviy uy hanok deb ataladi.',
      en: 'This traditional house is called a hanok.',
      ru: 'Этот традиционный дом называется ханок.',
    },
  ),

  ...blank(
    'gp_s3_u1_g1_07',
    G1,
    '제 고향은 타슈켄트라고 해요.',
    '타슈켄트라고 해요',
    {
      uz: 'Mening tug‘ilgan shahrim Toshkent deb ataladi.',
      en: 'My hometown is called Tashkent.',
      ru: 'Мой родной город называется Ташкент.',
    },
  ),

  ...blank('gp_s3_u1_g1_08', G1, '이 악기는 장구라고 해요.', '장구라고 해요', {
    uz: 'Bu cholg‘u janggu deb ataladi.',
    en: 'This instrument is called a janggu.',
    ru: 'Этот инструмент называется чангу.',
  }),

  ...blank(
    'gp_s3_u1_g1_09',
    G1,
    '한국에서는 이 날을 한글날이라고 해요.',
    '한글날이라고 해요',
    {
      uz: 'Koreyada bu kun Hangul kuni deb ataladi.',
      en: 'In Korea, this day is called Hangeul Day.',
      ru: 'В Корее этот день называется Днём хангыля.',
    },
  ),

  ...blank(
    'gp_s3_u1_g1_10',
    G1,
    '제 강아지는 보리라고 해요.',
    '보리라고 해요',
    {
      uz: 'Mening kuchugimning ismi Bori.',
      en: "My dog's name is Bori.",
      ru: 'Мою собаку зовут Бори.',
    },
  ),

  // ═══════════════════════════════════════════
  // grammar_build 10
  // ═══════════════════════════════════════════

  ...build(
    'gp_s3_u1_g1_11',
    G1,
    [
      {
        options: ['저는', '친구는', '동생은'],
        correct: '저는',
      },
      {
        options: ['유나라고', '유나이라고', '유나를'],
        correct: '유나라고',
        hints: {
          유나이라고: "받침 없는 명사 뒤에는 '라고'를 써요.",
          유나를: "이름을 소개할 때는 '라고'를 사용해요.",
        },
      },
      {
        options: ['해요.', '먹어요.', '자요.'],
        correct: '해요.',
      },
    ],
    {
      uz: 'Mening ismim Yuna.',
      en: 'My name is Yuna.',
      ru: 'Меня зовут Юна.',
    },
  ),

  ...build(
    'gp_s3_u1_g1_12',
    G1,
    [
      {
        options: ['제', '그', '이'],
        correct: '제',
      },
      {
        options: ['룸메이트는', '룸메이트를', '룸메이트가'],
        correct: '룸메이트는',
      },
      {
        options: ['마이클이라고', '마이클라고', '마이클은'],
        correct: '마이클이라고',
        hints: {
          마이클라고: "받침 있는 명사 뒤에는 '이라고'를 써요.",
          마이클은: "이름을 소개하는 자리에는 '이라고'가 필요해요.",
        },
      },
      {
        options: ['해요.', '먹어요.', '읽어요.'],
        correct: '해요.',
      },
    ],
    {
      uz: 'Mening xonadoshimning ismi Maykl.',
      en: "My roommate's name is Michael.",
      ru: 'Моего соседа по комнате зовут Майкл.',
    },
  ),

  ...build(
    'gp_s3_u1_g1_13',
    G1,
    [
      {
        options: ['이', '그', '저'],
        correct: '이',
      },
      {
        options: ['과자는', '과자를', '과자가'],
        correct: '과자는',
      },
      {
        options: ['약과라고', '약과이라고', '약과를'],
        correct: '약과라고',
        hints: {
          약과이라고: "받침 없는 '약과' 뒤에는 '라고'를 써요.",
          약과를: "이름을 말할 때는 목적격 조사보다 '라고'가 필요해요.",
        },
      },
      {
        options: ['해요.', '가요.', '자요.'],
        correct: '해요.',
      },
    ],
    {
      uz: 'Bu shirinlik yakgwa deb ataladi.',
      en: 'This traditional snack is called yakgwa.',
      ru: 'Эта сладость называется якква.',
    },
  ),

  ...build(
    'gp_s3_u1_g1_14',
    G1,
    [
      {
        options: ['이', '그', '저'],
        correct: '이',
      },
      {
        options: ['옷은', '옷을', '옷이'],
        correct: '옷은',
      },
      {
        options: ['한복이라고', '한복라고', '한복을'],
        correct: '한복이라고',
        hints: {
          한복라고: "받침 있는 '한복' 뒤에는 '이라고'를 써요.",
          한복을: "옷의 이름을 말하는 자리에는 '이라고'가 필요해요.",
        },
      },
      {
        options: ['해요.', '먹어요.', '만나요.'],
        correct: '해요.',
      },
    ],
    {
      uz: 'Bu kiyim hanbok deb ataladi.',
      en: 'This clothing is called hanbok.',
      ru: 'Эта одежда называется ханбок.',
    },
  ),

  ...build(
    'gp_s3_u1_g1_15',
    G1,
    [
      {
        options: ['이', '그', '저'],
        correct: '이',
      },
      {
        options: ['도시를', '도시는', '도시에'],
        correct: '도시를',
      },
      {
        options: ['부산이라고', '부산라고', '부산을'],
        correct: '부산이라고',
        hints: {
          부산라고: "받침 있는 '부산' 뒤에는 '이라고'를 써요.",
          부산을: "이름을 붙여 말할 때는 '이라고'를 사용해요.",
        },
      },
      {
        options: ['해요.', '마셔요.', '입어요.'],
        correct: '해요.',
      },
    ],
    {
      uz: 'Bu shaharni Busan deb atashadi.',
      en: 'This city is called Busan.',
      ru: 'Этот город называется Пусан.',
    },
  ),

  ...build(
    'gp_s3_u1_g1_16',
    G1,
    [
      {
        options: ['제', '네', '그'],
        correct: '제',
      },
      {
        options: ['고양이는', '고양이를', '고양이가'],
        correct: '고양이는',
      },
      {
        options: ['나비라고', '나비이라고', '나비를'],
        correct: '나비라고',
        hints: {
          나비이라고: "받침 없는 '나비' 뒤에는 '라고'를 써요.",
          나비를: "이름을 소개하는 자리에는 '라고'가 필요해요.",
        },
      },
      {
        options: ['해요.', '가요.', '봐요.'],
        correct: '해요.',
      },
    ],
    {
      uz: 'Mening mushugimning ismi Nabi.',
      en: "My cat's name is Nabi.",
      ru: 'Мою кошку зовут Наби.',
    },
  ),

  ...build(
    'gp_s3_u1_g1_17',
    G1,
    [
      {
        options: ['이', '그', '저'],
        correct: '이',
      },
      {
        options: ['문자는', '문자를', '문자가'],
        correct: '문자는',
      },
      {
        options: ['한글이라고', '한글라고', '한글을'],
        correct: '한글이라고',
        hints: {
          한글라고: "ㄹ 받침이 있는 '한글' 뒤에는 '이라고'를 써요.",
          한글을: "문자의 이름을 말할 때는 '이라고'가 필요해요.",
        },
      },
      {
        options: ['해요.', '타요.', '먹어요.'],
        correct: '해요.',
      },
    ],
    {
      uz: 'Bu yozuv hangul deb ataladi.',
      en: 'This writing system is called Hangeul.',
      ru: 'Эта письменность называется хангыль.',
    },
  ),

  ...build(
    'gp_s3_u1_g1_18',
    G1,
    [
      {
        options: ['이', '그', '저'],
        correct: '이',
      },
      {
        options: ['춤은', '춤을', '춤이'],
        correct: '춤은',
      },
      {
        options: ['탈춤이라고', '탈춤라고', '탈춤을'],
        correct: '탈춤이라고',
        hints: {
          탈춤라고: "받침 있는 '탈춤' 뒤에는 '이라고'를 써요.",
          탈춤을: "춤의 이름을 말하는 자리에는 '이라고'가 필요해요.",
        },
      },
      {
        options: ['해요.', '읽어요.', '마셔요.'],
        correct: '해요.',
      },
    ],
    {
      uz: 'Bu raqs talchum deb ataladi.',
      en: 'This dance is called talchum.',
      ru: 'Этот танец называется тхальчхум.',
    },
  ),

  ...build(
    'gp_s3_u1_g1_19',
    G1,
    [
      {
        options: ['우리', '저', '그'],
        correct: '우리',
      },
      {
        options: ['선생님은', '선생님을', '선생님이'],
        correct: '선생님은',
      },
      {
        options: ['김지혜라고', '김지혜이라고', '김지혜를'],
        correct: '김지혜라고',
        hints: {
          김지혜이라고: "받침 없는 '지혜' 뒤에는 '라고'를 써요.",
          김지혜를: "사람의 이름을 소개할 때는 '라고'를 사용해요.",
        },
      },
      {
        options: ['해요.', '자요.', '먹어요.'],
        correct: '해요.',
      },
    ],
    {
      uz: "O'qituvchimizning ismi Kim Jihye.",
      en: "Our teacher's name is Kim Jihye.",
      ru: 'Нашего преподавателя зовут Ким Чихе.',
    },
  ),

  ...build(
    'gp_s3_u1_g1_20',
    G1,
    [
      {
        options: ['이', '그', '저'],
        correct: '이',
      },
      {
        options: ['동네는', '동네를', '동네가'],
        correct: '동네는',
      },
      {
        options: ['북촌이라고', '북촌라고', '북촌을'],
        correct: '북촌이라고',
        hints: {
          북촌라고: "받침 있는 '북촌' 뒤에는 '이라고'를 써요.",
          북촌을: "장소의 이름을 말하는 자리에는 '이라고'가 필요해요.",
        },
      },
      {
        options: ['해요.', '마셔요.', '자요.'],
        correct: '해요.',
      },
    ],
    {
      uz: 'Bu mahalla Bukchon deb ataladi.',
      en: 'This neighborhood is called Bukchon.',
      ru: 'Этот район называется Пукчхон.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 2. V-(으)려고
// 받침 O → V-으려고
// 받침 X / ㄹ 받침 → V-려고
// 목적·의도: 어떤 행동을 하기 위한 목적 말하기
// ─────────────────────────────────────────────
const G2 = 'verb-euryeogo';

const G2_Q = {
  // ═══════════════════════════════════════════
  // grammar_blank 10
  // ═══════════════════════════════════════════

  ...blank(
    'gp_s3_u1_g2_01',
    G2,
    '한국어를 배우려고 한국에 왔어요.',
    '배우려고',
    {
      uz: 'Koreys tilini o‘rganish uchun Koreyaga keldim.',
      en: 'I came to Korea to learn Korean.',
      ru: 'Я приехал в Корею, чтобы учить корейский язык.',
    },
  ),

  ...blank('gp_s3_u1_g2_02', G2, '친구를 만나려고 일찍 나왔어요.', '만나려고', {
    uz: 'Do‘stim bilan uchrashish uchun erta chiqdim.',
    en: 'I left early to meet my friend.',
    ru: 'Я вышел рано, чтобы встретиться с другом.',
  }),

  ...blank('gp_s3_u1_g2_03', G2, '운동하려고 공원에 갔어요.', '운동하려고', {
    uz: 'Mashq qilish uchun bog‘ga bordim.',
    en: 'I went to the park to exercise.',
    ru: 'Я пошёл в парк, чтобы позаниматься спортом.',
  }),

  ...blank(
    'gp_s3_u1_g2_04',
    G2,
    '사진을 찍으려고 카메라를 가져왔어요.',
    '찍으려고',
    {
      uz: 'Suratga olish uchun kamera olib keldim.',
      en: 'I brought a camera to take pictures.',
      ru: 'Я принёс фотоаппарат, чтобы фотографировать.',
    },
  ),

  ...blank('gp_s3_u1_g2_05', G2, '책을 읽으려고 도서관에 갔어요.', '읽으려고', {
    uz: 'Kitob o‘qish uchun kutubxonaga bordim.',
    en: 'I went to the library to read a book.',
    ru: 'Я пошёл в библиотеку, чтобы почитать книгу.',
  }),

  ...blank(
    'gp_s3_u1_g2_06',
    G2,
    '김밥을 먹으려고 식당에 들어갔어요.',
    '먹으려고',
    {
      uz: 'Kimbap yeyish uchun restoranga kirdim.',
      en: 'I went into the restaurant to eat gimbap.',
      ru: 'Я зашёл в ресторан, чтобы поесть кимпап.',
    },
  ),

  ...blank(
    'gp_s3_u1_g2_07',
    G2,
    '새 신발을 신으려고 양말도 샀어요.',
    '신으려고',
    {
      uz: 'Yangi oyoq kiyim kiyish uchun paypoq ham sotib oldim.',
      en: 'I also bought socks to wear with my new shoes.',
      ru: 'Я купил ещё и носки, чтобы надеть новые туфли.',
    },
  ),

  ...blank(
    'gp_s3_u1_g2_08',
    G2,
    '서울에서 살려고 집을 알아보고 있어요.',
    '살려고',
    {
      uz: 'Seulda yashash uchun uy qidiryapman.',
      en: 'I am looking for a place to live in Seoul.',
      ru: 'Я ищу жильё, чтобы жить в Сеуле.',
    },
  ),

  ...blank('gp_s3_u1_g2_09', G2, '선물을 만들려고 재료를 샀어요.', '만들려고', {
    uz: 'Sovg‘a tayyorlash uchun material sotib oldim.',
    en: 'I bought materials to make a gift.',
    ru: 'Я купил материалы, чтобы сделать подарок.',
  }),

  ...blank(
    'gp_s3_u1_g2_10',
    G2,
    '주말에 쉬려고 오늘 일을 다 끝냈어요.',
    '쉬려고',
    {
      uz: 'Dam olish kunlari dam olish uchun bugun ishni tugatdim.',
      en: 'I finished all my work today so I can rest this weekend.',
      ru: 'Я закончил сегодня всю работу, чтобы отдохнуть на выходных.',
    },
  ),

  // ═══════════════════════════════════════════
  // grammar_build 10
  // ═══════════════════════════════════════════

  ...build(
    'gp_s3_u1_g2_11',
    G2,
    [
      {
        options: ['한국어를', '한국어가', '한국어는'],
        correct: '한국어를',
      },
      {
        options: ['배우려고', '가르치려고', '만나려고'],
        correct: '배우려고',
      },
      {
        options: ['한국에', '한국에서', '한국까지'],
        correct: '한국에',
      },
      {
        options: ['왔어요.', '먹었어요.', '읽었어요.'],
        correct: '왔어요.',
      },
    ],
    {
      uz: 'Koreys tilini o‘rganish uchun Koreyaga keldim.',
      en: 'I came to Korea to learn Korean.',
      ru: 'Я приехал в Корею, чтобы учить корейский язык.',
    },
  ),

  ...build(
    'gp_s3_u1_g2_12',
    G2,
    [
      {
        options: ['친구를', '친구가', '친구는'],
        correct: '친구를',
      },
      {
        options: ['만나려고', '먹으려고', '읽으려고'],
        correct: '만나려고',
      },
      {
        options: ['카페에', '카페에서', '카페를'],
        correct: '카페에',
      },
      {
        options: ['갔어요.', '잤어요.', '입었어요.'],
        correct: '갔어요.',
      },
    ],
    {
      uz: 'Do‘stim bilan uchrashish uchun kafega bordim.',
      en: 'I went to a cafe to meet my friend.',
      ru: 'Я пошёл в кафе, чтобы встретиться с другом.',
    },
  ),

  ...build(
    'gp_s3_u1_g2_13',
    G2,
    [
      {
        options: ['책을', '책이', '책은'],
        correct: '책을',
      },
      {
        options: ['읽으려고', '먹으려고', '찾으려고'],
        correct: '읽으려고',
        hints: {
          먹으려고: '책은 먹는 것이 아니라 읽는 것이 자연스러워요.',
          찾으려고: '문장의 목적은 책을 읽는 것이에요.',
        },
      },
      {
        options: ['도서관에', '도서관을', '도서관이'],
        correct: '도서관에',
      },
      {
        options: ['갔어요.', '만났어요.', '샀어요.'],
        correct: '갔어요.',
      },
    ],
    {
      uz: 'Kitob o‘qish uchun kutubxonaga bordim.',
      en: 'I went to the library to read a book.',
      ru: 'Я пошёл в библиотеку, чтобы почитать книгу.',
    },
  ),

  ...build(
    'gp_s3_u1_g2_14',
    G2,
    [
      {
        options: ['사진을', '사진이', '사진은'],
        correct: '사진을',
      },
      {
        options: ['찍으려고', '읽으려고', '입으려고'],
        correct: '찍으려고',
      },
      {
        options: ['카메라를', '카메라가', '카메라는'],
        correct: '카메라를',
      },
      {
        options: ['가져왔어요.', '먹었어요.', '배웠어요.'],
        correct: '가져왔어요.',
      },
    ],
    {
      uz: 'Suratga olish uchun kamera olib keldim.',
      en: 'I brought a camera to take pictures.',
      ru: 'Я принёс фотоаппарат, чтобы фотографировать.',
    },
  ),

  ...build(
    'gp_s3_u1_g2_15',
    G2,
    [
      {
        options: ['김밥을', '김밥이', '김밥은'],
        correct: '김밥을',
      },
      {
        options: ['먹으려고', '읽으려고', '신으려고'],
        correct: '먹으려고',
      },
      {
        options: ['식당에', '식당을', '식당이'],
        correct: '식당에',
      },
      {
        options: ['들어갔어요.', '읽었어요.', '입었어요.'],
        correct: '들어갔어요.',
      },
    ],
    {
      uz: 'Kimbap yeyish uchun restoranga kirdim.',
      en: 'I went into the restaurant to eat gimbap.',
      ru: 'Я зашёл в ресторан, чтобы поесть кимпап.',
    },
  ),

  ...build(
    'gp_s3_u1_g2_16',
    G2,
    [
      {
        options: ['운동하려고', '공부하려고', '요리하려고'],
        correct: '운동하려고',
      },
      {
        options: ['아침에', '아침을', '아침이'],
        correct: '아침에',
      },
      {
        options: ['일찍', '매운', '작은'],
        correct: '일찍',
      },
      {
        options: ['일어났어요.', '먹었어요.', '샀어요.'],
        correct: '일어났어요.',
      },
    ],
    {
      uz: 'Mashq qilish uchun ertalab erta turdim.',
      en: 'I got up early in the morning to exercise.',
      ru: 'Я рано встал утром, чтобы позаниматься спортом.',
    },
  ),

  ...build(
    'gp_s3_u1_g2_17',
    G2,
    [
      {
        options: ['서울에서', '서울에', '서울을'],
        correct: '서울에서',
      },
      {
        options: ['살려고', '놀려고', '팔려고'],
        correct: '살려고',
      },
      {
        options: ['집을', '집이', '집은'],
        correct: '집을',
      },
      {
        options: ['찾고 있어요.', '먹고 있어요.', '입고 있어요.'],
        correct: '찾고 있어요.',
      },
    ],
    {
      uz: 'Seulda yashash uchun uy qidiryapman.',
      en: 'I am looking for a house to live in Seoul.',
      ru: 'Я ищу дом, чтобы жить в Сеуле.',
    },
  ),

  ...build(
    'gp_s3_u1_g2_18',
    G2,
    [
      {
        options: ['선물을', '선물이', '선물은'],
        correct: '선물을',
      },
      {
        options: ['만들려고', '살려고', '놀려고'],
        correct: '만들려고',
      },
      {
        options: ['재료를', '재료가', '재료는'],
        correct: '재료를',
      },
      {
        options: ['샀어요.', '만났어요.', '잤어요.'],
        correct: '샀어요.',
      },
    ],
    {
      uz: 'Sovg‘a tayyorlash uchun material sotib oldim.',
      en: 'I bought materials to make a gift.',
      ru: 'Я купил материалы, чтобы сделать подарок.',
    },
  ),

  ...build(
    'gp_s3_u1_g2_19',
    G2,
    [
      {
        options: ['주말에', '주말을', '주말이'],
        correct: '주말에',
      },
      {
        options: ['쉬려고', '마시려고', '입으려고'],
        correct: '쉬려고',
      },
      {
        options: ['오늘', '깨끗한', '빠른'],
        correct: '오늘',
      },
      {
        options: ['일을', '일이', '일은'],
        correct: '일을',
      },
      {
        options: ['끝냈어요.', '마셨어요.', '입었어요.'],
        correct: '끝냈어요.',
      },
    ],
    {
      uz: 'Dam olish kunlari dam olish uchun bugun ishni tugatdim.',
      en: 'I finished my work today so I can rest this weekend.',
      ru: 'Я закончил сегодня работу, чтобы отдохнуть на выходных.',
    },
  ),

  ...build(
    'gp_s3_u1_g2_20',
    G2,
    [
      {
        options: ['한국', '친구', '주말'],
        correct: '한국',
      },
      {
        options: ['음식을', '음식이', '음식은'],
        correct: '음식을',
      },
      {
        options: ['배우려고', '만들려고', '살려고'],
        correct: '만들려고',
      },
      {
        options: ['요리', '운동', '여행'],
        correct: '요리',
      },
      {
        options: ['수업을', '수업이', '수업은'],
        correct: '수업을',
      },
      {
        options: ['들어요.', '가요.', '자요.'],
        correct: '들어요.',
      },
    ],
    {
      uz: 'Koreys taomlarini tayyorlashni o‘rganish uchun pazandachilik darsiga qatnayman.',
      en: 'I take a cooking class to learn how to make Korean food.',
      ru: 'Я хожу на кулинарные занятия, чтобы научиться готовить корейскую еду.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 3. V-거나
// 동사 어간 + 거나
// 두 가지 이상의 행동 중 하나를 선택하거나
// 가능한 행동을 나열할 때 사용
// ─────────────────────────────────────────────
const G3 = 'verb-geona';

const G3_Q = {
  // ═══════════════════════════════════════════
  // grammar_blank 10
  // ═══════════════════════════════════════════

  ...blank('gp_s3_u1_g3_01', G3, '주말에는 영화를 보거나 운동해요.', '보거나', {
    uz: 'Dam olish kunlari kino ko‘raman yoki sport bilan shug‘ullanaman.',
    en: 'On weekends, I watch movies or exercise.',
    ru: 'По выходным я смотрю фильмы или занимаюсь спортом.',
  }),

  ...blank(
    'gp_s3_u1_g3_02',
    G3,
    '저녁에는 책을 읽거나 음악을 들어요.',
    '읽거나',
    {
      uz: 'Kechqurun kitob o‘qiyman yoki musiqa tinglayman.',
      en: 'In the evening, I read a book or listen to music.',
      ru: 'По вечерам я читаю книги или слушаю музыку.',
    },
  ),

  ...blank('gp_s3_u1_g3_03', G3, '친구를 만나거나 집에서 쉬어요.', '만나거나', {
    uz: 'Do‘stim bilan uchrashaman yoki uyda dam olaman.',
    en: 'I meet friends or rest at home.',
    ru: 'Я встречаюсь с друзьями или отдыхаю дома.',
  }),

  ...blank(
    'gp_s3_u1_g3_04',
    G3,
    '아침에는 커피를 마시거나 차를 마셔요.',
    '마시거나',
    {
      uz: 'Ertalab qahva yoki choy ichaman.',
      en: 'In the morning, I drink coffee or tea.',
      ru: 'По утрам я пью кофе или чай.',
    },
  ),

  ...blank(
    'gp_s3_u1_g3_05',
    G3,
    '학교에는 버스를 타거나 지하철을 타고 가요.',
    '타거나',
    {
      uz: 'Maktabga avtobusda yoki metroda boraman.',
      en: 'I go to school by bus or subway.',
      ru: 'Я езжу в школу на автобусе или метро.',
    },
  ),

  ...blank(
    'gp_s3_u1_g3_06',
    G3,
    '시간이 있으면 요리하거나 산책해요.',
    '요리하거나',
    {
      uz: 'Vaqtim bo‘lsa ovqat pishiraman yoki sayr qilaman.',
      en: 'When I have time, I cook or take a walk.',
      ru: 'Когда есть время, я готовлю или гуляю.',
    },
  ),

  ...blank(
    'gp_s3_u1_g3_07',
    G3,
    '방학에는 여행하거나 고향에 가요.',
    '여행하거나',
    {
      uz: 'Ta’tilda sayohat qilaman yoki tug‘ilgan shahrimga boraman.',
      en: 'During vacation, I travel or go to my hometown.',
      ru: 'На каникулах я путешествую или еду в родной город.',
    },
  ),

  ...blank(
    'gp_s3_u1_g3_08',
    G3,
    '모르는 단어는 사전에서 찾거나 선생님께 물어봐요.',
    '찾거나',
    {
      uz: 'Bilmagan so‘zimni lug‘atdan qidiraman yoki o‘qituvchidan so‘rayman.',
      en: 'I look up unfamiliar words in a dictionary or ask my teacher.',
      ru: 'Незнакомые слова я ищу в словаре или спрашиваю у преподавателя.',
    },
  ),

  ...blank(
    'gp_s3_u1_g3_09',
    G3,
    '날씨가 좋으면 자전거를 타거나 공원에서 걸어요.',
    '타거나',
    {
      uz: 'Ob-havo yaxshi bo‘lsa velosiped minaman yoki bog‘da yuraman.',
      en: 'When the weather is nice, I ride a bicycle or walk in the park.',
      ru: 'Когда погода хорошая, я катаюсь на велосипеде или гуляю в парке.',
    },
  ),

  ...blank(
    'gp_s3_u1_g3_10',
    G3,
    '한국어를 연습할 때 드라마를 보거나 한국 친구와 이야기해요.',
    '보거나',
    {
      uz: 'Koreys tilini mashq qilganda drama ko‘raman yoki koreys do‘stim bilan gaplashaman.',
      en: 'When I practice Korean, I watch dramas or talk with Korean friends.',
      ru: 'Когда я практикую корейский, я смотрю дорамы или разговариваю с корейскими друзьями.',
    },
  ),

  // ═══════════════════════════════════════════
  // grammar_build 10
  // ═══════════════════════════════════════════

  ...build(
    'gp_s3_u1_g3_11',
    G3,
    [
      {
        options: ['주말에는', '평일에는', '아침에는'],
        correct: '주말에는',
      },
      {
        options: ['영화를', '음악을', '책을'],
        correct: '영화를',
      },
      {
        options: ['보거나', '보려고', '보고'],
        correct: '보거나',
        hints: {
          보려고: "두 행동 중 하나를 말할 때는 '-거나'를 사용해요.",
          보고: "'-고'는 단순 연결이고, 여기서는 '또는'이라는 선택 의미가 필요해요.",
        },
      },
      {
        options: ['운동해요.', '공부해요.', '요리해요.'],
        correct: '운동해요.',
      },
    ],
    {
      uz: 'Dam olish kunlari kino ko‘raman yoki sport bilan shug‘ullanaman.',
      en: 'On weekends, I watch movies or exercise.',
      ru: 'По выходным я смотрю фильмы или занимаюсь спортом.',
    },
  ),

  ...build(
    'gp_s3_u1_g3_12',
    G3,
    [
      {
        options: ['저녁에는', '아침에는', '점심에는'],
        correct: '저녁에는',
      },
      {
        options: ['책을', '영화를', '사진을'],
        correct: '책을',
      },
      {
        options: ['읽거나', '읽으려고', '읽고'],
        correct: '읽거나',
        hints: {
          읽으려고: "'-(으)려고'는 목적을 나타내요.",
          읽고: "여기서는 두 가지 활동 중 하나를 말하므로 '-거나'가 맞아요.",
        },
      },
      {
        options: ['음악을', '커피를', '운동을'],
        correct: '음악을',
      },
      {
        options: ['들어요.', '마셔요.', '해요.'],
        correct: '들어요.',
      },
    ],
    {
      uz: 'Kechqurun kitob o‘qiyman yoki musiqa tinglayman.',
      en: 'In the evening, I read a book or listen to music.',
      ru: 'По вечерам я читаю книгу или слушаю музыку.',
    },
  ),

  ...build(
    'gp_s3_u1_g3_13',
    G3,
    [
      {
        options: ['친구를', '음식을', '운동을'],
        correct: '친구를',
      },
      {
        options: ['만나거나', '만나려고', '만나고'],
        correct: '만나거나',
        hints: {
          만나려고: "'-(으)려고'는 뒤 행동의 목적을 나타낼 때 사용해요.",
          만나고: "선택을 나타내는 문장이므로 '-거나'가 필요해요.",
        },
      },
      {
        options: ['집에서', '학교를', '카페가'],
        correct: '집에서',
      },
      {
        options: ['쉬어요.', '읽어요.', '만나요.'],
        correct: '쉬어요.',
      },
    ],
    {
      uz: 'Do‘stim bilan uchrashaman yoki uyda dam olaman.',
      en: 'I meet a friend or rest at home.',
      ru: 'Я встречаюсь с другом или отдыхаю дома.',
    },
  ),

  ...build(
    'gp_s3_u1_g3_14',
    G3,
    [
      {
        options: ['아침에는', '주말에는', '밤에는'],
        correct: '아침에는',
      },
      {
        options: ['커피를', '김밥을', '책을'],
        correct: '커피를',
      },
      {
        options: ['마시거나', '마시려고', '마시고'],
        correct: '마시거나',
        hints: {
          마시려고: '목적이 아니라 두 음료 중 하나를 선택하는 문장이에요.',
          마시고: "'A하고 B한다'가 아니라 'A 또는 B'라는 의미가 필요해요.",
        },
      },
      {
        options: ['차를', '빵을', '신문을'],
        correct: '차를',
      },
      {
        options: ['마셔요.', '먹어요.', '읽어요.'],
        correct: '마셔요.',
      },
    ],
    {
      uz: 'Ertalab qahva yoki choy ichaman.',
      en: 'In the morning, I drink coffee or tea.',
      ru: 'По утрам я пью кофе или чай.',
    },
  ),

  ...build(
    'gp_s3_u1_g3_15',
    G3,
    [
      {
        options: ['학교에는', '학교에서', '학교를'],
        correct: '학교에는',
      },
      {
        options: ['버스를', '버스가', '버스는'],
        correct: '버스를',
      },
      {
        options: ['타거나', '타려고', '타고'],
        correct: '타거나',
        hints: {
          타려고: '교통수단을 타는 목적을 말하는 문장이 아니에요.',
          타고: '여기서는 버스와 지하철 중 하나를 선택하는 의미예요.',
        },
      },
      {
        options: ['지하철을', '지하철이', '지하철은'],
        correct: '지하철을',
      },
      {
        options: ['타고 가요.', '읽고 가요.', '먹고 가요.'],
        correct: '타고 가요.',
      },
    ],
    {
      uz: 'Maktabga avtobusda yoki metroda boraman.',
      en: 'I go to school by bus or subway.',
      ru: 'Я езжу в школу на автобусе или метро.',
    },
  ),

  ...build(
    'gp_s3_u1_g3_16',
    G3,
    [
      {
        options: ['시간이 있으면', '비가 오면', '수업이 끝나면'],
        correct: '시간이 있으면',
      },
      {
        options: ['요리하거나', '요리하려고', '요리하고'],
        correct: '요리하거나',
        hints: {
          요리하려고:
            '뒤 행동을 위한 목적이 아니라 가능한 활동을 나열하고 있어요.',
          요리하고: '두 행동 가운데 하나를 할 수 있다는 선택 의미가 필요해요.',
        },
      },
      {
        options: ['산책해요.', '출근해요.', '숙제예요.'],
        correct: '산책해요.',
      },
    ],
    {
      uz: 'Vaqtim bo‘lsa ovqat pishiraman yoki sayr qilaman.',
      en: 'When I have time, I cook or take a walk.',
      ru: 'Когда есть время, я готовлю или гуляю.',
    },
  ),

  ...build(
    'gp_s3_u1_g3_17',
    G3,
    [
      {
        options: ['방학에는', '수업에는', '회사에는'],
        correct: '방학에는',
      },
      {
        options: ['여행하거나', '여행하려고', '여행하고'],
        correct: '여행하거나',
        hints: {
          여행하려고: '목적이 아니라 방학에 하는 두 가지 활동을 말하고 있어요.',
          여행하고: "'또는'의 의미를 만들려면 '-거나'가 필요해요.",
        },
      },
      {
        options: ['고향에', '고향에서', '고향을'],
        correct: '고향에',
      },
      {
        options: ['가요.', '먹어요.', '읽어요.'],
        correct: '가요.',
      },
    ],
    {
      uz: 'Ta’tilda sayohat qilaman yoki tug‘ilgan shahrimga boraman.',
      en: 'During vacation, I travel or go to my hometown.',
      ru: 'На каникулах я путешествую или еду в родной город.',
    },
  ),

  ...build(
    'gp_s3_u1_g3_18',
    G3,
    [
      {
        options: ['모르는 단어는', '좋아하는 음식은', '새로운 친구는'],
        correct: '모르는 단어는',
      },
      {
        options: ['사전에서', '사전을', '사전이'],
        correct: '사전에서',
      },
      {
        options: ['찾거나', '찾으려고', '찾고'],
        correct: '찾거나',
        hints: {
          찾으려고: '목적을 나타내는 문장이 아니라 해결 방법 두 가지를 말해요.',
          찾고: "사전 검색 또는 선생님께 질문이라는 선택이므로 '-거나'가 맞아요.",
        },
      },
      {
        options: ['선생님께', '선생님을', '선생님이'],
        correct: '선생님께',
      },
      {
        options: ['물어봐요.', '기다려요.', '소개해요.'],
        correct: '물어봐요.',
      },
    ],
    {
      uz: 'Bilmagan so‘zimni lug‘atdan qidiraman yoki o‘qituvchidan so‘rayman.',
      en: 'I look up unfamiliar words in a dictionary or ask my teacher.',
      ru: 'Незнакомые слова я ищу в словаре или спрашиваю у преподавателя.',
    },
  ),

  ...build(
    'gp_s3_u1_g3_19',
    G3,
    [
      {
        options: ['날씨가 좋으면', '날씨가 추우면', '비가 많이 오면'],
        correct: '날씨가 좋으면',
      },
      {
        options: ['자전거를', '지하철을', '책을'],
        correct: '자전거를',
      },
      {
        options: ['타거나', '타려고', '타고'],
        correct: '타거나',
        hints: {
          타려고: '목적을 나타내는 상황이 아니에요.',
          타고: "자전거를 타는 것과 걷는 것 중 하나를 말하므로 '-거나'가 맞아요.",
        },
      },
      {
        options: ['공원에서', '공원을', '공원이'],
        correct: '공원에서',
      },
      {
        options: ['걸어요.', '먹어요.', '읽어요.'],
        correct: '걸어요.',
      },
    ],
    {
      uz: 'Ob-havo yaxshi bo‘lsa velosiped minaman yoki bog‘da yuraman.',
      en: 'When the weather is nice, I ride a bicycle or walk in the park.',
      ru: 'Когда погода хорошая, я катаюсь на велосипеде или гуляю в парке.',
    },
  ),

  ...build(
    'gp_s3_u1_g3_20',
    G3,
    [
      {
        options: ['한국어를', '한국어가', '한국어는'],
        correct: '한국어를',
      },
      {
        options: ['연습할 때', '연습한 후', '연습하려고'],
        correct: '연습할 때',
      },
      {
        options: ['드라마를', '드라마가', '드라마는'],
        correct: '드라마를',
      },
      {
        options: ['보거나', '보려고', '보고'],
        correct: '보거나',
        hints: {
          보려고:
            '드라마를 보는 목적을 말하는 것이 아니라 연습 방법을 선택하고 있어요.',
          보고: "두 가지 연습 방법 중 하나라는 의미에는 '-거나'가 맞아요.",
        },
      },
      {
        options: ['한국 친구와', '한국 친구를', '한국 친구가'],
        correct: '한국 친구와',
      },
      {
        options: ['이야기해요.', '기다려요.', '운전해요.'],
        correct: '이야기해요.',
      },
    ],
    {
      uz: 'Koreys tilini mashq qilganda drama ko‘raman yoki koreys do‘stim bilan gaplashaman.',
      en: 'When I practice Korean, I watch dramas or talk with Korean friends.',
      ru: 'Когда я практикую корейский, я смотрю дорамы или разговариваю с корейскими друзьями.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 4. N(이)나 1
// 받침 O → N이나
// 받침 X → N나
// 두 명사 가운데 하나를 선택하거나
// 가능한 대안을 제시할 때 사용
// ─────────────────────────────────────────────
const G4 = 'noun-ina-choice';

const G4_Q = {
  // ═══════════════════════════════════════════
  // grammar_blank 10
  // ═══════════════════════════════════════════

  ...blank(
    'gp_s3_u1_g4_01',
    G4,
    '아침에는 빵이나 과일을 먹어요.',
    '빵이나 과일',
    {
      uz: 'Ertalab non yoki meva yeyman.',
      en: 'I eat bread or fruit in the morning.',
      ru: 'По утрам я ем хлеб или фрукты.',
    },
  ),

  ...blank('gp_s3_u1_g4_02', G4, '저녁에는 커피나 차를 마셔요.', '커피나 차', {
    uz: 'Kechqurun qahva yoki choy ichaman.',
    en: 'In the evening, I drink coffee or tea.',
    ru: 'Вечером я пью кофе или чай.',
  }),

  ...blank(
    'gp_s3_u1_g4_03',
    G4,
    '주말에는 영화나 드라마를 봐요.',
    '영화나 드라마',
    {
      uz: 'Dam olish kunlari film yoki drama ko‘raman.',
      en: 'On weekends, I watch movies or dramas.',
      ru: 'По выходным я смотрю фильмы или дорамы.',
    },
  ),

  ...blank(
    'gp_s3_u1_g4_04',
    G4,
    '모르는 단어는 사전이나 인터넷에서 찾아보세요.',
    '사전이나 인터넷',
    {
      uz: 'Bilmagan so‘zni lug‘at yoki internetdan qidiring.',
      en: 'Look up unfamiliar words in a dictionary or on the internet.',
      ru: 'Ищите незнакомые слова в словаре или интернете.',
    },
  ),

  ...blank(
    'gp_s3_u1_g4_05',
    G4,
    '점심에는 김밥이나 비빔밥을 먹고 싶어요.',
    '김밥이나 비빔밥',
    {
      uz: 'Tushlikda kimbap yoki bibimbap yemoqchiman.',
      en: 'I want to eat gimbap or bibimbap for lunch.',
      ru: 'На обед я хочу съесть кимпап или пибимпап.',
    },
  ),

  ...blank(
    'gp_s3_u1_g4_06',
    G4,
    '토요일이나 일요일에 만나요.',
    '토요일이나 일요일',
    {
      uz: 'Shanba yoki yakshanba kuni uchrashamiz.',
      en: 'Let’s meet on Saturday or Sunday.',
      ru: 'Давайте встретимся в субботу или воскресенье.',
    },
  ),

  ...blank(
    'gp_s3_u1_g4_07',
    G4,
    '학교에는 버스나 지하철로 가요.',
    '버스나 지하철',
    {
      uz: 'Maktabga avtobus yoki metroda boraman.',
      en: 'I go to school by bus or subway.',
      ru: 'Я езжу в школу на автобусе или метро.',
    },
  ),

  ...blank(
    'gp_s3_u1_g4_08',
    G4,
    '생일에는 책이나 옷을 선물하고 싶어요.',
    '책이나 옷',
    {
      uz: 'Tug‘ilgan kunga kitob yoki kiyim sovg‘a qilmoqchiman.',
      en: 'I want to give a book or clothes as a birthday present.',
      ru: 'На день рождения я хочу подарить книгу или одежду.',
    },
  ),

  ...blank(
    'gp_s3_u1_g4_09',
    G4,
    '방학에는 제주도나 부산에 가고 싶어요.',
    '제주도나 부산',
    {
      uz: 'Ta’tilda Jeju yoki Busanga bormoqchiman.',
      en: 'I want to go to Jeju or Busan during vacation.',
      ru: 'На каникулах я хочу поехать на Чеджудо или в Пусан.',
    },
  ),

  ...blank(
    'gp_s3_u1_g4_10',
    G4,
    '시간이 있으면 친구나 가족과 같이 산책해요.',
    '친구나 가족',
    {
      uz: 'Vaqtim bo‘lsa do‘stim yoki oilam bilan sayr qilaman.',
      en: 'When I have time, I take a walk with a friend or family.',
      ru: 'Когда есть время, я гуляю с другом или семьёй.',
    },
  ),

  // ═══════════════════════════════════════════
  // grammar_build 10
  // ═══════════════════════════════════════════

  ...build(
    'gp_s3_u1_g4_11',
    G4,
    [
      {
        options: ['아침에는', '밤에는', '수업에는'],
        correct: '아침에는',
      },
      {
        options: ['빵이나', '빵나', '빵이나를'],
        correct: '빵이나',
        hints: {
          빵나: "받침 있는 '빵' 뒤에는 '이나'를 써요.",
          빵이나를:
            "'이나' 뒤에 다시 목적격 조사를 붙이지 않고 뒤의 마지막 명사에 조사가 붙어요.",
        },
      },
      {
        options: ['과일을', '과일이', '과일은'],
        correct: '과일을',
      },
      {
        options: ['먹어요.', '마셔요.', '읽어요.'],
        correct: '먹어요.',
      },
    ],
    {
      uz: 'Ertalab non yoki meva yeyman.',
      en: 'I eat bread or fruit in the morning.',
      ru: 'По утрам я ем хлеб или фрукты.',
    },
  ),

  ...build(
    'gp_s3_u1_g4_12',
    G4,
    [
      {
        options: ['저는', '친구가', '동생을'],
        correct: '저는',
      },
      {
        options: ['커피나', '커피이나', '커피를나'],
        correct: '커피나',
        hints: {
          커피이나: "받침 없는 '커피' 뒤에는 '나'를 써요.",
          커피를나: "선택 조사 '나'는 명사 바로 뒤에 붙여요.",
        },
      },
      {
        options: ['차를', '차가', '차는'],
        correct: '차를',
      },
      {
        options: ['마셔요.', '먹어요.', '입어요.'],
        correct: '마셔요.',
      },
    ],
    {
      uz: 'Men qahva yoki choy ichaman.',
      en: 'I drink coffee or tea.',
      ru: 'Я пью кофе или чай.',
    },
  ),

  ...build(
    'gp_s3_u1_g4_13',
    G4,
    [
      {
        options: ['주말에는', '학교에는', '아침에는'],
        correct: '주말에는',
      },
      {
        options: ['영화나', '영화이나', '영화를나'],
        correct: '영화나',
        hints: {
          영화이나: "받침 없는 '영화' 뒤에는 '나'가 맞아요.",
          영화를나: "'나'는 목적격 조사 뒤가 아니라 명사 바로 뒤에 붙어요.",
        },
      },
      {
        options: ['드라마를', '드라마가', '드라마에'],
        correct: '드라마를',
      },
      {
        options: ['봐요.', '먹어요.', '가요.'],
        correct: '봐요.',
      },
    ],
    {
      uz: 'Dam olish kunlari film yoki drama ko‘raman.',
      en: 'On weekends, I watch movies or dramas.',
      ru: 'По выходным я смотрю фильмы или дорамы.',
    },
  ),

  ...build(
    'gp_s3_u1_g4_14',
    G4,
    [
      {
        options: ['모르는', '맛있는', '바쁜'],
        correct: '모르는',
      },
      {
        options: ['단어는', '단어를', '단어가'],
        correct: '단어는',
      },
      {
        options: ['사전이나', '사전나', '사전을이나'],
        correct: '사전이나',
        hints: {
          사전나: "받침 있는 '사전' 뒤에는 '이나'를 써요.",
          사전을이나: "'이나'는 명사에 직접 붙여요.",
        },
      },
      {
        options: ['인터넷에서', '인터넷을', '인터넷이'],
        correct: '인터넷에서',
      },
      {
        options: ['찾아보세요.', '먹어보세요.', '입어보세요.'],
        correct: '찾아보세요.',
      },
    ],
    {
      uz: 'Bilmagan so‘zni lug‘at yoki internetdan qidiring.',
      en: 'Look up unfamiliar words in a dictionary or on the internet.',
      ru: 'Ищите незнакомые слова в словаре или интернете.',
    },
  ),

  ...build(
    'gp_s3_u1_g4_15',
    G4,
    [
      {
        options: ['점심에는', '아침에는', '저녁에는'],
        correct: '점심에는',
      },
      {
        options: ['김밥이나', '김밥나', '김밥을이나'],
        correct: '김밥이나',
        hints: {
          김밥나: "받침 있는 '김밥' 뒤에는 '이나'를 사용해요.",
          김밥을이나: "'이나' 앞에는 목적격 조사 '을'을 붙이지 않아요.",
        },
      },
      {
        options: ['비빔밥을', '비빔밥이', '비빔밥은'],
        correct: '비빔밥을',
      },
      {
        options: ['먹고 싶어요.', '보고 싶어요.', '입고 싶어요.'],
        correct: '먹고 싶어요.',
      },
    ],
    {
      uz: 'Tushlikda kimbap yoki bibimbap yemoqchiman.',
      en: 'I want to eat gimbap or bibimbap for lunch.',
      ru: 'На обед я хочу съесть кимпап или пибимпап.',
    },
  ),

  ...build(
    'gp_s3_u1_g4_16',
    G4,
    [
      {
        options: ['토요일이나', '토요일나', '토요일을이나'],
        correct: '토요일이나',
        hints: {
          토요일나: "ㄹ 받침이 있는 '토요일' 뒤에는 '이나'를 써요.",
          토요일을이나: "'이나'는 명사 바로 뒤에 붙어요.",
        },
      },
      {
        options: ['일요일에', '일요일을', '일요일이'],
        correct: '일요일에',
      },
      {
        options: ['만나요.', '먹어요.', '읽어요.'],
        correct: '만나요.',
      },
    ],
    {
      uz: 'Shanba yoki yakshanba kuni uchrashamiz.',
      en: 'Let’s meet on Saturday or Sunday.',
      ru: 'Давайте встретимся в субботу или воскресенье.',
    },
  ),

  ...build(
    'gp_s3_u1_g4_17',
    G4,
    [
      {
        options: ['학교에는', '학교에서', '학교를'],
        correct: '학교에는',
      },
      {
        options: ['버스나', '버스이나', '버스를나'],
        correct: '버스나',
        hints: {
          버스이나: "받침 없는 '버스' 뒤에는 '나'를 써요.",
          버스를나: "선택 조사 '나'는 명사 바로 뒤에 붙어요.",
        },
      },
      {
        options: ['지하철로', '지하철이', '지하철을'],
        correct: '지하철로',
      },
      {
        options: ['가요.', '먹어요.', '자요.'],
        correct: '가요.',
      },
    ],
    {
      uz: 'Maktabga avtobus yoki metroda boraman.',
      en: 'I go to school by bus or subway.',
      ru: 'Я езжу в школу на автобусе или метро.',
    },
  ),

  ...build(
    'gp_s3_u1_g4_18',
    G4,
    [
      {
        options: ['생일에는', '회사에는', '수업에는'],
        correct: '생일에는',
      },
      {
        options: ['책이나', '책나', '책을이나'],
        correct: '책이나',
        hints: {
          책나: "받침 있는 '책' 뒤에는 '이나'를 써요.",
          책을이나: "'이나' 앞에 '을'을 먼저 붙이지 않아요.",
        },
      },
      {
        options: ['옷을', '옷이', '옷은'],
        correct: '옷을',
      },
      {
        options: ['선물하고 싶어요.', '마시고 싶어요.', '자고 싶어요.'],
        correct: '선물하고 싶어요.',
      },
    ],
    {
      uz: 'Tug‘ilgan kunga kitob yoki kiyim sovg‘a qilmoqchiman.',
      en: 'I want to give a book or clothes as a birthday present.',
      ru: 'На день рождения я хочу подарить книгу или одежду.',
    },
  ),

  ...build(
    'gp_s3_u1_g4_19',
    G4,
    [
      {
        options: ['방학에는', '평일에는', '수업에는'],
        correct: '방학에는',
      },
      {
        options: ['제주도나', '제주도이나', '제주도를나'],
        correct: '제주도나',
        hints: {
          제주도이나: "받침 없는 '제주도' 뒤에는 '나'를 써요.",
          제주도를나: "'나'는 명사 바로 뒤에 붙여요.",
        },
      },
      {
        options: ['부산에', '부산을', '부산이'],
        correct: '부산에',
      },
      {
        options: ['가고 싶어요.', '먹고 싶어요.', '입고 싶어요.'],
        correct: '가고 싶어요.',
      },
    ],
    {
      uz: 'Ta’tilda Jeju yoki Busanga bormoqchiman.',
      en: 'I want to go to Jeju or Busan during vacation.',
      ru: 'На каникулах я хочу поехать на Чеджудо или в Пусан.',
    },
  ),

  ...build(
    'gp_s3_u1_g4_20',
    G4,
    [
      {
        options: ['시간이 있으면', '비가 오면', '늦으면'],
        correct: '시간이 있으면',
      },
      {
        options: ['친구나', '친구이나', '친구를나'],
        correct: '친구나',
        hints: {
          친구이나: "받침 없는 '친구' 뒤에는 '나'를 써요.",
          친구를나: "'나'는 목적격 조사 뒤가 아니라 명사 바로 뒤에 붙어요.",
        },
      },
      {
        options: ['가족과', '가족을', '가족이'],
        correct: '가족과',
      },
      {
        options: ['같이', '아주', '먼'],
        correct: '같이',
      },
      {
        options: ['산책해요.', '출근해요.', '공부예요.'],
        correct: '산책해요.',
      },
    ],
    {
      uz: 'Vaqtim bo‘lsa do‘stim yoki oilam bilan birga sayr qilaman.',
      en: 'When I have time, I take a walk with a friend or family.',
      ru: 'Когда есть время, я гуляю с другом или семьёй.',
    },
  ),
};

// ═══════════════════════════════════════════════════════════
// UNIT 2
// 취미 · 할 줄 아는 것 · 경험 설명
// ═══════════════════════════════════════════════════════════

// ─────────────────────────────────────────────
// 문법 5. V-는 것
// 동사 어간 + 는 것
// ㄹ 받침 → ㄹ 탈락 + 는 것
// 행동을 하나의 명사처럼 만들어
// 취미·좋아하는 활동·행동 자체를 말할 때 사용
// ─────────────────────────────────────────────
const G5 = 'verb-neun-geot';

const G5_Q = {
  // ═══════════════════════════════════════════
  // grammar_blank 10
  // ═══════════════════════════════════════════

  ...blank(
    'gp_s3_u2_g5_01',
    G5,
    '제 취미는 음악을 듣는 것이에요.',
    '음악을 듣는 것',
    {
      uz: 'Mening sevimli mashg‘ulotim musiqa tinglash.',
      en: 'My hobby is listening to music.',
      ru: 'Моё хобби — слушать музыку.',
    },
  ),

  ...blank(
    'gp_s3_u2_g5_02',
    G5,
    '저는 책을 읽는 것을 좋아해요.',
    '책을 읽는 것',
    {
      uz: 'Men kitob o‘qishni yaxshi ko‘raman.',
      en: 'I like reading books.',
      ru: 'Я люблю читать книги.',
    },
  ),

  ...blank(
    'gp_s3_u2_g5_03',
    G5,
    '민수 씨는 사진을 찍는 것을 좋아해요.',
    '사진을 찍는 것',
    {
      uz: 'Minsu suratga olishni yaxshi ko‘radi.',
      en: 'Minsu likes taking pictures.',
      ru: 'Минсу любит фотографировать.',
    },
  ),

  ...blank(
    'gp_s3_u2_g5_04',
    G5,
    '저는 주말에 요리하는 것을 좋아해요.',
    '요리하는 것',
    {
      uz: 'Men dam olish kunlari ovqat pishirishni yaxshi ko‘raman.',
      en: 'I like cooking on weekends.',
      ru: 'По выходным я люблю готовить.',
    },
  ),

  ...blank(
    'gp_s3_u2_g5_05',
    G5,
    '아침에 운동하는 것은 건강에 좋아요.',
    '운동하는 것',
    {
      uz: 'Ertalab mashq qilish sog‘liq uchun foydali.',
      en: 'Exercising in the morning is good for your health.',
      ru: 'Заниматься спортом по утрам полезно для здоровья.',
    },
  ),

  ...blank(
    'gp_s3_u2_g5_06',
    G5,
    '외국어를 배우는 것은 재미있어요.',
    '외국어를 배우는 것',
    {
      uz: 'Chet tilini o‘rganish qiziqarli.',
      en: 'Learning a foreign language is interesting.',
      ru: 'Учить иностранный язык интересно.',
    },
  ),

  ...blank(
    'gp_s3_u2_g5_07',
    G5,
    '친구들과 여행하는 것을 정말 좋아해요.',
    '친구들과 여행하는 것',
    {
      uz: 'Men do‘stlarim bilan sayohat qilishni juda yaxshi ko‘raman.',
      en: 'I really like traveling with my friends.',
      ru: 'Я очень люблю путешествовать с друзьями.',
    },
  ),

  ...blank(
    'gp_s3_u2_g5_08',
    G5,
    '한국 드라마를 보는 것이 제 취미예요.',
    '한국 드라마를 보는 것',
    {
      uz: 'Koreys dramalarini ko‘rish mening sevimli mashg‘ulotim.',
      en: 'Watching Korean dramas is my hobby.',
      ru: 'Моё хобби — смотреть корейские дорамы.',
    },
  ),

  ...blank(
    'gp_s3_u2_g5_09',
    G5,
    '주말에 집에서 쉬는 것도 좋아해요.',
    '집에서 쉬는 것',
    {
      uz: 'Dam olish kunlari uyda dam olishni ham yaxshi ko‘raman.',
      en: 'I also like relaxing at home on weekends.',
      ru: 'По выходным я также люблю отдыхать дома.',
    },
  ),

  ...blank(
    'gp_s3_u2_g5_10',
    G5,
    '공원에서 노는 것을 좋아하는 아이들이 많아요.',
    '공원에서 노는 것',
    {
      uz: 'Bog‘da o‘ynashni yaxshi ko‘radigan bolalar ko‘p.',
      en: 'Many children like playing in the park.',
      ru: 'Многие дети любят играть в парке.',
    },
  ),

  // ═══════════════════════════════════════════
  // grammar_build 10
  // ═══════════════════════════════════════════

  ...build(
    'gp_s3_u2_g5_11',
    G5,
    [
      {
        options: ['제', '저를', '제가'],
        correct: '제',
      },
      {
        options: ['취미는', '취미를', '취미가'],
        correct: '취미는',
      },
      {
        options: ['음악을', '음악이', '음악은'],
        correct: '음악을',
      },
      {
        options: ['듣는', '들은', '들을'],
        correct: '듣는',
        hints: {
          들은: "현재의 일반적인 활동을 명사처럼 말할 때는 '듣는 것'을 써요.",
          들을: "'들을 것'은 앞으로의 행동과 연결되는 형태예요.",
        },
      },
      {
        options: ['것이에요.', '사람이에요.', '곳이에요.'],
        correct: '것이에요.',
      },
    ],
    {
      uz: 'Mening sevimli mashg‘ulotim musiqa tinglash.',
      en: 'My hobby is listening to music.',
      ru: 'Моё хобби — слушать музыку.',
    },
  ),

  ...build(
    'gp_s3_u2_g5_12',
    G5,
    [
      {
        options: ['저는', '저를', '제가'],
        correct: '저는',
      },
      {
        options: ['책을', '책이', '책은'],
        correct: '책을',
      },
      {
        options: ['읽는', '읽은', '읽을'],
        correct: '읽는',
        hints: {
          읽은: "'읽은 것'은 이미 읽은 대상을 나타낼 수 있어요. 여기서는 평소 활동을 말해요.",
          읽을: "'읽을 것'은 앞으로 읽을 것이라는 의미가 될 수 있어요.",
        },
      },
      {
        options: ['것을', '사람을', '곳을'],
        correct: '것을',
      },
      {
        options: ['좋아해요.', '만나요.', '마셔요.'],
        correct: '좋아해요.',
      },
    ],
    {
      uz: 'Men kitob o‘qishni yaxshi ko‘raman.',
      en: 'I like reading books.',
      ru: 'Я люблю читать книги.',
    },
  ),

  ...build(
    'gp_s3_u2_g5_13',
    G5,
    [
      {
        options: ['민수 씨는', '민수 씨를', '민수 씨가'],
        correct: '민수 씨는',
      },
      {
        options: ['사진을', '사진이', '사진은'],
        correct: '사진을',
      },
      {
        options: ['찍는', '찍은', '찍을'],
        correct: '찍는',
        hints: {
          찍은: "이미 찍은 사진 자체가 아니라 '사진을 찍는 활동'을 말하고 있어요.",
          찍을: '앞으로 찍을 대상을 말하는 문장이 아니에요.',
        },
      },
      {
        options: ['것을', '곳을', '사람을'],
        correct: '것을',
      },
      {
        options: ['좋아해요.', '먹어요.', '배워요.'],
        correct: '좋아해요.',
      },
    ],
    {
      uz: 'Minsu suratga olishni yaxshi ko‘radi.',
      en: 'Minsu likes taking pictures.',
      ru: 'Минсу любит фотографировать.',
    },
  ),

  ...build(
    'gp_s3_u2_g5_14',
    G5,
    [
      {
        options: ['저는', '저를', '제가'],
        correct: '저는',
      },
      {
        options: ['주말에', '주말을', '주말이'],
        correct: '주말에',
      },
      {
        options: ['요리하는', '요리한', '요리할'],
        correct: '요리하는',
        hints: {
          요리한: '이미 끝난 요리가 아니라 평소 좋아하는 활동을 말해요.',
          요리할: '앞으로 할 예정인 활동을 말하는 문장이 아니에요.',
        },
      },
      {
        options: ['것을', '사람을', '시간을'],
        correct: '것을',
      },
      {
        options: ['좋아해요.', '기다려요.', '출발해요.'],
        correct: '좋아해요.',
      },
    ],
    {
      uz: 'Men dam olish kunlari ovqat pishirishni yaxshi ko‘raman.',
      en: 'I like cooking on weekends.',
      ru: 'По выходным я люблю готовить.',
    },
  ),

  ...build(
    'gp_s3_u2_g5_15',
    G5,
    [
      {
        options: ['아침에', '아침을', '아침이'],
        correct: '아침에',
      },
      {
        options: ['운동하는', '운동한', '운동할'],
        correct: '운동하는',
        hints: {
          운동한: '과거에 끝난 운동이 아니라 행동 자체를 말하고 있어요.',
          운동할: '미래에 할 운동을 말하는 것이 아니에요.',
        },
      },
      {
        options: ['것은', '사람은', '곳은'],
        correct: '것은',
      },
      {
        options: ['건강에', '건강을', '건강이'],
        correct: '건강에',
      },
      {
        options: ['좋아요.', '멀어요.', '비싸요.'],
        correct: '좋아요.',
      },
    ],
    {
      uz: 'Ertalab mashq qilish sog‘liq uchun foydali.',
      en: 'Exercising in the morning is good for your health.',
      ru: 'Заниматься спортом по утрам полезно для здоровья.',
    },
  ),

  ...build(
    'gp_s3_u2_g5_16',
    G5,
    [
      {
        options: ['외국어를', '외국어가', '외국어는'],
        correct: '외국어를',
      },
      {
        options: ['배우는', '배운', '배울'],
        correct: '배우는',
        hints: {
          배운: '이미 배운 언어를 가리키는 것이 아니라 배우는 행동 자체를 말해요.',
          배울: '앞으로 배울 대상을 말하는 것이 아니에요.',
        },
      },
      {
        options: ['것은', '사람은', '시간은'],
        correct: '것은',
      },
      {
        options: ['재미있어요.', '아파요.', '닫았어요.'],
        correct: '재미있어요.',
      },
    ],
    {
      uz: 'Chet tilini o‘rganish qiziqarli.',
      en: 'Learning a foreign language is interesting.',
      ru: 'Учить иностранный язык интересно.',
    },
  ),

  ...build(
    'gp_s3_u2_g5_17',
    G5,
    [
      {
        options: ['친구들과', '친구들을', '친구들이'],
        correct: '친구들과',
      },
      {
        options: ['여행하는', '여행한', '여행할'],
        correct: '여행하는',
        hints: {
          여행한: '전에 한 여행이 아니라 좋아하는 활동을 말하고 있어요.',
          여행할: '미래 계획이 아니라 일반적인 취향을 말해요.',
        },
      },
      {
        options: ['것을', '곳을', '사람을'],
        correct: '것을',
      },
      {
        options: ['정말', '벌써', '아까'],
        correct: '정말',
      },
      {
        options: ['좋아해요.', '닫아요.', '아파요.'],
        correct: '좋아해요.',
      },
    ],
    {
      uz: 'Men do‘stlarim bilan sayohat qilishni juda yaxshi ko‘raman.',
      en: 'I really like traveling with my friends.',
      ru: 'Я очень люблю путешествовать с друзьями.',
    },
  ),

  ...build(
    'gp_s3_u2_g5_18',
    G5,
    [
      {
        options: ['한국', '한국을', '한국이'],
        correct: '한국',
      },
      {
        options: ['드라마를', '드라마가', '드라마는'],
        correct: '드라마를',
      },
      {
        options: ['보는', '본', '볼'],
        correct: '보는',
        hints: {
          본: "이미 본 드라마를 가리키는 것이 아니라 '드라마를 보는 활동'을 말해요.",
          볼: '앞으로 볼 드라마가 아니라 현재의 취미를 말하고 있어요.',
        },
      },
      {
        options: ['것이', '사람이', '곳이'],
        correct: '것이',
      },
      {
        options: ['제 취미예요.', '제 친구예요.', '제 학교예요.'],
        correct: '제 취미예요.',
      },
    ],
    {
      uz: 'Koreys dramalarini ko‘rish mening sevimli mashg‘ulotim.',
      en: 'Watching Korean dramas is my hobby.',
      ru: 'Моё хобби — смотреть корейские дорамы.',
    },
  ),

  ...build(
    'gp_s3_u2_g5_19',
    G5,
    [
      {
        options: ['주말에', '주말을', '주말이'],
        correct: '주말에',
      },
      {
        options: ['집에서', '집에를', '집이'],
        correct: '집에서',
      },
      {
        options: ['쉬는', '쉰', '쉴'],
        correct: '쉬는',
        hints: {
          쉰: '이미 쉰 일을 말하는 것이 아니라 평소 좋아하는 활동을 말해요.',
          쉴: '앞으로 쉴 계획이 아니라 취향을 말하고 있어요.',
        },
      },
      {
        options: ['것도', '사람도', '곳도'],
        correct: '것도',
      },
      {
        options: ['좋아해요.', '출발해요.', '도착해요.'],
        correct: '좋아해요.',
      },
    ],
    {
      uz: 'Dam olish kunlari uyda dam olishni ham yaxshi ko‘raman.',
      en: 'I also like relaxing at home on weekends.',
      ru: 'По выходным я также люблю отдыхать дома.',
    },
  ),

  ...build(
    'gp_s3_u2_g5_20',
    G5,
    [
      {
        options: ['아이들은', '아이들을', '아이들이'],
        correct: '아이들은',
      },
      {
        options: ['공원에서', '공원을', '공원이'],
        correct: '공원에서',
      },
      {
        options: ['노는', '놀은', '놀는'],
        correct: '노는',
        hints: {
          놀은: "ㄹ 받침 동사 '놀다'는 '-는' 앞에서 ㄹ이 탈락해요.",
          놀는: "'놀다 + 는'은 '놀는'이 아니라 '노는'이에요.",
        },
      },
      {
        options: ['것을', '사람을', '곳을'],
        correct: '것을',
      },
      {
        options: ['좋아해요.', '잃어버려요.', '출발해요.'],
        correct: '좋아해요.',
      },
    ],
    {
      uz: 'Bolalar bog‘da o‘ynashni yaxshi ko‘radi.',
      en: 'Children like playing in the park.',
      ru: 'Дети любят играть в парке.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 6. V-(으)ㄹ 줄 알다[모르다]
// 받침 O → V-을 줄 알다[모르다]
// 받침 X → V-ㄹ 줄 알다[모르다]
// ㄹ 받침 → V-ㄹ 줄 알다[모르다]
// 어떤 행동을 하는 방법·기술을 알고 있는지 말할 때 사용
// ─────────────────────────────────────────────
const G6 = 'verb-eul-jul-alda';

const G6_Q = {
  // ═══════════════════════════════════════════
  // grammar_blank 10
  // ═══════════════════════════════════════════

  ...blank('gp_s3_u2_g6_01', G6, '저는 수영할 줄 알아요.', '수영할 줄 알아요', {
    uz: 'Men suzishni bilaman.',
    en: 'I know how to swim.',
    ru: 'Я умею плавать.',
  }),

  ...blank(
    'gp_s3_u2_g6_02',
    G6,
    '제 동생은 자전거를 탈 줄 알아요.',
    '자전거를 탈 줄 알아요',
    {
      uz: 'Ukam velosiped minishni biladi.',
      en: 'My younger sibling knows how to ride a bicycle.',
      ru: 'Мой младший брат умеет кататься на велосипеде.',
    },
  ),

  ...blank(
    'gp_s3_u2_g6_03',
    G6,
    '저는 한글을 읽을 줄 알아요.',
    '한글을 읽을 줄 알아요',
    {
      uz: 'Men hangulni o‘qishni bilaman.',
      en: 'I know how to read Hangeul.',
      ru: 'Я умею читать на хангыле.',
    },
  ),

  ...blank(
    'gp_s3_u2_g6_04',
    G6,
    '민수 씨는 기타를 칠 줄 알아요.',
    '기타를 칠 줄 알아요',
    {
      uz: 'Minsu gitara chalishni biladi.',
      en: 'Minsu knows how to play the guitar.',
      ru: 'Минсу умеет играть на гитаре.',
    },
  ),

  ...blank(
    'gp_s3_u2_g6_05',
    G6,
    '저는 한국 음식을 만들 줄 알아요.',
    '한국 음식을 만들 줄 알아요',
    {
      uz: 'Men koreys taomlarini tayyorlashni bilaman.',
      en: 'I know how to make Korean food.',
      ru: 'Я умею готовить корейские блюда.',
    },
  ),

  ...blank(
    'gp_s3_u2_g6_06',
    G6,
    '제 친구는 스키를 탈 줄 몰라요.',
    '스키를 탈 줄 몰라요',
    {
      uz: 'Do‘stim chang‘i uchishni bilmaydi.',
      en: 'My friend does not know how to ski.',
      ru: 'Мой друг не умеет кататься на лыжах.',
    },
  ),

  ...blank(
    'gp_s3_u2_g6_07',
    G6,
    '저는 아직 운전할 줄 몰라요.',
    '운전할 줄 몰라요',
    {
      uz: 'Men hali mashina haydashni bilmayman.',
      en: 'I do not know how to drive yet.',
      ru: 'Я пока не умею водить машину.',
    },
  ),

  ...blank(
    'gp_s3_u2_g6_08',
    G6,
    '수진 씨는 컴퓨터로 그림을 그릴 줄 알아요.',
    '그림을 그릴 줄 알아요',
    {
      uz: 'Sujin kompyuterda rasm chizishni biladi.',
      en: 'Sujin knows how to draw on a computer.',
      ru: 'Суджин умеет рисовать на компьютере.',
    },
  ),

  ...blank(
    'gp_s3_u2_g6_09',
    G6,
    '우리 할머니는 스마트폰으로 사진을 보낼 줄 알아요.',
    '사진을 보낼 줄 알아요',
    {
      uz: 'Buvim smartfon orqali surat yuborishni biladi.',
      en: 'My grandmother knows how to send photos with a smartphone.',
      ru: 'Моя бабушка умеет отправлять фотографии со смартфона.',
    },
  ),

  ...blank(
    'gp_s3_u2_g6_10',
    G6,
    '저는 젓가락을 잘 사용할 줄 몰라요.',
    '젓가락을 잘 사용할 줄 몰라요',
    {
      uz: 'Men tayoqchalardan yaxshi foydalanishni bilmayman.',
      en: 'I do not know how to use chopsticks well.',
      ru: 'Я не умею хорошо пользоваться палочками.',
    },
  ),

  // ═══════════════════════════════════════════
  // grammar_build 10
  // ═══════════════════════════════════════════

  ...build(
    'gp_s3_u2_g6_11',
    G6,
    [
      {
        options: ['저는', '저를', '제가'],
        correct: '저는',
      },
      {
        options: ['수영할', '수영한', '수영하는'],
        correct: '수영할',
      },
      {
        options: ['줄', '것', '때'],
        correct: '줄',
      },
      {
        options: ['알아요.', '있어요.', '좋아요.'],
        correct: '알아요.',
      },
    ],
    {
      uz: 'Men suzishni bilaman.',
      en: 'I know how to swim.',
      ru: 'Я умею плавать.',
    },
  ),

  ...build(
    'gp_s3_u2_g6_12',
    G6,
    [
      {
        options: ['제 동생은', '제 동생을', '제 동생이'],
        correct: '제 동생은',
      },
      {
        options: ['자전거를', '자전거가', '자전거는'],
        correct: '자전거를',
      },
      {
        options: ['탈', '타는', '탄'],
        correct: '탈',
      },
      {
        options: ['줄 알아요.', '것 같아요.', '때가 있어요.'],
        correct: '줄 알아요.',
      },
    ],
    {
      uz: 'Ukam velosiped minishni biladi.',
      en: 'My younger sibling knows how to ride a bicycle.',
      ru: 'Мой младший брат умеет кататься на велосипеде.',
    },
  ),

  ...build(
    'gp_s3_u2_g6_13',
    G6,
    [
      {
        options: ['저는', '저에게', '저와'],
        correct: '저는',
      },
      {
        options: ['한글을', '한글이', '한글은'],
        correct: '한글을',
      },
      {
        options: ['읽을', '읽는', '읽은'],
        correct: '읽을',
        hints: {
          읽는: "기술이나 방법을 아는 표현에서는 '-을 줄 알다'를 사용해요.",
          읽은: '이미 읽은 행동을 꾸미는 형태가 아니에요.',
        },
      },
      {
        options: ['줄 알아요.', '수 있어요.', '것이에요.'],
        correct: '줄 알아요.',
      },
    ],
    {
      uz: 'Men hangulni o‘qishni bilaman.',
      en: 'I know how to read Hangeul.',
      ru: 'Я умею читать на хангыле.',
    },
  ),

  ...build(
    'gp_s3_u2_g6_14',
    G6,
    [
      {
        options: ['민수 씨는', '민수 씨를', '민수 씨에게'],
        correct: '민수 씨는',
      },
      {
        options: ['기타를', '기타가', '기타는'],
        correct: '기타를',
      },
      {
        options: ['칠', '치는', '친'],
        correct: '칠',
      },
      {
        options: ['줄 알아요.', '적이 있어요.', '것 같아요.'],
        correct: '줄 알아요.',
      },
    ],
    {
      uz: 'Minsu gitara chalishni biladi.',
      en: 'Minsu knows how to play the guitar.',
      ru: 'Минсу умеет играть на гитаре.',
    },
  ),

  ...build(
    'gp_s3_u2_g6_15',
    G6,
    [
      {
        options: ['저는', '저를', '제가'],
        correct: '저는',
      },
      {
        options: ['한국 음식을', '한국 음식이', '한국 음식은'],
        correct: '한국 음식을',
      },
      {
        options: ['만들', '만드는', '만든'],
        correct: '만들',
        hints: {
          만드는:
            '여기서는 현재 만드는 행동이 아니라 요리하는 기술을 알고 있는지 말해요.',
          만든: '이미 만든 음식을 말하는 문장이 아니에요.',
        },
      },
      {
        options: ['줄 알아요.', '줄이 있어요.', '것을 알아요.'],
        correct: '줄 알아요.',
      },
    ],
    {
      uz: 'Men koreys taomlarini tayyorlashni bilaman.',
      en: 'I know how to make Korean food.',
      ru: 'Я умею готовить корейские блюда.',
    },
  ),

  ...build(
    'gp_s3_u2_g6_16',
    G6,
    [
      {
        options: ['제 친구는', '제 친구를', '제 친구에게'],
        correct: '제 친구는',
      },
      {
        options: ['스키를', '스키가', '스키는'],
        correct: '스키를',
      },
      {
        options: ['탈', '탄', '타는'],
        correct: '탈',
      },
      {
        options: ['줄 몰라요.', '수 몰라요.', '줄 없어요.'],
        correct: '줄 몰라요.',
      },
    ],
    {
      uz: 'Do‘stim chang‘i uchishni bilmaydi.',
      en: 'My friend does not know how to ski.',
      ru: 'Мой друг не умеет кататься на лыжах.',
    },
  ),

  ...build(
    'gp_s3_u2_g6_17',
    G6,
    [
      {
        options: ['저는', '저를', '제가'],
        correct: '저는',
      },
      {
        options: ['아직', '벌써', '항상'],
        correct: '아직',
      },
      {
        options: ['운전할', '운전한', '운전하는'],
        correct: '운전할',
      },
      {
        options: ['줄 몰라요.', '것 몰라요.', '때 몰라요.'],
        correct: '줄 몰라요.',
      },
    ],
    {
      uz: 'Men hali mashina haydashni bilmayman.',
      en: 'I do not know how to drive yet.',
      ru: 'Я пока не умею водить машину.',
    },
  ),

  ...build(
    'gp_s3_u2_g6_18',
    G6,
    [
      {
        options: ['수진 씨는', '수진 씨를', '수진 씨에게'],
        correct: '수진 씨는',
      },
      {
        options: ['컴퓨터로', '컴퓨터가', '컴퓨터를'],
        correct: '컴퓨터로',
      },
      {
        options: ['그림을', '그림이', '그림은'],
        correct: '그림을',
      },
      {
        options: ['그릴', '그리는', '그린'],
        correct: '그릴',
      },
      {
        options: ['줄 알아요.', '적이 있어요.', '것 같아요.'],
        correct: '줄 알아요.',
      },
    ],
    {
      uz: 'Sujin kompyuterda rasm chizishni biladi.',
      en: 'Sujin knows how to draw on a computer.',
      ru: 'Суджин умеет рисовать на компьютере.',
    },
  ),

  ...build(
    'gp_s3_u2_g6_19',
    G6,
    [
      {
        options: ['우리 할머니는', '우리 할머니를', '우리 할머니께'],
        correct: '우리 할머니는',
      },
      {
        options: ['스마트폰으로', '스마트폰이', '스마트폰을'],
        correct: '스마트폰으로',
      },
      {
        options: ['사진을', '사진이', '사진은'],
        correct: '사진을',
      },
      {
        options: ['보낼', '보낸', '보내는'],
        correct: '보낼',
      },
      {
        options: ['줄 알아요.', '줄이에요.', '줄 있어요.'],
        correct: '줄 알아요.',
      },
    ],
    {
      uz: 'Buvim smartfon orqali surat yuborishni biladi.',
      en: 'My grandmother knows how to send photos with a smartphone.',
      ru: 'Моя бабушка умеет отправлять фотографии со смартфона.',
    },
  ),

  ...build(
    'gp_s3_u2_g6_20',
    G6,
    [
      {
        options: ['저는', '저를', '제가'],
        correct: '저는',
      },
      {
        options: ['젓가락을', '젓가락이', '젓가락은'],
        correct: '젓가락을',
      },
      {
        options: ['잘', '아주', '벌써'],
        correct: '잘',
      },
      {
        options: ['사용할', '사용한', '사용하는'],
        correct: '사용할',
      },
      {
        options: ['줄 몰라요.', '수 몰라요.', '적 몰라요.'],
        correct: '줄 몰라요.',
      },
    ],
    {
      uz: 'Men tayoqchalardan yaxshi foydalanishni bilmayman.',
      en: 'I do not know how to use chopsticks well.',
      ru: 'Я не умею хорошо пользоваться палочками.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 7. V-(으)ㄴ N
// 받침 O → V-은 N
// 받침 X → V-ㄴ N
// ㄹ 받침 → ㄹ 탈락 + ㄴ N
// 이미 일어난·완료된 행동으로 뒤의 명사를 꾸밀 때 사용
// ─────────────────────────────────────────────
const G7 = 'verb-eun-noun';

const G7_Q = {
  // ═══════════════════════════════════════════
  // grammar_blank 10
  // ═══════════════════════════════════════════

  ...blank(
    'gp_s3_u2_g7_01',
    G7,
    '어제 본 영화가 정말 재미있었어요.',
    '본 영화',
    {
      uz: 'Kecha ko‘rgan filmim juda qiziq edi.',
      en: 'The movie I watched yesterday was really interesting.',
      ru: 'Фильм, который я посмотрел вчера, был очень интересным.',
    },
  ),

  ...blank(
    'gp_s3_u2_g7_02',
    G7,
    '제가 만든 케이크를 한번 먹어 보세요.',
    '만든 케이크',
    {
      uz: 'Men tayyorlagan tortni tatib ko‘ring.',
      en: 'Try the cake I made.',
      ru: 'Попробуйте торт, который я приготовил.',
    },
  ),

  ...blank(
    'gp_s3_u2_g7_03',
    G7,
    '아침에 먹은 빵이 아주 맛있었어요.',
    '먹은 빵',
    {
      uz: 'Ertalab yegan nonim juda mazali edi.',
      en: 'The bread I ate this morning was very delicious.',
      ru: 'Хлеб, который я ел утром, был очень вкусным.',
    },
  ),

  ...blank(
    'gp_s3_u2_g7_04',
    G7,
    '어제 만난 사람이 제 고등학교 친구예요.',
    '만난 사람',
    {
      uz: 'Kecha uchratgan odamim maktabdagi do‘stim.',
      en: 'The person I met yesterday is my high school friend.',
      ru: 'Человек, которого я встретил вчера, — мой школьный друг.',
    },
  ),

  ...blank('gp_s3_u2_g7_05', G7, '친구가 보낸 사진을 봤어요.', '보낸 사진', {
    uz: 'Do‘stim yuborgan suratni ko‘rdim.',
    en: 'I saw the photo my friend sent.',
    ru: 'Я посмотрел фотографию, которую прислал мой друг.',
  }),

  ...blank('gp_s3_u2_g7_06', G7, '지난주에 산 신발이 아주 편해요.', '산 신발', {
    uz: 'O‘tgan hafta sotib olgan oyoq kiyimim juda qulay.',
    en: 'The shoes I bought last week are very comfortable.',
    ru: 'Обувь, которую я купил на прошлой неделе, очень удобная.',
  }),

  ...blank(
    'gp_s3_u2_g7_07',
    G7,
    '제주도에서 찍은 사진을 보여 주세요.',
    '찍은 사진',
    {
      uz: 'Jejuda olgan suratlaringizni ko‘rsating.',
      en: 'Please show me the photos you took in Jeju.',
      ru: 'Покажите, пожалуйста, фотографии, которые вы сделали на Чеджудо.',
    },
  ),

  ...blank(
    'gp_s3_u2_g7_08',
    G7,
    '민수 씨가 읽은 책을 저도 읽고 싶어요.',
    '읽은 책',
    {
      uz: 'Minsu o‘qigan kitobni men ham o‘qimoqchiman.',
      en: 'I also want to read the book Minsu read.',
      ru: 'Я тоже хочу прочитать книгу, которую прочитал Минсу.',
    },
  ),

  ...blank(
    'gp_s3_u2_g7_09',
    G7,
    '어머니가 만든 음식이 제일 맛있어요.',
    '만든 음식',
    {
      uz: 'Onam tayyorlagan taom eng mazali.',
      en: 'The food my mother made is the most delicious.',
      ru: 'Еда, которую приготовила мама, самая вкусная.',
    },
  ),

  ...blank(
    'gp_s3_u2_g7_10',
    G7,
    '그 사람이 한국에서 산 기간은 5년이에요.',
    '한국에서 산 기간',
    {
      uz: 'U odamning Koreyada yashagan davri besh yil.',
      en: 'The period that person lived in Korea was five years.',
      ru: 'Этот человек прожил в Корее пять лет.',
    },
  ),

  // ═══════════════════════════════════════════
  // grammar_build 10
  // ═══════════════════════════════════════════

  ...build(
    'gp_s3_u2_g7_11',
    G7,
    [
      {
        options: ['어제', '내일', '요즘'],
        correct: '어제',
      },
      {
        options: ['본', '보는', '볼'],
        correct: '본',
        hints: {
          보는: "이미 어제 끝난 행동이므로 현재형 '보는'이 아니에요.",
          볼: '앞으로 볼 영화가 아니라 이미 본 영화예요.',
        },
      },
      {
        options: ['영화가', '영화를', '영화에'],
        correct: '영화가',
      },
      {
        options: ['재미있었어요.', '출발했어요.', '마셨어요.'],
        correct: '재미있었어요.',
      },
    ],
    {
      uz: 'Kecha ko‘rgan filmim qiziq edi.',
      en: 'The movie I watched yesterday was interesting.',
      ru: 'Фильм, который я посмотрел вчера, был интересным.',
    },
  ),

  ...build(
    'gp_s3_u2_g7_12',
    G7,
    [
      {
        options: ['제가', '저를', '저에게'],
        correct: '제가',
      },
      {
        options: ['만든', '만드는', '만들'],
        correct: '만든',
        hints: {
          만드는: '지금 만들고 있는 것이 아니라 이미 완성한 케이크예요.',
          만들: '앞으로 만들 케이크가 아니에요.',
        },
      },
      {
        options: ['케이크를', '케이크가', '케이크는'],
        correct: '케이크를',
      },
      {
        options: ['먹어 보세요.', '읽어 보세요.', '입어 보세요.'],
        correct: '먹어 보세요.',
      },
    ],
    {
      uz: 'Men tayyorlagan tortni tatib ko‘ring.',
      en: 'Try the cake I made.',
      ru: 'Попробуйте торт, который я приготовил.',
    },
  ),

  ...build(
    'gp_s3_u2_g7_13',
    G7,
    [
      {
        options: ['아침에', '내일', '다음 주에'],
        correct: '아침에',
      },
      {
        options: ['먹은', '먹는', '먹을'],
        correct: '먹은',
        hints: {
          먹는: '이미 아침에 먹은 행동이 끝났어요.',
          먹을: '앞으로 먹을 빵이 아니라 이미 먹은 빵이에요.',
        },
      },
      {
        options: ['빵이', '빵을', '빵에'],
        correct: '빵이',
      },
      {
        options: ['맛있었어요.', '멀었어요.', '바빴어요.'],
        correct: '맛있었어요.',
      },
    ],
    {
      uz: 'Ertalab yegan nonim mazali edi.',
      en: 'The bread I ate this morning was delicious.',
      ru: 'Хлеб, который я ел утром, был вкусным.',
    },
  ),

  ...build(
    'gp_s3_u2_g7_14',
    G7,
    [
      {
        options: ['어제', '내일', '다음 달에'],
        correct: '어제',
      },
      {
        options: ['만난', '만나는', '만날'],
        correct: '만난',
        hints: {
          만나는: '어제 이미 만난 사람이므로 현재 관형형이 아니에요.',
          만날: '앞으로 만날 사람이 아니에요.',
        },
      },
      {
        options: ['사람이', '사람을', '사람에'],
        correct: '사람이',
      },
      {
        options: ['제 친구예요.', '제 가방이에요.', '제 음식이에요.'],
        correct: '제 친구예요.',
      },
    ],
    {
      uz: 'Kecha uchratgan odamim mening do‘stim.',
      en: 'The person I met yesterday is my friend.',
      ru: 'Человек, которого я встретил вчера, — мой друг.',
    },
  ),

  ...build(
    'gp_s3_u2_g7_15',
    G7,
    [
      {
        options: ['친구가', '친구를', '친구에게'],
        correct: '친구가',
      },
      {
        options: ['보낸', '보내는', '보낼'],
        correct: '보낸',
        hints: {
          보내는: '지금 보내고 있는 사진이 아니라 이미 보낸 사진이에요.',
          보낼: '앞으로 보낼 사진이 아니에요.',
        },
      },
      {
        options: ['사진을', '사진이', '사진은'],
        correct: '사진을',
      },
      {
        options: ['봤어요.', '먹었어요.', '입었어요.'],
        correct: '봤어요.',
      },
    ],
    {
      uz: 'Do‘stim yuborgan suratni ko‘rdim.',
      en: 'I saw the photo my friend sent.',
      ru: 'Я посмотрел фотографию, которую прислал мой друг.',
    },
  ),

  ...build(
    'gp_s3_u2_g7_16',
    G7,
    [
      {
        options: ['지난주에', '다음 주에', '내년에'],
        correct: '지난주에',
      },
      {
        options: ['산', '사는', '살'],
        correct: '산',
        hints: {
          사는: "여기서는 '사다'의 완료된 행동이에요. 지난주에 이미 샀어요.",
          살: '앞으로 살 신발이 아니라 이미 산 신발이에요.',
        },
      },
      {
        options: ['신발이', '신발을', '신발에'],
        correct: '신발이',
      },
      {
        options: ['편해요.', '먹어요.', '읽어요.'],
        correct: '편해요.',
      },
    ],
    {
      uz: 'O‘tgan hafta sotib olgan oyoq kiyimim qulay.',
      en: 'The shoes I bought last week are comfortable.',
      ru: 'Обувь, которую я купил на прошлой неделе, удобная.',
    },
  ),

  ...build(
    'gp_s3_u2_g7_17',
    G7,
    [
      {
        options: ['제주도에서', '제주도에', '제주도를'],
        correct: '제주도에서',
      },
      {
        options: ['찍은', '찍는', '찍을'],
        correct: '찍은',
        hints: {
          찍는: '이미 제주도에서 찍은 사진을 말하고 있어요.',
          찍을: '앞으로 찍을 사진이 아니에요.',
        },
      },
      {
        options: ['사진을', '사진이', '사진에'],
        correct: '사진을',
      },
      {
        options: ['보여 주세요.', '먹어 주세요.', '입어 주세요.'],
        correct: '보여 주세요.',
      },
    ],
    {
      uz: 'Jejuda olgan suratlaringizni ko‘rsating.',
      en: 'Please show me the photos you took in Jeju.',
      ru: 'Покажите фотографии, которые вы сделали на Чеджудо.',
    },
  ),

  ...build(
    'gp_s3_u2_g7_18',
    G7,
    [
      {
        options: ['민수 씨가', '민수 씨를', '민수 씨에게'],
        correct: '민수 씨가',
      },
      {
        options: ['읽은', '읽는', '읽을'],
        correct: '읽은',
        hints: {
          읽는: '민수 씨가 이미 읽은 책을 말하고 있어요.',
          읽을: '민수 씨가 앞으로 읽을 책이 아니에요.',
        },
      },
      {
        options: ['책을', '책이', '책에'],
        correct: '책을',
      },
      {
        options: ['저도', '저를', '제가만'],
        correct: '저도',
      },
      {
        options: ['읽고 싶어요.', '먹고 싶어요.', '입고 싶어요.'],
        correct: '읽고 싶어요.',
      },
    ],
    {
      uz: 'Minsu o‘qigan kitobni men ham o‘qimoqchiman.',
      en: 'I also want to read the book Minsu read.',
      ru: 'Я тоже хочу прочитать книгу, которую прочитал Минсу.',
    },
  ),

  ...build(
    'gp_s3_u2_g7_19',
    G7,
    [
      {
        options: ['어머니가', '어머니를', '어머니께'],
        correct: '어머니가',
      },
      {
        options: ['만든', '만드는', '만들'],
        correct: '만든',
        hints: {
          만드는: "'만들다'는 ㄹ 받침이지만 완료 관형형에서는 '만든'이 돼요.",
          만들: "'만들'은 앞으로 만들 것을 꾸미는 형태예요.",
        },
      },
      {
        options: ['음식이', '음식을', '음식에'],
        correct: '음식이',
      },
      {
        options: ['제일', '아직', '밖에'],
        correct: '제일',
      },
      {
        options: ['맛있어요.', '멀어요.', '추워요.'],
        correct: '맛있어요.',
      },
    ],
    {
      uz: 'Onam tayyorlagan taom eng mazali.',
      en: 'The food my mother made is the most delicious.',
      ru: 'Еда, которую приготовила мама, самая вкусная.',
    },
  ),

  ...build(
    'gp_s3_u2_g7_20',
    G7,
    [
      {
        options: ['그 사람이', '그 사람을', '그 사람에게'],
        correct: '그 사람이',
      },
      {
        options: ['한국에서', '한국에', '한국까지'],
        correct: '한국에서',
      },
      {
        options: ['산', '살은', '살는'],
        correct: '산',
        hints: {
          살은: "ㄹ 받침 동사 '살다'는 완료 관형형에서 ㄹ이 탈락해서 '산'이 돼요.",
          살는: "완료된 행동이므로 '-는'을 쓰지 않고 '산'을 사용해요.",
        },
      },
      {
        options: ['기간은', '기간을', '기간에'],
        correct: '기간은',
      },
      {
        options: ['5년이에요.', '5명이에요.', '5개예요.'],
        correct: '5년이에요.',
      },
    ],
    {
      uz: 'U odamning Koreyada yashagan davri besh yil.',
      en: 'The period that person lived in Korea was five years.',
      ru: 'Этот человек прожил в Корее пять лет.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 8. A/V-지 않다
// A/V 어간 + 지 않다
// 동사·형용사의 행동이나 상태를 부정할 때 사용
// 받침 여부와 관계없이 형태가 같음
// ─────────────────────────────────────────────
const G8 = 'adjective-verb-ji-anta';

const G8_Q = {
  // ═══════════════════════════════════════════
  // grammar_blank 10
  // ═══════════════════════════════════════════

  ...blank(
    'gp_s3_u2_g8_01',
    G8,
    '저는 매운 음식을 잘 먹지 않아요.',
    '먹지 않아요',
    {
      uz: 'Men achchiq ovqatni ko‘p yemayman.',
      en: 'I do not usually eat spicy food.',
      ru: 'Я обычно не ем острую пищу.',
    },
  ),

  ...blank(
    'gp_s3_u2_g8_02',
    G8,
    '제 동생은 운동을 좋아하지 않아요.',
    '좋아하지 않아요',
    {
      uz: 'Ukam sportni yoqtirmaydi.',
      en: 'My younger sibling does not like exercise.',
      ru: 'Мой младший брат не любит заниматься спортом.',
    },
  ),

  ...blank('gp_s3_u2_g8_03', G8, '오늘은 날씨가 춥지 않아요.', '춥지 않아요', {
    uz: 'Bugun havo sovuq emas.',
    en: 'The weather is not cold today.',
    ru: 'Сегодня не холодно.',
  }),

  ...blank(
    'gp_s3_u2_g8_04',
    G8,
    '이 가방은 생각보다 비싸지 않아요.',
    '비싸지 않아요',
    {
      uz: 'Bu sumka o‘ylaganimdan qimmat emas.',
      en: 'This bag is not as expensive as I thought.',
      ru: 'Эта сумка не такая дорогая, как я думал.',
    },
  ),

  ...blank(
    'gp_s3_u2_g8_05',
    G8,
    '저는 평일에는 늦게 자지 않아요.',
    '늦게 자지 않아요',
    {
      uz: 'Men ish kunlari kech uxlamayman.',
      en: 'I do not go to bed late on weekdays.',
      ru: 'В будние дни я не ложусь поздно.',
    },
  ),

  ...blank(
    'gp_s3_u2_g8_06',
    G8,
    '한국어 발음은 생각만큼 어렵지 않아요.',
    '어렵지 않아요',
    {
      uz: 'Koreyscha talaffuz o‘ylaganchalik qiyin emas.',
      en: 'Korean pronunciation is not as difficult as you might think.',
      ru: 'Корейское произношение не такое сложное, как кажется.',
    },
  ),

  ...blank(
    'gp_s3_u2_g8_07',
    G8,
    '민수 씨는 아침을 먹지 않고 학교에 갔어요.',
    '먹지 않고',
    {
      uz: 'Minsu nonushta qilmay maktabga ketdi.',
      en: 'Minsu went to school without eating breakfast.',
      ru: 'Минсу пошёл в школу, не позавтракав.',
    },
  ),

  ...blank(
    'gp_s3_u2_g8_08',
    G8,
    '저는 사람이 많은 곳에 자주 가지 않아요.',
    '가지 않아요',
    {
      uz: 'Men odam ko‘p joylarga tez-tez bormayman.',
      en: 'I do not often go to crowded places.',
      ru: 'Я нечасто хожу в многолюдные места.',
    },
  ),

  ...blank(
    'gp_s3_u2_g8_09',
    G8,
    '이 문제는 그렇게 복잡하지 않아요.',
    '복잡하지 않아요',
    {
      uz: 'Bu masala unchalik murakkab emas.',
      en: 'This problem is not that complicated.',
      ru: 'Эта задача не такая сложная.',
    },
  ),

  ...blank(
    'gp_s3_u2_g8_10',
    G8,
    '저는 주말에는 일하지 않아요.',
    '일하지 않아요',
    {
      uz: 'Men dam olish kunlari ishlamayman.',
      en: 'I do not work on weekends.',
      ru: 'По выходным я не работаю.',
    },
  ),

  // ═══════════════════════════════════════════
  // grammar_build 10
  // ═══════════════════════════════════════════

  ...build(
    'gp_s3_u2_g8_11',
    G8,
    [
      {
        options: ['저는', '저를', '제가'],
        correct: '저는',
      },
      {
        options: ['매운 음식을', '매운 음식이', '매운 음식은'],
        correct: '매운 음식을',
      },
      {
        options: ['잘', '아주', '벌써'],
        correct: '잘',
      },
      {
        options: ['먹지', '먹고', '먹으려고'],
        correct: '먹지',
        hints: {
          먹고: "부정하려면 '-지 않다' 형태를 사용해야 해요.",
          먹으려고: "'-(으)려고'는 목적이나 의도를 나타내요.",
        },
      },
      {
        options: ['않아요.', '있어요.', '해요.'],
        correct: '않아요.',
      },
    ],
    {
      uz: 'Men achchiq ovqatni ko‘p yemayman.',
      en: 'I do not usually eat spicy food.',
      ru: 'Я обычно не ем острую пищу.',
    },
  ),

  ...build(
    'gp_s3_u2_g8_12',
    G8,
    [
      {
        options: ['제 동생은', '제 동생을', '제 동생에게'],
        correct: '제 동생은',
      },
      {
        options: ['운동을', '운동이', '운동에'],
        correct: '운동을',
      },
      {
        options: ['좋아하지', '좋아하고', '좋아해서'],
        correct: '좋아하지',
        hints: {
          좋아하고: '이 문장은 운동을 좋아하지 않는다는 부정이에요.',
          좋아해서: '이유를 연결하는 문장이 아니에요.',
        },
      },
      {
        options: ['않아요.', '있어요.', '같아요.'],
        correct: '않아요.',
      },
    ],
    {
      uz: 'Ukam sportni yoqtirmaydi.',
      en: 'My younger sibling does not like exercise.',
      ru: 'Мой младший брат не любит заниматься спортом.',
    },
  ),

  ...build(
    'gp_s3_u2_g8_13',
    G8,
    [
      {
        options: ['오늘은', '어제는', '내일은'],
        correct: '오늘은',
      },
      {
        options: ['날씨가', '날씨를', '날씨에'],
        correct: '날씨가',
      },
      {
        options: ['춥지', '추워서', '추우면'],
        correct: '춥지',
        hints: {
          추워서: '이유를 나타내는 문장이 아니라 추운 상태를 부정하고 있어요.',
          추우면: '조건을 말하는 문장이 아니에요.',
        },
      },
      {
        options: ['않아요.', '있어요.', '돼요.'],
        correct: '않아요.',
      },
    ],
    {
      uz: 'Bugun havo sovuq emas.',
      en: 'The weather is not cold today.',
      ru: 'Сегодня не холодно.',
    },
  ),

  ...build(
    'gp_s3_u2_g8_14',
    G8,
    [
      {
        options: ['이 가방은', '이 가방을', '이 가방에'],
        correct: '이 가방은',
      },
      {
        options: ['생각보다', '학교에서', '아침마다'],
        correct: '생각보다',
      },
      {
        options: ['비싸지', '비싸고', '비싸서'],
        correct: '비싸지',
      },
      {
        options: ['않아요.', '있어요.', '가요.'],
        correct: '않아요.',
      },
    ],
    {
      uz: 'Bu sumka o‘ylaganimdan qimmat emas.',
      en: 'This bag is not as expensive as I thought.',
      ru: 'Эта сумка не такая дорогая, как я думал.',
    },
  ),

  ...build(
    'gp_s3_u2_g8_15',
    G8,
    [
      {
        options: ['저는', '저를', '제가'],
        correct: '저는',
      },
      {
        options: ['평일에는', '평일에서', '평일을'],
        correct: '평일에는',
      },
      {
        options: ['늦게', '매운', '아픈'],
        correct: '늦게',
      },
      {
        options: ['자지', '자고', '자려고'],
        correct: '자지',
        hints: {
          자고: '평일에 늦게 자지 않는다는 부정 표현이 필요해요.',
          자려고: '잠을 자려는 의도를 말하는 문장이 아니에요.',
        },
      },
      {
        options: ['않아요.', '못해요.', '있어요.'],
        correct: '않아요.',
      },
    ],
    {
      uz: 'Men ish kunlari kech uxlamayman.',
      en: 'I do not go to bed late on weekdays.',
      ru: 'В будние дни я не ложусь поздно.',
    },
  ),

  ...build(
    'gp_s3_u2_g8_16',
    G8,
    [
      {
        options: ['한국어 발음은', '한국어 발음을', '한국어 발음에'],
        correct: '한국어 발음은',
      },
      {
        options: ['생각만큼', '도서관에서', '친구에게'],
        correct: '생각만큼',
      },
      {
        options: ['어렵지', '어려워서', '어려우면'],
        correct: '어렵지',
        hints: {
          어려워서:
            "어려운 이유를 말하는 것이 아니라 '어렵지 않다'라고 부정해요.",
          어려우면: '조건을 나타내는 문장이 아니에요.',
        },
      },
      {
        options: ['않아요.', '없어요.', '몰라요.'],
        correct: '않아요.',
      },
    ],
    {
      uz: 'Koreyscha talaffuz o‘ylaganchalik qiyin emas.',
      en: 'Korean pronunciation is not as difficult as you might think.',
      ru: 'Корейское произношение не такое сложное, как кажется.',
    },
  ),

  ...build(
    'gp_s3_u2_g8_17',
    G8,
    [
      {
        options: ['민수 씨는', '민수 씨를', '민수 씨에게'],
        correct: '민수 씨는',
      },
      {
        options: ['아침을', '아침이', '아침에'],
        correct: '아침을',
      },
      {
        options: ['먹지', '먹고', '먹어서'],
        correct: '먹지',
      },
      {
        options: ['않고', '않으면', '않아서'],
        correct: '않고',
        hints: {
          않으면: "조건이 아니라 '먹지 않은 상태로 학교에 갔다'는 뜻이에요.",
          않아서: '먹지 않은 것이 학교에 간 이유라는 문장이 아니에요.',
        },
      },
      {
        options: ['학교에 갔어요.', '학교를 먹었어요.', '학교가 잤어요.'],
        correct: '학교에 갔어요.',
      },
    ],
    {
      uz: 'Minsu nonushta qilmay maktabga ketdi.',
      en: 'Minsu went to school without eating breakfast.',
      ru: 'Минсу пошёл в школу, не позавтракав.',
    },
  ),

  ...build(
    'gp_s3_u2_g8_18',
    G8,
    [
      {
        options: ['저는', '저를', '제가'],
        correct: '저는',
      },
      {
        options: ['사람이 많은 곳에', '사람을 많은 곳에', '사람이 많은 곳을'],
        correct: '사람이 많은 곳에',
      },
      {
        options: ['자주', '매운', '비싼'],
        correct: '자주',
      },
      {
        options: ['가지', '가고', '가려고'],
        correct: '가지',
      },
      {
        options: ['않아요.', '있어요.', '좋아요.'],
        correct: '않아요.',
      },
    ],
    {
      uz: 'Men odam ko‘p joylarga tez-tez bormayman.',
      en: 'I do not often go to crowded places.',
      ru: 'Я нечасто хожу в многолюдные места.',
    },
  ),

  ...build(
    'gp_s3_u2_g8_19',
    G8,
    [
      {
        options: ['이 문제는', '이 문제를', '이 문제에'],
        correct: '이 문제는',
      },
      {
        options: ['그렇게', '어제', '밖에'],
        correct: '그렇게',
      },
      {
        options: ['복잡하지', '복잡하고', '복잡해서'],
        correct: '복잡하지',
        hints: {
          복잡하고: '복잡하다고 말하는 것이 아니라 복잡하지 않다고 부정해요.',
          복잡해서: '원인을 설명하는 문장이 아니에요.',
        },
      },
      {
        options: ['않아요.', '있어요.', '가요.'],
        correct: '않아요.',
      },
    ],
    {
      uz: 'Bu masala unchalik murakkab emas.',
      en: 'This problem is not that complicated.',
      ru: 'Эта задача не такая сложная.',
    },
  ),

  ...build(
    'gp_s3_u2_g8_20',
    G8,
    [
      {
        options: ['저는', '저를', '제가'],
        correct: '저는',
      },
      {
        options: ['주말에는', '주말에서', '주말을'],
        correct: '주말에는',
      },
      {
        options: ['일하지', '일하고', '일하려고'],
        correct: '일하지',
        hints: {
          일하고: '주말에 일한다는 뜻이 되므로 반대예요.',
          일하려고: '일할 의도를 말하는 문장이 아니라 하지 않는 습관을 말해요.',
        },
      },
      {
        options: ['않아요.', '있어요.', '돼요.'],
        correct: '않아요.',
      },
    ],
    {
      uz: 'Men dam olish kunlari ishlamayman.',
      en: 'I do not work on weekends.',
      ru: 'По выходным я не работаю.',
    },
  ),
};

// ═══════════════════════════════════════════════════════════
// UNIT 3
// 경험 · 기간 · 배경 설명 · 앞으로 할 일
// ═══════════════════════════════════════════════════════════

// ─────────────────────────────────────────────
// 문법 9. V-아/어 보다
// 어떤 행동을 직접 시도하거나 경험해 봄
// ─────────────────────────────────────────────
const G9 = 'verb-a-eo-boda';

const G9_Q = {
  // grammar_blank 10
  ...blank(
    'gp_s3_u3_g9_01',
    G9,
    '저는 한복을 입어 봤어요.',
    '한복을 입어 봤어요',
    {
      uz: 'Men hanbok kiyib ko‘rganman.',
      en: 'I have tried wearing a hanbok.',
      ru: 'Я пробовал надевать ханбок.',
    },
  ),

  ...blank('gp_s3_u3_g9_02', G9, '제주도에 가 봤어요?', '제주도에 가 봤어요', {
    uz: 'Jejuga borib ko‘rganmisiz?',
    en: 'Have you ever been to Jeju?',
    ru: 'Вы бывали на Чеджудо?',
  }),

  ...blank(
    'gp_s3_u3_g9_03',
    G9,
    '한국 음식을 직접 만들어 봤어요.',
    '직접 만들어 봤어요',
    {
      uz: 'Koreys taomini o‘zim tayyorlab ko‘rdim.',
      en: 'I tried making Korean food myself.',
      ru: 'Я пробовал сам готовить корейскую еду.',
    },
  ),

  ...blank(
    'gp_s3_u3_g9_04',
    G9,
    '매운 떡볶이를 먹어 봤어요.',
    '떡볶이를 먹어 봤어요',
    {
      uz: 'Achchiq tteokbokki yeb ko‘rganman.',
      en: 'I have tried spicy tteokbokki.',
      ru: 'Я пробовал острый ттокпокки.',
    },
  ),

  ...blank(
    'gp_s3_u3_g9_05',
    G9,
    '한글로 일기를 써 봤어요.',
    '일기를 써 봤어요',
    {
      uz: 'Hangulda kundalik yozib ko‘rdim.',
      en: 'I tried writing a diary in Hangeul.',
      ru: 'Я пробовал писать дневник на хангыле.',
    },
  ),

  ...blank(
    'gp_s3_u3_g9_06',
    G9,
    '노래방에서 한국 노래를 불러 봤어요.',
    '한국 노래를 불러 봤어요',
    {
      uz: 'Karaokeda koreys qo‘shig‘ini kuylab ko‘rdim.',
      en: 'I tried singing a Korean song at karaoke.',
      ru: 'Я пробовал петь корейскую песню в караоке.',
    },
  ),

  ...blank(
    'gp_s3_u3_g9_07',
    G9,
    '겨울에 스키를 타 봤어요.',
    '스키를 타 봤어요',
    {
      uz: 'Qishda chang‘i uchib ko‘rganman.',
      en: 'I have tried skiing in winter.',
      ru: 'Я пробовал кататься на лыжах зимой.',
    },
  ),

  ...blank(
    'gp_s3_u3_g9_08',
    G9,
    '이 한국어 학습 앱을 사용해 봤어요.',
    '사용해 봤어요',
    {
      uz: 'Bu koreys tili o‘rganish ilovasini ishlatib ko‘rdim.',
      en: 'I tried using this Korean-learning app.',
      ru: 'Я пробовал пользоваться этим приложением для изучения корейского.',
    },
  ),

  ...blank(
    'gp_s3_u3_g9_09',
    G9,
    '한국 전통차를 마셔 봤어요.',
    '전통차를 마셔 봤어요',
    {
      uz: 'Koreys an’anaviy choyini ichib ko‘rganman.',
      en: 'I have tried Korean traditional tea.',
      ru: 'Я пробовал корейский традиционный чай.',
    },
  ),

  ...blank(
    'gp_s3_u3_g9_10',
    G9,
    '한국 친구와 한국어로 이야기해 봤어요.',
    '한국어로 이야기해 봤어요',
    {
      uz: 'Koreys do‘stim bilan koreys tilida gaplashib ko‘rdim.',
      en: 'I tried speaking in Korean with a Korean friend.',
      ru: 'Я пробовал разговаривать по-корейски с корейским другом.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s3_u3_g9_11',
    G9,
    [
      {
        options: ['저는', '저를', '제가'],
        correct: '저는',
      },
      {
        options: ['한복을', '한복이', '한복에'],
        correct: '한복을',
      },
      {
        options: ['입어', '입고', '입으려고'],
        correct: '입어',
        hints: {
          입고: "직접 해 본 경험은 '입어 보다'라고 해요.",
          입으려고: '목적을 말하는 것이 아니라 경험을 말하고 있어요.',
        },
      },
      {
        options: ['봤어요.', '갔어요.', '됐어요.'],
        correct: '봤어요.',
      },
    ],
    {
      uz: 'Men hanbok kiyib ko‘rganman.',
      en: 'I have tried wearing a hanbok.',
      ru: 'Я пробовал надевать ханбок.',
    },
  ),

  ...build(
    'gp_s3_u3_g9_12',
    G9,
    [
      {
        options: ['제주도에', '제주도에서', '제주도를'],
        correct: '제주도에',
      },
      {
        options: ['가', '가고', '가려고'],
        correct: '가',
      },
      {
        options: ['봤어요?', '먹었어요?', '읽었어요?'],
        correct: '봤어요?',
      },
    ],
    {
      uz: 'Jejuga borib ko‘rganmisiz?',
      en: 'Have you ever been to Jeju?',
      ru: 'Вы бывали на Чеджудо?',
    },
  ),

  ...build(
    'gp_s3_u3_g9_13',
    G9,
    [
      {
        options: ['한국 음식을', '한국 음식이', '한국 음식에'],
        correct: '한국 음식을',
      },
      {
        options: ['직접', '아직', '밖에'],
        correct: '직접',
      },
      {
        options: ['만들어', '만들고', '만들려고'],
        correct: '만들어',
      },
      {
        options: ['봤어요.', '있어요.', '몰라요.'],
        correct: '봤어요.',
      },
    ],
    {
      uz: 'Koreys taomini o‘zim tayyorlab ko‘rdim.',
      en: 'I tried making Korean food myself.',
      ru: 'Я пробовал сам готовить корейскую еду.',
    },
  ),

  ...build(
    'gp_s3_u3_g9_14',
    G9,
    [
      {
        options: ['매운 떡볶이를', '매운 떡볶이가', '매운 떡볶이에'],
        correct: '매운 떡볶이를',
      },
      {
        options: ['먹어', '먹고', '먹으려고'],
        correct: '먹어',
      },
      {
        options: ['봤어요.', '만났어요.', '입었어요.'],
        correct: '봤어요.',
      },
    ],
    {
      uz: 'Achchiq tteokbokki yeb ko‘rganman.',
      en: 'I have tried spicy tteokbokki.',
      ru: 'Я пробовал острый ттокпокки.',
    },
  ),

  ...build(
    'gp_s3_u3_g9_15',
    G9,
    [
      {
        options: ['한글로', '한글을', '한글이'],
        correct: '한글로',
      },
      {
        options: ['일기를', '일기가', '일기에'],
        correct: '일기를',
      },
      {
        options: ['써', '쓰고', '쓰려고'],
        correct: '써',
      },
      {
        options: ['봤어요.', '갔어요.', '왔어요.'],
        correct: '봤어요.',
      },
    ],
    {
      uz: 'Hangulda kundalik yozib ko‘rdim.',
      en: 'I tried writing a diary in Hangeul.',
      ru: 'Я пробовал писать дневник на хангыле.',
    },
  ),

  ...build(
    'gp_s3_u3_g9_16',
    G9,
    [
      {
        options: ['노래방에서', '노래방에', '노래방을'],
        correct: '노래방에서',
      },
      {
        options: ['한국 노래를', '한국 노래가', '한국 노래에'],
        correct: '한국 노래를',
      },
      {
        options: ['불러', '부르고', '부르려고'],
        correct: '불러',
      },
      {
        options: ['봤어요.', '있어요.', '알아요.'],
        correct: '봤어요.',
      },
    ],
    {
      uz: 'Karaokeda koreys qo‘shig‘ini kuylab ko‘rdim.',
      en: 'I tried singing a Korean song at karaoke.',
      ru: 'Я пробовал петь корейскую песню в караоке.',
    },
  ),

  ...build(
    'gp_s3_u3_g9_17',
    G9,
    [
      {
        options: ['겨울에', '겨울을', '겨울이'],
        correct: '겨울에',
      },
      {
        options: ['스키를', '스키가', '스키에'],
        correct: '스키를',
      },
      {
        options: ['타', '타고', '타려고'],
        correct: '타',
      },
      {
        options: ['봤어요.', '읽었어요.', '마셨어요.'],
        correct: '봤어요.',
      },
    ],
    {
      uz: 'Qishda chang‘i uchib ko‘rganman.',
      en: 'I have tried skiing in winter.',
      ru: 'Я пробовал кататься на лыжах зимой.',
    },
  ),

  ...build(
    'gp_s3_u3_g9_18',
    G9,
    [
      {
        options: ['이 앱을', '이 앱이', '이 앱에'],
        correct: '이 앱을',
      },
      {
        options: ['사용해', '사용하고', '사용하려고'],
        correct: '사용해',
      },
      {
        options: ['봤어요.', '없어요.', '몰라요.'],
        correct: '봤어요.',
      },
    ],
    {
      uz: 'Bu ilovani ishlatib ko‘rdim.',
      en: 'I tried using this app.',
      ru: 'Я пробовал пользоваться этим приложением.',
    },
  ),

  ...build(
    'gp_s3_u3_g9_19',
    G9,
    [
      {
        options: ['한국 전통차를', '한국 전통차가', '한국 전통차에'],
        correct: '한국 전통차를',
      },
      {
        options: ['마셔', '마시고', '마시려고'],
        correct: '마셔',
      },
      {
        options: ['봤어요.', '잤어요.', '샀어요.'],
        correct: '봤어요.',
      },
    ],
    {
      uz: 'Koreys an’anaviy choyini ichib ko‘rganman.',
      en: 'I have tried Korean traditional tea.',
      ru: 'Я пробовал корейский традиционный чай.',
    },
  ),

  ...build(
    'gp_s3_u3_g9_20',
    G9,
    [
      {
        options: ['한국 친구와', '한국 친구를', '한국 친구가'],
        correct: '한국 친구와',
      },
      {
        options: ['한국어로', '한국어를', '한국어가'],
        correct: '한국어로',
      },
      {
        options: ['이야기해', '이야기하고', '이야기하려고'],
        correct: '이야기해',
      },
      {
        options: ['봤어요.', '먹었어요.', '입었어요.'],
        correct: '봤어요.',
      },
    ],
    {
      uz: 'Koreys do‘stim bilan koreys tilida gaplashib ko‘rdim.',
      en: 'I tried speaking in Korean with a Korean friend.',
      ru: 'Я пробовал разговаривать по-корейски с корейским другом.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 10. N 동안
// 명사 + 동안
// 일정한 기간 전체에 걸쳐 행동이나 상태가 이어짐
// 이번 문법에서는 V-는 동안을 섞지 않음
// ─────────────────────────────────────────────
const G10 = 'noun-dongan';

const G10_Q = {
  // grammar_blank 10
  ...blank(
    'gp_s3_u3_g10_01',
    G10,
    '두 시간 동안 한국어를 공부했어요.',
    '두 시간 동안',
    {
      uz: 'Ikki soat davomida koreys tilini o‘rgandim.',
      en: 'I studied Korean for two hours.',
      ru: 'Я изучал корейский язык два часа.',
    },
  ),

  ...blank('gp_s3_u3_g10_02', G10, '방학 동안 고향에 있었어요.', '방학 동안', {
    uz: 'Ta’til davomida tug‘ilgan shahrimda bo‘ldim.',
    en: 'I stayed in my hometown during vacation.',
    ru: 'Во время каникул я был в родном городе.',
  }),

  ...blank(
    'gp_s3_u3_g10_03',
    G10,
    '여행 동안 사진을 많이 찍었어요.',
    '여행 동안',
    {
      uz: 'Sayohat davomida ko‘p suratga oldim.',
      en: 'I took many pictures during the trip.',
      ru: 'Во время поездки я сделал много фотографий.',
    },
  ),

  ...blank(
    'gp_s3_u3_g10_04',
    G10,
    '수업 시간 동안 휴대전화를 사용하지 마세요.',
    '수업 시간 동안',
    {
      uz: 'Dars davomida telefondan foydalanmang.',
      en: 'Do not use your phone during class.',
      ru: 'Не пользуйтесь телефоном во время занятия.',
    },
  ),

  ...blank(
    'gp_s3_u3_g10_05',
    G10,
    '일주일 동안 비가 계속 왔어요.',
    '일주일 동안',
    {
      uz: 'Bir hafta davomida yomg‘ir yog‘di.',
      en: 'It kept raining for a week.',
      ru: 'Дождь шёл целую неделю.',
    },
  ),

  ...blank(
    'gp_s3_u3_g10_06',
    G10,
    '한 달 동안 서울에서 살았어요.',
    '한 달 동안',
    {
      uz: 'Bir oy davomida Seulda yashadim.',
      en: 'I lived in Seoul for a month.',
      ru: 'Я жил в Сеуле один месяц.',
    },
  ),

  ...blank(
    'gp_s3_u3_g10_07',
    G10,
    '주말 동안 집에서 푹 쉬었어요.',
    '주말 동안',
    {
      uz: 'Dam olish kunlari davomida uyda yaxshilab dam oldim.',
      en: 'I rested well at home over the weekend.',
      ru: 'Все выходные я хорошо отдыхал дома.',
    },
  ),

  ...blank(
    'gp_s3_u3_g10_08',
    G10,
    '회의 동안 중요한 내용을 메모했어요.',
    '회의 동안',
    {
      uz: 'Yig‘ilish davomida muhim ma’lumotlarni yozib oldim.',
      en: 'I took notes on important points during the meeting.',
      ru: 'Во время совещания я записывал важные моменты.',
    },
  ),

  ...blank(
    'gp_s3_u3_g10_09',
    G10,
    '시험 기간 동안 매일 도서관에 갔어요.',
    '시험 기간 동안',
    {
      uz: 'Imtihon davrida har kuni kutubxonaga bordim.',
      en: 'I went to the library every day during the exam period.',
      ru: 'Во время экзаменов я каждый день ходил в библиотеку.',
    },
  ),

  ...blank(
    'gp_s3_u3_g10_10',
    G10,
    '축제 기간 동안 관광객이 정말 많았어요.',
    '축제 기간 동안',
    {
      uz: 'Festival davomida sayyohlar juda ko‘p edi.',
      en: 'There were a lot of tourists during the festival.',
      ru: 'Во время фестиваля было очень много туристов.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s3_u3_g10_11',
    G10,
    [
      {
        options: ['두 시간', '두 명', '두 개'],
        correct: '두 시간',
      },
      {
        options: ['동안', '후에', '전에'],
        correct: '동안',
        hints: {
          후에: '두 시간이 끝난 뒤가 아니라 두 시간 전체에 걸친 행동이에요.',
          전에: '두 시간 이전을 말하는 문장이 아니에요.',
        },
      },
      {
        options: ['한국어를', '한국어가', '한국어에'],
        correct: '한국어를',
      },
      {
        options: ['공부했어요.', '도착했어요.', '샀어요.'],
        correct: '공부했어요.',
      },
    ],
    {
      uz: 'Ikki soat davomida koreys tilini o‘rgandim.',
      en: 'I studied Korean for two hours.',
      ru: 'Я изучал корейский язык два часа.',
    },
  ),

  ...build(
    'gp_s3_u3_g10_12',
    G10,
    [
      {
        options: ['방학', '학교', '교실'],
        correct: '방학',
      },
      {
        options: ['동안', '까지', '부터'],
        correct: '동안',
      },
      {
        options: ['고향에', '고향을', '고향이'],
        correct: '고향에',
      },
      {
        options: ['있었어요.', '먹었어요.', '입었어요.'],
        correct: '있었어요.',
      },
    ],
    {
      uz: 'Ta’til davomida tug‘ilgan shahrimda bo‘ldim.',
      en: 'I stayed in my hometown during vacation.',
      ru: 'Во время каникул я был в родном городе.',
    },
  ),

  ...build(
    'gp_s3_u3_g10_13',
    G10,
    [
      {
        options: ['여행', '가방', '사진'],
        correct: '여행',
      },
      {
        options: ['동안', '밖에', '보다'],
        correct: '동안',
      },
      {
        options: ['사진을', '사진이', '사진에'],
        correct: '사진을',
      },
      {
        options: ['많이 찍었어요.', '많이 입었어요.', '많이 탔어요.'],
        correct: '많이 찍었어요.',
      },
    ],
    {
      uz: 'Sayohat davomida ko‘p suratga oldim.',
      en: 'I took many pictures during the trip.',
      ru: 'Во время поездки я сделал много фотографий.',
    },
  ),

  ...build(
    'gp_s3_u3_g10_14',
    G10,
    [
      {
        options: ['수업 시간', '휴대전화', '교과서'],
        correct: '수업 시간',
      },
      {
        options: ['동안', '후에', '까지'],
        correct: '동안',
      },
      {
        options: ['휴대전화를', '휴대전화가', '휴대전화에'],
        correct: '휴대전화를',
      },
      {
        options: ['사용하지 마세요.', '기다리지 마세요.', '닫지 마세요.'],
        correct: '사용하지 마세요.',
      },
    ],
    {
      uz: 'Dars davomida telefondan foydalanmang.',
      en: 'Do not use your phone during class.',
      ru: 'Не пользуйтесь телефоном во время занятия.',
    },
  ),

  ...build(
    'gp_s3_u3_g10_15',
    G10,
    [
      {
        options: ['일주일', '일곱 명', '일곱 개'],
        correct: '일주일',
      },
      {
        options: ['동안', '전에', '밖에'],
        correct: '동안',
      },
      {
        options: ['비가', '비를', '비에'],
        correct: '비가',
      },
      {
        options: ['계속 왔어요.', '계속 먹었어요.', '계속 샀어요.'],
        correct: '계속 왔어요.',
      },
    ],
    {
      uz: 'Bir hafta davomida yomg‘ir yog‘di.',
      en: 'It kept raining for a week.',
      ru: 'Дождь шёл целую неделю.',
    },
  ),

  ...build(
    'gp_s3_u3_g10_16',
    G10,
    [
      {
        options: ['한 달', '한 명', '한 잔'],
        correct: '한 달',
      },
      {
        options: ['동안', '마다', '밖에'],
        correct: '동안',
      },
      {
        options: ['서울에서', '서울에', '서울을'],
        correct: '서울에서',
      },
      {
        options: ['살았어요.', '마셨어요.', '읽었어요.'],
        correct: '살았어요.',
      },
    ],
    {
      uz: 'Bir oy davomida Seulda yashadim.',
      en: 'I lived in Seoul for a month.',
      ru: 'Я жил в Сеуле один месяц.',
    },
  ),

  ...build(
    'gp_s3_u3_g10_17',
    G10,
    [
      {
        options: ['주말', '오후', '버스'],
        correct: '주말',
      },
      {
        options: ['동안', '에서', '보다'],
        correct: '동안',
      },
      {
        options: ['집에서', '집을', '집이'],
        correct: '집에서',
      },
      {
        options: ['푹 쉬었어요.', '푹 먹었어요.', '푹 샀어요.'],
        correct: '푹 쉬었어요.',
      },
    ],
    {
      uz: 'Dam olish kunlari uyda yaxshilab dam oldim.',
      en: 'I rested well at home over the weekend.',
      ru: 'Все выходные я хорошо отдыхал дома.',
    },
  ),

  ...build(
    'gp_s3_u3_g10_18',
    G10,
    [
      {
        options: ['회의', '회사원', '사무실'],
        correct: '회의',
      },
      {
        options: ['동안', '까지', '이나'],
        correct: '동안',
      },
      {
        options: ['중요한 내용을', '중요한 내용이', '중요한 내용에'],
        correct: '중요한 내용을',
      },
      {
        options: ['메모했어요.', '입었어요.', '탔어요.'],
        correct: '메모했어요.',
      },
    ],
    {
      uz: 'Yig‘ilish davomida muhim ma’lumotlarni yozib oldim.',
      en: 'I took notes during the meeting.',
      ru: 'Во время совещания я делал записи.',
    },
  ),

  ...build(
    'gp_s3_u3_g10_19',
    G10,
    [
      {
        options: ['시험 기간', '시험 문제', '시험 점수'],
        correct: '시험 기간',
      },
      {
        options: ['동안', '보다', '이나'],
        correct: '동안',
      },
      {
        options: ['매일', '아직', '갑자기'],
        correct: '매일',
      },
      {
        options: [
          '도서관에 갔어요.',
          '도서관을 먹었어요.',
          '도서관이 입었어요.',
        ],
        correct: '도서관에 갔어요.',
      },
    ],
    {
      uz: 'Imtihon davrida har kuni kutubxonaga bordim.',
      en: 'I went to the library every day during the exam period.',
      ru: 'Во время экзаменов я каждый день ходил в библиотеку.',
    },
  ),

  ...build(
    'gp_s3_u3_g10_20',
    G10,
    [
      {
        options: ['축제 기간', '축제 음식', '축제 사진'],
        correct: '축제 기간',
      },
      {
        options: ['동안', '후에', '보다'],
        correct: '동안',
      },
      {
        options: ['관광객이', '관광객을', '관광객에'],
        correct: '관광객이',
      },
      {
        options: ['정말 많았어요.', '정말 마셨어요.', '정말 입었어요.'],
        correct: '정말 많았어요.',
      },
    ],
    {
      uz: 'Festival davomida sayyohlar juda ko‘p edi.',
      en: 'There were many tourists during the festival.',
      ru: 'Во время фестиваля было очень много туристов.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 11. A-(으)ㄴ데, V-는데, N인데 1
// 배경·상황을 제시하거나
// 서로 대비되는 내용을 자연스럽게 연결
// ─────────────────────────────────────────────
const G11 = 'connective-neunde-1';

const G11_Q = {
  // grammar_blank 10
  ...blank(
    'gp_s3_u3_g11_01',
    G11,
    '이 식당은 음식이 맛있는데 가격이 조금 비싸요.',
    '맛있는데',
    {
      uz: 'Bu restoranning taomi mazali, lekin narxi biroz qimmat.',
      en: 'The food at this restaurant is delicious, but it is a little expensive.',
      ru: 'В этом ресторане вкусная еда, но цены немного высокие.',
    },
  ),

  ...blank(
    'gp_s3_u3_g11_02',
    G11,
    '오늘은 날씨가 좋은데 바람이 많이 불어요.',
    '좋은데',
    {
      uz: 'Bugun ob-havo yaxshi, lekin shamol kuchli.',
      en: 'The weather is nice today, but it is very windy.',
      ru: 'Сегодня хорошая погода, но дует сильный ветер.',
    },
  ),

  ...blank(
    'gp_s3_u3_g11_03',
    G11,
    '이 가방은 예쁜데 조금 무거워요.',
    '예쁜데',
    {
      uz: 'Bu sumka chiroyli, lekin biroz og‘ir.',
      en: 'This bag is pretty, but it is a little heavy.',
      ru: 'Эта сумка красивая, но немного тяжёлая.',
    },
  ),

  ...blank('gp_s3_u3_g11_04', G11, '제 방은 작은데 아주 조용해요.', '작은데', {
    uz: 'Mening xonam kichik, lekin juda tinch.',
    en: 'My room is small, but it is very quiet.',
    ru: 'Моя комната маленькая, но очень тихая.',
  }),

  ...blank('gp_s3_u3_g11_05', G11, '서울은 큰데 사람이 정말 많아요.', '큰데', {
    uz: 'Seul katta, odamlar esa juda ko‘p.',
    en: 'Seoul is big, and there are a lot of people.',
    ru: 'Сеул большой, и в нём очень много людей.',
  }),

  ...blank(
    'gp_s3_u3_g11_06',
    G11,
    '지금 비가 오는데 우산이 없어요.',
    '비가 오는데',
    {
      uz: 'Hozir yomg‘ir yog‘yapti, lekin soyabonim yo‘q.',
      en: 'It is raining now, but I do not have an umbrella.',
      ru: 'Сейчас идёт дождь, а у меня нет зонта.',
    },
  ),

  ...blank(
    'gp_s3_u3_g11_07',
    G11,
    '친구를 기다리는데 아직 안 와요.',
    '기다리는데',
    {
      uz: 'Do‘stimni kutyapman, lekin u hali kelmadi.',
      en: 'I am waiting for my friend, but they have not arrived yet.',
      ru: 'Я жду друга, но он ещё не пришёл.',
    },
  ),

  ...blank(
    'gp_s3_u3_g11_08',
    G11,
    '저는 한국어를 공부하는데 발음이 아직 어려워요.',
    '공부하는데',
    {
      uz: 'Men koreys tilini o‘rganyapman, lekin talaffuz hali qiyin.',
      en: 'I am studying Korean, but pronunciation is still difficult.',
      ru: 'Я изучаю корейский, но произношение пока сложное.',
    },
  ),

  ...blank(
    'gp_s3_u3_g11_09',
    G11,
    '여기는 도서관인데 사람이 별로 없어요.',
    '도서관인데',
    {
      uz: 'Bu yer kutubxona, lekin odam deyarli yo‘q.',
      en: 'This is a library, but there are not many people here.',
      ru: 'Это библиотека, но здесь почти нет людей.',
    },
  ),

  ...blank(
    'gp_s3_u3_g11_10',
    G11,
    '민수 씨는 학생인데 주말에 아르바이트를 해요.',
    '학생인데',
    {
      uz: 'Minsu talaba va dam olish kunlari ishlaydi.',
      en: 'Minsu is a student, and he works part-time on weekends.',
      ru: 'Минсу студент и по выходным подрабатывает.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s3_u3_g11_11',
    G11,
    [
      {
        options: ['이 카페는', '이 카페를', '이 카페에'],
        correct: '이 카페는',
      },
      {
        options: ['분위기가', '분위기를', '분위기에'],
        correct: '분위기가',
      },
      {
        options: ['좋은데', '좋는데', '좋을데'],
        correct: '좋은데',
        hints: {
          좋는데: "형용사 '좋다'는 받침이 있으므로 '좋은데'가 돼요.",
          좋을데: '미래 관형형을 만드는 자리가 아니에요.',
        },
      },
      {
        options: ['조금 비싸요.', '조금 읽어요.', '조금 만나요.'],
        correct: '조금 비싸요.',
      },
    ],
    {
      uz: 'Bu kafening muhiti yaxshi, lekin biroz qimmat.',
      en: 'This cafe has a nice atmosphere, but it is a little expensive.',
      ru: 'В этом кафе приятная атмосфера, но оно немного дорогое.',
    },
  ),

  ...build(
    'gp_s3_u3_g11_12',
    G11,
    [
      {
        options: ['이 옷은', '이 옷을', '이 옷에'],
        correct: '이 옷은',
      },
      {
        options: ['비싼데', '비싸는데', '비쌀데'],
        correct: '비싼데',
      },
      {
        options: ['디자인이', '디자인을', '디자인에'],
        correct: '디자인이',
      },
      {
        options: ['예뻐요.', '먹어요.', '가요.'],
        correct: '예뻐요.',
      },
    ],
    {
      uz: 'Bu kiyim qimmat, lekin dizayni chiroyli.',
      en: 'These clothes are expensive, but the design is pretty.',
      ru: 'Эта одежда дорогая, но дизайн красивый.',
    },
  ),

  ...build(
    'gp_s3_u3_g11_13',
    G11,
    [
      {
        options: ['학교가', '학교를', '학교에'],
        correct: '학교가',
      },
      {
        options: ['먼데', '멀은데', '멀는데'],
        correct: '먼데',
        hints: {
          멀은데: "ㄹ 받침 형용사는 ㄹ이 탈락해서 '먼데'가 돼요.",
          멀는데: "형용사 '멀다'는 동사처럼 '-는데'를 붙이지 않아요.",
        },
      },
      {
        options: ['버스가', '버스를', '버스에'],
        correct: '버스가',
      },
      {
        options: ['자주 와요.', '자주 먹어요.', '자주 입어요.'],
        correct: '자주 와요.',
      },
    ],
    {
      uz: 'Maktab uzoq, lekin avtobus tez-tez keladi.',
      en: 'The school is far, but buses come frequently.',
      ru: 'Школа далеко, но автобусы ходят часто.',
    },
  ),

  ...build(
    'gp_s3_u3_g11_14',
    G11,
    [
      {
        options: ['질문이', '질문을', '질문에'],
        correct: '질문이',
      },
      {
        options: ['있는데', '있는은데', '있은데'],
        correct: '있는데',
      },
      {
        options: [
          '지금 물어봐도 돼요?',
          '지금 입어도 돼요?',
          '지금 먹어도 돼요?',
        ],
        correct: '지금 물어봐도 돼요?',
      },
    ],
    {
      uz: 'Savolim bor, hozir so‘rasam bo‘ladimi?',
      en: 'I have a question. May I ask it now?',
      ru: 'У меня есть вопрос. Можно сейчас спросить?',
    },
  ),

  ...build(
    'gp_s3_u3_g11_15',
    G11,
    [
      {
        options: ['시간이', '시간을', '시간에'],
        correct: '시간이',
      },
      {
        options: ['없는데', '없는은데', '없은데'],
        correct: '없는데',
      },
      {
        options: ['어떻게 해야 해요?', '무엇을 먹었어요?', '어디에 살아요?'],
        correct: '어떻게 해야 해요?',
      },
    ],
    {
      uz: 'Vaqtim yo‘q, nima qilishim kerak?',
      en: 'I do not have time. What should I do?',
      ru: 'У меня нет времени. Что мне делать?',
    },
  ),

  ...build(
    'gp_s3_u3_g11_16',
    G11,
    [
      {
        options: ['지금', '어제', '내일'],
        correct: '지금',
      },
      {
        options: ['집에', '집을', '집이'],
        correct: '집에',
      },
      {
        options: ['가는데', '간데', '갈데'],
        correct: '가는데',
      },
      {
        options: ['같이 갈래요?', '같이 먹었어요?', '같이 잤어요?'],
        correct: '같이 갈래요?',
      },
    ],
    {
      uz: 'Hozir uyga ketyapman, birga borasizmi?',
      en: 'I am going home now. Do you want to go together?',
      ru: 'Я сейчас иду домой. Пойдём вместе?',
    },
  ),

  ...build(
    'gp_s3_u3_g11_17',
    G11,
    [
      {
        options: ['저는', '저를', '제가'],
        correct: '저는',
      },
      {
        options: ['매운 음식을', '매운 음식이', '매운 음식에'],
        correct: '매운 음식을',
      },
      {
        options: ['먹는데', '먹은데', '먹을데'],
        correct: '먹는데',
      },
      {
        options: [
          '친구는 못 먹어요.',
          '친구는 못 읽어요.',
          '친구는 못 입어요.',
        ],
        correct: '친구는 못 먹어요.',
      },
    ],
    {
      uz: 'Men achchiq ovqat yeyman, lekin do‘stim yeya olmaydi.',
      en: 'I eat spicy food, but my friend cannot.',
      ru: 'Я ем острую пищу, а мой друг не может.',
    },
  ),

  ...build(
    'gp_s3_u3_g11_18',
    G11,
    [
      {
        options: ['저는', '저를', '제가'],
        correct: '저는',
      },
      {
        options: ['서울에서', '서울에', '서울을'],
        correct: '서울에서',
      },
      {
        options: ['사는데', '살는데', '살은데'],
        correct: '사는데',
        hints: {
          살는데: "ㄹ 받침 동사는 '-는' 앞에서 ㄹ이 탈락해서 '사는데'가 돼요.",
          살은데: "현재 동사에는 '-은데'를 사용하지 않아요.",
        },
      },
      {
        options: [
          '회사도 서울에 있어요.',
          '회사를 먹어요.',
          '회사가 비빔밥이에요.',
        ],
        correct: '회사도 서울에 있어요.',
      },
    ],
    {
      uz: 'Men Seulda yashayman va kompaniyam ham Seulda.',
      en: 'I live in Seoul, and my company is also in Seoul.',
      ru: 'Я живу в Сеуле, и моя компания тоже находится в Сеуле.',
    },
  ),

  ...build(
    'gp_s3_u3_g11_19',
    G11,
    [
      {
        options: ['제 형은', '제 형을', '제 형에게'],
        correct: '제 형은',
      },
      {
        options: ['회사원인데', '회사원는데', '회사원은데'],
        correct: '회사원인데',
        hints: {
          회사원는데: "명사 뒤에는 '인데'를 사용해요.",
          회사원은데: "명사에 '-은데'를 직접 붙이지 않아요.",
        },
      },
      {
        options: [
          '요즘 아주 바빠요.',
          '요즘 아주 먹어요.',
          '요즘 아주 입어요.',
        ],
        correct: '요즘 아주 바빠요.',
      },
    ],
    {
      uz: 'Akam ofis xodimi va shu kunlarda juda band.',
      en: 'My older brother is an office worker, and he is very busy these days.',
      ru: 'Мой старший брат работает в компании и сейчас очень занят.',
    },
  ),

  ...build(
    'gp_s3_u3_g11_20',
    G11,
    [
      {
        options: ['오늘은', '오늘을', '오늘이'],
        correct: '오늘은',
      },
      {
        options: ['주말인데', '주말는데', '주말은데'],
        correct: '주말인데',
      },
      {
        options: [
          '회사에 가야 해요.',
          '회사에 먹어야 해요.',
          '회사에 읽어야 해요.',
        ],
        correct: '회사에 가야 해요.',
      },
    ],
    {
      uz: 'Bugun dam olish kuni, lekin ishxonaga borishim kerak.',
      en: 'It is the weekend, but I have to go to work.',
      ru: 'Сегодня выходной, но мне нужно идти на работу.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 12. V-(으)ㄹ N
// 받침 O → V-을 N
// 받침 X → V-ㄹ N
// ㄹ 받침 → ㄹ 유지 + N
// 앞으로 하거나 예정된 행동으로 뒤 명사를 꾸밈
// ─────────────────────────────────────────────
const G12 = 'verb-eul-noun';

const G12_Q = {
  // grammar_blank 10
  ...blank(
    'gp_s3_u3_g12_01',
    G12,
    '내일 읽을 책을 도서관에서 빌렸어요.',
    '내일 읽을 책',
    {
      uz: 'Ertaga o‘qiydigan kitobimni kutubxonadan oldim.',
      en: 'I borrowed the book I will read tomorrow from the library.',
      ru: 'Я взял в библиотеке книгу, которую буду читать завтра.',
    },
  ),

  ...blank(
    'gp_s3_u3_g12_02',
    G12,
    '주말에 만날 친구에게 연락했어요.',
    '주말에 만날 친구',
    {
      uz: 'Dam olish kuni uchrashadigan do‘stim bilan bog‘landim.',
      en: 'I contacted the friend I will meet this weekend.',
      ru: 'Я связался с другом, с которым встречусь на выходных.',
    },
  ),

  ...blank(
    'gp_s3_u3_g12_03',
    G12,
    '여행할 곳을 인터넷에서 찾아봤어요.',
    '여행할 곳',
    {
      uz: 'Sayohat qiladigan joylarni internetdan qidirdim.',
      en: 'I looked online for places to travel to.',
      ru: 'Я поискал в интернете места для путешествия.',
    },
  ),

  ...blank(
    'gp_s3_u3_g12_04',
    G12,
    '오늘 저녁에 먹을 음식을 준비했어요.',
    '먹을 음식',
    {
      uz: 'Bugun kechqurun yeydigan ovqatni tayyorladim.',
      en: 'I prepared the food we will eat this evening.',
      ru: 'Я приготовил еду, которую мы будем есть сегодня вечером.',
    },
  ),

  ...blank(
    'gp_s3_u3_g12_05',
    G12,
    '마트에서 살 물건을 메모했어요.',
    '살 물건',
    {
      uz: 'Do‘kondan sotib oladigan narsalarni yozib oldim.',
      en: 'I wrote down the things I need to buy at the supermarket.',
      ru: 'Я записал вещи, которые нужно купить в магазине.',
    },
  ),

  ...blank(
    'gp_s3_u3_g12_06',
    G12,
    '내일 만들 음식을 미리 정했어요.',
    '만들 음식',
    {
      uz: 'Ertaga tayyorlaydigan taomni oldindan tanladim.',
      en: 'I decided in advance what food I will make tomorrow.',
      ru: 'Я заранее решил, что буду готовить завтра.',
    },
  ),

  ...blank('gp_s3_u3_g12_07', G12, '이번 방학에 갈 곳은 제주도예요.', '갈 곳', {
    uz: 'Bu ta’tilda boradigan joyim Jeju.',
    en: 'The place I will go this vacation is Jeju.',
    ru: 'На этих каникулах я поеду на Чеджудо.',
  }),

  ...blank('gp_s3_u3_g12_08', G12, '오늘 밤에 볼 영화를 골랐어요.', '볼 영화', {
    uz: 'Bugun kechqurun ko‘radigan filmni tanladim.',
    en: 'I chose the movie I will watch tonight.',
    ru: 'Я выбрал фильм, который посмотрю сегодня вечером.',
  }),

  ...blank(
    'gp_s3_u3_g12_09',
    G12,
    '여행에서 찍을 사진을 생각하며 카메라를 준비했어요.',
    '찍을 사진',
    {
      uz: 'Sayohatda oladigan suratlarimni o‘ylab kamerani tayyorladim.',
      en: 'I prepared my camera thinking about the photos I will take on the trip.',
      ru: 'Я подготовил камеру, думая о фотографиях, которые сделаю в поездке.',
    },
  ),

  ...blank(
    'gp_s3_u3_g12_10',
    G12,
    '내일 입을 옷을 미리 준비했어요.',
    '입을 옷',
    {
      uz: 'Ertaga kiyadigan kiyimimni oldindan tayyorladim.',
      en: 'I prepared the clothes I will wear tomorrow.',
      ru: 'Я заранее приготовил одежду, которую надену завтра.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s3_u3_g12_11',
    G12,
    [
      {
        options: ['내일', '어제', '지난주에'],
        correct: '내일',
      },
      {
        options: ['읽을', '읽는', '읽은'],
        correct: '읽을',
        hints: {
          읽는: '내일 할 행동이므로 현재 관형형이 아니에요.',
          읽은: '이미 읽은 책이 아니라 앞으로 읽을 책이에요.',
        },
      },
      {
        options: ['책을', '책이', '책에'],
        correct: '책을',
      },
      {
        options: [
          '도서관에서 빌렸어요.',
          '도서관을 먹었어요.',
          '도서관이 입었어요.',
        ],
        correct: '도서관에서 빌렸어요.',
      },
    ],
    {
      uz: 'Ertaga o‘qiydigan kitobimni kutubxonadan oldim.',
      en: 'I borrowed the book I will read tomorrow.',
      ru: 'Я взял книгу, которую буду читать завтра.',
    },
  ),

  ...build(
    'gp_s3_u3_g12_12',
    G12,
    [
      {
        options: ['주말에', '어제', '지난달에'],
        correct: '주말에',
      },
      {
        options: ['만날', '만나는', '만난'],
        correct: '만날',
      },
      {
        options: ['친구에게', '친구를', '친구가'],
        correct: '친구에게',
      },
      {
        options: ['연락했어요.', '먹었어요.', '입었어요.'],
        correct: '연락했어요.',
      },
    ],
    {
      uz: 'Dam olish kuni uchrashadigan do‘stim bilan bog‘landim.',
      en: 'I contacted the friend I will meet this weekend.',
      ru: 'Я связался с другом, с которым встречусь на выходных.',
    },
  ),

  ...build(
    'gp_s3_u3_g12_13',
    G12,
    [
      {
        options: ['여행할', '여행하는', '여행한'],
        correct: '여행할',
      },
      {
        options: ['곳을', '곳이', '곳에'],
        correct: '곳을',
      },
      {
        options: ['인터넷에서', '인터넷을', '인터넷이'],
        correct: '인터넷에서',
      },
      {
        options: ['찾아봤어요.', '마셔봤어요.', '입어봤어요.'],
        correct: '찾아봤어요.',
      },
    ],
    {
      uz: 'Sayohat qiladigan joylarni internetdan qidirdim.',
      en: 'I looked online for places to travel to.',
      ru: 'Я поискал в интернете места для путешествия.',
    },
  ),

  ...build(
    'gp_s3_u3_g12_14',
    G12,
    [
      {
        options: ['오늘 저녁에', '어제 저녁에', '지난주에'],
        correct: '오늘 저녁에',
      },
      {
        options: ['먹을', '먹는', '먹은'],
        correct: '먹을',
      },
      {
        options: ['음식을', '음식이', '음식에'],
        correct: '음식을',
      },
      {
        options: ['준비했어요.', '도착했어요.', '만났어요.'],
        correct: '준비했어요.',
      },
    ],
    {
      uz: 'Bugun kechqurun yeydigan ovqatni tayyorladim.',
      en: 'I prepared the food we will eat this evening.',
      ru: 'Я приготовил еду, которую мы будем есть сегодня вечером.',
    },
  ),

  ...build(
    'gp_s3_u3_g12_15',
    G12,
    [
      {
        options: ['마트에서', '마트를', '마트가'],
        correct: '마트에서',
      },
      {
        options: ['살', '사는', '산'],
        correct: '살',
        hints: {
          사는: '지금 사고 있는 물건이 아니라 앞으로 살 물건이에요.',
          산: '이미 산 물건이 아니라 앞으로 살 물건이에요.',
        },
      },
      {
        options: ['물건을', '물건이', '물건에'],
        correct: '물건을',
      },
      {
        options: ['메모했어요.', '먹었어요.', '입었어요.'],
        correct: '메모했어요.',
      },
    ],
    {
      uz: 'Do‘kondan sotib oladigan narsalarni yozib oldim.',
      en: 'I wrote down the things I need to buy at the supermarket.',
      ru: 'Я записал вещи, которые нужно купить в магазине.',
    },
  ),

  ...build(
    'gp_s3_u3_g12_16',
    G12,
    [
      {
        options: ['내일', '어제', '지난주'],
        correct: '내일',
      },
      {
        options: ['만들', '만드는', '만든'],
        correct: '만들',
        hints: {
          만드는: '앞으로 만들 음식이므로 현재 관형형이 아니에요.',
          만든: '이미 만든 음식이 아니라 내일 만들 음식이에요.',
        },
      },
      {
        options: ['음식을', '음식이', '음식에'],
        correct: '음식을',
      },
      {
        options: ['미리 정했어요.', '미리 먹었어요.', '미리 입었어요.'],
        correct: '미리 정했어요.',
      },
    ],
    {
      uz: 'Ertaga tayyorlaydigan taomni oldindan tanladim.',
      en: 'I decided in advance what food I will make tomorrow.',
      ru: 'Я заранее решил, что буду готовить завтра.',
    },
  ),

  ...build(
    'gp_s3_u3_g12_17',
    G12,
    [
      {
        options: ['이번 방학에', '지난 방학에', '어제'],
        correct: '이번 방학에',
      },
      {
        options: ['갈', '가는', '간'],
        correct: '갈',
      },
      {
        options: ['곳은', '곳을', '곳에'],
        correct: '곳은',
      },
      {
        options: ['제주도예요.', '제주도를 먹어요.', '제주도가 입어요.'],
        correct: '제주도예요.',
      },
    ],
    {
      uz: 'Bu ta’tilda boradigan joyim Jeju.',
      en: 'The place I will go this vacation is Jeju.',
      ru: 'На этих каникулах я поеду на Чеджудо.',
    },
  ),

  ...build(
    'gp_s3_u3_g12_18',
    G12,
    [
      {
        options: ['오늘 밤에', '어젯밤에', '지난달에'],
        correct: '오늘 밤에',
      },
      {
        options: ['볼', '보는', '본'],
        correct: '볼',
      },
      {
        options: ['영화를', '영화가', '영화에'],
        correct: '영화를',
      },
      {
        options: ['골랐어요.', '잃었어요.', '마셨어요.'],
        correct: '골랐어요.',
      },
    ],
    {
      uz: 'Bugun kechqurun ko‘radigan filmni tanladim.',
      en: 'I chose the movie I will watch tonight.',
      ru: 'Я выбрал фильм, который посмотрю сегодня вечером.',
    },
  ),

  ...build(
    'gp_s3_u3_g12_19',
    G12,
    [
      {
        options: ['여행에서', '여행을', '여행이'],
        correct: '여행에서',
      },
      {
        options: ['찍을', '찍는', '찍은'],
        correct: '찍을',
      },
      {
        options: ['사진을', '사진이', '사진에'],
        correct: '사진을',
      },
      {
        options: ['생각하며', '먹으며', '입으며'],
        correct: '생각하며',
      },
      {
        options: [
          '카메라를 준비했어요.',
          '카메라를 먹었어요.',
          '카메라를 입었어요.',
        ],
        correct: '카메라를 준비했어요.',
      },
    ],
    {
      uz: 'Sayohatda oladigan suratlarimni o‘ylab kamerani tayyorladim.',
      en: 'I prepared my camera thinking about the photos I will take.',
      ru: 'Я подготовил камеру, думая о будущих фотографиях.',
    },
  ),

  ...build(
    'gp_s3_u3_g12_20',
    G12,
    [
      {
        options: ['내일', '어제', '지난주'],
        correct: '내일',
      },
      {
        options: ['입을', '입는', '입은'],
        correct: '입을',
      },
      {
        options: ['옷을', '옷이', '옷에'],
        correct: '옷을',
      },
      {
        options: ['미리 준비했어요.', '미리 먹었어요.', '미리 읽었어요.'],
        correct: '미리 준비했어요.',
      },
    ],
    {
      uz: 'Ertaga kiyadigan kiyimimni oldindan tayyorladim.',
      en: 'I prepared the clothes I will wear tomorrow.',
      ru: 'Я заранее приготовил одежду, которую надену завтра.',
    },
  ),
};

// ═══════════════════════════════════════════════════════════
// UNIT 4
// 추측 · 비교 · 희망
// ═══════════════════════════════════════════════════════════

// ─────────────────────────────────────────────
// 문법 13.
// A-(으)ㄴ 것 같다, V-는 것 같다, N인 것 같다
//
// 현재 보이는 상황이나 알고 있는 정보를 바탕으로
// 상태·행동·정체를 조심스럽게 추측
//
// A 받침 O → A-은 것 같다
// A 받침 X → A-ㄴ 것 같다
// A ㄹ 받침 → ㄹ 탈락 + ㄴ 것 같다
// V → V-는 것 같다
// V ㄹ 받침 → ㄹ 탈락 + 는 것 같다
// N → N인 것 같다
// ─────────────────────────────────────────────
const G13 = 'geot-gatda-present';

const G13_Q = {
  // ═══════════════════════════════════════════
  // grammar_blank 10
  // ═══════════════════════════════════════════

  ...blank(
    'gp_s3_u4_g13_01',
    G13,
    '밖에 사람들이 우산을 쓰고 있어요. 비가 오는 것 같아요.',
    '비가 오는 것 같아요',
    {
      uz: 'Tashqarida odamlar soyabon tutib yuribdi. Yomg‘ir yog‘ayotganga o‘xshaydi.',
      en: 'People outside are using umbrellas. It looks like it is raining.',
      ru: 'На улице люди идут с зонтами. Кажется, идёт дождь.',
    },
  ),

  ...blank(
    'gp_s3_u4_g13_02',
    G13,
    '불이 모두 꺼져 있어요. 가게가 문을 닫은 것 같아요.',
    '문을 닫은 것 같아요',
    {
      uz: 'Hamma chiroqlar o‘chiq. Do‘kon yopiq shekilli.',
      en: 'All the lights are off. It looks like the store is closed.',
      ru: 'Все огни выключены. Похоже, магазин закрыт.',
    },
  ),

  ...blank(
    'gp_s3_u4_g13_03',
    G13,
    '민수 씨가 계속 하품을 해요. 많이 피곤한 것 같아요.',
    '많이 피곤한 것 같아요',
    {
      uz: 'Minsu tinmay esnayapti. Juda charchaganga o‘xshaydi.',
      en: 'Minsu keeps yawning. He seems very tired.',
      ru: 'Минсу постоянно зевает. Кажется, он очень устал.',
    },
  ),

  ...blank(
    'gp_s3_u4_g13_04',
    G13,
    '식당 앞에 사람들이 길게 기다리고 있어요. 유명한 식당인 것 같아요.',
    '유명한 식당인 것 같아요',
    {
      uz: 'Restoran oldida uzun navbat bor. Bu mashhur restoran bo‘lsa kerak.',
      en: 'There is a long line outside. It seems to be a famous restaurant.',
      ru: 'Перед рестораном длинная очередь. Похоже, это известный ресторан.',
    },
  ),

  ...blank(
    'gp_s3_u4_g13_05',
    G13,
    '지수 씨가 계속 시계를 봐요. 누구를 기다리는 것 같아요.',
    '누구를 기다리는 것 같아요',
    {
      uz: 'Jisu doim soatiga qarayapti. Kimnidir kutayotganga o‘xshaydi.',
      en: 'Jisu keeps checking the time. It looks like she is waiting for someone.',
      ru: 'Чису постоянно смотрит на часы. Кажется, она кого-то ждёт.',
    },
  ),

  ...blank(
    'gp_s3_u4_g13_06',
    G13,
    '이 옷은 입었을 때 움직이기가 편해요. 생각보다 편한 것 같아요.',
    '편한 것 같아요',
    {
      uz: 'Bu kiyimda harakat qilish qulay. O‘ylaganimdan qulayroq shekilli.',
      en: 'It is easy to move in these clothes. They seem more comfortable than I expected.',
      ru: 'В этой одежде удобно двигаться. Кажется, она удобнее, чем я думал.',
    },
  ),

  ...blank(
    'gp_s3_u4_g13_07',
    G13,
    '저 사람은 학생증을 가지고 있어요. 이 학교 학생인 것 같아요.',
    '이 학교 학생인 것 같아요',
    {
      uz: 'U odamda talabalik guvohnomasi bor. Shu maktabning talabasi bo‘lsa kerak.',
      en: 'That person has a student ID. They seem to be a student at this school.',
      ru: 'У того человека студенческий билет. Похоже, он студент этой школы.',
    },
  ),

  ...blank(
    'gp_s3_u4_g13_08',
    G13,
    '아기가 계속 울고 있어요. 배가 고픈 것 같아요.',
    '배가 고픈 것 같아요',
    {
      uz: 'Chaqaloq tinmay yig‘layapti. Qorni ochganga o‘xshaydi.',
      en: 'The baby keeps crying. It seems to be hungry.',
      ru: 'Ребёнок всё время плачет. Кажется, он голоден.',
    },
  ),

  ...blank(
    'gp_s3_u4_g13_09',
    G13,
    '옆집에서 계속 음악 소리가 들려요. 파티를 하는 것 같아요.',
    '파티를 하는 것 같아요',
    {
      uz: 'Qo‘shni uydan musiqa ovozi tinmay eshitilyapti. Bayram qilishayotganga o‘xshaydi.',
      en: 'I keep hearing music from next door. It sounds like they are having a party.',
      ru: 'Из соседней квартиры постоянно слышна музыка. Похоже, там вечеринка.',
    },
  ),

  ...blank(
    'gp_s3_u4_g13_10',
    G13,
    '표정이 밝아졌어요. 좋은 일이 있는 것 같아요.',
    '좋은 일이 있는 것 같아요',
    {
      uz: 'Yuzi yorishib ketdi. Yaxshi bir voqea bo‘lganga o‘xshaydi.',
      en: 'They look much happier. It seems something good is going on.',
      ru: 'Выражение лица стало радостнее. Кажется, случилось что-то хорошее.',
    },
  ),

  // ═══════════════════════════════════════════
  // grammar_build 10
  // ═══════════════════════════════════════════

  ...build(
    'gp_s3_u4_g13_11',
    G13,
    [
      {
        options: ['밖에', '밖을', '밖이'],
        correct: '밖에',
      },
      {
        options: ['사람들이', '사람들을', '사람들에게'],
        correct: '사람들이',
      },
      {
        options: [
          '우산을 쓰고 있어요.',
          '반팔을 입고 있어요.',
          '햇빛을 보고 있어요.',
        ],
        correct: '우산을 쓰고 있어요.',
      },
      {
        options: ['비가 오는', '비가 온', '비가 올'],
        correct: '비가 오는',
        hints: {
          '비가 온': '지금 보이는 상황에 대한 현재 추측이에요.',
          '비가 올': '앞으로 비가 올 것이라는 미래 예측이 아니에요.',
        },
      },
      {
        options: ['것 같아요.', '줄 알아요.', '적이 있어요.'],
        correct: '것 같아요.',
      },
    ],
    {
      uz: 'Tashqarida odamlar soyabon tutib yuribdi. Yomg‘ir yog‘ayotganga o‘xshaydi.',
      en: 'People outside have umbrellas. It looks like it is raining.',
      ru: 'На улице люди с зонтами. Кажется, идёт дождь.',
    },
  ),

  ...build(
    'gp_s3_u4_g13_12',
    G13,
    [
      {
        options: ['민수 씨가', '민수 씨를', '민수 씨에게'],
        correct: '민수 씨가',
      },
      {
        options: ['계속 하품을 해요.', '계속 웃고 있어요.', '계속 뛰어요.'],
        correct: '계속 하품을 해요.',
      },
      {
        options: ['많이 피곤한', '많이 피곤하는', '많이 피곤할'],
        correct: '많이 피곤한',
        hints: {
          '많이 피곤하는': "형용사 '피곤하다'에는 '-는'을 사용하지 않아요.",
          '많이 피곤할':
            '앞으로 피곤할 것이라는 예측이 아니라 현재 상태 추측이에요.',
        },
      },
      {
        options: ['것 같아요.', '중이에요.', '줄 몰라요.'],
        correct: '것 같아요.',
      },
    ],
    {
      uz: 'Minsu tinmay esnayapti. Juda charchaganga o‘xshaydi.',
      en: 'Minsu keeps yawning. He seems very tired.',
      ru: 'Минсу постоянно зевает. Кажется, он очень устал.',
    },
  ),

  ...build(
    'gp_s3_u4_g13_13',
    G13,
    [
      {
        options: ['이 방은', '이 방을', '이 방에'],
        correct: '이 방은',
      },
      {
        options: ['창문이 크고', '창문을 크고', '창문에 크고'],
        correct: '창문이 크고',
      },
      {
        options: ['햇빛도 잘 들어와요.', '햇빛도 먹어요.', '햇빛도 입어요.'],
        correct: '햇빛도 잘 들어와요.',
      },
      {
        options: ['밝은', '밝는', '밝을'],
        correct: '밝은',
      },
      {
        options: ['것 같아요.', '줄 알아요.', '적이 있어요.'],
        correct: '것 같아요.',
      },
    ],
    {
      uz: 'Bu xonaning derazasi katta va quyosh yaxshi tushadi. Xona yorug‘ bo‘lsa kerak.',
      en: 'The room has a large window and gets plenty of sunlight. It seems bright.',
      ru: 'В комнате большое окно и много солнечного света. Кажется, здесь светло.',
    },
  ),

  ...build(
    'gp_s3_u4_g13_14',
    G13,
    [
      {
        options: ['저 사람은', '저 사람을', '저 사람에게'],
        correct: '저 사람은',
      },
      {
        options: ['학생증을', '학생증이', '학생증에'],
        correct: '학생증을',
      },
      {
        options: ['가지고 있어요.', '마시고 있어요.', '입고 있어요.'],
        correct: '가지고 있어요.',
      },
      {
        options: ['학생인', '학생은', '학생이라는'],
        correct: '학생인',
      },
      {
        options: ['것 같아요.', '동안이에요.', '줄 알아요.'],
        correct: '것 같아요.',
      },
    ],
    {
      uz: 'U odamda talabalik guvohnomasi bor. Talaba bo‘lsa kerak.',
      en: 'That person has a student ID. They seem to be a student.',
      ru: 'У того человека студенческий билет. Похоже, он студент.',
    },
  ),

  ...build(
    'gp_s3_u4_g13_15',
    G13,
    [
      {
        options: ['지수 씨가', '지수 씨를', '지수 씨에게'],
        correct: '지수 씨가',
      },
      {
        options: ['계속 시계를 봐요.', '계속 밥을 먹어요.', '계속 책을 사요.'],
        correct: '계속 시계를 봐요.',
      },
      {
        options: ['누구를', '누구가', '누구에'],
        correct: '누구를',
      },
      {
        options: ['기다리는', '기다린', '기다릴'],
        correct: '기다리는',
      },
      {
        options: ['것 같아요.', '적이 있어요.', '줄 알아요.'],
        correct: '것 같아요.',
      },
    ],
    {
      uz: 'Jisu doim soatiga qarayapti. Kimnidir kutayotganga o‘xshaydi.',
      en: 'Jisu keeps looking at the time. It seems she is waiting for someone.',
      ru: 'Чису постоянно смотрит на часы. Кажется, она кого-то ждёт.',
    },
  ),

  ...build(
    'gp_s3_u4_g13_16',
    G13,
    [
      {
        options: ['저 가게는', '저 가게를', '저 가게에'],
        correct: '저 가게는',
      },
      {
        options: ['손님이', '손님을', '손님에'],
        correct: '손님이',
      },
      {
        options: ['항상 많아요.', '항상 멀어요.', '항상 작아요.'],
        correct: '항상 많아요.',
      },
      {
        options: ['인기가 많은', '인기가 많는', '인기가 많을'],
        correct: '인기가 많은',
      },
      {
        options: ['것 같아요.', '줄 몰라요.', '동안이에요.'],
        correct: '것 같아요.',
      },
    ],
    {
      uz: 'U do‘konda doim mijoz ko‘p. Juda mashhurga o‘xshaydi.',
      en: 'That store always has many customers. It seems very popular.',
      ru: 'В том магазине всегда много покупателей. Похоже, он очень популярный.',
    },
  ),

  ...build(
    'gp_s3_u4_g13_17',
    G13,
    [
      {
        options: ['옆집에서', '옆집을', '옆집이'],
        correct: '옆집에서',
      },
      {
        options: ['음악 소리가', '음악 소리를', '음악 소리에'],
        correct: '음악 소리가',
      },
      {
        options: ['계속 들려요.', '계속 보여요.', '계속 먹어요.'],
        correct: '계속 들려요.',
      },
      {
        options: ['파티를 하는', '파티를 한', '파티를 할'],
        correct: '파티를 하는',
      },
      {
        options: ['것 같아요.', '적이 있어요.', '줄 알아요.'],
        correct: '것 같아요.',
      },
    ],
    {
      uz: 'Qo‘shni uydan musiqa ovozi kelyapti. Bayram qilishayotganga o‘xshaydi.',
      en: 'I keep hearing music next door. It seems they are having a party.',
      ru: 'Из соседней квартиры слышна музыка. Похоже, там вечеринка.',
    },
  ),

  ...build(
    'gp_s3_u4_g13_18',
    G13,
    [
      {
        options: ['저 건물은', '저 건물을', '저 건물에'],
        correct: '저 건물은',
      },
      {
        options: [
          '간판에 병원이라고 쓰여 있어요.',
          '간판을 병원이라고 먹어요.',
          '간판이 병원이라고 입어요.',
        ],
        correct: '간판에 병원이라고 쓰여 있어요.',
      },
      {
        options: ['병원인', '병원은', '병원하는'],
        correct: '병원인',
      },
      {
        options: ['것 같아요.', '것을 좋아해요.', '줄 몰라요.'],
        correct: '것 같아요.',
      },
    ],
    {
      uz: 'Binoning yozuvida shifoxona deb yozilgan. Bu shifoxona bo‘lsa kerak.',
      en: 'The sign says hospital. It seems to be a hospital.',
      ru: 'На вывеске написано «больница». Похоже, это больница.',
    },
  ),

  ...build(
    'gp_s3_u4_g13_19',
    G13,
    [
      {
        options: ['이 길은', '이 길을', '이 길에'],
        correct: '이 길은',
      },
      {
        options: [
          '차가 거의 없어요.',
          '차를 거의 없어요.',
          '차에 거의 없어요.',
        ],
        correct: '차가 거의 없어요.',
      },
      {
        options: ['조용한', '조용하는', '조용할'],
        correct: '조용한',
      },
      {
        options: ['것 같아요.', '중이에요.', '적이 있어요.'],
        correct: '것 같아요.',
      },
    ],
    {
      uz: 'Bu yo‘lda deyarli mashina yo‘q. Tinch joyga o‘xshaydi.',
      en: 'There are hardly any cars on this road. It seems quiet.',
      ru: 'На этой дороге почти нет машин. Кажется, здесь тихо.',
    },
  ),

  ...build(
    'gp_s3_u4_g13_20',
    G13,
    [
      {
        options: ['친구가', '친구를', '친구에게'],
        correct: '친구가',
      },
      {
        options: [
          '요즘 매일 도서관에 가요.',
          '요즘 매일 늦잠을 자요.',
          '요즘 매일 여행을 가요.',
        ],
        correct: '요즘 매일 도서관에 가요.',
      },
      {
        options: ['시험을 준비하는', '시험을 준비한', '시험을 준비할'],
        correct: '시험을 준비하는',
      },
      {
        options: ['것 같아요.', '적이 있어요.', '줄 몰라요.'],
        correct: '것 같아요.',
      },
    ],
    {
      uz: 'Do‘stim shu kunlarda har kuni kutubxonaga boradi. Imtihonga tayyorlanayotganga o‘xshaydi.',
      en: 'My friend goes to the library every day these days. It seems they are preparing for an exam.',
      ru: 'Мой друг сейчас каждый день ходит в библиотеку. Кажется, он готовится к экзамену.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 14. N보다
// 비교 기준이 되는 명사 + 보다
// "N에 비해서", "than N"
// 보통 더 / 덜 등과 함께 사용
// ─────────────────────────────────────────────
const G14 = 'noun-boda-comparison';

const G14_Q = {
  // grammar_blank 10
  ...blank(
    'gp_s3_u4_g14_01',
    G14,
    '오늘은 어제보다 날씨가 더 따뜻해요.',
    '어제보다',
    {
      uz: 'Bugun kechagidan iliqroq.',
      en: 'Today is warmer than yesterday.',
      ru: 'Сегодня теплее, чем вчера.',
    },
  ),

  ...blank('gp_s3_u4_g14_02', G14, '지하철이 버스보다 더 빨라요.', '버스보다', {
    uz: 'Metro avtobusdan tezroq.',
    en: 'The subway is faster than the bus.',
    ru: 'Метро быстрее автобуса.',
  }),

  ...blank(
    'gp_s3_u4_g14_03',
    G14,
    '이 가방은 저 가방보다 조금 가벼워요.',
    '저 가방보다',
    {
      uz: 'Bu sumka u sumkadan biroz yengilroq.',
      en: 'This bag is a little lighter than that bag.',
      ru: 'Эта сумка немного легче той.',
    },
  ),

  ...blank(
    'gp_s3_u4_g14_04',
    G14,
    '저는 여름보다 봄을 더 좋아해요.',
    '여름보다',
    {
      uz: 'Men yozdan ko‘ra bahorni ko‘proq yaxshi ko‘raman.',
      en: 'I like spring more than summer.',
      ru: 'Я люблю весну больше, чем лето.',
    },
  ),

  ...blank(
    'gp_s3_u4_g14_05',
    G14,
    '한국어는 처음 생각했던 것보다 어렵지 않아요.',
    '처음 생각했던 것보다',
    {
      uz: 'Koreys tili avval o‘ylaganimdan unchalik qiyin emas.',
      en: 'Korean is not as difficult as I first thought.',
      ru: 'Корейский не такой сложный, как я сначала думал.',
    },
  ),

  ...blank(
    'gp_s3_u4_g14_06',
    G14,
    '시장 물건이 백화점 물건보다 싼 편이에요.',
    '백화점 물건보다',
    {
      uz: 'Bozordagi mahsulotlar univermagdagidan arzonroq.',
      en: 'Goods at the market tend to be cheaper than those at a department store.',
      ru: 'Товары на рынке обычно дешевле, чем в универмаге.',
    },
  ),

  ...blank(
    'gp_s3_u4_g14_07',
    G14,
    '이번 시험은 지난 시험보다 훨씬 쉬웠어요.',
    '지난 시험보다',
    {
      uz: 'Bu imtihon oldingi imtihondan ancha oson edi.',
      en: 'This exam was much easier than the previous one.',
      ru: 'Этот экзамен был намного легче предыдущего.',
    },
  ),

  ...blank(
    'gp_s3_u4_g14_08',
    G14,
    '혼자 공부하는 것보다 친구와 같이 공부하는 게 더 재미있어요.',
    '혼자 공부하는 것보다',
    {
      uz: 'Yolg‘iz o‘qishdan ko‘ra do‘st bilan birga o‘qish qiziqroq.',
      en: 'Studying with a friend is more fun than studying alone.',
      ru: 'Учиться с другом интереснее, чем одному.',
    },
  ),

  ...blank(
    'gp_s3_u4_g14_09',
    G14,
    '서울은 제 고향보다 사람이 훨씬 많아요.',
    '제 고향보다',
    {
      uz: 'Seulda mening shahrimdagidan ancha ko‘p odam bor.',
      en: 'Seoul has far more people than my hometown.',
      ru: 'В Сеуле намного больше людей, чем в моём родном городе.',
    },
  ),

  ...blank(
    'gp_s3_u4_g14_10',
    G14,
    '온라인으로 사는 게 매장에서 사는 것보다 편할 때가 있어요.',
    '매장에서 사는 것보다',
    {
      uz: 'Ba’zida onlayn xarid qilish do‘kondan xarid qilishdan qulayroq.',
      en: 'Sometimes buying online is more convenient than buying in a store.',
      ru: 'Иногда покупать онлайн удобнее, чем в магазине.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s3_u4_g14_11',
    G14,
    [
      {
        options: ['오늘은', '오늘을', '오늘에'],
        correct: '오늘은',
      },
      {
        options: ['어제보다', '어제처럼', '어제까지'],
        correct: '어제보다',
        hints: {
          어제처럼: "'어제와 같이'라는 뜻이 아니라 어제와 비교하고 있어요.",
          어제까지: '시간의 끝을 나타내는 문장이 아니에요.',
        },
      },
      {
        options: ['날씨가', '날씨를', '날씨에'],
        correct: '날씨가',
      },
      {
        options: ['더 따뜻해요.', '더 마셔요.', '더 만나요.'],
        correct: '더 따뜻해요.',
      },
    ],
    {
      uz: 'Bugun kechagidan iliqroq.',
      en: 'Today is warmer than yesterday.',
      ru: 'Сегодня теплее, чем вчера.',
    },
  ),

  ...build(
    'gp_s3_u4_g14_12',
    G14,
    [
      {
        options: ['지하철이', '지하철을', '지하철에'],
        correct: '지하철이',
      },
      {
        options: ['버스보다', '버스만', '버스까지'],
        correct: '버스보다',
      },
      {
        options: ['더', '아직', '밖에'],
        correct: '더',
      },
      {
        options: ['빨라요.', '먹어요.', '입어요.'],
        correct: '빨라요.',
      },
    ],
    {
      uz: 'Metro avtobusdan tezroq.',
      en: 'The subway is faster than the bus.',
      ru: 'Метро быстрее автобуса.',
    },
  ),

  ...build(
    'gp_s3_u4_g14_13',
    G14,
    [
      {
        options: ['이 가방은', '이 가방을', '이 가방에'],
        correct: '이 가방은',
      },
      {
        options: ['저 가방보다', '저 가방처럼', '저 가방부터'],
        correct: '저 가방보다',
      },
      {
        options: ['조금', '벌써', '아직'],
        correct: '조금',
      },
      {
        options: ['가벼워요.', '먹어요.', '읽어요.'],
        correct: '가벼워요.',
      },
    ],
    {
      uz: 'Bu sumka u sumkadan biroz yengilroq.',
      en: 'This bag is a little lighter than that bag.',
      ru: 'Эта сумка немного легче той.',
    },
  ),

  ...build(
    'gp_s3_u4_g14_14',
    G14,
    [
      {
        options: ['저는', '저를', '제가'],
        correct: '저는',
      },
      {
        options: ['여름보다', '여름까지', '여름 동안'],
        correct: '여름보다',
      },
      {
        options: ['봄을', '봄이', '봄에'],
        correct: '봄을',
      },
      {
        options: ['더 좋아해요.', '더 출발해요.', '더 도착해요.'],
        correct: '더 좋아해요.',
      },
    ],
    {
      uz: 'Men yozdan ko‘ra bahorni ko‘proq yaxshi ko‘raman.',
      en: 'I like spring more than summer.',
      ru: 'Я люблю весну больше, чем лето.',
    },
  ),

  ...build(
    'gp_s3_u4_g14_15',
    G14,
    [
      {
        options: ['이번 시험은', '이번 시험을', '이번 시험에'],
        correct: '이번 시험은',
      },
      {
        options: ['지난 시험보다', '지난 시험까지', '지난 시험이나'],
        correct: '지난 시험보다',
      },
      {
        options: ['훨씬', '아직', '자주'],
        correct: '훨씬',
      },
      {
        options: ['쉬웠어요.', '마셨어요.', '입었어요.'],
        correct: '쉬웠어요.',
      },
    ],
    {
      uz: 'Bu imtihon oldingisidan ancha oson edi.',
      en: 'This exam was much easier than the previous one.',
      ru: 'Этот экзамен был намного легче предыдущего.',
    },
  ),

  ...build(
    'gp_s3_u4_g14_16',
    G14,
    [
      {
        options: ['시장 물건이', '시장 물건을', '시장 물건에'],
        correct: '시장 물건이',
      },
      {
        options: ['백화점 물건보다', '백화점 물건처럼', '백화점 물건까지'],
        correct: '백화점 물건보다',
      },
      {
        options: ['싼 편이에요.', '먹는 편이에요.', '가는 편이에요.'],
        correct: '싼 편이에요.',
      },
    ],
    {
      uz: 'Bozor mahsulotlari univermagdagidan arzonroq.',
      en: 'Market goods tend to be cheaper than department-store goods.',
      ru: 'Товары на рынке обычно дешевле, чем в универмаге.',
    },
  ),

  ...build(
    'gp_s3_u4_g14_17',
    G14,
    [
      {
        options: [
          '혼자 공부하는 것보다',
          '혼자 공부하는 것까지',
          '혼자 공부하는 것밖에',
        ],
        correct: '혼자 공부하는 것보다',
      },
      {
        options: ['친구와', '친구를', '친구가'],
        correct: '친구와',
      },
      {
        options: ['같이 공부하는 게', '같이 공부한 게', '같이 공부할 게'],
        correct: '같이 공부하는 게',
      },
      {
        options: ['더 재미있어요.', '더 도착해요.', '더 출발해요.'],
        correct: '더 재미있어요.',
      },
    ],
    {
      uz: 'Yolg‘iz o‘qishdan ko‘ra do‘st bilan o‘qish qiziqroq.',
      en: 'Studying with a friend is more fun than studying alone.',
      ru: 'Учиться с другом интереснее, чем одному.',
    },
  ),

  ...build(
    'gp_s3_u4_g14_18',
    G14,
    [
      {
        options: ['서울은', '서울을', '서울에'],
        correct: '서울은',
      },
      {
        options: ['제 고향보다', '제 고향까지', '제 고향이나'],
        correct: '제 고향보다',
      },
      {
        options: ['사람이', '사람을', '사람에'],
        correct: '사람이',
      },
      {
        options: ['훨씬 많아요.', '훨씬 마셔요.', '훨씬 입어요.'],
        correct: '훨씬 많아요.',
      },
    ],
    {
      uz: 'Seulda mening shahrimdagidan ancha ko‘p odam bor.',
      en: 'Seoul has far more people than my hometown.',
      ru: 'В Сеуле намного больше людей, чем в моём родном городе.',
    },
  ),

  ...build(
    'gp_s3_u4_g14_19',
    G14,
    [
      {
        options: ['한국어는', '한국어를', '한국어에'],
        correct: '한국어는',
      },
      {
        options: [
          '처음 생각했던 것보다',
          '처음 생각했던 것까지',
          '처음 생각했던 것밖에',
        ],
        correct: '처음 생각했던 것보다',
      },
      {
        options: ['어렵지 않아요.', '먹지 않아요.', '입지 않아요.'],
        correct: '어렵지 않아요.',
      },
    ],
    {
      uz: 'Koreys tili avval o‘ylaganimdan unchalik qiyin emas.',
      en: 'Korean is not as difficult as I first thought.',
      ru: 'Корейский не такой сложный, как я сначала думал.',
    },
  ),

  ...build(
    'gp_s3_u4_g14_20',
    G14,
    [
      {
        options: ['온라인으로 사는 게', '온라인으로 산 게', '온라인으로 살 게'],
        correct: '온라인으로 사는 게',
      },
      {
        options: [
          '매장에서 사는 것보다',
          '매장에서 사는 것까지',
          '매장에서 사는 것밖에',
        ],
        correct: '매장에서 사는 것보다',
      },
      {
        options: [
          '더 편할 때가 있어요.',
          '더 먹을 때가 있어요.',
          '더 입을 때가 있어요.',
        ],
        correct: '더 편할 때가 있어요.',
      },
    ],
    {
      uz: 'Ba’zida onlayn xarid qilish do‘kondan olishdan qulayroq.',
      en: 'Sometimes buying online is more convenient than buying in a store.',
      ru: 'Иногда покупать онлайн удобнее, чем в магазине.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 15. A/V-았으면/었으면 좋겠다
//
// 원하는 상황이나 이루어지기를 바라는 일을 표현
// "~하면 좋겠다", "I wish / I hope..."
//
// ㅏ/ㅗ → -았으면 좋겠다
// 그 외 → -었으면 좋겠다
// 하다 → 했으면 좋겠다
//
// 형태가 과거처럼 보여도 반드시 과거 의미가 아님
// ─────────────────────────────────────────────
const G15 = 'av-at-eot-eumyeon-joketda';

const G15_Q = {
  // ═══════════════════════════════════════════
  // grammar_blank 10
  // ═══════════════════════════════════════════

  ...blank(
    'gp_s3_u4_g15_01',
    G15,
    '이번 주말에는 날씨가 좋았으면 좋겠어요.',
    '날씨가 좋았으면 좋겠어요',
    {
      uz: 'Shu dam olish kunlari ob-havo yaxshi bo‘lsa edi.',
      en: 'I hope the weather is nice this weekend.',
      ru: 'Надеюсь, на этих выходных будет хорошая погода.',
    },
  ),

  ...blank(
    'gp_s3_u4_g15_02',
    G15,
    '다음 방학에는 제주도에 갔으면 좋겠어요.',
    '제주도에 갔으면 좋겠어요',
    {
      uz: 'Keyingi ta’tilda Jejuga borsam yaxshi bo‘lardi.',
      en: 'I hope I can go to Jeju during the next vacation.',
      ru: 'Надеюсь, на следующих каникулах я смогу поехать на Чеджудо.',
    },
  ),

  ...blank(
    'gp_s3_u4_g15_03',
    G15,
    '새로 이사할 집이 학교에서 가까웠으면 좋겠어요.',
    '학교에서 가까웠으면 좋겠어요',
    {
      uz: 'Yangi uyim maktabga yaqin bo‘lsa edi.',
      en: 'I hope my new home is close to school.',
      ru: 'Хотелось бы, чтобы новый дом был близко к школе.',
    },
  ),

  ...blank(
    'gp_s3_u4_g15_04',
    G15,
    '이번 시험에서 좋은 점수를 받았으면 좋겠어요.',
    '좋은 점수를 받았으면 좋겠어요',
    {
      uz: 'Bu imtihonda yaxshi ball olsam edi.',
      en: 'I hope I get a good score on this exam.',
      ru: 'Надеюсь получить хорошую оценку на этом экзамене.',
    },
  ),

  ...blank(
    'gp_s3_u4_g15_05',
    G15,
    '한국어로 자연스럽게 이야기할 수 있었으면 좋겠어요.',
    '자연스럽게 이야기할 수 있었으면 좋겠어요',
    {
      uz: 'Koreys tilida tabiiy gaplasha olsam edi.',
      en: 'I wish I could speak Korean naturally.',
      ru: 'Хотелось бы свободно и естественно говорить по-корейски.',
    },
  ),

  ...blank(
    'gp_s3_u4_g15_06',
    G15,
    '새로 산 신발이 오래 신어도 편했으면 좋겠어요.',
    '오래 신어도 편했으면 좋겠어요',
    {
      uz: 'Yangi oyoq kiyimim uzoq kiysam ham qulay bo‘lsa edi.',
      en: 'I hope my new shoes stay comfortable even when worn for a long time.',
      ru: 'Надеюсь, новая обувь будет удобной даже при долгой носке.',
    },
  ),

  ...blank(
    'gp_s3_u4_g15_07',
    G15,
    '내년에는 가족과 같이 여행했으면 좋겠어요.',
    '가족과 같이 여행했으면 좋겠어요',
    {
      uz: 'Kelasi yili oilam bilan sayohat qilsam edi.',
      en: 'I hope I can travel with my family next year.',
      ru: 'Хотелось бы в следующем году путешествовать вместе с семьёй.',
    },
  ),

  ...blank(
    'gp_s3_u4_g15_08',
    G15,
    '친구가 너무 걱정하지 않았으면 좋겠어요.',
    '너무 걱정하지 않았으면 좋겠어요',
    {
      uz: 'Do‘stim juda ko‘p xavotirlanmasa edi.',
      en: 'I hope my friend does not worry too much.',
      ru: 'Надеюсь, мой друг не будет слишком переживать.',
    },
  ),

  ...blank(
    'gp_s3_u4_g15_09',
    G15,
    '이번에는 면접이 잘 끝났으면 좋겠어요.',
    '면접이 잘 끝났으면 좋겠어요',
    {
      uz: 'Bu safar suhbat yaxshi o‘tsa edi.',
      en: 'I hope the interview goes well this time.',
      ru: 'Надеюсь, на этот раз собеседование пройдёт хорошо.',
    },
  ),

  ...blank(
    'gp_s3_u4_g15_10',
    G15,
    '한국에서 좋은 친구를 많이 사귀었으면 좋겠어요.',
    '좋은 친구를 많이 사귀었으면 좋겠어요',
    {
      uz: 'Koreyada ko‘p yaxshi do‘st orttirsam edi.',
      en: 'I hope I make many good friends in Korea.',
      ru: 'Надеюсь завести в Корее много хороших друзей.',
    },
  ),

  // ═══════════════════════════════════════════
  // grammar_build 10
  // ═══════════════════════════════════════════

  ...build(
    'gp_s3_u4_g15_11',
    G15,
    [
      {
        options: ['이번 주말에는', '지난 주말에는', '어제는'],
        correct: '이번 주말에는',
      },
      {
        options: ['날씨가', '날씨를', '날씨에'],
        correct: '날씨가',
      },
      {
        options: ['좋았으면', '좋으면', '좋은데'],
        correct: '좋았으면',
        hints: {
          좋으면:
            "'좋으면'은 일반적인 조건이 될 수 있어요. 여기서는 바람과 희망을 표현해요.",
          좋은데: '배경이나 대비를 연결하는 문법이 아니에요.',
        },
      },
      {
        options: ['좋겠어요.', '알겠어요.', '있겠어요.'],
        correct: '좋겠어요.',
      },
    ],
    {
      uz: 'Shu dam olish kunlari ob-havo yaxshi bo‘lsa edi.',
      en: 'I hope the weather is nice this weekend.',
      ru: 'Надеюсь, на этих выходных будет хорошая погода.',
    },
  ),

  ...build(
    'gp_s3_u4_g15_12',
    G15,
    [
      {
        options: ['다음 방학에는', '지난 방학에는', '어제는'],
        correct: '다음 방학에는',
      },
      {
        options: ['제주도에', '제주도에서', '제주도를'],
        correct: '제주도에',
      },
      {
        options: ['갔으면', '가면', '가는데'],
        correct: '갔으면',
      },
      {
        options: ['좋겠어요.', '모르겠어요.', '있겠어요.'],
        correct: '좋겠어요.',
      },
    ],
    {
      uz: 'Keyingi ta’tilda Jejuga borsam yaxshi bo‘lardi.',
      en: 'I hope I can go to Jeju during the next vacation.',
      ru: 'Надеюсь, на следующих каникулах смогу поехать на Чеджудо.',
    },
  ),

  ...build(
    'gp_s3_u4_g15_13',
    G15,
    [
      {
        options: ['새로 이사할 집이', '새로 이사할 집을', '새로 이사할 집에'],
        correct: '새로 이사할 집이',
      },
      {
        options: ['학교에서', '학교를', '학교가'],
        correct: '학교에서',
      },
      {
        options: ['가까웠으면', '가까우면', '가까운데'],
        correct: '가까웠으면',
      },
      {
        options: ['좋겠어요.', '먹겠어요.', '입겠어요.'],
        correct: '좋겠어요.',
      },
    ],
    {
      uz: 'Yangi uyim maktabga yaqin bo‘lsa edi.',
      en: 'I hope my new home is close to school.',
      ru: 'Хотелось бы, чтобы новый дом был близко к школе.',
    },
  ),

  ...build(
    'gp_s3_u4_g15_14',
    G15,
    [
      {
        options: ['이번 시험에서', '이번 시험을', '이번 시험이'],
        correct: '이번 시험에서',
      },
      {
        options: ['좋은 점수를', '좋은 점수가', '좋은 점수에'],
        correct: '좋은 점수를',
      },
      {
        options: ['받았으면', '받으면', '받는데'],
        correct: '받았으면',
      },
      {
        options: ['좋겠어요.', '알겠어요.', '없겠어요.'],
        correct: '좋겠어요.',
      },
    ],
    {
      uz: 'Bu imtihonda yaxshi ball olsam edi.',
      en: 'I hope I get a good score on this exam.',
      ru: 'Надеюсь получить хорошую оценку на этом экзамене.',
    },
  ),

  ...build(
    'gp_s3_u4_g15_15',
    G15,
    [
      {
        options: ['한국어로', '한국어를', '한국어가'],
        correct: '한국어로',
      },
      {
        options: ['자연스럽게', '무겁게', '맵게'],
        correct: '자연스럽게',
      },
      {
        options: ['이야기할 수', '이야기한 수', '이야기하는 수'],
        correct: '이야기할 수',
      },
      {
        options: ['있었으면', '있으면', '있는데'],
        correct: '있었으면',
      },
      {
        options: ['좋겠어요.', '먹겠어요.', '닫겠어요.'],
        correct: '좋겠어요.',
      },
    ],
    {
      uz: 'Koreys tilida tabiiy gaplasha olsam edi.',
      en: 'I wish I could speak Korean naturally.',
      ru: 'Хотелось бы естественно говорить по-корейски.',
    },
  ),

  ...build(
    'gp_s3_u4_g15_16',
    G15,
    [
      {
        options: ['새로 산 신발이', '새로 산 신발을', '새로 산 신발에'],
        correct: '새로 산 신발이',
      },
      {
        options: ['오래 신어도', '오래 먹어도', '오래 읽어도'],
        correct: '오래 신어도',
      },
      {
        options: ['편했으면', '편하면', '편한데'],
        correct: '편했으면',
      },
      {
        options: ['좋겠어요.', '가겠어요.', '마시겠어요.'],
        correct: '좋겠어요.',
      },
    ],
    {
      uz: 'Yangi oyoq kiyim uzoq kiysam ham qulay bo‘lsa edi.',
      en: 'I hope my new shoes remain comfortable even when worn for a long time.',
      ru: 'Надеюсь, новая обувь будет удобной даже при долгой носке.',
    },
  ),

  ...build(
    'gp_s3_u4_g15_17',
    G15,
    [
      {
        options: ['내년에는', '작년에는', '어제는'],
        correct: '내년에는',
      },
      {
        options: ['가족과', '가족을', '가족이'],
        correct: '가족과',
      },
      {
        options: ['같이 여행했으면', '같이 여행하면', '같이 여행하는데'],
        correct: '같이 여행했으면',
      },
      {
        options: ['좋겠어요.', '없겠어요.', '모르겠어요.'],
        correct: '좋겠어요.',
      },
    ],
    {
      uz: 'Kelasi yili oilam bilan sayohat qilsam edi.',
      en: 'I hope I can travel with my family next year.',
      ru: 'Хотелось бы в следующем году путешествовать с семьёй.',
    },
  ),

  ...build(
    'gp_s3_u4_g15_18',
    G15,
    [
      {
        options: ['친구가', '친구를', '친구에게'],
        correct: '친구가',
      },
      {
        options: ['너무', '밖에', '동안'],
        correct: '너무',
      },
      {
        options: ['걱정하지 않았으면', '걱정하지 않으면', '걱정하지 않는데'],
        correct: '걱정하지 않았으면',
      },
      {
        options: ['좋겠어요.', '먹겠어요.', '읽겠어요.'],
        correct: '좋겠어요.',
      },
    ],
    {
      uz: 'Do‘stim juda ko‘p xavotirlanmasa edi.',
      en: 'I hope my friend does not worry too much.',
      ru: 'Надеюсь, мой друг не будет слишком переживать.',
    },
  ),

  ...build(
    'gp_s3_u4_g15_19',
    G15,
    [
      {
        options: ['이번에는', '어제는', '지난번에는'],
        correct: '이번에는',
      },
      {
        options: ['면접이', '면접을', '면접에'],
        correct: '면접이',
      },
      {
        options: ['잘 끝났으면', '잘 끝나면', '잘 끝나는데'],
        correct: '잘 끝났으면',
      },
      {
        options: ['좋겠어요.', '알겠어요.', '없겠어요.'],
        correct: '좋겠어요.',
      },
    ],
    {
      uz: 'Bu safar suhbat yaxshi o‘tsa edi.',
      en: 'I hope the interview goes well this time.',
      ru: 'Надеюсь, на этот раз собеседование пройдёт хорошо.',
    },
  ),

  ...build(
    'gp_s3_u4_g15_20',
    G15,
    [
      {
        options: ['한국에서', '한국에를', '한국이'],
        correct: '한국에서',
      },
      {
        options: ['좋은 친구를', '좋은 친구가', '좋은 친구에'],
        correct: '좋은 친구를',
      },
      {
        options: ['많이', '밖에', '동안'],
        correct: '많이',
      },
      {
        options: ['사귀었으면', '사귀면', '사귀는데'],
        correct: '사귀었으면',
      },
      {
        options: ['좋겠어요.', '먹겠어요.', '닫겠어요.'],
        correct: '좋겠어요.',
      },
    ],
    {
      uz: 'Koreyada ko‘p yaxshi do‘st orttirsam edi.',
      en: 'I hope I make many good friends in Korea.',
      ru: 'Надеюсь завести в Корее много хороших друзей.',
    },
  ),
};

// ═══════════════════════════════════════════════════════════
// UNIT 5
// 제안 · 계획 · 이유 · 행동 순서
// ═══════════════════════════════════════════════════════════

// ─────────────────────────────────────────────
// 문법 16. A/V-(으)ㄹ까요?
//
// 받침 O → -을까요?
// 받침 X / ㄹ 받침 → -ㄹ까요?
//
// 함께 할 일을 제안하거나
// 어떤 상황에 대해 상대방의 의견·추측을 물을 때 사용
// ─────────────────────────────────────────────
const G16 = 'av-eulkkayo';

const G16_Q = {
  // ═══════════════════════════════════════════
  // grammar_blank 10
  // ═══════════════════════════════════════════

  ...blank(
    'gp_s3_u5_g16_01',
    G16,
    '주말에 같이 한강에 갈까요?',
    '한강에 갈까요',
    {
      uz: 'Dam olish kuni birga Han daryosiga boramizmi?',
      en: 'Shall we go to the Han River together this weekend?',
      ru: 'Может, вместе сходим к реке Хан на выходных?',
    },
  ),

  ...blank(
    'gp_s3_u5_g16_02',
    G16,
    '점심에는 비빔밥을 먹을까요?',
    '비빔밥을 먹을까요',
    {
      uz: 'Tushlikda bibimbap yeymizmi?',
      en: 'Shall we have bibimbap for lunch?',
      ru: 'Может, поедим пибимпап на обед?',
    },
  ),

  ...blank(
    'gp_s3_u5_g16_03',
    G16,
    '사람이 많으니까 조금 일찍 출발할까요?',
    '조금 일찍 출발할까요',
    {
      uz: 'Odam ko‘p bo‘lgani uchun biroz ertaroq yo‘lga chiqamizmi?',
      en: 'Since it will be crowded, shall we leave a little early?',
      ru: 'Раз людей будет много, может, выедем немного пораньше?',
    },
  ),

  ...blank(
    'gp_s3_u5_g16_04',
    G16,
    '어느 색이 민수 씨에게 더 잘 어울릴까요?',
    '더 잘 어울릴까요',
    {
      uz: 'Qaysi rang Minsuga ko‘proq yarasharkin?',
      en: 'Which color do you think will suit Minsu better?',
      ru: 'Какой цвет, по-вашему, больше подойдёт Минсу?',
    },
  ),

  ...blank(
    'gp_s3_u5_g16_05',
    G16,
    '내일 서울도 오늘처럼 추울까요?',
    '오늘처럼 추울까요',
    {
      uz: 'Ertaga Seulda ham bugungidek sovuq bo‘larmikan?',
      en: 'Do you think Seoul will be as cold tomorrow as it is today?',
      ru: 'Как думаете, завтра в Сеуле будет так же холодно, как сегодня?',
    },
  ),

  ...blank(
    'gp_s3_u5_g16_06',
    G16,
    '여행 첫날에는 박물관부터 구경할까요?',
    '박물관부터 구경할까요',
    {
      uz: 'Sayohatning birinchi kuni avval muzeyni ko‘ramizmi?',
      en: 'Shall we visit the museum first on the first day of the trip?',
      ru: 'Может, в первый день путешествия сначала сходим в музей?',
    },
  ),

  ...blank(
    'gp_s3_u5_g16_07',
    G16,
    '버스가 늦게 오는데 지하철을 탈까요?',
    '지하철을 탈까요',
    {
      uz: 'Avtobus kechikyapti, metroga o‘tamizmi?',
      en: 'The bus is late. Shall we take the subway instead?',
      ru: 'Автобус опаздывает. Может, поедем на метро?',
    },
  ),

  ...blank(
    'gp_s3_u5_g16_08',
    G16,
    '선생님께 이 문제를 다시 물어볼까요?',
    '다시 물어볼까요',
    {
      uz: 'Bu savolni o‘qituvchidan yana bir marta so‘raymizmi?',
      en: 'Shall we ask the teacher about this problem again?',
      ru: 'Может, ещё раз спросим преподавателя об этой задаче?',
    },
  ),

  ...blank(
    'gp_s3_u5_g16_09',
    G16,
    '이 정도 음식이면 네 명이 먹기에 충분할까요?',
    '충분할까요',
    {
      uz: 'Shuncha ovqat to‘rt kishiga yetarmikan?',
      en: 'Do you think this much food will be enough for four people?',
      ru: 'Как думаете, этого количества еды хватит на четверых?',
    },
  ),

  ...blank(
    'gp_s3_u5_g16_10',
    G16,
    '비가 그치면 밖에서 사진을 찍을까요?',
    '밖에서 사진을 찍을까요',
    {
      uz: 'Yomg‘ir to‘xtasa, tashqarida suratga tushamizmi?',
      en: 'When the rain stops, shall we take pictures outside?',
      ru: 'Когда дождь закончится, может, сфотографируемся на улице?',
    },
  ),

  // ═══════════════════════════════════════════
  // grammar_build 10
  // ═══════════════════════════════════════════

  ...build(
    'gp_s3_u5_g16_11',
    G16,
    [
      {
        options: ['주말에', '지난주에', '어제'],
        correct: '주말에',
      },
      {
        options: ['같이', '벌써', '아직'],
        correct: '같이',
      },
      {
        options: ['한강에', '한강에서', '한강을'],
        correct: '한강에',
      },
      {
        options: ['갈까요?', '가는데요?', '갔어요?'],
        correct: '갈까요?',
        hints: {
          '가는데요?':
            '함께 무엇을 할지 제안하는 상황이므로 「갈까요?」가 자연스러워요.',
          '갔어요?': '과거 사실을 묻는 상황이 아니에요.',
        },
      },
    ],
    {
      uz: 'Dam olish kuni birga Han daryosiga boramizmi?',
      en: 'Shall we go to the Han River together this weekend?',
      ru: 'Может, вместе сходим к реке Хан на выходных?',
    },
  ),

  ...build(
    'gp_s3_u5_g16_12',
    G16,
    [
      {
        options: ['점심에는', '새벽에는', '어젯밤에는'],
        correct: '점심에는',
      },
      {
        options: ['비빔밥을', '비빔밥이', '비빔밥에'],
        correct: '비빔밥을',
      },
      {
        options: ['먹을까요?', '먹었을까요?', '먹는데요?'],
        correct: '먹을까요?',
        hints: {
          '먹었을까요?':
            '이미 먹었는지를 추측하는 문장이 아니라 함께 먹을 것을 제안해요.',
          '먹는데요?': '배경을 제시하는 표현보다 제안 표현이 필요해요.',
        },
      },
    ],
    {
      uz: 'Tushlikda bibimbap yeymizmi?',
      en: 'Shall we have bibimbap for lunch?',
      ru: 'Может, поедим пибимпап на обед?',
    },
  ),

  ...build(
    'gp_s3_u5_g16_13',
    G16,
    [
      {
        options: ['사람이 많으니까', '사람이 많지만', '사람이 많아도'],
        correct: '사람이 많으니까',
      },
      {
        options: ['조금', '아직', '밖에'],
        correct: '조금',
      },
      {
        options: ['일찍', '무겁게', '맵게'],
        correct: '일찍',
      },
      {
        options: ['출발할까요?', '출발했어요?', '출발하는데요?'],
        correct: '출발할까요?',
      },
    ],
    {
      uz: 'Odam ko‘p bo‘lgani uchun biroz ertaroq yo‘lga chiqamizmi?',
      en: 'Since it will be crowded, shall we leave a little early?',
      ru: 'Раз людей будет много, может, выедем немного пораньше?',
    },
  ),

  ...build(
    'gp_s3_u5_g16_14',
    G16,
    [
      {
        options: ['어느 색이', '어느 색을', '어느 색에'],
        correct: '어느 색이',
      },
      {
        options: ['민수 씨에게', '민수 씨를', '민수 씨가'],
        correct: '민수 씨에게',
      },
      {
        options: ['더 잘', '아직', '밖에'],
        correct: '더 잘',
      },
      {
        options: ['어울릴까요?', '어울렸어요?', '어울리는데요?'],
        correct: '어울릴까요?',
        hints: {
          '어울렸어요?': '현재 선택을 위해 의견을 묻는 상황이에요.',
          '어울리는데요?': '상대방의 판단을 묻는 「-(으)ㄹ까요?」가 필요해요.',
        },
      },
    ],
    {
      uz: 'Qaysi rang Minsuga ko‘proq yarasharkin?',
      en: 'Which color do you think will suit Minsu better?',
      ru: 'Какой цвет, по-вашему, лучше подойдёт Минсу?',
    },
  ),

  ...build(
    'gp_s3_u5_g16_15',
    G16,
    [
      {
        options: ['내일 서울도', '어제 서울도', '지난달 서울도'],
        correct: '내일 서울도',
      },
      {
        options: ['오늘처럼', '오늘보다도', '오늘까지'],
        correct: '오늘처럼',
      },
      {
        options: ['추울까요?', '추웠어요?', '추운데요?'],
        correct: '추울까요?',
      },
    ],
    {
      uz: 'Ertaga Seulda ham bugungidek sovuq bo‘larmikan?',
      en: 'Do you think Seoul will be as cold tomorrow as today?',
      ru: 'Как думаете, завтра в Сеуле будет так же холодно, как сегодня?',
    },
  ),

  ...build(
    'gp_s3_u5_g16_16',
    G16,
    [
      {
        options: ['여행 첫날에는', '여행 마지막 날까지', '여행이 끝난 후에는'],
        correct: '여행 첫날에는',
      },
      {
        options: ['박물관부터', '박물관밖에', '박물관보다'],
        correct: '박물관부터',
      },
      {
        options: ['구경할까요?', '구경했어요?', '구경하는데요?'],
        correct: '구경할까요?',
      },
    ],
    {
      uz: 'Sayohatning birinchi kuni avval muzeyni ko‘ramizmi?',
      en: 'Shall we visit the museum first on the first day of the trip?',
      ru: 'Может, в первый день сначала сходим в музей?',
    },
  ),

  ...build(
    'gp_s3_u5_g16_17',
    G16,
    [
      {
        options: ['버스가', '버스를', '버스에'],
        correct: '버스가',
      },
      {
        options: ['늦게 오는데', '일찍 왔는데', '빨리 가니까'],
        correct: '늦게 오는데',
      },
      {
        options: ['지하철을', '지하철이', '지하철에'],
        correct: '지하철을',
      },
      {
        options: ['탈까요?', '탔어요?', '타는데요?'],
        correct: '탈까요?',
      },
    ],
    {
      uz: 'Avtobus kechikyapti, metroga o‘tamizmi?',
      en: 'The bus is late. Shall we take the subway?',
      ru: 'Автобус задерживается. Может, поедем на метро?',
    },
  ),

  ...build(
    'gp_s3_u5_g16_18',
    G16,
    [
      {
        options: ['선생님께', '선생님을', '선생님이'],
        correct: '선생님께',
      },
      {
        options: ['이 문제를', '이 문제가', '이 문제에'],
        correct: '이 문제를',
      },
      {
        options: ['다시', '밖에', '동안'],
        correct: '다시',
      },
      {
        options: ['물어볼까요?', '물어봤어요?', '물어보는데요?'],
        correct: '물어볼까요?',
      },
    ],
    {
      uz: 'Bu savolni o‘qituvchidan yana so‘raymizmi?',
      en: 'Shall we ask the teacher about this problem again?',
      ru: 'Может, ещё раз спросим преподавателя об этой задаче?',
    },
  ),

  ...build(
    'gp_s3_u5_g16_19',
    G16,
    [
      {
        options: ['이 정도 음식이면', '이 정도 음식보다', '이 정도 음식까지'],
        correct: '이 정도 음식이면',
      },
      {
        options: ['네 명이', '네 명을', '네 명에게'],
        correct: '네 명이',
      },
      {
        options: ['먹기에', '먹으려고', '먹고 나서'],
        correct: '먹기에',
      },
      {
        options: ['충분할까요?', '충분했어요?', '충분한데요?'],
        correct: '충분할까요?',
      },
    ],
    {
      uz: 'Shuncha ovqat to‘rt kishiga yetarmikan?',
      en: 'Do you think this much food will be enough for four people?',
      ru: 'Как думаете, этого количества еды хватит на четверых?',
    },
  ),

  ...build(
    'gp_s3_u5_g16_20',
    G16,
    [
      {
        options: ['비가 그치면', '비가 왔는데', '비가 오니까'],
        correct: '비가 그치면',
      },
      {
        options: ['밖에서', '밖에', '밖을'],
        correct: '밖에서',
      },
      {
        options: ['사진을', '사진이', '사진에'],
        correct: '사진을',
      },
      {
        options: ['찍을까요?', '찍었어요?', '찍는데요?'],
        correct: '찍을까요?',
      },
    ],
    {
      uz: 'Yomg‘ir to‘xtasa, tashqarida suratga tushamizmi?',
      en: 'When the rain stops, shall we take pictures outside?',
      ru: 'Когда дождь закончится, может, сфотографируемся на улице?',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 17. A/V-(으)ㄹ 거예요
//
// 받침 O → -을 거예요
// 받침 X / ㄹ 받침 → -ㄹ 거예요
//
// 미래의 계획·의도 또는 앞으로 일어날 일에 대한 예측
// ─────────────────────────────────────────────
const G17 = 'av-eul-geoyeyo';

const G17_Q = {
  // ═══════════════════════════════════════════
  // grammar_blank 10
  // ═══════════════════════════════════════════

  ...blank(
    'gp_s3_u5_g17_01',
    G17,
    '이번 방학에는 부산으로 여행할 거예요.',
    '부산으로 여행할 거예요',
    {
      uz: 'Bu ta’tilda Busanga sayohat qilaman.',
      en: 'I am going to travel to Busan this vacation.',
      ru: 'На этих каникулах я поеду путешествовать в Пусан.',
    },
  ),

  ...blank(
    'gp_s3_u5_g17_02',
    G17,
    '졸업한 후에는 한국 회사에서 일할 거예요.',
    '한국 회사에서 일할 거예요',
    {
      uz: 'O‘qishni tugatganimdan keyin Koreya kompaniyasida ishlayman.',
      en: 'After graduating, I am going to work at a Korean company.',
      ru: 'После окончания учёбы я буду работать в корейской компании.',
    },
  ),

  ...blank(
    'gp_s3_u5_g17_03',
    G17,
    '오늘 저녁에는 집에서 푹 쉴 거예요.',
    '집에서 푹 쉴 거예요',
    {
      uz: 'Bugun kechqurun uyda yaxshilab dam olaman.',
      en: 'I am going to rest well at home this evening.',
      ru: 'Сегодня вечером я хорошо отдохну дома.',
    },
  ),

  ...blank(
    'gp_s3_u5_g17_04',
    G17,
    '구름이 점점 많아져요. 곧 비가 올 거예요.',
    '곧 비가 올 거예요',
    {
      uz: 'Bulutlar ko‘paymoqda. Tez orada yomg‘ir yog‘adi.',
      en: 'There are more and more clouds. It is going to rain soon.',
      ru: 'Облаков становится всё больше. Скоро пойдёт дождь.',
    },
  ),

  ...blank(
    'gp_s3_u5_g17_05',
    G17,
    '주말에는 친구들과 등산을 할 거예요.',
    '친구들과 등산을 할 거예요',
    {
      uz: 'Dam olish kunlari do‘stlarim bilan tog‘ga chiqaman.',
      en: 'I am going hiking with my friends this weekend.',
      ru: 'На выходных я пойду в горы с друзьями.',
    },
  ),

  ...blank(
    'gp_s3_u5_g17_06',
    G17,
    '이 시간에는 길이 많이 막힐 거예요.',
    '길이 많이 막힐 거예요',
    {
      uz: 'Bu vaqtda yo‘llarda tirbandlik kuchli bo‘ladi.',
      en: 'There will probably be heavy traffic at this time.',
      ru: 'В это время на дорогах, скорее всего, будут сильные пробки.',
    },
  ),

  ...blank(
    'gp_s3_u5_g17_07',
    G17,
    '다음 학기에는 한국어 수업을 하나 더 들을 거예요.',
    '한국어 수업을 하나 더 들을 거예요',
    {
      uz: 'Keyingi semestrda yana bitta koreys tili darsini olaman.',
      en: 'I am going to take one more Korean class next semester.',
      ru: 'В следующем семестре я возьму ещё один курс корейского языка.',
    },
  ),

  ...blank(
    'gp_s3_u5_g17_08',
    G17,
    '민수 씨는 약속 시간보다 조금 늦을 거예요.',
    '조금 늦을 거예요',
    {
      uz: 'Minsu uchrashuv vaqtiga biroz kechiksa kerak.',
      en: 'Minsu will probably be a little late.',
      ru: 'Минсу, скорее всего, немного опоздает.',
    },
  ),

  ...blank(
    'gp_s3_u5_g17_09',
    G17,
    '한국에 가면 전통 시장에도 꼭 가 볼 거예요.',
    '전통 시장에도 꼭 가 볼 거예요',
    {
      uz: 'Koreyaga borsam, an’anaviy bozorga ham albatta borib ko‘raman.',
      en: 'When I go to Korea, I am definitely going to visit a traditional market too.',
      ru: 'Когда поеду в Корею, обязательно схожу и на традиционный рынок.',
    },
  ),

  ...blank(
    'gp_s3_u5_g17_10',
    G17,
    '지금 주문하면 음식이 삼십 분쯤 후에 도착할 거예요.',
    '삼십 분쯤 후에 도착할 거예요',
    {
      uz: "Hozir buyurtma bersangiz, ovqat taxminan o'ttiz daqiqadan keyin yetib keladi.",
      en: 'If you order now, the food will arrive in about thirty minutes.',
      ru: 'Если заказать сейчас, еда прибудет примерно через тридцать минут.',
    },
  ),

  // ═══════════════════════════════════════════
  // grammar_build 10
  // ═══════════════════════════════════════════

  ...build(
    'gp_s3_u5_g17_11',
    G17,
    [
      {
        options: ['이번 방학에는', '지난 방학에는', '어제는'],
        correct: '이번 방학에는',
      },
      {
        options: ['부산으로', '부산에서만', '부산보다'],
        correct: '부산으로',
      },
      {
        options: ['여행할', '여행하는', '여행한'],
        correct: '여행할',
      },
      {
        options: ['거예요.', '적이에요.', '줄이에요.'],
        correct: '거예요.',
      },
    ],
    {
      uz: 'Bu ta’tilda Busanga sayohat qilaman.',
      en: 'I am going to travel to Busan this vacation.',
      ru: 'На этих каникулах я поеду в Пусан.',
    },
  ),

  ...build(
    'gp_s3_u5_g17_12',
    G17,
    [
      {
        options: ['졸업한 후에는', '졸업하기 전에는', '졸업하는 동안'],
        correct: '졸업한 후에는',
      },
      {
        options: ['한국 회사에서', '한국 회사에만', '한국 회사보다'],
        correct: '한국 회사에서',
      },
      {
        options: ['일할', '일하는', '일한'],
        correct: '일할',
      },
      {
        options: ['거예요.', '것 같았어요.', '적이 있어요.'],
        correct: '거예요.',
      },
    ],
    {
      uz: 'O‘qishni tugatgach Koreya kompaniyasida ishlayman.',
      en: 'After graduating, I am going to work at a Korean company.',
      ru: 'После окончания учёбы я буду работать в корейской компании.',
    },
  ),

  ...build(
    'gp_s3_u5_g17_13',
    G17,
    [
      {
        options: ['오늘 저녁에는', '어제 저녁에는', '지난주에는'],
        correct: '오늘 저녁에는',
      },
      {
        options: ['집에서', '집을', '집이'],
        correct: '집에서',
      },
      {
        options: ['푹 쉴', '푹 쉬는', '푹 쉰'],
        correct: '푹 쉴',
      },
      {
        options: ['거예요.', '것이에요.', '줄 알아요.'],
        correct: '거예요.',
      },
    ],
    {
      uz: 'Bugun kechqurun uyda yaxshilab dam olaman.',
      en: 'I am going to rest well at home tonight.',
      ru: 'Сегодня вечером я хорошо отдохну дома.',
    },
  ),

  ...build(
    'gp_s3_u5_g17_14',
    G17,
    [
      {
        options: ['구름이', '구름을', '구름에'],
        correct: '구름이',
      },
      {
        options: ['점점 많아져요.', '점점 없어졌어요.', '점점 맑았어요.'],
        correct: '점점 많아져요.',
      },
      {
        options: ['곧 비가 올', '곧 비가 오는', '어제 비가 온'],
        correct: '곧 비가 올',
      },
      {
        options: ['거예요.', '적이에요.', '동안이에요.'],
        correct: '거예요.',
      },
    ],
    {
      uz: 'Bulutlar ko‘paymoqda. Tez orada yomg‘ir yog‘adi.',
      en: 'There are more clouds. It is going to rain soon.',
      ru: 'Облаков становится больше. Скоро пойдёт дождь.',
    },
  ),

  ...build(
    'gp_s3_u5_g17_15',
    G17,
    [
      {
        options: ['주말에는', '지난주에는', '어제는'],
        correct: '주말에는',
      },
      {
        options: ['친구들과', '친구들을', '친구들에게'],
        correct: '친구들과',
      },
      {
        options: ['등산을 할', '등산을 하는', '등산을 한'],
        correct: '등산을 할',
      },
      {
        options: ['거예요.', '것 같아요.', '적이 있어요.'],
        correct: '거예요.',
      },
    ],
    {
      uz: 'Dam olish kunlari do‘stlarim bilan tog‘ga chiqaman.',
      en: 'I am going hiking with my friends this weekend.',
      ru: 'На выходных я пойду в горы с друзьями.',
    },
  ),

  ...build(
    'gp_s3_u5_g17_16',
    G17,
    [
      {
        options: ['이 시간에는', '이 시간까지', '이 시간보다'],
        correct: '이 시간에는',
      },
      {
        options: ['길이', '길을', '길에'],
        correct: '길이',
      },
      {
        options: ['많이 막힐', '많이 막히는', '많이 막힌'],
        correct: '많이 막힐',
      },
      {
        options: ['거예요.', '동안이에요.', '줄 알아요.'],
        correct: '거예요.',
      },
    ],
    {
      uz: 'Bu vaqtda yo‘llar ancha tirband bo‘ladi.',
      en: 'There will probably be heavy traffic at this time.',
      ru: 'В это время, скорее всего, будут пробки.',
    },
  ),

  ...build(
    'gp_s3_u5_g17_17',
    G17,
    [
      {
        options: ['다음 학기에는', '지난 학기에는', '지난달에는'],
        correct: '다음 학기에는',
      },
      {
        options: ['한국어 수업을', '한국어 수업이', '한국어 수업에'],
        correct: '한국어 수업을',
      },
      {
        options: ['하나 더', '하나밖에', '하나보다'],
        correct: '하나 더',
      },
      {
        options: ['들을 거예요.', '들은 거예요.', '듣는 거예요.'],
        correct: '들을 거예요.',
      },
    ],
    {
      uz: 'Keyingi semestrda yana bitta koreys tili darsini olaman.',
      en: 'I am going to take another Korean class next semester.',
      ru: 'В следующем семестре я возьму ещё один курс корейского.',
    },
  ),

  ...build(
    'gp_s3_u5_g17_18',
    G17,
    [
      {
        options: ['민수 씨는', '민수 씨를', '민수 씨에게'],
        correct: '민수 씨는',
      },
      {
        options: ['약속 시간보다', '약속 시간까지', '약속 시간부터'],
        correct: '약속 시간보다',
      },
      {
        options: ['조금 늦을', '조금 늦는', '조금 늦은'],
        correct: '조금 늦을',
      },
      {
        options: ['거예요.', '적이에요.', '동안이에요.'],
        correct: '거예요.',
      },
    ],
    {
      uz: 'Minsu biroz kechiksa kerak.',
      en: 'Minsu will probably be a little late.',
      ru: 'Минсу, скорее всего, немного опоздает.',
    },
  ),

  ...build(
    'gp_s3_u5_g17_19',
    G17,
    [
      {
        options: ['한국에 가면', '한국에 갔는데', '한국에 가니까'],
        correct: '한국에 가면',
      },
      {
        options: ['전통 시장에도', '전통 시장보다', '전통 시장까지는'],
        correct: '전통 시장에도',
      },
      {
        options: ['꼭', '별로', '전혀'],
        correct: '꼭',
      },
      {
        options: ['가 볼 거예요.', '가 본 거예요.', '가는 거예요.'],
        correct: '가 볼 거예요.',
      },
    ],
    {
      uz: 'Koreyaga borsam an’anaviy bozorga ham albatta borib ko‘raman.',
      en: 'When I go to Korea, I will definitely visit a traditional market.',
      ru: 'Когда поеду в Корею, обязательно схожу на традиционный рынок.',
    },
  ),

  ...build(
    'gp_s3_u5_g17_20',
    G17,
    [
      {
        options: ['지금 주문하면', '어제 주문했는데', '주문하고 나서'],
        correct: '지금 주문하면',
      },
      {
        options: ['음식이', '음식을', '음식에'],
        correct: '음식이',
      },
      {
        options: ['삼십 분쯤 후에', '삼십 분 동안만', '삼십 분보다'],
        correct: '삼십 분쯤 후에',
      },
      {
        options: ['도착할 거예요.', '도착한 거예요.', '도착하는 거예요.'],
        correct: '도착할 거예요.',
      },
    ],
    {
      uz: "Hozir buyurtma bersangiz, ovqat taxminan o'ttiz daqiqadan keyin keladi.",
      en: 'If you order now, the food will arrive in about thirty minutes.',
      ru: 'Если заказать сейчас, еда прибудет примерно через тридцать минут.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 18. A/V-(으)니까, N(이)니까
//
// 받침 O → -으니까
// 받침 X / ㄹ 받침 → -니까
// N 받침 O → -이니까
// N 받침 X → -니까
//
// 말하는 사람이 판단한 이유·근거를 제시
// 뒤에 제안·명령·권유가 자연스럽게 올 수 있음
// ─────────────────────────────────────────────
const G18 = 'av-n-eunikka';

const G18_Q = {
  // ═══════════════════════════════════════════
  // grammar_blank 10
  // ═══════════════════════════════════════════

  ...blank(
    'gp_s3_u5_g18_01',
    G18,
    '밖이 추우니까 따뜻한 옷을 입으세요.',
    '밖이 추우니까',
    {
      uz: 'Tashqarida sovuq, shuning uchun issiq kiyim kiying.',
      en: 'It is cold outside, so wear warm clothes.',
      ru: 'На улице холодно, поэтому наденьте тёплую одежду.',
    },
  ),

  ...blank(
    'gp_s3_u5_g18_02',
    G18,
    '내일 시험이 있으니까 오늘 일찍 자려고 해요.',
    '내일 시험이 있으니까',
    {
      uz: 'Ertaga imtihon borligi uchun bugun erta uxlamoqchiman.',
      en: 'I have an exam tomorrow, so I am planning to go to bed early tonight.',
      ru: 'Завтра экзамен, поэтому сегодня я собираюсь лечь спать рано.',
    },
  ),

  ...blank(
    'gp_s3_u5_g18_03',
    G18,
    '길이 많이 막히니까 지하철로 갑시다.',
    '길이 많이 막히니까',
    {
      uz: 'Yo‘llarda tirbandlik kuchli, shuning uchun metroda boraylik.',
      en: 'Traffic is heavy, so let’s take the subway.',
      ru: 'На дорогах пробки, поэтому давайте поедем на метро.',
    },
  ),

  ...blank(
    'gp_s3_u5_g18_04',
    G18,
    '이 식당은 사람이 많으니까 미리 예약하는 게 좋겠어요.',
    '사람이 많으니까',
    {
      uz: 'Bu restoranda odam ko‘p, shuning uchun oldindan band qilgan yaxshi.',
      en: 'This restaurant gets crowded, so it would be better to make a reservation in advance.',
      ru: 'В этом ресторане много людей, поэтому лучше забронировать заранее.',
    },
  ),

  ...blank(
    'gp_s3_u5_g18_05',
    G18,
    '오늘은 주말이니까 조금 늦게 일어나도 괜찮아요.',
    '오늘은 주말이니까',
    {
      uz: 'Bugun dam olish kuni, shuning uchun biroz kechroq tursak ham bo‘ladi.',
      en: 'It is the weekend today, so it is okay to get up a little late.',
      ru: 'Сегодня выходной, поэтому можно встать немного позже.',
    },
  ),

  ...blank(
    'gp_s3_u5_g18_06',
    G18,
    '처음 가는 곳이니까 지도를 미리 확인하세요.',
    '처음 가는 곳이니까',
    {
      uz: 'Bu birinchi bor borayotgan joyingiz, shuning uchun xaritani oldindan tekshiring.',
      en: 'Since it is a place you are visiting for the first time, check the map beforehand.',
      ru: 'Поскольку вы идёте туда впервые, заранее проверьте карту.',
    },
  ),

  ...blank(
    'gp_s3_u5_g18_07',
    G18,
    '시간이 없으니까 택시를 타는 게 어때요?',
    '시간이 없으니까',
    {
      uz: 'Vaqt yo‘q, taksida borsak qanday?',
      en: 'We do not have much time, so how about taking a taxi?',
      ru: 'Времени мало, может, поедем на такси?',
    },
  ),

  ...blank(
    'gp_s3_u5_g18_08',
    G18,
    '이 문제는 중요하니까 꼭 다시 복습하세요.',
    '이 문제는 중요하니까',
    {
      uz: 'Bu savol muhim, shuning uchun uni albatta takrorlang.',
      en: 'This problem is important, so make sure to review it again.',
      ru: 'Эта задача важная, поэтому обязательно повторите её.',
    },
  ),

  ...blank(
    'gp_s3_u5_g18_09',
    G18,
    '아직 시간이 충분하니까 너무 서두르지 마세요.',
    '시간이 충분하니까',
    {
      uz: 'Hali vaqt yetarli, shuning uchun juda shoshilmang.',
      en: 'There is still enough time, so do not rush too much.',
      ru: 'Времени ещё достаточно, поэтому не спешите.',
    },
  ),

  ...blank(
    'gp_s3_u5_g18_10',
    G18,
    '학생이니까 학생 할인을 받을 수 있어요.',
    '학생이니까',
    {
      uz: 'Talaba bo‘lganingiz uchun talabalik chegirmasini olishingiz mumkin.',
      en: 'Since you are a student, you can get a student discount.',
      ru: 'Поскольку вы студент, вы можете получить студенческую скидку.',
    },
  ),

  // ═══════════════════════════════════════════
  // grammar_build 10
  // ═══════════════════════════════════════════

  ...build(
    'gp_s3_u5_g18_11',
    G18,
    [
      {
        options: ['밖이', '밖을', '밖에'],
        correct: '밖이',
      },
      {
        options: ['추우니까', '추니까', '추운데'],
        correct: '추우니까',
        hints: {
          추니까: "형용사 '춥다'는 ㅂ 불규칙으로 「추우니까」가 돼요.",
          추운데: '배경 제시보다 뒤의 권유에 대한 이유가 필요해요.',
        },
      },
      {
        options: ['따뜻한 옷을', '따뜻한 옷이', '따뜻한 옷에'],
        correct: '따뜻한 옷을',
      },
      {
        options: ['입으세요.', '먹으세요.', '읽으세요.'],
        correct: '입으세요.',
      },
    ],
    {
      uz: 'Tashqarida sovuq, shuning uchun issiq kiyim kiying.',
      en: 'It is cold outside, so wear warm clothes.',
      ru: 'На улице холодно, поэтому наденьте тёплую одежду.',
    },
  ),

  ...build(
    'gp_s3_u5_g18_12',
    G18,
    [
      {
        options: ['내일 시험이', '어제 시험을', '시험 시간보다'],
        correct: '내일 시험이',
      },
      {
        options: ['있으니까', '있는데', '있거나'],
        correct: '있으니까',
      },
      {
        options: ['오늘', '지난주', '작년에'],
        correct: '오늘',
      },
      {
        options: [
          '일찍 자려고 해요.',
          '일찍 먹어 봤어요.',
          '일찍 산 것 같아요.',
        ],
        correct: '일찍 자려고 해요.',
      },
    ],
    {
      uz: 'Ertaga imtihon borligi uchun bugun erta uxlamoqchiman.',
      en: 'I have an exam tomorrow, so I am going to bed early tonight.',
      ru: 'Завтра экзамен, поэтому сегодня я собираюсь лечь рано.',
    },
  ),

  ...build(
    'gp_s3_u5_g18_13',
    G18,
    [
      {
        options: ['길이', '길을', '길에'],
        correct: '길이',
      },
      {
        options: ['많이 막히니까', '많이 막히는데', '많이 막히거나'],
        correct: '많이 막히니까',
      },
      {
        options: ['지하철로', '지하철이', '지하철을'],
        correct: '지하철로',
      },
      {
        options: ['갑시다.', '갔어요.', '갈 줄 알아요.'],
        correct: '갑시다.',
      },
    ],
    {
      uz: 'Yo‘llar tirband, shuning uchun metroda boraylik.',
      en: 'Traffic is heavy, so let’s take the subway.',
      ru: 'На дорогах пробки, поэтому давайте поедем на метро.',
    },
  ),

  ...build(
    'gp_s3_u5_g18_14',
    G18,
    [
      {
        options: ['이 식당은', '이 식당을', '이 식당에'],
        correct: '이 식당은',
      },
      {
        options: ['사람이 많으니까', '사람보다 많으니까', '사람이 많은데'],
        correct: '사람이 많으니까',
      },
      {
        options: ['미리 예약하는 게', '미리 예약한 게', '미리 예약할 게'],
        correct: '미리 예약하는 게',
      },
      {
        options: ['좋겠어요.', '먹겠어요.', '읽겠어요.'],
        correct: '좋겠어요.',
      },
    ],
    {
      uz: 'Bu restoranda odam ko‘p, oldindan band qilgan yaxshi.',
      en: 'This restaurant is crowded, so it would be better to reserve in advance.',
      ru: 'В ресторане много людей, поэтому лучше забронировать заранее.',
    },
  ),

  ...build(
    'gp_s3_u5_g18_15',
    G18,
    [
      {
        options: ['오늘은', '오늘을', '오늘에'],
        correct: '오늘은',
      },
      {
        options: ['주말이니까', '주말니까', '주말은니까'],
        correct: '주말이니까',
        hints: {
          주말니까: "받침 있는 명사 '주말' 뒤에는 「이니까」를 써요.",
          주말은니까:
            '「은」을 먼저 붙이지 않고 명사에 바로 「이니까」를 붙여요.',
        },
      },
      {
        options: ['조금 늦게', '아주 맵게', '밖에'],
        correct: '조금 늦게',
      },
      {
        options: ['일어나도 괜찮아요.', '먹어도 괜찮아요.', '읽어도 괜찮아요.'],
        correct: '일어나도 괜찮아요.',
      },
    ],
    {
      uz: 'Bugun dam olish kuni, shuning uchun biroz kechroq tursak ham bo‘ladi.',
      en: 'It is the weekend, so it is okay to get up a little late.',
      ru: 'Сегодня выходной, поэтому можно встать немного позже.',
    },
  ),

  ...build(
    'gp_s3_u5_g18_16',
    G18,
    [
      {
        options: ['처음 가는 곳이니까', '처음 가는 곳니까', '처음 간 곳인데'],
        correct: '처음 가는 곳이니까',
      },
      {
        options: ['지도를', '지도가', '지도에'],
        correct: '지도를',
      },
      {
        options: ['미리', '밖에', '보다'],
        correct: '미리',
      },
      {
        options: ['확인하세요.', '마시세요.', '입으세요.'],
        correct: '확인하세요.',
      },
    ],
    {
      uz: 'Birinchi bor borayotgan joyingiz, shuning uchun xaritani oldindan tekshiring.',
      en: 'Since it is your first time going there, check the map beforehand.',
      ru: 'Поскольку вы идёте туда впервые, заранее проверьте карту.',
    },
  ),

  ...build(
    'gp_s3_u5_g18_17',
    G18,
    [
      {
        options: ['시간이', '시간을', '시간에'],
        correct: '시간이',
      },
      {
        options: ['없으니까', '없는데', '없거나'],
        correct: '없으니까',
      },
      {
        options: ['택시를', '택시가', '택시에'],
        correct: '택시를',
      },
      {
        options: ['타는 게 어때요?', '탄 적이 있어요?', '탈 줄 알아요?'],
        correct: '타는 게 어때요?',
      },
    ],
    {
      uz: 'Vaqt yo‘q, taksida borsak qanday?',
      en: 'We do not have much time, so how about taking a taxi?',
      ru: 'Времени мало, может, поедем на такси?',
    },
  ),

  ...build(
    'gp_s3_u5_g18_18',
    G18,
    [
      {
        options: ['이 문제는', '이 문제를', '이 문제에'],
        correct: '이 문제는',
      },
      {
        options: ['중요하니까', '중요하는니까', '중요한데'],
        correct: '중요하니까',
        hints: {
          중요하는니까: "형용사 '중요하다'에는 「-는」을 넣지 않아요.",
          중요한데: '이번 문장은 뒤의 지시에 대한 이유를 말하고 있어요.',
        },
      },
      {
        options: ['꼭', '전혀', '밖에'],
        correct: '꼭',
      },
      {
        options: ['다시 복습하세요.', '다시 출발하세요.', '다시 입으세요.'],
        correct: '다시 복습하세요.',
      },
    ],
    {
      uz: 'Bu savol muhim, shuning uchun uni albatta qayta ko‘rib chiqing.',
      en: 'This problem is important, so be sure to review it again.',
      ru: 'Эта задача важная, поэтому обязательно повторите её.',
    },
  ),

  ...build(
    'gp_s3_u5_g18_19',
    G18,
    [
      {
        options: ['아직', '벌써', '전혀'],
        correct: '아직',
      },
      {
        options: ['시간이 충분하니까', '시간을 충분하니까', '시간이 충분한데'],
        correct: '시간이 충분하니까',
      },
      {
        options: ['너무', '밖에', '동안'],
        correct: '너무',
      },
      {
        options: ['서두르지 마세요.', '먹지 마세요.', '입지 마세요.'],
        correct: '서두르지 마세요.',
      },
    ],
    {
      uz: 'Hali vaqt yetarli, shuning uchun juda shoshilmang.',
      en: 'There is still enough time, so do not rush.',
      ru: 'Времени ещё достаточно, поэтому не спешите.',
    },
  ),

  ...build(
    'gp_s3_u5_g18_20',
    G18,
    [
      {
        options: ['학생이니까', '학생니까', '학생은니까'],
        correct: '학생이니까',
        hints: {
          학생니까: "받침 있는 명사 '학생' 뒤에는 「이니까」가 필요해요.",
          학생은니까: '명사 뒤에 바로 「이니까」를 붙여요.',
        },
      },
      {
        options: ['학생 할인을', '학생 할인이', '학생 할인에'],
        correct: '학생 할인을',
      },
      {
        options: ['받을 수 있어요.', '받는 줄 알아요.', '받은 것 같아요.'],
        correct: '받을 수 있어요.',
      },
    ],
    {
      uz: 'Talaba bo‘lganingiz uchun talabalik chegirmasini olishingiz mumkin.',
      en: 'Since you are a student, you can get a student discount.',
      ru: 'Поскольку вы студент, можете получить студенческую скидку.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 19. V-고 나서
//
// V-고 나서
// 앞의 행동을 완전히 끝낸 뒤
// 다음 행동이 이어짐
//
// 행동의 순서를 분명하게 표현
// ─────────────────────────────────────────────
const G19 = 'verb-go-naseo';

const G19_Q = {
  // ═══════════════════════════════════════════
  // grammar_blank 10
  // ═══════════════════════════════════════════

  ...blank(
    'gp_s3_u5_g19_01',
    G19,
    '아침을 먹고 나서 학교에 갔어요.',
    '아침을 먹고 나서',
    {
      uz: 'Nonushta qilgandan keyin maktabga bordim.',
      en: 'After eating breakfast, I went to school.',
      ru: 'После завтрака я пошёл в школу.',
    },
  ),

  ...blank(
    'gp_s3_u5_g19_02',
    G19,
    '숙제를 다 하고 나서 친구를 만났어요.',
    '숙제를 다 하고 나서',
    {
      uz: 'Uy vazifamni tugatgandan keyin do‘stim bilan uchrashdim.',
      en: 'After finishing all my homework, I met my friend.',
      ru: 'Закончив домашнюю работу, я встретился с другом.',
    },
  ),

  ...blank(
    'gp_s3_u5_g19_03',
    G19,
    '한국에 도착하고 나서 휴대전화 유심을 샀어요.',
    '한국에 도착하고 나서',
    {
      uz: 'Koreyaga yetib kelgandan keyin telefon SIM-kartasini sotib oldim.',
      en: 'After arriving in Korea, I bought a SIM card for my phone.',
      ru: 'После приезда в Корею я купил SIM-карту для телефона.',
    },
  ),

  ...blank(
    'gp_s3_u5_g19_04',
    G19,
    '설명서를 읽고 나서 기계를 사용하세요.',
    '설명서를 읽고 나서',
    {
      uz: 'Qo‘llanmani o‘qigandan keyin qurilmani ishlating.',
      en: 'Read the instructions before using the machine.',
      ru: 'Сначала прочитайте инструкцию, а потом пользуйтесь устройством.',
    },
  ),

  ...blank(
    'gp_s3_u5_g19_05',
    G19,
    '운동하고 나서 찬물을 너무 많이 마시지 마세요.',
    '운동하고 나서',
    {
      uz: 'Mashq qilgandan keyin juda ko‘p sovuq suv ichmang.',
      en: 'Do not drink too much cold water right after exercising.',
      ru: 'После тренировки не пейте слишком много холодной воды.',
    },
  ),

  ...blank(
    'gp_s3_u5_g19_06',
    G19,
    '친구와 이야기하고 나서 생각이 조금 바뀌었어요.',
    '친구와 이야기하고 나서',
    {
      uz: 'Do‘stim bilan gaplashgandan keyin fikrim biroz o‘zgardi.',
      en: 'After talking with my friend, I changed my mind a little.',
      ru: 'После разговора с другом моё мнение немного изменилось.',
    },
  ),

  ...blank(
    'gp_s3_u5_g19_07',
    G19,
    '호텔에 체크인하고 나서 근처를 구경했어요.',
    '호텔에 체크인하고 나서',
    {
      uz: 'Mehmonxonaga joylashgandan keyin atrofni tomosha qildim.',
      en: 'After checking into the hotel, I looked around the neighborhood.',
      ru: 'После заселения в отель я осмотрел окрестности.',
    },
  ),

  ...blank(
    'gp_s3_u5_g19_08',
    G19,
    '옷을 직접 입어 보고 나서 살지 결정할 거예요.',
    '직접 입어 보고 나서',
    {
      uz: 'Kiyimni o‘zim kiyib ko‘rgandan keyin sotib olish-olmaslikni hal qilaman.',
      en: 'I will decide whether to buy the clothes after trying them on.',
      ru: 'Я решу, покупать ли одежду, после того как примерю её.',
    },
  ),

  ...blank(
    'gp_s3_u5_g19_09',
    G19,
    '수업이 끝나고 나서 모르는 내용을 선생님께 질문했어요.',
    '수업이 끝나고 나서',
    {
      uz: 'Dars tugagandan keyin tushunmagan narsalarimni o‘qituvchidan so‘radim.',
      en: 'After class ended, I asked the teacher about what I did not understand.',
      ru: 'После занятия я спросил преподавателя о том, чего не понял.',
    },
  ),

  ...blank(
    'gp_s3_u5_g19_10',
    G19,
    '여행 계획을 세우고 나서 비행기표를 예약했어요.',
    '여행 계획을 세우고 나서',
    {
      uz: 'Sayohat rejasini tuzgandan keyin samolyot chiptasini band qildim.',
      en: 'After making my travel plans, I booked a plane ticket.',
      ru: 'Составив план поездки, я забронировал билет на самолёт.',
    },
  ),

  // ═══════════════════════════════════════════
  // grammar_build 10
  // ═══════════════════════════════════════════

  ...build(
    'gp_s3_u5_g19_11',
    G19,
    [
      {
        options: ['아침을', '아침이', '아침에'],
        correct: '아침을',
      },
      {
        options: ['먹고 나서', '먹으려고', '먹거나'],
        correct: '먹고 나서',
        hints: {
          먹으려고:
            '학교에 간 목적이 아침을 먹는 것이라는 뜻이 되어 문맥이 달라져요.',
          먹거나: '두 행동 중 하나를 선택하는 문장이 아니에요.',
        },
      },
      {
        options: ['학교에', '학교에서', '학교를'],
        correct: '학교에',
      },
      {
        options: ['갔어요.', '먹었어요.', '입었어요.'],
        correct: '갔어요.',
      },
    ],
    {
      uz: 'Nonushta qilgandan keyin maktabga bordim.',
      en: 'After eating breakfast, I went to school.',
      ru: 'После завтрака я пошёл в школу.',
    },
  ),

  ...build(
    'gp_s3_u5_g19_12',
    G19,
    [
      {
        options: ['숙제를', '숙제가', '숙제에'],
        correct: '숙제를',
      },
      {
        options: ['다 하고 나서', '다 하려고', '다 하거나'],
        correct: '다 하고 나서',
      },
      {
        options: ['친구를', '친구가', '친구에게'],
        correct: '친구를',
      },
      {
        options: ['만났어요.', '읽었어요.', '입었어요.'],
        correct: '만났어요.',
      },
    ],
    {
      uz: 'Uy vazifamni tugatgandan keyin do‘stim bilan uchrashdim.',
      en: 'After finishing my homework, I met my friend.',
      ru: 'Закончив домашнюю работу, я встретился с другом.',
    },
  ),

  ...build(
    'gp_s3_u5_g19_13',
    G19,
    [
      {
        options: ['한국에', '한국에서', '한국을'],
        correct: '한국에',
      },
      {
        options: ['도착하고 나서', '도착하려고', '도착하거나'],
        correct: '도착하고 나서',
      },
      {
        options: ['휴대전화 유심을', '휴대전화 유심이', '휴대전화 유심에'],
        correct: '휴대전화 유심을',
      },
      {
        options: ['샀어요.', '잤어요.', '읽었어요.'],
        correct: '샀어요.',
      },
    ],
    {
      uz: 'Koreyaga kelgandan keyin SIM-karta sotib oldim.',
      en: 'After arriving in Korea, I bought a SIM card.',
      ru: 'После приезда в Корею я купил SIM-карту.',
    },
  ),

  ...build(
    'gp_s3_u5_g19_14',
    G19,
    [
      {
        options: ['설명서를', '설명서가', '설명서에'],
        correct: '설명서를',
      },
      {
        options: ['읽고 나서', '읽으려고', '읽거나'],
        correct: '읽고 나서',
      },
      {
        options: ['기계를', '기계가', '기계에'],
        correct: '기계를',
      },
      {
        options: ['사용하세요.', '마시세요.', '입으세요.'],
        correct: '사용하세요.',
      },
    ],
    {
      uz: 'Qo‘llanmani o‘qigandan keyin qurilmani ishlating.',
      en: 'Use the machine after reading the instructions.',
      ru: 'Пользуйтесь устройством после того, как прочитаете инструкцию.',
    },
  ),

  ...build(
    'gp_s3_u5_g19_15',
    G19,
    [
      {
        options: ['운동하고 나서', '운동하려고', '운동하거나'],
        correct: '운동하고 나서',
      },
      {
        options: ['찬물을', '찬물이', '찬물에'],
        correct: '찬물을',
      },
      {
        options: ['너무 많이', '전혀', '밖에'],
        correct: '너무 많이',
      },
      {
        options: ['마시지 마세요.', '입지 마세요.', '읽지 마세요.'],
        correct: '마시지 마세요.',
      },
    ],
    {
      uz: 'Mashq qilgandan keyin juda ko‘p sovuq suv ichmang.',
      en: 'Do not drink too much cold water after exercising.',
      ru: 'После тренировки не пейте слишком много холодной воды.',
    },
  ),

  ...build(
    'gp_s3_u5_g19_16',
    G19,
    [
      {
        options: ['친구와', '친구를', '친구에게만'],
        correct: '친구와',
      },
      {
        options: ['이야기하고 나서', '이야기하려고', '이야기하거나'],
        correct: '이야기하고 나서',
      },
      {
        options: ['생각이', '생각을', '생각에'],
        correct: '생각이',
      },
      {
        options: ['조금 바뀌었어요.', '조금 마셨어요.', '조금 입었어요.'],
        correct: '조금 바뀌었어요.',
      },
    ],
    {
      uz: 'Do‘stim bilan gaplashgandan keyin fikrim biroz o‘zgardi.',
      en: 'After talking with my friend, my opinion changed a little.',
      ru: 'После разговора с другом моё мнение немного изменилось.',
    },
  ),

  ...build(
    'gp_s3_u5_g19_17',
    G19,
    [
      {
        options: ['호텔에', '호텔에서만', '호텔보다'],
        correct: '호텔에',
      },
      {
        options: ['체크인하고 나서', '체크인하려고', '체크인하거나'],
        correct: '체크인하고 나서',
      },
      {
        options: ['근처를', '근처가', '근처에만'],
        correct: '근처를',
      },
      {
        options: ['구경했어요.', '먹었어요.', '입었어요.'],
        correct: '구경했어요.',
      },
    ],
    {
      uz: 'Mehmonxonaga joylashgandan keyin atrofni tomosha qildim.',
      en: 'After checking into the hotel, I looked around nearby.',
      ru: 'После заселения в отель я осмотрел окрестности.',
    },
  ),

  ...build(
    'gp_s3_u5_g19_18',
    G19,
    [
      {
        options: ['옷을', '옷이', '옷에'],
        correct: '옷을',
      },
      {
        options: ['직접 입어 보고 나서', '직접 입으려고', '직접 입거나'],
        correct: '직접 입어 보고 나서',
      },
      {
        options: ['살지', '사는지', '산지'],
        correct: '살지',
      },
      {
        options: ['결정할 거예요.', '결정한 것 같아요.', '결정한 적이 있어요.'],
        correct: '결정할 거예요.',
      },
    ],
    {
      uz: 'Kiyimni kiyib ko‘rgandan keyin sotib olish-olmaslikni hal qilaman.',
      en: 'I will decide whether to buy it after trying it on.',
      ru: 'Я решу, покупать ли одежду, после примерки.',
    },
  ),

  ...build(
    'gp_s3_u5_g19_19',
    G19,
    [
      {
        options: ['수업이', '수업을', '수업에'],
        correct: '수업이',
      },
      {
        options: ['끝나고 나서', '끝나려고', '끝나거나'],
        correct: '끝나고 나서',
      },
      {
        options: ['모르는 내용을', '모르는 내용이', '모르는 내용에'],
        correct: '모르는 내용을',
      },
      {
        options: [
          '선생님께 질문했어요.',
          '선생님을 먹었어요.',
          '선생님이 입었어요.',
        ],
        correct: '선생님께 질문했어요.',
      },
    ],
    {
      uz: 'Dars tugagandan keyin tushunmagan joylarimni o‘qituvchidan so‘radim.',
      en: 'After class, I asked the teacher about what I did not understand.',
      ru: 'После занятия я спросил преподавателя о непонятных моментах.',
    },
  ),

  ...build(
    'gp_s3_u5_g19_20',
    G19,
    [
      {
        options: ['여행 계획을', '여행 계획이', '여행 계획에'],
        correct: '여행 계획을',
      },
      {
        options: ['세우고 나서', '세우려고', '세우거나'],
        correct: '세우고 나서',
      },
      {
        options: ['비행기표를', '비행기표가', '비행기표에'],
        correct: '비행기표를',
      },
      {
        options: ['예약했어요.', '마셨어요.', '입었어요.'],
        correct: '예약했어요.',
      },
    ],
    {
      uz: 'Sayohat rejasini tuzgandan keyin samolyot chiptasini band qildim.',
      en: 'After planning the trip, I booked a plane ticket.',
      ru: 'Составив план поездки, я забронировал билет на самолёт.',
    },
  ),
};

// ═══════════════════════════════════════════════════════════
// UNIT 6
// 수단·방향 · 이유 · ㄹ 불규칙 · 해결 방법 · 과거 추측
// ═══════════════════════════════════════════════════════════

// ─────────────────────────────────────────────
// 문법 20. N(으)로
//
// 받침 O → N으로
// 받침 X → N로
// ㄹ 받침 → N로
//
// 이동 방향, 교통수단·도구·방법, 자격·용도 등을 표현
// ─────────────────────────────────────────────
const G20 = 'noun-euro';

const G20_Q = {
  // ═══════════════════════════════════════════
  // grammar_blank 10
  // ═══════════════════════════════════════════

  ...blank(
    'gp_s3_u6_g20_01',
    G20,
    '서울에서 부산까지 기차로 갔어요.',
    '기차로',
    {
      uz: 'Seuldan Busangacha poyezdda bordim.',
      en: 'I went from Seoul to Busan by train.',
      ru: 'Из Сеула в Пусан я поехал на поезде.',
    },
  ),

  ...blank(
    'gp_s3_u6_g20_02',
    G20,
    '이 서류는 이메일로 보내 주세요.',
    '이메일로',
    {
      uz: 'Bu hujjatni elektron pochta orqali yuboring.',
      en: 'Please send this document by email.',
      ru: 'Пожалуйста, отправьте этот документ по электронной почте.',
    },
  ),

  ...blank(
    'gp_s3_u6_g20_03',
    G20,
    '모르는 단어에 연필로 표시했어요.',
    '연필로',
    {
      uz: 'Bilmagan so‘zlarimni qalam bilan belgiladim.',
      en: 'I marked the unfamiliar words with a pencil.',
      ru: 'Я отметил незнакомые слова карандашом.',
    },
  ),

  ...blank(
    'gp_s3_u6_g20_04',
    G20,
    '은행에서 오른쪽으로 가면 우체국이 보여요.',
    '오른쪽으로',
    {
      uz: 'Bankdan o‘ng tomonga borsangiz, pochta ko‘rinadi.',
      en: 'If you go to the right from the bank, you will see the post office.',
      ru: 'Если от банка пойти направо, вы увидите почту.',
    },
  ),

  ...blank(
    'gp_s3_u6_g20_05',
    G20,
    '비행기로 보내면 배송비가 더 비싸요.',
    '비행기로',
    {
      uz: 'Samolyot orqali yuborsangiz, yetkazib berish qimmatroq bo‘ladi.',
      en: 'If you send it by air, the shipping fee is more expensive.',
      ru: 'Если отправить самолётом, доставка будет дороже.',
    },
  ),

  ...blank(
    'gp_s3_u6_g20_06',
    G20,
    '현금이 없어서 카드로 계산했어요.',
    '카드로',
    {
      uz: 'Naqd pulim bo‘lmagani uchun karta bilan to‘ladim.',
      en: 'I did not have cash, so I paid by card.',
      ru: 'У меня не было наличных, поэтому я заплатил картой.',
    },
  ),

  ...blank(
    'gp_s3_u6_g20_07',
    G20,
    '이 길로 계속 가면 지하철역이 나와요.',
    '이 길로',
    {
      uz: 'Shu yo‘ldan davom etsangiz, metro bekati chiqadi.',
      en: 'If you continue along this road, you will reach the subway station.',
      ru: 'Если идти дальше по этой дороге, вы выйдете к станции метро.',
    },
  ),

  ...blank(
    'gp_s3_u6_g20_08',
    G20,
    '친구에게 생일 선물로 향수를 샀어요.',
    '생일 선물로',
    {
      uz: 'Do‘stimga tug‘ilgan kun sovg‘asi sifatida atir oldim.',
      en: 'I bought perfume as a birthday present for my friend.',
      ru: 'Я купил другу духи в качестве подарка на день рождения.',
    },
  ),

  ...blank(
    'gp_s3_u6_g20_09',
    G20,
    '처음에는 한국어로 주문하는 것이 어려웠어요.',
    '한국어로',
    {
      uz: 'Avvaliga koreys tilida buyurtma berish qiyin edi.',
      en: 'At first, ordering in Korean was difficult.',
      ru: 'Сначала было трудно делать заказ на корейском языке.',
    },
  ),

  ...blank(
    'gp_s3_u6_g20_10',
    G20,
    '깨지기 쉬운 물건은 택배로 보내지 않는 게 좋아요.',
    '택배로',
    {
      uz: 'Tez sinadigan narsalarni kuryer orqali yubormagan ma’qul.',
      en: 'It is better not to send fragile items by parcel delivery.',
      ru: 'Хрупкие вещи лучше не отправлять обычной посылкой.',
    },
  ),

  // ═══════════════════════════════════════════
  // grammar_build 10
  // ═══════════════════════════════════════════

  ...build(
    'gp_s3_u6_g20_11',
    G20,
    [
      {
        options: ['서울에서', '서울을', '서울이'],
        correct: '서울에서',
      },
      {
        options: ['부산까지', '부산보다', '부산밖에'],
        correct: '부산까지',
      },
      {
        options: ['기차로', '기차으로', '기차에'],
        correct: '기차로',
        hints: {
          기차으로: "받침 없는 명사 '기차' 뒤에는 '로'를 써요.",
          기차에: '이 문장에서는 목적지가 아니라 교통수단을 나타내요.',
        },
      },
      {
        options: ['갔어요.', '먹었어요.', '입었어요.'],
        correct: '갔어요.',
      },
    ],
    {
      uz: 'Seuldan Busangacha poyezdda bordim.',
      en: 'I went from Seoul to Busan by train.',
      ru: 'Из Сеула в Пусан я поехал на поезде.',
    },
  ),

  ...build(
    'gp_s3_u6_g20_12',
    G20,
    [
      {
        options: ['이 서류는', '이 서류를가', '이 서류에만'],
        correct: '이 서류는',
      },
      {
        options: ['이메일로', '이메일으로', '이메일에'],
        correct: '이메일로',
      },
      {
        options: ['보내 주세요.', '입어 주세요.', '먹어 주세요.'],
        correct: '보내 주세요.',
      },
    ],
    {
      uz: 'Bu hujjatni elektron pochta orqali yuboring.',
      en: 'Please send this document by email.',
      ru: 'Отправьте этот документ по электронной почте.',
    },
  ),

  ...build(
    'gp_s3_u6_g20_13',
    G20,
    [
      {
        options: ['모르는 단어에', '모르는 단어를만', '모르는 단어가'],
        correct: '모르는 단어에',
      },
      {
        options: ['연필로', '연필으로', '연필에'],
        correct: '연필로',
        hints: {
          연필으로: "ㄹ 받침 뒤에는 '으로'가 아니라 '로'를 써요.",
          연필에: '표시할 때 사용하는 도구를 나타내므로 「로」가 필요해요.',
        },
      },
      {
        options: ['표시했어요.', '도착했어요.', '출발했어요.'],
        correct: '표시했어요.',
      },
    ],
    {
      uz: 'Bilmagan so‘zlarimni qalam bilan belgiladim.',
      en: 'I marked unfamiliar words with a pencil.',
      ru: 'Я отметил незнакомые слова карандашом.',
    },
  ),

  ...build(
    'gp_s3_u6_g20_14',
    G20,
    [
      {
        options: ['은행에서', '은행을', '은행이'],
        correct: '은행에서',
      },
      {
        options: ['오른쪽으로', '오른쪽로', '오른쪽에'],
        correct: '오른쪽으로',
        hints: {
          오른쪽로: "받침 있는 '쪽' 뒤에는 '으로'를 써요.",
          오른쪽에: '현재 위치가 아니라 이동 방향을 나타내요.',
        },
      },
      {
        options: ['가면', '가려고', '가거나'],
        correct: '가면',
      },
      {
        options: ['우체국이 보여요.', '우체국을 먹어요.', '우체국에 입어요.'],
        correct: '우체국이 보여요.',
      },
    ],
    {
      uz: 'Bankdan o‘ngga borsangiz, pochta ko‘rinadi.',
      en: 'If you go right from the bank, you will see the post office.',
      ru: 'Если от банка пойти направо, вы увидите почту.',
    },
  ),

  ...build(
    'gp_s3_u6_g20_15',
    G20,
    [
      {
        options: ['비행기로', '비행기으로', '비행기에'],
        correct: '비행기로',
      },
      {
        options: ['보내면', '보내려고', '보내거나'],
        correct: '보내면',
      },
      {
        options: ['배송비가', '배송비를', '배송비에'],
        correct: '배송비가',
      },
      {
        options: ['더 비싸요.', '더 먹어요.', '더 읽어요.'],
        correct: '더 비싸요.',
      },
    ],
    {
      uz: 'Samolyot orqali yuborsangiz, yetkazib berish qimmatroq.',
      en: 'If you send it by air, shipping is more expensive.',
      ru: 'Если отправить самолётом, доставка будет дороже.',
    },
  ),

  ...build(
    'gp_s3_u6_g20_16',
    G20,
    [
      {
        options: ['현금이 없어서', '현금을 없어서', '현금에 없어서'],
        correct: '현금이 없어서',
      },
      {
        options: ['카드로', '카드으로', '카드에'],
        correct: '카드로',
      },
      {
        options: ['계산했어요.', '도착했어요.', '입었어요.'],
        correct: '계산했어요.',
      },
    ],
    {
      uz: 'Naqd pulim bo‘lmagani uchun karta bilan to‘ladim.',
      en: 'I did not have cash, so I paid by card.',
      ru: 'У меня не было наличных, поэтому я заплатил картой.',
    },
  ),

  ...build(
    'gp_s3_u6_g20_17',
    G20,
    [
      {
        options: ['이 길로', '이 길으로', '이 길에'],
        correct: '이 길로',
        hints: {
          이길으로: "ㄹ 받침 뒤에는 '로'를 사용해요.",
          이길에: '목적지가 아니라 이동하는 경로를 나타내고 있어요.',
        },
      },
      {
        options: ['계속', '아직', '밖에'],
        correct: '계속',
      },
      {
        options: ['가면', '갔으면', '가는데'],
        correct: '가면',
      },
      {
        options: [
          '지하철역이 나와요.',
          '지하철역을 먹어요.',
          '지하철역이 입어요.',
        ],
        correct: '지하철역이 나와요.',
      },
    ],
    {
      uz: 'Shu yo‘ldan davom etsangiz, metro bekatiga chiqasiz.',
      en: 'If you keep going along this road, you will reach the subway station.',
      ru: 'Если идти дальше по этой дороге, вы выйдете к метро.',
    },
  ),

  ...build(
    'gp_s3_u6_g20_18',
    G20,
    [
      {
        options: ['친구에게', '친구를', '친구가'],
        correct: '친구에게',
      },
      {
        options: ['생일 선물로', '생일 선물으로', '생일 선물에'],
        correct: '생일 선물로',
        hints: {
          '생일 선물으로': "ㄹ 받침 뒤에는 '로'를 써요.",
          '생일 선물에': '향수의 용도·자격을 나타내므로 「로」가 맞아요.',
        },
      },
      {
        options: ['향수를', '향수가', '향수에'],
        correct: '향수를',
      },
      {
        options: ['샀어요.', '잤어요.', '읽었어요.'],
        correct: '샀어요.',
      },
    ],
    {
      uz: 'Do‘stimga tug‘ilgan kun sovg‘asi sifatida atir oldim.',
      en: 'I bought perfume as a birthday present for my friend.',
      ru: 'Я купил другу духи в подарок на день рождения.',
    },
  ),

  ...build(
    'gp_s3_u6_g20_19',
    G20,
    [
      {
        options: ['처음에는', '어제까지', '지난달보다'],
        correct: '처음에는',
      },
      {
        options: ['한국어로', '한국어으로', '한국어에'],
        correct: '한국어로',
      },
      {
        options: ['주문하는 것이', '주문한 것이', '주문할 것이'],
        correct: '주문하는 것이',
      },
      {
        options: ['어려웠어요.', '마셨어요.', '도착했어요.'],
        correct: '어려웠어요.',
      },
    ],
    {
      uz: 'Avvaliga koreys tilida buyurtma berish qiyin edi.',
      en: 'At first, ordering in Korean was difficult.',
      ru: 'Сначала было трудно делать заказ на корейском.',
    },
  ),

  ...build(
    'gp_s3_u6_g20_20',
    G20,
    [
      {
        options: [
          '깨지기 쉬운 물건은',
          '깨지기 쉬운 물건을',
          '깨지기 쉬운 물건에',
        ],
        correct: '깨지기 쉬운 물건은',
      },
      {
        options: ['택배로', '택배으로', '택배에'],
        correct: '택배로',
      },
      {
        options: ['보내지 않는 게', '보내지 않은 게', '보내지 않을 게'],
        correct: '보내지 않는 게',
      },
      {
        options: ['좋아요.', '먹어요.', '입어요.'],
        correct: '좋아요.',
      },
    ],
    {
      uz: 'Tez sinadigan narsalarni kuryer orqali yubormagan ma’qul.',
      en: 'It is better not to send fragile items by parcel delivery.',
      ru: 'Хрупкие вещи лучше не отправлять обычной посылкой.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 21. N(이)라서
//
// 받침 O → N이라서
// 받침 X → N라서
//
// 명사가 어떤 행동·상태의 이유가 됨
// "N이기 때문에"
// ─────────────────────────────────────────────
const G21 = 'noun-iraseo';

const G21_Q = {
  // ═══════════════════════════════════════════
  // grammar_blank 10
  // ═══════════════════════════════════════════

  ...blank(
    'gp_s3_u6_g21_01',
    G21,
    '오늘은 휴일이라서 은행이 문을 닫았어요.',
    '휴일이라서',
    {
      uz: 'Bugun dam olish kuni bo‘lgani uchun bank yopiq.',
      en: 'The bank is closed because today is a holiday.',
      ru: 'Банк закрыт, потому что сегодня выходной.',
    },
  ),

  ...blank(
    'gp_s3_u6_g21_02',
    G21,
    '처음이라서 조금 긴장했어요.',
    '처음이라서',
    {
      uz: 'Birinchi marta bo‘lgani uchun biroz hayajonlandim.',
      en: 'I was a little nervous because it was my first time.',
      ru: 'Я немного нервничал, потому что это было впервые.',
    },
  ),

  ...blank(
    'gp_s3_u6_g21_03',
    G21,
    '학생이라서 박물관 입장료를 할인받았어요.',
    '학생이라서',
    {
      uz: 'Talaba bo‘lganim uchun muzey chiptasiga chegirma oldim.',
      en: 'I received a museum admission discount because I am a student.',
      ru: 'Я получил скидку на вход в музей, потому что я студент.',
    },
  ),

  ...blank(
    'gp_s3_u6_g21_04',
    G21,
    '제 생일이라서 친구들이 작은 파티를 준비했어요.',
    '제 생일이라서',
    {
      uz: 'Tug‘ilgan kunim bo‘lgani uchun do‘stlarim kichik bayram tayyorlashdi.',
      en: 'My friends prepared a small party because it was my birthday.',
      ru: 'Друзья устроили небольшую вечеринку, потому что у меня был день рождения.',
    },
  ),

  ...blank(
    'gp_s3_u6_g21_05',
    G21,
    '외국인이라서 아직 한국 생활이 익숙하지 않아요.',
    '외국인이라서',
    {
      uz: 'Chet ellik bo‘lganim uchun hali Koreyadagi hayotga o‘rganmaganman.',
      en: 'Because I am a foreigner, I am not yet used to life in Korea.',
      ru: 'Поскольку я иностранец, я ещё не привык к жизни в Корее.',
    },
  ),

  ...blank(
    'gp_s3_u6_g21_06',
    G21,
    '여기는 학교라서 수업 시간에는 조용히 해야 해요.',
    '학교라서',
    {
      uz: 'Bu yer maktab bo‘lgani uchun dars vaqtida jim turish kerak.',
      en: 'Since this is a school, you need to be quiet during class.',
      ru: 'Поскольку это школа, во время занятий нужно соблюдать тишину.',
    },
  ),

  ...blank(
    'gp_s3_u6_g21_07',
    G21,
    '비밀이라서 아직 다른 사람에게 말할 수 없어요.',
    '비밀이라서',
    {
      uz: 'Bu sir bo‘lgani uchun hozircha boshqalarga ayta olmayman.',
      en: 'Because it is a secret, I cannot tell anyone else yet.',
      ru: 'Поскольку это секрет, я пока не могу рассказать другим.',
    },
  ),

  ...blank(
    'gp_s3_u6_g21_08',
    G21,
    '고향이라서 길을 보지 않아도 잘 찾을 수 있어요.',
    '고향이라서',
    {
      uz: 'Bu mening tug‘ilgan shahrim bo‘lgani uchun yo‘lni yaxshi bilaman.',
      en: 'Because this is my hometown, I can find my way without checking a map.',
      ru: 'Поскольку это мой родной город, я хорошо знаю дорогу.',
    },
  ),

  ...blank(
    'gp_s3_u6_g21_09',
    G21,
    '약속 시간이라서 이제 출발해야 해요.',
    '약속 시간이라서',
    {
      uz: 'Uchrashuv vaqti bo‘lgani uchun endi yo‘lga chiqishim kerak.',
      en: 'It is time for my appointment, so I need to leave now.',
      ru: 'Уже время встречи, поэтому мне пора выходить.',
    },
  ),

  ...blank(
    'gp_s3_u6_g21_10',
    G21,
    '친한 친구라서 어려운 이야기도 편하게 할 수 있어요.',
    '친한 친구라서',
    {
      uz: 'Yaqin do‘stim bo‘lgani uchun qiyin mavzularda ham bemalol gaplasha olaman.',
      en: 'Because we are close friends, I can comfortably talk about difficult things too.',
      ru: 'Поскольку это близкий друг, я могу спокойно говорить даже о сложных вещах.',
    },
  ),

  // ═══════════════════════════════════════════
  // grammar_build 10
  // ═══════════════════════════════════════════

  ...build(
    'gp_s3_u6_g21_11',
    G21,
    [
      {
        options: ['오늘은', '오늘을', '오늘에'],
        correct: '오늘은',
      },
      {
        options: ['휴일이라서', '휴일라서', '휴일이어서만'],
        correct: '휴일이라서',
        hints: {
          휴일라서: "받침 있는 명사 '휴일' 뒤에는 '이라서'를 써요.",
          휴일이어서만: '이 문법의 목표 형태는 「N(이)라서」예요.',
        },
      },
      {
        options: ['은행이', '은행을', '은행에'],
        correct: '은행이',
      },
      {
        options: ['문을 닫았어요.', '밥을 먹었어요.', '옷을 입었어요.'],
        correct: '문을 닫았어요.',
      },
    ],
    {
      uz: 'Bugun dam olish kuni bo‘lgani uchun bank yopiq.',
      en: 'The bank is closed because today is a holiday.',
      ru: 'Банк закрыт, потому что сегодня выходной.',
    },
  ),

  ...build(
    'gp_s3_u6_g21_12',
    G21,
    [
      {
        options: ['처음이라서', '처음라서', '처음은라서'],
        correct: '처음이라서',
      },
      {
        options: ['조금', '밖에', '동안'],
        correct: '조금',
      },
      {
        options: ['긴장했어요.', '도착했어요.', '출발했어요.'],
        correct: '긴장했어요.',
      },
    ],
    {
      uz: 'Birinchi marta bo‘lgani uchun biroz hayajonlandim.',
      en: 'I was a little nervous because it was my first time.',
      ru: 'Я немного нервничал, потому что это было впервые.',
    },
  ),

  ...build(
    'gp_s3_u6_g21_13',
    G21,
    [
      {
        options: ['학생이라서', '학생라서', '학생은라서'],
        correct: '학생이라서',
      },
      {
        options: ['박물관 입장료를', '박물관 입장료가', '박물관 입장료에'],
        correct: '박물관 입장료를',
      },
      {
        options: ['할인받았어요.', '출발했어요.', '도착했어요.'],
        correct: '할인받았어요.',
      },
    ],
    {
      uz: 'Talaba bo‘lganim uchun muzey chiptasiga chegirma oldim.',
      en: 'I got a museum discount because I am a student.',
      ru: 'Я получил скидку в музее, потому что я студент.',
    },
  ),

  ...build(
    'gp_s3_u6_g21_14',
    G21,
    [
      {
        options: ['제 생일이라서', '제 생일라서', '제 생일은라서'],
        correct: '제 생일이라서',
      },
      {
        options: ['친구들이', '친구들을', '친구들에게'],
        correct: '친구들이',
      },
      {
        options: ['작은 파티를', '작은 파티가', '작은 파티에'],
        correct: '작은 파티를',
      },
      {
        options: ['준비했어요.', '읽었어요.', '입었어요.'],
        correct: '준비했어요.',
      },
    ],
    {
      uz: 'Tug‘ilgan kunim bo‘lgani uchun do‘stlarim kichik bayram tayyorlashdi.',
      en: 'My friends prepared a small party because it was my birthday.',
      ru: 'Друзья устроили небольшую вечеринку, потому что у меня был день рождения.',
    },
  ),

  ...build(
    'gp_s3_u6_g21_15',
    G21,
    [
      {
        options: ['외국인이라서', '외국인라서', '외국인은라서'],
        correct: '외국인이라서',
      },
      {
        options: ['아직', '벌써', '밖에'],
        correct: '아직',
      },
      {
        options: ['한국 생활이', '한국 생활을', '한국 생활에만'],
        correct: '한국 생활이',
      },
      {
        options: ['익숙하지 않아요.', '출발하지 않아요.', '마시지 않아요.'],
        correct: '익숙하지 않아요.',
      },
    ],
    {
      uz: 'Chet ellik bo‘lganim uchun hali Koreyadagi hayotga ko‘nikmaganman.',
      en: 'Because I am a foreigner, I am not yet used to life in Korea.',
      ru: 'Поскольку я иностранец, я ещё не привык к жизни в Корее.',
    },
  ),

  ...build(
    'gp_s3_u6_g21_16',
    G21,
    [
      {
        options: ['여기는', '여기를', '여기가를'],
        correct: '여기는',
      },
      {
        options: ['학교라서', '학교이라서', '학교는라서'],
        correct: '학교라서',
        hints: {
          학교이라서: "받침 없는 명사 '학교' 뒤에는 '라서'를 써요.",
          학교는라서: '「는」 뒤에 붙이는 형태가 아니에요.',
        },
      },
      {
        options: ['수업 시간에는', '수업 시간을', '수업 시간보다'],
        correct: '수업 시간에는',
      },
      {
        options: [
          '조용히 해야 해요.',
          '조용히 먹어야 해요.',
          '조용히 사야 해요.',
        ],
        correct: '조용히 해야 해요.',
      },
    ],
    {
      uz: 'Bu yer maktab, shuning uchun darsda jim turish kerak.',
      en: 'Since this is a school, you need to be quiet during class.',
      ru: 'Поскольку это школа, во время занятий нужно соблюдать тишину.',
    },
  ),

  ...build(
    'gp_s3_u6_g21_17',
    G21,
    [
      {
        options: ['비밀이라서', '비밀라서', '비밀은라서'],
        correct: '비밀이라서',
      },
      {
        options: ['아직', '이미', '항상'],
        correct: '아직',
      },
      {
        options: ['다른 사람에게', '다른 사람을', '다른 사람이'],
        correct: '다른 사람에게',
      },
      {
        options: ['말할 수 없어요.', '먹을 수 없어요.', '입을 수 없어요.'],
        correct: '말할 수 없어요.',
      },
    ],
    {
      uz: 'Bu sir, shuning uchun hozircha boshqalarga ayta olmayman.',
      en: 'Because it is a secret, I cannot tell other people yet.',
      ru: 'Поскольку это секрет, я пока не могу рассказать другим.',
    },
  ),

  ...build(
    'gp_s3_u6_g21_18',
    G21,
    [
      {
        options: ['고향이라서', '고향라서', '고향은라서'],
        correct: '고향이라서',
      },
      {
        options: ['길을 보지 않아도', '길이 보지 않아도', '길에 보지 않아도'],
        correct: '길을 보지 않아도',
      },
      {
        options: [
          '잘 찾을 수 있어요.',
          '잘 먹을 수 있어요.',
          '잘 입을 수 있어요.',
        ],
        correct: '잘 찾을 수 있어요.',
      },
    ],
    {
      uz: 'Bu tug‘ilgan shahrim, shuning uchun yo‘lni yaxshi topaman.',
      en: 'Because this is my hometown, I can find my way easily.',
      ru: 'Поскольку это мой родной город, я легко нахожу дорогу.',
    },
  ),

  ...build(
    'gp_s3_u6_g21_19',
    G21,
    [
      {
        options: ['약속 시간이라서', '약속 시간라서', '약속 시간은라서'],
        correct: '약속 시간이라서',
      },
      {
        options: ['이제', '아까', '밖에'],
        correct: '이제',
      },
      {
        options: ['출발해야 해요.', '먹어야 해요.', '읽어야 해요.'],
        correct: '출발해야 해요.',
      },
    ],
    {
      uz: 'Uchrashuv vaqti bo‘ldi, shuning uchun endi chiqishim kerak.',
      en: 'It is time for the appointment, so I need to leave now.',
      ru: 'Пришло время встречи, поэтому мне нужно выходить.',
    },
  ),

  ...build(
    'gp_s3_u6_g21_20',
    G21,
    [
      {
        options: ['친한 친구라서', '친한 친구이라서', '친한 친구는라서'],
        correct: '친한 친구라서',
      },
      {
        options: ['어려운 이야기도', '어려운 이야기를만', '어려운 이야기가를'],
        correct: '어려운 이야기도',
      },
      {
        options: ['편하게', '맵게', '무겁게'],
        correct: '편하게',
      },
      {
        options: ['할 수 있어요.', '먹을 수 있어요.', '입을 수 있어요.'],
        correct: '할 수 있어요.',
      },
    ],
    {
      uz: 'Yaqin do‘stim bo‘lgani uchun qiyin mavzularda ham bemalol gaplasha olaman.',
      en: 'Because we are close friends, I can talk comfortably about difficult things.',
      ru: 'Поскольку это близкий друг, я могу спокойно говорить о сложных вещах.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 22. 'ㄹ' 불규칙
//
// ㄹ 받침 어간 뒤에
// ㄴ / ㅂ / ㅅ으로 시작하는 어미가 오면 ㄹ 탈락
//
// 살다 → 사는 / 삽니다 / 사세요
// 만들다 → 만드는 / 만듭니다 / 만드세요
// 알다 → 아는 / 압니다 / 아세요
// 열다 → 여는 / 엽니다 / 여세요
// 팔다 → 파는 / 팝니다 / 파세요
// 길다 → 긴
// 멀다 → 먼
// 달다 → 단
// ─────────────────────────────────────────────
const G22 = 'rieul-irregular';

const G22_Q = {
  // ═══════════════════════════════════════════
  // grammar_blank 10
  // ═══════════════════════════════════════════

  ...blank(
    'gp_s3_u6_g22_01',
    G22,
    '저는 서울에 사는 친구가 있어요.',
    '서울에 사는 친구',
    {
      uz: 'Mening Seulda yashaydigan do‘stim bor.',
      en: 'I have a friend who lives in Seoul.',
      ru: 'У меня есть друг, который живёт в Сеуле.',
    },
  ),

  ...blank(
    'gp_s3_u6_g22_02',
    G22,
    '아버지는 직접 가구를 만드는 일을 하세요.',
    '가구를 만드는',
    {
      uz: 'Otam mebel yasash bilan shug‘ullanadi.',
      en: 'My father works making furniture himself.',
      ru: 'Мой отец занимается изготовлением мебели.',
    },
  ),

  ...blank(
    'gp_s3_u6_g22_03',
    G22,
    '이 문제의 답을 아는 사람이 있어요?',
    '답을 아는 사람',
    {
      uz: 'Bu savolning javobini biladigan odam bormi?',
      en: 'Does anyone know the answer to this question?',
      ru: 'Есть кто-нибудь, кто знает ответ на этот вопрос?',
    },
  ),

  ...blank(
    'gp_s3_u6_g22_04',
    G22,
    '회의가 시작되기 전에 문을 여세요.',
    '문을 여세요',
    {
      uz: 'Yig‘ilish boshlanishidan oldin eshikni oching.',
      en: 'Open the door before the meeting starts.',
      ru: 'Откройте дверь до начала совещания.',
    },
  ),

  ...blank(
    'gp_s3_u6_g22_05',
    G22,
    '이 가게에서는 직접 만든 빵을 팝니다.',
    '빵을 팝니다',
    {
      uz: 'Bu do‘konda uyda tayyorlangan non sotiladi.',
      en: 'This store sells freshly made bread.',
      ru: 'В этом магазине продают хлеб собственного приготовления.',
    },
  ),

  ...blank(
    'gp_s3_u6_g22_06',
    G22,
    '공원에서 노는 아이들이 정말 즐거워 보여요.',
    '공원에서 노는 아이들',
    {
      uz: 'Bog‘da o‘ynayotgan bolalar juda xursand ko‘rinadi.',
      en: 'The children playing in the park look very happy.',
      ru: 'Дети, играющие в парке, выглядят очень счастливыми.',
    },
  ),

  ...blank(
    'gp_s3_u6_g22_07',
    G22,
    '옆방에서 아기가 우는 소리가 들려요.',
    '아기가 우는 소리',
    {
      uz: 'Qo‘shni xonadan chaqaloq yig‘layotgani eshitilyapti.',
      en: 'I can hear a baby crying in the next room.',
      ru: 'Из соседней комнаты слышен плач ребёнка.',
    },
  ),

  ...blank(
    'gp_s3_u6_g22_08',
    G22,
    '저는 긴 머리보다 짧은 머리가 더 잘 어울려요.',
    '긴 머리',
    {
      uz: 'Menga uzun sochdan ko‘ra kalta soch ko‘proq yarashadi.',
      en: 'Short hair suits me better than long hair.',
      ru: 'Короткие волосы идут мне больше, чем длинные.',
    },
  ),

  ...blank(
    'gp_s3_u6_g22_09',
    G22,
    '학교에서 먼 곳에 살아서 지하철을 타고 다녀요.',
    '먼 곳',
    {
      uz: 'Maktabdan uzoq joyda yashaganim uchun metroda qatnayman.',
      en: 'I live far from school, so I commute by subway.',
      ru: 'Я живу далеко от школы, поэтому езжу на метро.',
    },
  ),

  ...blank(
    'gp_s3_u6_g22_10',
    G22,
    '저는 너무 단 음식은 자주 먹지 않아요.',
    '단 음식',
    {
      uz: 'Men juda shirin ovqatlarni tez-tez yemayman.',
      en: 'I do not often eat very sweet food.',
      ru: 'Я нечасто ем очень сладкую пищу.',
    },
  ),

  // ═══════════════════════════════════════════
  // grammar_build 10
  // ═══════════════════════════════════════════

  ...build(
    'gp_s3_u6_g22_11',
    G22,
    [
      {
        options: ['저는', '저를', '제가'],
        correct: '저는',
      },
      {
        options: ['서울에', '서울에서를', '서울이'],
        correct: '서울에',
      },
      {
        options: ['사는', '살는', '살은'],
        correct: '사는',
        hints: {
          살는: "ㄹ 받침 동사 '살다'는 '-는' 앞에서 ㄹ이 탈락해요.",
          살은: '현재 동작을 꾸미므로 「-은」을 쓰지 않아요.',
        },
      },
      {
        options: ['친구가 있어요.', '친구를 먹어요.', '친구에 입어요.'],
        correct: '친구가 있어요.',
      },
    ],
    {
      uz: 'Mening Seulda yashaydigan do‘stim bor.',
      en: 'I have a friend who lives in Seoul.',
      ru: 'У меня есть друг, который живёт в Сеуле.',
    },
  ),

  ...build(
    'gp_s3_u6_g22_12',
    G22,
    [
      {
        options: ['아버지는', '아버지를', '아버지에게'],
        correct: '아버지는',
      },
      {
        options: ['가구를', '가구가', '가구에'],
        correct: '가구를',
      },
      {
        options: ['만드는', '만들는', '만들은'],
        correct: '만드는',
        hints: {
          만들는: "만들다 + -는 → '만드는'이에요. ㄹ이 탈락해요.",
          만들은: '현재 하는 일을 꾸미는 형태가 아니에요.',
        },
      },
      {
        options: ['일을 하세요.', '일을 먹어요.', '일을 입어요.'],
        correct: '일을 하세요.',
      },
    ],
    {
      uz: 'Otam mebel yasash bilan shug‘ullanadi.',
      en: 'My father works making furniture.',
      ru: 'Мой отец занимается изготовлением мебели.',
    },
  ),

  ...build(
    'gp_s3_u6_g22_13',
    G22,
    [
      {
        options: ['이 문제의', '이 문제를', '이 문제에'],
        correct: '이 문제의',
      },
      {
        options: ['답을', '답이', '답에'],
        correct: '답을',
      },
      {
        options: ['아는', '알는', '알은'],
        correct: '아는',
        hints: {
          알는: "알다 + -는 → '아는'이에요.",
          알은: '현재 알고 있는 사람을 꾸미므로 「아는」이 맞아요.',
        },
      },
      {
        options: ['사람이 있어요?', '사람을 먹어요?', '사람에 가요?'],
        correct: '사람이 있어요?',
      },
    ],
    {
      uz: 'Bu savolning javobini biladigan odam bormi?',
      en: 'Does anyone know the answer?',
      ru: 'Кто-нибудь знает ответ?',
    },
  ),

  ...build(
    'gp_s3_u6_g22_14',
    G22,
    [
      {
        options: [
          '회의가 시작되기 전에',
          '회의가 끝난 후에만',
          '회의 동안보다',
        ],
        correct: '회의가 시작되기 전에',
      },
      {
        options: ['문을', '문이', '문에'],
        correct: '문을',
      },
      {
        options: ['여세요.', '열으세요.', '열세요.'],
        correct: '여세요.',
        hints: {
          열으세요: "ㄹ 받침 동사 뒤에 '-으세요'를 붙이지 않아요.",
          열세요: "ㄹ이 탈락해서 '여세요'가 돼요.",
        },
      },
    ],
    {
      uz: 'Yig‘ilishdan oldin eshikni oching.',
      en: 'Open the door before the meeting.',
      ru: 'Откройте дверь перед совещанием.',
    },
  ),

  ...build(
    'gp_s3_u6_g22_15',
    G22,
    [
      {
        options: ['이 가게에서는', '이 가게를', '이 가게에만을'],
        correct: '이 가게에서는',
      },
      {
        options: ['직접 만든 빵을', '직접 만든 빵이', '직접 만든 빵에'],
        correct: '직접 만든 빵을',
      },
      {
        options: ['팝니다.', '팔습니다.', '팔읍니다.'],
        correct: '팝니다.',
        hints: {
          팔습니다: "팔다 + -ㅂ니다 → '팝니다'예요. ㄹ이 탈락해요.",
          팔읍니다: 'ㄹ 받침이라고 「-읍니다」를 붙이지 않아요.',
        },
      },
    ],
    {
      uz: 'Bu do‘konda o‘zlari tayyorlagan non sotiladi.',
      en: 'This shop sells bread it makes itself.',
      ru: 'В этом магазине продают хлеб собственного приготовления.',
    },
  ),

  ...build(
    'gp_s3_u6_g22_16',
    G22,
    [
      {
        options: ['주말에는', '어제는', '지난달에는'],
        correct: '주말에는',
      },
      {
        options: ['친구들과', '친구들을', '친구들에게'],
        correct: '친구들과',
      },
      {
        options: ['노는', '놀는', '놀은'],
        correct: '노는',
        hints: {
          놀는: "놀다 + -는 → '노는'이에요.",
          놀은: '현재 활동을 말하므로 「노는」이 맞아요.',
        },
      },
      {
        options: ['것을 좋아해요.', '것을 마셔요.', '것을 입어요.'],
        correct: '것을 좋아해요.',
      },
    ],
    {
      uz: 'Dam olish kunlari do‘stlarim bilan o‘ynashni yaxshi ko‘raman.',
      en: 'I like spending time with my friends on weekends.',
      ru: 'По выходным я люблю проводить время с друзьями.',
    },
  ),

  ...build(
    'gp_s3_u6_g22_17',
    G22,
    [
      {
        options: ['옆방에서', '옆방을', '옆방이'],
        correct: '옆방에서',
      },
      {
        options: ['아기가', '아기를', '아기에게'],
        correct: '아기가',
      },
      {
        options: ['우는', '울는', '울은'],
        correct: '우는',
        hints: {
          울는: "울다 + -는 → '우는'이에요.",
          울은: '현재 들리는 행동이므로 「우는」이 맞아요.',
        },
      },
      {
        options: ['소리가 들려요.', '소리를 먹어요.', '소리에 입어요.'],
        correct: '소리가 들려요.',
      },
    ],
    {
      uz: 'Qo‘shni xonadan chaqaloq yig‘layotgani eshitilyapti.',
      en: 'I can hear a baby crying next door.',
      ru: 'Из соседней комнаты слышен плач ребёнка.',
    },
  ),

  ...build(
    'gp_s3_u6_g22_18',
    G22,
    [
      {
        options: ['저는', '저를', '제가'],
        correct: '저는',
      },
      {
        options: ['긴', '길은', '길은'],
        correct: '긴',
        hints: {
          길은: "형용사 '길다'가 명사를 꾸밀 때 ㄹ이 탈락해서 '긴'이 돼요.",
        },
      },
      {
        options: ['머리보다', '머리까지', '머리밖에'],
        correct: '머리보다',
      },
      {
        options: [
          '짧은 머리가 더 잘 어울려요.',
          '짧은 머리를 더 먹어요.',
          '짧은 머리에 더 가요.',
        ],
        correct: '짧은 머리가 더 잘 어울려요.',
      },
    ],
    {
      uz: 'Menga uzun sochdan ko‘ra kalta soch ko‘proq yarashadi.',
      en: 'Short hair suits me better than long hair.',
      ru: 'Короткие волосы идут мне больше, чем длинные.',
    },
  ),

  ...build(
    'gp_s3_u6_g22_19',
    G22,
    [
      {
        options: ['학교에서', '학교를', '학교가'],
        correct: '학교에서',
      },
      {
        options: ['먼', '멀은', '멀는'],
        correct: '먼',
        hints: {
          멀은: "멀다 + -(으)ㄴ → '먼'이에요.",
          멀는: '형용사에 현재 동사형 「-는」을 붙이지 않아요.',
        },
      },
      {
        options: ['곳에', '곳을', '곳이'],
        correct: '곳에',
      },
      {
        options: ['살아요.', '먹어요.', '입어요.'],
        correct: '살아요.',
      },
    ],
    {
      uz: 'Maktabdan uzoq joyda yashayman.',
      en: 'I live far from school.',
      ru: 'Я живу далеко от школы.',
    },
  ),

  ...build(
    'gp_s3_u6_g22_20',
    G22,
    [
      {
        options: ['저는', '저를', '제가'],
        correct: '저는',
      },
      {
        options: ['너무', '밖에', '동안'],
        correct: '너무',
      },
      {
        options: ['단', '달은', '달는'],
        correct: '단',
        hints: {
          달은: "달다 + -(으)ㄴ → '단'이에요.",
          달는: '형용사가 명사를 꾸미므로 「-는」을 쓰지 않아요.',
        },
      },
      {
        options: ['음식은', '음식을', '음식에'],
        correct: '음식은',
      },
      {
        options: [
          '자주 먹지 않아요.',
          '자주 입지 않아요.',
          '자주 가지 않아요.',
        ],
        correct: '자주 먹지 않아요.',
      },
    ],
    {
      uz: 'Men juda shirin ovqatlarni tez-tez yemayman.',
      en: 'I do not often eat very sweet food.',
      ru: 'Я нечасто ем очень сладкую пищу.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 23. V-(으)면 되다
//
// 받침 O → V-으면 되다
// 받침 X → V-면 되다
// ㄹ 받침 → V-면 되다
//
// 어떤 문제를 해결하는 방법,
// 필요한 최소 행동을 설명
//
// "V하면 충분하다 / all you have to do is V"
// ─────────────────────────────────────────────
const G23 = 'verb-eumyeon-doeda';

const G23_Q = {
  // ═══════════════════════════════════════════
  // grammar_blank 10
  // ═══════════════════════════════════════════

  ...blank(
    'gp_s3_u6_g23_01',
    G23,
    '신청하려면 여기에 이름과 전화번호를 쓰면 돼요.',
    '이름과 전화번호를 쓰면 돼요',
    {
      uz: 'Ariza topshirish uchun bu yerga ism va telefon raqamingizni yozsangiz bo‘ladi.',
      en: 'To apply, all you need to do is write your name and phone number here.',
      ru: 'Чтобы подать заявку, достаточно написать здесь имя и номер телефона.',
    },
  ),

  ...blank(
    'gp_s3_u6_g23_02',
    G23,
    '문이 안 열리면 이 버튼을 누르면 돼요.',
    '이 버튼을 누르면 돼요',
    {
      uz: 'Eshik ochilmasa, shu tugmani bossangiz bo‘ladi.',
      en: 'If the door does not open, just press this button.',
      ru: 'Если дверь не открывается, просто нажмите эту кнопку.',
    },
  ),

  ...blank(
    'gp_s3_u6_g23_03',
    G23,
    '모르는 단어가 있으면 사전에서 찾으면 돼요.',
    '사전에서 찾으면 돼요',
    {
      uz: 'Bilmagan so‘zingiz bo‘lsa, lug‘atdan topsangiz bo‘ladi.',
      en: 'If there is a word you do not know, just look it up in a dictionary.',
      ru: 'Если встретится незнакомое слово, достаточно посмотреть его в словаре.',
    },
  ),

  ...blank(
    'gp_s3_u6_g23_04',
    G23,
    '지하철역에서 나와서 오른쪽으로 가면 돼요.',
    '오른쪽으로 가면 돼요',
    {
      uz: 'Metrodan chiqqach, o‘ng tomonga borsangiz bo‘ladi.',
      en: 'After leaving the subway station, just go to the right.',
      ru: 'Выйдя из метро, просто идите направо.',
    },
  ),

  ...blank(
    'gp_s3_u6_g23_05',
    G23,
    '신청서는 금요일까지 제출하면 돼요.',
    '금요일까지 제출하면 돼요',
    {
      uz: 'Arizani jumagacha topshirsangiz bo‘ladi.',
      en: 'You just need to submit the application by Friday.',
      ru: 'Заявление достаточно подать до пятницы.',
    },
  ),

  ...blank(
    'gp_s3_u6_g23_06',
    G23,
    '비밀번호를 잊어버렸으면 새 비밀번호로 다시 설정하면 돼요.',
    '다시 설정하면 돼요',
    {
      uz: 'Parolni unutgan bo‘lsangiz, yangisini o‘rnatsangiz bo‘ladi.',
      en: 'If you forgot your password, just reset it with a new one.',
      ru: 'Если вы забыли пароль, просто установите новый.',
    },
  ),

  ...blank(
    'gp_s3_u6_g23_07',
    G23,
    '이 약은 식사 후에 한 알 먹으면 돼요.',
    '한 알 먹으면 돼요',
    {
      uz: 'Bu doridan ovqatdan keyin bitta tabletka ichsangiz bo‘ladi.',
      en: 'You only need to take one tablet of this medicine after a meal.',
      ru: 'Это лекарство достаточно принимать по одной таблетке после еды.',
    },
  ),

  ...blank(
    'gp_s3_u6_g23_08',
    G23,
    '표를 사려면 이 기계에서 카드로 결제하면 돼요.',
    '카드로 결제하면 돼요',
    {
      uz: 'Chipta olish uchun shu apparatda karta bilan to‘lasangiz bo‘ladi.',
      en: 'To buy a ticket, just pay by card at this machine.',
      ru: 'Чтобы купить билет, достаточно оплатить картой в этом автомате.',
    },
  ),

  ...blank(
    'gp_s3_u6_g23_09',
    G23,
    '예약을 바꾸고 싶으면 고객센터에 전화하면 돼요.',
    '고객센터에 전화하면 돼요',
    {
      uz: 'Bandlovni o‘zgartirmoqchi bo‘lsangiz, xizmat markaziga qo‘ng‘iroq qilsangiz bo‘ladi.',
      en: 'If you want to change your reservation, just call customer service.',
      ru: 'Если хотите изменить бронирование, просто позвоните в службу поддержки.',
    },
  ),

  ...blank(
    'gp_s3_u6_g23_10',
    G23,
    '다른 것은 준비하지 않아도 돼요. 신분증만 가져오면 돼요.',
    '신분증만 가져오면 돼요',
    {
      uz: 'Boshqa narsani tayyorlash shart emas. Faqat shaxsiy guvohnomangizni olib kelsangiz bo‘ladi.',
      en: 'You do not need to prepare anything else. Just bring your ID.',
      ru: 'Больше ничего готовить не нужно. Просто возьмите удостоверение личности.',
    },
  ),

  // ═══════════════════════════════════════════
  // grammar_build 10
  // ═══════════════════════════════════════════

  ...build(
    'gp_s3_u6_g23_11',
    G23,
    [
      {
        options: ['신청하려면', '신청했는데', '신청하거나'],
        correct: '신청하려면',
      },
      {
        options: ['여기에', '여기를', '여기가'],
        correct: '여기에',
      },
      {
        options: [
          '이름과 전화번호를',
          '이름과 전화번호가',
          '이름과 전화번호에',
        ],
        correct: '이름과 전화번호를',
      },
      {
        options: ['쓰면 돼요.', '쓰려고 해요.', '쓰고 나서요.'],
        correct: '쓰면 돼요.',
      },
    ],
    {
      uz: 'Ariza uchun bu yerga ism va telefon raqamingizni yozsangiz bo‘ladi.',
      en: 'To apply, just write your name and phone number here.',
      ru: 'Чтобы подать заявку, просто напишите здесь имя и телефон.',
    },
  ),

  ...build(
    'gp_s3_u6_g23_12',
    G23,
    [
      {
        options: ['문이 안 열리면', '문이 안 열렸는데', '문을 열려고'],
        correct: '문이 안 열리면',
      },
      {
        options: ['이 버튼을', '이 버튼이', '이 버튼에'],
        correct: '이 버튼을',
      },
      {
        options: ['누르면 돼요.', '누르고 싶어요.', '누른 것 같아요.'],
        correct: '누르면 돼요.',
      },
    ],
    {
      uz: 'Eshik ochilmasa, shu tugmani bossangiz bo‘ladi.',
      en: 'If the door does not open, just press this button.',
      ru: 'Если дверь не открывается, просто нажмите эту кнопку.',
    },
  ),

  ...build(
    'gp_s3_u6_g23_13',
    G23,
    [
      {
        options: [
          '모르는 단어가 있으면',
          '모르는 단어가 있는데',
          '모르는 단어보다',
        ],
        correct: '모르는 단어가 있으면',
      },
      {
        options: ['사전에서', '사전을', '사전이'],
        correct: '사전에서',
      },
      {
        options: ['찾으면 돼요.', '찾으려고 해요.', '찾은 것 같아요.'],
        correct: '찾으면 돼요.',
      },
    ],
    {
      uz: 'Bilmagan so‘z bo‘lsa, lug‘atdan topsangiz bo‘ladi.',
      en: 'If you do not know a word, just look it up in a dictionary.',
      ru: 'Если не знаете слово, просто посмотрите его в словаре.',
    },
  ),

  ...build(
    'gp_s3_u6_g23_14',
    G23,
    [
      {
        options: [
          '지하철역에서 나와서',
          '지하철역에 들어가려고',
          '지하철역보다',
        ],
        correct: '지하철역에서 나와서',
      },
      {
        options: ['오른쪽으로', '오른쪽에만', '오른쪽보다'],
        correct: '오른쪽으로',
      },
      {
        options: ['가면 돼요.', '가려고 해요.', '간 것 같아요.'],
        correct: '가면 돼요.',
      },
    ],
    {
      uz: 'Metrodan chiqqach o‘ngga borsangiz bo‘ladi.',
      en: 'After leaving the subway, just go right.',
      ru: 'Выйдя из метро, просто идите направо.',
    },
  ),

  ...build(
    'gp_s3_u6_g23_15',
    G23,
    [
      {
        options: ['신청서는', '신청서를', '신청서에'],
        correct: '신청서는',
      },
      {
        options: ['금요일까지', '금요일보다', '금요일밖에'],
        correct: '금요일까지',
      },
      {
        options: ['제출하면 돼요.', '제출하려고 해요.', '제출한 것 같아요.'],
        correct: '제출하면 돼요.',
      },
    ],
    {
      uz: 'Arizani jumagacha topshirsangiz bo‘ladi.',
      en: 'You only need to submit the application by Friday.',
      ru: 'Заявление достаточно подать до пятницы.',
    },
  ),

  ...build(
    'gp_s3_u6_g23_16',
    G23,
    [
      {
        options: [
          '비밀번호를 잊어버렸으면',
          '비밀번호를 기억했는데',
          '비밀번호보다',
        ],
        correct: '비밀번호를 잊어버렸으면',
      },
      {
        options: ['새 비밀번호로', '새 비밀번호에', '새 비밀번호보다'],
        correct: '새 비밀번호로',
      },
      {
        options: [
          '다시 설정하면 돼요.',
          '다시 설정한 적이 있어요.',
          '다시 설정하는 것 같아요.',
        ],
        correct: '다시 설정하면 돼요.',
      },
    ],
    {
      uz: 'Parolni unutgan bo‘lsangiz, yangisini o‘rnatsangiz bo‘ladi.',
      en: 'If you forgot your password, just reset it.',
      ru: 'Если забыли пароль, просто установите новый.',
    },
  ),

  ...build(
    'gp_s3_u6_g23_17',
    G23,
    [
      {
        options: ['이 약은', '이 약을', '이 약에'],
        correct: '이 약은',
      },
      {
        options: ['식사 후에', '식사보다', '식사밖에'],
        correct: '식사 후에',
      },
      {
        options: ['한 알', '한 명', '한 장'],
        correct: '한 알',
      },
      {
        options: ['먹으면 돼요.', '먹으려고 해요.', '먹은 것 같아요.'],
        correct: '먹으면 돼요.',
      },
    ],
    {
      uz: 'Bu doridan ovqatdan keyin bitta ichsangiz bo‘ladi.',
      en: 'Just take one tablet after a meal.',
      ru: 'Достаточно принять одну таблетку после еды.',
    },
  ),

  ...build(
    'gp_s3_u6_g23_18',
    G23,
    [
      {
        options: ['표를 사려면', '표를 샀는데', '표를 사거나'],
        correct: '표를 사려면',
      },
      {
        options: ['이 기계에서', '이 기계를', '이 기계가'],
        correct: '이 기계에서',
      },
      {
        options: ['카드로', '카드에', '카드보다'],
        correct: '카드로',
      },
      {
        options: ['결제하면 돼요.', '결제하려고 해요.', '결제한 것 같아요.'],
        correct: '결제하면 돼요.',
      },
    ],
    {
      uz: 'Chipta uchun shu apparatda karta bilan to‘lasangiz bo‘ladi.',
      en: 'To buy a ticket, just pay by card at this machine.',
      ru: 'Чтобы купить билет, просто оплатите картой в автомате.',
    },
  ),

  ...build(
    'gp_s3_u6_g23_19',
    G23,
    [
      {
        options: ['예약을 바꾸고 싶으면', '예약을 바꿨는데', '예약보다'],
        correct: '예약을 바꾸고 싶으면',
      },
      {
        options: ['고객센터에', '고객센터를', '고객센터가'],
        correct: '고객센터에',
      },
      {
        options: [
          '전화하면 돼요.',
          '전화한 적이 있어요.',
          '전화하는 것 같아요.',
        ],
        correct: '전화하면 돼요.',
      },
    ],
    {
      uz: 'Bandlovni o‘zgartirmoqchi bo‘lsangiz, xizmat markaziga qo‘ng‘iroq qiling.',
      en: 'If you want to change your reservation, just call customer service.',
      ru: 'Если хотите изменить бронь, просто позвоните в службу поддержки.',
    },
  ),

  ...build(
    'gp_s3_u6_g23_20',
    G23,
    [
      {
        options: ['다른 것은', '다른 것을', '다른 것에'],
        correct: '다른 것은',
      },
      {
        options: [
          '준비하지 않아도 돼요.',
          '준비하려고 해요.',
          '준비한 것 같아요.',
        ],
        correct: '준비하지 않아도 돼요.',
      },
      {
        options: ['신분증만', '신분증보다', '신분증까지는'],
        correct: '신분증만',
      },
      {
        options: ['가져오면 돼요.', '가져오려고 해요.', '가져온 것 같아요.'],
        correct: '가져오면 돼요.',
      },
    ],
    {
      uz: 'Boshqa narsa kerak emas. Faqat shaxsiy guvohnomangizni olib keling.',
      en: 'You do not need anything else. Just bring your ID.',
      ru: 'Больше ничего не нужно. Просто возьмите удостоверение личности.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 24. V-(으)ㄴ 것 같다
//
// 이미 일어난 행동이나 완료된 상황을
// 직접 확신하지 않고 정황을 바탕으로 추측
//
// 받침 O → V-은 것 같다
// 받침 X → V-ㄴ 것 같다
// ㄹ 받침 → ㄹ 탈락 + V-ㄴ 것 같다
//
// G13 V-는 것 같다 = 현재 행동 추측
// G24 V-(으)ㄴ 것 같다 = 완료된 행동 추측
// ─────────────────────────────────────────────
const G24 = 'verb-eun-geot-gatda';

const G24_Q = {
  // ═══════════════════════════════════════════
  // grammar_blank 10
  // ═══════════════════════════════════════════

  ...blank(
    'gp_s3_u6_g24_01',
    G24,
    '민수 씨 자리에 가방이 없어요. 벌써 집에 간 것 같아요.',
    '집에 간 것 같아요',
    {
      uz: 'Minsuning joyida sumkasi yo‘q. U allaqachon uyiga ketganga o‘xshaydi.',
      en: 'Minsu’s bag is gone. It looks like he already went home.',
      ru: 'Сумки Минсу нет на месте. Похоже, он уже ушёл домой.',
    },
  ),

  ...blank(
    'gp_s3_u6_g24_02',
    G24,
    '길이 젖어 있어요. 조금 전에 비가 온 것 같아요.',
    '비가 온 것 같아요',
    {
      uz: 'Yo‘l ho‘l. Sal oldin yomg‘ir yog‘ganga o‘xshaydi.',
      en: 'The road is wet. It looks like it rained a little while ago.',
      ru: 'Дорога мокрая. Похоже, недавно шёл дождь.',
    },
  ),

  ...blank(
    'gp_s3_u6_g24_03',
    G24,
    '냉장고에 있던 케이크가 없어졌어요. 누가 먹은 것 같아요.',
    '누가 먹은 것 같아요',
    {
      uz: 'Muzlatkichdagi tort yo‘qolibdi. Kimdir yeganga o‘xshaydi.',
      en: 'The cake in the refrigerator is gone. It seems someone ate it.',
      ru: 'Торт из холодильника исчез. Похоже, кто-то его съел.',
    },
  ),

  ...blank(
    'gp_s3_u6_g24_04',
    G24,
    '지수 씨 얼굴이 빨갛고 숨이 차 보여요. 방금 많이 뛴 것 같아요.',
    '많이 뛴 것 같아요',
    {
      uz: 'Jisuning yuzi qizarib, nafasi qisilyapti. Hozirgina ko‘p yugurganga o‘xshaydi.',
      en: 'Jisu is red-faced and out of breath. It looks like she just ran a lot.',
      ru: 'Чису покраснела и тяжело дышит. Похоже, она только что много бегала.',
    },
  ),

  ...blank(
    'gp_s3_u6_g24_05',
    G24,
    '사무실 문이 잠겨 있어요. 직원들이 모두 퇴근한 것 같아요.',
    '모두 퇴근한 것 같아요',
    {
      uz: 'Ofis eshigi qulflangan. Xodimlar hammasi uyga ketganga o‘xshaydi.',
      en: 'The office door is locked. It seems all the employees have gone home.',
      ru: 'Дверь офиса заперта. Похоже, все сотрудники уже ушли.',
    },
  ),

  ...blank(
    'gp_s3_u6_g24_06',
    G24,
    '사진에 한라산이 보여요. 제주도에 간 것 같아요.',
    '제주도에 간 것 같아요',
    {
      uz: 'Suratda Hallasan ko‘rinadi. Jejuga borganga o‘xshaydi.',
      en: 'Hallasan is visible in the photo. It looks like they went to Jeju.',
      ru: 'На фотографии виден Халласан. Похоже, они были на Чеджудо.',
    },
  ),

  ...blank(
    'gp_s3_u6_g24_07',
    G24,
    '봉투가 이미 열려 있어요. 누군가 편지를 읽은 것 같아요.',
    '편지를 읽은 것 같아요',
    {
      uz: 'Konvert allaqachon ochilgan. Kimdir xatni o‘qiganga o‘xshaydi.',
      en: 'The envelope is already open. It seems someone read the letter.',
      ru: 'Конверт уже открыт. Похоже, кто-то прочитал письмо.',
    },
  ),

  ...blank(
    'gp_s3_u6_g24_08',
    G24,
    '방이 아침보다 훨씬 깨끗해졌어요. 동생이 청소한 것 같아요.',
    '동생이 청소한 것 같아요',
    {
      uz: 'Xona ertalabgidan ancha toza. Ukam tozalaganga o‘xshaydi.',
      en: 'The room is much cleaner than this morning. It seems my sibling cleaned it.',
      ru: 'Комната намного чище, чем утром. Похоже, её убрал младший брат.',
    },
  ),

  ...blank(
    'gp_s3_u6_g24_09',
    G24,
    '컴퓨터가 켜져 있고 문서도 열려 있어요. 누가 사용한 것 같아요.',
    '누가 사용한 것 같아요',
    {
      uz: 'Kompyuter yoqilgan va hujjat ham ochiq. Kimdir ishlatganga o‘xshaydi.',
      en: 'The computer is on and a document is open. It seems someone used it.',
      ru: 'Компьютер включён, и документ открыт. Похоже, кто-то им пользовался.',
    },
  ),

  ...blank(
    'gp_s3_u6_g24_10',
    G24,
    '포장 모양이 조금 서툴러요. 친구가 직접 만든 것 같아요.',
    '친구가 직접 만든 것 같아요',
    {
      uz: 'Qadoqlanishi biroz havaskorona. Do‘stim o‘zi tayyorlaganga o‘xshaydi.',
      en: 'The wrapping looks a little clumsy. It seems my friend made it personally.',
      ru: 'Упаковка немного неумелая. Похоже, друг сделал её сам.',
    },
  ),

  // ═══════════════════════════════════════════
  // grammar_build 10
  // ═══════════════════════════════════════════

  ...build(
    'gp_s3_u6_g24_11',
    G24,
    [
      {
        options: ['민수 씨 자리에', '민수 씨 자리를', '민수 씨 자리가를'],
        correct: '민수 씨 자리에',
      },
      {
        options: ['가방이 없어요.', '가방을 먹어요.', '가방에 입어요.'],
        correct: '가방이 없어요.',
      },
      {
        options: ['벌써 집에 간', '지금 집에 가는', '내일 집에 갈'],
        correct: '벌써 집에 간',
        hints: {
          '지금 집에 가는':
            '현재 진행 중인 행동을 직접 보고 추측하는 상황이 아니에요.',
          '내일 집에 갈':
            '미래 행동 추측이 아니라 이미 떠난 흔적을 보고 판단해요.',
        },
      },
      {
        options: ['것 같아요.', '줄 알아요.', '동안이에요.'],
        correct: '것 같아요.',
      },
    ],
    {
      uz: 'Minsuning sumkasi yo‘q. U allaqachon uyiga ketganga o‘xshaydi.',
      en: 'Minsu’s bag is gone. It looks like he already went home.',
      ru: 'Сумки Минсу нет. Похоже, он уже ушёл домой.',
    },
  ),

  ...build(
    'gp_s3_u6_g24_12',
    G24,
    [
      {
        options: ['길이', '길을', '길에'],
        correct: '길이',
      },
      {
        options: ['젖어 있어요.', '마르고 있어요.', '깨끗하게 닫혔어요.'],
        correct: '젖어 있어요.',
      },
      {
        options: ['조금 전에 비가 온', '지금 비가 오는', '내일 비가 올'],
        correct: '조금 전에 비가 온',
      },
      {
        options: ['것 같아요.', '줄 알아요.', '적이 없어요.'],
        correct: '것 같아요.',
      },
    ],
    {
      uz: 'Yo‘l ho‘l. Sal oldin yomg‘ir yog‘ganga o‘xshaydi.',
      en: 'The road is wet. It looks like it rained recently.',
      ru: 'Дорога мокрая. Похоже, недавно шёл дождь.',
    },
  ),

  ...build(
    'gp_s3_u6_g24_13',
    G24,
    [
      {
        options: [
          '냉장고에 있던 케이크가',
          '냉장고에 있던 케이크를',
          '냉장고에 있던 케이크에',
        ],
        correct: '냉장고에 있던 케이크가',
      },
      {
        options: ['없어졌어요.', '더 커졌어요.', '새로 생겼어요.'],
        correct: '없어졌어요.',
      },
      {
        options: ['누가 먹은', '누가 먹는', '누가 먹을'],
        correct: '누가 먹은',
      },
      {
        options: ['것 같아요.', '줄 몰라요.', '동안이에요.'],
        correct: '것 같아요.',
      },
    ],
    {
      uz: 'Tort yo‘qolibdi. Kimdir yeganga o‘xshaydi.',
      en: 'The cake is gone. It seems someone ate it.',
      ru: 'Торт исчез. Похоже, кто-то его съел.',
    },
  ),

  ...build(
    'gp_s3_u6_g24_14',
    G24,
    [
      {
        options: ['지수 씨가', '지수 씨를', '지수 씨에게'],
        correct: '지수 씨가',
      },
      {
        options: ['숨이 차 보여요.', '졸려 보여요.', '조용히 앉아 있어요.'],
        correct: '숨이 차 보여요.',
      },
      {
        options: ['방금 많이 뛴', '지금 많이 뛰는', '내일 많이 뛸'],
        correct: '방금 많이 뛴',
      },
      {
        options: ['것 같아요.', '적이 있어요.', '줄 알아요.'],
        correct: '것 같아요.',
      },
    ],
    {
      uz: 'Jisuning nafasi qisilyapti. Hozirgina ko‘p yugurganga o‘xshaydi.',
      en: 'Jisu is out of breath. It looks like she just ran a lot.',
      ru: 'Чису тяжело дышит. Похоже, она только что много бегала.',
    },
  ),

  ...build(
    'gp_s3_u6_g24_15',
    G24,
    [
      {
        options: ['사무실 문이', '사무실 문을', '사무실 문에'],
        correct: '사무실 문이',
      },
      {
        options: ['잠겨 있어요.', '활짝 열려 있어요.', '새로 칠해져 있어요.'],
        correct: '잠겨 있어요.',
      },
      {
        options: [
          '직원들이 모두 퇴근한',
          '직원들이 지금 퇴근하는',
          '직원들이 내일 퇴근할',
        ],
        correct: '직원들이 모두 퇴근한',
      },
      {
        options: ['것 같아요.', '동안이에요.', '줄 알아요.'],
        correct: '것 같아요.',
      },
    ],
    {
      uz: 'Ofis qulflangan. Xodimlar hammasi ketganga o‘xshaydi.',
      en: 'The office is locked. It seems all the employees have left.',
      ru: 'Офис заперт. Похоже, все сотрудники ушли.',
    },
  ),

  ...build(
    'gp_s3_u6_g24_16',
    G24,
    [
      {
        options: ['사진에', '사진을', '사진이'],
        correct: '사진에',
      },
      {
        options: ['한라산이 보여요.', '한라산을 먹어요.', '한라산에 입어요.'],
        correct: '한라산이 보여요.',
      },
      {
        options: ['제주도에 간', '제주도에 가는', '제주도에 갈'],
        correct: '제주도에 간',
      },
      {
        options: ['것 같아요.', '적이 없어요.', '줄 몰라요.'],
        correct: '것 같아요.',
      },
    ],
    {
      uz: 'Suratda Hallasan bor. Jejuga borganga o‘xshaydi.',
      en: 'Hallasan is in the photo. It seems they went to Jeju.',
      ru: 'На фотографии Халласан. Похоже, они ездили на Чеджудо.',
    },
  ),

  ...build(
    'gp_s3_u6_g24_17',
    G24,
    [
      {
        options: ['봉투가', '봉투를', '봉투에'],
        correct: '봉투가',
      },
      {
        options: ['이미 열려 있어요.', '아직 봉해져 있어요.', '새것이에요.'],
        correct: '이미 열려 있어요.',
      },
      {
        options: [
          '누군가 편지를 읽은',
          '누군가 편지를 읽는',
          '누군가 편지를 읽을',
        ],
        correct: '누군가 편지를 읽은',
      },
      {
        options: ['것 같아요.', '줄 알아요.', '동안이에요.'],
        correct: '것 같아요.',
      },
    ],
    {
      uz: 'Konvert ochilgan. Kimdir xatni o‘qiganga o‘xshaydi.',
      en: 'The envelope is open. It seems someone read the letter.',
      ru: 'Конверт открыт. Похоже, кто-то прочитал письмо.',
    },
  ),

  ...build(
    'gp_s3_u6_g24_18',
    G24,
    [
      {
        options: ['방이', '방을', '방에'],
        correct: '방이',
      },
      {
        options: [
          '아침보다 훨씬 깨끗해졌어요.',
          '아침보다 더 더러워요.',
          '아침과 똑같아요.',
        ],
        correct: '아침보다 훨씬 깨끗해졌어요.',
      },
      {
        options: ['동생이 청소한', '동생이 청소하는', '동생이 청소할'],
        correct: '동생이 청소한',
      },
      {
        options: ['것 같아요.', '적이 없어요.', '줄 알아요.'],
        correct: '것 같아요.',
      },
    ],
    {
      uz: 'Xona ancha toza. Ukam tozalaganga o‘xshaydi.',
      en: 'The room is much cleaner. It seems my sibling cleaned it.',
      ru: 'Комната стала намного чище. Похоже, её убрал младший брат.',
    },
  ),

  ...build(
    'gp_s3_u6_g24_19',
    G24,
    [
      {
        options: ['컴퓨터가', '컴퓨터를', '컴퓨터에'],
        correct: '컴퓨터가',
      },
      {
        options: [
          '켜져 있고 문서도 열려 있어요.',
          '꺼져 있고 아무것도 없어요.',
          '새 상자 안에 있어요.',
        ],
        correct: '켜져 있고 문서도 열려 있어요.',
      },
      {
        options: ['누가 사용한', '누가 사용하는', '누가 사용할'],
        correct: '누가 사용한',
      },
      {
        options: ['것 같아요.', '줄 몰라요.', '동안이에요.'],
        correct: '것 같아요.',
      },
    ],
    {
      uz: 'Kompyuter yoqilgan. Kimdir ishlatganga o‘xshaydi.',
      en: 'The computer is on. It seems someone used it.',
      ru: 'Компьютер включён. Похоже, кто-то им пользовался.',
    },
  ),

  ...build(
    'gp_s3_u6_g24_20',
    G24,
    [
      {
        options: ['포장 모양이', '포장 모양을', '포장 모양에'],
        correct: '포장 모양이',
      },
      {
        options: [
          '조금 서툴러요.',
          '아주 전문적이에요.',
          '공장에서 똑같이 나왔어요.',
        ],
        correct: '조금 서툴러요.',
      },
      {
        options: ['친구가 직접 만든', '친구가 직접 만드는', '친구가 직접 만들'],
        correct: '친구가 직접 만든',
        hints: {
          '친구가 직접 만드는':
            '현재 만들고 있는 모습을 보는 것이 아니라 완성된 결과를 보고 추측해요.',
          '친구가 직접 만들': '앞으로 만들 물건을 추측하는 것이 아니에요.',
        },
      },
      {
        options: ['것 같아요.', '줄 알아요.', '동안이에요.'],
        correct: '것 같아요.',
      },
    ],
    {
      uz: 'Qadoqlanishi biroz havaskorona. Do‘stim o‘zi qilganga o‘xshaydi.',
      en: 'The wrapping looks a little clumsy. It seems my friend made it personally.',
      ru: 'Упаковка немного неумелая. Похоже, друг сделал её сам.',
    },
  ),
};

// ═══════════════════════════════════════════════════════════
// UNIT 7
// 미래 추측 · 간접 의문 · 조건 · 행동 전환
// ═══════════════════════════════════════════════════════════

// ─────────────────────────────────────────────
// 문법 25. A/V-(으)ㄹ 것 같다
//
// 받침 O → -을 것 같다
// 받침 X / ㄹ 받침 → -ㄹ 것 같다
//
// 아직 일어나지 않은 일이나 앞으로의 상태를
// 현재 정보·상황을 바탕으로 조심스럽게 추측
// ─────────────────────────────────────────────
const G25 = 'av-eul-geot-gatda';

const G25_Q = {
  // ═══════════════════════════════════════════
  // grammar_blank 10
  // ═══════════════════════════════════════════

  ...blank(
    'gp_s3_u7_g25_01',
    G25,
    '하늘에 먹구름이 많아요. 곧 비가 올 것 같아요.',
    '비가 올 것 같아요',
    {
      uz: 'Osmonda qora bulutlar ko‘p. Tez orada yomg‘ir yog‘adiganga o‘xshaydi.',
      en: 'There are many dark clouds. It looks like it is going to rain soon.',
      ru: 'На небе много тёмных облаков. Похоже, скоро пойдёт дождь.',
    },
  ),

  ...blank(
    'gp_s3_u7_g25_02',
    G25,
    '퇴근 시간이니까 길이 많이 막힐 것 같아요.',
    '길이 많이 막힐 것 같아요',
    {
      uz: 'Ishdan qaytish vaqti, shuning uchun yo‘llar tirband bo‘lsa kerak.',
      en: 'It is rush hour, so I think the roads will be very congested.',
      ru: 'Сейчас час пик, поэтому, похоже, на дорогах будут сильные пробки.',
    },
  ),

  ...blank(
    'gp_s3_u7_g25_03',
    G25,
    '선생님이 어렵다고 했어요. 이번 시험은 어려울 것 같아요.',
    '이번 시험은 어려울 것 같아요',
    {
      uz: 'O‘qituvchi qiyin bo‘lishini aytdi. Bu imtihon qiyin bo‘lsa kerak.',
      en: 'The teacher said it would be difficult. I think this exam will be hard.',
      ru: 'Преподаватель сказал, что будет сложно. Думаю, этот экзамен будет трудным.',
    },
  ),

  ...blank(
    'gp_s3_u7_g25_04',
    G25,
    '이 신발은 제 발보다 작아 보여요. 조금 작을 것 같아요.',
    '조금 작을 것 같아요',
    {
      uz: 'Bu oyoq kiyim oyog‘imdan kichik ko‘rinadi. Biroz kichik bo‘lsa kerak.',
      en: 'These shoes look smaller than my feet. I think they will be a little small.',
      ru: 'Эта обувь выглядит маловатой. Думаю, она будет немного мала.',
    },
  ),

  ...blank(
    'gp_s3_u7_g25_05',
    G25,
    '민수 씨가 아직 회사에 있어요. 약속에 조금 늦을 것 같아요.',
    '조금 늦을 것 같아요',
    {
      uz: 'Minsu hali ishxonada. Uchrashuvga biroz kechiksa kerak.',
      en: 'Minsu is still at work. I think he will be a little late.',
      ru: 'Минсу ещё на работе. Думаю, он немного опоздает.',
    },
  ),

  ...blank(
    'gp_s3_u7_g25_06',
    G25,
    '오늘은 축제 첫날이라서 손님이 많을 것 같아요.',
    '손님이 많을 것 같아요',
    {
      uz: 'Bugun festivalning birinchi kuni, shuning uchun mehmonlar ko‘p bo‘lsa kerak.',
      en: 'It is the first day of the festival, so I think there will be many visitors.',
      ru: 'Сегодня первый день фестиваля, поэтому, думаю, посетителей будет много.',
    },
  ),

  ...blank(
    'gp_s3_u7_g25_07',
    G25,
    '일기예보를 보니까 주말에는 날씨가 좋을 것 같아요.',
    '날씨가 좋을 것 같아요',
    {
      uz: 'Ob-havo prognoziga qaraganda dam olish kunlari havo yaxshi bo‘lsa kerak.',
      en: 'According to the forecast, I think the weather will be nice this weekend.',
      ru: 'Судя по прогнозу, на выходных погода будет хорошей.',
    },
  ),

  ...blank(
    'gp_s3_u7_g25_08',
    G25,
    '고추가 많이 들어갔어요. 이 음식은 꽤 매울 것 같아요.',
    '꽤 매울 것 같아요',
    {
      uz: 'Ichiga ko‘p qalampir solingan. Bu taom ancha achchiq bo‘lsa kerak.',
      en: 'There is a lot of chili in it. This food will probably be quite spicy.',
      ru: 'Здесь много перца. Похоже, блюдо будет довольно острым.',
    },
  ),

  ...blank(
    'gp_s3_u7_g25_09',
    G25,
    '내일 회의가 세 개나 있어서 하루 종일 바쁠 것 같아요.',
    '하루 종일 바쁠 것 같아요',
    {
      uz: 'Ertaga uchta yig‘ilish bor, shuning uchun kun bo‘yi band bo‘lsam kerak.',
      en: 'I have three meetings tomorrow, so I think I will be busy all day.',
      ru: 'Завтра у меня три совещания, поэтому, похоже, весь день буду занят.',
    },
  ),

  ...blank(
    'gp_s3_u7_g25_10',
    G25,
    '해야 할 일이 아직 많이 남았어요. 오늘 안에 다 끝내기 힘들 것 같아요.',
    '다 끝내기 힘들 것 같아요',
    {
      uz: 'Hali qiladigan ishlarim ko‘p. Bugun hammasini tugatish qiyin bo‘lsa kerak.',
      en: 'I still have a lot to do. I do not think I will be able to finish everything today.',
      ru: 'У меня ещё много дел. Похоже, сегодня закончить всё будет трудно.',
    },
  ),

  // ═══════════════════════════════════════════
  // grammar_build 10
  // ═══════════════════════════════════════════

  ...build(
    'gp_s3_u7_g25_11',
    G25,
    [
      {
        options: ['하늘에', '하늘을', '하늘이'],
        correct: '하늘에',
      },
      {
        options: [
          '먹구름이 많아요.',
          '해가 아주 밝아요.',
          '구름이 하나도 없어요.',
        ],
        correct: '먹구름이 많아요.',
      },
      {
        options: ['곧 비가 올', '지금 비가 오는', '어제 비가 온'],
        correct: '곧 비가 올',
        hints: {
          '지금 비가 오는':
            '아직 비가 오고 있는 것이 아니라 앞으로 올 가능성을 추측해요.',
          '어제 비가 온': '과거에 이미 일어난 일을 추측하는 상황이 아니에요.',
        },
      },
      {
        options: ['것 같아요.', '적이 있어요.', '줄 알아요.'],
        correct: '것 같아요.',
      },
    ],
    {
      uz: 'Qora bulutlar ko‘p. Tez orada yomg‘ir yog‘adiganga o‘xshaydi.',
      en: 'There are dark clouds. It looks like it will rain soon.',
      ru: 'Много тёмных облаков. Похоже, скоро пойдёт дождь.',
    },
  ),

  ...build(
    'gp_s3_u7_g25_12',
    G25,
    [
      {
        options: ['퇴근 시간이니까', '새벽 시간이니까', '휴일이 끝났는데'],
        correct: '퇴근 시간이니까',
      },
      {
        options: ['길이', '길을', '길에'],
        correct: '길이',
      },
      {
        options: ['많이 막힐', '많이 막히는', '많이 막힌'],
        correct: '많이 막힐',
      },
      {
        options: ['것 같아요.', '적이 있어요.', '줄 몰라요.'],
        correct: '것 같아요.',
      },
    ],
    {
      uz: 'Ishdan qaytish vaqti, yo‘llar tirband bo‘lsa kerak.',
      en: 'It is rush hour, so the roads will probably be congested.',
      ru: 'Сейчас час пик, поэтому на дорогах, вероятно, будут пробки.',
    },
  ),

  ...build(
    'gp_s3_u7_g25_13',
    G25,
    [
      {
        options: ['선생님이', '선생님을', '선생님에게'],
        correct: '선생님이',
      },
      {
        options: [
          '시험이 어렵다고 했어요.',
          '시험을 끝냈다고 했어요.',
          '시험이 없다고 했어요.',
        ],
        correct: '시험이 어렵다고 했어요.',
      },
      {
        options: ['이번 시험은', '지난 시험은', '어제 시험은'],
        correct: '이번 시험은',
      },
      {
        options: [
          '어려울 것 같아요.',
          '어려운 것 같아요.',
          '어려웠던 것 같아요.',
        ],
        correct: '어려울 것 같아요.',
      },
    ],
    {
      uz: 'O‘qituvchi qiyin dedi. Bu imtihon qiyin bo‘lsa kerak.',
      en: 'The teacher said it would be difficult. This exam will probably be hard.',
      ru: 'Преподаватель сказал, что будет сложно. Думаю, экзамен будет трудным.',
    },
  ),

  ...build(
    'gp_s3_u7_g25_14',
    G25,
    [
      {
        options: ['이 신발은', '이 신발을', '이 신발에'],
        correct: '이 신발은',
      },
      {
        options: ['제 발보다', '제 발까지', '제 발밖에'],
        correct: '제 발보다',
      },
      {
        options: ['작아 보여요.', '커 보여요.', '편해 보여요.'],
        correct: '작아 보여요.',
      },
      {
        options: [
          '조금 작을 것 같아요.',
          '조금 작은 것 같았어요.',
          '조금 작았던 것 같아요.',
        ],
        correct: '조금 작을 것 같아요.',
      },
    ],
    {
      uz: 'Oyoq kiyim kichik ko‘rinadi. Biroz kichik bo‘lsa kerak.',
      en: 'The shoes look small. I think they will be a little small.',
      ru: 'Обувь выглядит маленькой. Думаю, она будет маловата.',
    },
  ),

  ...build(
    'gp_s3_u7_g25_15',
    G25,
    [
      {
        options: ['민수 씨가', '민수 씨를', '민수 씨에게'],
        correct: '민수 씨가',
      },
      {
        options: [
          '아직 회사에 있어요.',
          '벌써 약속 장소에 있어요.',
          '오늘 쉬고 있어요.',
        ],
        correct: '아직 회사에 있어요.',
      },
      {
        options: ['약속에', '약속을', '약속이'],
        correct: '약속에',
      },
      {
        options: [
          '조금 늦을 것 같아요.',
          '조금 늦는 것 같아요.',
          '조금 늦은 것 같아요.',
        ],
        correct: '조금 늦을 것 같아요.',
      },
    ],
    {
      uz: 'Minsu hali ishxonada. U biroz kechiksa kerak.',
      en: 'Minsu is still at work. He will probably be a little late.',
      ru: 'Минсу ещё на работе. Он, вероятно, немного опоздает.',
    },
  ),

  ...build(
    'gp_s3_u7_g25_16',
    G25,
    [
      {
        options: ['오늘은', '어제는', '지난달에는'],
        correct: '오늘은',
      },
      {
        options: ['축제 첫날이라서', '축제가 끝나서', '축제가 없어서'],
        correct: '축제 첫날이라서',
      },
      {
        options: ['손님이', '손님을', '손님에게'],
        correct: '손님이',
      },
      {
        options: ['많을 것 같아요.', '많은 것 같았어요.', '많았던 것 같아요.'],
        correct: '많을 것 같아요.',
      },
    ],
    {
      uz: 'Festivalning birinchi kuni, odam ko‘p bo‘lsa kerak.',
      en: 'It is the first day of the festival, so there will probably be many visitors.',
      ru: 'Сегодня первый день фестиваля, поэтому посетителей, вероятно, будет много.',
    },
  ),

  ...build(
    'gp_s3_u7_g25_17',
    G25,
    [
      {
        options: ['일기예보를 보니까', '어제 사진을 보니까', '작년 여행에서'],
        correct: '일기예보를 보니까',
      },
      {
        options: ['주말에는', '지난 주말에는', '어제는'],
        correct: '주말에는',
      },
      {
        options: ['날씨가', '날씨를', '날씨에'],
        correct: '날씨가',
      },
      {
        options: ['좋을 것 같아요.', '좋은 것 같아요.', '좋았던 것 같아요.'],
        correct: '좋을 것 같아요.',
      },
    ],
    {
      uz: 'Prognozga qaraganda dam olish kunlari havo yaxshi bo‘ladi.',
      en: 'According to the forecast, the weather should be nice this weekend.',
      ru: 'Судя по прогнозу, на выходных погода будет хорошей.',
    },
  ),

  ...build(
    'gp_s3_u7_g25_18',
    G25,
    [
      {
        options: ['고추가', '고추를', '고추에'],
        correct: '고추가',
      },
      {
        options: [
          '많이 들어갔어요.',
          '하나도 안 들어갔어요.',
          '모두 빠졌어요.',
        ],
        correct: '많이 들어갔어요.',
      },
      {
        options: ['이 음식은', '이 음식을', '이 음식에'],
        correct: '이 음식은',
      },
      {
        options: [
          '꽤 매울 것 같아요.',
          '꽤 매운 것 같았어요.',
          '꽤 매웠던 것 같아요.',
        ],
        correct: '꽤 매울 것 같아요.',
      },
    ],
    {
      uz: 'Qalampir ko‘p solingan. Taom ancha achchiq bo‘lsa kerak.',
      en: 'There is a lot of chili. The food will probably be quite spicy.',
      ru: 'Здесь много перца. Блюдо, вероятно, будет довольно острым.',
    },
  ),

  ...build(
    'gp_s3_u7_g25_19',
    G25,
    [
      {
        options: ['내일', '어제', '지난주'],
        correct: '내일',
      },
      {
        options: [
          '회의가 세 개나 있어서',
          '회의가 모두 끝나서',
          '회의가 취소돼서',
        ],
        correct: '회의가 세 개나 있어서',
      },
      {
        options: ['하루 종일', '작년에', '아까'],
        correct: '하루 종일',
      },
      {
        options: ['바쁠 것 같아요.', '바쁜 것 같았어요.', '바빴던 것 같아요.'],
        correct: '바쁠 것 같아요.',
      },
    ],
    {
      uz: 'Ertaga uchta yig‘ilish bor. Kun bo‘yi band bo‘lsam kerak.',
      en: 'I have three meetings tomorrow. I will probably be busy all day.',
      ru: 'Завтра три совещания. Наверное, я буду занят весь день.',
    },
  ),

  ...build(
    'gp_s3_u7_g25_20',
    G25,
    [
      {
        options: ['해야 할 일이', '끝낸 일이', '취소된 일이'],
        correct: '해야 할 일이',
      },
      {
        options: [
          '아직 많이 남았어요.',
          '벌써 모두 끝났어요.',
          '하나도 없어요.',
        ],
        correct: '아직 많이 남았어요.',
      },
      {
        options: ['오늘 안에', '어제까지', '지난달에'],
        correct: '오늘 안에',
      },
      {
        options: [
          '다 끝내기 힘들 것 같아요.',
          '다 끝낸 것 같아요.',
          '다 끝내는 것 같아요.',
        ],
        correct: '다 끝내기 힘들 것 같아요.',
      },
    ],
    {
      uz: 'Hali ishlarim ko‘p. Bugun hammasini tugatish qiyin bo‘lsa kerak.',
      en: 'I still have a lot to do. It seems difficult to finish everything today.',
      ru: 'Дел ещё много. Похоже, сегодня закончить всё будет трудно.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 26. V-는지 알다[모르다], N인지 알다[모르다]
//
// 동사 → V-는지 알다/모르다
// 명사 → N인지 알다/모르다
//
// 질문 내용을 하나의 문장 안에 넣어
// "~하는지 아세요?", "~인지 모르겠어요"처럼 표현
// ─────────────────────────────────────────────
const G26 = 'vn-ji-alda-moreuda';

const G26_Q = {
  // ═══════════════════════════════════════════
  // grammar_blank 10
  // ═══════════════════════════════════════════

  ...blank(
    'gp_s3_u7_g26_01',
    G26,
    '한옥마을이 어디에 있는지 아세요?',
    '어디에 있는지 아세요',
    {
      uz: 'Hanok qishlog‘i qayerda ekanini bilasizmi?',
      en: 'Do you know where the hanok village is?',
      ru: 'Вы знаете, где находится деревня ханоков?',
    },
  ),

  ...blank(
    'gp_s3_u7_g26_02',
    G26,
    '이 버스가 몇 시에 출발하는지 알아요?',
    '몇 시에 출발하는지 알아요',
    {
      uz: 'Bu avtobus soat nechada jo‘nashini bilasizmi?',
      en: 'Do you know what time this bus leaves?',
      ru: 'Вы знаете, во сколько отправляется этот автобус?',
    },
  ),

  ...blank(
    'gp_s3_u7_g26_03',
    G26,
    '표를 어디에서 사는지 모르겠어요.',
    '어디에서 사는지 모르겠어요',
    {
      uz: 'Chiptani qayerdan sotib olishni bilmayman.',
      en: 'I do not know where to buy the ticket.',
      ru: 'Я не знаю, где купить билет.',
    },
  ),

  ...blank(
    'gp_s3_u7_g26_04',
    G26,
    '저 사람이 이 학교 학생인지 알아요?',
    '이 학교 학생인지 알아요',
    {
      uz: 'U odam shu maktab talabasi ekanini bilasizmi?',
      en: 'Do you know whether that person is a student at this school?',
      ru: 'Вы знаете, является ли тот человек студентом этой школы?',
    },
  ),

  ...blank(
    'gp_s3_u7_g26_05',
    G26,
    '회의실이 몇 층인지 모르겠어요.',
    '몇 층인지 모르겠어요',
    {
      uz: 'Yig‘ilish xonasi nechanchi qavatda ekanini bilmayman.',
      en: 'I do not know what floor the meeting room is on.',
      ru: 'Я не знаю, на каком этаже находится переговорная.',
    },
  ),

  ...blank(
    'gp_s3_u7_g26_06',
    G26,
    '민수 씨가 왜 전화를 안 받는지 모르겠어요.',
    '왜 전화를 안 받는지 모르겠어요',
    {
      uz: 'Minsu nima uchun telefonni ko‘tarmayotganini bilmayman.',
      en: 'I do not know why Minsu is not answering the phone.',
      ru: 'Я не знаю, почему Минсу не отвечает на телефон.',
    },
  ),

  ...blank(
    'gp_s3_u7_g26_07',
    G26,
    '이 기계를 어떻게 사용하는지 아세요?',
    '어떻게 사용하는지 아세요',
    {
      uz: 'Bu qurilmani qanday ishlatishni bilasizmi?',
      en: 'Do you know how to use this machine?',
      ru: 'Вы знаете, как пользоваться этим устройством?',
    },
  ),

  ...blank(
    'gp_s3_u7_g26_08',
    G26,
    '오늘 상담을 누가 담당하는지 알아요?',
    '누가 담당하는지 알아요',
    {
      uz: 'Bugungi maslahatni kim olib borishini bilasizmi?',
      en: 'Do you know who is in charge of today’s consultation?',
      ru: 'Вы знаете, кто сегодня отвечает за консультацию?',
    },
  ),

  ...blank(
    'gp_s3_u7_g26_09',
    G26,
    '저 건물이 박물관인지 도서관인지 잘 모르겠어요.',
    '박물관인지 도서관인지 잘 모르겠어요',
    {
      uz: 'U bino muzeymi yoki kutubxonami, aniq bilmayman.',
      en: 'I am not sure whether that building is a museum or a library.',
      ru: 'Я не уверен, то здание — музей или библиотека.',
    },
  ),

  ...blank(
    'gp_s3_u7_g26_10',
    G26,
    '한국어 수업이 몇 시인지 확인해 주세요.',
    '몇 시인지 확인해 주세요',
    {
      uz: 'Koreys tili darsi soat nechada ekanini tekshirib bering.',
      en: 'Please check what time the Korean class is.',
      ru: 'Пожалуйста, проверьте, во сколько занятие по корейскому.',
    },
  ),

  // ═══════════════════════════════════════════
  // grammar_build 10
  // ═══════════════════════════════════════════

  ...build(
    'gp_s3_u7_g26_11',
    G26,
    [
      {
        options: ['한옥마을이', '한옥마을을', '한옥마을에'],
        correct: '한옥마을이',
      },
      {
        options: ['어디에', '어디를', '어디가'],
        correct: '어디에',
      },
      {
        options: ['있는지', '있는데', '있으니까'],
        correct: '있는지',
        hints: {
          있는데: '배경 설명이 아니라 질문 내용을 문장 안에 넣고 있어요.',
          있으니까: '이유를 설명하는 문장이 아니에요.',
        },
      },
      {
        options: ['아세요?', '가세요?', '드세요?'],
        correct: '아세요?',
      },
    ],
    {
      uz: 'Hanok qishlog‘i qayerdaligini bilasizmi?',
      en: 'Do you know where the hanok village is?',
      ru: 'Вы знаете, где находится деревня ханоков?',
    },
  ),

  ...build(
    'gp_s3_u7_g26_12',
    G26,
    [
      {
        options: ['이 버스가', '이 버스를', '이 버스에'],
        correct: '이 버스가',
      },
      {
        options: ['몇 시에', '몇 시를', '몇 시가'],
        correct: '몇 시에',
      },
      {
        options: ['출발하는지', '출발하려고', '출발하고 나서'],
        correct: '출발하는지',
      },
      {
        options: ['알아요?', '먹어요?', '입어요?'],
        correct: '알아요?',
      },
    ],
    {
      uz: 'Bu avtobus nechada jo‘nashini bilasizmi?',
      en: 'Do you know what time this bus leaves?',
      ru: 'Вы знаете, во сколько отправляется этот автобус?',
    },
  ),

  ...build(
    'gp_s3_u7_g26_13',
    G26,
    [
      {
        options: ['표를', '표가', '표에'],
        correct: '표를',
      },
      {
        options: ['어디에서', '어디를', '어디가'],
        correct: '어디에서',
      },
      {
        options: ['사는지', '사려고', '사고 나서'],
        correct: '사는지',
      },
      {
        options: ['모르겠어요.', '먹겠어요.', '입겠어요.'],
        correct: '모르겠어요.',
      },
    ],
    {
      uz: 'Chiptani qayerdan olishni bilmayman.',
      en: 'I do not know where to buy the ticket.',
      ru: 'Я не знаю, где купить билет.',
    },
  ),

  ...build(
    'gp_s3_u7_g26_14',
    G26,
    [
      {
        options: ['저 사람이', '저 사람을', '저 사람에게'],
        correct: '저 사람이',
      },
      {
        options: ['이 학교', '이 학교를', '이 학교에'],
        correct: '이 학교',
      },
      {
        options: ['학생인지', '학생인데', '학생이라서'],
        correct: '학생인지',
        hints: {
          학생인데: '명사에 대한 간접 질문이므로 「인지」가 필요해요.',
          학생이라서: '학생이라는 사실을 이유로 제시하는 문장이 아니에요.',
        },
      },
      {
        options: ['알아요?', '먹어요?', '가요?'],
        correct: '알아요?',
      },
    ],
    {
      uz: 'U odam shu maktab talabasi ekanini bilasizmi?',
      en: 'Do you know if that person is a student at this school?',
      ru: 'Вы знаете, студент ли тот человек этой школы?',
    },
  ),

  ...build(
    'gp_s3_u7_g26_15',
    G26,
    [
      {
        options: ['회의실이', '회의실을', '회의실에'],
        correct: '회의실이',
      },
      {
        options: ['몇 층인지', '몇 층인데', '몇 층이라서'],
        correct: '몇 층인지',
      },
      {
        options: ['모르겠어요.', '가겠어요.', '먹겠어요.'],
        correct: '모르겠어요.',
      },
    ],
    {
      uz: 'Yig‘ilish xonasi nechanchi qavatdaligini bilmayman.',
      en: 'I do not know what floor the meeting room is on.',
      ru: 'Я не знаю, на каком этаже переговорная.',
    },
  ),

  ...build(
    'gp_s3_u7_g26_16',
    G26,
    [
      {
        options: ['민수 씨가', '민수 씨를', '민수 씨에게'],
        correct: '민수 씨가',
      },
      {
        options: ['왜', '어느', '무슨'],
        correct: '왜',
      },
      {
        options: [
          '전화를 안 받는지',
          '전화를 안 받으려고',
          '전화를 안 받고 나서',
        ],
        correct: '전화를 안 받는지',
      },
      {
        options: ['모르겠어요.', '있겠어요.', '먹겠어요.'],
        correct: '모르겠어요.',
      },
    ],
    {
      uz: 'Minsu nima uchun telefonni ko‘tarmayotganini bilmayman.',
      en: 'I do not know why Minsu is not answering the phone.',
      ru: 'Я не знаю, почему Минсу не отвечает.',
    },
  ),

  ...build(
    'gp_s3_u7_g26_17',
    G26,
    [
      {
        options: ['이 기계를', '이 기계가', '이 기계에'],
        correct: '이 기계를',
      },
      {
        options: ['어떻게', '어디', '누가'],
        correct: '어떻게',
      },
      {
        options: ['사용하는지', '사용하려고', '사용하고 나서'],
        correct: '사용하는지',
      },
      {
        options: ['아세요?', '오세요?', '드세요?'],
        correct: '아세요?',
      },
    ],
    {
      uz: 'Bu qurilmani qanday ishlatishni bilasizmi?',
      en: 'Do you know how to use this machine?',
      ru: 'Вы знаете, как пользоваться этим устройством?',
    },
  ),

  ...build(
    'gp_s3_u7_g26_18',
    G26,
    [
      {
        options: ['오늘 상담을', '오늘 상담이', '오늘 상담에'],
        correct: '오늘 상담을',
      },
      {
        options: ['누가', '누구를', '누구에게'],
        correct: '누가',
      },
      {
        options: ['담당하는지', '담당하려고', '담당하고 나서'],
        correct: '담당하는지',
      },
      {
        options: ['알아요?', '가요?', '사요?'],
        correct: '알아요?',
      },
    ],
    {
      uz: 'Bugungi maslahatni kim olib borishini bilasizmi?',
      en: 'Do you know who is in charge of today’s consultation?',
      ru: 'Вы знаете, кто отвечает за сегодняшнюю консультацию?',
    },
  ),

  ...build(
    'gp_s3_u7_g26_19',
    G26,
    [
      {
        options: ['저 건물이', '저 건물을', '저 건물에'],
        correct: '저 건물이',
      },
      {
        options: ['박물관인지', '박물관인데', '박물관이라서'],
        correct: '박물관인지',
      },
      {
        options: ['도서관인지', '도서관인데', '도서관이라서'],
        correct: '도서관인지',
      },
      {
        options: ['잘 모르겠어요.', '잘 먹겠어요.', '잘 입겠어요.'],
        correct: '잘 모르겠어요.',
      },
    ],
    {
      uz: 'U bino muzeymi yoki kutubxonami, aniq bilmayman.',
      en: 'I am not sure whether that building is a museum or a library.',
      ru: 'Я не уверен, музей это или библиотека.',
    },
  ),

  ...build(
    'gp_s3_u7_g26_20',
    G26,
    [
      {
        options: ['한국어 수업이', '한국어 수업을', '한국어 수업에'],
        correct: '한국어 수업이',
      },
      {
        options: ['몇 시인지', '몇 시인데', '몇 시라서'],
        correct: '몇 시인지',
      },
      {
        options: ['확인해 주세요.', '마셔 주세요.', '입어 주세요.'],
        correct: '확인해 주세요.',
      },
    ],
    {
      uz: 'Koreys tili darsi nechada ekanini tekshirib bering.',
      en: 'Please check what time the Korean class is.',
      ru: 'Проверьте, пожалуйста, во сколько занятие по корейскому.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 27. V-(으)려면
//
// 받침 O → V-으려면
// 받침 X / ㄹ 받침 → V-려면
//
// 어떤 일을 하려는 의도·목표가 있을 때
// 그 일을 위해 필요한 조건·방법을 제시
// ─────────────────────────────────────────────
const G27 = 'verb-euryeomyeon';

const G27_Q = {
  // ═══════════════════════════════════════════
  // grammar_blank 10
  // ═══════════════════════════════════════════

  ...blank(
    'gp_s3_u7_g27_01',
    G27,
    '한국에서 일하려면 한국어를 꾸준히 공부해야 해요.',
    '한국에서 일하려면',
    {
      uz: 'Koreyada ishlamoqchi bo‘lsangiz, koreys tilini muntazam o‘rganishingiz kerak.',
      en: 'If you want to work in Korea, you need to study Korean consistently.',
      ru: 'Если хотите работать в Корее, нужно регулярно учить корейский.',
    },
  ),

  ...blank(
    'gp_s3_u7_g27_02',
    G27,
    '이 버스를 타려면 교통카드가 필요해요.',
    '이 버스를 타려면',
    {
      uz: 'Bu avtobusga chiqish uchun transport kartasi kerak.',
      en: 'To take this bus, you need a transportation card.',
      ru: 'Чтобы сесть на этот автобус, нужна транспортная карта.',
    },
  ),

  ...blank(
    'gp_s3_u7_g27_03',
    G27,
    '도서관에서 책을 빌리려면 회원증을 만들어야 해요.',
    '책을 빌리려면',
    {
      uz: 'Kutubxonadan kitob olish uchun a’zolik kartasi kerak.',
      en: 'To borrow books from the library, you need to get a membership card.',
      ru: 'Чтобы брать книги в библиотеке, нужно оформить читательский билет.',
    },
  ),

  ...blank(
    'gp_s3_u7_g27_04',
    G27,
    '시험에서 좋은 점수를 받으려면 매일 복습하는 게 좋아요.',
    '좋은 점수를 받으려면',
    {
      uz: 'Imtihonda yaxshi ball olish uchun har kuni takrorlagan yaxshi.',
      en: 'To get a good score on the exam, it is good to review every day.',
      ru: 'Чтобы получить хорошую оценку на экзамене, лучше повторять материал каждый день.',
    },
  ),

  ...blank(
    'gp_s3_u7_g27_05',
    G27,
    '건강해지려면 규칙적으로 운동하고 잘 자야 해요.',
    '건강해지려면',
    {
      uz: 'Sog‘lom bo‘lish uchun muntazam mashq qilish va yaxshi uxlash kerak.',
      en: 'To become healthier, you need to exercise regularly and sleep well.',
      ru: 'Чтобы стать здоровее, нужно регулярно заниматься спортом и хорошо спать.',
    },
  ),

  ...blank(
    'gp_s3_u7_g27_06',
    G27,
    '야경을 잘 찍으려면 삼각대를 사용하는 게 좋아요.',
    '야경을 잘 찍으려면',
    {
      uz: 'Tungi manzarani yaxshi suratga olish uchun shtativ ishlatgan ma’qul.',
      en: 'To take good night photos, it is better to use a tripod.',
      ru: 'Чтобы хорошо фотографировать ночные виды, лучше использовать штатив.',
    },
  ),

  ...blank(
    'gp_s3_u7_g27_07',
    G27,
    '한국 음식을 만들려면 먼저 재료를 준비해야 해요.',
    '한국 음식을 만들려면',
    {
      uz: 'Koreys taomini tayyorlash uchun avval masalliqlarni tayyorlash kerak.',
      en: 'To make Korean food, you need to prepare the ingredients first.',
      ru: 'Чтобы приготовить корейское блюдо, сначала нужно подготовить ингредиенты.',
    },
  ),

  ...blank(
    'gp_s3_u7_g27_08',
    G27,
    '인기 있는 콘서트를 보려면 표를 일찍 예매해야 해요.',
    '콘서트를 보려면',
    {
      uz: 'Mashhur konsertni ko‘rish uchun chiptani erta band qilish kerak.',
      en: 'To see a popular concert, you need to book tickets early.',
      ru: 'Чтобы попасть на популярный концерт, нужно заранее купить билет.',
    },
  ),

  ...blank(
    'gp_s3_u7_g27_09',
    G27,
    '은행 계좌를 만들려면 신분증을 가져가야 해요.',
    '은행 계좌를 만들려면',
    {
      uz: 'Bank hisobini ochish uchun shaxsiy guvohnoma olib borish kerak.',
      en: 'To open a bank account, you need to bring your ID.',
      ru: 'Чтобы открыть банковский счёт, нужно взять удостоверение личности.',
    },
  ),

  ...blank(
    'gp_s3_u7_g27_10',
    G27,
    '약속 시간에 늦지 않으려면 지금 출발해야 해요.',
    '늦지 않으려면',
    {
      uz: 'Uchrashuvga kechikmaslik uchun hozir yo‘lga chiqish kerak.',
      en: 'If you do not want to be late, you need to leave now.',
      ru: 'Чтобы не опоздать на встречу, нужно выходить сейчас.',
    },
  ),

  // ═══════════════════════════════════════════
  // grammar_build 10
  // ═══════════════════════════════════════════

  ...build(
    'gp_s3_u7_g27_11',
    G27,
    [
      {
        options: ['한국에서', '한국을', '한국이'],
        correct: '한국에서',
      },
      {
        options: ['일하려면', '일으려면', '일하면'],
        correct: '일하려면',
        hints: {
          일으려면: "받침 없는 '일하다'는 '일하려면'이 돼요.",
          일하면: '단순 조건보다 목표를 이루기 위한 조건을 말하고 있어요.',
        },
      },
      {
        options: ['한국어를', '한국어가', '한국어에'],
        correct: '한국어를',
      },
      {
        options: [
          '꾸준히 공부해야 해요.',
          '꾸준히 먹어야 해요.',
          '꾸준히 입어야 해요.',
        ],
        correct: '꾸준히 공부해야 해요.',
      },
    ],
    {
      uz: 'Koreyada ishlash uchun koreys tilini muntazam o‘rganish kerak.',
      en: 'To work in Korea, you need to study Korean consistently.',
      ru: 'Чтобы работать в Корее, нужно регулярно учить корейский.',
    },
  ),

  ...build(
    'gp_s3_u7_g27_12',
    G27,
    [
      {
        options: ['이 버스를', '이 버스가', '이 버스에'],
        correct: '이 버스를',
      },
      {
        options: ['타려면', '타으려면', '타면'],
        correct: '타려면',
        hints: {
          타으려면: "받침 없는 '타다' 뒤에는 '려면'을 사용해요.",
          타면: '여기서는 버스를 타기 위해 필요한 조건을 설명해요.',
        },
      },
      {
        options: ['교통카드가', '교통카드를', '교통카드에'],
        correct: '교통카드가',
      },
      {
        options: ['필요해요.', '도착해요.', '출발해요.'],
        correct: '필요해요.',
      },
    ],
    {
      uz: 'Bu avtobusga chiqish uchun transport kartasi kerak.',
      en: 'To take this bus, you need a transportation card.',
      ru: 'Чтобы сесть на этот автобус, нужна транспортная карта.',
    },
  ),

  ...build(
    'gp_s3_u7_g27_13',
    G27,
    [
      {
        options: ['도서관에서', '도서관을', '도서관이'],
        correct: '도서관에서',
      },
      {
        options: ['책을', '책이', '책에'],
        correct: '책을',
      },
      {
        options: ['빌리려면', '빌리으려면', '빌리면'],
        correct: '빌리려면',
      },
      {
        options: [
          '회원증을 만들어야 해요.',
          '회원증을 먹어야 해요.',
          '회원증을 입어야 해요.',
        ],
        correct: '회원증을 만들어야 해요.',
      },
    ],
    {
      uz: 'Kutubxonadan kitob olish uchun a’zolik kartasi kerak.',
      en: 'To borrow a book, you need to get a membership card.',
      ru: 'Чтобы взять книгу, нужен читательский билет.',
    },
  ),

  ...build(
    'gp_s3_u7_g27_14',
    G27,
    [
      {
        options: ['시험에서', '시험을', '시험이'],
        correct: '시험에서',
      },
      {
        options: ['좋은 점수를', '좋은 점수가', '좋은 점수에'],
        correct: '좋은 점수를',
      },
      {
        options: ['받으려면', '받려면', '받으면'],
        correct: '받으려면',
        hints: {
          받려면: "받침 있는 '받다' 뒤에는 '으려면'이 필요해요.",
          받으면:
            '단순 조건이 아니라 좋은 점수를 얻기 위한 방법을 말하고 있어요.',
        },
      },
      {
        options: ['매일 복습하세요.', '매일 출발하세요.', '매일 도착하세요.'],
        correct: '매일 복습하세요.',
      },
    ],
    {
      uz: 'Yaxshi ball olish uchun har kuni takrorlang.',
      en: 'To get a good score, review every day.',
      ru: 'Чтобы получить хорошую оценку, повторяйте материал каждый день.',
    },
  ),

  ...build(
    'gp_s3_u7_g27_15',
    G27,
    [
      {
        options: ['건강해지려면', '건강해지으려면', '건강해지면'],
        correct: '건강해지려면',
      },
      {
        options: ['규칙적으로', '갑자기', '밖에'],
        correct: '규칙적으로',
      },
      {
        options: ['운동하고', '운동하거나만', '운동보다'],
        correct: '운동하고',
      },
      {
        options: ['잘 자야 해요.', '잘 사야 해요.', '잘 입어야 해요.'],
        correct: '잘 자야 해요.',
      },
    ],
    {
      uz: 'Sog‘lom bo‘lish uchun muntazam mashq qilib, yaxshi uxlash kerak.',
      en: 'To become healthier, exercise regularly and sleep well.',
      ru: 'Чтобы стать здоровее, регулярно занимайтесь спортом и хорошо спите.',
    },
  ),

  ...build(
    'gp_s3_u7_g27_16',
    G27,
    [
      {
        options: ['야경을', '야경이', '야경에'],
        correct: '야경을',
      },
      {
        options: ['잘 찍으려면', '잘 찍려면', '잘 찍으면'],
        correct: '잘 찍으려면',
        hints: {
          찍려면: "받침 있는 '찍다'에는 '으려면'을 붙여요.",
          찍으면: '사진을 잘 찍는 목표를 위한 방법을 설명하고 있어요.',
        },
      },
      {
        options: ['삼각대를', '삼각대가', '삼각대에'],
        correct: '삼각대를',
      },
      {
        options: ['사용하는 게 좋아요.', '먹는 게 좋아요.', '입는 게 좋아요.'],
        correct: '사용하는 게 좋아요.',
      },
    ],
    {
      uz: 'Tungi manzarani yaxshi olish uchun shtativ ishlatgan yaxshi.',
      en: 'To take good night photos, it is better to use a tripod.',
      ru: 'Чтобы хорошо снимать ночью, лучше использовать штатив.',
    },
  ),

  ...build(
    'gp_s3_u7_g27_17',
    G27,
    [
      {
        options: ['한국 음식을', '한국 음식이', '한국 음식에'],
        correct: '한국 음식을',
      },
      {
        options: ['만들려면', '만들으려면', '만들면'],
        correct: '만들려면',
        hints: {
          만들으려면: "ㄹ 받침 '만들다' 뒤에는 '려면'을 사용해요.",
          만들면: '여기서는 음식을 만들기 위해 필요한 준비를 말해요.',
        },
      },
      {
        options: ['먼저', '아직', '밖에'],
        correct: '먼저',
      },
      {
        options: [
          '재료를 준비해야 해요.',
          '재료를 입어야 해요.',
          '재료를 타야 해요.',
        ],
        correct: '재료를 준비해야 해요.',
      },
    ],
    {
      uz: 'Koreys taomini tayyorlash uchun avval masalliqlarni tayyorlash kerak.',
      en: 'To make Korean food, prepare the ingredients first.',
      ru: 'Чтобы приготовить корейское блюдо, сначала подготовьте ингредиенты.',
    },
  ),

  ...build(
    'gp_s3_u7_g27_18',
    G27,
    [
      {
        options: [
          '인기 있는 콘서트를',
          '인기 있는 콘서트가',
          '인기 있는 콘서트에',
        ],
        correct: '인기 있는 콘서트를',
      },
      {
        options: ['보려면', '보으려면', '보면'],
        correct: '보려면',
      },
      {
        options: ['표를', '표가', '표에'],
        correct: '표를',
      },
      {
        options: [
          '일찍 예매해야 해요.',
          '일찍 먹어야 해요.',
          '일찍 입어야 해요.',
        ],
        correct: '일찍 예매해야 해요.',
      },
    ],
    {
      uz: 'Mashhur konsertga borish uchun chiptani erta olish kerak.',
      en: 'To see a popular concert, you need to book early.',
      ru: 'Чтобы попасть на популярный концерт, нужно заранее купить билет.',
    },
  ),

  ...build(
    'gp_s3_u7_g27_19',
    G27,
    [
      {
        options: ['은행 계좌를', '은행 계좌가', '은행 계좌에'],
        correct: '은행 계좌를',
      },
      {
        options: ['만들려면', '만들으려면', '만들면'],
        correct: '만들려면',
      },
      {
        options: ['신분증을', '신분증이', '신분증에'],
        correct: '신분증을',
      },
      {
        options: ['가져가야 해요.', '먹어야 해요.', '입어야 해요.'],
        correct: '가져가야 해요.',
      },
    ],
    {
      uz: 'Bank hisobini ochish uchun shaxsiy guvohnoma olib borish kerak.',
      en: 'To open a bank account, you need to bring your ID.',
      ru: 'Чтобы открыть банковский счёт, нужно взять удостоверение личности.',
    },
  ),

  ...build(
    'gp_s3_u7_g27_20',
    G27,
    [
      {
        options: ['약속 시간에', '약속 시간을', '약속 시간이'],
        correct: '약속 시간에',
      },
      {
        options: ['늦지 않으려면', '늦지 않려면', '늦지 않으면'],
        correct: '늦지 않으려면',
      },
      {
        options: ['지금', '어제', '지난주'],
        correct: '지금',
      },
      {
        options: ['출발해야 해요.', '도착했어요.', '먹어 봤어요.'],
        correct: '출발해야 해요.',
      },
    ],
    {
      uz: 'Kechikmaslik uchun hozir yo‘lga chiqish kerak.',
      en: 'To avoid being late, you need to leave now.',
      ru: 'Чтобы не опоздать, нужно выходить сейчас.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 28. V-다가
//
// V-다가
//
// 하던 행동이 끝나기 전에 멈추고
// 다른 행동으로 바뀌거나 예상하지 못한 일이 발생
//
// "V하던 중에"
// 앞 행동과 뒤 행동의 전환이 핵심
// ─────────────────────────────────────────────
const G28 = 'verb-daga';

const G28_Q = {
  // ═══════════════════════════════════════════
  // grammar_blank 10
  // ═══════════════════════════════════════════

  ...blank(
    'gp_s3_u7_g28_01',
    G28,
    '어젯밤에 공부하다가 책상에서 잠들었어요.',
    '공부하다가',
    {
      uz: 'Kecha kechqurun o‘qiyotib stol yonida uxlab qoldim.',
      en: 'Last night, I fell asleep at my desk while studying.',
      ru: 'Вчера вечером я уснул за столом, пока занимался.',
    },
  ),

  ...blank(
    'gp_s3_u7_g28_02',
    G28,
    '회사에 가다가 길에서 오랜 친구를 만났어요.',
    '회사에 가다가',
    {
      uz: 'Ishga ketayotib yo‘lda eski do‘stimni uchratdim.',
      en: 'On my way to work, I ran into an old friend.',
      ru: 'По дороге на работу я встретил старого друга.',
    },
  ),

  ...blank(
    'gp_s3_u7_g28_03',
    G28,
    '밥을 먹다가 중요한 전화가 와서 잠깐 나갔어요.',
    '밥을 먹다가',
    {
      uz: 'Ovqatlanayotganda muhim qo‘ng‘iroq bo‘lib, bir oz tashqariga chiqdim.',
      en: 'While eating, I got an important call and stepped outside for a moment.',
      ru: 'Во время еды мне позвонили по важному делу, и я ненадолго вышел.',
    },
  ),

  ...blank(
    'gp_s3_u7_g28_04',
    G28,
    '책을 읽다가 모르는 표현을 발견해서 사전을 찾아봤어요.',
    '책을 읽다가',
    {
      uz: 'Kitob o‘qiyotib bilmagan iborani ko‘rib, lug‘atdan qidirdim.',
      en: 'While reading a book, I found an unfamiliar expression and looked it up.',
      ru: 'Читая книгу, я встретил незнакомое выражение и посмотрел его в словаре.',
    },
  ),

  ...blank(
    'gp_s3_u7_g28_05',
    G28,
    '운동하다가 다리를 다쳐서 며칠 동안 쉬었어요.',
    '운동하다가',
    {
      uz: 'Mashq qilayotib oyog‘imni jarohatlab, bir necha kun dam oldim.',
      en: 'I hurt my leg while exercising, so I rested for several days.',
      ru: 'Во время тренировки я повредил ногу и несколько дней отдыхал.',
    },
  ),

  ...blank(
    'gp_s3_u7_g28_06',
    G28,
    '버스를 기다리다가 너무 늦어서 택시를 탔어요.',
    '버스를 기다리다가',
    {
      uz: 'Avtobus kutayotib juda kech qolganim uchun taksiga o‘tirdim.',
      en: 'I was waiting for the bus, but it got too late, so I took a taxi.',
      ru: 'Я ждал автобус, но стало слишком поздно, поэтому поехал на такси.',
    },
  ),

  ...blank(
    'gp_s3_u7_g28_07',
    G28,
    '한국어로 이야기하다가 단어가 생각나지 않아서 영어를 썼어요.',
    '한국어로 이야기하다가',
    {
      uz: 'Koreys tilida gaplashayotib so‘z esimga kelmay, inglizcha ishlatdim.',
      en: 'While speaking Korean, I could not remember a word, so I used English.',
      ru: 'Говоря по-корейски, я не смог вспомнить слово и перешёл на английский.',
    },
  ),

  ...blank(
    'gp_s3_u7_g28_08',
    G28,
    '방을 청소하다가 오래된 사진을 발견했어요.',
    '방을 청소하다가',
    {
      uz: 'Xonani tozalayotib eski suratni topib oldim.',
      en: 'While cleaning my room, I found an old photograph.',
      ru: 'Убирая комнату, я нашёл старую фотографию.',
    },
  ),

  ...blank(
    'gp_s3_u7_g28_09',
    G28,
    '영화를 보다가 너무 졸려서 잠깐 잤어요.',
    '영화를 보다가',
    {
      uz: 'Film ko‘rayotib juda uyqum kelib, biroz uxladim.',
      en: 'I got very sleepy while watching the movie and slept for a while.',
      ru: 'Во время фильма мне стало очень сонно, и я немного поспал.',
    },
  ),

  ...blank(
    'gp_s3_u7_g28_10',
    G28,
    '공원을 걷다가 길에서 지갑을 주웠어요.',
    '공원을 걷다가',
    {
      uz: 'Bog‘da yurayotib yo‘lda hamyon topdim.',
      en: 'While walking through the park, I found a wallet.',
      ru: 'Гуляя по парку, я нашёл на дороге кошелёк.',
    },
  ),

  // ═══════════════════════════════════════════
  // grammar_build 10
  // ═══════════════════════════════════════════

  ...build(
    'gp_s3_u7_g28_11',
    G28,
    [
      {
        options: ['어젯밤에', '내일 밤에', '다음 주에'],
        correct: '어젯밤에',
      },
      {
        options: ['공부하다가', '공부하고 나서', '공부하려고'],
        correct: '공부하다가',
        hints: {
          '공부하고 나서':
            '공부를 완전히 끝낸 뒤 잠든 것이 아니라 공부하던 중에 잠들었어요.',
          공부하려고: '공부할 목적을 말하는 문장이 아니에요.',
        },
      },
      {
        options: ['책상에서', '책상을', '책상이'],
        correct: '책상에서',
      },
      {
        options: ['잠들었어요.', '출발했어요.', '샀어요.'],
        correct: '잠들었어요.',
      },
    ],
    {
      uz: 'Kecha o‘qiyotib stol yonida uxlab qoldim.',
      en: 'I fell asleep at my desk while studying last night.',
      ru: 'Вчера я уснул за столом во время учёбы.',
    },
  ),

  ...build(
    'gp_s3_u7_g28_12',
    G28,
    [
      {
        options: ['회사에', '회사를', '회사가'],
        correct: '회사에',
      },
      {
        options: ['가다가', '가고 나서', '가려고'],
        correct: '가다가',
        hints: {
          '가고 나서': '회사에 도착한 뒤가 아니라 가는 도중에 친구를 만났어요.',
          가려고: '회사에 가려는 목적을 설명하는 문장이 아니에요.',
        },
      },
      {
        options: ['길에서', '길을', '길이'],
        correct: '길에서',
      },
      {
        options: [
          '오랜 친구를 만났어요.',
          '오랜 친구를 먹었어요.',
          '오랜 친구가 입었어요.',
        ],
        correct: '오랜 친구를 만났어요.',
      },
    ],
    {
      uz: 'Ishga ketayotib eski do‘stimni uchratdim.',
      en: 'I met an old friend on my way to work.',
      ru: 'По дороге на работу я встретил старого друга.',
    },
  ),

  ...build(
    'gp_s3_u7_g28_13',
    G28,
    [
      {
        options: ['밥을', '밥이', '밥에'],
        correct: '밥을',
      },
      {
        options: ['먹다가', '먹고 나서', '먹으려고'],
        correct: '먹다가',
      },
      {
        options: ['중요한 전화가 와서', '전화를 모두 끄고', '전화가 없어서'],
        correct: '중요한 전화가 와서',
      },
      {
        options: ['잠깐 나갔어요.', '잠깐 먹었어요.', '잠깐 입었어요.'],
        correct: '잠깐 나갔어요.',
      },
    ],
    {
      uz: 'Ovqatlanayotganda muhim qo‘ng‘iroq bo‘lib, tashqariga chiqdim.',
      en: 'While eating, I got an important call and stepped outside.',
      ru: 'Во время еды мне позвонили, и я ненадолго вышел.',
    },
  ),

  ...build(
    'gp_s3_u7_g28_14',
    G28,
    [
      {
        options: ['책을', '책이', '책에'],
        correct: '책을',
      },
      {
        options: ['읽다가', '읽고 나서', '읽으려고'],
        correct: '읽다가',
      },
      {
        options: ['모르는 표현을', '모르는 표현이', '모르는 표현에'],
        correct: '모르는 표현을',
      },
      {
        options: ['발견했어요.', '입었어요.', '마셨어요.'],
        correct: '발견했어요.',
      },
    ],
    {
      uz: 'Kitob o‘qiyotib bilmagan iborani topdim.',
      en: 'I found an unfamiliar expression while reading.',
      ru: 'Читая книгу, я встретил незнакомое выражение.',
    },
  ),

  ...build(
    'gp_s3_u7_g28_15',
    G28,
    [
      {
        options: ['운동하다가', '운동하고 나서', '운동하려고'],
        correct: '운동하다가',
        hints: {
          '운동하고 나서': '운동이 끝난 뒤가 아니라 운동하던 도중에 다쳤어요.',
          운동하려고: '운동하려는 목적 때문에 다친 것이 아니에요.',
        },
      },
      {
        options: ['다리를', '다리가', '다리에'],
        correct: '다리를',
      },
      {
        options: ['다쳐서', '만나서', '사서'],
        correct: '다쳐서',
      },
      {
        options: [
          '며칠 동안 쉬었어요.',
          '며칠 동안 입었어요.',
          '며칠 동안 샀어요.',
        ],
        correct: '며칠 동안 쉬었어요.',
      },
    ],
    {
      uz: 'Mashq qilayotib oyog‘imni jarohatladim va bir necha kun dam oldim.',
      en: 'I injured my leg while exercising and rested for several days.',
      ru: 'Я повредил ногу во время тренировки и несколько дней отдыхал.',
    },
  ),

  ...build(
    'gp_s3_u7_g28_16',
    G28,
    [
      {
        options: ['버스를', '버스가', '버스에'],
        correct: '버스를',
      },
      {
        options: ['기다리다가', '기다리고 나서', '기다리려고'],
        correct: '기다리다가',
      },
      {
        options: ['너무 늦어서', '아주 빨라서', '시간이 많아서'],
        correct: '너무 늦어서',
      },
      {
        options: ['택시를 탔어요.', '택시를 먹었어요.', '택시가 입었어요.'],
        correct: '택시를 탔어요.',
      },
    ],
    {
      uz: 'Avtobus kutayotib kech qolganim uchun taksiga o‘tirdim.',
      en: 'I was waiting for the bus, but it got late, so I took a taxi.',
      ru: 'Я ждал автобус, но стало поздно, поэтому поехал на такси.',
    },
  ),

  ...build(
    'gp_s3_u7_g28_17',
    G28,
    [
      {
        options: ['한국어로', '한국어를', '한국어가'],
        correct: '한국어로',
      },
      {
        options: ['이야기하다가', '이야기하고 나서', '이야기하려고'],
        correct: '이야기하다가',
      },
      {
        options: [
          '단어가 생각나지 않아서',
          '단어를 모두 알아서',
          '단어가 쉬워서',
        ],
        correct: '단어가 생각나지 않아서',
      },
      {
        options: ['영어를 썼어요.', '영어를 먹었어요.', '영어가 입었어요.'],
        correct: '영어를 썼어요.',
      },
    ],
    {
      uz: 'Koreyscha gaplashayotib so‘z esimga kelmay, inglizcha ishlatdim.',
      en: 'While speaking Korean, I could not remember a word, so I used English.',
      ru: 'Говоря по-корейски, я не вспомнил слово и использовал английский.',
    },
  ),

  ...build(
    'gp_s3_u7_g28_18',
    G28,
    [
      {
        options: ['방을', '방이', '방에'],
        correct: '방을',
      },
      {
        options: ['청소하다가', '청소하고 나서', '청소하려고'],
        correct: '청소하다가',
      },
      {
        options: ['오래된 사진을', '오래된 사진이', '오래된 사진에'],
        correct: '오래된 사진을',
      },
      {
        options: ['발견했어요.', '출발했어요.', '도착했어요.'],
        correct: '발견했어요.',
      },
    ],
    {
      uz: 'Xonani tozalayotib eski surat topdim.',
      en: 'I found an old photo while cleaning my room.',
      ru: 'Убирая комнату, я нашёл старую фотографию.',
    },
  ),

  ...build(
    'gp_s3_u7_g28_19',
    G28,
    [
      {
        options: ['영화를', '영화가', '영화에'],
        correct: '영화를',
      },
      {
        options: ['보다가', '보고 나서', '보려고'],
        correct: '보다가',
        hints: {
          '보고 나서': '영화를 끝까지 다 본 후가 아니라 보던 중에 잠들었어요.',
          보려고: '영화를 보기 위한 목적을 표현하는 문장이 아니에요.',
        },
      },
      {
        options: ['너무 졸려서', '전혀 졸리지 않아서', '아주 신나서'],
        correct: '너무 졸려서',
      },
      {
        options: ['잠깐 잤어요.', '잠깐 샀어요.', '잠깐 입었어요.'],
        correct: '잠깐 잤어요.',
      },
    ],
    {
      uz: 'Film ko‘rayotib uyqum kelib, biroz uxladim.',
      en: 'I got sleepy while watching a movie and slept for a while.',
      ru: 'Во время фильма мне захотелось спать, и я немного поспал.',
    },
  ),

  ...build(
    'gp_s3_u7_g28_20',
    G28,
    [
      {
        options: ['공원을', '공원이', '공원에'],
        correct: '공원을',
      },
      {
        options: ['걷다가', '걷고 나서', '걸으려고'],
        correct: '걷다가',
        hints: {
          '걷고 나서': '산책을 완전히 끝낸 후가 아니라 걷던 중에 발견했어요.',
          걸으려고: '걷기 위한 목적을 나타내는 문장이 아니에요.',
        },
      },
      {
        options: ['길에서', '길을', '길이'],
        correct: '길에서',
      },
      {
        options: ['지갑을 주웠어요.', '지갑을 마셨어요.', '지갑을 입었어요.'],
        correct: '지갑을 주웠어요.',
      },
    ],
    {
      uz: 'Bog‘da yurayotib hamyon topdim.',
      en: 'I found a wallet while walking through the park.',
      ru: 'Гуляя по парку, я нашёл кошелёк.',
    },
  ),
};

// ═══════════════════════════════════════════════════════════
// UNIT 8
// 추측·공감 · 원인 · 완료 · 상황·시점
// ═══════════════════════════════════════════════════════════

// ─────────────────────────────────────────────
// 문법 29. A/V-겠-
//
// 현재 보이는 상황이나 들은 정보를 바탕으로 추측하거나
// 상대방의 상황·감정에 공감할 때 사용
//
// 맛있겠다 / 춥겠다 / 피곤하겠다
// 속상하겠어요 / 힘들겠어요
// ─────────────────────────────────────────────
const G29 = 'av-get';

const G29_Q = {
  // ═══════════════════════════════════════════
  // grammar_blank 10
  // ═══════════════════════════════════════════

  ...blank(
    'gp_s3_u8_g29_01',
    G29,
    '밤새 일을 했어요? 정말 피곤하겠어요.',
    '정말 피곤하겠어요',
    {
      uz: 'Tun bo‘yi ishladingizmi? Juda charchagan bo‘lsangiz kerak.',
      en: 'You worked all night? You must be really tired.',
      ru: 'Вы работали всю ночь? Наверное, вы очень устали.',
    },
  ),

  ...blank(
    'gp_s3_u8_g29_02',
    G29,
    '오랫동안 준비한 시험에 떨어졌어요? 정말 속상하겠어요.',
    '정말 속상하겠어요',
    {
      uz: 'Uzoq tayyorlangan imtihondan o‘ta olmadingizmi? Juda xafa bo‘lsangiz kerak.',
      en: 'You failed the exam you prepared for so long? You must be really upset.',
      ru: 'Вы не сдали экзамен, к которому долго готовились? Наверное, вам очень обидно.',
    },
  ),

  ...blank(
    'gp_s3_u8_g29_03',
    G29,
    '창밖에 눈이 많이 와요. 밖은 아주 춥겠어요.',
    '밖은 아주 춥겠어요',
    {
      uz: 'Deraza tashqarisida qor ko‘p yog‘yapti. Tashqarida juda sovuq bo‘lsa kerak.',
      en: 'It is snowing heavily outside. It must be very cold.',
      ru: 'На улице сильный снег. Наверное, там очень холодно.',
    },
  ),

  ...blank(
    'gp_s3_u8_g29_04',
    G29,
    '사람들이 한 시간이나 기다리고 있어요. 저 식당 음식이 맛있겠어요.',
    '저 식당 음식이 맛있겠어요',
    {
      uz: 'Odamlar bir soatdan beri kutishyapti. U restoranning taomi mazali bo‘lsa kerak.',
      en: 'People have been waiting for an hour. The food at that restaurant must be good.',
      ru: 'Люди ждут уже час. Наверное, в том ресторане вкусно готовят.',
    },
  ),

  ...blank(
    'gp_s3_u8_g29_05',
    G29,
    '혼자 이삿짐을 다 옮겼어요? 많이 힘들었겠어요.',
    '많이 힘들었겠어요',
    {
      uz: 'Hamma yukni yolg‘iz ko‘chirdingizmi? Juda qiyin bo‘lgan bo‘lsa kerak.',
      en: 'You moved everything by yourself? That must have been exhausting.',
      ru: 'Вы один перевезли все вещи? Наверное, было очень тяжело.',
    },
  ),

  ...blank(
    'gp_s3_u8_g29_06',
    G29,
    '사진을 보니까 제주도 날씨가 정말 좋았겠어요.',
    '날씨가 정말 좋았겠어요',
    {
      uz: 'Suratlarga qaraganda, Jejuda ob-havo juda yaxshi bo‘lgan bo‘lsa kerak.',
      en: 'Looking at the photos, the weather in Jeju must have been really nice.',
      ru: 'Судя по фотографиям, на Чеджудо была отличная погода.',
    },
  ),

  ...blank(
    'gp_s3_u8_g29_07',
    G29,
    '매일 두 시간씩 연습했으니까 한국어 실력이 많이 늘었겠어요.',
    '한국어 실력이 많이 늘었겠어요',
    {
      uz: 'Har kuni ikki soatdan mashq qilganingiz uchun koreys tilingiz ancha yaxshilangandir.',
      en: 'Since you practiced two hours every day, your Korean must have improved a lot.',
      ru: 'Раз вы каждый день занимались по два часа, ваш корейский, наверное, сильно улучшился.',
    },
  ),

  ...blank(
    'gp_s3_u8_g29_08',
    G29,
    '처음으로 외국에서 혼자 살면 조금 외롭겠어요.',
    '조금 외롭겠어요',
    {
      uz: 'Chet elda birinchi marta yolg‘iz yashasangiz, biroz yolg‘iz bo‘lsangiz kerak.',
      en: 'Living alone abroad for the first time must feel a little lonely.',
      ru: 'Наверное, немного одиноко впервые жить одному за границей.',
    },
  ),

  ...blank(
    'gp_s3_u8_g29_09',
    G29,
    '주말인데 놀이공원에 사람이 정말 많겠어요.',
    '사람이 정말 많겠어요',
    {
      uz: 'Dam olish kuni, attraksionlar bog‘ida odam juda ko‘p bo‘lsa kerak.',
      en: 'It is the weekend, so the amusement park must be very crowded.',
      ru: 'Сегодня выходной, поэтому в парке развлечений наверняка очень много людей.',
    },
  ),

  ...blank(
    'gp_s3_u8_g29_10',
    G29,
    '아침도 못 먹고 계속 일했어요? 배가 많이 고프겠어요.',
    '배가 많이 고프겠어요',
    {
      uz: 'Nonushta ham qilmay ishlab yuribsizmi? Juda och bo‘lsangiz kerak.',
      en: 'You have been working without breakfast? You must be very hungry.',
      ru: 'Вы работаете, даже не позавтракав? Наверное, вы очень голодны.',
    },
  ),

  // ═══════════════════════════════════════════
  // grammar_build 10
  // ═══════════════════════════════════════════

  ...build(
    'gp_s3_u8_g29_11',
    G29,
    [
      {
        options: [
          '밤새 일을 했어요?',
          '오늘 푹 쉬었어요?',
          '휴가를 다녀왔어요?',
        ],
        correct: '밤새 일을 했어요?',
      },
      {
        options: ['정말', '별로', '전혀'],
        correct: '정말',
      },
      {
        options: ['피곤하겠어요.', '피곤했어요.', '피곤한데요.'],
        correct: '피곤하겠어요.',
        hints: {
          '피곤했어요.':
            '상대방의 상태를 직접 단정하는 것이 아니라 상황을 보고 추측·공감하고 있어요.',
          '피곤한데요.':
            '배경을 제시하는 것이 아니라 상대방의 상태를 짐작하고 있어요.',
        },
      },
    ],
    {
      uz: 'Tun bo‘yi ishladingizmi? Juda charchagan bo‘lsangiz kerak.',
      en: 'You worked all night? You must be really tired.',
      ru: 'Вы работали всю ночь? Наверное, вы очень устали.',
    },
  ),

  ...build(
    'gp_s3_u8_g29_12',
    G29,
    [
      {
        options: [
          '시험에 떨어졌어요?',
          '시험에서 만점을 받았어요?',
          '시험이 취소됐어요?',
        ],
        correct: '시험에 떨어졌어요?',
      },
      {
        options: ['정말', '전혀', '벌써'],
        correct: '정말',
      },
      {
        options: ['속상하겠어요.', '속상했어요.', '속상한데요.'],
        correct: '속상하겠어요.',
      },
    ],
    {
      uz: 'Imtihondan o‘ta olmadingizmi? Juda xafa bo‘lsangiz kerak.',
      en: 'You failed the exam? You must be really upset.',
      ru: 'Вы не сдали экзамен? Наверное, вам очень обидно.',
    },
  ),

  ...build(
    'gp_s3_u8_g29_13',
    G29,
    [
      {
        options: ['창밖에', '창밖을', '창밖이'],
        correct: '창밖에',
      },
      {
        options: ['눈이 많이 와요.', '햇빛이 따뜻해요.', '벚꽃이 피었어요.'],
        correct: '눈이 많이 와요.',
      },
      {
        options: ['밖은', '밖을', '밖에만'],
        correct: '밖은',
      },
      {
        options: ['아주 춥겠어요.', '아주 추웠어요.', '아주 추운데요.'],
        correct: '아주 춥겠어요.',
      },
    ],
    {
      uz: 'Qor ko‘p yog‘yapti. Tashqarida juda sovuq bo‘lsa kerak.',
      en: 'It is snowing heavily. It must be very cold outside.',
      ru: 'Идёт сильный снег. Наверное, на улице очень холодно.',
    },
  ),

  ...build(
    'gp_s3_u8_g29_14',
    G29,
    [
      {
        options: ['사람들이', '사람들을', '사람들에게'],
        correct: '사람들이',
      },
      {
        options: [
          '한 시간이나 기다리고 있어요.',
          '한 명도 없어요.',
          '모두 바로 들어가요.',
        ],
        correct: '한 시간이나 기다리고 있어요.',
      },
      {
        options: ['저 식당 음식이', '저 식당 음식을', '저 식당 음식에'],
        correct: '저 식당 음식이',
      },
      {
        options: ['맛있겠어요.', '맛있었어요.', '맛있는데요.'],
        correct: '맛있겠어요.',
      },
    ],
    {
      uz: 'Bir soat navbat bor. U yerning taomi mazali bo‘lsa kerak.',
      en: 'There is an hour-long wait. The food there must be delicious.',
      ru: 'Там ждут целый час. Наверное, еда очень вкусная.',
    },
  ),

  ...build(
    'gp_s3_u8_g29_15',
    G29,
    [
      {
        options: ['혼자', '같이', '전혀'],
        correct: '혼자',
      },
      {
        options: [
          '이삿짐을 다 옮겼어요?',
          '카페에서 쉬었어요?',
          '영화를 봤어요?',
        ],
        correct: '이삿짐을 다 옮겼어요?',
      },
      {
        options: [
          '많이 힘들었겠어요.',
          '많이 힘든 것 같아요.',
          '많이 힘들 거예요.',
        ],
        correct: '많이 힘들었겠어요.',
        hints: {
          '많이 힘든 것 같아요.':
            '이미 끝난 힘든 경험에 대해 공감하는 상황이에요.',
          '많이 힘들 거예요.': '앞으로 힘들 것이라는 예측이 아니에요.',
        },
      },
    ],
    {
      uz: 'Yukni yolg‘iz ko‘chirdingizmi? Juda qiyin bo‘lgan bo‘lsa kerak.',
      en: 'You moved everything alone? That must have been hard.',
      ru: 'Вы всё перенесли один? Наверное, было очень тяжело.',
    },
  ),

  ...build(
    'gp_s3_u8_g29_16',
    G29,
    [
      {
        options: ['사진을 보니까', '일기예보를 보니까', '지금 밖을 보니까'],
        correct: '사진을 보니까',
      },
      {
        options: ['제주도 날씨가', '제주도 날씨를', '제주도 날씨에'],
        correct: '제주도 날씨가',
      },
      {
        options: [
          '정말 좋았겠어요.',
          '정말 좋은 것 같아요.',
          '정말 좋을 거예요.',
        ],
        correct: '정말 좋았겠어요.',
      },
    ],
    {
      uz: 'Suratlarga qaraganda Jejuda ob-havo juda yaxshi bo‘lgan.',
      en: 'Judging by the photos, the weather in Jeju must have been great.',
      ru: 'Судя по фотографиям, на Чеджудо была отличная погода.',
    },
  ),

  ...build(
    'gp_s3_u8_g29_17',
    G29,
    [
      {
        options: [
          '매일 두 시간씩 연습했으니까',
          '한 달 동안 공부하지 않았으니까',
          '수업을 모두 빠졌으니까',
        ],
        correct: '매일 두 시간씩 연습했으니까',
      },
      {
        options: ['한국어 실력이', '한국어 실력을', '한국어 실력에'],
        correct: '한국어 실력이',
      },
      {
        options: ['많이 늘었겠어요.', '많이 늘 거예요.', '많이 느는데요.'],
        correct: '많이 늘었겠어요.',
      },
    ],
    {
      uz: 'Har kuni mashq qilganingiz uchun koreys tilingiz ancha yaxshilangandir.',
      en: 'Since you practiced every day, your Korean must have improved a lot.',
      ru: 'Раз вы каждый день занимались, ваш корейский наверняка сильно улучшился.',
    },
  ),

  ...build(
    'gp_s3_u8_g29_18',
    G29,
    [
      {
        options: ['처음으로', '벌써 여러 번', '매일 가족과'],
        correct: '처음으로',
      },
      {
        options: [
          '외국에서 혼자 살면',
          '고향에서 가족과 살면',
          '친구 집에 잠깐 가면',
        ],
        correct: '외국에서 혼자 살면',
      },
      {
        options: ['조금 외롭겠어요.', '조금 외로웠어요.', '조금 외로운데요.'],
        correct: '조금 외롭겠어요.',
      },
    ],
    {
      uz: 'Chet elda birinchi marta yolg‘iz yashash biroz yolg‘iz bo‘lsa kerak.',
      en: 'Living alone abroad for the first time must feel lonely.',
      ru: 'Наверное, немного одиноко впервые жить одному за границей.',
    },
  ),

  ...build(
    'gp_s3_u8_g29_19',
    G29,
    [
      {
        options: ['주말인데', '평일 새벽인데', '놀이공원이 쉬는 날인데'],
        correct: '주말인데',
      },
      {
        options: ['놀이공원에', '놀이공원을', '놀이공원이'],
        correct: '놀이공원에',
      },
      {
        options: [
          '사람이 정말 많겠어요.',
          '사람이 정말 많았어요.',
          '사람이 정말 많은데요.',
        ],
        correct: '사람이 정말 많겠어요.',
      },
    ],
    {
      uz: 'Dam olish kuni, attraksionlar bog‘ida odam ko‘p bo‘lsa kerak.',
      en: 'It is the weekend, so the amusement park must be crowded.',
      ru: 'Сегодня выходной, поэтому в парке развлечений наверняка многолюдно.',
    },
  ),

  ...build(
    'gp_s3_u8_g29_20',
    G29,
    [
      {
        options: ['아침도 못 먹고', '아침을 많이 먹고', '점심까지 푹 쉬고'],
        correct: '아침도 못 먹고',
      },
      {
        options: ['계속 일했어요?', '계속 잤어요?', '계속 쉬었어요?'],
        correct: '계속 일했어요?',
      },
      {
        options: [
          '배가 많이 고프겠어요.',
          '배가 많이 고팠어요.',
          '배가 많이 고픈데요.',
        ],
        correct: '배가 많이 고프겠어요.',
      },
    ],
    {
      uz: 'Nonushta ham qilmay ishladingizmi? Juda och bo‘lsangiz kerak.',
      en: 'You worked without breakfast? You must be very hungry.',
      ru: 'Вы работали без завтрака? Наверное, вы очень голодны.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 30. N 때문에
//
// 명사 + 때문에
// 어떤 결과가 생긴 원인·이유를 표현
//
// 특히 문제·불편·부정적인 결과의 원인을
// 말할 때 자주 사용
// ─────────────────────────────────────────────
const G30 = 'noun-ttaemune';

const G30_Q = {
  // ═══════════════════════════════════════════
  // grammar_blank 10
  // ═══════════════════════════════════════════

  ...blank(
    'gp_s3_u8_g30_01',
    G30,
    '교통 체증 때문에 약속 시간에 늦었어요.',
    '교통 체증 때문에',
    {
      uz: 'Tirbandlik sababli uchrashuvga kech qoldim.',
      en: 'I was late for the appointment because of traffic.',
      ru: 'Я опоздал на встречу из-за пробки.',
    },
  ),

  ...blank(
    'gp_s3_u8_g30_02',
    G30,
    '감기 때문에 수업에 못 갔어요.',
    '감기 때문에',
    {
      uz: 'Shamollaganim sababli darsga bora olmadim.',
      en: 'I could not go to class because of a cold.',
      ru: 'Я не смог пойти на занятие из-за простуды.',
    },
  ),

  ...blank(
    'gp_s3_u8_g30_03',
    G30,
    '갑자기 내린 비 때문에 경기가 취소됐어요.',
    '갑자기 내린 비 때문에',
    {
      uz: 'To‘satdan yog‘gan yomg‘ir sababli o‘yin bekor qilindi.',
      en: 'The game was canceled because of the sudden rain.',
      ru: 'Матч отменили из-за внезапного дождя.',
    },
  ),

  ...blank(
    'gp_s3_u8_g30_04',
    G30,
    '컴퓨터 문제 때문에 보고서를 제시간에 보내지 못했어요.',
    '컴퓨터 문제 때문에',
    {
      uz: 'Kompyuter muammosi sababli hisobotni vaqtida yubora olmadim.',
      en: 'I could not send the report on time because of a computer problem.',
      ru: 'Из-за проблемы с компьютером я не смог вовремя отправить отчёт.',
    },
  ),

  ...blank(
    'gp_s3_u8_g30_05',
    G30,
    '공사 소음 때문에 어젯밤에 잠을 잘 못 잤어요.',
    '공사 소음 때문에',
    {
      uz: 'Qurilish shovqini sababli kecha yaxshi uxlay olmadim.',
      en: 'I could not sleep well last night because of construction noise.',
      ru: 'Из-за шума стройки я плохо спал прошлой ночью.',
    },
  ),

  ...blank(
    'gp_s3_u8_g30_06',
    G30,
    '잘못된 주소 때문에 택배가 다른 곳으로 갔어요.',
    '잘못된 주소 때문에',
    {
      uz: 'Noto‘g‘ri manzil sababli posilka boshqa joyga ketdi.',
      en: 'The package went somewhere else because of the wrong address.',
      ru: 'Из-за неправильного адреса посылка ушла в другое место.',
    },
  ),

  ...blank(
    'gp_s3_u8_g30_07',
    G30,
    '시간 부족 때문에 발표 내용을 많이 줄였어요.',
    '시간 부족 때문에',
    {
      uz: 'Vaqt yetishmagani sababli taqdimot mazmunini ancha qisqartirdim.',
      en: 'Because of the lack of time, I shortened the presentation considerably.',
      ru: 'Из-за нехватки времени я сильно сократил презентацию.',
    },
  ),

  ...blank(
    'gp_s3_u8_g30_08',
    G30,
    '강한 바람 때문에 비행기가 두 시간 늦게 출발했어요.',
    '강한 바람 때문에',
    {
      uz: 'Kuchli shamol sababli samolyot ikki soat kech uchdi.',
      en: 'The plane departed two hours late because of strong winds.',
      ru: 'Из-за сильного ветра самолёт вылетел на два часа позже.',
    },
  ),

  ...blank(
    'gp_s3_u8_g30_09',
    G30,
    '작은 실수 때문에 처음부터 다시 해야 했어요.',
    '작은 실수 때문에',
    {
      uz: 'Kichik xato sababli hammasini boshidan qilishga to‘g‘ri keldi.',
      en: 'Because of a small mistake, I had to start over.',
      ru: 'Из-за небольшой ошибки пришлось начать всё сначала.',
    },
  ),

  ...blank(
    'gp_s3_u8_g30_10',
    G30,
    '휴대전화 배터리 때문에 중요한 연락을 받지 못했어요.',
    '휴대전화 배터리 때문에',
    {
      uz: 'Telefon batareyasi sababli muhim qo‘ng‘iroqni qabul qila olmadim.',
      en: 'Because of my phone battery, I missed an important call.',
      ru: 'Из-за батареи телефона я пропустил важный звонок.',
    },
  ),

  // ═══════════════════════════════════════════
  // grammar_build 10
  // ═══════════════════════════════════════════

  ...build(
    'gp_s3_u8_g30_11',
    G30,
    [
      {
        options: ['교통 체증 때문에', '교통 체증보다', '교통 체증 동안'],
        correct: '교통 체증 때문에',
        hints: {
          '교통 체증보다': '비교가 아니라 지각의 원인을 말하고 있어요.',
          '교통 체증 동안': '지속 시간을 말하는 문장이 아니에요.',
        },
      },
      {
        options: ['약속 시간에', '약속 시간을', '약속 시간이'],
        correct: '약속 시간에',
      },
      {
        options: ['늦었어요.', '도착했어요.', '기다렸어요.'],
        correct: '늦었어요.',
      },
    ],
    {
      uz: 'Tirbandlik sababli uchrashuvga kech qoldim.',
      en: 'I was late because of traffic.',
      ru: 'Я опоздал из-за пробки.',
    },
  ),

  ...build(
    'gp_s3_u8_g30_12',
    G30,
    [
      {
        options: ['감기 때문에', '감기보다', '감기 동안'],
        correct: '감기 때문에',
      },
      {
        options: ['수업에', '수업을', '수업이'],
        correct: '수업에',
      },
      {
        options: ['못 갔어요.', '잘 갔어요.', '일찍 갔어요.'],
        correct: '못 갔어요.',
      },
    ],
    {
      uz: 'Shamollaganim sababli darsga bora olmadim.',
      en: 'I could not go to class because of a cold.',
      ru: 'Я не смог пойти на занятие из-за простуды.',
    },
  ),

  ...build(
    'gp_s3_u8_g30_13',
    G30,
    [
      {
        options: [
          '갑자기 내린 비 때문에',
          '갑자기 내린 비보다',
          '갑자기 내린 비 동안',
        ],
        correct: '갑자기 내린 비 때문에',
      },
      {
        options: ['경기가', '경기를', '경기에'],
        correct: '경기가',
      },
      {
        options: ['취소됐어요.', '시작됐어요.', '계속됐어요.'],
        correct: '취소됐어요.',
      },
    ],
    {
      uz: 'To‘satdan yog‘gan yomg‘ir sababli o‘yin bekor qilindi.',
      en: 'The game was canceled because of the sudden rain.',
      ru: 'Матч отменили из-за внезапного дождя.',
    },
  ),

  ...build(
    'gp_s3_u8_g30_14',
    G30,
    [
      {
        options: ['컴퓨터 문제 때문에', '컴퓨터 문제보다', '컴퓨터 문제까지'],
        correct: '컴퓨터 문제 때문에',
      },
      {
        options: ['보고서를', '보고서가', '보고서에'],
        correct: '보고서를',
      },
      {
        options: ['제시간에', '갑자기', '밖에'],
        correct: '제시간에',
      },
      {
        options: ['보내지 못했어요.', '보내 버렸어요.', '보내고 나서요.'],
        correct: '보내지 못했어요.',
      },
    ],
    {
      uz: 'Kompyuter muammosi sababli hisobotni vaqtida yubora olmadim.',
      en: 'I could not send the report on time because of a computer problem.',
      ru: 'Из-за проблемы с компьютером я не смог вовремя отправить отчёт.',
    },
  ),

  ...build(
    'gp_s3_u8_g30_15',
    G30,
    [
      {
        options: ['공사 소음 때문에', '공사 소음보다', '공사 소음이나'],
        correct: '공사 소음 때문에',
      },
      {
        options: ['어젯밤에', '내일 밤에', '다음 주에'],
        correct: '어젯밤에',
      },
      {
        options: ['잠을', '잠이', '잠에'],
        correct: '잠을',
      },
      {
        options: ['잘 못 잤어요.', '푹 잘 잤어요.', '일찍 일어났어요.'],
        correct: '잘 못 잤어요.',
      },
    ],
    {
      uz: 'Qurilish shovqini sababli kecha yaxshi uxlay olmadim.',
      en: 'I could not sleep well because of construction noise.',
      ru: 'Из-за шума стройки я плохо спал.',
    },
  ),

  ...build(
    'gp_s3_u8_g30_16',
    G30,
    [
      {
        options: ['잘못된 주소 때문에', '정확한 주소 때문에', '주소보다'],
        correct: '잘못된 주소 때문에',
      },
      {
        options: ['택배가', '택배를', '택배에'],
        correct: '택배가',
      },
      {
        options: ['다른 곳으로', '제 주소로 정확히', '집 안에서'],
        correct: '다른 곳으로',
      },
      {
        options: ['갔어요.', '도착했어요.', '왔어요.'],
        correct: '갔어요.',
      },
    ],
    {
      uz: 'Noto‘g‘ri manzil sababli posilka boshqa joyga ketdi.',
      en: 'The package went to the wrong place because of the incorrect address.',
      ru: 'Из-за неправильного адреса посылка ушла в другое место.',
    },
  ),

  ...build(
    'gp_s3_u8_g30_17',
    G30,
    [
      {
        options: ['시간 부족 때문에', '시간이 충분해서', '시간보다'],
        correct: '시간 부족 때문에',
      },
      {
        options: ['발표 내용을', '발표 내용이', '발표 내용에'],
        correct: '발표 내용을',
      },
      {
        options: ['많이 줄였어요.', '더 늘렸어요.', '전혀 바꾸지 않았어요.'],
        correct: '많이 줄였어요.',
      },
    ],
    {
      uz: 'Vaqt yetishmagani uchun taqdimotni ancha qisqartirdim.',
      en: 'I shortened the presentation because of the lack of time.',
      ru: 'Из-за нехватки времени я сильно сократил презентацию.',
    },
  ),

  ...build(
    'gp_s3_u8_g30_18',
    G30,
    [
      {
        options: ['강한 바람 때문에', '좋은 날씨 때문에', '바람보다'],
        correct: '강한 바람 때문에',
      },
      {
        options: ['비행기가', '비행기를', '비행기에'],
        correct: '비행기가',
      },
      {
        options: ['두 시간 늦게', '두 시간 일찍', '정확한 시간에'],
        correct: '두 시간 늦게',
      },
      {
        options: ['출발했어요.', '도착했어요.', '예약했어요.'],
        correct: '출발했어요.',
      },
    ],
    {
      uz: 'Kuchli shamol sababli samolyot ikki soat kech uchdi.',
      en: 'The plane departed two hours late because of strong winds.',
      ru: 'Из-за сильного ветра самолёт вылетел на два часа позже.',
    },
  ),

  ...build(
    'gp_s3_u8_g30_19',
    G30,
    [
      {
        options: ['작은 실수 때문에', '완벽한 결과 때문에', '실수보다'],
        correct: '작은 실수 때문에',
      },
      {
        options: ['처음부터', '마지막만', '중간부터만'],
        correct: '처음부터',
      },
      {
        options: [
          '다시 해야 했어요.',
          '끝낼 수 있었어요.',
          '바꿀 필요가 없었어요.',
        ],
        correct: '다시 해야 했어요.',
      },
    ],
    {
      uz: 'Kichik xato sababli boshidan qayta qilishim kerak bo‘ldi.',
      en: 'Because of a small mistake, I had to start over.',
      ru: 'Из-за небольшой ошибки пришлось начать сначала.',
    },
  ),

  ...build(
    'gp_s3_u8_g30_20',
    G30,
    [
      {
        options: ['휴대전화 배터리 때문에', '충전기보다', '휴대전화 동안'],
        correct: '휴대전화 배터리 때문에',
      },
      {
        options: ['중요한 연락을', '중요한 연락이', '중요한 연락에'],
        correct: '중요한 연락을',
      },
      {
        options: ['받지 못했어요.', '잘 받았어요.', '먼저 했어요.'],
        correct: '받지 못했어요.',
      },
    ],
    {
      uz: 'Telefon batareyasi sababli muhim qo‘ng‘iroqni qabul qila olmadim.',
      en: 'I missed an important call because of my phone battery.',
      ru: 'Из-за батареи телефона я пропустил важный звонок.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 31. V-아/어 버리다
//
// V-아/어 버리다
//
// 어떤 행동이 완전히 끝남을 강조
// 상황에 따라 아쉬움·후회·당황 또는 후련함을 표현
//
// 먹다 → 먹어 버리다
// 지우다 → 지워 버리다
// 끝내다 → 끝내 버리다
// ─────────────────────────────────────────────
const G31 = 'verb-a-eo-beorida';

const G31_Q = {
  // ═══════════════════════════════════════════
  // grammar_blank 10
  // ═══════════════════════════════════════════

  ...blank(
    'gp_s3_u8_g31_01',
    G31,
    '배가 너무 고파서 케이크를 혼자 다 먹어 버렸어요.',
    '다 먹어 버렸어요',
    {
      uz: 'Juda och bo‘lganim uchun tortning hammasini yolg‘iz yeb qo‘ydim.',
      en: 'I was so hungry that I ended up eating the whole cake by myself.',
      ru: 'Я был так голоден, что съел весь торт один.',
    },
  ),

  ...blank(
    'gp_s3_u8_g31_02',
    G31,
    '실수로 중요한 파일을 지워 버렸어요.',
    '지워 버렸어요',
    {
      uz: 'Adashib muhim faylni o‘chirib yubordim.',
      en: 'I accidentally deleted an important file.',
      ru: 'Я случайно удалил важный файл.',
    },
  ),

  ...blank(
    'gp_s3_u8_g31_03',
    G31,
    '버스에서 졸다가 내려야 할 정류장을 지나쳐 버렸어요.',
    '지나쳐 버렸어요',
    {
      uz: 'Avtobusda uxlab qolib, tushishim kerak bo‘lgan bekatdan o‘tib ketdim.',
      en: 'I dozed off on the bus and ended up missing my stop.',
      ru: 'Я задремал в автобусе и проехал свою остановку.',
    },
  ),

  ...blank(
    'gp_s3_u8_g31_04',
    G31,
    '화가 나서 친구에게 너무 심한 말을 해 버렸어요.',
    '심한 말을 해 버렸어요',
    {
      uz: 'Jahlim chiqib, do‘stimga juda og‘ir gap aytib yubordim.',
      en: 'I got angry and ended up saying something very harsh to my friend.',
      ru: 'Я разозлился и сказал другу слишком резкие слова.',
    },
  ),

  ...blank(
    'gp_s3_u8_g31_05',
    G31,
    '마감이 오늘이라서 보고서를 밤새 다 끝내 버렸어요.',
    '다 끝내 버렸어요',
    {
      uz: 'Muddat bugun bo‘lgani uchun hisobotni tun bo‘yi ishlab butunlay tugatdim.',
      en: 'Since the deadline was today, I stayed up and finished the entire report.',
      ru: 'Поскольку срок был сегодня, я за ночь полностью закончил отчёт.',
    },
  ),

  ...blank(
    'gp_s3_u8_g31_06',
    G31,
    '잠깐 한눈을 판 사이에 우유가 넘쳐 버렸어요.',
    '우유가 넘쳐 버렸어요',
    {
      uz: 'Bir zum chalg‘iganimda sut toshib ketdi.',
      en: 'While I looked away for a moment, the milk boiled over.',
      ru: 'Пока я на секунду отвлёкся, молоко убежало.',
    },
  ),

  ...blank(
    'gp_s3_u8_g31_07',
    G31,
    '휴대전화를 떨어뜨려서 화면을 깨뜨려 버렸어요.',
    '화면을 깨뜨려 버렸어요',
    {
      uz: 'Telefonni tushirib yuborib, ekranini sindirib qo‘ydim.',
      en: 'I dropped my phone and ended up breaking the screen.',
      ru: 'Я уронил телефон и разбил экран.',
    },
  ),

  ...blank(
    'gp_s3_u8_g31_08',
    G31,
    '오랫동안 고민하다가 결국 그 계획을 포기해 버렸어요.',
    '그 계획을 포기해 버렸어요',
    {
      uz: 'Uzoq o‘ylaganimdan keyin oxiri o‘sha rejadan voz kechdim.',
      en: 'After thinking about it for a long time, I finally gave up on the plan.',
      ru: 'После долгих раздумий я в конце концов отказался от этого плана.',
    },
  ),

  ...blank(
    'gp_s3_u8_g31_09',
    G31,
    '기다리던 콘서트 표가 벌써 다 팔려 버렸어요.',
    '다 팔려 버렸어요',
    {
      uz: 'Kutgan konsert chiptalarining hammasi allaqachon sotilib ketibdi.',
      en: 'The concert tickets I had been waiting for are already completely sold out.',
      ru: 'Все билеты на долгожданный концерт уже распроданы.',
    },
  ),

  ...blank(
    'gp_s3_u8_g31_10',
    G31,
    '해야 할 일을 오전에 전부 해 버려서 오후에는 쉴 수 있었어요.',
    '전부 해 버려서',
    {
      uz: 'Qilishim kerak bo‘lgan ishlarning hammasini ertalab tugatib, tushdan keyin dam oldim.',
      en: 'I finished everything I had to do in the morning, so I could rest in the afternoon.',
      ru: 'Я закончил все дела утром, поэтому после обеда смог отдохнуть.',
    },
  ),

  // ═══════════════════════════════════════════
  // grammar_build 10
  // ═══════════════════════════════════════════

  ...build(
    'gp_s3_u8_g31_11',
    G31,
    [
      {
        options: [
          '배가 너무 고파서',
          '배가 불러서',
          '아무것도 먹고 싶지 않아서',
        ],
        correct: '배가 너무 고파서',
      },
      {
        options: ['케이크를', '케이크가', '케이크에'],
        correct: '케이크를',
      },
      {
        options: ['혼자 다', '조금만', '한 입도 안'],
        correct: '혼자 다',
      },
      {
        options: ['먹어 버렸어요.', '먹고 있어요.', '먹으려고 해요.'],
        correct: '먹어 버렸어요.',
        hints: {
          '먹고 있어요.':
            '행동이 진행 중인 것이 아니라 전부 끝난 결과를 강조해요.',
          '먹으려고 해요.':
            '앞으로 먹으려는 의도가 아니라 이미 먹은 상황이에요.',
        },
      },
    ],
    {
      uz: 'Juda och bo‘lganim uchun tortning hammasini yeb qo‘ydim.',
      en: 'I was so hungry that I ate the whole cake.',
      ru: 'Я был так голоден, что съел весь торт.',
    },
  ),

  ...build(
    'gp_s3_u8_g31_12',
    G31,
    [
      {
        options: ['실수로', '일부러', '조심해서'],
        correct: '실수로',
      },
      {
        options: ['중요한 파일을', '중요한 파일이', '중요한 파일에'],
        correct: '중요한 파일을',
      },
      {
        options: ['지워 버렸어요.', '지우고 있어요.', '지우려고 해요.'],
        correct: '지워 버렸어요.',
      },
    ],
    {
      uz: 'Adashib muhim faylni o‘chirib yubordim.',
      en: 'I accidentally deleted an important file.',
      ru: 'Я случайно удалил важный файл.',
    },
  ),

  ...build(
    'gp_s3_u8_g31_13',
    G31,
    [
      {
        options: ['버스에서 졸다가', '버스에서 내리고 나서', '버스를 타려고'],
        correct: '버스에서 졸다가',
      },
      {
        options: [
          '내려야 할 정류장을',
          '내려야 할 정류장이',
          '내려야 할 정류장에',
        ],
        correct: '내려야 할 정류장을',
      },
      {
        options: ['지나쳐 버렸어요.', '지나치고 있어요.', '지나치려고 해요.'],
        correct: '지나쳐 버렸어요.',
      },
    ],
    {
      uz: 'Avtobusda uxlab qolib, bekatdan o‘tib ketdim.',
      en: 'I dozed off and missed my stop.',
      ru: 'Я задремал и проехал свою остановку.',
    },
  ),

  ...build(
    'gp_s3_u8_g31_14',
    G31,
    [
      {
        options: ['화가 나서', '기분이 좋아서', '차분하게 생각해서'],
        correct: '화가 나서',
      },
      {
        options: ['친구에게', '친구를', '친구가'],
        correct: '친구에게',
      },
      {
        options: ['너무 심한 말을', '따뜻한 인사를', '칭찬을'],
        correct: '너무 심한 말을',
      },
      {
        options: ['해 버렸어요.', '하고 있어요.', '하려고 해요.'],
        correct: '해 버렸어요.',
      },
    ],
    {
      uz: 'Jahlim chiqib, do‘stimga og‘ir gap aytib yubordim.',
      en: 'I got angry and said something harsh to my friend.',
      ru: 'Я разозлился и сказал другу резкие слова.',
    },
  ),

  ...build(
    'gp_s3_u8_g31_15',
    G31,
    [
      {
        options: [
          '마감이 오늘이라서',
          '마감이 다음 달이라서',
          '할 일이 없어서',
        ],
        correct: '마감이 오늘이라서',
      },
      {
        options: ['보고서를', '보고서가', '보고서에'],
        correct: '보고서를',
      },
      {
        options: ['밤새 다', '조금만', '아직 반도 못'],
        correct: '밤새 다',
      },
      {
        options: ['끝내 버렸어요.', '끝내고 있어요.', '끝내려고 해요.'],
        correct: '끝내 버렸어요.',
      },
    ],
    {
      uz: 'Muddat bugun bo‘lgani uchun hisobotni tun bo‘yi ishlab tugatdim.',
      en: 'The deadline was today, so I finished the whole report overnight.',
      ru: 'Срок был сегодня, поэтому я за ночь закончил весь отчёт.',
    },
  ),

  ...build(
    'gp_s3_u8_g31_16',
    G31,
    [
      {
        options: [
          '잠깐 한눈을 판 사이에',
          '계속 냄비를 보고 있어서',
          '불을 끈 후에',
        ],
        correct: '잠깐 한눈을 판 사이에',
      },
      {
        options: ['우유가', '우유를', '우유에'],
        correct: '우유가',
      },
      {
        options: ['넘쳐 버렸어요.', '넘치고 싶어요.', '넘치려고 했어요.'],
        correct: '넘쳐 버렸어요.',
      },
    ],
    {
      uz: 'Bir zum chalg‘iganimda sut toshib ketdi.',
      en: 'I looked away for a moment and the milk boiled over.',
      ru: 'Я отвлёкся на секунду, и молоко убежало.',
    },
  ),

  ...build(
    'gp_s3_u8_g31_17',
    G31,
    [
      {
        options: [
          '휴대전화를 떨어뜨려서',
          '휴대전화를 조심히 놓아서',
          '새 휴대전화를 사서',
        ],
        correct: '휴대전화를 떨어뜨려서',
      },
      {
        options: ['화면을', '화면이', '화면에'],
        correct: '화면을',
      },
      {
        options: ['깨뜨려 버렸어요.', '깨뜨리고 있어요.', '깨뜨리려고 해요.'],
        correct: '깨뜨려 버렸어요.',
      },
    ],
    {
      uz: 'Telefonni tushirib yuborib, ekranini sindirdim.',
      en: 'I dropped my phone and broke the screen.',
      ru: 'Я уронил телефон и разбил экран.',
    },
  ),

  ...build(
    'gp_s3_u8_g31_18',
    G31,
    [
      {
        options: [
          '오랫동안 고민하다가',
          '아무 생각 없이 바로',
          '계획이 성공해서',
        ],
        correct: '오랫동안 고민하다가',
      },
      {
        options: ['결국', '아직', '전혀'],
        correct: '결국',
      },
      {
        options: ['그 계획을', '그 계획이', '그 계획에'],
        correct: '그 계획을',
      },
      {
        options: ['포기해 버렸어요.', '포기하고 있어요.', '포기하려고 해요.'],
        correct: '포기해 버렸어요.',
      },
    ],
    {
      uz: 'Uzoq o‘ylab, oxiri rejadan voz kechdim.',
      en: 'After a lot of thought, I finally gave up on the plan.',
      ru: 'После долгих раздумий я в итоге отказался от плана.',
    },
  ),

  ...build(
    'gp_s3_u8_g31_19',
    G31,
    [
      {
        options: [
          '기다리던 콘서트 표가',
          '새로 나온 콘서트 표를',
          '아직 판매하지 않는 표가',
        ],
        correct: '기다리던 콘서트 표가',
      },
      {
        options: ['벌써', '아직', '앞으로'],
        correct: '벌써',
      },
      {
        options: ['다 팔려 버렸어요.', '다 팔고 있어요.', '다 팔려고 해요.'],
        correct: '다 팔려 버렸어요.',
      },
    ],
    {
      uz: 'Kutgan konsert chiptalarining hammasi sotilib ketibdi.',
      en: 'The concert tickets are already completely sold out.',
      ru: 'Все билеты на концерт уже распроданы.',
    },
  ),

  ...build(
    'gp_s3_u8_g31_20',
    G31,
    [
      {
        options: ['해야 할 일을', '내일 할 일을', '하지 않아도 되는 일을'],
        correct: '해야 할 일을',
      },
      {
        options: ['오전에', '밤늦게', '다음 주에'],
        correct: '오전에',
      },
      {
        options: ['전부 해 버려서', '조금 하고 있어서', '하려고 해서'],
        correct: '전부 해 버려서',
      },
      {
        options: [
          '오후에는 쉴 수 있었어요.',
          '오후에도 계속 일해야 했어요.',
          '오후에는 시작했어요.',
        ],
        correct: '오후에는 쉴 수 있었어요.',
      },
    ],
    {
      uz: 'Hamma ishni ertalab tugatib, tushdan keyin dam oldim.',
      en: 'I finished everything in the morning, so I could rest in the afternoon.',
      ru: 'Я закончил все дела утром и смог отдохнуть после обеда.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 32. A/V-(으)ㄹ 때
//
// 받침 O → -을 때
// 받침 X / ㄹ 받침 → -ㄹ 때
//
// 어떤 행동·상태가 일어나는 시간이나 상황을 표현
//
// 먹다 → 먹을 때
// 가다 → 갈 때
// 살다 → 살 때
// 춥다 → 추울 때
// 걷다 → 걸을 때
// ─────────────────────────────────────────────
const G32 = 'av-eul-ttae';

const G32_Q = {
  // ═══════════════════════════════════════════
  // grammar_blank 10
  // ═══════════════════════════════════════════

  ...blank(
    'gp_s3_u8_g32_01',
    G32,
    '한국어 단어를 외울 때 예문도 같이 보면 좋아요.',
    '한국어 단어를 외울 때',
    {
      uz: 'Koreyscha so‘zlarni yodlayotganda misollarni ham birga ko‘rgan yaxshi.',
      en: 'When memorizing Korean words, it helps to look at example sentences too.',
      ru: 'Когда учите корейские слова, полезно смотреть и примеры.',
    },
  ),

  ...blank(
    'gp_s3_u8_g32_02',
    G32,
    '지하철을 탈 때 교통카드를 미리 준비하세요.',
    '지하철을 탈 때',
    {
      uz: 'Metroga chiqayotganda transport kartangizni oldindan tayyorlang.',
      en: 'When taking the subway, prepare your transportation card in advance.',
      ru: 'Когда садитесь в метро, заранее приготовьте транспортную карту.',
    },
  ),

  ...blank(
    'gp_s3_u8_g32_03',
    G32,
    '날씨가 추울 때는 따뜻한 국물이 생각나요.',
    '날씨가 추울 때는',
    {
      uz: 'Havo sovuq bo‘lganda issiq sho‘rva yegim keladi.',
      en: 'When the weather is cold, I crave hot soup.',
      ru: 'Когда холодно, хочется горячего супа.',
    },
  ),

  ...blank(
    'gp_s3_u8_g32_04',
    G32,
    '처음 만나는 사람과 이야기할 때는 존댓말을 쓰는 게 좋아요.',
    '이야기할 때는',
    {
      uz: 'Birinchi marta uchrashgan odam bilan gaplashganda hurmat shaklidan foydalangan yaxshi.',
      en: 'When speaking with someone you have just met, it is better to use polite speech.',
      ru: 'Когда разговариваете с человеком впервые, лучше использовать вежливую речь.',
    },
  ),

  ...blank(
    'gp_s3_u8_g32_05',
    G32,
    '시험 문제를 풀 때 문제를 끝까지 잘 읽으세요.',
    '시험 문제를 풀 때',
    {
      uz: 'Imtihon savollarini yechayotganda savolni oxirigacha diqqat bilan o‘qing.',
      en: 'When solving exam questions, read each question carefully to the end.',
      ru: 'Когда решаете экзаменационные задания, внимательно читайте вопрос до конца.',
    },
  ),

  ...blank(
    'gp_s3_u8_g32_06',
    G32,
    '길을 걸을 때 휴대전화만 보지 마세요.',
    '길을 걸을 때',
    {
      uz: 'Ko‘chada yurganda faqat telefoningizga qaramang.',
      en: 'When walking on the street, do not look only at your phone.',
      ru: 'Когда идёте по улице, не смотрите только в телефон.',
    },
  ),

  ...blank(
    'gp_s3_u8_g32_07',
    G32,
    '혼자 외국에서 살 때 가족이 많이 보고 싶었어요.',
    '외국에서 살 때',
    {
      uz: 'Chet elda yolg‘iz yashaganimda oilamni juda sog‘indim.',
      en: 'When I lived abroad alone, I missed my family a lot.',
      ru: 'Когда я жил один за границей, я очень скучал по семье.',
    },
  ),

  ...blank(
    'gp_s3_u8_g32_08',
    G32,
    '중요한 결정을 할 때는 충분히 생각한 후에 결정하는 편이에요.',
    '중요한 결정을 할 때는',
    {
      uz: 'Muhim qaror qilayotganda yaxshilab o‘ylab keyin qaror qilaman.',
      en: 'When making an important decision, I tend to think carefully first.',
      ru: 'Когда принимаю важное решение, я обычно сначала хорошо всё обдумываю.',
    },
  ),

  ...blank(
    'gp_s3_u8_g32_09',
    G32,
    '한국 드라마를 볼 때 모르는 표현을 메모해요.',
    '한국 드라마를 볼 때',
    {
      uz: 'Koreys dramasini ko‘rayotganda bilmagan iboralarni yozib olaman.',
      en: 'When I watch Korean dramas, I write down expressions I do not know.',
      ru: 'Когда смотрю корейские дорамы, записываю незнакомые выражения.',
    },
  ),

  ...blank(
    'gp_s3_u8_g32_10',
    G32,
    '마음이 힘들 때 혼자 고민하지 말고 친구와 이야기해 보세요.',
    '마음이 힘들 때',
    {
      uz: 'Ruhiy jihatdan qiynalganingizda yolg‘iz o‘ylamang, do‘stingiz bilan gaplashib ko‘ring.',
      en: 'When you are having a hard time emotionally, do not struggle alone; try talking to a friend.',
      ru: 'Когда вам эмоционально тяжело, не переживайте в одиночку — поговорите с другом.',
    },
  ),

  // ═══════════════════════════════════════════
  // grammar_build 10
  // ═══════════════════════════════════════════

  ...build(
    'gp_s3_u8_g32_11',
    G32,
    [
      {
        options: ['한국어 단어를', '한국어 단어가', '한국어 단어에'],
        correct: '한국어 단어를',
      },
      {
        options: ['외울 때', '외우는 동안만', '외우고 나서'],
        correct: '외울 때',
        hints: {
          '외우는 동안만':
            '행동의 지속 기간 자체보다 그 상황에서 도움이 되는 방법을 말해요.',
          '외우고 나서': '암기를 다 끝낸 뒤가 아니라 외우는 상황을 말해요.',
        },
      },
      {
        options: ['예문도', '예문보다', '예문밖에'],
        correct: '예문도',
      },
      {
        options: [
          '같이 보면 좋아요.',
          '같이 버리면 좋아요.',
          '같이 끝내면 좋아요.',
        ],
        correct: '같이 보면 좋아요.',
      },
    ],
    {
      uz: 'So‘zlarni yodlaganda misollarni ham birga ko‘rgan yaxshi.',
      en: 'When memorizing words, it helps to look at examples too.',
      ru: 'Когда учите слова, полезно смотреть и примеры.',
    },
  ),

  ...build(
    'gp_s3_u8_g32_12',
    G32,
    [
      {
        options: ['지하철을', '지하철이', '지하철에'],
        correct: '지하철을',
      },
      {
        options: ['탈 때', '탄 후에', '타다가'],
        correct: '탈 때',
      },
      {
        options: ['교통카드를', '교통카드가', '교통카드에'],
        correct: '교통카드를',
      },
      {
        options: ['미리 준비하세요.', '나중에 버리세요.', '집에 두세요.'],
        correct: '미리 준비하세요.',
      },
    ],
    {
      uz: 'Metroga chiqayotganda kartani oldindan tayyorlang.',
      en: 'Prepare your transportation card when taking the subway.',
      ru: 'Когда садитесь в метро, заранее приготовьте транспортную карту.',
    },
  ),

  ...build(
    'gp_s3_u8_g32_13',
    G32,
    [
      {
        options: ['날씨가', '날씨를', '날씨에'],
        correct: '날씨가',
      },
      {
        options: ['추울 때는', '춥을 때는', '추운 때는'],
        correct: '추울 때는',
        hints: {
          '춥을 때는': "ㅂ 불규칙 형용사 '춥다'는 '추울 때'가 돼요.",
          '추운 때는':
            "목표 문법은 A/V-(으)ㄹ 때이고, '추울 때'가 자연스러워요.",
        },
      },
      {
        options: ['따뜻한 국물이', '차가운 얼음이', '여름 바다가'],
        correct: '따뜻한 국물이',
      },
      {
        options: ['생각나요.', '출발해요.', '도착해요.'],
        correct: '생각나요.',
      },
    ],
    {
      uz: 'Havo sovuq bo‘lganda issiq sho‘rva yegim keladi.',
      en: 'When it is cold, I crave hot soup.',
      ru: 'Когда холодно, хочется горячего супа.',
    },
  ),

  ...build(
    'gp_s3_u8_g32_14',
    G32,
    [
      {
        options: ['처음 만나는 사람과', '오래된 친구와', '혼자'],
        correct: '처음 만나는 사람과',
      },
      {
        options: ['이야기할 때는', '이야기하고 나서', '이야기하다가'],
        correct: '이야기할 때는',
      },
      {
        options: ['존댓말을', '반말만', '아무 말도'],
        correct: '존댓말을',
      },
      {
        options: ['쓰는 게 좋아요.', '버리는 게 좋아요.', '잊는 게 좋아요.'],
        correct: '쓰는 게 좋아요.',
      },
    ],
    {
      uz: 'Birinchi uchrashgan odam bilan gaplashganda hurmat shaklidan foydalangan yaxshi.',
      en: 'When speaking with someone for the first time, it is better to use polite speech.',
      ru: 'При первом разговоре с человеком лучше использовать вежливую речь.',
    },
  ),

  ...build(
    'gp_s3_u8_g32_15',
    G32,
    [
      {
        options: ['시험 문제를', '시험 문제가', '시험 문제에'],
        correct: '시험 문제를',
      },
      {
        options: ['풀 때', '푼 후에', '풀다가만'],
        correct: '풀 때',
      },
      {
        options: ['문제를', '문제가', '문제에'],
        correct: '문제를',
      },
      {
        options: [
          '끝까지 잘 읽으세요.',
          '중간까지만 읽으세요.',
          '읽지 마세요.',
        ],
        correct: '끝까지 잘 읽으세요.',
      },
    ],
    {
      uz: 'Imtihon savollarini yechayotganda savolni oxirigacha o‘qing.',
      en: 'When solving exam questions, read them all the way through.',
      ru: 'При решении экзаменационных заданий читайте вопрос до конца.',
    },
  ),

  ...build(
    'gp_s3_u8_g32_16',
    G32,
    [
      {
        options: ['길을', '길이', '길에'],
        correct: '길을',
      },
      {
        options: ['걸을 때', '걷을 때', '걷는 후에'],
        correct: '걸을 때',
        hints: {
          '걷을 때':
            "ㄷ 불규칙 동사 '걷다'는 모음으로 시작하는 어미 앞에서 '걸-'이 돼요.",
          '걷는 후에':
            '「후에」를 쓰려면 다른 형태가 필요하고, 여기서는 상황을 나타내는 「-(으)ㄹ 때」예요.',
        },
      },
      {
        options: ['휴대전화만', '앞도', '신호등도'],
        correct: '휴대전화만',
      },
      {
        options: ['보지 마세요.', '보세요.', '찾아보세요.'],
        correct: '보지 마세요.',
      },
    ],
    {
      uz: 'Ko‘chada yurganda faqat telefoningizga qaramang.',
      en: 'Do not look only at your phone while walking.',
      ru: 'Когда идёте по улице, не смотрите только в телефон.',
    },
  ),

  ...build(
    'gp_s3_u8_g32_17',
    G32,
    [
      {
        options: ['혼자', '가족과 같이', '친구 집에서 잠깐'],
        correct: '혼자',
      },
      {
        options: ['외국에서', '고향에', '교실을'],
        correct: '외국에서',
      },
      {
        options: ['살 때', '살을 때', '사는 후에'],
        correct: '살 때',
        hints: {
          '살을 때': "ㄹ 받침 동사 '살다'는 '살 때'라고 해요.",
          '사는 후에': '여기서는 특정 시절·상황을 말하므로 「살 때」가 맞아요.',
        },
      },
      {
        options: [
          '가족이 많이 보고 싶었어요.',
          '가족을 잊어버렸어요.',
          '가족이 싫었어요.',
        ],
        correct: '가족이 많이 보고 싶었어요.',
      },
    ],
    {
      uz: 'Chet elda yolg‘iz yashaganimda oilamni juda sog‘indim.',
      en: 'When I lived abroad alone, I missed my family a lot.',
      ru: 'Когда я жил один за границей, я очень скучал по семье.',
    },
  ),

  ...build(
    'gp_s3_u8_g32_18',
    G32,
    [
      {
        options: ['중요한 결정을', '간단한 인사를', '점심을'],
        correct: '중요한 결정을',
      },
      {
        options: ['할 때는', '하고 나서는', '하다가는'],
        correct: '할 때는',
      },
      {
        options: ['충분히 생각한 후에', '아무 생각 없이', '무조건 바로'],
        correct: '충분히 생각한 후에',
      },
      {
        options: ['결정하는 편이에요.', '잊는 편이에요.', '미루기만 해요.'],
        correct: '결정하는 편이에요.',
      },
    ],
    {
      uz: 'Muhim qaror qilganda yaxshilab o‘ylab keyin qaror qilaman.',
      en: 'When making an important decision, I usually think carefully first.',
      ru: 'Принимая важное решение, я обычно сначала хорошо всё обдумываю.',
    },
  ),

  ...build(
    'gp_s3_u8_g32_19',
    G32,
    [
      {
        options: ['한국 드라마를', '한국 드라마가', '한국 드라마에'],
        correct: '한국 드라마를',
      },
      {
        options: ['볼 때', '본 후에만', '보다가만'],
        correct: '볼 때',
      },
      {
        options: ['모르는 표현을', '아는 표현만', '배우지 않은 사람을'],
        correct: '모르는 표현을',
      },
      {
        options: ['메모해요.', '지워 버려요.', '잊어요.'],
        correct: '메모해요.',
      },
    ],
    {
      uz: 'Koreys dramasini ko‘rganda bilmagan iboralarni yozib olaman.',
      en: 'When watching Korean dramas, I write down unfamiliar expressions.',
      ru: 'Когда смотрю корейские дорамы, записываю незнакомые выражения.',
    },
  ),

  ...build(
    'gp_s3_u8_g32_20',
    G32,
    [
      {
        options: ['마음이', '마음을', '마음에'],
        correct: '마음이',
      },
      {
        options: ['힘들 때', '힘든 후에만', '힘들다가'],
        correct: '힘들 때',
      },
      {
        options: [
          '혼자 고민하지 말고',
          '아무에게도 말하지 말고',
          '계속 참기만 하고',
        ],
        correct: '혼자 고민하지 말고',
      },
      {
        options: [
          '친구와 이야기해 보세요.',
          '친구를 피하세요.',
          '친구에게 화를 내세요.',
        ],
        correct: '친구와 이야기해 보세요.',
      },
    ],
    {
      uz: 'Qiynalganingizda yolg‘iz qolmang, do‘stingiz bilan gaplashib ko‘ring.',
      en: 'When you are having a hard time, do not struggle alone; talk to a friend.',
      ru: 'Когда вам тяжело, не переживайте в одиночку — поговорите с другом.',
    },
  ),
};

// ═══════════════════════════════════════════════════════════
// UNIT 9
// 배경·완곡한 말끝 · 진행 중 · 자연스러운 질문 · 한정
// ═══════════════════════════════════════════════════════════

// ─────────────────────────────────────────────
// 문법 33. A-(으)ㄴ데요, V-는데요, N인데요
//
// 문장 끝에서 상황·배경을 설명하거나
// 상대방의 반응을 기다리거나
// 말을 부드럽게 이어 갈 때 사용
//
// A 받침 O → -은데요
// A 받침 X → -ㄴ데요
// A ㄹ 받침 → ㄹ 탈락 + -ㄴ데요
// V → -는데요
// V ㄹ 받침 → ㄹ 탈락 + -는데요
// N → -인데요
// ─────────────────────────────────────────────
const G33 = 'av-n-neundeyo';

const G33_Q = {
  // ═══════════════════════════════════════════
  // grammar_blank 10
  // ═══════════════════════════════════════════

  ...blank(
    'gp_s3_u9_g33_01',
    G33,
    '문의할 게 있는데요. 잠깐 질문해도 될까요?',
    '문의할 게 있는데요',
    {
      uz: 'Bir narsani so‘ramoqchi edim. Bir savol bersam bo‘ladimi?',
      en: 'I have something I would like to ask about. May I ask you a question?',
      ru: 'Я хотел кое-что уточнить. Можно задать вопрос?',
    },
  ),

  ...blank(
    'gp_s3_u9_g33_02',
    G33,
    '이 옷은 디자인은 예쁜데요. 저한테는 조금 큰 것 같아요.',
    '디자인은 예쁜데요',
    {
      uz: 'Bu kiyimning dizayni chiroyli, но men uchun biroz kattadek.',
      en: 'The design of these clothes is pretty, but I think they are a little big for me.',
      ru: 'Дизайн этой одежды красивый, но, кажется, она мне немного велика.',
    },
  ),

  ...blank(
    'gp_s3_u9_g33_03',
    G33,
    '지금 회의 중인데요. 끝나고 다시 전화해도 될까요?',
    '지금 회의 중인데요',
    {
      uz: 'Hozir yig‘ilishdaman. Tugagach qayta qo‘ng‘iroq qilsam bo‘ladimi?',
      en: 'I am in a meeting right now. Can I call you back when it is over?',
      ru: 'Я сейчас на совещании. Можно перезвонить после него?',
    },
  ),

  ...blank(
    'gp_s3_u9_g33_04',
    G33,
    '제가 처음 하는 일인데요. 어떻게 하면 되는지 알려 주세요.',
    '처음 하는 일인데요',
    {
      uz: 'Men buni birinchi marta qilyapman. Qanday qilishni aytib bering.',
      en: 'This is my first time doing this. Please tell me what I should do.',
      ru: 'Я делаю это впервые. Подскажите, пожалуйста, что нужно делать.',
    },
  ),

  ...blank(
    'gp_s3_u9_g33_05',
    G33,
    '밖에 비가 많이 오는데요. 우산 가지고 가세요.',
    '비가 많이 오는데요',
    {
      uz: 'Tashqarida kuchli yomg‘ir yog‘yapti. Soyabon olib boring.',
      en: 'It is raining heavily outside. Take an umbrella with you.',
      ru: 'На улице сильный дождь. Возьмите с собой зонт.',
    },
  ),

  ...blank(
    'gp_s3_u9_g33_06',
    G33,
    '이 식당은 생각보다 비싼데요. 다른 곳도 알아볼까요?',
    '생각보다 비싼데요',
    {
      uz: 'Bu restoran o‘ylaganimizdan qimmatroq ekan. Boshqa joyni ham qidiramizmi?',
      en: 'This restaurant is more expensive than I expected. Shall we look for another place?',
      ru: 'Этот ресторан дороже, чем я думал. Может, посмотрим другое место?',
    },
  ),

  ...blank(
    'gp_s3_u9_g33_07',
    G33,
    '민수 씨가 오늘 회사에 안 왔는데요. 무슨 일이 있는지 모르겠어요.',
    '오늘 회사에 안 왔는데요',
    {
      uz: 'Minsu bugun ishga kelmadi. Nima bo‘lganini bilmayman.',
      en: 'Minsu did not come to work today. I wonder if something happened.',
      ru: 'Минсу сегодня не пришёл на работу. Не знаю, что случилось.',
    },
  ),

  ...blank(
    'gp_s3_u9_g33_08',
    G33,
    '제가 찾는 사람은 김민수 씨인데요. 혹시 아세요?',
    '김민수 씨인데요',
    {
      uz: 'Men qidirayotgan odam Kim Minsu. Balki uni bilarsiz?',
      en: 'The person I am looking for is Kim Minsu. Do you happen to know him?',
      ru: 'Человека, которого я ищу, зовут Ким Минсу. Вы случайно его не знаете?',
    },
  ),

  ...blank(
    'gp_s3_u9_g33_09',
    G33,
    '여기에서 역까지는 조금 먼데요. 버스를 타는 게 좋겠어요.',
    '조금 먼데요',
    {
      uz: 'Bu yerdan bekatgacha biroz uzoq. Avtobusda borgan yaxshi.',
      en: 'The station is a little far from here. It would be better to take a bus.',
      ru: 'Отсюда до станции далековато. Лучше поехать на автобусе.',
    },
  ),

  ...blank(
    'gp_s3_u9_g33_10',
    G33,
    '저는 내일 시간이 괜찮은데요. 몇 시에 만날까요?',
    '내일 시간이 괜찮은데요',
    {
      uz: 'Ertaga vaqtim bo‘sh. Soat nechada uchrashamiz?',
      en: 'I am free tomorrow. What time shall we meet?',
      ru: 'Завтра я свободен. Во сколько встретимся?',
    },
  ),

  // ═══════════════════════════════════════════
  // grammar_build 10
  // ═══════════════════════════════════════════

  ...build(
    'gp_s3_u9_g33_11',
    G33,
    [
      {
        options: ['문의할 게', '문의한 게', '문의할 때'],
        correct: '문의할 게',
      },
      {
        options: ['있는데요.', '있으니까요.', '있을까요?'],
        correct: '있는데요.',
        hints: {
          '있으니까요.':
            '이유를 강조하는 것이 아니라 질문 전에 상황을 부드럽게 제시해요.',
          '있을까요?': '무언가 있는지 묻는 문장이 아니에요.',
        },
      },
      {
        options: [
          '잠깐 질문해도 될까요?',
          '잠깐 먹어도 될까요?',
          '잠깐 입어도 될까요?',
        ],
        correct: '잠깐 질문해도 될까요?',
      },
    ],
    {
      uz: 'Bir narsani so‘ramoqchi edim. Savol bersam bo‘ladimi?',
      en: 'I have something to ask. May I ask a question?',
      ru: 'Я хотел кое-что спросить. Можно задать вопрос?',
    },
  ),

  ...build(
    'gp_s3_u9_g33_12',
    G33,
    [
      {
        options: ['이 옷은', '이 옷을', '이 옷에'],
        correct: '이 옷은',
      },
      {
        options: ['디자인은', '디자인을', '디자인에'],
        correct: '디자인은',
      },
      {
        options: ['예쁜데요.', '예쁘는데요.', '예쁠데요.'],
        correct: '예쁜데요.',
        hints: {
          '예쁘는데요.':
            "형용사 '예쁘다'는 '-ㄴ데요'를 사용해서 '예쁜데요'가 돼요.",
          '예쁠데요.': '미래 관형형을 만드는 자리가 아니에요.',
        },
      },
      {
        options: [
          '저한테는 조금 커요.',
          '저한테는 조금 먹어요.',
          '저한테는 조금 가요.',
        ],
        correct: '저한테는 조금 커요.',
      },
    ],
    {
      uz: 'Kiyimning dizayni chiroyli, lekin men uchun biroz katta.',
      en: 'The design is pretty, but it is a little big for me.',
      ru: 'Дизайн красивый, но мне немного велико.',
    },
  ),

  ...build(
    'gp_s3_u9_g33_13',
    G33,
    [
      {
        options: ['지금', '어제', '내일'],
        correct: '지금',
      },
      {
        options: ['회의 중인데요.', '회의 중이라서요.', '회의 중일까요?'],
        correct: '회의 중인데요.',
      },
      {
        options: ['끝나고', '시작하려고', '시작하기 전에만'],
        correct: '끝나고',
      },
      {
        options: [
          '다시 전화해도 될까요?',
          '다시 먹어도 될까요?',
          '다시 입어도 될까요?',
        ],
        correct: '다시 전화해도 될까요?',
      },
    ],
    {
      uz: 'Hozir yig‘ilishdaman. Tugagach qayta qo‘ng‘iroq qilsam bo‘ladimi?',
      en: 'I am in a meeting. Can I call you back afterward?',
      ru: 'Я на совещании. Можно перезвонить позже?',
    },
  ),

  ...build(
    'gp_s3_u9_g33_14',
    G33,
    [
      {
        options: ['제가', '저를', '저에게'],
        correct: '제가',
      },
      {
        options: [
          '처음 하는 일인데요.',
          '처음 하는 일이라서요.',
          '처음 할 일일까요?',
        ],
        correct: '처음 하는 일인데요.',
      },
      {
        options: ['어떻게 하면 되는지', '어디에서 먹는지', '누가 입는지'],
        correct: '어떻게 하면 되는지',
      },
      {
        options: ['알려 주세요.', '버려 주세요.', '닫아 주세요.'],
        correct: '알려 주세요.',
      },
    ],
    {
      uz: 'Buni birinchi marta qilyapman. Qanday qilishni aytib bering.',
      en: 'This is my first time doing it. Please tell me what I should do.',
      ru: 'Я делаю это впервые. Подскажите, что нужно делать.',
    },
  ),

  ...build(
    'gp_s3_u9_g33_15',
    G33,
    [
      {
        options: ['밖에', '밖을', '밖이'],
        correct: '밖에',
      },
      {
        options: [
          '비가 많이 오는데요.',
          '비가 많이 온데요.',
          '비가 많이 올데요.',
        ],
        correct: '비가 많이 오는데요.',
        hints: {
          '비가 많이 온데요.':
            '지금 진행되는 상황을 배경으로 제시하므로 「오는데요」가 맞아요.',
          '비가 많이 올데요.': '이 형태는 사용하지 않아요.',
        },
      },
      {
        options: [
          '우산 가지고 가세요.',
          '우산을 먹어 보세요.',
          '우산을 입으세요.',
        ],
        correct: '우산 가지고 가세요.',
      },
    ],
    {
      uz: 'Tashqarida yomg‘ir kuchli. Soyabon olib boring.',
      en: 'It is raining heavily outside. Take an umbrella.',
      ru: 'На улице сильный дождь. Возьмите зонт.',
    },
  ),

  ...build(
    'gp_s3_u9_g33_16',
    G33,
    [
      {
        options: ['이 식당은', '이 식당을', '이 식당에'],
        correct: '이 식당은',
      },
      {
        options: ['생각보다', '생각까지', '생각밖에'],
        correct: '생각보다',
      },
      {
        options: ['비싼데요.', '비싸는데요.', '비쌀데요.'],
        correct: '비싼데요.',
      },
      {
        options: [
          '다른 곳도 알아볼까요?',
          '다른 곳도 먹을까요?',
          '다른 곳도 입을까요?',
        ],
        correct: '다른 곳도 알아볼까요?',
      },
    ],
    {
      uz: 'Bu restoran qimmatroq ekan. Boshqa joyni ham qidiramizmi?',
      en: 'This restaurant is more expensive than expected. Shall we look elsewhere?',
      ru: 'Ресторан дороговат. Может, посмотрим другое место?',
    },
  ),

  ...build(
    'gp_s3_u9_g33_17',
    G33,
    [
      {
        options: ['민수 씨가', '민수 씨를', '민수 씨에게'],
        correct: '민수 씨가',
      },
      {
        options: ['오늘 회사에', '오늘 회사를', '오늘 회사가'],
        correct: '오늘 회사에',
      },
      {
        options: ['안 왔는데요.', '안 온데요.', '안 올데요.'],
        correct: '안 왔는데요.',
      },
      {
        options: [
          '무슨 일이 있는지 모르겠어요.',
          '무슨 음식을 먹는지 알아요.',
          '무슨 옷을 입을까요?',
        ],
        correct: '무슨 일이 있는지 모르겠어요.',
      },
    ],
    {
      uz: 'Minsu bugun ishga kelmadi. Nima bo‘lganini bilmayman.',
      en: 'Minsu did not come to work today. I do not know what happened.',
      ru: 'Минсу сегодня не пришёл. Не знаю, что случилось.',
    },
  ),

  ...build(
    'gp_s3_u9_g33_18',
    G33,
    [
      {
        options: ['제가 찾는 사람은', '제가 찾은 사람을', '제가 찾을 사람에'],
        correct: '제가 찾는 사람은',
      },
      {
        options: ['김민수 씨인데요.', '김민수 씨라서요.', '김민수 씨일까요?'],
        correct: '김민수 씨인데요.',
      },
      {
        options: ['혹시 아세요?', '혹시 드세요?', '혹시 입으세요?'],
        correct: '혹시 아세요?',
      },
    ],
    {
      uz: 'Men qidirayotgan odam Kim Minsu. Uni bilasizmi?',
      en: 'The person I am looking for is Kim Minsu. Do you happen to know him?',
      ru: 'Я ищу Ким Минсу. Вы случайно его не знаете?',
    },
  ),

  ...build(
    'gp_s3_u9_g33_19',
    G33,
    [
      {
        options: ['여기에서 역까지는', '여기에서 역을', '여기에서 역이'],
        correct: '여기에서 역까지는',
      },
      {
        options: ['조금 먼데요.', '조금 멀은데요.', '조금 멀는데요.'],
        correct: '조금 먼데요.',
        hints: {
          '조금 멀은데요.':
            "ㄹ 받침 형용사 '멀다'는 ㄹ이 탈락해서 '먼데요'가 돼요.",
          '조금 멀는데요.': '형용사에는 동사처럼 「-는데요」를 붙이지 않아요.',
        },
      },
      {
        options: [
          '버스를 타는 게 좋겠어요.',
          '버스를 먹는 게 좋겠어요.',
          '버스를 읽는 게 좋겠어요.',
        ],
        correct: '버스를 타는 게 좋겠어요.',
      },
    ],
    {
      uz: 'Bekat biroz uzoq. Avtobusda borgan yaxshi.',
      en: 'The station is a little far. It would be better to take a bus.',
      ru: 'До станции далековато. Лучше поехать на автобусе.',
    },
  ),

  ...build(
    'gp_s3_u9_g33_20',
    G33,
    [
      {
        options: ['저는', '저를', '제가를'],
        correct: '저는',
      },
      {
        options: ['내일 시간이', '내일 시간을', '내일 시간에'],
        correct: '내일 시간이',
      },
      {
        options: ['괜찮은데요.', '괜찮는데요.', '괜찮을데요.'],
        correct: '괜찮은데요.',
      },
      {
        options: ['몇 시에 만날까요?', '몇 시에 먹었어요?', '몇 시에 입어요?'],
        correct: '몇 시에 만날까요?',
      },
    ],
    {
      uz: 'Ertaga vaqtim bo‘sh. Nechada uchrashamiz?',
      en: 'I am free tomorrow. What time shall we meet?',
      ru: 'Завтра я свободен. Во сколько встретимся?',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 34. V-는 중이다, N 중이다
//
// V-는 중이다
// → 특정 행동을 현재 하고 있는 과정
//
// N 중이다
// → 회의 중, 수업 중, 통화 중처럼
// 특정 활동·상태가 진행 중
// ─────────────────────────────────────────────
const G34 = 'vn-jungida';

const G34_Q = {
  // ═══════════════════════════════════════════
  // grammar_blank 10
  // ═══════════════════════════════════════════

  ...blank(
    'gp_s3_u9_g34_01',
    G34,
    '지금 저녁을 만드는 중이에요. 조금 있다가 전화할게요.',
    '저녁을 만드는 중이에요',
    {
      uz: 'Hozir kechki ovqat tayyorlayapman. Birozdan keyin qo‘ng‘iroq qilaman.',
      en: 'I am in the middle of making dinner. I will call you a little later.',
      ru: 'Я сейчас готовлю ужин. Позвоню чуть позже.',
    },
  ),

  ...blank(
    'gp_s3_u9_g34_02',
    G34,
    '회의 중이라서 지금은 전화를 받을 수 없어요.',
    '회의 중이라서',
    {
      uz: 'Yig‘ilishda bo‘lganim uchun hozir telefonni ko‘tara olmayman.',
      en: 'I am in a meeting, so I cannot answer the phone right now.',
      ru: 'Я на совещании, поэтому сейчас не могу ответить.',
    },
  ),

  ...blank(
    'gp_s3_u9_g34_03',
    G34,
    '새 집을 알아보는 중인데 아직 마음에 드는 곳을 못 찾았어요.',
    '새 집을 알아보는 중인데',
    {
      uz: 'Hozir yangi uy qidiryapman, lekin hali yoqqan joyni topmadim.',
      en: 'I am looking for a new place to live, but I have not found one I like yet.',
      ru: 'Я сейчас ищу новое жильё, но пока ничего подходящего не нашёл.',
    },
  ),

  ...blank(
    'gp_s3_u9_g34_04',
    G34,
    '지금 수업 중이니까 교실에서 큰 소리로 말하지 마세요.',
    '지금 수업 중이니까',
    {
      uz: 'Hozir dars bo‘layotgani uchun sinfda baland gapirmang.',
      en: 'Class is in progress, so do not speak loudly in the classroom.',
      ru: 'Сейчас идёт занятие, поэтому не разговаривайте громко.',
    },
  ),

  ...blank(
    'gp_s3_u9_g34_05',
    G34,
    '여행 계획을 세우는 중이에요. 숙소는 아직 정하지 않았어요.',
    '여행 계획을 세우는 중이에요',
    {
      uz: 'Hozir sayohat rejasini tuzyapman. Mehmonxonani hali tanlamadim.',
      en: 'I am working on my travel plans. I have not chosen accommodation yet.',
      ru: 'Я сейчас планирую поездку. Жильё пока не выбрал.',
    },
  ),

  ...blank(
    'gp_s3_u9_g34_06',
    G34,
    '민수 씨는 지금 고객과 통화 중이에요.',
    '고객과 통화 중이에요',
    {
      uz: 'Minsu hozir mijoz bilan telefonda gaplashyapti.',
      en: 'Minsu is on the phone with a customer right now.',
      ru: 'Минсу сейчас разговаривает по телефону с клиентом.',
    },
  ),

  ...blank(
    'gp_s3_u9_g34_07',
    G34,
    '보고서를 확인하는 중에 잘못된 숫자를 발견했어요.',
    '보고서를 확인하는 중에',
    {
      uz: 'Hisobotni tekshirayotganimda noto‘g‘ri raqamni topdim.',
      en: 'While I was checking the report, I found an incorrect number.',
      ru: 'Во время проверки отчёта я обнаружил неправильную цифру.',
    },
  ),

  ...blank(
    'gp_s3_u9_g34_08',
    G34,
    '현재 공사 중이라서 이 길은 이용할 수 없어요.',
    '현재 공사 중이라서',
    {
      uz: 'Hozir qurilish ketayotgani uchun bu yo‘ldan foydalanib bo‘lmaydi.',
      en: 'This road cannot be used because construction is currently underway.',
      ru: 'Сейчас идут строительные работы, поэтому этой дорогой пользоваться нельзя.',
    },
  ),

  ...blank(
    'gp_s3_u9_g34_09',
    G34,
    '친구에게 보낼 선물을 고르는 중이에요.',
    '선물을 고르는 중이에요',
    {
      uz: 'Do‘stimga yuboradigan sovg‘ani tanlayapman.',
      en: 'I am in the middle of choosing a gift to send to my friend.',
      ru: 'Я сейчас выбираю подарок для друга.',
    },
  ),

  ...blank(
    'gp_s3_u9_g34_10',
    G34,
    '아직 식사 중인 사람이 있으니까 조금만 더 기다립시다.',
    '아직 식사 중인 사람이 있으니까',
    {
      uz: 'Hali ovqatlanayotgan odamlar bor, shuning uchun biroz kutaylik.',
      en: 'Some people are still eating, so let’s wait a little longer.',
      ru: 'Некоторые ещё едят, поэтому давайте немного подождём.',
    },
  ),

  // ═══════════════════════════════════════════
  // grammar_build 10
  // ═══════════════════════════════════════════

  ...build(
    'gp_s3_u9_g34_11',
    G34,
    [
      {
        options: ['지금', '어제', '내일'],
        correct: '지금',
      },
      {
        options: ['저녁을', '저녁이', '저녁에'],
        correct: '저녁을',
      },
      {
        options: ['만드는 중이에요.', '만든 중이에요.', '만들 중이에요.'],
        correct: '만드는 중이에요.',
        hints: {
          '만든 중이에요.': '완료된 행동이 아니라 현재 진행 중인 행동이에요.',
          '만들 중이에요.': "동사 뒤에는 'V-는 중이다' 형태를 사용해요.",
        },
      },
      {
        options: [
          '조금 있다가 전화할게요.',
          '어제 전화했어요.',
          '전화를 먹을게요.',
        ],
        correct: '조금 있다가 전화할게요.',
      },
    ],
    {
      uz: 'Hozir kechki ovqat tayyorlayapman. Keyinroq qo‘ng‘iroq qilaman.',
      en: 'I am making dinner right now. I will call later.',
      ru: 'Я сейчас готовлю ужин. Позвоню позже.',
    },
  ),

  ...build(
    'gp_s3_u9_g34_12',
    G34,
    [
      {
        options: ['회의 중이라서', '회의 동안보다', '회의밖에'],
        correct: '회의 중이라서',
      },
      {
        options: ['지금은', '어제는', '다음 달에는'],
        correct: '지금은',
      },
      {
        options: ['전화를', '전화가', '전화에'],
        correct: '전화를',
      },
      {
        options: ['받을 수 없어요.', '먹을 수 없어요.', '입을 수 없어요.'],
        correct: '받을 수 없어요.',
      },
    ],
    {
      uz: 'Yig‘ilishdaman, shuning uchun hozir javob bera olmayman.',
      en: 'I am in a meeting, so I cannot answer right now.',
      ru: 'Я на совещании, поэтому сейчас не могу ответить.',
    },
  ),

  ...build(
    'gp_s3_u9_g34_13',
    G34,
    [
      {
        options: ['새 집을', '새 집이', '새 집에'],
        correct: '새 집을',
      },
      {
        options: ['알아보는 중인데', '알아본 중인데', '알아볼 중인데'],
        correct: '알아보는 중인데',
      },
      {
        options: ['아직', '벌써', '전혀'],
        correct: '아직',
      },
      {
        options: [
          '마음에 드는 곳을 못 찾았어요.',
          '마음에 드는 곳을 다 샀어요.',
          '마음에 드는 곳을 먹었어요.',
        ],
        correct: '마음에 드는 곳을 못 찾았어요.',
      },
    ],
    {
      uz: 'Yangi uy qidiryapman, lekin hali yoqqan joyni topmadim.',
      en: 'I am looking for a new home but have not found one I like yet.',
      ru: 'Я ищу новое жильё, но пока ничего подходящего не нашёл.',
    },
  ),

  ...build(
    'gp_s3_u9_g34_14',
    G34,
    [
      {
        options: ['지금', '지난주에', '내년에'],
        correct: '지금',
      },
      {
        options: ['수업 중이니까', '수업밖에 없으니까', '수업보다'],
        correct: '수업 중이니까',
      },
      {
        options: ['교실에서', '교실을', '교실이'],
        correct: '교실에서',
      },
      {
        options: [
          '큰 소리로 말하지 마세요.',
          '큰 소리로 먹지 마세요.',
          '큰 소리로 입지 마세요.',
        ],
        correct: '큰 소리로 말하지 마세요.',
      },
    ],
    {
      uz: 'Hozir dars bo‘lyapti, shuning uchun baland gapirmang.',
      en: 'Class is in progress, so do not speak loudly.',
      ru: 'Сейчас идёт занятие, поэтому не говорите громко.',
    },
  ),

  ...build(
    'gp_s3_u9_g34_15',
    G34,
    [
      {
        options: ['여행 계획을', '여행 계획이', '여행 계획에'],
        correct: '여행 계획을',
      },
      {
        options: ['세우는 중이에요.', '세운 중이에요.', '세울 중이에요.'],
        correct: '세우는 중이에요.',
      },
      {
        options: ['숙소는', '숙소를가', '숙소에만을'],
        correct: '숙소는',
      },
      {
        options: ['아직 정하지 않았어요.', '벌써 먹었어요.', '지금 입었어요.'],
        correct: '아직 정하지 않았어요.',
      },
    ],
    {
      uz: 'Sayohat rejasini tuzyapman. Mehmonxonani hali tanlamadim.',
      en: 'I am planning a trip. I have not chosen accommodation yet.',
      ru: 'Я планирую поездку. Жильё пока не выбрал.',
    },
  ),

  ...build(
    'gp_s3_u9_g34_16',
    G34,
    [
      {
        options: ['민수 씨는', '민수 씨를', '민수 씨에게'],
        correct: '민수 씨는',
      },
      {
        options: ['지금', '어제', '내일'],
        correct: '지금',
      },
      {
        options: ['고객과', '고객을', '고객에게만'],
        correct: '고객과',
      },
      {
        options: ['통화 중이에요.', '통화보다예요.', '통화밖에예요.'],
        correct: '통화 중이에요.',
      },
    ],
    {
      uz: 'Minsu hozir mijoz bilan telefonda gaplashyapti.',
      en: 'Minsu is on the phone with a customer.',
      ru: 'Минсу сейчас разговаривает с клиентом по телефону.',
    },
  ),

  ...build(
    'gp_s3_u9_g34_17',
    G34,
    [
      {
        options: ['보고서를', '보고서가', '보고서에'],
        correct: '보고서를',
      },
      {
        options: ['확인하는 중에', '확인한 중에', '확인할 중에'],
        correct: '확인하는 중에',
      },
      {
        options: ['잘못된 숫자를', '잘못된 숫자가', '잘못된 숫자에'],
        correct: '잘못된 숫자를',
      },
      {
        options: ['발견했어요.', '입었어요.', '마셨어요.'],
        correct: '발견했어요.',
      },
    ],
    {
      uz: 'Hisobotni tekshirayotganda noto‘g‘ri raqam topdim.',
      en: 'While checking the report, I found an incorrect number.',
      ru: 'Проверяя отчёт, я обнаружил неправильную цифру.',
    },
  ),

  ...build(
    'gp_s3_u9_g34_18',
    G34,
    [
      {
        options: ['현재', '작년에', '내년에'],
        correct: '현재',
      },
      {
        options: ['공사 중이라서', '공사보다', '공사밖에'],
        correct: '공사 중이라서',
      },
      {
        options: ['이 길은', '이 길을', '이 길에만'],
        correct: '이 길은',
      },
      {
        options: ['이용할 수 없어요.', '먹을 수 없어요.', '입을 수 없어요.'],
        correct: '이용할 수 없어요.',
      },
    ],
    {
      uz: 'Hozir qurilish ketmoqda, shu sababli yo‘ldan foydalanib bo‘lmaydi.',
      en: 'Construction is underway, so this road cannot be used.',
      ru: 'Сейчас идёт ремонт, поэтому этой дорогой пользоваться нельзя.',
    },
  ),

  ...build(
    'gp_s3_u9_g34_19',
    G34,
    [
      {
        options: ['친구에게', '친구를', '친구가'],
        correct: '친구에게',
      },
      {
        options: ['보낼', '보낸', '보내는'],
        correct: '보낼',
      },
      {
        options: ['선물을', '선물이', '선물에'],
        correct: '선물을',
      },
      {
        options: ['고르는 중이에요.', '고른 중이에요.', '고를 중이에요.'],
        correct: '고르는 중이에요.',
      },
    ],
    {
      uz: 'Do‘stimga yuboradigan sovg‘ani tanlayapman.',
      en: 'I am choosing a gift to send to my friend.',
      ru: 'Я выбираю подарок для друга.',
    },
  ),

  ...build(
    'gp_s3_u9_g34_20',
    G34,
    [
      {
        options: ['아직', '벌써', '전혀'],
        correct: '아직',
      },
      {
        options: ['식사 중인', '식사 동안인', '식사보다인'],
        correct: '식사 중인',
      },
      {
        options: ['사람이 있으니까', '사람을 있으니까', '사람에 있으니까'],
        correct: '사람이 있으니까',
      },
      {
        options: [
          '조금만 더 기다립시다.',
          '조금만 더 먹읍시다.',
          '조금만 더 입읍시다.',
        ],
        correct: '조금만 더 기다립시다.',
      },
    ],
    {
      uz: 'Hali ovqatlanayotgan odamlar bor. Yana biroz kutaylik.',
      en: 'Some people are still eating. Let’s wait a little longer.',
      ru: 'Некоторые ещё едят. Давайте немного подождём.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 35. A-(으)ㄴ가요?, V-나요?, N인가요?
//
// 정보를 부드럽고 자연스럽게 묻거나
// 궁금한 점을 확인할 때 사용
//
// A 받침 O → -은가요?
// A 받침 X → -ㄴ가요?
// A ㄹ 받침 → ㄹ 탈락 + -ㄴ가요?
//
// V → -나요?
// V ㄹ 받침 → ㄹ 탈락 + -나요?
//
// N → -인가요?
// ─────────────────────────────────────────────
const G35 = 'avn-gayo-nayo-ingayo';

const G35_Q = {
  // ═══════════════════════════════════════════
  // grammar_blank 10
  // ═══════════════════════════════════════════

  ...blank(
    'gp_s3_u9_g35_01',
    G35,
    '이 근처에 늦게까지 문을 여는 카페가 있나요?',
    '카페가 있나요',
    {
      uz: 'Bu atrofda kechgacha ochiq kafe bormi?',
      en: 'Is there a cafe around here that stays open late?',
      ru: 'Есть ли поблизости кафе, которое работает допоздна?',
    },
  ),

  ...blank(
    'gp_s3_u9_g35_02',
    G35,
    '이 옷은 다른 색도 있나요?',
    '다른 색도 있나요',
    {
      uz: 'Bu kiyimning boshqa rangi ham bormi?',
      en: 'Does this come in any other colors?',
      ru: 'Есть ли эта одежда в других цветах?',
    },
  ),

  ...blank(
    'gp_s3_u9_g35_03',
    G35,
    '한국의 겨울은 많이 추운가요?',
    '많이 추운가요',
    {
      uz: 'Koreyada qish juda sovuqmi?',
      en: 'Is winter in Korea very cold?',
      ru: 'Зима в Корее очень холодная?',
    },
  ),

  ...blank(
    'gp_s3_u9_g35_04',
    G35,
    '여기에서 공항까지 얼마나 먼가요?',
    '얼마나 먼가요',
    {
      uz: 'Bu yerdan aeroportgacha qanchalik uzoq?',
      en: 'How far is the airport from here?',
      ru: 'Насколько далеко отсюда до аэропорта?',
    },
  ),

  ...blank(
    'gp_s3_u9_g35_05',
    G35,
    '이 버스가 서울역에도 가나요?',
    '서울역에도 가나요',
    {
      uz: 'Bu avtobus Seul vokzaliga ham boradimi?',
      en: 'Does this bus also go to Seoul Station?',
      ru: 'Этот автобус идёт и до Сеульского вокзала?',
    },
  ),

  ...blank(
    'gp_s3_u9_g35_06',
    G35,
    '한국 사람들은 보통 아침에 무엇을 먹나요?',
    '아침에 무엇을 먹나요',
    {
      uz: 'Koreyslar odatda nonushtaga nima yeyishadi?',
      en: 'What do Koreans usually eat for breakfast?',
      ru: 'Что корейцы обычно едят на завтрак?',
    },
  ),

  ...blank(
    'gp_s3_u9_g35_07',
    G35,
    '이곳이 외국인 등록을 하는 곳인가요?',
    '외국인 등록을 하는 곳인가요',
    {
      uz: 'Chet elliklarni ro‘yxatdan o‘tkazadigan joy shu yermi?',
      en: 'Is this the place where foreigners register?',
      ru: 'Это место, где оформляют регистрацию иностранцев?',
    },
  ),

  ...blank(
    'gp_s3_u9_g35_08',
    G35,
    '저분이 새로 오신 한국어 선생님인가요?',
    '한국어 선생님인가요',
    {
      uz: 'U kishi yangi kelgan koreys tili o‘qituvchisimi?',
      en: 'Is that person the new Korean teacher?',
      ru: 'Это новый преподаватель корейского языка?',
    },
  ),

  ...blank(
    'gp_s3_u9_g35_09',
    G35,
    '수업이 보통 몇 시에 끝나나요?',
    '몇 시에 끝나나요',
    {
      uz: 'Dars odatda soat nechada tugaydi?',
      en: 'What time does class usually end?',
      ru: 'Во сколько обычно заканчивается занятие?',
    },
  ),

  ...blank(
    'gp_s3_u9_g35_10',
    G35,
    '혼자 한국에서 사는 것이 많이 힘든가요?',
    '많이 힘든가요',
    {
      uz: 'Koreyada yolg‘iz yashash juda qiyinmi?',
      en: 'Is living alone in Korea very difficult?',
      ru: 'Трудно ли жить одному в Корее?',
    },
  ),

  // ═══════════════════════════════════════════
  // grammar_build 10
  // ═══════════════════════════════════════════

  ...build(
    'gp_s3_u9_g35_11',
    G35,
    [
      {
        options: ['이 근처에', '이 근처를', '이 근처가'],
        correct: '이 근처에',
      },
      {
        options: ['늦게까지', '어제까지', '밖에'],
        correct: '늦게까지',
      },
      {
        options: ['문을 여는 카페가', '문을 연 카페를', '문을 열 카페에'],
        correct: '문을 여는 카페가',
      },
      {
        options: ['있나요?', '있는가요?', '있인가요?'],
        correct: '있나요?',
        hints: {
          '있는가요?':
            "여기서는 '있다'를 동사처럼 사용해서 '있나요?'가 자연스러워요.",
          '있인가요?': '「인가요?」는 명사 뒤에 사용해요.',
        },
      },
    ],
    {
      uz: 'Bu atrofda kechgacha ochiq kafe bormi?',
      en: 'Is there a cafe nearby that is open late?',
      ru: 'Есть поблизости кафе, которое работает допоздна?',
    },
  ),

  ...build(
    'gp_s3_u9_g35_12',
    G35,
    [
      {
        options: ['이 옷은', '이 옷을', '이 옷에'],
        correct: '이 옷은',
      },
      {
        options: ['다른 색도', '다른 색보다', '다른 색밖에'],
        correct: '다른 색도',
      },
      {
        options: ['있나요?', '있는가요?', '있인가요?'],
        correct: '있나요?',
      },
    ],
    {
      uz: 'Bu kiyimning boshqa rangi ham bormi?',
      en: 'Does this come in another color?',
      ru: 'Есть ли эта одежда в другом цвете?',
    },
  ),

  ...build(
    'gp_s3_u9_g35_13',
    G35,
    [
      {
        options: ['한국의 겨울은', '한국의 겨울을', '한국의 겨울에'],
        correct: '한국의 겨울은',
      },
      {
        options: ['많이', '밖에', '동안'],
        correct: '많이',
      },
      {
        options: ['추운가요?', '춥나요?', '추운나요?'],
        correct: '추운가요?',
        hints: {
          '춥나요?':
            "이 문법에서는 형용사의 질문형 '-(으)ㄴ가요?'를 연습하고 있어요.",
          '추운나요?': "형용사에 '-ㄴ가요?'와 '-나요?'를 동시에 붙이지 않아요.",
        },
      },
    ],
    {
      uz: 'Koreyada qish juda sovuqmi?',
      en: 'Is winter in Korea very cold?',
      ru: 'Зима в Корее очень холодная?',
    },
  ),

  ...build(
    'gp_s3_u9_g35_14',
    G35,
    [
      {
        options: ['여기에서', '여기를', '여기가'],
        correct: '여기에서',
      },
      {
        options: ['공항까지', '공항보다', '공항밖에'],
        correct: '공항까지',
      },
      {
        options: ['얼마나', '누가', '무엇을'],
        correct: '얼마나',
      },
      {
        options: ['먼가요?', '멀은가요?', '멀나요?'],
        correct: '먼가요?',
        hints: {
          '멀은가요?':
            "ㄹ 받침 형용사 '멀다'는 ㄹ이 탈락해서 '먼가요?'가 돼요.",
          '멀나요?': "목표 형용사 질문형은 '-(으)ㄴ가요?'예요.",
        },
      },
    ],
    {
      uz: 'Bu yerdan aeroportgacha qancha uzoq?',
      en: 'How far is the airport from here?',
      ru: 'Насколько далеко отсюда до аэропорта?',
    },
  ),

  ...build(
    'gp_s3_u9_g35_15',
    G35,
    [
      {
        options: ['이 버스가', '이 버스를', '이 버스에'],
        correct: '이 버스가',
      },
      {
        options: ['서울역에도', '서울역보다', '서울역밖에'],
        correct: '서울역에도',
      },
      {
        options: ['가나요?', '가는가요?', '가인가요?'],
        correct: '가나요?',
        hints: {
          '가는가요?': "동사 '가다'는 여기서 '-나요?'를 사용해요.",
          '가인가요?': '「인가요?」는 명사 뒤에 사용해요.',
        },
      },
    ],
    {
      uz: 'Bu avtobus Seul vokzaliga ham boradimi?',
      en: 'Does this bus go to Seoul Station too?',
      ru: 'Этот автобус идёт и до Сеульского вокзала?',
    },
  ),

  ...build(
    'gp_s3_u9_g35_16',
    G35,
    [
      {
        options: ['한국 사람들은', '한국 사람들을', '한국 사람들에게'],
        correct: '한국 사람들은',
      },
      {
        options: ['보통 아침에', '어제 아침에만', '내일 밤에'],
        correct: '보통 아침에',
      },
      {
        options: ['무엇을', '어디에', '누가'],
        correct: '무엇을',
      },
      {
        options: ['먹나요?', '먹은가요?', '먹인가요?'],
        correct: '먹나요?',
      },
    ],
    {
      uz: 'Koreyslar odatda nonushtaga nima yeyishadi?',
      en: 'What do Koreans usually eat for breakfast?',
      ru: 'Что корейцы обычно едят на завтрак?',
    },
  ),

  ...build(
    'gp_s3_u9_g35_17',
    G35,
    [
      {
        options: ['이곳이', '이곳을', '이곳에'],
        correct: '이곳이',
      },
      {
        options: ['외국인 등록을', '외국인 등록이', '외국인 등록에'],
        correct: '외국인 등록을',
      },
      {
        options: ['하는 곳인가요?', '하는 곳나요?', '하는 곳은가요?'],
        correct: '하는 곳인가요?',
        hints: {
          '하는 곳나요?': "명사 '곳' 뒤에는 '-인가요?'를 사용해요.",
          '하는 곳은가요?': '「은」을 추가하지 않고 바로 「인가요?」를 붙여요.',
        },
      },
    ],
    {
      uz: 'Chet elliklarni ro‘yxatdan o‘tkazadigan joy shu yermi?',
      en: 'Is this where foreigner registration is handled?',
      ru: 'Это место регистрации иностранцев?',
    },
  ),

  ...build(
    'gp_s3_u9_g35_18',
    G35,
    [
      {
        options: ['저분이', '저분을', '저분에게'],
        correct: '저분이',
      },
      {
        options: ['새로 오신', '새로 오는', '새로 오실'],
        correct: '새로 오신',
      },
      {
        options: [
          '한국어 선생님인가요?',
          '한국어 선생님나요?',
          '한국어 선생님은가요?',
        ],
        correct: '한국어 선생님인가요?',
      },
    ],
    {
      uz: 'U kishi yangi koreys tili o‘qituvchisimi?',
      en: 'Is that person the new Korean teacher?',
      ru: 'Это новый преподаватель корейского языка?',
    },
  ),

  ...build(
    'gp_s3_u9_g35_19',
    G35,
    [
      {
        options: ['수업이', '수업을', '수업에'],
        correct: '수업이',
      },
      {
        options: ['보통', '밖에', '아직만'],
        correct: '보통',
      },
      {
        options: ['몇 시에', '몇 시를', '몇 시가'],
        correct: '몇 시에',
      },
      {
        options: ['끝나나요?', '끝난가요?', '끝인가요?'],
        correct: '끝나나요?',
      },
    ],
    {
      uz: 'Dars odatda soat nechada tugaydi?',
      en: 'What time does class usually end?',
      ru: 'Во сколько обычно заканчивается занятие?',
    },
  ),

  ...build(
    'gp_s3_u9_g35_20',
    G35,
    [
      {
        options: ['혼자', '밖에', '동안'],
        correct: '혼자',
      },
      {
        options: ['한국에서 사는 것이', '한국에서 산 것을', '한국에서 살 곳에'],
        correct: '한국에서 사는 것이',
      },
      {
        options: ['많이', '전혀만', '밖에'],
        correct: '많이',
      },
      {
        options: ['힘든가요?', '힘드나요?', '힘든나요?'],
        correct: '힘든가요?',
        hints: {
          '힘드나요?':
            "목표 문법에서는 형용사 '힘들다'를 '힘든가요?'로 물어요.",
          '힘든나요?': '두 질문형을 겹쳐 쓰지 않아요.',
        },
      },
    ],
    {
      uz: 'Koreyada yolg‘iz yashash juda qiyinmi?',
      en: 'Is living alone in Korea very difficult?',
      ru: 'Трудно ли жить одному в Корее?',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 36. N밖에
//
// N밖에 + 부정 표현
//
// 예상보다 적거나 제한된 대상·수량을 표현
// "N 이외에는 없다"
// "only N"
//
// 반드시 뒤에
// 안 / 못 / 없다 / 모르다 등
// 부정 의미의 서술어가 오는 것이 핵심
// ─────────────────────────────────────────────
const G36 = 'noun-bakke';

const G36_Q = {
  // ═══════════════════════════════════════════
  // grammar_blank 10
  // ═══════════════════════════════════════════

  ...blank(
    'gp_s3_u9_g36_01',
    G36,
    '지갑에 천 원밖에 없어요.',
    '천 원밖에 없어요',
    {
      uz: 'Hamyonimda atigi ming von bor.',
      en: 'I only have 1,000 won in my wallet.',
      ru: 'У меня в кошельке всего тысяча вон.',
    },
  ),

  ...blank(
    'gp_s3_u9_g36_02',
    G36,
    '오늘 회의에는 두 명밖에 안 왔어요.',
    '두 명밖에 안 왔어요',
    {
      uz: 'Bugungi yig‘ilishga atigi ikki kishi keldi.',
      en: 'Only two people came to today’s meeting.',
      ru: 'На сегодняшнее совещание пришли только два человека.',
    },
  ),

  ...blank(
    'gp_s3_u9_g36_03',
    G36,
    '냉장고에 물밖에 없어서 장을 보러 가야 해요.',
    '물밖에 없어서',
    {
      uz: 'Muzlatkichda faqat suv bor, shuning uchun oziq-ovqat olishga borishim kerak.',
      en: 'There is nothing but water in the refrigerator, so I need to go grocery shopping.',
      ru: 'В холодильнике есть только вода, поэтому нужно сходить за продуктами.',
    },
  ),

  ...blank(
    'gp_s3_u9_g36_04',
    G36,
    '한국에 온 지 일주일밖에 안 됐어요.',
    '일주일밖에 안 됐어요',
    {
      uz: 'Koreyaga kelganimga atigi bir hafta bo‘ldi.',
      en: 'It has only been one week since I came to Korea.',
      ru: 'Я приехал в Корею всего неделю назад.',
    },
  ),

  ...blank(
    'gp_s3_u9_g36_05',
    G36,
    '시험까지 삼 일밖에 안 남았어요.',
    '삼 일밖에 안 남았어요',
    {
      uz: 'Imtihongacha atigi uch kun qoldi.',
      en: 'There are only three days left until the exam.',
      ru: 'До экзамена осталось всего три дня.',
    },
  ),

  ...blank(
    'gp_s3_u9_g36_06',
    G36,
    '너무 바빠서 점심에는 커피밖에 못 마셨어요.',
    '커피밖에 못 마셨어요',
    {
      uz: 'Juda band bo‘lganim uchun tushlikda faqat qahva icha oldim.',
      en: 'I was so busy that I could only drink coffee for lunch.',
      ru: 'Я был так занят, что на обед смог выпить только кофе.',
    },
  ),

  ...blank(
    'gp_s3_u9_g36_07',
    G36,
    '이 근처에는 편의점밖에 없어요.',
    '편의점밖에 없어요',
    {
      uz: 'Bu atrofda faqat do‘kon bor.',
      en: 'There is only a convenience store around here.',
      ru: 'Поблизости есть только магазин у дома.',
    },
  ),

  ...blank(
    'gp_s3_u9_g36_08',
    G36,
    '그 사람에 대해서는 이름밖에 몰라요.',
    '이름밖에 몰라요',
    {
      uz: 'U odam haqida faqat ismini bilaman.',
      en: 'The only thing I know about that person is their name.',
      ru: 'Об этом человеке я знаю только имя.',
    },
  ),

  ...blank(
    'gp_s3_u9_g36_09',
    G36,
    '여행 가방에 옷을 두 벌밖에 못 넣었어요.',
    '두 벌밖에 못 넣었어요',
    {
      uz: 'Sayohat sumkasiga atigi ikki komplekt kiyim sig‘dira oldim.',
      en: 'I could only fit two sets of clothes in my suitcase.',
      ru: 'В чемодан удалось положить только два комплекта одежды.',
    },
  ),

  ...blank(
    'gp_s3_u9_g36_10',
    G36,
    '마감까지 한 시간밖에 안 남아서 서둘러야 해요.',
    '한 시간밖에 안 남아서',
    {
      uz: 'Muddatgacha atigi bir soat qoldi, shuning uchun shoshilish kerak.',
      en: 'There is only one hour left until the deadline, so we need to hurry.',
      ru: 'До срока остался всего час, поэтому нужно спешить.',
    },
  ),

  // ═══════════════════════════════════════════
  // grammar_build 10
  // ═══════════════════════════════════════════

  ...build(
    'gp_s3_u9_g36_11',
    G36,
    [
      {
        options: ['지갑에', '지갑을', '지갑이'],
        correct: '지갑에',
      },
      {
        options: ['천 원밖에', '천 원도', '천 원보다'],
        correct: '천 원밖에',
        hints: {
          '천 원도': "「도」는 '천 원도 없다'처럼 다른 의미를 만들어요.",
          '천 원보다': '비교 표현이 아니라 가진 돈이 적다는 한정을 나타내요.',
        },
      },
      {
        options: ['없어요.', '있어요.', '많아요.'],
        correct: '없어요.',
        hints: {
          '있어요.': '「밖에」는 보통 뒤에 부정 표현이 와야 해요.',
          '많아요.': '적은 수량을 제한해서 말하는 문맥과 맞지 않아요.',
        },
      },
    ],
    {
      uz: 'Hamyonimda atigi ming von bor.',
      en: 'I only have 1,000 won in my wallet.',
      ru: 'В кошельке у меня всего тысяча вон.',
    },
  ),

  ...build(
    'gp_s3_u9_g36_12',
    G36,
    [
      {
        options: ['오늘 회의에는', '오늘 회의를', '오늘 회의가'],
        correct: '오늘 회의에는',
      },
      {
        options: ['두 명밖에', '두 명이나', '두 명보다'],
        correct: '두 명밖에',
        hints: {
          '두 명이나':
            '「이나」는 예상보다 많음을 강조할 수 있어서 의미가 반대예요.',
          '두 명보다': '비교하는 문장이 아니에요.',
        },
      },
      {
        options: ['안 왔어요.', '왔어요.', '많았어요.'],
        correct: '안 왔어요.',
      },
    ],
    {
      uz: 'Yig‘ilishga atigi ikki kishi keldi.',
      en: 'Only two people came to the meeting.',
      ru: 'На совещание пришли всего два человека.',
    },
  ),

  ...build(
    'gp_s3_u9_g36_13',
    G36,
    [
      {
        options: ['냉장고에', '냉장고를', '냉장고가'],
        correct: '냉장고에',
      },
      {
        options: ['물밖에', '물이나', '물보다'],
        correct: '물밖에',
      },
      {
        options: ['없어서', '있어서', '많아서'],
        correct: '없어서',
      },
      {
        options: [
          '장을 보러 가야 해요.',
          '냉장고를 입어야 해요.',
          '물을 사지 않아도 돼요.',
        ],
        correct: '장을 보러 가야 해요.',
      },
    ],
    {
      uz: 'Muzlatkichda faqat suv bor, shuning uchun oziq-ovqat olish kerak.',
      en: 'There is only water in the refrigerator, so I need to buy groceries.',
      ru: 'В холодильнике только вода, поэтому нужно купить продукты.',
    },
  ),

  ...build(
    'gp_s3_u9_g36_14',
    G36,
    [
      {
        options: ['한국에 온 지', '한국에 올 때', '한국에 오는 중'],
        correct: '한국에 온 지',
      },
      {
        options: ['일주일밖에', '일주일이나', '일주일보다'],
        correct: '일주일밖에',
      },
      {
        options: ['안 됐어요.', '됐어요.', '많았어요.'],
        correct: '안 됐어요.',
      },
    ],
    {
      uz: 'Koreyaga kelganimga atigi bir hafta bo‘ldi.',
      en: 'It has only been a week since I came to Korea.',
      ru: 'Я в Корее всего неделю.',
    },
  ),

  ...build(
    'gp_s3_u9_g36_15',
    G36,
    [
      {
        options: ['시험까지', '시험보다', '시험 동안'],
        correct: '시험까지',
      },
      {
        options: ['삼 일밖에', '삼 일이나', '삼 일보다'],
        correct: '삼 일밖에',
      },
      {
        options: ['안 남았어요.', '남았어요.', '많이 있어요.'],
        correct: '안 남았어요.',
      },
    ],
    {
      uz: 'Imtihongacha atigi uch kun qoldi.',
      en: 'There are only three days left until the exam.',
      ru: 'До экзамена осталось всего три дня.',
    },
  ),

  ...build(
    'gp_s3_u9_g36_16',
    G36,
    [
      {
        options: ['너무 바빠서', '시간이 아주 많아서', '점심을 많이 먹어서'],
        correct: '너무 바빠서',
      },
      {
        options: ['점심에는', '점심을', '점심이'],
        correct: '점심에는',
      },
      {
        options: ['커피밖에', '커피나', '커피보다'],
        correct: '커피밖에',
      },
      {
        options: ['못 마셨어요.', '마셨어요.', '많이 마셨어요.'],
        correct: '못 마셨어요.',
      },
    ],
    {
      uz: 'Juda band bo‘lib, tushlikda faqat qahva icha oldim.',
      en: 'I was so busy that I could only have coffee for lunch.',
      ru: 'Я был так занят, что на обед смог выпить только кофе.',
    },
  ),

  ...build(
    'gp_s3_u9_g36_17',
    G36,
    [
      {
        options: ['이 근처에는', '이 근처를', '이 근처가'],
        correct: '이 근처에는',
      },
      {
        options: ['편의점밖에', '편의점이나', '편의점보다'],
        correct: '편의점밖에',
      },
      {
        options: ['없어요.', '많아요.', '있어요.'],
        correct: '없어요.',
      },
    ],
    {
      uz: 'Bu atrofda faqat bitta convenience store bor.',
      en: 'There is only a convenience store nearby.',
      ru: 'Поблизости есть только магазин у дома.',
    },
  ),

  ...build(
    'gp_s3_u9_g36_18',
    G36,
    [
      {
        options: ['그 사람에 대해서는', '그 사람을', '그 사람보다'],
        correct: '그 사람에 대해서는',
      },
      {
        options: ['이름밖에', '이름이나', '이름보다'],
        correct: '이름밖에',
      },
      {
        options: ['몰라요.', '알아요.', '많아요.'],
        correct: '몰라요.',
        hints: {
          '알아요.':
            "「밖에」 뒤에는 여기서 '모르다' 같은 부정 의미가 필요해요.",
          '많아요.': '정보의 수량을 제한하는 문맥과 맞지 않아요.',
        },
      },
    ],
    {
      uz: 'U odam haqida faqat ismini bilaman.',
      en: 'I only know that person’s name.',
      ru: 'Об этом человеке я знаю только имя.',
    },
  ),

  ...build(
    'gp_s3_u9_g36_19',
    G36,
    [
      {
        options: ['여행 가방에', '여행 가방을', '여행 가방이'],
        correct: '여행 가방에',
      },
      {
        options: ['옷을', '옷이', '옷에만'],
        correct: '옷을',
      },
      {
        options: ['두 벌밖에', '두 벌이나', '두 벌보다'],
        correct: '두 벌밖에',
      },
      {
        options: ['못 넣었어요.', '넣었어요.', '많이 넣었어요.'],
        correct: '못 넣었어요.',
      },
    ],
    {
      uz: 'Chamodanga atigi ikki komplekt kiyim sig‘dira oldim.',
      en: 'I could only fit two sets of clothes in my suitcase.',
      ru: 'В чемодан удалось положить только два комплекта одежды.',
    },
  ),

  ...build(
    'gp_s3_u9_g36_20',
    G36,
    [
      {
        options: ['마감까지', '마감보다', '마감 동안'],
        correct: '마감까지',
      },
      {
        options: ['한 시간밖에', '한 시간이나', '한 시간보다'],
        correct: '한 시간밖에',
        hints: {
          '한 시간이나':
            '「이나」는 한 시간이 예상보다 많다는 느낌이 될 수 있어요.',
          '한 시간보다': '다른 시간과 비교하는 문장이 아니에요.',
        },
      },
      {
        options: ['안 남아서', '많이 남아서', '충분해서'],
        correct: '안 남아서',
      },
      {
        options: [
          '서둘러야 해요.',
          '천천히 쉬어도 돼요.',
          '내일 시작하면 돼요.',
        ],
        correct: '서둘러야 해요.',
      },
    ],
    {
      uz: 'Muddatgacha atigi bir soat qoldi, shuning uchun shoshilish kerak.',
      en: 'There is only one hour left until the deadline, so we need to hurry.',
      ru: 'До срока остался всего час, поэтому нужно спешить.',
    },
  ),
};

export const GT_S3_QUESTIONS: Record<string, any> = {
  // Unit 1
  ...G1_Q,
  ...G2_Q,
  ...G3_Q,
  ...G4_Q,

  // Unit 2
  ...G5_Q,
  ...G6_Q,
  ...G7_Q,
  ...G8_Q,

  // Unit 3
  ...G9_Q,
  ...G10_Q,
  ...G11_Q,
  ...G12_Q,

  // Unit 4
  ...G13_Q,
  ...G14_Q,
  ...G15_Q,

  // Unit 5
  ...G16_Q,
  ...G17_Q,
  ...G18_Q,
  ...G19_Q,

  // Unit 6
  ...G20_Q,
  ...G21_Q,
  ...G22_Q,
  ...G23_Q,
  ...G24_Q,

  // Unit 7
  ...G25_Q,
  ...G26_Q,
  ...G27_Q,
  ...G28_Q,

  // Unit 8
  ...G29_Q,
  ...G30_Q,
  ...G31_Q,
  ...G32_Q,

  // Unit 9
  ...G33_Q,
  ...G34_Q,
  ...G35_Q,
  ...G36_Q,
};

export const GT_S3_NODES = [
  // ═══════════════════════════════════════════
  // UNIT 1
  // 처음 뵙겠습니다
  // ═══════════════════════════════════════════
  {
    title: {
      ko: '처음 뵙겠습니다',
      uz: 'Tanishganimdan xursandman',
      en: 'How Do You Do?',
      ru: 'Приятно познакомиться',
    },
    section: 3,
    unit: 1,
    order: 1,
    category: LessonCategory.GRAMMAR,
    isActive: true,
    lessons: [
      {
        title: {
          ko: 'N(이)라고 하다',
          uz: 'N(이)라고 하다',
          en: 'N(이)라고 하다',
          ru: 'N(이)라고 하다',
        },
        description: {
          ko: '이름이나 명칭을 소개하고 말하기',
          uz: 'Ism yoki nomni tanishtirib aytish',
          en: 'Introducing names and what things are called',
          ru: 'Представляем имя или название',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_3,
        order: 1,
        grammarCode: G1,
        questions: mix20('gp_s3_u1_g1'),
      },
      {
        title: {
          ko: 'V-(으)려고',
          uz: 'V-(으)려고',
          en: 'V-(으)려고',
          ru: 'V-(으)려고',
        },
        description: {
          ko: '어떤 행동을 하려는 목적과 의도 말하기',
          uz: 'Harakatning maqsadi va niyatini aytish',
          en: 'Expressing purpose and intention',
          ru: 'Выражаем цель и намерение',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_3,
        order: 2,
        grammarCode: G2,
        questions: mix20('gp_s3_u1_g2'),
      },
      {
        title: {
          ko: 'V-거나',
          uz: 'V-거나',
          en: 'V-거나',
          ru: 'V-거나',
        },
        description: {
          ko: '두 가지 이상의 행동 중에서 선택하기',
          uz: 'Ikki yoki undan ortiq harakat orasidan tanlash',
          en: 'Choosing between two or more actions',
          ru: 'Выбираем между двумя или несколькими действиями',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_3,
        order: 3,
        grammarCode: G3,
        questions: mix20('gp_s3_u1_g3'),
      },
      {
        title: {
          ko: 'N(이)나 1',
          uz: 'N(이)나 1',
          en: 'N(이)나 1',
          ru: 'N(이)나 1',
        },
        description: {
          ko: '두 가지 이상의 명사 중에서 선택하기',
          uz: 'Ikki yoki undan ortiq narsadan birini tanlash',
          en: 'Choosing between two or more nouns',
          ru: 'Выбираем один из нескольких вариантов',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_3,
        order: 4,
        grammarCode: G4,
        questions: mix20('gp_s3_u1_g4'),
      },
    ],
  },

  // ═══════════════════════════════════════════
  // UNIT 2
  // 취미가 뭐예요?
  // ═══════════════════════════════════════════
  {
    title: {
      ko: '취미가 뭐예요?',
      uz: 'Xobbingiz nima?',
      en: 'What Is Your Hobby?',
      ru: 'Какое у вас хобби?',
    },
    section: 3,
    unit: 2,
    order: 1,
    category: LessonCategory.GRAMMAR,
    isActive: true,
    lessons: [
      {
        title: {
          ko: 'V-는 것',
          uz: 'V-는 것',
          en: 'V-는 것',
          ru: 'V-는 것',
        },
        description: {
          ko: '행동을 명사처럼 표현해서 취미와 활동 말하기',
          uz: 'Harakatni otlashtirib mashg‘ulot va xobbi haqida gapirish',
          en: 'Turning actions into nouns to talk about activities',
          ru: 'Превращаем действие в существительное и говорим о занятиях',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_3,
        order: 1,
        grammarCode: G5,
        questions: mix20('gp_s3_u2_g5'),
      },
      {
        title: {
          ko: 'V-(으)ㄹ 줄 알다[모르다]',
          uz: 'V-(으)ㄹ 줄 알다[모르다]',
          en: 'V-(으)ㄹ 줄 알다[모르다]',
          ru: 'V-(으)ㄹ 줄 알다[모르다]',
        },
        description: {
          ko: '어떤 행동을 하는 방법을 아는지 말하기',
          uz: 'Biror ishni qanday qilishni bilish yoki bilmaslikni aytish',
          en: 'Talking about knowing how to do something',
          ru: 'Говорим об умении или неумении что-либо делать',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_3,
        order: 2,
        grammarCode: G6,
        questions: mix20('gp_s3_u2_g6'),
      },
      {
        title: {
          ko: 'V-(으)ㄴ N',
          uz: 'V-(으)ㄴ N',
          en: 'V-(으)ㄴ N',
          ru: 'V-(으)ㄴ N',
        },
        description: {
          ko: '이미 끝난 행동으로 사람과 사물 설명하기',
          uz: 'Tugallangan harakat bilan odam va narsalarni tasvirlash',
          en: 'Describing nouns with completed actions',
          ru: 'Описываем предметы завершёнными действиями',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_3,
        order: 3,
        grammarCode: G7,
        questions: mix20('gp_s3_u2_g7'),
      },
      {
        title: {
          ko: 'A/V-지 않다',
          uz: 'A/V-지 않다',
          en: 'A/V-지 않다',
          ru: 'A/V-지 않다',
        },
        description: {
          ko: '행동이나 상태를 부정해서 말하기',
          uz: 'Harakat yoki holatni inkor shaklida aytish',
          en: 'Negating actions and states',
          ru: 'Отрицаем действия и состояния',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_3,
        order: 4,
        grammarCode: G8,
        questions: mix20('gp_s3_u2_g8'),
      },
    ],
  },

  // ═══════════════════════════════════════════
  // UNIT 3
  // 콘서트에 가 봤어요?
  // ═══════════════════════════════════════════
  {
    title: {
      ko: '콘서트에 가 봤어요?',
      uz: 'Konsertga borib ko‘rganmisiz?',
      en: 'Have You Ever Been to a Concert?',
      ru: 'Вы когда-нибудь были на концерте?',
    },
    section: 3,
    unit: 3,
    order: 1,
    category: LessonCategory.GRAMMAR,
    isActive: true,
    lessons: [
      {
        title: {
          ko: 'V-아/어 보다',
          uz: 'V-아/어 보다',
          en: 'V-아/어 보다',
          ru: 'V-아/어 보다',
        },
        description: {
          ko: '직접 해 본 경험이나 새로운 시도 말하기',
          uz: 'Tajriba yoki biror narsani sinab ko‘rish haqida gapirish',
          en: 'Talking about experiences and trying things',
          ru: 'Говорим об опыте и попытке что-либо сделать',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_3,
        order: 1,
        grammarCode: G9,
        questions: mix20('gp_s3_u3_g9'),
      },
      {
        title: {
          ko: 'N 동안',
          uz: 'N 동안',
          en: 'N 동안',
          ru: 'N 동안',
        },
        description: {
          ko: '어떤 행동이나 상태가 이어진 기간 말하기',
          uz: 'Harakat yoki holat davom etgan vaqtni aytish',
          en: 'Expressing how long something continues',
          ru: 'Говорим о продолжительности действия или состояния',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_3,
        order: 2,
        grammarCode: G10,
        questions: mix20('gp_s3_u3_g10'),
      },
      {
        title: {
          ko: 'A-(으)ㄴ데, V-는데, N인데 1',
          uz: 'A-(으)ㄴ데, V-는데, N인데 1',
          en: 'A-(으)ㄴ데, V-는데, N인데 1',
          ru: 'A-(으)ㄴ데, V-는데, N인데 1',
        },
        description: {
          ko: '배경이나 상황을 제시하고 다음 내용 연결하기',
          uz: 'Vaziyatni tushuntirib keyingi gap bilan bog‘lash',
          en: 'Providing background and connecting ideas',
          ru: 'Даём фон ситуации и связываем последующую информацию',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_3,
        order: 3,
        grammarCode: G11,
        questions: mix20('gp_s3_u3_g11'),
      },
      {
        title: {
          ko: 'V-(으)ㄹ N',
          uz: 'V-(으)ㄹ N',
          en: 'V-(으)ㄹ N',
          ru: 'V-(으)ㄹ N',
        },
        description: {
          ko: '앞으로 할 행동으로 사람과 사물 설명하기',
          uz: 'Kelajakdagi harakat bilan odam va narsalarni tasvirlash',
          en: 'Describing nouns with future actions',
          ru: 'Описываем предметы будущими действиями',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_3,
        order: 4,
        grammarCode: G12,
        questions: mix20('gp_s3_u3_g12'),
      },
    ],
  },

  // ═══════════════════════════════════════════
  // UNIT 4
  // 옷이 좀 큰 것 같아요
  // ═══════════════════════════════════════════
  {
    title: {
      ko: '옷이 좀 큰 것 같아요',
      uz: 'Kiyim biroz katta shekilli',
      en: 'The Clothes Seem a Little Big',
      ru: 'Кажется, одежда немного велика',
    },
    section: 3,
    unit: 4,
    order: 1,
    category: LessonCategory.GRAMMAR,
    isActive: true,
    lessons: [
      {
        title: {
          ko: 'A-(으)ㄴ 것 같다, V-는 것 같다, N인 것 같다',
          uz: 'A-(으)ㄴ 것 같다, V-는 것 같다, N인 것 같다',
          en: 'A-(으)ㄴ 것 같다, V-는 것 같다, N인 것 같다',
          ru: 'A-(으)ㄴ 것 같다, V-는 것 같다, N인 것 같다',
        },
        description: {
          ko: '현재의 상태와 행동을 조심스럽게 추측하기',
          uz: 'Hozirgi holat va harakat haqida ehtiyotkorlik bilan taxmin qilish',
          en: 'Making careful guesses about present situations',
          ru: 'Осторожно предполагаем о текущем состоянии и действии',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_3,
        order: 1,
        grammarCode: G13,
        questions: mix20('gp_s3_u4_g13'),
      },
      {
        title: {
          ko: 'N보다',
          uz: 'N보다',
          en: 'N보다',
          ru: 'N보다',
        },
        description: {
          ko: '두 대상의 특징이나 정도 비교하기',
          uz: 'Ikki narsaning xususiyati yoki darajasini solishtirish',
          en: 'Comparing two people, things, or situations',
          ru: 'Сравниваем людей, предметы и ситуации',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_3,
        order: 2,
        grammarCode: G14,
        questions: mix20('gp_s3_u4_g14'),
      },
      {
        title: {
          ko: 'A/V-았으면/었으면 좋겠다',
          uz: 'A/V-았으면/었으면 좋겠다',
          en: 'A/V-았으면/었으면 좋겠다',
          ru: 'A/V-았으면/었으면 좋겠다',
        },
        description: {
          ko: '이루어지기를 바라는 상황과 희망 말하기',
          uz: 'Istak va amalga oshishini xohlagan vaziyatni aytish',
          en: 'Expressing hopes and wishes',
          ru: 'Выражаем надежды и пожелания',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_3,
        order: 3,
        grammarCode: G15,
        questions: mix20('gp_s3_u4_g15'),
      },
    ],
  },

  // ═══════════════════════════════════════════
  // UNIT 5
  // 어디에 가면 좋을까요?
  // ═══════════════════════════════════════════
  {
    title: {
      ko: '어디에 가면 좋을까요?',
      uz: 'Qayerga borsak yaxshi bo‘ladi?',
      en: 'Where Should We Go?',
      ru: 'Куда лучше поехать?',
    },
    section: 3,
    unit: 5,
    order: 1,
    category: LessonCategory.GRAMMAR,
    isActive: true,
    lessons: [
      {
        title: {
          ko: 'A/V-(으)ㄹ까요?',
          uz: 'A/V-(으)ㄹ까요?',
          en: 'A/V-(으)ㄹ까요?',
          ru: 'A/V-(으)ㄹ까요?',
        },
        description: {
          ko: '함께 할 일을 제안하거나 상대의 의견 묻기',
          uz: 'Birgalikdagi harakatni taklif qilish yoki fikr so‘rash',
          en: 'Making suggestions and asking for opinions',
          ru: 'Предлагаем действие и спрашиваем мнение',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_3,
        order: 1,
        grammarCode: G16,
        questions: mix20('gp_s3_u5_g16'),
      },
      {
        title: {
          ko: 'A/V-(으)ㄹ 거예요',
          uz: 'A/V-(으)ㄹ 거예요',
          en: 'A/V-(으)ㄹ 거예요',
          ru: 'A/V-(으)ㄹ 거예요',
        },
        description: {
          ko: '앞으로의 계획이나 예상되는 상황 말하기',
          uz: 'Kelajakdagi reja yoki kutilayotgan vaziyatni aytish',
          en: 'Talking about future plans and predictions',
          ru: 'Говорим о будущих планах и прогнозах',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_3,
        order: 2,
        grammarCode: G17,
        questions: mix20('gp_s3_u5_g17'),
      },
      {
        title: {
          ko: 'A/V-(으)니까, N(이)니까',
          uz: 'A/V-(으)니까, N(이)니까',
          en: 'A/V-(으)니까, N(이)니까',
          ru: 'A/V-(으)니까, N(이)니까',
        },
        description: {
          ko: '판단의 이유를 말하고 권유나 명령으로 연결하기',
          uz: 'Sababni aytib, maslahat yoki buyruq bilan davom ettirish',
          en: 'Giving a reason for advice, suggestions, or commands',
          ru: 'Объясняем причину перед советом, предложением или просьбой',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_3,
        order: 3,
        grammarCode: G18,
        questions: mix20('gp_s3_u5_g18'),
      },
      {
        title: {
          ko: 'V-고 나서',
          uz: 'V-고 나서',
          en: 'V-고 나서',
          ru: 'V-고 나서',
        },
        description: {
          ko: '한 행동을 끝낸 뒤 이어지는 다음 행동 말하기',
          uz: 'Bir harakat tugagach bajariladigan keyingi harakatni aytish',
          en: 'Talking about an action that follows another completed action',
          ru: 'Говорим о действии после завершения предыдущего',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_3,
        order: 4,
        grammarCode: G19,
        questions: mix20('gp_s3_u5_g19'),
      },
    ],
  },

  // ═══════════════════════════════════════════
  // UNIT 6
  // 비행기로 보내면 얼마예요?
  // ═══════════════════════════════════════════
  {
    title: {
      ko: '비행기로 보내면 얼마예요?',
      uz: 'Samolyotda yuborsam, qancha turadi?',
      en: 'How Much Is It to Send by Air?',
      ru: 'Сколько стоит отправить самолётом?',
    },
    section: 3,
    unit: 6,
    order: 1,
    category: LessonCategory.GRAMMAR,
    isActive: true,
    lessons: [
      {
        title: {
          ko: 'N(으)로',
          uz: 'N(으)로',
          en: 'N(으)로',
          ru: 'N(으)로',
        },
        description: {
          ko: '수단과 방법, 방향과 경로 말하기',
          uz: 'Vosita, usul, yo‘nalish va yo‘lni aytish',
          en: 'Expressing means, methods, directions, and routes',
          ru: 'Выражаем средство, способ, направление и маршрут',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_3,
        order: 1,
        grammarCode: G20,
        questions: mix20('gp_s3_u6_g20'),
      },
      {
        title: {
          ko: 'N(이)라서',
          uz: 'N(이)라서',
          en: 'N(이)라서',
          ru: 'N(이)라서',
        },
        description: {
          ko: '명사로 이유와 원인을 설명하기',
          uz: 'Ot orqali sababni tushuntirish',
          en: 'Giving a reason with a noun',
          ru: 'Объясняем причину с помощью существительного',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_3,
        order: 2,
        grammarCode: G21,
        questions: mix20('gp_s3_u6_g21'),
      },
      {
        title: {
          ko: "'ㄹ' 불규칙",
          uz: "'ㄹ' irregular",
          en: "'ㄹ' Irregular",
          ru: "Нерегулярное 'ㄹ'",
        },
        description: {
          ko: 'ㄹ 받침 어간의 탈락과 활용 규칙 익히기',
          uz: 'ㄹ bilan tugagan negizlarning tushishi va tuslanishini o‘rganish',
          en: 'Learning conjugation rules for ㄹ-final stems',
          ru: 'Изучаем спряжение основ, оканчивающихся на ㄹ',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_3,
        order: 3,
        grammarCode: G22,
        questions: mix20('gp_s3_u6_g22'),
      },
      {
        title: {
          ko: 'V-(으)면 되다',
          uz: 'V-(으)면 되다',
          en: 'V-(으)면 되다',
          ru: 'V-(으)면 되다',
        },
        description: {
          ko: '필요한 행동이나 문제 해결 방법 말하기',
          uz: 'Kerakli harakat yoki muammoni hal qilish yo‘lini aytish',
          en: 'Explaining what needs to be done or how to solve a problem',
          ru: 'Объясняем, что достаточно сделать для решения проблемы',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_3,
        order: 4,
        grammarCode: G23,
        questions: mix20('gp_s3_u6_g23'),
      },
      {
        title: {
          ko: 'V-(으)ㄴ 것 같다',
          uz: 'V-(으)ㄴ 것 같다',
          en: 'V-(으)ㄴ 것 같다',
          ru: 'V-(으)ㄴ 것 같다',
        },
        description: {
          ko: '이미 일어난 행동을 정황으로 추측하기',
          uz: 'Tugallangan harakatni vaziyatga qarab taxmin qilish',
          en: 'Guessing about a completed action from evidence',
          ru: 'Предполагаем о завершённом действии по обстоятельствам',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_3,
        order: 5,
        grammarCode: G24,
        questions: mix20('gp_s3_u6_g24'),
      },
    ],
  },

  // ═══════════════════════════════════════════
  // UNIT 7
  // 한옥마을이 어디에 있는지 아세요?
  // ═══════════════════════════════════════════
  {
    title: {
      ko: '한옥마을이 어디에 있는지 아세요?',
      uz: 'Hanok qishlog‘i qayerdaligini bilasizmi?',
      en: 'Do You Know Where the Hanok Village Is?',
      ru: 'Вы знаете, где находится деревня ханоков?',
    },
    section: 3,
    unit: 7,
    order: 1,
    category: LessonCategory.GRAMMAR,
    isActive: true,
    lessons: [
      {
        title: {
          ko: 'A/V-(으)ㄹ 것 같다',
          uz: 'A/V-(으)ㄹ 것 같다',
          en: 'A/V-(으)ㄹ 것 같다',
          ru: 'A/V-(으)ㄹ 것 같다',
        },
        description: {
          ko: '앞으로 일어날 행동과 상태를 조심스럽게 추측하기',
          uz: 'Kelajakdagi harakat yoki holatni ehtiyotkorlik bilan taxmin qilish',
          en: 'Making careful predictions about future actions and states',
          ru: 'Осторожно предполагаем о будущих действиях и состояниях',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_3,
        order: 1,
        grammarCode: G25,
        questions: mix20('gp_s3_u7_g25'),
      },
      {
        title: {
          ko: 'V-는지 알다[모르다], N인지 알다[모르다]',
          uz: 'V-는지 알다[모르다], N인지 알다[모르다]',
          en: 'V-는지 알다[모르다], N인지 알다[모르다]',
          ru: 'V-는지 알다[모르다], N인지 알다[모르다]',
        },
        description: {
          ko: '궁금한 내용을 간접적으로 묻고 아는지 말하기',
          uz: 'Savol mazmunini bilish yoki bilmaslikni bilvosita aytish',
          en: 'Expressing indirect questions and whether you know the answer',
          ru: 'Передаём косвенный вопрос и говорим, знаем ли ответ',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_3,
        order: 2,
        grammarCode: G26,
        questions: mix20('gp_s3_u7_g26'),
      },
      {
        title: {
          ko: 'V-(으)려면',
          uz: 'V-(으)려면',
          en: 'V-(으)려면',
          ru: 'V-(으)려면',
        },
        description: {
          ko: '목표를 이루기 위해 필요한 조건과 방법 말하기',
          uz: 'Maqsadga erishish uchun kerakli shart va usulni aytish',
          en: 'Talking about conditions needed to achieve a goal',
          ru: 'Говорим об условиях, необходимых для достижения цели',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_3,
        order: 3,
        grammarCode: G27,
        questions: mix20('gp_s3_u7_g27'),
      },
      {
        title: {
          ko: 'V-다가',
          uz: 'V-다가',
          en: 'V-다가',
          ru: 'V-다가',
        },
        description: {
          ko: '하던 행동이 중단되고 다른 상황으로 바뀌는 것 말하기',
          uz: 'Davom etayotgan harakat to‘xtab boshqa vaziyatga o‘tishini aytish',
          en: 'Talking about an action being interrupted or changing midway',
          ru: 'Говорим о прерывании действия и переходе к другой ситуации',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_3,
        order: 4,
        grammarCode: G28,
        questions: mix20('gp_s3_u7_g28'),
      },
    ],
  },

  // ═══════════════════════════════════════════
  // UNIT 8
  // 정말 속상하겠어요
  // ═══════════════════════════════════════════
  {
    title: {
      ko: '정말 속상하겠어요',
      uz: 'Juda xafa bo‘lsangiz kerak',
      en: 'You Must Be Really Upset',
      ru: 'Наверное, вам очень обидно',
    },
    section: 3,
    unit: 8,
    order: 1,
    category: LessonCategory.GRAMMAR,
    isActive: true,
    lessons: [
      {
        title: {
          ko: 'A/V-겠-',
          uz: 'A/V-겠-',
          en: 'A/V-겠-',
          ru: 'A/V-겠-',
        },
        description: {
          ko: '상황을 보고 추측하거나 상대의 감정에 공감하기',
          uz: 'Vaziyatga qarab taxmin qilish yoki boshqaning hissiyotiga hamdardlik bildirish',
          en: 'Making situational guesses and showing empathy',
          ru: 'Предполагаем по ситуации и выражаем сочувствие',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_3,
        order: 1,
        grammarCode: G29,
        questions: mix20('gp_s3_u8_g29'),
      },
      {
        title: {
          ko: 'N 때문에',
          uz: 'N 때문에',
          en: 'N 때문에',
          ru: 'N 때문에',
        },
        description: {
          ko: '문제나 결과가 생긴 원인과 이유 말하기',
          uz: 'Muammo yoki natijaning sababini aytish',
          en: 'Talking about the cause of a result or problem',
          ru: 'Говорим о причине результата или проблемы',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_3,
        order: 2,
        grammarCode: G30,
        questions: mix20('gp_s3_u8_g30'),
      },
      {
        title: {
          ko: 'V-아/어 버리다',
          uz: 'V-아/어 버리다',
          en: 'V-아/어 버리다',
          ru: 'V-아/어 버리다',
        },
        description: {
          ko: '완전히 끝난 행동과 그에 대한 감정 표현하기',
          uz: 'Harakatning to‘liq tugashi va unga bo‘lgan hissiyotni ifodalash',
          en: 'Expressing a completed action with emotional nuance',
          ru: 'Выражаем полностью завершённое действие и отношение к нему',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_3,
        order: 3,
        grammarCode: G31,
        questions: mix20('gp_s3_u8_g31'),
      },
      {
        title: {
          ko: 'A/V-(으)ㄹ 때',
          uz: 'A/V-(으)ㄹ 때',
          en: 'A/V-(으)ㄹ 때',
          ru: 'A/V-(으)ㄹ 때',
        },
        description: {
          ko: '특정 행동이나 상태가 일어나는 때와 상황 말하기',
          uz: 'Harakat yoki holat yuz beradigan vaqt va vaziyatni aytish',
          en: 'Talking about when an action or state occurs',
          ru: 'Говорим о времени и ситуации действия или состояния',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_3,
        order: 4,
        grammarCode: G32,
        questions: mix20('gp_s3_u8_g32'),
      },
    ],
  },

  // ═══════════════════════════════════════════
  // UNIT 9
  // 문의할 게 있는데요
  // ═══════════════════════════════════════════
  {
    title: {
      ko: '문의할 게 있는데요',
      uz: 'Bir narsani so‘ramoqchi edim',
      en: 'I Have a Question',
      ru: 'Я хотел кое-что уточнить',
    },
    section: 3,
    unit: 9,
    order: 1,
    category: LessonCategory.GRAMMAR,
    isActive: true,
    lessons: [
      {
        title: {
          ko: 'A-(으)ㄴ데요, V-는데요, N인데요',
          uz: 'A-(으)ㄴ데요, V-는데요, N인데요',
          en: 'A-(으)ㄴ데요, V-는데요, N인데요',
          ru: 'A-(으)ㄴ데요, V-는데요, N인데요',
        },
        description: {
          ko: '상황을 부드럽게 설명하고 상대의 반응 기다리기',
          uz: 'Vaziyatni yumshoq tushuntirib, suhbatdoshning javobini kutish',
          en: 'Softly providing context and inviting a response',
          ru: 'Мягко объясняем ситуацию и ожидаем реакцию собеседника',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_3,
        order: 1,
        grammarCode: G33,
        questions: mix20('gp_s3_u9_g33'),
      },
      {
        title: {
          ko: 'V-는 중이다, N 중이다',
          uz: 'V-는 중이다, N 중이다',
          en: 'V-는 중이다, N 중이다',
          ru: 'V-는 중이다, N 중이다',
        },
        description: {
          ko: '현재 어떤 행동이나 활동이 진행 중임을 말하기',
          uz: 'Harakat yoki faoliyat ayni paytda davom etayotganini aytish',
          en: 'Talking about an action or activity currently in progress',
          ru: 'Говорим о действии или процессе, происходящем сейчас',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_3,
        order: 2,
        grammarCode: G34,
        questions: mix20('gp_s3_u9_g34'),
      },
      {
        title: {
          ko: 'A-(으)ㄴ가요?, V-나요?, N인가요?',
          uz: 'A-(으)ㄴ가요?, V-나요?, N인가요?',
          en: 'A-(으)ㄴ가요?, V-나요?, N인가요?',
          ru: 'A-(으)ㄴ가요?, V-나요?, N인가요?',
        },
        description: {
          ko: '궁금한 정보를 자연스럽고 부드럽게 질문하기',
          uz: 'Qiziqtirgan ma’lumotni tabiiy va muloyim tarzda so‘rash',
          en: 'Asking for information naturally and politely',
          ru: 'Мягко и естественно задаём вопросы',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_3,
        order: 3,
        grammarCode: G35,
        questions: mix20('gp_s3_u9_g35'),
      },
      {
        title: {
          ko: 'N밖에',
          uz: 'N밖에',
          en: 'N밖에',
          ru: 'N밖에',
        },
        description: {
          ko: '적은 수량이나 제한된 대상만 있음을 부정 표현과 함께 말하기',
          uz: 'Kam miqdor yoki cheklangan narsani inkor ifoda bilan aytish',
          en: 'Expressing that there is only a limited amount or choice',
          ru: 'Выражаем ограниченное количество с отрицательной формой',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_3,
        order: 4,
        grammarCode: G36,
        questions: mix20('gp_s3_u9_g36'),
      },
    ],
  },
];
