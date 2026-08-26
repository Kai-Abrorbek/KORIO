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
      level: '2',
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
  rows: { options: string[]; correct: string; glue?: boolean }[],
  gloss: { uz: string; en: string; ru: string },
) {
  // 조각을 단어/문법 단위로 쪼갰기 때문에 그냥 이으면 "학생 이에요." 가 된다.
  // glue 가 붙은 조각은 앞말에 공백 없이 이어야 원문 띄어쓰기가 살아난다.
  const full = rows.reduce(
    (acc, row, i) =>
      i === 0 || row.glue ? acc + row.correct : acc + ' ' + row.correct,
    '',
  );

  return {
    [code]: {
      type: 'grammar_build',
      level: '2',
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
// 가족 · 실력 · 높임말
// ═══════════════════════════════════════════════════════════

// ─────────────────────────────────────────────
// 문법 1. N(의) N
// ─────────────────────────────────────────────
const G1 = 'possessive-ui';

const G1_Q = {
  // grammar_blank 10
  ...blank('gp_s2_u1_g1_01', G1, '이것은 민수의 가방이에요.', '민수의', {
    uz: 'Bu Minsuning sumkasi.',
    en: "This is Minsu's bag.",
    ru: 'Это сумка Минсу.',
  }),

  ...blank('gp_s2_u1_g1_02', G1, '제 이름은 아브로르예요.', '제', {
    uz: 'Mening ismim Abror.',
    en: 'My name is Abror.',
    ru: 'Меня зовут Аброр.',
  }),

  ...blank('gp_s2_u1_g1_03', G1, '이 사람은 내 친구예요.', '내', {
    uz: "Bu mening do'stim.",
    en: 'This person is my friend.',
    ru: 'Этот человек — мой друг.',
  }),

  ...blank('gp_s2_u1_g1_04', G1, '저분은 친구의 어머니예요.', '친구의', {
    uz: "U kishi do'stimning onasi.",
    en: "That person is my friend's mother.",
    ru: 'Та женщина — мама моего друга.',
  }),

  ...blank('gp_s2_u1_g1_05', G1, '이것은 선생님의 책이에요.', '선생님의', {
    uz: "Bu o'qituvchining kitobi.",
    en: "This is the teacher's book.",
    ru: 'Это книга учителя.',
  }),

  ...blank('gp_s2_u1_g1_06', G1, '제 가족은 모두 네 명이에요.', '제', {
    uz: "Mening oilamda jami to'rt kishi bor.",
    en: 'There are four people in my family.',
    ru: 'В моей семье четыре человека.',
  }),

  ...blank(
    'gp_s2_u1_g1_07',
    G1,
    '민수 씨의 누나는 회사원이에요.',
    '민수 씨의',
    {
      uz: 'Minsuning opasi ofis xodimi.',
      en: "Minsu's older sister is an office worker.",
      ru: 'Старшая сестра Минсу работает в компании.',
    },
  ),

  ...blank(
    'gp_s2_u1_g1_08',
    G1,
    '이건 우리 아버지의 자동차예요.',
    '우리 아버지의',
    {
      uz: 'Bu otamning mashinasi.',
      en: "This is my father's car.",
      ru: 'Это машина моего отца.',
    },
  ),

  ...blank('gp_s2_u1_g1_09', G1, '제 친구의 이름은 수진이에요.', '제 친구의', {
    uz: "Do'stimning ismi Sujin.",
    en: "My friend's name is Sujin.",
    ru: 'Мою подругу зовут Суджин.',
  }),

  ...blank('gp_s2_u1_g1_10', G1, '저것은 누구의 휴대폰이에요?', '누구의', {
    uz: 'U kimning telefoni?',
    en: 'Whose phone is that?',
    ru: 'Чей это телефон?',
  }),

  // grammar_build 10
  ...build(
    'gp_s2_u1_g1_11',
    G1,
    [
      {
        options: ['이것은', '이것는', '이것을'],
        correct: '이것은',
      },
      {
        options: ['민수의', '해', '개'],
        correct: '민수의',
      },
      {
        options: ['가방', '가방이', '가방을'],
        correct: '가방',
      },
      {
        options: ['이에요.', '예요.', '입니다.'],
        correct: '이에요.',
        glue: true,
      },
    ],
    {
      uz: 'Bu Minsuning sumkasi.',
      en: "This is Minsu's bag.",
      ru: 'Это сумка Минсу.',
    },
  ),

  ...build(
    'gp_s2_u1_g1_12',
    G1,
    [
      {
        options: ['제', '저', '내'],
        correct: '제',
      },
      {
        options: ['이름은', '이름는', '이름을'],
        correct: '이름은',
      },
      {
        options: ['유나', '유나가', '유나를'],
        correct: '유나',
      },
      {
        options: ['예요.', '이에요.', '입니다.'],
        correct: '예요.',
        glue: true,
      },
    ],
    {
      uz: 'Mening ismim Yuna.',
      en: 'My name is Yuna.',
      ru: 'Меня зовут Юна.',
    },
  ),

  ...build(
    'gp_s2_u1_g1_13',
    G1,
    [
      {
        options: ['이분은', '이분는', '이분을'],
        correct: '이분은',
      },
      {
        options: ['제', '저', '내'],
        correct: '제',
      },
      {
        options: ['친구의', '쭉', '탈'],
        correct: '친구의',
      },
      {
        options: ['아버지', '아버지가', '아버지를'],
        correct: '아버지',
      },
      {
        options: ['예요.', '이에요.', '입니다.'],
        correct: '예요.',
        glue: true,
      },
    ],
    {
      uz: "Bu kishi do'stimning otasi.",
      en: "This person is my friend's father.",
      ru: 'Этот человек — отец моего друга.',
    },
  ),

  ...build(
    'gp_s2_u1_g1_14',
    G1,
    [
      {
        options: ['이것은', '이것는', '이것을'],
        correct: '이것은',
      },
      {
        options: ['선생님의', '쭉', '큰'],
        correct: '선생님의',
      },
      {
        options: ['우산', '우산이', '우산을'],
        correct: '우산',
      },
      {
        options: ['이에요.', '예요.', '입니다.'],
        correct: '이에요.',
        glue: true,
      },
    ],
    {
      uz: "Bu o'qituvchining soyaboni.",
      en: "This is the teacher's umbrella.",
      ru: 'Это зонт учителя.',
    },
  ),

  ...build(
    'gp_s2_u1_g1_15',
    G1,
    [
      {
        options: ['저분은', '저분는', '저분을'],
        correct: '저분은',
      },
      {
        options: ['민수', '뭐', '볼'],
        correct: '민수',
      },
      {
        options: ['씨의', '삼십', '수업'],
        correct: '씨의',
      },
      {
        options: ['어머니', '쉬워요.', '썼어요.'],
        correct: '어머니',
      },
      {
        options: ['예요.', '이에요.', '입니다.'],
        correct: '예요.',
        glue: true,
      },
    ],
    {
      uz: 'U kishi Minsuning onasi.',
      en: "That person is Minsu's mother.",
      ru: 'Та женщина — мама Минсу.',
    },
  ),

  ...build(
    'gp_s2_u1_g1_16',
    G1,
    [
      {
        options: ['제', '저', '내'],
        correct: '제',
      },
      {
        options: ['가족은', '가족는', '가족을'],
        correct: '가족은',
      },
      {
        options: ['다섯', '열두', '열'],
        correct: '다섯',
      },
      {
        options: ['명', '명이', '명을'],
        correct: '명',
      },
      {
        options: ['이에요.', '예요.', '입니다.'],
        correct: '이에요.',
        glue: true,
      },
    ],
    {
      uz: 'Mening oilamda besh kishi bor.',
      en: 'There are five people in my family.',
      ru: 'В моей семье пять человек.',
    },
  ),

  ...build(
    'gp_s2_u1_g1_17',
    G1,
    [
      {
        options: ['이건', '오전', '은행'],
        correct: '이건',
      },
      {
        options: ['누구의', '버스', '분'],
        correct: '누구의',
      },
      {
        options: ['책', '책이', '책을'],
        correct: '책',
      },
      {
        options: ['이에요?', '예요?', '입니다?'],
        correct: '이에요?',
        glue: true,
      },
    ],
    {
      uz: 'Bu kimning kitobi?',
      en: 'Whose book is this?',
      ru: 'Чья это книга?',
    },
  ),

  ...build(
    'gp_s2_u1_g1_18',
    G1,
    [
      {
        options: ['제', '저', '내'],
        correct: '제',
      },
      {
        options: ['친구는', '친구은', '친구를'],
        correct: '친구는',
      },
      {
        options: ['한국', '청소할', '푹'],
        correct: '한국',
      },
      {
        options: ['사람', '사람이', '사람을'],
        correct: '사람',
      },
      {
        options: ['이에요.', '예요.', '입니다.'],
        correct: '이에요.',
        glue: true,
      },
    ],
    {
      uz: "Mening do'stim koreys.",
      en: 'My friend is Korean.',
      ru: 'Мой друг — кореец.',
    },
  ),

  ...build(
    'gp_s2_u1_g1_19',
    G1,
    [
      {
        options: ['우리', '수진', '씨'],
        correct: '우리',
      },
      {
        options: ['아버지의', '부모님께', '살'],
        correct: '아버지의',
      },
      {
        options: ['회사', '회사가', '회사를'],
        correct: '회사',
      },
      {
        options: ['예요.', '이에요.', '입니다.'],
        correct: '예요.',
        glue: true,
      },
    ],
    {
      uz: 'Bu otamning kompaniyasi.',
      en: "It is my father's company.",
      ru: 'Это компания моего отца.',
    },
  ),

  ...build(
    'gp_s2_u1_g1_20',
    G1,
    [
      {
        options: ['이', '그', '저'],
        correct: '이',
      },
      {
        options: ['사람은', '사람는', '사람을'],
        correct: '사람은',
      },
      {
        options: ['내', '제', '네'],
        correct: '내',
      },
      {
        options: ['친구', '친구가', '친구를'],
        correct: '친구',
      },
      {
        options: ['예요.', '이에요.', '입니다.'],
        correct: '예요.',
        glue: true,
      },
    ],
    {
      uz: "Bu mening do'stim.",
      en: 'This person is my friend.',
      ru: 'Этот человек — мой друг.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 2. N을/를 잘하다 [잘 못하다, 못하다]
// ─────────────────────────────────────────────
const G2 = 'skill-jalhada';

const G2_Q = {
  // grammar_blank 10
  ...blank('gp_s2_u1_g2_01', G2, '저는 요리를 잘해요.', '요리를 잘해요', {
    uz: 'Men yaxshi ovqat pishiraman.',
    en: 'I am good at cooking.',
    ru: 'Я хорошо готовлю.',
  }),

  ...blank(
    'gp_s2_u1_g2_02',
    G2,
    '마리아는 한국어를 잘해요.',
    '한국어를 잘해요',
    {
      uz: 'Mariya koreys tilini yaxshi biladi.',
      en: 'Maria is good at Korean.',
      ru: 'Мария хорошо знает корейский.',
    },
  ),

  ...blank('gp_s2_u1_g2_03', G2, '저는 운전을 잘 못해요.', '운전을 잘 못해요', {
    uz: 'Men mashinani unchalik yaxshi hayday olmayman.',
    en: 'I am not very good at driving.',
    ru: 'Я не очень хорошо вожу машину.',
  }),

  ...blank('gp_s2_u1_g2_04', G2, '동생은 수학을 못해요.', '수학을 못해요', {
    uz: 'Ukam matematikani bilmaydi.',
    en: 'My younger sibling is bad at math.',
    ru: 'Мой младший брат плохо знает математику.',
  }),

  ...blank('gp_s2_u1_g2_05', G2, '친구는 노래를 잘해요.', '노래를 잘해요', {
    uz: "Do'stim yaxshi qo'shiq aytadi.",
    en: 'My friend is good at singing.',
    ru: 'Мой друг хорошо поёт.',
  }),

  ...blank('gp_s2_u1_g2_06', G2, '저는 춤을 잘 못해요.', '춤을 잘 못해요', {
    uz: 'Men unchalik yaxshi raqsga tushmayman.',
    en: 'I am not very good at dancing.',
    ru: 'Я не очень хорошо танцую.',
  }),

  ...blank('gp_s2_u1_g2_07', G2, '민수는 축구를 잘해요.', '축구를 잘해요', {
    uz: 'Minsu futbolni yaxshi o‘ynaydi.',
    en: 'Minsu is good at soccer.',
    ru: 'Минсу хорошо играет в футбол.',
  }),

  ...blank('gp_s2_u1_g2_08', G2, '저는 스키를 못해요.', '스키를 못해요', {
    uz: 'Men chang‘i ucha olmayman.',
    en: 'I cannot ski.',
    ru: 'Я не умею кататься на лыжах.',
  }),

  ...blank('gp_s2_u1_g2_09', G2, '수진은 영어를 잘해요.', '영어를 잘해요', {
    uz: 'Sujin ingliz tilini yaxshi biladi.',
    en: 'Sujin is good at English.',
    ru: 'Суджин хорошо знает английский.',
  }),

  ...blank('gp_s2_u1_g2_10', G2, '저는 수영을 잘 못해요.', '수영을 잘 못해요', {
    uz: 'Men unchalik yaxshi suza olmayman.',
    en: 'I am not very good at swimming.',
    ru: 'Я не очень хорошо плаваю.',
  }),

  // grammar_build 10
  ...build(
    'gp_s2_u1_g2_11',
    G2,
    [
      {
        options: ['저는', '저은', '저를'],
        correct: '저는',
      },
      {
        options: ['요리를', '요리을', '요리는'],
        correct: '요리를',
      },
      {
        options: ['잘해요.', '운동해요.', '깨끗해요.'],
        correct: '잘해요.',
      },
    ],
    {
      uz: 'Men yaxshi ovqat pishiraman.',
      en: 'I am good at cooking.',
      ru: 'Я хорошо готовлю.',
    },
  ),

  ...build(
    'gp_s2_u1_g2_12',
    G2,
    [
      {
        options: ['저는', '저은', '저를'],
        correct: '저는',
      },
      {
        options: ['운전을', '운전를', '운전은'],
        correct: '운전을',
      },
      {
        options: ['잘', '열심히', '올'],
        correct: '잘',
      },
      {
        options: ['못해요.', '깨끗해요.', '좋아해요.'],
        correct: '못해요.',
      },
    ],
    {
      uz: 'Men unchalik yaxshi mashina haydamayman.',
      en: 'I am not very good at driving.',
      ru: 'Я не очень хорошо вожу машину.',
    },
  ),

  ...build(
    'gp_s2_u1_g2_13',
    G2,
    [
      {
        options: ['민수는', '민수은', '민수를'],
        correct: '민수는',
      },
      {
        options: ['축구를', '축구을', '축구는'],
        correct: '축구를',
      },
      {
        options: ['잘해요.', '운동해요.', '깨끗해요.'],
        correct: '잘해요.',
      },
    ],
    {
      uz: 'Minsu futbolni yaxshi o‘ynaydi.',
      en: 'Minsu is good at soccer.',
      ru: 'Минсу хорошо играет в футбол.',
    },
  ),

  ...build(
    'gp_s2_u1_g2_14',
    G2,
    [
      {
        options: ['동생은', '동생는', '동생을'],
        correct: '동생은',
      },
      {
        options: ['수학을', '수학를', '수학은'],
        correct: '수학을',
      },
      {
        options: ['못해요.', '잘해요.', '시작해요.'],
        correct: '못해요.',
      },
    ],
    {
      uz: 'Ukam matematikani bilmaydi.',
      en: 'My younger sibling is bad at math.',
      ru: 'Мой младший брат плохо знает математику.',
    },
  ),

  ...build(
    'gp_s2_u1_g2_15',
    G2,
    [
      {
        options: ['수진은', '수진는', '수진을'],
        correct: '수진은',
      },
      {
        options: ['영어를', '영어을', '영어는'],
        correct: '영어를',
      },
      {
        options: ['잘해요.', '이야기해요.', '도착해요.'],
        correct: '잘해요.',
      },
    ],
    {
      uz: 'Sujin ingliz tilini yaxshi biladi.',
      en: 'Sujin is good at English.',
      ru: 'Суджин хорошо знает английский.',
    },
  ),

  ...build(
    'gp_s2_u1_g2_16',
    G2,
    [
      {
        options: ['저는', '저은', '저를'],
        correct: '저는',
      },
      {
        options: ['춤을', '춤를', '춤은'],
        correct: '춤을',
      },
      {
        options: ['잘', '어떤', '오십'],
        correct: '잘',
      },
      {
        options: ['못해요.', '일해요.', '도착해요.'],
        correct: '못해요.',
      },
    ],
    {
      uz: 'Men unchalik yaxshi raqsga tushmayman.',
      en: 'I am not very good at dancing.',
      ru: 'Я не очень хорошо танцую.',
    },
  ),

  ...build(
    'gp_s2_u1_g2_17',
    G2,
    [
      {
        options: ['친구는', '친구은', '친구를'],
        correct: '친구는',
      },
      {
        options: ['노래를', '노래을', '노래는'],
        correct: '노래를',
      },
      {
        options: ['잘해요.', '공부해요.', '조용해요.'],
        correct: '잘해요.',
      },
    ],
    {
      uz: "Do'stim yaxshi qo'shiq aytadi.",
      en: 'My friend sings well.',
      ru: 'Мой друг хорошо поёт.',
    },
  ),

  ...build(
    'gp_s2_u1_g2_18',
    G2,
    [
      {
        options: ['저는', '저은', '저를'],
        correct: '저는',
      },
      {
        options: ['스키를', '스키을', '스키는'],
        correct: '스키를',
      },
      {
        options: ['못해요.', '일해요.', '도착해요.'],
        correct: '못해요.',
      },
    ],
    {
      uz: 'Men chang‘i ucha olmayman.',
      en: 'I cannot ski.',
      ru: 'Я не умею кататься на лыжах.',
    },
  ),

  ...build(
    'gp_s2_u1_g2_19',
    G2,
    [
      {
        options: ['마리아는', '마리아은', '마리아를'],
        correct: '마리아는',
      },
      {
        options: ['한국어를', '한국어을', '한국어는'],
        correct: '한국어를',
      },
      {
        options: ['잘해요.', '좋아해요.', '운동해요.'],
        correct: '잘해요.',
      },
    ],
    {
      uz: 'Mariya koreys tilini yaxshi biladi.',
      en: 'Maria is good at Korean.',
      ru: 'Мария хорошо знает корейский.',
    },
  ),

  ...build(
    'gp_s2_u1_g2_20',
    G2,
    [
      {
        options: ['저는', '저은', '저를'],
        correct: '저는',
      },
      {
        options: ['수영을', '수영를', '수영은'],
        correct: '수영을',
      },
      {
        options: ['잘', '가', '계산할'],
        correct: '잘',
      },
      {
        options: ['못해요.', '해요.', '잘해요.'],
        correct: '못해요.',
      },
    ],
    {
      uz: 'Men unchalik yaxshi suza olmayman.',
      en: 'I am not very good at swimming.',
      ru: 'Я не очень хорошо плаваю.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 3. N(이)세요
// ─────────────────────────────────────────────
const G3 = 'honor-iseyo';

const G3_Q = {
  // grammar_blank 10
  ...blank('gp_s2_u1_g3_01', G3, '이분은 우리 어머니세요.', '어머니세요', {
    uz: 'Bu kishi mening onam.',
    en: 'This person is my mother.',
    ru: 'Это моя мама.',
  }),

  ...blank('gp_s2_u1_g3_02', G3, '아버지는 회사원이세요.', '회사원이세요', {
    uz: 'Otam kompaniya xodimi.',
    en: 'My father is an office worker.',
    ru: 'Мой отец работает в компании.',
  }),

  ...blank('gp_s2_u1_g3_03', G3, '이분은 의사세요.', '의사세요', {
    uz: 'Bu kishi shifokor.',
    en: 'This person is a doctor.',
    ru: 'Этот человек — врач.',
  }),

  ...blank(
    'gp_s2_u1_g3_04',
    G3,
    '우리 할머니는 선생님이세요.',
    '선생님이세요',
    {
      uz: "Buvim o'qituvchi.",
      en: 'My grandmother is a teacher.',
      ru: 'Моя бабушка — учитель.',
    },
  ),

  ...blank('gp_s2_u1_g3_05', G3, '저분은 민수 씨의 아버지세요.', '아버지세요', {
    uz: 'U kishi Minsuning otasi.',
    en: "That person is Minsu's father.",
    ru: 'Тот человек — отец Минсу.',
  }),

  ...blank(
    'gp_s2_u1_g3_06',
    G3,
    '어머니는 영어 선생님이세요.',
    '선생님이세요',
    {
      uz: "Onam ingliz tili o'qituvchisi.",
      en: 'My mother is an English teacher.',
      ru: 'Моя мама — учитель английского языка.',
    },
  ),

  ...blank('gp_s2_u1_g3_07', G3, '이분은 우리 할아버지세요.', '할아버지세요', {
    uz: 'Bu kishi mening bobom.',
    en: 'This person is my grandfather.',
    ru: 'Это мой дедушка.',
  }),

  ...blank(
    'gp_s2_u1_g3_08',
    G3,
    '저분은 학교 교장 선생님이세요.',
    '교장 선생님이세요',
    {
      uz: 'U kishi maktab direktori.',
      en: 'That person is the school principal.',
      ru: 'Тот человек — директор школы.',
    },
  ),

  ...blank('gp_s2_u1_g3_09', G3, '이분은 누구세요?', '누구세요', {
    uz: 'Bu kishi kim?',
    en: 'Who is this person?',
    ru: 'Кто этот человек?',
  }),

  ...blank('gp_s2_u1_g3_10', G3, '수진 씨의 어머니는 기자세요.', '기자세요', {
    uz: 'Sujinning onasi jurnalist.',
    en: "Sujin's mother is a journalist.",
    ru: 'Мама Суджин — журналист.',
  }),

  // grammar_build 10
  ...build(
    'gp_s2_u1_g3_11',
    G3,
    [
      {
        options: ['이분은', '이분는', '이분을'],
        correct: '이분은',
      },
      {
        options: ['우리', '번', '비빔밥'],
        correct: '우리',
      },
      {
        options: ['어머니', '앉으세요.', '여세요.'],
        correct: '어머니',
      },
      {
        options: ['세요.', '이세요.', '이에요.'],
        correct: '세요.',
        glue: true,
      },
    ],
    {
      uz: 'Bu kishi mening onam.',
      en: 'This person is my mother.',
      ru: 'Это моя мама.',
    },
  ),

  ...build(
    'gp_s2_u1_g3_12',
    G3,
    [
      {
        options: ['아버지는', '아버지은', '아버지를'],
        correct: '아버지는',
      },
      {
        options: ['회사원', '회사원이', '회사원을'],
        correct: '회사원',
      },
      {
        options: ['이세요.', '이에요.', '예요.'],
        correct: '이세요.',
        glue: true,
      },
    ],
    {
      uz: 'Otam kompaniya xodimi.',
      en: 'My father is an office worker.',
      ru: 'Мой отец работает в компании.',
    },
  ),

  ...build(
    'gp_s2_u1_g3_13',
    G3,
    [
      {
        options: ['이분은', '이분는', '이분을'],
        correct: '이분은',
      },
      {
        options: ['의사세요.', '친절하세요.', '드세요.'],
        correct: '의사세요.',
      },
    ],
    {
      uz: 'Bu kishi shifokor.',
      en: 'This person is a doctor.',
      ru: 'Этот человек — врач.',
    },
  ),

  ...build(
    'gp_s2_u1_g3_14',
    G3,
    [
      {
        options: ['우리', '우유', '일'],
        correct: '우리',
      },
      {
        options: ['할머니는', '할머니은', '할머니를'],
        correct: '할머니는',
      },
      {
        options: ['선생님', '선생님이', '선생님을'],
        correct: '선생님',
      },
      {
        options: ['이세요.', '이에요.', '예요.'],
        correct: '이세요.',
        glue: true,
      },
    ],
    {
      uz: "Buvim o'qituvchi.",
      en: 'My grandmother is a teacher.',
      ru: 'Моя бабушка — учитель.',
    },
  ),

  ...build(
    'gp_s2_u1_g3_15',
    G3,
    [
      {
        options: ['저분은', '저분는', '저분을'],
        correct: '저분은',
      },
      {
        options: ['민수', '수진', '씨'],
        correct: '민수',
      },
      {
        options: ['씨의', '시간쯤', '아침'],
        correct: '씨의',
      },
      {
        options: ['아버지', '아버지가', '아버지를'],
        correct: '아버지',
      },
      {
        options: ['세요.', '이세요.', '이에요.'],
        correct: '세요.',
        glue: true,
      },
    ],
    {
      uz: 'U kishi Minsuning otasi.',
      en: "That person is Minsu's father.",
      ru: 'Тот человек — отец Минсу.',
    },
  ),

  ...build(
    'gp_s2_u1_g3_16',
    G3,
    [
      {
        options: ['어머니는', '어머니은', '어머니를'],
        correct: '어머니는',
      },
      {
        options: ['영어', '입어', '읽어'],
        correct: '영어',
      },
      {
        options: ['선생님', '선생님이', '선생님을'],
        correct: '선생님',
      },
      {
        options: ['이세요.', '이에요.', '예요.'],
        correct: '이세요.',
        glue: true,
      },
    ],
    {
      uz: "Onam ingliz tili o'qituvchisi.",
      en: 'My mother is an English teacher.',
      ru: 'Моя мама — учитель английского языка.',
    },
  ),

  ...build(
    'gp_s2_u1_g3_17',
    G3,
    [
      {
        options: ['이분은', '이분는', '이분을'],
        correct: '이분은',
      },
      {
        options: ['우리', '잠깐', '줄'],
        correct: '우리',
      },
      {
        options: ['할아버지', '할아버지가', '할아버지를'],
        correct: '할아버지',
      },
      {
        options: ['세요.', '이세요.', '이에요.'],
        correct: '세요.',
        glue: true,
      },
    ],
    {
      uz: 'Bu kishi mening bobom.',
      en: 'This person is my grandfather.',
      ru: 'Это мой дедушка.',
    },
  ),

  ...build(
    'gp_s2_u1_g3_18',
    G3,
    [
      {
        options: ['저분은', '저분는', '저분을'],
        correct: '저분은',
      },
      {
        options: ['교장', '해', '개'],
        correct: '교장',
      },
      {
        options: ['선생님', '선생님이', '선생님을'],
        correct: '선생님',
      },
      {
        options: ['이세요.', '이에요.', '예요.'],
        correct: '이세요.',
        glue: true,
      },
    ],
    {
      uz: 'U kishi maktab direktori.',
      en: 'That person is the school principal.',
      ru: 'Тот человек — директор школы.',
    },
  ),

  ...build(
    'gp_s2_u1_g3_19',
    G3,
    [
      {
        options: ['이분은', '이분는', '이분을'],
        correct: '이분은',
      },
      {
        options: ['누구세요?', '파세요?', '아세요?'],
        correct: '누구세요?',
      },
    ],
    {
      uz: 'Bu kishi kim?',
      en: 'Who is this person?',
      ru: 'Кто этот человек?',
    },
  ),

  ...build(
    'gp_s2_u1_g3_20',
    G3,
    [
      {
        options: ['수진', '은행', '잃어버린'],
        correct: '수진',
      },
      {
        options: ['씨의', '자주', '조금'],
        correct: '씨의',
      },
      {
        options: ['어머니는', '어머니은', '어머니를'],
        correct: '어머니는',
      },
      {
        options: ['기자세요.', '말하세요.', '오세요.'],
        correct: '기자세요.',
      },
    ],
    {
      uz: 'Sujinning onasi jurnalist.',
      en: "Sujin's mother is a journalist.",
      ru: 'Мама Суджин — журналист.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 4. A/V-(으)시-
// ─────────────────────────────────────────────
const G4 = 'honor-usi';

const G4_Q = {
  // grammar_blank 10
  ...blank('gp_s2_u1_g4_01', G4, '아버지는 회사에 다니세요.', '다니세요', {
    uz: 'Otam kompaniyada ishlaydi.',
    en: 'My father works at a company.',
    ru: 'Мой отец работает в компании.',
  }),

  ...blank('gp_s2_u1_g4_02', G4, '김 선생님은 아주 친절하세요.', '친절하세요', {
    uz: "O'qituvchi Kim juda mehribon.",
    en: 'Teacher Kim is very kind.',
    ru: 'Учитель Ким очень добрый.',
  }),

  ...blank('gp_s2_u1_g4_03', G4, '할머니는 책을 많이 읽으세요.', '읽으세요', {
    uz: "Buvim ko'p kitob o'qiydi.",
    en: 'My grandmother reads many books.',
    ru: 'Моя бабушка много читает.',
  }),

  ...blank('gp_s2_u1_g4_04', G4, '아버지는 요리를 잘하세요.', '잘하세요', {
    uz: 'Otam yaxshi ovqat pishiradi.',
    en: 'My father is good at cooking.',
    ru: 'Мой отец хорошо готовит.',
  }),

  ...blank(
    'gp_s2_u1_g4_05',
    G4,
    '어머니는 항상 일찍 일어나세요.',
    '일어나세요',
    {
      uz: 'Onam har doim erta turadi.',
      en: 'My mother always gets up early.',
      ru: 'Моя мама всегда рано встаёт.',
    },
  ),

  ...blank('gp_s2_u1_g4_06', G4, '할아버지는 신문을 읽으세요.', '읽으세요', {
    uz: "Bobom gazeta o'qiydi.",
    en: 'My grandfather reads the newspaper.',
    ru: 'Мой дедушка читает газету.',
  }),

  ...blank('gp_s2_u1_g4_07', G4, '선생님은 오늘 조금 바쁘세요.', '바쁘세요', {
    uz: "O'qituvchi bugun biroz band.",
    en: 'The teacher is a little busy today.',
    ru: 'Учитель сегодня немного занят.',
  }),

  ...blank('gp_s2_u1_g4_08', G4, '우리 할머니는 친구가 많으세요.', '많으세요', {
    uz: "Buvimning do'stlari ko'p.",
    en: 'My grandmother has many friends.',
    ru: 'У моей бабушки много друзей.',
  }),

  ...blank('gp_s2_u1_g4_09', G4, '아버지는 어제 부산에 가셨어요.', '가셨어요', {
    uz: 'Otam kecha Pusanga bordi.',
    en: 'My father went to Busan yesterday.',
    ru: 'Мой отец вчера ездил в Пусан.',
  }),

  ...blank(
    'gp_s2_u1_g4_10',
    G4,
    '선생님은 어제 이 책을 읽으셨어요.',
    '읽으셨어요',
    {
      uz: "O'qituvchi kecha bu kitobni o'qidi.",
      en: 'The teacher read this book yesterday.',
      ru: 'Учитель вчера прочитал эту книгу.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s2_u1_g4_11',
    G4,
    [
      {
        options: ['아버지는', '아버지은', '아버지를'],
        correct: '아버지는',
      },
      {
        options: ['회사에', '회사에서', '회사까지'],
        correct: '회사에',
      },
      {
        options: ['다니세요.', '앉으세요.', '전화하세요.'],
        correct: '다니세요.',
      },
    ],
    {
      uz: 'Otam kompaniyada ishlaydi.',
      en: 'My father works at a company.',
      ru: 'Мой отец работает в компании.',
    },
  ),

  ...build(
    'gp_s2_u1_g4_12',
    G4,
    [
      {
        options: ['김', '시간', '아브로르'],
        correct: '김',
      },
      {
        options: ['선생님은', '선생님는', '선생님을'],
        correct: '선생님은',
      },
      {
        options: ['아주', '전화할', '집'],
        correct: '아주',
      },
      {
        options: ['친절하세요.', '마세요.', '앉으세요.'],
        correct: '친절하세요.',
      },
    ],
    {
      uz: "O'qituvchi Kim juda mehribon.",
      en: 'Teacher Kim is very kind.',
      ru: 'Учитель Ким очень добрый.',
    },
  ),

  ...build(
    'gp_s2_u1_g4_13',
    G4,
    [
      {
        options: ['할머니는', '할머니은', '할머니를'],
        correct: '할머니는',
      },
      {
        options: ['책을', '책를', '책은'],
        correct: '책을',
      },
      {
        options: ['읽으세요.', '일어나세요.', '기다리세요.'],
        correct: '읽으세요.',
      },
    ],
    {
      uz: "Buvim kitob o'qiydi.",
      en: 'My grandmother reads books.',
      ru: 'Моя бабушка читает книги.',
    },
  ),

  ...build(
    'gp_s2_u1_g4_14',
    G4,
    [
      {
        options: ['어머니는', '어머니은', '어머니를'],
        correct: '어머니는',
      },
      {
        options: ['항상', '누구의', '만날'],
        correct: '항상',
      },
      {
        options: ['일찍', '누구의', '만날'],
        correct: '일찍',
      },
      {
        options: ['일어나세요.', '쓰세요.', '전화하세요.'],
        correct: '일어나세요.',
      },
    ],
    {
      uz: 'Onam har doim erta turadi.',
      en: 'My mother always gets up early.',
      ru: 'Моя мама всегда рано встаёт.',
    },
  ),

  ...build(
    'gp_s2_u1_g4_15',
    G4,
    [
      {
        options: ['할아버지는', '할아버지은', '할아버지를'],
        correct: '할아버지는',
      },
      {
        options: ['신문을', '신문를', '신문은'],
        correct: '신문을',
      },
      {
        options: ['읽으세요.', '기다리세요.', '말하세요.'],
        correct: '읽으세요.',
      },
    ],
    {
      uz: "Bobom gazeta o'qiydi.",
      en: 'My grandfather reads the newspaper.',
      ru: 'Мой дедушка читает газету.',
    },
  ),

  ...build(
    'gp_s2_u1_g4_16',
    G4,
    [
      {
        options: ['선생님은', '선생님는', '선생님을'],
        correct: '선생님은',
      },
      {
        options: ['오늘', '만날', '모임'],
        correct: '오늘',
      },
      {
        options: ['조금', '우즈베키스탄', '일찍'],
        correct: '조금',
      },
      {
        options: ['바쁘세요.', '닫으세요.', '보세요.'],
        correct: '바쁘세요.',
      },
    ],
    {
      uz: "O'qituvchi bugun biroz band.",
      en: 'The teacher is a little busy today.',
      ru: 'Учитель сегодня немного занят.',
    },
  ),

  ...build(
    'gp_s2_u1_g4_17',
    G4,
    [
      {
        options: ['우리', '쉴', '아메리카노'],
        correct: '우리',
      },
      {
        options: ['할머니는', '할머니은', '할머니를'],
        correct: '할머니는',
      },
      {
        options: ['친구가', '친구이', '친구를'],
        correct: '친구가',
      },
      {
        options: ['많으세요.', '의사세요.', '하세요.'],
        correct: '많으세요.',
      },
    ],
    {
      uz: "Buvimning do'stlari ko'p.",
      en: 'My grandmother has many friends.',
      ru: 'У моей бабушки много друзей.',
    },
  ),

  ...build(
    'gp_s2_u1_g4_18',
    G4,
    [
      {
        options: ['아버지는', '아버지은', '아버지를'],
        correct: '아버지는',
      },
      {
        options: ['어제', '한국', '가족'],
        correct: '어제',
      },
      {
        options: ['부산에', '부산에서', '부산까지'],
        correct: '부산에',
      },
      {
        options: ['가셨어요.', '불어요.', '없어요.'],
        correct: '가셨어요.',
      },
    ],
    {
      uz: 'Otam kecha Pusanga bordi.',
      en: 'My father went to Busan yesterday.',
      ru: 'Мой отец вчера ездил в Пусан.',
    },
  ),

  ...build(
    'gp_s2_u1_g4_19',
    G4,
    [
      {
        options: ['선생님은', '선생님는', '선생님을'],
        correct: '선생님은',
      },
      {
        options: ['어제', '가야', '고쳐'],
        correct: '어제',
      },
      {
        options: ['이', '그', '저'],
        correct: '이',
      },
      {
        options: ['책을', '책를', '책은'],
        correct: '책을',
      },
      {
        options: ['읽으셨어요.', '줬어요.', '걸어요.'],
        correct: '읽으셨어요.',
      },
    ],
    {
      uz: "O'qituvchi kecha bu kitobni o'qidi.",
      en: 'The teacher read this book yesterday.',
      ru: 'Учитель вчера прочитал эту книгу.',
    },
  ),

  ...build(
    'gp_s2_u1_g4_20',
    G4,
    [
      {
        options: ['아버지는', '아버지은', '아버지를'],
        correct: '아버지는',
      },
      {
        options: ['요리를', '요리을', '요리는'],
        correct: '요리를',
      },
      {
        options: ['잘하세요.', '앉으세요.', '주세요.'],
        correct: '잘하세요.',
      },
    ],
    {
      uz: 'Otam yaxshi ovqat pishiradi.',
      en: 'My father is good at cooking.',
      ru: 'Мой отец хорошо готовит.',
    },
  ),
};

// ═══════════════════════════════════════════════════════════
// UNIT 2
// 시간 · 범위 · 순서 · 미래 계획
// ═══════════════════════════════════════════════════════════

// ─────────────────────────────────────────────
// 문법 5. 시간 (N시 N분)
// ─────────────────────────────────────────────
const G5 = 'time-si-bun';

const G5_Q = {
  // grammar_blank 10
  ...blank('gp_s2_u2_g5_01', G5, '지금은 세 시예요.', '세 시', {
    uz: 'Hozir soat uch.',
    en: "It's three o'clock now.",
    ru: 'Сейчас три часа.',
  }),

  ...blank('gp_s2_u2_g5_02', G5, '수업은 아홉 시에 시작해요.', '아홉 시에', {
    uz: 'Dars soat to‘qqizda boshlanadi.',
    en: 'Class starts at nine.',
    ru: 'Урок начинается в девять часов.',
  }),

  ...blank(
    'gp_s2_u2_g5_03',
    G5,
    '저는 일곱 시 삼십 분에 일어나요.',
    '일곱 시 삼십 분에',
    {
      uz: 'Men soat yetti yarimda turaman.',
      en: 'I wake up at 7:30.',
      ru: 'Я встаю в 7:30.',
    },
  ),

  ...blank(
    'gp_s2_u2_g5_04',
    G5,
    '약속은 오후 두 시 십오 분이에요.',
    '오후 두 시 십오 분',
    {
      uz: 'Uchrashuv tushdan keyin soat 2:15 da.',
      en: 'The appointment is at 2:15 p.m.',
      ru: 'Встреча в 2:15 дня.',
    },
  ),

  ...blank(
    'gp_s2_u2_g5_05',
    G5,
    '영화는 여섯 시 반에 시작해요.',
    '여섯 시 반에',
    {
      uz: 'Film soat olti yarimda boshlanadi.',
      en: 'The movie starts at 6:30.',
      ru: 'Фильм начинается в половине седьмого.',
    },
  ),

  ...blank('gp_s2_u2_g5_06', G5, '회의는 오전 열 시예요.', '오전 열 시', {
    uz: 'Yig‘ilish ertalab soat o‘nda.',
    en: 'The meeting is at 10 a.m.',
    ru: 'Совещание в десять утра.',
  }),

  ...blank('gp_s2_u2_g5_07', G5, '저녁을 일곱 시에 먹어요.', '일곱 시에', {
    uz: 'Kechki ovqatni soat yettida yeyman.',
    en: 'I eat dinner at seven.',
    ru: 'Я ужинаю в семь часов.',
  }),

  ...blank(
    'gp_s2_u2_g5_08',
    G5,
    '기차는 열한 시 오십 분에 출발해요.',
    '열한 시 오십 분에',
    {
      uz: 'Poyezd soat 11:50 da jo‘naydi.',
      en: 'The train departs at 11:50.',
      ru: 'Поезд отправляется в 11:50.',
    },
  ),

  ...blank('gp_s2_u2_g5_09', G5, '점심시간은 열두 시부터예요.', '열두 시', {
    uz: 'Tushlik vaqti soat o‘n ikkidan.',
    en: 'Lunch time starts at twelve.',
    ru: 'Обед начинается в двенадцать.',
  }),

  ...blank(
    'gp_s2_u2_g5_10',
    G5,
    '우리 다섯 시 이십 분에 만나요.',
    '다섯 시 이십 분에',
    {
      uz: 'Soat 5:20 da uchrashamiz.',
      en: "Let's meet at 5:20.",
      ru: 'Давайте встретимся в 5:20.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s2_u2_g5_11',
    G5,
    [
      {
        options: ['지금은', '지금는', '지금을'],
        correct: '지금은',
      },
      {
        options: ['세', '다섯', '한'],
        correct: '세',
      },
      {
        options: ['시', '시가', '시를'],
        correct: '시',
      },
      {
        options: ['예요.', '이에요.', '입니다.'],
        correct: '예요.',
        glue: true,
      },
    ],
    {
      uz: 'Hozir soat uch.',
      en: "It's three o'clock now.",
      ru: 'Сейчас три часа.',
    },
  ),

  ...build(
    'gp_s2_u2_g5_12',
    G5,
    [
      {
        options: ['수업은', '수업는', '수업을'],
        correct: '수업은',
      },
      {
        options: ['아홉', '다섯', '한'],
        correct: '아홉',
      },
      {
        options: ['시에', '시에서', '시까지'],
        correct: '시에',
      },
      {
        options: ['시작해요.', '해요.', '잘해요.'],
        correct: '시작해요.',
      },
    ],
    {
      uz: 'Dars soat to‘qqizda boshlanadi.',
      en: 'Class starts at nine.',
      ru: 'Урок начинается в девять часов.',
    },
  ),

  ...build(
    'gp_s2_u2_g5_13',
    G5,
    [
      {
        options: ['저는', '저은', '저를'],
        correct: '저는',
      },
      {
        options: ['일곱', '세', '두'],
        correct: '일곱',
      },
      {
        options: ['시', '푹', '해'],
        correct: '시',
      },
      {
        options: ['삼십', '부모님께', '살'],
        correct: '삼십',
      },
      {
        options: ['분에', '분에서', '분까지'],
        correct: '분에',
      },
      {
        options: ['일어나요.', '와요.', '일어나세요.'],
        correct: '일어나요.',
      },
    ],
    {
      uz: 'Men soat 7:30 da turaman.',
      en: 'I wake up at 7:30.',
      ru: 'Я встаю в 7:30.',
    },
  ),

  ...build(
    'gp_s2_u2_g5_14',
    G5,
    [
      {
        options: ['약속은', '약속는', '약속을'],
        correct: '약속은',
      },
      {
        options: ['오후', '공부할', '김밥'],
        correct: '오후',
      },
      {
        options: ['두', '열두', '열'],
        correct: '두',
      },
      {
        options: ['시', '시가', '시를'],
        correct: '시',
      },
      {
        options: ['예요.', '이에요.', '입니다.'],
        correct: '예요.',
        glue: true,
      },
    ],
    {
      uz: 'Uchrashuv tushdan keyin soat ikkida.',
      en: 'The appointment is at 2 p.m.',
      ru: 'Встреча в два часа дня.',
    },
  ),

  ...build(
    'gp_s2_u2_g5_15',
    G5,
    [
      {
        options: ['영화는', '영화은', '영화를'],
        correct: '영화는',
      },
      {
        options: ['여섯', '열', '아홉'],
        correct: '여섯',
      },
      {
        options: ['시', '시간쯤', '아주'],
        correct: '시',
      },
      {
        options: ['반에', '반에서', '반까지'],
        correct: '반에',
      },
      {
        options: ['시작해요.', '도착해요.', '출발해요.'],
        correct: '시작해요.',
      },
    ],
    {
      uz: 'Film soat olti yarimda boshlanadi.',
      en: 'The movie starts at 6:30.',
      ru: 'Фильм начинается в половине седьмого.',
    },
  ),

  ...build(
    'gp_s2_u2_g5_16',
    G5,
    [
      {
        options: ['회의는', '회의은', '회의를'],
        correct: '회의는',
      },
      {
        options: ['오전', '씨', '안'],
        correct: '오전',
      },
      {
        options: ['열', '여섯', '아홉'],
        correct: '열',
      },
      {
        options: ['시', '시가', '시를'],
        correct: '시',
      },
      {
        options: ['예요.', '이에요.', '입니다.'],
        correct: '예요.',
        glue: true,
      },
    ],
    {
      uz: 'Yig‘ilish ertalab soat o‘nda.',
      en: 'The meeting is at 10 a.m.',
      ru: 'Совещание в десять утра.',
    },
  ),

  ...build(
    'gp_s2_u2_g5_17',
    G5,
    [
      {
        options: ['저녁을', '저녁를', '저녁은'],
        correct: '저녁을',
      },
      {
        options: ['일곱', '열두', '열'],
        correct: '일곱',
      },
      {
        options: ['시에', '시에서', '시까지'],
        correct: '시에',
      },
      {
        options: ['먹어요.', '입었어요.', '찾았어요.'],
        correct: '먹어요.',
      },
    ],
    {
      uz: 'Kechki ovqatni soat yettida yeyman.',
      en: 'I eat dinner at seven.',
      ru: 'Я ужинаю в семь часов.',
    },
  ),

  ...build(
    'gp_s2_u2_g5_18',
    G5,
    [
      {
        options: ['기차는', '기차은', '기차를'],
        correct: '기차는',
      },
      {
        options: ['열한', '한', '일곱'],
        correct: '열한',
      },
      {
        options: ['시', '병', '빵'],
        correct: '시',
      },
      {
        options: ['오십', '오후', '음식'],
        correct: '오십',
      },
      {
        options: ['분에', '분에서', '분까지'],
        correct: '분에',
      },
      {
        options: ['출발해요.', '좋아해요.', '이야기해요.'],
        correct: '출발해요.',
      },
    ],
    {
      uz: 'Poyezd soat 11:50 da jo‘naydi.',
      en: 'The train departs at 11:50.',
      ru: 'Поезд отправляется в 11:50.',
    },
  ),

  ...build(
    'gp_s2_u2_g5_19',
    G5,
    [
      {
        options: ['우리', '일', '잠깐'],
        correct: '우리',
      },
      {
        options: ['다섯', '열한', '열두'],
        correct: '다섯',
      },
      {
        options: ['시', '씨의', '어떤'],
        correct: '시',
      },
      {
        options: ['이십', '깨끗한', '더'],
        correct: '이십',
      },
      {
        options: ['분에', '분에서', '분까지'],
        correct: '분에',
      },
      {
        options: ['만나요.', '봐요.', '삽니다.'],
        correct: '만나요.',
      },
    ],
    {
      uz: 'Soat 5:20 da uchrashamiz.',
      en: "Let's meet at 5:20.",
      ru: 'Давайте встретимся в 5:20.',
    },
  ),

  ...build(
    'gp_s2_u2_g5_20',
    G5,
    [
      {
        options: ['비행기는', '비행기은', '비행기를'],
        correct: '비행기는',
      },
      {
        options: ['오후', '볼', '사과'],
        correct: '오후',
      },
      {
        options: ['한', '세', '두'],
        correct: '한',
      },
      {
        options: ['시', '오십', '우즈베키스탄'],
        correct: '시',
      },
      {
        options: ['십', '해야', '건물'],
        correct: '십',
      },
      {
        options: ['분에', '분에서', '분까지'],
        correct: '분에',
      },
      {
        options: ['도착해요.', '일해요.', '못해요.'],
        correct: '도착해요.',
      },
    ],
    {
      uz: 'Samolyot tushdan keyin soat 1:10 da yetib keladi.',
      en: 'The plane arrives at 1:10 p.m.',
      ru: 'Самолёт прибывает в 13:10.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 6. N부터 N까지
// ─────────────────────────────────────────────
const G6 = 'range-buteo-kkaji';

const G6_Q = {
  // grammar_blank 10
  ...blank(
    'gp_s2_u2_g6_01',
    G6,
    '수업은 아홉 시부터 열두 시까지예요.',
    '아홉 시부터 열두 시까지',
    {
      uz: 'Dars soat to‘qqizdan o‘n ikkigacha.',
      en: 'Class is from nine to twelve.',
      ru: 'Урок идёт с девяти до двенадцати.',
    },
  ),

  ...blank(
    'gp_s2_u2_g6_02',
    G6,
    '저는 월요일부터 금요일까지 일해요.',
    '월요일부터 금요일까지',
    {
      uz: 'Men dushanbadan jumagacha ishlayman.',
      en: 'I work from Monday to Friday.',
      ru: 'Я работаю с понедельника по пятницу.',
    },
  ),

  ...blank(
    'gp_s2_u2_g6_03',
    G6,
    '방학은 칠월부터 팔월까지예요.',
    '칠월부터 팔월까지',
    {
      uz: 'Ta’til iyuldan avgustgacha.',
      en: 'Vacation is from July to August.',
      ru: 'Каникулы с июля по август.',
    },
  ),

  ...blank(
    'gp_s2_u2_g6_04',
    G6,
    '점심시간은 열두 시부터 한 시까지예요.',
    '열두 시부터 한 시까지',
    {
      uz: 'Tushlik vaqti soat o‘n ikkidan birgacha.',
      en: 'Lunch time is from twelve to one.',
      ru: 'Обеденный перерыв с двенадцати до часу.',
    },
  ),

  ...blank(
    'gp_s2_u2_g6_05',
    G6,
    '도서관은 아침부터 저녁까지 열어요.',
    '아침부터 저녁까지',
    {
      uz: 'Kutubxona ertalabdan kechgacha ochiq.',
      en: 'The library is open from morning until evening.',
      ru: 'Библиотека открыта с утра до вечера.',
    },
  ),

  ...blank(
    'gp_s2_u2_g6_06',
    G6,
    '시험은 화요일부터 목요일까지 있어요.',
    '화요일부터 목요일까지',
    {
      uz: 'Imtihonlar seshanbadan payshanbagacha bo‘ladi.',
      en: 'The exams are from Tuesday through Thursday.',
      ru: 'Экзамены проходят со вторника по четверг.',
    },
  ),

  ...blank(
    'gp_s2_u2_g6_07',
    G6,
    '저는 오전 아홉 시부터 오후 여섯 시까지 회사에 있어요.',
    '오전 아홉 시부터 오후 여섯 시까지',
    {
      uz: 'Men ertalab soat to‘qqizdan kechki oltigacha ishxonada bo‘laman.',
      en: 'I am at the office from 9 a.m. to 6 p.m.',
      ru: 'Я нахожусь в офисе с девяти утра до шести вечера.',
    },
  ),

  ...blank(
    'gp_s2_u2_g6_08',
    G6,
    '행사는 오늘부터 일요일까지예요.',
    '오늘부터 일요일까지',
    {
      uz: 'Tadbir bugundan yakshanbagacha.',
      en: 'The event runs from today through Sunday.',
      ru: 'Мероприятие проходит с сегодняшнего дня до воскресенья.',
    },
  ),

  ...blank(
    'gp_s2_u2_g6_09',
    G6,
    '한국어를 일 년 전부터 지금까지 공부했어요.',
    '일 년 전부터 지금까지',
    {
      uz: 'Men koreys tilini bir yil oldindan hozirgacha o‘rgandim.',
      en: 'I have studied Korean from a year ago until now.',
      ru: 'Я изучаю корейский с прошлого года до настоящего времени.',
    },
  ),

  ...blank(
    'gp_s2_u2_g6_10',
    G6,
    '회의는 두 시부터 네 시까지 계속돼요.',
    '두 시부터 네 시까지',
    {
      uz: 'Yig‘ilish soat ikkidan to‘rtgacha davom etadi.',
      en: 'The meeting continues from two to four.',
      ru: 'Совещание длится с двух до четырёх.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s2_u2_g6_11',
    G6,
    [
      {
        options: ['수업은', '수업는', '수업을'],
        correct: '수업은',
      },
      {
        options: ['아홉', '다섯', '한'],
        correct: '아홉',
      },
      {
        options: ['시부터', '시까지', '시에서'],
        correct: '시부터',
      },
      {
        options: ['열두', '열한', '열'],
        correct: '열두',
      },
      {
        options: ['시까지', '시부터', '시에서'],
        correct: '시까지',
      },
      {
        options: ['예요.', '이에요.', '입니다.'],
        correct: '예요.',
        glue: true,
      },
    ],
    {
      uz: 'Dars soat to‘qqizdan o‘n ikkigacha.',
      en: 'Class is from nine to twelve.',
      ru: 'Урок идёт с девяти до двенадцати.',
    },
  ),

  ...build(
    'gp_s2_u2_g6_12',
    G6,
    [
      {
        options: ['저는', '저은', '저를'],
        correct: '저는',
      },
      {
        options: ['월요일부터', '월요일까지', '월요일에서'],
        correct: '월요일부터',
      },
      {
        options: ['금요일까지', '금요일부터', '금요일에서'],
        correct: '금요일까지',
      },
      {
        options: ['일해요.', '이야기해요.', '도착해요.'],
        correct: '일해요.',
      },
    ],
    {
      uz: 'Men dushanbadan jumagacha ishlayman.',
      en: 'I work from Monday to Friday.',
      ru: 'Я работаю с понедельника по пятницу.',
    },
  ),

  ...build(
    'gp_s2_u2_g6_13',
    G6,
    [
      {
        options: ['방학은', '방학는', '방학을'],
        correct: '방학은',
      },
      {
        options: ['칠월부터', '칠월까지', '칠월에서'],
        correct: '칠월부터',
      },
      {
        options: ['팔월까지', '팔월부터', '팔월에서'],
        correct: '팔월까지',
      },
      {
        options: ['예요.', '이에요.', '입니다.'],
        correct: '예요.',
        glue: true,
      },
    ],
    {
      uz: 'Ta’til iyuldan avgustgacha.',
      en: 'Vacation is from July to August.',
      ru: 'Каникулы с июля по август.',
    },
  ),

  ...build(
    'gp_s2_u2_g6_14',
    G6,
    [
      {
        options: ['점심시간은', '점심시간는', '점심시간을'],
        correct: '점심시간은',
      },
      {
        options: ['열두', '여섯', '아홉'],
        correct: '열두',
      },
      {
        options: ['시부터', '시까지', '시에서'],
        correct: '시부터',
      },
      {
        options: ['한', '열두', '열'],
        correct: '한',
      },
      {
        options: ['시까지', '시부터', '시에서'],
        correct: '시까지',
      },
      {
        options: ['예요.', '이에요.', '입니다.'],
        correct: '예요.',
        glue: true,
      },
    ],
    {
      uz: 'Tushlik vaqti o‘n ikkidan birgacha.',
      en: 'Lunch time is from twelve to one.',
      ru: 'Обеденный перерыв с двенадцати до часу.',
    },
  ),

  ...build(
    'gp_s2_u2_g6_15',
    G6,
    [
      {
        options: ['도서관은', '도서관는', '도서관을'],
        correct: '도서관은',
      },
      {
        options: ['아침부터', '아침까지', '아침에서'],
        correct: '아침부터',
      },
      {
        options: ['저녁까지', '저녁부터', '저녁에서'],
        correct: '저녁까지',
      },
      {
        options: ['열어요.', '들어요.', '물어요.'],
        correct: '열어요.',
      },
    ],
    {
      uz: 'Kutubxona ertalabdan kechgacha ochiq.',
      en: 'The library is open from morning until evening.',
      ru: 'Библиотека открыта с утра до вечера.',
    },
  ),

  ...build(
    'gp_s2_u2_g6_16',
    G6,
    [
      {
        options: ['시험은', '시험는', '시험을'],
        correct: '시험은',
      },
      {
        options: ['화요일부터', '화요일까지', '화요일에서'],
        correct: '화요일부터',
      },
      {
        options: ['목요일까지', '목요일부터', '목요일에서'],
        correct: '목요일까지',
      },
      {
        options: ['있어요.', '공부했어요.', '만들었어요.'],
        correct: '있어요.',
      },
    ],
    {
      uz: 'Imtihonlar seshanbadan payshanbagacha.',
      en: 'The exams are from Tuesday through Thursday.',
      ru: 'Экзамены проходят со вторника по четверг.',
    },
  ),

  ...build(
    'gp_s2_u2_g6_17',
    G6,
    [
      {
        options: ['저는', '저은', '저를'],
        correct: '저는',
      },
      {
        options: ['오전', '같이', '교실'],
        correct: '오전',
      },
      {
        options: ['아홉', '열', '여섯'],
        correct: '아홉',
      },
      {
        options: ['시부터', '시까지', '시에서'],
        correct: '시부터',
      },
      {
        options: ['오후', '할머니께', '감사의'],
        correct: '오후',
      },
      {
        options: ['여섯', '다섯', '한'],
        correct: '여섯',
      },
      {
        options: ['시까지', '시부터', '시에서'],
        correct: '시까지',
      },
      {
        options: ['회사에', '회사에서', '회사까지'],
        correct: '회사에',
      },
      {
        options: ['있어요.', '먹었어요.', '샀어요.'],
        correct: '있어요.',
      },
    ],
    {
      uz: 'Men ertalab to‘qqizdan kechki oltigacha ishxonada bo‘laman.',
      en: 'I am at the office from 9 a.m. to 6 p.m.',
      ru: 'Я нахожусь в офисе с девяти утра до шести вечера.',
    },
  ),

  ...build(
    'gp_s2_u2_g6_18',
    G6,
    [
      {
        options: ['행사는', '행사은', '행사를'],
        correct: '행사는',
      },
      {
        options: ['오늘부터', '오늘까지', '오늘에서'],
        correct: '오늘부터',
      },
      {
        options: ['일요일까지', '일요일부터', '일요일에서'],
        correct: '일요일까지',
      },
      {
        options: ['예요.', '이에요.', '입니다.'],
        correct: '예요.',
        glue: true,
      },
    ],
    {
      uz: 'Tadbir bugundan yakshanbagacha.',
      en: 'The event runs from today through Sunday.',
      ru: 'Мероприятие проходит с сегодняшнего дня до воскресенья.',
    },
  ),

  ...build(
    'gp_s2_u2_g6_19',
    G6,
    [
      {
        options: ['회의는', '회의은', '회의를'],
        correct: '회의는',
      },
      {
        options: ['두', '한', '일곱'],
        correct: '두',
      },
      {
        options: ['시부터', '시까지', '시에서'],
        correct: '시부터',
      },
      {
        options: ['네', '제', '내'],
        correct: '네',
      },
      {
        options: ['시까지', '시부터', '시에서'],
        correct: '시까지',
      },
      {
        options: ['계속돼요.', '맛있어요.', '못해요.'],
        correct: '계속돼요.',
      },
    ],
    {
      uz: 'Yig‘ilish soat ikkidan to‘rtgacha davom etadi.',
      en: 'The meeting continues from two to four.',
      ru: 'Совещание длится с двух до четырёх.',
    },
  ),

  ...build(
    'gp_s2_u2_g6_20',
    G6,
    [
      {
        options: ['가게는', '가게은', '가게를'],
        correct: '가게는',
      },
      {
        options: ['월요일부터', '월요일까지', '월요일에서'],
        correct: '월요일부터',
      },
      {
        options: ['토요일까지', '토요일부터', '토요일에서'],
        correct: '토요일까지',
      },
      {
        options: ['문을', '문를', '문은'],
        correct: '문을',
      },
      {
        options: ['열어요.', '샤워했어요.', '이야기했어요.'],
        correct: '열어요.',
      },
    ],
    {
      uz: 'Do‘kon dushanbadan shanbagacha ochiq.',
      en: 'The store is open from Monday through Saturday.',
      ru: 'Магазин открыт с понедельника по субботу.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 7. V-아서/어서
// ─────────────────────────────────────────────
const G7 = 'sequence-aseo-eoseo';

const G7_Q = {
  // grammar_blank 10
  ...blank('gp_s2_u2_g7_01', G7, '은행에 가서 돈을 찾았어요.', '가서', {
    uz: 'Bankka borib pul oldim.',
    en: 'I went to the bank and withdrew money.',
    ru: 'Я сходил в банк и снял деньги.',
  }),

  ...blank(
    'gp_s2_u2_g7_02',
    G7,
    '친구를 만나서 같이 점심을 먹었어요.',
    '만나서',
    {
      uz: 'Do‘stim bilan uchrashib, birga tushlik qildik.',
      en: 'I met my friend and we had lunch together.',
      ru: 'Я встретился с другом, и мы вместе пообедали.',
    },
  ),

  ...blank('gp_s2_u2_g7_03', G7, '집에 와서 숙제를 했어요.', '와서', {
    uz: 'Uyga kelib uy vazifasini qildim.',
    en: 'I came home and did my homework.',
    ru: 'Я пришёл домой и сделал домашнее задание.',
  }),

  ...blank('gp_s2_u2_g7_04', G7, '시장에 가서 과일을 샀어요.', '가서', {
    uz: 'Bozorga borib meva sotib oldim.',
    en: 'I went to the market and bought fruit.',
    ru: 'Я сходил на рынок и купил фрукты.',
  }),

  ...blank('gp_s2_u2_g7_05', G7, '카페에 앉아서 커피를 마셨어요.', '앉아서', {
    uz: 'Kafeda o‘tirib qahva ichdim.',
    en: 'I sat down at a cafe and drank coffee.',
    ru: 'Я сел в кафе и выпил кофе.',
  }),

  ...blank('gp_s2_u2_g7_06', G7, '문을 열어서 방에 들어갔어요.', '열어서', {
    uz: 'Eshikni ochib xonaga kirdim.',
    en: 'I opened the door and entered the room.',
    ru: 'Я открыл дверь и вошёл в комнату.',
  }),

  ...blank('gp_s2_u2_g7_07', G7, '버스를 타서 학교에 갔어요.', '타서', {
    uz: 'Avtobusga minib maktabga bordim.',
    en: 'I took the bus and went to school.',
    ru: 'Я сел на автобус и поехал в школу.',
  }),

  ...blank('gp_s2_u2_g7_08', G7, '옷을 입어서 거울을 봤어요.', '입어서', {
    uz: 'Kiyimni kiyib, oynaga qaradim.',
    en: 'I put on the clothes and looked in the mirror.',
    ru: 'Я надел одежду и посмотрел в зеркало.',
  }),

  ...blank('gp_s2_u2_g7_09', G7, '아침에 일어나서 샤워했어요.', '일어나서', {
    uz: 'Ertalab turib dush qabul qildim.',
    en: 'I woke up in the morning and took a shower.',
    ru: 'Утром я встал и принял душ.',
  }),

  ...blank('gp_s2_u2_g7_10', G7, '사진을 찍어서 친구에게 보냈어요.', '찍어서', {
    uz: 'Suratga olib, do‘stimga yubordim.',
    en: 'I took a photo and sent it to my friend.',
    ru: 'Я сделал фотографию и отправил её другу.',
  }),

  // grammar_build 10
  ...build(
    'gp_s2_u2_g7_11',
    G7,
    [
      {
        options: ['은행에', '은행에서', '은행까지'],
        correct: '은행에',
      },
      {
        options: ['가서', '걸으면서', '열어서'],
        correct: '가서',
      },
      {
        options: ['돈을', '돈를', '돈은'],
        correct: '돈을',
      },
      {
        options: ['찾았어요.', '불어요.', '없어요.'],
        correct: '찾았어요.',
      },
    ],
    {
      uz: 'Bankka borib pul oldim.',
      en: 'I went to the bank and withdrew money.',
      ru: 'Я сходил в банк и снял деньги.',
    },
  ),

  ...build(
    'gp_s2_u2_g7_12',
    G7,
    [
      {
        options: ['친구를', '친구을', '친구는'],
        correct: '친구를',
      },
      {
        options: ['만나서', '열어서', '가서'],
        correct: '만나서',
      },
      {
        options: ['같이', '비빔밥', '새'],
        correct: '같이',
      },
      {
        options: ['점심을', '점심를', '점심은'],
        correct: '점심을',
      },
      {
        options: ['먹었어요.', '보냈어요.', '싶어요.'],
        correct: '먹었어요.',
      },
    ],
    {
      uz: 'Do‘stim bilan uchrashib, birga tushlik qildik.',
      en: 'I met my friend and we had lunch together.',
      ru: 'Я встретился с другом, и мы вместе пообедали.',
    },
  ),

  ...build(
    'gp_s2_u2_g7_13',
    G7,
    [
      {
        options: ['집에', '집에서', '집까지'],
        correct: '집에',
      },
      {
        options: ['와서', '살면서', '타서'],
        correct: '와서',
      },
      {
        options: ['숙제를', '숙제을', '숙제는'],
        correct: '숙제를',
      },
      {
        options: ['했어요.', '샀어요.', '왔어요.'],
        correct: '했어요.',
      },
    ],
    {
      uz: 'Uyga kelib uy vazifasini qildim.',
      en: 'I came home and did my homework.',
      ru: 'Я пришёл домой и сделал домашнее задание.',
    },
  ),

  ...build(
    'gp_s2_u2_g7_14',
    G7,
    [
      {
        options: ['시장에', '시장에서', '시장까지'],
        correct: '시장에',
      },
      {
        options: ['가서', '바빠서', '있어서'],
        correct: '가서',
      },
      {
        options: ['과일을', '과일를', '과일은'],
        correct: '과일을',
      },
      {
        options: ['샀어요.', '줬어요.', '걸어요.'],
        correct: '샀어요.',
      },
    ],
    {
      uz: 'Bozorga borib meva sotib oldim.',
      en: 'I went to the market and bought fruit.',
      ru: 'Я сходил на рынок и купил фрукты.',
    },
  ),

  ...build(
    'gp_s2_u2_g7_15',
    G7,
    [
      {
        options: ['카페에', '카페에서', '카페까지'],
        correct: '카페에',
      },
      {
        options: ['앉아서', '걸어서', '열어서'],
        correct: '앉아서',
      },
      {
        options: ['커피를', '커피을', '커피는'],
        correct: '커피를',
      },
      {
        options: ['마셨어요.', '갔어요.', '들어요.'],
        correct: '마셨어요.',
      },
    ],
    {
      uz: 'Kafeda o‘tirib qahva ichdim.',
      en: 'I sat down at a cafe and drank coffee.',
      ru: 'Я сел в кафе и выпил кофе.',
    },
  ),

  ...build(
    'gp_s2_u2_g7_16',
    G7,
    [
      {
        options: ['문을', '문를', '문은'],
        correct: '문을',
      },
      {
        options: ['열어서', '걸어서', '앉아서'],
        correct: '열어서',
      },
      {
        options: ['방에', '방에서', '방까지'],
        correct: '방에',
      },
      {
        options: ['들어갔어요.', '입었어요.', '찾았어요.'],
        correct: '들어갔어요.',
      },
    ],
    {
      uz: 'Eshikni ochib xonaga kirdim.',
      en: 'I opened the door and entered the room.',
      ru: 'Я открыл дверь и вошёл в комнату.',
    },
  ),

  ...build(
    'gp_s2_u2_g7_17',
    G7,
    [
      {
        options: ['버스를', '버스을', '버스는'],
        correct: '버스를',
      },
      {
        options: ['타서', '들으면서', '와서'],
        correct: '타서',
      },
      {
        options: ['학교에', '학교에서', '학교까지'],
        correct: '학교에',
      },
      {
        options: ['갔어요.', '주셨어요.', '걸어요.'],
        correct: '갔어요.',
      },
    ],
    {
      uz: 'Avtobusga minib maktabga bordim.',
      en: 'I took the bus and went to school.',
      ru: 'Я сел на автобус и поехал в школу.',
    },
  ),

  ...build(
    'gp_s2_u2_g7_18',
    G7,
    [
      {
        options: ['아침에', '아침에서', '아침까지'],
        correct: '아침에',
      },
      {
        options: ['일어나서', '마시면서', '이야기하면서'],
        correct: '일어나서',
      },
      {
        options: ['샤워했어요.', '전화했어요.', '갔어요.'],
        correct: '샤워했어요.',
      },
    ],
    {
      uz: 'Ertalab turib dush qabul qildim.',
      en: 'I woke up in the morning and took a shower.',
      ru: 'Утром я встал и принял душ.',
    },
  ),

  ...build(
    'gp_s2_u2_g7_19',
    G7,
    [
      {
        options: ['사진을', '사진를', '사진은'],
        correct: '사진을',
      },
      {
        options: ['찍어서', '청소하면서', '만나서'],
        correct: '찍어서',
      },
      {
        options: ['친구에게', '친구한테', '친구에서'],
        correct: '친구에게',
      },
      {
        options: ['보냈어요.', '들어요.', '물어요.'],
        correct: '보냈어요.',
      },
    ],
    {
      uz: 'Suratga olib, do‘stimga yubordim.',
      en: 'I took a photo and sent it to my friend.',
      ru: 'Я сделал фотографию и отправил её другу.',
    },
  ),

  ...build(
    'gp_s2_u2_g7_20',
    G7,
    [
      {
        options: ['도서관에', '도서관에서', '도서관까지'],
        correct: '도서관에',
      },
      {
        options: ['가서', '만나서', '일어나서'],
        correct: '가서',
      },
      {
        options: ['책을', '책를', '책은'],
        correct: '책을',
      },
      {
        options: ['빌렸어요.', '질문했어요.', '공부했어요.'],
        correct: '빌렸어요.',
      },
    ],
    {
      uz: 'Kutubxonaga borib kitob oldim.',
      en: 'I went to the library and borrowed a book.',
      ru: 'Я сходил в библиотеку и взял книгу.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 8. V-(으)ㄹ 거예요
// ─────────────────────────────────────────────
const G8 = 'future-eul-geoyeyo';

const G8_Q = {
  // grammar_blank 10
  ...blank('gp_s2_u2_g8_01', G8, '내일 친구를 만날 거예요.', '만날 거예요', {
    uz: 'Ertaga do‘stim bilan uchrashaman.',
    en: 'I will meet my friend tomorrow.',
    ru: 'Завтра я встречусь с другом.',
  }),

  ...blank('gp_s2_u2_g8_02', G8, '주말에 집에서 쉴 거예요.', '쉴 거예요', {
    uz: 'Dam olish kunlari uyda dam olaman.',
    en: 'I will rest at home this weekend.',
    ru: 'На выходных я буду отдыхать дома.',
  }),

  ...blank(
    'gp_s2_u2_g8_03',
    G8,
    '저녁에 한국 음식을 먹을 거예요.',
    '먹을 거예요',
    {
      uz: 'Kechqurun koreys taomini yeyman.',
      en: 'I will eat Korean food this evening.',
      ru: 'Вечером я буду есть корейскую еду.',
    },
  ),

  ...blank('gp_s2_u2_g8_04', G8, '다음 달에 부산에 갈 거예요.', '갈 거예요', {
    uz: 'Keyingi oy Pusanga boraman.',
    en: 'I will go to Busan next month.',
    ru: 'В следующем месяце я поеду в Пусан.',
  }),

  ...blank('gp_s2_u2_g8_05', G8, '내일 이 책을 읽을 거예요.', '읽을 거예요', {
    uz: 'Ertaga bu kitobni o‘qiyman.',
    en: 'I will read this book tomorrow.',
    ru: 'Завтра я прочитаю эту книгу.',
  }),

  ...blank(
    'gp_s2_u2_g8_06',
    G8,
    '방학에 한국어를 공부할 거예요.',
    '공부할 거예요',
    {
      uz: 'Ta’tilda koreys tilini o‘rganaman.',
      en: 'I will study Korean during vacation.',
      ru: 'На каникулах я буду изучать корейский.',
    },
  ),

  ...blank('gp_s2_u2_g8_07', G8, '오늘 밤에는 일찍 잘 거예요.', '잘 거예요', {
    uz: 'Bugun kechqurun erta uxlayman.',
    en: 'I will go to bed early tonight.',
    ru: 'Сегодня вечером я рано лягу спать.',
  }),

  ...blank('gp_s2_u2_g8_08', G8, '토요일에 영화를 볼 거예요.', '볼 거예요', {
    uz: 'Shanba kuni film ko‘raman.',
    en: 'I will watch a movie on Saturday.',
    ru: 'В субботу я посмотрю фильм.',
  }),

  ...blank(
    'gp_s2_u2_g8_09',
    G8,
    '오후에 부모님께 전화할 거예요.',
    '전화할 거예요',
    {
      uz: 'Tushdan keyin ota-onamga qo‘ng‘iroq qilaman.',
      en: 'I will call my parents in the afternoon.',
      ru: 'Днём я позвоню родителям.',
    },
  ),

  ...blank(
    'gp_s2_u2_g8_10',
    G8,
    '이번 주말에는 방을 청소할 거예요.',
    '청소할 거예요',
    {
      uz: 'Bu hafta oxirida xonani tozalayman.',
      en: 'I will clean my room this weekend.',
      ru: 'В эти выходные я уберу комнату.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s2_u2_g8_11',
    G8,
    [
      {
        options: ['내일', '사용해', '세울'],
        correct: '내일',
      },
      {
        options: ['친구를', '친구을', '친구는'],
        correct: '친구를',
      },
      {
        options: ['만날', '잠깐', '줄'],
        correct: '만날',
      },
      {
        options: ['거', '거가', '거를'],
        correct: '거',
      },
      {
        options: ['예요.', '이에요.', '입니다.'],
        correct: '예요.',
        glue: true,
      },
    ],
    {
      uz: 'Ertaga do‘stim bilan uchrashaman.',
      en: 'I will meet my friend tomorrow.',
      ru: 'Завтра я встречусь с другом.',
    },
  ),

  ...build(
    'gp_s2_u2_g8_12',
    G8,
    [
      {
        options: ['주말에', '주말에서', '주말까지'],
        correct: '주말에',
      },
      {
        options: ['집에서', '집에', '집까지'],
        correct: '집에서',
      },
      {
        options: ['쉴', '빨간', '생일'],
        correct: '쉴',
      },
      {
        options: ['거', '거가', '거를'],
        correct: '거',
      },
      {
        options: ['예요.', '이에요.', '입니다.'],
        correct: '예요.',
        glue: true,
      },
    ],
    {
      uz: 'Dam olish kunlari uyda dam olaman.',
      en: 'I will rest at home this weekend.',
      ru: 'На выходных я буду отдыхать дома.',
    },
  ),

  ...build(
    'gp_s2_u2_g8_13',
    G8,
    [
      {
        options: ['저녁에', '저녁에서', '저녁까지'],
        correct: '저녁에',
      },
      {
        options: ['한국', '가족', '곧'],
        correct: '한국',
      },
      {
        options: ['음식을', '음식를', '음식은'],
        correct: '음식을',
      },
      {
        options: ['먹을', '가는', '읽는'],
        correct: '먹을',
      },
      {
        options: ['거', '거가', '거를'],
        correct: '거',
      },
      {
        options: ['예요.', '이에요.', '입니다.'],
        correct: '예요.',
        glue: true,
      },
    ],
    {
      uz: 'Kechqurun koreys taomini yeyman.',
      en: 'I will eat Korean food this evening.',
      ru: 'Вечером я буду есть корейскую еду.',
    },
  ),

  ...build(
    'gp_s2_u2_g8_14',
    G8,
    [
      {
        options: ['다음', '교실', '깨끗한'],
        correct: '다음',
      },
      {
        options: ['달에', '달에서', '달까지'],
        correct: '달에',
      },
      {
        options: ['부산에', '부산에서', '부산까지'],
        correct: '부산에',
      },
      {
        options: ['갈', '메뉴', '민수의'],
        correct: '갈',
      },
      {
        options: ['거', '거가', '거를'],
        correct: '거',
      },
      {
        options: ['예요.', '이에요.', '입니다.'],
        correct: '예요.',
        glue: true,
      },
    ],
    {
      uz: 'Keyingi oy Pusanga boraman.',
      en: 'I will go to Busan next month.',
      ru: 'В следующем месяце я поеду в Пусан.',
    },
  ),

  ...build(
    'gp_s2_u2_g8_15',
    G8,
    [
      {
        options: ['내일', '시간쯤', '아주'],
        correct: '내일',
      },
      {
        options: ['이', '그', '저'],
        correct: '이',
      },
      {
        options: ['책을', '책를', '책은'],
        correct: '책을',
      },
      {
        options: ['읽을', '좋아하는', '모르는'],
        correct: '읽을',
      },
      {
        options: ['거', '거가', '거를'],
        correct: '거',
      },
      {
        options: ['예요.', '이에요.', '입니다.'],
        correct: '예요.',
        glue: true,
      },
    ],
    {
      uz: 'Ertaga bu kitobni o‘qiyman.',
      en: 'I will read this book tomorrow.',
      ru: 'Завтра я прочитаю эту книгу.',
    },
  ),

  ...build(
    'gp_s2_u2_g8_16',
    G8,
    [
      {
        options: ['방학에', '방학에서', '방학까지'],
        correct: '방학에',
      },
      {
        options: ['한국어를', '한국어을', '한국어는'],
        correct: '한국어를',
      },
      {
        options: ['공부할', '잔', '좀'],
        correct: '공부할',
      },
      {
        options: ['거', '거가', '거를'],
        correct: '거',
      },
      {
        options: ['예요.', '이에요.', '입니다.'],
        correct: '예요.',
        glue: true,
      },
    ],
    {
      uz: 'Ta’tilda koreys tilini o‘rganaman.',
      en: 'I will study Korean during vacation.',
      ru: 'На каникулах я буду изучать корейский.',
    },
  ),

  ...build(
    'gp_s2_u2_g8_17',
    G8,
    [
      {
        options: ['오늘', '자야', '정말'],
        correct: '오늘',
      },
      {
        options: ['밤에는', '밤에도', '밤에만'],
        correct: '밤에는',
      },
      {
        options: ['일찍', '차', '탈'],
        correct: '일찍',
      },
      {
        options: ['잘', '저기', '중국'],
        correct: '잘',
      },
      {
        options: ['거', '거가', '거를'],
        correct: '거',
      },
      {
        options: ['예요.', '이에요.', '입니다.'],
        correct: '예요.',
        glue: true,
      },
    ],
    {
      uz: 'Bugun kechqurun erta uxlayman.',
      en: 'I will go to bed early tonight.',
      ru: 'Сегодня вечером я рано лягу спать.',
    },
  ),

  ...build(
    'gp_s2_u2_g8_18',
    G8,
    [
      {
        options: ['토요일에', '토요일에서', '토요일까지'],
        correct: '토요일에',
      },
      {
        options: ['영화를', '영화을', '영화는'],
        correct: '영화를',
      },
      {
        options: ['볼', '꼭', '더운'],
        correct: '볼',
      },
      {
        options: ['거', '거가', '거를'],
        correct: '거',
      },
      {
        options: ['예요.', '이에요.', '입니다.'],
        correct: '예요.',
        glue: true,
      },
    ],
    {
      uz: 'Shanba kuni film ko‘raman.',
      en: 'I will watch a movie on Saturday.',
      ru: 'В субботу я посмотрю фильм.',
    },
  ),

  ...build(
    'gp_s2_u2_g8_19',
    G8,
    [
      {
        options: ['오후에', '오후에서', '오후까지'],
        correct: '오후에',
      },
      {
        options: ['부모님께', '우유', '일'],
        correct: '부모님께',
      },
      {
        options: ['전화할', '잠깐', '중국'],
        correct: '전화할',
      },
      {
        options: ['거', '거가', '거를'],
        correct: '거',
      },
      {
        options: ['예요.', '이에요.', '입니다.'],
        correct: '예요.',
        glue: true,
      },
    ],
    {
      uz: 'Tushdan keyin ota-onamga qo‘ng‘iroq qilaman.',
      en: 'I will call my parents in the afternoon.',
      ru: 'Днём я позвоню родителям.',
    },
  ),

  ...build(
    'gp_s2_u2_g8_20',
    G8,
    [
      {
        options: ['이번', '민수의', '봉투'],
        correct: '이번',
      },
      {
        options: ['주말에는', '주말에도', '주말에만'],
        correct: '주말에는',
      },
      {
        options: ['방을', '방를', '방은'],
        correct: '방을',
      },
      {
        options: ['청소할', '계산할', '그럼'],
        correct: '청소할',
      },
      {
        options: ['거', '거가', '거를'],
        correct: '거',
      },
      {
        options: ['예요.', '이에요.', '입니다.'],
        correct: '예요.',
        glue: true,
      },
    ],
    {
      uz: 'Bu hafta oxirida xonani tozalayman.',
      en: 'I will clean my room this weekend.',
      ru: 'В эти выходные я уберу комнату.',
    },
  ),
};

// ═══════════════════════════════════════════════════════════
// UNIT 3
// 건강 · 금지 · 한정 · 의무
// ═══════════════════════════════════════════════════════════

// ─────────────────────────────────────────────
// 문법 9. 'ㅡ' 탈락
// ─────────────────────────────────────────────
const G9 = 'eu-deletion';

const G9_Q = {
  // grammar_blank 10
  ...blank('gp_s2_u3_g9_01', G9, '오늘 머리가 아파요.', '아파요', {
    uz: "Bugun boshim og'riyapti.",
    en: 'My head hurts today.',
    ru: 'Сегодня у меня болит голова.',
  }),

  ...blank('gp_s2_u3_g9_02', G9, '요즘 일이 너무 바빠요.', '바빠요', {
    uz: 'Shu kunlarda ish juda band.',
    en: 'Work is very busy these days.',
    ru: 'В последнее время на работе очень много дел.',
  }),

  ...blank('gp_s2_u3_g9_03', G9, '이 꽃이 정말 예뻐요.', '예뻐요', {
    uz: 'Bu gul juda chiroyli.',
    en: 'This flower is really pretty.',
    ru: 'Этот цветок очень красивый.',
  }),

  ...blank('gp_s2_u3_g9_04', G9, '글씨를 크게 써요.', '써요', {
    uz: 'Harflarni katta yozaman.',
    en: 'I write the letters large.',
    ru: 'Я пишу крупными буквами.',
  }),

  ...blank('gp_s2_u3_g9_05', G9, '배가 너무 고파요.', '고파요', {
    uz: 'Men juda ochman.',
    en: 'I am very hungry.',
    ru: 'Я очень голоден.',
  }),

  ...blank('gp_s2_u3_g9_06', G9, '문을 꼭 잠가요.', '잠가요', {
    uz: 'Eshikni albatta qulflayman.',
    en: 'I make sure to lock the door.',
    ru: 'Я обязательно запираю дверь.',
  }),

  ...blank('gp_s2_u3_g9_07', G9, '오늘 기분이 정말 기뻐요.', '기뻐요', {
    uz: 'Bugun kayfiyatim juda yaxshi.',
    en: 'I feel very happy today.',
    ru: 'Сегодня я очень рад.',
  }),

  ...blank('gp_s2_u3_g9_08', G9, '이 신발은 저한테 너무 커요.', '커요', {
    uz: 'Bu oyoq kiyim menga juda katta.',
    en: 'These shoes are too big for me.',
    ru: 'Эта обувь мне слишком велика.',
  }),

  ...blank('gp_s2_u3_g9_09', G9, '편지에 주소를 써요.', '써요', {
    uz: 'Xatga manzilni yozaman.',
    en: 'I write the address on the letter.',
    ru: 'Я пишу адрес на письме.',
  }),

  ...blank('gp_s2_u3_g9_10', G9, '감기에 걸려서 목이 아파요.', '아파요', {
    uz: "Shamollaganim uchun tomog'im og'riyapti.",
    en: 'My throat hurts because I have a cold.',
    ru: 'У меня болит горло из-за простуды.',
  }),

  // grammar_build 10
  ...build(
    'gp_s2_u3_g9_11',
    G9,
    [
      {
        options: ['오늘', '시간', '아브로르'],
        correct: '오늘',
      },
      {
        options: ['머리가', '머리이', '머리를'],
        correct: '머리가',
      },
      {
        options: ['아파요.', '무거워요.', '보냈어요.'],
        correct: '아파요.',
      },
    ],
    {
      uz: "Bugun boshim og'riyapti.",
      en: 'My head hurts today.',
      ru: 'Сегодня у меня болит голова.',
    },
  ),

  ...build(
    'gp_s2_u3_g9_12',
    G9,
    [
      {
        options: ['요즘', '해야', '건물'],
        correct: '요즘',
      },
      {
        options: ['일이', '일가', '일을'],
        correct: '일이',
      },
      {
        options: ['너무', '뭐', '병원'],
        correct: '너무',
      },
      {
        options: ['바빠요.', '사요.', '쉬워요.'],
        correct: '바빠요.',
      },
    ],
    {
      uz: 'Shu kunlarda ish juda band.',
      en: 'Work is very busy these days.',
      ru: 'В последнее время на работе очень много дел.',
    },
  ),

  ...build(
    'gp_s2_u3_g9_13',
    G9,
    [
      {
        options: ['이', '그', '저'],
        correct: '이',
      },
      {
        options: ['꽃이', '꽃가', '꽃을'],
        correct: '꽃이',
      },
      {
        options: ['정말', '입어야', '전화할'],
        correct: '정말',
      },
      {
        options: ['예뻐요.', '있어요?', '재미있어요.'],
        correct: '예뻐요.',
      },
    ],
    {
      uz: 'Bu gul juda chiroyli.',
      en: 'This flower is really pretty.',
      ru: 'Этот цветок очень красивый.',
    },
  ),

  ...build(
    'gp_s2_u3_g9_14',
    G9,
    [
      {
        options: ['글씨를', '글씨을', '글씨는'],
        correct: '글씨를',
      },
      {
        options: ['크게', '잘하고', '전화할'],
        correct: '크게',
      },
      {
        options: ['써요.', '도와요.', '마세요.'],
        correct: '써요.',
      },
    ],
    {
      uz: 'Harflarni katta yozaman.',
      en: 'I write the letters large.',
      ru: 'Я пишу крупными буквами.',
    },
  ),

  ...build(
    'gp_s2_u3_g9_15',
    G9,
    [
      {
        options: ['배가', '배이', '배를'],
        correct: '배가',
      },
      {
        options: ['너무', '올', '이건'],
        correct: '너무',
      },
      {
        options: ['고파요.', '말하세요.', '먹으세요.'],
        correct: '고파요.',
      },
    ],
    {
      uz: 'Men juda ochman.',
      en: 'I am very hungry.',
      ru: 'Я очень голоден.',
    },
  ),

  ...build(
    'gp_s2_u3_g9_16',
    G9,
    [
      {
        options: ['문을', '문를', '문은'],
        correct: '문을',
      },
      {
        options: ['꼭', '항상', '같이'],
        correct: '꼭',
      },
      {
        options: ['잠가요.', '걸어요.', '귀여워요.'],
        correct: '잠가요.',
      },
    ],
    {
      uz: 'Eshikni albatta qulflayman.',
      en: 'I make sure to lock the door.',
      ru: 'Я обязательно запираю дверь.',
    },
  ),

  ...build(
    'gp_s2_u3_g9_17',
    G9,
    [
      {
        options: ['이', '그', '저'],
        correct: '이',
      },
      {
        options: ['신발은', '신발는', '신발을'],
        correct: '신발은',
      },
      {
        options: ['저한테', '저에게', '저에서'],
        correct: '저한테',
      },
      {
        options: ['너무', '먼', '뭐'],
        correct: '너무',
      },
      {
        options: ['커요.', '걸어요.', '귀여워요.'],
        correct: '커요.',
      },
    ],
    {
      uz: 'Bu oyoq kiyim menga juda katta.',
      en: 'These shoes are too big for me.',
      ru: 'Эта обувь мне слишком велика.',
    },
  ),

  ...build(
    'gp_s2_u3_g9_18',
    G9,
    [
      {
        options: ['편지에', '편지에서', '편지까지'],
        correct: '편지에',
      },
      {
        options: ['주소를', '주소을', '주소는'],
        correct: '주소를',
      },
      {
        options: ['써요.', '파세요?', '가세요.'],
        correct: '써요.',
      },
    ],
    {
      uz: 'Xatga manzilni yozaman.',
      en: 'I write the address on the letter.',
      ru: 'Я пишу адрес на письме.',
    },
  ),

  ...build(
    'gp_s2_u3_g9_19',
    G9,
    [
      {
        options: ['감기에', '감기에서', '감기까지'],
        correct: '감기에',
      },
      {
        options: ['걸려서', '일어나서', '들으면서'],
        correct: '걸려서',
      },
      {
        options: ['목이', '목가', '목을'],
        correct: '목이',
      },
      {
        options: ['아파요.', '읽었어요.', '있어요?'],
        correct: '아파요.',
      },
    ],
    {
      uz: "Shamollaganim uchun tomog'im og'riyapti.",
      en: 'My throat hurts because I have a cold.',
      ru: 'У меня болит горло из-за простуды.',
    },
  ),

  ...build(
    'gp_s2_u3_g9_20',
    G9,
    [
      {
        options: ['오늘은', '오늘는', '오늘을'],
        correct: '오늘은',
      },
      {
        options: ['기분이', '기분가', '기분을'],
        correct: '기분이',
      },
      {
        options: ['기뻐요.', '쓰세요.', '어렵습니까?'],
        correct: '기뻐요.',
      },
    ],
    {
      uz: 'Bugun juda xursandman.',
      en: 'I am very happy today.',
      ru: 'Сегодня я очень рад.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 10. V-지 마세요
// ─────────────────────────────────────────────
const G10 = 'prohibition-ji-maseyo';

const G10_Q = {
  // grammar_blank 10
  ...blank('gp_s2_u3_g10_01', G10, '찬물을 마시지 마세요.', '마시지 마세요', {
    uz: 'Sovuq suv ichmang.',
    en: 'Please do not drink cold water.',
    ru: 'Не пейте холодную воду.',
  }),

  ...blank(
    'gp_s2_u3_g10_02',
    G10,
    '오늘은 운동하지 마세요.',
    '운동하지 마세요',
    {
      uz: 'Bugun sport bilan shug‘ullanmang.',
      en: 'Please do not exercise today.',
      ru: 'Сегодня не занимайтесь спортом.',
    },
  ),

  ...blank(
    'gp_s2_u3_g10_03',
    G10,
    '약을 너무 많이 먹지 마세요.',
    '먹지 마세요',
    {
      uz: 'Doridan juda ko‘p ichmang.',
      en: 'Please do not take too much medicine.',
      ru: 'Не принимайте слишком много лекарства.',
    },
  ),

  ...blank(
    'gp_s2_u3_g10_04',
    G10,
    '여기에서 사진을 찍지 마세요.',
    '찍지 마세요',
    {
      uz: 'Bu yerda suratga olmang.',
      en: 'Please do not take pictures here.',
      ru: 'Здесь не фотографируйте.',
    },
  ),

  ...blank(
    'gp_s2_u3_g10_05',
    G10,
    '수업 시간에 전화하지 마세요.',
    '전화하지 마세요',
    {
      uz: 'Dars vaqtida telefon qilmang.',
      en: 'Please do not make calls during class.',
      ru: 'Не звоните во время урока.',
    },
  ),

  ...blank('gp_s2_u3_g10_06', G10, '너무 늦게 자지 마세요.', '자지 마세요', {
    uz: 'Juda kech uxlamang.',
    en: 'Please do not go to bed too late.',
    ru: 'Не ложитесь спать слишком поздно.',
  }),

  ...blank(
    'gp_s2_u3_g10_07',
    G10,
    '아픈 곳을 만지지 마세요.',
    '만지지 마세요',
    {
      uz: 'Og‘riyotgan joyga tegmang.',
      en: 'Please do not touch the sore area.',
      ru: 'Не трогайте больное место.',
    },
  ),

  ...blank('gp_s2_u3_g10_08', G10, '병원 안에서 뛰지 마세요.', '뛰지 마세요', {
    uz: 'Kasalxona ichida yugurmang.',
    en: 'Please do not run inside the hospital.',
    ru: 'Не бегайте в больнице.',
  }),

  ...blank(
    'gp_s2_u3_g10_09',
    G10,
    '열이 나면 학교에 가지 마세요.',
    '가지 마세요',
    {
      uz: 'Isitma bo‘lsa, maktabga bormang.',
      en: 'If you have a fever, do not go to school.',
      ru: 'Если у вас температура, не ходите в школу.',
    },
  ),

  ...blank(
    'gp_s2_u3_g10_10',
    G10,
    '이 약을 빈속에 먹지 마세요.',
    '먹지 마세요',
    {
      uz: 'Bu dorini och qoringa ichmang.',
      en: 'Do not take this medicine on an empty stomach.',
      ru: 'Не принимайте это лекарство натощак.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s2_u3_g10_11',
    G10,
    [
      {
        options: ['찬물을', '찬물를', '찬물은'],
        correct: '찬물을',
      },
      {
        options: ['마시지', '전화하지', '싶지'],
        correct: '마시지',
      },
      {
        options: ['마세요.', '주세요.', '도세요.'],
        correct: '마세요.',
      },
    ],
    {
      uz: 'Sovuq suv ichmang.',
      en: 'Please do not drink cold water.',
      ru: 'Не пейте холодную воду.',
    },
  ),

  ...build(
    'gp_s2_u3_g10_12',
    G10,
    [
      {
        options: ['오늘은', '오늘는', '오늘을'],
        correct: '오늘은',
      },
      {
        options: ['운동하지', '전화하지', '먹지'],
        correct: '운동하지',
      },
      {
        options: ['마세요.', '오세요.', '친절하세요.'],
        correct: '마세요.',
      },
    ],
    {
      uz: 'Bugun sport bilan shug‘ullanmang.',
      en: 'Please do not exercise today.',
      ru: 'Сегодня не занимайтесь спортом.',
    },
  ),

  ...build(
    'gp_s2_u3_g10_13',
    G10,
    [
      {
        options: ['약을', '약를', '약은'],
        correct: '약을',
      },
      {
        options: ['너무', '예쁜', '요즘'],
        correct: '너무',
      },
      {
        options: ['많이', '공부할', '김밥'],
        correct: '많이',
      },
      {
        options: ['먹지', '만지지', '늦지'],
        correct: '먹지',
      },
      {
        options: ['마세요.', '일어나세요.', '가세요.'],
        correct: '마세요.',
      },
    ],
    {
      uz: 'Doridan juda ko‘p ichmang.',
      en: 'Please do not take too much medicine.',
      ru: 'Не принимайте слишком много лекарства.',
    },
  ),

  ...build(
    'gp_s2_u3_g10_14',
    G10,
    [
      {
        options: ['여기에서', '여기에', '여기까지'],
        correct: '여기에서',
      },
      {
        options: ['사진을', '사진를', '사진은'],
        correct: '사진을',
      },
      {
        options: ['찍지', '가지', '자지'],
        correct: '찍지',
      },
      {
        options: ['마세요.', '많으세요.', '여세요.'],
        correct: '마세요.',
      },
    ],
    {
      uz: 'Bu yerda suratga olmang.',
      en: 'Please do not take pictures here.',
      ru: 'Здесь не фотографируйте.',
    },
  ),

  ...build(
    'gp_s2_u3_g10_15',
    G10,
    [
      {
        options: ['수업', '할머니께', '감사의'],
        correct: '수업',
      },
      {
        options: ['시간에', '시간에서', '시간까지'],
        correct: '시간에',
      },
      {
        options: ['전화하지', '마시지', '가지'],
        correct: '전화하지',
      },
      {
        options: ['마세요.', '앉으세요.', '전화하세요.'],
        correct: '마세요.',
      },
    ],
    {
      uz: 'Dars vaqtida telefon qilmang.',
      en: 'Please do not make calls during class.',
      ru: 'Не звоните во время урока.',
    },
  ),

  ...build(
    'gp_s2_u3_g10_16',
    G10,
    [
      {
        options: ['너무', '쉴', '아메리카노'],
        correct: '너무',
      },
      {
        options: ['늦게', '씨의', '아홉'],
        correct: '늦게',
      },
      {
        options: ['자지', '마시지', '가지'],
        correct: '자지',
      },
      {
        options: ['마세요.', '잘하세요.', '다니세요.'],
        correct: '마세요.',
      },
    ],
    {
      uz: 'Juda kech uxlamang.',
      en: 'Please do not go to bed too late.',
      ru: 'Не ложитесь спать слишком поздно.',
    },
  ),

  ...build(
    'gp_s2_u3_g10_17',
    G10,
    [
      {
        options: ['아픈', '잔', '좀'],
        correct: '아픈',
      },
      {
        options: ['곳을', '곳를', '곳은'],
        correct: '곳을',
      },
      {
        options: ['만지지', '늦지', '좋은지'],
        correct: '만지지',
      },
      {
        options: ['마세요.', '보세요.', '입으세요.'],
        correct: '마세요.',
      },
    ],
    {
      uz: 'Og‘riyotgan joyga tegmang.',
      en: 'Please do not touch the sore area.',
      ru: 'Не трогайте больное место.',
    },
  ),

  ...build(
    'gp_s2_u3_g10_18',
    G10,
    [
      {
        options: ['병원', '같이', '교실'],
        correct: '병원',
      },
      {
        options: ['안에서', '안에', '안까지'],
        correct: '안에서',
      },
      {
        options: ['뛰지', '늦지', '좋은지'],
        correct: '뛰지',
      },
      {
        options: ['마세요.', '앉으세요.', '전화하세요.'],
        correct: '마세요.',
      },
    ],
    {
      uz: 'Kasalxona ichida yugurmang.',
      en: 'Please do not run inside the hospital.',
      ru: 'Не бегайте в больнице.',
    },
  ),

  ...build(
    'gp_s2_u3_g10_19',
    G10,
    [
      {
        options: ['열이', '열가', '열을'],
        correct: '열이',
      },
      {
        options: ['나면', '타면', '무거우면'],
        correct: '나면',
      },
      {
        options: ['학교에', '학교에서', '학교까지'],
        correct: '학교에',
      },
      {
        options: ['가지', '싶지', '마시지'],
        correct: '가지',
      },
      {
        options: ['마세요.', '다니세요.', '바쁘세요.'],
        correct: '마세요.',
      },
    ],
    {
      uz: 'Isitma bo‘lsa, maktabga bormang.',
      en: 'If you have a fever, do not go to school.',
      ru: 'Если у вас температура, не ходите в школу.',
    },
  ),

  ...build(
    'gp_s2_u3_g10_20',
    G10,
    [
      {
        options: ['이', '그', '저'],
        correct: '이',
      },
      {
        options: ['약을', '약를', '약은'],
        correct: '약을',
      },
      {
        options: ['빈속에', '빈속에서', '빈속까지'],
        correct: '빈속에',
      },
      {
        options: ['먹지', '좋은지', '운동하지'],
        correct: '먹지',
      },
      {
        options: ['마세요.', '먹으세요.', '의사세요.'],
        correct: '마세요.',
      },
    ],
    {
      uz: 'Bu dorini och qoringa ichmang.',
      en: 'Do not take this medicine on an empty stomach.',
      ru: 'Не принимайте это лекарство натощак.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 11. N만
// ─────────────────────────────────────────────
const G11 = 'only-man';

const G11_Q = {
  // grammar_blank 10
  ...blank('gp_s2_u3_g11_01', G11, '오늘은 물만 마셨어요.', '물만', {
    uz: 'Bugun faqat suv ichdim.',
    en: 'I drank only water today.',
    ru: 'Сегодня я пил только воду.',
  }),

  ...blank('gp_s2_u3_g11_02', G11, '아침에는 약만 먹었어요.', '약만', {
    uz: 'Ertalab faqat dori ichdim.',
    en: 'I only took medicine in the morning.',
    ru: 'Утром я принял только лекарство.',
  }),

  ...blank('gp_s2_u3_g11_03', G11, '저만 감기에 걸렸어요.', '저만', {
    uz: 'Faqat men shamolladim.',
    en: 'Only I caught a cold.',
    ru: 'Только я простудился.',
  }),

  ...blank('gp_s2_u3_g11_04', G11, '주말에는 집에서만 쉬었어요.', '집에서만', {
    uz: 'Dam olish kuni faqat uyda dam oldim.',
    en: 'I rested only at home over the weekend.',
    ru: 'На выходных я отдыхал только дома.',
  }),

  ...blank('gp_s2_u3_g11_05', G11, '과일만 조금 먹으세요.', '과일만', {
    uz: 'Faqat ozgina meva yeng.',
    en: 'Please eat only a little fruit.',
    ru: 'Ешьте только немного фруктов.',
  }),

  ...blank('gp_s2_u3_g11_06', G11, '민수 씨만 병원에 갔어요.', '민수 씨만', {
    uz: 'Faqat Minsu kasalxonaga bordi.',
    en: 'Only Minsu went to the hospital.',
    ru: 'Только Минсу пошёл в больницу.',
  }),

  ...blank('gp_s2_u3_g11_07', G11, '오늘만 일찍 집에 갈 거예요.', '오늘만', {
    uz: 'Faqat bugun uyga erta boraman.',
    en: 'Only today, I will go home early.',
    ru: 'Только сегодня я уйду домой рано.',
  }),

  ...blank('gp_s2_u3_g11_08', G11, '이 약은 저녁에만 드세요.', '저녁에만', {
    uz: 'Bu dorini faqat kechqurun iching.',
    en: 'Take this medicine only in the evening.',
    ru: 'Принимайте это лекарство только вечером.',
  }),

  ...blank('gp_s2_u3_g11_09', G11, '한국어만 공부하고 있어요.', '한국어만', {
    uz: 'Faqat koreys tilini o‘rganyapman.',
    en: 'I am studying only Korean.',
    ru: 'Я изучаю только корейский язык.',
  }),

  ...blank('gp_s2_u3_g11_10', G11, '한 시간만 자고 일어났어요.', '한 시간만', {
    uz: 'Faqat bir soat uxlab turdim.',
    en: 'I slept for only one hour and got up.',
    ru: 'Я поспал всего один час и встал.',
  }),

  // grammar_build 10
  ...build(
    'gp_s2_u3_g11_11',
    G11,
    [
      {
        options: ['오늘은', '오늘는', '오늘을'],
        correct: '오늘은',
      },
      {
        options: ['물만', '씨만', '춥지만'],
        correct: '물만',
      },
      {
        options: ['마셨어요.', '공부했어요.', '맛있어요.'],
        correct: '마셨어요.',
      },
    ],
    {
      uz: 'Bugun faqat suv ichdim.',
      en: 'I drank only water today.',
      ru: 'Сегодня я пил только воду.',
    },
  ),

  ...build(
    'gp_s2_u3_g11_12',
    G11,
    [
      {
        options: ['아침에는', '아침에도', '아침에만'],
        correct: '아침에는',
      },
      {
        options: ['약만', '없지만', '물만'],
        correct: '약만',
      },
      {
        options: ['먹었어요.', '썼어요.', '읽었어요.'],
        correct: '먹었어요.',
      },
    ],
    {
      uz: 'Ertalab faqat dori ichdim.',
      en: 'I only took medicine in the morning.',
      ru: 'Утром я принял только лекарство.',
    },
  ),

  ...build(
    'gp_s2_u3_g11_13',
    G11,
    [
      {
        options: ['저만', '피곤하지만', '오지만'],
        correct: '저만',
      },
      {
        options: ['감기에', '감기에서', '감기까지'],
        correct: '감기에',
      },
      {
        options: ['걸렸어요.', '샤워했어요.', '요리했어요.'],
        correct: '걸렸어요.',
      },
    ],
    {
      uz: 'Faqat men shamolladim.',
      en: 'Only I caught a cold.',
      ru: 'Только я простудился.',
    },
  ),

  ...build(
    'gp_s2_u3_g11_14',
    G11,
    [
      {
        options: ['주말에는', '주말에도', '주말에만'],
        correct: '주말에는',
      },
      {
        options: ['집에서만', '집에서도', '집에서는'],
        correct: '집에서만',
      },
      {
        options: ['쉬었어요.', '봤어요.', '없어요.'],
        correct: '쉬었어요.',
      },
    ],
    {
      uz: 'Dam olish kuni faqat uyda dam oldim.',
      en: 'I rested only at home over the weekend.',
      ru: 'На выходных я отдыхал только дома.',
    },
  ),

  ...build(
    'gp_s2_u3_g11_15',
    G11,
    [
      {
        options: ['과일만', '과일도', '과일까지'],
        correct: '과일만',
      },
      {
        options: ['조금', '천천히', '편한'],
        correct: '조금',
      },
      {
        options: ['먹으세요.', '바쁘세요.', '읽으세요.'],
        correct: '먹으세요.',
      },
    ],
    {
      uz: 'Faqat ozgina meva yeng.',
      en: 'Please eat only a little fruit.',
      ru: 'Ешьте только немного фруктов.',
    },
  ),

  ...build(
    'gp_s2_u3_g11_16',
    G11,
    [
      {
        options: ['민수', '빵', '선생님께'],
        correct: '민수',
      },
      {
        options: ['씨만', '없지만', '물만'],
        correct: '씨만',
      },
      {
        options: ['병원에', '병원에서', '병원까지'],
        correct: '병원에',
      },
      {
        options: ['갔어요.', '봤어요.', '썼어요.'],
        correct: '갔어요.',
      },
    ],
    {
      uz: 'Faqat Minsu kasalxonaga bordi.',
      en: 'Only Minsu went to the hospital.',
      ru: 'Только Минсу пошёл в больницу.',
    },
  ),

  ...build(
    'gp_s2_u3_g11_17',
    G11,
    [
      {
        options: ['오늘만', '오늘도', '오늘까지'],
        correct: '오늘만',
      },
      {
        options: ['일찍', '좀', '천천히'],
        correct: '일찍',
      },
      {
        options: ['집에', '집에서', '집까지'],
        correct: '집에',
      },
      {
        options: ['갈', '생일', '쉬어야'],
        correct: '갈',
      },
      {
        options: ['거', '거가', '거를'],
        correct: '거',
      },
      {
        options: ['예요.', '이에요.', '입니다.'],
        correct: '예요.',
        glue: true,
      },
    ],
    {
      uz: 'Faqat bugun uyga erta boraman.',
      en: 'Only today, I will go home early.',
      ru: 'Только сегодня я уйду домой рано.',
    },
  ),

  ...build(
    'gp_s2_u3_g11_18',
    G11,
    [
      {
        options: ['이', '그', '저'],
        correct: '이',
      },
      {
        options: ['약은', '약는', '약을'],
        correct: '약은',
      },
      {
        options: ['저녁에만', '저녁에는', '저녁에도'],
        correct: '저녁에만',
      },
      {
        options: ['드세요.', '도세요.', '쓰세요.'],
        correct: '드세요.',
      },
    ],
    {
      uz: 'Bu dorini faqat kechqurun iching.',
      en: 'Take this medicine only in the evening.',
      ru: 'Принимайте это лекарство только вечером.',
    },
  ),

  ...build(
    'gp_s2_u3_g11_19',
    G11,
    [
      {
        options: ['한국어만', '한국어도', '한국어까지'],
        correct: '한국어만',
      },
      {
        options: ['공부하고', '먹고', '살고'],
        correct: '공부하고',
      },
      {
        options: ['있어요.', '탔어요.', '도와줬어요.'],
        correct: '있어요.',
      },
    ],
    {
      uz: 'Faqat koreys tilini o‘rganyapman.',
      en: 'I am studying only Korean.',
      ru: 'Я изучаю только корейский язык.',
    },
  ),

  ...build(
    'gp_s2_u3_g11_20',
    G11,
    [
      {
        options: ['한', '일곱', '열한'],
        correct: '한',
      },
      {
        options: ['시간만', '시간도', '시간까지'],
        correct: '시간만',
      },
      {
        options: ['자고', '가고', '만나고'],
        correct: '자고',
      },
      {
        options: ['일어났어요.', '잤어요.', '했어요.'],
        correct: '일어났어요.',
      },
    ],
    {
      uz: 'Faqat bir soat uxlab turdim.',
      en: 'I slept for only one hour and got up.',
      ru: 'Я поспал всего один час и встал.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 12. V-아야/어야 되다
// ─────────────────────────────────────────────
const G12 = 'obligation-aya-eoya-doeda';

const G12_Q = {
  // grammar_blank 10
  ...blank('gp_s2_u3_g12_01', G12, '약을 먹어야 돼요.', '먹어야 돼요', {
    uz: 'Dori ichish kerak.',
    en: 'You have to take medicine.',
    ru: 'Нужно принять лекарство.',
  }),

  ...blank('gp_s2_u3_g12_02', G12, '오늘은 일찍 자야 돼요.', '자야 돼요', {
    uz: 'Bugun erta uxlash kerak.',
    en: 'I have to go to bed early today.',
    ru: 'Сегодня нужно лечь спать рано.',
  }),

  ...blank('gp_s2_u3_g12_03', G12, '내일 병원에 가야 돼요.', '가야 돼요', {
    uz: 'Ertaga kasalxonaga borishim kerak.',
    en: 'I have to go to the hospital tomorrow.',
    ru: 'Завтра мне нужно пойти в больницу.',
  }),

  ...blank('gp_s2_u3_g12_04', G12, '물을 많이 마셔야 돼요.', '마셔야 돼요', {
    uz: 'Ko‘p suv ichish kerak.',
    en: 'You have to drink plenty of water.',
    ru: 'Нужно пить много воды.',
  }),

  ...blank('gp_s2_u3_g12_05', G12, '수업 전에 숙제를 해야 돼요.', '해야 돼요', {
    uz: 'Darsdan oldin uy vazifasini qilish kerak.',
    en: 'I have to do my homework before class.',
    ru: 'Перед уроком нужно сделать домашнее задание.',
  }),

  ...blank('gp_s2_u3_g12_06', G12, '아침을 꼭 먹어야 돼요.', '먹어야 돼요', {
    uz: 'Nonushtani albatta yeyish kerak.',
    en: 'You have to eat breakfast.',
    ru: 'Нужно обязательно завтракать.',
  }),

  ...blank(
    'gp_s2_u3_g12_07',
    G12,
    '이 약은 하루에 세 번 먹어야 돼요.',
    '먹어야 돼요',
    {
      uz: 'Bu dorini kuniga uch marta ichish kerak.',
      en: 'You have to take this medicine three times a day.',
      ru: 'Это лекарство нужно принимать три раза в день.',
    },
  ),

  ...blank('gp_s2_u3_g12_08', G12, '열이 나면 푹 쉬어야 돼요.', '쉬어야 돼요', {
    uz: 'Isitma bo‘lsa, yaxshilab dam olish kerak.',
    en: 'If you have a fever, you have to get plenty of rest.',
    ru: 'Если температура, нужно хорошо отдохнуть.',
  }),

  ...blank(
    'gp_s2_u3_g12_09',
    G12,
    '아홉 시까지 회사에 와야 돼요.',
    '와야 돼요',
    {
      uz: 'Soat to‘qqizgacha ishxonaga kelish kerak.',
      en: 'I have to come to the office by nine.',
      ru: 'Нужно прийти в офис к девяти.',
    },
  ),

  ...blank(
    'gp_s2_u3_g12_10',
    G12,
    '감기에 걸리면 따뜻한 옷을 입어야 돼요.',
    '입어야 돼요',
    {
      uz: 'Shamollasangiz, issiq kiyim kiyish kerak.',
      en: 'If you catch a cold, you have to wear warm clothes.',
      ru: 'Если вы простудились, нужно тепло одеваться.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s2_u3_g12_11',
    G12,
    [
      {
        options: ['약을', '약를', '약은'],
        correct: '약을',
      },
      {
        options: ['먹어야', '버스', '분'],
        correct: '먹어야',
      },
      {
        options: ['돼요.', '잘하세요.', '조용해요.'],
        correct: '돼요.',
      },
    ],
    {
      uz: 'Dori ichish kerak.',
      en: 'You have to take medicine.',
      ru: 'Нужно принять лекарство.',
    },
  ),

  ...build(
    'gp_s2_u3_g12_12',
    G12,
    [
      {
        options: ['오늘은', '오늘는', '오늘을'],
        correct: '오늘은',
      },
      {
        options: ['일찍', '분', '삼십'],
        correct: '일찍',
      },
      {
        options: ['자야', '수진', '씨'],
        correct: '자야',
      },
      {
        options: ['돼요.', '일어났어요.', '있습니까?'],
        correct: '돼요.',
      },
    ],
    {
      uz: 'Bugun erta uxlash kerak.',
      en: 'I have to go to bed early today.',
      ru: 'Сегодня нужно лечь спать рано.',
    },
  ),

  ...build(
    'gp_s2_u3_g12_13',
    G12,
    [
      {
        options: ['내일', '골라', '김'],
        correct: '내일',
      },
      {
        options: ['병원에', '병원에서', '병원까지'],
        correct: '병원에',
      },
      {
        options: ['가야', '건물', '귤'],
        correct: '가야',
      },
      {
        options: ['돼요.', '잘해요.', '좋네요.'],
        correct: '돼요.',
      },
    ],
    {
      uz: 'Ertaga kasalxonaga borishim kerak.',
      en: 'I have to go to the hospital tomorrow.',
      ru: 'Завтра мне нужно пойти в больницу.',
    },
  ),

  ...build(
    'gp_s2_u3_g12_14',
    G12,
    [
      {
        options: ['물을', '물를', '물은'],
        correct: '물을',
      },
      {
        options: ['많이', '마셔야', '모임'],
        correct: '많이',
      },
      {
        options: ['마셔야', '병', '빵'],
        correct: '마셔야',
      },
      {
        options: ['돼요.', '팝니다.', '가셨어요.'],
        correct: '돼요.',
      },
    ],
    {
      uz: 'Ko‘p suv ichish kerak.',
      en: 'You have to drink plenty of water.',
      ru: 'Нужно пить много воды.',
    },
  ),

  ...build(
    'gp_s2_u3_g12_15',
    G12,
    [
      {
        options: ['수업', '우즈베키스탄', '일찍'],
        correct: '수업',
      },
      {
        options: ['전에', '전에서', '전까지'],
        correct: '전에',
      },
      {
        options: ['숙제를', '숙제을', '숙제는'],
        correct: '숙제를',
      },
      {
        options: ['해야', '더운', '먼'],
        correct: '해야',
      },
      {
        options: ['돼요.', '기자세요.', '더워요.'],
        correct: '돼요.',
      },
    ],
    {
      uz: 'Darsdan oldin uy vazifasini qilish kerak.',
      en: 'I have to do my homework before class.',
      ru: 'Перед уроком нужно сделать домашнее задание.',
    },
  ),

  ...build(
    'gp_s2_u3_g12_16',
    G12,
    [
      {
        options: ['아침을', '아침를', '아침은'],
        correct: '아침을',
      },
      {
        options: ['꼭', '은행', '잃어버린'],
        correct: '꼭',
      },
      {
        options: ['먹어야', '사용해', '세울'],
        correct: '먹어야',
      },
      {
        options: ['돼요.', '잘해요.', '좋네요.'],
        correct: '돼요.',
      },
    ],
    {
      uz: 'Nonushtani albatta yeyish kerak.',
      en: 'You have to eat breakfast.',
      ru: 'Нужно обязательно завтракать.',
    },
  ),

  ...build(
    'gp_s2_u3_g12_17',
    G12,
    [
      {
        options: ['이', '그', '저'],
        correct: '이',
      },
      {
        options: ['약은', '약는', '약을'],
        correct: '약은',
      },
      {
        options: ['하루에', '하루에서', '하루까지'],
        correct: '하루에',
      },
      {
        options: ['세', '열한', '열두'],
        correct: '세',
      },
      {
        options: ['번', '메뉴', '민수의'],
        correct: '번',
      },
      {
        options: ['먹어야', '친구의', '학교'],
        correct: '먹어야',
      },
      {
        options: ['돼요.', '보냈어요.', '사요.'],
        correct: '돼요.',
      },
    ],
    {
      uz: 'Bu dorini kuniga uch marta ichish kerak.',
      en: 'You have to take this medicine three times a day.',
      ru: 'Это лекарство нужно принимать три раза в день.',
    },
  ),

  ...build(
    'gp_s2_u3_g12_18',
    G12,
    [
      {
        options: ['열이', '열가', '열을'],
        correct: '열이',
      },
      {
        options: ['나면', '있으면', '만나면'],
        correct: '나면',
      },
      {
        options: ['푹', '긴', '다른'],
        correct: '푹',
      },
      {
        options: ['쉬어야', '오전', '은행'],
        correct: '쉬어야',
      },
      {
        options: ['돼요.', '먹으세요.', '바빠요.'],
        correct: '돼요.',
      },
    ],
    {
      uz: 'Isitma bo‘lsa, yaxshilab dam olish kerak.',
      en: 'If you have a fever, you have to get plenty of rest.',
      ru: 'Если температура, нужно хорошо отдохнуть.',
    },
  ),

  ...build(
    'gp_s2_u3_g12_19',
    G12,
    [
      {
        options: ['아홉', '일곱', '열한'],
        correct: '아홉',
      },
      {
        options: ['시까지', '시부터', '시에서'],
        correct: '시까지',
      },
      {
        options: ['회사에', '회사에서', '회사까지'],
        correct: '회사에',
      },
      {
        options: ['와야', '한번', '갈'],
        correct: '와야',
      },
      {
        options: ['돼요.', '봤어요.', '샀어요.'],
        correct: '돼요.',
      },
    ],
    {
      uz: 'Soat to‘qqizgacha ishxonaga kelish kerak.',
      en: 'I have to come to the office by nine.',
      ru: 'Нужно прийти в офис к девяти.',
    },
  ),

  ...build(
    'gp_s2_u3_g12_20',
    G12,
    [
      {
        options: ['감기에', '감기에서', '감기까지'],
        correct: '감기에',
      },
      {
        options: ['걸리면', '있으면', '만나면'],
        correct: '걸리면',
      },
      {
        options: ['따뜻한', '많이', '무슨'],
        correct: '따뜻한',
      },
      {
        options: ['옷을', '옷를', '옷은'],
        correct: '옷을',
      },
      {
        options: ['입어야', '모임', '밤'],
        correct: '입어야',
      },
      {
        options: ['돼요.', '귀여워요.', '누구세요?'],
        correct: '돼요.',
      },
    ],
    {
      uz: 'Shamollasangiz, issiq kiyim kiyish kerak.',
      en: 'If you catch a cold, you have to wear warm clothes.',
      ru: 'Если вы простудились, нужно тепло одеваться.',
    },
  ),
};

// ═══════════════════════════════════════════════════════════
// UNIT 4
// 계획 · 이동 · 부탁 · 교통수단
// ═══════════════════════════════════════════════════════════

// ─────────────────────────────────────────────
// 문법 13. V-(으)려고 하다
// ─────────────────────────────────────────────
const G13 = 'intention-euryeogo-hada';

const G13_Q = {
  // grammar_blank 10
  ...blank(
    'gp_s2_u4_g13_01',
    G13,
    '이번 주말에 친구를 만나려고 해요.',
    '만나려고 해요',
    {
      uz: 'Bu hafta oxirida do‘stim bilan uchrashmoqchiman.',
      en: 'I am planning to meet my friend this weekend.',
      ru: 'В эти выходные я собираюсь встретиться с другом.',
    },
  ),

  ...blank(
    'gp_s2_u4_g13_02',
    G13,
    '방학에 제주도에 가려고 해요.',
    '가려고 해요',
    {
      uz: 'Ta’tilda Jejuga bormoqchiman.',
      en: 'I am planning to go to Jeju during vacation.',
      ru: 'На каникулах я собираюсь поехать на Чеджу.',
    },
  ),

  ...blank(
    'gp_s2_u4_g13_03',
    G13,
    '오늘 저녁에 운동하려고 해요.',
    '운동하려고 해요',
    {
      uz: 'Bugun kechqurun sport bilan shug‘ullanmoqchiman.',
      en: 'I am planning to exercise this evening.',
      ru: 'Сегодня вечером я собираюсь заниматься спортом.',
    },
  ),

  ...blank(
    'gp_s2_u4_g13_04',
    G13,
    '점심에 비빔밥을 먹으려고 해요.',
    '먹으려고 해요',
    {
      uz: 'Tushlikda bibimbap yemoqchiman.',
      en: 'I am planning to eat bibimbap for lunch.',
      ru: 'На обед я собираюсь съесть пибимпап.',
    },
  ),

  ...blank(
    'gp_s2_u4_g13_05',
    G13,
    '내일부터 한국어를 더 열심히 공부하려고 해요.',
    '공부하려고 해요',
    {
      uz: 'Ertadan koreys tilini yanada jiddiyroq o‘rganmoqchiman.',
      en: 'I am planning to study Korean harder starting tomorrow.',
      ru: 'С завтрашнего дня я собираюсь усерднее учить корейский.',
    },
  ),

  ...blank(
    'gp_s2_u4_g13_06',
    G13,
    '부모님께 선물을 사려고 해요.',
    '사려고 해요',
    {
      uz: 'Ota-onamga sovg‘a sotib olmoqchiman.',
      en: 'I am planning to buy a gift for my parents.',
      ru: 'Я собираюсь купить подарок родителям.',
    },
  ),

  ...blank(
    'gp_s2_u4_g13_07',
    G13,
    '주말에는 집에서 쉬려고 해요.',
    '쉬려고 해요',
    {
      uz: 'Dam olish kunlari uyda dam olmoqchiman.',
      en: 'I am planning to rest at home this weekend.',
      ru: 'На выходных я собираюсь отдыхать дома.',
    },
  ),

  ...blank(
    'gp_s2_u4_g13_08',
    G13,
    '여름에 부산에서 한 달 동안 살려고 해요.',
    '살려고 해요',
    {
      uz: 'Yozda Pusanda bir oy yashamoqchiman.',
      en: 'I am planning to live in Busan for a month this summer.',
      ru: 'Летом я собираюсь месяц пожить в Пусане.',
    },
  ),

  ...blank(
    'gp_s2_u4_g13_09',
    G13,
    '집에 가서 음악을 들으려고 해요.',
    '들으려고 해요',
    {
      uz: 'Uyga borib musiqa tinglamoqchiman.',
      en: 'I am planning to listen to music when I get home.',
      ru: 'Когда приду домой, я собираюсь послушать музыку.',
    },
  ),

  ...blank(
    'gp_s2_u4_g13_10',
    G13,
    '이번 여행에서 사진을 많이 찍으려고 해요.',
    '찍으려고 해요',
    {
      uz: 'Bu sayohatda ko‘p suratga olmoqchiman.',
      en: 'I am planning to take many photos on this trip.',
      ru: 'В этой поездке я собираюсь сделать много фотографий.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s2_u4_g13_11',
    G13,
    [
      {
        options: ['이번', '시', '아버지의'],
        correct: '이번',
      },
      {
        options: ['주말에', '주말에서', '주말까지'],
        correct: '주말에',
      },
      {
        options: ['친구를', '친구을', '친구는'],
        correct: '친구를',
      },
      {
        options: ['만나려고', '신고', '자고'],
        correct: '만나려고',
      },
      {
        options: ['해요.', '깨끗해요.', '조용해요.'],
        correct: '해요.',
      },
    ],
    {
      uz: 'Bu hafta oxirida do‘stim bilan uchrashmoqchiman.',
      en: 'I am planning to meet my friend this weekend.',
      ru: 'В эти выходные я собираюсь встретиться с другом.',
    },
  ),

  ...build(
    'gp_s2_u4_g13_12',
    G13,
    [
      {
        options: ['방학에', '방학에서', '방학까지'],
        correct: '방학에',
      },
      {
        options: ['제주도에', '제주도에서', '제주도까지'],
        correct: '제주도에',
      },
      {
        options: ['가려고', '만나고', '사고'],
        correct: '가려고',
      },
      {
        options: ['해요.', '이야기해요.', '도착해요.'],
        correct: '해요.',
      },
    ],
    {
      uz: 'Ta’tilda Jejuga bormoqchiman.',
      en: 'I am planning to go to Jeju during vacation.',
      ru: 'На каникулах я собираюсь поехать на Чеджу.',
    },
  ),

  ...build(
    'gp_s2_u4_g13_13',
    G13,
    [
      {
        options: ['오늘', '콜라', '한국'],
        correct: '오늘',
      },
      {
        options: ['저녁에', '저녁에서', '저녁까지'],
        correct: '저녁에',
      },
      {
        options: ['운동하려고', '싸고', '잘하고'],
        correct: '운동하려고',
      },
      {
        options: ['해요.', '운동해요.', '깨끗해요.'],
        correct: '해요.',
      },
    ],
    {
      uz: 'Bugun kechqurun sport bilan shug‘ullanmoqchiman.',
      en: 'I am planning to exercise this evening.',
      ru: 'Сегодня вечером я собираюсь заниматься спортом.',
    },
  ),

  ...build(
    'gp_s2_u4_g13_14',
    G13,
    [
      {
        options: ['점심에', '점심에서', '점심까지'],
        correct: '점심에',
      },
      {
        options: ['비빔밥을', '비빔밥를', '비빔밥은'],
        correct: '비빔밥을',
      },
      {
        options: ['먹으려고', '사고', '싸고'],
        correct: '먹으려고',
      },
      {
        options: ['해요.', '시작해요.', '공부해요.'],
        correct: '해요.',
      },
    ],
    {
      uz: 'Tushlikda bibimbap yemoqchiman.',
      en: 'I am planning to eat bibimbap for lunch.',
      ru: 'На обед я собираюсь съесть пибимпап.',
    },
  ),

  ...build(
    'gp_s2_u4_g13_15',
    G13,
    [
      {
        options: ['부모님께', '학교', '가'],
        correct: '부모님께',
      },
      {
        options: ['선물을', '선물를', '선물은'],
        correct: '선물을',
      },
      {
        options: ['사려고', '읽고', '춥고'],
        correct: '사려고',
      },
      {
        options: ['해요.', '공부해요.', '잘해요.'],
        correct: '해요.',
      },
    ],
    {
      uz: 'Ota-onamga sovg‘a sotib olmoqchiman.',
      en: 'I am planning to buy a gift for my parents.',
      ru: 'Я собираюсь купить подарок родителям.',
    },
  ),

  ...build(
    'gp_s2_u4_g13_16',
    G13,
    [
      {
        options: ['주말에는', '주말에도', '주말에만'],
        correct: '주말에는',
      },
      {
        options: ['집에서', '집에', '집까지'],
        correct: '집에서',
      },
      {
        options: ['쉬려고', '가려고', '만나려고'],
        correct: '쉬려고',
      },
      {
        options: ['해요.', '못해요.', '출발해요.'],
        correct: '해요.',
      },
    ],
    {
      uz: 'Dam olish kunlari uyda dam olmoqchiman.',
      en: 'I am planning to rest at home this weekend.',
      ru: 'На выходных я собираюсь отдыхать дома.',
    },
  ),

  ...build(
    'gp_s2_u4_g13_17',
    G13,
    [
      {
        options: ['여름에', '여름에서', '여름까지'],
        correct: '여름에',
      },
      {
        options: ['부산에서', '부산에', '부산까지'],
        correct: '부산에서',
      },
      {
        options: ['살려고', '운동하려고', '책하고'],
        correct: '살려고',
      },
      {
        options: ['해요.', '도착해요.', '좋아해요.'],
        correct: '해요.',
      },
    ],
    {
      uz: 'Yozda Pusanda yashamoqchiman.',
      en: 'I am planning to live in Busan this summer.',
      ru: 'Летом я собираюсь жить в Пусане.',
    },
  ),

  ...build(
    'gp_s2_u4_g13_18',
    G13,
    [
      {
        options: ['집에', '집에서', '집까지'],
        correct: '집에',
      },
      {
        options: ['가서', '타서', '보면서'],
        correct: '가서',
      },
      {
        options: ['음악을', '음악를', '음악은'],
        correct: '음악을',
      },
      {
        options: ['들으려고', '공부하고', '먹으려고'],
        correct: '들으려고',
      },
      {
        options: ['해요.', '운동해요.', '깨끗해요.'],
        correct: '해요.',
      },
    ],
    {
      uz: 'Uyga borib musiqa tinglamoqchiman.',
      en: 'I am planning to listen to music when I get home.',
      ru: 'Когда приду домой, я собираюсь послушать музыку.',
    },
  ),

  ...build(
    'gp_s2_u4_g13_19',
    G13,
    [
      {
        options: ['내일부터', '내일까지', '내일에서'],
        correct: '내일부터',
      },
      {
        options: ['한국어를', '한국어을', '한국어는'],
        correct: '한국어를',
      },
      {
        options: ['더', '교장', '꼭'],
        correct: '더',
      },
      {
        options: ['열심히', '누구의', '만날'],
        correct: '열심히',
      },
      {
        options: ['공부하려고', '나가고', '민수하고'],
        correct: '공부하려고',
      },
      {
        options: ['해요.', '운동해요.', '깨끗해요.'],
        correct: '해요.',
      },
    ],
    {
      uz: 'Ertadan koreys tilini yanada jiddiyroq o‘rganmoqchiman.',
      en: 'I am planning to study Korean harder starting tomorrow.',
      ru: 'С завтрашнего дня я собираюсь усерднее учить корейский.',
    },
  ),

  ...build(
    'gp_s2_u4_g13_20',
    G13,
    [
      {
        options: ['이번', '분', '삼십'],
        correct: '이번',
      },
      {
        options: ['여행에서', '여행에', '여행까지'],
        correct: '여행에서',
      },
      {
        options: ['사진을', '사진를', '사진은'],
        correct: '사진을',
      },
      {
        options: ['많이', '한번', '갈'],
        correct: '많이',
      },
      {
        options: ['찍으려고', '나가고', '민수하고'],
        correct: '찍으려고',
      },
      {
        options: ['해요.', '시작해요.', '공부해요.'],
        correct: '해요.',
      },
    ],
    {
      uz: 'Bu sayohatda ko‘p suratga olmoqchiman.',
      en: 'I am planning to take many photos on this trip.',
      ru: 'В этой поездке я собираюсь сделать много фотографий.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 14. N에서 N까지
// ─────────────────────────────────────────────
const G14 = 'route-eseo-kkaji';

const G14_Q = {
  // grammar_blank 10
  ...blank(
    'gp_s2_u4_g14_01',
    G14,
    '집에서 학교까지 걸어가요.',
    '집에서 학교까지',
    {
      uz: 'Uydan maktabgacha piyoda boraman.',
      en: 'I walk from home to school.',
      ru: 'Я хожу пешком от дома до школы.',
    },
  ),

  ...blank(
    'gp_s2_u4_g14_02',
    G14,
    '서울에서 부산까지 기차로 가요.',
    '서울에서 부산까지',
    {
      uz: 'Seuldan Pusangacha poyezdda boraman.',
      en: 'I go from Seoul to Busan by train.',
      ru: 'Я еду из Сеула в Пусан на поезде.',
    },
  ),

  ...blank(
    'gp_s2_u4_g14_03',
    G14,
    '공항에서 호텔까지 택시를 탔어요.',
    '공항에서 호텔까지',
    {
      uz: 'Aeroportdan mehmonxonagacha taksida bordim.',
      en: 'I took a taxi from the airport to the hotel.',
      ru: 'Я ехал на такси из аэропорта до отеля.',
    },
  ),

  ...blank(
    'gp_s2_u4_g14_04',
    G14,
    '학교에서 도서관까지 십 분 걸려요.',
    '학교에서 도서관까지',
    {
      uz: 'Maktabdan kutubxonagacha o‘n daqiqa ketadi.',
      en: 'It takes ten minutes from school to the library.',
      ru: 'От школы до библиотеки десять минут.',
    },
  ),

  ...blank(
    'gp_s2_u4_g14_05',
    G14,
    '여기에서 지하철역까지 멀어요?',
    '여기에서 지하철역까지',
    {
      uz: 'Bu yerdan metro bekatigacha uzoqmi?',
      en: 'Is it far from here to the subway station?',
      ru: 'Отсюда до станции метро далеко?',
    },
  ),

  ...blank(
    'gp_s2_u4_g14_06',
    G14,
    '회사에서 집까지 버스로 한 시간 걸려요.',
    '회사에서 집까지',
    {
      uz: 'Ishxonadan uygacha avtobusda bir soat ketadi.',
      en: 'It takes an hour by bus from the office to home.',
      ru: 'От работы до дома на автобусе ехать час.',
    },
  ),

  ...blank(
    'gp_s2_u4_g14_07',
    G14,
    '서울역에서 명동까지 지하철로 가세요.',
    '서울역에서 명동까지',
    {
      uz: 'Seul vokzalidan Myondonggacha metroda boring.',
      en: 'Take the subway from Seoul Station to Myeongdong.',
      ru: 'Езжайте на метро от вокзала Сеул до Мёндона.',
    },
  ),

  ...blank(
    'gp_s2_u4_g14_08',
    G14,
    '우리 집에서 회사까지 가까워요.',
    '우리 집에서 회사까지',
    {
      uz: 'Uyimizdan ishxonagacha yaqin.',
      en: 'It is close from my house to the office.',
      ru: 'От моего дома до работы близко.',
    },
  ),

  ...blank(
    'gp_s2_u4_g14_09',
    G14,
    '버스 정류장에서 병원까지 걸어서 갔어요.',
    '버스 정류장에서 병원까지',
    {
      uz: 'Avtobus bekatidan kasalxonagacha piyoda bordim.',
      en: 'I walked from the bus stop to the hospital.',
      ru: 'Я дошёл пешком от автобусной остановки до больницы.',
    },
  ),

  ...blank(
    'gp_s2_u4_g14_10',
    G14,
    '인천에서 서울까지 한 시간쯤 걸려요.',
    '인천에서 서울까지',
    {
      uz: 'Inchondan Seulgacha taxminan bir soat ketadi.',
      en: 'It takes about an hour from Incheon to Seoul.',
      ru: 'От Инчхона до Сеула около часа.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s2_u4_g14_11',
    G14,
    [
      {
        options: ['집에서', '집에', '집까지'],
        correct: '집에서',
      },
      {
        options: ['학교까지', '학교부터', '학교에서'],
        correct: '학교까지',
      },
      {
        options: ['걸어가요.', '의자', '읽었어요.'],
        correct: '걸어가요.',
      },
    ],
    {
      uz: 'Uydan maktabgacha piyoda boraman.',
      en: 'I walk from home to school.',
      ru: 'Я хожу пешком от дома до школы.',
    },
  ),

  ...build(
    'gp_s2_u4_g14_12',
    G14,
    [
      {
        options: ['서울에서', '서울에', '서울까지'],
        correct: '서울에서',
      },
      {
        options: ['부산까지', '부산부터', '부산에서'],
        correct: '부산까지',
      },
      {
        options: ['기차로', '기차에', '기차에서'],
        correct: '기차로',
      },
      {
        options: ['가요.', '먹으세요.', '바빠요.'],
        correct: '가요.',
      },
    ],
    {
      uz: 'Seuldan Pusangacha poyezdda boraman.',
      en: 'I go from Seoul to Busan by train.',
      ru: 'Я еду из Сеула в Пусан на поезде.',
    },
  ),

  ...build(
    'gp_s2_u4_g14_13',
    G14,
    [
      {
        options: ['공항에서', '공항에', '공항까지'],
        correct: '공항에서',
      },
      {
        options: ['호텔까지', '호텔부터', '호텔에서'],
        correct: '호텔까지',
      },
      {
        options: ['택시를', '택시을', '택시는'],
        correct: '택시를',
      },
      {
        options: ['탔어요.', '읽으셨어요.', '질문했어요.'],
        correct: '탔어요.',
      },
    ],
    {
      uz: 'Aeroportdan mehmonxonagacha taksida bordim.',
      en: 'I took a taxi from the airport to the hotel.',
      ru: 'Я ехал на такси из аэропорта до отеля.',
    },
  ),

  ...build(
    'gp_s2_u4_g14_14',
    G14,
    [
      {
        options: ['학교에서', '학교에', '학교까지'],
        correct: '학교에서',
      },
      {
        options: ['도서관까지', '도서관부터', '도서관에서'],
        correct: '도서관까지',
      },
      {
        options: ['십', '세울', '시간쯤'],
        correct: '십',
      },
      {
        options: ['분', '중국', '친구의'],
        correct: '분',
      },
      {
        options: ['걸려요.', '일어나요.', '입으세요.'],
        correct: '걸려요.',
      },
    ],
    {
      uz: 'Maktabdan kutubxonagacha o‘n daqiqa ketadi.',
      en: 'It takes ten minutes from school to the library.',
      ru: 'От школы до библиотеки десять минут.',
    },
  ),

  ...build(
    'gp_s2_u4_g14_15',
    G14,
    [
      {
        options: ['여기에서', '여기에', '여기까지'],
        correct: '여기에서',
      },
      {
        options: ['지하철역까지', '지하철역부터', '지하철역에서'],
        correct: '지하철역까지',
      },
      {
        options: ['멀어요?', '입으세요.', '잘하세요.'],
        correct: '멀어요?',
      },
    ],
    {
      uz: 'Bu yerdan metro bekatigacha uzoqmi?',
      en: 'Is it far from here to the subway station?',
      ru: 'Отсюда до станции метро далеко?',
    },
  ),

  ...build(
    'gp_s2_u4_g14_16',
    G14,
    [
      {
        options: ['회사에서', '회사에', '회사까지'],
        correct: '회사에서',
      },
      {
        options: ['집까지', '집부터', '집에서'],
        correct: '집까지',
      },
      {
        options: ['버스로', '버스에', '버스에서'],
        correct: '버스로',
      },
      {
        options: ['한', '두', '다섯'],
        correct: '한',
      },
      {
        options: ['시간', '빵', '선생님께'],
        correct: '시간',
      },
      {
        options: ['걸려요.', '있습니다.', '잠가요.'],
        correct: '걸려요.',
      },
    ],
    {
      uz: 'Ishxonadan uygacha avtobusda bir soat ketadi.',
      en: 'It takes an hour by bus from the office to home.',
      ru: 'От работы до дома на автобусе ехать час.',
    },
  ),

  ...build(
    'gp_s2_u4_g14_17',
    G14,
    [
      {
        options: ['서울역에서', '서울역에', '서울역까지'],
        correct: '서울역에서',
      },
      {
        options: ['명동까지', '명동부터', '명동에서'],
        correct: '명동까지',
      },
      {
        options: ['지하철로', '지하철에', '지하철에서'],
        correct: '지하철로',
      },
      {
        options: ['가세요.', '하세요.', '많으세요.'],
        correct: '가세요.',
      },
    ],
    {
      uz: 'Seul vokzalidan Myondonggacha metroda boring.',
      en: 'Take the subway from Seoul Station to Myeongdong.',
      ru: 'Езжайте на метро от вокзала Сеул до Мёндона.',
    },
  ),

  ...build(
    'gp_s2_u4_g14_18',
    G14,
    [
      {
        options: ['우리', '줄', '추운'],
        correct: '우리',
      },
      {
        options: ['집에서', '집에', '집까지'],
        correct: '집에서',
      },
      {
        options: ['회사까지', '회사부터', '회사에서'],
        correct: '회사까지',
      },
      {
        options: ['가까워요.', '더워요.', '귀여워요.'],
        correct: '가까워요.',
      },
    ],
    {
      uz: 'Uyimizdan ishxonagacha yaqin.',
      en: 'It is close from my house to the office.',
      ru: 'От моего дома до работы близко.',
    },
  ),

  ...build(
    'gp_s2_u4_g14_19',
    G14,
    [
      {
        options: ['버스', '물과', '병원'],
        correct: '버스',
      },
      {
        options: ['정류장에서', '정류장에', '정류장까지'],
        correct: '정류장에서',
      },
      {
        options: ['병원까지', '병원부터', '병원에서'],
        correct: '병원까지',
      },
      {
        options: ['걸어서', '가서', '살면서'],
        correct: '걸어서',
      },
      {
        options: ['갔어요.', '잤어요.', '했어요.'],
        correct: '갔어요.',
      },
    ],
    {
      uz: 'Avtobus bekatidan kasalxonagacha piyoda bordim.',
      en: 'I walked from the bus stop to the hospital.',
      ru: 'Я дошёл пешком от автобусной остановки до больницы.',
    },
  ),

  ...build(
    'gp_s2_u4_g14_20',
    G14,
    [
      {
        options: ['인천에서', '인천에', '인천까지'],
        correct: '인천에서',
      },
      {
        options: ['서울까지', '서울부터', '서울에서'],
        correct: '서울까지',
      },
      {
        options: ['한', '세', '두'],
        correct: '한',
      },
      {
        options: ['시간쯤', '다음', '매일'],
        correct: '시간쯤',
      },
      {
        options: ['걸려요.', '춥네요.', '하세요.'],
        correct: '걸려요.',
      },
    ],
    {
      uz: 'Inchondan Seulgacha taxminan bir soat ketadi.',
      en: 'It takes about an hour from Incheon to Seoul.',
      ru: 'От Инчхона до Сеула около часа.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 15. V-아/어 주다
// ─────────────────────────────────────────────
const G15 = 'benefactive-a-eo-juda';

const G15_Q = {
  // grammar_blank 10
  ...blank('gp_s2_u4_g15_01', G15, '문을 열어 주세요.', '열어 주세요', {
    uz: 'Iltimos, eshikni ochib bering.',
    en: 'Please open the door for me.',
    ru: 'Откройте, пожалуйста, дверь.',
  }),

  ...blank('gp_s2_u4_g15_02', G15, '사진을 찍어 주세요.', '찍어 주세요', {
    uz: 'Iltimos, suratga olib bering.',
    en: 'Please take a picture for me.',
    ru: 'Сфотографируйте, пожалуйста.',
  }),

  ...blank('gp_s2_u4_g15_03', G15, '길을 알려 주세요.', '알려 주세요', {
    uz: 'Iltimos, yo‘lni tushuntirib bering.',
    en: 'Please tell me the way.',
    ru: 'Подскажите, пожалуйста, дорогу.',
  }),

  ...blank('gp_s2_u4_g15_04', G15, '조금만 기다려 주세요.', '기다려 주세요', {
    uz: 'Iltimos, biroz kutib turing.',
    en: 'Please wait a moment.',
    ru: 'Подождите, пожалуйста, немного.',
  }),

  ...blank('gp_s2_u4_g15_05', G15, '이 문장을 읽어 주세요.', '읽어 주세요', {
    uz: 'Iltimos, bu gapni o‘qib bering.',
    en: 'Please read this sentence for me.',
    ru: 'Прочитайте, пожалуйста, это предложение.',
  }),

  ...blank('gp_s2_u4_g15_06', G15, '한국어로 설명해 주세요.', '설명해 주세요', {
    uz: 'Iltimos, koreys tilida tushuntirib bering.',
    en: 'Please explain it in Korean.',
    ru: 'Объясните, пожалуйста, по-корейски.',
  }),

  ...blank('gp_s2_u4_g15_07', G15, '이 가방을 좀 들어 주세요.', '들어 주세요', {
    uz: 'Iltimos, bu sumkani ko‘tarib bering.',
    en: 'Please carry this bag for me.',
    ru: 'Подержите, пожалуйста, эту сумку.',
  }),

  ...blank('gp_s2_u4_g15_08', G15, '친구가 숙제를 도와줬어요.', '도와줬어요', {
    uz: 'Do‘stim uy vazifamga yordam berdi.',
    en: 'My friend helped me with my homework.',
    ru: 'Друг помог мне с домашним заданием.',
  }),

  ...blank(
    'gp_s2_u4_g15_09',
    G15,
    '아버지가 자전거를 고쳐 주셨어요.',
    '고쳐 주셨어요',
    {
      uz: 'Otam velosipedni tuzatib berdi.',
      en: 'My father fixed my bicycle for me.',
      ru: 'Отец починил мне велосипед.',
    },
  ),

  ...blank(
    'gp_s2_u4_g15_10',
    G15,
    '친구에게 선물을 골라 주세요.',
    '골라 주세요',
    {
      uz: 'Iltimos, do‘stim uchun sovg‘a tanlab bering.',
      en: 'Please choose a gift for my friend.',
      ru: 'Выберите, пожалуйста, подарок для моего друга.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s2_u4_g15_11',
    G15,
    [
      {
        options: ['문을', '문를', '문은'],
        correct: '문을',
      },
      {
        options: ['열어', '싶어', '신어'],
        correct: '열어',
      },
      {
        options: ['주세요.', '닫으세요.', '바쁘세요.'],
        correct: '주세요.',
      },
    ],
    {
      uz: 'Iltimos, eshikni ochib bering.',
      en: 'Please open the door for me.',
      ru: 'Откройте, пожалуйста, дверь.',
    },
  ),

  ...build(
    'gp_s2_u4_g15_12',
    G15,
    [
      {
        options: ['사진을', '사진를', '사진은'],
        correct: '사진을',
      },
      {
        options: ['찍어', '입어', '읽어'],
        correct: '찍어',
      },
      {
        options: ['주세요.', '말하세요.', '오세요.'],
        correct: '주세요.',
      },
    ],
    {
      uz: 'Iltimos, suratga olib bering.',
      en: 'Please take a picture for me.',
      ru: 'Сфотографируйте, пожалуйста.',
    },
  ),

  ...build(
    'gp_s2_u4_g15_13',
    G15,
    [
      {
        options: ['길을', '길를', '길은'],
        correct: '길을',
      },
      {
        options: ['알려', '샤워하고', '수진'],
        correct: '알려',
      },
      {
        options: ['주세요.', '드세요.', '쓰세요.'],
        correct: '주세요.',
      },
    ],
    {
      uz: 'Iltimos, yo‘lni tushuntirib bering.',
      en: 'Please tell me the way.',
      ru: 'Подскажите, пожалуйста, дорогу.',
    },
  ),

  ...build(
    'gp_s2_u4_g15_14',
    G15,
    [
      {
        options: ['조금만', '조금도', '조금까지'],
        correct: '조금만',
      },
      {
        options: ['기다려', '민수하고', '병원'],
        correct: '기다려',
      },
      {
        options: ['주세요.', '기다리세요.', '말하세요.'],
        correct: '주세요.',
      },
    ],
    {
      uz: 'Iltimos, biroz kutib turing.',
      en: 'Please wait a moment.',
      ru: 'Подождите, пожалуйста, немного.',
    },
  ),

  ...build(
    'gp_s2_u4_g15_15',
    G15,
    [
      {
        options: ['이', '그', '저'],
        correct: '이',
      },
      {
        options: ['문장을', '문장를', '문장은'],
        correct: '문장을',
      },
      {
        options: ['읽어', '들어', '한국어'],
        correct: '읽어',
      },
      {
        options: ['주세요.', '여세요.', '친절하세요.'],
        correct: '주세요.',
      },
    ],
    {
      uz: 'Iltimos, bu gapni o‘qib bering.',
      en: 'Please read this sentence for me.',
      ru: 'Прочитайте, пожалуйста, это предложение.',
    },
  ),

  ...build(
    'gp_s2_u4_g15_16',
    G15,
    [
      {
        options: ['한국어로', '한국어에', '한국어에서'],
        correct: '한국어로',
      },
      {
        options: ['설명해', '메뉴', '민수의'],
        correct: '설명해',
      },
      {
        options: ['주세요.', '읽으세요.', '기자세요.'],
        correct: '주세요.',
      },
    ],
    {
      uz: 'Iltimos, koreys tilida tushuntirib bering.',
      en: 'Please explain it in Korean.',
      ru: 'Объясните, пожалуйста, по-корейски.',
    },
  ),

  ...build(
    'gp_s2_u4_g15_17',
    G15,
    [
      {
        options: ['이', '그', '저'],
        correct: '이',
      },
      {
        options: ['가방을', '가방를', '가방은'],
        correct: '가방을',
      },
      {
        options: ['좀', '밤', '부모님께'],
        correct: '좀',
      },
      {
        options: ['들어', '읽어', '영어'],
        correct: '들어',
      },
      {
        options: ['주세요.', '도세요.', '보세요.'],
        correct: '주세요.',
      },
    ],
    {
      uz: 'Iltimos, bu sumkani ko‘tarib bering.',
      en: 'Please carry this bag for me.',
      ru: 'Подержите, пожалуйста, эту сумку.',
    },
  ),

  ...build(
    'gp_s2_u4_g15_18',
    G15,
    [
      {
        options: ['친구가', '친구이', '친구를'],
        correct: '친구가',
      },
      {
        options: ['숙제를', '숙제을', '숙제는'],
        correct: '숙제를',
      },
      {
        options: ['도와줬어요.', '가셨어요.', '들어요.'],
        correct: '도와줬어요.',
      },
    ],
    {
      uz: 'Do‘stim uy vazifamga yordam berdi.',
      en: 'My friend helped me with my homework.',
      ru: 'Друг помог мне с домашним заданием.',
    },
  ),

  ...build(
    'gp_s2_u4_g15_19',
    G15,
    [
      {
        options: ['아버지가', '아버지이', '아버지를'],
        correct: '아버지가',
      },
      {
        options: ['자전거를', '자전거을', '자전거는'],
        correct: '자전거를',
      },
      {
        options: ['고쳐', '계산할', '그릇'],
        correct: '고쳐',
      },
      {
        options: ['주셨어요.', '기다렸어요.', '맛있어요.'],
        correct: '주셨어요.',
      },
    ],
    {
      uz: 'Otam velosipedni tuzatib berdi.',
      en: 'My father fixed my bicycle for me.',
      ru: 'Отец починил мне велосипед.',
    },
  ),

  ...build(
    'gp_s2_u4_g15_20',
    G15,
    [
      {
        options: ['친구에게', '친구한테', '친구에서'],
        correct: '친구에게',
      },
      {
        options: ['선물을', '선물를', '선물은'],
        correct: '선물을',
      },
      {
        options: ['골라', '오후', '음식'],
        correct: '골라',
      },
      {
        options: ['주세요.', '하세요.', '마세요.'],
        correct: '주세요.',
      },
    ],
    {
      uz: 'Iltimos, do‘stim uchun sovg‘a tanlab bering.',
      en: 'Please choose a gift for my friend.',
      ru: 'Выберите, пожалуйста, подарок для моего друга.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 16. N(으)로
// ─────────────────────────────────────────────
const G16 = 'direction-euro';

const G16_Q = {
  // grammar_blank 10
  ...blank('gp_s2_u4_g16_01', G16, '학교에 버스로 가요.', '버스로', {
    uz: 'Maktabga avtobusda boraman.',
    en: 'I go to school by bus.',
    ru: 'Я езжу в школу на автобусе.',
  }),

  ...blank('gp_s2_u4_g16_02', G16, '서울역까지 지하철로 가세요.', '지하철로', {
    uz: 'Seul vokzaligacha metroda boring.',
    en: 'Go to Seoul Station by subway.',
    ru: 'Езжайте до вокзала Сеул на метро.',
  }),

  ...blank('gp_s2_u4_g16_03', G16, '공항에 택시로 갔어요.', '택시로', {
    uz: 'Aeroportga taksida bordim.',
    en: 'I went to the airport by taxi.',
    ru: 'Я поехал в аэропорт на такси.',
  }),

  ...blank('gp_s2_u4_g16_04', G16, '오른쪽으로 가세요.', '오른쪽으로', {
    uz: 'O‘ng tomonga boring.',
    en: 'Go to the right.',
    ru: 'Идите направо.',
  }),

  ...blank('gp_s2_u4_g16_05', G16, '이 길로 쭉 가세요.', '이 길로', {
    uz: 'Shu yo‘l bo‘ylab to‘g‘ri boring.',
    en: 'Go straight along this road.',
    ru: 'Идите прямо по этой дороге.',
  }),

  ...blank('gp_s2_u4_g16_06', G16, '왼쪽으로 도세요.', '왼쪽으로', {
    uz: 'Chap tomonga buriling.',
    en: 'Turn left.',
    ru: 'Поверните налево.',
  }),

  ...blank('gp_s2_u4_g16_07', G16, '한국에 비행기로 왔어요.', '비행기로', {
    uz: 'Koreyaga samolyotda keldim.',
    en: 'I came to Korea by plane.',
    ru: 'Я приехал в Корею на самолёте.',
  }),

  ...blank('gp_s2_u4_g16_08', G16, '회사에는 자전거로 다녀요.', '자전거로', {
    uz: 'Ishxonaga velosipedda qatnayman.',
    en: 'I commute to work by bicycle.',
    ru: 'Я езжу на работу на велосипеде.',
  }),

  ...blank('gp_s2_u4_g16_09', G16, '여기에서 앞으로 가세요.', '앞으로', {
    uz: 'Bu yerdan oldinga boring.',
    en: 'Go forward from here.',
    ru: 'Отсюда идите вперёд.',
  }),

  ...blank(
    'gp_s2_u4_g16_10',
    G16,
    '서울에서 부산까지 기차로 갔어요.',
    '기차로',
    {
      uz: 'Seuldan Pusangacha poyezdda bordim.',
      en: 'I went from Seoul to Busan by train.',
      ru: 'Я поехал из Сеула в Пусан на поезде.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s2_u4_g16_11',
    G16,
    [
      {
        options: ['학교에', '학교에서', '학교까지'],
        correct: '학교에',
      },
      {
        options: ['버스로', '버스에', '버스에서'],
        correct: '버스로',
      },
      {
        options: ['가요.', '드세요.', '만나요.'],
        correct: '가요.',
      },
    ],
    {
      uz: 'Maktabga avtobusda boraman.',
      en: 'I go to school by bus.',
      ru: 'Я езжу в школу на автобусе.',
    },
  ),

  ...build(
    'gp_s2_u4_g16_12',
    G16,
    [
      {
        options: ['서울역까지', '서울역부터', '서울역에서'],
        correct: '서울역까지',
      },
      {
        options: ['지하철로', '지하철에', '지하철에서'],
        correct: '지하철로',
      },
      {
        options: ['가세요.', '친절하세요.', '마세요.'],
        correct: '가세요.',
      },
    ],
    {
      uz: 'Seul vokzaligacha metroda boring.',
      en: 'Go to Seoul Station by subway.',
      ru: 'Езжайте до вокзала Сеул на метро.',
    },
  ),

  ...build(
    'gp_s2_u4_g16_13',
    G16,
    [
      {
        options: ['공항에', '공항에서', '공항까지'],
        correct: '공항에',
      },
      {
        options: ['택시로', '택시에', '택시에서'],
        correct: '택시로',
      },
      {
        options: ['갔어요.', '했어요.', '들어갔어요.'],
        correct: '갔어요.',
      },
    ],
    {
      uz: 'Aeroportga taksida bordim.',
      en: 'I went to the airport by taxi.',
      ru: 'Я поехал в аэропорт на такси.',
    },
  ),

  ...build(
    'gp_s2_u4_g16_14',
    G16,
    [
      {
        options: ['오른쪽으로', '오른쪽에', '오른쪽에서'],
        correct: '오른쪽으로',
      },
      {
        options: ['가세요.', '오세요.', '친절하세요.'],
        correct: '가세요.',
      },
    ],
    {
      uz: 'O‘ng tomonga boring.',
      en: 'Go to the right.',
      ru: 'Идите направо.',
    },
  ),

  ...build(
    'gp_s2_u4_g16_15',
    G16,
    [
      {
        options: ['이', '그', '저'],
        correct: '이',
      },
      {
        options: ['길로', '길에', '길에서'],
        correct: '길로',
      },
      {
        options: ['쭉', '민수의', '봉투'],
        correct: '쭉',
      },
      {
        options: ['가세요.', '보세요.', '입으세요.'],
        correct: '가세요.',
      },
    ],
    {
      uz: 'Shu yo‘l bo‘ylab to‘g‘ri boring.',
      en: 'Go straight along this road.',
      ru: 'Идите прямо по этой дороге.',
    },
  ),

  ...build(
    'gp_s2_u4_g16_16',
    G16,
    [
      {
        options: ['왼쪽으로', '왼쪽에', '왼쪽에서'],
        correct: '왼쪽으로',
      },
      {
        options: ['도세요.', '앉으세요.', '전화하세요.'],
        correct: '도세요.',
      },
    ],
    {
      uz: 'Chap tomonga buriling.',
      en: 'Turn left.',
      ru: 'Поверните налево.',
    },
  ),

  ...build(
    'gp_s2_u4_g16_17',
    G16,
    [
      {
        options: ['한국에', '한국에서', '한국까지'],
        correct: '한국에',
      },
      {
        options: ['비행기로', '비행기에', '비행기에서'],
        correct: '비행기로',
      },
      {
        options: ['왔어요.', '맛있어요.', '불어요.'],
        correct: '왔어요.',
      },
    ],
    {
      uz: 'Koreyaga samolyotda keldim.',
      en: 'I came to Korea by plane.',
      ru: 'Я приехал в Корею на самолёте.',
    },
  ),

  ...build(
    'gp_s2_u4_g16_18',
    G16,
    [
      {
        options: ['회사에는', '회사에도', '회사에만'],
        correct: '회사에는',
      },
      {
        options: ['자전거로', '자전거에', '자전거에서'],
        correct: '자전거로',
      },
      {
        options: ['다녀요.', '공부해요.', '낼게요.'],
        correct: '다녀요.',
      },
    ],
    {
      uz: 'Ishxonaga velosipedda qatnayman.',
      en: 'I commute to work by bicycle.',
      ru: 'Я езжу на работу на велосипеде.',
    },
  ),

  ...build(
    'gp_s2_u4_g16_19',
    G16,
    [
      {
        options: ['여기에서', '여기에', '여기까지'],
        correct: '여기에서',
      },
      {
        options: ['앞으로', '앞에', '앞에서'],
        correct: '앞으로',
      },
      {
        options: ['가세요.', '마세요.', '앉으세요.'],
        correct: '가세요.',
      },
    ],
    {
      uz: 'Bu yerdan oldinga boring.',
      en: 'Go forward from here.',
      ru: 'Отсюда идите вперёд.',
    },
  ),

  ...build(
    'gp_s2_u4_g16_20',
    G16,
    [
      {
        options: ['서울에서', '서울에', '서울까지'],
        correct: '서울에서',
      },
      {
        options: ['부산까지', '부산부터', '부산에서'],
        correct: '부산까지',
      },
      {
        options: ['기차로', '기차에', '기차에서'],
        correct: '기차로',
      },
      {
        options: ['갔어요.', '기다렸어요.', '맛있어요.'],
        correct: '갔어요.',
      },
    ],
    {
      uz: 'Seuldan Pusangacha poyezdda bordim.',
      en: 'I went from Seoul to Busan by train.',
      ru: 'Я поехал из Сеула в Пусан на поезде.',
    },
  ),
};

// ═══════════════════════════════════════════════════════════
// UNIT 5
// 외모 · 옷 · 선물 · 권유
// ═══════════════════════════════════════════════════════════

// ─────────────────────────────────────────────
// 문법 17. 'ㄹ' 탈락
// ─────────────────────────────────────────────
const G17 = 'rieul-deletion';

const G17_Q = {
  // grammar_blank 10
  ...blank('gp_s2_u5_g17_01', G17, '저는 긴 치마를 좋아해요.', '긴', {
    uz: 'Men uzun yubkalarni yoqtiraman.',
    en: 'I like long skirts.',
    ru: 'Мне нравятся длинные юбки.',
  }),

  ...blank('gp_s2_u5_g17_02', G17, '머리가 긴 사람이 제 언니예요.', '긴', {
    uz: 'Sochi uzun odam mening opam.',
    en: 'The person with long hair is my older sister.',
    ru: 'Девушка с длинными волосами — моя старшая сестра.',
  }),

  ...blank('gp_s2_u5_g17_03', G17, '학교가 집에서 먼 편이에요.', '먼', {
    uz: 'Maktab uyimdan ancha uzoq.',
    en: 'The school is rather far from my house.',
    ru: 'Школа довольно далеко от моего дома.',
  }),

  ...blank('gp_s2_u5_g17_04', G17, '저는 서울에 삽니다.', '삽니다', {
    uz: 'Men Seulda yashayman.',
    en: 'I live in Seoul.',
    ru: 'Я живу в Сеуле.',
  }),

  ...blank('gp_s2_u5_g17_05', G17, '저는 그 가게를 잘 압니다.', '압니다', {
    uz: 'Men u do‘konni yaxshi bilaman.',
    en: 'I know that store well.',
    ru: 'Я хорошо знаю этот магазин.',
  }),

  ...blank('gp_s2_u5_g17_06', G17, '여기에서는 옷을 팝니다.', '팝니다', {
    uz: 'Bu yerda kiyim sotiladi.',
    en: 'They sell clothes here.',
    ru: 'Здесь продают одежду.',
  }),

  ...blank('gp_s2_u5_g17_07', G17, '문을 여세요.', '여세요', {
    uz: 'Eshikni oching.',
    en: 'Please open the door.',
    ru: 'Откройте дверь.',
  }),

  ...blank('gp_s2_u5_g17_08', G17, '이 가방을 직접 만드세요?', '만드세요', {
    uz: 'Bu sumkani o‘zingiz yasaysizmi?',
    en: 'Do you make this bag yourself?',
    ru: 'Вы сами делаете эту сумку?',
  }),

  ...blank('gp_s2_u5_g17_09', G17, '이 옷은 어디에서 파세요?', '파세요', {
    uz: 'Bu kiyimni qayerda sotasiz?',
    en: 'Where do you sell these clothes?',
    ru: 'Где вы продаёте эту одежду?',
  }),

  ...blank('gp_s2_u5_g17_10', G17, '그분을 잘 아세요?', '아세요', {
    uz: 'U kishini yaxshi bilasizmi?',
    en: 'Do you know that person well?',
    ru: 'Вы хорошо знаете этого человека?',
  }),

  // grammar_build 10
  ...build(
    'gp_s2_u5_g17_11',
    G17,
    [
      {
        options: ['저는', '저은', '저를'],
        correct: '저는',
      },
      {
        options: ['긴', '선생님께', '쉴'],
        correct: '긴',
      },
      {
        options: ['치마를', '치마을', '치마는'],
        correct: '치마를',
      },
      {
        options: ['좋아해요.', '조용해요.', '운동해요.'],
        correct: '좋아해요.',
      },
    ],
    {
      uz: 'Men uzun yubkalarni yoqtiraman.',
      en: 'I like long skirts.',
      ru: 'Мне нравятся длинные юбки.',
    },
  ),

  ...build(
    'gp_s2_u5_g17_12',
    G17,
    [
      {
        options: ['머리가', '머리이', '머리를'],
        correct: '머리가',
      },
      {
        options: ['긴', '마셔야', '메뉴'],
        correct: '긴',
      },
      {
        options: ['사람이', '사람가', '사람을'],
        correct: '사람이',
      },
      {
        options: ['제', '저', '내'],
        correct: '제',
      },
      {
        options: ['언니', '물어보세요.', '보세요.'],
        correct: '언니',
      },
      {
        options: ['예요.', '이에요.', '입니다.'],
        correct: '예요.',
        glue: true,
      },
    ],
    {
      uz: 'Sochi uzun odam mening opam.',
      en: 'The person with long hair is my older sister.',
      ru: 'Девушка с длинными волосами — моя старшая сестра.',
    },
  ),

  ...build(
    'gp_s2_u5_g17_13',
    G17,
    [
      {
        options: ['학교가', '학교이', '학교를'],
        correct: '학교가',
      },
      {
        options: ['집에서', '집에', '집까지'],
        correct: '집에서',
      },
      {
        options: ['먼', '고쳐', '그릇'],
        correct: '먼',
      },
      {
        options: ['편', '편이', '편을'],
        correct: '편',
      },
      {
        options: ['이에요.', '예요.', '입니다.'],
        correct: '이에요.',
        glue: true,
      },
    ],
    {
      uz: 'Maktab uyimdan ancha uzoq.',
      en: 'The school is rather far from my house.',
      ru: 'Школа довольно далеко от моего дома.',
    },
  ),

  ...build(
    'gp_s2_u5_g17_14',
    G17,
    [
      {
        options: ['저는', '저은', '저를'],
        correct: '저는',
      },
      {
        options: ['서울에', '서울에서', '서울까지'],
        correct: '서울에',
      },
      {
        options: ['삽니다.', '공부합니다.', '맛있습니다.'],
        correct: '삽니다.',
      },
    ],
    {
      uz: 'Men Seulda yashayman.',
      en: 'I live in Seoul.',
      ru: 'Я живу в Сеуле.',
    },
  ),

  ...build(
    'gp_s2_u5_g17_15',
    G17,
    [
      {
        options: ['저는', '저은', '저를'],
        correct: '저는',
      },
      {
        options: ['그', '이', '저'],
        correct: '그',
      },
      {
        options: ['가게를', '가게을', '가게는'],
        correct: '가게를',
      },
      {
        options: ['잘', '학교', '가'],
        correct: '잘',
      },
      {
        options: ['압니다.', '팝니다.', '갑니다.'],
        correct: '압니다.',
      },
    ],
    {
      uz: 'Men u do‘konni yaxshi bilaman.',
      en: 'I know that store well.',
      ru: 'Я хорошо знаю этот магазин.',
    },
  ),

  ...build(
    'gp_s2_u5_g17_16',
    G17,
    [
      {
        options: ['여기에서는', '여기에서도', '여기에서만'],
        correct: '여기에서는',
      },
      {
        options: ['옷을', '옷를', '옷은'],
        correct: '옷을',
      },
      {
        options: ['팝니다.', '압니다.', '있습니다.'],
        correct: '팝니다.',
      },
    ],
    {
      uz: 'Bu yerda kiyim sotiladi.',
      en: 'They sell clothes here.',
      ru: 'Здесь продают одежду.',
    },
  ),

  ...build(
    'gp_s2_u5_g17_17',
    G17,
    [
      {
        options: ['문을', '문를', '문은'],
        correct: '문을',
      },
      {
        options: ['여세요.', '잘하세요.', '다니세요.'],
        correct: '여세요.',
      },
    ],
    {
      uz: 'Eshikni oching.',
      en: 'Please open the door.',
      ru: 'Откройте дверь.',
    },
  ),

  ...build(
    'gp_s2_u5_g17_18',
    G17,
    [
      {
        options: ['이', '그', '저'],
        correct: '이',
      },
      {
        options: ['가방을', '가방를', '가방은'],
        correct: '가방을',
      },
      {
        options: ['직접', '오늘', '우리'],
        correct: '직접',
      },
      {
        options: ['만드세요?', '아세요?', '누구세요?'],
        correct: '만드세요?',
      },
    ],
    {
      uz: 'Bu sumkani o‘zingiz yasaysizmi?',
      en: 'Do you make this bag yourself?',
      ru: 'Вы сами делаете эту сумку?',
    },
  ),

  ...build(
    'gp_s2_u5_g17_19',
    G17,
    [
      {
        options: ['이', '그', '저'],
        correct: '이',
      },
      {
        options: ['옷은', '옷는', '옷을'],
        correct: '옷은',
      },
      {
        options: ['어디에서', '어디에', '어디까지'],
        correct: '어디에서',
      },
      {
        options: ['파세요?', '만드세요?', '누구세요?'],
        correct: '파세요?',
      },
    ],
    {
      uz: 'Bu kiyimni qayerda sotasiz?',
      en: 'Where do you sell these clothes?',
      ru: 'Где вы продаёте эту одежду?',
    },
  ),

  ...build(
    'gp_s2_u5_g17_20',
    G17,
    [
      {
        options: ['그분을', '그분를', '그분은'],
        correct: '그분을',
      },
      {
        options: ['잘', '청소할', '푹'],
        correct: '잘',
      },
      {
        options: ['아세요?', '파세요?', '만드세요?'],
        correct: '아세요?',
      },
    ],
    {
      uz: 'U kishini yaxshi bilasizmi?',
      en: 'Do you know that person well?',
      ru: 'Вы хорошо знаете этого человека?',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 18. A-(으)ㄴ N
// ─────────────────────────────────────────────
const G18 = 'adjective-attributive-eun-neun';

const G18_Q = {
  // grammar_blank 10
  ...blank('gp_s2_u5_g18_01', G18, '저는 예쁜 옷을 좋아해요.', '예쁜 옷', {
    uz: 'Men chiroyli kiyimlarni yoqtiraman.',
    en: 'I like pretty clothes.',
    ru: 'Мне нравится красивая одежда.',
  }),

  ...blank('gp_s2_u5_g18_02', G18, '작은 가방도 보여 주세요.', '작은 가방', {
    uz: 'Kichik sumkani ham ko‘rsating.',
    en: 'Please show me a small bag too.',
    ru: 'Покажите, пожалуйста, ещё маленькую сумку.',
  }),

  ...blank('gp_s2_u5_g18_03', G18, '머리가 긴 사람이 제 친구예요.', '긴 사람', {
    uz: 'Sochi uzun odam mening do‘stim.',
    en: 'The person with long hair is my friend.',
    ru: 'Человек с длинными волосами — мой друг.',
  }),

  ...blank(
    'gp_s2_u5_g18_04',
    G18,
    '오늘은 빨간 셔츠를 입었어요.',
    '빨간 셔츠',
    {
      uz: 'Bugun qizil ko‘ylak kiydim.',
      en: 'I wore a red shirt today.',
      ru: 'Сегодня я надел красную рубашку.',
    },
  ),

  ...blank(
    'gp_s2_u5_g18_05',
    G18,
    '추운 날에는 따뜻한 옷을 입으세요.',
    '추운 날',
    {
      uz: 'Sovuq kunda issiq kiyim kiying.',
      en: 'Wear warm clothes on cold days.',
      ru: 'В холодные дни надевайте тёплую одежду.',
    },
  ),

  ...blank('gp_s2_u5_g18_06', G18, '여름에는 더운 날이 많아요.', '더운 날', {
    uz: 'Yozda issiq kunlar ko‘p.',
    en: 'There are many hot days in summer.',
    ru: 'Летом много жарких дней.',
  }),

  ...blank('gp_s2_u5_g18_07', G18, '편한 신발을 신고 싶어요.', '편한 신발', {
    uz: 'Qulay oyoq kiyim kiymoqchiman.',
    en: 'I want to wear comfortable shoes.',
    ru: 'Я хочу надеть удобную обувь.',
  }),

  ...blank(
    'gp_s2_u5_g18_08',
    G18,
    '저기 키가 큰 사람이 우리 형이에요.',
    '큰 사람',
    {
      uz: 'Ana u bo‘yi baland odam mening akam.',
      en: 'That tall person over there is my older brother.',
      ru: 'Тот высокий человек — мой старший брат.',
    },
  ),

  ...blank('gp_s2_u5_g18_09', G18, '깨끗한 셔츠를 입으세요.', '깨끗한 셔츠', {
    uz: 'Toza ko‘ylak kiying.',
    en: 'Please wear a clean shirt.',
    ru: 'Наденьте чистую рубашку.',
  }),

  ...blank(
    'gp_s2_u5_g18_10',
    G18,
    '생일 선물로 좋은 가방을 샀어요.',
    '좋은 가방',
    {
      uz: 'Tug‘ilgan kun sovg‘asi uchun yaxshi sumka sotib oldim.',
      en: 'I bought a nice bag as a birthday present.',
      ru: 'Я купил хорошую сумку в подарок на день рождения.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s2_u5_g18_11',
    G18,
    [
      {
        options: ['저는', '저은', '저를'],
        correct: '저는',
      },
      {
        options: ['예쁜', '수진', '씨'],
        correct: '예쁜',
      },
      {
        options: ['옷을', '옷를', '옷은'],
        correct: '옷을',
      },
      {
        options: ['좋아해요.', '도착해요.', '출발해요.'],
        correct: '좋아해요.',
      },
    ],
    {
      uz: 'Men chiroyli kiyimlarni yoqtiraman.',
      en: 'I like pretty clothes.',
      ru: 'Мне нравится красивая одежда.',
    },
  ),

  ...build(
    'gp_s2_u5_g18_12',
    G18,
    [
      {
        options: ['작은', '만드는', '있을'],
        correct: '작은',
      },
      {
        options: ['가방도', '가방만', '가방까지'],
        correct: '가방도',
      },
      {
        options: ['보여', '중국', '차'],
        correct: '보여',
      },
      {
        options: ['주세요.', '가세요.', '많으세요.'],
        correct: '주세요.',
      },
    ],
    {
      uz: 'Kichik sumkani ham ko‘rsating.',
      en: 'Please show me a small bag too.',
      ru: 'Покажите, пожалуйста, ещё маленькую сумку.',
    },
  ),

  ...build(
    'gp_s2_u5_g18_13',
    G18,
    [
      {
        options: ['머리가', '머리이', '머리를'],
        correct: '머리가',
      },
      {
        options: ['긴', '벌써', '빨간'],
        correct: '긴',
      },
      {
        options: ['사람이', '사람가', '사람을'],
        correct: '사람이',
      },
      {
        options: ['제', '저', '내'],
        correct: '제',
      },
      {
        options: ['친구', '친구가', '친구를'],
        correct: '친구',
      },
      {
        options: ['예요.', '이에요.', '입니다.'],
        correct: '예요.',
        glue: true,
      },
    ],
    {
      uz: 'Sochi uzun odam mening do‘stim.',
      en: 'The person with long hair is my friend.',
      ru: 'Человек с длинными волосами — мой друг.',
    },
  ),

  ...build(
    'gp_s2_u5_g18_14',
    G18,
    [
      {
        options: ['오늘은', '오늘는', '오늘을'],
        correct: '오늘은',
      },
      {
        options: ['빨간', '교실', '깨끗한'],
        correct: '빨간',
      },
      {
        options: ['셔츠를', '셔츠을', '셔츠는'],
        correct: '셔츠를',
      },
      {
        options: ['입었어요.', '물어요.', '쉬어요.'],
        correct: '입었어요.',
      },
    ],
    {
      uz: 'Bugun qizil ko‘ylak kiydim.',
      en: 'I wore a red shirt today.',
      ru: 'Сегодня я надел красную рубашку.',
    },
  ),

  ...build(
    'gp_s2_u5_g18_15',
    G18,
    [
      {
        options: ['추운', '번', '비빔밥'],
        correct: '추운',
      },
      {
        options: ['날에는', '날에도', '날에만'],
        correct: '날에는',
      },
      {
        options: ['따뜻한', '줄', '추운'],
        correct: '따뜻한',
      },
      {
        options: ['옷을', '옷를', '옷은'],
        correct: '옷을',
      },
      {
        options: ['입으세요.', '보세요.', '잘하세요.'],
        correct: '입으세요.',
      },
    ],
    {
      uz: 'Sovuq kunda issiq kiyim kiying.',
      en: 'Wear warm clothes on cold days.',
      ru: 'В холодные дни надевайте тёплую одежду.',
    },
  ),

  ...build(
    'gp_s2_u5_g18_16',
    G18,
    [
      {
        options: ['여름에는', '여름에도', '여름에만'],
        correct: '여름에는',
      },
      {
        options: ['더운', '다른', '말할'],
        correct: '더운',
      },
      {
        options: ['날이', '날가', '날을'],
        correct: '날이',
      },
      {
        options: ['많아요.', '살아요.', '좋아요.'],
        correct: '많아요.',
      },
    ],
    {
      uz: 'Yozda issiq kunlar ko‘p.',
      en: 'There are many hot days in summer.',
      ru: 'Летом много жарких дней.',
    },
  ),

  ...build(
    'gp_s2_u5_g18_17',
    G18,
    [
      {
        options: ['편한', '예쁜', '요즘'],
        correct: '편한',
      },
      {
        options: ['신발을', '신발를', '신발은'],
        correct: '신발을',
      },
      {
        options: ['신고', '민수하고', '샤워하고'],
        correct: '신고',
      },
      {
        options: ['싶어요.', '쉬어요.', '일어났어요.'],
        correct: '싶어요.',
      },
    ],
    {
      uz: 'Qulay oyoq kiyim kiymoqchiman.',
      en: 'I want to wear comfortable shoes.',
      ru: 'Я хочу надеть удобную обувь.',
    },
  ),

  ...build(
    'gp_s2_u5_g18_18',
    G18,
    [
      {
        options: ['저기', '너무', '마셔야'],
        correct: '저기',
      },
      {
        options: ['키가', '키이', '키를'],
        correct: '키가',
      },
      {
        options: ['큰', '콜라', '한번'],
        correct: '큰',
      },
      {
        options: ['사람이', '사람가', '사람을'],
        correct: '사람이',
      },
      {
        options: ['우리', '번', '비빔밥'],
        correct: '우리',
      },
      {
        options: ['형', '형이', '형을'],
        correct: '형',
      },
      {
        options: ['이에요.', '예요.', '입니다.'],
        correct: '이에요.',
        glue: true,
      },
    ],
    {
      uz: 'Ana u bo‘yi baland odam mening akam.',
      en: 'That tall person over there is my older brother.',
      ru: 'Тот высокий человек — мой старший брат.',
    },
  ),

  ...build(
    'gp_s2_u5_g18_19',
    G18,
    [
      {
        options: ['깨끗한', '무슨', '버스'],
        correct: '깨끗한',
      },
      {
        options: ['셔츠를', '셔츠을', '셔츠는'],
        correct: '셔츠를',
      },
      {
        options: ['입으세요.', '친절하세요.', '드세요.'],
        correct: '입으세요.',
      },
    ],
    {
      uz: 'Toza ko‘ylak kiying.',
      en: 'Please wear a clean shirt.',
      ru: 'Наденьте чистую рубашку.',
    },
  ),

  ...build(
    'gp_s2_u5_g18_20',
    G18,
    [
      {
        options: ['생일', '저녁', '직접'],
        correct: '생일',
      },
      {
        options: ['선물로', '선물에', '선물에서'],
        correct: '선물로',
      },
      {
        options: ['좋은', '기다리는', '읽을'],
        correct: '좋은',
      },
      {
        options: ['가방을', '가방를', '가방은'],
        correct: '가방을',
      },
      {
        options: ['샀어요.', '있어요.', '탔어요.'],
        correct: '샀어요.',
      },
    ],
    {
      uz: 'Tug‘ilgan kun sovg‘asi uchun yaxshi sumka sotib oldim.',
      en: 'I bought a nice bag as a birthday present.',
      ru: 'Я купил хорошую сумку в подарок на день рождения.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 19. N한테[께]
// ─────────────────────────────────────────────
const G19 = 'recipient-hante-kke';

const G19_Q = {
  // grammar_blank 10
  ...blank('gp_s2_u5_g19_01', G19, '친구한테 생일 선물을 줬어요.', '친구한테', {
    uz: 'Do‘stimga tug‘ilgan kun sovg‘asi berdim.',
    en: 'I gave my friend a birthday present.',
    ru: 'Я подарил другу подарок на день рождения.',
  }),

  ...blank('gp_s2_u5_g19_02', G19, '동생한테 옷을 사 줬어요.', '동생한테', {
    uz: 'Ukamga yoki singlimga kiyim olib berdim.',
    en: 'I bought clothes for my younger sibling.',
    ru: 'Я купил одежду младшему брату или сестре.',
  }),

  ...blank('gp_s2_u5_g19_03', G19, '친구한테 전화했어요.', '친구한테', {
    uz: 'Do‘stimga qo‘ng‘iroq qildim.',
    en: 'I called my friend.',
    ru: 'Я позвонил другу.',
  }),

  ...blank(
    'gp_s2_u5_g19_04',
    G19,
    '수진 씨한테 메시지를 보냈어요.',
    '수진 씨한테',
    {
      uz: 'Sujinga xabar yubordim.',
      en: 'I sent Sujin a message.',
      ru: 'Я отправил Суджин сообщение.',
    },
  ),

  ...blank('gp_s2_u5_g19_05', G19, '선생님께 질문했어요.', '선생님께', {
    uz: 'O‘qituvchiga savol berdim.',
    en: 'I asked the teacher a question.',
    ru: 'Я задал вопрос учителю.',
  }),

  ...blank('gp_s2_u5_g19_06', G19, '부모님께 선물을 드렸어요.', '부모님께', {
    uz: 'Ota-onamga sovg‘a berdim.',
    en: 'I gave my parents a gift.',
    ru: 'Я подарил подарок родителям.',
  }),

  ...blank('gp_s2_u5_g19_07', G19, '할머니께 전화를 했어요.', '할머니께', {
    uz: 'Buvimga qo‘ng‘iroq qildim.',
    en: 'I called my grandmother.',
    ru: 'Я позвонил бабушке.',
  }),

  ...blank(
    'gp_s2_u5_g19_08',
    G19,
    '누구한테 이 가방을 줄 거예요?',
    '누구한테',
    {
      uz: 'Bu sumkani kimga berasiz?',
      en: 'Who are you going to give this bag to?',
      ru: 'Кому вы подарите эту сумку?',
    },
  ),

  ...blank(
    'gp_s2_u5_g19_09',
    G19,
    '친구한테 어떤 옷이 좋은지 물어봤어요.',
    '친구한테',
    {
      uz: 'Do‘stimdan qaysi kiyim yaxshi ekanini so‘radim.',
      en: 'I asked my friend which clothes were good.',
      ru: 'Я спросил друга, какая одежда лучше.',
    },
  ),

  ...blank(
    'gp_s2_u5_g19_10',
    G19,
    '선생님께 감사의 편지를 썼어요.',
    '선생님께',
    {
      uz: 'O‘qituvchimga minnatdorchilik xati yozdim.',
      en: 'I wrote a thank-you letter to my teacher.',
      ru: 'Я написал учителю благодарственное письмо.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s2_u5_g19_11',
    G19,
    [
      {
        options: ['친구한테', '친구에게', '친구에서'],
        correct: '친구한테',
      },
      {
        options: ['생일', '사용해', '수'],
        correct: '생일',
      },
      {
        options: ['선물을', '선물를', '선물은'],
        correct: '선물을',
      },
      {
        options: ['줬어요.', '샀어요.', '왔어요.'],
        correct: '줬어요.',
      },
    ],
    {
      uz: 'Do‘stimga tug‘ilgan kun sovg‘asi berdim.',
      en: 'I gave my friend a birthday present.',
      ru: 'Я подарил другу подарок на день рождения.',
    },
  ),

  ...build(
    'gp_s2_u5_g19_12',
    G19,
    [
      {
        options: ['동생한테', '동생에게', '동생에서'],
        correct: '동생한테',
      },
      {
        options: ['옷을', '옷를', '옷은'],
        correct: '옷을',
      },
      {
        options: ['사', '긴', '다른'],
        correct: '사',
      },
      {
        options: ['줬어요.', '했어요.', '드렸어요.'],
        correct: '줬어요.',
      },
    ],
    {
      uz: 'Ukamga yoki singlimga kiyim olib berdim.',
      en: 'I bought clothes for my younger sibling.',
      ru: 'Я купил одежду младшему брату или сестре.',
    },
  ),

  ...build(
    'gp_s2_u5_g19_13',
    G19,
    [
      {
        options: ['친구한테', '친구에게', '친구에서'],
        correct: '친구한테',
      },
      {
        options: ['전화했어요.', '했어요.', '드렸어요.'],
        correct: '전화했어요.',
      },
    ],
    {
      uz: 'Do‘stimga qo‘ng‘iroq qildim.',
      en: 'I called my friend.',
      ru: 'Я позвонил другу.',
    },
  ),

  ...build(
    'gp_s2_u5_g19_14',
    G19,
    [
      {
        options: ['수진', '항상', '같이'],
        correct: '수진',
      },
      {
        options: ['씨한테', '씨에게', '씨에서'],
        correct: '씨한테',
      },
      {
        options: ['메시지를', '메시지을', '메시지는'],
        correct: '메시지를',
      },
      {
        options: ['보냈어요.', '갔어요.', '들어요.'],
        correct: '보냈어요.',
      },
    ],
    {
      uz: 'Sujinga xabar yubordim.',
      en: 'I sent Sujin a message.',
      ru: 'Я отправил Суджин сообщение.',
    },
  ),

  ...build(
    'gp_s2_u5_g19_15',
    G19,
    [
      {
        options: ['선생님께', '무슨', '버스'],
        correct: '선생님께',
      },
      {
        options: ['질문했어요.', '샤워했어요.', '요리했어요.'],
        correct: '질문했어요.',
      },
    ],
    {
      uz: 'O‘qituvchiga savol berdim.',
      en: 'I asked the teacher a question.',
      ru: 'Я задал вопрос учителю.',
    },
  ),

  ...build(
    'gp_s2_u5_g19_16',
    G19,
    [
      {
        options: ['부모님께', '민수의', '봉투'],
        correct: '부모님께',
      },
      {
        options: ['선물을', '선물를', '선물은'],
        correct: '선물을',
      },
      {
        options: ['드렸어요.', '재미있어요.', '가셨어요.'],
        correct: '드렸어요.',
      },
    ],
    {
      uz: 'Ota-onamga sovg‘a berdim.',
      en: 'I gave my parents a gift.',
      ru: 'Я подарил подарок родителям.',
    },
  ),

  ...build(
    'gp_s2_u5_g19_17',
    G19,
    [
      {
        options: ['할머니께', '추운', '하나'],
        correct: '할머니께',
      },
      {
        options: ['전화를', '전화을', '전화는'],
        correct: '전화를',
      },
      {
        options: ['했어요.', '기다렸어요.', '맛있어요.'],
        correct: '했어요.',
      },
    ],
    {
      uz: 'Buvimga qo‘ng‘iroq qildim.',
      en: 'I called my grandmother.',
      ru: 'Я позвонил бабушке.',
    },
  ),

  ...build(
    'gp_s2_u5_g19_18',
    G19,
    [
      {
        options: ['누구한테', '누구에게', '누구에서'],
        correct: '누구한테',
      },
      {
        options: ['이', '그', '저'],
        correct: '이',
      },
      {
        options: ['가방을', '가방를', '가방은'],
        correct: '가방을',
      },
      {
        options: ['줄', '같이', '교실'],
        correct: '줄',
      },
      {
        options: ['거', '거가', '거를'],
        correct: '거',
      },
      {
        options: ['예요?', '이에요?', '입니다?'],
        correct: '예요?',
        glue: true,
      },
    ],
    {
      uz: 'Bu sumkani kimga berasiz?',
      en: 'Who are you going to give this bag to?',
      ru: 'Кому вы подарите эту сумку?',
    },
  ),

  ...build(
    'gp_s2_u5_g19_19',
    G19,
    [
      {
        options: ['친구한테', '친구에게', '친구에서'],
        correct: '친구한테',
      },
      {
        options: ['어떤', '올', '이건'],
        correct: '어떤',
      },
      {
        options: ['옷이', '옷가', '옷을'],
        correct: '옷이',
      },
      {
        options: ['좋은지', '싶지', '마시지'],
        correct: '좋은지',
      },
      {
        options: ['물어봤어요.', '쉬었어요.', '일어났어요.'],
        correct: '물어봤어요.',
      },
    ],
    {
      uz: 'Do‘stimdan qaysi kiyim yaxshi ekanini so‘radim.',
      en: 'I asked my friend which clothes were good.',
      ru: 'Я спросил друга, какая одежда лучше.',
    },
  ),

  ...build(
    'gp_s2_u5_g19_20',
    G19,
    [
      {
        options: ['선생님께', '더운', '먼'],
        correct: '선생님께',
      },
      {
        options: ['감사의', '안', '오래'],
        correct: '감사의',
      },
      {
        options: ['편지를', '편지을', '편지는'],
        correct: '편지를',
      },
      {
        options: ['썼어요.', '걸렸어요.', '마셨어요.'],
        correct: '썼어요.',
      },
    ],
    {
      uz: 'O‘qituvchimga minnatdorchilik xati yozdim.',
      en: 'I wrote a thank-you letter to my teacher.',
      ru: 'Я написал учителю благодарственное письмо.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 20. V-아/어 보세요
// ─────────────────────────────────────────────
const G20 = 'suggestion-a-eo-boseyo';

const G20_Q = {
  // grammar_blank 10
  ...blank('gp_s2_u5_g20_01', G20, '이 옷을 한번 입어 보세요.', '입어 보세요', {
    uz: 'Bu kiyimni bir kiyib ko‘ring.',
    en: 'Try these clothes on.',
    ru: 'Попробуйте примерить эту одежду.',
  }),

  ...blank('gp_s2_u5_g20_02', G20, '이 신발도 신어 보세요.', '신어 보세요', {
    uz: 'Bu oyoq kiyimni ham kiyib ko‘ring.',
    en: 'Try these shoes on too.',
    ru: 'Примерьте и эту обувь.',
  }),

  ...blank('gp_s2_u5_g20_03', G20, '이 모자를 써 보세요.', '써 보세요', {
    uz: 'Bu bosh kiyimni kiyib ko‘ring.',
    en: 'Try this hat on.',
    ru: 'Примерьте эту шляпу.',
  }),

  ...blank(
    'gp_s2_u5_g20_04',
    G20,
    '이 음식도 한번 먹어 보세요.',
    '먹어 보세요',
    {
      uz: 'Bu taomni ham bir tatib ko‘ring.',
      en: 'Try this food too.',
      ru: 'Попробуйте и это блюдо.',
    },
  ),

  ...blank('gp_s2_u5_g20_05', G20, '이 책을 한번 읽어 보세요.', '읽어 보세요', {
    uz: 'Bu kitobni bir o‘qib ko‘ring.',
    en: 'Try reading this book.',
    ru: 'Попробуйте прочитать эту книгу.',
  }),

  ...blank('gp_s2_u5_g20_06', G20, '이 노래를 들어 보세요.', '들어 보세요', {
    uz: 'Bu qo‘shiqni tinglab ko‘ring.',
    en: 'Try listening to this song.',
    ru: 'Послушайте эту песню.',
  }),

  ...blank(
    'gp_s2_u5_g20_07',
    G20,
    '시간이 있으면 제주도에 가 보세요.',
    '가 보세요',
    {
      uz: 'Vaqtingiz bo‘lsa Jejuga borib ko‘ring.',
      en: 'If you have time, try visiting Jeju.',
      ru: 'Если будет время, съездите на Чеджу.',
    },
  ),

  ...blank(
    'gp_s2_u5_g20_08',
    G20,
    '이 앱을 한번 사용해 보세요.',
    '사용해 보세요',
    {
      uz: 'Bu ilovani bir ishlatib ko‘ring.',
      en: 'Try using this app.',
      ru: 'Попробуйте воспользоваться этим приложением.',
    },
  ),

  ...blank(
    'gp_s2_u5_g20_09',
    G20,
    '어려우면 다른 방법으로 해 보세요.',
    '해 보세요',
    {
      uz: 'Qiyin bo‘lsa boshqa usulda qilib ko‘ring.',
      en: 'If it is difficult, try doing it another way.',
      ru: 'Если сложно, попробуйте сделать это другим способом.',
    },
  ),

  ...blank(
    'gp_s2_u5_g20_10',
    G20,
    '이 의자에 한번 앉아 보세요.',
    '앉아 보세요',
    {
      uz: 'Bu stulga bir o‘tirib ko‘ring.',
      en: 'Try sitting in this chair.',
      ru: 'Попробуйте сесть на этот стул.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s2_u5_g20_11',
    G20,
    [
      {
        options: ['이', '그', '저'],
        correct: '이',
      },
      {
        options: ['옷을', '옷를', '옷은'],
        correct: '옷을',
      },
      {
        options: ['한번', '예쁜', '요즘'],
        correct: '한번',
      },
      {
        options: ['입어', '신어', '먹어'],
        correct: '입어',
      },
      {
        options: ['보세요.', '읽으세요.', '기다리세요.'],
        correct: '보세요.',
      },
    ],
    {
      uz: 'Bu kiyimni bir kiyib ko‘ring.',
      en: 'Try these clothes on.',
      ru: 'Попробуйте примерить эту одежду.',
    },
  ),

  ...build(
    'gp_s2_u5_g20_12',
    G20,
    [
      {
        options: ['이', '그', '저'],
        correct: '이',
      },
      {
        options: ['신발도', '신발만', '신발까지'],
        correct: '신발도',
      },
      {
        options: ['신어', '한국어', '찍어'],
        correct: '신어',
      },
      {
        options: ['보세요.', '드세요.', '앉으세요.'],
        correct: '보세요.',
      },
    ],
    {
      uz: 'Bu oyoq kiyimni ham kiyib ko‘ring.',
      en: 'Try these shoes on too.',
      ru: 'Примерьте и эту обувь.',
    },
  ),

  ...build(
    'gp_s2_u5_g20_13',
    G20,
    [
      {
        options: ['이', '그', '저'],
        correct: '이',
      },
      {
        options: ['모자를', '모자을', '모자는'],
        correct: '모자를',
      },
      {
        options: ['써', '커피', '학생'],
        correct: '써',
      },
      {
        options: ['보세요.', '가세요.', '많으세요.'],
        correct: '보세요.',
      },
    ],
    {
      uz: 'Bu bosh kiyimni kiyib ko‘ring.',
      en: 'Try this hat on.',
      ru: 'Примерьте эту шляпу.',
    },
  ),

  ...build(
    'gp_s2_u5_g20_14',
    G20,
    [
      {
        options: ['이', '그', '저'],
        correct: '이',
      },
      {
        options: ['음식도', '음식만', '음식까지'],
        correct: '음식도',
      },
      {
        options: ['한번', '오십', '우즈베키스탄'],
        correct: '한번',
      },
      {
        options: ['먹어', '신어', '들어'],
        correct: '먹어',
      },
      {
        options: ['보세요.', '주세요.', '도세요.'],
        correct: '보세요.',
      },
    ],
    {
      uz: 'Bu taomni ham bir tatib ko‘ring.',
      en: 'Try this food too.',
      ru: 'Попробуйте и это блюдо.',
    },
  ),

  ...build(
    'gp_s2_u5_g20_15',
    G20,
    [
      {
        options: ['이', '그', '저'],
        correct: '이',
      },
      {
        options: ['책을', '책를', '책은'],
        correct: '책을',
      },
      {
        options: ['한번', '민수', '볼'],
        correct: '한번',
      },
      {
        options: ['읽어', '먹어', '들어'],
        correct: '읽어',
      },
      {
        options: ['보세요.', '닫으세요.', '바쁘세요.'],
        correct: '보세요.',
      },
    ],
    {
      uz: 'Bu kitobni bir o‘qib ko‘ring.',
      en: 'Try reading this book.',
      ru: 'Попробуйте прочитать эту книгу.',
    },
  ),

  ...build(
    'gp_s2_u5_g20_16',
    G20,
    [
      {
        options: ['이', '그', '저'],
        correct: '이',
      },
      {
        options: ['노래를', '노래을', '노래는'],
        correct: '노래를',
      },
      {
        options: ['들어', '읽어', '영어'],
        correct: '들어',
      },
      {
        options: ['보세요.', '쓰세요.', '잘하세요.'],
        correct: '보세요.',
      },
    ],
    {
      uz: 'Bu qo‘shiqni tinglab ko‘ring.',
      en: 'Try listening to this song.',
      ru: 'Послушайте эту песню.',
    },
  ),

  ...build(
    'gp_s2_u5_g20_17',
    G20,
    [
      {
        options: ['시간이', '시간가', '시간을'],
        correct: '시간이',
      },
      {
        options: ['있으면', '좋으면', '만나면'],
        correct: '있으면',
      },
      {
        options: ['제주도에', '제주도에서', '제주도까지'],
        correct: '제주도에',
      },
      {
        options: ['가', '안', '오래'],
        correct: '가',
      },
      {
        options: ['보세요.', '기다리세요.', '말하세요.'],
        correct: '보세요.',
      },
    ],
    {
      uz: 'Vaqtingiz bo‘lsa Jejuga borib ko‘ring.',
      en: 'If you have time, try visiting Jeju.',
      ru: 'Если будет время, съездите на Чеджу.',
    },
  ),

  ...build(
    'gp_s2_u5_g20_18',
    G20,
    [
      {
        options: ['이', '그', '저'],
        correct: '이',
      },
      {
        options: ['앱을', '앱를', '앱은'],
        correct: '앱을',
      },
      {
        options: ['한번', '조금', '차'],
        correct: '한번',
      },
      {
        options: ['사용해', '수업', '써'],
        correct: '사용해',
      },
      {
        options: ['보세요.', '닫으세요.', '바쁘세요.'],
        correct: '보세요.',
      },
    ],
    {
      uz: 'Bu ilovani bir ishlatib ko‘ring.',
      en: 'Try using this app.',
      ru: 'Попробуйте воспользоваться этим приложением.',
    },
  ),

  ...build(
    'gp_s2_u5_g20_19',
    G20,
    [
      {
        options: ['어려우면', '모르면', '걸리면'],
        correct: '어려우면',
      },
      {
        options: ['다른', '분', '삼십'],
        correct: '다른',
      },
      {
        options: ['방법으로', '방법에', '방법에서'],
        correct: '방법으로',
      },
      {
        options: ['해', '학교', '가야'],
        correct: '해',
      },
      {
        options: ['보세요.', '읽으세요.', '기다리세요.'],
        correct: '보세요.',
      },
    ],
    {
      uz: 'Qiyin bo‘lsa boshqa usulda qilib ko‘ring.',
      en: 'If it is difficult, try doing it another way.',
      ru: 'Если сложно, попробуйте сделать это другим способом.',
    },
  ),

  ...build(
    'gp_s2_u5_g20_20',
    G20,
    [
      {
        options: ['이', '그', '저'],
        correct: '이',
      },
      {
        options: ['의자에', '의자에서', '의자까지'],
        correct: '의자에',
      },
      {
        options: ['한번', '저녁', '직접'],
        correct: '한번',
      },
      {
        options: ['앉아', '무슨', '민수의'],
        correct: '앉아',
      },
      {
        options: ['보세요.', '오세요.', '친절하세요.'],
        correct: '보세요.',
      },
    ],
    {
      uz: 'Bu stulga bir o‘tirib ko‘ring.',
      en: 'Try sitting in this chair.',
      ru: 'Попробуйте сесть на этот стул.',
    },
  ),
};

// ═══════════════════════════════════════════════════════════
// UNIT 6
// 조건 · 현재 관형형 · 희망
// ═══════════════════════════════════════════════════════════

// ─────────────────────────────────────────────
// 문법 21. A/V-(으)면
// ─────────────────────────────────────────────
const G21 = 'conditional-eumyeon';

const G21_Q = {
  // grammar_blank 10
  ...blank(
    'gp_s2_u6_g21_01',
    G21,
    '시간이 있으면 여행을 가고 싶어요.',
    '있으면',
    {
      uz: 'Vaqtim bo‘lsa, sayohatga bormoqchiman.',
      en: 'If I have time, I want to travel.',
      ru: 'Если будет время, я хочу поехать путешествовать.',
    },
  ),

  ...blank(
    'gp_s2_u6_g21_02',
    G21,
    '한국에 가면 제주도에도 가고 싶어요.',
    '가면',
    {
      uz: 'Koreyaga borsam, Jejuga ham bormoqchiman.',
      en: 'If I go to Korea, I want to visit Jeju too.',
      ru: 'Если я поеду в Корею, хочу также посетить Чеджу.',
    },
  ),

  ...blank('gp_s2_u6_g21_03', G21, '날씨가 좋으면 산에 갈 거예요.', '좋으면', {
    uz: 'Ob-havo yaxshi bo‘lsa, tog‘ga boraman.',
    en: 'If the weather is nice, I will go to the mountains.',
    ru: 'Если погода будет хорошая, я пойду в горы.',
  }),

  ...blank('gp_s2_u6_g21_04', G21, '비가 오면 박물관에 갈 거예요.', '오면', {
    uz: 'Yomg‘ir yog‘sa, muzeyga boraman.',
    en: 'If it rains, I will go to a museum.',
    ru: 'Если пойдёт дождь, я пойду в музей.',
  }),

  ...blank(
    'gp_s2_u6_g21_05',
    G21,
    '배가 고프면 이 식당에 가 보세요.',
    '고프면',
    {
      uz: 'Och qolsangiz, shu restoranga borib ko‘ring.',
      en: 'If you are hungry, try this restaurant.',
      ru: 'Если проголодаетесь, попробуйте сходить в этот ресторан.',
    },
  ),

  ...blank(
    'gp_s2_u6_g21_06',
    G21,
    '길을 모르면 경찰에게 물어보세요.',
    '모르면',
    {
      uz: 'Yo‘lni bilmasangiz, politsiyachidan so‘rang.',
      en: 'If you do not know the way, ask a police officer.',
      ru: 'Если не знаете дорогу, спросите полицейского.',
    },
  ),

  ...blank(
    'gp_s2_u6_g21_07',
    G21,
    '이 버스를 타면 서울역에 갈 수 있어요.',
    '타면',
    {
      uz: 'Bu avtobusga chiqsangiz, Seul vokzaliga bora olasiz.',
      en: 'If you take this bus, you can get to Seoul Station.',
      ru: 'Если сядете на этот автобус, сможете доехать до вокзала Сеул.',
    },
  ),

  ...blank('gp_s2_u6_g21_08', G21, '가격이 싸면 이 가방을 살 거예요.', '싸면', {
    uz: 'Narxi arzon bo‘lsa, bu sumkani sotib olaman.',
    en: 'If the price is low, I will buy this bag.',
    ru: 'Если цена будет низкой, я куплю эту сумку.',
  }),

  ...blank(
    'gp_s2_u6_g21_09',
    G21,
    '친구를 만나면 같이 여행 계획을 세울 거예요.',
    '만나면',
    {
      uz: 'Do‘stim bilan uchrashsam, birga sayohat rejasini tuzamiz.',
      en: 'When I meet my friend, we will plan the trip together.',
      ru: 'Когда встречусь с другом, мы вместе составим план поездки.',
    },
  ),

  ...blank(
    'gp_s2_u6_g21_10',
    G21,
    '이 음악을 들으면 기분이 좋아져요.',
    '들으면',
    {
      uz: 'Bu musiqani tinglasam, kayfiyatim yaxshilanadi.',
      en: 'When I listen to this music, I feel better.',
      ru: 'Когда я слушаю эту музыку, настроение улучшается.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s2_u6_g21_11',
    G21,
    [
      {
        options: ['시간이', '시간가', '시간을'],
        correct: '시간이',
      },
      {
        options: ['있으면', '걸리면', '싸면'],
        correct: '있으면',
      },
      {
        options: ['여행을', '여행를', '여행은'],
        correct: '여행을',
      },
      {
        options: ['가고', '하고', '만나고'],
        correct: '가고',
      },
      {
        options: ['싶어요.', '읽으셨어요.', '질문했어요.'],
        correct: '싶어요.',
      },
    ],
    {
      uz: 'Vaqtim bo‘lsa, sayohatga bormoqchiman.',
      en: 'If I have time, I want to travel.',
      ru: 'Если будет время, я хочу поехать путешествовать.',
    },
  ),

  ...build(
    'gp_s2_u6_g21_12',
    G21,
    [
      {
        options: ['한국에', '한국에서', '한국까지'],
        correct: '한국에',
      },
      {
        options: ['가면', '어려우면', '들으면'],
        correct: '가면',
      },
      {
        options: ['제주도에도', '제주도에는', '제주도에만'],
        correct: '제주도에도',
      },
      {
        options: ['가고', '만나고', '사고'],
        correct: '가고',
      },
      {
        options: ['싶어요.', '쉬었어요.', '읽어요.'],
        correct: '싶어요.',
      },
    ],
    {
      uz: 'Koreyaga borsam, Jejuga ham bormoqchiman.',
      en: 'If I go to Korea, I want to visit Jeju too.',
      ru: 'Если я поеду в Корею, хочу также посетить Чеджу.',
    },
  ),

  ...build(
    'gp_s2_u6_g21_13',
    G21,
    [
      {
        options: ['날씨가', '날씨이', '날씨를'],
        correct: '날씨가',
      },
      {
        options: ['좋으면', '가면', '무거우면'],
        correct: '좋으면',
      },
      {
        options: ['산에', '산에서', '산까지'],
        correct: '산에',
      },
      {
        options: ['갈', '음식', '입어야'],
        correct: '갈',
      },
      {
        options: ['거', '거가', '거를'],
        correct: '거',
      },
      {
        options: ['예요.', '이에요.', '입니다.'],
        correct: '예요.',
        glue: true,
      },
    ],
    {
      uz: 'Ob-havo yaxshi bo‘lsa, tog‘ga boraman.',
      en: 'If the weather is nice, I will go to the mountains.',
      ru: 'Если погода будет хорошая, я пойду в горы.',
    },
  ),

  ...build(
    'gp_s2_u6_g21_14',
    G21,
    [
      {
        options: ['비가', '비이', '비를'],
        correct: '비가',
      },
      {
        options: ['오면', '어려우면', '들으면'],
        correct: '오면',
      },
      {
        options: ['박물관에', '박물관에서', '박물관까지'],
        correct: '박물관에',
      },
      {
        options: ['갈', '친구의', '학교'],
        correct: '갈',
      },
      {
        options: ['거', '거가', '거를'],
        correct: '거',
      },
      {
        options: ['예요.', '이에요.', '입니다.'],
        correct: '예요.',
        glue: true,
      },
    ],
    {
      uz: 'Yomg‘ir yog‘sa, muzeyga boraman.',
      en: 'If it rains, I will go to a museum.',
      ru: 'Если пойдёт дождь, я пойду в музей.',
    },
  ),

  ...build(
    'gp_s2_u6_g21_15',
    G21,
    [
      {
        options: ['배가', '배이', '배를'],
        correct: '배가',
      },
      {
        options: ['고프면', '좋으면', '모르면'],
        correct: '고프면',
      },
      {
        options: ['이', '그', '저'],
        correct: '이',
      },
      {
        options: ['식당에', '식당에서', '식당까지'],
        correct: '식당에',
      },
      {
        options: ['가', '설명해', '시간'],
        correct: '가',
      },
      {
        options: ['보세요.', '물어보세요.', '읽으세요.'],
        correct: '보세요.',
      },
    ],
    {
      uz: 'Och qolsangiz, shu restoranga borib ko‘ring.',
      en: 'If you are hungry, try this restaurant.',
      ru: 'Если проголодаетесь, попробуйте сходить в этот ресторан.',
    },
  ),

  ...build(
    'gp_s2_u6_g21_16',
    G21,
    [
      {
        options: ['길을', '길를', '길은'],
        correct: '길을',
      },
      {
        options: ['모르면', '고프면', '오면'],
        correct: '모르면',
      },
      {
        options: ['경찰에게', '경찰한테', '경찰에서'],
        correct: '경찰에게',
      },
      {
        options: ['물어보세요.', '기다리세요.', '말하세요.'],
        correct: '물어보세요.',
      },
    ],
    {
      uz: 'Yo‘lni bilmasangiz, politsiyachidan so‘rang.',
      en: 'If you do not know the way, ask a police officer.',
      ru: 'Если не знаете дорогу, спросите полицейского.',
    },
  ),

  ...build(
    'gp_s2_u6_g21_17',
    G21,
    [
      {
        options: ['이', '그', '저'],
        correct: '이',
      },
      {
        options: ['버스를', '버스을', '버스는'],
        correct: '버스를',
      },
      {
        options: ['타면', '나면', '오면'],
        correct: '타면',
      },
      {
        options: ['서울역에', '서울역에서', '서울역까지'],
        correct: '서울역에',
      },
      {
        options: ['갈', '추운', '하나'],
        correct: '갈',
      },
      {
        options: ['수', '설명해', '시간쯤'],
        correct: '수',
      },
      {
        options: ['있어요.', '없어요.', '읽으셨어요.'],
        correct: '있어요.',
      },
    ],
    {
      uz: 'Bu avtobusga chiqsangiz, Seul vokzaliga bora olasiz.',
      en: 'If you take this bus, you can get to Seoul Station.',
      ru: 'Если сядете на этот автобус, сможете доехать до вокзала Сеул.',
    },
  ),

  ...build(
    'gp_s2_u6_g21_18',
    G21,
    [
      {
        options: ['가격이', '가격가', '가격을'],
        correct: '가격이',
      },
      {
        options: ['싸면', '오면', '들으면'],
        correct: '싸면',
      },
      {
        options: ['이', '그', '저'],
        correct: '이',
      },
      {
        options: ['가방을', '가방를', '가방은'],
        correct: '가방을',
      },
      {
        options: ['살', '학교', '가'],
        correct: '살',
      },
      {
        options: ['거', '거가', '거를'],
        correct: '거',
      },
      {
        options: ['예요.', '이에요.', '입니다.'],
        correct: '예요.',
        glue: true,
      },
    ],
    {
      uz: 'Narxi arzon bo‘lsa, bu sumkani sotib olaman.',
      en: 'If the price is low, I will buy this bag.',
      ru: 'Если цена будет низкой, я куплю эту сумку.',
    },
  ),

  ...build(
    'gp_s2_u6_g21_19',
    G21,
    [
      {
        options: ['친구를', '친구을', '친구는'],
        correct: '친구를',
      },
      {
        options: ['만나면', '나면', '있으면'],
        correct: '만나면',
      },
      {
        options: ['같이', '가족', '골라'],
        correct: '같이',
      },
      {
        options: ['여행', '생일', '쉬어야'],
        correct: '여행',
      },
      {
        options: ['계획을', '계획를', '계획은'],
        correct: '계획을',
      },
      {
        options: ['세울', '수진', '씨'],
        correct: '세울',
      },
      {
        options: ['거', '거가', '거를'],
        correct: '거',
      },
      {
        options: ['예요.', '이에요.', '입니다.'],
        correct: '예요.',
        glue: true,
      },
    ],
    {
      uz: 'Do‘stim bilan uchrashsam, birga sayohat rejasini tuzamiz.',
      en: 'When I meet my friend, we will plan the trip together.',
      ru: 'Когда встречусь с другом, мы вместе составим план поездки.',
    },
  ),

  ...build(
    'gp_s2_u6_g21_20',
    G21,
    [
      {
        options: ['이', '그', '저'],
        correct: '이',
      },
      {
        options: ['음악을', '음악를', '음악은'],
        correct: '음악을',
      },
      {
        options: ['들으면', '있으면', '만나면'],
        correct: '들으면',
      },
      {
        options: ['기분이', '기분가', '기분을'],
        correct: '기분이',
      },
      {
        options: ['좋아져요.', '쉬었어요.', '써요.'],
        correct: '좋아져요.',
      },
    ],
    {
      uz: 'Bu musiqani tinglasam, kayfiyatim yaxshilanadi.',
      en: 'When I listen to this music, I feel better.',
      ru: 'Когда я слушаю эту музыку, настроение улучшается.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 22. V-는 N
// ─────────────────────────────────────────────
const G22 = 'verb-attributive-neun';

const G22_Q = {
  // grammar_blank 10
  ...blank('gp_s2_u6_g22_01', G22, '제가 가는 곳은 제주도예요.', '가는 곳', {
    uz: 'Men boradigan joy Jeju.',
    en: 'The place I am going to is Jeju.',
    ru: 'Место, куда я еду, — Чеджу.',
  }),

  ...blank(
    'gp_s2_u6_g22_02',
    G22,
    '한국어를 공부하는 사람이 많아요.',
    '공부하는 사람',
    {
      uz: 'Koreys tilini o‘rganayotgan odamlar ko‘p.',
      en: 'There are many people studying Korean.',
      ru: 'Много людей изучают корейский язык.',
    },
  ),

  ...blank(
    'gp_s2_u6_g22_03',
    G22,
    '저기 오는 사람이 제 친구예요.',
    '오는 사람',
    {
      uz: 'Ana u kelayotgan odam mening do‘stim.',
      en: 'The person coming over there is my friend.',
      ru: 'Человек, который идёт там, — мой друг.',
    },
  ),

  ...blank(
    'gp_s2_u6_g22_04',
    G22,
    '제가 좋아하는 여행지는 부산이에요.',
    '좋아하는 여행지',
    {
      uz: 'Men yoqtiradigan sayohat joyi Pusan.',
      en: 'My favorite travel destination is Busan.',
      ru: 'Моё любимое место для путешествий — Пусан.',
    },
  ),

  ...blank(
    'gp_s2_u6_g22_05',
    G22,
    '매일 타는 버스가 오늘 늦게 왔어요.',
    '타는 버스',
    {
      uz: 'Har kuni minadigan avtobusim bugun kech keldi.',
      en: 'The bus I take every day came late today.',
      ru: 'Автобус, на котором я езжу каждый день, сегодня опоздал.',
    },
  ),

  ...blank(
    'gp_s2_u6_g22_06',
    G22,
    '민수 씨가 읽는 책은 여행 책이에요.',
    '읽는 책',
    {
      uz: 'Minsu o‘qiyotgan kitob sayohat haqida.',
      en: 'The book Minsu is reading is a travel book.',
      ru: 'Книга, которую читает Минсу, — о путешествиях.',
    },
  ),

  ...blank('gp_s2_u6_g22_07', G22, '제가 사는 곳은 서울이에요.', '사는 곳', {
    uz: 'Men yashaydigan joy Seul.',
    en: 'The place where I live is Seoul.',
    ru: 'Место, где я живу, — Сеул.',
  }),

  ...blank(
    'gp_s2_u6_g22_08',
    G22,
    '음식을 만드는 사람이 제 형이에요.',
    '만드는 사람',
    {
      uz: 'Ovqat tayyorlayotgan odam mening akam.',
      en: 'The person making the food is my older brother.',
      ru: 'Человек, который готовит еду, — мой старший брат.',
    },
  ),

  ...blank(
    'gp_s2_u6_g22_09',
    G22,
    '제가 아는 사람도 한국에 살아요.',
    '아는 사람',
    {
      uz: 'Men biladigan odam ham Koreyada yashaydi.',
      en: 'Someone I know also lives in Korea.',
      ru: 'Один мой знакомый тоже живёт в Корее.',
    },
  ),

  ...blank(
    'gp_s2_u6_g22_10',
    G22,
    '저 사람이 기다리는 버스가 곧 와요.',
    '기다리는 버스',
    {
      uz: 'U odam kutayotgan avtobus tez orada keladi.',
      en: 'The bus that person is waiting for will arrive soon.',
      ru: 'Автобус, который ждёт тот человек, скоро приедет.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s2_u6_g22_11',
    G22,
    [
      {
        options: ['제가', '제이', '제를'],
        correct: '제가',
      },
      {
        options: ['가는', '아는', '타는'],
        correct: '가는',
      },
      {
        options: ['곳은', '곳는', '곳을'],
        correct: '곳은',
      },
      {
        options: ['제주도', '제주도가', '제주도를'],
        correct: '제주도',
      },
      {
        options: ['예요.', '이에요.', '입니다.'],
        correct: '예요.',
        glue: true,
      },
    ],
    {
      uz: 'Men boradigan joy Jeju.',
      en: 'The place I am going to is Jeju.',
      ru: 'Место, куда я еду, — Чеджу.',
    },
  ),

  ...build(
    'gp_s2_u6_g22_12',
    G22,
    [
      {
        options: ['한국어를', '한국어을', '한국어는'],
        correct: '한국어를',
      },
      {
        options: ['공부하는', '좋은', '아는'],
        correct: '공부하는',
      },
      {
        options: ['사람이', '사람가', '사람을'],
        correct: '사람이',
      },
      {
        options: ['많아요.', '높아요.', '작아요.'],
        correct: '많아요.',
      },
    ],
    {
      uz: 'Koreys tilini o‘rganayotgan odamlar ko‘p.',
      en: 'There are many people studying Korean.',
      ru: 'Много людей изучают корейский язык.',
    },
  ),

  ...build(
    'gp_s2_u6_g22_13',
    G22,
    [
      {
        options: ['저기', '씨', '안'],
        correct: '저기',
      },
      {
        options: ['오는', '읽는', '공부하는'],
        correct: '오는',
      },
      {
        options: ['사람이', '사람가', '사람을'],
        correct: '사람이',
      },
      {
        options: ['제', '저', '내'],
        correct: '제',
      },
      {
        options: ['친구', '친구가', '친구를'],
        correct: '친구',
      },
      {
        options: ['예요.', '이에요.', '입니다.'],
        correct: '예요.',
        glue: true,
      },
    ],
    {
      uz: 'Ana u kelayotgan odam mening do‘stim.',
      en: 'The person coming over there is my friend.',
      ru: 'Человек, который идёт там, — мой друг.',
    },
  ),

  ...build(
    'gp_s2_u6_g22_14',
    G22,
    [
      {
        options: ['제가', '제이', '제를'],
        correct: '제가',
      },
      {
        options: ['좋아하는', '먹을', '작은'],
        correct: '좋아하는',
      },
      {
        options: ['여행지는', '여행지은', '여행지를'],
        correct: '여행지는',
      },
      {
        options: ['부산', '부산이', '부산을'],
        correct: '부산',
      },
      {
        options: ['이에요.', '예요.', '입니다.'],
        correct: '이에요.',
        glue: true,
      },
    ],
    {
      uz: 'Men yoqtiradigan sayohat joyi Pusan.',
      en: 'My favorite travel destination is Busan.',
      ru: 'Моё любимое место для путешествий — Пусан.',
    },
  ),

  ...build(
    'gp_s2_u6_g22_15',
    G22,
    [
      {
        options: ['매일', '아브로르', '열심히'],
        correct: '매일',
      },
      {
        options: ['타는', '좋은', '아는'],
        correct: '타는',
      },
      {
        options: ['버스가', '버스이', '버스를'],
        correct: '버스가',
      },
      {
        options: ['오늘', '메뉴', '민수의'],
        correct: '오늘',
      },
      {
        options: ['늦게', '공부하는', '그릇'],
        correct: '늦게',
      },
      {
        options: ['왔어요.', '찾았어요.', '기다렸어요.'],
        correct: '왔어요.',
      },
    ],
    {
      uz: 'Har kuni minadigan avtobusim bugun kech keldi.',
      en: 'The bus I take every day came late today.',
      ru: 'Автобус, на котором я езжу каждый день, сегодня опоздал.',
    },
  ),

  ...build(
    'gp_s2_u6_g22_16',
    G22,
    [
      {
        options: ['민수', '하나', '해야'],
        correct: '민수',
      },
      {
        options: ['씨가', '씨이', '씨를'],
        correct: '씨가',
      },
      {
        options: ['읽는', '있을', '만드는'],
        correct: '읽는',
      },
      {
        options: ['책은', '책는', '책을'],
        correct: '책은',
      },
      {
        options: ['여행', '교실', '깨끗한'],
        correct: '여행',
      },
      {
        options: ['책', '책이', '책을'],
        correct: '책',
      },
      {
        options: ['이에요.', '예요.', '입니다.'],
        correct: '이에요.',
        glue: true,
      },
    ],
    {
      uz: 'Minsu o‘qiyotgan kitob sayohat haqida.',
      en: 'The book Minsu is reading is a travel book.',
      ru: 'Книга, которую читает Минсу, — о путешествиях.',
    },
  ),

  ...build(
    'gp_s2_u6_g22_17',
    G22,
    [
      {
        options: ['제가', '제이', '제를'],
        correct: '제가',
      },
      {
        options: ['사는', '좋아하는', '모르는'],
        correct: '사는',
      },
      {
        options: ['곳은', '곳는', '곳을'],
        correct: '곳은',
      },
      {
        options: ['서울', '서울이', '서울을'],
        correct: '서울',
      },
      {
        options: ['이에요.', '예요.', '입니다.'],
        correct: '이에요.',
        glue: true,
      },
    ],
    {
      uz: 'Men yashaydigan joy Seul.',
      en: 'The place where I live is Seoul.',
      ru: 'Место, где я живу, — Сеул.',
    },
  ),

  ...build(
    'gp_s2_u6_g22_18',
    G22,
    [
      {
        options: ['음식을', '음식를', '음식은'],
        correct: '음식을',
      },
      {
        options: ['만드는', '사는', '좋은'],
        correct: '만드는',
      },
      {
        options: ['사람이', '사람가', '사람을'],
        correct: '사람이',
      },
      {
        options: ['제', '저', '내'],
        correct: '제',
      },
      {
        options: ['형', '형이', '형을'],
        correct: '형',
      },
      {
        options: ['이에요.', '예요.', '입니다.'],
        correct: '이에요.',
        glue: true,
      },
    ],
    {
      uz: 'Ovqat tayyorlayotgan odam mening akam.',
      en: 'The person making the food is my older brother.',
      ru: 'Человек, который готовит еду, — мой старший брат.',
    },
  ),

  ...build(
    'gp_s2_u6_g22_19',
    G22,
    [
      {
        options: ['제가', '제이', '제를'],
        correct: '제가',
      },
      {
        options: ['아는', '만드는', '작은'],
        correct: '아는',
      },
      {
        options: ['사람도', '사람만', '사람까지'],
        correct: '사람도',
      },
      {
        options: ['한국에', '한국에서', '한국까지'],
        correct: '한국에',
      },
      {
        options: ['살아요.', '많아요.', '좋아요.'],
        correct: '살아요.',
      },
    ],
    {
      uz: 'Men biladigan odam ham Koreyada yashaydi.',
      en: 'Someone I know also lives in Korea.',
      ru: 'Один мой знакомый тоже живёт в Корее.',
    },
  ),

  ...build(
    'gp_s2_u6_g22_20',
    G22,
    [
      {
        options: ['저', '이', '그'],
        correct: '저',
      },
      {
        options: ['사람이', '사람가', '사람을'],
        correct: '사람이',
      },
      {
        options: ['기다리는', '만드는', '있을'],
        correct: '기다리는',
      },
      {
        options: ['버스가', '버스이', '버스를'],
        correct: '버스가',
      },
      {
        options: ['곧', '병원', '사'],
        correct: '곧',
      },
      {
        options: ['와요.', '가세요.', '걸렸어요.'],
        correct: '와요.',
      },
    ],
    {
      uz: 'U odam kutayotgan avtobus tez orada keladi.',
      en: 'The bus that person is waiting for will arrive soon.',
      ru: 'Автобус, который ждёт тот человек, скоро приедет.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 23. V-고 싶다
// ─────────────────────────────────────────────
const G23 = 'desire-go-sipda';

const G23_Q = {
  // grammar_blank 10
  ...blank(
    'gp_s2_u6_g23_01',
    G23,
    '저는 제주도에 가고 싶어요.',
    '가고 싶어요',
    {
      uz: 'Men Jejuga bormoqchiman.',
      en: 'I want to go to Jeju.',
      ru: 'Я хочу поехать на Чеджу.',
    },
  ),

  ...blank(
    'gp_s2_u6_g23_02',
    G23,
    '한국에서 여행하고 싶어요.',
    '여행하고 싶어요',
    {
      uz: 'Koreyada sayohat qilmoqchiman.',
      en: 'I want to travel in Korea.',
      ru: 'Я хочу путешествовать по Корее.',
    },
  ),

  ...blank('gp_s2_u6_g23_03', G23, '한복을 한번 입고 싶어요.', '입고 싶어요', {
    uz: 'Hanbokni bir marta kiyib ko‘rishni xohlayman.',
    en: 'I want to wear hanbok once.',
    ru: 'Я хочу однажды надеть ханбок.',
  }),

  ...blank(
    'gp_s2_u6_g23_04',
    G23,
    '한국 음식을 많이 먹고 싶어요.',
    '먹고 싶어요',
    {
      uz: 'Ko‘p koreys taomlarini yemoqchiman.',
      en: 'I want to eat lots of Korean food.',
      ru: 'Я хочу попробовать много корейских блюд.',
    },
  ),

  ...blank(
    'gp_s2_u6_g23_05',
    G23,
    '부산에서 바다를 보고 싶어요.',
    '보고 싶어요',
    {
      uz: 'Pusanda dengizni ko‘rmoqchiman.',
      en: 'I want to see the sea in Busan.',
      ru: 'Я хочу увидеть море в Пусане.',
    },
  ),

  ...blank(
    'gp_s2_u6_g23_06',
    G23,
    '이번 주말에는 집에서 쉬고 싶어요.',
    '쉬고 싶어요',
    {
      uz: 'Bu hafta oxirida uyda dam olmoqchiman.',
      en: 'I want to rest at home this weekend.',
      ru: 'В эти выходные я хочу отдохнуть дома.',
    },
  ),

  ...blank(
    'gp_s2_u6_g23_07',
    G23,
    '한국 친구를 만나고 싶어요.',
    '만나고 싶어요',
    {
      uz: 'Koreys do‘stim bilan uchrashmoqchiman.',
      en: 'I want to meet my Korean friend.',
      ru: 'Я хочу встретиться с корейским другом.',
    },
  ),

  ...blank(
    'gp_s2_u6_g23_08',
    G23,
    '한국어를 더 잘하고 싶어요.',
    '잘하고 싶어요',
    {
      uz: 'Koreys tilini yanada yaxshi bilishni xohlayman.',
      en: 'I want to become better at Korean.',
      ru: 'Я хочу лучше говорить по-корейски.',
    },
  ),

  ...blank(
    'gp_s2_u6_g23_09',
    G23,
    '오늘은 밖에 나가고 싶지 않아요.',
    '나가고 싶지 않아요',
    {
      uz: 'Bugun tashqariga chiqishni xohlamayman.',
      en: 'I do not want to go outside today.',
      ru: 'Сегодня я не хочу выходить на улицу.',
    },
  ),

  ...blank('gp_s2_u6_g23_10', G23, '방학에 뭐 하고 싶어요?', '하고 싶어요', {
    uz: 'Ta’tilda nima qilishni xohlaysiz?',
    en: 'What do you want to do during vacation?',
    ru: 'Что вы хотите делать на каникулах?',
  }),

  // grammar_build 10
  ...build(
    'gp_s2_u6_g23_11',
    G23,
    [
      {
        options: ['저는', '저은', '저를'],
        correct: '저는',
      },
      {
        options: ['제주도에', '제주도에서', '제주도까지'],
        correct: '제주도에',
      },
      {
        options: ['가고', '친구하고', '들으려고'],
        correct: '가고',
      },
      {
        options: ['싶어요.', '쉬었어요.', '읽어요.'],
        correct: '싶어요.',
      },
    ],
    {
      uz: 'Men Jejuga bormoqchiman.',
      en: 'I want to go to Jeju.',
      ru: 'Я хочу поехать на Чеджу.',
    },
  ),

  ...build(
    'gp_s2_u6_g23_12',
    G23,
    [
      {
        options: ['한국에서', '한국에', '한국까지'],
        correct: '한국에서',
      },
      {
        options: ['여행하고', '공부하고', '먹고'],
        correct: '여행하고',
      },
      {
        options: ['싶어요.', '읽었어요.', '줬어요.'],
        correct: '싶어요.',
      },
    ],
    {
      uz: 'Koreyada sayohat qilmoqchiman.',
      en: 'I want to travel in Korea.',
      ru: 'Я хочу путешествовать по Корее.',
    },
  ),

  ...build(
    'gp_s2_u6_g23_13',
    G23,
    [
      {
        options: ['한복을', '한복를', '한복은'],
        correct: '한복을',
      },
      {
        options: ['한번', '자야', '정말'],
        correct: '한번',
      },
      {
        options: ['입고', '싸고', '잘하고'],
        correct: '입고',
      },
      {
        options: ['싶어요.', '읽었어요.', '줬어요.'],
        correct: '싶어요.',
      },
    ],
    {
      uz: 'Hanbokni bir marta kiyib ko‘rishni xohlayman.',
      en: 'I want to wear hanbok once.',
      ru: 'Я хочу однажды надеть ханбок.',
    },
  ),

  ...build(
    'gp_s2_u6_g23_14',
    G23,
    [
      {
        options: ['한국', '항상', '같이'],
        correct: '한국',
      },
      {
        options: ['음식을', '음식를', '음식은'],
        correct: '음식을',
      },
      {
        options: ['많이', '할머니께', '감사의'],
        correct: '많이',
      },
      {
        options: ['먹고', '민수하고', '샤워하고'],
        correct: '먹고',
      },
      {
        options: ['싶어요.', '찾았어요.', '기다렸어요.'],
        correct: '싶어요.',
      },
    ],
    {
      uz: 'Ko‘p koreys taomlarini yemoqchiman.',
      en: 'I want to eat lots of Korean food.',
      ru: 'Я хочу попробовать много корейских блюд.',
    },
  ),

  ...build(
    'gp_s2_u6_g23_15',
    G23,
    [
      {
        options: ['부산에서', '부산에', '부산까지'],
        correct: '부산에서',
      },
      {
        options: ['바다를', '바다을', '바다는'],
        correct: '바다를',
      },
      {
        options: ['보고', '저하고', '가려고'],
        correct: '보고',
      },
      {
        options: ['싶어요.', '먹어요.', '빌렸어요.'],
        correct: '싶어요.',
      },
    ],
    {
      uz: 'Pusanda dengizni ko‘rmoqchiman.',
      en: 'I want to see the sea in Busan.',
      ru: 'Я хочу увидеть море в Пусане.',
    },
  ),

  ...build(
    'gp_s2_u6_g23_16',
    G23,
    [
      {
        options: ['이번', '볼', '사과'],
        correct: '이번',
      },
      {
        options: ['주말에는', '주말에도', '주말에만'],
        correct: '주말에는',
      },
      {
        options: ['집에서', '집에', '집까지'],
        correct: '집에서',
      },
      {
        options: ['쉬고', '공부하고', '먹고'],
        correct: '쉬고',
      },
      {
        options: ['싶어요.', '불어요.', '열어요.'],
        correct: '싶어요.',
      },
    ],
    {
      uz: 'Bu hafta oxirida uyda dam olmoqchiman.',
      en: 'I want to rest at home this weekend.',
      ru: 'В эти выходные я хочу отдохнуть дома.',
    },
  ),

  ...build(
    'gp_s2_u6_g23_17',
    G23,
    [
      {
        options: ['한국', '건물', '귤'],
        correct: '한국',
      },
      {
        options: ['친구를', '친구을', '친구는'],
        correct: '친구를',
      },
      {
        options: ['만나고', '민수하고', '샤워하고'],
        correct: '만나고',
      },
      {
        options: ['싶어요.', '읽어요.', '주셨어요.'],
        correct: '싶어요.',
      },
    ],
    {
      uz: 'Koreys do‘stim bilan uchrashmoqchiman.',
      en: 'I want to meet my Korean friend.',
      ru: 'Я хочу встретиться с корейским другом.',
    },
  ),

  ...build(
    'gp_s2_u6_g23_18',
    G23,
    [
      {
        options: ['한국어를', '한국어을', '한국어는'],
        correct: '한국어를',
      },
      {
        options: ['더', '생일', '쉬어야'],
        correct: '더',
      },
      {
        options: ['잘하고', '가고', '만나고'],
        correct: '잘하고',
      },
      {
        options: ['싶어요.', '읽으셨어요.', '질문했어요.'],
        correct: '싶어요.',
      },
    ],
    {
      uz: 'Koreys tilini yanada yaxshi bilishni xohlayman.',
      en: 'I want to become better at Korean.',
      ru: 'Я хочу лучше говорить по-корейски.',
    },
  ),

  ...build(
    'gp_s2_u6_g23_19',
    G23,
    [
      {
        options: ['오늘은', '오늘는', '오늘을'],
        correct: '오늘은',
      },
      {
        options: ['밖에', '밖에서', '밖까지'],
        correct: '밖에',
      },
      {
        options: ['나가고', '부모님하고', '신고'],
        correct: '나가고',
      },
      {
        options: ['싶지', '운동하지', '마시지'],
        correct: '싶지',
      },
      {
        options: ['않아요.', '작아요.', '많아요.'],
        correct: '않아요.',
      },
    ],
    {
      uz: 'Bugun tashqariga chiqishni xohlamayman.',
      en: 'I do not want to go outside today.',
      ru: 'Сегодня я не хочу выходить на улицу.',
    },
  ),

  ...build(
    'gp_s2_u6_g23_20',
    G23,
    [
      {
        options: ['방학에', '방학에서', '방학까지'],
        correct: '방학에',
      },
      {
        options: ['뭐', '매일', '물'],
        correct: '뭐',
      },
      {
        options: ['하고', '여행하고', '저하고'],
        correct: '하고',
      },
      {
        options: ['싶어요?', '물어봤어요.', '볼까요?'],
        correct: '싶어요?',
      },
    ],
    {
      uz: 'Ta’tilda nima qilishni xohlaysiz?',
      en: 'What do you want to do during vacation?',
      ru: 'Что вы хотите делать на каникулах?',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 24. V-고 싶어 하다
// ─────────────────────────────────────────────
const G24 = 'third-person-desire-go-sipeohada';

const G24_Q = {
  // grammar_blank 10
  ...blank(
    'gp_s2_u6_g24_01',
    G24,
    '민수 씨는 제주도에 가고 싶어 해요.',
    '가고 싶어 해요',
    {
      uz: 'Minsu Jejuga borishni xohlaydi.',
      en: 'Minsu wants to go to Jeju.',
      ru: 'Минсу хочет поехать на Чеджу.',
    },
  ),

  ...blank(
    'gp_s2_u6_g24_02',
    G24,
    '제 동생은 한국에서 여행하고 싶어 해요.',
    '여행하고 싶어 해요',
    {
      uz: 'Ukam Koreyada sayohat qilishni xohlaydi.',
      en: 'My younger sibling wants to travel in Korea.',
      ru: 'Мой младший брат или сестра хочет путешествовать по Корее.',
    },
  ),

  ...blank(
    'gp_s2_u6_g24_03',
    G24,
    '수진 씨는 한복을 입고 싶어 해요.',
    '입고 싶어 해요',
    {
      uz: 'Sujin hanbok kiyishni xohlaydi.',
      en: 'Sujin wants to wear hanbok.',
      ru: 'Суджин хочет надеть ханбок.',
    },
  ),

  ...blank(
    'gp_s2_u6_g24_04',
    G24,
    '아이들이 놀이공원에 가고 싶어 해요.',
    '가고 싶어 해요',
    {
      uz: 'Bolalar attraksionlar bog‘iga borishni xohlaydi.',
      en: 'The children want to go to an amusement park.',
      ru: 'Дети хотят пойти в парк развлечений.',
    },
  ),

  ...blank(
    'gp_s2_u6_g24_05',
    G24,
    '친구가 한국 음식을 먹고 싶어 해요.',
    '먹고 싶어 해요',
    {
      uz: 'Do‘stim koreys taomini yemoqchi.',
      en: 'My friend wants to eat Korean food.',
      ru: 'Мой друг хочет поесть корейской еды.',
    },
  ),

  ...blank(
    'gp_s2_u6_g24_06',
    G24,
    '제 친구는 서울에서 살고 싶어 해요.',
    '살고 싶어 해요',
    {
      uz: 'Do‘stim Seulda yashashni xohlaydi.',
      en: 'My friend wants to live in Seoul.',
      ru: 'Мой друг хочет жить в Сеуле.',
    },
  ),

  ...blank(
    'gp_s2_u6_g24_07',
    G24,
    '마리아 씨는 한국어를 더 배우고 싶어 해요.',
    '배우고 싶어 해요',
    {
      uz: 'Mariya koreys tilini ko‘proq o‘rganishni xohlaydi.',
      en: 'Maria wants to learn more Korean.',
      ru: 'Мария хочет больше изучать корейский язык.',
    },
  ),

  ...blank(
    'gp_s2_u6_g24_08',
    G24,
    '동생은 새 카메라를 사고 싶어 해요.',
    '사고 싶어 해요',
    {
      uz: 'Ukam yangi kamera sotib olmoqchi.',
      en: 'My younger sibling wants to buy a new camera.',
      ru: 'Мой младший брат или сестра хочет купить новую камеру.',
    },
  ),

  ...blank(
    'gp_s2_u6_g24_09',
    G24,
    '어제 민수 씨가 집에서 쉬고 싶어 했어요.',
    '쉬고 싶어 했어요',
    {
      uz: 'Kecha Minsu uyda dam olishni xohlagan edi.',
      en: 'Yesterday, Minsu wanted to rest at home.',
      ru: 'Вчера Минсу хотел отдохнуть дома.',
    },
  ),

  ...blank(
    'gp_s2_u6_g24_10',
    G24,
    '부모님은 저하고 같이 여행하고 싶어 하세요.',
    '여행하고 싶어 하세요',
    {
      uz: 'Ota-onam men bilan birga sayohat qilishni xohlashadi.',
      en: 'My parents want to travel with me.',
      ru: 'Мои родители хотят путешествовать вместе со мной.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s2_u6_g24_11',
    G24,
    [
      {
        options: ['민수', '내일', '따뜻한'],
        correct: '민수',
      },
      {
        options: ['씨는', '씨은', '씨를'],
        correct: '씨는',
      },
      {
        options: ['제주도에', '제주도에서', '제주도까지'],
        correct: '제주도에',
      },
      {
        options: ['가고', '쉬고', '읽고'],
        correct: '가고',
      },
      {
        options: ['싶어', '읽어', '영어'],
        correct: '싶어',
      },
      {
        options: ['해요.', '시작해요.', '공부해요.'],
        correct: '해요.',
      },
    ],
    {
      uz: 'Minsu Jejuga borishni xohlaydi.',
      en: 'Minsu wants to go to Jeju.',
      ru: 'Минсу хочет поехать на Чеджу.',
    },
  ),

  ...build(
    'gp_s2_u6_g24_12',
    G24,
    [
      {
        options: ['제', '저', '내'],
        correct: '제',
      },
      {
        options: ['동생은', '동생는', '동생을'],
        correct: '동생은',
      },
      {
        options: ['한국에서', '한국에', '한국까지'],
        correct: '한국에서',
      },
      {
        options: ['여행하고', '샤워하고', '읽고'],
        correct: '여행하고',
      },
      {
        options: ['싶어', '신어', '먹어'],
        correct: '싶어',
      },
      {
        options: ['해요.', '이야기해요.', '도착해요.'],
        correct: '해요.',
      },
    ],
    {
      uz: 'Ukam Koreyada sayohat qilishni xohlaydi.',
      en: 'My younger sibling wants to travel in Korea.',
      ru: 'Мой младший брат или сестра хочет путешествовать по Корее.',
    },
  ),

  ...build(
    'gp_s2_u6_g24_13',
    G24,
    [
      {
        options: ['수진', '병원', '사'],
        correct: '수진',
      },
      {
        options: ['씨는', '씨은', '씨를'],
        correct: '씨는',
      },
      {
        options: ['한복을', '한복를', '한복은'],
        correct: '한복을',
      },
      {
        options: ['입고', '읽고', '친구하고'],
        correct: '입고',
      },
      {
        options: ['싶어', '읽어', '영어'],
        correct: '싶어',
      },
      {
        options: ['해요.', '이야기해요.', '도착해요.'],
        correct: '해요.',
      },
    ],
    {
      uz: 'Sujin hanbok kiyishni xohlaydi.',
      en: 'Sujin wants to wear hanbok.',
      ru: 'Суджин хочет надеть ханбок.',
    },
  ),

  ...build(
    'gp_s2_u6_g24_14',
    G24,
    [
      {
        options: ['아이들이', '아이들가', '아이들을'],
        correct: '아이들이',
      },
      {
        options: ['놀이공원에', '놀이공원에서', '놀이공원까지'],
        correct: '놀이공원에',
      },
      {
        options: ['가고', '살려고', '운동하고'],
        correct: '가고',
      },
      {
        options: ['싶어', '찍어', '입어'],
        correct: '싶어',
      },
      {
        options: ['해요.', '이야기해요.', '도착해요.'],
        correct: '해요.',
      },
    ],
    {
      uz: 'Bolalar attraksionlar bog‘iga borishni xohlaydi.',
      en: 'The children want to go to an amusement park.',
      ru: 'Дети хотят пойти в парк развлечений.',
    },
  ),

  ...build(
    'gp_s2_u6_g24_15',
    G24,
    [
      {
        options: ['친구가', '친구이', '친구를'],
        correct: '친구가',
      },
      {
        options: ['한국', '은행', '잃어버린'],
        correct: '한국',
      },
      {
        options: ['음식을', '음식를', '음식은'],
        correct: '음식을',
      },
      {
        options: ['먹고', '운동하고', '찍으려고'],
        correct: '먹고',
      },
      {
        options: ['싶어', '읽어', '영어'],
        correct: '싶어',
      },
      {
        options: ['해요.', '잘해요.', '시작해요.'],
        correct: '해요.',
      },
    ],
    {
      uz: 'Do‘stim koreys taomini yemoqchi.',
      en: 'My friend wants to eat Korean food.',
      ru: 'Мой друг хочет поесть корейской еды.',
    },
  ),

  ...build(
    'gp_s2_u6_g24_16',
    G24,
    [
      {
        options: ['제', '저', '내'],
        correct: '제',
      },
      {
        options: ['친구는', '친구은', '친구를'],
        correct: '친구는',
      },
      {
        options: ['서울에서', '서울에', '서울까지'],
        correct: '서울에서',
      },
      {
        options: ['살고', '춥고', '나가고'],
        correct: '살고',
      },
      {
        options: ['싶어', '찍어', '입어'],
        correct: '싶어',
      },
      {
        options: ['해요.', '출발해요.', '일해요.'],
        correct: '해요.',
      },
    ],
    {
      uz: 'Do‘stim Seulda yashashni xohlaydi.',
      en: 'My friend wants to live in Seoul.',
      ru: 'Мой друг хочет жить в Сеуле.',
    },
  ),

  ...build(
    'gp_s2_u6_g24_17',
    G24,
    [
      {
        options: ['마리아', '번', '볼'],
        correct: '마리아',
      },
      {
        options: ['씨는', '씨은', '씨를'],
        correct: '씨는',
      },
      {
        options: ['한국어를', '한국어을', '한국어는'],
        correct: '한국어를',
      },
      {
        options: ['더', '탈', '할머니께'],
        correct: '더',
      },
      {
        options: ['배우고', '먹으려고', '샤워하고'],
        correct: '배우고',
      },
      {
        options: ['싶어', '들어', '한국어'],
        correct: '싶어',
      },
      {
        options: ['해요.', '이야기해요.', '도착해요.'],
        correct: '해요.',
      },
    ],
    {
      uz: 'Mariya koreys tilini ko‘proq o‘rganishni xohlaydi.',
      en: 'Maria wants to learn more Korean.',
      ru: 'Мария хочет больше изучать корейский язык.',
    },
  ),

  ...build(
    'gp_s2_u6_g24_18',
    G24,
    [
      {
        options: ['동생은', '동생는', '동생을'],
        correct: '동생은',
      },
      {
        options: ['새', '그릇', '누구의'],
        correct: '새',
      },
      {
        options: ['카메라를', '카메라을', '카메라는'],
        correct: '카메라를',
      },
      {
        options: ['사고', '여행하고', '저하고'],
        correct: '사고',
      },
      {
        options: ['싶어', '먹어', '들어'],
        correct: '싶어',
      },
      {
        options: ['해요.', '조용해요.', '운동해요.'],
        correct: '해요.',
      },
    ],
    {
      uz: 'Ukam yangi kamera sotib olmoqchi.',
      en: 'My younger sibling wants to buy a new camera.',
      ru: 'Мой младший брат или сестра хочет купить новую камеру.',
    },
  ),

  ...build(
    'gp_s2_u6_g24_19',
    G24,
    [
      {
        options: ['어제', '뭐', '병원'],
        correct: '어제',
      },
      {
        options: ['민수', '선생님의', '시'],
        correct: '민수',
      },
      {
        options: ['씨가', '씨이', '씨를'],
        correct: '씨가',
      },
      {
        options: ['집에서', '집에', '집까지'],
        correct: '집에서',
      },
      {
        options: ['쉬고', '잘하고', '가고'],
        correct: '쉬고',
      },
      {
        options: ['싶어', '들어', '한국어'],
        correct: '싶어',
      },
      {
        options: ['했어요.', '탔어요.', '드렸어요.'],
        correct: '했어요.',
      },
    ],
    {
      uz: 'Kecha Minsu uyda dam olishni xohlagan edi.',
      en: 'Yesterday, Minsu wanted to rest at home.',
      ru: 'Вчера Минсу хотел отдохнуть дома.',
    },
  ),

  ...build(
    'gp_s2_u6_g24_20',
    G24,
    [
      {
        options: ['부모님은', '부모님는', '부모님을'],
        correct: '부모님은',
      },
      {
        options: ['저하고', '친구하고', '넓고'],
        correct: '저하고',
      },
      {
        options: ['같이', '따뜻한', '먼저'],
        correct: '같이',
      },
      {
        options: ['여행하고', '먹고', '살고'],
        correct: '여행하고',
      },
      {
        options: ['싶어', '입어', '읽어'],
        correct: '싶어',
      },
      {
        options: ['하세요.', '일어나세요.', '기다리세요.'],
        correct: '하세요.',
      },
    ],
    {
      uz: 'Ota-onam men bilan birga sayohat qilishni xohlashadi.',
      en: 'My parents want to travel with me.',
      ru: 'Мои родители хотят путешествовать вместе со мной.',
    },
  ),
};

// ═══════════════════════════════════════════════════════════
// UNIT 7
// 모임 · 약속 · 목적 · 동시 행동
// ═══════════════════════════════════════════════════════════

// ─────────────────────────────────────────────
// 문법 25. V-(으)ㄹ 수 있다[없다]
// ─────────────────────────────────────────────
const G25 = 'ability-eul-su-itda';

const G25_Q = {
  // grammar_blank 10
  ...blank(
    'gp_s2_u7_g25_01',
    G25,
    '오늘 저녁에 우리 집에 올 수 있어요?',
    '올 수 있어요',
    {
      uz: 'Bugun kechqurun biznikiga kela olasizmi?',
      en: 'Can you come to my house this evening?',
      ru: 'Вы можете прийти ко мне сегодня вечером?',
    },
  ),

  ...blank(
    'gp_s2_u7_g25_02',
    G25,
    '저는 한국어로 조금 말할 수 있어요.',
    '말할 수 있어요',
    {
      uz: 'Men koreys tilida ozgina gapira olaman.',
      en: 'I can speak a little Korean.',
      ru: 'Я могу немного говорить по-корейски.',
    },
  ),

  ...blank(
    'gp_s2_u7_g25_03',
    G25,
    '오늘은 일이 있어서 모임에 갈 수 없어요.',
    '갈 수 없어요',
    {
      uz: 'Bugun ishim borligi uchun uchrashuvga bora olmayman.',
      en: 'I cannot go to the gathering today because I have work.',
      ru: 'Сегодня я не могу пойти на встречу, потому что занят.',
    },
  ),

  ...blank(
    'gp_s2_u7_g25_04',
    G25,
    '이 음식은 매워도 먹을 수 있어요.',
    '먹을 수 있어요',
    {
      uz: 'Bu taom achchiq bo‘lsa ham yeya olaman.',
      en: 'I can eat this food even though it is spicy.',
      ru: 'Я могу есть это блюдо, даже если оно острое.',
    },
  ),

  ...blank(
    'gp_s2_u7_g25_05',
    G25,
    '여기에서 카드로 계산할 수 있어요.',
    '계산할 수 있어요',
    {
      uz: 'Bu yerda karta bilan to‘lash mumkin.',
      en: 'You can pay by card here.',
      ru: 'Здесь можно оплатить картой.',
    },
  ),

  ...blank(
    'gp_s2_u7_g25_06',
    G25,
    '이 버스를 타면 서울역에 갈 수 있어요.',
    '갈 수 있어요',
    {
      uz: 'Bu avtobusga chiqsangiz, Seul vokzaliga bora olasiz.',
      en: 'If you take this bus, you can get to Seoul Station.',
      ru: 'Если сядете на этот автобус, сможете доехать до вокзала Сеул.',
    },
  ),

  ...blank(
    'gp_s2_u7_g25_07',
    G25,
    '도서관에서는 음식을 먹을 수 없어요.',
    '먹을 수 없어요',
    {
      uz: 'Kutubxonada ovqat yeyish mumkin emas.',
      en: 'You cannot eat in the library.',
      ru: 'В библиотеке нельзя есть.',
    },
  ),

  ...blank(
    'gp_s2_u7_g25_08',
    G25,
    '저는 자전거를 탈 수 있어요.',
    '탈 수 있어요',
    {
      uz: 'Men velosiped mina olaman.',
      en: 'I can ride a bicycle.',
      ru: 'Я умею ездить на велосипеде.',
    },
  ),

  ...blank(
    'gp_s2_u7_g25_09',
    G25,
    '지금은 바빠서 오래 이야기할 수 없어요.',
    '이야기할 수 없어요',
    {
      uz: 'Hozir bandman, uzoq gaplasha olmayman.',
      en: 'I am busy now, so I cannot talk for long.',
      ru: 'Сейчас я занят, поэтому не могу долго разговаривать.',
    },
  ),

  ...blank(
    'gp_s2_u7_g25_10',
    G25,
    '주말에는 늦게까지 같이 있을 수 있어요.',
    '있을 수 있어요',
    {
      uz: 'Dam olish kunlari kechgacha birga bo‘la olaman.',
      en: 'I can stay together until late on the weekend.',
      ru: 'На выходных я могу остаться допоздна.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s2_u7_g25_11',
    G25,
    [
      {
        options: ['오늘', '건물', '귤'],
        correct: '오늘',
      },
      {
        options: ['저녁에', '저녁에서', '저녁까지'],
        correct: '저녁에',
      },
      {
        options: ['우리', '많이', '무슨'],
        correct: '우리',
      },
      {
        options: ['집에', '집에서', '집까지'],
        correct: '집에',
      },
      {
        options: ['올', '시간', '아브로르'],
        correct: '올',
      },
      {
        options: ['수', '쭉', '큰'],
        correct: '수',
      },
      {
        options: ['있어요?', '크네요.', '했어요.'],
        correct: '있어요?',
      },
    ],
    {
      uz: 'Bugun kechqurun biznikiga kela olasizmi?',
      en: 'Can you come to my house this evening?',
      ru: 'Вы можете прийти ко мне сегодня вечером?',
    },
  ),

  ...build(
    'gp_s2_u7_g25_12',
    G25,
    [
      {
        options: ['저는', '저은', '저를'],
        correct: '저는',
      },
      {
        options: ['한국어로', '한국어에', '한국어에서'],
        correct: '한국어로',
      },
      {
        options: ['말할', '물', '벌써'],
        correct: '말할',
      },
      {
        options: ['수', '올', '이건'],
        correct: '수',
      },
      {
        options: ['있어요.', '읽었어요.', '질문했어요.'],
        correct: '있어요.',
      },
    ],
    {
      uz: 'Men koreys tilida gapira olaman.',
      en: 'I can speak Korean.',
      ru: 'Я могу говорить по-корейски.',
    },
  ),

  ...build(
    'gp_s2_u7_g25_13',
    G25,
    [
      {
        options: ['오늘은', '오늘는', '오늘을'],
        correct: '오늘은',
      },
      {
        options: ['일이', '일가', '일을'],
        correct: '일이',
      },
      {
        options: ['있어서', '타서', '바빠서'],
        correct: '있어서',
      },
      {
        options: ['모임에', '모임에서', '모임까지'],
        correct: '모임에',
      },
      {
        options: ['갈', '다시', '말할'],
        correct: '갈',
      },
      {
        options: ['수', '이건', '자야'],
        correct: '수',
      },
      {
        options: ['없어요.', '먹어요.', '빌렸어요.'],
        correct: '없어요.',
      },
    ],
    {
      uz: 'Bugun ishim borligi uchun uchrashuvga bora olmayman.',
      en: 'I cannot go to the gathering today because I have work.',
      ru: 'Сегодня я не могу пойти на встречу, потому что занят.',
    },
  ),

  ...build(
    'gp_s2_u7_g25_14',
    G25,
    [
      {
        options: ['이', '그', '저'],
        correct: '이',
      },
      {
        options: ['음식을', '음식를', '음식은'],
        correct: '음식을',
      },
      {
        options: ['먹을', '좋은', '아는'],
        correct: '먹을',
      },
      {
        options: ['수', '병', '빵'],
        correct: '수',
      },
      {
        options: ['있어요.', '왔어요.', '잤어요.'],
        correct: '있어요.',
      },
    ],
    {
      uz: 'Bu taomni yeya olaman.',
      en: 'I can eat this food.',
      ru: 'Я могу есть это блюдо.',
    },
  ),

  ...build(
    'gp_s2_u7_g25_15',
    G25,
    [
      {
        options: ['여기에서', '여기에', '여기까지'],
        correct: '여기에서',
      },
      {
        options: ['카드로', '카드에', '카드에서'],
        correct: '카드로',
      },
      {
        options: ['계산할', '귤', '내일'],
        correct: '계산할',
      },
      {
        options: ['수', '아메리카노', '어제'],
        correct: '수',
      },
      {
        options: ['있어요.', '요리했어요.', '재미있어요.'],
        correct: '있어요.',
      },
    ],
    {
      uz: 'Bu yerda karta bilan to‘lash mumkin.',
      en: 'You can pay by card here.',
      ru: 'Здесь можно оплатить картой.',
    },
  ),

  ...build(
    'gp_s2_u7_g25_16',
    G25,
    [
      {
        options: ['이', '그', '저'],
        correct: '이',
      },
      {
        options: ['버스를', '버스을', '버스는'],
        correct: '버스를',
      },
      {
        options: ['타면', '고프면', '어려우면'],
        correct: '타면',
      },
      {
        options: ['서울역에', '서울역에서', '서울역까지'],
        correct: '서울역에',
      },
      {
        options: ['갈', '영수증', '와야'],
        correct: '갈',
      },
      {
        options: ['수', '민수', '볼'],
        correct: '수',
      },
      {
        options: ['있어요.', '드렸어요.', '먹었어요.'],
        correct: '있어요.',
      },
    ],
    {
      uz: 'Bu avtobusga chiqsangiz, Seul vokzaliga bora olasiz.',
      en: 'If you take this bus, you can get to Seoul Station.',
      ru: 'Если сядете на этот автобус, сможете доехать до вокзала Сеул.',
    },
  ),

  ...build(
    'gp_s2_u7_g25_17',
    G25,
    [
      {
        options: ['도서관에서는', '도서관에서도', '도서관에서만'],
        correct: '도서관에서는',
      },
      {
        options: ['음식을', '음식를', '음식은'],
        correct: '음식을',
      },
      {
        options: ['먹을', '있을', '만드는'],
        correct: '먹을',
      },
      {
        options: ['수', '깨끗한', '더'],
        correct: '수',
      },
      {
        options: ['없어요.', '재미있어요.', '가셨어요.'],
        correct: '없어요.',
      },
    ],
    {
      uz: 'Kutubxonada ovqat yeyish mumkin emas.',
      en: 'You cannot eat in the library.',
      ru: 'В библиотеке нельзя есть.',
    },
  ),

  ...build(
    'gp_s2_u7_g25_18',
    G25,
    [
      {
        options: ['저는', '저은', '저를'],
        correct: '저는',
      },
      {
        options: ['자전거를', '자전거을', '자전거는'],
        correct: '자전거를',
      },
      {
        options: ['탈', '마셔야', '메뉴'],
        correct: '탈',
      },
      {
        options: ['수', '비빔밥', '새'],
        correct: '수',
      },
      {
        options: ['있어요.', '만들었어요.', '봤어요.'],
        correct: '있어요.',
      },
    ],
    {
      uz: 'Men velosiped mina olaman.',
      en: 'I can ride a bicycle.',
      ru: 'Я умею ездить на велосипеде.',
    },
  ),

  ...build(
    'gp_s2_u7_g25_19',
    G25,
    [
      {
        options: ['지금은', '지금는', '지금을'],
        correct: '지금은',
      },
      {
        options: ['바빠서', '일어나서', '걸으면서'],
        correct: '바빠서',
      },
      {
        options: ['오래', '분', '삼십'],
        correct: '오래',
      },
      {
        options: ['이야기할', '오늘', '우리'],
        correct: '이야기할',
      },
      {
        options: ['수', '모임', '밤'],
        correct: '수',
      },
      {
        options: ['없어요.', '탔어요.', '도와줬어요.'],
        correct: '없어요.',
      },
    ],
    {
      uz: 'Hozir bandman, uzoq gaplasha olmayman.',
      en: 'I am busy now, so I cannot talk for long.',
      ru: 'Сейчас я занят, поэтому не могу долго разговаривать.',
    },
  ),

  ...build(
    'gp_s2_u7_g25_20',
    G25,
    [
      {
        options: ['주말에는', '주말에도', '주말에만'],
        correct: '주말에는',
      },
      {
        options: ['늦게까지', '늦게부터', '늦게에서'],
        correct: '늦게까지',
      },
      {
        options: ['같이', '일찍', '저기'],
        correct: '같이',
      },
      {
        options: ['있을', '작은', '먹을'],
        correct: '있을',
      },
      {
        options: ['수', '개', '교장'],
        correct: '수',
      },
      {
        options: ['있어요.', '빌렸어요.', '열어요.'],
        correct: '있어요.',
      },
    ],
    {
      uz: 'Dam olish kunlari kechgacha birga bo‘la olaman.',
      en: 'I can stay together until late on the weekend.',
      ru: 'На выходных я могу остаться допоздна.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 26. V-(으)ㄹ게요
// ─────────────────────────────────────────────
const G26 = 'promise-eulgeyo';

const G26_Q = {
  // grammar_blank 10
  ...blank('gp_s2_u7_g26_01', G26, '제가 음료수를 준비할게요.', '준비할게요', {
    uz: 'Ichimliklarni men tayyorlayman.',
    en: "I'll prepare the drinks.",
    ru: 'Я приготовлю напитки.',
  }),

  ...blank('gp_s2_u7_g26_02', G26, '제가 먼저 갈게요.', '갈게요', {
    uz: 'Men birinchi bo‘lib ketaman.',
    en: "I'll go first.",
    ru: 'Я пойду первым.',
  }),

  ...blank('gp_s2_u7_g26_03', G26, '내일 다시 전화할게요.', '전화할게요', {
    uz: 'Ertaga yana qo‘ng‘iroq qilaman.',
    en: "I'll call again tomorrow.",
    ru: 'Я позвоню ещё раз завтра.',
  }),

  ...blank(
    'gp_s2_u7_g26_04',
    G26,
    '무거우면 제가 들어 줄게요.',
    '들어 줄게요',
    {
      uz: 'Og‘ir bo‘lsa, men ko‘tarib beraman.',
      en: "If it's heavy, I'll carry it for you.",
      ru: 'Если тяжело, я понесу.',
    },
  ),

  ...blank('gp_s2_u7_g26_05', G26, '집들이 선물은 제가 살게요.', '살게요', {
    uz: 'Uyga ko‘chish sovg‘asini men sotib olaman.',
    en: "I'll buy the housewarming gift.",
    ru: 'Подарок на новоселье куплю я.',
  }),

  ...blank(
    'gp_s2_u7_g26_06',
    G26,
    '모임 장소를 제가 알아볼게요.',
    '알아볼게요',
    {
      uz: 'Uchrashuv joyini men topib ko‘raman.',
      en: "I'll look for a place for the gathering.",
      ru: 'Я поищу место для встречи.',
    },
  ),

  ...blank(
    'gp_s2_u7_g26_07',
    G26,
    '제가 친구들에게 메시지를 보낼게요.',
    '보낼게요',
    {
      uz: 'Do‘stlarga xabarni men yuboraman.',
      en: "I'll send a message to our friends.",
      ru: 'Я отправлю друзьям сообщение.',
    },
  ),

  ...blank(
    'gp_s2_u7_g26_08',
    G26,
    '잠깐만 기다리세요. 제가 문을 열게요.',
    '열게요',
    {
      uz: 'Bir oz kuting. Eshikni men ochaman.',
      en: "Wait a moment. I'll open the door.",
      ru: 'Подождите немного. Я открою дверь.',
    },
  ),

  ...blank('gp_s2_u7_g26_09', G26, '그럼 제가 음식 값을 낼게요.', '낼게요', {
    uz: 'Unda ovqat pulini men to‘layman.',
    en: "Then I'll pay for the food.",
    ru: 'Тогда я заплачу за еду.',
  }),

  ...blank('gp_s2_u7_g26_10', G26, '늦지 않게 일찍 올게요.', '올게요', {
    uz: 'Kechikmaslik uchun erta kelaman.',
    en: "I'll come early so I won't be late.",
    ru: 'Я приду пораньше, чтобы не опоздать.',
  }),

  // grammar_build 10
  ...build(
    'gp_s2_u7_g26_11',
    G26,
    [
      {
        options: ['제가', '제이', '제를'],
        correct: '제가',
      },
      {
        options: ['음료수를', '음료수을', '음료수는'],
        correct: '음료수를',
      },
      {
        options: ['준비할게요.', '보낼게요.', '낼게요.'],
        correct: '준비할게요.',
      },
    ],
    {
      uz: 'Ichimliklarni men tayyorlayman.',
      en: "I'll prepare the drinks.",
      ru: 'Я приготовлю напитки.',
    },
  ),

  ...build(
    'gp_s2_u7_g26_12',
    G26,
    [
      {
        options: ['제가', '제이', '제를'],
        correct: '제가',
      },
      {
        options: ['먼저', '버스', '분'],
        correct: '먼저',
      },
      {
        options: ['갈게요.', '준비할게요.', '전화할게요.'],
        correct: '갈게요.',
      },
    ],
    {
      uz: 'Men birinchi bo‘lib ketaman.',
      en: "I'll go first.",
      ru: 'Я пойду первым.',
    },
  ),

  ...build(
    'gp_s2_u7_g26_13',
    G26,
    [
      {
        options: ['내일', '마셔야', '메뉴'],
        correct: '내일',
      },
      {
        options: ['다시', '아픈', '오늘'],
        correct: '다시',
      },
      {
        options: ['전화할게요.', '살게요.', '보낼게요.'],
        correct: '전화할게요.',
      },
    ],
    {
      uz: 'Ertaga yana qo‘ng‘iroq qilaman.',
      en: "I'll call again tomorrow.",
      ru: 'Я позвоню ещё раз завтра.',
    },
  ),

  ...build(
    'gp_s2_u7_g26_14',
    G26,
    [
      {
        options: ['무거우면', '싸면', '고프면'],
        correct: '무거우면',
      },
      {
        options: ['제가', '제이', '제를'],
        correct: '제가',
      },
      {
        options: ['들어', '읽어', '영어'],
        correct: '들어',
      },
      {
        options: ['줄게요.', '준비할게요.', '전화할게요.'],
        correct: '줄게요.',
      },
    ],
    {
      uz: 'Og‘ir bo‘lsa, men ko‘tarib beraman.',
      en: "If it's heavy, I'll carry it for you.",
      ru: 'Если тяжело, я понесу.',
    },
  ),

  ...build(
    'gp_s2_u7_g26_15',
    G26,
    [
      {
        options: ['집들이', '집들가', '집들을'],
        correct: '집들이',
      },
      {
        options: ['선물은', '선물는', '선물을'],
        correct: '선물은',
      },
      {
        options: ['제가', '제이', '제를'],
        correct: '제가',
      },
      {
        options: ['살게요.', '전화할게요.', '올게요.'],
        correct: '살게요.',
      },
    ],
    {
      uz: 'Uyga ko‘chish sovg‘asini men sotib olaman.',
      en: "I'll buy the housewarming gift.",
      ru: 'Подарок на новоселье куплю я.',
    },
  ),

  ...build(
    'gp_s2_u7_g26_16',
    G26,
    [
      {
        options: ['모임', '긴', '다른'],
        correct: '모임',
      },
      {
        options: ['장소를', '장소을', '장소는'],
        correct: '장소를',
      },
      {
        options: ['제가', '제이', '제를'],
        correct: '제가',
      },
      {
        options: ['알아볼게요.', '줄게요.', '준비할게요.'],
        correct: '알아볼게요.',
      },
    ],
    {
      uz: 'Uchrashuv joyini men topib ko‘raman.',
      en: "I'll look for a place for the gathering.",
      ru: 'Я поищу место для встречи.',
    },
  ),

  ...build(
    'gp_s2_u7_g26_17',
    G26,
    [
      {
        options: ['제가', '제이', '제를'],
        correct: '제가',
      },
      {
        options: ['친구들에게', '친구들한테', '친구들에서'],
        correct: '친구들에게',
      },
      {
        options: ['메시지를', '메시지을', '메시지는'],
        correct: '메시지를',
      },
      {
        options: ['보낼게요.', '준비할게요.', '전화할게요.'],
        correct: '보낼게요.',
      },
    ],
    {
      uz: 'Do‘stlarga xabarni men yuboraman.',
      en: "I'll send a message to our friends.",
      ru: 'Я отправлю друзьям сообщение.',
    },
  ),

  ...build(
    'gp_s2_u7_g26_18',
    G26,
    [
      {
        options: ['잠깐만', '잠깐도', '잠깐까지'],
        correct: '잠깐만',
      },
      {
        options: ['기다리세요.', '바쁘세요.', '읽으세요.'],
        correct: '기다리세요.',
      },
      {
        options: ['제가', '제이', '제를'],
        correct: '제가',
      },
      {
        options: ['문을', '문를', '문은'],
        correct: '문을',
      },
      {
        options: ['열게요.', '낼게요.', '갈게요.'],
        correct: '열게요.',
      },
    ],
    {
      uz: 'Bir oz kuting. Eshikni men ochaman.',
      en: "Wait a moment. I'll open the door.",
      ru: 'Подождите немного. Я открою дверь.',
    },
  ),

  ...build(
    'gp_s2_u7_g26_19',
    G26,
    [
      {
        options: ['그럼', '다른', '많이'],
        correct: '그럼',
      },
      {
        options: ['제가', '제이', '제를'],
        correct: '제가',
      },
      {
        options: ['음식', '항상', '같이'],
        correct: '음식',
      },
      {
        options: ['값을', '값를', '값은'],
        correct: '값을',
      },
      {
        options: ['낼게요.', '전화할게요.', '올게요.'],
        correct: '낼게요.',
      },
    ],
    {
      uz: 'Unda ovqat pulini men to‘layman.',
      en: "Then I'll pay for the food.",
      ru: 'Тогда я заплачу за еду.',
    },
  ),

  ...build(
    'gp_s2_u7_g26_20',
    G26,
    [
      {
        options: ['늦지', '좋은지', '운동하지'],
        correct: '늦지',
      },
      {
        options: ['않게', '시간', '싸면'],
        correct: '않게',
      },
      {
        options: ['일찍', '생일', '쉬어야'],
        correct: '일찍',
      },
      {
        options: ['올게요.', '갈게요.', '줄게요.'],
        correct: '올게요.',
      },
    ],
    {
      uz: 'Kechikmaslik uchun erta kelaman.',
      en: "I'll come early so I won't be late.",
      ru: 'Я приду пораньше, чтобы не опоздать.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 27. V-(으)러 가다[오다]
// ─────────────────────────────────────────────
const G27 = 'purpose-eureo-gada';

const G27_Q = {
  // grammar_blank 10
  ...blank('gp_s2_u7_g27_01', G27, '친구를 만나러 카페에 가요.', '만나러', {
    uz: 'Do‘stim bilan uchrashish uchun kafega boraman.',
    en: 'I go to a cafe to meet my friend.',
    ru: 'Я иду в кафе встретиться с другом.',
  }),

  ...blank('gp_s2_u7_g27_02', G27, '친구가 우리 집에 놀러 와요.', '놀러', {
    uz: 'Do‘stim biznikiga mehmonga keladi.',
    en: 'My friend comes over to hang out.',
    ru: 'Мой друг приходит ко мне в гости.',
  }),

  ...blank('gp_s2_u7_g27_03', G27, '점심을 먹으러 식당에 갔어요.', '먹으러', {
    uz: 'Tushlik qilish uchun restoranga bordim.',
    en: 'I went to a restaurant to eat lunch.',
    ru: 'Я пошёл в ресторан пообедать.',
  }),

  ...blank(
    'gp_s2_u7_g27_04',
    G27,
    '집들이 선물을 사러 백화점에 가요.',
    '사러',
    {
      uz: 'Uyga ko‘chish sovg‘asini sotib olish uchun univermagga boraman.',
      en: 'I am going to the department store to buy a housewarming gift.',
      ru: 'Я иду в универмаг купить подарок на новоселье.',
    },
  ),

  ...blank(
    'gp_s2_u7_g27_05',
    G27,
    '한국어를 공부하러 한국에 왔어요.',
    '공부하러',
    {
      uz: 'Koreys tilini o‘rganish uchun Koreyaga keldim.',
      en: 'I came to Korea to study Korean.',
      ru: 'Я приехал в Корею изучать корейский язык.',
    },
  ),

  ...blank('gp_s2_u7_g27_06', G27, '영화를 보러 극장에 갈 거예요.', '보러', {
    uz: 'Film ko‘rish uchun kinoteatrga boraman.',
    en: 'I will go to the theater to watch a movie.',
    ru: 'Я пойду в кинотеатр посмотреть фильм.',
  }),

  ...blank('gp_s2_u7_g27_07', G27, '책을 읽으러 도서관에 왔어요.', '읽으러', {
    uz: 'Kitob o‘qish uchun kutubxonaga keldim.',
    en: 'I came to the library to read.',
    ru: 'Я пришёл в библиотеку почитать.',
  }),

  ...blank('gp_s2_u7_g27_08', G27, '친구가 저를 도와주러 왔어요.', '도와주러', {
    uz: 'Do‘stim menga yordam berish uchun keldi.',
    en: 'My friend came to help me.',
    ru: 'Мой друг пришёл помочь мне.',
  }),

  ...blank('gp_s2_u7_g27_09', G27, '주말에 쉬러 산에 가요.', '쉬러', {
    uz: 'Dam olish kunlari hordiq chiqarish uchun tog‘ga boraman.',
    en: 'I go to the mountains to relax on weekends.',
    ru: 'На выходных я еду в горы отдохнуть.',
  }),

  ...blank(
    'gp_s2_u7_g27_10',
    G27,
    '잃어버린 가방을 찾으러 경찰서에 갔어요.',
    '찾으러',
    {
      uz: 'Yo‘qolgan sumkamni topish uchun politsiya bo‘limiga bordim.',
      en: 'I went to the police station to look for my lost bag.',
      ru: 'Я пошёл в полицию искать потерянную сумку.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s2_u7_g27_11',
    G27,
    [
      {
        options: ['친구를', '친구을', '친구는'],
        correct: '친구를',
      },
      {
        options: ['만나러', '찾으러', '읽으러'],
        correct: '만나러',
      },
      {
        options: ['카페에', '카페에서', '카페까지'],
        correct: '카페에',
      },
      {
        options: ['가요.', '갈게요.', '계속돼요.'],
        correct: '가요.',
      },
    ],
    {
      uz: 'Do‘stim bilan uchrashish uchun kafega boraman.',
      en: 'I go to a cafe to meet my friend.',
      ru: 'Я иду в кафе встретиться с другом.',
    },
  ),

  ...build(
    'gp_s2_u7_g27_12',
    G27,
    [
      {
        options: ['친구가', '친구이', '친구를'],
        correct: '친구가',
      },
      {
        options: ['우리', '꼭', '더운'],
        correct: '우리',
      },
      {
        options: ['집에', '집에서', '집까지'],
        correct: '집에',
      },
      {
        options: ['놀러', '찾으러', '읽으러'],
        correct: '놀러',
      },
      {
        options: ['와요.', '가벼워요.', '걸려요.'],
        correct: '와요.',
      },
    ],
    {
      uz: 'Do‘stim biznikiga mehmonga keladi.',
      en: 'My friend comes over to hang out.',
      ru: 'Мой друг приходит ко мне в гости.',
    },
  ),

  ...build(
    'gp_s2_u7_g27_13',
    G27,
    [
      {
        options: ['점심을', '점심를', '점심은'],
        correct: '점심을',
      },
      {
        options: ['먹으러', '보러', '만나러'],
        correct: '먹으러',
      },
      {
        options: ['식당에', '식당에서', '식당까지'],
        correct: '식당에',
      },
      {
        options: ['갔어요.', '질문했어요.', '기다렸어요.'],
        correct: '갔어요.',
      },
    ],
    {
      uz: 'Tushlik qilish uchun restoranga bordim.',
      en: 'I went to a restaurant to eat lunch.',
      ru: 'Я пошёл в ресторан пообедать.',
    },
  ),

  ...build(
    'gp_s2_u7_g27_14',
    G27,
    [
      {
        options: ['집들이', '집들가', '집들을'],
        correct: '집들이',
      },
      {
        options: ['선물을', '선물를', '선물은'],
        correct: '선물을',
      },
      {
        options: ['사러', '쉬러', '보러'],
        correct: '사러',
      },
      {
        options: ['백화점에', '백화점에서', '백화점까지'],
        correct: '백화점에',
      },
      {
        options: ['가요.', '해요.', '갑니다.'],
        correct: '가요.',
      },
    ],
    {
      uz: 'Uyga ko‘chish sovg‘asini sotib olish uchun univermagga boraman.',
      en: 'I am going to the department store to buy a housewarming gift.',
      ru: 'Я иду в универмаг купить подарок на новоселье.',
    },
  ),

  ...build(
    'gp_s2_u7_g27_15',
    G27,
    [
      {
        options: ['한국어를', '한국어을', '한국어는'],
        correct: '한국어를',
      },
      {
        options: ['공부하러', '사러', '보러'],
        correct: '공부하러',
      },
      {
        options: ['한국에', '한국에서', '한국까지'],
        correct: '한국에',
      },
      {
        options: ['왔어요.', '없어요.', '입었어요.'],
        correct: '왔어요.',
      },
    ],
    {
      uz: 'Koreys tilini o‘rganish uchun Koreyaga keldim.',
      en: 'I came to Korea to study Korean.',
      ru: 'Я приехал в Корею изучать корейский язык.',
    },
  ),

  ...build(
    'gp_s2_u7_g27_16',
    G27,
    [
      {
        options: ['영화를', '영화을', '영화는'],
        correct: '영화를',
      },
      {
        options: ['보러', '만나러', '도와주러'],
        correct: '보러',
      },
      {
        options: ['극장에', '극장에서', '극장까지'],
        correct: '극장에',
      },
      {
        options: ['갈', '번', '비빔밥'],
        correct: '갈',
      },
      {
        options: ['거', '거가', '거를'],
        correct: '거',
      },
      {
        options: ['예요.', '이에요.', '입니다.'],
        correct: '예요.',
        glue: true,
      },
    ],
    {
      uz: 'Film ko‘rish uchun kinoteatrga boraman.',
      en: 'I will go to the theater to watch a movie.',
      ru: 'Я пойду в кинотеатр посмотреть фильм.',
    },
  ),

  ...build(
    'gp_s2_u7_g27_17',
    G27,
    [
      {
        options: ['책을', '책를', '책은'],
        correct: '책을',
      },
      {
        options: ['읽으러', '먹으러', '만나러'],
        correct: '읽으러',
      },
      {
        options: ['도서관에', '도서관에서', '도서관까지'],
        correct: '도서관에',
      },
      {
        options: ['왔어요.', '주셨어요.', '걸렸어요.'],
        correct: '왔어요.',
      },
    ],
    {
      uz: 'Kitob o‘qish uchun kutubxonaga keldim.',
      en: 'I came to the library to read.',
      ru: 'Я пришёл в библиотеку почитать.',
    },
  ),

  ...build(
    'gp_s2_u7_g27_18',
    G27,
    [
      {
        options: ['친구가', '친구이', '친구를'],
        correct: '친구가',
      },
      {
        options: ['저를', '저을', '저는'],
        correct: '저를',
      },
      {
        options: ['도와주러', '읽으러', '쉬러'],
        correct: '도와주러',
      },
      {
        options: ['왔어요.', '마셨어요.', '배웠어요.'],
        correct: '왔어요.',
      },
    ],
    {
      uz: 'Do‘stim menga yordam berish uchun keldi.',
      en: 'My friend came to help me.',
      ru: 'Мой друг пришёл помочь мне.',
    },
  ),

  ...build(
    'gp_s2_u7_g27_19',
    G27,
    [
      {
        options: ['주말에', '주말에서', '주말까지'],
        correct: '주말에',
      },
      {
        options: ['쉬러', '보러', '먹으러'],
        correct: '쉬러',
      },
      {
        options: ['산에', '산에서', '산까지'],
        correct: '산에',
      },
      {
        options: ['가요.', '잤어요.', '좋아요?'],
        correct: '가요.',
      },
    ],
    {
      uz: 'Dam olish kunlari hordiq chiqarish uchun tog‘ga boraman.',
      en: 'I go to the mountains to relax on weekends.',
      ru: 'На выходных я еду в горы отдохнуть.',
    },
  ),

  ...build(
    'gp_s2_u7_g27_20',
    G27,
    [
      {
        options: ['잃어버린', '큰', '한번'],
        correct: '잃어버린',
      },
      {
        options: ['가방을', '가방를', '가방은'],
        correct: '가방을',
      },
      {
        options: ['찾으러', '보러', '먹으러'],
        correct: '찾으러',
      },
      {
        options: ['경찰서에', '경찰서에서', '경찰서까지'],
        correct: '경찰서에',
      },
      {
        options: ['갔어요.', '왔어요.', '있어요.'],
        correct: '갔어요.',
      },
    ],
    {
      uz: 'Yo‘qolgan sumkamni topish uchun politsiya bo‘limiga bordim.',
      en: 'I went to the police station to look for my lost bag.',
      ru: 'Я пошёл в полицию искать потерянную сумку.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 28. V-(으)면서
// ─────────────────────────────────────────────
const G28 = 'simultaneous-eumyeonseo';

const G28_Q = {
  // grammar_blank 10
  ...blank('gp_s2_u7_g28_01', G28, '음악을 들으면서 공부해요.', '들으면서', {
    uz: 'Musiqa tinglab o‘qiyman.',
    en: 'I study while listening to music.',
    ru: 'Я занимаюсь, слушая музыку.',
  }),

  ...blank(
    'gp_s2_u7_g28_02',
    G28,
    '커피를 마시면서 친구와 이야기했어요.',
    '마시면서',
    {
      uz: 'Qahva ichib, do‘stim bilan gaplashdim.',
      en: 'I talked with my friend while drinking coffee.',
      ru: 'Я разговаривал с другом, попивая кофе.',
    },
  ),

  ...blank('gp_s2_u7_g28_03', G28, '공원을 걸으면서 이야기해요.', '걸으면서', {
    uz: 'Bog‘da yurib suhbatlashamiz.',
    en: 'We talk while walking through the park.',
    ru: 'Мы разговариваем, гуляя по парку.',
  }),

  ...blank(
    'gp_s2_u7_g28_04',
    G28,
    '텔레비전을 보면서 저녁을 먹었어요.',
    '보면서',
    {
      uz: 'Televizor ko‘rib kechki ovqat yedim.',
      en: 'I ate dinner while watching television.',
      ru: 'Я ужинал, смотря телевизор.',
    },
  ),

  ...blank('gp_s2_u7_g28_05', G28, '음악을 들으면서 요리했어요.', '들으면서', {
    uz: 'Musiqa tinglab ovqat tayyorladim.',
    en: 'I cooked while listening to music.',
    ru: 'Я готовил, слушая музыку.',
  }),

  ...blank(
    'gp_s2_u7_g28_06',
    G28,
    '차를 마시면서 손님을 기다렸어요.',
    '마시면서',
    {
      uz: 'Choy ichib mehmonlarni kutdim.',
      en: 'I waited for the guests while drinking tea.',
      ru: 'Я ждал гостей, попивая чай.',
    },
  ),

  ...blank(
    'gp_s2_u7_g28_07',
    G28,
    '사진을 보면서 여행 이야기를 했어요.',
    '보면서',
    {
      uz: 'Suratlarni ko‘rib sayohat haqida gaplashdik.',
      en: 'We talked about the trip while looking at photos.',
      ru: 'Мы говорили о поездке, рассматривая фотографии.',
    },
  ),

  ...blank(
    'gp_s2_u7_g28_08',
    G28,
    '집을 청소하면서 손님을 기다렸어요.',
    '청소하면서',
    {
      uz: 'Uyni tozalab, mehmonlarni kutdim.',
      en: 'I waited for the guests while cleaning the house.',
      ru: 'Я ждал гостей, убирая дом.',
    },
  ),

  ...blank(
    'gp_s2_u7_g28_09',
    G28,
    '친구와 이야기하면서 음식을 만들었어요.',
    '이야기하면서',
    {
      uz: 'Do‘stim bilan gaplashib ovqat tayyorladim.',
      en: 'I made food while talking with my friend.',
      ru: 'Я готовил еду, разговаривая с другом.',
    },
  ),

  ...blank(
    'gp_s2_u7_g28_10',
    G28,
    '한국에서 살면서 한국어를 배웠어요.',
    '살면서',
    {
      uz: 'Koreyada yashab, koreys tilini o‘rgandim.',
      en: 'I learned Korean while living in Korea.',
      ru: 'Я учил корейский, живя в Корее.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s2_u7_g28_11',
    G28,
    [
      {
        options: ['음악을', '음악를', '음악은'],
        correct: '음악을',
      },
      {
        options: ['들으면서', '보면서', '찍어서'],
        correct: '들으면서',
      },
      {
        options: ['공부해요.', '깨끗해요.', '조용해요.'],
        correct: '공부해요.',
      },
    ],
    {
      uz: 'Musiqa tinglab o‘qiyman.',
      en: 'I study while listening to music.',
      ru: 'Я занимаюсь, слушая музыку.',
    },
  ),

  ...build(
    'gp_s2_u7_g28_12',
    G28,
    [
      {
        options: ['커피를', '커피을', '커피는'],
        correct: '커피를',
      },
      {
        options: ['마시면서', '걸어서', '열어서'],
        correct: '마시면서',
      },
      {
        options: ['친구와', '친구하고', '친구과'],
        correct: '친구와',
      },
      {
        options: ['이야기했어요.', '샤워했어요.', '요리했어요.'],
        correct: '이야기했어요.',
      },
    ],
    {
      uz: 'Qahva ichib, do‘stim bilan gaplashdim.',
      en: 'I talked with my friend while drinking coffee.',
      ru: 'Я разговаривал с другом, попивая кофе.',
    },
  ),

  ...build(
    'gp_s2_u7_g28_13',
    G28,
    [
      {
        options: ['공원을', '공원를', '공원은'],
        correct: '공원을',
      },
      {
        options: ['걸으면서', '와서', '걸려서'],
        correct: '걸으면서',
      },
      {
        options: ['이야기해요.', '도착해요.', '출발해요.'],
        correct: '이야기해요.',
      },
    ],
    {
      uz: 'Bog‘da yurib suhbatlashamiz.',
      en: 'We talk while walking through the park.',
      ru: 'Мы разговариваем, гуляя по парку.',
    },
  ),

  ...build(
    'gp_s2_u7_g28_14',
    G28,
    [
      {
        options: ['텔레비전을', '텔레비전를', '텔레비전은'],
        correct: '텔레비전을',
      },
      {
        options: ['보면서', '있어서', '들으면서'],
        correct: '보면서',
      },
      {
        options: ['저녁을', '저녁를', '저녁은'],
        correct: '저녁을',
      },
      {
        options: ['먹었어요.', '찾았어요.', '기다렸어요.'],
        correct: '먹었어요.',
      },
    ],
    {
      uz: 'Televizor ko‘rib kechki ovqat yedim.',
      en: 'I ate dinner while watching television.',
      ru: 'Я ужинал, смотря телевизор.',
    },
  ),

  ...build(
    'gp_s2_u7_g28_15',
    G28,
    [
      {
        options: ['음악을', '음악를', '음악은'],
        correct: '음악을',
      },
      {
        options: ['들으면서', '타서', '보면서'],
        correct: '들으면서',
      },
      {
        options: ['요리했어요.', '들어요.', '물어요.'],
        correct: '요리했어요.',
      },
    ],
    {
      uz: 'Musiqa tinglab ovqat tayyorladim.',
      en: 'I cooked while listening to music.',
      ru: 'Я готовил, слушая музыку.',
    },
  ),

  ...build(
    'gp_s2_u7_g28_16',
    G28,
    [
      {
        options: ['차를', '차을', '차는'],
        correct: '차를',
      },
      {
        options: ['마시면서', '보면서', '찍어서'],
        correct: '마시면서',
      },
      {
        options: ['손님을', '손님를', '손님은'],
        correct: '손님을',
      },
      {
        options: ['기다렸어요.', '일어났어요.', '전화했어요.'],
        correct: '기다렸어요.',
      },
    ],
    {
      uz: 'Choy ichib mehmonlarni kutdim.',
      en: 'I waited for the guests while drinking tea.',
      ru: 'Я ждал гостей, попивая чай.',
    },
  ),

  ...build(
    'gp_s2_u7_g28_17',
    G28,
    [
      {
        options: ['사진을', '사진를', '사진은'],
        correct: '사진을',
      },
      {
        options: ['보면서', '찍어서', '마시면서'],
        correct: '보면서',
      },
      {
        options: ['여행', '천천히', '편한'],
        correct: '여행',
      },
      {
        options: ['이야기를', '이야기을', '이야기는'],
        correct: '이야기를',
      },
      {
        options: ['했어요.', '썼어요.', '읽었어요.'],
        correct: '했어요.',
      },
    ],
    {
      uz: 'Suratlarni ko‘rib sayohat haqida gaplashdik.',
      en: 'We talked about the trip while looking at photos.',
      ru: 'Мы говорили о поездке, рассматривая фотографии.',
    },
  ),

  ...build(
    'gp_s2_u7_g28_18',
    G28,
    [
      {
        options: ['집을', '집를', '집은'],
        correct: '집을',
      },
      {
        options: ['청소하면서', '바빠서', '있어서'],
        correct: '청소하면서',
      },
      {
        options: ['손님을', '손님를', '손님은'],
        correct: '손님을',
      },
      {
        options: ['기다렸어요.', '갔어요.', '마셨어요.'],
        correct: '기다렸어요.',
      },
    ],
    {
      uz: 'Uyni tozalab, mehmonlarni kutdim.',
      en: 'I waited for the guests while cleaning the house.',
      ru: 'Я ждал гостей, убирая дом.',
    },
  ),

  ...build(
    'gp_s2_u7_g28_19',
    G28,
    [
      {
        options: ['친구와', '친구하고', '친구과'],
        correct: '친구와',
      },
      {
        options: ['이야기하면서', '걸려서', '살면서'],
        correct: '이야기하면서',
      },
      {
        options: ['음식을', '음식를', '음식은'],
        correct: '음식을',
      },
      {
        options: ['만들었어요.', '걸어요.', '만났어요.'],
        correct: '만들었어요.',
      },
    ],
    {
      uz: 'Do‘stim bilan gaplashib ovqat tayyorladim.',
      en: 'I made food while talking with my friend.',
      ru: 'Я готовил еду, разговаривая с другом.',
    },
  ),

  ...build(
    'gp_s2_u7_g28_20',
    G28,
    [
      {
        options: ['한국에서', '한국에', '한국까지'],
        correct: '한국에서',
      },
      {
        options: ['살면서', '일어나서', '걸으면서'],
        correct: '살면서',
      },
      {
        options: ['한국어를', '한국어을', '한국어는'],
        correct: '한국어를',
      },
      {
        options: ['배웠어요.', '있어요.', '탔어요.'],
        correct: '배웠어요.',
      },
    ],
    {
      uz: 'Koreyada yashab, koreys tilini o‘rgandim.',
      en: 'I learned Korean while living in Korea.',
      ru: 'Я учил корейский, живя в Корее.',
    },
  ),
};

export const GT_S2_QUESTIONS: Record<string, any> = {
  ...G1_Q,
  ...G2_Q,
  ...G3_Q,
  ...G4_Q,

  ...G5_Q,
  ...G6_Q,
  ...G7_Q,
  ...G8_Q,

  ...G9_Q,
  ...G10_Q,
  ...G11_Q,
  ...G12_Q,

  ...G13_Q,
  ...G14_Q,
  ...G15_Q,
  ...G16_Q,

  ...G17_Q,
  ...G18_Q,
  ...G19_Q,
  ...G20_Q,

  ...G21_Q,
  ...G22_Q,
  ...G23_Q,
  ...G24_Q,

  ...G25_Q,
  ...G26_Q,
  ...G27_Q,
  ...G28_Q,
};

export const GT_S2_NODES = [
  {
    title: {
      ko: '가족과 높임말',
      uz: 'Oila va hurmat tili',
      en: 'Family and Honorifics',
      ru: 'Семья и вежливая речь',
    },
    section: 2,
    unit: 1,
    order: 1,
    category: LessonCategory.GRAMMAR,
    isActive: true,
    lessons: [
      {
        title: {
          ko: 'N(의) N',
          uz: 'N(의) N',
          en: 'N(의) N',
          ru: 'N(의) N',
        },
        description: {
          ko: '누구의 것인지 말하기',
          uz: 'Narsa kimga tegishli ekanini aytish',
          en: 'Talking about possession',
          ru: 'Говорим о принадлежности',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_2,
        order: 1,
        grammarCode: G1,
        questions: mix20('gp_s2_u1_g1'),
      },
      {
        title: {
          ko: 'N을/를 잘하다',
          uz: 'N을/를 잘하다',
          en: 'N을/를 잘하다',
          ru: 'N을/를 잘하다',
        },
        description: {
          ko: '잘하는 것과 못하는 것 말하기',
          uz: 'Nimani yaxshi yoki yomon qilishni aytish',
          en: 'Talking about skills and abilities',
          ru: 'Говорим о навыках и умениях',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_2,
        order: 2,
        grammarCode: G2,
        questions: mix20('gp_s2_u1_g2'),
      },
      {
        title: {
          ko: 'N(이)세요',
          uz: 'N(이)세요',
          en: 'N(이)세요',
          ru: 'N(이)세요',
        },
        description: {
          ko: '윗사람을 높여서 소개하기',
          uz: 'Katta odamni hurmat bilan tanishtirish',
          en: 'Introducing someone with honorifics',
          ru: 'Уважительное представление человека',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_2,
        order: 3,
        grammarCode: G3,
        questions: mix20('gp_s2_u1_g3'),
      },
      {
        title: {
          ko: 'A/V-(으)시-',
          uz: 'A/V-(으)시-',
          en: 'A/V-(으)시-',
          ru: 'A/V-(으)시-',
        },
        description: {
          ko: '윗사람의 행동과 상태를 높여 말하기',
          uz: 'Katta odamning harakati va holatini hurmat bilan aytish',
          en: 'Describing a senior respectfully',
          ru: 'Уважительно говорим о действиях старших',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_2,
        order: 4,
        grammarCode: G4,
        questions: mix20('gp_s2_u1_g4'),
      },
    ],
  },
  {
    title: {
      ko: '시간과 계획',
      uz: 'Vaqt va rejalar',
      en: 'Time and Plans',
      ru: 'Время и планы',
    },
    section: 2,
    unit: 2,
    order: 1,
    category: LessonCategory.GRAMMAR,
    isActive: true,
    lessons: [
      {
        title: {
          ko: '시간',
          uz: 'Vaqt',
          en: 'Time',
          ru: 'Время',
        },
        description: {
          ko: '시와 분을 사용해서 시간 말하기',
          uz: 'Soat va daqiqa bilan vaqtni aytish',
          en: 'Telling time with hours and minutes',
          ru: 'Говорим время с часами и минутами',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_2,
        order: 1,
        grammarCode: G5,
        questions: mix20('gp_s2_u2_g5'),
      },
      {
        title: {
          ko: 'N부터 N까지',
          uz: 'N부터 N까지',
          en: 'N부터 N까지',
          ru: 'N부터 N까지',
        },
        description: {
          ko: '시작과 끝의 범위 말하기',
          uz: 'Boshlanish va tugash oralig‘ini aytish',
          en: 'Expressing a range from start to end',
          ru: 'Выражаем диапазон от начала до конца',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_2,
        order: 2,
        grammarCode: G6,
        questions: mix20('gp_s2_u2_g6'),
      },
      {
        title: {
          ko: 'V-아서/어서',
          uz: 'V-아서/어서',
          en: 'V-아서/어서',
          ru: 'V-아서/어서',
        },
        description: {
          ko: '연결된 행동을 자연스럽게 이어 말하기',
          uz: 'Bog‘langan harakatlarni ketma-ket aytish',
          en: 'Connecting related actions',
          ru: 'Связываем последовательные действия',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_2,
        order: 3,
        grammarCode: G7,
        questions: mix20('gp_s2_u2_g7'),
      },
      {
        title: {
          ko: 'V-(으)ㄹ 거예요',
          uz: 'V-(으)ㄹ 거예요',
          en: 'V-(으)ㄹ 거예요',
          ru: 'V-(으)ㄹ 거예요',
        },
        description: {
          ko: '앞으로의 계획과 할 일 말하기',
          uz: 'Kelajakdagi reja va ishlarni aytish',
          en: 'Talking about future plans',
          ru: 'Говорим о будущих планах',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_2,
        order: 4,
        grammarCode: G8,
        questions: mix20('gp_s2_u2_g8'),
      },
    ],
  },
  {
    title: {
      ko: '건강과 생활 수칙',
      uz: 'Sog‘liq va kundalik qoidalar',
      en: 'Health and Daily Rules',
      ru: 'Здоровье и повседневные правила',
    },
    section: 2,
    unit: 3,
    order: 1,
    category: LessonCategory.GRAMMAR,
    isActive: true,
    lessons: [
      {
        title: {
          ko: "'ㅡ' 탈락",
          uz: "'ㅡ' tushishi",
          en: "'ㅡ' Deletion",
          ru: "Выпадение 'ㅡ'",
        },
        description: {
          ko: 'ㅡ로 끝나는 동사와 형용사 활용하기',
          uz: 'ㅡ bilan tugagan fe‘l va sifatlarni tuslash',
          en: 'Conjugating verbs and adjectives ending in ㅡ',
          ru: 'Спряжение глаголов и прилагательных на ㅡ',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_2,
        order: 1,
        grammarCode: G9,
        questions: mix20('gp_s2_u3_g9'),
      },
      {
        title: {
          ko: 'V-지 마세요',
          uz: 'V-지 마세요',
          en: 'V-지 마세요',
          ru: 'V-지 마세요',
        },
        description: {
          ko: '하지 말아야 할 행동 말하기',
          uz: 'Qilmaslik kerak bo‘lgan ishni aytish',
          en: 'Telling someone not to do something',
          ru: 'Говорим, что не следует делать',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_2,
        order: 2,
        grammarCode: G10,
        questions: mix20('gp_s2_u3_g10'),
      },
      {
        title: {
          ko: 'N만',
          uz: 'N만',
          en: 'N만',
          ru: 'N만',
        },
        description: {
          ko: '하나만 선택하거나 한정해서 말하기',
          uz: 'Faqat bitta narsani ajratib aytish',
          en: 'Expressing only or limiting something',
          ru: 'Выражаем значение «только»',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_2,
        order: 3,
        grammarCode: G11,
        questions: mix20('gp_s2_u3_g11'),
      },
      {
        title: {
          ko: 'V-아야/어야 되다',
          uz: 'V-아야/어야 되다',
          en: 'V-아야/어야 되다',
          ru: 'V-아야/어야 되다',
        },
        description: {
          ko: '꼭 해야 하는 행동과 의무 말하기',
          uz: 'Bajarish shart bo‘lgan ishni aytish',
          en: 'Talking about obligations and necessities',
          ru: 'Говорим об обязанностях и необходимости',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_2,
        order: 4,
        grammarCode: G12,
        questions: mix20('gp_s2_u3_g12'),
      },
    ],
  },
  {
    title: {
      ko: '교통과 이동',
      uz: 'Transport va harakatlanish',
      en: 'Transportation and Getting Around',
      ru: 'Транспорт и передвижение',
    },
    section: 2,
    unit: 4,
    order: 1,
    category: LessonCategory.GRAMMAR,
    isActive: true,
    lessons: [
      {
        title: {
          ko: 'V-(으)려고 하다',
          uz: 'V-(으)려고 하다',
          en: 'V-(으)려고 하다',
          ru: 'V-(으)려고 하다',
        },
        description: {
          ko: '앞으로 하려는 계획과 의도 말하기',
          uz: 'Kelajakdagi reja va niyatni aytish',
          en: 'Talking about plans and intentions',
          ru: 'Говорим о планах и намерениях',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_2,
        order: 1,
        grammarCode: G13,
        questions: mix20('gp_s2_u4_g13'),
      },
      {
        title: {
          ko: 'N에서 N까지',
          uz: 'N에서 N까지',
          en: 'N에서 N까지',
          ru: 'N에서 N까지',
        },
        description: {
          ko: '출발 장소에서 도착 장소까지 말하기',
          uz: 'Boshlanish joyidan manzilgacha aytish',
          en: 'Expressing routes from one place to another',
          ru: 'Говорим о маршруте от одного места до другого',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_2,
        order: 2,
        grammarCode: G14,
        questions: mix20('gp_s2_u4_g14'),
      },
      {
        title: {
          ko: 'V-아/어 주다',
          uz: 'V-아/어 주다',
          en: 'V-아/어 주다',
          ru: 'V-아/어 주다',
        },
        description: {
          ko: '다른 사람을 위해 행동하거나 부탁하기',
          uz: 'Boshqa odam uchun ish qilish yoki iltimos qilish',
          en: 'Doing a favor or asking someone for help',
          ru: 'Делаем что-то для другого или просим об услуге',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_2,
        order: 3,
        grammarCode: G15,
        questions: mix20('gp_s2_u4_g15'),
      },
      {
        title: {
          ko: 'N(으)로',
          uz: 'N(으)로',
          en: 'N(으)로',
          ru: 'N(으)로',
        },
        description: {
          ko: '교통수단과 이동 방향 말하기',
          uz: 'Transport vositasi va yo‘nalishni aytish',
          en: 'Talking about transportation and direction',
          ru: 'Говорим о транспорте и направлении',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_2,
        order: 4,
        grammarCode: G16,
        questions: mix20('gp_s2_u4_g16'),
      },
    ],
  },
  {
    title: {
      ko: '외모와 쇼핑',
      uz: 'Tashqi ko‘rinish va xarid',
      en: 'Appearance and Shopping',
      ru: 'Внешность и покупки',
    },
    section: 2,
    unit: 5,
    order: 1,
    category: LessonCategory.GRAMMAR,
    isActive: true,
    lessons: [
      {
        title: {
          ko: "'ㄹ' 탈락",
          uz: "'ㄹ' tushishi",
          en: "'ㄹ' Deletion",
          ru: "Выпадение 'ㄹ'",
        },
        description: {
          ko: 'ㄹ 받침 어간의 활용 익히기',
          uz: 'ㄹ bilan tugagan negizlarni tuslash',
          en: 'Conjugating ㄹ-final stems',
          ru: 'Спряжение основ на ㄹ',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_2,
        order: 1,
        grammarCode: G17,
        questions: mix20('gp_s2_u5_g17'),
      },
      {
        title: {
          ko: 'A-(으)ㄴ N',
          uz: 'A-(으)ㄴ N',
          en: 'A-(으)ㄴ N',
          ru: 'A-(으)ㄴ N',
        },
        description: {
          ko: '형용사로 사람과 사물의 특징 설명하기',
          uz: 'Sifat bilan odam va narsalarni tasvirlash',
          en: 'Describing people and things with adjectives',
          ru: 'Описываем людей и предметы прилагательными',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_2,
        order: 2,
        grammarCode: G18,
        questions: mix20('gp_s2_u5_g18'),
      },
      {
        title: {
          ko: 'N한테[께]',
          uz: 'N한테[께]',
          en: 'N한테[께]',
          ru: 'N한테[께]',
        },
        description: {
          ko: '행동이나 물건을 받는 사람 말하기',
          uz: 'Harakat yoki narsani qabul qiluvchi odamni aytish',
          en: 'Talking about the recipient of an action',
          ru: 'Говорим об адресате действия',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_2,
        order: 3,
        grammarCode: G19,
        questions: mix20('gp_s2_u5_g19'),
      },
      {
        title: {
          ko: 'V-아/어 보세요',
          uz: 'V-아/어 보세요',
          en: 'V-아/어 보세요',
          ru: 'V-아/어 보세요',
        },
        description: {
          ko: '직접 해 보도록 부드럽게 권유하기',
          uz: 'Biror ishni sinab ko‘rishni tavsiya qilish',
          en: 'Recommending that someone try something',
          ru: 'Предлагаем кому-то что-нибудь попробовать',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_2,
        order: 4,
        grammarCode: G20,
        questions: mix20('gp_s2_u5_g20'),
      },
    ],
  },
  {
    title: {
      ko: '여행과 희망',
      uz: 'Sayohat va istaklar',
      en: 'Travel and Desires',
      ru: 'Путешествия и желания',
    },
    section: 2,
    unit: 6,
    order: 1,
    category: LessonCategory.GRAMMAR,
    isActive: true,
    lessons: [
      {
        title: {
          ko: 'A/V-(으)면',
          uz: 'A/V-(으)면',
          en: 'A/V-(으)면',
          ru: 'A/V-(으)면',
        },
        description: {
          ko: '어떤 조건이 이루어졌을 때의 상황 말하기',
          uz: 'Biror shart bajarilgandagi vaziyatni aytish',
          en: 'Talking about conditions and results',
          ru: 'Говорим об условиях и результатах',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_2,
        order: 1,
        grammarCode: G21,
        questions: mix20('gp_s2_u6_g21'),
      },
      {
        title: {
          ko: 'V-는 N',
          uz: 'V-는 N',
          en: 'V-는 N',
          ru: 'V-는 N',
        },
        description: {
          ko: '현재의 행동으로 사람과 사물 설명하기',
          uz: 'Hozirgi harakat bilan odam va narsalarni tasvirlash',
          en: 'Describing nouns with present actions',
          ru: 'Описываем существительные действиями настоящего времени',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_2,
        order: 2,
        grammarCode: G22,
        questions: mix20('gp_s2_u6_g22'),
      },
      {
        title: {
          ko: 'V-고 싶다',
          uz: 'V-고 싶다',
          en: 'V-고 싶다',
          ru: 'V-고 싶다',
        },
        description: {
          ko: '내가 하고 싶은 행동과 희망 말하기',
          uz: 'O‘z istak va xohishlaringizni aytish',
          en: 'Talking about your own desires',
          ru: 'Говорим о собственных желаниях',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_2,
        order: 3,
        grammarCode: G23,
        questions: mix20('gp_s2_u6_g23'),
      },
      {
        title: {
          ko: 'V-고 싶어 하다',
          uz: 'V-고 싶어 하다',
          en: 'V-고 싶어 하다',
          ru: 'V-고 싶어 하다',
        },
        description: {
          ko: '다른 사람이 원하는 행동 말하기',
          uz: 'Boshqa odamning xohishini aytish',
          en: 'Talking about another person’s desires',
          ru: 'Говорим о желаниях другого человека',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_2,
        order: 4,
        grammarCode: G24,
        questions: mix20('gp_s2_u6_g24'),
      },
    ],
  },
  {
    title: {
      ko: '모임과 약속',
      uz: 'Uchrashuv va va’dalar',
      en: 'Gatherings and Promises',
      ru: 'Встречи и обещания',
    },
    section: 2,
    unit: 7,
    order: 1,
    category: LessonCategory.GRAMMAR,
    isActive: true,
    lessons: [
      {
        title: {
          ko: 'V-(으)ㄹ 수 있다[없다]',
          uz: 'V-(으)ㄹ 수 있다[없다]',
          en: 'V-(으)ㄹ 수 있다[없다]',
          ru: 'V-(으)ㄹ 수 있다[없다]',
        },
        description: {
          ko: '할 수 있는 것과 할 수 없는 것 말하기',
          uz: 'Qila olish va qila olmaslikni aytish',
          en: 'Talking about ability and possibility',
          ru: 'Говорим о возможности и способности',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_2,
        order: 1,
        grammarCode: G25,
        questions: mix20('gp_s2_u7_g25'),
      },
      {
        title: {
          ko: 'V-(으)ㄹ게요',
          uz: 'V-(으)ㄹ게요',
          en: 'V-(으)ㄹ게요',
          ru: 'V-(으)ㄹ게요',
        },
        description: {
          ko: '내가 하겠다는 약속과 의지 말하기',
          uz: 'O‘z va’dasi va qarorini aytish',
          en: 'Making a promise or stating your decision',
          ru: 'Выражаем обещание или своё решение',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_2,
        order: 2,
        grammarCode: G26,
        questions: mix20('gp_s2_u7_g26'),
      },
      {
        title: {
          ko: 'V-(으)러 가다[오다]',
          uz: 'V-(으)러 가다[오다]',
          en: 'V-(으)러 가다[오다]',
          ru: 'V-(으)러 가다[오다]',
        },
        description: {
          ko: '어떤 일을 하기 위해 이동하는 목적 말하기',
          uz: 'Biror ish qilish uchun borish yoki kelish maqsadini aytish',
          en: 'Expressing the purpose of going or coming somewhere',
          ru: 'Говорим о цели движения куда-либо',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_2,
        order: 3,
        grammarCode: G27,
        questions: mix20('gp_s2_u7_g27'),
      },
      {
        title: {
          ko: 'V-(으)면서',
          uz: 'V-(으)면서',
          en: 'V-(으)면서',
          ru: 'V-(으)면서',
        },
        description: {
          ko: '두 행동을 동시에 하는 상황 말하기',
          uz: 'Ikki harakatni bir vaqtda bajarishni aytish',
          en: 'Talking about two actions happening at the same time',
          ru: 'Говорим о двух действиях, происходящих одновременно',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_2,
        order: 4,
        grammarCode: G28,
        questions: mix20('gp_s2_u7_g28'),
      },
    ],
  },
];
