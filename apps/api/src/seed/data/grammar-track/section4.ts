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
      level: '4',
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
  const full = rows.reduce(
    (acc, row, i) =>
      i === 0 || row.glue ? acc + row.correct : acc + ' ' + row.correct,
    '',
  );

  return {
    [code]: {
      type: 'grammar_build',
      level: '4',
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
// UNIT 1 · 10과
// 뭐 먹을래?
// ═══════════════════════════════════════════════════════════

// ─────────────────────────────────────────────
// 문법 1. N 중에(서)
// ─────────────────────────────────────────────
const G1 = 'among-jungeseo';

const G1_Q = {
  // grammar_blank 10
  ...blank(
    'gp_s4_u1_g1_01',
    G1,
    '한국 음식 중에서 뭐가 제일 맛있어요?',
    '중에서',
    {
      uz: 'Koreys taomlari orasida qaysi biri eng mazali?',
      en: 'Which Korean food is the most delicious?',
      ru: 'Какое корейское блюдо самое вкусное?',
    },
  ),

  ...blank(
    'gp_s4_u1_g1_02',
    G1,
    '비빔밥하고 불고기 중에 뭐 먹을래요?',
    '중에',
    {
      uz: 'Bibimbap va bulgogi orasidan qaysi birini yeysiz?',
      en: 'Which would you like to eat, bibimbap or bulgogi?',
      ru: 'Что вы хотите съесть: пибимпап или пулькоги?',
    },
  ),

  ...blank(
    'gp_s4_u1_g1_03',
    G1,
    '이 세 메뉴 중에서 냉면이 제일 싸요.',
    '중에서',
    {
      uz: 'Bu uchta taom orasida naengmyeon eng arzon.',
      en: 'Among these three menu items, naengmyeon is the cheapest.',
      ru: 'Из этих трёх блюд нэнмён самое дешёвое.',
    },
  ),

  ...blank('gp_s4_u1_g1_04', G1, '과일 중에 딸기를 가장 좋아해요.', '중에', {
    uz: 'Mevalar orasida qulupnayni eng ko‘p yoqtiraman.',
    en: 'Among fruits, I like strawberries the most.',
    ru: 'Из фруктов я больше всего люблю клубнику.',
  }),

  ...blank(
    'gp_s4_u1_g1_05',
    G1,
    '이 식당들 중에서 어디가 제일 유명해요?',
    '중에서',
    {
      uz: 'Bu restoranlar orasida qaysi biri eng mashhur?',
      en: 'Which of these restaurants is the most famous?',
      ru: 'Какой из этих ресторанов самый известный?',
    },
  ),

  ...blank('gp_s4_u1_g1_06', G1, '둘 중에 불고기가 덜 매워요.', '중에', {
    uz: 'Ikkalasidan bulgogi kamroq achchiq.',
    en: 'Of the two, bulgogi is less spicy.',
    ru: 'Из этих двух пулькоги менее острое.',
  }),

  ...blank(
    'gp_s4_u1_g1_07',
    G1,
    '우리 반 학생들 중에서 누가 요리를 제일 잘해요?',
    '중에서',
    {
      uz: 'Sinfimizdagi talabalar orasida kim eng yaxshi ovqat pishiradi?',
      en: 'Who cooks the best among the students in our class?',
      ru: 'Кто лучше всех готовит среди учеников нашего класса?',
    },
  ),

  ...blank(
    'gp_s4_u1_g1_08',
    G1,
    '이 음료들 중에 어떤 게 제일 달아요?',
    '중에',
    {
      uz: 'Bu ichimliklar orasida qaysi biri eng shirin?',
      en: 'Which of these drinks is the sweetest?',
      ru: 'Какой из этих напитков самый сладкий?',
    },
  ),

  ...blank(
    'gp_s4_u1_g1_09',
    G1,
    '점심 메뉴 중에서 하나만 골라 주세요.',
    '중에서',
    {
      uz: 'Tushlik menyusidan bittasini tanlang.',
      en: 'Please choose just one from the lunch menu.',
      ru: 'Выберите, пожалуйста, одно блюдо из обеденного меню.',
    },
  ),

  ...blank(
    'gp_s4_u1_g1_10',
    G1,
    '커피하고 차 중에 어느 것을 더 자주 마셔요?',
    '중에',
    {
      uz: 'Qahva va choy orasidan qaysi birini ko‘proq ichasiz?',
      en: 'Which do you drink more often, coffee or tea?',
      ru: 'Что вы пьёте чаще: кофе или чай?',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s4_u1_g1_11',
    G1,
    [
      {
        options: ['한국 음식', '이 식당', '오늘 메뉴'],
        correct: '한국 음식',
      },
      {
        options: ['중에서', '보다', '밖에'],
        correct: '중에서',
      },
      {
        options: ['비빔밥이', '비빔밥을', '비빔밥은'],
        correct: '비빔밥이',
      },
      {
        options: ['제일 맛있어요.', '제일 비싸요.', '제일 멀어요.'],
        correct: '제일 맛있어요.',
      },
    ],
    {
      uz: 'Koreys taomlari orasida bibimbap eng mazali.',
      en: 'Among Korean foods, bibimbap is the most delicious.',
      ru: 'Из корейских блюд пибимпап самый вкусный.',
    },
  ),

  ...build(
    'gp_s4_u1_g1_12',
    G1,
    [
      {
        options: ['비빔밥하고', '비빔밥을', '비빔밥에서'],
        correct: '비빔밥하고',
      },
      {
        options: ['불고기', '불고기를', '불고기가'],
        correct: '불고기',
      },
      {
        options: ['중에', '마다', '부터'],
        correct: '중에',
      },
      {
        options: ['뭐 먹을래요?', '뭐 마실래요?', '뭐 살래요?'],
        correct: '뭐 먹을래요?',
      },
    ],
    {
      uz: 'Bibimbap va bulgogidan qaysi birini yeysiz?',
      en: 'Which would you like to eat, bibimbap or bulgogi?',
      ru: 'Что хотите съесть: пибимпап или пулькоги?',
    },
  ),

  ...build(
    'gp_s4_u1_g1_13',
    G1,
    [
      {
        options: ['이 세 메뉴', '이 세 사람', '이 세 음료'],
        correct: '이 세 메뉴',
      },
      {
        options: ['중에서', '까지', '처럼'],
        correct: '중에서',
      },
      {
        options: ['냉면이', '냉면을', '냉면도'],
        correct: '냉면이',
      },
      {
        options: ['제일 싸요.', '제일 작아요.', '제일 멀어요.'],
        correct: '제일 싸요.',
      },
    ],
    {
      uz: 'Bu uchta taom orasida naengmyeon eng arzon.',
      en: 'Among these three dishes, naengmyeon is the cheapest.',
      ru: 'Из этих трёх блюд нэнмён самое дешёвое.',
    },
  ),

  ...build(
    'gp_s4_u1_g1_14',
    G1,
    [
      {
        options: ['과일', '음료', '식당'],
        correct: '과일',
      },
      {
        options: ['중에', '보다', '에게'],
        correct: '중에',
      },
      {
        options: ['딸기를', '딸기가', '딸기는'],
        correct: '딸기를',
      },
      {
        options: ['가장 좋아해요.', '가장 기다려요.', '가장 만나요.'],
        correct: '가장 좋아해요.',
      },
    ],
    {
      uz: 'Mevalar orasida qulupnayni eng ko‘p yoqtiraman.',
      en: 'Among fruits, I like strawberries the most.',
      ru: 'Из фруктов я больше всего люблю клубнику.',
    },
  ),

  ...build(
    'gp_s4_u1_g1_15',
    G1,
    [
      {
        options: ['이 식당들', '이 음식들', '이 사람들'],
        correct: '이 식당들',
      },
      {
        options: ['중에서', '부터', '까지'],
        correct: '중에서',
      },
      {
        options: ['어디가', '누가', '뭐를'],
        correct: '어디가',
      },
      {
        options: ['제일 유명해요?', '제일 매워요?', '제일 친절해요?'],
        correct: '제일 유명해요?',
      },
    ],
    {
      uz: 'Bu restoranlar orasida qaysi biri eng mashhur?',
      en: 'Which of these restaurants is the most famous?',
      ru: 'Какой из этих ресторанов самый известный?',
    },
  ),

  ...build(
    'gp_s4_u1_g1_16',
    G1,
    [
      {
        options: ['둘', '두 개를', '둘을'],
        correct: '둘',
      },
      {
        options: ['중에', '밖에', '마다'],
        correct: '중에',
      },
      {
        options: ['불고기가', '불고기를', '불고기는'],
        correct: '불고기가',
      },
      {
        options: ['덜 매워요.', '덜 달아요.', '덜 비싸요.'],
        correct: '덜 매워요.',
      },
    ],
    {
      uz: 'Ikkalasidan bulgogi kamroq achchiq.',
      en: 'Of the two, bulgogi is less spicy.',
      ru: 'Из двух блюд пулькоги менее острое.',
    },
  ),

  ...build(
    'gp_s4_u1_g1_17',
    G1,
    [
      {
        options: ['우리 반', '우리 집', '우리 회사'],
        correct: '우리 반',
      },
      {
        options: ['학생들', '학생들을', '학생들이'],
        correct: '학생들',
      },
      {
        options: ['중에서', '한테서', '까지'],
        correct: '중에서',
      },
      {
        options: ['누가', '뭐가', '어디가'],
        correct: '누가',
      },
      {
        options: ['요리를 잘해요?', '요리를 먹어요?', '요리를 주문해요?'],
        correct: '요리를 잘해요?',
      },
    ],
    {
      uz: 'Sinfimizdagi talabalar orasida kim yaxshi ovqat pishiradi?',
      en: 'Who cooks well among the students in our class?',
      ru: 'Кто хорошо готовит среди учеников нашего класса?',
    },
  ),

  ...build(
    'gp_s4_u1_g1_18',
    G1,
    [
      {
        options: ['이 음료들', '이 접시들', '이 의자들'],
        correct: '이 음료들',
      },
      {
        options: ['중에', '처럼', '에게'],
        correct: '중에',
      },
      {
        options: ['어떤 게', '누가', '어디가'],
        correct: '어떤 게',
      },
      {
        options: ['제일 달아요?', '제일 넓어요?', '제일 빨라요?'],
        correct: '제일 달아요?',
      },
    ],
    {
      uz: 'Bu ichimliklar orasida qaysi biri eng shirin?',
      en: 'Which of these drinks is the sweetest?',
      ru: 'Какой из этих напитков самый сладкий?',
    },
  ),

  ...build(
    'gp_s4_u1_g1_19',
    G1,
    [
      {
        options: ['점심 메뉴', '점심시간', '점심 약속'],
        correct: '점심 메뉴',
      },
      {
        options: ['중에서', '보다', '에게서'],
        correct: '중에서',
      },
      {
        options: ['하나만', '한 명만', '한 번만'],
        correct: '하나만',
      },
      {
        options: ['골라 주세요.', '기다려 주세요.', '열어 주세요.'],
        correct: '골라 주세요.',
      },
    ],
    {
      uz: 'Tushlik menyusidan bittasini tanlang.',
      en: 'Please choose one item from the lunch menu.',
      ru: 'Выберите одно блюдо из обеденного меню.',
    },
  ),

  ...build(
    'gp_s4_u1_g1_20',
    G1,
    [
      {
        options: ['커피하고', '커피를', '커피에서'],
        correct: '커피하고',
      },
      {
        options: ['차', '차를', '차가'],
        correct: '차',
      },
      {
        options: ['중에', '부터', '밖에'],
        correct: '중에',
      },
      {
        options: ['어느 것을', '누구를', '어디를'],
        correct: '어느 것을',
      },
      {
        options: ['더 자주 마셔요?', '더 자주 먹어요?', '더 자주 입어요?'],
        correct: '더 자주 마셔요?',
      },
    ],
    {
      uz: 'Qahva va choy orasidan qaysi birini tez-tez ichasiz?',
      en: 'Which do you drink more often, coffee or tea?',
      ru: 'Что вы пьёте чаще: кофе или чай?',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 2. 반말
// ─────────────────────────────────────────────
const G2 = 'banmal';

const G2_Q = {
  // grammar_blank 10
  ...blank('gp_s4_u1_g2_01', G2, '민수야, 지금 뭐 해?', '뭐 해?', {
    uz: 'Minsu, hozir nima qilyapsan?',
    en: 'Minsu, what are you doing now?',
    ru: 'Минсу, что ты сейчас делаешь?',
  }),

  ...blank('gp_s4_u1_g2_02', G2, '나 오늘 비빔밥 먹어.', '먹어', {
    uz: 'Men bugun bibimbap yeyman.',
    en: 'I am eating bibimbap today.',
    ru: 'Я сегодня ем пибимпап.',
  }),

  ...blank('gp_s4_u1_g2_03', G2, '이 음식 정말 맛있어.', '맛있어', {
    uz: 'Bu taom juda mazali.',
    en: 'This food is really delicious.',
    ru: 'Это блюдо очень вкусное.',
  }),

  ...blank('gp_s4_u1_g2_04', G2, '우리 같이 점심 먹자.', '먹자', {
    uz: 'Keling, birga tushlik qilamiz.',
    en: "Let's have lunch together.",
    ru: 'Давай пообедаем вместе.',
  }),

  ...blank('gp_s4_u1_g2_05', G2, '너 매운 음식 좋아해?', '좋아해?', {
    uz: 'Sen achchiq ovqatni yoqtirasanmi?',
    en: 'Do you like spicy food?',
    ru: 'Ты любишь острую еду?',
  }),

  ...blank('gp_s4_u1_g2_06', G2, '나는 학생이야.', '학생이야', {
    uz: 'Men talabaman.',
    en: 'I am a student.',
    ru: 'Я студент.',
  }),

  ...blank('gp_s4_u1_g2_07', G2, '수진이는 의사야.', '의사야', {
    uz: 'Sujin shifokor.',
    en: 'Sujin is a doctor.',
    ru: 'Суджин — врач.',
  }),

  ...blank('gp_s4_u1_g2_08', G2, '미안해. 내가 늦었어.', '미안해', {
    uz: 'Kechir. Men kech qoldim.',
    en: "Sorry. I'm late.",
    ru: 'Извини. Я опоздал.',
  }),

  ...blank('gp_s4_u1_g2_09', G2, '이거 한번 먹어 봐.', '먹어 봐', {
    uz: 'Buni bir tatib ko‘r.',
    en: 'Try this.',
    ru: 'Попробуй это.',
  }),

  ...blank('gp_s4_u1_g2_10', G2, '괜찮아? 많이 매워?', '괜찮아?', {
    uz: 'Hammasi joyidami? Juda achchiqmi?',
    en: 'Are you okay? Is it very spicy?',
    ru: 'Всё нормально? Очень остро?',
  }),

  // grammar_build 10
  ...build(
    'gp_s4_u1_g2_11',
    G2,
    [
      {
        options: ['민수야,', '민수 씨,', '선생님,'],
        correct: '민수야,',
      },
      {
        options: ['지금', '어제', '내일'],
        correct: '지금',
      },
      {
        options: ['뭐 해?', '뭐 먹어?', '뭐 봐?'],
        correct: '뭐 해?',
      },
    ],
    {
      uz: 'Minsu, hozir nima qilyapsan?',
      en: 'Minsu, what are you doing now?',
      ru: 'Минсу, что ты сейчас делаешь?',
    },
  ),

  ...build(
    'gp_s4_u1_g2_12',
    G2,
    [
      {
        options: ['나', '저', '제가'],
        correct: '나',
      },
      {
        options: ['오늘', '지금', '아까'],
        correct: '오늘',
      },
      {
        options: ['비빔밥', '커피', '주스'],
        correct: '비빔밥',
      },
      {
        options: ['먹어.', '마셔.', '사.'],
        correct: '먹어.',
      },
    ],
    {
      uz: 'Men bugun bibimbap yeyman.',
      en: 'I am eating bibimbap today.',
      ru: 'Сегодня я ем пибимпап.',
    },
  ),

  ...build(
    'gp_s4_u1_g2_13',
    G2,
    [
      {
        options: ['이 음식', '이 가방', '이 옷'],
        correct: '이 음식',
      },
      {
        options: ['정말', '아직', '벌써'],
        correct: '정말',
      },
      {
        options: ['맛있어.', '예뻐.', '비싸.'],
        correct: '맛있어.',
      },
    ],
    {
      uz: 'Bu taom juda mazali.',
      en: 'This food is really delicious.',
      ru: 'Это блюдо очень вкусное.',
    },
  ),

  ...build(
    'gp_s4_u1_g2_14',
    G2,
    [
      {
        options: ['우리', '저희', '제가'],
        correct: '우리',
      },
      {
        options: ['같이', '혼자', '먼저'],
        correct: '같이',
      },
      {
        options: ['점심', '숙제', '운동'],
        correct: '점심',
      },
      {
        options: ['먹자.', '하자.', '가자.'],
        correct: '먹자.',
      },
    ],
    {
      uz: 'Birga tushlik qilaylik.',
      en: "Let's have lunch together.",
      ru: 'Давай пообедаем вместе.',
    },
  ),

  ...build(
    'gp_s4_u1_g2_15',
    G2,
    [
      {
        options: ['너', '저', '제가'],
        correct: '너',
      },
      {
        options: ['매운 음식을', '한국어를', '영화를'],
        correct: '매운 음식을',
      },
      {
        options: ['좋아해?', '먹어?', '만들어?'],
        correct: '좋아해?',
      },
    ],
    {
      uz: 'Sen achchiq ovqatni yoqtirasanmi?',
      en: 'Do you like spicy food?',
      ru: 'Ты любишь острую еду?',
    },
  ),

  ...build(
    'gp_s4_u1_g2_16',
    G2,
    [
      {
        options: ['나는', '저는', '제가'],
        correct: '나는',
      },
      {
        options: ['학생이야.', '의사야.', '친구야.'],
        correct: '학생이야.',
      },
    ],
    {
      uz: 'Men talabaman.',
      en: 'I am a student.',
      ru: 'Я студент.',
    },
  ),

  ...build(
    'gp_s4_u1_g2_17',
    G2,
    [
      {
        options: ['수진이는', '수진이를', '수진이가'],
        correct: '수진이는',
      },
      {
        options: ['의사야.', '학생이야.', '요리사야.'],
        correct: '의사야.',
      },
    ],
    {
      uz: 'Sujin shifokor.',
      en: 'Sujin is a doctor.',
      ru: 'Суджин — врач.',
    },
  ),

  ...build(
    'gp_s4_u1_g2_18',
    G2,
    [
      {
        options: ['미안해.', '고마워.', '괜찮아.'],
        correct: '미안해.',
      },
      {
        options: ['내가', '나는', '너는'],
        correct: '내가',
      },
      {
        options: ['늦었어.', '먹었어.', '샀어.'],
        correct: '늦었어.',
      },
    ],
    {
      uz: 'Kechir. Men kech qoldim.',
      en: "Sorry. I'm late.",
      ru: 'Извини. Я опоздал.',
    },
  ),

  ...build(
    'gp_s4_u1_g2_19',
    G2,
    [
      {
        options: ['이거', '저기', '여기'],
        correct: '이거',
      },
      {
        options: ['한번', '아주', '정말'],
        correct: '한번',
      },
      {
        options: ['먹어 봐.', '마셔 봐.', '입어 봐.'],
        correct: '먹어 봐.',
      },
    ],
    {
      uz: 'Buni bir tatib ko‘r.',
      en: 'Try this.',
      ru: 'Попробуй это.',
    },
  ),

  ...build(
    'gp_s4_u1_g2_20',
    G2,
    [
      {
        options: ['괜찮아?', '고마워?', '미안해?'],
        correct: '괜찮아?',
      },
      {
        options: ['많이', '조금', '아주'],
        correct: '많이',
      },
      {
        options: ['매워?', '달아?', '짜?'],
        correct: '매워?',
      },
    ],
    {
      uz: 'Hammasi joyidami? Juda achchiqmi?',
      en: 'Are you okay? Is it very spicy?',
      ru: 'Всё нормально? Очень остро?',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 3. V-(으)ㄹ래요
// ─────────────────────────────────────────────
const G3 = 'verb-eulrae-yo';

const G3_Q = {
  // grammar_blank 10
  ...blank('gp_s4_u1_g3_01', G3, '뭐 먹을래요?', '먹을래요', {
    uz: 'Nima yeysiz?',
    en: 'What would you like to eat?',
    ru: 'Что хотите поесть?',
  }),

  ...blank('gp_s4_u1_g3_02', G3, '저는 비빔밥을 먹을래요.', '먹을래요', {
    uz: 'Men bibimbap yeyman.',
    en: "I'll have bibimbap.",
    ru: 'Я буду пибимпап.',
  }),

  ...blank('gp_s4_u1_g3_03', G3, '커피하고 차 중에 뭐 마실래요?', '마실래요', {
    uz: 'Qahva va choydan qaysi birini ichasiz?',
    en: 'Would you like coffee or tea?',
    ru: 'Что будете пить: кофе или чай?',
  }),

  ...blank('gp_s4_u1_g3_04', G3, '오늘 저녁에 같이 밥 먹을래요?', '먹을래요', {
    uz: 'Bugun kechqurun birga ovqatlanamizmi?',
    en: 'Would you like to have dinner together tonight?',
    ru: 'Хотите сегодня вечером поужинать вместе?',
  }),

  ...blank('gp_s4_u1_g3_05', G3, '이 식당에 갈래요?', '갈래요', {
    uz: 'Shu restoranga borishni xohlaysizmi?',
    en: 'Would you like to go to this restaurant?',
    ru: 'Хотите пойти в этот ресторан?',
  }),

  ...blank('gp_s4_u1_g3_06', G3, '저는 안 매운 걸 주문할래요.', '주문할래요', {
    uz: 'Men achchiq bo‘lmagan taom buyurtma qilaman.',
    en: "I'll order something that isn't spicy.",
    ru: 'Я закажу что-нибудь неострое.',
  }),

  ...blank('gp_s4_u1_g3_07', G3, '디저트도 먹을래요?', '먹을래요', {
    uz: 'Desert ham yeysizmi?',
    en: 'Would you like dessert too?',
    ru: 'Хотите ещё десерт?',
  }),

  ...blank('gp_s4_u1_g3_08', G3, '나는 냉면 먹을래.', '먹을래', {
    uz: 'Men naengmyeon yeyman.',
    en: "I'll have naengmyeon.",
    ru: 'Я буду нэнмён.',
  }),

  ...blank(
    'gp_s4_u1_g3_09',
    G3,
    '주말에 새로 생긴 식당에 가 볼래요?',
    '가 볼래요',
    {
      uz: 'Dam olish kuni yangi restoranga borib ko‘rasizmi?',
      en: 'Would you like to try the new restaurant this weekend?',
      ru: 'Хотите сходить в новый ресторан на выходных?',
    },
  ),

  ...blank('gp_s4_u1_g3_10', G3, '매운 음식은 안 먹을래요.', '안 먹을래요', {
    uz: 'Achchiq ovqat yemayman.',
    en: "I don't want to eat spicy food.",
    ru: 'Я не буду есть острую пищу.',
  }),

  // grammar_build 10
  ...build(
    'gp_s4_u1_g3_11',
    G3,
    [
      {
        options: ['뭐', '누구', '어디'],
        correct: '뭐',
      },
      {
        options: ['먹을래요?', '마실래요?', '살래요?'],
        correct: '먹을래요?',
      },
    ],
    {
      uz: 'Nima yeysiz?',
      en: 'What would you like to eat?',
      ru: 'Что хотите поесть?',
    },
  ),

  ...build(
    'gp_s4_u1_g3_12',
    G3,
    [
      {
        options: ['저는', '제가', '저를'],
        correct: '저는',
      },
      {
        options: ['비빔밥을', '비빔밥이', '비빔밥은'],
        correct: '비빔밥을',
      },
      {
        options: ['먹을래요.', '마실래요.', '만들래요.'],
        correct: '먹을래요.',
      },
    ],
    {
      uz: 'Men bibimbap yeyman.',
      en: "I'll have bibimbap.",
      ru: 'Я буду пибимпап.',
    },
  ),

  ...build(
    'gp_s4_u1_g3_13',
    G3,
    [
      {
        options: ['커피하고', '커피를', '커피가'],
        correct: '커피하고',
      },
      {
        options: ['차', '차를', '차가'],
        correct: '차',
      },
      {
        options: ['중에', '보다', '마다'],
        correct: '중에',
      },
      {
        options: ['뭐 마실래요?', '뭐 먹을래요?', '뭐 살래요?'],
        correct: '뭐 마실래요?',
      },
    ],
    {
      uz: 'Qahva va choydan qaysi birini ichasiz?',
      en: 'Would you like coffee or tea?',
      ru: 'Что будете пить: кофе или чай?',
    },
  ),

  ...build(
    'gp_s4_u1_g3_14',
    G3,
    [
      {
        options: ['오늘 저녁에', '어제 아침에', '지난주에'],
        correct: '오늘 저녁에',
      },
      {
        options: ['같이', '아직', '벌써'],
        correct: '같이',
      },
      {
        options: ['밥 먹을래요?', '차 마실래요?', '영화 볼래요?'],
        correct: '밥 먹을래요?',
      },
    ],
    {
      uz: 'Bugun kechqurun birga ovqatlanamizmi?',
      en: 'Would you like to have dinner together tonight?',
      ru: 'Хотите сегодня вечером поужинать вместе?',
    },
  ),

  ...build(
    'gp_s4_u1_g3_15',
    G3,
    [
      {
        options: ['이 식당에', '이 식당을', '이 식당이'],
        correct: '이 식당에',
      },
      {
        options: ['갈래요?', '먹을래요?', '마실래요?'],
        correct: '갈래요?',
      },
    ],
    {
      uz: 'Shu restoranga borasizmi?',
      en: 'Would you like to go to this restaurant?',
      ru: 'Хотите пойти в этот ресторан?',
    },
  ),

  ...build(
    'gp_s4_u1_g3_16',
    G3,
    [
      {
        options: ['저는', '저를', '제가'],
        correct: '저는',
      },
      {
        options: ['안 매운 걸', '안 매운 게', '안 매운 건'],
        correct: '안 매운 걸',
      },
      {
        options: ['주문할래요.', '추천할래요.', '기다릴래요.'],
        correct: '주문할래요.',
      },
    ],
    {
      uz: 'Men achchiq bo‘lmagan taom buyurtma qilaman.',
      en: "I'll order something that isn't spicy.",
      ru: 'Я закажу что-нибудь неострое.',
    },
  ),

  ...build(
    'gp_s4_u1_g3_17',
    G3,
    [
      {
        options: ['디저트도', '디저트를', '디저트가'],
        correct: '디저트도',
      },
      {
        options: ['먹을래요?', '마실래요?', '갈래요?'],
        correct: '먹을래요?',
      },
    ],
    {
      uz: 'Desert ham yeysizmi?',
      en: 'Would you like dessert too?',
      ru: 'Хотите ещё десерт?',
    },
  ),

  ...build(
    'gp_s4_u1_g3_18',
    G3,
    [
      {
        options: ['나는', '내가', '나를'],
        correct: '나는',
      },
      {
        options: ['냉면', '커피', '주스'],
        correct: '냉면',
      },
      {
        options: ['먹을래.', '마실래.', '살래.'],
        correct: '먹을래.',
      },
    ],
    {
      uz: 'Men naengmyeon yeyman.',
      en: "I'll have naengmyeon.",
      ru: 'Я буду нэнмён.',
    },
  ),

  ...build(
    'gp_s4_u1_g3_19',
    G3,
    [
      {
        options: ['주말에', '어제', '지난달에'],
        correct: '주말에',
      },
      {
        options: ['새 식당에', '새 식당을', '새 식당이'],
        correct: '새 식당에',
      },
      {
        options: ['가 볼래요?', '먹어 볼래요?', '사 볼래요?'],
        correct: '가 볼래요?',
      },
    ],
    {
      uz: 'Dam olish kuni yangi restoranga borib ko‘rasizmi?',
      en: 'Would you like to try going to the new restaurant this weekend?',
      ru: 'Хотите сходить в новый ресторан на выходных?',
    },
  ),

  ...build(
    'gp_s4_u1_g3_20',
    G3,
    [
      {
        options: ['매운 음식은', '매운 음식을', '매운 음식이'],
        correct: '매운 음식은',
      },
      {
        options: ['안 먹을래요.', '안 마실래요.', '안 살래요.'],
        correct: '안 먹을래요.',
      },
    ],
    {
      uz: 'Men achchiq ovqat yemayman.',
      en: "I don't want to eat spicy food.",
      ru: 'Я не хочу есть острую пищу.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 4. A-(으)ㄴ데, V-는데, N인데 2
// ─────────────────────────────────────────────
const G4 = 'av-eunde-neunde-ninde-2';

const G4_Q = {
  // grammar_blank 10
  ...blank('gp_s4_u1_g4_01', G4, '이 음식은 좀 매운데 괜찮아요?', '매운데', {
    uz: 'Bu taom biroz achchiq, maylimi?',
    en: 'This food is a little spicy. Is that okay?',
    ru: 'Это блюдо немного острое. Нормально?',
  }),

  ...blank('gp_s4_u1_g4_02', G4, '가격은 비싼데 맛은 정말 좋아요.', '비싼데', {
    uz: 'Narxi qimmat, lekin ta’mi juda yaxshi.',
    en: 'It is expensive, but it tastes really good.',
    ru: 'Цена высокая, но вкус отличный.',
  }),

  ...blank(
    'gp_s4_u1_g4_03',
    G4,
    '식당은 작은데 손님이 항상 많아요.',
    '작은데',
    {
      uz: 'Restoran kichik, lekin mijozlari doim ko‘p.',
      en: 'The restaurant is small, but it is always crowded.',
      ru: 'Ресторан маленький, но посетителей всегда много.',
    },
  ),

  ...blank(
    'gp_s4_u1_g4_04',
    G4,
    '저는 매운 음식을 못 먹는데 다른 메뉴도 있어요?',
    '못 먹는데',
    {
      uz: 'Men achchiq ovqat yeya olmayman. Boshqa taom bormi?',
      en: "I can't eat spicy food. Do you have another menu option?",
      ru: 'Я не могу есть острое. Есть другое блюдо?',
    },
  ),

  ...blank(
    'gp_s4_u1_g4_05',
    G4,
    '친구가 기다리는데 주문을 빨리 할까요?',
    '기다리는데',
    {
      uz: 'Do‘stim kutyapti, buyurtmani tezroq beramizmi?',
      en: 'My friend is waiting. Shall we order quickly?',
      ru: 'Друг ждёт. Может, закажем побыстрее?',
    },
  ),

  ...blank(
    'gp_s4_u1_g4_06',
    G4,
    '지금 점심을 먹는데 같이 먹을래요?',
    '먹는데',
    {
      uz: 'Hozir tushlik qilyapman, birga ovqatlanasizmi?',
      en: "I'm having lunch now. Would you like to join me?",
      ru: 'Я сейчас обедаю. Хотите вместе?',
    },
  ),

  ...blank(
    'gp_s4_u1_g4_07',
    G4,
    '이건 비빔밥인데 많이 맵지 않아요.',
    '비빔밥인데',
    {
      uz: 'Bu bibimbap, lekin juda achchiq emas.',
      en: "This is bibimbap, and it isn't very spicy.",
      ru: 'Это пибимпап, и он не очень острый.',
    },
  ),

  ...blank(
    'gp_s4_u1_g4_08',
    G4,
    '오늘 특별 메뉴인데 한번 드셔 보세요.',
    '특별 메뉴인데',
    {
      uz: 'Bu bugungi maxsus taom, tatib ko‘ring.',
      en: "It's today's special, so please give it a try.",
      ru: 'Это сегодняшнее специальное блюдо. Попробуйте.',
    },
  ),

  ...blank(
    'gp_s4_u1_g4_09',
    G4,
    '저는 채식주의자인데 고기 없는 음식이 있어요?',
    '채식주의자인데',
    {
      uz: 'Men vegetarianman. Go‘shtsiz taom bormi?',
      en: "I'm a vegetarian. Do you have anything without meat?",
      ru: 'Я вегетарианец. Есть блюда без мяса?',
    },
  ),

  ...blank(
    'gp_s4_u1_g4_10',
    G4,
    '이 국은 뜨거운데 조금 식혀서 드세요.',
    '뜨거운데',
    {
      uz: 'Bu sho‘rva issiq, biroz sovitib iching.',
      en: 'This soup is hot, so let it cool a little before eating.',
      ru: 'Этот суп горячий, немного остудите его.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s4_u1_g4_11',
    G4,
    [
      {
        options: ['이 음식은', '이 음식이', '이 음식을'],
        correct: '이 음식은',
      },
      {
        options: ['좀', '아주', '전혀'],
        correct: '좀',
      },
      {
        options: ['매운데', '단데', '싼데'],
        correct: '매운데',
      },
      {
        options: ['괜찮아요?', '맛있어요?', '비싸요?'],
        correct: '괜찮아요?',
      },
    ],
    {
      uz: 'Bu taom biroz achchiq, maylimi?',
      en: 'This food is a little spicy. Is that okay?',
      ru: 'Это блюдо немного острое. Нормально?',
    },
  ),

  ...build(
    'gp_s4_u1_g4_12',
    G4,
    [
      {
        options: ['가격은', '가격이', '가격을'],
        correct: '가격은',
      },
      {
        options: ['비싼데', '싼데', '좋은데'],
        correct: '비싼데',
      },
      {
        options: ['맛은', '맛이', '맛을'],
        correct: '맛은',
      },
      {
        options: ['정말 좋아요.', '정말 멀어요.', '정말 넓어요.'],
        correct: '정말 좋아요.',
      },
    ],
    {
      uz: 'Narxi qimmat, lekin ta’mi juda yaxshi.',
      en: 'It is expensive, but the taste is really good.',
      ru: 'Цена высокая, но вкус очень хороший.',
    },
  ),

  ...build(
    'gp_s4_u1_g4_13',
    G4,
    [
      {
        options: ['식당은', '식당이', '식당을'],
        correct: '식당은',
      },
      {
        options: ['작은데', '넓은데', '비싼데'],
        correct: '작은데',
      },
      {
        options: ['손님이', '손님을', '손님은'],
        correct: '손님이',
      },
      {
        options: ['항상 많아요.', '항상 작아요.', '항상 멀어요.'],
        correct: '항상 많아요.',
      },
    ],
    {
      uz: 'Restoran kichik, lekin mijozlari doim ko‘p.',
      en: 'The restaurant is small, but it always has many customers.',
      ru: 'Ресторан маленький, но посетителей всегда много.',
    },
  ),

  ...build(
    'gp_s4_u1_g4_14',
    G4,
    [
      {
        options: ['저는', '제가', '저를'],
        correct: '저는',
      },
      {
        options: ['매운 음식을', '매운 음식이', '매운 음식은'],
        correct: '매운 음식을',
      },
      {
        options: ['못 먹는데', '잘 먹는데', '만드는데'],
        correct: '못 먹는데',
      },
      {
        options: ['다른 메뉴도', '다른 사람도', '다른 식당도'],
        correct: '다른 메뉴도',
      },
      {
        options: ['있어요?', '먹어요?', '가요?'],
        correct: '있어요?',
      },
    ],
    {
      uz: 'Men achchiq ovqat yeya olmayman. Boshqa taom bormi?',
      en: "I can't eat spicy food. Is there another menu option?",
      ru: 'Я не могу есть острое. Есть другое блюдо?',
    },
  ),

  ...build(
    'gp_s4_u1_g4_15',
    G4,
    [
      {
        options: ['친구가', '친구를', '친구는'],
        correct: '친구가',
      },
      {
        options: ['기다리는데', '먹는데', '주문하는데'],
        correct: '기다리는데',
      },
      {
        options: ['주문을', '주문이', '주문은'],
        correct: '주문을',
      },
      {
        options: ['빨리 할까요?', '빨리 먹을까요?', '빨리 갈까요?'],
        correct: '빨리 할까요?',
      },
    ],
    {
      uz: 'Do‘stim kutyapti. Tezroq buyurtma beramizmi?',
      en: 'My friend is waiting. Shall we order quickly?',
      ru: 'Друг ждёт. Может, закажем быстрее?',
    },
  ),

  ...build(
    'gp_s4_u1_g4_16',
    G4,
    [
      {
        options: ['지금', '어제', '내일'],
        correct: '지금',
      },
      {
        options: ['점심을', '점심이', '점심은'],
        correct: '점심을',
      },
      {
        options: ['먹는데', '마시는데', '만드는데'],
        correct: '먹는데',
      },
      {
        options: ['같이 먹을래요?', '같이 갈래요?', '같이 볼래요?'],
        correct: '같이 먹을래요?',
      },
    ],
    {
      uz: 'Hozir tushlik qilyapman. Birga yeysizmi?',
      en: "I'm having lunch now. Would you like to join me?",
      ru: 'Я сейчас обедаю. Хотите вместе?',
    },
  ),

  ...build(
    'gp_s4_u1_g4_17',
    G4,
    [
      {
        options: ['이건', '이걸', '이게'],
        correct: '이건',
      },
      {
        options: ['비빔밥인데', '불고기인데', '냉면인데'],
        correct: '비빔밥인데',
      },
      {
        options: ['많이', '아주', '정말'],
        correct: '많이',
      },
      {
        options: ['맵지 않아요.', '달지 않아요.', '짜지 않아요.'],
        correct: '맵지 않아요.',
      },
    ],
    {
      uz: 'Bu bibimbap, lekin juda achchiq emas.',
      en: "This is bibimbap, but it isn't very spicy.",
      ru: 'Это пибимпап, но он не очень острый.',
    },
  ),

  ...build(
    'gp_s4_u1_g4_18',
    G4,
    [
      {
        options: ['오늘', '어제', '지난주'],
        correct: '오늘',
      },
      {
        options: ['특별 메뉴인데', '점심 메뉴인데', '기본 메뉴인데'],
        correct: '특별 메뉴인데',
      },
      {
        options: ['한번', '아직', '벌써'],
        correct: '한번',
      },
      {
        options: ['드셔 보세요.', '기다려 보세요.', '걸어 보세요.'],
        correct: '드셔 보세요.',
      },
    ],
    {
      uz: 'Bu bugungi maxsus taom. Tatib ko‘ring.',
      en: "It's today's special menu. Please try it.",
      ru: 'Это сегодняшнее специальное блюдо. Попробуйте.',
    },
  ),

  ...build(
    'gp_s4_u1_g4_19',
    G4,
    [
      {
        options: ['저는', '제가', '저를'],
        correct: '저는',
      },
      {
        options: ['채식주의자인데', '학생인데', '요리사인데'],
        correct: '채식주의자인데',
      },
      {
        options: ['고기 없는', '매운', '비싼'],
        correct: '고기 없는',
      },
      {
        options: ['음식이 있어요?', '음식을 먹어요?', '음식이 비싸요?'],
        correct: '음식이 있어요?',
      },
    ],
    {
      uz: 'Men vegetarianman. Go‘shtsiz ovqat bormi?',
      en: "I'm a vegetarian. Is there food without meat?",
      ru: 'Я вегетарианец. Есть еда без мяса?',
    },
  ),

  ...build(
    'gp_s4_u1_g4_20',
    G4,
    [
      {
        options: ['이 국은', '이 국이', '이 국을'],
        correct: '이 국은',
      },
      {
        options: ['뜨거운데', '차가운데', '단데'],
        correct: '뜨거운데',
      },
      {
        options: ['조금', '벌써', '아직'],
        correct: '조금',
      },
      {
        options: ['식혀서', '데워서', '잘라서'],
        correct: '식혀서',
      },
      {
        options: ['드세요.', '입으세요.', '가세요.'],
        correct: '드세요.',
      },
    ],
    {
      uz: 'Bu sho‘rva issiq. Biroz sovitib iching.',
      en: 'This soup is hot, so let it cool a little before eating.',
      ru: 'Суп горячий. Немного остудите его.',
    },
  ),
};

// ═══════════════════════════════════════════════════════════
// UNIT 2 · 11과
// 운동을 좀 해 보는 게 어때요?
// ═══════════════════════════════════════════════════════════

// ─────────────────────────────────────────────
// 문법 1. 'ㅅ' 불규칙
// ─────────────────────────────────────────────
const U2_G1 = 's-irregular';

const U2_G1_Q = {
  // grammar_blank 10
  ...blank('gp_s4_u2_g1_01', U2_G1, '감기가 아직 안 나아요.', '나아요', {
    uz: 'Shamollashim hali ham tuzalmadi.',
    en: 'My cold still is not getting better.',
    ru: 'Моя простуда всё ещё не проходит.',
  }),

  ...blank(
    'gp_s4_u2_g1_02',
    U2_G1,
    '이 약을 먹으면 빨리 나을 거예요.',
    '나을 거예요',
    {
      uz: 'Bu dorini ichsangiz tez tuzalasiz.',
      en: 'You will get better quickly if you take this medicine.',
      ru: 'Если примете это лекарство, быстро поправитесь.',
    },
  ),

  ...blank(
    'gp_s4_u2_g1_03',
    U2_G1,
    '우리 가족은 시골에 집을 지어요.',
    '지어요',
    {
      uz: 'Oilamiz qishloqda uy quryapti.',
      en: 'My family is building a house in the countryside.',
      ru: 'Моя семья строит дом в деревне.',
    },
  ),

  ...blank(
    'gp_s4_u2_g1_04',
    U2_G1,
    '국이 뜨거우니까 그릇에 조금 부어요.',
    '부어요',
    {
      uz: 'Sho‘rva issiq, shuning uchun kosaga ozgina quyaman.',
      en: 'The soup is hot, so I pour a little into a bowl.',
      ru: 'Суп горячий, поэтому я наливаю немного в миску.',
    },
  ),

  ...blank('gp_s4_u2_g1_05', U2_G1, '다리가 부어서 병원에 갔어요.', '부어서', {
    uz: 'Oyog‘im shishgani uchun kasalxonaga bordim.',
    en: 'My leg was swollen, so I went to the hospital.',
    ru: 'У меня опухла нога, поэтому я пошёл в больницу.',
  }),

  ...blank(
    'gp_s4_u2_g1_06',
    U2_G1,
    '두 마을을 잇는 다리가 새로 생겼어요.',
    '잇는',
    {
      uz: 'Ikki qishloqni bog‘laydigan yangi ko‘prik paydo bo‘ldi.',
      en: 'A new bridge connecting the two villages was built.',
      ru: 'Появился новый мост, соединяющий две деревни.',
    },
  ),

  ...blank(
    'gp_s4_u2_g1_07',
    U2_G1,
    '아침마다 얼굴을 깨끗이 씻어요.',
    '씻어요',
    {
      uz: 'Har tong yuzimni yaxshilab yuvaman.',
      en: 'I wash my face thoroughly every morning.',
      ru: 'Каждое утро я хорошо умываюсь.',
    },
  ),

  ...blank(
    'gp_s4_u2_g1_08',
    U2_G1,
    '친구 이야기를 듣고 많이 웃었어요.',
    '웃었어요',
    {
      uz: 'Do‘stimning gapini eshitib ko‘p kuldim.',
      en: "I laughed a lot after hearing my friend's story.",
      ru: 'Я много смеялся, услышав рассказ друга.',
    },
  ),

  ...blank(
    'gp_s4_u2_g1_09',
    U2_G1,
    '병원에 들어가기 전에 신발을 벗어요.',
    '벗어요',
    {
      uz: 'Kasalxonaga kirishdan oldin oyoq kiyimimni yechaman.',
      en: 'I take off my shoes before going inside.',
      ru: 'Перед входом я снимаю обувь.',
    },
  ),

  ...blank(
    'gp_s4_u2_g1_10',
    U2_G1,
    '상처가 다 나으면 다시 운동할 거예요.',
    '나으면',
    {
      uz: 'Yaram tuzalsa, yana mashq qilaman.',
      en: 'I will exercise again when the injury heals.',
      ru: 'Когда рана заживёт, я снова буду заниматься спортом.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s4_u2_g1_11',
    U2_G1,
    [
      {
        options: ['감기가', '감기를', '감기는'],
        correct: '감기가',
      },
      {
        options: ['아직', '벌써', '항상'],
        correct: '아직',
      },
      {
        options: ['안 나아요.', '안 낫아요.', '안 나서요.'],
        correct: '안 나아요.',
      },
    ],
    {
      uz: 'Shamollashim hali tuzalmadi.',
      en: 'My cold still has not gotten better.',
      ru: 'Моя простуда всё ещё не прошла.',
    },
  ),

  ...build(
    'gp_s4_u2_g1_12',
    U2_G1,
    [
      {
        options: ['이 약을', '이 약이', '이 약은'],
        correct: '이 약을',
      },
      {
        options: ['먹으면', '먹어서', '먹는데'],
        correct: '먹으면',
      },
      {
        options: ['빨리', '가끔', '천천히'],
        correct: '빨리',
      },
      {
        options: ['나을 거예요.', '낫을 거예요.', '나아을 거예요.'],
        correct: '나을 거예요.',
      },
    ],
    {
      uz: 'Bu dorini ichsangiz tez tuzalasiz.',
      en: 'You will get better quickly if you take this medicine.',
      ru: 'Если принять это лекарство, вы быстро поправитесь.',
    },
  ),

  ...build(
    'gp_s4_u2_g1_13',
    U2_G1,
    [
      {
        options: ['우리 가족은', '우리 가족이', '우리 가족을'],
        correct: '우리 가족은',
      },
      {
        options: ['시골에', '시골을', '시골이'],
        correct: '시골에',
      },
      {
        options: ['새집을', '새집이', '새집은'],
        correct: '새집을',
      },
      {
        options: ['지어요.', '짓어요.', '지아어요.'],
        correct: '지어요.',
      },
    ],
    {
      uz: 'Oilamiz qishloqda yangi uy quryapti.',
      en: 'My family is building a new house in the countryside.',
      ru: 'Моя семья строит новый дом в деревне.',
    },
  ),

  ...build(
    'gp_s4_u2_g1_14',
    U2_G1,
    [
      {
        options: ['국을', '국이', '국은'],
        correct: '국을',
      },
      {
        options: ['그릇에', '그릇을', '그릇이'],
        correct: '그릇에',
      },
      {
        options: ['조금', '자주', '벌써'],
        correct: '조금',
      },
      {
        options: ['부어요.', '붓어요.', '부아어요.'],
        correct: '부어요.',
      },
    ],
    {
      uz: 'Sho‘rvani kosaga ozgina quyaman.',
      en: 'I pour a little soup into the bowl.',
      ru: 'Я наливаю немного супа в миску.',
    },
  ),

  ...build(
    'gp_s4_u2_g1_15',
    U2_G1,
    [
      {
        options: ['다리가', '다리를', '다리는'],
        correct: '다리가',
      },
      {
        options: ['많이', '항상', '벌써'],
        correct: '많이',
      },
      {
        options: ['부어서', '붓어서', '부아어서'],
        correct: '부어서',
      },
      {
        options: ['병원에 갔어요.', '운동을 했어요.', '약을 버렸어요.'],
        correct: '병원에 갔어요.',
      },
    ],
    {
      uz: 'Oyog‘im qattiq shishgani uchun kasalxonaga bordim.',
      en: 'My leg was very swollen, so I went to the hospital.',
      ru: 'Нога сильно опухла, поэтому я пошёл в больницу.',
    },
  ),

  ...build(
    'gp_s4_u2_g1_16',
    U2_G1,
    [
      {
        options: ['두 마을을', '두 마을이', '두 마을은'],
        correct: '두 마을을',
      },
      {
        options: ['잇는', '이는', '이어는'],
        correct: '잇는',
      },
      {
        options: ['다리가', '다리를', '다리는'],
        correct: '다리가',
      },
      {
        options: ['생겼어요.', '아팠어요.', '먹었어요.'],
        correct: '생겼어요.',
      },
    ],
    {
      uz: 'Ikki qishloqni bog‘laydigan ko‘prik paydo bo‘ldi.',
      en: 'A bridge connecting the two villages was built.',
      ru: 'Появился мост, соединяющий две деревни.',
    },
  ),

  ...build(
    'gp_s4_u2_g1_17',
    U2_G1,
    [
      {
        options: ['아침마다', '병원마다', '약마다'],
        correct: '아침마다',
      },
      {
        options: ['얼굴을', '얼굴이', '얼굴은'],
        correct: '얼굴을',
      },
      {
        options: ['깨끗이', '조용히', '천천히'],
        correct: '깨끗이',
      },
      {
        options: ['씻어요.', '시어요.', '씻아어요.'],
        correct: '씻어요.',
      },
    ],
    {
      uz: 'Har tong yuzimni yaxshilab yuvaman.',
      en: 'I wash my face thoroughly every morning.',
      ru: 'Каждое утро я тщательно умываюсь.',
    },
  ),

  ...build(
    'gp_s4_u2_g1_18',
    U2_G1,
    [
      {
        options: ['친구 이야기를', '친구 이야기가', '친구 이야기는'],
        correct: '친구 이야기를',
      },
      {
        options: ['듣고', '먹고', '씻고'],
        correct: '듣고',
      },
      {
        options: ['많이', '아직', '먼저'],
        correct: '많이',
      },
      {
        options: ['웃었어요.', '우었어요.', '웃아었어요.'],
        correct: '웃었어요.',
      },
    ],
    {
      uz: 'Do‘stimning gapini eshitib ko‘p kuldim.',
      en: "I laughed a lot after hearing my friend's story.",
      ru: 'Я много смеялся после рассказа друга.',
    },
  ),

  ...build(
    'gp_s4_u2_g1_19',
    U2_G1,
    [
      {
        options: ['병원에', '병원을', '병원이'],
        correct: '병원에',
      },
      {
        options: ['들어가기 전에', '나가기 전에', '먹기 전에'],
        correct: '들어가기 전에',
      },
      {
        options: ['신발을', '신발이', '신발은'],
        correct: '신발을',
      },
      {
        options: ['벗어요.', '버어요.', '벗아어요.'],
        correct: '벗어요.',
      },
    ],
    {
      uz: 'Kirishdan oldin oyoq kiyimimni yechaman.',
      en: 'I take off my shoes before entering.',
      ru: 'Перед входом я снимаю обувь.',
    },
  ),

  ...build(
    'gp_s4_u2_g1_20',
    U2_G1,
    [
      {
        options: ['상처가', '상처를', '상처는'],
        correct: '상처가',
      },
      {
        options: ['다', '또', '잘'],
        correct: '다',
      },
      {
        options: ['나으면', '낫으면', '나아으면'],
        correct: '나으면',
      },
      {
        options: [
          '다시 운동할 거예요.',
          '다시 아플 거예요.',
          '다시 약을 버릴 거예요.',
        ],
        correct: '다시 운동할 거예요.',
      },
    ],
    {
      uz: 'Yaram tuzalsa yana mashq qilaman.',
      en: 'When the injury heals, I will exercise again.',
      ru: 'Когда рана заживёт, я снова буду заниматься спортом.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 2. N마다
// ─────────────────────────────────────────────
const U2_G2 = 'noun-mada';

const U2_G2_Q = {
  // grammar_blank 10
  ...blank('gp_s4_u2_g2_01', U2_G2, '아침마다 약을 먹어요.', '아침마다', {
    uz: 'Har tong dori ichaman.',
    en: 'I take medicine every morning.',
    ru: 'Каждое утро я принимаю лекарство.',
  }),

  ...blank('gp_s4_u2_g2_02', U2_G2, '주말마다 공원에서 운동해요.', '주말마다', {
    uz: 'Har dam olish kuni parkda mashq qilaman.',
    en: 'I exercise in the park every weekend.',
    ru: 'Каждые выходные я занимаюсь спортом в парке.',
  }),

  ...blank(
    'gp_s4_u2_g2_03',
    U2_G2,
    '병원마다 진료 시간이 달라요.',
    '병원마다',
    {
      uz: 'Har bir kasalxonaning qabul vaqti boshqacha.',
      en: 'Consultation hours differ from hospital to hospital.',
      ru: 'В каждой больнице своё время приёма.',
    },
  ),

  ...blank(
    'gp_s4_u2_g2_04',
    U2_G2,
    '사람마다 건강 관리 방법이 달라요.',
    '사람마다',
    {
      uz: 'Har bir odamning sog‘liqni saqlash usuli boshqacha.',
      en: 'Everyone manages their health differently.',
      ru: 'У каждого человека свой способ заботиться о здоровье.',
    },
  ),

  ...blank('gp_s4_u2_g2_05', U2_G2, '식사 후마다 이를 닦아요.', '식사 후마다', {
    uz: 'Har ovqatdan keyin tishimni yuvaman.',
    en: 'I brush my teeth after every meal.',
    ru: 'После каждого приёма пищи я чищу зубы.',
  }),

  ...blank(
    'gp_s4_u2_g2_06',
    U2_G2,
    '수업마다 새로운 표현을 배워요.',
    '수업마다',
    {
      uz: 'Har darsda yangi ibora o‘rganamiz.',
      en: 'We learn a new expression in every class.',
      ru: 'На каждом уроке мы изучаем новое выражение.',
    },
  ),

  ...blank(
    'gp_s4_u2_g2_07',
    U2_G2,
    '계절마다 자주 걸리는 병이 달라요.',
    '계절마다',
    {
      uz: 'Har faslda ko‘p uchraydigan kasalliklar boshqacha.',
      en: 'Common illnesses differ by season.',
      ru: 'В каждом сезоне распространены разные болезни.',
    },
  ),

  ...blank(
    'gp_s4_u2_g2_08',
    U2_G2,
    '두 시간마다 물을 한 잔 마셔요.',
    '두 시간마다',
    {
      uz: 'Har ikki soatda bir stakan suv ichaman.',
      en: 'I drink a glass of water every two hours.',
      ru: 'Каждые два часа я выпиваю стакан воды.',
    },
  ),

  ...blank(
    'gp_s4_u2_g2_09',
    U2_G2,
    '약마다 먹는 방법을 확인해야 해요.',
    '약마다',
    {
      uz: 'Har bir dorining qabul qilish usulini tekshirish kerak.',
      en: 'You need to check the directions for each medicine.',
      ru: 'Для каждого лекарства нужно проверять способ приёма.',
    },
  ),

  ...blank(
    'gp_s4_u2_g2_10',
    U2_G2,
    '나라마다 병원 이용 방법이 조금씩 달라요.',
    '나라마다',
    {
      uz: 'Har bir mamlakatda kasalxonadan foydalanish tartibi biroz farq qiladi.',
      en: 'The way hospitals are used differs somewhat from country to country.',
      ru: 'Порядок обращения в больницу немного отличается в каждой стране.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s4_u2_g2_11',
    U2_G2,
    [
      {
        options: ['아침마다', '아침부터', '아침까지'],
        correct: '아침마다',
      },
      {
        options: ['약을', '약이', '약은'],
        correct: '약을',
      },
      {
        options: ['먹어요.', '발라요.', '버려요.'],
        correct: '먹어요.',
      },
    ],
    {
      uz: 'Har tong dori ichaman.',
      en: 'I take medicine every morning.',
      ru: 'Каждое утро я принимаю лекарство.',
    },
  ),

  ...build(
    'gp_s4_u2_g2_12',
    U2_G2,
    [
      {
        options: ['주말마다', '주말부터', '주말까지'],
        correct: '주말마다',
      },
      {
        options: ['공원에서', '공원에', '공원을'],
        correct: '공원에서',
      },
      {
        options: ['운동해요.', '진료해요.', '약속해요.'],
        correct: '운동해요.',
      },
    ],
    {
      uz: 'Har dam olish kuni parkda mashq qilaman.',
      en: 'I exercise in the park every weekend.',
      ru: 'Каждые выходные я занимаюсь спортом в парке.',
    },
  ),

  ...build(
    'gp_s4_u2_g2_13',
    U2_G2,
    [
      {
        options: ['병원마다', '병원에서', '병원까지'],
        correct: '병원마다',
      },
      {
        options: ['진료 시간이', '진료 시간을', '진료 시간은'],
        correct: '진료 시간이',
      },
      {
        options: ['달라요.', '아파요.', '먹어요.'],
        correct: '달라요.',
      },
    ],
    {
      uz: 'Har bir kasalxonaning qabul vaqti boshqacha.',
      en: 'Consultation hours differ from hospital to hospital.',
      ru: 'В каждой больнице время приёма отличается.',
    },
  ),

  ...build(
    'gp_s4_u2_g2_14',
    U2_G2,
    [
      {
        options: ['사람마다', '사람에게', '사람부터'],
        correct: '사람마다',
      },
      {
        options: ['운동 방법이', '운동 방법을', '운동 방법은'],
        correct: '운동 방법이',
      },
      {
        options: ['달라요.', '작아요.', '아파요.'],
        correct: '달라요.',
      },
    ],
    {
      uz: 'Har bir odamning mashq qilish usuli boshqacha.',
      en: 'Everyone has a different way of exercising.',
      ru: 'У каждого человека свой способ тренироваться.',
    },
  ),

  ...build(
    'gp_s4_u2_g2_15',
    U2_G2,
    [
      {
        options: ['식사 후마다', '식사 후부터', '식사 후까지'],
        correct: '식사 후마다',
      },
      {
        options: ['이를', '이가', '이는'],
        correct: '이를',
      },
      {
        options: ['닦아요.', '먹어요.', '자요.'],
        correct: '닦아요.',
      },
    ],
    {
      uz: 'Har ovqatdan keyin tishimni yuvaman.',
      en: 'I brush my teeth after every meal.',
      ru: 'После каждого приёма пищи я чищу зубы.',
    },
  ),

  ...build(
    'gp_s4_u2_g2_16',
    U2_G2,
    [
      {
        options: ['수업마다', '수업부터', '수업밖에'],
        correct: '수업마다',
      },
      {
        options: ['새로운 표현을', '새로운 표현이', '새로운 표현은'],
        correct: '새로운 표현을',
      },
      {
        options: ['배워요.', '아파요.', '씻어요.'],
        correct: '배워요.',
      },
    ],
    {
      uz: 'Har darsda yangi ibora o‘rganamiz.',
      en: 'We learn a new expression in every class.',
      ru: 'На каждом уроке мы учим новое выражение.',
    },
  ),

  ...build(
    'gp_s4_u2_g2_17',
    U2_G2,
    [
      {
        options: ['계절마다', '계절부터', '계절까지'],
        correct: '계절마다',
      },
      {
        options: ['자주 걸리는 병이', '자주 걸리는 병을', '자주 걸리는 병은'],
        correct: '자주 걸리는 병이',
      },
      {
        options: ['달라요.', '커요.', '멀어요.'],
        correct: '달라요.',
      },
    ],
    {
      uz: 'Har faslda ko‘p uchraydigan kasalliklar farq qiladi.',
      en: 'Common illnesses differ from season to season.',
      ru: 'В разные сезоны распространены разные болезни.',
    },
  ),

  ...build(
    'gp_s4_u2_g2_18',
    U2_G2,
    [
      {
        options: ['두 시간마다', '두 시간부터', '두 시간까지'],
        correct: '두 시간마다',
      },
      {
        options: ['물을', '물이', '물은'],
        correct: '물을',
      },
      {
        options: ['한 잔', '한 명', '한 권'],
        correct: '한 잔',
      },
      {
        options: ['마셔요.', '먹어요.', '발라요.'],
        correct: '마셔요.',
      },
    ],
    {
      uz: 'Har ikki soatda bir stakan suv ichaman.',
      en: 'I drink a glass of water every two hours.',
      ru: 'Каждые два часа я пью стакан воды.',
    },
  ),

  ...build(
    'gp_s4_u2_g2_19',
    U2_G2,
    [
      {
        options: ['약마다', '약에게', '약부터'],
        correct: '약마다',
      },
      {
        options: ['먹는 방법을', '먹는 방법이', '먹는 방법은'],
        correct: '먹는 방법을',
      },
      {
        options: ['확인해야 해요.', '운동해야 해요.', '예약해야 해요.'],
        correct: '확인해야 해요.',
      },
    ],
    {
      uz: 'Har bir dorining ichish usulini tekshirish kerak.',
      en: 'You need to check how to take each medicine.',
      ru: 'Нужно проверять способ приёма каждого лекарства.',
    },
  ),

  ...build(
    'gp_s4_u2_g2_20',
    U2_G2,
    [
      {
        options: ['나라마다', '나라에게', '나라부터'],
        correct: '나라마다',
      },
      {
        options: ['병원 이용 방법이', '병원 이용 방법을', '병원 이용 방법은'],
        correct: '병원 이용 방법이',
      },
      {
        options: ['조금씩 달라요.', '조금씩 아파요.', '조금씩 먹어요.'],
        correct: '조금씩 달라요.',
      },
    ],
    {
      uz: 'Har mamlakatda kasalxonadan foydalanish tartibi biroz boshqacha.',
      en: 'Hospital procedures differ somewhat from country to country.',
      ru: 'Порядок обращения в больницу немного отличается в каждой стране.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 3. V-는 게 어때요?
// ─────────────────────────────────────────────
const U2_G3 = 'verb-neun-ge-eottaeyo';

const U2_G3_Q = {
  // grammar_blank 10
  ...blank(
    'gp_s4_u2_g3_01',
    U2_G3,
    '요즘 너무 피곤하면 일찍 자는 게 어때요?',
    '자는 게 어때요?',
    {
      uz: 'So‘nggi paytda juda charchasangiz, ertaroq uxlashga nima deysiz?',
      en: 'If you are very tired these days, how about going to bed earlier?',
      ru: 'Если вы в последнее время очень устаёте, как насчёт ложиться спать пораньше?',
    },
  ),

  ...blank(
    'gp_s4_u2_g3_02',
    U2_G3,
    '허리가 아프면 운동을 조금 쉬는 게 어때요?',
    '쉬는 게 어때요?',
    {
      uz: 'Belingiz og‘risa, mashqni biroz to‘xtatib turishga nima deysiz?',
      en: 'If your back hurts, how about taking a short break from exercise?',
      ru: 'Если болит спина, как насчёт немного отдохнуть от тренировок?',
    },
  ),

  ...blank(
    'gp_s4_u2_g3_03',
    U2_G3,
    '감기가 심하면 병원에 가는 게 어때요?',
    '가는 게 어때요?',
    {
      uz: 'Shamollash kuchli bo‘lsa, kasalxonaga borsangiz-chi?',
      en: 'If your cold is bad, how about going to the hospital?',
      ru: 'Если простуда сильная, как насчёт сходить в больницу?',
    },
  ),

  ...blank(
    'gp_s4_u2_g3_04',
    U2_G3,
    '잠을 잘 못 자면 커피를 줄이는 게 어때요?',
    '줄이는 게 어때요?',
    {
      uz: 'Yaxshi uxlay olmasangiz, qahvani kamaytirishga nima deysiz?',
      en: 'If you cannot sleep well, how about cutting down on coffee?',
      ru: 'Если плохо спите, как насчёт пить меньше кофе?',
    },
  ),

  ...blank(
    'gp_s4_u2_g3_05',
    U2_G3,
    '목이 아프면 따뜻한 물을 마시는 게 어때요?',
    '마시는 게 어때요?',
    {
      uz: 'Tomog‘ingiz og‘risa, iliq suv ichishga nima deysiz?',
      en: 'If your throat hurts, how about drinking warm water?',
      ru: 'Если болит горло, как насчёт пить тёплую воду?',
    },
  ),

  ...blank(
    'gp_s4_u2_g3_06',
    U2_G3,
    '운동이 힘들면 가볍게 걷는 게 어때요?',
    '걷는 게 어때요?',
    {
      uz: 'Mashq qiyin bo‘lsa, yengil yurishga nima deysiz?',
      en: 'If exercising is difficult, how about taking a light walk?',
      ru: 'Если тренировки тяжёлые, как насчёт лёгкой прогулки?',
    },
  ),

  ...blank(
    'gp_s4_u2_g3_07',
    U2_G3,
    '약을 먹어도 안 나으면 다시 진료를 받는 게 어때요?',
    '받는 게 어때요?',
    {
      uz: 'Dori ichsangiz ham tuzalmasangiz, yana ko‘rikdan o‘tishga nima deysiz?',
      en: 'If you do not improve after taking medicine, how about seeing the doctor again?',
      ru: 'Если лекарство не помогает, как насчёт снова обратиться к врачу?',
    },
  ),

  ...blank(
    'gp_s4_u2_g3_08',
    U2_G3,
    '스트레스를 많이 받으면 잠깐 쉬는 게 어때요?',
    '쉬는 게 어때요?',
    {
      uz: 'Stress ko‘p bo‘lsa, biroz dam olishga nima deysiz?',
      en: 'If you are under a lot of stress, how about taking a short break?',
      ru: 'Если у вас много стресса, как насчёт немного отдохнуть?',
    },
  ),

  ...blank(
    'gp_s4_u2_g3_09',
    U2_G3,
    '건강을 위해 매일 조금씩 운동하는 게 어때요?',
    '운동하는 게 어때요?',
    {
      uz: 'Sog‘liq uchun har kuni ozgina mashq qilishga nima deysiz?',
      en: 'How about exercising a little every day for your health?',
      ru: 'Как насчёт немного заниматься спортом каждый день ради здоровья?',
    },
  ),

  ...blank(
    'gp_s4_u2_g3_10',
    U2_G3,
    '소화가 안 되면 기름진 음식을 피하는 게 어때요?',
    '피하는 게 어때요?',
    {
      uz: 'Ovqat hazm bo‘lmasa, yog‘li taomlardan saqlanishga nima deysiz?',
      en: 'If you have indigestion, how about avoiding greasy food?',
      ru: 'Если пища плохо переваривается, как насчёт избегать жирной еды?',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s4_u2_g3_11',
    U2_G3,
    [
      {
        options: ['요즘', '어제', '내년에'],
        correct: '요즘',
      },
      {
        options: ['너무 피곤하면', '너무 배고프면', '너무 바쁘지만'],
        correct: '너무 피곤하면',
      },
      {
        options: ['일찍', '늦게', '가끔'],
        correct: '일찍',
      },
      {
        options: ['자는 게 어때요?', '자은 게 어때요?', '자게 어때요?'],
        correct: '자는 게 어때요?',
      },
    ],
    {
      uz: 'Juda charchasangiz, ertaroq uxlashga nima deysiz?',
      en: 'If you are very tired, how about going to bed early?',
      ru: 'Если сильно устали, как насчёт лечь спать пораньше?',
    },
  ),

  ...build(
    'gp_s4_u2_g3_12',
    U2_G3,
    [
      {
        options: ['허리가 아프면', '허리가 좋아지면', '허리가 길면'],
        correct: '허리가 아프면',
      },
      {
        options: ['운동을', '약을', '병원을'],
        correct: '운동을',
      },
      {
        options: ['조금', '매일', '벌써'],
        correct: '조금',
      },
      {
        options: ['쉬는 게 어때요?', '쉰는 게 어때요?', '쉬게 어때요?'],
        correct: '쉬는 게 어때요?',
      },
    ],
    {
      uz: 'Belingiz og‘risa, mashqni biroz to‘xtatsangiz-chi?',
      en: 'If your back hurts, how about resting from exercise for a while?',
      ru: 'Если болит спина, как насчёт немного отдохнуть от тренировок?',
    },
  ),

  ...build(
    'gp_s4_u2_g3_13',
    U2_G3,
    [
      {
        options: ['감기가 심하면', '감기가 없으면', '감기가 좋으면'],
        correct: '감기가 심하면',
      },
      {
        options: ['병원에', '병원을', '병원이'],
        correct: '병원에',
      },
      {
        options: ['가는 게 어때요?', '간는 게 어때요?', '가게 어때요?'],
        correct: '가는 게 어때요?',
      },
    ],
    {
      uz: 'Shamollash kuchli bo‘lsa, kasalxonaga borsangiz-chi?',
      en: 'If your cold is severe, how about going to the hospital?',
      ru: 'Если простуда сильная, как насчёт сходить в больницу?',
    },
  ),

  ...build(
    'gp_s4_u2_g3_14',
    U2_G3,
    [
      {
        options: ['잠을 잘 못 자면', '잠을 많이 자면', '잠이 길면'],
        correct: '잠을 잘 못 자면',
      },
      {
        options: ['커피를', '운동을', '약을'],
        correct: '커피를',
      },
      {
        options: ['줄이는 게 어때요?', '줄인는 게 어때요?', '줄이게 어때요?'],
        correct: '줄이는 게 어때요?',
      },
    ],
    {
      uz: 'Yaxshi uxlay olmasangiz, qahvani kamaytirsangiz-chi?',
      en: 'If you cannot sleep well, how about reducing coffee?',
      ru: 'Если плохо спите, как насчёт сократить кофе?',
    },
  ),

  ...build(
    'gp_s4_u2_g3_15',
    U2_G3,
    [
      {
        options: ['목이 아프면', '목이 길면', '목이 좋으면'],
        correct: '목이 아프면',
      },
      {
        options: ['따뜻한 물을', '차가운 밥을', '매운 약을'],
        correct: '따뜻한 물을',
      },
      {
        options: ['마시는 게 어때요?', '마신는 게 어때요?', '마시게 어때요?'],
        correct: '마시는 게 어때요?',
      },
    ],
    {
      uz: 'Tomog‘ingiz og‘risa iliq suv ichishga nima deysiz?',
      en: 'If your throat hurts, how about drinking warm water?',
      ru: 'Если болит горло, как насчёт пить тёплую воду?',
    },
  ),

  ...build(
    'gp_s4_u2_g3_16',
    U2_G3,
    [
      {
        options: ['운동이 힘들면', '운동이 재미있으면', '운동이 끝나면'],
        correct: '운동이 힘들면',
      },
      {
        options: ['가볍게', '시끄럽게', '맵게'],
        correct: '가볍게',
      },
      {
        options: ['걷는 게 어때요?', '걸는 게 어때요?', '걷게 어때요?'],
        correct: '걷는 게 어때요?',
      },
    ],
    {
      uz: 'Mashq qiyin bo‘lsa, yengil yursangiz-chi?',
      en: 'If exercise is difficult, how about walking lightly?',
      ru: 'Если тренироваться тяжело, как насчёт лёгкой ходьбы?',
    },
  ),

  ...build(
    'gp_s4_u2_g3_17',
    U2_G3,
    [
      {
        options: ['약을 먹어도', '약을 사도', '약을 버려도'],
        correct: '약을 먹어도',
      },
      {
        options: ['안 나으면', '안 아프면', '안 쉬면'],
        correct: '안 나으면',
      },
      {
        options: ['다시 진료를', '다시 운동을', '다시 약속을'],
        correct: '다시 진료를',
      },
      {
        options: ['받는 게 어때요?', '받은는 게 어때요?', '받게 어때요?'],
        correct: '받는 게 어때요?',
      },
    ],
    {
      uz: 'Dori yordam bermasa, yana shifokorga ko‘rinsangiz-chi?',
      en: 'If the medicine does not help, how about seeing the doctor again?',
      ru: 'Если лекарство не помогает, как насчёт снова обратиться к врачу?',
    },
  ),

  ...build(
    'gp_s4_u2_g3_18',
    U2_G3,
    [
      {
        options: ['스트레스를', '운동을', '약을'],
        correct: '스트레스를',
      },
      {
        options: ['많이 받으면', '많이 먹으면', '많이 마시면'],
        correct: '많이 받으면',
      },
      {
        options: ['잠깐', '매일', '벌써'],
        correct: '잠깐',
      },
      {
        options: ['쉬는 게 어때요?', '쉰는 게 어때요?', '쉬게 어때요?'],
        correct: '쉬는 게 어때요?',
      },
    ],
    {
      uz: 'Stress ko‘p bo‘lsa, biroz dam olsangiz-chi?',
      en: 'If you are stressed, how about taking a short break?',
      ru: 'Если много стресса, как насчёт немного отдохнуть?',
    },
  ),

  ...build(
    'gp_s4_u2_g3_19',
    U2_G3,
    [
      {
        options: ['건강을 위해', '시험을 위해', '여행을 위해'],
        correct: '건강을 위해',
      },
      {
        options: ['매일', '어제', '지난달'],
        correct: '매일',
      },
      {
        options: ['조금씩', '갑자기', '벌써'],
        correct: '조금씩',
      },
      {
        options: [
          '운동하는 게 어때요?',
          '운동한는 게 어때요?',
          '운동하게 어때요?',
        ],
        correct: '운동하는 게 어때요?',
      },
    ],
    {
      uz: 'Sog‘liq uchun har kuni ozgina mashq qilsangiz-chi?',
      en: 'How about exercising a little every day for your health?',
      ru: 'Как насчёт понемногу заниматься каждый день ради здоровья?',
    },
  ),

  ...build(
    'gp_s4_u2_g3_20',
    U2_G3,
    [
      {
        options: ['소화가 안 되면', '배가 고프면', '기분이 좋으면'],
        correct: '소화가 안 되면',
      },
      {
        options: ['기름진 음식을', '따뜻한 물을', '가벼운 운동을'],
        correct: '기름진 음식을',
      },
      {
        options: ['피하는 게 어때요?', '피한는 게 어때요?', '피하게 어때요?'],
        correct: '피하는 게 어때요?',
      },
    ],
    {
      uz: 'Hazm bo‘lmasa, yog‘li ovqatdan saqlansangiz-chi?',
      en: 'If you have indigestion, how about avoiding greasy food?',
      ru: 'Если пища плохо переваривается, как насчёт избегать жирной еды?',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 4. V-기로 하다
// ─────────────────────────────────────────────
const U2_G4 = 'verb-giro-hada';

const U2_G4_Q = {
  // grammar_blank 10
  ...blank(
    'gp_s4_u2_g4_01',
    U2_G4,
    '건강을 위해 매일 운동하기로 했어요.',
    '운동하기로 했어요',
    {
      uz: 'Sog‘liq uchun har kuni mashq qilishga qaror qildim.',
      en: 'I decided to exercise every day for my health.',
      ru: 'Я решил каждый день заниматься спортом ради здоровья.',
    },
  ),

  ...blank(
    'gp_s4_u2_g4_02',
    U2_G4,
    '앞으로 야식을 먹지 않기로 했어요.',
    '먹지 않기로 했어요',
    {
      uz: 'Endi kechasi ovqat yemaslikka qaror qildim.',
      en: 'I decided not to eat late-night snacks anymore.',
      ru: 'Я решил больше не есть поздно вечером.',
    },
  ),

  ...blank(
    'gp_s4_u2_g4_03',
    U2_G4,
    '친구와 주말마다 같이 걷기로 했어요.',
    '걷기로 했어요',
    {
      uz: 'Do‘stim bilan har dam olish kuni birga yurishga kelishdik.',
      en: 'My friend and I decided to walk together every weekend.',
      ru: 'Мы с другом решили гулять вместе каждые выходные.',
    },
  ),

  ...blank(
    'gp_s4_u2_g4_04',
    U2_G4,
    '의사 선생님 말씀대로 담배를 끊기로 했어요.',
    '끊기로 했어요',
    {
      uz: 'Shifokor aytganidek chekishni tashlashga qaror qildim.',
      en: 'I decided to quit smoking as the doctor advised.',
      ru: 'Я решил бросить курить по совету врача.',
    },
  ),

  ...blank(
    'gp_s4_u2_g4_05',
    U2_G4,
    '밤에는 커피를 마시지 않기로 했어요.',
    '마시지 않기로 했어요',
    {
      uz: 'Kechasi qahva ichmaslikka qaror qildim.',
      en: 'I decided not to drink coffee at night.',
      ru: 'Я решил не пить кофе по вечерам.',
    },
  ),

  ...blank(
    'gp_s4_u2_g4_06',
    U2_G4,
    '다음 주부터 수영을 배우기로 했어요.',
    '배우기로 했어요',
    {
      uz: 'Keyingi haftadan suzishni o‘rganishga qaror qildim.',
      en: 'I decided to start learning swimming next week.',
      ru: 'Я решил со следующей недели учиться плавать.',
    },
  ),

  ...blank(
    'gp_s4_u2_g4_07',
    U2_G4,
    '우리 가족은 저녁을 같이 먹기로 했어요.',
    '먹기로 했어요',
    {
      uz: 'Oilamiz kechki ovqatni birga yeyishga kelishdi.',
      en: 'My family decided to eat dinner together.',
      ru: 'Наша семья решила ужинать вместе.',
    },
  ),

  ...blank(
    'gp_s4_u2_g4_08',
    U2_G4,
    '이번 달에는 술을 마시지 않기로 했어요.',
    '마시지 않기로 했어요',
    {
      uz: 'Bu oy spirtli ichimlik ichmaslikka qaror qildim.',
      en: 'I decided not to drink alcohol this month.',
      ru: 'Я решил в этом месяце не пить алкоголь.',
    },
  ),

  ...blank(
    'gp_s4_u2_g4_09',
    U2_G4,
    '퇴근 후에 엘리베이터 대신 계단을 이용하기로 했어요.',
    '이용하기로 했어요',
    {
      uz: 'Ishdan keyin lift o‘rniga zinadan foydalanishga qaror qildim.',
      en: 'I decided to use the stairs instead of the elevator after work.',
      ru: 'После работы я решил пользоваться лестницей вместо лифта.',
    },
  ),

  ...blank(
    'gp_s4_u2_g4_10',
    U2_G4,
    '아프면 무리하지 않고 쉬기로 했어요.',
    '쉬기로 했어요',
    {
      uz: 'Kasal bo‘lsam o‘zimni qiynamay dam olishga qaror qildim.',
      en: 'I decided to rest instead of pushing myself when I am sick.',
      ru: 'Я решил отдыхать и не перенапрягаться, когда болею.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s4_u2_g4_11',
    U2_G4,
    [
      {
        options: ['건강을 위해', '시험을 위해', '여행을 위해'],
        correct: '건강을 위해',
      },
      {
        options: ['매일', '어제', '가끔'],
        correct: '매일',
      },
      {
        options: [
          '운동하기로 했어요.',
          '운동기로 했어요.',
          '운동하는기로 했어요.',
        ],
        correct: '운동하기로 했어요.',
      },
    ],
    {
      uz: 'Sog‘liq uchun har kuni mashq qilishga qaror qildim.',
      en: 'I decided to exercise every day for my health.',
      ru: 'Я решил каждый день заниматься спортом ради здоровья.',
    },
  ),

  ...build(
    'gp_s4_u2_g4_12',
    U2_G4,
    [
      {
        options: ['앞으로', '어제', '아까'],
        correct: '앞으로',
      },
      {
        options: ['야식을', '아침을', '약을'],
        correct: '야식을',
      },
      {
        options: [
          '먹지 않기로 했어요.',
          '안 먹기로 안 했어요.',
          '먹는지 않기로 했어요.',
        ],
        correct: '먹지 않기로 했어요.',
      },
    ],
    {
      uz: 'Endi kechasi ovqat yemaslikka qaror qildim.',
      en: 'I decided not to eat late-night snacks anymore.',
      ru: 'Я решил больше не есть поздно вечером.',
    },
  ),

  ...build(
    'gp_s4_u2_g4_13',
    U2_G4,
    [
      {
        options: ['친구와', '친구를', '친구가'],
        correct: '친구와',
      },
      {
        options: ['주말마다', '주말부터', '주말까지'],
        correct: '주말마다',
      },
      {
        options: ['같이', '혼자', '먼저'],
        correct: '같이',
      },
      {
        options: ['걷기로 했어요.', '걷는기로 했어요.', '걸기로 했어요.'],
        correct: '걷기로 했어요.',
      },
    ],
    {
      uz: 'Do‘stim bilan har hafta oxiri birga yurishga kelishdik.',
      en: 'My friend and I decided to walk together every weekend.',
      ru: 'Мы с другом решили гулять вместе каждые выходные.',
    },
  ),

  ...build(
    'gp_s4_u2_g4_14',
    U2_G4,
    [
      {
        options: ['의사 선생님 말씀대로', '친구 이야기처럼', '약국 앞에서'],
        correct: '의사 선생님 말씀대로',
      },
      {
        options: ['담배를', '운동을', '약을'],
        correct: '담배를',
      },
      {
        options: ['끊기로 했어요.', '끊는기로 했어요.', '끊어기로 했어요.'],
        correct: '끊기로 했어요.',
      },
    ],
    {
      uz: 'Shifokor aytganidek chekishni tashlashga qaror qildim.',
      en: 'I decided to quit smoking as my doctor advised.',
      ru: 'Я решил бросить курить по совету врача.',
    },
  ),

  ...build(
    'gp_s4_u2_g4_15',
    U2_G4,
    [
      {
        options: ['밤에는', '아침마다', '점심부터'],
        correct: '밤에는',
      },
      {
        options: ['커피를', '운동을', '병원을'],
        correct: '커피를',
      },
      {
        options: [
          '마시지 않기로 했어요.',
          '마시는지 않기로 했어요.',
          '안 마시지로 했어요.',
        ],
        correct: '마시지 않기로 했어요.',
      },
    ],
    {
      uz: 'Kechasi qahva ichmaslikka qaror qildim.',
      en: 'I decided not to drink coffee at night.',
      ru: 'Я решил не пить кофе по вечерам.',
    },
  ),

  ...build(
    'gp_s4_u2_g4_16',
    U2_G4,
    [
      {
        options: ['다음 주부터', '지난주부터', '어제까지'],
        correct: '다음 주부터',
      },
      {
        options: ['수영을', '병원을', '약을'],
        correct: '수영을',
      },
      {
        options: ['배우기로 했어요.', '배우는기로 했어요.', '배워기로 했어요.'],
        correct: '배우기로 했어요.',
      },
    ],
    {
      uz: 'Keyingi haftadan suzishni o‘rganishga qaror qildim.',
      en: 'I decided to learn swimming starting next week.',
      ru: 'Я решил со следующей недели учиться плавать.',
    },
  ),

  ...build(
    'gp_s4_u2_g4_17',
    U2_G4,
    [
      {
        options: ['우리 가족은', '우리 가족이', '우리 가족을'],
        correct: '우리 가족은',
      },
      {
        options: ['저녁을', '저녁이', '저녁은'],
        correct: '저녁을',
      },
      {
        options: ['같이', '벌써', '아직'],
        correct: '같이',
      },
      {
        options: ['먹기로 했어요.', '먹는기로 했어요.', '먹어기로 했어요.'],
        correct: '먹기로 했어요.',
      },
    ],
    {
      uz: 'Oilamiz kechki ovqatni birga yeyishga qaror qildi.',
      en: 'My family decided to eat dinner together.',
      ru: 'Наша семья решила ужинать вместе.',
    },
  ),

  ...build(
    'gp_s4_u2_g4_18',
    U2_G4,
    [
      {
        options: ['이번 달에는', '지난달에는', '오늘 아침에는'],
        correct: '이번 달에는',
      },
      {
        options: ['술을', '물을', '약을'],
        correct: '술을',
      },
      {
        options: [
          '마시지 않기로 했어요.',
          '마시는지 않기로 했어요.',
          '안 마시기로 안 했어요.',
        ],
        correct: '마시지 않기로 했어요.',
      },
    ],
    {
      uz: 'Bu oy ichkilik ichmaslikka qaror qildim.',
      en: 'I decided not to drink alcohol this month.',
      ru: 'Я решил не пить алкоголь в этом месяце.',
    },
  ),

  ...build(
    'gp_s4_u2_g4_19',
    U2_G4,
    [
      {
        options: ['퇴근 후에', '출근 전에', '수업마다'],
        correct: '퇴근 후에',
      },
      {
        options: ['엘리베이터 대신', '엘리베이터마다', '엘리베이터부터'],
        correct: '엘리베이터 대신',
      },
      {
        options: ['계단을', '계단이', '계단은'],
        correct: '계단을',
      },
      {
        options: [
          '이용하기로 했어요.',
          '이용하는기로 했어요.',
          '이용해기로 했어요.',
        ],
        correct: '이용하기로 했어요.',
      },
    ],
    {
      uz: 'Ishdan keyin lift o‘rniga zinadan foydalanishga qaror qildim.',
      en: 'I decided to use the stairs instead of the elevator after work.',
      ru: 'После работы я решил пользоваться лестницей вместо лифта.',
    },
  ),

  ...build(
    'gp_s4_u2_g4_20',
    U2_G4,
    [
      {
        options: ['아프면', '건강하면', '배고프면'],
        correct: '아프면',
      },
      {
        options: ['무리하지 않고', '많이 먹고', '늦게 자고'],
        correct: '무리하지 않고',
      },
      {
        options: ['쉬기로 했어요.', '쉬는기로 했어요.', '쉬어기로 했어요.'],
        correct: '쉬기로 했어요.',
      },
    ],
    {
      uz: 'Kasal bo‘lsam o‘zimni qiynamay dam olishga qaror qildim.',
      en: 'I decided to rest and not overdo it when I am sick.',
      ru: 'Я решил отдыхать и не перенапрягаться, когда болею.',
    },
  ),
};
// ═══════════════════════════════════════════════════════════
// UNIT 3 · 12과
// 저는 좀 조용한 편이에요
// ═══════════════════════════════════════════════════════════

// ─────────────────────────────────────────────
// 문법 1. A-아/어 보이다
// ─────────────────────────────────────────────
const U3_G1 = 'adjective-a-eo-boida';

const U3_G1_Q = {
  // grammar_blank 10
  ...blank(
    'gp_s4_u3_g1_01',
    U3_G1,
    '오늘 많이 피곤해 보여요.',
    '피곤해 보여요',
    {
      uz: 'Bugun juda charchaganga o‘xshaysiz.',
      en: 'You look very tired today.',
      ru: 'Сегодня вы выглядите очень уставшим.',
    },
  ),

  ...blank(
    'gp_s4_u3_g1_02',
    U3_G1,
    '새로 자른 머리가 훨씬 짧아 보여요.',
    '짧아 보여요',
    {
      uz: 'Yangi sochingiz ancha kalta ko‘rinadi.',
      en: 'Your newly cut hair looks much shorter.',
      ru: 'После стрижки волосы выглядят намного короче.',
    },
  ),

  ...blank(
    'gp_s4_u3_g1_03',
    U3_G1,
    '이 옷을 입으니까 더 어려 보여요.',
    '어려 보여요',
    {
      uz: 'Bu kiyimni kiysangiz yoshroq ko‘rinasiz.',
      en: 'You look younger in these clothes.',
      ru: 'В этой одежде вы выглядите моложе.',
    },
  ),

  ...blank(
    'gp_s4_u3_g1_04',
    U3_G1,
    '검은색 옷을 입으니까 날씬해 보여요.',
    '날씬해 보여요',
    {
      uz: 'Qora kiyimda ozg‘inroq ko‘rinasiz.',
      en: 'You look slim in black clothes.',
      ru: 'В чёрной одежде вы выглядите стройнее.',
    },
  ),

  ...blank(
    'gp_s4_u3_g1_05',
    U3_G1,
    '사진에서 두 사람이 정말 행복해 보여요.',
    '행복해 보여요',
    {
      uz: 'Suratda ikki kishi juda baxtli ko‘rinadi.',
      en: 'The two people look really happy in the photo.',
      ru: 'На фотографии эти двое выглядят очень счастливыми.',
    },
  ),

  ...blank(
    'gp_s4_u3_g1_06',
    U3_G1,
    '새 안경을 쓰니까 더 똑똑해 보여요.',
    '똑똑해 보여요',
    {
      uz: 'Yangi ko‘zoynakda aqlliroq ko‘rinasiz.',
      en: 'You look smarter with the new glasses.',
      ru: 'В новых очках вы выглядите умнее.',
    },
  ),

  ...blank(
    'gp_s4_u3_g1_07',
    U3_G1,
    '그 사람은 처음에는 조금 차가워 보였어요.',
    '차가워 보였어요',
    {
      uz: 'U odam avvaliga biroz sovuqqon ko‘rindi.',
      en: 'That person looked a little cold at first.',
      ru: 'Сначала этот человек казался немного холодным.',
    },
  ),

  ...blank(
    'gp_s4_u3_g1_08',
    U3_G1,
    '머리를 밝게 염색하니까 얼굴이 환해 보여요.',
    '환해 보여요',
    {
      uz: 'Sochingizni och rangga bo‘yaganingiz uchun yuzingiz yorqinroq ko‘rinadi.',
      en: 'Your face looks brighter with your hair dyed a lighter color.',
      ru: 'С более светлыми волосами лицо выглядит ярче.',
    },
  ),

  ...blank(
    'gp_s4_u3_g1_09',
    U3_G1,
    '이 가방은 작지만 생각보다 무거워 보여요.',
    '무거워 보여요',
    {
      uz: 'Bu sumka kichik, lekin o‘ylagandan og‘irroq ko‘rinadi.',
      en: 'This bag is small, but it looks heavier than expected.',
      ru: 'Сумка маленькая, но выглядит тяжелее, чем ожидалось.',
    },
  ),

  ...blank(
    'gp_s4_u3_g1_10',
    U3_G1,
    '머리 모양을 바꾸니까 분위기가 달라 보여요.',
    '달라 보여요',
    {
      uz: 'Soch turmagini o‘zgartirgach, umumiy ko‘rinishingiz boshqacha.',
      en: 'Your overall impression looks different after changing your hairstyle.',
      ru: 'После смены причёски образ выглядит иначе.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s4_u3_g1_11',
    U3_G1,
    [
      {
        options: ['오늘', '어제부터', '다음 달'],
        correct: '오늘',
      },
      {
        options: ['많이', '벌써', '가끔'],
        correct: '많이',
      },
      {
        options: ['피곤해 보여요.', '피곤하아 보여요.', '피곤한 보여요.'],
        correct: '피곤해 보여요.',
      },
    ],
    {
      uz: 'Bugun juda charchaganga o‘xshaysiz.',
      en: 'You look very tired today.',
      ru: 'Сегодня вы выглядите очень уставшим.',
    },
  ),

  ...build(
    'gp_s4_u3_g1_12',
    U3_G1,
    [
      {
        options: ['새로 자른 머리가', '새로 자른 머리를', '새로 자른 머리는'],
        correct: '새로 자른 머리가',
      },
      {
        options: ['훨씬', '아직', '자주'],
        correct: '훨씬',
      },
      {
        options: ['짧아 보여요.', '짧어 보여요.', '짧은 보여요.'],
        correct: '짧아 보여요.',
      },
    ],
    {
      uz: 'Yangi sochingiz ancha kalta ko‘rinadi.',
      en: 'Your new haircut looks much shorter.',
      ru: 'Новая стрижка выглядит намного короче.',
    },
  ),

  ...build(
    'gp_s4_u3_g1_13',
    U3_G1,
    [
      {
        options: ['이 옷을', '이 옷이', '이 옷은'],
        correct: '이 옷을',
      },
      {
        options: ['입으니까', '먹으니까', '읽으니까'],
        correct: '입으니까',
      },
      {
        options: ['더', '벌써', '아직'],
        correct: '더',
      },
      {
        options: ['어려 보여요.', '어리어 보여요.', '어린 보여요.'],
        correct: '어려 보여요.',
      },
    ],
    {
      uz: 'Bu kiyimda yoshroq ko‘rinasiz.',
      en: 'You look younger in these clothes.',
      ru: 'В этой одежде вы выглядите моложе.',
    },
  ),

  ...build(
    'gp_s4_u3_g1_14',
    U3_G1,
    [
      {
        options: ['검은색 옷을', '검은색 옷이', '검은색 옷은'],
        correct: '검은색 옷을',
      },
      {
        options: ['입으니까', '벗으니까', '사니까'],
        correct: '입으니까',
      },
      {
        options: ['날씬해 보여요.', '날씬하아 보여요.', '날씬한 보여요.'],
        correct: '날씬해 보여요.',
      },
    ],
    {
      uz: 'Qora kiyimda ozg‘inroq ko‘rinasiz.',
      en: 'You look slim in black.',
      ru: 'В чёрном вы выглядите стройнее.',
    },
  ),

  ...build(
    'gp_s4_u3_g1_15',
    U3_G1,
    [
      {
        options: ['사진에서', '사진을', '사진까지'],
        correct: '사진에서',
      },
      {
        options: ['두 사람이', '두 사람을', '두 사람은'],
        correct: '두 사람이',
      },
      {
        options: ['정말', '먼저', '아직'],
        correct: '정말',
      },
      {
        options: ['행복해 보여요.', '행복하아 보여요.', '행복한 보여요.'],
        correct: '행복해 보여요.',
      },
    ],
    {
      uz: 'Suratda ikki kishi juda baxtli ko‘rinadi.',
      en: 'The two people look really happy in the photo.',
      ru: 'На фотографии эти двое выглядят очень счастливыми.',
    },
  ),

  ...build(
    'gp_s4_u3_g1_16',
    U3_G1,
    [
      {
        options: ['새 안경을', '새 안경이', '새 안경은'],
        correct: '새 안경을',
      },
      {
        options: ['쓰니까', '입으니까', '신으니까'],
        correct: '쓰니까',
      },
      {
        options: ['더', '이미', '가끔'],
        correct: '더',
      },
      {
        options: ['똑똑해 보여요.', '똑똑하아 보여요.', '똑똑한 보여요.'],
        correct: '똑똑해 보여요.',
      },
    ],
    {
      uz: 'Yangi ko‘zoynakda aqlliroq ko‘rinasiz.',
      en: 'You look smarter with the new glasses.',
      ru: 'В новых очках вы выглядите умнее.',
    },
  ),

  ...build(
    'gp_s4_u3_g1_17',
    U3_G1,
    [
      {
        options: ['그 사람은', '그 사람을', '그 사람이'],
        correct: '그 사람은',
      },
      {
        options: ['처음에는', '내일부터', '매일마다'],
        correct: '처음에는',
      },
      {
        options: ['조금', '벌써', '자주'],
        correct: '조금',
      },
      {
        options: ['차가워 보였어요.', '차갑아 보였어요.', '차가운 보였어요.'],
        correct: '차가워 보였어요.',
      },
    ],
    {
      uz: 'U odam avvaliga biroz sovuqqon ko‘rindi.',
      en: 'That person looked a little cold at first.',
      ru: 'Сначала этот человек выглядел немного холодным.',
    },
  ),

  ...build(
    'gp_s4_u3_g1_18',
    U3_G1,
    [
      {
        options: ['머리를', '머리가', '머리는'],
        correct: '머리를',
      },
      {
        options: ['밝게 염색하니까', '짧게 먹으니까', '조용하게 읽으니까'],
        correct: '밝게 염색하니까',
      },
      {
        options: ['얼굴이', '얼굴을', '얼굴은'],
        correct: '얼굴이',
      },
      {
        options: ['환해 보여요.', '환하아 보여요.', '환한 보여요.'],
        correct: '환해 보여요.',
      },
    ],
    {
      uz: 'Sochni och rangga bo‘yaganda yuz yorqinroq ko‘rinadi.',
      en: 'Your face looks brighter with lighter-colored hair.',
      ru: 'С более светлыми волосами лицо выглядит ярче.',
    },
  ),

  ...build(
    'gp_s4_u3_g1_19',
    U3_G1,
    [
      {
        options: ['이 가방은', '이 가방을', '이 가방이'],
        correct: '이 가방은',
      },
      {
        options: ['작지만', '작아서', '작으면'],
        correct: '작지만',
      },
      {
        options: ['생각보다', '집보다', '오늘부터'],
        correct: '생각보다',
      },
      {
        options: ['무거워 보여요.', '무겁어 보여요.', '무거운 보여요.'],
        correct: '무거워 보여요.',
      },
    ],
    {
      uz: 'Bu sumka kichik, lekin og‘ir ko‘rinadi.',
      en: 'This bag is small, but it looks heavy.',
      ru: 'Эта сумка маленькая, но выглядит тяжёлой.',
    },
  ),

  ...build(
    'gp_s4_u3_g1_20',
    U3_G1,
    [
      {
        options: ['머리 모양을', '머리 모양이', '머리 모양은'],
        correct: '머리 모양을',
      },
      {
        options: ['바꾸니까', '먹으니까', '마시니까'],
        correct: '바꾸니까',
      },
      {
        options: ['분위기가', '분위기를', '분위기는'],
        correct: '분위기가',
      },
      {
        options: ['달라 보여요.', '다르어 보여요.', '다른 보여요.'],
        correct: '달라 보여요.',
      },
    ],
    {
      uz: 'Soch turmagini o‘zgartirgach, ko‘rinishingiz boshqacha.',
      en: 'Your overall impression looks different after changing your hairstyle.',
      ru: 'После смены причёски образ выглядит иначе.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 2. N처럼[같이]
// ─────────────────────────────────────────────
const U3_G2 = 'noun-cheoreom-gachi';

const U3_G2_Q = {
  // grammar_blank 10
  ...blank(
    'gp_s4_u3_g2_01',
    U3_G2,
    '민수 씨는 아버지처럼 키가 커요.',
    '아버지처럼',
    {
      uz: 'Minsu otasidek baland bo‘yli.',
      en: 'Minsu is tall like his father.',
      ru: 'Минсу высокий, как его отец.',
    },
  ),

  ...blank('gp_s4_u3_g2_02', U3_G2, '동생은 엄마처럼 눈이 커요.', '엄마처럼', {
    uz: 'Ukam/onamdek ko‘zlari katta.',
    en: 'My younger sibling has big eyes like Mom.',
    ru: 'У младшего брата/сестры большие глаза, как у мамы.',
  }),

  ...blank(
    'gp_s4_u3_g2_03',
    U3_G2,
    '그 사람은 배우같이 정말 잘생겼어요.',
    '배우같이',
    {
      uz: 'U odam aktyordek juda chiroyli.',
      en: 'That person is very handsome, like an actor.',
      ru: 'Этот человек очень красивый, прямо как актёр.',
    },
  ),

  ...blank(
    'gp_s4_u3_g2_04',
    U3_G2,
    '머리가 구름처럼 부드러워 보여요.',
    '구름처럼',
    {
      uz: 'Sochi bulutdek yumshoq ko‘rinadi.',
      en: 'The hair looks soft like a cloud.',
      ru: 'Волосы выглядят мягкими, как облако.',
    },
  ),

  ...blank(
    'gp_s4_u3_g2_05',
    U3_G2,
    '언니는 모델처럼 옷을 잘 입어요.',
    '모델처럼',
    {
      uz: 'Opam modeldek yaxshi kiyinadi.',
      en: 'My older sister dresses well like a model.',
      ru: 'Моя старшая сестра одевается как модель.',
    },
  ),

  ...blank(
    'gp_s4_u3_g2_06',
    U3_G2,
    '민지는 친구같이 편한 사람이에요.',
    '친구같이',
    {
      uz: 'Minji do‘stdek qulay va yaqin inson.',
      en: 'Minji is someone who feels comfortable like a friend.',
      ru: 'С Минджи легко и комфортно, как с другом.',
    },
  ),

  ...blank(
    'gp_s4_u3_g2_07',
    U3_G2,
    '아이의 얼굴이 사과처럼 빨개졌어요.',
    '사과처럼',
    {
      uz: 'Bolaning yuzi olmadek qizarib ketdi.',
      en: "The child's face became red like an apple.",
      ru: 'Лицо ребёнка стало красным, как яблоко.',
    },
  ),

  ...blank(
    'gp_s4_u3_g2_08',
    U3_G2,
    '그 사람은 선생님처럼 설명을 잘해요.',
    '선생님처럼',
    {
      uz: 'U odam o‘qituvchidek yaxshi tushuntiradi.',
      en: 'That person explains things well like a teacher.',
      ru: 'Этот человек объясняет хорошо, как учитель.',
    },
  ),

  ...blank('gp_s4_u3_g2_09', U3_G2, '오늘은 봄날같이 따뜻해요.', '봄날같이', {
    uz: 'Bugun bahor kunidek iliq.',
    en: 'Today is warm like a spring day.',
    ru: 'Сегодня тепло, как весенним днём.',
  }),

  ...blank(
    'gp_s4_u3_g2_10',
    U3_G2,
    '제 머리도 사진처럼 잘라 주세요.',
    '사진처럼',
    {
      uz: 'Mening sochimni ham rasmdagidek kesib bering.',
      en: 'Please cut my hair like the photo.',
      ru: 'Подстригите меня, пожалуйста, как на фотографии.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s4_u3_g2_11',
    U3_G2,
    [
      {
        options: ['민수 씨는', '민수 씨를', '민수 씨가'],
        correct: '민수 씨는',
      },
      {
        options: ['아버지처럼', '아버지보다', '아버지에게'],
        correct: '아버지처럼',
      },
      {
        options: ['키가 커요.', '눈이 작아요.', '말이 적어요.'],
        correct: '키가 커요.',
      },
    ],
    {
      uz: 'Minsu otasidek baland bo‘yli.',
      en: 'Minsu is tall like his father.',
      ru: 'Минсу высокий, как его отец.',
    },
  ),

  ...build(
    'gp_s4_u3_g2_12',
    U3_G2,
    [
      {
        options: ['동생은', '동생을', '동생이'],
        correct: '동생은',
      },
      {
        options: ['엄마처럼', '엄마보다', '엄마에게서'],
        correct: '엄마처럼',
      },
      {
        options: ['눈이 커요.', '키를 먹어요.', '성격을 입어요.'],
        correct: '눈이 커요.',
      },
    ],
    {
      uz: 'Ukam/onamdek ko‘zlari katta.',
      en: 'My younger sibling has big eyes like Mom.',
      ru: 'У младшего брата/сестры большие глаза, как у мамы.',
    },
  ),

  ...build(
    'gp_s4_u3_g2_13',
    U3_G2,
    [
      {
        options: ['그 사람은', '그 사람을', '그 사람에게'],
        correct: '그 사람은',
      },
      {
        options: ['배우같이', '배우부터', '배우마다'],
        correct: '배우같이',
      },
      {
        options: [
          '정말 잘생겼어요.',
          '정말 조용히 먹어요.',
          '정말 오래 걸려요.',
        ],
        correct: '정말 잘생겼어요.',
      },
    ],
    {
      uz: 'U odam aktyordek juda kelishgan.',
      en: 'That person is really handsome, like an actor.',
      ru: 'Этот человек очень красивый, как актёр.',
    },
  ),

  ...build(
    'gp_s4_u3_g2_14',
    U3_G2,
    [
      {
        options: ['머리가', '머리를', '머리는'],
        correct: '머리가',
      },
      {
        options: ['구름처럼', '구름에게', '구름부터'],
        correct: '구름처럼',
      },
      {
        options: ['부드러워 보여요.', '시끄러워 보여요.', '매워 보여요.'],
        correct: '부드러워 보여요.',
      },
    ],
    {
      uz: 'Sochi bulutdek yumshoq ko‘rinadi.',
      en: 'The hair looks soft like a cloud.',
      ru: 'Волосы выглядят мягкими, как облако.',
    },
  ),

  ...build(
    'gp_s4_u3_g2_15',
    U3_G2,
    [
      {
        options: ['언니는', '언니를', '언니가'],
        correct: '언니는',
      },
      {
        options: ['모델처럼', '모델보다', '모델에게'],
        correct: '모델처럼',
      },
      {
        options: ['옷을 잘 입어요.', '밥을 잘 마셔요.', '운동을 잘 자요.'],
        correct: '옷을 잘 입어요.',
      },
    ],
    {
      uz: 'Opam modeldek yaxshi kiyinadi.',
      en: 'My older sister dresses well like a model.',
      ru: 'Моя старшая сестра одевается как модель.',
    },
  ),

  ...build(
    'gp_s4_u3_g2_16',
    U3_G2,
    [
      {
        options: ['민지는', '민지를', '민지가'],
        correct: '민지는',
      },
      {
        options: ['친구같이', '친구부터', '친구까지'],
        correct: '친구같이',
      },
      {
        options: ['편한 사람이에요.', '매운 음식이에요.', '넓은 방이에요.'],
        correct: '편한 사람이에요.',
      },
    ],
    {
      uz: 'Minji do‘stdek yaqin va qulay inson.',
      en: 'Minji feels comfortable like a friend.',
      ru: 'С Минджи комфортно, как с другом.',
    },
  ),

  ...build(
    'gp_s4_u3_g2_17',
    U3_G2,
    [
      {
        options: ['아이의 얼굴이', '아이의 얼굴을', '아이의 얼굴은'],
        correct: '아이의 얼굴이',
      },
      {
        options: ['사과처럼', '사과에게', '사과부터'],
        correct: '사과처럼',
      },
      {
        options: ['빨개졌어요.', '길어졌어요.', '조용해졌어요.'],
        correct: '빨개졌어요.',
      },
    ],
    {
      uz: 'Bolaning yuzi olmadek qizarib ketdi.',
      en: "The child's face turned red like an apple.",
      ru: 'Лицо ребёнка стало красным, как яблоко.',
    },
  ),

  ...build(
    'gp_s4_u3_g2_18',
    U3_G2,
    [
      {
        options: ['그 사람은', '그 사람을', '그 사람에게'],
        correct: '그 사람은',
      },
      {
        options: ['선생님처럼', '선생님부터', '선생님까지'],
        correct: '선생님처럼',
      },
      {
        options: ['설명을 잘해요.', '설명을 마셔요.', '설명을 입어요.'],
        correct: '설명을 잘해요.',
      },
    ],
    {
      uz: 'U odam o‘qituvchidek yaxshi tushuntiradi.',
      en: 'That person explains things well like a teacher.',
      ru: 'Этот человек хорошо объясняет, как учитель.',
    },
  ),

  ...build(
    'gp_s4_u3_g2_19',
    U3_G2,
    [
      {
        options: ['오늘은', '어제는', '내일을'],
        correct: '오늘은',
      },
      {
        options: ['봄날같이', '봄날보다', '봄날부터'],
        correct: '봄날같이',
      },
      {
        options: ['따뜻해요.', '무거워요.', '시끄러워요.'],
        correct: '따뜻해요.',
      },
    ],
    {
      uz: 'Bugun bahor kunidek iliq.',
      en: 'Today is warm like a spring day.',
      ru: 'Сегодня тепло, как весенним днём.',
    },
  ),

  ...build(
    'gp_s4_u3_g2_20',
    U3_G2,
    [
      {
        options: ['제 머리도', '제 머리가', '제 머리를도'],
        correct: '제 머리도',
      },
      {
        options: ['사진처럼', '사진보다', '사진에게'],
        correct: '사진처럼',
      },
      {
        options: ['잘라 주세요.', '마셔 주세요.', '기다려 주세요.'],
        correct: '잘라 주세요.',
      },
    ],
    {
      uz: 'Mening sochimni ham rasmdagidek kesib bering.',
      en: 'Please cut my hair like the photo.',
      ru: 'Подстригите меня, пожалуйста, как на фотографии.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 3. A-(으)ㄴ 편이다, V-는 편이다
// ─────────────────────────────────────────────
const U3_G3 = 'adjective-verb-pyeonida';

const U3_G3_Q = {
  // grammar_blank 10
  ...blank(
    'gp_s4_u3_g3_01',
    U3_G3,
    '저는 성격이 조용한 편이에요.',
    '조용한 편이에요',
    {
      uz: 'Men tabiatan biroz sokinroqman.',
      en: 'I am on the quiet side.',
      ru: 'По характеру я скорее тихий человек.',
    },
  ),

  ...blank(
    'gp_s4_u3_g3_02',
    U3_G3,
    '제 동생은 키가 큰 편이에요.',
    '큰 편이에요',
    {
      uz: 'Ukamning bo‘yi balandroq.',
      en: 'My younger sibling is on the tall side.',
      ru: 'Мой младший брат/сестра довольно высокий.',
    },
  ),

  ...blank(
    'gp_s4_u3_g3_03',
    U3_G3,
    '민수 씨는 사람을 자주 만나는 편이에요.',
    '자주 만나는 편이에요',
    {
      uz: 'Minsu odamlar bilan tez-tez uchrashadigan odam.',
      en: 'Minsu tends to meet people often.',
      ru: 'Минсу довольно часто встречается с людьми.',
    },
  ),

  ...blank(
    'gp_s4_u3_g3_04',
    U3_G3,
    '저는 아침을 일찍 먹는 편이에요.',
    '일찍 먹는 편이에요',
    {
      uz: 'Men odatda nonushtani erta yeyman.',
      en: 'I tend to eat breakfast early.',
      ru: 'Я обычно завтракаю рано.',
    },
  ),

  ...blank(
    'gp_s4_u3_g3_05',
    U3_G3,
    '이 식당은 가격이 싼 편이에요.',
    '싼 편이에요',
    {
      uz: 'Bu restoran nisbatan arzon.',
      en: 'This restaurant is relatively inexpensive.',
      ru: 'Этот ресторан довольно недорогой.',
    },
  ),

  ...blank(
    'gp_s4_u3_g3_06',
    U3_G3,
    '우리 언니는 머리가 긴 편이에요.',
    '긴 편이에요',
    {
      uz: 'Opamning sochi ancha uzun.',
      en: 'My older sister has relatively long hair.',
      ru: 'У моей старшей сестры довольно длинные волосы.',
    },
  ),

  ...blank(
    'gp_s4_u3_g3_07',
    U3_G3,
    '저는 새로운 사람과도 쉽게 이야기하는 편이에요.',
    '쉽게 이야기하는 편이에요',
    {
      uz: 'Men yangi odamlar bilan ham oson gaplashadigan odamman.',
      en: 'I tend to talk easily even with new people.',
      ru: 'Мне обычно легко разговаривать даже с новыми людьми.',
    },
  ),

  ...blank(
    'gp_s4_u3_g3_08',
    U3_G3,
    '친구는 옷을 밝게 입는 편이에요.',
    '밝게 입는 편이에요',
    {
      uz: 'Do‘stim odatda yorqin kiyim kiyadi.',
      en: 'My friend tends to wear bright clothes.',
      ru: 'Мой друг обычно носит яркую одежду.',
    },
  ),

  ...blank(
    'gp_s4_u3_g3_09',
    U3_G3,
    '저는 낯선 곳에서는 말이 적은 편이에요.',
    '적은 편이에요',
    {
      uz: 'Begona joyda men kamgaproq bo‘laman.',
      en: 'I tend to be quiet in unfamiliar places.',
      ru: 'В незнакомых местах я обычно немногословен.',
    },
  ),

  ...blank(
    'gp_s4_u3_g3_10',
    U3_G3,
    '주말에는 집에서 쉬는 편이에요.',
    '쉬는 편이에요',
    {
      uz: 'Dam olish kunlari odatda uyda dam olaman.',
      en: 'I tend to rest at home on weekends.',
      ru: 'По выходным я обычно отдыхаю дома.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s4_u3_g3_11',
    U3_G3,
    [
      {
        options: ['저는', '제가', '저를'],
        correct: '저는',
      },
      {
        options: ['성격이', '성격을', '성격은'],
        correct: '성격이',
      },
      {
        options: ['조용한 편이에요.', '조용하는 편이에요.', '조용해 편이에요.'],
        correct: '조용한 편이에요.',
      },
    ],
    {
      uz: 'Men xarakter jihatdan sokinroqman.',
      en: 'I am on the quiet side.',
      ru: 'По характеру я скорее тихий.',
    },
  ),

  ...build(
    'gp_s4_u3_g3_12',
    U3_G3,
    [
      {
        options: ['제 동생은', '제 동생을', '제 동생이'],
        correct: '제 동생은',
      },
      {
        options: ['키가', '키를', '키는'],
        correct: '키가',
      },
      {
        options: ['큰 편이에요.', '크는 편이에요.', '커 편이에요.'],
        correct: '큰 편이에요.',
      },
    ],
    {
      uz: 'Ukamning bo‘yi balandroq.',
      en: 'My younger sibling is relatively tall.',
      ru: 'Мой младший брат/сестра довольно высокий.',
    },
  ),

  ...build(
    'gp_s4_u3_g3_13',
    U3_G3,
    [
      {
        options: ['민수 씨는', '민수 씨를', '민수 씨가'],
        correct: '민수 씨는',
      },
      {
        options: ['사람을', '사람이', '사람은'],
        correct: '사람을',
      },
      {
        options: ['자주', '아직', '벌써'],
        correct: '자주',
      },
      {
        options: ['만나는 편이에요.', '만난 편이에요.', '만날 편이에요.'],
        correct: '만나는 편이에요.',
      },
    ],
    {
      uz: 'Minsu odamlar bilan tez-tez uchrashadi.',
      en: 'Minsu tends to meet people often.',
      ru: 'Минсу довольно часто встречается с людьми.',
    },
  ),

  ...build(
    'gp_s4_u3_g3_14',
    U3_G3,
    [
      {
        options: ['저는', '제가', '저를'],
        correct: '저는',
      },
      {
        options: ['아침을', '아침이', '아침은'],
        correct: '아침을',
      },
      {
        options: ['일찍', '벌써', '아직'],
        correct: '일찍',
      },
      {
        options: ['먹는 편이에요.', '먹은 편이에요.', '먹을 편이에요.'],
        correct: '먹는 편이에요.',
      },
    ],
    {
      uz: 'Men odatda nonushtani erta yeyman.',
      en: 'I tend to eat breakfast early.',
      ru: 'Я обычно завтракаю рано.',
    },
  ),

  ...build(
    'gp_s4_u3_g3_15',
    U3_G3,
    [
      {
        options: ['이 식당은', '이 식당을', '이 식당이'],
        correct: '이 식당은',
      },
      {
        options: ['가격이', '가격을', '가격은'],
        correct: '가격이',
      },
      {
        options: ['싼 편이에요.', '싸는 편이에요.', '싸 편이에요.'],
        correct: '싼 편이에요.',
      },
    ],
    {
      uz: 'Bu restoran nisbatan arzon.',
      en: 'This restaurant is relatively inexpensive.',
      ru: 'Этот ресторан довольно недорогой.',
    },
  ),

  ...build(
    'gp_s4_u3_g3_16',
    U3_G3,
    [
      {
        options: ['우리 언니는', '우리 언니를', '우리 언니가'],
        correct: '우리 언니는',
      },
      {
        options: ['머리가', '머리를', '머리는'],
        correct: '머리가',
      },
      {
        options: ['긴 편이에요.', '길은 편이에요.', '길는 편이에요.'],
        correct: '긴 편이에요.',
      },
    ],
    {
      uz: 'Opamning sochi ancha uzun.',
      en: 'My older sister has relatively long hair.',
      ru: 'У моей старшей сестры довольно длинные волосы.',
    },
  ),

  ...build(
    'gp_s4_u3_g3_17',
    U3_G3,
    [
      {
        options: ['저는', '제가', '저를'],
        correct: '저는',
      },
      {
        options: ['새로운 사람과도', '새로운 사람을도', '새로운 사람에게도'],
        correct: '새로운 사람과도',
      },
      {
        options: ['쉽게', '맵게', '짧게'],
        correct: '쉽게',
      },
      {
        options: [
          '이야기하는 편이에요.',
          '이야기한 편이에요.',
          '이야기할 편이에요.',
        ],
        correct: '이야기하는 편이에요.',
      },
    ],
    {
      uz: 'Men yangi odamlar bilan ham oson gaplashaman.',
      en: 'I tend to talk easily with new people.',
      ru: 'Мне обычно легко разговаривать с новыми людьми.',
    },
  ),

  ...build(
    'gp_s4_u3_g3_18',
    U3_G3,
    [
      {
        options: ['친구는', '친구를', '친구가'],
        correct: '친구는',
      },
      {
        options: ['옷을', '옷이', '옷은'],
        correct: '옷을',
      },
      {
        options: ['밝게', '무겁게', '조용하게'],
        correct: '밝게',
      },
      {
        options: ['입는 편이에요.', '입은 편이에요.', '입을 편이에요.'],
        correct: '입는 편이에요.',
      },
    ],
    {
      uz: 'Do‘stim odatda yorqin kiyim kiyadi.',
      en: 'My friend tends to wear bright clothes.',
      ru: 'Мой друг обычно носит яркую одежду.',
    },
  ),

  ...build(
    'gp_s4_u3_g3_19',
    U3_G3,
    [
      {
        options: ['저는', '제가', '저를'],
        correct: '저는',
      },
      {
        options: ['낯선 곳에서는', '낯선 곳을', '낯선 곳에게'],
        correct: '낯선 곳에서는',
      },
      {
        options: ['말이', '말을', '말은'],
        correct: '말이',
      },
      {
        options: ['적은 편이에요.', '적는 편이에요.', '적어 편이에요.'],
        correct: '적은 편이에요.',
      },
    ],
    {
      uz: 'Begona joyda men kamgaproqman.',
      en: 'I tend to be quiet in unfamiliar places.',
      ru: 'В незнакомых местах я обычно немногословен.',
    },
  ),

  ...build(
    'gp_s4_u3_g3_20',
    U3_G3,
    [
      {
        options: ['주말에는', '주말부터', '주말까지'],
        correct: '주말에는',
      },
      {
        options: ['집에서', '집에를', '집이'],
        correct: '집에서',
      },
      {
        options: ['쉬는 편이에요.', '쉰 편이에요.', '쉴 편이에요.'],
        correct: '쉬는 편이에요.',
      },
    ],
    {
      uz: 'Dam olish kunlari odatda uyda dam olaman.',
      en: 'I tend to rest at home on weekends.',
      ru: 'По выходным я обычно отдыхаю дома.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 4. A-게
// ─────────────────────────────────────────────
const U3_G4 = 'adjective-ge';

const U3_G4_Q = {
  // grammar_blank 10
  ...blank('gp_s4_u3_g4_01', U3_G4, '머리를 조금 짧게 잘라 주세요.', '짧게', {
    uz: 'Sochimni biroz kalta qilib kesib bering.',
    en: 'Please cut my hair a little shorter.',
    ru: 'Подстригите волосы немного короче, пожалуйста.',
  }),

  ...blank(
    'gp_s4_u3_g4_02',
    U3_G4,
    '앞머리는 자연스럽게 해 주세요.',
    '자연스럽게',
    {
      uz: 'Old sochimni tabiiy qilib bering.',
      en: 'Please make the bangs look natural.',
      ru: 'Сделайте чёлку естественной, пожалуйста.',
    },
  ),

  ...blank('gp_s4_u3_g4_03', U3_G4, '사진을 밝게 찍어 주세요.', '밝게', {
    uz: 'Suratni yorqinroq qilib oling.',
    en: 'Please take the photo brightly.',
    ru: 'Сделайте фотографию посветлее.',
  }),

  ...blank('gp_s4_u3_g4_04', U3_G4, '글씨를 크게 써 주세요.', '크게', {
    uz: 'Yozuvni katta qilib yozing.',
    en: 'Please write the letters large.',
    ru: 'Напишите, пожалуйста, крупными буквами.',
  }),

  ...blank('gp_s4_u3_g4_05', U3_G4, '방을 깨끗하게 정리했어요.', '깨끗하게', {
    uz: 'Xonani toza qilib yig‘ishtirdim.',
    en: 'I tidied the room neatly.',
    ru: 'Я аккуратно убрал комнату.',
  }),

  ...blank('gp_s4_u3_g4_06', U3_G4, '친구가 항상 밝게 웃어요.', '밝게', {
    uz: 'Do‘stim doim yorqin kuladi.',
    en: 'My friend always smiles brightly.',
    ru: 'Мой друг всегда улыбается очень светло.',
  }),

  ...blank(
    'gp_s4_u3_g4_07',
    U3_G4,
    '아이에게 부드럽게 말해 주세요.',
    '부드럽게',
    {
      uz: 'Bolaga muloyim gapiring.',
      en: 'Please speak gently to the child.',
      ru: 'Говорите с ребёнком мягко, пожалуйста.',
    },
  ),

  ...blank(
    'gp_s4_u3_g4_08',
    U3_G4,
    '면접에서는 또렷하게 말하는 게 좋아요.',
    '또렷하게',
    {
      uz: 'Suhbatda aniq gapirish yaxshi.',
      en: 'It is good to speak clearly in an interview.',
      ru: 'На собеседовании лучше говорить чётко.',
    },
  ),

  ...blank(
    'gp_s4_u3_g4_09',
    U3_G4,
    '머리 색을 조금 어둡게 해 주세요.',
    '어둡게',
    {
      uz: 'Soch rangini biroz to‘qroq qilib bering.',
      en: 'Please make my hair color a little darker.',
      ru: 'Сделайте цвет волос немного темнее.',
    },
  ),

  ...blank('gp_s4_u3_g4_10', U3_G4, '사진처럼 예쁘게 꾸며 주세요.', '예쁘게', {
    uz: 'Rasmdagidek chiroyli qilib bezang.',
    en: 'Please decorate it prettily like the photo.',
    ru: 'Украсьте красиво, как на фотографии.',
  }),

  // grammar_build 10
  ...build(
    'gp_s4_u3_g4_11',
    U3_G4,
    [
      {
        options: ['머리를', '머리가', '머리는'],
        correct: '머리를',
      },
      {
        options: ['조금', '벌써', '아직'],
        correct: '조금',
      },
      {
        options: ['짧게', '짧은', '짧아'],
        correct: '짧게',
      },
      {
        options: ['잘라 주세요.', '마셔 주세요.', '읽어 주세요.'],
        correct: '잘라 주세요.',
      },
    ],
    {
      uz: 'Sochimni biroz kalta qilib kesib bering.',
      en: 'Please cut my hair a little shorter.',
      ru: 'Подстригите волосы немного короче.',
    },
  ),

  ...build(
    'gp_s4_u3_g4_12',
    U3_G4,
    [
      {
        options: ['앞머리는', '앞머리를', '앞머리가'],
        correct: '앞머리는',
      },
      {
        options: ['자연스럽게', '자연스러운', '자연스러워'],
        correct: '자연스럽게',
      },
      {
        options: ['해 주세요.', '먹어 주세요.', '읽어 주세요.'],
        correct: '해 주세요.',
      },
    ],
    {
      uz: 'Old sochimni tabiiy qilib bering.',
      en: 'Please make my bangs look natural.',
      ru: 'Сделайте чёлку естественной.',
    },
  ),

  ...build(
    'gp_s4_u3_g4_13',
    U3_G4,
    [
      {
        options: ['사진을', '사진이', '사진은'],
        correct: '사진을',
      },
      {
        options: ['밝게', '밝은', '밝아'],
        correct: '밝게',
      },
      {
        options: ['찍어 주세요.', '먹어 주세요.', '입어 주세요.'],
        correct: '찍어 주세요.',
      },
    ],
    {
      uz: 'Suratni yorqin qilib oling.',
      en: 'Please take the photo brightly.',
      ru: 'Сделайте фотографию посветлее.',
    },
  ),

  ...build(
    'gp_s4_u3_g4_14',
    U3_G4,
    [
      {
        options: ['글씨를', '글씨가', '글씨는'],
        correct: '글씨를',
      },
      {
        options: ['크게', '큰', '커'],
        correct: '크게',
      },
      {
        options: ['써 주세요.', '먹어 주세요.', '씻어 주세요.'],
        correct: '써 주세요.',
      },
    ],
    {
      uz: 'Yozuvni katta qilib yozing.',
      en: 'Please write the letters large.',
      ru: 'Напишите крупно.',
    },
  ),

  ...build(
    'gp_s4_u3_g4_15',
    U3_G4,
    [
      {
        options: ['방을', '방이', '방은'],
        correct: '방을',
      },
      {
        options: ['깨끗하게', '깨끗한', '깨끗해'],
        correct: '깨끗하게',
      },
      {
        options: ['정리했어요.', '먹었어요.', '마셨어요.'],
        correct: '정리했어요.',
      },
    ],
    {
      uz: 'Xonani toza qilib yig‘ishtirdim.',
      en: 'I tidied the room neatly.',
      ru: 'Я аккуратно убрал комнату.',
    },
  ),

  ...build(
    'gp_s4_u3_g4_16',
    U3_G4,
    [
      {
        options: ['친구가', '친구를', '친구는'],
        correct: '친구가',
      },
      {
        options: ['항상', '어제만', '내일부터'],
        correct: '항상',
      },
      {
        options: ['밝게', '밝은', '밝아'],
        correct: '밝게',
      },
      {
        options: ['웃어요.', '먹어요.', '입어요.'],
        correct: '웃어요.',
      },
    ],
    {
      uz: 'Do‘stim doim yorqin kuladi.',
      en: 'My friend always smiles brightly.',
      ru: 'Мой друг всегда ярко улыбается.',
    },
  ),

  ...build(
    'gp_s4_u3_g4_17',
    U3_G4,
    [
      {
        options: ['아이에게', '아이를', '아이가'],
        correct: '아이에게',
      },
      {
        options: ['부드럽게', '부드러운', '부드러워'],
        correct: '부드럽게',
      },
      {
        options: ['말해 주세요.', '먹어 주세요.', '씻어 주세요.'],
        correct: '말해 주세요.',
      },
    ],
    {
      uz: 'Bolaga muloyim gapiring.',
      en: 'Please speak gently to the child.',
      ru: 'Говорите с ребёнком мягко.',
    },
  ),

  ...build(
    'gp_s4_u3_g4_18',
    U3_G4,
    [
      {
        options: ['면접에서는', '면접을', '면접이'],
        correct: '면접에서는',
      },
      {
        options: ['또렷하게', '또렷한', '또렷해'],
        correct: '또렷하게',
      },
      {
        options: ['말하는 게 좋아요.', '먹는 게 좋아요.', '자는 게 좋아요.'],
        correct: '말하는 게 좋아요.',
      },
    ],
    {
      uz: 'Suhbatda aniq gapirish yaxshi.',
      en: 'It is good to speak clearly in an interview.',
      ru: 'На собеседовании лучше говорить чётко.',
    },
  ),

  ...build(
    'gp_s4_u3_g4_19',
    U3_G4,
    [
      {
        options: ['머리 색을', '머리 색이', '머리 색은'],
        correct: '머리 색을',
      },
      {
        options: ['조금', '벌써', '아직'],
        correct: '조금',
      },
      {
        options: ['어둡게', '어두운', '어두워'],
        correct: '어둡게',
      },
      {
        options: ['해 주세요.', '먹어 주세요.', '가 주세요.'],
        correct: '해 주세요.',
      },
    ],
    {
      uz: 'Soch rangini biroz to‘qroq qilib bering.',
      en: 'Please make the hair color a little darker.',
      ru: 'Сделайте цвет волос немного темнее.',
    },
  ),

  ...build(
    'gp_s4_u3_g4_20',
    U3_G4,
    [
      {
        options: ['사진처럼', '사진보다', '사진에게'],
        correct: '사진처럼',
      },
      {
        options: ['예쁘게', '예쁜', '예뻐'],
        correct: '예쁘게',
      },
      {
        options: ['꾸며 주세요.', '마셔 주세요.', '기다려 주세요.'],
        correct: '꾸며 주세요.',
      },
    ],
    {
      uz: 'Rasmdagidek chiroyli qilib bezang.',
      en: 'Please decorate it prettily like the photo.',
      ru: 'Украсьте красиво, как на фотографии.',
    },
  ),
};
// ═══════════════════════════════════════════════════════════
// UNIT 4 · 13과
// 주변이 조용해서 살기 좋아요
// ═══════════════════════════════════════════════════════════

// ─────────────────────────────────────────────
// 문법 1. A/V-(으)ㄹ지 모르겠다
// ─────────────────────────────────────────────
const U4_G1 = 'av-eulji-moreugetda';

const U4_G1_Q = {
  // grammar_blank 10
  ...blank(
    'gp_s4_u4_g1_01',
    U4_G1,
    '이 동네가 밤에도 조용할지 모르겠어요.',
    '조용할지 모르겠어요',
    {
      uz: 'Bu mahalla kechasi ham tinch bo‘ladimi, bilmayman.',
      en: "I'm not sure whether this neighborhood will be quiet at night too.",
      ru: 'Не знаю, будет ли в этом районе тихо и ночью.',
    },
  ),

  ...blank(
    'gp_s4_u4_g1_02',
    U4_G1,
    '관리비가 얼마나 나올지 모르겠어요.',
    '나올지 모르겠어요',
    {
      uz: 'Kommunal to‘lov qancha chiqishini bilmayman.',
      en: "I'm not sure how much the maintenance fee will be.",
      ru: 'Не знаю, сколько составят коммунальные расходы.',
    },
  ),

  ...blank(
    'gp_s4_u4_g1_03',
    U4_G1,
    '지하철역까지 걸어서 십 분이면 갈 수 있을지 모르겠어요.',
    '갈 수 있을지 모르겠어요',
    {
      uz: 'Metro bekatigacha o‘n daqiqada piyoda yetib borish mumkinmi, bilmayman.',
      en: "I'm not sure whether I can walk to the subway station in ten minutes.",
      ru: 'Не знаю, можно ли дойти до метро за десять минут.',
    },
  ),

  ...blank(
    'gp_s4_u4_g1_04',
    U4_G1,
    '이 방에 책상이 들어갈지 모르겠어요.',
    '들어갈지 모르겠어요',
    {
      uz: 'Bu xonaga stol sig‘adimi, bilmayman.',
      en: "I'm not sure whether a desk will fit in this room.",
      ru: 'Не знаю, поместится ли письменный стол в этой комнате.',
    },
  ),

  ...blank(
    'gp_s4_u4_g1_05',
    U4_G1,
    '겨울에는 난방비가 많이 들지 모르겠어요.',
    '많이 들지 모르겠어요',
    {
      uz: 'Qishda isitish xarajati ko‘p bo‘ladimi, bilmayman.',
      en: "I'm not sure whether heating will cost a lot in winter.",
      ru: 'Не знаю, будут ли зимой большими расходы на отопление.',
    },
  ),

  ...blank(
    'gp_s4_u4_g1_06',
    U4_G1,
    '집주인이 보증금을 조금 깎아 줄지 모르겠어요.',
    '깎아 줄지 모르겠어요',
    {
      uz: 'Uy egasi garovni biroz kamaytiradimi, bilmayman.',
      en: "I'm not sure whether the landlord will lower the deposit a little.",
      ru: 'Не знаю, согласится ли хозяин немного уменьшить залог.',
    },
  ),

  ...blank(
    'gp_s4_u4_g1_07',
    U4_G1,
    '주말에도 주변이 시끄러울지 모르겠어요.',
    '시끄러울지 모르겠어요',
    {
      uz: 'Dam olish kunlari ham atrof shovqinli bo‘ladimi, bilmayman.',
      en: "I'm not sure whether the area will be noisy on weekends too.",
      ru: 'Не знаю, будет ли здесь шумно и по выходным.',
    },
  ),

  ...blank(
    'gp_s4_u4_g1_08',
    U4_G1,
    '이 가격에 더 넓은 집을 찾을 수 있을지 모르겠어요.',
    '찾을 수 있을지 모르겠어요',
    {
      uz: 'Shu narxda kattaroq uy topa olamanmi, bilmayman.',
      en: "I'm not sure whether I can find a larger home at this price.",
      ru: 'Не знаю, удастся ли найти жильё побольше за такую цену.',
    },
  ),

  ...blank(
    'gp_s4_u4_g1_09',
    U4_G1,
    '이 아파트에 주차장이 있을지 모르겠어요.',
    '있을지 모르겠어요',
    {
      uz: 'Bu turar joyda avtoturargoh bormi, bilmayman.',
      en: "I'm not sure whether this apartment building has parking.",
      ru: 'Не знаю, есть ли у этого дома парковка.',
    },
  ),

  ...blank(
    'gp_s4_u4_g1_10',
    U4_G1,
    '다음 달까지 좋은 집을 구할 수 있을지 모르겠어요.',
    '구할 수 있을지 모르겠어요',
    {
      uz: 'Keyingi oygacha yaxshi uy topa olamanmi, bilmayman.',
      en: "I'm not sure whether I can find a good place by next month.",
      ru: 'Не знаю, смогу ли найти хорошее жильё до следующего месяца.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s4_u4_g1_11',
    U4_G1,
    [
      {
        options: ['이 동네가', '이 동네를', '이 동네는'],
        correct: '이 동네가',
      },
      {
        options: ['밤에도', '밤부터', '밤까지'],
        correct: '밤에도',
      },
      {
        options: [
          '조용할지 모르겠어요.',
          '조용한지 모르겠어요.',
          '조용하는지 모르겠어요.',
        ],
        correct: '조용할지 모르겠어요.',
      },
    ],
    {
      uz: 'Bu mahalla kechasi ham tinch bo‘ladimi, bilmayman.',
      en: "I'm not sure whether this neighborhood will be quiet at night.",
      ru: 'Не знаю, будет ли в этом районе тихо ночью.',
    },
  ),

  ...build(
    'gp_s4_u4_g1_12',
    U4_G1,
    [
      {
        options: ['관리비가', '관리비를', '관리비는'],
        correct: '관리비가',
      },
      {
        options: ['얼마나', '어디서', '누구를'],
        correct: '얼마나',
      },
      {
        options: [
          '나올지 모르겠어요.',
          '나오는지 모르겠어요.',
          '나온지 모르겠어요.',
        ],
        correct: '나올지 모르겠어요.',
      },
    ],
    {
      uz: 'Kommunal to‘lov qancha chiqishini bilmayman.',
      en: "I'm not sure how much the maintenance fee will be.",
      ru: 'Не знаю, сколько составят коммунальные расходы.',
    },
  ),

  ...build(
    'gp_s4_u4_g1_13',
    U4_G1,
    [
      {
        options: ['이 방에', '이 방을', '이 방이'],
        correct: '이 방에',
      },
      {
        options: ['책상이', '책상을', '책상은'],
        correct: '책상이',
      },
      {
        options: [
          '들어갈지 모르겠어요.',
          '들어가는지 모르겠어요.',
          '들어간지 모르겠어요.',
        ],
        correct: '들어갈지 모르겠어요.',
      },
    ],
    {
      uz: 'Bu xonaga stol sig‘adimi, bilmayman.',
      en: "I'm not sure whether a desk will fit in this room.",
      ru: 'Не знаю, поместится ли стол в этой комнате.',
    },
  ),

  ...build(
    'gp_s4_u4_g1_14',
    U4_G1,
    [
      {
        options: ['집주인이', '집주인을', '집주인은'],
        correct: '집주인이',
      },
      {
        options: ['보증금을', '보증금이', '보증금은'],
        correct: '보증금을',
      },
      {
        options: ['조금', '항상', '벌써'],
        correct: '조금',
      },
      {
        options: [
          '깎아 줄지 모르겠어요.',
          '깎아 주는지 모르겠어요.',
          '깎아 준지 모르겠어요.',
        ],
        correct: '깎아 줄지 모르겠어요.',
      },
    ],
    {
      uz: 'Uy egasi garovni biroz tushiradimi, bilmayman.',
      en: "I'm not sure whether the landlord will reduce the deposit.",
      ru: 'Не знаю, снизит ли хозяин залог.',
    },
  ),

  ...build(
    'gp_s4_u4_g1_15',
    U4_G1,
    [
      {
        options: ['주말에도', '주말마다를', '주말에게'],
        correct: '주말에도',
      },
      {
        options: ['주변이', '주변을', '주변은'],
        correct: '주변이',
      },
      {
        options: [
          '시끄러울지 모르겠어요.',
          '시끄러운지 모르겠어요.',
          '시끄럽는지 모르겠어요.',
        ],
        correct: '시끄러울지 모르겠어요.',
      },
    ],
    {
      uz: 'Dam olish kunlari ham atrof shovqinli bo‘ladimi, bilmayman.',
      en: "I'm not sure whether the area will be noisy on weekends.",
      ru: 'Не знаю, будет ли здесь шумно по выходным.',
    },
  ),

  ...build(
    'gp_s4_u4_g1_16',
    U4_G1,
    [
      {
        options: ['이 가격에', '이 가격을', '이 가격이'],
        correct: '이 가격에',
      },
      {
        options: ['더 넓은 집을', '더 넓은 집이', '더 넓은 집은'],
        correct: '더 넓은 집을',
      },
      {
        options: [
          '찾을 수 있을지 모르겠어요.',
          '찾는 수 있을지 모르겠어요.',
          '찾은 수 있을지 모르겠어요.',
        ],
        correct: '찾을 수 있을지 모르겠어요.',
      },
    ],
    {
      uz: 'Shu narxda kattaroq uy topa olamanmi, bilmayman.',
      en: "I'm not sure whether I can find a bigger home at this price.",
      ru: 'Не знаю, смогу ли найти жильё побольше за эту цену.',
    },
  ),

  ...build(
    'gp_s4_u4_g1_17',
    U4_G1,
    [
      {
        options: ['이 아파트에', '이 아파트를', '이 아파트가'],
        correct: '이 아파트에',
      },
      {
        options: ['주차장이', '주차장을', '주차장은'],
        correct: '주차장이',
      },
      {
        options: [
          '있을지 모르겠어요.',
          '있는지 모르겠어요.',
          '있은지 모르겠어요.',
        ],
        correct: '있을지 모르겠어요.',
      },
    ],
    {
      uz: 'Bu uyda avtoturargoh bormi, bilmayman.',
      en: "I'm not sure whether this apartment building has parking.",
      ru: 'Не знаю, есть ли здесь парковка.',
    },
  ),

  ...build(
    'gp_s4_u4_g1_18',
    U4_G1,
    [
      {
        options: ['다음 달까지', '지난달부터', '어제마다'],
        correct: '다음 달까지',
      },
      {
        options: ['좋은 집을', '좋은 집이', '좋은 집은'],
        correct: '좋은 집을',
      },
      {
        options: [
          '구할 수 있을지 모르겠어요.',
          '구하는 수 있을지 모르겠어요.',
          '구한 수 있을지 모르겠어요.',
        ],
        correct: '구할 수 있을지 모르겠어요.',
      },
    ],
    {
      uz: 'Keyingi oygacha yaxshi uy topa olamanmi, bilmayman.',
      en: "I'm not sure whether I can find a good place by next month.",
      ru: 'Не знаю, смогу ли найти хорошее жильё до следующего месяца.',
    },
  ),

  ...build(
    'gp_s4_u4_g1_19',
    U4_G1,
    [
      {
        options: ['지하철역까지', '지하철역을', '지하철역이'],
        correct: '지하철역까지',
      },
      {
        options: ['십 분이면', '십 분마다', '십 분부터'],
        correct: '십 분이면',
      },
      {
        options: [
          '갈 수 있을지 모르겠어요.',
          '가는 수 있을지 모르겠어요.',
          '간 수 있을지 모르겠어요.',
        ],
        correct: '갈 수 있을지 모르겠어요.',
      },
    ],
    {
      uz: 'Metroga o‘n daqiqada yetib borish mumkinmi, bilmayman.',
      en: "I'm not sure whether I can get to the subway station in ten minutes.",
      ru: 'Не знаю, можно ли добраться до метро за десять минут.',
    },
  ),

  ...build(
    'gp_s4_u4_g1_20',
    U4_G1,
    [
      {
        options: ['겨울에는', '겨울을', '겨울에게'],
        correct: '겨울에는',
      },
      {
        options: ['난방비가', '난방비를', '난방비는'],
        correct: '난방비가',
      },
      {
        options: ['많이', '조용히', '깨끗이'],
        correct: '많이',
      },
      {
        options: ['들지 모르겠어요.', '드는지 모르겠어요.', '든지 모르겠어요.'],
        correct: '들지 모르겠어요.',
      },
    ],
    {
      uz: 'Qishda isitish xarajati ko‘p bo‘ladimi, bilmayman.',
      en: "I'm not sure whether heating will cost a lot in winter.",
      ru: 'Не знаю, будут ли зимой большими расходы на отопление.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 2. A/V-기는 하지만
// ─────────────────────────────────────────────
const U4_G2 = 'av-gineun-hajiman';

const U4_G2_Q = {
  // grammar_blank 10
  ...blank(
    'gp_s4_u4_g2_01',
    U4_G2,
    '이 집은 넓기는 하지만 월세가 너무 비싸요.',
    '넓기는 하지만',
    {
      uz: 'Bu uy keng, lekin ijara haqi juda qimmat.',
      en: 'This home is spacious, but the monthly rent is too expensive.',
      ru: 'Квартира просторная, но аренда слишком дорогая.',
    },
  ),

  ...blank(
    'gp_s4_u4_g2_02',
    U4_G2,
    '지하철역에서 가깝기는 하지만 주변이 조금 시끄러워요.',
    '가깝기는 하지만',
    {
      uz: 'Metroga yaqin, lekin atrofi biroz shovqinli.',
      en: 'It is close to the subway, but the area is a little noisy.',
      ru: 'До метро близко, но вокруг немного шумно.',
    },
  ),

  ...blank(
    'gp_s4_u4_g2_03',
    U4_G2,
    '방이 작기는 하지만 혼자 살기에는 괜찮아요.',
    '작기는 하지만',
    {
      uz: 'Xona kichik, lekin yolg‘iz yashash uchun yetarli.',
      en: 'The room is small, but it is fine for living alone.',
      ru: 'Комната маленькая, но для одного человека вполне подходит.',
    },
  ),

  ...blank(
    'gp_s4_u4_g2_04',
    U4_G2,
    '이 동네가 조용하기는 하지만 교통이 조금 불편해요.',
    '조용하기는 하지만',
    {
      uz: 'Bu mahalla tinch, lekin transport biroz noqulay.',
      en: 'This neighborhood is quiet, but transportation is a little inconvenient.',
      ru: 'Район тихий, но с транспортом немного неудобно.',
    },
  ),

  ...blank(
    'gp_s4_u4_g2_05',
    U4_G2,
    '관리비가 싸기는 하지만 건물이 오래됐어요.',
    '싸기는 하지만',
    {
      uz: 'Kommunal to‘lov arzon, lekin bino eski.',
      en: 'The maintenance fee is cheap, but the building is old.',
      ru: 'Коммунальные расходы небольшие, но здание старое.',
    },
  ),

  ...blank(
    'gp_s4_u4_g2_06',
    U4_G2,
    '회사에서 멀기는 하지만 버스로 한 번에 갈 수 있어요.',
    '멀기는 하지만',
    {
      uz: 'Ishxonadan uzoq, lekin bir avtobusda yetib borish mumkin.',
      en: 'It is far from work, but I can get there on one bus.',
      ru: 'До работы далеко, но можно доехать на одном автобусе.',
    },
  ),

  ...blank(
    'gp_s4_u4_g2_07',
    U4_G2,
    '집이 마음에 들기는 하지만 조금 더 생각해 볼게요.',
    '마음에 들기는 하지만',
    {
      uz: 'Uy menga yoqdi, lekin yana biroz o‘ylab ko‘raman.',
      en: 'I do like the place, but I will think about it a little more.',
      ru: 'Квартира мне нравится, но я ещё немного подумаю.',
    },
  ),

  ...blank(
    'gp_s4_u4_g2_08',
    U4_G2,
    '주차장이 있기는 하지만 자리가 많지 않아요.',
    '있기는 하지만',
    {
      uz: 'Avtoturargoh bor, lekin joylar ko‘p emas.',
      en: 'There is parking, but there are not many spaces.',
      ru: 'Парковка есть, но мест немного.',
    },
  ),

  ...blank(
    'gp_s4_u4_g2_09',
    U4_G2,
    '엘리베이터가 없기는 하지만 집이 2층이라서 괜찮아요.',
    '없기는 하지만',
    {
      uz: 'Lift yo‘q, lekin uy ikkinchi qavatda, shuning uchun mayli.',
      en: 'There is no elevator, but the apartment is on the second floor, so it is okay.',
      ru: 'Лифта нет, но квартира на втором этаже, поэтому это не проблема.',
    },
  ),

  ...blank(
    'gp_s4_u4_g2_10',
    U4_G2,
    '매일 출퇴근하기는 하지만 생각보다 힘들지 않아요.',
    '출퇴근하기는 하지만',
    {
      uz: 'Har kuni ishga qatnayman, lekin o‘ylagandek qiyin emas.',
      en: 'I commute every day, but it is not as difficult as I expected.',
      ru: 'Я каждый день езжу на работу и обратно, но это не так тяжело, как я думал.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s4_u4_g2_11',
    U4_G2,
    [
      {
        options: ['이 집은', '이 집을', '이 집이'],
        correct: '이 집은',
      },
      {
        options: ['넓기는 하지만', '넓지만기는', '넓은기는 하지만'],
        correct: '넓기는 하지만',
      },
      {
        options: ['월세가', '월세를', '월세는'],
        correct: '월세가',
      },
      {
        options: ['너무 비싸요.', '너무 넓어요.', '너무 가까워요.'],
        correct: '너무 비싸요.',
      },
    ],
    {
      uz: 'Uy keng, lekin ijara haqi juda qimmat.',
      en: 'The home is spacious, but the monthly rent is too expensive.',
      ru: 'Жильё просторное, но аренда очень дорогая.',
    },
  ),

  ...build(
    'gp_s4_u4_g2_12',
    U4_G2,
    [
      {
        options: ['지하철역에서', '지하철역을', '지하철역이'],
        correct: '지하철역에서',
      },
      {
        options: ['가깝기는 하지만', '가까운기는 하지만', '가깝는기는 하지만'],
        correct: '가깝기는 하지만',
      },
      {
        options: ['주변이', '주변을', '주변은'],
        correct: '주변이',
      },
      {
        options: ['조금 시끄러워요.', '조금 넓어요.', '조금 싸요.'],
        correct: '조금 시끄러워요.',
      },
    ],
    {
      uz: 'Metro yaqin, lekin atrof biroz shovqinli.',
      en: 'It is close to the subway, but the area is a little noisy.',
      ru: 'Метро близко, но вокруг немного шумно.',
    },
  ),

  ...build(
    'gp_s4_u4_g2_13',
    U4_G2,
    [
      {
        options: ['방이', '방을', '방은'],
        correct: '방이',
      },
      {
        options: ['작기는 하지만', '작은기는 하지만', '작는기는 하지만'],
        correct: '작기는 하지만',
      },
      {
        options: ['혼자 살기에는', '혼자 살기부터', '혼자 살기마다'],
        correct: '혼자 살기에는',
      },
      {
        options: ['괜찮아요.', '비싸요.', '멀어요.'],
        correct: '괜찮아요.',
      },
    ],
    {
      uz: 'Xona kichik, lekin yolg‘iz yashash uchun yaxshi.',
      en: 'The room is small, but it is fine for living alone.',
      ru: 'Комната маленькая, но для одного человека подходит.',
    },
  ),

  ...build(
    'gp_s4_u4_g2_14',
    U4_G2,
    [
      {
        options: ['이 동네가', '이 동네를', '이 동네는'],
        correct: '이 동네가',
      },
      {
        options: [
          '조용하기는 하지만',
          '조용한기는 하지만',
          '조용하는기는 하지만',
        ],
        correct: '조용하기는 하지만',
      },
      {
        options: ['교통이', '교통을', '교통은'],
        correct: '교통이',
      },
      {
        options: ['조금 불편해요.', '조금 조용해요.', '조금 넓어요.'],
        correct: '조금 불편해요.',
      },
    ],
    {
      uz: 'Mahalla tinch, lekin transport noqulayroq.',
      en: 'The neighborhood is quiet, but transportation is a little inconvenient.',
      ru: 'Район тихий, но транспорт немного неудобный.',
    },
  ),

  ...build(
    'gp_s4_u4_g2_15',
    U4_G2,
    [
      {
        options: ['관리비가', '관리비를', '관리비는'],
        correct: '관리비가',
      },
      {
        options: ['싸기는 하지만', '싼기는 하지만', '싸는기는 하지만'],
        correct: '싸기는 하지만',
      },
      {
        options: ['건물이', '건물을', '건물은'],
        correct: '건물이',
      },
      {
        options: ['오래됐어요.', '넓어졌어요.', '가까워졌어요.'],
        correct: '오래됐어요.',
      },
    ],
    {
      uz: 'Kommunal to‘lov arzon, lekin bino eski.',
      en: 'The maintenance fee is cheap, but the building is old.',
      ru: 'Коммунальные расходы небольшие, но здание старое.',
    },
  ),

  ...build(
    'gp_s4_u4_g2_16',
    U4_G2,
    [
      {
        options: ['회사에서', '회사를', '회사가'],
        correct: '회사에서',
      },
      {
        options: ['멀기는 하지만', '먼기는 하지만', '멀는기는 하지만'],
        correct: '멀기는 하지만',
      },
      {
        options: ['버스로', '버스를', '버스가'],
        correct: '버스로',
      },
      {
        options: [
          '한 번에 갈 수 있어요.',
          '한 번에 먹을 수 있어요.',
          '한 번에 잘 수 있어요.',
        ],
        correct: '한 번에 갈 수 있어요.',
      },
    ],
    {
      uz: 'Ishxonadan uzoq, lekin bir avtobusda borish mumkin.',
      en: 'It is far from work, but I can get there on one bus.',
      ru: 'До работы далеко, но можно доехать без пересадки.',
    },
  ),

  ...build(
    'gp_s4_u4_g2_17',
    U4_G2,
    [
      {
        options: ['집이', '집을', '집은'],
        correct: '집이',
      },
      {
        options: [
          '마음에 들기는 하지만',
          '마음에 든기는 하지만',
          '마음에 드는기는 하지만',
        ],
        correct: '마음에 들기는 하지만',
      },
      {
        options: ['조금 더', '어제부터', '매일마다'],
        correct: '조금 더',
      },
      {
        options: ['생각해 볼게요.', '운동해 볼게요.', '먹어 볼게요.'],
        correct: '생각해 볼게요.',
      },
    ],
    {
      uz: 'Uy yoqdi, lekin yana biroz o‘ylab ko‘raman.',
      en: 'I like the place, but I will think about it a little more.',
      ru: 'Квартира мне нравится, но я ещё подумаю.',
    },
  ),

  ...build(
    'gp_s4_u4_g2_18',
    U4_G2,
    [
      {
        options: ['주차장이', '주차장을', '주차장은'],
        correct: '주차장이',
      },
      {
        options: ['있기는 하지만', '있는기는 하지만', '있은기는 하지만'],
        correct: '있기는 하지만',
      },
      {
        options: ['자리가', '자리를', '자리는'],
        correct: '자리가',
      },
      {
        options: ['많지 않아요.', '멀지 않아요.', '비싸지 않아요.'],
        correct: '많지 않아요.',
      },
    ],
    {
      uz: 'Avtoturargoh bor, lekin joylar ko‘p emas.',
      en: 'There is parking, but there are not many spaces.',
      ru: 'Парковка есть, но мест немного.',
    },
  ),

  ...build(
    'gp_s4_u4_g2_19',
    U4_G2,
    [
      {
        options: ['엘리베이터가', '엘리베이터를', '엘리베이터는'],
        correct: '엘리베이터가',
      },
      {
        options: ['없기는 하지만', '없는기는 하지만', '없은기는 하지만'],
        correct: '없기는 하지만',
      },
      {
        options: ['집이 2층이라서', '집을 2층이라서', '집에 2층이라서'],
        correct: '집이 2층이라서',
      },
      {
        options: ['괜찮아요.', '시끄러워요.', '멀어요.'],
        correct: '괜찮아요.',
      },
    ],
    {
      uz: 'Lift yo‘q, lekin uy ikkinchi qavatda, shuning uchun mayli.',
      en: 'There is no elevator, but the apartment is on the second floor.',
      ru: 'Лифта нет, но квартира на втором этаже, поэтому всё нормально.',
    },
  ),

  ...build(
    'gp_s4_u4_g2_20',
    U4_G2,
    [
      {
        options: ['매일', '어제', '다음 달'],
        correct: '매일',
      },
      {
        options: [
          '출퇴근하기는 하지만',
          '출퇴근한기는 하지만',
          '출퇴근하는기는 하지만',
        ],
        correct: '출퇴근하기는 하지만',
      },
      {
        options: ['생각보다', '회사부터', '집마다'],
        correct: '생각보다',
      },
      {
        options: ['힘들지 않아요.', '넓지 않아요.', '조용하지 않아요.'],
        correct: '힘들지 않아요.',
      },
    ],
    {
      uz: 'Har kuni qatnayman, lekin o‘ylagandek qiyin emas.',
      en: 'I commute every day, but it is not as difficult as expected.',
      ru: 'Я каждый день езжу на работу, но это не так тяжело, как ожидалось.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 3. A/V-기 때문에, N(이)기 때문에
// ─────────────────────────────────────────────
const U4_G3 = 'av-n-gi-ttaemune';

const U4_G3_Q = {
  // grammar_blank 10
  ...blank(
    'gp_s4_u4_g3_01',
    U4_G3,
    '주변이 조용하기 때문에 살기 좋아요.',
    '조용하기 때문에',
    {
      uz: 'Atrof tinch bo‘lgani uchun yashash yaxshi.',
      en: 'It is a good place to live because the area is quiet.',
      ru: 'Здесь хорошо жить, потому что вокруг тихо.',
    },
  ),

  ...blank(
    'gp_s4_u4_g3_02',
    U4_G3,
    '지하철역이 가깝기 때문에 출퇴근하기 편해요.',
    '가깝기 때문에',
    {
      uz: 'Metro yaqin bo‘lgani uchun qatnash qulay.',
      en: 'Commuting is convenient because the subway station is nearby.',
      ru: 'Удобно ездить на работу, потому что метро близко.',
    },
  ),

  ...blank(
    'gp_s4_u4_g3_03',
    U4_G3,
    '월세가 비싸기 때문에 다른 집도 알아보고 있어요.',
    '비싸기 때문에',
    {
      uz: 'Ijara qimmat bo‘lgani uchun boshqa uylarni ham ko‘ryapman.',
      en: 'Because the rent is expensive, I am looking at other places too.',
      ru: 'Поскольку аренда дорогая, я рассматриваю и другие варианты.',
    },
  ),

  ...blank(
    'gp_s4_u4_g3_04',
    U4_G3,
    '회사와 멀기 때문에 매일 일찍 나가야 해요.',
    '멀기 때문에',
    {
      uz: 'Ishxonadan uzoq bo‘lgani uchun har kuni erta chiqishim kerak.',
      en: 'Because it is far from work, I have to leave early every day.',
      ru: 'Поскольку до работы далеко, мне приходится каждый день выходить рано.',
    },
  ),

  ...blank(
    'gp_s4_u4_g3_05',
    U4_G3,
    '건물이 오래됐기 때문에 수리할 곳이 많아요.',
    '오래됐기 때문에',
    {
      uz: 'Bino eski bo‘lgani uchun ta’mirlash kerak bo‘lgan joy ko‘p.',
      en: 'Because the building is old, there are many places that need repair.',
      ru: 'Поскольку здание старое, многое нужно ремонтировать.',
    },
  ),

  ...blank(
    'gp_s4_u4_g3_06',
    U4_G3,
    '학생이기 때문에 학교 근처에서 살고 싶어요.',
    '학생이기 때문에',
    {
      uz: 'Talaba bo‘lganim uchun universitet yaqinida yashamoqchiman.',
      en: 'Because I am a student, I want to live near school.',
      ru: 'Поскольку я студент, я хочу жить рядом с университетом.',
    },
  ),

  ...blank(
    'gp_s4_u4_g3_07',
    U4_G3,
    '회사원이기 때문에 출퇴근 시간이 중요해요.',
    '회사원이기 때문에',
    {
      uz: 'Ofis xodimi bo‘lganim uchun yo‘lga ketadigan vaqt muhim.',
      en: 'Because I am an office worker, commuting time is important.',
      ru: 'Поскольку я офисный работник, время на дорогу для меня важно.',
    },
  ),

  ...blank(
    'gp_s4_u4_g3_08',
    U4_G3,
    '원룸이기 때문에 공간이 넓지는 않아요.',
    '원룸이기 때문에',
    {
      uz: 'Bu bir xonali uy bo‘lgani uchun joy juda katta emas.',
      en: 'Because it is a studio apartment, the space is not very large.',
      ru: 'Поскольку это студия, места не очень много.',
    },
  ),

  ...blank(
    'gp_s4_u4_g3_09',
    U4_G3,
    '교통이 편리하기 때문에 이 동네를 선택했어요.',
    '편리하기 때문에',
    {
      uz: 'Transport qulay bo‘lgani uchun shu mahallani tanladim.',
      en: 'I chose this neighborhood because transportation is convenient.',
      ru: 'Я выбрал этот район, потому что здесь удобный транспорт.',
    },
  ),

  ...blank(
    'gp_s4_u4_g3_10',
    U4_G3,
    '보증금이 너무 높기 때문에 계약하지 않았어요.',
    '높기 때문에',
    {
      uz: 'Garov juda yuqori bo‘lgani uchun shartnoma tuzmadim.',
      en: 'I did not sign the contract because the deposit was too high.',
      ru: 'Я не заключил договор, потому что залог был слишком высоким.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s4_u4_g3_11',
    U4_G3,
    [
      {
        options: ['주변이', '주변을', '주변은'],
        correct: '주변이',
      },
      {
        options: ['조용하기 때문에', '조용해서 때문에', '조용한 때문에'],
        correct: '조용하기 때문에',
      },
      {
        options: ['살기 좋아요.', '먹기 좋아요.', '마시기 좋아요.'],
        correct: '살기 좋아요.',
      },
    ],
    {
      uz: 'Atrof tinch bo‘lgani uchun yashash yaxshi.',
      en: 'It is good to live here because the area is quiet.',
      ru: 'Здесь хорошо жить, потому что вокруг тихо.',
    },
  ),

  ...build(
    'gp_s4_u4_g3_12',
    U4_G3,
    [
      {
        options: ['지하철역이', '지하철역을', '지하철역은'],
        correct: '지하철역이',
      },
      {
        options: ['가깝기 때문에', '가까워서 때문에', '가까운 때문에'],
        correct: '가깝기 때문에',
      },
      {
        options: ['출퇴근하기 편해요.', '요리하기 편해요.', '잠자기 편해요.'],
        correct: '출퇴근하기 편해요.',
      },
    ],
    {
      uz: 'Metro yaqin bo‘lgani uchun qatnash qulay.',
      en: 'Commuting is convenient because the subway is nearby.',
      ru: 'До работы удобно добираться, потому что метро рядом.',
    },
  ),

  ...build(
    'gp_s4_u4_g3_13',
    U4_G3,
    [
      {
        options: ['월세가', '월세를', '월세는'],
        correct: '월세가',
      },
      {
        options: ['비싸기 때문에', '비싸서 때문에', '비싼 때문에'],
        correct: '비싸기 때문에',
      },
      {
        options: ['다른 집도', '다른 집을만', '다른 집에게'],
        correct: '다른 집도',
      },
      {
        options: ['알아보고 있어요.', '먹고 있어요.', '자고 있어요.'],
        correct: '알아보고 있어요.',
      },
    ],
    {
      uz: 'Ijara qimmat bo‘lgani uchun boshqa uylarni ham ko‘ryapman.',
      en: 'I am looking at other places because the rent is expensive.',
      ru: 'Я смотрю другие варианты, потому что аренда дорогая.',
    },
  ),

  ...build(
    'gp_s4_u4_g3_14',
    U4_G3,
    [
      {
        options: ['회사와', '회사를', '회사에'],
        correct: '회사와',
      },
      {
        options: ['멀기 때문에', '멀어서 때문에', '먼 때문에'],
        correct: '멀기 때문에',
      },
      {
        options: ['매일', '어제', '지난달'],
        correct: '매일',
      },
      {
        options: ['일찍 나가야 해요.', '일찍 먹어야 해요.', '일찍 사야 해요.'],
        correct: '일찍 나가야 해요.',
      },
    ],
    {
      uz: 'Ishxonadan uzoq bo‘lgani uchun har kuni erta chiqish kerak.',
      en: 'Because it is far from work, I have to leave early every day.',
      ru: 'Поскольку до работы далеко, каждый день нужно выходить рано.',
    },
  ),

  ...build(
    'gp_s4_u4_g3_15',
    U4_G3,
    [
      {
        options: ['건물이', '건물을', '건물은'],
        correct: '건물이',
      },
      {
        options: ['오래됐기 때문에', '오래돼서 때문에', '오래된 때문에'],
        correct: '오래됐기 때문에',
      },
      {
        options: ['수리할 곳이', '수리할 곳을', '수리할 곳은'],
        correct: '수리할 곳이',
      },
      {
        options: ['많아요.', '가까워요.', '조용해요.'],
        correct: '많아요.',
      },
    ],
    {
      uz: 'Bino eski bo‘lgani uchun ta’mirlash joyi ko‘p.',
      en: 'Because the building is old, many places need repair.',
      ru: 'Здание старое, поэтому многое требует ремонта.',
    },
  ),

  ...build(
    'gp_s4_u4_g3_16',
    U4_G3,
    [
      {
        options: ['학생이기 때문에', '학생 때문에', '학생은기 때문에'],
        correct: '학생이기 때문에',
      },
      {
        options: ['학교 근처에서', '학교 근처를', '학교 근처가'],
        correct: '학교 근처에서',
      },
      {
        options: ['살고 싶어요.', '먹고 싶어요.', '마시고 싶어요.'],
        correct: '살고 싶어요.',
      },
    ],
    {
      uz: 'Talaba bo‘lganim uchun maktab yaqinida yashamoqchiman.',
      en: 'Because I am a student, I want to live near school.',
      ru: 'Поскольку я студент, хочу жить рядом с учебным заведением.',
    },
  ),

  ...build(
    'gp_s4_u4_g3_17',
    U4_G3,
    [
      {
        options: ['회사원이기 때문에', '회사원 때문에', '회사원은기 때문에'],
        correct: '회사원이기 때문에',
      },
      {
        options: ['출퇴근 시간이', '출퇴근 시간을', '출퇴근 시간은'],
        correct: '출퇴근 시간이',
      },
      {
        options: ['중요해요.', '매워요.', '좁아요.'],
        correct: '중요해요.',
      },
    ],
    {
      uz: 'Ofis xodimi bo‘lganim uchun qatnov vaqti muhim.',
      en: 'Because I am an office worker, commuting time is important.',
      ru: 'Поскольку я офисный работник, время на дорогу важно.',
    },
  ),

  ...build(
    'gp_s4_u4_g3_18',
    U4_G3,
    [
      {
        options: ['원룸이기 때문에', '원룸 때문에', '원룸은기 때문에'],
        correct: '원룸이기 때문에',
      },
      {
        options: ['공간이', '공간을', '공간은'],
        correct: '공간이',
      },
      {
        options: ['넓지는 않아요.', '멀지는 않아요.', '맵지는 않아요.'],
        correct: '넓지는 않아요.',
      },
    ],
    {
      uz: 'Bir xonali uy bo‘lgani uchun joy katta emas.',
      en: 'Because it is a studio apartment, it is not very spacious.',
      ru: 'Поскольку это студия, места не очень много.',
    },
  ),

  ...build(
    'gp_s4_u4_g3_19',
    U4_G3,
    [
      {
        options: ['교통이', '교통을', '교통은'],
        correct: '교통이',
      },
      {
        options: ['편리하기 때문에', '편리해서 때문에', '편리한 때문에'],
        correct: '편리하기 때문에',
      },
      {
        options: ['이 동네를', '이 동네가', '이 동네는'],
        correct: '이 동네를',
      },
      {
        options: ['선택했어요.', '마셨어요.', '입었어요.'],
        correct: '선택했어요.',
      },
    ],
    {
      uz: 'Transport qulay bo‘lgani uchun shu mahallani tanladim.',
      en: 'I chose this neighborhood because transportation is convenient.',
      ru: 'Я выбрал этот район, потому что транспорт удобный.',
    },
  ),

  ...build(
    'gp_s4_u4_g3_20',
    U4_G3,
    [
      {
        options: ['보증금이', '보증금을', '보증금은'],
        correct: '보증금이',
      },
      {
        options: ['너무', '가끔', '먼저'],
        correct: '너무',
      },
      {
        options: ['높기 때문에', '높아서 때문에', '높은 때문에'],
        correct: '높기 때문에',
      },
      {
        options: [
          '계약하지 않았어요.',
          '요리하지 않았어요.',
          '운동하지 않았어요.',
        ],
        correct: '계약하지 않았어요.',
      },
    ],
    {
      uz: 'Garov juda yuqori bo‘lgani uchun shartnoma tuzmadim.',
      en: 'I did not sign the contract because the deposit was too high.',
      ru: 'Я не подписал договор, потому что залог был слишком высоким.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 4. V-기(가) A
// ─────────────────────────────────────────────
const U4_G4 = 'verb-gi-ga-adjective';

const U4_G4_Q = {
  // grammar_blank 10
  ...blank(
    'gp_s4_u4_g4_01',
    U4_G4,
    '이 동네는 조용해서 살기가 좋아요.',
    '살기가 좋아요',
    {
      uz: 'Bu mahalla tinch, shuning uchun yashash yaxshi.',
      en: 'This neighborhood is quiet, so it is pleasant to live here.',
      ru: 'Район тихий, поэтому здесь приятно жить.',
    },
  ),

  ...blank(
    'gp_s4_u4_g4_02',
    U4_G4,
    '지하철역이 가까워서 출퇴근하기가 편해요.',
    '출퇴근하기가 편해요',
    {
      uz: 'Metro yaqin bo‘lgani uchun ishga qatnash qulay.',
      en: 'Because the subway is nearby, commuting is convenient.',
      ru: 'Метро близко, поэтому удобно ездить на работу.',
    },
  ),

  ...blank(
    'gp_s4_u4_g4_03',
    U4_G4,
    '이 방은 구조가 단순해서 청소하기가 쉬워요.',
    '청소하기가 쉬워요',
    {
      uz: 'Xona tuzilishi oddiy, shuning uchun tozalash oson.',
      en: 'The room has a simple layout, so it is easy to clean.',
      ru: 'Планировка простая, поэтому комнату легко убирать.',
    },
  ),

  ...blank(
    'gp_s4_u4_g4_04',
    U4_G4,
    '주차 공간이 좁아서 주차하기가 어려워요.',
    '주차하기가 어려워요',
    {
      uz: 'Avtoturargoh tor bo‘lgani uchun mashina qo‘yish qiyin.',
      en: 'The parking space is narrow, so parking is difficult.',
      ru: 'Парковочное место узкое, поэтому парковаться трудно.',
    },
  ),

  ...blank(
    'gp_s4_u4_g4_05',
    U4_G4,
    '시장과 마트가 가까워서 장보기가 편해요.',
    '장보기가 편해요',
    {
      uz: 'Bozor va supermarket yaqin, shuning uchun xarid qilish qulay.',
      en: 'The market and supermarket are nearby, so grocery shopping is convenient.',
      ru: 'Рынок и магазин рядом, поэтому удобно покупать продукты.',
    },
  ),

  ...blank(
    'gp_s4_u4_g4_06',
    U4_G4,
    '버스가 자주 와서 학교에 가기가 편해요.',
    '가기가 편해요',
    {
      uz: 'Avtobus tez-tez kelgani uchun maktabga borish qulay.',
      en: 'Buses come frequently, so it is convenient to get to school.',
      ru: 'Автобусы ходят часто, поэтому удобно добираться до школы.',
    },
  ),

  ...blank(
    'gp_s4_u4_g4_07',
    U4_G4,
    '방이 너무 좁아서 큰 가구를 놓기가 어려워요.',
    '놓기가 어려워요',
    {
      uz: 'Xona juda tor, shuning uchun katta mebel qo‘yish qiyin.',
      en: 'The room is too small, so it is difficult to place large furniture.',
      ru: 'Комната слишком маленькая, поэтому трудно поставить большую мебель.',
    },
  ),

  ...blank(
    'gp_s4_u4_g4_08',
    U4_G4,
    '공원이 가까워서 아침마다 운동하기 좋아요.',
    '운동하기 좋아요',
    {
      uz: 'Park yaqin, shuning uchun ertalab mashq qilish yaxshi.',
      en: 'The park is nearby, so it is nice to exercise every morning.',
      ru: 'Парк рядом, поэтому здесь удобно заниматься по утрам.',
    },
  ),

  ...blank(
    'gp_s4_u4_g4_09',
    U4_G4,
    '계단이 너무 가팔라서 무거운 짐을 옮기기가 힘들어요.',
    '옮기기가 힘들어요',
    {
      uz: 'Zina tik bo‘lgani uchun og‘ir yukni ko‘tarish qiyin.',
      en: 'The stairs are very steep, so moving heavy luggage is difficult.',
      ru: 'Лестница очень крутая, поэтому тяжело переносить тяжёлые вещи.',
    },
  ),

  ...blank(
    'gp_s4_u4_g4_10',
    U4_G4,
    '창문이 커서 낮에는 책을 읽기가 좋아요.',
    '읽기가 좋아요',
    {
      uz: 'Deraza katta, shuning uchun kunduzi kitob o‘qish yaxshi.',
      en: 'The window is large, so it is pleasant to read during the day.',
      ru: 'Окно большое, поэтому днём здесь приятно читать.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s4_u4_g4_11',
    U4_G4,
    [
      {
        options: ['이 동네는', '이 동네를', '이 동네가'],
        correct: '이 동네는',
      },
      {
        options: ['조용해서', '비싸서', '좁아서'],
        correct: '조용해서',
      },
      {
        options: ['살기가 좋아요.', '사는가 좋아요.', '살기가 좋는요.'],
        correct: '살기가 좋아요.',
      },
    ],
    {
      uz: 'Bu mahalla tinch, shuning uchun yashash yaxshi.',
      en: 'This neighborhood is quiet, so it is pleasant to live here.',
      ru: 'Район тихий, поэтому здесь приятно жить.',
    },
  ),

  ...build(
    'gp_s4_u4_g4_12',
    U4_G4,
    [
      {
        options: ['지하철역이', '지하철역을', '지하철역은'],
        correct: '지하철역이',
      },
      {
        options: ['가까워서', '멀어서', '좁아서'],
        correct: '가까워서',
      },
      {
        options: [
          '출퇴근하기가 편해요.',
          '출퇴근하는가 편해요.',
          '출퇴근하기는 편한요.',
        ],
        correct: '출퇴근하기가 편해요.',
      },
    ],
    {
      uz: 'Metro yaqin bo‘lgani uchun qatnash qulay.',
      en: 'The subway is nearby, so commuting is convenient.',
      ru: 'Метро рядом, поэтому удобно ездить на работу.',
    },
  ),

  ...build(
    'gp_s4_u4_g4_13',
    U4_G4,
    [
      {
        options: ['이 방은', '이 방을', '이 방이'],
        correct: '이 방은',
      },
      {
        options: ['구조가 단순해서', '구조를 단순해서', '구조는 단순하고를'],
        correct: '구조가 단순해서',
      },
      {
        options: [
          '청소하기가 쉬워요.',
          '청소하는가 쉬워요.',
          '청소하기 쉬운요.',
        ],
        correct: '청소하기가 쉬워요.',
      },
    ],
    {
      uz: 'Xonaning tuzilishi oddiy, shuning uchun tozalash oson.',
      en: 'The room has a simple layout, so it is easy to clean.',
      ru: 'Планировка комнаты простая, поэтому её легко убирать.',
    },
  ),

  ...build(
    'gp_s4_u4_g4_14',
    U4_G4,
    [
      {
        options: ['주차 공간이', '주차 공간을', '주차 공간은'],
        correct: '주차 공간이',
      },
      {
        options: ['좁아서', '넓어서', '조용해서'],
        correct: '좁아서',
      },
      {
        options: [
          '주차하기가 어려워요.',
          '주차하는가 어려워요.',
          '주차하기가 어려운요.',
        ],
        correct: '주차하기가 어려워요.',
      },
    ],
    {
      uz: 'Joy tor bo‘lgani uchun mashina qo‘yish qiyin.',
      en: 'The parking space is narrow, so parking is difficult.',
      ru: 'Парковочное место узкое, поэтому парковаться трудно.',
    },
  ),

  ...build(
    'gp_s4_u4_g4_15',
    U4_G4,
    [
      {
        options: ['시장과 마트가', '시장과 마트를', '시장과 마트는'],
        correct: '시장과 마트가',
      },
      {
        options: ['가까워서', '비싸서', '좁아서'],
        correct: '가까워서',
      },
      {
        options: ['장보기가 편해요.', '장보는가 편해요.', '장보기가 편한요.'],
        correct: '장보기가 편해요.',
      },
    ],
    {
      uz: 'Bozor va supermarket yaqin bo‘lgani uchun xarid qilish qulay.',
      en: 'The market and supermarket are nearby, so grocery shopping is convenient.',
      ru: 'Рынок и магазин рядом, поэтому удобно покупать продукты.',
    },
  ),

  ...build(
    'gp_s4_u4_g4_16',
    U4_G4,
    [
      {
        options: ['버스가', '버스를', '버스는'],
        correct: '버스가',
      },
      {
        options: ['자주 와서', '가끔 먹어서', '많이 자서'],
        correct: '자주 와서',
      },
      {
        options: ['학교에', '학교를', '학교가'],
        correct: '학교에',
      },
      {
        options: ['가기가 편해요.', '가는가 편해요.', '가기가 편한요.'],
        correct: '가기가 편해요.',
      },
    ],
    {
      uz: 'Avtobus tez-tez keladi, shuning uchun maktabga borish qulay.',
      en: 'Buses come frequently, so it is convenient to get to school.',
      ru: 'Автобусы ходят часто, поэтому удобно добираться до школы.',
    },
  ),

  ...build(
    'gp_s4_u4_g4_17',
    U4_G4,
    [
      {
        options: ['방이', '방을', '방은'],
        correct: '방이',
      },
      {
        options: ['너무 좁아서', '너무 넓어서', '너무 조용해서'],
        correct: '너무 좁아서',
      },
      {
        options: ['큰 가구를', '큰 가구가', '큰 가구는'],
        correct: '큰 가구를',
      },
      {
        options: ['놓기가 어려워요.', '놓는가 어려워요.', '놓기가 어려운요.'],
        correct: '놓기가 어려워요.',
      },
    ],
    {
      uz: 'Xona juda tor, katta mebel qo‘yish qiyin.',
      en: 'The room is very small, so it is difficult to place large furniture.',
      ru: 'Комната очень маленькая, поэтому большую мебель поставить трудно.',
    },
  ),

  ...build(
    'gp_s4_u4_g4_18',
    U4_G4,
    [
      {
        options: ['공원이', '공원을', '공원은'],
        correct: '공원이',
      },
      {
        options: ['가까워서', '멀어서', '비싸서'],
        correct: '가까워서',
      },
      {
        options: ['아침마다', '어제부터', '내년까지'],
        correct: '아침마다',
      },
      {
        options: ['운동하기 좋아요.', '운동하는가 좋아요.', '운동하기 좋은요.'],
        correct: '운동하기 좋아요.',
      },
    ],
    {
      uz: 'Park yaqin, shuning uchun har tong mashq qilish yaxshi.',
      en: 'The park is nearby, so it is nice to exercise every morning.',
      ru: 'Парк рядом, поэтому удобно заниматься каждое утро.',
    },
  ),

  ...build(
    'gp_s4_u4_g4_19',
    U4_G4,
    [
      {
        options: ['계단이', '계단을', '계단은'],
        correct: '계단이',
      },
      {
        options: ['너무 가팔라서', '너무 조용해서', '너무 가까워서'],
        correct: '너무 가팔라서',
      },
      {
        options: ['무거운 짐을', '무거운 짐이', '무거운 짐은'],
        correct: '무거운 짐을',
      },
      {
        options: [
          '옮기기가 힘들어요.',
          '옮기는가 힘들어요.',
          '옮기기가 힘든요.',
        ],
        correct: '옮기기가 힘들어요.',
      },
    ],
    {
      uz: 'Zina tik bo‘lgani uchun og‘ir yuk ko‘tarish qiyin.',
      en: 'The stairs are steep, so moving heavy luggage is difficult.',
      ru: 'Лестница крутая, поэтому переносить тяжёлые вещи трудно.',
    },
  ),

  ...build(
    'gp_s4_u4_g4_20',
    U4_G4,
    [
      {
        options: ['창문이', '창문을', '창문은'],
        correct: '창문이',
      },
      {
        options: ['커서', '작아서', '멀어서'],
        correct: '커서',
      },
      {
        options: ['낮에는', '낮부터', '낮마다를'],
        correct: '낮에는',
      },
      {
        options: [
          '책을 읽기가 좋아요.',
          '책을 읽는가 좋아요.',
          '책을 읽기가 좋은요.',
        ],
        correct: '책을 읽기가 좋아요.',
      },
    ],
    {
      uz: 'Deraza katta bo‘lgani uchun kunduzi kitob o‘qish yaxshi.',
      en: 'The window is large, so it is pleasant to read during the day.',
      ru: 'Окно большое, поэтому днём здесь приятно читать.',
    },
  ),
};
// ═══════════════════════════════════════════════════════════
// UNIT 5 · 14과
// 여기서 사진을 찍어도 돼요?
// ═══════════════════════════════════════════════════════════

// ─────────────────────────────────────────────
// 문법 1. V-(으)ㄴ 적(이) 있다(없다)
// ─────────────────────────────────────────────
const U5_G1 = 'verb-eun-jeok-itda-eopda';

const U5_G1_Q = {
  // grammar_blank 10
  ...blank(
    'gp_s4_u5_g1_01',
    U5_G1,
    '한국의 전통 시장에 가 본 적이 있어요.',
    '가 본 적이 있어요',
    {
      uz: 'Koreyaning an’anaviy bozoriga borib ko‘rganman.',
      en: 'I have been to a traditional Korean market before.',
      ru: 'Я бывал на традиционном корейском рынке.',
    },
  ),

  ...blank(
    'gp_s4_u5_g1_02',
    U5_G1,
    '한복을 입은 적이 있어요?',
    '입은 적이 있어요?',
    {
      uz: 'Hanbok kiyganmisiz?',
      en: 'Have you ever worn hanbok?',
      ru: 'Вы когда-нибудь носили ханбок?',
    },
  ),

  ...blank(
    'gp_s4_u5_g1_03',
    U5_G1,
    '저는 아직 제주도에 간 적이 없어요.',
    '간 적이 없어요',
    {
      uz: 'Men hali Jejuga borgan emasman.',
      en: 'I have never been to Jeju Island.',
      ru: 'Я ещё ни разу не был на острове Чеджу.',
    },
  ),

  ...blank(
    'gp_s4_u5_g1_04',
    U5_G1,
    '한국에서 기차를 타 본 적이 있어요.',
    '타 본 적이 있어요',
    {
      uz: 'Koreyada poyezdda yurib ko‘rganman.',
      en: 'I have taken a train in Korea before.',
      ru: 'Я уже ездил на поезде в Корее.',
    },
  ),

  ...blank(
    'gp_s4_u5_g1_05',
    U5_G1,
    '궁에서 전통 공연을 본 적이 있어요.',
    '본 적이 있어요',
    {
      uz: 'Saroyda an’anaviy tomoshani ko‘rganman.',
      en: 'I have seen a traditional performance at a palace.',
      ru: 'Я видел традиционное представление во дворце.',
    },
  ),

  ...blank(
    'gp_s4_u5_g1_06',
    U5_G1,
    '저는 한국에서 길을 잃은 적이 있어요.',
    '길을 잃은 적이 있어요',
    {
      uz: 'Men Koreyada yo‘limni yo‘qotganman.',
      en: 'I have gotten lost in Korea before.',
      ru: 'Я однажды заблудился в Корее.',
    },
  ),

  ...blank(
    'gp_s4_u5_g1_07',
    U5_G1,
    '아직 한국에서 병원에 간 적은 없어요.',
    '간 적은 없어요',
    {
      uz: 'Koreyada hali kasalxonaga borganim yo‘q.',
      en: 'I have not been to a hospital in Korea yet.',
      ru: 'Я ещё ни разу не ходил в больницу в Корее.',
    },
  ),

  ...blank(
    'gp_s4_u5_g1_08',
    U5_G1,
    '서울에서 자전거를 빌려 탄 적이 있어요.',
    '빌려 탄 적이 있어요',
    {
      uz: 'Seulda velosiped ijaraga olib minganman.',
      en: 'I have rented and ridden a bicycle in Seoul.',
      ru: 'Я брал велосипед напрокат и катался на нём в Сеуле.',
    },
  ),

  ...blank(
    'gp_s4_u5_g1_09',
    U5_G1,
    '한국 친구 집에서 자 본 적이 없어요.',
    '자 본 적이 없어요',
    {
      uz: 'Koreys do‘stimning uyida tunab ko‘rmaganman.',
      en: "I have never stayed overnight at a Korean friend's home.",
      ru: 'Я никогда не ночевал у корейского друга.',
    },
  ),

  ...blank(
    'gp_s4_u5_g1_10',
    U5_G1,
    '외국에서 혼자 여행한 적이 있어요?',
    '여행한 적이 있어요?',
    {
      uz: 'Chet elda yolg‘iz sayohat qilganmisiz?',
      en: 'Have you ever traveled abroad alone?',
      ru: 'Вы когда-нибудь путешествовали за границей в одиночку?',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s4_u5_g1_11',
    U5_G1,
    [
      {
        options: ['한복을', '한복이', '한복은'],
        correct: '한복을',
      },
      {
        options: [
          '입은 적이 있어요?',
          '입는 적이 있어요?',
          '입을 적이 있어요?',
        ],
        correct: '입은 적이 있어요?',
      },
    ],
    {
      uz: 'Hanbok kiyganmisiz?',
      en: 'Have you ever worn hanbok?',
      ru: 'Вы когда-нибудь носили ханбок?',
    },
  ),

  ...build(
    'gp_s4_u5_g1_12',
    U5_G1,
    [
      {
        options: ['저는', '제가', '저를'],
        correct: '저는',
      },
      {
        options: ['아직', '벌써', '항상'],
        correct: '아직',
      },
      {
        options: ['제주도에', '제주도를', '제주도가'],
        correct: '제주도에',
      },
      {
        options: ['간 적이 없어요.', '가는 적이 없어요.', '갈 적이 없어요.'],
        correct: '간 적이 없어요.',
      },
    ],
    {
      uz: 'Men hali Jejuga borgan emasman.',
      en: 'I have never been to Jeju Island.',
      ru: 'Я ещё не был на Чеджу.',
    },
  ),

  ...build(
    'gp_s4_u5_g1_13',
    U5_G1,
    [
      {
        options: ['한국에서', '한국을', '한국이'],
        correct: '한국에서',
      },
      {
        options: ['기차를', '기차가', '기차는'],
        correct: '기차를',
      },
      {
        options: [
          '타 본 적이 있어요.',
          '타 보는 적이 있어요.',
          '타 볼 적이 있어요.',
        ],
        correct: '타 본 적이 있어요.',
      },
    ],
    {
      uz: 'Koreyada poyezdda yurib ko‘rganman.',
      en: 'I have taken a train in Korea before.',
      ru: 'Я ездил на поезде в Корее.',
    },
  ),

  ...build(
    'gp_s4_u5_g1_14',
    U5_G1,
    [
      {
        options: ['궁에서', '궁에', '궁을'],
        correct: '궁에서',
      },
      {
        options: ['전통 공연을', '전통 공연이', '전통 공연은'],
        correct: '전통 공연을',
      },
      {
        options: ['본 적이 있어요.', '보는 적이 있어요.', '볼 적이 있어요.'],
        correct: '본 적이 있어요.',
      },
    ],
    {
      uz: 'Saroyda an’anaviy tomosha ko‘rganman.',
      en: 'I have seen a traditional performance at a palace.',
      ru: 'Я видел традиционное представление во дворце.',
    },
  ),

  ...build(
    'gp_s4_u5_g1_15',
    U5_G1,
    [
      {
        options: ['저는', '제가', '저를'],
        correct: '저는',
      },
      {
        options: ['한국에서', '한국에', '한국을'],
        correct: '한국에서',
      },
      {
        options: ['길을', '길이', '길은'],
        correct: '길을',
      },
      {
        options: [
          '잃은 적이 있어요.',
          '잃는 적이 있어요.',
          '잃을 적이 있어요.',
        ],
        correct: '잃은 적이 있어요.',
      },
    ],
    {
      uz: 'Men Koreyada bir marta yo‘limni yo‘qotganman.',
      en: 'I have gotten lost in Korea before.',
      ru: 'Я уже терял дорогу в Корее.',
    },
  ),

  ...build(
    'gp_s4_u5_g1_16',
    U5_G1,
    [
      {
        options: ['아직', '벌써', '매일'],
        correct: '아직',
      },
      {
        options: ['한국에서', '한국을', '한국이'],
        correct: '한국에서',
      },
      {
        options: ['병원에', '병원을', '병원이'],
        correct: '병원에',
      },
      {
        options: ['간 적은 없어요.', '가는 적은 없어요.', '갈 적은 없어요.'],
        correct: '간 적은 없어요.',
      },
    ],
    {
      uz: 'Koreyada hali kasalxonaga borganim yo‘q.',
      en: 'I have not been to a hospital in Korea yet.',
      ru: 'Я ещё не был в больнице в Корее.',
    },
  ),

  ...build(
    'gp_s4_u5_g1_17',
    U5_G1,
    [
      {
        options: ['서울에서', '서울에', '서울을'],
        correct: '서울에서',
      },
      {
        options: ['자전거를', '자전거가', '자전거는'],
        correct: '자전거를',
      },
      {
        options: [
          '빌려 탄 적이 있어요.',
          '빌려 타는 적이 있어요.',
          '빌려 탈 적이 있어요.',
        ],
        correct: '빌려 탄 적이 있어요.',
      },
    ],
    {
      uz: 'Seulda velosiped ijaraga olib minganman.',
      en: 'I have rented and ridden a bicycle in Seoul.',
      ru: 'Я катался на арендованном велосипеде в Сеуле.',
    },
  ),

  ...build(
    'gp_s4_u5_g1_18',
    U5_G1,
    [
      {
        options: ['한국 친구 집에서', '한국 친구 집을', '한국 친구 집이'],
        correct: '한국 친구 집에서',
      },
      {
        options: [
          '자 본 적이 없어요.',
          '자 보는 적이 없어요.',
          '자 볼 적이 없어요.',
        ],
        correct: '자 본 적이 없어요.',
      },
    ],
    {
      uz: 'Koreys do‘stimning uyida tunab ko‘rmaganman.',
      en: "I have never stayed at a Korean friend's home.",
      ru: 'Я никогда не ночевал у корейского друга.',
    },
  ),

  ...build(
    'gp_s4_u5_g1_19',
    U5_G1,
    [
      {
        options: ['외국에서', '외국에', '외국을'],
        correct: '외국에서',
      },
      {
        options: ['혼자', '벌써', '아직'],
        correct: '혼자',
      },
      {
        options: [
          '여행한 적이 있어요?',
          '여행하는 적이 있어요?',
          '여행할 적이 있어요?',
        ],
        correct: '여행한 적이 있어요?',
      },
    ],
    {
      uz: 'Chet elda yolg‘iz sayohat qilganmisiz?',
      en: 'Have you ever traveled abroad alone?',
      ru: 'Вы когда-нибудь путешествовали за границей один?',
    },
  ),

  ...build(
    'gp_s4_u5_g1_20',
    U5_G1,
    [
      {
        options: ['전통 시장에', '전통 시장을', '전통 시장이'],
        correct: '전통 시장에',
      },
      {
        options: [
          '가 본 적이 있어요.',
          '가 보는 적이 있어요.',
          '가 볼 적이 있어요.',
        ],
        correct: '가 본 적이 있어요.',
      },
    ],
    {
      uz: 'An’anaviy bozorga borib ko‘rganman.',
      en: 'I have been to a traditional market before.',
      ru: 'Я бывал на традиционном рынке.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 2. A/V-았을/었을 때
// ─────────────────────────────────────────────
const U5_G2 = 'av-asseul-eosseul-ttae';

const U5_G2_Q = {
  // grammar_blank 10
  ...blank(
    'gp_s4_u5_g2_01',
    U5_G2,
    '한국에 처음 왔을 때 모든 것이 신기했어요.',
    '왔을 때',
    {
      uz: 'Koreyaga birinchi kelganimda hamma narsa qiziq edi.',
      en: 'When I first came to Korea, everything was fascinating.',
      ru: 'Когда я впервые приехал в Корею, всё казалось необычным.',
    },
  ),

  ...blank(
    'gp_s4_u5_g2_02',
    U5_G2,
    '어렸을 때 가족과 여행을 많이 했어요.',
    '어렸을 때',
    {
      uz: 'Yoshligimda oilam bilan ko‘p sayohat qilganman.',
      en: 'When I was young, I traveled a lot with my family.',
      ru: 'Когда я был маленьким, я много путешествовал с семьёй.',
    },
  ),

  ...blank(
    'gp_s4_u5_g2_03',
    U5_G2,
    '지난번에 궁에 갔을 때 사진을 많이 찍었어요.',
    '갔을 때',
    {
      uz: 'O‘tgan safar saroyga borganimda ko‘p suratga tushdim.',
      en: 'When I went to the palace last time, I took many pictures.',
      ru: 'Когда я в прошлый раз ходил во дворец, я сделал много фотографий.',
    },
  ),

  ...blank(
    'gp_s4_u5_g2_04',
    U5_G2,
    '길을 잃었을 때 경찰에게 도움을 요청했어요.',
    '잃었을 때',
    {
      uz: 'Yo‘limni yo‘qotganimda politsiyadan yordam so‘radim.',
      en: 'When I got lost, I asked the police for help.',
      ru: 'Когда я заблудился, я попросил помощи у полиции.',
    },
  ),

  ...blank(
    'gp_s4_u5_g2_05',
    U5_G2,
    '날씨가 좋았을 때 한강에서 자전거를 탔어요.',
    '좋았을 때',
    {
      uz: 'Havo yaxshi bo‘lganida Han daryosi bo‘yida velosiped mindim.',
      en: 'When the weather was nice, I rode a bicycle by the Han River.',
      ru: 'Когда погода была хорошей, я катался на велосипеде у реки Хан.',
    },
  ),

  ...blank(
    'gp_s4_u5_g2_06',
    U5_G2,
    '몸이 아팠을 때 친구가 약을 사다 줬어요.',
    '아팠을 때',
    {
      uz: 'Kasal bo‘lganimda do‘stim menga dori olib keldi.',
      en: 'When I was sick, my friend bought medicine for me.',
      ru: 'Когда я болел, друг купил мне лекарство.',
    },
  ),

  ...blank(
    'gp_s4_u5_g2_07',
    U5_G2,
    '한국어를 잘 못했을 때 말하기가 제일 어려웠어요.',
    '잘 못했을 때',
    {
      uz: 'Koreys tilini yaxshi bilmaganimda gapirish eng qiyin edi.',
      en: 'When I could not speak Korean well, speaking was the hardest part.',
      ru: 'Когда я плохо знал корейский, говорить было труднее всего.',
    },
  ),

  ...blank(
    'gp_s4_u5_g2_08',
    U5_G2,
    '친구를 처음 만났을 때 조금 긴장했어요.',
    '만났을 때',
    {
      uz: 'Do‘stim bilan birinchi uchrashganimda biroz hayajonlandim.',
      en: 'When I first met my friend, I was a little nervous.',
      ru: 'Когда я впервые встретил друга, я немного волновался.',
    },
  ),

  ...blank(
    'gp_s4_u5_g2_09',
    U5_G2,
    '시간이 없었을 때는 편의점에서 간단히 먹었어요.',
    '없었을 때는',
    {
      uz: 'Vaqtim bo‘lmaganida do‘konda tez ovqatlanardim.',
      en: 'When I had no time, I ate something simple at a convenience store.',
      ru: 'Когда не было времени, я быстро ел в магазине.',
    },
  ),

  ...blank(
    'gp_s4_u5_g2_10',
    U5_G2,
    '처음 한복을 입었을 때 정말 특별한 기분이 들었어요.',
    '입었을 때',
    {
      uz: 'Birinchi marta hanbok kiyganimda o‘zgacha his qildim.',
      en: 'When I wore hanbok for the first time, it felt very special.',
      ru: 'Когда я впервые надел ханбок, ощущения были особенными.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s4_u5_g2_11',
    U5_G2,
    [
      {
        options: ['한국에', '한국을', '한국이'],
        correct: '한국에',
      },
      {
        options: ['처음', '매일', '벌써'],
        correct: '처음',
      },
      {
        options: ['왔을 때', '올 때', '오는 때'],
        correct: '왔을 때',
      },
      {
        options: [
          '모든 것이 신기했어요.',
          '모든 것을 먹었어요.',
          '모든 것이 비쌌어요.',
        ],
        correct: '모든 것이 신기했어요.',
      },
    ],
    {
      uz: 'Koreyaga birinchi kelganimda hamma narsa qiziq edi.',
      en: 'When I first came to Korea, everything was fascinating.',
      ru: 'Когда я впервые приехал в Корею, всё казалось необычным.',
    },
  ),

  ...build(
    'gp_s4_u5_g2_12',
    U5_G2,
    [
      {
        options: ['어렸을 때', '어릴 때', '어리는 때'],
        correct: '어렸을 때',
      },
      {
        options: ['가족과', '가족을', '가족이'],
        correct: '가족과',
      },
      {
        options: [
          '여행을 많이 했어요.',
          '여행을 많이 해요.',
          '여행을 많이 할 거예요.',
        ],
        correct: '여행을 많이 했어요.',
      },
    ],
    {
      uz: 'Yoshligimda oilam bilan ko‘p sayohat qilganman.',
      en: 'When I was young, I traveled a lot with my family.',
      ru: 'В детстве я много путешествовал с семьёй.',
    },
  ),

  ...build(
    'gp_s4_u5_g2_13',
    U5_G2,
    [
      {
        options: ['지난번에', '다음번에', '내일부터'],
        correct: '지난번에',
      },
      {
        options: ['궁에', '궁을', '궁이'],
        correct: '궁에',
      },
      {
        options: ['갔을 때', '갈 때', '가는 때'],
        correct: '갔을 때',
      },
      {
        options: [
          '사진을 많이 찍었어요.',
          '사진을 많이 찍어요.',
          '사진을 많이 찍을 거예요.',
        ],
        correct: '사진을 많이 찍었어요.',
      },
    ],
    {
      uz: 'O‘tgan safar saroyga borganimda ko‘p surat oldim.',
      en: 'When I went to the palace last time, I took many pictures.',
      ru: 'В прошлый раз во дворце я сделал много фотографий.',
    },
  ),

  ...build(
    'gp_s4_u5_g2_14',
    U5_G2,
    [
      {
        options: ['길을', '길이', '길은'],
        correct: '길을',
      },
      {
        options: ['잃었을 때', '잃을 때', '잃는 때'],
        correct: '잃었을 때',
      },
      {
        options: ['경찰에게', '경찰을', '경찰이'],
        correct: '경찰에게',
      },
      {
        options: [
          '도움을 요청했어요.',
          '도움을 요청해요.',
          '도움을 요청할 거예요.',
        ],
        correct: '도움을 요청했어요.',
      },
    ],
    {
      uz: 'Yo‘limni yo‘qotganimda politsiyadan yordam so‘radim.',
      en: 'When I got lost, I asked the police for help.',
      ru: 'Когда я заблудился, я попросил полицию помочь.',
    },
  ),

  ...build(
    'gp_s4_u5_g2_15',
    U5_G2,
    [
      {
        options: ['날씨가', '날씨를', '날씨는'],
        correct: '날씨가',
      },
      {
        options: ['좋았을 때', '좋을 때', '좋는 때'],
        correct: '좋았을 때',
      },
      {
        options: ['한강에서', '한강에', '한강을'],
        correct: '한강에서',
      },
      {
        options: ['자전거를 탔어요.', '자전거를 타요.', '자전거를 탈 거예요.'],
        correct: '자전거를 탔어요.',
      },
    ],
    {
      uz: 'Havo yaxshi bo‘lganida Han daryosida velosiped mindim.',
      en: 'When the weather was nice, I rode a bicycle by the Han River.',
      ru: 'Когда погода была хорошей, я катался на велосипеде у Хангана.',
    },
  ),

  ...build(
    'gp_s4_u5_g2_16',
    U5_G2,
    [
      {
        options: ['몸이', '몸을', '몸은'],
        correct: '몸이',
      },
      {
        options: ['아팠을 때', '아플 때', '아프는 때'],
        correct: '아팠을 때',
      },
      {
        options: ['친구가', '친구를', '친구는'],
        correct: '친구가',
      },
      {
        options: ['약을 사다 줬어요.', '약을 먹고 있어요.', '약을 살 거예요.'],
        correct: '약을 사다 줬어요.',
      },
    ],
    {
      uz: 'Kasal bo‘lganimda do‘stim dori olib berdi.',
      en: 'When I was sick, my friend bought medicine for me.',
      ru: 'Когда я болел, друг купил мне лекарство.',
    },
  ),

  ...build(
    'gp_s4_u5_g2_17',
    U5_G2,
    [
      {
        options: ['한국어를', '한국어가', '한국어는'],
        correct: '한국어를',
      },
      {
        options: ['잘 못했을 때', '잘 못할 때', '잘 못하는 때'],
        correct: '잘 못했을 때',
      },
      {
        options: ['말하기가', '말하기를', '말하기는'],
        correct: '말하기가',
      },
      {
        options: ['제일 어려웠어요.', '제일 어려워요.', '제일 어려울 거예요.'],
        correct: '제일 어려웠어요.',
      },
    ],
    {
      uz: 'Koreys tilini yaxshi bilmaganimda gapirish eng qiyin edi.',
      en: 'Speaking was hardest when I could not speak Korean well.',
      ru: 'Когда я плохо знал корейский, говорить было труднее всего.',
    },
  ),

  ...build(
    'gp_s4_u5_g2_18',
    U5_G2,
    [
      {
        options: ['친구를', '친구가', '친구는'],
        correct: '친구를',
      },
      {
        options: ['처음 만났을 때', '처음 만날 때', '처음 만나는 때'],
        correct: '처음 만났을 때',
      },
      {
        options: ['조금', '매일', '벌써'],
        correct: '조금',
      },
      {
        options: ['긴장했어요.', '긴장해요.', '긴장할 거예요.'],
        correct: '긴장했어요.',
      },
    ],
    {
      uz: 'Do‘stim bilan birinchi uchrashganimda biroz hayajonlandim.',
      en: 'When I first met my friend, I was a little nervous.',
      ru: 'При первой встрече с другом я немного волновался.',
    },
  ),

  ...build(
    'gp_s4_u5_g2_19',
    U5_G2,
    [
      {
        options: ['시간이', '시간을', '시간은'],
        correct: '시간이',
      },
      {
        options: ['없었을 때는', '없을 때는', '없는 때는'],
        correct: '없었을 때는',
      },
      {
        options: ['편의점에서', '편의점에', '편의점을'],
        correct: '편의점에서',
      },
      {
        options: ['간단히 먹었어요.', '간단히 먹어요.', '간단히 먹을 거예요.'],
        correct: '간단히 먹었어요.',
      },
    ],
    {
      uz: 'Vaqtim bo‘lmaganida do‘konda tez ovqatlanardim.',
      en: 'When I had no time, I ate something simple at a convenience store.',
      ru: 'Когда времени не было, я быстро ел в магазине.',
    },
  ),

  ...build(
    'gp_s4_u5_g2_20',
    U5_G2,
    [
      {
        options: ['처음', '매일', '내일'],
        correct: '처음',
      },
      {
        options: ['한복을', '한복이', '한복은'],
        correct: '한복을',
      },
      {
        options: ['입었을 때', '입을 때', '입는 때'],
        correct: '입었을 때',
      },
      {
        options: [
          '특별한 기분이 들었어요.',
          '특별한 기분이 들어요.',
          '특별한 기분이 들 거예요.',
        ],
        correct: '특별한 기분이 들었어요.',
      },
    ],
    {
      uz: 'Birinchi marta hanbok kiyganimda o‘zgacha his qildim.',
      en: 'When I first wore hanbok, it felt very special.',
      ru: 'Когда я впервые надел ханбок, ощущения были особенными.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 3. V-아도/어도 되다
// ─────────────────────────────────────────────
const U5_G3 = 'verb-ado-eodo-doeda';

const U5_G3_Q = {
  // grammar_blank 10
  ...blank(
    'gp_s4_u5_g3_01',
    U5_G3,
    '여기서 사진을 찍어도 돼요?',
    '찍어도 돼요?',
    {
      uz: 'Bu yerda suratga olsa bo‘ladimi?',
      en: 'May I take pictures here?',
      ru: 'Здесь можно фотографировать?',
    },
  ),

  ...blank('gp_s4_u5_g3_02', U5_G3, '여기에 앉아도 돼요?', '앉아도 돼요?', {
    uz: 'Bu yerga o‘tirsam bo‘ladimi?',
    en: 'May I sit here?',
    ru: 'Можно здесь сесть?',
  }),

  ...blank(
    'gp_s4_u5_g3_03',
    U5_G3,
    '이 박물관에서는 음료를 마셔도 돼요?',
    '마셔도 돼요?',
    {
      uz: 'Bu muzeyda ichimlik ichsa bo‘ladimi?',
      en: 'May I drink beverages in this museum?',
      ru: 'В этом музее можно пить напитки?',
    },
  ),

  ...blank(
    'gp_s4_u5_g3_04',
    U5_G3,
    '신발을 신고 들어가도 돼요?',
    '들어가도 돼요?',
    {
      uz: 'Oyoq kiyim bilan kirsa bo‘ladimi?',
      en: 'May I enter with my shoes on?',
      ru: 'Можно войти в обуви?',
    },
  ),

  ...blank(
    'gp_s4_u5_g3_05',
    U5_G3,
    '이 책을 집에 가져가도 돼요?',
    '가져가도 돼요?',
    {
      uz: 'Bu kitobni uyga olib ketsam bo‘ladimi?',
      en: 'May I take this book home?',
      ru: 'Можно взять эту книгу домой?',
    },
  ),

  ...blank('gp_s4_u5_g3_06', U5_G3, '조금 늦게 와도 돼요?', '와도 돼요?', {
    uz: 'Biroz kechroq kelsam bo‘ladimi?',
    en: 'May I come a little late?',
    ru: 'Можно прийти немного позже?',
  }),

  ...blank(
    'gp_s4_u5_g3_07',
    U5_G3,
    '모르는 것이 있으면 질문해도 돼요.',
    '질문해도 돼요',
    {
      uz: 'Bilmagan narsangiz bo‘lsa savol bersangiz bo‘ladi.',
      en: 'You may ask questions if there is something you do not know.',
      ru: 'Если что-то непонятно, можно задавать вопросы.',
    },
  ),

  ...blank(
    'gp_s4_u5_g3_08',
    U5_G3,
    '이곳에서는 자유롭게 구경해도 돼요.',
    '구경해도 돼요',
    {
      uz: 'Bu yerda erkin tomosha qilsa bo‘ladi.',
      en: 'You may look around freely here.',
      ru: 'Здесь можно свободно осматриваться.',
    },
  ),

  ...blank(
    'gp_s4_u5_g3_09',
    U5_G3,
    '휴대폰을 잠깐 사용해도 돼요?',
    '사용해도 돼요?',
    {
      uz: 'Telefonni bir oz ishlatsam bo‘ladimi?',
      en: 'May I use my phone for a moment?',
      ru: 'Можно ненадолго воспользоваться телефоном?',
    },
  ),

  ...blank(
    'gp_s4_u5_g3_10',
    U5_G3,
    '예약 시간을 바꿔도 돼요?',
    '바꿔도 돼요?',
    {
      uz: 'Bron vaqtini o‘zgartirsam bo‘ladimi?',
      en: 'May I change the reservation time?',
      ru: 'Можно изменить время бронирования?',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s4_u5_g3_11',
    U5_G3,
    [
      {
        options: ['여기서', '여기를', '여기가'],
        correct: '여기서',
      },
      {
        options: ['사진을', '사진이', '사진은'],
        correct: '사진을',
      },
      {
        options: ['찍어도 돼요?', '찍으면 돼요?', '찍지 않아도 돼요?'],
        correct: '찍어도 돼요?',
      },
    ],
    {
      uz: 'Bu yerda suratga olsa bo‘ladimi?',
      en: 'May I take pictures here?',
      ru: 'Здесь можно фотографировать?',
    },
  ),

  ...build(
    'gp_s4_u5_g3_12',
    U5_G3,
    [
      {
        options: ['여기에', '여기를', '여기가'],
        correct: '여기에',
      },
      {
        options: ['앉아도 돼요?', '앉으면 돼요?', '앉지 않아도 돼요?'],
        correct: '앉아도 돼요?',
      },
    ],
    {
      uz: 'Bu yerga o‘tirsam bo‘ladimi?',
      en: 'May I sit here?',
      ru: 'Можно здесь сесть?',
    },
  ),

  ...build(
    'gp_s4_u5_g3_13',
    U5_G3,
    [
      {
        options: ['이 박물관에서는', '이 박물관을', '이 박물관이'],
        correct: '이 박물관에서는',
      },
      {
        options: ['음료를', '음료가', '음료는'],
        correct: '음료를',
      },
      {
        options: ['마셔도 돼요?', '마시면 돼요?', '마시지 않아도 돼요?'],
        correct: '마셔도 돼요?',
      },
    ],
    {
      uz: 'Bu muzeyda ichimlik ichsa bo‘ladimi?',
      en: 'May I drink a beverage in this museum?',
      ru: 'В музее можно пить напитки?',
    },
  ),

  ...build(
    'gp_s4_u5_g3_14',
    U5_G3,
    [
      {
        options: ['신발을', '신발이', '신발은'],
        correct: '신발을',
      },
      {
        options: ['신고', '벗고', '사고'],
        correct: '신고',
      },
      {
        options: ['들어가도 돼요?', '들어가면 돼요?', '들어가지 않아도 돼요?'],
        correct: '들어가도 돼요?',
      },
    ],
    {
      uz: 'Oyoq kiyim bilan kirsa bo‘ladimi?',
      en: 'May I enter with my shoes on?',
      ru: 'Можно войти в обуви?',
    },
  ),

  ...build(
    'gp_s4_u5_g3_15',
    U5_G3,
    [
      {
        options: ['이 책을', '이 책이', '이 책은'],
        correct: '이 책을',
      },
      {
        options: ['집에', '집을', '집이'],
        correct: '집에',
      },
      {
        options: ['가져가도 돼요?', '가져가면 돼요?', '가져가지 않아도 돼요?'],
        correct: '가져가도 돼요?',
      },
    ],
    {
      uz: 'Bu kitobni uyga olib ketsam bo‘ladimi?',
      en: 'May I take this book home?',
      ru: 'Можно взять эту книгу домой?',
    },
  ),

  ...build(
    'gp_s4_u5_g3_16',
    U5_G3,
    [
      {
        options: ['조금', '매일', '항상'],
        correct: '조금',
      },
      {
        options: ['늦게', '빠르게', '조용하게'],
        correct: '늦게',
      },
      {
        options: ['와도 돼요?', '오면 돼요?', '오지 않아도 돼요?'],
        correct: '와도 돼요?',
      },
    ],
    {
      uz: 'Biroz kechroq kelsam bo‘ladimi?',
      en: 'May I come a little late?',
      ru: 'Можно прийти немного позже?',
    },
  ),

  ...build(
    'gp_s4_u5_g3_17',
    U5_G3,
    [
      {
        options: [
          '모르는 것이 있으면',
          '모르는 것을 있으면',
          '모르는 것이 있지만',
        ],
        correct: '모르는 것이 있으면',
      },
      {
        options: ['질문해도 돼요.', '질문하면 돼요.', '질문하지 않아도 돼요.'],
        correct: '질문해도 돼요.',
      },
    ],
    {
      uz: 'Bilmagan narsangiz bo‘lsa savol bersangiz bo‘ladi.',
      en: 'You may ask questions if there is something you do not know.',
      ru: 'Если есть вопросы, можно спрашивать.',
    },
  ),

  ...build(
    'gp_s4_u5_g3_18',
    U5_G3,
    [
      {
        options: ['이곳에서는', '이곳을', '이곳이'],
        correct: '이곳에서는',
      },
      {
        options: ['자유롭게', '위험하게', '늦게'],
        correct: '자유롭게',
      },
      {
        options: ['구경해도 돼요.', '구경하면 돼요.', '구경하지 않아도 돼요.'],
        correct: '구경해도 돼요.',
      },
    ],
    {
      uz: 'Bu yerda erkin tomosha qilsa bo‘ladi.',
      en: 'You may look around freely here.',
      ru: 'Здесь можно свободно всё осматривать.',
    },
  ),

  ...build(
    'gp_s4_u5_g3_19',
    U5_G3,
    [
      {
        options: ['휴대폰을', '휴대폰이', '휴대폰은'],
        correct: '휴대폰을',
      },
      {
        options: ['잠깐', '매일', '이미'],
        correct: '잠깐',
      },
      {
        options: ['사용해도 돼요?', '사용하면 돼요?', '사용하지 않아도 돼요?'],
        correct: '사용해도 돼요?',
      },
    ],
    {
      uz: 'Telefonni bir oz ishlatsam bo‘ladimi?',
      en: 'May I use my phone for a moment?',
      ru: 'Можно ненадолго воспользоваться телефоном?',
    },
  ),

  ...build(
    'gp_s4_u5_g3_20',
    U5_G3,
    [
      {
        options: ['예약 시간을', '예약 시간이', '예약 시간은'],
        correct: '예약 시간을',
      },
      {
        options: ['바꿔도 돼요?', '바꾸면 돼요?', '바꾸지 않아도 돼요?'],
        correct: '바꿔도 돼요?',
      },
    ],
    {
      uz: 'Bron vaqtini o‘zgartirsam bo‘ladimi?',
      en: 'May I change the reservation time?',
      ru: 'Можно изменить время бронирования?',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 4. V-(으)면 안 되다
// ─────────────────────────────────────────────
const U5_G4 = 'verb-eumyeon-an-doeda';

const U5_G4_Q = {
  // grammar_blank 10
  ...blank(
    'gp_s4_u5_g4_01',
    U5_G4,
    '박물관 안에서 사진을 찍으면 안 돼요.',
    '찍으면 안 돼요',
    {
      uz: 'Muzey ichida suratga olish mumkin emas.',
      en: 'You must not take pictures inside the museum.',
      ru: 'В музее нельзя фотографировать.',
    },
  ),

  ...blank(
    'gp_s4_u5_g4_02',
    U5_G4,
    '여기에서 음식을 먹으면 안 돼요.',
    '먹으면 안 돼요',
    {
      uz: 'Bu yerda ovqat yeyish mumkin emas.',
      en: 'You must not eat food here.',
      ru: 'Здесь нельзя есть.',
    },
  ),

  ...blank(
    'gp_s4_u5_g4_03',
    U5_G4,
    '전시된 물건을 만지면 안 돼요.',
    '만지면 안 돼요',
    {
      uz: 'Ko‘rgazmadagi buyumlarga tegish mumkin emas.',
      en: 'You must not touch the displayed objects.',
      ru: 'Нельзя трогать выставленные предметы.',
    },
  ),

  ...blank(
    'gp_s4_u5_g4_04',
    U5_G4,
    '도서관에서는 큰 소리로 말하면 안 돼요.',
    '말하면 안 돼요',
    {
      uz: 'Kutubxonada baland ovozda gapirish mumkin emas.',
      en: 'You must not speak loudly in the library.',
      ru: 'В библиотеке нельзя громко разговаривать.',
    },
  ),

  ...blank(
    'gp_s4_u5_g4_05',
    U5_G4,
    '이 문으로 들어가면 안 돼요.',
    '들어가면 안 돼요',
    {
      uz: 'Bu eshikdan kirish mumkin emas.',
      en: 'You must not enter through this door.',
      ru: 'Через эту дверь входить нельзя.',
    },
  ),

  ...blank(
    'gp_s4_u5_g4_06',
    U5_G4,
    '문화재에 기대면 안 돼요.',
    '기대면 안 돼요',
    {
      uz: 'Madaniy yodgorlikka suyanish mumkin emas.',
      en: 'You must not lean against cultural heritage objects.',
      ru: 'Нельзя прислоняться к культурным ценностям.',
    },
  ),

  ...blank(
    'gp_s4_u5_g4_07',
    U5_G4,
    '잔디밭 안으로 들어가면 안 돼요.',
    '들어가면 안 돼요',
    {
      uz: 'Maysazorga kirish mumkin emas.',
      en: 'You must not enter the lawn area.',
      ru: 'На газон заходить нельзя.',
    },
  ),

  ...blank(
    'gp_s4_u5_g4_08',
    U5_G4,
    '다른 사람에게 피해를 주면 안 돼요.',
    '피해를 주면 안 돼요',
    {
      uz: 'Boshqalarga xalaqit berish mumkin emas.',
      en: 'You must not cause inconvenience to other people.',
      ru: 'Нельзя мешать другим людям.',
    },
  ),

  ...blank(
    'gp_s4_u5_g4_09',
    U5_G4,
    '공연 중에는 휴대폰을 사용하면 안 돼요.',
    '사용하면 안 돼요',
    {
      uz: 'Tomosha vaqtida telefon ishlatish mumkin emas.',
      en: 'You must not use your phone during the performance.',
      ru: 'Во время представления нельзя пользоваться телефоном.',
    },
  ),

  ...blank(
    'gp_s4_u5_g4_10',
    U5_G4,
    '안전선을 넘으면 안 돼요.',
    '넘으면 안 돼요',
    {
      uz: 'Xavfsizlik chizig‘idan o‘tish mumkin emas.',
      en: 'You must not cross the safety line.',
      ru: 'Нельзя переходить линию безопасности.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s4_u5_g4_11',
    U5_G4,
    [
      {
        options: ['박물관 안에서', '박물관 안을', '박물관 안이'],
        correct: '박물관 안에서',
      },
      {
        options: ['사진을', '사진이', '사진은'],
        correct: '사진을',
      },
      {
        options: ['찍으면 안 돼요.', '찍어도 돼요.', '찍지 않아도 돼요.'],
        correct: '찍으면 안 돼요.',
      },
    ],
    {
      uz: 'Muzey ichida suratga olish mumkin emas.',
      en: 'You must not take pictures inside the museum.',
      ru: 'В музее нельзя фотографировать.',
    },
  ),

  ...build(
    'gp_s4_u5_g4_12',
    U5_G4,
    [
      {
        options: ['여기에서', '여기를', '여기가'],
        correct: '여기에서',
      },
      {
        options: ['음식을', '음식이', '음식은'],
        correct: '음식을',
      },
      {
        options: ['먹으면 안 돼요.', '먹어도 돼요.', '먹지 않아도 돼요.'],
        correct: '먹으면 안 돼요.',
      },
    ],
    {
      uz: 'Bu yerda ovqat yeyish mumkin emas.',
      en: 'You must not eat here.',
      ru: 'Здесь нельзя есть.',
    },
  ),

  ...build(
    'gp_s4_u5_g4_13',
    U5_G4,
    [
      {
        options: ['전시된 물건을', '전시된 물건이', '전시된 물건은'],
        correct: '전시된 물건을',
      },
      {
        options: ['만지면 안 돼요.', '만져도 돼요.', '만지지 않아도 돼요.'],
        correct: '만지면 안 돼요.',
      },
    ],
    {
      uz: 'Ko‘rgazmadagi buyumlarga tegish mumkin emas.',
      en: 'You must not touch the displayed items.',
      ru: 'Нельзя трогать экспонаты.',
    },
  ),

  ...build(
    'gp_s4_u5_g4_14',
    U5_G4,
    [
      {
        options: ['도서관에서는', '도서관을', '도서관이'],
        correct: '도서관에서는',
      },
      {
        options: ['큰 소리로', '작은 가방으로', '빠른 버스로'],
        correct: '큰 소리로',
      },
      {
        options: ['말하면 안 돼요.', '말해도 돼요.', '말하지 않아도 돼요.'],
        correct: '말하면 안 돼요.',
      },
    ],
    {
      uz: 'Kutubxonada baland ovozda gapirish mumkin emas.',
      en: 'You must not speak loudly in the library.',
      ru: 'В библиотеке нельзя громко разговаривать.',
    },
  ),

  ...build(
    'gp_s4_u5_g4_15',
    U5_G4,
    [
      {
        options: ['이 문으로', '이 문을', '이 문이'],
        correct: '이 문으로',
      },
      {
        options: [
          '들어가면 안 돼요.',
          '들어가도 돼요.',
          '들어가지 않아도 돼요.',
        ],
        correct: '들어가면 안 돼요.',
      },
    ],
    {
      uz: 'Bu eshikdan kirish mumkin emas.',
      en: 'You must not enter through this door.',
      ru: 'Через эту дверь входить нельзя.',
    },
  ),

  ...build(
    'gp_s4_u5_g4_16',
    U5_G4,
    [
      {
        options: ['문화재에', '문화재를', '문화재가'],
        correct: '문화재에',
      },
      {
        options: ['기대면 안 돼요.', '기대도 돼요.', '기대지 않아도 돼요.'],
        correct: '기대면 안 돼요.',
      },
    ],
    {
      uz: 'Madaniy yodgorlikka suyanish mumkin emas.',
      en: 'You must not lean against the cultural property.',
      ru: 'Нельзя прислоняться к культурной ценности.',
    },
  ),

  ...build(
    'gp_s4_u5_g4_17',
    U5_G4,
    [
      {
        options: ['잔디밭 안으로', '잔디밭 안을', '잔디밭 안이'],
        correct: '잔디밭 안으로',
      },
      {
        options: [
          '들어가면 안 돼요.',
          '들어가도 돼요.',
          '들어가지 않아도 돼요.',
        ],
        correct: '들어가면 안 돼요.',
      },
    ],
    {
      uz: 'Maysazorga kirish mumkin emas.',
      en: 'You must not enter the lawn.',
      ru: 'На газон заходить нельзя.',
    },
  ),

  ...build(
    'gp_s4_u5_g4_18',
    U5_G4,
    [
      {
        options: ['다른 사람에게', '다른 사람을', '다른 사람이'],
        correct: '다른 사람에게',
      },
      {
        options: ['피해를', '피해가', '피해는'],
        correct: '피해를',
      },
      {
        options: ['주면 안 돼요.', '줘도 돼요.', '주지 않아도 돼요.'],
        correct: '주면 안 돼요.',
      },
    ],
    {
      uz: 'Boshqalarga xalaqit berish mumkin emas.',
      en: 'You must not inconvenience other people.',
      ru: 'Нельзя мешать другим людям.',
    },
  ),

  ...build(
    'gp_s4_u5_g4_19',
    U5_G4,
    [
      {
        options: ['공연 중에는', '공연 중을', '공연 중이'],
        correct: '공연 중에는',
      },
      {
        options: ['휴대폰을', '휴대폰이', '휴대폰은'],
        correct: '휴대폰을',
      },
      {
        options: [
          '사용하면 안 돼요.',
          '사용해도 돼요.',
          '사용하지 않아도 돼요.',
        ],
        correct: '사용하면 안 돼요.',
      },
    ],
    {
      uz: 'Tomosha vaqtida telefon ishlatish mumkin emas.',
      en: 'You must not use a phone during the performance.',
      ru: 'Во время представления нельзя пользоваться телефоном.',
    },
  ),

  ...build(
    'gp_s4_u5_g4_20',
    U5_G4,
    [
      {
        options: ['안전선을', '안전선이', '안전선은'],
        correct: '안전선을',
      },
      {
        options: ['넘으면 안 돼요.', '넘어도 돼요.', '넘지 않아도 돼요.'],
        correct: '넘으면 안 돼요.',
      },
    ],
    {
      uz: 'Xavfsizlik chizig‘idan o‘tish mumkin emas.',
      en: 'You must not cross the safety line.',
      ru: 'Нельзя переходить линию безопасности.',
    },
  ),
};
// ═══════════════════════════════════════════════════════════
// UNIT 6 · 15과
// 한국 생활에 익숙해졌어요
// ═══════════════════════════════════════════════════════════

// ─────────────────────────────────────────────
// 문법 1. A-아지다/어지다
// ─────────────────────────────────────────────
const U6_G1 = 'adjective-a-eo-jida';

const U6_G1_Q = {
  // grammar_blank 10
  ...blank(
    'gp_s4_u6_g1_01',
    U6_G1,
    '한국 생활이 많이 익숙해졌어요.',
    '익숙해졌어요',
    {
      uz: 'Koreyadagi hayotga ancha ko‘nikib qoldim.',
      en: 'I have become much more accustomed to life in Korea.',
      ru: 'Я уже хорошо привык к жизни в Корее.',
    },
  ),

  ...blank(
    'gp_s4_u6_g1_02',
    U6_G1,
    '요즘 한국어 실력이 많이 좋아졌어요.',
    '좋아졌어요',
    {
      uz: 'So‘nggi paytda koreys tilim ancha yaxshilandi.',
      en: 'My Korean has improved a lot recently.',
      ru: 'В последнее время мой корейский заметно улучшился.',
    },
  ),

  ...blank('gp_s4_u6_g1_03', U6_G1, '날씨가 갑자기 추워졌어요.', '추워졌어요', {
    uz: 'Havo birdan sovib ketdi.',
    en: 'The weather suddenly became cold.',
    ru: 'Погода внезапно стала холодной.',
  }),

  ...blank(
    'gp_s4_u6_g1_04',
    U6_G1,
    '운동을 시작한 후에 몸이 건강해졌어요.',
    '건강해졌어요',
    {
      uz: 'Mashq qilishni boshlaganimdan keyin sog‘lomroq bo‘ldim.',
      en: 'I became healthier after I started exercising.',
      ru: 'После того как я начал заниматься спортом, я стал здоровее.',
    },
  ),

  ...blank(
    'gp_s4_u6_g1_05',
    U6_G1,
    '머리를 자르니까 훨씬 시원해졌어요.',
    '시원해졌어요',
    {
      uz: 'Sochimni kestirgach, ancha salqin bo‘ldi.',
      en: 'After cutting my hair, I feel much cooler.',
      ru: 'После стрижки стало намного прохладнее.',
    },
  ),

  ...blank(
    'gp_s4_u6_g1_06',
    U6_G1,
    '친구가 많아져서 학교생활이 재미있어졌어요.',
    '재미있어졌어요',
    {
      uz: 'Do‘stlarim ko‘payib, maktab hayoti qiziqarli bo‘ldi.',
      en: 'School life became more enjoyable as I made more friends.',
      ru: 'Когда друзей стало больше, учиться стало интереснее.',
    },
  ),

  ...blank(
    'gp_s4_u6_g1_07',
    U6_G1,
    '한국 음식을 자주 먹으니까 매운맛에 익숙해졌어요.',
    '익숙해졌어요',
    {
      uz: 'Koreys taomini tez-tez yeganim uchun achchiq ta’mga ko‘nikdim.',
      en: 'I became accustomed to spicy flavors by eating Korean food often.',
      ru: 'Я привык к острой пище, потому что часто ем корейскую еду.',
    },
  ),

  ...blank(
    'gp_s4_u6_g1_08',
    U6_G1,
    '밤이 되니까 거리가 조용해졌어요.',
    '조용해졌어요',
    {
      uz: 'Kech kirgach ko‘cha tinchib qoldi.',
      en: 'The street became quiet as night fell.',
      ru: 'С наступлением вечера на улице стало тихо.',
    },
  ),

  ...blank(
    'gp_s4_u6_g1_09',
    U6_G1,
    '연습을 많이 해서 발음이 자연스러워졌어요.',
    '자연스러워졌어요',
    {
      uz: 'Ko‘p mashq qilib, talaffuzim tabiiyroq bo‘ldi.',
      en: 'My pronunciation became more natural after a lot of practice.',
      ru: 'После долгой практики моё произношение стало естественнее.',
    },
  ),

  ...blank(
    'gp_s4_u6_g1_10',
    U6_G1,
    '요즘 해가 길어져서 저녁에도 밝아요.',
    '길어져서',
    {
      uz: 'Hozir kunlar uzayib, kechqurun ham yorug‘.',
      en: 'The days have become longer, so it is still bright in the evening.',
      ru: 'Дни стали длиннее, поэтому вечером ещё светло.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s4_u6_g1_11',
    U6_G1,
    [
      {
        options: ['한국 생활이', '한국 생활을', '한국 생활은'],
        correct: '한국 생활이',
      },
      {
        options: ['많이', '아직', '가끔'],
        correct: '많이',
      },
      {
        options: ['익숙해졌어요.', '익숙한졌어요.', '익숙하는졌어요.'],
        correct: '익숙해졌어요.',
      },
    ],
    {
      uz: 'Koreyadagi hayotga ancha ko‘nikdim.',
      en: 'I have become much more accustomed to life in Korea.',
      ru: 'Я уже хорошо привык к жизни в Корее.',
    },
  ),

  ...build(
    'gp_s4_u6_g1_12',
    U6_G1,
    [
      {
        options: ['한국어 실력이', '한국어 실력을', '한국어 실력은'],
        correct: '한국어 실력이',
      },
      {
        options: ['많이', '벌써', '가끔'],
        correct: '많이',
      },
      {
        options: ['좋아졌어요.', '좋은졌어요.', '좋아하는졌어요.'],
        correct: '좋아졌어요.',
      },
    ],
    {
      uz: 'Koreys tilim ancha yaxshilandi.',
      en: 'My Korean has improved a lot.',
      ru: 'Мой корейский заметно улучшился.',
    },
  ),

  ...build(
    'gp_s4_u6_g1_13',
    U6_G1,
    [
      {
        options: ['날씨가', '날씨를', '날씨는'],
        correct: '날씨가',
      },
      {
        options: ['갑자기', '천천히', '가끔'],
        correct: '갑자기',
      },
      {
        options: ['추워졌어요.', '추운졌어요.', '춥어졌어요.'],
        correct: '추워졌어요.',
      },
    ],
    {
      uz: 'Havo birdan sovib ketdi.',
      en: 'The weather suddenly became cold.',
      ru: 'Погода внезапно похолодала.',
    },
  ),

  ...build(
    'gp_s4_u6_g1_14',
    U6_G1,
    [
      {
        options: [
          '운동을 시작한 후에',
          '운동을 시작하기 전에',
          '운동을 시작하면서',
        ],
        correct: '운동을 시작한 후에',
      },
      {
        options: ['몸이', '몸을', '몸은'],
        correct: '몸이',
      },
      {
        options: ['건강해졌어요.', '건강한졌어요.', '건강하는졌어요.'],
        correct: '건강해졌어요.',
      },
    ],
    {
      uz: 'Mashqni boshlaganimdan keyin sog‘lomroq bo‘ldim.',
      en: 'I became healthier after starting exercise.',
      ru: 'После начала тренировок я стал здоровее.',
    },
  ),

  ...build(
    'gp_s4_u6_g1_15',
    U6_G1,
    [
      {
        options: ['머리를', '머리가', '머리는'],
        correct: '머리를',
      },
      {
        options: ['자르니까', '먹으니까', '마시니까'],
        correct: '자르니까',
      },
      {
        options: ['훨씬', '아직', '벌써'],
        correct: '훨씬',
      },
      {
        options: ['시원해졌어요.', '시원한졌어요.', '시원하는졌어요.'],
        correct: '시원해졌어요.',
      },
    ],
    {
      uz: 'Sochimni kestirgach, ancha salqin bo‘ldi.',
      en: 'After cutting my hair, I felt much cooler.',
      ru: 'После стрижки стало намного прохладнее.',
    },
  ),

  ...build(
    'gp_s4_u6_g1_16',
    U6_G1,
    [
      {
        options: ['친구가', '친구를', '친구는'],
        correct: '친구가',
      },
      {
        options: ['많아져서', '많은져서', '많는져서'],
        correct: '많아져서',
      },
      {
        options: ['학교생활이', '학교생활을', '학교생활은'],
        correct: '학교생활이',
      },
      {
        options: ['재미있어졌어요.', '재미있는졌어요.', '재미있게졌어요.'],
        correct: '재미있어졌어요.',
      },
    ],
    {
      uz: 'Do‘stlarim ko‘payib, maktab hayoti qiziqarli bo‘ldi.',
      en: 'School life became more enjoyable as I made more friends.',
      ru: 'Когда друзей стало больше, школьная жизнь стала интереснее.',
    },
  ),

  ...build(
    'gp_s4_u6_g1_17',
    U6_G1,
    [
      {
        options: ['한국 음식을', '한국 음식이', '한국 음식은'],
        correct: '한국 음식을',
      },
      {
        options: ['자주 먹으니까', '자주 마시니까', '자주 입으니까'],
        correct: '자주 먹으니까',
      },
      {
        options: ['매운맛에', '매운맛을', '매운맛이'],
        correct: '매운맛에',
      },
      {
        options: ['익숙해졌어요.', '익숙한졌어요.', '익숙하는졌어요.'],
        correct: '익숙해졌어요.',
      },
    ],
    {
      uz: 'Koreys taomini ko‘p yeb, achchiq ta’mga ko‘nikdim.',
      en: 'I became accustomed to spicy food by eating Korean food often.',
      ru: 'Я привык к острой пище, часто питаясь корейской едой.',
    },
  ),

  ...build(
    'gp_s4_u6_g1_18',
    U6_G1,
    [
      {
        options: ['밤이 되니까', '아침이 되니까', '점심을 먹으니까'],
        correct: '밤이 되니까',
      },
      {
        options: ['거리가', '거리를', '거리는'],
        correct: '거리가',
      },
      {
        options: ['조용해졌어요.', '조용한졌어요.', '조용하는졌어요.'],
        correct: '조용해졌어요.',
      },
    ],
    {
      uz: 'Kech kirgach ko‘cha tinchib qoldi.',
      en: 'The street became quiet as night fell.',
      ru: 'С наступлением ночи улица стала тихой.',
    },
  ),

  ...build(
    'gp_s4_u6_g1_19',
    U6_G1,
    [
      {
        options: ['연습을', '연습이', '연습은'],
        correct: '연습을',
      },
      {
        options: ['많이 해서', '많이 먹어서', '많이 자서'],
        correct: '많이 해서',
      },
      {
        options: ['발음이', '발음을', '발음은'],
        correct: '발음이',
      },
      {
        options: [
          '자연스러워졌어요.',
          '자연스러운졌어요.',
          '자연스럽는졌어요.',
        ],
        correct: '자연스러워졌어요.',
      },
    ],
    {
      uz: 'Ko‘p mashq qilib, talaffuzim tabiiyroq bo‘ldi.',
      en: 'My pronunciation became more natural through practice.',
      ru: 'Благодаря практике произношение стало естественнее.',
    },
  ),

  ...build(
    'gp_s4_u6_g1_20',
    U6_G1,
    [
      {
        options: ['요즘', '어제만', '지난달부터만'],
        correct: '요즘',
      },
      {
        options: ['해가', '해를', '해는'],
        correct: '해가',
      },
      {
        options: ['길어져서', '긴져서', '길는져서'],
        correct: '길어져서',
      },
      {
        options: ['저녁에도 밝아요.', '저녁에도 추워요.', '저녁에도 비싸요.'],
        correct: '저녁에도 밝아요.',
      },
    ],
    {
      uz: 'Kunlar uzayib, kechqurun ham yorug‘.',
      en: 'The days have become longer, so it stays bright in the evening.',
      ru: 'Дни стали длиннее, поэтому вечером ещё светло.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 2. V-게 되다
// ─────────────────────────────────────────────
const U6_G2 = 'verb-ge-doeda';

const U6_G2_Q = {
  // grammar_blank 10
  ...blank(
    'gp_s4_u6_g2_01',
    U6_G2,
    '한국 회사에서 일하게 되었어요.',
    '일하게 되었어요',
    {
      uz: 'Koreys kompaniyasida ishlaydigan bo‘ldim.',
      en: 'I came to work at a Korean company.',
      ru: 'Так получилось, что я стал работать в корейской компании.',
    },
  ),

  ...blank(
    'gp_s4_u6_g2_02',
    U6_G2,
    '한국 친구가 생겨서 한국어를 자주 쓰게 되었어요.',
    '자주 쓰게 되었어요',
    {
      uz: 'Koreys do‘stim paydo bo‘lib, koreys tilini tez-tez ishlatadigan bo‘ldim.',
      en: 'After making a Korean friend, I came to use Korean often.',
      ru: 'После того как у меня появился корейский друг, я стал часто пользоваться корейским.',
    },
  ),

  ...blank(
    'gp_s4_u6_g2_03',
    U6_G2,
    '회사 때문에 서울에서 살게 되었어요.',
    '살게 되었어요',
    {
      uz: 'Ishim sababli Seulda yashaydigan bo‘ldim.',
      en: 'Because of work, I ended up living in Seoul.',
      ru: 'Из-за работы я стал жить в Сеуле.',
    },
  ),

  ...blank(
    'gp_s4_u6_g2_04',
    U6_G2,
    '건강을 생각해서 매일 운동하게 되었어요.',
    '운동하게 되었어요',
    {
      uz: 'Sog‘lig‘imni o‘ylab, har kuni mashq qiladigan bo‘ldim.',
      en: 'Thinking about my health, I came to exercise every day.',
      ru: 'Задумавшись о здоровье, я стал заниматься каждый день.',
    },
  ),

  ...blank(
    'gp_s4_u6_g2_05',
    U6_G2,
    '한국 생활에 익숙해져서 혼자서도 잘 다니게 되었어요.',
    '잘 다니게 되었어요',
    {
      uz: 'Koreya hayotiga ko‘nikib, yolg‘iz ham bemalol yuradigan bo‘ldim.',
      en: 'After getting used to life in Korea, I became able to get around well on my own.',
      ru: 'Привыкнув к жизни в Корее, я стал хорошо справляться один.',
    },
  ),

  ...blank(
    'gp_s4_u6_g2_06',
    U6_G2,
    '처음에는 못 먹었지만 이제 김치도 먹게 되었어요.',
    '먹게 되었어요',
    {
      uz: 'Avval yeya olmasdim, endi kimchi ham yeydigan bo‘ldim.',
      en: 'I could not eat it at first, but now I have come to eat kimchi too.',
      ru: 'Сначала я не мог есть кимчхи, а теперь стал.',
    },
  ),

  ...blank(
    'gp_s4_u6_g2_07',
    U6_G2,
    '수업에서 만나서 그 사람과 친하게 지내게 되었어요.',
    '친하게 지내게 되었어요',
    {
      uz: 'Darsda tanishib, u odam bilan yaqin bo‘lib qoldik.',
      en: 'We met in class and came to become close.',
      ru: 'Мы познакомились на занятиях и со временем подружились.',
    },
  ),

  ...blank(
    'gp_s4_u6_g2_08',
    U6_G2,
    '아침 수업이 생겨서 일찍 일어나게 되었어요.',
    '일찍 일어나게 되었어요',
    {
      uz: 'Ertalabki dars paydo bo‘lib, erta turadigan bo‘ldim.',
      en: 'Because I got a morning class, I came to wake up early.',
      ru: 'Из-за утренних занятий я стал рано вставать.',
    },
  ),

  ...blank(
    'gp_s4_u6_g2_09',
    U6_G2,
    '한국 드라마를 좋아해서 한국어 공부를 시작하게 되었어요.',
    '시작하게 되었어요',
    {
      uz: 'Koreys dramalarini yoqtirib, koreys tilini o‘rganishni boshladim.',
      en: 'Because I liked Korean dramas, I came to start studying Korean.',
      ru: 'Из-за любви к корейским сериалам я начал изучать корейский.',
    },
  ),

  ...blank(
    'gp_s4_u6_g2_10',
    U6_G2,
    '이사를 해서 지하철로 출근하게 되었어요.',
    '출근하게 되었어요',
    {
      uz: 'Ko‘chganimdan keyin ishga metroda boradigan bo‘ldim.',
      en: 'After moving, I came to commute by subway.',
      ru: 'После переезда я стал ездить на работу на метро.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s4_u6_g2_11',
    U6_G2,
    [
      {
        options: ['한국 회사에서', '한국 회사를', '한국 회사가'],
        correct: '한국 회사에서',
      },
      {
        options: [
          '일하게 되었어요.',
          '일하기로 했어요.',
          '일하는 게 되었어요.',
        ],
        correct: '일하게 되었어요.',
      },
    ],
    {
      uz: 'Koreys kompaniyasida ishlaydigan bo‘ldim.',
      en: 'I came to work at a Korean company.',
      ru: 'Я стал работать в корейской компании.',
    },
  ),

  ...build(
    'gp_s4_u6_g2_12',
    U6_G2,
    [
      {
        options: ['한국 친구가', '한국 친구를', '한국 친구는'],
        correct: '한국 친구가',
      },
      {
        options: ['생겨서', '먹어서', '읽어서'],
        correct: '생겨서',
      },
      {
        options: ['한국어를', '한국어가', '한국어는'],
        correct: '한국어를',
      },
      {
        options: [
          '자주 쓰게 되었어요.',
          '자주 쓰기로 했어요.',
          '자주 쓰는 게 되었어요.',
        ],
        correct: '자주 쓰게 되었어요.',
      },
    ],
    {
      uz: 'Koreys do‘stim paydo bo‘lib, koreys tilini ko‘p ishlatadigan bo‘ldim.',
      en: 'I came to use Korean often after making a Korean friend.',
      ru: 'С появлением корейского друга я стал чаще говорить по-корейски.',
    },
  ),

  ...build(
    'gp_s4_u6_g2_13',
    U6_G2,
    [
      {
        options: ['회사 때문에', '회사마다', '회사처럼'],
        correct: '회사 때문에',
      },
      {
        options: ['서울에서', '서울을', '서울이'],
        correct: '서울에서',
      },
      {
        options: ['살게 되었어요.', '살기로 했어요.', '사는 게 되었어요.'],
        correct: '살게 되었어요.',
      },
    ],
    {
      uz: 'Ishim sababli Seulda yashaydigan bo‘ldim.',
      en: 'I ended up living in Seoul because of work.',
      ru: 'Из-за работы я стал жить в Сеуле.',
    },
  ),

  ...build(
    'gp_s4_u6_g2_14',
    U6_G2,
    [
      {
        options: ['건강을 생각해서', '건강을 먹어서', '건강을 입어서'],
        correct: '건강을 생각해서',
      },
      {
        options: ['매일', '어제만', '지난달'],
        correct: '매일',
      },
      {
        options: [
          '운동하게 되었어요.',
          '운동하기로 했어요.',
          '운동하는 게 되었어요.',
        ],
        correct: '운동하게 되었어요.',
      },
    ],
    {
      uz: 'Sog‘lig‘imni o‘ylab, har kuni mashq qiladigan bo‘ldim.',
      en: 'I came to exercise every day for my health.',
      ru: 'Я стал заниматься каждый день ради здоровья.',
    },
  ),

  ...build(
    'gp_s4_u6_g2_15',
    U6_G2,
    [
      {
        options: ['한국 생활에', '한국 생활을', '한국 생활이'],
        correct: '한국 생활에',
      },
      {
        options: ['익숙해져서', '익숙한 후에', '익숙하기 전에'],
        correct: '익숙해져서',
      },
      {
        options: ['혼자서도', '혼자를도', '혼자에게도'],
        correct: '혼자서도',
      },
      {
        options: [
          '잘 다니게 되었어요.',
          '잘 다니기로 했어요.',
          '잘 다니는 게 되었어요.',
        ],
        correct: '잘 다니게 되었어요.',
      },
    ],
    {
      uz: 'Koreyaga ko‘nikib, yolg‘iz ham bemalol yuradigan bo‘ldim.',
      en: 'After getting used to Korea, I became comfortable getting around alone.',
      ru: 'Привыкнув к Корее, я стал спокойно передвигаться один.',
    },
  ),

  ...build(
    'gp_s4_u6_g2_16',
    U6_G2,
    [
      {
        options: ['처음에는', '다음에는', '매일마다'],
        correct: '처음에는',
      },
      {
        options: ['못 먹었지만', '못 마셨지만', '못 입었지만'],
        correct: '못 먹었지만',
      },
      {
        options: ['이제', '어제', '아직'],
        correct: '이제',
      },
      {
        options: [
          '김치도 먹게 되었어요.',
          '김치도 먹기로 했어요.',
          '김치도 먹는 게 되었어요.',
        ],
        correct: '김치도 먹게 되었어요.',
      },
    ],
    {
      uz: 'Avval yeya olmasdim, endi kimchi ham yeyman.',
      en: 'I could not eat it before, but now I have come to eat kimchi too.',
      ru: 'Раньше я не мог есть кимчхи, а теперь стал.',
    },
  ),

  ...build(
    'gp_s4_u6_g2_17',
    U6_G2,
    [
      {
        options: ['수업에서', '수업을', '수업이'],
        correct: '수업에서',
      },
      {
        options: ['만나서', '먹어서', '마셔서'],
        correct: '만나서',
      },
      {
        options: ['그 사람과', '그 사람을', '그 사람이'],
        correct: '그 사람과',
      },
      {
        options: [
          '친하게 지내게 되었어요.',
          '친하게 지내기로 했어요.',
          '친하게 지내는 게 되었어요.',
        ],
        correct: '친하게 지내게 되었어요.',
      },
    ],
    {
      uz: 'Darsda tanishib, u bilan yaqin bo‘lib qoldim.',
      en: 'We met in class and came to become close.',
      ru: 'Мы встретились на занятии и постепенно сблизились.',
    },
  ),

  ...build(
    'gp_s4_u6_g2_18',
    U6_G2,
    [
      {
        options: ['아침 수업이', '아침 수업을', '아침 수업은'],
        correct: '아침 수업이',
      },
      {
        options: ['생겨서', '없어서', '끝나서'],
        correct: '생겨서',
      },
      {
        options: ['일찍', '늦게', '가끔'],
        correct: '일찍',
      },
      {
        options: [
          '일어나게 되었어요.',
          '일어나기로 했어요.',
          '일어나는 게 되었어요.',
        ],
        correct: '일어나게 되었어요.',
      },
    ],
    {
      uz: 'Ertalabki dars tufayli erta turadigan bo‘ldim.',
      en: 'I came to wake up early because of a morning class.',
      ru: 'Из-за утренних занятий я стал рано вставать.',
    },
  ),

  ...build(
    'gp_s4_u6_g2_19',
    U6_G2,
    [
      {
        options: ['한국 드라마를', '한국 드라마가', '한국 드라마는'],
        correct: '한국 드라마를',
      },
      {
        options: ['좋아해서', '싫어해서', '버려서'],
        correct: '좋아해서',
      },
      {
        options: ['한국어 공부를', '한국어 공부가', '한국어 공부는'],
        correct: '한국어 공부를',
      },
      {
        options: [
          '시작하게 되었어요.',
          '시작하기로 했어요.',
          '시작하는 게 되었어요.',
        ],
        correct: '시작하게 되었어요.',
      },
    ],
    {
      uz: 'Koreys dramalari tufayli koreys tilini o‘rganishni boshladim.',
      en: 'Korean dramas led me to start studying Korean.',
      ru: 'Из-за корейских сериалов я начал учить корейский.',
    },
  ),

  ...build(
    'gp_s4_u6_g2_20',
    U6_G2,
    [
      {
        options: ['이사를 해서', '여행을 해서', '요리를 해서'],
        correct: '이사를 해서',
      },
      {
        options: ['지하철로', '지하철을', '지하철이'],
        correct: '지하철로',
      },
      {
        options: [
          '출근하게 되었어요.',
          '출근하기로 했어요.',
          '출근하는 게 되었어요.',
        ],
        correct: '출근하게 되었어요.',
      },
    ],
    {
      uz: 'Ko‘chgach, ishga metroda boradigan bo‘ldim.',
      en: 'After moving, I came to commute by subway.',
      ru: 'После переезда я стал ездить на работу на метро.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 3. V-기 전에
// ─────────────────────────────────────────────
const U6_G3 = 'verb-gi-jeone';

const U6_G3_Q = {
  // grammar_blank 10
  ...blank(
    'gp_s4_u6_g3_01',
    U6_G3,
    '한국에 오기 전에 한국어를 조금 공부했어요.',
    '오기 전에',
    {
      uz: 'Koreyaga kelishdan oldin koreys tilini biroz o‘rgandim.',
      en: 'I studied a little Korean before coming to Korea.',
      ru: 'Перед приездом в Корею я немного учил корейский.',
    },
  ),

  ...blank(
    'gp_s4_u6_g3_02',
    U6_G3,
    '집에서 나가기 전에 창문을 확인해요.',
    '나가기 전에',
    {
      uz: 'Uydan chiqishdan oldin derazalarni tekshiraman.',
      en: 'I check the windows before leaving home.',
      ru: 'Перед выходом из дома я проверяю окна.',
    },
  ),

  ...blank(
    'gp_s4_u6_g3_03',
    U6_G3,
    '잠자기 전에 휴대폰을 보지 않으려고 해요.',
    '잠자기 전에',
    {
      uz: 'Uxlashdan oldin telefon ko‘rmaslikka harakat qilaman.',
      en: 'I try not to look at my phone before going to bed.',
      ru: 'Я стараюсь не смотреть телефон перед сном.',
    },
  ),

  ...blank(
    'gp_s4_u6_g3_04',
    U6_G3,
    '수업을 시작하기 전에 숙제를 확인해요.',
    '시작하기 전에',
    {
      uz: 'Darsni boshlashdan oldin uy vazifasini tekshiraman.',
      en: 'I check my homework before class starts.',
      ru: 'Перед началом занятия я проверяю домашнее задание.',
    },
  ),

  ...blank(
    'gp_s4_u6_g3_05',
    U6_G3,
    '운동하기 전에 준비 운동을 해야 해요.',
    '운동하기 전에',
    {
      uz: 'Mashq qilishdan oldin badan qizdirish kerak.',
      en: 'You should warm up before exercising.',
      ru: 'Перед тренировкой нужно делать разминку.',
    },
  ),

  ...blank(
    'gp_s4_u6_g3_06',
    U6_G3,
    '한국에 오기 전에 가족과 함께 살았어요.',
    '오기 전에',
    {
      uz: 'Koreyaga kelishdan oldin oilam bilan yashardim.',
      en: 'I lived with my family before coming to Korea.',
      ru: 'До приезда в Корею я жил с семьёй.',
    },
  ),

  ...blank(
    'gp_s4_u6_g3_07',
    U6_G3,
    '음식을 먹기 전에 손을 깨끗이 씻어요.',
    '먹기 전에',
    {
      uz: 'Ovqatdan oldin qo‘limni yaxshilab yuvaman.',
      en: 'I wash my hands thoroughly before eating.',
      ru: 'Перед едой я хорошо мою руки.',
    },
  ),

  ...blank(
    'gp_s4_u6_g3_08',
    U6_G3,
    '여행을 떠나기 전에 호텔을 예약했어요.',
    '떠나기 전에',
    {
      uz: 'Sayohatga ketishdan oldin mehmonxonani bron qildim.',
      en: 'I booked a hotel before leaving on the trip.',
      ru: 'Перед поездкой я забронировал гостиницу.',
    },
  ),

  ...blank(
    'gp_s4_u6_g3_09',
    U6_G3,
    '중요한 결정을 하기 전에 가족과 이야기해요.',
    '하기 전에',
    {
      uz: 'Muhim qaror qilishdan oldin oilam bilan gaplashaman.',
      en: 'I talk with my family before making an important decision.',
      ru: 'Перед важным решением я разговариваю с семьёй.',
    },
  ),

  ...blank(
    'gp_s4_u6_g3_10',
    U6_G3,
    '회사에 출근하기 전에 아침을 꼭 먹어요.',
    '출근하기 전에',
    {
      uz: 'Ishga borishdan oldin albatta nonushta qilaman.',
      en: 'I always eat breakfast before going to work.',
      ru: 'Перед работой я обязательно завтракаю.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s4_u6_g3_11',
    U6_G3,
    [
      {
        options: ['한국에', '한국을', '한국이'],
        correct: '한국에',
      },
      {
        options: ['오기 전에', '온 후에', '왔기 전에'],
        correct: '오기 전에',
      },
      {
        options: ['한국어를', '한국어가', '한국어는'],
        correct: '한국어를',
      },
      {
        options: [
          '조금 공부했어요.',
          '조금 공부할 거예요.',
          '조금 공부하고 있어요.',
        ],
        correct: '조금 공부했어요.',
      },
    ],
    {
      uz: 'Koreyaga kelishdan oldin koreys tilini biroz o‘rgandim.',
      en: 'I studied some Korean before coming to Korea.',
      ru: 'До приезда в Корею я немного учил корейский.',
    },
  ),

  ...build(
    'gp_s4_u6_g3_12',
    U6_G3,
    [
      {
        options: ['집에서', '집을', '집이'],
        correct: '집에서',
      },
      {
        options: ['나가기 전에', '나간 후에', '나갔기 전에'],
        correct: '나가기 전에',
      },
      {
        options: ['창문을', '창문이', '창문은'],
        correct: '창문을',
      },
      {
        options: ['확인해요.', '먹어요.', '마셔요.'],
        correct: '확인해요.',
      },
    ],
    {
      uz: 'Uydan chiqishdan oldin derazani tekshiraman.',
      en: 'I check the window before leaving home.',
      ru: 'Перед выходом из дома я проверяю окно.',
    },
  ),

  ...build(
    'gp_s4_u6_g3_13',
    U6_G3,
    [
      {
        options: ['잠자기 전에', '잔 후에', '잤기 전에'],
        correct: '잠자기 전에',
      },
      {
        options: ['휴대폰을', '휴대폰이', '휴대폰은'],
        correct: '휴대폰을',
      },
      {
        options: [
          '보지 않으려고 해요.',
          '먹지 않으려고 해요.',
          '입지 않으려고 해요.',
        ],
        correct: '보지 않으려고 해요.',
      },
    ],
    {
      uz: 'Uxlashdan oldin telefon ko‘rmaslikka harakat qilaman.',
      en: 'I try not to look at my phone before sleeping.',
      ru: 'Перед сном я стараюсь не смотреть телефон.',
    },
  ),

  ...build(
    'gp_s4_u6_g3_14',
    U6_G3,
    [
      {
        options: ['수업을', '수업이', '수업은'],
        correct: '수업을',
      },
      {
        options: ['시작하기 전에', '시작한 후에', '시작했기 전에'],
        correct: '시작하기 전에',
      },
      {
        options: ['숙제를', '숙제가', '숙제는'],
        correct: '숙제를',
      },
      {
        options: ['확인해요.', '마셔요.', '입어요.'],
        correct: '확인해요.',
      },
    ],
    {
      uz: 'Dars boshlanishidan oldin uy vazifasini tekshiraman.',
      en: 'I check my homework before starting class.',
      ru: 'Перед началом занятия я проверяю домашнее задание.',
    },
  ),

  ...build(
    'gp_s4_u6_g3_15',
    U6_G3,
    [
      {
        options: ['운동하기 전에', '운동한 후에', '운동했기 전에'],
        correct: '운동하기 전에',
      },
      {
        options: ['준비 운동을', '준비 운동이', '준비 운동은'],
        correct: '준비 운동을',
      },
      {
        options: ['해야 해요.', '먹어야 해요.', '입어야 해요.'],
        correct: '해야 해요.',
      },
    ],
    {
      uz: 'Mashq qilishdan oldin badan qizdirish kerak.',
      en: 'You should warm up before exercising.',
      ru: 'Перед тренировкой нужно размяться.',
    },
  ),

  ...build(
    'gp_s4_u6_g3_16',
    U6_G3,
    [
      {
        options: ['한국에', '한국을', '한국이'],
        correct: '한국에',
      },
      {
        options: ['오기 전에', '온 후에', '왔기 전에'],
        correct: '오기 전에',
      },
      {
        options: ['가족과', '가족을', '가족이'],
        correct: '가족과',
      },
      {
        options: ['함께 살았어요.', '함께 살 거예요.', '함께 살고 있어요.'],
        correct: '함께 살았어요.',
      },
    ],
    {
      uz: 'Koreyaga kelishdan oldin oilam bilan yashardim.',
      en: 'I lived with my family before coming to Korea.',
      ru: 'До приезда в Корею я жил вместе с семьёй.',
    },
  ),

  ...build(
    'gp_s4_u6_g3_17',
    U6_G3,
    [
      {
        options: ['음식을', '음식이', '음식은'],
        correct: '음식을',
      },
      {
        options: ['먹기 전에', '먹은 후에', '먹었기 전에'],
        correct: '먹기 전에',
      },
      {
        options: ['손을', '손이', '손은'],
        correct: '손을',
      },
      {
        options: ['깨끗이 씻어요.', '깨끗이 먹어요.', '깨끗이 입어요.'],
        correct: '깨끗이 씻어요.',
      },
    ],
    {
      uz: 'Ovqatdan oldin qo‘limni yaxshilab yuvaman.',
      en: 'I wash my hands thoroughly before eating.',
      ru: 'Перед едой я хорошо мою руки.',
    },
  ),

  ...build(
    'gp_s4_u6_g3_18',
    U6_G3,
    [
      {
        options: ['여행을', '여행이', '여행은'],
        correct: '여행을',
      },
      {
        options: ['떠나기 전에', '떠난 후에', '떠났기 전에'],
        correct: '떠나기 전에',
      },
      {
        options: ['호텔을', '호텔이', '호텔은'],
        correct: '호텔을',
      },
      {
        options: ['예약했어요.', '먹었어요.', '입었어요.'],
        correct: '예약했어요.',
      },
    ],
    {
      uz: 'Sayohatdan oldin mehmonxonani bron qildim.',
      en: 'I booked the hotel before leaving on the trip.',
      ru: 'Перед поездкой я забронировал отель.',
    },
  ),

  ...build(
    'gp_s4_u6_g3_19',
    U6_G3,
    [
      {
        options: ['중요한 결정을', '중요한 결정이', '중요한 결정은'],
        correct: '중요한 결정을',
      },
      {
        options: ['하기 전에', '한 후에', '했기 전에'],
        correct: '하기 전에',
      },
      {
        options: ['가족과', '가족을', '가족이'],
        correct: '가족과',
      },
      {
        options: ['이야기해요.', '먹어요.', '자요.'],
        correct: '이야기해요.',
      },
    ],
    {
      uz: 'Muhim qarordan oldin oilam bilan gaplashaman.',
      en: 'I talk with my family before making an important decision.',
      ru: 'Перед важным решением я говорю с семьёй.',
    },
  ),

  ...build(
    'gp_s4_u6_g3_20',
    U6_G3,
    [
      {
        options: ['회사에', '회사를', '회사가'],
        correct: '회사에',
      },
      {
        options: ['출근하기 전에', '출근한 후에', '출근했기 전에'],
        correct: '출근하기 전에',
      },
      {
        options: ['아침을', '아침이', '아침은'],
        correct: '아침을',
      },
      {
        options: ['꼭 먹어요.', '꼭 마셔요.', '꼭 입어요.'],
        correct: '꼭 먹어요.',
      },
    ],
    {
      uz: 'Ishga borishdan oldin albatta nonushta qilaman.',
      en: 'I always eat breakfast before going to work.',
      ru: 'Перед работой я обязательно завтракаю.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 4. V-(으)ㄴ 후에
// ─────────────────────────────────────────────
const U6_G4 = 'verb-eun-hue';

const U6_G4_Q = {
  // grammar_blank 10
  ...blank(
    'gp_s4_u6_g4_01',
    U6_G4,
    '한국에 온 후에 한국어를 더 열심히 공부했어요.',
    '온 후에',
    {
      uz: 'Koreyaga kelganimdan keyin koreys tilini yanada jiddiy o‘rgandim.',
      en: 'After coming to Korea, I studied Korean harder.',
      ru: 'После приезда в Корею я стал усерднее учить корейский.',
    },
  ),

  ...blank(
    'gp_s4_u6_g4_02',
    U6_G4,
    '밥을 먹은 후에 약을 드세요.',
    '먹은 후에',
    {
      uz: 'Ovqatdan keyin dorini iching.',
      en: 'Take the medicine after eating.',
      ru: 'Примите лекарство после еды.',
    },
  ),

  ...blank(
    'gp_s4_u6_g4_03',
    U6_G4,
    '수업이 끝난 후에 친구를 만났어요.',
    '끝난 후에',
    {
      uz: 'Dars tugagandan keyin do‘stim bilan uchrashdim.',
      en: 'I met my friend after class ended.',
      ru: 'После занятия я встретился с другом.',
    },
  ),

  ...blank(
    'gp_s4_u6_g4_04',
    U6_G4,
    '운동한 후에 물을 충분히 마셔요.',
    '운동한 후에',
    {
      uz: 'Mashqdan keyin yetarlicha suv ichaman.',
      en: 'I drink plenty of water after exercising.',
      ru: 'После тренировки я пью достаточно воды.',
    },
  ),

  ...blank(
    'gp_s4_u6_g4_05',
    U6_G4,
    '대학교를 졸업한 후에 한국에 왔어요.',
    '졸업한 후에',
    {
      uz: 'Universitetni bitirgandan keyin Koreyaga keldim.',
      en: 'I came to Korea after graduating from university.',
      ru: 'Я приехал в Корею после окончания университета.',
    },
  ),

  ...blank(
    'gp_s4_u6_g4_06',
    U6_G4,
    '회사에 입사한 후에 많이 바빠졌어요.',
    '입사한 후에',
    {
      uz: 'Ishga kirganimdan keyin juda band bo‘lib qoldim.',
      en: 'I became much busier after joining the company.',
      ru: 'После поступления на работу я стал намного занятым.',
    },
  ),

  ...blank(
    'gp_s4_u6_g4_07',
    U6_G4,
    '서울로 이사한 후에 지하철을 자주 타게 되었어요.',
    '이사한 후에',
    {
      uz: 'Seulga ko‘chgandan keyin metrodan ko‘p foydalanadigan bo‘ldim.',
      en: 'After moving to Seoul, I came to use the subway often.',
      ru: 'После переезда в Сеул я стал часто ездить на метро.',
    },
  ),

  ...blank(
    'gp_s4_u6_g4_08',
    U6_G4,
    '숙제를 다 한 후에 영화를 볼 거예요.',
    '다 한 후에',
    {
      uz: 'Uy vazifasini tugatgandan keyin film ko‘raman.',
      en: 'I will watch a movie after finishing all my homework.',
      ru: 'После того как закончу домашнее задание, посмотрю фильм.',
    },
  ),

  ...blank(
    'gp_s4_u6_g4_09',
    U6_G4,
    '사진을 찍은 후에 바로 확인했어요.',
    '찍은 후에',
    {
      uz: 'Suratga olgandan keyin darhol tekshirdim.',
      en: 'I checked the photo immediately after taking it.',
      ru: 'После фотографии я сразу её проверил.',
    },
  ),

  ...blank(
    'gp_s4_u6_g4_10',
    U6_G4,
    '친구와 이야기한 후에 생각이 바뀌었어요.',
    '이야기한 후에',
    {
      uz: 'Do‘stim bilan gaplashgandan keyin fikrim o‘zgardi.',
      en: 'My opinion changed after talking with my friend.',
      ru: 'После разговора с другом я изменил своё мнение.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s4_u6_g4_11',
    U6_G4,
    [
      {
        options: ['한국에', '한국을', '한국이'],
        correct: '한국에',
      },
      {
        options: ['온 후에', '오은 후에', '오는 후에'],
        correct: '온 후에',
      },
      {
        options: ['한국어를', '한국어가', '한국어는'],
        correct: '한국어를',
      },
      {
        options: [
          '더 열심히 공부했어요.',
          '더 열심히 먹었어요.',
          '더 열심히 입었어요.',
        ],
        correct: '더 열심히 공부했어요.',
      },
    ],
    {
      uz: 'Koreyaga kelganimdan keyin koreys tilini ko‘proq o‘rgandim.',
      en: 'I studied Korean harder after coming to Korea.',
      ru: 'После приезда в Корею я стал усерднее учить корейский.',
    },
  ),

  ...build(
    'gp_s4_u6_g4_12',
    U6_G4,
    [
      {
        options: ['밥을', '밥이', '밥은'],
        correct: '밥을',
      },
      {
        options: ['먹은 후에', '먹는 후에', '먹을 후에'],
        correct: '먹은 후에',
      },
      {
        options: ['약을', '약이', '약은'],
        correct: '약을',
      },
      {
        options: ['드세요.', '입으세요.', '가세요.'],
        correct: '드세요.',
      },
    ],
    {
      uz: 'Ovqatdan keyin dori iching.',
      en: 'Take the medicine after eating.',
      ru: 'Примите лекарство после еды.',
    },
  ),

  ...build(
    'gp_s4_u6_g4_13',
    U6_G4,
    [
      {
        options: ['수업이', '수업을', '수업은'],
        correct: '수업이',
      },
      {
        options: ['끝난 후에', '끝는 후에', '끝을 후에'],
        correct: '끝난 후에',
      },
      {
        options: ['친구를', '친구가', '친구는'],
        correct: '친구를',
      },
      {
        options: ['만났어요.', '마셨어요.', '입었어요.'],
        correct: '만났어요.',
      },
    ],
    {
      uz: 'Darsdan keyin do‘stim bilan uchrashdim.',
      en: 'I met my friend after class.',
      ru: 'После занятия я встретился с другом.',
    },
  ),

  ...build(
    'gp_s4_u6_g4_14',
    U6_G4,
    [
      {
        options: ['운동한 후에', '운동하는 후에', '운동할 후에'],
        correct: '운동한 후에',
      },
      {
        options: ['물을', '물이', '물은'],
        correct: '물을',
      },
      {
        options: ['충분히', '갑자기', '벌써'],
        correct: '충분히',
      },
      {
        options: ['마셔요.', '입어요.', '읽어요.'],
        correct: '마셔요.',
      },
    ],
    {
      uz: 'Mashqdan keyin yetarlicha suv ichaman.',
      en: 'I drink plenty of water after exercising.',
      ru: 'После тренировки я пью достаточно воды.',
    },
  ),

  ...build(
    'gp_s4_u6_g4_15',
    U6_G4,
    [
      {
        options: ['대학교를', '대학교가', '대학교는'],
        correct: '대학교를',
      },
      {
        options: ['졸업한 후에', '졸업하는 후에', '졸업할 후에'],
        correct: '졸업한 후에',
      },
      {
        options: ['한국에', '한국을', '한국이'],
        correct: '한국에',
      },
      {
        options: ['왔어요.', '먹었어요.', '입었어요.'],
        correct: '왔어요.',
      },
    ],
    {
      uz: 'Universitetni bitirgach Koreyaga keldim.',
      en: 'I came to Korea after graduating from university.',
      ru: 'После университета я приехал в Корею.',
    },
  ),

  ...build(
    'gp_s4_u6_g4_16',
    U6_G4,
    [
      {
        options: ['회사에', '회사를', '회사가'],
        correct: '회사에',
      },
      {
        options: ['입사한 후에', '입사하는 후에', '입사할 후에'],
        correct: '입사한 후에',
      },
      {
        options: ['많이', '가끔', '아직'],
        correct: '많이',
      },
      {
        options: ['바빠졌어요.', '매워졌어요.', '짧아졌어요.'],
        correct: '바빠졌어요.',
      },
    ],
    {
      uz: 'Ishga kirgach ancha band bo‘ldim.',
      en: 'I became much busier after joining the company.',
      ru: 'После поступления на работу я стал намного занятым.',
    },
  ),

  ...build(
    'gp_s4_u6_g4_17',
    U6_G4,
    [
      {
        options: ['서울로', '서울을', '서울이'],
        correct: '서울로',
      },
      {
        options: ['이사한 후에', '이사하는 후에', '이사할 후에'],
        correct: '이사한 후에',
      },
      {
        options: ['지하철을', '지하철이', '지하철은'],
        correct: '지하철을',
      },
      {
        options: [
          '자주 타게 되었어요.',
          '자주 타기로 했어요.',
          '자주 타는 후에요.',
        ],
        correct: '자주 타게 되었어요.',
      },
    ],
    {
      uz: 'Seulga ko‘chgandan keyin metroga ko‘p minadigan bo‘ldim.',
      en: 'After moving to Seoul, I came to take the subway often.',
      ru: 'После переезда в Сеул я стал часто ездить на метро.',
    },
  ),

  ...build(
    'gp_s4_u6_g4_18',
    U6_G4,
    [
      {
        options: ['숙제를', '숙제가', '숙제는'],
        correct: '숙제를',
      },
      {
        options: ['다 한 후에', '다 하는 후에', '다 할 후에'],
        correct: '다 한 후에',
      },
      {
        options: ['영화를', '영화가', '영화는'],
        correct: '영화를',
      },
      {
        options: ['볼 거예요.', '먹을 거예요.', '입을 거예요.'],
        correct: '볼 거예요.',
      },
    ],
    {
      uz: 'Uy vazifasidan keyin film ko‘raman.',
      en: 'I will watch a movie after finishing my homework.',
      ru: 'После домашнего задания я посмотрю фильм.',
    },
  ),

  ...build(
    'gp_s4_u6_g4_19',
    U6_G4,
    [
      {
        options: ['사진을', '사진이', '사진은'],
        correct: '사진을',
      },
      {
        options: ['찍은 후에', '찍는 후에', '찍을 후에'],
        correct: '찍은 후에',
      },
      {
        options: ['바로', '가끔', '천천히'],
        correct: '바로',
      },
      {
        options: ['확인했어요.', '먹었어요.', '잤어요.'],
        correct: '확인했어요.',
      },
    ],
    {
      uz: 'Suratga olgach darhol tekshirdim.',
      en: 'I checked it right after taking the photo.',
      ru: 'Сделав фотографию, я сразу её проверил.',
    },
  ),

  ...build(
    'gp_s4_u6_g4_20',
    U6_G4,
    [
      {
        options: ['친구와', '친구를', '친구가'],
        correct: '친구와',
      },
      {
        options: ['이야기한 후에', '이야기하는 후에', '이야기할 후에'],
        correct: '이야기한 후에',
      },
      {
        options: ['생각이', '생각을', '생각은'],
        correct: '생각이',
      },
      {
        options: ['바뀌었어요.', '먹었어요.', '입었어요.'],
        correct: '바뀌었어요.',
      },
    ],
    {
      uz: 'Do‘stim bilan gaplashgach fikrim o‘zgardi.',
      en: 'My opinion changed after talking with my friend.',
      ru: 'После разговора с другом моё мнение изменилось.',
    },
  ),
}; // ═══════════════════════════════════════════════════════════
// UNIT 7 · 16과
// 설날에는 밥 대신 떡국을 먹어요
// ═══════════════════════════════════════════════════════════

// ─────────────────────────────────────────────
// 문법 1. V-아/어 놓다
// ─────────────────────────────────────────────
const U7_G1 = 'verb-a-eo-notda';

const U7_G1_Q = {
  // grammar_blank 10
  ...blank(
    'gp_s4_u7_g1_01',
    U7_G1,
    '손님이 오기 전에 음식을 미리 만들어 놓았어요.',
    '만들어 놓았어요',
    {
      uz: 'Mehmonlar kelishidan oldin ovqatni oldindan tayyorlab qo‘ydim.',
      en: 'I prepared the food in advance before the guests arrived.',
      ru: 'Перед приходом гостей я заранее приготовил еду.',
    },
  ),

  ...blank(
    'gp_s4_u7_g1_02',
    U7_G1,
    '설날에 입을 한복을 미리 꺼내 놓았어요.',
    '꺼내 놓았어요',
    {
      uz: 'Seollalda kiyadigan hanbokni oldindan olib qo‘ydim.',
      en: 'I took out the hanbok for Seollal in advance.',
      ru: 'Я заранее достал ханбок, который надену на Соллаль.',
    },
  ),

  ...blank(
    'gp_s4_u7_g1_03',
    U7_G1,
    '떡국 재료는 냉장고에 넣어 놓았어요.',
    '넣어 놓았어요',
    {
      uz: 'Tteokguk masalliqlarini muzlatkichga solib qo‘ydim.',
      en: 'I put the ingredients for tteokguk in the refrigerator.',
      ru: 'Я положил ингредиенты для ттоккука в холодильник.',
    },
  ),

  ...blank(
    'gp_s4_u7_g1_04',
    U7_G1,
    '창문을 열어 놓아서 방이 시원해요.',
    '열어 놓아서',
    {
      uz: 'Derazani ochiq qoldirganim uchun xona salqin.',
      en: 'The room is cool because I left the window open.',
      ru: 'В комнате прохладно, потому что окно оставили открытым.',
    },
  ),

  ...blank(
    'gp_s4_u7_g1_05',
    U7_G1,
    '필요한 물건을 모두 사 놓았어요.',
    '사 놓았어요',
    {
      uz: 'Kerakli narsalarning hammasini oldindan sotib qo‘ydim.',
      en: 'I bought all the necessary things in advance.',
      ru: 'Я заранее купил всё необходимое.',
    },
  ),

  ...blank(
    'gp_s4_u7_g1_06',
    U7_G1,
    '가족들에게 보낼 선물을 포장해 놓았어요.',
    '포장해 놓았어요',
    {
      uz: 'Oilamga yuboradigan sovg‘alarni o‘rab qo‘ydim.',
      en: 'I wrapped the gifts to send to my family.',
      ru: 'Я заранее упаковал подарки для семьи.',
    },
  ),

  ...blank(
    'gp_s4_u7_g1_07',
    U7_G1,
    '손님들이 앉을 자리를 정리해 놓았어요.',
    '정리해 놓았어요',
    {
      uz: 'Mehmonlar o‘tiradigan joyni oldindan tartibga keltirdim.',
      en: 'I arranged the seating area for the guests in advance.',
      ru: 'Я заранее подготовил места для гостей.',
    },
  ),

  ...blank(
    'gp_s4_u7_g1_08',
    U7_G1,
    '내일 아침에 바쁘니까 옷을 준비해 놓을게요.',
    '준비해 놓을게요',
    {
      uz: 'Ertaga ertalab band bo‘lganim uchun kiyimni oldindan tayyorlab qo‘yaman.',
      en: "I'll prepare my clothes in advance because I'll be busy tomorrow morning.",
      ru: 'Завтра утром будет много дел, поэтому я заранее приготовлю одежду.',
    },
  ),

  ...blank(
    'gp_s4_u7_g1_09',
    U7_G1,
    '잊어버리지 않도록 달력에 표시해 놓았어요.',
    '표시해 놓았어요',
    {
      uz: 'Unutmaslik uchun taqvimga belgilab qo‘ydim.',
      en: 'I marked it on the calendar so I would not forget.',
      ru: 'Чтобы не забыть, я заранее отметил это в календаре.',
    },
  ),

  ...blank(
    'gp_s4_u7_g1_10',
    U7_G1,
    '문은 닫지 말고 열어 놓으세요.',
    '열어 놓으세요',
    {
      uz: 'Eshikni yopmang, ochiq qoldiring.',
      en: 'Do not close the door; leave it open.',
      ru: 'Не закрывайте дверь, оставьте её открытой.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s4_u7_g1_11',
    U7_G1,
    [
      {
        options: ['손님이 오기 전에', '손님이 간 후에', '손님마다'],
        correct: '손님이 오기 전에',
      },
      {
        options: ['음식을', '음식이', '음식은'],
        correct: '음식을',
      },
      {
        options: ['미리', '갑자기', '아직'],
        correct: '미리',
      },
      {
        options: ['만들어 놓았어요.', '만들고 있어요.', '만들기로 했어요.'],
        correct: '만들어 놓았어요.',
      },
    ],
    {
      uz: 'Mehmonlar kelishidan oldin ovqatni tayyorlab qo‘ydim.',
      en: 'I prepared the food in advance before the guests arrived.',
      ru: 'Я заранее приготовил еду до прихода гостей.',
    },
  ),

  ...build(
    'gp_s4_u7_g1_12',
    U7_G1,
    [
      {
        options: ['설날에 입을', '설날에 먹을', '설날에 만날'],
        correct: '설날에 입을',
      },
      {
        options: ['한복을', '한복이', '한복은'],
        correct: '한복을',
      },
      {
        options: ['미리', '가끔', '갑자기'],
        correct: '미리',
      },
      {
        options: ['꺼내 놓았어요.', '꺼내고 있어요.', '꺼내기로 했어요.'],
        correct: '꺼내 놓았어요.',
      },
    ],
    {
      uz: 'Seollalda kiyadigan hanbokni oldindan olib qo‘ydim.',
      en: 'I took out my Seollal hanbok in advance.',
      ru: 'Я заранее достал ханбок к Соллалю.',
    },
  ),

  ...build(
    'gp_s4_u7_g1_13',
    U7_G1,
    [
      {
        options: ['떡국 재료는', '떡국 재료를', '떡국 재료가'],
        correct: '떡국 재료는',
      },
      {
        options: ['냉장고에', '냉장고를', '냉장고가'],
        correct: '냉장고에',
      },
      {
        options: ['넣어 놓았어요.', '넣고 있어요.', '넣기로 했어요.'],
        correct: '넣어 놓았어요.',
      },
    ],
    {
      uz: 'Tteokguk masalliqlarini muzlatkichga solib qo‘ydim.',
      en: 'I put the tteokguk ingredients in the refrigerator.',
      ru: 'Я положил ингредиенты для ттоккука в холодильник.',
    },
  ),

  ...build(
    'gp_s4_u7_g1_14',
    U7_G1,
    [
      {
        options: ['창문을', '창문이', '창문은'],
        correct: '창문을',
      },
      {
        options: ['열어 놓아서', '열고 있어서', '열기로 해서'],
        correct: '열어 놓아서',
      },
      {
        options: ['방이', '방을', '방은'],
        correct: '방이',
      },
      {
        options: ['시원해요.', '바빠요.', '매워요.'],
        correct: '시원해요.',
      },
    ],
    {
      uz: 'Derazani ochiq qoldirganim uchun xona salqin.',
      en: 'The room is cool because the window was left open.',
      ru: 'В комнате прохладно, потому что окно оставлено открытым.',
    },
  ),

  ...build(
    'gp_s4_u7_g1_15',
    U7_G1,
    [
      {
        options: ['필요한 물건을', '필요한 물건이', '필요한 물건은'],
        correct: '필요한 물건을',
      },
      {
        options: ['모두', '가끔', '아직'],
        correct: '모두',
      },
      {
        options: ['사 놓았어요.', '사고 있어요.', '사기로 했어요.'],
        correct: '사 놓았어요.',
      },
    ],
    {
      uz: 'Kerakli narsalarni oldindan sotib qo‘ydim.',
      en: 'I bought everything necessary in advance.',
      ru: 'Я заранее купил все необходимые вещи.',
    },
  ),

  ...build(
    'gp_s4_u7_g1_16',
    U7_G1,
    [
      {
        options: ['가족들에게 보낼', '가족들에게 받을', '가족들에게 먹을'],
        correct: '가족들에게 보낼',
      },
      {
        options: ['선물을', '선물이', '선물은'],
        correct: '선물을',
      },
      {
        options: ['포장해 놓았어요.', '포장하고 있어요.', '포장하기로 했어요.'],
        correct: '포장해 놓았어요.',
      },
    ],
    {
      uz: 'Oilamga yuboradigan sovg‘alarni o‘rab qo‘ydim.',
      en: 'I wrapped the gifts for my family in advance.',
      ru: 'Я заранее упаковал подарки для семьи.',
    },
  ),

  ...build(
    'gp_s4_u7_g1_17',
    U7_G1,
    [
      {
        options: [
          '손님들이 앉을 자리를',
          '손님들이 먹을 음식을',
          '손님들이 입을 옷을',
        ],
        correct: '손님들이 앉을 자리를',
      },
      {
        options: ['정리해 놓았어요.', '정리하고 있어요.', '정리하기로 했어요.'],
        correct: '정리해 놓았어요.',
      },
    ],
    {
      uz: 'Mehmonlar o‘tiradigan joyni oldindan tayyorlab qo‘ydim.',
      en: 'I arranged where the guests would sit in advance.',
      ru: 'Я заранее подготовил места для гостей.',
    },
  ),

  ...build(
    'gp_s4_u7_g1_18',
    U7_G1,
    [
      {
        options: ['내일 아침에', '어제 아침에', '지난주에'],
        correct: '내일 아침에',
      },
      {
        options: ['바쁘니까', '한가했으니까', '끝났으니까'],
        correct: '바쁘니까',
      },
      {
        options: ['옷을', '옷이', '옷은'],
        correct: '옷을',
      },
      {
        options: [
          '준비해 놓을게요.',
          '준비하고 있을게요.',
          '준비하기로 할게요.',
        ],
        correct: '준비해 놓을게요.',
      },
    ],
    {
      uz: 'Ertaga band bo‘laman, shuning uchun kiyimni tayyorlab qo‘yaman.',
      en: "I'll prepare my clothes in advance because I'll be busy tomorrow.",
      ru: 'Завтра я буду занят, поэтому заранее приготовлю одежду.',
    },
  ),

  ...build(
    'gp_s4_u7_g1_19',
    U7_G1,
    [
      {
        options: ['잊어버리지 않도록', '잊어버린 후에', '잊어버릴 때마다'],
        correct: '잊어버리지 않도록',
      },
      {
        options: ['달력에', '달력을', '달력이'],
        correct: '달력에',
      },
      {
        options: [
          '표시해 놓았어요.',
          '표시하고 있었어요.',
          '표시하기로 했어요.',
        ],
        correct: '표시해 놓았어요.',
      },
    ],
    {
      uz: 'Unutmaslik uchun taqvimga belgilab qo‘ydim.',
      en: 'I marked it on the calendar so I would not forget.',
      ru: 'Я отметил это в календаре, чтобы не забыть.',
    },
  ),

  ...build(
    'gp_s4_u7_g1_20',
    U7_G1,
    [
      {
        options: ['문은', '문을', '문이'],
        correct: '문은',
      },
      {
        options: ['닫지 말고', '닫은 후에', '닫기 전에'],
        correct: '닫지 말고',
      },
      {
        options: ['열어 놓으세요.', '열고 계세요.', '열기로 하세요.'],
        correct: '열어 놓으세요.',
      },
    ],
    {
      uz: 'Eshikni yopmang, ochiq qoldiring.',
      en: 'Do not close the door. Leave it open.',
      ru: 'Не закрывайте дверь, оставьте её открытой.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 2. N 대신
// ─────────────────────────────────────────────
const U7_G2 = 'noun-daesin';

const U7_G2_Q = {
  // grammar_blank 10
  ...blank(
    'gp_s4_u7_g2_01',
    U7_G2,
    '설날에는 밥 대신 떡국을 먹어요.',
    '밥 대신',
    {
      uz: 'Seollalda guruch o‘rniga tteokguk yeymiz.',
      en: 'On Seollal, we eat tteokguk instead of rice.',
      ru: 'На Соллаль вместо риса едят ттоккук.',
    },
  ),

  ...blank(
    'gp_s4_u7_g2_02',
    U7_G2,
    '오늘은 커피 대신 따뜻한 차를 마실게요.',
    '커피 대신',
    {
      uz: 'Bugun qahva o‘rniga iliq choy ichaman.',
      en: "Today I'll drink warm tea instead of coffee.",
      ru: 'Сегодня вместо кофе я выпью тёплый чай.',
    },
  ),

  ...blank(
    'gp_s4_u7_g2_03',
    U7_G2,
    '고기 대신 두부를 넣어도 맛있어요.',
    '고기 대신',
    {
      uz: 'Go‘sht o‘rniga tofu solsangiz ham mazali bo‘ladi.',
      en: 'It is delicious even if you use tofu instead of meat.',
      ru: 'Будет вкусно, даже если вместо мяса положить тофу.',
    },
  ),

  ...blank(
    'gp_s4_u7_g2_04',
    U7_G2,
    '이번에는 제가 형 대신 운전할게요.',
    '형 대신',
    {
      uz: 'Bu safar akam o‘rniga men haydayman.',
      en: "This time I'll drive instead of my older brother.",
      ru: 'В этот раз я поведу вместо старшего брата.',
    },
  ),

  ...blank(
    'gp_s4_u7_g2_05',
    U7_G2,
    '선물 대신 손으로 쓴 편지를 준비했어요.',
    '선물 대신',
    {
      uz: 'Sovg‘a o‘rniga qo‘lda yozilgan xat tayyorladim.',
      en: 'I prepared a handwritten letter instead of a gift.',
      ru: 'Вместо подарка я подготовил письмо, написанное от руки.',
    },
  ),

  ...blank(
    'gp_s4_u7_g2_06',
    U7_G2,
    '자동차 대신 지하철을 타고 갈 거예요.',
    '자동차 대신',
    {
      uz: 'Mashina o‘rniga metroda boraman.',
      en: "I'll take the subway instead of a car.",
      ru: 'Вместо машины я поеду на метро.',
    },
  ),

  ...blank(
    'gp_s4_u7_g2_07',
    U7_G2,
    '설탕 대신 꿀을 조금 넣었어요.',
    '설탕 대신',
    {
      uz: 'Shakar o‘rniga biroz asal soldim.',
      en: 'I added a little honey instead of sugar.',
      ru: 'Вместо сахара я добавил немного мёда.',
    },
  ),

  ...blank(
    'gp_s4_u7_g2_08',
    U7_G2,
    '오늘은 어머니 대신 제가 설거지할게요.',
    '어머니 대신',
    {
      uz: 'Bugun onam o‘rniga idishlarni men yuvaman.',
      en: "Today I'll wash the dishes instead of my mother.",
      ru: 'Сегодня я помою посуду вместо мамы.',
    },
  ),

  ...blank(
    'gp_s4_u7_g2_09',
    U7_G2,
    '현금 대신 카드로 계산해도 돼요?',
    '현금 대신',
    {
      uz: 'Naqd pul o‘rniga karta bilan to‘lasam bo‘ladimi?',
      en: 'May I pay by card instead of cash?',
      ru: 'Можно заплатить картой вместо наличных?',
    },
  ),

  ...blank(
    'gp_s4_u7_g2_10',
    U7_G2,
    '아침에는 빵 대신 과일을 먹는 편이에요.',
    '빵 대신',
    {
      uz: 'Ertalab non o‘rniga odatda meva yeyman.',
      en: 'In the morning, I tend to eat fruit instead of bread.',
      ru: 'По утрам я обычно ем фрукты вместо хлеба.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s4_u7_g2_11',
    U7_G2,
    [
      {
        options: ['설날에는', '주말마다', '어제는'],
        correct: '설날에는',
      },
      {
        options: ['밥 대신', '밥마다', '밥처럼'],
        correct: '밥 대신',
      },
      {
        options: ['떡국을', '떡국이', '떡국은'],
        correct: '떡국을',
      },
      {
        options: ['먹어요.', '마셔요.', '입어요.'],
        correct: '먹어요.',
      },
    ],
    {
      uz: 'Seollalda guruch o‘rniga tteokguk yeymiz.',
      en: 'On Seollal, we eat tteokguk instead of rice.',
      ru: 'На Соллаль вместо риса едят ттоккук.',
    },
  ),

  ...build(
    'gp_s4_u7_g2_12',
    U7_G2,
    [
      {
        options: ['오늘은', '어제는', '지난달에는'],
        correct: '오늘은',
      },
      {
        options: ['커피 대신', '커피마다', '커피부터'],
        correct: '커피 대신',
      },
      {
        options: ['따뜻한 차를', '따뜻한 차가', '따뜻한 차는'],
        correct: '따뜻한 차를',
      },
      {
        options: ['마실게요.', '먹을게요.', '입을게요.'],
        correct: '마실게요.',
      },
    ],
    {
      uz: 'Bugun qahva o‘rniga iliq choy ichaman.',
      en: 'Today I will drink warm tea instead of coffee.',
      ru: 'Сегодня я выпью тёплый чай вместо кофе.',
    },
  ),

  ...build(
    'gp_s4_u7_g2_13',
    U7_G2,
    [
      {
        options: ['고기 대신', '고기처럼', '고기마다'],
        correct: '고기 대신',
      },
      {
        options: ['두부를', '두부가', '두부는'],
        correct: '두부를',
      },
      {
        options: ['넣어도', '먹어도', '입어도'],
        correct: '넣어도',
      },
      {
        options: ['맛있어요.', '시끄러워요.', '멀어요.'],
        correct: '맛있어요.',
      },
    ],
    {
      uz: 'Go‘sht o‘rniga tofu solsangiz ham mazali.',
      en: 'It is delicious with tofu instead of meat.',
      ru: 'С тофу вместо мяса тоже вкусно.',
    },
  ),

  ...build(
    'gp_s4_u7_g2_14',
    U7_G2,
    [
      {
        options: ['이번에는', '지난번에는', '아침마다'],
        correct: '이번에는',
      },
      {
        options: ['제가', '저를', '저는'],
        correct: '제가',
      },
      {
        options: ['형 대신', '형처럼', '형마다'],
        correct: '형 대신',
      },
      {
        options: ['운전할게요.', '요리할게요.', '잘게요.'],
        correct: '운전할게요.',
      },
    ],
    {
      uz: 'Bu safar akam o‘rniga men haydayman.',
      en: "This time I'll drive instead of my older brother.",
      ru: 'В этот раз я поведу вместо брата.',
    },
  ),

  ...build(
    'gp_s4_u7_g2_15',
    U7_G2,
    [
      {
        options: ['선물 대신', '선물처럼', '선물부터'],
        correct: '선물 대신',
      },
      {
        options: ['손으로 쓴 편지를', '손으로 쓴 편지가', '손으로 쓴 편지는'],
        correct: '손으로 쓴 편지를',
      },
      {
        options: ['준비했어요.', '마셨어요.', '신었어요.'],
        correct: '준비했어요.',
      },
    ],
    {
      uz: 'Sovg‘a o‘rniga qo‘lda yozilgan xat tayyorladim.',
      en: 'I prepared a handwritten letter instead of a gift.',
      ru: 'Вместо подарка я подготовил письмо от руки.',
    },
  ),

  ...build(
    'gp_s4_u7_g2_16',
    U7_G2,
    [
      {
        options: ['자동차 대신', '자동차처럼', '자동차마다'],
        correct: '자동차 대신',
      },
      {
        options: ['지하철을', '지하철이', '지하철은'],
        correct: '지하철을',
      },
      {
        options: ['타고 갈 거예요.', '먹고 갈 거예요.', '입고 갈 거예요.'],
        correct: '타고 갈 거예요.',
      },
    ],
    {
      uz: 'Mashina o‘rniga metroda boraman.',
      en: "I'll take the subway instead of a car.",
      ru: 'Вместо машины я поеду на метро.',
    },
  ),

  ...build(
    'gp_s4_u7_g2_17',
    U7_G2,
    [
      {
        options: ['설탕 대신', '설탕처럼', '설탕마다'],
        correct: '설탕 대신',
      },
      {
        options: ['꿀을', '꿀이', '꿀은'],
        correct: '꿀을',
      },
      {
        options: ['조금', '매일', '벌써'],
        correct: '조금',
      },
      {
        options: ['넣었어요.', '입었어요.', '읽었어요.'],
        correct: '넣었어요.',
      },
    ],
    {
      uz: 'Shakar o‘rniga biroz asal soldim.',
      en: 'I added a little honey instead of sugar.',
      ru: 'Вместо сахара я добавил немного мёда.',
    },
  ),

  ...build(
    'gp_s4_u7_g2_18',
    U7_G2,
    [
      {
        options: ['오늘은', '어제마다', '다음 달부터는'],
        correct: '오늘은',
      },
      {
        options: ['어머니 대신', '어머니처럼', '어머니마다'],
        correct: '어머니 대신',
      },
      {
        options: ['제가', '저를', '저는'],
        correct: '제가',
      },
      {
        options: ['설거지할게요.', '잠잘게요.', '출근할게요.'],
        correct: '설거지할게요.',
      },
    ],
    {
      uz: 'Bugun onam o‘rniga idishlarni men yuvaman.',
      en: "Today I'll do the dishes instead of my mother.",
      ru: 'Сегодня я помою посуду вместо мамы.',
    },
  ),

  ...build(
    'gp_s4_u7_g2_19',
    U7_G2,
    [
      {
        options: ['현금 대신', '현금처럼', '현금마다'],
        correct: '현금 대신',
      },
      {
        options: ['카드로', '카드를', '카드가'],
        correct: '카드로',
      },
      {
        options: ['계산해도 돼요?', '운전해도 돼요?', '입어도 돼요?'],
        correct: '계산해도 돼요?',
      },
    ],
    {
      uz: 'Naqd pul o‘rniga karta bilan to‘lasam bo‘ladimi?',
      en: 'May I pay by card instead of cash?',
      ru: 'Можно заплатить картой вместо наличных?',
    },
  ),

  ...build(
    'gp_s4_u7_g2_20',
    U7_G2,
    [
      {
        options: ['아침에는', '저녁부터', '주말마다를'],
        correct: '아침에는',
      },
      {
        options: ['빵 대신', '빵처럼', '빵마다'],
        correct: '빵 대신',
      },
      {
        options: ['과일을', '과일이', '과일은'],
        correct: '과일을',
      },
      {
        options: ['먹는 편이에요.', '마시는 편이에요.', '입는 편이에요.'],
        correct: '먹는 편이에요.',
      },
    ],
    {
      uz: 'Ertalab non o‘rniga odatda meva yeyman.',
      en: 'I tend to eat fruit instead of bread in the morning.',
      ru: 'По утрам я обычно ем фрукты вместо хлеба.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 3. V-(으)ㄹ까 하다
// ─────────────────────────────────────────────
const U7_G3 = 'verb-eul-kka-hada';

const U7_G3_Q = {
  // grammar_blank 10
  ...blank(
    'gp_s4_u7_g3_01',
    U7_G3,
    '이번 설에는 고향에 내려갈까 해요.',
    '내려갈까 해요',
    {
      uz: 'Bu Seollalda vatanga borishni o‘ylayapman.',
      en: "I'm thinking of going to my hometown this Seollal.",
      ru: 'На этот Соллаль я думаю съездить домой.',
    },
  ),

  ...blank(
    'gp_s4_u7_g3_02',
    U7_G3,
    '연휴에는 집에서 푹 쉴까 해요.',
    '쉴까 해요',
    {
      uz: 'Bayram ta’tilida uyda yaxshilab dam olmoqchiman.',
      en: "I'm thinking of getting plenty of rest at home during the holiday.",
      ru: 'На праздниках я думаю хорошо отдохнуть дома.',
    },
  ),

  ...blank(
    'gp_s4_u7_g3_03',
    U7_G3,
    '부모님께 작은 선물을 살까 해요.',
    '살까 해요',
    {
      uz: 'Ota-onamga kichik sovg‘a sotib olishni o‘ylayapman.',
      en: "I'm thinking of buying a small gift for my parents.",
      ru: 'Думаю купить родителям небольшой подарок.',
    },
  ),

  ...blank(
    'gp_s4_u7_g3_04',
    U7_G3,
    '내일 아침에 일찍 출발할까 해요.',
    '출발할까 해요',
    {
      uz: 'Ertaga ertalab erta yo‘lga chiqmoqchiman.',
      en: "I'm thinking of leaving early tomorrow morning.",
      ru: 'Думаю завтра утром выехать пораньше.',
    },
  ),

  ...blank(
    'gp_s4_u7_g3_05',
    U7_G3,
    '올해는 직접 떡국을 만들어 볼까 해요.',
    '만들어 볼까 해요',
    {
      uz: 'Bu yil tteokgukni o‘zim tayyorlab ko‘rmoqchiman.',
      en: "I'm thinking of trying to make tteokguk myself this year.",
      ru: 'В этом году думаю попробовать самому приготовить ттоккук.',
    },
  ),

  ...blank(
    'gp_s4_u7_g3_06',
    U7_G3,
    '연휴가 길어서 친구들과 여행을 갈까 해요.',
    '여행을 갈까 해요',
    {
      uz: 'Ta’til uzun bo‘lgani uchun do‘stlarim bilan sayohatga chiqishni o‘ylayapman.',
      en: "Since the holiday is long, I'm thinking of taking a trip with friends.",
      ru: 'Поскольку каникулы длинные, думаю съездить куда-нибудь с друзьями.',
    },
  ),

  ...blank(
    'gp_s4_u7_g3_07',
    U7_G3,
    '이번 주말에는 방을 깨끗이 청소할까 해요.',
    '청소할까 해요',
    {
      uz: 'Bu dam olish kuni xonani yaxshilab tozalamoqchiman.',
      en: "I'm thinking of cleaning my room thoroughly this weekend.",
      ru: 'На этих выходных думаю хорошо убрать комнату.',
    },
  ),

  ...blank(
    'gp_s4_u7_g3_08',
    U7_G3,
    '명절 음식을 조금만 준비할까 해요.',
    '준비할까 해요',
    {
      uz: 'Bayram taomlarini faqat ozroq tayyorlamoqchiman.',
      en: "I'm thinking of preparing only a small amount of holiday food.",
      ru: 'Думаю приготовить совсем немного праздничной еды.',
    },
  ),

  ...blank(
    'gp_s4_u7_g3_09',
    U7_G3,
    '이번에는 기차 대신 버스를 탈까 해요.',
    '버스를 탈까 해요',
    {
      uz: 'Bu safar poyezd o‘rniga avtobusda borishni o‘ylayapman.',
      en: "This time I'm thinking of taking the bus instead of the train.",
      ru: 'В этот раз думаю поехать на автобусе вместо поезда.',
    },
  ),

  ...blank(
    'gp_s4_u7_g3_10',
    U7_G3,
    '날씨가 좋으면 공원에서 윷놀이를 할까 해요.',
    '윷놀이를 할까 해요',
    {
      uz: 'Havo yaxshi bo‘lsa, parkda yut o‘ynashni o‘ylayapman.',
      en: "If the weather is nice, I'm thinking of playing Yut in the park.",
      ru: 'Если погода будет хорошей, думаю поиграть в ют в парке.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s4_u7_g3_11',
    U7_G3,
    [
      {
        options: ['이번 설에는', '지난 설에는', '매일 아침에는'],
        correct: '이번 설에는',
      },
      {
        options: ['고향에', '고향을', '고향이'],
        correct: '고향에',
      },
      {
        options: ['내려갈까 해요.', '내려가기로 했어요.', '내려갈까요?'],
        correct: '내려갈까 해요.',
      },
    ],
    {
      uz: 'Bu Seollalda vatanga borishni o‘ylayapman.',
      en: "I'm thinking of going to my hometown this Seollal.",
      ru: 'На этот Соллаль думаю поехать домой.',
    },
  ),

  ...build(
    'gp_s4_u7_g3_12',
    U7_G3,
    [
      {
        options: ['연휴에는', '연휴마다를', '연휴에게'],
        correct: '연휴에는',
      },
      {
        options: ['집에서', '집을', '집이'],
        correct: '집에서',
      },
      {
        options: ['푹', '갑자기', '벌써'],
        correct: '푹',
      },
      {
        options: ['쉴까 해요.', '쉬기로 했어요.', '쉴까요?'],
        correct: '쉴까 해요.',
      },
    ],
    {
      uz: 'Ta’tilda uyda yaxshilab dam olmoqchiman.',
      en: "I'm thinking of resting at home during the holiday.",
      ru: 'На каникулах думаю хорошо отдохнуть дома.',
    },
  ),

  ...build(
    'gp_s4_u7_g3_13',
    U7_G3,
    [
      {
        options: ['부모님께', '부모님을', '부모님이'],
        correct: '부모님께',
      },
      {
        options: ['작은 선물을', '작은 선물이', '작은 선물은'],
        correct: '작은 선물을',
      },
      {
        options: ['살까 해요.', '사기로 했어요.', '살까요?'],
        correct: '살까 해요.',
      },
    ],
    {
      uz: 'Ota-onamga kichik sovg‘a olishni o‘ylayapman.',
      en: "I'm thinking of buying a small gift for my parents.",
      ru: 'Думаю купить родителям небольшой подарок.',
    },
  ),

  ...build(
    'gp_s4_u7_g3_14',
    U7_G3,
    [
      {
        options: ['내일 아침에', '어제 아침에', '지난주에'],
        correct: '내일 아침에',
      },
      {
        options: ['일찍', '이미', '가끔'],
        correct: '일찍',
      },
      {
        options: ['출발할까 해요.', '출발하기로 했어요.', '출발할까요?'],
        correct: '출발할까 해요.',
      },
    ],
    {
      uz: 'Ertaga ertalab erta jo‘nashni o‘ylayapman.',
      en: "I'm thinking of leaving early tomorrow morning.",
      ru: 'Думаю завтра утром выехать пораньше.',
    },
  ),

  ...build(
    'gp_s4_u7_g3_15',
    U7_G3,
    [
      {
        options: ['올해는', '작년에는', '매년마다를'],
        correct: '올해는',
      },
      {
        options: ['직접', '아직', '벌써'],
        correct: '직접',
      },
      {
        options: ['떡국을', '떡국이', '떡국은'],
        correct: '떡국을',
      },
      {
        options: ['만들어 볼까 해요.', '만들기로 했어요.', '만들어 볼까요?'],
        correct: '만들어 볼까 해요.',
      },
    ],
    {
      uz: 'Bu yil tteokgukni o‘zim tayyorlab ko‘rmoqchiman.',
      en: "I'm thinking of trying to make tteokguk myself.",
      ru: 'В этом году думаю сам приготовить ттоккук.',
    },
  ),

  ...build(
    'gp_s4_u7_g3_16',
    U7_G3,
    [
      {
        options: ['연휴가', '연휴를', '연휴는'],
        correct: '연휴가',
      },
      {
        options: ['길어서', '짧아서', '바빠서'],
        correct: '길어서',
      },
      {
        options: ['친구들과', '친구들을', '친구들이'],
        correct: '친구들과',
      },
      {
        options: [
          '여행을 갈까 해요.',
          '여행을 가기로 했어요.',
          '여행을 갈까요?',
        ],
        correct: '여행을 갈까 해요.',
      },
    ],
    {
      uz: 'Ta’til uzun, shuning uchun do‘stlar bilan sayohat qilishni o‘ylayapman.',
      en: "The holiday is long, so I'm thinking of traveling with friends.",
      ru: 'Каникулы длинные, поэтому думаю съездить куда-нибудь с друзьями.',
    },
  ),

  ...build(
    'gp_s4_u7_g3_17',
    U7_G3,
    [
      {
        options: ['이번 주말에는', '지난 주말에는', '매주마다를'],
        correct: '이번 주말에는',
      },
      {
        options: ['방을', '방이', '방은'],
        correct: '방을',
      },
      {
        options: ['깨끗이', '시끄럽게', '맵게'],
        correct: '깨끗이',
      },
      {
        options: ['청소할까 해요.', '청소하기로 했어요.', '청소할까요?'],
        correct: '청소할까 해요.',
      },
    ],
    {
      uz: 'Bu hafta oxiri xonani tozalamoqchiman.',
      en: "I'm thinking of cleaning my room this weekend.",
      ru: 'На выходных думаю убрать комнату.',
    },
  ),

  ...build(
    'gp_s4_u7_g3_18',
    U7_G3,
    [
      {
        options: ['명절 음식을', '명절 음식이', '명절 음식은'],
        correct: '명절 음식을',
      },
      {
        options: ['조금만', '매일', '벌써'],
        correct: '조금만',
      },
      {
        options: ['준비할까 해요.', '준비하기로 했어요.', '준비할까요?'],
        correct: '준비할까 해요.',
      },
    ],
    {
      uz: 'Bayram taomini ozroq tayyorlamoqchiman.',
      en: "I'm thinking of preparing only a little holiday food.",
      ru: 'Думаю приготовить немного праздничной еды.',
    },
  ),

  ...build(
    'gp_s4_u7_g3_19',
    U7_G3,
    [
      {
        options: ['이번에는', '지난번에는', '아침마다'],
        correct: '이번에는',
      },
      {
        options: ['기차 대신', '기차처럼', '기차마다'],
        correct: '기차 대신',
      },
      {
        options: ['버스를', '버스가', '버스는'],
        correct: '버스를',
      },
      {
        options: ['탈까 해요.', '타기로 했어요.', '탈까요?'],
        correct: '탈까 해요.',
      },
    ],
    {
      uz: 'Bu safar poyezd o‘rniga avtobusda ketmoqchiman.',
      en: "This time I'm thinking of taking the bus instead of the train.",
      ru: 'В этот раз думаю поехать на автобусе вместо поезда.',
    },
  ),

  ...build(
    'gp_s4_u7_g3_20',
    U7_G3,
    [
      {
        options: ['날씨가 좋으면', '날씨가 추웠지만', '날씨가 좋았기 때문에'],
        correct: '날씨가 좋으면',
      },
      {
        options: ['공원에서', '공원에', '공원을'],
        correct: '공원에서',
      },
      {
        options: ['윷놀이를', '윷놀이가', '윷놀이는'],
        correct: '윷놀이를',
      },
      {
        options: ['할까 해요.', '하기로 했어요.', '할까요?'],
        correct: '할까 해요.',
      },
    ],
    {
      uz: 'Havo yaxshi bo‘lsa parkda yut o‘ynashni o‘ylayapman.',
      en: "If the weather is nice, I'm thinking of playing Yut in the park.",
      ru: 'Если будет хорошая погода, думаю поиграть в ют в парке.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 4. A/V-(으)ㄹ 테니까
// ─────────────────────────────────────────────
const U7_G4 = 'av-eul-tenikka';

const U7_G4_Q = {
  // grammar_blank 10
  ...blank(
    'gp_s4_u7_g4_01',
    U7_G4,
    '제가 음식을 준비할 테니까 방을 정리해 주세요.',
    '준비할 테니까',
    {
      uz: 'Men ovqat tayyorlayman, siz xonani yig‘ishtiring.',
      en: "I'll prepare the food, so please tidy the room.",
      ru: 'Я приготовлю еду, поэтому уберите, пожалуйста, комнату.',
    },
  ),

  ...blank(
    'gp_s4_u7_g4_02',
    U7_G4,
    '제가 설거지할 테니까 어머니는 좀 쉬세요.',
    '설거지할 테니까',
    {
      uz: 'Idishlarni men yuvaman, onam biroz dam olsin.',
      en: "I'll do the dishes, so Mom, please get some rest.",
      ru: 'Я помою посуду, а вы, мама, немного отдохните.',
    },
  ),

  ...blank(
    'gp_s4_u7_g4_03',
    U7_G4,
    '길이 많이 막힐 테니까 일찍 출발하세요.',
    '막힐 테니까',
    {
      uz: 'Yo‘l tirband bo‘lishi mumkin, shuning uchun erta yo‘lga chiqing.',
      en: 'Traffic will probably be heavy, so leave early.',
      ru: 'Дороги, скорее всего, будут загружены, поэтому выезжайте пораньше.',
    },
  ),

  ...blank(
    'gp_s4_u7_g4_04',
    U7_G4,
    '날씨가 추울 테니까 따뜻하게 입으세요.',
    '추울 테니까',
    {
      uz: 'Havo sovuq bo‘ladi, shuning uchun issiq kiying.',
      en: 'It will be cold, so dress warmly.',
      ru: 'Будет холодно, поэтому оденьтесь теплее.',
    },
  ),

  ...blank(
    'gp_s4_u7_g4_05',
    U7_G4,
    '제가 장을 볼 테니까 필요한 것을 적어 주세요.',
    '장을 볼 테니까',
    {
      uz: 'Bozorga men boraman, kerakli narsalarni yozib bering.',
      en: "I'll do the grocery shopping, so write down what we need.",
      ru: 'Я схожу за продуктами, поэтому запишите, что нужно купить.',
    },
  ),

  ...blank(
    'gp_s4_u7_g4_06',
    U7_G4,
    '손님이 곧 도착할 테니까 음식 준비를 끝내 주세요.',
    '도착할 테니까',
    {
      uz: 'Mehmonlar tez orada keladi, shuning uchun ovqat tayyorlashni tugating.',
      en: 'The guests will arrive soon, so please finish preparing the food.',
      ru: 'Гости скоро приедут, поэтому закончите подготовку еды.',
    },
  ),

  ...blank(
    'gp_s4_u7_g4_07',
    U7_G4,
    '제가 운전할 테니까 편하게 쉬세요.',
    '운전할 테니까',
    {
      uz: 'Men haydayman, siz bemalol dam oling.',
      en: "I'll drive, so relax.",
      ru: 'Я поведу, а вы спокойно отдыхайте.',
    },
  ),

  ...blank(
    'gp_s4_u7_g4_08',
    U7_G4,
    '사람이 많을 테니까 표를 미리 사 놓으세요.',
    '많을 테니까',
    {
      uz: 'Odam ko‘p bo‘ladi, shuning uchun chiptani oldindan olib qo‘ying.',
      en: 'There will probably be many people, so buy the tickets in advance.',
      ru: 'Людей, вероятно, будет много, поэтому купите билеты заранее.',
    },
  ),

  ...blank(
    'gp_s4_u7_g4_09',
    U7_G4,
    '제가 떡국을 만들 테니까 재료를 준비해 주세요.',
    '만들 테니까',
    {
      uz: 'Tteokgukni men tayyorlayman, siz masalliqlarni tayyorlang.',
      en: "I'll make the tteokguk, so please prepare the ingredients.",
      ru: 'Я приготовлю ттоккук, поэтому подготовьте ингредиенты.',
    },
  ),

  ...blank(
    'gp_s4_u7_g4_10',
    U7_G4,
    '연휴에는 식당이 문을 닫을 테니까 미리 확인하세요.',
    '문을 닫을 테니까',
    {
      uz: 'Bayramda restoranlar yopiq bo‘lishi mumkin, shuning uchun oldindan tekshiring.',
      en: 'Restaurants may be closed during the holiday, so check in advance.',
      ru: 'На праздниках рестораны могут быть закрыты, поэтому проверьте заранее.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s4_u7_g4_11',
    U7_G4,
    [
      {
        options: ['제가', '저를', '저는'],
        correct: '제가',
      },
      {
        options: ['음식을', '음식이', '음식은'],
        correct: '음식을',
      },
      {
        options: ['준비할 테니까', '준비하기 때문에', '준비한 후에'],
        correct: '준비할 테니까',
      },
      {
        options: [
          '방을 정리해 주세요.',
          '방을 먹어 주세요.',
          '방을 마셔 주세요.',
        ],
        correct: '방을 정리해 주세요.',
      },
    ],
    {
      uz: 'Men ovqat tayyorlayman, siz xonani yig‘ishtiring.',
      en: "I'll prepare the food, so please tidy the room.",
      ru: 'Я приготовлю еду, поэтому уберите комнату.',
    },
  ),

  ...build(
    'gp_s4_u7_g4_12',
    U7_G4,
    [
      {
        options: ['제가', '저를', '저는'],
        correct: '제가',
      },
      {
        options: ['설거지할 테니까', '설거지하기 때문에', '설거지한 후에'],
        correct: '설거지할 테니까',
      },
      {
        options: ['어머니는', '어머니를', '어머니가'],
        correct: '어머니는',
      },
      {
        options: ['좀 쉬세요.', '좀 드세요.', '좀 쓰세요.'],
        correct: '좀 쉬세요.',
      },
    ],
    {
      uz: 'Idishlarni men yuvaman, onam dam olsin.',
      en: "I'll do the dishes, so Mom, please rest.",
      ru: 'Я помою посуду, а вы немного отдохните.',
    },
  ),

  ...build(
    'gp_s4_u7_g4_13',
    U7_G4,
    [
      {
        options: ['길이', '길을', '길은'],
        correct: '길이',
      },
      {
        options: ['많이 막힐 테니까', '많이 막기 때문에', '많이 막힌 후에'],
        correct: '많이 막힐 테니까',
      },
      {
        options: ['일찍', '늦게', '가끔'],
        correct: '일찍',
      },
      {
        options: ['출발하세요.', '주무세요.', '드세요.'],
        correct: '출발하세요.',
      },
    ],
    {
      uz: 'Yo‘l tirband bo‘ladi, shuning uchun erta chiqing.',
      en: 'Traffic will be heavy, so leave early.',
      ru: 'Будут пробки, поэтому выезжайте пораньше.',
    },
  ),

  ...build(
    'gp_s4_u7_g4_14',
    U7_G4,
    [
      {
        options: ['날씨가', '날씨를', '날씨는'],
        correct: '날씨가',
      },
      {
        options: ['추울 테니까', '춥을 테니까', '추운 테니까'],
        correct: '추울 테니까',
      },
      {
        options: ['따뜻하게', '시원하게', '가볍게'],
        correct: '따뜻하게',
      },
      {
        options: ['입으세요.', '마시세요.', '읽으세요.'],
        correct: '입으세요.',
      },
    ],
    {
      uz: 'Havo sovuq bo‘ladi, issiq kiying.',
      en: 'It will be cold, so dress warmly.',
      ru: 'Будет холодно, поэтому оденьтесь теплее.',
    },
  ),

  ...build(
    'gp_s4_u7_g4_15',
    U7_G4,
    [
      {
        options: ['제가', '저를', '저는'],
        correct: '제가',
      },
      {
        options: ['장을 볼 테니까', '장을 보기 때문에', '장을 본 후에'],
        correct: '장을 볼 테니까',
      },
      {
        options: ['필요한 것을', '필요한 것이', '필요한 것은'],
        correct: '필요한 것을',
      },
      {
        options: ['적어 주세요.', '먹어 주세요.', '입어 주세요.'],
        correct: '적어 주세요.',
      },
    ],
    {
      uz: 'Xaridni men qilaman, kerakli narsalarni yozing.',
      en: "I'll do the shopping, so write down what we need.",
      ru: 'Я схожу за продуктами, поэтому запишите, что нужно.',
    },
  ),

  ...build(
    'gp_s4_u7_g4_16',
    U7_G4,
    [
      {
        options: ['손님이', '손님을', '손님은'],
        correct: '손님이',
      },
      {
        options: ['곧', '어제', '가끔'],
        correct: '곧',
      },
      {
        options: ['도착할 테니까', '도착하기 때문에', '도착한 후에'],
        correct: '도착할 테니까',
      },
      {
        options: [
          '음식 준비를 끝내 주세요.',
          '음식 준비를 드세요.',
          '음식 준비를 입으세요.',
        ],
        correct: '음식 준비를 끝내 주세요.',
      },
    ],
    {
      uz: 'Mehmonlar tez orada keladi, ovqat tayyorlashni tugating.',
      en: 'The guests will arrive soon, so finish preparing the food.',
      ru: 'Гости скоро придут, поэтому закончите готовить.',
    },
  ),

  ...build(
    'gp_s4_u7_g4_17',
    U7_G4,
    [
      {
        options: ['제가', '저를', '저는'],
        correct: '제가',
      },
      {
        options: ['운전할 테니까', '운전하기 때문에', '운전한 후에'],
        correct: '운전할 테니까',
      },
      {
        options: ['편하게', '맵게', '시끄럽게'],
        correct: '편하게',
      },
      {
        options: ['쉬세요.', '드세요.', '읽으세요.'],
        correct: '쉬세요.',
      },
    ],
    {
      uz: 'Men haydayman, siz bemalol dam oling.',
      en: "I'll drive, so please relax.",
      ru: 'Я поведу, поэтому отдыхайте.',
    },
  ),

  ...build(
    'gp_s4_u7_g4_18',
    U7_G4,
    [
      {
        options: ['사람이', '사람을', '사람은'],
        correct: '사람이',
      },
      {
        options: ['많을 테니까', '많는 테니까', '많은 테니까'],
        correct: '많을 테니까',
      },
      {
        options: ['표를', '표가', '표는'],
        correct: '표를',
      },
      {
        options: [
          '미리 사 놓으세요.',
          '미리 사고 계세요.',
          '미리 사기로 하세요.',
        ],
        correct: '미리 사 놓으세요.',
      },
    ],
    {
      uz: 'Odam ko‘p bo‘ladi, chiptani oldindan oling.',
      en: 'There will be many people, so buy the tickets in advance.',
      ru: 'Людей будет много, поэтому купите билеты заранее.',
    },
  ),

  ...build(
    'gp_s4_u7_g4_19',
    U7_G4,
    [
      {
        options: ['제가', '저를', '저는'],
        correct: '제가',
      },
      {
        options: ['떡국을', '떡국이', '떡국은'],
        correct: '떡국을',
      },
      {
        options: ['만들 테니까', '만드는 테니까', '만든 테니까'],
        correct: '만들 테니까',
      },
      {
        options: [
          '재료를 준비해 주세요.',
          '재료를 드셔 주세요.',
          '재료를 입어 주세요.',
        ],
        correct: '재료를 준비해 주세요.',
      },
    ],
    {
      uz: 'Tteokgukni men tayyorlayman, masalliqlarni tayyorlang.',
      en: "I'll make the tteokguk, so please prepare the ingredients.",
      ru: 'Я приготовлю ттоккук, а вы подготовьте ингредиенты.',
    },
  ),

  ...build(
    'gp_s4_u7_g4_20',
    U7_G4,
    [
      {
        options: ['연휴에는', '연휴를', '연휴가'],
        correct: '연휴에는',
      },
      {
        options: ['식당이', '식당을', '식당은'],
        correct: '식당이',
      },
      {
        options: ['문을 닫을 테니까', '문을 닫기 때문에', '문을 닫은 후에'],
        correct: '문을 닫을 테니까',
      },
      {
        options: ['미리 확인하세요.', '미리 드세요.', '미리 입으세요.'],
        correct: '미리 확인하세요.',
      },
    ],
    {
      uz: 'Bayramda restoranlar yopiq bo‘lishi mumkin, oldindan tekshiring.',
      en: 'Restaurants may be closed during the holiday, so check in advance.',
      ru: 'На праздниках рестораны могут быть закрыты, поэтому проверьте заранее.',
    },
  ),
};
// ═══════════════════════════════════════════════════════════
// UNIT 8 · 17과
// 비행기를 놓칠 뻔했어요
// ═══════════════════════════════════════════════════════════

// ─────────────────────────────────────────────
// 문법 1. V-아다/어다 주다
// ─────────────────────────────────────────────
const U8_G1 = 'verb-ada-eoda-juda';

const U8_G1_Q = {
  // grammar_blank 10
  ...blank(
    'gp_s4_u8_g1_01',
    U8_G1,
    '약국에서 감기약을 사다 주세요.',
    '사다 주세요',
    {
      uz: 'Dorixonadan shamollash dorisini olib keling.',
      en: 'Please buy some cold medicine at the pharmacy and bring it.',
      ru: 'Купите, пожалуйста, в аптеке лекарство от простуды и принесите его.',
    },
  ),

  ...blank(
    'gp_s4_u8_g1_02',
    U8_G1,
    '정수기에서 물을 한 컵 떠다 주세요.',
    '떠다 주세요',
    {
      uz: 'Dispenserdan bir stakan suv olib keling.',
      en: 'Please get me a cup of water from the dispenser.',
      ru: 'Принесите, пожалуйста, стакан воды из кулера.',
    },
  ),

  ...blank(
    'gp_s4_u8_g1_03',
    U8_G1,
    '도서관에서 이 책을 빌려다 주세요.',
    '빌려다 주세요',
    {
      uz: 'Kutubxonadan shu kitobni olib keling.',
      en: 'Please borrow this book from the library and bring it to me.',
      ru: 'Возьмите, пожалуйста, эту книгу в библиотеке и принесите её.',
    },
  ),

  ...blank(
    'gp_s4_u8_g1_04',
    U8_G1,
    '아이를 집까지 데려다 주세요.',
    '데려다 주세요',
    {
      uz: 'Bolani uyigacha olib boring.',
      en: 'Please take the child home.',
      ru: 'Отведите, пожалуйста, ребёнка домой.',
    },
  ),

  ...blank(
    'gp_s4_u8_g1_05',
    U8_G1,
    '제 가방을 이쪽으로 가져다 주세요.',
    '가져다 주세요',
    {
      uz: 'Sumkamni bu yerga olib keling.',
      en: 'Please bring my bag over here.',
      ru: 'Принесите, пожалуйста, мою сумку сюда.',
    },
  ),

  ...blank(
    'gp_s4_u8_g1_06',
    U8_G1,
    '편의점에서 우산을 하나 사다 줄래요?',
    '사다 줄래요?',
    {
      uz: 'Do‘kondan bitta soyabon olib kelib bera olasizmi?',
      en: 'Could you buy an umbrella at the convenience store and bring it to me?',
      ru: 'Можешь купить в магазине зонт и принести мне?',
    },
  ),

  ...blank(
    'gp_s4_u8_g1_07',
    U8_G1,
    '친구가 정수기에서 물을 떠다 줬어요.',
    '떠다 줬어요',
    {
      uz: 'Do‘stim dispenserdan menga suv olib berdi.',
      en: 'My friend brought me some water from the dispenser.',
      ru: 'Друг принёс мне воды из кулера.',
    },
  ),

  ...blank(
    'gp_s4_u8_g1_08',
    U8_G1,
    '친구가 필요한 책을 도서관에서 빌려다 줬어요.',
    '빌려다 줬어요',
    {
      uz: 'Do‘stim kerakli kitobni kutubxonadan olib berdi.',
      en: 'My friend borrowed the book I needed from the library and brought it to me.',
      ru: 'Друг взял нужную мне книгу в библиотеке и принёс её.',
    },
  ),

  ...blank(
    'gp_s4_u8_g1_09',
    U8_G1,
    '택시 기사님이 호텔 앞까지 데려다 주셨어요.',
    '데려다 주셨어요',
    {
      uz: 'Taksi haydovchisi meni mehmonxona oldigacha olib bordi.',
      en: 'The taxi driver took me to the front of the hotel.',
      ru: 'Водитель такси довёз меня до гостиницы.',
    },
  ),

  ...blank(
    'gp_s4_u8_g1_10',
    U8_G1,
    '직원이 제 짐을 객실까지 가져다 주었어요.',
    '가져다 주었어요',
    {
      uz: 'Xodim yukimni xonamgacha olib keldi.',
      en: 'The employee brought my luggage to my room.',
      ru: 'Сотрудник принёс мой багаж до номера.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s4_u8_g1_11',
    U8_G1,
    [
      {
        options: ['약국에서', '약국으로', '약국까지'],
        correct: '약국에서',
      },
      {
        options: ['감기약을', '감기약이', '감기약은'],
        correct: '감기약을',
      },
      {
        options: ['사다 주세요.', '사 주세요.', '사고 주세요.'],
        correct: '사다 주세요.',
      },
    ],
    {
      uz: 'Dorixonadan shamollash dorisini olib keling.',
      en: 'Please buy cold medicine at the pharmacy and bring it.',
      ru: 'Купите в аптеке лекарство от простуды и принесите его.',
    },
  ),

  ...build(
    'gp_s4_u8_g1_12',
    U8_G1,
    [
      {
        options: ['정수기에서', '정수기를', '정수기가'],
        correct: '정수기에서',
      },
      {
        options: ['물을 한 컵', '물에 한 컵', '물이 한 컵'],
        correct: '물을 한 컵',
      },
      {
        options: ['떠다 주세요.', '떠 주세요.', '뜨고 주세요.'],
        correct: '떠다 주세요.',
      },
    ],
    {
      uz: 'Dispenserdan bir stakan suv olib keling.',
      en: 'Please get me a cup of water from the dispenser.',
      ru: 'Принесите стакан воды из кулера.',
    },
  ),

  ...build(
    'gp_s4_u8_g1_13',
    U8_G1,
    [
      {
        options: ['도서관에서', '도서관에만', '도서관부터'],
        correct: '도서관에서',
      },
      {
        options: ['이 책을', '이 책이', '이 책은'],
        correct: '이 책을',
      },
      {
        options: ['빌려다 주세요.', '빌려 주세요.', '빌리고 주세요.'],
        correct: '빌려다 주세요.',
      },
    ],
    {
      uz: 'Kutubxonadan shu kitobni olib keling.',
      en: 'Please borrow this book from the library and bring it.',
      ru: 'Возьмите эту книгу в библиотеке и принесите.',
    },
  ),

  ...build(
    'gp_s4_u8_g1_14',
    U8_G1,
    [
      {
        options: ['아이를', '아이가', '아이는'],
        correct: '아이를',
      },
      {
        options: ['집까지', '집마다', '집부터'],
        correct: '집까지',
      },
      {
        options: ['데려다 주세요.', '데리고 주세요.', '데려 주세요.'],
        correct: '데려다 주세요.',
      },
    ],
    {
      uz: 'Bolani uyigacha olib boring.',
      en: 'Please take the child home.',
      ru: 'Отведите ребёнка домой.',
    },
  ),

  ...build(
    'gp_s4_u8_g1_15',
    U8_G1,
    [
      {
        options: ['제 가방을', '제 가방이', '제 가방은'],
        correct: '제 가방을',
      },
      {
        options: ['이쪽으로', '이쪽에서', '이쪽마다'],
        correct: '이쪽으로',
      },
      {
        options: ['가져다 주세요.', '가져 주세요.', '가져오고 주세요.'],
        correct: '가져다 주세요.',
      },
    ],
    {
      uz: 'Sumkamni bu yerga olib keling.',
      en: 'Please bring my bag over here.',
      ru: 'Принесите мою сумку сюда.',
    },
  ),

  ...build(
    'gp_s4_u8_g1_16',
    U8_G1,
    [
      {
        options: ['편의점에서', '편의점을', '편의점이'],
        correct: '편의점에서',
      },
      {
        options: ['우산을 하나', '우산이 하나', '우산은 하나'],
        correct: '우산을 하나',
      },
      {
        options: ['사다 줄래요?', '사 줄래요?', '사고 줄래요?'],
        correct: '사다 줄래요?',
      },
    ],
    {
      uz: 'Do‘kondan soyabon olib kelib bera olasizmi?',
      en: 'Could you buy an umbrella and bring it to me?',
      ru: 'Можешь купить зонт и принести его?',
    },
  ),

  ...build(
    'gp_s4_u8_g1_17',
    U8_G1,
    [
      {
        options: ['친구가', '친구를', '친구는'],
        correct: '친구가',
      },
      {
        options: ['물을', '물이', '물은'],
        correct: '물을',
      },
      {
        options: ['떠다 줬어요.', '떠 줬어요.', '뜨고 줬어요.'],
        correct: '떠다 줬어요.',
      },
    ],
    {
      uz: 'Do‘stim menga suv olib berdi.',
      en: 'My friend brought me some water.',
      ru: 'Друг принёс мне воды.',
    },
  ),

  ...build(
    'gp_s4_u8_g1_18',
    U8_G1,
    [
      {
        options: ['친구가', '친구를', '친구는'],
        correct: '친구가',
      },
      {
        options: ['필요한 책을', '필요한 책이', '필요한 책은'],
        correct: '필요한 책을',
      },
      {
        options: ['빌려다 줬어요.', '빌려 줬어요.', '빌리고 줬어요.'],
        correct: '빌려다 줬어요.',
      },
    ],
    {
      uz: 'Do‘stim menga kerakli kitobni olib berdi.',
      en: 'My friend borrowed the book I needed and brought it to me.',
      ru: 'Друг взял нужную книгу и принёс её мне.',
    },
  ),

  ...build(
    'gp_s4_u8_g1_19',
    U8_G1,
    [
      {
        options: ['택시 기사님이', '택시 기사님을', '택시 기사님은'],
        correct: '택시 기사님이',
      },
      {
        options: ['호텔 앞까지', '호텔 앞마다', '호텔 앞부터만'],
        correct: '호텔 앞까지',
      },
      {
        options: ['데려다 주셨어요.', '데리고 주셨어요.', '데려 주셨어요.'],
        correct: '데려다 주셨어요.',
      },
    ],
    {
      uz: 'Taksi haydovchisi meni mehmonxona oldigacha olib bordi.',
      en: 'The taxi driver took me to the hotel.',
      ru: 'Водитель такси довёз меня до гостиницы.',
    },
  ),

  ...build(
    'gp_s4_u8_g1_20',
    U8_G1,
    [
      {
        options: ['직원이', '직원을', '직원은'],
        correct: '직원이',
      },
      {
        options: ['제 짐을', '제 짐이', '제 짐은'],
        correct: '제 짐을',
      },
      {
        options: ['객실까지', '객실마다', '객실부터'],
        correct: '객실까지',
      },
      {
        options: ['가져다 주었어요.', '가져 주었어요.', '가져오고 주었어요.'],
        correct: '가져다 주었어요.',
      },
    ],
    {
      uz: 'Xodim yukimni xonamgacha olib keldi.',
      en: 'The employee brought my luggage to my room.',
      ru: 'Сотрудник принёс мой багаж до номера.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 2. V-(으)ㄹ 뻔하다
// ─────────────────────────────────────────────
const U8_G2 = 'verb-eul-ppeonhada';

const U8_G2_Q = {
  // grammar_blank 10
  ...blank(
    'gp_s4_u8_g2_01',
    U8_G2,
    '공항에 늦게 도착해서 비행기를 놓칠 뻔했어요.',
    '놓칠 뻔했어요',
    {
      uz: 'Aeroportga kech kelib, samolyotdan qolib ketay dedim.',
      en: 'I arrived at the airport late and almost missed my flight.',
      ru: 'Я поздно приехал в аэропорт и чуть не опоздал на самолёт.',
    },
  ),

  ...blank(
    'gp_s4_u8_g2_02',
    U8_G2,
    '길을 건너다가 차에 부딪힐 뻔했어요.',
    '부딪힐 뻔했어요',
    {
      uz: 'Yo‘lni kesib o‘tayotib, mashinaga urilib ketay dedim.',
      en: 'I almost got hit by a car while crossing the street.',
      ru: 'Переходя дорогу, я чуть не попал под машину.',
    },
  ),

  ...blank(
    'gp_s4_u8_g2_03',
    U8_G2,
    '계단에서 미끄러져서 넘어질 뻔했어요.',
    '넘어질 뻔했어요',
    {
      uz: 'Zinada sirpanib, yiqilib ketay dedim.',
      en: 'I slipped on the stairs and almost fell.',
      ru: 'Я поскользнулся на лестнице и чуть не упал.',
    },
  ),

  ...blank(
    'gp_s4_u8_g2_04',
    U8_G2,
    '여권을 집에 두고 와서 여행을 못 갈 뻔했어요.',
    '못 갈 뻔했어요',
    {
      uz: 'Pasportni uyda qoldirib, sayohatga bora olmay qolay dedim.',
      en: 'I left my passport at home and almost could not go on the trip.',
      ru: 'Я оставил паспорт дома и чуть не сорвал поездку.',
    },
  ),

  ...blank(
    'gp_s4_u8_g2_05',
    U8_G2,
    '알람을 못 들어서 회사에 지각할 뻔했어요.',
    '지각할 뻔했어요',
    {
      uz: 'Budilnikni eshitmay, ishga kech qolay dedim.',
      en: 'I did not hear my alarm and almost arrived late for work.',
      ru: 'Я не услышал будильник и чуть не опоздал на работу.',
    },
  ),

  ...blank(
    'gp_s4_u8_g2_06',
    U8_G2,
    '휴대폰을 택시에 두고 내릴 뻔했어요.',
    '두고 내릴 뻔했어요',
    {
      uz: 'Telefonimni taksida qoldirib tushay dedim.',
      en: 'I almost left my phone in the taxi.',
      ru: 'Я чуть не оставил телефон в такси.',
    },
  ),

  ...blank(
    'gp_s4_u8_g2_07',
    U8_G2,
    '뜨거운 물을 쏟아서 손을 데일 뻔했어요.',
    '데일 뻔했어요',
    {
      uz: 'Issiq suvni to‘kib, qo‘limni kuydirib olay dedim.',
      en: 'I spilled hot water and almost burned my hand.',
      ru: 'Я пролил горячую воду и чуть не обжёг руку.',
    },
  ),

  ...blank(
    'gp_s4_u8_g2_08',
    U8_G2,
    '중요한 서류를 실수로 버릴 뻔했어요.',
    '버릴 뻔했어요',
    {
      uz: 'Muhim hujjatni xato qilib tashlab yuboray dedim.',
      en: 'I almost threw away an important document by mistake.',
      ru: 'Я чуть не выбросил важный документ по ошибке.',
    },
  ),

  ...blank(
    'gp_s4_u8_g2_09',
    U8_G2,
    '버스에서 졸다가 내릴 곳을 지나칠 뻔했어요.',
    '지나칠 뻔했어요',
    {
      uz: 'Avtobusda uxlab qolib, bekatimdan o‘tib ketay dedim.',
      en: 'I dozed off on the bus and almost missed my stop.',
      ru: 'Я задремал в автобусе и чуть не проехал свою остановку.',
    },
  ),

  ...blank(
    'gp_s4_u8_g2_10',
    U8_G2,
    '카메라를 떨어뜨려서 고장 낼 뻔했어요.',
    '고장 낼 뻔했어요',
    {
      uz: 'Kamerani tushirib yuborib, sindirib qo‘yay dedim.',
      en: 'I dropped the camera and almost broke it.',
      ru: 'Я уронил камеру и чуть её не сломал.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s4_u8_g2_11',
    U8_G2,
    [
      {
        options: ['공항에', '공항을', '공항이'],
        correct: '공항에',
      },
      {
        options: ['늦게 도착해서', '일찍 출발해서', '미리 예약해서'],
        correct: '늦게 도착해서',
      },
      {
        options: ['비행기를', '비행기가', '비행기는'],
        correct: '비행기를',
      },
      {
        options: ['놓칠 뻔했어요.', '놓치려고 했어요.', '놓치는 중이었어요.'],
        correct: '놓칠 뻔했어요.',
      },
    ],
    {
      uz: 'Aeroportga kech kelib, samolyotdan qolib ketay dedim.',
      en: 'I arrived late and almost missed my flight.',
      ru: 'Я приехал поздно и чуть не опоздал на самолёт.',
    },
  ),

  ...build(
    'gp_s4_u8_g2_12',
    U8_G2,
    [
      {
        options: ['길을 건너다가', '길을 건넌 후에', '길을 건너기 전에'],
        correct: '길을 건너다가',
      },
      {
        options: ['차에', '차를', '차가'],
        correct: '차에',
      },
      {
        options: [
          '부딪힐 뻔했어요.',
          '부딪히려고 했어요.',
          '부딪히고 있었어요.',
        ],
        correct: '부딪힐 뻔했어요.',
      },
    ],
    {
      uz: 'Yo‘lni kesib o‘tayotib mashinaga urilay dedim.',
      en: 'I almost got hit by a car while crossing the street.',
      ru: 'Переходя дорогу, я чуть не попал под машину.',
    },
  ),

  ...build(
    'gp_s4_u8_g2_13',
    U8_G2,
    [
      {
        options: ['계단에서', '계단을', '계단이'],
        correct: '계단에서',
      },
      {
        options: ['미끄러져서', '기다려서', '앉아 있어서'],
        correct: '미끄러져서',
      },
      {
        options: [
          '넘어질 뻔했어요.',
          '넘어지려고 했어요.',
          '넘어지고 있었어요.',
        ],
        correct: '넘어질 뻔했어요.',
      },
    ],
    {
      uz: 'Zinada sirpanib yiqilay dedim.',
      en: 'I slipped on the stairs and almost fell.',
      ru: 'Я поскользнулся на лестнице и чуть не упал.',
    },
  ),

  ...build(
    'gp_s4_u8_g2_14',
    U8_G2,
    [
      {
        options: ['여권을', '여권이', '여권은'],
        correct: '여권을',
      },
      {
        options: ['집에 두고 와서', '가방에 넣어 두어서', '미리 준비해서'],
        correct: '집에 두고 와서',
      },
      {
        options: ['여행을', '여행이', '여행은'],
        correct: '여행을',
      },
      {
        options: ['못 갈 뻔했어요.', '안 가려고 했어요.', '못 가고 있었어요.'],
        correct: '못 갈 뻔했어요.',
      },
    ],
    {
      uz: 'Pasportni uyda qoldirib, sayohatga bora olmay qolay dedim.',
      en: 'I left my passport at home and almost missed the trip.',
      ru: 'Я оставил паспорт дома и чуть не сорвал поездку.',
    },
  ),

  ...build(
    'gp_s4_u8_g2_15',
    U8_G2,
    [
      {
        options: ['알람을', '알람이', '알람은'],
        correct: '알람을',
      },
      {
        options: ['못 들어서', '잘 들어서', '미리 맞춰서'],
        correct: '못 들어서',
      },
      {
        options: ['회사에', '회사를', '회사가'],
        correct: '회사에',
      },
      {
        options: [
          '지각할 뻔했어요.',
          '지각하려고 했어요.',
          '지각하고 있었어요.',
        ],
        correct: '지각할 뻔했어요.',
      },
    ],
    {
      uz: 'Budilnikni eshitmay, ishga kech qolay dedim.',
      en: 'I did not hear my alarm and almost arrived late for work.',
      ru: 'Я не услышал будильник и чуть не опоздал.',
    },
  ),

  ...build(
    'gp_s4_u8_g2_16',
    U8_G2,
    [
      {
        options: ['휴대폰을', '휴대폰이', '휴대폰은'],
        correct: '휴대폰을',
      },
      {
        options: ['택시에', '택시를', '택시가'],
        correct: '택시에',
      },
      {
        options: [
          '두고 내릴 뻔했어요.',
          '두고 내리려고 했어요.',
          '두고 내리고 있었어요.',
        ],
        correct: '두고 내릴 뻔했어요.',
      },
    ],
    {
      uz: 'Telefonimni taksida qoldirib ketay dedim.',
      en: 'I almost left my phone in the taxi.',
      ru: 'Я чуть не оставил телефон в такси.',
    },
  ),

  ...build(
    'gp_s4_u8_g2_17',
    U8_G2,
    [
      {
        options: ['뜨거운 물을', '차가운 물을', '깨끗한 물을'],
        correct: '뜨거운 물을',
      },
      {
        options: ['쏟아서', '마셔서', '사서'],
        correct: '쏟아서',
      },
      {
        options: ['손을', '손이', '손은'],
        correct: '손을',
      },
      {
        options: ['데일 뻔했어요.', '데려고 했어요.', '데고 있었어요.'],
        correct: '데일 뻔했어요.',
      },
    ],
    {
      uz: 'Issiq suvni to‘kib, qo‘limni kuydiray dedim.',
      en: 'I spilled hot water and almost burned my hand.',
      ru: 'Я пролил горячую воду и чуть не обжёг руку.',
    },
  ),

  ...build(
    'gp_s4_u8_g2_18',
    U8_G2,
    [
      {
        options: ['중요한 서류를', '중요한 서류가', '중요한 서류는'],
        correct: '중요한 서류를',
      },
      {
        options: ['실수로', '일부러', '미리'],
        correct: '실수로',
      },
      {
        options: ['버릴 뻔했어요.', '버리려고 했어요.', '버리고 있었어요.'],
        correct: '버릴 뻔했어요.',
      },
    ],
    {
      uz: 'Muhim hujjatni xato qilib tashlab yuboray dedim.',
      en: 'I almost threw away an important document by mistake.',
      ru: 'Я чуть не выбросил важный документ по ошибке.',
    },
  ),

  ...build(
    'gp_s4_u8_g2_19',
    U8_G2,
    [
      {
        options: ['버스에서', '버스를', '버스가'],
        correct: '버스에서',
      },
      {
        options: ['졸다가', '내린 후에', '타기 전에'],
        correct: '졸다가',
      },
      {
        options: ['내릴 곳을', '내릴 곳이', '내릴 곳은'],
        correct: '내릴 곳을',
      },
      {
        options: [
          '지나칠 뻔했어요.',
          '지나치려고 했어요.',
          '지나치고 있었어요.',
        ],
        correct: '지나칠 뻔했어요.',
      },
    ],
    {
      uz: 'Avtobusda uxlab qolib, bekatimdan o‘tib ketay dedim.',
      en: 'I dozed off on the bus and almost missed my stop.',
      ru: 'Я задремал в автобусе и чуть не проехал остановку.',
    },
  ),

  ...build(
    'gp_s4_u8_g2_20',
    U8_G2,
    [
      {
        options: ['카메라를', '카메라가', '카메라는'],
        correct: '카메라를',
      },
      {
        options: ['떨어뜨려서', '잘 보관해서', '미리 사서'],
        correct: '떨어뜨려서',
      },
      {
        options: [
          '고장 낼 뻔했어요.',
          '고장 내려고 했어요.',
          '고장 내고 있었어요.',
        ],
        correct: '고장 낼 뻔했어요.',
      },
    ],
    {
      uz: 'Kamerani tushirib, buzib qo‘yay dedim.',
      en: 'I dropped the camera and almost broke it.',
      ru: 'Я уронил камеру и чуть её не сломал.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 3. 'ㅎ' 불규칙
// ─────────────────────────────────────────────
const U8_G3 = 'h-irregular';

const U8_G3_Q = {
  // grammar_blank 10
  ...blank('gp_s4_u8_g3_01', U8_G3, '제가 잃어버린 가방은 빨개요.', '빨개요', {
    uz: 'Men yo‘qotgan sumka qizil.',
    en: 'The bag I lost is red.',
    ru: 'Сумка, которую я потерял, красная.',
  }),

  ...blank(
    'gp_s4_u8_g3_02',
    U8_G3,
    '그 사람은 하얀 모자를 쓰고 있어요.',
    '하얀',
    {
      uz: 'U odam oq bosh kiyim kiyib turibdi.',
      en: 'That person is wearing a white hat.',
      ru: 'На том человеке белая шляпа.',
    },
  ),

  ...blank(
    'gp_s4_u8_g3_03',
    U8_G3,
    '제 여행 가방은 파란색이에요.',
    '파란색이에요',
    {
      uz: 'Mening chamadonim ko‘k rangda.',
      en: 'My suitcase is blue.',
      ru: 'Мой чемодан синего цвета.',
    },
  ),

  ...blank(
    'gp_s4_u8_g3_04',
    U8_G3,
    '분실물 센터에 노란 우산이 있어요.',
    '노란',
    {
      uz: 'Yo‘qolgan buyumlar markazida sariq soyabon bor.',
      en: 'There is a yellow umbrella at the lost-and-found center.',
      ru: 'В бюро находок есть жёлтый зонт.',
    },
  ),

  ...blank('gp_s4_u8_g3_05', U8_G3, '사진보다 실제 색이 더 파래요.', '파래요', {
    uz: 'Haqiqiy rangi suratdagidan ko‘kroq.',
    en: 'The actual color is bluer than in the photo.',
    ru: 'В действительности цвет более синий, чем на фотографии.',
  }),

  ...blank('gp_s4_u8_g3_06', U8_G3, '얼굴이 왜 이렇게 빨개요?', '빨개요?', {
    uz: 'Nega yuzingiz bunchalik qizil?',
    en: 'Why is your face so red?',
    ru: 'Почему у вас такое красное лицо?',
  }),

  ...blank('gp_s4_u8_g3_07', U8_G3, '어떤 가방을 잃어버렸어요?', '어떤', {
    uz: 'Qanday sumkani yo‘qotdingiz?',
    en: 'What kind of bag did you lose?',
    ru: 'Какую сумку вы потеряли?',
  }),

  ...blank('gp_s4_u8_g3_08', U8_G3, '그런 모양의 가방은 여기 없어요.', '그런', {
    uz: 'Bunday shakldagi sumka bu yerda yo‘q.',
    en: 'There is no bag of that shape here.',
    ru: 'Сумки такой формы здесь нет.',
  }),

  ...blank('gp_s4_u8_g3_09', U8_G3, '눈이 와서 밖이 아주 하얘요.', '하얘요', {
    uz: 'Qor yog‘ib, tashqari juda oppoq.',
    en: 'It snowed, so everything outside is very white.',
    ru: 'Выпал снег, и на улице всё белое.',
  }),

  ...blank(
    'gp_s4_u8_g3_10',
    U8_G3,
    '이 노란색 가방이 제 가방이에요.',
    '노란색',
    {
      uz: 'Mana bu sariq sumka meniki.',
      en: 'This yellow bag is mine.',
      ru: 'Эта жёлтая сумка — моя.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s4_u8_g3_11',
    U8_G3,
    [
      {
        options: [
          '제가 잃어버린 가방은',
          '제가 잃어버린 가방을',
          '제가 잃어버린 가방이',
        ],
        correct: '제가 잃어버린 가방은',
      },
      {
        options: ['빨개요.', '빨갛아요.', '빨가요.'],
        correct: '빨개요.',
      },
    ],
    {
      uz: 'Men yo‘qotgan sumka qizil.',
      en: 'The bag I lost is red.',
      ru: 'Сумка, которую я потерял, красная.',
    },
  ),

  ...build(
    'gp_s4_u8_g3_12',
    U8_G3,
    [
      {
        options: ['그 사람은', '그 사람을', '그 사람이'],
        correct: '그 사람은',
      },
      {
        options: ['하얀 모자를', '하얗은 모자를', '하얘 모자를'],
        correct: '하얀 모자를',
      },
      {
        options: ['쓰고 있어요.', '입고 있어요.', '신고 있어요.'],
        correct: '쓰고 있어요.',
      },
    ],
    {
      uz: 'U odam oq bosh kiyim kiyib turibdi.',
      en: 'That person is wearing a white hat.',
      ru: 'На том человеке белая шляпа.',
    },
  ),

  ...build(
    'gp_s4_u8_g3_13',
    U8_G3,
    [
      {
        options: ['제 여행 가방은', '제 여행 가방을', '제 여행 가방이'],
        correct: '제 여행 가방은',
      },
      {
        options: ['파란색이에요.', '파랗은색이에요.', '파래색이에요.'],
        correct: '파란색이에요.',
      },
    ],
    {
      uz: 'Mening chamadonim ko‘k rangda.',
      en: 'My suitcase is blue.',
      ru: 'Мой чемодан синий.',
    },
  ),

  ...build(
    'gp_s4_u8_g3_14',
    U8_G3,
    [
      {
        options: ['분실물 센터에', '분실물 센터를', '분실물 센터가'],
        correct: '분실물 센터에',
      },
      {
        options: ['노란 우산이', '노랗은 우산이', '노래 우산이'],
        correct: '노란 우산이',
      },
      {
        options: ['있어요.', '먹어요.', '입어요.'],
        correct: '있어요.',
      },
    ],
    {
      uz: 'Yo‘qolgan buyumlar markazida sariq soyabon bor.',
      en: 'There is a yellow umbrella at the lost-and-found center.',
      ru: 'В бюро находок есть жёлтый зонт.',
    },
  ),

  ...build(
    'gp_s4_u8_g3_15',
    U8_G3,
    [
      {
        options: ['사진보다', '사진마다', '사진에게'],
        correct: '사진보다',
      },
      {
        options: ['실제 색이', '실제 색을', '실제 색은'],
        correct: '실제 색이',
      },
      {
        options: ['더 파래요.', '더 파랗아요.', '더 파라요.'],
        correct: '더 파래요.',
      },
    ],
    {
      uz: 'Haqiqiy rangi suratdagidan ko‘kroq.',
      en: 'The actual color is bluer than in the photo.',
      ru: 'Настоящий цвет более синий, чем на фотографии.',
    },
  ),

  ...build(
    'gp_s4_u8_g3_16',
    U8_G3,
    [
      {
        options: ['얼굴이', '얼굴을', '얼굴은'],
        correct: '얼굴이',
      },
      {
        options: ['왜 이렇게', '어디에서', '누구보다'],
        correct: '왜 이렇게',
      },
      {
        options: ['빨개요?', '빨갛아요?', '빨가요?'],
        correct: '빨개요?',
      },
    ],
    {
      uz: 'Nega yuzingiz bunchalik qizil?',
      en: 'Why is your face so red?',
      ru: 'Почему лицо такое красное?',
    },
  ),

  ...build(
    'gp_s4_u8_g3_17',
    U8_G3,
    [
      {
        options: ['어떤 가방을', '어떻은 가방을', '어때 가방을'],
        correct: '어떤 가방을',
      },
      {
        options: ['잃어버렸어요?', '찾았어요?', '샀어요?'],
        correct: '잃어버렸어요?',
      },
    ],
    {
      uz: 'Qanday sumkani yo‘qotdingiz?',
      en: 'What kind of bag did you lose?',
      ru: 'Какую сумку вы потеряли?',
    },
  ),

  ...build(
    'gp_s4_u8_g3_18',
    U8_G3,
    [
      {
        options: ['그런 모양의', '그렇은 모양의', '그래 모양의'],
        correct: '그런 모양의',
      },
      {
        options: ['가방은', '가방을', '가방이'],
        correct: '가방은',
      },
      {
        options: ['여기 없어요.', '여기 먹어요.', '여기 입어요.'],
        correct: '여기 없어요.',
      },
    ],
    {
      uz: 'Bunday shakldagi sumka bu yerda yo‘q.',
      en: 'There is no bag of that shape here.',
      ru: 'Такой сумки здесь нет.',
    },
  ),

  ...build(
    'gp_s4_u8_g3_19',
    U8_G3,
    [
      {
        options: ['눈이 와서', '비가 그쳐서', '날씨가 더워서'],
        correct: '눈이 와서',
      },
      {
        options: ['밖이', '밖을', '밖은'],
        correct: '밖이',
      },
      {
        options: ['아주 하얘요.', '아주 하얗아요.', '아주 하야요.'],
        correct: '아주 하얘요.',
      },
    ],
    {
      uz: 'Qor yog‘ib, tashqari oppoq.',
      en: 'It snowed, so everything outside is white.',
      ru: 'Выпал снег, и на улице всё белое.',
    },
  ),

  ...build(
    'gp_s4_u8_g3_20',
    U8_G3,
    [
      {
        options: ['이 노란색 가방이', '이 노랗은색 가방이', '이 노래색 가방이'],
        correct: '이 노란색 가방이',
      },
      {
        options: ['제 가방이에요.', '제 모자예요.', '제 우산이에요.'],
        correct: '제 가방이에요.',
      },
    ],
    {
      uz: 'Bu sariq sumka meniki.',
      en: 'This yellow bag is mine.',
      ru: 'Эта жёлтая сумка моя.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 4. V-아/어 있다
// ─────────────────────────────────────────────
const U8_G4 = 'verb-a-eo-itda';

const U8_G4_Q = {
  // grammar_blank 10
  ...blank(
    'gp_s4_u8_g4_01',
    U8_G4,
    '공항 문이 아직 열려 있어요.',
    '열려 있어요',
    {
      uz: 'Aeroport eshigi hali ochiq.',
      en: 'The airport door is still open.',
      ru: 'Дверь аэропорта всё ещё открыта.',
    },
  ),

  ...blank('gp_s4_u8_g4_02', U8_G4, '창문이 모두 닫혀 있어요.', '닫혀 있어요', {
    uz: 'Hamma derazalar yopiq.',
    en: 'All the windows are closed.',
    ru: 'Все окна закрыты.',
  }),

  ...blank(
    'gp_s4_u8_g4_03',
    U8_G4,
    '분실물 안내문이 벽에 붙어 있어요.',
    '붙어 있어요',
    {
      uz: 'Yo‘qolgan buyumlar haqidagi e’lon devorga yopishtirilgan.',
      en: 'A lost-and-found notice is posted on the wall.',
      ru: 'Объявление о потерянных вещах висит на стене.',
    },
  ),

  ...blank(
    'gp_s4_u8_g4_04',
    U8_G4,
    '검은 가방이 의자 위에 놓여 있어요.',
    '놓여 있어요',
    {
      uz: 'Qora sumka stul ustida turibdi.',
      en: 'A black bag is placed on the chair.',
      ru: 'Чёрная сумка лежит на стуле.',
    },
  ),

  ...blank('gp_s4_u8_g4_05', U8_G4, '사진이 벽에 걸려 있어요.', '걸려 있어요', {
    uz: 'Surat devorga osilgan.',
    en: 'A picture is hanging on the wall.',
    ru: 'Фотография висит на стене.',
  }),

  ...blank(
    'gp_s4_u8_g4_06',
    U8_G4,
    '여자 한 명이 의자에 앉아 있어요.',
    '앉아 있어요',
    {
      uz: 'Bir ayol stulda o‘tiribdi.',
      en: 'A woman is sitting on a chair.',
      ru: 'Одна женщина сидит на стуле.',
    },
  ),

  ...blank(
    'gp_s4_u8_g4_07',
    U8_G4,
    '출입구 앞에 직원이 서 있어요.',
    '서 있어요',
    {
      uz: 'Kirish joyi oldida xodim turibdi.',
      en: 'An employee is standing in front of the entrance.',
      ru: 'Перед входом стоит сотрудник.',
    },
  ),

  ...blank(
    'gp_s4_u8_g4_08',
    U8_G4,
    '가방 안에 이름과 전화번호가 적혀 있어요.',
    '적혀 있어요',
    {
      uz: 'Sumka ichida ism va telefon raqami yozilgan.',
      en: 'A name and phone number are written inside the bag.',
      ru: 'Внутри сумки написаны имя и номер телефона.',
    },
  ),

  ...blank(
    'gp_s4_u8_g4_09',
    U8_G4,
    '안내판의 불이 켜져 있어요.',
    '켜져 있어요',
    {
      uz: 'Axborot taxtasining chirog‘i yoqilgan.',
      en: 'The information board light is on.',
      ru: 'Подсветка информационного табло включена.',
    },
  ),

  ...blank(
    'gp_s4_u8_g4_10',
    U8_G4,
    '사용하지 않는 기계는 전원이 꺼져 있어요.',
    '꺼져 있어요',
    {
      uz: 'Ishlatilmayotgan qurilmaning quvvati o‘chirilgan.',
      en: 'The unused machine is switched off.',
      ru: 'Неиспользуемое устройство выключено.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s4_u8_g4_11',
    U8_G4,
    [
      {
        options: ['공항 문이', '공항 문을', '공항 문은'],
        correct: '공항 문이',
      },
      {
        options: ['아직', '매일', '갑자기'],
        correct: '아직',
      },
      {
        options: ['열려 있어요.', '열고 있어요.', '열어 있어요.'],
        correct: '열려 있어요.',
      },
    ],
    {
      uz: 'Aeroport eshigi hali ochiq.',
      en: 'The airport door is still open.',
      ru: 'Дверь аэропорта всё ещё открыта.',
    },
  ),

  ...build(
    'gp_s4_u8_g4_12',
    U8_G4,
    [
      {
        options: ['창문이', '창문을', '창문은'],
        correct: '창문이',
      },
      {
        options: ['모두', '가끔', '천천히'],
        correct: '모두',
      },
      {
        options: ['닫혀 있어요.', '닫고 있어요.', '닫아 있어요.'],
        correct: '닫혀 있어요.',
      },
    ],
    {
      uz: 'Hamma derazalar yopiq.',
      en: 'All the windows are closed.',
      ru: 'Все окна закрыты.',
    },
  ),

  ...build(
    'gp_s4_u8_g4_13',
    U8_G4,
    [
      {
        options: ['분실물 안내문이', '분실물 안내문을', '분실물 안내문은'],
        correct: '분실물 안내문이',
      },
      {
        options: ['벽에', '벽을', '벽이'],
        correct: '벽에',
      },
      {
        options: ['붙어 있어요.', '붙이고 있어요.', '붙여 있어요.'],
        correct: '붙어 있어요.',
      },
    ],
    {
      uz: 'Yo‘qolgan buyumlar e’loni devorga yopishtirilgan.',
      en: 'The lost-and-found notice is posted on the wall.',
      ru: 'Объявление о потерянных вещах висит на стене.',
    },
  ),

  ...build(
    'gp_s4_u8_g4_14',
    U8_G4,
    [
      {
        options: ['검은 가방이', '검은 가방을', '검은 가방은'],
        correct: '검은 가방이',
      },
      {
        options: ['의자 위에', '의자 위를', '의자 위가'],
        correct: '의자 위에',
      },
      {
        options: ['놓여 있어요.', '놓고 있어요.', '놓아 있어요.'],
        correct: '놓여 있어요.',
      },
    ],
    {
      uz: 'Qora sumka stul ustida turibdi.',
      en: 'A black bag is placed on the chair.',
      ru: 'Чёрная сумка лежит на стуле.',
    },
  ),

  ...build(
    'gp_s4_u8_g4_15',
    U8_G4,
    [
      {
        options: ['사진이', '사진을', '사진은'],
        correct: '사진이',
      },
      {
        options: ['벽에', '벽을', '벽이'],
        correct: '벽에',
      },
      {
        options: ['걸려 있어요.', '걸고 있어요.', '걸어 있어요.'],
        correct: '걸려 있어요.',
      },
    ],
    {
      uz: 'Surat devorga osilgan.',
      en: 'A picture is hanging on the wall.',
      ru: 'Фотография висит на стене.',
    },
  ),

  ...build(
    'gp_s4_u8_g4_16',
    U8_G4,
    [
      {
        options: ['여자 한 명이', '여자 한 명을', '여자 한 명은'],
        correct: '여자 한 명이',
      },
      {
        options: ['의자에', '의자를', '의자가'],
        correct: '의자에',
      },
      {
        options: ['앉아 있어요.', '앉고 있어요.', '앉은 있어요.'],
        correct: '앉아 있어요.',
      },
    ],
    {
      uz: 'Bir ayol stulda o‘tiribdi.',
      en: 'A woman is sitting on a chair.',
      ru: 'Женщина сидит на стуле.',
    },
  ),

  ...build(
    'gp_s4_u8_g4_17',
    U8_G4,
    [
      {
        options: ['출입구 앞에', '출입구 앞을', '출입구 앞이'],
        correct: '출입구 앞에',
      },
      {
        options: ['직원이', '직원을', '직원은'],
        correct: '직원이',
      },
      {
        options: ['서 있어요.', '서고 있어요.', '선 있어요.'],
        correct: '서 있어요.',
      },
    ],
    {
      uz: 'Kirish joyi oldida xodim turibdi.',
      en: 'An employee is standing in front of the entrance.',
      ru: 'Перед входом стоит сотрудник.',
    },
  ),

  ...build(
    'gp_s4_u8_g4_18',
    U8_G4,
    [
      {
        options: ['가방 안에', '가방 안을', '가방 안이'],
        correct: '가방 안에',
      },
      {
        options: [
          '이름과 전화번호가',
          '이름과 전화번호를',
          '이름과 전화번호는',
        ],
        correct: '이름과 전화번호가',
      },
      {
        options: ['적혀 있어요.', '적고 있어요.', '적어 있어요.'],
        correct: '적혀 있어요.',
      },
    ],
    {
      uz: 'Sumka ichida ism va telefon raqami yozilgan.',
      en: 'A name and phone number are written inside the bag.',
      ru: 'Внутри сумки указаны имя и номер телефона.',
    },
  ),

  ...build(
    'gp_s4_u8_g4_19',
    U8_G4,
    [
      {
        options: ['안내판의 불이', '안내판의 불을', '안내판의 불은'],
        correct: '안내판의 불이',
      },
      {
        options: ['켜져 있어요.', '켜고 있어요.', '켜어 있어요.'],
        correct: '켜져 있어요.',
      },
    ],
    {
      uz: 'Axborot taxtasining chirog‘i yoqilgan.',
      en: 'The information board light is on.',
      ru: 'Подсветка информационного табло включена.',
    },
  ),

  ...build(
    'gp_s4_u8_g4_20',
    U8_G4,
    [
      {
        options: [
          '사용하지 않는 기계는',
          '사용하지 않는 기계를',
          '사용하지 않는 기계가',
        ],
        correct: '사용하지 않는 기계는',
      },
      {
        options: ['전원이', '전원을', '전원은'],
        correct: '전원이',
      },
      {
        options: ['꺼져 있어요.', '끄고 있어요.', '꺼 있어요.'],
        correct: '꺼져 있어요.',
      },
    ],
    {
      uz: 'Ishlatilmayotgan qurilmaning quvvati o‘chirilgan.',
      en: 'The unused machine is switched off.',
      ru: 'Неиспользуемое устройство выключено.',
    },
  ),
}; // ═══════════════════════════════════════════════════════════
// UNIT 9 · 18과
// 한국에 온 지 벌써 6개월이 되었어요
// ═══════════════════════════════════════════════════════════

// ─────────────────────────────────────────────
// 문법 1. V-(으)ㄴ 지
// ─────────────────────────────────────────────
const U9_G1 = 'verb-eun-ji';

const U9_G1_Q = {
  // grammar_blank 10
  ...blank(
    'gp_s4_u9_g1_01',
    U9_G1,
    '한국에 온 지 벌써 6개월이 되었어요.',
    '온 지',
    {
      uz: 'Koreyaga kelganimga allaqachon olti oy bo‘ldi.',
      en: 'It has already been six months since I came to Korea.',
      ru: 'Прошло уже шесть месяцев с тех пор, как я приехал в Корею.',
    },
  ),

  ...blank(
    'gp_s4_u9_g1_02',
    U9_G1,
    '한국어를 배운 지 1년이 넘었어요.',
    '배운 지',
    {
      uz: 'Koreys tilini o‘rganishni boshlaganimga bir yildan oshdi.',
      en: 'It has been over a year since I started learning Korean.',
      ru: 'Прошло больше года с тех пор, как я начал учить корейский.',
    },
  ),

  ...blank(
    'gp_s4_u9_g1_03',
    U9_G1,
    '아침을 먹은 지 세 시간이 됐어요.',
    '먹은 지',
    {
      uz: 'Nonushta qilganimga uch soat bo‘ldi.',
      en: 'It has been three hours since I ate breakfast.',
      ru: 'Прошло три часа с тех пор, как я позавтракал.',
    },
  ),

  ...blank(
    'gp_s4_u9_g1_04',
    U9_G1,
    '이 회사에서 일한 지 두 달밖에 안 됐어요.',
    '일한 지',
    {
      uz: 'Bu kompaniyada ishlayotganimga atigi ikki oy bo‘ldi.',
      en: 'It has only been two months since I started working at this company.',
      ru: 'Я работаю в этой компании всего два месяца.',
    },
  ),

  ...blank(
    'gp_s4_u9_g1_05',
    U9_G1,
    '부모님을 못 본 지 벌써 반년이 됐어요.',
    '못 본 지',
    {
      uz: 'Ota-onamni ko‘rmaganimga allaqachon yarim yil bo‘ldi.',
      en: 'It has already been half a year since I last saw my parents.',
      ru: 'Прошло уже полгода с тех пор, как я видел родителей.',
    },
  ),

  ...blank('gp_s4_u9_g1_06', U9_G1, '서울에서 산 지 3년이 되었어요.', '산 지', {
    uz: 'Seulda yashayotganimga uch yil bo‘ldi.',
    en: 'It has been three years since I started living in Seoul.',
    ru: 'Я живу в Сеуле уже три года.',
  }),

  ...blank(
    'gp_s4_u9_g1_07',
    U9_G1,
    '이 휴대폰을 산 지 일주일도 안 됐어요.',
    '산 지',
    {
      uz: 'Bu telefonni olganimga hali bir hafta ham bo‘lmadi.',
      en: 'It has not even been a week since I bought this phone.',
      ru: 'Не прошло и недели с тех пор, как я купил этот телефон.',
    },
  ),

  ...blank(
    'gp_s4_u9_g1_08',
    U9_G1,
    '운동을 시작한 지 한 달이 됐어요.',
    '시작한 지',
    {
      uz: 'Mashq qilishni boshlaganimga bir oy bo‘ldi.',
      en: 'It has been a month since I started exercising.',
      ru: 'Прошёл месяц с тех пор, как я начал заниматься спортом.',
    },
  ),

  ...blank(
    'gp_s4_u9_g1_09',
    U9_G1,
    '친구와 연락하지 않은 지 꽤 오래됐어요.',
    '연락하지 않은 지',
    {
      uz: 'Do‘stim bilan bog‘lanmaganimga ancha bo‘ldi.',
      en: 'It has been quite a while since I contacted my friend.',
      ru: 'Прошло уже довольно много времени с тех пор, как я общался с другом.',
    },
  ),

  ...blank('gp_s4_u9_g1_10', U9_G1, '이사를 한 지 얼마나 됐어요?', '한 지', {
    uz: 'Ko‘chganingizga qancha bo‘ldi?',
    en: 'How long has it been since you moved?',
    ru: 'Сколько времени прошло с тех пор, как вы переехали?',
  }),

  // grammar_build 10
  ...build(
    'gp_s4_u9_g1_11',
    U9_G1,
    [
      {
        options: ['한국에', '한국을', '한국에서'],
        correct: '한국에',
      },
      {
        options: ['온 지', '오는 지', '올 지'],
        correct: '온 지',
      },
      {
        options: ['벌써', '아직', '가끔'],
        correct: '벌써',
      },
      {
        options: [
          '6개월이 되었어요.',
          '6개월을 만났어요.',
          '6개월이 먹었어요.',
        ],
        correct: '6개월이 되었어요.',
      },
    ],
    {
      uz: 'Koreyaga kelganimga allaqachon olti oy bo‘ldi.',
      en: 'It has already been six months since I came to Korea.',
      ru: 'С моего приезда в Корею прошло уже шесть месяцев.',
    },
  ),

  ...build(
    'gp_s4_u9_g1_12',
    U9_G1,
    [
      {
        options: ['한국어를', '한국어가', '한국어는'],
        correct: '한국어를',
      },
      {
        options: ['배운 지', '배우는 지', '배울 지'],
        correct: '배운 지',
      },
      {
        options: ['1년이 넘었어요.', '1년을 먹었어요.', '1년이 걸었어요.'],
        correct: '1년이 넘었어요.',
      },
    ],
    {
      uz: 'Koreys tilini o‘rganayotganimga bir yildan oshdi.',
      en: 'It has been more than a year since I started learning Korean.',
      ru: 'Я учу корейский уже больше года.',
    },
  ),

  ...build(
    'gp_s4_u9_g1_13',
    U9_G1,
    [
      {
        options: ['아침을', '아침이', '아침은'],
        correct: '아침을',
      },
      {
        options: ['먹은 지', '먹는 지', '먹을 지'],
        correct: '먹은 지',
      },
      {
        options: [
          '세 시간이 됐어요.',
          '세 시간을 갔어요.',
          '세 시간이 마셨어요.',
        ],
        correct: '세 시간이 됐어요.',
      },
    ],
    {
      uz: 'Nonushta qilganimga uch soat bo‘ldi.',
      en: 'It has been three hours since I ate breakfast.',
      ru: 'После завтрака прошло три часа.',
    },
  ),

  ...build(
    'gp_s4_u9_g1_14',
    U9_G1,
    [
      {
        options: ['이 회사에서', '이 회사를', '이 회사가'],
        correct: '이 회사에서',
      },
      {
        options: ['일한 지', '일하는 지', '일할 지'],
        correct: '일한 지',
      },
      {
        options: [
          '두 달밖에 안 됐어요.',
          '두 달이나 끝났어요.',
          '두 달을 지났어요.',
        ],
        correct: '두 달밖에 안 됐어요.',
      },
    ],
    {
      uz: 'Bu kompaniyada ishlayotganimga atigi ikki oy bo‘ldi.',
      en: 'It has only been two months since I started working here.',
      ru: 'Я работаю здесь всего два месяца.',
    },
  ),

  ...build(
    'gp_s4_u9_g1_15',
    U9_G1,
    [
      {
        options: ['부모님을', '부모님이', '부모님은'],
        correct: '부모님을',
      },
      {
        options: ['못 본 지', '못 보는 지', '못 볼 지'],
        correct: '못 본 지',
      },
      {
        options: ['벌써', '아직', '가끔'],
        correct: '벌써',
      },
      {
        options: ['반년이 됐어요.', '반년을 만났어요.', '반년이 갔어요.'],
        correct: '반년이 됐어요.',
      },
    ],
    {
      uz: 'Ota-onamni ko‘rmaganimga yarim yil bo‘ldi.',
      en: 'It has been half a year since I last saw my parents.',
      ru: 'Я не видел родителей уже полгода.',
    },
  ),

  ...build(
    'gp_s4_u9_g1_16',
    U9_G1,
    [
      {
        options: ['서울에서', '서울을', '서울이'],
        correct: '서울에서',
      },
      {
        options: ['산 지', '살은 지', '사는 지'],
        correct: '산 지',
      },
      {
        options: ['3년이 되었어요.', '3년을 먹었어요.', '3년이 배웠어요.'],
        correct: '3년이 되었어요.',
      },
    ],
    {
      uz: 'Seulda yashayotganimga uch yil bo‘ldi.',
      en: 'It has been three years since I started living in Seoul.',
      ru: 'Я живу в Сеуле уже три года.',
    },
  ),

  ...build(
    'gp_s4_u9_g1_17',
    U9_G1,
    [
      {
        options: ['이 휴대폰을', '이 휴대폰이', '이 휴대폰은'],
        correct: '이 휴대폰을',
      },
      {
        options: ['산 지', '사는 지', '살 지'],
        correct: '산 지',
      },
      {
        options: [
          '일주일도 안 됐어요.',
          '일주일이나 먹었어요.',
          '일주일이 샀어요.',
        ],
        correct: '일주일도 안 됐어요.',
      },
    ],
    {
      uz: 'Bu telefonni olganimga hali bir hafta ham bo‘lmadi.',
      en: 'It has not even been a week since I bought this phone.',
      ru: 'С покупки телефона не прошло и недели.',
    },
  ),

  ...build(
    'gp_s4_u9_g1_18',
    U9_G1,
    [
      {
        options: ['운동을', '운동이', '운동은'],
        correct: '운동을',
      },
      {
        options: ['시작한 지', '시작하는 지', '시작할 지'],
        correct: '시작한 지',
      },
      {
        options: [
          '한 달이 됐어요.',
          '한 달을 운동했어요.',
          '한 달이 시작했어요.',
        ],
        correct: '한 달이 됐어요.',
      },
    ],
    {
      uz: 'Mashqni boshlaganimga bir oy bo‘ldi.',
      en: 'It has been a month since I started exercising.',
      ru: 'Я занимаюсь спортом уже месяц.',
    },
  ),

  ...build(
    'gp_s4_u9_g1_19',
    U9_G1,
    [
      {
        options: ['친구와', '친구를', '친구가'],
        correct: '친구와',
      },
      {
        options: ['연락하지 않은 지', '연락하지 않는 지', '연락하지 않을 지'],
        correct: '연락하지 않은 지',
      },
      {
        options: ['꽤 오래됐어요.', '꽤 먹었어요.', '꽤 가까워졌어요.'],
        correct: '꽤 오래됐어요.',
      },
    ],
    {
      uz: 'Do‘stim bilan bog‘lanmaganimga ancha bo‘ldi.',
      en: 'It has been quite a while since I contacted my friend.',
      ru: 'Я уже давно не связывался с другом.',
    },
  ),

  ...build(
    'gp_s4_u9_g1_20',
    U9_G1,
    [
      {
        options: ['이사를', '이사가', '이사는'],
        correct: '이사를',
      },
      {
        options: ['한 지', '하는 지', '할 지'],
        correct: '한 지',
      },
      {
        options: ['얼마나 됐어요?', '얼마나 먹었어요?', '얼마나 샀어요?'],
        correct: '얼마나 됐어요?',
      },
    ],
    {
      uz: 'Ko‘chganingizga qancha bo‘ldi?',
      en: 'How long has it been since you moved?',
      ru: 'Сколько времени прошло после переезда?',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 2. N(이)나 2
// 예상보다 많은 수량·정도
// ─────────────────────────────────────────────
const U9_G2 = 'noun-ina-na-2';

const U9_G2_Q = {
  // grammar_blank 10
  ...blank(
    'gp_s4_u9_g2_01',
    U9_G2,
    '한국에 온 지 벌써 6개월이나 됐어요.',
    '6개월이나',
    {
      uz: 'Koreyaga kelganimga naq olti oy bo‘ldi.',
      en: 'It has already been as long as six months since I came to Korea.',
      ru: 'С моего приезда в Корею прошло уже целых шесть месяцев.',
    },
  ),

  ...blank(
    'gp_s4_u9_g2_02',
    U9_G2,
    '어제 병원에서 세 시간이나 기다렸어요.',
    '세 시간이나',
    {
      uz: 'Kecha kasalxonada uch soat kutdim.',
      en: 'I waited at the hospital for as long as three hours yesterday.',
      ru: 'Вчера я ждал в больнице целых три часа.',
    },
  ),

  ...blank(
    'gp_s4_u9_g2_03',
    U9_G2,
    '모임에 학생이 스무 명이나 왔어요.',
    '스무 명이나',
    {
      uz: 'Uchrashuvga yigirmata talaba keldi.',
      en: 'As many as twenty students came to the gathering.',
      ru: 'На встречу пришло целых двадцать студентов.',
    },
  ),

  ...blank(
    'gp_s4_u9_g2_04',
    U9_G2,
    '여행 가기 전에 책을 다섯 권이나 샀어요.',
    '다섯 권이나',
    {
      uz: 'Sayohatdan oldin beshta kitob sotib oldim.',
      en: 'I bought as many as five books before the trip.',
      ru: 'Перед поездкой я купил целых пять книг.',
    },
  ),

  ...blank(
    'gp_s4_u9_g2_05',
    U9_G2,
    '오늘 커피를 네 잔이나 마셨어요.',
    '네 잔이나',
    {
      uz: 'Bugun to‘rt piyola qahva ichdim.',
      en: 'I drank as many as four cups of coffee today.',
      ru: 'Сегодня я выпил целых четыре чашки кофе.',
    },
  ),

  ...blank(
    'gp_s4_u9_g2_06',
    U9_G2,
    '어제 열두 시간이나 일했어요.',
    '열두 시간이나',
    {
      uz: 'Kecha o‘n ikki soat ishladim.',
      en: 'I worked for as many as twelve hours yesterday.',
      ru: 'Вчера я работал целых двенадцать часов.',
    },
  ),

  ...blank(
    'gp_s4_u9_g2_07',
    U9_G2,
    '주말에 영화를 세 편이나 봤어요.',
    '세 편이나',
    {
      uz: 'Dam olish kunlari uchta film ko‘rdim.',
      en: 'I watched as many as three movies over the weekend.',
      ru: 'За выходные я посмотрел целых три фильма.',
    },
  ),

  ...blank(
    'gp_s4_u9_g2_08',
    U9_G2,
    '택시비가 5만 원이나 나왔어요.',
    '5만 원이나',
    {
      uz: 'Taksi narxi naq 50 ming von chiqdi.',
      en: 'The taxi fare came to as much as 50,000 won.',
      ru: 'Такси обошлось в целых 50 тысяч вон.',
    },
  ),

  ...blank(
    'gp_s4_u9_g2_09',
    U9_G2,
    '한국에서 벌써 1년이나 살았어요.',
    '1년이나',
    {
      uz: 'Koreyada allaqachon bir yil yashadim.',
      en: 'I have already lived in Korea for a whole year.',
      ru: 'Я живу в Корее уже целый год.',
    },
  ),

  ...blank(
    'gp_s4_u9_g2_10',
    U9_G2,
    '선물로 사과를 열두 개나 받았어요.',
    '열두 개나',
    {
      uz: 'Sovg‘a sifatida o‘n ikkita olma oldim.',
      en: 'I received as many as twelve apples as a gift.',
      ru: 'Мне подарили целых двенадцать яблок.',
    },
  ),

  // grammar_build 10
  ...build(
    'gp_s4_u9_g2_11',
    U9_G2,
    [
      {
        options: ['한국에 온 지', '한국에 오기 전에', '한국에 온 후에'],
        correct: '한국에 온 지',
      },
      {
        options: ['벌써', '아직', '가끔'],
        correct: '벌써',
      },
      {
        options: ['6개월이나', '6개월밖에', '6개월만'],
        correct: '6개월이나',
      },
      {
        options: ['됐어요.', '먹었어요.', '샀어요.'],
        correct: '됐어요.',
      },
    ],
    {
      uz: 'Koreyaga kelganimga naq olti oy bo‘ldi.',
      en: 'It has already been as long as six months since I came to Korea.',
      ru: 'С приезда в Корею прошло уже целых шесть месяцев.',
    },
  ),

  ...build(
    'gp_s4_u9_g2_12',
    U9_G2,
    [
      {
        options: ['어제 병원에서', '내일 병원에', '병원마다'],
        correct: '어제 병원에서',
      },
      {
        options: ['세 시간이나', '세 시간밖에', '세 시간만'],
        correct: '세 시간이나',
      },
      {
        options: ['기다렸어요.', '출발했어요.', '도착했어요.'],
        correct: '기다렸어요.',
      },
    ],
    {
      uz: 'Kecha kasalxonada uch soat kutdim.',
      en: 'I waited at the hospital for as long as three hours.',
      ru: 'Я ждал в больнице целых три часа.',
    },
  ),

  ...build(
    'gp_s4_u9_g2_13',
    U9_G2,
    [
      {
        options: ['모임에', '모임을', '모임에서를'],
        correct: '모임에',
      },
      {
        options: ['학생이', '학생을', '학생은'],
        correct: '학생이',
      },
      {
        options: ['스무 명이나', '스무 명밖에', '스무 명만'],
        correct: '스무 명이나',
      },
      {
        options: ['왔어요.', '마셨어요.', '입었어요.'],
        correct: '왔어요.',
      },
    ],
    {
      uz: 'Uchrashuvga yigirmata talaba keldi.',
      en: 'As many as twenty students came to the gathering.',
      ru: 'На встречу пришло целых двадцать студентов.',
    },
  ),

  ...build(
    'gp_s4_u9_g2_14',
    U9_G2,
    [
      {
        options: ['여행 가기 전에', '여행 간 후에', '여행을 가지만'],
        correct: '여행 가기 전에',
      },
      {
        options: ['책을', '책이', '책은'],
        correct: '책을',
      },
      {
        options: ['다섯 권이나', '다섯 권밖에', '다섯 권만'],
        correct: '다섯 권이나',
      },
      {
        options: ['샀어요.', '마셨어요.', '신었어요.'],
        correct: '샀어요.',
      },
    ],
    {
      uz: 'Sayohatdan oldin beshta kitob sotib oldim.',
      en: 'I bought as many as five books before traveling.',
      ru: 'Перед поездкой я купил целых пять книг.',
    },
  ),

  ...build(
    'gp_s4_u9_g2_15',
    U9_G2,
    [
      {
        options: ['오늘', '내일', '지난달에만'],
        correct: '오늘',
      },
      {
        options: ['커피를', '커피가', '커피는'],
        correct: '커피를',
      },
      {
        options: ['네 잔이나', '네 잔밖에', '네 잔만'],
        correct: '네 잔이나',
      },
      {
        options: ['마셨어요.', '먹었어요.', '입었어요.'],
        correct: '마셨어요.',
      },
    ],
    {
      uz: 'Bugun to‘rt piyola qahva ichdim.',
      en: 'I drank as many as four cups of coffee today.',
      ru: 'Сегодня я выпил целых четыре чашки кофе.',
    },
  ),

  ...build(
    'gp_s4_u9_g2_16',
    U9_G2,
    [
      {
        options: ['어제', '내일', '다음 주에'],
        correct: '어제',
      },
      {
        options: ['열두 시간이나', '열두 시간밖에', '열두 시간만'],
        correct: '열두 시간이나',
      },
      {
        options: ['일했어요.', '잤어요.', '놀았어요.'],
        correct: '일했어요.',
      },
    ],
    {
      uz: 'Kecha o‘n ikki soat ishladim.',
      en: 'I worked for as many as twelve hours yesterday.',
      ru: 'Вчера я работал целых двенадцать часов.',
    },
  ),

  ...build(
    'gp_s4_u9_g2_17',
    U9_G2,
    [
      {
        options: ['주말에', '평일마다', '내일부터'],
        correct: '주말에',
      },
      {
        options: ['영화를', '영화가', '영화는'],
        correct: '영화를',
      },
      {
        options: ['세 편이나', '세 편밖에', '세 편만'],
        correct: '세 편이나',
      },
      {
        options: ['봤어요.', '들었어요.', '읽었어요.'],
        correct: '봤어요.',
      },
    ],
    {
      uz: 'Dam olish kunlari uchta film ko‘rdim.',
      en: 'I watched as many as three movies over the weekend.',
      ru: 'За выходные я посмотрел целых три фильма.',
    },
  ),

  ...build(
    'gp_s4_u9_g2_18',
    U9_G2,
    [
      {
        options: ['택시비가', '택시비를', '택시비는'],
        correct: '택시비가',
      },
      {
        options: ['5만 원이나', '5만 원밖에', '5만 원만'],
        correct: '5만 원이나',
      },
      {
        options: ['나왔어요.', '먹었어요.', '입었어요.'],
        correct: '나왔어요.',
      },
    ],
    {
      uz: 'Taksi narxi naq 50 ming von chiqdi.',
      en: 'The taxi fare came to as much as 50,000 won.',
      ru: 'Такси обошлось в целых 50 тысяч вон.',
    },
  ),

  ...build(
    'gp_s4_u9_g2_19',
    U9_G2,
    [
      {
        options: ['한국에서', '한국을', '한국이'],
        correct: '한국에서',
      },
      {
        options: ['벌써', '아직', '가끔'],
        correct: '벌써',
      },
      {
        options: ['1년이나', '1년밖에', '1년만'],
        correct: '1년이나',
      },
      {
        options: ['살았어요.', '먹었어요.', '입었어요.'],
        correct: '살았어요.',
      },
    ],
    {
      uz: 'Koreyada allaqachon bir yil yashadim.',
      en: 'I have already lived in Korea for a whole year.',
      ru: 'Я прожил в Корее уже целый год.',
    },
  ),

  ...build(
    'gp_s4_u9_g2_20',
    U9_G2,
    [
      {
        options: ['선물로', '선물을', '선물이'],
        correct: '선물로',
      },
      {
        options: ['사과를', '사과가', '사과는'],
        correct: '사과를',
      },
      {
        options: ['열두 개나', '열두 개밖에', '열두 개만'],
        correct: '열두 개나',
      },
      {
        options: ['받았어요.', '마셨어요.', '입었어요.'],
        correct: '받았어요.',
      },
    ],
    {
      uz: 'Sovg‘aga o‘n ikkita olma oldim.',
      en: 'I received as many as twelve apples as a gift.',
      ru: 'Мне подарили целых двенадцать яблок.',
    },
  ),
};

// ─────────────────────────────────────────────
// 문법 3. A-다, V-ㄴ/는다, N(이)다
// 해라체 평서형
// ─────────────────────────────────────────────
const U9_G3 = 'plain-style-da-neunda-ida';

const U9_G3_Q = {
  // grammar_blank 10
  ...blank('gp_s4_u9_g3_01', U9_G3, '오늘은 하늘이 맑다.', '맑다', {
    uz: 'Bugun osmon musaffo.',
    en: 'The sky is clear today.',
    ru: 'Сегодня небо ясное.',
  }),

  ...blank('gp_s4_u9_g3_02', U9_G3, '봄이 오면 꽃이 핀다.', '핀다', {
    uz: 'Bahor kelsa gullar ochiladi.',
    en: 'Flowers bloom when spring comes.',
    ru: 'Когда приходит весна, распускаются цветы.',
  }),

  ...blank('gp_s4_u9_g3_03', U9_G3, '나는 매일 아침 뉴스를 본다.', '본다', {
    uz: 'Men har tong yangiliklarni ko‘raman.',
    en: 'I watch the news every morning.',
    ru: 'Каждое утро я смотрю новости.',
  }),

  ...blank(
    'gp_s4_u9_g3_04',
    U9_G3,
    '학생들은 수업 후에 도서관에서 공부한다.',
    '공부한다',
    {
      uz: 'Talabalar darsdan keyin kutubxonada o‘qiydi.',
      en: 'The students study in the library after class.',
      ru: 'После занятий студенты учатся в библиотеке.',
    },
  ),

  ...blank('gp_s4_u9_g3_05', U9_G3, '민수는 서울에서 산다.', '산다', {
    uz: 'Minsu Seulda yashaydi.',
    en: 'Minsu lives in Seoul.',
    ru: 'Минсу живёт в Сеуле.',
  }),

  ...blank('gp_s4_u9_g3_06', U9_G3, '이 음식은 생각보다 맵다.', '맵다', {
    uz: 'Bu taom o‘ylaganimdan achchiqroq.',
    en: 'This food is spicier than expected.',
    ru: 'Это блюдо острее, чем я ожидал.',
  }),

  ...blank('gp_s4_u9_g3_07', U9_G3, '요즘 일이 정말 많다.', '많다', {
    uz: 'So‘nggi paytda ish juda ko‘p.',
    en: 'There is a lot of work these days.',
    ru: 'В последнее время работы очень много.',
  }),

  ...blank('gp_s4_u9_g3_08', U9_G3, '내 친구는 의사다.', '의사다', {
    uz: 'Mening do‘stim shifokor.',
    en: 'My friend is a doctor.',
    ru: 'Мой друг — врач.',
  }),

  ...blank(
    'gp_s4_u9_g3_09',
    U9_G3,
    '저 사람은 우리 학교 학생이다.',
    '학생이다',
    {
      uz: 'U odam bizning maktab talabasi.',
      en: 'That person is a student at our school.',
      ru: 'Тот человек — студент нашей школы.',
    },
  ),

  ...blank('gp_s4_u9_g3_10', U9_G3, '한국 생활은 점점 재미있다.', '재미있다', {
    uz: 'Koreyadagi hayot tobora qiziqarli.',
    en: 'Life in Korea is becoming more and more interesting.',
    ru: 'Жизнь в Корее становится всё интереснее.',
  }),

  // grammar_build 10
  ...build(
    'gp_s4_u9_g3_11',
    U9_G3,
    [
      {
        options: ['오늘은', '어제부터', '내일마다'],
        correct: '오늘은',
      },
      {
        options: ['하늘이', '하늘을', '하늘은'],
        correct: '하늘이',
      },
      {
        options: ['맑다.', '맑는다.', '맑아요.'],
        correct: '맑다.',
      },
    ],
    {
      uz: 'Bugun osmon musaffo.',
      en: 'The sky is clear today.',
      ru: 'Сегодня небо ясное.',
    },
  ),

  ...build(
    'gp_s4_u9_g3_12',
    U9_G3,
    [
      {
        options: ['봄이 오면', '봄을 오면', '봄에 오면을'],
        correct: '봄이 오면',
      },
      {
        options: ['꽃이', '꽃을', '꽃은'],
        correct: '꽃이',
      },
      {
        options: ['핀다.', '피는다.', '피어요.'],
        correct: '핀다.',
      },
    ],
    {
      uz: 'Bahor kelsa gullar ochiladi.',
      en: 'Flowers bloom when spring comes.',
      ru: 'Весной распускаются цветы.',
    },
  ),

  ...build(
    'gp_s4_u9_g3_13',
    U9_G3,
    [
      {
        options: ['나는', '나를', '내가'],
        correct: '나는',
      },
      {
        options: ['매일 아침', '내일 밤', '지난달에'],
        correct: '매일 아침',
      },
      {
        options: ['뉴스를', '뉴스가', '뉴스는'],
        correct: '뉴스를',
      },
      {
        options: ['본다.', '보는다.', '봐요.'],
        correct: '본다.',
      },
    ],
    {
      uz: 'Men har tong yangiliklarni ko‘raman.',
      en: 'I watch the news every morning.',
      ru: 'Каждое утро я смотрю новости.',
    },
  ),

  ...build(
    'gp_s4_u9_g3_14',
    U9_G3,
    [
      {
        options: ['학생들은', '학생들을', '학생들이'],
        correct: '학생들은',
      },
      {
        options: ['수업 후에', '수업 전에만', '수업마다를'],
        correct: '수업 후에',
      },
      {
        options: ['도서관에서', '도서관을', '도서관이'],
        correct: '도서관에서',
      },
      {
        options: ['공부한다.', '공부하는다.', '공부해요.'],
        correct: '공부한다.',
      },
    ],
    {
      uz: 'Talabalar darsdan keyin kutubxonada o‘qiydi.',
      en: 'The students study in the library after class.',
      ru: 'После занятий студенты учатся в библиотеке.',
    },
  ),

  ...build(
    'gp_s4_u9_g3_15',
    U9_G3,
    [
      {
        options: ['민수는', '민수를', '민수가'],
        correct: '민수는',
      },
      {
        options: ['서울에서', '서울을', '서울이'],
        correct: '서울에서',
      },
      {
        options: ['산다.', '살는다.', '살아요.'],
        correct: '산다.',
      },
    ],
    {
      uz: 'Minsu Seulda yashaydi.',
      en: 'Minsu lives in Seoul.',
      ru: 'Минсу живёт в Сеуле.',
    },
  ),

  ...build(
    'gp_s4_u9_g3_16',
    U9_G3,
    [
      {
        options: ['이 음식은', '이 음식을', '이 음식이'],
        correct: '이 음식은',
      },
      {
        options: ['생각보다', '어제부터', '식당마다'],
        correct: '생각보다',
      },
      {
        options: ['맵다.', '맵는다.', '매워요.'],
        correct: '맵다.',
      },
    ],
    {
      uz: 'Bu taom o‘ylaganimdan achchiqroq.',
      en: 'This food is spicier than expected.',
      ru: 'Это блюдо острее, чем ожидалось.',
    },
  ),

  ...build(
    'gp_s4_u9_g3_17',
    U9_G3,
    [
      {
        options: ['요즘', '어제만', '내년부터'],
        correct: '요즘',
      },
      {
        options: ['일이', '일을', '일은'],
        correct: '일이',
      },
      {
        options: ['정말', '벌써', '가끔'],
        correct: '정말',
      },
      {
        options: ['많다.', '많는다.', '많아요.'],
        correct: '많다.',
      },
    ],
    {
      uz: 'So‘nggi paytda ish juda ko‘p.',
      en: 'There is a lot of work these days.',
      ru: 'Сейчас работы очень много.',
    },
  ),

  ...build(
    'gp_s4_u9_g3_18',
    U9_G3,
    [
      {
        options: ['내 친구는', '내 친구를', '내 친구가'],
        correct: '내 친구는',
      },
      {
        options: ['의사다.', '의사예요.', '의사입니다.'],
        correct: '의사다.',
      },
    ],
    {
      uz: 'Mening do‘stim shifokor.',
      en: 'My friend is a doctor.',
      ru: 'Мой друг — врач.',
    },
  ),

  ...build(
    'gp_s4_u9_g3_19',
    U9_G3,
    [
      {
        options: ['저 사람은', '저 사람을', '저 사람이'],
        correct: '저 사람은',
      },
      {
        options: ['우리 학교', '우리 학교를', '우리 학교에서를'],
        correct: '우리 학교',
      },
      {
        options: ['학생이다.', '학생이에요.', '학생입니다.'],
        correct: '학생이다.',
      },
    ],
    {
      uz: 'U odam bizning maktab talabasi.',
      en: 'That person is a student at our school.',
      ru: 'Тот человек — студент нашей школы.',
    },
  ),

  ...build(
    'gp_s4_u9_g3_20',
    U9_G3,
    [
      {
        options: ['한국 생활은', '한국 생활을', '한국 생활이'],
        correct: '한국 생활은',
      },
      {
        options: ['점점', '어제', '한 번'],
        correct: '점점',
      },
      {
        options: ['재미있다.', '재미있는다.', '재미있어요.'],
        correct: '재미있다.',
      },
    ],
    {
      uz: 'Koreyadagi hayot tobora qiziqarli.',
      en: 'Life in Korea is becoming more interesting.',
      ru: 'Жизнь в Корее становится всё интереснее.',
    },
  ),
};
// ═══════════════════════════════════════════════════════════
// SECTION 4 QUESTIONS
// ═══════════════════════════════════════════════════════════

export const GT_S4_QUESTIONS = {
  ...G1_Q,
  ...G2_Q,
  ...G3_Q,
  ...G4_Q,

  ...U2_G1_Q,
  ...U2_G2_Q,
  ...U2_G3_Q,
  ...U2_G4_Q,

  ...U3_G1_Q,
  ...U3_G2_Q,
  ...U3_G3_Q,
  ...U3_G4_Q,

  ...U4_G1_Q,
  ...U4_G2_Q,
  ...U4_G3_Q,
  ...U4_G4_Q,

  ...U5_G1_Q,
  ...U5_G2_Q,
  ...U5_G3_Q,
  ...U5_G4_Q,

  ...U6_G1_Q,
  ...U6_G2_Q,
  ...U6_G3_Q,
  ...U6_G4_Q,

  ...U7_G1_Q,
  ...U7_G2_Q,
  ...U7_G3_Q,
  ...U7_G4_Q,

  ...U8_G1_Q,
  ...U8_G2_Q,
  ...U8_G3_Q,
  ...U8_G4_Q,

  ...U9_G1_Q,
  ...U9_G2_Q,
  ...U9_G3_Q,
};

// ═══════════════════════════════════════════════════════════
// SECTION 4 ROADMAP
// UNIT 1 · 10과
// ═══════════════════════════════════════════════════════════

export const GT_S4_NODES = [
  {
    title: {
      ko: '뭐 먹을래?',
      uz: 'Nima yeysiz?',
      en: 'What would you like to eat?',
      ru: 'Что хотите поесть?',
    },
    section: 4,
    unit: 1,
    order: 1,
    category: LessonCategory.GRAMMAR,
    isActive: true,

    lessons: [
      {
        title: {
          ko: 'N 중에(서)',
          uz: 'N orasida',
          en: 'Among N',
          ru: 'Среди N',
        },
        description: {
          ko: '여러 대상 가운데 하나를 선택하거나 비교해요.',
          uz: 'Bir nechta variant orasidan tanlash yoki solishtirishni o‘rganamiz.',
          en: 'Choose or compare something within a group.',
          ru: 'Выбираем или сравниваем объекты внутри группы.',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_4,
        order: 1,
        grammarCode: G1,
        questions: mix20('gp_s4_u1_g1'),
      },

      {
        title: {
          ko: '반말',
          uz: 'Norasmiy nutq',
          en: 'Casual speech',
          ru: 'Неформальная речь',
        },
        description: {
          ko: '가까운 친구나 아랫사람에게 사용하는 반말을 연습해요.',
          uz: 'Yaqin do‘stlar bilan ishlatiladigan norasmiy nutqni mashq qilamiz.',
          en: 'Practice casual Korean used with close friends and younger people.',
          ru: 'Практикуем неформальную речь с близкими друзьями и младшими.',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_4,
        order: 2,
        grammarCode: G2,
        questions: mix20('gp_s4_u1_g2'),
      },

      {
        title: {
          ko: 'V-(으)ㄹ래요',
          uz: 'V-(으)ㄹ래요',
          en: 'Would you like to V?',
          ru: 'Хотите V?',
        },
        description: {
          ko: '자신의 의사를 말하거나 상대방의 의향을 물어요.',
          uz: 'O‘z xohishingizni aytish yoki suhbatdoshning xohishini so‘rashni o‘rganamiz.',
          en: 'Express your intention or ask what someone wants to do.',
          ru: 'Выражаем своё намерение или спрашиваем о желании собеседника.',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_4,
        order: 3,
        grammarCode: G3,
        questions: mix20('gp_s4_u1_g3'),
      },

      {
        title: {
          ko: 'A-(으)ㄴ데, V-는데, N인데 2',
          uz: 'A-(으)ㄴ데, V-는데, N인데 2',
          en: 'A-(으)ㄴ데, V-는데, N인데 2',
          ru: 'A-(으)ㄴ데, V-는데, N인데 2',
        },
        description: {
          ko: '상황을 먼저 설명하고 이어서 질문·제안·요청 등을 말해요.',
          uz: 'Avval vaziyatni tushuntirib, keyin savol, taklif yoki iltimosni aytamiz.',
          en: 'Give background information before a question, suggestion, or request.',
          ru: 'Сначала даём контекст, затем задаём вопрос, предлагаем или просим.',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_4,
        order: 4,
        grammarCode: G4,
        questions: mix20('gp_s4_u1_g4'),
      },
    ],
  },
  {
    title: {
      ko: '운동을 좀 해 보는 게 어때요?',
      uz: 'Biroz mashq qilib ko‘rsangiz-chi?',
      en: 'Why don’t you exercise?',
      ru: 'Почему бы вам немного не позаниматься спортом?',
    },
    section: 4,
    unit: 2,
    order: 2,
    category: LessonCategory.GRAMMAR,
    isActive: true,

    lessons: [
      {
        title: {
          ko: "'ㅅ' 불규칙",
          uz: "'ㅅ' noto‘g‘ri tuslanishi",
          en: "'ㅅ' irregular conjugation",
          ru: "Неправильное спряжение 'ㅅ'",
        },
        description: {
          ko: "'ㅅ' 받침 동사의 불규칙 활용과 규칙 활용 예외를 연습해요.",
          uz: "'ㅅ' bilan tugagan fe’llarning noto‘g‘ri va muntazam tuslanishini mashq qilamiz.",
          en: "Practice irregular 'ㅅ' verbs and important regular exceptions.",
          ru: "Практикуем неправильные глаголы на 'ㅅ' и важные регулярные исключения.",
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_4,
        order: 1,
        grammarCode: U2_G1,
        questions: mix20('gp_s4_u2_g1'),
      },

      {
        title: {
          ko: 'N마다',
          uz: 'Har bir N / har N',
          en: 'Every N / each N',
          ru: 'Каждый N',
        },
        description: {
          ko: '시간·사람·장소 등 각각에 반복되거나 다른 사실을 표현해요.',
          uz: 'Har bir vaqt, odam yoki joyga tegishli takroriy yoki farqli holatni ifodalaymiz.',
          en: 'Express something repeated or different for every time, person, or place.',
          ru: 'Выражаем повторение или различие для каждого времени, человека или места.',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_4,
        order: 2,
        grammarCode: U2_G2,
        questions: mix20('gp_s4_u2_g2'),
      },

      {
        title: {
          ko: 'V-는 게 어때요?',
          uz: 'V qilib ko‘rsangiz-chi?',
          en: 'How about V-ing?',
          ru: 'Как насчёт того, чтобы V?',
        },
        description: {
          ko: '상대방에게 부드럽게 권유하거나 해결 방법을 제안해요.',
          uz: 'Suhbatdoshga yumshoq maslahat yoki yechim taklif qilamiz.',
          en: 'Make a gentle suggestion or recommend a possible solution.',
          ru: 'Мягко советуем или предлагаем возможное решение.',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_4,
        order: 3,
        grammarCode: U2_G3,
        questions: mix20('gp_s4_u2_g3'),
      },

      {
        title: {
          ko: 'V-기로 하다',
          uz: 'V qilishga qaror qilmoq',
          en: 'Decide to V',
          ru: 'Решить сделать V',
        },
        description: {
          ko: '자신의 결정이나 다른 사람과 정한 약속을 표현해요.',
          uz: 'O‘z qaroringiz yoki boshqa odam bilan kelishilgan rejani ifodalaymiz.',
          en: 'Express a decision or an agreement made with someone.',
          ru: 'Выражаем принятое решение или договорённость с другим человеком.',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_4,
        order: 4,
        grammarCode: U2_G4,
        questions: mix20('gp_s4_u2_g4'),
      },
    ],
  },
  {
    title: {
      ko: '저는 좀 조용한 편이에요',
      uz: 'Men biroz sokinroqman',
      en: 'I am a little on the quiet side',
      ru: 'Я довольно спокойный человек',
    },
    section: 4,
    unit: 3,
    order: 3,
    category: LessonCategory.GRAMMAR,
    isActive: true,

    lessons: [
      {
        title: {
          ko: 'A-아/어 보이다',
          uz: 'A bo‘lib ko‘rinmoq',
          en: 'Look / appear A',
          ru: 'Выглядеть / казаться A',
        },
        description: {
          ko: '사람이나 사물의 겉모습을 보고 느낀 인상을 표현해요.',
          uz: 'Odam yoki narsaning tashqi ko‘rinishidan olgan taassurotni ifodalaymiz.',
          en: 'Express an impression based on how someone or something looks.',
          ru: 'Выражаем впечатление по внешнему виду человека или предмета.',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_4,
        order: 1,
        grammarCode: U3_G1,
        questions: mix20('gp_s4_u3_g1'),
      },

      {
        title: {
          ko: 'N처럼[같이]',
          uz: 'N kabi',
          en: 'Like N',
          ru: 'Как N',
        },
        description: {
          ko: '사람이나 사물의 모습·성격·행동을 다른 대상과 비교해요.',
          uz: 'Odam yoki narsaning ko‘rinishi, xarakteri yoki harakatini boshqasi bilan solishtiramiz.',
          en: 'Compare appearance, personality, or behavior with another person or thing.',
          ru: 'Сравниваем внешность, характер или поведение с другим объектом.',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_4,
        order: 2,
        grammarCode: U3_G2,
        questions: mix20('gp_s4_u3_g2'),
      },

      {
        title: {
          ko: 'A-(으)ㄴ 편이다, V-는 편이다',
          uz: 'A/V tomonga yaqin bo‘lmoq',
          en: 'Be on the A side / tend to V',
          ru: 'Быть скорее A / обычно V',
        },
        description: {
          ko: '절대적인 판단보다 상대적인 성향이나 경향을 부드럽게 표현해요.',
          uz: 'Mutlaq bahodan ko‘ra nisbiy xususiyat yoki odatni yumshoq ifodalaymiz.',
          en: 'Express a relative characteristic or usual tendency rather than an absolute judgment.',
          ru: 'Мягко выражаем относительное качество или обычную тенденцию.',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_4,
        order: 3,
        grammarCode: U3_G3,
        questions: mix20('gp_s4_u3_g3'),
      },

      {
        title: {
          ko: 'A-게',
          uz: 'A tarzda',
          en: 'A-ly / in an A manner',
          ru: 'Наречная форма A',
        },
        description: {
          ko: '형용사를 동작의 방법이나 결과 상태를 설명하는 표현으로 바꿔요.',
          uz: 'Sifatni harakat usuli yoki natija holatini ifodalovchi shaklga aylantiramiz.',
          en: 'Turn an adjective into an expression describing how an action is done or its resulting state.',
          ru: 'Превращаем прилагательное в форму, описывающую способ действия или результат.',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_4,
        order: 4,
        grammarCode: U3_G4,
        questions: mix20('gp_s4_u3_g4'),
      },
    ],
  },
  {
    title: {
      ko: '주변이 조용해서 살기 좋아요',
      uz: 'Atrof tinch bo‘lgani uchun yashash yaxshi',
      en: 'Living conditions are good because the neighborhood is quiet',
      ru: 'Здесь хорошо жить, потому что вокруг тихо',
    },
    section: 4,
    unit: 4,
    order: 4,
    category: LessonCategory.GRAMMAR,
    isActive: true,

    lessons: [
      {
        title: {
          ko: 'A/V-(으)ㄹ지 모르겠다',
          uz: 'A/V bo‘lish-bo‘lmasligini bilmaslik',
          en: 'Not know whether A/V',
          ru: 'Не знать, будет ли A/V',
        },
        description: {
          ko: '앞으로의 상황이나 사실이 확실하지 않을 때 자신의 불확실함을 표현해요.',
          uz: 'Kelajakdagi holat yoki fakt aniq bo‘lmaganda noaniqlikni ifodalaymiz.',
          en: 'Express uncertainty about a future situation or unknown fact.',
          ru: 'Выражаем неуверенность в будущей ситуации или неизвестном факте.',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_4,
        order: 1,
        grammarCode: U4_G1,
        questions: mix20('gp_s4_u4_g1'),
      },

      {
        title: {
          ko: 'A/V-기는 하지만',
          uz: 'A/V bo‘lsa ham, lekin',
          en: 'It is true that A/V, but...',
          ru: 'Хотя A/V, но...',
        },
        description: {
          ko: '앞의 사실을 인정한 뒤 반대되거나 아쉬운 점을 덧붙여 말해요.',
          uz: 'Birinchi holatni tan olib, unga zid yoki cheklovchi fikrni qo‘shamiz.',
          en: 'Acknowledge one fact and then add a contrasting limitation or drawback.',
          ru: 'Сначала признаём один факт, затем добавляем противопоставление или ограничение.',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_4,
        order: 2,
        grammarCode: U4_G2,
        questions: mix20('gp_s4_u4_g2'),
      },

      {
        title: {
          ko: 'A/V-기 때문에, N(이)기 때문에',
          uz: 'A/V/N bo‘lgani uchun',
          en: 'Because A/V/N',
          ru: 'Потому что A/V/N',
        },
        description: {
          ko: '행동·상태·신분 등을 분명한 원인이나 이유로 제시해요.',
          uz: 'Harakat, holat yoki shaxsiy maqomni aniq sabab sifatida ko‘rsatamiz.',
          en: 'Present an action, state, or identity as an explicit cause or reason.',
          ru: 'Указываем действие, состояние или статус как явную причину.',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_4,
        order: 3,
        grammarCode: U4_G3,
        questions: mix20('gp_s4_u4_g3'),
      },

      {
        title: {
          ko: 'V-기(가) A',
          uz: 'V qilish A',
          en: 'It is A to V',
          ru: 'V делать A',
        },
        description: {
          ko: '어떤 행동이 쉽다·어렵다·좋다·편하다 같은 평가를 표현해요.',
          uz: 'Biror harakatning oson, qiyin, yaxshi yoki qulay ekanini baholaymiz.',
          en: 'Evaluate an action as easy, difficult, good, convenient, or similar.',
          ru: 'Оцениваем действие как лёгкое, трудное, удобное, приятное и т. п.',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_4,
        order: 4,
        grammarCode: U4_G4,
        questions: mix20('gp_s4_u4_g4'),
      },
    ],
  },
  {
    title: {
      ko: '여기서 사진을 찍어도 돼요?',
      uz: 'Bu yerda suratga olsa bo‘ladimi?',
      en: 'May I take a picture here?',
      ru: 'Здесь можно фотографировать?',
    },
    section: 4,
    unit: 5,
    order: 5,
    category: LessonCategory.GRAMMAR,
    isActive: true,

    lessons: [
      {
        title: {
          ko: 'V-(으)ㄴ 적(이) 있다(없다)',
          uz: 'V qilgan tajribasi bor/yo‘q',
          en: 'Have / have never V-ed',
          ru: 'Иметь / не иметь опыт V',
        },
        description: {
          ko: '과거에 어떤 행동을 해 본 경험이 있는지 없는지 표현해요.',
          uz: 'O‘tmishda biror ishni qilib ko‘rgan tajriba bor yoki yo‘qligini ifodalaymiz.',
          en: 'Express whether you have or have never had a certain experience.',
          ru: 'Выражаем наличие или отсутствие опыта какого-либо действия.',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_4,
        order: 1,
        grammarCode: U5_G1,
        questions: mix20('gp_s4_u5_g1'),
      },

      {
        title: {
          ko: 'A/V-았을/었을 때',
          uz: 'A/V bo‘lgan paytda',
          en: 'When A/V-ed',
          ru: 'Когда A/V произошло',
        },
        description: {
          ko: '과거의 특정한 상황이나 행동이 있었던 때를 이야기해요.',
          uz: 'O‘tmishda ma’lum holat yoki harakat sodir bo‘lgan vaqtni ifodalaymiz.',
          en: 'Talk about a specific past time when a state or action occurred.',
          ru: 'Говорим о конкретном прошлом моменте, когда произошло действие или состояние.',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_4,
        order: 2,
        grammarCode: U5_G2,
        questions: mix20('gp_s4_u5_g2'),
      },

      {
        title: {
          ko: 'V-아도/어도 되다',
          uz: 'V qilsa bo‘ladi',
          en: 'May / be allowed to V',
          ru: 'Можно V',
        },
        description: {
          ko: '어떤 행동에 대한 허락을 묻거나 허락해 줄 때 사용해요.',
          uz: 'Biror ishga ruxsat so‘rash yoki ruxsat berishni o‘rganamiz.',
          en: 'Ask for or give permission to perform an action.',
          ru: 'Просим или даём разрешение на действие.',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_4,
        order: 3,
        grammarCode: U5_G3,
        questions: mix20('gp_s4_u5_g3'),
      },

      {
        title: {
          ko: 'V-(으)면 안 되다',
          uz: 'V qilish mumkin emas',
          en: 'Must not V',
          ru: 'Нельзя V',
        },
        description: {
          ko: '규칙이나 상황에 따라 해서는 안 되는 행동을 표현해요.',
          uz: 'Qoida yoki vaziyatga ko‘ra qilish mumkin bo‘lmagan harakatni ifodalaymiz.',
          en: 'Express an action that is prohibited by a rule or situation.',
          ru: 'Выражаем действие, запрещённое правилами или обстоятельствами.',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_4,
        order: 4,
        grammarCode: U5_G4,
        questions: mix20('gp_s4_u5_g4'),
      },
    ],
  },
  {
    title: {
      ko: '한국 생활에 익숙해졌어요',
      uz: 'Koreyadagi hayotga ko‘nikdim',
      en: 'I’ve become used to living in Korea',
      ru: 'Я привык к жизни в Корее',
    },
    section: 4,
    unit: 6,
    order: 6,
    category: LessonCategory.GRAMMAR,
    isActive: true,

    lessons: [
      {
        title: {
          ko: 'A-아지다/어지다',
          uz: 'A bo‘lib bormoq',
          en: 'Become A',
          ru: 'Становиться A',
        },
        description: {
          ko: '상태나 성질이 이전과 달라지는 변화를 표현해요.',
          uz: 'Holat yoki xususiyatning oldingidan o‘zgarishini ifodalaymiz.',
          en: 'Express a change in a state or quality.',
          ru: 'Выражаем изменение состояния или свойства.',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_4,
        order: 1,
        grammarCode: U6_G1,
        questions: mix20('gp_s4_u6_g1'),
      },

      {
        title: {
          ko: 'V-게 되다',
          uz: 'V qiladigan bo‘lmoq',
          en: 'Come to V / end up V-ing',
          ru: 'Стать V / так получилось, что V',
        },
        description: {
          ko: '상황이나 환경의 변화로 새로운 행동이나 상태가 생긴 결과를 표현해요.',
          uz: 'Vaziyat yoki sharoit o‘zgarishi natijasida yangi harakat yoki holat yuzaga kelishini ifodalaymiz.',
          en: 'Express a new action or situation that results from changed circumstances.',
          ru: 'Выражаем новое действие или состояние, возникшее из-за изменения обстоятельств.',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_4,
        order: 2,
        grammarCode: U6_G2,
        questions: mix20('gp_s4_u6_g2'),
      },

      {
        title: {
          ko: 'V-기 전에',
          uz: 'V qilishdan oldin',
          en: 'Before V-ing',
          ru: 'Перед тем как V',
        },
        description: {
          ko: '어떤 행동보다 먼저 이루어지는 일을 표현해요.',
          uz: 'Biror harakatdan oldin bajariladigan ishni ifodalaymiz.',
          en: 'Express an action that happens before another action.',
          ru: 'Выражаем действие, происходящее раньше другого действия.',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_4,
        order: 3,
        grammarCode: U6_G3,
        questions: mix20('gp_s4_u6_g3'),
      },

      {
        title: {
          ko: 'V-(으)ㄴ 후에',
          uz: 'V qilgandan keyin',
          en: 'After V-ing',
          ru: 'После того как V',
        },
        description: {
          ko: '앞의 행동이 완료된 다음에 이어지는 일을 표현해요.',
          uz: 'Birinchi harakat tugagandan keyin sodir bo‘ladigan ishni ifodalaymiz.',
          en: 'Express an action that occurs after the first action is completed.',
          ru: 'Выражаем действие, происходящее после завершения предыдущего.',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_4,
        order: 4,
        grammarCode: U6_G4,
        questions: mix20('gp_s4_u6_g4'),
      },
    ],
  },
  {
    title: {
      ko: '설날에는 밥 대신 떡국을 먹어요',
      uz: 'Seollalda guruch o‘rniga tteokguk yeymiz',
      en: 'We eat tteokguk instead of rice on New Year’s Day',
      ru: 'На Соллаль вместо риса едят ттоккук',
    },
    section: 4,
    unit: 7,
    order: 7,
    category: LessonCategory.GRAMMAR,
    isActive: true,

    lessons: [
      {
        title: {
          ko: 'V-아/어 놓다',
          uz: 'V qilib qo‘ymoq',
          en: 'Do V in advance / leave V-ed',
          ru: 'Сделать V заранее / оставить результат',
        },
        description: {
          ko: '필요한 일을 미리 해 두거나 행동의 결과 상태를 그대로 유지하는 표현을 연습해요.',
          uz: 'Kerakli ishni oldindan bajarib qo‘yish yoki uning natija holatini saqlashni ifodalaymiz.',
          en: 'Express doing something in advance or leaving the resulting state unchanged.',
          ru: 'Выражаем действие, сделанное заранее, или сохранение его результата.',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_4,
        order: 1,
        grammarCode: U7_G1,
        questions: mix20('gp_s4_u7_g1'),
      },

      {
        title: {
          ko: 'N 대신',
          uz: 'N o‘rniga',
          en: 'Instead of N',
          ru: 'Вместо N',
        },
        description: {
          ko: '원래의 사람·물건·방법을 다른 것으로 바꾸어 선택하는 상황을 표현해요.',
          uz: 'Bir odam, narsa yoki usul o‘rniga boshqasini tanlashni ifodalaymiz.',
          en: 'Express replacing one person, thing, or method with another.',
          ru: 'Выражаем замену одного человека, предмета или способа другим.',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_4,
        order: 2,
        grammarCode: U7_G2,
        questions: mix20('gp_s4_u7_g2'),
      },

      {
        title: {
          ko: 'V-(으)ㄹ까 하다',
          uz: 'V qilishni o‘ylamoq',
          en: 'Be thinking of V-ing',
          ru: 'Подумывать о том, чтобы V',
        },
        description: {
          ko: '아직 완전히 결정하지 않은 자신의 계획이나 생각을 부드럽게 표현해요.',
          uz: 'Hali qat’iy qaror qilinmagan reja yoki niyatni yumshoq ifodalaymiz.',
          en: 'Express a tentative plan or intention that has not been firmly decided.',
          ru: 'Выражаем предварительный план или намерение, которое ещё не решено окончательно.',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_4,
        order: 3,
        grammarCode: U7_G3,
        questions: mix20('gp_s4_u7_g3'),
      },

      {
        title: {
          ko: 'A/V-(으)ㄹ 테니까',
          uz: 'A/V bo‘ladi, shuning uchun',
          en: 'Since A/V will..., so...',
          ru: 'Поскольку A/V будет..., то...',
        },
        description: {
          ko: '자신의 의도나 예상되는 상황을 이유로 제시하고 상대방에게 요청·권유·조언해요.',
          uz: 'O‘z niyati yoki kutilayotgan vaziyatni sabab qilib, iltimos, taklif yoki maslahat beramiz.',
          en: 'Give your intention or prediction as a reason for a request, suggestion, or advice.',
          ru: 'Используем намерение или прогноз как основание для просьбы, предложения или совета.',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_4,
        order: 4,
        grammarCode: U7_G4,
        questions: mix20('gp_s4_u7_g4'),
      },
    ],
  },
  {
    title: {
      ko: '비행기를 놓칠 뻔했어요',
      uz: 'Samolyotdan qolib ketay dedim',
      en: 'I almost missed my flight',
      ru: 'Я чуть не опоздал на самолёт',
    },
    section: 4,
    unit: 8,
    order: 8,
    category: LessonCategory.GRAMMAR,
    isActive: true,

    lessons: [
      {
        title: {
          ko: 'V-아다/어다 주다',
          uz: 'V qilib olib kelib bermoq',
          en: 'Go/get V and bring/do it for someone',
          ru: 'Сходить/взять V и принести или сделать для кого-либо',
        },
        description: {
          ko: '다른 곳에서 물건을 가져오거나 사람을 데려오는 행동을 상대방을 위해 해 주는 표현을 연습해요.',
          uz: 'Boshqa joydan biror narsani olib kelish yoki odamni olib borib berish ma’nosini mashq qilamiz.',
          en: 'Practice doing something elsewhere and bringing or taking the result for someone.',
          ru: 'Практикуем действия, когда что-то получают в другом месте и приносят или отвозят для другого человека.',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_4,
        order: 1,
        grammarCode: U8_G1,
        questions: mix20('gp_s4_u8_g1'),
      },

      {
        title: {
          ko: 'V-(으)ㄹ 뻔하다',
          uz: 'V bo‘lib ketay demoq',
          en: 'Almost V',
          ru: 'Чуть не V',
        },
        description: {
          ko: '실제로는 일어나지 않았지만 거의 일어날 뻔했던 위험이나 실수 상황을 표현해요.',
          uz: 'Aslida sodir bo‘lmagan, ammo deyarli sodir bo‘layozgan xavf yoki xatoni ifodalaymiz.',
          en: 'Express an event, accident, or mistake that almost happened but ultimately did not.',
          ru: 'Выражаем событие, опасность или ошибку, которые почти произошли, но в итоге не случились.',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_4,
        order: 2,
        grammarCode: U8_G2,
        questions: mix20('gp_s4_u8_g2'),
      },

      {
        title: {
          ko: "'ㅎ' 불규칙",
          uz: "'ㅎ' noto‘g‘ri tuslanishi",
          en: "'ㅎ' irregular conjugation",
          ru: "Неправильное спряжение 'ㅎ'",
        },
        description: {
          ko: '빨갛다·하얗다·파랗다·그렇다·어떻다 같은 일부 ㅎ 받침 형용사의 불규칙 활용을 연습해요.',
          uz: '빨갛다, 하얗다, 파랗다, 그렇다, 어떻다 kabi ayrim ㅎ bilan tugaydigan sifatlarning noto‘g‘ri tuslanishini mashq qilamiz.',
          en: 'Practice irregular conjugation of certain ㅎ-final adjectives such as 빨갛다, 하얗다, 파랗다, 그렇다, and 어떻다.',
          ru: 'Практикуем неправильное спряжение некоторых прилагательных на ㅎ: 빨갛다, 하얗다, 파랗다, 그렇다, 어떻다 и др.',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_4,
        order: 3,
        grammarCode: U8_G3,
        questions: mix20('gp_s4_u8_g3'),
      },

      {
        title: {
          ko: 'V-아/어 있다',
          uz: 'V holatida turmoq',
          en: 'Be in the resulting state of V',
          ru: 'Находиться в результате действия V',
        },
        description: {
          ko: '어떤 동작이 끝난 뒤 그 결과 상태가 계속 유지되고 있음을 표현해요.',
          uz: 'Harakat tugagandan keyin uning natija holati davom etayotganini ifodalaymiz.',
          en: 'Express a state that remains after an action or change has been completed.',
          ru: 'Выражаем состояние, которое сохраняется после завершённого действия или изменения.',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_4,
        order: 4,
        grammarCode: U8_G4,
        questions: mix20('gp_s4_u8_g4'),
      },
    ],
  },
  {
    title: {
      ko: '한국에 온 지 벌써 6개월이 되었어요',
      uz: 'Koreyaga kelganimga olti oy bo‘ldi',
      en: 'It has already been six months since I came to Korea',
      ru: 'Прошло уже шесть месяцев с тех пор, как я приехал в Корею',
    },
    section: 4,
    unit: 9,
    order: 9,
    category: LessonCategory.GRAMMAR,
    isActive: true,

    lessons: [
      {
        title: {
          ko: 'V-(으)ㄴ 지',
          uz: 'V qilganiga qancha vaqt bo‘ldi',
          en: 'Since V / It has been...',
          ru: 'С тех пор как V / прошло...',
        },
        description: {
          ko: '어떤 행동이 일어난 뒤 지금까지 얼마나 시간이 지났는지 표현해요.',
          uz: 'Biror harakat sodir bo‘lganidan hozirgacha qancha vaqt o‘tganini ifodalaymiz.',
          en: 'Express how much time has passed since an action occurred.',
          ru: 'Выражаем, сколько времени прошло с момента действия.',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_4,
        order: 1,
        grammarCode: U9_G1,
        questions: mix20('gp_s4_u9_g1'),
      },

      {
        title: {
          ko: 'N(이)나 2',
          uz: 'Hatto / naq N',
          en: 'As many/much as N',
          ru: 'Целых N',
        },
        description: {
          ko: '예상보다 수량이나 정도가 많다고 느낄 때 그 크기를 강조해요.',
          uz: 'Miqdor yoki daraja kutilganidan ko‘p ekanini ta’kidlaymiz.',
          en: 'Emphasize that an amount or degree is surprisingly large.',
          ru: 'Подчёркиваем, что количество или степень неожиданно велики.',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_4,
        order: 2,
        grammarCode: U9_G2,
        questions: mix20('gp_s4_u9_g2'),
      },

      {
        title: {
          ko: 'A-다, V-ㄴ/는다, N(이)다',
          uz: 'Oddiy bayon uslubi',
          en: 'Plain declarative style',
          ru: 'Простой повествовательный стиль',
        },
        description: {
          ko: '글·일기·설명·독백 등에서 사용하는 해라체 평서형을 연습해요.',
          uz: 'Matn, kundalik, tasvir va ichki nutqda ishlatiladigan oddiy bayon uslubini mashq qilamiz.',
          en: 'Practice the plain declarative style used in writing, narration, diaries, and inner speech.',
          ru: 'Практикуем простой повествовательный стиль, используемый в текстах, дневниках, описаниях и внутренней речи.',
        },
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_4,
        order: 3,
        grammarCode: U9_G3,
        questions: mix20('gp_s4_u9_g3'),
      },
    ],
  },
];
