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
// 자기소개 · 기본 서술
// ═══════════════════════════════════════════════════════════

// ─────────────────────────────────────────────
// 문법 1. N은/는
// ─────────────────────────────────────────────
const G1 = 'topic-eun-neun';

const G1_Q = {
  // grammar_blank 10
  ...blank('gp_s1_u1_g1_01', G1, '저는 학생이에요.', '저는', {
    uz: 'Men talabaman.',
    en: 'I am a student.',
    ru: 'Я студент.',
  }),

  ...blank('gp_s1_u1_g1_02', G1, '민수는 한국 사람이에요.', '민수는', {
    uz: 'Minsu koreys.',
    en: 'Minsu is Korean.',
    ru: 'Минсу кореец.',
  }),

  ...blank('gp_s1_u1_g1_03', G1, '하산은 회사원이에요.', '하산은', {
    uz: 'Hasan ofis xodimi.',
    en: 'Hasan is an office worker.',
    ru: 'Хасан офисный работник.',
  }),

  ...blank('gp_s1_u1_g1_04', G1, '선생님은 한국 사람이에요.', '선생님은', {
    uz: 'O‘qituvchi koreys.',
    en: 'The teacher is Korean.',
    ru: 'Учитель кореец.',
  }),

  ...blank('gp_s1_u1_g1_05', G1, '마리아는 의사예요.', '마리아는', {
    uz: 'Mariya shifokor.',
    en: 'Maria is a doctor.',
    ru: 'Мария врач.',
  }),

  ...blank(
    'gp_s1_u1_g1_06',
    G1,
    '아브로르는 우즈베키스탄 사람이에요.',
    '아브로르는',
    {
      uz: 'Abror o‘zbekistonlik.',
      en: 'Abror is Uzbek.',
      ru: 'Аброр из Узбекистана.',
    },
  ),

  ...blank('gp_s1_u1_g1_07', G1, '제 친구는 대학생이에요.', '제 친구는', {
    uz: 'Do‘stim universitet talabasi.',
    en: 'My friend is a university student.',
    ru: 'Мой друг студент университета.',
  }),

  ...blank('gp_s1_u1_g1_08', G1, '수진은 간호사예요.', '수진은', {
    uz: 'Sujin hamshira.',
    en: 'Sujin is a nurse.',
    ru: 'Суджин медсестра.',
  }),

  ...blank('gp_s1_u1_g1_09', G1, '제 이름은 알리예요.', '제 이름은', {
    uz: 'Mening ismim Ali.',
    en: 'My name is Ali.',
    ru: 'Меня зовут Али.',
  }),

  ...blank('gp_s1_u1_g1_10', G1, '이 사람은 제 동생이에요.', '이 사람은', {
    uz: 'Bu odam mening ukam yoki singlim.',
    en: 'This person is my younger sibling.',
    ru: 'Этот человек — мой младший брат или сестра.',
  }),

  // grammar_build 10
  ...build(
    'gp_s1_u1_g1_11',
    G1,
    [
      {
        options: ['저는', '저가', '저를'],
        correct: '저는',
      },
      {
        options: ['학생이에요.', '학생을이에요.', '학생이 가요.'],
        correct: '학생이에요.',
      },
    ],
    {
      uz: 'Men talabaman.',
      en: 'I am a student.',
      ru: 'Я студент.',
    },
  ),

  ...build(
    'gp_s1_u1_g1_12',
    G1,
    [
      {
        options: ['민수는', '민수가', '민수를'],
        correct: '민수는',
      },
      {
        options: [
          '한국 사람이에요.',
          '한국 사람을이에요.',
          '한국 사람이 가요.',
        ],
        correct: '한국 사람이에요.',
      },
    ],
    {
      uz: 'Minsu koreys.',
      en: 'Minsu is Korean.',
      ru: 'Минсу кореец.',
    },
  ),

  ...build(
    'gp_s1_u1_g1_13',
    G1,
    [
      {
        options: ['하산은', '하산는', '하산을'],
        correct: '하산은',
      },
      {
        options: ['회사원이에요.', '회사원예요.', '회사원을이에요.'],
        correct: '회사원이에요.',
      },
    ],
    {
      uz: 'Hasan ofis xodimi.',
      en: 'Hasan is an office worker.',
      ru: 'Хасан офисный работник.',
    },
  ),

  ...build(
    'gp_s1_u1_g1_14',
    G1,
    [
      {
        options: ['선생님은', '선생님는', '선생님을'],
        correct: '선생님은',
      },
      {
        options: ['한국 사람이에요.', '한국 사람예요.', '한국 사람을이에요.'],
        correct: '한국 사람이에요.',
      },
    ],
    {
      uz: 'O‘qituvchi koreys.',
      en: 'The teacher is Korean.',
      ru: 'Учитель кореец.',
    },
  ),

  ...build(
    'gp_s1_u1_g1_15',
    G1,
    [
      {
        options: ['마리아는', '마리아은', '마리아를'],
        correct: '마리아는',
      },
      {
        options: ['의사예요.', '의사이에요.', '의사를예요.'],
        correct: '의사예요.',
      },
    ],
    {
      uz: 'Mariya shifokor.',
      en: 'Maria is a doctor.',
      ru: 'Мария врач.',
    },
  ),

  ...build(
    'gp_s1_u1_g1_16',
    G1,
    [
      {
        options: ['아브로르는', '아브로르은', '아브로르를'],
        correct: '아브로르는',
      },
      {
        options: [
          '우즈베키스탄 사람이에요.',
          '우즈베키스탄 사람예요.',
          '우즈베키스탄 사람을이에요.',
        ],
        correct: '우즈베키스탄 사람이에요.',
      },
    ],
    {
      uz: 'Abror o‘zbekistonlik.',
      en: 'Abror is Uzbek.',
      ru: 'Аброр из Узбекистана.',
    },
  ),

  ...build(
    'gp_s1_u1_g1_17',
    G1,
    [
      {
        options: ['제 친구는', '제 친구가', '제 친구를'],
        correct: '제 친구는',
      },
      {
        options: ['대학생이에요.', '대학생예요.', '대학생을이에요.'],
        correct: '대학생이에요.',
      },
    ],
    {
      uz: 'Do‘stim universitet talabasi.',
      en: 'My friend is a university student.',
      ru: 'Мой друг студент университета.',
    },
  ),

  ...build(
    'gp_s1_u1_g1_18',
    G1,
    [
      {
        options: ['수진은', '수진는', '수진을'],
        correct: '수진은',
      },
      {
        options: ['간호사예요.', '간호사이에요.', '간호사를예요.'],
        correct: '간호사예요.',
      },
    ],
    {
      uz: 'Sujin hamshira.',
      en: 'Sujin is a nurse.',
      ru: 'Суджин медсестра.',
    },
  ),

  ...build(
    'gp_s1_u1_g1_19',
    G1,
    [
      {
        options: ['제 이름은', '제 이름는', '제 이름을'],
        correct: '제 이름은',
      },
      {
        options: ['알리예요.', '알리이에요.', '알리를예요.'],
        correct: '알리예요.',
      },
    ],
    {
      uz: 'Mening ismim Ali.',
      en: 'My name is Ali.',
      ru: 'Меня зовут Али.',
    },
  ),

  ...build(
    'gp_s1_u1_g1_20',
    G1,
    [
      {
        options: ['이 사람은', '이 사람는', '이 사람을'],
        correct: '이 사람은',
      },
      {
        options: ['제 동생이에요.', '제 동생예요.', '제 동생을이에요.'],
        correct: '제 동생이에요.',
      },
    ],
    {
      uz: 'Bu odam mening ukam yoki singlim.',
      en: 'This person is my younger sibling.',
      ru: 'Этот человек — мой младший брат или сестра.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 2. N이에요/예요
// ─────────────────────────────────────────────
const G2 = 'copula-ieyo';

const G2_Q = {
  // grammar_blank 10
  ...blank('gp_s1_u1_g2_01', G2, '저는 학생이에요.', '학생이에요', {
    uz: 'Men talabaman.',
    en: 'I am a student.',
    ru: 'Я студент.',
  }),

  ...blank('gp_s1_u1_g2_02', G2, '마리아는 의사예요.', '의사예요', {
    uz: 'Mariya shifokor.',
    en: 'Maria is a doctor.',
    ru: 'Мария врач.',
  }),

  ...blank('gp_s1_u1_g2_03', G2, '제 이름은 민수예요.', '민수예요', {
    uz: 'Mening ismim Minsu.',
    en: 'My name is Minsu.',
    ru: 'Меня зовут Минсу.',
  }),

  ...blank('gp_s1_u1_g2_04', G2, '제 친구는 회사원이에요.', '회사원이에요', {
    uz: 'Do‘stim ofis xodimi.',
    en: 'My friend is an office worker.',
    ru: 'Мой друг офисный работник.',
  }),

  ...blank('gp_s1_u1_g2_05', G2, '수진 씨는 간호사예요.', '간호사예요', {
    uz: 'Sujin hamshira.',
    en: 'Sujin is a nurse.',
    ru: 'Суджин медсестра.',
  }),

  ...blank(
    'gp_s1_u1_g2_06',
    G2,
    '아브로르 씨는 우즈베키스탄 사람이에요.',
    '사람이에요',
    {
      uz: 'Abror o‘zbekistonlik.',
      en: 'Abror is Uzbek.',
      ru: 'Аброр из Узбекистана.',
    },
  ),

  ...blank('gp_s1_u1_g2_07', G2, '저는 한국어 선생님이에요.', '선생님이에요', {
    uz: 'Men koreys tili o‘qituvchisiman.',
    en: 'I am a Korean teacher.',
    ru: 'Я преподаватель корейского языка.',
  }),

  ...blank('gp_s1_u1_g2_08', G2, '이 사람은 제 누나예요.', '누나예요', {
    uz: 'Bu mening opam.',
    en: 'This person is my older sister.',
    ru: 'Это моя старшая сестра.',
  }),

  ...blank('gp_s1_u1_g2_09', G2, '저 사람은 경찰이에요.', '경찰이에요', {
    uz: 'U odam politsiyachi.',
    en: 'That person is a police officer.',
    ru: 'Тот человек полицейский.',
  }),

  ...blank('gp_s1_u1_g2_10', G2, '제 동생은 가수예요.', '가수예요', {
    uz: 'Ukam yoki singlim qo‘shiqchi.',
    en: 'My younger sibling is a singer.',
    ru: 'Мой младший брат или сестра певец.',
  }),

  // grammar_build 10
  ...build(
    'gp_s1_u1_g2_11',
    G2,
    [
      {
        options: ['저는', '저를', '제가'],
        correct: '저는',
      },
      {
        options: ['학생이에요.', '학생예요.', '학생이에요?'],
        correct: '학생이에요.',
      },
    ],
    {
      uz: 'Men talabaman.',
      en: 'I am a student.',
      ru: 'Я студент.',
    },
  ),

  ...build(
    'gp_s1_u1_g2_12',
    G2,
    [
      {
        options: ['마리아는', '마리아가', '마리아를'],
        correct: '마리아는',
      },
      {
        options: ['의사예요.', '의사이에요.', '의사입니다.'],
        correct: '의사예요.',
      },
    ],
    {
      uz: 'Mariya shifokor.',
      en: 'Maria is a doctor.',
      ru: 'Мария врач.',
    },
  ),

  ...build(
    'gp_s1_u1_g2_13',
    G2,
    [
      {
        options: ['제 이름은', '제 이름을', '제 이름이'],
        correct: '제 이름은',
      },
      {
        options: ['민수예요.', '민수이에요.', '민수입니다.'],
        correct: '민수예요.',
      },
    ],
    {
      uz: 'Mening ismim Minsu.',
      en: 'My name is Minsu.',
      ru: 'Меня зовут Минсу.',
    },
  ),

  ...build(
    'gp_s1_u1_g2_14',
    G2,
    [
      {
        options: ['제 친구는', '제 친구가', '제 친구를'],
        correct: '제 친구는',
      },
      {
        options: ['회사원이에요.', '회사원예요.', '회사원입니다.'],
        correct: '회사원이에요.',
      },
    ],
    {
      uz: 'Do‘stim ofis xodimi.',
      en: 'My friend is an office worker.',
      ru: 'Мой друг офисный работник.',
    },
  ),

  ...build(
    'gp_s1_u1_g2_15',
    G2,
    [
      {
        options: ['수진 씨는', '수진 씨가', '수진 씨를'],
        correct: '수진 씨는',
      },
      {
        options: ['간호사예요.', '간호사이에요.', '간호사입니다.'],
        correct: '간호사예요.',
      },
    ],
    {
      uz: 'Sujin hamshira.',
      en: 'Sujin is a nurse.',
      ru: 'Суджин медсестра.',
    },
  ),

  ...build(
    'gp_s1_u1_g2_16',
    G2,
    [
      {
        options: ['아브로르 씨는', '아브로르 씨가', '아브로르 씨를'],
        correct: '아브로르 씨는',
      },
      {
        options: [
          '우즈베키스탄 사람이에요.',
          '우즈베키스탄 사람예요.',
          '우즈베키스탄 사람입니다.',
        ],
        correct: '우즈베키스탄 사람이에요.',
      },
    ],
    {
      uz: 'Abror o‘zbekistonlik.',
      en: 'Abror is Uzbek.',
      ru: 'Аброр из Узбекистана.',
    },
  ),

  ...build(
    'gp_s1_u1_g2_17',
    G2,
    [
      {
        options: ['저는', '저를', '제가'],
        correct: '저는',
      },
      {
        options: [
          '한국어 선생님이에요.',
          '한국어 선생님예요.',
          '한국어 선생님입니까?',
        ],
        correct: '한국어 선생님이에요.',
      },
    ],
    {
      uz: 'Men koreys tili o‘qituvchisiman.',
      en: 'I am a Korean teacher.',
      ru: 'Я преподаватель корейского языка.',
    },
  ),

  ...build(
    'gp_s1_u1_g2_18',
    G2,
    [
      {
        options: ['이 사람은', '이 사람이', '이 사람을'],
        correct: '이 사람은',
      },
      {
        options: ['제 누나예요.', '제 누나이에요.', '제 누나입니다.'],
        correct: '제 누나예요.',
      },
    ],
    {
      uz: 'Bu mening opam.',
      en: 'This person is my older sister.',
      ru: 'Это моя старшая сестра.',
    },
  ),

  ...build(
    'gp_s1_u1_g2_19',
    G2,
    [
      {
        options: ['저 사람은', '저 사람이', '저 사람을'],
        correct: '저 사람은',
      },
      {
        options: ['경찰이에요.', '경찰예요.', '경찰입니다.'],
        correct: '경찰이에요.',
      },
    ],
    {
      uz: 'U odam politsiyachi.',
      en: 'That person is a police officer.',
      ru: 'Тот человек полицейский.',
    },
  ),

  ...build(
    'gp_s1_u1_g2_20',
    G2,
    [
      {
        options: ['제 동생은', '제 동생이', '제 동생을'],
        correct: '제 동생은',
      },
      {
        options: ['가수예요.', '가수이에요.', '가수입니다.'],
        correct: '가수예요.',
      },
    ],
    {
      uz: 'Ukam yoki singlim qo‘shiqchi.',
      en: 'My younger sibling is a singer.',
      ru: 'Мой младший брат или сестра певец.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 3. N입니다 / N입니까?
// ─────────────────────────────────────────────
const G3 = 'copula-imnida';

const G3_Q = {
  // grammar_blank 10
  ...blank('gp_s1_u1_g3_01', G3, '저는 회사원입니다.', '회사원입니다', {
    uz: 'Men kompaniya xodimiman.',
    en: 'I am an office worker.',
    ru: 'Я офисный работник.',
  }),

  ...blank('gp_s1_u1_g3_02', G3, '저는 한국 사람입니다.', '한국 사람입니다', {
    uz: 'Men koreysman.',
    en: 'I am Korean.',
    ru: 'Я кореец.',
  }),

  ...blank('gp_s1_u1_g3_03', G3, '이분은 선생님입니다.', '선생님입니다', {
    uz: 'Bu kishi o‘qituvchi.',
    en: 'This person is a teacher.',
    ru: 'Этот человек учитель.',
  }),

  ...blank('gp_s1_u1_g3_04', G3, '민수 씨는 학생입니다.', '학생입니다', {
    uz: 'Minsu talaba.',
    en: 'Minsu is a student.',
    ru: 'Минсу студент.',
  }),

  ...blank('gp_s1_u1_g3_05', G3, '의사입니까?', '의사입니까', {
    uz: 'Siz shifokormisiz?',
    en: 'Are you a doctor?',
    ru: 'Вы врач?',
  }),

  ...blank('gp_s1_u1_g3_06', G3, '한국 사람입니까?', '한국 사람입니까', {
    uz: 'Siz koreysmisiz?',
    en: 'Are you Korean?',
    ru: 'Вы кореец?',
  }),

  ...blank('gp_s1_u1_g3_07', G3, '학생입니까?', '학생입니까', {
    uz: 'Siz talabamisiz?',
    en: 'Are you a student?',
    ru: 'Вы студент?',
  }),

  ...blank('gp_s1_u1_g3_08', G3, '회사원입니까?', '회사원입니까', {
    uz: 'Siz kompaniya xodimimisiz?',
    en: 'Are you an office worker?',
    ru: 'Вы офисный работник?',
  }),

  ...blank('gp_s1_u1_g3_09', G3, '제 직업은 경찰입니다.', '경찰입니다', {
    uz: 'Mening kasbim politsiyachi.',
    en: 'I am a police officer.',
    ru: 'Я полицейский.',
  }),

  ...blank('gp_s1_u1_g3_10', G3, '저분은 간호사입니다.', '간호사입니다', {
    uz: 'U kishi hamshira.',
    en: 'That person is a nurse.',
    ru: 'Тот человек медсестра.',
  }),

  // grammar_build 10
  ...build(
    'gp_s1_u1_g3_11',
    G3,
    [
      {
        options: ['저는', '저를', '제가'],
        correct: '저는',
      },
      {
        options: ['회사원입니다.', '회사원이에요.', '회사원입니까?'],
        correct: '회사원입니다.',
      },
    ],
    {
      uz: 'Men kompaniya xodimiman.',
      en: 'I am an office worker.',
      ru: 'Я офисный работник.',
    },
  ),

  ...build(
    'gp_s1_u1_g3_12',
    G3,
    [
      {
        options: ['저는', '저를', '제가'],
        correct: '저는',
      },
      {
        options: ['한국 사람입니다.', '한국 사람이에요.', '한국 사람입니까?'],
        correct: '한국 사람입니다.',
      },
    ],
    {
      uz: 'Men koreysman.',
      en: 'I am Korean.',
      ru: 'Я кореец.',
    },
  ),

  ...build(
    'gp_s1_u1_g3_13',
    G3,
    [
      {
        options: ['이분은', '이분을', '이분이'],
        correct: '이분은',
      },
      {
        options: ['선생님입니다.', '선생님이에요.', '선생님입니까?'],
        correct: '선생님입니다.',
      },
    ],
    {
      uz: 'Bu kishi o‘qituvchi.',
      en: 'This person is a teacher.',
      ru: 'Этот человек учитель.',
    },
  ),

  ...build(
    'gp_s1_u1_g3_14',
    G3,
    [
      {
        options: ['민수 씨는', '민수 씨를', '민수 씨가'],
        correct: '민수 씨는',
      },
      {
        options: ['학생입니다.', '학생이에요.', '학생입니까?'],
        correct: '학생입니다.',
      },
    ],
    {
      uz: 'Minsu talaba.',
      en: 'Minsu is a student.',
      ru: 'Минсу студент.',
    },
  ),

  ...build(
    'gp_s1_u1_g3_15',
    G3,
    [
      {
        options: ['의사입니까?', '의사입니다.', '의사예요.'],
        correct: '의사입니까?',
      },
    ],
    {
      uz: 'Siz shifokormisiz?',
      en: 'Are you a doctor?',
      ru: 'Вы врач?',
    },
  ),

  ...build(
    'gp_s1_u1_g3_16',
    G3,
    [
      {
        options: ['한국 사람입니까?', '한국 사람입니다.', '한국 사람이에요.'],
        correct: '한국 사람입니까?',
      },
    ],
    {
      uz: 'Siz koreysmisiz?',
      en: 'Are you Korean?',
      ru: 'Вы кореец?',
    },
  ),

  ...build(
    'gp_s1_u1_g3_17',
    G3,
    [
      {
        options: ['학생입니까?', '학생입니다.', '학생이에요.'],
        correct: '학생입니까?',
      },
    ],
    {
      uz: 'Siz talabamisiz?',
      en: 'Are you a student?',
      ru: 'Вы студент?',
    },
  ),

  ...build(
    'gp_s1_u1_g3_18',
    G3,
    [
      {
        options: ['회사원입니까?', '회사원입니다.', '회사원이에요.'],
        correct: '회사원입니까?',
      },
    ],
    {
      uz: 'Siz kompaniya xodimimisiz?',
      en: 'Are you an office worker?',
      ru: 'Вы офисный работник?',
    },
  ),

  ...build(
    'gp_s1_u1_g3_19',
    G3,
    [
      {
        options: ['제 직업은', '제 직업을', '제 직업이'],
        correct: '제 직업은',
      },
      {
        options: ['경찰입니다.', '경찰이에요.', '경찰입니까?'],
        correct: '경찰입니다.',
      },
    ],
    {
      uz: 'Mening kasbim politsiyachi.',
      en: 'I am a police officer.',
      ru: 'Я полицейский.',
    },
  ),

  ...build(
    'gp_s1_u1_g3_20',
    G3,
    [
      {
        options: ['저분은', '저분을', '저분이'],
        correct: '저분은',
      },
      {
        options: ['간호사입니다.', '간호사예요.', '간호사입니까?'],
        correct: '간호사입니다.',
      },
    ],
    {
      uz: 'U kishi hamshira.',
      en: 'That person is a nurse.',
      ru: 'Тот человек медсестра.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 4. N이/가 아닙니다
// ─────────────────────────────────────────────
const G4 = 'neg-i-ga-animnida';

const G4_Q = {
  // grammar_blank 10
  ...blank('gp_s1_u1_g4_01', G4, '저는 학생이 아닙니다.', '학생이 아닙니다', {
    uz: 'Men talaba emasman.',
    en: 'I am not a student.',
    ru: 'Я не студент.',
  }),

  ...blank(
    'gp_s1_u1_g4_02',
    G4,
    '마리아 씨는 의사가 아닙니다.',
    '의사가 아닙니다',
    {
      uz: 'Mariya shifokor emas.',
      en: 'Maria is not a doctor.',
      ru: 'Мария не врач.',
    },
  ),

  ...blank(
    'gp_s1_u1_g4_03',
    G4,
    '민수 씨는 회사원이 아닙니다.',
    '회사원이 아닙니다',
    {
      uz: 'Minsu kompaniya xodimi emas.',
      en: 'Minsu is not an office worker.',
      ru: 'Минсу не офисный работник.',
    },
  ),

  ...blank(
    'gp_s1_u1_g4_04',
    G4,
    '저분은 선생님이 아닙니다.',
    '선생님이 아닙니다',
    {
      uz: 'U kishi o‘qituvchi emas.',
      en: 'That person is not a teacher.',
      ru: 'Тот человек не учитель.',
    },
  ),

  ...blank(
    'gp_s1_u1_g4_05',
    G4,
    '저는 한국 사람이 아닙니다.',
    '한국 사람이 아닙니다',
    {
      uz: 'Men koreys emasman.',
      en: 'I am not Korean.',
      ru: 'Я не кореец.',
    },
  ),

  ...blank(
    'gp_s1_u1_g4_06',
    G4,
    '이 사람은 제 동생이 아닙니다.',
    '제 동생이 아닙니다',
    {
      uz: 'Bu odam mening ukam yoki singlim emas.',
      en: 'This person is not my younger sibling.',
      ru: 'Этот человек не мой младший брат или сестра.',
    },
  ),

  ...blank(
    'gp_s1_u1_g4_07',
    G4,
    '수진 씨는 간호사가 아닙니다.',
    '간호사가 아닙니다',
    {
      uz: 'Sujin hamshira emas.',
      en: 'Sujin is not a nurse.',
      ru: 'Суджин не медсестра.',
    },
  ),

  ...blank(
    'gp_s1_u1_g4_08',
    G4,
    '제 친구는 경찰이 아닙니다.',
    '경찰이 아닙니다',
    {
      uz: 'Do‘stim politsiyachi emas.',
      en: 'My friend is not a police officer.',
      ru: 'Мой друг не полицейский.',
    },
  ),

  ...blank(
    'gp_s1_u1_g4_09',
    G4,
    '아브로르 씨는 중국 사람이 아닙니다.',
    '중국 사람이 아닙니다',
    {
      uz: 'Abror xitoylik emas.',
      en: 'Abror is not Chinese.',
      ru: 'Аброр не китаец.',
    },
  ),

  ...blank('gp_s1_u1_g4_10', G4, '이분은 가수가 아닙니다.', '가수가 아닙니다', {
    uz: 'Bu kishi qo‘shiqchi emas.',
    en: 'This person is not a singer.',
    ru: 'Этот человек не певец.',
  }),

  // grammar_build 10
  ...build(
    'gp_s1_u1_g4_11',
    G4,
    [
      {
        options: ['저는', '저를', '제가'],
        correct: '저는',
      },
      {
        options: ['학생이 아닙니다.', '학생가 아닙니다.', '학생은 아닙니다.'],
        correct: '학생이 아닙니다.',
      },
    ],
    {
      uz: 'Men talaba emasman.',
      en: 'I am not a student.',
      ru: 'Я не студент.',
    },
  ),

  ...build(
    'gp_s1_u1_g4_12',
    G4,
    [
      {
        options: ['마리아 씨는', '마리아 씨를', '마리아 씨가'],
        correct: '마리아 씨는',
      },
      {
        options: ['의사가 아닙니다.', '의사이 아닙니다.', '의사는 아닙니다.'],
        correct: '의사가 아닙니다.',
      },
    ],
    {
      uz: 'Mariya shifokor emas.',
      en: 'Maria is not a doctor.',
      ru: 'Мария не врач.',
    },
  ),

  ...build(
    'gp_s1_u1_g4_13',
    G4,
    [
      {
        options: ['민수 씨는', '민수 씨를', '민수 씨가'],
        correct: '민수 씨는',
      },
      {
        options: [
          '회사원이 아닙니다.',
          '회사원가 아닙니다.',
          '회사원은 아닙니다.',
        ],
        correct: '회사원이 아닙니다.',
      },
    ],
    {
      uz: 'Minsu kompaniya xodimi emas.',
      en: 'Minsu is not an office worker.',
      ru: 'Минсу не офисный работник.',
    },
  ),

  ...build(
    'gp_s1_u1_g4_14',
    G4,
    [
      {
        options: ['저분은', '저분을', '저분이'],
        correct: '저분은',
      },
      {
        options: [
          '선생님이 아닙니다.',
          '선생님가 아닙니다.',
          '선생님은 아닙니다.',
        ],
        correct: '선생님이 아닙니다.',
      },
    ],
    {
      uz: 'U kishi o‘qituvchi emas.',
      en: 'That person is not a teacher.',
      ru: 'Тот человек не учитель.',
    },
  ),

  ...build(
    'gp_s1_u1_g4_15',
    G4,
    [
      {
        options: ['저는', '저를', '제가'],
        correct: '저는',
      },
      {
        options: [
          '한국 사람이 아닙니다.',
          '한국 사람가 아닙니다.',
          '한국 사람은 아닙니다.',
        ],
        correct: '한국 사람이 아닙니다.',
      },
    ],
    {
      uz: 'Men koreys emasman.',
      en: 'I am not Korean.',
      ru: 'Я не кореец.',
    },
  ),

  ...build(
    'gp_s1_u1_g4_16',
    G4,
    [
      {
        options: ['이 사람은', '이 사람을', '이 사람이'],
        correct: '이 사람은',
      },
      {
        options: [
          '제 동생이 아닙니다.',
          '제 동생가 아닙니다.',
          '제 동생은 아닙니다.',
        ],
        correct: '제 동생이 아닙니다.',
      },
    ],
    {
      uz: 'Bu odam mening ukam yoki singlim emas.',
      en: 'This person is not my younger sibling.',
      ru: 'Этот человек не мой младший брат или сестра.',
    },
  ),

  ...build(
    'gp_s1_u1_g4_17',
    G4,
    [
      {
        options: ['수진 씨는', '수진 씨를', '수진 씨가'],
        correct: '수진 씨는',
      },
      {
        options: [
          '간호사가 아닙니다.',
          '간호사이 아닙니다.',
          '간호사는 아닙니다.',
        ],
        correct: '간호사가 아닙니다.',
      },
    ],
    {
      uz: 'Sujin hamshira emas.',
      en: 'Sujin is not a nurse.',
      ru: 'Суджин не медсестра.',
    },
  ),

  ...build(
    'gp_s1_u1_g4_18',
    G4,
    [
      {
        options: ['제 친구는', '제 친구를', '제 친구가'],
        correct: '제 친구는',
      },
      {
        options: ['경찰이 아닙니다.', '경찰가 아닙니다.', '경찰은 아닙니다.'],
        correct: '경찰이 아닙니다.',
      },
    ],
    {
      uz: 'Do‘stim politsiyachi emas.',
      en: 'My friend is not a police officer.',
      ru: 'Мой друг не полицейский.',
    },
  ),

  ...build(
    'gp_s1_u1_g4_19',
    G4,
    [
      {
        options: ['아브로르 씨는', '아브로르 씨를', '아브로르 씨가'],
        correct: '아브로르 씨는',
      },
      {
        options: [
          '중국 사람이 아닙니다.',
          '중국 사람가 아닙니다.',
          '중국 사람은 아닙니다.',
        ],
        correct: '중국 사람이 아닙니다.',
      },
    ],
    {
      uz: 'Abror xitoylik emas.',
      en: 'Abror is not Chinese.',
      ru: 'Аброр не китаец.',
    },
  ),

  ...build(
    'gp_s1_u1_g4_20',
    G4,
    [
      {
        options: ['이분은', '이분을', '이분이'],
        correct: '이분은',
      },
      {
        options: ['가수가 아닙니다.', '가수이 아닙니다.', '가수는 아닙니다.'],
        correct: '가수가 아닙니다.',
      },
    ],
    {
      uz: 'Bu kishi qo‘shiqchi emas.',
      en: 'This person is not a singer.',
      ru: 'Этот человек не певец.',
    },
  ),
};

// ═══════════════════════════════════════════════════════════
// UNIT 2
// 물건 · 존재 · 요청 · 연결
// ═══════════════════════════════════════════════════════════

// ─────────────────────────────────────────────
// 문법 5. N이/가 있어요[없어요]
// ─────────────────────────────────────────────
const G5 = 'exist-i-ga-isseoyo';

const G5_Q = {
  // grammar_blank 10
  ...blank('gp_s1_u2_g5_01', G5, '책이 있어요.', '책이 있어요', {
    uz: 'Kitob bor.',
    en: 'There is a book.',
    ru: 'Есть книга.',
  }),

  ...blank('gp_s1_u2_g5_02', G5, '가방이 있어요.', '가방이 있어요', {
    uz: 'Sumka bor.',
    en: 'There is a bag.',
    ru: 'Есть сумка.',
  }),

  ...blank('gp_s1_u2_g5_03', G5, '친구가 있어요.', '친구가 있어요', {
    uz: 'Do‘stim bor.',
    en: 'I have a friend.',
    ru: 'У меня есть друг.',
  }),

  ...blank('gp_s1_u2_g5_04', G5, '시간이 없어요.', '시간이 없어요', {
    uz: 'Vaqtim yo‘q.',
    en: 'I do not have time.',
    ru: 'У меня нет времени.',
  }),

  ...blank('gp_s1_u2_g5_05', G5, '우산이 없어요.', '우산이 없어요', {
    uz: 'Soyabon yo‘q.',
    en: 'There is no umbrella.',
    ru: 'Зонта нет.',
  }),

  ...blank('gp_s1_u2_g5_06', G5, '동생이 있어요.', '동생이 있어요', {
    uz: 'Ukam yoki singlim bor.',
    en: 'I have a younger sibling.',
    ru: 'У меня есть младший брат или сестра.',
  }),

  ...blank('gp_s1_u2_g5_07', G5, '휴대폰이 없어요.', '휴대폰이 없어요', {
    uz: 'Telefon yo‘q.',
    en: 'There is no phone.',
    ru: 'Телефона нет.',
  }),

  ...blank('gp_s1_u2_g5_08', G5, '교실에 학생이 있어요.', '학생이 있어요', {
    uz: 'Sinfda talaba bor.',
    en: 'There is a student in the classroom.',
    ru: 'В классе есть студент.',
  }),

  ...blank('gp_s1_u2_g5_09', G5, '냉장고에 물이 있어요.', '물이 있어요', {
    uz: 'Muzlatkichda suv bor.',
    en: 'There is water in the refrigerator.',
    ru: 'В холодильнике есть вода.',
  }),

  ...blank('gp_s1_u2_g5_10', G5, '오늘 수업이 없어요.', '수업이 없어요', {
    uz: 'Bugun dars yo‘q.',
    en: 'There is no class today.',
    ru: 'Сегодня нет занятий.',
  }),

  // grammar_build 10
  ...build(
    'gp_s1_u2_g5_11',
    G5,
    [
      {
        options: ['책이', '책가', '책을'],
        correct: '책이',
      },
      {
        options: ['있어요.', '없어요.', '이에요.'],
        correct: '있어요.',
      },
    ],
    {
      uz: 'Kitob bor.',
      en: 'There is a book.',
      ru: 'Есть книга.',
    },
  ),

  ...build(
    'gp_s1_u2_g5_12',
    G5,
    [
      {
        options: ['가방이', '가방가', '가방을'],
        correct: '가방이',
      },
      {
        options: ['있어요.', '이에요.', '주세요.'],
        correct: '있어요.',
      },
    ],
    {
      uz: 'Sumka bor.',
      en: 'There is a bag.',
      ru: 'Есть сумка.',
    },
  ),

  ...build(
    'gp_s1_u2_g5_13',
    G5,
    [
      {
        options: ['친구가', '친구이', '친구를'],
        correct: '친구가',
      },
      {
        options: ['있어요.', '없어요.', '예요.'],
        correct: '있어요.',
      },
    ],
    {
      uz: 'Do‘stim bor.',
      en: 'I have a friend.',
      ru: 'У меня есть друг.',
    },
  ),

  ...build(
    'gp_s1_u2_g5_14',
    G5,
    [
      {
        options: ['시간이', '시간가', '시간을'],
        correct: '시간이',
      },
      {
        options: ['없어요.', '있어요.', '주세요.'],
        correct: '없어요.',
      },
    ],
    {
      uz: 'Vaqtim yo‘q.',
      en: 'I do not have time.',
      ru: 'У меня нет времени.',
    },
  ),

  ...build(
    'gp_s1_u2_g5_15',
    G5,
    [
      {
        options: ['우산이', '우산가', '우산을'],
        correct: '우산이',
      },
      {
        options: ['없어요.', '예요.', '주세요.'],
        correct: '없어요.',
      },
    ],
    {
      uz: 'Soyabon yo‘q.',
      en: 'There is no umbrella.',
      ru: 'Зонта нет.',
    },
  ),

  ...build(
    'gp_s1_u2_g5_16',
    G5,
    [
      {
        options: ['동생이', '동생가', '동생을'],
        correct: '동생이',
      },
      {
        options: ['있어요.', '없어요.', '이에요.'],
        correct: '있어요.',
      },
    ],
    {
      uz: 'Ukam yoki singlim bor.',
      en: 'I have a younger sibling.',
      ru: 'У меня есть младший брат или сестра.',
    },
  ),

  ...build(
    'gp_s1_u2_g5_17',
    G5,
    [
      {
        options: ['휴대폰이', '휴대폰가', '휴대폰을'],
        correct: '휴대폰이',
      },
      {
        options: ['없어요.', '주세요.', '입니다.'],
        correct: '없어요.',
      },
    ],
    {
      uz: 'Telefon yo‘q.',
      en: 'There is no phone.',
      ru: 'Телефона нет.',
    },
  ),

  ...build(
    'gp_s1_u2_g5_18',
    G5,
    [
      {
        options: ['교실에', '교실을', '교실이'],
        correct: '교실에',
      },
      {
        options: ['학생이', '학생가', '학생을'],
        correct: '학생이',
      },
      {
        options: ['있어요.', '없어요.', '주세요.'],
        correct: '있어요.',
      },
    ],
    {
      uz: 'Sinfda talaba bor.',
      en: 'There is a student in the classroom.',
      ru: 'В классе есть студент.',
    },
  ),

  ...build(
    'gp_s1_u2_g5_19',
    G5,
    [
      {
        options: ['냉장고에', '냉장고를', '냉장고가'],
        correct: '냉장고에',
      },
      {
        options: ['물이', '물가', '물을'],
        correct: '물이',
      },
      {
        options: ['있어요.', '주세요.', '예요.'],
        correct: '있어요.',
      },
    ],
    {
      uz: 'Muzlatkichda suv bor.',
      en: 'There is water in the refrigerator.',
      ru: 'В холодильнике есть вода.',
    },
  ),

  ...build(
    'gp_s1_u2_g5_20',
    G5,
    [
      {
        options: ['오늘', '어제부터', '내일을'],
        correct: '오늘',
      },
      {
        options: ['수업이', '수업가', '수업을'],
        correct: '수업이',
      },
      {
        options: ['없어요.', '있어요.', '주세요.'],
        correct: '없어요.',
      },
    ],
    {
      uz: 'Bugun dars yo‘q.',
      en: 'There is no class today.',
      ru: 'Сегодня нет занятий.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 6. 이거는[그거는, 저거는] N이에요/예요
// ─────────────────────────────────────────────
const G6 = 'demonstrative-igeo';

const G6_Q = {
  // grammar_blank 10
  ...blank('gp_s1_u2_g6_01', G6, '이거는 책이에요.', '이거는 책이에요', {
    uz: 'Bu kitob.',
    en: 'This is a book.',
    ru: 'Это книга.',
  }),

  ...blank('gp_s1_u2_g6_02', G6, '그거는 가방이에요.', '그거는 가방이에요', {
    uz: 'U sumka.',
    en: 'That is a bag.',
    ru: 'Это сумка.',
  }),

  ...blank('gp_s1_u2_g6_03', G6, '저거는 우산이에요.', '저거는 우산이에요', {
    uz: 'Ana u soyabon.',
    en: 'That over there is an umbrella.',
    ru: 'Вон то — зонт.',
  }),

  ...blank('gp_s1_u2_g6_04', G6, '이거는 커피예요.', '이거는 커피예요', {
    uz: 'Bu qahva.',
    en: 'This is coffee.',
    ru: 'Это кофе.',
  }),

  ...blank(
    'gp_s1_u2_g6_05',
    G6,
    '그거는 휴대폰이에요.',
    '그거는 휴대폰이에요',
    {
      uz: 'U telefon.',
      en: 'That is a phone.',
      ru: 'Это телефон.',
    },
  ),

  ...blank('gp_s1_u2_g6_06', G6, '저거는 의자예요.', '저거는 의자예요', {
    uz: 'Ana u stul.',
    en: 'That over there is a chair.',
    ru: 'Вон то — стул.',
  }),

  ...blank(
    'gp_s1_u2_g6_07',
    G6,
    '이거는 한국어 책이에요.',
    '이거는 한국어 책이에요',
    {
      uz: 'Bu koreys tili kitobi.',
      en: 'This is a Korean textbook.',
      ru: 'Это учебник корейского языка.',
    },
  ),

  ...blank('gp_s1_u2_g6_08', G6, '그거는 물이에요.', '그거는 물이에요', {
    uz: 'U suv.',
    en: 'That is water.',
    ru: 'Это вода.',
  }),

  ...blank('gp_s1_u2_g6_09', G6, '저거는 자동차예요.', '저거는 자동차예요', {
    uz: 'Ana u mashina.',
    en: 'That over there is a car.',
    ru: 'Вон то — машина.',
  }),

  ...blank(
    'gp_s1_u2_g6_10',
    G6,
    '이거는 제 연필이에요.',
    '이거는 제 연필이에요',
    {
      uz: 'Bu mening qalamim.',
      en: 'This is my pencil.',
      ru: 'Это мой карандаш.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s1_u2_g6_11',
    G6,
    [
      {
        options: ['이거는', '그거는', '저거는'],
        correct: '이거는',
      },
      {
        options: ['책이에요.', '책예요.', '책을이에요.'],
        correct: '책이에요.',
      },
    ],
    {
      uz: 'Bu kitob.',
      en: 'This is a book.',
      ru: 'Это книга.',
    },
  ),

  ...build(
    'gp_s1_u2_g6_12',
    G6,
    [
      {
        options: ['그거는', '그거가', '그거를'],
        correct: '그거는',
      },
      {
        options: ['가방이에요.', '가방예요.', '가방을이에요.'],
        correct: '가방이에요.',
      },
    ],
    {
      uz: 'U sumka.',
      en: 'That is a bag.',
      ru: 'Это сумка.',
    },
  ),

  ...build(
    'gp_s1_u2_g6_13',
    G6,
    [
      {
        options: ['저거는', '저거가', '저거를'],
        correct: '저거는',
      },
      {
        options: ['우산이에요.', '우산예요.', '우산을이에요.'],
        correct: '우산이에요.',
      },
    ],
    {
      uz: 'Ana u soyabon.',
      en: 'That over there is an umbrella.',
      ru: 'Вон то — зонт.',
    },
  ),

  ...build(
    'gp_s1_u2_g6_14',
    G6,
    [
      {
        options: ['이거는', '이거가', '이거를'],
        correct: '이거는',
      },
      {
        options: ['커피예요.', '커피이에요.', '커피를예요.'],
        correct: '커피예요.',
      },
    ],
    {
      uz: 'Bu qahva.',
      en: 'This is coffee.',
      ru: 'Это кофе.',
    },
  ),

  ...build(
    'gp_s1_u2_g6_15',
    G6,
    [
      {
        options: ['그거는', '그거를', '그거가'],
        correct: '그거는',
      },
      {
        options: ['휴대폰이에요.', '휴대폰예요.', '휴대폰을이에요.'],
        correct: '휴대폰이에요.',
      },
    ],
    {
      uz: 'U telefon.',
      en: 'That is a phone.',
      ru: 'Это телефон.',
    },
  ),

  ...build(
    'gp_s1_u2_g6_16',
    G6,
    [
      {
        options: ['저거는', '저거가', '저거를'],
        correct: '저거는',
      },
      {
        options: ['의자예요.', '의자이에요.', '의자를예요.'],
        correct: '의자예요.',
      },
    ],
    {
      uz: 'Ana u stul.',
      en: 'That over there is a chair.',
      ru: 'Вон то — стул.',
    },
  ),

  ...build(
    'gp_s1_u2_g6_17',
    G6,
    [
      {
        options: ['이거는', '이거가', '이거를'],
        correct: '이거는',
      },
      {
        options: ['한국어 책이에요.', '한국어 책예요.', '한국어 책을이에요.'],
        correct: '한국어 책이에요.',
      },
    ],
    {
      uz: 'Bu koreys tili kitobi.',
      en: 'This is a Korean textbook.',
      ru: 'Это учебник корейского языка.',
    },
  ),

  ...build(
    'gp_s1_u2_g6_18',
    G6,
    [
      {
        options: ['그거는', '그거를', '그거가'],
        correct: '그거는',
      },
      {
        options: ['물이에요.', '물예요.', '물을이에요.'],
        correct: '물이에요.',
      },
    ],
    {
      uz: 'U suv.',
      en: 'That is water.',
      ru: 'Это вода.',
    },
  ),

  ...build(
    'gp_s1_u2_g6_19',
    G6,
    [
      {
        options: ['저거는', '저거를', '저거가'],
        correct: '저거는',
      },
      {
        options: ['자동차예요.', '자동차이에요.', '자동차를예요.'],
        correct: '자동차예요.',
      },
    ],
    {
      uz: 'Ana u mashina.',
      en: 'That over there is a car.',
      ru: 'Вон то — машина.',
    },
  ),

  ...build(
    'gp_s1_u2_g6_20',
    G6,
    [
      {
        options: ['이거는', '이거가', '이거를'],
        correct: '이거는',
      },
      {
        options: ['제 연필이에요.', '제 연필예요.', '제 연필을이에요.'],
        correct: '제 연필이에요.',
      },
    ],
    {
      uz: 'Bu mening qalamim.',
      en: 'This is my pencil.',
      ru: 'Это мой карандаш.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 7. N 주세요
// ─────────────────────────────────────────────
const G7 = 'request-juseyo';

const G7_Q = {
  // grammar_blank 10
  ...blank('gp_s1_u2_g7_01', G7, '물 주세요.', '물 주세요', {
    uz: 'Suv bering, iltimos.',
    en: 'Water, please.',
    ru: 'Воды, пожалуйста.',
  }),

  ...blank('gp_s1_u2_g7_02', G7, '커피 주세요.', '커피 주세요', {
    uz: 'Qahva bering, iltimos.',
    en: 'Coffee, please.',
    ru: 'Кофе, пожалуйста.',
  }),

  ...blank('gp_s1_u2_g7_03', G7, '김밥 주세요.', '김밥 주세요', {
    uz: 'Kimbap bering, iltimos.',
    en: 'Kimbap, please.',
    ru: 'Кимбап, пожалуйста.',
  }),

  ...blank('gp_s1_u2_g7_04', G7, '메뉴 주세요.', '메뉴 주세요', {
    uz: 'Menyuni bering, iltimos.',
    en: 'The menu, please.',
    ru: 'Меню, пожалуйста.',
  }),

  ...blank('gp_s1_u2_g7_05', G7, '사과 두 개 주세요.', '사과 두 개 주세요', {
    uz: 'Ikkita olma bering, iltimos.',
    en: 'Two apples, please.',
    ru: 'Два яблока, пожалуйста.',
  }),

  ...blank('gp_s1_u2_g7_06', G7, '콜라 한 병 주세요.', '콜라 한 병 주세요', {
    uz: 'Bir shisha kola bering, iltimos.',
    en: 'One bottle of cola, please.',
    ru: 'Одну бутылку колы, пожалуйста.',
  }),

  ...blank('gp_s1_u2_g7_07', G7, '빵 하나 주세요.', '빵 하나 주세요', {
    uz: 'Bitta non bering, iltimos.',
    en: 'One bread, please.',
    ru: 'Одну булочку, пожалуйста.',
  }),

  ...blank(
    'gp_s1_u2_g7_08',
    G7,
    '아메리카노 한 잔 주세요.',
    '아메리카노 한 잔 주세요',
    {
      uz: 'Bir piyola americano bering, iltimos.',
      en: 'One Americano, please.',
      ru: 'Один американо, пожалуйста.',
    },
  ),

  ...blank('gp_s1_u2_g7_09', G7, '봉투 주세요.', '봉투 주세요', {
    uz: 'Paket bering, iltimos.',
    en: 'A bag, please.',
    ru: 'Пакет, пожалуйста.',
  }),

  ...blank('gp_s1_u2_g7_10', G7, '영수증 주세요.', '영수증 주세요', {
    uz: 'Chek bering, iltimos.',
    en: 'The receipt, please.',
    ru: 'Чек, пожалуйста.',
  }),

  // grammar_build 10
  ...build(
    'gp_s1_u2_g7_11',
    G7,
    [
      {
        options: ['물', '물이', '물을은'],
        correct: '물',
      },
      {
        options: ['주세요.', '있어요.', '이에요.'],
        correct: '주세요.',
      },
    ],
    {
      uz: 'Suv bering, iltimos.',
      en: 'Water, please.',
      ru: 'Воды, пожалуйста.',
    },
  ),

  ...build(
    'gp_s1_u2_g7_12',
    G7,
    [
      {
        options: ['커피', '커피가', '커피는을'],
        correct: '커피',
      },
      {
        options: ['주세요.', '없어요.', '예요.'],
        correct: '주세요.',
      },
    ],
    {
      uz: 'Qahva bering, iltimos.',
      en: 'Coffee, please.',
      ru: 'Кофе, пожалуйста.',
    },
  ),

  ...build(
    'gp_s1_u2_g7_13',
    G7,
    [
      {
        options: ['김밥', '김밥이', '김밥은을'],
        correct: '김밥',
      },
      {
        options: ['주세요.', '있어요.', '입니다.'],
        correct: '주세요.',
      },
    ],
    {
      uz: 'Kimbap bering, iltimos.',
      en: 'Kimbap, please.',
      ru: 'Кимбап, пожалуйста.',
    },
  ),

  ...build(
    'gp_s1_u2_g7_14',
    G7,
    [
      {
        options: ['메뉴', '메뉴가', '메뉴는을'],
        correct: '메뉴',
      },
      {
        options: ['주세요.', '없어요.', '예요.'],
        correct: '주세요.',
      },
    ],
    {
      uz: 'Menyuni bering, iltimos.',
      en: 'The menu, please.',
      ru: 'Меню, пожалуйста.',
    },
  ),

  ...build(
    'gp_s1_u2_g7_15',
    G7,
    [
      {
        options: ['사과', '사과가', '사과는'],
        correct: '사과',
      },
      {
        options: ['두 개', '두 시', '두 명'],
        correct: '두 개',
      },
      {
        options: ['주세요.', '있어요.', '없어요.'],
        correct: '주세요.',
      },
    ],
    {
      uz: 'Ikkita olma bering, iltimos.',
      en: 'Two apples, please.',
      ru: 'Два яблока, пожалуйста.',
    },
  ),

  ...build(
    'gp_s1_u2_g7_16',
    G7,
    [
      {
        options: ['콜라', '콜라가', '콜라는'],
        correct: '콜라',
      },
      {
        options: ['한 병', '한 명', '한 시'],
        correct: '한 병',
      },
      {
        options: ['주세요.', '이에요.', '없어요.'],
        correct: '주세요.',
      },
    ],
    {
      uz: 'Bir shisha kola bering, iltimos.',
      en: 'One bottle of cola, please.',
      ru: 'Одну бутылку колы, пожалуйста.',
    },
  ),

  ...build(
    'gp_s1_u2_g7_17',
    G7,
    [
      {
        options: ['빵', '빵이', '빵은'],
        correct: '빵',
      },
      {
        options: ['하나', '한 명', '한 시'],
        correct: '하나',
      },
      {
        options: ['주세요.', '있어요.', '입니다.'],
        correct: '주세요.',
      },
    ],
    {
      uz: 'Bitta non bering, iltimos.',
      en: 'One bread, please.',
      ru: 'Одну булочку, пожалуйста.',
    },
  ),

  ...build(
    'gp_s1_u2_g7_18',
    G7,
    [
      {
        options: ['아메리카노', '아메리카노가', '아메리카노는'],
        correct: '아메리카노',
      },
      {
        options: ['한 잔', '한 병', '한 명'],
        correct: '한 잔',
      },
      {
        options: ['주세요.', '없어요.', '예요.'],
        correct: '주세요.',
      },
    ],
    {
      uz: 'Bir piyola americano bering, iltimos.',
      en: 'One Americano, please.',
      ru: 'Один американо, пожалуйста.',
    },
  ),

  ...build(
    'gp_s1_u2_g7_19',
    G7,
    [
      {
        options: ['봉투', '봉투가', '봉투는'],
        correct: '봉투',
      },
      {
        options: ['주세요.', '있어요.', '예요.'],
        correct: '주세요.',
      },
    ],
    {
      uz: 'Paket bering, iltimos.',
      en: 'A bag, please.',
      ru: 'Пакет, пожалуйста.',
    },
  ),

  ...build(
    'gp_s1_u2_g7_20',
    G7,
    [
      {
        options: ['영수증', '영수증이', '영수증은'],
        correct: '영수증',
      },
      {
        options: ['주세요.', '없어요.', '이에요.'],
        correct: '주세요.',
      },
    ],
    {
      uz: 'Chek bering, iltimos.',
      en: 'The receipt, please.',
      ru: 'Чек, пожалуйста.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 8. N하고 N · N과/와 N
// ─────────────────────────────────────────────
const G8 = 'and-hago-gwa-wa';

const G8_Q = {
  // grammar_blank 10
  ...blank('gp_s1_u2_g8_01', G8, '커피하고 빵 주세요.', '커피하고 빵', {
    uz: 'Qahva va non bering, iltimos.',
    en: 'Coffee and bread, please.',
    ru: 'Кофе и хлеб, пожалуйста.',
  }),

  ...blank('gp_s1_u2_g8_02', G8, '책하고 연필이 있어요.', '책하고 연필', {
    uz: 'Kitob va qalam bor.',
    en: 'There is a book and a pencil.',
    ru: 'Есть книга и карандаш.',
  }),

  ...blank('gp_s1_u2_g8_03', G8, '친구하고 영화를 봐요.', '친구하고', {
    uz: 'Do‘stim bilan kino ko‘raman.',
    en: 'I watch a movie with my friend.',
    ru: 'Я смотрю фильм с другом.',
  }),

  ...blank('gp_s1_u2_g8_04', G8, '사과와 바나나를 샀어요.', '사과와 바나나', {
    uz: 'Olma va banan sotib oldim.',
    en: 'I bought apples and bananas.',
    ru: 'Я купил яблоки и бананы.',
  }),

  ...blank('gp_s1_u2_g8_05', G8, '물과 주스가 있어요.', '물과 주스', {
    uz: 'Suv va sharbat bor.',
    en: 'There is water and juice.',
    ru: 'Есть вода и сок.',
  }),

  ...blank(
    'gp_s1_u2_g8_06',
    G8,
    '선생님과 학생이 이야기해요.',
    '선생님과 학생',
    {
      uz: 'O‘qituvchi va talaba gaplashyapti.',
      en: 'The teacher and student are talking.',
      ru: 'Учитель и студент разговаривают.',
    },
  ),

  ...blank('gp_s1_u2_g8_07', G8, '저는 부모님하고 살아요.', '부모님하고', {
    uz: 'Men ota-onam bilan yashayman.',
    en: 'I live with my parents.',
    ru: 'Я живу с родителями.',
  }),

  ...blank('gp_s1_u2_g8_08', G8, '가방과 우산을 샀어요.', '가방과 우산', {
    uz: 'Sumka va soyabon sotib oldim.',
    en: 'I bought a bag and an umbrella.',
    ru: 'Я купил сумку и зонт.',
  }),

  ...blank('gp_s1_u2_g8_09', G8, '커피와 차 중에 뭐가 좋아요?', '커피와 차', {
    uz: 'Qahva va choydan qaysi biri yoqadi?',
    en: 'Which do you like, coffee or tea?',
    ru: 'Что вам больше нравится: кофе или чай?',
  }),

  ...blank('gp_s1_u2_g8_10', G8, '민수하고 수진은 친구예요.', '민수하고 수진', {
    uz: 'Minsu va Sujin do‘st.',
    en: 'Minsu and Sujin are friends.',
    ru: 'Минсу и Суджин друзья.',
  }),

  // grammar_build 10
  ...build(
    'gp_s1_u2_g8_11',
    G8,
    [
      {
        options: ['커피하고', '커피과', '커피하고를'],
        correct: '커피하고',
      },
      {
        options: ['빵', '빵이', '빵은'],
        correct: '빵',
      },
      {
        options: ['주세요.', '있어요.', '예요.'],
        correct: '주세요.',
      },
    ],
    {
      uz: 'Qahva va non bering, iltimos.',
      en: 'Coffee and bread, please.',
      ru: 'Кофе и хлеб, пожалуйста.',
    },
  ),

  ...build(
    'gp_s1_u2_g8_12',
    G8,
    [
      {
        options: ['책하고', '책와', '책하고를'],
        correct: '책하고',
      },
      {
        options: ['연필이', '연필가', '연필을'],
        correct: '연필이',
      },
      {
        options: ['있어요.', '주세요.', '예요.'],
        correct: '있어요.',
      },
    ],
    {
      uz: 'Kitob va qalam bor.',
      en: 'There is a book and a pencil.',
      ru: 'Есть книга и карандаш.',
    },
  ),

  ...build(
    'gp_s1_u2_g8_13',
    G8,
    [
      {
        options: ['친구하고', '친구와', '친구를하고'],
        correct: '친구하고',
      },
      {
        options: ['영화를 봐요.', '영화가 봐요.', '영화에 봐요.'],
        correct: '영화를 봐요.',
      },
    ],
    {
      uz: 'Do‘stim bilan kino ko‘raman.',
      en: 'I watch a movie with my friend.',
      ru: 'Я смотрю фильм с другом.',
    },
  ),

  ...build(
    'gp_s1_u2_g8_14',
    G8,
    [
      {
        options: ['사과와', '사과과', '사과하고를'],
        correct: '사과와',
      },
      {
        options: ['바나나를', '바나나가', '바나나에'],
        correct: '바나나를',
      },
      {
        options: ['샀어요.', '가요.', '있어요.'],
        correct: '샀어요.',
      },
    ],
    {
      uz: 'Olma va banan sotib oldim.',
      en: 'I bought apples and bananas.',
      ru: 'Я купил яблоки и бананы.',
    },
  ),

  ...build(
    'gp_s1_u2_g8_15',
    G8,
    [
      {
        options: ['물과', '물와', '물을과'],
        correct: '물과',
      },
      {
        options: ['주스가', '주스이', '주스를'],
        correct: '주스가',
      },
      {
        options: ['있어요.', '주세요.', '이에요.'],
        correct: '있어요.',
      },
    ],
    {
      uz: 'Suv va sharbat bor.',
      en: 'There is water and juice.',
      ru: 'Есть вода и сок.',
    },
  ),

  ...build(
    'gp_s1_u2_g8_16',
    G8,
    [
      {
        options: ['선생님과', '선생님와', '선생님을과'],
        correct: '선생님과',
      },
      {
        options: ['학생이', '학생가', '학생을'],
        correct: '학생이',
      },
      {
        options: ['이야기해요.', '있어요.', '주세요.'],
        correct: '이야기해요.',
      },
    ],
    {
      uz: 'O‘qituvchi va talaba gaplashyapti.',
      en: 'The teacher and student are talking.',
      ru: 'Учитель и студент разговаривают.',
    },
  ),

  ...build(
    'gp_s1_u2_g8_17',
    G8,
    [
      {
        options: ['저는', '저를', '제가를'],
        correct: '저는',
      },
      {
        options: ['부모님하고', '부모님와', '부모님을하고'],
        correct: '부모님하고',
      },
      {
        options: ['살아요.', '주세요.', '이에요.'],
        correct: '살아요.',
      },
    ],
    {
      uz: 'Men ota-onam bilan yashayman.',
      en: 'I live with my parents.',
      ru: 'Я живу с родителями.',
    },
  ),

  ...build(
    'gp_s1_u2_g8_18',
    G8,
    [
      {
        options: ['가방과', '가방와', '가방을과'],
        correct: '가방과',
      },
      {
        options: ['우산을', '우산이', '우산에'],
        correct: '우산을',
      },
      {
        options: ['샀어요.', '있어요.', '주세요.'],
        correct: '샀어요.',
      },
    ],
    {
      uz: 'Sumka va soyabon sotib oldim.',
      en: 'I bought a bag and an umbrella.',
      ru: 'Я купил сумку и зонт.',
    },
  ),

  ...build(
    'gp_s1_u2_g8_19',
    G8,
    [
      {
        options: ['커피와', '커피과', '커피를와'],
        correct: '커피와',
      },
      {
        options: ['차 중에', '차를 중에', '차가 중에'],
        correct: '차 중에',
      },
      {
        options: ['뭐가 좋아요?', '뭐를 좋아요?', '뭐에 좋아요?'],
        correct: '뭐가 좋아요?',
      },
    ],
    {
      uz: 'Qahva va choydan qaysi biri yoqadi?',
      en: 'Which do you like, coffee or tea?',
      ru: 'Что вам больше нравится: кофе или чай?',
    },
  ),

  ...build(
    'gp_s1_u2_g8_20',
    G8,
    [
      {
        options: ['민수하고', '민수과', '민수를하고'],
        correct: '민수하고',
      },
      {
        options: ['수진은', '수진이', '수진을'],
        correct: '수진은',
      },
      {
        options: ['친구예요.', '친구이에요.', '친구를예요.'],
        correct: '친구예요.',
      },
    ],
    {
      uz: 'Minsu va Sujin do‘st.',
      en: 'Minsu and Sujin are friends.',
      ru: 'Минсу и Суджин друзья.',
    },
  ),
};

// ═══════════════════════════════════════════════════════════
// UNIT 3
// 일상 행동 · 목적어 · 행동 장소 · 부정
// ═══════════════════════════════════════════════════════════

// ─────────────────────────────────────────────
// 문법 9. V-아요/어요
// ─────────────────────────────────────────────
const G9 = 'verb-ayo-eoyo';

const G9_Q = {
  // grammar_blank 10
  ...blank('gp_s1_u3_g9_01', G9, '저는 매일 학교에 가요.', '가요', {
    uz: 'Men har kuni maktabga boraman.',
    en: 'I go to school every day.',
    ru: 'Я каждый день хожу в школу.',
  }),

  ...blank('gp_s1_u3_g9_02', G9, '아침에 빵을 먹어요.', '먹어요', {
    uz: 'Ertalab non yeyman.',
    en: 'I eat bread in the morning.',
    ru: 'Утром я ем хлеб.',
  }),

  ...blank('gp_s1_u3_g9_03', G9, '저녁에 책을 읽어요.', '읽어요', {
    uz: 'Kechqurun kitob o‘qiyman.',
    en: 'I read a book in the evening.',
    ru: 'Вечером я читаю книгу.',
  }),

  ...blank('gp_s1_u3_g9_04', G9, '친구를 만나요.', '만나요', {
    uz: 'Do‘stim bilan uchrashaman.',
    en: 'I meet my friend.',
    ru: 'Я встречаюсь с другом.',
  }),

  ...blank('gp_s1_u3_g9_05', G9, '한국어를 공부해요.', '공부해요', {
    uz: 'Koreys tilini o‘rganaman.',
    en: 'I study Korean.',
    ru: 'Я изучаю корейский язык.',
  }),

  ...blank('gp_s1_u3_g9_06', G9, '매일 커피를 마셔요.', '마셔요', {
    uz: 'Har kuni qahva ichaman.',
    en: 'I drink coffee every day.',
    ru: 'Я каждый день пью кофе.',
  }),

  ...blank('gp_s1_u3_g9_07', G9, '주말에 영화를 봐요.', '봐요', {
    uz: 'Dam olish kunlari film ko‘raman.',
    en: 'I watch movies on weekends.',
    ru: 'На выходных я смотрю фильмы.',
  }),

  ...blank('gp_s1_u3_g9_08', G9, '밤에 음악을 들어요.', '들어요', {
    uz: 'Kechasi musiqa tinglayman.',
    en: 'I listen to music at night.',
    ru: 'Ночью я слушаю музыку.',
  }),

  ...blank('gp_s1_u3_g9_09', G9, '집에서 숙제를 해요.', '해요', {
    uz: 'Uyda uy vazifasini qilaman.',
    en: 'I do my homework at home.',
    ru: 'Я делаю домашнее задание дома.',
  }),

  ...blank('gp_s1_u3_g9_10', G9, '아침 일곱 시에 일어나요.', '일어나요', {
    uz: 'Ertalab soat yettida turaman.',
    en: 'I get up at seven in the morning.',
    ru: 'Я встаю в семь утра.',
  }),

  // grammar_build 10
  ...build(
    'gp_s1_u3_g9_11',
    G9,
    [
      {
        options: ['매일', '어제', '내일만'],
        correct: '매일',
      },
      {
        options: ['학교에', '학교를', '학교가'],
        correct: '학교에',
      },
      {
        options: ['가요.', '가어요.', '가아요.'],
        correct: '가요.',
      },
    ],
    {
      uz: 'Men har kuni maktabga boraman.',
      en: 'I go to school every day.',
      ru: 'Я каждый день хожу в школу.',
    },
  ),

  ...build(
    'gp_s1_u3_g9_12',
    G9,
    [
      {
        options: ['아침에', '아침을', '아침이'],
        correct: '아침에',
      },
      {
        options: ['빵을', '빵이', '빵에'],
        correct: '빵을',
      },
      {
        options: ['먹어요.', '먹아요.', '먹해요.'],
        correct: '먹어요.',
      },
    ],
    {
      uz: 'Ertalab non yeyman.',
      en: 'I eat bread in the morning.',
      ru: 'Утром я ем хлеб.',
    },
  ),

  ...build(
    'gp_s1_u3_g9_13',
    G9,
    [
      {
        options: ['저녁에', '저녁을', '저녁이'],
        correct: '저녁에',
      },
      {
        options: ['책을', '책이', '책에'],
        correct: '책을',
      },
      {
        options: ['읽어요.', '읽아요.', '읽해요.'],
        correct: '읽어요.',
      },
    ],
    {
      uz: 'Kechqurun kitob o‘qiyman.',
      en: 'I read a book in the evening.',
      ru: 'Вечером я читаю книгу.',
    },
  ),

  ...build(
    'gp_s1_u3_g9_14',
    G9,
    [
      {
        options: ['친구를', '친구가', '친구에'],
        correct: '친구를',
      },
      {
        options: ['만나요.', '만나어요.', '만나해요.'],
        correct: '만나요.',
      },
    ],
    {
      uz: 'Do‘stim bilan uchrashaman.',
      en: 'I meet my friend.',
      ru: 'Я встречаюсь с другом.',
    },
  ),

  ...build(
    'gp_s1_u3_g9_15',
    G9,
    [
      {
        options: ['한국어를', '한국어가', '한국어에'],
        correct: '한국어를',
      },
      {
        options: ['공부해요.', '공부하요.', '공부어요.'],
        correct: '공부해요.',
      },
    ],
    {
      uz: 'Koreys tilini o‘rganaman.',
      en: 'I study Korean.',
      ru: 'Я изучаю корейский язык.',
    },
  ),

  ...build(
    'gp_s1_u3_g9_16',
    G9,
    [
      {
        options: ['매일', '어제만', '내일을'],
        correct: '매일',
      },
      {
        options: ['커피를', '커피가', '커피에'],
        correct: '커피를',
      },
      {
        options: ['마셔요.', '마시어요.', '마시아요.'],
        correct: '마셔요.',
      },
    ],
    {
      uz: 'Har kuni qahva ichaman.',
      en: 'I drink coffee every day.',
      ru: 'Я каждый день пью кофе.',
    },
  ),

  ...build(
    'gp_s1_u3_g9_17',
    G9,
    [
      {
        options: ['주말에', '주말을', '주말이'],
        correct: '주말에',
      },
      {
        options: ['영화를', '영화가', '영화에'],
        correct: '영화를',
      },
      {
        options: ['봐요.', '보아요.', '보어요.'],
        correct: '봐요.',
      },
    ],
    {
      uz: 'Dam olish kunlari film ko‘raman.',
      en: 'I watch movies on weekends.',
      ru: 'На выходных я смотрю фильмы.',
    },
  ),

  ...build(
    'gp_s1_u3_g9_18',
    G9,
    [
      {
        options: ['밤에', '밤을', '밤이'],
        correct: '밤에',
      },
      {
        options: ['음악을', '음악이', '음악에'],
        correct: '음악을',
      },
      {
        options: ['들어요.', '듣어요.', '듣아요.'],
        correct: '들어요.',
      },
    ],
    {
      uz: 'Kechasi musiqa tinglayman.',
      en: 'I listen to music at night.',
      ru: 'Ночью я слушаю музыку.',
    },
  ),

  ...build(
    'gp_s1_u3_g9_19',
    G9,
    [
      {
        options: ['집에서', '집에', '집을'],
        correct: '집에서',
      },
      {
        options: ['숙제를', '숙제가', '숙제에'],
        correct: '숙제를',
      },
      {
        options: ['해요.', '하요.', '하여요.'],
        correct: '해요.',
      },
    ],
    {
      uz: 'Uyda uy vazifasini qilaman.',
      en: 'I do my homework at home.',
      ru: 'Я делаю домашнее задание дома.',
    },
  ),

  ...build(
    'gp_s1_u3_g9_20',
    G9,
    [
      {
        options: ['아침 일곱 시에', '아침 일곱 시를', '아침 일곱 시가'],
        correct: '아침 일곱 시에',
      },
      {
        options: ['일어나요.', '일어나어요.', '일어나해요.'],
        correct: '일어나요.',
      },
    ],
    {
      uz: 'Ertalab soat yettida turaman.',
      en: 'I get up at seven in the morning.',
      ru: 'Я встаю в семь утра.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 10. N을/를
// ─────────────────────────────────────────────
const G10 = 'obj-eul-reul';

const G10_Q = {
  // grammar_blank 10
  ...blank('gp_s1_u3_g10_01', G10, '저는 밥을 먹어요.', '밥을', {
    uz: 'Men ovqat yeyman.',
    en: 'I eat a meal.',
    ru: 'Я ем.',
  }),

  ...blank('gp_s1_u3_g10_02', G10, '커피를 마셔요.', '커피를', {
    uz: 'Qahva ichaman.',
    en: 'I drink coffee.',
    ru: 'Я пью кофе.',
  }),

  ...blank('gp_s1_u3_g10_03', G10, '한국어를 공부해요.', '한국어를', {
    uz: 'Koreys tilini o‘rganaman.',
    en: 'I study Korean.',
    ru: 'Я изучаю корейский язык.',
  }),

  ...blank('gp_s1_u3_g10_04', G10, '친구를 만나요.', '친구를', {
    uz: 'Do‘stim bilan uchrashaman.',
    en: 'I meet my friend.',
    ru: 'Я встречаюсь с другом.',
  }),

  ...blank('gp_s1_u3_g10_05', G10, '책을 읽어요.', '책을', {
    uz: 'Kitob o‘qiyman.',
    en: 'I read a book.',
    ru: 'Я читаю книгу.',
  }),

  ...blank('gp_s1_u3_g10_06', G10, '영화를 봐요.', '영화를', {
    uz: 'Film ko‘raman.',
    en: 'I watch a movie.',
    ru: 'Я смотрю фильм.',
  }),

  ...blank('gp_s1_u3_g10_07', G10, '음악을 들어요.', '음악을', {
    uz: 'Musiqa tinglayman.',
    en: 'I listen to music.',
    ru: 'Я слушаю музыку.',
  }),

  ...blank('gp_s1_u3_g10_08', G10, '물을 마셔요.', '물을', {
    uz: 'Suv ichaman.',
    en: 'I drink water.',
    ru: 'Я пью воду.',
  }),

  ...blank('gp_s1_u3_g10_09', G10, '숙제를 해요.', '숙제를', {
    uz: 'Uy vazifasini qilaman.',
    en: 'I do my homework.',
    ru: 'Я делаю домашнее задание.',
  }),

  ...blank('gp_s1_u3_g10_10', G10, '사과를 먹어요.', '사과를', {
    uz: 'Olma yeyman.',
    en: 'I eat an apple.',
    ru: 'Я ем яблоко.',
  }),

  // grammar_build 10
  ...build(
    'gp_s1_u3_g10_11',
    G10,
    [
      {
        options: ['저는', '저를', '제가'],
        correct: '저는',
      },
      {
        options: ['밥을', '밥를', '밥이'],
        correct: '밥을',
      },
      {
        options: ['먹어요.', '마셔요.', '읽어요.'],
        correct: '먹어요.',
      },
    ],
    {
      uz: 'Men ovqat yeyman.',
      en: 'I eat a meal.',
      ru: 'Я ем.',
    },
  ),

  ...build(
    'gp_s1_u3_g10_12',
    G10,
    [
      {
        options: ['커피를', '커피을', '커피가'],
        correct: '커피를',
      },
      {
        options: ['마셔요.', '먹어요.', '봐요.'],
        correct: '마셔요.',
      },
    ],
    {
      uz: 'Qahva ichaman.',
      en: 'I drink coffee.',
      ru: 'Я пью кофе.',
    },
  ),

  ...build(
    'gp_s1_u3_g10_13',
    G10,
    [
      {
        options: ['한국어를', '한국어을', '한국어가'],
        correct: '한국어를',
      },
      {
        options: ['공부해요.', '마셔요.', '먹어요.'],
        correct: '공부해요.',
      },
    ],
    {
      uz: 'Koreys tilini o‘rganaman.',
      en: 'I study Korean.',
      ru: 'Я изучаю корейский язык.',
    },
  ),

  ...build(
    'gp_s1_u3_g10_14',
    G10,
    [
      {
        options: ['친구를', '친구을', '친구가'],
        correct: '친구를',
      },
      {
        options: ['만나요.', '마셔요.', '읽어요.'],
        correct: '만나요.',
      },
    ],
    {
      uz: 'Do‘stim bilan uchrashaman.',
      en: 'I meet my friend.',
      ru: 'Я встречаюсь с другом.',
    },
  ),

  ...build(
    'gp_s1_u3_g10_15',
    G10,
    [
      {
        options: ['책을', '책를', '책이'],
        correct: '책을',
      },
      {
        options: ['읽어요.', '마셔요.', '만나요.'],
        correct: '읽어요.',
      },
    ],
    {
      uz: 'Kitob o‘qiyman.',
      en: 'I read a book.',
      ru: 'Я читаю книгу.',
    },
  ),

  ...build(
    'gp_s1_u3_g10_16',
    G10,
    [
      {
        options: ['영화를', '영화을', '영화가'],
        correct: '영화를',
      },
      {
        options: ['봐요.', '마셔요.', '공부해요.'],
        correct: '봐요.',
      },
    ],
    {
      uz: 'Film ko‘raman.',
      en: 'I watch a movie.',
      ru: 'Я смотрю фильм.',
    },
  ),

  ...build(
    'gp_s1_u3_g10_17',
    G10,
    [
      {
        options: ['음악을', '음악를', '음악이'],
        correct: '음악을',
      },
      {
        options: ['들어요.', '먹어요.', '봐요.'],
        correct: '들어요.',
      },
    ],
    {
      uz: 'Musiqa tinglayman.',
      en: 'I listen to music.',
      ru: 'Я слушаю музыку.',
    },
  ),

  ...build(
    'gp_s1_u3_g10_18',
    G10,
    [
      {
        options: ['물을', '물를', '물이'],
        correct: '물을',
      },
      {
        options: ['마셔요.', '읽어요.', '만나요.'],
        correct: '마셔요.',
      },
    ],
    {
      uz: 'Suv ichaman.',
      en: 'I drink water.',
      ru: 'Я пью воду.',
    },
  ),

  ...build(
    'gp_s1_u3_g10_19',
    G10,
    [
      {
        options: ['숙제를', '숙제을', '숙제가'],
        correct: '숙제를',
      },
      {
        options: ['해요.', '마셔요.', '봐요.'],
        correct: '해요.',
      },
    ],
    {
      uz: 'Uy vazifasini qilaman.',
      en: 'I do my homework.',
      ru: 'Я делаю домашнее задание.',
    },
  ),

  ...build(
    'gp_s1_u3_g10_20',
    G10,
    [
      {
        options: ['사과를', '사과을', '사과가'],
        correct: '사과를',
      },
      {
        options: ['먹어요.', '읽어요.', '들어요.'],
        correct: '먹어요.',
      },
    ],
    {
      uz: 'Olma yeyman.',
      en: 'I eat an apple.',
      ru: 'Я ем яблоко.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 11. N에서
// ─────────────────────────────────────────────
const G11 = 'place-eseo';

const G11_Q = {
  // grammar_blank 10
  ...blank('gp_s1_u3_g11_01', G11, '학교에서 공부해요.', '학교에서', {
    uz: 'Maktabda o‘qiyman.',
    en: 'I study at school.',
    ru: 'Я учусь в школе.',
  }),

  ...blank('gp_s1_u3_g11_02', G11, '집에서 밥을 먹어요.', '집에서', {
    uz: 'Uyda ovqat yeyman.',
    en: 'I eat at home.',
    ru: 'Я ем дома.',
  }),

  ...blank('gp_s1_u3_g11_03', G11, '카페에서 커피를 마셔요.', '카페에서', {
    uz: 'Kafeda qahva ichaman.',
    en: 'I drink coffee at a cafe.',
    ru: 'Я пью кофе в кафе.',
  }),

  ...blank('gp_s1_u3_g11_04', G11, '도서관에서 책을 읽어요.', '도서관에서', {
    uz: 'Kutubxonada kitob o‘qiyman.',
    en: 'I read books at the library.',
    ru: 'Я читаю книги в библиотеке.',
  }),

  ...blank('gp_s1_u3_g11_05', G11, '식당에서 점심을 먹어요.', '식당에서', {
    uz: 'Restoranda tushlik qilaman.',
    en: 'I eat lunch at a restaurant.',
    ru: 'Я обедаю в ресторане.',
  }),

  ...blank('gp_s1_u3_g11_06', G11, '회사에서 일해요.', '회사에서', {
    uz: 'Kompaniyada ishlayman.',
    en: 'I work at a company.',
    ru: 'Я работаю в компании.',
  }),

  ...blank('gp_s1_u3_g11_07', G11, '공원에서 운동해요.', '공원에서', {
    uz: 'Bog‘da sport bilan shug‘ullanaman.',
    en: 'I exercise at the park.',
    ru: 'Я занимаюсь спортом в парке.',
  }),

  ...blank('gp_s1_u3_g11_08', G11, '극장에서 영화를 봐요.', '극장에서', {
    uz: 'Kinoteatrda film ko‘raman.',
    en: 'I watch a movie at the theater.',
    ru: 'Я смотрю фильм в кинотеатре.',
  }),

  ...blank('gp_s1_u3_g11_09', G11, '마트에서 과일을 사요.', '마트에서', {
    uz: 'Supermarketda meva sotib olaman.',
    en: 'I buy fruit at the supermarket.',
    ru: 'Я покупаю фрукты в супермаркете.',
  }),

  ...blank('gp_s1_u3_g11_10', G11, '교실에서 한국어를 공부해요.', '교실에서', {
    uz: 'Sinfda koreys tilini o‘rganaman.',
    en: 'I study Korean in the classroom.',
    ru: 'Я изучаю корейский язык в классе.',
  }),

  // grammar_build 10
  ...build(
    'gp_s1_u3_g11_11',
    G11,
    [
      {
        options: ['학교에서', '학교에', '학교를'],
        correct: '학교에서',
      },
      {
        options: ['공부해요.', '마셔요.', '자요.'],
        correct: '공부해요.',
      },
    ],
    {
      uz: 'Maktabda o‘qiyman.',
      en: 'I study at school.',
      ru: 'Я учусь в школе.',
    },
  ),

  ...build(
    'gp_s1_u3_g11_12',
    G11,
    [
      {
        options: ['집에서', '집에', '집을'],
        correct: '집에서',
      },
      {
        options: ['밥을', '밥이', '밥에'],
        correct: '밥을',
      },
      {
        options: ['먹어요.', '읽어요.', '만나요.'],
        correct: '먹어요.',
      },
    ],
    {
      uz: 'Uyda ovqat yeyman.',
      en: 'I eat at home.',
      ru: 'Я ем дома.',
    },
  ),

  ...build(
    'gp_s1_u3_g11_13',
    G11,
    [
      {
        options: ['카페에서', '카페에', '카페를'],
        correct: '카페에서',
      },
      {
        options: ['커피를', '커피가', '커피에'],
        correct: '커피를',
      },
      {
        options: ['마셔요.', '읽어요.', '봐요.'],
        correct: '마셔요.',
      },
    ],
    {
      uz: 'Kafeda qahva ichaman.',
      en: 'I drink coffee at a cafe.',
      ru: 'Я пью кофе в кафе.',
    },
  ),

  ...build(
    'gp_s1_u3_g11_14',
    G11,
    [
      {
        options: ['도서관에서', '도서관에', '도서관을'],
        correct: '도서관에서',
      },
      {
        options: ['책을', '책이', '책에'],
        correct: '책을',
      },
      {
        options: ['읽어요.', '마셔요.', '만나요.'],
        correct: '읽어요.',
      },
    ],
    {
      uz: 'Kutubxonada kitob o‘qiyman.',
      en: 'I read books at the library.',
      ru: 'Я читаю книги в библиотеке.',
    },
  ),

  ...build(
    'gp_s1_u3_g11_15',
    G11,
    [
      {
        options: ['식당에서', '식당에', '식당을'],
        correct: '식당에서',
      },
      {
        options: ['점심을', '점심이', '점심에'],
        correct: '점심을',
      },
      {
        options: ['먹어요.', '봐요.', '공부해요.'],
        correct: '먹어요.',
      },
    ],
    {
      uz: 'Restoranda tushlik qilaman.',
      en: 'I eat lunch at a restaurant.',
      ru: 'Я обедаю в ресторане.',
    },
  ),

  ...build(
    'gp_s1_u3_g11_16',
    G11,
    [
      {
        options: ['회사에서', '회사에', '회사를'],
        correct: '회사에서',
      },
      {
        options: ['일해요.', '먹어요.', '읽어요.'],
        correct: '일해요.',
      },
    ],
    {
      uz: 'Kompaniyada ishlayman.',
      en: 'I work at a company.',
      ru: 'Я работаю в компании.',
    },
  ),

  ...build(
    'gp_s1_u3_g11_17',
    G11,
    [
      {
        options: ['공원에서', '공원에', '공원을'],
        correct: '공원에서',
      },
      {
        options: ['운동해요.', '공부해요.', '마셔요.'],
        correct: '운동해요.',
      },
    ],
    {
      uz: 'Bog‘da sport bilan shug‘ullanaman.',
      en: 'I exercise at the park.',
      ru: 'Я занимаюсь спортом в парке.',
    },
  ),

  ...build(
    'gp_s1_u3_g11_18',
    G11,
    [
      {
        options: ['극장에서', '극장에', '극장을'],
        correct: '극장에서',
      },
      {
        options: ['영화를', '영화가', '영화에'],
        correct: '영화를',
      },
      {
        options: ['봐요.', '먹어요.', '마셔요.'],
        correct: '봐요.',
      },
    ],
    {
      uz: 'Kinoteatrda film ko‘raman.',
      en: 'I watch a movie at the theater.',
      ru: 'Я смотрю фильм в кинотеатре.',
    },
  ),

  ...build(
    'gp_s1_u3_g11_19',
    G11,
    [
      {
        options: ['마트에서', '마트에', '마트를'],
        correct: '마트에서',
      },
      {
        options: ['과일을', '과일이', '과일에'],
        correct: '과일을',
      },
      {
        options: ['사요.', '마셔요.', '읽어요.'],
        correct: '사요.',
      },
    ],
    {
      uz: 'Supermarketda meva sotib olaman.',
      en: 'I buy fruit at the supermarket.',
      ru: 'Я покупаю фрукты в супермаркете.',
    },
  ),

  ...build(
    'gp_s1_u3_g11_20',
    G11,
    [
      {
        options: ['교실에서', '교실에', '교실을'],
        correct: '교실에서',
      },
      {
        options: ['한국어를', '한국어가', '한국어에'],
        correct: '한국어를',
      },
      {
        options: ['공부해요.', '먹어요.', '마셔요.'],
        correct: '공부해요.',
      },
    ],
    {
      uz: 'Sinfda koreys tilini o‘rganaman.',
      en: 'I study Korean in the classroom.',
      ru: 'Я изучаю корейский язык в классе.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 12. 안 V
// ─────────────────────────────────────────────
const G12 = 'neg-an';

const G12_Q = {
  // grammar_blank 10
  ...blank('gp_s1_u3_g12_01', G12, '오늘 학교에 안 가요.', '안 가요', {
    uz: 'Bugun maktabga bormayman.',
    en: 'I am not going to school today.',
    ru: 'Сегодня я не иду в школу.',
  }),

  ...blank('gp_s1_u3_g12_02', G12, '저는 커피를 안 마셔요.', '안 마셔요', {
    uz: 'Men qahva ichmayman.',
    en: 'I do not drink coffee.',
    ru: 'Я не пью кофе.',
  }),

  ...blank('gp_s1_u3_g12_03', G12, '아침을 안 먹어요.', '안 먹어요', {
    uz: 'Nonushta qilmayman.',
    en: 'I do not eat breakfast.',
    ru: 'Я не завтракаю.',
  }),

  ...blank('gp_s1_u3_g12_04', G12, '오늘은 운동을 안 해요.', '안 해요', {
    uz: 'Bugun sport bilan shug‘ullanmayman.',
    en: 'I am not exercising today.',
    ru: 'Сегодня я не занимаюсь спортом.',
  }),

  ...blank('gp_s1_u3_g12_05', G12, '저는 텔레비전을 안 봐요.', '안 봐요', {
    uz: 'Men televizor ko‘rmayman.',
    en: 'I do not watch television.',
    ru: 'Я не смотрю телевизор.',
  }),

  ...blank(
    'gp_s1_u3_g12_06',
    G12,
    '주말에는 일찍 안 일어나요.',
    '안 일어나요',
    {
      uz: 'Dam olish kunlari erta turmayman.',
      en: 'I do not get up early on weekends.',
      ru: 'На выходных я не встаю рано.',
    },
  ),

  ...blank('gp_s1_u3_g12_07', G12, '오늘은 친구를 안 만나요.', '안 만나요', {
    uz: 'Bugun do‘stim bilan uchrashmayman.',
    en: 'I am not meeting my friend today.',
    ru: 'Сегодня я не встречаюсь с другом.',
  }),

  ...blank('gp_s1_u3_g12_08', G12, '저는 고기를 안 먹어요.', '안 먹어요', {
    uz: 'Men go‘sht yemayman.',
    en: 'I do not eat meat.',
    ru: 'Я не ем мясо.',
  }),

  ...blank('gp_s1_u3_g12_09', G12, '밤에는 커피를 안 마셔요.', '안 마셔요', {
    uz: 'Kechasi qahva ichmayman.',
    en: 'I do not drink coffee at night.',
    ru: 'По вечерам я не пью кофе.',
  }),

  ...blank('gp_s1_u3_g12_10', G12, '오늘 숙제를 안 해요.', '안 해요', {
    uz: 'Bugun uy vazifasini qilmayman.',
    en: 'I am not doing homework today.',
    ru: 'Сегодня я не делаю домашнее задание.',
  }),

  // grammar_build 10
  ...build(
    'gp_s1_u3_g12_11',
    G12,
    [
      {
        options: ['오늘', '매일', '어제부터'],
        correct: '오늘',
      },
      {
        options: ['학교에', '학교를', '학교가'],
        correct: '학교에',
      },
      {
        options: ['안 가요.', '가요 안.', '안 학교에 가요.'],
        correct: '안 가요.',
      },
    ],
    {
      uz: 'Bugun maktabga bormayman.',
      en: 'I am not going to school today.',
      ru: 'Сегодня я не иду в школу.',
    },
  ),

  ...build(
    'gp_s1_u3_g12_12',
    G12,
    [
      {
        options: ['저는', '저를', '제가를'],
        correct: '저는',
      },
      {
        options: ['커피를', '커피가', '커피에'],
        correct: '커피를',
      },
      {
        options: ['안 마셔요.', '마셔요 안.', '안 커피를 마셔요.'],
        correct: '안 마셔요.',
      },
    ],
    {
      uz: 'Men qahva ichmayman.',
      en: 'I do not drink coffee.',
      ru: 'Я не пью кофе.',
    },
  ),

  ...build(
    'gp_s1_u3_g12_13',
    G12,
    [
      {
        options: ['아침을', '아침이', '아침에'],
        correct: '아침을',
      },
      {
        options: ['안 먹어요.', '먹어요 안.', '안 아침을 먹어요.'],
        correct: '안 먹어요.',
      },
    ],
    {
      uz: 'Nonushta qilmayman.',
      en: 'I do not eat breakfast.',
      ru: 'Я не завтракаю.',
    },
  ),

  ...build(
    'gp_s1_u3_g12_14',
    G12,
    [
      {
        options: ['오늘은', '오늘을', '오늘이'],
        correct: '오늘은',
      },
      {
        options: ['운동을', '운동이', '운동에'],
        correct: '운동을',
      },
      {
        options: ['안 해요.', '해요 안.', '안 운동을 해요.'],
        correct: '안 해요.',
      },
    ],
    {
      uz: 'Bugun sport bilan shug‘ullanmayman.',
      en: 'I am not exercising today.',
      ru: 'Сегодня я не занимаюсь спортом.',
    },
  ),

  ...build(
    'gp_s1_u3_g12_15',
    G12,
    [
      {
        options: ['저는', '저를', '제가를'],
        correct: '저는',
      },
      {
        options: ['텔레비전을', '텔레비전이', '텔레비전에'],
        correct: '텔레비전을',
      },
      {
        options: ['안 봐요.', '봐요 안.', '안 텔레비전을 봐요.'],
        correct: '안 봐요.',
      },
    ],
    {
      uz: 'Men televizor ko‘rmayman.',
      en: 'I do not watch television.',
      ru: 'Я не смотрю телевизор.',
    },
  ),

  ...build(
    'gp_s1_u3_g12_16',
    G12,
    [
      {
        options: ['주말에는', '주말을', '주말이가'],
        correct: '주말에는',
      },
      {
        options: ['일찍', '일찍을', '일찍이'],
        correct: '일찍',
      },
      {
        options: ['안 일어나요.', '일어나요 안.', '안 일어나다요.'],
        correct: '안 일어나요.',
      },
    ],
    {
      uz: 'Dam olish kunlari erta turmayman.',
      en: 'I do not get up early on weekends.',
      ru: 'На выходных я не встаю рано.',
    },
  ),

  ...build(
    'gp_s1_u3_g12_17',
    G12,
    [
      {
        options: ['오늘은', '오늘을', '오늘이가'],
        correct: '오늘은',
      },
      {
        options: ['친구를', '친구가', '친구에'],
        correct: '친구를',
      },
      {
        options: ['안 만나요.', '만나요 안.', '안 만나어요.'],
        correct: '안 만나요.',
      },
    ],
    {
      uz: 'Bugun do‘stim bilan uchrashmayman.',
      en: 'I am not meeting my friend today.',
      ru: 'Сегодня я не встречаюсь с другом.',
    },
  ),

  ...build(
    'gp_s1_u3_g12_18',
    G12,
    [
      {
        options: ['저는', '저를', '제가'],
        correct: '저는',
      },
      {
        options: ['고기를', '고기가', '고기에'],
        correct: '고기를',
      },
      {
        options: ['안 먹어요.', '먹어요 안.', '안 먹아요.'],
        correct: '안 먹어요.',
      },
    ],
    {
      uz: 'Men go‘sht yemayman.',
      en: 'I do not eat meat.',
      ru: 'Я не ем мясо.',
    },
  ),

  ...build(
    'gp_s1_u3_g12_19',
    G12,
    [
      {
        options: ['밤에는', '밤을', '밤이가'],
        correct: '밤에는',
      },
      {
        options: ['커피를', '커피가', '커피에'],
        correct: '커피를',
      },
      {
        options: ['안 마셔요.', '마셔요 안.', '안 마시어요.'],
        correct: '안 마셔요.',
      },
    ],
    {
      uz: 'Kechasi qahva ichmayman.',
      en: 'I do not drink coffee at night.',
      ru: 'По вечерам я не пью кофе.',
    },
  ),

  ...build(
    'gp_s1_u3_g12_20',
    G12,
    [
      {
        options: ['오늘', '매일', '어제부터'],
        correct: '오늘',
      },
      {
        options: ['숙제를', '숙제가', '숙제에'],
        correct: '숙제를',
      },
      {
        options: ['안 해요.', '해요 안.', '안 하요.'],
        correct: '안 해요.',
      },
    ],
    {
      uz: 'Bugun uy vazifasini qilmayman.',
      en: 'I am not doing homework today.',
      ru: 'Сегодня я не делаю домашнее задание.',
    },
  ),
};

// ═══════════════════════════════════════════════════════════
// UNIT 4
// 장소 · 위치 · 이동
// ═══════════════════════════════════════════════════════════

// ─────────────────────────────────────────────
// 문법 13. 여기가 N이에요/예요
// ─────────────────────────────────────────────
const G13 = 'here-is-n';

const G13_Q = {
  // grammar_blank 10
  ...blank('gp_s1_u4_g13_01', G13, '여기가 학교예요.', '여기가 학교예요', {
    uz: 'Maktab shu yerda.',
    en: 'This is the school.',
    ru: 'Здесь школа.',
  }),

  ...blank(
    'gp_s1_u4_g13_02',
    G13,
    '여기가 도서관이에요.',
    '여기가 도서관이에요',
    {
      uz: 'Kutubxona shu yerda.',
      en: 'This is the library.',
      ru: 'Здесь библиотека.',
    },
  ),

  ...blank('gp_s1_u4_g13_03', G13, '여기가 식당이에요.', '여기가 식당이에요', {
    uz: 'Restoran shu yerda.',
    en: 'This is the restaurant.',
    ru: 'Здесь ресторан.',
  }),

  ...blank('gp_s1_u4_g13_04', G13, '여기가 카페예요.', '여기가 카페예요', {
    uz: 'Kafe shu yerda.',
    en: 'This is the cafe.',
    ru: 'Здесь кафе.',
  }),

  ...blank(
    'gp_s1_u4_g13_05',
    G13,
    '여기가 우리 집이에요.',
    '여기가 우리 집이에요',
    {
      uz: 'Bizning uyimiz shu yerda.',
      en: 'This is my house.',
      ru: 'Здесь мой дом.',
    },
  ),

  ...blank('gp_s1_u4_g13_06', G13, '여기가 교실이에요.', '여기가 교실이에요', {
    uz: 'Sinf xonasi shu yerda.',
    en: 'This is the classroom.',
    ru: 'Здесь класс.',
  }),

  ...blank('gp_s1_u4_g13_07', G13, '여기가 회사예요.', '여기가 회사예요', {
    uz: 'Kompaniya shu yerda.',
    en: 'This is the company.',
    ru: 'Здесь компания.',
  }),

  ...blank('gp_s1_u4_g13_08', G13, '여기가 병원이에요.', '여기가 병원이에요', {
    uz: 'Kasalxona shu yerda.',
    en: 'This is the hospital.',
    ru: 'Здесь больница.',
  }),

  ...blank(
    'gp_s1_u4_g13_09',
    G13,
    '여기가 화장실이에요.',
    '여기가 화장실이에요',
    {
      uz: 'Hojatxona shu yerda.',
      en: 'This is the restroom.',
      ru: 'Здесь туалет.',
    },
  ),

  ...blank(
    'gp_s1_u4_g13_10',
    G13,
    '여기가 서울역이에요.',
    '여기가 서울역이에요',
    {
      uz: 'Seul vokzali shu yerda.',
      en: 'This is Seoul Station.',
      ru: 'Здесь вокзал Сеул.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s1_u4_g13_11',
    G13,
    [
      {
        options: ['여기가', '여기를', '여기는'],
        correct: '여기가',
      },
      {
        options: ['학교예요.', '학교이에요.', '학교를예요.'],
        correct: '학교예요.',
      },
    ],
    {
      uz: 'Maktab shu yerda.',
      en: 'This is the school.',
      ru: 'Здесь школа.',
    },
  ),

  ...build(
    'gp_s1_u4_g13_12',
    G13,
    [
      {
        options: ['여기가', '여기를', '여기에서'],
        correct: '여기가',
      },
      {
        options: ['도서관이에요.', '도서관예요.', '도서관을이에요.'],
        correct: '도서관이에요.',
      },
    ],
    {
      uz: 'Kutubxona shu yerda.',
      en: 'This is the library.',
      ru: 'Здесь библиотека.',
    },
  ),

  ...build(
    'gp_s1_u4_g13_13',
    G13,
    [
      {
        options: ['여기가', '여기는', '여기를'],
        correct: '여기가',
      },
      {
        options: ['식당이에요.', '식당예요.', '식당을이에요.'],
        correct: '식당이에요.',
      },
    ],
    {
      uz: 'Restoran shu yerda.',
      en: 'This is the restaurant.',
      ru: 'Здесь ресторан.',
    },
  ),

  ...build(
    'gp_s1_u4_g13_14',
    G13,
    [
      {
        options: ['여기가', '여기를', '여기에서'],
        correct: '여기가',
      },
      {
        options: ['카페예요.', '카페이에요.', '카페를예요.'],
        correct: '카페예요.',
      },
    ],
    {
      uz: 'Kafe shu yerda.',
      en: 'This is the cafe.',
      ru: 'Здесь кафе.',
    },
  ),

  ...build(
    'gp_s1_u4_g13_15',
    G13,
    [
      {
        options: ['여기가', '여기는', '여기를'],
        correct: '여기가',
      },
      {
        options: ['우리 집이에요.', '우리 집예요.', '우리 집을이에요.'],
        correct: '우리 집이에요.',
      },
    ],
    {
      uz: 'Bizning uyimiz shu yerda.',
      en: 'This is my house.',
      ru: 'Здесь мой дом.',
    },
  ),

  ...build(
    'gp_s1_u4_g13_16',
    G13,
    [
      {
        options: ['여기가', '여기를', '여기에서'],
        correct: '여기가',
      },
      {
        options: ['교실이에요.', '교실예요.', '교실을이에요.'],
        correct: '교실이에요.',
      },
    ],
    {
      uz: 'Sinf xonasi shu yerda.',
      en: 'This is the classroom.',
      ru: 'Здесь класс.',
    },
  ),

  ...build(
    'gp_s1_u4_g13_17',
    G13,
    [
      {
        options: ['여기가', '여기는', '여기를'],
        correct: '여기가',
      },
      {
        options: ['회사예요.', '회사이에요.', '회사를예요.'],
        correct: '회사예요.',
      },
    ],
    {
      uz: 'Kompaniya shu yerda.',
      en: 'This is the company.',
      ru: 'Здесь компания.',
    },
  ),

  ...build(
    'gp_s1_u4_g13_18',
    G13,
    [
      {
        options: ['여기가', '여기를', '여기에서'],
        correct: '여기가',
      },
      {
        options: ['병원이에요.', '병원예요.', '병원을이에요.'],
        correct: '병원이에요.',
      },
    ],
    {
      uz: 'Kasalxona shu yerda.',
      en: 'This is the hospital.',
      ru: 'Здесь больница.',
    },
  ),

  ...build(
    'gp_s1_u4_g13_19',
    G13,
    [
      {
        options: ['여기가', '여기는', '여기를'],
        correct: '여기가',
      },
      {
        options: ['화장실이에요.', '화장실예요.', '화장실을이에요.'],
        correct: '화장실이에요.',
      },
    ],
    {
      uz: 'Hojatxona shu yerda.',
      en: 'This is the restroom.',
      ru: 'Здесь туалет.',
    },
  ),

  ...build(
    'gp_s1_u4_g13_20',
    G13,
    [
      {
        options: ['여기가', '여기를', '여기에서'],
        correct: '여기가',
      },
      {
        options: ['서울역이에요.', '서울역예요.', '서울역을이에요.'],
        correct: '서울역이에요.',
      },
    ],
    {
      uz: 'Seul vokzali shu yerda.',
      en: 'This is Seoul Station.',
      ru: 'Здесь вокзал Сеул.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 14. N에 있어요[없어요]
// ─────────────────────────────────────────────
const G14 = 'loc-e-isseoyo';

const G14_Q = {
  // grammar_blank 10
  ...blank('gp_s1_u4_g14_01', G14, '친구는 학교에 있어요.', '학교에 있어요', {
    uz: 'Do‘stim maktabda.',
    en: 'My friend is at school.',
    ru: 'Мой друг в школе.',
  }),

  ...blank('gp_s1_u4_g14_02', G14, '선생님은 교실에 있어요.', '교실에 있어요', {
    uz: 'O‘qituvchi sinfda.',
    en: 'The teacher is in the classroom.',
    ru: 'Учитель в классе.',
  }),

  ...blank('gp_s1_u4_g14_03', G14, '책은 가방에 있어요.', '가방에 있어요', {
    uz: 'Kitob sumkada.',
    en: 'The book is in the bag.',
    ru: 'Книга в сумке.',
  }),

  ...blank('gp_s1_u4_g14_04', G14, '휴대폰은 가방에 없어요.', '가방에 없어요', {
    uz: 'Telefon sumkada yo‘q.',
    en: 'The phone is not in the bag.',
    ru: 'Телефона в сумке нет.',
  }),

  ...blank(
    'gp_s1_u4_g14_05',
    G14,
    '민수 씨는 회사에 있어요.',
    '회사에 있어요',
    {
      uz: 'Minsu ishxonada.',
      en: 'Minsu is at the office.',
      ru: 'Минсу на работе.',
    },
  ),

  ...blank(
    'gp_s1_u4_g14_06',
    G14,
    '수진 씨는 카페에 없어요.',
    '카페에 없어요',
    {
      uz: 'Sujin kafeda yo‘q.',
      en: 'Sujin is not at the cafe.',
      ru: 'Суджин нет в кафе.',
    },
  ),

  ...blank('gp_s1_u4_g14_07', G14, '우산은 집에 있어요.', '집에 있어요', {
    uz: 'Soyabon uyda.',
    en: 'The umbrella is at home.',
    ru: 'Зонт дома.',
  }),

  ...blank('gp_s1_u4_g14_08', G14, '학생들은 교실에 있어요.', '교실에 있어요', {
    uz: 'Talabalar sinfda.',
    en: 'The students are in the classroom.',
    ru: 'Студенты в классе.',
  }),

  ...blank(
    'gp_s1_u4_g14_09',
    G14,
    '화장실은 일 층에 있어요.',
    '일 층에 있어요',
    {
      uz: 'Hojatxona birinchi qavatda.',
      en: 'The restroom is on the first floor.',
      ru: 'Туалет на первом этаже.',
    },
  ),

  ...blank(
    'gp_s1_u4_g14_10',
    G14,
    '제 가방은 교실에 없어요.',
    '교실에 없어요',
    {
      uz: 'Mening sumkam sinfda yo‘q.',
      en: 'My bag is not in the classroom.',
      ru: 'Моей сумки нет в классе.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s1_u4_g14_11',
    G14,
    [
      {
        options: ['친구는', '친구를', '친구가를'],
        correct: '친구는',
      },
      {
        options: ['학교에', '학교에서', '학교를'],
        correct: '학교에',
      },
      {
        options: ['있어요.', '가요.', '공부해요.'],
        correct: '있어요.',
      },
    ],
    {
      uz: 'Do‘stim maktabda.',
      en: 'My friend is at school.',
      ru: 'Мой друг в школе.',
    },
  ),

  ...build(
    'gp_s1_u4_g14_12',
    G14,
    [
      {
        options: ['선생님은', '선생님을', '선생님가'],
        correct: '선생님은',
      },
      {
        options: ['교실에', '교실에서', '교실을'],
        correct: '교실에',
      },
      {
        options: ['있어요.', '먹어요.', '가요.'],
        correct: '있어요.',
      },
    ],
    {
      uz: 'O‘qituvchi sinfda.',
      en: 'The teacher is in the classroom.',
      ru: 'Учитель в классе.',
    },
  ),

  ...build(
    'gp_s1_u4_g14_13',
    G14,
    [
      {
        options: ['책은', '책을', '책가'],
        correct: '책은',
      },
      {
        options: ['가방에', '가방에서', '가방을'],
        correct: '가방에',
      },
      {
        options: ['있어요.', '읽어요.', '가요.'],
        correct: '있어요.',
      },
    ],
    {
      uz: 'Kitob sumkada.',
      en: 'The book is in the bag.',
      ru: 'Книга в сумке.',
    },
  ),

  ...build(
    'gp_s1_u4_g14_14',
    G14,
    [
      {
        options: ['휴대폰은', '휴대폰을', '휴대폰가'],
        correct: '휴대폰은',
      },
      {
        options: ['가방에', '가방에서', '가방을'],
        correct: '가방에',
      },
      {
        options: ['없어요.', '있어요.', '가요.'],
        correct: '없어요.',
      },
    ],
    {
      uz: 'Telefon sumkada yo‘q.',
      en: 'The phone is not in the bag.',
      ru: 'Телефона в сумке нет.',
    },
  ),

  ...build(
    'gp_s1_u4_g14_15',
    G14,
    [
      {
        options: ['민수 씨는', '민수 씨를', '민수 씨가를'],
        correct: '민수 씨는',
      },
      {
        options: ['회사에', '회사에서', '회사를'],
        correct: '회사에',
      },
      {
        options: ['있어요.', '일해요.', '가요.'],
        correct: '있어요.',
      },
    ],
    {
      uz: 'Minsu ishxonada.',
      en: 'Minsu is at the office.',
      ru: 'Минсу на работе.',
    },
  ),

  ...build(
    'gp_s1_u4_g14_16',
    G14,
    [
      {
        options: ['수진 씨는', '수진 씨를', '수진 씨가를'],
        correct: '수진 씨는',
      },
      {
        options: ['카페에', '카페에서', '카페를'],
        correct: '카페에',
      },
      {
        options: ['없어요.', '마셔요.', '가요.'],
        correct: '없어요.',
      },
    ],
    {
      uz: 'Sujin kafeda yo‘q.',
      en: 'Sujin is not at the cafe.',
      ru: 'Суджин нет в кафе.',
    },
  ),

  ...build(
    'gp_s1_u4_g14_17',
    G14,
    [
      {
        options: ['우산은', '우산을', '우산가'],
        correct: '우산은',
      },
      {
        options: ['집에', '집에서', '집을'],
        correct: '집에',
      },
      {
        options: ['있어요.', '가요.', '와요.'],
        correct: '있어요.',
      },
    ],
    {
      uz: 'Soyabon uyda.',
      en: 'The umbrella is at home.',
      ru: 'Зонт дома.',
    },
  ),

  ...build(
    'gp_s1_u4_g14_18',
    G14,
    [
      {
        options: ['학생들은', '학생들을', '학생들이를'],
        correct: '학생들은',
      },
      {
        options: ['교실에', '교실에서', '교실을'],
        correct: '교실에',
      },
      {
        options: ['있어요.', '가요.', '읽어요.'],
        correct: '있어요.',
      },
    ],
    {
      uz: 'Talabalar sinfda.',
      en: 'The students are in the classroom.',
      ru: 'Студенты в классе.',
    },
  ),

  ...build(
    'gp_s1_u4_g14_19',
    G14,
    [
      {
        options: ['화장실은', '화장실을', '화장실가'],
        correct: '화장실은',
      },
      {
        options: ['일 층에', '일 층에서', '일 층을'],
        correct: '일 층에',
      },
      {
        options: ['있어요.', '가요.', '먹어요.'],
        correct: '있어요.',
      },
    ],
    {
      uz: 'Hojatxona birinchi qavatda.',
      en: 'The restroom is on the first floor.',
      ru: 'Туалет на первом этаже.',
    },
  ),

  ...build(
    'gp_s1_u4_g14_20',
    G14,
    [
      {
        options: ['제 가방은', '제 가방을', '제 가방이가'],
        correct: '제 가방은',
      },
      {
        options: ['교실에', '교실에서', '교실을'],
        correct: '교실에',
      },
      {
        options: ['없어요.', '있어요.', '가요.'],
        correct: '없어요.',
      },
    ],
    {
      uz: 'Mening sumkam sinfda yo‘q.',
      en: 'My bag is not in the classroom.',
      ru: 'Моей сумки нет в классе.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 15. N에 가요[와요]
// ─────────────────────────────────────────────
const G15 = 'motion-e-gayo';

const G15_Q = {
  // grammar_blank 10
  ...blank('gp_s1_u4_g15_01', G15, '저는 학교에 가요.', '학교에 가요', {
    uz: 'Men maktabga boraman.',
    en: 'I go to school.',
    ru: 'Я иду в школу.',
  }),

  ...blank('gp_s1_u4_g15_02', G15, '친구가 우리 집에 와요.', '우리 집에 와요', {
    uz: 'Do‘stim biznikiga keladi.',
    en: 'My friend comes to my house.',
    ru: 'Мой друг приходит ко мне домой.',
  }),

  ...blank('gp_s1_u4_g15_03', G15, '민수 씨는 회사에 가요.', '회사에 가요', {
    uz: 'Minsu ishxonaga boradi.',
    en: 'Minsu goes to the office.',
    ru: 'Минсу идёт на работу.',
  }),

  ...blank('gp_s1_u4_g15_04', G15, '선생님이 교실에 와요.', '교실에 와요', {
    uz: 'O‘qituvchi sinfga keladi.',
    en: 'The teacher comes to the classroom.',
    ru: 'Учитель приходит в класс.',
  }),

  ...blank('gp_s1_u4_g15_05', G15, '저는 카페에 가요.', '카페에 가요', {
    uz: 'Men kafega boraman.',
    en: 'I go to a cafe.',
    ru: 'Я иду в кафе.',
  }),

  ...blank('gp_s1_u4_g15_06', G15, '수진 씨가 한국에 와요.', '한국에 와요', {
    uz: 'Sujin Koreyaga keladi.',
    en: 'Sujin comes to Korea.',
    ru: 'Суджин приезжает в Корею.',
  }),

  ...blank('gp_s1_u4_g15_07', G15, '저는 도서관에 가요.', '도서관에 가요', {
    uz: 'Men kutubxonaga boraman.',
    en: 'I go to the library.',
    ru: 'Я иду в библиотеку.',
  }),

  ...blank('gp_s1_u4_g15_08', G15, '동생이 학교에 와요.', '학교에 와요', {
    uz: 'Ukam yoki singlim maktabga keladi.',
    en: 'My younger sibling comes to school.',
    ru: 'Мой младший брат или сестра приходит в школу.',
  }),

  ...blank('gp_s1_u4_g15_09', G15, '저는 식당에 가요.', '식당에 가요', {
    uz: 'Men restoranga boraman.',
    en: 'I go to a restaurant.',
    ru: 'Я иду в ресторан.',
  }),

  ...blank('gp_s1_u4_g15_10', G15, '부모님이 서울에 와요.', '서울에 와요', {
    uz: 'Ota-onam Seulga keladi.',
    en: 'My parents come to Seoul.',
    ru: 'Мои родители приезжают в Сеул.',
  }),

  // grammar_build 10
  ...build(
    'gp_s1_u4_g15_11',
    G15,
    [
      {
        options: ['저는', '저를', '제가를'],
        correct: '저는',
      },
      {
        options: ['학교에', '학교에서', '학교를'],
        correct: '학교에',
      },
      {
        options: ['가요.', '있어요.', '공부해요.'],
        correct: '가요.',
      },
    ],
    {
      uz: 'Men maktabga boraman.',
      en: 'I go to school.',
      ru: 'Я иду в школу.',
    },
  ),

  ...build(
    'gp_s1_u4_g15_12',
    G15,
    [
      {
        options: ['친구가', '친구를', '친구는을'],
        correct: '친구가',
      },
      {
        options: ['우리 집에', '우리 집에서', '우리 집을'],
        correct: '우리 집에',
      },
      {
        options: ['와요.', '있어요.', '가요.'],
        correct: '와요.',
      },
    ],
    {
      uz: 'Do‘stim biznikiga keladi.',
      en: 'My friend comes to my house.',
      ru: 'Мой друг приходит ко мне домой.',
    },
  ),

  ...build(
    'gp_s1_u4_g15_13',
    G15,
    [
      {
        options: ['민수 씨는', '민수 씨를', '민수 씨가를'],
        correct: '민수 씨는',
      },
      {
        options: ['회사에', '회사에서', '회사를'],
        correct: '회사에',
      },
      {
        options: ['가요.', '있어요.', '일해요.'],
        correct: '가요.',
      },
    ],
    {
      uz: 'Minsu ishxonaga boradi.',
      en: 'Minsu goes to the office.',
      ru: 'Минсу идёт на работу.',
    },
  ),

  ...build(
    'gp_s1_u4_g15_14',
    G15,
    [
      {
        options: ['선생님이', '선생님을', '선생님가'],
        correct: '선생님이',
      },
      {
        options: ['교실에', '교실에서', '교실을'],
        correct: '교실에',
      },
      {
        options: ['와요.', '있어요.', '공부해요.'],
        correct: '와요.',
      },
    ],
    {
      uz: 'O‘qituvchi sinfga keladi.',
      en: 'The teacher comes to the classroom.',
      ru: 'Учитель приходит в класс.',
    },
  ),

  ...build(
    'gp_s1_u4_g15_15',
    G15,
    [
      {
        options: ['저는', '저를', '제가를'],
        correct: '저는',
      },
      {
        options: ['카페에', '카페에서', '카페를'],
        correct: '카페에',
      },
      {
        options: ['가요.', '마셔요.', '있어요.'],
        correct: '가요.',
      },
    ],
    {
      uz: 'Men kafega boraman.',
      en: 'I go to a cafe.',
      ru: 'Я иду в кафе.',
    },
  ),

  ...build(
    'gp_s1_u4_g15_16',
    G15,
    [
      {
        options: ['수진 씨가', '수진 씨를', '수진 씨는을'],
        correct: '수진 씨가',
      },
      {
        options: ['한국에', '한국에서', '한국을'],
        correct: '한국에',
      },
      {
        options: ['와요.', '있어요.', '가요.'],
        correct: '와요.',
      },
    ],
    {
      uz: 'Sujin Koreyaga keladi.',
      en: 'Sujin comes to Korea.',
      ru: 'Суджин приезжает в Корею.',
    },
  ),

  ...build(
    'gp_s1_u4_g15_17',
    G15,
    [
      {
        options: ['저는', '저를', '제가를'],
        correct: '저는',
      },
      {
        options: ['도서관에', '도서관에서', '도서관을'],
        correct: '도서관에',
      },
      {
        options: ['가요.', '읽어요.', '있어요.'],
        correct: '가요.',
      },
    ],
    {
      uz: 'Men kutubxonaga boraman.',
      en: 'I go to the library.',
      ru: 'Я иду в библиотеку.',
    },
  ),

  ...build(
    'gp_s1_u4_g15_18',
    G15,
    [
      {
        options: ['동생이', '동생을', '동생가는'],
        correct: '동생이',
      },
      {
        options: ['학교에', '학교에서', '학교를'],
        correct: '학교에',
      },
      {
        options: ['와요.', '있어요.', '가요.'],
        correct: '와요.',
      },
    ],
    {
      uz: 'Ukam yoki singlim maktabga keladi.',
      en: 'My younger sibling comes to school.',
      ru: 'Мой младший брат или сестра приходит в школу.',
    },
  ),

  ...build(
    'gp_s1_u4_g15_19',
    G15,
    [
      {
        options: ['저는', '저를', '제가를'],
        correct: '저는',
      },
      {
        options: ['식당에', '식당에서', '식당을'],
        correct: '식당에',
      },
      {
        options: ['가요.', '먹어요.', '있어요.'],
        correct: '가요.',
      },
    ],
    {
      uz: 'Men restoranga boraman.',
      en: 'I go to a restaurant.',
      ru: 'Я иду в ресторан.',
    },
  ),

  ...build(
    'gp_s1_u4_g15_20',
    G15,
    [
      {
        options: ['부모님이', '부모님을', '부모님가는'],
        correct: '부모님이',
      },
      {
        options: ['서울에', '서울에서', '서울을'],
        correct: '서울에',
      },
      {
        options: ['와요.', '있어요.', '가요.'],
        correct: '와요.',
      },
    ],
    {
      uz: 'Ota-onam Seulga keladi.',
      en: 'My parents come to Seoul.',
      ru: 'Мои родители приезжают в Сеул.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 16. N 앞[뒤, 옆]에 있어요
// ─────────────────────────────────────────────
const G16 = 'pos-ap-dwi-yeop';

const G16_Q = {
  // grammar_blank 10
  ...blank(
    'gp_s1_u4_g16_01',
    G16,
    '가방이 의자 옆에 있어요.',
    '의자 옆에 있어요',
    {
      uz: 'Sumka stulning yonida.',
      en: 'The bag is next to the chair.',
      ru: 'Сумка находится рядом со стулом.',
    },
  ),

  ...blank(
    'gp_s1_u4_g16_02',
    G16,
    '카페가 학교 앞에 있어요.',
    '학교 앞에 있어요',
    {
      uz: 'Kafe maktabning oldida.',
      en: 'The cafe is in front of the school.',
      ru: 'Кафе находится перед школой.',
    },
  ),

  ...blank(
    'gp_s1_u4_g16_03',
    G16,
    '주차장이 건물 뒤에 있어요.',
    '건물 뒤에 있어요',
    {
      uz: 'Avtoturargoh binoning orqasida.',
      en: 'The parking lot is behind the building.',
      ru: 'Парковка находится за зданием.',
    },
  ),

  ...blank(
    'gp_s1_u4_g16_04',
    G16,
    '선생님이 학생 옆에 있어요.',
    '학생 옆에 있어요',
    {
      uz: 'O‘qituvchi talabaning yonida.',
      en: 'The teacher is next to the student.',
      ru: 'Учитель находится рядом со студентом.',
    },
  ),

  ...blank(
    'gp_s1_u4_g16_05',
    G16,
    '버스 정류장이 은행 앞에 있어요.',
    '은행 앞에 있어요',
    {
      uz: 'Avtobus bekati bankning oldida.',
      en: 'The bus stop is in front of the bank.',
      ru: 'Автобусная остановка находится перед банком.',
    },
  ),

  ...blank(
    'gp_s1_u4_g16_06',
    G16,
    '화장실이 교실 옆에 있어요.',
    '교실 옆에 있어요',
    {
      uz: 'Hojatxona sinfning yonida.',
      en: 'The restroom is next to the classroom.',
      ru: 'Туалет находится рядом с классом.',
    },
  ),

  ...blank(
    'gp_s1_u4_g16_07',
    G16,
    '자동차가 집 앞에 있어요.',
    '집 앞에 있어요',
    {
      uz: 'Mashina uyning oldida.',
      en: 'The car is in front of the house.',
      ru: 'Машина находится перед домом.',
    },
  ),

  ...blank(
    'gp_s1_u4_g16_08',
    G16,
    '공원이 학교 뒤에 있어요.',
    '학교 뒤에 있어요',
    {
      uz: 'Bog‘ maktabning orqasida.',
      en: 'The park is behind the school.',
      ru: 'Парк находится за школой.',
    },
  ),

  ...blank('gp_s1_u4_g16_09', G16, '우산이 문 옆에 있어요.', '문 옆에 있어요', {
    uz: 'Soyabon eshikning yonida.',
    en: 'The umbrella is next to the door.',
    ru: 'Зонт находится рядом с дверью.',
  }),

  ...blank(
    'gp_s1_u4_g16_10',
    G16,
    '민수 씨가 수진 씨 옆에 있어요.',
    '수진 씨 옆에 있어요',
    {
      uz: 'Minsu Sujinning yonida.',
      en: 'Minsu is next to Sujin.',
      ru: 'Минсу находится рядом с Суджин.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s1_u4_g16_11',
    G16,
    [
      {
        options: ['가방이', '가방을', '가방에'],
        correct: '가방이',
      },
      {
        options: ['의자 옆에', '의자 옆에서', '의자 옆을'],
        correct: '의자 옆에',
      },
      {
        options: ['있어요.', '가요.', '먹어요.'],
        correct: '있어요.',
      },
    ],
    {
      uz: 'Sumka stulning yonida.',
      en: 'The bag is next to the chair.',
      ru: 'Сумка находится рядом со стулом.',
    },
  ),

  ...build(
    'gp_s1_u4_g16_12',
    G16,
    [
      {
        options: ['카페가', '카페를', '카페에'],
        correct: '카페가',
      },
      {
        options: ['학교 앞에', '학교 앞에서', '학교 앞을'],
        correct: '학교 앞에',
      },
      {
        options: ['있어요.', '마셔요.', '가요.'],
        correct: '있어요.',
      },
    ],
    {
      uz: 'Kafe maktabning oldida.',
      en: 'The cafe is in front of the school.',
      ru: 'Кафе находится перед школой.',
    },
  ),

  ...build(
    'gp_s1_u4_g16_13',
    G16,
    [
      {
        options: ['주차장이', '주차장을', '주차장에'],
        correct: '주차장이',
      },
      {
        options: ['건물 뒤에', '건물 뒤에서', '건물 뒤를'],
        correct: '건물 뒤에',
      },
      {
        options: ['있어요.', '가요.', '와요.'],
        correct: '있어요.',
      },
    ],
    {
      uz: 'Avtoturargoh binoning orqasida.',
      en: 'The parking lot is behind the building.',
      ru: 'Парковка находится за зданием.',
    },
  ),

  ...build(
    'gp_s1_u4_g16_14',
    G16,
    [
      {
        options: ['선생님이', '선생님을', '선생님에'],
        correct: '선생님이',
      },
      {
        options: ['학생 옆에', '학생 옆에서', '학생 옆을'],
        correct: '학생 옆에',
      },
      {
        options: ['있어요.', '공부해요.', '가요.'],
        correct: '있어요.',
      },
    ],
    {
      uz: 'O‘qituvchi talabaning yonida.',
      en: 'The teacher is next to the student.',
      ru: 'Учитель находится рядом со студентом.',
    },
  ),

  ...build(
    'gp_s1_u4_g16_15',
    G16,
    [
      {
        options: ['버스 정류장이', '버스 정류장을', '버스 정류장에'],
        correct: '버스 정류장이',
      },
      {
        options: ['은행 앞에', '은행 앞에서', '은행 앞을'],
        correct: '은행 앞에',
      },
      {
        options: ['있어요.', '가요.', '타요.'],
        correct: '있어요.',
      },
    ],
    {
      uz: 'Avtobus bekati bankning oldida.',
      en: 'The bus stop is in front of the bank.',
      ru: 'Автобусная остановка находится перед банком.',
    },
  ),

  ...build(
    'gp_s1_u4_g16_16',
    G16,
    [
      {
        options: ['화장실이', '화장실을', '화장실에'],
        correct: '화장실이',
      },
      {
        options: ['교실 옆에', '교실 옆에서', '교실 옆을'],
        correct: '교실 옆에',
      },
      {
        options: ['있어요.', '공부해요.', '가요.'],
        correct: '있어요.',
      },
    ],
    {
      uz: 'Hojatxona sinfning yonida.',
      en: 'The restroom is next to the classroom.',
      ru: 'Туалет находится рядом с классом.',
    },
  ),

  ...build(
    'gp_s1_u4_g16_17',
    G16,
    [
      {
        options: ['자동차가', '자동차를', '자동차에'],
        correct: '자동차가',
      },
      {
        options: ['집 앞에', '집 앞에서', '집 앞을'],
        correct: '집 앞에',
      },
      {
        options: ['있어요.', '가요.', '와요.'],
        correct: '있어요.',
      },
    ],
    {
      uz: 'Mashina uyning oldida.',
      en: 'The car is in front of the house.',
      ru: 'Машина находится перед домом.',
    },
  ),

  ...build(
    'gp_s1_u4_g16_18',
    G16,
    [
      {
        options: ['공원이', '공원을', '공원에'],
        correct: '공원이',
      },
      {
        options: ['학교 뒤에', '학교 뒤에서', '학교 뒤를'],
        correct: '학교 뒤에',
      },
      {
        options: ['있어요.', '가요.', '공부해요.'],
        correct: '있어요.',
      },
    ],
    {
      uz: 'Bog‘ maktabning orqasida.',
      en: 'The park is behind the school.',
      ru: 'Парк находится за школой.',
    },
  ),

  ...build(
    'gp_s1_u4_g16_19',
    G16,
    [
      {
        options: ['우산이', '우산을', '우산에'],
        correct: '우산이',
      },
      {
        options: ['문 옆에', '문 옆에서', '문 옆을'],
        correct: '문 옆에',
      },
      {
        options: ['있어요.', '가요.', '와요.'],
        correct: '있어요.',
      },
    ],
    {
      uz: 'Soyabon eshikning yonida.',
      en: 'The umbrella is next to the door.',
      ru: 'Зонт находится рядом с дверью.',
    },
  ),

  ...build(
    'gp_s1_u4_g16_20',
    G16,
    [
      {
        options: ['민수 씨가', '민수 씨를', '민수 씨에'],
        correct: '민수 씨가',
      },
      {
        options: ['수진 씨 옆에', '수진 씨 옆에서', '수진 씨 옆을'],
        correct: '수진 씨 옆에',
      },
      {
        options: ['있어요.', '가요.', '만나요.'],
        correct: '있어요.',
      },
    ],
    {
      uz: 'Minsu Sujinning yonida.',
      en: 'Minsu is next to Sujin.',
      ru: 'Минсу находится рядом с Суджин.',
    },
  ),
};

// ═══════════════════════════════════════════════════════════
// UNIT 5
// 날짜 · 시간 · 과거 · 행동 연결
// ═══════════════════════════════════════════════════════════

// ─────────────────────────────────────────────
// 문법 17. 오늘이 며칠이에요? / 무슨 요일이에요?
// ─────────────────────────────────────────────
const G17 = 'date-and-day';

const G17_Q = {
  // grammar_blank 10
  ...blank('gp_s1_u5_g17_01', G17, '오늘이 며칠이에요?', '며칠이에요', {
    uz: 'Bugun oyning nechanchi kuni?',
    en: 'What date is it today?',
    ru: 'Какое сегодня число?',
  }),

  ...blank(
    'gp_s1_u5_g17_02',
    G17,
    '오늘이 무슨 요일이에요?',
    '무슨 요일이에요',
    {
      uz: 'Bugun haftaning qaysi kuni?',
      en: 'What day of the week is it today?',
      ru: 'Какой сегодня день недели?',
    },
  ),

  ...blank('gp_s1_u5_g17_03', G17, '내일이 며칠이에요?', '며칠이에요', {
    uz: 'Ertaga oyning nechanchi kuni?',
    en: 'What date is it tomorrow?',
    ru: 'Какое завтра число?',
  }),

  ...blank(
    'gp_s1_u5_g17_04',
    G17,
    '내일이 무슨 요일이에요?',
    '무슨 요일이에요',
    {
      uz: 'Ertaga haftaning qaysi kuni?',
      en: 'What day of the week is it tomorrow?',
      ru: 'Какой завтра день недели?',
    },
  ),

  ...blank('gp_s1_u5_g17_05', G17, '생일이 며칠이에요?', '며칠이에요', {
    uz: 'Tug‘ilgan kuningiz oyning nechanchi kuni?',
    en: 'What date is your birthday?',
    ru: 'Какого числа ваш день рождения?',
  }),

  ...blank(
    'gp_s1_u5_g17_06',
    G17,
    '시험이 무슨 요일이에요?',
    '무슨 요일이에요',
    {
      uz: 'Imtihon haftaning qaysi kuni?',
      en: 'What day of the week is the exam?',
      ru: 'В какой день недели экзамен?',
    },
  ),

  ...blank('gp_s1_u5_g17_07', G17, '오늘은 5월 3일이에요.', '5월 3일이에요', {
    uz: 'Bugun 3-may.',
    en: 'Today is May 3rd.',
    ru: 'Сегодня 3 мая.',
  }),

  ...blank('gp_s1_u5_g17_08', G17, '오늘은 월요일이에요.', '월요일이에요', {
    uz: 'Bugun dushanba.',
    en: 'Today is Monday.',
    ru: 'Сегодня понедельник.',
  }),

  ...blank(
    'gp_s1_u5_g17_09',
    G17,
    '제 생일은 8월 15일이에요.',
    '8월 15일이에요',
    {
      uz: 'Mening tug‘ilgan kunim 15-avgust.',
      en: 'My birthday is August 15th.',
      ru: 'Мой день рождения 15 августа.',
    },
  ),

  ...blank('gp_s1_u5_g17_10', G17, '시험은 금요일이에요.', '금요일이에요', {
    uz: 'Imtihon juma kuni.',
    en: 'The exam is on Friday.',
    ru: 'Экзамен в пятницу.',
  }),

  // grammar_build 10
  ...build(
    'gp_s1_u5_g17_11',
    G17,
    [
      {
        options: [
          '오늘이 며칠이에요?',
          '오늘이 무슨 요일이에요?',
          '오늘이 몇 시예요?',
        ],
        correct: '오늘이 며칠이에요?',
      },
    ],
    {
      uz: 'Bugun oyning nechanchi kuni?',
      en: 'What date is it today?',
      ru: 'Какое сегодня число?',
    },
  ),

  ...build(
    'gp_s1_u5_g17_12',
    G17,
    [
      {
        options: [
          '오늘이 무슨 요일이에요?',
          '오늘이 며칠이에요?',
          '오늘이 몇 시예요?',
        ],
        correct: '오늘이 무슨 요일이에요?',
      },
    ],
    {
      uz: 'Bugun haftaning qaysi kuni?',
      en: 'What day of the week is it today?',
      ru: 'Какой сегодня день недели?',
    },
  ),

  ...build(
    'gp_s1_u5_g17_13',
    G17,
    [
      {
        options: ['내일이', '어제가', '오늘을'],
        correct: '내일이',
      },
      {
        options: ['며칠이에요?', '무슨 요일이에요?', '몇 시예요?'],
        correct: '며칠이에요?',
      },
    ],
    {
      uz: 'Ertaga oyning nechanchi kuni?',
      en: 'What date is it tomorrow?',
      ru: 'Какое завтра число?',
    },
  ),

  ...build(
    'gp_s1_u5_g17_14',
    G17,
    [
      {
        options: ['내일이', '어제가', '오늘을'],
        correct: '내일이',
      },
      {
        options: ['무슨 요일이에요?', '며칠이에요?', '몇 시예요?'],
        correct: '무슨 요일이에요?',
      },
    ],
    {
      uz: 'Ertaga haftaning qaysi kuni?',
      en: 'What day of the week is it tomorrow?',
      ru: 'Какой завтра день недели?',
    },
  ),

  ...build(
    'gp_s1_u5_g17_15',
    G17,
    [
      {
        options: ['생일이', '생일을', '생일에'],
        correct: '생일이',
      },
      {
        options: ['며칠이에요?', '몇 시예요?', '어디예요?'],
        correct: '며칠이에요?',
      },
    ],
    {
      uz: 'Tug‘ilgan kuningiz oyning nechanchi kuni?',
      en: 'What date is your birthday?',
      ru: 'Какого числа ваш день рождения?',
    },
  ),

  ...build(
    'gp_s1_u5_g17_16',
    G17,
    [
      {
        options: ['시험이', '시험을', '시험에'],
        correct: '시험이',
      },
      {
        options: ['무슨 요일이에요?', '며칠이에요?', '몇 시부터예요?'],
        correct: '무슨 요일이에요?',
      },
    ],
    {
      uz: 'Imtihon haftaning qaysi kuni?',
      en: 'What day of the week is the exam?',
      ru: 'В какой день недели экзамен?',
    },
  ),

  ...build(
    'gp_s1_u5_g17_17',
    G17,
    [
      {
        options: ['오늘은', '오늘을', '오늘이'],
        correct: '오늘은',
      },
      {
        options: ['5월 3일이에요.', '월요일이에요.', '오후 세 시예요.'],
        correct: '5월 3일이에요.',
      },
    ],
    {
      uz: 'Bugun 3-may.',
      en: 'Today is May 3rd.',
      ru: 'Сегодня 3 мая.',
    },
  ),

  ...build(
    'gp_s1_u5_g17_18',
    G17,
    [
      {
        options: ['오늘은', '오늘을', '오늘에서'],
        correct: '오늘은',
      },
      {
        options: ['월요일이에요.', '5월 3일이에요.', '세 시예요.'],
        correct: '월요일이에요.',
      },
    ],
    {
      uz: 'Bugun dushanba.',
      en: 'Today is Monday.',
      ru: 'Сегодня понедельник.',
    },
  ),

  ...build(
    'gp_s1_u5_g17_19',
    G17,
    [
      {
        options: ['제 생일은', '제 생일을', '제 생일이'],
        correct: '제 생일은',
      },
      {
        options: ['8월 15일이에요.', '금요일이에요.', '여덟 시예요.'],
        correct: '8월 15일이에요.',
      },
    ],
    {
      uz: 'Mening tug‘ilgan kunim 15-avgust.',
      en: 'My birthday is August 15th.',
      ru: 'Мой день рождения 15 августа.',
    },
  ),

  ...build(
    'gp_s1_u5_g17_20',
    G17,
    [
      {
        options: ['시험은', '시험을', '시험에서'],
        correct: '시험은',
      },
      {
        options: ['금요일이에요.', '10월 2일이에요.', '오전 아홉 시예요.'],
        correct: '금요일이에요.',
      },
    ],
    {
      uz: 'Imtihon juma kuni.',
      en: 'The exam is on Friday.',
      ru: 'Экзамен в пятницу.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 18. 시간 N에
// ─────────────────────────────────────────────
const G18 = 'time-e';

const G18_Q = {
  // grammar_blank 10
  ...blank('gp_s1_u5_g18_01', G18, '아침 일곱 시에 일어나요.', '일곱 시에', {
    uz: 'Ertalab soat yettida turaman.',
    en: 'I get up at seven in the morning.',
    ru: 'Я встаю в семь утра.',
  }),

  ...blank(
    'gp_s1_u5_g18_02',
    G18,
    '오전 아홉 시에 수업이 시작해요.',
    '아홉 시에',
    {
      uz: 'Dars ertalab soat to‘qqizda boshlanadi.',
      en: 'Class starts at nine in the morning.',
      ru: 'Занятие начинается в девять утра.',
    },
  ),

  ...blank('gp_s1_u5_g18_03', G18, '열두 시에 점심을 먹어요.', '열두 시에', {
    uz: 'Soat o‘n ikkida tushlik qilaman.',
    en: 'I eat lunch at twelve.',
    ru: 'Я обедаю в двенадцать часов.',
  }),

  ...blank('gp_s1_u5_g18_04', G18, '오후 두 시에 친구를 만나요.', '두 시에', {
    uz: 'Do‘stim bilan tushdan keyin soat ikkida uchrashaman.',
    en: 'I meet my friend at two in the afternoon.',
    ru: 'Я встречаюсь с другом в два часа дня.',
  }),

  ...blank('gp_s1_u5_g18_05', G18, '오후 여섯 시에 집에 가요.', '여섯 시에', {
    uz: 'Tushdan keyin soat oltida uyga boraman.',
    en: 'I go home at six in the evening.',
    ru: 'Я иду домой в шесть вечера.',
  }),

  ...blank('gp_s1_u5_g18_06', G18, '저녁 일곱 시에 운동해요.', '일곱 시에', {
    uz: 'Kechqurun soat yettida sport bilan shug‘ullanaman.',
    en: 'I exercise at seven in the evening.',
    ru: 'Я занимаюсь спортом в семь вечера.',
  }),

  ...blank('gp_s1_u5_g18_07', G18, '밤 열 시에 숙제를 해요.', '열 시에', {
    uz: 'Kechasi soat o‘nda uy vazifasini qilaman.',
    en: 'I do my homework at ten at night.',
    ru: 'Я делаю домашнее задание в десять вечера.',
  }),

  ...blank('gp_s1_u5_g18_08', G18, '밤 열한 시에 자요.', '열한 시에', {
    uz: 'Kechasi soat o‘n birda uxlayman.',
    en: 'I go to bed at eleven at night.',
    ru: 'Я ложусь спать в одиннадцать вечера.',
  }),

  ...blank('gp_s1_u5_g18_09', G18, '오전 열 시에 병원에 가요.', '열 시에', {
    uz: 'Ertalab soat o‘nda kasalxonaga boraman.',
    en: 'I go to the hospital at ten in the morning.',
    ru: 'Я иду в больницу в десять утра.',
  }),

  ...blank('gp_s1_u5_g18_10', G18, '오후 세 시에 커피를 마셔요.', '세 시에', {
    uz: 'Tushdan keyin soat uchda qahva ichaman.',
    en: 'I drink coffee at three in the afternoon.',
    ru: 'Я пью кофе в три часа дня.',
  }),

  // grammar_build 10
  ...build(
    'gp_s1_u5_g18_11',
    G18,
    [
      {
        options: ['아침', '저녁', '밤'],
        correct: '아침',
      },
      {
        options: ['일곱 시에', '일곱 시를', '일곱 시가'],
        correct: '일곱 시에',
      },
      {
        options: ['일어나요.', '자요.', '먹어요.'],
        correct: '일어나요.',
      },
    ],
    {
      uz: 'Ertalab soat yettida turaman.',
      en: 'I get up at seven in the morning.',
      ru: 'Я встаю в семь утра.',
    },
  ),

  ...build(
    'gp_s1_u5_g18_12',
    G18,
    [
      {
        options: ['오전', '오후', '밤'],
        correct: '오전',
      },
      {
        options: ['아홉 시에', '아홉 시를', '아홉 시가'],
        correct: '아홉 시에',
      },
      {
        options: ['수업이 시작해요.', '수업을 먹어요.', '수업에 가요.'],
        correct: '수업이 시작해요.',
      },
    ],
    {
      uz: 'Dars ertalab soat to‘qqizda boshlanadi.',
      en: 'Class starts at nine in the morning.',
      ru: 'Занятие начинается в девять утра.',
    },
  ),

  ...build(
    'gp_s1_u5_g18_13',
    G18,
    [
      {
        options: ['열두 시에', '열두 시를', '열두 시가'],
        correct: '열두 시에',
      },
      {
        options: ['점심을 먹어요.', '점심이 있어요.', '점심에 가요.'],
        correct: '점심을 먹어요.',
      },
    ],
    {
      uz: 'Soat o‘n ikkida tushlik qilaman.',
      en: 'I eat lunch at twelve.',
      ru: 'Я обедаю в двенадцать часов.',
    },
  ),

  ...build(
    'gp_s1_u5_g18_14',
    G18,
    [
      {
        options: ['오후', '오전', '새벽'],
        correct: '오후',
      },
      {
        options: ['두 시에', '두 시를', '두 시가'],
        correct: '두 시에',
      },
      {
        options: ['친구를 만나요.', '친구가 와요.', '친구는 학생이에요.'],
        correct: '친구를 만나요.',
      },
    ],
    {
      uz: 'Do‘stim bilan tushdan keyin soat ikkida uchrashaman.',
      en: 'I meet my friend at two in the afternoon.',
      ru: 'Я встречаюсь с другом в два часа дня.',
    },
  ),

  ...build(
    'gp_s1_u5_g18_15',
    G18,
    [
      {
        options: ['오후', '오전', '아침'],
        correct: '오후',
      },
      {
        options: ['여섯 시에', '여섯 시를', '여섯 시가'],
        correct: '여섯 시에',
      },
      {
        options: ['집에 가요.', '집에 있어요.', '집에서 먹어요.'],
        correct: '집에 가요.',
      },
    ],
    {
      uz: 'Tushdan keyin soat oltida uyga boraman.',
      en: 'I go home at six in the evening.',
      ru: 'Я иду домой в шесть вечера.',
    },
  ),

  ...build(
    'gp_s1_u5_g18_16',
    G18,
    [
      {
        options: ['저녁', '아침', '오전'],
        correct: '저녁',
      },
      {
        options: ['일곱 시에', '일곱 시를', '일곱 시가'],
        correct: '일곱 시에',
      },
      {
        options: ['운동해요.', '자요.', '일어나요.'],
        correct: '운동해요.',
      },
    ],
    {
      uz: 'Kechqurun soat yettida sport bilan shug‘ullanaman.',
      en: 'I exercise at seven in the evening.',
      ru: 'Я занимаюсь спортом в семь вечера.',
    },
  ),

  ...build(
    'gp_s1_u5_g18_17',
    G18,
    [
      {
        options: ['밤', '아침', '오전'],
        correct: '밤',
      },
      {
        options: ['열 시에', '열 시를', '열 시가'],
        correct: '열 시에',
      },
      {
        options: ['숙제를 해요.', '숙제가 있어요.', '숙제에 가요.'],
        correct: '숙제를 해요.',
      },
    ],
    {
      uz: 'Kechasi soat o‘nda uy vazifasini qilaman.',
      en: 'I do my homework at ten at night.',
      ru: 'Я делаю домашнее задание в десять вечера.',
    },
  ),

  ...build(
    'gp_s1_u5_g18_18',
    G18,
    [
      {
        options: ['밤', '오전', '점심'],
        correct: '밤',
      },
      {
        options: ['열한 시에', '열한 시를', '열한 시가'],
        correct: '열한 시에',
      },
      {
        options: ['자요.', '일어나요.', '학교에 가요.'],
        correct: '자요.',
      },
    ],
    {
      uz: 'Kechasi soat o‘n birda uxlayman.',
      en: 'I go to bed at eleven at night.',
      ru: 'Я ложусь спать в одиннадцать вечера.',
    },
  ),

  ...build(
    'gp_s1_u5_g18_19',
    G18,
    [
      {
        options: ['오전', '오후', '저녁'],
        correct: '오전',
      },
      {
        options: ['열 시에', '열 시를', '열 시가'],
        correct: '열 시에',
      },
      {
        options: ['병원에 가요.', '병원에 있어요.', '병원에서 자요.'],
        correct: '병원에 가요.',
      },
    ],
    {
      uz: 'Ertalab soat o‘nda kasalxonaga boraman.',
      en: 'I go to the hospital at ten in the morning.',
      ru: 'Я иду в больницу в десять утра.',
    },
  ),

  ...build(
    'gp_s1_u5_g18_20',
    G18,
    [
      {
        options: ['오후', '오전', '아침'],
        correct: '오후',
      },
      {
        options: ['세 시에', '세 시를', '세 시가'],
        correct: '세 시에',
      },
      {
        options: ['커피를 마셔요.', '커피가 있어요.', '커피예요.'],
        correct: '커피를 마셔요.',
      },
    ],
    {
      uz: 'Tushdan keyin soat uchda qahva ichaman.',
      en: 'I drink coffee at three in the afternoon.',
      ru: 'Я пью кофе в три часа дня.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 19. V-았/었어요
// ─────────────────────────────────────────────
const G19 = 'past-ass-eoss-eoyo';

const G19_Q = {
  // grammar_blank 10
  ...blank('gp_s1_u5_g19_01', G19, '어제 학교에 갔어요.', '갔어요', {
    uz: 'Kecha maktabga bordim.',
    en: 'I went to school yesterday.',
    ru: 'Вчера я ходил в школу.',
  }),

  ...blank('gp_s1_u5_g19_02', G19, '아침에 빵을 먹었어요.', '먹었어요', {
    uz: 'Ertalab non yedim.',
    en: 'I ate bread in the morning.',
    ru: 'Утром я ел хлеб.',
  }),

  ...blank('gp_s1_u5_g19_03', G19, '어제 친구를 만났어요.', '만났어요', {
    uz: 'Kecha do‘stim bilan uchrashdim.',
    en: 'I met my friend yesterday.',
    ru: 'Вчера я встретился с другом.',
  }),

  ...blank('gp_s1_u5_g19_04', G19, '주말에 영화를 봤어요.', '봤어요', {
    uz: 'Dam olish kunlari film ko‘rdim.',
    en: 'I watched a movie on the weekend.',
    ru: 'На выходных я посмотрел фильм.',
  }),

  ...blank('gp_s1_u5_g19_05', G19, '어제 한국어를 공부했어요.', '공부했어요', {
    uz: 'Kecha koreys tilini o‘rgandim.',
    en: 'I studied Korean yesterday.',
    ru: 'Вчера я изучал корейский язык.',
  }),

  ...blank('gp_s1_u5_g19_06', G19, '아침에 커피를 마셨어요.', '마셨어요', {
    uz: 'Ertalab qahva ichdim.',
    en: 'I drank coffee in the morning.',
    ru: 'Утром я выпил кофе.',
  }),

  ...blank('gp_s1_u5_g19_07', G19, '어젯밤에 책을 읽었어요.', '읽었어요', {
    uz: 'Kecha kechqurun kitob o‘qidim.',
    en: 'I read a book last night.',
    ru: 'Вчера вечером я читал книгу.',
  }),

  ...blank('gp_s1_u5_g19_08', G19, '어제 열한 시에 잤어요.', '잤어요', {
    uz: 'Kecha soat o‘n birda uxladim.',
    en: 'I went to bed at eleven yesterday.',
    ru: 'Вчера я лёг спать в одиннадцать.',
  }),

  ...blank('gp_s1_u5_g19_09', G19, '마트에서 사과를 샀어요.', '샀어요', {
    uz: 'Supermarketda olma sotib oldim.',
    en: 'I bought apples at the supermarket.',
    ru: 'Я купил яблоки в супермаркете.',
  }),

  ...blank(
    'gp_s1_u5_g19_10',
    G19,
    '오늘 아침 일곱 시에 일어났어요.',
    '일어났어요',
    {
      uz: 'Bugun ertalab soat yettida turdim.',
      en: 'I got up at seven this morning.',
      ru: 'Сегодня утром я встал в семь.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s1_u5_g19_11',
    G19,
    [
      {
        options: ['어제', '내일', '매일'],
        correct: '어제',
      },
      {
        options: ['학교에', '학교에서', '학교를'],
        correct: '학교에',
      },
      {
        options: ['갔어요.', '가요.', '갈 거예요.'],
        correct: '갔어요.',
      },
    ],
    {
      uz: 'Kecha maktabga bordim.',
      en: 'I went to school yesterday.',
      ru: 'Вчера я ходил в школу.',
    },
  ),

  ...build(
    'gp_s1_u5_g19_12',
    G19,
    [
      {
        options: ['아침에', '내일 아침에', '매일 아침에'],
        correct: '아침에',
      },
      {
        options: ['빵을', '빵이', '빵에'],
        correct: '빵을',
      },
      {
        options: ['먹었어요.', '먹어요.', '먹을 거예요.'],
        correct: '먹었어요.',
      },
    ],
    {
      uz: 'Ertalab non yedim.',
      en: 'I ate bread in the morning.',
      ru: 'Утром я ел хлеб.',
    },
  ),

  ...build(
    'gp_s1_u5_g19_13',
    G19,
    [
      {
        options: ['어제', '내일', '매일'],
        correct: '어제',
      },
      {
        options: ['친구를', '친구가', '친구에'],
        correct: '친구를',
      },
      {
        options: ['만났어요.', '만나요.', '만날 거예요.'],
        correct: '만났어요.',
      },
    ],
    {
      uz: 'Kecha do‘stim bilan uchrashdim.',
      en: 'I met my friend yesterday.',
      ru: 'Вчера я встретился с другом.',
    },
  ),

  ...build(
    'gp_s1_u5_g19_14',
    G19,
    [
      {
        options: ['주말에', '다음 주말에', '매주'],
        correct: '주말에',
      },
      {
        options: ['영화를', '영화가', '영화에'],
        correct: '영화를',
      },
      {
        options: ['봤어요.', '봐요.', '볼 거예요.'],
        correct: '봤어요.',
      },
    ],
    {
      uz: 'Dam olish kunlari film ko‘rdim.',
      en: 'I watched a movie on the weekend.',
      ru: 'На выходных я посмотрел фильм.',
    },
  ),

  ...build(
    'gp_s1_u5_g19_15',
    G19,
    [
      {
        options: ['어제', '내일', '매일'],
        correct: '어제',
      },
      {
        options: ['한국어를', '한국어가', '한국어에'],
        correct: '한국어를',
      },
      {
        options: ['공부했어요.', '공부해요.', '공부할 거예요.'],
        correct: '공부했어요.',
      },
    ],
    {
      uz: 'Kecha koreys tilini o‘rgandim.',
      en: 'I studied Korean yesterday.',
      ru: 'Вчера я изучал корейский язык.',
    },
  ),

  ...build(
    'gp_s1_u5_g19_16',
    G19,
    [
      {
        options: ['아침에', '내일 아침에', '매일 아침에'],
        correct: '아침에',
      },
      {
        options: ['커피를', '커피가', '커피에'],
        correct: '커피를',
      },
      {
        options: ['마셨어요.', '마셔요.', '마실 거예요.'],
        correct: '마셨어요.',
      },
    ],
    {
      uz: 'Ertalab qahva ichdim.',
      en: 'I drank coffee in the morning.',
      ru: 'Утром я выпил кофе.',
    },
  ),

  ...build(
    'gp_s1_u5_g19_17',
    G19,
    [
      {
        options: ['어젯밤에', '오늘 밤에', '매일 밤에'],
        correct: '어젯밤에',
      },
      {
        options: ['책을', '책이', '책에'],
        correct: '책을',
      },
      {
        options: ['읽었어요.', '읽어요.', '읽을 거예요.'],
        correct: '읽었어요.',
      },
    ],
    {
      uz: 'Kecha kechqurun kitob o‘qidim.',
      en: 'I read a book last night.',
      ru: 'Вчера вечером я читал книгу.',
    },
  ),

  ...build(
    'gp_s1_u5_g19_18',
    G19,
    [
      {
        options: ['어제', '내일', '매일'],
        correct: '어제',
      },
      {
        options: ['열한 시에', '열한 시를', '열한 시가'],
        correct: '열한 시에',
      },
      {
        options: ['잤어요.', '자요.', '잘 거예요.'],
        correct: '잤어요.',
      },
    ],
    {
      uz: 'Kecha soat o‘n birda uxladim.',
      en: 'I went to bed at eleven yesterday.',
      ru: 'Вчера я лёг спать в одиннадцать.',
    },
  ),

  ...build(
    'gp_s1_u5_g19_19',
    G19,
    [
      {
        options: ['마트에서', '마트에', '마트를'],
        correct: '마트에서',
      },
      {
        options: ['사과를', '사과가', '사과에'],
        correct: '사과를',
      },
      {
        options: ['샀어요.', '사요.', '살 거예요.'],
        correct: '샀어요.',
      },
    ],
    {
      uz: 'Supermarketda olma sotib oldim.',
      en: 'I bought apples at the supermarket.',
      ru: 'Я купил яблоки в супермаркете.',
    },
  ),

  ...build(
    'gp_s1_u5_g19_20',
    G19,
    [
      {
        options: ['오늘 아침', '내일 아침', '매일 아침'],
        correct: '오늘 아침',
      },
      {
        options: ['일곱 시에', '일곱 시를', '일곱 시가'],
        correct: '일곱 시에',
      },
      {
        options: ['일어났어요.', '일어나요.', '일어날 거예요.'],
        correct: '일어났어요.',
      },
    ],
    {
      uz: 'Bugun ertalab soat yettida turdim.',
      en: 'I got up at seven this morning.',
      ru: 'Сегодня утром я встал в семь.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 20. V-고
// ─────────────────────────────────────────────
const G20 = 'verb-go';

const G20_Q = {
  // grammar_blank 10
  ...blank('gp_s1_u5_g20_01', G20, '아침을 먹고 학교에 가요.', '먹고', {
    uz: 'Nonushta qilib, maktabga boraman.',
    en: 'I eat breakfast and go to school.',
    ru: 'Я завтракаю и иду в школу.',
  }),

  ...blank('gp_s1_u5_g20_02', G20, '커피를 마시고 책을 읽어요.', '마시고', {
    uz: 'Qahva ichib, kitob o‘qiyman.',
    en: 'I drink coffee and read a book.',
    ru: 'Я пью кофе и читаю книгу.',
  }),

  ...blank('gp_s1_u5_g20_03', G20, '친구를 만나고 영화를 봐요.', '만나고', {
    uz: 'Do‘stim bilan uchrashib, film ko‘raman.',
    en: 'I meet my friend and watch a movie.',
    ru: 'Я встречаюсь с другом и смотрю фильм.',
  }),

  ...blank('gp_s1_u5_g20_04', G20, '숙제를 하고 자요.', '하고', {
    uz: 'Uy vazifasini qilib, uxlayman.',
    en: 'I do my homework and go to bed.',
    ru: 'Я делаю домашнее задание и ложусь спать.',
  }),

  ...blank('gp_s1_u5_g20_05', G20, '아침에 샤워하고 밥을 먹어요.', '샤워하고', {
    uz: 'Ertalab dush qabul qilib, ovqat yeyman.',
    en: 'I take a shower and eat breakfast in the morning.',
    ru: 'Утром я принимаю душ и завтракаю.',
  }),

  ...blank('gp_s1_u5_g20_06', G20, '공원에서 운동하고 집에 가요.', '운동하고', {
    uz: 'Bog‘da sport qilib, uyga boraman.',
    en: 'I exercise at the park and go home.',
    ru: 'Я занимаюсь спортом в парке и иду домой.',
  }),

  ...blank(
    'gp_s1_u5_g20_07',
    G20,
    '도서관에서 공부하고 친구를 만나요.',
    '공부하고',
    {
      uz: 'Kutubxonada o‘qib, do‘stim bilan uchrashaman.',
      en: 'I study at the library and meet my friend.',
      ru: 'Я занимаюсь в библиотеке и встречаюсь с другом.',
    },
  ),

  ...blank('gp_s1_u5_g20_08', G20, '마트에서 과일을 사고 집에 와요.', '사고', {
    uz: 'Supermarketda meva sotib olib, uyga kelaman.',
    en: 'I buy fruit at the supermarket and come home.',
    ru: 'Я покупаю фрукты в супермаркете и возвращаюсь домой.',
  }),

  ...blank('gp_s1_u5_g20_09', G20, '저녁을 먹고 텔레비전을 봐요.', '먹고', {
    uz: 'Kechki ovqatni yeb, televizor ko‘raman.',
    en: 'I eat dinner and watch television.',
    ru: 'Я ужинаю и смотрю телевизор.',
  }),

  ...blank('gp_s1_u5_g20_10', G20, '책을 읽고 음악을 들어요.', '읽고', {
    uz: 'Kitob o‘qib, musiqa tinglayman.',
    en: 'I read a book and listen to music.',
    ru: 'Я читаю книгу и слушаю музыку.',
  }),

  // grammar_build 10
  ...build(
    'gp_s1_u5_g20_11',
    G20,
    [
      {
        options: ['아침을', '아침이', '아침에만'],
        correct: '아침을',
      },
      {
        options: ['먹고', '먹어요', '먹었어요'],
        correct: '먹고',
      },
      {
        options: ['학교에 가요.', '학교에서 자요.', '학교가 있어요.'],
        correct: '학교에 가요.',
      },
    ],
    {
      uz: 'Nonushta qilib, maktabga boraman.',
      en: 'I eat breakfast and go to school.',
      ru: 'Я завтракаю и иду в школу.',
    },
  ),

  ...build(
    'gp_s1_u5_g20_12',
    G20,
    [
      {
        options: ['커피를', '커피가', '커피에'],
        correct: '커피를',
      },
      {
        options: ['마시고', '마셔요', '마셨어요'],
        correct: '마시고',
      },
      {
        options: ['책을 읽어요.', '책이 있어요.', '책을 사요.'],
        correct: '책을 읽어요.',
      },
    ],
    {
      uz: 'Qahva ichib, kitob o‘qiyman.',
      en: 'I drink coffee and read a book.',
      ru: 'Я пью кофе и читаю книгу.',
    },
  ),

  ...build(
    'gp_s1_u5_g20_13',
    G20,
    [
      {
        options: ['친구를', '친구가', '친구에'],
        correct: '친구를',
      },
      {
        options: ['만나고', '만나요', '만났어요'],
        correct: '만나고',
      },
      {
        options: ['영화를 봐요.', '영화가 있어요.', '영화를 사요.'],
        correct: '영화를 봐요.',
      },
    ],
    {
      uz: 'Do‘stim bilan uchrashib, film ko‘raman.',
      en: 'I meet my friend and watch a movie.',
      ru: 'Я встречаюсь с другом и смотрю фильм.',
    },
  ),

  ...build(
    'gp_s1_u5_g20_14',
    G20,
    [
      {
        options: ['숙제를', '숙제가', '숙제에'],
        correct: '숙제를',
      },
      {
        options: ['하고', '해요', '했어요'],
        correct: '하고',
      },
      {
        options: ['자요.', '먹어요.', '가요.'],
        correct: '자요.',
      },
    ],
    {
      uz: 'Uy vazifasini qilib, uxlayman.',
      en: 'I do my homework and go to bed.',
      ru: 'Я делаю домашнее задание и ложусь спать.',
    },
  ),

  ...build(
    'gp_s1_u5_g20_15',
    G20,
    [
      {
        options: ['아침에', '아침을', '아침이'],
        correct: '아침에',
      },
      {
        options: ['샤워하고', '샤워해요', '샤워했어요'],
        correct: '샤워하고',
      },
      {
        options: ['밥을 먹어요.', '밥이 있어요.', '밥을 사요.'],
        correct: '밥을 먹어요.',
      },
    ],
    {
      uz: 'Ertalab dush qabul qilib, ovqat yeyman.',
      en: 'I take a shower and eat breakfast in the morning.',
      ru: 'Утром я принимаю душ и завтракаю.',
    },
  ),

  ...build(
    'gp_s1_u5_g20_16',
    G20,
    [
      {
        options: ['공원에서', '공원에', '공원을'],
        correct: '공원에서',
      },
      {
        options: ['운동하고', '운동해요', '운동했어요'],
        correct: '운동하고',
      },
      {
        options: ['집에 가요.', '집에 있어요.', '집에서 자요.'],
        correct: '집에 가요.',
      },
    ],
    {
      uz: 'Bog‘da sport qilib, uyga boraman.',
      en: 'I exercise at the park and go home.',
      ru: 'Я занимаюсь спортом в парке и иду домой.',
    },
  ),

  ...build(
    'gp_s1_u5_g20_17',
    G20,
    [
      {
        options: ['도서관에서', '도서관에', '도서관을'],
        correct: '도서관에서',
      },
      {
        options: ['공부하고', '공부해요', '공부했어요'],
        correct: '공부하고',
      },
      {
        options: ['친구를 만나요.', '친구가 있어요.', '친구는 학생이에요.'],
        correct: '친구를 만나요.',
      },
    ],
    {
      uz: 'Kutubxonada o‘qib, do‘stim bilan uchrashaman.',
      en: 'I study at the library and meet my friend.',
      ru: 'Я занимаюсь в библиотеке и встречаюсь с другом.',
    },
  ),

  ...build(
    'gp_s1_u5_g20_18',
    G20,
    [
      {
        options: ['마트에서', '마트에', '마트를'],
        correct: '마트에서',
      },
      {
        options: ['과일을 사고', '과일을 사요', '과일이 있어요'],
        correct: '과일을 사고',
      },
      {
        options: ['집에 와요.', '집에서 사요.', '집에 있어요.'],
        correct: '집에 와요.',
      },
    ],
    {
      uz: 'Supermarketda meva sotib olib, uyga kelaman.',
      en: 'I buy fruit at the supermarket and come home.',
      ru: 'Я покупаю фрукты в супермаркете и возвращаюсь домой.',
    },
  ),

  ...build(
    'gp_s1_u5_g20_19',
    G20,
    [
      {
        options: ['저녁을', '저녁이', '저녁에만'],
        correct: '저녁을',
      },
      {
        options: ['먹고', '먹어요', '먹었어요'],
        correct: '먹고',
      },
      {
        options: ['텔레비전을 봐요.', '텔레비전이 있어요.', '텔레비전을 사요.'],
        correct: '텔레비전을 봐요.',
      },
    ],
    {
      uz: 'Kechki ovqatni yeb, televizor ko‘raman.',
      en: 'I eat dinner and watch television.',
      ru: 'Я ужинаю и смотрю телевизор.',
    },
  ),

  ...build(
    'gp_s1_u5_g20_20',
    G20,
    [
      {
        options: ['책을', '책이', '책에'],
        correct: '책을',
      },
      {
        options: ['읽고', '읽어요', '읽었어요'],
        correct: '읽고',
      },
      {
        options: ['음악을 들어요.', '음악이 있어요.', '음악을 사요.'],
        correct: '음악을 들어요.',
      },
    ],
    {
      uz: 'Kitob o‘qib, musiqa tinglayman.',
      en: 'I read a book and listen to music.',
      ru: 'Я читаю книгу и слушаю музыку.',
    },
  ),
};

// ═══════════════════════════════════════════════════════════
// UNIT 6
// 요청 · 수량 · 상태 · 추가
// ═══════════════════════════════════════════════════════════

// ─────────────────────────────────────────────
// 문법 21. V-(으)세요
// ─────────────────────────────────────────────
const G21 = 'request-euseyo';

const G21_Q = {
  // grammar_blank 10
  ...blank('gp_s1_u6_g21_01', G21, '여기로 오세요.', '오세요', {
    uz: 'Bu yerga keling.',
    en: 'Please come here.',
    ru: 'Идите сюда, пожалуйста.',
  }),

  ...blank('gp_s1_u6_g21_02', G21, '의자에 앉으세요.', '앉으세요', {
    uz: 'Stulga o‘tiring.',
    en: 'Please sit on the chair.',
    ru: 'Садитесь на стул, пожалуйста.',
  }),

  ...blank('gp_s1_u6_g21_03', G21, '이 책을 읽으세요.', '읽으세요', {
    uz: 'Bu kitobni o‘qing.',
    en: 'Please read this book.',
    ru: 'Прочитайте эту книгу, пожалуйста.',
  }),

  ...blank('gp_s1_u6_g21_04', G21, '여기에 이름을 쓰세요.', '쓰세요', {
    uz: 'Bu yerga ismingizni yozing.',
    en: 'Please write your name here.',
    ru: 'Напишите здесь своё имя, пожалуйста.',
  }),

  ...blank('gp_s1_u6_g21_05', G21, '문을 닫으세요.', '닫으세요', {
    uz: 'Eshikni yoping.',
    en: 'Please close the door.',
    ru: 'Закройте дверь, пожалуйста.',
  }),

  ...blank('gp_s1_u6_g21_06', G21, '이 옷을 입으세요.', '입으세요', {
    uz: 'Bu kiyimni kiying.',
    en: 'Please wear these clothes.',
    ru: 'Наденьте эту одежду, пожалуйста.',
  }),

  ...blank('gp_s1_u6_g21_07', G21, '잠깐 기다리세요.', '기다리세요', {
    uz: 'Biroz kuting.',
    en: 'Please wait a moment.',
    ru: 'Немного подождите, пожалуйста.',
  }),

  ...blank('gp_s1_u6_g21_08', G21, '천천히 말하세요.', '말하세요', {
    uz: 'Sekin gapiring.',
    en: 'Please speak slowly.',
    ru: 'Говорите медленно, пожалуйста.',
  }),

  ...blank('gp_s1_u6_g21_09', G21, '내일 다시 전화하세요.', '전화하세요', {
    uz: 'Ertaga yana qo‘ng‘iroq qiling.',
    en: 'Please call again tomorrow.',
    ru: 'Позвоните ещё раз завтра, пожалуйста.',
  }),

  ...blank('gp_s1_u6_g21_10', G21, '학교에 일찍 가세요.', '가세요', {
    uz: 'Maktabga erta boring.',
    en: 'Please go to school early.',
    ru: 'Идите в школу пораньше, пожалуйста.',
  }),

  // grammar_build 10
  ...build(
    'gp_s1_u6_g21_11',
    G21,
    [
      {
        options: ['여기로', '여기에서', '여기를'],
        correct: '여기로',
      },
      {
        options: ['오세요.', '와요.', '왔어요.'],
        correct: '오세요.',
      },
    ],
    {
      uz: 'Bu yerga keling.',
      en: 'Please come here.',
      ru: 'Идите сюда, пожалуйста.',
    },
  ),

  ...build(
    'gp_s1_u6_g21_12',
    G21,
    [
      {
        options: ['의자에', '의자에서', '의자를'],
        correct: '의자에',
      },
      {
        options: ['앉으세요.', '앉아요.', '앉았어요.'],
        correct: '앉으세요.',
      },
    ],
    {
      uz: 'Stulga o‘tiring.',
      en: 'Please sit on the chair.',
      ru: 'Садитесь на стул, пожалуйста.',
    },
  ),

  ...build(
    'gp_s1_u6_g21_13',
    G21,
    [
      {
        options: ['이 책을', '이 책이', '이 책에'],
        correct: '이 책을',
      },
      {
        options: ['읽으세요.', '읽어요.', '읽었어요.'],
        correct: '읽으세요.',
      },
    ],
    {
      uz: 'Bu kitobni o‘qing.',
      en: 'Please read this book.',
      ru: 'Прочитайте эту книгу, пожалуйста.',
    },
  ),

  ...build(
    'gp_s1_u6_g21_14',
    G21,
    [
      {
        options: ['여기에', '여기에서', '여기를'],
        correct: '여기에',
      },
      {
        options: ['이름을', '이름이', '이름에'],
        correct: '이름을',
      },
      {
        options: ['쓰세요.', '써요.', '썼어요.'],
        correct: '쓰세요.',
      },
    ],
    {
      uz: 'Bu yerga ismingizni yozing.',
      en: 'Please write your name here.',
      ru: 'Напишите здесь своё имя, пожалуйста.',
    },
  ),

  ...build(
    'gp_s1_u6_g21_15',
    G21,
    [
      {
        options: ['문을', '문이', '문에'],
        correct: '문을',
      },
      {
        options: ['닫으세요.', '닫아요.', '닫았어요.'],
        correct: '닫으세요.',
      },
    ],
    {
      uz: 'Eshikni yoping.',
      en: 'Please close the door.',
      ru: 'Закройте дверь, пожалуйста.',
    },
  ),

  ...build(
    'gp_s1_u6_g21_16',
    G21,
    [
      {
        options: ['이 옷을', '이 옷이', '이 옷에'],
        correct: '이 옷을',
      },
      {
        options: ['입으세요.', '입어요.', '입었어요.'],
        correct: '입으세요.',
      },
    ],
    {
      uz: 'Bu kiyimni kiying.',
      en: 'Please wear these clothes.',
      ru: 'Наденьте эту одежду, пожалуйста.',
    },
  ),

  ...build(
    'gp_s1_u6_g21_17',
    G21,
    [
      {
        options: ['잠깐', '어제', '매일'],
        correct: '잠깐',
      },
      {
        options: ['기다리세요.', '기다려요.', '기다렸어요.'],
        correct: '기다리세요.',
      },
    ],
    {
      uz: 'Biroz kuting.',
      en: 'Please wait a moment.',
      ru: 'Немного подождите, пожалуйста.',
    },
  ),

  ...build(
    'gp_s1_u6_g21_18',
    G21,
    [
      {
        options: ['천천히', '빨리', '많이'],
        correct: '천천히',
      },
      {
        options: ['말하세요.', '말해요.', '말했어요.'],
        correct: '말하세요.',
      },
    ],
    {
      uz: 'Sekin gapiring.',
      en: 'Please speak slowly.',
      ru: 'Говорите медленно, пожалуйста.',
    },
  ),

  ...build(
    'gp_s1_u6_g21_19',
    G21,
    [
      {
        options: ['내일', '어제', '지난주'],
        correct: '내일',
      },
      {
        options: ['다시', '먼저', '아주'],
        correct: '다시',
      },
      {
        options: ['전화하세요.', '전화해요.', '전화했어요.'],
        correct: '전화하세요.',
      },
    ],
    {
      uz: 'Ertaga yana qo‘ng‘iroq qiling.',
      en: 'Please call again tomorrow.',
      ru: 'Позвоните ещё раз завтра, пожалуйста.',
    },
  ),

  ...build(
    'gp_s1_u6_g21_20',
    G21,
    [
      {
        options: ['학교에', '학교에서', '학교를'],
        correct: '학교에',
      },
      {
        options: ['일찍', '많이', '아주'],
        correct: '일찍',
      },
      {
        options: ['가세요.', '가요.', '갔어요.'],
        correct: '가세요.',
      },
    ],
    {
      uz: 'Maktabga erta boring.',
      en: 'Please go to school early.',
      ru: 'Идите в школу пораньше, пожалуйста.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 22. N 개[병, 잔, 그릇]
// ─────────────────────────────────────────────
const G22 = 'counter-gae-byeong-jan-geureut';

const G22_Q = {
  // grammar_blank 10
  ...blank('gp_s1_u6_g22_01', G22, '사과 세 개 주세요.', '세 개', {
    uz: 'Uchta olma bering, iltimos.',
    en: 'Three apples, please.',
    ru: 'Три яблока, пожалуйста.',
  }),

  ...blank('gp_s1_u6_g22_02', G22, '물 두 병 주세요.', '두 병', {
    uz: 'Ikki shisha suv bering, iltimos.',
    en: 'Two bottles of water, please.',
    ru: 'Две бутылки воды, пожалуйста.',
  }),

  ...blank('gp_s1_u6_g22_03', G22, '커피 한 잔 주세요.', '한 잔', {
    uz: 'Bir finjon qahva bering, iltimos.',
    en: 'One cup of coffee, please.',
    ru: 'Одну чашку кофе, пожалуйста.',
  }),

  ...blank('gp_s1_u6_g22_04', G22, '비빔밥 한 그릇 주세요.', '한 그릇', {
    uz: 'Bir kosa bibimbap bering, iltimos.',
    en: 'One bowl of bibimbap, please.',
    ru: 'Одну порцию пибимпаба, пожалуйста.',
  }),

  ...blank('gp_s1_u6_g22_05', G22, '빵 네 개 있어요.', '네 개', {
    uz: 'To‘rtta non bor.',
    en: 'There are four pieces of bread.',
    ru: 'Есть четыре булочки.',
  }),

  ...blank('gp_s1_u6_g22_06', G22, '우유 한 병 주세요.', '한 병', {
    uz: 'Bir shisha sut bering, iltimos.',
    en: 'One bottle of milk, please.',
    ru: 'Одну бутылку молока, пожалуйста.',
  }),

  ...blank('gp_s1_u6_g22_07', G22, '주스 두 잔 주세요.', '두 잔', {
    uz: 'Ikki stakan sharbat bering, iltimos.',
    en: 'Two glasses of juice, please.',
    ru: 'Два стакана сока, пожалуйста.',
  }),

  ...blank('gp_s1_u6_g22_08', G22, '라면 두 그릇 주세요.', '두 그릇', {
    uz: 'Ikki kosa ramyon bering, iltimos.',
    en: 'Two bowls of ramyeon, please.',
    ru: 'Две порции рамёна, пожалуйста.',
  }),

  ...blank('gp_s1_u6_g22_09', G22, '귤 다섯 개 주세요.', '다섯 개', {
    uz: 'Beshta mandarin bering, iltimos.',
    en: 'Five tangerines, please.',
    ru: 'Пять мандаринов, пожалуйста.',
  }),

  ...blank('gp_s1_u6_g22_10', G22, '콜라 세 병 있어요.', '세 병', {
    uz: 'Uch shisha kola bor.',
    en: 'There are three bottles of cola.',
    ru: 'Есть три бутылки колы.',
  }),

  // grammar_build 10
  ...build(
    'gp_s1_u6_g22_11',
    G22,
    [
      {
        options: ['사과', '우유', '커피'],
        correct: '사과',
      },
      {
        options: ['세 개', '세 병', '세 잔'],
        correct: '세 개',
      },
      {
        options: ['주세요.', '있어요.', '먹어요.'],
        correct: '주세요.',
      },
    ],
    {
      uz: 'Uchta olma bering, iltimos.',
      en: 'Three apples, please.',
      ru: 'Три яблока, пожалуйста.',
    },
  ),

  ...build(
    'gp_s1_u6_g22_12',
    G22,
    [
      {
        options: ['물', '사과', '밥'],
        correct: '물',
      },
      {
        options: ['두 병', '두 개', '두 그릇'],
        correct: '두 병',
      },
      {
        options: ['주세요.', '마셔요.', '있어요.'],
        correct: '주세요.',
      },
    ],
    {
      uz: 'Ikki shisha suv bering, iltimos.',
      en: 'Two bottles of water, please.',
      ru: 'Две бутылки воды, пожалуйста.',
    },
  ),

  ...build(
    'gp_s1_u6_g22_13',
    G22,
    [
      {
        options: ['커피', '사과', '라면'],
        correct: '커피',
      },
      {
        options: ['한 잔', '한 개', '한 그릇'],
        correct: '한 잔',
      },
      {
        options: ['주세요.', '있어요.', '사요.'],
        correct: '주세요.',
      },
    ],
    {
      uz: 'Bir finjon qahva bering, iltimos.',
      en: 'One cup of coffee, please.',
      ru: 'Одну чашку кофе, пожалуйста.',
    },
  ),

  ...build(
    'gp_s1_u6_g22_14',
    G22,
    [
      {
        options: ['비빔밥', '물', '사과'],
        correct: '비빔밥',
      },
      {
        options: ['한 그릇', '한 병', '한 개'],
        correct: '한 그릇',
      },
      {
        options: ['주세요.', '있어요.', '가요.'],
        correct: '주세요.',
      },
    ],
    {
      uz: 'Bir kosa bibimbap bering, iltimos.',
      en: 'One bowl of bibimbap, please.',
      ru: 'Одну порцию пибимпаба, пожалуйста.',
    },
  ),

  ...build(
    'gp_s1_u6_g22_15',
    G22,
    [
      {
        options: ['빵', '주스', '라면'],
        correct: '빵',
      },
      {
        options: ['네 개', '네 잔', '네 그릇'],
        correct: '네 개',
      },
      {
        options: ['있어요.', '없어요.', '마셔요.'],
        correct: '있어요.',
      },
    ],
    {
      uz: 'To‘rtta non bor.',
      en: 'There are four pieces of bread.',
      ru: 'Есть четыре булочки.',
    },
  ),

  ...build(
    'gp_s1_u6_g22_16',
    G22,
    [
      {
        options: ['우유', '사과', '비빔밥'],
        correct: '우유',
      },
      {
        options: ['한 병', '한 개', '한 그릇'],
        correct: '한 병',
      },
      {
        options: ['주세요.', '먹어요.', '읽어요.'],
        correct: '주세요.',
      },
    ],
    {
      uz: 'Bir shisha sut bering, iltimos.',
      en: 'One bottle of milk, please.',
      ru: 'Одну бутылку молока, пожалуйста.',
    },
  ),

  ...build(
    'gp_s1_u6_g22_17',
    G22,
    [
      {
        options: ['주스', '사과', '라면'],
        correct: '주스',
      },
      {
        options: ['두 잔', '두 개', '두 그릇'],
        correct: '두 잔',
      },
      {
        options: ['주세요.', '있어요.', '사요.'],
        correct: '주세요.',
      },
    ],
    {
      uz: 'Ikki stakan sharbat bering, iltimos.',
      en: 'Two glasses of juice, please.',
      ru: 'Два стакана сока, пожалуйста.',
    },
  ),

  ...build(
    'gp_s1_u6_g22_18',
    G22,
    [
      {
        options: ['라면', '커피', '사과'],
        correct: '라면',
      },
      {
        options: ['두 그릇', '두 잔', '두 개'],
        correct: '두 그릇',
      },
      {
        options: ['주세요.', '마셔요.', '있어요.'],
        correct: '주세요.',
      },
    ],
    {
      uz: 'Ikki kosa ramyon bering, iltimos.',
      en: 'Two bowls of ramyeon, please.',
      ru: 'Две порции рамёна, пожалуйста.',
    },
  ),

  ...build(
    'gp_s1_u6_g22_19',
    G22,
    [
      {
        options: ['귤', '물', '커피'],
        correct: '귤',
      },
      {
        options: ['다섯 개', '다섯 병', '다섯 잔'],
        correct: '다섯 개',
      },
      {
        options: ['주세요.', '마셔요.', '가요.'],
        correct: '주세요.',
      },
    ],
    {
      uz: 'Beshta mandarin bering, iltimos.',
      en: 'Five tangerines, please.',
      ru: 'Пять мандаринов, пожалуйста.',
    },
  ),

  ...build(
    'gp_s1_u6_g22_20',
    G22,
    [
      {
        options: ['콜라', '사과', '밥'],
        correct: '콜라',
      },
      {
        options: ['세 병', '세 개', '세 그릇'],
        correct: '세 병',
      },
      {
        options: ['있어요.', '없어요.', '읽어요.'],
        correct: '있어요.',
      },
    ],
    {
      uz: 'Uch shisha kola bor.',
      en: 'There are three bottles of cola.',
      ru: 'Есть три бутылки колы.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 23. N이/가 A-아요/어요
// ─────────────────────────────────────────────
const G23 = 'subject-adjective-i-ga';

const G23_Q = {
  // grammar_blank 10
  ...blank('gp_s1_u6_g23_01', G23, '가방이 커요.', '가방이 커요', {
    uz: 'Sumka katta.',
    en: 'The bag is big.',
    ru: 'Сумка большая.',
  }),

  ...blank('gp_s1_u6_g23_02', G23, '방이 작아요.', '방이 작아요', {
    uz: 'Xona kichik.',
    en: 'The room is small.',
    ru: 'Комната маленькая.',
  }),

  ...blank('gp_s1_u6_g23_03', G23, '날씨가 좋아요.', '날씨가 좋아요', {
    uz: 'Ob-havo yaxshi.',
    en: 'The weather is nice.',
    ru: 'Погода хорошая.',
  }),

  ...blank('gp_s1_u6_g23_04', G23, '이 식당이 비싸요.', '식당이 비싸요', {
    uz: 'Bu restoran qimmat.',
    en: 'This restaurant is expensive.',
    ru: 'Этот ресторан дорогой.',
  }),

  ...blank('gp_s1_u6_g23_05', G23, '저 가방이 싸요.', '가방이 싸요', {
    uz: 'Ana u sumka arzon.',
    en: 'That bag is cheap.',
    ru: 'Вон та сумка дешёвая.',
  }),

  ...blank('gp_s1_u6_g23_06', G23, '한국 음식이 맛있어요.', '음식이 맛있어요', {
    uz: 'Koreys taomlari mazali.',
    en: 'Korean food is delicious.',
    ru: 'Корейская еда вкусная.',
  }),

  ...blank(
    'gp_s1_u6_g23_07',
    G23,
    '이 영화가 재미있어요.',
    '영화가 재미있어요',
    {
      uz: 'Bu film qiziqarli.',
      en: 'This movie is interesting.',
      ru: 'Этот фильм интересный.',
    },
  ),

  ...blank('gp_s1_u6_g23_08', G23, '도서관이 조용해요.', '도서관이 조용해요', {
    uz: 'Kutubxona tinch.',
    en: 'The library is quiet.',
    ru: 'В библиотеке тихо.',
  }),

  ...blank('gp_s1_u6_g23_09', G23, '교실이 깨끗해요.', '교실이 깨끗해요', {
    uz: 'Sinf xonasi toza.',
    en: 'The classroom is clean.',
    ru: 'Класс чистый.',
  }),

  ...blank('gp_s1_u6_g23_10', G23, '학생이 많아요.', '학생이 많아요', {
    uz: 'Talabalar ko‘p.',
    en: 'There are many students.',
    ru: 'Студентов много.',
  }),

  // grammar_build 10
  ...build(
    'gp_s1_u6_g23_11',
    G23,
    [
      {
        options: ['가방이', '가방을', '가방에'],
        correct: '가방이',
      },
      {
        options: ['커요.', '작아요.', '비싸요.'],
        correct: '커요.',
      },
    ],
    {
      uz: 'Sumka katta.',
      en: 'The bag is big.',
      ru: 'Сумка большая.',
    },
  ),

  ...build(
    'gp_s1_u6_g23_12',
    G23,
    [
      {
        options: ['방이', '방을', '방에'],
        correct: '방이',
      },
      {
        options: ['작아요.', '커요.', '많아요.'],
        correct: '작아요.',
      },
    ],
    {
      uz: 'Xona kichik.',
      en: 'The room is small.',
      ru: 'Комната маленькая.',
    },
  ),

  ...build(
    'gp_s1_u6_g23_13',
    G23,
    [
      {
        options: ['날씨가', '날씨를', '날씨에'],
        correct: '날씨가',
      },
      {
        options: ['좋아요.', '작아요.', '비싸요.'],
        correct: '좋아요.',
      },
    ],
    {
      uz: 'Ob-havo yaxshi.',
      en: 'The weather is nice.',
      ru: 'Погода хорошая.',
    },
  ),

  ...build(
    'gp_s1_u6_g23_14',
    G23,
    [
      {
        options: ['이 식당이', '이 식당을', '이 식당에'],
        correct: '이 식당이',
      },
      {
        options: ['비싸요.', '싸요.', '조용해요.'],
        correct: '비싸요.',
      },
    ],
    {
      uz: 'Bu restoran qimmat.',
      en: 'This restaurant is expensive.',
      ru: 'Этот ресторан дорогой.',
    },
  ),

  ...build(
    'gp_s1_u6_g23_15',
    G23,
    [
      {
        options: ['저 가방이', '저 가방을', '저 가방에'],
        correct: '저 가방이',
      },
      {
        options: ['싸요.', '비싸요.', '커요.'],
        correct: '싸요.',
      },
    ],
    {
      uz: 'Ana u sumka arzon.',
      en: 'That bag is cheap.',
      ru: 'Вон та сумка дешёвая.',
    },
  ),

  ...build(
    'gp_s1_u6_g23_16',
    G23,
    [
      {
        options: ['한국 음식이', '한국 음식을', '한국 음식에'],
        correct: '한국 음식이',
      },
      {
        options: ['맛있어요.', '비싸요.', '작아요.'],
        correct: '맛있어요.',
      },
    ],
    {
      uz: 'Koreys taomlari mazali.',
      en: 'Korean food is delicious.',
      ru: 'Корейская еда вкусная.',
    },
  ),

  ...build(
    'gp_s1_u6_g23_17',
    G23,
    [
      {
        options: ['이 영화가', '이 영화를', '이 영화에'],
        correct: '이 영화가',
      },
      {
        options: ['재미있어요.', '맛있어요.', '깨끗해요.'],
        correct: '재미있어요.',
      },
    ],
    {
      uz: 'Bu film qiziqarli.',
      en: 'This movie is interesting.',
      ru: 'Этот фильм интересный.',
    },
  ),

  ...build(
    'gp_s1_u6_g23_18',
    G23,
    [
      {
        options: ['도서관이', '도서관을', '도서관에'],
        correct: '도서관이',
      },
      {
        options: ['조용해요.', '비싸요.', '많아요.'],
        correct: '조용해요.',
      },
    ],
    {
      uz: 'Kutubxona tinch.',
      en: 'The library is quiet.',
      ru: 'В библиотеке тихо.',
    },
  ),

  ...build(
    'gp_s1_u6_g23_19',
    G23,
    [
      {
        options: ['교실이', '교실을', '교실에'],
        correct: '교실이',
      },
      {
        options: ['깨끗해요.', '맛있어요.', '비싸요.'],
        correct: '깨끗해요.',
      },
    ],
    {
      uz: 'Sinf xonasi toza.',
      en: 'The classroom is clean.',
      ru: 'Класс чистый.',
    },
  ),

  ...build(
    'gp_s1_u6_g23_20',
    G23,
    [
      {
        options: ['학생이', '학생을', '학생에'],
        correct: '학생이',
      },
      {
        options: ['많아요.', '작아요.', '맛있어요.'],
        correct: '많아요.',
      },
    ],
    {
      uz: 'Talabalar ko‘p.',
      en: 'There are many students.',
      ru: 'Студентов много.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 24. N도
// ─────────────────────────────────────────────
const G24 = 'also-do';

const G24_Q = {
  // grammar_blank 10
  ...blank('gp_s1_u6_g24_01', G24, '저도 학생이에요.', '저도', {
    uz: 'Men ham talabaman.',
    en: 'I am a student too.',
    ru: 'Я тоже студент.',
  }),

  ...blank('gp_s1_u6_g24_02', G24, '민수 씨도 한국 사람이에요.', '민수 씨도', {
    uz: 'Minsu ham koreys.',
    en: 'Minsu is Korean too.',
    ru: 'Минсу тоже кореец.',
  }),

  ...blank('gp_s1_u6_g24_03', G24, '친구도 한국어를 공부해요.', '친구도', {
    uz: 'Do‘stim ham koreys tilini o‘rganadi.',
    en: 'My friend studies Korean too.',
    ru: 'Мой друг тоже изучает корейский язык.',
  }),

  ...blank('gp_s1_u6_g24_04', G24, '커피도 주세요.', '커피도', {
    uz: 'Qahva ham bering, iltimos.',
    en: 'Coffee too, please.',
    ru: 'И кофе тоже, пожалуйста.',
  }),

  ...blank('gp_s1_u6_g24_05', G24, '물도 있어요.', '물도', {
    uz: 'Suv ham bor.',
    en: 'There is water too.',
    ru: 'Вода тоже есть.',
  }),

  ...blank('gp_s1_u6_g24_06', G24, '저는 책도 읽어요.', '책도', {
    uz: 'Men kitob ham o‘qiyman.',
    en: 'I read books too.',
    ru: 'Я также читаю книги.',
  }),

  ...blank('gp_s1_u6_g24_07', G24, '주말에도 학교에 가요.', '주말에도', {
    uz: 'Dam olish kunlari ham maktabga boraman.',
    en: 'I go to school on weekends too.',
    ru: 'Я хожу в школу и по выходным.',
  }),

  ...blank('gp_s1_u6_g24_08', G24, '동생도 커피를 좋아해요.', '동생도', {
    uz: 'Ukam yoki singlim ham qahvani yoqtiradi.',
    en: 'My younger sibling likes coffee too.',
    ru: 'Мой младший брат или сестра тоже любит кофе.',
  }),

  ...blank('gp_s1_u6_g24_09', G24, '사과도 세 개 주세요.', '사과도', {
    uz: 'Uchta olma ham bering, iltimos.',
    en: 'Three apples too, please.',
    ru: 'И три яблока тоже, пожалуйста.',
  }),

  ...blank('gp_s1_u6_g24_10', G24, '수진 씨도 오늘 회사에 가요.', '수진 씨도', {
    uz: 'Sujin ham bugun ishxonaga boradi.',
    en: 'Sujin is going to the office today too.',
    ru: 'Суджин тоже сегодня идёт на работу.',
  }),

  // grammar_build 10
  ...build(
    'gp_s1_u6_g24_11',
    G24,
    [
      {
        options: ['저도', '저는', '제가'],
        correct: '저도',
      },
      {
        options: ['학생이에요.', '회사원이에요.', '선생님이에요.'],
        correct: '학생이에요.',
      },
    ],
    {
      uz: 'Men ham talabaman.',
      en: 'I am a student too.',
      ru: 'Я тоже студент.',
    },
  ),

  ...build(
    'gp_s1_u6_g24_12',
    G24,
    [
      {
        options: ['민수 씨도', '민수 씨는', '민수 씨가'],
        correct: '민수 씨도',
      },
      {
        options: ['한국 사람이에요.', '학생이에요.', '의사예요.'],
        correct: '한국 사람이에요.',
      },
    ],
    {
      uz: 'Minsu ham koreys.',
      en: 'Minsu is Korean too.',
      ru: 'Минсу тоже кореец.',
    },
  ),

  ...build(
    'gp_s1_u6_g24_13',
    G24,
    [
      {
        options: ['친구도', '친구는', '친구가'],
        correct: '친구도',
      },
      {
        options: ['한국어를', '한국어가', '한국어에'],
        correct: '한국어를',
      },
      {
        options: ['공부해요.', '마셔요.', '먹어요.'],
        correct: '공부해요.',
      },
    ],
    {
      uz: 'Do‘stim ham koreys tilini o‘rganadi.',
      en: 'My friend studies Korean too.',
      ru: 'Мой друг тоже изучает корейский язык.',
    },
  ),

  ...build(
    'gp_s1_u6_g24_14',
    G24,
    [
      {
        options: ['커피도', '커피는', '커피가'],
        correct: '커피도',
      },
      {
        options: ['주세요.', '있어요.', '마셔요.'],
        correct: '주세요.',
      },
    ],
    {
      uz: 'Qahva ham bering, iltimos.',
      en: 'Coffee too, please.',
      ru: 'И кофе тоже, пожалуйста.',
    },
  ),

  ...build(
    'gp_s1_u6_g24_15',
    G24,
    [
      {
        options: ['물도', '물은', '물이'],
        correct: '물도',
      },
      {
        options: ['있어요.', '없어요.', '주세요.'],
        correct: '있어요.',
      },
    ],
    {
      uz: 'Suv ham bor.',
      en: 'There is water too.',
      ru: 'Вода тоже есть.',
    },
  ),

  ...build(
    'gp_s1_u6_g24_16',
    G24,
    [
      {
        options: ['저는', '저를', '제가'],
        correct: '저는',
      },
      {
        options: ['책도', '책은', '책이'],
        correct: '책도',
      },
      {
        options: ['읽어요.', '먹어요.', '마셔요.'],
        correct: '읽어요.',
      },
    ],
    {
      uz: 'Men kitob ham o‘qiyman.',
      en: 'I read books too.',
      ru: 'Я также читаю книги.',
    },
  ),

  ...build(
    'gp_s1_u6_g24_17',
    G24,
    [
      {
        options: ['주말에도', '주말에는', '주말에'],
        correct: '주말에도',
      },
      {
        options: ['학교에', '학교에서', '학교를'],
        correct: '학교에',
      },
      {
        options: ['가요.', '있어요.', '공부해요.'],
        correct: '가요.',
      },
    ],
    {
      uz: 'Dam olish kunlari ham maktabga boraman.',
      en: 'I go to school on weekends too.',
      ru: 'Я хожу в школу и по выходным.',
    },
  ),

  ...build(
    'gp_s1_u6_g24_18',
    G24,
    [
      {
        options: ['동생도', '동생은', '동생이'],
        correct: '동생도',
      },
      {
        options: ['커피를', '커피가', '커피에'],
        correct: '커피를',
      },
      {
        options: ['좋아해요.', '마셔요.', '사요.'],
        correct: '좋아해요.',
      },
    ],
    {
      uz: 'Ukam yoki singlim ham qahvani yoqtiradi.',
      en: 'My younger sibling likes coffee too.',
      ru: 'Мой младший брат или сестра тоже любит кофе.',
    },
  ),

  ...build(
    'gp_s1_u6_g24_19',
    G24,
    [
      {
        options: ['사과도', '사과는', '사과가'],
        correct: '사과도',
      },
      {
        options: ['세 개', '세 병', '세 잔'],
        correct: '세 개',
      },
      {
        options: ['주세요.', '있어요.', '먹어요.'],
        correct: '주세요.',
      },
    ],
    {
      uz: 'Uchta olma ham bering, iltimos.',
      en: 'Three apples too, please.',
      ru: 'И три яблока тоже, пожалуйста.',
    },
  ),

  ...build(
    'gp_s1_u6_g24_20',
    G24,
    [
      {
        options: ['수진 씨도', '수진 씨는', '수진 씨가'],
        correct: '수진 씨도',
      },
      {
        options: ['오늘', '어제', '매일'],
        correct: '오늘',
      },
      {
        options: ['회사에 가요.', '회사에 있어요.', '회사에서 먹어요.'],
        correct: '회사에 가요.',
      },
    ],
    {
      uz: 'Sujin ham bugun ishxonaga boradi.',
      en: 'Sujin is going to the office today too.',
      ru: 'Суджин тоже сегодня идёт на работу.',
    },
  ),
};

// ═══════════════════════════════════════════════════════════
// UNIT 7
// 불규칙 활용 · 대조 · 격식체 · 상태 연결
// ═══════════════════════════════════════════════════════════

// ─────────────────────────────────────────────
// 문법 25. ㅂ 불규칙
// ─────────────────────────────────────────────
const G25 = 'irregular-bieup';

const G25_Q = {
  // grammar_blank 10
  ...blank('gp_s1_u7_g25_01', G25, '오늘 날씨가 더워요.', '더워요', {
    uz: 'Bugun havo issiq.',
    en: 'The weather is hot today.',
    ru: 'Сегодня жарко.',
  }),

  ...blank('gp_s1_u7_g25_02', G25, '겨울에는 날씨가 추워요.', '추워요', {
    uz: 'Qishda havo sovuq.',
    en: 'The weather is cold in winter.',
    ru: 'Зимой холодно.',
  }),

  ...blank('gp_s1_u7_g25_03', G25, '이 가방은 무거워요.', '무거워요', {
    uz: 'Bu sumka og‘ir.',
    en: 'This bag is heavy.',
    ru: 'Эта сумка тяжёлая.',
  }),

  ...blank('gp_s1_u7_g25_04', G25, '이 문제는 쉬워요.', '쉬워요', {
    uz: 'Bu masala oson.',
    en: 'This question is easy.',
    ru: 'Это задание лёгкое.',
  }),

  ...blank('gp_s1_u7_g25_05', G25, '한국어는 어려워요.', '어려워요', {
    uz: 'Koreys tili qiyin.',
    en: 'Korean is difficult.',
    ru: 'Корейский язык трудный.',
  }),

  ...blank('gp_s1_u7_g25_06', G25, '이 음식은 매워요.', '매워요', {
    uz: 'Bu taom achchiq.',
    en: 'This food is spicy.',
    ru: 'Это блюдо острое.',
  }),

  ...blank('gp_s1_u7_g25_07', G25, '이 강아지는 귀여워요.', '귀여워요', {
    uz: 'Bu kuchukcha yoqimtoy.',
    en: 'This puppy is cute.',
    ru: 'Этот щенок милый.',
  }),

  ...blank('gp_s1_u7_g25_08', G25, '이 가방은 가벼워요.', '가벼워요', {
    uz: 'Bu sumka yengil.',
    en: 'This bag is light.',
    ru: 'Эта сумка лёгкая.',
  }),

  ...blank('gp_s1_u7_g25_09', G25, '정말 고마워요.', '고마워요', {
    uz: 'Katta rahmat.',
    en: 'Thank you very much.',
    ru: 'Большое спасибо.',
  }),

  ...blank('gp_s1_u7_g25_10', G25, '저는 친구를 도와요.', '도와요', {
    uz: 'Men do‘stimga yordam beraman.',
    en: 'I help my friend.',
    ru: 'Я помогаю другу.',
  }),

  // grammar_build 10
  ...build(
    'gp_s1_u7_g25_11',
    G25,
    [
      {
        options: ['오늘 날씨가', '오늘 날씨를', '오늘 날씨에'],
        correct: '오늘 날씨가',
      },
      {
        options: ['더워요.', '덥어요.', '더웠어요.'],
        correct: '더워요.',
      },
    ],
    {
      uz: 'Bugun havo issiq.',
      en: 'The weather is hot today.',
      ru: 'Сегодня жарко.',
    },
  ),

  ...build(
    'gp_s1_u7_g25_12',
    G25,
    [
      {
        options: ['겨울에는', '여름에는', '봄에는'],
        correct: '겨울에는',
      },
      {
        options: ['날씨가', '날씨를', '날씨에'],
        correct: '날씨가',
      },
      {
        options: ['추워요.', '춥어요.', '추웠어요.'],
        correct: '추워요.',
      },
    ],
    {
      uz: 'Qishda havo sovuq.',
      en: 'The weather is cold in winter.',
      ru: 'Зимой холодно.',
    },
  ),

  ...build(
    'gp_s1_u7_g25_13',
    G25,
    [
      {
        options: ['이 가방은', '이 가방을', '이 가방이'],
        correct: '이 가방은',
      },
      {
        options: ['무거워요.', '무겁어요.', '가벼워요.'],
        correct: '무거워요.',
      },
    ],
    {
      uz: 'Bu sumka og‘ir.',
      en: 'This bag is heavy.',
      ru: 'Эта сумка тяжёлая.',
    },
  ),

  ...build(
    'gp_s1_u7_g25_14',
    G25,
    [
      {
        options: ['이 문제는', '이 문제를', '이 문제에'],
        correct: '이 문제는',
      },
      {
        options: ['쉬워요.', '쉽어요.', '어려워요.'],
        correct: '쉬워요.',
      },
    ],
    {
      uz: 'Bu masala oson.',
      en: 'This question is easy.',
      ru: 'Это задание лёгкое.',
    },
  ),

  ...build(
    'gp_s1_u7_g25_15',
    G25,
    [
      {
        options: ['한국어는', '한국어를', '한국어에'],
        correct: '한국어는',
      },
      {
        options: ['어려워요.', '어렵어요.', '쉬워요.'],
        correct: '어려워요.',
      },
    ],
    {
      uz: 'Koreys tili qiyin.',
      en: 'Korean is difficult.',
      ru: 'Корейский язык трудный.',
    },
  ),

  ...build(
    'gp_s1_u7_g25_16',
    G25,
    [
      {
        options: ['이 음식은', '이 음식을', '이 음식에'],
        correct: '이 음식은',
      },
      {
        options: ['매워요.', '맵어요.', '안 매워요.'],
        correct: '매워요.',
      },
    ],
    {
      uz: 'Bu taom achchiq.',
      en: 'This food is spicy.',
      ru: 'Это блюдо острое.',
    },
  ),

  ...build(
    'gp_s1_u7_g25_17',
    G25,
    [
      {
        options: ['이 강아지는', '이 강아지를', '이 강아지가'],
        correct: '이 강아지는',
      },
      {
        options: ['귀여워요.', '귀엽어요.', '귀여웠어요.'],
        correct: '귀여워요.',
      },
    ],
    {
      uz: 'Bu kuchukcha yoqimtoy.',
      en: 'This puppy is cute.',
      ru: 'Этот щенок милый.',
    },
  ),

  ...build(
    'gp_s1_u7_g25_18',
    G25,
    [
      {
        options: ['이 가방은', '이 가방을', '이 가방에'],
        correct: '이 가방은',
      },
      {
        options: ['가벼워요.', '가볍어요.', '무거워요.'],
        correct: '가벼워요.',
      },
    ],
    {
      uz: 'Bu sumka yengil.',
      en: 'This bag is light.',
      ru: 'Эта сумка лёгкая.',
    },
  ),

  ...build(
    'gp_s1_u7_g25_19',
    G25,
    [
      {
        options: ['정말', '조금', '아직'],
        correct: '정말',
      },
      {
        options: ['고마워요.', '고맙아요.', '고마웠어요.'],
        correct: '고마워요.',
      },
    ],
    {
      uz: 'Katta rahmat.',
      en: 'Thank you very much.',
      ru: 'Большое спасибо.',
    },
  ),

  ...build(
    'gp_s1_u7_g25_20',
    G25,
    [
      {
        options: ['저는', '저를', '제가'],
        correct: '저는',
      },
      {
        options: ['친구를', '친구가', '친구에'],
        correct: '친구를',
      },
      {
        options: ['도와요.', '돕아요.', '도왔어요.'],
        correct: '도와요.',
      },
    ],
    {
      uz: 'Men do‘stimga yordam beraman.',
      en: 'I help my friend.',
      ru: 'Я помогаю другу.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 26. A/V-지만
// ─────────────────────────────────────────────
const G26 = 'contrast-jiman';

const G26_Q = {
  // grammar_blank 10
  ...blank('gp_s1_u7_g26_01', G26, '이 방은 작지만 깨끗해요.', '작지만', {
    uz: 'Bu xona kichik, lekin toza.',
    en: 'This room is small but clean.',
    ru: 'Эта комната маленькая, но чистая.',
  }),

  ...blank('gp_s1_u7_g26_02', G26, '이 식당은 비싸지만 맛있어요.', '비싸지만', {
    uz: 'Bu restoran qimmat, lekin taomlari mazali.',
    en: 'This restaurant is expensive, but the food is delicious.',
    ru: 'Этот ресторан дорогой, но еда вкусная.',
  }),

  ...blank(
    'gp_s1_u7_g26_03',
    G26,
    '오늘은 피곤하지만 공부해요.',
    '피곤하지만',
    {
      uz: 'Bugun charchaganman, lekin o‘qiyman.',
      en: 'I am tired today, but I study.',
      ru: 'Сегодня я устал, но занимаюсь.',
    },
  ),

  ...blank('gp_s1_u7_g26_04', G26, '비가 오지만 학교에 가요.', '오지만', {
    uz: 'Yomg‘ir yog‘yapti, lekin maktabga boraman.',
    en: 'It is raining, but I go to school.',
    ru: 'Идёт дождь, но я иду в школу.',
  }),

  ...blank(
    'gp_s1_u7_g26_05',
    G26,
    '한국어는 어렵지만 재미있어요.',
    '어렵지만',
    {
      uz: 'Koreys tili qiyin, lekin qiziqarli.',
      en: 'Korean is difficult but interesting.',
      ru: 'Корейский язык трудный, но интересный.',
    },
  ),

  ...blank(
    'gp_s1_u7_g26_06',
    G26,
    '커피를 좋아하지만 오늘은 안 마셔요.',
    '좋아하지만',
    {
      uz: 'Qahvani yaxshi ko‘raman, lekin bugun ichmayman.',
      en: 'I like coffee, but I am not drinking it today.',
      ru: 'Я люблю кофе, но сегодня не пью его.',
    },
  ),

  ...blank('gp_s1_u7_g26_07', G26, '학교가 멀지만 매일 가요.', '멀지만', {
    uz: 'Maktab uzoq, lekin har kuni boraman.',
    en: 'The school is far, but I go every day.',
    ru: 'Школа далеко, но я хожу туда каждый день.',
  }),

  ...blank('gp_s1_u7_g26_08', G26, '날씨가 춥지만 공원에 가요.', '춥지만', {
    uz: 'Havo sovuq, lekin bog‘ga boraman.',
    en: 'The weather is cold, but I go to the park.',
    ru: 'Холодно, но я иду в парк.',
  }),

  ...blank('gp_s1_u7_g26_09', G26, '이 가방은 작지만 가벼워요.', '작지만', {
    uz: 'Bu sumka kichik, lekin yengil.',
    en: 'This bag is small but light.',
    ru: 'Эта сумка маленькая, но лёгкая.',
  }),

  ...blank('gp_s1_u7_g26_10', G26, '시간이 없지만 숙제를 해요.', '없지만', {
    uz: 'Vaqtim yo‘q, lekin uy vazifasini qilaman.',
    en: 'I do not have time, but I do my homework.',
    ru: 'У меня нет времени, но я делаю домашнее задание.',
  }),

  // grammar_build 10
  ...build(
    'gp_s1_u7_g26_11',
    G26,
    [
      {
        options: ['이 방은', '이 방을', '이 방에'],
        correct: '이 방은',
      },
      {
        options: ['작지만', '작고', '작아요'],
        correct: '작지만',
      },
      {
        options: ['깨끗해요.', '작아요.', '비싸요.'],
        correct: '깨끗해요.',
      },
    ],
    {
      uz: 'Bu xona kichik, lekin toza.',
      en: 'This room is small but clean.',
      ru: 'Эта комната маленькая, но чистая.',
    },
  ),

  ...build(
    'gp_s1_u7_g26_12',
    G26,
    [
      {
        options: ['이 식당은', '이 식당을', '이 식당에'],
        correct: '이 식당은',
      },
      {
        options: ['비싸지만', '비싸고', '비싸요'],
        correct: '비싸지만',
      },
      {
        options: ['맛있어요.', '작아요.', '조용해요.'],
        correct: '맛있어요.',
      },
    ],
    {
      uz: 'Bu restoran qimmat, lekin taomlari mazali.',
      en: 'This restaurant is expensive, but the food is delicious.',
      ru: 'Этот ресторан дорогой, но еда вкусная.',
    },
  ),

  ...build(
    'gp_s1_u7_g26_13',
    G26,
    [
      {
        options: ['오늘은', '어제는', '내일은'],
        correct: '오늘은',
      },
      {
        options: ['피곤하지만', '피곤하고', '피곤해요'],
        correct: '피곤하지만',
      },
      {
        options: ['공부해요.', '자요.', '안 가요.'],
        correct: '공부해요.',
      },
    ],
    {
      uz: 'Bugun charchaganman, lekin o‘qiyman.',
      en: 'I am tired today, but I study.',
      ru: 'Сегодня я устал, но занимаюсь.',
    },
  ),

  ...build(
    'gp_s1_u7_g26_14',
    G26,
    [
      {
        options: ['비가', '비를', '비에'],
        correct: '비가',
      },
      {
        options: ['오지만', '오고', '와요'],
        correct: '오지만',
      },
      {
        options: ['학교에 가요.', '집에 있어요.', '우산이 있어요.'],
        correct: '학교에 가요.',
      },
    ],
    {
      uz: 'Yomg‘ir yog‘yapti, lekin maktabga boraman.',
      en: 'It is raining, but I go to school.',
      ru: 'Идёт дождь, но я иду в школу.',
    },
  ),

  ...build(
    'gp_s1_u7_g26_15',
    G26,
    [
      {
        options: ['한국어는', '한국어를', '한국어에'],
        correct: '한국어는',
      },
      {
        options: ['어렵지만', '어렵고', '어려워요'],
        correct: '어렵지만',
      },
      {
        options: ['재미있어요.', '쉬워요.', '조용해요.'],
        correct: '재미있어요.',
      },
    ],
    {
      uz: 'Koreys tili qiyin, lekin qiziqarli.',
      en: 'Korean is difficult but interesting.',
      ru: 'Корейский язык трудный, но интересный.',
    },
  ),

  ...build(
    'gp_s1_u7_g26_16',
    G26,
    [
      {
        options: ['커피를', '커피가', '커피에'],
        correct: '커피를',
      },
      {
        options: ['좋아하지만', '좋아하고', '좋아해요'],
        correct: '좋아하지만',
      },
      {
        options: ['오늘은 안 마셔요.', '오늘도 마셔요.', '매일 마셨어요.'],
        correct: '오늘은 안 마셔요.',
      },
    ],
    {
      uz: 'Qahvani yaxshi ko‘raman, lekin bugun ichmayman.',
      en: 'I like coffee, but I am not drinking it today.',
      ru: 'Я люблю кофе, но сегодня не пью его.',
    },
  ),

  ...build(
    'gp_s1_u7_g26_17',
    G26,
    [
      {
        options: ['학교가', '학교를', '학교에'],
        correct: '학교가',
      },
      {
        options: ['멀지만', '멀고', '멀어요'],
        correct: '멀지만',
      },
      {
        options: ['매일 가요.', '안 가요.', '집에 있어요.'],
        correct: '매일 가요.',
      },
    ],
    {
      uz: 'Maktab uzoq, lekin har kuni boraman.',
      en: 'The school is far, but I go every day.',
      ru: 'Школа далеко, но я хожу туда каждый день.',
    },
  ),

  ...build(
    'gp_s1_u7_g26_18',
    G26,
    [
      {
        options: ['날씨가', '날씨를', '날씨에'],
        correct: '날씨가',
      },
      {
        options: ['춥지만', '춥고', '추워요'],
        correct: '춥지만',
      },
      {
        options: ['공원에 가요.', '집에서 자요.', '날씨가 좋아요.'],
        correct: '공원에 가요.',
      },
    ],
    {
      uz: 'Havo sovuq, lekin bog‘ga boraman.',
      en: 'The weather is cold, but I go to the park.',
      ru: 'Холодно, но я иду в парк.',
    },
  ),

  ...build(
    'gp_s1_u7_g26_19',
    G26,
    [
      {
        options: ['이 가방은', '이 가방을', '이 가방에'],
        correct: '이 가방은',
      },
      {
        options: ['작지만', '작고', '작아요'],
        correct: '작지만',
      },
      {
        options: ['가벼워요.', '무거워요.', '비싸요.'],
        correct: '가벼워요.',
      },
    ],
    {
      uz: 'Bu sumka kichik, lekin yengil.',
      en: 'This bag is small but light.',
      ru: 'Эта сумка маленькая, но лёгкая.',
    },
  ),

  ...build(
    'gp_s1_u7_g26_20',
    G26,
    [
      {
        options: ['시간이', '시간을', '시간에'],
        correct: '시간이',
      },
      {
        options: ['없지만', '없고', '없어요'],
        correct: '없지만',
      },
      {
        options: ['숙제를 해요.', '숙제가 없어요.', '학교에 가요.'],
        correct: '숙제를 해요.',
      },
    ],
    {
      uz: 'Vaqtim yo‘q, lekin uy vazifasini qilaman.',
      en: 'I do not have time, but I do my homework.',
      ru: 'У меня нет времени, но я делаю домашнее задание.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 27. A/V-습니다/ㅂ니다 · -습니까/ㅂ니까?
// ─────────────────────────────────────────────
const G27 = 'formal-seumnida';

const G27_Q = {
  // grammar_blank 10
  ...blank('gp_s1_u7_g27_01', G27, '저는 매일 학교에 갑니다.', '갑니다', {
    uz: 'Men har kuni maktabga boraman.',
    en: 'I go to school every day.',
    ru: 'Я каждый день хожу в школу.',
  }),

  ...blank('gp_s1_u7_g27_02', G27, '아침에 밥을 먹습니다.', '먹습니다', {
    uz: 'Ertalab ovqat yeyman.',
    en: 'I eat breakfast in the morning.',
    ru: 'Утром я завтракаю.',
  }),

  ...blank('gp_s1_u7_g27_03', G27, '한국어를 공부합니다.', '공부합니다', {
    uz: 'Koreys tilini o‘rganaman.',
    en: 'I study Korean.',
    ru: 'Я изучаю корейский язык.',
  }),

  ...blank('gp_s1_u7_g27_04', G27, '이 음식은 맛있습니다.', '맛있습니다', {
    uz: 'Bu taom mazali.',
    en: 'This food is delicious.',
    ru: 'Это блюдо вкусное.',
  }),

  ...blank('gp_s1_u7_g27_05', G27, '교실에 학생이 있습니다.', '있습니다', {
    uz: 'Sinfda talaba bor.',
    en: 'There is a student in the classroom.',
    ru: 'В классе есть студент.',
  }),

  ...blank('gp_s1_u7_g27_06', G27, '어디에 갑니까?', '갑니까', {
    uz: 'Qayerga borasiz?',
    en: 'Where are you going?',
    ru: 'Куда вы идёте?',
  }),

  ...blank('gp_s1_u7_g27_07', G27, '커피를 마십니까?', '마십니까', {
    uz: 'Qahva ichasizmi?',
    en: 'Do you drink coffee?',
    ru: 'Вы пьёте кофе?',
  }),

  ...blank('gp_s1_u7_g27_08', G27, '한국어를 공부합니까?', '공부합니까', {
    uz: 'Koreys tilini o‘rganasizmi?',
    en: 'Do you study Korean?',
    ru: 'Вы изучаете корейский язык?',
  }),

  ...blank('gp_s1_u7_g27_09', G27, '이 책이 어렵습니까?', '어렵습니까', {
    uz: 'Bu kitob qiyinmi?',
    en: 'Is this book difficult?',
    ru: 'Эта книга трудная?',
  }),

  ...blank('gp_s1_u7_g27_10', G27, '시간이 있습니까?', '있습니까', {
    uz: 'Vaqtingiz bormi?',
    en: 'Do you have time?',
    ru: 'У вас есть время?',
  }),

  // grammar_build 10
  ...build(
    'gp_s1_u7_g27_11',
    G27,
    [
      {
        options: ['저는', '저를', '제가'],
        correct: '저는',
      },
      {
        options: ['매일 학교에', '어제 학교에', '학교에서'],
        correct: '매일 학교에',
      },
      {
        options: ['갑니다.', '가요.', '갔습니다.'],
        correct: '갑니다.',
      },
    ],
    {
      uz: 'Men har kuni maktabga boraman.',
      en: 'I go to school every day.',
      ru: 'Я каждый день хожу в школу.',
    },
  ),

  ...build(
    'gp_s1_u7_g27_12',
    G27,
    [
      {
        options: ['아침에', '밤에', '내일'],
        correct: '아침에',
      },
      {
        options: ['밥을', '밥이', '밥에'],
        correct: '밥을',
      },
      {
        options: ['먹습니다.', '먹어요.', '먹었습니다.'],
        correct: '먹습니다.',
      },
    ],
    {
      uz: 'Ertalab ovqat yeyman.',
      en: 'I eat breakfast in the morning.',
      ru: 'Утром я завтракаю.',
    },
  ),

  ...build(
    'gp_s1_u7_g27_13',
    G27,
    [
      {
        options: ['한국어를', '한국어가', '한국어에'],
        correct: '한국어를',
      },
      {
        options: ['공부합니다.', '공부해요.', '공부했습니다.'],
        correct: '공부합니다.',
      },
    ],
    {
      uz: 'Koreys tilini o‘rganaman.',
      en: 'I study Korean.',
      ru: 'Я изучаю корейский язык.',
    },
  ),

  ...build(
    'gp_s1_u7_g27_14',
    G27,
    [
      {
        options: ['이 음식은', '이 음식을', '이 음식에'],
        correct: '이 음식은',
      },
      {
        options: ['맛있습니다.', '맛있어요.', '맛있었습니다.'],
        correct: '맛있습니다.',
      },
    ],
    {
      uz: 'Bu taom mazali.',
      en: 'This food is delicious.',
      ru: 'Это блюдо вкусное.',
    },
  ),

  ...build(
    'gp_s1_u7_g27_15',
    G27,
    [
      {
        options: ['교실에', '교실에서', '교실을'],
        correct: '교실에',
      },
      {
        options: ['학생이', '학생을', '학생에'],
        correct: '학생이',
      },
      {
        options: ['있습니다.', '있어요.', '없습니다.'],
        correct: '있습니다.',
      },
    ],
    {
      uz: 'Sinfda talaba bor.',
      en: 'There is a student in the classroom.',
      ru: 'В классе есть студент.',
    },
  ),

  ...build(
    'gp_s1_u7_g27_16',
    G27,
    [
      {
        options: ['어디에', '어디에서', '어디를'],
        correct: '어디에',
      },
      {
        options: ['갑니까?', '갑니다.', '가요?'],
        correct: '갑니까?',
      },
    ],
    {
      uz: 'Qayerga borasiz?',
      en: 'Where are you going?',
      ru: 'Куда вы идёте?',
    },
  ),

  ...build(
    'gp_s1_u7_g27_17',
    G27,
    [
      {
        options: ['커피를', '커피가', '커피에'],
        correct: '커피를',
      },
      {
        options: ['마십니까?', '마십니다.', '마셔요?'],
        correct: '마십니까?',
      },
    ],
    {
      uz: 'Qahva ichasizmi?',
      en: 'Do you drink coffee?',
      ru: 'Вы пьёте кофе?',
    },
  ),

  ...build(
    'gp_s1_u7_g27_18',
    G27,
    [
      {
        options: ['한국어를', '한국어가', '한국어에'],
        correct: '한국어를',
      },
      {
        options: ['공부합니까?', '공부합니다.', '공부해요?'],
        correct: '공부합니까?',
      },
    ],
    {
      uz: 'Koreys tilini o‘rganasizmi?',
      en: 'Do you study Korean?',
      ru: 'Вы изучаете корейский язык?',
    },
  ),

  ...build(
    'gp_s1_u7_g27_19',
    G27,
    [
      {
        options: ['이 책이', '이 책을', '이 책에'],
        correct: '이 책이',
      },
      {
        options: ['어렵습니까?', '어렵습니다.', '어려워요?'],
        correct: '어렵습니까?',
      },
    ],
    {
      uz: 'Bu kitob qiyinmi?',
      en: 'Is this book difficult?',
      ru: 'Эта книга трудная?',
    },
  ),

  ...build(
    'gp_s1_u7_g27_20',
    G27,
    [
      {
        options: ['시간이', '시간을', '시간에'],
        correct: '시간이',
      },
      {
        options: ['있습니까?', '있습니다.', '있어요?'],
        correct: '있습니까?',
      },
    ],
    {
      uz: 'Vaqtingiz bormi?',
      en: 'Do you have time?',
      ru: 'У вас есть время?',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 28. A/V-고
// ─────────────────────────────────────────────
const G28 = 'adjective-verb-go';

const G28_Q = {
  // grammar_blank 10
  ...blank('gp_s1_u7_g28_01', G28, '이 방은 넓고 깨끗해요.', '넓고', {
    uz: 'Bu xona keng va toza.',
    en: 'This room is spacious and clean.',
    ru: 'Эта комната просторная и чистая.',
  }),

  ...blank('gp_s1_u7_g28_02', G28, '한국 음식은 싸고 맛있어요.', '싸고', {
    uz: 'Koreys taomlari arzon va mazali.',
    en: 'Korean food is inexpensive and delicious.',
    ru: 'Корейская еда недорогая и вкусная.',
  }),

  ...blank('gp_s1_u7_g28_03', G28, '오늘은 춥고 바람이 불어요.', '춥고', {
    uz: 'Bugun sovuq va shamol esyapti.',
    en: 'It is cold and windy today.',
    ru: 'Сегодня холодно и ветрено.',
  }),

  ...blank('gp_s1_u7_g28_04', G28, '이 가방은 작고 가벼워요.', '작고', {
    uz: 'Bu sumka kichik va yengil.',
    en: 'This bag is small and light.',
    ru: 'Эта сумка маленькая и лёгкая.',
  }),

  ...blank('gp_s1_u7_g28_05', G28, '한국어는 어렵고 재미있어요.', '어렵고', {
    uz: 'Koreys tili qiyin va qiziqarli.',
    en: 'Korean is difficult and interesting.',
    ru: 'Корейский язык трудный и интересный.',
  }),

  ...blank('gp_s1_u7_g28_06', G28, '아침을 먹고 학교에 가요.', '먹고', {
    uz: 'Nonushta qilib, maktabga boraman.',
    en: 'I eat breakfast and go to school.',
    ru: 'Я завтракаю и иду в школу.',
  }),

  ...blank('gp_s1_u7_g28_07', G28, '친구를 만나고 영화를 봐요.', '만나고', {
    uz: 'Do‘stim bilan uchrashib, film ko‘raman.',
    en: 'I meet my friend and watch a movie.',
    ru: 'Я встречаюсь с другом и смотрю фильм.',
  }),

  ...blank('gp_s1_u7_g28_08', G28, '책을 읽고 음악을 들어요.', '읽고', {
    uz: 'Kitob o‘qib, musiqa tinglayman.',
    en: 'I read a book and listen to music.',
    ru: 'Я читаю книгу и слушаю музыку.',
  }),

  ...blank(
    'gp_s1_u7_g28_09',
    G28,
    '카페에서 커피를 마시고 공부해요.',
    '마시고',
    {
      uz: 'Kafeda qahva ichib, o‘qiyman.',
      en: 'I drink coffee and study at a cafe.',
      ru: 'Я пью кофе и занимаюсь в кафе.',
    },
  ),

  ...blank('gp_s1_u7_g28_10', G28, '운동하고 집에서 쉬어요.', '운동하고', {
    uz: 'Sport bilan shug‘ullanib, uyda dam olaman.',
    en: 'I exercise and rest at home.',
    ru: 'Я занимаюсь спортом и отдыхаю дома.',
  }),

  // grammar_build 10
  ...build(
    'gp_s1_u7_g28_11',
    G28,
    [
      {
        options: ['이 방은', '이 방을', '이 방에'],
        correct: '이 방은',
      },
      {
        options: ['넓고', '넓지만', '넓어요'],
        correct: '넓고',
      },
      {
        options: ['깨끗해요.', '작아요.', '비싸요.'],
        correct: '깨끗해요.',
      },
    ],
    {
      uz: 'Bu xona keng va toza.',
      en: 'This room is spacious and clean.',
      ru: 'Эта комната просторная и чистая.',
    },
  ),

  ...build(
    'gp_s1_u7_g28_12',
    G28,
    [
      {
        options: ['한국 음식은', '한국 음식을', '한국 음식에'],
        correct: '한국 음식은',
      },
      {
        options: ['싸고', '싸지만', '싸요'],
        correct: '싸고',
      },
      {
        options: ['맛있어요.', '비싸요.', '작아요.'],
        correct: '맛있어요.',
      },
    ],
    {
      uz: 'Koreys taomlari arzon va mazali.',
      en: 'Korean food is inexpensive and delicious.',
      ru: 'Корейская еда недорогая и вкусная.',
    },
  ),

  ...build(
    'gp_s1_u7_g28_13',
    G28,
    [
      {
        options: ['오늘은', '어제는', '내일은'],
        correct: '오늘은',
      },
      {
        options: ['춥고', '춥지만', '추워요'],
        correct: '춥고',
      },
      {
        options: ['바람이 불어요.', '날씨가 더워요.', '비가 안 와요.'],
        correct: '바람이 불어요.',
      },
    ],
    {
      uz: 'Bugun sovuq va shamol esyapti.',
      en: 'It is cold and windy today.',
      ru: 'Сегодня холодно и ветрено.',
    },
  ),

  ...build(
    'gp_s1_u7_g28_14',
    G28,
    [
      {
        options: ['이 가방은', '이 가방을', '이 가방에'],
        correct: '이 가방은',
      },
      {
        options: ['작고', '작지만', '작아요'],
        correct: '작고',
      },
      {
        options: ['가벼워요.', '무거워요.', '비싸요.'],
        correct: '가벼워요.',
      },
    ],
    {
      uz: 'Bu sumka kichik va yengil.',
      en: 'This bag is small and light.',
      ru: 'Эта сумка маленькая и лёгкая.',
    },
  ),

  ...build(
    'gp_s1_u7_g28_15',
    G28,
    [
      {
        options: ['한국어는', '한국어를', '한국어에'],
        correct: '한국어는',
      },
      {
        options: ['어렵고', '어렵지만', '어려워요'],
        correct: '어렵고',
      },
      {
        options: ['재미있어요.', '쉬워요.', '조용해요.'],
        correct: '재미있어요.',
      },
    ],
    {
      uz: 'Koreys tili qiyin va qiziqarli.',
      en: 'Korean is difficult and interesting.',
      ru: 'Корейский язык трудный и интересный.',
    },
  ),

  ...build(
    'gp_s1_u7_g28_16',
    G28,
    [
      {
        options: ['아침을', '아침이', '아침에'],
        correct: '아침을',
      },
      {
        options: ['먹고', '먹지만', '먹어요'],
        correct: '먹고',
      },
      {
        options: ['학교에 가요.', '학교에 있어요.', '학교에서 먹어요.'],
        correct: '학교에 가요.',
      },
    ],
    {
      uz: 'Nonushta qilib, maktabga boraman.',
      en: 'I eat breakfast and go to school.',
      ru: 'Я завтракаю и иду в школу.',
    },
  ),

  ...build(
    'gp_s1_u7_g28_17',
    G28,
    [
      {
        options: ['친구를', '친구가', '친구에'],
        correct: '친구를',
      },
      {
        options: ['만나고', '만나지만', '만나요'],
        correct: '만나고',
      },
      {
        options: ['영화를 봐요.', '영화가 있어요.', '영화를 사요.'],
        correct: '영화를 봐요.',
      },
    ],
    {
      uz: 'Do‘stim bilan uchrashib, film ko‘raman.',
      en: 'I meet my friend and watch a movie.',
      ru: 'Я встречаюсь с другом и смотрю фильм.',
    },
  ),

  ...build(
    'gp_s1_u7_g28_18',
    G28,
    [
      {
        options: ['책을', '책이', '책에'],
        correct: '책을',
      },
      {
        options: ['읽고', '읽지만', '읽어요'],
        correct: '읽고',
      },
      {
        options: ['음악을 들어요.', '음악이 있어요.', '음악을 사요.'],
        correct: '음악을 들어요.',
      },
    ],
    {
      uz: 'Kitob o‘qib, musiqa tinglayman.',
      en: 'I read a book and listen to music.',
      ru: 'Я читаю книгу и слушаю музыку.',
    },
  ),

  ...build(
    'gp_s1_u7_g28_19',
    G28,
    [
      {
        options: ['카페에서', '카페에', '카페를'],
        correct: '카페에서',
      },
      {
        options: ['커피를 마시고', '커피를 마시지만', '커피를 마셔요'],
        correct: '커피를 마시고',
      },
      {
        options: ['공부해요.', '집에 가요.', '영화를 봐요.'],
        correct: '공부해요.',
      },
    ],
    {
      uz: 'Kafeda qahva ichib, o‘qiyman.',
      en: 'I drink coffee and study at a cafe.',
      ru: 'Я пью кофе и занимаюсь в кафе.',
    },
  ),

  ...build(
    'gp_s1_u7_g28_20',
    G28,
    [
      {
        options: ['운동하고', '운동하지만', '운동해요'],
        correct: '운동하고',
      },
      {
        options: ['집에서', '집에', '집을'],
        correct: '집에서',
      },
      {
        options: ['쉬어요.', '공부해요.', '일어나요.'],
        correct: '쉬어요.',
      },
    ],
    {
      uz: 'Sport bilan shug‘ullanib, uyda dam olaman.',
      en: 'I exercise and rest at home.',
      ru: 'Я занимаюсь спортом и отдыхаю дома.',
    },
  ),
};

// ═══════════════════════════════════════════════════════════
// UNIT 8
// 제안 · ㄷ 불규칙 · 지시 표현 · 반응
// ═══════════════════════════════════════════════════════════

// ─────────────────────────────────────────────
// 문법 29. V-(으)ㄹ까요?
// ─────────────────────────────────────────────
const G29 = 'suggestion-eulkkayo';

const G29_Q = {
  // grammar_blank 10
  ...blank('gp_s1_u8_g29_01', G29, '같이 점심을 먹을까요?', '먹을까요', {
    uz: 'Birga tushlik qilamizmi?',
    en: 'Shall we have lunch together?',
    ru: 'Пообедаем вместе?',
  }),

  ...blank('gp_s1_u8_g29_02', G29, '주말에 영화를 볼까요?', '볼까요', {
    uz: 'Dam olish kunlari film ko‘ramizmi?',
    en: 'Shall we watch a movie on the weekend?',
    ru: 'Посмотрим фильм на выходных?',
  }),

  ...blank('gp_s1_u8_g29_03', G29, '창문을 열까요?', '열까요', {
    uz: 'Derazani ochaylikmi?',
    en: 'Shall I open the window?',
    ru: 'Открыть окно?',
  }),

  ...blank('gp_s1_u8_g29_04', G29, '커피를 마실까요?', '마실까요', {
    uz: 'Qahva ichamizmi?',
    en: 'Shall we drink coffee?',
    ru: 'Выпьем кофе?',
  }),

  ...blank('gp_s1_u8_g29_05', G29, '택시를 탈까요?', '탈까요', {
    uz: 'Taksiga o‘tiramizmi?',
    en: 'Shall we take a taxi?',
    ru: 'Поедем на такси?',
  }),

  ...blank('gp_s1_u8_g29_06', G29, '여기에서 사진을 찍을까요?', '찍을까요', {
    uz: 'Shu yerda suratga tushamizmi?',
    en: 'Shall we take a photo here?',
    ru: 'Сфотографируемся здесь?',
  }),

  ...blank('gp_s1_u8_g29_07', G29, '내일 만날까요?', '만날까요', {
    uz: 'Ertaga uchrashamizmi?',
    en: 'Shall we meet tomorrow?',
    ru: 'Встретимся завтра?',
  }),

  ...blank('gp_s1_u8_g29_08', G29, '여기에서 잠깐 쉴까요?', '쉴까요', {
    uz: 'Shu yerda biroz dam olamizmi?',
    en: 'Shall we rest here for a moment?',
    ru: 'Немного отдохнём здесь?',
  }),

  ...blank('gp_s1_u8_g29_09', G29, '오늘 한국 음식을 먹을까요?', '먹을까요', {
    uz: 'Bugun koreys taomini yeymizmi?',
    en: 'Shall we eat Korean food today?',
    ru: 'Поедим сегодня корейскую еду?',
  }),

  ...blank('gp_s1_u8_g29_10', G29, '먼저 숙제를 할까요?', '할까요', {
    uz: 'Avval uy vazifasini qilamizmi?',
    en: 'Shall we do our homework first?',
    ru: 'Сначала сделаем домашнее задание?',
  }),

  // grammar_build 10
  ...build(
    'gp_s1_u8_g29_11',
    G29,
    [
      {
        options: ['같이', '혼자', '어제'],
        correct: '같이',
      },
      {
        options: ['점심을', '점심이', '점심에'],
        correct: '점심을',
      },
      {
        options: ['먹을까요?', '먹어요.', '먹었어요.'],
        correct: '먹을까요?',
      },
    ],
    {
      uz: 'Birga tushlik qilamizmi?',
      en: 'Shall we have lunch together?',
      ru: 'Пообедаем вместе?',
    },
  ),

  ...build(
    'gp_s1_u8_g29_12',
    G29,
    [
      {
        options: ['주말에', '어제', '아침마다'],
        correct: '주말에',
      },
      {
        options: ['영화를', '영화가', '영화에'],
        correct: '영화를',
      },
      {
        options: ['볼까요?', '봐요.', '봤어요.'],
        correct: '볼까요?',
      },
    ],
    {
      uz: 'Dam olish kunlari film ko‘ramizmi?',
      en: 'Shall we watch a movie on the weekend?',
      ru: 'Посмотрим фильм на выходных?',
    },
  ),

  ...build(
    'gp_s1_u8_g29_13',
    G29,
    [
      {
        options: ['창문을', '창문이', '창문에'],
        correct: '창문을',
      },
      {
        options: ['열까요?', '열어요.', '열었어요.'],
        correct: '열까요?',
      },
    ],
    {
      uz: 'Derazani ochaylikmi?',
      en: 'Shall I open the window?',
      ru: 'Открыть окно?',
    },
  ),

  ...build(
    'gp_s1_u8_g29_14',
    G29,
    [
      {
        options: ['커피를', '커피가', '커피에'],
        correct: '커피를',
      },
      {
        options: ['마실까요?', '마셔요.', '마셨어요.'],
        correct: '마실까요?',
      },
    ],
    {
      uz: 'Qahva ichamizmi?',
      en: 'Shall we drink coffee?',
      ru: 'Выпьем кофе?',
    },
  ),

  ...build(
    'gp_s1_u8_g29_15',
    G29,
    [
      {
        options: ['택시를', '택시가', '택시에'],
        correct: '택시를',
      },
      {
        options: ['탈까요?', '타요.', '탔어요.'],
        correct: '탈까요?',
      },
    ],
    {
      uz: 'Taksiga o‘tiramizmi?',
      en: 'Shall we take a taxi?',
      ru: 'Поедем на такси?',
    },
  ),

  ...build(
    'gp_s1_u8_g29_16',
    G29,
    [
      {
        options: ['여기에서', '여기에', '여기를'],
        correct: '여기에서',
      },
      {
        options: ['사진을', '사진이', '사진에'],
        correct: '사진을',
      },
      {
        options: ['찍을까요?', '찍어요.', '찍었어요.'],
        correct: '찍을까요?',
      },
    ],
    {
      uz: 'Shu yerda suratga tushamizmi?',
      en: 'Shall we take a photo here?',
      ru: 'Сфотографируемся здесь?',
    },
  ),

  ...build(
    'gp_s1_u8_g29_17',
    G29,
    [
      {
        options: ['내일', '어제', '지난주'],
        correct: '내일',
      },
      {
        options: ['만날까요?', '만나요.', '만났어요.'],
        correct: '만날까요?',
      },
    ],
    {
      uz: 'Ertaga uchrashamizmi?',
      en: 'Shall we meet tomorrow?',
      ru: 'Встретимся завтра?',
    },
  ),

  ...build(
    'gp_s1_u8_g29_18',
    G29,
    [
      {
        options: ['여기에서', '학교에', '어제'],
        correct: '여기에서',
      },
      {
        options: ['잠깐', '매일', '아주'],
        correct: '잠깐',
      },
      {
        options: ['쉴까요?', '쉬어요.', '쉬었어요.'],
        correct: '쉴까요?',
      },
    ],
    {
      uz: 'Shu yerda biroz dam olamizmi?',
      en: 'Shall we rest here for a moment?',
      ru: 'Немного отдохнём здесь?',
    },
  ),

  ...build(
    'gp_s1_u8_g29_19',
    G29,
    [
      {
        options: ['오늘', '어제', '매일'],
        correct: '오늘',
      },
      {
        options: ['한국 음식을', '한국 음식이', '한국 음식에'],
        correct: '한국 음식을',
      },
      {
        options: ['먹을까요?', '먹어요.', '먹었어요.'],
        correct: '먹을까요?',
      },
    ],
    {
      uz: 'Bugun koreys taomini yeymizmi?',
      en: 'Shall we eat Korean food today?',
      ru: 'Поедим сегодня корейскую еду?',
    },
  ),

  ...build(
    'gp_s1_u8_g29_20',
    G29,
    [
      {
        options: ['먼저', '어제', '아주'],
        correct: '먼저',
      },
      {
        options: ['숙제를', '숙제가', '숙제에'],
        correct: '숙제를',
      },
      {
        options: ['할까요?', '해요.', '했어요.'],
        correct: '할까요?',
      },
    ],
    {
      uz: 'Avval uy vazifasini qilamizmi?',
      en: 'Shall we do our homework first?',
      ru: 'Сначала сделаем домашнее задание?',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 30. ㄷ 불규칙
// ─────────────────────────────────────────────
const G30 = 'irregular-digeut';

const G30_Q = {
  // grammar_blank 10
  ...blank('gp_s1_u8_g30_01', G30, '저는 매일 음악을 들어요.', '들어요', {
    uz: 'Men har kuni musiqa tinglayman.',
    en: 'I listen to music every day.',
    ru: 'Я каждый день слушаю музыку.',
  }),

  ...blank('gp_s1_u8_g30_02', G30, '학교까지 걸어요.', '걸어요', {
    uz: 'Maktabgacha piyoda boraman.',
    en: 'I walk to school.',
    ru: 'Я хожу до школы пешком.',
  }),

  ...blank('gp_s1_u8_g30_03', G30, '모르는 단어를 선생님께 물어요.', '물어요', {
    uz: 'Bilmagan so‘zimni o‘qituvchidan so‘rayman.',
    en: 'I ask the teacher about words I do not know.',
    ru: 'Я спрашиваю учителя о незнакомых словах.',
  }),

  ...blank('gp_s1_u8_g30_04', G30, '아침에 뉴스를 들어요.', '들어요', {
    uz: 'Ertalab yangiliklarni tinglayman.',
    en: 'I listen to the news in the morning.',
    ru: 'Утром я слушаю новости.',
  }),

  ...blank('gp_s1_u8_g30_05', G30, '친구하고 공원을 걸어요.', '걸어요', {
    uz: 'Do‘stim bilan bog‘da yuraman.',
    en: 'I walk in the park with my friend.',
    ru: 'Я гуляю по парку с другом.',
  }),

  ...blank('gp_s1_u8_g30_06', G30, '길을 경찰에게 물어요.', '물어요', {
    uz: 'Yo‘lni politsiyachidan so‘rayman.',
    en: 'I ask a police officer for directions.',
    ru: 'Я спрашиваю дорогу у полицейского.',
  }),

  ...blank('gp_s1_u8_g30_07', G30, '버스에서 한국 노래를 들어요.', '들어요', {
    uz: 'Avtobusda koreys qo‘shiqlarini tinglayman.',
    en: 'I listen to Korean songs on the bus.',
    ru: 'Я слушаю корейские песни в автобусе.',
  }),

  ...blank('gp_s1_u8_g30_08', G30, '저녁에 한 시간 걸어요.', '걸어요', {
    uz: 'Kechqurun bir soat piyoda yuraman.',
    en: 'I walk for an hour in the evening.',
    ru: 'Вечером я гуляю один час.',
  }),

  ...blank('gp_s1_u8_g30_09', G30, '선생님에게 다시 물어요.', '물어요', {
    uz: 'O‘qituvchidan yana so‘rayman.',
    en: 'I ask the teacher again.',
    ru: 'Я снова спрашиваю учителя.',
  }),

  ...blank('gp_s1_u8_g30_10', G30, '저는 한국 음악을 자주 들어요.', '들어요', {
    uz: 'Men koreys musiqasini tez-tez tinglayman.',
    en: 'I often listen to Korean music.',
    ru: 'Я часто слушаю корейскую музыку.',
  }),

  // grammar_build 10
  ...build(
    'gp_s1_u8_g30_11',
    G30,
    [
      {
        options: ['저는', '저를', '제가'],
        correct: '저는',
      },
      {
        options: ['매일 음악을', '어제 음악을', '음악이'],
        correct: '매일 음악을',
      },
      {
        options: ['들어요.', '듣어요.', '들었어요.'],
        correct: '들어요.',
      },
    ],
    {
      uz: 'Men har kuni musiqa tinglayman.',
      en: 'I listen to music every day.',
      ru: 'Я каждый день слушаю музыку.',
    },
  ),

  ...build(
    'gp_s1_u8_g30_12',
    G30,
    [
      {
        options: ['학교까지', '학교에서', '학교를'],
        correct: '학교까지',
      },
      {
        options: ['걸어요.', '걷어요.', '걸었어요.'],
        correct: '걸어요.',
      },
    ],
    {
      uz: 'Maktabgacha piyoda boraman.',
      en: 'I walk to school.',
      ru: 'Я хожу до школы пешком.',
    },
  ),

  ...build(
    'gp_s1_u8_g30_13',
    G30,
    [
      {
        options: ['모르는 단어를', '모르는 단어가', '모르는 단어에'],
        correct: '모르는 단어를',
      },
      {
        options: ['선생님께', '선생님을', '선생님에서'],
        correct: '선생님께',
      },
      {
        options: ['물어요.', '묻어요.', '물었어요.'],
        correct: '물어요.',
      },
    ],
    {
      uz: 'Bilmagan so‘zimni o‘qituvchidan so‘rayman.',
      en: 'I ask the teacher about words I do not know.',
      ru: 'Я спрашиваю учителя о незнакомых словах.',
    },
  ),

  ...build(
    'gp_s1_u8_g30_14',
    G30,
    [
      {
        options: ['아침에', '내일 밤에', '어제'],
        correct: '아침에',
      },
      {
        options: ['뉴스를', '뉴스가', '뉴스에'],
        correct: '뉴스를',
      },
      {
        options: ['들어요.', '듣어요.', '들었어요.'],
        correct: '들어요.',
      },
    ],
    {
      uz: 'Ertalab yangiliklarni tinglayman.',
      en: 'I listen to the news in the morning.',
      ru: 'Утром я слушаю новости.',
    },
  ),

  ...build(
    'gp_s1_u8_g30_15',
    G30,
    [
      {
        options: ['친구하고', '친구를', '친구가'],
        correct: '친구하고',
      },
      {
        options: ['공원을', '공원이', '공원에'],
        correct: '공원을',
      },
      {
        options: ['걸어요.', '걷어요.', '걸었어요.'],
        correct: '걸어요.',
      },
    ],
    {
      uz: 'Do‘stim bilan bog‘da yuraman.',
      en: 'I walk in the park with my friend.',
      ru: 'Я гуляю по парку с другом.',
    },
  ),

  ...build(
    'gp_s1_u8_g30_16',
    G30,
    [
      {
        options: ['길을', '길이', '길에'],
        correct: '길을',
      },
      {
        options: ['경찰에게', '경찰을', '경찰에서'],
        correct: '경찰에게',
      },
      {
        options: ['물어요.', '묻어요.', '물었어요.'],
        correct: '물어요.',
      },
    ],
    {
      uz: 'Yo‘lni politsiyachidan so‘rayman.',
      en: 'I ask a police officer for directions.',
      ru: 'Я спрашиваю дорогу у полицейского.',
    },
  ),

  ...build(
    'gp_s1_u8_g30_17',
    G30,
    [
      {
        options: ['버스에서', '버스에', '버스를'],
        correct: '버스에서',
      },
      {
        options: ['한국 노래를', '한국 노래가', '한국 노래에'],
        correct: '한국 노래를',
      },
      {
        options: ['들어요.', '듣어요.', '들었어요.'],
        correct: '들어요.',
      },
    ],
    {
      uz: 'Avtobusda koreys qo‘shiqlarini tinglayman.',
      en: 'I listen to Korean songs on the bus.',
      ru: 'Я слушаю корейские песни в автобусе.',
    },
  ),

  ...build(
    'gp_s1_u8_g30_18',
    G30,
    [
      {
        options: ['저녁에', '아침마다', '어제'],
        correct: '저녁에',
      },
      {
        options: ['한 시간', '한 병', '한 그릇'],
        correct: '한 시간',
      },
      {
        options: ['걸어요.', '걷어요.', '걸었어요.'],
        correct: '걸어요.',
      },
    ],
    {
      uz: 'Kechqurun bir soat piyoda yuraman.',
      en: 'I walk for an hour in the evening.',
      ru: 'Вечером я гуляю один час.',
    },
  ),

  ...build(
    'gp_s1_u8_g30_19',
    G30,
    [
      {
        options: ['선생님에게', '선생님을', '선생님에서'],
        correct: '선생님에게',
      },
      {
        options: ['다시', '어제', '아주'],
        correct: '다시',
      },
      {
        options: ['물어요.', '묻어요.', '물었어요.'],
        correct: '물어요.',
      },
    ],
    {
      uz: 'O‘qituvchidan yana so‘rayman.',
      en: 'I ask the teacher again.',
      ru: 'Я снова спрашиваю учителя.',
    },
  ),

  ...build(
    'gp_s1_u8_g30_20',
    G30,
    [
      {
        options: ['저는', '저를', '제가'],
        correct: '저는',
      },
      {
        options: ['한국 음악을', '한국 음악이', '한국 음악에'],
        correct: '한국 음악을',
      },
      {
        options: ['자주 들어요.', '자주 듣어요.', '어제 들었어요.'],
        correct: '자주 들어요.',
      },
    ],
    {
      uz: 'Men koreys musiqasini tez-tez tinglayman.',
      en: 'I often listen to Korean music.',
      ru: 'Я часто слушаю корейскую музыку.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 31. 이[그, 저] N
// ─────────────────────────────────────────────
const G31 = 'demonstrative-i-geu-jeo-n';

const G31_Q = {
  // grammar_blank 10
  ...blank('gp_s1_u8_g31_01', G31, '이 책은 제 책이에요.', '이 책', {
    uz: 'Bu kitob meniki.',
    en: 'This book is mine.',
    ru: 'Эта книга моя.',
  }),

  ...blank('gp_s1_u8_g31_02', G31, '그 사람은 제 선생님이에요.', '그 사람', {
    uz: 'U odam mening o‘qituvchim.',
    en: 'That person is my teacher.',
    ru: 'Тот человек — мой учитель.',
  }),

  ...blank('gp_s1_u8_g31_03', G31, '저 건물은 학교예요.', '저 건물', {
    uz: 'Ana u bino maktab.',
    en: 'That building over there is a school.',
    ru: 'Вон то здание — школа.',
  }),

  ...blank('gp_s1_u8_g31_04', G31, '이 가방은 예뻐요.', '이 가방', {
    uz: 'Bu sumka chiroyli.',
    en: 'This bag is pretty.',
    ru: 'Эта сумка красивая.',
  }),

  ...blank('gp_s1_u8_g31_05', G31, '그 카페는 조용해요.', '그 카페', {
    uz: 'U kafe tinch.',
    en: 'That cafe is quiet.',
    ru: 'То кафе тихое.',
  }),

  ...blank('gp_s1_u8_g31_06', G31, '저 자동차는 비싸요.', '저 자동차', {
    uz: 'Ana u mashina qimmat.',
    en: 'That car over there is expensive.',
    ru: 'Вон та машина дорогая.',
  }),

  ...blank('gp_s1_u8_g31_07', G31, '이 음식은 맛있어요.', '이 음식', {
    uz: 'Bu taom mazali.',
    en: 'This food is delicious.',
    ru: 'Это блюдо вкусное.',
  }),

  ...blank('gp_s1_u8_g31_08', G31, '그 영화는 재미있어요.', '그 영화', {
    uz: 'U film qiziqarli.',
    en: 'That movie is interesting.',
    ru: 'Тот фильм интересный.',
  }),

  ...blank('gp_s1_u8_g31_09', G31, '저 산은 높아요.', '저 산', {
    uz: 'Ana u tog‘ baland.',
    en: 'That mountain over there is high.',
    ru: 'Вон та гора высокая.',
  }),

  ...blank('gp_s1_u8_g31_10', G31, '이 사진은 가족 사진이에요.', '이 사진', {
    uz: 'Bu oilaviy surat.',
    en: 'This is a family photo.',
    ru: 'Это семейная фотография.',
  }),

  // grammar_build 10
  ...build(
    'gp_s1_u8_g31_11',
    G31,
    [
      {
        options: ['이 책은', '그 책은', '저 책은'],
        correct: '이 책은',
      },
      {
        options: ['제 책이에요.', '제 가방이에요.', '제 친구예요.'],
        correct: '제 책이에요.',
      },
    ],
    {
      uz: 'Bu kitob meniki.',
      en: 'This book is mine.',
      ru: 'Эта книга моя.',
    },
  ),

  ...build(
    'gp_s1_u8_g31_12',
    G31,
    [
      {
        options: ['그 사람은', '이 사람은', '저 사람은'],
        correct: '그 사람은',
      },
      {
        options: ['제 선생님이에요.', '제 책이에요.', '제 학교예요.'],
        correct: '제 선생님이에요.',
      },
    ],
    {
      uz: 'U odam mening o‘qituvchim.',
      en: 'That person is my teacher.',
      ru: 'Тот человек — мой учитель.',
    },
  ),

  ...build(
    'gp_s1_u8_g31_13',
    G31,
    [
      {
        options: ['저 건물은', '이 건물은', '그 건물은'],
        correct: '저 건물은',
      },
      {
        options: ['학교예요.', '학생이에요.', '책이에요.'],
        correct: '학교예요.',
      },
    ],
    {
      uz: 'Ana u bino maktab.',
      en: 'That building over there is a school.',
      ru: 'Вон то здание — школа.',
    },
  ),

  ...build(
    'gp_s1_u8_g31_14',
    G31,
    [
      {
        options: ['이 가방은', '그 가방은', '저 가방은'],
        correct: '이 가방은',
      },
      {
        options: ['예뻐요.', '추워요.', '맛있어요.'],
        correct: '예뻐요.',
      },
    ],
    {
      uz: 'Bu sumka chiroyli.',
      en: 'This bag is pretty.',
      ru: 'Эта сумка красивая.',
    },
  ),

  ...build(
    'gp_s1_u8_g31_15',
    G31,
    [
      {
        options: ['그 카페는', '이 카페는', '저 카페는'],
        correct: '그 카페는',
      },
      {
        options: ['조용해요.', '매워요.', '높아요.'],
        correct: '조용해요.',
      },
    ],
    {
      uz: 'U kafe tinch.',
      en: 'That cafe is quiet.',
      ru: 'То кафе тихое.',
    },
  ),

  ...build(
    'gp_s1_u8_g31_16',
    G31,
    [
      {
        options: ['저 자동차는', '이 자동차는', '그 자동차는'],
        correct: '저 자동차는',
      },
      {
        options: ['비싸요.', '맛있어요.', '조용해요.'],
        correct: '비싸요.',
      },
    ],
    {
      uz: 'Ana u mashina qimmat.',
      en: 'That car over there is expensive.',
      ru: 'Вон та машина дорогая.',
    },
  ),

  ...build(
    'gp_s1_u8_g31_17',
    G31,
    [
      {
        options: ['이 음식은', '그 음식은', '저 음식은'],
        correct: '이 음식은',
      },
      {
        options: ['맛있어요.', '높아요.', '조용해요.'],
        correct: '맛있어요.',
      },
    ],
    {
      uz: 'Bu taom mazali.',
      en: 'This food is delicious.',
      ru: 'Это блюдо вкусное.',
    },
  ),

  ...build(
    'gp_s1_u8_g31_18',
    G31,
    [
      {
        options: ['그 영화는', '이 영화는', '저 영화는'],
        correct: '그 영화는',
      },
      {
        options: ['재미있어요.', '맛있어요.', '무거워요.'],
        correct: '재미있어요.',
      },
    ],
    {
      uz: 'U film qiziqarli.',
      en: 'That movie is interesting.',
      ru: 'Тот фильм интересный.',
    },
  ),

  ...build(
    'gp_s1_u8_g31_19',
    G31,
    [
      {
        options: ['저 산은', '이 산은', '그 산은'],
        correct: '저 산은',
      },
      {
        options: ['높아요.', '맛있어요.', '깨끗해요.'],
        correct: '높아요.',
      },
    ],
    {
      uz: 'Ana u tog‘ baland.',
      en: 'That mountain over there is high.',
      ru: 'Вон та гора высокая.',
    },
  ),

  ...build(
    'gp_s1_u8_g31_20',
    G31,
    [
      {
        options: ['이 사진은', '그 사진은', '저 사진은'],
        correct: '이 사진은',
      },
      {
        options: ['가족 사진이에요.', '가족이에요.', '학교예요.'],
        correct: '가족 사진이에요.',
      },
    ],
    {
      uz: 'Bu oilaviy surat.',
      en: 'This is a family photo.',
      ru: 'Это семейная фотография.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 32. A/V-네요
// ─────────────────────────────────────────────
const G32 = 'reaction-neyo';

const G32_Q = {
  // grammar_blank 10
  ...blank('gp_s1_u8_g32_01', G32, '와, 이 음식이 맛있네요.', '맛있네요', {
    uz: 'Voy, bu taom mazali ekan.',
    en: 'Wow, this food is delicious.',
    ru: 'Ого, это блюдо вкусное.',
  }),

  ...blank('gp_s1_u8_g32_02', G32, '오늘 날씨가 춥네요.', '춥네요', {
    uz: 'Bugun havo sovuq ekan.',
    en: 'It is cold today.',
    ru: 'Сегодня, оказывается, холодно.',
  }),

  ...blank('gp_s1_u8_g32_03', G32, '이 가방이 정말 예쁘네요.', '예쁘네요', {
    uz: 'Bu sumka juda chiroyli ekan.',
    en: 'This bag is really pretty.',
    ru: 'Эта сумка действительно красивая.',
  }),

  ...blank('gp_s1_u8_g32_04', G32, '학생이 정말 많네요.', '많네요', {
    uz: 'Talabalar juda ko‘p ekan.',
    en: 'There are really a lot of students.',
    ru: 'Здесь действительно много студентов.',
  }),

  ...blank('gp_s1_u8_g32_05', G32, '밖에 비가 오네요.', '오네요', {
    uz: 'Tashqarida yomg‘ir yog‘yapti ekan.',
    en: 'Oh, it is raining outside.',
    ru: 'О, на улице идёт дождь.',
  }),

  ...blank('gp_s1_u8_g32_06', G32, '한국어를 정말 잘하네요.', '잘하네요', {
    uz: 'Koreys tilida juda yaxshi gapirar ekansiz.',
    en: 'You are really good at Korean.',
    ru: 'Вы действительно хорошо говорите по-корейски.',
  }),

  ...blank('gp_s1_u8_g32_07', G32, '이 방이 아주 크네요.', '크네요', {
    uz: 'Bu xona juda katta ekan.',
    en: 'This room is very big.',
    ru: 'Эта комната очень большая.',
  }),

  ...blank('gp_s1_u8_g32_08', G32, '이 음악이 좋네요.', '좋네요', {
    uz: 'Bu musiqa yaxshi ekan.',
    en: 'This music is nice.',
    ru: 'Какая хорошая музыка.',
  }),

  ...blank('gp_s1_u8_g32_09', G32, '버스가 벌써 오네요.', '오네요', {
    uz: 'Avtobus allaqachon kelyapti ekan.',
    en: 'Oh, the bus is already coming.',
    ru: 'О, автобус уже едет.',
  }),

  ...blank('gp_s1_u8_g32_10', G32, '이 가방은 가격이 정말 싸네요.', '싸네요', {
    uz: 'Bu sumkaning narxi juda arzon ekan.',
    en: 'This bag is really inexpensive.',
    ru: 'Эта сумка действительно дешёвая.',
  }),

  // grammar_build 10
  ...build(
    'gp_s1_u8_g32_11',
    G32,
    [
      {
        options: ['와, 이 음식이', '어제 이 음식을', '이 음식에'],
        correct: '와, 이 음식이',
      },
      {
        options: ['맛있네요.', '맛있어요.', '맛있지만요.'],
        correct: '맛있네요.',
      },
    ],
    {
      uz: 'Voy, bu taom mazali ekan.',
      en: 'Wow, this food is delicious.',
      ru: 'Ого, это блюдо вкусное.',
    },
  ),

  ...build(
    'gp_s1_u8_g32_12',
    G32,
    [
      {
        options: ['오늘 날씨가', '오늘 날씨를', '오늘 날씨에'],
        correct: '오늘 날씨가',
      },
      {
        options: ['춥네요.', '추워요.', '춥지만요.'],
        correct: '춥네요.',
      },
    ],
    {
      uz: 'Bugun havo sovuq ekan.',
      en: 'It is cold today.',
      ru: 'Сегодня, оказывается, холодно.',
    },
  ),

  ...build(
    'gp_s1_u8_g32_13',
    G32,
    [
      {
        options: ['이 가방이', '이 가방을', '이 가방에'],
        correct: '이 가방이',
      },
      {
        options: ['정말', '어제', '매일'],
        correct: '정말',
      },
      {
        options: ['예쁘네요.', '예뻐요.', '예쁘지만요.'],
        correct: '예쁘네요.',
      },
    ],
    {
      uz: 'Bu sumka juda chiroyli ekan.',
      en: 'This bag is really pretty.',
      ru: 'Эта сумка действительно красивая.',
    },
  ),

  ...build(
    'gp_s1_u8_g32_14',
    G32,
    [
      {
        options: ['학생이', '학생을', '학생에'],
        correct: '학생이',
      },
      {
        options: ['정말', '어제', '조금 전에'],
        correct: '정말',
      },
      {
        options: ['많네요.', '많아요.', '많지만요.'],
        correct: '많네요.',
      },
    ],
    {
      uz: 'Talabalar juda ko‘p ekan.',
      en: 'There are really a lot of students.',
      ru: 'Здесь действительно много студентов.',
    },
  ),

  ...build(
    'gp_s1_u8_g32_15',
    G32,
    [
      {
        options: ['밖에', '밖에서', '밖을'],
        correct: '밖에',
      },
      {
        options: ['비가', '비를', '비에'],
        correct: '비가',
      },
      {
        options: ['오네요.', '와요.', '오지만요.'],
        correct: '오네요.',
      },
    ],
    {
      uz: 'Tashqarida yomg‘ir yog‘yapti ekan.',
      en: 'Oh, it is raining outside.',
      ru: 'О, на улице идёт дождь.',
    },
  ),

  ...build(
    'gp_s1_u8_g32_16',
    G32,
    [
      {
        options: ['한국어를', '한국어가', '한국어에'],
        correct: '한국어를',
      },
      {
        options: ['정말', '어제', '조금 전에'],
        correct: '정말',
      },
      {
        options: ['잘하네요.', '잘해요.', '잘하지만요.'],
        correct: '잘하네요.',
      },
    ],
    {
      uz: 'Koreys tilida juda yaxshi gapirar ekansiz.',
      en: 'You are really good at Korean.',
      ru: 'Вы действительно хорошо говорите по-корейски.',
    },
  ),

  ...build(
    'gp_s1_u8_g32_17',
    G32,
    [
      {
        options: ['이 방이', '이 방을', '이 방에'],
        correct: '이 방이',
      },
      {
        options: ['아주', '어제', '매일'],
        correct: '아주',
      },
      {
        options: ['크네요.', '커요.', '크지만요.'],
        correct: '크네요.',
      },
    ],
    {
      uz: 'Bu xona juda katta ekan.',
      en: 'This room is very big.',
      ru: 'Эта комната очень большая.',
    },
  ),

  ...build(
    'gp_s1_u8_g32_18',
    G32,
    [
      {
        options: ['이 음악이', '이 음악을', '이 음악에'],
        correct: '이 음악이',
      },
      {
        options: ['좋네요.', '좋아요.', '좋지만요.'],
        correct: '좋네요.',
      },
    ],
    {
      uz: 'Bu musiqa yaxshi ekan.',
      en: 'This music is nice.',
      ru: 'Какая хорошая музыка.',
    },
  ),

  ...build(
    'gp_s1_u8_g32_19',
    G32,
    [
      {
        options: ['버스가', '버스를', '버스에'],
        correct: '버스가',
      },
      {
        options: ['벌써', '어제', '매일'],
        correct: '벌써',
      },
      {
        options: ['오네요.', '와요.', '왔어요.'],
        correct: '오네요.',
      },
    ],
    {
      uz: 'Avtobus allaqachon kelyapti ekan.',
      en: 'Oh, the bus is already coming.',
      ru: 'О, автобус уже едет.',
    },
  ),

  ...build(
    'gp_s1_u8_g32_20',
    G32,
    [
      {
        options: ['이 가방은', '이 가방을', '이 가방에'],
        correct: '이 가방은',
      },
      {
        options: ['가격이', '가격을', '가격에'],
        correct: '가격이',
      },
      {
        options: ['정말 싸네요.', '정말 싸요.', '정말 싸지만요.'],
        correct: '정말 싸네요.',
      },
    ],
    {
      uz: 'Bu sumkaning narxi juda arzon ekan.',
      en: 'This bag is really inexpensive.',
      ru: 'Эта сумka действительно дешёвая.',
    },
  ),
};

export const GT_S1_QUESTIONS: Record<string, any> = {
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

  ...G29_Q,
  ...G30_Q,
  ...G31_Q,
  ...G32_Q,
};

export const GT_S1_NODES = [
  {
    title: {
      ko: '자기소개와 기본 문장',
      uz: 'O‘zini tanishtirish va asosiy gaplar',
      en: 'Introductions and Basic Sentences',
      ru: 'Знакомство и базовые предложения',
    },
    section: 1,
    unit: 1,
    order: 1,
    category: LessonCategory.GRAMMAR,
    isActive: true,
    lessons: [
      {
        title: {
          ko: 'N은/는',
          uz: 'N은/는',
          en: 'N은/는',
          ru: 'N은/는',
        },
        description: {
          ko: '문장에서 이야기할 대상을 나타내기',
          uz: 'Gapda nima yoki kim haqida gapirilayotganini ko‘rsatish',
          en: 'Marking the topic of a sentence',
          ru: 'Обозначаем тему предложения',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_1,
        order: 1,
        grammarCode: G1,
        questions: mix20('gp_s1_u1_g1'),
      },
      {
        title: {
          ko: 'N이에요/예요',
          uz: 'N이에요/예요',
          en: 'N이에요/예요',
          ru: 'N이에요/예요',
        },
        description: {
          ko: '이름, 직업, 국적을 부드럽게 말하기',
          uz: 'Ism, kasb va millatni muloyim tarzda aytish',
          en: 'Stating names, jobs and nationalities politely',
          ru: 'Вежливо говорим имя, профессию и национальность',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_1,
        order: 2,
        grammarCode: G2,
        questions: mix20('gp_s1_u1_g2'),
      },
      {
        title: {
          ko: 'N입니다 / N입니까?',
          uz: 'N입니다 / N입니까?',
          en: 'N입니다 / N입니까?',
          ru: 'N입니다 / N입니까?',
        },
        description: {
          ko: '격식 있게 소개하고 질문하기',
          uz: 'Rasmiy tarzda tanishtirish va savol berish',
          en: 'Making formal statements and questions',
          ru: 'Формально представляемся и задаём вопросы',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_1,
        order: 3,
        grammarCode: G3,
        questions: mix20('gp_s1_u1_g3'),
      },
      {
        title: {
          ko: 'N이/가 아닙니다',
          uz: 'N이/가 아닙니다',
          en: 'N이/가 아닙니다',
          ru: 'N이/가 아닙니다',
        },
        description: {
          ko: '사람이나 사물의 정체를 격식 있게 부정하기',
          uz: 'Odam yoki narsaning kim yoki nima emasligini rasmiy aytish',
          en: 'Formally saying what someone or something is not',
          ru: 'Формально говорим, кем или чем кто-то не является',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_1,
        order: 4,
        grammarCode: G4,
        questions: mix20('gp_s1_u1_g4'),
      },
    ],
  },
  {
    title: {
      ko: '물건과 기본 요청',
      uz: 'Buyumlar va oddiy so‘rovlar',
      en: 'Objects and Basic Requests',
      ru: 'Предметы и простые просьбы',
    },
    section: 1,
    unit: 2,
    order: 1,
    category: LessonCategory.GRAMMAR,
    isActive: true,
    lessons: [
      {
        title: {
          ko: 'N이/가 있어요[없어요]',
          uz: 'N이/가 있어요[없어요]',
          en: 'N이/가 있어요[없어요]',
          ru: 'N이/가 있어요[없어요]',
        },
        description: {
          ko: '사람이나 물건이 있는지 없는지 말하기',
          uz: 'Odam yoki narsa bor yoki yo‘qligini aytish',
          en: 'Talking about whether someone or something exists',
          ru: 'Говорим о наличии или отсутствии людей и предметов',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_1,
        order: 1,
        grammarCode: G5,
        questions: mix20('gp_s1_u2_g5'),
      },
      {
        title: {
          ko: '이거는[그거는, 저거는] N이에요/예요',
          uz: '이거는[그거는, 저거는] N이에요/예요',
          en: '이거는[그거는, 저거는] N이에요/예요',
          ru: '이거는[그거는, 저거는] N이에요/예요',
        },
        description: {
          ko: '가까이 있거나 멀리 있는 물건이 무엇인지 말하기',
          uz: 'Yaqin yoki uzoqdagi buyum nima ekanini aytish',
          en: 'Identifying objects that are near or far away',
          ru: 'Называем предметы, находящиеся близко или далеко',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_1,
        order: 2,
        grammarCode: G6,
        questions: mix20('gp_s1_u2_g6'),
      },
      {
        title: {
          ko: 'N 주세요',
          uz: 'N 주세요',
          en: 'N 주세요',
          ru: 'N 주세요',
        },
        description: {
          ko: '가게나 식당에서 원하는 물건을 부탁하기',
          uz: 'Do‘kon yoki restoranda kerakli narsani so‘rash',
          en: 'Asking for something at a shop or restaurant',
          ru: 'Просим нужный предмет в магазине или ресторане',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_1,
        order: 3,
        grammarCode: G7,
        questions: mix20('gp_s1_u2_g7'),
      },
      {
        title: {
          ko: 'N하고 N · N과/와 N',
          uz: 'N하고 N · N과/와 N',
          en: 'N하고 N · N과/와 N',
          ru: 'N하고 N · N과/와 N',
        },
        description: {
          ko: '두 사람이나 두 사물을 연결해서 말하기',
          uz: 'Ikki odam yoki narsani bir-biriga bog‘lab aytish',
          en: 'Connecting two people or things',
          ru: 'Соединяем двух людей или два предмета',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_1,
        order: 4,
        grammarCode: G8,
        questions: mix20('gp_s1_u2_g8'),
      },
    ],
  },
  {
    title: {
      ko: '일상생활',
      uz: 'Kundalik hayot',
      en: 'Daily Life',
      ru: 'Повседневная жизнь',
    },
    section: 1,
    unit: 3,
    order: 1,
    category: LessonCategory.GRAMMAR,
    isActive: true,
    lessons: [
      {
        title: {
          ko: 'V-아요/어요',
          uz: 'V-아요/어요',
          en: 'V-아요/어요',
          ru: 'V-아요/어요',
        },
        description: {
          ko: '일상적인 행동을 해요체로 말하기',
          uz: 'Kundalik harakatlarni muloyim uslubda aytish',
          en: 'Talking about everyday actions politely',
          ru: 'Говорим о повседневных действиях в вежливом стиле',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_1,
        order: 1,
        grammarCode: G9,
        questions: mix20('gp_s1_u3_g9'),
      },
      {
        title: {
          ko: 'N을/를',
          uz: 'N을/를',
          en: 'N을/를',
          ru: 'N을/를',
        },
        description: {
          ko: '행동의 대상이 되는 목적어 표시하기',
          uz: 'Harakat qaratilgan obyektni ko‘rsatish',
          en: 'Marking the object of an action',
          ru: 'Обозначаем объект действия',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_1,
        order: 2,
        grammarCode: G10,
        questions: mix20('gp_s1_u3_g10'),
      },
      {
        title: {
          ko: 'N에서',
          uz: 'N에서',
          en: 'N에서',
          ru: 'N에서',
        },
        description: {
          ko: '행동이 이루어지는 장소 말하기',
          uz: 'Harakat sodir bo‘ladigan joyni aytish',
          en: 'Expressing where an action takes place',
          ru: 'Говорим, где происходит действие',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_1,
        order: 3,
        grammarCode: G11,
        questions: mix20('gp_s1_u3_g11'),
      },
      {
        title: {
          ko: '안 V',
          uz: '안 V',
          en: '안 V',
          ru: '안 V',
        },
        description: {
          ko: '하지 않는 행동을 간단하게 부정하기',
          uz: 'Bajarilmaydigan harakatni sodda tarzda inkor qilish',
          en: 'Making simple negative verb sentences',
          ru: 'Просто отрицаем действие',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_1,
        order: 4,
        grammarCode: G12,
        questions: mix20('gp_s1_u3_g12'),
      },
    ],
  },
  {
    title: {
      ko: '장소와 위치',
      uz: 'Joy va joylashuv',
      en: 'Places and Locations',
      ru: 'Места и расположение',
    },
    section: 1,
    unit: 4,
    order: 1,
    category: LessonCategory.GRAMMAR,
    isActive: true,
    lessons: [
      {
        title: {
          ko: '여기가 N이에요/예요',
          uz: '여기가 N이에요/예요',
          en: '여기가 N이에요/예요',
          ru: '여기가 N이에요/예요',
        },
        description: {
          ko: '현재 있는 장소가 어디인지 알려 주기',
          uz: 'Hozirgi joyning qayer ekanini aytish',
          en: 'Identifying the place you are at',
          ru: 'Говорим, что это за место',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_1,
        order: 1,
        grammarCode: G13,
        questions: mix20('gp_s1_u4_g13'),
      },
      {
        title: {
          ko: 'N에 있어요[없어요]',
          uz: 'N에 있어요[없어요]',
          en: 'N에 있어요[없어요]',
          ru: 'N에 있어요[없어요]',
        },
        description: {
          ko: '사람이나 물건이 있는 장소 말하기',
          uz: 'Odam yoki narsa qayerda ekanini aytish',
          en: 'Talking about where people and things are',
          ru: 'Говорим, где находятся люди и предметы',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_1,
        order: 2,
        grammarCode: G14,
        questions: mix20('gp_s1_u4_g14'),
      },
      {
        title: {
          ko: 'N에 가요[와요]',
          uz: 'N에 가요[와요]',
          en: 'N에 가요[와요]',
          ru: 'N에 가요[와요]',
        },
        description: {
          ko: '어떤 장소로 가거나 오는 것을 말하기',
          uz: 'Biror joyga borish yoki kelishni aytish',
          en: 'Talking about going to or coming to a place',
          ru: 'Говорим о движении к какому-либо месту',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_1,
        order: 3,
        grammarCode: G15,
        questions: mix20('gp_s1_u4_g15'),
      },
      {
        title: {
          ko: 'N 앞[뒤, 옆]에 있어요',
          uz: 'N 앞[뒤, 옆]에 있어요',
          en: 'N 앞[뒤, 옆]에 있어요',
          ru: 'N 앞[뒤, 옆]에 있어요',
        },
        description: {
          ko: '앞, 뒤, 옆을 사용해서 위치 설명하기',
          uz: 'Old, orqa va yon yordamida joylashuvni tushuntirish',
          en: 'Describing locations with front, behind and next to',
          ru: 'Описываем расположение: спереди, сзади и рядом',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_1,
        order: 4,
        grammarCode: G16,
        questions: mix20('gp_s1_u4_g16'),
      },
    ],
  },
  {
    title: {
      ko: '날짜와 하루 일과',
      uz: 'Sana va kundalik tartib',
      en: 'Dates and Daily Routines',
      ru: 'Даты и распорядок дня',
    },
    section: 1,
    unit: 5,
    order: 1,
    category: LessonCategory.GRAMMAR,
    isActive: true,
    lessons: [
      {
        title: {
          ko: '오늘이 며칠이에요? / 무슨 요일이에요?',
          uz: '오늘이 며칠이에요? / 무슨 요일이에요?',
          en: '오늘이 며칠이에요? / 무슨 요일이에요?',
          ru: '오늘이 며칠이에요? / 무슨 요일이에요?',
        },
        description: {
          ko: '날짜와 요일을 묻고 대답하기',
          uz: 'Sana va hafta kunini so‘rash va javob berish',
          en: 'Asking and answering about dates and days of the week',
          ru: 'Спрашиваем и отвечаем о дате и дне недели',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_1,
        order: 1,
        grammarCode: G17,
        questions: mix20('gp_s1_u5_g17'),
      },
      {
        title: {
          ko: '시간 N에',
          uz: '시간 N에',
          en: '시간 N에',
          ru: '시간 N에',
        },
        description: {
          ko: '행동이 일어나는 시간을 말하기',
          uz: 'Harakat sodir bo‘ladigan vaqtni aytish',
          en: 'Expressing the time when an action happens',
          ru: 'Говорим, в какое время происходит действие',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_1,
        order: 2,
        grammarCode: G18,
        questions: mix20('gp_s1_u5_g18'),
      },
      {
        title: {
          ko: 'V-았/었어요',
          uz: 'V-았/었어요',
          en: 'V-았/었어요',
          ru: 'V-았/었어요',
        },
        description: {
          ko: '과거에 한 행동을 말하기',
          uz: 'O‘tmishda bajarilgan harakatni aytish',
          en: 'Talking about actions completed in the past',
          ru: 'Говорим о действиях в прошлом',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_1,
        order: 3,
        grammarCode: G19,
        questions: mix20('gp_s1_u5_g19'),
      },
      {
        title: {
          ko: 'V-고',
          uz: 'V-고',
          en: 'V-고',
          ru: 'V-고',
        },
        description: {
          ko: '두 가지 행동을 이어서 말하기',
          uz: 'Ikki harakatni bog‘lab aytish',
          en: 'Connecting two actions in one sentence',
          ru: 'Соединяем два действия в одном предложении',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_1,
        order: 4,
        grammarCode: G20,
        questions: mix20('gp_s1_u5_g20'),
      },
    ],
  },
  {
    title: {
      ko: '요청과 묘사',
      uz: 'So‘rovlar va tasvirlash',
      en: 'Requests and Descriptions',
      ru: 'Просьбы и описания',
    },
    section: 1,
    unit: 6,
    order: 1,
    category: LessonCategory.GRAMMAR,
    isActive: true,
    lessons: [
      {
        title: {
          ko: 'V-(으)세요',
          uz: 'V-(으)세요',
          en: 'V-(으)세요',
          ru: 'V-(으)세요',
        },
        description: {
          ko: '상대방에게 어떤 행동을 정중하게 요청하기',
          uz: 'Boshqa odamdan biror harakatni muloyim tarzda so‘rash',
          en: 'Politely asking someone to do something',
          ru: 'Вежливо просим кого-то что-либо сделать',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_1,
        order: 1,
        grammarCode: G21,
        questions: mix20('gp_s1_u6_g21'),
      },
      {
        title: {
          ko: 'N 개[병, 잔, 그릇]',
          uz: 'N 개[병, 잔, 그릇]',
          en: 'N 개[병, 잔, 그릇]',
          ru: 'N 개[병, 잔, 그릇]',
        },
        description: {
          ko: '물건, 병, 음료, 음식의 수량 세기',
          uz: 'Buyum, shisha, ichimlik va ovqat miqdorini sanash',
          en: 'Counting items, bottles, drinks and bowls of food',
          ru: 'Считаем предметы, бутылки, напитки и порции еды',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_1,
        order: 2,
        grammarCode: G22,
        questions: mix20('gp_s1_u6_g22'),
      },
      {
        title: {
          ko: 'N이/가 A-아요/어요',
          uz: 'N이/가 A-아요/어요',
          en: 'N이/가 A-아요/어요',
          ru: 'N이/가 A-아요/어요',
        },
        description: {
          ko: '사람이나 사물의 상태와 특징 설명하기',
          uz: 'Odam yoki narsaning holati va xususiyatini tasvirlash',
          en: 'Describing the state or quality of people and things',
          ru: 'Описываем состояние и свойства людей и предметов',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_1,
        order: 3,
        grammarCode: G23,
        questions: mix20('gp_s1_u6_g23'),
      },
      {
        title: {
          ko: 'N도',
          uz: 'N도',
          en: 'N도',
          ru: 'N도',
        },
        description: {
          ko: '같은 내용이 다른 대상에도 해당한다고 말하기',
          uz: 'Xuddi shu narsa boshqa odam yoki narsaga ham tegishli ekanini aytish',
          en: 'Saying that something also applies to another person or thing',
          ru: 'Говорим, что то же самое относится и к другому человеку или предмету',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_1,
        order: 4,
        grammarCode: G24,
        questions: mix20('gp_s1_u6_g24'),
      },
    ],
  },
  {
    title: {
      ko: '묘사와 격식 표현',
      uz: 'Tasvirlash va rasmiy uslub',
      en: 'Descriptions and Formal Speech',
      ru: 'Описание и формальная речь',
    },
    section: 1,
    unit: 7,
    order: 1,
    category: LessonCategory.GRAMMAR,
    isActive: true,
    lessons: [
      {
        title: {
          ko: 'ㅂ 불규칙',
          uz: 'ㅂ 불규칙',
          en: 'ㅂ 불규칙',
          ru: 'ㅂ 불규칙',
        },
        description: {
          ko: 'ㅂ 받침이 바뀌는 단어를 자연스럽게 활용하기',
          uz: 'ㅂ undoshi o‘zgaradigan so‘zlarni to‘g‘ri tuslash',
          en: 'Conjugating words with the irregular ㅂ change',
          ru: 'Спрягаем слова с нерегулярным изменением ㅂ',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_1,
        order: 1,
        grammarCode: G25,
        questions: mix20('gp_s1_u7_g25'),
      },
      {
        title: {
          ko: 'A/V-지만',
          uz: 'A/V-지만',
          en: 'A/V-지만',
          ru: 'A/V-지만',
        },
        description: {
          ko: '서로 반대되거나 대조되는 두 내용을 연결하기',
          uz: 'Qarama-qarshi ikki mazmunni bog‘lash',
          en: 'Connecting two contrasting ideas',
          ru: 'Соединяем два противопоставленных содержания',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_1,
        order: 2,
        grammarCode: G26,
        questions: mix20('gp_s1_u7_g26'),
      },
      {
        title: {
          ko: 'A/V-습니다/ㅂ니다 · -습니까/ㅂ니까?',
          uz: 'A/V-습니다/ㅂ니다 · -습니까/ㅂ니까?',
          en: 'A/V-습니다/ㅂ니다 · -습니까/ㅂ니까?',
          ru: 'A/V-습니다/ㅂ니다 · -습니까/ㅂ니까?',
        },
        description: {
          ko: '격식 있는 상황에서 말하고 질문하기',
          uz: 'Rasmiy vaziyatda gapirish va savol berish',
          en: 'Making formal statements and questions',
          ru: 'Говорим и задаём вопросы в формальном стиле',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_1,
        order: 3,
        grammarCode: G27,
        questions: mix20('gp_s1_u7_g27'),
      },
      {
        title: {
          ko: 'A/V-고',
          uz: 'A/V-고',
          en: 'A/V-고',
          ru: 'A/V-고',
        },
        description: {
          ko: '두 상태나 행동을 나란히 연결해서 말하기',
          uz: 'Ikki holat yoki harakatni bir-biriga bog‘lab aytish',
          en: 'Connecting two states or actions',
          ru: 'Соединяем два состояния или действия',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_1,
        order: 4,
        grammarCode: G28,
        questions: mix20('gp_s1_u7_g28'),
      },
    ],
  },
  {
    title: {
      ko: '제안과 새로운 발견',
      uz: 'Takliflar va yangi kuzatuvlar',
      en: 'Suggestions and New Discoveries',
      ru: 'Предложения и новые наблюдения',
    },
    section: 1,
    unit: 8,
    order: 1,
    category: LessonCategory.GRAMMAR,
    isActive: true,
    lessons: [
      {
        title: {
          ko: 'V-(으)ㄹ까요?',
          uz: 'V-(으)ㄹ까요?',
          en: 'V-(으)ㄹ까요?',
          ru: 'V-(으)ㄹ까요?',
        },
        description: {
          ko: '상대방에게 함께 할 행동을 제안하기',
          uz: 'Boshqa odamga birgalikda biror ish qilishni taklif qilish',
          en: 'Suggesting an action to do together',
          ru: 'Предлагаем сделать что-либо вместе',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_1,
        order: 1,
        grammarCode: G29,
        questions: mix20('gp_s1_u8_g29'),
      },
      {
        title: {
          ko: 'ㄷ 불규칙',
          uz: 'ㄷ 불규칙',
          en: 'ㄷ 불규칙',
          ru: 'ㄷ 불규칙',
        },
        description: {
          ko: '듣다, 걷다, 묻다의 ㄷ 불규칙 활용 익히기',
          uz: '듣다, 걷다 va 묻다 fe’llarining ㄷ o‘zgarishini o‘rganish',
          en: 'Practicing the irregular ㄷ change in 듣다, 걷다 and 묻다',
          ru: 'Отрабатываем нерегулярное изменение ㄷ в 듣다, 걷다 и 묻다',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_1,
        order: 2,
        grammarCode: G30,
        questions: mix20('gp_s1_u8_g30'),
      },
      {
        title: {
          ko: '이[그, 저] N',
          uz: '이[그, 저] N',
          en: '이[그, 저] N',
          ru: '이[그, 저] N',
        },
        description: {
          ko: '거리와 상황에 따라 사람이나 사물을 가리키기',
          uz: 'Masofa va vaziyatga qarab odam yoki narsani ko‘rsatish',
          en: 'Pointing out people and things based on distance',
          ru: 'Указываем на людей и предметы в зависимости от расстояния',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_1,
        order: 3,
        grammarCode: G31,
        questions: mix20('gp_s1_u8_g31'),
      },
      {
        title: {
          ko: 'A/V-네요',
          uz: 'A/V-네요',
          en: 'A/V-네요',
          ru: 'A/V-네요',
        },
        description: {
          ko: '새롭게 알게 된 사실이나 느낌에 반응하기',
          uz: 'Yangi bilgan holat yoki taassurotga munosabat bildirish',
          en: 'Reacting to something newly noticed or discovered',
          ru: 'Реагируем на только что замеченный факт или впечатление',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_1,
        order: 4,
        grammarCode: G32,
        questions: mix20('gp_s1_u8_g32'),
      },
    ],
  },
];
