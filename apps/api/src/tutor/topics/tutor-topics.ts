/**
 * 회화 주제 카탈로그.
 *
 * 두 갈래다.
 *  - daily : 누구에게나 있는 일상 대화. 입을 떼는 연습
 *  - korea : 한국에서 실제로 말해야 하는 순간. 안 하면 곤란해지는 것들
 *
 * korea 를 넣은 이유: 어휘·문법·TOPIK 이 이미 "공부"를 덮고 있다. 회화가
 * 채워야 할 빈칸은 시험이 아니라 "지금 병원에서 뭐라고 말하지?" 다.
 *
 * targetExpressions 가 이 파일의 핵심이다. 이게 있어야 "대화했다"가 아니라
 * "뭘 배웠다"가 된다. 세션 끝에 보여줄 근거이기도 하다.
 * 4~6개로 제한한다 — 10분 대화에 그 이상은 못 담는다.
 */

export type TopicCategory = 'daily' | 'korea';
export type TopicLevel = 'beginner' | 'intermediate' | 'advanced';

export interface I18nText {
  ko: string;
  uz: string;
  en: string;
  ru: string;
}

export interface TutorTopic {
  id: string;
  category: TopicCategory;
  level: TopicLevel;
  icon: string;
  color: string;
  title: I18nText;
  /** 한 줄 설명 — 고르기 전에 뭘 하는지 알 수 있게 */
  blurb: I18nText;
  /** 이 대화에서 꼭 써보게 할 표현 */
  targetExpressions: string[];
  /** 자연스럽게 끼워 넣을 문법 */
  targetGrammar: string[];
  /** AI 가 대화를 여는 방식 (영어 지시 — 학습자에겐 한국어로 나간다) */
  opener: string;
  /** 학습자가 막혔을 때 던져줄 예문 */
  hints: string[];
}

export const TUTOR_TOPICS: TutorTopic[] = [
  // ─────────── 일상 ───────────
  {
    id: 'selfIntro',
    category: 'daily',
    level: 'beginner',
    icon: 'person',
    color: '#7E57C2',
    title: { ko: '자기소개', uz: 'Tanishuv', en: 'Introducing yourself', ru: 'Знакомство' },
    blurb: {
      ko: '이름, 나라, 하는 일을 말해봐요',
      uz: 'Ism, mamlakat va ish haqida gapiring',
      en: 'Your name, where you are from, what you do',
      ru: 'Имя, откуда вы, чем занимаетесь',
    },
    targetExpressions: [
      '저는 ~라고 해요',
      '~에서 왔어요',
      '~살이에요',
      '~일을 하고 있어요',
      '만나서 반갑습니다',
    ],
    targetGrammar: ['~이에요/예요', '~에서', '~고 있다'],
    opener: 'Introduce yourself first in one short sentence, then ask their name.',
    hints: ['저는 아지즈라고 해요', '우즈베키스탄에서 왔어요'],
  },
  {
    id: 'dailyRoutine',
    category: 'daily',
    level: 'beginner',
    icon: 'sunny',
    color: '#FFA726',
    title: { ko: '하루 일과', uz: 'Kunlik tartib', en: 'Your day', ru: 'Распорядок дня' },
    blurb: {
      ko: '아침부터 저녁까지 뭘 하는지',
      uz: 'Ertalabdan kechgacha nima qilasiz',
      en: 'What you do from morning to night',
      ru: 'Что вы делаете с утра до вечера',
    },
    targetExpressions: [
      '보통 ~시에 일어나요',
      '아침을 먹고 나서',
      '~에 가요',
      '집에 돌아와요',
      '자기 전에 ~해요',
    ],
    targetGrammar: ['~고 나서', '~기 전에', '시간 표현'],
    opener: 'Ask what time they usually wake up.',
    hints: ['보통 일곱 시에 일어나요', '아침을 먹고 나서 일하러 가요'],
  },
  {
    id: 'food',
    category: 'daily',
    level: 'beginner',
    icon: 'restaurant',
    color: '#EC407A',
    title: { ko: '음식 이야기', uz: 'Ovqat haqida', en: 'Food talk', ru: 'О еде' },
    blurb: {
      ko: '좋아하는 음식과 맛 표현',
      uz: "Yoqtirgan taomlar va ta'm",
      en: 'Favourite foods and how things taste',
      ru: 'Любимая еда и вкусы',
    },
    targetExpressions: [
      '~을/를 좋아해요',
      '매워요 / 짜요 / 달아요',
      '맛있게 먹었어요',
      '~보다 ~이/가 더 좋아요',
      '먹어 본 적 있어요',
    ],
    targetGrammar: ['~아/어 본 적 있다', '비교 ~보다'],
    opener: 'Ask what they ate today, then react to what they name.',
    hints: ['김치찌개를 먹었어요', '조금 매웠지만 맛있었어요'],
  },
  {
    id: 'hobby',
    category: 'daily',
    level: 'beginner',
    icon: 'musical-notes',
    color: '#26A69A',
    title: { ko: '취미', uz: "Sevimli mashg'ulot", en: 'Hobbies', ru: 'Хобби' },
    blurb: {
      ko: '쉴 때 뭐 하는지 이야기해요',
      uz: "Bo'sh vaqtda nima qilasiz",
      en: 'What you do in your free time',
      ru: 'Чем занимаетесь в свободное время',
    },
    targetExpressions: [
      '시간이 있을 때 ~해요',
      '~하는 걸 좋아해요',
      '~한 지 ~년 됐어요',
      '재미있어요 / 지루해요',
    ],
    targetGrammar: ['~는 것', '~은 지 ~됐다'],
    opener: 'Ask what they do when they have free time.',
    hints: ['음악 듣는 걸 좋아해요', '축구한 지 삼 년 됐어요'],
  },
  {
    id: 'weather',
    category: 'daily',
    level: 'beginner',
    icon: 'partly-sunny',
    color: '#42A5F5',
    title: { ko: '날씨와 계절', uz: 'Ob-havo va fasllar', en: 'Weather and seasons', ru: 'Погода и сезоны' },
    blurb: {
      ko: '오늘 날씨, 좋아하는 계절',
      uz: 'Bugungi ob-havo, sevimli fasl',
      en: "Today's weather and your favourite season",
      ru: 'Погода сегодня и любимое время года',
    },
    targetExpressions: [
      '오늘 날씨가 ~네요',
      '덥다 / 춥다 / 시원하다',
      '비가 와요',
      '~ 계절을 제일 좋아해요',
    ],
    targetGrammar: ['~네요', '~아/어서'],
    opener: 'Ask about the weather where they are right now.',
    hints: ['오늘은 좀 추워요', '저는 가을을 제일 좋아해요'],
  },
  {
    id: 'family',
    category: 'daily',
    level: 'beginner',
    icon: 'people',
    color: '#AB47BC',
    title: { ko: '가족과 친구', uz: "Oila va do'stlar", en: 'Family and friends', ru: 'Семья и друзья' },
    blurb: {
      ko: '가족 이야기, 친구 이야기',
      uz: "Oila va do'stlar haqida",
      en: 'Talking about the people close to you',
      ru: 'О близких людях',
    },
    targetExpressions: [
      '가족이 ~명이에요',
      '형/누나/동생이 있어요',
      '~와/과 같이 살아요',
      '친하게 지내요',
    ],
    targetGrammar: ['~와/과', '있다/없다'],
    opener: 'Ask how many people are in their family.',
    hints: ['가족이 네 명이에요', '동생이 한 명 있어요'],
  },
  {
    id: 'weekend',
    category: 'daily',
    level: 'intermediate',
    icon: 'calendar',
    color: '#5C6BC0',
    title: { ko: '주말 계획', uz: 'Dam olish rejasi', en: 'Weekend plans', ru: 'Планы на выходные' },
    blurb: {
      ko: '이번 주말에 뭐 할 거예요?',
      uz: 'Shu hafta oxirida nima qilasiz?',
      en: 'What are you doing this weekend?',
      ru: 'Что делаете в выходные?',
    },
    targetExpressions: [
      '~할 거예요',
      '~하려고 해요',
      '아직 못 정했어요',
      '같이 ~할래요?',
      '~하기로 했어요',
    ],
    targetGrammar: ['~을/를 거예요', '~려고 하다', '~기로 하다'],
    opener: 'Ask what they are planning to do this weekend.',
    hints: ['친구를 만나려고 해요', '아직 못 정했어요'],
  },
  {
    id: 'travel',
    category: 'daily',
    level: 'intermediate',
    icon: 'airplane',
    color: '#26C6DA',
    title: { ko: '여행 경험', uz: 'Sayohat tajribasi', en: 'Travel stories', ru: 'Путешествия' },
    blurb: {
      ko: '가 본 곳, 가고 싶은 곳',
      uz: "Borgan va bormoqchi bo'lgan joylar",
      en: 'Places you have been and want to go',
      ru: 'Где были и куда хотите',
    },
    targetExpressions: [
      '~에 가 봤어요',
      '~에 가 보고 싶어요',
      '제일 기억에 남는 건',
      '~였을 때',
    ],
    targetGrammar: ['~아/어 보다', '~고 싶다', '과거 회상'],
    opener: 'Ask about a place they have travelled to.',
    hints: ['서울에 가 봤어요', '제주도에 가 보고 싶어요'],
  },

  // ─────────── 한국 생활 ───────────
  {
    id: 'cafe',
    category: 'korea',
    level: 'beginner',
    icon: 'cafe',
    color: '#8D6E63',
    title: { ko: '카페에서 주문', uz: 'Kafeda buyurtma', en: 'Ordering at a cafe', ru: 'Заказ в кафе' },
    blurb: {
      ko: '음료 주문하고 받기까지',
      uz: 'Ichimlik buyurtma qilish',
      en: 'From ordering to picking it up',
      ru: 'От заказа до получения',
    },
    targetExpressions: [
      '~ 한 잔 주세요',
      '따뜻한 걸로 / 차가운 걸로',
      '포장해 주세요',
      '사이즈는 ~로 할게요',
      '카드로 계산할게요',
    ],
    targetGrammar: ['~아/어 주세요', '~로 하다'],
    opener: 'You are the barista. Greet them and ask what they would like to order.',
    hints: ['아메리카노 한 잔 주세요', '따뜻한 걸로 주세요'],
  },
  {
    id: 'restaurant',
    category: 'korea',
    level: 'beginner',
    icon: 'fast-food',
    color: '#EF5350',
    title: { ko: '식당에서', uz: 'Restoranda', en: 'At a restaurant', ru: 'В ресторане' },
    blurb: {
      ko: '메뉴 고르기부터 계산까지',
      uz: 'Menyudan tanlashdan hisobgacha',
      en: 'From the menu to paying',
      ru: 'От меню до оплаты',
    },
    targetExpressions: [
      '몇 분이세요? / 두 명이요',
      '이거 하나 주세요',
      '덜 맵게 해 주세요',
      '물 좀 주시겠어요?',
      '계산해 주세요',
    ],
    targetGrammar: ['~게 하다', '~아/어 주시겠어요?'],
    opener: 'You are the server. Ask how many people are in their party.',
    hints: ['두 명이요', '비빔밥 하나 주세요'],
  },
  {
    id: 'store',
    category: 'korea',
    level: 'beginner',
    icon: 'basket',
    color: '#66BB6A',
    title: { ko: '편의점·마트', uz: "Do'kon va market", en: 'Convenience store', ru: 'Магазин' },
    blurb: {
      ko: '물건 찾고 계산하기',
      uz: "Mahsulot topish va to'lash",
      en: 'Finding things and paying',
      ru: 'Найти товар и оплатить',
    },
    targetExpressions: [
      '~ 어디에 있어요?',
      '이거 얼마예요?',
      '봉투 하나 주세요',
      '봉투 필요 없어요',
      '영수증 주세요',
    ],
    targetGrammar: ['~에 있다', '얼마'],
    opener: 'You are the clerk. Ask if they need help finding anything.',
    hints: ['우유가 어디에 있어요?', '이거 얼마예요?'],
  },
  {
    id: 'directions',
    category: 'korea',
    level: 'beginner',
    icon: 'navigate',
    color: '#29B6F6',
    title: { ko: '길 묻기', uz: "Yo'l so'rash", en: 'Asking directions', ru: 'Спросить дорогу' },
    blurb: {
      ko: '길 물어보고 알아듣기',
      uz: "Yo'l so'rash va tushunish",
      en: 'Asking the way and understanding the answer',
      ru: 'Спросить и понять дорогу',
    },
    targetExpressions: [
      '~에 어떻게 가요?',
      '여기서 멀어요?',
      '몇 번 출구로 나가요?',
      '걸어서 갈 수 있어요?',
      '다시 한번 말씀해 주세요',
    ],
    targetGrammar: ['~에 어떻게', '~을/를 수 있다'],
    opener: 'They are lost. You are a passer-by. Ask where they are trying to go.',
    hints: ['지하철역에 어떻게 가요?', '여기서 멀어요?'],
  },
  {
    id: 'clinic',
    category: 'korea',
    level: 'intermediate',
    icon: 'medkit',
    color: '#26A69A',
    title: { ko: '병원·약국', uz: 'Shifoxona va dorixona', en: 'Clinic and pharmacy', ru: 'Клиника и аптека' },
    blurb: {
      ko: '아픈 곳 설명하고 약 받기',
      uz: "Og'riqni tushuntirish va dori olish",
      en: 'Describing symptoms and getting medicine',
      ru: 'Описать симптомы и получить лекарство',
    },
    targetExpressions: [
      '어디가 아프세요?',
      '~이/가 아파요',
      '언제부터 그랬어요?',
      '열이 나요',
      '하루에 세 번 드세요',
    ],
    targetGrammar: ['~이/가 아프다', '~부터'],
    opener: 'You are the receptionist at a clinic. Ask what brings them in today.',
    hints: ['머리가 아파요', '어제부터 그랬어요'],
  },
  {
    id: 'bank',
    category: 'korea',
    level: 'intermediate',
    icon: 'card',
    color: '#5C6BC0',
    title: { ko: '은행·관공서', uz: 'Bank va idora', en: 'Bank and offices', ru: 'Банк и учреждения' },
    blurb: {
      ko: '계좌, 서류, 신청서',
      uz: 'Hisob, hujjat, ariza',
      en: 'Accounts, documents, forms',
      ru: 'Счета, документы, заявления',
    },
    targetExpressions: [
      '계좌를 만들고 싶어요',
      '신분증 가져오셨어요?',
      '여기에 서명해 주세요',
      '어떻게 신청해요?',
      '얼마나 걸려요?',
    ],
    targetGrammar: ['~고 싶다', '~아/어 주세요'],
    opener: 'You work at the bank counter. Ask how you can help them.',
    hints: ['계좌를 만들고 싶어요', '어떻게 신청해요?'],
  },
  {
    id: 'housing',
    category: 'korea',
    level: 'advanced',
    icon: 'home',
    color: '#FF7043',
    title: { ko: '집 구하기', uz: 'Uy topish', en: 'Finding a place', ru: 'Поиск жилья' },
    blurb: {
      ko: '방 보러 가고 조건 물어보기',
      uz: "Uy ko'rish va shartlarni so'rash",
      en: 'Viewing a room and asking about terms',
      ru: 'Осмотр жилья и условия',
    },
    targetExpressions: [
      '월세가 얼마예요?',
      '보증금은 얼마예요?',
      '관리비가 포함이에요?',
      '언제 입주할 수 있어요?',
      '조금 깎아 주실 수 있어요?',
    ],
    targetGrammar: ['~을/를 수 있다', '포함/제외'],
    opener:
      'You are a real-estate agent showing a room. Describe it in one line, then ask what they think.',
    hints: ['월세가 얼마예요?', '관리비가 포함이에요?'],
  },
  {
    id: 'partTimeJob',
    category: 'korea',
    level: 'advanced',
    icon: 'briefcase',
    color: '#7E57C2',
    title: { ko: '아르바이트 면접', uz: 'Ish suhbati', en: 'Part-time job interview', ru: 'Собеседование' },
    blurb: {
      ko: '경험, 시간, 조건 말하기',
      uz: 'Tajriba, vaqt, shartlar',
      en: 'Experience, hours, conditions',
      ru: 'Опыт, часы, условия',
    },
    targetExpressions: [
      '언제부터 일할 수 있어요?',
      '주말에도 가능해요',
      '전에 ~일을 해 봤어요',
      '시급이 어떻게 되나요?',
      '열심히 하겠습니다',
    ],
    targetGrammar: ['~아/어 보다', '~겠습니다'],
    opener:
      'You are the manager interviewing them. Keep it friendly, not scary. Start by asking when they can start.',
    hints: ['다음 주부터 가능해요', '전에 카페에서 일해 봤어요'],
  },
];

export const TOPIC_BY_ID = new Map(TUTOR_TOPICS.map((t) => [t.id, t]));
export const TOPIC_IDS = TUTOR_TOPICS.map((t) => t.id);

/** 화면용 — 무거운 지시문(opener)은 빼고 보낸다 */
export function toTopicCard(t: TutorTopic, lang: string) {
  const pick = (v: I18nText) =>
    (v as any)[lang] ?? v.uz ?? v.en;
  return {
    id: t.id,
    category: t.category,
    level: t.level,
    icon: t.icon,
    color: t.color,
    title: pick(t.title),
    blurb: pick(t.blurb),
    expressionCount: t.targetExpressions.length,
  };
}
